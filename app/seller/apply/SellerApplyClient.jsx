'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useApp } from '@/components/providers/AppProvider'
import { AREAS, CATEGORIES } from '@/lib/data'

const EXPERIENCE_OPTIONS = ['Less than 1 year', '1–3 years', '3–5 years', '5+ years']
const ALL_CATS = CATEGORIES.filter(c => c !== 'Other')

export function SellerApplyClient() {
  const { user, onApplyAsSeller, getMySellerApplication } = useApp()
  const router = useRouter()

  const [step, setStep] = useState(1) // 1 | 2 | 3 | done
  const [form, setForm] = useState({
    fullName: '', businessName: '', whatsapp: '', experience: '',
    areas: [], categories: [], idDoc: null, gstDoc: null, shopPhoto: null,
    agreed: false,
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Redirect if already applied
  useEffect(() => {
    if (user && getMySellerApplication(user.email)) {
      router.replace('/seller/status')
    }
  }, [user, getMySellerApplication, router])

  if (!user) {
    return (
      <div style={centreWrap}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
          <h2 style={{ fontWeight: 800, fontSize: 22, color: 'var(--fg)', marginBottom: 12 }}>Sign in to apply</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 24 }}>Create an account and then apply for seller verification.</p>
          <Link href="/auth" style={btnPrimary}>Sign In or Create Account →</Link>
        </div>
      </div>
    )
  }

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))
  const toggle = (k, val) => setForm(p => {
    const arr = p[k]
    return { ...p, [k]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] }
  })

  const validateStep1 = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Enter your full name'
    if (!form.whatsapp.trim() || form.whatsapp.replace(/\D/g, '').length < 10) e.whatsapp = 'Enter a valid 10-digit WhatsApp number'
    if (!form.experience) e.experience = 'Select your experience'
    if (!form.areas.length) e.areas = 'Select at least one area'
    if (!form.categories.length) e.categories = 'Select at least one category'
    setErrors(e)
    return !Object.keys(e).length
  }

  const validateStep2 = () => {
    const e = {}
    if (!form.idDoc) e.idDoc = 'Upload a government ID'
    setErrors(e)
    return !Object.keys(e).length
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2)
    else if (step === 2 && validateStep2()) setStep(3)
  }

  const handleSubmit = () => {
    if (!form.agreed) { setErrors({ agreed: 'You must agree to the Seller Terms' }); return }
    setLoading(true)
    setTimeout(() => {
      onApplyAsSeller({
        fullName: form.fullName,
        businessName: form.businessName,
        whatsappNumber: form.whatsapp,
        experienceYears: form.experience,
        areas: form.areas,
        categories: form.categories,
        idDocumentUrl: form.idDoc ? form.idDoc.name : null,
        gstUrl: form.gstDoc ? form.gstDoc.name : null,
        shopPhotoUrl: form.shopPhoto ? form.shopPhoto.name : null,
      }, user)
      setLoading(false)
      setStep('done')
    }, 800)
  }

  if (step === 'done') {
    return (
      <div style={centreWrap}>
        <div style={{ textAlign: 'center', maxWidth: 480 }}>
          <div style={{ fontSize: 56, marginBottom: 18 }}>🎉</div>
          <h1 style={{ fontWeight: 900, fontSize: 28, color: 'var(--fg)', marginBottom: 12 }}>Application Submitted!</h1>
          <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 28 }}>
            We review applications within <strong style={{ color: 'var(--fg)' }}>24–48 hours</strong>. You&apos;ll receive a WhatsApp message at <strong style={{ color: 'var(--fg)' }}>{form.whatsapp}</strong> when approved.
          </p>
          <div style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 14, padding: '16px 20px', marginBottom: 24 }}>
            {[
              ['Document review', '2–4 hours'],
              ['Background check', '4–12 hours'],
              ['Final approval', '12–48 hours'],
            ].map(([label, time]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #272729' }}>
                <span style={{ fontSize: 13, color: 'var(--fg)' }}>{label}</span>
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>{time}</span>
              </div>
            ))}
          </div>
          <Link href="/seller/status" style={{ ...btnPrimary, textDecoration: 'none', display: 'inline-block', marginBottom: 12 }}>
            Check Application Status →
          </Link>
          <br />
          <Link href="/browse" style={{ fontSize: 14, color: 'var(--muted)', textDecoration: 'none' }}>
            Browse Requests in the meantime
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: 620, margin: '0 auto' }}>

        <Link href="/dashboard/seller" style={{ ...btnGhost, display: 'inline-flex', marginBottom: 20, alignItems: 'center', gap: 6, textDecoration: 'none' }}>
          ← Back
        </Link>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <h1 style={{ fontWeight: 900, fontSize: 'clamp(24px,4vw,32px)', color: 'var(--fg)', marginBottom: 8 }}>
            Become a Verified Seller
          </h1>
          <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.6 }}>
            Takes under 5 minutes. Approval in 24–48 hours. Free to apply.
          </p>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 36 }}>
          {[1, 2, 3].map((n) => (
            <div key={n} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: step >= n ? 'var(--accent)' : 'var(--surface)',
                border: `2px solid ${step >= n ? 'var(--accent)' : '#272729'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700,
                color: step >= n ? '#fff' : 'var(--muted)',
                transition: 'all .2s',
              }}>
                {step > n ? '✓' : n}
              </div>
              <div style={{ marginLeft: 10, flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: step >= n ? 'var(--fg)' : 'var(--muted)' }}>
                  {['Basic Info', 'Documents', 'Review'][n - 1]}
                </div>
              </div>
              {n < 3 && (
                <div style={{ width: 24, height: 2, background: step > n ? 'var(--accent)' : '#272729', margin: '0 8px', flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 20, padding: 32 }}>

          {/* ── STEP 1: Basic Info ── */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 style={{ fontWeight: 800, fontSize: 20, color: 'var(--fg)', margin: 0 }}>Basic Information</h2>

              <Field label="Full Legal Name *" error={errors.fullName}>
                <input style={inputSt} value={form.fullName} onChange={set('fullName')} placeholder="As on your government ID" />
              </Field>

              <Field label="Business Name" hint="Leave blank if you trade as an individual">
                <input style={inputSt} value={form.businessName} onChange={set('businessName')} placeholder="e.g. TechHub Electronics (optional)" />
              </Field>

              <Field label="WhatsApp Number *" hint="Used for deal notifications and buyer contact. Never shown publicly." error={errors.whatsapp}>
                <input style={inputSt} type="tel" value={form.whatsapp} onChange={set('whatsapp')} placeholder="10-digit mobile number" />
              </Field>

              <Field label="Years in Electronics Trade *" error={errors.experience}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {EXPERIENCE_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setForm(p => ({ ...p, experience: opt }))}
                      style={{
                        padding: '8px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                        background: form.experience === opt ? 'rgba(255,85,0,0.1)' : 'var(--bg)',
                        border: `1px solid ${form.experience === opt ? 'var(--accent)' : '#272729'}`,
                        color: form.experience === opt ? 'var(--accent)' : 'var(--muted-high)',
                        transition: 'all .15s',
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Primary Areas of Operation *" hint="Select all areas where you typically operate" error={errors.areas}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {AREAS.map(area => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => toggle('areas', area)}
                      style={{
                        padding: '7px 14px', borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                        background: form.areas.includes(area) ? 'rgba(255,85,0,0.1)' : 'var(--bg)',
                        border: `1px solid ${form.areas.includes(area) ? 'var(--accent)' : '#272729'}`,
                        color: form.areas.includes(area) ? 'var(--accent)' : 'var(--muted-high)',
                        transition: 'all .15s',
                      }}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Categories You Sell *" error={errors.categories}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {ALL_CATS.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggle('categories', cat)}
                      style={{
                        padding: '7px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                        background: form.categories.includes(cat) ? 'rgba(255,85,0,0.1)' : 'var(--bg)',
                        border: `1px solid ${form.categories.includes(cat) ? 'var(--accent)' : '#272729'}`,
                        color: form.categories.includes(cat) ? 'var(--accent)' : 'var(--muted-high)',
                        transition: 'all .15s',
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </Field>

              <button onClick={handleNext} style={{ ...btnPrimary, justifyContent: 'center', fontSize: 15, padding: '14px' }}>
                Continue to Documents →
              </button>
            </div>
          )}

          {/* ── STEP 2: Documents ── */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <h2 style={{ fontWeight: 800, fontSize: 20, color: 'var(--fg)', margin: 0 }}>Document Upload</h2>
              <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: -10, lineHeight: 1.6 }}>
                We keep your documents secure and only use them for verification. Accepted: JPG, PNG, PDF, max 5MB.
              </p>

              <UploadField
                label="Government ID *"
                hint="Aadhaar, PAN card, or Driving License"
                error={errors.idDoc}
                file={form.idDoc}
                onChange={(f) => setForm(p => ({ ...p, idDoc: f }))}
              />

              <UploadField
                label="GST Certificate"
                hint="Optional — if your business is GST registered"
                file={form.gstDoc}
                onChange={(f) => setForm(p => ({ ...p, gstDoc: f }))}
              />

              <UploadField
                label="Shop Photo / Trade Selfie"
                hint='Optional but recommended — a selfie holding a handwritten "wantd.in" note boosts approval speed'
                file={form.shopPhoto}
                onChange={(f) => setForm(p => ({ ...p, shopPhoto: f }))}
              />

              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, ...btnSecondary }}>← Back</button>
                <button onClick={handleNext} style={{ flex: 2, ...btnPrimary, justifyContent: 'center' }}>
                  Review Application →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Review ── */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <h2 style={{ fontWeight: 800, fontSize: 20, color: 'var(--fg)', margin: 0 }}>Review & Submit</h2>

              {/* Summary */}
              <div style={{ background: 'var(--bg)', border: '1px solid #272729', borderRadius: 14, overflow: 'hidden' }}>
                {[
                  ['Full Name', form.fullName],
                  ['Business', form.businessName || 'Individual'],
                  ['WhatsApp', form.whatsapp],
                  ['Experience', form.experience],
                  ['Areas', form.areas.join(', ')],
                  ['Categories', form.categories.join(', ')],
                  ['Government ID', form.idDoc?.name || '—'],
                  ['GST Certificate', form.gstDoc?.name || 'Not provided'],
                  ['Shop Photo', form.shopPhoto?.name || 'Not provided'],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', gap: 16, padding: '10px 16px', borderBottom: '1px solid #1c1c1e', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, minWidth: 110, flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.04em', paddingTop: 2 }}>{label}</span>
                    <span style={{ fontSize: 13, color: 'var(--fg)', lineHeight: 1.5 }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Agreement */}
              <label style={{
                display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer',
                background: form.agreed ? 'rgba(34,197,94,0.04)' : 'var(--bg)',
                border: `1px solid ${errors.agreed ? 'rgba(248,113,113,0.4)' : form.agreed ? 'rgba(34,197,94,0.25)' : '#272729'}`,
                borderRadius: 12, padding: '14px 16px', transition: 'all .15s',
              }}>
                <input
                  type="checkbox"
                  checked={form.agreed}
                  onChange={e => setForm(p => ({ ...p, agreed: e.target.checked }))}
                  style={{ width: 18, height: 18, accentColor: 'var(--accent)', flexShrink: 0, marginTop: 1 }}
                />
                <div style={{ fontSize: 13, color: 'var(--fg-sub)', lineHeight: 1.65 }}>
                  I agree to the{' '}
                  <Link href="/terms" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Seller Terms</Link>
                  {' '}and commit to honouring all accepted bids. I confirm that all submitted information is accurate and that I have the right to sell the items I list.
                </div>
              </label>
              {errors.agreed && <p style={{ fontSize: 12, color: '#f87171', marginTop: -12 }}>{errors.agreed}</p>}

              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, ...btnSecondary }}>← Back</button>
                <button onClick={handleSubmit} disabled={loading} style={{ flex: 2, ...btnPrimary, justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
                  {loading ? 'Submitting…' : '📋 Submit Application'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ label, hint, error, children }) {
  return (
    <div>
      {label && <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>}
      {children}
      {hint && !error && <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 5 }}>{hint}</p>}
      {error && <p style={{ fontSize: 12, color: '#f87171', marginTop: 5 }}>{error}</p>}
    </div>
  )
}

function UploadField({ label, hint, error, file, onChange }) {
  const handleChange = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.size > 5 * 1024 * 1024) { alert('File too large — max 5MB'); return }
    onChange(f)
  }

  return (
    <Field label={label} hint={hint} error={error}>
      <label style={{
        display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
        background: file ? 'rgba(34,197,94,0.04)' : '#1a1a1c',
        border: `2px dashed ${file ? 'rgba(34,197,94,0.4)' : error ? 'rgba(248,113,113,0.4)' : '#272729'}`,
        borderRadius: 12, padding: '14px 18px', transition: 'all .15s',
      }}>
        <span style={{ fontSize: 28, flexShrink: 0 }}>{file ? '✅' : '📎'}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: file ? '#22c55e' : 'var(--fg)' }}>
            {file ? file.name : 'Click to upload'}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
            {file ? `${(file.size / 1024).toFixed(0)} KB` : 'JPG, PNG or PDF — max 5MB'}
          </div>
        </div>
        <input type="file" accept=".jpg,.jpeg,.png,.pdf" style={{ display: 'none' }} onChange={handleChange} />
      </label>
    </Field>
  )
}

const centreWrap = { minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }
const inputSt = { width: '100%', background: '#1a1a1c', border: '1px solid #272729', borderRadius: 12, padding: '12px 16px', color: 'var(--fg)', fontSize: 15, fontFamily: 'inherit', boxSizing: 'border-box' }
const btnPrimary = { background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'inherit' }
const btnSecondary = { background: 'transparent', color: 'var(--fg)', border: '1px solid #272729', borderRadius: 12, padding: '12px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', justifyContent: 'center', display: 'inline-flex' }
const btnGhost = { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontFamily: 'inherit', fontSize: 14, padding: 0 }
