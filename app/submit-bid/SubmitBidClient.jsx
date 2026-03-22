'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useApp } from '@/components/providers/AppProvider'
import { fmtINR } from '@/lib/helpers'
import { CAT_ICONS, CONDITIONS } from '@/lib/data'

export function SubmitBidClient() {
  const { user, requests, onSubmitBid } = useApp()
  const searchParams = useSearchParams()
  const router = useRouter()
  const reqId = parseInt(searchParams.get('reqId'))
  const req = requests.find((r) => r.id === reqId)

  const [form, setForm] = useState({ price: '', del: '', cond: 'Like New', warranty: '', msg: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const submit = () => {
    if (!form.price || isNaN(form.price)) { setError('Enter your offer price'); return }
    if (parseInt(form.price) > req?.budget * 1.5) { setError('Price seems too high compared to buyer\'s budget'); return }
    if (!form.del.trim()) { setError('Enter delivery time'); return }
    if (!form.msg.trim() || form.msg.length < 30) { setError('Add a message to the buyer (min 30 characters)'); return }
    setError('')
    setLoading(true)
    setTimeout(() => {
      onSubmitBid(form, req)
      router.push('/my-bids?success=1')
    }, 700)
  }

  if (!user || user.role !== 'seller') {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
          <h2 style={{ fontWeight: 800, fontSize: 22, marginBottom: 12 }}>Sign in as a seller</h2>
          <Link href="/auth?intent=bid" style={btnPrimary}>Sign In as Seller →</Link>
        </div>
      </div>
    )
  }

  if (!req) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <h2 style={{ fontWeight: 800, fontSize: 22, marginBottom: 12 }}>Request not found</h2>
          <Link href="/browse" style={btnPrimary}>Browse Requests →</Link>
        </div>
      </div>
    )
  }

  const savingsVsBudget = req.budget - parseInt(form.price || 0)

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>

        <Link href="/browse" style={{ ...btnGhost, display: 'inline-flex', marginBottom: 20, alignItems: 'center', gap: 6, textDecoration: 'none' }}>
          ← Back to requests
        </Link>

        <h1 style={{ fontWeight: 900, fontSize: 28, color: 'var(--fg)', marginBottom: 6 }}>Submit Your Offer</h1>
        <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 32 }}>Make a compelling offer to win this buyer's business.</p>

        {/* Requirement summary card */}
        <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,85,0,0.2)', borderRadius: 16, padding: '16px 20px', marginBottom: 32, display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ fontSize: 36, animation: 'float 3s ease-in-out infinite' }}>{CAT_ICONS[req.cat]}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--fg)', marginBottom: 4 }}>{req.title}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <span>Budget: <strong style={{ color: '#22c55e' }}>₹{fmtINR(req.budget)}</strong></span>
              <span>📍 {req.area}</span>
              <span>{req.cond !== 'Any' ? req.cond : 'Any condition'}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--accent)' }}>{req.bids}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>offers</div>
          </div>
        </div>

        {/* Description */}
        <div style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 12, padding: '14px 16px', marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 6 }}>Buyer's Requirements</div>
          <p style={{ fontSize: 14, color: 'var(--fg-sub)', lineHeight: 1.7, margin: 0 }}>{req.desc}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Price */}
          <Field label="Your Offer Price (₹) *">
            <input style={inputSt} type="number" placeholder={`e.g. ${Math.round(req.budget * 0.92)}`} value={form.price} onChange={set('price')} min={0} />
            {form.price && !isNaN(form.price) && (
              <div style={{ marginTop: 6, fontSize: 13, color: savingsVsBudget >= 0 ? '#22c55e' : '#f87171', fontWeight: 600 }}>
                {savingsVsBudget >= 0
                  ? `✓ Buyer saves ₹${fmtINR(savingsVsBudget)} vs their budget`
                  : `⚠ ₹${fmtINR(Math.abs(savingsVsBudget))} over buyer's budget`}
              </div>
            )}
          </Field>

          {/* Delivery + Condition */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Delivery / Meet-up Time *">
              <input style={inputSt} type="text" placeholder="e.g. Same day, 2–3 days" value={form.del} onChange={set('del')} maxLength={60} />
            </Field>
            <Field label="Item Condition">
              <select style={inputSt} value={form.cond} onChange={set('cond')}>
                {CONDITIONS.slice(1).map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>

          {/* Warranty */}
          <Field label="Warranty Details">
            <input style={inputSt} type="text" placeholder="e.g. 6 months seller warranty, Apple warranty till March 2026" value={form.warranty} onChange={set('warranty')} maxLength={100} />
          </Field>

          {/* Message */}
          <Field label="Message to Buyer *" hint="Introduce yourself, describe the item, why they should pick your offer. Be specific and honest.">
            <textarea
              style={{ ...inputSt, resize: 'vertical', minHeight: 120 }}
              placeholder="Hi! I have exactly what you're looking for. The item is [condition], [any specs/details], [bill/box availability], [any extras]..."
              value={form.msg}
              onChange={set('msg')}
              maxLength={500}
            />
            <div style={{ fontSize: 11, color: form.msg.length < 30 ? '#f87171' : 'var(--muted)', textAlign: 'right', marginTop: 4 }}>
              {form.msg.length}/500 {form.msg.length < 30 && '(min 30)'}
            </div>
          </Field>

          {error && (
            <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: 12, padding: '12px 16px', fontSize: 14, color: '#f87171' }}>
              {error}
            </div>
          )}

          <button onClick={submit} disabled={loading} className="btn-hover" style={{ ...btnPrimary, width: '100%', fontSize: 16, padding: '16px', opacity: loading ? 0.7 : 1, justifyContent: 'center' }}>
            {loading ? 'Submitting…' : '🎯 Submit Offer →'}
          </button>

          <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center' }}>
            By submitting, you commit to honouring this offer if accepted.
          </p>
        </div>
      </div>
    </div>
  )
}

function Field({ label, hint, children }) {
  return (
    <div>
      {label && (
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {label}
        </label>
      )}
      {children}
      {hint && <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 5 }}>{hint}</p>}
    </div>
  )
}

const inputSt = {
  width: '100%', background: '#1a1a1c', border: '1px solid #272729', borderRadius: 12,
  padding: '12px 16px', color: 'var(--fg)', fontSize: 15, fontFamily: 'inherit',
  boxSizing: 'border-box',
}

const btnPrimary = {
  background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 12,
  padding: '12px 22px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'inherit',
}

const btnGhost = {
  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)',
  fontFamily: 'inherit', fontSize: 14, padding: 0,
}
