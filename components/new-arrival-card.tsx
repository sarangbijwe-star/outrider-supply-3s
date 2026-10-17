'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Eye } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { getProductFit } from '@/lib/collections'
import { formatMoney, shopifyImageUrl } from '@/lib/format'
import type { Product } from '@/lib/shopify/types'

// Homepage product card — reference-site styling, live Shopify data.
export function NewArrivalCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false)
  const colorOption = product.options.find((o) => /colou?r/i.test(o.name))
  const colors = colorOption?.values ?? []
  const [activeColor, setActiveColor] = useState(0)

  // Show the photo of the selected color when the variant has its own image.
  const colorVariant = colorOption
    ? product.variants.find((v) =>
        v.selectedOptions.some((o) => o.name === colorOption.name && o.value === colors[activeColor]?.name),
      )
    : undefined
  const image = colorVariant?.image ?? product.featuredImage
  const fit = getProductFit(product.collections)
  const href = `/products/${product.handle}`
  const tag = !product.availableForSale
    ? 'Sold Out'
    : product.tags.some((t) => t.toLowerCase() === 'new')
      ? 'New'
      : null

  return (
    <Reveal as="div" delay={index * 0.08} className="group flex flex-col">
      <div
        className="relative aspect-[4/5] w-full overflow-hidden bg-muted"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link href={href} aria-label={product.title} className="absolute inset-0">
          {image && (
            <Image
              src={shopifyImageUrl(image.url, 900)}
              alt={image.altText || product.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          )}
        </Link>

        {tag && (
          <span
            className={`pointer-events-none absolute left-4 top-4 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${
              tag === 'New' ? 'bg-sand text-background' : 'bg-background/80 text-foreground'
            }`}
          >
            {tag}
          </span>
        )}

        {/* View product — slides up on hover (desktop) */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 bottom-0 hidden md:block"
            >
              <Link
                href={href}
                className="flex items-center justify-center gap-2 bg-foreground/95 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-background backdrop-blur"
              >
                <Eye className="h-4 w-4" strokeWidth={1.5} />
                View Product
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Link href={href} className="flex items-start justify-between gap-3 pt-4">
        <div className="min-w-0">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {fit ? `${fit.name} · ${fit.gsm} GSM` : 'Graphic Tees'}
          </p>
          <h3 className="text-base font-medium tracking-tight">{product.title}</h3>
        </div>
        <span className="shrink-0 text-base font-medium tabular-nums">
          {formatMoney(product.priceRange.minVariantPrice)}
        </span>
      </Link>

      {/* Color swatches */}
      {colors.length > 0 && (
        <div className="mt-3 flex items-center gap-2">
          {colors.map((c, i) => (
            <button
              key={c.name}
              aria-label={`Show ${c.name}`}
              title={c.name}
              onClick={() => setActiveColor(i)}
              className={`h-4 w-4 rounded-full border transition-all ${
                activeColor === i ? 'ring-1 ring-sand ring-offset-2 ring-offset-background' : 'border-border'
              }`}
              style={{ backgroundColor: c.swatch ?? 'transparent' }}
            />
          ))}
        </div>
      )}
    </Reveal>
  )
}
