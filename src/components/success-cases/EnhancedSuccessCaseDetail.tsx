'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Play, Download, MessageCircle, TrendingUp, Clock, DollarSign,
  Target, CheckCircle, Users, Zap, BarChart3, Calendar, Award, ExternalLink,
  BookOpen, Lightbulb, Rocket, Shield, Brain, Settings, ChevronRight, Star,
  FileText, Video, Presentation, ChartBar, ChartLine, ChartPie,
  TrendingDown, AlertCircle, CheckCircle2, Activity, Calculator
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { EnhancedSuccessCaseDetail } from '@/types/enhanced-success-case.types';

interface EnhancedSuccessCaseDetailProps {
  caseData: EnhancedSuccessCaseDetail;
  onConsultationRequest?: () => void;
}

export default function EnhancedSuccessCaseDetailComponent({ 
  caseData,
  onConsultationRequest
}: EnhancedSuccessCaseDetailProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSubTab, setActiveSubTab] = useState('education');

  const IconComponent = caseData.icon;

  // 리소스 아이콘 매핑
  const resourceIcons = {
    video: Video,
    pdf: FileText,
    presentation: Presentation,
    webinar: Video // Webinar 대신 Video 사용
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 네비게이션 */}
      <div className="bg-white border-b sticky top-0 z-40">
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
              <Badge variant="outline">{caseData.subIndustry}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* 히어로 섹션 */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white">
        <div className="absolute inset-0">
          <img
            src={caseData.heroImage}
            alt={caseData.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-xl bg-white/20 backdrop-blur-sm`}>
                  <IconComponent className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl font-bold opacity-95">{caseData.companyName}</h3>
                  <p className="text-sm opacity-80">{caseData.companySize}</p>
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {caseData.title}
              </h1>
              <p className="text-xl lg:text-2xl opacity-95 mb-6">{caseData.subtitle}</p>
              <p className="text-lg opacity-85 mb-8 leading-relaxed">{caseData.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {caseData.tags.slice(0, 5).map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={onConsultationRequest}
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  무료 상담 신청
                </Button>
                {caseData.resources.find(r => r.type === 'pdf') && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    상세 자료 다운로드
                  </Button>
                )}
              </div>
            </div>

            {/* 핵심 성과 카드 */}
            <div className="grid grid-cols-2 gap-4">
              {caseData.educationPerformance.slice(0, 4).map((perf, index) => {
                const PerfIcon = perf.icon || TrendingUp;
                return (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all">
                    <CardContent className="p-6 text-center">
                      <PerfIcon className="w-10 h-10 mx-auto mb-3 text-yellow-300" />
                      <div className="text-3xl font-bold mb-1">{perf.improvement}</div>
                      <div className="text-sm opacity-90">{perf.metric}</div>
                      <div className="text-xs opacity-75 mt-2">
                        {perf.before} → {perf.after}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 퀵 스탯 바 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {caseData.curriculum.overview.totalDuration}
              </div>
              <div className="text-sm text-gray-600">프로젝트 기간</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {caseData.curriculum.overview.participantCount}
              </div>
              <div className="text-sm text-gray-600">참여 인원</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {caseData.performanceDashboard.financialAnalysis.roi}
              </div>
              <div className="text-sm text-gray-600">투자 수익률</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {caseData.curriculum.overview.completionRate}
              </div>
              <div className="text-sm text-gray-600">교육 이수율</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {caseData.curriculum.overview.satisfactionScore}
              </div>
              <div className="text-sm text-gray-600">만족도</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {caseData.n8nWorkflows.length}개
              </div>
              <div className="text-sm text-gray-600">자동화 워크플로우</div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 gap-2">
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="curriculum">커리큘럼</TabsTrigger>
            <TabsTrigger value="recommendation">맞춤추천</TabsTrigger>
            <TabsTrigger value="process">프로세스</TabsTrigger>
            <TabsTrigger value="results">성과</TabsTrigger>
            <TabsTrigger value="dashboard">지표</TabsTrigger>
            <TabsTrigger value="testimonials">후기</TabsTrigger>
          </TabsList>

          {/* 개요 탭 */}
          <TabsContent value="overview" className="space-y-8">
            {/* 교육 프로세스 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="w-6 h-6 text-blue-600" />
                  교육 프로세스
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {caseData.educationProcess.map((phase, index) => (
                    <div key={index} className="relative">
                      {index < caseData.educationProcess.length - 1 && (
                        <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gray-200" />
                      )}
                      
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            {index + 1}
                          </div>
                        </div>
                        
                        <div className="flex-1 bg-white rounded-xl border shadow-sm p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
                              <p className="text-sm text-gray-500 mt-1">{phase.phase} · {phase.duration}</p>
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-3 gap-6">
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <Activity className="w-4 h-4" />
                                주요 활동
                              </h4>
                              <ul className="space-y-2">
                                {phase.activities.map((activity, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>{activity}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                산출물
                              </h4>
                              <ul className="space-y-2">
                                {phase.deliverables.map((deliverable, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                    <Target className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <span>{deliverable}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <BarChart3 className="w-4 h-4" />
                                핵심 지표
                              </h4>
                              <ul className="space-y-2">
                                {phase.keyMetrics.map((metric, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm">
                                    <TrendingUp className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="font-medium text-gray-700">{metric}</span>
                                  </li>
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

            {/* 측정된 교육 성과 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChartBar className="w-6 h-6 text-green-600" />
                  측정된 교육 성과
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {caseData.educationPerformance.map((perf, index) => {
                    const PerfIcon = perf.icon || TrendingUp;
                    return (
                      <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <PerfIcon className="w-8 h-8 text-blue-600" />
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {perf.improvement}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-lg mb-2">{perf.metric}</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Before</span>
                              <span className="font-medium text-red-600">{perf.before}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-gradient-to-r from-red-500 to-green-500 h-2 rounded-full" style={{width: '85%'}} />
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">After</span>
                              <span className="font-medium text-green-600">{perf.after}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* 업종별 커스터마이징 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-6 h-6 text-purple-600" />
                  업종별 커스터마이징
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                      업종 특화 도전과제
                    </h4>
                    <ul className="space-y-3">
                      {caseData.industryCustomization.specificChallenges.map((challenge, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                          <span className="text-sm text-gray-700">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-blue-500" />
                      맞춤형 솔루션
                    </h4>
                    <ul className="space-y-3">
                      {caseData.industryCustomization.customSolutions.map((solution, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                          <span className="text-sm text-gray-700">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-500" />
                      기대 성과
                    </h4>
                    <ul className="space-y-3">
                      {caseData.industryCustomization.expectedOutcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">
                            ✓
                          </span>
                          <span className="text-sm text-gray-700">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 커리큘럼 탭 */}
          <TabsContent value="curriculum" className="space-y-8">
            {/* 커리큘럼 개요 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  커리큘럼 개요
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">{caseData.curriculum.overview.totalDuration}</div>
                    <div className="text-sm text-gray-600">총 교육 기간</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">{caseData.curriculum.overview.participantCount}</div>
                    <div className="text-sm text-gray-600">참여 인원</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">{caseData.curriculum.overview.completionRate}</div>
                    <div className="text-sm text-gray-600">이수율</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-yellow-600">{caseData.curriculum.overview.satisfactionScore}</div>
                    <div className="text-sm text-gray-600">만족도</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold mb-4">핵심 하이라이트</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {caseData.curriculum.overview.keyHighlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 과정별 상세 커리큘럼 */}
            <Card>
              <CardHeader>
                <CardTitle>과정별 상세 커리큘럼</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="basic">기초 과정</TabsTrigger>
                    <TabsTrigger value="advanced">심화 과정</TabsTrigger>
                    <TabsTrigger value="executive">경영진 과정</TabsTrigger>
                    <TabsTrigger value="industry">업종 특화</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="mt-6 space-y-4">
                    {caseData.curriculum.basic.map((module) => (
                      <Card key={module.moduleId} className="border-l-4 border-blue-500">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-bold">{module.title}</h4>
                              <p className="text-sm text-gray-500 mt-1">모듈 {module.moduleId} · {module.duration}</p>
                            </div>
                            <Badge variant="outline" className="bg-blue-50">기초</Badge>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h5 className="font-semibold text-sm text-gray-700 mb-2">학습 목표</h5>
                              <ul className="space-y-1">
                                {module.objectives.map((obj, idx) => (
                                  <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                    <ChevronRight className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                    {obj}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-semibold text-sm text-gray-700 mb-2">주요 주제</h5>
                              <ul className="space-y-1">
                                {module.topics.map((topic, idx) => (
                                  <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                    <ChevronRight className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                    {topic}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex flex-wrap gap-2">
                              <span className="text-xs text-gray-500">도구:</span>
                              {module.tools.map((tool) => (
                                <Badge key={tool} variant="secondary" className="text-xs">
                                  {tool}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="advanced" className="mt-6 space-y-4">
                    {caseData.curriculum.advanced.map((module) => (
                      <Card key={module.moduleId} className="border-l-4 border-purple-500">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-bold">{module.title}</h4>
                              <p className="text-sm text-gray-500 mt-1">모듈 {module.moduleId} · {module.duration}</p>
                            </div>
                            <Badge variant="outline" className="bg-purple-50">심화</Badge>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h5 className="font-semibold text-sm text-gray-700 mb-2">학습 목표</h5>
                              <ul className="space-y-1">
                                {module.objectives.map((obj, idx) => (
                                  <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                    <ChevronRight className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                    {obj}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-semibold text-sm text-gray-700 mb-2">실습 과제</h5>
                              <ul className="space-y-1">
                                {module.practicalExercises.map((exercise, idx) => (
                                  <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                    <ChevronRight className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                    {exercise}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t">
                            <h5 className="font-semibold text-sm text-gray-700 mb-2">기대 성과</h5>
                            <div className="grid md:grid-cols-3 gap-3">
                              {module.outcomes.map((outcome, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-green-600">
                                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                                  {outcome}
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="executive" className="mt-6 space-y-4">
                    {caseData.curriculum.executive.map((module) => (
                      <Card key={module.moduleId} className="border-l-4 border-orange-500">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-bold">{module.title}</h4>
                              <p className="text-sm text-gray-500 mt-1">모듈 {module.moduleId} · {module.duration}</p>
                            </div>
                            <Badge variant="outline" className="bg-orange-50">경영진</Badge>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-semibold text-sm text-gray-700 mb-2">핵심 목표</h5>
                              <ul className="space-y-1">
                                {module.objectives.map((obj, idx) => (
                                  <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                    <Target className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                    {obj}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="industry" className="mt-6 space-y-4">
                    {caseData.curriculum.industrySpecific.map((module) => (
                      <Card key={module.moduleId} className="border-l-4 border-green-500">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-bold">{module.title}</h4>
                              <p className="text-sm text-gray-500 mt-1">모듈 {module.moduleId} · {module.duration}</p>
                            </div>
                            <Badge variant="outline" className="bg-green-50">업종특화</Badge>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-semibold text-sm text-gray-700 mb-2">업종별 특화 내용</h5>
                              <ul className="space-y-1">
                                {module.topics.map((topic, idx) => (
                                  <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                    <Settings className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    {topic}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 맞춤추천 탭 - 간략화 */}
          <TabsContent value="recommendation" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-6 h-6 text-purple-600" />
                  맞춤형 커리큘럼 추천
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {caseData.customizedProposal.curriculumRecommendation.map((rec, index) => (
                    <Card key={index} className="border-2 hover:border-purple-300 transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <Badge variant="secondary" className="mb-2">{rec.recommendationType}</Badge>
                            <h4 className="text-xl font-bold">{rec.title}</h4>
                            <p className="text-gray-600 mt-2">{rec.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">{rec.expectedROI}</div>
                            <div className="text-sm text-gray-500">예상 ROI</div>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <h5 className="font-semibold text-sm mb-2">주요 혜택</h5>
                            <ul className="space-y-1">
                              {rec.benefits.map((benefit, idx) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>예상 기간: {rec.estimatedDuration}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 프로세스 탭 */}
          <TabsContent value="process" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-600" />
                  AICAMP 적용 프로세스
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {caseData.aicampProcess.map((step) => (
                    <div key={step.stepNumber} className="relative">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                            {step.stepNumber}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <Card className="border-0 shadow-md">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h4 className="text-lg font-bold">{step.stepName}</h4>
                                  <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                                </div>
                                <Badge variant="outline">{step.duration}</Badge>
                              </div>
                              
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="font-semibold text-sm text-gray-700 mb-2">투입 요소</h5>
                                  <ul className="space-y-1">
                                    {step.inputs.map((input, idx) => (
                                      <li key={idx} className="text-sm text-gray-600">• {input}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="font-semibold text-sm text-gray-700 mb-2">산출물</h5>
                                  <ul className="space-y-1">
                                    {step.outputs.map((output, idx) => (
                                      <li key={idx} className="text-sm text-gray-600">• {output}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              
                              <div className="mt-4 pt-4 border-t">
                                <h5 className="font-semibold text-sm text-gray-700 mb-2">성공 기준</h5>
                                <div className="flex flex-wrap gap-2">
                                  {step.successCriteria.map((criteria, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {criteria}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 성과 탭 */}
          <TabsContent value="results" className="space-y-8">
            {/* 정량적 성과 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChartLine className="w-6 h-6 text-blue-600" />
                  정량적 성과
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {caseData.results.quantitative.map((result, index) => (
                    <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline">{result.category}</Badge>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {result.improvement}
                          </Badge>
                        </div>
                        <h4 className="font-semibold mb-3">{result.metric}</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">기준</span>
                            <span className="font-medium">{result.baseline}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">목표</span>
                            <span className="font-medium text-blue-600">{result.target}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">달성</span>
                            <span className="font-bold text-green-600">{result.achieved}</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-xs text-gray-500">검증: {result.verificationMethod}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 재무적 성과 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  재무적 성과
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {caseData.results.financial.map((financial, index) => (
                    <Card key={index} className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-blue-50">
                      <CardContent className="p-4 text-center">
                        <Badge variant="outline" className="mb-2">{financial.category}</Badge>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">{financial.item}</h4>
                        <div className="text-2xl font-bold text-green-600 mb-1">{financial.amount}</div>
                        <div className="text-xs text-gray-500">{financial.period}</div>
                        <div className="mt-3 pt-3 border-t flex justify-between text-xs">
                          <span>ROI: {financial.roi}</span>
                          <span>회수: {financial.paybackPeriod}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 지표 탭 */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* KPI 대시보드 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-indigo-600" />
                  핵심 성과 지표
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {caseData.performanceDashboard.kpis.map((kpi, index) => (
                    <Card key={index} className="border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">{kpi.category}</Badge>
                          {kpi.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                          ) : kpi.trend === 'down' ? (
                            <TrendingDown className="w-4 h-4 text-red-500" />
                          ) : (
                            <Activity className="w-4 h-4 text-gray-500" />
                          )}
                        </div>
                        <h4 className="font-semibold text-sm mb-3">{kpi.kpiName}</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-500">목표</span>
                            <span>{kpi.target}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-500">실제</span>
                            <span className="font-bold">{kpi.actual}</span>
                          </div>
                          <Progress 
                            value={85} 
                            className={`h-2 ${kpi.status === 'exceeded' ? 'bg-green-100' : kpi.status === 'met' ? 'bg-blue-100' : 'bg-red-100'}`}
                          />
                        </div>
                        <div className="mt-2">
                          <Badge 
                            variant="secondary" 
                            className={`text-xs w-full justify-center ${
                              kpi.status === 'exceeded' ? 'bg-green-100 text-green-800' : 
                              kpi.status === 'met' ? 'bg-blue-100 text-blue-800' : 
                              'bg-red-100 text-red-800'
                            }`}
                          >
                            {kpi.variance}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 재무 분석 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChartPie className="w-6 h-6 text-green-600" />
                  재무 성과 분석
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-lg font-bold">{caseData.performanceDashboard.financialAnalysis.totalInvestment}</div>
                    <div className="text-xs text-gray-600">총 투자</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-lg font-bold">{caseData.performanceDashboard.financialAnalysis.totalSavings}</div>
                    <div className="text-xs text-gray-600">총 절감</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Target className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-lg font-bold">{caseData.performanceDashboard.financialAnalysis.netBenefit}</div>
                    <div className="text-xs text-gray-600">순이익</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Award className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                    <div className="text-lg font-bold">{caseData.performanceDashboard.financialAnalysis.roi}</div>
                    <div className="text-xs text-gray-600">ROI</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <ChartBar className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <div className="text-lg font-bold">{caseData.performanceDashboard.financialAnalysis.irrRate}</div>
                    <div className="text-xs text-gray-600">IRR</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <DollarSign className="w-6 h-6 text-red-600 mx-auto mb-2" />
                    <div className="text-lg font-bold">{caseData.performanceDashboard.financialAnalysis.npv}</div>
                    <div className="text-xs text-gray-600">NPV</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SWOT 분석 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-purple-600" />
                  SWOT 분석 결과
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Strengths */}
                  <Card className="border-0 shadow-sm bg-blue-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base text-blue-700">강점 (S)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {caseData.performanceDashboard.swotAnalysis.strengths.map((item, idx) => (
                        <div key={idx} className="text-sm">
                          <div className="font-medium text-blue-900">{item.factor}</div>
                          <Badge variant="outline" className="text-xs mt-1">
                            영향도: {item.impact}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Weaknesses */}
                  <Card className="border-0 shadow-sm bg-orange-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base text-orange-700">약점 (W)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {caseData.performanceDashboard.swotAnalysis.weaknesses.map((item, idx) => (
                        <div key={idx} className="text-sm">
                          <div className="font-medium text-orange-900">{item.factor}</div>
                          <Badge variant="outline" className="text-xs mt-1">
                            영향도: {item.impact}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Opportunities */}
                  <Card className="border-0 shadow-sm bg-green-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base text-green-700">기회 (O)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {caseData.performanceDashboard.swotAnalysis.opportunities.map((item, idx) => (
                        <div key={idx} className="text-sm">
                          <div className="font-medium text-green-900">{item.factor}</div>
                          <Badge variant="outline" className="text-xs mt-1">
                            잠재력: {item.potential}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Threats */}
                  <Card className="border-0 shadow-sm bg-red-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base text-red-700">위협 (T)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {caseData.performanceDashboard.swotAnalysis.threats.map((item, idx) => (
                        <div key={idx} className="text-sm">
                          <div className="font-medium text-red-900">{item.factor}</div>
                          <Badge variant="outline" className="text-xs mt-1">
                            가능성: {item.likelihood}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 후기 탭 */}
          <TabsContent value="testimonials" className="space-y-8">
            {/* 고객 후기 */}
            <div className="space-y-6">
              {caseData.testimonials.map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{testimonial.title}</h3>
                        <div className="flex items-center gap-2 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-2">
                            {testimonial.rating}.0 / 5.0
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline">{testimonial.date}</Badge>
                    </div>

                    <blockquote className="text-lg italic text-gray-700 mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>

                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">주요 혜택</h4>
                        <ul className="space-y-1">
                          {testimonial.keyBenefits.map((benefit, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">도전 과제</h4>
                        <ul className="space-y-1">
                          {testimonial.challenges.map((challenge, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">추천 사항</h4>
                        <ul className="space-y-1">
                          {testimonial.recommendations.map((rec, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                              <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t">
                      <div>
                        <div className="font-semibold">{testimonial.author}</div>
                        <div className="text-sm text-gray-600">{testimonial.position}</div>
                        <div className="text-sm text-gray-500">{testimonial.company}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{testimonial.npsScore}</div>
                          <div className="text-xs text-gray-500">NPS Score</div>
                        </div>
                        {testimonial.wouldRecommend && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            추천
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 장기 성과 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  6개월 후 추가 성과
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {caseData.longTermImpact.sixMonthResults.map((result, index) => (
                    <Card key={index} className="border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline">{result.period}</Badge>
                          {result.trend === 'improving' ? (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                          ) : (
                            <Activity className="w-4 h-4 text-gray-500" />
                          )}
                        </div>
                        <h4 className="font-semibold mb-2">{result.metric}</h4>
                        <div className="text-2xl font-bold text-blue-600 mb-3">{result.value}</div>
                        <div className="space-y-1">
                          {result.actions.map((action, idx) => (
                            <div key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                              <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0" />
                              {action}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 하단 CTA */}
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-3xl font-bold mb-4">
              우리 회사도 이런 성과를 낼 수 있을까요?
            </h3>
            <p className="text-xl opacity-95 mb-8 max-w-3xl mx-auto">
              {caseData.industry} 업종 맞춤 AI & n8n 자동화 솔루션으로 
              디지털 전환을 성공적으로 완성하세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={onConsultationRequest}
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                무료 상담 신청하기
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => router.push('/roi-calculator')}
              >
                <Calculator className="w-5 h-5 mr-2" />
                ROI 계산해보기
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 관련 자료 */}
        {caseData.resources.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-6 h-6" />
                관련 자료
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {caseData.resources.map((resource, index) => {
                  const ResourceIcon = resourceIcons[resource.type];
                  return (
                    <Card key={index} className="border hover:shadow-md transition-all cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <ResourceIcon className="w-8 h-8 text-blue-600 flex-shrink-0" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm mb-1">{resource.title}</h4>
                            <p className="text-xs text-gray-600 mb-2">{resource.description}</p>
                            <Button variant="outline" size="sm" className="w-full">
                              <Download className="w-4 h-4 mr-1" />
                              다운로드
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
