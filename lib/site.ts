// Brand-wide settings. Edit these values to change them everywhere on the site.

export const SITE = {
  name: 'Outrider Supply',
  wordmark: 'OUTRIDER SUPPLY',
  monogram: 'ORS',
  tagline: 'Beyond Limits',
  description:
    'Premium American outdoor-inspired menswear. Heavyweight cotton tees in three fits — TRAIL, CAMP and RIDGE — built for the space between the city and the wild.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, ''),
  // TODO: replace with your real support inbox and social handles before launch.
  email: 'support@shopoutridersupply.com',
  instagram: 'https://www.instagram.com/outridersupply',
  socials: [
    { short: 'IG', label: 'Instagram', href: 'https://www.instagram.com/outridersupply' },
    { short: 'TT', label: 'TikTok', href: 'https://www.tiktok.com/@outridersupply' },
  ],
  // TODO: make these match Shopify Admin → Settings → Shipping and delivery / Policies.
  freeShippingThreshold: 75,
  returnDays: 30,
} as const

export const NAV_LINKS = [
  { label: 'Shop All', href: '/shop' },
  { label: 'Trail', href: '/collections/trail' },
  { label: 'Camp', href: '/collections/camp' },
  { label: 'Ridge', href: '/collections/ridge' },
  { label: 'Our Story', href: '/our-story' },
]

export const FOOTER_COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'Shop All', href: '/shop' },
      { label: 'Trail — Regular Fit', href: '/collections/trail' },
      { label: 'Camp — Boxy Fit', href: '/collections/camp' },
      { label: 'Ridge — Oversized', href: '/collections/ridge' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Story', href: '/our-story' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Size & Fit Guide', href: '/size-guide' },
      { label: 'Shipping & Returns', href: '/shipping-returns' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
]
