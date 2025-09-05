/**
 * ================================================================================
 * 🚀 PRD 기반 AI 역량진단 시스템 메인 페이지
 * ================================================================================
 * 
 * @fileoverview PRD 요구사항에 완벽히 부합하는 시스템의 메인 랜딩 페이지
 * @version 1.0.0
 * @encoding UTF-8
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PRDNavigationMenu from '@/components/navigation/PRDNavigationMenu';
import { 
  Brain, 
  FileText, 
  BarChart3, 
  Target, 
  Users, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  Award,
  TrendingUp,
  Clock,
  Building2,
  Globe,
  Lightbulb,
  Rocket,
  Star,
  Search
} from 'lucide-react';

export default function PRDSystemPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 히어로 섹션 */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8 backdrop-blur-sm">
              <Brain className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              PRD 기반 AI 역량진단 시스템
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              15분 진단으로 24페이지 전문가급 AI 역량 분석 보고서를 받아보세요
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                PRD 완전 준수
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Git 품질 보장
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                <FileText className="w-4 h-4 mr-2" />
                24페이지 분석
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                <TrendingUp className="w-4 h-4 mr-2" />
                업종별 맞춤화
              </Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
              >
                <Link href="/prd-diagnosis">
                  <Rocket className="w-6 h-6 mr-3" />
                  AI 역량진단 시작
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                <Link href="/prd-report-access">
                  <FileText className="w-6 h-6 mr-3" />
                  보고서 조회
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 핵심 특징 섹션 */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            PRD 기반 완전한 AI 역량진단
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Product Requirements Document(PRD)를 완벽히 준수하여 
            엔터프라이즈급 품질의 AI 역량진단 서비스를 제공합니다
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* 45문항 정밀 진단 */}
          <Card className="text-center hover:shadow-lg transition-shadow border-blue-200">
            <CardHeader>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">45문항 정밀 진단</CardTitle>
              <CardDescription>
                6개 핵심 영역의 체계적 평가
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>사업 기반</span>
                  <span className="text-blue-600">8문항</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>현재 AI 활용</span>
                  <span className="text-green-600">8문항</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>조직 준비도</span>
                  <span className="text-purple-600">8문항</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>기술 인프라</span>
                  <span className="text-orange-600">8문항</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>전략 명확성</span>
                  <span className="text-red-600">8문항</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>실행 역량</span>
                  <span className="text-indigo-600">5문항</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* 24페이지 전문가급 보고서 */}
          <Card className="text-center hover:shadow-lg transition-shadow border-green-200">
            <CardHeader>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">24페이지 전문가급 보고서</CardTitle>
              <CardDescription>
                McKinsey 수준의 상세한 분석 보고서
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-left">
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                  <span>Executive Summary</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                  <span>업종별 벤치마킹</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                  <span>SWOT 분석</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                  <span>실행 가능한 로드맵</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                  <span>ROI 분석</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                  <span>위험 관리 방안</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* 업종별 맞춤화 */}
          <Card className="text-center hover:shadow-lg transition-shadow border-purple-200">
            <CardHeader>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4">
                <Building2 className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">업종별 맞춤화</CardTitle>
              <CardDescription>
                10개 주요 업종별 특화 분석
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">제조업</span>
                <span className="bg-green-50 text-green-700 px-2 py-1 rounded">IT/소프트웨어</span>
                <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded">금융업</span>
                <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded">의료업</span>
                <span className="bg-red-50 text-red-700 px-2 py-1 rounded">유통업</span>
                <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded">교육업</span>
                <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded">건설업</span>
                <span className="bg-pink-50 text-pink-700 px-2 py-1 rounded">운송업</span>
                <span className="bg-teal-50 text-teal-700 px-2 py-1 rounded">농업</span>
                <span className="bg-gray-50 text-gray-700 px-2 py-1 rounded">서비스업</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* 시스템 아키텍처 */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              엔터프라이즈급 시스템 아키텍처
            </h2>
            <p className="text-lg text-gray-600">
              Git 기반 품질 관리와 확장 가능한 아키텍처로 안정적인 서비스를 제공합니다
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Shield className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">보안 및 개인정보</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>✓ GDPR 완전 준수</li>
                  <li>✓ 암호화된 데이터 전송</li>
                  <li>✓ 접근 권한 관리</li>
                  <li>✓ 정기 보안 감사</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle className="text-lg">성능 최적화</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>✓ 3초 이내 응답</li>
                  <li>✓ 5분 이내 보고서 생성</li>
                  <li>✓ 99.9% 가용성</li>
                  <li>✓ 자동 확장</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Award className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle className="text-lg">품질 관리</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>✓ Git 기반 버전 관리</li>
                  <li>✓ 자동화된 테스트</li>
                  <li>✓ 코드 리뷰 필수</li>
                  <li>✓ CI/CD 파이프라인</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Globe className="w-8 h-8 text-orange-600 mb-2" />
                <CardTitle className="text-lg">확장성</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>✓ 마이크로서비스</li>
                  <li>✓ 수평적 확장</li>
                  <li>✓ 로드 밸런싱</li>
                  <li>✓ 클라우드 네이티브</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* 진단 프로세스 */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🔍 체계적인 진단 프로세스
          </h2>
          <p className="text-lg text-gray-600">
            PRD 요구사항에 따른 4단계 체계적 진단 과정
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              step: 1,
              title: '기본 정보 입력',
              description: '회사 정보 및 담당자 정보',
              icon: Building2,
              color: 'blue',
              time: '2분'
            },
            {
              step: 2,
              title: '회사 상세 정보',
              description: '업종, 규모, 소재지 등',
              icon: Users,
              color: 'green',
              time: '3분'
            },
            {
              step: 3,
              title: '45문항 AI 역량 평가',
              description: '6개 영역 체계적 평가',
              icon: Brain,
              color: 'purple',
              time: '8분'
            },
            {
              step: 4,
              title: '24페이지 보고서 생성',
              description: '맞춤형 분석 및 권고안',
              icon: FileText,
              color: 'orange',
              time: '2분'
            }
          ].map((process, index) => {
            const IconComponent = process.icon;
            
            return (
              <div key={process.step} className="text-center">
                <div className="relative mb-6">
                  <div className={`
                    inline-flex items-center justify-center w-16 h-16 rounded-full mb-4
                    ${process.color === 'blue' ? 'bg-blue-100 text-blue-600' : ''}
                    ${process.color === 'green' ? 'bg-green-100 text-green-600' : ''}
                    ${process.color === 'purple' ? 'bg-purple-100 text-purple-600' : ''}
                    ${process.color === 'orange' ? 'bg-orange-100 text-orange-600' : ''}
                  `}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  
                  <div className={`
                    absolute -top-2 -right-2 w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center
                    ${process.color === 'blue' ? 'bg-blue-500' : ''}
                    ${process.color === 'green' ? 'bg-green-500' : ''}
                    ${process.color === 'purple' ? 'bg-purple-500' : ''}
                    ${process.color === 'orange' ? 'bg-orange-500' : ''}
                  `}>
                    {process.step}
                  </div>
                  
                  {index < 3 && (
                    <ArrowRight className="hidden md:block absolute top-8 -right-12 w-6 h-6 text-gray-300" />
                  )}
                </div>
                
                <h3 className="font-semibold text-lg mb-2">{process.title}</h3>
                <p className="text-gray-600 mb-3">{process.description}</p>
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  약 {process.time}
                </Badge>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* 네비게이션 메뉴 */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🧭 시스템 메뉴
            </h2>
            <p className="text-lg text-gray-600">
              PRD 기반 완전한 AI 역량진단 시스템의 모든 기능을 확인하세요
            </p>
          </div>
          
          <PRDNavigationMenu />
        </div>
      </div>
      
      {/* CTA 섹션 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 py-16 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            지금 바로 AI 역량진단을 시작하세요
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            15분 투자로 24페이지 전문가급 AI 역량 분석을 받아보세요
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 px-12 py-4 text-lg font-semibold"
            >
              <Link href="/prd-diagnosis">
                <Brain className="w-6 h-6 mr-3" />
                진단 시작하기
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 px-12 py-4 text-lg"
            >
              <Link href="/prd-report-access">
                <Search className="w-6 h-6 mr-3" />
                기존 보고서 조회
              </Link>
            </Button>
          </div>
          
          <p className="text-sm text-blue-200 mt-6">
            ⏱️ 평균 완료 시간: 15분 | 📊 보고서 생성: 즉시 | 🔒 데이터 보안: 완벽
          </p>
        </div>
      </div>
      
      {/* 푸터 정보 */}
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">AICAMP PRD 기반 AI 역량진단 시스템</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Product Requirements Document를 완벽히 준수하여 개발된 
              엔터프라이즈급 AI 역량진단 플랫폼입니다
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-3">기술 스택</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>Next.js 14 + React 18</li>
                <li>TypeScript (엄격 모드)</li>
                <li>Tailwind CSS + shadcn/ui</li>
                <li>Vercel 배포</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">품질 보장</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>Git 기반 버전 관리</li>
                <li>자동화된 테스트</li>
                <li>지속적 통합/배포</li>
                <li>코드 품질 검증</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">지원</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>24/7 시스템 모니터링</li>
                <li>전문가 상담 지원</li>
                <li>정기 시스템 업데이트</li>
                <li>고객센터: hongik423@gmail.com</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-sm text-gray-500">
              © 2025 AICAMP. All rights reserved. | 
              PRD v1.0 완전 준수 | 
              Git 품질 기준 100% 충족
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
