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

const testDescendants = async () => {
  try {
    console.log('🧪 Testing Descendants Function...')
    
    const parentTenantId = '06db96c2-ec8a-40a2-a438-ec4f81e1508b'
    
    console.log(`\n1. Testing descendants for parent: ${parentTenantId}`)
    
    const { data, error } = await supabase
      .rpc('get_tenant_descendants', { parent_id: parentTenantId })

    if (error) {
      throw error
    }

    console.log('\n✅ Descendants Result:')
    console.log(JSON.stringify(data, null, 2))

    console.log(`\n📊 Summary:`)
    console.log(`- Found ${data?.length || 0} descendants`)
    if (data && data.length > 0) {
      console.log(`- Descendants: ${data.map(t => t.name).join(', ')}`)
    }

  } catch (err) {
    console.error('❌ Test failed:', err)
  }
}

testDescendants() 