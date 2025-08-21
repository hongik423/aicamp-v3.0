'use client';

import React, { useState, useEffect } from 'react';
import { Download, BookOpen, Sparkles, X, Eye } from 'lucide-react';
import SimplePDFPreviewModal from './SimplePDFPreviewModal';

export default function CurriculumBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // 로컬 스토리지에서 배너 닫기 상태 확인
  useEffect(() => {
    const bannerClosed = localStorage.getItem('curriculum-banner-closed');
    if (bannerClosed) {
      setIsVisible(false);
    }
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const link = document.createElement('a');
      link.href = '/images/n8n_Curriculum.pdf';
      link.download = 'AICAMP_n8n_커리큘럼.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // 다운로드 후에도 배너는 계속 유지 (사용자가 직접 닫을 때까지)
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

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-[2147483648] pointer-events-none isolate" aria-live="polite">
      <div className="mx-auto max-w-screen-2xl m-1 sm:m-2 pointer-events-auto shadow-xl border-2 border-blue-500 rounded-xl overflow-hidden animate-in slide-in-from-top-2 duration-500">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-3 sm:p-4 lg:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 relative overflow-hidden">
          {/* 배경 장식 효과 */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          {/* 닫기 버튼 */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 z-20 p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
            aria-label="배너 닫기"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          
          {/* 아이콘 */}
          <div className="relative z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full backdrop-blur-sm flex-shrink-0">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          
          {/* 콘텐츠 */}
          <div className="flex-1 relative z-10 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse flex-shrink-0" />
              <h3 className="font-bold text-base sm:text-lg lg:text-xl text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] truncate">
                🎓 AICAMP n8n 커리큘럼 무료 다운로드
              </h3>
            </div>
            <p className="text-xs sm:text-sm lg:text-base text-blue-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
              업무 자동화의 핵심! n8n을 활용한 AI 워크플로우 구축 가이드
            </p>
          </div>
          
          {/* 버튼 그룹 */}
          <div className="relative z-10 flex items-center gap-2 flex-shrink-0">
            {/* 미리보기 버튼 */}
            <button
              onClick={handlePreview}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 hover:border-white/50 text-white font-semibold px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              title="PDF 미리보기"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">미리보기</span>
              <span className="sm:hidden">보기</span>
            </button>
            
            {/* 다운로드 버튼 */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 hover:border-white/50 text-white font-semibold px-3 py-2 sm:px-4 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="hidden sm:inline">다운로드 중...</span>
                  <span className="sm:hidden">받는 중...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">다운로드</span>
                  <span className="sm:hidden">받기</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* PDF 미리보기 모달 */}
      <SimplePDFPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        pdfUrl="/images/n8n_Curriculum.pdf"
        fileName="AICAMP_n8n_커리큘럼.pdf"
      />
    </div>
  );
}
