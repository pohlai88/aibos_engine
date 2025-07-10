import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_SUPABASE_ANON_KEY } = process.env
const SUPABASE_URL = NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = SUPABASE_SERVICE_ROLE_KEY || NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing Supabase env vars')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const testHierarchy = async () => {
  try {
    // 1. Create a parent tenant
    const { data: parentTenant, error: parentError } = await supabase
      .from('tenants')
      .insert({
        name: 'Parent Inc',
        slug: 'parent-inc',
        type: 'organization',
        group_mode: false
      })
      .select()
      .single()
    if (parentError && parentError.code !== '23505') {
      throw parentError
    }
    // If already exists, fetch it
    let parent = parentTenant
    if (!parent) {
      const { data } = await supabase
        .from('tenants')
        .select('*')
        .eq('slug', 'parent-inc')
        .single()
      parent = data
    }

    // 2. Create a child tenant
    const { data: childTenant, error: childError } = await supabase
      .from('tenants')
      .insert({
        name: 'Child LLC',
        slug: 'child-llc',
        type: 'organization',
        parent_id: parent.id,
        group_mode: false
      })
      .select()
      .single()
    if (childError && childError.code !== '23505') {
      throw childError
    }
    // If already exists, fetch it
    let child = childTenant
    if (!child) {
      const { data } = await supabase
        .from('tenants')
        .select('*')
        .eq('slug', 'child-llc')
        .single()
      child = data
    }

    // 3. Assign a user to the parent tenant (use a test user from auth.users)
    // We'll just pick the first user for demo purposes
    const { data: users, error: userError } = await supabase
      .from('user_tenants')
      .select('user_id')
      .limit(1)
    if (userError || !users || users.length === 0) {
      throw new Error('No users found in user_tenants. Please add a user to a tenant first.')
    }
    const testUserId = users[0].user_id
    // Assign as owner if not already assigned
    const { error: assignError } = await supabase
      .from('user_tenants')
      .upsert({
        user_id: testUserId,
        tenant_id: parent.id,
        role: 'owner',
        is_primary: true
      })
    if (assignError) {
      throw assignError
    }

    // Output the structure
    console.log(JSON.stringify({
      parentTenant: {
        id: parent.id,
        name: parent.name,
        slug: parent.slug
      },
      childTenant: {
        id: child.id,
        name: child.name,
        slug: child.slug,
        parent_id: child.parent_id,
        group_mode: child.group_mode
      },
      userAccess: [
        { tenant_id: parent.id, user_id: testUserId, role: 'owner' }
      ]
    }, null, 2))
  } catch (err) {
    console.error('❌ Test failed:', err)
  }
}

testHierarchy() 