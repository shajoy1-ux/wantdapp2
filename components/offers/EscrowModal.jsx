'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/index.jsx'
import { VerifiedBadge } from '@/components/ui/index.jsx'
import { fmtINR } from '@/lib/helpers'
import { useApp } from '@/components/providers/AppProvider'

export function EscrowModal({ open, bid, req, onClose }) {
  const { user, onCreatePaymentIntent, onConfirmPayment } = useApp()
  const [step, setStep] = useState('intro') // intro | paying | reveal

  const handlePay = () => {
    setStep('paying')
    // Simulate Razorpay (replace with real Razorpay SDK in production)
    setTimeout(() => {
      const intent = onCreatePaymentIntent(
        req.id,
        bid.sellerEmail || String(bid.seller?.id),
        bid.seller,
        user
      )
      onConfirmPayment(intent.id)
      setStep('reveal')
    }, 1800)
  }

  const sellerPhone = bid.seller?.phone || '+91 99XXXX XXXX'

  return (
    <Modal open={open} onClose={step === 'paying' ? undefined : onClose} maxWidth={480}>
      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontWeight: 800, fontSize: 18, color: 'var(--fg)', margin: 0 }}>
            {step === 'reveal' ? '🎉 Contact Revealed' : 'Accept This Offer'}
          </h2>
          {step !== 'paying' && (
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 20, padding: 4 }}>✕</button>
          )}
        </div>

        {/* Offer summary */}
        <div style={{ background: 'var(--bg)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 14, padding: '14px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--surface)', border: '1px solid #272729', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
            {bid.seller?.img || '🏪'}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--fg)' }}>{bid.seller?.name}</span>
              {bid.seller?.verified && <VerifiedBadge />}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>⚡ {bid.del} · 🛡️ {bid.warranty || 'As described'}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 900, fontSize: 22, color: '#22c55e' }}>₹{fmtINR(bid.price)}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>vs ₹{fmtINR(req.budget)} budget</div>
          </div>
        </div>

        {/* Intro step */}
        {step === 'intro' && (
          <>
            <div style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: 12, padding: '14px 16px', marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#60a5fa', marginBottom: 10 }}>🛡️ How the ₹500 Deal Token works</div>
              {[
                ['Pay ₹500 refundable token', 'Secured via Razorpay — fully safe'],
                ["Get seller's WhatsApp instantly", 'Number revealed the moment payment clears'],
                ['Meet, inspect, complete the deal', 'Arrange pickup or delivery with the seller'],
                ['Confirm or get a refund', 'Confirm deal done → ₹500 = platform fee. Fell through → full refund in 5–7 days'],
              ].map(([title, desc]) => (
                <div key={title} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                  <span style={{ color: '#22c55e', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--fg)' }}>{title}</span>
                    <span style={{ fontSize: 12, color: 'var(--muted)', marginLeft: 6 }}>— {desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handlePay}
              className="btn-hover"
              style={{ width: '100%', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 12, padding: '15px', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              💳 Pay ₹500 & Reveal Contact
            </button>
            <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginTop: 10 }}>
              Secured via Razorpay · Fully refundable if deal falls through
            </p>
            {/* ENV NOTE: To go live, initialize Razorpay with process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID */}
          </>
        )}

        {/* Paying step */}
        {step === 'paying' && (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: 42, marginBottom: 16, animation: 'float 1s ease-in-out infinite' }}>💳</div>
            <p style={{ fontWeight: 700, fontSize: 16, color: 'var(--fg)', marginBottom: 6 }}>Processing payment…</p>
            <p style={{ fontSize: 13, color: 'var(--muted)' }}>Razorpay secure checkout</p>
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 6 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', animation: `ping 1.2s ease ${i * 0.2}s infinite` }} />
              ))}
            </div>
          </div>
        )}

        {/* Reveal step */}
        {step === 'reveal' && (
          <>
            <div style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 14, padding: '20px', textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>✅</div>
              <p style={{ fontWeight: 700, fontSize: 15, color: '#22c55e', marginBottom: 6 }}>Payment confirmed! ₹500 held.</p>
              <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16, lineHeight: 1.6 }}>
                Contact the seller to arrange inspection and complete the deal.
              </p>
              <div style={{ background: 'var(--bg)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase' }}>Seller WhatsApp</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--fg)', letterSpacing: '0.05em' }}>{sellerPhone}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{bid.seller?.name}</div>
              </div>
              <a
                href={`https://wa.me/${sellerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi! I accepted your offer of ₹${fmtINR(bid.price)} for ${req?.title} on wantd.in. When can we arrange to meet?`)}`}
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25d366', color: '#fff', borderRadius: 10, padding: '10px 22px', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}
              >
                📲 Open WhatsApp Chat
              </a>
            </div>
            <div style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: 10, padding: '12px 14px', fontSize: 12, color: '#fbbf24', lineHeight: 1.6 }}>
              <strong>After the deal:</strong> Go to your dashboard → mark the want as closed to confirm. If the deal fell through, we&apos;ll refund your ₹500.
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
