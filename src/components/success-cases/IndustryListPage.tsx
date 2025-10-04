'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Search, Filter, TrendingUp, Award, Users, Clock, 
  ChevronRight, Star, ArrowRight, BarChart3, Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { enhancedIndustryCategories, allIndustryCases, industryStatistics } from '@/data/success-cases/all-industries-enhanced';

export default function IndustryListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // 검색 및 필터링
  const filteredCases = Object.entries(allIndustryCases).filter(([id, caseData]) => {
    const searchQueryLower = String(searchQuery || '').toLowerCase();
    const matchesSearch = searchQuery === '' || 
      String(caseData.title || '').toLowerCase().includes(searchQueryLower) ||
      String(caseData.companyName || '').toLowerCase().includes(searchQueryLower) ||
      String(caseData.subIndustry || '').toLowerCase().includes(searchQueryLower);
    
    const matchesCategory = selectedCategory === 'all' || caseData.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // 카테고리별 케이스 수 계산
  const getCategoryCount = (category: string) => {
    if (category === 'all') return Object.keys(allIndustryCases).length;
    return Object.values(allIndustryCases).filter(c => c.category === category).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* 히어로 섹션 */}
      <div className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="bg-white/20 text-white border-white/30 mb-6">
              39개 업종별 성공사례
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              AI와 n8n으로 실현한<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
                고몰입 조직 구축 성공사례
              </span>
            </h1>
            
            <p className="text-xl text-white/90 mb-12 leading-relaxed">
              업종별 특성을 반영한 맞춤형 AI 프로세스 자동화로<br />
              생산성 향상과 비용 절감을 동시에 달성한 혁신 기업들의 이야기
            </p>

            {/* 통계 카드 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
              >
                <div className="text-3xl font-bold text-yellow-400">{industryStatistics.totalCases}</div>
                <div className="text-sm text-white/70">검증된 성공사례</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
              >
                <div className="text-3xl font-bold text-green-400">{industryStatistics.averageROI}</div>
                <div className="text-sm text-white/70">평균 ROI</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
              >
                <div className="text-3xl font-bold text-blue-400">{industryStatistics.averagePayback}</div>
                <div className="text-sm text-white/70">투자회수기간</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
              >
                <div className="text-3xl font-bold text-purple-400">{industryStatistics.totalSavings}</div>
                <div className="text-sm text-white/70">총 비용절감</div>
              </motion.div>
            </div>

            {/* CTA 버튼 */}
            <div className="flex justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100"
              >
                무료 진단 신청
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                전체 사례 다운로드
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 검색 및 필터 섹션 */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="업종, 회사명, 키워드로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <div className="flex gap-2">
              {Object.entries(enhancedIndustryCategories).map(([key, category]) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? "default" : "outline"}
                  onClick={() => setSelectedCategory(key)}
                  className="h-12"
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                  <Badge variant="secondary" className="ml-2">
                    {getCategoryCount(key)}
                  </Badge>
                </Button>
              ))}
              <Button
                variant={selectedCategory === 'all' ? "default" : "outline"}
                onClick={() => setSelectedCategory('all')}
                className="h-12"
              >
                전체
                <Badge variant="secondary" className="ml-2">
                  {getCategoryCount('all')}
                </Badge>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 업종별 탭 콘텐츠 */}
      <div className="container mx-auto px-4 pb-20">
        {selectedCategory === 'all' ? (
          // 전체 카테고리 표시
          Object.entries(enhancedIndustryCategories).map(([categoryKey, category]) => {
            const categoryCases = Object.entries(allIndustryCases).filter(
              ([_, c]) => c.category === categoryKey
            );

            return (
              <motion.div
                key={categoryKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{category.icon}</span>
                    <div>
                      <h2 className="text-3xl font-bold">{category.name}</h2>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  <Badge className="text-lg px-4 py-1">
                    {categoryCases.length}개 사례
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryCases.slice(0, 6).map(([caseId, caseData]) => (
                    <CaseCard 
                      key={caseId}
                      caseId={caseId}
                      caseData={caseData}
                      isHovered={hoveredCard === caseId}
                      onHover={setHoveredCard}
                    />
                  ))}
                </div>

                {categoryCases.length > 6 && (
                  <div className="text-center mt-6">
                    <Button variant="outline">
                      {category.name} 더 보기
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </motion.div>
            );
          })
        ) : (
          // 선택된 카테고리만 표시
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map(([caseId, caseData]) => (
              <CaseCard 
                key={caseId}
                caseId={caseId}
                caseData={caseData}
                isHovered={hoveredCard === caseId}
                onHover={setHoveredCard}
              />
            ))}
          </div>
        )}

        {filteredCases.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// 케이스 카드 컴포넌트
function CaseCard({ 
  caseId, 
  caseData, 
  isHovered, 
  onHover 
}: { 
  caseId: string;
  caseData: any;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => onHover(caseId)}
      onHoverEnd={() => onHover(null)}
    >
      <Link href={`/success-cases/${caseId}`}>
        <Card className={`h-full cursor-pointer transition-all duration-300 ${
          isHovered ? 'shadow-2xl border-blue-500' : 'hover:shadow-xl'
        }`}>
          {/* 이미지 섹션 */}
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <img
              src={caseData.heroImage}
              alt={caseData.title}
              className="w-full h-full object-cover transition-transform duration-500"
              style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* 업종 뱃지 */}
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className="bg-white/90 text-gray-900">
                {caseData.subIndustry}
              </Badge>
              {caseData.featured && (
                <Badge className="bg-yellow-500 text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>

            {/* 회사명 */}
            <div className="absolute bottom-4 left-4 text-white">
              <div className="text-2xl font-bold">{caseData.companyName}</div>
              <div className="text-sm opacity-90">{caseData.companyInfo.employees} · {caseData.companyInfo.revenue}</div>
            </div>
          </div>

          <CardContent className="p-6">
            {/* 제목 */}
            <h3 className="text-xl font-bold mb-3 line-clamp-2">
              {caseData.title}
            </h3>
            
            {/* 설명 */}
            <p className="text-gray-600 mb-4 line-clamp-2">
              {caseData.description}
            </p>

            {/* 핵심 성과 */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600">생산성</span>
                </div>
                <div className="text-xl font-bold text-blue-600">
                  {caseData.automationMetrics.productivityGain}
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <BarChart3 className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">ROI</span>
                </div>
                <div className="text-xl font-bold text-green-600">
                  {caseData.roiData.threeYearROI}
                </div>
              </div>
            </div>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2 mb-4">
              {caseData.tags.slice(0, 3).map((tag: string, idx: number) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* CTA */}
            <Button className="w-full group">
              상세 사례 보기
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
