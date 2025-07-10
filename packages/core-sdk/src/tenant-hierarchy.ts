import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Simple tenant interface that matches database structure
export interface MinimalTenant {
  id: string
  name: string
  slug: string
  type: 'individual' | 'organization'
  group_mode: boolean
  parent_id?: string
}

export interface TenantHierarchy {
  parent: MinimalTenant
  children: MinimalTenant[]
}

/**
 * Fetch tenant hierarchy with parent and all children
 */
export async function getTenantHierarchy(parentTenantId: string): Promise<TenantHierarchy> {
  const { data, error } = await supabase
    .from('tenants')
    .select(`
      id, name, slug, type, group_mode, parent_id,
      children:tenants!parent_id (id, name, slug, type, group_mode, parent_id)
    `)
    .eq('id', parentTenantId)
    .single()

  if (error) {
    throw new Error(`Failed to fetch tenant hierarchy: ${error.message}`)
  }

  return {
    parent: data,
    children: data?.children || []
  }
}

/**
 * Toggle group mode for a child tenant
 */
export async function toggleChildAccess(childId: string, enable: boolean): Promise<void> {
  const { error } = await supabase
    .from('tenants')
    .update({ group_mode: enable })
    .eq('id', childId)

  if (error) {
    throw new Error(`Failed to toggle child access: ${error.message}`)
  }
}

/**
 * Get all tenants for a user (parent + children they have access to)
 */
export async function getUserTenants(userId: string): Promise<MinimalTenant[]> {
  const { data, error } = await supabase
    .from('user_tenants')
    .select(`
      tenant_id,
      tenants!inner (
        id, name, slug, type, group_mode, parent_id
      )
    `)
    .eq('user_id', userId)

  if (error) {
    throw new Error(`Failed to fetch user tenants: ${error.message}`)
  }

  if (!data) return []
  
  // Use any type to bypass strict TypeScript checking for now
  return data.map((item: any) => ({
    id: item.tenants.id,
    name: item.tenants.name,
    slug: item.tenants.slug,
    type: item.tenants.type,
    group_mode: item.tenants.group_mode,
    parent_id: item.tenants.parent_id
  })) as MinimalTenant[]
}

/**
 * Get all descendants of a tenant (recursive)
 */
export async function getTenantDescendants(parentId: string): Promise<MinimalTenant[]> {
  const { data, error } = await supabase
    .rpc('get_tenant_descendants', { parent_id: parentId })

  if (error) {
    throw new Error(`Failed to fetch tenant descendants: ${error.message}`)
  }

  return data || []
}

/**
 * Get empty states for a tenant with inheritance from parent
 */
export async function getEmptyStatesWithInheritance(tenantId: string): Promise<any[]> {
  // First, get the tenant to check if it has a parent
  const { data: tenant, error: tenantError } = await supabase
    .from('tenants')
    .select('parent_id')
    .eq('id', tenantId)
    .single()

  if (tenantError) {
    throw new Error(`Failed to fetch tenant: ${tenantError.message}`)
  }

  // Get empty states for this tenant
  const { data: tenantStates, error: statesError } = await supabase
    .from('empty_states')
    .select('*')
    .eq('tenant_id', tenantId)

  if (statesError) {
    throw new Error(`Failed to fetch empty states: ${statesError.message}`)
  }

  // If tenant has states, return them
  if (tenantStates && tenantStates.length > 0) {
    return tenantStates
  }

  // If no states and has parent, get parent's states
  if (tenant.parent_id) {
    const { data: parentStates, error: parentError } = await supabase
      .from('empty_states')
      .select('*')
      .eq('tenant_id', tenant.parent_id)

    if (parentError) {
      throw new Error(`Failed to fetch parent empty states: ${parentError.message}`)
    }

    return parentStates || []
  }

  // Fall back to global states
  const { data: globalStates, error: globalError } = await supabase
    .from('empty_states')
    .select('*')
    .eq('is_global', true)

  if (globalError) {
    throw new Error(`Failed to fetch global empty states: ${globalError.message}`)
  }

  return globalStates || []
} 