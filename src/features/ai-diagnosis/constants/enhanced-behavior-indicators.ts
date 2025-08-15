/**
 * 🎯 개선된 행동지표 시스템
 * 실무 기반의 구체적이고 측정 가능한 행동 지표
 */

export interface EnhancedBehaviorIndicator {
  score: number;
  label: string;
  keyword: string;
  description: string;
  actionItems: string[];  // 구체적인 행동 항목
  expectedOutcome: string; // 기대 결과
  color: string;
  bgColor: string;
}

export const ENHANCED_BEHAVIOR_INDICATORS: EnhancedBehaviorIndicator[] = [
  {
    score: 5,
    label: "완전히 구현됨",
    keyword: "혁신적 선도",
    description: "업계 최고 수준의 AI 역량을 보유하고 혁신을 주도하고 있습니다",
    actionItems: [
      "AI 전담 조직 운영 중",
      "전사 AI 교육 프로그램 정기 실시",
      "AI 기반 신규 비즈니스 모델 운영",
      "데이터 기반 의사결정 체계 완비"
    ],
    expectedOutcome: "AI를 통한 매출 30% 이상 증대, 업무 효율성 50% 향상",
    color: "text-green-700",
    bgColor: "bg-green-50 border-green-200"
  },
  {
    score: 4,
    label: "대부분 구현됨",
    keyword: "전략적 실행",
    description: "체계적인 AI 도입 계획을 수립하고 적극적으로 실행하고 있습니다",
    actionItems: [
      "AI 도입 로드맵 수립 완료",
      "주요 부서 AI 툴 활용 중",
      "데이터 수집 및 관리 체계 구축",
      "AI 역량 강화 교육 진행 중"
    ],
    expectedOutcome: "핵심 업무 자동화 달성, 생산성 20% 향상",
    color: "text-blue-700",
    bgColor: "bg-blue-50 border-blue-200"
  },
  {
    score: 3,
    label: "부분적 구현",
    keyword: "기초 운영",
    description: "일부 영역에서 AI를 활용하고 있으나 체계적인 접근이 필요합니다",
    actionItems: [
      "특정 업무에 AI 도구 시범 적용",
      "기본적인 데이터 수집 진행",
      "AI 관련 정보 수집 및 검토",
      "일부 직원 AI 활용 시작"
    ],
    expectedOutcome: "단순 반복 업무 일부 자동화, 업무 시간 10% 절감",
    color: "text-yellow-700",
    bgColor: "bg-yellow-50 border-yellow-200"
  },
  {
    score: 2,
    label: "초기 단계",
    keyword: "준비 중",
    description: "AI 도입을 검토하고 있으나 구체적인 실행이 부족한 상황입니다",
    actionItems: [
      "AI 도입 필요성 인식",
      "경쟁사 사례 조사 중",
      "예산 확보 검토",
      "담당자 지정 검토"
    ],
    expectedOutcome: "AI 도입 계획 수립, 파일럿 프로젝트 준비",
    color: "text-orange-700",
    bgColor: "bg-orange-50 border-orange-200"
  },
  {
    score: 1,
    label: "미구현",
    keyword: "도입 필요",
    description: "AI 도입이 시급하며 즉각적인 액션이 필요합니다",
    actionItems: [
      "AI 기초 교육 필요",
      "현황 분석 필요",
      "전략 수립 필요",
      "예산 계획 필요"
    ],
    expectedOutcome: "AI 도입 기반 마련, 조직 인식 개선",
    color: "text-red-700",
    bgColor: "bg-red-50 border-red-200"
  }
];

/**
 * 카테고리별 개선된 행동지표
 */
export const ENHANCED_CATEGORY_INDICATORS = {
  businessFoundation: {
    title: "비즈니스 기반",
    icon: "💼",
    description: "사업 모델, 프로세스, 데이터 관리 체계",
    indicators: {
      5: {
        keyword: "디지털 혁신 리더",
        description: "AI 기반 비즈니스 모델 혁신으로 시장을 선도하고 있습니다",
        actionItems: [
          "AI 기반 신규 서비스 출시",
          "전사 디지털 트랜스포메이션 완료",
          "데이터 기반 의사결정 100% 적용",
          "AI 수익 모델 확립"
        ]
      },
      4: {
        keyword: "전략적 통합",
        description: "AI를 핵심 비즈니스 전략에 통합하여 운영하고 있습니다",
        actionItems: [
          "주요 프로세스 AI 적용",
          "데이터 플랫폼 구축 완료",
          "AI ROI 측정 체계 운영",
          "정기적 성과 분석"
        ]
      },
      3: {
        keyword: "부분적 적용",
        description: "일부 비즈니스 영역에 AI를 도입하여 개선 중입니다",
        actionItems: [
          "핵심 업무 AI 파일럿 진행",
          "데이터 표준화 작업 중",
          "프로세스 문서화 진행",
          "성과 지표 개발 중"
        ]
      },
      2: {
        keyword: "기초 준비",
        description: "AI 도입을 위한 비즈니스 기반을 준비하고 있습니다",
        actionItems: [
          "현황 분석 진행",
          "프로세스 정리 시작",
          "데이터 수집 계획 수립",
          "예산 검토 중"
        ]
      },
      1: {
        keyword: "개선 필요",
        description: "비즈니스 기반 강화가 시급히 필요합니다",
        actionItems: [
          "사업 모델 재정립 필요",
          "프로세스 표준화 필요",
          "데이터 관리 체계 구축 필요",
          "전략 수립 필요"
        ]
      }
    }
  },
  organizationReadiness: {
    title: "조직 준비도",
    icon: "👥",
    description: "리더십, 조직문화, 인재 역량",
    indicators: {
      5: {
        keyword: "AI 네이티브 조직",
        description: "전 구성원이 AI를 자유롭게 활용하는 혁신적 조직문화를 보유하고 있습니다",
        actionItems: [
          "CEO 직접 AI 전략 주도",
          "전 직원 AI 활용 능력 보유",
          "AI 혁신 문화 정착",
          "지속적 학습 체계 운영"
        ]
      },
      4: {
        keyword: "적극적 수용",
        description: "리더십의 강력한 지원 하에 조직 전체가 AI를 수용하고 있습니다",
        actionItems: [
          "경영진 AI 이해도 높음",
          "AI 전담팀 운영",
          "정기 교육 프로그램 실시",
          "변화 관리 체계 구축"
        ]
      },
      3: {
        keyword: "점진적 변화",
        description: "AI 도입에 대한 공감대가 형성되어 점진적으로 변화하고 있습니다",
        actionItems: [
          "중간관리자 AI 교육 실시",
          "파일럿 팀 구성",
          "기초 교육 프로그램 운영",
          "변화 필요성 공유"
        ]
      },
      2: {
        keyword: "인식 단계",
        description: "AI 도입 필요성을 인식하고 조직 준비를 시작했습니다",
        actionItems: [
          "리더십 교육 계획",
          "담당자 지정",
          "기초 인식 제고",
          "변화 계획 수립"
        ]
      },
      1: {
        keyword: "준비 부족",
        description: "조직의 AI 준비도가 낮아 체계적인 준비가 필요합니다",
        actionItems: [
          "리더십 인식 개선 필요",
          "조직 문화 개선 필요",
          "인재 육성 계획 필요",
          "변화 관리 전략 필요"
        ]
      }
    }
  },
  techInfrastructure: {
    title: "기술 인프라",
    icon: "🖥️",
    description: "IT 시스템, 데이터, 보안 체계",
    indicators: {
      5: {
        keyword: "최첨단 인프라",
        description: "클라우드 기반 최신 AI 인프라를 완벽하게 구축하여 운영하고 있습니다",
        actionItems: [
          "클라우드 AI 플랫폼 운영",
          "실시간 데이터 파이프라인 구축",
          "MLOps 체계 완비",
          "엔터프라이즈급 보안 적용"
        ]
      },
      4: {
        keyword: "체계적 구축",
        description: "AI 활용을 위한 기술 인프라가 체계적으로 구축되어 있습니다",
        actionItems: [
          "AI 개발 환경 구축",
          "데이터 레이크 운영",
          "API 통합 완료",
          "보안 체계 강화"
        ]
      },
      3: {
        keyword: "기본 인프라",
        description: "AI 도입을 위한 기본적인 기술 인프라를 갖추고 있습니다",
        actionItems: [
          "클라우드 전환 진행",
          "데이터 통합 작업 중",
          "기본 보안 적용",
          "시스템 현대화 진행"
        ]
      },
      2: {
        keyword: "인프라 개선 중",
        description: "기존 인프라를 AI 도입에 맞게 개선하고 있습니다",
        actionItems: [
          "인프라 현황 분석",
          "클라우드 도입 검토",
          "데이터 정리 시작",
          "보안 점검 실시"
        ]
      },
      1: {
        keyword: "인프라 부족",
        description: "AI 도입을 위한 기술 인프라 구축이 시급합니다",
        actionItems: [
          "IT 현대화 필요",
          "데이터 체계 구축 필요",
          "클라우드 전환 필요",
          "보안 강화 필요"
        ]
      }
    }
  },
  goalClarity: {
    title: "목표 명확성",
    icon: "🎯",
    description: "AI 도입 목표, KPI, 로드맵",
    indicators: {
      5: {
        keyword: "SMART 목표 달성",
        description: "구체적이고 측정 가능한 AI 목표를 설정하고 달성하고 있습니다",
        actionItems: [
          "정량적 KPI 100% 달성",
          "ROI 목표 초과 달성",
          "분기별 성과 측정 및 개선",
          "차년도 목표 수립 완료"
        ]
      },
      4: {
        keyword: "명확한 목표",
        description: "체계적인 AI 도입 목표와 실행 계획을 수립했습니다",
        actionItems: [
          "SMART 목표 설정 완료",
          "단계별 마일스톤 정의",
          "KPI 대시보드 운영",
          "정기 성과 리뷰"
        ]
      },
      3: {
        keyword: "목표 수립",
        description: "AI 도입 목표를 수립하고 구체화하고 있습니다",
        actionItems: [
          "주요 목표 설정",
          "성과 지표 개발 중",
          "로드맵 작성 중",
          "예산 계획 수립"
        ]
      },
      2: {
        keyword: "목표 검토",
        description: "AI 도입 목표를 검토하고 정립 중입니다",
        actionItems: [
          "목표 초안 작성",
          "벤치마킹 진행",
          "우선순위 검토",
          "타당성 분석"
        ]
      },
      1: {
        keyword: "목표 미정",
        description: "명확한 AI 도입 목표 설정이 필요합니다",
        actionItems: [
          "비전 수립 필요",
          "목표 설정 워크샵 필요",
          "KPI 정의 필요",
          "로드맵 수립 필요"
        ]
      }
    }
  },
  executionCapability: {
    title: "실행 역량",
    icon: "⚡",
    description: "프로젝트 관리, 실행력, 성과 창출",
    indicators: {
      5: {
        keyword: "탁월한 실행력",
        description: "AI 프로젝트를 성공적으로 실행하여 가시적 성과를 창출하고 있습니다",
        actionItems: [
          "다수 AI 프로젝트 성공",
          "ROI 입증 완료",
          "Best Practice 확립",
          "지속적 확산 진행"
        ]
      },
      4: {
        keyword: "안정적 실행",
        description: "체계적인 프로젝트 관리로 AI 도입을 안정적으로 실행하고 있습니다",
        actionItems: [
          "프로젝트 관리 체계 운영",
          "주요 프로젝트 진행 중",
          "중간 성과 달성",
          "리스크 관리 실시"
        ]
      },
      3: {
        keyword: "실행 진행",
        description: "AI 파일럿 프로젝트를 진행하며 실행 역량을 강화하고 있습니다",
        actionItems: [
          "파일럿 프로젝트 운영",
          "프로젝트팀 구성",
          "초기 성과 확인",
          "개선점 도출"
        ]
      },
      2: {
        keyword: "실행 준비",
        description: "AI 프로젝트 실행을 위한 준비를 진행하고 있습니다",
        actionItems: [
          "실행 계획 수립",
          "팀 구성 검토",
          "리소스 확보 진행",
          "일정 계획 수립"
        ]
      },
      1: {
        keyword: "실행력 부족",
        description: "AI 프로젝트 실행 역량 강화가 필요합니다",
        actionItems: [
          "PM 역량 강화 필요",
          "실행 체계 구축 필요",
          "리소스 확보 필요",
          "Quick Win 전략 필요"
        ]
      }
    }
  }
};

/**
 * 점수별 행동지표 가져오기
 */
export function getEnhancedBehaviorIndicator(score: number): EnhancedBehaviorIndicator | undefined {
  return ENHANCED_BEHAVIOR_INDICATORS.find(indicator => indicator.score === score);
}

/**
 * 카테고리별 행동지표 가져오기
 */
export function getEnhancedCategoryIndicator(
  category: keyof typeof ENHANCED_CATEGORY_INDICATORS,
  score: number
) {
  const categoryData = ENHANCED_CATEGORY_INDICATORS[category];
  if (!categoryData) return null;
  
  const indicator = categoryData.indicators[score as keyof typeof categoryData.indicators];
  if (!indicator) return null;
  
  return {
    ...categoryData,
    indicator
  };
}

/**
 * 점수에 따른 색상 반환
 */
export function getScoreColor(score: number): string {
  const indicator = getEnhancedBehaviorIndicator(score);
  return indicator?.color || 'text-gray-700';
}

/**
 * 점수에 따른 배경색 반환
 */
export function getScoreBgColor(score: number): string {
  const indicator = getEnhancedBehaviorIndicator(score);
  return indicator?.bgColor || 'bg-gray-50 border-gray-200';
}

/**
 * 점수에 따른 아이콘 반환
 */
export function getScoreIcon(score: number): string {
  switch (score) {
    case 5: return '🏆';
    case 4: return '⭐';
    case 3: return '✅';
    case 2: return '💡';
    case 1: return '⚠️';
    default: return '❓';
  }
}
