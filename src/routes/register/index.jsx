import { useState } from 'react'
import { supabase } from '../../clients/supabase'

export default function RegisterRoute() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  async function handleRegister() {
    try {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        throw error
      }

      const { user } = await supabase.auth.signInWithPassword({ email, password })
      if (!user) {
        throw new Error('User not found')
      }

      const { error: insertError } = await supabase.from('users').insert([
        {
          id: user.id,
          email: user.email,
          name: name,
          friends: [],
          friends_request: [],
        },
      ])

      if (insertError) {
        throw insertError
      }

      // Navigation logic should go here, depends on your routing solution
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-5">
      <span>Name</span>
      <input
        className="border border-gray-200 rounded-md px-3 py-2 w-full mt-2 mb-4"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <span>Email</span>
      <input
        className="border border-gray-200 rounded-md px-3 py-2 w-full mt-2 mb-4"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
      />
      <span>Password</span>
      <input
        className="border border-gray-200 rounded-md px-3 py-2 w-full mt-2 mb-4"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mt-4" onClick={handleRegister}>
        Register
      </button>
    </div>
  )
}
