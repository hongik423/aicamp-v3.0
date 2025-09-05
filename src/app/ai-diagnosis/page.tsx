/**
 * ================================================================================
 * 🚀 AI 역량진단 페이지 (PRD 기반 시스템으로 리다이렉트)
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
import { Button } from '@/components/ui/button';
import { Loader2, ArrowRight, Brain, Zap } from 'lucide-react';

export default function AIDiagnosisPage() {
  const router = useRouter();
  
  useEffect(() => {
    // 사용자 편의성 개선: 바로 PRD 진단 시스템으로 리다이렉트 (안내 화면 없음)
    console.log('🚀 사용자 편의성 개선: 바로 PRD 진단 시스템으로 이동');
    
    // 즉시 리다이렉트 (안내 화면 제거)
    router.push('/prd-diagnosis');
  }, [router]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <Card className="max-w-lg mx-auto">
        <CardContent className="pt-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Brain className="w-10 h-10 text-blue-600" />
          </div>
          
          <h2 className="text-3xl font-semibold mb-4">시스템 업그레이드</h2>
          <p className="text-lg text-gray-600 mb-6">
            PRD 기반 완전한 AI 역량진단 시스템으로 업그레이드되었습니다
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-3">🚀 새로운 기능</h3>
            <div className="grid grid-cols-2 gap-3 text-sm text-blue-800">
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                <span>24페이지 전문가급 보고서</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                <span>업종별 맞춤 분석</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                <span>실행 가능한 로드맵</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                <span>Git 품질 보장</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-blue-600 mb-6">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>PRD 기반 시스템으로 이동 중</span>
            <ArrowRight className="w-4 h-4 animate-pulse" />
          </div>
          
          <div className="space-y-3">
            <Button
              onClick={() => router.push('/prd-diagnosis')}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Brain className="w-5 h-5 mr-2" />
              즉시 새 시스템으로 이동
            </Button>
            
            <Button
              variant="outline"
              onClick={() => router.push('/prd-system')}
              className="w-full"
            >
              시스템 소개 페이지 보기
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            자동 리다이렉트: 3초 후 새 시스템으로 이동합니다
          </p>
        </CardContent>
      </Card>
    </div>
  );
}