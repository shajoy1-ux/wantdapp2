import { Suspense } from 'react'
import { SubmitBidClient } from './SubmitBidClient'

export const metadata = {
  title: 'Submit an Offer — wantd.in',
  robots: { index: false, follow: false },
}

export default function SubmitBidPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ fontSize: 14, color: '#666' }}>Loading…</div></div>}>
      <SubmitBidClient />
    </Suspense>
  )
}
