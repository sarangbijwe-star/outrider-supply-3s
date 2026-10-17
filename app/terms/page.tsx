import type { Metadata } from 'next'
import { PageIntro } from '@/components/page-intro'
import { PolicyBody, PolicyMissing } from '@/components/policy-body'
import { getPolicies } from '@/lib/shopify'

export const metadata: Metadata = { title: 'Terms of Service', alternates: { canonical: '/terms' } }

export default async function TermsPage() {
  const { termsOfService } = await getPolicies()
  return (
    <main>
      <PageIntro eyebrow="Legal" title="Terms of Service" />
      <div className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10">
        {termsOfService?.body ? <PolicyBody html={termsOfService.body} /> : <PolicyMissing name="terms of service" />}
      </div>
    </main>
  )
}
