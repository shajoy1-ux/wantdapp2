'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useApp } from '@/components/providers/AppProvider'
import { fmtINR } from '@/lib/helpers'
import { CAT_ICONS } from '@/lib/data'
import { VerifiedBadge, StarRating } from '@/components/ui/index.jsx'

export function SellerDashboardClient() {
  const { user, bids, requests, ratings, getMySellerApplication, isVerifiedSeller, paymentIntents } = useApp()
  const [activeTab, setActiveTab] = useState('bids')

  if (!user) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
          <h2 style={{ fontWeight: 800, fontSize: 22, marginBottom: 12 }}>Sign in as a seller</h2>
          <Link href="/auth" style={btnPrimary}>Sign In →</Link>
        </div>
      </div>
    )
  }

  // Find all bids this seller has submitted
  const myBids = Object.entries(bids).flatMap(([reqId, bidArr]) =>
    bidArr
      .filter(b => b.sellerEmail === user.email || String(b.seller?.id) === String(user.sellerId))
      .map(b => ({
        ...b, reqId: parseInt(reqId),
        req: requests.find(r => String(r.id) === reqId),
        competingBids: bidArr.length,
      }))
  )

  const activeBids = myBids.filter(b => b.req?.status === 'open')
  const wonBids    = myBids.filter(b => b.status === 'accepted')
  const winRate    = myBids.length ? Math.round((wonBids.length / myBids.length) * 100) : 0
  const myRatings  = ratings.filter(r => r.sellerId === user.email)
  const avgRating  = myRatings.length ? (myRatings.reduce((s, r) => s + r.stars, 0) / myRatings.length).toFixed(1) : '—'

  const totalEarnings = paymentIntents
    .filter(p => p.sellerId === user.email && p.status === 'captured')
    .length * 500 // demo: ₹500 platform fee per closed deal (actual = 2% of deal)

  const app = getMySellerApplication(user.email)
  const verified = isVerifiedSeller(user.email) || user.isVerifiedSeller

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* Verification banner */}
        {!verified && (
          <div style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: 14, padding: '14px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 24 }}>⚠️</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#fbbf24' }}>You're not a verified seller yet</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>
                {app?.status === 'pending' ? 'Your application is under review (24–48 hours).' : 'Get verified to submit offers and access all seller features.'}
              </div>
            </div>
            {(!app || app.status === 'rejected') && (
              <Link href="/seller/apply" style={{ ...btnPrimary, textDecoration: 'none', flexShrink: 0 }}>
                Apply for Verification →
              </Link>
            )}
          </div>
        )}

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 14 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <h1 style={{ fontWeight: 900, fontSize: 28, color: 'var(--fg)', margin: 0 }}>Seller Dashboard</h1>
              {verified && <VerifiedBadge />}
            </div>
            <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0 }}>{myBids.length} bids submitted · {wonBids.length} won</p>
          </div>
          <Link href="/browse" style={{ ...btnPrimary, textDecoration: 'none' }}>Browse Requests →</Link>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14, marginBottom: 28 }}>
          {[
            { label: 'Bids Submitted', val: myBids.length, color: 'var(--accent)' },
            { label: 'Deals Won', val: wonBids.length, color: '#22c55e' },
            { label: 'Win Rate', val: `${winRate}%`, color: '#60a5fa' },
            { label: 'Avg Rating', val: avgRating, color: '#fbbf24' },
            { label: 'Active Bids', val: activeBids.length, color: 'var(--fg)' },
            { label: 'Platform Fees', val: `₹${totalEarnings.toLocaleString()}`, color: 'var(--muted)' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 14, padding: '16px 18px' }}>
              <div style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900, color: s.color, marginBottom: 4 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #272729', marginBottom: 24 }}>
          {[['bids', `Active Bids (${activeBids.length})`], ['won', `Closed Deals (${wonBids.length})`], ['reviews', `Reviews (${myRatings.length})`]].map(([k, l]) => (
            <button key={k} onClick={() => setActiveTab(k)} style={{
              padding: '10px 20px', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 14, fontWeight: 700, fontFamily: 'inherit',
              color: activeTab === k ? 'var(--accent)' : 'var(--muted)',
              borderBottom: `2px solid ${activeTab === k ? 'var(--accent)' : 'transparent'}`,
              transition: '.15s',
            }}>
              {l}
            </button>
          ))}
        </div>

        {/* Active Bids */}
        {activeTab === 'bids' && (
          activeBids.length === 0 ? (
            <EmptyState icon="🎯" title="No active bids" subtitle="Browse buyer requests and submit offers to see them here." action={<Link href="/browse" style={btnPrimary}>Browse Requests</Link>} />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {activeBids.map(bid => <SellerBidCard key={bid.id} bid={bid} />)}
            </div>
          )
        )}

        {/* Won deals */}
        {activeTab === 'won' && (
          wonBids.length === 0 ? (
            <EmptyState icon="🏆" title="No closed deals yet" subtitle="Keep bidding competitively to win your first deal!" />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {wonBids.map(bid => <SellerBidCard key={bid.id} bid={bid} isWon />)}
            </div>
          )
        )}

        {/* Reviews */}
        {activeTab === 'reviews' && (
          myRatings.length === 0 ? (
            <EmptyState icon="⭐" title="No reviews yet" subtitle="Buyers will rate you after completed deals." />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {myRatings.map(r => (
                <div key={r.id} style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 14, padding: '16px 18px' }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    {[1,2,3,4,5].map(n => (
                      <span key={n} style={{ color: n <= r.stars ? '#fbbf24' : 'var(--border)', fontSize: 18 }}>★</span>
                    ))}
                    <span style={{ fontSize: 12, color: 'var(--muted)', marginLeft: 6, alignSelf: 'center' }}>{new Date(r.createdAt).toLocaleDateString('en-IN')}</span>
                  </div>
                  {r.review && <p style={{ fontSize: 14, color: 'var(--fg-sub)', lineHeight: 1.65, margin: 0 }}>"{r.review}"</p>}
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  )
}

function SellerBidCard({ bid, isWon }) {
  const req = bid.req
  if (!req) return null
  const statusColor = isWon ? '#22c55e' : bid.req?.status === 'closed' ? '#888' : '#fbbf24'
  const statusLabel = isWon ? '✓ Won' : bid.req?.status === 'closed' ? 'Expired' : '⏳ Pending'

  return (
    <div style={{
      background: 'var(--surface)',
      border: `1px solid ${isWon ? 'rgba(34,197,94,0.3)' : '#272729'}`,
      borderRadius: 16, padding: 18,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 16 }}>{CAT_ICONS[req.cat] || '📦'}</span>
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>{req.cat} · 📍 {req.area}</span>
            <span style={{ display: 'inline-flex', padding: '2px 9px', borderRadius: 100, fontSize: 11, fontWeight: 600, background: `${statusColor}15`, color: statusColor }}>{statusLabel}</span>
          </div>
          <h3 style={{ fontWeight: 700, fontSize: 15, color: 'var(--fg)', margin: '0 0 4px', lineHeight: 1.2 }}>
            <Link href={`/want/${req.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{req.title}</Link>
          </h3>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            Buyer budget: <span style={{ color: 'var(--accent)', fontWeight: 700 }}>₹{fmtINR(req.budget)}</span>
            {' '}· {bid.competingBids} total bids
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 900, fontSize: 22, color: isWon ? '#22c55e' : 'var(--fg)' }}>₹{fmtINR(bid.price)}</div>
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>Your offer</div>
        </div>
      </div>
      <div style={{ fontSize: 12, color: 'var(--muted-high)', display: 'flex', gap: 14, flexWrap: 'wrap', borderTop: '1px solid #272729', paddingTop: 10 }}>
        <span>⚡ {bid.del}</span>
        <span>📦 {bid.cond}</span>
        {bid.warranty && <span>🛡️ {bid.warranty}</span>}
        {bid.createdAt && <span>🕐 {new Date(bid.createdAt).toLocaleDateString('en-IN')}</span>}
      </div>
    </div>
  )
}

function EmptyState({ icon, title, subtitle, action }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 20, padding: '60px 32px', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 14 }}>{icon}</div>
      <p style={{ fontWeight: 700, fontSize: 18, color: 'var(--fg)', marginBottom: 8 }}>{title}</p>
      {subtitle && <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: action ? 24 : 0, maxWidth: 300, margin: subtitle && action ? '0 auto 24px' : '0 auto' }}>{subtitle}</p>}
      {action && <div style={{ marginTop: 20 }}>{action}</div>}
    </div>
  )
}

const btnPrimary = { background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 10, padding: '11px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'inherit', textDecoration: 'none' }
