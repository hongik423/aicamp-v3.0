'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, TrendingUp, Award, Users, Clock, DollarSign, 
  CheckCircle, ArrowRight, BarChart3, Brain, Workflow,
  MessageSquareQuote, Lightbulb, Shield, Settings,
  Download, Star, AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SuccessCaseDetail } from '@/types/success-case.types';

interface IndustryDetailPageProps {
  caseData: SuccessCaseDetail;
}

export default function IndustryDetailPage({ caseData }: IndustryDetailPageProps) {
  const [activeTab, setActiveTab] = useState('challenges');
  const [showConsultation, setShowConsultation] = useState(false);

  // (삭제) 미사용 애니메이션 훅 제거로 린트 에러 해소

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 히어로 섹션 - 흰색 텍스트로 가시성 개선 */}
      <div 
        className="relative h-[600px] overflow-hidden"
        style={{
          backgroundImage: `url(${caseData.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-1">
                {caseData.industry}
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-1">
                {caseData.subIndustry}
              </Badge>
              {caseData.featured && (
                <Badge className="bg-yellow-500/90 text-white border-yellow-400">
                  <Star className="w-3 h-3 mr-1" />
                  Featured Case
                </Badge>
              )}
            </div>

            <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
              {caseData.title}
            </h1>
            
            <p className="text-xl text-white/90 mb-6">
              {caseData.subtitle}
            </p>
            
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              {caseData.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100"
                onClick={() => setShowConsultation(true)}
              >
                무료 상담 신청
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-white/50 hover:bg-white/10"
              >
                <Download className="mr-2 h-5 w-5" />
                사례 자료 다운로드
              </Button>
            </div>
          </motion.div>
        </div>

        {/* 핵심 성과 지표 오버레이 */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-4 gap-8 text-white">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-4xl font-bold">
                  {caseData.automationMetrics.productivityGain}
                </div>
                <div className="text-white/70 text-sm">생산성 향상</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-4xl font-bold">
                  {caseData.automationMetrics.costSaving}
                </div>
                <div className="text-white/70 text-sm">연간 비용 절감</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-4xl font-bold">
                  {caseData.roiData.threeYearROI}
                </div>
                <div className="text-white/70 text-sm">3년 ROI</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-4xl font-bold">
                  {caseData.roiData.paybackPeriod}
                </div>
                <div className="text-white/70 text-sm">투자 회수 기간</div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* 회사 정보 섹션 */}
      <div className="container mx-auto px-4 py-12">
        <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-8">
            <div className="grid grid-cols-5 gap-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{caseData.companyName}</h3>
                <p className="text-gray-600 mt-1">{caseData.companyInfo.industry}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{caseData.companyInfo.employees}</div>
                <div className="text-sm text-gray-600">임직원 수</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{caseData.companyInfo.revenue}</div>
                <div className="text-sm text-gray-600">연매출</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{caseData.implementationTimeline}</div>
                <div className="text-sm text-gray-600">구축 기간</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{caseData.roiData.investment}</div>
                <div className="text-sm text-gray-600">총 투자액</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 메인 콘텐츠 탭 */}
      <div className="container mx-auto px-4 pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-14">
            <TabsTrigger value="challenges" className="text-lg">
              <Target className="w-5 h-5 mr-2" />
              도전과제
            </TabsTrigger>
            <TabsTrigger value="implementation" className="text-lg">
              <Settings className="w-5 h-5 mr-2" />
              구현과정
            </TabsTrigger>
            <TabsTrigger value="results" className="text-lg">
              <TrendingUp className="w-5 h-5 mr-2" />
              성과
            </TabsTrigger>
            <TabsTrigger value="automation" className="text-lg">
              <Workflow className="w-5 h-5 mr-2" />
              자동화
            </TabsTrigger>
            <TabsTrigger value="testimonial" className="text-lg">
              <MessageSquareQuote className="w-5 h-5 mr-2" />
              고객후기
            </TabsTrigger>
          </TabsList>

          {/* 도전과제 탭 */}
          <TabsContent value="challenges" className="mt-8">
            <div className="grid gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <h2 className="text-3xl font-bold mb-4">직면했던 도전과제</h2>
                <p className="text-lg text-gray-600">
                  {caseData.companyName}이 AI와 n8n 도입 전 겪었던 핵심 문제들
                </p>
              </motion.div>

              {caseData.challenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-l-4 border-red-500 hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertCircle className="w-6 h-6 text-red-600" />
                          </div>
                          <CardTitle className="text-xl">{challenge.title}</CardTitle>
                        </div>
                        <Badge variant="destructive">Challenge #{index + 1}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{challenge.description}</p>
                      <Alert className="bg-red-50 border-red-200">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-900">
                          <strong>비즈니스 영향:</strong> {challenge.impact}
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* 구현과정 탭 */}
          <TabsContent value="implementation" className="mt-8">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-3xl font-bold mb-4">AI와 n8n 구현 과정</h2>
                <p className="text-lg text-gray-600 mb-8">
                  단계별 체계적 접근을 통한 성공적인 디지털 전환
                </p>
              </motion.div>

              <div className="relative">
                {/* 타임라인 */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />
                
                {caseData.process?.map((phase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative flex gap-8 mb-12"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {index + 1}
                      </div>
                    </div>
                    
                    <Card className="flex-1 hover:shadow-xl transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-2xl">{phase.phase}</CardTitle>
                          <Badge className="bg-blue-100 text-blue-700">
                            <Clock className="w-3 h-3 mr-1" />
                            {phase.duration}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3 text-gray-700">주요 활동</h4>
                            <ul className="space-y-2">
                              {phase.activities.map((activity, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-gray-600">{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3 text-gray-700">달성 성과</h4>
                            <ul className="space-y-2">
                              {phase.results.map((result, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <Award className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-gray-600">{result}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* 교육 프로그램 */}
              <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="text-2xl">맞춤형 AI 교육 프로그램</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-indigo-700">기초 과정</h4>
                      {caseData.curriculum.basic.map((module, idx) => (
                        <div key={idx} className="mb-4 p-3 bg-white rounded-lg">
                          <div className="font-medium">{module.title}</div>
                          <div className="text-sm text-gray-600 mt-1">{module.description}</div>
                          <Badge variant="outline" className="mt-2">
                            {module.duration}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-purple-700">심화 과정</h4>
                      {caseData.curriculum.advanced.map((module, idx) => (
                        <div key={idx} className="mb-4 p-3 bg-white rounded-lg">
                          <div className="font-medium">{module.title}</div>
                          <div className="text-sm text-gray-600 mt-1">{module.description}</div>
                          <Badge variant="outline" className="mt-2">
                            {module.duration}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-pink-700">경영진 과정</h4>
                      {caseData.curriculum.executive.map((module, idx) => (
                        <div key={idx} className="mb-4 p-3 bg-white rounded-lg">
                          <div className="font-medium">{module.title}</div>
                          <div className="text-sm text-gray-600 mt-1">{module.description}</div>
                          <Badge variant="outline" className="mt-2">
                            {module.duration}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 성과 탭 */}
          <TabsContent value="results" className="mt-8">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-3xl font-bold mb-4">달성한 성과</h2>
                <p className="text-lg text-gray-600">
                  AI와 n8n 도입 후 검증된 비즈니스 성과
                </p>
              </motion.div>

              {/* 정량적 성과 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-blue-500" />
                    정량적 성과
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {caseData.results.quantitative.map((metric, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl"
                      >
                        <div className="font-semibold text-lg mb-4">{metric.metric}</div>
                        <div className="flex items-end justify-between mb-3">
                          <div>
                            <div className="text-sm text-gray-500">Before</div>
                            <div className="text-2xl font-bold text-gray-400">{metric.before}</div>
                          </div>
                          <ArrowRight className="w-8 h-8 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-500">After</div>
                            <div className="text-2xl font-bold text-blue-600">{metric.after}</div>
                          </div>
                        </div>
                        <div className="text-center">
                          <Badge className="bg-green-500 text-white text-lg px-4 py-1">
                            {metric.improvement} 개선
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 재무 성과 */}
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-green-500" />
                    재무 성과
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {caseData.results.financial.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-lg shadow-md"
                      >
                        <div className="text-gray-600 mb-2">{item.item}</div>
                        <div className="text-3xl font-bold text-green-600">{item.amount}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 정성적 성과 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Award className="w-6 h-6 text-purple-500" />
                    정성적 성과
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {caseData.results.qualitative.map((achievement, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg"
                      >
                        <CheckCircle className="w-6 h-6 text-purple-500 flex-shrink-0" />
                        <span className="text-gray-700">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 후속 성과 */}
              <Card className="border-2 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-orange-500" />
                    지속적 성과
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {caseData.followUpResults.map((result, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-gray-600 mb-2">{result.metric}</div>
                        <div className="text-xl font-bold text-orange-600">{result.achievement}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 자동화 탭 */}
          <TabsContent value="automation" className="mt-8">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-3xl font-bold mb-4">AI & n8n 자동화 상세</h2>
                <p className="text-lg text-gray-600">
                  프로세스 자동화와 AI 구현 세부사항
                </p>
              </motion.div>

              {/* n8n 워크플로우 */}
              <div>
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Workflow className="w-6 h-6 text-blue-500" />
                  n8n 자동화 워크플로우
                </h3>
                <div className="grid gap-6">
                  {caseData.n8nWorkflows?.map((workflow, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Card className="hover:shadow-xl transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-xl">{workflow.name}</CardTitle>
                            <Badge className="bg-blue-100 text-blue-700">
                              {workflow.nodes} Nodes
                            </Badge>
                          </div>
                          <p className="text-gray-600 mt-2">{workflow.description}</p>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-semibold mb-2 text-gray-700">트리거</h5>
                              <div className="flex flex-wrap gap-2">
                                {workflow.triggers.map((trigger, i) => (
                                  <Badge key={i} variant="outline">
                                    {trigger}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="font-semibold mb-2 text-gray-700">액션</h5>
                              <div className="flex flex-wrap gap-2">
                                {workflow.actions.map((action, i) => (
                                  <Badge key={i} variant="secondary">
                                    {action}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* AI 구현 */}
              <div>
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-purple-500" />
                  AI 모델 구현
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {caseData.aiImplementations?.map((ai, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
                        <CardHeader>
                          <CardTitle className="text-lg">{ai.type}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4">{ai.purpose}</p>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-3 rounded-lg">
                              <div className="text-sm text-gray-500">정확도</div>
                              <div className="text-2xl font-bold text-purple-600">{ai.accuracy}</div>
                            </div>
                            <div className="bg-white p-3 rounded-lg">
                              <div className="text-sm text-gray-500">처리 속도</div>
                              <div className="text-2xl font-bold text-pink-600">{ai.processingTime}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 자동화 성과 지표 */}
              <Card className="bg-gradient-to-r from-cyan-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="text-2xl">자동화 핵심 성과</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <Clock className="w-12 h-12 text-cyan-500 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-cyan-700">
                        {caseData.automationMetrics.timeReduction}
                      </div>
                      <div className="text-sm text-gray-600">시간 단축</div>
                    </div>
                    <div className="text-center">
                      <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-green-700">
                        {caseData.automationMetrics.costSaving}
                      </div>
                      <div className="text-sm text-gray-600">비용 절감</div>
                    </div>
                    <div className="text-center">
                      <Shield className="w-12 h-12 text-red-500 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-red-700">
                        {caseData.automationMetrics.errorReduction}
                      </div>
                      <div className="text-sm text-gray-600">오류 감소</div>
                    </div>
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-purple-700">
                        {caseData.automationMetrics.productivityGain}
                      </div>
                      <div className="text-sm text-gray-600">생산성 향상</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 고객후기 탭 */}
          <TabsContent value="testimonial" className="mt-8">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-3xl font-bold mb-4">고객의 목소리</h2>
                <p className="text-lg text-gray-600">
                  AI와 n8n 도입 후 실제 경험과 변화
                </p>
              </motion.div>

              {/* 메인 고객 후기 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                  <CardContent className="p-12">
                    <MessageSquareQuote className="w-16 h-16 text-white/30 mb-6" />
                    <blockquote className="text-2xl leading-relaxed mb-8 italic">
                      "{caseData.testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <Users className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-xl font-bold">{caseData.testimonial.author}</div>
                        <div className="text-white/80">{caseData.testimonial.position}</div>
                        <div className="text-white/60">{caseData.testimonial.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* 성공 요인 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Lightbulb className="w-6 h-6 text-yellow-500" />
                    성공 요인
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {caseData.successFactors.map((factor, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-yellow-700 font-bold">{idx + 1}</span>
                        </div>
                        <p className="text-gray-700">{factor}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* CTA 섹션 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white"
              >
                <h3 className="text-3xl font-bold mb-4">
                  {caseData.companyName}처럼 성공하고 싶으신가요?
                </h3>
                <p className="text-xl mb-8 text-white/90">
                  AI와 n8n으로 귀사의 디지털 전환을 시작하세요
                </p>
                <div className="flex justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-gray-100"
                    onClick={() => setShowConsultation(true)}
                  >
                    무료 컨설팅 신청
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    상세 자료 다운로드
                  </Button>
                </div>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 상담 신청 모달 */}
      {showConsultation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <h3 className="text-2xl font-bold mb-4">무료 상담 신청</h3>
            <p className="text-gray-600 mb-6">
              전문가가 직접 귀사에 맞는 AI 솔루션을 제안해드립니다.
            </p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="회사명"
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                placeholder="담당자명"
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="tel"
                placeholder="연락처"
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="email"
                placeholder="이메일"
                className="w-full p-3 border rounded-lg"
              />
              <textarea
                placeholder="문의 내용"
                rows={4}
                className="w-full p-3 border rounded-lg"
              />
              <div className="flex gap-3">
                <Button className="flex-1">신청하기</Button>
                <Button
                  variant="outline"
                  onClick={() => setShowConsultation(false)}
                >
                  취소
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
