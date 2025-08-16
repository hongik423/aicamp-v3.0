/**
 * 🎯 Enhanced Score Engine
 * 고급 AI 역량진단 점수 계산 및 분석 엔진
 */

export interface EnhancedScoreResult {
  totalScore: number;
  maturityLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  percentile: number;
  categoryScores: {
    businessFoundation?: number; // 비즈니스 기반 (신규)
    currentAI: number;
    organizationReadiness: number;
    techInfra: number;
    dataManagement?: number; // 호환성을 위해 유지
    strategicPlanning?: number; // 호환성을 위해 유지
    goalClarity?: number; // 목표 명확성 (신규)
    executionCapability?: number; // 실행 역량 (신규)
  };
  categoryStats?: {
    [key: string]: {
      responses: number;
      average: number;
      min: number;
      max: number;
    };
  };
  detailedAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    recommendations: string[];
  };
  rawResponses?: any; // 원본 응답 데이터
  responseCount?: number; // 실제 응답 수
}

export interface BenchmarkGapAnalysis {
  industryAverage: number;
  peerComparison: 'above' | 'below' | 'average';
  improvementAreas: string[];
  competitivePosition?: string;
  industryGap?: {
    total: number;
  };
  sizeGap?: {
    total: number;
  };
}

export interface EnhancedSWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface ThreeDimensionalMatrix {
  highImpactHighEffort: string[];
  highImpactLowEffort: string[];
  lowImpactHighEffort: string[];
  lowImpactLowEffort: string[];
}