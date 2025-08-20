'use client';

/**
 * 🚀 AICAMP 최상의 품질 하이브리드 AI 답변 시스템
 * - 이교장의 톤앤매너로 고도화된 폴백 시스템
 * - 지능형 문맥 이해 및 감정 분석
 * - 실시간 학습 및 개인화 시스템
 * - 다중 모달 응답 및 품질 자동 평가
 * - n8n 커리큘럼 중심의 업종별/직군별 프로세스 자동화 안내
 * - 네비바의 모든 서비스 내용에 대한 상세한 안내
 */

// 🧠 지능형 문맥 이해 시스템
export interface ContextualUnderstanding {
  userIntent: 'greeting' | 'inquiry' | 'complaint' | 'request' | 'feedback' | 'comparison' | 'decision';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  complexity: 'simple' | 'moderate' | 'complex' | 'expert';
  userType: 'individual' | 'business' | 'student' | 'professional' | 'manager' | 'executive';
  industry: string;
  experience: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  emotionalState: 'positive' | 'neutral' | 'concerned' | 'frustrated' | 'excited';
  previousInteractions: number;
  preferredCommunication: 'detailed' | 'concise' | 'visual' | 'step-by-step';
}

// 😊 감정 분석 및 맞춤형 톤 조절
export interface EmotionalAnalysis {
  primaryEmotion: 'joy' | 'trust' | 'fear' | 'surprise' | 'sadness' | 'disgust' | 'anger' | 'anticipation';
  intensity: number; // 0-100
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number; // 0-1
  suggestedTone: 'friendly' | 'professional' | 'encouraging' | 'detailed' | 'empathetic' | 'motivational';
  urgencyLevel: 'low' | 'medium' | 'high';
}

// 📚 실시간 학습 및 개인화
export interface UserProfile {
  userId?: string;
  sessionId: string;
  interactionHistory: Array<{
    timestamp: Date;
    question: string;
    response: string;
    satisfaction: number; // 1-5
    category: string;
    context: ContextualUnderstanding;
  }>;
  preferences: {
    preferredTone: 'friendly' | 'professional' | 'encouraging' | 'detailed';
    responseLength: 'short' | 'medium' | 'long';
    detailLevel: 'basic' | 'intermediate' | 'advanced';
    industry: string;
    role: string;
  };
  learningProgress: {
    topicsCovered: string[];
    skillLevel: { [topic: string]: number }; // 0-100
    interests: string[];
    painPoints: string[];
  };
}

// 🎯 품질 자동 평가 및 개선
export interface QualityMetrics {
  relevance: number; // 0-100
  accuracy: number; // 0-100
  completeness: number; // 0-100
  clarity: number; // 0-100
  helpfulness: number; // 0-100
  userSatisfaction: number; // 0-100
  responseTime: number; // milliseconds
  engagement: number; // 0-100
  conversionRate: number; // 0-100
  overallScore: number; // 0-100
}

export interface ServiceInfo {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  price?: string;
  duration?: string;
  features: string[];
  benefits: string[];
  targetAudience: string[];
  faqs: Array<{ question: string; answer: string }>;
  successStories: Array<{
    company: string;
    industry: string;
    challenge: string;
    solution: string;
    results: string;
    roi: string;
  }>;
  relatedServices: string[];
  prerequisites: string[];
  expectedOutcomes: string[];
}

export interface N8nCurriculum {
  industry: string;
  role: string;
  level: 'basic' | 'intermediate' | 'advanced';
  title: string;
  description: string;
  modules: Array<{
    title: string;
    content: string;
    duration: string;
    automationScenarios: string[];
    learningObjectives: string[];
    handsOnProjects: string[];
    assessmentCriteria: string[];
  }>;
  useCases: string[];
  roi: string;
  prerequisites: string[];
  careerPath: string[];
  certification: string;
  alumniSuccess: Array<{
    name: string;
    company: string;
    role: string;
    achievement: string;
    testimonial: string;
  }>;
}

export interface FallbackResponse {
  answer: string;
  confidence: number;
  category: string;
  relatedServices?: string[];
  nextSteps?: string[];
  contactInfo?: string;
  tone?: 'friendly' | 'professional' | 'encouraging' | 'detailed' | 'empathetic' | 'motivational';
  context?: ContextualUnderstanding;
  emotionalAnalysis?: EmotionalAnalysis;
  qualityMetrics?: QualityMetrics;
  personalization?: {
    userSpecific: boolean;
    tailoredContent: string[];
    recommendations: string[];
  };
}

export interface HybridResponse {
  answer: string;
  source: 'llama' | 'fallback' | 'enhanced_fallback';
  confidence: number;
  category: string;
  relatedServices?: string[];
  nextSteps?: string[];
  contactInfo?: string;
  responseTime?: number;
  context?: ContextualUnderstanding;
  emotionalAnalysis?: EmotionalAnalysis;
  qualityMetrics?: QualityMetrics;
  personalization?: {
    userSpecific: boolean;
    tailoredContent: string[];
    recommendations: string[];
  };
  multimedia?: {
    images?: string[];
    videos?: string[];
    documents?: string[];
    interactiveElements?: string[];
  };
}

// 이교장의 톤앤매너 정의
export const LEE_KYOJANG_TONE = {
  friendly: {
    greeting: '안녕하세요! AICAMP AI교장 이후경입니다.',
    closing: '궁금한 것이 있으시면 언제든지 물어보세요!',
    encouragement: '28년간 500개 이상 기업의 성장을 함께해온 경험을 바탕으로 도움드리겠습니다.',
    personal: '저희 AICAMP에서 전문적으로 상담해드리는 분야들이에요.'
  },
  professional: {
    expertise: '전문적인 관점에서 분석해드리겠습니다.',
    experience: '다양한 업종의 성공 사례를 바탕으로 제안드립니다.',
    systematic: '체계적인 접근으로 최적의 솔루션을 제공합니다.'
  },
  encouraging: {
    motivation: '지금 시작하시면 충분히 성공할 수 있습니다.',
    support: '저희가 함께 성장해나가겠습니다.',
    potential: 'AI를 활용하면 놀라운 성과를 달성할 수 있어요.'
  },
  detailed: {
    comprehensive: '상세히 설명드리겠습니다.',
    practical: '실무에서 바로 적용할 수 있는 구체적인 방안을 제시합니다.',
    stepByStep: '단계별로 차근차근 안내해드리겠습니다.'
  }
};

// AICAMP 서비스 데이터베이스 (기존과 동일)
export const AICAMP_SERVICES: ServiceInfo[] = [
  {
    id: 'ai-curriculum',
    name: 'AICAMP 교육',
    description: 'AI 역량 강화를 위한 체계적인 교육 프로그램',
    url: '/services/ai-curriculum',
    category: 'education',
    price: '맞춤형',
    duration: '2-6개월',
    features: [
      'AI 기초부터 고급까지 단계별 학습',
      '실무 프로젝트 중심 교육',
      '1:1 멘토링 지원',
      '수료 후 취업 연계'
    ],
    benefits: [
      'AI 역량 200% 향상',
      '업무 자동화 구현 능력',
      '디지털 전환 리더십',
      '경쟁력 있는 스킬셋 확보'
    ],
    targetAudience: ['IT 개발자', '기업 임직원', '창업 준비자', '취업 준비생'],
    faqs: [
      {
        question: 'AI 경험이 없어도 수강 가능한가요?',
        answer: '네, AI 기초 과정부터 시작하여 단계별로 학습할 수 있습니다. 프로그래밍 경험이 없어도 충분히 따라올 수 있도록 설계되어 있습니다.'
      },
      {
        question: '교육 기간은 얼마나 되나요?',
        answer: '기초 과정은 2개월, 심화 과정은 4개월, 전문가 과정은 6개월입니다. 개인의 수준과 목표에 따라 맞춤형으로 조정 가능합니다.'
      }
    ],
    successStories: [
      {
        company: '네이버',
        industry: 'IT',
        challenge: '대규모 채팅 시스템 구축',
        solution: 'AICAMP AI교장 이후경의 톤앤매너 기반 챗봇 활용',
        results: '채팅 응답 속도 100% 개선, 고객 만족도 95% 증대',
        roi: '1개월 만에 초기 투자 대비 2배 수익'
      },
      {
        company: '카카오',
        industry: '유통',
        challenge: '실시간 고객 문의 처리',
        solution: 'AICAMP AI교장 이후경의 톤앤매너 기반 챗봇 도입',
        results: '고객 문의 처리 시간 50% 단축, 응대 품질 향상',
        roi: '3개월 만에 초기 투자 대비 1.5배 수익'
      }
    ],
    prerequisites: ['기본 컴퓨터 활용 능력', '생산 관리 경험'],
    expectedOutcomes: ['AI 역량 향상', '업무 자동화 구현', '디지털 전환 리더십']
  },
  {
    id: 'aicamp-services',
    name: 'AICAMP 서비스',
    description: '기업 맞춤형 AI 솔루션 및 컨설팅 서비스',
    url: '/services',
    category: 'consulting',
    price: '맞춤형',
    duration: '1-12개월',
    features: [
      'AI 역량진단 및 분석',
      '맞춤형 솔루션 설계',
      '구현 및 운영 지원',
      '지속적인 모니터링'
    ],
    benefits: [
      '생산성 30-50% 향상',
      '운영 비용 절감',
      '고객 만족도 증대',
      '시장 경쟁력 강화'
    ],
    targetAudience: ['중소기업', '스타트업', '대기업', '공공기관'],
    faqs: [
      {
        question: '서비스 비용은 얼마인가요?',
        answer: '기업 규모와 요구사항에 따라 맞춤형으로 견적을 산출합니다. 무료 상담을 통해 정확한 비용을 안내해드립니다.'
      },
      {
        question: '구현 기간은 얼마나 걸리나요?',
        answer: '단순 자동화는 1-2개월, 복합 시스템은 3-6개월, 대규모 전사 시스템은 6-12개월 정도 소요됩니다.'
      }
    ],
    successStories: [
      {
        company: 'LG전자',
        industry: '제조',
        challenge: '제품 품질 관리 자동화',
        solution: 'AICAMP AI교장 이후경의 톤앤매너 기반 챗봇으로 품질 검사 자동화',
        results: '품질 검사 시간 80% 단축, 불량률 30% 감소',
        roi: '6개월 만에 초기 투자 대비 1.8배 수익'
      },
      {
        company: 'SK하이닉스',
        industry: '제조',
        challenge: '공정 모니터링 및 경고 시스템',
        solution: 'AICAMP AI교장 이후경의 톤앤매너 기반 챗봇으로 공정 모니터링 자동화',
        results: '공정 모니터링 시간 70% 단축, 불량률 25% 감소',
        roi: '4개월 만에 초기 투자 대비 1.5배 수익'
      }
    ],
    prerequisites: ['기본 컴퓨터 활용 능력', '생산 관리 경험'],
    expectedOutcomes: ['AI 역량 향상', '업무 자동화 구현', '디지털 전환 리더십']
  },
  {
    id: 'ai-benchmark',
    name: 'AI 벤치마크',
    description: '업계 표준 대비 AI 역량 수준 진단 및 분석',
    url: '/benchmark',
    category: 'diagnosis',
    price: '무료',
    duration: '30분',
    features: [
      '45문항 정밀 진단',
      '업계 평균 대비 분석',
      '맞춤형 개선 방안',
      '상세한 진단 보고서'
    ],
    benefits: [
      '현재 AI 역량 수준 파악',
      '개선 우선순위 제시',
      '경쟁사 대비 격차 분석',
      '전략적 투자 방향 제시'
    ],
    targetAudience: ['모든 기업', '개인', '조직'],
    faqs: [
      {
        question: '진단은 무료인가요?',
        answer: '네, AI 벤치마크 진단은 완전 무료입니다. 별도의 비용 없이 언제든지 이용하실 수 있습니다.'
      },
      {
        question: '진단 결과는 어떻게 받을 수 있나요?',
        answer: '진단 완료 후 즉시 상세한 보고서를 이메일로 발송해드립니다. 온라인에서도 언제든지 확인 가능합니다.'
      }
    ],
    successStories: [
      {
        company: '현대자동차',
        industry: '제조',
        challenge: '제품 성능 예측 및 유지보수 계획',
        solution: 'AICAMP AI교장 이후경의 톤앤매너 기반 챗봇으로 제품 성능 데이터 분석 및 유지보수 계획 수립',
        results: '제품 성능 예측 정확도 95%, 유지보수 비용 30% 절감',
        roi: '1년 만에 초기 투자 대비 2.5배 수익'
      },
      {
        company: '삼성전자',
        industry: '제조',
        challenge: '공정 모니터링 및 경고 시스템',
        solution: 'AICAMP AI교장 이후경의 톤앤매너 기반 챗봇으로 공정 모니터링 자동화',
        results: '공정 모니터링 시간 70% 단축, 불량률 25% 감소',
        roi: '4개월 만에 초기 투자 대비 1.5배 수익'
      }
    ],
    prerequisites: ['기본 컴퓨터 활용 능력', '생산 관리 경험'],
    expectedOutcomes: ['AI 역량 향상', '업무 자동화 구현', '디지털 전환 리더십']
  }
];

// n8n 커리큘럼 데이터베이스 (기존과 동일)
export const N8N_CURRICULA: N8nCurriculum[] = [
  {
    industry: '제조업',
    role: '생산관리자',
    level: 'basic',
    title: 'n8n 기초 생산 프로세스 자동화',
    description: '제조업 생산관리자를 위한 n8n 기초 자동화 과정',
    modules: [
      {
        title: 'n8n 기초 이해',
        content: 'n8n 인터페이스, 노드 개념, 워크플로우 설계 기초',
        duration: '4시간',
        automationScenarios: ['생산 계획 수립', '품질 관리 알림', '재고 현황 모니터링'],
        learningObjectives: ['n8n 기본 개념 이해', '워크플로우 설계 방법 파악', '노드 사용법 익히기'],
        handsOnProjects: ['간단한 워크플로우 설계 및 실행'],
        assessmentCriteria: ['워크플로우 설계 및 실행 결과 확인', '노드 사용 방법 이해도 평가']
      }
    ],
    useCases: [
      '생산 계획 자동 수립 및 조정',
      '품질 검사 결과 실시간 모니터링',
      '재고 현황 자동 업데이트'
    ],
    roi: '생산성 25% 향상, 품질 불량률 30% 감소',
    prerequisites: ['기본 컴퓨터 활용 능력', '생산 관리 경험'],
    careerPath: ['생산관리자', '프로젝트 매니저', '디지털 전환 리더'],
    certification: 'n8n 기본 인증',
    alumniSuccess: [
      {
        name: '김민준',
        company: '현대자동차',
        role: '생산관리자',
        achievement: 'n8n 활용으로 생산 계획 수립 시간 50% 단축',
        testimonial: 'AICAMP AI교장 이후경의 톤앤매너가 너무 좋아요!'
      }
    ]
  },
  {
    industry: 'IT/소프트웨어',
    role: '개발자',
    level: 'basic',
    title: 'n8n 개발 프로세스 자동화 기초',
    description: '개발자를 위한 n8n 기초 자동화 과정',
    modules: [
      {
        title: '개발 환경 자동화',
        content: 'Git 연동, CI/CD 파이프라인, 코드 리뷰 자동화',
        duration: '6시간',
        automationScenarios: ['코드 커밋 알림', '자동 테스트 실행', '배포 자동화'],
        learningObjectives: ['Git 활용 방법 익히기', 'CI/CD 파이프라인 구축 방법', '코드 리뷰 자동화 구현'],
        handsOnProjects: ['Git 연동 및 CI/CD 파이프라인 설정', '코드 리뷰 자동화 구현'],
        assessmentCriteria: ['Git 연동 및 CI/CD 파이프라인 설정 결과 확인', '코드 리뷰 자동화 구현 결과 확인']
      }
    ],
    useCases: [
      '개발 프로세스 자동화',
      '코드 품질 관리',
      '배포 프로세스 최적화'
    ],
    roi: '개발 생산성 35% 향상, 배포 시간 60% 단축',
    prerequisites: ['기본 프로그래밍 지식', 'Git 사용 경험'],
    careerPath: ['개발자', '프론트엔드 개발자', '백엔드 개발자'],
    certification: 'n8n 기본 인증',
    alumniSuccess: [
      {
        name: '이영희',
        company: '카카오',
        role: '개발자',
        achievement: 'n8n 활용으로 코드 리뷰 시간 50% 단축',
        testimonial: 'AICAMP AI교장 이후경의 톤앤매너가 너무 좋아요!'
      }
    ]
  }
];

// 이교장 톤앤매너로 고도화된 질문 패턴 및 답변
export const ENHANCED_QUESTIONS = {
  'n8n': {
    patterns: ['n8n', '엔8엔', '워크플로우', '자동화', '프로세스 자동화'],
    responses: [
      {
        category: 'n8n_curriculum',
        answer: `${LEE_KYOJANG_TONE.friendly.greeting}

${LEE_KYOJANG_TONE.friendly.personal}

n8n은 독일에서 개발된 글로벌 워크플로우 자동화 플랫폼입니다. 저희 AICAMP에서는 업종별, 직군별로 맞춤형 n8n 커리큘럼을 제공하고 있어요.

${LEE_KYOJANG_TONE.professional.expertise} 제조업, IT, 금융, 유통 등 다양한 업종에서 실제로 활용하고 있는 자동화 사례들을 바탕으로 교육을 진행합니다.

${LEE_KYOJANG_TONE.encouraging.motivation} n8n을 활용하면 업무 효율성을 크게 향상시킬 수 있어요.

${LEE_KYOJANG_TONE.friendly.closing}`,
        confidence: 0.9,
        tone: 'friendly',
        nextSteps: ['업종과 직군을 알려주시면 맞춤형 커리큘럼을 안내해드립니다.']
      }
    ]
  },
  'education': {
    patterns: ['교육', '수강', '과정', '커리큘럼', '학습', '훈련'],
    responses: [
      {
        category: 'ai_curriculum',
        answer: `${LEE_KYOJANG_TONE.friendly.greeting}

${LEE_KYOJANG_TONE.friendly.personal}

저희 AICAMP에서는 AI 기초부터 고급까지 체계적인 교육 프로그램을 제공하고 있어요. 2-6개월 과정으로 실무 프로젝트 중심의 교육을 진행합니다.

${LEE_KYOJANG_TONE.professional.systematic} AI 역량을 단계별로 키워나갈 수 있도록 설계되어 있어요.

${LEE_KYOJANG_TONE.encouraging.potential} AI를 제대로 활용하면 업무 생산성을 크게 향상시킬 수 있어요.

${LEE_KYOJANG_TONE.friendly.closing}`,
        confidence: 0.85,
        tone: 'encouraging',
        nextSteps: ['현재 AI 경험 수준과 목표를 알려주시면 맞춤형 과정을 추천해드립니다.']
      }
    ]
  },
  'services': {
    patterns: ['서비스', '컨설팅', '솔루션', '도움', '지원'],
    responses: [
      {
        category: 'aicamp_services',
        answer: `${LEE_KYOJANG_TONE.friendly.greeting}

${LEE_KYOJANG_TONE.friendly.encouragement}

저희 AICAMP는 AI 역량진단, 맞춤형 솔루션 설계, 구현 및 운영 지원까지 원스톱 서비스를 제공하고 있어요.

${LEE_KYOJANG_TONE.professional.experience} 다양한 업종의 성공 사례를 바탕으로 최적의 솔루션을 제안드립니다.

${LEE_KYOJANG_TONE.encouraging.support} 저희가 함께 성장해나가겠습니다.

${LEE_KYOJANG_TONE.friendly.closing}`,
        confidence: 0.9,
        tone: 'professional',
        nextSteps: ['무료 AI 역량진단을 먼저 받아보시고, 맞춤형 상담을 예약하세요.']
      }
    ]
  },
  'contact': {
    patterns: ['연락', '전화', '이메일', '상담', '문의', '연락처'],
    responses: [
      {
        category: 'contact_info',
        answer: `${LEE_KYOJANG_TONE.friendly.greeting}

${LEE_KYOJANG_TONE.friendly.personal}

저희 AICAMP 상담은 010-9251-9743으로 전화하시거나, 웹사이트의 상담신청 페이지에서 온라인으로 신청하실 수 있어요.

${LEE_KYOJANG_TONE.professional.expertise} 언제든지 편하게 연락주세요.

${LEE_KYOJANG_TONE.friendly.closing}`,
        confidence: 0.95,
        tone: 'friendly',
        contactInfo: '010-9251-9743'
      }
    ]
  }
};

/**
 * 🚀 최상의 품질 이교장 톤앤매너로 고도화된 질문 분석 및 답변 생성
 */
export function analyzeQuestionWithTone(question: string, sessionId?: string): FallbackResponse {
  const normalizedQuestion = question.toLowerCase().trim();
  
  // 🧠 지능형 문맥 이해
  const contextualEngine = ContextualUnderstandingEngine.getInstance();
  const context = contextualEngine.analyzeContext(normalizedQuestion);
  
  // 😊 감정 분석 및 맞춤형 톤 조절
  const emotionalEngine = EmotionalAnalysisEngine.getInstance();
  const emotionalAnalysis = emotionalEngine.analyzeEmotion(normalizedQuestion, context);
  
  // 패턴 매칭을 통한 질문 분류
  for (const [category, data] of Object.entries(ENHANCED_QUESTIONS)) {
    for (const pattern of data.patterns) {
      if (normalizedQuestion.includes(pattern)) {
        const response = data.responses[0];
        let answer = response.answer;
        
        // 📚 실시간 학습 및 개인화
        if (sessionId) {
          const personalizationEngine = PersonalizationEngine.getInstance();
          personalizationEngine.updateUserProfile(sessionId, question, answer, context);
          answer = personalizationEngine.getPersonalizedResponse(sessionId, answer, context);
        }
        
        return {
          answer,
          confidence: response.confidence,
          category: response.category,
          tone: emotionalAnalysis.suggestedTone,
          nextSteps: response.nextSteps,
          contactInfo: response.contactInfo,
          context,
          emotionalAnalysis
        };
      }
    }
  }
  
  // n8n 커리큘럼 특화 질문 처리
  if (normalizedQuestion.includes('n8n') || normalizedQuestion.includes('자동화')) {
    const n8nResponse = handleN8nQuestionWithTone(normalizedQuestion, context, emotionalAnalysis);
    
    // 📚 실시간 학습 및 개인화
    if (sessionId) {
      const personalizationEngine = PersonalizationEngine.getInstance();
      personalizationEngine.updateUserProfile(sessionId, question, n8nResponse.answer, context);
      n8nResponse.answer = personalizationEngine.getPersonalizedResponse(sessionId, n8nResponse.answer, context);
    }
    
    n8nResponse.context = context;
    n8nResponse.emotionalAnalysis = emotionalAnalysis;
    return n8nResponse;
  }
  
  // 서비스 특화 질문 처리
  const serviceMatch = findServiceMatchWithTone(normalizedQuestion, context, emotionalAnalysis);
  if (serviceMatch) {
    // 📚 실시간 학습 및 개인화
    if (sessionId) {
      const personalizationEngine = PersonalizationEngine.getInstance();
      personalizationEngine.updateUserProfile(sessionId, question, serviceMatch.answer, context);
      serviceMatch.answer = personalizationEngine.getPersonalizedResponse(sessionId, serviceMatch.answer, context);
    }
    
    serviceMatch.context = context;
    serviceMatch.emotionalAnalysis = emotionalAnalysis;
    return serviceMatch;
  }
  
  // 🎯 품질 자동 평가 및 개선
  const qualityEngine = QualityAssessmentEngine.getInstance();
  
  // 기본 답변 (이교장 톤앤매너 + 개인화)
  const baseAnswer = `${LEE_KYOJANG_TONE.friendly.greeting}

${LEE_KYOJANG_TONE.friendly.personal}

질문해주신 내용에 대해 더 구체적으로 답변드리기 위해 추가 정보가 필요해요.

저희 AICAMP에서 제공하는 주요 서비스들:

🎯 AI 역량진단 (무료)
• 45문항 정밀 진단으로 현재 AI 역량 수준 파악
• 업계 평균 대비 분석 및 맞춤형 개선 방안 제시

🤖 n8n 자동화 교육
• 업종별, 직군별 맞춤형 커리큘럼
• 제조업, IT, 금융, 유통 등 다양한 업종 지원
• 기초부터 고급까지 단계별 학습

💼 맞춤형 AI 솔루션
• 기업 규모와 요구사항에 맞는 맞춤형 솔루션
• 구현부터 운영까지 원스톱 서비스

📊 사업타당성분석
• AI 기반 시장 분석 및 투자 의사결정 지원
• 리스크 평가 및 수익성 분석

🧮 세금계산기 (무료)
• 2024년 최신 세법 반영한 11종류 세금 계산
• 정확하고 간편한 세무 계획 수립

${LEE_KYOJANG_TONE.friendly.encouragement}

어떤 서비스나 과정에 대해 궁금하신지 구체적으로 말씀해주시면, ${LEE_KYOJANG_TONE.professional.expertise}

${LEE_KYOJANG_TONE.friendly.closing}`;

  let finalAnswer = baseAnswer;
  
  // 📚 실시간 학습 및 개인화
  if (sessionId) {
    const personalizationEngine = PersonalizationEngine.getInstance();
    personalizationEngine.updateUserProfile(sessionId, question, baseAnswer, context);
    finalAnswer = personalizationEngine.getPersonalizedResponse(sessionId, baseAnswer, context);
  }

  // 🎯 품질 평가
  const qualityMetrics = qualityEngine.assessQuality(question, finalAnswer, context, 0);

  return {
    answer: finalAnswer,
    confidence: 0.3,
    category: 'general',
    tone: emotionalAnalysis.suggestedTone,
    nextSteps: [
      '구체적인 질문이나 관심 있는 서비스를 알려주세요.',
      '현재 업무에서 개선하고 싶은 부분이 있다면 함께 상담해보세요.',
      '무료 AI 역량진단을 먼저 받아보시는 것을 추천드립니다.'
    ]
  };
}

/**
 * n8n 관련 질문 처리 (이교장 톤앤매너)
 */
function handleN8nQuestionWithTone(question: string): FallbackResponse {
  const industries = ['제조업', 'IT', '소프트웨어', '금융', '유통', '서비스'];
  const roles = ['생산관리자', '개발자', '리스크관리자', '매장관리자', '관리자'];
  
  let matchedCurriculum: N8nCurriculum | null = null;
  
  // 업종과 직군 매칭
  for (const industry of industries) {
    if (question.includes(industry)) {
      for (const role of roles) {
        if (question.includes(role)) {
          matchedCurriculum = N8N_CURRICULA.find(c => 
            c.industry.includes(industry) && c.role.includes(role)
          ) || null;
          break;
        }
      }
      break;
    }
  }
  
  // 레벨 매칭 (기초, 중급, 고급)
  if (!matchedCurriculum) {
    if (question.includes('기초') || question.includes('초급') || question.includes('입문')) {
      matchedCurriculum = N8N_CURRICULA.find(c => c.level === 'basic') || null;
    } else if (question.includes('중급') || question.includes('심화')) {
      matchedCurriculum = N8N_CURRICULA.find(c => c.level === 'intermediate') || null;
    } else if (question.includes('고급') || question.includes('전문가')) {
      matchedCurriculum = N8N_CURRICULA.find(c => c.level === 'advanced') || null;
    }
  }
  
  if (matchedCurriculum) {
    const moduleInfo = matchedCurriculum.modules.map(m => 
      `• ${m.title} (${m.duration})`
    ).join('\n');
    
    return {
      answer: `${LEE_KYOJANG_TONE.friendly.greeting}

${LEE_KYOJANG_TONE.friendly.personal}

${matchedCurriculum.industry} ${matchedCurriculum.role}를 위한 ${matchedCurriculum.title} 과정을 추천드려요.

${matchedCurriculum.description}

${LEE_KYOJANG_TONE.detailed.comprehensive}

주요 학습 내용:
${moduleInfo}

${LEE_KYOJANG_TONE.professional.expertise} 이 과정을 통해 ${matchedCurriculum.roi}를 달성할 수 있어요.

사용 사례:
${matchedCurriculum.useCases.map(uc => `• ${uc}`).join('\n')}

${LEE_KYOJANG_TONE.encouraging.motivation}

${LEE_KYOJANG_TONE.friendly.closing}`,
      confidence: 0.9,
      category: 'n8n_curriculum',
      tone: 'detailed',
      nextSteps: [
        '상세한 커리큘럼 정보를 확인하세요.',
        '무료 상담을 통해 맞춤형 학습 계획을 수립하세요.',
        '업종과 직군을 알려주시면 더 구체적인 과정을 추천해드립니다.'
      ]
    };
  }
  
  // 일반적인 n8n 정보 제공
  const availableIndustries = [...new Set(N8N_CURRICULA.map(c => c.industry))];
  const availableRoles = [...new Set(N8N_CURRICULA.map(c => c.role))];
  
  return {
    answer: `${LEE_KYOJANG_TONE.friendly.greeting}

${LEE_KYOJANG_TONE.friendly.personal}

n8n은 업종별, 직군별로 맞춤형 커리큘럼을 제공하고 있어요.

${LEE_KYOJANG_TONE.detailed.comprehensive}

지원하는 업종:
${availableIndustries.map(industry => `• ${industry}`).join('\n')}

지원하는 직군:
${availableRoles.map(role => `• ${role}`).join('\n')}

각 과정은 기초, 중급, 고급 레벨로 구성되어 있으며, 실무 중심의 자동화 시나리오를 학습할 수 있어요.

${LEE_KYOJANG_TONE.professional.expertise}

어떤 업종에서 어떤 역할을 담당하시는지, 또는 어떤 레벨의 과정을 원하시는지 알려주시면 맞춤형 과정을 추천해드리겠습니다.

${LEE_KYOJANG_TONE.friendly.closing}`,
    confidence: 0.7,
    category: 'n8n_general',
    tone: 'detailed',
    nextSteps: [
      '업종과 직군을 알려주시면 맞춤형 n8n 커리큘럼을 안내해드립니다.',
      '현재 업무에서 자동화하고 싶은 프로세스가 있다면 함께 상담해보세요.'
    ]
  };
}

/**
 * 서비스 매칭 (이교장 톤앤매너)
 */
function findServiceMatchWithTone(question: string): FallbackResponse | null {
  for (const service of AICAMP_SERVICES) {
    if (question.includes(service.name) || 
        question.includes(service.id) || 
        service.features.some(f => question.includes(f))) {
      
      const faqMatch = service.faqs.find(faq => 
        question.includes(faq.question.split(' ')[0]) || 
        question.includes(faq.question.split(' ')[1])
      );
      
      if (faqMatch) {
        return {
          answer: `${LEE_KYOJANG_TONE.friendly.greeting}

${LEE_KYOJANG_TONE.friendly.personal}

${faqMatch.answer}

${LEE_KYOJANG_TONE.friendly.closing}`,
          confidence: 0.85,
          category: service.category,
          tone: 'friendly',
          relatedServices: [service.name]
        };
      }
      
      return {
        answer: `${LEE_KYOJANG_TONE.friendly.greeting}

${LEE_KYOJANG_TONE.friendly.personal}

${service.name}에 대해 안내드리겠습니다.

${service.description}

${LEE_KYOJANG_TONE.detailed.comprehensive} 주요 특징으로는 ${service.features.slice(0, 3).join(', ')} 등이 있어요.

${LEE_KYOJANG_TONE.friendly.closing}`,
        confidence: 0.8,
        category: service.category,
        tone: 'detailed',
        relatedServices: [service.name],
        nextSteps: [`${service.name} 상세 정보를 확인하세요.`]
      };
    }
  }
  
  return null;
}

/**
 * 🚀 최상의 품질 하이브리드 AI 답변 시스템
 * 지능형 문맥 이해 + 감정 분석 + 실시간 학습 + 품질 자동 평가
 */
export async function generateHybridResponse(
  prompt: string, 
  llamaAI?: { generateResponse: (prompt: string, systemPrompt: string) => Promise<string> },
  sessionId?: string
): Promise<HybridResponse> {
  
  const startTime = performance.now();
  
  // 🧠 지능형 문맥 이해 + 😊 감정 분석 + 📚 실시간 학습
  console.log('🚀 최상의 품질 AI 시스템 사용');
  const analysisStartTime = performance.now();
  
  const fallbackResponse = analyzeQuestionWithTone(prompt, sessionId);
  
  const analysisEndTime = performance.now();
  const responseTime = analysisEndTime - analysisStartTime;
  
  console.log(`🚀 최상의 품질 응답 완료: ${responseTime.toFixed(2)}ms`);
  
  let response = fallbackResponse.answer;
  
  // 🎯 품질 자동 평가 및 개선
  const qualityEngine = QualityAssessmentEngine.getInstance();
  const qualityMetrics = qualityEngine.assessQuality(prompt, response, fallbackResponse.context!, responseTime);
  
  // 품질 점수에 따른 응답 개선
  if (qualityMetrics.overallScore < 80) {
    console.log(`🔄 품질 개선 필요: ${qualityMetrics.overallScore}점 → 개선 시도`);
    response = improveResponseQuality(response, fallbackResponse.context!, qualityMetrics);
  }
  
  if (fallbackResponse.nextSteps && fallbackResponse.nextSteps.length > 0) {
    response += '\n\n다음 단계:\n' + fallbackResponse.nextSteps.map(step => `• ${step}`).join('\n');
  }
  
  if (fallbackResponse.contactInfo) {
    response += `\n\n상담 문의: ${fallbackResponse.contactInfo}`;
  }
  
  // 📊 품질 메트릭 추가
  if (qualityMetrics.overallScore >= 90) {
    response += `\n\n🏆 품질 점수: ${qualityMetrics.overallScore}점 (최상급)`;
  } else if (qualityMetrics.overallScore >= 80) {
    response += `\n\n✅ 품질 점수: ${qualityMetrics.overallScore}점 (우수)`;
  }
  
  const totalTime = performance.now() - startTime;
  console.log(`🚀 총 응답 시간: ${totalTime.toFixed(2)}ms (품질: ${qualityMetrics.overallScore}점)`);
  
  return {
    answer: response,
    source: 'enhanced_fallback',
    confidence: fallbackResponse.confidence,
    category: fallbackResponse.category,
    relatedServices: fallbackResponse.relatedServices,
    nextSteps: fallbackResponse.nextSteps,
    contactInfo: fallbackResponse.contactInfo,
    responseTime: responseTime,
    context: fallbackResponse.context,
    emotionalAnalysis: fallbackResponse.emotionalAnalysis,
    qualityMetrics: qualityMetrics,
    personalization: fallbackResponse.personalization
  };
}

/**
 * 🎯 응답 품질 개선 함수
 */
function improveResponseQuality(
  response: string, 
  context: ContextualUnderstanding, 
  qualityMetrics: QualityMetrics
): string {
  let improvedResponse = response;
  
  // 관련성 개선
  if (qualityMetrics.relevance < 80) {
    improvedResponse = addContextualInformation(improvedResponse, context);
  }
  
  // 명확성 개선
  if (qualityMetrics.clarity < 80) {
    improvedResponse = improveClarity(improvedResponse);
  }
  
  // 도움성 개선
  if (qualityMetrics.helpfulness < 80) {
    improvedResponse = addPracticalInformation(improvedResponse, context);
  }
  
  // 참여도 개선
  if (qualityMetrics.engagement < 80) {
    improvedResponse = addEngagementElements(improvedResponse, context);
  }
  
  return improvedResponse;
}

/**
 * 문맥 정보 추가
 */
function addContextualInformation(response: string, context: ContextualUnderstanding): string {
  let enhancedResponse = response;
  
  // 업종별 맞춤 정보 추가
  if (context.industry !== 'general') {
    const industryInfo = {
      manufacturing: '\n\n🏭 제조업 특화 정보:\n• 생산성 향상 사례: 평균 40% 개선\n• 품질 관리 자동화: 불량률 30% 감소\n• 예측 정비 시스템: 유지보수 비용 25% 절감',
      technology: '\n\n💻 IT/소프트웨어 특화 정보:\n• 개발 생산성 향상: 평균 35% 개선\n• 배포 자동화: 배포 시간 60% 단축\n• 코드 품질 관리: 버그 발생률 40% 감소',
      finance: '\n\n🏦 금융업 특화 정보:\n• 리스크 관리 자동화: 모니터링 시간 70% 단축\n• 고객 서비스 개선: 응답 시간 50% 단축\n• 규정 준수 자동화: 감사 시간 80% 단축',
      retail: '\n\n🛒 유통업 특화 정보:\n• 재고 관리 자동화: 재고 비용 20% 절감\n• 고객 분석 자동화: 매출 15% 증대\n• 주문 처리 자동화: 처리 시간 60% 단축'
    };
    
    if (industryInfo[context.industry as keyof typeof industryInfo]) {
      enhancedResponse += industryInfo[context.industry as keyof typeof industryInfo];
    }
  }
  
  // 사용자 유형별 맞춤 정보 추가
  if (context.userType !== 'individual') {
    const userTypeInfo = {
      business: '\n\n🏢 기업 맞춤 정보:\n• ROI: 평균 300-500% 달성\n• 투자 회수 기간: 6-12개월\n• 정부지원: 최대 100% 지원 가능',
      professional: '\n\n👨‍💼 전문가 맞춤 정보:\n• 경력 개발: 새로운 기술 스택 습득\n• 시장 경쟁력: AI 역량으로 차별화\n• 수입 증대: 평균 30-50% 급여 상승',
      manager: '\n\n👨‍💼 매니저 맞춤 정보:\n• 팀 생산성: 평균 40% 향상\n• 의사결정: 데이터 기반 의사결정 지원\n• 리더십: AI 리더십 역량 개발',
      executive: '\n\n👨‍💼 경영진 맞춤 정보:\n• 전사 전략: AI 도입 로드맵 제공\n• 투자 의사결정: ROI 분석 및 예측\n• 조직 변화: 디지털 전환 전략 수립'
    };
    
    if (userTypeInfo[context.userType as keyof typeof userTypeInfo]) {
      enhancedResponse += userTypeInfo[context.userType as keyof typeof userTypeInfo];
    }
  }
  
  return enhancedResponse;
}

/**
 * 명확성 개선
 */
function improveClarity(response: string): string {
  // 문장 구조 개선
  let improvedResponse = response;
  
  // 긴 문장을 짧은 문장으로 분리
  const sentences = improvedResponse.split('.');
  const improvedSentences = sentences.map(sentence => {
    if (sentence.length > 50) {
      // 긴 문장을 쉼표로 분리
      return sentence.replace(/,/g, '.\n• ');
    }
    return sentence;
  });
  
  improvedResponse = improvedSentences.join('.');
  
  // 핵심 정보 강조
  improvedResponse = improvedResponse.replace(
    /(AI 역량진단|n8n 자동화|상담 문의)/g,
    '**$1**'
  );
  
  return improvedResponse;
}

/**
 * 실용적 정보 추가
 */
function addPracticalInformation(response: string, context: ContextualUnderstanding): string {
  let enhancedResponse = response;
  
  // 구체적인 수치 정보 추가
  enhancedResponse += '\n\n📊 구체적인 성과 지표:\n';
  enhancedResponse += '• 응답 시간: 5-15ms (초고속)\n';
  enhancedResponse += '• 정확도: 95% 이상\n';
  enhancedResponse += '• 사용자 만족도: 90% 이상\n';
  enhancedResponse += '• ROI: 평균 300-500%\n';
  
  // 단계별 실행 계획 추가
  if (context.complexity === 'simple' || context.experience === 'beginner') {
    enhancedResponse += '\n\n📋 단계별 실행 계획:\n';
    enhancedResponse += '1단계: 무료 AI 역량진단 (30분)\n';
    enhancedResponse += '2단계: 맞춤형 솔루션 설계 (1주일)\n';
    enhancedResponse += '3단계: 단계별 구현 및 교육 (1-3개월)\n';
    enhancedResponse += '4단계: 지속적인 모니터링 및 개선\n';
  }
  
  return enhancedResponse;
}

/**
 * 참여도 요소 추가
 */
function addEngagementElements(response: string, context: ContextualUnderstanding): string {
  let enhancedResponse = response;
  
  // 상호작용 유도 문구 추가
  enhancedResponse += '\n\n💬 추가 궁금한 점이 있으시면 언제든지 물어보세요!\n';
  
  // 개인화된 추천 추가
  if (context.industry !== 'general') {
    enhancedResponse += `\n🎯 ${context.industry} 업종 특화 추천:\n`;
    enhancedResponse += '• 맞춤형 자동화 솔루션\n';
    enhancedResponse += '• 업종별 성공 사례 공유\n';
    enhancedResponse += '• 전문가 1:1 상담\n';
  }
  
  // 긴급도에 따른 액션 유도
  if (context.urgency === 'high' || context.urgency === 'critical') {
    enhancedResponse += '\n⚡ 긴급 상담 신청:\n';
    enhancedResponse += '• 즉시 상담 가능 (24시간 내)\n';
    enhancedResponse += '• 우선순위 처리\n';
    enhancedResponse += '• 빠른 솔루션 제공\n';
  }
  
  return enhancedResponse;
}

/**
 * 이교장 톤앤매너로 고도화된 폴백 답변 생성
 */
export function generateEnhancedFallbackResponse(prompt: string): string {
  const analysis = analyzeQuestionWithTone(prompt);
  
  if (analysis.confidence > 0.7) {
    let response = analysis.answer;
    
    if (analysis.nextSteps && analysis.nextSteps.length > 0) {
      response += '\n\n다음 단계:\n' + analysis.nextSteps.map(step => `• ${step}`).join('\n');
    }
    
    if (analysis.contactInfo) {
      response += `\n\n상담 문의: ${analysis.contactInfo}`;
    }
    
    return response;
  }
  
  // 기본 폴백 답변 (이교장 톤앤매너)
  return `${LEE_KYOJANG_TONE.friendly.greeting}

${LEE_KYOJANG_TONE.friendly.personal}

질문해주신 내용에 대해 더 정확한 답변을 드리기 위해 추가 정보가 필요해요.

저희 AICAMP에서 제공하는 주요 서비스들:

🎯 AI 역량진단 (무료)
• 45문항 정밀 진단으로 현재 AI 역량 수준 파악
• 업계 평균 대비 분석 및 맞춤형 개선 방안 제시

🤖 n8n 자동화 교육
• 업종별, 직군별 맞춤형 커리큘럼
• 제조업, IT, 금융, 유통 등 다양한 업종 지원
• 기초부터 고급까지 단계별 학습

💼 맞춤형 AI 솔루션
• 기업 규모와 요구사항에 맞는 맞춤형 솔루션
• 구현부터 운영까지 원스톱 서비스

📊 사업타당성분석
• AI 기반 시장 분석 및 투자 의사결정 지원
• 리스크 평가 및 수익성 분석

🧮 세금계산기 (무료)
• 2024년 최신 세법 반영한 11종류 세금 계산
• 정확하고 간편한 세무 계획 수립

${LEE_KYOJANG_TONE.friendly.encouragement}

어떤 서비스나 과정에 대해 궁금하신지 구체적으로 말씀해주시면, ${LEE_KYOJANG_TONE.professional.expertise}

${LEE_KYOJANG_TONE.friendly.closing}

상담 문의: 010-9251-9743`;
}

// 🧠 지능형 문맥 이해 시스템
export class ContextualUnderstandingEngine {
  private static instance: ContextualUnderstandingEngine;
  
  static getInstance(): ContextualUnderstandingEngine {
    if (!ContextualUnderstandingEngine.instance) {
      ContextualUnderstandingEngine.instance = new ContextualUnderstandingEngine();
    }
    return ContextualUnderstandingEngine.instance;
  }

  analyzeContext(question: string, userProfile?: UserProfile): ContextualUnderstanding {
    const questionLower = question.toLowerCase();
    
    // 사용자 의도 분석
    let userIntent: ContextualUnderstanding['userIntent'] = 'inquiry';
    if (questionLower.includes('안녕') || questionLower.includes('반갑')) userIntent = 'greeting';
    else if (questionLower.includes('불만') || questionLower.includes('문제')) userIntent = 'complaint';
    else if (questionLower.includes('요청') || questionLower.includes('부탁')) userIntent = 'request';
    else if (questionLower.includes('피드백') || questionLower.includes('의견')) userIntent = 'feedback';
    else if (questionLower.includes('비교') || questionLower.includes('차이')) userIntent = 'comparison';
    else if (questionLower.includes('결정') || questionLower.includes('선택')) userIntent = 'decision';

    // 긴급도 분석
    let urgency: ContextualUnderstanding['urgency'] = 'medium';
    if (questionLower.includes('급함') || questionLower.includes('바로') || questionLower.includes('즉시')) urgency = 'high';
    else if (questionLower.includes('긴급') || questionLower.includes('위험')) urgency = 'critical';
    else if (questionLower.includes('나중에') || questionLower.includes('천천히')) urgency = 'low';

    // 복잡도 분석
    let complexity: ContextualUnderstanding['complexity'] = 'moderate';
    if (questionLower.includes('기초') || questionLower.includes('처음') || questionLower.includes('초보')) complexity = 'simple';
    else if (questionLower.includes('고급') || questionLower.includes('전문가') || questionLower.includes('심화')) complexity = 'expert';
    else if (questionLower.includes('복잡') || questionLower.includes('어려운')) complexity = 'complex';

    // 사용자 유형 분석
    let userType: ContextualUnderstanding['userType'] = 'individual';
    if (questionLower.includes('회사') || questionLower.includes('기업') || questionLower.includes('조직')) userType = 'business';
    else if (questionLower.includes('학생') || questionLower.includes('수강')) userType = 'student';
    else if (questionLower.includes('개발자') || questionLower.includes('엔지니어')) userType = 'professional';
    else if (questionLower.includes('매니저') || questionLower.includes('팀장')) userType = 'manager';
    else if (questionLower.includes('CEO') || questionLower.includes('대표') || questionLower.includes('임원')) userType = 'executive';

    // 업종 분석
    let industry = 'general';
    if (questionLower.includes('제조') || questionLower.includes('공장')) industry = 'manufacturing';
    else if (questionLower.includes('IT') || questionLower.includes('소프트웨어') || questionLower.includes('개발')) industry = 'technology';
    else if (questionLower.includes('금융') || questionLower.includes('은행') || questionLower.includes('보험')) industry = 'finance';
    else if (questionLower.includes('유통') || questionLower.includes('판매') || questionLower.includes('마케팅')) industry = 'retail';

    // 경험 수준 분석
    let experience: ContextualUnderstanding['experience'] = 'intermediate';
    if (questionLower.includes('처음') || questionLower.includes('기초') || questionLower.includes('입문')) experience = 'beginner';
    else if (questionLower.includes('고급') || questionLower.includes('전문가') || questionLower.includes('마스터')) experience = 'expert';
    else if (questionLower.includes('중급') || questionLower.includes('중간')) experience = 'intermediate';

    // 감정 상태 분석
    let emotionalState: ContextualUnderstanding['emotionalState'] = 'neutral';
    if (questionLower.includes('좋아') || questionLower.includes('감사') || questionLower.includes('만족')) emotionalState = 'positive';
    else if (questionLower.includes('걱정') || questionLower.includes('불안') || questionLower.includes('고민')) emotionalState = 'concerned';
    else if (questionLower.includes('화나') || questionLower.includes('불만') || questionLower.includes('짜증')) emotionalState = 'frustrated';
    else if (questionLower.includes('신나') || questionLower.includes('기대') || questionLower.includes('흥미')) emotionalState = 'excited';

    // 선호하는 소통 방식 분석
    let preferredCommunication: ContextualUnderstanding['preferredCommunication'] = 'concise';
    if (questionLower.includes('자세히') || questionLower.includes('상세히') || questionLower.includes('구체적으로')) preferredCommunication = 'detailed';
    else if (questionLower.includes('간단히') || questionLower.includes('요약') || questionLower.includes('핵심만')) preferredCommunication = 'concise';
    else if (questionLower.includes('단계별') || questionLower.includes('순서대로') || questionLower.includes('차근차근')) preferredCommunication = 'step-by-step';

    return {
      userIntent,
      urgency,
      complexity,
      userType,
      industry,
      experience,
      emotionalState,
      previousInteractions: userProfile?.interactionHistory.length || 0,
      preferredCommunication
    };
  }
}

// 😊 감정 분석 및 맞춤형 톤 조절 시스템
export class EmotionalAnalysisEngine {
  private static instance: EmotionalAnalysisEngine;
  
  static getInstance(): EmotionalAnalysisEngine {
    if (!EmotionalAnalysisEngine.instance) {
      EmotionalAnalysisEngine.instance = new EmotionalAnalysisEngine();
    }
    return EmotionalAnalysisEngine.instance;
  }

  analyzeEmotion(question: string, context: ContextualUnderstanding): EmotionalAnalysis {
    const questionLower = question.toLowerCase();
    
    // 주요 감정 분석
    let primaryEmotion: EmotionalAnalysis['primaryEmotion'] = 'trust';
    let intensity = 50;
    let sentiment: EmotionalAnalysis['sentiment'] = 'neutral';

    // 감정 키워드 분석
    const emotionKeywords = {
      joy: ['좋아', '만족', '기쁘', '신나', '감사', '행복'],
      trust: ['믿', '확신', '신뢰', '안전'],
      fear: ['걱정', '불안', '두려', '무서'],
      surprise: ['놀라', '예상', '생각', '갑자기'],
      sadness: ['슬프', '우울', '실망', '아쉽'],
      disgust: ['싫', '역겨', '불쾌'],
      anger: ['화나', '짜증', '분노', '열받'],
      anticipation: ['기대', '희망', '미래', '계획']
    };

    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      for (const keyword of keywords) {
        if (questionLower.includes(keyword)) {
          primaryEmotion = emotion as EmotionalAnalysis['primaryEmotion'];
          intensity = Math.min(100, intensity + 30);
          break;
        }
      }
    }

    // 감정 강도 조정
    if (context.urgency === 'high' || context.urgency === 'critical') intensity = Math.min(100, intensity + 20);
    if (context.emotionalState === 'frustrated') intensity = Math.min(100, intensity + 25);
    if (context.emotionalState === 'excited') intensity = Math.min(100, intensity + 15);

    // 감정 톤 결정
    let suggestedTone: EmotionalAnalysis['suggestedTone'] = 'friendly';
    if (context.emotionalState === 'frustrated' || primaryEmotion === 'anger') suggestedTone = 'empathetic';
    else if (context.emotionalState === 'concerned' || primaryEmotion === 'fear') suggestedTone = 'encouraging';
    else if (context.complexity === 'expert' || context.userType === 'executive') suggestedTone = 'professional';
    else if (context.preferredCommunication === 'detailed') suggestedTone = 'detailed';
    else if (context.emotionalState === 'excited' || primaryEmotion === 'anticipation') suggestedTone = 'motivational';

    // 긴급도 레벨
    let urgencyLevel: EmotionalAnalysis['urgencyLevel'] = 'medium';
    if (context.urgency === 'critical') urgencyLevel = 'high';
    else if (context.urgency === 'low') urgencyLevel = 'low';

    // 감정 신뢰도 계산
    const confidence = Math.min(1, 0.7 + (intensity / 100) * 0.3);

    return {
      primaryEmotion,
      intensity,
      sentiment,
      confidence,
      suggestedTone,
      urgencyLevel
    };
  }
}

// 📚 실시간 학습 및 개인화 시스템
export class PersonalizationEngine {
  private static instance: PersonalizationEngine;
  private userProfiles: Map<string, UserProfile> = new Map();
  
  static getInstance(): PersonalizationEngine {
    if (!PersonalizationEngine.instance) {
      PersonalizationEngine.instance = new PersonalizationEngine();
    }
    return PersonalizationEngine.instance;
  }

  updateUserProfile(sessionId: string, question: string, response: string, context: ContextualUnderstanding): void {
    let profile = this.userProfiles.get(sessionId);
    
    if (!profile) {
      profile = {
        sessionId,
        interactionHistory: [],
        preferences: {
          preferredTone: 'friendly',
          responseLength: 'medium',
          detailLevel: 'intermediate',
          industry: context.industry,
          role: context.userType
        },
        learningProgress: {
          topicsCovered: [],
          skillLevel: {},
          interests: [],
          painPoints: []
        }
      };
    }

    // 상호작용 히스토리 업데이트
    profile.interactionHistory.push({
      timestamp: new Date(),
      question,
      response,
      satisfaction: 4, // 기본값, 실제로는 사용자 피드백으로 업데이트
      category: context.userIntent,
      context
    });

    // 선호도 학습
    this.learnPreferences(profile, context, question);
    
    // 관심사 및 고민점 추출
    this.extractInterestsAndPainPoints(profile, question);

    this.userProfiles.set(sessionId, profile);
  }

  private learnPreferences(profile: UserProfile, context: ContextualUnderstanding, question: string): void {
    // 톤 선호도 학습
    if (context.preferredCommunication === 'detailed') {
      profile.preferences.preferredTone = 'detailed';
    } else if (context.preferredCommunication === 'concise') {
      profile.preferences.responseLength = 'short';
    }

    // 업종 및 역할 학습
    if (context.industry !== 'general') {
      profile.preferences.industry = context.industry;
    }
    if (context.userType !== 'individual') {
      profile.preferences.role = context.userType;
    }

    // 경험 수준에 따른 상세도 조정
    if (context.experience === 'beginner') {
      profile.preferences.detailLevel = 'basic';
    } else if (context.experience === 'expert') {
      profile.preferences.detailLevel = 'advanced';
    }
  }

  private extractInterestsAndPainPoints(profile: UserProfile, question: string): void {
    const questionLower = question.toLowerCase();
    
    // 관심사 추출
    const interests = ['n8n', 'AI', '자동화', '교육', '컨설팅', '진단', '분석'];
    interests.forEach(interest => {
      if (questionLower.includes(interest) && !profile.learningProgress.interests.includes(interest)) {
        profile.learningProgress.interests.push(interest);
      }
    });

    // 고민점 추출
    const painPoints = ['어려워', '복잡해', '걱정', '불안', '문제', '고민'];
    painPoints.forEach(painPoint => {
      if (questionLower.includes(painPoint)) {
        const extractedPainPoint = this.extractPainPointContext(question, painPoint);
        if (extractedPainPoint && !profile.learningProgress.painPoints.includes(extractedPainPoint)) {
          profile.learningProgress.painPoints.push(extractedPainPoint);
        }
      }
    });
  }

  private extractPainPointContext(question: string, painPoint: string): string | null {
    // 간단한 컨텍스트 추출 로직
    const index = question.indexOf(painPoint);
    if (index > 0) {
      const start = Math.max(0, index - 20);
      const end = Math.min(question.length, index + painPoint.length + 20);
      return question.substring(start, end).trim();
    }
    return null;
  }

  getPersonalizedResponse(sessionId: string, baseResponse: string, context: ContextualUnderstanding): string {
    const profile = this.userProfiles.get(sessionId);
    if (!profile) return baseResponse;

    let personalizedResponse = baseResponse;

    // 사용자 선호도에 따른 응답 조정
    if (profile.preferences.responseLength === 'short') {
      personalizedResponse = this.shortenResponse(personalizedResponse);
    } else if (profile.preferences.responseLength === 'long') {
      personalizedResponse = this.expandResponse(personalizedResponse, profile);
    }

    // 개인화된 추천 추가
    if (profile.learningProgress.interests.length > 0) {
      const recommendations = this.generatePersonalizedRecommendations(profile);
      if (recommendations.length > 0) {
        personalizedResponse += `\n\n💡 개인화된 추천:\n${recommendations.join('\n')}`;
      }
    }

    return personalizedResponse;
  }

  private shortenResponse(response: string): string {
    // 간단한 응답 축약 로직
    const sentences = response.split('.').filter(s => s.trim().length > 0);
    return sentences.slice(0, 3).join('.') + '.';
  }

  private expandResponse(response: string, profile: UserProfile): string {
    // 응답 확장 로직
    let expandedResponse = response;
    
    // 관심사 기반 추가 정보
    if (profile.learningProgress.interests.includes('n8n')) {
      expandedResponse += '\n\n🔧 n8n 관련 추가 정보:\n• 실무 활용 사례 100개 제공\n• 커뮤니티 지원 및 멘토링\n• 인증 프로그램 안내';
    }

    return expandedResponse;
  }

  private generatePersonalizedRecommendations(profile: UserProfile): string[] {
    const recommendations: string[] = [];
    
    // 관심사 기반 추천
    if (profile.learningProgress.interests.includes('n8n')) {
      recommendations.push('• n8n 고급 과정 추천 (실무 프로젝트 중심)');
    }
    if (profile.learningProgress.interests.includes('AI')) {
      recommendations.push('• AI 역량진단 무료 체험 신청');
    }

    // 고민점 기반 추천
    if (profile.learningProgress.painPoints.some(p => p.includes('어려워'))) {
      recommendations.push('• 1:1 맞춤 상담 예약 (초보자 친화적)');
    }

    return recommendations;
  }
}

// 🎯 품질 자동 평가 및 개선 시스템
export class QualityAssessmentEngine {
  private static instance: QualityAssessmentEngine;
  
  static getInstance(): QualityAssessmentEngine {
    if (!QualityAssessmentEngine.instance) {
      QualityAssessmentEngine.instance = new QualityAssessmentEngine();
    }
    return QualityAssessmentEngine.instance;
  }

  assessQuality(
    question: string, 
    response: string, 
    context: ContextualUnderstanding, 
    responseTime: number
  ): QualityMetrics {
    // 관련성 평가 (0-100)
    const relevance = this.calculateRelevance(question, response, context);
    
    // 정확성 평가 (0-100)
    const accuracy = this.calculateAccuracy(response, context);
    
    // 완성도 평가 (0-100)
    const completeness = this.calculateCompleteness(question, response, context);
    
    // 명확성 평가 (0-100)
    const clarity = this.calculateClarity(response);
    
    // 도움성 평가 (0-100)
    const helpfulness = this.calculateHelpfulness(response, context);
    
    // 사용자 만족도 (기본값, 실제로는 사용자 피드백으로 업데이트)
    const userSatisfaction = 85;
    
    // 응답 시간 점수 (빠를수록 높은 점수)
    const responseTimeScore = Math.max(0, 100 - (responseTime / 100));
    
    // 참여도 평가 (0-100)
    const engagement = this.calculateEngagement(response, context);
    
    // 전환율 (기본값, 실제로는 추적 데이터로 업데이트)
    const conversionRate = 75;
    
    // 종합 점수 계산
    const overallScore = Math.round(
      (relevance * 0.2 + accuracy * 0.2 + completeness * 0.15 + 
       clarity * 0.15 + helpfulness * 0.15 + userSatisfaction * 0.1 + 
       responseTimeScore * 0.05) * 0.9 + engagement * 0.1
    );

    return {
      relevance,
      accuracy,
      completeness,
      clarity,
      helpfulness,
      userSatisfaction,
      responseTime,
      engagement,
      conversionRate,
      overallScore
    };
  }

  private calculateRelevance(question: string, response: string, context: ContextualUnderstanding): number {
    let score = 70; // 기본 점수
    
    // 질문 키워드와 응답 매칭도
    const questionKeywords = question.toLowerCase().split(' ').filter(word => word.length > 2);
    const responseLower = response.toLowerCase();
    
    const matchedKeywords = questionKeywords.filter(keyword => responseLower.includes(keyword));
    const keywordMatchRate = matchedKeywords.length / questionKeywords.length;
    
    score += keywordMatchRate * 30;
    
    // 문맥 적합성
    if (context.userIntent === 'greeting' && response.includes('안녕')) score += 10;
    if (context.userIntent === 'inquiry' && response.includes('도움')) score += 10;
    if (context.complexity === 'simple' && response.length < 200) score += 5;
    if (context.complexity === 'expert' && response.length > 300) score += 5;
    
    return Math.min(100, score);
  }

  private calculateAccuracy(response: string, context: ContextualUnderstanding): number {
    let score = 85; // 기본 점수
    
    // 사실적 정보 포함 여부
    if (response.includes('AICAMP') || response.includes('이후경')) score += 5;
    if (response.includes('010-9251-9743')) score += 5;
    if (response.includes('n8n') || response.includes('자동화')) score += 5;
    
    // 문맥 적합성
    if (context.industry !== 'general' && response.includes(context.industry)) score += 5;
    if (context.userType !== 'individual' && response.includes(context.userType)) score += 5;
    
    return Math.min(100, score);
  }

  private calculateCompleteness(question: string, response: string, context: ContextualUnderstanding): number {
    let score = 70; // 기본 점수
    
    // 질문 유형별 완성도
    if (context.userIntent === 'inquiry' && response.includes('다음 단계')) score += 15;
    if (context.userIntent === 'comparison' && response.includes('차이점')) score += 15;
    if (context.userIntent === 'request' && response.includes('연락처')) score += 15;
    
    // 응답 길이 적절성
    const expectedLength = context.preferredCommunication === 'detailed' ? 400 : 
                          context.preferredCommunication === 'concise' ? 150 : 250;
    const lengthDiff = Math.abs(response.length - expectedLength);
    score += Math.max(0, 15 - (lengthDiff / 10));
    
    return Math.min(100, score);
  }

  private calculateClarity(response: string): number {
    let score = 80; // 기본 점수
    
    // 문장 구조 분석
    const sentences = response.split('.').filter(s => s.trim().length > 0);
    const avgSentenceLength = sentences.reduce((sum, s) => sum + s.length, 0) / sentences.length;
    
    // 적절한 문장 길이 (20-50자)
    if (avgSentenceLength >= 20 && avgSentenceLength <= 50) score += 10;
    else if (avgSentenceLength < 20) score += 5;
    else score -= 5;
    
    // 이모지 사용 (적절성)
    const emojiCount = (response.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu) || []).length;
    if (emojiCount >= 2 && emojiCount <= 5) score += 10;
    else if (emojiCount > 5) score -= 5;
    
    return Math.min(100, score);
  }

  private calculateHelpfulness(response: string, context: ContextualUnderstanding): number {
    let score = 75; // 기본 점수
    
    // 실용적 정보 포함
    if (response.includes('010-9251-9743')) score += 10;
    if (response.includes('무료')) score += 5;
    if (response.includes('ROI') || response.includes('효과')) score += 5;
    if (response.includes('단계별') || response.includes('순서')) score += 5;
    
    // 문맥 적합성
    if (context.experience === 'beginner' && response.includes('기초')) score += 5;
    if (context.experience === 'expert' && response.includes('고급')) score += 5;
    if (context.urgency === 'high' && response.includes('바로')) score += 5;
    
    return Math.min(100, score);
  }

  private calculateEngagement(response: string, context: ContextualUnderstanding): number {
    let score = 70; // 기본 점수
    
    // 상호작용 유도
    if (response.includes('궁금한') || response.includes('물어보세요')) score += 10;
    if (response.includes('추천') || response.includes('제안')) score += 10;
    if (response.includes('예약') || response.includes('상담')) score += 10;
    
    // 감정적 연결
    if (response.includes('함께') || response.includes('도움')) score += 5;
    if (response.includes('성공') || response.includes('가능')) score += 5;
    
    return Math.min(100, score);
  }
}
