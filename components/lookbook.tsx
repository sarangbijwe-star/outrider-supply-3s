'use client'

import Image from 'next/image'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Expand, X } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const SHOTS = [
  {
    src: '/images/lookbook-1.png',
    alt: 'Model in premium streetwear walking through a foggy pine forest',
    label: 'The Forest Edit',
    className: 'md:col-span-5 md:row-span-2 aspect-[3/4]',
  },
  {
    src: '/images/lookbook-2.png',
    alt: 'Two models against a raw concrete urban wall',
    label: 'Concrete & Canvas',
    className: 'md:col-span-7 aspect-[16/10]',
  },
  {
    src: '/images/lookbook-4.png',
    alt: 'Detail crop of technical outerwear with utility straps',
    label: 'Utility in Focus',
    className: 'md:col-span-3 aspect-[3/4]',
  },
  {
    src: '/images/lookbook-3.png',
    alt: 'Model seated on rocky mountain terrain',
    label: 'High Country',
    className: 'md:col-span-4 aspect-[3/4]',
  },
]

export function Lookbook() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section
      id="lookbook"
      className="border-t border-border bg-card/30"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <Reveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">
              04 — AW Editorial
            </p>
            <h2 className="max-w-2xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
              The Lookbook
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              A visual field guide to the season. Shot on location between the
              treeline and the terminal.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          {SHOTS.map((shot, i) => (
            <Reveal
              key={shot.src}
              as="figure"
              delay={i * 0.08}
              className={`group relative overflow-hidden ${shot.className}`}
            >
              <Image
                src={shot.src || '/placeholder.svg'}
                alt={shot.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <button
                aria-label={`Expand ${shot.label}`}
                onClick={() => setActive(shot.src)}
                className="absolute inset-0 flex items-end justify-between p-6"
              >
                <span className="translate-y-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {shot.label}
                </span>
                <span className="flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-background/40 text-foreground opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <Expand className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Fullscreen viewer */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 p-4 backdrop-blur-md md:p-12"
          >
            <button
              aria-label="Close viewer"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground hover:text-background md:right-10 md:top-10"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[80vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active || '/placeholder.svg'}
                alt="Lookbook full view"
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
