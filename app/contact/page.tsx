import type { Metadata } from 'next'
import Link from 'next/link'
import { PageIntro } from '@/components/page-intro'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Questions about an order, sizing or wholesale? Get in touch with Outrider Supply.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <main>
      <PageIntro eyebrow="Support" title="Get in Touch">
        Questions about an order, sizing or collaborations — we read every message and reply within one business day.
      </PageIntro>
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-px border-y border-border bg-border px-0 md:grid-cols-3">
        <div className="bg-background px-5 py-10 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Email</p>
          <a href={`mailto:${SITE.email}`} className="mt-3 block break-all text-xl font-medium tracking-tight hover:text-sand md:text-2xl">
            {SITE.email}
          </a>
          <a
            href={`mailto:${SITE.email}?subject=${encodeURIComponent('Outrider Supply enquiry')}`}
            className="mt-8 inline-block bg-foreground px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-background transition-colors hover:bg-sand"
          >
            Send us an email
          </a>
        </div>
        <div className="bg-background px-5 py-10 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Order help</p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Include your order number (from your confirmation email) so we can help faster. Tracking links are in your
            shipping confirmation email.
          </p>
          <Link href="/shipping-returns" className="mt-6 inline-block text-xs uppercase tracking-[0.2em] text-sand hover:text-foreground">
            Shipping & Returns →
          </Link>
        </div>
        <div className="bg-background px-5 py-10 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Social</p>
          <ul className="mt-3 space-y-2">
            {SITE.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="text-lg hover:text-sand">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <Link href="/faq" className="mt-6 inline-block text-xs uppercase tracking-[0.2em] text-sand hover:text-foreground">
            Read the FAQ →
          </Link>
        </div>
      </div>
      <div className="pb-24" />
    </main>
  )
}
