'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, BookOpen, ExternalLink, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// 파티클 컴포넌트
const Particle: React.FC<{ delay: number; index: number; reduceMotion: boolean }> = ({ delay, index, reduceMotion }) => {
  // 고정된 애니메이션 패턴으로 hydration 오류 방지
  const xOffset = (index % 4 - 1.5) * 30;
  const yOffset = (Math.floor(index / 4) % 2 - 0.5) * 40;
  
  // 모션 감소 설정 시 애니메이션 제한
  if (reduceMotion) {
    return (
      <div className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-60" />
    );
  }
  
  return (
    <motion.div
      className="absolute w-1 h-1 bg-yellow-400 rounded-full"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        x: [0, xOffset],
        y: [0, yOffset],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeInOut"
      }}
    />
  );
};

// 스파클 효과 컴포넌트
const SparkleEffect: React.FC<{ reduceMotion: boolean }> = ({ reduceMotion }) => (
  <div className="absolute inset-0 pointer-events-none">
    {[...Array(8)].map((_, i) => (
      <Particle key={i} delay={i * 0.2} index={i} reduceMotion={reduceMotion} />
    ))}
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

const BookPromotionBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    // 3초 후 자동 등장
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
      // 페이지 스크롤 방지 - 모바일에서도 중요
      document.body.style.overflow = 'hidden';
      // iOS Safari bounce 효과 방지
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      
      // 모바일에서 줌 방지 및 뷰포트 고정
      if (isMobile) {
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
        }
        // 터치 이벤트 최적화
        document.body.style.webkitTouchCallout = 'none';
        document.body.style.webkitUserSelect = 'none';
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
      
      // 모바일 설정 초기화
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

  // 터치 이벤트 핸들러 (모바일 최적화)
  const handleTouchStart = useCallback(() => {
    setIsTouched(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => setIsTouched(false), 150);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
              <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-2 sm:p-4"
          onClick={handleBackgroundClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-labelledby="book-promotion-title"
          aria-describedby="book-promotion-description"
          style={{
            // iOS Safari에서 뷰포트 높이 문제 해결
            minHeight: isMobile ? '100dvh' : '100vh',
            height: isMobile ? '100dvh' : '100vh'
          }}
        >
        {/* 배경 오버레이 */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
        {/* 메인 플로팅 컨테이너 */}
        <motion.div
          initial={{ 
            scale: shouldReduceMotion ? 0.95 : 0.3, 
            opacity: 0, 
            rotateY: shouldReduceMotion ? 0 : -45, 
            rotateX: shouldReduceMotion ? 0 : 15,
            y: shouldReduceMotion ? 20 : 50
          }}
          animate={{ 
            scale: 1, 
            opacity: 1, 
            rotateY: 0, 
            rotateX: 0,
            y: 0
          }}
          exit={{ 
            scale: shouldReduceMotion ? 0.95 : 0.3, 
            opacity: 0, 
            rotateY: shouldReduceMotion ? 0 : 45, 
            rotateX: shouldReduceMotion ? 0 : -15,
            y: shouldReduceMotion ? -20 : -50
          }}
          transition={{
            type: "spring",
            stiffness: shouldReduceMotion ? 400 : 200,
            damping: shouldReduceMotion ? 25 : 20,
            duration: shouldReduceMotion ? 0.3 : 0.8
          }}
          className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl mx-auto"
          style={{ perspective: shouldReduceMotion ? "none" : "1000px" }}
          onClick={handleContentClick}
        >
          {/* 닫기 버튼 - 모바일에서 더 큰 터치 영역 */}
          <button
            onClick={() => setIsVisible(false)}
            title="배너 닫기"
            className={`absolute -top-2 -right-2 sm:-top-4 sm:-right-4 z-20 ${
              isMobile ? 'w-12 h-12' : 'w-10 h-10'
            } bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95 ${
              isMobile ? 'touch-manipulation' : ''
            }`}
            style={{
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
              minHeight: isMobile ? '48px' : '40px',
              minWidth: isMobile ? '48px' : '40px'
            }}
            aria-label="책 홍보 배너 닫기"
          >
            <X size={isMobile ? 24 : 20} />
          </button>

          {/* 메인 카드 */}
          <motion.div
            whileHover={shouldReduceMotion || isMobile ? {} : { 
              scale: 1.02,
              rotateY: 2,
              rotateX: -2,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-blue-200"
            style={{ 
              transformStyle: shouldReduceMotion ? "flat" : "preserve-3d",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.5)"
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
              {/* 책 표지 섹션 */}
              <div className="flex items-center justify-center relative order-1 lg:order-1">
                <motion.div
                  whileHover={shouldReduceMotion || isMobile ? {} : { 
                    scale: 1.1,
                    rotateY: 8,
                    rotateX: -5,
                  }}
                  whileTap={isMobile ? { scale: 0.95 } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="relative group"
                  style={{ transformStyle: shouldReduceMotion ? "flat" : "preserve-3d" }}
                >
                  {/* 스파클 효과 - 이미지 로드 후에만 표시, 모바일에서는 성능상 제한 */}
                  {isLoaded && !isMobile && <SparkleEffect reduceMotion={shouldReduceMotion} />}
                  
                  {/* 글로우 효과 - 모바일에서는 성능상 제한 */}
                  {!isMobile && (
                    <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                  )}
                  {isMobile && (
                    <div className="absolute -inset-1 bg-blue-200 rounded-xl opacity-0 group-active:opacity-30 transition-opacity duration-200" />
                  )}
                  
                  {/* 책 표지 */}
                  <div className="relative w-48 h-60 sm:w-56 sm:h-72 lg:w-64 lg:h-80 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                    {!imageError ? (
                      <Image
                        src="/images/book_1_cover.JPG"
                        alt="AI 자동화 n8n 워크플로우 북커버"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        className={`transition-transform duration-300 ${
                          isMobile ? 'group-active:scale-105' : 'group-hover:scale-105'
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white p-4 sm:p-6">
                        <BookOpen size={isMobile ? 40 : 48} className="mb-3 sm:mb-4" />
                        <h3 className="text-lg sm:text-xl font-bold text-center">AI 자동화</h3>
                        <p className="text-sm text-center mt-1 sm:mt-2">n8n 워크플로우</p>
                        <p className="text-xs text-center mt-2 sm:mt-4 opacity-80">실무 활용 가이드</p>
                      </div>
                    )}
                    
                    {/* 호버/터치 오버레이 */}
                    <div className={`absolute inset-0 bg-black/40 opacity-0 ${
                      isMobile ? 'group-active:opacity-100' : 'group-hover:opacity-100'
                    } transition-opacity flex items-center justify-center`}>
                      <div className="text-white text-center">
                        <BookOpen className="w-6 sm:w-8 h-6 sm:h-8 mx-auto mb-1 sm:mb-2" />
                        <p className="text-xs sm:text-sm">미리보기</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* 부유하는 아이콘들 - 이미지 로드 후에만 표시, 모바일에서는 성능상 제한 */}
                  {isLoaded && !isMobile && !shouldReduceMotion && (
                    <>
                      <motion.div
                        animate={{ 
                          y: [-5, 5, -5],
                          rotate: [0, 360]
                        }}
                        transition={{ 
                          duration: 6, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                        className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4"
                      >
                        <Star className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-500" />
                      </motion.div>
                      
                      <motion.div
                        animate={{ 
                          y: [5, -5, 5],
                          rotate: [360, 0]
                        }}
                        transition={{ 
                          duration: 8, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                        className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4"
                      >
                        <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 text-purple-500" />
                      </motion.div>
                    </>
                  )}
                </motion.div>
              </div>

              {/* 콘텐츠 섹션 */}
              <div className="flex flex-col justify-center space-y-4 sm:space-y-6 order-2 lg:order-2">
                {/* 타이틀 */}
                <div className="text-center lg:text-left">
                  <motion.h1
                    id="book-promotion-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4"
                  >
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      AI 자동화 마스터
                    </span>
                    <br />
                    <span className="text-xl sm:text-2xl lg:text-3xl text-gray-700">
                      출간기념 특별혜택
                    </span>
                  </motion.h1>
                  
                  {/* 혜택 텍스트 */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: shouldReduceMotion ? 0 : 0.4 }}
                    className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 border border-green-200"
                  >
                    <div className="text-center">
                      <p className="text-base sm:text-lg font-bold text-green-700 mb-1">
                        🎉 무료 진단+ AI CAMP 교육비 20% 할인
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        출간 기념 할인 - 30일 한정
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* 설명 */}
                <motion.p
                  id="book-promotion-description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 0.6 }}
                  className="text-sm sm:text-base text-gray-600 text-center lg:text-left leading-relaxed"
                >
                  n8n 워크플로우로 업무 자동화를 시작하고, AI CAMP에서 전문가가 되어보세요. 
                  실무에 바로 적용할 수 있는 실전 가이드와 체계적인 교육 프로그램으로 
                  여러분의 AI 자동화 여정을 완벽하게 지원합니다.
                </motion.p>

                {/* 액션 버튼들 - 모바일에서 더 큰 터치 영역 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 0.8 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
                >
                  {/* 책 구매하기 버튼 */}
                  <motion.div 
                    whileHover={isMobile ? {} : { scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      asChild
                      size="lg"
                      className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold ${
                        isMobile ? 'py-4 px-6 text-base' : 'py-4 text-base'
                      } shadow-lg focus:ring-2 focus:ring-blue-500 active:scale-95 transition-transform ${
                        isMobile ? 'touch-manipulation select-none' : ''
                      }`}
                      style={{
                        WebkitTapHighlightColor: 'transparent',
                        touchAction: 'manipulation'
                      }}
                    >
                      <Link 
                        href="/n8n_1-20.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center min-h-[44px] min-w-[44px]"
                        aria-label="n8n 워크플로우 책 PDF 미리보기 다운로드"
                        style={{
                          WebkitTapHighlightColor: 'transparent'
                        }}
                      >
                        <BookOpen className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                        <span className="text-sm sm:text-base">책 구매하기</span>
                        <ExternalLink className="w-3 sm:w-4 h-3 sm:h-4 ml-2" />
                      </Link>
                    </Button>
                  </motion.div>

                  {/* AI CAMP 버튼 */}
                  <motion.div 
                    whileHover={isMobile ? {} : { scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className={`w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-bold ${
                        isMobile ? 'py-4 px-6 text-base' : 'py-4 text-base'
                      } shadow-lg focus:ring-2 focus:ring-blue-500 active:scale-95 transition-transform ${
                        isMobile ? 'touch-manipulation select-none' : ''
                      }`}
                      style={{
                        WebkitTapHighlightColor: 'transparent',
                        touchAction: 'manipulation'
                      }}
                    >
                      <Link 
                        href="/diagnosis"
                        className="flex items-center justify-center min-h-[44px] min-w-[44px]"
                        aria-label="AI CAMP 무료 진단 시작하기"
                        style={{
                          WebkitTapHighlightColor: 'transparent'
                        }}
                      >
                        <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                        <span className="text-sm sm:text-base">AI CAMP 시작하기</span>
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>

                {/* 추가 안내 - 모바일에서는 더 간단하게 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 1.0 }}
                  className="text-center text-xs text-gray-500 mt-3 sm:mt-4"
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

export default BookPromotionBanner;