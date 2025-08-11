'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  TrendingUp,
  Award,
  Users,
  Clock,
  ChevronDown,
  Sparkles,
  BarChart3,
  Target,
  Zap,
  Building2,
  BookOpen,
  Play,
  Grid3x3,
  List,
  SlidersHorizontal
} from 'lucide-react';
import EnhancedSuccessCaseCard from '@/components/success-cases/EnhancedSuccessCaseCard';
import SuccessCaseHeroSection from '@/components/success-cases/SuccessCaseHeroSection';
import DisclaimerNotice from '@/components/success-cases/DisclaimerNotice';
import LegalFooter from '@/components/success-cases/LegalFooter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";

// 24개 업종 데이터
const industries = [
  { id: 'all', name: '전체', icon: '🌐', count: 2487 },
  { id: 'manufacturing', name: '제조업', icon: '🏭', count: 412 },
  { id: 'it', name: 'IT서비스', icon: '💻', count: 387 },
  { id: 'finance', name: '금융업', icon: '💰', count: 298 },
  { id: 'retail', name: '유통/소매업', icon: '🛒', count: 276 },
  { id: 'construction', name: '건설업', icon: '🏗️', count: 189 },
  { id: 'healthcare', name: '의료업', icon: '🏥', count: 167 },
  { id: 'education', name: '교육업', icon: '🎓', count: 156 },
  { id: 'agriculture', name: '농업', icon: '🌾', count: 134 },
  { id: 'logistics', name: '물류업', icon: '📦', count: 123 },
  { id: 'hospitality', name: '호텔/숙박업', icon: '🏨', count: 98 },
  { id: 'legal', name: '법무/법률', icon: '⚖️', count: 87 },
  { id: 'advertising', name: '광고/마케팅', icon: '📢', count: 76 },
  { id: 'realestate', name: '부동산', icon: '🏢', count: 65 },
  { id: 'media', name: '미디어/콘텐츠', icon: '🎬', count: 54 },
  { id: 'consulting', name: '컨설팅', icon: '💼', count: 43 },
  { id: 'chemical', name: '화학업', icon: '🧪', count: 32 },
  { id: 'telecom', name: '통신업', icon: '📡', count: 28 },
  { id: 'automotive', name: '자동차', icon: '🚗', count: 24 },
  { id: 'aviation', name: '항공업', icon: '✈️', count: 21 },
  { id: 'energy', name: '에너지', icon: '⚡', count: 18 },
  { id: 'biotech', name: '바이오/제약', icon: '💊', count: 15 },
  { id: 'gaming', name: '게임업', icon: '🎮', count: 12 },
  { id: 'fashion', name: '패션업', icon: '👗', count: 9 },
  { id: 'other', name: '기타', icon: '📋', count: 87 }
];

// 성공사례 더미 데이터 (실제로는 API에서 가져옴)
const generateCaseData = () => {
  const cases = [];
  const companies = [
    '삼성전자', 'LG전자', '현대자동차', 'SK하이닉스', '포스코', 
    '네이버', '카카오', '쿠팡', '배달의민족', '토스',
    '하나은행', 'KB국민은행', '신한은행', '삼성생명', 'KB손해보험',
    '이마트', '롯데마트', '쿠팡', 'GS25', 'CU편의점',
    '삼성물산', '현대건설', 'GS건설', '대림산업', '포스코건설',
    '서울대병원', '삼성서울병원', '아산병원', '세브란스', '분당서울대병원'
  ];

  const aiTools = ['ChatGPT', 'Claude', 'n8n', 'Zapier', 'GitHub Copilot', 'Midjourney', 'DALL-E'];
  
  industries.forEach((industry, industryIndex) => {
    if (industry.id === 'all') return;
    
    for (let i = 0; i < Math.min(industry.count, 10); i++) {
      cases.push({
        id: `case-${industry.id}-${i}`,
        company: companies[Math.floor(Math.random() * companies.length)] || `${industry.name} 기업 ${i + 1}`,
        industry: industry.name,
        category: industry.id,
        title: `${industry.name} AI 혁신: ${Math.floor(Math.random() * 50 + 30)}% 생산성 향상 달성`,
        description: `AI와 n8n을 활용한 업무 자동화로 획기적인 성과를 달성했습니다. ${industry.name} 특화 커리큘럼으로 맞춤형 교육을 진행했습니다.`,
        results: {
          productivity: `${Math.floor(Math.random() * 40 + 30)}% 향상`,
          cost: `${Math.floor(Math.random() * 5 + 1)}억원 절감`,
          time: `${Math.floor(Math.random() * 50 + 20)}% 단축`,
          quality: `${Math.floor(Math.random() * 30 + 20)}% 개선`
        },
        tags: ['AI도입', 'n8n자동화', '디지털전환', industry.name],
        duration: `${Math.floor(Math.random() * 3 + 1)}개월`,
        employees: `${Math.floor(Math.random() * 500 + 50)}명`,
        featured: Math.random() > 0.8,
        beforeAfter: {
          before: Math.floor(Math.random() * 40 + 20),
          after: Math.floor(Math.random() * 40 + 60),
          metric: '업무 효율성'
        },
        testimonial: 'AI CAMP 교육 후 우리 회사가 완전히 달라졌습니다. 직원들의 업무 만족도도 크게 향상되었어요.',
        ceoName: `${['김', '이', '박', '최', '정'][Math.floor(Math.random() * 5)]}${['철수', '영희', '민수', '지영', '성호'][Math.floor(Math.random() * 5)]} 대표`,
        implementationStage: ['planning', 'inProgress', 'completed'][Math.floor(Math.random() * 3)] as any,
        aiTools: aiTools.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3 + 2)),
        certificateLevel: ['basic', 'advanced', 'expert'][Math.floor(Math.random() * 3)] as any
      });
    }
  });
  
  return cases;
};

const allCases = generateCaseData();

export default function SuccessCasesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  // 필터링 및 정렬
  const filteredCases = useMemo(() => {
    let filtered = allCases;

    // 검색어 필터
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 업종 필터
    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(c => c.category === selectedIndustry);
    }

    // 구현 단계 필터
    if (selectedStage !== 'all') {
      filtered = filtered.filter(c => c.implementationStage === selectedStage);
    }

    // 추천 사례만 보기
    if (showOnlyFeatured) {
      filtered = filtered.filter(c => c.featured);
    }

    // AI 도구 필터
    if (selectedTools.length > 0) {
      filtered = filtered.filter(c => 
        selectedTools.some(tool => c.aiTools.includes(tool))
      );
    }

    // 정렬
    switch(sortBy) {
      case 'productivity':
        filtered.sort((a, b) => 
          parseInt(b.results.productivity || '0') - parseInt(a.results.productivity || '0')
        );
        break;
      case 'cost':
        filtered.sort((a, b) => 
          parseInt(b.results.cost || '0') - parseInt(a.results.cost || '0')
        );
        break;
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        // latest - 기본 정렬
        break;
    }

    return filtered;
  }, [searchTerm, selectedIndustry, selectedStage, sortBy, showOnlyFeatured, selectedTools]);

  // 통계 계산
  const stats = {
    totalCases: filteredCases.length,
    avgProductivity: Math.round(
      filteredCases.reduce((acc, c) => acc + parseInt(c.results.productivity || '0'), 0) / filteredCases.length
    ),
    totalCostSaved: Math.round(
      filteredCases.reduce((acc, c) => acc + parseInt(c.results.cost || '0'), 0)
    ),
    featuredCount: filteredCases.filter(c => c.featured).length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 히어로 섹션 */}
      <SuccessCaseHeroSection />

      {/* 고지사항 섹션 */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <DisclaimerNotice />
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 py-12">
        {/* 필터 & 검색 섹션 */}
        <Card className="mb-8 p-6 bg-white shadow-lg">
          <div className="space-y-4">
            {/* 검색 바 */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="회사명, 제목, 내용으로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
              
              {/* 정렬 옵션 */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="정렬 기준" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">최신순</SelectItem>
                  <SelectItem value="productivity">생산성 향상순</SelectItem>
                  <SelectItem value="cost">비용 절감순</SelectItem>
                  <SelectItem value="featured">추천순</SelectItem>
                </SelectContent>
              </Select>

              {/* 보기 모드 */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* 필터 옵션 */}
            <div className="flex flex-wrap gap-2">
              {/* 구현 단계 필터 */}
              <Select value={selectedStage} onValueChange={setSelectedStage}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="구현 단계" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 단계</SelectItem>
                  <SelectItem value="planning">도입 준비중</SelectItem>
                  <SelectItem value="inProgress">구현 진행중</SelectItem>
                  <SelectItem value="completed">구현 완료</SelectItem>
                </SelectContent>
              </Select>

              {/* AI 도구 필터 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Zap className="w-4 h-4 mr-2" />
                    AI 도구
                    {selectedTools.length > 0 && (
                      <Badge className="ml-2" variant="secondary">
                        {selectedTools.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>AI 도구 선택</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {['ChatGPT', 'Claude', 'n8n', 'Zapier', 'GitHub Copilot'].map((tool) => (
                    <DropdownMenuCheckboxItem
                      key={tool}
                      checked={selectedTools.includes(tool)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTools([...selectedTools, tool]);
                        } else {
                          setSelectedTools(selectedTools.filter(t => t !== tool));
                        }
                      }}
                    >
                      {tool}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* 추천 사례만 보기 */}
              <Button
                variant={showOnlyFeatured ? 'default' : 'outline'}
                onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
              >
                <Award className="w-4 h-4 mr-2" />
                추천 사례만
              </Button>

              {/* 필터 초기화 */}
              {(searchTerm || selectedIndustry !== 'all' || selectedStage !== 'all' || showOnlyFeatured || selectedTools.length > 0) && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedIndustry('all');
                    setSelectedStage('all');
                    setShowOnlyFeatured(false);
                    setSelectedTools([]);
                  }}
                >
                  필터 초기화
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* 업종별 탭 */}
        <div className="mb-8">
          <Tabs value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <TabsList className="w-full flex-wrap h-auto p-2 bg-white">
              {industries.map((industry) => (
                <TabsTrigger
                  key={industry.id}
                  value={industry.id}
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <span className="mr-1">{industry.icon}</span>
                  <span>{industry.name}</span>
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {industry.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">검색 결과</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalCases}개</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-r from-green-50 to-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">평균 생산성</p>
                <p className="text-2xl font-bold text-green-600">{stats.avgProductivity}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-r from-purple-50 to-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 비용 절감</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalCostSaved}억</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">추천 사례</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.featuredCount}개</p>
              </div>
              <Award className="w-8 h-8 text-yellow-500" />
            </div>
          </Card>
        </div>

        {/* 성공사례 그리드/리스트 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}
          >
            {filteredCases.map((caseItem, index) => (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <EnhancedSuccessCaseCard {...caseItem} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* 결과 없음 */}
        {filteredCases.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-600">다른 검색어나 필터를 시도해보세요</p>
          </Card>
        )}

        {/* 더보기 버튼 */}
        {filteredCases.length > 0 && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="px-8">
              <ChevronDown className="w-4 h-4 mr-2" />
              더 많은 성공사례 보기
            </Button>
          </div>
        )}
      </div>

      {/* 법적 고지사항 Footer */}
      <LegalFooter />
    </div>
  );
}