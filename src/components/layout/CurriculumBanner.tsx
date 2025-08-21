'use client';

import React, { useState, useEffect } from 'react';
import { Download, BookOpen, Sparkles, X } from 'lucide-react';

export default function CurriculumBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  // 배너 항상 표시 (로컬 스토리지 무시)
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // 새 탭에서 PDF 열기 (더 안정적)
      window.open('/images/n8n_Curriculum.pdf', '_blank');
    } catch (error) {
      console.error('다운로드 중 오류 발생:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('curriculum-banner-closed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-[2147483648] pointer-events-none isolate" aria-live="polite">
      <div className="mx-auto max-w-screen-2xl m-1 sm:m-2 pointer-events-auto shadow-2xl border-4 border-yellow-400 rounded-2xl overflow-hidden animate-in slide-in-from-top-2 duration-200">
        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white p-4 sm:p-5 lg:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 relative overflow-hidden">
          {/* 배경 장식 효과 */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/30 via-orange-300/30 to-red-300/30 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full -translate-y-20 translate-x-20 animate-bounce"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/20 rounded-full translate-y-16 -translate-x-16 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/10 rounded-full -translate-x-12 -translate-y-12 animate-spin"></div>
          
          {/* 닫기 버튼 */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 z-20 p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
            aria-label="배너 닫기"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          
          {/* 아이콘 */}
          <div className="relative z-10 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white/30 rounded-full backdrop-blur-sm flex-shrink-0 shadow-lg">
            <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          
          {/* 콘텐츠 */}
          <div className="flex-1 relative z-10 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-200 animate-pulse flex-shrink-0" />
              <h3 className="font-bold text-lg sm:text-xl lg:text-2xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] truncate">
                🚀 AI 자동화의 끝판왕! n8n 커리큘럼
              </h3>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] font-medium">
              국내최초 한국어판! 업무 자동화의 핵심 n8n을 활용한 AI 워크플로우 구축 가이드
            </p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-xs sm:text-sm bg-white/20 px-2 py-1 rounded-full text-white font-medium">
                ⭐ 국내최초 한국어판
              </span>
              <span className="text-xs sm:text-sm bg-white/20 px-2 py-1 rounded-full text-white font-medium">
                📚 실무 즉시 적용
              </span>
              <span className="text-xs sm:text-sm bg-white/20 px-2 py-1 rounded-full text-white font-medium">
                🎯 전문가 3인 집필
              </span>
            </div>
          </div>
          
          {/* 다운로드 버튼 */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="relative z-10 flex items-center gap-3 bg-white/30 hover:bg-white/40 backdrop-blur-sm border-2 border-white/50 hover:border-white/70 text-white font-bold px-4 py-3 sm:px-6 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg"
          >
            {isDownloading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="hidden sm:inline">열는 중...</span>
                <span className="sm:hidden">열는 중...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span className="hidden sm:inline">지금 바로 보기</span>
                <span className="sm:hidden">바로 보기</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
