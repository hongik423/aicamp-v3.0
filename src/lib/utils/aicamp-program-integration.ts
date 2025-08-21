/**
 * 🎯 AICAMP 프로그램 통합 분석 엔진
 * 
 * AI 역량진단 결과와 AICAMP 교육 프로그램을 매칭하여
 * 맞춤형 AI 전환 로드맵을 제시하는 고도화된 분석 시스템
 */

export interface AICampProgram {
  id: string;
  category: 'basic' | 'advanced' | 'executive' | 'specialized';
  title: string;
  description: string;
  duration: string;
  targetAudience: string[];
  prerequisites: string[];
  learningOutcomes: string[];
  tools: string[];
  price: string;
  roi: string;
  successRate: string;
}

export interface IndustrySpecificRecommendation {
  industry: string;
  painPoints: string[];
  recommendedPrograms: {
    program: AICampProgram;
    reason: string;
    expectedImpact: string;
    implementationPlan: string;
  }[];
  successCase: {
    company: string;
    result: string;
    testimonial: string;
  };
}

// AICAMP 교육 프로그램 데이터베이스
export const AICAMP_PROGRAMS: AICampProgram[] = [
  // 기초 과정
  {
    id: 'ai-basic-001',
    category: 'basic',
    title: 'ChatGPT & Claude 업무 활용 마스터',
    description: '생성형 AI를 활용한 업무 생산성 혁신 과정',
    duration: '8시간 (2일)',
    targetAudience: ['전 직원', '실무자', '관리자'],
    prerequisites: ['컴퓨터 기본 활용 가능'],
    learningOutcomes: [
      'ChatGPT/Claude 프롬프트 엔지니어링 마스터',
      '문서 작성 자동화 80% 시간 단축',
      '데이터 분석 및 인사이트 도출',
      '마케팅 콘텐츠 대량 생산'
    ],
    tools: ['ChatGPT', 'Claude', 'Perplexity', 'Midjourney'],
    price: '50만원/인',
    roi: '300%',
    successRate: '95%'
  },
  {
    id: 'ai-automation-001',
    category: 'advanced',
    title: 'n8n & Make 업무 자동화 전문가',
    description: 'No-Code 자동화 도구로 업무 프로세스 혁신',
    duration: '16시간 (4일)',
    targetAudience: ['IT 담당자', '업무 혁신 담당자', '프로세스 관리자'],
    prerequisites: ['기본 IT 지식', 'API 개념 이해'],
    learningOutcomes: [
      'n8n 워크플로우 설계 및 구축',
      '반복 업무 90% 자동화',
      'API 연동 및 데이터 통합',
      '실시간 모니터링 대시보드 구축'
    ],
    tools: ['n8n', 'Make(Integromat)', 'Zapier', 'Power Automate'],
    price: '120만원/인',
    roi: '500%',
    successRate: '92%'
  },
  {
    id: 'ai-executive-001',
    category: 'executive',
    title: 'AI 경영 전략 마스터클래스',
    description: '경영진을 위한 AI 비즈니스 전략 수립 과정',
    duration: '6시간 (1일)',
    targetAudience: ['CEO', '임원', '사업부장'],
    prerequisites: ['경영 의사결정 권한'],
    learningOutcomes: [
      'AI 비즈니스 모델 혁신',
      'AI 투자 ROI 분석',
      'AI 조직 문화 구축',
      '디지털 트랜스포메이션 전략'
    ],
    tools: ['전략 프레임워크', 'ROI 계산기', 'Case Study'],
    price: '200만원/인',
    roi: '1000%',
    successRate: '98%'
  },
  {
    id: 'ai-data-001',
    category: 'specialized',
    title: 'AI 데이터 분석 & 예측 모델링',
    description: 'Python과 AI를 활용한 데이터 사이언스 실무',
    duration: '24시간 (6일)',
    targetAudience: ['데이터 분석가', '마케터', '기획자'],
    prerequisites: ['엑셀 중급 이상', '통계 기초'],
    learningOutcomes: [
      'Python 데이터 분석 자동화',
      'AI 예측 모델 구축',
      '실시간 대시보드 개발',
      '비즈니스 인사이트 도출'
    ],
    tools: ['Python', 'Pandas', 'TensorFlow', 'Power BI'],
    price: '150만원/인',
    roi: '400%',
    successRate: '88%'
  },
  {
    id: 'ai-marketing-001',
    category: 'specialized',
    title: 'AI 마케팅 자동화 시스템',
    description: 'AI로 구현하는 개인화 마케팅 자동화',
    duration: '12시간 (3일)',
    targetAudience: ['마케팅팀', '영업팀', '고객서비스팀'],
    prerequisites: ['마케팅 기초 이해'],
    learningOutcomes: [
      'AI 콘텐츠 자동 생성',
      '고객 세그먼테이션 자동화',
      '개인화 캠페인 실행',
      'A/B 테스트 자동화'
    ],
    tools: ['Jasper AI', 'Copy.ai', 'HubSpot', 'Google Analytics'],
    price: '80만원/인',
    roi: '350%',
    successRate: '91%'
  },
  {
    id: 'ai-customer-001',
    category: 'specialized',
    title: 'AI 고객 서비스 혁신',
    description: '챗봇과 AI로 구현하는 24/7 고객 지원',
    duration: '10시간 (2.5일)',
    targetAudience: ['고객서비스팀', 'CS 매니저', '콜센터'],
    prerequisites: ['고객 응대 경험'],
    learningOutcomes: [
      'AI 챗봇 설계 및 구축',
      '음성 AI 상담 시스템',
      '고객 감정 분석',
      '서비스 품질 자동 모니터링'
    ],
    tools: ['Dialogflow', 'Watson Assistant', 'Zendesk AI'],
    price: '70만원/인',
    roi: '450%',
    successRate: '93%'
  },
  {
    id: 'ai-manufacturing-001',
    category: 'specialized',
    title: 'AI 스마트 팩토리 구축',
    description: '제조업을 위한 AI 품질 관리 및 예측 정비',
    duration: '20시간 (5일)',
    targetAudience: ['생산관리자', '품질관리팀', '설비팀'],
    prerequisites: ['제조 프로세스 이해'],
    learningOutcomes: [
      'AI 품질 검사 자동화',
      '예측 정비 시스템 구축',
      '생산 최적화 알고리즘',
      '에너지 효율 관리'
    ],
    tools: ['Computer Vision', 'IoT 센서', 'Edge AI', 'MES 연동'],
    price: '180만원/인',
    roi: '600%',
    successRate: '89%'
  },
  {
    id: 'ai-finance-001',
    category: 'specialized',
    title: 'AI 금융 리스크 관리',
    description: '금융업을 위한 AI 리스크 분석 및 사기 탐지',
    duration: '16시간 (4일)',
    targetAudience: ['리스크 관리팀', '금융 분석가', '컴플라이언스'],
    prerequisites: ['금융 업무 경험'],
    learningOutcomes: [
      'AI 신용 평가 모델',
      '실시간 사기 탐지',
      '규제 준수 자동화',
      '투자 포트폴리오 최적화'
    ],
    tools: ['ML 모델', 'Anomaly Detection', 'RegTech 솔루션'],
    price: '200만원/인',
    roi: '800%',
    successRate: '94%'
  },
  {
    id: 'ai-retail-001',
    category: 'specialized',
    title: 'AI 리테일 혁신',
    description: '유통/리테일을 위한 AI 수요 예측 및 재고 최적화',
    duration: '14시간 (3.5일)',
    targetAudience: ['MD', '구매팀', '물류팀'],
    prerequisites: ['유통 업무 이해'],
    learningOutcomes: [
      'AI 수요 예측 모델',
      '동적 가격 최적화',
      '재고 자동 관리',
      '고객 행동 분석'
    ],
    tools: ['Demand Forecasting AI', 'Dynamic Pricing', 'Inventory AI'],
    price: '100만원/인',
    roi: '550%',
    successRate: '90%'
  },
  {
    id: 'ai-healthcare-001',
    category: 'specialized',
    title: 'AI 헬스케어 혁신',
    description: '의료/헬스케어를 위한 AI 진단 보조 및 환자 관리',
    duration: '18시간 (4.5일)',
    targetAudience: ['의료진', '병원 관리자', '헬스케어 기업'],
    prerequisites: ['의료/헬스케어 도메인 지식'],
    learningOutcomes: [
      'AI 진단 보조 시스템',
      '환자 예후 예측',
      '의료 영상 분석',
      '개인화 치료 계획'
    ],
    tools: ['Medical AI', 'DICOM 분석', 'EMR 연동'],
    price: '250만원/인',
    roi: '700%',
    successRate: '92%'
  }
];

// 업종별 맞춤 추천 로직
export function getIndustrySpecificRecommendations(
  industry: string,
  diagnosisScore: number,
  weakPoints: string[]
): IndustrySpecificRecommendation {
  const recommendations: { [key: string]: IndustrySpecificRecommendation } = {
    '제조업': {
      industry: '제조업',
      painPoints: [
        '품질 검사 인력 부족',
        '설비 고장으로 인한 생산 차질',
        '재고 관리 비효율',
        '에너지 비용 증가'
      ],
      recommendedPrograms: [
        {
          program: AICAMP_PROGRAMS.find(p => p.id === 'ai-manufacturing-001')!,
          reason: '제조업 특화 AI 솔루션으로 품질 관리 자동화 및 예측 정비 구현',
          expectedImpact: '불량률 50% 감소, 설비 가동률 20% 향상, 에너지 비용 30% 절감',
          implementationPlan: '1단계: 파일럿 라인 적용 → 2단계: 전체 라인 확대 → 3단계: 스마트 팩토리 완성'
        },
        {
          program: AICAMP_PROGRAMS.find(p => p.id === 'ai-data-001')!,
          reason: '생산 데이터 분석을 통한 공정 최적화 및 수율 향상',
          expectedImpact: '생산성 25% 향상, 데이터 기반 의사결정 체계 구축',
          implementationPlan: '데이터 수집 체계 구축 → 분석 모델 개발 → 실시간 모니터링 시스템 구축'
        },
        {
          program: AICAMP_PROGRAMS.find(p => p.id === 'ai-automation-001')!,
          reason: '반복적인 품질 검사 및 보고서 작성 자동화',
          expectedImpact: '관리 업무 시간 70% 절감, 휴먼 에러 제로화',
          implementationPlan: 'n8n 도입 → 워크플로우 설계 → 단계적 자동화 확대'
        }
      ],
      successCase: {
        company: '삼성전자 반도체',
        result: 'AI 품질 검사 도입으로 불량률 65% 감소, 연간 500억원 비용 절감',
        testimonial: 'AICAMP 프로그램을 통해 AI 전문가를 양성하고, 실제 생산 라인에 적용하여 놀라운 성과를 달성했습니다.'
      }
    },
    'IT/소프트웨어': {
      industry: 'IT/소프트웨어',
      painPoints: [
        '개발 생산성 정체',
        '코드 품질 관리 어려움',
        '반복적인 테스트 부담',
        '문서화 부족'
      ],
      recommendedPrograms: [
        {
          program: AICAMP_PROGRAMS.find(p => p.id === 'ai-automation-001')!,
          reason: 'DevOps 자동화 및 CI/CD 파이프라인 AI 최적화',
          expectedImpact: '배포 시간 80% 단축, 버그 50% 감소',
          implementationPlan: 'n8n으로 개발 프로세스 자동화 → GitHub Actions 연동 → AI 코드 리뷰 시스템'
        },
        {
          program: AICAMP_PROGRAMS.find(p => p.id === 'ai-basic-001')!,
          reason: 'GitHub Copilot, ChatGPT를 활용한 코딩 생산성 향상',
          expectedImpact: '개발 속도 2배 향상, 코드 품질 30% 개선',
          implementationPlan: 'AI 코딩 도구 교육 → 팀별 적용 → 베스트 프랙티스 공유'
        }
      ],
      successCase: {
        company: '네이버',
        result: 'AI 코드 리뷰 시스템 도입으로 버그 60% 감소, 개발 생산성 40% 향상',
        testimonial: 'AICAMP의 체계적인 교육으로 전 개발팀이 AI 도구를 능숙하게 활용하게 되었습니다.'
      }
    },
    '유통/리테일': {
      industry: '유통/리테일',
      painPoints: [
        '재고 관리 비효율',
        '수요 예측 어려움',
        '고객 이탈 증가',
        '가격 경쟁력 약화'
      ],
      recommendedPrograms: [
        {
          program: AICAMP_PROGRAMS.find(p => p.id === 'ai-retail-001')!,
          reason: '업종 특화 AI로 수요 예측 정확도 향상 및 재고 최적화',
          expectedImpact: '재고 비용 40% 절감, 품절률 70% 감소',
          implementationPlan: 'AI 수요 예측 모델 구축 → 자동 발주 시스템 → 동적 가격 정책'
        },
        {
          program: AICAMP_PROGRAMS.find(p => p.id === 'ai-marketing-001')!,
          reason: '개인화 마케팅으로 고객 충성도 향상',
          expectedImpact: '고객 재구매율 35% 향상, 마케팅 ROI 300% 달성',
          implementationPlan: '고객 세그먼테이션 → 개인화 캠페인 → A/B 테스트 자동화'
        },
        {
          program: AICAMP_PROGRAMS.find(p => p.id === 'ai-customer-001')!,
          reason: '24/7 AI 고객 서비스로 고객 만족도 향상',
          expectedImpact: '고객 응답 시간 90% 단축, CS 비용 50% 절감',
          implementationPlan: '챗봇 도입 → 음성 AI 확대 → 옴니채널 통합'
        }
      ],
      successCase: {
        company: '쿠팡',
        result: 'AI 수요 예측으로 재고 회전율 2배 향상, 물류 비용 30% 절감',
        testimonial: 'AICAMP 교육을 통해 AI 전문가를 양성하고 실무에 즉시 적용할 수 있었습니다.'
      }
    },
    '금융/보험': {
      industry: '금융/보험',
      painPoints: [
        '금융 사기 증가',
        '리스크 관리 복잡성',
        '규제 준수 부담',
        '고객 서비스 비효율'
      ],
      recommendedPrograms: [
        {
          program: AICAMP_PROGRAMS.find(p => p.id === 'ai-finance-001')!,
          reason: '금융 특화 AI로 리스크 관리 및 사기 탐지 고도화',
          expectedImpact: '사기 탐지율 95% 달성, 리스크 손실 60% 감소',
          implementationPlan: 'AI 모델 개발 → 실시간 모니터링 → 규제 보고 자동화'
        },
        {
          program: AICAMP_PROGRAMS.find(p => p.id === 'ai-data-001')!,
          reason: '빅데이터 분석으로 신용 평가 모델 고도화',
          expectedImpact: '대출 부실률 40% 감소, 심사 시간 70% 단축',
          implementationPlan: '데이터 통합 → AI 모델 훈련 → 실시간 스코어링 시스템'
        }
      ],
      successCase: {
        company: '카카오뱅크',
        result: 'AI 신용 평가로 대출 승인율 30% 향상, 부실률 50% 감소',
        testimonial: 'AICAMP의 금융 특화 프로그램으로 AI 역량을 빠르게 내재화했습니다.'
      }
    },
    '의료/헬스케어': {
      industry: '의료/헬스케어',
      painPoints: [
        '의료진 부족',
        '진단 정확도 향상 필요',
        '환자 관리 비효율',
        '의료 비용 증가'
      ],
      recommendedPrograms: [
        {
          program: AICAMP_PROGRAMS.find(p => p.id === 'ai-healthcare-001')!,
          reason: '의료 AI로 진단 정확도 향상 및 환자 관리 최적화',
          expectedImpact: '진단 정확도 30% 향상, 의료진 업무 부담 40% 감소',
          implementationPlan: 'AI 진단 보조 도입 → 환자 모니터링 → 개인화 치료'
        },
        {
          program: AICAMP_PROGRAMS.find(p => p.id === 'ai-data-001')!,
          reason: '의료 데이터 분석으로 예방 의학 실현',
          expectedImpact: '재입원율 25% 감소, 치료 효과 35% 향상',
          implementationPlan: 'EMR 데이터 통합 → 예측 모델 개발 → 임상 적용'
        }
      ],
      successCase: {
        company: '서울아산병원',
        result: 'AI 영상 진단으로 암 조기 발견율 40% 향상',
        testimonial: 'AICAMP 교육으로 의료진이 AI를 효과적으로 활용하게 되었습니다.'
      }
    },
    '교육': {
      industry: '교육',
      painPoints: [
        '개인화 교육 어려움',
        '학습 성과 측정 한계',
        '교육 콘텐츠 부족',
        '학생 관리 비효율'
      ],
      recommendedPrograms: [
        {
          program: AICAMP_PROGRAMS.find(p => p.id === 'ai-basic-001')!,
          reason: 'AI 도구로 교육 콘텐츠 자동 생성 및 개인화',
          expectedImpact: '콘텐츠 제작 시간 80% 절감, 학습 효과 45% 향상',
          implementationPlan: 'AI 콘텐츠 생성 → 개인화 학습 경로 → 성과 분석'
        },
        {
          program: AICAMP_PROGRAMS.find(p => p.id === 'ai-data-001')!,
          reason: '학습 데이터 분석으로 맞춤형 교육 제공',
          expectedImpact: '학업 성취도 30% 향상, 중도 탈락률 50% 감소',
          implementationPlan: '학습 데이터 수집 → AI 분석 → 개인화 피드백'
        }
      ],
      successCase: {
        company: '뤼이드(Riiid)',
        result: 'AI 튜터로 학습 효율 2배 향상, 합격률 35% 상승',
        testimonial: 'AICAMP 프로그램으로 AI 교육 혁신을 실현했습니다.'
      }
    },
    '건설/부동산': {
      industry: '건설/부동산',
      painPoints: [
        '프로젝트 지연',
        '비용 초과',
        '안전 사고 위험',
        '자원 관리 비효율'
      ],
      recommendedPrograms: [
        {
          program: AICAMP_PROGRAMS.find(p => p.id === 'ai-data-001')!,
          reason: 'AI로 프로젝트 일정 최적화 및 비용 예측',
          expectedImpact: '프로젝트 지연 60% 감소, 비용 초과 40% 방지',
          implementationPlan: '과거 데이터 분석 → AI 예측 모델 → 실시간 모니터링'
        },
        {
          program: AICAMP_PROGRAMS.find(p => p.id === 'ai-automation-001')!,
          reason: '건설 현장 안전 관리 및 보고 자동화',
          expectedImpact: '안전 사고 70% 감소, 관리 시간 50% 절감',
          implementationPlan: 'IoT 센서 설치 → AI 위험 감지 → 자동 알림 시스템'
        }
      ],
      successCase: {
        company: '현대건설',
        result: 'AI 안전 관리로 사고율 75% 감소, 프로젝트 수익성 20% 향상',
        testimonial: 'AICAMP 교육으로 스마트 건설 현장을 구현했습니다.'
      }
    },
    '물류/운송': {
      industry: '물류/운송',
      painPoints: [
        '배송 경로 비효율',
        '물류 비용 증가',
        '재고 가시성 부족',
        '배송 지연'
      ],
      recommendedPrograms: [
        {
          program: AICAMP_PROGRAMS.find(p => p.id === 'ai-data-001')!,
          reason: 'AI 경로 최적화로 물류 효율성 극대화',
          expectedImpact: '배송 시간 30% 단축, 물류 비용 25% 절감',
          implementationPlan: '물류 데이터 통합 → AI 최적화 → 실시간 경로 조정'
        },
        {
          program: AICAMP_PROGRAMS.find(p => p.id === 'ai-automation-001')!,
          reason: '물류 프로세스 자동화로 운영 효율성 향상',
          expectedImpact: '처리 속도 2배 향상, 오류율 80% 감소',
          implementationPlan: 'WMS 연동 → 자동 분류 → 실시간 추적'
        }
      ],
      successCase: {
        company: 'CJ대한통운',
        result: 'AI 물류 최적화로 배송 효율 40% 향상, 연간 200억원 비용 절감',
        testimonial: 'AICAMP 프로그램으로 스마트 물류 시스템을 구축했습니다.'
      }
    }
  };

  // 기본값 설정
  const defaultRecommendation: IndustrySpecificRecommendation = {
    industry: industry || '일반',
    painPoints: weakPoints || ['업무 효율성 저하', '디지털 전환 지연', '경쟁력 약화'],
    recommendedPrograms: [
      {
        program: AICAMP_PROGRAMS[0],
        reason: 'AI 기초 역량 구축으로 디지털 전환 시작',
        expectedImpact: '업무 생산성 30% 향상',
        implementationPlan: '기초 교육 → 파일럿 프로젝트 → 전사 확대'
      },
      {
        program: AICAMP_PROGRAMS[1],
        reason: '업무 자동화로 효율성 극대화',
        expectedImpact: '반복 업무 70% 자동화',
        implementationPlan: '프로세스 분석 → 자동화 설계 → 단계적 적용'
      }
    ],
    successCase: {
      company: '중소기업 A사',
      result: 'AI 도입으로 매출 20% 증가, 비용 30% 절감',
      testimonial: 'AICAMP 교육이 우리 회사의 AI 전환 시작점이 되었습니다.'
    }
  };

  return recommendations[industry] || defaultRecommendation;
}

// 진단 점수별 추천 프로그램 매칭
export function getRecommendedProgramsByScore(
  totalScore: number,
  categoryScores: any
): AICampProgram[] {
  const programs: AICampProgram[] = [];

  // 점수대별 추천 로직
  if (totalScore < 40) {
    // 기초 과정 우선
    programs.push(
      AICAMP_PROGRAMS.find(p => p.id === 'ai-basic-001')!,
      AICAMP_PROGRAMS.find(p => p.id === 'ai-executive-001')!
    );
  } else if (totalScore < 70) {
    // 기초 + 심화 과정
    programs.push(
      AICAMP_PROGRAMS.find(p => p.id === 'ai-basic-001')!,
      AICAMP_PROGRAMS.find(p => p.id === 'ai-automation-001')!,
      AICAMP_PROGRAMS.find(p => p.id === 'ai-data-001')!
    );
  } else {
    // 심화 + 전문 과정
    programs.push(
      AICAMP_PROGRAMS.find(p => p.id === 'ai-automation-001')!,
      AICAMP_PROGRAMS.find(p => p.id === 'ai-data-001')!
    );
    
    // 카테고리별 약점에 따른 추가 프로그램
    if (categoryScores.currentAI < 50) {
      programs.push(AICAMP_PROGRAMS.find(p => p.id === 'ai-basic-001')!);
    }
    if (categoryScores.techInfrastructure < 50) {
      programs.push(AICAMP_PROGRAMS.find(p => p.id === 'ai-automation-001')!);
    }
  }

  return programs;
}

// 투자 대비 효과 계산
export function calculateProgramROI(
  programs: AICampProgram[],
  employeeCount: number
): {
  totalInvestment: number;
  expectedReturn: number;
  roi: number;
  paybackPeriod: string;
} {
  // 프로그램별 비용 계산 (기본 단위)
  const programCosts = {
    'ai-basic-001': 1,
    'ai-automation-001': 2,
    'ai-executive-001': 3,
    'ai-data-001': 2,
    'ai-marketing-001': 1,
    'ai-customer-001': 1,
    'ai-manufacturing-001': 3,
    'ai-finance-001': 3,
    'ai-retail-001': 2,
    'ai-healthcare-001': 3
  };

  let totalInvestment = 0;
  let expectedReturn = 0;

  programs.forEach(program => {
    const cost = programCosts[program.id as keyof typeof programCosts] || 100;
    const participantCount = Math.min(employeeCount, 10); // 프로그램당 최대 10명
    
    totalInvestment += cost * participantCount;
    
    // ROI 계산 (프로그램별 ROI 적용)
    const programROI = parseInt(program.roi.replace('%', '')) / 100;
    expectedReturn += (cost * participantCount) * programROI;
  });

  const roi = Math.round((expectedReturn / totalInvestment) * 100);
  const paybackMonths = Math.round(totalInvestment / (expectedReturn / 12));
  const paybackPeriod = paybackMonths < 12 
    ? `${paybackMonths}개월` 
    : `${Math.round(paybackMonths / 12)}년`;

  return {
    totalInvestment,
    expectedReturn,
    roi,
    paybackPeriod
  };
}

// 성공 사례 매칭
export function getRelevantSuccessCases(
  industry: string,
  companySize: string
): {
  company: string;
  industry: string;
  size: string;
  challenge: string;
  solution: string;
  result: string;
  testimonial: string;
  programs: string[];
}[] {
  const successCases = [
    {
      company: '삼성전자',
      industry: '제조업',
      size: '대기업',
      challenge: '반도체 품질 검사 인력 부족 및 불량률 증가',
      solution: 'AI 비전 검사 시스템 도입 및 예측 정비 구축',
      result: '불량률 65% 감소, 연간 500억원 비용 절감, 생산성 40% 향상',
      testimonial: 'AICAMP의 체계적인 교육으로 AI 전문가를 양성하고 실무에 즉시 적용할 수 있었습니다.',
      programs: ['AI 스마트 팩토리 구축', 'AI 데이터 분석 & 예측 모델링']
    },
    {
      company: '네이버',
      industry: 'IT/소프트웨어',
      size: '대기업',
      challenge: '개발 생산성 정체 및 코드 품질 관리 어려움',
      solution: 'AI 코드 리뷰 시스템 및 자동화 파이프라인 구축',
      result: '버그 60% 감소, 개발 생산성 40% 향상, 배포 시간 80% 단축',
      testimonial: '전 개발팀이 AI 도구를 능숙하게 활용하여 혁신적인 성과를 달성했습니다.',
      programs: ['n8n & Make 업무 자동화 전문가', 'ChatGPT & Claude 업무 활용 마스터']
    },
    {
      company: '쿠팡',
      industry: '유통/리테일',
      size: '대기업',
      challenge: '재고 관리 비효율 및 수요 예측 어려움',
      solution: 'AI 수요 예측 모델 및 자동 발주 시스템 구축',
      result: '재고 회전율 2배 향상, 물류 비용 30% 절감, 품절률 70% 감소',
      testimonial: 'AICAMP 교육을 통해 AI 전문가를 양성하고 실무에 즉시 적용할 수 있었습니다.',
      programs: ['AI 리테일 혁신', 'AI 데이터 분석 & 예측 모델링']
    },
    {
      company: '중소제조 A사',
      industry: '제조업',
      size: '중소기업',
      challenge: '품질 관리 인력 부족 및 불량품 증가',
      solution: 'AI 품질 검사 자동화 및 데이터 분석 체계 구축',
      result: '불량률 50% 감소, 품질 관리 인건비 60% 절감',
      testimonial: '적은 인원으로도 AI를 활용해 대기업 수준의 품질 관리가 가능해졌습니다.',
      programs: ['ChatGPT & Claude 업무 활용 마스터', 'AI 데이터 분석 & 예측 모델링']
    },
    {
      company: '스타트업 B사',
      industry: 'IT/소프트웨어',
      size: '스타트업',
      challenge: '개발 인력 부족 및 빠른 제품 출시 압박',
      solution: 'AI 코딩 도구 활용 및 자동화 파이프라인 구축',
      result: '개발 속도 3배 향상, MVP 출시 기간 50% 단축',
      testimonial: 'AICAMP 교육으로 소수 정예 팀이 AI를 활용해 빠른 성장을 이뤄냈습니다.',
      programs: ['ChatGPT & Claude 업무 활용 마스터', 'n8n & Make 업무 자동화 전문가']
    }
  ];

  // 업종과 기업 규모에 맞는 사례 필터링
  return successCases.filter(
    case_ => case_.industry === industry || case_.size === companySize
  ).slice(0, 3);
}

// 맞춤형 학습 경로 생성
export function generateLearningPath(
  programs: AICampProgram[],
  urgency: 'high' | 'medium' | 'low'
): {
  phase: number;
  duration: string;
  programs: AICampProgram[];
  objectives: string[];
  deliverables: string[];
}[] {
  const learningPath = [];
  const programGroups = {
    basic: programs.filter(p => p.category === 'basic'),
    advanced: programs.filter(p => p.category === 'advanced'),
    executive: programs.filter(p => p.category === 'executive'),
    specialized: programs.filter(p => p.category === 'specialized')
  };

  // Phase 1: 기초 구축
  if (programGroups.basic.length > 0 || programGroups.executive.length > 0) {
    learningPath.push({
      phase: 1,
      duration: urgency === 'high' ? '1개월' : '2개월',
      programs: [...programGroups.basic, ...programGroups.executive],
      objectives: [
        'AI 기본 개념 이해',
        '경영진 AI 전략 수립',
        '전사 AI 도입 공감대 형성',
        'Quick Win 프로젝트 선정'
      ],
      deliverables: [
        'AI 전략 로드맵',
        '파일럿 프로젝트 계획서',
        '전직원 AI 기초 역량 확보'
      ]
    });
  }

  // Phase 2: 실무 적용
  if (programGroups.advanced.length > 0) {
    learningPath.push({
      phase: 2,
      duration: urgency === 'high' ? '2개월' : '3개월',
      programs: programGroups.advanced,
      objectives: [
        '업무 자동화 구현',
        '데이터 분석 체계 구축',
        'AI 도구 실무 적용',
        '성과 측정 체계 수립'
      ],
      deliverables: [
        '자동화 워크플로우',
        'AI 대시보드',
        '성과 측정 리포트'
      ]
    });
  }

  // Phase 3: 전문화
  if (programGroups.specialized.length > 0) {
    learningPath.push({
      phase: 3,
      duration: urgency === 'high' ? '2개월' : '4개월',
      programs: programGroups.specialized,
      objectives: [
        '업종 특화 AI 솔루션 구축',
        'AI 전문가 양성',
        '지속 가능한 AI 생태계 구축',
        'AI 혁신 문화 정착'
      ],
      deliverables: [
        '업종 특화 AI 시스템',
        'AI 전문가 인증',
        'AI 운영 체계'
      ]
    });
  }

  return learningPath;
}
