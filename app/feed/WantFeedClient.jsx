'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { fmtINR, buildShareWA, buildShareTwitter, getAnonymisedLocation } from '@/lib/helpers'
import { CAT_ICONS, CATEGORIES } from '@/lib/data'

export function WantFeedClient({ initialRequests }) {
  const [selectedCat, setSelectedCat] = useState('All')
  const [copied, setCopied] = useState(null)

  const filtered = useMemo(() => {
    if (selectedCat === 'All') return initialRequests
    return initialRequests.filter((r) => r.cat === selectedCat)
  }, [initialRequests, selectedCat])

  const handleCopy = (req) => {
    const text = `Someone in ${req.area} wants a ${req.title} for ₹${fmtINR(req.budget)}. Can you supply? Bid on wantd.in → https://www.wantd.in/browse`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(req.id)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Hero header */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid #272729', padding: 'clamp(32px, 5vw, 56px) 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,85,0,0.08)', border: '1px solid rgba(255,85,0,0.2)', borderRadius: 100, padding: '5px 16px', fontSize: 12, color: 'var(--accent)', fontWeight: 700, marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', animation: 'ping 1.5s infinite', display: 'inline-block' }} />
            Live Want Feed
          </div>

          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, color: 'var(--fg)', marginBottom: 14, lineHeight: 1.1 }}>
            What Bangalore Is<br />
            <span style={{ color: 'var(--accent)' }}>Hunting</span> Right Now
          </h1>

          <p style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: 'var(--fg-sub)', lineHeight: 1.65, marginBottom: 28, maxWidth: 520, margin: '0 auto 28px' }}>
            These are real buyer requests from people waiting for their best deal. Are you a seller? Submit an offer. Know a seller? Share this.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/browse" style={{ ...btnPrimary, textDecoration: 'none' }}>
              Submit an Offer →
            </Link>
            <Link href="/post" style={{ ...btnSecondary, textDecoration: 'none' }}>
              + Post Your Want
            </Link>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div style={{ borderBottom: '1px solid #272729', padding: '10px 0', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 8, overflowX: 'auto' }}>
          {['All', ...CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              style={{
                flexShrink: 0,
                background: selectedCat === c ? 'var(--accent)' : 'transparent',
                color: selectedCat === c ? '#fff' : 'var(--muted-high)',
                border: `1px solid ${selectedCat === c ? 'var(--accent)' : '#272729'}`,
                padding: '6px 14px', borderRadius: 100,
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
                transition: 'all .15s', fontFamily: 'inherit', whiteSpace: 'nowrap',
              }}
            >
              {c === 'All' ? `All (${initialRequests.length})` : `${CAT_ICONS[c]} ${c}`}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* Viral prompt */}
        <div style={{ background: 'rgba(255,85,0,0.05)', border: '1px solid rgba(255,85,0,0.15)', borderRadius: 14, padding: '14px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 22 }}>📢</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--fg)' }}>Know a seller? Share this feed!</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>Every share gets buyers closer to their deal — and sellers closer to a commission.</div>
          </div>
          <a
            href={`https://wa.me/?text=${encodeURIComponent('🛍️ People in Bangalore are looking for gadgets and waiting for offers. Sellers — bid here: https://www.wantd.in/feed')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#25d366', color: '#fff', borderRadius: 10, padding: '9px 18px', fontSize: 13, fontWeight: 700, textDecoration: 'none', flexShrink: 0 }}
          >
            📲 Share Feed on WhatsApp
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {filtered.map((req, i) => (
            <FeedCard
              key={req.id}
              req={req}
              idx={i}
              copied={copied === req.id}
              onCopy={handleCopy}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p style={{ fontWeight: 600 }}>No requests in this category yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

function FeedCard({ req, idx, copied, onCopy }) {
  const isHot = req.urgent || req.viral
  const location = getAnonymisedLocation(req.area)
  const waShareLink = buildShareWA(req)
  const twitterLink = buildShareTwitter(req)

  return (
    <div style={{
      background: 'var(--surface)',
      border: `1px solid ${isHot ? 'rgba(255,85,0,0.35)' : '#272729'}`,
      borderRadius: 18,
      animation: `fadeUp 0.35s ease ${Math.min(idx, 8) * 0.05}s both`,
      overflow: 'hidden',
    }}>
      {/* Top colour strip */}
      <div style={{ height: 3, background: isHot ? 'linear-gradient(90deg, var(--accent), #ff8c42)' : 'linear-gradient(90deg, #272729, transparent)' }} />

      <div style={{ padding: '18px 18px 0' }}>
        {/* Header badges */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
          {req.viral   && <GradBadge gradient="linear-gradient(135deg,#ec4899,#a855f7)">🚀 VIRAL</GradBadge>}
          {req.urgent  && !req.viral && <GradBadge gradient="linear-gradient(135deg,#ef4444,#dc2626)">🔥 URGENT</GradBadge>}
          {req.trending && !req.viral && !req.urgent && <GradBadge gradient="linear-gradient(135deg,#f59e0b,#f97316)">TRENDING</GradBadge>}
          <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--muted)' }}>{req.time}</span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: 'var(--bg)', border: '1px solid #272729', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0, animation: 'float 3s ease-in-out infinite' }}>
            {CAT_ICONS[req.cat] || '📦'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--fg)', marginBottom: 4, lineHeight: 1.2 }}>{req.title}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#22c55e', marginBottom: 4 }}>₹{fmtINR(req.budget)}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <span>📍 {location}</span>
              {req.cond && req.cond !== 'Any' && <span>· {req.cond}</span>}
            </div>
          </div>
        </div>

        {/* Description */}
        {req.desc && (
          <p style={{ fontSize: 13, color: 'var(--muted-high)', lineHeight: 1.6, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {req.desc}
          </p>
        )}

        {/* Bid count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: req.bids > 0 ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.04)', border: `1px solid ${req.bids > 0 ? 'rgba(34,197,94,0.2)' : '#272729'}`, borderRadius: 100, padding: '4px 12px', fontSize: 12, color: req.bids > 0 ? '#22c55e' : 'var(--muted)' }}>
            {req.bids > 0 ? `✓ ${req.bids} offers already` : '⏳ Waiting for first offer'}
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div style={{ borderTop: '1px solid #272729', padding: '12px 18px', display: 'flex', gap: 8 }}>
        <Link href={`/want/${req.id}`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent)', color: '#fff', borderRadius: 10, padding: '9px 12px', fontSize: 13, fontWeight: 700, textDecoration: 'none', gap: 5 }}>
          Submit Offer
        </Link>
        <a href={waShareLink} target="_blank" rel="noopener noreferrer" title="Share on WhatsApp" style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#25d366', borderRadius: 10, textDecoration: 'none', fontSize: 17 }}>
          📲
        </a>
        <a href={twitterLink} target="_blank" rel="noopener noreferrer" title="Share on X/Twitter" style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.06)', border: '1px solid #272729', borderRadius: 10, textDecoration: 'none', fontSize: 17 }}>
          𝕏
        </a>
        <button onClick={() => onCopy(req)} title="Copy link" style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', background: copied ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : '#272729'}`, borderRadius: 10, cursor: 'pointer', fontSize: 17, transition: 'all .2s' }}>
          {copied ? '✓' : '🔗'}
        </button>
      </div>
    </div>
  )
}

function GradBadge({ gradient, children }) {
  return <span style={{ background: gradient, color: '#fff', padding: '2px 8px', borderRadius: 5, fontSize: 10, fontWeight: 800 }}>{children}</span>
}

const btnPrimary = { background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 24px', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'inherit' }
const btnSecondary = { background: 'transparent', color: 'var(--fg)', border: '1px solid #272729', borderRadius: 12, padding: '11px 22px', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'inherit' }
