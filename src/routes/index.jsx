import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useEffect } from 'react'

export default function IndexRoute() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <div className="flex justify-center items-center h-screen">
      <Outlet />
    </div>
  )
}
