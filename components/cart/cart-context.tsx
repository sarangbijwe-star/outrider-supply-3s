'use client'

import { createContext, useCallback, useContext, useEffect, useState, useTransition } from 'react'
import type { ReactNode } from 'react'
import { addItem, applyDiscount, loadCart, removeItem, updateItem } from '@/app/actions/cart'
import type { CartActionResult } from '@/app/actions/cart'
import type { Cart } from '@/lib/shopify/types'

type CartContextValue = {
  cart: Cart | null
  isOpen: boolean
  isPending: boolean
  error: string | null
  checkoutEnabled: boolean
  open: () => void
  close: () => void
  add: (variantId: string, quantity?: number) => Promise<boolean>
  update: (lineId: string, quantity: number) => void
  remove: (lineId: string) => void
  discount: (code: string) => Promise<boolean>
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children, checkoutEnabled }: { children: ReactNode; checkoutEnabled: boolean }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isOpen, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  // Load the cart after the page renders, so pages themselves stay fast and cacheable.
  useEffect(() => {
    loadCart().then((r) => setCart(r.cart))
  }, [])

  const apply = useCallback((r: CartActionResult) => {
    if (r.cart) setCart(r.cart)
    setError(r.error ?? null)
    return !r.error
  }, [])

  const value: CartContextValue = {
    cart,
    isOpen,
    isPending,
    error,
    checkoutEnabled,
    open: () => setOpen(true),
    close: () => setOpen(false),
    add: (variantId, quantity = 1) =>
      new Promise((resolve) =>
        startTransition(async () => {
          const ok = apply(await addItem(variantId, quantity))
          if (ok) setOpen(true)
          resolve(ok)
        }),
      ),
    update: (lineId, quantity) => startTransition(async () => void apply(await updateItem(lineId, quantity))),
    remove: (lineId) => startTransition(async () => void apply(await removeItem(lineId))),
    discount: (code) =>
      new Promise((resolve) => startTransition(async () => resolve(apply(await applyDiscount(code))))),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
