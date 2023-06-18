import { createContext, useEffect, useState } from 'react'
import { supabase } from '../clients/supabase'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let gotSession = localStorage.getItem('authSession')
    if (gotSession) {
      setUser(JSON.parse(gotSession))
    }
    async function getSession() {
      setLoading(false)
      const { subscription } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session) {
          setUser(session.user)
          localStorage.setItem('authSession', JSON.stringify(session))
        } else {
          localStorage.removeItem('authSession')
          setUser(null)
        }
        setLoading(false)
      })
      return () => {
        subscription?.unsubscribe()
      }
    }
    getSession()
  }, [])

  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    logIn: (data) => supabase.auth.signInWithPassword(data),
    signOut: () => supabase.auth.signOut(),
    user: user,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
