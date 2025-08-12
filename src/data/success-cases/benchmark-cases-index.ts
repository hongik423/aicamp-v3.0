'use client';

import { SuccessCase, SuccessCaseDetail } from '@/types/success-case.types';

// 각 업종별 성공사례 import
import { healthcareMedicalCases, healthcareMedicalCaseDetails } from './healthcare-medical-cases';
import { educationResearchCases, educationResearchCaseDetails } from './education-research-cases';
import { constructionRealEstateCases, constructionRealEstateCaseDetails } from './construction-realestate-cases';
import { logisticsTransportCases, logisticsTransportCaseDetails } from './logistics-transport-cases';
import { mediaContentCases, mediaContentCaseDetails } from './media-content-cases';
import { professionalServiceCases, professionalServiceCaseDetails } from './professional-service-cases';
import { financeInsuranceCases, financeInsuranceCaseDetails } from './finance-insurance-cases';
import { retailServiceCases, retailServiceCaseDetails } from './retail-service-cases';
import { manufacturingBenchmarkCases } from './manufacturing-benchmark-cases';
import { itTechBenchmarkCases } from './it-tech-benchmark-cases';

// 모든 성공사례 요약 통합
export const allBenchmarkCases: SuccessCase[] = [
  ...healthcareMedicalCases,
  ...educationResearchCases,
  ...constructionRealEstateCases,
  ...logisticsTransportCases,
  ...mediaContentCases,
  ...professionalServiceCases,
  ...financeInsuranceCases,
  ...retailServiceCases,
  ...Object.values(manufacturingBenchmarkCases),
  ...Object.values(itTechBenchmarkCases)
];

// 모든 성공사례 상세 데이터 통합
export const allBenchmarkCaseDetails: { [key: string]: SuccessCaseDetail } = {
  ...healthcareMedicalCaseDetails,
  ...educationResearchCaseDetails,
  ...constructionRealEstateCaseDetails,
  ...logisticsTransportCaseDetails,
  ...mediaContentCaseDetails,
  ...professionalServiceCaseDetails,
  ...financeInsuranceCaseDetails,
  ...retailServiceCaseDetails,
  ...manufacturingBenchmarkCases,
  ...itTechBenchmarkCases
};

// 벤치마크 케이스 export (기존 코드와의 호환성을 위해)
export const benchmarkCases = allBenchmarkCases;
export const benchmarkCaseDetails = allBenchmarkCaseDetails;

// 업종별 카테고리 정의
export const industryBenchmarkCategories = [
  {
    id: 'healthcare',
    name: '의료/헬스케어',
    description: 'AI와 n8n을 활용한 의료 서비스 혁신 사례',
    count: 7,
    icon: '🏥',
    color: 'red',
    cases: healthcareMedicalCases
  },
  {
    id: 'education',
    name: '교육/연구',
    description: 'EdTech와 R&D 분야의 AI 혁신 사례',
    count: 7,
    icon: '🎓',
    color: 'blue',
    cases: educationResearchCases
  },
  {
    id: 'construction',
    name: '건설/부동산',
    description: '스마트 건설과 PropTech 혁신 사례',
    count: 7,
    icon: '🏗️',
    color: 'gray',
    cases: constructionRealEstateCases
  },
  {
    id: 'logistics',
    name: '운송/물류',
    description: '스마트 물류와 운송 최적화 사례',
    count: 7,
    icon: '🚚',
    color: 'blue',
    cases: logisticsTransportCases
  },
  {
    id: 'media',
    name: '미디어/콘텐츠',
    description: '방송, OTT, 게임 등 콘텐츠 산업 혁신 사례',
    count: 7,
    icon: '📺',
    color: 'purple',
    cases: mediaContentCases
  },
  {
    id: 'professional',
    name: '전문서비스',
    description: '법률, 회계, 컨설팅 등 전문 서비스 혁신 사례',
    count: 7,
    icon: '💼',
    color: 'indigo',
    cases: professionalServiceCases
  },
  {
    id: 'finance',
    name: '금융/보험',
    description: '핀테크와 인슈어테크 혁신 사례',
    count: 7,
    icon: '💰',
    color: 'green',
    cases: financeInsuranceCases
  },
  {
    id: 'retail',
    name: '유통/서비스',
    description: '리테일과 서비스업의 디지털 전환 사례',
    count: 8,
    icon: '🛍️',
    color: 'orange',
    cases: retailServiceCases
  },
  {
    id: 'manufacturing',
    name: '제조업',
    description: '스마트 팩토리와 제조 혁신 사례',
    count: 10,
    icon: '🏭',
    color: 'slate',
    cases: Object.values(manufacturingBenchmarkCases)
  },
  {
    id: 'tech',
    name: 'IT/테크',
    description: '소프트웨어와 IT 서비스 혁신 사례',
    count: 10,
    icon: '💻',
    color: 'cyan',
    cases: Object.values(itTechBenchmarkCases)
  }
];

// 기존 호환성을 위한 export
export const industryCategories = industryBenchmarkCategories;

// 성공사례 통계
export const benchmarkStatistics = {
  totalCases: allBenchmarkCases.length,
  totalIndustries: industryBenchmarkCategories.length,
  averageROI: '380%',
  averageEfficiencyGain: '65%',
  averageTimeSaved: '55%',
  totalCompanies: allBenchmarkCases.length,
  featuredCases: allBenchmarkCases.filter(c => c.featured).length
};

// 통계 함수 export
export const getBenchmarkStatistics = () => benchmarkStatistics;

// 성공사례 필터링 함수
export const filterCasesByIndustry = (industry: string): SuccessCase[] => {
  return allBenchmarkCases.filter(c => c.industry === industry);
};

export const filterCasesByCategory = (category: string): SuccessCase[] => {
  return allBenchmarkCases.filter(c => c.category === category);
};

export const getFeaturedCases = (): SuccessCase[] => {
  return allBenchmarkCases.filter(c => c.featured);
};

export const getCaseDetail = (caseId: string): SuccessCaseDetail | undefined => {
  return allBenchmarkCaseDetails[caseId];
};

// 검색 함수
export const searchBenchmarkCases = (query: string): SuccessCase[] => {
  const lowerQuery = query.toLowerCase();
  return allBenchmarkCases.filter(c => 
    c.title.toLowerCase().includes(lowerQuery) ||
    c.description.toLowerCase().includes(lowerQuery) ||
    c.companyName.toLowerCase().includes(lowerQuery) ||
    c.industry.toLowerCase().includes(lowerQuery) ||
    c.subIndustry?.toLowerCase().includes(lowerQuery) ||
    c.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) || false
  );
};

// 기존 호환성을 위한 export
export const searchCases = searchBenchmarkCases;

// 성공사례 추천 함수
export const getRelatedCases = (caseId: string, limit: number = 3): SuccessCase[] => {
  const currentCase = allBenchmarkCases.find(c => c.id === caseId);
  if (!currentCase) return [];

  // 같은 업종 또는 비슷한 태그를 가진 사례 추천
  const related = allBenchmarkCases
    .filter(c => c.id !== caseId)
    .map(c => {
      let score = 0;
      if (c.industry === currentCase.industry) score += 3;
      if (c.category === currentCase.category) score += 2;
      const commonTags = c.tags?.filter(tag => currentCase.tags?.includes(tag)) || [];
      score += commonTags.length;
      return { case: c, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.case);

  return related;
};

// 성과 지표별 최고 사례
export const getTopPerformers = () => {
  return {
    efficiency: allBenchmarkCases.sort((a, b) => {
      const aVal = parseInt(a.metrics?.efficiency?.replace(/[^0-9]/g, '') || '0');
      const bVal = parseInt(b.metrics?.efficiency?.replace(/[^0-9]/g, '') || '0');
      return bVal - aVal;
    }).slice(0, 5),
    
    roi: allBenchmarkCases.sort((a, b) => {
      const aVal = parseInt(a.metrics?.roi?.replace(/[^0-9]/g, '') || '0');
      const bVal = parseInt(b.metrics?.roi?.replace(/[^0-9]/g, '') || '0');
      return bVal - aVal;
    }).slice(0, 5),
    
    timeSaved: allBenchmarkCases.sort((a, b) => {
      const aVal = parseInt(a.metrics?.time?.replace(/[^0-9]/g, '') || '0');
      const bVal = parseInt(b.metrics?.time?.replace(/[^0-9]/g, '') || '0');
      return Math.abs(bVal) - Math.abs(aVal);
    }).slice(0, 5)
  };
};

// Export types
export type { SuccessCase, SuccessCaseDetail } from '@/types/success-case.types';