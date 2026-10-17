// Server-side Shopify Storefront API client.
//
// SECURITY: this file reads the PRIVATE Storefront token. It must only ever be
// imported from server code (server components, server actions, route
// handlers). The env vars are deliberately NOT prefixed with NEXT_PUBLIC_, so
// Next.js will never ship them to the browser.

import {
  CART_CREATE,
  CART_DISCOUNT_CODES_UPDATE,
  CART_LINES_ADD,
  CART_LINES_REMOVE,
  CART_LINES_UPDATE,
  CART_QUERY,
  CUSTOMER_CREATE,
  COLLECTION_PRODUCTS_QUERY,
  COLLECTION_QUERY,
  COLLECTIONS_QUERY,
  POLICIES_QUERY,
  PRODUCT_QUERY,
  PRODUCTS_QUERY,
  RECOMMENDATIONS_QUERY,
} from './queries'
import { randomBytes } from 'node:crypto'
import {
  MOCK_COLLECTIONS,
  MOCK_POLICIES,
  MOCK_PRODUCTS,
  buildMockCart,
  decodeMockCartId,
} from './mock'
import type { Cart, Collection, Product, ProductSort, ShopPolicies } from './types'

const domain = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, '').replace(/\/$/, '')
const privateToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN
const apiVersion = process.env.SHOPIFY_API_VERSION || '2026-07'

export const isShopifyConnected = Boolean(domain && privateToken)

// How long (seconds) product data is cached before re-checking Shopify.
// Shopify webhooks (see app/api/revalidate) refresh it instantly on changes.
const CATALOG_REVALIDATE = 900

export const TAGS = {
  products: 'products',
  collections: 'collections',
  policies: 'policies',
} as const

type FetchOptions = {
  query: string
  variables?: Record<string, unknown>
  tags?: string[]
  cache?: 'no-store'
  buyerIp?: string | null
}

async function shopifyFetch<T>({ query, variables, tags, cache, buyerIp }: FetchOptions): Promise<T> {
  const res = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Shopify-Storefront-Private-Token': privateToken!,
      ...(buyerIp ? { 'Shopify-Storefront-Buyer-IP': buyerIp } : {}),
    },
    body: JSON.stringify({ query, variables }),
    ...(cache ? { cache } : { next: { revalidate: CATALOG_REVALIDATE, tags } }),
  })

  const body = await res.json().catch(() => null)
  if (!res.ok || !body || body.errors) {
    const message = body?.errors?.map((e: { message: string }) => e.message).join('; ')
    throw new Error(`Shopify API error (${res.status}): ${message || res.statusText}`)
  }
  return body.data as T
}

// ---------- Reshaping (GraphQL connections → plain arrays) ----------

type RawProduct = Omit<Product, 'images' | 'variants' | 'collections' | 'options'> & {
  images: { nodes: Product['images'] }
  variants: { nodes: Product['variants'] }
  collections: { nodes: Product['collections'] }
  options: { name: string; optionValues: { name: string; swatch: { color: string | null } | null }[] }[]
}

function reshapeProduct(p: RawProduct | null): Product | null {
  if (!p) return null
  return {
    ...p,
    images: p.images.nodes,
    variants: p.variants.nodes,
    collections: p.collections.nodes,
    options: p.options.map((o) => ({
      name: o.name,
      values: o.optionValues.map((v) => ({ name: v.name, swatch: v.swatch?.color ?? null })),
    })),
  }
}

type RawCart = Omit<Cart, 'lines'> & { lines: { nodes: Cart['lines'] } }

function reshapeCart(c: RawCart | null): Cart | null {
  if (!c) return null
  return { ...c, lines: c.lines.nodes }
}

function sortArgs(sort: ProductSort | undefined, inCollection: boolean) {
  switch (sort) {
    case 'newest':
      return { sortKey: inCollection ? 'CREATED' : 'CREATED_AT', reverse: true }
    case 'price-asc':
      return { sortKey: 'PRICE', reverse: false }
    case 'price-desc':
      return { sortKey: 'PRICE', reverse: true }
    default:
      return { sortKey: inCollection ? 'COLLECTION_DEFAULT' : 'BEST_SELLING', reverse: false }
  }
}

function sortMock(products: Product[], sort: ProductSort | undefined) {
  const price = (p: Product) => Number(p.priceRange.minVariantPrice.amount)
  const list = [...products]
  if (sort === 'price-asc') list.sort((a, b) => price(a) - price(b))
  if (sort === 'price-desc') list.sort((a, b) => price(b) - price(a))
  if (sort === 'newest') list.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  return list
}

// ---------- Catalog ----------

/** All products (follows pagination, up to `limit`). `query` uses Shopify search syntax. */
export async function getProducts({
  sort,
  query,
  limit = 1000,
}: { sort?: ProductSort; query?: string; limit?: number } = {}): Promise<Product[]> {
  if (!isShopifyConnected) {
    const q = query?.toLowerCase().trim()
    const hits = q
      ? MOCK_PRODUCTS.filter((p) => `${p.title} ${p.tags.join(' ')} ${p.description}`.toLowerCase().includes(q))
      : MOCK_PRODUCTS
    return sortMock(hits, sort).slice(0, limit)
  }

  const products: Product[] = []
  let after: string | null = null
  do {
    const data: { products: { nodes: RawProduct[]; pageInfo: { hasNextPage: boolean; endCursor: string } } } =
      await shopifyFetch({
        query: PRODUCTS_QUERY,
        variables: { first: Math.min(100, limit - products.length), after, query, ...sortArgs(sort, false) },
        tags: [TAGS.products],
      })
    products.push(...data.products.nodes.map((p) => reshapeProduct(p)!))
    after = data.products.pageInfo.hasNextPage ? data.products.pageInfo.endCursor : null
  } while (after && products.length < limit)
  return products
}

export async function getProduct(handle: string): Promise<Product | null> {
  if (!isShopifyConnected) return MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null
  const data = await shopifyFetch<{ product: RawProduct | null }>({
    query: PRODUCT_QUERY,
    variables: { handle },
    tags: [TAGS.products],
  })
  return reshapeProduct(data.product)
}

export async function getProductRecommendations(product: Product): Promise<Product[]> {
  if (!isShopifyConnected) {
    const handle = product.collections[0]?.handle
    return MOCK_PRODUCTS.filter((p) => p.id !== product.id && p.collections[0]?.handle === handle).slice(0, 4)
  }
  const data = await shopifyFetch<{ productRecommendations: RawProduct[] | null }>({
    query: RECOMMENDATIONS_QUERY,
    variables: { productId: product.id },
    tags: [TAGS.products],
  })
  return (data.productRecommendations ?? []).map((p) => reshapeProduct(p)!).slice(0, 4)
}

export async function getCollection(handle: string): Promise<Collection | null> {
  if (!isShopifyConnected) return MOCK_COLLECTIONS.find((c) => c.handle === handle) ?? null
  const data = await shopifyFetch<{ collection: Collection | null }>({
    query: COLLECTION_QUERY,
    variables: { handle },
    tags: [TAGS.collections],
  })
  return data.collection
}

export async function getCollections(): Promise<Collection[]> {
  if (!isShopifyConnected) return MOCK_COLLECTIONS
  const data = await shopifyFetch<{ collections: { nodes: Collection[] } }>({
    query: COLLECTIONS_QUERY,
    tags: [TAGS.collections],
  })
  return data.collections.nodes
}

export async function getCollectionProducts(handle: string, sort?: ProductSort): Promise<Product[]> {
  if (!isShopifyConnected) {
    return sortMock(
      MOCK_PRODUCTS.filter((p) => p.collections.some((c) => c.handle === handle)),
      sort,
    )
  }
  const products: Product[] = []
  let after: string | null = null
  do {
    const data: {
      collection: { products: { nodes: RawProduct[]; pageInfo: { hasNextPage: boolean; endCursor: string } } } | null
    } = await shopifyFetch({
      query: COLLECTION_PRODUCTS_QUERY,
      variables: { handle, first: 100, after, ...sortArgs(sort, true) },
      tags: [TAGS.collections, TAGS.products],
    })
    if (!data.collection) return []
    products.push(...data.collection.products.nodes.map((p) => reshapeProduct(p)!))
    after = data.collection.products.pageInfo.hasNextPage ? data.collection.products.pageInfo.endCursor : null
  } while (after)
  return products
}

/** Policies written in Shopify Admin → Settings → Policies. */
export async function getPolicies(): Promise<ShopPolicies> {
  if (!isShopifyConnected) return MOCK_POLICIES
  const data = await shopifyFetch<{ shop: ShopPolicies }>({
    query: POLICIES_QUERY,
    tags: [TAGS.policies],
  })
  return data.shop
}

// ---------- Cart ----------
// Carts are never cached. In demo mode the cart lives entirely in the cookie.

type CartResult = { cart: RawCart | null; userErrors: { message: string }[] }

function unwrapCart(result: CartResult): Cart {
  if (result.userErrors.length) throw new Error(result.userErrors.map((e) => e.message).join('; '))
  return reshapeCart(result.cart)!
}

export async function getCart(cartId: string, buyerIp?: string | null): Promise<Cart | null> {
  if (!isShopifyConnected) return buildMockCart(decodeMockCartId(cartId))
  const data = await shopifyFetch<{ cart: RawCart | null }>({
    query: CART_QUERY,
    variables: { cartId },
    cache: 'no-store',
    buyerIp,
  })
  return reshapeCart(data.cart)
}

export async function createCart(
  lines: { merchandiseId: string; quantity: number }[],
  buyerIp?: string | null,
): Promise<Cart> {
  if (!isShopifyConnected) return buildMockCart(lines.map((l) => ({ v: l.merchandiseId, q: l.quantity })))
  const data = await shopifyFetch<{ cartCreate: CartResult }>({
    query: CART_CREATE,
    variables: { lines },
    cache: 'no-store',
    buyerIp,
  })
  return unwrapCart(data.cartCreate)
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
  buyerIp?: string | null,
): Promise<Cart> {
  if (!isShopifyConnected) {
    const current = decodeMockCartId(cartId)
    for (const l of lines) {
      const existing = current.find((c) => c.v === l.merchandiseId)
      if (existing) existing.q += l.quantity
      else current.push({ v: l.merchandiseId, q: l.quantity })
    }
    return buildMockCart(current)
  }
  const data = await shopifyFetch<{ cartLinesAdd: CartResult }>({
    query: CART_LINES_ADD,
    variables: { cartId, lines },
    cache: 'no-store',
    buyerIp,
  })
  return unwrapCart(data.cartLinesAdd)
}

export async function updateCartLine(
  cartId: string,
  line: { id: string; quantity: number },
  buyerIp?: string | null,
): Promise<Cart> {
  if (!isShopifyConnected) {
    return buildMockCart(decodeMockCartId(cartId).map((l) => (l.v === line.id ? { ...l, q: line.quantity } : l)))
  }
  const data = await shopifyFetch<{ cartLinesUpdate: CartResult }>({
    query: CART_LINES_UPDATE,
    variables: { cartId, lines: [line] },
    cache: 'no-store',
    buyerIp,
  })
  return unwrapCart(data.cartLinesUpdate)
}

export async function removeCartLine(cartId: string, lineId: string, buyerIp?: string | null): Promise<Cart> {
  if (!isShopifyConnected) {
    return buildMockCart(decodeMockCartId(cartId).filter((l) => l.v !== lineId))
  }
  const data = await shopifyFetch<{ cartLinesRemove: CartResult }>({
    query: CART_LINES_REMOVE,
    variables: { cartId, lineIds: [lineId] },
    cache: 'no-store',
    buyerIp,
  })
  return unwrapCart(data.cartLinesRemove)
}

export async function updateDiscountCodes(cartId: string, codes: string[], buyerIp?: string | null): Promise<Cart> {
  if (!isShopifyConnected) return buildMockCart(decodeMockCartId(cartId))
  const data = await shopifyFetch<{ cartDiscountCodesUpdate: CartResult }>({
    query: CART_DISCOUNT_CODES_UPDATE,
    variables: { cartId, discountCodes: codes },
    cache: 'no-store',
    buyerIp,
  })
  return unwrapCart(data.cartDiscountCodesUpdate)
}

// ---------- Newsletter ----------

/**
 * Adds an email to Shopify Admin → Customers with email-marketing consent, so
 * you can mail subscribers with Shopify Email (or any app that syncs customers).
 * The Storefront API requires a password, so a random one is generated; the
 * subscriber never uses it.
 */
export async function subscribeToNewsletter(email: string, buyerIp?: string | null) {
  if (!isShopifyConnected) throw new Error('NOT_CONNECTED')
  const data = await shopifyFetch<{
    customerCreate: { customerUserErrors: { code: string; message: string }[] }
  }>({
    query: CUSTOMER_CREATE,
    variables: {
      input: { email, acceptsMarketing: true, password: randomBytes(24).toString('base64url') },
    },
    cache: 'no-store',
    buyerIp,
  })
  const errors = data.customerCreate.customerUserErrors
  // Already a customer: treat as success rather than revealing the account exists.
  if (errors.length && !errors.every((e) => e.code === 'TAKEN' || e.code === 'CUSTOMER_DISABLED')) {
    throw new Error(errors.map((e) => e.message).join('; '))
  }
}
