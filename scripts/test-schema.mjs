import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_SUPABASE_ANON_KEY } = process.env

if (!NEXT_PUBLIC_SUPABASE_URL) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL in .env.local')
  process.exit(1)
}

// Use service role key for backend operations, fallback to anon key
const SUPABASE_URL = NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = SUPABASE_SERVICE_ROLE_KEY || NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_KEY) {
  console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const testSchema = async () => {
  console.log('🧪 Testing Supabase Schema...')
  
  try {
    // Test 1: Create a test tenant
    console.log('\n1. Creating test tenant...')
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .insert({
        name: 'Test Organization',
        slug: 'test-org',
        type: 'organization'
      })
      .select()
      .single()
    
    if (tenantError) {
      console.error('❌ Tenant creation failed:', tenantError)
      return
    }
    
    console.log('✅ Tenant created:', tenant)
    
    // Test 2: Create an empty state
    console.log('\n2. Creating empty state...')
    const { data: emptyState, error: emptyStateError } = await supabase
      .from('empty_states')
      .insert({
        section: 'dashboard',
        title: 'Welcome to Your Dashboard!',
        content: 'Get started by creating your first project.',
        tenant_id: tenant.id
      })
      .select()
      .single()
    
    if (emptyStateError) {
      console.error('❌ Empty state creation failed:', emptyStateError)
      return
    }
    
    console.log('✅ Empty state created:', emptyState)
    
    // Test 3: Create a global empty state
    console.log('\n3. Creating global empty state...')
    const { data: globalState, error: globalError } = await supabase
      .from('empty_states')
      .insert({
        section: 'settings',
        title: 'Configure Your Settings',
        content: 'Customize your workspace settings here.',
        is_global: true
      })
      .select()
      .single()
    
    if (globalError) {
      console.error('❌ Global empty state creation failed:', globalError)
      return
    }
    
    console.log('✅ Global empty state created:', globalState)
    
    // Test 4: Query empty states
    console.log('\n4. Querying empty states...')
    const { data: states, error: queryError } = await supabase
      .from('empty_states')
      .select('*')
    
    if (queryError) {
      console.error('❌ Query failed:', queryError)
      return
    }
    
    console.log('✅ All empty states:', states)
    
    console.log('\n🎉 Schema test completed successfully!')
    
  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

testSchema() 