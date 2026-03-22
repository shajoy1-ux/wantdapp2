import { BrowseClient } from './BrowseClient'
import { pageMetadata } from '@/lib/metadata'

export const metadata = {
  title: pageMetadata.browse.title,
  description: pageMetadata.browse.description,
}

export default function BrowsePage() {
  return <BrowseClient />
}
