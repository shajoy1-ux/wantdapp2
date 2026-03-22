'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useApp } from '@/components/providers/AppProvider'
import { SELLERS } from '@/lib/data'

export function AuthClient() {
  const { login } = useApp()
  const router = useRouter()
  const searchParams = useSearchParams()
  const intent = searchParams.get('intent')

  const [mode, setMode] = useState('signin')
  const [role, setRole] = useState('')
  const [form, setForm] = useState({ name: '', email: '', pass: '' })
  const [step, setStep] = useState('form')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const submit = () => {
    if (!form.email.trim()) { setError('Enter your email address'); return }
    if (!form.pass.trim() || form.pass.length < 6) { setError('Password must be at least 6 characters'); return }
    if (mode === 'signup' && !form.name.trim()) { setError('Enter your full name'); return }
    setError('')
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep('role') }, 800)
  }

  const finalize = () => {
    if (!role) return
    const seller = role === 'seller' ? SELLERS[Math.floor(Math.random() * SELLERS.length)] : null
    login({ name: form.name || form.email.split('@')[0], email: form.email, role, sellerProfile: seller, sellerId: seller?.id })

    if (intent === 'post') router.push('/post')
    else if (intent === 'bid') router.push('/browse')
    else router.push(role === 'seller' ? '/browse' : '/dashboard')
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>
      <div style={{ width: '100%', maxWidth: 460 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Link href="/" style={{ fontSize: 28, fontWeight: 900, textDecoration: 'none', color: 'var(--fg)' }}>
            <span style={{ color: 'var(--accent)' }}>wantd</span>.in
          </Link>
          <p style={{ color: 'var(--muted)', fontSize: 15, marginTop: 6 }}>India's reverse electronics marketplace</p>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 20, padding: 32 }}>

          {step === 'form' && (
            <>
              {/* Mode toggle */}
              <div style={{ display: 'flex', gap: 0, background: 'var(--bg)', borderRadius: 10, padding: 4, marginBottom: 24 }}>
                {['signin', 'signup'].map((m) => (
                  <button key={m} onClick={() => setMode(m)} style={{
                    flex: 1, padding: '9px', border: 'none', borderRadius: 8,
                    cursor: 'pointer', fontWeight: 700, fontSize: 14, fontFamily: 'inherit',
                    background: mode === m ? 'var(--accent)' : 'transparent',
                    color: mode === m ? '#fff' : 'var(--muted)',
                    transition: '.15s',
                  }}>
                    {m === 'signin' ? 'Sign In' : 'Create Account'}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {mode === 'signup' && (
                  <InputField label="Full Name" type="text" placeholder="Your name" value={form.name} onChange={set('name')} />
                )}
                <InputField label="Email Address" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} onKeyDown={(e) => e.key === 'Enter' && submit()} />
                <InputField label="Password" type="password" placeholder="••••••••" value={form.pass} onChange={set('pass')} onKeyDown={(e) => e.key === 'Enter' && submit()} />

                {error && <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#f87171' }}>{error}</div>}

                <button onClick={submit} disabled={loading} className="btn-hover" style={{ ...btnPrimary, width: '100%', fontSize: 15, padding: '14px', marginTop: 4, opacity: loading ? 0.7 : 1, justifyContent: 'center' }}>
                  {loading ? 'Please wait…' : mode === 'signup' ? 'Create Account →' : 'Sign In →'}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, height: 1, background: '#272729' }} />
                  <span style={{ fontSize: 13, color: 'var(--muted)' }}>or</span>
                  <div style={{ flex: 1, height: 1, background: '#272729' }} />
                </div>

                <button onClick={submit} style={{ ...btnSecondary, width: '100%', fontSize: 15, padding: '13px', justifyContent: 'center' }}>
                  🔵 Continue with Google
                </button>
              </div>
            </>
          )}

          {step === 'role' && (
            <>
              <h2 style={{ fontWeight: 800, fontSize: 22, color: 'var(--fg)', marginBottom: 6 }}>I am a…</h2>
              <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 22 }}>Choose your role. This sets up your experience.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 22 }}>
                {[
                  { v: 'buyer', icon: '🛒', title: 'Buyer', desc: 'Post requirements, receive competing bids, get the best price' },
                  { v: 'seller', icon: '🏪', title: 'Seller', desc: 'Browse buyer requests and submit your best competitive offers' },
                ].map((opt) => (
                  <button key={opt.v} onClick={() => setRole(opt.v)} style={{
                    textAlign: 'left', padding: 16, borderRadius: 12, cursor: 'pointer',
                    border: `1px solid ${role === opt.v ? 'var(--accent)' : '#272729'}`,
                    background: role === opt.v ? 'rgba(255,85,0,0.06)' : 'var(--bg)',
                    display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'inherit',
                    transition: 'all .15s', width: '100%',
                  }}>
                    <span style={{ fontSize: 30 }}>{opt.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--fg)' }}>{opt.title}</div>
                      <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{opt.desc}</div>
                    </div>
                    {role === opt.v && (
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>✓</div>
                    )}
                  </button>
                ))}
              </div>

              <button onClick={finalize} disabled={!role} className="btn-hover" style={{ ...btnPrimary, width: '100%', fontSize: 15, padding: '14px', opacity: role ? 1 : 0.4, justifyContent: 'center' }}>
                Continue →
              </button>
            </>
          )}
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--muted)', marginTop: 20 }}>
          By continuing you agree to our{' '}
          <Link href="/terms" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Terms</Link>
          {' '}and{' '}
          <Link href="/privacy" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}

function InputField({ label, type, placeholder, value, onChange, onKeyDown }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
      <input style={{ width: '100%', background: '#1a1a1c', border: '1px solid #272729', borderRadius: 12, padding: '12px 16px', color: 'var(--fg)', fontSize: 15, fontFamily: 'inherit', boxSizing: 'border-box' }} type={type} placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDown} />
    </div>
  )
}

const btnPrimary = {
  background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 12,
  padding: '12px 22px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'inherit',
}

const btnSecondary = {
  background: 'transparent', color: 'var(--fg)', border: '1px solid #272729', borderRadius: 12,
  padding: '12px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'inherit',
}
