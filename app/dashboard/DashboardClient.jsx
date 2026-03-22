'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useApp } from '@/components/providers/AppProvider'
import { fmtINR, buildWA } from '@/lib/helpers'
import { CAT_ICONS } from '@/lib/data'
import { OfferCompareCard } from '@/components/offers/OfferComparison'

export function DashboardClient() {
  const { user, requests, bids, onAcceptBid } = useApp()
  const searchParams = useSearchParams()
  const showSuccess = searchParams.get('success') === '1'

  if (!user) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
          <h2 style={{ fontWeight: 800, fontSize: 22, marginBottom: 12 }}>Sign in to view your dashboard</h2>
          <Link href="/auth" style={btnPrimary}>Sign In →</Link>
        </div>
      </div>
    )
  }

  const myReqs = requests.filter((r) => r._mine)
  const totalBids = myReqs.reduce((s, r) => s + (bids[r.id]?.length || 0), 0)
  const acceptedDeals = myReqs.filter((r) => r.status === 'accepted').length

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* Success toast */}
        {showSuccess && (
          <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 14, padding: '14px 20px', fontSize: 14, color: '#22c55e', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <span style={{ fontSize: 18 }}>✓</span>
            <div><strong>Request posted!</strong> Sellers are being notified. Expect your first bid within 2 hours.</div>
          </div>
        )}

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 14 }}>
          <div>
            <h1 style={{ fontWeight: 900, fontSize: 28, color: 'var(--fg)', margin: 0 }}>My Requests</h1>
            <p style={{ fontSize: 14, color: 'var(--muted)', margin: '5px 0 0' }}>
              {myReqs.length} active · {totalBids} bids received · {acceptedDeals} deals closed
            </p>
          </div>
          <Link href="/post" style={btnPrimary}>+ New Requirement</Link>
        </div>

        {/* Summary stats */}
        {myReqs.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 32 }}>
            {[
              { label: 'Active Requests', val: myReqs.filter(r => r.status === 'open').length, color: 'var(--accent)' },
              { label: 'Bids Received', val: totalBids, color: '#60a5fa' },
              { label: 'Deals Closed', val: acceptedDeals, color: '#22c55e' },
            ].map((s) => (
              <div key={s.label} style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 14, padding: '16px 20px' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Requests */}
        {myReqs.length === 0 ? (
          <div style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 20, padding: '64px 32px', textAlign: 'center' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>📋</div>
            <h2 style={{ fontWeight: 800, fontSize: 22, color: 'var(--fg)', marginBottom: 10 }}>No requests yet</h2>
            <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 28, maxWidth: 340, margin: '0 auto 28px' }}>
              Post your first requirement and start receiving competing bids from verified sellers.
            </p>
            <Link href="/post" style={btnPrimary}>📝 Post Your First Want</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {myReqs.map((req) => (
              <RequestDashboardCard
                key={req.id}
                req={req}
                bids={bids[req.id] || []}
                onAcceptBid={onAcceptBid}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .dashboard-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

function RequestDashboardCard({ req, bids, onAcceptBid }) {
  const isAccepted = req.status === 'accepted'
  const acceptedBid = bids.find((b) => b.status === 'accepted')

  return (
    <div style={{ background: 'var(--surface)', border: `1px solid ${isAccepted ? 'rgba(34,197,94,0.3)' : '#272729'}`, borderRadius: 18, overflow: 'hidden' }}>
      {/* Request header */}
      <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14, borderBottom: bids.length > 0 ? '1px solid #272729' : 'none', flexWrap: 'wrap', gap: 14 }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, border: '1px solid #272729', flexShrink: 0, animation: 'float 3s ease-in-out infinite' }}>
          {CAT_ICONS[req.cat]}
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 5, flexWrap: 'wrap' }}>
            <StatusBadge status={req.status} />
            {req.urgent && <span style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', padding: '2px 9px', borderRadius: 100, fontSize: 11, fontWeight: 600 }}>🔥 Urgent</span>}
          </div>
          <h3 style={{ fontWeight: 700, fontSize: 17, color: 'var(--fg)', margin: '0 0 4px' }}>{req.title}</h3>
          <div style={{ fontSize: 13, color: 'var(--muted)', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <span>Budget: <strong style={{ color: '#22c55e' }}>₹{fmtINR(req.budget)}</strong></span>
            <span>📍 {req.area}</span>
            <span>{req.time}</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: 'var(--accent)' }}>{bids.length}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>offers</div>
        </div>
      </div>

      {/* Bids */}
      {bids.length > 0 && (
        <div style={{ padding: '18px 20px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {bids.length} Competing Offers — {isAccepted ? 'Deal closed ✓' : 'Review and accept the best'}
          </div>

          {/* Offer comparison grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
            {bids.map((bid, i) => (
              <OfferCompareCard
                key={bid.id}
                bid={bid}
                rank={i + 1}
                isBest={i === 0 && !isAccepted}
                showAccept={!isAccepted}
                onAccept={(bidId) => onAcceptBid(bidId, req.id)}
              />
            ))}
          </div>
        </div>
      )}

      {bids.length === 0 && (
        <div style={{ padding: '18px 20px' }}>
          <div style={{ background: 'var(--bg)', border: '1px solid #272729', borderRadius: 12, padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>⏳</div>
            <p style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 600 }}>Waiting for seller bids…</p>
            <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>Typically arrive within 2 hours</p>
          </div>
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }) {
  const map = {
    open:     { bg: 'rgba(34,197,94,0.1)', color: '#22c55e', border: 'rgba(34,197,94,0.25)', label: '● Open' },
    accepted: { bg: 'rgba(96,165,250,0.1)', color: '#60a5fa', border: 'rgba(96,165,250,0.25)', label: '✓ Closed' },
    closed:   { bg: 'rgba(102,102,102,0.1)', color: '#888', border: 'rgba(102,102,102,0.25)', label: 'Closed' },
  }
  const s = map[status] || map.open
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 9px', borderRadius: 100, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
      {s.label}
    </span>
  )
}

const btnPrimary = {
  background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 10,
  padding: '11px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'inherit', textDecoration: 'none',
}
