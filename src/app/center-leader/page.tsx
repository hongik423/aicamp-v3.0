'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  User,
  Phone,
  Mail,
  Building,
  Award,
  Users,
  TrendingUp,
  Target,
  CheckCircle,
  MessageCircle,
  Download,
  Lightbulb,
  Shield,
  Clock,
  DollarSign,
  FileText,
  Factory,
  Send,
  Crown,
  Zap,
  Rocket,
  Sparkles,
  Cpu
} from 'lucide-react';
import Header from '@/components/layout/header';
import { getSessionLeaderImage } from '@/lib/utils';

export default function CenterLeaderPage() {
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 좌측: 홍용기 대표이사 프로필 정보 */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mr-4 backdrop-blur-sm border border-white/30">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold mb-2">AI CAMP CEO</Badge>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-2 text-white">홍용기 대표이사</h1>
                  <p className="text-xl text-yellow-200 font-semibold">컨설팅학 박사 · CMC</p>
                </div>
              </div>
              
              <div className="text-2xl mb-6 text-white">
                <span className="font-bold text-yellow-200 text-shadow-lg">"데이터와 AI 기반의 체계적 컨설팅으로 기업의 혁신성장을 이끌겠습니다"</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
                  <div className="text-3xl font-bold text-yellow-300">박사</div>
                  <div className="text-sm text-white font-semibold">컨설팅학 박사</div>
                  <div className="text-xs text-blue-200">최고 학술 전문성</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
                  <div className="text-3xl font-bold text-yellow-300">CMC</div>
                  <div className="text-sm text-white font-semibold">국제공인컨설턴트</div>
                  <div className="text-xs text-blue-200">글로벌 자격증</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
                  <div className="text-3xl font-bold text-yellow-300">빅데이터</div>
                  <div className="text-sm text-white font-semibold">분석기사 자격</div>
                  <div className="text-xs text-blue-200">데이터 전문가</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
                  <div className="text-3xl font-bold text-yellow-300">ODA</div>
                  <div className="text-sm text-white font-semibold">요르단 프로젝트</div>
                  <div className="text-xs text-blue-200">해외 대형 사업</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/consultation"
                  className="inline-flex items-center justify-center bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8 py-3 rounded-md transition-all duration-200 transform hover:scale-[1.05] active:scale-[0.95] shadow-lg hover:shadow-xl relative overflow-hidden group text-lg h-12"
                >
                  <span className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  <span className="relative flex items-center">
                    <Phone className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                    무료 상담 신청
                  </span>
                </Link>
                
                <Link 
                  href="/services"
                  className="inline-flex items-center justify-center border border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-md transition-all duration-200 transform hover:scale-[1.05] active:scale-[0.95] hover:shadow-lg relative overflow-hidden group text-lg h-12"
                >
                  <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  <span className="relative flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-200" />
                    서비스 둘러보기
                  </span>
                </Link>
              </div>
            </div>
            
            {/* 우측: 핵심 메시지 */}
            <div className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Shield className="w-6 h-6 mr-2 text-yellow-300" />
                    학술적 전문성
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white font-medium">컨설팅학 박사 · 국제공인컨설턴트 CMC</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Award className="w-6 h-6 mr-2 text-yellow-300" />
                    데이터 전문가
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white font-medium">빅데이터분석기사 · 기업가치평가사</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <TrendingUp className="w-6 h-6 mr-2 text-yellow-300" />
                    해외 프로젝트
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white font-medium">요르단 ODA 프로젝트 총괄 수행</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Clock className="w-6 h-6 mr-2 text-yellow-300" />
                    정부기관 전문
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white font-medium">창업진흥원, 한국연구재단 등 ISP 컨설팅</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 이후경 교장 프로필 섹션 */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30 overflow-hidden mb-6">
                <img 
                  src={getSessionLeaderImage()} 
                  alt="이후경 교장 프로필 사진"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                    if (nextElement) {
                      nextElement.style.display = 'flex';
                    }
                  }}
                />
                <User className="w-16 h-16 text-white hidden" />
              </div>
            </div>
            
            <div className="mb-8">
              <Badge className="bg-yellow-500 text-black font-bold text-lg px-6 py-2 mb-4">28년 검증된 전문가</Badge>
              <h1 className="text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                이후경 교장
              </h1>
              <p className="text-2xl text-yellow-200 font-bold mb-6">AI CAMP 교장 · 경영지도사</p>
            </div>
            
            {/* 교장 인사말 */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="text-3xl lg:text-4xl font-bold mb-8 text-center leading-relaxed">
                <span className="block mb-4 text-yellow-300">"기업의 성장은"</span>
                <span className="block mb-4 text-white">"사람으로부터 시작됩니다"</span>
                <span className="block text-blue-200 text-2xl lg:text-3xl">"28년 경험으로 함께하겠습니다"</span>
              </div>
              
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <p className="text-xl lg:text-2xl leading-relaxed text-white font-medium">
                  <span className="text-yellow-300 font-bold">경영지도사</span>로서 
                  <span className="text-blue-200 font-bold">28년간 축적된 실무 경험</span>과 
                  <span className="text-green-200 font-bold">현대그룹, 삼성생명 출신</span>의 검증된 전문성으로 
                  <span className="text-purple-200 font-bold">기업 맞춤형 솔루션</span>을 
                  <span className="text-orange-200 font-bold">체계적으로 제공</span>합니다.
                </p>
              </div>
            </div>
            
            {/* 교장 핵심 역량 카드들 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20 transform hover:scale-105 transition-all duration-200">
                <div className="text-4xl font-bold text-yellow-300 mb-2">28년</div>
                <div className="text-sm text-white font-bold mb-1">총 경력</div>
                <div className="text-xs text-blue-200">경영지도사 10년 + 대기업 18년</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20 transform hover:scale-105 transition-all duration-200">
                <div className="text-4xl font-bold text-yellow-300 mb-2">200+</div>
                <div className="text-sm text-white font-bold mb-1">지원 기업</div>
                <div className="text-xs text-blue-200">중소기업부터 대기업까지</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20 transform hover:scale-105 transition-all duration-200">
                <div className="text-4xl font-bold text-yellow-300 mb-2">98%</div>
                <div className="text-sm text-white font-bold mb-1">고객 만족도</div>
                <div className="text-xs text-blue-200">재계약률 85%</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20 transform hover:scale-105 transition-all duration-200">
                <div className="text-4xl font-bold text-yellow-300 mb-2">정부지원</div>
                <div className="text-sm text-white font-bold mb-1">일터혁신</div>
                <div className="text-xs text-blue-200">공식 수행기관</div>
              </div>
            </div>
            
            {/* CEO 핵심 메시지 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white transform hover:scale-105 transition-all duration-200">
                <CardHeader className="text-center">
                  <Building className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
                  <CardTitle className="text-white text-lg">정부기관 전문</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-white font-medium">창업진흥원, 한국연구재단, 서울시 등 주요 정부기관 ISP 컨설팅 수행</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white transform hover:scale-105 transition-all duration-200">
                <CardHeader className="text-center">
                  <Zap className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
                  <CardTitle className="text-white text-lg">데이터 전문가</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-white font-medium">빅데이터분석기사 자격을 보유한 AI 학습용 데이터 구축사업 평가 전문가</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white transform hover:scale-105 transition-all duration-200">
                <CardHeader className="text-center">
                  <Award className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
                  <CardTitle className="text-white text-lg">가치평가 전문</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-white font-medium">기업·기술가치평가사로서 데이터가치평가 및 경제성분석 전문</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 홍용기 CEO 상세 경력 */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">홍용기 CEO 경력</h2>
            <p className="text-xl text-gray-600">25년간 축적된 글로벌 비즈니스 전문성</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* CEO 기본 정보 */}
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-white">
                  <Crown className="w-8 h-8 mr-3 text-yellow-300" />
                  CEO 기본정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <User className="w-6 h-6 mr-3 text-yellow-300" />
                    <div>
                      <span className="font-bold block text-white">홍용기 대표이사</span>
                      <span className="text-blue-100 text-sm">AI CAMP 최고경영자</span>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Building className="w-6 h-6 mr-3 text-yellow-300" />
                    <div>
                      <span className="font-bold block text-white">컨설팅학 박사</span>
                      <span className="text-blue-100 text-sm">최고 학술 전문성</span>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Award className="w-6 h-6 mr-3 text-yellow-300" />
                    <div>
                      <span className="font-bold block text-white">경영지도사 & CMC</span>
                      <span className="text-blue-100 text-sm">국제공인컨설턴트</span>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Award className="w-6 h-6 mr-3 text-yellow-300" />
                    <div>
                      <span className="font-bold block text-white">빅데이터분석기사</span>
                      <span className="text-blue-100 text-sm">데이터분석 전문자격</span>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Award className="w-6 h-6 mr-3 text-yellow-300" />
                    <div>
                      <span className="font-bold block text-white">기업·기술가치평가사</span>
                      <span className="text-blue-100 text-sm">가치평가 전문자격</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* 현재 주요 역할 */}
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-600 to-teal-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-white">
                  <Rocket className="w-8 h-8 mr-3 text-yellow-300" />
                  현재 주요 역할
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { role: 'AI CAMP CEO', desc: 'AI 교육 및 컨설팅 대표' },
                    { role: 'ISP 컨설팅 전문가', desc: '정부기관 정보화전략계획 수립' },
                    { role: 'ODA 프로젝트 총괄', desc: '요르단 치안정보통합관리시스템 구축' },
                    { role: 'AI 데이터 평가위원', desc: 'AI학습용 데이터구축사업 평가' },
                    { role: '데이터가치평가 컨설턴트', desc: '중소벤처기업진흥공단 프로젝트' },
                    { role: '교육전문가', desc: '여주대학교 창업과경영 출강' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                      <CheckCircle className="w-5 h-5 mr-3 text-yellow-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white block">{item.role}</span>
                        <span className="text-green-100 text-sm">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* CEO 주요 성과 */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">주요 성과 하이라이트</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { metric: "5개", label: "정부기관 ISP", desc: "창업진흥원, 연구재단 등", color: "blue" },
                { metric: "ODA", label: "해외 프로젝트", desc: "요르단 치안정보시스템", color: "green" },
                { metric: "AI평가", label: "데이터구축사업", desc: "정부 평가위원 참여", color: "purple" },
                { metric: "4개", label: "전문 자격증", desc: "박사, CMC, 빅데이터 등", color: "orange" }
              ].map((item, index) => (
                <Card key={index} className={`shadow-xl border-0 transform hover:scale-105 transition-all duration-200 ${
                  item.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                  item.color === 'green' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                  item.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                  'bg-gradient-to-br from-orange-500 to-orange-600'
                } text-white`}>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold mb-2">{item.metric}</div>
                    <div className="text-lg font-semibold mb-1">{item.label}</div>
                    <div className="text-sm opacity-90">{item.desc}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 홍용기 대표이사 상세 프로필 섹션 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">홍용기 대표이사 상세 프로필</h2>
            <p className="text-xl text-gray-600">컨설팅학 박사 · 국제공인컨설턴트 CMC</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 기본 정보 카드 */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-gray-900">
                  <User className="w-6 h-6 mr-3 text-blue-600" />
                  CEO 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center">
                    <span className="font-semibold w-24 text-gray-700">성명</span>
                    <span className="text-gray-900 font-medium">홍용기 대표이사</span>
                  </div>

                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-2 text-yellow-600" />
                    <span className="font-semibold w-24 text-gray-700">학력</span>
                    <span className="text-gray-900 font-medium">컨설팅학 박사</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-purple-600" />
                    <span className="font-semibold w-24 text-gray-700">자격</span>
                    <span className="text-gray-900 font-medium">CMC / 빅데이터분석기사 / 기업가치평가사</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* 현재 주요 직책 */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-gray-900">
                  <Building className="w-6 h-6 mr-3 text-green-600" />
                  현재 주요 직책
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    'AI CAMP 대표이사',
                    '여주대학교 창업과경영 출강',
                    'ISP 컨설팅 전문가',
                    'ODA 프로젝트 총괄',
                    'AI 데이터구축사업 평가위원',
                    '데이터가치평가 컨설턴트'
                  ].map((position, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" />
                      <span className="text-gray-900 font-medium">{position}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 핵심 서비스 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">전문 컨설팅 서비스</h2>
            <p className="text-xl text-gray-600">6대 핵심서비스 모든영역 - 종합 솔루션 제공</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "BM ZEN 사업분석",
                description: "5단계 프레임워크 기반 전략적 매출증대",
                color: "blue",
                link: "/services/business-analysis"
              },
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: "AI 생산성향상",
                description: "ChatGPT 활용 업무효율 40-60% 향상",
                color: "purple",
                link: "/services/ai-productivity"
              },
              {
                icon: <Factory className="w-8 h-8" />,
                title: "공장/부동산 경매",
                description: "경매활용 구매전략으로 30-50% 비용절감",
                color: "orange",
                link: "/services/factory-auction"
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "기술창업 지원",
                description: "사업화 및 정부지원으로 평균 5억원 확보",
                color: "green",
                link: "/services/tech-startup"
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "인증지원 전문",
                description: "ISO/벤처/연구소 인증으로 연간 5천만원 세제혜택",
                color: "red",
                link: "/services/certification"
              },
              {
                icon: <Building className="w-8 h-8" />,
                title: "웹사이트 구축",
                description: "SEO 최적화로 매출 300-500% 증대",
                color: "cyan",
                link: "/services/website"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "전략적 인사관리",
                description: "조직진단부터 인사제도 구축까지",
                color: "indigo",
                link: "/consultation"
              },
              {
                icon: <DollarSign className="w-8 h-8" />,
                title: "재무/원가관리",
                description: "ABC 원가계산 기반 정밀 분석",
                color: "yellow",
                link: "/consultation"
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: "노무관리 전문",
                description: "근로기준법 준수 및 노사관계",
                color: "pink",
                link: "/consultation"
              }
            ].map((service, index) => (
              <Link key={index} href={service.link} className="block">
                <Card className="shadow-lg hover:shadow-xl transition-all duration-200 border-0 cursor-pointer transform hover:scale-[1.05] active:scale-[0.95] relative overflow-hidden group">
                  <span className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  <CardHeader className="relative z-10">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform duration-200">
                      {service.icon}
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors duration-200">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-gray-600 group-hover:text-gray-700 transition-colors duration-200">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 경력 타임라인 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">이후경 교장의 주요경력 타임라인</h2>
            <p className="text-xl text-gray-600">28년간의 전문성 축적 과정</p>
          </div>
          
          <div className="relative">
            {/* 타임라인 선 */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-2 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            
            <div className="space-y-16">
              {/* 2014년~현재 */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8">
                  <Card className="inline-block max-w-md shadow-xl border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                      <CardTitle className="text-lg font-bold">2014년~현재 (10년)</CardTitle>
                      <CardDescription className="text-blue-100 font-semibold">경영지도사 / 전문 컨설턴트</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-4">
                      <ul className="space-y-2 text-sm text-gray-800">
                        <li className="font-semibold">• AI CAMP 교장</li>
                        <li className="font-semibold">• 아이엔제이컨설팅 책임컨설턴트</li>
                        <li className="font-semibold">• 고용노동부 일터혁신 수행기관 컨설턴트</li>
                        <li className="font-semibold">• 200개사 이상 조직/인사 컨설팅 수행</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="flex-1 pl-8"></div>
              </div>
              
              {/* 2010년~2014년 */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="flex-1 pl-8">
                  <Card className="inline-block max-w-md shadow-xl border-0 bg-gradient-to-br from-green-50 to-green-100">
                    <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                      <CardTitle className="text-lg font-bold">2010년~2014년</CardTitle>
                      <CardDescription className="text-green-100 font-semibold">엠오티랩 대표 컨설턴트</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-4">
                      <ul className="space-y-2 text-sm text-gray-800">
                        <li className="font-semibold">• 공장생산관리</li>
                        <li className="font-semibold">• 재무관리</li>
                        <li className="font-semibold">• ABC원가관리</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* 2000년~2010년 */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8">
                  <Card className="inline-block max-w-md shadow-xl border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                    <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                      <CardTitle className="text-lg font-bold">2000년부터 2010년까지</CardTitle>
                      <CardDescription className="text-purple-100 font-semibold">영업조직 관리</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-4">
                      <ul className="space-y-2 text-sm text-gray-800">
                        <li className="font-semibold">• 지점장 역임</li>
                        <li className="font-semibold">• 영업조직 관리 및 성과관리 경험</li>
                        <li className="font-semibold">• 팀 리더십 및 조직운영 노하우 축적</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-purple-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="flex-1 pl-8"></div>
              </div>
              
              {/* 1993년~2000년 */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-orange-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="flex-1 pl-8">
                  <Card className="inline-block max-w-md shadow-xl border-0 bg-gradient-to-br from-orange-50 to-orange-100">
                    <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-700 text-white">
                      <CardTitle className="text-lg font-bold">1993년~2000년 (8년)</CardTitle>
                      <CardDescription className="text-orange-100 font-semibold">현대그룹 고려산업개발</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-4">
                      <ul className="space-y-2 text-sm text-gray-800">
                        <li className="font-semibold">• 인사노무담당 실무진</li>
                        <li className="font-semibold">• 대기업 인사제도 설계 및 운영 경험</li>
                        <li className="font-semibold">• 조직관리 및 노무관리 전문성 구축</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* n8n 책자 홍보 섹션 */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full shadow-lg mb-8">
              <Sparkles className="w-5 h-5 mr-2" />
              <span className="text-lg">🔥 신간 출간! 국내최초</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                AI 자동화의 끝판왕!
              </span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-blue-100 font-semibold mb-8">
              n8n을 활용한 업무혁신
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 좌측: 책자 소개 */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">📚 저자 소개</h3>
                
                                 <div className="space-y-4">
                   <div className="p-4 bg-white/5 rounded-xl border border-yellow-300/20">
                     <div className="flex items-center space-x-4 mb-3">
                       <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                         <Crown className="w-6 h-6 text-gray-900" />
                       </div>
                       <div>
                         <div className="font-bold text-yellow-300 text-lg">홍용기 대표이사</div>
                         <div className="text-sm text-blue-200">AI CAMP CEO · 컨설팅 3관왕</div>
                       </div>
                     </div>
                     <div className="text-xs text-gray-300 leading-relaxed">
                       경영지도사이자 국제공인컨설턴트 CMC 겸 컨설팅학 박사로 컨설팅 3관왕. 
                       AI와 데이터 분석에 관한 강의와 저술 활동을 왕성히 하며, 
                       AI를 활용하여 중소기업과 소상공인의 업무를 자동화하는데 깊은 관심을 가지고 있음.
                     </div>
                   </div>
                   
                   <div className="p-4 bg-white/5 rounded-xl border border-blue-300/20">
                     <div className="flex items-center space-x-4 mb-3">
                       <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                         <User className="w-6 h-6 text-white" />
                       </div>
                       <div>
                         <div className="font-bold text-yellow-300 text-lg">이후경 교장</div>
                         <div className="text-sm text-blue-200">AI CAMP 교장 겸 CTO · 경영지도사</div>
                       </div>
                     </div>
                     <div className="text-xs text-gray-300 leading-relaxed">
                       AI CAMP 교육 프로그램을 주관하는 책임자로서, AI를 실무에 활용하는 것에 대한 깊은 지식을 보유한 전문가. 
                       전략 및 마케팅과 인사노무에 관한 오랜 실무 경험과 교육자로서의 통찰을 가지고 있음.
                     </div>
                   </div>
                   
                   <div className="p-4 bg-white/5 rounded-xl border border-green-300/20">
                     <div className="flex items-center space-x-4 mb-3">
                       <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center">
                         <Award className="w-6 h-6 text-white" />
                       </div>
                       <div>
                         <div className="font-bold text-yellow-300 text-lg">홍정민 컨설턴트</div>
                         <div className="text-sm text-blue-200">국민대 박사과정 · CMC · NICE평가정보</div>
                       </div>
                     </div>
                     <div className="text-xs text-gray-300 leading-relaxed">
                       국내 굴지의 기업 NICE평가정보에 재직하면서 국민대학교 비즈니스IT전문대학원 박사과정을 밟고 있음. 
                       국제공인컨설턴트 CMC로서 AI와 비즈니스를 융합하여 업무의 효율성을 높이는데 많은 관심을 가지고 있음.
                     </div>
                   </div>
                 </div>
              </div>
              
                             <div className="text-center">
                 <p className="text-lg text-blue-100 mb-6 leading-relaxed">
                   <strong className="text-yellow-300">"AI로 일하는 즐거움을 되찾아드린다"</strong>는 AI CAMP의 비전 아래, 
                   더 많은 기업이 자동화의 혜택을 누릴 수 있도록 돕고자 하는 마음으로 집필된 
                   <strong className="text-green-200">국내 최초 n8n 한글판 가이드북</strong>입니다.
                   반복적인 작업에서 해방되어 더 창조적이고 의미 있는 일에 집중할 수 있는 계기가 되기를 바랍니다.
                 </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="https://bookk.co.kr/bookStore/687ca81fda03645ce0aa85e0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <span className="mr-2">📖</span>
                    지금 바로 구매하기
                  </a>
                  
                  <Link 
                    href="/services/ai-productivity"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-full transition-all duration-200 transform hover:scale-105 hover:bg-white hover:text-gray-900"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    AI 업무혁신 상담
                  </Link>
                </div>
              </div>
            </div>
            
            {/* 우측: 책자 특징 */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">⚡ 이 책의 핵심 특징</h3>
                
                                 <div className="space-y-4">
                   {[
                     { icon: Target, title: "Part I: AI 자동화, 왜 n8n인가?", desc: "반복 업무 해방과 n8n 핵심 개념 이해" },
                     { icon: Zap, title: "Part II: n8n 사용법 완전 정복", desc: "캔버스 활용부터 데이터 처리까지 체계적 학습" },
                     { icon: Cpu, title: "Part III: 실전 AI 자동화 시나리오", desc: "Template 활용과 초간단 AI Agent 구축" },
                     { icon: CheckCircle, title: "Part IV: 안정적 자동화 시스템", desc: "클라우드 vs 자체 호스팅, 모니터링 및 에러 처리" }
                   ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl">
                      <feature.icon className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-white text-lg">{feature.title}</h4>
                        <p className="text-blue-200">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-300/30">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300 mb-2">🏆 국내최초 한국어판</div>
                  <div className="text-lg text-white font-semibold mb-4">
                    세계적 워크플로우 자동화 플랫폼 n8n
                  </div>
                  <div className="text-sm text-blue-200">
                    업무 효율성을 획기적으로 향상시키는<br />
                    AI 자동화 솔루션의 완전 정복 가이드
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 상담 신청 CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">28년 경험의 전문가와 상담하세요</h2>
          <p className="text-xl mb-8 text-blue-100">
            정부지원 프로그램을 활용한 무료 컨설팅 기회를 놓치지 마세요
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link href="/diagnosis" className="block">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-200 cursor-pointer transform hover:scale-[1.05] active:scale-[0.95] relative overflow-hidden group">
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                <CardContent className="p-6 text-center relative z-10">
                  <Target className="w-8 h-8 mx-auto mb-3 text-yellow-300 group-hover:scale-110 transition-transform duration-200" />
                  <h3 className="font-semibold mb-2">무료진단</h3>
                  <p className="text-blue-100 text-sm mb-3">AI 기반 정밀 진단</p>
                  <p className="text-xs text-blue-200">24시간 접수</p>
                </CardContent>
              </Card>
            </Link>
            

            
            <Link href="/consultation" className="block">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-200 cursor-pointer transform hover:scale-[1.05] active:scale-[0.95] relative overflow-hidden group">
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                <CardContent className="p-6 text-center relative z-10">
                  <MessageCircle className="w-8 h-8 mx-auto mb-3 text-yellow-300 group-hover:scale-110 transition-transform duration-200" />
                  <h3 className="font-semibold mb-2">현장 방문</h3>
                  <p className="text-blue-100 text-sm mb-3">무료 진단</p>
                  <p className="text-xs text-blue-200">정밀 현황 분석</p>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/diagnosis"
              className="inline-flex items-center justify-center bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 text-lg rounded-md transition-all duration-200 transform hover:scale-[1.05] active:scale-[0.95] shadow-lg hover:shadow-xl relative overflow-hidden group h-14"
            >
              <span className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
              <span className="relative flex items-center">
                <Target className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-200" />
                무료진단 신청
              </span>
            </Link>
            
            <Link 
              href="/consultation"
              className="inline-flex items-center justify-center border border-white text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg rounded-md transition-all duration-200 transform hover:scale-[1.05] active:scale-[0.95] hover:shadow-lg relative overflow-hidden group h-14"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
              <span className="relative flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 group-hover:animate-pulse transition-transform duration-200" />
                1:1 상담 신청
              </span>
            </Link>
          </div>
          
          <div className="mt-8 text-center">
            <Alert className="bg-white/10 border-white/20 text-white max-w-md mx-auto">
              <Lightbulb className="h-4 w-4 text-yellow-300" />
              <AlertDescription>
                <strong>선착순 혜택</strong> (월 10개사 한정)<br />
                현장 진단비 면제 + 프로젝트 10% 할인
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>
    </div>
  );
} 