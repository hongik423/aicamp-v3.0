'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Play,
  Download,
  MessageCircle,
  TrendingUp,
  Clock,
  DollarSign,
  Target,
  CheckCircle,
  Users,
  Zap,
  BarChart3,
  Calendar,
  Award,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { SuccessCaseDetail } from '@/types/success-case.types';
import EnhancedAIProgramShowcase from '@/components/programs/EnhancedAIProgramShowcase';

interface SuccessCaseDetailPageProps {
  caseData: SuccessCaseDetail;
  onConsultationRequest?: () => void;
}

export default function SuccessCaseDetailPage({ 
  caseData,
  onConsultationRequest
}: SuccessCaseDetailPageProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const IconComponent = caseData.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              목록으로 돌아가기
            </Button>
            <div className="flex items-center gap-3">
              {caseData.featured && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  <Award className="w-3 h-3 mr-1" />
                  추천 사례
                </Badge>
              )}
              <Badge variant="outline">{caseData.industry}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* 히어로 섹션 */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={caseData.heroImage}
            alt={caseData.title}
            className="w-full h-full object-cover"
          />
          {/* AI 이미지 스타일 그라디언트 - 가시성 개선 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-lg bg-white/20 backdrop-blur-sm shadow-2xl`}>
                  <IconComponent className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white drop-shadow-lg">{caseData.companyName}</h3>
                  <p className="text-sm text-white/95 drop-shadow-md">{caseData.subIndustry}</p>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-2xl">{caseData.title}</h1>
              <p className="text-xl text-white mb-6 drop-shadow-xl">{caseData.subtitle}</p>
              <p className="text-lg text-white/95 mb-8 drop-shadow-lg">{caseData.description}</p>
              
              <div className="flex flex-wrap gap-3">
                {caseData.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-white/20 text-white border border-white/30 shadow-lg">
                    {tag}
                  </Badge>
                )) || null}
              </div>
            </div>

            {/* 핵심 성과 지표 */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-300" />
                  <div className="text-2xl font-bold text-white">{caseData.automationMetrics?.productivityGain || 'N/A'}</div>
                  <div className="text-sm text-white/75">생산성 향상</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-4 text-center">
                  <DollarSign className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-lg font-bold text-white">{caseData.automationMetrics?.costSaving || 'N/A'}</div>
                  <div className="text-sm text-white/75">비용 절감</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-4 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                  <div className="text-2xl font-bold text-white">{caseData.automationMetrics?.timeReduction || 'N/A'}</div>
                  <div className="text-sm text-white/75">시간 단축</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-4 text-center">
                  <Target className="w-8 h-8 mx-auto mb-2 text-red-300" />
                  <div className="text-2xl font-bold text-white">{caseData.roiData?.threeYearROI || 'N/A'}</div>
                  <div className="text-sm text-white/75">3년 ROI</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="challenges">도전과제</TabsTrigger>
            <TabsTrigger value="process">구현과정</TabsTrigger>
            <TabsTrigger value="results">성과</TabsTrigger>
            <TabsTrigger value="automation">자동화</TabsTrigger>
            <TabsTrigger value="testimonial">고객후기</TabsTrigger>
          </TabsList>

          {/* 개요 탭 */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* 회사 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    회사 정보
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">업종</span>
                    <span className="font-medium">{caseData.companyInfo?.industry || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">직원 수</span>
                    <span className="font-medium">{caseData.companyInfo?.employees || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">매출</span>
                    <span className="font-medium">{caseData.companyInfo?.revenue || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">위치</span>
                    <span className="font-medium">{caseData.companyInfo?.location || 'N/A'}</span>
                  </div>
                </CardContent>
              </Card>

              {/* ROI 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    ROI 분석
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">투자 금액</span>
                    <span className="font-medium">{caseData.roiData?.investment || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">월간 절감</span>
                    <span className="font-medium text-green-600">{caseData.roiData?.monthlySavings || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">회수 기간</span>
                    <span className="font-medium">{caseData.roiData?.paybackPeriod || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">3년 ROI</span>
                    <span className="font-medium text-blue-600">{caseData.roiData?.threeYearROI || 'N/A'}</span>
                  </div>
                </CardContent>
              </Card>

              {/* 구현 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    구현 정보
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">구현 기간</span>
                    <span className="font-medium">{caseData.implementationTimeline}</span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-gray-600">성공 요인</span>
                    <div className="space-y-1">
                      {caseData.successFactors?.map((factor, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 자료 다운로드 */}
            {(caseData.videoUrl || caseData.pdfUrl) && (
              <Card>
                <CardHeader>
                  <CardTitle>관련 자료</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    {caseData.videoUrl && (
                      <Button variant="outline" className="flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        동영상 보기
                      </Button>
                    )}
                    {caseData.pdfUrl && (
                      <Button variant="outline" className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        상세 보고서 다운로드
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* 도전과제 탭 */}
          <TabsContent value="challenges" className="space-y-6">
            <div className="grid gap-6">
                              {caseData.challenges?.map((challenge, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-red-600">{challenge.title}</h3>
                    <p className="text-gray-700 mb-4">{challenge.description}</p>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">비즈니스 임팩트</h4>
                      <p className="text-red-700">{challenge.impact}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 구현과정 탭 */}
          <TabsContent value="process" className="space-y-6">
            <div className="space-y-8">
                              {caseData.process?.map((phase, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold">{phase.phase}</h3>
                          <Badge variant="outline">{phase.duration}</Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3 text-blue-600">주요 활동</h4>
                            <ul className="space-y-2">
                              {phase.activities?.map((activity, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                  <span className="text-sm">{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3 text-green-600">달성 성과</h4>
                            <ul className="space-y-2">
                              {phase.results?.map((result, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <Target className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                                  <span className="text-sm">{result}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 성과 탭 */}
          <TabsContent value="results" className="space-y-8">
            {/* 정량적 성과 */}
            <Card>
              <CardHeader>
                <CardTitle>정량적 성과</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {caseData.results.quantitative?.map((result, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{result.metric}</h4>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {result.improvement}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Before: {result.before}</span>
                        <span>After: {result.after}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 재무적 성과 */}
            <Card>
              <CardHeader>
                <CardTitle>재무적 성과</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {caseData.results.financial?.map((financial, index) => (
                    <div key={index} className="text-center p-4 bg-blue-50 rounded-lg">
                      <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-lg font-bold text-blue-600">{financial.amount}</div>
                      <div className="text-sm text-gray-600">{financial.item}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 정성적 성과 */}
            <Card>
              <CardHeader>
                <CardTitle>정성적 성과</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {caseData.results.qualitative?.map((quality, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <span>{quality}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 자동화 탭 */}
          <TabsContent value="automation" className="space-y-8">
            {/* n8n 워크플로우 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  n8n 워크플로우
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {caseData.n8nWorkflows?.map((workflow, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold">{workflow.workflowName}</h4>
                        <Badge variant="outline">{workflow.executionCount.toLocaleString()}회 실행</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{workflow.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {workflow.integrations?.map((integration) => (
                          <Badge key={integration} variant="secondary">
                            {integration}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">
                        트리거: {workflow.triggerType}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI 구현 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  AI 구현 사항
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {caseData.aiImplementations?.map((ai, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{ai.aiTool}</h4>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          정확도 {ai.accuracy}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{ai.useCase}</p>
                      <div className="text-sm text-gray-500">
                        학습 데이터: {ai.trainingData}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 부서별 자동화 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  부서별 자동화 현황
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {caseData.departmentAutomations?.map((dept, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold">{dept.department}</h4>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          자동화율 {dept.automationLevel}
                        </Badge>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">자동화 프로세스</div>
                          <div className="flex flex-wrap gap-1">
                            {dept.processes?.map((process) => (
                              <Badge key={process} variant="outline" className="text-xs">
                                {process}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">효율성 개선</div>
                          <div className="text-lg font-bold text-green-600">{dept.efficiency}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-red-100 rounded">
                          <div className="text-sm text-gray-600">이전 (수작업)</div>
                          <div className="font-semibold text-red-600">{dept.manualHours}</div>
                        </div>
                        <div className="p-3 bg-green-100 rounded">
                          <div className="text-sm text-gray-600">현재 (자동화)</div>
                          <div className="font-semibold text-green-600">{dept.automatedHours}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 고객후기 탭 */}
          <TabsContent value="testimonial" className="space-y-8">
            <Card>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="text-6xl text-blue-200 mb-4">"</div>
                  <blockquote className="text-xl italic text-gray-700 leading-relaxed mb-6">
                    {caseData.testimonial?.quote || 'N/A'}
                  </blockquote>
                  <div className="text-center">
                                          <div className="font-semibold text-lg">{caseData.testimonial?.author || 'N/A'}</div>
                      <div className="text-gray-600">{caseData.testimonial?.position || 'N/A'}</div>
                      <div className="text-gray-500">{caseData.testimonial?.company || 'N/A'}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 후속 성과 */}
                              {caseData.followUpResults?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>후속 성과</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {caseData.followUpResults?.map((followUp, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-green-600 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-green-800">{followUp.metric}</div>
                          <div className="text-green-700">{followUp.achievement}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* 상담신청 CTA */}
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              우리 회사도 이런 성과를 낼 수 있을까요?
            </h3>
            <p className="text-lg opacity-90 mb-6">
              업종별 맞춤 솔루션으로 더 큰 성과를 만들어보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={onConsultationRequest}
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                무료 상담 신청
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                유사 사례 더 보기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 고도화된 AI & N8N 프로그램 섹션 */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              이 성과를 달성한 핵심 프로그램
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {caseData.companyName}의 혁신적 변화를 이끈 최상의 고몰입 조직구축 AI & N8N 마스터 프로그램을 
              귀하의 조직에도 적용해보세요.
            </p>
          </div>
          
          <EnhancedAIProgramShowcase onConsultationRequest={onConsultationRequest} />
        </div>
      </div>
    </div>
  );
}
