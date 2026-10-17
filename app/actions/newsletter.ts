'use server'

import { headers } from 'next/headers'
import { subscribeToNewsletter } from '@/lib/shopify'

export type NewsletterResult = { ok: true } | { ok: false; error: string }

export async function subscribe(email: string, honeypot = ''): Promise<NewsletterResult> {
  if (honeypot) return { ok: true } // bots fill hidden fields
  const clean = email.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean) || clean.length > 254) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }
  try {
    const h = await headers()
    await subscribeToNewsletter(clean, h.get('x-forwarded-for')?.split(',')[0]?.trim())
    return { ok: true }
  } catch (e) {
    if (e instanceof Error && e.message === 'NOT_CONNECTED') {
      return { ok: false, error: 'Sign-up opens when the store launches (demo mode).' }
    }
    console.error('[newsletter]', e)
    return { ok: false, error: 'Something went wrong. Please try again.' }
  }
}
