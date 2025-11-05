/** api.ts – Minimal fetch-wrapper för Header-JWT (ingen cookie)
 *  - Läser baseURL från VITE_API_URL
 *  - Lagrar JWT i minne (authToken) och skickar den som Authorization: Bearer <token>
 *  - Kastar fel vid icke svar
 */

const BASE_URL = import.meta.env.VITE_API_URL as string

type FetchOptions = RequestInit & { json?: unknown }

let authToken: string | null = null

export const setAuthToken = (t: string | null) => {
  authToken = t
  if (t) localStorage.setItem('auth_token', t)
  else localStorage.removeItem('auth_token')
}

// Ladda ev. token vid start (så /me inte blir 401 efter refresh)
;(() => {
  const t = localStorage.getItem('auth_token')
  if (t) authToken = t
})()

function joinUrl(base: string, path: string) {
  const b = base.endsWith('/') ? base.slice(0, -1) : base
  const p = path.startsWith('/') ? path : `/${path}`
  return b + p
}

async function request<T>(path: string, opts: FetchOptions = {}): Promise<T> {
  const headers = new Headers(opts.headers)
  const hasJson = opts.json !== undefined
  const body = hasJson ? JSON.stringify(opts.json) : opts.body
  if (hasJson) headers.set('Content-Type', 'application/json')
  if (authToken) headers.set('Authorization', `Bearer ${authToken}`)

  const res = await fetch(joinUrl(BASE_URL, path), {
    method: opts.method || 'GET',
    headers,
    body,
  })

  if (!res.ok) {
    let msg = `${res.status} ${res.statusText}`
    try {
      const err = await res.json()
      msg = (err as any)?.message ?? msg
    } catch {}
    throw new Error(msg)
  }
  if (res.status === 204) return undefined as T
  return (await res.json()) as T
}

export const api = {
  // --- generella helpers ---
  get:  <T>(p: string) => request<T>(p),
  post: <T>(p: string, json?: unknown) => request<T>(p, { method: 'POST', json }),
  put:  <T>(p: string, json?: unknown) => request<T>(p, { method: 'PUT',  json }),
  del:  <T>(p: string) => request<T>(p, { method: 'DELETE' }),

  // --- auth ---
  signin: async (data: { email: string; password: string }) => {
    const r = await request<{ token: string }>('/auth/signin', {
      method: 'POST',
      json: data,
    })
    setAuthToken(r.token)
    return r
  },

  signup: async (data: { name: string; email: string; password: string }) => {
    const r = await request<{ token?: string; message?: string }>('/auth/signup', {
      method: 'POST',
      json: data,
    })
    if (r.token) setAuthToken(r.token)
    return r
  },

  signout: async () => {
    try {
      await request('/auth/signout', { method: 'POST' })
    } catch {
    }
    setAuthToken(null)
  },

  me: <T>() => request<T>('/auth/me'),

  // --- bookings ---
  createBooking: (body: {
    propertyId: string
    checkInDate: string
    checkOutDate: string
  }) =>
    request('/bookings', {
      method: 'POST',
      json: body,
    }),

  listBookings:  <T>() => request<T>('/bookings'),
}

  

