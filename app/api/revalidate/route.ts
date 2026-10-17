import { createHmac, timingSafeEqual } from 'node:crypto'
import { revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'
import { TAGS } from '@/lib/shopify'

// Shopify calls this URL whenever a product, collection or inventory changes,
// so the website updates within seconds instead of waiting for the cache.
// Set up in Shopify Admin → Settings → Notifications → Webhooks (see SETUP-GUIDE.md).

export async function POST(req: NextRequest) {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET
  if (!secret) return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })

  const body = await req.text()
  const signature = req.headers.get('x-shopify-hmac-sha256') ?? ''
  const digest = createHmac('sha256', secret).update(body, 'utf8').digest('base64')

  const valid =
    signature.length === digest.length && timingSafeEqual(Buffer.from(signature), Buffer.from(digest))
  if (!valid) return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })

  const topic = req.headers.get('x-shopify-topic') ?? ''
  if (topic.startsWith('collections/')) revalidateTag(TAGS.collections, 'max')
  if (topic.startsWith('products/') || topic.startsWith('inventory_levels/')) {
    revalidateTag(TAGS.products, 'max')
    revalidateTag(TAGS.collections, 'max')
  }

  return NextResponse.json({ revalidated: true, topic })
}
