'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DiagnosisFormPage() {
  const router = useRouter();

  useEffect(() => {
    // 직접 입력 페이지로 리다이렉트
    router.push('/diagnosis');
  }, [router]);

  return null;
}