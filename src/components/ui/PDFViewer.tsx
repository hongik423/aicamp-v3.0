'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ZoomIn, ZoomOut, RotateCw, ExternalLink, BookOpen, MessageCircle, Sparkles, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
  description?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  title,
  description
}) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [pdfUrl, title]);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  }, []);

  const handleRotate = useCallback(() => {
    setRotation(prev => (prev + 90) % 360);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10004] bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <div className="flex flex-col h-full">
          {/* 상단 툴바 */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/95 backdrop-blur-md border-b border-gray-200 p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center space-x-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                  {description && (
                    <p className="text-sm text-gray-600">{description}</p>
                  )}
                </div>
              </div>

              {/* 액션 버튼들 */}
              <div className="flex items-center space-x-2">
                {/* 네비게이션 버튼들 */}
                <div className="hidden md:flex items-center space-x-2 mr-4">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                  >
                    <Link href="/consultation" className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>상담신청</span>
                    </Link>
                  </Button>
                  
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
                  >
                    <Link href="/ai-diagnosis" className="flex items-center space-x-1">
                      <Sparkles className="w-4 h-4" />
                      <span>AI역량진단</span>
                    </Link>
                  </Button>
                  
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                  >
                    <Link href="/" className="flex items-center space-x-1">
                      <Home className="w-4 h-4" />
                      <span>홈</span>
                    </Link>
                  </Button>
                </div>

                {/* PDF 컨트롤 버튼들 */}
                <div className="flex items-center space-x-1 border-r border-gray-300 pr-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleZoomOut}
                    disabled={zoom <= 0.5}
                    title="축소"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  
                  <span className="text-sm text-gray-600 min-w-[60px] text-center">
                    {Math.round(zoom * 100)}%
                  </span>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleZoomIn}
                    disabled={zoom >= 3}
                    title="확대"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRotate}
                    title="회전"
                  >
                    <RotateCw className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                >
                  <Download className="w-4 h-4 mr-1" />
                  다운로드
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* PDF 뷰어 영역 */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex-1 p-4 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-5xl mx-auto">
              <div 
                className={cn(
                  "bg-white rounded-lg shadow-2xl overflow-hidden transition-transform duration-300 ease-in-out",
                  "origin-center"
                )}
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`
                }}
              >
                <iframe
                  src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH`}
                  className="w-full h-[80vh] border-0"
                  title={title}
                />
              </div>
            </div>
          </motion.div>

          {/* 모바일 액션 버튼들 */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="bg-blue-50 border-blue-200 text-blue-700"
              >
                <Link href="/consultation" className="flex items-center justify-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>상담신청</span>
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="sm"
                className="bg-purple-50 border-purple-200 text-purple-700"
              >
                <Link href="/ai-diagnosis" className="flex items-center justify-center space-x-1">
                  <Sparkles className="w-4 h-4" />
                  <span>AI역량진단</span>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PDFViewer;
