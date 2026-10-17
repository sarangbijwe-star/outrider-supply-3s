// The three core fits. The `handle` must match the collection handle in
// Shopify Admin → Products → Collections (the last part of the collection URL).
// Titles, descriptions and images set in Shopify take priority over these
// fallbacks; the fit details below are always shown.
// TODO: confirm every detail below against your tech packs before launch.

export type FitCollection = {
  handle: 'trail' | 'camp' | 'ridge'
  name: string
  fit: string
  weight: string
  gsm: number
  tagline: string
  description: string
  image: string
  details: string[]
}

export const FIT_COLLECTIONS: FitCollection[] = [
  {
    handle: 'trail',
    name: 'TRAIL',
    fit: 'Modern Regular Fit',
    weight: 'Midweight',
    gsm: 180,
    tagline: 'Clean everyday streetwear.',
    description:
      'Our everyday tee. A modern regular fit cut from 180 GSM cotton — soft, breathable and clean through the body, built to layer or wear on its own.',
    image: '/images/ors/trail-2.jpg',
    details: [
      '180 GSM cotton jersey',
      'Modern regular fit — true to size',
      'Crew neck',
    ],
  },
  {
    handle: 'camp',
    name: 'CAMP',
    fit: 'Relaxed Boxy Fit',
    weight: 'Heavyweight',
    gsm: 220,
    tagline: 'Casual outdoor lifestyle.',
    description:
      'Made for slow mornings and long weekends. A relaxed boxy fit in 220 GSM cotton with a wider body and slightly dropped shoulder.',
    image: '/images/ors/camp-1.jpg',
    details: [
      '220 GSM cotton jersey',
      'Relaxed boxy fit — wider body, shorter length',
      'Slightly dropped shoulder',
    ],
  },
  {
    handle: 'ridge',
    name: 'RIDGE',
    fit: 'Heavyweight Oversized Fit',
    weight: 'Heavyweight',
    gsm: 240,
    tagline: 'Premium streetwear silhouette.',
    description:
      'Our heaviest tee. A 240 GSM oversized silhouette with a structured drape and dropped shoulder.',
    image: '/images/ors/ridge-1.jpg',
    details: [
      '240 GSM heavyweight cotton',
      'Oversized fit — size down for a closer fit',
      'Dropped shoulder',
      'Structured drape',
    ],
  },
]

export function getFitCollection(handle: string | undefined | null) {
  return FIT_COLLECTIONS.find((c) => c.handle === handle?.toLowerCase())
}

// Finds which fit a product belongs to from the collections it is in.
export function getProductFit(collections: { handle: string }[]) {
  for (const c of collections) {
    const fit = getFitCollection(c.handle)
    if (fit) return fit
  }
  return undefined
}
