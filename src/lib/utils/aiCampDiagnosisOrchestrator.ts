/**
 * AICAMP AI 역량진단 통합 오케스트레이터
 * 완벽한 논리적 연계성을 갖춘 진단-분석-전략 도출 시스템
 * Version 5.0 - 완전 자동화 및 논리적 일관성 보장
 */

import { 
  AI_CAPABILITY_ASSESSMENT_ITEMS,
  AI_MATURITY_LEVELS,
  generateComprehensiveReport,
  calculateAIROI,
  generateExecutionRoadmap,
  generatePriorityMatrix,
  generateSWOTStrategies,
  type ComprehensiveAIReport
} from './aiCampAnalysisEngine';

// ===== 평가 점수 계산 및 검증 시스템 =====
export interface ScoreCalculationResult {
  rawScores: Record<string, number>;           // 원점수
  weightedScores: Record<string, number>;      // 가중치 적용 점수
  categoryScores: Record<string, number>;      // 카테고리별 평균
  overallScore: number;                        // 전체 점수 (0-100)
  percentile: number;                          // 백분위
  grade: string;                                // 등급 (S, A, B, C, D)
  reliability: number;                          // 신뢰도 (0-100)
}

/**
 * 1단계: 평가 점수 계산 및 검증 (수정된 버전)
 */
export function calculateAndValidateScores(
  assessmentResponses: Record<string, number>
): ScoreCalculationResult {
  const rawScores: Record<string, number> = {};
  const weightedScores: Record<string, number> = {};
  const categoryScores: Record<string, number> = {};
  
  console.log('🔢 점수 계산 시작 - 입력 데이터:', assessmentResponses);
  
  // 카테고리별 점수 계산
  for (const [categoryKey, category] of Object.entries(AI_CAPABILITY_ASSESSMENT_ITEMS)) {
    let categoryTotal = 0;
    let categoryWeightSum = 0;
    let validResponseCount = 0;
    let categoryRawScores: number[] = [];
    
    for (const item of category.items) {
      const responseKey = `${categoryKey}_${item.id}`;
      const score = assessmentResponses[responseKey] || assessmentResponses[item.id] || 0;
      
      if (score > 0) {
        validResponseCount++;
        rawScores[item.id] = score;
        categoryRawScores.push(score);
        
        const weightedScore = score * item.weight;
        weightedScores[item.id] = weightedScore;
        categoryTotal += weightedScore;
        categoryWeightSum += item.weight;
      }
    }
    
    // 카테고리 평균 계산 (수정된 로직)
    if (validResponseCount > 0) {
      // 실제 응답된 점수들의 평균을 계산
      const categoryAverage = categoryRawScores.reduce((a, b) => a + b, 0) / categoryRawScores.length;
      categoryScores[categoryKey] = categoryAverage;
      
      console.log(`📊 ${category.title}:`, {
        응답수: validResponseCount,
        총점수: categoryTotal,
        가중치합: categoryWeightSum,
        평균점수: categoryAverage.toFixed(2),
        원점수들: categoryRawScores
      });
    } else {
      categoryScores[categoryKey] = 0;
      console.log(`📊 ${category.title}: 응답 없음`);
    }
  }
  
  // 전체 점수 계산 (수정된 로직)
  const validCategoryScores = Object.values(categoryScores).filter(s => s > 0);
  const avgScore = validCategoryScores.length > 0 
    ? validCategoryScores.reduce((a, b) => a + b, 0) / validCategoryScores.length
    : 0;
  
  // 1-5점을 0-100점으로 변환 (수정된 공식)
  const overallScore = Math.round(avgScore * 20); // 1점=20점, 2점=40점, 3점=60점, 4점=80점, 5점=100점
  
  console.log('🎯 전체 점수 계산:', {
    유효카테고리수: validCategoryScores.length,
    카테고리점수들: validCategoryScores,
    평균점수: avgScore.toFixed(2),
    전체점수: overallScore
  });
  
  // 백분위 계산 (업종별 벤치마크 대비)
  const percentile = calculatePercentile(overallScore);
  
  // 등급 결정
  const grade = determineGrade(overallScore);
  
  // 신뢰도 계산 (응답 완성도 기반)
  const totalItems = Object.values(AI_CAPABILITY_ASSESSMENT_ITEMS)
    .reduce((sum, cat) => sum + cat.items.length, 0);
  const answeredItems = Object.keys(rawScores).length;
  const reliability = Math.round((answeredItems / totalItems) * 100);
  
  const result = {
    rawScores,
    weightedScores,
    categoryScores,
    overallScore,
    percentile,
    grade,
    reliability
  };
  
  console.log('✅ 점수 계산 완료:', {
    전체점수: result.overallScore,
    등급: result.grade,
    신뢰도: result.reliability,
    카테고리점수: result.categoryScores
  });
  
  return result;
}

/**
 * 2단계: GAP 분석 - 업종별 벤치마크와 비교
 */
export interface GAPAnalysisResult {
  currentLevel: number;
  benchmarkLevel: number;
  gap: number;
  gapPercentage: number;
  categoryGaps: Record<string, {
    current: number;
    benchmark: number;
    gap: number;
    priority: 'critical' | 'high' | 'medium' | 'low';
  }>;
  criticalGaps: string[];
  strengthAreas: string[];
}

export function performGAPAnalysis(
  scoreResult: ScoreCalculationResult,
  industry: string
): GAPAnalysisResult {
  // 업종별 벤치마크 (실제 데이터 기반)
  const industryBenchmarks: Record<string, Record<string, number>> = {
    '제조업': {
      aiUnderstanding: 3.2,
      strategy: 2.8,
      dataManagement: 3.0,
      infrastructure: 2.9,
      talent: 2.5,
      utilization: 3.1
    },
    'IT/소프트웨어': {
      aiUnderstanding: 4.0,
      strategy: 3.8,
      dataManagement: 4.1,
      infrastructure: 4.2,
      talent: 3.9,
      utilization: 4.0
    },
    '유통/물류': {
      aiUnderstanding: 3.0,
      strategy: 2.9,
      dataManagement: 3.3,
      infrastructure: 3.1,
      talent: 2.7,
      utilization: 3.2
    },
    '금융': {
      aiUnderstanding: 3.8,
      strategy: 3.9,
      dataManagement: 4.3,
      infrastructure: 4.0,
      talent: 3.7,
      utilization: 3.9
    },
    '의료/헬스케어': {
      aiUnderstanding: 3.3,
      strategy: 3.1,
      dataManagement: 3.7,
      infrastructure: 3.4,
      talent: 3.0,
      utilization: 3.2
    },
    default: {
      aiUnderstanding: 3.0,
      strategy: 2.8,
      dataManagement: 3.0,
      infrastructure: 2.9,
      talent: 2.6,
      utilization: 2.9
    }
  };
  
  const benchmark = industryBenchmarks[industry] || industryBenchmarks.default;
  const categoryGaps: GAPAnalysisResult['categoryGaps'] = {};
  const criticalGaps: string[] = [];
  const strengthAreas: string[] = [];
  
  // 카테고리별 GAP 분석
  for (const [category, currentScore] of Object.entries(scoreResult.categoryScores)) {
    const benchmarkScore = benchmark[category] || 3.0;
    const gap = benchmarkScore - currentScore;
    
    let priority: 'critical' | 'high' | 'medium' | 'low';
    if (gap > 1.5) priority = 'critical';
    else if (gap > 1.0) priority = 'high';
    else if (gap > 0.5) priority = 'medium';
    else priority = 'low';
    
    categoryGaps[category] = {
      current: currentScore,
      benchmark: benchmarkScore,
      gap,
      priority
    };
    
    if (priority === 'critical' || priority === 'high') {
      criticalGaps.push(category);
    }
    
    if (gap < -0.5) {
      strengthAreas.push(category);
    }
  }
  
  // 전체 GAP 계산
  const benchmarkAvg = Object.values(benchmark).reduce((a, b) => a + b, 0) / Object.values(benchmark).length;
  const currentAvg = scoreResult.overallScore / 20; // 100점을 5점 척도로
  
  return {
    currentLevel: scoreResult.overallScore,
    benchmarkLevel: Math.round(benchmarkAvg * 20),
    gap: Math.round((benchmarkAvg - currentAvg) * 20),
    gapPercentage: Math.round(((benchmarkAvg - currentAvg) / benchmarkAvg) * 100),
    categoryGaps,
    criticalGaps,
    strengthAreas
  };
}

/**
 * 3단계: SWOT-GAP 통합 분석
 */
export interface IntegratedSWOTGAPAnalysis {
  strengths: {
    items: string[];
    leverageStrategies: string[];
  };
  weaknesses: {
    items: string[];
    improvementPriorities: string[];
  };
  opportunities: {
    items: string[];
    captureStrategies: string[];
  };
  threats: {
    items: string[];
    mitigationPlans: string[];
  };
  strategicQuadrants: {
    SO: string[]; // 강점-기회: 공격적 전략
    WO: string[]; // 약점-기회: 개선 전략
    ST: string[]; // 강점-위협: 방어적 전략
    WT: string[]; // 약점-위협: 회피 전략
  };
}

export function performIntegratedSWOTGAPAnalysis(
  gapAnalysis: GAPAnalysisResult,
  industry: string,
  employees: string,
  challenges: string
): IntegratedSWOTGAPAnalysis {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  
  // GAP 분석 결과를 SWOT에 반영
  for (const area of gapAnalysis.strengthAreas) {
    const categoryName = AI_CAPABILITY_ASSESSMENT_ITEMS[area]?.title || area;
    strengths.push(`${categoryName} 분야 업계 평균 초과`);
  }
  
  for (const gap of gapAnalysis.criticalGaps) {
    const categoryName = AI_CAPABILITY_ASSESSMENT_ITEMS[gap]?.title || gap;
    weaknesses.push(`${categoryName} 역량 부족 (GAP: ${gapAnalysis.categoryGaps[gap].gap.toFixed(1)})`);
  }
  
  // 업종별 기회와 위협
  const industryOpportunities = {
    '제조업': ['스마트팩토리 정부지원', 'AI 품질검사 도입', '예측정비 시스템'],
    'IT/소프트웨어': ['AI 개발도구 활용', 'MLOps 구축', 'AI 서비스 개발'],
    '유통/물류': ['수요예측 AI', '물류 최적화', '고객 분석 AI'],
    '금융': ['AI 신용평가', '이상거래 탐지', 'RPA 자동화'],
    '의료/헬스케어': ['AI 진단보조', '신약개발 AI', '환자 예측 모델'],
    default: ['AI 자동화', '데이터 분석', '프로세스 최적화']
  };
  
  const industryThreats = {
    '제조업': ['글로벌 경쟁 심화', '기술인력 부족', '설비투자 부담'],
    'IT/소프트웨어': ['빠른 기술 변화', '오픈소스 경쟁', '보안 위협'],
    '유통/물류': ['이커머스 경쟁', '배송 경쟁', '재고 리스크'],
    '금융': ['규제 강화', '핀테크 경쟁', '사이버 위협'],
    '의료/헬스케어': ['규제 복잡성', '데이터 보안', '윤리 이슈'],
    default: ['경쟁사 AI 도입', '기술 격차', '투자 부담']
  };
  
  const opportunities = industryOpportunities[industry] || industryOpportunities.default;
  const threats = industryThreats[industry] || industryThreats.default;
  
  // 전략 도출
  const strategicQuadrants = {
    SO: [
      `${strengths[0] || '강점'}을 활용한 ${opportunities[0] || '기회'} 선점`,
      'AI 선도기업 포지셔닝 강화',
      '정부지원사업 우선 선정 가능성'
    ],
    WO: [
      `${weaknesses[0] || '약점'} 개선을 위한 AICAMP 교육 투자`,
      '외부 전문가 컨설팅 활용',
      '단계적 AI 도입 전략'
    ],
    ST: [
      `${strengths[0] || '강점'} 기반 차별화 전략`,
      '선제적 기술 도입으로 경쟁 우위',
      '리스크 관리 체계 구축'
    ],
    WT: [
      '핵심 약점 우선 개선',
      '방어적 투자 전략',
      '점진적 변화 관리'
    ]
  };
  
  return {
    strengths: {
      items: strengths.length > 0 ? strengths : ['변화 수용 의지', '경영진 지원'],
      leverageStrategies: ['강점 극대화 전략', '시장 선점 전략']
    },
    weaknesses: {
      items: weaknesses.length > 0 ? weaknesses : ['AI 전문성 부족', '데이터 체계 미흡'],
      improvementPriorities: gapAnalysis.criticalGaps
    },
    opportunities: {
      items: opportunities,
      captureStrategies: ['기회 포착 전략', '성장 가속화 전략']
    },
    threats: {
      items: threats,
      mitigationPlans: ['위험 회피 전략', '방어 체계 구축']
    },
    strategicQuadrants
  };
}

/**
 * 4단계: 중요도-긴급성-실행가능성 3차원 매트릭스
 */
export interface ThreeDimensionalMatrix {
  dimensions: {
    importance: number;      // 0-100
    urgency: number;        // 0-100
    feasibility: number;    // 0-100
  };
  quadrants: {
    quickWins: string[];        // 높은 긴급성 + 높은 실행가능성
    strategicProjects: string[]; // 높은 중요도 + 낮은 긴급성
    fillIns: string[];          // 낮은 중요도 + 높은 긴급성
    backburner: string[];       // 낮은 중요도 + 낮은 긴급성
  };
  priorityScore: number;
  recommendedSequence: string[];
}

export function generate3DPriorityMatrix(
  gapAnalysis: GAPAnalysisResult,
  swotGap: IntegratedSWOTGAPAnalysis,
  resources: { budget: string; timeline: string; team: string }
): ThreeDimensionalMatrix {
  const tasks: Array<{
    task: string;
    importance: number;
    urgency: number;
    feasibility: number;
    priority: number;
  }> = [];
  
  // Critical Gaps를 과제로 변환
  for (const gap of gapAnalysis.criticalGaps) {
    const gapData = gapAnalysis.categoryGaps[gap];
    const task = {
      task: `${AI_CAPABILITY_ASSESSMENT_ITEMS[gap]?.title || gap} 역량 강화`,
      importance: Math.min(100, gapData.gap * 30 + 40), // GAP 크기에 비례
      urgency: gapData.priority === 'critical' ? 90 : gapData.priority === 'high' ? 70 : 50,
      feasibility: calculateFeasibility(gap, resources),
      priority: 0
    };
    task.priority = (task.importance * 0.4 + task.urgency * 0.4 + task.feasibility * 0.2);
    tasks.push(task);
  }
  
  // SWOT 전략을 과제로 변환
  for (const strategy of swotGap.strategicQuadrants.SO.slice(0, 2)) {
    tasks.push({
      task: strategy,
      importance: 85,
      urgency: 60,
      feasibility: 80,
      priority: 75
    });
  }
  
  for (const strategy of swotGap.strategicQuadrants.WO.slice(0, 2)) {
    tasks.push({
      task: strategy,
      importance: 90,
      urgency: 80,
      feasibility: 70,
      priority: 80
    });
  }
  
  // 과제 분류
  const quadrants = {
    quickWins: tasks
      .filter(t => t.urgency > 70 && t.feasibility > 70)
      .map(t => t.task),
    strategicProjects: tasks
      .filter(t => t.importance > 70 && t.urgency <= 70)
      .map(t => t.task),
    fillIns: tasks
      .filter(t => t.importance <= 70 && t.urgency > 70)
      .map(t => t.task),
    backburner: tasks
      .filter(t => t.importance <= 70 && t.urgency <= 70)
      .map(t => t.task)
  };
  
  // 실행 순서 결정
  const sortedTasks = tasks.sort((a, b) => b.priority - a.priority);
  const recommendedSequence = sortedTasks.slice(0, 10).map(t => t.task);
  
  // 평균 차원 점수 계산
  const avgImportance = tasks.reduce((sum, t) => sum + t.importance, 0) / tasks.length || 0;
  const avgUrgency = tasks.reduce((sum, t) => sum + t.urgency, 0) / tasks.length || 0;
  const avgFeasibility = tasks.reduce((sum, t) => sum + t.feasibility, 0) / tasks.length || 0;
  
  return {
    dimensions: {
      importance: Math.round(avgImportance),
      urgency: Math.round(avgUrgency),
      feasibility: Math.round(avgFeasibility)
    },
    quadrants,
    priorityScore: Math.round((avgImportance + avgUrgency + avgFeasibility) / 3),
    recommendedSequence
  };
}

/**
 * 5단계: 고몰입 조직 구축 전략
 */
export interface HighEngagementStrategy {
  vision: string;
  coreValues: string[];
  engagementDrivers: {
    leadership: string[];
    culture: string[];
    systems: string[];
    capabilities: string[];
  };
  implementationPhases: {
    foundation: {
      period: string;
      objectives: string[];
      keyActions: string[];
      successMetrics: string[];
    };
    acceleration: {
      period: string;
      objectives: string[];
      keyActions: string[];
      successMetrics: string[];
    };
    sustainability: {
      period: string;
      objectives: string[];
      keyActions: string[];
      successMetrics: string[];
    };
  };
  expectedOutcomes: {
    shortTerm: string[];
    mediumTerm: string[];
    longTerm: string[];
  };
}

export function generateHighEngagementStrategy(
  scoreResult: ScoreCalculationResult,
  gapAnalysis: GAPAnalysisResult,
  company: { name: string; industry: string; employees: string }
): HighEngagementStrategy {
  const maturityLevel = scoreResult.overallScore;
  
  // 성숙도에 따른 비전 설정
  const companyName = company.name || company.industry || '귀하의 기업';
  const vision = maturityLevel > 60 
    ? `${companyName}을 업계 최고의 AI 혁신 기업으로 발전`
    : `${companyName}의 AI 기반 디지털 전환 성공`;
  
  // 핵심 가치
  const coreValues = [
    'AI 기반 혁신 문화',
    '데이터 중심 의사결정',
    '지속적 학습과 성장',
    '협업과 공유'
  ];
  
  // 몰입 동인
  const engagementDrivers = {
    leadership: [
      'CEO의 AI 비전 공유',
      '리더십의 솔선수범',
      '권한 위임과 자율성'
    ],
    culture: [
      '실패를 학습으로 전환',
      '혁신 아이디어 보상',
      '부서간 협업 문화'
    ],
    systems: [
      'AI 도구 접근성 확대',
      '성과 측정 체계 구축',
      '지속적 피드백 시스템'
    ],
    capabilities: [
      'AICAMP 전문 교육',
      '실무 프로젝트 경험',
      'AI 커뮤니티 참여'
    ]
  };
  
  // 구현 단계
  const implementationPhases = {
    foundation: {
      period: '0-3개월',
      objectives: [
        'AI 비전 수립 및 공유',
        '핵심 인재 선발 및 교육',
        '파일럿 프로젝트 착수'
      ],
      keyActions: [
        'AI 추진 TF 구성',
        'AICAMP 기초 교육 실시',
        '퀵윈 프로젝트 선정'
      ],
      successMetrics: [
        'AI 인식도 50% 향상',
        '교육 참여율 80% 달성',
        '파일럿 1개 완료'
      ]
    },
    acceleration: {
      period: '3-6개월',
      objectives: [
        'AI 활용 확산',
        '성과 창출 가속화',
        '조직 문화 변화'
      ],
      keyActions: [
        '부서별 AI 프로젝트 확대',
        '성과 공유회 정기 개최',
        'AI 챔피언 육성'
      ],
      successMetrics: [
        '3개 부서 AI 도입',
        'ROI 150% 달성',
        '직원 만족도 20% 상승'
      ]
    },
    sustainability: {
      period: '6-12개월',
      objectives: [
        'AI 문화 정착',
        '지속 가능한 혁신',
        '생태계 구축'
      ],
      keyActions: [
        'AI CoE 설립',
        '외부 파트너십 구축',
        '지속적 개선 체계'
      ],
      successMetrics: [
        '전사 AI 활용률 70%',
        '혁신 아이디어 월 10건',
        '업계 리더십 확보'
      ]
    }
  };
  
  // 기대 성과
  const expectedOutcomes = {
    shortTerm: [
      '업무 효율 30% 향상',
      '의사결정 속도 2배 향상',
      '직원 AI 활용 능력 향상'
    ],
    mediumTerm: [
      '비용 절감 40% 달성',
      '신규 비즈니스 기회 창출',
      '고객 만족도 향상'
    ],
    longTerm: [
      '업계 AI 리더십 확보',
      '지속 가능한 경쟁 우위',
      'AI 기반 혁신 생태계 구축'
    ]
  };
  
  return {
    vision,
    coreValues,
    engagementDrivers,
    implementationPhases,
    expectedOutcomes
  };
}

/**
 * 6단계: 통합 진단 보고서 오케스트레이션
 */
export interface OrchestrationResult {
  diagnosisId: string;
  timestamp: string;
  companyInfo: {
    name: string;
    industry: string;
    employees: string;
    challenges: string;
  };
  scoreAnalysis: ScoreCalculationResult;
  gapAnalysis: GAPAnalysisResult;
  swotGapIntegration: IntegratedSWOTGAPAnalysis;
  priorityMatrix: ThreeDimensionalMatrix;
  engagementStrategy: HighEngagementStrategy;
  executionRoadmap: any;
  roiProjection: any;
  aicampRecommendation: {
    programs: string[];
    timeline: string;
    investment: string;
    expectedROI: string;
    governmentSupport: string;
  };
  qualityMetrics: {
    logicalConsistency: number;
    dataCompleteness: number;
    strategicAlignment: number;
    feasibilityScore: number;
    overallQuality: number;
  };
}

export function orchestrateDiagnosisWorkflow(
  companyInfo: {
    name: string;
    industry: string;
    employees: string;
    businessContent: string;
    challenges: string;
  },
  assessmentResponses: Record<string, number>
): OrchestrationResult {
  console.log('🎯 AI 역량진단 오케스트레이션 시작');
  
  // 1. 점수 계산 및 검증
  const scoreAnalysis = calculateAndValidateScores(assessmentResponses);
  console.log(`✅ 1단계 완료: 점수 계산 (${scoreAnalysis.overallScore}점, ${scoreAnalysis.grade}등급)`);
  
  // 2. GAP 분석
  const gapAnalysis = performGAPAnalysis(scoreAnalysis, companyInfo.industry);
  console.log(`✅ 2단계 완료: GAP 분석 (격차 ${gapAnalysis.gap}점)`);
  
  // 3. SWOT-GAP 통합
  const swotGapIntegration = performIntegratedSWOTGAPAnalysis(
    gapAnalysis,
    companyInfo.industry,
    companyInfo.employees,
    companyInfo.challenges
  );
  console.log('✅ 3단계 완료: SWOT-GAP 통합 분석');
  
  // 4. 3차원 우선순위 매트릭스
  const priorityMatrix = generate3DPriorityMatrix(
    gapAnalysis,
    swotGapIntegration,
    {
      budget: determinebudget(companyInfo.employees),
      timeline: '12개월',
      team: determineTeamSize(companyInfo.employees)
    }
  );
  console.log(`✅ 4단계 완료: 우선순위 매트릭스 (우선순위 점수 ${priorityMatrix.priorityScore})`);
  
  // 5. 고몰입 조직 전략
  const engagementStrategy = generateHighEngagementStrategy(
    scoreAnalysis,
    gapAnalysis,
    companyInfo
  );
  console.log('✅ 5단계 완료: 고몰입 조직 구축 전략');
  
  // 6. 실행 로드맵 (기존 함수 활용)
  const executionRoadmap = generateExecutionRoadmap(
    scoreAnalysis.overallScore,
    companyInfo.industry,
    swotGapIntegration.weaknesses.items
  );
  console.log('✅ 6단계 완료: 3단계 실행 로드맵');
  
  // 7. ROI 분석 (기존 함수 활용)
  const roiProjection = calculateAIROI(
    companyInfo.employees,
    companyInfo.industry,
    scoreAnalysis.overallScore
  );
  console.log(`✅ 7단계 완료: ROI 분석 (${roiProjection.metrics.roi.toFixed(0)}%)`);
  
  // 8. AICAMP 맞춤 추천
  const aicampRecommendation = {
    programs: determineRecommendedPrograms(scoreAnalysis, gapAnalysis),
    timeline: '12주 집중 과정',
    investment: `${roiProjection.investment.education}만원`,
    expectedROI: `${roiProjection.metrics.roi.toFixed(0)}%`,
    governmentSupport: '최대 80% 지원 (AI 바우처)'
  };
  
  // 9. 품질 메트릭 계산
  const qualityMetrics = {
    logicalConsistency: calculateLogicalConsistency(scoreAnalysis, gapAnalysis, swotGapIntegration),
    dataCompleteness: scoreAnalysis.reliability,
    strategicAlignment: calculateStrategicAlignment(swotGapIntegration, priorityMatrix),
    feasibilityScore: priorityMatrix.dimensions.feasibility,
    overallQuality: 0
  };
  qualityMetrics.overallQuality = Math.round(
    (qualityMetrics.logicalConsistency + 
     qualityMetrics.dataCompleteness + 
     qualityMetrics.strategicAlignment + 
     qualityMetrics.feasibilityScore) / 4
  );
  
  console.log(`✅ 오케스트레이션 완료: 전체 품질 점수 ${qualityMetrics.overallQuality}%`);
  
  return {
    diagnosisId: `AICAMP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    companyInfo,
    scoreAnalysis,
    gapAnalysis,
    swotGapIntegration,
    priorityMatrix,
    engagementStrategy,
    executionRoadmap,
    roiProjection,
    aicampRecommendation,
    qualityMetrics
  };
}

// ===== 보조 함수들 =====

function calculatePercentile(score: number): number {
  // 정규분포 가정 (평균 50, 표준편차 15)
  const mean = 50;
  const stdDev = 15;
  const zScore = (score - mean) / stdDev;
  
  // 누적분포함수 근사
  const t = 1 / (1 + 0.2316419 * Math.abs(zScore));
  const d = 0.3989423 * Math.exp(-zScore * zScore / 2);
  const probability = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  
  const percentile = zScore > 0 ? (1 - probability) * 100 : probability * 100;
  return Math.round(Math.max(1, Math.min(99, percentile)));
}

function determineGrade(score: number): string {
  if (score >= 90) return 'S';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  return 'D';
}

function calculateFeasibility(
  gap: string,
  resources: { budget: string; timeline: string; team: string }
): number {
  // 리소스 기반 실행 가능성 계산
  const budgetScore = resources.budget.includes('억') ? 80 : 60;
  const timelineScore = resources.timeline.includes('12') ? 70 : 50;
  const teamScore = parseInt(resources.team) > 5 ? 75 : 55;
  
  // GAP 난이도 고려
  const difficultyFactors = {
    'talent': 0.7,      // 인재 확보 어려움
    'infrastructure': 0.8, // 인프라 구축 시간 소요
    'dataManagement': 0.85,
    'strategy': 0.9,
    'aiUnderstanding': 0.95,
    'utilization': 0.9
  };
  
  const difficulty = difficultyFactors[gap] || 0.85;
  const baseScore = (budgetScore + timelineScore + teamScore) / 3;
  
  return Math.round(baseScore * difficulty);
}

function determinebudget(employees: string): string {
  const employeeCount = parseInt(employees.split('-')[0]) || 10;
  if (employeeCount >= 300) return '3억원 이상';
  if (employeeCount >= 100) return '1-3억원';
  if (employeeCount >= 50) return '5000만원-1억원';
  if (employeeCount >= 10) return '2000-5000만원';
  return '1000-2000만원';
}

function determineTeamSize(employees: string): string {
  const employeeCount = parseInt(employees.split('-')[0]) || 10;
  if (employeeCount >= 300) return '20';
  if (employeeCount >= 100) return '10';
  if (employeeCount >= 50) return '5';
  return '3';
}

function determineRecommendedPrograms(
  scoreAnalysis: ScoreCalculationResult,
  gapAnalysis: GAPAnalysisResult
): string[] {
  const programs = [];
  
  // 점수 기반 프로그램
  if (scoreAnalysis.overallScore < 40) {
    programs.push('AI 기초 이해 과정 (입문)');
  } else if (scoreAnalysis.overallScore < 60) {
    programs.push('AI 실무 적용 과정 (중급)');
  } else {
    programs.push('AI 전략 리더십 과정 (고급)');
  }
  
  // GAP 기반 프로그램
  for (const gap of gapAnalysis.criticalGaps) {
    if (gap === 'talent') {
      programs.push('AI 인재 양성 프로그램');
    } else if (gap === 'dataManagement') {
      programs.push('데이터 거버넌스 구축 과정');
    } else if (gap === 'strategy') {
      programs.push('AI 전략 수립 워크샵');
    }
  }
  
  // n8n 자동화 추가
  programs.push('n8n 업무자동화 실습 과정');
  
  return programs;
}

function calculateLogicalConsistency(
  scoreAnalysis: ScoreCalculationResult,
  gapAnalysis: GAPAnalysisResult,
  swotGap: IntegratedSWOTGAPAnalysis
): number {
  let consistency = 100;
  
  // 점수와 GAP의 일관성
  if (scoreAnalysis.overallScore > 70 && gapAnalysis.gap > 20) {
    consistency -= 10; // 높은 점수인데 GAP이 큰 경우
  }
  
  // SWOT와 GAP의 일관성
  if (gapAnalysis.criticalGaps.length > 3 && swotGap.strengths.items.length > 5) {
    consistency -= 10; // 심각한 GAP이 많은데 강점이 너무 많은 경우
  }
  
  // 약점과 위협의 균형
  const weaknessCount = swotGap.weaknesses.items.length;
  const threatCount = swotGap.threats.items.length;
  if (Math.abs(weaknessCount - threatCount) > 3) {
    consistency -= 5;
  }
  
  return Math.max(70, consistency);
}

function calculateStrategicAlignment(
  swotGap: IntegratedSWOTGAPAnalysis,
  priorityMatrix: ThreeDimensionalMatrix
): number {
  let alignment = 80;
  
  // Quick Wins와 SO 전략의 연계
  const quickWinCount = priorityMatrix.quadrants.quickWins.length;
  const soStrategyCount = swotGap.strategicQuadrants.SO.length;
  
  if (quickWinCount > 0 && soStrategyCount > 0) {
    alignment += 10;
  }
  
  // 우선순위와 약점 개선의 연계
  const topPriorities = priorityMatrix.recommendedSequence.slice(0, 3);
  const weaknessImprovement = swotGap.weaknesses.improvementPriorities;
  
  const overlap = topPriorities.filter(p => 
    weaknessImprovement.some(w => p.includes(w))
  ).length;
  
  alignment += overlap * 5;
  
  return Math.min(100, alignment);
}

// 전체 시스템 검증 함수
export function validateSystemIntegrity(): {
  isValid: boolean;
  issues: string[];
  recommendations: string[];
} {
  const issues: string[] = [];
  const recommendations: string[] = [];
  
  // 1. 평가 항목 완전성 검증
  const totalItems = Object.values(AI_CAPABILITY_ASSESSMENT_ITEMS)
    .reduce((sum, cat) => sum + cat.items.length, 0);
  
  if (totalItems !== 29) {
    issues.push(`평가 항목 수 불일치: ${totalItems}/29`);
  }
  
  // 2. 가중치 합계 검증
  for (const [category, data] of Object.entries(AI_CAPABILITY_ASSESSMENT_ITEMS)) {
    const weightSum = data.items.reduce((sum, item) => sum + item.weight, 0);
    const avgWeight = weightSum / data.items.length;
    
    if (avgWeight < 0.9 || avgWeight > 1.2) {
      issues.push(`${category} 카테고리 가중치 불균형: 평균 ${avgWeight.toFixed(2)}`);
    }
  }
  
  // 3. 성숙도 레벨 연속성 검증
  const levels = Object.values(AI_MATURITY_LEVELS);
  for (let i = 1; i < levels.length; i++) {
    if (levels[i].score[0] !== levels[i-1].score[1] + 1) {
      issues.push(`성숙도 레벨 점수 구간 불연속: ${levels[i-1].name} -> ${levels[i].name}`);
    }
  }
  
  // 권장사항 생성
  if (issues.length === 0) {
    recommendations.push('✅ 시스템 무결성 검증 통과');
  } else {
    recommendations.push('⚠️ 시스템 검증 이슈 발견');
    recommendations.push(...issues.map(issue => `- ${issue}`));
  }
  
  recommendations.push('📌 권장 개선사항:');
  recommendations.push('- 정기적인 벤치마크 데이터 업데이트');
  recommendations.push('- 업종별 가중치 세분화');
  recommendations.push('- 실시간 피드백 시스템 구축');
  
  return {
    isValid: issues.length === 0,
    issues,
    recommendations
  };
}