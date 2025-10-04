'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Download, ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  fileName: string;
}

export default function PDFPreviewModal({ isOpen, onClose, pdfUrl, fileName }: PDFPreviewModalProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setScale(1);
      setRotation(0);
      setCurrentPage(1);
    }
  }, [isOpen]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2147483649] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              📄 {fileName}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>페이지 {currentPage}</span>
              {totalPages > 0 && <span>/ {totalPages}</span>}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* 컨트롤 버튼들 */}
            <button
              onClick={handlePreviousPage}
              disabled={currentPage <= 1}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              title="이전 페이지"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              title="다음 페이지"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="축소"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            
            <span className="text-sm font-medium min-w-[60px] text-center">
              {Math.round(scale * 100)}%
            </span>
            
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="확대"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleRotate}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="회전"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              title="다운로드"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">다운로드</span>
            </button>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* PDF 뷰어 */}
        <div 
          className="flex-1 relative overflow-hidden"
          onWheel={handleWheel}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600">PDF 로딩 중...</span>
              </div>
            </div>
          )}
          
          <iframe
            ref={iframeRef}
            src={`${pdfUrl}#page=${currentPage}&zoom=${scale * 100}&view=FitH`}
            className="w-full h-full border-0"
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: 'center center',
            }}
            onLoad={() => setIsLoading(false)}
            title="PDF 미리보기"
          />
        </div>
        
        {/* 푸터 - 페이지 네비게이션 */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                마우스 휠로 확대/축소 가능
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage <= 1}
                className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                이전
              </button>
              
              <span className="text-sm text-gray-600 min-w-[80px] text-center">
                {currentPage} / {totalPages || '?'}
              </span>
              
              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
                className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                다음
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
