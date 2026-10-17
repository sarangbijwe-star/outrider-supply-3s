import type { ReactNode } from 'react'

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="mx-auto max-w-[1600px] px-5 pb-12 pt-32 md:px-10 md:pb-16 md:pt-44">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
      <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
        {title}
      </h1>
      {children && (
        <div className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          {children}
        </div>
      )}
    </section>
  )
}
