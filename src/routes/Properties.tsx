/** Properties.tsx – Samma som Home fast “resurssida” för properties. */
// src/routes/Properties.tsx
// Lista alla listings + länkar till Edit-sida och "New".
// Hämtar från /properties och visar name + location.
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '@/lib/api'
import type { Property } from '@/types'
import { useAuth } from '@/lib/auth'

// Standard-bild om en property saknar egen bild-URL
const PLACEHOLDER_IMAGE =
  'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=800'

export default function PropertiesPage() {
  const { user } = useAuth() 

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
    return () => {
      alive = false
    }
  }, [])

  if (loading) return <p>Laddar…</p>
  if (error) return <p style={{ color: 'crimson' }}>{error}</p>

  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <h1>Listings</h1>

      <p>
        <Link to="/properties/new">+ New listing</Link>
      </p>

      {list.length === 0 ? (
        <p>Inga listings ännu.</p>
      ) : (
        <ul
          style={{
            display: 'grid',
            gap: 16,
            padding: 0,
            listStyle: 'none',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          }}
        >
          {list.map((p) => {
            const canEdit = user && p.userId && user.id === p.userId

            return (
              <li key={p.id} className="property-card">
                <img
                  src={(p as any).imageUrl || PLACEHOLDER_IMAGE}
                  alt={p.name}
                  className="property-card__image"
                />
                <div className="property-card__body">
                  <h3>{p.name}</h3>
                  <p>{p.location}</p>
                  <p>{p.pricePerNight} kr / natt</p>

                  {canEdit && (
                    <Link to={`/properties/${p.id}`}>
                      Edit
                    </Link>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}