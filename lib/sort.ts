import type { ProductSort } from '@/lib/shopify/types'

export const SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

export function parseSort(value: string | string[] | undefined): ProductSort | undefined {
  const v = Array.isArray(value) ? value[0] : value
  return SORT_OPTIONS.find((o) => o.value === v)?.value
}
