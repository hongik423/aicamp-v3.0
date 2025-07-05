'use client';

import { useState } from 'react';
import SimplifiedDiagnosisForm from '@/components/diagnosis/SimplifiedDiagnosisForm';
import SimplifiedDiagnosisResults from '@/components/diagnosis/SimplifiedDiagnosisResults';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Zap, Clock, BarChart3, Brain, CheckCircle2, FileText, Sparkles, Star, Shield, Users, ArrowRight, Target, TrendingUp } from 'lucide-react';

interface DiagnosisResponse {
  success: boolean;
  message: string;
  data: {
    diagnosis: any;
    summaryReport: string;
    reportLength: number;
    resultId: string;
    resultUrl: string;
    submitDate: string;
    googleSheetsSaved: boolean;
    processingTime: string;
    reportType: string;
  };
}

export default function DiagnosisPage() {
  const [currentStep, setCurrentStep] = useState(1); // 1: 소개, 2: 폼, 3: 결과
  const [results, setResults] = useState<DiagnosisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDiagnosisComplete = (data: DiagnosisResponse) => {
    setResults(data);
    setIsLoading(false);
    setCurrentStep(3);
  };

  const handleStartNew = () => {
    setResults(null);
    setCurrentStep(1);
  };

  const handleBackToIntro = () => {
    setCurrentStep(1);
  };

  const handleStartDiagnosis = () => {
    setCurrentStep(2);
  };

  // 🍎 애플스토어 스타일 프로그레스 인디케이터
  const ProgressIndicator = () => (
    <div className="fixed top-20 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* 진행 단계 */}
          <div className="flex items-center space-x-8">
            {[
              { step: 1, title: '소개', icon: FileText },
              { step: 2, title: '진단', icon: Brain },
              { step: 3, title: '결과', icon: BarChart3 }
            ].map((item) => (
              <button
                key={item.step}
                onClick={() => {
                  if (item.step === 1) setCurrentStep(1);
                  if (item.step === 2) setCurrentStep(2);
                  if (item.step === 3 && results) setCurrentStep(3);
                }}
                className={`flex items-center space-x-3 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  currentStep === item.step
                    ? 'bg-blue-600 text-white shadow-lg'
                    : currentStep > item.step || (item.step === 3 && results)
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-500'
                }`}
                disabled={item.step === 3 && !results}
              >
                <item.icon className="w-5 h-5" />
                <span className="hidden sm:block">{item.title}</span>
                {currentStep > item.step || (item.step === 3 && results) ? 
                  <CheckCircle2 className="w-4 h-4" /> : null}
              </button>
            ))}
          </div>

          {/* 진행률 표시 */}
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>
            <span className="font-medium">{Math.round((currentStep / 3) * 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );

  // 🍎 단계 1: 시스템 소개 - 애플스토어 스타일
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-white">
        <ProgressIndicator />
        
        {/* 히어로 섹션 */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-6xl mx-auto px-6 text-center">
            {/* 아이콘 */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl mb-8 shadow-xl">
              <Brain className="w-12 h-12 text-white" />
            </div>
            
            {/* 배지 */}
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              AI 기반 무료 진단
            </div>
            
            {/* 메인 제목 */}
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              기업 성장의
              <br />
              <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                새로운 시작
              </span>
            </h1>
            
            {/* 서브 제목 */}
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light mb-12">
              8개 핵심 질문으로 2분 만에<br />
              전문가 수준의 맞춤형 진단을 받아보세요
            </p>
            
            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                onClick={handleStartDiagnosis}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Zap className="w-5 h-5 mr-2" />
                무료 진단 시작하기
              </Button>
              
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  2분 소요
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  100% 무료
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 개선 효과 비교 */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                혁신적인 개선
              </h2>
              <p className="text-xl text-gray-600">
                기존 복잡한 진단 과정을 간소화했습니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Clock,
                  title: '처리 속도',
                  before: '2-3주',
                  after: '2분',
                  improvement: '99.9% 단축',
                  color: 'from-green-400 to-emerald-500'
                },
                {
                  icon: BarChart3,
                  title: '입력 항목',
                  before: '20개 이상',
                  after: '8개 핵심',
                  improvement: '60% 간소화',
                  color: 'from-blue-400 to-cyan-500'
                },
                {
                  icon: FileText,
                  title: '결과 제공',
                  before: '복잡한 분석',
                  after: '직관적 보고서',
                  improvement: '즉시 확인',
                  color: 'from-purple-400 to-pink-500'
                }
              ].map((item, index) => (
                <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`bg-gradient-to-br ${item.color} text-white p-8 text-center`}>
                      <item.icon className="w-12 h-12 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-6">{item.title}</h3>
                      
                      <div className="space-y-3">
                        <div className="bg-white/20 rounded-lg p-3">
                          <div className="text-white/80 text-sm">기존</div>
                          <div className="font-semibold line-through">{item.before}</div>
                        </div>
                        <ArrowRight className="w-6 h-6 mx-auto" />
                        <div className="bg-white/30 rounded-lg p-3">
                          <div className="text-white/90 text-sm">개선</div>
                          <div className="font-bold text-lg">{item.after}</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 bg-white/20 rounded-full px-3 py-1 text-sm font-medium">
                        {item.improvement}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 진단 과정 */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                간단한 3단계 진행
              </h2>
              <p className="text-xl text-gray-600">
                복잡하지 않습니다. 누구나 쉽게 할 수 있어요
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: '8개 정보 입력',
                  description: '회사 기본정보와 현재 상황에 대한 핵심 질문에 답변해주세요',
                  time: '1분',
                  color: 'bg-blue-600'
                },
                {
                  step: '02',
                  title: 'AI 즉시 분석',
                  description: '인공지능이 입력하신 정보를 종합분석하여 맞춤형 진단을 수행합니다',
                  time: '30초',
                  color: 'bg-purple-600'
                },
                {
                  step: '03',
                  title: '결과 및 추천',
                  description: '종합 점수와 함께 최적의 서비스 조합을 추천해드립니다',
                  time: '30초',
                  color: 'bg-green-600'
                }
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className={`w-20 h-20 ${process.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <span className="text-white text-2xl font-bold">{process.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{process.title}</h3>
                  <p className="text-gray-600 mb-4">{process.description}</p>
                  <div className="inline-flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    약 {process.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 기대 효과 */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  진단 후 확인할 수 있는 것들
                </h2>
                <div className="space-y-4">
                  {[
                    '현재 기업 역량 종합 점수 (100점 만점)',
                    '업계 내 위치 및 성장 가능성 분석',
                    'SWOT 기반 강점·약점 진단',
                    '6개 서비스 중 최적 매칭 추천',
                    '단계별 성장 로드맵 제시',
                    '예상 성과 및 투자 효율성 분석'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
                <div className="text-center">
                  <Target className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    예상 성과
                  </h3>
                  <div className="space-y-4">
                    {[
                      { metric: '매출 증대', value: '25-40%' },
                      { metric: '업무 효율', value: '30-50%' },
                      { metric: '비용 절감', value: '15-25%' },
                      { metric: '성과 발현', value: '3-6개월' }
                    ].map((result, index) => (
                      <div key={index} className="flex justify-between items-center bg-white rounded-xl p-4">
                        <span className="text-gray-700">{result.metric}</span>
                        <span className="text-blue-600 font-bold text-lg">{result.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 최종 CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              지금 바로 시작해보세요
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              8개 질문에 답하는 2분으로 기업의 새로운 성장 기회를 발견하세요
            </p>
            
            <Button 
              onClick={handleStartDiagnosis}
              className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 mb-8"
            >
              <Brain className="w-6 h-6 mr-2" />
              무료 AI 진단 시작하기
            </Button>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm text-blue-200">
              {[
                { icon: Shield, text: '100% 무료' },
                { icon: Clock, text: '2분 소요' },
                { icon: Brain, text: 'AI 기반 분석' },
                { icon: Users, text: '전문가 상담 가능' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // 🍎 단계 2: 진단 폼
  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ProgressIndicator />
        
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            {/* 헤더 */}
            <div className="text-center mb-12">
              <Button 
                variant="ghost" 
                onClick={handleBackToIntro}
                className="mb-6 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                이전으로
              </Button>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                <Brain className="w-10 h-10 inline-block mr-3 text-blue-600" />
                AI 무료 진단
              </h1>
              <p className="text-xl text-gray-600">
                8개 핵심 질문에 답해주시면 즉시 분석해드립니다
              </p>
            </div>

            <SimplifiedDiagnosisForm 
              onComplete={handleDiagnosisComplete}
              onBack={handleBackToIntro}
            />
          </div>
        </div>
      </div>
    );
  }

  // 🍎 단계 3: 결과 표시
  if (currentStep === 3 && results) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ProgressIndicator />
        
        <div className="pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-6">
            {/* 헤더 */}
            <div className="text-center mb-12">
              <Button 
                variant="ghost" 
                onClick={handleStartNew}
                className="mb-6 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                새로운 진단
              </Button>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                <BarChart3 className="w-10 h-10 inline-block mr-3 text-green-600" />
                진단 결과
              </h1>
              <p className="text-xl text-gray-600">
                AI가 분석한 맞춤형 진단 결과를 확인하세요
              </p>
            </div>

            <SimplifiedDiagnosisResults data={results} />
          </div>
        </div>
      </div>
    );
  }

  return null;
} 