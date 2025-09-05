/**
 * ================================================================================
 * 🚀 PRD 기반 AI 역량진단 페이지
 * ================================================================================
 * 
 * @fileoverview PRD 요구사항에 완벽히 부합하는 Next.js 페이지 컴포넌트
 * @version 1.0.0
 * @encoding UTF-8
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import PRDDiagnosisForm from '@/features/ai-diagnosis/components/PRDDiagnosisForm';
import { UserInputData } from '@/types/ai-diagnosis-prd.types';
import { 
  Brain, 
  BarChart3, 
  Target, 
  Users, 
  Zap, 
  CheckCircle2, 
  Clock,
  TrendingUp,
  Shield,
  Award,
  Building2
} from 'lucide-react';

interface DiagnosisPageState {
  isStarted: boolean;
  progress: number;
  isCompleted: boolean;
  diagnosisId?: string;
}

export default function PRDDiagnosisPage() {
  // ================================================================================
  // 📋 상태 관리
  // ================================================================================
  
  const [pageState, setPageState] = useState<DiagnosisPageState>({
    isStarted: false,
    progress: 0,
    isCompleted: false
  });
  
  const [showIntro, setShowIntro] = useState(true);
  
  // ================================================================================
  // 📋 이벤트 핸들러
  // ================================================================================
  
  /**
   * 진단 시작
   */
  const handleStartDiagnosis = () => {
    console.log('🚀 PRD 기반 AI 역량진단 시작');
    setPageState(prev => ({ ...prev, isStarted: true }));
    setShowIntro(false);
  };
  
  /**
   * 진행률 업데이트
   */
  const handleProgressUpdate = (progress: number) => {
    setPageState(prev => ({ ...prev, progress }));
  };
  
  /**
   * 진단 완료
   */
  const handleDiagnosisComplete = (data: UserInputData) => {
    console.log('✅ PRD 기반 AI 역량진단 완료', data);
    setPageState(prev => ({ 
      ...prev, 
      isCompleted: true, 
      progress: 100 
    }));
  };
  
  // ================================================================================
  // 📋 소개 섹션 렌더링
  // ================================================================================
  
  const renderIntroSection = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Brain className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI 역량진단 시스템
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            PRD 기반 전문가급 AI 역량 분석
          </p>
          <p className="text-lg text-gray-500">
            15분 진단으로 24페이지 맞춤형 보고서를 받아보세요
          </p>
        </div>
        
        {/* 핵심 특징 */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>45문항 정밀 진단</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                6개 핵심 영역의 체계적 평가로 
                정확한 AI 역량 수준을 측정합니다
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>업종별 맞춤 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                10개 주요 업종별 특화된 
                AI 활용 방안과 벤치마킹을 제공합니다
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>실행 가능한 로드맵</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                즉시 실행 가능한 3-6-12개월 
                단계별 AI 도입 계획을 제시합니다
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* 진단 과정 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              🔍 진단 과정 (총 4단계)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">1단계: 기본 정보</h3>
                <p className="text-sm text-gray-600">
                  회사 정보 및 담당자 정보 입력
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <Building2 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">2단계: 회사 정보</h3>
                <p className="text-sm text-gray-600">
                  업종, 규모, 소재지 등 상세 정보
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">3단계: AI 역량 평가</h3>
                <p className="text-sm text-gray-600">
                  45문항 체계적 AI 역량 평가
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">4단계: 개인정보 동의</h3>
                <p className="text-sm text-gray-600">
                  개인정보 처리 동의 및 완료
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* 보고서 미리보기 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              📋 24페이지 맞춤형 보고서
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Executive Summary', desc: '핵심 결과 요약' },
                { title: 'AI 역량 종합 분석', desc: '전체 역량 평가' },
                { title: '업종별 벤치마킹', desc: '업계 비교 분석' },
                { title: '강점 및 개선 영역', desc: 'SWOT 분석' },
                { title: '맞춤형 AI 도구 추천', desc: '실용적 도구 제안' },
                { title: '단계별 실행 계획', desc: '3-6-12개월 로드맵' }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* 품질 보장 */}
        <Card className="mb-12 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-center text-green-800 flex items-center justify-center space-x-2">
              <Award className="w-6 h-6" />
              <span>품질 보장</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-800 mb-3">✅ Git 기반 품질 관리</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 버전 관리를 통한 안정적 시스템 운영</li>
                  <li>• 지속적 통합/배포(CI/CD) 적용</li>
                  <li>• 자동화된 테스트 및 품질 검증</li>
                  <li>• 코드 리뷰 및 보안 검사</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-3">🔒 데이터 보안</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• GDPR 및 개인정보보호법 준수</li>
                  <li>• 암호화된 데이터 전송 및 저장</li>
                  <li>• 접근 권한 관리 시스템</li>
                  <li>• 정기적 보안 감사</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* 시작 버튼 */}
        <div className="text-center">
          <Button
            onClick={handleStartDiagnosis}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg font-semibold rounded-xl"
          >
            <Brain className="w-6 h-6 mr-3" />
            AI 역량진단 시작하기
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            ⏱️ 예상 소요 시간: 약 15분
          </p>
        </div>
        
        {/* 기술 스택 정보 */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            🛠️ 기술 스택 및 품질 기준
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">Next.js 14</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">React 18</Badge>
            <Badge variant="secondary">Vercel</Badge>
            <Badge variant="secondary">Google Apps Script</Badge>
            <Badge variant="secondary">Git 기반 CI/CD</Badge>
            <Badge variant="secondary">PRD 완전 준수</Badge>
          </div>
        </div>
      </div>
    </div>
  );
  
  // ================================================================================
  // 📋 진단 진행 중 렌더링
  // ================================================================================
  
  const renderDiagnosisInProgress = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 상단 진행 상태 */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Brain className="w-8 h-8 text-blue-600" />
                <div>
                  <h2 className="text-xl font-semibold">AI 역량진단 진행 중</h2>
                  <p className="text-gray-600">PRD 기반 전문가급 분석</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{Math.round(pageState.progress)}%</div>
                <div className="text-sm text-gray-500">완료</div>
              </div>
            </div>
            <Progress value={pageState.progress} className="w-full" />
          </CardContent>
        </Card>
        
        {/* 진단 폼 */}
        <PRDDiagnosisForm
          onProgress={handleProgressUpdate}
          onSubmit={handleDiagnosisComplete}
        />
      </div>
    </div>
  );
  
  // ================================================================================
  // 📋 진단 완료 렌더링
  // ================================================================================
  
  const renderDiagnosisComplete = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            진단이 완료되었습니다!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            24페이지 맞춤형 AI 역량진단 보고서가 생성되었습니다
          </p>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">24</div>
                  <div className="text-sm text-gray-600">페이지 보고서</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">100%</div>
                  <div className="text-sm text-gray-600">PRD 준수율</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              📧 등록하신 이메일로 진단 결과가 발송되었습니다
            </p>
            <p className="text-gray-600">
              🔍 진단 ID로 언제든지 결과를 다시 확인할 수 있습니다
            </p>
          </div>
          
          <div className="mt-8 space-y-4">
            <Button
              onClick={() => window.location.href = '/'}
              size="lg"
              className="w-full"
            >
              홈으로 돌아가기
            </Button>
            
            <Button
              onClick={() => window.location.href = '/report-access'}
              variant="outline"
              size="lg"
              className="w-full"
            >
              진단 결과 다시 보기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
  
  // ================================================================================
  // 📋 메인 렌더링
  // ================================================================================
  
  // 진단 상태에 따른 조건부 렌더링
  if (pageState.isCompleted) {
    return renderDiagnosisComplete();
  }
  
  if (pageState.isStarted) {
    return renderDiagnosisInProgress();
  }
  
  return renderIntroSection();
}

// SEO 메타데이터는 별도 metadata.ts 파일에서 관리
