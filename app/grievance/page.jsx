import Link from 'next/link'
import { pageMetadata } from '@/lib/metadata'
import { GRIEVANCE_EMAIL, COMPANY_PHONE, COMPANY_ADDRESS } from '@/lib/data'

export const metadata = {
  title: pageMetadata.grievance.title,
  description: pageMetadata.grievance.description,
}

export default function GrievancePage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: 'clamp(40px, 6vw, 72px) 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>

        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--muted)', textDecoration: 'none', marginBottom: 28 }}>
          ← Back to home
        </Link>

        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Legal</div>
        <h1 style={{ fontWeight: 900, fontSize: 'clamp(28px, 5vw, 42px)', color: 'var(--fg)', marginBottom: 10 }}>Grievance Officer</h1>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 40 }}>
          As required under Rule 3(11) of the IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021
        </p>

        {/* Grievance officer card */}
        <div style={{ background: 'var(--surface)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 20, padding: 28, marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
            Designated Grievance Officer
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              ['Name', 'Founder & CEO, wantd.in'],
              ['Designation', 'Grievance Officer'],
              ['Email', GRIEVANCE_EMAIL],
              ['Phone', `${COMPANY_PHONE} (Mon–Fri, 10am–6pm IST)`],
              ['Address', `wantd.in, ${COMPANY_ADDRESS}`],
            ].map(([label, val], i, arr) => (
              <div key={label} style={{ display: 'flex', gap: 20, borderBottom: i < arr.length - 1 ? '1px solid #272729' : 'none', paddingBottom: 14, marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', minWidth: 110, flexShrink: 0 }}>{label}</div>
                <div style={{ fontSize: 14, color: 'var(--fg)' }}>
                  {label === 'Email'
                    ? <a href={`mailto:${val}`} style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>{val}</a>
                    : val}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to file */}
        <div style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 18, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontWeight: 700, fontSize: 20, color: 'var(--fg)', marginBottom: 20 }}>How to File a Grievance</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              {
                n: '1', title: 'Send your complaint',
                desc: `Email ${GRIEVANCE_EMAIL} with your registered email address, a clear description of the issue, and any relevant transaction IDs, order numbers, or screenshots.`,
              },
              {
                n: '2', title: 'Acknowledgement',
                desc: 'We will acknowledge your complaint within 24 hours and provide a unique reference number for tracking the status of your grievance.',
              },
              {
                n: '3', title: 'Resolution',
                desc: 'All grievances will be addressed within 15 days of receipt, as mandated by IT Rules 2021. Complex disputes may require up to 30 days. We will keep you informed of progress throughout.',
              },
            ].map((step) => (
              <div key={step.n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,85,0,0.1)', border: '1px solid rgba(255,85,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 15, color: 'var(--accent)', flexShrink: 0 }}>
                  {step.n}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--fg)', marginBottom: 5 }}>{step.title}</div>
                  <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Urgent notice */}
        <div style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 12, padding: '14px 18px', marginBottom: 24, fontSize: 13, color: '#60a5fa', lineHeight: 1.7 }}>
          For urgent safety issues or content that violates Indian law, mark your email subject line as <strong>[URGENT]</strong> and we will respond within 24 hours.
        </div>

        {/* Escalation */}
        <div style={{ background: 'var(--surface)', border: '1px solid #272729', borderRadius: 14, padding: '18px 22px', fontSize: 14, color: 'var(--muted-high)', lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--fg)', display: 'block', marginBottom: 8 }}>Further Escalation</strong>
          If your grievance is not resolved to your satisfaction within the stated timeframe, you may approach the District Consumer Disputes Redressal Commission under the Consumer Protection Act, 2019, or the Adjudicating Officer under the Information Technology Act, 2000, having jurisdiction over Bangalore, Karnataka.
        </div>

        {/* Legal links */}
        <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #272729', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {[['Privacy Policy', '/privacy'], ['Terms of Service', '/terms'], ['Return & Refund', '/refund']].map(([label, href]) => (
            <Link key={href} href={href} style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>{label}</Link>
          ))}
        </div>

      </div>
    </div>
  )
}
