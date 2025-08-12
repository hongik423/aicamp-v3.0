// AI 역량진단 시스템 타입 정의

// 기업 기본정보 타입
export interface CompanyBasicInfo {
  companyName: string;
  businessRegistration?: string;
  establishmentYear: string;
  industryMain: string;
  businessModel: string[];
  mainProductsServices: string;
  targetCustomers: string;
  employeeCount: string;
  annualRevenue?: string;
}

// 현재 AI/디지털 활용 현황
export interface CurrentAIUsage {
  aiFamiliarity: number;
  currentAiTools: string[];
  aiUsageDepartments: string[];
  automationLevelByFunction: Record<string, number>;
  dataDigitalization: number;
  itSystems: string[];
  cloudUsage: string;
}

// 조직 문화 및 변화 준비도
export interface OrganizationReadiness {
  ceoAiCommitment: number;
  digitalTransformationPriority: number;
  employeeTechAcceptance: number;
  changeManagementExperience: string[];
  innovationCulture: number;
}

// 현재 직면 과제
export interface CurrentChallenges {
  biggestInefficiencies: string[];
  timeConsumingTasks: string;
  marketPressure: string[];
  competitiveDisadvantages?: string;
}

// AI 도입 목표
export interface AIGoals {
  aiTransformationGoals: string[];
  specificImprovements: string;
  kpiPriorities: string[];
  targetImprovements: Record<string, number>;
}

// 투자 계획
export interface InvestmentCapacity {
  aiBudgetRange: string;
  budgetAllocation: Record<string, number>;
  roiExpectations: string;
  implementationTimeline: string;
  internalResources: string[];
  supportNeeds: string[];
}

// 전체 진단 데이터
export interface AIDiagnosisData {
  // 기본 정보
  email: string;
  name: string;
  phone: string;
  department: string;
  
  // 섹션별 데이터
  companyInfo: CompanyBasicInfo;
  currentAIUsage: CurrentAIUsage;
  organizationReadiness: OrganizationReadiness;
  currentChallenges: CurrentChallenges;
  aiGoals: AIGoals;
  investmentCapacity: InvestmentCapacity;
  
  // 메타 정보
  timestamp?: string;
  diagnosisId?: string;
}

// SWOT 분석 타입
export interface SWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

// 로드맵 단계
export interface RoadmapPhase {
  phase: number;
  title: string;
  period: string;
  objectives: string;
  keyTasks: string[];
  investment: string;
  expectedOutcome: string;
}

// 우선순위 매트릭스
export interface PriorityMatrix {
  urgentImportant: string[];
  importantNotUrgent: string[];
  urgentNotImportant: string[];
  notUrgentNotImportant: string[];
}

// ROI 분석
export interface ROIAnalysis {
  totalInvestment: string;
  annualSavings: string;
  yearOneROI: number;
  threeYearROI: number;
  paybackPeriod: string;
}

// 진단 결과 보고서
export interface DiagnosisReport {
  diagnosisId: string;
  companyName: string;
  generatedAt: string;
  
  // 종합 점수
  overallScore: number;
  maturityLevel: string;
  industryPercentile: number;
  
  // 핵심 인사이트
  keyFindings: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
  };
  
  // 분석 결과
  swotAnalysis: SWOTAnalysis;
  priorityMatrix: PriorityMatrix;
  roadmap: RoadmapPhase[];
  roiAnalysis: ROIAnalysis;
  
  // 권고사항
  recommendations: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  
  // AICAMP 제안
  aicampProposal: {
    recommendedCourses: string[];
    consultingPhases: Array<{
      phase: string;
      description: string;
      duration: string;
    }>;
  };
}

// 설문 문항 타입
export interface Question {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'scale' | 'matrix' | 'rank' | 'percentage';
  question: string;
  placeholder?: string;
  required: boolean;
  options?: string[] | Array<{ value: string; label: string }>;
  scale?: {
    min: number;
    max: number;
    labels: string[];
  };
  validation?: string;
  minLength?: number;
  maxSelections?: number;
  categories?: string[];
  functions?: string[];
  areas?: string[];
  totalPercentage?: number;
}

export interface QuestionGroup {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface DiagnosisSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  questionGroups: QuestionGroup[];
}

// API 응답 타입
export interface DiagnosisSubmissionResponse {
  success: boolean;
  diagnosisId?: string;
  reportUrl?: string;
  error?: string;
  message?: string;
}

// 진행 상태 타입
export interface DiagnosisProgress {
  currentSection: number;
  completedSections: number[];
  totalSections: number;
  completionPercentage: number;
  lastSavedAt?: string;
}
