/**
 * ================================================================================
 * 🚀 보고서 조회 페이지 (PRD 기반 시스템으로 리다이렉트)
 * ================================================================================
 * 
 * @fileoverview 기존 URL 호환성을 위해 PRD 기반 시스템으로 자동 리다이렉트
 * @version 1.0.0
 * @encoding UTF-8
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ArrowRight } from 'lucide-react';

export default function ReportAccessPage() {
  const router = useRouter();
  
  useEffect(() => {
    // 사용자 편의성 개선: 바로 PRD 보고서 조회 시스템으로 리다이렉트 (안내 화면 없음)
    console.log('🚀 사용자 편의성 개선: 바로 PRD 보고서 조회 시스템으로 이동');
    
    // 즉시 리다이렉트 (안내 화면 제거)
    router.push('/prd-report-access');
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
            <Loader2 className="w-8 h-8 text-gray-700 animate-spin" />
        </div>

          <h2 className="text-2xl font-semibold mb-4">시스템 업데이트</h2>
          <p className="text-gray-600 mb-6">
            PRD 기반 새로운 보고서 조회 시스템으로 이동하고 있습니다
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-gray-700">
            <span className="text-sm">PRD 기반 시스템으로 이동 중</span>
            <ArrowRight className="w-4 h-4" />
                  </div>

          <div className="mt-6 text-xs text-gray-500">
            <p>✅ 24페이지 완전한 보고서</p>
            <p>✅ 업종별 맞춤 분석</p>
            <p>✅ Git 품질 기준 준수</p>
              </div>
            </CardContent>
          </Card>
    </div>
  );
}
