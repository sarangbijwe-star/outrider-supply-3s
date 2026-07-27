'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const overlay = useTransform(scrollYProgress, [0, 1], [0.55, 0.85])

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[100svh] w-full overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div style={{ y }} className="absolute inset-0 h-[120%]">
        <Image
          src="/images/hero.png"
          alt="Model wearing the Explore Further forest-green graphic tee beside an alpine lake"
          fill
          priority
          className="object-cover object-[center_20%] md:object-[70%_20%]"
        />
      </motion.div>
      <motion.div
        style={{ opacity: overlay }}
        className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-background/10"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-16 md:px-10 md:pb-24 md:pr-[42%]">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-sand"
        >
          Fall Collection — Utility & Graphics
        </motion.p>

        <h1 className="max-w-5xl text-balance text-[16vw] font-semibold leading-[0.85] tracking-tight text-foreground md:text-[10vw] lg:text-[9rem]">
          {'Beyond Limits.'.split(' ').map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.3 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md text-pretty text-base leading-relaxed text-stone md:text-lg">
            Premium streetwear with outdoor DNA — graphic tees, cargo, and
            heavyweight essentials made for the modern explorer.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#collections"
              className="group inline-flex items-center gap-3 bg-foreground px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-background transition-colors hover:bg-sand"
            >
              Shop Collection
            </a>
            <a
              href="#story"
              className="inline-flex items-center gap-3 border border-border px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-foreground"
            >
              Our Story
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  )
}
