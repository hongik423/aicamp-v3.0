'use client';

import React, { useState } from 'react';
import {
  TrendingUp, TrendingDown, Minus, DollarSign, Clock, Users,
  Target, BarChart3, PieChart, Activity, Zap, Award,
  ArrowUp, ArrowDown, ChevronRight, Download, Filter,
  Calendar, RefreshCw, AlertCircle, CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MetricData {
  id: string;
  category: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  target: number;
  achievement: number;
  trend: number[];
  description: string;
  impact: 'high' | 'medium' | 'low';
}

interface DepartmentMetric {
  department: string;
  automation: number;
  productivity: number;
  cost_reduction: number;
  employee_satisfaction: number;
}

export default function PerformanceMetricsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('quarter');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');

  // 핵심 성과 지표 데이터
  const keyMetrics: MetricData[] = [
    {
      id: 'roi',
      category: '재무 성과',
      name: '투자 수익률 (ROI)',
      value: 385,
      unit: '%',
      change: 85,
      changeType: 'increase',
      target: 300,
      achievement: 128,
      trend: [100, 150, 220, 280, 350, 385],
      description: '교육 투자 대비 비용 절감 및 수익 증대 효과',
      impact: 'high'
    },
    {
      id: 'productivity',
      category: '생산성',
      name: '업무 생산성 향상',
      value: 47,
      unit: '%',
      change: 12,
      changeType: 'increase',
      target: 40,
      achievement: 117,
      trend: [0, 15, 25, 32, 40, 47],
      description: '자동화를 통한 직원 1인당 처리량 증가',
      impact: 'high'
    },
    {
      id: 'automation',
      category: '자동화',
      name: '프로세스 자동화율',
      value: 68,
      unit: '%',
      change: 23,
      changeType: 'increase',
      target: 60,
      achievement: 113,
      trend: [10, 25, 35, 45, 55, 68],
      description: '전체 업무 프로세스 중 자동화 적용 비율',
      impact: 'high'
    },
    {
      id: 'time_saved',
      category: '시간 절감',
      name: '업무 시간 단축',
      value: 4.2,
      unit: '시간/일',
      change: 1.5,
      changeType: 'increase',
      target: 3.5,
      achievement: 120,
      trend: [0, 1.2, 2.1, 2.8, 3.5, 4.2],
      description: '직원 1인당 일일 업무 시간 절감',
      impact: 'high'
    },
    {
      id: 'error_reduction',
      category: '품질',
      name: '오류율 감소',
      value: 72,
      unit: '%',
      change: 15,
      changeType: 'increase',
      target: 65,
      achievement: 110,
      trend: [0, 20, 35, 50, 60, 72],
      description: '자동화를 통한 휴먼 에러 감소율',
      impact: 'medium'
    },
    {
      id: 'satisfaction',
      category: '만족도',
      name: '직원 만족도',
      value: 4.6,
      unit: '점',
      change: 0.8,
      changeType: 'increase',
      target: 4.0,
      achievement: 115,
      trend: [3.8, 4.0, 4.2, 4.3, 4.5, 4.6],
      description: 'AI 도구 활용에 대한 직원 만족도 (5점 만점)',
      impact: 'medium'
    }
  ];

  // 부서별 성과 데이터
  const departmentMetrics: DepartmentMetric[] = [
    {
      department: '영업팀',
      automation: 75,
      productivity: 52,
      cost_reduction: 38,
      employee_satisfaction: 4.7
    },
    {
      department: '마케팅팀',
      automation: 82,
      productivity: 61,
      cost_reduction: 45,
      employee_satisfaction: 4.8
    },
    {
      department: '인사팀',
      automation: 68,
      productivity: 43,
      cost_reduction: 32,
      employee_satisfaction: 4.5
    },
    {
      department: '재무팀',
      automation: 71,
      productivity: 48,
      cost_reduction: 41,
      employee_satisfaction: 4.6
    },
    {
      department: '운영팀',
      automation: 64,
      productivity: 39,
      cost_reduction: 28,
      employee_satisfaction: 4.3
    }
  ];

  // 전체 요약 통계
  const summaryStats = {
    totalCostSaved: '8.5억원',
    totalTimeSaved: '12,500시간',
    processesAutomated: 156,
    employeesTrained: 234,
    averageROI: 385,
    implementationTime: '3개월'
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return <ArrowUp className="w-4 h-4" />;
      case 'decrease':
        return <ArrowDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getImpactBadge = (impact: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[impact as keyof typeof colors] || colors.low;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">핵심 성과 지표 대시보드</h2>
          <p className="text-gray-600 mt-2">AI & n8n 도입 후 성과 측정 및 분석</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">월간</SelectItem>
              <SelectItem value="quarter">분기</SelectItem>
              <SelectItem value="year">연간</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            새로고침
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            보고서 다운로드
          </Button>
        </div>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 비용 절감</p>
                <p className="text-2xl font-bold">{summaryStats.totalCostSaved}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">시간 절감</p>
                <p className="text-2xl font-bold">{summaryStats.totalTimeSaved}</p>
              </div>
              <Clock className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">자동화 프로세스</p>
                <p className="text-2xl font-bold">{summaryStats.processesAutomated}</p>
              </div>
              <Zap className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">교육 인원</p>
                <p className="text-2xl font-bold">{summaryStats.employeesTrained}명</p>
              </div>
              <Users className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">평균 ROI</p>
                <p className="text-2xl font-bold">{summaryStats.averageROI}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">구현 기간</p>
                <p className="text-2xl font-bold">{summaryStats.implementationTime}</p>
              </div>
              <Calendar className="w-8 h-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 메인 대시보드 */}
      <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'overview' | 'detailed')}>
        <TabsList>
          <TabsTrigger value="overview">전체 개요</TabsTrigger>
          <TabsTrigger value="detailed">상세 분석</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPI 카드 그리드 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {keyMetrics.map((metric) => (
              <Card key={metric.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="outline" className="mb-2">{metric.category}</Badge>
                      <CardTitle className="text-lg">{metric.name}</CardTitle>
                    </div>
                    <Badge className={getImpactBadge(metric.impact)}>
                      {metric.impact === 'high' ? '높음' : metric.impact === 'medium' ? '중간' : '낮음'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold">
                        {metric.value}{metric.unit}
                      </p>
                      <div className={`flex items-center gap-1 mt-2 ${getChangeColor(metric.changeType)}`}>
                        {getChangeIcon(metric.changeType)}
                        <span className="text-sm font-medium">
                          {metric.change > 0 ? '+' : ''}{metric.change}{metric.unit}
                        </span>
                        <span className="text-sm text-gray-500">vs 이전 분기</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">목표 달성률</p>
                      <p className="text-2xl font-bold text-blue-600">{metric.achievement}%</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">목표</span>
                      <span className="font-medium">{metric.target}{metric.unit}</span>
                    </div>
                    <Progress value={metric.achievement} className="h-2" />
                  </div>

                  <p className="text-sm text-gray-600">{metric.description}</p>

                  {/* 미니 차트 (시뮬레이션) */}
                  <div className="h-16 flex items-end gap-1">
                    {metric.trend.map((value, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-blue-500 rounded-t"
                        style={{ height: `${(value / Math.max(...metric.trend)) * 100}%` }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 부서별 성과 */}
          <Card>
            <CardHeader>
              <CardTitle>부서별 성과 현황</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">부서</th>
                      <th className="text-center py-3 px-4">자동화율</th>
                      <th className="text-center py-3 px-4">생산성 향상</th>
                      <th className="text-center py-3 px-4">비용 절감</th>
                      <th className="text-center py-3 px-4">직원 만족도</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentMetrics.map((dept) => (
                      <tr key={dept.department} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{dept.department}</td>
                        <td className="text-center py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <Progress value={dept.automation} className="w-20 h-2" />
                            <span className="text-sm font-medium">{dept.automation}%</span>
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <Progress value={dept.productivity} className="w-20 h-2" />
                            <span className="text-sm font-medium">{dept.productivity}%</span>
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <Progress value={dept.cost_reduction} className="w-20 h-2" />
                            <span className="text-sm font-medium">{dept.cost_reduction}%</span>
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">
                          <Badge variant="outline">{dept.employee_satisfaction}/5.0</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          {/* 상세 분석 뷰 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 재무 성과 분석 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  재무 성과 분석
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">인건비 절감</span>
                    <span className="text-lg font-bold text-green-600">3.2억원</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">운영비 절감</span>
                    <span className="text-lg font-bold text-blue-600">2.8억원</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium">매출 증대</span>
                    <span className="text-lg font-bold text-purple-600">2.5억원</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">총 재무 효과</span>
                    <span className="text-2xl font-bold text-green-600">8.5억원</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 프로세스 개선 효과 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  프로세스 개선 효과
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>처리 속도 향상</span>
                      <span className="font-medium">250%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>오류율 감소</span>
                      <span className="font-medium">72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>고객 응답 시간 단축</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>데이터 정확도 향상</span>
                      <span className="font-medium">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 직원 역량 향상 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  직원 역량 향상
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">87%</p>
                    <p className="text-sm text-gray-600 mt-1">AI 도구 활용률</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">92%</p>
                    <p className="text-sm text-gray-600 mt-1">교육 만족도</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">78%</p>
                    <p className="text-sm text-gray-600 mt-1">자기주도 학습</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">4.6</p>
                    <p className="text-sm text-gray-600 mt-1">역량 평가 점수</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 혁신 지표 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  혁신 지표
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>신규 자동화 아이디어</span>
                    </div>
                    <Badge>45개</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>프로세스 개선 제안</span>
                    </div>
                    <Badge>32개</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>혁신 프로젝트 진행</span>
                    </div>
                    <Badge>12개</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>특허 출원</span>
                    </div>
                    <Badge>3건</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 주요 이슈 및 개선 사항 */}
          <Card>
            <CardHeader>
              <CardTitle>주요 이슈 및 개선 권고사항</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">데이터 품질 관리 강화 필요</p>
                    <p className="text-sm text-gray-600 mt-1">
                      자동화 프로세스의 정확도 향상을 위해 입력 데이터 품질 관리 체계 구축 권고
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">추가 교육 프로그램 필요</p>
                    <p className="text-sm text-gray-600 mt-1">
                      신입 직원 및 고급 사용자를 위한 맞춤형 교육 프로그램 개발 권고
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">확산 준비 완료</p>
                    <p className="text-sm text-gray-600 mt-1">
                      파일럿 프로젝트 성공으로 전사 확산 준비 완료, 단계적 롤아웃 추진 가능
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
