/** Properties.tsx – Samma som Home fast “resurssida” för properties. */
// src/routes/Properties.tsx
// Lista alla listings + länkar till Edit-sida och "New".
// Hämtar från /properties och visar name + location.

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '@/lib/api'
import type { Property } from '@/types'

export default function PropertiesPage() {
  const [list, setList] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const data = await api.get<Property[]>('/properties')
        if (alive) setList(data)
      } catch (e: any) {
        if (alive) setError(e.message ?? 'Failed to load')
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => { alive = false }
  }, [])

  if (loading) return <p>Laddar…</p>
  if (error) return <p style={{ color: 'crimson' }}>{error}</p>

  return (
    <div style={{ maxWidth: 720 }}>
      <h1>Listings</h1>

      <p>
        <Link to="/properties/new">+ New listing</Link>
      </p>

      {list.length === 0 ? (
        <p>Inga listings ännu.</p>
      ) : (
        <ul style={{ display: 'grid', gap: 8, paddingLeft: 18 }}>
          {list.map((p) => (
            <li key={p.id}>
              <strong>{p.name}</strong> — {p.location}{' '}
              <Link to={`/properties/${p.id}`} style={{ marginLeft: 8 }}>
                Edit
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}