'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/header';
import { AICapabilityDiagnosisForm } from '@/features/ai-capability-diagnosis/components/AICapabilityDiagnosisForm';
import { Brain, Target, TrendingUp, Users, Award, BarChart3, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

/**
 * 이후경 교장의 AI 역량 고몰입조직구축 진단시스템
 * 웹상 결과 보기 기능은 제거되고 이메일로만 제공됩니다.
 */

export default function DiagnosisPage() {
  const [showForm, setShowForm] = useState(false);
  const [accentHero, setAccentHero] = useState(false);
  const [accentHeroIcon, setAccentHeroIcon] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.matchMedia('(max-width: 640px)').matches);
    }
  }, []);
  const ACCENT_DURATION_MS = isMobile ? 1800 : 1200;

  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <AICapabilityDiagnosisForm />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      
      {/* 메인 섹션 */}
      <main className="container mx-auto px-4 py-12">
        {/* 히어로 섹션 */}
        <div className="text-center mb-16 relative">
          {/* 배경 장식 요소 */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 left-1/4 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-20 right-1/4 w-24 h-24 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          {/* 교장 소개 배지 */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 px-6 py-3 rounded-full text-lg sm:text-xl font-bold mb-8 shadow-lg border border-purple-200 animate-fade-in-up">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-purple-300 shadow-sm">
              <Image
                src="/images/aicamp_leader3.png"
                alt="이후경 교장"
                width={32}
                height={32}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <Brain className="w-6 h-6 animate-pulse" />
            이후경 교장의 AI 역량진단 시스템
            <Sparkles className="w-5 h-5 text-yellow-500 animate-bounce" />
          </div>
          
          {/* 메인 타이틀 */}
          <div className="relative mb-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight animate-fade-in-up delay-200">
              AI 도입 준비도<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient-x">
                무료 진단
              </span>
            </h1>
            
            {/* 반짝이는 효과 */}
            <div className="absolute -top-4 -right-4 w-6 h-6 text-yellow-400 animate-spin-slow opacity-70">
              <Sparkles className="w-full h-full" />
            </div>
          </div>
          
          {/* 설명 텍스트 */}
          <div className="relative">
            <div className="flex items-center justify-center gap-4 mb-4 animate-fade-in-up delay-300">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-400 to-purple-400 shadow-xl">
                <Image
                  src="/images/aicamp_leader3.png"
                  alt="이후경 교장"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
                  priority
                />
              </div>
              <div className="text-left">
                <div className="text-sm sm:text-base font-semibold text-purple-700 mb-1">30년 기업교육 전문가</div>
                <div className="text-lg sm:text-xl font-bold text-gray-800">이후경 교장</div>
                <div className="text-xs sm:text-sm text-gray-600">AI 역량진단 시스템 개발자</div>
              </div>
            </div>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4 animate-fade-in-up delay-400">
              검증된 AI 역량 진단으로 귀사의 AI 도입 준비도를 정확히 측정하고
              <span className="block sm:inline"> </span>
              <span className="font-semibold text-blue-700">맞춤형 실행전략</span>을 제시합니다
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 sm:mb-12 px-4">
            <Button 
              size="lg" 
              onMouseDown={() => setAccentHero(true)}
              onMouseUp={() => setAccentHero(false)}
              className={`group w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-4 text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation ${accentHero ? 'mix-blend-difference animate-pulse' : ''}`}
              onClick={() => setShowForm(true)}
              style={{ minHeight: '56px', touchAction: 'manipulation' }}
            >
              <Brain className={`w-5 h-5 mr-2 ${accentHeroIcon ? 'mix-blend-difference animate-pulse' : ''} group-hover:mix-blend-difference transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`} />
              <span className={`${accentHero ? 'mix-blend-difference animate-pulse' : ''} group-hover:mix-blend-difference transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}>🚀 무료 AI 역량진단 시작</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600 px-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">무료</Badge>
              <span className="font-medium">100% 무료 진단</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">5분</Badge>
              <span className="font-medium">5분 간단 진단</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">AI분석</Badge>
              <span className="font-medium">AI 기반 정밀분석</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs">이메일발송</Badge>
              <span className="font-medium">이메일로 결과 발송</span>
            </div>
          </div>
        </div>

        {/* 진단 특징 - 모바일 최적화 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 px-4">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">정밀한 6분야 분석</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                리더십, 인프라, 인재, 문화, 실무적용, 데이터 등 6개 핵심 영역을 종합적으로 분석합니다
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">AI 기반 맞춤 분석</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                GEMINI 2.5 Flash AI가 귀사의 업종과 규모를 고려한 개인화된 분석을 제공합니다
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">실행 가능한 로드맵</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                진단 결과를 바탕으로 3단계 실행 로드맵과 구체적인 액션플랜을 제시합니다
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}