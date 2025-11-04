/** auth.tsx – Enkel AuthContext som hämtar /auth/me och exponerar user + guards.
 *  - useAuth() ger { user, loading, signin, signup, signout }
 *  - RequireAuth: wrapper som skyddar sidor (kräver inloggning)
 */
// src/lib/auth.tsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import { api } from './api'
import type { User } from '@/types'
import { Navigate, useLocation } from 'react-router-dom'

type AuthCtx = {
  user: User | null
  loading: boolean
  refresh: () => Promise<void>
  signin: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  signout: () => Promise<void>
}

const Ctx = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    try {
      const u = await api.me<User>()
      setUser(u)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  const signin = async (email: string, password: string) => {
    await api.signin({ email, password })
    await refresh()
  }

  const signup = async (name: string, email: string, password: string) => {
    await api.signup({ name, email, password })
    await refresh()
  }

  const signout = async () => {
    await api.signout()
    setUser(null)
  }

  return (
    <Ctx.Provider value={{ user, loading, refresh, signin, signup, signout }}>
      {children}
    </Ctx.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}

export function RequireAuth({ children }: { children: React.ReactElement }) {
  const { user, loading } = useAuth()
  const loc = useLocation()
  if (loading) return <p>Laddar…</p>
  if (!user) return <Navigate to="/login" state={{ from: loc }} replace />
  return children
}