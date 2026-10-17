// Garment measurements in inches, measured flat.
// TODO (before launch): replace these PLACEHOLDER numbers with the final
// measurements from your tech packs / factory spec sheets.

export const SIZE_COLUMNS = ['S', 'M', 'L', 'XL', 'XXL'] as const

export type SizeChart = {
  handle: 'trail' | 'camp' | 'ridge'
  note: string
  rows: { label: string; values: number[] }[]
}

export const SIZE_CHARTS: SizeChart[] = [
  {
    handle: 'trail',
    note: 'True to size. Take your usual size for a clean, modern fit.',
    rows: [
      { label: 'Chest (pit to pit)', values: [19, 20.5, 22, 23.5, 25] },
      { label: 'Body length', values: [27.5, 28.5, 29.5, 30.5, 31.5] },
      { label: 'Sleeve length', values: [8, 8.25, 8.5, 8.75, 9] },
    ],
  },
  {
    handle: 'camp',
    note: 'Relaxed and boxy by design. Take your usual size; size down for a closer fit.',
    rows: [
      { label: 'Chest (pit to pit)', values: [21, 22.5, 24, 25.5, 27] },
      { label: 'Body length', values: [26.5, 27.5, 28.5, 29.5, 30.5] },
      { label: 'Sleeve length', values: [8.5, 8.75, 9, 9.25, 9.5] },
    ],
  },
  {
    handle: 'ridge',
    note: 'Cut oversized with a dropped shoulder. Size down one for a more classic fit.',
    rows: [
      { label: 'Chest (pit to pit)', values: [22.5, 24, 25.5, 27, 28.5] },
      { label: 'Body length', values: [28, 29, 30, 31, 32] },
      { label: 'Sleeve length', values: [9, 9.25, 9.5, 9.75, 10] },
    ],
  },
]

export const HOW_TO_MEASURE = [
  {
    title: 'Chest',
    body: 'Lay a tee you love flat. Measure straight across, one inch below the armpits, from seam to seam.',
  },
  {
    title: 'Body length',
    body: 'Measure from the highest point of the shoulder, next to the collar, straight down to the hem.',
  },
  {
    title: 'Sleeve length',
    body: 'Measure from the shoulder seam to the end of the sleeve opening.',
  },
]
