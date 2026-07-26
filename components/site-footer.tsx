const COLUMNS = [
  {
    title: 'Shop',
    links: ['Graphic Tees', 'Cargo Pants', 'Denim', 'Hoodies', 'Overshirts'],
  },
  {
    title: 'Company',
    links: ['Our Story', 'Sustainability', 'Careers', 'Stores', 'Press'],
  },
  {
    title: 'Support',
    links: ['Shipping', 'Returns', 'Size Guide', 'Contact', 'FAQ'],
  },
]

const SOCIALS = [
  { short: 'IG', label: 'Instagram' },
  { short: 'YT', label: 'YouTube' },
  { short: 'TT', label: 'TikTok' },
  { short: 'X', label: 'X / Twitter' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3">
            <a href="#top" className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-foreground/40 font-mono text-xs font-bold tracking-[0.02em] text-foreground">
                OR
              </span>
              <span className="font-mono text-lg font-bold uppercase tracking-[0.25em]">
                OutRider<span className="text-primary">.</span>
              </span>
            </a>
            <p className="mt-6 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
              Premium outdoor-inspired streetwear built for exploration — from
              city streets to mountain trails.
            </p>
            <div className="mt-8 flex items-center gap-3">
              {SOCIALS.map(({ short, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border font-mono text-[10px] font-medium tracking-[0.1em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  {short}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-foreground/80 transition-colors hover:text-sand"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Oversized wordmark */}
        <div className="mt-16 overflow-hidden border-t border-border pt-10">
          <p className="select-none text-center text-[18vw] font-semibold leading-none tracking-tighter text-foreground/[0.04] md:text-[13vw]">
            BEYOND LIMITS
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} OutRider Supply. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
