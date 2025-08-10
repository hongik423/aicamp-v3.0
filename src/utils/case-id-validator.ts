/**
 * 성공사례 ID 일관성 검증 및 수정 유틸리티
 */

// data.ts의 ID 목록 (24개)
export const DATA_CASE_IDS = [
  'manufacturing-aicamp-digital-transformation',
  'manufacturing-aicamp-quality-innovation',
  'manufacturing-aicamp-automation-excellence',
  'service-aicamp-customer-experience',
  'service-aicamp-hospitality-innovation',
  'service-aicamp-retail-transformation',
  'startup-aicamp-fintech-innovation',
  'startup-aicamp-edtech-personalization',
  'startup-aicamp-healthtech-diagnosis',
  'professional-aicamp-consulting-ai',
  'professional-aicamp-legal-ai',
  'professional-aicamp-accounting-automation',
  'construction-aicamp-precision-construction',
  'finance-aicamp-robo-advisor',
  'logistics-aicamp-smart-delivery',
  'telecom-aicamp-network-optimization',
  'media-aicamp-content-automation',
  'energy-aicamp-smart-grid',
  'agriculture-aicamp-smart-farming',
  'healthcare-aicamp-telemedicine',
  'ecommerce-aicamp-personalization',
  'certification-aicamp-quality-management',
  'investment-aicamp-portfolio-optimization',
  'edutech-aicamp-adaptive-learning'
];

// 상세페이지의 ID 목록 (26개)
export const DETAIL_CASE_IDS = [
  'manufacturing-aicamp-digital-transformation',
  'manufacturing-aicamp-quality-innovation',
  'manufacturing-aicamp-automation-excellence',
  'service-aicamp-customer-engagement',
  'service-aicamp-content-creation',
  'service-aicamp-data-analytics',
  'startup-aicamp-fintech',
  'healthcare-aicamp-medical-ai',
  'education-aicamp-edutech',
  'ecommerce-aicamp-smart-retail',
  'logistics-aicamp-smart-logistics',
  'consulting-aicamp-strategy-ai',
  'legal-aicamp-ai-law',
  'accounting-aicamp-ai-accounting',
  'construction-aicamp-smart-construction',
  'construction-aicamp-precision-engineering',
  'finance-aicamp-risk-management',
  'finance-aicamp-digital-banking',
  'telecom-aicamp-network-optimization',
  'telecom-aicamp-customer-insights',
  'media-aicamp-content-automation',
  'media-aicamp-personalization',
  'energy-aicamp-smart-grid',
  'energy-aicamp-renewable-energy',
  'agriculture-aicamp-precision-farming',
  'agriculture-aicamp-vertical-farming'
];

// 불일치 검증
export const validateCaseIds = () => {
  const dataSet = new Set(DATA_CASE_IDS);
  const detailSet = new Set(DETAIL_CASE_IDS);
  
  const missingInDetail = DATA_CASE_IDS.filter(id => !detailSet.has(id));
  const missingInData = DETAIL_CASE_IDS.filter(id => !dataSet.has(id));
  
  return {
    isConsistent: missingInDetail.length === 0 && missingInData.length === 0,
    missingInDetail,
    missingInData,
    dataCount: DATA_CASE_IDS.length,
    detailCount: DETAIL_CASE_IDS.length
  };
};

// 표준 ID 목록 (data.ts 기준으로 통일)
export const STANDARD_CASE_IDS = DATA_CASE_IDS;
