import { supabase } from '../clients/supabase'

export const getDataFromUserId = async (id) => {
  return await supabase.from('users').select('*').eq('id', id).single()
}
