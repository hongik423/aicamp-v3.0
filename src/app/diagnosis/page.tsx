'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * AI역량진단 리다이렉트 페이지
 * /diagnosis 경로를 /services/diagnosis로 리다이렉트합니다.
 */
export default function DiagnosisPage() {
  const router = useRouter();

  // AI역량진단 신청서로 자동 리다이렉트
  useEffect(() => {
    router.push('/services/diagnosis');
  }, [router]);

  // 로딩 중 표시
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">AI역량진단 신청서로 이동 중...</h2>
        <p className="text-gray-500 mt-2">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}