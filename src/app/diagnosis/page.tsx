'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import { AICapabilityDiagnosisForm } from '@/features/ai-capability-diagnosis/components/AICapabilityDiagnosisForm';
import { Brain, Target, TrendingUp, Users, Award, BarChart3, FileText, ExternalLink, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

/**
 * 이후경 교장의 AI 역량 고몰입조직구축 진단시스템
 */
// 최근 진단 결과 배너 컴포넌트
const RecentResultsBanner = () => {
  const [recentResults, setRecentResults] = useState<any[]>([]);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 최근 진단 결과 ID들을 가져오기
    const recentIds = localStorage.getItem('recentDiagnosisIds');
    if (recentIds) {
      const ids = JSON.parse(recentIds);
      if (ids.length > 0) {
        setRecentResults(ids.slice(0, 3)); // 최근 3개만
        setShowBanner(true);
      }
    }
  }, []);

  if (!showBanner || recentResults.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <FileText className="w-6 h-6" />
            <div>
              <h3 className="font-bold text-lg">최근 AI역량진단 결과</h3>
              <p className="text-blue-100 text-sm">완료된 진단 결과를 확인하세요</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {recentResults.map((resultId, index) => (
                <Link
                  key={index}
                  href={`/diagnosis/result/${resultId}`}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  결과 {index + 1}
                  <ExternalLink className="w-3 h-3" />
                </Link>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBanner(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DiagnosisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />
      
      {/* 최근 결과 배너 */}
      <RecentResultsBanner />
      
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              이후경 교장의 AI 역량진단
            </h1>
            <p className="text-xl lg:text-2xl mb-4 text-white">
              고몰입 조직구축을 위한 AI 역량 진단시스템
            </p>
            <p className="text-lg text-white mb-8">
              28년 교육 전문가의 노하우로 귀사의 AI 역량을 정밀 진단하고<br />
              맞춤형 고몰입 조직 구축 전략을 제시합니다
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span>S급 AI 진단 정확도</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                <span>맞춤형 성장 전략</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span>실행 가능한 로드맵</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 가치 제안 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              왜 AI 역량진단이 필요한가?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg">정확한 현재 수준 파악</h3>
                </div>
                <p className="text-gray-600">
                  6개 핵심 영역의 종합적 평가로 귀사의 AI 역량 수준을 정확히 진단합니다
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg">업계 벤치마크 비교</h3>
                </div>
                <p className="text-gray-600">
                  동종 업계 및 규모별 벤치마크와 비교하여 경쟁력을 객관적으로 평가합니다
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg">고몰입 조직 구축</h3>
                </div>
                <p className="text-gray-600">
                  AI를 활용한 고몰입 조직 구축 방법론으로 지속가능한 성장을 지원합니다
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 진단 프로세스 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              AI 역량진단 프로세스
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: 1, title: '기본 정보 입력', desc: '기업 정보 및 신청자 정보' },
                { step: 2, title: 'AI 관심사항', desc: '주요 고민사항 및 기대효과' },
                { step: 3, title: 'AI 역량 평가', desc: '6개 영역 24개 문항 평가' },
                { step: 4, title: '결과 보고서', desc: 'SWOT 분석 및 성장 전략' }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-gray-800 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 메인 진단 신청 폼 */}
      <section className="py-16 lg:py-24" id="diagnosis-form">
        <div className="container mx-auto px-4">
          <AICapabilityDiagnosisForm />
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">
              지금 바로 AI 역량을 진단하세요
            </h2>
            <p className="text-lg mb-8 text-white">
              이후경 교장의 28년 교육 노하우가 담긴 맞춤형 AI 성장 전략을 받아보세요
            </p>
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100"
              onClick={() => {
                const formSection = document.getElementById('diagnosis-form');
                formSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              AI역량진단 시작하기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 