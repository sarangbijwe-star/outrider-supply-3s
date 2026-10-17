import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductDetail } from '@/components/product/product-detail'
import { ProductGrid } from '@/components/product/product-card'
import { SizeChartTable } from '@/components/size-chart'
import { getProductFit } from '@/lib/collections'
import { getProduct, getProductRecommendations } from '@/lib/shopify'
import { SITE } from '@/lib/site'

type Props = { params: Promise<{ handle: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)
  if (!product) return {}
  const image = product.featuredImage
  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description.slice(0, 160),
    alternates: { canonical: `/products/${product.handle}` },
    openGraph: {
      type: 'website',
      images: image ? [{ url: image.url, width: image.width ?? undefined, height: image.height ?? undefined, alt: image.altText ?? product.title }] : undefined,
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params
  const product = await getProduct(handle)
  if (!product) notFound()

  const fit = getProductFit(product.collections)
  const recommendations = await getProductRecommendations(product)

  // Structured data so Google can show price & availability in search results.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProductGroup',
    name: product.title,
    description: product.description,
    url: `${SITE.url}/products/${product.handle}`,
    brand: { '@type': 'Brand', name: SITE.name },
    image: product.images.map((i) => i.url),
    productGroupID: product.id,
    hasVariant: product.variants.map((v) => ({
      '@type': 'Product',
      name: `${product.title} — ${v.title}`,
      sku: v.id,
      image: v.image?.url,
      offers: {
        '@type': 'Offer',
        price: v.price.amount,
        priceCurrency: v.price.currencyCode,
        availability: v.availableForSale ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        url: `${SITE.url}/products/${product.handle}`,
      },
    })),
  }

  return (
    <main className="pt-24 md:pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1600px] px-5 pb-6 md:px-10">
        <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <li><Link href="/shop" className="hover:text-foreground">Shop</Link></li>
          {fit && (
            <>
              <li aria-hidden>/</li>
              <li><Link href={`/collections/${fit.handle}`} className="hover:text-foreground">{fit.name}</Link></li>
            </>
          )}
          <li aria-hidden>/</li>
          <li className="text-foreground">{product.title}</li>
        </ol>
      </nav>

      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <ProductDetail
          product={product}
          fit={fit}
          sizeChart={fit ? <SizeChartTable handle={fit.handle} /> : undefined}
          shippingNote={
            <p className="text-sm leading-relaxed text-muted-foreground">
              Ships from the USA. Free US shipping on orders over ${SITE.freeShippingThreshold}. Easy returns within{' '}
              {SITE.returnDays} days on unworn items.{' '}
              <Link href="/shipping-returns" className="text-foreground underline underline-offset-4">
                Full policy
              </Link>
            </p>
          }
        />
      </div>

      {recommendations.length > 0 && (
        <section className="mt-24 border-t border-border bg-card/30 md:mt-32">
          <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
            <h2 className="mb-12 text-4xl font-semibold tracking-tight md:text-5xl">You May Also Like</h2>
            <ProductGrid products={recommendations} />
          </div>
        </section>
      )}
    </main>
  )
}
