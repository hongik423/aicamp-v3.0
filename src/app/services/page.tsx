'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  BarChart3, 
  Award, 
  Stethoscope, 
  TrendingUp, 
  Globe,
  Rocket,
  Building2,
  ChevronRight,
  Star
} from 'lucide-react';

interface ServiceProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  badge?: string;
  features: string[];
}

const ServiceCard = ({ title, description, icon, href, badge, features }: ServiceProps) => (
  <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
    <CardHeader>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
          {icon}
        </div>
        {badge && <Badge variant="secondary">{badge}</Badge>}
      </div>
      <CardTitle className="text-lg">{title}</CardTitle>
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2 mb-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            {feature}
          </li>
        ))}
      </ul>
      <Link href={href}>
        <Button className="w-full group-hover:bg-blue-600 transition-colors">
          자세히 보기
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </CardContent>
  </Card>
);

export default async function ServicesPage() {
  const services: ServiceProps[] = [
    {
      title: 'AI 역량진단',
      description: 'GEMINI 2.5 Flash Model로 기업 AI 활용도를 정밀 진단하세요',
      icon: <Brain className="h-6 w-6 text-blue-600" />,
      href: '/ai-diagnosis',
      badge: 'GEMINI 2.5',
      features: [
        'GEMINI 2.5 Flash AI 분석',
        'AI 활용도 정밀 진단',
        '실시간 맞춤형 보고서',
        '이메일 자동 발송'
      ]
    },
    {
      title: '경영컨설팅',
      description: '전문 경영지도사의 1:1 맞춤형 경영 컨설팅 서비스',
      icon: <BarChart3 className="h-6 w-6 text-green-600" />,
      href: '/services/business-analysis',
      features: [
        '경영 현황 분석',
        '성장 전략 수립',
        '실행 계획 제공',
        '정기 모니터링'
      ]
    },
    {
      title: '인증 컨설팅',
      description: 'ISO, 품질경영시스템 등 각종 인증 취득 지원',
      icon: <Award className="h-6 w-6 text-purple-600" />,
      href: '/services/certification',
      features: [
        'ISO 인증 지원',
        '품질경영시스템',
        '환경경영시스템',
        '안전보건경영시스템'
      ]
    },
    {
      title: 'AI 생산성 향상',
      description: 'AI 도구 도입으로 업무 효율성을 극대화하세요',
      icon: <Rocket className="h-6 w-6 text-orange-600" />,
      href: '/services/ai-productivity',
      badge: '신규',
      features: [
        'AI 도구 분석',
        '업무 자동화',
        '생산성 측정',
        '투자효과 분석'
      ]
    },
    {
      title: '정책자금 컨설팅',
      description: '정부 지원사업 및 정책자금 신청을 도와드립니다',
      icon: <Building2 className="h-6 w-6 text-red-600" />,
      href: '/services/policy-funding',
      features: [
        '정책자금 매칭',
        '사업계획서 작성',
        '신청서 검토',
        '사후관리 지원'
      ]
    },
    {
      title: '기술창업 지원',
      description: '기술기반 창업부터 성장까지 전 과정을 지원합니다',
      icon: <TrendingUp className="h-6 w-6 text-indigo-600" />,
      href: '/services/tech-startup',
      features: [
        '창업 아이템 검증',
        '사업모델 수립',
        '투자 유치 지원',
        '네트워킹 제공'
      ]
    },
    {
      title: '웹사이트 제작',
      description: '효과적인 온라인 마케팅을 위한 웹사이트 구축',
      icon: <Globe className="h-6 w-6 text-cyan-600" />,
      href: '/services/website',
      features: [
        '반응형 웹사이트',
        'SEO 최적화',
        '유지보수 서비스',
        '성과 분석'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Stethoscope className="h-4 w-4" />
            AICAMP 서비스
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            비즈니스 성장을 위한
            <br />
            전문 컨설팅 서비스
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI 기반 진단부터 전문가 컨설팅까지, 
            <br />
            귀하의 비즈니스 성장을 위한 맞춤형 솔루션을 제공합니다.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            🤖 GEMINI 2.5 Flash AI 역량진단으로 시작하세요!
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            최신 GEMINI 2.5 Flash Model로 기업의 AI 활용도를 정밀 분석하고, 
            맞춤형 AI 도입 전략을 제공받으세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ai-diagnosis">
              <Button size="lg" variant="secondary" className="text-blue-600 hover:text-blue-700">
                <Brain className="mr-2 h-5 w-5" />
                GEMINI AI 진단 시작
              </Button>
            </Link>
            <Link href="/consultation">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                <BarChart3 className="mr-2 h-5 w-5" />
                전문가 상담신청
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 