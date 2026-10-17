export type Money = {
  amount: string
  currencyCode: string
}

export type ShopifyImage = {
  url: string
  altText: string | null
  width: number | null
  height: number | null
}

export type SelectedOption = {
  name: string
  value: string
}

export type ProductOption = {
  name: string
  values: { name: string; swatch: string | null }[]
}

export type ProductVariant = {
  id: string
  title: string
  availableForSale: boolean
  selectedOptions: SelectedOption[]
  price: Money
  compareAtPrice: Money | null
  image: ShopifyImage | null
}

export type Product = {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  availableForSale: boolean
  options: ProductOption[]
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money }
  featuredImage: ShopifyImage | null
  images: ShopifyImage[]
  variants: ProductVariant[]
  seo: { title: string | null; description: string | null }
  tags: string[]
  collections: { handle: string; title: string }[]
  updatedAt: string
}

export type Collection = {
  handle: string
  title: string
  description: string
  image: ShopifyImage | null
  seo: { title: string | null; description: string | null }
  updatedAt: string
}

export type CartLine = {
  id: string
  quantity: number
  cost: { totalAmount: Money }
  merchandise: {
    id: string
    title: string
    selectedOptions: SelectedOption[]
    price: Money
    image: ShopifyImage | null
    product: { handle: string; title: string; featuredImage: ShopifyImage | null }
  }
}

export type Cart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    subtotalAmount: Money
    totalAmount: Money
  }
  lines: CartLine[]
  discountCodes: { code: string; applicable: boolean }[]
}

export type Policy = {
  title: string
  body: string
}

export type ShopPolicies = {
  privacyPolicy: Policy | null
  termsOfService: Policy | null
  shippingPolicy: Policy | null
  refundPolicy: Policy | null
}

export type ProductSort = 'featured' | 'newest' | 'price-asc' | 'price-desc'
