import { WantFeedClient } from './WantFeedClient'
import { pageMetadata } from '@/lib/metadata'
import { INITIAL_REQUESTS } from '@/lib/data'

export const metadata = {
  title: pageMetadata.feed.title,
  description: pageMetadata.feed.description,
  openGraph: {
    title: 'Public Want Feed — wantd.in',
    description: 'See what electronics Bangalore is hunting for right now. Help a buyer find their deal.',
    type: 'website',
  },
}

// Server component fetches data for SEO / initial render
export default function FeedPage() {
  // In production: fetch from DB. Here we pass static data as seed.
  const publicRequests = INITIAL_REQUESTS.map((r) => ({
    ...r,
    phone: undefined, // never expose phone on public feed
  }))

  return <WantFeedClient initialRequests={publicRequests} />
}
