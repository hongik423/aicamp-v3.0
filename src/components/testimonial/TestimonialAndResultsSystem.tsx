'use client';

import React, { useState } from 'react';
import {
  Star, Quote, Calendar, User, Building, TrendingUp,
  Award, MessageSquare, ChevronLeft, ChevronRight, Play,
  ThumbsUp, BarChart3, Clock, Target, CheckCircle,
  Video, FileText, Download, Share2, Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Testimonial {
  id: string;
  author: {
    name: string;
    position: string;
    company: string;
    image?: string;
  };
  content: string;
  rating: number;
  date: string;
  industry: string;
  programType: string;
  highlights: string[];
  videoUrl?: string;
  verified: boolean;
}

interface FollowUpResult {
  id: string;
  company: string;
  period: '3months' | '6months' | '12months';
  metrics: {
    name: string;
    before: number;
    after: number;
    improvement: number;
    unit: string;
  }[];
  achievements: string[];
  nextSteps: string[];
  testimonial?: string;
}

interface CaseStudy {
  id: string;
  title: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  roi: string;
  timeline: string;
  documentUrl: string;
}

export default function TestimonialAndResultsSystem() {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // 후기 데이터
  const testimonials: Testimonial[] = [
    {
      id: 't1',
      author: {
        name: '김철수',
        position: 'CEO',
        company: '(주)스마트제조',
        image: 'https://picsum.photos/seed/user1/100/100'
      },
      content: 'AICAMP의 교육을 통해 우리 회사는 완전히 새로운 차원의 생산성을 경험하고 있습니다. 특히 n8n을 활용한 프로세스 자동화는 직원들의 반복 업무를 80% 이상 줄여주었고, 이를 통해 더 창의적이고 가치 있는 업무에 집중할 수 있게 되었습니다. 교육 후 6개월이 지난 지금, ROI는 이미 400%를 넘어섰습니다.',
      rating: 5,
      date: '2024-03-15',
      industry: '제조업',
      programType: 'AI 프로세스 혁신 과정',
      highlights: [
        '업무 자동화율 85% 달성',
        '직원 만족도 4.8/5.0',
        'ROI 400% 달성'
      ],
      videoUrl: 'https://example.com/testimonial1',
      verified: true
    },
    {
      id: 't2',
      author: {
        name: '이영희',
        position: 'COO',
        company: '디지털커머스',
        image: 'https://picsum.photos/seed/user2/100/100'
      },
      content: '처음에는 AI 도입이 막막했는데, AICAMP의 체계적인 커리큘럼과 실습 중심 교육 덕분에 빠르게 적용할 수 있었습니다. 특히 멘토링 시스템이 정말 도움이 많이 되었고, 실제 업무에 바로 적용 가능한 솔루션을 함께 개발할 수 있었습니다.',
      rating: 5,
      date: '2024-02-28',
      industry: '이커머스',
      programType: '기초부터 시작하는 AI 자동화',
      highlights: [
        '주문 처리 시간 70% 단축',
        '고객 응답 속도 3배 향상',
        '월 5,000만원 비용 절감'
      ],
      verified: true
    },
    {
      id: 't3',
      author: {
        name: '박민수',
        position: '혁신팀장',
        company: '금융서비스(주)',
        image: 'https://picsum.photos/seed/user3/100/100'
      },
      content: 'AI와 n8n을 활용한 자동화는 우리 금융 서비스의 게임 체인저였습니다. 복잡한 심사 프로세스를 자동화하여 처리 시간을 90% 단축시켰고, 정확도도 크게 향상되었습니다. AICAMP 팀의 전문성과 열정에 감사드립니다.',
      rating: 5,
      date: '2024-01-20',
      industry: '금융',
      programType: '금융 AI 전문가 과정',
      highlights: [
        '심사 시간 90% 단축',
        '오류율 95% 감소',
        '고객 만족도 35% 상승'
      ],
      verified: true
    }
  ];

  // 후속 성과 데이터
  const followUpResults: FollowUpResult[] = [
    {
      id: 'f1',
      company: '(주)스마트제조',
      period: '6months',
      metrics: [
        {
          name: '생산성',
          before: 100,
          after: 185,
          improvement: 85,
          unit: '%'
        },
        {
          name: '불량률',
          before: 3.5,
          after: 0.8,
          improvement: -77,
          unit: '%'
        },
        {
          name: '처리 시간',
          before: 120,
          after: 25,
          improvement: -79,
          unit: '분'
        },
        {
          name: '직원 만족도',
          before: 3.2,
          after: 4.8,
          improvement: 50,
          unit: '점'
        }
      ],
      achievements: [
        '신규 자동화 프로세스 45개 추가 구축',
        '자체 AI 개발팀 구성 (5명)',
        'AI CoE(Center of Excellence) 설립',
        '업계 최초 완전 자동화 생산라인 구축'
      ],
      nextSteps: [
        '전사 AI 플랫폼 구축',
        '파트너사 대상 AI 컨설팅 사업 시작',
        '글로벌 시장 진출 준비'
      ],
      testimonial: '교육 후 6개월, 우리는 이제 AI 기업이 되었습니다.'
    },
    {
      id: 'f2',
      company: '디지털커머스',
      period: '3months',
      metrics: [
        {
          name: '매출',
          before: 100,
          after: 142,
          improvement: 42,
          unit: '%'
        },
        {
          name: '고객 응답시간',
          before: 24,
          after: 2,
          improvement: -92,
          unit: '시간'
        },
        {
          name: '재구매율',
          before: 23,
          after: 45,
          improvement: 96,
          unit: '%'
        },
        {
          name: '운영 비용',
          before: 100,
          after: 65,
          improvement: -35,
          unit: '%'
        }
      ],
      achievements: [
        'AI 챗봇 도입으로 24시간 고객 지원',
        '개인화 추천 시스템 구축',
        '재고 관리 완전 자동화',
        '실시간 가격 최적화 시스템 도입'
      ],
      nextSteps: [
        'AI 기반 수요 예측 시스템 고도화',
        '글로벌 마켓플레이스 확장',
        'B2B 자동화 솔루션 개발'
      ]
    },
    {
      id: 'f3',
      company: '금융서비스(주)',
      period: '12months',
      metrics: [
        {
          name: '심사 정확도',
          before: 92,
          after: 99.5,
          improvement: 8.2,
          unit: '%'
        },
        {
          name: '처리 건수',
          before: 1000,
          after: 5500,
          improvement: 450,
          unit: '건/일'
        },
        {
          name: '컴플라이언스 위반',
          before: 12,
          after: 0,
          improvement: -100,
          unit: '건'
        },
        {
          name: 'NPS',
          before: 42,
          after: 78,
          improvement: 86,
          unit: '점'
        }
      ],
      achievements: [
        'AI 리스크 관리 시스템 특허 출원',
        '업계 최초 완전 자동 대출 심사 서비스 출시',
        '규제 기관 우수 사례 선정',
        'AI 윤리 위원회 설립 및 운영'
      ],
      nextSteps: [
        'AI 기반 투자 자문 서비스 개발',
        '블록체인 연계 스마트 계약 시스템',
        '해외 진출을 위한 다국어 AI 시스템 구축'
      ],
      testimonial: '1년 전과 비교하면 완전히 다른 회사가 되었습니다. AI가 우리의 DNA가 되었죠.'
    }
  ];

  // 사례 연구 자료
  const caseStudies: CaseStudy[] = [
    {
      id: 'cs1',
      title: '제조업 디지털 전환 성공 사례',
      company: '(주)스마트제조',
      industry: '제조업',
      challenge: '높은 불량률과 비효율적인 생산 프로세스',
      solution: 'AI 품질 검사 시스템 및 n8n 기반 생산 자동화',
      results: [
        '불량률 77% 감소',
        '생산성 85% 향상',
        '연간 15억원 비용 절감'
      ],
      roi: '400%',
      timeline: '6개월',
      documentUrl: '/case-studies/smart-manufacturing.pdf'
    },
    {
      id: 'cs2',
      title: '이커머스 고객 경험 혁신',
      company: '디지털커머스',
      industry: '이커머스',
      challenge: '늘어나는 고객 문의와 개인화 서비스 부재',
      solution: 'AI 챗봇 및 추천 시스템 구축',
      results: [
        '고객 만족도 45% 상승',
        '매출 42% 증가',
        '운영 비용 35% 절감'
      ],
      roi: '350%',
      timeline: '3개월',
      documentUrl: '/case-studies/digital-commerce.pdf'
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* 헤더 */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">고객 후기 및 성과</h2>
        <p className="text-lg text-gray-600">
          AICAMP와 함께한 기업들의 생생한 경험과 지속적인 성과
        </p>
      </div>

      {/* 필터 */}
      <div className="flex justify-center gap-4">
        <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="업종 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 업종</SelectItem>
            <SelectItem value="manufacturing">제조업</SelectItem>
            <SelectItem value="ecommerce">이커머스</SelectItem>
            <SelectItem value="finance">금융</SelectItem>
            <SelectItem value="healthcare">헬스케어</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="기간 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 기간</SelectItem>
            <SelectItem value="3months">3개월 후</SelectItem>
            <SelectItem value="6months">6개월 후</SelectItem>
            <SelectItem value="12months">12개월 후</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 메인 콘텐츠 */}
      <Tabs defaultValue="testimonials" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="testimonials">고객 후기</TabsTrigger>
          <TabsTrigger value="followup">후속 성과</TabsTrigger>
          <TabsTrigger value="casestudies">사례 연구</TabsTrigger>
        </TabsList>

        {/* 고객 후기 탭 */}
        <TabsContent value="testimonials" className="space-y-6">
          {/* 메인 후기 캐러셀 */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-8">
              <div className="max-w-4xl mx-auto">
                <Quote className="w-12 h-12 text-blue-300 mb-4" />
                
                <div className="space-y-6">
                  <p className="text-xl leading-relaxed text-gray-700">
                    "{testimonials[activeTestimonial].content}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={testimonials[activeTestimonial].author.image} />
                        <AvatarFallback>
                          {testimonials[activeTestimonial].author.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-lg">
                          {testimonials[activeTestimonial].author.name}
                        </p>
                        <p className="text-gray-600">
                          {testimonials[activeTestimonial].author.position}, {testimonials[activeTestimonial].author.company}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(testimonials[activeTestimonial].rating)}
                          {testimonials[activeTestimonial].verified && (
                            <Badge variant="outline" className="text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              인증됨
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setActiveTestimonial(Math.max(0, activeTestimonial - 1))}
                        disabled={activeTestimonial === 0}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setActiveTestimonial(Math.min(testimonials.length - 1, activeTestimonial + 1))}
                        disabled={activeTestimonial === testimonials.length - 1}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* 하이라이트 */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t">
                    {testimonials[activeTestimonial].highlights.map((highlight, idx) => (
                      <Badge key={idx} className="bg-white">
                        <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 후기 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={testimonial.author.image} />
                        <AvatarFallback>{testimonial.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.author.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.author.position}</p>
                        <p className="text-sm text-gray-500">{testimonial.author.company}</p>
                      </div>
                    </div>
                    {testimonial.verified && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>{renderStars(testimonial.rating)}</div>
                  <p className="text-gray-700 line-clamp-3">{testimonial.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{testimonial.date}</span>
                    <Badge variant="outline">{testimonial.industry}</Badge>
                  </div>
                  {testimonial.videoUrl && (
                    <Button variant="outline" className="w-full">
                      <Video className="w-4 h-4 mr-2" />
                      동영상 후기 보기
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 후속 성과 탭 */}
        <TabsContent value="followup" className="space-y-6">
          {followUpResults.map((result) => (
            <Card key={result.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl">{result.company}</CardTitle>
                    <p className="mt-2">
                      교육 후 {result.period === '3months' ? '3개월' : result.period === '6months' ? '6개월' : '12개월'} 성과
                    </p>
                  </div>
                  <Badge className="bg-white text-blue-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    지속 성장 중
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* 핵심 지표 */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">핵심 성과 지표</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {result.metrics.map((metric) => (
                      <div key={metric.name} className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">{metric.name}</p>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span className="text-lg">{metric.before}</span>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                          <span className="text-2xl font-bold text-blue-600">{metric.after}</span>
                          <span className="text-sm text-gray-500">{metric.unit}</span>
                        </div>
                        <Badge className={metric.improvement > 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                          {metric.improvement > 0 ? '+' : ''}{metric.improvement}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 주요 성과 */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      주요 성과
                    </h3>
                    <ul className="space-y-2">
                      {result.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span className="text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-500" />
                      향후 계획
                    </h3>
                    <ul className="space-y-2">
                      {result.nextSteps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5" />
                          <span className="text-sm">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {result.testimonial && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <Quote className="w-6 h-6 text-blue-300 mb-2" />
                    <p className="italic text-gray-700">"{result.testimonial}"</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* 사례 연구 탭 */}
        <TabsContent value="casestudies" className="space-y-6">
          <div className="grid gap-6">
            {caseStudies.map((study) => (
              <Card key={study.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{study.title}</CardTitle>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge variant="outline">{study.company}</Badge>
                        <Badge variant="outline">{study.industry}</Badge>
                        <Badge variant="outline">
                          <Clock className="w-3 h-3 mr-1" />
                          {study.timeline}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-green-600">{study.roi}</p>
                      <p className="text-sm text-gray-500">ROI</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-red-600">도전 과제</h4>
                      <p className="text-sm text-gray-700">{study.challenge}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-blue-600">솔루션</h4>
                      <p className="text-sm text-gray-700">{study.solution}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-green-600">결과</h4>
                      <ul className="space-y-1">
                        {study.results.map((result, idx) => (
                          <li key={idx} className="text-sm text-gray-700">• {result}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4 border-t">
                    <Button className="flex-1">
                      <FileText className="w-4 h-4 mr-2" />
                      상세 사례 보기
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      PDF 다운로드
                    </Button>
                    <Button variant="outline">
                      <Share2 className="w-4 h-4 mr-2" />
                      공유
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
