/**
 * 🎯 Enhanced Score Engine
 * 고급 AI 역량진단 점수 계산 및 분석 엔진
 */

export interface EnhancedScoreResult {
  totalScore: number;
  maturityLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  percentile: number;
  categoryScores: {
    currentAI: number;
    organizationReadiness: number;
    techInfra: number;
    dataManagement: number;
    strategicPlanning: number;
  };
  detailedAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    recommendations: string[];
  };
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