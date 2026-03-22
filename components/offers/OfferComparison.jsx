'use client'

import { fmtINR } from '@/lib/helpers'
import { VerifiedBadge, StarRating, Badge } from '@/components/ui/index.jsx'
import { SectionHeader } from '@/components/ui/index.jsx'
import { INITIAL_BIDS, INITIAL_REQUESTS } from '@/lib/data'

// ─── OFFER COMPARISON SECTION (homepage demo — A2 fix: no fake WA numbers) ───
export function OfferComparisonSection() {
  const req = INITIAL_REQUESTS[0]
  const bids = INITIAL_BIDS[1]

  return (
    <section style={{ padding: 'clamp(56px, 8vw, 96px) 24px', background: 'var(--surface)', borderTop: '1px solid #272729', borderBottom: '1px solid #272729' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Compare offers"
          title="See your options. Pick the best."
          subtitle="When sellers compete, you win. Compare prices, ratings, and terms side by side."
        />

        {/* Request context */}
        <div style={{
          background: 'var(--bg)', border: '1px solid rgba(255,85,0,0.2)',
          borderRadius: 14, padding: '14px 20px', marginBottom: 24,
          display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: 24 }}>📱</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--fg)' }}>{req.title}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>Budget: ₹{fmtINR(req.budget)} · {req.area} · {req.cond}</div>
          </div>
          <div style={{
            background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)',
            borderRadius: 100, padding: '5px 14px', fontSize: 12, fontWeight: 700, color: '#22c55e',
          }}>
            {bids.length} offers received
          </div>
        </div>

        {/* Offer cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
          {bids.map((bid, i) => (
            <OfferCompareCard key={bid.id} bid={bid} rank={i + 1} isBest={i === 0} showHowItWorks />
          ))}
        </div>

        {/* Table view */}
        <OfferCompareTable bids={bids} />

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <a href="/post" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--accent)', color: '#fff',
            borderRadius: 12, padding: '14px 28px',
            fontSize: 15, fontWeight: 700, textDecoration: 'none',
          }}>
            Get Your Own Offers →
          </a>
        </div>
      </div>
    </section>
  )
}

export function OfferCompareCard({ bid, rank, isBest, onAccept, showAccept = false, showHowItWorks = false }) {
  return (
    <div style={{
      background: 'var(--bg)',
      border: `1px solid ${isBest ? 'rgba(34,197,94,0.4)' : '#272729'}`,
      borderRadius: 18, padding: 20, position: 'relative',
      boxShadow: isBest ? '0 0 0 1px rgba(34,197,94,0.15)' : 'none',
      animation: `fadeUp 0.4s ease ${rank * 0.1}s both`,
    }}>
      {isBest && (
        <div style={{
          position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #22c55e, #16a34a)',
          color: '#fff', fontSize: 11, fontWeight: 800, padding: '3px 14px', borderRadius: 100,
          whiteSpace: 'nowrap',
        }}>
          🏆 BEST OFFER
        </div>
      )}

      {/* Seller header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: 'var(--surface)', border: '1px solid #272729',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0,
        }}>
          {bid.seller.img}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--fg)' }}>{bid.seller.name}</span>
            {bid.seller.verified && <VerifiedBadge />}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 2 }}>
            <StarRating rating={bid.seller.rating} />
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>{bid.seller.sales.toLocaleString()} sales</span>
          </div>
        </div>
        <div style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', borderRadius: 8, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>
          #{rank}
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        <MetricBox label="Price" value={`₹${fmtINR(bid.price)}`} color="#22c55e" large />
        <MetricBox label="Delivery" value={bid.del} />
        <MetricBox label="Warranty" value={bid.warranty || 'As described'} />
        <MetricBox label="Location" value={bid.seller.area} />
      </div>

      <div style={{
        background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)',
        borderRadius: 8, padding: '8px 12px', marginBottom: 16, fontSize: 12, color: '#60a5fa',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        ⚡ Responds {bid.seller.responseTime || '< 2 hours'}
      </div>

      <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 16 }}>
        "{bid.msg}"
      </p>

      {/* A2 fix: no fake WhatsApp numbers — show CTA instead */}
      <div style={{ display: 'flex', gap: 10 }}>
        {showHowItWorks ? (
          <a
            href="#how-it-works"
            onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              background: 'var(--accent)', color: '#fff',
              borderRadius: 10, padding: '10px 14px', fontSize: 13, fontWeight: 700,
              textDecoration: 'none', cursor: 'pointer', border: 'none', fontFamily: 'inherit',
            }}
          >
            See how it works →
          </a>
        ) : (
          <a href="/post" style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            background: 'var(--accent)', color: '#fff',
            borderRadius: 10, padding: '10px 14px', fontSize: 13, fontWeight: 700,
            textDecoration: 'none',
          }}>
            Get offers like this →
          </a>
        )}
        {showAccept && onAccept && (
          <button
            onClick={() => onAccept(bid.id)}
            style={{
              flex: 1, background: '#22c55e', color: '#fff',
              border: 'none', borderRadius: 10, padding: '10px 14px',
              fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            ✓ Accept
          </button>
        )}
      </div>
    </div>
  )
}

function MetricBox({ label, value, color, large }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 10, padding: '10px 12px' }}>
      <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: large ? 16 : 13, fontWeight: large ? 800 : 600, color: color || 'var(--fg)' }}>{value}</div>
    </div>
  )
}

function OfferCompareTable({ bids }) {
  return (
    <div style={{ overflowX: 'auto', borderRadius: 14, border: '1px solid #272729' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: 'var(--surface)', borderBottom: '1px solid #272729' }}>
            {['Seller', 'Rating', 'Price', 'Delivery', 'Warranty', 'Location'].map((h) => (
              <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bids.map((bid, i) => (
            <tr key={bid.id} style={{ borderBottom: i < bids.length - 1 ? '1px solid #272729' : 'none', background: i === 0 ? 'rgba(34,197,94,0.03)' : 'transparent' }}>
              <td style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{bid.seller.img}</span>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--fg)' }}>{bid.seller.name}</div>
                    {bid.seller.verified && <span style={{ fontSize: 10, color: '#22c55e', fontWeight: 700 }}>✓ Verified</span>}
                  </div>
                </div>
              </td>
              <td style={{ padding: '14px 16px', color: '#fbbf24', fontWeight: 700 }}>★ {bid.seller.rating}</td>
              <td style={{ padding: '14px 16px', fontWeight: 800, color: i === 0 ? '#22c55e' : 'var(--fg)' }}>₹{fmtINR(bid.price)}</td>
              <td style={{ padding: '14px 16px', color: 'var(--muted-high)' }}>{bid.del}</td>
              <td style={{ padding: '14px 16px', color: 'var(--muted-high)' }}>{bid.warranty || 'As described'}</td>
              <td style={{ padding: '14px 16px', color: 'var(--muted-high)' }}>{bid.seller.area}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
