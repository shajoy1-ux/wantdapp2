import { SITE_URL, COMPANY_EMAIL, COMPANY_ADDRESS } from '@/lib/data'

export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'wantd.in',
    alternateName: "India's Reverse Electronics Marketplace",
    url: SITE_URL,
    description: "Post what gadget you want. Get competing offers from verified sellers. India's first reverse electronics marketplace.",
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/browse?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'wantd.in',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      email: COMPANY_EMAIL,
      contactType: 'customer support',
      availableLanguage: ['English', 'Hindi', 'Kannada'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
    </>
  )
}
