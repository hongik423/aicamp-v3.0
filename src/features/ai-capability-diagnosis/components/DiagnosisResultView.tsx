'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Brain,
  TrendingUp,
  Target,
  AlertTriangle,
  CheckCircle,
  Download,
  Mail,
  BarChart3,
  Users,
  Lightbulb,
  Calendar
} from 'lucide-react';
import { DiagnosisResult } from '../types';
import { GRADE_CRITERIA } from '../constants/questions';

interface DiagnosisResultViewProps {
  result: DiagnosisResult;
}

export const DiagnosisResultView: React.FC<DiagnosisResultViewProps> = ({ result }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const gradeInfo = GRADE_CRITERIA[result.grade as keyof typeof GRADE_CRITERIA];

  // 카테고리 이름 매핑
  const categoryNames = {
    leadership: '경영진 리더십',
    infrastructure: 'AI 인프라',
    employeeCapability: '직원 역량',
    culture: '조직 문화',
    practicalApplication: '실무 적용',
    dataCapability: '데이터 역량'
  };

  // 등급별 색상
  const getGradeColor = (grade: string) => {
    switch(grade) {
      case 'S': return 'bg-purple-500';
      case 'A': return 'bg-blue-500';
      case 'B': return 'bg-green-500';
      case 'C': return 'bg-yellow-500';
      case 'D': return 'bg-orange-500';
      case 'F': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* 상단 요약 */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{result.companyName} AI 역량진단 결과</CardTitle>
              <CardDescription>진단일: {new Date(result.submittedAt).toLocaleDateString()}</CardDescription>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-white text-3xl font-bold ${getGradeColor(result.grade)}`}>
                {result.grade}
              </div>
              <p className="mt-2 text-sm text-gray-600">{gradeInfo?.description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold">{result.totalScore}점</p>
              <p className="text-sm text-gray-600">종합 점수</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{result.benchmarkAnalysis.percentile}%</p>
              <p className="text-sm text-gray-600">상위 백분위</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{result.benchmarkAnalysis.competitivePosition}</p>
              <p className="text-sm text-gray-600">경쟁 포지션</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 탭 네비게이션 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="overview">종합 분석</TabsTrigger>
          <TabsTrigger value="scores">영역별 점수</TabsTrigger>
          <TabsTrigger value="benchmark">벤치마크</TabsTrigger>
          <TabsTrigger value="swot">SWOT 분석</TabsTrigger>
          <TabsTrigger value="strategy">전략 제안</TabsTrigger>
          <TabsTrigger value="roadmap">실행 로드맵</TabsTrigger>
        </TabsList>

        {/* 종합 분석 탭 */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                종합 진단 의견
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertDescription>
                  {result.companyName}의 AI 역량은 <strong>{gradeInfo?.label}</strong> 수준으로 평가됩니다.
                  현재 종합 점수는 {result.totalScore}점으로, 업계 평균({result.benchmarkAnalysis.industryAverage}점) 
                  {result.benchmarkAnalysis.gap > 0 ? '을 상회' : '에 미달'}하고 있습니다.
                </AlertDescription>
              </Alert>

              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">핵심 강점</h3>
                  <ul className="space-y-2">
                    {result.swotAnalysis.strengths.slice(0, 3).map((strength, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">우선 개선 영역</h3>
                  <ul className="space-y-2">
                    {result.swotAnalysis.weaknesses.slice(0, 3).map((weakness, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                        <span className="text-sm">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI 고몰입 조직 구축 방안 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                AI 고몰입 조직 구축 방안
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">비전</h3>
                  <p className="text-sm text-gray-700">{result.highEngagementPlan.vision}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">핵심 가치</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.highEngagementPlan.coreValues.map((value, idx) => (
                      <Badge key={idx} variant="secondary">{value}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">주요 이니셔티브</h3>
                  <div className="space-y-3">
                    {result.highEngagementPlan.keyInitiatives.slice(0, 3).map((initiative, idx) => (
                      <div key={idx} className="border-l-2 border-blue-500 pl-4">
                        <h4 className="font-medium">{initiative.name}</h4>
                        <p className="text-sm text-gray-600">{initiative.objective}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 영역별 점수 탭 */}
        <TabsContent value="scores" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>영역별 AI 역량 점수</CardTitle>
              <CardDescription>6개 핵심 영역의 상세 평가 결과</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(result.categoryScores).map(([category, score]) => (
                  <div key={category}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{categoryNames[category as keyof typeof categoryNames]}</span>
                      <span className="text-sm font-semibold">{score}점</span>
                    </div>
                    <Progress value={score} className="h-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 벤치마크 탭 */}
        <TabsContent value="benchmark" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                업계 벤치마크 비교
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">귀사 점수</p>
                    <p className="text-2xl font-bold">{result.totalScore}점</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">GAP</p>
                    <p className="text-xl font-bold text-blue-600">
                      {result.benchmarkAnalysis.gap > 0 ? '+' : ''}{result.benchmarkAnalysis.gap}점
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">업계 평균</p>
                    <p className="text-2xl font-bold">{result.benchmarkAnalysis.industryAverage}점</p>
                  </div>
                </div>

                <Alert>
                  <Lightbulb className="w-4 h-4" />
                  <AlertDescription>
                    귀사는 동종 업계 대비 상위 {result.benchmarkAnalysis.percentile}%에 위치하고 있으며,
                    {result.benchmarkAnalysis.competitivePosition} 수준의 경쟁력을 보유하고 있습니다.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SWOT 분석 탭 */}
        <TabsContent value="swot" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-blue-900">강점 (Strengths)</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  {result.swotAnalysis.strengths.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-yellow-50">
                <CardTitle className="text-yellow-900">약점 (Weaknesses)</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  {result.swotAnalysis.weaknesses.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-green-50">
                <CardTitle className="text-green-900">기회 (Opportunities)</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  {result.swotAnalysis.opportunities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-red-50">
                <CardTitle className="text-red-900">위협 (Threats)</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  {result.swotAnalysis.threats.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 전략 제안 탭 */}
        <TabsContent value="strategy" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">SO 전략 (강점-기회)</CardTitle>
                <CardDescription>강점을 활용한 기회 포착 전략</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.strategies.SO.map((strategy, idx) => (
                    <li key={idx} className="text-sm">• {strategy}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">WO 전략 (약점-기회)</CardTitle>
                <CardDescription>약점 보완을 통한 기회 활용 전략</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.strategies.WO.map((strategy, idx) => (
                    <li key={idx} className="text-sm">• {strategy}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ST 전략 (강점-위협)</CardTitle>
                <CardDescription>강점을 활용한 위협 대응 전략</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.strategies.ST.map((strategy, idx) => (
                    <li key={idx} className="text-sm">• {strategy}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">WT 전략 (약점-위협)</CardTitle>
                <CardDescription>약점 보완 및 위협 방어 전략</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.strategies.WT.map((strategy, idx) => (
                    <li key={idx} className="text-sm">• {strategy}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 실행 로드맵 탭 */}
        <TabsContent value="roadmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                단계별 실행 로드맵
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* 즉시 실행 (0-3개월) */}
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-red-600">즉시 실행 (0-3개월)</h3>
                  <div className="space-y-3">
                    {result.roadmap.immediate.map((item, idx) => (
                      <div key={idx} className="border-l-4 border-red-500 pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{item.title}</h4>
                          <Badge variant={item.priority === 'high' ? 'destructive' : 'secondary'}>
                            {item.priority === 'high' ? '높음' : item.priority === 'medium' ? '중간' : '낮음'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="text-xs text-gray-500 mt-1">예상 기간: {item.estimatedDuration}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 단기 목표 (3-6개월) */}
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-orange-600">단기 목표 (3-6개월)</h3>
                  <div className="space-y-3">
                    {result.roadmap.shortTerm.map((item, idx) => (
                      <div key={idx} className="border-l-4 border-orange-500 pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{item.title}</h4>
                          <Badge variant={item.priority === 'high' ? 'destructive' : 'secondary'}>
                            {item.priority === 'high' ? '높음' : item.priority === 'medium' ? '중간' : '낮음'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="text-xs text-gray-500 mt-1">예상 기간: {item.estimatedDuration}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 중기 전략 (6-12개월) */}
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-blue-600">중기 전략 (6-12개월)</h3>
                  <div className="space-y-3">
                    {result.roadmap.midTerm.map((item, idx) => (
                      <div key={idx} className="border-l-4 border-blue-500 pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{item.title}</h4>
                          <Badge variant={item.priority === 'high' ? 'destructive' : 'secondary'}>
                            {item.priority === 'high' ? '높음' : item.priority === 'medium' ? '중간' : '낮음'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="text-xs text-gray-500 mt-1">예상 기간: {item.estimatedDuration}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 장기 비전 (1년 이상) */}
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-green-600">장기 비전 (1년 이상)</h3>
                  <div className="space-y-3">
                    {result.roadmap.longTerm.map((item, idx) => (
                      <div key={idx} className="border-l-4 border-green-500 pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{item.title}</h4>
                          <Badge variant={item.priority === 'high' ? 'destructive' : 'secondary'}>
                            {item.priority === 'high' ? '높음' : item.priority === 'medium' ? '중간' : '낮음'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="text-xs text-gray-500 mt-1">예상 기간: {item.estimatedDuration}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 추천 교육과정 */}
          <Card>
            <CardHeader>
              <CardTitle>AICAMP 추천 교육과정</CardTitle>
              <CardDescription>귀사의 AI 역량 강화를 위한 맞춤형 교육 프로그램</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.recommendedPrograms.map((program, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{program.name}</h4>
                      <Badge>{program.level}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{program.description}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{program.category}</span>
                      <span>{program.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 하단 액션 버튼 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              보고서 다운로드
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              이메일로 전송
            </Button>
            <Button variant="outline">
              전문가 상담 신청
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};