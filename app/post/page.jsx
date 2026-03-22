import { PostClient } from './PostClient'
import { pageMetadata } from '@/lib/metadata'

export const metadata = {
  title: pageMetadata.post.title,
  description: pageMetadata.post.description,
}

export default function PostPage() {
  return <PostClient />
}
