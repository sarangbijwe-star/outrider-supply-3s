import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[80svh] max-w-[1600px] flex-col justify-center px-5 pt-24 md:px-10">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">404 — Off the map</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">This trail doesn&apos;t go anywhere.</h1>
      <Link
        href="/shop"
        className="mt-10 w-fit bg-foreground px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-background transition-colors hover:bg-sand"
      >
        Back to the shop
      </Link>
    </main>
  )
}
