'use client';

import { LucideIcon } from 'lucide-react';

// ========== 교육 프로세스 관련 타입 ==========
export interface EducationProcess {
  phase: string;
  title: string;
  duration: string;
  activities: string[];
  deliverables: string[];
  keyMetrics: string[];
}

export interface EducationPerformance {
  metric: string;
  before: string;
  after: string;
  improvement: string;
  icon?: LucideIcon;
}

export interface IndustryCustomization {
  industry: string;
  specificChallenges: string[];
  customSolutions: string[];
  expectedOutcomes: string[];
}

// ========== 커리큘럼 관련 타입 ==========
export interface CurriculumModule {
  moduleId: string;
  title: string;
  duration: string;
  objectives: string[];
  topics: string[];
  practicalExercises: string[];
  tools: string[];
  outcomes: string[];
}

export interface CurriculumOverview {
  totalDuration: string;
  participantCount: string;
  completionRate: string;
  satisfactionScore: string;
  keyHighlights: string[];
}

export interface EnhancedCurriculum {
  overview: CurriculumOverview;
  basic: CurriculumModule[];
  advanced: CurriculumModule[];
  executive: CurriculumModule[];
  industrySpecific: CurriculumModule[];
  customization: IndustryCustomization;
}

// ========== 맞춤 추천 관련 타입 ==========
export interface CustomRecommendation {
  recommendationType: string;
  title: string;
  description: string;
  benefits: string[];
  prerequisites: string[];
  estimatedDuration: string;
  expectedROI: string;
}

export interface EducationModel {
  modelName: string;
  targetAudience: string;
  objectives: string[];
  methodology: string;
  deliveryFormat: string;
  assessment: string;
}

export interface ImplementationPhase {
  phaseNumber: number;
  phaseName: string;
  duration: string;
  objectives: string[];
  activities: string[];
  milestones: string[];
  risks: string[];
  mitigations: string[];
}

export interface CustomizedProposal {
  curriculumRecommendation: CustomRecommendation[];
  educationModels: EducationModel[];
  customizationProposal: {
    companySpecific: string[];
    industryAlignment: string[];
    culturalFit: string[];
  };
  implementationPlan: ImplementationPhase[];
}

// ========== AICAMP 프로세스 관련 타입 ==========
export interface AICampProcess {
  stepNumber: number;
  stepName: string;
  description: string;
  duration: string;
  responsible: string;
  tools: string[];
  inputs: string[];
  outputs: string[];
  successCriteria: string[];
}

export interface ProcessTimeline {
  totalDuration: string;
  phases: {
    phase: string;
    startWeek: number;
    endWeek: number;
    milestones: string[];
  }[];
  criticalPath: string[];
  dependencies: {
    from: string;
    to: string;
    type: 'blocking' | 'optional';
  }[];
}

// ========== 성과 관련 타입 ==========
export interface QuantitativeMetric {
  category: string;
  metric: string;
  baseline: string;
  target: string;
  achieved: string;
  improvement: string;
  verificationMethod: string;
}

export interface FinancialMetric {
  category: string;
  item: string;
  amount: string;
  period: string;
  roi: string;
  paybackPeriod: string;
}

export interface QualitativeOutcome {
  area: string;
  description: string;
  evidence: string[];
  stakeholderFeedback: string;
}

export interface EnhancedResults {
  quantitative: QuantitativeMetric[];
  financial: FinancialMetric[];
  qualitative: QualitativeOutcome[];
  certifications: string[];
  awards: string[];
}

// ========== 핵심 성과 지표 관련 타입 ==========
export interface KPIMetric {
  kpiName: string;
  category: string;
  target: string;
  actual: string;
  variance: string;
  trend: 'up' | 'down' | 'stable';
  status: 'exceeded' | 'met' | 'below';
}

export interface SWOTAnalysis {
  strengths: {
    factor: string;
    impact: 'high' | 'medium' | 'low';
    evidence: string;
  }[];
  weaknesses: {
    factor: string;
    impact: 'high' | 'medium' | 'low';
    mitigation: string;
  }[];
  opportunities: {
    factor: string;
    potential: 'high' | 'medium' | 'low';
    actionPlan: string;
  }[];
  threats: {
    factor: string;
    likelihood: 'high' | 'medium' | 'low';
    contingency: string;
  }[];
}

export interface PerformanceDashboard {
  kpis: KPIMetric[];
  processTimeline: ProcessTimeline;
  financialAnalysis: {
    totalInvestment: string;
    totalSavings: string;
    netBenefit: string;
    roi: string;
    irrRate: string;
    npv: string;
  };
  swotAnalysis: SWOTAnalysis;
}

// ========== 후기 및 추가 성과 관련 타입 ==========
export interface DetailedTestimonial {
  author: string;
  position: string;
  company: string;
  date: string;
  rating: number;
  title: string;
  content: string;
  keyBenefits: string[];
  challenges: string[];
  recommendations: string[];
  wouldRecommend: boolean;
  npsScore: number;
}

export interface FollowUpMetric {
  period: string;
  metric: string;
  value: string;
  trend: 'improving' | 'stable' | 'declining';
  actions: string[];
}

export interface LongTermImpact {
  sixMonthResults: FollowUpMetric[];
  oneYearResults: FollowUpMetric[];
  sustainabilityMeasures: string[];
  continuousImprovement: string[];
  scalabilityAchievements: string[];
}

// ========== n8n 워크플로우 고도화 타입 ==========
export interface EnhancedN8nWorkflow {
  workflowId: string;
  workflowName: string;
  category: string;
  description: string;
  complexity: 'simple' | 'moderate' | 'complex';
  nodes: {
    nodeType: string;
    nodeName: string;
    configuration: Record<string, any>;
  }[];
  triggers: string[];
  integrations: string[];
  dataFlow: {
    input: string;
    processing: string[];
    output: string;
  };
  performance: {
    executionTime: string;
    successRate: string;
    errorRate: string;
    monthlyExecutions: number;
  };
  benefits: string[];
  customizations: string[];
}

// ========== 메인 성공사례 인터페이스 ==========
export interface EnhancedSuccessCaseDetail {
  // 기본 정보
  id: string;
  category: string;
  industry: string;
  subIndustry: string;
  companyName: string;
  companySize: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  color: string;
  heroImage: string;
  gallery: string[];
  
  // 회사 정보
  companyInfo: {
    industry: string;
    subIndustry: string;
    employees: string;
    revenue: string;
    location: string;
    established: string;
    website?: string;
    certifications: string[];
  };
  
  // 교육 프로세스 & 성과
  educationProcess: EducationProcess[];
  educationPerformance: EducationPerformance[];
  industryCustomization: IndustryCustomization;
  
  // 커리큘럼
  curriculum: EnhancedCurriculum;
  
  // 맞춤 추천
  customizedProposal: CustomizedProposal;
  
  // AICAMP 프로세스
  aicampProcess: AICampProcess[];
  
  // 성과
  results: EnhancedResults;
  
  // 핵심 성과 지표
  performanceDashboard: PerformanceDashboard;
  
  // n8n 워크플로우
  n8nWorkflows: EnhancedN8nWorkflow[];
  
  // AI 구현
  aiImplementations: {
    aiTool: string;
    useCase: string;
    model: string;
    accuracy: string;
    performance: string;
    integration: string;
    benefits: string[];
  }[];
  
  // 부서별 자동화
  departmentAutomations: {
    department: string;
    processes: string[];
    automationLevel: string;
    timeSaved: string;
    costSaved: string;
    qualityImprovement: string;
    employeeSatisfaction: string;
  }[];
  
  // 후기 & 장기 성과
  testimonials: DetailedTestimonial[];
  longTermImpact: LongTermImpact;
  
  // 메타 정보
  tags: string[];
  relatedCases: string[];
  resources: {
    type: 'video' | 'pdf' | 'presentation' | 'webinar';
    title: string;
    url: string;
    description: string;
  }[];
  featured: boolean;
  publishDate: string;
  lastUpdated: string;
  viewCount: number;
  downloadCount: number;
}

// ========== 업종별 카테고리 ==========
export const INDUSTRY_CATEGORIES = {
  IT_TECH: {
    name: 'IT/기술',
    count: 10,
    subIndustries: [
      '소프트웨어개발', 'SaaS/클라우드', 'AI/머신러닝', '빅데이터',
      '사이버보안', '블록체인', 'IoT', '게임개발', '핀테크', 'IT서비스'
    ]
  },
  MANUFACTURING: {
    name: '제조/생산',
    count: 10,
    subIndustries: [
      '전자/반도체', '기계/장비', '화학/석유화학', '제약/의료기기',
      '식품/음료', '섬유/의류', '철강/금속', '조선/해양', '항공/우주', '자동차'
    ]
  },
  FINANCE: {
    name: '금융/보험',
    count: 7,
    subIndustries: [
      '은행', '증권', '보험', '카드', '캐피탈', '자산운용', '핀테크'
    ]
  },
  RETAIL_SERVICE: {
    name: '유통/서비스',
    count: 8,
    subIndustries: [
      '오프라인소매', '이커머스', '도매업', '패션/부티크',
      '외식/카페', '숙박/호텔', '여행/관광', '배달/플랫폼'
    ]
  },
  HEALTHCARE: {
    name: '의료/헬스케어',
    count: 7,
    subIndustries: [
      '병원', '의원', '약국', '의료기기', '헬스케어IT', '바이오', '제약'
    ]
  },
  EDUCATION: {
    name: '교육/연구',
    count: 7,
    subIndustries: [
      '대학', '초중고', '학원', '온라인교육', '기업교육', '연구소', '에듀테크'
    ]
  },
  CONSTRUCTION: {
    name: '건설/부동산',
    count: 7,
    subIndustries: [
      '종합건설', '전문건설', '건축설계', '토목/인프라',
      '부동산개발', '자산관리', '임대업'
    ]
  },
  LOGISTICS: {
    name: '운송/물류',
    count: 7,
    subIndustries: [
      '육상운송', '해상운송', '항공운송', '물류창고',
      '택배', '국제물류', '콜드체인'
    ]
  },
  MEDIA: {
    name: '미디어/콘텐츠',
    count: 7,
    subIndustries: [
      '방송', '신문', '출판', '광고', '영화/영상', '음악', '게임'
    ]
  },
  PROFESSIONAL: {
    name: '전문서비스',
    count: 7,
    subIndustries: [
      '법률', '회계', '경영컨설팅', 'IT컨설팅',
      'HR/인사노무', '마케팅에이전시', '디자인/브랜딩'
    ]
  },
  ENERGY: {
    name: '에너지/환경',
    count: 6,
    subIndustries: [
      '전력/발전', '신재생에너지', '석유/가스', '환경서비스', '폐기물처리', '수처리'
    ]
  },
  AGRICULTURE: {
    name: '농업/수산업',
    count: 5,
    subIndustries: [
      '농업/농산물', '축산업', '수산업', '임업', '스마트팜'
    ]
  },
  TELECOM: {
    name: '통신/네트워크',
    count: 4,
    subIndustries: [
      '이동통신', '유선통신', '인터넷서비스', '네트워크장비'
    ]
  },
  PUBLIC: {
    name: '공공/비영리',
    count: 4,
    subIndustries: [
      '정부기관', '공기업', '비영리단체', '국제기구'
    ]
  }
} as const;
