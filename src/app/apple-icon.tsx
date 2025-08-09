import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
          color: '#60a5fa',
          fontSize: 72,
          fontWeight: 900,
          letterSpacing: -2,
        }}
      >
        A
      </div>
    ),
    size
  );
}


