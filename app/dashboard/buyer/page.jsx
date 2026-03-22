import { Suspense } from 'react'
import { BuyerDashboardClient } from './BuyerDashboardClient'

export const metadata = { title: 'My Requests — wantd.in' }

export default function BuyerDashboardPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>Loading…</div>}>
      <BuyerDashboardClient />
    </Suspense>
  )
}
