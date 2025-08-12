'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ConsultationRequestModal from '@/components/diagnosis/ConsultationRequestModal';

export default function BenchmarkDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const caseId = params.id as string;

  const handleConsultationRequest = () => {
    setShowConsultationModal(true);
  };

  const handleCloseConsultationModal = () => {
    setShowConsultationModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">벤치마크 상세 페이지</h1>
        <p className="text-gray-600 mb-6">
          요청하신 벤치마크 사례 (ID: {caseId})의 상세 페이지가 준비 중입니다.
        </p>
        <p className="text-gray-500 mb-8">
          곧 업종별 최적화된 성공사례의 상세 정보를 확인하실 수 있습니다.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => router.push('/benchmark')}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            벤치마크 목록으로 돌아가기
          </button>
          <button
            onClick={handleConsultationRequest}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            상담 신청하기
          </button>
        </div>
      </div>
      
      {showConsultationModal && (
        <ConsultationRequestModal
          isOpen={showConsultationModal}
          onClose={handleCloseConsultationModal}
          context="benchmark-detail"
          prefillData={{
            source: '벤치마크 상세',
            interest: '업종별 벤치마크',
            company: '',
            industry: '',
            subIndustry: ''
          }}
        />
      )}
    </div>
  );
}
