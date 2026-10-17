import type { Money } from '@/lib/shopify/types'

export function formatMoney(money: Money | { amount: string | number; currencyCode: string }) {
  const amount = Number(money.amount)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: money.currencyCode,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount)
}

// Asks Shopify's image CDN for a resized copy. Local (demo) images pass through.
export function shopifyImageUrl(url: string, width: number) {
  if (!url.includes('cdn.shopify.com')) return url
  const u = new URL(url)
  u.searchParams.set('width', String(width))
  return u.toString()
}
