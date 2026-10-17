import { fileURLToPath } from 'node:url'

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: { root: fileURLToPath(new URL('.', import.meta.url)) },
  images: {
    // Product photos are served from Shopify's CDN and resized by Next.js.
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.shopify.com' }],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Friendly aliases for common Shopify-style URLs.
      { source: '/collections/all', destination: '/shop', permanent: true },
      { source: '/collections', destination: '/shop', permanent: true },
      { source: '/products', destination: '/shop', permanent: true },
      { source: '/pages/about', destination: '/our-story', permanent: true },
      { source: '/pages/contact', destination: '/contact', permanent: true },
      { source: '/pages/faq', destination: '/faq', permanent: true },
      { source: '/policies/privacy-policy', destination: '/privacy-policy', permanent: true },
      { source: '/policies/terms-of-service', destination: '/terms', permanent: true },
      { source: '/policies/shipping-policy', destination: '/shipping-returns', permanent: true },
      { source: '/policies/refund-policy', destination: '/shipping-returns', permanent: true },
    ]
  },
}

export default nextConfig
