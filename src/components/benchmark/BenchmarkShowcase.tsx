'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Target,
  ArrowRight,
  Star,
  Building2,
  Factory,
  Code,
  Cloud
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  benchmarkCases, 
  industryBenchmarkCategories,
  getBenchmarkStatistics,
  getRecommendedBenchmarkCases 
} from '@/data/success-cases/benchmark-cases-index';
import { SuccessCaseDetail } from '@/types/success-case.types';

interface BenchmarkShowcaseProps {
  onCaseSelect?: (caseData: SuccessCaseDetail) => void;
  onConsultationRequest?: () => void;
}

export default function BenchmarkShowcase({ 
  onCaseSelect,
  onConsultationRequest 
}: BenchmarkShowcaseProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedSubIndustry, setSelectedSubIndustry] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('roi');

  const stats = getBenchmarkStatistics();

  // 필터링된 사례들
  const filteredCases = Object.values(benchmarkCases).filter(caseData => {
    const industryMatch = selectedIndustry === 'all' || caseData.industry === selectedIndustry;
    const subIndustryMatch = selectedSubIndustry === 'all' || caseData.subIndustry === selectedSubIndustry;
    const searchMatch = searchQuery === '' || 
      caseData.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseData.subIndustry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseData.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return industryMatch && subIndustryMatch && searchMatch;
  });

  // 정렬
  const sortedCases = [...filteredCases].sort((a, b) => {
    switch (sortBy) {
      case 'roi':
        const roiA = parseInt(a.roiData.threeYearROI.replace('%', ''));
        const roiB = parseInt(b.roiData.threeYearROI.replace('%', ''));
        return roiB - roiA;
      case 'timeReduction':
        const timeA = parseInt(a.automationMetrics.timeReduction.replace('%', ''));
        const timeB = parseInt(b.automationMetrics.timeReduction.replace('%', ''));
        return timeB - timeA;
      case 'productivity':
        const prodA = parseInt(a.automationMetrics.productivityGain.replace('%', ''));
        const prodB = parseInt(b.automationMetrics.productivityGain.replace('%', ''));
        return prodB - prodA;
      default:
        return 0;
    }
  });

  const getIndustryIcon = (industry: string) => {
    switch (industry) {
      case 'IT/기술': return Code;
      case '제조/생산': return Factory;
      default: return Building2;
    }
  };

  const getROIColor = (roi: string) => {
    const roiValue = parseInt(roi.replace('%', ''));
    if (roiValue >= 1500) return 'text-green-600';
    if (roiValue >= 1000) return 'text-blue-600';
    if (roiValue >= 500) return 'text-orange-600';
    return 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 헤더 섹션 */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-white/20 text-white">
                <Star className="w-4 h-4 mr-1" />
                업종별 최적화 벤치마크
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                업종별 AI 성공사례 벤치마크
              </h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                실제 기업들이 참조할 수 있는 업종별 최적화된 AI & N8N 도입 모델을 확인하세요
              </p>
              
              {/* 통계 카드 */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">{stats.totalCases}</div>
                    <div className="text-sm opacity-80">총 벤치마크 사례</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">{stats.industries}</div>
                    <div className="text-sm opacity-80">업종 분야</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">{stats.averageROI}%</div>
                    <div className="text-sm opacity-80">평균 ROI</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">{stats.averageTimeReduction}%</div>
                    <div className="text-sm opacity-80">평균 시간 단축</div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 필터 및 검색 섹션 */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* 검색 */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="벤치마크 사례 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* 업종 필터 */}
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="업종 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 업종</SelectItem>
                {Object.keys(industryBenchmarkCategories).map(industry => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 세부 업종 필터 */}
            <Select value={selectedSubIndustry} onValueChange={setSelectedSubIndustry}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="세부 업종 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 세부 업종</SelectItem>
                {selectedIndustry !== 'all' && 
                  industryBenchmarkCategories[selectedIndustry as keyof typeof industryBenchmarkCategories]?.subIndustries.map(subIndustry => (
                    <SelectItem key={subIndustry} value={subIndustry}>
                      {subIndustry}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>

            {/* 정렬 */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="roi">ROI 높은 순</SelectItem>
                <SelectItem value="timeReduction">시간 단축 순</SelectItem>
                <SelectItem value="productivity">생산성 향상 순</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* 벤치마크 사례 목록 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              검색 결과 ({sortedCases.length}건)
            </h2>
            <p className="text-gray-600">
              귀사의 업무 환경과 규모에 맞는 벤치마크 사례를 참조하여 자체 AI 프로그램을 설계하세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {sortedCases.map((caseData, index) => {
                const IndustryIcon = getIndustryIcon(caseData.industry);
                return (
                  <motion.div
                    key={caseData.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all cursor-pointer group"
                          onClick={() => onCaseSelect?.(caseData)}>
                      <div className="relative">
                        <img
                          src={caseData.heroImage}
                          alt={caseData.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-white/90 text-gray-800">
                            <IndustryIcon className="w-3 h-3 mr-1" />
                            {caseData.subIndustry}
                          </Badge>
                        </div>
                        {caseData.featured && (
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-yellow-500 text-white">
                              <Star className="w-3 h-3 mr-1" />
                              추천
                            </Badge>
                          </div>
                        )}
                      </div>
                      
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
                          {caseData.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600">{caseData.subtitle}</p>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                          {caseData.description}
                        </p>
                        
                        {/* 핵심 지표 */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="text-center p-2 bg-blue-50 rounded">
                            <div className={`text-lg font-bold ${getROIColor(caseData.roiData.threeYearROI)}`}>
                              {caseData.roiData.threeYearROI}
                            </div>
                            <div className="text-xs text-gray-600">3년 ROI</div>
                          </div>
                          <div className="text-center p-2 bg-green-50 rounded">
                            <div className="text-lg font-bold text-green-600">
                              {caseData.automationMetrics.timeReduction}
                            </div>
                            <div className="text-xs text-gray-600">시간 단축</div>
                          </div>
                        </div>
                        
                        {/* 회사 정보 */}
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <span>{caseData.companyName}</span>
                          <span>{caseData.companySize}</span>
                        </div>
                        
                        {/* 태그 */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {caseData.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <Button 
                          variant="outline" 
                          className="w-full group-hover:bg-blue-50 group-hover:border-blue-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            onCaseSelect?.(caseData);
                          }}
                        >
                          상세 보기
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {sortedCases.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                검색 결과가 없습니다
              </h3>
              <p className="text-gray-600">
                다른 검색어나 필터 조건을 시도해보세요
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            귀사에 맞는 벤치마크 사례를 찾으셨나요?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            전문가와 상담하여 귀사만의 맞춤형 AI 프로그램을 설계해보세요
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              onClick={onConsultationRequest}
              className="bg-white text-blue-600 hover:bg-gray-50"
            >
              무료 상담 신청
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              벤치마크 가이드북 다운로드
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
