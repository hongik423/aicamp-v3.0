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
  benchmarkCaseDetails,
} from '@/data/success-cases/benchmark-cases-index';
import { SuccessCaseDetail } from '@/types/success-case.types';
import { getNormalizedBenchmarks, parsePercentToNumber } from '@/lib/utils/benchmarkNormalization';
import ErrorBoundary from '@/components/ui/error-boundary';

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
  const [minROI, setMinROI] = useState<number>(0);
  const [minTimeReduction, setMinTimeReduction] = useState<number>(0);

  const stats = getBenchmarkStatistics();

  // 필터링된 사례들
  const filteredCases = Object.values(benchmarkCases).filter(caseData => {
    // 업종 그룹 ↔ 실제 industry 명칭 매핑 (그룹 필터 호환)
    const industryAlias: Record<string, string[]> = {
      '금융/보험': ['금융업', '보험업', '증권', '카드', '핀테크', '자산관리', '결제서비스'],
      '유통/서비스': ['유통업'],
      '제조/생산': ['제조/생산', '제조업'],
      'IT/기술': ['IT/기술'],
      '의료/헬스케어': ['의료/헬스케어'],
      '교육/연구': ['교육/연구'],
      '건설/부동산': ['건설/부동산'],
      '운송/물류': ['운송/물류'],
      '미디어/콘텐츠': ['미디어/콘텐츠'],
      '전문서비스': ['전문서비스'],
      '에너지/환경': ['에너지/환경'],
      '농업/수산업': ['농업/수산업'],
      '통신/네트워크': ['통신/네트워크'],
      '공공/비영리': ['공공/비영리'],
    };

    const caseIndustry = (caseData.industry || '').trim();
    const industryMatch =
      selectedIndustry === 'all' ||
      caseIndustry === selectedIndustry ||
      (industryAlias[selectedIndustry]?.some(alias => alias === caseIndustry) ?? false);

    // 세부 업종: 목록 요약에 없을 경우 상세 데이터에서 보강
    const subIndustryValue = ((caseData as any).subIndustry as string | undefined) ??
      (benchmarkCaseDetails as any)[caseData.id]?.subIndustry;
    const subIndustryMatch = selectedSubIndustry === 'all' || subIndustryValue === selectedSubIndustry;
    const title = String(caseData.title || '').toLowerCase();
    const description = String(caseData.description || '').toLowerCase();
    const subIndustryLower = String(subIndustryValue || '').toLowerCase();
    const industryLower = String(caseIndustry || '').toLowerCase();
    const query = String(searchQuery || '').toLowerCase();
    // 그룹명으로 검색해도 매칭되도록 보강
    const aliasKeys = Object.keys(industryAlias);
    const aliasHit = aliasKeys.find(k => k.toLowerCase() === query || query.includes(k.toLowerCase()));
    const belongsToAlias = aliasHit
      ? (industryAlias[aliasHit] ?? []).some(alias => alias === caseIndustry)
      : false;

    const searchMatch = query === '' ||
      title.includes(query) ||
      subIndustryLower.includes(query) ||
      description.includes(query) ||
      industryLower.includes(query) ||
      belongsToAlias;
    const normalized = getNormalizedBenchmarks(caseData as any);
    const roiValue = parsePercentToNumber(normalized.roi);
    const timeValue = parsePercentToNumber(normalized.timeReduction);
    const thresholdMatch = roiValue >= minROI && timeValue >= minTimeReduction;
    return industryMatch && subIndustryMatch && searchMatch && thresholdMatch;
  });

  // 정렬
  const sortedCases = [...filteredCases].sort((a, b) => {
    switch (sortBy) {
      case 'roi':
        const roiA = parsePercentToNumber(getNormalizedBenchmarks(a as any).roi);
        const roiB = parsePercentToNumber(getNormalizedBenchmarks(b as any).roi);
        return roiB - roiA;
      case 'timeReduction':
        const timeA = parsePercentToNumber(getNormalizedBenchmarks(a as any).timeReduction);
        const timeB = parsePercentToNumber(getNormalizedBenchmarks(b as any).timeReduction);
        return timeB - timeA;
      case 'productivity':
        const prodA = parsePercentToNumber(getNormalizedBenchmarks(a as any).productivityGain);
        const prodB = parsePercentToNumber(getNormalizedBenchmarks(b as any).productivityGain);
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

  const getROIColor = (roi?: string) => {
    if (!roi) return 'text-gray-600';
    const roiValue = parseInt(roi.replace('%', ''));
    if (roiValue >= 1500) return 'text-green-600';
    if (roiValue >= 1000) return 'text-blue-600';
    if (roiValue >= 500) return 'text-orange-600';
    return 'text-gray-600';
  };

  // 이미지 로딩 오류 처리 함수
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, caseData: any) => {
    console.warn(`이미지 로딩 실패: ${caseData.title}`);
    const target = e.target as HTMLImageElement;
    
    if (!target.dataset.fallbackAttempted) {
      // 첫 번째 대체: via.placeholder.com 사용
      target.dataset.fallbackAttempted = 'true';
      const industryText = (caseData as any).subIndustry || caseData.industry || 'AI 벤치마크';
      target.src = `https://via.placeholder.com/1200x800/3B82F6/FFFFFF?text=${encodeURIComponent(industryText)}`;
    } else if (!target.dataset.secondFallbackAttempted) {
      // 두 번째 대체: 다른 placeholder 서비스
      target.dataset.secondFallbackAttempted = 'true';
      target.src = `https://dummyimage.com/1200x800/3B82F6/FFFFFF&text=${encodeURIComponent(caseData.title)}`;
    } else {
      // 세 번째 실패 시 CSS 대체 요소 표시
      target.style.display = 'none';
      const fallbackDiv = target.nextElementSibling as HTMLElement;
      if (fallbackDiv) {
        fallbackDiv.style.display = 'flex';
      }
    }
  };

  return (
    <ErrorBoundary>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 헤더 섹션 (히어로) */}
      <section className="relative py-20 overflow-hidden">
        {/* 배경 이미지 + 오버레이 */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1920&auto=format&fit=crop"
            alt="AI 벤치마크 배경"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black/80 z-10" />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-30"
            >
              <Badge className="mb-4 bg-white/20 text-white border-white/30 relative z-40"
                     style={{ color: '#ffffff !important' }}>
                <Star className="w-4 h-4 mr-1" />
                업종별 최적화 AI 벤치마크
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-2xl relative z-40" 
                  style={{ color: '#ffffff !important', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                업종별 AI 성공사례 벤치마크
              </h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto text-white drop-shadow-lg relative z-40"
                 style={{ color: '#ffffff !important', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                업종별 프로세스 자동화와 고몰입 조직구축을 위한 최고 수준의 AI & n8n 도입 모델을 벤치마크하세요
              </p>
              
              {/* 통계 카드 */}
              <div className="grid md:grid-cols-4 gap-6 mb-8 relative z-40">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white relative z-50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-white">{stats.totalCases}</div>
                    <div className="text-sm text-white/80">총 벤치마크 사례</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white relative z-50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-white">{stats.totalIndustries}</div>
                    <div className="text-sm text-white/80">업종 분야</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white relative z-50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-white">{stats.averageROI}%</div>
                    <div className="text-sm text-white/80">평균 ROI</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white relative z-50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-white">{stats.averageTimeSaved}</div>
                    <div className="text-sm text-white/80">평균 시간 단축</div>
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
                  industryBenchmarkCategories[selectedIndustry as keyof typeof industryBenchmarkCategories]?.subIndustries?.map(subIndustry => (
                    <SelectItem key={subIndustry} value={subIndustry}>
                      {subIndustry}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>

            {/* 추가 필터 및 정렬 */}
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

            {/* 임계값 슬라이더들 (간단 입력형) */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span>최소 ROI</span>
                <Input
                  type="number"
                  min={0}
                  max={5000}
                  value={minROI}
                  onChange={(e) => setMinROI(parseInt(e.target.value || '0'))}
                  className="w-24"
                />
                <span>%</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span>최소 시간단축</span>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={minTimeReduction}
                  onChange={(e) => setMinTimeReduction(parseInt(e.target.value || '0'))}
                  className="w-24"
                />
                <span>%</span>
              </div>
            </div>
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
                          onClick={() => onCaseSelect?.(caseData as any)}>
                      <div className="relative">
                        {/* 로딩 스피너 */}
                        <div className="absolute inset-0 w-full h-48 flex items-center justify-center bg-gray-100 rounded-t-lg">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                        
                        <img
                          src={(caseData as any).heroImage || (caseData as any).image || `https://picsum.photos/seed/${encodeURIComponent((caseData as any).subIndustry || caseData.industry || caseData.title)}/1200/800`}
                          alt={caseData.title}
                          className="w-full h-48 object-cover rounded-t-lg relative z-10"
                          onLoad={(e) => {
                            // 이미지 로딩 완료 시 스피너 숨기기
                            const target = e.target as HTMLImageElement;
                            const spinner = target.previousElementSibling as HTMLElement;
                            if (spinner) {
                              spinner.style.display = 'none';
                            }
                          }}
                          onError={(e) => {
                            // 오류 시에도 스피너 숨기기
                            const target = e.target as HTMLImageElement;
                            const spinner = target.previousElementSibling as HTMLElement;
                            if (spinner) {
                              spinner.style.display = 'none';
                            }
                            handleImageError(e, caseData);
                          }}
                        />
                        
                        {/* 최종 대체 요소 */}
                        <div 
                          className="hidden w-full h-48 items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-lg"
                          style={{ display: 'none' }}
                        >
                          <div className="text-center text-blue-600">
                            <div className="text-4xl mb-2">📊</div>
                            <div className="text-sm font-medium">{(caseData as any).subIndustry || caseData.industry}</div>
                            <div className="text-xs opacity-75">AI 벤치마크</div>
                          </div>
                        </div>
                        <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-gray-800">
                          <IndustryIcon className="w-3 h-3 mr-1" />
                          {(caseData as any).subIndustry || caseData.industry}
                        </Badge>
                        </div>
                        {(caseData as any).featured && (
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
                        <p className="text-sm text-gray-600">{(caseData as any).subtitle || caseData.description}</p>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                          {caseData.description}
                        </p>
                        
                        {/* 핵심 지표 */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="text-center p-2 bg-blue-50 rounded">
                          <div className={`text-lg font-bold ${getROIColor(getNormalizedBenchmarks(caseData as any).roi)}`}>
                              {getNormalizedBenchmarks(caseData as any).roi}
                            </div>
                            <div className="text-xs text-gray-600">3년 ROI</div>
                          </div>
                          <div className="text-center p-2 bg-green-50 rounded">
                            <div className="text-lg font-bold text-green-600">
                              {getNormalizedBenchmarks(caseData as any).timeReduction}
                            </div>
                            <div className="text-xs text-gray-600">시간 단축</div>
                          </div>
                        </div>
                        
                        {/* 회사 정보 */}
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <span>{(caseData as any).companyName || ''}</span>
                          <span>{(caseData as any).companySize || caseData.industry}</span>
                        </div>
                        
                        {/* 태그 */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {caseData.tags?.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          )) || null}
                        </div>
                        
                        <Button 
                          variant="outline" 
                          className="w-full group-hover:bg-blue-50 group-hover:border-blue-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            onCaseSelect?.(caseData as any);
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
    </ErrorBoundary>
  );
}
