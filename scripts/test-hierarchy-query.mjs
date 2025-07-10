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

const testHierarchyQuery = async () => {
  try {
    console.log('🧪 Testing Hierarchy Query...')
    
    // Use the parent tenant ID from our previous test
    const parentTenantId = '06db96c2-ec8a-40a2-a438-ec4f81e1508b'
    
    console.log(`\n1. Fetching hierarchy for parent: ${parentTenantId}`)
    
    const { data, error } = await supabase
      .from('tenants')
      .select(`
        id, name, slug, type, group_mode, parent_id,
        children:tenants!parent_id (id, name, slug, type, group_mode, parent_id)
      `)
      .eq('id', parentTenantId)
      .single()

    if (error) {
      throw error
    }

    console.log('\n✅ Hierarchy Query Result:')
    console.log(JSON.stringify({
      parent: {
        id: data.id,
        name: data.name,
        slug: data.slug,
        type: data.type,
        group_mode: data.group_mode
      },
      children: data.children || []
    }, null, 2))

    console.log(`\n📊 Summary:`)
    console.log(`- Parent: ${data.name} (${data.children?.length || 0} children)`)
    console.log(`- Children: ${data.children?.map(c => c.name).join(', ') || 'None'}`)

  } catch (err) {
    console.error('❌ Test failed:', err)
  }
}

testHierarchyQuery() 