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
  Package,
  Heart,
  GraduationCap,
  ShoppingCart,
  Briefcase,
  Search,
  Filter,
  Scale,
  Calculator,
  CreditCard,
  Wifi,
  Video,
  Tv,
  Sun,
  Leaf,
  TreePine,
  Ruler
} from 'lucide-react';
import { successCases } from './data';

export default function CasesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  // 카테고리별 필터링
  const categories = [
    { id: 'all', label: '전체', count: successCases.length },
    { id: 'manufacturing', label: '제조업', count: successCases.filter(c => c.category === 'manufacturing').length },
    { id: 'service', label: '서비스업', count: successCases.filter(c => c.category === 'service').length },
    { id: 'startup', label: '스타트업', count: successCases.filter(c => c.category === 'startup').length },
    { id: 'investment', label: '투자', count: successCases.filter(c => c.category === 'investment').length },
    { id: 'certification', label: '인증관리', count: successCases.filter(c => c.category === 'certification').length },
    { id: 'logistics', label: '물류유통', count: successCases.filter(c => c.category === 'logistics').length },
    { id: 'healthcare', label: '의료헬스케어', count: successCases.filter(c => c.category === 'healthcare').length },
    { id: 'edutech', label: '교육에듀테크', count: successCases.filter(c => c.category === 'edutech').length },
    { id: 'ecommerce', label: '이커머스', count: successCases.filter(c => c.category === 'ecommerce').length },
    { id: 'professional', label: '전문서비스', count: successCases.filter(c => c.category === 'professional').length },
    { id: 'construction', label: '건설업', count: successCases.filter(c => c.category === 'construction').length },
    { id: 'finance', label: '금융업', count: successCases.filter(c => c.category === 'finance').length },
    { id: 'telecom', label: '통신업', count: successCases.filter(c => c.category === 'telecom').length },
    { id: 'media', label: '미디어', count: successCases.filter(c => c.category === 'media').length },
    { id: 'energy', label: '에너지', count: successCases.filter(c => c.category === 'energy').length },
    { id: 'agriculture', label: '농업', count: successCases.filter(c => c.category === 'agriculture').length }
  ];

  // 필터링된 케이스
  const filteredCases = successCases.filter(caseItem => {
    const matchesCategory = selectedCategory === 'all' || caseItem.category === selectedCategory;
    const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 정렬
  const sortedCases = [...filteredCases].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return 0; // 기본 순서 유지
      case 'efficiency':
        return b.results.efficiency.localeCompare(a.results.efficiency);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white drop-shadow-lg">
              AI CAMP 성공사례
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-yellow-100 leading-relaxed max-w-4xl mx-auto">
              실제 AI 프로세스 자동화로 고몰입조직을 구축한 {successCases.length}개 기업의 혁신 사례
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">실제 AI 프로세스 자동화</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  ChatGPT, Claude, n8n 등 최신 AI 도구로 업무 프로세스 자동화 및 효율성 극대화
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">고몰입조직 구축</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  AI 활용 역량 강화로 직원 몰입도 90% 이상, 업무 만족도 및 조직 충성도 극대화
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">측정 가능한 ROI</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  평균 245% 생산성 향상, 78% 비용 절감, 6개월 내 투자회수 달성의 검증된 성과
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 필터 및 검색 섹션 */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="text-sm"
                >
                  {category.label}
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* 검색 및 정렬 */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="성공사례 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="latest">최신순</option>
                <option value="efficiency">효율성순</option>
              </select>
            </div>
          </div>

          {/* 결과 통계 */}
          <div className="text-center">
            <p className="text-gray-600">
              총 <span className="font-bold text-blue-600">{successCases.length}개</span>의 성공사례 중 
              <span className="font-bold text-green-600"> {filteredCases.length}개</span>가 검색되었습니다
            </p>
          </div>
        </div>
      </section>

      {/* 성공사례 목록 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedCases.map((caseItem) => {
              const IconComponent = caseItem.icon;
              return (
                <Card key={caseItem.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img
                      src={caseItem.image}
                      alt={caseItem.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className={`absolute top-4 left-4 w-12 h-12 bg-${caseItem.color}-100 rounded-full flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 text-${caseItem.color}-600`} />
                    </div>
                    <Badge className="absolute top-4 right-4 bg-white/90 text-gray-700">
                      {caseItem.industry}
                    </Badge>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="text-sm text-gray-500 mb-2">{caseItem.companyName}</div>
                    <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
                      {caseItem.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {caseItem.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {caseItem.results.efficiency}
                        </div>
                        <div className="text-xs text-blue-700">효율성 향상</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          {caseItem.results.satisfaction}
                        </div>
                        <div className="text-xs text-green-700">조직 몰입도</div>
                      </div>
                    </div>

                    {/* AI 도구 표시 */}
                    {caseItem.aiTools && (
                      <div className="mb-3 p-2 bg-gray-50 rounded-lg">
                        <div className="text-xs font-semibold text-gray-600 mb-1">활용 AI 도구:</div>
                        <div className="flex flex-wrap gap-1">
                          {caseItem.aiTools.slice(0, 3).map((tool, index) => (
                            <span key={index} className="text-xs px-2 py-1 bg-white rounded border border-gray-200">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* 교육 시간 표시 */}
                    {caseItem.appliedModules && (
                      <div className="mb-3 p-2 bg-blue-50 rounded-lg">
                        <div className="text-xs font-semibold text-blue-700">
                          {caseItem.appliedModules}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {caseItem.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Link href={`/cases/${caseItem.id}`}>
                      <Button className="w-full group-hover:bg-blue-700 transition-colors">
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
            당신의 조직도 AI 프로세스 자동화로 혁신하세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            기초·심화·경영진 맞춤형 커리큘럼으로 전사적 AI 역량 강화와 고몰입조직 구축
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultation">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
                무료 상담 신청
                <ChevronRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
            <Link href="/diagnosis">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
                AI역량진단 받기
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
