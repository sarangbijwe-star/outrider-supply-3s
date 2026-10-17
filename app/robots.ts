import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  // Only the real domain is indexed — Vercel preview URLs stay out of Google.
  const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === 'production' : true
  return {
    rules: isProduction
      ? { userAgent: '*', allow: '/', disallow: ['/cart', '/search', '/api/'] }
      : { userAgent: '*', disallow: '/' },
    sitemap: `${SITE.url}/sitemap.xml`,
  }
}
