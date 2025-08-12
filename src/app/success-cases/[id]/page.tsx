'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Header from '@/components/layout/header';
import SuccessCaseDetailPage from '@/components/success-cases/SuccessCaseDetailPage';
import ConsultationRequestModal from '@/components/diagnosis/ConsultationRequestModal';

import { successCaseDetails } from '@/data/success-cases/ai-n8n-automation-cases';

export default function SuccessCaseDetailPageRoute() {
  const params = useParams();
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  
  const caseData = successCaseDetails[params.id as string];
  
  if (!caseData) {
    notFound();
  }

  const handleConsultationRequest = () => {
    setShowConsultationModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        <SuccessCaseDetailPage 
          caseData={caseData}
          onConsultationRequest={handleConsultationRequest}
        />
      </main>

      {/* 상담신청 모달 */}
      <ConsultationRequestModal
        isOpen={showConsultationModal}
        onClose={() => setShowConsultationModal(false)}
        initialData={{
          industry: caseData.industry,
          inquiryType: 'automation_consultation'
        }}
      />
    </div>
  );
}
