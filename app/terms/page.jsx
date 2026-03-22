import { LegalPage } from '@/components/layout/LegalPage'
import { pageMetadata } from '@/lib/metadata'
import { SUPPORT_EMAIL, COMPANY_ADDRESS, GST_NUMBER } from '@/lib/data'

export const metadata = {
  title: pageMetadata.terms.title,
  description: pageMetadata.terms.description,
}

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing or using wantd.in (the "Platform"), you agree to be bound by these Terms of Service ("Terms") and our Privacy Policy. If you do not agree to these Terms, please do not use the Platform. These Terms constitute a legally binding agreement between you and wantd.in under the laws of India.`,
  },
  {
    title: '2. Platform Description',
    body: `wantd.in is a reverse marketplace that enables buyers to post electronics purchase requirements and receive competitive offers from registered sellers. We facilitate connections between buyers and verified sellers. We are not a party to any transaction between them and do not take title to any goods. Transactions are conducted directly between buyers and sellers.`,
  },
  {
    title: '3. Eligibility',
    body: `You must be at least 18 years of age and legally capable of entering into contracts under Indian law to use the Platform. By using the Platform, you represent and warrant that you meet these requirements. If you are using the Platform on behalf of a business entity, you represent that you are authorised to bind that entity to these Terms.`,
  },
  {
    title: '4. Buyer Obligations',
    body: `As a buyer, you agree to: (a) provide accurate and complete information in your requirements; (b) respond to seller offers in a reasonable and timely manner; (c) not post fraudulent, misleading, or duplicate requirements; (d) not post requirements for illegal, counterfeit, or prohibited goods; (e) honour commitments made when accepting a seller's bid; (f) not attempt to transact outside the Platform to circumvent fees.`,
  },
  {
    title: '5. Seller Obligations',
    body: `As a seller, you agree to: (a) complete our verification process before submitting bids; (b) provide accurate and honest descriptions of items offered; (c) honour confirmed deals and deliver items as described; (d) not misrepresent the condition, authenticity, or specifications of items; (e) maintain a response rate above 60% and a rating above 3.5 stars; (f) not submit bids for items you do not have or cannot source. Verified seller status may be revoked for violations of these obligations.`,
  },
  {
    title: '6. Fees and Payments',
    body: `Posting requirements is free for buyers. Sellers pay a platform fee of 2% (plus applicable GST) on successfully closed deals, with a minimum fee of ₹50 per transaction. The platform fee is deducted automatically via our secure payment gateway. All prices displayed on the Platform are in Indian Rupees (₹). ${GST_NUMBER}.`,
  },
  {
    title: '7. Prohibited Conduct',
    body: `You may not: (a) impersonate any person or entity or misrepresent your affiliation; (b) post spam, unsolicited communications, or misleading listings; (c) attempt to circumvent platform fees by conducting transactions outside the Platform after initial contact through the Platform; (d) upload malicious code, viruses, or any content that interferes with Platform operation; (e) use the Platform to facilitate any illegal activity under Indian law; (f) scrape, crawl, or systematically extract Platform data without written permission; (g) create multiple accounts to circumvent restrictions.`,
  },
  {
    title: '8. Intellectual Property',
    body: `All content on the Platform — including but not limited to the wantd.in name and logo, design, software, and original text — is the intellectual property of wantd.in and is protected under Indian copyright and trademark law. You may not reproduce, distribute, or create derivative works without prior written consent. User-generated content (requirements, bids, reviews) remains the property of the user, but you grant wantd.in a non-exclusive, royalty-free licence to use, display, and distribute such content for Platform operations.`,
  },
  {
    title: '9. Disclaimer of Warranties',
    body: `The Platform is provided "as is" and "as available" without warranties of any kind, express or implied. wantd.in does not warrant that the Platform will be uninterrupted, error-free, or that listings are accurate. We do not verify the quality, safety, legality, or authenticity of items listed by sellers. All transactions are at the buyer's and seller's own risk. Buyers are encouraged to inspect items before completing payment.`,
  },
  {
    title: '10. Limitation of Liability',
    body: `To the maximum extent permitted by Indian law, wantd.in shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the Platform or any transaction between a buyer and seller. Our total liability in any matter shall not exceed the platform fees collected in the relevant transaction.`,
  },
  {
    title: '11. Dispute Resolution',
    body: `In the event of a dispute between a buyer and seller, contact ${SUPPORT_EMAIL} within 7 days of the transaction. We will attempt mediation within 15 business days. If unresolved, disputes shall be subject to arbitration under the Arbitration and Conciliation Act, 1996, with proceedings conducted in Bangalore, Karnataka. These Terms shall be governed by the laws of India.`,
  },
  {
    title: '12. Termination',
    body: `We may suspend or terminate your account at any time if you violate these Terms, engage in fraudulent activity, or for any reason with 7 days' notice. You may close your account at any time by emailing ${SUPPORT_EMAIL}. Termination does not affect any rights or obligations accrued prior to termination.`,
  },
  {
    title: '13. Changes to Terms',
    body: `We may update these Terms at any time. Material changes will be communicated by email and/or a Platform notice at least 7 days before taking effect. Continued use of the Platform after changes constitutes acceptance. If you do not agree to revised Terms, you must stop using the Platform.`,
  },
  {
    title: '14. Contact',
    body: `For questions about these Terms, contact us at ${SUPPORT_EMAIL} or: wantd.in, ${COMPANY_ADDRESS}.`,
  },
]

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      lastUpdated="1 January 2025"
      effectiveDate="1 January 2025"
      intro={`These Terms of Service govern your use of wantd.in — India's reverse electronics marketplace. By using the Platform you agree to be bound by these Terms and our Privacy Policy.`}
      sections={sections}
    />
  )
}
