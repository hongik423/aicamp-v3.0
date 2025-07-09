'use client';

import React, { useState, useCallback } from 'react';
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
  Award
} from 'lucide-react';
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

export default function InvestmentAnalysisTool() {
  // 초기 입력값 설정
  const [investmentInput, setInvestmentInput] = useState<InvestmentInput>({
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
  });

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
      
      const grade = calculateInvestmentGrade(result, investmentInput.initialInvestment);
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
      
      // 점수 분석 탭으로 이동
      setActiveTab('score-analysis');
    } catch (err) {
      console.error('Investment analysis error:', err);
      setError(err instanceof Error ? err.message : '분석 중 오류가 발생했습니다.');
    } finally {
      setIsAnalyzing(false);
      setCurrentStep('');
    }
  }, [investmentInput]);

  // 초기화
  const handleReset = () => {
    setAnalysisResult(null);
    setInvestmentGrade(null);
    setAiEvaluation(null);
    setError(null);
    setActiveTab('input');
    setCurrentStep('');
    setCompletedSteps([]);
    setIsCompleted(false);
  };

  // 엑셀 내보내기 (실제 구현은 추가 필요)
  const handleExport = () => {
    if (!analysisResult) return;
    
    // TODO: 실제 엑셀 내보내기 구현
    alert('엑셀 내보내기 기능은 준비 중입니다.');
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* 헤더 */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Calculator className="h-8 w-8 text-blue-600" />
            재무타당성 분석기
          </CardTitle>
          <CardDescription className="text-base mt-2">
            5구간 투자규모별 차별화된 평가시스템으로 리스크프리미엄을 감안한 정밀 투자 분석
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleInvestmentAnalysis}
              disabled={isAnalyzing}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 px-8 py-6 text-lg font-semibold"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                  분석 중...
                </>
              ) : (
                <>
                  <TrendingUp className="mr-3 h-6 w-6" />
                  🚀 투자 분석 시작
                </>
              )}
            </Button>
            
            {analysisResult && (
              <>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="lg"
                >
                  <RefreshCw className="mr-2 h-5 w-5" />
                  초기화
                </Button>
                <Button
                  onClick={handleExport}
                  variant="outline"
                  size="lg"
                >
                  <Download className="mr-2 h-5 w-5" />
                  엑셀 내보내기
                </Button>
              </>
            )}
          </div>
          
          {/* 진행상황 표시 */}
          {(isAnalyzing || isCompleted) && (
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                {isAnalyzing ? (
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                ) : (
                  <Activity className="h-5 w-5 text-green-600" />
                )}
                <h3 className="text-lg font-semibold text-gray-900">
                  {isCompleted ? '분석 완료!' : '분석 진행 중...'}
                </h3>
              </div>
              
              {currentStep && (
                <div className="mb-3">
                  <p className="text-blue-700 font-medium">
                    {isCompleted ? '✅ 모든 분석이 완료되었습니다!' : `🔄 ${currentStep}`}
                  </p>
                </div>
              )}
              
              {completedSteps.length > 0 && (
                <div className="space-y-1">
                  {completedSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500">✅</span>
                      {step}
                    </div>
                  ))}
                </div>
              )}
              
              {isCompleted && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium mb-2">📊 다음 단계 안내</p>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• 점수분석 탭에서 투자 등급을 확인하세요</li>
                    <li>• AI평가 탭에서 전문가 수준의 분석을 받아보세요</li>
                    <li>• 재무분석 탭에서 상세한 재무 지표를 검토하세요</li>
                    <li>• 차트분석 탭에서 시각적 데이터를 확인하세요</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 에러 메시지 */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* 메인 콘텐츠 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 lg:grid-cols-9 rounded-2xl">
          <TabsTrigger value="input" className="text-xs md:text-sm">
            <Calculator className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
            입력
          </TabsTrigger>
          <TabsTrigger 
            value="score-analysis" 
            className="text-xs md:text-sm"
          >
            <Award className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
            점수분석
          </TabsTrigger>
          <TabsTrigger 
            value="ai-evaluation" 
            className="text-xs md:text-sm"
          >
            <Brain className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
            AI평가
          </TabsTrigger>
          <TabsTrigger 
            value="financial" 
            className="text-xs md:text-sm"
          >
            <TrendingUp className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
            재무분석
          </TabsTrigger>
          <TabsTrigger 
            value="charts" 
            className="text-xs md:text-sm"
          >
            <BarChart3 className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
            차트분석
          </TabsTrigger>
          <TabsTrigger 
            value="dscr" 
            className="text-xs md:text-sm"
          >
            <Activity className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
            DSCR
          </TabsTrigger>
          <TabsTrigger 
            value="dscr-chart" 
            className="text-xs md:text-sm"
          >
            <Activity className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
            DSCR차트
          </TabsTrigger>
          <TabsTrigger 
            value="radar" 
            className="text-xs md:text-sm"
          >
            <Target className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
            레이더
          </TabsTrigger>
          <TabsTrigger 
            value="ai-report" 
            className="text-xs md:text-sm"
          >
            <Brain className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
            AI리포트
          </TabsTrigger>
        </TabsList>

        {/* 입력 탭 */}
        <TabsContent value="input" className="mt-6">
          <InvestmentInputForm
            value={investmentInput}
            onChange={setInvestmentInput}
          />
        </TabsContent>

        {/* 점수분석 탭 */}
        <TabsContent value="score-analysis" className="mt-6">
          {analysisResult && investmentGrade ? (
            <InvestmentScoreBreakdown
              result={analysisResult}
              grade={investmentGrade}
              initialInvestment={investmentInput.initialInvestment}
            />
          ) : (
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="py-12 text-center">
                <Award className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">점수분석 결과가 없습니다</h3>
                <p className="text-gray-600 mb-4">투자 분석을 먼저 실행해주세요</p>
                <Button 
                  onClick={handleInvestmentAnalysis}
                  disabled={isAnalyzing}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 px-8 py-6 text-lg font-semibold"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                      분석 중...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="mr-3 h-6 w-6" />
                      🚀 투자 분석 시작
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* AI 평가 탭 */}
        <TabsContent value="ai-evaluation" className="mt-6">
          {analysisResult && investmentGrade && aiEvaluation ? (
            <div className="space-y-6">
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
              
              <InvestmentResultDisplay
                result={analysisResult}
                grade={investmentGrade}
                initialInvestment={investmentInput.initialInvestment}
              />
            </div>
          ) : (
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardContent className="py-12 text-center">
                <Brain className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI 평가 결과가 없습니다</h3>
                <p className="text-gray-600 mb-4">투자 분석을 먼저 실행해주세요</p>
                <Button 
                  onClick={handleInvestmentAnalysis}
                  disabled={isAnalyzing}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 px-8 py-6 text-lg font-semibold"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                      분석 중...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="mr-3 h-6 w-6" />
                      🚀 투자 분석 시작
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* 재무분석 탭 */}
        <TabsContent value="financial" className="mt-6">
          {analysisResult && investmentGrade ? (
            <InvestmentResultDisplay
              result={analysisResult}
              grade={investmentGrade}
              initialInvestment={investmentInput.initialInvestment}
            />
          ) : (
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="py-12 text-center">
                <TrendingUp className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">재무분석 결과가 없습니다</h3>
                <p className="text-gray-600 mb-4">투자 분석을 먼저 실행해주세요</p>
                <Button 
                  onClick={handleInvestmentAnalysis}
                  disabled={isAnalyzing}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 px-8 py-6 text-lg font-semibold"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                      분석 중...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="mr-3 h-6 w-6" />
                      🚀 투자 분석 시작
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* DSCR 탭 */}
        <TabsContent value="dscr" className="mt-6">
          {analysisResult?.dscrData ? (
            <DSCRDetailedAnalysis dscrData={analysisResult.dscrData} />
          ) : (
            <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
              <CardContent className="py-12 text-center">
                <Activity className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">DSCR 분석 결과가 없습니다</h3>
                <p className="text-gray-600 mb-4">투자 분석을 먼저 실행해주세요</p>
                <Button 
                  onClick={handleInvestmentAnalysis}
                  disabled={isAnalyzing}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 px-8 py-6 text-lg font-semibold"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                      분석 중...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="mr-3 h-6 w-6" />
                      🚀 투자 분석 시작
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* 차트 분석 탭 */}
        <TabsContent value="charts" className="mt-6">
          {analysisResult ? (
            <CashFlowChart cashFlows={analysisResult.cashFlows} />
          ) : (
            <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
              <CardContent className="py-12 text-center">
                <BarChart3 className="h-16 w-16 text-indigo-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">차트 분석 결과가 없습니다</h3>
                <p className="text-gray-600 mb-4">투자 분석을 먼저 실행해주세요</p>
                <Button 
                  onClick={handleInvestmentAnalysis}
                  disabled={isAnalyzing}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 px-8 py-6 text-lg font-semibold"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                      분석 중...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="mr-3 h-6 w-6" />
                      🚀 투자 분석 시작
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* DSCR 차트 탭 */}
        <TabsContent value="dscr-chart" className="mt-6">
          {analysisResult?.dscrData ? (
            <DSCRChart dscrData={analysisResult.dscrData} />
          ) : (
            <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
              <CardContent className="py-12 text-center">
                <Activity className="h-16 w-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">DSCR 차트 결과가 없습니다</h3>
                <p className="text-gray-600 mb-4">투자 분석을 먼저 실행해주세요</p>
                <Button 
                  onClick={handleInvestmentAnalysis}
                  disabled={isAnalyzing}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      분석 중...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      투자 분석 시작
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* 레이더 차트 탭 */}
        <TabsContent value="radar" className="mt-6">
          {aiEvaluation && investmentGrade ? (
            <InvestmentRadarChart 
              aiEvaluation={aiEvaluation} 
              grade={investmentGrade}
            />
          ) : (
            <Card className="bg-gradient-to-r from-teal-50 to-green-50 border-teal-200">
              <CardContent className="py-12 text-center">
                <Target className="h-16 w-16 text-teal-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">레이더 차트 결과가 없습니다</h3>
                <p className="text-gray-600 mb-4">투자 분석을 먼저 실행해주세요</p>
                <Button 
                  onClick={handleInvestmentAnalysis}
                  disabled={isAnalyzing}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      분석 중...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      투자 분석 시작
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* AI 리포트 탭 */}
        <TabsContent value="ai-report" className="mt-6">
          {aiEvaluation ? (
            <AIReportDisplay aiEvaluation={aiEvaluation} />
          ) : (
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="py-12 text-center">
                <Brain className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI 리포트 결과가 없습니다</h3>
                <p className="text-gray-600 mb-4">투자 분석을 먼저 실행해주세요</p>
                <Button 
                  onClick={handleInvestmentAnalysis}
                  disabled={isAnalyzing}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      분석 중...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      투자 분석 시작
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 