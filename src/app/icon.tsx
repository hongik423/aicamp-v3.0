import { ImageResponse } from 'next/og';

export const size = {
  width: 48,
  height: 48,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      // 간단한 배경 + 문자 아이콘
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
          color: '#ffffff',
          fontSize: 28,
          fontWeight: 800,
          letterSpacing: -1,
        }}
      >
        A
      </div>
    ),
    size
  );
}


