'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Target, 
  Lightbulb, 
  Calendar, 
  Users, 
  DollarSign,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Download,
  Mail,
  Star,
  Award,
  Zap,
  Shield,
  Rocket
} from 'lucide-react';
import { PremiumDiagnosisReport, PremiumDiagnosisEngine, PremiumDiagnosisRequest } from '@/lib/utils/premiumDiagnosisEngine';

interface PremiumDiagnosisReportProps {
  diagnosisRequest: PremiumDiagnosisRequest;
  onRequestConsultation?: () => void;
  onDownloadReport?: (reportData: PremiumDiagnosisReport) => void;
}

export default function PremiumDiagnosisReportComponent({
  diagnosisRequest,
  onRequestConsultation,
  onDownloadReport
}: PremiumDiagnosisReportProps) {
  const [report, setReport] = useState<PremiumDiagnosisReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('summary');

  useEffect(() => {
    generateReport();
  }, [diagnosisRequest]);

  const generateReport = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🎯 프리미엄 보고서 생성 시작...');
      const generatedReport = await PremiumDiagnosisEngine.generatePremiumReport(diagnosisRequest);
      setReport(generatedReport);
      console.log('✅ 프리미엄 보고서 생성 완료');
    } catch (err) {
      console.error('❌ 보고서 생성 오류:', err);
      setError(err instanceof Error ? err.message : '보고서 생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadReport = () => {
    if (report && onDownloadReport) {
      onDownloadReport(report);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">🎯 최고수준 경영진단 보고서 생성 중...</h3>
          <p className="text-gray-600">
            업종별 산업분석, SWOT 전략 매트릭스, 실행 로드맵을 생성하고 있습니다.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-blue-600">
            <Zap className="w-4 h-4" />
            <span>AI 기반 맞춤형 분석 진행 중</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-800">보고서 생성 오류</h3>
              <p className="text-red-600">{error}</p>
              <Button 
                onClick={generateReport} 
                className="mt-3 bg-red-600 hover:bg-red-700"
                size="sm"
              >
                다시 시도
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!report) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* 보고서 헤더 */}
      <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Award className="w-8 h-8" />
                <CardTitle className="text-2xl font-bold">
                  🎯 AICAMP 최고수준 경영진단 보고서
                </CardTitle>
              </div>
              <div className="flex items-center space-x-4 text-blue-100">
                <span>보고서 ID: {report.reportId}</span>
                <span>생성일시: {report.generatedAt}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={handleDownloadReport}
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Download className="w-4 h-4 mr-2" />
                보고서 다운로드
              </Button>
              <Button 
                onClick={onRequestConsultation}
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                <Mail className="w-4 h-4 mr-2" />
                전문가 상담 신청
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{report.companyProfile.keyMetrics.overallGrade}</div>
              <div className="text-blue-100">종합 등급</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{diagnosisRequest.totalScore}점</div>
              <div className="text-blue-100">진단 점수</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{report.companyProfile.keyMetrics.industryRanking}</div>
              <div className="text-blue-100">업계 순위</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{report.companyProfile.keyMetrics.competitivePosition}</div>
              <div className="text-blue-100">경쟁 위치</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 메인 탭 네비게이션 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 lg:grid-cols-6">
          <TabsTrigger value="summary" className="text-xs lg:text-sm">
            <Star className="w-4 h-4 mr-1" />
            경영진 요약
          </TabsTrigger>
          <TabsTrigger value="industry" className="text-xs lg:text-sm">
            <BarChart3 className="w-4 h-4 mr-1" />
            산업 분석
          </TabsTrigger>
          <TabsTrigger value="swot" className="text-xs lg:text-sm">
            <Target className="w-4 h-4 mr-1" />
            SWOT 전략
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="text-xs lg:text-sm">
            <Lightbulb className="w-4 h-4 mr-1" />
            전략 권고
          </TabsTrigger>
          <TabsTrigger value="roadmap" className="text-xs lg:text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            실행 로드맵
          </TabsTrigger>
          <TabsTrigger value="aicamp" className="text-xs lg:text-sm">
            <Rocket className="w-4 h-4 mr-1" />
            AICAMP 연계
          </TabsTrigger>
        </TabsList>

        {/* 경영진 요약 */}
        <TabsContent value="summary" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 핵심 발견사항 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span>핵심 발견사항</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {report.executiveSummary.keyFindings.map((finding, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{finding}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* 긴급 액션 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <span>긴급 액션 아이템</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {report.executiveSummary.urgentActions.map((action, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-orange-600">{index + 1}</span>
                      </div>
                      <span className="text-gray-700">{action}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* 주요 추천사항 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                <span>주요 추천사항</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {report.executiveSummary.primaryRecommendations.map((recommendation, index) => (
                  <div key={index} className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <span className="font-semibold text-yellow-800">{recommendation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 예상 성과 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-green-600" />
                <span>예상 성과</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.executiveSummary.expectedOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="text-green-800 font-medium">{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 산업 분석 */}
        <TabsContent value="industry" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 시장 개요 */}
            <Card>
              <CardHeader>
                <CardTitle>시장 개요</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">
                      {report.industryAnalysis.marketOverview.size}
                    </div>
                    <div className="text-sm text-blue-800">시장 규모</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">
                      {report.industryAnalysis.marketOverview.growthRate}
                    </div>
                    <div className="text-sm text-green-800">성장률</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">주요 트렌드</h4>
                  <ul className="space-y-1">
                    {report.industryAnalysis.marketOverview.keyTrends.map((trend, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{trend}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* 벤치마크 분석 */}
            <Card>
              <CardHeader>
                <CardTitle>벤치마크 분석</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">업계 평균 대비 위치</span>
                      <Badge variant="outline">{report.industryAnalysis.benchmarkAnalysis.companyPosition}</Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {Object.entries(report.industryAnalysis.benchmarkAnalysis.industryAverage).map(([category, avgScore]) => {
                      const companyScore = diagnosisRequest.categoryScores[category as keyof typeof diagnosisRequest.categoryScores] || 0;
                      const isAboveAverage = companyScore > avgScore;
                      
                      return (
                        <div key={category} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{getCategoryDisplayName(category)}</span>
                            <span className={isAboveAverage ? 'text-green-600' : 'text-red-600'}>
                              {companyScore}점 (평균: {avgScore}점)
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <Progress value={(companyScore / 100) * 100} className="flex-1" />
                            <Progress value={(avgScore / 100) * 100} className="flex-1 opacity-50" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 기회와 위협 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>시장 기회</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {report.industryAnalysis.industryForces.opportunities.map((opportunity, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">{opportunity}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span>시장 위협</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {report.industryAnalysis.industryForces.threats.map((threat, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                      <span className="text-sm">{threat}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* SWOT 전략 */}
        <TabsContent value="swot" className="space-y-6">
          {/* SWOT 분석 매트릭스 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">강점 (Strengths)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {report.comprehensiveSWOT.analysis.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm text-green-800">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800">약점 (Weaknesses)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {report.comprehensiveSWOT.analysis.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                      <span className="text-sm text-red-800">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800">기회 (Opportunities)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {report.comprehensiveSWOT.analysis.opportunities.map((opportunity, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <TrendingUp className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                      <span className="text-sm text-blue-800">{opportunity}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-800">위협 (Threats)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {report.comprehensiveSWOT.analysis.threats.map((threat, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Shield className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
                      <span className="text-sm text-orange-800">{threat}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* 전략 매트릭스 */}
          <Card>
            <CardHeader>
              <CardTitle>SWOT 전략 매트릭스</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-3">SO 전략 (강점-기회)</h4>
                    <ul className="space-y-1">
                      {report.comprehensiveSWOT.strategicMatrix.SO_strategies.map((strategy, index) => (
                        <li key={index} className="text-sm text-green-700">• {strategy}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-3">ST 전략 (강점-위협)</h4>
                    <ul className="space-y-1">
                      {report.comprehensiveSWOT.strategicMatrix.ST_strategies.map((strategy, index) => (
                        <li key={index} className="text-sm text-blue-700">• {strategy}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-800 mb-3">WO 전략 (약점-기회)</h4>
                    <ul className="space-y-1">
                      {report.comprehensiveSWOT.strategicMatrix.WO_strategies.map((strategy, index) => (
                        <li key={index} className="text-sm text-orange-700">• {strategy}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-3">WT 전략 (약점-위협)</h4>
                    <ul className="space-y-1">
                      {report.comprehensiveSWOT.strategicMatrix.WT_strategies.map((strategy, index) => (
                        <li key={index} className="text-sm text-red-700">• {strategy}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 전략 권고 */}
        <TabsContent value="recommendations" className="space-y-6">
          {/* 핵심 전략 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Rocket className="w-5 h-5 text-purple-600" />
                <span>핵심 전략</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {report.strategicRecommendations.coreStrategies.map((strategy, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-lg">{strategy.title}</h4>
                      <Badge variant="outline">{strategy.timeline}</Badge>
                    </div>
                    <p className="text-gray-700 mb-3">{strategy.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-green-600">예상 효과:</span>
                        <p className="text-green-700">{strategy.expectedImpact}</p>
                      </div>
                      <div>
                        <span className="font-medium text-blue-600">핵심 KPI:</span>
                        <ul className="text-blue-700">
                          {strategy.kpis.map((kpi, kpiIndex) => (
                            <li key={kpiIndex}>• {kpi}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 운영 개선사항 */}
          <Card>
            <CardHeader>
              <CardTitle>운영 개선사항</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {report.strategicRecommendations.operationalImprovements.map((improvement, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{improvement.area}</h4>
                      <Badge 
                        variant={improvement.priority === 'High' ? 'destructive' : 
                                improvement.priority === 'Medium' ? 'default' : 'secondary'}
                      >
                        {improvement.priority} Priority
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">현재 상태:</span>
                        <p className="text-gray-600">{improvement.currentState}</p>
                      </div>
                      <div>
                        <span className="font-medium">목표 상태:</span>
                        <p className="text-green-600">{improvement.targetState}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="font-medium">실행 계획:</span>
                      <ul className="mt-1 space-y-1">
                        {improvement.actionItems.map((action, actionIndex) => (
                          <li key={actionIndex} className="text-sm text-gray-700">• {action}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 실행 로드맵 */}
        <TabsContent value="roadmap" className="space-y-6">
          {/* 단계별 로드맵 */}
          <Card>
            <CardHeader>
              <CardTitle>단계별 실행 로드맵</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {report.implementationRoadmap.phases.map((phase, index) => (
                  <div key={index} className="relative">
                    {index < report.implementationRoadmap.phases.length - 1 && (
                      <div className="absolute left-4 top-12 w-0.5 h-full bg-gray-300"></div>
                    )}
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-lg">{phase.phase}</h4>
                          <Badge variant="outline">{phase.duration}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">주요 목표:</span>
                            <ul className="mt-1 space-y-1">
                              {phase.objectives.map((objective, objIndex) => (
                                <li key={objIndex} className="text-gray-700">• {objective}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="font-medium">핵심 활동:</span>
                            <ul className="mt-1 space-y-1">
                              {phase.keyActivities.map((activity, actIndex) => (
                                <li key={actIndex} className="text-gray-700">• {activity}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 리스크 관리 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-orange-600" />
                <span>리스크 관리</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {report.implementationRoadmap.riskMitigation.map((risk, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{risk.risk}</h4>
                      <div className="flex space-x-2">
                        <Badge variant="outline">확률: {risk.probability}</Badge>
                        <Badge variant="outline">영향: {risk.impact}</Badge>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">대응 방안:</span>
                      <ul className="mt-1 space-y-1">
                        {risk.mitigation.map((measure, measureIndex) => (
                          <li key={measureIndex} className="text-sm text-gray-700">• {measure}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AICAMP 서비스 연계 */}
        <TabsContent value="aicamp" className="space-y-6">
          {/* 추천 프로그램 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span>맞춤형 교육 프로그램</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {report.aicampServiceAlignment.recommendedPrograms.map((program, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-purple-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{program.program}</h4>
                      <Badge variant="secondary">우선순위 {program.priority}</Badge>
                    </div>
                    <p className="text-gray-700 mb-3">{program.relevance}</p>
                    <div>
                      <span className="font-medium">예상 성과:</span>
                      <ul className="mt-1 space-y-1">
                        {program.expectedOutcomes.map((outcome, outcomeIndex) => (
                          <li key={outcomeIndex} className="text-sm text-green-700">✓ {outcome}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 맞춤형 커리큘럼 */}
          <Card>
            <CardHeader>
              <CardTitle>맞춤형 커리큘럼</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="font-medium">추천 트랙:</span>
                    <p className="text-blue-700">{report.aicampServiceAlignment.customizedCurriculum.track}</p>
                  </div>
                  <div>
                    <span className="font-medium">교육 기간:</span>
                    <p className="text-blue-700">{report.aicampServiceAlignment.customizedCurriculum.duration}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="font-medium">교육 대상:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {report.aicampServiceAlignment.customizedCurriculum.targetAudience.map((audience, index) => (
                      <Badge key={index} variant="outline">{audience}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-medium">커리큘럼 모듈:</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {report.aicampServiceAlignment.customizedCurriculum.modules.map((module, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{module}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 컨설팅 서비스 */}
          <Card>
            <CardHeader>
              <CardTitle>전문가 컨설팅 서비스</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {report.aicampServiceAlignment.consultingServices.map((service, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">{service.service}</h4>
                    <p className="text-gray-700 mb-2">{service.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span><strong>기간:</strong> {service.timeline}</span>
                      <span className="text-green-600"><strong>기대 가치:</strong> {service.expectedValue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 하단 액션 버튼 */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-gray-800">
              🚀 지금 바로 실행하세요!
            </h3>
            <p className="text-gray-600">
              AICAMP 전문가와 함께 귀사의 성장 전략을 구체화하고 실행해보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={onRequestConsultation}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3"
                size="lg"
              >
                <Users className="w-5 h-5 mr-2" />
                전문가 상담 신청 (무료)
              </Button>
              <Button 
                onClick={handleDownloadReport}
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3"
                size="lg"
              >
                <Download className="w-5 h-5 mr-2" />
                상세 보고서 다운로드
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 헬퍼 함수
function getCategoryDisplayName(category: string): string {
  const displayNames: Record<string, string> = {
    businessModel: '비즈니스 모델',
    marketPosition: '시장 위치',
    operationalEfficiency: '운영 효율성',
    growthPotential: '성장 잠재력',
    digitalReadiness: '디지털 준비도',
    financialHealth: '재무 건전성'
  };
  return displayNames[category] || category;
} 