import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/reveal'
import { getProductFit } from '@/lib/collections'
import { formatMoney, shopifyImageUrl } from '@/lib/format'
import type { Product } from '@/lib/shopify/types'

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const fit = getProductFit(product.collections)
  const [primary, secondary] = product.images.length ? product.images : [product.featuredImage]
  const colors = product.options.find((o) => /colou?r/i.test(o.name))?.values ?? []
  const min = product.priceRange.minVariantPrice
  const max = product.priceRange.maxVariantPrice
  const compareAt = product.variants.find((v) => v.compareAtPrice)?.compareAtPrice

  return (
    <Reveal as="div" delay={(index % 4) * 0.06} className="group flex flex-col">
      <Link href={`/products/${product.handle}`} className="flex flex-col">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
          {primary && (
            <Image
              src={shopifyImageUrl(primary.url, 900)}
              alt={primary.altText || product.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                secondary ? 'group-hover:opacity-0' : ''
              }`}
            />
          )}
          {secondary && (
            <Image
              src={shopifyImageUrl(secondary.url, 900)}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}
          {!product.availableForSale ? (
            <span className="absolute left-3 top-3 bg-background/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
              Sold Out
            </span>
          ) : compareAt ? (
            <span className="absolute left-3 top-3 bg-sand px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-background">
              Sale
            </span>
          ) : null}
        </div>

        <div className="flex items-start justify-between gap-3 pt-4">
          <div className="min-w-0">
            {fit && (
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {fit.name} · {fit.gsm} GSM
              </p>
            )}
            <h3 className="text-sm font-medium tracking-tight md:text-base">{product.title}</h3>
          </div>
          <span className="shrink-0 text-sm font-medium tabular-nums md:text-base">
            {min.amount !== max.amount && 'From '}
            {formatMoney(min)}
          </span>
        </div>
      </Link>

      {colors.length > 1 && (
        <div className="mt-3 flex items-center gap-2" aria-label={`${colors.length} colors`}>
          {colors.slice(0, 5).map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="h-3.5 w-3.5 rounded-full border border-border"
              style={{ backgroundColor: c.swatch ?? 'transparent' }}
            />
          ))}
          {colors.length > 5 && <span className="text-xs text-muted-foreground">+{colors.length - 5}</span>}
        </div>
      )}
    </Reveal>
  )
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <p className="py-24 text-center text-muted-foreground">
        No products here yet. Check back soon — new drops are on the way.
      </p>
    )
  }
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  )
}
