import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111111',
          color: '#F9F9F7',
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          fontFamily: 'monospace',
          border: '2px solid #556B2F',
          borderRadius: 4,
        }}
      >
        OR
      </div>
    ),
    size,
  )
}
