
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkSupra() {
  const { data, error } = await supabase.from('supra_check').select('*')
    if (error) {
        console.error('Error fetching data:', error)
    } else {
        console.log('Data from supra_check table:', data)
    }
}

checkSupra()