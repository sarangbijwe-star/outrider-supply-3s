import type { Metadata } from 'next'
import { PageIntro } from '@/components/page-intro'
import { CollectionNav } from '@/components/product/collection-nav'
import { ProductGrid } from '@/components/product/product-card'
import { getProducts } from '@/lib/shopify'
import { parseSort } from '@/lib/sort'

export const metadata: Metadata = {
  title: 'Shop All Tees',
  description:
    'Shop every Outrider Supply tee — TRAIL regular fit, CAMP boxy fit and RIDGE heavyweight oversized. Premium cotton, $20–$45.',
  alternates: { canonical: '/shop' },
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ sort?: string }> }) {
  const { sort } = await searchParams
  const products = await getProducts({ sort: parseSort(sort) })

  return (
    <main>
      <PageIntro eyebrow="Shop All" title="The Full Lineup">
        Three fits, one standard. Premium cotton tees designed for the space between the city and the wild.
      </PageIntro>
      <CollectionNav active="/shop" count={products.length} />
      <div className="mx-auto max-w-[1600px] px-5 py-12 md:px-10 md:py-16">
        <ProductGrid products={products} />
      </div>
    </main>
  )
}
