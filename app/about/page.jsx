import Link from 'next/link'
import { pageMetadata } from '@/lib/metadata'
import { COMPANY_EMAIL } from '@/lib/data'

export const metadata = {
  title: pageMetadata.about.title,
  description: pageMetadata.about.description,
}

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: 'clamp(40px, 6vw, 80px) 24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>

        {/* Eyebrow */}
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Our story</div>

        <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: 'var(--fg)', marginBottom: 20, lineHeight: 1.1 }}>
          We got tired of <span style={{ color: 'var(--accent)' }}>searching</span>.<br />
          So we flipped the market.
        </h1>

        <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'var(--fg-sub)', lineHeight: 1.75, marginBottom: 48 }}>
          wantd.in was born out of a personal frustration. Browsing 200 OLX listings for a used MacBook, negotiating with sellers who had no idea what they had, and still paying more than needed. There had to be a better way.
        </p>

        {/* Founder story */}
        <div id="founder" style={{ background: 'var(--surface)', border: '1px solid rgba(255,85,0,0.2)', borderRadius: 24, padding: 'clamp(24px, 4vw, 48px)', marginBottom: 56 }}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), #ff8c42)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, flexShrink: 0 }}>
              👨‍💻
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 20, color: 'var(--fg)', marginBottom: 4 }}>The Founder's Note</div>
              <div style={{ fontSize: 14, color: 'var(--muted)' }}>Bangalore, 2024</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              `I spent three weekends trying to buy a used iPhone 14 Pro in Bangalore. I messaged 40+ sellers on OLX. Half didn't reply. A quarter sent me the wrong model. Five tried to charge MRP for a scratched phone. It was exhausting.`,
              `Then a friend mentioned that some local electronics dealers had exactly what I needed — they just didn't list online. They had inventory, they had prices, they just didn't have buyers in front of them.`,
              `That's when the idea clicked: what if buyers could post what they want, and sellers — the good ones, the verified ones — could come to them?`,
              `We built wantd.in in 6 weeks. We onboarded 50 sellers in Koramangala, HSR, and Indiranagar. The first buyer who posted got 7 bids in 3 hours and saved ₹6,000 on a Sony headset. We've been running ever since.`,
              `Our mission is simple: make buying electronics in India feel like it should. Fast. Fair. Transparent. With competition working in the buyer's favour for once.`,
            ].map((para, i) => (
              <p key={i} style={{ fontSize: 15, color: 'var(--fg-sub)', lineHeight: 1.8, margin: 0 }}>
                {para}
              </p>
            ))}
          </div>

          <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid #272729', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,85,0,0.1)', border: '1px solid rgba(255,85,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
              👨‍💻
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--fg)' }}>Founder & CEO</div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>wantd.in · Bangalore, India</div>
            </div>
          </div>
        </div>

        {/* Mission values */}
        <h2 style={{ fontSize: 28, fontWeight: 900, color: 'var(--fg)', marginBottom: 28 }}>What we stand for</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 56 }}>
          {[
            { icon: '⚖️', title: 'Buyers first', desc: 'Every feature, every decision is made with the buyer\'s interest at the centre.' },
            { icon: '✅', title: 'Seller quality', desc: 'We verify every seller before they can bid. No unverified strangers with your phone number.' },
            { icon: '🔍', title: 'Full transparency', desc: 'Ratings, review counts, response times — all public, all real.' },
            { icon: '🇮🇳', title: 'Built for India', desc: 'Indian price expectations, Indian sellers, WhatsApp-first UX. Built in Bangalore.' },
          ].map((v) => (
            <div key={v.title} style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{v.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--fg)', marginBottom: 8 }}>{v.title}</div>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Press / numbers */}
        <div style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 20, padding: 32, marginBottom: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>By the numbers</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20 }}>
            {[
              { val: '12,400+', label: 'Wants posted' },
              { val: '4,800+', label: 'Verified sellers' },
              { val: '₹2 Crore+', label: 'Deals matched' },
              { val: '88%', label: 'Buyers save money' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--fg)', marginBottom: 4 }}>{s.val}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--fg)', marginBottom: 16 }}>Want to join the story?</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 24 }}>Whether you're a buyer, a seller, a journalist, or an investor — we'd love to hear from you.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/post" style={{ ...btnPrimary, textDecoration: 'none' }}>Post Your First Want</Link>
            <Link href="/contact" style={{ ...btnSecondary, textDecoration: 'none' }}>Contact Us</Link>
          </div>
        </div>

      </div>
    </div>
  )
}

const btnPrimary = { background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 12, padding: '13px 28px', fontSize: 15, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 7 }
const btnSecondary = { background: 'transparent', color: 'var(--fg)', border: '1px solid #272729', borderRadius: 12, padding: '12px 24px', fontSize: 14, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }
