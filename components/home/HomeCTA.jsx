import Link from 'next/link'

export function HomeCTA() {
  return (
    <section style={{ padding: 'clamp(56px, 8vw, 96px) 24px', background: 'var(--surface)', borderTop: '1px solid #272729' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>

        <div style={{
          background: 'linear-gradient(135deg, rgba(255,85,0,0.12), rgba(255,140,66,0.06))',
          border: '1px solid rgba(255,85,0,0.2)',
          borderRadius: 28, padding: 'clamp(40px, 6vw, 72px) 40px',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Background glow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400, height: 200, borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(255,85,0,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>🚀</div>

            <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 900, color: 'var(--fg)', marginBottom: 16, lineHeight: 1.15 }}>
              Ready to stop searching<br />and start receiving?
            </h2>

            <p style={{ fontSize: 'clamp(14px, 1.8vw, 18px)', color: 'var(--fg-sub)', lineHeight: 1.65, marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>
              Join 12,400+ buyers who've stopped scrolling and started getting the best prices delivered to them.
            </p>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/post" style={{
                background: 'var(--accent)', color: '#fff',
                borderRadius: 14, padding: '16px 36px',
                fontSize: 17, fontWeight: 800, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                boxShadow: '0 4px 24px rgba(255,85,0,0.35)',
                transition: 'all .2s',
              }}>
                📝 Post Your Want — Free
              </Link>
              <Link href="/browse" style={{
                background: 'rgba(255,255,255,0.06)', color: 'var(--fg)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 14, padding: '15px 28px',
                fontSize: 16, fontWeight: 700, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                transition: 'all .2s',
              }}>
                I'm a Seller →
              </Link>
            </div>

            <p style={{ marginTop: 20, fontSize: 13, color: 'var(--muted)' }}>
              Free to post. No credit card required. First bid in 2 hours.
            </p>
          </div>
        </div>

        {/* Category icons row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 40, flexWrap: 'wrap' }}>
          {['📱', '💻', '🎮', '📺', '📷', '⌚', '🎧', '🏠'].map((icon, i) => (
            <div key={i} style={{
              width: 48, height: 48, borderRadius: 14, background: 'var(--bg)',
              border: '1px solid #272729', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 22,
              animation: `float ${2.5 + i * 0.2}s ease-in-out infinite`,
            }}>
              {icon}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
