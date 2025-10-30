/**
 * ================================================================================
 * 🚀 AI 역량진단 페이지 (기존 완벽한 시스템 + PRD 보고서)
 * ================================================================================
 * 
 * @fileoverview 기존 검증된 입력 시스템 + PRD 기반 24페이지 보고서
 * @version 2.0.0
 * @encoding UTF-8
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, 
  FileText, 
  BarChart3, 
  Target, 
  Users, 
  Zap, 
  CheckCircle2, 
  Clock,
  Award,
  Shield,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import Real45QuestionForm from '@/features/ai-diagnosis/components/Real45QuestionForm';

export default function AIDiagnosisPage() {
  const [showIntro, setShowIntro] = useState(true);
  
  // 진단 시작 핸들러
  const handleStartDiagnosis = () => {
    console.log('🚀 AI 역량진단 시작 (기존 완벽한 시스템 + PRD 보고서)');
    setShowIntro(false);
  };
  
  // 소개 화면 렌더링
  if (showIntro) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          {/* 🚀 사용자 편의성 개선: 상단에 즉시 시작 버튼 */}
          <div className="text-center mb-8">
            <div className="rounded-3xl p-8 mb-12 bg-gray-900 text-white">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                <Brain className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                AI 역량진단 시스템
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                15분 진단으로 24페이지 전문가급 보고서를 받아보세요
              </p>
              
              <Button
                onClick={handleStartDiagnosis}
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 px-16 py-6 text-xl font-bold rounded-md"
              >
                <Brain className="w-8 h-8 mr-4" />
                AI 역량진단 시작하기
              </Button>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                <div className="flex items-center justify-center text-blue-100">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>15분 소요</span>
                </div>
                <div className="flex items-center justify-center text-blue-100">
                  <FileText className="w-4 h-4 mr-2" />
                  <span>24페이지 보고서</span>
                </div>
                <div className="flex items-center justify-center text-blue-100">
                  <Award className="w-4 h-4 mr-2" />
                  <span>전문가급 분석</span>
                </div>
                <div className="flex items-center justify-center text-blue-100">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Git 품질 보장</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 시스템 개선 알림 */}
          <Alert className="mb-12 border-green-200 bg-green-50">
            <Sparkles className="h-5 w-5 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>🎉 시스템 업그레이드 완료!</strong>
              <br />
              • 기존 검증된 입력 시스템 유지 + PRD 기반 24페이지 보고서 제공
              <br />
              • 45문항 6개 영역 평가 구조 완전 동일 + 사실기반 병렬 처리 유지
              <br />
              • Git 품질 기준 100% 준수 + 업종별 맞춤 분석 추가
            </AlertDescription>
          </Alert>
          
          {/* 핵심 특징 */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center hover:shadow-lg transition-shadow border-blue-200">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>45문항 정밀 진단</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  6개 핵심 영역의 체계적 평가로 정확한 AI 역량 수준을 측정합니다
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>사업 기반</span>
                    <Badge variant="outline">8문항</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>현재 AI 활용</span>
                    <Badge variant="outline">8문항</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>조직 준비도</span>
                    <Badge variant="outline">8문항</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>기술 인프라</span>
                    <Badge variant="outline">8문항</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>전략 명확성</span>
                    <Badge variant="outline">8문항</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>실행 역량</span>
                    <Badge variant="outline">5문항</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow border-green-200">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>24페이지 PRD 보고서</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  McKinsey 수준의 상세한 분석 보고서를 제공합니다
                </p>
                <div className="space-y-2 text-sm text-left">
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                    <span>Executive Summary</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                    <span>업종별 벤치마킹</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                    <span>SWOT 분석</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                    <span>실행 가능한 로드맵</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                    <span>ROI 분석</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow border-purple-200">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>업종별 맞춤 분석</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  10개 주요 업종별 특화된 AI 활용 방안과 벤치마킹을 제공합니다
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Badge variant="outline">제조업</Badge>
                  <Badge variant="outline">IT/소프트웨어</Badge>
                  <Badge variant="outline">금융업</Badge>
                  <Badge variant="outline">의료업</Badge>
                  <Badge variant="outline">유통업</Badge>
                  <Badge variant="outline">교육업</Badge>
                  <Badge variant="outline">건설업</Badge>
                  <Badge variant="outline">운송업</Badge>
                  <Badge variant="outline">농업</Badge>
                  <Badge variant="outline">서비스업</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* 하단 강화된 시작 버튼 */}
          <div className="text-center">
            <div className="bg-gray-50 rounded-3xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                🚀 지금 바로 시작하세요!
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                검증된 입력 시스템으로 안전하게 진단하고, PRD 기반 24페이지 보고서를 받아보세요
              </p>
              
              <Button
                onClick={handleStartDiagnosis}
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white px-16 py-6 text-xl font-bold rounded-md"
              >
                <Brain className="w-8 h-8 mr-4" />
                AI 역량진단 시작하기
              </Button>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-sm text-gray-600">
                <div className="flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                  <span>기존 검증된 입력창</span>
                </div>
                <div className="flex items-center justify-center">
                  <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                  <span>PRD 기반 보고서</span>
                </div>
                <div className="flex items-center justify-center">
                  <Shield className="w-4 h-4 mr-2 text-blue-500" />
                  <span>Git 품질 보장</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 기술 정보 */}
          <div className="mt-16 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              🛠️ 하이브리드 시스템 구조
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary">기존 검증된 입력창</Badge>
              <Badge variant="secondary">PRD 기반 보고서</Badge>
              <Badge variant="secondary">45문항 6개 영역</Badge>
              <Badge variant="secondary">사실기반 병렬 처리</Badge>
              <Badge variant="secondary">24페이지 분석</Badge>
              <Badge variant="secondary">Git 품질 100%</Badge>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // 진단 진행 화면 (기존 완벽한 시스템 사용)
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 상단 진행 상태 */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Brain className="w-8 h-8 text-green-600" />
                <div>
                  <h2 className="text-xl font-semibold text-green-900">AI 역량진단 진행 중</h2>
                  <p className="text-green-700">기존 검증된 시스템 + PRD 기반 24페이지 보고서</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-green-600">
                  <Sparkles className="w-4 h-4 mr-1" />
                  PRD 업그레이드
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* 기존 완벽한 진단 폼 */}
        <Real45QuestionForm />
      </div>
    </div>
  );
}