'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/header';
import SuccessCaseDetailPage from '@/components/success-cases/SuccessCaseDetailPage';
import ConsultationRequestModal from '@/components/diagnosis/ConsultationRequestModal';
import { successCaseDetails } from '@/data/success-cases/ai-n8n-automation-cases';
import { financeInsuranceCaseDetails } from '@/data/success-cases/finance-insurance-cases';
import { retailServiceCaseDetails } from '@/data/success-cases/retail-service-cases';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SuccessCaseDetailPageRoute({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  
  // 모든 성공사례 데이터 통합
  const allCaseDetails = {
    ...successCaseDetails,
    ...financeInsuranceCaseDetails,
    ...retailServiceCaseDetails
  };
  
  const caseData = allCaseDetails[resolvedParams.id];
  
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
