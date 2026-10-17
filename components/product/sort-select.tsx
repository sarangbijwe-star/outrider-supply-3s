'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SORT_OPTIONS as OPTIONS } from '@/lib/sort'

export function SortSelect() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  return (
    <label className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
      Sort
      <select
        value={params.get('sort') ?? 'featured'}
        onChange={(e) => {
          const next = new URLSearchParams(params)
          if (e.target.value === 'featured') next.delete('sort')
          else next.set('sort', e.target.value)
          const qs = next.toString()
          router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
        }}
        className="border border-border bg-background px-3 py-2 font-sans text-xs normal-case tracking-normal text-foreground focus:outline-none focus-visible:border-foreground"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}
