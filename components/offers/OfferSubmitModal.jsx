'use client'

import { useState } from 'react'
import { fmtINR } from '@/lib/helpers'
import { CAT_ICONS, CONDITIONS } from '@/lib/data'

const DELIVERY_OPTIONS = ['45 min', '1 hour', '2 hours', 'Same day', 'Next day', '2–3 days']

export function OfferSubmitModal({ req, onClose, onSubmit }) {
  const [form, setForm] = useState({
    price: '', del: '', cond: 'Like New', warranty: '', location: '', msg: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const validate = () => {
    if (!form.price || isNaN(form.price) || parseInt(form.price) <= 0) {
      setError('Enter your offer price'); return false
    }
    if (parseInt(form.price) > req.budget * 1.1) {
      setError(`Price can't exceed ₹${fmtINR(Math.round(req.budget * 1.1))} (budget + 10%)`); return false
    }
    if (!form.del) { setError('Select a delivery time'); return false }
    if (!form.msg.trim() || form.msg.length < 20) {
      setError('Add a message to the buyer (min 20 characters)'); return false
    }
    return true
  }

  const submit = () => {
    if (!validate()) return
    setError('')
    setLoading(true)
    setTimeout(() => { onSubmit(form); setLoading(false) }, 600)
  }

  const savings = req.budget - parseInt(form.price || 0)

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontWeight: 800, fontSize: 20, color: 'var(--fg)', margin: 0 }}>Submit Your Offer</h2>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>Make a compelling offer to win this buyer's business.</p>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 20, padding: 4 }}>✕</button>
      </div>

      {/* Want summary */}
      <div style={{ background: 'var(--bg)', border: '1px solid rgba(255,85,0,0.2)', borderRadius: 12, padding: '12px 16px', marginBottom: 20, display: 'flex', gap: 14, alignItems: 'center' }}>
        <span style={{ fontSize: 28 }}>{CAT_ICONS[req.cat] || '📦'}</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--fg)' }}>{req.title}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
            Budget: <strong style={{ color: '#22c55e' }}>₹{fmtINR(req.budget)}</strong> · 📍 {req.area}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Price */}
        <Field label="Your Offer Price (₹) *">
          <input
            style={inputSt} type="number"
            placeholder={`e.g. ${Math.round(req.budget * 0.93)}`}
            value={form.price} onChange={set('price')} min={0}
          />
          {form.price && !isNaN(form.price) && (
            <div style={{ marginTop: 5, fontSize: 12, color: savings >= 0 ? '#22c55e' : '#f87171', fontWeight: 600 }}>
              {savings >= 0
                ? `✓ Buyer saves ₹${fmtINR(savings)} vs their budget`
                : `⚠ ₹${fmtINR(Math.abs(savings))} over budget`}
            </div>
          )}
        </Field>

        {/* Delivery + Condition */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label="Delivery Time *">
            <select style={inputSt} value={form.del} onChange={set('del')}>
              <option value="">Select…</option>
              {DELIVERY_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="Condition">
            <select style={inputSt} value={form.cond} onChange={set('cond')}>
              {CONDITIONS.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
        </div>

        {/* Warranty + Location */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label="Warranty" hint="e.g. 6 months seller warranty">
            <input style={inputSt} type="text" placeholder="e.g. 6 months seller" value={form.warranty} onChange={set('warranty')} maxLength={80} />
          </Field>
          <Field label="Your Location">
            <input style={inputSt} type="text" placeholder="e.g. Koramangala" value={form.location} onChange={set('location')} maxLength={60} />
          </Field>
        </div>

        {/* Message */}
        <Field label="Message to Buyer *" hint="Describe your item honestly. Specific details win deals.">
          <textarea
            style={{ ...inputSt, resize: 'vertical', minHeight: 100 }}
            placeholder="Hi! I have exactly what you need. The item is [condition details], [accessories], [box/bill], [battery health if phone]..."
            value={form.msg} onChange={set('msg')} maxLength={400}
          />
          <div style={{ fontSize: 11, textAlign: 'right', color: form.msg.length < 20 ? '#f87171' : 'var(--muted)', marginTop: 3 }}>
            {form.msg.length}/400 {form.msg.length < 20 && '(min 20)'}
          </div>
        </Field>

        {error && (
          <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#f87171' }}>
            {error}
          </div>
        )}

        <button onClick={submit} disabled={loading} className="btn-hover" style={{
          width: '100%', background: 'var(--accent)', color: '#fff', border: 'none',
          borderRadius: 12, padding: '14px', fontSize: 15, fontWeight: 700,
          cursor: loading ? 'wait' : 'pointer', fontFamily: 'inherit', opacity: loading ? 0.7 : 1,
        }}>
          {loading ? 'Submitting…' : '🎯 Submit Offer'}
        </button>

        <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center' }}>
          By submitting, you commit to honouring this offer if accepted.
        </p>
      </div>
    </div>
  )
}

function Field({ label, hint, children }) {
  return (
    <div>
      {label && <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>}
      {children}
      {hint && <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>{hint}</p>}
    </div>
  )
}

const inputSt = {
  width: '100%', background: '#1a1a1c', border: '1px solid #272729', borderRadius: 10,
  padding: '11px 14px', color: 'var(--fg)', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box',
}
