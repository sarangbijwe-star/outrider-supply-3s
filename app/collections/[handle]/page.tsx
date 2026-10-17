import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { CollectionNav } from '@/components/product/collection-nav'
import { ProductGrid } from '@/components/product/product-card'
import { FIT_COLLECTIONS, getFitCollection } from '@/lib/collections'
import { shopifyImageUrl } from '@/lib/format'
import { getCollection, getCollectionProducts } from '@/lib/shopify'
import { parseSort } from '@/lib/sort'

type Props = {
  params: Promise<{ handle: string }>
  searchParams: Promise<{ sort?: string }>
}

export function generateStaticParams() {
  return FIT_COLLECTIONS.map((c) => ({ handle: c.handle }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const [collection, fit] = [await getCollection(handle), getFitCollection(handle)]
  if (!collection && !fit) return {}
  const title = collection?.seo.title || (fit ? `${fit.name} — ${fit.fit} Tees` : collection!.title)
  const description = collection?.seo.description || collection?.description || fit?.description
  return {
    title,
    description,
    alternates: { canonical: `/collections/${handle}` },
    openGraph: { images: collection?.image ? [collection.image.url] : fit ? [fit.image] : undefined },
  }
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const { handle } = await params
  const { sort } = await searchParams
  const [collection, products] = await Promise.all([
    getCollection(handle),
    getCollectionProducts(handle, parseSort(sort)),
  ])
  const fit = getFitCollection(handle)
  if (!collection && !fit) notFound()

  const title = fit?.name ?? collection!.title
  const description = collection?.description || fit?.description
  const image = collection?.image ? shopifyImageUrl(collection.image.url, 2000) : fit?.image

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-end gap-10 px-5 pb-12 pt-28 md:px-10 md:pb-16 md:pt-36 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">
              {fit ? `${fit.fit} · ${fit.gsm} GSM Cotton` : 'Collection'}
            </p>
            <h1 className="text-[22vw] font-semibold leading-[0.85] tracking-tight md:text-[12rem]">{title}</h1>
            {fit && <p className="mt-6 text-xl tracking-tight text-sand md:text-2xl">{fit.tagline}</p>}
            {description && (
              <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                {description}
              </p>
            )}
            {fit && (
              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-6">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Fit</dt>
                  <dd className="mt-1 text-sm">{fit.fit.replace(' Fit', '')}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Weight</dt>
                  <dd className="mt-1 text-sm">{fit.gsm} GSM</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Fabric</dt>
                  <dd className="mt-1 text-sm">Cotton</dd>
                </div>
              </dl>
            )}
          </div>
          {image && (
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted lg:col-span-5">
              <Image src={image} alt={`${title} collection`} fill priority sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
            </div>
          )}
        </div>
      </section>

      <CollectionNav active={`/collections/${handle}`} count={products.length} />
      <div className="mx-auto max-w-[1600px] px-5 py-12 md:px-10 md:py-16">
        <ProductGrid products={products} />
      </div>
    </main>
  )
}
