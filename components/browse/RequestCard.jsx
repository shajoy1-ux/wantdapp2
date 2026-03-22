'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { fmtINR } from '@/lib/helpers'
import { CAT_ICONS } from '@/lib/data'
import { Badge, Modal, VerifiedBadge, StarRating } from '@/components/ui/index.jsx'
import { OfferCompareCard } from '@/components/offers/OfferComparison'

// ─── REQUEST CARD (B1: clickable to /want/[id]) ───────────────────────────────
export function RequestCard({ req, onSubmitBid, onViewDetail, wishlist, onToggleWish, idx = 0, compact = false, myBidIds = new Set() }) {
  const router = useRouter()
  const isWished = wishlist?.has(req.id)
  const hasBid = myBidIds?.has(String(req.id))
  const isHot = req.urgent || (req.time && req.time.includes('hour') && parseInt(req.time) <= 2)
  const isClosed = req.status === 'closed'

  const handleCardClick = () => {
    if (onViewDetail) onViewDetail(req)
    else router.push(`/want/${req.id}`)
  }

  return (
    <div
      className="card-hover"
      style={{
        background: 'var(--surface)',
        border: `1px solid ${isClosed ? 'rgba(102,102,102,0.3)' : isHot ? 'rgba(255,85,0,0.4)' : '#272729'}`,
        borderLeft: isHot && !isClosed ? '3px solid var(--accent)' : undefined,
        borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
        animation: `fadeUp 0.35s ease ${Math.min(idx, 8) * 0.04}s both`,
        position: 'relative', opacity: isClosed ? 0.7 : 1,
      }}
    >
      {/* Closed overlay badge */}
      {isClosed && (
        <div style={{
          position: 'absolute', top: 12, left: 12, zIndex: 3,
          background: 'rgba(102,102,102,0.9)', color: '#fff',
          padding: '3px 10px', borderRadius: 6, fontSize: 10, fontWeight: 800,
        }}>
          ✓ {req.winningPrice ? `CLOSED · ₹${fmtINR(req.winningPrice)}` : 'CLOSED'}
        </div>
      )}

      {/* Badges */}
      {!isClosed && (
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 5, flexWrap: 'wrap', zIndex: 2 }}>
          {req.viral && <GradBadge gradient="linear-gradient(135deg,#ec4899,#a855f7)">🚀 VIRAL</GradBadge>}
          {req.urgent && !req.viral && <GradBadge gradient="linear-gradient(135deg,#ef4444,#dc2626)">🔥 URGENT</GradBadge>}
          {req.trending && !req.viral && !req.urgent && <GradBadge gradient="linear-gradient(135deg,#f59e0b,#f97316)">TRENDING</GradBadge>}
          {req._new && <GradBadge gradient="linear-gradient(135deg,#22c55e,#16a34a)">NEW</GradBadge>}
          {req.bids >= 10 && !req.viral && !req.urgent && <GradBadge gradient="linear-gradient(135deg,#FF5500,#FF8C42)">🔥 HOT</GradBadge>}
        </div>
      )}

      {/* Wishlist toggle */}
      {onToggleWish && (
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWish(req.id) }}
          style={{
            position: 'absolute', top: 12, right: 12, width: 32, height: 32,
            background: 'var(--bg)', borderRadius: '50%', border: '1px solid #272729',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 15, zIndex: 2, transition: 'border-color .15s',
          }}
        >
          {isWished ? '❤️' : '🤍'}
        </button>
      )}

      {/* Icon area */}
      <div
        onClick={handleCardClick}
        style={{
          height: 110, background: 'var(--bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 50, borderBottom: '1px solid #272729', position: 'relative',
        }}
      >
        <span style={{ animation: 'float 3s ease-in-out infinite' }}>{CAT_ICONS[req.cat] || '📦'}</span>
        {req.bids > 0 && (
          <div style={{
            position: 'absolute', bottom: 10, right: 10,
            background: 'rgba(34,197,94,.85)', color: '#fff',
            padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700,
            backdropFilter: 'blur(4px)',
          }}>
            {req.bids} offers
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '14px 16px' }} onClick={handleCardClick}>
        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--fg)', marginBottom: 6, lineHeight: 1.3 }}>{req.title}</div>
        <div style={{ fontSize: 20, fontWeight: 900, color: '#22c55e', marginBottom: 6 }}>₹{fmtINR(req.budget)}</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', gap: 10, marginBottom: compact ? 0 : 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <span>📍 {req.area}</span>
          {req.cond && req.cond !== 'Any' && (
            <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 100, fontSize: 11, fontWeight: 600, background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.25)' }}>
              {req.cond}
            </span>
          )}
          <span>{req.time}</span>
        </div>
        {!compact && (
          <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: 14 }}>
            {req.desc}
          </p>
        )}
      </div>

      {/* CTA */}
      {!compact && !isClosed && (
        <div style={{ padding: '0 16px 16px', borderTop: '1px solid #272729', paddingTop: 14, display: 'flex', gap: 8 }}>
          {hasBid ? (
            <div style={{ flex: 1, textAlign: 'center', fontSize: 13, color: '#22c55e', padding: '10px 0', fontWeight: 600 }}>
              ✓ Offer submitted
            </div>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); onSubmitBid?.(req) }}
              className="btn-hover"
              style={{
                flex: 1, background: 'var(--accent)', color: '#fff',
                border: 'none', borderRadius: 10, padding: '11px 16px',
                fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Submit Offer →
            </button>
          )}
          <Link
            href={`/want/${req.id}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 42, background: 'var(--bg)', border: '1px solid #272729',
              borderRadius: 10, textDecoration: 'none', fontSize: 16,
            }}
            title="View full listing"
          >
            🔗
          </Link>
        </div>
      )}
    </div>
  )
}

function GradBadge({ gradient, children }) {
  return (
    <span style={{ background: gradient, color: '#fff', padding: '3px 9px', borderRadius: 6, fontSize: 10, fontWeight: 800 }}>
      {children}
    </span>
  )
}

// ─── REQUEST DETAIL MODAL (modal version, still used in BrowseClient) ─────────
export function RequestDetailModal({ req, bids, onClose, onSubmitBid, user }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14, background: 'var(--bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, border: '1px solid #272729', flexShrink: 0,
            animation: 'float 3s ease-in-out infinite',
          }}>
            {CAT_ICONS[req.cat]}
          </div>
          <div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
              {req.urgent && <GradBadge gradient="linear-gradient(135deg,#ef4444,#dc2626)">🔥 Urgent</GradBadge>}
              {req.viral && <GradBadge gradient="linear-gradient(135deg,#ec4899,#a855f7)">🚀 Viral</GradBadge>}
              <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 9px', borderRadius: 100, fontSize: 11, fontWeight: 600, background: 'rgba(255,85,0,0.1)', color: 'var(--accent)', border: '1px solid rgba(255,85,0,0.25)' }}>{req.cat}</span>
            </div>
            <h2 style={{ fontWeight: 800, fontSize: 20, color: 'var(--fg)', margin: 0, lineHeight: 1.2 }}>{req.title}</h2>
          </div>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 20, padding: 4, flexShrink: 0 }}>✕</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 18 }}>
        {[['Budget', `₹${fmtINR(req.budget)}`, '#22c55e'], ['Location', req.area, 'var(--fg)'], ['Condition', req.cond || 'Any', 'var(--fg)']].map(([l, v, c]) => (
          <div key={l} style={{ background: 'var(--bg)', borderRadius: 10, padding: '10px 14px', border: '1px solid #272729' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3, fontWeight: 600, textTransform: 'uppercase' }}>{l}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: c }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--bg)', borderRadius: 12, padding: '14px 16px', border: '1px solid #272729', marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase' }}>Description</div>
        <p style={{ fontSize: 14, color: 'var(--fg-sub)', lineHeight: 1.7, margin: 0 }}>{req.desc}</p>
      </div>

      {bids.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {bids.length} Offers on this request
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {bids.map((bid, i) => (
              <BidRow key={bid.id} bid={bid} isBest={i === 0} />
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={onSubmitBid}
          className="btn-hover"
          style={{
            flex: 1, background: 'var(--accent)', color: '#fff',
            border: 'none', borderRadius: 12, padding: '14px 20px',
            fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          Submit Your Offer →
        </button>
        <Link
          href={`/want/${req.id}`}
          onClick={onClose}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'var(--bg)', border: '1px solid #272729',
            borderRadius: 12, padding: '14px 16px',
            fontSize: 14, fontWeight: 600, color: 'var(--fg)', textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Full Page →
        </Link>
      </div>
    </div>
  )
}

function BidRow({ bid, isBest }) {
  return (
    <div style={{
      background: 'var(--bg)', border: `1px solid ${isBest ? 'rgba(34,197,94,0.3)' : '#272729'}`,
      borderRadius: 12, padding: '12px 14px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
            {bid.seller?.img || '🏪'}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--fg)', display: 'flex', alignItems: 'center', gap: 5 }}>
              {bid.seller?.name || 'Seller'} {bid.seller?.verified && <VerifiedBadge />}
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>
              <StarRating rating={bid.seller?.rating || 4.5} /> · {(bid.seller?.sales || 0).toLocaleString()} sales
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 800, fontSize: 17, color: isBest ? '#22c55e' : 'var(--fg)' }}>
            ₹{fmtINR(bid.price)}
          </div>
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>{bid.del}</div>
        </div>
      </div>
      <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{bid.msg}</p>
    </div>
  )
}
