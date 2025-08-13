import { questionWeights, industryBenchmarks, sizeBenchmarks } from '@/features/ai-diagnosis/constants/enhanced-questions';

// 45문항 고도화된 점수 계산 엔진
export interface EnhancedScoreResult {
  categoryScores: {
    currentAI: number;
    organizationReadiness: number;
    techInfrastructure: number;
    goalClarity: number;
    executionCapability: number;
    businessFoundation: number;
  };
  totalScore: number;
  maturityLevel: 'Beginner' | 'Basic' | 'Intermediate' | 'Advanced' | 'Expert';
  percentile: number;
  detailedAnalysis: {
    strengths: string[];
    weaknesses: string[];
    criticalGaps: string[];
    quickWins: string[];
  };
}

export interface BenchmarkGapAnalysis {
  industryGap: {
    currentAI: number;
    organizationReadiness: number;
    techInfrastructure: number;
    goalClarity: number;
    executionCapability: number;
    total: number;
  };
  sizeGap: {
    currentAI: number;
    organizationReadiness: number;
    techInfrastructure: number;
    goalClarity: number;
    executionCapability: number;
    total: number;
  };
  competitivePosition: 'Leading' | 'Above Average' | 'Average' | 'Below Average' | 'Lagging';
  priorityAreas: string[];
}

export interface EnhancedSWOTAnalysis {
  strengths: {
    internal: string[];
    competitive: string[];
    strategic: string[];
  };
  weaknesses: {
    operational: string[];
    technical: string[];
    organizational: string[];
  };
  opportunities: {
    market: string[];
    technology: string[];
    strategic: string[];
  };
  threats: {
    competitive: string[];
    technical: string[];
    market: string[];
  };
  strategicRecommendations: {
    so_strategies: string[]; // Strength-Opportunity
    wo_strategies: string[]; // Weakness-Opportunity  
    st_strategies: string[]; // Strength-Threat
    wt_strategies: string[]; // Weakness-Threat
  };
}

// 45문항 데이터를 카테고리별로 분류하여 점수 계산
export function calculateEnhancedScores(formData: any): EnhancedScoreResult {
  // 카테고리별 문항 그룹화
  const categories = {
    businessFoundation: [
      'contactPosition', 'companyName', 'establishmentYear', 'industry', 
      'businessType', 'location', 'employeeCount', 'annualRevenue', 
      'marketPosition', 'competitiveAdvantage'
    ],
    currentAI: [
      'aiFamiliarity', 'currentAiTools', 'aiUsageDepartments', 'aiInvestmentHistory',
      'dataDigitalization', 'currentSystems', 'systemIntegration', 'dataManagement'
    ],
    organizationReadiness: [
      'changeReadiness', 'leadershipSupport', 'employeeAttitude', 'changeManagementExperience',
      'budgetAllocation', 'technicalPersonnel', 'externalPartnership', 'trainingInvestment'
    ],
    techInfrastructure: [
      'dataQuality', 'analyticsCapability', 'decisionMaking', 'cloudAdoption',
      'systemScalability', 'integrationCapability', 'securityMeasures', 
      'complianceRequirements', 'riskManagement'
    ],
    goalClarity: [
      'aiTransformationGoals', 'specificImprovements', 'expectedROI', 'successMetrics', 'timeframe'
    ],
    executionCapability: [
      'priorityFunctions', 'implementationApproach', 'resourceAllocation', 
      'challengesAnticipated', 'supportNeeds'
    ]
  };

  // 각 카테고리별 점수 계산
  const categoryScores: any = {};
  
  Object.entries(categories).forEach(([category, questions]) => {
    let totalScore = 0;
    let totalWeight = 0;
    
    questions.forEach(questionId => {
      const value = formData[questionId];
      const weight = questionWeights[questionId] || 1.0;
      
      if (value !== undefined && value !== null) {
        let normalizedScore = normalizeQuestionValue(value, questionId);
        totalScore += normalizedScore * weight;
        totalWeight += weight;
      }
    });
    
    categoryScores[category] = totalWeight > 0 ? Math.round((totalScore / totalWeight) * 20) : 0; // 0-100점 스케일
  });

  // 전체 점수 계산 (가중 평균)
  const categoryWeights = {
    businessFoundation: 0.10,
    currentAI: 0.25,
    organizationReadiness: 0.25,
    techInfrastructure: 0.20,
    goalClarity: 0.10,
    executionCapability: 0.10
  };

  const totalScore = Math.round(
    Object.entries(categoryScores).reduce((sum, [category, score]) => {
      return sum + (score as number) * categoryWeights[category as keyof typeof categoryWeights];
    }, 0)
  );

  // 성숙도 레벨 결정
  let maturityLevel: EnhancedScoreResult['maturityLevel'] = 'Beginner';
  if (totalScore >= 90) maturityLevel = 'Expert';
  else if (totalScore >= 75) maturityLevel = 'Advanced';
  else if (totalScore >= 60) maturityLevel = 'Intermediate';
  else if (totalScore >= 40) maturityLevel = 'Basic';

  // 백분위 계산 (업종/규모 기준)
  const percentile = calculatePercentile(totalScore, formData.industry, formData.employeeCount);

  // 상세 분석
  const detailedAnalysis = generateDetailedAnalysis(categoryScores, formData);

  return {
    categoryScores,
    totalScore,
    maturityLevel,
    percentile,
    detailedAnalysis
  };
}

// 질문 값을 0-5 스케일로 정규화
function normalizeQuestionValue(value: any, questionId: string): number {
  if (typeof value === 'number') {
    return Math.min(5, Math.max(1, value));
  }
  
  if (Array.isArray(value)) {
    // 다중선택 질문의 경우 선택된 항목 수에 따라 점수 부여
    const maxItems = getMaxItemsForQuestion(questionId);
    return Math.min(5, Math.max(1, 1 + (value.length / maxItems) * 4));
  }
  
  if (typeof value === 'string') {
    // 선택형 질문의 경우 선택지에 따라 점수 부여
    return getScoreForSelectValue(value, questionId);
  }
  
  return 3; // 기본값
}

// 질문별 최대 선택 가능 항목 수
function getMaxItemsForQuestion(questionId: string): number {
  const maxItemsMap: Record<string, number> = {
    'businessType': 3,
    'currentAiTools': 5,
    'aiUsageDepartments': 4,
    'changeManagementExperience': 4,
    'currentSystems': 6,
    'securityMeasures': 6,
    'complianceRequirements': 4,
    'aiTransformationGoals': 5,
    'successMetrics': 5,
    'priorityFunctions': 4,
    'challengesAnticipated': 4,
    'supportNeeds': 4,
    'competitiveAdvantage': 4
  };
  
  return maxItemsMap[questionId] || 3;
}

// 선택형 질문의 값에 따른 점수 부여
function getScoreForSelectValue(value: string, questionId: string): number {
  // 규모별 점수 매핑
  if (questionId === 'employeeCount') {
    const sizeScores: Record<string, number> = {
      '10명 미만': 2,
      '10-30명': 3,
      '31-50명': 3,
      '51-100명': 4,
      '101-300명': 4,
      '301-500명': 5,
      '501-1000명': 5,
      '1000명 이상': 5
    };
    return sizeScores[value] || 3;
  }
  
  // 매출별 점수 매핑
  if (questionId === 'annualRevenue') {
    const revenueScores: Record<string, number> = {
      '10억 미만': 2,
      '10억-50억': 3,
      '50억-100억': 3,
      '100억-500억': 4,
      '500억-1000억': 4,
      '1000억 이상': 5,
      '비공개': 3
    };
    return revenueScores[value] || 3;
  }
  
  // 예산별 점수 매핑
  if (questionId === 'budgetAllocation') {
    const budgetScores: Record<string, number> = {
      '1,000만원 미만': 1,
      '1,000만원-3,000만원': 2,
      '3,000만원-5,000만원': 3,
      '5,000만원-1억원': 4,
      '1억원-3억원': 4,
      '3억원-5억원': 5,
      '5억원 이상': 5
    };
    return budgetScores[value] || 3;
  }
  
  // 클라우드 사용 수준별 점수
  if (questionId === 'cloudAdoption') {
    const cloudScores: Record<string, number> = {
      '전혀 사용하지 않음': 1,
      '기본적인 클라우드 스토리지만': 2,
      '일부 업무용 클라우드 서비스': 3,
      '대부분 클라우드 기반': 4,
      '완전한 클라우드 네이티브': 5
    };
    return cloudScores[value] || 3;
  }
  
  // 기본적으로 중간값 반환
  return 3;
}

// 백분위 계산
function calculatePercentile(score: number, industry: string, employeeCount: string): number {
  const industryBenchmark = industryBenchmarks[industry]?.averageScores.total || 60;
  const sizeBenchmark = sizeBenchmarks[employeeCount]?.averageScores.total || 55;
  
  const avgBenchmark = (industryBenchmark + sizeBenchmark) / 2;
  
  // 정규분포 가정하여 백분위 계산
  const standardDeviation = 15; // 가정값
  const zScore = (score - avgBenchmark) / standardDeviation;
  
  // Z-score를 백분위로 변환 (근사치)
  let percentile = 50;
  if (zScore >= 2) percentile = 98;
  else if (zScore >= 1.5) percentile = 93;
  else if (zScore >= 1) percentile = 84;
  else if (zScore >= 0.5) percentile = 69;
  else if (zScore >= 0) percentile = 50;
  else if (zScore >= -0.5) percentile = 31;
  else if (zScore >= -1) percentile = 16;
  else if (zScore >= -1.5) percentile = 7;
  else percentile = 2;
  
  return Math.max(1, Math.min(99, percentile));
}

// 상세 분석 생성
function generateDetailedAnalysis(categoryScores: any, formData: any) {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const criticalGaps: string[] = [];
  const quickWins: string[] = [];
  
  // 강점 분석 (점수 70점 이상)
  Object.entries(categoryScores).forEach(([category, score]) => {
    if ((score as number) >= 70) {
      switch (category) {
        case 'currentAI':
          strengths.push('현재 AI/디지털 활용 수준이 우수함');
          break;
        case 'organizationReadiness':
          strengths.push('조직의 변화 준비도가 높음');
          break;
        case 'techInfrastructure':
          strengths.push('기술 인프라가 잘 구축됨');
          break;
        case 'goalClarity':
          strengths.push('AI 도입 목표가 명확함');
          break;
        case 'executionCapability':
          strengths.push('실행 역량이 충분함');
          break;
      }
    }
  });
  
  // 약점 분석 (점수 50점 미만)
  Object.entries(categoryScores).forEach(([category, score]) => {
    if ((score as number) < 50) {
      switch (category) {
        case 'currentAI':
          weaknesses.push('현재 AI 활용 수준이 낮음');
          criticalGaps.push('AI 도구 도입 및 활용 확대');
          break;
        case 'organizationReadiness':
          weaknesses.push('조직 변화 준비도 부족');
          criticalGaps.push('변화 관리 및 직원 교육');
          break;
        case 'techInfrastructure':
          weaknesses.push('기술 인프라 기반 미흡');
          criticalGaps.push('IT 인프라 현대화');
          break;
        case 'goalClarity':
          weaknesses.push('AI 도입 목표 불분명');
          quickWins.push('AI 전략 수립 및 목표 설정');
          break;
        case 'executionCapability':
          weaknesses.push('실행 역량 부족');
          criticalGaps.push('전문 인력 확보 및 역량 강화');
          break;
      }
    }
  });
  
  // 빠른 개선 가능 영역 (점수 50-69점)
  Object.entries(categoryScores).forEach(([category, score]) => {
    if ((score as number) >= 50 && (score as number) < 70) {
      switch (category) {
        case 'currentAI':
          quickWins.push('기존 AI 도구 활용도 증대');
          break;
        case 'organizationReadiness':
          quickWins.push('직원 AI 교육 프로그램 실시');
          break;
        case 'techInfrastructure':
          quickWins.push('클라우드 서비스 확대 도입');
          break;
        case 'goalClarity':
          quickWins.push('구체적 KPI 설정 및 측정');
          break;
        case 'executionCapability':
          quickWins.push('외부 전문기관과 파트너십');
          break;
      }
    }
  });
  
  return {
    strengths: strengths.slice(0, 5),
    weaknesses: weaknesses.slice(0, 5),
    criticalGaps: criticalGaps.slice(0, 5),
    quickWins: quickWins.slice(0, 5)
  };
}

// 업종별/규모별 벤치마크 갭 분석
export function analyzeBenchmarkGap(scores: EnhancedScoreResult, industry: string, employeeCount: string): BenchmarkGapAnalysis {
  const industryBenchmark = industryBenchmarks[industry]?.averageScores;
  const sizeBenchmark = sizeBenchmarks[employeeCount]?.averageScores;
  
  if (!industryBenchmark || !sizeBenchmark) {
    // 기본값 사용
    const defaultBenchmark = {
      currentAI: 55,
      organizationReadiness: 58,
      techInfrastructure: 62,
      goalClarity: 65,
      executionCapability: 58,
      total: 60
    };
    
    return {
      industryGap: {
        currentAI: scores.categoryScores.currentAI - defaultBenchmark.currentAI,
        organizationReadiness: scores.categoryScores.organizationReadiness - defaultBenchmark.organizationReadiness,
        techInfrastructure: scores.categoryScores.techInfrastructure - defaultBenchmark.techInfrastructure,
        goalClarity: scores.categoryScores.goalClarity - defaultBenchmark.goalClarity,
        executionCapability: scores.categoryScores.executionCapability - defaultBenchmark.executionCapability,
        total: scores.totalScore - defaultBenchmark.total
      },
      sizeGap: {
        currentAI: scores.categoryScores.currentAI - defaultBenchmark.currentAI,
        organizationReadiness: scores.categoryScores.organizationReadiness - defaultBenchmark.organizationReadiness,
        techInfrastructure: scores.categoryScores.techInfrastructure - defaultBenchmark.techInfrastructure,
        goalClarity: scores.categoryScores.goalClarity - defaultBenchmark.goalClarity,
        executionCapability: scores.categoryScores.executionCapability - defaultBenchmark.executionCapability,
        total: scores.totalScore - defaultBenchmark.total
      },
      competitivePosition: 'Average',
      priorityAreas: ['AI 도구 도입', '조직 준비도 향상', '기술 인프라 강화']
    };
  }
  
  const industryGap = {
    currentAI: scores.categoryScores.currentAI - industryBenchmark.currentAI,
    organizationReadiness: scores.categoryScores.organizationReadiness - industryBenchmark.organizationReadiness,
    techInfrastructure: scores.categoryScores.techInfrastructure - industryBenchmark.techInfrastructure,
    goalClarity: scores.categoryScores.goalClarity - industryBenchmark.goalClarity,
    executionCapability: scores.categoryScores.executionCapability - industryBenchmark.executionCapability,
    total: scores.totalScore - industryBenchmark.total
  };
  
  const sizeGap = {
    currentAI: scores.categoryScores.currentAI - sizeBenchmark.currentAI,
    organizationReadiness: scores.categoryScores.organizationReadiness - sizeBenchmark.organizationReadiness,
    techInfrastructure: scores.categoryScores.techInfrastructure - sizeBenchmark.techInfrastructure,
    goalClarity: scores.categoryScores.goalClarity - sizeBenchmark.goalClarity,
    executionCapability: scores.categoryScores.executionCapability - sizeBenchmark.executionCapability,
    total: scores.totalScore - sizeBenchmark.total
  };
  
  // 경쟁 포지션 결정
  const avgGap = (industryGap.total + sizeGap.total) / 2;
  let competitivePosition: BenchmarkGapAnalysis['competitivePosition'] = 'Average';
  
  if (avgGap >= 15) competitivePosition = 'Leading';
  else if (avgGap >= 5) competitivePosition = 'Above Average';
  else if (avgGap >= -5) competitivePosition = 'Average';
  else if (avgGap >= -15) competitivePosition = 'Below Average';
  else competitivePosition = 'Lagging';
  
  // 우선순위 영역 결정
  const priorityAreas: string[] = [];
  const gaps = [
    { area: 'AI 활용도', gap: Math.min(industryGap.currentAI, sizeGap.currentAI) },
    { area: '조직 준비도', gap: Math.min(industryGap.organizationReadiness, sizeGap.organizationReadiness) },
    { area: '기술 인프라', gap: Math.min(industryGap.techInfrastructure, sizeGap.techInfrastructure) },
    { area: '목표 명확성', gap: Math.min(industryGap.goalClarity, sizeGap.goalClarity) },
    { area: '실행 역량', gap: Math.min(industryGap.executionCapability, sizeGap.executionCapability) }
  ];
  
  gaps
    .filter(item => item.gap < -5) // 5점 이상 차이나는 영역
    .sort((a, b) => a.gap - b.gap) // 갭이 큰 순서로 정렬
    .slice(0, 3) // 상위 3개
    .forEach(item => priorityAreas.push(item.area));
  
  return {
    industryGap,
    sizeGap,
    competitivePosition,
    priorityAreas
  };
}

// 고도화된 SWOT 분석
export function generateEnhancedSWOTAnalysis(
  scores: EnhancedScoreResult, 
  gapAnalysis: BenchmarkGapAnalysis, 
  formData: any
): EnhancedSWOTAnalysis {
  const swot: EnhancedSWOTAnalysis = {
    strengths: { internal: [], competitive: [], strategic: [] },
    weaknesses: { operational: [], technical: [], organizational: [] },
    opportunities: { market: [], technology: [], strategic: [] },
    threats: { competitive: [], technical: [], market: [] },
    strategicRecommendations: {
      so_strategies: [],
      wo_strategies: [],
      st_strategies: [],
      wt_strategies: []
    }
  };
  
  // 강점 분석
  if (scores.categoryScores.organizationReadiness >= 70) {
    swot.strengths.internal.push('강력한 경영진 의지와 조직 준비도');
    swot.strengths.strategic.push('변화 관리 경험과 학습 조직 문화');
  }
  
  if (scores.categoryScores.currentAI >= 70) {
    swot.strengths.competitive.push('선진적인 AI 활용 경험과 노하우');
    swot.strengths.internal.push('디지털 전환 기반 구축');
  }
  
  if (scores.categoryScores.techInfrastructure >= 70) {
    swot.strengths.strategic.push('견고한 IT 인프라와 보안 체계');
    swot.strengths.competitive.push('확장 가능한 기술 아키텍처');
  }
  
  // 약점 분석
  if (scores.categoryScores.executionCapability < 50) {
    swot.weaknesses.organizational.push('AI 전문 인력 및 실행 역량 부족');
    swot.weaknesses.operational.push('변화 관리 및 프로젝트 관리 경험 미흡');
  }
  
  if (scores.categoryScores.currentAI < 50) {
    swot.weaknesses.technical.push('AI 도구 활용 및 데이터 분석 역량 부족');
    swot.weaknesses.operational.push('업무 프로세스 디지털화 수준 낮음');
  }
  
  // 기회 분석
  swot.opportunities.market.push('AI 기술 발전으로 인한 새로운 비즈니스 기회');
  swot.opportunities.technology.push('클라우드 및 SaaS 기반 AI 솔루션 접근성 향상');
  swot.opportunities.strategic.push('정부의 디지털 뉴딜 정책 및 지원 프로그램');
  
  if (gapAnalysis.competitivePosition === 'Below Average' || gapAnalysis.competitivePosition === 'Lagging') {
    swot.opportunities.competitive = swot.opportunities.competitive || [];
    swot.opportunities.competitive.push('후발주자 우위를 활용한 검증된 기술 도입');
  }
  
  // 위협 분석
  swot.threats.competitive.push('경쟁사의 빠른 AI 도입으로 인한 경쟁 열세');
  swot.threats.market.push('고객의 AI 기반 서비스 요구 증가');
  swot.threats.technical.push('급속한 기술 변화에 대한 적응 지연 리스크');
  
  // 전략적 권고사항
  // SO 전략 (강점-기회)
  if (scores.categoryScores.organizationReadiness >= 70) {
    swot.strategicRecommendations.so_strategies.push('강력한 리더십을 바탕으로 AI 전략 수립 및 전사 추진');
  }
  if (scores.categoryScores.techInfrastructure >= 70) {
    swot.strategicRecommendations.so_strategies.push('견고한 인프라를 활용한 고도화된 AI 솔루션 도입');
  }
  
  // WO 전략 (약점-기회)
  if (scores.categoryScores.executionCapability < 50) {
    swot.strategicRecommendations.wo_strategies.push('외부 전문기관과의 파트너십을 통한 역량 보완');
  }
  if (scores.categoryScores.currentAI < 50) {
    swot.strategicRecommendations.wo_strategies.push('검증된 AI 솔루션의 단계적 도입으로 경험 축적');
  }
  
  // ST 전략 (강점-위협)
  swot.strategicRecommendations.st_strategies.push('기존 강점을 바탕으로 AI 도입 속도 가속화');
  swot.strategicRecommendations.st_strategies.push('선제적 AI 투자를 통한 경쟁 우위 확보');
  
  // WT 전략 (약점-위협)
  swot.strategicRecommendations.wt_strategies.push('핵심 업무 영역부터 우선 자동화 추진');
  swot.strategicRecommendations.wt_strategies.push('AI 역량 강화를 위한 집중적 투자 및 교육');
  
  return swot;
}

// 3차원 우선순위 매트릭스 (중요도 × 긴급성 × 실현가능성)
export interface ThreeDimensionalMatrix {
  actionItems: Array<{
    id: string;
    title: string;
    description: string;
    source: 'strength' | 'weakness' | 'opportunity' | 'threat';
    importance: number;      // 0-100
    urgency: number;        // 0-100
    feasibility: number;    // 0-100
    priorityScore: number;  // 종합 점수
    quadrant: 'doFirst' | 'schedule' | 'delegate' | 'eliminate';
    aiCampPrograms: string[];
    expectedROI: string;
    timeline: string;
  }>;
  quadrants: {
    doFirst: {      // 중요도 높음 + 긴급성 높음
      name: string;
      items: string[];
      priority: number;
    };
    schedule: {     // 중요도 높음 + 긴급성 낮음
      name: string;
      items: string[];
      priority: number;
    };
    delegate: {     // 중요도 낮음 + 긴급성 높음
      name: string;
      items: string[];
      priority: number;
    };
    eliminate: {    // 중요도 낮음 + 긴급성 낮음
      name: string;
      items: string[];
      priority: number;
    };
  };
  executionRoadmap: {
    immediate: string[];    // 1-3개월
    shortTerm: string[];    // 3-6개월
    mediumTerm: string[];   // 6-12개월
  };
}

export function generate3DPriorityMatrix(
  scores: EnhancedScoreResult,
  gapAnalysis: BenchmarkGapAnalysis,
  swotAnalysis: EnhancedSWOTAnalysis,
  formData: any
): ThreeDimensionalMatrix {
  console.log('📊 3차원 우선순위 매트릭스 생성 시작...');
  
  // SWOT 분석 결과에서 액션 아이템 추출
  const actionItems = extractActionItemsFromSWOT(swotAnalysis, scores, formData);
  
  // 각 액션 아이템에 대한 3차원 평가
  const evaluatedItems = actionItems.map(item => {
    const importance = calculateImportanceScore(item, scores, gapAnalysis);
    const urgency = calculateUrgencyScore(item, scores, gapAnalysis);
    const feasibility = calculateFeasibilityScore(item, scores, formData);
    
    const priorityScore = (importance * 0.4) + (urgency * 0.3) + (feasibility * 0.3);
    const quadrant = determineQuadrant(importance, urgency);
    
    return {
      ...item,
      importance,
      urgency,
      feasibility,
      priorityScore: Math.round(priorityScore),
      quadrant,
      aiCampPrograms: getRecommendedPrograms(item, scores),
      expectedROI: calculateExpectedROI(item, scores),
      timeline: determineTimeline(quadrant, feasibility)
    };
  });
  
  // 우선순위별 정렬
  const sortedItems = evaluatedItems.sort((a, b) => b.priorityScore - a.priorityScore);
  
  // 쿼드런트별 분류
  const quadrants = {
    doFirst: {
      name: '즉시 실행 (Do First)',
      items: sortedItems.filter(item => item.quadrant === 'doFirst').map(item => item.title),
      priority: 1
    },
    schedule: {
      name: '계획 수립 (Schedule)',
      items: sortedItems.filter(item => item.quadrant === 'schedule').map(item => item.title),
      priority: 2
    },
    delegate: {
      name: '위임/자동화 (Delegate)',
      items: sortedItems.filter(item => item.quadrant === 'delegate').map(item => item.title),
      priority: 3
    },
    eliminate: {
      name: '재검토/보류 (Eliminate)',
      items: sortedItems.filter(item => item.quadrant === 'eliminate').map(item => item.title),
      priority: 4
    }
  };
  
  // 실행 로드맵 생성
  const executionRoadmap = {
    immediate: sortedItems.filter(item => item.timeline === '1-3개월').slice(0, 3).map(item => item.title),
    shortTerm: sortedItems.filter(item => item.timeline === '3-6개월').slice(0, 3).map(item => item.title),
    mediumTerm: sortedItems.filter(item => item.timeline === '6-12개월').slice(0, 3).map(item => item.title)
  };
  
  console.log('✅ 3차원 우선순위 매트릭스 생성 완료');
  console.log(`📈 총 ${sortedItems.length}개 액션 아이템 평가 완료`);
  
  return {
    actionItems: sortedItems,
    quadrants,
    executionRoadmap
  };
}

// SWOT에서 액션 아이템 추출
function extractActionItemsFromSWOT(
  swotAnalysis: EnhancedSWOTAnalysis,
  scores: EnhancedScoreResult,
  formData: any
): Array<{
  id: string;
  title: string;
  description: string;
  source: 'strength' | 'weakness' | 'opportunity' | 'threat';
}> {
  const actionItems = [];
  let itemId = 1;
  
  // 강점 기반 액션 아이템
  swotAnalysis.strategicRecommendations.so_strategies.forEach(strategy => {
    actionItems.push({
      id: `SO-${itemId++}`,
      title: strategy.substring(0, 50) + (strategy.length > 50 ? '...' : ''),
      description: strategy,
      source: 'strength' as const
    });
  });
  
  // 약점 개선 액션 아이템
  swotAnalysis.strategicRecommendations.wo_strategies.forEach(strategy => {
    actionItems.push({
      id: `WO-${itemId++}`,
      title: strategy.substring(0, 50) + (strategy.length > 50 ? '...' : ''),
      description: strategy,
      source: 'weakness' as const
    });
  });
  
  // 기회 활용 액션 아이템
  swotAnalysis.strategicRecommendations.st_strategies.forEach(strategy => {
    actionItems.push({
      id: `ST-${itemId++}`,
      title: strategy.substring(0, 50) + (strategy.length > 50 ? '...' : ''),
      description: strategy,
      source: 'opportunity' as const
    });
  });
  
  // 위협 대응 액션 아이템
  swotAnalysis.strategicRecommendations.wt_strategies.forEach(strategy => {
    actionItems.push({
      id: `WT-${itemId++}`,
      title: strategy.substring(0, 50) + (strategy.length > 50 ? '...' : ''),
      description: strategy,
      source: 'threat' as const
    });
  });
  
  return actionItems;
}

// 중요도 점수 계산
function calculateImportanceScore(
  item: any,
  scores: EnhancedScoreResult,
  gapAnalysis: BenchmarkGapAnalysis
): number {
  let importance = 50; // 기본점수
  
  // 전체 점수가 낮을수록 개선의 중요도가 높음
  if (scores.totalScore < 40) importance += 30;
  else if (scores.totalScore < 60) importance += 20;
  else if (scores.totalScore < 80) importance += 10;
  
  // 약점 기반 액션은 중요도 높음
  if (item.source === 'weakness') importance += 25;
  if (item.source === 'threat') importance += 20;
  
  // 경쟁 포지션이 낮을수록 중요도 높음
  if (gapAnalysis.competitivePosition === 'Lagging') importance += 20;
  else if (gapAnalysis.competitivePosition === 'Below Average') importance += 15;
  
  // 매출/성장과 관련된 항목은 중요도 높음
  if (item.description.includes('매출') || item.description.includes('성장') || 
      item.description.includes('경쟁') || item.description.includes('시장')) {
    importance += 15;
  }
  
  return Math.min(100, Math.max(0, importance));
}

// 긴급성 점수 계산
function calculateUrgencyScore(
  item: any,
  scores: EnhancedScoreResult,
  gapAnalysis: BenchmarkGapAnalysis
): number {
  let urgency = 50; // 기본점수
  
  // 위협 대응은 긴급성 높음
  if (item.source === 'threat') urgency += 30;
  if (item.source === 'weakness') urgency += 20;
  
  // 전체 점수가 매우 낮으면 긴급성 높음
  if (scores.totalScore < 30) urgency += 35;
  else if (scores.totalScore < 50) urgency += 25;
  
  // 경쟁 열세 상황이면 긴급성 높음
  if (gapAnalysis.competitivePosition === 'Lagging') urgency += 25;
  
  // AI 도입, 디지털 전환 관련은 긴급성 높음
  if (item.description.includes('AI') || item.description.includes('디지털') || 
      item.description.includes('자동화') || item.description.includes('경쟁')) {
    urgency += 15;
  }
  
  return Math.min(100, Math.max(0, urgency));
}

// 실현가능성 점수 계산
function calculateFeasibilityScore(
  item: any,
  scores: EnhancedScoreResult,
  formData: any
): number {
  let feasibility = 50; // 기본점수
  
  // 조직 준비도가 높으면 실현가능성 높음
  if (scores.categoryScores.organizationReadiness >= 70) feasibility += 20;
  else if (scores.categoryScores.organizationReadiness >= 50) feasibility += 10;
  
  // 기술 인프라가 좋으면 실현가능성 높음
  if (scores.categoryScores.techInfrastructure >= 70) feasibility += 15;
  
  // 현재 AI 활용도가 높으면 실현가능성 높음
  if (scores.categoryScores.currentAI >= 60) feasibility += 15;
  
  // 기업 규모별 실현가능성 조정
  const employeeCount = formData.employeeCount || '';
  if (employeeCount.includes('100명 이상')) feasibility += 10;
  else if (employeeCount.includes('50-100명')) feasibility += 5;
  else if (employeeCount.includes('10명 미만')) feasibility -= 10;
  
  // 파일럿, 테스트 관련 항목은 실현가능성 높음
  if (item.description.includes('파일럿') || item.description.includes('테스트') || 
      item.description.includes('단계적') || item.description.includes('교육')) {
    feasibility += 20;
  }
  
  // 대규모 투자나 시스템 구축은 실현가능성 낮음
  if (item.description.includes('대규모') || item.description.includes('전면') || 
      item.description.includes('구축')) {
    feasibility -= 15;
  }
  
  return Math.min(100, Math.max(0, feasibility));
}

// 쿼드런트 결정
function determineQuadrant(importance: number, urgency: number): 'doFirst' | 'schedule' | 'delegate' | 'eliminate' {
  if (importance >= 70 && urgency >= 70) return 'doFirst';
  if (importance >= 70 && urgency < 70) return 'schedule';
  if (importance < 70 && urgency >= 70) return 'delegate';
  return 'eliminate';
}

// AI CAMP 프로그램 추천
function getRecommendedPrograms(item: any, scores: EnhancedScoreResult): string[] {
  const programs = [];
  
  if (item.description.includes('AI') || item.description.includes('인공지능')) {
    if (scores.categoryScores.currentAI < 50) {
      programs.push('AI 기초 교육과정');
      programs.push('AI 도구 활용 실습');
    } else {
      programs.push('AI 고급 활용과정');
      programs.push('AI 전략 수립 워크샵');
    }
  }
  
  if (item.description.includes('리더십') || item.description.includes('경영진')) {
    programs.push('경영진 AI 리더십');
    programs.push('디지털 전환 전략');
  }
  
  if (item.description.includes('데이터') || item.description.includes('분석')) {
    programs.push('데이터 분석 기초');
    programs.push('비즈니스 인텔리전스');
  }
  
  if (item.description.includes('자동화') || item.description.includes('프로세스')) {
    programs.push('업무 자동화 실습');
    programs.push('RPA 도입 과정');
  }
  
  return programs.length > 0 ? programs : ['AI 역량 진단 상담'];
}

// ROI 예측
function calculateExpectedROI(item: any, scores: EnhancedScoreResult): string {
  if (item.source === 'strength') return '높음 (6개월 내)';
  if (item.source === 'opportunity') return '매우 높음 (3-6개월)';
  if (item.source === 'weakness') return '중간 (6-12개월)';
  return '낮음 (12개월 이상)';
}

// 타임라인 결정
function determineTimeline(quadrant: string, feasibility: number): string {
  if (quadrant === 'doFirst') return '1-3개월';
  if (quadrant === 'schedule') return feasibility >= 70 ? '3-6개월' : '6-12개월';
  if (quadrant === 'delegate') return '1-6개월';
  return '6-12개월';
}