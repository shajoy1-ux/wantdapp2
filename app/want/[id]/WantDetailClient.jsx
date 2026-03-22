'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useApp } from '@/components/providers/AppProvider'
import { fmtINR, buildShareWA } from '@/lib/helpers'
import { CAT_ICONS } from '@/lib/data'
import { VerifiedBadge, StarRating, Modal } from '@/components/ui/index.jsx'
import { OfferSubmitModal } from '@/components/offers/OfferSubmitModal'
import { EscrowModal } from '@/components/offers/EscrowModal'
import { SubmitOfferModal } from '@/components/offers/SubmitOfferModal'

export function WantDetailClient({ id }) {
  const { user, requests, bids, onSubmitBid, onCreatePaymentIntent, onConfirmPayment, paymentIntents, showToast } = useApp()
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [showBidModal, setShowBidModal] = useState(false)
  const [showEscrowModal, setShowEscrowModal] = useState(null) // bid object
  const [expandedBid, setExpandedBid] = useState(null)

  const req = requests.find((r) => String(r.id) === String(id))
  const reqBids = req ? (bids[req.id] || []) : []
  const sortedBids = [...reqBids].sort((a, b) => a.price - b.price)

  const isClosed = req?.status === 'closed'
  const isMyReq = req?._mine && user?.role === 'buyer'
  const alreadyBid = user && reqBids.some(b =>
    b.sellerEmail === user.email || String(b.seller?.id) === String(user.sellerId)
  )

  const shareUrl = `https://www.wantd.in/want/${id}`
  const waShareMsg = req ? `🛍️ Someone in ${req.area} is looking for: *${req.title}*\n💰 Budget: ₹${fmtINR(req.budget)}\n\nKnow a seller? They can bid here 👉 ${shareUrl}` : ''
  const twitterMsg = req ? `Someone in ${req?.area} wants ${req?.title} for ₹${fmtINR(req?.budget)}. Are you a seller? Submit your best offer on wantd.in 👇` : ''

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleSubmitBid = () => {
    if (!user) { router.push(`/auth?intent=submit_offer&want_id=${id}`); return }
    if (user.role !== 'seller') { showToast('Switch to a seller account to submit offers.'); return }
    setShowBidModal(true)
  }

  const handleAcceptOffer = (bid) => {
    if (!user || user.role !== 'buyer') return
    const existing = paymentIntents.find(p =>
      p.reqId === req.id && p.sellerId === (bid.sellerEmail || String(bid.seller?.id)) && p.status === 'paid'
    )
    if (existing) { showToast('You have already accepted this offer.'); return }
    setShowEscrowModal(bid)
  }

  if (!req) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: 52, marginBottom: 16 }}>🔍</div>
          <h2 style={{ fontWeight: 800, fontSize: 22, color: 'var(--fg)', marginBottom: 10 }}>Want not found</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 24 }}>This listing may have been removed or the link is incorrect.</p>
          <Link href="/browse" style={btnPrimary}>Browse Open Requests</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '32px 24px 80px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>

        <Link href="/browse" style={{ ...btnGhost, display: 'inline-flex', marginBottom: 20, alignItems: 'center', gap: 6, textDecoration: 'none' }}>
          ← Back to browse
        </Link>

        {/* Main listing card */}
        <div style={{
          background: 'var(--surface)',
          border: `1px solid ${isClosed ? '#3a3a3c' : 'rgba(255,85,0,0.2)'}`,
          borderRadius: 20, overflow: 'hidden', marginBottom: 24,
        }}>
          {/* Top accent */}
          <div style={{ height: 4, background: isClosed ? '#3a3a3c' : 'linear-gradient(90deg,var(--accent),#FF8C42)' }} />

          <div style={{ padding: '24px 24px 20px' }}>
            {/* Status + badges */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              {isClosed ? (
                <span style={{ background: 'rgba(102,102,102,0.15)', color: '#888', border: '1px solid rgba(102,102,102,0.3)', padding: '4px 12px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>
                  ✓ CLOSED {req.winningPrice ? `— Sold for ₹${fmtINR(req.winningPrice)}` : ''}
                </span>
              ) : (
                <span style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.25)', padding: '4px 12px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>
                  ● Open · {reqBids.length} {reqBids.length === 1 ? 'offer' : 'offers'}
                </span>
              )}
              {req.viral && <GradBadge gradient="linear-gradient(135deg,#ec4899,#a855f7)">🚀 VIRAL</GradBadge>}
              {req.urgent && !req.viral && <GradBadge gradient="linear-gradient(135deg,#ef4444,#dc2626)">🔥 URGENT</GradBadge>}
              {req.trending && !req.viral && !req.urgent && <GradBadge gradient="linear-gradient(135deg,#f59e0b,#f97316)">TRENDING</GradBadge>}
              <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--muted)' }}>{req.time}</span>
            </div>

            {/* Title + icon */}
            <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{
                width: 72, height: 72, borderRadius: 18, background: 'var(--bg)', border: '1px solid #272729',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, flexShrink: 0,
                animation: 'float 3s ease-in-out infinite',
              }}>
                {CAT_ICONS[req.cat] || '📦'}
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{req.cat}</div>
                <h1 style={{ fontWeight: 900, fontSize: 'clamp(20px, 3.5vw, 28px)', color: 'var(--fg)', margin: 0, lineHeight: 1.2 }}>
                  {req.title}
                </h1>
              </div>
            </div>

            {/* Key metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10, marginBottom: 20 }}>
              {[
                { label: 'Budget', value: `₹${fmtINR(req.budget)}`, color: '#22c55e' },
                { label: 'Location', value: req.area, color: 'var(--fg)' },
                { label: 'Condition', value: req.cond || 'Any', color: 'var(--fg)' },
                { label: 'Offers', value: `${reqBids.length} bids`, color: 'var(--accent)' },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ background: 'var(--bg)', border: '1px solid #272729', borderRadius: 12, padding: '12px 14px' }}>
                  <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div style={{ background: 'var(--bg)', border: '1px solid #272729', borderRadius: 12, padding: '14px 16px', marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>Buyer's Requirements</div>
              <p style={{ fontSize: 14, color: 'var(--fg-sub)', lineHeight: 1.8, margin: 0 }}>{req.desc}</p>
            </div>

            {/* Share section */}
            <div style={{ background: 'rgba(255,85,0,0.04)', border: '1px solid rgba(255,85,0,0.15)', borderRadius: 12, padding: '14px 16px', marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)', marginBottom: 10 }}>📢 Share this Want</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(waShareMsg)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#25d366', color: '#fff', borderRadius: 10, padding: '8px 14px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}
                >
                  📲 Share on WhatsApp
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterMsg)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.06)', border: '1px solid #272729', color: 'var(--fg)', borderRadius: 10, padding: '8px 14px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}
                >
                  𝕏 Tweet
                </a>
                <button
                  onClick={handleCopyLink}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: copied ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : '#272729'}`, color: copied ? '#22c55e' : 'var(--muted)', borderRadius: 10, padding: '8px 14px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s' }}
                >
                  {copied ? '✓ Copied!' : '🔗 Copy link'}
                </button>
              </div>
            </div>

            {/* Action buttons */}
            {!isClosed && (
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {user?.role !== 'buyer' && (
                  <button
                    onClick={handleSubmitBid}
                    disabled={alreadyBid}
                    className="btn-hover"
                    style={{
                      flex: 1, background: alreadyBid ? 'rgba(34,197,94,0.1)' : 'var(--accent)',
                      color: alreadyBid ? '#22c55e' : '#fff',
                      border: alreadyBid ? '1px solid rgba(34,197,94,0.3)' : 'none',
                      borderRadius: 12, padding: '14px 20px', fontSize: 15, fontWeight: 700,
                      cursor: alreadyBid ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
                      minWidth: 160,
                    }}
                  >
                    {alreadyBid ? '✓ Offer submitted' : '🎯 Submit Your Offer'}
                  </button>
                )}
                {isMyReq && (
                  <Link href={`/dashboard/buyer?focus=${req.id}`} style={{ ...btnSecondary, textDecoration: 'none', flex: 1, justifyContent: 'center', minWidth: 160 }}>
                    📋 View in Dashboard
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bids section */}
        {sortedBids.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontWeight: 800, fontSize: 20, color: 'var(--fg)', marginBottom: 16 }}>
              {sortedBids.length} Competing Offers
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--muted)', marginLeft: 10 }}>sorted by price</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {sortedBids.map((bid, i) => (
                <BidCard
                  key={bid.id}
                  bid={bid}
                  rank={i + 1}
                  isBest={i === 0}
                  isExpanded={expandedBid === bid.id}
                  onToggle={() => setExpandedBid(expandedBid === bid.id ? null : bid.id)}
                  onAccept={isMyReq && !isClosed ? () => handleAcceptOffer(bid) : null}
                />
              ))}
            </div>
          </div>
        )}

        {sortedBids.length === 0 && !isClosed && (
          <div style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 16, padding: '40px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
            <p style={{ fontWeight: 700, fontSize: 16, color: 'var(--fg)', marginBottom: 6 }}>No offers yet</p>
            <p style={{ fontSize: 13, color: 'var(--muted)' }}>First bids usually arrive within 2 hours. Are you a seller?</p>
            {user?.role !== 'buyer' && (
              <button onClick={handleSubmitBid} style={{ ...btnPrimary, marginTop: 16 }} className="btn-hover">
                Be the First to Offer →
              </button>
            )}
          </div>
        )}
      </div>

      {/* Offer Submit Modal (B2) — auth + verification gated */}
      <SubmitOfferModal
        open={showBidModal}
        onClose={() => setShowBidModal(false)}
        req={req}
      />

      {/* Escrow Modal (B6) — self-contained with Razorpay sim */}
      <EscrowModal
        open={!!showEscrowModal}
        bid={showEscrowModal || {}}
        req={req}
        onClose={() => setShowEscrowModal(null)}
      />
    </div>
  )
}

function BidCard({ bid, rank, isBest, isExpanded, onToggle, onAccept }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: `1px solid ${isBest ? 'rgba(34,197,94,0.4)' : '#272729'}`,
      borderRadius: 16, overflow: 'hidden',
      boxShadow: isBest ? '0 0 0 1px rgba(34,197,94,0.1)' : 'none',
    }}>
      {isBest && (
        <div style={{ height: 3, background: 'linear-gradient(90deg,#22c55e,#16a34a)' }} />
      )}
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }} onClick={onToggle}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--bg)', border: '1px solid #272729', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
            {bid.seller?.img || '🏪'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--fg)' }}>{bid.seller?.name || 'Seller'}</span>
              {bid.seller?.verified && <VerifiedBadge />}
              {isBest && <span style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', fontSize: 10, fontWeight: 800, padding: '2px 7px', borderRadius: 5 }}>🏆 BEST</span>}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 2, flexWrap: 'wrap', alignItems: 'center' }}>
              <StarRating rating={bid.seller?.rating || 4.5} />
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>{(bid.seller?.sales || 0).toLocaleString()} sales</span>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>⚡ {bid.del}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontWeight: 900, fontSize: 20, color: isBest ? '#22c55e' : 'var(--fg)' }}>
              ₹{fmtINR(bid.price)}
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>{bid.warranty || 'As described'}</div>
          </div>
          <span style={{ fontSize: 18, color: 'var(--muted)', marginLeft: 8 }}>{isExpanded ? '▲' : '▼'}</span>
        </div>

        {isExpanded && (
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #272729' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
              {[['Delivery', bid.del], ['Warranty', bid.warranty || 'As described'], ['Condition', bid.cond], ['Location', bid.location || bid.seller?.area || '—']].map(([l, v]) => (
                <div key={l} style={{ background: 'var(--bg)', border: '1px solid #272729', borderRadius: 8, padding: '8px 10px' }}>
                  <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 2 }}>{l}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)' }}>{v}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, color: 'var(--muted-high)', lineHeight: 1.7, marginBottom: onAccept ? 14 : 0 }}>"{bid.msg}"</p>
            {onAccept && (
              <button onClick={onAccept} className="btn-hover" style={{
                width: '100%', background: '#22c55e', color: '#fff',
                border: 'none', borderRadius: 10, padding: '12px 16px',
                fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              }}>
                ✓ Accept This Offer
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function GradBadge({ gradient, children }) {
  return <span style={{ background: gradient, color: '#fff', padding: '3px 9px', borderRadius: 6, fontSize: 10, fontWeight: 800 }}>{children}</span>
}

const btnPrimary = { background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 22px', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'inherit' }
const btnSecondary = { background: 'transparent', color: 'var(--fg)', border: '1px solid #272729', borderRadius: 12, padding: '12px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'inherit' }
const btnGhost = { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontFamily: 'inherit', fontSize: 14, padding: 0 }
