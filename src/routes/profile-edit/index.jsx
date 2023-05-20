import { useState, useEffect } from 'react'
import { supabase } from '../../clients/supabase'

export default function ProfileEditRoute() {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    fetchUserData()
  }, [])

  async function fetchUserData() {
    try {
      const currentUser = supabase.auth.user()
      if (!currentUser) {
        throw new Error('User not found')
      }
      const { data, error } = await supabase.from('users').select('*').eq('id', currentUser.id).single()
      if (error) {
        throw error
      }
      setUser(data)
      setEmail(data.email)
      setName(data.name)
    } catch (error) {
      alert(error.message)
    }
  }

  async function saveChanges() {
    try {
      const currentUser = supabase.auth.user()
      if (!currentUser) {
        throw new Error('User not found')
      }
      const { error } = await supabase.from('users').update({ email, name }).eq('id', currentUser.id)
      if (error) {
        throw error
      }
      alert('Changes saved')
    } catch (error) {
      alert(error.message)
    }
  }

  if (!user) {
    return <span>Loading...</span>
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-5">
      <span>Email</span>
      <input
        className="border border-gray-200 rounded-md px-3 py-2 w-full mt-2 mb-4"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
      />
      <span>Name</span>
      <input
        className="border border-gray-200 rounded-md px-3 py-2 w-full mt-2 mb-4"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mt-4" onClick={saveChanges}>
        Save Changes
      </button>
    </div>
  )
}
