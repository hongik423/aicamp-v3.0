'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  Zap, 
  Sparkles, 
  Star, 
  ArrowRight,
  Clock,
  Users,
  Award,
  Workflow,
  Bot,
  Rocket,
  CheckCircle,
  Play,
  BookOpen,
  MessageCircle,
  Home
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import PDFViewer from '@/components/ui/PDFViewer';

// 파티클 컴포넌트 - n8n 테마
const N8nParticle: React.FC<{ delay: number; index: number; reduceMotion: boolean }> = ({ delay, index, reduceMotion }) => {
  const xOffset = (index % 6 - 2.5) * 40;
  const yOffset = (Math.floor(index / 6) % 3 - 1) * 50;
  
  if (reduceMotion) {
    return (
      <div className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-60" />
    );
  }
  
  return (
    <motion.div
      className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0.7, 1, 0],
        scale: [0, 1.2, 0.8, 1.5, 0],
        x: [0, xOffset * 0.5, xOffset],
        y: [0, yOffset * 0.3, yOffset],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeInOut"
      }}
    />
  );
};

// n8n 워크플로우 시뮬레이션 효과
const WorkflowAnimation: React.FC<{ reduceMotion: boolean }> = ({ reduceMotion }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(12)].map((_, i) => (
      <N8nParticle key={i} delay={i * 0.3} index={i} reduceMotion={reduceMotion} />
    ))}
    
    {/* 연결선 애니메이션 */}
    {!reduceMotion && (
      <motion.div
        className="absolute top-1/2 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ 
          scaleX: [0, 1, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut"
        }}
      />
    )}
  </div>
);

// 모바일 감지 훅
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Reduced Motion 감지 훅
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();

    try {
      mediaQuery.addEventListener('change', updatePreference);
      return () => mediaQuery.removeEventListener('change', updatePreference);
    } catch {
      // @ts-ignore - Safari 폴백
      mediaQuery.addListener(updatePreference);
      return () => {
        // @ts-ignore - Safari 폴백 해제
        mediaQuery.removeListener(updatePreference);
      };
    }
  }, []);

  return prefersReducedMotion;
};

const N8nCurriculumBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  
  const shouldReduceMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  // 모션 감소 설정 감지 및 경고 처리 (오류 방지)
  useEffect(() => {
    // hydration 오류 방지를 위해 콘솔 로그 완전 제거
    // shouldReduceMotion 상태만 감지하고 로그는 출력하지 않음
  }, [shouldReduceMotion]);

  // 3순위 등장 (n8n 커리큘럼 배너 - 책소개 배너와 동시)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // 1초 후 등장 (책소개 배너와 동시)

    return () => clearTimeout(timer);
  }, []);

  // 다운로드 카운터 애니메이션
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setDownloadCount(prev => {
          const newCount = prev + Math.floor(Math.random() * 3) + 1;
          return newCount > 2847 ? 2847 : newCount;
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      
      if (isMobile) {
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
        }
        (document.body.style as any).webkitTouchCallout = 'none';
        (document.body.style as any).webkitUserSelect = 'none';
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
      
      if (isMobile) {
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
        }
        (document.body.style as any).webkitTouchCallout = 'auto';
        (document.body.style as any).webkitUserSelect = 'auto';
      }
    };
  }, [isVisible, isMobile]);

  const handleBackgroundClick = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setIsLoaded(true);
  }, []);

  // PDF 뷰어 열기 핸들러 (배너 전체 클릭)
  const handleOpenPDFViewer = useCallback(() => {
    setShowPDFViewer(true);
  }, []);

  // PDF 다운로드 핸들러 (다운로드 버튼 클릭)
  const handleDownload = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // 배너 클릭 이벤트 방지
    const link = document.createElement('a');
    link.href = '/images/n8n_Curriculum.pdf';
    link.download = 'n8n_AI자동화_워크플로우_커리큘럼.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  // PDF 뷰어 닫기 핸들러
  const handleClosePDFViewer = useCallback(() => {
    setShowPDFViewer(false);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10001] flex items-center justify-center p-2 sm:p-4"
        onClick={handleBackgroundClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="n8n-curriculum-title"
        aria-describedby="n8n-curriculum-description"
        style={{
          minHeight: isMobile ? '100dvh' : '100vh',
          height: isMobile ? '100dvh' : '100vh'
        }}
      >
        {/* 배경 오버레이 - n8n 테마 */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/80 to-indigo-900/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 bg-purple-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-60 right-32 w-60 h-60 bg-blue-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/3 w-48 h-48 bg-indigo-400 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* 메인 플로팅 컨테이너 */}
        <motion.div
          initial={{ 
            scale: shouldReduceMotion ? 0.9 : 0.2, 
            opacity: 0, 
            rotateY: shouldReduceMotion ? 0 : -60, 
            rotateX: shouldReduceMotion ? 0 : 20,
            y: shouldReduceMotion ? 30 : 100
          }}
          animate={{ 
            scale: 1, 
            opacity: 1, 
            rotateY: 0, 
            rotateX: 0,
            y: 0
          }}
          exit={{ 
            scale: shouldReduceMotion ? 0.9 : 0.2, 
            opacity: 0, 
            rotateY: shouldReduceMotion ? 0 : 60, 
            rotateX: shouldReduceMotion ? 0 : -20,
            y: shouldReduceMotion ? -30 : -100
          }}
          transition={{
            type: "spring",
            stiffness: shouldReduceMotion ? 300 : 150,
            damping: shouldReduceMotion ? 20 : 15,
            duration: shouldReduceMotion ? 0.4 : 1.2
          }}
          className={cn(
            "relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-6xl mx-auto",
            shouldReduceMotion ? "" : "perspective-1000"
          )}
          onClick={handleContentClick}
        >
          {/* 닫기 버튼 */}
          <button
            onClick={() => setIsVisible(false)}
            title="배너 닫기"
            className={cn(
              "absolute -top-2 -right-2 sm:-top-4 sm:-right-4 z-20 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 active:scale-95",
              isMobile ? "w-12 h-12 touch-manipulation" : "w-10 h-10",
              "webkit-tap-highlight-transparent"
            )}
            aria-label="n8n 커리큘럼 배너 닫기"
          >
            <X size={isMobile ? 24 : 20} />
          </button>

          {/* 메인 카드 */}
          <motion.div
            whileHover={shouldReduceMotion || isMobile ? {} : { 
              scale: 1.02,
              rotateY: 3,
              rotateX: -3,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className={cn(
              "bg-gradient-to-br from-white via-purple-50 to-blue-100 rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-200/50 backdrop-blur-sm",
              shouldReduceMotion ? "" : "transform-style-preserve-3d"
            )}
          >
            <div className="p-6 lg:p-8">
              
              {/* 중앙 정렬 콘텐츠 */}
              <div className="flex flex-col items-center justify-center relative max-w-4xl mx-auto">
                
                {/* 상단 뱃지 */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6 flex flex-wrap gap-2 justify-center"
                >
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    국내최초 한국어판
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                    <Award className="w-3 h-3 mr-1" />
                    실무 완벽 가이드
                  </div>
                </motion.div>

                {/* 북커버 섹션 */}
                <motion.div
                  whileHover={shouldReduceMotion || isMobile ? {} : { 
                    scale: 1.1,
                    rotateY: 10,
                    rotateX: -8,
                  }}
                  whileTap={isMobile ? { scale: 0.95 } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={cn(
                    "relative group cursor-pointer",
                    shouldReduceMotion ? "" : "transform-style-preserve-3d"
                  )}
                  onClick={handleDownload}
                >
                  {/* 워크플로우 애니메이션 효과 */}
                  {isLoaded && !isMobile && <WorkflowAnimation reduceMotion={shouldReduceMotion} />}
                  
                  {/* 글로우 효과 */}
                  {!isMobile && (
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-700" />
                  )}
                  
                  {/* 북커버 */}
                  <div className="relative w-56 h-72 sm:w-64 sm:h-80 lg:w-72 lg:h-90 rounded-2xl overflow-hidden shadow-2xl">
                    {!imageError ? (
                      <Image
                        src="/images/book_1_cover.JPG?v=4"
                        alt="n8n AI 자동화 워크플로우 커리큘럼 북커버"
                        fill
                        sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 288px"
                        style={{ objectFit: 'cover' }}
                        priority
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        className={`transition-all duration-500 ${
                          isMobile ? 'group-active:scale-110' : 'group-hover:scale-110'
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex flex-col items-center justify-center text-white p-6">
                        <Workflow size={isMobile ? 48 : 56} className="mb-4" />
                        <h3 className="text-xl font-bold text-center mb-2">n8n 자동화</h3>
                        <p className="text-base text-center mb-2">워크플로우 가이드</p>
                        <p className="text-sm text-center opacity-90">실무 활용 커리큘럼</p>
                      </div>
                    )}
                    
                    {/* 호버/터치 오버레이 */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-purple-900/90 via-transparent to-transparent opacity-0 ${
                      isMobile ? 'group-active:opacity-100' : 'group-hover:opacity-100'
                    } transition-all duration-300 flex flex-col items-center justify-end pb-8 pointer-events-none`}>
                      <motion.div 
                        className="text-white text-center"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Download className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm font-bold">PDF 다운로드</p>
                        <p className="text-xs opacity-80">클릭하여 즉시 받기</p>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* 부유하는 아이콘들 */}
                  {isLoaded && !isMobile && !shouldReduceMotion && (
                    <>
                      <motion.div
                        animate={{ 
                          y: [-8, 8, -8],
                          rotate: [0, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                        className="absolute -top-4 -right-4"
                      >
                        <Zap className="w-8 h-8 text-yellow-500 drop-shadow-lg" />
                      </motion.div>
                      
                      <motion.div
                        animate={{ 
                          y: [8, -8, 8],
                          rotate: [360, 0],
                          scale: [1, 1.3, 1]
                        }}
                        transition={{ 
                          duration: 6, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                        className="absolute -bottom-4 -left-4"
                      >
                        <Bot className="w-8 h-8 text-purple-500 drop-shadow-lg" />
                      </motion.div>

                      <motion.div
                        animate={{ 
                          x: [-5, 5, -5],
                          rotate: [0, 180, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 5, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                        className="absolute top-1/2 -left-6"
                      >
                        <Rocket className="w-6 h-6 text-blue-500 drop-shadow-lg" />
                      </motion.div>
                    </>
                  )}
                </motion.div>

                {/* 다운로드 통계 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-purple-200/50 shadow-lg"
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="w-4 h-4 text-purple-600 mr-2" />
                      <span className="text-sm font-bold text-gray-700">실시간 다운로드</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">
                      {downloadCount.toLocaleString()}+
                    </div>
                    <div className="text-xs text-gray-500">명이 다운로드했습니다</div>
                  </div>
                </motion.div>
              </div>

              {/* 우측: 콘텐츠 섹션 (3/5) */}
              <div className="lg:col-span-3 flex flex-col justify-center space-y-6 order-2 lg:order-2">
                
                {/* 메인 타이틀 */}
                <div className="text-center lg:text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: shouldReduceMotion ? 0 : 0.4 }}
                    className="mb-4"
                  >
                    <span className="inline-block text-lg font-bold text-purple-600 mb-2">
                      🔥 AI 자동화의 끝판왕!
                    </span>
                  </motion.div>
                  
                  <motion.h1
                    id="n8n-curriculum-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: shouldReduceMotion ? 0 : 0.5 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight"
                  >
                    <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      n8n을 활용한
                    </span>
                    <br />
                    <span className="text-2xl sm:text-3xl lg:text-4xl text-gray-800">
                      업무혁신 AI 워크플로우
                    </span>
                  </motion.h1>
                </div>

                {/* 핵심 혜택 강조 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 0.6 }}
                  className="bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-100 rounded-2xl p-6 border-2 border-purple-200/50 shadow-lg"
                >
                  <div className="text-center lg:text-left">
                    <h2 className="text-xl font-bold text-purple-700 mb-3 flex items-center justify-center lg:justify-start">
                      <Sparkles className="w-5 h-5 mr-2" />
                      반드시 확인해야 할 핵심 솔루션 예시
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>이메일 자동 분류 & 응답</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>데이터 수집 & 분석 자동화</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>소셜미디어 콘텐츠 자동 발행</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>고객 관리 시스템 연동</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 설명 텍스트 */}
                <motion.p
                  id="n8n-curriculum-description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 0.7 }}
                  className="text-base text-gray-600 text-center lg:text-left leading-relaxed"
                >
                  코딩 없이도 강력한 자동화 워크플로우를 구축할 수 있는 n8n의 모든 것을 담았습니다. 
                  실무에서 바로 활용 가능한 200+ 워크플로우 템플릿과 단계별 구현 가이드로 
                  업무 효율성을 10배 향상시켜보세요.
                </motion.p>

                {/* 특별 혜택 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 0.8 }}
                  className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 border border-yellow-300/50 shadow-md"
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="w-5 h-5 text-orange-600 mr-2" />
                      <span className="text-lg font-bold text-orange-700">
                        🎁 지금 다운로드 시 특별혜택
                      </span>
                    </div>
                    <p className="text-sm text-orange-600 font-medium">
                      AI CAMP 교육 프로그램 30% 할인 쿠폰 + 1:1 무료 컨설팅 (선착순 100명)
                    </p>
                  </div>
                </motion.div>

                {/* 액션 버튼들 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 0.9 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {/* 즉시 다운로드 버튼 */}
                  <motion.div 
                    whileHover={isMobile ? {} : { scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={handleDownload}
                      size="lg"
                      className={`w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white font-bold ${
                        isMobile ? 'py-5 px-6 text-base' : 'py-5 text-base'
                      } shadow-xl focus:ring-2 focus:ring-purple-500 active:scale-95 transition-all ${
                        isMobile ? 'touch-manipulation select-none' : ''
                      } relative overflow-hidden`}
                      style={{
                        WebkitTapHighlightColor: 'transparent',
                        touchAction: 'manipulation'
                      }}
                    >
                      <div className="flex items-center justify-center relative z-10">
                        <Download className="w-5 h-5 mr-2" />
                        <span>즉시 다운로드</span>
                      </div>
                      {/* 버튼 내부 애니메이션 */}
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: "easeInOut"
                        }}
                      />
                    </Button>
                  </motion.div>

                  {/* AI 상담 신청 버튼 */}
                  <motion.div 
                    whileHover={isMobile ? {} : { scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className={`w-full border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-bold ${
                        isMobile ? 'py-5 px-6 text-base' : 'py-5 text-base'
                      } shadow-lg focus:ring-2 focus:ring-purple-500 active:scale-95 transition-all ${
                        isMobile ? 'touch-manipulation select-none' : ''
                      }`}
                      style={{
                        WebkitTapHighlightColor: 'transparent',
                        touchAction: 'manipulation'
                      }}
                    >
                      <Link 
                        href="/consultation"
                        className="flex items-center justify-center min-h-[44px] min-w-[44px]"
                        aria-label="n8n 자동화 전문가 상담신청서 작성하기"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        <span>상담신청서</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>

                {/* 추가 안내 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 1.2 }}
                  className="text-center text-xs text-gray-500 mt-4"
                >
                  <p>{isMobile ? '배경을 터치하여 닫기' : 'ESC 키 또는 배경을 클릭하여 닫을 수 있습니다'}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default N8nCurriculumBanner;