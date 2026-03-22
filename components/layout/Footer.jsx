'use client'

import Link from 'next/link'
import { COMPANY_EMAIL, GST_NUMBER, COMPANY_ADDRESS } from '@/lib/data'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ borderTop: '1px solid #272729', padding: '48px 24px 32px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Main footer grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>

          {/* Brand */}
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 12 }}>
              <span style={{ color: 'var(--accent)' }}>wantd</span>.in
            </div>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 16, maxWidth: 240 }}>
              India's first reverse electronics marketplace. Buyers post what they want. Sellers compete.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <a href={`mailto:${COMPANY_EMAIL}`} style={{ fontSize: 13, color: 'var(--muted-high)', textDecoration: 'none' }}>
                ✉️ {COMPANY_EMAIL}
              </a>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>📍 Bangalore, Karnataka 🇮🇳</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Product</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <FooterLink href="/">How it works</FooterLink>
              <FooterLink href="/browse">Browse requests</FooterLink>
              <FooterLink href="/post">Post a want</FooterLink>
              <FooterLink href="/feed">Public want feed</FooterLink>
              <FooterLink href="/messages">Messages</FooterLink>
              <FooterLink href="/seller/apply">Become a seller</FooterLink>
            </div>
          </div>

          {/* Company */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Company</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <FooterLink href="/about">About us</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/about#founder">Founder story</FooterLink>
            </div>
          </div>

          {/* Legal */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Legal</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/refund">Return & Refund Policy</FooterLink>
              <FooterLink href="/grievance">Grievance Officer</FooterLink>
            </div>
          </div>

        </div>

        {/* Trust bar */}
        <div style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 12, padding: '14px 20px', display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            <TrustItem icon="🔒" text="Verified sellers only" />
            <TrustItem icon="🛡️" text="Secure transactions" />
            <TrustItem icon="⚡" text="First bid in 2 hours" />
            <TrustItem icon="🇮🇳" text="Made in India" />
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>{GST_NUMBER}</div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid #272729', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'var(--muted)', fontSize: 12 }}>
            © {currentYear} <strong style={{ color: 'var(--fg)' }}><span style={{ color: 'var(--accent)' }}>wantd</span>.in</strong> · All rights reserved.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: 12 }}>{COMPANY_ADDRESS}</p>
        </div>

      </div>
    </footer>
  )
}

function FooterLink({ href, children }) {
  return (
    <Link href={href} className="footer-link" style={{ fontSize: 13, color: 'var(--muted-high)', textDecoration: 'none', transition: 'color 0.15s' }}>
      {children}
    </Link>
  )
}

function TrustItem({ icon, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
      <span style={{ fontSize: 14 }}>{icon}</span>
      <span style={{ fontSize: 12, color: 'var(--muted-high)', fontWeight: 500 }}>{text}</span>
    </div>
  )
}
