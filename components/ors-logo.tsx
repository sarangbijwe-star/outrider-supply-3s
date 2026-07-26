import type { SVGProps } from 'react'

/**
 * OutRider Supply mountain mark — a clean line-art peak range with an
 * orange summit accent, matching the official brand lockup.
 */
export function OrsMountainMark({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 40"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* Orange summit accent */}
      <path
        d="M32 6 L40 22 H24 Z"
        fill="var(--brand)"
      />
      {/* Main range outline */}
      <path
        d="M4 34 L20 12 L28 22 L34 14 L44 30 L52 20 L60 34"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

/**
 * ORS hexagon monogram badge — used as the compact brand mark.
 */
export function OrsMonogram({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* Hexagon shield */}
      <path
        d="M50 4 L88 26 V74 L50 96 L12 74 V26 Z"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      {/* Orange peak */}
      <path d="M50 20 L58 34 H42 Z" fill="var(--brand)" />
      {/* ORS letters */}
      <text
        x="50"
        y="66"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="30"
        fontWeight="700"
        letterSpacing="1"
        fill="currentColor"
      >
        ORS
      </text>
    </svg>
  )
}

/**
 * Full OutRider Supply lockup: mountain mark above the stacked wordmark
 * with orange dash accents flanking "SUPPLY".
 */
export function OutriderLogo({
  className,
  compact = false,
}: {
  className?: string
  compact?: boolean
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ''}`}>
      <OrsMountainMark className={compact ? 'h-5 w-8' : 'h-6 w-10'} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-sans font-bold uppercase tracking-[0.22em] text-foreground ${
            compact ? 'text-sm' : 'text-base'
          }`}
        >
          Outrider
        </span>
        <span className="mt-1 flex items-center gap-1.5">
          <span className="h-px w-2.5 bg-brand" />
          <span
            className={`font-sans font-medium uppercase tracking-[0.42em] text-muted-foreground ${
              compact ? 'text-[9px]' : 'text-[10px]'
            }`}
          >
            Supply
          </span>
          <span className="h-px w-2.5 bg-brand" />
        </span>
      </span>
    </span>
  )
}
