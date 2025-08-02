'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Calculator, 
  TrendingUp, 
  Brain, 
  Activity,
  BarChart3,
  Loader2,
  AlertCircle,
  Download,
  RefreshCw,
  Target,
  Award,
  Table,
  MessageCircle
} from 'lucide-react';
import Link from 'next/link';
import {
  InvestmentInput,
  InvestmentResult,
  InvestmentGrade,
  AIEvaluation
} from '@/types/investment.types';
import { performInvestmentAnalysis } from '@/lib/utils/investment-analysis';
import { calculateInvestmentGrade } from '@/lib/utils/investment-grade';
import { generateAIInvestmentEvaluation } from '@/lib/utils/ai-investment-reporter';
import InvestmentInputForm from './InvestmentInputForm';
import InvestmentResultDisplay from './InvestmentResultDisplay';
import DSCRDetailedAnalysis from './DSCRDetailedAnalysis';
import AIReportDisplay from './AIReportDisplay';
import CashFlowChart from './CashFlowChart';
import DSCRChart from './DSCRChart';
import InvestmentRadarChart from './InvestmentRadarChart';
import InvestmentScoreBreakdown from './InvestmentScoreBreakdown';
import ComprehensiveFinancialTable from './ComprehensiveFinancialTable';

export default function InvestmentAnalysisTool() {
  // 초기 입력값 설정 - useMemo로 안정화
  const initialInputValues = useMemo<InvestmentInput>(() => ({
    initialInvestment: 0,
    policyFundAmount: 0,
    annualRevenue: 0,
    operatingProfitRate: 0,
    discountRate: 0,
    analysisYears: 0,
    policyLoanAmount: 0,
    policyLoanRate: 0,
    gracePeriod: 0,
    repaymentPeriod: 0,
    otherDebtAmount: 0,
    otherDebtRate: 0,
    otherDebtGracePeriod: 0,
    otherDebtRepaymentPeriod: 0,
    revenueGrowthRate: 0,
    costInflationRate: 0,
    taxRate: 0,
    scenarioType: 'neutral'
  }), []);
  
  const [investmentInput, setInvestmentInput] = useState<InvestmentInput>(initialInputValues);

  const [analysisResult, setAnalysisResult] = useState<InvestmentResult | null>(null);
  const [investmentGrade, setInvestmentGrade] = useState<InvestmentGrade | null>(null);
  const [aiEvaluation, setAiEvaluation] = useState<AIEvaluation | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('input');
  const [currentStep, setCurrentStep] = useState<string>('');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // 투자 분석 실행
  const handleInvestmentAnalysis = useCallback(async () => {
    setIsAnalyzing(true);
    setError(null);
    setCurrentStep('');
    setCompletedSteps([]);
    setIsCompleted(false);

    try {
      // 1단계: 입력값 검증
      setCurrentStep('입력값 검증 중...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (investmentInput.initialInvestment <= 0) {
        throw new Error('초기 투자금은 0보다 커야 합니다.');
      }
      if (investmentInput.annualRevenue <= 0) {
        throw new Error('연간 매출은 0보다 커야 합니다.');
      }
      if (investmentInput.analysisYears <= 0) {
        throw new Error('분석 기간은 0보다 커야 합니다.');
      }
      
      setCompletedSteps(['입력값 검증 완료']);

      // 2단계: 재무 분석 수행
      setCurrentStep('재무 분석 수행 중...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const result = await performInvestmentAnalysis(investmentInput);
      setAnalysisResult(result);
      
      setCompletedSteps(prev => [...prev, '재무 분석 완료']);

      // 3단계: 투자 등급 계산
      setCurrentStep('투자 등급 계산 중...');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const grade = calculateInvestmentGrade(result, investmentInput.initialInvestment, investmentInput.discountRate);
      setInvestmentGrade(grade);
      
      setCompletedSteps(prev => [...prev, '투자 등급 계산 완료']);

      // 4단계: AI 평가 생성
      setCurrentStep('AI 평가 생성 중...');
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const aiEval = generateAIInvestmentEvaluation(result, investmentInput);
      setAiEvaluation(aiEval);
      
      setCompletedSteps(prev => [...prev, 'AI 평가 생성 완료']);

      // 5단계: 분석 완료
      setCurrentStep('분석 완료!');
      setIsCompleted(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 결과 섹션으로 스크롤 (부드럽게)
      setTimeout(() => {
        const resultSection = document.getElementById('analysis-results');
        if (resultSection) {
          resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err) {
      console.error('Investment analysis error:', err);
      setError(err instanceof Error ? err.message : '분석 중 오류가 발생했습니다.');
    } finally {
      setIsAnalyzing(false);
      setCurrentStep('');
    }
  }, [investmentInput]);

  // 초기화
  const handleReset = useCallback(() => {
    setInvestmentInput(initialInputValues);
    setAnalysisResult(null);
    setInvestmentGrade(null);
    setAiEvaluation(null);
    setError(null);
    setActiveTab('input');
    setCurrentStep('');
    setCompletedSteps([]);
    setIsCompleted(false);
  }, [initialInputValues]);

  // 엑셀 내보내기 (실제 구현은 추가 필요)
  const handleExport = () => {
    if (!analysisResult) return;
    
    // TODO: 실제 엑셀 내보내기 구현
    alert('엑셀 내보내기 기능은 준비 중입니다.');
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* 메인 헤더 */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            투자재무타당성분석기
          </h1>
        </div>
        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
          AI 기반 정밀 분석으로 투자 프로젝트의 타당성을 종합 평가합니다
        </p>
        
        {/* 분석 시작 버튼 */}
        <div className="mt-6 sm:mt-8">
          <Button 
            onClick={handleInvestmentAnalysis}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                분석 중...
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                🚀 투자분석 시작
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* 입력 폼 */}
      <InvestmentInputForm
        value={investmentInput}
        onChange={useCallback((partial: Partial<InvestmentInput>) => {
          setInvestmentInput(prev => ({ ...prev, ...partial }));
        }, [])}
        onAnalyze={handleInvestmentAnalysis}
        isAnalyzing={isAnalyzing}
      />

      {/* 분석 결과 섹션 - 입력 필드 아래에 표시 */}
      {analysisResult && investmentGrade && (
        <div id="analysis-results" className="space-y-6 pt-6 border-t-2 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 분석 결과</h2>
          
          {/* 핵심 평가 결과 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 투자 등급 카드 */}
            <Card className={`${investmentGrade.bgColor} ${investmentGrade.borderColor} border-2`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>투자 등급</span>
                  <Award className={`h-8 w-8 ${investmentGrade.color}`} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={`text-6xl font-bold ${investmentGrade.color} mb-2`}>
                    {investmentGrade.grade}
                  </div>
                  <p className={`text-lg font-semibold ${investmentGrade.color}`}>
                    {investmentGrade.gradeDesc}
                  </p>
                  <p className="text-gray-600 mt-2">{investmentGrade.recommendation}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    <p>기본 점수: {investmentGrade.score.toFixed(1)}점</p>
                    <p>리스크 프리미엄: {(investmentGrade.riskPremium * 100).toFixed(0)}%</p>
                    <p>조정 점수: {investmentGrade.adjustedScore.toFixed(1)}점</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 주요 지표 요약 */}
            <Card>
              <CardHeader>
                <CardTitle>주요 투자 지표</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">NPV (순현재가치)</span>
                    <span className={`font-bold text-lg ${analysisResult.npv >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {(analysisResult.npv / 100000000).toFixed(1)}억원
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">IRR (내부수익률)</span>
                    <span className={`font-bold text-lg ${analysisResult.irr >= 10 ? 'text-green-600' : 'text-red-600'}`}>
                      {analysisResult.irr.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">회수기간</span>
                    <span className={`font-bold text-lg ${analysisResult.paybackPeriod <= 5 ? 'text-green-600' : 'text-orange-600'}`}>
                      {analysisResult.paybackPeriod.toFixed(1)}년
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">평균 DSCR</span>
                    <span className={`font-bold text-lg ${
                      analysisResult.dscr && analysisResult.dscr.length > 0
                        ? (analysisResult.dscr.reduce((a, b) => a + b, 0) / analysisResult.dscr.length) >= 1.5
                          ? 'text-green-600'
                          : 'text-orange-600'
                        : 'text-gray-600'
                    }`}>
                      {analysisResult.dscr && analysisResult.dscr.length > 0
                        ? (analysisResult.dscr.reduce((a, b) => a + b, 0) / analysisResult.dscr.length).toFixed(2)
                        : '-'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 포괄적 재무데이터 표 */}
          {analysisResult.dscrData && (
            <ComprehensiveFinancialTable 
              result={analysisResult} 
              dscrData={analysisResult.dscrData}
            />
          )}

          {/* 차트 섹션 */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">📈 시각화 차트</h3>
            
            <Tabs defaultValue="cashflow" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="cashflow">현금흐름</TabsTrigger>
                <TabsTrigger value="dscr">DSCR 추이</TabsTrigger>
                <TabsTrigger value="radar">종합 평가</TabsTrigger>
                <TabsTrigger value="score">점수 분석</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cashflow" className="mt-4">
                <CashFlowChart cashFlows={analysisResult.cashFlows} />
              </TabsContent>
              
              <TabsContent value="dscr" className="mt-4">
                {analysisResult.dscrData && (
                  <DSCRChart dscrData={analysisResult.dscrData} />
                )}
              </TabsContent>
              
              <TabsContent value="radar" className="mt-4">
                <InvestmentRadarChart
                  result={analysisResult}
                  grade={investmentGrade}
                />
              </TabsContent>
              
              <TabsContent value="score" className="mt-4">
                <InvestmentScoreBreakdown
                  result={analysisResult}
                  grade={investmentGrade}
                  initialInvestment={investmentInput.initialInvestment}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* AI 평가 */}
          {aiEvaluation && (
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-6 w-6 text-purple-600" />
                  AI 기반 종합 평가
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <div className="whitespace-pre-line text-gray-700">
                    {aiEvaluation.recommendation}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 상세 분석 탭 */}
          <Card>
            <CardHeader>
              <CardTitle>상세 분석 자료</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="financial">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="financial">재무분석</TabsTrigger>
                  <TabsTrigger value="dscr-detail">DSCR 상세</TabsTrigger>
                  <TabsTrigger value="ai-report">AI 리포트</TabsTrigger>
                </TabsList>
                
                <TabsContent value="financial" className="mt-4">
                  <InvestmentResultDisplay
                    result={analysisResult}
                    grade={investmentGrade}
                    initialInvestment={investmentInput.initialInvestment}
                  />
                </TabsContent>
                
                <TabsContent value="dscr-detail" className="mt-4">
                  {analysisResult.dscrData && (
                    <DSCRDetailedAnalysis dscrData={analysisResult.dscrData} />
                  )}
                </TabsContent>
                
                <TabsContent value="ai-report" className="mt-4">
                  {aiEvaluation && (
                    <AIReportDisplay evaluation={aiEvaluation} />
                  )}
                </TabsContent>
              </Tabs>
              
              {/* 강화된 상담신청 CTA */}
              <div className="mt-8 bg-gradient-to-br from-orange-50 via-white to-red-50 rounded-2xl p-8 border border-orange-200">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <MessageCircle className="w-4 h-4" />
                    분석 완료 → 전문가 상담 권장
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    🎯 더 정확한 분석이 필요하세요?
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    25년 경력 전문가가 <span className="font-semibold text-blue-600">맞춤형 투자 전략</span>과 
                    <span className="font-semibold text-green-600"> 정부지원 방안</span>을 제안해드립니다
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/consultation">
                      <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 px-8 py-4 text-lg font-bold"
                      >
                        <MessageCircle className="mr-3 h-6 w-6" />
                        💬 전문가 상담 신청하기
                      </Button>
                    </Link>
                    <div className="text-sm text-gray-500 max-w-xs">
                      ⚡ 24시간 내 연락<br />
                      📊 상세 분석 리포트 제공
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="font-semibold text-blue-900 mb-1">💰 정부지원</div>
                      <div className="text-gray-600">최적의 정책자금 매칭</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="font-semibold text-green-900 mb-1">📈 투자전략</div>
                      <div className="text-gray-600">리스크 최소화 방안</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="font-semibold text-purple-900 mb-1">🎯 실행계획</div>
                      <div className="text-gray-600">단계별 실행 로드맵</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 