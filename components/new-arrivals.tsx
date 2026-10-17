import { Reveal } from '@/components/reveal'
import { NewArrivalCard } from '@/components/new-arrival-card'
import type { Product } from '@/lib/shopify/types'

export function NewArrivals({ products }: { products: Product[] }) {
  return (
    <section
      id="new-arrivals"
      className="border-t border-border bg-card/30"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <Reveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-brand">
              02 — Just Landed
            </p>
            <h2 className="max-w-2xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
              New Arrivals
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Premium cotton graphic tees in three fits. Wear it from the city
              to the trail and back.
            </p>
          </Reveal>
        </div>

        {products.length ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
            {products.map((p, i) => (
              <NewArrivalCard key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-muted-foreground">New drops are on the way.</p>
        )}
      </div>
    </section>
  )
}
