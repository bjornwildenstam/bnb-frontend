// src/context/AuthContext.tsx
// Global auth-state: laddar /auth/me, hanterar signin/signup/signout, exponerar user + loading

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { api, setAuthToken } from '@/lib/api'

type User = { id: string; email: string; name: string }

type AuthContextValue = {
  user: User | null
  loading: boolean
  signin: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  signout: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const me = await api.me<User>()
        if (alive) setUser(me)
      } catch {
        if (alive) setUser(null)
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => { alive = false }
  }, [])

  const refresh = async () => {
    try {
      const me = await api.me<User>()
      setUser(me)
    } catch {
      setUser(null)
    }
  }

  const signin = async (email: string, password: string) => {
    await api.signin({ email, password }) // sätter token i api.ts
    await refresh()
  }

  const signup = async (name: string, email: string, password: string) => {
    const r = await api.signup({ name, email, password })
    if ((r as any)?.token) await refresh()
    // annars (t.ex. email verify krävs) kan du visa r.message
  }

  const signout = async () => {
    try { await api.signout() } catch {}
    setAuthToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signin, signup, signout, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}