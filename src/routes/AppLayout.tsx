/** AppLayout.tsx – Grundlayout + topnav; visar login/register eller user + logout. */
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth'

export default function AppLayout() {
  const { user, loading, signout } = useAuth()
  const nav = useNavigate()

  if (loading) return <p>Laddar…</p>

  return (
    <>
      <nav style={{ display: 'flex', gap: 12, padding: 12, borderBottom: '1px solid #ddd' }}>
        <Link to="/">Hem</Link>
        <Link to="/properties">Boenden</Link>
        {user ? (
          <>
            <Link to="/bookings">Mina bokningar</Link>
            <span style={{ marginLeft: 'auto' }}>{user.name}</span>
            <button onClick={() => { signout(); nav('/'); }}>Logga ut</button>
          </>
        ) : (
          <>
            <span style={{ marginLeft: 'auto' }} />
            <Link to="/login">Logga in</Link>
            <Link to="/register">Registrera</Link>
          </>
        )}
      </nav>
      <Outlet />
    </>
  )
}