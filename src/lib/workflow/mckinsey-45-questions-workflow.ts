/**
 * 🎯 45개 행동지표 기반 이교장 컨설팅 보고서 생성 통합 워크플로우
 * 완전 자동화된 이교장 수준의 컨설팅 보고서 생성 시스템
 */

import { REAL_45_QUESTIONS, RealQuestion } from '@/features/ai-diagnosis/constants/real-45-questions';
import { getQuestionBehaviorIndicators } from '@/features/ai-diagnosis/constants/question-specific-behavior-indicators';

export interface LeeKyoJang45QuestionsRequest {
  // 기본 정보
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  contactPosition?: string;
  
  // 회사 정보
  businessRegistration?: string;
  industry: string;
  employeeCount: string;
  annualRevenue?: string;
  establishmentYear?: string;
  
  // 사업 내용
  businessContent?: string;
  mainProducts?: string;
  targetCustomers?: string;
  currentChallenges?: string;
  
  // 45개 질문 응답 (1-5점 척도)
  responses: Record<string, number>;
}

export interface LeeKyoJang45QuestionsResult {
  // 진단 결과
  diagnosisId: string;
  timestamp: string;
  companyInfo: {
    name: string;
    industry: string;
    size: string;
    contact: {
      name: string;
      email: string;
      phone?: string;
      position?: string;
    };
  };
  
  // 점수 분석
  scoreAnalysis: {
    totalScore: number;
    averageScore: number;
    // 0~100 퍼센트 점수 (총점/최대점수)
    percentage?: number;
    categoryScores: {
      businessFoundation: number;
      currentAI: number;
      organizationReadiness: number;
      techInfrastructure: number;
      goalClarity: number;
      executionCapability: number;
    };
    weightedScore: number;
    percentile: number;
    grade: string;
    maturityLevel: string;
  };
  
  // 상세 분석
  detailedAnalysis: {
    strengths: Array<{
      category: string;
      score: number;
      description: string;
      actionItems: string[];
    }>;
    weaknesses: Array<{
      category: string;
      score: number;
      description: string;
      actionItems: string[];
    }>;
    opportunities: string[];
    threats: string[];
  };
  
  // 권고사항
  recommendations: {
    immediate: Array<{
      priority: number;
      title: string;
      description: string;
      timeline: string;
      resources: string[];
      expectedOutcome: string;
    }>;
    shortTerm: Array<{
      priority: number;
      title: string;
      description: string;
      timeline: string;
      resources: string[];
      expectedOutcome: string;
    }>;
    longTerm: Array<{
      priority: number;
      title: string;
      description: string;
      timeline: string;
      resources: string[];
      expectedOutcome: string;
    }>;
  };
  
  // 실행 로드맵
  roadmap: {
    phase1: {
      title: string;
      duration: string;
      objectives: string[];
      keyActivities: string[];
      milestones: string[];
      budget: string;
    };
    phase2: {
      title: string;
      duration: string;
      objectives: string[];
      keyActivities: string[];
      milestones: string[];
      budget: string;
    };
    phase3: {
      title: string;
      duration: string;
      objectives: string[];
      keyActivities: string[];
      milestones: string[];
      budget: string;
    };
  };
  
  // 품질 메트릭
  qualityMetrics: {
    dataCompleteness: number;
    responseConsistency: number;
    analysisDepth: number;
    recommendationRelevance: number;
    overallQuality: number;
  };
  
  // 응답 데이터
  responses: Record<string, number>;
}

/**
 * 45개 질문 응답 분석
 */
export function analyze45QuestionsResponses(responses: Record<string, number>) {
  // 1) 원시 응답값 배열 구성 (q1~q45, '1'~'45' 키 지원)
  const answerValues: number[] = REAL_45_QUESTIONS.map(q => {
    const v = (responses[`q${q.id}`] ?? responses[q.id.toString()] ?? 0) as number;
    const n = Number(v);
    return Number.isFinite(n) ? Math.max(0, Math.min(5, n)) : 0;
  });

  const numQuestions = answerValues.length;
  const maxPossibleScore = numQuestions * 5; // 45 * 5 = 225
  const totalScore = answerValues.reduce((sum, n) => sum + n, 0); // 0~225
  const averageScore = totalScore / (numQuestions || 1); // 0~5
  const percentage = Math.round((totalScore / (maxPossibleScore || 1)) * 100); // 0~100

  // 2) 카테고리별 점수(0~100) 계산은 유지
  const categoryScoresRaw: Record<string, { sum: number; count: number; weight: number }> = {};
  REAL_45_QUESTIONS.forEach(q => {
    const category = q.category;
    if (!categoryScoresRaw[category]) {
      categoryScoresRaw[category] = { sum: 0, count: 0, weight: q.weight };
    }
    const v = (responses[`q${q.id}`] ?? responses[q.id.toString()] ?? 0) as number;
    const n = Number.isFinite(Number(v)) ? Math.max(0, Math.min(5, Number(v))) : 0;
    categoryScoresRaw[category].sum += n;
    categoryScoresRaw[category].count += 1;
  });

  const categoryScores: Record<string, number> = {};
  Object.keys(categoryScoresRaw).forEach(category => {
    const { sum, count } = categoryScoresRaw[category];
    const avg = count ? sum / count : 0; // 0~5
    categoryScores[category] = Math.round(avg * 20); // 0~100 스케일
  });

  // 3) 가중 평균 점수(0~100) 산출 유지
  let weightedSum = 0;
  let totalWeight = 0;
  Object.keys(categoryScoresRaw).forEach(category => {
    const weight = categoryScoresRaw[category].weight;
    weightedSum += (categoryScores[category] || 0) * weight;
    totalWeight += weight;
  });
  const weightedScore = totalWeight ? Math.round(weightedSum / totalWeight) : 0;

  return {
    totalScore, // 0~225
    averageScore: Math.round(averageScore * 100) / 100, // 소수 2자리 고정
    percentage, // 0~100
    weightedScore, // 0~100
    categoryScores: {
      businessFoundation: categoryScores.businessFoundation || 0,
      currentAI: categoryScores.currentAI || 0,
      organizationReadiness: categoryScores.organizationReadiness || 0,
      techInfrastructure: categoryScores.techInfrastructure || 0,
      goalClarity: categoryScores.goalClarity || 0,
      executionCapability: categoryScores.executionCapability || 0
    }
  };
}

/**
 * 성숙도 레벨 결정
 */
export function determineMaturityLevel(totalScore: number): string {
  if (totalScore >= 90) return 'Optimized (최적화)';
  if (totalScore >= 80) return 'Advanced (고도화)';
  if (totalScore >= 70) return 'Intermediate (중급)';
  if (totalScore >= 60) return 'Basic (기초)';
  return 'Initial (초기)';
}

/**
 * 등급 결정
 */
export function determineGrade(totalScore: number): string {
  if (totalScore >= 95) return 'A+';
  if (totalScore >= 90) return 'A';
  if (totalScore >= 85) return 'A-';
  if (totalScore >= 80) return 'B+';
  if (totalScore >= 75) return 'B';
  if (totalScore >= 70) return 'B-';
  if (totalScore >= 65) return 'C+';
  if (totalScore >= 60) return 'C';
  if (totalScore >= 55) return 'C-';
  if (totalScore >= 50) return 'D+';
  if (totalScore >= 45) return 'D';
  return 'F';
}

/**
 * 백분위 계산 (업종별)
 */
export function calculatePercentile(totalScore: number, industry: string): number {
  // 업종별 기준 점수 (실제 데이터 기반으로 조정 필요)
  const industryBenchmarks: Record<string, number> = {
    'IT/소프트웨어': 75,
    '금융업': 70,
    '제조업': 65,
    '서비스업': 60,
    '유통업': 58,
    '건설업': 55,
    '교육업': 62,
    '의료업': 68,
    '운송업': 52,
    '농업': 45
  };
  
  const benchmark = industryBenchmarks[industry] || 60;
  
  // 정규분포를 가정한 백분위 계산
  const standardDeviation = 15;
  const zScore = (totalScore - benchmark) / standardDeviation;
  
  // 누적분포함수를 사용한 백분위 계산
  return Math.round(normalCDF(zScore) * 100);
}

function normalCDF(z: number): number {
  return 0.5 * (1 + erf(z / Math.sqrt(2)));
}

function erf(x: number): number {
  // Abramowitz and Stegun approximation
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;

  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
}

/**
 * 강점/약점 분석
 */
export function analyzeStrengthsWeaknesses(
  categoryScores: Record<string, number>,
  responses: Record<string, number>
): {
  strengths: Array<{ category: string; score: number; description: string; actionItems: string[] }>;
  weaknesses: Array<{ category: string; score: number; description: string; actionItems: string[] }>;
} {
  const strengths: Array<{ category: string; score: number; description: string; actionItems: string[] }> = [];
  const weaknesses: Array<{ category: string; score: number; description: string; actionItems: string[] }> = [];
  
  // 카테고리별 분석
  Object.entries(categoryScores).forEach(([category, score]) => {
    const categoryQuestions = REAL_45_QUESTIONS.filter(q => q.category === category);
    
    if (score >= 75) {
      // 강점으로 분류
      const topQuestion = categoryQuestions.find(q => {
        const response = responses[`q${q.id}`] || responses[q.id.toString()] || 0;
        return response >= 4;
      });
      
      if (topQuestion) {
        const indicators = getQuestionBehaviorIndicators(topQuestion.id);
        const indicator = indicators.find(ind => ind.score === 4 || ind.score === 5) || indicators[0];
        
        strengths.push({
          category: topQuestion.sectionTitle,
          score,
          description: indicator.description,
          actionItems: indicator.actionItems
        });
      }
    } else if (score <= 60) {
      // 약점으로 분류
      const weakQuestion = categoryQuestions.find(q => {
        const response = responses[`q${q.id}`] || responses[q.id.toString()] || 0;
        return response <= 2;
      });
      
      if (weakQuestion) {
        const indicators = getQuestionBehaviorIndicators(weakQuestion.id);
        const indicator = indicators.find(ind => ind.score === 1 || ind.score === 2) || indicators[0];
        
        weaknesses.push({
          category: weakQuestion.sectionTitle,
          score,
          description: indicator.description,
          actionItems: indicator.actionItems
        });
      }
    }
  });
  
  return { strengths, weaknesses };
}

/**
 * 맥킨지 스타일 권고사항 생성
 */
export function generateLeeKyoJangRecommendations(
  scoreAnalysis: any,
  industry: string,
  companySize: string
): {
  immediate: Array<any>;
  shortTerm: Array<any>;
  longTerm: Array<any>;
} {
  const recommendations = {
    immediate: [] as Array<any>,
    shortTerm: [] as Array<any>,
    longTerm: [] as Array<any>
  };
  
  // 점수 기반 우선순위 권고사항
  const { categoryScores } = scoreAnalysis;
  
  // 즉시 실행 (1-3개월)
  if (categoryScores.currentAI < 60) {
    recommendations.immediate.push({
      priority: 1,
      title: 'AI 도구 도입 및 활용 체계 구축',
      description: 'ChatGPT, Claude 등 생성형 AI 도구를 활용한 업무 효율성 개선',
      timeline: '1-2개월',
      resources: ['AI 도구 라이선스', 'AI 활용 가이드라인', '직원 교육'],
      expectedOutcome: '업무 효율성 30% 향상, 반복 업무 50% 감소'
    });
  }
  
  if (categoryScores.organizationReadiness < 65) {
    recommendations.immediate.push({
      priority: 2,
      title: '조직 변화 관리 체계 수립',
      description: 'AI 도입을 위한 조직 문화 개선 및 변화 관리 프로세스 구축',
      timeline: '2-3개월',
      resources: ['변화 관리 전문가', '리더십 교육', '커뮤니케이션 플랫폼'],
      expectedOutcome: '직원 수용도 40% 향상, 변화 저항 60% 감소'
    });
  }
  
  // 단기 실행 (3-6개월)
  if (categoryScores.techInfrastructure < 70) {
    recommendations.shortTerm.push({
      priority: 1,
      title: '데이터 인프라 및 시스템 통합',
      description: '클라우드 기반 데이터 플랫폼 구축 및 시스템 간 연동 강화',
      timeline: '3-4개월',
      resources: ['클라우드 플랫폼', 'API 개발', '데이터 엔지니어'],
      expectedOutcome: '데이터 접근성 70% 향상, 시스템 효율성 50% 개선'
    });
  }
  
  if (categoryScores.goalClarity < 65) {
    recommendations.shortTerm.push({
      priority: 2,
      title: 'AI 전략 및 로드맵 수립',
      description: 'SMART 목표 기반 AI 도입 전략 및 단계별 실행 계획 수립',
      timeline: '4-6개월',
      resources: ['전략 컨설팅', 'AI 전문가', '프로젝트 매니저'],
      expectedOutcome: '목표 달성률 60% 향상, ROI 측정 체계 확립'
    });
  }
  
  // 장기 실행 (6-12개월)
  if (categoryScores.executionCapability < 75) {
    recommendations.longTerm.push({
      priority: 1,
      title: 'AI 센터 오브 엑셀런스 구축',
      description: 'AI 전문 조직 신설 및 고도화된 AI 솔루션 개발',
      timeline: '6-12개월',
      resources: ['AI 전문 인력', 'R&D 예산', '혁신 랩'],
      expectedOutcome: 'AI 성숙도 80% 달성, 업계 리더십 확보'
    });
  }
  
  recommendations.longTerm.push({
    priority: 2,
    title: 'AI 기반 비즈니스 모델 혁신',
    description: 'AI를 활용한 새로운 수익 모델 개발 및 시장 확장',
    timeline: '9-12개월',
    resources: ['혁신 팀', '시장 조사', '파트너십'],
    expectedOutcome: '신규 수익원 창출, 시장 경쟁력 강화'
  });
  
  return recommendations;
}

/**
 * 3단계 실행 로드맵 생성
 */
export function generate3PhaseRoadmap(
  scoreAnalysis: any,
  recommendations: any,
  companyInfo: any
): any {
  const roadmap = {
    phase1: {
      title: 'AI 기반 구축 단계',
      duration: '1-3개월',
      objectives: [
        'AI 도구 도입 및 기본 활용',
        '조직 변화 관리 체계 수립',
        '데이터 기초 인프라 구축'
      ],
      keyActivities: [
        'ChatGPT/Claude 등 생성형 AI 도구 도입',
        'AI 활용 가이드라인 및 정책 수립',
        '직원 대상 AI 기초 교육 실시',
        '데이터 현황 분석 및 정리'
      ],
      milestones: [
        '전 직원 AI 도구 활용 시작',
        'AI 정책 문서 완성',
        '기초 교육 100% 완료',
        '데이터 인벤토리 완성'
      ],
      budget: '3,000만원 - 5,000만원'
    },
    phase2: {
      title: 'AI 활용 확산 단계',
      duration: '3-6개월',
      objectives: [
        '업무 프로세스 AI 통합',
        '데이터 기반 의사결정 체계 구축',
        'AI 성과 측정 시스템 도입'
      ],
      keyActivities: [
        '부서별 맞춤형 AI 솔루션 도입',
        '워크플로우 자동화 구현',
        'BI/분석 도구 활용 확대',
        'AI 성과 KPI 설정 및 모니터링'
      ],
      milestones: [
        '핵심 업무 50% AI 활용',
        '자동화 프로세스 10개 이상 구축',
        '데이터 기반 의사결정 70% 달성',
        'AI ROI 측정 체계 완성'
      ],
      budget: '5,000만원 - 1억원'
    },
    phase3: {
      title: 'AI 전문 조직 단계',
      duration: '6-12개월',
      objectives: [
        'AI 센터 오브 엑셀런스 구축',
        '고도화된 AI 솔루션 개발',
        'AI 기반 비즈니스 모델 혁신'
      ],
      keyActivities: [
        'AI 전담 조직 신설',
        '맞춤형 AI 솔루션 개발',
        'AI 기반 신규 서비스 출시',
        '업계 AI 리더십 확보'
      ],
      milestones: [
        'AI 전담팀 구성 완료',
        '자체 AI 솔루션 3개 이상 개발',
        '신규 AI 서비스 출시',
        '업계 AI 성숙도 상위 10% 달성'
      ],
      budget: '1억원 - 3억원'
    }
  };
  
  return roadmap;
}

/**
 * 품질 메트릭 계산
 */
export function calculateQualityMetrics(
  responses: Record<string, number>,
  analysis: any
): {
  dataCompleteness: number;
  responseConsistency: number;
  analysisDepth: number;
  recommendationRelevance: number;
  overallQuality: number;
} {
  // 데이터 완성도
  const totalQuestions = 45;
  const answeredQuestions = Object.keys(responses).length;
  const dataCompleteness = Math.round((answeredQuestions / totalQuestions) * 100);
  
  // 응답 일관성 (같은 카테고리 내 응답의 표준편차 기반)
  const categoryResponses: Record<string, number[]> = {};
  REAL_45_QUESTIONS.forEach(q => {
    const response = responses[`q${q.id}`] || responses[q.id.toString()] || 0;
    if (!categoryResponses[q.category]) {
      categoryResponses[q.category] = [];
    }
    categoryResponses[q.category].push(response);
  });
  
  let consistencySum = 0;
  Object.values(categoryResponses).forEach(categoryScores => {
    const mean = categoryScores.reduce((sum, score) => sum + score, 0) / categoryScores.length;
    const variance = categoryScores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / categoryScores.length;
    const consistency = Math.max(0, 100 - (Math.sqrt(variance) * 25)); // 표준편차가 클수록 일관성 낮음
    consistencySum += consistency;
  });
  const responseConsistency = Math.round(consistencySum / Object.keys(categoryResponses).length);
  
  // 분석 깊이 (생성된 권고사항 수 기반)
  const totalRecommendations = (analysis.recommendations?.immediate?.length || 0) +
                              (analysis.recommendations?.shortTerm?.length || 0) +
                              (analysis.recommendations?.longTerm?.length || 0);
  const analysisDepth = Math.min(100, Math.round((totalRecommendations / 6) * 100)); // 최대 6개 권고사항 기준
  
  // 권고사항 관련성 (점수와 권고사항의 연관성)
  const avgScore = analysis.scoreAnalysis?.averageScore || 0;
  const recommendationRelevance = avgScore < 60 ? 90 : avgScore > 80 ? 95 : 85;
  
  // 전체 품질
  const overallQuality = Math.round(
    (dataCompleteness * 0.3 + 
     responseConsistency * 0.25 + 
     analysisDepth * 0.25 + 
     recommendationRelevance * 0.2)
  );
  
  return {
    dataCompleteness,
    responseConsistency,
    analysisDepth,
    recommendationRelevance,
    overallQuality
  };
}

/**
 * 메인 워크플로우 실행 함수
 */
export function executeLeeKyoJang45QuestionsWorkflow(
  request: LeeKyoJang45QuestionsRequest
): LeeKyoJang45QuestionsResult {
  console.log('🎯 45개 행동지표 기반 이교장 워크플로우 시작:', request.companyName);
  
  // 1. 점수 분석 (총점은 0~225, 등급/성숙도/백분위는 percentage(0~100) 기준)
  const scoreAnalysis = analyze45QuestionsResponses(request.responses);
  const percentageForGrading = (scoreAnalysis as any).percentage ?? Math.round((scoreAnalysis.totalScore / (45 * 5)) * 100);
  const maturityLevel = determineMaturityLevel(percentageForGrading);
  const grade = determineGrade(percentageForGrading);
  const percentile = calculatePercentile(percentageForGrading, request.industry);
  
  // 2. 강점/약점 분석
  const { strengths, weaknesses } = analyzeStrengthsWeaknesses(scoreAnalysis.categoryScores, request.responses);
  
  // 3. 맥킨지 스타일 권고사항 생성
  const recommendations = generateLeeKyoJangRecommendations(
    { ...scoreAnalysis, totalScore: scoreAnalysis.totalScore },
    request.industry,
    request.employeeCount
  );
  
  // 4. 3단계 실행 로드맵 생성
  const roadmap = generate3PhaseRoadmap(scoreAnalysis, recommendations, {
    name: request.companyName,
    industry: request.industry,
    size: request.employeeCount
  });
  
  // 5. 품질 메트릭 계산
  const qualityMetrics = calculateQualityMetrics(request.responses, {
    scoreAnalysis,
    recommendations
  });
  
  // 6. 최종 결과 구성
  const diagnosisId = `DIAG_45Q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const result: LeeKyoJang45QuestionsResult = {
    diagnosisId,
    companyInfo: {
      name: request.companyName,
      industry: request.industry,
      size: request.employeeCount,
      contact: {
        name: request.contactName,
        email: request.contactEmail,
        phone: request.contactPhone || ''
      }
    },
    responses: request.responses,
    scoreAnalysis: {
      ...scoreAnalysis,
      grade,
      maturityLevel,
      percentile
    },
    timestamp: new Date().toISOString(),
    detailedAnalysis: {
      strengths,
      weaknesses,
      opportunities: [
        'AI 기반 업무 자동화로 생산성 향상',
        '데이터 기반 의사결정 체계 구축',
        '고객 경험 개선을 통한 경쟁우위 확보',
        'AI 기술을 활용한 신규 비즈니스 모델 개발'
      ],
      threats: [
        '경쟁사의 빠른 AI 도입',
        'AI 인재 확보의 어려움',
        '기술 변화 속도에 따른 적응 지연',
        '데이터 보안 및 개인정보보호 리스크'
      ]
    },
    recommendations,
    roadmap,
    qualityMetrics
  };
  
  console.log('✅ 45개 행동지표 이교장 워크플로우 완료:', {
    diagnosisId: result.diagnosisId,
    totalScore: result.scoreAnalysis.totalScore,
    grade: result.scoreAnalysis.grade,
    quality: result.qualityMetrics.overallQuality
  });
  
  return result;
}