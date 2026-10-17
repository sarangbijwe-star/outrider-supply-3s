import type { Metadata } from 'next'
import Link from 'next/link'
import { PageIntro } from '@/components/page-intro'
import { SizeChartTable } from '@/components/size-chart'
import { FIT_COLLECTIONS } from '@/lib/collections'
import { HOW_TO_MEASURE } from '@/lib/size-guide'

export const metadata: Metadata = {
  title: 'Size & Fit Guide',
  description: 'Find your fit: TRAIL regular fit, CAMP relaxed boxy fit and RIDGE heavyweight oversized fit. Full measurements in inches.',
  alternates: { canonical: '/size-guide' },
}

export default function SizeGuidePage() {
  return (
    <main>
      <PageIntro eyebrow="Support" title="Size & Fit Guide">
        Every Outrider tee comes in one of three fits. Pick the silhouette you like, then use the measurements to
        find your size.
      </PageIntro>

      <div className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10">
        <div className="mb-20 grid grid-cols-1 gap-4 md:grid-cols-3">
          {FIT_COLLECTIONS.map((fit) => (
            <a key={fit.handle} href={`#${fit.handle}`} className="group border border-border p-6 transition-colors hover:border-foreground md:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">{fit.gsm} GSM</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight">{fit.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{fit.fit}</p>
            </a>
          ))}
        </div>

        <div className="space-y-20">
          {FIT_COLLECTIONS.map((fit) => (
            <section key={fit.handle} id={fit.handle} className="scroll-mt-28">
              <SizeChartTable handle={fit.handle} />
              <Link href={`/collections/${fit.handle}`} className="mt-6 inline-block text-xs uppercase tracking-[0.2em] text-sand hover:text-foreground">
                Shop {fit.name} →
              </Link>
            </section>
          ))}
        </div>

        <section className="mt-24 border-t border-border pt-16">
          <h2 className="mb-10 text-3xl font-semibold tracking-tight md:text-4xl">How to measure</h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {HOW_TO_MEASURE.map((m, i) => (
              <div key={m.title}>
                <p className="font-mono text-xs text-primary">0{i + 1}</p>
                <h3 className="mt-2 text-lg font-semibold">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
