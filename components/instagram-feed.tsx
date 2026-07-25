'use client'

import Image from 'next/image'
import { AtSign, Camera } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const FEED = [
  { src: '/images/ig-1.png', alt: 'Outdoor streetwear detail on city street', tall: false },
  { src: '/images/ig-6.png', alt: 'Dramatic mountain peak in fog', tall: true },
  { src: '/images/ig-2.png', alt: 'Model against rugged rock', tall: false },
  { src: '/images/ig-3.png', alt: 'Flat lay of folded streetwear', tall: false },
  { src: '/images/ig-5.png', alt: 'Model walking through foggy urban environment', tall: true },
  { src: '/images/ig-4.png', alt: 'Close detail of technical jacket fabric', tall: false },
]

export function InstagramFeed() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <Reveal className="mb-12 flex flex-col items-center gap-4 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            06 — Community
          </p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            @outridersupply
          </h2>
          <a
            href="#"
            className="mt-2 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <AtSign className="h-4 w-4" strokeWidth={1.5} />
            Follow the journey
          </a>
        </Reveal>

        <div className="columns-2 gap-3 md:columns-3 lg:columns-6 [&>figure]:mb-3">
          {FEED.map((item, i) => (
            <Reveal
              key={item.src}
              as="figure"
              delay={(i % 6) * 0.05}
              className="group relative block break-inside-avoid overflow-hidden"
            >
              <div
                className={`relative w-full ${
                  item.tall ? 'aspect-[3/4]' : 'aspect-square'
                }`}
              >
                <Image
                  src={item.src || '/placeholder.svg'}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <Camera
                    className="h-6 w-6 text-foreground"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
