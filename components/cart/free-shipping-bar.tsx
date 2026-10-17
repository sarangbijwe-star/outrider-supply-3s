import { SITE } from '@/lib/site'

// Visual nudge only — the real free-shipping rule lives in
// Shopify Admin → Settings → Shipping and delivery. Keep the two in sync.
export function FreeShippingBar({ subtotal }: { subtotal: number }) {
  const threshold = SITE.freeShippingThreshold
  if (!threshold) return null
  const remaining = Math.max(0, threshold - subtotal)
  const pct = Math.min(100, (subtotal / threshold) * 100)
  return (
    <div>
      <p className="mb-2 text-xs text-muted-foreground">
        {remaining > 0 ? (
          <>
            You&apos;re <span className="text-foreground">${remaining.toFixed(0)}</span> away from free US shipping.
          </>
        ) : (
          <span className="text-sand">You&apos;ve unlocked free US shipping.</span>
        )}
      </p>
      <div className="h-[2px] w-full bg-border">
        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
