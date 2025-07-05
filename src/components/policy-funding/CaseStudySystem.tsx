'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Building2,
  MapPin,
  Clock,
  DollarSign,
  TrendingUp,
  Award,
  Users,
  Briefcase,
  Filter,
  Search,
  Download,
  ExternalLink,
  ChevronRight,
  Star,
  Quote,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  Target,
  Lightbulb,
  Calendar,
  FileText,
  BarChart3,
  PieChart,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CaseStudy {
  id: string;
  title: string;
  company: string;
  industry: string;
  location: string;
  projectType: string;
  fundingAmount: number;
  duration: number;
  successRate: number;
  roi: number;
  keyMetrics: {
    npv: number;
    irr: number;
    paybackPeriod: number;
    dscr: number;
  };
  timeline: {
    phase: string;
    duration: number;
    status: 'completed' | 'in-progress' | 'planned';
    description: string;
  }[];
  challenges: string[];
  solutions: string[];
  results: {
    metric: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    position: string;
    company: string;
    avatar: string;
  };
  downloads: {
    name: string;
    type: string;
    size: string;
  }[];
  tags: string[];
  featured: boolean;
}

const CaseStudySystem = () => {
  const [activeCase, setActiveCase] = useState<string>('elite-garden');
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterSize, setFilterSize] = useState('all');

  // 케이스 스터디 데이터
  const caseStudies: CaseStudy[] = [
    {
      id: 'elite-garden',
      title: '엘리트 가든 프리미엄 복합 레스토랑',
      company: '엘리트 가든 주식회사',
      industry: '관광식당업',
      location: '송도국제도시',
      projectType: '시설투자',
      fundingAmount: 120,
      duration: 18,
      successRate: 98,
      roi: 24.7,
      keyMetrics: {
        npv: 124.7,
        irr: 19.6,
        paybackPeriod: 5.8,
        dscr: 6.8
      },
      timeline: [
        {
          phase: '사업타당성분석',
          duration: 5,
          status: 'completed',
          description: 'AI 빅데이터 분석 및 시장조사 완료'
        },
        {
          phase: '정책자금 매칭',
          duration: 3,
          status: 'completed',
          description: '최적 자금원 선정 및 신청서 작성'
        },
        {
          phase: '심사 및 발표',
          duration: 7,
          status: 'completed',
          description: '심사위원회 발표 및 선정 완료'
        },
        {
          phase: '자금집행',
          duration: 3,
          status: 'completed',
          description: '단계별 자금집행 및 사업추진'
        }
      ],
      challenges: [
        '높은 초기 투자비용 (180억원)',
        '복합시설 운영의 복잡성',
        '송도 지역 특성 고려 필요',
        '관광객 유치 불확실성'
      ],
      solutions: [
        '듀얼브레인 분석으로 정확한 수요 예측',
        'AI 기반 운영 효율화 방안 제시',
        '지역 특화 마케팅 전략 수립',
        '단계적 확장 로드맵 작성'
      ],
      results: [
        {
          metric: '연간 매출',
          before: '예상 불가',
          after: '87억원',
          improvement: '+87억원'
        },
        {
          metric: '고용창출',
          before: '0명',
          after: '156명',
          improvement: '+156명'
        },
        {
          metric: '지역경제 효과',
          before: '0원',
          after: '23억원',
          improvement: '+23억원'
        }
      ],
      testimonial: {
        quote: "듀얼브레인 분석 덕분에 복잡한 복합시설 사업도 체계적으로 접근할 수 있었습니다. AI의 정밀한 분석과 전문가의 인사이트가 완벽하게 결합된 서비스였습니다.",
        author: "김승호",
        position: "대표이사",
        company: "엘리트 가든 주식회사",
        avatar: "/images/testimonial-kim.jpg"
      },
      downloads: [
        { name: '사업타당성분석서', type: 'PDF', size: '2.4MB' },
        { name: '재무분석 리포트', type: 'Excel', size: '1.8MB' },
        { name: '시장분석 요약', type: 'PDF', size: '1.2MB' }
      ],
      tags: ['관광업', '복합시설', '송도', '대규모투자'],
      featured: true
    },
    {
      id: 'smart-factory',
      title: '스마트팩토리 혁신 프로젝트',
      company: '㈜테크이노베이션',
      industry: '제조업',
      location: '안산시',
      projectType: 'R&D',
      fundingAmount: 45,
      duration: 22,
      successRate: 95,
      roi: 31.2,
      keyMetrics: {
        npv: 89.3,
        irr: 23.4,
        paybackPeriod: 4.2,
        dscr: 5.1
      },
      timeline: [
        {
          phase: '기술분석',
          duration: 4,
          status: 'completed',
          description: 'AI 기반 제조공정 분석'
        },
        {
          phase: '시스템 설계',
          duration: 6,
          status: 'completed',
          description: '스마트팩토리 아키텍처 설계'
        },
        {
          phase: '구축 및 테스트',
          duration: 8,
          status: 'completed',
          description: '시스템 구축 및 성능 검증'
        },
        {
          phase: '상용화',
          duration: 4,
          status: 'completed',
          description: '전체 공정 적용 및 최적화'
        }
      ],
      challenges: [
        '기존 공정과의 호환성',
        '높은 기술적 복잡성',
        '직원 교육 및 적응',
        'ROI 입증의 어려움'
      ],
      solutions: [
        '단계적 도입 전략 수립',
        '맞춤형 기술 솔루션 개발',
        '체계적 교육 프로그램 운영',
        '실시간 성과 모니터링 시스템'
      ],
      results: [
        {
          metric: '생산성',
          before: '100%',
          after: '178%',
          improvement: '+78%'
        },
        {
          metric: '불량률',
          before: '3.2%',
          after: '0.8%',
          improvement: '-75%'
        },
        {
          metric: '운영비용',
          before: '100%',
          after: '67%',
          improvement: '-33%'
        }
      ],
      testimonial: {
        quote: "스마트팩토리 도입이 처음에는 걱정이 많았지만, 듀얼브레인 분석을 통해 단계별로 체계적으로 진행할 수 있었습니다. 지금은 업계 최고 수준의 효율성을 달성했습니다.",
        author: "박민수",
        position: "공장장",
        company: "㈜테크이노베이션",
        avatar: "/images/testimonial-park.jpg"
      },
      downloads: [
        { name: '기술혁신 계획서', type: 'PDF', size: '3.1MB' },
        { name: '성과분석 리포트', type: 'PDF', size: '2.7MB' }
      ],
      tags: ['제조업', '스마트팩토리', 'IoT', '자동화'],
      featured: true
    }
  ];

  // 필터링된 케이스 스터디
  const filteredCases = caseStudies.filter(caseStudy => {
    const matchesSearch = caseStudy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseStudy.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = filterIndustry === 'all' || caseStudy.industry === filterIndustry;
    const matchesLocation = filterLocation === 'all' || caseStudy.location.includes(filterLocation);
    const matchesSize = filterSize === 'all' || 
                       (filterSize === 'large' && caseStudy.fundingAmount >= 100) ||
                       (filterSize === 'medium' && caseStudy.fundingAmount >= 10 && caseStudy.fundingAmount < 100) ||
                       (filterSize === 'small' && caseStudy.fundingAmount < 10);
    
    return matchesSearch && matchesIndustry && matchesLocation && matchesSize;
  });

  const currentCase = caseStudies.find(c => c.id === activeCase) || caseStudies[0];

  // 차트 데이터
  const timelineData = {
    labels: currentCase.timeline.map(t => t.phase),
    datasets: [
      {
        label: '계획 기간',
        data: currentCase.timeline.map(t => t.duration),
        backgroundColor: currentCase.timeline.map(t => 
          t.status === 'completed' ? '#10b981' : 
          t.status === 'in-progress' ? '#f59e0b' : '#6b7280'
        ),
        borderRadius: 4
      }
    ]
  };

  const metricsData = {
    labels: ['NPV', 'IRR', 'DSCR'],
    datasets: [
      {
        label: '성과 지표',
        data: [currentCase.keyMetrics.npv, currentCase.keyMetrics.irr, currentCase.keyMetrics.dscr],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="bg-green-100 text-green-700 mb-4">
            <Award className="w-4 h-4 mr-2" />
            검증된 성공사례
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            실제 프로젝트 성과 분석
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            듀얼브레인 방법론으로 달성한 실제 성과들을 상세하게 분석해보세요
          </p>
        </motion.div>
      </div>

      {/* 검색 및 필터 */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="프로젝트명 또는 회사명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={filterIndustry} onValueChange={setFilterIndustry}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="업종" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 업종</SelectItem>
                <SelectItem value="제조업">제조업</SelectItem>
                <SelectItem value="관광식당업">관광업</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterLocation} onValueChange={setFilterLocation}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="지역" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 지역</SelectItem>
                <SelectItem value="서울">서울</SelectItem>
                <SelectItem value="송도">송도</SelectItem>
                <SelectItem value="안산">안산</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterSize} onValueChange={setFilterSize}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="규모" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 규모</SelectItem>
                <SelectItem value="large">대규모 (100억+)</SelectItem>
                <SelectItem value="medium">중규모 (10-100억)</SelectItem>
                <SelectItem value="small">소규모 (10억 미만)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 케이스 리스트 */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            프로젝트 목록 ({filteredCases.length})
          </h3>
          <div className="space-y-3">
            {filteredCases.map((caseStudy) => (
              <motion.div
                key={caseStudy.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveCase(caseStudy.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  activeCase === caseStudy.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-sm text-gray-900 line-clamp-2">
                    {caseStudy.title}
                  </h4>
                  {caseStudy.featured && (
                    <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0 ml-2" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{caseStudy.company}</p>
                <div className="flex items-center justify-between text-xs">
                  <Badge variant="outline" className="text-xs">
                    {caseStudy.industry}
                  </Badge>
                  <span className="font-semibold text-green-600">
                    {caseStudy.fundingAmount}억원
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="lg:col-span-3">
          {/* 케이스 헤더 */}
          <Card className="p-6 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{currentCase.title}</h1>
                  {currentCase.featured && (
                    <Badge className="bg-yellow-100 text-yellow-700">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      추천 사례
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {currentCase.company}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {currentCase.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {currentCase.duration}일 완성
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentCase.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {currentCase.fundingAmount}억원
                </div>
                <div className="text-sm text-gray-600">확보 금액</div>
              </div>
            </div>

            {/* 핵심 지표 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {currentCase.keyMetrics.npv}억원
                </div>
                <div className="text-xs text-gray-600">NPV</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {currentCase.keyMetrics.irr}%
                </div>
                <div className="text-xs text-gray-600">IRR</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {currentCase.keyMetrics.paybackPeriod}년
                </div>
                <div className="text-xs text-gray-600">회수기간</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {currentCase.keyMetrics.dscr}배
                </div>
                <div className="text-xs text-gray-600">DSCR</div>
              </div>
            </div>
          </Card>

          {/* 탭 콘텐츠 */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="overview">개요</TabsTrigger>
              <TabsTrigger value="analysis">분석</TabsTrigger>
              <TabsTrigger value="timeline">타임라인</TabsTrigger>
              <TabsTrigger value="results">성과</TabsTrigger>
              <TabsTrigger value="testimonial">후기</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 프로젝트 개요 */}
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      프로젝트 개요
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="font-semibold mb-2 block">사업 유형</Label>
                      <p className="text-gray-700">{currentCase.projectType}</p>
                    </div>
                    <div>
                      <Label className="font-semibold mb-2 block">업종</Label>
                      <p className="text-gray-700">{currentCase.industry}</p>
                    </div>
                    <div>
                      <Label className="font-semibold mb-2 block">위치</Label>
                      <p className="text-gray-700">{currentCase.location}</p>
                    </div>
                    <div>
                      <Label className="font-semibold mb-2 block">성공률</Label>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${currentCase.successRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-green-600">
                          {currentCase.successRate}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 주요 도전과제 */}
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                      주요 도전과제
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentCase.challenges.map((challenge, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm text-gray-700">{challenge}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 해결 방안 */}
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-blue-500" />
                      듀얼브레인 솔루션
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentCase.solutions.map((solution, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-700">{solution}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 다운로드 */}
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      관련 자료
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentCase.downloads.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{file.name}</p>
                              <p className="text-xs text-gray-500">{file.type} • {file.size}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle>재무 성과 지표</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <Doughnut data={metricsData} options={{ maintainAspectRatio: false }} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardHeader>
                    <CardTitle>프로젝트 일정</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <Bar data={timelineData} options={{ maintainAspectRatio: false }} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-6">
              <div className="relative">
                {/* 타임라인 */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                {currentCase.timeline.map((phase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative flex items-start gap-6 pb-8"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                      phase.status === 'completed' ? 'bg-green-500' :
                      phase.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-400'
                    }`}>
                      {phase.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <Card className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{phase.phase}</h3>
                          <Badge className={
                            phase.status === 'completed' ? 'bg-green-100 text-green-700' :
                            phase.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }>
                            {phase.duration}일
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{phase.description}</p>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentCase.results.map((result, index) => (
                  <Card key={index} className="p-6 text-center">
                    <CardHeader>
                      <CardTitle className="text-lg">{result.metric}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-500">Before</div>
                        <div className="text-lg font-semibold text-gray-700">{result.before}</div>
                        <ArrowUpRight className="w-6 h-6 text-green-500 mx-auto" />
                        <div className="text-sm text-gray-500">After</div>
                        <div className="text-2xl font-bold text-green-600">{result.after}</div>
                        <Badge className="bg-green-100 text-green-700 mt-2">
                          {result.improvement}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="testimonial" className="space-y-6">
              <Card className="p-8">
                <CardContent>
                  <div className="flex items-start gap-6">
                    <Quote className="w-12 h-12 text-blue-500 flex-shrink-0" />
                    <div className="flex-1">
                      <blockquote className="text-xl text-gray-700 mb-6 leading-relaxed">
                        "{currentCase.testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={currentCase.testimonial.avatar} />
                          <AvatarFallback>
                            {currentCase.testimonial.author.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {currentCase.testimonial.author}
                          </div>
                          <div className="text-sm text-gray-600">
                            {currentCase.testimonial.position}, {currentCase.testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CaseStudySystem; 