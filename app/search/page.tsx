import type { Metadata } from 'next'
import { PageIntro } from '@/components/page-intro'
import { ProductGrid } from '@/components/product/product-card'
import { getProducts } from '@/lib/shopify'

export const metadata: Metadata = {
  title: 'Search',
  robots: { index: false },
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = '' } = await searchParams
  const query = q.trim().slice(0, 100)
  const products = query ? await getProducts({ query, limit: 48 }) : []

  return (
    <main>
      <PageIntro eyebrow="Search" title={query ? `“${query}”` : 'Search'}>
        {query
          ? `${products.length} ${products.length === 1 ? 'result' : 'results'}`
          : 'Use the search icon in the header to find tees, graphics and fits.'}
      </PageIntro>
      {query && (
        <div className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10">
          <ProductGrid products={products} />
        </div>
      )}
    </main>
  )
}
