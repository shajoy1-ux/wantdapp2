import { SITE_URL } from './data'

export const defaultMetadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "wantd.in — India's Reverse Electronics Marketplace",
    template: '%s — wantd.in',
  },
  description: "Post what gadget you want. Get competing offers from verified sellers. India's first reverse electronics marketplace. Free to post. First bid in 2 hours.",
  keywords: ['reverse marketplace', 'buy electronics India', 'used phones Bangalore', 'laptop deals', 'sell electronics', 'best price gadgets'],
  authors: [{ name: 'wantd.in' }],
  creator: 'wantd.in',
  publisher: 'wantd.in',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'wantd.in',
    title: "wantd.in — India's Reverse Electronics Marketplace",
    description: "Post what gadget you want. Verified sellers compete with their best price. India's first reverse marketplace for electronics.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'wantd.in — Reverse Electronics Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "wantd.in — India's Reverse Electronics Marketplace",
    description: "Post what you want. Get competing offers from verified sellers.",
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export const pageMetadata = {
  home: {
    title: "wantd.in — Tell Us What You Want. Get Competing Offers.",
    description: "India's first reverse electronics marketplace. Post what gadget you want, verified sellers compete to give you the best price. Free to post. First bid in 2 hours.",
  },
  browse: {
    title: "Browse Buyer Requests",
    description: "Browse active buyer requests for electronics across Bangalore. Submit competitive offers and win deals. Join 4,800+ verified sellers on wantd.in.",
  },
  post: {
    title: "Post a Requirement",
    description: "Post your electronics requirement on wantd.in. Describe what you want, set your budget, and receive competitive bids from verified sellers within hours.",
  },
  feed: {
    title: "Public Want Feed",
    description: "See what electronics people in Bangalore are looking for right now. Share with sellers or help someone find their deal.",
  },
  about: {
    title: "About wantd.in",
    description: "Learn about India's first reverse electronics marketplace. Our story, mission, and the team behind wantd.in.",
  },
  contact: {
    title: "Contact Us",
    description: "Get in touch with the wantd.in team. Support, partnerships, and seller onboarding queries.",
  },
  privacy: {
    title: "Privacy Policy",
    description: "wantd.in Privacy Policy — how we collect, use and protect your personal data under India's DPDP Act 2023.",
  },
  terms: {
    title: "Terms of Service",
    description: "wantd.in Terms of Service — rules and guidelines for buyers and sellers on India's reverse electronics marketplace.",
  },
  refund: {
    title: "Return & Refund Policy",
    description: "wantd.in Return and Refund Policy — understand your rights as a buyer or seller on our platform.",
  },
  grievance: {
    title: "Grievance Officer",
    description: "wantd.in Grievance Officer contact details as required under IT Rules 2021.",
  },
}
