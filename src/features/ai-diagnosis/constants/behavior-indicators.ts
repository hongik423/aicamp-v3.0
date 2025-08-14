/**
 * ⚠️ DEPRECATED: 기존 일반적 행동지표 시스템
 * 
 * 🎯 새로운 BARS (Behaviorally Anchored Rating Scales) 시스템으로 교체됨
 * @see bars-behavior-indicators.ts
 * 
 * 이 파일은 하위 호환성을 위해 유지되지만, 새로운 개발에서는 사용하지 말 것
 */

export interface BehaviorIndicator {
  score: number;
  label: string;
  keyword: string; // 10자 이내 핵심 키워드
  description: string;
  color: string;
  bgColor: string;
}

export const BEHAVIOR_INDICATORS: BehaviorIndicator[] = [
  {
    score: 5,
    label: "완전히 그렇다",
    keyword: "혁신적 리더십",
    description: "업계 최고 수준으로 혁신을 주도하며 모범 사례를 만들어가고 있습니다",
    color: "text-green-700",
    bgColor: "bg-green-50 border-green-200"
  },
  {
    score: 4,
    label: "대체로 그렇다", 
    keyword: "전략적 실행력",
    description: "명확한 전략을 바탕으로 체계적이고 적극적으로 실행하고 있습니다",
    color: "text-blue-700",
    bgColor: "bg-blue-50 border-blue-200"
  },
  {
    score: 3,
    label: "어느 정도 그렇다",
    keyword: "기본적 운영",
    description: "기본적인 수준에서 운영하고 있으나 더 체계적인 접근이 필요합니다",
    color: "text-yellow-700", 
    bgColor: "bg-yellow-50 border-yellow-200"
  },
  {
    score: 2,
    label: "별로 그렇지 않다",
    keyword: "초기 준비단계",
    description: "관심과 계획은 있으나 구체적인 실행이 부족한 상황입니다",
    color: "text-orange-700",
    bgColor: "bg-orange-50 border-orange-200"
  },
  {
    score: 1,
    label: "전혀 그렇지 않다",
    keyword: "도입 검토 필요",
    description: "아직 시작하지 않았으며 체계적인 접근 방법이 필요한 상태입니다",
    color: "text-red-700",
    bgColor: "bg-red-50 border-red-200"
  }
];

/**
 * 카테고리별 특화 행동지표
 */
export const CATEGORY_BEHAVIOR_INDICATORS = {
  businessFoundation: {
    title: "비즈니스 기반",
    icon: "",
    indicators: {
      5: { keyword: "AI 경영 혁신", description: "CEO가 AI를 핵심 경영전략으로 설정하고 전사 차원에서 디지털 트랜스포메이션을 주도하고 있습니다" },
      4: { keyword: "전략적 계획 수립", description: "AI 도입 로드맵과 예산이 확보되어 있으며 담당 조직이 명확히 구성되어 있습니다" },
      3: { keyword: "기초 인프라 구축", description: "AI 도입의 필요성을 인지하고 기본적인 데이터 수집과 관리 체계를 갖추고 있습니다" },
      2: { keyword: "탐색적 관심", description: "AI 도입에 대한 관심은 있으나 구체적인 계획이나 예산 배정이 미흡합니다" },
      1: { keyword: "현상 유지 단계", description: "기존 업무 방식에 만족하며 AI 도입의 필요성을 크게 느끼지 못하고 있습니다" }
    }
  },
  currentAI: {
    title: "현재 AI 활용",
    icon: "",
    indicators: {
      5: { keyword: "AI 업무 혁신", description: "ChatGPT, Claude 등 생성형 AI를 업무 전반에 활용하여 생산성을 크게 향상시키고 있습니다" },
      4: { keyword: "다양한 AI 도구 활용", description: "문서작성, 데이터 분석, 고객응대 등 여러 분야에서 AI 도구를 적극적으로 사용하고 있습니다" },
      3: { keyword: "기본 AI 도구 사용", description: "ChatGPT나 번역 도구 등 기본적인 AI 서비스를 가끔 업무에 활용하고 있습니다" },
      2: { keyword: "시험적 사용", description: "AI 도구에 대한 호기심으로 가끔 시도해보지만 업무에 체계적으로 적용하지는 않습니다" },
      1: { keyword: "AI 미활용", description: "AI 도구를 거의 사용하지 않으며 기존 업무 방식을 그대로 유지하고 있습니다" }
    }
  },
  organizationReadiness: {
    title: "조직 준비도",
    icon: "",
    indicators: {
      5: { keyword: "AI 조직문화 완성", description: "전 직원이 AI 도구를 능숙하게 사용하며, AI 교육 프로그램과 내부 전문가가 체계적으로 운영되고 있습니다" },
      4: { keyword: "적극적 학습 조직", description: "대부분 직원이 AI에 대한 관심이 높고 적극적으로 학습하며, 정기적인 교육이 이루어지고 있습니다" },
      3: { keyword: "관심 있는 그룹 형성", description: "일부 직원들이 AI에 관심을 보이고 있으나 전사적인 교육이나 지원 체계는 부족합니다" },
      2: { keyword: "변화 저항 단계", description: "AI 도입에 대한 불안감이나 저항감이 있으며, 교육이나 동기부여가 필요한 상황입니다" },
      1: { keyword: "현상 유지 선호", description: "직원들이 기존 업무 방식을 선호하며 AI 도입에 대한 관심이나 의지가 부족합니다" }
    }
  },
  techInfrastructure: {
    title: "기술 인프라",
    icon: "",
    indicators: {
      5: { keyword: "클라우드 AI 플랫폼", description: "AWS, Azure, GCP 등 클라우드 AI 서비스를 활용하며 API 연동과 데이터 파이프라인이 구축되어 있습니다" },
      4: { keyword: "디지털 인프라 완비", description: "클라우드 기반 시스템과 충분한 컴퓨팅 파워, 안정적인 네트워크 환경을 갖추고 있습니다" },
      3: { keyword: "기본 IT 환경", description: "일반적인 사무용 컴퓨터와 인터넷 환경은 갖춰져 있으나 AI 전용 인프라는 부족합니다" },
      2: { keyword: "제한적 IT 환경", description: "기본적인 IT 장비는 있으나 성능이나 보안 측면에서 AI 활용에 제약이 있습니다" },
      1: { keyword: "IT 인프라 부족", description: "컴퓨터나 네트워크 환경이 노후화되어 AI 도구 사용에 어려움이 있습니다" }
    }
  },
  goalClarity: {
    title: "목표 명확성",
    icon: "",
    indicators: {
      5: { keyword: "SMART 목표 설정", description: "구체적이고 측정 가능한 AI 목표(매출 증대, 비용 절감, 효율성 향상 등)가 수치로 명확히 설정되어 있습니다" },
      4: { keyword: "체계적 목표 수립", description: "AI 도입을 통해 달성하고자 하는 목표가 명확하며 단계별 계획이 수립되어 있습니다" },
      3: { keyword: "일반적 목표 인식", description: "생산성 향상이나 경쟁력 강화 등 일반적인 수준의 AI 도입 목표를 가지고 있습니다" },
      2: { keyword: "모호한 기대", description: "AI가 도움이 될 것이라는 막연한 기대는 있으나 구체적인 목표나 성과 지표가 없습니다" },
      1: { keyword: "목적 의식 부재", description: "AI 도입의 목적이나 기대 효과에 대한 명확한 인식이 부족한 상태입니다" }
    }
  },
  executionCapability: {
    title: "실행 역량",
    icon: "",
    indicators: {
      5: { keyword: "혁신적 실행력", description: "새로운 기술이나 방법을 빠르게 도입하고 실행하는 조직 문화가 확립되어 있으며, 변화 관리 역량이 뛰어납니다" },
      4: { keyword: "체계적 실행력", description: "계획된 프로젝트를 체계적으로 실행하며, 문제 해결 능력과 추진력을 갖추고 있습니다" },
      3: { keyword: "일반적 실행력", description: "기본적인 업무 실행 능력은 있으나 새로운 기술 도입에는 시간이 다소 소요됩니다" },
      2: { keyword: "소극적 실행", description: "계획은 세우지만 실행 과정에서 어려움을 겪거나 추진력이 부족한 경우가 많습니다" },
      1: { keyword: "실행력 부족", description: "계획 수립 후 실행으로 이어지는 경우가 드물며, 변화에 대한 저항이나 추진력 부족이 있습니다" }
    }
  }
};

/**
 * 행동지표 기반 점수 매핑
 */
export const getScoreBehaviorIndicator = (score: number): BehaviorIndicator => {
  return BEHAVIOR_INDICATORS.find(indicator => indicator.score === score) || BEHAVIOR_INDICATORS[2];
};

/**
 * 카테고리별 행동지표 매핑
 */
export const getCategoryBehaviorIndicator = (category: keyof typeof CATEGORY_BEHAVIOR_INDICATORS, score: number) => {
  const categoryData = CATEGORY_BEHAVIOR_INDICATORS[category];
  if (!categoryData) return null;
  
  return {
    ...categoryData,
    ...categoryData.indicators[score as keyof typeof categoryData.indicators]
  };
};

/**
 * 행동지표 색상 매핑
 */
export const getScoreColor = (score: number): string => {
  switch (score) {
    case 5: return "text-green-600 bg-green-50 border-green-200";
    case 4: return "text-blue-600 bg-blue-50 border-blue-200";  
    case 3: return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case 2: return "text-orange-600 bg-orange-50 border-orange-200";
    case 1: return "text-red-600 bg-red-50 border-red-200";
    default: return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

/**
 * 행동지표 아이콘 매핑
 */
export const getScoreIcon = (score: number): string => {
  switch (score) {
    case 5: return "★"; // 선도적
    case 4: return "●"; // 적극적
    case 3: return "◐"; // 부분적
    case 2: return "○"; // 계획
    case 1: return "◯"; // 미실행
    default: return "?";
  }
};
