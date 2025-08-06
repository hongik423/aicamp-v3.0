/**
 * AICAMP AI 역량진단 고도화 분석 엔진 v4.0
 * 이후경 교장 AI 역량진단 방법론 적용
 */

// ===== 1. AI 역량진단 29개 평가 항목 =====
export const AI_CAPABILITY_ASSESSMENT_ITEMS = {
  // 1그룹: AI 이해도 (5문항)
  aiUnderstanding: {
    title: 'AI 도입 관련 정보',
    items: [
      { id: 'ai_basic', label: '인공지능 기본 개념 이해', weight: 1.0 },
      { id: 'ai_trend', label: 'AI 기술 동향 파악', weight: 1.0 },
      { id: 'ai_usecase', label: '업종별 AI 활용사례 인지', weight: 1.2 },
      { id: 'ai_benefit', label: 'AI 도입 효과 이해', weight: 1.1 },
      { id: 'ai_limitation', label: 'AI 한계점 인식', weight: 0.9 }
    ]
  },
  
  // 2그룹: 전략 수립 (5문항)
  strategy: {
    title: '전략 및 계획',
    items: [
      { id: 'vision', label: 'AI 비전 수립 여부', weight: 1.3 },
      { id: 'roadmap', label: 'AI 도입 로드맵 보유', weight: 1.2 },
      { id: 'priority', label: '우선순위 설정', weight: 1.1 },
      { id: 'kpi', label: '성과지표(KPI) 설정', weight: 1.0 },
      { id: 'budget', label: '예산 계획 수립', weight: 1.0 }
    ]
  },
  
  // 3그룹: 데이터 관리 (5문항)
  dataManagement: {
    title: '데이터 관리 체계',
    items: [
      { id: 'data_quality', label: '데이터 품질 관리', weight: 1.3 },
      { id: 'data_integration', label: '데이터 통합 관리', weight: 1.2 },
      { id: 'data_security', label: '데이터 보안 체계', weight: 1.1 },
      { id: 'data_governance', label: '데이터 거버넌스', weight: 1.0 },
      { id: 'data_utilization', label: '데이터 활용도', weight: 1.1 }
    ]
  },
  
  // 4그룹: 인프라 (4문항)
  infrastructure: {
    title: 'AI 인프라',
    items: [
      { id: 'computing', label: '컴퓨팅 자원 보유', weight: 1.0 },
      { id: 'cloud', label: '클라우드 활용', weight: 1.1 },
      { id: 'tools', label: 'AI 도구/플랫폼', weight: 1.2 },
      { id: 'integration', label: '시스템 연계성', weight: 1.0 }
    ]
  },
  
  // 5그룹: 인재 역량 (5문항)
  talent: {
    title: '인재 및 역량',
    items: [
      { id: 'ai_team', label: 'AI 전담 조직', weight: 1.2 },
      { id: 'expertise', label: 'AI 전문 인력', weight: 1.3 },
      { id: 'training', label: '직원 AI 교육', weight: 1.1 },
      { id: 'collaboration', label: '부서간 협업', weight: 1.0 },
      { id: 'external', label: '외부 전문가 활용', weight: 0.9 }
    ]
  },
  
  // 6그룹: 활용 수준 (5문항)
  utilization: {
    title: 'AI 활용 수준',
    items: [
      { id: 'automation', label: '업무 자동화', weight: 1.2 },
      { id: 'analytics', label: '데이터 분석', weight: 1.1 },
      { id: 'prediction', label: '예측/추천', weight: 1.0 },
      { id: 'optimization', label: '최적화', weight: 1.0 },
      { id: 'innovation', label: '혁신 창출', weight: 1.1 }
    ]
  }
};

// ===== 2. 부서별 AI 교육 트랙 =====
export const DEPARTMENT_AI_TRACKS = {
  planning: {
    name: '기획/전략 트랙',
    icon: '📊',
    skills: [
      'AI 기반 시장 분석',
      '데이터 기반 의사결정',
      'AI 전략 수립',
      '프로젝트 관리'
    ],
    tools: ['ChatGPT', 'Claude', 'Tableau', 'Power BI'],
    expectedOutcome: '전략 수립 시간 70% 단축'
  },
  
  sales: {
    name: '영업 트랙',
    icon: '💼',
    skills: [
      '고객 데이터 분석',
      'AI 영업 자동화',
      '리드 스코어링',
      '영업 예측'
    ],
    tools: ['Salesforce AI', 'HubSpot', 'n8n', 'Zapier'],
    expectedOutcome: '영업 성과 90% 향상'
  },
  
  marketing: {
    name: '마케팅 트랙',
    icon: '📱',
    skills: [
      'AI 콘텐츠 생성',
      '고객 세분화',
      '캠페인 자동화',
      'ROI 분석'
    ],
    tools: ['Jasper AI', 'Canva AI', 'Google Analytics', 'Meta AI'],
    expectedOutcome: '마케팅 ROI 3배 증가'
  },
  
  manufacturing: {
    name: '제조/생산 트랙',
    icon: '🏭',
    skills: [
      '예측 정비',
      '품질 검사 자동화',
      '공정 최적화',
      '재고 관리'
    ],
    tools: ['IoT 플랫폼', 'Computer Vision', 'RPA', 'Digital Twin'],
    expectedOutcome: '생산성 3배 향상'
  },
  
  hr: {
    name: '인사/총무 트랙',
    icon: '👥',
    skills: [
      'AI 채용 시스템',
      '직원 성과 분석',
      '교육 추천',
      'HR 자동화'
    ],
    tools: ['Workday AI', 'BambooHR', 'Slack AI', 'MS Teams'],
    expectedOutcome: 'HR 업무 효율 80% 개선'
  },
  
  finance: {
    name: '재무/회계 트랙',
    icon: '💰',
    skills: [
      '자동 회계 처리',
      '재무 예측',
      '리스크 분석',
      '비용 최적화'
    ],
    tools: ['QuickBooks AI', 'SAP AI', 'Excel AI', 'Python'],
    expectedOutcome: '재무 정확도 95% 달성'
  }
};

// ===== 3. 업종별 AI 활용 사례 =====
export const INDUSTRY_AI_USECASES = {
  manufacturing: {
    name: '제조업',
    cases: [
      {
        title: '스마트 팩토리',
        description: 'IoT 센서와 AI를 활용한 실시간 생산 모니터링',
        impact: '생산 효율 35% 향상',
        tools: ['Digital Twin', 'Predictive Maintenance']
      },
      {
        title: '품질 검사 자동화',
        description: '컴퓨터 비전을 통한 불량품 자동 검출',
        impact: '불량률 90% 감소',
        tools: ['Computer Vision', 'Deep Learning']
      }
    ]
  },
  
  retail: {
    name: '유통/물류',
    cases: [
      {
        title: '수요 예측',
        description: 'AI 기반 판매량 예측 및 재고 최적화',
        impact: '재고 비용 40% 절감',
        tools: ['Time Series Analysis', 'Machine Learning']
      },
      {
        title: '물류 최적화',
        description: '배송 경로 최적화 및 실시간 추적',
        impact: '배송 시간 25% 단축',
        tools: ['Route Optimization', 'GPS Tracking']
      }
    ]
  },
  
  finance: {
    name: '금융업',
    cases: [
      {
        title: '신용 평가',
        description: 'AI 기반 신용 리스크 평가 모델',
        impact: '대출 심사 시간 80% 단축',
        tools: ['Credit Scoring AI', 'Risk Analytics']
      },
      {
        title: '이상거래 탐지',
        description: '실시간 사기 거래 탐지 시스템',
        impact: '사기 탐지율 95% 달성',
        tools: ['Anomaly Detection', 'Real-time Analytics']
      }
    ]
  },
  
  healthcare: {
    name: '의료/헬스케어',
    cases: [
      {
        title: 'AI 진단 보조',
        description: '의료 영상 AI 분석을 통한 진단 지원',
        impact: '진단 정확도 30% 향상',
        tools: ['Medical Image AI', 'Deep Learning']
      },
      {
        title: '맞춤형 치료',
        description: '환자 데이터 기반 개인 맞춤 치료 계획',
        impact: '치료 성공률 40% 증가',
        tools: ['Precision Medicine', 'Data Analytics']
      }
    ]
  },
  
  education: {
    name: '교육',
    cases: [
      {
        title: '맞춤형 학습',
        description: 'AI 튜터를 통한 개인별 학습 경로 제공',
        impact: '학습 효과 50% 향상',
        tools: ['Adaptive Learning', 'AI Tutor']
      },
      {
        title: '자동 평가',
        description: 'AI 기반 과제 평가 및 피드백',
        impact: '평가 시간 70% 절감',
        tools: ['NLP', 'Auto Grading']
      }
    ]
  }
};

// ===== 4. SWOT 분석 전략 매트릭스 =====
export interface SWOTStrategy {
  SO: string[]; // 강점-기회 전략
  WO: string[]; // 약점-기회 전략
  ST: string[]; // 강점-위협 전략
  WT: string[]; // 약점-위협 전략
}

export function generateSWOTStrategies(
  strengths: string[],
  weaknesses: string[],
  opportunities: string[],
  threats: string[]
): SWOTStrategy {
  return {
    SO: [
      '강점을 활용한 기회 선점 전략',
      'AI 선도 기업으로의 포지셔닝',
      '정부 지원사업 적극 활용',
      '파트너십을 통한 시장 확대'
    ],
    WO: [
      '약점 보완을 위한 교육 투자',
      '외부 전문가 영입 및 협업',
      '단계적 AI 도입 전략',
      '클라우드 기반 솔루션 활용'
    ],
    ST: [
      '강점 기반 차별화 전략',
      '선제적 기술 도입으로 경쟁 우위',
      '리스크 관리 체계 구축',
      '지속적 혁신 문화 조성'
    ],
    WT: [
      '핵심 약점 우선 개선',
      '방어적 투자 전략',
      '리스크 최소화 접근',
      '점진적 변화 관리'
    ]
  };
}

// ===== 5. AI 성숙도 레벨 =====
export const AI_MATURITY_LEVELS = {
  level1: {
    name: '초기 단계',
    score: [0, 20],
    characteristics: [
      'AI에 대한 기초적 이해',
      '개별적 실험 수준',
      '체계적 전략 부재',
      '데이터 관리 미흡'
    ],
    recommendations: [
      'AI 기초 교육 실시',
      '파일럿 프로젝트 추진',
      'AI 전략 수립',
      '데이터 수집 체계 구축'
    ]
  },
  
  level2: {
    name: '도입 단계',
    score: [21, 40],
    characteristics: [
      '일부 부서 AI 도입',
      '기초적 데이터 관리',
      'AI 활용 시도',
      '제한적 성과'
    ],
    recommendations: [
      '전사 확산 계획 수립',
      '데이터 품질 개선',
      'AI 인재 양성',
      '성과 측정 체계 구축'
    ]
  },
  
  level3: {
    name: '확산 단계',
    score: [41, 60],
    characteristics: [
      '여러 부서 AI 활용',
      '데이터 통합 관리',
      '가시적 성과 창출',
      'AI 역량 축적'
    ],
    recommendations: [
      'AI 거버넌스 구축',
      '고급 AI 기술 도입',
      '부서간 협업 강화',
      'AI 플랫폼 구축'
    ]
  },
  
  level4: {
    name: '최적화 단계',
    score: [61, 80],
    characteristics: [
      '전사적 AI 활용',
      '데이터 기반 의사결정',
      '지속적 혁신',
      'AI 문화 정착'
    ],
    recommendations: [
      'AI 혁신 센터 설립',
      '산업 생태계 주도',
      'AI 기반 신사업',
      '글로벌 확장'
    ]
  },
  
  level5: {
    name: '선도 단계',
    score: [81, 100],
    characteristics: [
      'AI 중심 경영',
      '산업 리더십',
      '혁신 생태계 구축',
      'AI 기반 비즈니스 모델'
    ],
    recommendations: [
      'AI 기술 R&D 투자',
      '스타트업 인큐베이팅',
      'AI 표준화 주도',
      '글로벌 파트너십'
    ]
  }
};

// ===== 6. 중요도-긴급성 매트릭스 =====
export interface PriorityMatrix {
  highImportanceHighUrgency: string[];  // 1순위: 즉시 실행
  highImportanceLowUrgency: string[];   // 2순위: 계획 수립
  lowImportanceHighUrgency: string[];   // 3순위: 위임/자동화
  lowImportanceLowUrgency: string[];    // 4순위: 제거/보류
}

export function generatePriorityMatrix(
  assessmentScores: Record<string, number>,
  industry: string
): PriorityMatrix {
  const avgScore = Object.values(assessmentScores).reduce((a, b) => a + b, 0) / Object.values(assessmentScores).length;
  
  if (avgScore < 3) {
    // 낮은 성숙도: 기초 구축 중심
    return {
      highImportanceHighUrgency: [
        'AI 기초 교육 실시',
        '경영진 AI 이해도 향상',
        'AI 전략 수립',
        '파일럿 프로젝트 선정'
      ],
      highImportanceLowUrgency: [
        '데이터 인프라 구축',
        'AI 인재 채용',
        '예산 확보',
        '파트너십 구축'
      ],
      lowImportanceHighUrgency: [
        '벤치마킹 실시',
        '단기 성과 창출',
        '내부 홍보'
      ],
      lowImportanceLowUrgency: [
        '고급 AI 기술 검토',
        '장기 로드맵 수립'
      ]
    };
  } else {
    // 높은 성숙도: 고도화 중심
    return {
      highImportanceHighUrgency: [
        'AI 플랫폼 구축',
        '전사 확산',
        'AI 기반 혁신',
        '성과 측정 고도화'
      ],
      highImportanceLowUrgency: [
        'AI CoE 설립',
        'R&D 투자',
        '생태계 구축',
        '글로벌 확장'
      ],
      lowImportanceHighUrgency: [
        '경쟁사 대응',
        '규제 준수',
        '리스크 관리'
      ],
      lowImportanceLowUrgency: [
        '부가 서비스 개발',
        '장기 연구 과제'
      ]
    };
  }
}

// ===== 7. ROI 계산 모델 =====
export interface ROICalculation {
  investment: {
    education: number;
    infrastructure: number;
    consulting: number;
    tools: number;
    total: number;
  };
  benefits: {
    costReduction: number;
    revenueIncrease: number;
    productivityGain: number;
    total: number;
  };
  metrics: {
    roi: number;
    paybackPeriod: number;
    npv: number;
    irr: number;
  };
}

export function calculateAIROI(
  employees: string,
  industry: string,
  currentScore: number
): ROICalculation {
  // 직원 수 기반 투자 규모 산정
  const employeeMultiplier = {
    '1-10명': 1,
    '11-50명': 2.5,
    '51-100명': 5,
    '101-300명': 10,
    '300명 이상': 20
  }[employees] || 5;
  
  const baseInvestment = 1000; // 만원 단위
  
  const investment = {
    education: baseInvestment * employeeMultiplier * 0.3,
    infrastructure: baseInvestment * employeeMultiplier * 0.3,
    consulting: baseInvestment * employeeMultiplier * 0.2,
    tools: baseInvestment * employeeMultiplier * 0.2,
    total: baseInvestment * employeeMultiplier
  };
  
  // 업종별 기대 효과 계산
  const industryMultiplier = {
    '제조업': 3.5,
    'IT/소프트웨어': 4.0,
    '유통/물류': 3.2,
    '금융': 3.8,
    '의료/헬스케어': 3.3,
    '교육': 2.8,
    '기타': 3.0
  }[industry] || 3.0;
  
  const benefits = {
    costReduction: investment.total * industryMultiplier * 0.4,
    revenueIncrease: investment.total * industryMultiplier * 0.35,
    productivityGain: investment.total * industryMultiplier * 0.25,
    total: investment.total * industryMultiplier
  };
  
  const metrics = {
    roi: ((benefits.total - investment.total) / investment.total) * 100,
    paybackPeriod: investment.total / (benefits.total / 12), // 개월
    npv: benefits.total * 3 - investment.total, // 3년 기준
    irr: 25 + (currentScore / 100) * 50 // 현재 점수 기반
  };
  
  return { investment, benefits, metrics };
}

// ===== 8. 3단계 실행 로드맵 생성 =====
export interface ExecutionRoadmap {
  phase1: {
    name: string;
    period: string;
    objectives: string[];
    keyActivities: string[];
    deliverables: string[];
    successMetrics: string[];
  };
  phase2: {
    name: string;
    period: string;
    objectives: string[];
    keyActivities: string[];
    deliverables: string[];
    successMetrics: string[];
  };
  phase3: {
    name: string;
    period: string;
    objectives: string[];
    keyActivities: string[];
    deliverables: string[];
    successMetrics: string[];
  };
}

export function generateExecutionRoadmap(
  maturityLevel: number,
  industry: string,
  weaknesses: string[]
): ExecutionRoadmap {
  if (maturityLevel < 40) {
    // 초기/도입 단계 로드맵
    return {
      phase1: {
        name: 'Phase 1: AI 기초 구축',
        period: '0-3개월',
        objectives: [
          'AI 이해도 향상',
          '조직 준비도 평가',
          '파일럿 프로젝트 선정'
        ],
        keyActivities: [
          '전 직원 AI 기초 교육 (AICAMP 커리큘럼)',
          'AI 추진 TF 구성',
          '현황 분석 및 기회 발굴',
          '파일럿 프로젝트 2-3개 선정'
        ],
        deliverables: [
          'AI 전략 보고서',
          '파일럿 프로젝트 계획서',
          '교육 이수 인증서'
        ],
        successMetrics: [
          '교육 이수율 80% 이상',
          '파일럿 프로젝트 착수',
          'AI 이해도 점수 30% 향상'
        ]
      },
      phase2: {
        name: 'Phase 2: AI 도입 및 확산',
        period: '3-6개월',
        objectives: [
          '파일럿 성과 창출',
          '데이터 체계 구축',
          '핵심 프로세스 AI 적용'
        ],
        keyActivities: [
          '파일럿 프로젝트 실행',
          '데이터 수집/정제 체계 구축',
          '부서별 AI 활용 교육',
          'AI 도구 도입 (n8n, ChatGPT 등)'
        ],
        deliverables: [
          '파일럿 성과 보고서',
          '데이터 거버넌스 문서',
          'AI 활용 가이드'
        ],
        successMetrics: [
          '파일럿 ROI 150% 달성',
          '3개 이상 부서 AI 도입',
          '업무 효율 20% 개선'
        ]
      },
      phase3: {
        name: 'Phase 3: AI 고도화',
        period: '6-12개월',
        objectives: [
          '전사 AI 확산',
          'AI 기반 혁신',
          '지속 가능한 AI 체계'
        ],
        keyActivities: [
          '전사 AI 플랫폼 구축',
          'AI 성과 관리 체계 운영',
          '지속적 교육 및 개선',
          'AI 기반 신규 서비스 개발'
        ],
        deliverables: [
          'AI 플랫폼',
          '성과 대시보드',
          '혁신 사례집'
        ],
        successMetrics: [
          '전사 AI 활용률 70%',
          '연간 비용 절감 30%',
          '신규 수익 창출'
        ]
      }
    };
  } else {
    // 확산/최적화 단계 로드맵
    return {
      phase1: {
        name: 'Phase 1: AI 최적화',
        period: '0-3개월',
        objectives: [
          'AI 성과 극대화',
          '고급 AI 기술 도입',
          'AI 거버넌스 강화'
        ],
        keyActivities: [
          'AI 성과 분석 및 개선',
          'MLOps 체계 구축',
          'AI 윤리 가이드라인 수립',
          '고급 AI 기술 POC'
        ],
        deliverables: [
          'AI 성과 분석 보고서',
          'MLOps 플랫폼',
          'AI 윤리 가이드'
        ],
        successMetrics: [
          'AI 모델 정확도 90%',
          '자동화율 50% 달성',
          'AI 거버넌스 체계 구축'
        ]
      },
      phase2: {
        name: 'Phase 2: AI 혁신',
        period: '3-6개월',
        objectives: [
          'AI 기반 비즈니스 혁신',
          '생태계 참여',
          'AI 리더십 구축'
        ],
        keyActivities: [
          'AI 기반 신사업 모델 개발',
          'AI 스타트업 협업',
          'AI 컨퍼런스 참여',
          'AI 특허 출원'
        ],
        deliverables: [
          '신사업 계획서',
          '파트너십 계약',
          'AI 특허'
        ],
        successMetrics: [
          '신규 수익 20% 창출',
          '3개 이상 파트너십',
          'AI 특허 2건 이상'
        ]
      },
      phase3: {
        name: 'Phase 3: AI 선도',
        period: '6-12개월',
        objectives: [
          '산업 AI 리더',
          '글로벌 확장',
          'AI 표준 주도'
        ],
        keyActivities: [
          'AI CoE 운영',
          '글로벌 AI 프로젝트',
          'AI 표준화 참여',
          'AI 인재 육성 프로그램'
        ],
        deliverables: [
          'AI CoE 성과',
          '글로벌 프로젝트',
          'AI 표준 제안서'
        ],
        successMetrics: [
          '업계 AI 선도 기업',
          '글로벌 매출 30%',
          'AI 인재 50명 육성'
        ]
      }
    };
  }
}

// ===== 9. AICAMP 맞춤 제안 생성 =====
export interface AICampProposal {
  recommendedProgram: {
    name: string;
    duration: string;
    curriculum: string[];
    expectedOutcome: string;
  };
  governmentSupport: {
    program: string;
    supportRate: number;
    maxAmount: string;
    eligibility: string[];
  };
  customServices: {
    consulting: string;
    training: string;
    implementation: string;
    support: string;
  };
  pricing: {
    original: string;
    discount: string;
    government: string;
    final: string;
  };
}

export function generateAICampProposal(
  industry: string,
  employees: string,
  weaknesses: string[],
  score: number
): AICampProposal {
  // 규모별 프로그램 추천
  const programScale = parseInt(employees.split('-')[0]) > 50 ? 'enterprise' : 'startup';
  
  const programs = {
    startup: {
      name: 'AI 스타트업 집중 과정',
      duration: '8주 (주 2회, 3시간)',
      curriculum: [
        'Week 1-2: AI 기초 및 트렌드',
        'Week 3-4: ChatGPT & Claude 실무',
        'Week 5-6: n8n 자동화 구축',
        'Week 7-8: AI 프로젝트 실습'
      ],
      expectedOutcome: '즉시 적용 가능한 AI 역량'
    },
    enterprise: {
      name: '기업 맞춤형 AI 전환 프로그램',
      duration: '12주 (주 3회, 4시간)',
      curriculum: [
        'Module 1: AI 전략 및 거버넌스',
        'Module 2: 부서별 AI 실무 교육',
        'Module 3: AI 프로젝트 실행',
        'Module 4: 성과 측정 및 확산'
      ],
      expectedOutcome: '전사적 AI 역량 구축'
    }
  };
  
  // 정부 지원 프로그램
  const governmentPrograms = {
    '제조업': {
      program: '스마트공장 구축 지원사업',
      supportRate: 70,
      maxAmount: '1억원',
      eligibility: ['중소기업', '제조업', '스마트공장 미구축']
    },
    'IT/소프트웨어': {
      program: 'AI 바우처 지원사업',
      supportRate: 80,
      maxAmount: '5천만원',
      eligibility: ['중소기업', 'AI 도입 의지', '데이터 보유']
    },
    default: {
      program: '중소기업 디지털 전환 지원',
      supportRate: 60,
      maxAmount: '3천만원',
      eligibility: ['중소기업', '디지털 전환 계획']
    }
  };
  
  const selectedProgram = programs[programScale];
  const govSupport = governmentPrograms[industry] || governmentPrograms.default;
  
  // 가격 계산
  const basePrice = programScale === 'enterprise' ? 5000 : 2000; // 만원
  const discountRate = score < 50 ? 0.3 : 0.2; // 낮은 점수일수록 더 많은 할인
  
  return {
    recommendedProgram: selectedProgram,
    governmentSupport: govSupport,
    customServices: {
      consulting: `${industry} 특화 AI 컨설팅`,
      training: `부서별 맞춤 교육 (${Object.keys(DEPARTMENT_AI_TRACKS).length}개 트랙)`,
      implementation: 'AI 도구 구축 지원 (n8n, ChatGPT, Claude)',
      support: '12개월 무료 기술 지원'
    },
    pricing: {
      original: `${basePrice}만원`,
      discount: `${Math.round(basePrice * discountRate)}만원`,
      government: `${Math.round(basePrice * (1 - discountRate) * govSupport.supportRate / 100)}만원`,
      final: `${Math.round(basePrice * (1 - discountRate) * (1 - govSupport.supportRate / 100))}만원`
    }
  };
}

// ===== 10. 종합 보고서 생성 함수 =====
export interface ComprehensiveAIReport {
  executive_summary: {
    company: string;
    industry: string;
    overallScore: number;
    maturityLevel: string;
    keyFindings: string[];
    urgentActions: string[];
  };
  detailed_assessment: {
    scoresByCategory: Record<string, number>;
    strengths: string[];
    weaknesses: string[];
    industryComparison: string;
  };
  swot_analysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
    strategies: SWOTStrategy;
  };
  priority_matrix: PriorityMatrix;
  execution_roadmap: ExecutionRoadmap;
  roi_analysis: ROICalculation;
  aicamp_proposal: AICampProposal;
  next_steps: string[];
}

export function generateComprehensiveReport(
  companyInfo: {
    name: string;
    industry: string;
    employees: string;
    businessContent: string;
    challenges: string;
  },
  assessmentScores: Record<string, number>
): ComprehensiveAIReport {
  // 점수 계산
  const scores = Object.values(assessmentScores);
  const overallScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 20); // 1-5점을 0-100점으로 변환
  
  // 성숙도 레벨 결정
  const maturityLevel = Object.values(AI_MATURITY_LEVELS).find(
    level => overallScore >= level.score[0] && overallScore <= level.score[1]
  )!;
  
  // SWOT 분석
  const swotData = {
    strengths: overallScore > 60 ? 
      ['AI 도입 의지 강함', '경영진 지원', '기존 IT 인프라'] :
      ['변화 수용 의지', '학습 열의', '정부 지원 가능'],
    weaknesses: overallScore < 40 ?
      ['AI 이해도 부족', '전문 인력 부재', '데이터 체계 미흡'] :
      ['고급 AI 역량 부족', '혁신 문화 미흡'],
    opportunities: ['AI 시장 성장', '정부 지원', '경쟁 우위 기회'],
    threats: ['경쟁사 AI 도입', '기술 격차', '인재 확보 어려움']
  };
  
  const swotStrategies = generateSWOTStrategies(
    swotData.strengths,
    swotData.weaknesses,
    swotData.opportunities,
    swotData.threats
  );
  
  // 우선순위 매트릭스
  const priorityMatrix = generatePriorityMatrix(assessmentScores, companyInfo.industry);
  
  // 실행 로드맵
  const roadmap = generateExecutionRoadmap(overallScore, companyInfo.industry, swotData.weaknesses);
  
  // ROI 분석
  const roiAnalysis = calculateAIROI(companyInfo.employees, companyInfo.industry, overallScore);
  
  // AICAMP 제안
  const aicampProposal = generateAICampProposal(
    companyInfo.industry,
    companyInfo.employees,
    swotData.weaknesses,
    overallScore
  );
  
  return {
    executive_summary: {
      company: companyInfo.name,
      industry: companyInfo.industry,
      overallScore,
      maturityLevel: maturityLevel.name,
      keyFindings: [
        `AI 성숙도 ${maturityLevel.name} (${overallScore}점)`,
        `업계 평균 대비 ${overallScore > 50 ? '우수' : '개선 필요'}`,
        `ROI ${roiAnalysis.metrics.roi.toFixed(0)}% 예상`
      ],
      urgentActions: priorityMatrix.highImportanceHighUrgency
    },
    detailed_assessment: {
      scoresByCategory: assessmentScores,
      strengths: maturityLevel.characteristics,
      weaknesses: swotData.weaknesses,
      industryComparison: `${companyInfo.industry} 평균 대비 ${overallScore > 50 ? '상위' : '하위'} 수준`
    },
    swot_analysis: {
      ...swotData,
      strategies: swotStrategies
    },
    priority_matrix: priorityMatrix,
    execution_roadmap: roadmap,
    roi_analysis: roiAnalysis,
    aicamp_proposal: aicampProposal,
    next_steps: [
      '1. AICAMP 무료 상담 신청',
      '2. AI 역량진단 결과 경영진 보고',
      '3. AI 추진 TF 구성',
      '4. 정부 지원사업 신청',
      '5. AICAMP 교육 프로그램 시작'
    ]
  };
}