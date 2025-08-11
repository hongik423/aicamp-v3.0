'use client';

import { CurriculumData } from '@/types/curriculum.types';
import { 
  manufacturingCurriculum,
  serviceCurriculum,
  startupCurriculum
} from './manufacturing-service-startup';
import {
  professionalCurriculum,
  financeCurriculum,
  logisticsCurriculum
} from './professional-finance-logistics';
import {
  constructionCurriculum,
  telecomCurriculum,
  mediaCurriculum
} from './construction-telecom-media';
import {
  energyCurriculum,
  agricultureCurriculum,
  healthcareCurriculum
} from './energy-agriculture-healthcare';
import {
  ecommerceCurriculum,
  certificationCurriculum,
  investmentCurriculum,
  edutechCurriculum
} from './ecommerce-certification-investment-edutech';

export const curriculumData: CurriculumData = {
  manufacturing: manufacturingCurriculum,
  service: serviceCurriculum,
  startup: startupCurriculum,
  professional: professionalCurriculum,
  finance: financeCurriculum,
  logistics: logisticsCurriculum,
  construction: constructionCurriculum,
  telecom: telecomCurriculum,
  media: mediaCurriculum,
  energy: energyCurriculum,
  agriculture: agricultureCurriculum,
  healthcare: healthcareCurriculum,
  ecommerce: ecommerceCurriculum,
  certification: certificationCurriculum,
  investment: investmentCurriculum,
  edutech: edutechCurriculum
};

// 업종별 아이콘과 색상 매핑
export const industryConfig = {
  manufacturing: { 
    icon: 'Factory', 
    color: 'bg-blue-500',
    gradient: 'from-blue-500 to-blue-600'
  },
  service: { 
    icon: 'Heart', 
    color: 'bg-pink-500',
    gradient: 'from-pink-500 to-pink-600'
  },
  startup: { 
    icon: 'Rocket', 
    color: 'bg-purple-500',
    gradient: 'from-purple-500 to-purple-600'
  },
  professional: { 
    icon: 'Briefcase', 
    color: 'bg-indigo-500',
    gradient: 'from-indigo-500 to-indigo-600'
  },
  finance: { 
    icon: 'TrendingUp', 
    color: 'bg-green-500',
    gradient: 'from-green-500 to-green-600'
  },
  logistics: { 
    icon: 'Package', 
    color: 'bg-orange-500',
    gradient: 'from-orange-500 to-orange-600'
  },
  construction: { 
    icon: 'Building2', 
    color: 'bg-amber-500',
    gradient: 'from-amber-500 to-amber-600'
  },
  telecom: { 
    icon: 'Wifi', 
    color: 'bg-cyan-500',
    gradient: 'from-cyan-500 to-cyan-600'
  },
  media: { 
    icon: 'Video', 
    color: 'bg-red-500',
    gradient: 'from-red-500 to-red-600'
  },
  energy: { 
    icon: 'Sun', 
    color: 'bg-yellow-500',
    gradient: 'from-yellow-500 to-yellow-600'
  },
  agriculture: { 
    icon: 'Leaf', 
    color: 'bg-emerald-500',
    gradient: 'from-emerald-500 to-emerald-600'
  },
  healthcare: { 
    icon: 'Heart', 
    color: 'bg-rose-500',
    gradient: 'from-rose-500 to-rose-600'
  },
  ecommerce: { 
    icon: 'ShoppingCart', 
    color: 'bg-violet-500',
    gradient: 'from-violet-500 to-violet-600'
  },
  certification: { 
    icon: 'Shield', 
    color: 'bg-teal-500',
    gradient: 'from-teal-500 to-teal-600'
  },
  investment: { 
    icon: 'BarChart3', 
    color: 'bg-slate-500',
    gradient: 'from-slate-500 to-slate-600'
  },
  edutech: { 
    icon: 'GraduationCap', 
    color: 'bg-fuchsia-500',
    gradient: 'from-fuchsia-500 to-fuchsia-600'
  }
};
