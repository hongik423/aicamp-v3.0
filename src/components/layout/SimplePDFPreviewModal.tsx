'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Download, ZoomIn, ZoomOut, RotateCw, FileText } from 'lucide-react';

interface SimplePDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  fileName: string;
}

export default function SimplePDFPreviewModal({ isOpen, onClose, pdfUrl, fileName }: SimplePDFPreviewModalProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setError(null);
      setScale(1);
      setRotation(0);
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

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError('PDF 파일을 불러올 수 없습니다.');
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.ctrlKey || e.metaKey) {
      // Ctrl/Cmd + 휠로 확대/축소
      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2147483649] bg-white flex flex-col">
      {/* 헤더 - 최소한의 공간만 사용 */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {fileName}
          </h2>
        </div>
        
        <div className="flex items-center gap-1">
          {/* 컨트롤 버튼들 - 컴팩트하게 */}
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="축소"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          
          <span className="text-sm font-medium min-w-[50px] text-center">
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
          
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          
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
      
      {/* PDF 뷰어 - 최대 공간 활용 */}
      <div 
        className="flex-1 relative bg-gray-50"
        onWheel={handleWheel}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">PDF 로딩 중...</span>
            </div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-red-600 font-medium">{error}</p>
              <p className="text-gray-500 text-sm mt-2">PDF 파일을 확인해주세요.</p>
              <button
                onClick={() => window.open(pdfUrl, '_blank')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                새 탭에서 열기
              </button>
            </div>
          </div>
        )}
        
        {/* PDF iframe - 여백 없이 최대 크기 */}
        <iframe
          ref={iframeRef}
          src={`${pdfUrl}#zoom=${scale * 100}&view=FitH`}
          className="w-full h-full border-0"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center center',
          }}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          title="PDF 미리보기"
        />
      </div>
    </div>
  );
}
