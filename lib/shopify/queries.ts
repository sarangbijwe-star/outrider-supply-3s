// GraphQL documents for the Shopify Storefront API.
// Docs: https://shopify.dev/docs/api/storefront

const IMAGE = /* GraphQL */ `
  fragment image on Image {
    url
    altText
    width
    height
  }
`

const PRODUCT = /* GraphQL */ `
  fragment product on Product {
    id
    handle
    title
    description
    descriptionHtml
    availableForSale
    tags
    updatedAt
    options {
      name
      optionValues {
        name
        swatch {
          color
        }
      }
    }
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    featuredImage { ...image }
    images(first: 12) {
      nodes { ...image }
    }
    variants(first: 100) {
      nodes {
        id
        title
        availableForSale
        selectedOptions { name value }
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        image { ...image }
      }
    }
    seo { title description }
    collections(first: 10) {
      nodes { handle title }
    }
  }
  ${IMAGE}
`

const COLLECTION = /* GraphQL */ `
  fragment collection on Collection {
    handle
    title
    description
    updatedAt
    image { ...image }
    seo { title description }
  }
`

const CART = /* GraphQL */ `
  fragment cart on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    discountCodes { code applicable }
    lines(first: 100) {
      nodes {
        id
        quantity
        cost {
          totalAmount { amount currencyCode }
        }
        merchandise {
          ... on ProductVariant {
            id
            title
            selectedOptions { name value }
            price { amount currencyCode }
            image { ...image }
            product {
              handle
              title
              featuredImage { ...image }
            }
          }
        }
      }
    }
  }
  ${IMAGE}
`

// ---------- Catalog ----------

export const PRODUCTS_QUERY = /* GraphQL */ `
  query products($first: Int!, $after: String, $sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
    products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse, query: $query) {
      nodes { ...product }
      pageInfo { hasNextPage endCursor }
    }
  }
  ${PRODUCT}
`

export const PRODUCT_QUERY = /* GraphQL */ `
  query product($handle: String!) {
    product(handle: $handle) { ...product }
  }
  ${PRODUCT}
`

export const RECOMMENDATIONS_QUERY = /* GraphQL */ `
  query recommendations($productId: ID!) {
    productRecommendations(productId: $productId) { ...product }
  }
  ${PRODUCT}
`

export const COLLECTION_QUERY = /* GraphQL */ `
  query collection($handle: String!) {
    collection(handle: $handle) { ...collection }
  }
  ${COLLECTION}
  ${IMAGE}
`

export const COLLECTIONS_QUERY = /* GraphQL */ `
  query collections {
    collections(first: 50) {
      nodes { ...collection }
    }
  }
  ${COLLECTION}
  ${IMAGE}
`

export const COLLECTION_PRODUCTS_QUERY = /* GraphQL */ `
  query collectionProducts($handle: String!, $first: Int!, $after: String, $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {
    collection(handle: $handle) {
      products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse) {
        nodes { ...product }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
  ${PRODUCT}
`

export const POLICIES_QUERY = /* GraphQL */ `
  query policies {
    shop {
      privacyPolicy { title body }
      termsOfService { title body }
      shippingPolicy { title body }
      refundPolicy { title body }
    }
  }
`

// ---------- Cart ----------

export const CART_QUERY = /* GraphQL */ `
  query cart($cartId: ID!) {
    cart(id: $cartId) { ...cart }
  }
  ${CART}
`

export const CART_CREATE = /* GraphQL */ `
  mutation cartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { ...cart }
      userErrors { field message }
    }
  }
  ${CART}
`

export const CART_LINES_ADD = /* GraphQL */ `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...cart }
      userErrors { field message }
    }
  }
  ${CART}
`

export const CART_LINES_UPDATE = /* GraphQL */ `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...cart }
      userErrors { field message }
    }
  }
  ${CART}
`

export const CART_LINES_REMOVE = /* GraphQL */ `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...cart }
      userErrors { field message }
    }
  }
  ${CART}
`

export const CART_DISCOUNT_CODES_UPDATE = /* GraphQL */ `
  mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]!) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart { ...cart }
      userErrors { field message }
    }
  }
  ${CART}
`
