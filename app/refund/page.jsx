import { LegalPage } from '@/components/layout/LegalPage'
import { pageMetadata } from '@/lib/metadata'
import { SUPPORT_EMAIL, COMPANY_ADDRESS } from '@/lib/data'

export const metadata = {
  title: pageMetadata.refund.title,
  description: pageMetadata.refund.description,
}

const sections = [
  {
    title: '1. Overview',
    body: `wantd.in is a marketplace platform that connects buyers with verified sellers. Transactions (payment, delivery, return) occur directly between buyers and sellers. This policy sets out the principles, responsibilities, and procedures for returns and refunds on the wantd.in Platform.`,
  },
  {
    title: '2. Buyer\'s Right to Return',
    body: `Buyers may initiate a return request within 48 hours of receiving an item if: (a) the item is materially different from the seller's description (wrong model, false condition, missing accessories stated as included); (b) the item is non-functional or damaged in transit and not disclosed prior to sale; (c) the item is found to be counterfeit or not as represented. Buyers must notify the seller and wantd.in support at ${SUPPORT_EMAIL} within 48 hours of receiving the item, with photographic evidence.`,
  },
  {
    title: '3. Items Not Eligible for Return',
    body: `Returns are not accepted for: (a) items where the buyer changes their mind after purchase; (b) minor cosmetic imperfections consistent with the disclosed condition grade; (c) items damaged by the buyer after receipt; (d) items where the buyer fails to notify within the 48-hour window; (e) items sold as "Brand New" sealed box where the seal has been broken by the buyer for inspection purposes.`,
  },
  {
    title: '4. Refund Process',
    body: `Upon a valid return being accepted by the seller or adjudicated by wantd.in: (a) the buyer must return the item in the same condition received, using a trackable courier; (b) the seller must issue a full refund within 5 business days of receiving the returned item; (c) where the seller fails to issue the refund, wantd.in will facilitate refund of the platform-collected portion and support escalation; (d) platform fees are non-refundable once a transaction is completed.`,
  },
  {
    title: '5. Platform Fee Refunds',
    body: `The 2% platform fee charged to sellers is refundable only in cases where the transaction is cancelled before physical transfer of the item, or where a return is granted due to seller misrepresentation. Platform fees are not refundable in cases of buyer's remorse or change of mind. To request a platform fee refund, email ${SUPPORT_EMAIL} within 7 days of the transaction with your transaction ID.`,
  },
  {
    title: '6. Dispute Escalation',
    body: `If a buyer and seller cannot agree on a return/refund within 72 hours of a return request, either party may escalate to wantd.in support at ${SUPPORT_EMAIL}. We will review evidence provided by both parties and make a determination within 10 business days. Our determination is final in the context of the Platform, but does not limit either party's legal rights under Indian consumer law.`,
  },
  {
    title: '7. Consumer Rights',
    body: `Nothing in this policy limits or waives any rights you have under the Consumer Protection Act, 2019 (India) or other applicable Indian law. Buyers may approach the District Consumer Disputes Redressal Commission if dissatisfied with the resolution provided.`,
  },
  {
    title: '8. Contact',
    body: `For all return and refund queries, email ${SUPPORT_EMAIL} with your order/transaction ID, a description of the issue, and supporting photos. Response time: within 24 business hours. Postal address: wantd.in, ${COMPANY_ADDRESS}.`,
  },
]

export default function RefundPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Return & Refund Policy"
      lastUpdated="1 January 2025"
      intro={`This policy explains the return and refund process for transactions made through wantd.in — India's reverse electronics marketplace. We are committed to fair outcomes for buyers and sellers.`}
      sections={sections}
    />
  )
}
