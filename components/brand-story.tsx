'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Reveal } from '@/components/reveal'

export function BrandStory() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="story" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div
          ref={ref}
          className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-[4/5]"
        >
          <motion.div style={{ y }} className="absolute inset-0 h-[116%]">
            <Image
              src="/images/brand-story.png"
              alt="Detail of premium technical outdoor streetwear fabric"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        <div className="lg:pl-6">
          <Reveal>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-primary">
              03 — Our Philosophy
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Built for the space between the city and the wild.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Outrider Supply began with a simple belief — that the clothing you
              wear should never hold you back. We design heavyweight essentials
              with an outdoor spirit, made to move from morning commutes to
              mountain trails.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-border pt-10 md:max-w-md">
              <div>
                <p className="text-4xl font-semibold tracking-tight md:text-5xl">
                  3
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Fits — Trail, Camp, Ridge
                </p>
              </div>
              <div>
                <p className="text-4xl font-semibold tracking-tight md:text-5xl">
                  240
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  GSM heavyweight cotton
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              href="/our-story"
              className="mt-12 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground"
            >
              <span className="h-px w-10 bg-sand" />
              Read our story
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
