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

  // 3순위 등장 (2순위 다음에 나타남 - 최고 수준 UI/UX로 상담신청 100% 전환율 목표)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // 2초 후 등장 (2순위 다음)

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

            {/* 메인 컴팩트 카드 - 베스트 레벨 UI/UX */}
            <motion.div
              whileHover={shouldReduceMotion || isMobile ? {} : { 
                scale: 1.03,
                y: -8,
                rotateY: 2,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-gradient-to-br from-white via-purple-50 to-blue-100 rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-300/60 backdrop-blur-sm cursor-pointer relative group"
              onClick={handleOpenPDFViewer}
            >
              {/* 글로우 효과 */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
              
              {/* 펄스 애니메이션 링 */}
              <div className="absolute -inset-2 rounded-3xl border-2 border-purple-400/50 animate-pulse"></div>
              <div className="absolute -inset-4 rounded-3xl border border-blue-400/30 animate-ping"></div>
              
              {/* 상단 헤더 - 베스트 레벨 디자인 */}
              <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-6 text-white relative overflow-hidden">
                {/* 배경 애니메이션 */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-indigo-400/20 animate-pulse"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 animate-pulse"></div>
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-4">
                    <motion.div 
                      className="bg-white/25 rounded-full p-3 backdrop-blur-sm"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <BookOpen className="w-7 h-7" />
                    </motion.div>
                    <div>
                      <motion.h2 
                        id="n8n-curriculum-title" 
                        className="text-2xl font-black bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      >
                        🔥 AI 자동화의 끝판왕!
                      </motion.h2>
                      <p className="text-sm opacity-95 font-semibold">n8n을 활용한 업무혁신 AI 워크플로우</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs bg-yellow-400/20 text-yellow-200 px-2 py-1 rounded-full">🚀 즉시 적용</span>
                        <span className="text-xs bg-green-400/20 text-green-200 px-2 py-1 rounded-full">✅ 검증완료</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <motion.div 
                      className="bg-white/25 rounded-xl px-4 py-2 backdrop-blur-sm border border-white/20"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <p className="text-xs opacity-90 font-medium">🔥 실시간 다운로드</p>
                      <motion.p 
                        className="text-2xl font-black text-yellow-200"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                      >
                        {downloadCount}+
                      </motion.p>
                    </motion.div>
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

                    {/* 액션 버튼들 - 베스트 레벨 디자인 */}
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        <Button
                          onClick={handleOpenPDFViewer}
                          className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white font-black py-4 rounded-xl shadow-lg border-2 border-purple-300/50 relative overflow-hidden group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <Eye className="w-5 h-5 mr-2 animate-pulse" />
                          <span className="relative z-10">📖 커리큘럼 보기</span>
                        </Button>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        <Button
                          onClick={handleDownload}
                          variant="outline"
                          className="w-full border-3 border-purple-500 text-purple-700 hover:bg-purple-50 hover:border-purple-600 font-black py-4 rounded-xl shadow-lg bg-white/80 backdrop-blur-sm relative overflow-hidden group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <Download className="w-5 h-5 mr-2 animate-bounce" />
                          <span className="relative z-10">💾 PDF 다운로드</span>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* 하단 네비게이션 버튼들 - 베스트 레벨 디자인 */}
                <div className="mt-8 pt-6 border-t-2 border-gradient-to-r from-purple-200 via-blue-200 to-indigo-200">
                  {/* 상담신청 메인 CTA - 100% 전환율 목표 */}
                  <motion.div
                    className="mb-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 hover:from-red-600 hover:via-pink-600 hover:to-purple-700 text-white font-black py-6 rounded-2xl shadow-2xl border-2 border-red-300/50 relative overflow-hidden group text-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link href="/consultation" className="flex items-center justify-center space-x-3 relative z-10">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <MessageCircle className="w-6 h-6" />
                        </motion.div>
                        <span className="font-black">🔥 지금 바로 상담신청하기 🔥</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                        >
                          ➤
                        </motion.div>
                      </Link>
                    </Button>
                  </motion.div>

                  {/* 서브 네비게이션 버튼들 */}
                  <div className="grid grid-cols-3 gap-3">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 font-bold py-3 rounded-xl bg-white/80 backdrop-blur-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Link href="/ai-diagnosis" className="flex items-center justify-center space-x-2">
                          <Sparkles className="w-4 h-4 animate-pulse" />
                          <span className="text-sm">✨ AI역량진단</span>
                        </Link>
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full border-2 border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 font-bold py-3 rounded-xl bg-white/80 backdrop-blur-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Link href="/" className="flex items-center justify-center space-x-2">
                          <Home className="w-4 h-4" />
                          <span className="text-sm">🏠 홈으로</span>
                        </Link>
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <Button
                        onClick={handleCloseAll}
                        variant="outline"
                        size="sm"
                        className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-bold py-3 rounded-xl bg-white/80 backdrop-blur-sm"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">✅ 모두 확인</span>
                      </Button>
                    </motion.div>
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