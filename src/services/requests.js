import { supabase } from '../clients/supabase'

export const getDataFromUserId = async (id) => {
  return await supabase.from('users').select('*').eq('id', id).single()
}

export const getIdFromUserByEmail = async (email) => {
  return await supabase.from('users').select('id').eq('email', email).single()
}

export const updateUserAddFriend = async (id, friendId) => {
  return await supabase
    .from('users')
    .update({
      friends: supabase.raw(`array_append(friends, '${friendId}')`),
    })
    .eq('id', id)
}
