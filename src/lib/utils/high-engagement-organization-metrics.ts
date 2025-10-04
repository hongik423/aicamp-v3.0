/**
 * 고몰입조직 구축 지표 시스템
 * AI 역량 강화와 연계된 조직 몰입도 측정 및 개선 방안 제시
 */

export interface EngagementMetrics {
  // 핵심 몰입 지표
  overallEngagement: number;      // 전체 몰입도 (0-100)
  cognitiveEngagement: number;    // 인지적 몰입 (0-100)
  emotionalEngagement: number;    // 정서적 몰입 (0-100)
  behavioralEngagement: number;   // 행동적 몰입 (0-100)
  
  // 세부 지표
  aiReadiness: number;           // AI 수용 준비도
  changeAdaptability: number;    // 변화 적응력
  collaborationIndex: number;    // 협업 지수
  innovationMindset: number;     // 혁신 마인드셋
  learningAgility: number;       // 학습 민첩성
  
  // 조직 문화 지표
  psychologicalSafety: number;   // 심리적 안전감
  trustLevel: number;            // 신뢰 수준
  communicationQuality: number;  // 의사소통 품질
  leadershipEffectiveness: number; // 리더십 효과성
}

export interface EngagementGaps {
  criticalGaps: Array<{
    area: string;
    currentLevel: number;
    targetLevel: number;
    gap: number;
    impact: 'high' | 'medium' | 'low';
    urgency: 'immediate' | 'short-term' | 'medium-term';
  }>;
  improvementPriorities: string[];
  quickWins: string[];
  strategicInitiatives: string[];
}

export interface EngagementRoadmap {
  phase1: {
    title: string;
    duration: string;
    objectives: string[];
    initiatives: Array<{
      name: string;
      description: string;
      expectedImpact: number;
      resources: string[];
      kpis: string[];
    }>;
    expectedEngagementIncrease: number;
  };
  phase2: {
    title: string;
    duration: string;
    objectives: string[];
    initiatives: Array<{
      name: string;
      description: string;
      expectedImpact: number;
      resources: string[];
      kpis: string[];
    }>;
    expectedEngagementIncrease: number;
  };
  phase3: {
    title: string;
    duration: string;
    objectives: string[];
    initiatives: Array<{
      name: string;
      description: string;
      expectedImpact: number;
      resources: string[];
      kpis: string[];
    }>;
    expectedEngagementIncrease: number;
  };
}

export class HighEngagementOrganizationAnalyzer {
  
  /**
   * 고몰입조직 지표 분석
   */
  static analyzeEngagementMetrics(
    diagnosisData: any,
    scores: any,
    gapAnalysis: any,
    priorityMatrix: any
  ): EngagementMetrics {
    console.log('🎯 고몰입조직 지표 분석 시작...');
    
    // 1. 기본 몰입도 지표 계산
    const cognitiveEngagement = this.calculateCognitiveEngagement(diagnosisData, scores);
    const emotionalEngagement = this.calculateEmotionalEngagement(diagnosisData, scores);
    const behavioralEngagement = this.calculateBehavioralEngagement(diagnosisData, scores);
    
    // 2. AI 특화 지표 계산
    const aiReadiness = this.calculateAIReadiness(diagnosisData, scores);
    const changeAdaptability = this.calculateChangeAdaptability(diagnosisData, scores);
    const collaborationIndex = this.calculateCollaborationIndex(diagnosisData, scores);
    const innovationMindset = this.calculateInnovationMindset(diagnosisData, scores);
    const learningAgility = this.calculateLearningAgility(diagnosisData, scores);
    
    // 3. 조직 문화 지표 계산
    const psychologicalSafety = this.calculatePsychologicalSafety(diagnosisData, scores);
    const trustLevel = this.calculateTrustLevel(diagnosisData, scores);
    const communicationQuality = this.calculateCommunicationQuality(diagnosisData, scores);
    const leadershipEffectiveness = this.calculateLeadershipEffectiveness(diagnosisData, scores);
    
    // 4. 전체 몰입도 계산
    const overallEngagement = Math.round(
      (cognitiveEngagement * 0.3 + emotionalEngagement * 0.3 + behavioralEngagement * 0.4)
    );
    
    console.log(`✅ 고몰입조직 지표 분석 완료: 전체 몰입도 ${overallEngagement}점`);
    
    return {
      overallEngagement,
      cognitiveEngagement,
      emotionalEngagement,
      behavioralEngagement,
      aiReadiness,
      changeAdaptability,
      collaborationIndex,
      innovationMindset,
      learningAgility,
      psychologicalSafety,
      trustLevel,
      communicationQuality,
      leadershipEffectiveness
    };
  }
  
  /**
   * 몰입도 격차 분석
   */
  static analyzeEngagementGaps(
    engagementMetrics: EngagementMetrics,
    industryBenchmarks: any,
    organizationSize: string
  ): EngagementGaps {
    console.log('📊 몰입도 격차 분석 시작...');
    
    // 업종별 몰입도 기준점 설정
    const benchmarks = this.getEngagementBenchmarks(industryBenchmarks, organizationSize);
    
    const criticalGaps = [];
    const improvementPriorities = [];
    const quickWins = [];
    const strategicInitiatives = [];
    
    // 각 지표별 격차 분석
    Object.entries(engagementMetrics).forEach(([metric, value]) => {
      const benchmark = benchmarks[metric] || 70; // 기본 기준점
      const gap = benchmark - value;
      
      if (gap > 20) {
        criticalGaps.push({
          area: this.getMetricDisplayName(metric),
          currentLevel: value,
          targetLevel: benchmark,
          gap: gap,
          impact: 'high' as const,
          urgency: 'immediate' as const
        });
        improvementPriorities.push(`${this.getMetricDisplayName(metric)} 긴급 개선 (현재 ${value}점 → 목표 ${benchmark}점)`);
      } else if (gap > 10) {
        criticalGaps.push({
          area: this.getMetricDisplayName(metric),
          currentLevel: value,
          targetLevel: benchmark,
          gap: gap,
          impact: 'medium' as const,
          urgency: 'short-term' as const
        });
      }
    });
    
    // 빠른 개선 영역 식별
    if (engagementMetrics.communicationQuality < 60) {
      quickWins.push('정기적인 소통 채널 구축 (타운홀 미팅, 피드백 세션)');
      quickWins.push('AI 도입 관련 투명한 정보 공유');
    }
    
    if (engagementMetrics.learningAgility < 65) {
      quickWins.push('AI 기초 교육 프로그램 즉시 시작');
      quickWins.push('학습 동기 부여 인센티브 제도 도입');
    }
    
    // 전략적 이니셔티브 도출
    if (engagementMetrics.overallEngagement < 60) {
      strategicInitiatives.push('전사적 조직문화 혁신 프로그램');
      strategicInitiatives.push('AI 기반 업무 환경 재설계');
    }
    
    if (engagementMetrics.innovationMindset < 65) {
      strategicInitiatives.push('혁신 아이디어 발굴 및 실행 체계 구축');
      strategicInitiatives.push('실패를 학습으로 전환하는 문화 조성');
    }
    
    console.log(`✅ 몰입도 격차 분석 완료: ${criticalGaps.length}개 주요 격차 식별`);
    
    return {
      criticalGaps,
      improvementPriorities,
      quickWins,
      strategicInitiatives
    };
  }
  
  /**
   * 고몰입조직 구축 로드맵 생성
   */
  static generateEngagementRoadmap(
    engagementMetrics: EngagementMetrics,
    engagementGaps: EngagementGaps,
    aiCampPrograms: any
  ): EngagementRoadmap {
    console.log('🗺️ 고몰입조직 구축 로드맵 생성 시작...');
    
    // Phase 1: 기반 구축 (1-3개월)
    const phase1 = {
      title: '몰입도 기반 구축 및 신뢰 형성',
      duration: '1-3개월',
      objectives: [
        '조직 내 AI 도입에 대한 심리적 안전감 조성',
        '투명한 소통 체계 구축',
        '초기 성공 사례 창출'
      ],
      initiatives: [
        {
          name: 'AI 인식 개선 캠페인',
          description: 'AI에 대한 부정적 인식 해소 및 긍정적 기대감 조성',
          expectedImpact: 15,
          resources: ['내부 커뮤니케이션팀', 'AI 전문가', '외부 강사'],
          kpis: ['AI 수용도 점수', '직원 만족도', '참여율']
        },
        {
          name: '리더십 AI 역량 강화',
          description: '경영진 및 팀장급의 AI 리더십 역량 개발',
          expectedImpact: 20,
          resources: ['경영진', 'AI CAMP 리더십 과정', '1:1 코칭'],
          kpis: ['리더십 효과성 점수', '팀 신뢰도', '변화 추진력']
        },
        {
          name: '소통 채널 혁신',
          description: '양방향 소통 체계 구축 및 피드백 루프 강화',
          expectedImpact: 12,
          resources: ['HR팀', '디지털 협업 도구', '정기 미팅 체계'],
          kpis: ['소통 만족도', '피드백 응답률', '의견 반영률']
        }
      ],
      expectedEngagementIncrease: 15
    };
    
    // Phase 2: 역량 개발 (3-6개월)
    const phase2 = {
      title: 'AI 역량 개발 및 협업 강화',
      duration: '3-6개월',
      objectives: [
        '전 직원 AI 기초 역량 확보',
        '부서 간 협업 체계 고도화',
        '학습 조직 문화 정착'
      ],
      initiatives: [
        {
          name: '전사 AI 교육 프로그램',
          description: '직급별, 부서별 맞춤형 AI 교육 실시',
          expectedImpact: 25,
          resources: ['AI CAMP 교육과정', '내부 멘토', '학습 플랫폼'],
          kpis: ['교육 이수율', 'AI 활용 능력', '업무 적용률']
        },
        {
          name: '크로스펑셔널 AI 프로젝트',
          description: '부서 간 협업을 통한 AI 도입 프로젝트 추진',
          expectedImpact: 18,
          resources: ['프로젝트 팀', 'AI 도구', '외부 컨설턴트'],
          kpis: ['프로젝트 성공률', '협업 만족도', 'ROI 달성률']
        },
        {
          name: '혁신 아이디어 플랫폼',
          description: 'AI 활용 아이디어 제안 및 실행 지원 체계',
          expectedImpact: 15,
          resources: ['혁신 플랫폼', '아이디어 평가단', '실행 예산'],
          kpis: ['아이디어 제안 수', '실행률', '성과 창출률']
        }
      ],
      expectedEngagementIncrease: 20
    };
    
    // Phase 3: 지속 발전 (6-12개월)
    const phase3 = {
      title: '고몰입 조직 문화 완성 및 지속 발전',
      duration: '6-12개월',
      objectives: [
        '자율적 학습 및 혁신 문화 정착',
        'AI 기반 업무 방식의 완전한 내재화',
        '지속적 개선 체계 구축'
      ],
      initiatives: [
        {
          name: 'AI 챔피언 네트워크',
          description: '부서별 AI 전문가 양성 및 지식 공유 체계',
          expectedImpact: 22,
          resources: ['내부 전문가', '지식 관리 시스템', '인센티브 제도'],
          kpis: ['전문가 양성 수', '지식 공유 활동', '조직 학습 지수']
        },
        {
          name: '성과 기반 인사제도',
          description: 'AI 활용 성과를 반영한 평가 및 보상 체계',
          expectedImpact: 20,
          resources: ['HR 시스템', '성과 측정 도구', '보상 체계'],
          kpis: ['성과 개선률', '직원 만족도', '이직률 감소']
        },
        {
          name: '지속적 혁신 체계',
          description: '정기적 혁신 활동 및 개선 사이클 운영',
          expectedImpact: 18,
          resources: ['혁신 조직', '개선 프로세스', '측정 시스템'],
          kpis: ['혁신 활동 수', '개선 제안률', '조직 민첩성']
        }
      ],
      expectedEngagementIncrease: 25
    };
    
    console.log('✅ 고몰입조직 구축 로드맵 생성 완료');
    
    return {
      phase1,
      phase2,
      phase3
    };
  }
  
  // 개별 지표 계산 메서드들
  
  private static calculateCognitiveEngagement(diagnosisData: any, scores: any): number {
    let cognitive = 50;
    
    // AI 이해도 반영
    if (scores.categoryScores.currentAI >= 70) cognitive += 20;
    else if (scores.categoryScores.currentAI >= 50) cognitive += 10;
    else if (scores.categoryScores.currentAI < 30) cognitive -= 15;
    
    // 목표 명확성 반영
    if (scores.categoryScores.goalClarity >= 70) cognitive += 15;
    else if (scores.categoryScores.goalClarity < 40) cognitive -= 10;
    
    // 학습 의지 (교육 투자 수준으로 추정)
    const trainingInvestment = diagnosisData.trainingInvestment || 1;
    if (trainingInvestment >= 4) cognitive += 10;
    else if (trainingInvestment <= 2) cognitive -= 10;
    
    return Math.max(0, Math.min(100, cognitive));
  }
  
  private static calculateEmotionalEngagement(diagnosisData: any, scores: any): number {
    let emotional = 50;
    
    // 리더십 지원 반영
    const leadershipSupport = diagnosisData.leadershipSupport || 1;
    if (leadershipSupport >= 4) emotional += 20;
    else if (leadershipSupport <= 2) emotional -= 15;
    
    // 변화 준비도 반영
    const changeReadiness = diagnosisData.changeReadiness || 1;
    if (changeReadiness >= 4) emotional += 15;
    else if (changeReadiness <= 2) emotional -= 15;
    
    // 직원 태도 반영
    const employeeAttitude = diagnosisData.employeeAttitude || 1;
    if (employeeAttitude >= 4) emotional += 15;
    else if (employeeAttitude <= 2) emotional -= 20;
    
    return Math.max(0, Math.min(100, emotional));
  }
  
  private static calculateBehavioralEngagement(diagnosisData: any, scores: any): number {
    let behavioral = 50;
    
    // 실행 역량 반영
    if (scores.categoryScores.executionCapability >= 70) behavioral += 25;
    else if (scores.categoryScores.executionCapability >= 50) behavioral += 10;
    else if (scores.categoryScores.executionCapability < 30) behavioral -= 20;
    
    // 예산 할당 의지
    const budgetAllocation = diagnosisData.budgetAllocation || 1;
    if (budgetAllocation >= 4) behavioral += 15;
    else if (budgetAllocation <= 2) behavioral -= 10;
    
    // 외부 파트너십 활용
    const externalPartnership = diagnosisData.externalPartnership || 1;
    if (externalPartnership >= 3) behavioral += 10;
    
    return Math.max(0, Math.min(100, behavioral));
  }
  
  private static calculateAIReadiness(diagnosisData: any, scores: any): number {
    let readiness = scores.categoryScores.currentAI || 0;
    
    // AI 친숙도 가중치 적용
    const aiFamiliarity = diagnosisData.aiFamiliarity || 1;
    if (aiFamiliarity >= 4) readiness += 10;
    else if (aiFamiliarity <= 2) readiness -= 10;
    
    return Math.max(0, Math.min(100, readiness));
  }
  
  private static calculateChangeAdaptability(diagnosisData: any, scores: any): number {
    let adaptability = 50;
    
    // 변화 관리 경험
    const changeManagementExperience = diagnosisData.changeManagementExperience || 1;
    adaptability += (changeManagementExperience - 1) * 10;
    
    // 조직 준비도
    adaptability += (scores.categoryScores.organizationReadiness - 50) * 0.5;
    
    return Math.max(0, Math.min(100, adaptability));
  }
  
  private static calculateCollaborationIndex(diagnosisData: any, scores: any): number {
    let collaboration = 50;
    
    // 시스템 통합 수준 (협업 도구 활용도로 추정)
    const systemIntegration = diagnosisData.systemIntegration || 1;
    collaboration += (systemIntegration - 1) * 12;
    
    // 외부 파트너십
    const externalPartnership = diagnosisData.externalPartnership || 1;
    collaboration += (externalPartnership - 1) * 8;
    
    return Math.max(0, Math.min(100, collaboration));
  }
  
  private static calculateInnovationMindset(diagnosisData: any, scores: any): number {
    let innovation = 50;
    
    // AI 투자 이력
    const aiInvestmentHistory = diagnosisData.aiInvestmentHistory || 1;
    innovation += (aiInvestmentHistory - 1) * 10;
    
    // 기술 인프라 수준
    innovation += (scores.categoryScores.techInfrastructure - 50) * 0.3;
    
    return Math.max(0, Math.min(100, innovation));
  }
  
  private static calculateLearningAgility(diagnosisData: any, scores: any): number {
    let agility = 50;
    
    // 교육 투자
    const trainingInvestment = diagnosisData.trainingInvestment || 1;
    agility += (trainingInvestment - 1) * 12;
    
    // 기술 인력 보유
    const technicalPersonnel = diagnosisData.technicalPersonnel || 1;
    agility += (technicalPersonnel - 1) * 8;
    
    return Math.max(0, Math.min(100, agility));
  }
  
  private static calculatePsychologicalSafety(diagnosisData: any, scores: any): number {
    let safety = 50;
    
    // 리더십 지원
    const leadershipSupport = diagnosisData.leadershipSupport || 1;
    safety += (leadershipSupport - 1) * 15;
    
    // 직원 태도
    const employeeAttitude = diagnosisData.employeeAttitude || 1;
    safety += (employeeAttitude - 1) * 10;
    
    return Math.max(0, Math.min(100, safety));
  }
  
  private static calculateTrustLevel(diagnosisData: any, scores: any): number {
    let trust = 50;
    
    // 변화 준비도 (신뢰도의 지표)
    const changeReadiness = diagnosisData.changeReadiness || 1;
    trust += (changeReadiness - 1) * 12;
    
    // 조직 준비도
    trust += (scores.categoryScores.organizationReadiness - 50) * 0.4;
    
    return Math.max(0, Math.min(100, trust));
  }
  
  private static calculateCommunicationQuality(diagnosisData: any, scores: any): number {
    let communication = 50;
    
    // 의사결정 데이터 활용도
    const decisionMaking = diagnosisData.decisionMaking || 1;
    communication += (decisionMaking - 1) * 10;
    
    // 조직 준비도 반영
    communication += (scores.categoryScores.organizationReadiness - 50) * 0.3;
    
    return Math.max(0, Math.min(100, communication));
  }
  
  private static calculateLeadershipEffectiveness(diagnosisData: any, scores: any): number {
    let leadership = 50;
    
    // 리더십 지원
    const leadershipSupport = diagnosisData.leadershipSupport || 1;
    leadership += (leadershipSupport - 1) * 15;
    
    // 목표 명확성
    leadership += (scores.categoryScores.goalClarity - 50) * 0.4;
    
    return Math.max(0, Math.min(100, leadership));
  }
  
  // 유틸리티 메서드들
  
  private static getEngagementBenchmarks(industryBenchmarks: any, organizationSize: string): any {
    // 업종별 몰입도 기준점 (실제 데이터 기반으로 설정해야 함)
    const baseBenchmarks = {
      overallEngagement: 70,
      cognitiveEngagement: 65,
      emotionalEngagement: 70,
      behavioralEngagement: 75,
      aiReadiness: 60,
      changeAdaptability: 65,
      collaborationIndex: 70,
      innovationMindset: 65,
      learningAgility: 70,
      psychologicalSafety: 75,
      trustLevel: 70,
      communicationQuality: 68,
      leadershipEffectiveness: 72
    };
    
    // 조직 규모별 조정
    if (organizationSize.includes('10명 미만')) {
      // 소규모 조직은 일반적으로 더 높은 몰입도
      Object.keys(baseBenchmarks).forEach(key => {
        baseBenchmarks[key] += 5;
      });
    } else if (organizationSize.includes('100명 이상')) {
      // 대규모 조직은 몰입도 관리가 더 어려움
      Object.keys(baseBenchmarks).forEach(key => {
        baseBenchmarks[key] -= 3;
      });
    }
    
    return baseBenchmarks;
  }
  
  private static getMetricDisplayName(metric: string): string {
    const displayNames: { [key: string]: string } = {
      overallEngagement: '전체 몰입도',
      cognitiveEngagement: '인지적 몰입',
      emotionalEngagement: '정서적 몰입',
      behavioralEngagement: '행동적 몰입',
      aiReadiness: 'AI 수용 준비도',
      changeAdaptability: '변화 적응력',
      collaborationIndex: '협업 지수',
      innovationMindset: '혁신 마인드셋',
      learningAgility: '학습 민첩성',
      psychologicalSafety: '심리적 안전감',
      trustLevel: '신뢰 수준',
      communicationQuality: '의사소통 품질',
      leadershipEffectiveness: '리더십 효과성'
    };
    
    return displayNames[metric] || metric;
  }
}
