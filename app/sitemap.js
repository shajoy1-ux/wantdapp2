import { SITE_URL } from '@/lib/data'

export default function sitemap() {
  const now = new Date().toISOString()

  return [
    { url: SITE_URL,                     lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${SITE_URL}/browse`,         lastModified: now, changeFrequency: 'hourly',  priority: 0.9 },
    { url: `${SITE_URL}/feed`,           lastModified: now, changeFrequency: 'hourly',  priority: 0.9 },
    { url: `${SITE_URL}/post`,           lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/about`,          lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`,        lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/privacy`,        lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE_URL}/terms`,          lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE_URL}/refund`,         lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE_URL}/grievance`,      lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]
}
