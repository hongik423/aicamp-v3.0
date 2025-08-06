'use client';

// AI 역량진단 신청 데이터 타입
export interface DiagnosisApplicationData {
  // 기본 정보
  companyName: string;
  industry: string;
  customIndustry?: string; // 기타 업종 직접 입력
  companySize: string;
  region: string;
  
  // 신청자 정보
  applicantName: string;
  position: string;
  email: string;
  phone: string;
  
  // 사업 정보
  businessDetails: string;
  mainConcerns: string[];
  expectedBenefits: string[];
  
  // AI 역량 평가 응답
  assessmentResponses: {
    [questionId: string]: number; // 1-5점
  };
  
  // 추가 정보
  currentAIUsage?: string;
  aiInvestmentPlan?: string;
  additionalRequests?: string;
  
  // 동의 사항
  privacyConsent: boolean;
  marketingConsent: boolean;
  
  // 시스템 정보
  submittedAt?: string;
  diagnosisId?: string;
}

// 진단 결과 타입
export interface DiagnosisResult {
  diagnosisId: string;
  companyName: string;
  submittedAt: string;
  
  // 종합 점수
  totalScore: number;
  grade: string;
  gradeDescription: string;
  
  // 영역별 점수
  categoryScores: {
    leadership: number;
    infrastructure: number;
    employeeCapability: number;
    culture: number;
    practicalApplication: number;
    dataCapability: number;
  };
  
  // 벤치마크 분석
  benchmarkAnalysis: {
    industryAverage: number;
    gap: number;
    percentile: number;
    competitivePosition: string;
  };
  
  // SWOT 분석
  swotAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  
  // 전략 제안
  strategies: {
    SO: string[]; // 강점-기회
    WO: string[]; // 약점-기회
    ST: string[]; // 강점-위협
    WT: string[]; // 약점-위협
  };
  
  // 실행 로드맵
  roadmap: {
    immediate: ActionItem[]; // 0-3개월
    shortTerm: ActionItem[]; // 3-6개월
    midTerm: ActionItem[]; // 6-12개월
    longTerm: ActionItem[]; // 1년 이상
  };
  
  // 추천 교육과정
  recommendedPrograms: RecommendedProgram[];
  
  // AI 고몰입 조직 구축 방안
  highEngagementPlan: {
    vision: string;
    coreValues: string[];
    keyInitiatives: Initiative[];
    expectedOutcomes: string[];
  };
}

export interface ActionItem {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedDuration: string;
  expectedImpact: string;
}

export interface RecommendedProgram {
  name: string;
  category: string;
  level: string;
  duration: string;
  description: string;
  relevanceScore: number;
}

export interface Initiative {
  name: string;
  objective: string;
  keyActions: string[];
  kpis: string[];
  timeline: string;
}

// 폼 검증 스키마를 위한 타입
export interface DiagnosisFormData extends DiagnosisApplicationData {
  // 폼 전용 필드들
}

// API 응답 타입
export interface DiagnosisApiResponse {
  success: boolean;
  diagnosisId?: string;
  reportPassword?: string; // 6자리 보고서 접근 패스워드
  message?: string;
  error?: string;
}

// 진단 상태 타입
export type DiagnosisStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface DiagnosisStatusInfo {
  status: DiagnosisStatus;
  message: string;
  progress?: number;
  estimatedTime?: string;
}