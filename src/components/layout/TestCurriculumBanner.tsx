'use client';

import React, { useState } from 'react';
import { Download, X, Eye } from 'lucide-react';

export default function TestCurriculumBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleDownload = () => {
    console.log('다운로드 버튼 클릭됨');
    const link = document.createElement('a');
    link.href = '/images/n8n_Curriculum.pdf';
    link.download = 'AICAMP_n8n_커리큘럼.pdf';
    link.click();
  };

  const handlePreview = () => {
    console.log('미리보기 버튼 클릭됨');
    setIsPreviewOpen(true);
  };

  const handleClose = () => {
    console.log('닫기 버튼 클릭됨');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-[2147483648] bg-blue-600 text-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold">🎓 AICAMP n8n 커리큘럼 테스트</h3>
          <p className="text-sm">업무 자동화의 핵심! n8n을 활용한 AI 워크플로우 구축 가이드</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handlePreview}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg"
          >
            <Eye className="w-4 h-4" />
            미리보기
          </button>
          
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg"
          >
            <Download className="w-4 h-4" />
            다운로드
          </button>
          
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/20 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 간단한 미리보기 모달 */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[2147483649] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white text-black rounded-lg p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">PDF 미리보기</h2>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <iframe
              src="/images/n8n_Curriculum.pdf"
              className="w-full h-96 border rounded-lg"
              title="PDF 미리보기"
            />
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => window.open('/images/n8n_Curriculum.pdf', '_blank')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                새 탭에서 열기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
