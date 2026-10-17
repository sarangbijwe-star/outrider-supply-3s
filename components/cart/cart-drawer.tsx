'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { useCart } from '@/components/cart/cart-context'
import { CartLines, CheckoutButton } from '@/components/cart/cart-lines'
import { FreeShippingBar } from '@/components/cart/free-shipping-bar'
import { formatMoney } from '@/lib/format'

export function CartDrawer() {
  const { cart, isOpen, close, error } = useCart()
  const empty = !cart?.lines.length

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, close])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[70] bg-background/70 backdrop-blur-sm"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col border-l border-border bg-background"
          >
            <div className="flex h-16 items-center justify-between border-b border-border px-5 md:h-20 md:px-8">
              <p className="font-mono text-xs uppercase tracking-[0.25em]">
                Your Bag {cart?.totalQuantity ? `(${cart.totalQuantity})` : ''}
              </p>
              <button aria-label="Close bag" onClick={close} className="transition-colors hover:text-sand">
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {empty ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
                <p className="text-2xl font-semibold tracking-tight">Your bag is empty.</p>
                <Link
                  href="/shop"
                  onClick={close}
                  className="bg-foreground px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-background transition-colors hover:bg-sand"
                >
                  Shop All Tees
                </Link>
              </div>
            ) : (
              <>
                <div className="border-b border-border px-5 py-4 md:px-8">
                  <FreeShippingBar subtotal={Number(cart.cost.subtotalAmount.amount)} />
                </div>
                <div className="flex-1 overflow-y-auto px-5 md:px-8">
                  <CartLines onNavigate={close} />
                </div>
                <div className="border-t border-border px-5 py-6 md:px-8">
                  {error && <p className="mb-3 text-sm text-destructive">{error}</p>}
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium tabular-nums">{formatMoney(cart.cost.subtotalAmount)}</span>
                  </div>
                  <p className="mb-5 text-xs text-muted-foreground">
                    Shipping, taxes and discount codes calculated at checkout.
                  </p>
                  <CheckoutButton />
                  <Link
                    href="/cart"
                    onClick={close}
                    className="mt-3 block text-center text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    View full bag
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
