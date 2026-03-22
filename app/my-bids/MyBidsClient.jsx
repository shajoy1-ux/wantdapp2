'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useApp } from '@/components/providers/AppProvider'
import { fmtINR, buildWA } from '@/lib/helpers'
import { CAT_ICONS } from '@/lib/data'
import { WAIcon } from '@/components/ui/index.jsx'

export function MyBidsClient() {
  const { user, bids, requests } = useApp()
  const searchParams = useSearchParams()
  const showSuccess = searchParams.get('success') === '1'

  if (!user || user.role !== 'seller') {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
          <h2 style={{ fontWeight: 800, fontSize: 22, marginBottom: 12 }}>Seller account required</h2>
          <Link href="/auth" style={btnPrimary}>Sign in as Seller →</Link>
        </div>
      </div>
    )
  }

  const myBids = Object.entries(bids).flatMap(([reqId, bidArr]) =>
    bidArr
      .filter((b) => b.seller?.id === user?.sellerProfile?.id)
      .map((b) => ({ ...b, reqId, req: requests.find((r) => r.id == reqId) }))
  )

  const won = myBids.filter((b) => b.status === 'accepted').length
  const pending = myBids.filter((b) => b.status === 'pending').length

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>

        {/* Success banner */}
        {showSuccess && (
          <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 14, padding: '14px 20px', fontSize: 14, color: '#22c55e', display: 'flex', gap: 10, marginBottom: 28 }}>
            <span>✓</span> <strong>Offer submitted!</strong> The buyer has been notified.
          </div>
        )}

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 14 }}>
          <div>
            <h1 style={{ fontWeight: 900, fontSize: 28, color: 'var(--fg)', margin: 0 }}>My Bids</h1>
            <p style={{ fontSize: 14, color: 'var(--muted)', margin: '5px 0 0' }}>{myBids.length} total · {pending} pending · {won} won</p>
          </div>
          <Link href="/browse" style={btnPrimary}>Browse More Requests →</Link>
        </div>

        {/* Stats */}
        {myBids.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 32 }}>
            {[
              { label: 'Offers Submitted', val: myBids.length, color: 'var(--accent)' },
              { label: 'Pending Review', val: pending, color: '#fbbf24' },
              { label: 'Deals Won', val: won, color: '#22c55e' },
            ].map((s) => (
              <div key={s.label} style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 14, padding: '16px 20px' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Bids list */}
        {myBids.length === 0 ? (
          <div style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 20, padding: '64px 32px', textAlign: 'center' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🎯</div>
            <h2 style={{ fontWeight: 800, fontSize: 22, color: 'var(--fg)', marginBottom: 10 }}>No bids submitted yet</h2>
            <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 28, maxWidth: 340, margin: '0 auto 28px' }}>
              Browse buyer requests and submit your best offer to start winning deals.
            </p>
            <Link href="/browse" style={btnPrimary}>Browse Open Requests</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {myBids.map((bid) => (
              <BidCard key={bid.id} bid={bid} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function BidCard({ bid }) {
  const isWon = bid.status === 'accepted'
  const waLink = bid.req?.phone
    ? buildWA(bid.req.phone, `Hi! My offer of ₹${fmtINR(bid.price)} for your ${bid.req?.title} was accepted on wantd.in. When can we meet?`)
    : null

  return (
    <div style={{
      background: 'var(--surface)',
      border: `1px solid ${isWon ? 'rgba(34,197,94,0.35)' : '#272729'}`,
      borderRadius: 16, padding: 20,
      animation: 'fadeUp 0.35s ease both',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 18 }}>{CAT_ICONS[bid.req?.cat] || '📦'}</span>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>{bid.req?.cat} · {bid.req?.area}</span>
            <StatusPill status={bid.status} />
          </div>
          <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--fg)', margin: '0 0 4px', lineHeight: 1.2 }}>
            {bid.req?.title || 'Request removed'}
          </h3>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>
            Buyer's budget: <span style={{ color: 'var(--accent)', fontWeight: 700 }}>₹{fmtINR(bid.req?.budget)}</span>
          </div>
        </div>

        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontWeight: 900, fontSize: 24, color: isWon ? '#22c55e' : 'var(--fg)' }}>
            ₹{fmtINR(bid.price)}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Your offer</div>
        </div>
      </div>

      <div style={{ fontSize: 13, color: 'var(--muted-high)', display: 'flex', gap: 16, flexWrap: 'wrap', paddingTop: 12, borderTop: '1px solid #272729', marginBottom: isWon ? 14 : 0 }}>
        <span>⚡ Delivery: {bid.del}</span>
        <span>📦 {bid.cond}</span>
        {bid.warranty && <span>🛡️ {bid.warranty}</span>}
      </div>

      {isWon && waLink && (
        <div style={{ marginTop: 14 }}>
          <div style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 10, padding: '10px 14px', marginBottom: 12, fontSize: 13, color: '#22c55e' }}>
            🎉 <strong>You won this deal!</strong> Contact the buyer on WhatsApp to finalise.
          </div>
          <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#25d366', color: '#fff', borderRadius: 10,
            padding: '10px 20px', fontSize: 14, fontWeight: 700, textDecoration: 'none',
          }}>
            <WAIcon size={14} /> Chat with Buyer
          </a>
        </div>
      )}
    </div>
  )
}

function StatusPill({ status }) {
  const map = {
    pending:  { bg: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: 'rgba(251,191,36,0.25)', label: '⏳ Pending' },
    accepted: { bg: 'rgba(34,197,94,0.1)',  color: '#22c55e', border: 'rgba(34,197,94,0.25)',  label: '✓ Won' },
    rejected: { bg: 'rgba(248,113,113,0.1)', color: '#f87171', border: 'rgba(248,113,113,0.25)', label: '✕ Not selected' },
  }
  const s = map[status] || map.pending
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 9px', borderRadius: 100, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
      {s.label}
    </span>
  )
}

const btnPrimary = {
  background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 10,
  padding: '11px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'inherit', textDecoration: 'none',
}
