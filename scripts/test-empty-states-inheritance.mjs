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

const testEmptyStatesInheritance = async () => {
  try {
    console.log('🧪 Testing Empty States Inheritance...')
    
    const parentId = '06db96c2-ec8a-40a2-a438-ec4f81e1508b'
    const childId = 'fbbe0a3d-fcbb-47ee-af9d-144003d460af'
    
    console.log(`\n1. Creating empty states for parent...`)
    
    // Create empty states for parent
    const { data: parentStates, error: parentError } = await supabase
      .from('empty_states')
      .insert([
        {
          section: 'dashboard',
          title: 'Parent Dashboard',
          content: 'Welcome to the parent dashboard!',
          tenant_id: parentId
        },
        {
          section: 'settings',
          title: 'Parent Settings',
          content: 'Configure parent settings here.',
          tenant_id: parentId
        }
      ])
      .select()

    if (parentError) {
      console.log('Parent states already exist or error:', parentError.message)
    } else {
      console.log('✅ Created parent empty states:', parentStates?.length || 0)
    }

    console.log(`\n2. Testing inheritance for child (should get parent's states)...`)
    
    // Test inheritance logic manually
    const { data: childStates, error: childError } = await supabase
      .from('empty_states')
      .select('*')
      .eq('tenant_id', childId)

    if (childError) {
      throw childError
    }

    console.log(`Child has ${childStates?.length || 0} own states`)

    if (!childStates || childStates.length === 0) {
      console.log('Child has no states, should inherit from parent...')
      
      const { data: inheritedStates, error: inheritedError } = await supabase
        .from('empty_states')
        .select('*')
        .eq('tenant_id', parentId)

      if (inheritedError) {
        throw inheritedError
      }

      console.log(`✅ Child would inherit ${inheritedStates?.length || 0} states from parent`)
      if (inheritedStates && inheritedStates.length > 0) {
        console.log('Inherited states:')
        inheritedStates.forEach(state => {
          console.log(`  - ${state.section}: ${state.title}`)
        })
      }
    }

    console.log(`\n3. Testing global fallback...`)
    
    const { data: globalStates, error: globalError } = await supabase
      .from('empty_states')
      .select('*')
      .eq('is_global', true)

    if (globalError) {
      throw globalError
    }

    console.log(`✅ Found ${globalStates?.length || 0} global empty states`)

  } catch (err) {
    console.error('❌ Test failed:', err)
  }
}

testEmptyStatesInheritance() 