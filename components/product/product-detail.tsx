'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Minus, Plus, Ruler, X } from 'lucide-react'
import { useCart } from '@/components/cart/cart-context'
import { formatMoney, shopifyImageUrl } from '@/lib/format'
import type { FitCollection } from '@/lib/collections'
import type { Product, ProductVariant } from '@/lib/shopify/types'

type Selection = Record<string, string>

const matches = (v: ProductVariant, sel: Selection) =>
  v.selectedOptions.every((o) => sel[o.name] === undefined || sel[o.name] === o.value)

export function ProductDetail({
  product,
  fit,
  sizeChart,
  shippingNote,
}: {
  product: Product
  fit?: FitCollection
  sizeChart?: ReactNode
  shippingNote: ReactNode
}) {
  const { add, isPending } = useCart()
  const initial = product.variants.find((v) => v.availableForSale) ?? product.variants[0]
  const [selection, setSelection] = useState<Selection>(() =>
    Object.fromEntries(initial?.selectedOptions.map((o) => [o.name, o.value]) ?? []),
  )
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [sizeOpen, setSizeOpen] = useState(false)

  const variant = product.variants.find((v) => matches(v, selection) && v.selectedOptions.length === Object.keys(selection).length)
  const visibleOptions = product.options.filter(
    (o) => !(o.values.length === 1 && o.values[0].name === 'Default Title'),
  )

  // Gallery: put the selected variant's image first if it isn't already shown.
  const images = useMemo(() => {
    const list = product.images.length ? product.images : product.featuredImage ? [product.featuredImage] : []
    return list
  }, [product])
  const variantImageIndex = variant?.image ? images.findIndex((i) => i.url === variant.image!.url) : -1
  const [activeImage, setActiveImage] = useState(Math.max(0, variantImageIndex))

  function choose(name: string, value: string) {
    const next = { ...selection, [name]: value }
    // If that exact combination doesn't exist, keep the new choice and pick the
    // closest available values for the other options.
    if (!product.variants.some((v) => matches(v, next))) {
      const fallback =
        product.variants.find((v) => v.availableForSale && v.selectedOptions.some((o) => o.name === name && o.value === value)) ??
        product.variants.find((v) => v.selectedOptions.some((o) => o.name === name && o.value === value))
      fallback?.selectedOptions.forEach((o) => (next[o.name] = o.value))
    }
    setSelection(next)
    const v = product.variants.find((pv) => matches(pv, next))
    const idx = v?.image ? images.findIndex((i) => i.url === v.image!.url) : -1
    if (idx >= 0) setActiveImage(idx)
  }

  function isAvailable(name: string, value: string) {
    const test = { ...selection, [name]: value }
    return product.variants.some((v) => matches(v, test) && v.availableForSale)
  }

  async function handleAdd() {
    if (!variant?.availableForSale) return
    const ok = await add(variant.id, quantity)
    if (ok) {
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    }
  }

  const price = variant?.price ?? product.priceRange.minVariantPrice
  const compareAt = variant?.compareAtPrice
  const current = images[activeImage]

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
      {/* Gallery */}
      <div className="lg:col-span-7">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
          {current && (
            <Image
              key={current.url}
              src={shopifyImageUrl(current.url, 1600)}
              alt={current.altText || product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
          )}
        </div>
        {images.length > 1 && (
          <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={img.url}
                aria-label={`Show image ${i + 1}`}
                onClick={() => setActiveImage(i)}
                className={`relative aspect-[4/5] w-20 shrink-0 overflow-hidden bg-muted transition-opacity md:w-24 ${
                  i === activeImage ? 'ring-1 ring-sand' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image src={shopifyImageUrl(img.url, 300)} alt="" fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          {fit && (
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">
              {fit.name} — {fit.fit} · {fit.gsm} GSM
            </p>
          )}
          <h1 className="text-balance text-4xl font-semibold leading-[1.02] tracking-tight md:text-5xl">
            {product.title}
          </h1>
          <div className="mt-5 flex items-baseline gap-3 text-xl tabular-nums">
            <span>{formatMoney(price)}</span>
            {compareAt && Number(compareAt.amount) > Number(price.amount) && (
              <span className="text-base text-muted-foreground line-through">{formatMoney(compareAt)}</span>
            )}
          </div>

          <div className="mt-10 space-y-8">
            {visibleOptions.map((option) => {
              const isColor = /colou?r/i.test(option.name)
              const isSize = /size/i.test(option.name)
              return (
                <fieldset key={option.name}>
                  <div className="mb-3 flex items-center justify-between">
                    <legend className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {option.name}: <span className="text-foreground">{selection[option.name]}</span>
                    </legend>
                    {isSize && sizeChart && (
                      <button
                        type="button"
                        onClick={() => setSizeOpen(true)}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                      >
                        <Ruler className="h-3.5 w-3.5" strokeWidth={1.5} />
                        Size Guide
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => {
                      const selected = selection[option.name] === value.name
                      const available = isAvailable(option.name, value.name)
                      if (isColor && value.swatch) {
                        return (
                          <button
                            key={value.name}
                            type="button"
                            aria-label={`${value.name}${available ? '' : ' (sold out)'}`}
                            aria-pressed={selected}
                            title={value.name}
                            onClick={() => choose(option.name, value.name)}
                            className={`relative h-9 w-9 rounded-full border border-border transition-all ${
                              selected ? 'ring-1 ring-sand ring-offset-2 ring-offset-background' : ''
                            } ${available ? '' : 'opacity-40'}`}
                            style={{ backgroundColor: value.swatch }}
                          />
                        )
                      }
                      return (
                        <button
                          key={value.name}
                          type="button"
                          aria-pressed={selected}
                          aria-label={`${value.name}${available ? '' : ' (sold out)'}`}
                          onClick={() => choose(option.name, value.name)}
                          className={`min-w-14 border px-4 py-3 text-sm transition-colors ${
                            selected
                              ? 'border-foreground bg-foreground text-background'
                              : 'border-border hover:border-foreground'
                          } ${available ? '' : 'text-muted-foreground line-through decoration-1'}`}
                        >
                          {value.name}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>
              )
            })}
          </div>

          <div className="mt-10 flex gap-3">
            <div className="flex items-center border border-border">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-full w-11 items-center justify-center hover:bg-muted"
              >
                <Minus className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <span className="w-8 text-center tabular-nums">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                className="flex h-full w-11 items-center justify-center hover:bg-muted"
              >
                <Plus className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              disabled={!variant?.availableForSale || isPending}
              className="flex flex-1 items-center justify-center gap-2 bg-foreground px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-background transition-colors hover:bg-sand disabled:cursor-not-allowed disabled:bg-foreground/30"
            >
              {!variant ? (
                'Unavailable'
              ) : !variant.availableForSale ? (
                'Sold Out'
              ) : added ? (
                <>
                  <Check className="h-4 w-4" /> Added
                </>
              ) : isPending ? (
                'Adding…'
              ) : (
                'Add to Bag'
              )}
            </button>
          </div>

          <div className="mt-10 divide-y divide-border border-y border-border">
            <Details title="Description" defaultOpen>
              <div
                className="prose-sm space-y-3 text-sm leading-relaxed text-muted-foreground [&_a]:underline [&_li]:ml-4 [&_ul]:list-disc"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
              />
            </Details>
            {fit && (
              <Details title="Fit & Fabric">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {fit.details.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span className="mt-2 h-px w-3 shrink-0 bg-sand" />
                      {d}
                    </li>
                  ))}
                </ul>
              </Details>
            )}
            <Details title="Shipping & Returns">{shippingNote}</Details>
          </div>
        </div>
      </div>

      {/* Size guide modal */}
      <AnimatePresence>
        {sizeOpen && sizeChart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSizeOpen(false)}
            className="fixed inset-0 z-[90] flex items-end justify-center bg-background/80 backdrop-blur-sm md:items-center md:p-8"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Size guide"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto border border-border bg-background p-6 md:p-10"
            >
              <button
                aria-label="Close size guide"
                onClick={() => setSizeOpen(false)}
                className="absolute right-4 top-4 hover:text-sand"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
              {sizeChart}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Details({ title, children, defaultOpen }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <details open={defaultOpen} className="group py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] [&::-webkit-details-marker]:hidden">
        {title}
        <Plus className="h-4 w-4 transition-transform group-open:rotate-45" strokeWidth={1.5} />
      </summary>
      <div className="pt-4">{children}</div>
    </details>
  )
}
