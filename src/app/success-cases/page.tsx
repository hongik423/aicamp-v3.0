'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/header';
import IndustryListPage from '@/components/success-cases/IndustryListPage';
import ConsultationRequestModal from '@/components/diagnosis/ConsultationRequestModal';

export default function SuccessCasesPage() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);

  const handleConsultationRequest = () => {
    setShowConsultationModal(true);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <IndustryListPage />
      </main>

      {/* 상담신청 모달 */}
      <ConsultationRequestModal
        isOpen={showConsultationModal}
        onClose={() => setShowConsultationModal(false)}
      />
    </div>
  );
}
