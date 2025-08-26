/**
 * 🎯 AICAMP V13.0 ULTIMATE - 중요도-긴급성-실현가능성 우선순위 매트릭스 엔진
 * 
 * SWOT 분석 결과 → 우선순위 매트릭스 → 실행 로드맵의 완벽한 논리적 연계
 */

import { EnhancedScoreResult, BenchmarkGapAnalysis, EnhancedSWOTAnalysis } from './enhanced-score-engine';

// 우선순위 매트릭스 액션 아이템
export interface PriorityActionItem {
  id: string;
  title: string;
  description: string;
  category: 'AI도입' | '조직변화' | '인프라구축' | '역량강화' | '전략수립';
  
  // 3차원 평가
  importance: number;      // 중요도 (1-10)
  urgency: number;         // 긴급성 (1-10)
  feasibility: number;     // 실현가능성 (1-10)
  
  // 계산된 우선순위
  priorityScore: number;   // 종합 우선순위 점수
  quadrant: 'DO' | 'DECIDE' | 'DELEGATE' | 'DELETE'; // 아이젠하워 매트릭스
  
  // 실행 정보
  estimatedCost: string;
  estimatedDuration: string;
  requiredResources: string[];
  expectedBenefit: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  
  // SWOT 연계
  swotOrigin: {
    type: 'SO' | 'WO' | 'ST' | 'WT';
    source: string; // 어떤 SWOT 요소에서 도출되었는지
  };
}

// 우선순위 매트릭스 결과
export interface PriorityMatrixResult {
  actionItems: PriorityActionItem[];
  
  // 사분면별 분류
  quadrants: {
    DO: PriorityActionItem[];      // 중요하고 긴급함 (즉시 실행)
    DECIDE: PriorityActionItem[];  // 중요하지만 긴급하지 않음 (계획 후 실행)
    DELEGATE: PriorityActionItem[]; // 긴급하지만 중요하지 않음 (위임)
    DELETE: PriorityActionItem[];   // 중요하지도 긴급하지도 않음 (제거)
  };
  
  // 우선순위별 정렬
  topPriorities: PriorityActionItem[]; // 상위 10개
  quickWins: PriorityActionItem[];     // 빠른 성과 가능한 항목들
  strategicInitiatives: PriorityActionItem[]; // 전략적 장기 과제들
  
  // 분석 결과
  analysis: {
    totalItems: number;
    averagePriority: number;
    riskDistribution: Record<string, number>;
    categoryDistribution: Record<string, number>;
  };
}

/**
 * SWOT 분석 결과를 바탕으로 우선순위 매트릭스 생성
 */
export function generatePriorityMatrix(
  scores: EnhancedScoreResult,
  gapAnalysis: BenchmarkGapAnalysis,
  swotAnalysis: EnhancedSWOTAnalysis,
  companyData: any
): PriorityMatrixResult {
  
  console.log('🎯 우선순위 매트릭스 생성 시작');
  
  const actionItems: PriorityActionItem[] = [];
  
  // 1. SO 전략에서 액션 아이템 추출
  (swotAnalysis as any).strategicRecommendations?.so_strategies?.forEach((strategy: any, index: number) => {
    const actionItem = createActionItemFromSOStrategy(strategy, index, scores, companyData);
    actionItems.push(actionItem);
  });
  
  // 2. WO 전략에서 액션 아이템 추출  
  (swotAnalysis as any).strategicRecommendations?.wo_strategies?.forEach((strategy: any, index: number) => {
    const actionItem = createActionItemFromWOStrategy(strategy, index, scores, gapAnalysis, companyData);
    actionItems.push(actionItem);
  });
  
  // 3. ST 전략에서 액션 아이템 추출
  (swotAnalysis as any).strategicRecommendations?.st_strategies?.forEach((strategy: any, index: number) => {
    const actionItem = createActionItemFromSTStrategy(strategy, index, scores, companyData);
    actionItems.push(actionItem);
  });
  
  // 4. WT 전략에서 액션 아이템 추출
  (swotAnalysis as any).strategicRecommendations?.wt_strategies?.forEach((strategy: any, index: number) => {
    const actionItem = createActionItemFromWTStrategy(strategy, index, scores, gapAnalysis, companyData);
    actionItems.push(actionItem);
  });
  
  // 5. 갭 분석에서 추가 액션 아이템 추출
  (gapAnalysis as any).priorityAreas?.forEach((area: any, index: number) => {
    const actionItem = createActionItemFromGapAnalysis(area, index, scores, gapAnalysis, companyData);
    actionItems.push(actionItem);
  });
  
  // 6. 우선순위 점수 계산 및 사분면 분류
  const processedItems = actionItems.map(item => {
    const priorityScore = calculatePriorityScore(item.importance, item.urgency, item.feasibility);
    const quadrant = determineQuadrant(item.importance, item.urgency);
    
    return {
      ...item,
      priorityScore,
      quadrant
    };
  });
  
  // 7. 사분면별 분류
  const quadrants = {
    DO: processedItems.filter(item => item.quadrant === 'DO'),
    DECIDE: processedItems.filter(item => item.quadrant === 'DECIDE'),
    DELEGATE: processedItems.filter(item => item.quadrant === 'DELEGATE'),
    DELETE: processedItems.filter(item => item.quadrant === 'DELETE')
  };
  
  // 8. 우선순위별 정렬
  const sortedItems = [...processedItems].sort((a, b) => b.priorityScore - a.priorityScore);
  const topPriorities = sortedItems.slice(0, 10);
  
  // 9. 빠른 성과 항목 (높은 실현가능성 + 중간 이상 중요도)
  const quickWins = processedItems
    .filter(item => item.feasibility >= 7 && item.importance >= 6)
    .sort((a, b) => b.feasibility - a.feasibility)
    .slice(0, 5);
  
  // 10. 전략적 장기 과제 (높은 중요도 + 낮은 긴급성)
  const strategicInitiatives = processedItems
    .filter(item => item.importance >= 8 && item.urgency <= 6)
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 5);
  
  // 11. 분석 결과
  const analysis = {
    totalItems: processedItems.length,
    averagePriority: processedItems.reduce((sum, item) => sum + item.priorityScore, 0) / processedItems.length,
    riskDistribution: {
      Low: processedItems.filter(item => item.riskLevel === 'Low').length,
      Medium: processedItems.filter(item => item.riskLevel === 'Medium').length,
      High: processedItems.filter(item => item.riskLevel === 'High').length
    },
    categoryDistribution: processedItems.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };
  
  console.log('✅ 우선순위 매트릭스 생성 완료');
  console.log(`📊 총 ${processedItems.length}개 액션 아이템 생성`);
  console.log(`🎯 최우선 과제: ${topPriorities[0]?.title}`);
  
  return {
    actionItems: processedItems,
    quadrants,
    topPriorities,
    quickWins,
    strategicInitiatives,
    analysis
  };
}

/**
 * SO 전략에서 액션 아이템 생성 (강점+기회 활용)
 */
function createActionItemFromSOStrategy(
  strategy: string, 
  index: number, 
  scores: EnhancedScoreResult, 
  companyData: any
): PriorityActionItem {
  
  const soActionTemplates = [
    {
      title: "AI 기술 역량을 활용한 시장 선점",
      description: "기존 강점을 바탕으로 AI 기술을 도입하여 시장에서의 경쟁 우위 확보",
      category: "AI도입" as const,
      importance: 9,
      urgency: 7,
      feasibility: calculateFeasibilityBasedOnScores(scores, 'high'),
      estimatedCost: "5,000만원-1억원",
      estimatedDuration: "6-12개월",
      requiredResources: ["AI 전문가", "데이터 사이언티스트", "시스템 개발자"],
      expectedBenefit: "매출 증대 20-30%, 운영 효율성 40% 향상",
      riskLevel: "Medium" as const
    },
    {
      title: "조직 역량 기반 AI 혁신 프로젝트",
      description: "조직의 변화 수용성을 활용하여 전사 AI 혁신 추진",
      category: "조직변화" as const,
      importance: 8,
      urgency: 6,
      feasibility: calculateFeasibilityBasedOnScores(scores, 'medium'),
      estimatedCost: "3,000만원-7,000만원",
      estimatedDuration: "9-18개월",
      requiredResources: ["변화관리 전문가", "내부 챔피언", "교육 담당자"],
      expectedBenefit: "조직 생산성 25% 향상, 직원 만족도 증대",
      riskLevel: "Low" as const
    }
  ];
  
  const template = soActionTemplates[index % soActionTemplates.length];
  
  return {
    id: `SO_${index + 1}`,
    ...template,
    swotOrigin: {
      type: 'SO',
      source: strategy
    },
    priorityScore: 0, // 나중에 계산됨
    quadrant: 'DO' as const // 기본값
  };
}

/**
 * WO 전략에서 액션 아이템 생성 (약점 보완 + 기회 활용)
 */
function createActionItemFromWOStrategy(
  strategy: string, 
  index: number, 
  scores: EnhancedScoreResult,
  gapAnalysis: BenchmarkGapAnalysis, 
  companyData: any
): PriorityActionItem {
  
  const woActionTemplates = [
    {
      title: "기술 인프라 현대화 프로젝트",
      description: "노후화된 IT 인프라를 현대화하여 AI 도입 기반 구축",
      category: "인프라구축" as const,
      importance: 8,
      urgency: 8,
      feasibility: calculateFeasibilityBasedOnScores(scores, 'medium'),
      estimatedCost: "1억원-3억원",
      estimatedDuration: "12-24개월",
      requiredResources: ["IT 인프라 전문가", "클라우드 아키텍트", "보안 전문가"],
      expectedBenefit: "시스템 안정성 50% 향상, AI 도입 준비도 완성",
      riskLevel: "High" as const
    },
    {
      title: "AI 전문 인력 양성 프로그램",
      description: "부족한 AI 역량을 내부 교육과 외부 채용으로 보완",
      category: "역량강화" as const,
      importance: 7,
      urgency: 6,
      feasibility: 8,
      estimatedCost: "2,000만원-5,000만원",
      estimatedDuration: "6-12개월",
      requiredResources: ["교육 전문가", "AI 멘토", "학습 플랫폼"],
      expectedBenefit: "내부 AI 역량 300% 향상, 자체 개발 능력 확보",
      riskLevel: "Low" as const
    }
  ];
  
  const template = woActionTemplates[index % woActionTemplates.length];
  
  return {
    id: `WO_${index + 1}`,
    ...template,
    swotOrigin: {
      type: 'WO',
      source: strategy
    },
    priorityScore: 0,
    quadrant: 'DO' as const
  };
}

/**
 * ST 전략에서 액션 아이템 생성 (강점으로 위협 대응)
 */
function createActionItemFromSTStrategy(
  strategy: string, 
  index: number, 
  scores: EnhancedScoreResult, 
  companyData: any
): PriorityActionItem {
  
  const stActionTemplates = [
    {
      title: "차별화된 AI 서비스 개발",
      description: "경쟁사 대비 차별화된 AI 기반 서비스로 시장 방어",
      category: "전략수립" as const,
      importance: 9,
      urgency: 8,
      feasibility: calculateFeasibilityBasedOnScores(scores, 'high'),
      estimatedCost: "3,000만원-8,000만원",
      estimatedDuration: "6-15개월",
      requiredResources: ["제품 기획자", "AI 개발자", "UX 디자이너"],
      expectedBenefit: "시장 점유율 유지, 고객 충성도 20% 향상",
      riskLevel: "Medium" as const
    },
    {
      title: "AI 기반 운영 효율성 극대화",
      description: "내부 프로세스 AI 자동화로 비용 경쟁력 확보",
      category: "AI도입" as const,
      importance: 8,
      urgency: 7,
      feasibility: 7,
      estimatedCost: "2,000만원-6,000만원",
      estimatedDuration: "9-18개월",
      requiredResources: ["프로세스 분석가", "RPA 전문가", "데이터 분석가"],
      expectedBenefit: "운영 비용 30% 절감, 처리 속도 50% 향상",
      riskLevel: "Low" as const
    }
  ];
  
  const template = stActionTemplates[index % stActionTemplates.length];
  
  return {
    id: `ST_${index + 1}`,
    ...template,
    swotOrigin: {
      type: 'ST',
      source: strategy
    },
    priorityScore: 0,
    quadrant: 'DO' as const
  };
}

/**
 * WT 전략에서 액션 아이템 생성 (약점 보완 + 위협 최소화)
 */
function createActionItemFromWTStrategy(
  strategy: string, 
  index: number, 
  scores: EnhancedScoreResult,
  gapAnalysis: BenchmarkGapAnalysis, 
  companyData: any
): PriorityActionItem {
  
  const wtActionTemplates = [
    {
      title: "리스크 관리 체계 구축",
      description: "AI 도입 과정의 위험 요소를 사전에 식별하고 대응 체계 구축",
      category: "전략수립" as const,
      importance: 7,
      urgency: 9,
      feasibility: 8,
      estimatedCost: "1,000만원-3,000만원",
      estimatedDuration: "3-6개월",
      requiredResources: ["리스크 관리 전문가", "법무 담당자", "보안 전문가"],
      expectedBenefit: "리스크 50% 감소, 안정적 AI 도입 환경 조성",
      riskLevel: "Low" as const
    },
    {
      title: "단계적 AI 도입 전략",
      description: "약점을 고려한 점진적이고 안전한 AI 도입 접근법",
      category: "전략수립" as const,
      importance: 8,
      urgency: 6,
      feasibility: 9,
      estimatedCost: "500만원-2,000만원",
      estimatedDuration: "12-36개월",
      requiredResources: ["전략 컨설턴트", "프로젝트 매니저", "내부 실무진"],
      expectedBenefit: "성공 확률 80% 이상, 안정적 성장 기반 마련",
      riskLevel: "Low" as const
    }
  ];
  
  const template = wtActionTemplates[index % wtActionTemplates.length];
  
  return {
    id: `WT_${index + 1}`,
    ...template,
    swotOrigin: {
      type: 'WT',
      source: strategy
    },
    priorityScore: 0,
    quadrant: 'DO' as const
  };
}

/**
 * 갭 분석에서 액션 아이템 생성
 */
function createActionItemFromGapAnalysis(
  area: string, 
  index: number, 
  scores: EnhancedScoreResult,
  gapAnalysis: BenchmarkGapAnalysis, 
  companyData: any
): PriorityActionItem {
  
  const gapActionMap: Record<string, Partial<PriorityActionItem>> = {
    'AI 활용도': {
      title: "AI 도구 도입 및 활용 확대",
      description: "업계 평균 수준의 AI 활용도 달성을 위한 집중 투자",
      category: "AI도입",
      importance: 9,
      urgency: 8,
      estimatedCost: "3,000만원-1억원",
      estimatedDuration: "6-12개월"
    },
    '조직 준비도': {
      title: "조직 변화 관리 프로그램",
      description: "AI 도입을 위한 조직 문화 및 프로세스 개선",
      category: "조직변화",
      importance: 8,
      urgency: 7,
      estimatedCost: "1,000만원-5,000만원",
      estimatedDuration: "9-18개월"
    },
    '기술 인프라': {
      title: "IT 인프라 업그레이드",
      description: "AI 기술 도입을 위한 기술 기반 시설 현대화",
      category: "인프라구축",
      importance: 8,
      urgency: 9,
      estimatedCost: "5,000만원-3억원",
      estimatedDuration: "12-24개월"
    },
    '목표 명확성': {
      title: "AI 전략 수립 및 목표 설정",
      description: "명확한 AI 도입 목표와 실행 계획 수립",
      category: "전략수립",
      importance: 7,
      urgency: 6,
      estimatedCost: "500만원-2,000만원",
      estimatedDuration: "3-6개월"
    },
    '실행 역량': {
      title: "AI 프로젝트 실행 역량 강화",
      description: "AI 프로젝트를 성공적으로 실행할 수 있는 역량 개발",
      category: "역량강화",
      importance: 8,
      urgency: 7,
      estimatedCost: "2,000만원-7,000만원",
      estimatedDuration: "6-15개월"
    }
  };
  
  const template = gapActionMap[area] || gapActionMap['AI 활용도'];
  
  return {
    id: `GAP_${index + 1}`,
    title: template.title!,
    description: template.description!,
    category: template.category!,
    importance: template.importance!,
    urgency: template.urgency!,
    feasibility: calculateFeasibilityBasedOnScores(scores, 'medium'),
    priorityScore: 0, // 나중에 계산됨
    quadrant: 'DO' as const, // 나중에 계산됨
    estimatedCost: template.estimatedCost!,
    estimatedDuration: template.estimatedDuration!,
    requiredResources: ["전문 컨설턴트", "내부 실무진", "외부 파트너"],
    expectedBenefit: "업계 평균 수준 달성, 경쟁력 향상",
    riskLevel: "Medium" as const,
    swotOrigin: {
      type: 'WO', // 갭은 주로 약점 보완
      source: `갭 분석: ${area} 개선 필요`
    }
  };
}

/**
 * 점수 기반 실현가능성 계산
 */
function calculateFeasibilityBasedOnScores(scores: EnhancedScoreResult, level: 'high' | 'medium' | 'low'): number {
  const avgScore = (
    scores.categoryScores.organizationReadiness + 
    scores.categoryScores.executionCapability + 
    scores.categoryScores.techInfra
  ) / 3;
  
  const baseFeasibility = Math.round(avgScore / 10); // 0-10 스케일로 변환
  
  if (level === 'high') return Math.min(10, baseFeasibility + 2);
  if (level === 'medium') return baseFeasibility;
  return Math.max(1, baseFeasibility - 2);
}

/**
 * 우선순위 점수 계산 (중요도, 긴급성, 실현가능성 종합)
 */
function calculatePriorityScore(importance: number, urgency: number, feasibility: number): number {
  // 가중 평균: 중요도 50%, 긴급성 30%, 실현가능성 20%
  const weightedScore = (importance * 0.5) + (urgency * 0.3) + (feasibility * 0.2);
  return Math.round(weightedScore * 10) / 10; // 소수점 1자리
}

/**
 * 아이젠하워 매트릭스 사분면 결정
 */
function determineQuadrant(importance: number, urgency: number): 'DO' | 'DECIDE' | 'DELEGATE' | 'DELETE' {
  if (importance >= 7 && urgency >= 7) return 'DO';        // 중요하고 긴급함
  if (importance >= 7 && urgency < 7) return 'DECIDE';     // 중요하지만 긴급하지 않음
  if (importance < 7 && urgency >= 7) return 'DELEGATE';   // 긴급하지만 중요하지 않음
  return 'DELETE';                                         // 중요하지도 긴급하지도 않음
}

console.log('🎯 우선순위 매트릭스 엔진 로드 완료');
