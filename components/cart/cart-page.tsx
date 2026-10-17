'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/components/cart/cart-context'
import { CartLines, CheckoutButton } from '@/components/cart/cart-lines'
import { FreeShippingBar } from '@/components/cart/free-shipping-bar'
import { formatMoney } from '@/lib/format'

export function CartPageView() {
  const { cart, error, discount, isPending, checkoutEnabled } = useCart()
  const [code, setCode] = useState('')
  const empty = !cart?.lines.length
  const applied = cart?.discountCodes.filter((d) => d.applicable) ?? []
  const saved = cart ? Number(cart.cost.subtotalAmount.amount) - Number(cart.cost.totalAmount.amount) : 0

  return (
    <main className="mx-auto max-w-[1600px] px-5 pb-24 pt-32 md:px-10 md:pt-44">
      <h1 className="mb-12 text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">Your Bag</h1>

      {empty ? (
        <div className="flex flex-col items-start gap-6 border-t border-border pt-12">
          <p className="text-lg text-muted-foreground">Your bag is empty.</p>
          <Link
            href="/shop"
            className="bg-foreground px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-background transition-colors hover:bg-sand"
          >
            Shop All Tees
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="border-t border-border lg:col-span-8">
            <CartLines />
          </div>

          <aside className="h-fit border border-border p-6 md:p-8 lg:sticky lg:top-28 lg:col-span-4">
            <FreeShippingBar subtotal={Number(cart.cost.subtotalAmount.amount)} />

            {checkoutEnabled && (
              <form
                className="mt-8"
                onSubmit={async (e) => {
                  e.preventDefault()
                  if (await discount(code)) setCode('')
                }}
              >
                <label htmlFor="discount" className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Discount code
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    id="discount"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter code"
                    autoComplete="off"
                    className="min-w-0 flex-1 border border-border bg-transparent px-3 py-3 text-sm uppercase placeholder:normal-case placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!code.trim() || isPending}
                    className="border border-foreground px-5 text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-foreground hover:text-background disabled:opacity-40"
                  >
                    Apply
                  </button>
                </div>
                {applied.map((d) => (
                  <div key={d.code} className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-sand">{d.code} applied</span>
                    <button type="button" onClick={() => discount('')} className="text-xs text-muted-foreground underline">
                      Remove
                    </button>
                  </div>
                ))}
              </form>
            )}

            {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

            <dl className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="tabular-nums">{formatMoney(cart.cost.subtotalAmount)}</dd>
              </div>
              {saved > 0.001 && (
                <div className="flex justify-between text-sand">
                  <dt>Discount</dt>
                  <dd className="tabular-nums">−{formatMoney({ amount: saved, currencyCode: cart.cost.totalAmount.currencyCode })}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping & taxes</dt>
                <dd className="text-muted-foreground">At checkout</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-medium">
                <dt>Total</dt>
                <dd className="tabular-nums">{formatMoney(cart.cost.totalAmount)}</dd>
              </div>
            </dl>

            <CheckoutButton className="mt-8" />
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Secure checkout powered by Shopify. Shop Pay, Apple Pay, Google Pay and all major cards.
            </p>
          </aside>
        </div>
      )}
    </main>
  )
}
