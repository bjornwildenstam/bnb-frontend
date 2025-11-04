/** main.tsx – Bootstrappar appen: Router + AuthProvider + routes. */
// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './lib/auth'

import AppLayout from './routes/AppLayout'
import Home from './routes/Home'
import Login from './routes/Login'
import Register from './routes/Register'
import Properties from './routes/Properties'
import NewProperty from './routes/NewProperty'
import EditProperty from './routes/EditProperty'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/properties', element: <Properties /> },
      { path: '/properties/new', element: <NewProperty /> },
      { path: '/properties/:id', element: <EditProperty /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
