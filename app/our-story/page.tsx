import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/reveal'
import { FIT_COLLECTIONS } from '@/lib/collections'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Outrider Supply is a premium American outdoor-inspired menswear brand. Beyond Limits.',
  alternates: { canonical: '/our-story' },
}

// TODO: personalise this copy with your own founder story.
export default function OurStoryPage() {
  return (
    <main>
      <section className="relative h-[85svh] w-full overflow-hidden">
        <Image src="/images/lookbook-1.png" alt="Walking through a misty pine forest" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-16 md:px-10 md:pb-24">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-sand">Our Story</p>
          <h1 className="max-w-5xl text-balance text-6xl font-semibold leading-[0.9] tracking-tight md:text-8xl">
            Made for the space between the city and the wild.
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">01 — Why we started</p>
        </Reveal>
        <Reveal delay={0.05} className="space-y-6 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl lg:col-span-8">
          <p className="text-2xl leading-snug tracking-tight text-foreground md:text-4xl">
            {SITE.name} was built on a simple idea: the clothes you wear every day should be ready for wherever the day goes.
          </p>
          <p>
            We grew up on road trips, trailheads and long drives with the windows down. We wanted tees with the weight,
            fit and character of real outdoor gear — without giving up the clean lines we wear in the city.
          </p>
          <p>
            So we started with the essential: the T-shirt. Three fits, three fabric weights, and graphics inspired by
            the American outdoors. No noise, no shortcuts — just pieces built to be worn hard and often.
          </p>
        </Reveal>
      </section>

      <section className="border-y border-border bg-card/30">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-px bg-border md:grid-cols-3">
          {FIT_COLLECTIONS.map((fit) => (
            <Link key={fit.handle} href={`/collections/${fit.handle}`} className="group bg-background p-8 md:p-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">{fit.gsm} GSM</p>
              <p className="mt-4 text-5xl font-semibold tracking-tight transition-colors group-hover:text-sand">{fit.name}</p>
              <p className="mt-2 text-muted-foreground">{fit.fit}</p>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{fit.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-24 text-center md:px-10 md:py-36">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-sand">{SITE.tagline}</p>
        <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tight md:text-6xl">Explore more. Worry less.</h2>
        <Link
          href="/shop"
          className="mt-10 inline-block bg-foreground px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-background transition-colors hover:bg-sand"
        >
          Shop the Collection
        </Link>
      </section>
    </main>
  )
}
