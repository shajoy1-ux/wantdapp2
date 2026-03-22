'use client'

import { CountUp } from '@/components/ui/AnimatedElements'
import { SectionHeader } from '@/components/ui/index.jsx'
import { TESTIMONIALS, STATS } from '@/lib/data'

export function SocialProofSection() {
  return (
    <section style={{ padding: 'clamp(56px, 8vw, 96px) 24px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* ── STATS BAR ── */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,85,0,0.06), rgba(60,130,246,0.04))',
          border: '1px solid rgba(255,85,0,0.15)',
          borderRadius: 20, padding: '32px 24px',
          marginBottom: 64,
        }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Live numbers</div>
            <div style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 800, color: 'var(--fg)' }}>
              Thousands of deals. Zero search needed.
            </div>
          </div>

          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {STATS.map((s, i) => (
              <StatBox key={i} stat={s} delay={i * 0.1} />
            ))}
          </div>
        </div>

        {/* ── TESTIMONIALS ── */}
        <SectionHeader
          eyebrow="Real buyers & sellers"
          title="People love wantd.in"
          subtitle="Don't take our word for it — here's what real users say after their first deal."
        />

        <div className="testimonial-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} delay={i * 0.1} />
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .testimonial-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function StatBox({ stat, delay }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid #272729', borderRadius: 16,
      padding: '24px 20px', textAlign: 'center',
      animation: `countUp 0.5s ease ${delay}s both`,
    }}>
      <div style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 900, color: stat.color, marginBottom: 6, lineHeight: 1 }}>
        {stat.raw
          ? stat.raw
          : <CountUp end={stat.end} prefix={stat.prefix} suffix={stat.suffix} />
        }
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)', marginBottom: 4 }}>{stat.label}</div>
      <div style={{ fontSize: 12, color: 'var(--muted)' }}>{stat.sub}</div>
    </div>
  )
}

function TestimonialCard({ testimonial: t, delay }) {
  const colors = ['#FF5500', '#22c55e', '#60a5fa', '#fbbf24']
  const colorIdx = t.initials.charCodeAt(0) % colors.length
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid #272729', borderRadius: 18, padding: 28,
      animation: `fadeUp 0.5s ease ${delay}s both`,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Quote mark */}
      <div style={{ fontSize: 48, color: 'var(--accent)', opacity: 0.3, lineHeight: 1, marginBottom: 12, fontFamily: 'Georgia, serif' }}>❝</div>

      <p style={{ fontSize: 15, color: 'var(--fg-sub)', lineHeight: 1.75, marginBottom: 24 }}>
        {t.quote}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderTop: '1px solid #272729', paddingTop: 18 }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: `${colors[colorIdx]}22`,
          border: `1px solid ${colors[colorIdx]}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 700, color: colors[colorIdx], flexShrink: 0,
        }}>
          {t.initials}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--fg)' }}>{t.name}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>{t.city} · {t.role}</div>
        </div>
        <div>
          <span style={{ color: '#fbbf24', fontSize: 13, letterSpacing: 1 }}>
            {'★'.repeat(t.rating)}
          </span>
        </div>
      </div>
    </div>
  )
}
