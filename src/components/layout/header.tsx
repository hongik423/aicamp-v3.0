'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  Zap, 
  Brain, 
  Users, 
  FileText, 
  Calculator,
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { getImagePath } from '@/lib/utils';

// Service Worker 오류 방지를 위한 안전한 등록
const registerServiceWorker = async () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('AICAMP Service Worker registered:', registration.scope);
    } catch (error) {
      console.warn('Service Worker registration failed:', error);
    }
  }
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Service Worker 등록
    registerServiceWorker();

    // 스크롤 이벤트 리스너
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { href: '/', label: '홈', icon: null },
    { href: '/services', label: '서비스', icon: null },
    { href: '/diagnosis', label: 'AI역량진단', icon: Zap, isSpecial: true, badge: '무료' },
    { href: '/consultation', label: '상담신청', icon: MessageSquare },
    { href: '/tax-calculator', label: '세금계산기', icon: Calculator },
    { href: '/about', label: '소개', icon: Users },
    { href: '/cases', label: '사례', icon: FileText }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AICAMP</span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    item.isSpecial
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    item.isSpecial
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}