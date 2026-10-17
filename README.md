# OUTRIDER SUPPLY — Storefront

Premium outdoor-inspired menswear. Custom Next.js storefront on Vercel, connected to Shopify (headless) for products, cart and secure checkout.

**Start here → [SETUP-GUIDE.md](SETUP-GUIDE.md)**: the recommended approach, costs, Shopify setup, domain/DNS, testing and launch checklists.

## Run locally

```bash
npx pnpm@9 install
npx pnpm@9 dev
```

Open http://localhost:3000. Without Shopify credentials, the site runs in **demo mode** with sample products. Copy `.env.example` to `.env.local` and fill it in to use your real store.

## Where things live

| Folder / file | What it is |
|---|---|
| `lib/shopify/` | Shopify Storefront API client (server-only), queries, demo catalog |
| `app/actions/cart.ts` | Cart server actions (cart ID kept in an httpOnly cookie) |
| `components/cart/` | Bag drawer, bag page, checkout button |
| `components/product/` | Product cards, product page, sorting |
| `lib/site.ts`, `lib/collections.ts`, `lib/size-guide.ts` | Brand settings, TRAIL/CAMP/RIDGE details, size charts |
| `app/api/revalidate` | Shopify webhook → instant product updates |
