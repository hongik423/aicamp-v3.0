'use client';

import { itTechBenchmarkCases } from './it-tech-benchmark-cases';
import { manufacturingBenchmarkCases } from './manufacturing-benchmark-cases';
import { retailServiceCaseDetails } from './retail-service-cases';
import { SuccessCaseDetail } from '@/types/success-case.types';

// 업종별 벤치마크 성공사례 통합 데이터
export const benchmarkCases: { [key: string]: SuccessCaseDetail } = {
  ...itTechBenchmarkCases,
  ...manufacturingBenchmarkCases,
  ...retailServiceCaseDetails
};

// 업종별 분류 데이터
export const industryBenchmarkCategories = {
  'IT/기술': {
    name: 'IT/기술',
    description: '소프트웨어, 하드웨어, 데이터 분석 등 IT 분야의 AI 혁신 사례',
    cases: Object.values(itTechBenchmarkCases),
    subIndustries: [
      '소프트웨어 개발',
      '클라우드 인프라', 
      '데이터 분석',
      '모바일 앱 개발',
      '웹 개발',
      '사이버보안',
      'IoT 플랫폼',
      '블록체인',
      '게임 개발',
      '하드웨어 개발'
    ]
  },
  '제조/생산': {
    name: '제조/생산',
    description: '전자, 화학, 제약, 자동차 등 제조업의 AI 혁신 사례',
    cases: Object.values(manufacturingBenchmarkCases),
    subIndustries: [
      '전자/반도체',
      '기계/장비',
      '화학/석유화학',
      '제약/의료기기',
      '식품/의류',
      '석유/에너지',
      '철강/금속',
      '조선/해양',
      '항공/우주',
      '자동차 부품'
    ]
  },
  '유통/서비스': {
    name: '유통/서비스',
    description: '소매, 이커머스, 외식, 호텔, 여행, 배달 등 서비스업의 AI 혁신 사례',
    cases: Object.values(retailServiceCaseDetails),
    subIndustries: [
      '오프라인 소매업',
      '이커머스/온라인쇼핑',
      '도매업',
      '패션/부티',
      '외식/카페',
      '숙박/호텔',
      '여행/관광',
      '배달/플랫폼'
    ]
  }
};

// 업종별 필터링 함수
export const getBenchmarkCasesByIndustry = (industry: string): SuccessCaseDetail[] => {
  return Object.values(benchmarkCases).filter(caseData => caseData.industry === industry);
};

export const getBenchmarkCasesBySubIndustry = (subIndustry: string): SuccessCaseDetail[] => {
  return Object.values(benchmarkCases).filter(caseData => caseData.subIndustry === subIndustry);
};

// 벤치마크 성공사례 검색 함수
export const searchBenchmarkCases = (query: string): SuccessCaseDetail[] => {
  const lowerQuery = query.toLowerCase();
  return Object.values(benchmarkCases).filter(caseData => 
    caseData.title.toLowerCase().includes(lowerQuery) ||
    caseData.subIndustry.toLowerCase().includes(lowerQuery) ||
    caseData.description.toLowerCase().includes(lowerQuery)
  );
};

// 추천 벤치마크 사례 함수
export const getRecommendedBenchmarkCases = (
  userIndustry: string,
  userSize: string,
  limit: number = 3
): SuccessCaseDetail[] => {
  const industryCases = getBenchmarkCasesByIndustry(userIndustry);
  
  // 회사 규모에 따른 필터링
  const sizeFilteredCases = industryCases.filter(caseData => {
    if (userSize === 'large' && caseData.companySize === '대기업') return true;
    if (userSize === 'medium' && caseData.companySize === '중기업') return true;
    if (userSize === 'small' && caseData.companySize === '중소기업') return true;
    return false;
  });

  // 추천 사례가 부족한 경우 전체 업종에서 추천
  if (sizeFilteredCases.length < limit) {
    const remainingSlots = limit - sizeFilteredCases.length;
    const otherCases = industryCases
      .filter(caseData => !sizeFilteredCases.includes(caseData))
      .slice(0, remainingSlots);
    
    return [...sizeFilteredCases, ...otherCases];
  }

  return sizeFilteredCases.slice(0, limit);
};

// 벤치마크 통계 데이터
export const getBenchmarkStatistics = () => {
  const totalCases = Object.keys(benchmarkCases).length;
  const industries = [...new Set(Object.values(benchmarkCases).map(c => c.industry))];
  const subIndustries = [...new Set(Object.values(benchmarkCases).map(c => c.subIndustry))];
  
  const avgROI = Object.values(benchmarkCases).reduce((sum, caseData) => {
    const roi = caseData.roiData?.threeYearROI ? parseInt(caseData.roiData.threeYearROI.replace('%', '')) : 0;
    return sum + roi;
  }, 0) / totalCases;

  const avgTimeReduction = Object.values(benchmarkCases).reduce((sum, caseData) => {
    const reduction = caseData.automationMetrics?.timeReduction ? parseInt(caseData.automationMetrics.timeReduction.replace('%', '')) : 0;
    return sum + reduction;
  }, 0) / totalCases;

  return {
    totalCases,
    industries: industries.length,
    subIndustries: subIndustries.length,
    averageROI: Math.round(avgROI),
    averageTimeReduction: Math.round(avgTimeReduction)
  };
};

export default benchmarkCases;
