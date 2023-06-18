import { useState } from 'react'
import { supabase } from '../../clients/supabase'
import { getIdFromUserByEmail, updateUserAddFriend } from '../../services/requests'

export default function AddFriendsRoute() {
  const [email, setEmail] = useState('')

  async function addFriendByEmail() {
    try {
      const { data, error } = await getIdFromUserByEmail(email)
      if (error) {
        throw error
      }
      if (!data) {
        alert('User not found')
        return
      }
      const friendId = data.id
      const currentUser = supabase.auth.user()
      if (!currentUser) {
        throw new Error('User not found')
      }
      const { error: updateError } = await updateUserAddFriend(currentUser.id, friendId)
      if (updateError) {
        throw updateError
      }
      alert('Friend added')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="flex justify-center items-center p-8 h-full">
      <div className="flex flex-col">
        <label>
          Friends Email
          <input
            className="border-2 border-gray-300 p-2 mb-4 rounded-md"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <button className="bg-blue-500 text-white p-2 rounded-md" onClick={addFriendByEmail}>
          Add Friend
        </button>
      </div>
    </div>
  )
}
