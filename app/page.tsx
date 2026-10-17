import { Hero } from '@/components/hero'
import { FeaturedCollections } from '@/components/featured-collections'
import { NewArrivals } from '@/components/new-arrivals'
import { BrandStory } from '@/components/brand-story'
import { Lookbook } from '@/components/lookbook'
import { Journal } from '@/components/journal'
import { InstagramFeed } from '@/components/instagram-feed'
import { Newsletter } from '@/components/newsletter'
import { getCollections, getProducts } from '@/lib/shopify'

export default async function Page() {
  const [products, collections] = await Promise.all([
    getProducts({ sort: 'newest', limit: 8 }),
    getCollections(),
  ])

  return (
    <main>
      <Hero />
      <FeaturedCollections collections={collections} />
      <NewArrivals products={products} />
      <BrandStory />
      <Lookbook />
      <Journal />
      <InstagramFeed />
      <Newsletter />
    </main>
  )
}
