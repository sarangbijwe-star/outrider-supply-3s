'use server'

import { cookies, headers } from 'next/headers'
import {
  addToCart,
  createCart,
  getCart,
  removeCartLine,
  updateCartLine,
  updateDiscountCodes,
} from '@/lib/shopify'
import type { Cart } from '@/lib/shopify/types'

// The cart ID lives in an httpOnly cookie, so browser JavaScript can never read
// or tamper with it. Shopify keeps the cart itself.
const CART_COOKIE = 'ors_cart'

export type CartActionResult = { cart: Cart | null; error?: string }

async function buyerIp() {
  const h = await headers()
  return h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip')
}

async function saveCartId(cart: Cart) {
  const jar = await cookies()
  jar.set(CART_COOKIE, cart.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
}

async function readCartId() {
  return (await cookies()).get(CART_COOKIE)?.value
}

async function run(fn: (cartId: string | undefined, ip: string | null | undefined) => Promise<Cart | null>) {
  try {
    const cart = await fn(await readCartId(), await buyerIp())
    if (cart) await saveCartId(cart)
    return { cart }
  } catch (e) {
    console.error('[cart]', e)
    return { cart: null, error: 'Something went wrong updating your bag. Please try again.' }
  }
}

export async function loadCart(): Promise<CartActionResult> {
  const cartId = await readCartId()
  if (!cartId) return { cart: null }
  try {
    const cart = await getCart(cartId, await buyerIp())
    // A cart disappears after checkout is completed — start fresh next time.
    if (!cart) (await cookies()).delete(CART_COOKIE)
    return { cart }
  } catch (e) {
    console.error('[cart]', e)
    return { cart: null }
  }
}

export async function addItem(merchandiseId: string, quantity = 1): Promise<CartActionResult> {
  return run(async (cartId, ip) => {
    const lines = [{ merchandiseId, quantity }]
    if (cartId) {
      try {
        return await addToCart(cartId, lines, ip)
      } catch {
        // Cart expired or already checked out — fall through and make a new one.
      }
    }
    return createCart(lines, ip)
  })
}

export async function updateItem(lineId: string, quantity: number): Promise<CartActionResult> {
  return run(async (cartId, ip) => {
    if (!cartId) return null
    if (quantity <= 0) return removeCartLine(cartId, lineId, ip)
    return updateCartLine(cartId, { id: lineId, quantity }, ip)
  })
}

export async function removeItem(lineId: string): Promise<CartActionResult> {
  return run(async (cartId, ip) => (cartId ? removeCartLine(cartId, lineId, ip) : null))
}

export async function applyDiscount(code: string): Promise<CartActionResult> {
  const result = await run(async (cartId, ip) =>
    cartId ? updateDiscountCodes(cartId, code.trim() ? [code.trim().toUpperCase()] : [], ip) : null,
  )
  const applied = result.cart?.discountCodes.find((d) => d.code.toUpperCase() === code.trim().toUpperCase())
  if (code.trim() && result.cart && !applied?.applicable) {
    return { ...result, error: `"${code.trim()}" isn't valid for the items in your bag.` }
  }
  return result
}
