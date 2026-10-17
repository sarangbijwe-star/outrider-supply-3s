'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X } from 'lucide-react'
import { useCart } from '@/components/cart/cart-context'
import { formatMoney, shopifyImageUrl } from '@/lib/format'

export function CartLines({ onNavigate }: { onNavigate?: () => void }) {
  const { cart, update, remove, isPending } = useCart()
  if (!cart?.lines.length) return null

  return (
    <ul className={`divide-y divide-border transition-opacity ${isPending ? 'opacity-60' : ''}`}>
      {cart.lines.map((line) => {
        const m = line.merchandise
        const image = m.image ?? m.product.featuredImage
        const options = m.selectedOptions.filter((o) => o.value !== 'Default Title')
        return (
          <li key={line.id} className="flex gap-4 py-5">
            <Link
              href={`/products/${m.product.handle}`}
              onClick={onNavigate}
              className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden bg-muted md:w-24"
            >
              {image && (
                <Image
                  src={shopifyImageUrl(image.url, 300)}
                  alt={image.altText || m.product.title}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              )}
            </Link>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link
                    href={`/products/${m.product.handle}`}
                    onClick={onNavigate}
                    className="block truncate text-sm font-medium tracking-tight hover:text-sand"
                  >
                    {m.product.title}
                  </Link>
                  {options.length > 0 && (
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {options.map((o) => o.value).join(' / ')}
                    </p>
                  )}
                </div>
                <button
                  aria-label={`Remove ${m.product.title}`}
                  onClick={() => remove(line.id)}
                  disabled={isPending}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
              <div className="mt-auto flex items-center justify-between pt-3">
                <div className="flex items-center border border-border">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => update(line.id, line.quantity - 1)}
                    disabled={isPending}
                    className="flex h-9 w-9 items-center justify-center transition-colors hover:bg-muted"
                  >
                    <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                  <span className="w-8 text-center text-sm tabular-nums" aria-live="polite">
                    {line.quantity}
                  </span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => update(line.id, line.quantity + 1)}
                    disabled={isPending}
                    className="flex h-9 w-9 items-center justify-center transition-colors hover:bg-muted"
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                </div>
                <span className="text-sm font-medium tabular-nums">{formatMoney(line.cost.totalAmount)}</span>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export function CheckoutButton({ className = '' }: { className?: string }) {
  const { cart, checkoutEnabled, isPending } = useCart()
  if (!cart?.lines.length) return null

  if (!checkoutEnabled || !cart.checkoutUrl) {
    return (
      <div className={className}>
        <button
          disabled
          className="w-full cursor-not-allowed bg-foreground/40 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-background"
        >
          Checkout
        </button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Demo mode — connect Shopify (see SETUP-GUIDE.md) to enable checkout.
        </p>
      </div>
    )
  }

  // Shopify's hosted, PCI-compliant checkout. No payment details ever touch this site.
  return (
    <a
      href={cart.checkoutUrl}
      aria-disabled={isPending}
      className={`block w-full bg-foreground px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-background transition-colors hover:bg-sand ${
        isPending ? 'pointer-events-none opacity-60' : ''
      } ${className}`}
    >
      Secure Checkout
    </a>
  )
}
