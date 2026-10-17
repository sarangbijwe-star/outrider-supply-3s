import type { Metadata } from 'next'
import Link from 'next/link'
import { PageIntro } from '@/components/page-intro'
import { PolicyBody } from '@/components/policy-body'
import { getPolicies } from '@/lib/shopify'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Shipping & Returns',
  description: `Free US shipping on orders over $${SITE.freeShippingThreshold}. ${SITE.returnDays}-day returns on unworn items.`,
  alternates: { canonical: '/shipping-returns' },
}

// TODO: confirm these summaries match your Shopify shipping rates and refund policy.
const SUMMARY = [
  { title: 'Free US Shipping', body: `On all orders over $${SITE.freeShippingThreshold}. Flat-rate shipping applies below that, shown at checkout.` },
  { title: 'Processing Time', body: 'Orders ship within 1–3 business days. You will get a tracking link by email as soon as your order ships.' },
  { title: `${SITE.returnDays}-Day Returns`, body: `Return unworn, unwashed items with tags attached within ${SITE.returnDays} days of delivery.` },
  { title: 'Exchanges', body: 'Need a different size? Contact us and we will help you swap it as quickly as possible.' },
]

export default async function ShippingReturnsPage() {
  const { shippingPolicy, refundPolicy } = await getPolicies()
  return (
    <main>
      <PageIntro eyebrow="Support" title="Shipping & Returns">
        We ship across the United States. Questions?{' '}
        <Link href="/contact" className="text-foreground underline underline-offset-4">Get in touch</Link>.
      </PageIntro>
      <div className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10">
        <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {SUMMARY.map((s) => (
            <div key={s.title} className="bg-background p-6 md:p-8">
              <h2 className="text-lg font-semibold tracking-tight">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
        {shippingPolicy?.body && (
          <section className="mt-20">
            <h2 className="mb-6 text-3xl font-semibold tracking-tight">{shippingPolicy.title}</h2>
            <PolicyBody html={shippingPolicy.body} />
          </section>
        )}
        {refundPolicy?.body && (
          <section className="mt-20">
            <h2 className="mb-6 text-3xl font-semibold tracking-tight">{refundPolicy.title}</h2>
            <PolicyBody html={refundPolicy.body} />
          </section>
        )}
      </div>
    </main>
  )
}
