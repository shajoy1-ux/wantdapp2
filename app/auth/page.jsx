import { Suspense } from 'react'
import { AuthClient } from './AuthClient'

export const metadata = {
  title: 'Sign In or Create Account — wantd.in',
  description: 'Join wantd.in — India\'s reverse electronics marketplace. Sign in or create your free account.',
  robots: { index: false, follow: false },
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ fontSize: 14, color: '#666' }}>Loading…</div></div>}>
      <AuthClient />
    </Suspense>
  )
}
