'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
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
  ExternalLink,
  Share2,
  BookOpen,
  Play,
  ChevronRight,
  Star,
  Globe,
  Shield,
  Brain
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { SuccessCaseDetail } from '@/types/success-case.types';
import { getRelatedCases } from '@/data/success-cases/benchmark-cases-index';

interface EnhancedSuccessCaseDetailProps {
  caseData: SuccessCaseDetail;
  onConsultationRequest?: () => void;
}

export default function EnhancedSuccessCaseDetail({ 
  caseData,
  onConsultationRequest
}: EnhancedSuccessCaseDetailProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  
  const IconComponent = caseData.icon;
  const relatedCases = getRelatedCases(caseData.id, 3);

  // 성과 지표 계산
  const calculateImprovementScore = () => {
    const improvements = caseData.results.quantitative.map(q => 
      parseInt(q.improvement.replace(/[^0-9]/g, '')) || 0
    );
    return Math.round(improvements.reduce((a, b) => a + b, 0) / improvements.length);
  };

  const improvementScore = calculateImprovementScore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 헤더 네비게이션 */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center gap-2 hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4" />
              목록으로 돌아가기
            </Button>
            <div className="flex items-center gap-3">
              {caseData.featured && (
                <Badge variant="secondary" className="bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800">
                  <Award className="w-3 h-3 mr-1" />
                  추천 사례
                </Badge>
              )}
              <Badge variant="outline" className="border-2">
                {caseData.industry}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {/* 공유 기능 */}}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 히어로 섹션 - 개선된 디자인 */}
      <div 
        className="relative h-[600px] bg-cover bg-center overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${caseData.heroImage})` 
        }}
      >
        {/* AI 생성 이미지 스타일 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-white">
              {/* 업종 아이콘과 회사 정보 */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl`}>
                  <IconComponent className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
                <div>
                  <p className="text-lg font-medium text-white drop-shadow-lg">
                    {caseData.subIndustry} | {caseData.companyName}
                  </p>
                  <p className="text-sm text-white/90 drop-shadow-md">
                    {caseData.companySize} · {caseData.companyInfo.location}
                  </p>
                </div>
              </div>

              {/* 타이틀 */}
              <h1 className="text-5xl font-bold mb-4 leading-tight text-white drop-shadow-2xl">
                {caseData.title}
              </h1>
              <p className="text-2xl mb-8 text-white/95 drop-shadow-xl">
                {caseData.subtitle}
              </p>

              {/* 핵심 지표 - 더 돋보이게 */}
              <div className="flex flex-wrap gap-6 mb-8">
                {caseData.results.quantitative.slice(0, 3).map((metric, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-4 min-w-[140px] border border-white/20 shadow-xl">
                    <p className="text-sm text-white/90 mb-1 drop-shadow">{metric.metric}</p>
                    <p className="text-3xl font-bold text-yellow-400 drop-shadow-lg">
                      {metric.improvement}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA 버튼 그룹 */}
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-xl"
                  onClick={() => setShowConsultationModal(true)}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  무료 상담 신청하기
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20"
                  onClick={() => setShowVideoModal(true)}
                >
                  <Play className="w-5 h-5 mr-2" />
                  사례 영상 보기
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 개선 점수 배지 */}
        <div className="absolute top-8 right-8">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 text-center">
            <p className="text-sm text-gray-600 mb-2">평균 개선율</p>
            <p className="text-4xl font-bold text-blue-600">+{improvementScore}%</p>
            <div className="flex mt-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.round(improvementScore / 20) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 회사 정보 카드 */}
        <Card className="mb-8 shadow-lg border-0">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-4">
                <Building2 className="w-10 h-10 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">산업</p>
                  <p className="font-semibold">{caseData.companyInfo.industry}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Users className="w-10 h-10 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">직원 수</p>
                  <p className="font-semibold">{caseData.companyInfo.employees}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <DollarSign className="w-10 h-10 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">연 매출</p>
                  <p className="font-semibold">{caseData.companyInfo.revenue}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Calendar className="w-10 h-10 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-500">구현 기간</p>
                  <p className="font-semibold">{caseData.implementationPeriod}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 탭 콘텐츠 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-5 w-full h-auto p-1 bg-gray-100">
            <TabsTrigger value="overview" className="py-3">
              <Brain className="w-4 h-4 mr-2" />
              개요
            </TabsTrigger>
            <TabsTrigger value="challenges" className="py-3">
              <Target className="w-4 h-4 mr-2" />
              도전과제
            </TabsTrigger>
            <TabsTrigger value="process" className="py-3">
              <Zap className="w-4 h-4 mr-2" />
              구현과정
            </TabsTrigger>
            <TabsTrigger value="results" className="py-3">
              <TrendingUp className="w-4 h-4 mr-2" />
              성과
            </TabsTrigger>
            <TabsTrigger value="automation" className="py-3">
              <Shield className="w-4 h-4 mr-2" />
              자동화
            </TabsTrigger>
          </TabsList>

          {/* 개요 탭 */}
          <TabsContent value="overview" className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Brain className="w-6 h-6 text-blue-600" />
                  프로젝트 개요
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-gray-700">
                  {caseData.description}
                </p>
                
                {/* 핵심 기술 스택 */}
                <div>
                  <h3 className="font-semibold mb-3">활용 기술</h3>
                  <div className="flex flex-wrap gap-2">
                    {caseData.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* 프로젝트 팀 정보 */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">프로젝트 팀 규모</p>
                    <p className="text-2xl font-bold text-blue-600">{caseData.teamSize}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">구현 기간</p>
                    <p className="text-2xl font-bold text-green-600">{caseData.implementationPeriod}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 교육 커리큘럼 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                  AI & n8n 교육 프로그램
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-blue-600">기초 과정</h4>
                    <div className="space-y-3">
                      {caseData.curriculum.basic.map((course, idx) => (
                        <div key={idx} className="border-l-2 border-blue-200 pl-4">
                          <p className="font-medium">{course.title}</p>
                          <p className="text-sm text-gray-600">{course.duration}</p>
                          <p className="text-sm text-gray-500 mt-1">{course.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-green-600">심화 과정</h4>
                    <div className="space-y-3">
                      {caseData.curriculum.advanced.map((course, idx) => (
                        <div key={idx} className="border-l-2 border-green-200 pl-4">
                          <p className="font-medium">{course.title}</p>
                          <p className="text-sm text-gray-600">{course.duration}</p>
                          <p className="text-sm text-gray-500 mt-1">{course.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-purple-600">경영진 과정</h4>
                    <div className="space-y-3">
                      {caseData.curriculum.executive.map((course, idx) => (
                        <div key={idx} className="border-l-2 border-purple-200 pl-4">
                          <p className="font-medium">{course.title}</p>
                          <p className="text-sm text-gray-600">{course.duration}</p>
                          <p className="text-sm text-gray-500 mt-1">{course.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 도전과제 탭 */}
          <TabsContent value="challenges" className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Target className="w-6 h-6 text-red-600" />
                  해결한 도전과제
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {caseData.challenges.map((challenge, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-red-100 rounded-lg">
                          <AlertCircle className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2">{challenge.title}</h4>
                          <p className="text-gray-700 mb-3">{challenge.description}</p>
                          <div className="bg-red-100/50 rounded-lg p-3">
                            <p className="text-sm font-medium text-red-800">
                              비즈니스 영향:
                            </p>
                            <p className="text-sm text-red-700 mt-1">{challenge.impact}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 구현과정 탭 */}
          <TabsContent value="process" className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Zap className="w-6 h-6 text-blue-600" />
                  단계별 구현 과정
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {caseData.process.map((phase, idx) => (
                    <div key={idx} className="relative">
                      {idx < caseData.process.length - 1 && (
                        <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gray-200" />
                      )}
                      
                      <div className="flex gap-6">
                        <div className="relative z-10">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            {idx + 1}
                          </div>
                        </div>
                        
                        <div className="flex-1 bg-white rounded-xl p-6 shadow-md border border-gray-100">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-xl font-semibold">{phase.phase}</h4>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {phase.duration}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <p className="font-medium text-gray-700 mb-3">주요 활동</p>
                              <ul className="space-y-2">
                                {phase.activities.map((activity, actIdx) => (
                                  <li key={actIdx} className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-600">{activity}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700 mb-3">주요 성과</p>
                              <ul className="space-y-2">
                                {phase.results.map((result, resIdx) => (
                                  <li key={resIdx} className="flex items-start gap-2">
                                    <TrendingUp className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-600">{result}</span>
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
          </TabsContent>

          {/* 성과 탭 */}
          <TabsContent value="results" className="space-y-8">
            {/* 정량적 성과 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                  정량적 성과
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {caseData.results.quantitative.map((metric, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                      <h4 className="font-semibold text-gray-800 mb-4">{metric.metric}</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Before</span>
                          <span className="font-medium">{metric.before}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">After</span>
                          <span className="font-medium text-green-600">{metric.after}</span>
                        </div>
                        <Separator />
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">
                            {metric.improvement}
                          </p>
                          <p className="text-sm text-gray-500">개선</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 재무적 성과 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                  재무적 성과
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {caseData.results.financial.map((item, idx) => (
                    <div key={idx} className="text-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                      <p className="text-sm text-gray-600 mb-2">{item.item}</p>
                      <p className="text-3xl font-bold text-purple-600">{item.amount}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 정성적 성과 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Award className="w-6 h-6 text-orange-600" />
                  정성적 성과
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {caseData.results.qualitative.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-orange-50 rounded-lg p-4">
                      <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 자동화 탭 */}
          <TabsContent value="automation" className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Shield className="w-6 h-6 text-indigo-600" />
                  n8n 자동화 워크플로우
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(caseData as any).n8nWorkflows?.map((workflow: any, idx: number) => (
                    <div key={idx} className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100">
                      <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-indigo-600" />
                        {workflow.workflowName || workflow.name}
                      </h4>
                      <p className="text-gray-700 mb-4">{workflow.description}</p>
                      <div className="bg-indigo-100/50 rounded-lg p-3">
                        <p className="text-sm font-medium text-indigo-800">노드 수 / 통합</p>
                        <p className="text-sm text-indigo-700 mt-1">
                          노드: {workflow.nodes ?? '-'} · 통합: {(workflow.integrations?.length ?? 0)}개
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 시스템 통합 */}
                <div className="mt-8">
                  <h4 className="font-semibold mb-4">시스템 통합</h4>
                  <div className="flex flex-wrap gap-3">
                    {((caseData as any).n8nWorkflows?.flatMap((w: any) => w.integrations) ?? []).map((integration: string, idx: number) => (
                      <Badge key={`${integration}-${idx}`} variant="secondary" className="px-4 py-2">
                        <Globe className="w-3 h-3 mr-1" />
                        {integration}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 고객 후기 섹션 */}
        <Card className="mt-12 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-blue-600" />
              고객 후기
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseData.testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.position}</p>
                      <p className="text-sm text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 다운로드 가능한 자료 */}
        {caseData.downloadableResources && (
          <Card className="mt-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Download className="w-6 h-6 text-green-600" />
                다운로드 자료
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {caseData.downloadableResources.map((resource, idx) => (
                  <Button key={idx} variant="outline" className="justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    {resource}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 관련 사례 추천 */}
        {relatedCases.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">관련 성공사례</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCases.map((relatedCase) => {
                const RelatedIcon = relatedCase.icon;
                return (
                  <Card 
                    key={relatedCase.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow border-0"
                    onClick={() => router.push(`/success-cases/${relatedCase.id}`)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 bg-${relatedCase.color}-100 rounded-lg`}>
                          <RelatedIcon className={`w-6 h-6 text-${relatedCase.color}-600`} />
                        </div>
                        <Badge variant="outline">{relatedCase.industry}</Badge>
                      </div>
                      <h3 className="font-semibold mb-2">{relatedCase.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{relatedCase.description}</p>
                      <Button variant="ghost" className="w-full justify-between">
                        자세히 보기
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* 하단 CTA 섹션 */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            귀사도 AI & n8n으로 혁신할 수 있습니다
          </h2>
          <p className="text-xl mb-8 opacity-95">
            {caseData.companyName}처럼 업무 효율을 {improvementScore}% 이상 개선하세요
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => setShowConsultationModal(true)}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              무료 상담 신청
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10"
              onClick={() => router.push('/diagnosis')}
            >
              AI 도입 진단받기
            </Button>
          </div>
        </div>
      </div>

      {/* 상담 신청 모달 */}
      <Dialog open={showConsultationModal} onOpenChange={setShowConsultationModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>무료 상담 신청</DialogTitle>
            <DialogDescription>
              {caseData.companyName}의 성공사례처럼 귀사도 AI & n8n으로 혁신할 수 있습니다.
              전문가와 무료 상담을 통해 맞춤형 솔루션을 찾아보세요.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Button 
              className="w-full"
              onClick={() => {
                setShowConsultationModal(false);
                if (onConsultationRequest) {
                  onConsultationRequest();
                } else {
                  router.push('/consultation');
                }
              }}
            >
              상담 신청 페이지로 이동
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 비디오 모달 */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{caseData.title} 사례 영상</DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
            <Play className="w-16 h-16 text-white opacity-50" />
            <p className="text-white ml-4">영상 준비 중입니다</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// 타입 임포트
import { Building2 } from 'lucide-react';
import { AlertCircle } from 'lucide-react';