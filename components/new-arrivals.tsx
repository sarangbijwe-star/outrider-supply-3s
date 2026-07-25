'use client'

import Image from 'next/image'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Eye, Heart } from 'lucide-react'
import { Reveal } from '@/components/reveal'

type Product = {
  id: number
  name: string
  category: string
  price: string
  image: string
  swatches: { name: string; hex: string }[]
  tag?: string
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Ridgeline Anorak',
    category: 'Outerwear',
    price: '$298',
    image: '/images/product-1.png',
    tag: 'New',
    swatches: [
      { name: 'Olive', hex: '#556B2F' },
      { name: 'Charcoal', hex: '#2B2B2B' },
      { name: 'Sand', hex: '#D7C8AA' },
    ],
  },
  {
    id: 2,
    name: 'Basecamp Hoodie',
    category: 'Hoodies',
    price: '$168',
    image: '/images/product-2.png',
    swatches: [
      { name: 'Sand', hex: '#D7C8AA' },
      { name: 'Stone', hex: '#B7B1A1' },
      { name: 'Black', hex: '#111111' },
    ],
  },
  {
    id: 3,
    name: 'Traverse Cargo Pant',
    category: 'Bottoms',
    price: '$210',
    image: '/images/product-3.png',
    tag: 'New',
    swatches: [
      { name: 'Charcoal', hex: '#2B2B2B' },
      { name: 'Olive', hex: '#556B2F' },
    ],
  },
  {
    id: 4,
    name: 'Summit Fleece',
    category: 'Knitwear',
    price: '$184',
    image: '/images/product-4.png',
    swatches: [
      { name: 'Stone', hex: '#B7B1A1' },
      { name: 'Sand', hex: '#D7C8AA' },
      { name: 'Olive', hex: '#556B2F' },
    ],
  },
]

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false)
  const [wished, setWished] = useState(false)
  const [activeSwatch, setActiveSwatch] = useState(0)

  return (
    <Reveal
      as="div"
      delay={index * 0.08}
      className="group flex flex-col"
    >
      <div
        className="relative aspect-[4/5] w-full overflow-hidden bg-muted"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {product.tag && (
          <span className="absolute left-4 top-4 bg-sand px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-background">
            {product.tag}
          </span>
        )}

        <button
          aria-label="Add to wishlist"
          onClick={() => setWished((w) => !w)}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-background/40 backdrop-blur-sm transition-colors hover:bg-background/70"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              wished ? 'fill-sand text-sand' : 'text-foreground'
            }`}
            strokeWidth={1.5}
          />
        </button>

        {/* Quick view */}
        <AnimatePresence>
          {hovered && (
            <motion.button
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 bottom-0 hidden items-center justify-center gap-2 bg-foreground/95 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-background backdrop-blur md:flex"
            >
              <Eye className="h-4 w-4" strokeWidth={1.5} />
              Quick View
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-start justify-between pt-4">
        <div>
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {product.category}
          </p>
          <h3 className="text-base font-medium tracking-tight">
            {product.name}
          </h3>
        </div>
        <span className="text-base font-medium tabular-nums">
          {product.price}
        </span>
      </div>

      {/* Color swatches */}
      <div className="mt-3 flex items-center gap-2">
        {product.swatches.map((s, i) => (
          <button
            key={s.name}
            aria-label={s.name}
            onClick={() => setActiveSwatch(i)}
            className={`h-4 w-4 rounded-full border transition-all ${
              activeSwatch === i
                ? 'ring-1 ring-sand ring-offset-2 ring-offset-background'
                : 'border-border'
            }`}
            style={{ backgroundColor: s.hex }}
          />
        ))}
      </div>
    </Reveal>
  )
}

export function NewArrivals() {
  return (
    <section
      id="new-arrivals"
      className="border-t border-border bg-card/30"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <Reveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">
              02 — Just Landed
            </p>
            <h2 className="max-w-2xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
              New Arrivals
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Engineered fabrics and considered details. Built to move with you,
              wherever the day takes you.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
