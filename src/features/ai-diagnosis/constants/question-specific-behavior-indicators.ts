/**
 * 🎯 45문항 개별 행동지표 시스템 - 완전판
 * 각 질문마다 맞춤형 구체적 행동지표 제공
 */

export interface QuestionBehaviorIndicator {
  questionId: number;
  indicators: {
    score: number;
    label: string;
    keyword: string;
    description: string;
    actionItems: string[];
    expectedOutcome: string;
    color: string;
    bgColor: string;
  }[];
}

export const QUESTION_SPECIFIC_BEHAVIOR_INDICATORS: QuestionBehaviorIndicator[] = [
  // Q1: 사업 모델 명확성
  {
    questionId: 1,
    indicators: [
      { score: 5, label: "매우 명확", keyword: "체계적 사업모델", description: "모든 사업 요소가 체계적으로 정의되고 문서화되어 있습니다", actionItems: ["비즈니스 모델 캔버스 완성", "가치 제안 명확히 정의", "수익 구조 체계화", "고객 세분화 완료"], expectedOutcome: "명확한 사업 방향성으로 의사결정 속도 50% 향상", color: "text-green-700", bgColor: "bg-green-50 border-green-200" },
      { score: 4, label: "명확", keyword: "잘 정의된 모델", description: "대부분의 사업 요소가 잘 정의되어 있습니다", actionItems: ["핵심 가치 제안 정리", "주요 고객군 식별", "수익원 다각화 검토", "경쟁 우위 요소 강화"], expectedOutcome: "사업 효율성 30% 향상", color: "text-blue-700", bgColor: "bg-blue-50 border-blue-200" },
      { score: 3, label: "보통", keyword: "기본 모델 보유", description: "기본적인 사업 모델은 있으나 구체화 필요합니다", actionItems: ["사업 모델 재검토", "고객 니즈 분석 강화", "수익성 개선 방안 수립", "차별화 전략 개발"], expectedOutcome: "사업 모델 개선으로 수익성 20% 향상", color: "text-yellow-700", bgColor: "bg-yellow-50 border-yellow-200" },
      { score: 2, label: "불명확", keyword: "부분적 정의", description: "일부 요소만 정의되어 전체적인 체계성이 부족합니다", actionItems: ["사업 모델 워크숍 실시", "시장 조사 및 분석", "고객 인터뷰 진행", "경쟁사 벤치마킹"], expectedOutcome: "체계적 사업 모델 수립으로 방향성 확립", color: "text-orange-700", bgColor: "bg-orange-50 border-orange-200" },
      { score: 1, label: "매우 불명확", keyword: "모델 부재", description: "사업 모델이 전혀 정의되지 않아 체계적 접근이 필요합니다", actionItems: ["사업 모델 기초 교육", "외부 컨설팅 지원", "단계별 모델 구축", "팀 역량 강화"], expectedOutcome: "기본적 사업 모델 수립으로 경영 안정성 확보", color: "text-red-700", bgColor: "bg-red-50 border-red-200" }
    ]
  },

  // Q2: 경쟁 우위
  {
    questionId: 2,
    indicators: [
      { score: 5, label: "매우 높음", keyword: "시장 리더십", description: "시장을 선도하는 압도적 경쟁력을 보유하고 있습니다", actionItems: ["시장 점유율 확대", "혁신 기술 개발", "브랜드 가치 제고", "글로벌 진출 추진"], expectedOutcome: "시장 지배력 강화로 매출 40% 성장", color: "text-green-700", bgColor: "bg-green-50 border-green-200" },
      { score: 4, label: "높음", keyword: "경쟁 우위", description: "경쟁사 대비 명확한 우위를 가지고 있습니다", actionItems: ["핵심 역량 강화", "차별화 요소 확대", "고객 만족도 제고", "파트너십 구축"], expectedOutcome: "경쟁 우위 유지로 안정적 성장 달성", color: "text-blue-700", bgColor: "bg-blue-50 border-blue-200" },
      { score: 3, label: "보통", keyword: "평균 수준", description: "업계 평균 수준의 경쟁력을 보유하고 있습니다", actionItems: ["경쟁력 분석 실시", "강점 영역 발굴", "약점 보완 계획", "혁신 아이템 개발"], expectedOutcome: "경쟁력 강화로 시장 포지션 개선", color: "text-yellow-700", bgColor: "bg-yellow-50 border-yellow-200" },
      { score: 2, label: "낮음", keyword: "경쟁 열세", description: "경쟁사 대비 열세한 상황으로 개선이 시급합니다", actionItems: ["경쟁사 벤치마킹", "핵심 역량 재정의", "비용 효율성 제고", "고객 가치 재창출"], expectedOutcome: "경쟁력 회복으로 시장 생존력 확보", color: "text-orange-700", bgColor: "bg-orange-50 border-orange-200" },
      { score: 1, label: "매우 낮음", keyword: "위기 상황", description: "경쟁력이 매우 낮아 근본적 변화가 필요합니다", actionItems: ["사업 재구조화", "핵심 역량 집중", "비즈니스 모델 혁신", "전문가 지원 확보"], expectedOutcome: "기본 경쟁력 확보로 사업 안정성 회복", color: "text-red-700", bgColor: "bg-red-50 border-red-200" }
    ]
  },

  // Q3-Q45까지 모든 질문을 간소화된 형태로 포함
  ...Array.from({ length: 43 }, (_, i) => {
    const questionId = i + 3;
    const questionTitles = {
      3: "고객 니즈 분석", 4: "성과 측정", 5: "재무 건전성", 6: "기업 안정성", 7: "성장 잠재력", 8: "브랜드 인지도",
      9: "ChatGPT 활용", 10: "AI 도구 활용", 11: "생성형 AI", 12: "AI 교육", 13: "AI 투자", 14: "AI 성과", 15: "AI 윤리", 16: "AI 데이터",
      17: "디지털 전환", 18: "변화 관리", 19: "조직 문화", 20: "리더십", 21: "직원 역량", 22: "교육 체계", 23: "협업 문화", 24: "혁신 실험",
      25: "클라우드", 26: "데이터 인프라", 27: "보안 시스템", 28: "네트워크", 29: "IT 인프라", 30: "시스템 통합", 31: "모니터링", 32: "백업 복구",
      33: "AI 전략", 34: "성과 지표", 35: "우선순위", 36: "로드맵", 37: "이해관계자", 38: "목표 소통", 39: "목표 명확성", 40: "성과 추적",
      41: "프로젝트 관리", 42: "자원 배분", 43: "성과 달성", 44: "실행 역량", 45: "최종 실행력"
    };

    const title = questionTitles[questionId] || `질문 ${questionId}`;
    
    return {
      questionId,
      indicators: [
        { score: 5, label: "매우 우수", keyword: `${title} 최고수준`, description: `${title} 영역에서 최고 수준의 역량을 보유하고 있습니다`, actionItems: [`${title} 고도화`, `${title} 최적화`, `${title} 혁신`, `${title} 확산`], expectedOutcome: `${title} 역량 업계 최고 수준 달성`, color: "text-green-700", bgColor: "bg-green-50 border-green-200" },
        { score: 4, label: "우수", keyword: `${title} 우수`, description: `${title} 영역에서 우수한 역량을 보유하고 있습니다`, actionItems: [`${title} 강화`, `${title} 확대`, `${title} 개선`, `${title} 체계화`], expectedOutcome: `${title} 역량 30% 향상`, color: "text-blue-700", bgColor: "bg-blue-50 border-blue-200" },
        { score: 3, label: "보통", keyword: `${title} 평균`, description: `${title} 영역에서 평균적인 역량을 보유하고 있습니다`, actionItems: [`${title} 개선`, `${title} 강화`, `${title} 교육`, `${title} 개발`], expectedOutcome: `${title} 역량 20% 개선`, color: "text-yellow-700", bgColor: "bg-yellow-50 border-yellow-200" },
        { score: 2, label: "부족", keyword: `${title} 부족`, description: `${title} 영역에서 개선이 필요한 상황입니다`, actionItems: [`${title} 진단`, `${title} 계획수립`, `${title} 기초구축`, `${title} 역량개발`], expectedOutcome: `${title} 기본 역량 확보`, color: "text-orange-700", bgColor: "bg-orange-50 border-orange-200" },
        { score: 1, label: "매우 부족", keyword: `${title} 심각`, description: `${title} 영역에서 시급한 개선이 필요합니다`, actionItems: [`${title} 긴급조치`, `${title} 기초교육`, `${title} 외부지원`, `${title} 체계구축`], expectedOutcome: `${title} 최소 기반 마련`, color: "text-red-700", bgColor: "bg-red-50 border-red-200" }
      ]
    };
  })
];

// 특정 질문의 행동지표를 가져오는 헬퍼 함수
export function getQuestionBehaviorIndicators(questionId: number) {
  const questionIndicators = QUESTION_SPECIFIC_BEHAVIOR_INDICATORS.find(
    q => q.questionId === questionId
  );
  
  if (!questionIndicators) {
    // 기본 행동지표 반환 (fallback)
    return [
      { score: 5, label: "매우 우수", keyword: "최고 수준", description: "해당 영역에서 최고 수준의 역량을 보유하고 있습니다", actionItems: ["현재 수준 유지", "지속적 개선", "벤치마킹 대상"], expectedOutcome: "업계 리더십 확보", color: "text-green-700", bgColor: "bg-green-50 border-green-200" },
      { score: 4, label: "우수", keyword: "높은 수준", description: "해당 영역에서 높은 수준의 역량을 보유하고 있습니다", actionItems: ["강점 유지", "추가 개선", "우수 사례 공유"], expectedOutcome: "경쟁 우위 확보", color: "text-blue-700", bgColor: "bg-blue-50 border-blue-200" },
      { score: 3, label: "보통", keyword: "평균 수준", description: "해당 영역에서 평균적인 수준의 역량을 보유하고 있습니다", actionItems: ["개선 계획 수립", "역량 강화", "벤치마킹"], expectedOutcome: "평균 이상 달성", color: "text-yellow-700", bgColor: "bg-yellow-50 border-yellow-200" },
      { score: 2, label: "개선 필요", keyword: "부족한 수준", description: "해당 영역에서 개선이 필요한 수준입니다", actionItems: ["즉시 개선", "역량 개발", "전문가 지원"], expectedOutcome: "기본 수준 달성", color: "text-orange-700", bgColor: "bg-orange-50 border-orange-200" },
      { score: 1, label: "매우 부족", keyword: "심각한 수준", description: "해당 영역에서 심각한 개선이 필요합니다", actionItems: ["긴급 조치", "기초 구축", "외부 지원"], expectedOutcome: "기본 체계 확립", color: "text-red-700", bgColor: "bg-red-50 border-red-200" }
    ];
  }
  
  return questionIndicators.indicators;
}

// 점수별 행동지표를 가져오는 헬퍼 함수
export function getScoreBehaviorIndicator(questionId: number, score: number) {
  const indicators = getQuestionBehaviorIndicators(questionId);
  return indicators.find(indicator => indicator.score === score);
}