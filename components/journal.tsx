'use client'

import Image from 'next/image'
import { Reveal } from '@/components/reveal'

const ARTICLES = [
  {
    image: '/images/journal-1.png',
    category: 'Field Notes',
    title: 'Three days above the treeline in the Dolomites',
    date: 'Oct 2025',
    alt: 'Misty alpine mountain trail at dawn',
  },
  {
    image: '/images/journal-2.png',
    category: 'On the Road',
    title: 'A slow ride through the high desert at golden hour',
    date: 'Sep 2025',
    alt: 'Vintage motorcycle on an empty desert highway',
  },
  {
    image: '/images/journal-3.png',
    category: 'Craft',
    title: 'How we engineer weather-ready fabric that breathes',
    date: 'Aug 2025',
    alt: 'Minimalist campsite tent beside an alpine lake',
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
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">
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
            as="figure"
            delay={i * 0.08}
            className="group"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={a.image || '/placeholder.svg'}
                alt={a.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <figcaption className="pt-5">
              <div className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                <span className="text-sand">{a.category}</span>
                <span className="h-px w-4 bg-border" />
                <span>{a.date}</span>
              </div>
              <h3 className="text-pretty text-xl font-medium leading-snug tracking-tight transition-colors group-hover:text-sand md:text-2xl">
                {a.title}
              </h3>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
