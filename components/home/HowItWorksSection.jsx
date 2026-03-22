'use client'

import { SectionHeader } from '@/components/ui/index.jsx'

const STEPS = [
  {
    number: '01',
    icon: '📝',
    title: 'Post what you want',
    desc: 'Tell us the gadget, model, condition, and your budget. Takes under 2 minutes. Completely free.',
    color: 'var(--accent)',
    bg: 'rgba(255,85,0,0.08)',
    border: 'rgba(255,85,0,0.2)',
    detail: ['iPhone 15 Pro 256GB', 'Budget: ₹90,000', 'Condition: Like New', 'Location: Koramangala'],
  },
  {
    number: '02',
    icon: '📬',
    title: 'Get offers from sellers',
    desc: 'Verified sellers review your requirement and send their best competing offers — directly to you.',
    color: '#60a5fa',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.2)',
    detail: ['7 sellers responded', 'Prices from ₹87,000', 'Ratings: 4.7–4.9★', 'With warranty details'],
  },
  {
    number: '03',
    icon: '🤝',
    title: 'Choose best deal & pay safely',
    desc: 'Compare offers side-by-side. Pick the best deal. Connect directly via WhatsApp to close safely.',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.2)',
    detail: ['Best offer: ₹87,000', 'Saved ₹3,000 vs budget', 'Seller: 4.9★ · 3,201 sales', 'Chat on WhatsApp →'],
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" style={{ padding: 'clamp(56px, 8vw, 96px) 24px', background: 'var(--surface)', borderTop: '1px solid #272729', borderBottom: '1px solid #272729' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="How it works"
          title="Three steps to your best deal"
          subtitle="No hunting. No spam DMs. Just post your requirement and let sellers come to you."
        />

        <div className="how-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, position: 'relative' }}>
          {/* Connector line */}
          <div style={{
            position: 'absolute',
            top: 52, left: '20%', right: '20%', height: 2,
            background: 'linear-gradient(90deg, var(--accent), #60a5fa, #22c55e)',
            opacity: 0.2, borderRadius: 2,
            pointerEvents: 'none',
          }} />

          {STEPS.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: 52 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 24,
            background: 'var(--bg)', border: '1px solid #272729', borderRadius: 16,
            padding: '16px 32px', flexWrap: 'wrap', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 14, color: 'var(--muted-high)' }}>Average time from post to first bid:</span>
            <span style={{ fontSize: 22, fontWeight: 900, color: 'var(--accent)' }}>47 minutes</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .how-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function StepCard({ step, index }) {
  return (
    <div style={{
      background: 'var(--bg)',
      border: `1px solid ${step.border}`,
      borderRadius: 20, padding: 28,
      position: 'relative',
      animation: `fadeUp 0.5s ease ${index * 0.12}s both`,
    }}>
      {/* Step number */}
      <div style={{
        position: 'absolute', top: 20, right: 20,
        fontSize: 48, fontWeight: 900, color: step.color,
        opacity: 0.12, lineHeight: 1, userSelect: 'none',
      }}>
        {step.number}
      </div>

      {/* Icon circle */}
      <div style={{
        width: 64, height: 64, borderRadius: 18,
        background: step.bg, border: `1px solid ${step.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 30, marginBottom: 20,
        animation: 'float 3s ease-in-out infinite',
      }}>
        {step.icon}
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--fg)', marginBottom: 10 }}>
        {step.title}
      </h3>
      <p style={{ fontSize: 14, color: 'var(--muted-high)', lineHeight: 1.7, marginBottom: 20 }}>
        {step.desc}
      </p>

      {/* Detail pills */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {step.detail.map((d, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontSize: 12, color: step.color, fontWeight: 600,
          }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: step.color, flexShrink: 0 }} />
            {d}
          </div>
        ))}
      </div>
    </div>
  )
}
