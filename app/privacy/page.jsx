import { LegalPage } from '@/components/layout/LegalPage'
import { pageMetadata } from '@/lib/metadata'
import { PRIVACY_EMAIL, COMPANY_ADDRESS, GST_NUMBER } from '@/lib/data'

export const metadata = {
  title: pageMetadata.privacy.title,
  description: pageMetadata.privacy.description,
}

const sections = [
  {
    title: '1. About this Policy',
    body: `This Privacy Policy explains how wantd.in ("we", "us", "our") collects, uses, stores and protects personal information you provide when using our reverse electronics marketplace platform (the "Platform"), in compliance with India's Digital Personal Data Protection (DPDP) Act 2023 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.`,
  },
  {
    title: '2. Information We Collect',
    body: `We collect: (a) Account information — name, email address, and password when you register; (b) Requirement details — product title, description, budget, preferred area, and device condition you submit as a buyer; (c) Contact information — your WhatsApp/mobile number, shared only with verified sellers upon your explicit action; (d) Usage data — pages visited, clicks, search queries, session duration, and device/browser information collected automatically; (e) Transaction data — bid amounts, accepted deals, and payment confirmations.`,
  },
  {
    title: '3. How We Use Your Information',
    body: `We use your data to: match your requirements with relevant verified sellers; send notifications about new bids on your requirements; improve and personalise your experience on the Platform; detect fraud and ensure platform security; comply with legal obligations under Indian law; and send transactional communications such as bid alerts and deal confirmations. We do not use your data for targeted advertising.`,
  },
  {
    title: '4. Information Sharing',
    body: `We do not sell your personal data to any third party. Your phone number is shared exclusively with the specific verified seller whose bid you accept, or when you initiate contact. We may share anonymised, aggregated, non-personally identifiable data with business partners for analytics. We may disclose data to law enforcement if required by a valid court order or government direction.`,
  },
  {
    title: '5. Data Retention',
    body: `We retain your account data for as long as your account remains active. Requirement data is retained for 12 months after a request is closed. You may request complete deletion of your account and associated personal data at any time by emailing ${PRIVACY_EMAIL}. We will process deletion requests within 30 days, except where retention is required by law.`,
  },
  {
    title: '6. Cookies and Tracking',
    body: `We use essential cookies to maintain your login session and preferences. We use analytics cookies (subject to consent) to understand platform usage. We do not use third-party advertising cookies. You may disable non-essential cookies in your browser settings without affecting core platform functionality.`,
  },
  {
    title: '7. Your Rights under DPDP Act 2023',
    body: `Under India's Digital Personal Data Protection Act 2023, you have the right to: (a) access your personal data held by us; (b) correct inaccurate or incomplete personal data; (c) erase your personal data (right to be forgotten), subject to legal retention requirements; (d) withdraw consent for processing at any time; (e) nominate a representative to exercise rights on your behalf in the event of your death or incapacity. To exercise any right, email ${PRIVACY_EMAIL}.`,
  },
  {
    title: '8. Security',
    body: `We implement industry-standard security measures including HTTPS/TLS encryption for all data in transit, bcrypt password hashing, role-based access controls, and regular security audits. Sensitive data such as phone numbers are encrypted at rest. No online platform can guarantee absolute security; we encourage you to use a strong, unique password and keep your credentials safe.`,
  },
  {
    title: "9. Children's Privacy",
    body: `Our Platform is not intended for persons under 18 years of age. We do not knowingly collect personal data from minors. If we become aware that we have collected personal data from a person under 18, we will delete it promptly. If you believe a minor has provided us with personal data, please contact ${PRIVACY_EMAIL}.`,
  },
  {
    title: '10. Changes to this Policy',
    body: `We may update this Privacy Policy from time to time. Material changes will be notified via email to registered users and/or a prominent notice on the Platform at least 7 days before taking effect. Continued use of the Platform after changes constitute acceptance of the revised Policy.`,
  },
  {
    title: '11. Contact & Grievance',
    body: `For all privacy-related queries, concerns, or to exercise your data rights, contact our Privacy Officer at ${PRIVACY_EMAIL} or by post to: Privacy Officer, wantd.in, ${COMPANY_ADDRESS}. We will respond within 30 days. For urgent matters, mark your subject line [URGENT]. ${GST_NUMBER}.`,
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="1 January 2025"
      effectiveDate="1 January 2025"
      intro={`This Privacy Policy explains how wantd.in collects, uses and protects your personal data when you use India's first reverse electronics marketplace, in compliance with the Digital Personal Data Protection (DPDP) Act 2023.`}
      sections={sections}
    />
  )
}
