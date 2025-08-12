'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, TrendingUp, Clock, DollarSign, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { successCases } from '@/data/success-cases/ai-n8n-automation-cases';

export default function SuccessCasesPreview() {
  const router = useRouter();
  
  // 상위 2개 성공사례만 표시
  const featuredCases = successCases.slice(0, 2);

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🚀 AI 자동화 성공사례
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            실제 고객사가 AI & n8n 자동화로 달성한 놀라운 성과를 확인해보세요
          </p>
          <div className="flex justify-center gap-8 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              평균 ROI 1,500%
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              구현기간 8주
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              연평균 7억원 절감
            </div>
          </div>
        </div>

        {/* 성공사례 카드 */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {featuredCases.map((caseItem) => {
            const IconComponent = caseItem.icon;
            
            return (
              <Card 
                key={caseItem.id}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg overflow-hidden"
                onClick={() => router.push(`/success-cases/${caseItem.id}`)}
              >
                <div className="relative">
                  <img
                    src={caseItem.image}
                    alt={caseItem.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className={`p-3 rounded-lg bg-${caseItem.color}-500/90 text-white`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      {caseItem.industry}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-blue-200 transition-colors">
                      {caseItem.title}
                    </h3>
                    <p className="text-sm opacity-90">{caseItem.companyName}</p>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {caseItem.description}
                  </p>

                  {/* 핵심 성과 지표 */}
                  {caseItem.automationMetrics && (
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">
                          {caseItem.automationMetrics.productivityGain}
                        </div>
                        <div className="text-xs text-gray-600">생산성</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">
                          {caseItem.automationMetrics.timeReduction}
                        </div>
                        <div className="text-xs text-gray-600">시간단축</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-sm font-bold text-purple-600">
                          {caseItem.automationMetrics.costSaving.includes('억') ? 
                            caseItem.automationMetrics.costSaving.split('연 ')[1] : 
                            caseItem.automationMetrics.costSaving
                          }
                        </div>
                        <div className="text-xs text-gray-600">비용절감</div>
                      </div>
                    </div>
                  )}

                  {/* 태그 */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {caseItem.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-600"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    상세보기
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 더 많은 사례 보기 */}
        <div className="text-center">
          <Button 
            size="lg"
            onClick={() => router.push('/success-cases')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            더 많은 성공사례 보기
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* ROI 계산기 CTA */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                🧮 우리 회사의 AI 자동화 효과는?
              </h3>
              <p className="text-lg opacity-90 mb-6">
                업종별 맞춤 ROI 계산으로 예상 효과를 미리 확인해보세요
              </p>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => router.push('/roi-calculator')}
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                무료 ROI 계산하기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
