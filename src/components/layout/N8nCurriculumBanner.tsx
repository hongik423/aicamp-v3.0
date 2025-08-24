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

interface N8nCurriculumBannerProps {
  forceVisible?: boolean;
  onHide?: () => void;
}

const N8nCurriculumBanner: React.FC<N8nCurriculumBannerProps> = ({ forceVisible = false, onHide }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [downloadCount, setDownloadCount] = useState(2847);
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const shouldReduceMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  // Hydration 오류 방지
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // BannerController에서 제어됨 - forceVisible prop 사용
  useEffect(() => {
    if (forceVisible) {
      setIsVisible(true);
    }
  }, [forceVisible]);

  // 개발 환경에서 수동 테스트용
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.altKey && e.key === '4') {
          setIsVisible(prev => !prev);
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
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
        (document.body.style as any).webkitTouchCallout = 'none';
        (document.body.style as any).webkitUserSelect = 'none';
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
  const handleOpenPDFViewer = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('PDF 뷰어 열기 시도');
    setShowPDFViewer(true);
    // PDF 뷰어가 열릴 때 배너를 임시로 숨김
    setIsVisible(false);
  }, []);

  // PDF 다운로드 핸들러 (다운로드 버튼 클릭)
  const handleDownload = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // 배너 클릭 이벤트 방지
    console.log('PDF 다운로드 시도');
    
    try {
      const link = document.createElement('a');
      link.href = '/n8n_Curriculum.pdf';
      link.download = 'n8n_AI자동화_워크플로우_커리큘럼.pdf';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log('PDF 다운로드 링크 클릭 완료');
    } catch (error) {
      console.error('PDF 다운로드 오류:', error);
      // 대체 방법으로 새 탭에서 열기
      window.open('/n8n_Curriculum.pdf', '_blank');
    }
  }, []);

  // PDF 뷰어 닫기 핸들러
  const handleClosePDFViewer = useCallback(() => {
    setShowPDFViewer(false);
    // PDF 뷰어가 닫힐 때 배너를 다시 보임
    setIsVisible(true);
  }, []);

  // 모두 확인하고 닫기 핸들러
  const handleCloseAll = useCallback(() => {
    console.log('모두 확인 버튼 클릭');
    setIsVisible(false);
    localStorage.setItem('n8n-curriculum-viewed', 'true');
  }, []);

  // 모션 감소 설정 감지 및 경고 처리 (오류 방지)
  useEffect(() => {
    // hydration 오류 방지를 위해 콘솔 로그 완전 제거
    // shouldReduceMotion 상태만 감지하고 로그는 출력하지 않음
  }, [shouldReduceMotion]);

  if (!isVisible || !isMounted) return null;

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

          {/* 메인 컴팩트 컨테이너 - 스크롤 개선 */}
          <motion.div
            initial={{ 
              scale: shouldReduceMotion ? 0.95 : 0.8, 
              opacity: 0, 
              y: shouldReduceMotion ? 100 : 200
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
            className="relative z-10 w-full max-w-3xl mx-auto max-h-[90vh] overflow-y-auto custom-scrollbar"
            onClick={handleContentClick}
          >
            {/* 개선된 닫기 버튼 */}
            <motion.button
              onClick={() => {
                console.log('상단 닫기 버튼 클릭됨');
                setIsVisible(false);
                localStorage.setItem('n8n-curriculum-viewed', 'true');
              }}
              title="배너 닫기"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={cn(
                "absolute -top-3 -right-3 z-20 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all focus:outline-none focus:ring-4 focus:ring-red-300 border-2 border-white",
                isMobile ? "w-14 h-14 touch-manipulation" : "w-12 h-12"
              )}
              aria-label="n8n 커리큘럼 배너 닫기"
            >
              <X size={isMobile ? 28 : 24} className="font-bold" />
            </motion.button>

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
              onClick={(e) => {
                // 버튼이나 링크가 아닌 카드 영역 클릭 시에만 PDF 뷰어 열기
                const target = e.target as HTMLElement;
                const isButton = target.closest('button');
                const isLink = target.closest('a');
                const isMotionDiv = target.closest('.motion-div-button');
                
                if (!isButton && !isLink && !isMotionDiv) {
                  console.log('카드 배경 클릭됨 - n8n 커리큘럼 PDF 직접 열기');
                  e.preventDefault();
                  e.stopPropagation();
                  // n8n_Curriculum.pdf를 직접 열기
                  window.open('/n8n_Curriculum.pdf', '_blank', 'noopener,noreferrer');
                } else {
                  console.log('버튼/링크 영역 클릭됨 - 이벤트 전파 방지');
                }
              }}
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
                        🔥 AI 자동화의 끝판왕! - 3순위
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
                      className="relative group cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('n8n 커리큘럼 북커버 클릭 - PDF 직접 열기');
                        // n8n_Curriculum.pdf를 직접 열기
                        window.open('/n8n_Curriculum.pdf', '_blank', 'noopener,noreferrer');
                      }}
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
                          <p className="text-xs text-white font-bold">n8n 커리큘럼 보기</p>
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
                        className="motion-div-button"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('n8n 커리큘럼 보기 버튼 클릭 - PDF 직접 열기');
                            // n8n_Curriculum.pdf를 직접 열기
                            window.open('/n8n_Curriculum.pdf', '_blank', 'noopener,noreferrer');
                          }}
                          className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white font-black py-4 rounded-xl shadow-lg border-2 border-purple-300/50 relative overflow-hidden group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <Eye className="w-5 h-5 mr-2 animate-pulse" />
                          <span className="relative z-10">📖 커리큘럼 보기</span>
                        </Button>
                      </motion.div>
                      
                      <motion.div
                        className="motion-div-button"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDownload(e);
                          }}
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
                    className="mb-4 motion-div-button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 hover:from-red-600 hover:via-pink-600 hover:to-purple-700 text-white font-black py-6 rounded-2xl shadow-2xl border-2 border-red-300/50 relative overflow-hidden group text-lg"
                    >
                      <Link 
                        href="https://aicamp.club/consultation" 
                        className="flex items-center justify-center space-x-3 relative z-10"
                        onClick={(e) => {
                          console.log('전문가 상담신청 링크 클릭됨 - https://aicamp.club/consultation 페이지로 이동');
                          // 🎯 사용자가 신청서 작성에 집중할 수 있도록 배너 닫기
                          setIsVisible(false);
                          localStorage.setItem('n8n-curriculum-viewed', 'true');
                          if (onHide) onHide();
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <MessageCircle className="w-6 h-6" />
                        </motion.div>
                        <span className="font-black">🔥 전문가 상담신청하기 🔥</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                        >
                          ➤
                        </motion.div>
                      </Link>
                    </Button>
                  </motion.div>

                  {/* 역량진단 우선 배치 - 메인 CTA 스타일 */}
                  <motion.div
                    className="mb-4 motion-div-button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-700 text-white font-black py-5 rounded-2xl shadow-2xl border-2 border-emerald-300/50 relative overflow-hidden group text-base"
                    >
                      <Link 
                        href="https://aicamp.club/ai-diagnosis" 
                        className="flex items-center justify-center space-x-3 relative z-10"
                        onClick={(e) => {
                          console.log('AI역량진단 메인 CTA 클릭됨 - https://aicamp.club/ai-diagnosis로 이동');
                          // 🎯 사용자가 신청서 작성에 집중할 수 있도록 배너 닫기
                          setIsVisible(false);
                          localStorage.setItem('n8n-curriculum-viewed', 'true');
                          if (onHide) onHide();
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-6 h-6" />
                        </motion.div>
                        <span className="font-black">🎯 무료 AI 역량진단 받기 🎯</span>
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
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div
                      className="motion-div-button"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full border-2 border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 font-bold py-3 rounded-xl bg-white/80 backdrop-blur-sm"
                      >
                        <Link 
                          href="https://aicamp.club/" 
                          className="flex items-center justify-center space-x-2"
                          onClick={(e) => {
                            console.log('홈으로 링크 클릭됨 - https://aicamp.club/로 이동');
                            // 배너 닫기
                            setIsVisible(false);
                            // 홈 페이지에서 배너가 닫히도록 localStorage 설정
                            localStorage.setItem('n8n-curriculum-viewed', 'true');
                          }}
                        >
                          <Home className="w-4 h-4" />
                          <span className="text-sm">🏠 홈으로</span>
                        </Link>
                      </Button>
                    </motion.div>

                    <motion.div
                      className="motion-div-button"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleCloseAll();
                        }}
                        variant="outline"
                        size="sm"
                        className="w-full border-2 border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 font-bold py-3 rounded-xl bg-white/80 backdrop-blur-sm"
                      >
                        <X className="w-4 h-4 mr-1" />
                        <span className="text-sm">❌ 배너 닫기</span>
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* 개선된 안내 텍스트 */}
                <div className="mt-6 text-center space-y-2">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 border border-blue-200">
                    <p className="text-sm font-semibold text-blue-800 mb-1">
                      🎯 AI 역량진단으로 맞춤형 n8n 활용 전략을 받아보세요!
                    </p>
                    <p className="text-xs text-blue-600">
                      무료 진단 후 개인별 자동화 워크플로우 추천 제공
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {isMobile ? '배경 터치 또는 ❌ 버튼으로 닫기' : 'ESC 키, 배경 클릭 또는 ❌ 버튼으로 닫기'}
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