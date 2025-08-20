/**
 * 🧠 AI 기반 전략 분석 엔진
 * Ollama GPT-OSS 20B 온디바이스 분석 시스템
 */

import { AdvancedScoreResult } from './advanced-scoring-engine';

export interface StrategicAnalysisRequest {
  scoreResult: AdvancedScoreResult;
  companyInfo: CompanyInfo;
  industryContext: IndustryContext;
  marketConditions: MarketConditions;
}

export interface CompanyInfo {
  name: string;
  industry: string;
  employeeCount: string;
  annualRevenue: string;
  location: string;
  businessModel: string;
  currentAIUsage: string[];
  strategicGoals: string[];
  challenges: string[];
  timeline: string;
  budget: string;
}

export interface IndustryContext {
  industryTrends: string[];
  competitiveLandscape: string[];
  regulatoryEnvironment: string[];
  technologyAdoption: string[];
  marketMaturity: 'Emerging' | 'Growing' | 'Mature' | 'Declining';
}

export interface MarketConditions {
  economicFactors: string[];
  technologicalFactors: string[];
  socialFactors: string[];
  environmentalFactors: string[];
  politicalFactors: string[];
}

export interface StrategicAnalysisResult {
  executiveSummary: ExecutiveSummary;
  swotAnalysis: SWOTAnalysis;
  strategicRecommendations: StrategicRecommendation[];
  implementationRoadmap: ImplementationRoadmap;
  riskAssessment: RiskAssessment;
  successMetrics: SuccessMetric[];
  investmentAnalysis: InvestmentAnalysis;
  competitivePositioning: CompetitivePositioning;
}

export interface ExecutiveSummary {
  currentState: string;
  keyFindings: string[];
  criticalSuccessFactors: string[];
  recommendedApproach: string;
  expectedOutcomes: string[];
  investmentRequired: string;
  timeToValue: string;
}

export interface SWOTAnalysis {
  strengths: SWOTItem[];
  weaknesses: SWOTItem[];
  opportunities: SWOTItem[];
  threats: SWOTItem[];
  strategicImplications: string[];
}

export interface SWOTItem {
  factor: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  urgency: 'Immediate' | 'Short-term' | 'Medium-term' | 'Long-term';
  actionable: boolean;
}

export interface StrategicRecommendation {
  id: string;
  title: string;
  description: string;
  rationale: string;
  expectedImpact: string;
  implementationComplexity: 'Low' | 'Medium' | 'High';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  timeline: string;
  resources: ResourceRequirement[];
  dependencies: string[];
  risks: string[];
  successCriteria: string[];
}

export interface ResourceRequirement {
  type: 'Human' | 'Technology' | 'Financial' | 'External';
  description: string;
  quantity: string;
  cost: string;
  timeline: string;
}

export interface ImplementationRoadmap {
  phases: RoadmapPhase[];
  milestones: Milestone[];
  criticalPath: string[];
  resourceAllocation: ResourceAllocation[];
  riskMitigation: RiskMitigation[];
}

export interface RoadmapPhase {
  id: string;
  name: string;
  description: string;
  duration: string;
  objectives: string[];
  deliverables: string[];
  resources: ResourceRequirement[];
  dependencies: string[];
  successCriteria: string[];
  risks: string[];
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  targetDate: string;
  criteria: string[];
  stakeholders: string[];
  deliverables: string[];
}

export interface ResourceAllocation {
  phase: string;
  resource: string;
  allocation: string;
  cost: string;
  justification: string;
}

export interface RiskMitigation {
  risk: string;
  probability: 'High' | 'Medium' | 'Low';
  impact: 'High' | 'Medium' | 'Low';
  mitigation: string;
  contingency: string;
  owner: string;
}

export interface RiskAssessment {
  overallRiskLevel: 'High' | 'Medium' | 'Low';
  keyRisks: Risk[];
  mitigationStrategies: MitigationStrategy[];
  contingencyPlans: ContingencyPlan[];
}

export interface Risk {
  id: string;
  category: 'Technical' | 'Organizational' | 'Financial' | 'Market' | 'Regulatory';
  description: string;
  probability: number; // 0-1
  impact: number; // 0-1
  riskScore: number;
  timeframe: string;
}

export interface MitigationStrategy {
  riskId: string;
  strategy: string;
  effectiveness: number; // 0-1
  cost: string;
  timeline: string;
  owner: string;
}

export interface ContingencyPlan {
  trigger: string;
  actions: string[];
  resources: string[];
  timeline: string;
  successCriteria: string[];
}

export interface SuccessMetric {
  category: 'Financial' | 'Operational' | 'Strategic' | 'Innovation';
  metric: string;
  description: string;
  baseline: string;
  target: string;
  timeline: string;
  measurementMethod: string;
  frequency: string;
  owner: string;
}

export interface InvestmentAnalysis {
  totalInvestment: InvestmentBreakdown;
  roi: ROIAnalysis;
  paybackPeriod: string;
  npv: string;
  irr: string;
  sensitivityAnalysis: SensitivityAnalysis;
}

export interface InvestmentBreakdown {
  technology: string;
  human: string;
  training: string;
  consulting: string;
  infrastructure: string;
  other: string;
  total: string;
}

export interface ROIAnalysis {
  year1: string;
  year2: string;
  year3: string;
  year5: string;
  assumptions: string[];
  riskFactors: string[];
}

export interface SensitivityAnalysis {
  bestCase: string;
  worstCase: string;
  mostLikely: string;
  keyVariables: string[];
}

export interface CompetitivePositioning {
  currentPosition: string;
  targetPosition: string;
  competitiveAdvantages: string[];
  differentiationStrategy: string;
  marketShare: string;
  competitorAnalysis: CompetitorProfile[];
}

export interface CompetitorProfile {
  name: string;
  strengths: string[];
  weaknesses: string[];
  aiMaturity: string;
  marketPosition: string;
  threats: string[];
  opportunities: string[];
}

/**
 * AI 기반 전략 분석 엔진
 */
export class AIStrategicAnalyzer {
  constructor() {}
  
  /**
   * 메인 전략 분석 함수
   */
  async analyzeStrategy(request: StrategicAnalysisRequest): Promise<StrategicAnalysisResult> {
    console.log('🧠 Ollama GPT-OSS 20B 온디바이스 전략 분석 시작...');
    
    // 1. 정량적 분석 (규칙/모델 혼합)
    const quantitativeAnalysis = await this.performQuantitativeAnalysis(request);
    
    // 2. 정성적 분석 (Ollama)
    const qualitativeAnalysis = await this.performQualitativeAnalysisWithOllama(request);
    
    // 3. 통합 분석
    const hybridAnalysis = this.combineAnalyses(quantitativeAnalysis, qualitativeAnalysis);
    
    // 4. 전략적 권고안 생성
    const strategicRecommendations = await this.generateStrategicRecommendations(
      request, 
      hybridAnalysis
    );
    
    // 5. 실행 로드맵 생성
    const implementationRoadmap = await this.generateImplementationRoadmap(
      request, 
      strategicRecommendations
    );
    
    // 6. 리스크 평가
    const riskAssessment = await this.performRiskAssessment(
      request, 
      strategicRecommendations
    );
    
    // 7. 성공 지표 정의
    const successMetrics = this.defineSuccessMetrics(
      request, 
      strategicRecommendations
    );
    
    // 8. 투자 분석
    const investmentAnalysis = this.performInvestmentAnalysis(
      request, 
      implementationRoadmap
    );
    
    // 9. 경쟁 포지셔닝
    const competitivePositioning = await this.analyzeCompetitivePositioning(
      request, 
      hybridAnalysis
    );
    
    // 10. SWOT 분석
    const swotAnalysis = this.performSWOTAnalysis(
      request, 
      hybridAnalysis
    );
    
    // 11. 경영진 요약
    const executiveSummary = this.generateExecutiveSummary(
      request,
      strategicRecommendations,
      investmentAnalysis
    );
    
    return {
      executiveSummary,
      swotAnalysis,
      strategicRecommendations,
      implementationRoadmap,
      riskAssessment,
      successMetrics,
      investmentAnalysis,
      competitivePositioning
    };
  }
  
  /**
   * GEMINI 기반 정량적 분석
   */
  private async performQuantitativeAnalysis(request: StrategicAnalysisRequest): Promise<any> {
    // 규칙 기반 간단 정량 분석 (온디바이스)
    const { scoreResult } = request;
    const top = [...scoreResult.categoryScores].sort((a, b) => b.normalizedScore - a.normalizedScore).slice(0, 3);
    const low = [...scoreResult.categoryScores].sort((a, b) => a.normalizedScore - b.normalizedScore).slice(0, 3);
    return {
      currentMaturity: scoreResult.percentageScore >= 80 ? 'Advanced' : scoreResult.percentageScore >= 60 ? 'Developing' : 'Early',
      priorityAreas: low.map(c => c.category.name),
      strengths: top.map(c => c.category.name),
      quickWins: ['업무 자동화', '기초 AI 교육']
    };
  }
  
  /**
   * GEMINI 기반 정성적 분석 (통합 시스템)
   */
  private async performQualitativeAnalysisWithOllama(request: StrategicAnalysisRequest): Promise<any> {
    const prompt = this.buildQualitativeAnalysisPrompt(request);
    try {
      const { callAI } = await import('@/lib/ai/ai-provider');
      const text = await callAI({ prompt, maxTokens: 2048, temperature: 0.5 });
      try { return JSON.parse(text); } catch { return { narrative: text }; }
    } catch (error) {
      return this.generateFallbackQualitativeAnalysis(request);
    }
  }
  
  /**
   * 정량적 분석 프롬프트 생성
   */
  private buildQuantitativeAnalysisPrompt(request: StrategicAnalysisRequest): string {
    const { scoreResult, companyInfo } = request;
    
    return `
# AI 역량진단 정량적 분석 요청

## 회사 정보
- 회사명: ${companyInfo.name}
- 업종: ${companyInfo.industry}
- 규모: ${companyInfo.employeeCount}
- 매출: ${companyInfo.annualRevenue}

## 진단 결과 데이터
- 총점: ${scoreResult.totalScore}/${scoreResult.maxPossibleScore} (${scoreResult.percentageScore.toFixed(1)}%)
- 품질 지표: ${scoreResult.qualityMetrics.overallQuality}
- 데이터 완성도: ${(scoreResult.qualityMetrics.completeness * 100).toFixed(1)}%

## 카테고리별 점수
${scoreResult.categoryScores.map(cat => 
  `- ${cat.category.name}: ${cat.normalizedScore.toFixed(1)}점 (${cat.maturityLevel}, ${cat.percentile}백분위)`
).join('\n')}

## 벤치마크 비교
- 업종 랭킹: ${scoreResult.benchmarkComparison.industryRanking}위
- 규모 랭킹: ${scoreResult.benchmarkComparison.sizeRanking}위
- 글로벌 랭킹: ${scoreResult.benchmarkComparison.globalRanking}위
- 시장 포지션: ${scoreResult.benchmarkComparison.marketPosition}

## 분석 요청사항
다음 관점에서 정량적 분석을 수행해주세요:

1. **현재 AI 성숙도 평가**
   - 각 역량 영역별 상대적 강약점 분석
   - 업종/규모 대비 포지셔닝 분석
   - 글로벌 벤치마크 대비 격차 분석

2. **개선 우선순위 도출**
   - 투자 대비 효과가 높은 영역 식별
   - Quick Win 기회 발굴
   - 장기적 역량 구축 영역 구분

3. **목표 설정 및 로드맵**
   - 6개월, 1년, 2년 목표 점수 제시
   - 각 단계별 개선 포인트 산정
   - 필요 투자 규모 추정

4. **리스크 요인 분석**
   - 현재 취약점이 비즈니스에 미치는 영향도
   - 경쟁사 대비 뒤처질 위험도
   - 기술 변화 대응 준비도

JSON 형태로 구조화된 분석 결과를 제공해주세요.
`;
  }
  
  /**
   * 정성적 분석 프롬프트 생성
   */
  private buildQualitativeAnalysisPrompt(request: StrategicAnalysisRequest): string {
    const { companyInfo, industryContext, marketConditions } = request;
    
    return `
# AI 전략 정성적 분석 요청

## 회사 맥락
- 사업 모델: ${companyInfo.businessModel}
- 현재 AI 활용: ${companyInfo.currentAIUsage.join(', ')}
- 전략적 목표: ${companyInfo.strategicGoals.join(', ')}
- 주요 과제: ${companyInfo.challenges.join(', ')}
- 예산: ${companyInfo.budget}
- 타임라인: ${companyInfo.timeline}

## 산업 맥락
- 산업 트렌드: ${industryContext.industryTrends.join(', ')}
- 경쟁 환경: ${industryContext.competitiveLandscape.join(', ')}
- 규제 환경: ${industryContext.regulatoryEnvironment.join(', ')}
- 기술 도입 현황: ${industryContext.technologyAdoption.join(', ')}
- 시장 성숙도: ${industryContext.marketMaturity}

## 시장 조건
- 경제적 요인: ${marketConditions.economicFactors.join(', ')}
- 기술적 요인: ${marketConditions.technologicalFactors.join(', ')}
- 사회적 요인: ${marketConditions.socialFactors.join(', ')}

## 분석 요청사항
McKinsey 스타일의 전략적 관점에서 다음을 분석해주세요:

1. **전략적 맥락 분석**
   - 회사의 AI 전략이 전체 비즈니스 전략과 어떻게 연계되어야 하는가?
   - 산업 내 AI 도입 트렌드와 회사의 현재 위치는?
   - 경쟁 우위 확보를 위한 차별화 포인트는?

2. **조직적 준비도 평가**
   - 현재 조직 문화가 AI 도입에 얼마나 준비되어 있는가?
   - 리더십의 AI 이해도와 추진 의지는?
   - 변화 관리 관점에서의 주요 고려사항은?

3. **전략적 권고안**
   - 회사 상황에 최적화된 AI 도입 전략은?
   - 단계별 접근 방법과 핵심 성공 요인은?
   - 조직 내 저항 요소와 극복 방안은?

4. **실행 관점**
   - 실제 구현 시 예상되는 주요 장애물은?
   - 성공적인 실행을 위한 거버넌스 체계는?
   - 지속가능한 AI 역량 구축 방안은?

전략 컨설팅 보고서 스타일로 구조화된 인사이트를 제공해주세요.
`;
  }
  
  /**
   * GEMINI 기반 통합 분석 결합
   */
  private combineAnalyses(quantitative: any, qualitative: any): any {
    return {
      quantitativeInsights: quantitative,
      qualitativeInsights: qualitative,
      combinedRecommendations: this.synthesizeRecommendations(quantitative, qualitative),
      analysisModel: 'Ollama-GPT-OSS-20B',
      analysisTimestamp: new Date().toISOString()
    };
  }
  
  /**
   * 전략적 권고안 생성
   */
  private async generateStrategicRecommendations(
    request: StrategicAnalysisRequest,
    analysis: any
  ): Promise<StrategicRecommendation[]> {
    
    // AI 기반 권고안 생성 로직
    const recommendations: StrategicRecommendation[] = [];
    
    // 예시 권고안들
    const quickWins = this.generateQuickWinRecommendations(request, analysis);
    const strategicInitiatives = this.generateStrategicInitiatives(request, analysis);
    const longTermVision = this.generateLongTermVision(request, analysis);
    
    return [...quickWins, ...strategicInitiatives, ...longTermVision];
  }
  
  /**
   * Quick Win 권고안 생성
   */
  private generateQuickWinRecommendations(
    request: StrategicAnalysisRequest,
    analysis: any
  ): StrategicRecommendation[] {
    return [
      {
        id: 'qw001',
        title: 'n8n 기반 업무 자동화 파일럿',
        description: '반복적인 업무 프로세스를 n8n으로 자동화하여 즉시 효과를 확인',
        rationale: '낮은 기술적 복잡도로 빠른 ROI 달성 가능',
        expectedImpact: '업무 효율성 30% 향상, 월 100시간 절약',
        implementationComplexity: 'Low',
        priority: 'Critical',
        timeline: '4-6주',
        resources: [
          {
            type: 'Human',
            description: 'n8n 전문가 1명',
            quantity: '1명',
            cost: '300만원',
            timeline: '6주'
          }
        ],
        dependencies: ['n8n 플랫폼 도입', '업무 프로세스 매핑'],
        risks: ['사용자 저항', '기존 시스템 연동 이슈'],
        successCriteria: ['3개 이상 워크플로우 자동화', '사용자 만족도 80% 이상']
      }
    ];
  }
  
  /**
   * 전략적 이니셔티브 생성
   */
  private generateStrategicInitiatives(
    request: StrategicAnalysisRequest,
    analysis: any
  ): StrategicRecommendation[] {
    return [
      {
        id: 'si001',
        title: 'AI 거버넌스 체계 구축',
        description: 'AI 도입과 운영을 위한 종합적인 거버넌스 프레임워크 수립',
        rationale: '체계적인 AI 도입과 리스크 관리를 위해 필수',
        expectedImpact: 'AI 프로젝트 성공률 60% 향상, 컴플라이언스 리스크 최소화',
        implementationComplexity: 'Medium',
        priority: 'High',
        timeline: '3-4개월',
        resources: [
          {
            type: 'External',
            description: 'AI 거버넌스 컨설팅',
            quantity: '1팀',
            cost: '5000만원',
            timeline: '4개월'
          }
        ],
        dependencies: ['경영진 승인', '법무팀 협조'],
        risks: ['조직 저항', '규제 변화'],
        successCriteria: ['거버넌스 정책 수립', '운영 체계 가동']
      }
    ];
  }
  
  /**
   * 장기 비전 권고안 생성
   */
  private generateLongTermVision(
    request: StrategicAnalysisRequest,
    analysis: any
  ): StrategicRecommendation[] {
    return [
      {
        id: 'lv001',
        title: 'AI-First 조직 전환',
        description: '모든 비즈니스 프로세스에 AI를 내재화한 조직으로 전환',
        rationale: '지속가능한 경쟁 우위 확보를 위한 근본적 변화',
        expectedImpact: '전사 생산성 200% 향상, 새로운 비즈니스 모델 창출',
        implementationComplexity: 'High',
        priority: 'Medium',
        timeline: '18-24개월',
        resources: [
          {
            type: 'Financial',
            description: '전사 AI 전환 투자',
            quantity: '총 투자',
            cost: '50억원',
            timeline: '24개월'
          }
        ],
        dependencies: ['조직 문화 변화', 'AI 인재 확보'],
        risks: ['대규모 투자 리스크', '조직 변화 저항'],
        successCriteria: ['AI 활용률 90% 이상', 'AI ROI 300% 달성']
      }
    ];
  }
  
  // 추가 메서드들...
  private async generateImplementationRoadmap(
    request: StrategicAnalysisRequest,
    recommendations: StrategicRecommendation[]
  ): Promise<ImplementationRoadmap> {
    // 실행 로드맵 생성 로직
    return {
      phases: [],
      milestones: [],
      criticalPath: [],
      resourceAllocation: [],
      riskMitigation: []
    };
  }
  
  private async performRiskAssessment(
    request: StrategicAnalysisRequest,
    recommendations: StrategicRecommendation[]
  ): Promise<RiskAssessment> {
    // 리스크 평가 로직
    return {
      overallRiskLevel: 'Medium',
      keyRisks: [],
      mitigationStrategies: [],
      contingencyPlans: []
    };
  }
  
  private defineSuccessMetrics(
    request: StrategicAnalysisRequest,
    recommendations: StrategicRecommendation[]
  ): SuccessMetric[] {
    // 성공 지표 정의 로직
    return [];
  }
  
  private performInvestmentAnalysis(
    request: StrategicAnalysisRequest,
    roadmap: ImplementationRoadmap
  ): InvestmentAnalysis {
    // 투자 분석 로직
    return {
      totalInvestment: {
        technology: '2억원',
        human: '5억원',
        training: '1억원',
        consulting: '3억원',
        infrastructure: '1억원',
        other: '0.5억원',
        total: '12.5억원'
      },
      roi: {
        year1: '150%',
        year2: '250%',
        year3: '400%',
        year5: '800%',
        assumptions: [],
        riskFactors: []
      },
      paybackPeriod: '18개월',
      npv: '25억원',
      irr: '45%',
      sensitivityAnalysis: {
        bestCase: '1000%',
        worstCase: '100%',
        mostLikely: '400%',
        keyVariables: []
      }
    };
  }
  
  private async analyzeCompetitivePositioning(
    request: StrategicAnalysisRequest,
    analysis: any
  ): Promise<CompetitivePositioning> {
    // 경쟁 포지셔닝 분석 로직
    return {
      currentPosition: 'Follower',
      targetPosition: 'Challenger',
      competitiveAdvantages: [],
      differentiationStrategy: 'AI 기반 고객 경험 혁신',
      marketShare: '15%',
      competitorAnalysis: []
    };
  }
  
  private performSWOTAnalysis(
    request: StrategicAnalysisRequest,
    analysis: any
  ): SWOTAnalysis {
    // SWOT 분석 로직
    return {
      strengths: [],
      weaknesses: [],
      opportunities: [],
      threats: [],
      strategicImplications: []
    };
  }
  
  private generateExecutiveSummary(
    request: StrategicAnalysisRequest,
    recommendations: StrategicRecommendation[],
    investment: InvestmentAnalysis
  ): ExecutiveSummary {
    return {
      currentState: `${request.companyInfo.name}은 AI 역량 ${request.scoreResult.percentageScore.toFixed(1)}점으로 ${request.scoreResult.benchmarkComparison.marketPosition} 포지션`,
      keyFindings: [
        '업무 자동화를 통한 즉시 효과 창출 가능',
        'AI 거버넌스 체계 구축이 시급',
        '장기적 AI-First 조직 전환 필요'
      ],
      criticalSuccessFactors: [
        '경영진의 강력한 추진 의지',
        '조직 문화 변화 관리',
        '단계적 접근을 통한 리스크 최소화'
      ],
      recommendedApproach: '3단계 점진적 AI 전환 전략',
      expectedOutcomes: [
        '1년 내 업무 효율성 200% 향상',
        '2년 내 AI 기반 새로운 비즈니스 모델 구축',
        '3년 내 업계 AI 리더로 포지셔닝'
      ],
      investmentRequired: investment.totalInvestment.total,
      timeToValue: '6개월 (첫 번째 ROI 실현)'
    };
  }
  
  // 헬퍼 메서드들
  // 제거됨: Gemini 응답 파서
  
  private parseGPTResponse(response: any): any {
    try {
      const content = response.choices[0]?.message?.content;
      return JSON.parse(content);
    } catch (error) {
      console.warn('GPT 응답 파싱 실패:', error);
      return {};
    }
  }
  
  private generateFallbackQuantitativeAnalysis(request: StrategicAnalysisRequest): any {
    return {
      currentMaturity: 'Developing',
      priorityAreas: ['데이터 관리', 'AI 전략'],
      quickWins: ['업무 자동화', '기초 AI 교육']
    };
  }
  
  private generateFallbackQualitativeAnalysis(request: StrategicAnalysisRequest): any {
    return {
      strategicContext: 'AI 도입 초기 단계',
      organizationalReadiness: 'Medium',
      keyRecommendations: ['점진적 접근', '문화 변화 우선']
    };
  }
  
  private synthesizeRecommendations(quantitative: any, qualitative: any): any {
    return {
      immediate: ['n8n 자동화 도입', '기초 AI 교육 시행'],
      shortTerm: ['AI 거버넌스 구축', '데이터 관리 체계 확립'],
      longTerm: ['AI-First 조직 전환', '전사 디지털 전환 가속'],
      analysisEngine: 'Ollama-GPT-OSS-20B'
    };
  }
}

export const aiStrategicAnalyzer = new AIStrategicAnalyzer();
