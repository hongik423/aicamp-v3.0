'use client';

import React, { useState, useEffect } from 'react';
import { X, Download, BookOpen, Sparkles, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface CurriculumSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CurriculumSidePanel({ isOpen, onClose }: CurriculumSidePanelProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setCurrentPage(1);
      setScale(1);
    }
  }, [isOpen]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/images/n8n_Curriculum.pdf';
    link.download = 'AICAMP_n8n_커리큘럼.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, 8)); // 총 8페이지
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2147483649] bg-black/50 backdrop-blur-sm flex items-center justify-end">
      <div className="w-full max-w-4xl h-full bg-white shadow-2xl flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6" />
            <div>
              <h2 className="text-lg font-bold">AICAMP n8n 커리큘럼</h2>
              <p className="text-sm text-blue-100">업무 자동화의 핵심! AI 워크플로우 구축 가이드</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* 페이지 네비게이션 */}
            <button
              onClick={handlePreviousPage}
              disabled={currentPage <= 1}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <span className="text-sm font-medium min-w-[60px] text-center">
              {currentPage} / 8
            </span>
            
            <button
              onClick={handleNextPage}
              disabled={currentPage >= 8}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            <div className="w-px h-6 bg-white/30 mx-2"></div>
            
            {/* 줌 컨트롤 */}
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            
            <span className="text-sm font-medium min-w-[60px] text-center">
              {Math.round(scale * 100)}%
            </span>
            
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            
            <div className="w-px h-6 bg-white/30 mx-2"></div>
            
            {/* 다운로드 버튼 */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">다운로드</span>
            </button>
            
            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* PDF 뷰어 */}
        <div className="flex-1 relative overflow-hidden bg-gray-50">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600">PDF 로딩 중...</span>
              </div>
            </div>
          )}
          
          <div className="w-full h-full flex justify-center items-start p-4 overflow-auto">
            <iframe
              src={`/images/n8n_Curriculum.pdf#page=${currentPage}&zoom=${scale * 100}`}
              className="border-0 rounded-lg shadow-lg"
              style={{
                width: `${100 * scale}%`,
                height: `${100 * scale}%`,
                minHeight: '600px',
                opacity: isLoading ? 0 : 1,
                transition: 'opacity 0.3s ease-in-out',
              }}
              onLoad={() => setIsLoading(false)}
              title="n8n 커리큘럼 PDF"
            />
          </div>
        </div>
        
        {/* 푸터 - 사용법 안내 */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-600">
                마우스 휠로 스크롤, Ctrl+휠로 확대/축소
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.open('/images/n8n_Curriculum.pdf', '_blank')}
                className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
              >
                새 탭에서 열기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
