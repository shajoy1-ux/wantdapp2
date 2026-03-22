'use client'

import Link from 'next/link'
import { ActivityTicker } from '@/components/ui/AnimatedElements'
import { fmtINR } from '@/lib/helpers'
import { CAT_ICONS } from '@/lib/data'

const PREVIEW_REQUESTS = [
  { id: 1, title: 'iPhone 15 Pro 256GB', cat: 'Mobile Phones', budget: 90000, area: 'Koramangala', bids: 7, urgent: true },
  { id: 2, title: 'MacBook Air M3 16GB', cat: 'Laptops & Computers', budget: 95000, area: 'HSR Layout', bids: 5, viral: true },
  { id: 8, title: 'Sony WH-1000XM5', cat: 'Accessories', budget: 18000, area: 'MG Road', bids: 11, trending: true },
]

export function HeroSection() {
  return (
    <section style={{ padding: 'clamp(48px, 8vw, 96px) 24px', background: 'var(--bg)', overflow: 'hidden', position: 'relative' }}>

      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: 700, height: 400, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(255,85,0,0.07) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

          {/* ── LEFT: COPY ── */}
          <div>
            <ActivityTicker />

            <h1 style={{
              fontSize: 'clamp(36px, 5.5vw, 68px)',
              fontWeight: 900,
              lineHeight: 1.08,
              color: 'var(--fg)',
              marginBottom: 22,
              letterSpacing: '-0.02em',
            }}>
              Tell us what{' '}
              <span style={{ color: 'var(--accent)' }}>gadget</span>{' '}
              you want.<br />
              Get offers from{' '}
              <span style={{ position: 'relative', display: 'inline-block' }}>
                verified sellers.
                <svg style={{ position: 'absolute', bottom: -6, left: 0, width: '100%' }} height="6" viewBox="0 0 300 6">
                  <path d="M0,4 Q150,0 300,4" stroke="var(--accent)" strokeWidth="2.5" fill="none" opacity="0.6" />
                </svg>
              </span>
            </h1>

            <p style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: 'var(--fg-sub)',
              lineHeight: 1.65,
              marginBottom: 36,
              maxWidth: 480,
            }}>
              Stop searching. Start receiving. Post your requirement — verified sellers compete to give you their best price. <strong style={{ color: 'var(--fg)' }}>First bid in under 2 hours, guaranteed.</strong>
            </p>

            {/* Trust pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 36 }}>
              {[
                { icon: '🔒', text: 'Verified sellers only' },
                { icon: '⚡', text: 'Bids in 2 hours' },
                { icon: '🛡️', text: 'Safe transactions' },
                { icon: '🆓', text: 'Free to post' },
              ].map((p) => (
                <span key={p.text} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'var(--surface)', border: '1px solid #272729',
                  borderRadius: 100, padding: '6px 14px',
                  fontSize: 13, color: 'var(--muted-high)', fontWeight: 500,
                }}>
                  {p.icon} {p.text}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href="/post" style={{
                background: 'var(--accent)',
                color: '#fff', border: 'none', borderRadius: 14,
                padding: '16px 32px', fontSize: 17, fontWeight: 800,
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
                textDecoration: 'none', boxShadow: '0 4px 24px rgba(255,85,0,0.35)',
                transition: 'all .2s',
              }} className="btn-hover">
                📝 Post What You Want
              </Link>
              <Link href="/browse" style={{
                background: 'transparent', color: 'var(--fg)',
                border: '1px solid #272729', borderRadius: 14,
                padding: '15px 28px', fontSize: 16, fontWeight: 700,
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
                textDecoration: 'none', transition: 'all .2s',
              }} className="btn-hover">
                Browse as Seller →
              </Link>
            </div>

            {/* Social proof line */}
            <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ display: 'flex' }}>
                {['RK', 'PS', 'AK', 'SM', 'DM'].map((initials, i) => (
                  <div key={initials} style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: `hsl(${i * 60 + 20}, 70%, 40%)`,
                    border: '2px solid var(--bg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: '#fff',
                    marginLeft: i === 0 ? 0 : -10,
                    zIndex: 5 - i,
                    position: 'relative',
                  }}>
                    {initials}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted-high)' }}>
                <strong style={{ color: 'var(--fg)' }}>12,400+</strong> buyers got competing offers
              </div>
            </div>
          </div>

          {/* ── RIGHT: PREVIEW CARDS ── */}
          <div className="hero-preview" style={{ position: 'relative' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {PREVIEW_REQUESTS.map((req, i) => (
                <HeroPreviewCard key={req.id} req={req} delay={i * 0.12} />
              ))}
            </div>

            {/* Floating bid notification */}
            <div style={{
              position: 'absolute', bottom: -16, right: -16,
              background: 'var(--surface)', border: '1px solid rgba(34,197,94,0.4)',
              borderRadius: 16, padding: '14px 20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              animation: 'fadeUp 0.6s ease 0.5s both',
              maxWidth: 220,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', animation: 'ping 1.5s infinite' }} />
                <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 700 }}>New offer received!</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--fg)' }}>₹87,000</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>TechHub Bangalore · 45 min delivery</div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-preview { display: none !important; }
        }
      `}</style>
    </section>
  )
}

function HeroPreviewCard({ req, delay }) {
  const isHot = req.urgent || req.viral
  return (
    <div className="card-hover" style={{
      background: 'var(--surface)',
      border: `1px solid ${isHot ? 'rgba(255,85,0,0.3)' : '#272729'}`,
      borderLeft: isHot ? '3px solid var(--accent)' : undefined,
      borderRadius: 16, padding: '14px 16px',
      display: 'flex', alignItems: 'center', gap: 14,
      animation: `fadeUp 0.5s ease ${delay}s both`,
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 12, background: 'var(--bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 28, flexShrink: 0, border: '1px solid #272729',
        animation: 'float 3s ease-in-out infinite',
      }}>
        {CAT_ICONS[req.cat]}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 5 }}>
          {req.viral && <span style={{ background: 'linear-gradient(135deg,#ec4899,#a855f7)', color: '#fff', padding: '2px 7px', borderRadius: 5, fontSize: 10, fontWeight: 800 }}>🚀 VIRAL</span>}
          {req.urgent && !req.viral && <span style={{ background: 'linear-gradient(135deg,#ef4444,#dc2626)', color: '#fff', padding: '2px 7px', borderRadius: 5, fontSize: 10, fontWeight: 800 }}>🔥 URGENT</span>}
          {req.trending && !req.viral && !req.urgent && <span style={{ background: 'linear-gradient(135deg,#f59e0b,#f97316)', color: '#fff', padding: '2px 7px', borderRadius: 5, fontSize: 10, fontWeight: 800 }}>TRENDING</span>}
        </div>
        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--fg)', marginBottom: 3 }}>{req.title}</div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 12, color: 'var(--muted)' }}>
          <span style={{ color: '#22c55e', fontWeight: 700 }}>₹{fmtINR(req.budget)}</span>
          <span>📍 {req.area}</span>
        </div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--accent)' }}>{req.bids}</div>
        <div style={{ fontSize: 11, color: 'var(--muted)' }}>offers</div>
      </div>
    </div>
  )
}
