import { SITE_URL } from '@/lib/data'

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/my-bids', '/submit-bid', '/auth'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
