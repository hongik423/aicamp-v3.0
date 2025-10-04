'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  TrendingUp,
  Clock,
  DollarSign,
  Target,
  Eye,
  ChevronRight,
  BarChart3,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SuccessCase } from '@/types/success-case.types';
import { 
  successCases, 
  industryOptions, 
  departmentOptions, 
  companySizeOptions 
} from '@/data/success-cases/ai-n8n-automation-cases';
import { financeInsuranceCases } from '@/data/success-cases/finance-insurance-cases';
import { retailServiceCases } from '@/data/success-cases/retail-service-cases';
import { getNormalizedBenchmarks } from '@/lib/utils/benchmarkNormalization';

interface SuccessCasesListProps {
  onCaseSelect?: (caseId: string) => void;
  onConsultationRequest?: () => void;
}

export default function SuccessCasesList({ 
  onCaseSelect, 
  onConsultationRequest 
}: SuccessCasesListProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedCompanySize, setSelectedCompanySize] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 모든 성공사례 통합
  const allSuccessCases = useMemo(() => {
    return [
      ...successCases,
      ...financeInsuranceCases,
      ...retailServiceCases
    ];
  }, []);

  // 필터링된 성공사례
  const filteredCases = useMemo(() => {
    return allSuccessCases.filter(caseItem => {
      const searchTermLower = String(searchTerm || '').toLowerCase();
      const matchesSearch = String(caseItem.title || '').toLowerCase().includes(searchTermLower) ||
                           String(caseItem.description || '').toLowerCase().includes(searchTermLower) ||
                           String(caseItem.companyName || '').toLowerCase().includes(searchTermLower);
      
      const matchesIndustry = selectedIndustry === 'all' || caseItem.category === selectedIndustry;
      const matchesDepartment = selectedDepartment === 'all'; // 추후 부서별 필터링 로직 추가
      const matchesCompanySize = selectedCompanySize === 'all'; // 추후 회사 규모별 필터링 로직 추가

      return matchesSearch && matchesIndustry && matchesDepartment && matchesCompanySize;
    });
  }, [allSuccessCases, searchTerm, selectedIndustry, selectedDepartment, selectedCompanySize]);

  const handleCaseClick = (caseId: string) => {
    if (onCaseSelect) {
      onCaseSelect(caseId);
    } else {
      router.push(`/success-cases/${caseId}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* 헤더 섹션 */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          AI & n8n 프로세스 자동화 성공사례
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          업종별 맞춤형 AI 자동화로 놀라운 성과를 달성한 실제 고객사례를 확인해보세요
        </p>
        <div className="flex justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <BarChart3 className="w-4 h-4" />
            평균 ROI 1,500%
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            평균 구현기간 8주
          </div>
          <div className="flex items-center gap-1">
            <Target className="w-4 h-4" />
            고객만족도 98%
          </div>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 검색 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="회사명, 업종, 키워드 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* 업종 필터 */}
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="업종 선택" />
              </SelectTrigger>
              <SelectContent>
                {industryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 부서 필터 */}
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="부서 선택" />
              </SelectTrigger>
              <SelectContent>
                {departmentOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 회사 규모 필터 */}
            <Select value={selectedCompanySize} onValueChange={setSelectedCompanySize}>
              <SelectTrigger>
                <SelectValue placeholder="회사 규모" />
              </SelectTrigger>
              <SelectContent>
                {companySizeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 필터 결과 */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="text-sm text-gray-600">
              총 <span className="font-semibold text-blue-600">{filteredCases.length}</span>개의 성공사례
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                카드형
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                목록형
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 성공사례 목록 */}
      <div className={viewMode === 'grid' ? 'grid lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredCases.map((caseItem) => {
          const IconComponent = caseItem.icon;
          const normalized = getNormalizedBenchmarks(caseItem as any);
          const imageSrc = (caseItem as any).image || (caseItem as any).heroImage || `https://picsum.photos/seed/${encodeURIComponent(caseItem.industry || caseItem.title)}/800/500`;
          
          if (viewMode === 'grid') {
            return (
              <Card 
                key={caseItem.id} 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md"
                onClick={() => handleCaseClick(caseItem.id)}
              >
                <div className="relative">
                  <img
                    src={imageSrc}
                    alt={caseItem.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <div className={`p-2 rounded-lg bg-${caseItem.color}-500/90 text-white`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      {caseItem.industry}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {caseItem.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{caseItem.companyName}</p>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {caseItem.description}
                      </p>
                    </div>

                    {/* 핵심 성과 지표 */}
                    {caseItem.automationMetrics && (
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="text-lg font-bold text-green-600">
                            {normalized.productivityGain}
                          </div>
                          <div className="text-xs text-gray-600">생산성 향상</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="text-lg font-bold text-blue-600">
                            {normalized.timeReduction}
                          </div>
                          <div className="text-xs text-gray-600">시간 단축</div>
                        </div>
                      </div>
                    )}

                    {/* 태그 */}
                    <div className="flex flex-wrap gap-1">
                      {caseItem.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {caseItem.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{caseItem.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* 상세보기 버튼 */}
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-blue-50 group-hover:border-blue-200"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      상세보기
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          } else {
            // 목록형 뷰
            return (
              <Card 
                key={caseItem.id}
                className="group hover:shadow-md transition-all duration-300 cursor-pointer"
                onClick={() => handleCaseClick(caseItem.id)}
              >
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* 이미지 */}
                    <div className="relative w-32 h-24 flex-shrink-0">
                      <img
                        src={imageSrc}
                        alt={caseItem.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2">
                        <div className={`p-1.5 rounded bg-${caseItem.color}-500/90 text-white`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* 콘텐츠 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {caseItem.title}
                          </h3>
                          <p className="text-sm text-gray-600">{caseItem.companyName}</p>
                        </div>
                        <Badge variant="secondary">{caseItem.industry}</Badge>
                      </div>

                      <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                        {caseItem.description}
                      </p>

                      {/* 성과 지표 */}
                      {caseItem.automationMetrics && (
                        <div className="flex gap-4 mb-3">
                          <div className="flex items-center gap-1 text-sm">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="font-medium text-green-600">
                              {normalized.productivityGain}
                            </span>
                            <span className="text-gray-600">생산성</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="font-medium text-blue-600">
                              {normalized.timeReduction}
                            </span>
                            <span className="text-gray-600">시간단축</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <DollarSign className="w-4 h-4 text-purple-500" />
                            <span className="font-medium text-purple-600">
                              {normalized.costSaving}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* 태그 */}
                      <div className="flex flex-wrap gap-1">
                        {caseItem.tags.slice(0, 4).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {caseItem.tags.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{caseItem.tags.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* 상세보기 버튼 */}
                    <div className="flex-shrink-0">
                      <Button variant="outline" size="sm">
                        상세보기
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          }
        })}
      </div>

      {/* 검색 결과가 없을 때 */}
      {filteredCases.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-gray-600 mb-6">
              다른 검색어나 필터 조건을 시도해보세요
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedIndustry('all');
                setSelectedDepartment('all');
                setSelectedCompanySize('all');
              }}
            >
              필터 초기화
            </Button>
          </CardContent>
        </Card>
      )}

      {/* 상담신청 CTA */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <CardContent className="p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              우리 회사에 맞는 자동화 솔루션이 궁금하신가요?
            </h3>
            <p className="text-lg opacity-90 mb-6">
              업종별 맞춤 진단을 통해 최적의 AI 자동화 전략을 제안해드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={onConsultationRequest}
                className="flex items-center gap-2"
              >
                <Zap className="w-5 h-5" />
                무료 자동화 진단 신청
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => router.push('/services/diagnosis')}
              >
                AI 역량 진단 받기
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
