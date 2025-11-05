import { useEffect, useState } from "react"
import { api } from "@/lib/api"

type Booking = {
  id: string
  userId: string
  propertyId: string
  checkInDate: string
  checkOutDate: string
  totalPrice: number
  createdAt: string
  property?: {
    id: string
    name: string
    location: string
    pricePerNight: number
  }
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true

    ;(async () => {
      try {
        const data = await api.get<Booking[]>("/bookings")
        if (!alive) return
        setBookings(data)
      } catch (err) {
        if (!alive) return
        setError("Kunde inte hämta dina bokningar.")
      } finally {
        if (alive) setLoading(false)
      }
    })()

    return () => {
      alive = false
    }
  }, [])

  if (loading) {
    return (
      <div className="page-card">
        <h1>Mina bokningar</h1>
        <p>Laddar dina bokningar…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-card">
        <h1>Mina bokningar</h1>
        <p style={{ color: "crimson" }}>{error}</p>
      </div>
    )
  }

  if (bookings.length === 0) {
    return (
      <div className="page-card">
        <h1>Mina bokningar</h1>
        <p>Du har inga bokningar ännu.</p>
      </div>
    )
  }

  return (
    <div className="page-card">
      <h1>Mina bokningar</h1>
      <ul className="booking-list">
        {bookings.map((b) => (
          <li key={b.id} className="booking-list-item">
            <div className="booking-main">
              <strong>{b.property?.name ?? "Okänt boende"}</strong>
              <div className="booking-dates">
                {b.checkInDate} – {b.checkOutDate}
              </div>
              <div className="booking-location">
                {b.property?.location}
              </div>
            </div>
            <div className="booking-side">
              <div className="booking-price">{b.totalPrice} kr</div>
              {b.property?.pricePerNight && (
                <div className="booking-price-night">
                  ({b.property.pricePerNight} kr / natt)
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}