import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import type { Booking } from "@/types"
import { RequireAuth } from '@/lib/auth'

function BookingsInner() {
  const [list, setList] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const data = await api.listBookings<Booking[]>()
        setList(data)
      } catch (e: any) {
        setError(e.message ?? "Failed to load bookings")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <p>Loading bookings…</p>
  if (error) return <p style={{ color: "crimson" }}>{error}</p>
  if (list.length === 0) return <p>No bookings yet.</p>

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {list.map((b) => (
        <li key={b.id} style={{ marginBottom: 12 }}>
          <strong>{b.property?.name ?? "Unknown property"}</strong>
          <br />
          {b.checkInDate} → {b.checkOutDate} ({b.totalPrice} kr)
        </li>
      ))}
    </ul>
  )
}

export default function BookingsPage() {
  return (
    <RequireAuth>
      <BookingsInner />
    </RequireAuth>
  )
}