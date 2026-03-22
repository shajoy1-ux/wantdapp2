'use client'

import { useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useApp } from '@/components/providers/AppProvider'
import { fmtINR } from '@/lib/helpers'
import { CAT_ICONS } from '@/lib/data'
import { Modal, VerifiedBadge, StarRating } from '@/components/ui/index.jsx'
import { CloseWantModal } from '@/components/offers/CloseWantModal'
import { EscrowModal } from '@/components/offers/EscrowModal'

export function BuyerDashboardClient() {
  const { user, requests, bids, onAcceptBid, onCloseWant, onCreatePaymentIntent, onConfirmPayment, paymentIntents, showToast } = useApp()
  const searchParams = useSearchParams()
  const showSuccess = searchParams.get('success') === '1'
  const focusId = searchParams.get('focus')

  const [activeTab, setActiveTab] = useState('active')
  const [expandedReq, setExpandedReq] = useState(focusId ? parseInt(focusId) : null)
  const [closeModal, setCloseModal] = useState(null)
  const [escrowModal, setEscrowModal] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

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

  const myReqs = requests.filter(r => r._mine || r._buyerId === user.email)
  const activeReqs = myReqs.filter(r => r.status === 'open')
  const closedReqs = myReqs.filter(r => r.status === 'closed' || r.status === 'accepted')
  const totalBids = myReqs.reduce((s, r) => s + (bids[r.id]?.length || 0), 0)

  const displayReqs = activeTab === 'active' ? activeReqs
    : activeTab === 'closed' ? closedReqs
    : myReqs

  const handleAcceptOffer = (bid, req) => {
    const existing = paymentIntents.find(p =>
      p.reqId === req.id && p.status === 'paid' &&
      (p.sellerId === bid.sellerEmail || p.sellerId === String(bid.seller?.id))
    )
    if (existing) { showToast('You have already accepted this offer.'); return }
    setEscrowModal({ bid, req })
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

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
              {activeReqs.length} active · {totalBids} bids received · {closedReqs.length} closed
            </p>
          </div>
          <Link href="/post" style={{ ...btnPrimary, textDecoration: 'none' }}>+ New Requirement</Link>
        </div>

        {/* Stats */}
        {myReqs.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
            {[
              { label: 'Active Requests', val: activeReqs.length, color: 'var(--accent)' },
              { label: 'Bids Received', val: totalBids, color: '#60a5fa' },
              { label: 'Deals Closed', val: closedReqs.length, color: '#22c55e' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 14, padding: '16px 20px' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #272729', marginBottom: 24 }}>
          {[['active', `Active (${activeReqs.length})`], ['closed', `Closed (${closedReqs.length})`], ['all', `All (${myReqs.length})`]].map(([k, l]) => (
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

        {/* Empty state */}
        {displayReqs.length === 0 ? (
          <div style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 20, padding: '64px 32px', textAlign: 'center' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>📋</div>
            <h2 style={{ fontWeight: 800, fontSize: 22, color: 'var(--fg)', marginBottom: 10 }}>
              {activeTab === 'closed' ? 'No closed deals yet' : "You haven't posted any wants yet"}
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 14, maxWidth: 340, margin: '0 auto 28px' }}>
              {activeTab === 'closed' ? 'Closed deals will appear here.' : 'Post your first requirement and start receiving competing bids from verified sellers.'}
            </p>
            {activeTab !== 'closed' && <Link href="/post" style={{ ...btnPrimary, textDecoration: 'none' }}>📝 Post Your First Want</Link>}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {displayReqs.map(req => (
              <RequestCard
                key={req.id}
                req={req}
                reqBids={bids[req.id] || []}
                isExpanded={expandedReq === req.id}
                onToggle={() => setExpandedReq(expandedReq === req.id ? null : req.id)}
                onClose={() => setCloseModal(req)}
                onAcceptOffer={(bid) => handleAcceptOffer(bid, req)}
                onDelete={() => setDeleteConfirm(req)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Close Want Modal (B7) */}
      {/* Close Want Modal (B7) */}
      <CloseWantModal
        open={!!closeModal}
        onClose={() => setCloseModal(null)}
        req={closeModal || {}}
        bids={closeModal ? (bids[closeModal.id] || []) : []}
      />

      {/* Escrow Modal (B6) */}
      <EscrowModal
        open={!!escrowModal}
        bid={escrowModal?.bid || {}}
        req={escrowModal?.req || {}}
        onClose={() => setEscrowModal(null)}
      />

      {/* Delete confirm */}
      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} maxWidth={400}>
        {deleteConfirm && (
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
            <h3 style={{ fontWeight: 800, fontSize: 18, color: 'var(--fg)', marginBottom: 8 }}>Delete this want?</h3>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>"{deleteConfirm.title}" will be permanently removed.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ flex: 1, ...btnSecondary }}>Cancel</button>
              <button onClick={() => { /* no delete in demo — just close */ setDeleteConfirm(null); showToast('Want removed.') }} style={{ flex: 1, background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Delete</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

function RequestCard({ req, reqBids, isExpanded, onToggle, onClose, onAcceptOffer, onDelete }) {
  const isClosed = req.status === 'closed' || req.status === 'accepted'
  const sortedBids = [...reqBids].sort((a, b) => a.price - b.price)

  return (
    <div style={{
      background: 'var(--surface)',
      border: `1px solid ${isClosed ? '#3a3a3c' : '#272729'}`,
      borderRadius: 18, overflow: 'hidden',
    }}>
      {/* Header */}
      <div
        style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', flexWrap: 'wrap' }}
        onClick={onToggle}
      >
        <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, border: '1px solid #272729', flexShrink: 0, animation: 'float 3s ease-in-out infinite' }}>
          {CAT_ICONS[req.cat]}
        </div>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 5, flexWrap: 'wrap', alignItems: 'center' }}>
            <StatusBadge status={req.status} />
            {req.urgent && <span style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', padding: '2px 9px', borderRadius: 100, fontSize: 11, fontWeight: 600 }}>🔥 Urgent</span>}
          </div>
          <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--fg)', margin: '0 0 4px', lineHeight: 1.3 }}>{req.title}</h3>
          <div style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <span>Budget: <strong style={{ color: '#22c55e' }}>₹{fmtINR(req.budget)}</strong></span>
            <span>📍 {req.area}</span>
            <span>{req.time}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: 'var(--accent)' }}>{reqBids.length}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>offers</div>
          </div>
          <span style={{ fontSize: 18, color: 'var(--muted)' }}>{isExpanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {/* Action buttons always visible */}
      {!isClosed && (
        <div style={{ padding: '0 20px 16px', display: 'flex', gap: 8 }}>
          <Link href={`/want/${req.id}`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, background: 'var(--bg)', border: '1px solid #272729', borderRadius: 10, padding: '9px', fontSize: 13, fontWeight: 600, color: 'var(--fg)', textDecoration: 'none' }}>
            🔗 View Page
          </Link>
          <button onClick={onClose} style={{ flex: 1, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', color: '#22c55e', borderRadius: 10, padding: '9px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            ✓ Mark Closed
          </button>
          <button onClick={onDelete} style={{ width: 38, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', borderRadius: 10, fontSize: 16, cursor: 'pointer', fontFamily: 'inherit' }}>
            🗑️
          </button>
        </div>
      )}

      {/* Expanded bids */}
      {isExpanded && reqBids.length > 0 && (
        <div style={{ padding: '0 20px 20px', borderTop: '1px solid #272729' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', marginBottom: 14, marginTop: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {reqBids.length} Competing Offers — {isClosed ? 'Deal closed ✓' : 'Compare & accept the best'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
            {sortedBids.map((bid, i) => (
              <BidCompareCard
                key={bid.id}
                bid={bid}
                isBest={i === 0}
                showAccept={!isClosed}
                onAccept={() => onAcceptOffer(bid)}
              />
            ))}
          </div>
        </div>
      )}
      {isExpanded && reqBids.length === 0 && (
        <div style={{ padding: '20px', borderTop: '1px solid #272729', textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>⏳</div>
          <p style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 600 }}>Waiting for seller bids…</p>
          <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>Typically arrive within 2 hours</p>
        </div>
      )}
    </div>
  )
}

function BidCompareCard({ bid, isBest, showAccept, onAccept }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div style={{
      background: 'var(--bg)',
      border: `1px solid ${isBest ? 'rgba(34,197,94,0.4)' : '#272729'}`,
      borderRadius: 14, padding: 16, position: 'relative',
    }}>
      {isBest && (
        <div style={{ position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 12px', borderRadius: 100, whiteSpace: 'nowrap' }}>
          🏆 BEST DEAL
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--surface)', border: '1px solid #272729', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
          {bid.seller?.img || '🏪'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--fg)' }}>{bid.seller?.name || 'Seller'}</span>
            {bid.seller?.verified && <VerifiedBadge />}
          </div>
          <StarRating rating={bid.seller?.rating || 4.5} size={11} />
        </div>
        <div style={{ fontWeight: 900, fontSize: 18, color: isBest ? '#22c55e' : 'var(--fg)' }}>₹{fmtINR(bid.price)}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 10, fontSize: 11, color: 'var(--muted)' }}>
        <span>⚡ {bid.del}</span>
        <span>🛡️ {bid.warranty || 'As described'}</span>
        <span>📦 {bid.cond}</span>
        <span>📍 {bid.location || bid.seller?.area || '—'}</span>
      </div>
      {expanded && (
        <p style={{ fontSize: 12, color: 'var(--muted-high)', lineHeight: 1.6, marginBottom: 10 }}>"{bid.msg}"</p>
      )}
      <button onClick={() => setExpanded(!expanded)} style={{ fontSize: 11, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0, marginBottom: showAccept ? 10 : 0 }}>
        {expanded ? '▲ Less' : '▼ View note'}
      </button>
      {showAccept && (
        <button onClick={onAccept} className="btn-hover" style={{ width: '100%', background: '#22c55e', color: '#fff', border: 'none', borderRadius: 9, padding: '9px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          ✓ Accept Offer
        </button>
      )}
    </div>
  )
}

function StatusBadge({ status }) {
  const map = {
    open:     { bg: 'rgba(34,197,94,0.1)',  color: '#22c55e', label: '● Open' },
    accepted: { bg: 'rgba(96,165,250,0.1)', color: '#60a5fa', label: '✓ Deal accepted' },
    closed:   { bg: 'rgba(102,102,102,0.1)', color: '#888',  label: '✓ Closed' },
  }
  const s = map[status] || map.open
  return <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 9px', borderRadius: 100, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color }}>{s.label}</span>
}

const btnPrimary = { background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 12, padding: '11px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'inherit', textDecoration: 'none' }
const btnSecondary = { background: 'transparent', color: 'var(--fg)', border: '1px solid #272729', borderRadius: 12, padding: '11px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }
const btnGreen = { background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 12, padding: '11px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }
const inputSt = { width: '100%', background: '#1a1a1c', border: '1px solid #272729', borderRadius: 10, padding: '11px 14px', color: 'var(--fg)', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box' }
