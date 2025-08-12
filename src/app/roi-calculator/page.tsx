'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/header';
import ROICalculator from '@/components/success-cases/ROICalculator';
import ConsultationRequestModal from '@/components/diagnosis/ConsultationRequestModal';

export default function ROICalculatorPage() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [calculationData, setCalculationData] = useState(null);

  const handleConsultationRequest = (data: any) => {
    setCalculationData(data);
    setShowConsultationModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <ROICalculator onConsultationRequest={handleConsultationRequest} />
      </main>

      {/* 상담신청 모달 */}
      <ConsultationRequestModal
        isOpen={showConsultationModal}
        onClose={() => setShowConsultationModal(false)}
        initialData={{
          consultationArea: 'automation_consultation',
          inquiryContent: calculationData ? 
            `AI 자동화 ROI 계산 결과를 바탕으로 상담을 요청합니다.

[계산 결과]
- 업종: ${calculationData.industry}
- 회사 규모: ${calculationData.companySize}
- 예상 ROI: ${calculationData.calculation?.roi}%
- 투자 회수 기간: ${calculationData.calculation?.paybackMonths}개월
- 연간 절약 효과: ${calculationData.calculation?.annualSavings?.toLocaleString()}원

상기 계산 결과를 바탕으로 구체적인 구현 방안에 대해 상담받고 싶습니다.` :
            'AI 자동화 ROI 계산 결과를 바탕으로 전문가 상담을 요청합니다.'
        }}
      />
    </div>
  );
}
