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
      5: { keyword: "AI 네이티브 조직", description: "ChatGPT, Claude, Midjourney 등을 일상적으로 활용하여 문서작성 시간 50% 단축, 고객응대 자동화 80%, 데이터 분석 업무 완전 AI화로 생산성 혁신을 달성했습니다" },
      4: { keyword: "다영역 AI 활용", description: "마케팅(AI 카피라이팅), 영업(고객 데이터 분석), 인사(채용 스크리닝), 회계(자동 분류) 등 5개 이상 업무 영역에서 AI 도구를 정기적으로 사용합니다" },
      3: { keyword: "기본 AI 도구 활용", description: "ChatGPT로 이메일 작성, 파파고로 번역, 엑셀 AI 기능으로 데이터 정리 등 2-3개 AI 도구를 주 2-3회 업무에 활용합니다" },
      2: { keyword: "탐색적 사용", description: "AI 도구의 존재는 알고 있고 가끔 호기심으로 사용해보지만, 업무에 체계적으로 적용하지 못하고 있으며 효과를 체감하지 못합니다" },
      1: { keyword: "AI 미사용", description: "AI 도구를 전혀 사용하지 않거나 사용법을 모르며, 기존 수작업 방식을 고수하고 있어 AI의 업무 적용 가능성을 인식하지 못합니다" }
    }
  },
  organizationReadiness: {
    title: "조직 준비도",
    icon: "",
    indicators: {
      5: { keyword: "AI 혁신 조직", description: "CEO가 AI 전담 임원(CAO)을 임명하고, AI 전담팀 구성, 월 1회 AI 전략회의 개최, 전 직원 AI 교육 이수, 실패를 허용하는 혁신 문화가 정착되어 있습니다" },
      4: { keyword: "체계적 AI 준비", description: "경영진이 AI 도입에 적극적이며, AI 전담 담당자 지정, 분기별 AI 교육 실시, 직원 70% 이상이 AI 도구 사용 경험 보유, 변화 관리 프로세스가 구축되어 있습니다" },
      3: { keyword: "기본 준비 단계", description: "AI 도입 필요성을 인식하고 일부 부서에서 AI 도구 시범 사용 중이며, 직원 30-50%가 AI에 관심을 보이고 기본적인 교육 계획이 있습니다" },
      2: { keyword: "관심 단계", description: "경영진이 AI에 관심을 보이지만 구체적 계획 부족, 일부 직원만 개인적으로 AI 도구 사용, 체계적인 교육이나 조직적 지원이 미흡합니다" },
      1: { keyword: "저항 단계", description: "기존 업무 방식 고수, AI에 대한 불안감과 저항, '우리 업종에는 AI가 필요 없다'는 인식, 새로운 기술 학습에 대한 거부감이 강합니다" }
    }
  },
  techInfrastructure: {
    title: "기술 인프라",
    icon: "",
    indicators: {
      5: { keyword: "AI 전용 클라우드 인프라", description: "AWS SageMaker, Azure AI, Google Cloud AI Platform 활용, API 통합 시스템 구축, 실시간 데이터 처리 파이프라인, 고급 보안 체계 완비로 AI 서비스 자체 개발이 가능합니다" },
      4: { keyword: "현대적 디지털 인프라", description: "클라우드 기반 업무 시스템, 충분한 컴퓨팅 파워(i7급 이상 PC), 고속 인터넷(100Mbps+), 통합 데이터베이스, 모바일 업무 환경 완비로 대부분의 AI 도구 활용이 원활합니다" },
      3: { keyword: "기본 IT 환경", description: "일반적인 사무용 PC(i5급), 안정적인 인터넷, 기본 오피스 프로그램은 갖춰져 있으나 AI 전용 서버나 고급 데이터 분석 환경은 부족합니다" },
      2: { keyword: "제한적 IT 환경", description: "구형 컴퓨터(5년 이상), 불안정한 인터넷, 기본적인 보안 시스템으로 AI 도구 사용 시 속도 저하나 호환성 문제가 자주 발생합니다" },
      1: { keyword: "노후 IT 인프라", description: "10년 이상 된 컴퓨터, 느린 인터넷(10Mbps 이하), 낡은 소프트웨어로 최신 AI 도구 사용이 거의 불가능하거나 매우 제한적입니다" }
    }
  },
  goalClarity: {
    title: "목표 명확성",
    icon: "",
    indicators: {
      5: { keyword: "SMART 목표 완전 달성", description: "생산성 30% 향상, 비용 20% 절감, 고객 응답시간 50% 단축 등 구체적 수치 목표와 달성 기한, 책임자, 예산이 명시된 완벽한 AI 도입 계획서를 보유하고 있습니다" },
      4: { keyword: "구체적 목표 수립", description: "업무 효율성 향상 25%, 매출 증대 15% 등 측정 가능한 목표와 분기별 마일스톤, 성과 측정 지표(KPI)가 문서화되어 있으며 정기적으로 진행 상황을 점검합니다" },
      3: { keyword: "기본적 목표 설정", description: "업무 개선, 경쟁력 강화, 고객 만족도 향상 등 일반적인 목표는 설정했으나 구체적인 수치나 달성 기한, 측정 방법이 부족합니다" },
      2: { keyword: "막연한 목표", description: "AI 도입이 필요하다는 인식과 '더 나아질 것'이라는 기대는 있으나 구체적인 목표나 성공 기준, 예산 계획이 없어 추상적인 수준에 머물러 있습니다" },
      1: { keyword: "목표 부재", description: "AI 도입에 대한 관심은 있지만 왜 필요한지, 무엇을 달성하고 싶은지에 대한 명확한 목표나 비전이 전혀 설정되지 않은 상태입니다" }
    }
  },
  executionCapability: {
    title: "실행 역량",
    icon: "",
    indicators: {
      5: { keyword: "애자일 실행 문화", description: "AI 파일럿 프로젝트를 2-3개월 내 완료하고, 실패를 통해 빠르게 학습하며, 전담 AI 추진팀과 외부 전문가 협력 체계가 구축되어 지속적인 혁신을 추진합니다" },
      4: { keyword: "체계적 프로젝트 관리", description: "AI 도입 로드맵에 따라 단계별로 실행하며, 정기적인 진행 점검과 이슈 해결 프로세스, 예산 관리 시스템을 갖추고 외부 컨설팅이나 기술 파트너와 협력합니다" },
      3: { keyword: "기본적 실행력", description: "새로운 시스템 도입 경험은 있으나 AI 특화 프로젝트 관리 경험은 부족하고, 내부 자원만으로 추진하려 하며 변화 관리에 시간이 소요됩니다" },
      2: { keyword: "계획 중심 접근", description: "완벽한 계획을 세우려 하나 실행 단계에서 예상치 못한 문제에 당황하며, 시행착오를 통한 학습보다는 실패를 회피하려는 경향이 있습니다" },
      1: { keyword: "실행 회피", description: "AI 도입 필요성은 인정하지만 '언젠가는 해야겠다'는 수준에서 머물며, 구체적인 실행 계획이나 추진 의지, 책임자 지정이 없어 계속 미루고 있습니다" }
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
