import { FIT_COLLECTIONS } from '@/lib/collections'
import { SIZE_CHARTS, SIZE_COLUMNS } from '@/lib/size-guide'

export function SizeChartTable({ handle }: { handle: 'trail' | 'camp' | 'ridge' }) {
  const chart = SIZE_CHARTS.find((c) => c.handle === handle)
  const fit = FIT_COLLECTIONS.find((c) => c.handle === handle)
  if (!chart || !fit) return null

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xl font-semibold tracking-tight">
          {fit.name} <span className="text-muted-foreground">— {fit.fit}</span>
        </h3>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          {fit.gsm} GSM · Inches
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 pr-4 text-left font-mono text-[10px] font-normal uppercase tracking-[0.2em] text-muted-foreground">
                Measurement
              </th>
              {SIZE_COLUMNS.map((s) => (
                <th key={s} className="px-2 py-3 text-center font-semibold">
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chart.rows.map((row) => (
              <tr key={row.label} className="border-b border-border">
                <td className="py-3 pr-4 text-muted-foreground">{row.label}</td>
                {row.values.map((v, i) => (
                  <td key={i} className="px-2 py-3 text-center tabular-nums">
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{chart.note}</p>
    </div>
  )
}
