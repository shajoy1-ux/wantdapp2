'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useApp } from '@/components/providers/AppProvider'

export function MobileNav() {
  const { user, getUnreadCount } = useApp()
  const pathname = usePathname()
  const unread = user ? getUnreadCount(user.email) : 0

  // A6 fix: different tabs for logged-in vs guest
  const tabs = user
    ? [
        { href: '/', icon: '🏠', label: 'Home' },
        { href: '/browse', icon: '🔍', label: 'Browse' },
        { href: user.role === 'buyer' ? '/post' : '/browse', icon: '＋', label: 'Post', primary: true },
        { href: '/messages', icon: '💬', label: 'Inbox', badge: unread > 0 ? unread : null },
        {
          href: user.role === 'seller' ? '/dashboard/seller' : '/dashboard/buyer',
          icon: '👤', label: user.name?.split(' ')[0] || 'Me',
        },
      ]
    : [
        { href: '/', icon: '🏠', label: 'Home' },
        { href: '/browse', icon: '🔍', label: 'Browse' },
        { href: '/post', icon: '＋', label: 'Post', primary: true },
        { href: '/about', icon: 'ℹ️', label: 'About' },
        { href: '/auth', icon: '👤', label: 'Sign In' },
      ]

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'rgba(22,22,24,0.97)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid #272729',
      zIndex: 200,
      paddingBottom: 'env(safe-area-inset-bottom, 12px)',
      display: 'none',
    }} className="mobile-only-nav">
      <div style={{ display: 'flex', width: '100%' }}>
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          return (
            <Link
              key={tab.href + tab.label}
              href={tab.href}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '10px 4px 8px', textDecoration: 'none', position: 'relative',
              }}
            >
              {tab.primary ? (
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'var(--accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, fontWeight: 700, color: '#fff',
                  marginBottom: 3, marginTop: -8,
                  boxShadow: '0 4px 16px rgba(255,85,0,0.4)',
                }}>
                  {tab.icon}
                </div>
              ) : (
                <div style={{ position: 'relative' }}>
                  <span style={{ fontSize: 20, marginBottom: 3, display: 'block' }}>{tab.icon}</span>
                  {tab.badge && (
                    <span style={{
                      position: 'absolute', top: -4, right: -8,
                      background: 'var(--accent)', color: '#fff',
                      borderRadius: '50%', width: 16, height: 16,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 9, fontWeight: 800,
                    }}>{tab.badge > 9 ? '9+' : tab.badge}</span>
                  )}
                </div>
              )}
              <span style={{
                fontSize: 10,
                fontWeight: tab.primary ? 700 : isActive ? 700 : 500,
                color: tab.primary ? 'var(--accent)' : isActive ? 'var(--accent)' : 'var(--muted)',
                marginTop: tab.primary ? 0 : 3,
              }}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .mobile-only-nav { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
