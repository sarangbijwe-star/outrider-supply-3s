import type { MetadataRoute } from 'next'
import { FIT_COLLECTIONS } from '@/lib/collections'
import { getProducts } from '@/lib/shopify'
import { SITE } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ['', '/shop', '/our-story', '/size-guide', '/faq', '/contact', '/shipping-returns', '/privacy-policy', '/terms']
  const products = await getProducts().catch(() => [])

  return [
    ...pages.map((p) => ({ url: `${SITE.url}${p}`, changeFrequency: 'weekly' as const, priority: p === '' ? 1 : 0.5 })),
    ...FIT_COLLECTIONS.map((c) => ({ url: `${SITE.url}/collections/${c.handle}`, changeFrequency: 'daily' as const, priority: 0.9 })),
    ...products.map((p) => ({ url: `${SITE.url}/products/${p.handle}`, lastModified: p.updatedAt, priority: 0.8 })),
  ]
}
