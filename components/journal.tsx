'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/reveal'

// No published articles yet, so these editorial cards point to real pages.
// Swap in actual journal posts here once you have them.
const ARTICLES = [
  {
    image: '/images/journal-1.png',
    category: 'Our Story',
    title: 'Built for the space between the city and the wild',
    href: '/our-story',
    alt: '4x4 expedition graphic tee lifestyle shot',
  },
  {
    image: '/images/journal-2.png',
    category: 'Fit Guide',
    title: 'TRAIL, CAMP or RIDGE: finding the fit that suits you',
    href: '/size-guide',
    alt: 'Coastal road trip with Outrider Supply tees',
  },
  {
    image: '/images/journal-3.png',
    category: 'Just Landed',
    title: 'The newest graphic tees, fresh off the line',
    href: '/shop?sort=newest',
    alt: 'Skate Freedom graphic tee lifestyle shot',
  },
]

export function Journal() {
  return (
    <section
      id="journal"
      className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-brand">
            05 — Adventure Journal
          </p>
          <h2 className="max-w-2xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
            Stories from the Field
          </h2>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
        {ARTICLES.map((a, i) => (
          <Reveal
            key={a.title}
            as="div"
            delay={i * 0.08}
            className="group"
          >
            <Link href={a.href} className="block">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={a.image || '/placeholder.svg'}
                  alt={a.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="pt-5">
                <div className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  <span className="text-sand">{a.category}</span>
                  <span className="h-px w-4 bg-border" />
                  <span>Read more</span>
                </div>
                <h3 className="text-pretty text-xl font-medium leading-snug tracking-tight transition-colors group-hover:text-sand md:text-2xl">
                  {a.title}
                </h3>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
