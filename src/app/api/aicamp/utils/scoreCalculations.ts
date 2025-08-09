// AI 역량 점수 계산 - 실제 신청서 데이터와 정확히 연결
export function calculateAICapabilityScores(data: any) {
  const scores = {
    dataQuality: 0,
    algorithmComplexity: 0,
    infrastructureReadiness: 0,
    integrationCapability: 0,
    innovationCulture: 0,
    total: 0
  };

  // 🎯 실제 신청서 필드와 정확한 매핑
  // 데이터 품질 점수 (5점 만점)
  if (data.dataQuality || data.dataManagement) {
    const field = data.dataQuality || data.dataManagement;
    const qualityMap: Record<string, number> = {
      '체계적 관리': 5,
      '체계적': 5,
      '부분적 관리': 3.5,
      '부분적': 3.5,
      '기초 수준': 2.5,
      '기초': 2.5,
      '관리 미흡': 1.5,
      '미흡': 1.5,
      '없음': 1
    };
    scores.dataQuality = qualityMap[field] || 3;
  } else {
    scores.dataQuality = 3; // 기본값
  }

  // 알고리즘 복잡도 이해 점수
  if (data.aiExperience || data.aiUsageExperience) {
    const field = data.aiExperience || data.aiUsageExperience;
    const experienceMap: Record<string, number> = {
      '도입 운영 중': 5,
      '운영중': 5,
      '파일럿 진행': 4,
      '파일럿': 4,
      '검토 중': 3,
      '검토중': 3,
      '관심 있음': 2,
      '관심': 2,
      '경험 없음': 1,
      '없음': 1
    };
    scores.algorithmComplexity = experienceMap[field] || 3;
  } else {
    scores.algorithmComplexity = 3; // 기본값
  }

  // 인프라 준비도 점수
  if (data.digitalizationLevel || data.digitalLevel) {
    const field = data.digitalizationLevel || data.digitalLevel;
    const digitalMap: Record<string, number> = {
      '고도화': 5,
      '높음': 5,
      '중급': 3.5,
      '중간': 3.5,
      '기초': 2.5,
      '낮음': 2,
      '미흡': 1,
      '매우낮음': 1
    };
    scores.infrastructureReadiness = digitalMap[field] || 3;
  } else {
    scores.infrastructureReadiness = 3; // 기본값
  }

  // 통합 역량 점수
  if (data.systemIntegration || data.systemIntegrationLevel) {
    const field = data.systemIntegration || data.systemIntegrationLevel;
    scores.integrationCapability = field === '완전 통합' || field === '완전' ? 5 :
                                  field === '부분 통합' || field === '부분' ? 3.5 :
                                  field === '기초' ? 2.5 : 3;
  } else {
    scores.integrationCapability = 3; // 기본값
  }

  // 혁신 문화 점수
  if (data.changeReadiness || data.innovationReadiness) {
    const field = data.changeReadiness || data.innovationReadiness;
    scores.innovationCulture = field === '매우 높음' || field === '매우높음' ? 5 :
                              field === '높음' ? 4 :
                              field === '보통' || field === '중간' ? 3 :
                              field === '낮음' ? 2 : 3;
  } else {
    scores.innovationCulture = 3; // 기본값
  }

  // 총점 계산 (100점 만점으로 변환) - 더 정확한 계산
  const rawTotal = scores.dataQuality + scores.algorithmComplexity + 
                  scores.infrastructureReadiness + scores.integrationCapability + 
                  scores.innovationCulture;
  scores.total = Math.round((rawTotal / 25) * 100); // 5개 항목 * 5점 = 25점 만점

  console.log('📊 AI 역량 점수 계산 결과:', scores);
  return scores;
}

// 실무 역량 점수 계산 - 실제 신청서 데이터와 정확히 연결
export function calculatePracticalCapabilityScores(data: any) {
  const scores = {
    businessAlignment: 0,
    processOptimization: 0,
    skillReadiness: 0,
    changeManagement: 0,
    resourceAvailability: 0,
    total: 0
  };

  // 🎯 비즈니스 정렬도 - 실제 필드 매핑
  if (data.businessPriority || data.aiPriority) {
    const field = data.businessPriority || data.aiPriority;
    scores.businessAlignment = field === '최우선 과제' || field === '최우선' ? 5 :
                              field === '주요 과제' || field === '주요' ? 4 :
                              field === '검토 중' || field === '검토중' ? 3 :
                              field === '관심' ? 2.5 : 3;
  } else {
    scores.businessAlignment = 3; // 기본값
  }

  // 프로세스 최적화
  if (data.processMaturity || data.processLevel) {
    const field = data.processMaturity || data.processLevel;
    scores.processOptimization = field === '최적화됨' || field === '최적화' ? 5 :
                                field === '표준화됨' || field === '표준화' ? 4 :
                                field === '문서화됨' || field === '문서화' ? 3 :
                                field === '기초' ? 2 : 3;
  } else {
    scores.processOptimization = 3; // 기본값
  }

  // 스킬 준비도
  if (data.employeeCount || data.employees) {
    const field = data.employeeCount || data.employees;
    const employeeNum = typeof field === 'string' ? 
                       parseInt(field.replace(/[^0-9]/g, '')) || 50 : field;
    const baseScore = employeeNum >= 100 ? 4 : employeeNum >= 50 ? 3.5 : 3;
    
    if (data.trainingProgram || data.training) {
      const training = data.trainingProgram || data.training;
      scores.skillReadiness = training === '체계적 운영' || training === '체계적' ? 5 :
                             training === '부분적 운영' || training === '부분적' ? baseScore :
                             training === '계획중' ? 2.5 : baseScore;
    } else {
      scores.skillReadiness = baseScore;
    }
  } else {
    scores.skillReadiness = 3; // 기본값
  }

  // 변화 관리
  if (data.changeReadiness || data.changeManagement) {
    const field = data.changeReadiness || data.changeManagement;
    scores.changeManagement = field === '매우 높음' || field === '매우높음' ? 5 :
                             field === '높음' ? 4 :
                             field === '보통' || field === '중간' ? 3 :
                             field === '낮음' ? 2 : 3;
  } else {
    scores.changeManagement = 3; // 기본값
  }

  // 자원 가용성
  if (data.annualRevenue || data.revenue || data.budget) {
    const field = data.annualRevenue || data.revenue || data.budget;
    const revenue = typeof field === 'string' ? 
                   parseInt(field.replace(/[^0-9]/g, '')) || 100 : field;
    scores.resourceAvailability = revenue >= 1000 ? 5 :
                                 revenue >= 500 ? 4 :
                                 revenue >= 100 ? 3 :
                                 revenue >= 50 ? 2.5 : 2;
  } else {
    scores.resourceAvailability = 3; // 기본값
  }

  // 총점 계산 (100점 만점으로 변환) - 더 정확한 계산
  const rawTotal = scores.businessAlignment + scores.processOptimization + 
                  scores.skillReadiness + scores.changeManagement + 
                  scores.resourceAvailability;
  scores.total = Math.round((rawTotal / 25) * 100);

  console.log('📊 실무 역량 점수 계산 결과:', scores);
  return scores;
}

// 종합 점수 계산 - 실제 데이터 정확 반영
export function calculateComprehensiveScores(data: any) {
  const aiScores = calculateAICapabilityScores(data);
  const practicalScores = calculatePracticalCapabilityScores(data);
  
  // 산업별 가중치
  const industryWeights = getIndustryWeights(data.industry);
  
  // 🎯 카테고리별 점수 계산 (5점 만점)
  const categories = {
    리더십: 0,
    인프라: 0,
    직원역량: 0,
    조직문화: 0,
    실무적용: 0,
    데이터: 0
  };
  
  // 리더십 점수 (비즈니스 우선순위 + 혁신 문화)
  categories.리더십 = Math.round(
    ((practicalScores.businessAlignment * 0.6 + aiScores.innovationCulture * 0.4) * 10) / 10
  );
  
  // 인프라 점수 (인프라 준비도 + 자원 가용성)
  categories.인프라 = Math.round(
    ((aiScores.infrastructureReadiness * 0.7 + practicalScores.resourceAvailability * 0.3) * 10) / 10
  );
  
  // 직원역량 점수 (스킬 준비도 + AI 경험)
  categories.직원역량 = Math.round(
    ((practicalScores.skillReadiness * 0.6 + aiScores.algorithmComplexity * 0.4) * 10) / 10
  );
  
  // 조직문화 점수 (혁신 문화 + 변화 관리)
  categories.조직문화 = Math.round(
    ((aiScores.innovationCulture * 0.5 + practicalScores.changeManagement * 0.5) * 10) / 10
  );
  
  // 실무적용 점수 (프로세스 최적화 + 통합 역량)
  categories.실무적용 = Math.round(
    ((practicalScores.processOptimization * 0.5 + aiScores.integrationCapability * 0.5) * 10) / 10
  );
  
  // 데이터 점수 (데이터 품질)
  categories.데이터 = Math.round(aiScores.dataQuality * 10) / 10;
  
  // 가중치 적용
  const weightedAIScore = aiScores.total * industryWeights.ai;
  const weightedPracticalScore = practicalScores.total * industryWeights.practical;
  
  // 전체 점수 계산
  const total = Math.round((weightedAIScore + weightedPracticalScore) / (industryWeights.ai + industryWeights.practical));
  
  // 등급 계산
  const grade = total >= 80 ? 'S' :
                total >= 70 ? 'A' :
                total >= 60 ? 'B' :
                total >= 50 ? 'C' : 'D';
  
  console.log('📊 종합 점수 계산:', {
    categories,
    aiCapability: aiScores.total,
    practicalCapability: practicalScores.total,
    total,
    grade
  });
  
  return {
    ai: aiScores,
    practical: practicalScores,
    categories,
    weighted: {
      ai: weightedAIScore,
      practical: weightedPracticalScore
    },
    total,
    grade
  };
}

// 산업별 가중치
function getIndustryWeights(industry: string) {
  const weights: Record<string, { ai: number; practical: number }> = {
    'IT/소프트웨어': { ai: 0.7, practical: 0.3 },
    '제조업': { ai: 0.5, practical: 0.5 },
    '금융/보험': { ai: 0.6, practical: 0.4 },
    '유통/물류': { ai: 0.5, practical: 0.5 },
    '의료/헬스케어': { ai: 0.6, practical: 0.4 },
    '교육/에듀테크': { ai: 0.5, practical: 0.5 },
    '부동산/건설': { ai: 0.4, practical: 0.6 },
    '미디어/엔터테인먼트': { ai: 0.6, practical: 0.4 },
    '전문서비스': { ai: 0.5, practical: 0.5 },
    '공공/정부': { ai: 0.4, practical: 0.6 }
  };
  
  return weights[industry] || { ai: 0.5, practical: 0.5 };
}

// 벤치마크 갭 분석
export function analyzeBenchmarkGap(companyScores: any, industry: string) {
  const benchmark = getIndustryBenchmark(industry);
  
  const gaps = {
    ai: benchmark.ai - companyScores.ai.total,
    practical: benchmark.practical - companyScores.practical.total,
    total: benchmark.total - companyScores.total
  };
  
  const overallGapPercentage = (gaps.total / benchmark.total) * 100;
  
  // 우선순위 영역 식별
  const priorityAreas = [];
  if (gaps.ai > 20) priorityAreas.push('AI 기술 역량');
  if (gaps.practical > 20) priorityAreas.push('실무 적용 역량');
  
  // 세부 영역 분석
  const detailedGaps = analyzeDetailedGaps(companyScores, benchmark);
  priorityAreas.push(...detailedGaps);
  
  return {
    gaps,
    overallGapPercentage,
    priorityAreas: [...new Set(priorityAreas)], // 중복 제거
    competitivePosition: getCompetitivePosition(overallGapPercentage),
    recommendations: generateGapRecommendations(gaps, priorityAreas)
  };
}

// 산업 벤치마크
function getIndustryBenchmark(industry: string) {
  const benchmarks: Record<string, { ai: number; practical: number; total: number }> = {
    'IT/소프트웨어': { ai: 85, practical: 80, total: 83 },
    '제조업': { ai: 70, practical: 75, total: 72 },
    '금융/보험': { ai: 80, practical: 75, total: 78 },
    '유통/물류': { ai: 65, practical: 70, total: 67 },
    '의료/헬스케어': { ai: 75, practical: 70, total: 73 },
    '교육/에듀테크': { ai: 70, practical: 65, total: 67 },
    '부동산/건설': { ai: 60, practical: 65, total: 62 },
    '미디어/엔터테인먼트': { ai: 75, practical: 70, total: 73 },
    '전문서비스': { ai: 65, practical: 70, total: 67 },
    '공공/정부': { ai: 60, practical: 65, total: 62 }
  };
  
  return benchmarks[industry] || { ai: 70, practical: 70, total: 70 };
}

// 세부 갭 분석
function analyzeDetailedGaps(scores: any, benchmark: any): string[] {
  const gaps = [];
  
  // AI 역량 세부 분석
  if (scores.ai.dataQuality < 3) gaps.push('데이터 품질 관리');
  if (scores.ai.infrastructureReadiness < 3) gaps.push('AI 인프라 구축');
  if (scores.ai.innovationCulture < 3) gaps.push('혁신 문화 조성');
  
  // 실무 역량 세부 분석
  if (scores.practical.businessAlignment < 3) gaps.push('비즈니스 전략 정렬');
  if (scores.practical.skillReadiness < 3) gaps.push('인력 역량 개발');
  if (scores.practical.changeManagement < 3) gaps.push('변화 관리 체계');
  
  return gaps;
}

// 경쟁 포지션 결정
export function getCompetitivePosition(gapPercentage: number): string {
  if (gapPercentage < -10) return '업계 선도';
  if (gapPercentage < 5) return '평균 이상';
  if (gapPercentage < 15) return '평균 수준';
  if (gapPercentage < 30) return '개선 필요';
  return '시급한 개선 필요';
}

// 갭 기반 추천사항 생성
function generateGapRecommendations(gaps: any, priorityAreas: string[]): string[] {
  const recommendations = [];
  
  if (gaps.ai > 20) {
    recommendations.push('AI 기술 교육 프로그램 도입');
    recommendations.push('AI 파일럿 프로젝트 시작');
  }
  
  if (gaps.practical > 20) {
    recommendations.push('업무 프로세스 재설계');
    recommendations.push('변화 관리 프로그램 실행');
  }
  
  if (priorityAreas.includes('데이터 품질 관리')) {
    recommendations.push('데이터 거버넌스 체계 구축');
  }
  
  if (priorityAreas.includes('인력 역량 개발')) {
    recommendations.push('맞춤형 AI 교육 커리큘럼 도입');
  }
  
  return recommendations;
}

// SWOT 전략 연계 생성
export function generateStrategicSWOTLinkage(scores: any, gapAnalysis: any, data: any) {
  const swot = {
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: []
  };
  
  // 강점 식별
  if (scores.ai.total > 70) swot.strengths.push('높은 AI 기술 이해도');
  if (scores.practical.total > 70) swot.strengths.push('우수한 실무 적용 역량');
  if (data.changeReadiness === '매우 높음') swot.strengths.push('강한 변화 수용 문화');
  
  // 약점 식별
  if (scores.ai.total < 50) swot.weaknesses.push('AI 기술 역량 부족');
  if (scores.practical.total < 50) swot.weaknesses.push('실무 적용 경험 부족');
  gapAnalysis.priorityAreas.forEach(area => {
    swot.weaknesses.push(`${area} 미흡`);
  });
  
  // 기회 식별
  swot.opportunities.push(`${data.industry} AI 시장 성장`);
  if (data.expectedBenefits) {
    swot.opportunities.push('명확한 AI 도입 목표 보유');
  }
  
  // 위협 식별
  if (gapAnalysis.competitivePosition === '시급한 개선 필요') {
    swot.threats.push('경쟁사 대비 기술 격차 확대');
  }
  swot.threats.push('AI 인재 확보 경쟁 심화');
  
  // 전략 매트릭스 생성
  const strategies = {
    so: generateSOStrategies(swot.strengths, swot.opportunities),
    wo: generateWOStrategies(swot.weaknesses, swot.opportunities),
    st: generateSTStrategies(swot.strengths, swot.threats),
    wt: generateWTStrategies(swot.weaknesses, swot.threats)
  };
  
  return {
    swot,
    strategies,
    priorityStrategy: determinePriorityStrategy(scores, gapAnalysis)
  };
}

// SO 전략 생성
function generateSOStrategies(strengths: string[], opportunities: string[]): string[] {
  const strategies = [];
  
  if (strengths.includes('높은 AI 기술 이해도') && opportunities.length > 0) {
    strategies.push('AI 기술 리더십을 활용한 시장 선점');
  }
  
  if (strengths.includes('강한 변화 수용 문화')) {
    strategies.push('빠른 AI 전환을 통한 경쟁 우위 확보');
  }
  
  return strategies;
}

// WO 전략 생성
function generateWOStrategies(weaknesses: string[], opportunities: string[]): string[] {
  const strategies = [];
  
  if (weaknesses.some(w => w.includes('역량 부족'))) {
    strategies.push('외부 전문가 협력을 통한 빠른 역량 확보');
  }
  
  strategies.push('단계적 AI 도입을 통한 리스크 최소화');
  
  return strategies;
}

// ST 전략 생성
function generateSTStrategies(strengths: string[], threats: string[]): string[] {
  const strategies = [];
  
  if (strengths.includes('우수한 실무 적용 역량')) {
    strategies.push('실무 중심 AI 도입으로 실질적 성과 창출');
  }
  
  strategies.push('내부 인재 육성을 통한 AI 역량 내재화');
  
  return strategies;
}

// WT 전략 생성
function generateWTStrategies(weaknesses: string[], threats: string[]): string[] {
  const strategies = [];
  
  strategies.push('핵심 영역 중심의 선택적 AI 도입');
  strategies.push('파트너십을 통한 기술 격차 해소');
  
  return strategies;
}

// 우선 전략 결정
function determinePriorityStrategy(scores: any, gapAnalysis: any): string {
  if (scores.total > 80) return '공격적 확장 전략';
  if (scores.total > 60 && gapAnalysis.competitivePosition === '평균 이상') return '선택적 강화 전략';
  if (scores.total > 40) return '단계적 개선 전략';
  return '기반 구축 전략';
}

// AI 역량 강화 방향 생성
export function generateAICapabilityEnhancementDirection(scores: any, gapAnalysis: any, strategicAnalysis: any, data: any) {
  const direction = {
    strategicDirection: strategicAnalysis.priorityStrategy,
    coreObjectives: [],
    implementationRoadmap: {
      immediate: [],
      shortTerm: [],
      midTerm: [],
      longTerm: []
    },
    expectedOutcomes: {
      efficiency: '',
      costReduction: '',
      revenueGrowth: '',
      expectedROI: ''
    },
    successFactors: [],
    riskMitigation: []
  };
  
  // 핵심 목표 설정
  if (gapAnalysis.priorityAreas.includes('AI 기술 역량')) {
    direction.coreObjectives.push('AI 기술 역량 강화');
  }
  if (gapAnalysis.priorityAreas.includes('실무 적용 역량')) {
    direction.coreObjectives.push('실무 적용 능력 향상');
  }
  direction.coreObjectives.push('지속가능한 AI 경쟁력 확보');
  
  // 로드맵 생성
  direction.implementationRoadmap.immediate = [
    'AI 도입 TF 구성',
    '현황 진단 및 목표 설정',
    '우선 적용 영역 선정'
  ];
  
  direction.implementationRoadmap.shortTerm = [
    'AI 파일럿 프로젝트 실행',
    '핵심 인력 교육 프로그램 시작',
    '데이터 인프라 점검'
  ];
  
  direction.implementationRoadmap.midTerm = [
    'AI 솔루션 확대 적용',
    '전사 AI 교육 확산',
    '성과 측정 체계 구축'
  ];
  
  direction.implementationRoadmap.longTerm = [
    'AI 기반 비즈니스 모델 혁신',
    'AI 중심 조직 문화 정착',
    '지속적 개선 체계 확립'
  ];
  
  // 기대 성과 설정
  direction.expectedOutcomes.efficiency = '25-35%';
  direction.expectedOutcomes.costReduction = '15-20%';
  direction.expectedOutcomes.revenueGrowth = '10-15%';
  direction.expectedOutcomes.expectedROI = '200-300%';
  
  // 성공 요인
  direction.successFactors = [
    '경영진의 강력한 지원',
    '전사적 참여와 협력',
    '체계적인 변화 관리',
    '지속적인 투자와 개선'
  ];
  
  // 리스크 완화
  direction.riskMitigation = [
    '단계적 도입을 통한 리스크 분산',
    '충분한 교육과 준비 기간 확보',
    '외부 전문가 활용',
    '성과 기반 투자 결정'
  ];
  
  return direction;
}

// 실행 로드맵 생성
export function generateExecutionRoadmap(data: any, analysisData: any) {
  const roadmap = {
    phases: [],
    timeline: '',
    keyMilestones: [],
    resourceRequirements: {
      budget: '',
      personnel: '',
      technology: []
    },
    governance: {
      structure: '',
      roles: [],
      kpis: []
    }
  };
  
  // 단계별 실행 계획
  roadmap.phases = [
    {
      phase: '1단계: 기반 구축',
      duration: '3개월',
      objectives: ['AI 전략 수립', '조직 준비도 향상', '파일럿 프로젝트 선정'],
      deliverables: ['AI 로드맵', '교육 계획', '파일럿 계획서']
    },
    {
      phase: '2단계: 파일럿 실행',
      duration: '6개월',
      objectives: ['파일럿 프로젝트 실행', '성과 검증', '확산 계획 수립'],
      deliverables: ['파일럿 결과 보고서', '확산 전략', 'ROI 분석']
    },
    {
      phase: '3단계: 전사 확산',
      duration: '12개월',
      objectives: ['AI 솔루션 확대', '전사 교육', '성과 관리 체계화'],
      deliverables: ['AI 운영 체계', '성과 대시보드', '개선 계획']
    }
  ];
  
  // 주요 마일스톤
  roadmap.keyMilestones = [
    { month: 1, milestone: 'AI TF 구성 완료' },
    { month: 3, milestone: '파일럿 프로젝트 착수' },
    { month: 6, milestone: '파일럿 성과 검증' },
    { month: 9, milestone: '확산 계획 승인' },
    { month: 12, milestone: '전사 AI 체계 구축' }
  ];
  
  // 자원 요구사항
  roadmap.resourceRequirements = {
    budget: estimateBudget(data.employeeCount, data.annualRevenue),
    personnel: estimatePersonnel(data.employeeCount),
    technology: ['AI 플랫폼', '데이터 인프라', '분석 도구', '교육 시스템']
  };
  
  // 거버넌스
  roadmap.governance = {
    structure: 'AI 추진위원회 - AI TF - 실무 추진팀',
    roles: [
      { role: 'AI 추진위원장', responsibility: '전략 의사결정' },
      { role: 'AI TF 리더', responsibility: '실행 총괄' },
      { role: '부서별 AI 담당자', responsibility: '현업 적용' }
    ],
    kpis: [
      'AI 프로젝트 ROI',
      '프로세스 효율성 개선율',
      'AI 활용도',
      '직원 AI 역량 지수'
    ]
  };
  
  roadmap.timeline = '총 18-24개월';
  
  return roadmap;
}

// 예산 추정
function estimateBudget(employeeCount: string, annualRevenue: string): string {
  const employees = parseInt(employeeCount) || 50;
  const revenue = parseInt(annualRevenue?.replace(/[^0-9]/g, '')) || 100;
  
  if (revenue >= 1000 || employees >= 300) {
    return '10억원 이상';
  } else if (revenue >= 500 || employees >= 100) {
    return '5-10억원';
  } else if (revenue >= 100 || employees >= 50) {
    return '2-5억원';
  } else {
    return '1-2억원';
  }
}

// 인력 추정
function estimatePersonnel(employeeCount: string): string {
  const employees = parseInt(employeeCount) || 50;
  
  if (employees >= 300) {
    return '전담팀 10명 이상';
  } else if (employees >= 100) {
    return '전담팀 5-10명';
  } else if (employees >= 50) {
    return '전담팀 3-5명';
  } else {
    return '전담 인력 1-3명';
  }
}