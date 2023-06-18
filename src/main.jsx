import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomeRoute from './routes/home'
import AddFriendsRoute from './routes/add-friends'
import RegisterRoute from './routes/register'
import LoginRoute from './routes/login'
import IndexRoute from './routes'
import { AuthProvider } from './context/auth'
import PostModalProvider from './context/post-modal'

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexRoute />,
    errorElement: <div>error</div>,
    children: [
      {
        index: true,
        path: '/',
        element: <HomeRoute />,
      },
      {
        path: 'login',
        element: <LoginRoute />,
      },
      {
        path: 'register',
        element: <RegisterRoute />,
      },
      {
        path: 'add-friends',
        element: <AddFriendsRoute />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PostModalProvider>
        <RouterProvider router={router} />
      </PostModalProvider>
    </AuthProvider>
  </React.StrictMode>,
)
