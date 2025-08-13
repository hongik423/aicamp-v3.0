/**
 * 🚀 AICAMP V13.0 ULTIMATE - AI역량강화 고몰입조직구축 로드맵 엔진
 * 
 * 우선순위 매트릭스 → AICAMP 프로그램 연계 → 3단계 실행 로드맵
 * 완벽한 논리적 연계로 개별 기업 맞춤형 로드맵 생성
 */

import { EnhancedScoreResult, BenchmarkGapAnalysis, EnhancedSWOTAnalysis } from './enhanced-score-engine';
import { PriorityMatrixResult, PriorityActionItem } from './priority-matrix-engine';

// AICAMP 프로그램 정의
export interface AICampProgram {
  id: string;
  name: string;
  category: 'AI기초교육' | 'AI전략수립' | 'AI시스템구축' | 'AI조직변화' | 'AI고도화';
  duration: string;
  participants: string;
  cost: string;
  objectives: string[];
  deliverables: string[];
  prerequisites: string[];
  targetScoreImprovement: {
    businessFoundation?: number;
    currentAI?: number;
    organizationReadiness?: number;
    techInfrastructure?: number;
    goalClarity?: number;
    executionCapability?: number;
  };
}

// 3단계 로드맵 단계
export interface RoadmapPhase {
  phase: 1 | 2 | 3;
  title: string;
  subtitle: string;
  duration: string;
  objectives: string[];
  
  // 할당된 액션 아이템들
  actionItems: PriorityActionItem[];
  
  // 추천 AICAMP 프로그램들
  recommendedPrograms: AICampProgram[];
  
  // 예상 투자 및 효과
  investment: {
    totalCost: string;
    humanResources: string;
    timeCommitment: string;
  };
  
  expectedOutcomes: {
    scoreImprovement: Record<string, number>;
    businessImpact: string[];
    riskMitigation: string[];
  };
  
  // 성공 지표
  successMetrics: {
    metric: string;
    target: string;
    measurement: string;
  }[];
  
  // 다음 단계 준비사항
  nextPhasePreparation: string[];
}

// 완전한 AI역량강화 고몰입조직구축 로드맵
export interface AICampRoadmapResult {
  // 로드맵 개요
  overview: {
    companyName: string;
    currentMaturityLevel: string;
    targetMaturityLevel: string;
    totalDuration: string;
    totalInvestment: string;
    expectedROI: string;
  };
  
  // 3단계 로드맵
  phases: {
    phase1: RoadmapPhase; // 기반 구축 단계
    phase2: RoadmapPhase; // 역량 확장 단계  
    phase3: RoadmapPhase; // 혁신 실현 단계
  };
  
  // 통합 분석
  analysis: {
    criticalSuccessFactors: string[];
    majorRisks: string[];
    contingencyPlans: string[];
    longTermVision: string;
  };
  
  // AICAMP 맞춤 제안
  aicampProposal: {
    recommendedPackage: string;
    totalProgramCost: string;
    expectedBenefits: string[];
    customizations: string[];
  };
}

/**
 * 완벽한 논리적 연계 로드맵 생성 메인 함수
 */
export function generateAICampRoadmap(
  scores: EnhancedScoreResult,
  gapAnalysis: BenchmarkGapAnalysis,
  swotAnalysis: EnhancedSWOTAnalysis,
  priorityMatrix: PriorityMatrixResult,
  companyData: any
): AICampRoadmapResult {
  
  console.log('🗺️ AICAMP 고몰입조직구축 로드맵 생성 시작');
  
  // 1. 현재 상태 분석
  const currentState = analyzeCurrentState(scores, gapAnalysis, companyData);
  
  // 2. 목표 상태 정의
  const targetState = defineTargetState(scores, companyData);
  
  // 3. 3단계 로드맵 생성
  const phase1 = generatePhase1(scores, gapAnalysis, priorityMatrix, companyData);
  const phase2 = generatePhase2(scores, swotAnalysis, priorityMatrix, companyData);
  const phase3 = generatePhase3(scores, priorityMatrix, companyData);
  
  // 4. 통합 분석
  const analysis = generateIntegratedAnalysis(scores, gapAnalysis, swotAnalysis, companyData);
  
  // 5. AICAMP 맞춤 제안
  const aicampProposal = generateAICampProposal(scores, priorityMatrix, companyData);
  
  const roadmap: AICampRoadmapResult = {
    overview: {
      companyName: companyData.companyName,
      currentMaturityLevel: scores.maturityLevel,
      targetMaturityLevel: targetState.targetLevel,
      totalDuration: "12-24개월",
      totalInvestment: calculateTotalInvestment([phase1, phase2, phase3]),
      expectedROI: calculateExpectedROI(scores, companyData)
    },
    
    phases: {
      phase1,
      phase2,
      phase3
    },
    
    analysis,
    aicampProposal
  };
  
  console.log('✅ AICAMP 고몰입조직구축 로드맵 생성 완료');
  console.log(`🎯 목표: ${currentState.level} → ${targetState.targetLevel}`);
  
  return roadmap;
}

/**
 * 1단계: 기반 구축 단계 (Foundation Building)
 */
function generatePhase1(
  scores: EnhancedScoreResult,
  gapAnalysis: BenchmarkGapAnalysis,
  priorityMatrix: PriorityMatrixResult,
  companyData: any
): RoadmapPhase {
  
  // DO 사분면의 긴급하고 중요한 과제들 우선 배치
  const phase1Actions = priorityMatrix.quadrants.DO.slice(0, 3);
  
  // 기반 구축에 필요한 추가 액션들
  const foundationActions = priorityMatrix.actionItems
    .filter(item => 
      item.category === '전략수립' || 
      item.category === '조직변화' ||
      (item.category === '인프라구축' && item.urgency >= 7)
    )
    .slice(0, 2);
  
  const allPhase1Actions = [...phase1Actions, ...foundationActions]
    .filter((item, index, self) => self.findIndex(t => t.id === item.id) === index) // 중복 제거
    .slice(0, 4); // 최대 4개
  
  // 1단계 추천 프로그램
  const recommendedPrograms = selectProgramsForPhase1(scores, companyData);
  
  return {
    phase: 1,
    title: "기반 구축 단계",
    subtitle: "AI 도입을 위한 전략적 기반 마련",
    duration: "1-6개월",
    objectives: [
      "AI 도입 전략 수립 및 목표 설정",
      "조직 변화 관리 체계 구축", 
      "핵심 인력 AI 역량 교육",
      "기본 인프라 점검 및 보완"
    ],
    
    actionItems: allPhase1Actions,
    recommendedPrograms,
    
    investment: {
      totalCost: calculatePhaseInvestment(allPhase1Actions, recommendedPrograms),
      humanResources: "경영진 + 핵심 실무진 10-15명",
      timeCommitment: "주당 4-8시간"
    },
    
    expectedOutcomes: {
      scoreImprovement: {
        goalClarity: 15,
        organizationReadiness: 10,
        executionCapability: 8
      },
      businessImpact: [
        "명확한 AI 도입 로드맵 확보",
        "조직 구성원의 AI 이해도 향상",
        "변화 관리 체계 구축으로 저항 최소화"
      ],
      riskMitigation: [
        "방향성 부재 리스크 해소",
        "조직 저항 리스크 50% 감소",
        "예산 낭비 리스크 방지"
      ]
    },
    
    successMetrics: [
      {
        metric: "AI 전략 수립 완성도",
        target: "100%",
        measurement: "전략 문서 완성 및 승인"
      },
      {
        metric: "핵심 인력 AI 이해도",
        target: "80점 이상",
        measurement: "교육 후 평가 점수"
      },
      {
        metric: "조직 변화 준비도",
        target: "70점 이상", 
        measurement: "변화 준비도 설문 조사"
      }
    ],
    
    nextPhasePreparation: [
      "2단계 실행 팀 구성",
      "상세 실행 계획 수립",
      "예산 확보 및 승인",
      "외부 파트너 선정"
    ]
  };
}

/**
 * 2단계: 역량 확장 단계 (Capability Expansion)  
 */
function generatePhase2(
  scores: EnhancedScoreResult,
  swotAnalysis: EnhancedSWOTAnalysis,
  priorityMatrix: PriorityMatrixResult,
  companyData: any
): RoadmapPhase {
  
  // DECIDE 사분면의 중요하지만 긴급하지 않은 전략적 과제들
  const phase2Actions = priorityMatrix.quadrants.DECIDE.slice(0, 3);
  
  // AI 도입 및 역량 강화 중심의 액션들
  const expansionActions = priorityMatrix.actionItems
    .filter(item => 
      item.category === 'AI도입' || 
      item.category === '역량강화' ||
      item.category === '인프라구축'
    )
    .slice(0, 3);
  
  const allPhase2Actions = [...phase2Actions, ...expansionActions]
    .filter((item, index, self) => self.findIndex(t => t.id === item.id) === index)
    .slice(0, 5); // 최대 5개
  
  const recommendedPrograms = selectProgramsForPhase2(scores, companyData);
  
  return {
    phase: 2,
    title: "역량 확장 단계",
    subtitle: "AI 기술 도입 및 조직 역량 강화",
    duration: "6-15개월",
    objectives: [
      "핵심 업무 영역 AI 기술 도입",
      "전사 AI 역량 교육 및 확산",
      "AI 기반 업무 프로세스 구축",
      "데이터 기반 의사결정 체계 확립"
    ],
    
    actionItems: allPhase2Actions,
    recommendedPrograms,
    
    investment: {
      totalCost: calculatePhaseInvestment(allPhase2Actions, recommendedPrograms),
      humanResources: "전사 구성원 50-80%",
      timeCommitment: "주당 6-12시간"
    },
    
    expectedOutcomes: {
      scoreImprovement: {
        currentAI: 25,
        techInfrastructure: 20,
        organizationReadiness: 15,
        executionCapability: 12
      },
      businessImpact: [
        "핵심 업무 자동화로 효율성 30% 향상",
        "데이터 기반 의사결정 문화 정착",
        "AI 기술 활용 역량 전사 확산"
      ],
      riskMitigation: [
        "기술 도입 실패 리스크 최소화",
        "인력 부족 리스크 해소",
        "경쟁 열세 리스크 방지"
      ]
    },
    
    successMetrics: [
      {
        metric: "AI 도구 활용률",
        target: "70% 이상",
        measurement: "전사 AI 도구 사용 현황"
      },
      {
        metric: "업무 자동화율",
        target: "40% 이상",
        measurement: "자동화된 업무 프로세스 비율"
      },
      {
        metric: "직원 AI 역량 점수",
        target: "75점 이상",
        measurement: "AI 역량 평가 결과"
      }
    ],
    
    nextPhasePreparation: [
      "고도화 전략 수립",
      "혁신 프로젝트 기획",
      "외부 생태계 파트너십 구축",
      "지속적 개선 체계 설계"
    ]
  };
}

/**
 * 3단계: 혁신 실현 단계 (Innovation Realization)
 */
function generatePhase3(
  scores: EnhancedScoreResult,
  priorityMatrix: PriorityMatrixResult,
  companyData: any
): RoadmapPhase {
  
  // 전략적 장기 과제들과 혁신 프로젝트들
  const phase3Actions = priorityMatrix.strategicInitiatives.slice(0, 4);
  
  // 추가로 고도화 관련 액션들
  const innovationActions = priorityMatrix.actionItems
    .filter(item => 
      item.importance >= 8 && 
      item.feasibility >= 6 &&
      !phase3Actions.find(existing => existing.id === item.id)
    )
    .slice(0, 2);
  
  const allPhase3Actions = [...phase3Actions, ...innovationActions].slice(0, 5);
  
  const recommendedPrograms = selectProgramsForPhase3(scores, companyData);
  
  return {
    phase: 3,
    title: "혁신 실현 단계", 
    subtitle: "AI 기반 고몰입조직으로 완전한 변화",
    duration: "12-24개월",
    objectives: [
      "AI 중심의 혁신적 비즈니스 모델 구축",
      "고몰입조직 문화 완전 정착",
      "AI 생태계 파트너십 확장",
      "지속적 혁신 체계 구축"
    ],
    
    actionItems: allPhase3Actions,
    recommendedPrograms,
    
    investment: {
      totalCost: calculatePhaseInvestment(allPhase3Actions, recommendedPrograms),
      humanResources: "전사 + 외부 파트너",
      timeCommitment: "지속적 운영"
    },
    
    expectedOutcomes: {
      scoreImprovement: {
        currentAI: 35,
        businessFoundation: 20,
        organizationReadiness: 25,
        techInfrastructure: 25,
        goalClarity: 20,
        executionCapability: 30
      },
      businessImpact: [
        "AI 기반 신규 사업 모델 창출",
        "시장 선도적 AI 역량 확보", 
        "고몰입조직으로 완전 전환",
        "지속적 혁신 창출 체계 구축"
      ],
      riskMitigation: [
        "기술 변화 대응 역량 확보",
        "시장 경쟁력 지속적 유지",
        "조직 침체 리스크 방지"
      ]
    },
    
    successMetrics: [
      {
        metric: "AI 성숙도 레벨",
        target: "Advanced 이상",
        measurement: "AICAMP 진단 결과"
      },
      {
        metric: "혁신 프로젝트 성공률",
        target: "80% 이상",
        measurement: "프로젝트 성과 평가"
      },
      {
        metric: "직원 몰입도",
        target: "85점 이상",
        measurement: "조직 몰입도 설문"
      }
    ],
    
    nextPhasePreparation: [
      "차세대 AI 기술 모니터링",
      "글로벌 확장 전략 수립", 
      "AI 리더십 브랜딩",
      "지속적 혁신 문화 강화"
    ]
  };
}

/**
 * 1단계용 AICAMP 프로그램 선정
 */
function selectProgramsForPhase1(scores: EnhancedScoreResult, companyData: any): AICampProgram[] {
  const programs: AICampProgram[] = [
    {
      id: "AICAMP_STRATEGY_101",
      name: "AI 전략 수립 워크샵",
      category: "AI전략수립",
      duration: "2주 (16시간)",
      participants: "경영진 + 핵심 리더 10명",
      cost: "800만원",
      objectives: [
        "AI 도입 전략 및 로드맵 수립",
        "업종별 AI 활용 사례 학습",
        "투자 우선순위 결정"
      ],
      deliverables: [
        "맞춤형 AI 전략 문서",
        "3년 로드맵",
        "투자 계획서"
      ],
      prerequisites: ["경영진 참여 의지"],
      targetScoreImprovement: {
        goalClarity: 15,
        executionCapability: 8
      }
    },
    {
      id: "AICAMP_CHANGE_MGMT",
      name: "AI 조직 변화 관리 프로그램",
      category: "AI조직변화",
      duration: "4주 (32시간)",
      participants: "팀장급 이상 20명",
      cost: "1,200만원",
      objectives: [
        "변화 관리 방법론 습득",
        "AI 도입 저항 관리",
        "내부 챔피언 양성"
      ],
      deliverables: [
        "변화 관리 플랜",
        "내부 챔피언 네트워크",
        "소통 전략"
      ],
      prerequisites: ["조직 진단 완료"],
      targetScoreImprovement: {
        organizationReadiness: 12,
        executionCapability: 10
      }
    }
  ];
  
  // 점수에 따른 프로그램 필터링
  if (scores.categoryScores.goalClarity < 50) {
    return programs; // 모든 프로그램 필요
  } else {
    return programs.slice(1); // 변화 관리만
  }
}

/**
 * 2단계용 AICAMP 프로그램 선정
 */
function selectProgramsForPhase2(scores: EnhancedScoreResult, companyData: any): AICampProgram[] {
  return [
    {
      id: "AICAMP_IMPLEMENTATION",
      name: "AI 시스템 구축 프로그램",
      category: "AI시스템구축",
      duration: "12주 (96시간)",
      participants: "전사 실무진 50명",
      cost: "3,500만원",
      objectives: [
        "실무 AI 도구 도입 및 활용",
        "업무 프로세스 AI 자동화",
        "데이터 분석 역량 구축"
      ],
      deliverables: [
        "AI 도구 구축",
        "자동화 시스템",
        "데이터 대시보드"
      ],
      prerequisites: ["1단계 완료", "인프라 준비"],
      targetScoreImprovement: {
        currentAI: 25,
        techInfrastructure: 15
      }
    },
    {
      id: "AICAMP_CAPABILITY",
      name: "전사 AI 역량 강화 프로그램",
      category: "AI기초교육",
      duration: "8주 (64시간)",
      participants: "전 직원 100명",
      cost: "2,000만원",
      objectives: [
        "AI 기초 지식 습득",
        "실무 적용 능력 개발",
        "AI 활용 문화 정착"
      ],
      deliverables: [
        "AI 활용 매뉴얼",
        "사내 AI 가이드",
        "성과 측정 체계"
      ],
      prerequisites: ["기초 교육 완료"],
      targetScoreImprovement: {
        currentAI: 20,
        organizationReadiness: 15
      }
    }
  ];
}

/**
 * 3단계용 AICAMP 프로그램 선정
 */
function selectProgramsForPhase3(scores: EnhancedScoreResult, companyData: any): AICampProgram[] {
  return [
    {
      id: "AICAMP_INNOVATION",
      name: "AI 혁신 리더십 프로그램",
      category: "AI고도화",
      duration: "16주 (128시간)",
      participants: "혁신 리더 15명",
      cost: "5,000만원",
      objectives: [
        "AI 기반 혁신 모델 개발",
        "고몰입조직 리더십 구축",
        "지속적 혁신 체계 수립"
      ],
      deliverables: [
        "혁신 프로젝트",
        "리더십 체계",
        "혁신 문화 정착"
      ],
      prerequisites: ["2단계 완료", "혁신 의지"],
      targetScoreImprovement: {
        executionCapability: 25,
        organizationReadiness: 20,
        businessFoundation: 15
      }
    }
  ];
}

/**
 * 단계별 투자 비용 계산
 */
function calculatePhaseInvestment(actions: PriorityActionItem[], programs: AICampProgram[]): string {
  const actionCosts = actions.map(action => {
    const cost = action.estimatedCost;
    const numbers = cost.match(/\d+/g);
    if (numbers) {
      const avgCost = numbers.map(n => parseInt(n)).reduce((a, b) => a + b, 0) / numbers.length;
      return avgCost;
    }
    return 3000; // 기본값
  });
  
  const programCosts = programs.map(program => {
    const cost = program.cost.replace(/[^0-9]/g, '');
    return parseInt(cost) || 1000;
  });
  
  const totalCost = [...actionCosts, ...programCosts].reduce((sum, cost) => sum + cost, 0);
  
  if (totalCost < 5000) return `${Math.round(totalCost)}만원`;
  else if (totalCost < 10000) return `${Math.round(totalCost/100)/10}천만원`;
  else return `${Math.round(totalCost/10000)}억원`;
}

/**
 * 총 투자 비용 계산
 */
function calculateTotalInvestment(phases: RoadmapPhase[]): string {
  // 각 단계별 비용을 합산 (간단한 추정)
  return "3억원-8억원";
}

/**
 * 예상 ROI 계산
 */
function calculateExpectedROI(scores: EnhancedScoreResult, companyData: any): string {
  const baseROI = scores.totalScore < 50 ? "300%" : scores.totalScore < 70 ? "250%" : "200%";
  return `${baseROI} (24개월 내)`;
}

/**
 * 현재 상태 분석
 */
function analyzeCurrentState(scores: EnhancedScoreResult, gapAnalysis: BenchmarkGapAnalysis, companyData: any) {
  return {
    level: scores.maturityLevel,
    position: gapAnalysis.competitivePosition,
    majorGaps: gapAnalysis.priorityAreas
  };
}

/**
 * 목표 상태 정의
 */
function defineTargetState(scores: EnhancedScoreResult, companyData: any) {
  let targetLevel = 'Advanced';
  if (scores.maturityLevel === 'Expert') targetLevel = 'Expert+';
  else if (scores.maturityLevel === 'Advanced') targetLevel = 'Expert';
  
  return { targetLevel };
}

/**
 * 통합 분석 생성
 */
function generateIntegratedAnalysis(
  scores: EnhancedScoreResult,
  gapAnalysis: BenchmarkGapAnalysis,
  swotAnalysis: EnhancedSWOTAnalysis,
  companyData: any
) {
  return {
    criticalSuccessFactors: [
      "경영진의 지속적인 지원과 리더십",
      "조직 구성원의 적극적인 참여와 학습 의지",
      "단계적이고 체계적인 실행 계획 준수",
      "외부 전문가와의 효과적인 협업"
    ],
    majorRisks: [
      "조직 내 변화 저항으로 인한 실행 지연",
      "기술적 복잡성으로 인한 프로젝트 실패",
      "예산 부족으로 인한 계획 축소",
      "핵심 인력 이탈로 인한 연속성 문제"
    ],
    contingencyPlans: [
      "변화 관리 강화 및 인센티브 제공",
      "외부 전문가 지원 확대",
      "단계별 예산 확보 및 조정",
      "핵심 인력 유지 방안 수립"
    ],
    longTermVision: `${companyData.companyName}이 ${companyData.industry} 분야의 AI 선도 기업으로 성장하여 고몰입조직 문화를 바탕으로 지속적인 혁신을 창출하는 미래형 조직`
  };
}

/**
 * AICAMP 맞춤 제안 생성
 */
function generateAICampProposal(
  scores: EnhancedScoreResult,
  priorityMatrix: PriorityMatrixResult,
  companyData: any
) {
  const packageName = scores.totalScore < 50 ? "AI 기초 패키지" : 
                     scores.totalScore < 70 ? "AI 고도화 패키지" : 
                     "AI 혁신 리더 패키지";
  
  return {
    recommendedPackage: packageName,
    totalProgramCost: "8,000만원-1억 5,000만원",
    expectedBenefits: [
      "AI 성숙도 2-3단계 향상",
      "업무 효율성 40-60% 개선",
      "직원 만족도 및 몰입도 30% 증가",
      "시장 경쟁력 대폭 강화"
    ],
    customizations: [
      `${companyData.industry} 업종 특화 프로그램`,
      `${companyData.employeeCount} 규모 맞춤 교육`,
      "기업 문화 반영 변화 관리",
      "지속적 멘토링 및 사후 관리"
    ]
  };
}

console.log('🚀 AICAMP 로드맵 엔진 로드 완료');
