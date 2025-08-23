'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  BookOpen, 
  MessageCircle, 
  Sparkles, 
  Home,
  Eye,
  CheckCircle,
  Users,
  Clock,
  Award,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import PDFViewer from '@/components/ui/PDFViewer';
import Link from 'next/link';

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

// 사용자 OS의 Reduced Motion 선호를 감지하는 커스텀 훅
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
  const [downloadCount, setDownloadCount] = useState(2847);
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  
  const shouldReduceMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  // 1순위 등장 (가장 먼저 나타남)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // 0.5초 후 등장 (가장 빠름)

    return () => clearTimeout(timer);
  }, []);

  // 다운로드 카운터 애니메이션
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setDownloadCount(prev => {
          const newCount = prev + Math.floor(Math.random() * 3) + 1;
          return newCount > 3000 ? 3000 : newCount;
        });
      }, 3000);

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
      
      if (isMobile) {
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
        }
        document.body.style.webkitTouchCallout = 'none';
        document.body.style.webkitUserSelect = 'none';
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      
      if (isMobile) {
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
        }
        document.body.style.webkitTouchCallout = 'auto';
        document.body.style.webkitUserSelect = 'auto';
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
    link.href = '/n8n_Curriculum.pdf';
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

  // 모두 확인하고 닫기 핸들러
  const handleCloseAll = useCallback(() => {
    setIsVisible(false);
    localStorage.setItem('n8n-curriculum-viewed', 'true');
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[2147483647] flex items-center justify-center p-4"
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
          {/* 배경 오버레이 */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-indigo-900/90 backdrop-blur-md"
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

          {/* 메인 컴팩트 컨테이너 */}
          <motion.div
            initial={{ 
              scale: shouldReduceMotion ? 0.95 : 0.8, 
              opacity: 0, 
              y: shouldReduceMotion ? 20 : 50
            }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0
            }}
            exit={{ 
              scale: shouldReduceMotion ? 0.95 : 0.8, 
              opacity: 0, 
              y: shouldReduceMotion ? -20 : -50
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.6
            }}
            className="relative z-10 w-full max-w-3xl mx-auto"
            onClick={handleContentClick}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={() => setIsVisible(false)}
              title="배너 닫기"
              className={cn(
                "absolute -top-2 -right-2 z-20 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 active:scale-95",
                isMobile ? "w-12 h-12 touch-manipulation" : "w-10 h-10"
              )}
              aria-label="n8n 커리큘럼 배너 닫기"
            >
              <X size={isMobile ? 24 : 20} />
            </button>

            {/* 메인 컴팩트 카드 */}
            <motion.div
              whileHover={shouldReduceMotion || isMobile ? {} : { 
                scale: 1.02,
                y: -5
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="bg-gradient-to-br from-white via-purple-50 to-blue-100 rounded-2xl shadow-2xl overflow-hidden border-2 border-purple-200/50 backdrop-blur-sm cursor-pointer"
              onClick={handleOpenPDFViewer}
            >
              {/* 상단 헤더 */}
              <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white/20 rounded-full p-2">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 id="n8n-curriculum-title" className="text-xl font-bold">
                        🔥 AI 자동화의 끝판왕!
                      </h2>
                      <p className="text-sm opacity-90">n8n을 활용한 업무혁신 AI 워크플로우</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-white/20 rounded-lg px-3 py-1">
                      <p className="text-xs opacity-80">실시간 다운로드</p>
                      <p className="text-lg font-bold">{downloadCount}+</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 메인 콘텐츠 영역 */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                  {/* 북커버 섹션 - 더 작게 */}
                  <div className="lg:col-span-1 flex justify-center">
                    <motion.div
                      whileHover={shouldReduceMotion || isMobile ? {} : { 
                        scale: 1.05,
                        rotateY: 5
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative group"
                    >
                      <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-xl overflow-hidden shadow-xl">
                        {!imageError ? (
                          <Image
                            src="/images/book_1_cover.JPG?v=4"
                            alt="n8n AI 자동화 워크플로우 커리큘럼 북커버"
                            fill
                            sizes="(max-width: 640px) 112px, 128px"
                            style={{ objectFit: 'cover' }}
                            priority
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            className="transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex flex-col items-center justify-center text-white p-4">
                            <BookOpen size={28} className="mb-2" />
                            <p className="text-xs text-center font-bold">n8n 커리큘럼</p>
                          </div>
                        )}
                        
                        {/* 호버 오버레이 */}
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end pb-3">
                          <Eye className="w-4 h-4 text-white mb-1" />
                          <p className="text-xs text-white font-bold">클릭하여 보기</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* 콘텐츠 섹션 */}
                  <div className="lg:col-span-2 space-y-4">
                    {/* 주요 특징 */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/60 rounded-lg p-3 text-center">
                        <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                        <p className="text-xs font-semibold text-gray-700">실무 완벽 가이드</p>
                      </div>
                      <div className="bg-white/60 rounded-lg p-3 text-center">
                        <Users className="w-5 h-5 text-green-600 mx-auto mb-1" />
                        <p className="text-xs font-semibold text-gray-700">200+ 워크플로우</p>
                      </div>
                      <div className="bg-white/60 rounded-lg p-3 text-center">
                        <Award className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                        <p className="text-xs font-semibold text-gray-700">단계별 구현</p>
                      </div>
                      <div className="bg-white/60 rounded-lg p-3 text-center">
                        <Zap className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
                        <p className="text-xs font-semibold text-gray-700">10배 생산성 향상</p>
                      </div>
                    </div>

                    {/* 액션 버튼들 */}
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        onClick={handleOpenPDFViewer}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        커리큘럼 보기
                      </Button>
                      
                      <Button
                        onClick={handleDownload}
                        variant="outline"
                        className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-bold py-3"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        PDF 다운로드
                      </Button>
                    </div>
                  </div>
                </div>

                {/* 하단 네비게이션 버튼들 */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-4 gap-3">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:bg-blue-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link href="/consultation" className="flex items-center justify-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs">상담신청</span>
                      </Link>
                    </Button>
                    
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-purple-600 hover:bg-purple-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link href="/ai-diagnosis" className="flex items-center justify-center space-x-1">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-xs">AI역량진단</span>
                      </Link>
                    </Button>
                    
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-green-600 hover:bg-green-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link href="/" className="flex items-center justify-center space-x-1">
                        <Home className="w-4 h-4" />
                        <span className="text-xs">홈으로</span>
                      </Link>
                    </Button>

                    <Button
                      onClick={handleCloseAll}
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:bg-gray-50"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-xs">모두 확인</span>
                    </Button>
                  </div>
                </div>

                {/* 안내 텍스트 */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    {isMobile ? '배경을 터치하여 닫기' : 'ESC 키 또는 배경을 클릭하여 닫을 수 있습니다'}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* PDF 뷰어 */}
      <PDFViewer
        isOpen={showPDFViewer}
        onClose={handleClosePDFViewer}
        pdfUrl="/n8n_Curriculum.pdf"
        title="n8n을 활용한 업무혁신 AI 워크플로우 커리큘럼"
        description="실무에서 바로 활용할 수 있는 200+ 워크플로우 완벽 가이드"
      />
    </>
  );
};

export default N8nCurriculumBanner;
