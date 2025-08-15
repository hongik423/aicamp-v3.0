/**
 * 🎯 고도화된 AI 역량진단 점수 집계 엔진
 * McKinsey-Style 분석을 위한 정밀 점수 계산 시스템
 */

export interface QuestionResponse {
  questionId: number;
  score: number; // 1-5 점수
  category: CompetencyCategory;
  subcategory?: string;
  weight?: number; // 가중치 (기본값: 1.0)
  confidence?: number; // 응답 신뢰도 (1-5)
}

export interface CompetencyCategory {
  id: string;
  name: string;
  nameEn: string;
  weight: number;
  subcategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  questions: number[];
  benchmarkData: BenchmarkData;
}

export interface BenchmarkData {
  industryAverage: number;
  sizeAverage: number;
  topPercentile: number;
  globalBest: number;
}

export interface AdvancedScoreResult {
  // 기본 점수
  totalScore: number;
  maxPossibleScore: number;
  percentageScore: number;
  
  // 카테고리별 상세 점수
  categoryScores: CategoryScore[];
  
  // 통계적 분석
  statisticalAnalysis: StatisticalAnalysis;
  
  // 벤치마크 비교
  benchmarkComparison: BenchmarkComparison;
  
  // AI 분석 준비 데이터
  aiAnalysisData: AIAnalysisData;
  
  // 품질 지표
  qualityMetrics: QualityMetrics;
}

export interface CategoryScore {
  category: CompetencyCategory;
  rawScore: number;
  weightedScore: number;
  normalizedScore: number; // 0-100 스케일
  percentile: number;
  maturityLevel: 'Beginner' | 'Developing' | 'Proficient' | 'Advanced' | 'Expert';
  subcategoryScores: SubCategoryScore[];
  strengthAreas: string[];
  improvementAreas: string[];
  criticalGaps: string[];
}

export interface SubCategoryScore {
  subcategory: SubCategory;
  score: number;
  benchmark: number;
  gap: number;
  priority: 'High' | 'Medium' | 'Low';
}

export interface StatisticalAnalysis {
  mean: number;
  median: number;
  standardDeviation: number;
  variance: number;
  skewness: number;
  kurtosis: number;
  confidenceInterval: [number, number];
  reliability: number; // Cronbach's Alpha
}

export interface BenchmarkComparison {
  industryRanking: number;
  sizeRanking: number;
  globalRanking: number;
  competitorAnalysis: CompetitorAnalysis[];
  marketPosition: 'Leader' | 'Challenger' | 'Follower' | 'Niche';
}

export interface CompetitorAnalysis {
  segment: string;
  averageScore: number;
  gap: number;
  timeToClose: number; // 개월
}

export interface AIAnalysisData {
  responsePatterns: ResponsePattern[];
  inconsistencies: Inconsistency[];
  correlations: Correlation[];
  predictiveFactors: PredictiveFactor[];
}

export interface ResponsePattern {
  pattern: string;
  frequency: number;
  significance: number;
  interpretation: string;
}

export interface Inconsistency {
  questionPair: [number, number];
  expectedCorrelation: number;
  actualCorrelation: number;
  severity: 'High' | 'Medium' | 'Low';
}

export interface Correlation {
  factor1: string;
  factor2: string;
  coefficient: number;
  significance: number;
  interpretation: string;
}

export interface PredictiveFactor {
  factor: string;
  importance: number;
  direction: 'Positive' | 'Negative';
  confidence: number;
}

export interface QualityMetrics {
  completeness: number; // 0-1
  consistency: number; // 0-1
  reliability: number; // 0-1
  validity: number; // 0-1
  overallQuality: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  qualityFlags: string[];
}

/**
 * 고도화된 점수 집계 엔진
 */
export class AdvancedScoringEngine {
  private competencyFramework: CompetencyCategory[];
  private benchmarkDatabase: Map<string, BenchmarkData>;
  
  constructor() {
    this.competencyFramework = this.initializeCompetencyFramework();
    this.benchmarkDatabase = this.initializeBenchmarkDatabase();
  }
  
  /**
   * 메인 점수 계산 함수
   */
  async calculateAdvancedScore(
    responses: QuestionResponse[],
    companyInfo: any
  ): Promise<AdvancedScoreResult> {
    
    // 1. 데이터 품질 검증
    const qualityMetrics = this.assessDataQuality(responses);
    
    // 2. 기본 점수 계산
    const basicScores = this.calculateBasicScores(responses);
    
    // 3. 카테고리별 상세 분석
    const categoryScores = this.calculateCategoryScores(responses, companyInfo);
    
    // 4. 통계적 분석
    const statisticalAnalysis = this.performStatisticalAnalysis(responses);
    
    // 5. 벤치마크 비교
    const benchmarkComparison = this.performBenchmarkComparison(
      categoryScores, 
      companyInfo
    );
    
    // 6. AI 분석 데이터 준비
    const aiAnalysisData = this.prepareAIAnalysisData(responses, categoryScores);
    
    return {
      ...basicScores,
      categoryScores,
      statisticalAnalysis,
      benchmarkComparison,
      aiAnalysisData,
      qualityMetrics
    };
  }
  
  /**
   * 데이터 품질 평가
   */
  private assessDataQuality(responses: QuestionResponse[]): QualityMetrics {
    const totalQuestions = 45;
    const completeness = responses.length / totalQuestions;
    
    // 일관성 검사 (관련 질문들 간의 상관관계)
    const consistency = this.calculateConsistency(responses);
    
    // 신뢰도 검사 (Cronbach's Alpha)
    const reliability = this.calculateReliability(responses);
    
    // 타당성 검사 (극단값, 패턴 이상)
    const validity = this.calculateValidity(responses);
    
    const overallQuality = this.determineOverallQuality(
      completeness, consistency, reliability, validity
    );
    
    const qualityFlags = this.identifyQualityFlags(responses);
    
    return {
      completeness,
      consistency,
      reliability,
      validity,
      overallQuality,
      qualityFlags
    };
  }
  
  /**
   * 카테고리별 점수 계산
   */
  private calculateCategoryScores(
    responses: QuestionResponse[],
    companyInfo: any
  ): CategoryScore[] {
    
    return this.competencyFramework.map(category => {
      const categoryResponses = responses.filter(r => 
        r.category.id === category.id
      );
      
      // 원시 점수 계산
      const rawScore = categoryResponses.reduce((sum, r) => 
        sum + (r.score * (r.weight || 1.0)), 0
      );
      
      // 가중 점수 계산
      const weightedScore = rawScore * category.weight;
      
      // 정규화 점수 (0-100)
      const maxPossible = categoryResponses.length * 5 * category.weight;
      const normalizedScore = (weightedScore / maxPossible) * 100;
      
      // 백분위 계산
      const percentile = this.calculatePercentile(
        normalizedScore, 
        category.id, 
        companyInfo
      );
      
      // 성숙도 레벨 결정
      const maturityLevel = this.determineMaturityLevel(normalizedScore);
      
      // 서브카테고리 분석
      const subcategoryScores = this.calculateSubcategoryScores(
        categoryResponses, 
        category
      );
      
      // 강점/개선 영역 식별
      const strengthAreas = this.identifyStrengthAreas(subcategoryScores);
      const improvementAreas = this.identifyImprovementAreas(subcategoryScores);
      const criticalGaps = this.identifyCriticalGaps(subcategoryScores);
      
      return {
        category,
        rawScore,
        weightedScore,
        normalizedScore,
        percentile,
        maturityLevel,
        subcategoryScores,
        strengthAreas,
        improvementAreas,
        criticalGaps
      };
    });
  }
  
  /**
   * 벤치마크 비교 분석
   */
  private performBenchmarkComparison(
    categoryScores: CategoryScore[],
    companyInfo: any
  ): BenchmarkComparison {
    
    const overallScore = categoryScores.reduce((sum, cat) => 
      sum + cat.normalizedScore, 0
    ) / categoryScores.length;
    
    // 업종별 랭킹
    const industryRanking = this.calculateIndustryRanking(
      overallScore, 
      companyInfo.industry
    );
    
    // 규모별 랭킹
    const sizeRanking = this.calculateSizeRanking(
      overallScore, 
      companyInfo.employeeCount
    );
    
    // 글로벌 랭킹
    const globalRanking = this.calculateGlobalRanking(overallScore);
    
    // 경쟁사 분석
    const competitorAnalysis = this.performCompetitorAnalysis(
      categoryScores, 
      companyInfo
    );
    
    // 시장 포지션 결정
    const marketPosition = this.determineMarketPosition(
      industryRanking, 
      sizeRanking, 
      globalRanking
    );
    
    return {
      industryRanking,
      sizeRanking,
      globalRanking,
      competitorAnalysis,
      marketPosition
    };
  }
  
  /**
   * AI 분석 데이터 준비
   */
  private prepareAIAnalysisData(
    responses: QuestionResponse[],
    categoryScores: CategoryScore[]
  ): AIAnalysisData {
    
    // 응답 패턴 분석
    const responsePatterns = this.analyzeResponsePatterns(responses);
    
    // 불일치 탐지
    const inconsistencies = this.detectInconsistencies(responses);
    
    // 상관관계 분석
    const correlations = this.analyzeCorrelations(categoryScores);
    
    // 예측 요인 식별
    const predictiveFactors = this.identifyPredictiveFactors(
      responses, 
      categoryScores
    );
    
    return {
      responsePatterns,
      inconsistencies,
      correlations,
      predictiveFactors
    };
  }
  
  /**
   * 역량 프레임워크 초기화
   */
  private initializeCompetencyFramework(): CompetencyCategory[] {
    return [
      {
        id: 'ai_strategy',
        name: 'AI 전략 수립',
        nameEn: 'AI Strategy Development',
        weight: 1.2,
        subcategories: [
          {
            id: 'vision_alignment',
            name: '비전 정렬',
            questions: [1, 2, 3, 4, 5],
            benchmarkData: {
              industryAverage: 65,
              sizeAverage: 70,
              topPercentile: 85,
              globalBest: 95
            }
          }
        ]
      },
      {
        id: 'data_management',
        name: '데이터 관리',
        nameEn: 'Data Management',
        weight: 1.1,
        subcategories: [
          {
            id: 'data_quality',
            name: '데이터 품질',
            questions: [6, 7, 8, 9, 10],
            benchmarkData: {
              industryAverage: 60,
              sizeAverage: 65,
              topPercentile: 80,
              globalBest: 92
            }
          }
        ]
      },
      {
        id: 'technology_infrastructure',
        name: '기술 인프라',
        nameEn: 'Technology Infrastructure',
        weight: 1.0,
        subcategories: [
          {
            id: 'cloud_readiness',
            name: '클라우드 준비도',
            questions: [11, 12, 13, 14, 15],
            benchmarkData: {
              industryAverage: 55,
              sizeAverage: 60,
              topPercentile: 75,
              globalBest: 88
            }
          }
        ]
      },
      {
        id: 'organizational_readiness',
        name: '조직 준비도',
        nameEn: 'Organizational Readiness',
        weight: 1.15,
        subcategories: [
          {
            id: 'change_management',
            name: '변화 관리',
            questions: [16, 17, 18, 19, 20],
            benchmarkData: {
              industryAverage: 58,
              sizeAverage: 62,
              topPercentile: 78,
              globalBest: 90
            }
          }
        ]
      },
      {
        id: 'ai_culture',
        name: 'AI 문화',
        nameEn: 'AI Culture',
        weight: 1.05,
        subcategories: [
          {
            id: 'innovation_mindset',
            name: '혁신 마인드셋',
            questions: [21, 22, 23, 24, 25],
            benchmarkData: {
              industryAverage: 52,
              sizeAverage: 55,
              topPercentile: 72,
              globalBest: 85
            }
          }
        ]
      },
      {
        id: 'governance_ethics',
        name: '거버넌스 & 윤리',
        nameEn: 'Governance & Ethics',
        weight: 1.1,
        subcategories: [
          {
            id: 'ai_ethics',
            name: 'AI 윤리',
            questions: [26, 27, 28, 29, 30],
            benchmarkData: {
              industryAverage: 48,
              sizeAverage: 50,
              topPercentile: 68,
              globalBest: 82
            }
          }
        ]
      },
      {
        id: 'talent_skills',
        name: '인재 & 스킬',
        nameEn: 'Talent & Skills',
        weight: 1.08,
        subcategories: [
          {
            id: 'ai_literacy',
            name: 'AI 리터러시',
            questions: [31, 32, 33, 34, 35],
            benchmarkData: {
              industryAverage: 45,
              sizeAverage: 48,
              topPercentile: 65,
              globalBest: 80
            }
          }
        ]
      },
      {
        id: 'innovation_capability',
        name: '혁신 역량',
        nameEn: 'Innovation Capability',
        weight: 1.0,
        subcategories: [
          {
            id: 'experimentation',
            name: '실험 문화',
            questions: [36, 37, 38, 39, 40],
            benchmarkData: {
              industryAverage: 42,
              sizeAverage: 45,
              topPercentile: 62,
              globalBest: 78
            }
          }
        ]
      },
      {
        id: 'performance_measurement',
        name: '성과 측정',
        nameEn: 'Performance Measurement',
        weight: 0.95,
        subcategories: [
          {
            id: 'roi_tracking',
            name: 'ROI 추적',
            questions: [41, 42, 43, 44, 45],
            benchmarkData: {
              industryAverage: 40,
              sizeAverage: 42,
              topPercentile: 58,
              globalBest: 75
            }
          }
        ]
      }
    ];
  }
  
  // 추가 헬퍼 메서드들...
  private calculateConsistency(responses: QuestionResponse[]): number {
    // 일관성 계산 로직
    return 0.85; // 예시값
  }
  
  private calculateReliability(responses: QuestionResponse[]): number {
    // Cronbach's Alpha 계산
    return 0.92; // 예시값
  }
  
  private calculateValidity(responses: QuestionResponse[]): number {
    // 타당성 계산 로직
    return 0.88; // 예시값
  }
  
  private determineOverallQuality(
    completeness: number,
    consistency: number,
    reliability: number,
    validity: number
  ): 'Excellent' | 'Good' | 'Fair' | 'Poor' {
    const average = (completeness + consistency + reliability + validity) / 4;
    if (average >= 0.9) return 'Excellent';
    if (average >= 0.8) return 'Good';
    if (average >= 0.7) return 'Fair';
    return 'Poor';
  }
  
  private identifyQualityFlags(responses: QuestionResponse[]): string[] {
    const flags: string[] = [];
    
    // 미완성 응답 체크
    if (responses.length < 45) {
      flags.push(`미완성 응답: ${45 - responses.length}개 문항 누락`);
    }
    
    // 극단값 체크
    const extremeResponses = responses.filter(r => r.score === 1 || r.score === 5);
    if (extremeResponses.length > responses.length * 0.8) {
      flags.push('극단값 응답 과다: 응답 신뢰도 검토 필요');
    }
    
    // 중간값 편향 체크
    const middleResponses = responses.filter(r => r.score === 3);
    if (middleResponses.length > responses.length * 0.7) {
      flags.push('중간값 편향: 명확한 의견 표현 부족');
    }
    
    return flags;
  }
  
  private calculateBasicScores(responses: QuestionResponse[]) {
    const totalScore = responses.reduce((sum, r) => sum + r.score, 0);
    const maxPossibleScore = responses.length * 5;
    const percentageScore = (totalScore / maxPossibleScore) * 100;
    
    return {
      totalScore,
      maxPossibleScore,
      percentageScore
    };
  }
  
  private performStatisticalAnalysis(responses: QuestionResponse[]): StatisticalAnalysis {
    const scores = responses.map(r => r.score);
    const n = scores.length;
    
    // 평균
    const mean = scores.reduce((sum, score) => sum + score, 0) / n;
    
    // 중앙값
    const sortedScores = [...scores].sort((a, b) => a - b);
    const median = n % 2 === 0 
      ? (sortedScores[n/2 - 1] + sortedScores[n/2]) / 2
      : sortedScores[Math.floor(n/2)];
    
    // 표준편차
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / n;
    const standardDeviation = Math.sqrt(variance);
    
    // 왜도 (Skewness)
    const skewness = scores.reduce((sum, score) => 
      sum + Math.pow((score - mean) / standardDeviation, 3), 0
    ) / n;
    
    // 첨도 (Kurtosis)
    const kurtosis = scores.reduce((sum, score) => 
      sum + Math.pow((score - mean) / standardDeviation, 4), 0
    ) / n - 3;
    
    // 신뢰구간 (95%)
    const marginOfError = 1.96 * (standardDeviation / Math.sqrt(n));
    const confidenceInterval: [number, number] = [
      mean - marginOfError,
      mean + marginOfError
    ];
    
    // 신뢰도 (Cronbach's Alpha 근사치)
    const reliability = this.calculateCronbachAlpha(responses);
    
    return {
      mean,
      median,
      standardDeviation,
      variance,
      skewness,
      kurtosis,
      confidenceInterval,
      reliability
    };
  }
  
  private calculateCronbachAlpha(responses: QuestionResponse[]): number {
    // Cronbach's Alpha 계산 (간소화된 버전)
    const k = responses.length;
    const scores = responses.map(r => r.score);
    const totalVariance = this.calculateVariance(scores);
    
    // 각 문항의 분산 합계
    const itemVariances = responses.map(r => this.calculateVariance([r.score]));
    const sumItemVariances = itemVariances.reduce((sum, variance) => sum + variance, 0);
    
    // Cronbach's Alpha 공식
    const alpha = (k / (k - 1)) * (1 - (sumItemVariances / totalVariance));
    
    return Math.max(0, Math.min(1, alpha)); // 0-1 범위로 제한
  }
  
  private calculateVariance(scores: number[]): number {
    const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
  }
  
  // 추가 메서드들은 실제 구현에서 완성...
  private calculatePercentile(score: number, categoryId: string, companyInfo: any): number {
    // 실제 벤치마크 데이터베이스 조회 로직
    return Math.floor(Math.random() * 100); // 임시값
  }
  
  private determineMaturityLevel(score: number): 'Beginner' | 'Developing' | 'Proficient' | 'Advanced' | 'Expert' {
    if (score >= 90) return 'Expert';
    if (score >= 75) return 'Advanced';
    if (score >= 60) return 'Proficient';
    if (score >= 40) return 'Developing';
    return 'Beginner';
  }
  
  private calculateSubcategoryScores(responses: QuestionResponse[], category: CompetencyCategory): SubCategoryScore[] {
    return category.subcategories.map(sub => ({
      subcategory: sub,
      score: Math.random() * 100, // 임시값
      benchmark: sub.benchmarkData.industryAverage,
      gap: Math.random() * 20 - 10, // 임시값
      priority: 'Medium' as const
    }));
  }
  
  private identifyStrengthAreas(subcategoryScores: SubCategoryScore[]): string[] {
    return subcategoryScores
      .filter(sub => sub.score > sub.benchmark + 10)
      .map(sub => sub.subcategory.name);
  }
  
  private identifyImprovementAreas(subcategoryScores: SubCategoryScore[]): string[] {
    return subcategoryScores
      .filter(sub => sub.score < sub.benchmark - 5)
      .map(sub => sub.subcategory.name);
  }
  
  private identifyCriticalGaps(subcategoryScores: SubCategoryScore[]): string[] {
    return subcategoryScores
      .filter(sub => sub.score < sub.benchmark - 15)
      .map(sub => sub.subcategory.name);
  }
  
  private calculateIndustryRanking(score: number, industry: string): number {
    // 업종별 랭킹 계산 로직
    return Math.floor(Math.random() * 100) + 1;
  }
  
  private calculateSizeRanking(score: number, employeeCount: string): number {
    // 규모별 랭킹 계산 로직
    return Math.floor(Math.random() * 100) + 1;
  }
  
  private calculateGlobalRanking(score: number): number {
    // 글로벌 랭킹 계산 로직
    return Math.floor(Math.random() * 1000) + 1;
  }
  
  private performCompetitorAnalysis(categoryScores: CategoryScore[], companyInfo: any): CompetitorAnalysis[] {
    // 경쟁사 분석 로직
    return [
      {
        segment: '동종업계 평균',
        averageScore: 65,
        gap: -10,
        timeToClose: 6
      }
    ];
  }
  
  private determineMarketPosition(
    industryRanking: number,
    sizeRanking: number,
    globalRanking: number
  ): 'Leader' | 'Challenger' | 'Follower' | 'Niche' {
    const avgRanking = (industryRanking + sizeRanking + globalRanking) / 3;
    if (avgRanking <= 25) return 'Leader';
    if (avgRanking <= 50) return 'Challenger';
    if (avgRanking <= 75) return 'Follower';
    return 'Niche';
  }
  
  private analyzeResponsePatterns(responses: QuestionResponse[]): ResponsePattern[] {
    // 응답 패턴 분석 로직
    return [];
  }
  
  private detectInconsistencies(responses: QuestionResponse[]): Inconsistency[] {
    // 불일치 탐지 로직
    return [];
  }
  
  private analyzeCorrelations(categoryScores: CategoryScore[]): Correlation[] {
    // 상관관계 분석 로직
    return [];
  }
  
  private identifyPredictiveFactors(
    responses: QuestionResponse[],
    categoryScores: CategoryScore[]
  ): PredictiveFactor[] {
    // 예측 요인 식별 로직
    return [];
  }
  
  private initializeBenchmarkDatabase(): Map<string, BenchmarkData> {
    // 벤치마크 데이터베이스 초기화
    return new Map();
  }
}

export const advancedScoringEngine = new AdvancedScoringEngine();
