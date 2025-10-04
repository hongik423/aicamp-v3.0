'use client'

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

/**
 * 중복 진단 보고서 페이지 - 메인 페이지로 리디렉션
 * 메인 페이지: /diagnosis-results/[diagnosisId]
 */
export default function DiagnosisReportRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const diagnosisId = params?.diagnosisId as string;

  useEffect(() => {
    if (diagnosisId) {
      console.log('🔄 중복 보고서 페이지 접근 감지, 메인 페이지로 리디렉션:', diagnosisId);
      
      // 메인 진단 결과 페이지로 리디렉션
      router.replace(`/diagnosis-results/${diagnosisId}`);
    }
  }, [diagnosisId, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">진단 결과 페이지로 이동 중...</p>
      </div>
    </div>
  );
}