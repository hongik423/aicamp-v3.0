'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ExternalLink, Calculator, DollarSign, Calendar, FileText, Phone, Globe, 
  Target, CheckCircle, BarChart3, Brain, Zap, TrendingUp, Lock, ArrowRight,
  MessageCircle, AlertCircle, Shield, Star
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import InvestmentAnalysisTool from '@/components/investment-analysis/InvestmentAnalysisTool';

export default function InvestmentAnalysisPage() {
  const [showAnalysisTool, setShowAnalysisTool] = useState(true); // 기본값을 true로 변경하여 바로 사용 가능

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
            <Calculator className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">AI투자재무타당성분석기</h1>
            <Badge variant="outline" className="ml-0 sm:ml-2 mt-2 sm:mt-0">AI 분석도구</Badge>
          </div>
          <p className="text-lg sm:text-xl text-gray-600">AI 기반 5구간 투자규모별 평가와 8개 지표 종합분석 도구</p>
        </div>

        {/* 사용 안내 */}
        <Alert className="mb-8 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300">
          <Zap className="h-6 w-6 text-blue-600" />
          <AlertDescription className="text-base sm:text-lg">
            <strong className="text-blue-900 text-lg sm:text-xl">✨ AI투자재무타당성분석기를 바로 사용하실 수 있습니다!</strong>
            <br />
            <span className="text-blue-800">AI 기반 정밀 분석으로 투자 타당성을 즉시 확인해보세요.</span>
            <br />
            <strong className="text-blue-900">더 자세한 컨설팅이 필요하시면 언제든 상담신청 가능합니다.</strong>
          </AlertDescription>
        </Alert>

        {/* 개요 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              투자재무타당성분석기 개요
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">💡 투자재무타당성분석기란?</h3>
                <p className="text-gray-700">
                  AI 기반으로 투자 프로젝트의 재무적 타당성을 종합적으로 분석하는 전문 도구입니다.
                  5구간 투자규모별 차별화된 평가와 8개 핵심 지표를 통해 정책자금 승인 가능성을 사전에 정확히 예측합니다.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">🎯 주요 기능</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>5구간 투자규모별 맞춤형 평가 (마이크로, 소규모, 중규모, 대규모, 메가)</li>
                  <li>NPV, IRR, DSCR 등 8개 핵심 재무지표 종합분석</li>
                  <li>AI 기반 정책자금 승인 가능성 예측</li>
                  <li>실시간 차트와 레이더 분석으로 시각화</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 투자분석 도구 - 바로 사용 가능 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              AI투자재무타당성분석기
            </CardTitle>
            <CardDescription>AI 기반 정밀 분석으로 투자 타당성을 즉시 확인하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <InvestmentAnalysisTool />
          </CardContent>
        </Card>

        {/* 전문가 상담 혜택 */}
        <Card className="mb-8 border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Star className="h-6 w-6 text-yellow-500" />
              전문가 상담을 통한 추가 혜택
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calculator className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">맞춤형 투자 전략 수립</h4>
                    <p className="text-sm text-gray-600">업종별 특화된 투자 전략 제안</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">1:1 맞춤형 분석 가이드</h4>
                    <p className="text-sm text-gray-600">전문가가 직접 분석 방법 안내</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">AI 분석 결과 해석 지원</h4>
                    <p className="text-sm text-gray-600">복잡한 재무지표를 쉽게 설명</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">맞춤형 투자 전략 수립</h4>
                    <p className="text-sm text-gray-600">분석 결과 기반 최적 전략 제안</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">정책자금 연계 컨설팅</h4>
                    <p className="text-sm text-gray-600">분석 결과에 맞는 정책자금 추천</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">지속적인 사후 관리</h4>
                    <p className="text-sm text-gray-600">투자 진행 과정 전반 지원</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link href="/consultation">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6"
                >
                  지금 바로 상담 신청하기
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm text-gray-600 mt-3">
                평균 응답 시간: 30분 이내 | 상담 비용: 완전 무료
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 5구간 투자규모별 평가 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              5구간 투자규모별 평가 시스템
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold mb-2">마이크로 투자</h3>
                <Badge variant="outline" className="mb-2">25억원 미만</Badge>
                <p className="text-sm text-gray-600">소규모 시설 개선, 디지털화 프로젝트</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold mb-2">소규모 투자</h3>
                <Badge variant="outline" className="mb-2">25~50억원</Badge>
                <p className="text-sm text-gray-600">생산라인 증설, 자동화 설비 도입</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-yellow-600 font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold mb-2">중규모 투자</h3>
                <Badge variant="outline" className="mb-2">50~75억원</Badge>
                <p className="text-sm text-gray-600">신공장 건설, 스마트팩토리 구축</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 font-bold text-lg">4</span>
                </div>
                <h3 className="font-semibold mb-2">대규모 투자</h3>
                <Badge variant="outline" className="mb-2">75~100억원</Badge>
                <p className="text-sm text-gray-600">통합 생산기지, R&D 센터 건립</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold text-lg">5</span>
                </div>
                <h3 className="font-semibold mb-2">메가 투자</h3>
                <Badge variant="outline" className="mb-2">100억원 이상</Badge>
                <p className="text-sm text-gray-600">대규모 산업단지, 혁신 클러스터</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 8개 핵심 지표 분석 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              8개 핵심 지표 종합분석
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">재무 지표 (4개)</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">NPV (순현재가치)</h4>
                      <p className="text-sm text-gray-600">투자로부터 얻는 순현재가치 측정</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">IRR (내부수익률)</h4>
                      <p className="text-sm text-gray-600">투자수익률과 자본비용 비교분석</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">DSCR (원리금상환능력)</h4>
                      <p className="text-sm text-gray-600">대출 원리금 상환 능력 평가</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">회수기간 (Payback Period)</h4>
                      <p className="text-sm text-gray-600">투자금 회수에 소요되는 기간</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">경영 지표 (4개)</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-cyan-600 font-bold text-sm">5</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">수익성 (Profitability)</h4>
                      <p className="text-sm text-gray-600">매출대비 수익률 및 마진 분석</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-600 font-bold text-sm">6</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">안정성 (Stability)</h4>
                      <p className="text-sm text-gray-600">재무안정성 및 유동성 평가</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-pink-600 font-bold text-sm">7</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">성장성 (Growth)</h4>
                      <p className="text-sm text-gray-600">매출 및 수익 성장 잠재력</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 font-bold text-sm">8</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">리스크 (Risk)</h4>
                      <p className="text-sm text-gray-600">시장, 운영, 재무 리스크 평가</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 강화된 CTA - 전문가 상담 안내 */}
        <div className="text-center py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl border border-blue-100">
          <div className="max-w-3xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              AI투자분석기 이용 중 → 전문가 상담 가능
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              🚀 더 정밀한 분석과 전략이 필요하신가요?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              <span className="font-semibold text-blue-600">전문가 상담으로 맞춤형 투자 전략 수립</span><br />
              25년 경력 전문가가 정확한 분석과 맞춤형 전략을 제공합니다
            </p>
            
            {/* 주요 CTA - 전문가 상담 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Link href="/consultation">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  <MessageCircle className="mr-3 h-6 w-6" />
                  💬 전문가 무료 상담 신청하기
                </Button>
              </Link>
              <div className="text-sm text-gray-500">
                ⚡ 24시간 내 전문가가 직접 연락드립니다
              </div>
            </div>
            
            {/* 보조 CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" variant="outline" asChild className="border-blue-200 hover:bg-blue-50">
                <Link href="/services/policy-funding">
                  <DollarSign className="mr-2 h-5 w-5" />
                  정책자금 안내 보기
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-purple-200 hover:bg-purple-50">
                <Link href="/diagnosis">
                  <Zap className="mr-2 h-5 w-5" />
                  AI역량진단 받기
                </Link>
              </Button>
            </div>
            
            {/* 프로세스 안내 */}
            <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">📋 AI 투자분석 활용 프로세스</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <div className="font-semibold">즉시 분석</div>
                    <div className="text-gray-600">AI 투자분석기 이용</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-bold">2</span>
                  </div>
                  <div>
                    <div className="font-semibold">결과 확인</div>
                    <div className="text-gray-600">8개 지표 종합분석</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <div>
                    <div className="font-semibold">전문가 상담</div>
                    <div className="text-gray-600">필요시 상담신청</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 