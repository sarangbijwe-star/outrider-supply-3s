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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111111',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Orange peak accent */}
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderBottom: '8px solid #C15A2B',
            marginBottom: 1,
          }}
        />
        <div
          style={{
            display: 'flex',
            color: '#F9F9F7',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 0,
            lineHeight: 1,
          }}
        >
          ORS
        </div>
      </div>
    ),
    size,
  )
}
