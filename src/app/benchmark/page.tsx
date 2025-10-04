'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BenchmarkShowcase from '@/components/benchmark/BenchmarkShowcase';
import ConsultationRequestModal from '@/components/diagnosis/ConsultationRequestModal';
import { SuccessCaseDetail } from '@/types/success-case.types';

export default function BenchmarkPage() {
  const router = useRouter();
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState<SuccessCaseDetail | null>(null);

  const handleCaseSelect = (caseData: SuccessCaseDetail) => {
    // 벤치마크 사례 상세 페이지로 이동
    router.push(`/benchmark/${caseData.id}`);
  };

  const handleConsultationRequest = () => {
    setShowConsultationModal(true);
  };

  const handleCloseConsultationModal = () => {
    setShowConsultationModal(false);
  };

  return (
    <div>
      <BenchmarkShowcase
        onCaseSelect={handleCaseSelect}
        onConsultationRequest={handleConsultationRequest}
      />
      
      {showConsultationModal && (
        <ConsultationRequestModal
          isOpen={showConsultationModal}
          onClose={handleCloseConsultationModal}
          initialData={{
            inquiryType: '벤치마크 성공사례',
            consultationArea: selectedCase ? `${selectedCase.industry} - ${selectedCase.subIndustry}` : '업종별 벤치마크'
          }}
        />
      )}
    </div>
  );
}
