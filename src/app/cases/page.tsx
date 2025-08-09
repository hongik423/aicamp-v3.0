'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  Award,
  ArrowRight,
  ChevronRight,
  Star,
  Target,
  Zap,
  CheckCircle,
  Factory,
  Palette,
  Rocket,
  BarChart3,
  Shield,
  Globe
} from 'lucide-react';

export default function CasesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 성공사례 데이터
  const successCases = [
    {
      id: 'manufacturing-smart-factory',
      category: 'manufacturing',
      industry: '제조업',
      companyName: '(주)스마트팩토리솔루션',
      title: 'AI 혁신으로 업무 효율성 69% 향상',
      description: '자동차 부품 제조업체의 AI 도입으로 제안서 작성 시간 69% 단축 및 품질 데이터 분석 85% 효율화',
      image: '/images/manufacturing-case.jpg',
      results: {
        efficiency: '69% 향상',
        timeSaving: '주 20시간 → 3시간',
        revenue: '연 5억 8천만원 효과',
        satisfaction: '92% 직원 만족도'
      },
      tags: ['제조업', 'AI 도입', '업무 자동화', '품질 관리'],
      icon: Factory,
      color: 'blue'
    },
    {
      id: 'creative-marketing',
      category: 'service',
      industry: '서비스업',
      companyName: '(주)크리에이티브마케팅',
      title: '창작 업무 AI 혁신으로 생산성 300% 증대',
      description: '디자인 시안 생성 83% 시간 단축, 영상 편집 86% 효율화로 매출 61% 성장',
      image: '/images/creative-case.jpg',
      results: {
        efficiency: '300% 향상',
        timeSaving: '4주 → 1.5주',
        revenue: '연 42억 → 68억',
        satisfaction: '96% 고객 만족도'
      },
      tags: ['서비스업', 'AI 창작', '디자인', '마케팅'],
      icon: Palette,
      color: 'purple'
    },
    {
      id: 'ai-healthcare-startup',
      category: 'startup',
      industry: '스타트업',
      companyName: '(주)AI헬스케어테크',
      title: 'AI 기반 사업화로 월 매출 8억원 달성',
      description: '제품 개발 기간 66% 단축, 투자 유치 성공률 467% 향상으로 빠른 성장 실현',
      image: '/images/healthcare-case.jpg',
      results: {
        efficiency: '467% 향상',
        timeSaving: '24개월 → 8개월',
        revenue: '월 8억원 달성',
        satisfaction: '50만명 사용자'
      },
      tags: ['스타트업', '사업화', '투자유치', '헬스케어'],
      icon: Rocket,
      color: 'green'
    },
    {
      id: 'real-estate-investment',
      category: 'investment',
      industry: '투자업',
      companyName: '(주)스마트리얼에스테이트',
      title: '경매 투자 AI 분석으로 수익률 133% 향상',
      description: '물건 조사 시간 92% 단축, 낙찰 성공률 123% 향상으로 투자 효율성 극대화',
      image: '/images/realestate-case.jpg',
      results: {
        efficiency: '133% 향상',
        timeSaving: '3일 → 3시간',
        revenue: '연 35% 수익률',
        satisfaction: '96% 투자 만족도'
      },
      tags: ['투자업', '부동산', 'AI 분석', '데이터'],
      icon: BarChart3,
      color: 'orange'
    },
    {
      id: 'green-tech-certification',
      category: 'certification',
      industry: '환경기술',
      companyName: '(주)그린테크솔루션',
      title: 'ISO/ESG 인증 AI 관리로 업무 80% 효율화',
      description: '인증 준비 시간 62% 단축, 문서 작성 75% 효율화로 ESG A등급 달성',
      image: '/images/greentech-case.jpg',
      results: {
        efficiency: '80% 향상',
        timeSaving: '8개월 → 3개월',
        revenue: '연 8천만원 절감',
        satisfaction: 'ESG A등급 달성'
      },
      tags: ['환경기술', 'ISO 인증', 'ESG', '지속가능성'],
      icon: Shield,
      color: 'emerald'
    },
    {
      id: 'digital-marketing',
      category: 'service',
      industry: '디지털마케팅',
      companyName: '(주)디지털마케팅솔루션',
      title: '웹사이트 AI 최적화로 전환율 278% 향상',
      description: '페이지 로딩 속도 57% 개선, SEO 랭킹 733% 향상으로 매출 기여도 287% 증가',
      image: '/images/digital-case.jpg',
      results: {
        efficiency: '278% 향상',
        timeSaving: '주 20시간 → 4시간',
        revenue: '매출 287% 증가',
        satisfaction: '월 125건 문의'
      },
      tags: ['디지털마케팅', 'SEO', '웹사이트', '최적화'],
      icon: Globe,
      color: 'cyan'
    }
  ];

  // 카테고리별 필터링
  const filteredCases = selectedCategory === 'all' 
    ? successCases 
    : successCases.filter(case_ => case_.category === selectedCategory);

  // 카테고리 목록
  const categories = [
    { id: 'all', label: '전체', count: successCases.length },
    { id: 'manufacturing', label: '제조업', count: successCases.filter(c => c.category === 'manufacturing').length },
    { id: 'service', label: '서비스업', count: successCases.filter(c => c.category === 'service').length },
    { id: 'startup', label: '스타트업', count: successCases.filter(c => c.category === 'startup').length },
    { id: 'investment', label: '투자업', count: successCases.filter(c => c.category === 'investment').length },
    { id: 'certification', label: '인증관리', count: successCases.filter(c => c.category === 'certification').length }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI CAMP 성공사례
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              247개 기업이 경험한 AI 실무도입 성공 스토리
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold">247개사</div>
                <div className="text-sm opacity-80">총 지원 기업</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">48%</div>
                <div className="text-sm opacity-80">평균 효율성 향상</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">1.2억원</div>
                <div className="text-sm opacity-80">연평균 비용 절감</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">94%</div>
                <div className="text-sm opacity-80">고객 만족도</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리 필터 */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                {category.label}
                <Badge variant="secondary" className="ml-1">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* 성공사례 카드 그리드 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCases.map((case_) => {
              const IconComponent = case_.icon;
              return (
                <Card key={case_.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r from-${case_.color}-400 to-${case_.color}-600`}></div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-${case_.color}-100 text-${case_.color}-600`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {case_.industry}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {case_.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {case_.description}
                    </CardDescription>
                    
                    <div className="text-sm font-medium text-gray-800 mt-2">
                      {case_.companyName}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* 성과 지표 */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className={`text-lg font-bold text-${case_.color}-600`}>
                          {case_.results.efficiency}
                        </div>
                        <div className="text-xs text-gray-600">효율성 향상</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className={`text-lg font-bold text-${case_.color}-600`}>
                          {case_.results.timeSaving}
                        </div>
                        <div className="text-xs text-gray-600">시간 단축</div>
                      </div>
                    </div>

                    {/* 태그 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {case_.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* 상세보기 버튼 */}
                    <Link href={`/cases/${case_.id}`}>
                      <Button className="w-full group-hover:bg-blue-600 transition-colors">
                        상세사례 보기
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            당신의 기업도 성공사례가 될 수 있습니다
          </h2>
          <p className="text-xl mb-8 opacity-90">
            247개 기업이 경험한 AI 혁신을 지금 시작하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnosis">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                <Target className="w-5 h-5 mr-2" />
                무료 AI 진단 시작
              </Button>
            </Link>
            <Link href="/consultation">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                전문가 상담 신청
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}