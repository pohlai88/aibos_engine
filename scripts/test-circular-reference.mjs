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

const testCircularReference = async () => {
  try {
    console.log('🧪 Testing Circular Reference Prevention...')
    
    // Get our existing parent and child
    const parentId = '06db96c2-ec8a-40a2-a438-ec4f81e1508b'
    const childId = 'fbbe0a3d-fcbb-47ee-af9d-144003d460af'
    
    console.log(`\n1. Testing: Setting parent as child of its own child (should fail)`)
    console.log(`   Parent ID: ${parentId}`)
    console.log(`   Child ID: ${childId}`)
    
    // Try to set the parent as a child of its own child (circular reference)
    const { error } = await supabase
      .from('tenants')
      .update({ parent_id: childId })
      .eq('id', parentId)

    if (error) {
      console.log('✅ Circular reference correctly prevented!')
      console.log(`   Error: ${error.message}`)
    } else {
      console.log('❌ Circular reference prevention failed!')
    }

    console.log(`\n2. Testing: Valid parent-child relationship (should succeed)`)
    
    // Reset to valid relationship
    const { error: resetError } = await supabase
      .from('tenants')
      .update({ parent_id: parentId })
      .eq('id', childId)

    if (resetError) {
      console.log(`❌ Failed to reset relationship: ${resetError.message}`)
    } else {
      console.log('✅ Valid relationship restored successfully!')
    }

  } catch (err) {
    console.error('❌ Test failed:', err)
  }
}

testCircularReference() 