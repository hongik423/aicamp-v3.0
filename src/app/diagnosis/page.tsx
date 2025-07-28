'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import SimplifiedDiagnosisForm from '@/components/diagnosis/SimplifiedDiagnosisForm';
import SimplifiedDiagnosisResults from '@/components/diagnosis/SimplifiedDiagnosisResults';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Brain, 
  CheckCircle2, 
  Clock, 
  Shield, 
  Users, 
  TrendingUp, 
  Target, 
  Award,
  Zap,
  ArrowRight,
  BarChart3,
  Sparkles
} from 'lucide-react';

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
  const [results, setResults] = useState<DiagnosisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDiagnosisComplete = (data: DiagnosisResponse) => {
    setResults(data);
    setIsLoading(false);
  };

  const handleStartNew = () => {
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />
      
      {/* 🎯 간단한 타이틀 섹션 */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Brain className="w-4 h-4" />
              AI 무료진단
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              AI 기업 무료진단
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              <span className="font-semibold text-blue-600">8개 핵심 질문, 2분</span>으로 전문가 수준의 맞춤형 진단을 받아보세요
            </p>
          </div>
        </div>
      </section>

      {/* 🎯 메인 콘텐츠 */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* 결과가 있으면 결과 표시, 없으면 폼 표시 */}
          {results ? (
            <div className="space-y-8">
              {/* 새 진단 시작 버튼 */}
              <div className="text-center">
                <Button 
                  onClick={handleStartNew}
                  variant="outline"
                  className="mb-8"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  새로운 진단 시작하기
                </Button>
              </div>
              
              {/* 진단 결과 */}
              <SimplifiedDiagnosisResults data={results} />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* 🎯 진단 폼 (메인) */}
              <div className="lg:col-span-2 order-1">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                  
                  {/* 폼 헤더 */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">AI 기업진단</h2>
                        <p className="text-gray-600">8개 핵심 질문에 답변해주세요</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* 진단 폼 */}
                  <div className="p-8">
                    <SimplifiedDiagnosisForm 
                      onDiagnosisComplete={handleDiagnosisComplete}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    />
                  </div>
                </div>
              </div>

              {/* 🎯 사이드바 (간소화) */}
              <div className="lg:col-span-1 order-2 space-y-6">
                
                {/* 진단 특징 */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">빠른 진단</h3>
                    <p className="text-gray-600">2분만에 완료</p>
                  </div>
                  
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>2분 소요</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>100% 무료</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-purple-500" />
                      <span>즉시 결과 제공</span>
                    </div>
                  </div>
                </div>

                {/* 전문가 정보 */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">전문가 진단</h3>
                    <p className="text-gray-600 text-sm">25년 경험 전문가</p>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-500" />
                      <span>중소벤처기업부 경영지도사</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-yellow-500" />
                      <span>500+ 기업 성장 지원</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span>95% 고객 만족도</span>
                    </div>
                  </div>
                </div>

                {/* 진단 후 혜택 */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">진단 후 혜택</h3>
                  <div className="space-y-3">
                    {[
                      { title: '맞춤형 진단보고서', desc: 'PDF 다운로드 제공', color: 'text-blue-600' },
                      { title: '전문가 무료상담', desc: '24시간 내 연락', color: 'text-green-600' },
                      { title: '개선방안 제시', desc: '구체적 실행계획', color: 'text-purple-600' },
                      { title: '정부지원 안내', desc: '최대 5억원 지원', color: 'text-orange-600' }
                    ].map((benefit, index) => (
                      <div key={index} className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className={`w-4 h-4 ${benefit.color}`} />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-sm">{benefit.title}</p>
                            <p className="text-xs text-gray-600">{benefit.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </main>

      {/* 간단한 CTA */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            지금 바로 무료진단을 받아보세요
          </h2>
          <p className="text-gray-600 mb-6">
            2분 투자로 기업의 성장 가능성을 확인하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <button 
              className="flex-1 bg-blue-600 text-white hover:bg-blue-700 py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              onClick={() => {
                if (!results) {
                  document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Brain className="w-4 h-4" />
              무료진단 시작
            </button>
            <button 
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              onClick={() => {
                window.location.href = '/consultation';
              }}
            >
              <Users className="w-4 h-4" />
              전문가 상담
            </button>
          </div>
        </div>
      </section>
    </div>
  );
} 