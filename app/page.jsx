import { HeroSection } from '@/components/home/HeroSection'
import { HowItWorksSection } from '@/components/home/HowItWorksSection'
import { SocialProofSection } from '@/components/home/SocialProofSection'
import { OfferComparisonSection } from '@/components/offers/OfferComparison'
import { HomeCTA } from '@/components/home/HomeCTA'
import { pageMetadata } from '@/lib/metadata'

export const metadata = {
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <OfferComparisonSection />
      <SocialProofSection />
      <HomeCTA />
    </>
  )
}
