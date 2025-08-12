'use client'

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, Target, Shield, Clock, DollarSign, Users, 
  BarChart3, PieChart, Activity, Download, Calendar, MessageSquare 
} from 'lucide-react';
import { DiagnosisReport } from '../types';

interface DiagnosisResultViewProps {
  report: DiagnosisReport;
}

const DiagnosisResultView: React.FC<DiagnosisResultViewProps> = ({ report }) => {
  // 성숙도 레벨에 따른 색상
  const getMaturityColor = (level: string) => {
    const colors: Record<string, string> = {
      '준비형': 'bg-gray-500',
      '초기형': 'bg-orange-500',
      '발전형': 'bg-yellow-500',
      '성장형': 'bg-blue-500',
      '선도형': 'bg-green-500'
    };
    return colors[level] || 'bg-gray-500';
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {report.companyName} AI 역량진단 보고서
            </h1>
            <p className="text-gray-600">
              진단번호: {report.diagnosisId} | 생성일: {new Date(report.generatedAt).toLocaleDateString('ko-KR')}
            </p>
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            PDF 다운로드
          </Button>
        </div>
      </div>

      {/* 종합 점수 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">종합 점수</p>
                <p className="text-2xl font-bold">{report.overallScore}점</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">성숙도 레벨</p>
                <Badge className={`${getMaturityColor(report.maturityLevel)} text-white`}>
                  {report.maturityLevel}
                </Badge>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">업계 순위</p>
                <p className="text-2xl font-bold">상위 {report.industryPercentile}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">예상 ROI</p>
                <p className="text-2xl font-bold">{report.roiAnalysis.threeYearROI}%</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 탭 콘텐츠 */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="swot">SWOT 분석</TabsTrigger>
          <TabsTrigger value="roadmap">로드맵</TabsTrigger>
          <TabsTrigger value="roi">ROI 분석</TabsTrigger>
          <TabsTrigger value="proposal">제안사항</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>핵심 발견사항</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3">강점</h4>
                  <ul className="space-y-2">
                    {report.keyFindings.strengths.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700 mb-3">개선 필요</h4>
                  <ul className="space-y-2">
                    {report.keyFindings.weaknesses.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">!</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">기회</h4>
                  <ul className="space-y-2">
                    {report.keyFindings.opportunities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">★</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>우선순위 매트릭스</CardTitle>
              <CardDescription>중요도와 긴급성에 따른 실행 우선순위</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-700 mb-2">긴급 + 중요</h4>
                  <ul className="space-y-1">
                    {report.priorityMatrix.urgentImportant.map((item, idx) => (
                      <li key={idx} className="text-sm">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-700 mb-2">중요 + 비긴급</h4>
                  <ul className="space-y-1">
                    {report.priorityMatrix.importantNotUrgent.map((item, idx) => (
                      <li key={idx} className="text-sm">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-700 mb-2">긴급 + 비중요</h4>
                  <ul className="space-y-1">
                    {report.priorityMatrix.urgentNotImportant.map((item, idx) => (
                      <li key={idx} className="text-sm">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">비긴급 + 비중요</h4>
                  <ul className="space-y-1">
                    {report.priorityMatrix.notUrgentNotImportant.map((item, idx) => (
                      <li key={idx} className="text-sm">• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SWOT 분석 탭 */}
        <TabsContent value="swot" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SWOT 분석</CardTitle>
              <CardDescription>내부 역량과 외부 환경 종합 분석</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-3">Strengths (강점)</h4>
                    <ul className="space-y-2">
                      {report.swotAnalysis.strengths.map((item, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <Shield className="h-4 w-4 text-green-600 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-700 mb-3">Weaknesses (약점)</h4>
                    <ul className="space-y-2">
                      {report.swotAnalysis.weaknesses.map((item, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <Shield className="h-4 w-4 text-orange-600 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-3">Opportunities (기회)</h4>
                    <ul className="space-y-2">
                      {report.swotAnalysis.opportunities.map((item, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <Target className="h-4 w-4 text-blue-600 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-700 mb-3">Threats (위협)</h4>
                    <ul className="space-y-2">
                      {report.swotAnalysis.threats.map((item, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <Target className="h-4 w-4 text-red-600 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 로드맵 탭 */}
        <TabsContent value="roadmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>3단계 실행 로드맵</CardTitle>
              <CardDescription>AI 역량 강화를 위한 단계별 실행 계획</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {report.roadmap.map((phase, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                          {phase.phase}
                        </div>
                        {idx < report.roadmap.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="bg-white p-6 rounded-lg border">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold">{phase.title}</h3>
                              <p className="text-sm text-gray-600">{phase.period}</p>
                            </div>
                            <Badge variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                              {phase.investment}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700 mb-4">{phase.objectives}</p>
                          <div className="mb-4">
                            <p className="text-sm font-medium mb-2">주요 과제:</p>
                            <ul className="grid md:grid-cols-2 gap-2">
                              {phase.keyTasks.map((task, taskIdx) => (
                                <li key={taskIdx} className="text-sm flex items-start gap-2">
                                  <span className="text-blue-500">•</span>
                                  <span>{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="pt-4 border-t">
                            <p className="text-sm">
                              <span className="font-medium">기대 효과:</span> {phase.expectedOutcome}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ROI 분석 탭 */}
        <TabsContent value="roi" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>투자 대비 효과 분석</CardTitle>
              <CardDescription>AI 도입의 경제적 타당성 평가</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-3">투자 요약</h4>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-sm text-gray-600">총 투자비용</dt>
                        <dd className="font-semibold">{report.roiAnalysis.totalInvestment}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-gray-600">연간 절감액</dt>
                        <dd className="font-semibold">{report.roiAnalysis.annualSavings}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-gray-600">투자 회수 기간</dt>
                        <dd className="font-semibold">{report.roiAnalysis.paybackPeriod}</dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-3">ROI 전망</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">1년차 ROI</span>
                          <span className="text-sm font-semibold">{report.roiAnalysis.yearOneROI}%</span>
                        </div>
                        <Progress value={report.roiAnalysis.yearOneROI} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">3년차 누적 ROI</span>
                          <span className="text-sm font-semibold">{report.roiAnalysis.threeYearROI}%</span>
                        </div>
                        <Progress value={Math.min(report.roiAnalysis.threeYearROI, 100)} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold mb-3">정성적 효과</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Users className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="text-sm">직원 만족도 및 업무 효율성 향상</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="text-sm">데이터 기반 의사결정 체계 구축</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="text-sm">고객 서비스 품질 및 응답속도 개선</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="text-sm">경쟁우위 확보 및 시장 대응력 강화</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 제안사항 탭 */}
        <TabsContent value="proposal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AICAMP 맞춤형 제안</CardTitle>
              <CardDescription>귀사를 위한 교육 및 컨설팅 프로그램</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4">추천 교육 과정</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {report.aicampProposal.recommendedCourses.map((course, idx) => (
                      <div key={idx} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <Badge className="mb-2">추천</Badge>
                        <h5 className="font-medium">{course}</h5>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">컨설팅 단계</h4>
                  <div className="space-y-4">
                    {report.aicampProposal.consultingPhases.map((phase, idx) => (
                      <div key={idx} className="flex gap-4 p-4 border rounded-lg">
                        <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl font-bold text-blue-600">{idx + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium mb-1">{phase.phase}</h5>
                          <p className="text-sm text-gray-600 mb-2">{phase.description}</p>
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            {phase.duration}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>즉시 실행 가능한 조치</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-red-700 mb-3">즉시 (1개월 내)</h4>
                  <ul className="space-y-2">
                    {report.recommendations.immediate.map((item, idx) => (
                      <li key={idx} className="text-sm">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700 mb-3">단기 (3개월 내)</h4>
                  <ul className="space-y-2">
                    {report.recommendations.shortTerm.map((item, idx) => (
                      <li key={idx} className="text-sm">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">장기 (6개월 내)</h4>
                  <ul className="space-y-2">
                    {report.recommendations.longTerm.map((item, idx) => (
                      <li key={idx} className="text-sm">• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* CTA 섹션 */}
      <Card className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              다음 단계로 나아갈 준비가 되셨나요?
            </h3>
            <p className="mb-6 text-blue-100">
              전문가와 함께 구체적인 실행 계획을 수립하세요
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="secondary">
                <Calendar className="mr-2 h-5 w-5" />
                상담 예약
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
                <MessageSquare className="mr-2 h-5 w-5" />
                문의하기
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagnosisResultView;
