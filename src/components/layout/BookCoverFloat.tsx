'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, BookOpen } from 'lucide-react';

const BookCoverFloat: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 컴포넌트 마운트 후 3초 뒤 표시
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
            onClick={() => setIsVisible(false)}
          />

          {/* 책표지 컨테이너 */}
          <motion.div
            initial={{ 
              scale: 0.3, 
              opacity: 0, 
              y: 200,
              rotateY: -45,
              rotateX: 15
            }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
              rotateY: 0,
              rotateX: 0
            }}
            exit={{ 
              scale: 0.3, 
              opacity: 0, 
              y: 200,
              rotateY: 45,
              rotateX: -15
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 25,
              duration: 1.2
            }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          >
            <div className="relative max-w-md w-full">
              {/* 닫기 버튼 */}
              <button
                onClick={() => setIsVisible(false)}
                className="absolute -top-4 -right-4 z-10 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-lg group"
                title="닫기"
                aria-label="책표지 닫기"
              >
                <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
              </button>

              {/* 책표지 - PDF 링크 */}
              <a
                href="/n8n_1-20.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open('/n8n_1-20.pdf', '_blank');
                }}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: -5,
                    transition: { duration: 0.3 }
                  }}
                  className="relative bg-white rounded-2xl shadow-2xl overflow-hidden group cursor-pointer transform-gpu"
                  style={{ perspective: '1000px' }}
                >
                  {/* 글로우 효과 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-transparent to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  
                  {/* 반짝이는 효과 */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                    className="absolute top-4 right-4 z-20"
                  >
                    <Sparkles className="w-8 h-8 text-yellow-400 drop-shadow-lg" />
                  </motion.div>

                  {/* 책 이미지 */}
                  <img 
                    src="/images/book_1_cover.JPG?v=3"
                    alt="AI 자동화의 끝판왕! n8n을 활용한 업무혁신"
                    className="w-full h-auto object-cover rounded-2xl transform transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // 이미지 로드 실패 시 대체 컨텐츠
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  
                  {/* PDF 열기 힌트 오버레이 */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/50 backdrop-blur-sm z-30">
                    <div className="text-center text-white">
                      <div className="text-2xl mb-2 font-bold">책</div>
                      <div className="text-sm font-bold">PDF 미리보기</div>
                      <div className="text-xs opacity-80">클릭하여 내용 확인</div>
                    </div>
                  </div>
                
                {/* 이미지 로드 실패 시 대체 컨텐츠 */}
                <div className="hidden w-full aspect-[3/4] bg-gradient-to-br from-blue-600 to-purple-700 flex-col items-center justify-center p-8 text-white text-center">
                  <BookOpen className="w-16 h-16 mb-4 opacity-80" />
                  <h3 className="text-2xl font-bold mb-2">AI 자동화의 끝판왕!</h3>
                  <h4 className="text-xl mb-4">n8n을 활용한 업무혁신</h4>
                  <div className="text-sm opacity-80">
                    <p>홍용기 · 이후경 · 홍정민</p>
                    <p className="mt-2 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold">국내최초 한국어판</p>
                  </div>
                </div>

                {/* 하단 액션 영역 */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6 text-white"
                >
                  <h3 className="text-lg font-bold mb-2">무료 진단+ AI CAMP 교육비 20% 할인</h3>
                  <p className="text-sm opacity-90 mb-4">출간 기념 할인 - 30일 한정</p>
                  
                  <div className="flex gap-3">
                    <a 
                      href="https://bookk.co.kr/book/view/112574"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 text-sm"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>책 구매하기</span>
                    </a>
                    
                    <button
                      onClick={() => {
                        setIsVisible(false);
                        // AI CAMP 서비스로 이동
                        window.location.href = '/services/ai-productivity';
                      }}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 text-sm"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>AI CAMP</span>
                    </button>
                  </div>
                </motion.div>

                  {/* 3D 효과를 위한 그림자 */}
                  <div className="absolute inset-0 rounded-2xl shadow-inner opacity-30 pointer-events-none"></div>
                </motion.div>
              </a>

              {/* 부유하는 파티클 효과 */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/60 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + i * 10}%`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookCoverFloat; 