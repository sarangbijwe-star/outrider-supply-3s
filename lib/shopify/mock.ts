// Demo catalog used ONLY when Shopify credentials are not set (see .env.example).
// Lets you preview the full shopping experience locally before connecting your
// store. Once SHOPIFY_STORE_DOMAIN + token are set, all data comes from Shopify.

import type { Cart, Collection, Product, ProductVariant, ShopPolicies } from './types'
import { FIT_COLLECTIONS } from '@/lib/collections'

const SIZES = ['S', 'M', 'L', 'XL', 'XXL']

const COLOR_HEX: Record<string, string> = {
  'Vintage Black': '#1f1f1e',
  Charcoal: '#3a3a39',
  Natural: '#e8e0cf',
  'Off-White': '#f1eee6',
  Moss: '#7a8060',
  Sandstone: '#c9b48f',
  'Earth Brown': '#6e5038',
}

type Seed = {
  title: string
  collection: 'trail' | 'camp' | 'ridge'
  price: number
  image: string
  colors: string[]
  soldOut?: string[] // "Color/Size" combos that are sold out
}

const SEEDS: Seed[] = [
  { title: 'Summit Seeker Tee', collection: 'trail', price: 28, image: 'trail-1', colors: ['Off-White', 'Natural'] },
  { title: 'Wild Paths Tee', collection: 'trail', price: 28, image: 'trail-2', colors: ['Natural', 'Sandstone'] },
  { title: 'Pine Trail Tee', collection: 'trail', price: 28, image: 'trail-3', colors: ['Moss', 'Charcoal'] },
  { title: 'Ridge Line Tee', collection: 'trail', price: 28, image: 'trail-4', colors: ['Earth Brown'], soldOut: ['Earth Brown/S'] },
  { title: 'Wayfarer Tee', collection: 'trail', price: 28, image: 'trail-5', colors: ['Charcoal', 'Vintage Black'] },
  { title: 'Adventure Awaits Tee', collection: 'trail', price: 28, image: 'trail-6', colors: ['Natural'] },
  { title: 'Peaks Badge Tee', collection: 'camp', price: 36, image: 'camp-1', colors: ['Off-White', 'Charcoal'] },
  { title: 'Explore Further Tee', collection: 'camp', price: 36, image: 'camp-3', colors: ['Moss'] },
  { title: 'Wilderness Tee', collection: 'camp', price: 36, image: 'camp-2', colors: ['Vintage Black'], soldOut: ['Vintage Black/XXL'] },
  { title: 'Roam More Tee', collection: 'camp', price: 36, image: 'camp-4', colors: ['Charcoal', 'Sandstone'] },
  { title: 'Coastal Road Trip Tee', collection: 'camp', price: 36, image: 'camp-5', colors: ['Off-White'] },
  { title: 'Wave & Wheels Tee', collection: 'camp', price: 36, image: 'camp-6', colors: ['Natural', 'Earth Brown'] },
  { title: 'ORS Monogram Heavyweight Tee', collection: 'ridge', price: 42, image: 'ridge-1', colors: ['Vintage Black', 'Off-White'] },
  { title: 'Wild Paths Heavyweight Tee', collection: 'ridge', price: 42, image: 'ridge-2', colors: ['Natural'] },
  { title: 'Pine Trail Heavyweight Tee', collection: 'ridge', price: 42, image: 'ridge-3', colors: ['Moss'] },
  { title: 'Summit Heavyweight Tee', collection: 'ridge', price: 45, image: 'ridge-4', colors: ['Earth Brown', 'Sandstone'] },
  { title: '4x4 Expedition Heavyweight Tee', collection: 'ridge', price: 45, image: 'ridge-5', colors: ['Charcoal'] },
  { title: 'Adventure Heavyweight Tee', collection: 'ridge', price: 42, image: 'ridge-6', colors: ['Sandstone'], soldOut: ['Sandstone/M', 'Sandstone/L'] },
]

const slug = (s: string) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const money = (n: number) => ({ amount: n.toFixed(2), currencyCode: 'USD' })

function buildProduct(seed: Seed, index: number): Product {
  const handle = slug(seed.title)
  const fit = FIT_COLLECTIONS.find((c) => c.handle === seed.collection)!
  const image = {
    url: `/images/ors/${seed.image}.jpg`,
    altText: `${seed.title} — ${fit.name} ${fit.fit}`,
    width: 600,
    height: 1000,
  }
  const variants: ProductVariant[] = seed.colors.flatMap((color) =>
    SIZES.map((size) => ({
      id: `mock-variant:${handle}:${slug(color)}:${size}`,
      title: `${color} / ${size}`,
      availableForSale: !seed.soldOut?.includes(`${color}/${size}`),
      selectedOptions: [
        { name: 'Color', value: color },
        { name: 'Size', value: size },
      ],
      price: money(seed.price),
      compareAtPrice: null,
      image,
    })),
  )
  const description = `${fit.description} Printed graphic, designed in-house by Outrider Supply.`
  return {
    id: `mock-product:${handle}`,
    handle,
    title: seed.title,
    description,
    descriptionHtml: `<p>${description}</p>`,
    availableForSale: variants.some((v) => v.availableForSale),
    options: [
      { name: 'Color', values: seed.colors.map((c) => ({ name: c, swatch: COLOR_HEX[c] ?? null })) },
      { name: 'Size', values: SIZES.map((s) => ({ name: s, swatch: null })) },
    ],
    priceRange: { minVariantPrice: money(seed.price), maxVariantPrice: money(seed.price) },
    featuredImage: image,
    images: [image],
    variants,
    seo: { title: null, description: null },
    // The two newest demo products are tagged "new" to show the homepage badge.
    tags: index >= SEEDS.length - 2 ? [seed.collection, 'new'] : [seed.collection],
    collections: [{ handle: fit.handle, title: fit.name }],
    updatedAt: new Date(2026, 9, 1 + index).toISOString(),
  }
}

export const MOCK_PRODUCTS: Product[] = SEEDS.map(buildProduct)

export const MOCK_COLLECTIONS: Collection[] = FIT_COLLECTIONS.map((c) => ({
  handle: c.handle,
  title: c.name,
  description: c.description,
  image: null,
  seo: { title: null, description: null },
  updatedAt: new Date(2026, 9, 1).toISOString(),
}))

export const MOCK_POLICIES: ShopPolicies = {
  privacyPolicy: null,
  termsOfService: null,
  shippingPolicy: null,
  refundPolicy: null,
}

// ---------- Demo cart ----------
// The demo cart is encoded into the cart cookie itself, so it needs no database.

type MockLine = { v: string; q: number }

export function decodeMockCartId(cartId: string | undefined): MockLine[] {
  if (!cartId?.startsWith('mock:')) return []
  try {
    return JSON.parse(Buffer.from(cartId.slice(5), 'base64url').toString('utf8'))
  } catch {
    return []
  }
}

export function buildMockCart(lines: MockLine[]): Cart {
  const clean = lines.filter((l) => l.q > 0)
  const id = 'mock:' + Buffer.from(JSON.stringify(clean)).toString('base64url')
  const variants = new Map(
    MOCK_PRODUCTS.flatMap((p) => p.variants.map((v) => [v.id, { v, p }] as const)),
  )
  const cartLines = clean.flatMap((l) => {
    const hit = variants.get(l.v)
    if (!hit) return []
    const { v, p } = hit
    return [
      {
        id: v.id,
        quantity: l.q,
        cost: { totalAmount: money(Number(v.price.amount) * l.q) },
        merchandise: {
          id: v.id,
          title: v.title,
          selectedOptions: v.selectedOptions,
          price: v.price,
          image: v.image,
          product: { handle: p.handle, title: p.title, featuredImage: p.featuredImage },
        },
      },
    ]
  })
  const subtotal = cartLines.reduce((sum, l) => sum + Number(l.cost.totalAmount.amount), 0)
  return {
    id,
    checkoutUrl: '',
    totalQuantity: cartLines.reduce((n, l) => n + l.quantity, 0),
    cost: { subtotalAmount: money(subtotal), totalAmount: money(subtotal) },
    lines: cartLines,
    discountCodes: [],
  }
}
