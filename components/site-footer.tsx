import Link from 'next/link'
import { OutriderLogo } from '@/components/ors-logo'
import { FOOTER_COLUMNS, SITE } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3">
            <Link href="/" aria-label={`${SITE.name} home`}>
              <OutriderLogo />
            </Link>
            <p className="mt-6 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
              Premium American outdoor-inspired menswear — built for the space between the city and the wild.
            </p>
            <div className="mt-8 flex items-center gap-3">
              {SITE.socials.map(({ short, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border font-mono text-[10px] font-medium tracking-[0.1em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  {short}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith('http') ? (
                      <a href={link.href} target="_blank" rel="noreferrer" className="text-sm text-foreground/80 transition-colors hover:text-sand">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-foreground/80 transition-colors hover:text-sand">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Oversized wordmark */}
        <div className="mt-16 overflow-hidden border-t border-border pt-10">
          <p
            aria-hidden="true"
            className="select-none text-center text-[18vw] font-semibold uppercase leading-none tracking-tighter text-foreground/[0.04] md:text-[13vw]"
          >
            {SITE.tagline}
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link href="/shipping-returns" className="transition-colors hover:text-foreground">
              Refunds
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
