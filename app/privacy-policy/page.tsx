import type { Metadata } from 'next'
import { PageIntro } from '@/components/page-intro'
import { PolicyBody, PolicyMissing } from '@/components/policy-body'
import { getPolicies } from '@/lib/shopify'

export const metadata: Metadata = { title: 'Privacy Policy', alternates: { canonical: '/privacy-policy' } }

export default async function PrivacyPage() {
  const { privacyPolicy } = await getPolicies()
  return (
    <main>
      <PageIntro eyebrow="Legal" title="Privacy Policy" />
      <div className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10">
        {privacyPolicy?.body ? <PolicyBody html={privacyPolicy.body} /> : <PolicyMissing name="privacy policy" />}
      </div>
    </main>
  )
}
