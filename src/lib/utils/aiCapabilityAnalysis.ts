/**
 * AI 역량 분석 엔진
 * 기업의 AI 역량 수준을 평가하고 벤치마크와 비교하여 GAP 분석을 수행
 */

// 업종별 벤치마크 데이터 (5점 만점)
export const industryBenchmarks: Record<string, Record<string, number>> = {
  'IT/소프트웨어': {
    ceoAIVision: 4.2,
    aiInvestment: 4.0,
    aiStrategy: 3.8,
    changeManagement: 3.7,
    riskTolerance: 3.9,
    itInfrastructure: 4.5,
    dataManagement: 4.2,
    securityLevel: 4.3,
    aiToolsAdopted: 4.1,
    digitalLiteracy: 4.3,
    aiToolUsage: 4.0,
    learningAgility: 4.1,
    dataAnalysis: 3.9,
    innovationCulture: 4.0,
    collaborationLevel: 3.8,
    experimentCulture: 3.9,
    continuousLearning: 4.0,
    processAutomation: 3.8,
    decisionMaking: 3.6,
    customerService: 3.7
  },
  '제조업': {
    ceoAIVision: 3.2,
    aiInvestment: 3.0,
    aiStrategy: 2.8,
    changeManagement: 2.9,
    riskTolerance: 2.7,
    itInfrastructure: 3.3,
    dataManagement: 3.1,
    securityLevel: 3.5,
    aiToolsAdopted: 2.9,
    digitalLiteracy: 2.8,
    aiToolUsage: 2.6,
    learningAgility: 2.9,
    dataAnalysis: 2.7,
    innovationCulture: 3.0,
    collaborationLevel: 3.1,
    experimentCulture: 2.8,
    continuousLearning: 3.0,
    processAutomation: 3.2,
    decisionMaking: 2.8,
    customerService: 2.7
  },
  '서비스업': {
    ceoAIVision: 3.5,
    aiInvestment: 3.3,
    aiStrategy: 3.1,
    changeManagement: 3.2,
    riskTolerance: 3.0,
    itInfrastructure: 3.6,
    dataManagement: 3.4,
    securityLevel: 3.7,
    aiToolsAdopted: 3.2,
    digitalLiteracy: 3.4,
    aiToolUsage: 3.1,
    learningAgility: 3.3,
    dataAnalysis: 3.0,
    innovationCulture: 3.4,
    collaborationLevel: 3.5,
    experimentCulture: 3.2,
    continuousLearning: 3.4,
    processAutomation: 3.1,
    decisionMaking: 3.0,
    customerService: 3.3
  },
  '금융/보험': {
    ceoAIVision: 4.0,
    aiInvestment: 4.2,
    aiStrategy: 3.9,
    changeManagement: 3.7,
    riskTolerance: 3.5,
    itInfrastructure: 4.4,
    dataManagement: 4.5,
    securityLevel: 4.7,
    aiToolsAdopted: 3.8,
    digitalLiteracy: 3.9,
    aiToolUsage: 3.6,
    learningAgility: 3.7,
    dataAnalysis: 4.0,
    innovationCulture: 3.6,
    collaborationLevel: 3.5,
    experimentCulture: 3.4,
    continuousLearning: 3.8,
    processAutomation: 3.9,
    decisionMaking: 3.7,
    customerService: 3.5
  },
  '유통/물류': {
    ceoAIVision: 3.4,
    aiInvestment: 3.2,
    aiStrategy: 3.0,
    changeManagement: 3.1,
    riskTolerance: 2.9,
    itInfrastructure: 3.5,
    dataManagement: 3.3,
    securityLevel: 3.6,
    aiToolsAdopted: 3.1,
    digitalLiteracy: 3.0,
    aiToolUsage: 2.8,
    learningAgility: 3.1,
    dataAnalysis: 3.0,
    innovationCulture: 3.2,
    collaborationLevel: 3.3,
    experimentCulture: 3.0,
    continuousLearning: 3.2,
    processAutomation: 3.4,
    decisionMaking: 3.1,
    customerService: 3.0
  },
  'default': {
    ceoAIVision: 3.3,
    aiInvestment: 3.1,
    aiStrategy: 2.9,
    changeManagement: 3.0,
    riskTolerance: 2.8,
    itInfrastructure: 3.4,
    dataManagement: 3.2,
    securityLevel: 3.5,
    aiToolsAdopted: 3.0,
    digitalLiteracy: 3.1,
    aiToolUsage: 2.9,
    learningAgility: 3.1,
    dataAnalysis: 2.9,
    innovationCulture: 3.1,
    collaborationLevel: 3.2,
    experimentCulture: 3.0,
    continuousLearning: 3.1,
    processAutomation: 3.0,
    decisionMaking: 2.9,
    customerService: 2.9
  }
};

// 기업 규모별 조정 계수
export const sizeAdjustments: Record<string, number> = {
  '1-9': -0.3,
  '10-49': -0.1,
  '50-99': 0,
  '100-299': 0.1,
  '300+': 0.2
};

// AI 역량 점수 인터페이스
export interface AICapabilityScores {
  ceoAIVision?: number;
  aiInvestment?: number;
  aiStrategy?: number;
  changeManagement?: number;
  riskTolerance?: number;
  itInfrastructure?: number;
  dataManagement?: number;
  securityLevel?: number;
  aiToolsAdopted?: number;
  digitalLiteracy?: number;
  aiToolUsage?: number;
  learningAgility?: number;
  dataAnalysis?: number;
  innovationCulture?: number;
  collaborationLevel?: number;
  experimentCulture?: number;
  continuousLearning?: number;
  processAutomation?: number;
  decisionMaking?: number;
  customerService?: number;
}

// AI 역량 영역별 점수
export interface AICapabilityCategoryScores {
  leadership: number;
  infrastructure: number;
  employeeCapability: number;
  culture: number;
  implementation: number;
}

// GAP 분석 결과
export interface GAPAnalysisResult {
  currentScores: AICapabilityScores;
  benchmarkScores: AICapabilityScores;
  gaps: AICapabilityScores;
  categoryScores: AICapabilityCategoryScores;
  categoryBenchmarks: AICapabilityCategoryScores;
  categoryGaps: AICapabilityCategoryScores;
  overallScore: number;
  overallBenchmark: number;
  overallGap: number;
  maturityLevel: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

// 영역별 점수 계산
export function calculateCategoryScores(scores: AICapabilityScores): AICapabilityCategoryScores {
  const leadership = [
    scores.ceoAIVision || 3,
    scores.aiInvestment || 3,
    scores.aiStrategy || 3,
    scores.changeManagement || 3,
    scores.riskTolerance || 3
  ];
  
  const infrastructure = [
    scores.itInfrastructure || 3,
    scores.dataManagement || 3,
    scores.securityLevel || 3,
    scores.aiToolsAdopted || 3
  ];
  
  const employeeCapability = [
    scores.digitalLiteracy || 3,
    scores.aiToolUsage || 3,
    scores.learningAgility || 3,
    scores.dataAnalysis || 3
  ];
  
  const culture = [
    scores.innovationCulture || 3,
    scores.collaborationLevel || 3,
    scores.experimentCulture || 3,
    scores.continuousLearning || 3
  ];
  
  const implementation = [
    scores.processAutomation || 3,
    scores.decisionMaking || 3,
    scores.customerService || 3
  ];
  
  return {
    leadership: leadership.reduce((a, b) => a + b, 0) / leadership.length,
    infrastructure: infrastructure.reduce((a, b) => a + b, 0) / infrastructure.length,
    employeeCapability: employeeCapability.reduce((a, b) => a + b, 0) / employeeCapability.length,
    culture: culture.reduce((a, b) => a + b, 0) / culture.length,
    implementation: implementation.reduce((a, b) => a + b, 0) / implementation.length
  };
}

// 성숙도 수준 판단
export function getMaturityLevel(overallScore: number): string {
  if (overallScore >= 4.5) return '선도기업 (Leading)';
  if (overallScore >= 3.5) return '성숙단계 (Mature)';
  if (overallScore >= 2.5) return '발전단계 (Developing)';
  if (overallScore >= 1.5) return '초기단계 (Initial)';
  return '미성숙 (Immature)';
}

// 강점과 약점 분석
export function analyzeStrengthsWeaknesses(gaps: AICapabilityScores): { strengths: string[], weaknesses: string[] } {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  
  const itemLabels: Record<string, string> = {
    ceoAIVision: 'CEO의 AI 비전과 추진 의지',
    aiInvestment: 'AI 투자 의지와 예산 확보',
    aiStrategy: 'AI 전략 수립 수준',
    changeManagement: '변화 관리 역량',
    riskTolerance: '리스크 수용도',
    itInfrastructure: 'IT 인프라 수준',
    dataManagement: '데이터 관리 체계',
    securityLevel: '보안 수준',
    aiToolsAdopted: 'AI 도구 도입 수준',
    digitalLiteracy: '디지털 리터러시',
    aiToolUsage: 'AI 도구 활용 능력',
    learningAgility: '학습 민첩성',
    dataAnalysis: '데이터 분석 능력',
    innovationCulture: '혁신 문화',
    collaborationLevel: '협업 수준',
    experimentCulture: '실험 문화',
    continuousLearning: '지속 학습 문화',
    processAutomation: '프로세스 자동화',
    decisionMaking: 'AI 기반 의사결정',
    customerService: '고객 서비스 AI 활용'
  };
  
  Object.entries(gaps).forEach(([key, gap]) => {
    if (gap !== undefined) {
      if (gap > 0.5) {
        strengths.push(itemLabels[key] || key);
      } else if (gap < -0.5) {
        weaknesses.push(itemLabels[key] || key);
      }
    }
  });
  
  return { strengths, weaknesses };
}

// AI 역량 GAP 분석 수행
export function performAICapabilityGAPAnalysis(
  scores: AICapabilityScores,
  industry: string,
  employeeCount?: string
): GAPAnalysisResult {
  // 벤치마크 선택
  const benchmarkBase = industryBenchmarks[industry] || industryBenchmarks.default;
  
  // 기업 규모에 따른 조정
  const sizeAdjustment = employeeCount ? (sizeAdjustments[employeeCount] || 0) : 0;
  
  // 조정된 벤치마크 계산
  const benchmarkScores: AICapabilityScores = {};
  Object.entries(benchmarkBase).forEach(([key, value]) => {
    benchmarkScores[key as keyof AICapabilityScores] = Math.max(1, Math.min(5, value + sizeAdjustment));
  });
  
  // GAP 계산
  const gaps: AICapabilityScores = {};
  Object.keys(scores).forEach((key) => {
    const scoreKey = key as keyof AICapabilityScores;
    const currentScore = scores[scoreKey] || 3;
    const benchmarkScore = benchmarkScores[scoreKey] || 3;
    gaps[scoreKey] = currentScore - benchmarkScore;
  });
  
  // 영역별 점수 계산
  const categoryScores = calculateCategoryScores(scores);
  const categoryBenchmarks = calculateCategoryScores(benchmarkScores);
  const categoryGaps: AICapabilityCategoryScores = {
    leadership: categoryScores.leadership - categoryBenchmarks.leadership,
    infrastructure: categoryScores.infrastructure - categoryBenchmarks.infrastructure,
    employeeCapability: categoryScores.employeeCapability - categoryBenchmarks.employeeCapability,
    culture: categoryScores.culture - categoryBenchmarks.culture,
    implementation: categoryScores.implementation - categoryBenchmarks.implementation
  };
  
  // 전체 점수 계산
  const overallScore = Object.values(categoryScores).reduce((a, b) => a + b, 0) / 5;
  const overallBenchmark = Object.values(categoryBenchmarks).reduce((a, b) => a + b, 0) / 5;
  const overallGap = overallScore - overallBenchmark;
  
  // 성숙도 수준
  const maturityLevel = getMaturityLevel(overallScore);
  
  // 강점과 약점 분석
  const { strengths, weaknesses } = analyzeStrengthsWeaknesses(gaps);
  
  // 개선 권고사항 생성
  const recommendations = generateRecommendations(categoryGaps, weaknesses);
  
  return {
    currentScores: scores,
    benchmarkScores,
    gaps,
    categoryScores,
    categoryBenchmarks,
    categoryGaps,
    overallScore,
    overallBenchmark,
    overallGap,
    maturityLevel,
    strengths,
    weaknesses,
    recommendations
  };
}

// 개선 권고사항 생성
function generateRecommendations(categoryGaps: AICapabilityCategoryScores, weaknesses: string[]): string[] {
  const recommendations: string[] = [];
  
  // 영역별 권고사항
  if (categoryGaps.leadership < -0.5) {
    recommendations.push('경영진의 AI 비전 수립과 전사적 AI 전략 로드맵 구축이 필요합니다.');
    recommendations.push('AI 투자 예산 확보와 중장기 투자 계획 수립을 권장합니다.');
  }
  
  if (categoryGaps.infrastructure < -0.5) {
    recommendations.push('IT 인프라 현대화와 클라우드 기반 시스템 도입을 검토하세요.');
    recommendations.push('데이터 거버넌스 체계 구축과 데이터 품질 관리를 강화하세요.');
  }
  
  if (categoryGaps.employeeCapability < -0.5) {
    recommendations.push('전 직원 대상 AI 리터러시 교육 프로그램을 운영하세요.');
    recommendations.push('AI 도구 활용 실습 교육과 멘토링 제도를 도입하세요.');
  }
  
  if (categoryGaps.culture < -0.5) {
    recommendations.push('혁신 문화 조성을 위한 제도적 지원과 인센티브를 마련하세요.');
    recommendations.push('실패를 용인하고 실험을 장려하는 조직 문화를 구축하세요.');
  }
  
  if (categoryGaps.implementation < -0.5) {
    recommendations.push('업무 프로세스 자동화 우선순위를 정하고 단계적으로 도입하세요.');
    recommendations.push('AI 기반 의사결정 지원 시스템 구축을 검토하세요.');
  }
  
  // 약점 기반 권고사항
  if (weaknesses.length > 3) {
    recommendations.push('AI 성숙도 종합 진단을 통해 맞춤형 AI 전환 로드맵을 수립하세요.');
  }
  
  return recommendations;
}

// SWOT 분석과 AI 역량 연계
export function integrateAICapabilityWithSWOT(
  gapAnalysis: GAPAnalysisResult,
  existingSWOT?: any
): any {
  const aiStrengths = gapAnalysis.strengths.map(s => `AI 역량: ${s}`);
  const aiWeaknesses = gapAnalysis.weaknesses.map(w => `AI 역량 부족: ${w}`);
  
  const aiOpportunities = [
    gapAnalysis.overallGap > 0 ? 'AI 선도 기업으로의 포지셔닝 기회' : null,
    gapAnalysis.categoryScores.infrastructure > 3.5 ? 'AI 솔루션 빠른 도입 가능' : null,
    gapAnalysis.categoryScores.employeeCapability > 3.5 ? 'AI 활용 혁신 프로젝트 추진 가능' : null
  ].filter(Boolean);
  
  const aiThreats = [
    gapAnalysis.overallGap < -1 ? '경쟁사 대비 AI 경쟁력 격차 심화' : null,
    gapAnalysis.categoryScores.leadership < 2.5 ? 'AI 전환 리더십 부재로 인한 혁신 지체' : null,
    gapAnalysis.categoryScores.culture < 2.5 ? '조직 저항으로 인한 AI 도입 실패 위험' : null
  ].filter(Boolean);
  
  // 기존 SWOT와 통합 (있는 경우)
  if (existingSWOT) {
    return {
      strengths: [...(existingSWOT.strengths || []), ...aiStrengths],
      weaknesses: [...(existingSWOT.weaknesses || []), ...aiWeaknesses],
      opportunities: [...(existingSWOT.opportunities || []), ...aiOpportunities],
      threats: [...(existingSWOT.threats || []), ...aiThreats]
    };
  }
  
  return {
    strengths: aiStrengths,
    weaknesses: aiWeaknesses,
    opportunities: aiOpportunities,
    threats: aiThreats
  };
}

// AI 고몰입 조직 구축 전략 생성
export function generateHighEngagementStrategy(gapAnalysis: GAPAnalysisResult): string[] {
  const strategies: string[] = [];
  
  // 성숙도 수준별 전략
  if (gapAnalysis.maturityLevel === '미성숙 (Immature)' || gapAnalysis.maturityLevel === '초기단계 (Initial)') {
    strategies.push('AI 기초 교육과 인식 개선 프로그램부터 시작하세요.');
    strategies.push('소규모 파일럿 프로젝트로 빠른 성과를 창출하여 조직의 신뢰를 구축하세요.');
    strategies.push('AI 챔피언을 선발하여 변화를 주도하게 하세요.');
  } else if (gapAnalysis.maturityLevel === '발전단계 (Developing)') {
    strategies.push('AI CoE(Center of Excellence) 구축으로 전사적 AI 역량을 체계화하세요.');
    strategies.push('부서별 AI 활용 사례를 공유하고 베스트 프랙티스를 확산시키세요.');
    strategies.push('AI 활용 성과에 대한 인센티브 제도를 도입하세요.');
  } else {
    strategies.push('AI 기반 혁신 문화를 내재화하고 지속적인 학습 생태계를 구축하세요.');
    strategies.push('AI 윤리 가이드라인을 수립하고 책임감 있는 AI 활용을 추진하세요.');
    strategies.push('외부 파트너십과 오픈 이노베이션으로 AI 역량을 확장하세요.');
  }
  
  // 영역별 고몰입 전략
  if (gapAnalysis.categoryGaps.leadership < 0) {
    strategies.push('경영진 AI 리더십 워크숍을 정기적으로 개최하세요.');
    strategies.push('AI 전담 임원(CAI: Chief AI Officer) 임명을 검토하세요.');
  }
  
  if (gapAnalysis.categoryGaps.employeeCapability < 0) {
    strategies.push('AI 역량 인증 제도와 경력 개발 경로를 제시하세요.');
    strategies.push('AI 학습 동아리와 해커톤을 통해 자발적 학습을 유도하세요.');
  }
  
  if (gapAnalysis.categoryGaps.culture < 0) {
    strategies.push('AI 활용 아이디어 제안 제도와 혁신 펀드를 운영하세요.');
    strategies.push('실패 사례 공유회를 통해 학습하는 문화를 조성하세요.');
  }
  
  return strategies;
}