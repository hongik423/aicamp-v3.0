'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/header';
import { AICapabilityDiagnosisForm } from '@/features/ai-capability-diagnosis/components/AICapabilityDiagnosisForm';
import { Brain, Target, TrendingUp, Users, Award, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

/**
 * 이후경 교장의 AI 역량 고몰입조직구축 진단시스템
 * 웹상 결과 보기 기능은 제거되고 이메일로만 제공됩니다.
 */

export default function DiagnosisPage() {
  const [showForm, setShowForm] = useState(false);

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
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Brain className="w-4 h-4" />
            이후경 교장의 AI 역량진단 시스템
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            AI 도입 준비도<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              무료 진단
            </span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            30년 기업교육 전문가 이후경 교장이 개발한 AI 역량 진단으로
            <span className="block sm:inline"> </span>
            귀사의 AI 도입 준비도를 정확히 측정하고 맞춤형 실행전략을 제시합니다
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 sm:mb-12 px-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-4 text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation"
              onClick={() => setShowForm(true)}
              style={{ minHeight: '56px', touchAction: 'manipulation' }}
            >
              <Brain className="w-5 h-5 mr-2" />
              🚀 무료 AI 역량진단 시작
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