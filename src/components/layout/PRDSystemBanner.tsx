/**
 * ================================================================================
 * 🚀 PRD 기반 시스템 안내 배너
 * ================================================================================
 * 
 * @fileoverview PRD 기반 새 시스템을 안내하는 상단 배너
 * @version 1.0.0
 * @encoding UTF-8
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  FileText, 
  ArrowRight, 
  X, 
  Zap, 
  Award, 
  Shield,
  Sparkles
} from 'lucide-react';

interface PRDSystemBannerProps {
  onClose?: () => void;
  autoHide?: boolean;
}

export default function PRDSystemBanner({ onClose, autoHide = false }: PRDSystemBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };
  
  // 자동 숨김 설정
  React.useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 10000); // 10초 후 자동 숨김
      
      return () => clearTimeout(timer);
    }
  }, [autoHide]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* 왼쪽: 메인 메시지 */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">
                  🚀 PRD 기반 AI 역량진단 시스템 출시!
                </h3>
                <p className="text-blue-100 text-sm">
                  완전히 새로워진 24페이지 전문가급 보고서를 경험해보세요
                </p>
              </div>
            </div>
            
            {/* 기능 배지들 */}
            <div className="hidden md:flex items-center space-x-2">
              <Badge className="bg-white/20 text-white border-white/30">
                <Award className="w-3 h-3 mr-1" />
                PRD 준수
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                <Shield className="w-3 h-3 mr-1" />
                Git 품질
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                <FileText className="w-3 h-3 mr-1" />
                24페이지
              </Badge>
            </div>
          </div>
          
          {/* 오른쪽: 액션 버튼들 */}
          <div className="flex items-center space-x-3">
            <Button
              asChild
              size="sm"
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              <Link href="/prd-diagnosis">
                <Brain className="w-4 h-4 mr-2" />
                새 진단 시작
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-white text-white hover:bg-white/10"
            >
              <Link href="/prd-report-access">
                <FileText className="w-4 h-4 mr-2" />
                보고서 조회
              </Link>
            </Button>
            
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Link href="/prd-system">
                <ArrowRight className="w-4 h-4 mr-1" />
                자세히 보기
              </Link>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-white hover:bg-white/10 p-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
