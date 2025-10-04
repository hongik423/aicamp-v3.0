export interface CurriculumModule {
  id: string;
  title: string;
  duration: string;
  description: string;
  objectives: string[];
  topics: string[];
  practicalExercises: string[];
  expectedOutcomes: string[];
  prerequisites?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'executive';
  category: 'basic' | 'advanced' | 'executive';
}

export interface IndustrySpecificCurriculum {
  industryType: string;
  industryCode: string;
  basic: CurriculumModule[];
  advanced: CurriculumModule[];
  executive: CurriculumModule[];
  specializedModules?: CurriculumModule[];
}

export interface CurriculumPathway {
  id: string;
  name: string;
  description: string;
  targetAudience: string[];
  totalDuration: string;
  modules: CurriculumModule[];
  prerequisites: string[];
  outcomes: string[];
  certification: string;
}

export interface SuccessCaseCurriculum {
  caseId: string;
  appliedCurriculum: {
    basic: CurriculumModule[];
    advanced: CurriculumModule[];
    executive: CurriculumModule[];
  };
  customizations: string[];
  implementationProcess: {
    phase: string;
    duration: string;
    activities: string[];
    results: string[];
  }[];
  measuredOutcomes: {
    quantitative: Array<{
      metric: string;
      before: string;
      after: string;
      improvement: string;
    }>;
    qualitative: string[];
  };
}

export interface CurriculumRecommendation {
  recommendedModules: CurriculumModule[];
  customizationSuggestions: string[];
  estimatedDuration: string;
  expectedROI: string;
  implementationPlan: string[];
}
