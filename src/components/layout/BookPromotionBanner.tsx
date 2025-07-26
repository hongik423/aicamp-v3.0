'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  Cpu, 
  Target, 
  Zap, 
  Award,
  Clock,
  CheckCircle,
  Star,
  Gift,
  Users,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

const BookPromotionBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('falling');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  // 페이지 로드 즉시 표시
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // 애니메이션 단계 관리
  useEffect(() => {
    if (!isVisible) return;

    const phaseTimer = setTimeout(() => {
      setAnimationPhase('landing');
      setTimeout(() => {
        setAnimationPhase('settled');
      }, 1000);
    }, 1500);

    return () => clearTimeout(phaseTimer);
  }, [isVisible]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  // 10초 후 자동으로 미니멈화
  useEffect(() => {
    if (!isVisible) return;

    const autoMinimizeTimer = setTimeout(() => {
      setIsMinimized(true);
    }, 10000);

    return () => clearTimeout(autoMinimizeTimer);
  }, [isVisible]);

  // 드래그 처리 함수들
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isMinimized) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setIsDragging(true);
    setStartPosition({ x: clientX - dragPosition.x, y: clientY - dragPosition.y });
    
    // 드래그 중 텍스트 선택 방지
    document.body.style.userSelect = 'none';
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const newX = clientX - startPosition.x;
    const newY = clientY - startPosition.y;
    
    // 화면 경계 제한
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;
    
    setDragPosition({
      x: Math.max(-50, Math.min(newX, maxX)),
      y: Math.max(-50, Math.min(newY, maxY))
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    document.body.style.userSelect = '';
  };

  // 드래그 이벤트 리스너 등록
  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => handleDragMove(e);
      const handleTouchMove = (e: TouchEvent) => handleDragMove(e);
      const handleMouseUp = () => handleDragEnd();
      const handleTouchEnd = () => handleDragEnd();

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, startPosition]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] pointer-events-none"
          style={{ isolation: 'isolate' }}
        >
          {!isMinimized ? (
            <>
              {/* 배경 오버레이 - 터치 친화적 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-md"
                onClick={(e) => {
                  if (e.target === e.currentTarget && !isDragging) {
                    setIsVisible(false);
                  }
                }}
                onTouchEnd={(e) => {
                  if (e.target === e.currentTarget && !isDragging) {
                    setIsVisible(false);
                  }
                }}
              />

              {/* 메인 배너 - 드래그 가능한 중앙 정렬 */}
              <div className="absolute inset-0 flex items-start justify-center pt-0 sm:pt-6 px-4 sm:px-6">
                                  <motion.div
                    initial={{ 
                      y: -800,
                      rotateX: -15,
                      rotateY: 10,
                      scale: 0.8,
                      opacity: 0
                    }}
                    animate={{ 
                      y: animationPhase === 'falling' ? -50 : animationPhase === 'landing' ? 10 : 0,
                      rotateX: animationPhase === 'falling' ? -15 : animationPhase === 'landing' ? 5 : 0,
                      rotateY: animationPhase === 'falling' ? 10 : animationPhase === 'landing' ? -2 : 0,
                      scale: animationPhase === 'falling' ? 0.9 : animationPhase === 'landing' ? 1.01 : 1,
                      opacity: 1
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                      duration: animationPhase === 'falling' ? 1.5 : 0.8
                    }}
                    className="w-full max-w-6xl mx-auto -mt-10 relative"
                    style={{
                      transform: `translate(${dragPosition.x}px, ${dragPosition.y}px)`,
                      cursor: isDragging ? 'grabbing' : 'grab',
                      userSelect: isDragging ? 'none' : 'auto',
                      touchAction: 'none' // 스크롤 방지
                    }}
                    onMouseDown={handleDragStart}
                    onTouchStart={handleDragStart}
                  >
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
                     style={{ 
                       boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)' 
                     }}>
                  
                  {/* 닫기 버튼 - 터치 친화적 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsVisible(false);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-14 h-14 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white active:scale-95 transition-all duration-200 shadow-lg group touch-manipulation"
                    title="닫기"
                    aria-label="배너 닫기"
                  >
                    <X className="w-7 h-7 sm:w-6 sm:h-6 text-gray-600 group-hover:text-gray-800" />
                  </button>

                  {/* 미니멈화 버튼 - 터치 친화적 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMinimized(true);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    className="absolute top-3 right-16 sm:top-4 sm:right-16 z-20 w-14 h-14 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white active:scale-95 transition-all duration-200 shadow-lg group touch-manipulation"
                    title="최소화"
                    aria-label="배너 최소화"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-7 h-1 sm:w-7 sm:h-1 bg-gray-600 rounded-full group-hover:bg-gray-800"
                    />
                  </button>

                  {/* 간단한 3열 레이아웃 - 모바일에서 세로 스크롤 */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px] max-h-[90vh] overflow-y-auto"
                       style={{ 
                         touchAction: 'pan-y',
                         WebkitOverflowScrolling: 'touch'
                       }}
                  >
                    
                                         {/* 책표지 섹션 */}
                     <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6 flex items-center justify-center">
                       <div className="text-center">
                         {/* 책표지 이미지 - PDF 링크 수정 */}
                         <div 
                           onClick={(e) => {
                             e.stopPropagation();
                             // PDF를 새 탭에서 열기
                             window.open('/n8n_1-20.pdf', '_blank', 'noopener,noreferrer');
                           }}
                           onTouchStart={(e) => e.stopPropagation()}
                           className="block cursor-pointer"
                           role="button"
                           tabIndex={0}
                           onKeyDown={(e) => {
                             if (e.key === 'Enter' || e.key === ' ') {
                               e.preventDefault();
                               window.open('/n8n_1-20.pdf', '_blank', 'noopener,noreferrer');
                             }
                           }}
                           aria-label="n8n 책자 PDF 다운로드"
                         >
                           <motion.div
                             initial={{ rotateY: -20, scale: 0.8 }}
                             animate={{ rotateY: 0, scale: 1 }}
                             transition={{ delay: 1, duration: 1 }}
                             className="relative w-64 h-80 mx-auto mb-6 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer group border-2 border-white/20"
                           >
                          <img 
                            src="/images/book_1_cover.JPG"
                            alt="AI 자동화의 끝판왕! n8n을 활용한 업무혁신 - 책표지"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                              // 이미지 로드 실패 시 대체 컨텐츠 표시
                              const img = e.currentTarget;
                              img.style.display = 'none';
                              const fallback = img.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                          
                          {/* 이미지 로드 실패 시 대체 컨텐츠 */}
                          <div className="hidden absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex-col items-center justify-center p-4 sm:p-6 text-white text-center">
                            <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 opacity-80" />
                            <h3 className="text-lg sm:text-xl font-bold mb-2">AI 자동화의 끝판왕!</h3>
                            <h4 className="text-base sm:text-lg mb-3">n8n을 활용한 업무혁신</h4>
                            <div className="text-sm opacity-80">
                              <p>홍용기 · 이후경 · 홍정민</p>
                              <div className="mt-2 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-xs">국내최초 한국어판</div>
                            </div>
                          </div>
                          
                          {/* 글로우 효과 */}
                          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* PDF 미리보기 힌트 */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/50 backdrop-blur-sm">
                            <div className="text-center text-white">
                              <div className="text-2xl mb-2">📖</div>
                              <div className="text-sm font-bold">PDF 미리보기</div>
                              <div className="text-xs opacity-80">클릭하여 내용 확인</div>
                            </div>
                          </div>
                          
                          {/* 반짝이는 효과 */}
                          <motion.div
                            animate={{
                              rotate: [0, 360],
                              scale: [1, 1.2, 1]
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: 'linear'
                            }}
                            className="absolute top-2 right-2 sm:top-4 sm:right-4"
                          >
                            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 drop-shadow-lg" />
                          </motion.div>
                        </motion.div>
                        </a>

                        {/* 국내최초 뱃지 */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
                          className="text-center"
                        >
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full shadow-lg animate-pulse text-sm">
                            <Star className="w-4 h-4" />
                            <span>🔥 국내최초 한국어판</span>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* AI CAMP 연관성 섹션 */}
                    <div className="p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center relative overflow-hidden">
                      {/* 배경 패턴 */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-4 left-4 w-12 h-12 border-2 border-blue-500 rounded-full"></div>
                        <div className="absolute bottom-4 right-4 w-8 h-8 bg-purple-500 rounded-full"></div>
                        <div className="absolute top-1/2 right-8 w-6 h-6 bg-green-500 rotate-45"></div>
                      </div>

                                              <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2 }}
                        className="space-y-4 relative z-10"
                      >
                        {/* 임팩트 헤드라인 */}
                        <div className="text-center mb-4">
                          <motion.div
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-full shadow-lg mb-3 text-sm"
                          >
                            <span className="animate-pulse">🔥</span>
                            <span>지금 상담신청 시 특별혜택</span>
                          </motion.div>
                          
                          <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              매출 30% 증대!
                            </span><br />
                            <span className="text-gray-800">AI 자동화로 업무혁신 실현</span>
                          </h3>
                          
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            <strong className="text-blue-600">이후경 교장(경영지도사)</strong>의 28년 실무경험과<br />
                            <strong className="text-purple-600">n8n 전문 교육</strong>을 통해 확실한 성과를 보장합니다
                          </p>
                        </div>

                        {/* 성과 지표 */}
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-blue-100 shadow-sm"
                          >
                            <div className="text-2xl font-bold text-blue-600 mb-1">300%</div>
                            <div className="text-xs text-gray-600">업무효율 증대</div>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-green-100 shadow-sm"
                          >
                            <div className="text-2xl font-bold text-green-600 mb-1">72시간</div>
                            <div className="text-xs text-gray-600">월 절약시간</div>
                          </motion.div>
                        </div>

                        {/* 핵심 혜택 */}
                        <div className="space-y-2">
                          {[
                            { icon: "🎯", text: "맞춤형 AI 자동화 시스템 구축", highlight: "무료 설계" },
                            { icon: "💰", text: "정부지원금 5억원 확보 노하우", highlight: "실전 공개" },
                            { icon: "🚀", text: "n8n 실무 프로젝트 완주", highlight: "100% 보장" }
                          ].map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 2.2 + index * 0.1 }}
                              className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-white/50"
                            >
                              <span className="text-lg flex-shrink-0">{item.icon}</span>
                              <span className="text-sm text-gray-700 flex-1">{item.text}</span>
                              <span className="text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 px-2 py-1 rounded-full whitespace-nowrap">
                                {item.highlight}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        {/* 긴급성 메시지 */}
                        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400 p-3 sm:p-4 rounded-r-lg">
                          <div className="flex items-start gap-2">
                            <span className="text-red-500 text-lg animate-pulse">⚡</span>
                            <div>
                              <div className="text-sm sm:text-base font-bold text-red-700 mb-1">
                                한정 특가! 선착순 10명만
                              </div>
                              <div className="text-xs sm:text-sm text-red-600">
                                이달 말까지 상담신청 시 <strong>AI 교육비 20% 할인</strong> + <strong>무료 컨설팅</strong>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CTA 버튼 - 상담신청으로 연결 수정 */}
                        <div className="text-center pt-2">
                          <Link href="/consultation" className="inline-block">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onMouseDown={(e) => e.stopPropagation()}
                              onTouchStart={(e) => e.stopPropagation()}
                              className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-base relative overflow-hidden group"
                            >
                              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                              <span className="relative flex items-center gap-2">
                                <span className="animate-pulse">🔥</span>
                                <span>지금 바로 상담신청</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </motion.button>
                          </Link>
                        </div>

                        {/* 사회적 증거 */}
                        <div className="text-center pt-2">
                          <div className="text-xs text-gray-500">
                            ✨ <strong className="text-blue-600">2,500+</strong> 기업이 선택한 AI CAMP 
                            • <strong className="text-green-600">98%</strong> 고객 만족도
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* 프로모션 혜택 섹션 */}
                    <div className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 flex flex-col justify-center">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.5 }}
                        className="space-y-4"
                      >
                        <div className="text-center">
                          <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-full shadow-lg mb-4 text-sm"
                          >
                            <Gift className="w-4 h-4" />
                            <span>📚 출간 기념 특별 혜택</span>
                          </motion.div>
                          
                          <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                              무료진단 + 교육비 20% 할인
                            </span>
                          </h3>
                          
                          <div className="flex items-center justify-center gap-2 text-sm text-red-600 font-semibold">
                            <Clock className="w-4 h-4" />
                            <span>30일 한정 특가</span>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-4 border-2 border-orange-200">
                          <div className="text-center">
                            <div className="text-xs text-gray-600 mb-1">총 혜택 가치</div>
                            <div className="text-2xl font-bold text-orange-600 mb-1">80만원 상당</div>
                            <div className="text-xs text-gray-500">AI CAMP 서비스 + 책 패키지</div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {/* 책+AI CAMP 패키지 버튼 - 상담신청으로 연결 */}
                          <Link 
                            href="/consultation"
                            className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-center text-sm relative overflow-hidden group"
                            onTouchStart={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}
                          >
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                            <span className="relative flex items-center justify-center gap-2">
                              📖
                              <span>책 + AI CAMP 패키지 신청</span>
                              <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded-full">상담신청</span>
                            </span>
                          </Link>
                          
                          {/* 무료AI 진단 버튼 - AI 무료진단으로 연결 */}
                          <Link href="/diagnosis" className="block">
                            <button 
                              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-sm relative overflow-hidden group"
                              onTouchStart={(e) => e.stopPropagation()}
                              onMouseDown={(e) => e.stopPropagation()}
                            >
                              <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                              <span className="relative flex items-center justify-center gap-2">
                                🎯
                                <span>무료 AI 진단 먼저 받기</span>
                                <span className="text-xs bg-white text-green-600 px-2 py-1 rounded-full">무료</span>
                              </span>
                            </button>
                          </Link>
                        </div>

                        <div className="text-center text-xs text-gray-500 space-y-1">
                          <div>✨ 책 구매 시 AI CAMP 혜택 자동 적용</div>
                          <div>📞 문의: 010-9251-9743 (이후경 교장)</div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                                  </div>
                </motion.div>
              </div>
            </>
          ) : (
            /* 미니멈화된 플로팅 버튼 - 책자 배너 복귀 기능 수정 */
            <motion.button
              initial={{ scale: 0, x: 100 }}
              animate={{ scale: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(false);
                setIsVisible(true);
              }}
              onTouchEnd={(e) => {
                e.stopPropagation();
                setIsMinimized(false);
                setIsVisible(true);
              }}
              className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-2xl z-[99999] flex items-center justify-center group touch-manipulation active:scale-75"
              style={{ 
                isolation: 'isolate',
                touchAction: 'manipulation' // 더블 탭 줌 방지
              }}
              title="책자 홍보 배너 다시 보기"
              aria-label="AI 자동화 책자 홍보 배너 열기"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              </motion.div>
              
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-red-500 text-white text-[8px] sm:text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                📖
              </div>
              
              <div className="absolute right-full mr-2 sm:mr-4 top-1/2 transform -translate-y-1/2 bg-black/90 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
                AI 자동화 책자 배너 보기
                <br />
                <span className="text-xs opacity-75">클릭하여 다시 열기</span>
              </div>
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookPromotionBanner; 