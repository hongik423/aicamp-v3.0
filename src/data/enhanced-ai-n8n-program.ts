'use client';

import { LucideIcon } from 'lucide-react';
import { 
  Brain, 
  Zap, 
  Users, 
  Target, 
  TrendingUp, 
  Settings, 
  Award,
  Lightbulb,
  Shield,
  Rocket,
  Heart,
  Star
} from 'lucide-react';

// 고도화된 AI & N8N 프로그램 타입 정의
export interface EnhancedProgramModule {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  difficulty: 'basic' | 'intermediate' | 'advanced' | 'expert';
  category: 'foundation' | 'technical' | 'leadership' | 'culture' | 'innovation';
  icon: LucideIcon;
  color: string;
  description: string;
  objectives: string[];
  keyFeatures: string[];
  practicalProjects: string[];
  expectedOutcomes: string[];
  targetAudience: string[];
  prerequisites: string[];
  tools: string[];
  roi: {
    productivity: string;
    engagement: string;
    retention: string;
    innovation: string;
  };
}

export interface HighEngagementProgram {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  vision: string;
  totalDuration: string;
  participantCapacity: number;
  modules: EnhancedProgramModule[];
  organizationalBenefits: {
    shortTerm: string[];
    mediumTerm: string[];
    longTerm: string[];
  };
  culturalTransformation: {
    phase1: string[];
    phase2: string[];
    phase3: string[];
  };
  successMetrics: {
    engagement: string[];
    productivity: string[];
    innovation: string[];
    retention: string[];
  };
}

// 최상의 고몰입 조직구축 AI & N8N 프로그램
export const HIGH_ENGAGEMENT_AI_PROGRAM: HighEngagementProgram = {
  id: 'high-engagement-ai-n8n-2024',
  title: '고몰입 조직구축을 위한 AI & N8N 마스터 프로그램',
  subtitle: '조직문화 혁신과 AI 도입을 동시에 달성하는 통합 솔루션',
  description: 'AI 기술 도입과 조직문화 혁신을 융합하여 구성원의 몰입도를 극대화하고 지속 가능한 성장 동력을 확보하는 혁신적인 프로그램',
  vision: '모든 구성원이 AI와 함께 성장하며, 높은 몰입도로 혁신을 주도하는 조직 구축',
  totalDuration: '16주 (128시간)',
  participantCapacity: 30,
  
  modules: [
    // Phase 1: 기반 구축 및 마인드셋 전환
    {
      id: 'ai-mindset-transformation',
      title: 'AI 마인드셋 전환과 조직문화 혁신',
      subtitle: '두려움을 넘어 AI와 함께하는 미래 조직 만들기',
      duration: '16시간 (2주)',
      difficulty: 'basic',
      category: 'foundation',
      icon: Brain,
      color: 'blue',
      description: 'AI에 대한 올바른 이해와 긍정적 마인드셋 형성을 통해 조직 전체의 AI 도입 기반을 마련',
      objectives: [
        'AI 기술에 대한 정확한 이해와 두려움 해소',
        '개인과 조직의 AI 활용 비전 수립',
        'AI 시대의 새로운 업무 방식 설계',
        '구성원 간 AI 학습 문화 조성'
      ],
      keyFeatures: [
        '개인별 AI 역량 진단 및 맞춤형 학습 경로 제공',
        '실제 업무 사례 기반 AI 적용 시나리오 워크숍',
        '부서별 AI 도입 로드맵 공동 수립',
        'AI 윤리와 책임감 있는 활용 교육'
      ],
      practicalProjects: [
        '개인 업무 AI 적용 계획서 작성',
        '부서별 AI 도입 우선순위 매트릭스 개발',
        'AI 활용 성공사례 스토리텔링',
        '조직 AI 문화 선언문 공동 작성'
      ],
      expectedOutcomes: [
        'AI에 대한 긍정적 인식 95% 이상 달성',
        '개인별 AI 활용 목표 100% 수립',
        '부서별 AI 도입 계획 구체화',
        '조직 내 AI 학습 문화 기반 조성'
      ],
      targetAudience: ['전 직원', '팀장급 이상', '경영진'],
      prerequisites: ['없음'],
      tools: ['ChatGPT', 'Claude', 'Notion AI', '조직 진단 도구'],
      roi: {
        productivity: '15% 향상',
        engagement: '25% 증가',
        retention: '20% 개선',
        innovation: '30% 증가'
      }
    },

    {
      id: 'advanced-prompt-mastery',
      title: '고급 프롬프트 엔지니어링 마스터리',
      subtitle: 'AI와의 완벽한 소통으로 업무 효율성 극대화',
      duration: '20시간 (2.5주)',
      difficulty: 'intermediate',
      category: 'technical',
      icon: Lightbulb,
      color: 'yellow',
      description: '업무별 맞춤형 고급 프롬프트 기법을 마스터하여 AI 도구의 성능을 최대한 활용',
      objectives: [
        '업무 영역별 전문 프롬프트 기법 습득',
        '복합적 업무 처리를 위한 체인 프롬프팅 마스터',
        '부서별 프롬프트 라이브러리 구축',
        'AI 모델별 최적화 전략 이해'
      ],
      keyFeatures: [
        '15개 업무 영역별 전문 프롬프트 템플릿',
        '실시간 프롬프트 성능 분석 및 개선',
        '팀별 프롬프트 공유 플랫폼 구축',
        'A/B 테스트를 통한 프롬프트 최적화'
      ],
      practicalProjects: [
        '개인 업무 특화 프롬프트 라이브러리 구축',
        '부서별 베스트 프랙티스 프롬프트 개발',
        '복합 업무 자동화 프롬프트 체인 설계',
        '프롬프트 성능 측정 대시보드 구축'
      ],
      expectedOutcomes: [
        'AI 업무 효율성 60% 이상 향상',
        '부서별 프롬프트 라이브러리 완성',
        '프롬프트 품질 점수 90점 이상 달성',
        'AI 활용 자신감 지수 95% 이상'
      ],
      targetAudience: ['실무진', '팀장', 'AI 챔피언'],
      prerequisites: ['AI 기초 과정 수료'],
      tools: ['GPT-4', 'Claude-3', 'Custom GPTs', 'API 도구'],
      roi: {
        productivity: '60% 향상',
        engagement: '40% 증가',
        retention: '15% 개선',
        innovation: '50% 증가'
      }
    },

    {
      id: 'n8n-workflow-excellence',
      title: 'N8N 워크플로우 엑셀런스 프로그램',
      subtitle: '업무 자동화의 완성, 스마트 워크플로우 구축',
      duration: '24시간 (3주)',
      difficulty: 'advanced',
      category: 'technical',
      icon: Zap,
      color: 'purple',
      description: '복잡한 업무 프로세스를 완전 자동화하는 고도화된 N8N 워크플로우 구축 역량 개발',
      objectives: [
        '엔터프라이즈급 워크플로우 아키텍처 설계',
        '다중 시스템 통합 자동화 구현',
        '오류 처리 및 모니터링 시스템 구축',
        '확장 가능한 자동화 인프라 구성'
      ],
      keyFeatures: [
        '50+ 고급 N8N 노드 활용법',
        '실제 기업 사례 기반 복합 워크플로우',
        '클라우드 인프라와의 완벽 연동',
        '실시간 모니터링 및 알림 시스템'
      ],
      practicalProjects: [
        '부서 전체 업무 프로세스 자동화',
        '고객 여정 전체 자동화 시스템',
        '데이터 파이프라인 구축 및 분석 자동화',
        '비즈니스 인텔리전스 대시보드 연동'
      ],
      expectedOutcomes: [
        '업무 자동화율 80% 이상 달성',
        '수작업 시간 70% 단축',
        '프로세스 오류율 95% 감소',
        '자동화 ROI 500% 이상 달성'
      ],
      targetAudience: ['IT 담당자', '프로세스 오너', '혁신 담당자'],
      prerequisites: ['N8N 기초 과정', '프롬프트 엔지니어링 과정'],
      tools: ['N8N Cloud', 'Zapier', 'Make', 'Custom APIs', 'Database'],
      roi: {
        productivity: '200% 향상',
        engagement: '35% 증가',
        retention: '25% 개선',
        innovation: '80% 증가'
      }
    },

    {
      id: 'ai-leadership-transformation',
      title: 'AI 시대 리더십 트랜스포메이션',
      subtitle: '구성원을 AI와 함께 성장시키는 변혁적 리더십',
      duration: '16시간 (2주)',
      difficulty: 'advanced',
      category: 'leadership',
      icon: Users,
      color: 'green',
      description: 'AI 시대에 맞는 새로운 리더십 스타일과 팀 관리 방법론을 개발하여 고몰입 조직을 구축',
      objectives: [
        'AI 시대 리더십 패러다임 전환',
        '구성원 AI 역량 개발 코칭 스킬',
        '디지털 트랜스포메이션 리더십',
        '혁신 문화 조성 및 변화 관리'
      ],
      keyFeatures: [
        '개인별 리더십 스타일 AI 진단',
        '구성원 AI 역량 개발 로드맵 설계',
        '디지털 네이티브 세대 관리법',
        '변화 저항 극복 및 동기부여 전략'
      ],
      practicalProjects: [
        '팀별 AI 도입 변화관리 계획 수립',
        '구성원 AI 역량 개발 멘토링 프로그램',
        'AI 활용 성과 평가 시스템 설계',
        '혁신 문화 확산 액션플랜 개발'
      ],
      expectedOutcomes: [
        '리더십 효과성 지수 40% 향상',
        '팀 몰입도 50% 이상 증가',
        '구성원 AI 활용률 90% 달성',
        '혁신 아이디어 제안 200% 증가'
      ],
      targetAudience: ['임원', '부서장', '팀장', 'HR 담당자'],
      prerequisites: ['AI 기초 과정', '리더십 경험'],
      tools: ['리더십 진단 AI', 'OKR 도구', '360도 피드백', 'AI 코칭 도구'],
      roi: {
        productivity: '45% 향상',
        engagement: '60% 증가',
        retention: '40% 개선',
        innovation: '120% 증가'
      }
    },

    {
      id: 'innovation-culture-building',
      title: '혁신 문화 구축과 AI 융합',
      subtitle: '실패를 두려워하지 않고 도전하는 조직문화 조성',
      duration: '20시간 (2.5주)',
      difficulty: 'intermediate',
      category: 'culture',
      icon: Rocket,
      color: 'red',
      description: 'AI 도입과 함께 조직의 혁신 DNA를 강화하여 지속적으로 성장하는 문화를 구축',
      objectives: [
        '실험과 학습 중심의 조직문화 조성',
        'AI 기반 아이디어 발굴 및 실행 체계',
        '크로스 펑셔널 협업 문화 구축',
        '데이터 기반 의사결정 문화 정착'
      ],
      keyFeatures: [
        'AI 기반 아이디어 평가 시스템',
        '빠른 프로토타입 개발 방법론',
        '실패 학습 및 공유 플랫폼',
        '혁신 성과 측정 및 보상 체계'
      ],
      practicalProjects: [
        'AI 아이디어톤 기획 및 실행',
        '부서별 혁신 챌린지 프로그램',
        '실패 사례 학습 워크숍',
        '혁신 문화 지수 측정 시스템'
      ],
      expectedOutcomes: [
        '혁신 아이디어 제안 300% 증가',
        '프로젝트 실행 속도 50% 향상',
        '부서 간 협업 만족도 80% 이상',
        '혁신 문화 지수 90점 이상 달성'
      ],
      targetAudience: ['전 직원', '혁신 담당자', '프로젝트 매니저'],
      prerequisites: ['AI 마인드셋 과정'],
      tools: ['아이디어 관리 플랫폼', 'Design Thinking 도구', 'Agile 도구'],
      roi: {
        productivity: '35% 향상',
        engagement: '70% 증가',
        retention: '30% 개선',
        innovation: '250% 증가'
      }
    },

    {
      id: 'ai-ethics-governance',
      title: 'AI 윤리와 거버넌스 체계 구축',
      subtitle: '신뢰할 수 있는 AI 활용을 위한 윤리적 기반 마련',
      duration: '12시간 (1.5주)',
      difficulty: 'intermediate',
      category: 'foundation',
      icon: Shield,
      color: 'indigo',
      description: '책임감 있는 AI 활용을 위한 윤리적 가이드라인과 거버넌스 체계를 구축',
      objectives: [
        'AI 윤리 원칙과 가이드라인 수립',
        'AI 활용 리스크 관리 체계 구축',
        '데이터 프라이버시 보호 방안',
        'AI 의사결정의 투명성과 설명가능성'
      ],
      keyFeatures: [
        '조직별 맞춤형 AI 윤리 가이드라인',
        'AI 리스크 평가 및 관리 도구',
        '정기적 AI 감사 체계',
        'AI 윤리 교육 프로그램'
      ],
      practicalProjects: [
        '조직 AI 윤리 헌장 수립',
        'AI 활용 체크리스트 개발',
        'AI 리스크 매트릭스 구축',
        'AI 거버넌스 위원회 구성'
      ],
      expectedOutcomes: [
        'AI 윤리 준수율 100% 달성',
        'AI 관련 리스크 80% 감소',
        '구성원 AI 신뢰도 95% 이상',
        'AI 거버넌스 체계 완전 정착'
      ],
      targetAudience: ['경영진', 'IT 담당자', '컴플라이언스 담당자'],
      prerequisites: ['AI 기초 과정'],
      tools: ['AI 감사 도구', '리스크 관리 플랫폼', '윤리 평가 도구'],
      roi: {
        productivity: '10% 향상',
        engagement: '20% 증가',
        retention: '15% 개선',
        innovation: '25% 증가'
      }
    },

    {
      id: 'continuous-learning-system',
      title: '지속적 학습 시스템과 성장 문화',
      subtitle: '평생 학습하는 조직으로의 진화',
      duration: '16시간 (2주)',
      difficulty: 'intermediate',
      category: 'culture',
      icon: TrendingUp,
      color: 'teal',
      description: 'AI와 함께 지속적으로 학습하고 성장하는 조직 문화와 시스템을 구축',
      objectives: [
        '개인별 맞춤형 학습 경로 설계',
        'AI 기반 스킬 갭 분석 및 개발',
        '지식 공유 및 협력 학습 문화',
        '성과와 연계된 학습 보상 체계'
      ],
      keyFeatures: [
        'AI 기반 개인 학습 추천 시스템',
        '실시간 스킬 레벨 추적',
        '동료 학습 매칭 플랫폼',
        '학습 성과 가시화 대시보드'
      ],
      practicalProjects: [
        '개인별 AI 학습 포트폴리오 구축',
        '부서별 지식 공유 세션',
        '멘토-멘티 매칭 프로그램',
        '학습 성과 측정 시스템'
      ],
      expectedOutcomes: [
        '개인 학습 시간 100% 증가',
        '스킬 향상 속도 200% 가속화',
        '지식 공유 활동 300% 증가',
        '학습 만족도 95% 이상 달성'
      ],
      targetAudience: ['전 직원', 'HR 담당자', '교육 담당자'],
      prerequisites: ['없음'],
      tools: ['LMS 플랫폼', 'AI 학습 추천', '스킬 추적 도구'],
      roi: {
        productivity: '50% 향상',
        engagement: '80% 증가',
        retention: '60% 개선',
        innovation: '90% 증가'
      }
    },

    {
      id: 'performance-excellence',
      title: '성과 우수성과 AI 융합 관리',
      subtitle: 'AI 기반 성과 관리로 개인과 조직의 탁월성 달성',
      duration: '20시간 (2.5주)',
      difficulty: 'advanced',
      category: 'leadership',
      icon: Award,
      color: 'gold',
      description: 'AI를 활용한 과학적 성과 관리 시스템으로 개인과 조직의 성과를 극대화',
      objectives: [
        'AI 기반 성과 예측 및 분석',
        '개인별 강점 기반 역할 최적화',
        '실시간 성과 피드백 시스템',
        '성과와 웰빙의 균형 관리'
      ],
      keyFeatures: [
        'AI 성과 예측 모델링',
        '개인 강점 분석 및 활용',
        '360도 실시간 피드백',
        '웰빙 지수 통합 관리'
      ],
      practicalProjects: [
        'AI 기반 성과 대시보드 구축',
        '개인별 성장 계획 수립',
        '팀 시너지 최적화 프로젝트',
        '성과-웰빙 균형 지표 개발'
      ],
      expectedOutcomes: [
        '개인 성과 40% 이상 향상',
        '팀 협업 효과성 60% 증가',
        '성과 예측 정확도 85% 달성',
        '직원 웰빙 지수 90점 이상'
      ],
      targetAudience: ['관리자', 'HR 담당자', '성과 관리자'],
      prerequisites: ['리더십 과정', 'AI 기초 과정'],
      tools: ['성과 관리 AI', '분석 대시보드', '피드백 플랫폼'],
      roi: {
        productivity: '70% 향상',
        engagement: '85% 증가',
        retention: '50% 개선',
        innovation: '100% 증가'
      }
    }
  ],

  organizationalBenefits: {
    shortTerm: [
      '구성원 AI 활용 능력 평균 300% 향상',
      '업무 효율성 즉시 50% 이상 개선',
      '조직 내 협업 만족도 70% 증가',
      'AI 도입에 대한 긍정적 인식 95% 달성'
    ],
    mediumTerm: [
      '부서별 업무 자동화율 80% 이상 달성',
      '혁신 아이디어 제안 및 실행 500% 증가',
      '구성원 몰입도 지수 90점 이상 달성',
      '조직 학습 문화 완전 정착'
    ],
    longTerm: [
      'AI 네이티브 조직으로 완전 전환',
      '업계 최고 수준의 혁신 조직 구축',
      '구성원 자발적 성장 문화 확립',
      '지속 가능한 경쟁우위 확보'
    ]
  },

  culturalTransformation: {
    phase1: [
      'AI에 대한 두려움 완전 해소',
      '개인별 AI 활용 목표 설정',
      '기본적인 AI 도구 활용 능력 확보',
      '변화에 대한 긍정적 마인드셋 형성'
    ],
    phase2: [
      '부서별 AI 도입 프로젝트 실행',
      '지식 공유 및 협력 문화 확산',
      '실험과 학습을 통한 혁신 시도',
      '성과 기반 보상 체계 정착'
    ],
    phase3: [
      'AI와 함께하는 일상 업무 완전 정착',
      '자율적 학습과 성장 문화 확립',
      '혁신을 주도하는 조직 DNA 형성',
      '외부 벤치마킹 대상 조직으로 성장'
    ]
  },

  successMetrics: {
    engagement: [
      '직원 몰입도 지수 90점 이상',
      'AI 학습 참여율 95% 이상',
      '자발적 혁신 활동 참여 80% 이상',
      '조직 추천 의향 90% 이상'
    ],
    productivity: [
      '업무 효율성 평균 200% 향상',
      '자동화를 통한 시간 절약 70% 달성',
      '프로젝트 완료 속도 150% 향상',
      '품질 지표 95점 이상 유지'
    ],
    innovation: [
      '혁신 아이디어 제안 500% 증가',
      '새로운 비즈니스 모델 개발 월 1건 이상',
      'AI 활용 특허 출원 연 5건 이상',
      '업계 혁신 사례 벤치마킹 대상 선정'
    ],
    retention: [
      '직원 이직률 50% 감소',
      '핵심 인재 유지율 95% 이상',
      '내부 승진율 80% 이상',
      '신입사원 정착률 95% 이상'
    ]
  }
};

// 프로그램 추천 엔진
export const getProgramRecommendation = (
  organizationSize: string,
  industry: string,
  currentAIMaturity: number,
  culturalReadiness: number
): {
  recommendedModules: string[];
  customizationSuggestions: string[];
  expectedTimeline: string;
  estimatedROI: string;
} => {
  const baseModules = ['ai-mindset-transformation', 'advanced-prompt-mastery'];
  let recommendedModules = [...baseModules];
  let customizationSuggestions: string[] = [];
  let expectedTimeline = '16주';
  let estimatedROI = '300%';

  // 조직 규모에 따른 추천
  if (organizationSize === 'large') {
    recommendedModules.push('ai-leadership-transformation', 'ai-ethics-governance');
    expectedTimeline = '20주';
    estimatedROI = '450%';
  } else if (organizationSize === 'medium') {
    recommendedModules.push('n8n-workflow-excellence', 'innovation-culture-building');
    expectedTimeline = '18주';
    estimatedROI = '380%';
  } else {
    recommendedModules.push('innovation-culture-building', 'continuous-learning-system');
    expectedTimeline = '14주';
    estimatedROI = '320%';
  }

  // AI 성숙도에 따른 조정
  if (currentAIMaturity < 3) {
    customizationSuggestions.push('기초 과정 강화 및 실습 시간 확대');
    customizationSuggestions.push('개인별 멘토링 프로그램 추가');
  } else if (currentAIMaturity > 7) {
    recommendedModules.push('performance-excellence');
    customizationSuggestions.push('고급 과정 비중 확대');
    customizationSuggestions.push('외부 전문가 초청 세션 추가');
  }

  // 문화적 준비도에 따른 조정
  if (culturalReadiness < 5) {
    customizationSuggestions.push('변화 관리 프로그램 선행 실시');
    customizationSuggestions.push('경영진 후원 및 소통 강화');
  }

  return {
    recommendedModules,
    customizationSuggestions,
    expectedTimeline,
    estimatedROI
  };
};

export default HIGH_ENGAGEMENT_AI_PROGRAM;
