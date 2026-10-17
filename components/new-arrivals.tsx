import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { ProductGrid } from '@/components/product/product-card'
import type { Product } from '@/lib/shopify/types'

export function NewArrivals({ products }: { products: Product[] }) {
  return (
    <section id="new-arrivals" className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <Reveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">02 — Just Landed</p>
            <h2 className="max-w-2xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
              New Arrivals
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/shop?sort=newest"
              className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Shop All
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <ProductGrid products={products} />
      </div>
    </section>
  )
}
