import { pageMetadata } from '@/lib/metadata'
import { COMPANY_EMAIL, SUPPORT_EMAIL, COMPANY_PHONE, COMPANY_ADDRESS } from '@/lib/data'

export const metadata = {
  title: pageMetadata.contact.title,
  description: pageMetadata.contact.description,
}

export default function ContactPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: 'clamp(40px, 6vw, 80px) 24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>

        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Get in touch</div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: 'var(--fg)', marginBottom: 14 }}>Contact Us</h1>
        <p style={{ fontSize: 16, color: 'var(--fg-sub)', lineHeight: 1.65, marginBottom: 52, maxWidth: 520 }}>
          Questions, feedback, seller onboarding, partnerships — we read every message and respond within 24 hours.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 48 }}>

          {/* General */}
          <ContactCard
            icon="✉️"
            title="General Enquiries"
            desc="For product questions, feedback, and anything else."
            detail={COMPANY_EMAIL}
            href={`mailto:${COMPANY_EMAIL}`}
            color="var(--accent)"
          />

          {/* Support */}
          <ContactCard
            icon="🛟"
            title="Buyer & Seller Support"
            desc="Issues with a transaction, dispute resolution, or account help."
            detail={SUPPORT_EMAIL}
            href={`mailto:${SUPPORT_EMAIL}`}
            color="#60a5fa"
          />

          {/* Phone */}
          <ContactCard
            icon="📞"
            title="Phone Support"
            desc="Mon–Fri, 10am–6pm IST. For urgent or complex issues."
            detail={COMPANY_PHONE}
            href={`tel:${COMPANY_PHONE.replace(/\s/g, '')}`}
            color="#22c55e"
          />

          {/* WhatsApp */}
          <ContactCard
            icon="📲"
            title="WhatsApp Us"
            desc="Quick questions or seller onboarding enquiries."
            detail="Chat on WhatsApp →"
            href={`https://wa.me/918000000000?text=${encodeURIComponent('Hi! I have a question about wantd.in.')}`}
            color="#25d366"
            external
          />

        </div>

        {/* Office info */}
        <div style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 20, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontWeight: 800, fontSize: 20, color: 'var(--fg)', marginBottom: 20 }}>Our Office</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            <InfoRow icon="📍" label="Address" value={COMPANY_ADDRESS} />
            <InfoRow icon="🏙️" label="City" value="Bangalore, Karnataka" />
            <InfoRow icon="🇮🇳" label="Country" value="India" />
            <InfoRow icon="🕐" label="Business Hours" value="Mon–Fri, 10am–6pm IST" />
          </div>
        </div>

        {/* Seller onboarding */}
        <div style={{ background: 'rgba(255,85,0,0.05)', border: '1px solid rgba(255,85,0,0.2)', borderRadius: 20, padding: 32 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 40 }}>🏪</span>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontWeight: 800, fontSize: 20, color: 'var(--fg)', marginBottom: 8 }}>Want to sell on wantd.in?</h2>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 16, maxWidth: 480 }}>
                We onboard verified electronics retailers, refurbishers, and individual power-sellers in Bangalore. Zero listing fees. 2% commission only on closed deals.
              </p>
              <a href={`mailto:${COMPANY_EMAIL}?subject=Seller Onboarding Request&body=Hi! I'd like to register as a seller on wantd.in. My details: `} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'var(--accent)', color: '#fff', borderRadius: 10, padding: '11px 22px', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                Apply to Sell →
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

function ContactCard({ icon, title, desc, detail, href, color, external }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 18, padding: 24, height: '100%', transition: 'border-color .2s, transform .2s', cursor: 'pointer' }} className="card-hover">
        <div style={{ fontSize: 32, marginBottom: 14 }}>{icon}</div>
        <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--fg)', marginBottom: 8 }}>{title}</h3>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 16 }}>{desc}</p>
        <span style={{ fontSize: 14, color, fontWeight: 700 }}>{detail}</span>
      </div>
    </a>
  )
}

function InfoRow({ icon, label, value }) {
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
      </div>
      <div style={{ fontSize: 14, color: 'var(--fg-sub)', paddingLeft: 24 }}>{value}</div>
    </div>
  )
}
