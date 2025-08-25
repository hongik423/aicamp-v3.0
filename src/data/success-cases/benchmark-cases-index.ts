'use client';

import { SuccessCase, SuccessCaseDetail } from '@/types/success-case.types';

// 각 업종별 성공사례 import
import { healthcareMedicalCases, healthcareMedicalCaseDetails } from './healthcare-medical-cases';
// import { educationResearchCases, educationResearchCaseDetails } from './education-research-cases'; // 임시 제외
// import { constructionRealEstateCases, constructionRealEstateCaseDetails } from './construction-realestate-cases'; // 임시 제외
import { logisticsTransportCases, logisticsTransportCaseDetails } from './logistics-transport-cases';
import { mediaContentCases, mediaContentCaseDetails } from './media-content-cases';
import { professionalServiceCases, professionalServiceCaseDetails } from './professional-service-cases';
import { financeInsuranceCases, financeInsuranceCaseDetails } from './finance-insurance-cases';
import { retailServiceCases, retailServiceCaseDetails } from './retail-service-cases';
import { manufacturingBenchmarkCases } from './manufacturing-benchmark-cases';
import { itTechBenchmarkCases } from './it-tech-benchmark-cases';
import { energyEnvironmentCases, energyEnvironmentCaseDetails } from './energy-environment-cases';
import { agricultureFisheryCases, agricultureFisheryCaseDetails } from './agriculture-fishery-cases';
import { telecomNetworkCases, telecomNetworkCaseDetails } from './telecom-network-cases';
import { publicNonprofitCases, publicNonprofitCaseDetails } from './public-nonprofit-cases';

// 모든 성공사례 요약 통합
export const allBenchmarkCases: any[] = [
  ...healthcareMedicalCases,
  // ...educationResearchCases, // 임시 제외
  // ...constructionRealEstateCases, // 임시 제외
  ...logisticsTransportCases,
  ...mediaContentCases,
  ...professionalServiceCases,
  ...financeInsuranceCases,
  ...retailServiceCases,
  ...Object.values(manufacturingBenchmarkCases),
  ...Object.values(itTechBenchmarkCases),
  ...energyEnvironmentCases,
  ...agricultureFisheryCases,
  ...telecomNetworkCases,
  ...publicNonprofitCases
];

// 모든 성공사례 상세 데이터 통합
export const allBenchmarkCaseDetails: { [key: string]: SuccessCaseDetail } = {
  ...healthcareMedicalCaseDetails,
  // ...educationResearchCaseDetails, // 임시 제외
  // ...constructionRealEstateCaseDetails, // 임시 제외
  ...logisticsTransportCaseDetails,
  ...mediaContentCaseDetails,
  ...professionalServiceCaseDetails,
  ...financeInsuranceCaseDetails,
  ...retailServiceCaseDetails,
  ...manufacturingBenchmarkCases,
  ...itTechBenchmarkCases,
  ...energyEnvironmentCaseDetails,
  ...agricultureFisheryCaseDetails,
  ...telecomNetworkCaseDetails,
  ...publicNonprofitCaseDetails
};

// 벤치마크 케이스 export (기존 코드와의 호환성을 위해)
export const benchmarkCases = allBenchmarkCases;
export const benchmarkCaseDetails = allBenchmarkCaseDetails;

// 업종별 카테고리 정의
export const industryBenchmarkCategories = {
  '의료/헬스케어': {
    name: '의료/헬스케어',
    description: 'AI와 n8n을 활용한 의료 서비스 혁신 사례',
    count: 7,
    icon: '🏥',
    color: 'red',
    cases: healthcareMedicalCases,
    subIndustries: ['종합병원', '의료기기', '제약회사', '의료AI', '헬스케어', '바이오테크', '의료정보']
  },
  '교육/연구': {
    name: '교육/연구',
    description: 'EdTech와 R&D 분야의 AI 혁신 사례',
    count: 7,
    icon: '🎓',
    color: 'blue',
    cases: [], // educationResearchCases, // 임시 제외
    subIndustries: ['대학교', '연구소', '온라인교육', 'EdTech', '직업훈련', '평가시스템', '연구개발']
  },
  '건설/부동산': {
    name: '건설/부동산',
    description: '스마트 건설과 PropTech 혁신 사례',
    count: 7,
    icon: '🏗️',
    color: 'gray',
    cases: [], // constructionRealEstateCases, // 임시 제외
    subIndustries: ['종합건설', '부동산개발', '인테리어', '시설관리', '건축설계', '토목공사', '건자재']
  },
  '운송/물류': {
    name: '운송/물류',
    description: '스마트 물류와 운송 최적화 사례',
    count: 7,
    icon: '🚚',
    color: 'blue',
    cases: logisticsTransportCases,
    subIndustries: ['종합물류', '해운', '항공운송', '육상운송', '물류자동화', '스마트물류', '국제물류']
  },
  '미디어/콘텐츠': {
    name: '미디어/콘텐츠',
    description: '방송, OTT, 게임 등 콘텐츠 산업 혁신 사례',
    count: 7,
    icon: '📺',
    color: 'purple',
    cases: mediaContentCases,
    subIndustries: ['방송', '게임', '영화', '음악', '출판', '광고', '디지털미디어']
  },
  '전문서비스': {
    name: '전문서비스',
    description: '법률, 회계, 컨설팅 등 전문 서비스 혁신 사례',
    count: 7,
    icon: '💼',
    color: 'indigo',
    cases: professionalServiceCases,
    subIndustries: ['법률', '회계', '경영컨설팅', 'IT컨설팅', 'HR/인사노무', '마케팅에이전시', '디자인/브랜딩']
  },
  '금융/보험': {
    name: '금융/보험',
    description: '핀테크와 인슈어테크 혁신 사례',
    count: 7,
    icon: '💰',
    color: 'green',
    cases: financeInsuranceCases,
    subIndustries: ['은행', '보험', '증권', '핀테크', '인슈어테크', '자산관리', '결제서비스']
  },
  '유통/서비스': {
    name: '유통/서비스',
    description: '리테일과 서비스업의 디지털 전환 사례',
    count: 8,
    icon: '🛍️',
    color: 'orange',
    cases: retailServiceCases,
    subIndustries: ['오프라인 소매', '온라인 쇼핑몰', '호텔/숙박', '음식점', '여행', '운송서비스', '배달서비스', '카페/베이커리']
  },
  '제조/생산': {
    name: '제조/생산',
    description: '스마트 팩토리와 제조 혁신 사례',
    count: 10,
    icon: '🏭',
    color: 'slate',
    cases: Object.values(manufacturingBenchmarkCases),
    subIndustries: ['전자/반도체', '자동차 제조', '화학/제약', '식품/음료', '섬유/의류', '건자재/유리', '조선/해양', '항공/우주', '에너지/발전', '중공업/장비']
  },
  'IT/기술': {
    name: 'IT/기술',
    description: '소프트웨어와 IT 서비스 혁신 사례',
    count: 10,
    icon: '💻',
    color: 'cyan',
    cases: Object.values(itTechBenchmarkCases),
    subIndustries: ['소프트웨어 개발', 'AI/머신러닝', '클라우드 인프라', '모바일 앱 개발', '웹 개발', '데이터베이스 관리', '네트워크 보안', 'DevOps 자동화', 'IoT 플랫폼', '블록체인 기술']
  },
  '에너지/환경': {
    name: '에너지/환경',
    description: '신재생에너지와 환경 보호 혁신 사례',
    count: 6,
    icon: '⚡',
    color: 'yellow',
    cases: energyEnvironmentCases,
    subIndustries: ['신재생에너지', '전통발전', '폐기물처리', '수처리', '탄소관리', '환경컨설팅']
  },
  '농업/수산업': {
    name: '농업/수산업',
    description: '스마트팜과 지속가능한 농수산업 혁신 사례',
    count: 5,
    icon: '🌾',
    color: 'green',
    cases: agricultureFisheryCases,
    subIndustries: ['농업/농산물', '축산업', '수산업', '임업', '농업기술/스마트팜']
  },
  '통신/네트워크': {
    name: '통신/네트워크',
    description: '5G와 차세대 네트워크 혁신 사례',
    count: 4,
    icon: '📡',
    color: 'blue',
    cases: telecomNetworkCases,
    subIndustries: ['이동통신', '네트워크 보안', '클라우드 네트워크', 'IoT 네트워크']
  },
  '공공/비영리': {
    name: '공공/비영리',
    description: '디지털 정부와 공공 서비스 혁신 사례',
    count: 4,
    icon: '🏛️',
    color: 'gray',
    cases: publicNonprofitCases,
    subIndustries: ['정부기관', '지방자치단체', '비영리단체', '교육기관']
  }
};

// 기존 호환성을 위한 export
export const industryCategories = industryBenchmarkCategories;

// 성공사례 통계
export const benchmarkStatistics = {
  totalCases: allBenchmarkCases.length,
  totalIndustries: Object.keys(industryBenchmarkCategories).length,
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