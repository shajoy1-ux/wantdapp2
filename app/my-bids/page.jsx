import { Suspense } from 'react'
import { MyBidsClient } from './MyBidsClient'

export const metadata = {
  title: 'My Bids — wantd.in',
  robots: { index: false, follow: false },
}

export default function MyBidsPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ fontSize: 14, color: '#666' }}>Loading your bids…</div></div>}>
      <MyBidsClient />
    </Suspense>
  )
}
