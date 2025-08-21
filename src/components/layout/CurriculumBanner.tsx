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
      <div className="mx-auto max-w-screen-2xl m-1 sm:m-2 pointer-events-auto shadow-apple-hover border border-gray-200 rounded-3xl overflow-hidden animate-in slide-in-from-top-2 duration-200 bg-white">
        <div className="bg-gradient-to-r from-aicamp-navy to-aicamp-purple text-white p-4 sm:p-5 lg:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 relative overflow-hidden">
          {/* 미니멀 배경 장식 효과 */}
          <div className="absolute inset-0 bg-gradient-to-r from-aicamp-navy/90 to-aicamp-purple/90"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          {/* 닫기 버튼 */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 z-20 p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
            aria-label="배너 닫기"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          
          {/* 아이콘 */}
          <div className="relative z-10 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-2xl backdrop-blur-sm flex-shrink-0 shadow-apple">
            <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          
          {/* 콘텐츠 */}
          <div className="flex-1 relative z-10 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-aicamp-teal animate-pulse flex-shrink-0" />
              <h3 className="font-bold text-lg sm:text-xl lg:text-2xl text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] truncate">
                n8n 커리큘럼
              </h3>
            </div>
            <p className="text-sm sm:text-base text-white/90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] font-medium">
              업무 자동화의 핵심! AI 워크플로우 구축 가이드
            </p>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-xs bg-white/15 px-2 py-1 rounded-lg text-white/90 font-medium backdrop-blur-sm">
                국내최초 한국어판
              </span>
              <span className="text-xs bg-white/15 px-2 py-1 rounded-lg text-white/90 font-medium backdrop-blur-sm">
                실무 즉시 적용
              </span>
              <span className="text-xs bg-white/15 px-2 py-1 rounded-lg text-white/90 font-medium backdrop-blur-sm">
                전문가 3인 집필
              </span>
            </div>
          </div>
          
          {/* 다운로드 버튼 */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="relative z-10 flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 hover:border-white/50 text-white font-semibold px-4 py-2.5 sm:px-5 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-apple hover:shadow-apple-hover disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="hidden sm:inline">열는 중...</span>
                <span className="sm:hidden">열는 중...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">PDF 보기</span>
                <span className="sm:hidden">보기</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
