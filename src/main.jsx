import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeScreen from './components/home-screen/index.jsx';
import AddFriendsScreen from './components/add-friends-screen/index.jsx';
import RegisterScreen from './components/register/index.jsx';
import LoginScreen from './components/login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: '/login',
    element: <LoginScreen />
  },
  {
    path: 'register',
    element: <RegisterScreen />
  },
  {
    path: 'add-friends',
    element: <AddFriendsScreen />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
