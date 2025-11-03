/** auth.tsx – Enkel AuthContext som hämtar /auth/me och exponerar user + guards.
 *  - useAuth() ger { user, loading, signin, signup, signout }
 *  - RequireAuth: wrapper som skyddar sidor (kräver inloggning)
 */
// src/lib/auth.tsx
import { ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export function RequireAuth({ children }: { children: ReactElement }) {
  const { user, loading } = useAuth()
  const loc = useLocation()
  if (loading) return <p>Laddar…</p>
  if (!user) return <Navigate to="/login" state={{ from: loc }} replace />
  return children
}