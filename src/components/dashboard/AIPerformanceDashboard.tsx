'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Users,
  Clock,
  DollarSign,
  Zap,
  Award,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  target: number;
  category: 'efficiency' | 'satisfaction' | 'financial' | 'automation';
}

interface IndustryPerformance {
  industry: string;
  companies: number;
  avgEfficiencyGain: number;
  avgSatisfaction: number;
  avgROI: number;
  totalSavings: number;
  automationRate: number;
  color: string;
}

interface AIImplementation {
  id: string;
  companyName: string;
  industry: string;
  implementationDate: string;
  status: 'active' | 'training' | 'completed';
  modules: string[];
  currentPhase: string;
  progress: number;
  metrics: {
    efficiency: number;
    satisfaction: number;
    roi: number;
    automation: number;
  };
}

const performanceMetrics: PerformanceMetric[] = [
  {
    id: 'total-efficiency',
    name: '전체 생산성 향상',
    value: 187,
    previousValue: 145,
    unit: '%',
    trend: 'up',
    changePercent: 29,
    target: 200,
    category: 'efficiency'
  },
  {
    id: 'avg-satisfaction',
    name: '평균 고객만족도',
    value: 94,
    previousValue: 78,
    unit: '%',
    trend: 'up',
    changePercent: 21,
    target: 95,
    category: 'satisfaction'
  },
  {
    id: 'total-roi',
    name: '전체 투자수익률',
    value: 620,
    previousValue: 480,
    unit: '%',
    trend: 'up',
    changePercent: 29,
    target: 700,
    category: 'financial'
  },
  {
    id: 'automation-rate',
    name: '자동화율',
    value: 89,
    previousValue: 65,
    unit: '%',
    trend: 'up',
    changePercent: 37,
    target: 95,
    category: 'automation'
  },
  {
    id: 'cost-savings',
    name: '비용 절감',
    value: 2850,
    previousValue: 1920,
    unit: '억원',
    trend: 'up',
    changePercent: 48,
    target: 3500,
    category: 'financial'
  },
  {
    id: 'training-completion',
    name: '교육 완료율',
    value: 96,
    previousValue: 89,
    unit: '%',
    trend: 'up',
    changePercent: 8,
    target: 98,
    category: 'efficiency'
  }
];

const industryPerformances: IndustryPerformance[] = [
  {
    industry: '제조업',
    companies: 156,
    avgEfficiencyGain: 215,
    avgSatisfaction: 94,
    avgROI: 680,
    totalSavings: 1250,
    automationRate: 92,
    color: 'blue'
  },
  {
    industry: '서비스업',
    companies: 89,
    avgEfficiencyGain: 168,
    avgSatisfaction: 91,
    avgROI: 540,
    totalSavings: 680,
    automationRate: 85,
    color: 'green'
  },
  {
    industry: '금융업',
    companies: 34,
    avgEfficiencyGain: 145,
    avgSatisfaction: 94,
    avgROI: 720,
    totalSavings: 420,
    automationRate: 88,
    color: 'purple'
  },
  {
    industry: '스타트업',
    companies: 78,
    avgEfficiencyGain: 195,
    avgSatisfaction: 89,
    avgROI: 580,
    totalSavings: 290,
    automationRate: 91,
    color: 'orange'
  },
  {
    industry: '전문서비스',
    companies: 45,
    avgEfficiencyGain: 178,
    avgSatisfaction: 96,
    avgROI: 650,
    totalSavings: 210,
    automationRate: 87,
    color: 'red'
  }
];

const aiImplementations: AIImplementation[] = [
  {
    id: 'smart-manufacturing-001',
    companyName: '(주)스마트매뉴팩처링',
    industry: '제조업',
    implementationDate: '2024-01-15',
    status: 'completed',
    modules: ['기초 36시간', '심화 60시간', '경영진 12시간'],
    currentPhase: '운영 최적화',
    progress: 100,
    metrics: {
      efficiency: 245,
      satisfaction: 94,
      roi: 680,
      automation: 95
    }
  },
  {
    id: 'ai-consulting-002',
    companyName: '(주)스마트컨설팅AI',
    industry: '전문서비스',
    implementationDate: '2024-02-01',
    status: 'active',
    modules: ['기초 32시간', '심화 48시간', '경영진 16시간'],
    currentPhase: '심화 교육 진행',
    progress: 75,
    metrics: {
      efficiency: 180,
      satisfaction: 89,
      roi: 420,
      automation: 78
    }
  },
  {
    id: 'fintech-innovation-003',
    companyName: '(주)핀테크이노베이션',
    industry: '금융업',
    implementationDate: '2024-01-20',
    status: 'training',
    modules: ['기초 20시간', '심화 32시간', '경영진 8시간'],
    currentPhase: '기초 교육 완료',
    progress: 45,
    metrics: {
      efficiency: 125,
      satisfaction: 85,
      roi: 280,
      automation: 65
    }
  }
];

export default function AIPerformanceDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('3months');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const timeRanges = [
    { id: '1month', label: '1개월' },
    { id: '3months', label: '3개월' },
    { id: '6months', label: '6개월' },
    { id: '1year', label: '1년' }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // 실제 구현에서는 API 호출
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const handleExport = () => {
    // 실제 구현에서는 데이터 내보내기
    console.log('Exporting dashboard data...');
  };

  const getMetricIcon = (category: string) => {
    switch (category) {
      case 'efficiency': return <Activity className="w-5 h-5" />;
      case 'satisfaction': return <Users className="w-5 h-5" />;
      case 'financial': return <DollarSign className="w-5 h-5" />;
      case 'automation': return <Zap className="w-5 h-5" />;
      default: return <BarChart3 className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'training': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'active': return <Activity className="w-4 h-4" />;
      case 'training': return <Clock className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              AI 성과 측정 대시보드
            </h1>
            <p className="text-gray-600">
              실시간 AI 도입 성과와 ROI를 한눈에 확인하세요
            </p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <div className="flex space-x-2">
              {timeRanges.map(range => (
                <button
                  key={range.id}
                  onClick={() => setSelectedTimeRange(range.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    selectedTimeRange === range.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              새로고침
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
            >
              <Download className="w-4 h-4 mr-2" />
              내보내기
            </Button>
          </div>
        </div>

        {/* 주요 성과 지표 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {performanceMetrics.map((metric) => (
            <Card key={metric.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {metric.name}
                </CardTitle>
                <div className={`p-2 rounded-lg ${
                  metric.category === 'efficiency' ? 'bg-blue-100 text-blue-600' :
                  metric.category === 'satisfaction' ? 'bg-green-100 text-green-600' :
                  metric.category === 'financial' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {getMetricIcon(metric.category)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-2xl font-bold text-gray-900">
                    {metric.value.toLocaleString()}{metric.unit}
                  </div>
                  <div className={`flex items-center text-sm ${
                    metric.trend === 'up' ? 'text-green-600' : 
                    metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {metric.trend === 'up' ? (
                      <ArrowUp className="w-4 h-4 mr-1" />
                    ) : metric.trend === 'down' ? (
                      <ArrowDown className="w-4 h-4 mr-1" />
                    ) : null}
                    {metric.changePercent}%
                  </div>
                </div>
                <Progress 
                  value={(metric.value / metric.target) * 100} 
                  className="h-2 mb-2"
                />
                <div className="text-xs text-gray-500">
                  목표: {metric.target.toLocaleString()}{metric.unit}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">전체 현황</TabsTrigger>
            <TabsTrigger value="industry">업종별 분석</TabsTrigger>
            <TabsTrigger value="implementations">구현 현황</TabsTrigger>
            <TabsTrigger value="trends">트렌드 분석</TabsTrigger>
          </TabsList>

          {/* 전체 현황 */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="w-5 h-5 mr-2" />
                    성과 분포
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: '생산성 향상', value: 35, color: 'bg-blue-500' },
                      { label: '비용 절감', value: 28, color: 'bg-green-500' },
                      { label: '품질 개선', value: 22, color: 'bg-purple-500' },
                      { label: '고객만족도', value: 15, color: 'bg-orange-500' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${item.color} mr-3`}></div>
                          <span className="text-sm text-gray-600">{item.label}</span>
                        </div>
                        <span className="text-sm font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    목표 달성률
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceMetrics.slice(0, 4).map((metric) => (
                      <div key={metric.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{metric.name}</span>
                          <span className="font-medium">
                            {Math.round((metric.value / metric.target) * 100)}%
                          </span>
                        </div>
                        <Progress 
                          value={(metric.value / metric.target) * 100} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  주요 성과 하이라이트
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">358</div>
                    <div className="text-sm text-gray-600">총 구현 기업</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">2,850억</div>
                    <div className="text-sm text-gray-600">총 비용 절감</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">94%</div>
                    <div className="text-sm text-gray-600">평균 만족도</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 업종별 분석 */}
          <TabsContent value="industry" className="space-y-6">
            <div className="grid gap-4">
              {industryPerformances.map((industry, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full bg-${industry.color}-500 mr-3`}></div>
                        <h3 className="text-lg font-semibold">{industry.industry}</h3>
                        <Badge variant="secondary" className="ml-2">
                          {industry.companies}개 기업
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {industry.avgROI}%
                        </div>
                        <div className="text-sm text-gray-500">평균 ROI</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-xl font-semibold text-blue-600">
                          {industry.avgEfficiencyGain}%
                        </div>
                        <div className="text-xs text-gray-500">생산성 향상</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-semibold text-green-600">
                          {industry.avgSatisfaction}%
                        </div>
                        <div className="text-xs text-gray-500">고객만족도</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-semibold text-purple-600">
                          {industry.totalSavings}억
                        </div>
                        <div className="text-xs text-gray-500">비용 절감</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-semibold text-orange-600">
                          {industry.automationRate}%
                        </div>
                        <div className="text-xs text-gray-500">자동화율</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 구현 현황 */}
          <TabsContent value="implementations" className="space-y-6">
            <div className="space-y-4">
              {aiImplementations.map((implementation) => (
                <Card key={implementation.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{implementation.companyName}</h3>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className="mr-2">
                            {implementation.industry}
                          </Badge>
                          <Badge className={getStatusColor(implementation.status)}>
                            {getStatusIcon(implementation.status)}
                            <span className="ml-1">
                              {implementation.status === 'completed' ? '완료' :
                               implementation.status === 'active' ? '진행중' : '교육중'}
                            </span>
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {implementation.progress}%
                        </div>
                        <div className="text-sm text-gray-500">진행률</div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">현재 단계: {implementation.currentPhase}</span>
                        <span className="font-medium">{implementation.progress}%</span>
                      </div>
                      <Progress value={implementation.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-600">
                          {implementation.metrics.efficiency}%
                        </div>
                        <div className="text-xs text-gray-500">효율성</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-600">
                          {implementation.metrics.satisfaction}%
                        </div>
                        <div className="text-xs text-gray-500">만족도</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-purple-600">
                          {implementation.metrics.roi}%
                        </div>
                        <div className="text-xs text-gray-500">ROI</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-orange-600">
                          {implementation.metrics.automation}%
                        </div>
                        <div className="text-xs text-gray-500">자동화</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 트렌드 분석 */}
          <TabsContent value="trends" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    월별 성과 트렌드
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: '1월', efficiency: 145, satisfaction: 78, roi: 480 },
                      { month: '2월', efficiency: 156, satisfaction: 82, roi: 520 },
                      { month: '3월', efficiency: 171, satisfaction: 87, roi: 580 },
                      { month: '4월', efficiency: 187, satisfaction: 94, roi: 620 }
                    ].map((data, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{data.month}</span>
                          <div className="flex space-x-4 text-xs">
                            <span className="text-blue-600">효율성: {data.efficiency}%</span>
                            <span className="text-green-600">만족도: {data.satisfaction}%</span>
                            <span className="text-purple-600">ROI: {data.roi}%</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Progress value={data.efficiency / 2} className="h-1 flex-1" />
                          <Progress value={data.satisfaction} className="h-1 flex-1" />
                          <Progress value={data.roi / 7} className="h-1 flex-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    AI 도입 효과 예측
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        향후 6개월 예상 성과
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">생산성 향상</span>
                        <span className="text-lg font-semibold text-blue-600">+45%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">비용 절감</span>
                        <span className="text-lg font-semibold text-green-600">1,200억원</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">자동화율</span>
                        <span className="text-lg font-semibold text-purple-600">95%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">신규 구현</span>
                        <span className="text-lg font-semibold text-orange-600">150개 기업</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
