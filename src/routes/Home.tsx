/** Home.tsx – Enkel startsida: visar senaste properties (read). */
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import type { Property } from '@/types'
import { Link } from 'react-router-dom'

export default function Home() {
  const [items, setItems] = useState<Property[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.get<Property[]>('/properties')
      .then(setItems)
      .catch((e) => setError(e.message))
  }, [])

  if (error) return <p style={{ color: 'crimson' }}>{error}</p>

  return (
    <section>
      <h1>Listings</h1>
      <ul style={{ paddingLeft: 16 }}>
        {items.map(p => (
          <li key={p.id} style={{ margin: '8px 0' }}>
            <strong>{p.name}</strong> — {p.location} — {p.pricePerNight} kr/natt
            {' '}
            <Link to={`/properties/${p.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
      <Link to="/properties/new">Skapa ny</Link>
    </section>
  )
}