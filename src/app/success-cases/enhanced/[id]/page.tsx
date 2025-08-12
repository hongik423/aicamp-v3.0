'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Header from '@/components/layout/header';
import EnhancedSuccessCaseDetailComponent from '@/components/success-cases/EnhancedSuccessCaseDetail';
import ConsultationRequestModal from '@/components/diagnosis/ConsultationRequestModal';
import { manufacturingSmartFactoryCase } from '@/data/success-cases/manufacturing-smart-factory-enhanced';
import { EnhancedSuccessCaseDetail } from '@/types/enhanced-success-case.types';

// 임시 데이터 매핑 (추후 모든 업종별 케이스 추가)
const enhancedCases: { [key: string]: EnhancedSuccessCaseDetail } = {
  'manufacturing-smart-factory': manufacturingSmartFactoryCase,
};

export default function EnhancedSuccessCasePage() {
  const params = useParams();
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  
  const caseData = enhancedCases[params.id as string];
  
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
        <EnhancedSuccessCaseDetailComponent 
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
          consultationArea: 'automation_consultation',
          inquiryContent: `[${caseData.industry} - ${caseData.subIndustry}] AI & n8n 자동화 성공사례를 보고 상담을 요청합니다.

관심 분야:
- ${caseData.title}
- 교육 프로그램: ${caseData.curriculum.overview.totalDuration} 과정
- 예상 ROI: ${caseData.performanceDashboard.financialAnalysis.roi}

우리 회사에도 유사한 성과를 달성할 수 있는 맞춤형 솔루션에 대해 상담받고 싶습니다.`
        }}
      />
    </div>
  );
}
