/**
 * ================================================================================
 * 🧭 PRD 기반 네비게이션 메뉴
 * ================================================================================
 * 
 * @fileoverview PRD 기반 AI 역량진단 시스템 전용 네비게이션
 * @version 1.0.0
 * @encoding UTF-8
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  FileText, 
  Search, 
  BarChart3, 
  Settings, 
  HelpCircle,
  Home,
  Users,
  Target,
  TrendingUp,
  Shield,
  Award,
  Zap
} from 'lucide-react';

interface NavigationItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  isNew?: boolean;
  category: 'main' | 'tools' | 'support';
}

export default function PRDNavigationMenu() {
  const pathname = usePathname();
  
  // PRD 기반 네비게이션 아이템 정의
  const navigationItems: NavigationItem[] = [
    // 메인 기능
    {
      id: 'home',
      title: '홈',
      description: 'AICAMP 메인 페이지',
      href: '/',
      icon: Home,
      category: 'main'
    },
    {
      id: 'prd-diagnosis',
      title: 'PRD 기반 AI 역량진단',
      description: '완전한 24페이지 보고서 생성',
      href: '/prd-diagnosis',
      icon: Brain,
      badge: 'NEW',
      isNew: true,
      category: 'main'
    },
    {
      id: 'legacy-diagnosis',
      title: '기존 AI 역량진단',
      description: '기존 시스템 (호환성 유지)',
      href: '/ai-diagnosis',
      icon: Target,
      category: 'main'
    },
    
    // 도구 및 조회
    {
      id: 'prd-report-access',
      title: 'PRD 보고서 조회',
      description: '진단ID로 24페이지 보고서 조회',
      href: '/prd-report-access',
      icon: FileText,
      badge: 'PRD',
      isNew: true,
      category: 'tools'
    },
    {
      id: 'legacy-report-access',
      title: '기존 보고서 조회',
      description: '기존 시스템 보고서 조회',
      href: '/report-access',
      icon: Search,
      category: 'tools'
    },
    {
      id: 'admin-dashboard',
      title: '관리자 대시보드',
      description: '시스템 관리 및 통계',
      href: '/admin/diagnosis-reports',
      icon: BarChart3,
      category: 'tools'
    },
    
    // 지원 및 도움
    {
      id: 'consultation',
      title: '전문가 상담',
      description: 'AICAMP 전문가와 1:1 상담',
      href: '/consultation',
      icon: Users,
      category: 'support'
    },
    {
      id: 'help',
      title: '도움말',
      description: '사용 가이드 및 FAQ',
      href: '/help',
      icon: HelpCircle,
      category: 'support'
    }
  ];
  
  /**
   * 활성 상태 확인
   */
  const isActive = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };
  
  /**
   * 카테고리별 아이템 필터링
   */
  const getItemsByCategory = (category: 'main' | 'tools' | 'support') => {
    return navigationItems.filter(item => item.category === category);
  };
  
  /**
   * 네비게이션 아이템 렌더링
   */
  const renderNavigationItem = (item: NavigationItem) => {
    const IconComponent = item.icon;
    const active = isActive(item.href);
    
    return (
      <Link key={item.id} href={item.href}>
        <Card className={`
          cursor-pointer transition-all duration-200 hover:shadow-md
          ${active ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}
          ${item.isNew ? 'border-green-200 bg-green-50' : ''}
        `}>
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className={`
                p-2 rounded-lg
                ${active ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}
                ${item.isNew ? 'bg-green-500 text-white' : ''}
              `}>
                <IconComponent className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className={`
                    font-semibold text-sm
                    ${active ? 'text-blue-900' : 'text-gray-900'}
                  `}>
                    {item.title}
                  </h3>
                  
                  {item.badge && (
                    <Badge 
                      variant={item.isNew ? 'default' : 'secondary'}
                      className="text-xs px-2 py-0"
                    >
                      {item.badge}
                    </Badge>
                  )}
                  
                  {item.isNew && (
                    <Zap className="w-3 h-3 text-green-500" />
                  )}
                </div>
                
                <p className={`
                  text-xs leading-relaxed
                  ${active ? 'text-blue-700' : 'text-gray-600'}
                `}>
                  {item.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AICAMP AI 역량진단 시스템
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          PRD 기반 완전한 AI 역량 분석 플랫폼
        </p>
        
        <div className="flex justify-center space-x-2 mb-6">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Award className="w-3 h-3 mr-1" />
            PRD 완전 준수
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Shield className="w-3 h-3 mr-1" />
            Git 품질 보장
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <TrendingUp className="w-3 h-3 mr-1" />
            24페이지 분석
          </Badge>
        </div>
      </div>
      
      {/* 메인 기능 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Brain className="w-5 h-5 mr-2 text-blue-600" />
          핵심 기능
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getItemsByCategory('main').map(renderNavigationItem)}
        </div>
      </div>
      
      {/* 도구 및 조회 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-purple-600" />
          도구 및 조회
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getItemsByCategory('tools').map(renderNavigationItem)}
        </div>
      </div>
      
      {/* 지원 및 도움 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <HelpCircle className="w-5 h-5 mr-2 text-green-600" />
          지원 및 도움
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getItemsByCategory('support').map(renderNavigationItem)}
        </div>
      </div>
      
      {/* 시스템 정보 */}
      <Card className="border-gray-200 bg-gray-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="font-semibold text-gray-800 mb-4">
              🛠️ PRD 기반 시스템 사양
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-700">프론트엔드</p>
                <p className="text-gray-600">Next.js 14 + React 18</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">타입 시스템</p>
                <p className="text-gray-600">TypeScript (엄격 모드)</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">스타일링</p>
                <p className="text-gray-600">Tailwind CSS + shadcn/ui</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">품질 관리</p>
                <p className="text-gray-600">Git 기반 CI/CD</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 빠른 액션 버튼 */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex flex-col space-y-2">
          <Button
            asChild
            size="lg"
            className="rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
          >
            <Link href="/prd-diagnosis">
              <Brain className="w-5 h-5 mr-2" />
              진단 시작
            </Link>
          </Button>
          
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full shadow-lg bg-white"
          >
            <Link href="/prd-report-access">
              <Search className="w-4 h-4 mr-1" />
              보고서 조회
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
