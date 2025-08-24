'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { allBenchmarkCaseDetails } from '@/data/success-cases/benchmark-cases-index';
import SuccessCaseDetailPage from '@/components/success-cases/SuccessCaseDetailPage';
import ConsultationRequestModal from '@/components/diagnosis/ConsultationRequestModal';
import { SuccessCaseDetail } from '@/types/success-case.types';

export default function BenchmarkDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const caseId = params.id as string;
  const caseData = allBenchmarkCaseDetails[caseId];

  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            벤치마크 사례를 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 mb-6">
            요청하신 벤치마크 사례가 존재하지 않거나 삭제되었을 수 있습니다.
          </p>
          <button
            onClick={() => router.push('/benchmark')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            벤치마크 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const handleConsultationRequest = () => {
    setShowConsultationModal(true);
  };

  const handleCloseConsultationModal = () => {
    setShowConsultationModal(false);
  };

  return (
    <div>
      <SuccessCaseDetailPage
        caseData={caseData}
        onConsultationRequest={handleConsultationRequest}
      />
      
      {showConsultationModal && (
        <ConsultationRequestModal
          isOpen={showConsultationModal}
          onClose={handleCloseConsultationModal}


        />
      )}
    </div>
  );
}
