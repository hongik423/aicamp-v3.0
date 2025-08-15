'use client'

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    // 🛡️ Service Worker 등록은 layout.tsx에서 통합 관리됨
    // 중복 등록 방지를 위해 이 컴포넌트는 비활성화
    console.log('ℹ️ Service Worker는 layout.tsx에서 통합 관리됩니다.');
  }, []);

  return null; // UI 렌더링 없음
}
