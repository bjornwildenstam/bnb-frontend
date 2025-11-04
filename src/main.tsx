/** main.tsx – Bootstrappar appen: Router + AuthProvider + routes. */
// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import AppLayout from './routes/AppLayout'
import Home from './routes/Home'
import Login from './routes/Login'
import Register from './routes/Register'
import Properties from './routes/Properties'
import NewProperty from './routes/NewProperty'
import EditProperty from './routes/EditProperty'
import BookingsPage from "./routes/Bookings"
import NewBookingPage from "./routes/NewBooking"
import { AuthProvider } from './lib/auth'

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
      { path: '/bookings', element: <BookingsPage/>},
      { path: '/bookings/new/:propertyId', element: <NewBookingPage/>}
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
