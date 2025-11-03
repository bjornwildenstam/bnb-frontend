/** main.tsx – Bootstrappar appen: Router + AuthProvider + routes. */
// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import { AuthProvider } from '@/context/AuthContext'   // ✅ rätt källa
import AppLayout from '@/routes/AppLayout'
import Home from '@/routes/Home'
import Login from '@/routes/Login'
import Register from '@/routes/Register'
import Properties from '@/routes/Properties'
import NewProperty from '@/routes/NewProperty'
import EditProperty from '@/routes/EditProperty'
import { RequireAuth } from '@/lib/auth'                // om du vill skydda routes

// ✅ Skapa router här (ingen import av "router" från App)
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },

      // Skyddade routes (valfritt men rekommenderat)
      { path: '/properties', element: <RequireAuth><Properties /></RequireAuth> },
      { path: '/properties/new', element: <RequireAuth><NewProperty /></RequireAuth> },
      { path: '/properties/:id', element: <RequireAuth><EditProperty /></RequireAuth> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
