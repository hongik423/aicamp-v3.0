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
  Globe,
  Truck,
  Heart,
  GraduationCap,
  ShoppingCart,
  Briefcase,
  Search,
  Filter
} from 'lucide-react';

export default function CasesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  // 성공사례 데이터
  const successCases = [
    {
      id: 'aicamp-curriculum-workshop-n8n',
      category: 'service',
      industry: '전사적혁신',
      companyName: '(주)하이임팩트오토메이션',
      title: 'AICAMP 커리큘럼 + 조직 워크숍 + n8n 자동화로 고몰입 조직 구축',
      description: 'AICAMP 교육-내재화와 부서별 워크숍, n8n 기반 자동화로 리드타임 72% 단축 · 문의→상담 전환 185% 향상',
      image: 'https://picsum.photos/seed/aicamp-workshop/1200/800',
      results: {
        efficiency: '72% 단축',
        timeSaving: '10일 → 2.8일',
        revenue: '전환 185% 증가',
        satisfaction: '몰입도 93%'
      },
      tags: ['조직문화', '교육 내재화', 'n8n', '프로세스 자동화'],
      icon: TrendingUp,
      color: 'indigo'
    },
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
      image: 'https://picsum.photos/seed/digital-marketing/1200/800',
      results: {
        efficiency: '278% 향상',
        timeSaving: '주 20시간 → 4시간',
        revenue: '매출 287% 증가',
        satisfaction: '월 125건 문의'
      },
      tags: ['디지털마케팅', 'SEO', '웹사이트', '최적화'],
      icon: Globe,
      color: 'cyan'
    },
    {
      id: 'logistics-ai-automation',
      category: 'logistics',
      industry: '물류유통',
      companyName: '(주)스마트로지스틱스',
      title: 'AI 물류 최적화로 배송비 34% 절감',
      description: '경로 최적화 AI와 재고 예측으로 배송 시간 52% 단축, 창고 운영비 41% 절감',
      image: 'https://picsum.photos/seed/logistics-ai/1200/800',
      results: {
        efficiency: '52% 단축',
        timeSaving: '3일 → 1.4일',
        revenue: '운영비 34% 절감',
        satisfaction: '고객만족 96%'
      },
      tags: ['물류', '경로최적화', '재고관리', 'AI예측'],
      icon: Truck,
      color: 'amber'
    },
    {
      id: 'healthcare-ai-diagnosis',
      category: 'healthcare',
      industry: '의료헬스케어',
      companyName: '(주)스마트헬스케어',
      title: 'AI 진단 보조로 정확도 89% 향상',
      description: '의료 영상 AI 분석으로 진단 시간 67% 단축, 오진율 73% 감소',
      image: 'https://picsum.photos/seed/healthcare-ai/1200/800',
      results: {
        efficiency: '67% 단축',
        timeSaving: '45분 → 15분',
        revenue: '정확도 89% 향상',
        satisfaction: '환자만족 94%'
      },
      tags: ['의료', 'AI진단', '영상분석', '정확도'],
      icon: Heart,
      color: 'pink'
    },
    {
      id: 'education-ai-platform',
      category: 'education',
      industry: '교육에듀테크',
      companyName: '(주)스마트에듀케이션',
      title: '개인화 AI 학습으로 성취도 156% 향상',
      description: '학습자 맞춤형 AI 커리큘럼으로 완주율 78% 증가, 학습 시간 43% 효율화',
      image: 'https://picsum.photos/seed/education-ai/1200/800',
      results: {
        efficiency: '156% 향상',
        timeSaving: '8시간 → 4.6시간',
        revenue: '완주율 78% 증가',
        satisfaction: '학습만족 92%'
      },
      tags: ['교육', '개인화학습', 'AI커리큘럼', '에듀테크'],
      icon: GraduationCap,
      color: 'teal'
    },
    {
      id: 'ecommerce-ai-recommendation',
      category: 'ecommerce',
      industry: '이커머스',
      companyName: '(주)스마트커머스',
      title: 'AI 추천 시스템으로 매출 267% 증가',
      description: '개인화 상품 추천과 가격 최적화로 전환율 145% 향상, 고객 재구매율 89% 증가',
      image: 'https://picsum.photos/seed/ecommerce-ai/1200/800',
      results: {
        efficiency: '145% 향상',
        timeSaving: '구매결정 50% 단축',
        revenue: '매출 267% 증가',
        satisfaction: '재구매율 89%'
      },
      tags: ['이커머스', 'AI추천', '개인화', '전환율'],
      icon: ShoppingCart,
      color: 'violet'
    },
    {
      id: 'consulting-ai-analysis',
      category: 'consulting',
      industry: '전문서비스',
      companyName: '(주)스마트컨설팅',
      title: 'AI 분석으로 컨설팅 품질 234% 향상',
      description: '데이터 분석 자동화와 인사이트 생성으로 프로젝트 완료 시간 58% 단축',
      image: 'https://picsum.photos/seed/consulting-ai/1200/800',
      results: {
        efficiency: '234% 향상',
        timeSaving: '3주 → 1.3주',
        revenue: '프로젝트 수주 45% 증가',
        satisfaction: '고객만족 97%'
      },
      tags: ['컨설팅', '데이터분석', 'AI인사이트', '전문서비스'],
      icon: Briefcase,
      color: 'slate'
    }
  ];

  // 카테고리 목록
  const categories = [
    { id: 'all', label: '전체', count: successCases.length },
    { id: 'manufacturing', label: '제조업', count: successCases.filter(c => c.category === 'manufacturing').length },
    { id: 'service', label: '서비스업', count: successCases.filter(c => c.category === 'service').length },
    { id: 'startup', label: '스타트업', count: successCases.filter(c => c.category === 'startup').length },
    { id: 'investment', label: '투자업', count: successCases.filter(c => c.category === 'investment').length },
    { id: 'certification', label: '인증관리', count: successCases.filter(c => c.category === 'certification').length },
    { id: 'logistics', label: '물류유통', count: successCases.filter(c => c.category === 'logistics').length },
    { id: 'healthcare', label: '의료헬스케어', count: successCases.filter(c => c.category === 'healthcare').length },
    { id: 'education', label: '교육에듀테크', count: successCases.filter(c => c.category === 'education').length },
    { id: 'ecommerce', label: '이커머스', count: successCases.filter(c => c.category === 'ecommerce').length },
    { id: 'consulting', label: '전문서비스', count: successCases.filter(c => c.category === 'consulting').length }
  ];

  // 필터링 및 검색
  let filteredCases = selectedCategory === 'all' 
    ? successCases 
    : successCases.filter(case_ => case_.category === selectedCategory);

  // 검색 필터
  if (searchTerm) {
    filteredCases = filteredCases.filter(case_ => 
      case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }

  // 정렬
  if (sortBy === 'efficiency') {
    filteredCases = [...filteredCases].sort((a, b) => {
      const aEff = parseInt(a.results.efficiency) || 0;
      const bEff = parseInt(b.results.efficiency) || 0;
      return bEff - aEff;
    });
  }

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
              {successCases.length}개 기업이 경험한 AI 실무도입 성공 스토리
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold">{successCases.length}개사</div>
                <div className="text-sm opacity-80">총 지원 기업</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">127%</div>
                <div className="text-sm opacity-80">평균 효율성 향상</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">2.8억원</div>
                <div className="text-sm opacity-80">연평균 비용 절감</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">95%</div>
                <div className="text-sm opacity-80">고객 만족도</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 검색 및 필터 */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          {/* 검색바 */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="성공사례 검색 (회사명, 업종, 키워드 등)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2 text-sm"
                size="sm"
              >
                {category.label}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* 정렬 옵션 */}
          <div className="flex justify-center items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">정렬:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm"
                title="정렬 방식 선택"
              >
                <option value="latest">최신순</option>
                <option value="efficiency">효율성순</option>
              </select>
            </div>
            <div className="text-sm text-gray-500">
              총 {filteredCases.length}개 사례
            </div>
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
            {successCases.length}개 기업이 경험한 AI 혁신을 지금 시작하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnosis">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                <Target className="w-6 h-6 mr-2" />
                무료 AI 진단 시작
              </Button>
            </Link>
            <Link href="/consultation">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
                전문가 상담 신청
                <ChevronRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="mt-6 text-center">
            <p className="text-lg opacity-90">
              📞 <strong>010-9251-9743</strong> | 🎯 <strong>AI역량진단</strong> | ✉️ <strong>hongik423@gmail.com</strong>
            </p>
            <p className="text-sm opacity-75 mt-2">
              평일 09:00-18:00 | 토요일 09:00-13:00
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}