'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/index.jsx'
import { useApp } from '@/components/providers/AppProvider'
import { fmtINR } from '@/lib/helpers'

export function CloseWantModal({ open, onClose, req, bids }) {
  const { onCloseWant } = useApp()
  const [step, setStep] = useState('ask')
  const [didBuy, setDidBuy] = useState(null)
  const [sellerId, setSellerId] = useState('')
  const [winningPrice, setWinningPrice] = useState('')
  const [stars, setStars] = useState(5)
  const [review, setReview] = useState('')
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)

  const sellers = bids.map(b => ({
    id: b.sellerEmail || String(b.seller?.id),
    name: b.seller?.name || 'Seller',
    price: b.price,
  }))

  const reset = () => {
    setStep('ask'); setDidBuy(null); setSellerId(''); setStars(5)
    setReview(''); setReason(''); setWinningPrice(''); setLoading(false)
    onClose()
  }

  const submit = () => {
    setLoading(true)
    setTimeout(() => {
      onCloseWant(req.id, { didBuy, sellerId, stars, review, reason, winningPrice: parseInt(winningPrice) || null }, bids)
      setLoading(false)
      reset()
    }, 500)
  }

  return (
    <Modal open={open} onClose={reset} maxWidth={460}>
      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontWeight: 800, fontSize: 18, color: 'var(--fg)', margin: 0 }}>Close This Want</h2>
          <button onClick={reset} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 20, padding: 4 }}>✕</button>
        </div>

        <div style={{ background: 'var(--bg)', border: '1px solid #272729', borderRadius: 10, padding: '10px 14px', marginBottom: 20, fontSize: 14, color: 'var(--fg-sub)' }}>
          &ldquo;{req?.title}&rdquo;
        </div>

        {step === 'ask' && (
          <>
            <p style={{ fontWeight: 700, fontSize: 16, color: 'var(--fg)', marginBottom: 16 }}>Did you find your device?</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => { setDidBuy(true); setStep('rate') }}
                style={{ flex: 1, background: 'rgba(34,197,94,0.08)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 12, padding: '14px 10px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                ✅ Yes, I bought it!
              </button>
              <button
                onClick={() => { setDidBuy(false); setStep('reason') }}
                style={{ flex: 1, background: 'var(--surface)', color: 'var(--muted)', border: '1px solid #272729', borderRadius: 12, padding: '14px 10px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                ❌ Not buying
              </button>
            </div>
          </>
        )}

        {step === 'rate' && (
          <>
            {sellers.length > 0 && (
              <>
                <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--fg)', marginBottom: 8 }}>Who did you buy from?</p>
                <select
                  value={sellerId}
                  onChange={(e) => {
                    setSellerId(e.target.value)
                    const sel = sellers.find(s => s.id === e.target.value)
                    if (sel) setWinningPrice(String(sel.price))
                  }}
                  style={{ ...inputSt, marginBottom: 14 }}
                >
                  <option value="">Select seller…</option>
                  {sellers.map(s => (
                    <option key={s.id} value={s.id}>{s.name} — ₹{fmtINR(s.price)}</option>
                  ))}
                </select>
              </>
            )}

            <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--fg)', marginBottom: 10 }}>Rate your experience</p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setStars(n)}
                  style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', cursor: 'pointer', background: stars >= n ? '#fbbf24' : 'var(--surface)', fontSize: 22, transition: 'all .15s' }}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              style={{ ...inputSt, minHeight: 72, resize: 'vertical', marginBottom: 16 }}
              placeholder="Optional: leave a review for the seller (max 150 chars)..."
              value={review}
              onChange={e => setReview(e.target.value)}
              maxLength={150}
            />

            <button
              onClick={submit}
              disabled={loading || (sellers.length > 0 && !sellerId)}
              style={{ width: '100%', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 12, padding: '13px', fontSize: 15, fontWeight: 700, cursor: loading ? 'wait' : 'pointer', fontFamily: 'inherit', opacity: (sellers.length > 0 && !sellerId) ? 0.5 : 1 }}
            >
              {loading ? 'Closing…' : 'Close & Submit Rating'}
            </button>
          </>
        )}

        {step === 'reason' && (
          <>
            <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--fg)', marginBottom: 12 }}>Why didn't it work out? (optional)</p>
            {['Too expensive', "Couldn't find what I needed", 'Bought elsewhere', 'Changed my mind', 'Other'].map(r => (
              <button
                key={r}
                onClick={() => setReason(r)}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '11px 14px', marginBottom: 8, borderRadius: 10, border: `1px solid ${reason === r ? 'var(--accent)' : '#272729'}`, background: reason === r ? 'rgba(255,85,0,0.06)' : 'var(--surface)', color: 'var(--fg)', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                {r}
              </button>
            ))}
            <button
              onClick={submit}
              disabled={loading}
              style={{ width: '100%', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 12, padding: '13px', fontSize: 15, fontWeight: 700, cursor: loading ? 'wait' : 'pointer', fontFamily: 'inherit', marginTop: 8 }}
            >
              {loading ? 'Closing…' : 'Close Request'}
            </button>
          </>
        )}
      </div>
    </Modal>
  )
}

const inputSt = {
  width: '100%', background: '#1a1a1c', border: '1px solid #272729', borderRadius: 10,
  padding: '11px 14px', color: 'var(--fg)', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box',
}
