// Renders policy HTML written in Shopify Admin → Settings → Policies.
export function PolicyBody({ html }: { html: string }) {
  return (
    <div
      className="max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_h1]:text-2xl [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:mt-8 [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:ml-5 [&_ol]:list-decimal [&_strong]:text-foreground [&_ul]:list-disc"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export function PolicyMissing({ name }: { name: string }) {
  return (
    <div className="max-w-3xl border border-dashed border-border p-8 text-muted-foreground">
      <p className="text-foreground">Our {name} is being finalized.</p>
      <p className="mt-2 text-sm">
        Questions in the meantime? Email us — we&apos;re happy to help.
      </p>
    </div>
  )
}
