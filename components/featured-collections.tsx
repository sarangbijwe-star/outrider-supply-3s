'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const COLLECTIONS = [
  {
    name: 'Graphic Tees',
    count: '32 Pieces',
    image: '/images/collection-graphic-tees.png',
    span: 'md:col-span-2',
    ratio: 'aspect-[16/10]',
  },
  {
    name: 'Cargo Collection',
    count: '18 Pieces',
    image: '/images/collection-cargo.png',
    span: 'md:col-span-1',
    ratio: 'aspect-[3/4]',
  },
  {
    name: 'Hoodies',
    count: '16 Pieces',
    image: '/images/collection-hoodies.png',
    span: 'md:col-span-1',
    ratio: 'aspect-[3/4]',
  },
  {
    name: 'Denim',
    count: '21 Pieces',
    image: '/images/collection-denim.png',
    span: 'md:col-span-2',
    ratio: 'aspect-[16/10]',
  },
]

export function FeaturedCollections() {
  return (
    <section
      id="collections"
      className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            01 — Shop by Category
          </p>
          <h2 className="max-w-2xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
            Featured Collections
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <a
            href="#new-arrivals"
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            View All
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {COLLECTIONS.map((c, i) => (
          <Reveal
            key={c.name}
            as="figure"
            delay={i * 0.08}
            className={`group relative cursor-pointer overflow-hidden ${c.span}`}
          >
            <div className={`relative ${c.ratio} w-full overflow-hidden`}>
              <Image
                src={c.image || '/placeholder.svg'}
                alt={`${c.name} collection`}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
              <div>
                <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.3em] text-stone">
                  {c.count}
                </p>
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {c.name}
                </h3>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/30 backdrop-blur-sm transition-all duration-300 group-hover:border-sand group-hover:bg-sand group-hover:text-background">
                <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} />
              </span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
