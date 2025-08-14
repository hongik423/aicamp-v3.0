/**
 * AI 역량진단 행동지표 기반 평가 시스템
 * 각 점수별 핵심 행동지표 키워드 정의
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
    label: "매우 그렇다",
    keyword: "선도적 실행",
    description: "업계 선도적 수준으로 체계적 실행",
    color: "text-green-700",
    bgColor: "bg-green-50 border-green-200"
  },
  {
    score: 4,
    label: "그렇다", 
    keyword: "적극적 추진",
    description: "적극적으로 추진하여 성과 창출",
    color: "text-blue-700",
    bgColor: "bg-blue-50 border-blue-200"
  },
  {
    score: 3,
    label: "보통이다",
    keyword: "부분적 시행",
    description: "부분적으로 시행하나 개선 필요",
    color: "text-yellow-700", 
    bgColor: "bg-yellow-50 border-yellow-200"
  },
  {
    score: 2,
    label: "그렇지 않다",
    keyword: "계획 단계",
    description: "계획은 있으나 실행이 미흡",
    color: "text-orange-700",
    bgColor: "bg-orange-50 border-orange-200"
  },
  {
    score: 1,
    label: "전혀 그렇지 않다",
    keyword: "미실행 상태",
    description: "아직 실행하지 않은 상태",
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
    icon: "🏗️",
    indicators: {
      5: { keyword: "전략적 통합", description: "AI를 핵심 비즈니스 전략에 완전 통합" },
      4: { keyword: "체계적 계획", description: "명확한 AI 도입 계획과 로드맵 보유" },
      3: { keyword: "기초 준비", description: "AI 도입을 위한 기초적 준비 진행" },
      2: { keyword: "관심 단계", description: "AI 도입에 대한 관심과 검토 시작" },
      1: { keyword: "인식 부족", description: "AI 도입 필요성 인식이 부족한 상태" }
    }
  },
  currentAI: {
    title: "현재 AI 활용",
    icon: "🤖",
    indicators: {
      5: { keyword: "고도화 활용", description: "다양한 AI 도구를 고도화하여 활용" },
      4: { keyword: "적극적 활용", description: "여러 AI 도구를 적극적으로 활용" },
      3: { keyword: "기본적 활용", description: "기본적인 AI 도구를 부분 활용" },
      2: { keyword: "시범적 활용", description: "일부 AI 도구를 시범적으로 활용" },
      1: { keyword: "미활용 상태", description: "AI 도구를 거의 활용하지 않음" }
    }
  },
  organizationReadiness: {
    title: "조직 준비도",
    icon: "🏢",
    indicators: {
      5: { keyword: "완전한 준비", description: "조직 전체가 AI 도입에 완전 준비" },
      4: { keyword: "적극적 준비", description: "대부분 구성원이 AI 도입에 적극적" },
      3: { keyword: "부분적 준비", description: "일부 구성원이 AI 도입에 관심" },
      2: { keyword: "소극적 관심", description: "AI 도입에 대한 소극적 관심" },
      1: { keyword: "준비 부족", description: "AI 도입 준비가 전반적으로 부족" }
    }
  },
  techInfrastructure: {
    title: "기술 인프라",
    icon: "💻",
    indicators: {
      5: { keyword: "최신 인프라", description: "AI 활용에 최적화된 최신 인프라" },
      4: { keyword: "충분한 인프라", description: "AI 도입에 충분한 기술 인프라" },
      3: { keyword: "기본 인프라", description: "기본적인 IT 인프라는 구축됨" },
      2: { keyword: "부족한 인프라", description: "AI 도입을 위한 인프라 부족" },
      1: { keyword: "인프라 미비", description: "기본적인 IT 인프라도 미비" }
    }
  },
  goalClarity: {
    title: "목표 명확성",
    icon: "🎯",
    indicators: {
      5: { keyword: "명확한 목표", description: "구체적이고 측정가능한 AI 목표" },
      4: { keyword: "체계적 목표", description: "체계적인 AI 도입 목표 수립" },
      3: { keyword: "일반적 목표", description: "일반적인 수준의 AI 목표 설정" },
      2: { keyword: "모호한 목표", description: "AI 목표가 다소 모호한 상태" },
      1: { keyword: "목표 부재", description: "명확한 AI 목표가 없는 상태" }
    }
  },
  executionCapability: {
    title: "실행 역량",
    icon: "⚡",
    indicators: {
      5: { keyword: "뛰어난 실행", description: "계획을 뛰어난 실행력으로 추진" },
      4: { keyword: "우수한 실행", description: "계획을 우수한 실행력으로 추진" },
      3: { keyword: "보통 실행", description: "계획을 보통 수준으로 실행" },
      2: { keyword: "미흡한 실행", description: "계획 대비 실행력이 미흡" },
      1: { keyword: "실행 부족", description: "계획 실행 역량이 부족한 상태" }
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
    case 5: return "🚀"; // 선도적
    case 4: return "💪"; // 적극적
    case 3: return "👍"; // 부분적
    case 2: return "📋"; // 계획
    case 1: return "⏳"; // 미실행
    default: return "❓";
  }
};
