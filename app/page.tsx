import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { FeaturedCollections } from '@/components/featured-collections'
import { NewArrivals } from '@/components/new-arrivals'
import { BrandStory } from '@/components/brand-story'
import { Lookbook } from '@/components/lookbook'
import { Journal } from '@/components/journal'
import { InstagramFeed } from '@/components/instagram-feed'
import { Newsletter } from '@/components/newsletter'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <FeaturedCollections />
        <NewArrivals />
        <BrandStory />
        <Lookbook />
        <Journal />
        <InstagramFeed />
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  )
}
