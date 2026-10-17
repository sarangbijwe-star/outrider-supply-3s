import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { FIT_COLLECTIONS } from '@/lib/collections'
import { shopifyImageUrl } from '@/lib/format'
import type { Collection } from '@/lib/shopify/types'

// Reference layout: a 2-1 / 1-2 grid of four image cards. The three fits fill
// the first three cards and "Shop All" closes the grid. A collection image set
// in Shopify Admin replaces the default photo below.
const CARDS = [
  {
    handle: 'trail',
    href: '/collections/trail',
    image: '/images/collection-graphic-tees.png',
    alt: 'Outrider Supply graphic tees worn across outdoor lifestyle settings',
    span: 'md:col-span-2',
    ratio: 'aspect-[16/10]',
  },
  {
    handle: 'camp',
    href: '/collections/camp',
    image: '/images/collection-cargo.png',
    alt: 'Wayfarer chest-print tee in charcoal',
    span: 'md:col-span-1',
    ratio: 'aspect-[3/4]',
  },
  {
    handle: 'ridge',
    href: '/collections/ridge',
    image: '/images/collection-utility.png',
    alt: 'Badge chest tee in dark grey',
    span: 'md:col-span-1',
    ratio: 'aspect-[3/4]',
  },
  {
    handle: 'all',
    href: '/shop',
    image: '/images/collection-denim.png',
    alt: 'Outrider Supply back-print tees worn on the road',
    span: 'md:col-span-2',
    ratio: 'aspect-[16/10]',
  },
] as const

const pieces = (n: number | undefined) => (n === undefined ? null : `${n} ${n === 1 ? 'Piece' : 'Pieces'}`)

export function FeaturedCollections({
  collections,
  counts,
}: {
  collections: Collection[]
  counts: Record<string, number>
}) {
  return (
    <section
      id="collections"
      className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-brand">
            01 — Shop by Fit
          </p>
          <h2 className="max-w-2xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
            Featured Collections
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            View All
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {CARDS.map((c, i) => {
          const fit = FIT_COLLECTIONS.find((f) => f.handle === c.handle)
          const shopifyImage = collections.find((s) => s.handle === c.handle)?.image
          const name = fit ? fit.name : 'Shop All'
          const detail = fit ? fit.fit : 'Trail · Camp · Ridge'
          const eyebrow = [fit ? `${fit.gsm} GSM` : null, pieces(counts[c.handle])].filter(Boolean).join(' · ')
          return (
            <Reveal
              key={c.handle}
              as="figure"
              delay={i * 0.08}
              className={`group relative overflow-hidden ${c.span}`}
            >
              <Link href={c.href} className="block">
                <div className={`relative ${c.ratio} w-full overflow-hidden`}>
                  <Image
                    src={shopifyImage ? shopifyImageUrl(shopifyImage.url, 1600) : c.image}
                    alt={shopifyImage?.altText || c.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                  <div>
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.3em] text-stone">
                      {eyebrow}
                    </p>
                    <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                      {name}
                    </h3>
                    <p className="mt-1 text-sm text-foreground/80">{detail}</p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-background/30 backdrop-blur-sm transition-all duration-300 group-hover:border-sand group-hover:bg-sand group-hover:text-background">
                    <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                </figcaption>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
