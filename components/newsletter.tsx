'use client'

import { useState, useTransition } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { subscribe } from '@/app/actions/newsletter'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    startTransition(async () => {
      const result = await subscribe(email, website)
      if (result.ok) setSubmitted(true)
      else setError(result.error)
    })
  }

  return (
    <section className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-4xl px-5 py-24 text-center md:px-10 md:py-36">
        <Reveal>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-brand">
            07 — Join the Expedition
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl">
            Be first beyond the limits.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            Early access to drops, field stories, and members-only releases. No
            noise — just the good stuff.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          {submitted ? (
            <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-3 border-b border-sand py-4 text-sand">
              <Check className="h-5 w-5" strokeWidth={1.5} />
              <span className="text-sm uppercase tracking-[0.15em]">
                You&apos;re on the list. Welcome aboard.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-10 flex max-w-md items-center gap-2 border-b border-border pb-2 focus-within:border-foreground"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError(null)
                }}
                placeholder="Enter your email"
                aria-label="Email address"
                className="flex-1 bg-transparent px-1 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              {/* Hidden from people; catches spam bots */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="hidden"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                disabled={isPending}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background transition-colors hover:bg-sand disabled:opacity-50"
              >
                <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </form>
          )}
          {error && (
            <p role="alert" className="mt-4 text-sm text-muted-foreground">
              {error}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
