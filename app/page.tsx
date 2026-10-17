import { Hero } from '@/components/hero'
import { FeaturedCollections } from '@/components/featured-collections'
import { NewArrivals } from '@/components/new-arrivals'
import { BrandStory } from '@/components/brand-story'
import { Lookbook } from '@/components/lookbook'
import { Journal } from '@/components/journal'
import { InstagramFeed } from '@/components/instagram-feed'
import { Newsletter } from '@/components/newsletter'
import { FIT_COLLECTIONS } from '@/lib/collections'
import { getCollectionProducts, getCollections, getProducts } from '@/lib/shopify'

export default async function Page() {
  const [allProducts, collections, ...fitProducts] = await Promise.all([
    getProducts({ sort: 'newest' }),
    getCollections(),
    ...FIT_COLLECTIONS.map((c) => getCollectionProducts(c.handle)),
  ])

  // Live product counts for the collection cards.
  const counts: Record<string, number> = { all: allProducts.length }
  FIT_COLLECTIONS.forEach((c, i) => (counts[c.handle] = fitProducts[i].length))

  return (
    <main>
      <Hero />
      <FeaturedCollections collections={collections} counts={counts} />
      <NewArrivals products={allProducts.slice(0, 4)} />
      <BrandStory />
      <Lookbook />
      <Journal />
      <InstagramFeed />
      <Newsletter />
    </main>
  )
}
