'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calculator, DollarSign, Calendar, FileText, Phone, Globe, Target, CheckCircle, BarChart3, Brain, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { InvestmentAnalysisTool } from '@/components/investment-analysis/InvestmentAnalysisTool';

export default function InvestmentAnalysisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">투자재무타당성분석기</h1>
            <Badge variant="outline" className="ml-2">AI 분석도구</Badge>
          </div>
          <p className="text-xl text-gray-600">AI 기반 5구간 투자규모별 평가와 8개 지표 종합분석 도구</p>
        </div>

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

        {/* 투자분석 도구 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              투자재무타당성분석기
            </CardTitle>
            <CardDescription>실제 분석을 진행해보세요</CardDescription>
          </CardHeader>
          <CardContent>
            <InvestmentAnalysisTool />
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

        {/* AI 분석 기능 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI 분석 기능
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">실시간 분석</h3>
                <p className="text-sm text-gray-600">입력과 동시에 실시간으로 재무타당성 분석 결과 제공</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">예측 모델링</h3>
                <p className="text-sm text-gray-600">머신러닝 기반 정책자금 승인 확률 예측</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">시각화 차트</h3>
                <p className="text-sm text-gray-600">직관적인 차트와 레이더 분석으로 결과 시각화</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 분석 결과 예시 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              분석 결과 예시
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">프로젝트 개요</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">투자규모:</span>
                      <span className="font-medium">85억원 (대규모 투자)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">프로젝트 기간:</span>
                      <span className="font-medium">5년</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">업종:</span>
                      <span className="font-medium">제조업 (자동차 부품)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">분석일시:</span>
                      <span className="font-medium">2024.01.15</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">핵심 지표</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="text-sm text-gray-600 mb-1">NPV</div>
                      <div className="text-lg font-bold text-blue-600">+12.5억원</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="text-sm text-gray-600 mb-1">IRR</div>
                      <div className="text-lg font-bold text-green-600">18.3%</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="text-sm text-gray-600 mb-1">DSCR</div>
                      <div className="text-lg font-bold text-purple-600">2.8</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="text-sm text-gray-600 mb-1">회수기간</div>
                      <div className="text-lg font-bold text-orange-600">4.2년</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white text-center">
                <div className="text-sm opacity-90 mb-1">종합 평가</div>
                <div className="text-2xl font-bold mb-1">A등급</div>
                <div className="text-sm opacity-90">투자 실행 적극 권장 / 정책자금 승인 가능성 92%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 활용 가이드 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>활용 가이드</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">사용 방법</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600">1.</span>
                    <span className="text-sm">투자 기본정보 입력 (투자금액, 기간, 업종 등)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600">2.</span>
                    <span className="text-sm">재무정보 입력 (매출, 비용, 현금흐름 등)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600">3.</span>
                    <span className="text-sm">분석 실행 버튼 클릭</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600">4.</span>
                    <span className="text-sm">각 탭별 분석 결과 확인</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600">5.</span>
                    <span className="text-sm">AI 종합 리포트 다운로드</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">주의사항</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">모든 재무정보는 정확하게 입력해주세요</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">분석 결과는 참고용이며, 최종 투자 결정은 전문가와 상담 후 하시기 바랍니다</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">업종별 특성을 고려한 보정이 필요할 수 있습니다</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span className="text-sm">정기적인 재분석을 통해 투자 계획을 점검하세요</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 관련 정보 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>관련 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
                <Link href="/services/policy-funding/facility-funding">
                  <BarChart3 className="h-6 w-6" />
                  <span>시설자금</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
                <Link href="/services/policy-funding/operating-funding">
                  <TrendingUp className="h-6 w-6" />
                  <span>운전자금</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
                <Link href="/services/policy-funding/startup-funding">
                  <Target className="h-6 w-6" />
                  <span>창업자금</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
                <Link href="/services/policy-funding/rd-funding">
                  <Brain className="h-6 w-6" />
                  <span>R&D자금</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 뒤로가기 */}
        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href="/services/policy-funding">
              ← 정책자금 메인으로 돌아가기
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 