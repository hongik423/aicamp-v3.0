'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/header';
import SuccessCasesList from '@/components/success-cases/SuccessCasesList';
import ConsultationRequestModal from '@/components/diagnosis/ConsultationRequestModal';

export default function SuccessCasesPage() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);

  const handleConsultationRequest = () => {
    setShowConsultationModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SuccessCasesList onConsultationRequest={handleConsultationRequest} />
      </main>

      {/* 상담신청 모달 */}
      <ConsultationRequestModal
        isOpen={showConsultationModal}
        onClose={() => setShowConsultationModal(false)}
      />
    </div>
  );
}
