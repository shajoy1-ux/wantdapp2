'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useApp } from '@/components/providers/AppProvider'
import { CATEGORIES, CAT_ICONS, AREAS, CONDITIONS } from '@/lib/data'

const SESSION_KEY = 'wantd_post_draft'

export function PostClient() {
  const { user, onPost, showToast } = useApp()
  const router = useRouter()

  const [form, setForm] = useState({
    title: '', cat: CATEGORIES[0], desc: '', budget: '',
    area: AREAS[0], cond: 'Any', phone: '', urgent: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)

  // A3 fix: restore draft from sessionStorage after auth redirect
  useEffect(() => {
    if (typeof window === 'undefined') return
    const draft = sessionStorage.getItem(SESSION_KEY)
    if (draft) {
      try { setForm(JSON.parse(draft)) } catch {}
    }
  }, [])

  const set = (k) => (e) =>
    setForm((p) => ({ ...p, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const validate = () => {
    if (!form.title.trim()) { setError('Enter a title for your request'); return false }
    if (!form.desc.trim()) { setError('Add a description'); return false }
    if (!form.budget || isNaN(form.budget) || parseInt(form.budget) <= 0) { setError('Enter a valid budget'); return false }
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) { setError('Enter a valid 10-digit WhatsApp number'); return false }
    setError('')
    return true
  }

  const submit = () => {
    if (!validate()) return
    if (!user) {
      // A3 fix: save draft before sending to auth
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(form))
      setShowAuthPrompt(true)
      return
    }
    setLoading(true)
    setTimeout(() => {
      sessionStorage.removeItem(SESSION_KEY)
      onPost({ ...form, _buyerId: user.email }, user)
      router.push('/dashboard/buyer?success=1')
    }, 700)
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: 620, margin: '0 auto' }}>

        {user ? (
          <Link href="/dashboard" style={{ ...btnGhost, display: 'inline-flex', marginBottom: 20, alignItems: 'center', gap: 6, textDecoration: 'none' }}>
            ← Back
          </Link>
        ) : (
          <Link href="/" style={{ ...btnGhost, display: 'inline-flex', marginBottom: 20, alignItems: 'center', gap: 6, textDecoration: 'none' }}>
            ← Home
          </Link>
        )}

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <h1 style={{ fontWeight: 900, fontSize: 'clamp(26px, 4vw, 36px)', color: 'var(--fg)', marginBottom: 8 }}>
            Post a Requirement
          </h1>
          <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.6 }}>
            Verified sellers will compete to give you the best price. Free to post.
          </p>
        </div>

        {/* Trust bar */}
        <div style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 12, padding: '12px 16px', marginBottom: 28, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {['🔒 Phone shown only to winning seller', '⚡ First bid in ~2 hours', '🆓 Always free for buyers'].map((t) => (
            <span key={t} style={{ fontSize: 12, color: '#22c55e', fontWeight: 500 }}>{t}</span>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Title */}
          <Field label="What are you looking for? *">
            <input
              style={inputSt}
              type="text"
              placeholder="e.g. iPhone 15 Pro 256GB Natural Titanium"
              value={form.title}
              onChange={set('title')}
              maxLength={120}
            />
            <CharCount val={form.title.length} max={120} />
          </Field>

          {/* Category + Condition */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Category *">
              <select style={inputSt} value={form.cat} onChange={set('cat')}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{CAT_ICONS[c]} {c}</option>)}
              </select>
            </Field>
            <Field label="Condition required">
              <select style={inputSt} value={form.cond} onChange={set('cond')}>
                {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>

          {/* Description */}
          <Field label="Description *" hint="Specific model, specs, colour, must-haves, deal-breakers…">
            <textarea
              style={{ ...inputSt, resize: 'vertical', minHeight: 120 }}
              placeholder="Be specific: model number, colour, storage, any accessories needed, condition deal-breakers..."
              value={form.desc}
              onChange={set('desc')}
              maxLength={600}
            />
            <CharCount val={form.desc.length} max={600} />
          </Field>

          {/* Budget + Area */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Your Budget (₹) *">
              <input style={inputSt} type="number" placeholder="e.g. 90000" value={form.budget} onChange={set('budget')} min={0} />
            </Field>
            <Field label="Your Area *">
              <select style={inputSt} value={form.area} onChange={set('area')}>
                {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </Field>
          </div>

          {/* Phone */}
          <Field label="WhatsApp Number *" hint="Shown only to verified sellers when you accept a deal. Never publicly visible.">
            <input style={inputSt} type="tel" placeholder="10-digit mobile number" value={form.phone} onChange={set('phone')} />
          </Field>

          {/* Urgent toggle */}
          <label style={{
            display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
            background: form.urgent ? 'rgba(255,85,0,0.06)' : 'var(--surface)',
            border: `1px solid ${form.urgent ? 'rgba(255,85,0,0.3)' : '#272729'}`,
            borderRadius: 12, padding: '14px 16px', transition: 'all .15s',
          }}>
            <input type="checkbox" checked={form.urgent} onChange={set('urgent')} style={{ width: 18, height: 18, accentColor: 'var(--accent)' }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--fg)' }}>🔥 Mark as Urgent</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Urgent requests get priority visibility and faster bids</div>
            </div>
          </label>

          {/* Error */}
          {error && (
            <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: 12, padding: '12px 16px', fontSize: 14, color: '#f87171' }}>
              {error}
            </div>
          )}

          {/* A3 fix: auth prompt inline instead of hard wall */}
          {showAuthPrompt && !user && (
            <div style={{ background: 'rgba(255,85,0,0.06)', border: '1px solid rgba(255,85,0,0.25)', borderRadius: 14, padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>🔒</div>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--fg)', marginBottom: 6 }}>Almost there! Sign in to post</h3>
              <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>Your draft is saved. Sign in and your requirement will be posted automatically.</p>
              <Link
                href="/auth?intent=post"
                style={{ ...btnPrimary, textDecoration: 'none', display: 'inline-flex', justifyContent: 'center' }}
              >
                Sign In to Post →
              </Link>
            </div>
          )}

          {/* Submit */}
          {!showAuthPrompt && (
            <button
              onClick={submit}
              disabled={loading}
              className="btn-hover"
              style={{ ...btnPrimary, width: '100%', fontSize: 16, padding: '16px', opacity: loading ? 0.7 : 1, justifyContent: 'center' }}
            >
              {loading ? 'Posting…' : user ? '📝 Post Requirement →' : '📝 Continue to Post →'}
            </button>
          )}

          {!user && !showAuthPrompt && (
            <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center' }}>
              You'll be asked to sign in before submitting.
            </p>
          )}

          <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center' }}>
            By posting, you agree to our{' '}
            <Link href="/terms" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function Field({ label, hint, children }) {
  return (
    <div>
      {label && (
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {label}
        </label>
      )}
      {children}
      {hint && <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 5 }}>{hint}</p>}
    </div>
  )
}

function CharCount({ val, max }) {
  return <div style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'right', marginTop: 4 }}>{val}/{max}</div>
}

const inputSt = {
  width: '100%', background: '#1a1a1c', border: '1px solid #272729', borderRadius: 12,
  padding: '12px 16px', color: 'var(--fg)', fontSize: 15, fontFamily: 'inherit',
  boxSizing: 'border-box', transition: 'border-color .15s',
}
const btnPrimary = {
  background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 12,
  padding: '12px 22px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'inherit', textDecoration: 'none',
}
const btnGhost = {
  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)',
  fontFamily: 'inherit', fontSize: 14, padding: 0,
}
