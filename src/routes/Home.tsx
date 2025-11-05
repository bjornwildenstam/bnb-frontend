/** Home.tsx – Enkel startsida: visar senaste properties (read). */
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "@/lib/api"
import type { Property } from "@/types"

const HERO_IMAGE= "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=1200"

export default function HomePage() {
  const [popular, setPopular] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const heroProperty = popular[0]
  const heroImage = (heroProperty as any)?.imageUrl
  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const data = await api.get<Property[]>("/properties")
        if (!alive) return
        // ta t.ex. de 4 första som "populära"
        setPopular(data.slice(0, 4))
      } catch {
        if (alive) setPopular([])
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="home-hero page-card">
        <div className="home-hero-left">
          <h1>Glöm vardagsstressen, hitta din nästa vistelse.</h1>
          <p>
            Hantera dina egna listings eller hitta inspiration bland alla boenden
            i systemet. Logga in för att lägga upp, uppdatera och boka.
          </p>

          <div className="home-hero-actions">
            <Link to="/register">
              <button>Kom igång gratis</button>
            </Link>
            <Link to="/login">
              <button className="btn-secondary">Logga in</button>
            </Link>
          </div>

          <div className="home-hero-stats">
            <div>
              <strong>80K+</strong>
              <span>resenärer</span>
            </div>
            <div>
              <strong>1.4K</strong>
              <span>städer</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>hantera dina listings</span>
            </div>
          </div>
        </div>

        <div className="home-hero-right">
          <div className="home-hero-image-wrapper">
            {heroImage && (
              <img
                src={HERO_IMAGE}
                alt="Exempelboende"
                className="home-hero-image"

                />
            )}
          </div>
        </div>
      </section>

      {/* “Sök”-bar (fejk, mest design) */}
      <section className="home-search page-card">
        <div className="home-search-fields">
          <div className="home-search-field">
            <span className="home-search-label">Var</span>
            <span className="home-search-placeholder">Sök destinationer</span>
          </div>
          <div className="home-search-field">
            <span className="home-search-label">Checka in</span>
            <span className="home-search-placeholder">Lägg till datum</span>
          </div>
          <div className="home-search-field">
            <span className="home-search-label">Checka ut</span>
            <span className="home-search-placeholder">Lägg till datum</span>
          </div>
          <div className="home-search-field">
            <span className="home-search-label">Gäster</span>
            <span className="home-search-placeholder">Lägg till gäster</span>
          </div>
        </div>
        <button className="home-search-button">Sök</button>
      </section>

      {/* POPULÄRA BOENDEN */}
<section className="home-popular">
  <div className="home-section-header">
    <h2>Populära boenden just nu</h2>
    <Link to="/properties">Visa alla listings →</Link>
  </div>

  {loading ? (
    <p>Laddar boenden…</p>
  ) : popular.length === 0 ? (
    <p>Inga boenden ännu. Logga in och skapa din första listing!</p>
  ) : (
    <div className="home-popular-list">
      {popular.map((p) => {
        const img = (p as any).imageUrl

        return (
          <article key={p.id} className="property-card">
            <img
              src={img}
              alt={p.name}
              className="property-card__image"
            />
            <div className="property-card__body">
              <div className="property-card__title-line">
                <h3>{p.name}</h3>
                <span className="property-card__price">
                  {p.pricePerNight} kr / natt
                </span>
              </div>
              <p className="property-card__location">{p.location}</p>
              <div className="property-card__footer">
                <span className="property-card__tag">GÄSTFAVORIT</span>
                <Link to={`/properties/${p.id}`} className="btn-link">
                  Visa mer
                </Link>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )}
</section>
    </div>
  )
}