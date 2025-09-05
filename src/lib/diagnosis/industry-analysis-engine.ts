/**
 * 🏭 V3.0 Industry Analysis Engine
 * 10개 업종별 특화 분석 엔진
 */

import { IndustryType } from './enhanced-data-structures';

export interface IndustryInsight {
  characteristics: string[];
  n8nOpportunities: string[];
  benchmarks: {
    average: number;
    top10: number;
    growth: string;
  };
  aiFocus: number;
  practicalFocus: number;
  successStories: Array<{
    company: string;
    description: string;
  }>;
}

export class IndustryAnalysisEngine {
  
  private static readonly INDUSTRY_INSIGHTS: Record<IndustryType, IndustryInsight> = {
    [IndustryType.IT_SOFTWARE]: {
      characteristics: [
        '빠른 기술 변화 대응 필요',
        '개발 프로세스 자동화 중요',
        '데이터 기반 의사결정 문화',
        '애자일/DevOps 방법론 적용'
      ],
      n8nOpportunities: [
        'CI/CD 파이프라인 자동화',
        '코드 리뷰 및 테스트 자동화',
        '고객 피드백 실시간 수집',
        'API 모니터링 및 알림'
      ],
      benchmarks: { average: 75, top10: 90, growth: '+15% YoY' },
      aiFocus: 0.7,
      practicalFocus: 0.3,
      successStories: [
        { company: '네이버', description: '하이퍼클로바X 개발로 AI 플랫폼 리더십 확보' },
        { company: '카카오', description: 'AI 기반 추천 시스템으로 사용자 체류 시간 40% 증가' }
      ]
    },
    [IndustryType.MANUFACTURING]: {
      characteristics: [
        '스마트 팩토리 구축 추진',
        'IoT 센서 데이터 활용',
        '예측 정비 시스템 도입',
        '품질 관리 자동화'
      ],
      n8nOpportunities: [
        '생산 라인 모니터링 자동화',
        '품질 검사 데이터 수집',
        '공급망 관리 자동화',
        '설비 상태 알림 시스템'
      ],
      benchmarks: { average: 65, top10: 85, growth: '+12% YoY' },
      aiFocus: 0.6,
      practicalFocus: 0.4,
      successStories: [
        { company: '삼성전자', description: 'AI 기반 반도체 제조 공정 최적화로 수율 15% 향상' },
        { company: '현대자동차', description: '스마트 팩토리 구축으로 생산 효율성 20% 개선' }
      ]
    },
    [IndustryType.SERVICE]: {
      characteristics: [
        '고객 서비스 품질 향상',
        '업무 프로세스 표준화',
        '데이터 기반 서비스 개선',
        '고객 만족도 관리'
      ],
      n8nOpportunities: [
        '고객 문의 자동 분류',
        '서비스 품질 모니터링',
        '고객 피드백 수집 자동화',
        '예약 및 스케줄링 자동화'
      ],
      benchmarks: { average: 60, top10: 80, growth: '+10% YoY' },
      aiFocus: 0.5,
      practicalFocus: 0.5,
      successStories: [
        { company: '배달의민족', description: 'AI 기반 배달 최적화로 배달 시간 25% 단축' },
        { company: '토스', description: 'AI 금융 상담 서비스로 고객 만족도 30% 향상' }
      ]
    },
    [IndustryType.FINANCE]: {
      characteristics: [
        '리스크 관리 중요성',
        '규제 준수 필수',
        '고객 데이터 보안',
        '실시간 거래 처리'
      ],
      n8nOpportunities: [
        '사기 탐지 시스템 자동화',
        '신용 평가 프로세스 자동화',
        '규제 보고서 자동 생성',
        '고객 상담 챗봇 운영'
      ],
      benchmarks: { average: 70, top10: 88, growth: '+18% YoY' },
      aiFocus: 0.8,
      practicalFocus: 0.2,
      successStories: [
        { company: 'KB국민은행', description: 'AI 기반 대출 심사로 처리 시간 50% 단축' },
        { company: '신한은행', description: 'AI 투자 상담 서비스로 고객 자산 20% 증가' }
      ]
    },
    [IndustryType.CONSTRUCTION]: {
      characteristics: [
        '안전 관리 최우선',
        '프로젝트 일정 관리',
        '자재 관리 효율화',
        '현장 모니터링 강화'
      ],
      n8nOpportunities: [
        '현장 안전 모니터링 자동화',
        '자재 재고 관리 자동화',
        '프로젝트 진행 상황 추적',
        '안전 교육 관리 시스템'
      ],
      benchmarks: { average: 55, top10: 75, growth: '+8% YoY' },
      aiFocus: 0.4,
      practicalFocus: 0.6,
      successStories: [
        { company: '현대건설', description: 'AI 기반 안전 관리로 사고율 40% 감소' },
        { company: '삼성물산', description: '스마트 건설 기술로 공사 기간 15% 단축' }
      ]
    },
    [IndustryType.EDUCATION]: {
      characteristics: [
        '개인화 학습 중요',
        '온라인 교육 확산',
        '학습 데이터 분석',
        '교육 효과 측정'
      ],
      n8nOpportunities: [
        '학습 진도 자동 추적',
        '개인화 학습 콘텐츠 추천',
        '과제 채점 자동화',
        '학생 상담 관리 시스템'
      ],
      benchmarks: { average: 50, top10: 70, growth: '+20% YoY' },
      aiFocus: 0.6,
      practicalFocus: 0.4,
      successStories: [
        { company: '메가스터디', description: 'AI 기반 개인화 학습으로 수능 점수 15% 향상' },
        { company: '이투스', description: 'AI 문제 추천 시스템으로 학습 효율 25% 개선' }
      ]
    },
    [IndustryType.HEALTHCARE]: {
      characteristics: [
        '환자 안전 최우선',
        '의료 데이터 보안',
        '진단 정확성 향상',
        '의료진 업무 효율화'
      ],
      n8nOpportunities: [
        '환자 상태 모니터링 자동화',
        '의료 기록 관리 자동화',
        '약물 상호작용 검사',
        '예약 및 진료 관리 시스템'
      ],
      benchmarks: { average: 45, top10: 65, growth: '+25% YoY' },
      aiFocus: 0.7,
      practicalFocus: 0.3,
      successStories: [
        { company: '서울대병원', description: 'AI 진단 보조 시스템으로 진단 정확도 20% 향상' },
        { company: '삼성서울병원', description: 'AI 기반 환자 모니터링으로 회복률 15% 개선' }
      ]
    },
    [IndustryType.LOGISTICS]: {
      characteristics: [
        '물류 효율성 최적화',
        '실시간 추적 중요',
        '배송 경로 최적화',
        '창고 관리 자동화'
      ],
      n8nOpportunities: [
        '배송 경로 최적화 자동화',
        '창고 재고 관리 자동화',
        '배송 상태 추적 시스템',
        '물류 비용 분석 자동화'
      ],
      benchmarks: { average: 60, top10: 80, growth: '+12% YoY' },
      aiFocus: 0.6,
      practicalFocus: 0.4,
      successStories: [
        { company: 'CJ대한통운', description: 'AI 기반 배송 최적화로 배송 시간 30% 단축' },
        { company: '한진택배', description: '스마트 물류 시스템으로 운영비 20% 절감' }
      ]
    },
    [IndustryType.AGRICULTURE]: {
      characteristics: [
        '스마트 농업 도입',
        '환경 데이터 활용',
        '작물 생육 모니터링',
        '농업 자동화 추진'
      ],
      n8nOpportunities: [
        '작물 생육 모니터링 자동화',
        '환경 센서 데이터 수집',
        '농업 장비 관리 자동화',
        '수확량 예측 시스템'
      ],
      benchmarks: { average: 40, top10: 60, growth: '+30% YoY' },
      aiFocus: 0.5,
      practicalFocus: 0.5,
      successStories: [
        { company: '농협', description: 'AI 기반 작물 병해 진단으로 수확량 25% 증가' },
        { company: 'LG화학', description: '스마트 농업 솔루션으로 농약 사용량 30% 감소' }
      ]
    },
    [IndustryType.RETAIL]: {
      characteristics: [
        '고객 경험 개선',
        '재고 관리 최적화',
        '개인화 추천 서비스',
        '오프라인-온라인 통합'
      ],
      n8nOpportunities: [
        '고객 행동 분석 자동화',
        '재고 관리 자동화',
        '개인화 추천 시스템',
        '고객 서비스 챗봇'
      ],
      benchmarks: { average: 65, top10: 85, growth: '+14% YoY' },
      aiFocus: 0.6,
      practicalFocus: 0.4,
      successStories: [
        { company: '쿠팡', description: 'AI 기반 추천 시스템으로 매출 35% 증가' },
        { company: '이마트', description: '스마트 재고 관리로 재고 회전율 20% 개선' }
      ]
    }
  };
  
  /**
   * 업종별 인사이트 조회
   */
  public static getIndustryInsights(industry: IndustryType): IndustryInsight {
    return this.INDUSTRY_INSIGHTS[industry] || this.INDUSTRY_INSIGHTS[IndustryType.IT_SOFTWARE];
  }
  
  /**
   * 업종별 특성 조회
   */
  public static getIndustryCharacteristics(industry: IndustryType): string[] {
    return this.getIndustryInsights(industry).characteristics;
  }
  
  /**
   * 업종별 n8n 기회 조회
   */
  public static getN8nOpportunities(industry: IndustryType): string[] {
    return this.getIndustryInsights(industry).n8nOpportunities;
  }
  
  /**
   * 업종별 벤치마크 조회
   */
  public static getIndustryBenchmarks(industry: IndustryType): any {
    return this.getIndustryInsights(industry).benchmarks;
  }
  
  /**
   * 업종별 AI/실무 비중 조회
   */
  public static getIndustryFocus(industry: IndustryType): { aiFocus: number; practicalFocus: number } {
    const insights = this.getIndustryInsights(industry);
    return {
      aiFocus: insights.aiFocus,
      practicalFocus: insights.practicalFocus
    };
  }
  
  /**
   * 업종별 성공 사례 조회
   */
  public static getSuccessStories(industry: IndustryType): Array<{ company: string; description: string }> {
    return this.getIndustryInsights(industry).successStories;
  }
  
  /**
   * 업종별 맞춤형 추천 생성
   */
  public static generateIndustryRecommendations(
    industry: IndustryType,
    score: number,
    maturityLevel: string
  ): {
    priority: string[];
    roadmap: string[];
    n8nSolutions: string[];
    expectedROI: string;
  } {
    const insights = this.getIndustryInsights(industry);
    const benchmarks = insights.benchmarks;
    
    let priority: string[] = [];
    let roadmap: string[] = [];
    let n8nSolutions: string[] = [];
    let expectedROI = '';
    
    if (score < benchmarks.average * 0.7) {
      // 초기 단계
      priority = ['기본 인프라 구축', '데이터 수집 체계화', '팀 역량 강화'];
      roadmap = ['3개월: 기초 인프라', '6개월: 데이터 수집', '12개월: 첫 AI 프로젝트'];
      n8nSolutions = insights.n8nOpportunities.slice(0, 2);
      expectedROI = '6-12개월 내 15-25% 효율성 향상';
    } else if (score < benchmarks.average) {
      // 발전 단계
      priority = ['프로세스 자동화', '데이터 분석 강화', 'AI 모델 도입'];
      roadmap = ['3개월: 자동화 확대', '6개월: AI 모델 구축', '12개월: 고도화'];
      n8nSolutions = insights.n8nOpportunities.slice(0, 3);
      expectedROI = '3-6개월 내 25-40% 효율성 향상';
    } else {
      // 고도화 단계
      priority = ['AI 고도화', '혁신 프로젝트', '생태계 구축'];
      roadmap = ['3개월: AI 고도화', '6개월: 혁신 프로젝트', '12개월: 생태계 구축'];
      n8nSolutions = insights.n8nOpportunities;
      expectedROI = '1-3개월 내 40-60% 효율성 향상';
    }
    
    return {
      priority,
      roadmap,
      n8nSolutions,
      expectedROI
    };
  }
}

/**
 * 업종별 데이터 서비스 (고급 분석용)
 */
export class IndustryDataService {
  
  /**
   * 업종별 AI 성숙도 분석
   */
  public static analyzeAIMaturity(industry: IndustryType, scores: any): {
    currentLevel: string;
    targetLevel: string;
    gap: number;
    recommendations: string[];
  } {
    const insights = IndustryAnalysisEngine.getIndustryInsights(industry);
    const benchmarks = insights.benchmarks;
    
    const currentLevel = scores.overall < benchmarks.average * 0.7 ? '초기' :
                        scores.overall < benchmarks.average ? '발전' : '고도화';
    
    const targetLevel = '고도화';
    
    const gap = benchmarks.top10 - scores.overall;
    
    const recommendations = IndustryAnalysisEngine.generateIndustryRecommendations(
      industry, scores.overall, currentLevel
    ).priority;
    
    return {
      currentLevel,
      targetLevel,
      gap,
      recommendations
    };
  }
  
  /**
   * 업종별 경쟁력 분석
   */
  public static analyzeCompetitiveness(industry: IndustryType, scores: any): {
    marketPosition: string;
    competitiveAdvantage: string[];
    threats: string[];
    opportunities: string[];
  } {
    const insights = IndustryAnalysisEngine.getIndustryInsights(industry);
    const benchmarks = insights.benchmarks;
    
    const marketPosition = scores.overall > benchmarks.top10 * 0.9 ? '리더' :
                          scores.overall > benchmarks.average ? '경쟁자' : '추격자';
    
    const competitiveAdvantage = insights.characteristics.slice(0, 2);
    const threats = ['기술 변화 속도', '인재 확보 어려움', '투자 부족'];
    const opportunities = insights.n8nOpportunities.slice(0, 3);
    
    return {
      marketPosition,
      competitiveAdvantage,
      threats,
      opportunities
    };
  }
}
