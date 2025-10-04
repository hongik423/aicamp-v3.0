/**
 * AI CAMP 프로그램 매칭 시스템
 * 진단 결과 기반 맞춤형 교육과정 추천
 */

import { EnhancedScoreResult, BenchmarkGapAnalysis, ThreeDimensionalMatrix } from './enhanced-score-engine';

// AI CAMP 프로그램 정의
export interface AICampProgram {
  id: string;
  name: string;
  category: 'basic' | 'intermediate' | 'advanced' | 'leadership' | 'specialized';
  targetAudience: string[];
  prerequisites: {
    minScore?: number;
    categories?: string[];
    industryFocus?: string[];
  };
  duration: string;
  format: 'online' | 'offline' | 'hybrid';
  outcomes: string[];
  roi: {
    timeframe: string;
    expectedReturn: string;
    metrics: string[];
  };
  pricing: {
    individual: number;
    corporate: number;
    volume?: number;
  };
  urgencyLevel: 'immediate' | 'short-term' | 'medium-term' | 'long-term';
}

// AI CAMP 프로그램 카탈로그
export const AI_CAMP_PROGRAMS: AICampProgram[] = [
  // 기초 과정
  {
    id: 'ai-basics-101',
    name: 'AI 기초 이해 과정',
    category: 'basic',
    targetAudience: ['임직원 전체', '비전문가', '초급자'],
    prerequisites: {
      minScore: 0,
      categories: ['currentAI']
    },
    duration: '2주 (16시간)',
    format: 'hybrid',
    outcomes: [
      'AI 기본 개념 이해',
      'AI 도구 기초 활용',
      'AI 트렌드 인식 향상'
    ],
    roi: {
      timeframe: '3개월',
      expectedReturn: '업무 효율성 15-25% 향상',
      metrics: ['작업 시간 단축', '업무 정확도 향상', '디지털 리터러시 증가']
    },
    pricing: {
      individual: 300000,
      corporate: 250000,
      volume: 200000
    },
    urgencyLevel: 'immediate'
  },
  
  {
    id: 'ai-tools-practical',
    name: 'AI 도구 실무 활용',
    category: 'intermediate',
    targetAudience: ['실무진', '팀장급', '프로젝트 매니저'],
    prerequisites: {
      minScore: 40,
      categories: ['currentAI', 'techInfrastructure']
    },
    duration: '4주 (32시간)',
    format: 'hybrid',
    outcomes: [
      'ChatGPT, Claude 등 생성형 AI 활용',
      '업무 자동화 구현',
      'AI 기반 의사결정 지원'
    ],
    roi: {
      timeframe: '2개월',
      expectedReturn: '업무 생산성 30-50% 향상',
      metrics: ['반복 업무 자동화율', '의사결정 속도', '창의적 업무 시간 증가']
    },
    pricing: {
      individual: 500000,
      corporate: 400000,
      volume: 350000
    },
    urgencyLevel: 'short-term'
  },

  // 경영진 과정
  {
    id: 'ai-leadership-strategy',
    name: '경영진 AI 리더십 & 전략',
    category: 'leadership',
    targetAudience: ['CEO', '임원진', '부서장'],
    prerequisites: {
      minScore: 50,
      categories: ['organizationReadiness', 'goalClarity']
    },
    duration: '3일 집중과정',
    format: 'offline',
    outcomes: [
      'AI 전략 수립 역량',
      '디지털 전환 리더십',
      'AI 투자 의사결정 프레임워크'
    ],
    roi: {
      timeframe: '6개월',
      expectedReturn: '전사 디지털 전환 가속화',
      metrics: ['AI 도입 속도', '조직 변화 관리', '경쟁력 향상']
    },
    pricing: {
      individual: 1500000,
      corporate: 1200000
    },
    urgencyLevel: 'immediate'
  },

  // 고급 과정
  {
    id: 'ai-advanced-analytics',
    name: 'AI 고급 분석 & 예측 모델링',
    category: 'advanced',
    targetAudience: ['데이터 분석가', 'IT 전문가', '연구개발팀'],
    prerequisites: {
      minScore: 70,
      categories: ['techInfrastructure', 'currentAI']
    },
    duration: '8주 (64시간)',
    format: 'hybrid',
    outcomes: [
      '머신러닝 모델 구축',
      '예측 분석 시스템 개발',
      'AI 기반 비즈니스 인텔리전스'
    ],
    roi: {
      timeframe: '4개월',
      expectedReturn: '데이터 기반 의사결정 정확도 40-60% 향상',
      metrics: ['예측 정확도', '분석 속도', '인사이트 품질']
    },
    pricing: {
      individual: 800000,
      corporate: 650000,
      volume: 550000
    },
    urgencyLevel: 'medium-term'
  },

  // 전문 과정
  {
    id: 'ai-automation-rpa',
    name: 'AI 기반 업무 자동화 (RPA)',
    category: 'specialized',
    targetAudience: ['프로세스 개선팀', 'IT 개발자', '업무 혁신 담당자'],
    prerequisites: {
      minScore: 60,
      categories: ['techInfrastructure', 'executionCapability']
    },
    duration: '6주 (48시간)',
    format: 'hybrid',
    outcomes: [
      'RPA 도구 활용 능력',
      '업무 프로세스 자동화 설계',
      'AI-RPA 통합 솔루션 구축'
    ],
    roi: {
      timeframe: '3개월',
      expectedReturn: '반복 업무 70-90% 자동화',
      metrics: ['자동화율', '오류 감소', '인력 재배치 효과']
    },
    pricing: {
      individual: 700000,
      corporate: 550000,
      volume: 450000
    },
    urgencyLevel: 'short-term'
  },

  {
    id: 'ai-transformation-consulting',
    name: 'AI 전사 전환 컨설팅',
    category: 'specialized',
    targetAudience: ['전략기획팀', '디지털전환팀', '혁신담당자'],
    prerequisites: {
      minScore: 40,
      categories: ['organizationReadiness', 'goalClarity']
    },
    duration: '12주 (96시간)',
    format: 'hybrid',
    outcomes: [
      'AI 전환 로드맵 수립',
      '조직 변화 관리',
      'AI 거버넌스 체계 구축'
    ],
    roi: {
      timeframe: '12개월',
      expectedReturn: '전사 생산성 20-40% 향상',
      metrics: ['디지털 성숙도', '혁신 지수', '경쟁력 지표']
    },
    pricing: {
      individual: 2000000,
      corporate: 1500000
    },
    urgencyLevel: 'long-term'
  }
];

// 프로그램 매칭 엔진
export class AICampProgramMatcher {
  
  /**
   * 진단 결과 기반 맞춤형 프로그램 추천
   */
  static recommendPrograms(
    scores: EnhancedScoreResult,
    gapAnalysis: BenchmarkGapAnalysis,
    priorityMatrix: ThreeDimensionalMatrix,
    formData: any
  ): {
    immediate: AICampProgram[];
    shortTerm: AICampProgram[];
    mediumTerm: AICampProgram[];
    longTerm: AICampProgram[];
    totalInvestment: number;
    expectedROI: string;
  } {
    console.log('🎯 AI CAMP 프로그램 매칭 시작...');
    
    const recommendations = {
      immediate: [] as AICampProgram[],
      shortTerm: [] as AICampProgram[],
      mediumTerm: [] as AICampProgram[],
      longTerm: [] as AICampProgram[]
    };
    
    // 1. 기본 역량 수준별 필수 과정 추천
    this.addBasicPrograms(scores, recommendations);
    
    // 2. 갭 분석 기반 우선순위 과정 추천
    this.addGapBasedPrograms(gapAnalysis, recommendations);
    
    // 3. 우선순위 매트릭스 기반 전략적 과정 추천
    this.addMatrixBasedPrograms(priorityMatrix, recommendations);
    
    // 4. 업종/규모별 특화 과정 추천
    this.addIndustrySpecificPrograms(formData, scores, recommendations);
    
    // 5. 투자 대비 효과 계산
    const totalInvestment = this.calculateTotalInvestment(recommendations, formData);
    const expectedROI = this.calculateExpectedROI(recommendations, scores);
    
    console.log('✅ AI CAMP 프로그램 매칭 완료');
    console.log(`📊 총 ${Object.values(recommendations).flat().length}개 프로그램 추천`);
    
    return {
      ...recommendations,
      totalInvestment,
      expectedROI
    };
  }
  
  /**
   * 기본 역량 수준별 필수 과정 추가
   */
  private static addBasicPrograms(
    scores: EnhancedScoreResult,
    recommendations: any
  ) {
    // AI 기초 역량이 낮은 경우
    if (scores.categoryScores.currentAI < 40) {
      recommendations.immediate.push(
        AI_CAMP_PROGRAMS.find(p => p.id === 'ai-basics-101')!
      );
    }
    
    // 조직 준비도는 높지만 AI 활용이 낮은 경우
    if (scores.categoryScores.organizationReadiness >= 60 && scores.categoryScores.currentAI < 60) {
      recommendations.shortTerm.push(
        AI_CAMP_PROGRAMS.find(p => p.id === 'ai-tools-practical')!
      );
    }
    
    // 경영진 리더십이 필요한 경우
    if (scores.categoryScores.organizationReadiness < 60 || scores.categoryScores.goalClarity < 50) {
      recommendations.immediate.push(
        AI_CAMP_PROGRAMS.find(p => p.id === 'ai-leadership-strategy')!
      );
    }
    
    // 고급 역량 개발이 가능한 경우
    if (scores.totalScore >= 70) {
      recommendations.mediumTerm.push(
        AI_CAMP_PROGRAMS.find(p => p.id === 'ai-advanced-analytics')!
      );
    }
  }
  
  /**
   * 갭 분석 기반 우선순위 과정 추가
   */
  private static addGapBasedPrograms(
    gapAnalysis: BenchmarkGapAnalysis,
    recommendations: any
  ) {
    // 업종 평균 대비 크게 뒤처진 경우
    if (gapAnalysis.competitivePosition === 'Lagging') {
      recommendations.immediate.push(
        AI_CAMP_PROGRAMS.find(p => p.id === 'ai-transformation-consulting')!
      );
    }
    
    // 우선순위 개선 영역에 따른 추천
    (gapAnalysis as any).priorityAreas?.forEach((area: string) => {
      if (area.includes('자동화') || area.includes('프로세스')) {
        recommendations.shortTerm.push(
          AI_CAMP_PROGRAMS.find(p => p.id === 'ai-automation-rpa')!
        );
      }
    });
  }
  
  /**
   * 우선순위 매트릭스 기반 전략적 과정 추가
   */
  private static addMatrixBasedPrograms(
    priorityMatrix: ThreeDimensionalMatrix,
    recommendations: any
  ) {
    // 즉시 실행 항목이 많은 경우
    if ((priorityMatrix as any).quadrants?.doFirst?.items?.length > 3) {
      // 실행 역량 강화 과정 추천
      recommendations.immediate.push(
        AI_CAMP_PROGRAMS.find(p => p.id === 'ai-tools-practical')!
      );
    }
    
    // 계획 수립 항목이 많은 경우
    if ((priorityMatrix as any).quadrants?.schedule?.items?.length > 2) {
      // 전략 수립 역량 강화
      recommendations.shortTerm.push(
        AI_CAMP_PROGRAMS.find(p => p.id === 'ai-leadership-strategy')!
      );
    }
  }
  
  /**
   * 업종/규모별 특화 과정 추가
   */
  private static addIndustrySpecificPrograms(
    formData: any,
    scores: EnhancedScoreResult,
    recommendations: any
  ) {
    const industry = formData.industry || '';
    const employeeCount = formData.employeeCount || '';
    
    // IT/소프트웨어 업종 특화
    if (industry.includes('IT') || industry.includes('소프트웨어')) {
      if (scores.categoryScores.techInfra >= 70) {
        recommendations.mediumTerm.push(
          AI_CAMP_PROGRAMS.find(p => p.id === 'ai-advanced-analytics')!
        );
      }
    }
    
    // 제조업 특화
    if (industry.includes('제조')) {
      recommendations.shortTerm.push(
        AI_CAMP_PROGRAMS.find(p => p.id === 'ai-automation-rpa')!
      );
    }
    
    // 소규모 기업 특화
    if (employeeCount.includes('10명 미만') || employeeCount.includes('10-30명')) {
      // 비용 효율적인 기초 과정 우선
      recommendations.immediate = recommendations.immediate.filter(
        (p: AICampProgram) => p.category === 'basic' || p.pricing.individual <= 500000
      );
    }
  }
  
  /**
   * 총 투자 비용 계산
   */
  private static calculateTotalInvestment(
    recommendations: any,
    formData: any
  ): number {
    const employeeCount = this.parseEmployeeCount(formData.employeeCount || '');
    let total = 0;
    
    Object.values(recommendations).flat().forEach((program: any) => {
      if (employeeCount >= 50) {
        total += program.pricing.volume || program.pricing.corporate;
      } else if (employeeCount >= 10) {
        total += program.pricing.corporate;
      } else {
        total += program.pricing.individual;
      }
    });
    
    return total;
  }
  
  /**
   * 예상 ROI 계산
   */
  private static calculateExpectedROI(
    recommendations: any,
    scores: EnhancedScoreResult
  ): string {
    const totalPrograms = Object.values(recommendations).flat().length;
    
    if (totalPrograms >= 4) {
      return '12개월 내 투자 대비 300-500% 수익 예상';
    } else if (totalPrograms >= 2) {
      return '6개월 내 투자 대비 200-300% 수익 예상';
    } else {
      return '3개월 내 투자 대비 150-250% 수익 예상';
    }
  }
  
  /**
   * 직원 수 파싱
   */
  private static parseEmployeeCount(employeeCountStr: string): number {
    if (employeeCountStr.includes('100명 이상')) return 100;
    if (employeeCountStr.includes('50-100명')) return 75;
    if (employeeCountStr.includes('31-50명')) return 40;
    if (employeeCountStr.includes('10-30명')) return 20;
    return 5;
  }
  
  /**
   * 프로그램별 상세 정보 조회
   */
  static getProgramDetails(programId: string): AICampProgram | null {
    return AI_CAMP_PROGRAMS.find(p => p.id === programId) || null;
  }
  
  /**
   * 카테고리별 프로그램 목록 조회
   */
  static getProgramsByCategory(category: string): AICampProgram[] {
    return AI_CAMP_PROGRAMS.filter(p => p.category === category);
  }
}

// 프로그램 매칭 결과 인터페이스
export interface ProgramRecommendationResult {
  immediate: AICampProgram[];
  shortTerm: AICampProgram[];
  mediumTerm: AICampProgram[];
  longTerm: AICampProgram[];
  totalInvestment: number;
  expectedROI: string;
  customizedRoadmap: {
    phase1: {
      programs: string[];
      duration: string;
      investment: number;
      expectedOutcome: string;
    };
    phase2: {
      programs: string[];
      duration: string;
      investment: number;
      expectedOutcome: string;
    };
    phase3: {
      programs: string[];
      duration: string;
      investment: number;
      expectedOutcome: string;
    };
  };
}
