import { LucideIcon } from 'lucide-react';

// 기본 인터페이스
export interface CompanyInfo {
  industry: string;
  employees: string;
  revenue: string;
  location: string;
}

export interface Challenge {
  title: string;
  description: string;
  impact: string;
}

export interface CurriculumModule {
  title: string;
  duration: string;
  description: string;
}

export interface Curriculum {
  basic: CurriculumModule[];
  advanced: CurriculumModule[];
  executive: CurriculumModule[];
}

export interface ProcessPhase {
  phase: string;
  duration: string;
  activities: string[];
  results: string[];
}

export interface QuantitativeResult {
  metric: string;
  before: string;
  after: string;
  improvement: string;
}

export interface FinancialResult {
  item: string;
  amount: string;
}

export interface Results {
  quantitative: QuantitativeResult[];
  financial: FinancialResult[];
  qualitative: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
}

export interface FollowUpResult {
  metric: string;
  achievement: string;
}

// 메인 성공사례 상세 인터페이스
export interface SuccessCaseDetail {
  id: string;
  category: string;
  industry: string;
  companyName: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  color: string;
  heroImage: string;
  companyInfo: CompanyInfo;
  challenges: Challenge[];
  curriculum: Curriculum;
  process: ProcessPhase[];
  results: Results;
  testimonial: Testimonial;
  followUpResults: FollowUpResult[];
  tags: string[];
}

// 성공사례 목록용 간소화 인터페이스
export interface SuccessCase {
  id: string;
  category: string;
  industry: string;
  companyName: string;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  color: string;
  results: {
    efficiency: string;
    satisfaction: string;
  };
  tags: string[];
  aiTools?: string[];
  appliedModules?: string;
}

// 성공사례 상세 데이터 컬렉션 타입
export type SuccessCaseDetailsCollection = {
  [key: string]: SuccessCaseDetail;
};

// 유틸리티 타입
export type CaseCategory = 
  | 'manufacturing' 
  | 'service' 
  | 'startup' 
  | 'investment' 
  | 'certification' 
  | 'logistics' 
  | 'healthcare' 
  | 'edutech' 
  | 'ecommerce' 
  | 'professional' 
  | 'construction' 
  | 'finance' 
  | 'telecom' 
  | 'media' 
  | 'energy' 
  | 'agriculture';

export type CaseColor = 
  | 'blue' 
  | 'green' 
  | 'purple' 
  | 'red' 
  | 'orange' 
  | 'yellow' 
  | 'indigo' 
  | 'pink';

// 데이터 검증 함수들
export const validateSuccessCaseDetail = (data: any): data is SuccessCaseDetail => {
  return (
    typeof data === 'object' &&
    typeof data.id === 'string' &&
    typeof data.category === 'string' &&
    typeof data.industry === 'string' &&
    typeof data.companyName === 'string' &&
    typeof data.title === 'string' &&
    typeof data.subtitle === 'string' &&
    typeof data.description === 'string' &&
    typeof data.color === 'string' &&
    typeof data.heroImage === 'string' &&
    data.companyInfo &&
    Array.isArray(data.challenges) &&
    data.curriculum &&
    Array.isArray(data.process) &&
    data.results &&
    data.testimonial &&
    Array.isArray(data.followUpResults) &&
    Array.isArray(data.tags)
  );
};

export const validateCurriculum = (curriculum: any): curriculum is Curriculum => {
  return (
    curriculum &&
    Array.isArray(curriculum.basic) &&
    Array.isArray(curriculum.advanced) &&
    Array.isArray(curriculum.executive)
  );
};

export const validateResults = (results: any): results is Results => {
  return (
    results &&
    Array.isArray(results.quantitative) &&
    Array.isArray(results.financial) &&
    Array.isArray(results.qualitative)
  );
};
