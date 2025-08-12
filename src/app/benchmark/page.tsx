'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ConsultationRequestModal from '@/components/diagnosis/ConsultationRequestModal';

export default function BenchmarkPage() {
  const router = useRouter();
  const [showConsultationModal, setShowConsultationModal] = useState(false);

  const handleConsultationRequest = () => {
    setShowConsultationModal(true);
  };

  const handleCloseConsultationModal = () => {
    setShowConsultationModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            업종별 AI 성공사례 벤치마크
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-600">
            실제 기업들이 참조할 수 있는 업종별 최적화된 AI & N8N 도입 모델을 확인하세요
          </p>
          <p className="text-lg text-gray-500 mb-8">
            IT/기술 및 제조/생산 업종별 벤치마크 사례가 준비 중입니다. 곧 업종별 최적화된 성공사례를 확인하실 수 있습니다.
          </p>
          <button
            onClick={handleConsultationRequest}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            상담 신청하기
          </button>
        </div>
      </div>
      
      {showConsultationModal && (
        <ConsultationRequestModal
          isOpen={showConsultationModal}
          onClose={handleCloseConsultationModal}
          context="benchmark"
          prefillData={{
            source: '벤치마크 성공사례',
            interest: '업종별 벤치마크'
          }}
        />
      )}
    </div>
  );
}
