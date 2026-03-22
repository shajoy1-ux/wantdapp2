'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Modal } from '@/components/ui/index.jsx'
import { OfferSubmitModal } from '@/components/offers/OfferSubmitModal'
import { useApp } from '@/components/providers/AppProvider'

export function SubmitOfferModal({ open, onClose, req }) {
  const { user, onSubmitBid, isVerifiedSeller, getMySellerApplication } = useApp()
  const router = useRouter()
  const [done, setDone] = useState(false)

  if (!open) return null

  const handleSubmit = (form) => {
    onSubmitBid(form, req, user)
    setDone(true)
    setTimeout(() => { setDone(false); onClose() }, 2200)
  }

  // Not logged in
  if (!user) {
    return (
      <Modal open onClose={onClose} maxWidth={420}>
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ fontSize: 42, marginBottom: 14 }}>🔒</div>
          <h2 style={{ fontWeight: 800, fontSize: 20, color: 'var(--fg)', marginBottom: 8 }}>Sign in to submit an offer</h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24 }}>Create a free seller account and start competing for deals.</p>
          <Link
            href={`/auth?intent=bid&reqId=${req?.id}`}
            style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 12, padding: '13px 28px', fontSize: 15, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}
          >
            Sign In or Create Account →
          </Link>
        </div>
      </Modal>
    )
  }

  // Logged in but not verified
  const verified = isVerifiedSeller(user.email) || user.isVerifiedSeller || user.sellerProfile?.verified
  const app = getMySellerApplication(user.email)

  if (!verified) {
    const isPending = app?.status === 'pending'
    return (
      <Modal open onClose={onClose} maxWidth={440}>
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ fontSize: 42, marginBottom: 14 }}>{isPending ? '⏳' : '🏪'}</div>
          <h2 style={{ fontWeight: 800, fontSize: 20, color: 'var(--fg)', marginBottom: 8 }}>
            {isPending ? 'Application Under Review' : 'Become a Verified Seller'}
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24, lineHeight: 1.65 }}>
            {isPending
              ? 'Your application is being reviewed. We\'ll notify you within 24–48 hours.'
              : 'You need to be a verified seller to submit offers. The process takes under 5 minutes.'}
          </p>
          {!isPending && (
            <Link
              href="/seller/apply"
              style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 12, padding: '13px 28px', fontSize: 15, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}
              onClick={onClose}
            >
              Apply for Verification →
            </Link>
          )}
          {isPending && (
            <Link
              href="/seller/status"
              style={{ background: 'var(--surface)', color: 'var(--fg)', border: '1px solid #272729', borderRadius: 12, padding: '12px 24px', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}
              onClick={onClose}
            >
              Check Application Status
            </Link>
          )}
        </div>
      </Modal>
    )
  }

  // Success state
  if (done) {
    return (
      <Modal open onClose={onClose} maxWidth={400}>
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ fontSize: 52, marginBottom: 14, animation: 'float 1s ease-in-out infinite' }}>🎯</div>
          <h2 style={{ fontWeight: 800, fontSize: 22, color: '#22c55e', marginBottom: 8 }}>Offer Sent!</h2>
          <p style={{ fontSize: 14, color: 'var(--muted)' }}>The buyer will be notified. You&apos;ll hear back if they accept.</p>
        </div>
      </Modal>
    )
  }

  // Verified seller — show full form
  return (
    <Modal open onClose={onClose} maxWidth={520}>
      <OfferSubmitModal req={req} onClose={onClose} onSubmit={handleSubmit} />
    </Modal>
  )
}
