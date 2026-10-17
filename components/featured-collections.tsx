import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { FIT_COLLECTIONS } from '@/lib/collections'
import { shopifyImageUrl } from '@/lib/format'
import type { Collection } from '@/lib/shopify/types'

export function FeaturedCollections({ collections }: { collections: Collection[] }) {
  return (
    <section id="collections" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
      <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">01 — Shop by Fit</p>
          <h2 className="max-w-2xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
            Three Fits. One Standard.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Shop All
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {FIT_COLLECTIONS.map((fit, i) => {
          const shopify = collections.find((c) => c.handle === fit.handle)
          const src = shopify?.image ? shopifyImageUrl(shopify.image.url, 1200) : fit.image
          return (
            <Reveal key={fit.handle} as="figure" delay={i * 0.08} className="group relative overflow-hidden">
              <Link href={`/collections/${fit.handle}`} className="block">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                  <Image
                    src={src}
                    alt={`${fit.name} collection — ${fit.fit}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
                  <div>
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-sand">
                      {fit.fit} · {fit.gsm} GSM
                    </p>
                    <h3 className="text-4xl font-semibold tracking-tight md:text-5xl">{fit.name}</h3>
                    <p className="mt-2 text-sm text-stone">{fit.tagline}</p>
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
