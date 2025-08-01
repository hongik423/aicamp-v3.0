'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/header';
import SimplifiedDiagnosisForm from '@/components/diagnosis/SimplifiedDiagnosisForm';
import SimpleDiagnosisResults from '@/components/diagnosis/SimpleDiagnosisResults';
import { 
  Brain, 
  CheckCircle, 
  Clock, 
  FileText, 
  Star,
  Target,
  Users,
  Zap,
  TrendingUp,
  Shield,
  Award,
  ArrowRight
} from 'lucide-react';
import { getImagePath } from '@/lib/utils';

export default function FreeDiagnosisPage() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'form' | 'results'>('intro');
  const [diagnosisResults, setDiagnosisResults] = useState<any>(null);

  // 페이지 제목 설정
  useEffect(() => {
    document.title = '무료 AI진단 신청 | AICAMP AI 교육센터';
  }, []);

  const handleStartDiagnosis = () => {
    setCurrentStep('form');
  };

  const handleDiagnosisComplete = (results: any) => {
    console.log('🔍 진단 완료 데이터:', results); // 디버깅용 로그
    setDiagnosisResults(results);
    setCurrentStep('results');
  };

  const handleBackToIntro = () => {
    setCurrentStep('intro');
    setDiagnosisResults(null);
  };

  // 결과 페이지
  if (currentStep === 'results' && diagnosisResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Header />
        {/* AICAMP AI 교육센터 로고 */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center mb-4">
            <Image
              src={getImagePath('/images/aicamp_logo.png')}
              alt="AICAMP AI 교육센터"
              width={240}
              height={80}
              className="h-16 w-auto"
              priority
            />
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
                        <SimpleDiagnosisResults data={diagnosisResults} />
        </div>
      </div>
    );
  }

  // 진단 폼 페이지
  if (currentStep === 'form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Header />
        {/* AICAMP AI 교육센터 로고 */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center mb-4">
            <Image
              src={getImagePath('/images/aicamp_logo.png')}
              alt="AICAMP AI 교육센터"
              width={240}
              height={80}
              className="h-16 w-auto"
              priority
            />
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <SimplifiedDiagnosisForm 
            onComplete={handleDiagnosisComplete}
            onBack={handleBackToIntro}
          />
        </div>
      </div>
    );
  }

  // 소개 페이지 (새로운 간소화된 버전)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* 헤더 섹션 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6">
              <Brain className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">AI 기반 기업 진단 시스템</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              기업 성장의
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                새로운 시작
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              8개 핵심 질문으로 2분 만에<br />
              전문가 수준의 맞춤형 진단을 받아보세요
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="outline" className="text-sm px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                2분 소요
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                100% 무료
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleStartDiagnosis}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 h-auto"
              >
                무료 진단 시작하기
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline"
                asChild
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-lg px-8 py-4 h-auto"
              >
                <Link href="/diagnosis/overview">서비스 살펴보기</Link>
              </Button>
            </div>
          </div>

          {/* 진단 개념 설명 */}
          <div className="mb-12">
            <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                  무료진단이란?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center max-w-4xl mx-auto">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  기업의 현재 상태를 객관적으로 분석하여 <strong>성장 가능성</strong>과 <strong>개선 방향</strong>을 제시하는 
                  AI 기반 진단 서비스입니다. 복잡한 경영 환경에서 우선순위를 명확히 하고, 
                  실행 가능한 솔루션을 찾아드립니다.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">현상 분석</h4>
                    <p className="text-sm text-gray-600">
                      기업의 현재 상황을<br />
                      객관적으로 파악
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">문제 진단</h4>
                    <p className="text-sm text-gray-600">
                      핵심 문제점과<br />
                      개선 기회 발견
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">해결 방안</h4>
                    <p className="text-sm text-gray-600">
                      맞춤형 솔루션과<br />
                      실행 계획 제시
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 진단 설문 작성 방법 */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                진단 설문 작성 방법
              </CardTitle>
              <CardDescription className="text-center">
                정확한 진단을 위한 8개 질문 답변 가이드
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-lg mb-2 text-blue-700">기본 정보 (4개)</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-800">1. 회사명</p>
                        <p className="text-sm text-gray-600">정확한 회사명을 입력해주세요</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">2. 업종</p>
                        <p className="text-sm text-gray-600">주력 사업 분야를 선택해주세요</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">3. 담당자 정보</p>
                        <p className="text-sm text-gray-600">이름, 연락처, 이메일을 입력해주세요</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">4. 직원수</p>
                        <p className="text-sm text-gray-600">현재 정규직 기준으로 선택해주세요</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-lg mb-2 text-green-700">현황 분석 (4개)</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-800">5. 성장단계</p>
                        <p className="text-sm text-gray-600">창업기, 성장기, 성숙기 중 선택</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">6. 주요 고민사항</p>
                        <p className="text-sm text-gray-600">현재 가장 큰 경영 과제를 구체적으로 기술</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">7. 예상 혜택</p>
                        <p className="text-sm text-gray-600">진단을 통해 얻고 싶은 결과를 명시</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">8. 기대 효과</p>
                        <p className="text-sm text-gray-600">개선 후 목표하는 성과를 기술</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h5 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  답변 작성 시 주의사항
                </h5>
                <ul className="text-sm text-yellow-700 space-y-2">
                  <li>• <strong>구체적으로 작성</strong>: 추상적인 답변보다는 구체적인 상황을 기술해주세요</li>
                  <li>• <strong>현실적으로 작성</strong>: 과장하지 말고 현재 상황을 솔직하게 기술해주세요</li>
                  <li>• <strong>완전하게 작성</strong>: 모든 항목을 빠짐없이 작성해야 정확한 진단이 가능합니다</li>
                  <li>• <strong>개인정보 보호</strong>: 입력하신 정보는 진단 목적으로만 사용되며 안전하게 보호됩니다</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 진단 기준 및 평가 방법 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-orange-600" />
                  진단 평가 기준
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <strong>사업 모델 분석</strong>
                      <p className="text-xs text-gray-600">수익 구조, 고객 세분화, 경쟁 우위 평가</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <strong>운영 효율성</strong>
                      <p className="text-xs text-gray-600">업무 프로세스, 자원 활용도, 생산성 측정</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <strong>성장 잠재력</strong>
                      <p className="text-xs text-gray-600">시장 기회, 확장 가능성, 혁신 역량</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <strong>위험 요소</strong>
                      <p className="text-xs text-gray-600">경영 리스크, 재무 안정성, 시장 변화 대응</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-indigo-200 bg-indigo-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                  진단 결과 활용법
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <strong>우선순위 설정</strong>
                      <p className="text-xs text-gray-600">가장 시급한 개선 과제 식별</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <strong>실행 계획 수립</strong>
                      <p className="text-xs text-gray-600">단계별 개선 방안 및 일정 계획</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <strong>전문가 상담</strong>
                      <p className="text-xs text-gray-600">세부 솔루션 및 맞춤형 지원 방안</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <strong>성과 모니터링</strong>
                      <p className="text-xs text-gray-600">개선 효과 측정 및 지속적 관리</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* CTA 섹션 */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                지금 바로 무료진단을 시작하세요
              </h3>
              <p className="text-blue-100 mb-6 text-lg">
                8개 질문에 답하면 2분 내에 맞춤형 진단 결과를 확인할 수 있습니다
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={handleStartDiagnosis}
                  className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-4 h-auto"
                >
                  무료 진단 시작하기
                </Button>
                <div className="flex items-center gap-4 text-sm text-blue-100">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    <span>100% 무료</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>2분 소요</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>전문가 상담 가능</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 