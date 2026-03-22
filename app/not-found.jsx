import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
      <div>
        <div style={{ fontSize: 72, marginBottom: 20, animation: 'float 3s ease-in-out infinite' }}>🔍</div>
        <h1 style={{ fontWeight: 900, fontSize: 48, color: 'var(--fg)', marginBottom: 10 }}>404</h1>
        <h2 style={{ fontWeight: 700, fontSize: 22, color: 'var(--fg)', marginBottom: 14 }}>Page not found</h2>
        <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 36, maxWidth: 380, margin: '0 auto 36px' }}>
          This page doesn't exist. The want might have been filled, or the URL might be wrong.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ background: 'var(--accent)', color: '#fff', borderRadius: 12, padding: '13px 28px', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
            Go Home
          </Link>
          <Link href="/browse" style={{ background: 'transparent', color: 'var(--fg)', border: '1px solid #272729', borderRadius: 12, padding: '12px 24px', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
            Browse Requests
          </Link>
        </div>
      </div>
    </div>
  )
}
