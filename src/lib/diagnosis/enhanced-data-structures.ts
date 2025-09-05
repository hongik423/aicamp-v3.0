/**
 * 📊 V3.0 Enhanced Data Structures
 * PRD 요구사항에 완벽히 맞춘 데이터 구조 정의
 */

export enum IndustryType {
  MANUFACTURING = '제조업',
  SERVICE = '서비스업',
  IT_SOFTWARE = 'IT/소프트웨어',
  FINANCE = '금융/보험업',
  CONSTRUCTION = '건설업',
  EDUCATION = '교육/에듀테크',
  HEALTHCARE = '의료/헬스케어',
  LOGISTICS = '운송/물류업',
  AGRICULTURE = '농업',
  RETAIL = '유통/소매업'
}

export enum EmployeeRange {
  UNDER_10 = '10명 이하',
  BETWEEN_11_50 = '11-50명',
  BETWEEN_51_100 = '51-100명',
  BETWEEN_101_300 = '101-300명',
  BETWEEN_301_1000 = '301-1000명',
  OVER_1000 = '1000명 이상'
}

export enum RevenueRange {
  UNDER_100M = '1억 미만',
  BETWEEN_100M_1B = '1-10억',
  BETWEEN_1B_5B = '10-50억',
  BETWEEN_5B_10B = '50-100억',
  BETWEEN_10B_50B = '100-500억',
  OVER_50B = '500억 이상'
}

export enum LocationType {
  SEOUL = '서울',
  GYEONGGI = '경기',
  BUSAN = '부산',
  DAEGU = '대구',
  INCHEON = '인천',
  GWANGJU = '광주',
  DAEJEON = '대전',
  ULSAN = '울산',
  OTHER = '기타'
}

export enum AIUsageLevel {
  NONE = 'NONE',
  BASIC = 'BASIC',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT'
}

export enum BudgetRange {
  UNDER_50M = 'UNDER_50M',
  BUDGET_50_100M = 'BUDGET_50_100M',
  BUDGET_100_300M = 'BUDGET_100_300M',
  BUDGET_300_500M = 'BUDGET_300_500M',
  BUDGET_OVER_500M = 'BUDGET_OVER_500M'
}

export interface AIDiagnosisApplication {
  companyInfo: {
    companyName: string;
    industry: IndustryType;
    contactPerson: string;
    email: string;
    employeeCount: EmployeeRange;
    annualRevenue: RevenueRange;
    location: LocationType;
    phoneNumber?: string;
    department: string;
  };
  aiContext: {
    currentAIUsage: AIUsageLevel;
    aiInvestmentBudget: BudgetRange;
    aiGoals: string[];
    priorityAreas: string[];
    timeframe: string;
  };
  assessmentScores: {
    businessFoundation: number[];
    currentAIAdoption: number[];
    organizationalReadiness: number[];
    technicalInfrastructure: number[];
    goalClarity: number[];
    executionCapability: number[];
  };
  privacy: {
    dataProcessingConsent: boolean;
    marketingConsent: boolean;
    consentDateTime: Date;
    ipAddress: string;
    consentVersion: string;
  };
  metadata: {
    submissionDate: Date;
    completionDate?: Date;
    sessionId: string;
    deviceInfo: string;
    browserInfo: string;
    language: string;
  };
}

export interface AICapabilityAnalysis {
  overallScore: number;
  grade: string;
  maturityLevel: string;
  categoryScores: {
    businessFoundation: number;
    currentAIAdoption: number;
    organizationalReadiness: number;
    technicalInfrastructure: number;
    goalClarity: number;
    executionCapability: number;
  };
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  recommendations: string[];
  industryBenchmark: {
    average: number;
    top10: number;
    growth: string;
  };
}

export interface AICapabilityReport {
  diagnosisId: string;
  companyInfo: AIDiagnosisApplication['companyInfo'];
  analysis: AICapabilityAnalysis;
  industryInsights: {
    characteristics: string[];
    n8nOpportunities: string[];
    benchmarks: any;
    aiFocus: number;
    practicalFocus: number;
    successStories: Array<{ company: string; description: string }>;
  };
  reportMetadata: {
    generatedAt: Date;
    version: string;
    qualityScore: number;
    pageCount: number;
    processingTime: number;
  };
}

export interface ReportOptions {
  useAdvancedAnalysis?: boolean;
  includeCharts?: boolean;
  includeBenchmarks?: boolean;
  format?: 'html' | 'pdf' | 'json';
  language?: 'ko' | 'en';
  n8nEnhanced?: boolean;
  worldClassLevel?: boolean;
  skipValidation?: boolean;
  qualityThreshold?: number;
}

export interface ReportMetadata {
  diagnosisId: string;
  companyName: string;
  industry: IndustryType;
  totalScore: number;
  grade: string;
  maturityLevel: string;
  createdAt: string;
  fileSize: number;
  version: string;
  storageType: string;
  qualityScore?: number;
  processingTime?: number;
}

export interface StorageResult {
  success: boolean;
  fileName?: string;
  fileUrl?: string;
  fileId?: string;
  folderId?: string;
  savedAt?: Date;
  fileSize?: number;
  errorMessage?: string;
  storageMethod: 'gas-api' | 'local-download' | 'direct-upload';
}

export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
  completionPercentage: number;
  nextStepReady: boolean;
  qualityScore?: number;
  warnings?: string[];
}

export interface StepValidation {
  stepName: string;
  isValid: boolean;
  errorMessage?: string;
  completionPercentage: number;
  nextStepReady: boolean;
  qualityScore?: number;
  warnings?: string[];
  data?: any;
}
