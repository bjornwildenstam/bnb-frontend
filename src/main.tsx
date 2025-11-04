/** main.tsx – Bootstrappar appen: Router + AuthProvider + routes. */
// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
  createHashRouter,   
} from 'react-router-dom'

import AppLayout from './routes/AppLayout'
import Home from './routes/Home'
import Login from './routes/Login'
import Register from './routes/Register'
import Properties from './routes/Properties'
import NewProperty from './routes/NewProperty'
import EditProperty from './routes/EditProperty'
import { AuthProvider } from './lib/auth'  
import './index.css'


const router = createHashRouter([
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
