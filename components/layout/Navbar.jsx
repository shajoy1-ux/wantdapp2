'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useApp } from '@/components/providers/AppProvider'

export function Navbar() {
  const { user, logout, getUnreadCount } = useApp()
  const pathname = usePathname()
  const unread = user ? getUnreadCount(user.email) : 0

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/')

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(12,12,14,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #272729',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        <Link href="/" style={{ fontSize: 20, fontWeight: 900, textDecoration: 'none', color: 'var(--fg)' }}>
          <span style={{ color: 'var(--accent)' }}>wantd</span>.in
        </Link>

        <div className="desktop-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <NavLink href="/browse" active={isActive('/browse')}>Browse</NavLink>
          <NavLink href="/feed" active={isActive('/feed')}>Want Feed 🔥</NavLink>

          {user ? (
            <>
              {/* Messages with unread badge */}
              <Link href="/messages" style={{
                position: 'relative',
                color: isActive('/messages') ? 'var(--accent)' : 'var(--muted-high)',
                textDecoration: 'none', fontSize: 14, fontWeight: 600,
                padding: '8px 14px', borderRadius: 8,
                background: isActive('/messages') ? 'rgba(255,85,0,0.08)' : 'transparent',
                display: 'inline-flex', alignItems: 'center', gap: 5,
              }}>
                💬 Messages
                {unread > 0 && (
                  <span style={{
                    background: 'var(--accent)', color: '#fff',
                    borderRadius: '50%', width: 18, height: 18,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 800, marginLeft: 2,
                  }}>{unread > 9 ? '9+' : unread}</span>
                )}
              </Link>

              <NavLink
                href={user.role === 'seller' ? '/dashboard/seller' : '/dashboard/buyer'}
                active={isActive('/dashboard')}
              >
                {user.role === 'seller' ? 'My Bids' : 'My Requests'}
              </NavLink>

              {user.role === 'buyer' && (
                <Link href="/post" style={{ ...btnPrimary, textDecoration: 'none' }}>+ Post Want</Link>
              )}
              {user.role === 'seller' && (
                <Link href="/seller/apply" style={{ ...btnSecondary, textDecoration: 'none', fontSize: 14, padding: '9px 18px' }}>
                  {user.isVerifiedSeller ? '✓ Verified' : 'Get Verified'}
                </Link>
              )}
              <button onClick={logout} style={{ ...btnGhost, color: 'var(--muted-high)', fontSize: 13 }}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth" style={{ ...btnSecondary, textDecoration: 'none', fontSize: 14, padding: '9px 18px' }}>Sign In</Link>
              <Link href="/post" style={{ ...btnPrimary, textDecoration: 'none' }}>+ Post Want</Link>
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav-actions { display: none !important; }
        }
      `}</style>
    </nav>
  )
}

function NavLink({ href, active, children }) {
  return (
    <Link href={href} style={{
      color: active ? 'var(--accent)' : 'var(--muted-high)',
      textDecoration: 'none', fontSize: 14, fontWeight: 600,
      padding: '8px 14px', borderRadius: 8,
      background: active ? 'rgba(255,85,0,0.08)' : 'transparent',
      transition: 'all 0.15s',
    }}>
      {children}
    </Link>
  )
}

const btnPrimary = {
  background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 10,
  padding: '9px 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'inherit',
}
const btnSecondary = {
  background: 'transparent', color: 'var(--fg)', border: '1px solid #272729', borderRadius: 10,
  padding: '9px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'inherit',
}
const btnGhost = {
  background: 'none', border: 'none', cursor: 'pointer',
  fontFamily: 'inherit', fontSize: 14, color: 'var(--muted)', padding: '8px 12px',
}
