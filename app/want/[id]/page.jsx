import { INITIAL_REQUESTS } from '@/lib/data'
import { WantDetailClient } from './WantDetailClient'

export async function generateMetadata({ params }) {
  const req = INITIAL_REQUESTS.find((r) => String(r.id) === params.id)
  if (!req) return { title: 'Want not found — wantd.in' }
  return {
    title: `${req.title} — ₹${req.budget.toLocaleString('en-IN')} in ${req.area} | wantd.in`,
    description: `Someone in ${req.area} is looking for ${req.title} with a budget of ₹${req.budget.toLocaleString('en-IN')}. ${req.bids} sellers have already submitted offers. Submit your best offer on wantd.in.`,
    openGraph: {
      title: `${req.title} — ₹${req.budget.toLocaleString('en-IN')}`,
      description: req.desc,
    },
  }
}

export default function WantDetailPage({ params }) {
  return <WantDetailClient id={params.id} />
}
