import { useState } from 'react'
import { signIn } from '../../clients/supabase'
import { useNavigate } from 'react-router-dom'

function LoginScreen() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    if (email && password) {
      const { error } = await signIn(email, password)
      if (error) {
        alert('Error: ' + error.message)
      } else {
        navigate('/')
      }
    } else {
      alert('Error: Please fill out all fields')
    }
  }

  const handleSignUpNavigation = () => {
    navigate('/register')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-4">
      <h1 className="text-3xl mb-4">Tá pago</h1>
      <span className="text-5xl">💪</span>

      <input
        className="border border-gray-200 rounded-md px-3 py-2 w-full mt-4"
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border border-gray-200 rounded-md px-3 py-2 w-full mt-4"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mt-4" onClick={handleLogin}>
        Login
      </button>

      <button className="text-blue-500 mt-4" onClick={handleSignUpNavigation}>
        Dont have an account? Sign Up
      </button>
    </div>
  )
}

export default LoginScreen
