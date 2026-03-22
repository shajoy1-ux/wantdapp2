import { Suspense } from 'react'
import { MessagesClient } from './MessagesClient'

export const metadata = {
  title: 'Messages — wantd.in',
  description: 'Chat with buyers and sellers about your deals on wantd.in.',
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>Loading…</div>}>
      <MessagesClient />
    </Suspense>
  )
}
