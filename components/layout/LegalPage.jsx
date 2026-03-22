import Link from 'next/link'

export function LegalPage({ eyebrow, title, lastUpdated, effectiveDate, intro, sections }) {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: 'clamp(40px, 6vw, 72px) 24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>

        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--muted)', textDecoration: 'none', marginBottom: 28 }}>
          ← Back to home
        </Link>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
            {eyebrow}
          </div>
          <h1 style={{ fontWeight: 900, fontSize: 'clamp(28px, 5vw, 44px)', color: 'var(--fg)', marginBottom: 12, lineHeight: 1.1 }}>
            {title}
          </h1>
          <p style={{ fontSize: 13, color: 'var(--muted)' }}>
            Last updated: {lastUpdated}
            {effectiveDate && effectiveDate !== lastUpdated && ` · Effective: ${effectiveDate}`}
          </p>
        </div>

        {/* Intro box */}
        <div style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 14, padding: '16px 22px', marginBottom: 36, fontSize: 14, color: 'var(--muted-high)', lineHeight: 1.75 }}>
          {intro}
        </div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {sections.map((s, i) => (
            <div
              key={i}
              style={{
                padding: '28px 0',
                borderBottom: i < sections.length - 1 ? '1px solid #272729' : 'none',
              }}
            >
              <h2 style={{ fontWeight: 700, fontSize: 18, color: 'var(--fg)', marginBottom: 12 }}>{s.title}</h2>
              <p style={{ fontSize: 15, color: 'var(--fg-sub)', lineHeight: 1.85, whiteSpace: 'pre-wrap' }}>{s.body}</p>
            </div>
          ))}
        </div>

        {/* Footer nav */}
        <div style={{ marginTop: 48, paddingTop: 28, borderTop: '1px solid #272729', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {[['Privacy Policy', '/privacy'], ['Terms of Service', '/terms'], ['Return & Refund', '/refund'], ['Grievance Officer', '/grievance']].map(([label, href]) => (
            <Link key={href} href={href} style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
              {label}
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
