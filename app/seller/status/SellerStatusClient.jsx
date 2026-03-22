'use client'

import Link from 'next/link'
import { useApp } from '@/components/providers/AppProvider'

export function SellerStatusClient() {
  const { user, getMySellerApplication, onDemoApproveSeller } = useApp()

  if (!user) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
          <h2 style={{ fontWeight: 800, fontSize: 22, color: 'var(--fg)', marginBottom: 12 }}>Sign in to check your status</h2>
          <Link href="/auth" style={btnPrimary}>Sign In →</Link>
        </div>
      </div>
    )
  }

  const app = getMySellerApplication(user.email)

  if (!app) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
          <h2 style={{ fontWeight: 800, fontSize: 22, color: 'var(--fg)', marginBottom: 12 }}>No application found</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 24 }}>You haven&apos;t applied for seller verification yet.</p>
          <Link href="/seller/apply" style={{ ...btnPrimary, textDecoration: 'none' }}>Apply Now →</Link>
        </div>
      </div>
    )
  }

  const statusConfig = {
    pending:  { icon: '⏳', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.25)', title: 'Application Under Review', desc: "Our team is reviewing your documents. You'll receive a WhatsApp message when a decision is made." },
    approved: { icon: '✅', color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.25)', title: 'Application Approved!', desc: 'Congratulations! Your seller account is verified. You can now submit offers on buyer requests.' },
    rejected: { icon: '❌', color: '#f87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.25)', title: 'Application Not Approved', desc: app.rejectionReason || 'Unfortunately your application was not approved at this time. You may reapply after 30 days.' },
  }

  const s = statusConfig[app.status] || statusConfig.pending
  const appliedDate = app.createdAt
    ? new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—'

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: 580, margin: '0 auto' }}>

        <Link href="/dashboard/seller" style={{ ...btnGhost, display: 'inline-flex', marginBottom: 20, alignItems: 'center', gap: 6, textDecoration: 'none' }}>
          ← Back to dashboard
        </Link>

        <h1 style={{ fontWeight: 900, fontSize: 28, color: 'var(--fg)', marginBottom: 28 }}>Seller Application Status</h1>

        {/* Status card */}
        <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 20, padding: 28, textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 52, marginBottom: 14 }}>{s.icon}</div>
          <h2 style={{ fontWeight: 800, fontSize: 22, color: s.color, marginBottom: 10 }}>{s.title}</h2>
          <p style={{ fontSize: 14, color: 'var(--fg-sub)', lineHeight: 1.7, maxWidth: 400, margin: '0 auto' }}>{s.desc}</p>
        </div>

        {/* Application summary */}
        <div style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #272729' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Application Details</div>
          </div>
          {[
            ['Name', app.fullName],
            ['Business', app.businessName || 'Individual'],
            ['WhatsApp', app.whatsappNumber],
            ['Experience', app.experienceYears],
            ['Areas', Array.isArray(app.areas) ? app.areas.join(', ') : app.areas],
            ['Applied on', appliedDate],
          ].filter(([, v]) => v).map(([label, value]) => (
            <div key={label} style={{ display: 'flex', gap: 16, padding: '11px 20px', borderBottom: '1px solid #1c1c1e', alignItems: 'flex-start' }}>
              <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, minWidth: 100, flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.04em', paddingTop: 2 }}>{label}</span>
              <span style={{ fontSize: 13, color: 'var(--fg)', lineHeight: 1.5 }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Timeline for pending */}
        {app.status === 'pending' && (
          <div style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: 14, padding: '16px 20px', marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#60a5fa', marginBottom: 10 }}>⏱ Expected Timeline</div>
            {[['Document review', '2–4 hours'], ['Background verification', '4–12 hours'], ['Final decision', '12–48 hours']].map(([label, time]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, paddingBottom: 6 }}>
                <span style={{ color: 'var(--fg)' }}>{label}</span>
                <span style={{ color: 'var(--muted)' }}>{time}</span>
              </div>
            ))}
          </div>
        )}

        {/* CTA based on status */}
        {app.status === 'approved' && (
          <Link href="/browse" style={{ ...btnPrimary, textDecoration: 'none', display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            Browse Buyer Requests →
          </Link>
        )}
        {app.status === 'rejected' && (
          <Link href="/seller/apply" style={{ ...btnPrimary, textDecoration: 'none', display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            Reapply →
          </Link>
        )}

        {/* Dev-only approve button */}
        {process.env.NODE_ENV !== 'production' && app.status === 'pending' && (
          <div style={{ marginTop: 20, padding: '14px 18px', background: 'rgba(255,255,255,0.03)', border: '1px dashed #3a3a3c', borderRadius: 12, textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10 }}>🔧 Dev mode — simulate approval</p>
            <button
              onClick={() => onDemoApproveSeller(user.email)}
              style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 10, padding: '9px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Approve This Application (Dev Only)
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const btnPrimary = { background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'inherit' }
const btnGhost = { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontFamily: 'inherit', fontSize: 14, padding: 0 }
