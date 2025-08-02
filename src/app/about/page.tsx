'use client';

import { Header } from '@/components/layout';
import { Card, CardContent } from '@/components/ui';
import { Users, Target, Award, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* 회사 소개 헤더 */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                              AI CAMP
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Business Model Zen으로 기업의 5단계 성장을 완성하는 
              대한민국 대표 경영컨설팅 전문기업입니다
            </p>
          </div>

          {/* 미션, 비전, 가치 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <Card className="text-center">
              <CardContent className="p-8">
                <Target className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">미션</h3>
                <p className="text-gray-600">
                  기업의 지속가능한 성장을 위한 맞춤형 솔루션 제공으로 
                  국가 경제 발전에 기여한다
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Globe className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">비전</h3>
                <p className="text-gray-600">
                  Business Model Zen으로 글로벌 스탠다드의 
                  경영컨설팅 서비스를 제공하는 선도기업
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Award className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">가치</h3>
                <p className="text-gray-600">
                  고객 성공, 전문성, 혁신, 신뢰를 바탕으로 
                  최고의 서비스를 제공한다
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 회사 연혁 */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              회사 연혁
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0 w-24 text-primary font-bold text-lg">
                    2020
                  </div>
                  <div className="ml-8">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      AICAMP AI 교육센터 설립
                    </h3>
                    <p className="text-gray-600">
                      경영컨설팅 전문기업으로 출발, BM ZEN 프레임워크 개발
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 w-24 text-primary font-bold text-lg">
                    2021
                  </div>
                  <div className="ml-8">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      5대 핵심 서비스 런칭
                    </h3>
                    <p className="text-gray-600">
                      AI 생산성향상, 기술창업, 정책자금, 인증지원, 웹사이트 구축 서비스 시작
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 w-24 text-primary font-bold text-lg">
                    2022
                  </div>
                  <div className="ml-8">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      정부 지원 사업 파트너십 체결
                    </h3>
                    <p className="text-gray-600">
                      중소벤처기업부, 산업통상자원부 등 정부 기관과 협력 관계 구축
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 w-24 text-primary font-bold text-lg">
                    2023
                  </div>
                  <div className="ml-8">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      고객 1,000개 기업 돌파
                    </h3>
                    <p className="text-gray-600">
                      누적 고객 1,000개 기업 달성, 고객 만족도 94% 이상 유지
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 w-24 text-primary font-bold text-lg">
                    2024
                  </div>
                  <div className="ml-8">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      AI 기반 진단 시스템 도입
                    </h3>
                    <p className="text-gray-600">
                      최신 AI 기술을 활용한 기업 진단 및 맞춤 솔루션 제공 시스템 구축
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 조직 구성 */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              조직 구성
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    경영컨설팅팀
                  </h3>
                  <p className="text-sm text-gray-600">
                    BM ZEN 전문 컨설턴트
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    기술지원팀
                  </h3>
                  <p className="text-sm text-gray-600">
                    AI·IT 기술 전문가
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    정부지원팀
                  </h3>
                  <p className="text-sm text-gray-600">
                    정부 사업 연계 전문가
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    고객지원팀
                  </h3>
                  <p className="text-sm text-gray-600">
                    24시간 고객 서비스
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 핵심 인재 소개 */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              핵심 인재 소개
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* CEO 홍용기 */}
              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">
                    홍용기 대표이사
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    컨설팅학 박사 · 국제공인컨설턴트 CMC
                  </p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• 25년 글로벌 비즈니스 경험</p>
                    <p>• AI CAMP CEO</p>
                    <p>• 컨설팅 3관왕 (CMC·박사·경영지도사)</p>
                  </div>
                  <a 
                    href="/center-leader"
                    className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  >
                    상세 프로필 보기
                  </a>
                </CardContent>
              </Card>

              {/* 이후경 교장 */}
              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">
                    이후경 교장
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    경영지도사 · M-CENTER 경영지도센터
                  </p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• 28년 실무경험 전문가</p>
                    <p>• 현대그룹·삼성생명 출신</p>
                    <p>• 200개사+ 지원 실적</p>
                  </div>
                  <a 
                    href="/center-leader"
                    className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                  >
                    상세 프로필 보기
                  </a>
                </CardContent>
              </Card>

              {/* 박상준 영업이사 */}
              <Card className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">
                    박상준 영업이사
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    고려대 경영학 석사 · AI CAMP 이사
                  </p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• 고려대학교 경영학 석사</p>
                    <p>• 재무관련전문인력 1급</p>
                    <p>• 교육 전문 자격</p>
                  </div>
                  <a 
                    href="/center-leader"
                    className="inline-block mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors"
                  >
                    상세 프로필 보기
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 