import Link from 'next/link'
import { Suspense } from 'react'
import { SortSelect } from '@/components/product/sort-select'
import { FIT_COLLECTIONS } from '@/lib/collections'

const LINKS = [{ label: 'All', href: '/shop' }, ...FIT_COLLECTIONS.map((c) => ({ label: c.name, href: `/collections/${c.handle}` }))]

export function CollectionNav({ active, count }: { active: string; count: number }) {
  return (
    <div className="sticky top-16 z-30 border-y border-border bg-background/90 backdrop-blur-xl md:top-20">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-3 md:px-10">
        <nav className="flex items-center gap-1 overflow-x-auto" aria-label="Collections">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? 'page' : undefined}
              className={`shrink-0 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                active === l.href ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-6">
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:inline">
            {count} {count === 1 ? 'Product' : 'Products'}
          </span>
          <Suspense>
            <SortSelect />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
