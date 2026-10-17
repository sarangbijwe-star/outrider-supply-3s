import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Space_Grotesk } from 'next/font/google'
import { CartProvider } from '@/components/cart/cart-context'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { isShopifyConnected } from '@/lib/shopify'
import { SITE } from '@/lib/site'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}.`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: '/' },
  openGraph: {
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}.`,
    description: SITE.description,
    type: 'website',
    locale: 'en_US',
    images: ['/images/hero.png'],
  },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#121211',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${spaceGrotesk.variable} bg-background`}>
      <body className="font-sans antialiased">
        <CartProvider checkoutEnabled={isShopifyConnected}>
          <SiteHeader />
          {children}
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
