import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { PageIntro } from '@/components/page-intro'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers about Outrider Supply fits, sizing, shipping, returns and care.',
  alternates: { canonical: '/faq' },
}

// TODO: review every answer so it matches how you actually operate.
const FAQS = [
  {
    group: 'Fit & Sizing',
    items: [
      { q: 'What is the difference between TRAIL, CAMP and RIDGE?', a: 'TRAIL is a modern regular fit in 180 GSM cotton. CAMP is a relaxed boxy fit in 220 GSM cotton. RIDGE is our heavyweight oversized fit in 240 GSM cotton.' },
      { q: 'What does GSM mean?', a: 'GSM stands for grams per square meter — it tells you how heavy and substantial the fabric is. The higher the number, the thicker the tee.' },
      { q: 'How do I find my size?', a: 'Check the Size & Fit Guide for garment measurements. TRAIL fits true to size; for RIDGE, size down if you prefer a closer fit.' },
    ],
  },
  {
    group: 'Orders & Shipping',
    items: [
      { q: 'Where do you ship?', a: 'We currently ship within the United States.' },
      { q: 'How long does shipping take?', a: 'Orders ship within 1–3 business days. You will receive a tracking link by email once your order is on its way.' },
      { q: 'Is shipping free?', a: `US orders over $${SITE.freeShippingThreshold} ship free. Shipping costs for smaller orders are shown at checkout.` },
      { q: 'Is checkout secure?', a: 'Yes. Checkout is handled by Shopify, which is PCI DSS Level 1 certified. Your payment details never touch our website.' },
    ],
  },
  {
    group: 'Returns & Care',
    items: [
      { q: 'What is your return policy?', a: `Unworn, unwashed items with tags attached can be returned within ${SITE.returnDays} days of delivery.` },
      { q: 'How should I wash my tee?', a: 'Machine wash cold, inside out, with like colors. Tumble dry low or hang dry to keep the fit and print looking their best.' },
    ],
  },
]

export default function FaqPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.flatMap((g) => g.items).map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageIntro eyebrow="Support" title="Frequently Asked Questions">
        Can&apos;t find what you need?{' '}
        <Link href="/contact" className="text-foreground underline underline-offset-4">Contact us</Link>.
      </PageIntro>
      <div className="mx-auto max-w-[1600px] space-y-16 px-5 pb-24 md:px-10">
        {FAQS.map((group) => (
          <section key={group.group} className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-primary lg:col-span-4">{group.group}</h2>
            <div className="divide-y divide-border border-y border-border lg:col-span-8">
              {group.items.map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-medium tracking-tight [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <Plus className="mt-1 h-5 w-5 shrink-0 transition-transform group-open:rotate-45" strokeWidth={1.5} />
                  </summary>
                  <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
