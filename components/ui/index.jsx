'use client'

import { useEffect } from 'react'
import { fmtINR } from '@/lib/helpers'

// ─── BADGE ────────────────────────────────────────────────────────────────────
export function Badge({ children, variant = 'default' }) {
  const styles = {
    default: { bg: 'rgba(255,85,0,0.1)', color: 'var(--accent)', border: '1px solid rgba(255,85,0,0.25)' },
    green:   { bg: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.25)' },
    yellow:  { bg: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.25)' },
    blue:    { bg: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.25)' },
    red:     { bg: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' },
    muted:   { bg: 'rgba(255,255,255,0.06)', color: '#888', border: '1px solid #272729' },
  }
  const s = styles[variant] || styles.default
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 9px', borderRadius: 100,
      fontSize: 11, fontWeight: 600,
      background: s.bg, color: s.color, border: s.border,
    }}>
      {children}
    </span>
  )
}

// ─── BUTTON ───────────────────────────────────────────────────────────────────
export function Button({ children, variant = 'primary', size = 'md', onClick, disabled, style = {}, className = '' }) {
  const base = {
    border: 'none', borderRadius: 12, cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7,
    fontFamily: 'inherit', fontWeight: 700, transition: 'opacity .15s, transform .15s',
    opacity: disabled ? 0.6 : 1,
  }
  const variants = {
    primary:   { background: 'var(--accent)', color: '#fff' },
    secondary: { background: 'transparent', color: 'var(--fg)', border: '1px solid #272729' },
    ghost:     { background: 'none', color: 'var(--muted)', border: 'none' },
    danger:    { background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' },
    green:     { background: 'rgba(34,197,94,0.15)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)' },
  }
  const sizes = {
    sm:  { padding: '9px 16px', fontSize: 13 },
    md:  { padding: '12px 20px', fontSize: 14 },
    lg:  { padding: '15px 28px', fontSize: 16 },
    xl:  { padding: '18px 36px', fontSize: 17 },
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn-hover ${className}`}
      style={{ ...base, ...variants[variant], ...sizes[size], ...style }}
    >
      {children}
    </button>
  )
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
export function Modal({ open, onClose, children, maxWidth = 520 }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,.7)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 5000, padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#1a1a1c', borderRadius: 20, padding: 28,
          width: '100%', maxWidth, maxHeight: '88vh', overflowY: 'auto',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
          animation: 'fadeUp .25s ease',
          border: '1px solid #272729',
        }}
      >
        {children}
      </div>
    </div>
  )
}

// ─── SKELETON CARD ────────────────────────────────────────────────────────────
export function SkeletonCard() {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 16, overflow: 'hidden' }}>
      <div className="skeleton-line" style={{ height: 120 }} />
      <div style={{ padding: '14px 16px 16px' }}>
        <div className="skeleton-line" style={{ height: 16, width: '75%', marginBottom: 10 }} />
        <div className="skeleton-line" style={{ height: 22, width: '45%', marginBottom: 10 }} />
        <div className="skeleton-line" style={{ height: 12, width: '60%', marginBottom: 14 }} />
        <div className="skeleton-line" style={{ height: 12, width: '90%', marginBottom: 6 }} />
        <div className="skeleton-line" style={{ height: 12, width: '70%', marginBottom: 16 }} />
        <div className="skeleton-line" style={{ height: 42, width: '100%', borderRadius: 12 }} />
      </div>
    </div>
  )
}

// ─── VERIFIED BADGE ───────────────────────────────────────────────────────────
export function VerifiedBadge() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 16, height: 16, borderRadius: '50%',
      background: 'rgba(34,197,94,0.15)', color: '#22c55e',
      fontSize: 10, fontWeight: 800,
    }}>✓</span>
  )
}

// ─── STAR RATING ──────────────────────────────────────────────────────────────
export function StarRating({ rating, size = 12 }) {
  return (
    <span style={{ color: '#fbbf24', fontSize: size, fontWeight: 600 }}>
      ★ {rating}
    </span>
  )
}

// ─── WA ICON ──────────────────────────────────────────────────────────────────
export function WAIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

// ─── SELLER TRUST METRICS ─────────────────────────────────────────────────────
export function SellerTrustMetrics({ seller, compact = false }) {
  return (
    <div style={{
      background: 'var(--bg)', border: '1px solid #272729', borderRadius: compact ? 10 : 14,
      padding: compact ? '10px 14px' : '16px 18px',
      display: 'flex', flexDirection: compact ? 'row' : 'column',
      gap: compact ? 16 : 10, flexWrap: 'wrap',
    }}>
      <TrustMetric
        icon="⭐"
        label={`${seller.rating} from ${seller.sales.toLocaleString()} transactions`}
        color="#fbbf24"
        compact={compact}
      />
      <TrustMetric
        icon="⚡"
        label={`Responds ${seller.responseTime || '< 2 hours'}`}
        color="#60a5fa"
        compact={compact}
      />
      {seller.verified && (
        <TrustMetric
          icon="✓"
          label="Identity verified"
          color="#22c55e"
          compact={compact}
        />
      )}
      <TrustMetric
        icon="📍"
        label={seller.area}
        color="var(--muted-high)"
        compact={compact}
      />
    </div>
  )
}

function TrustMetric({ icon, label, color, compact }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
      <span style={{ fontSize: compact ? 12 : 14 }}>{icon}</span>
      <span style={{ fontSize: compact ? 12 : 13, color, fontWeight: 500 }}>{label}</span>
    </div>
  )
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
export function SectionHeader({ eyebrow, title, subtitle, center = true }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 48 }}>
      {eyebrow && (
        <div style={{
          fontSize: 12, fontWeight: 700, color: 'var(--accent)',
          textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10,
        }}>
          {eyebrow}
        </div>
      )}
      <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, color: 'var(--fg)', marginBottom: subtitle ? 14 : 0, lineHeight: 1.2 }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: 16, color: 'var(--muted-high)', maxWidth: 540, margin: center ? '0 auto' : 0, lineHeight: 1.6 }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ─── PRICE TAG ────────────────────────────────────────────────────────────────
export function PriceTag({ amount, size = 'md', color = '#22c55e' }) {
  const sizes = { sm: 14, md: 18, lg: 24, xl: 32 }
  return (
    <span style={{ fontSize: sizes[size], fontWeight: 900, color }}>
      ₹{fmtINR(amount)}
    </span>
  )
}

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
export function EmptyState({ icon = '🔍', title, subtitle, action }) {
  return (
    <div style={{
      textAlign: 'center', padding: '80px 20px',
      background: 'var(--surface)', border: '1px solid #272729', borderRadius: 20,
    }}>
      <div style={{ fontSize: 52, marginBottom: 16 }}>{icon}</div>
      <p style={{ fontWeight: 700, fontSize: 18, color: 'var(--fg)', marginBottom: 8 }}>{title}</p>
      {subtitle && <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: action ? 24 : 0 }}>{subtitle}</p>}
      {action}
    </div>
  )
}

// ─── FORM INPUT ───────────────────────────────────────────────────────────────
export function FormInput({ label, required, children, hint }) {
  return (
    <div>
      {label && (
        <label style={{
          display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)',
          marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.05em',
        }}>
          {label}{required && ' *'}
        </label>
      )}
      {children}
      {hint && <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 5 }}>{hint}</p>}
    </div>
  )
}

export const inputStyle = {
  width: '100%', background: '#1a1a1c', border: '1px solid #272729', borderRadius: 12,
  padding: '12px 16px', color: 'var(--fg)', fontSize: 15, fontFamily: 'inherit',
  boxSizing: 'border-box', transition: 'border-color .15s',
}
