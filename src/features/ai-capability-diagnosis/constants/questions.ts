'use client';

// AI 역량진단 설문 문항 정의
export const AI_CAPABILITY_QUESTIONS = {
  // 1. 경영진 리더십 및 AI 이해도
  leadership: {
    title: '경영진 리더십 및 AI 이해도',
    description: 'AI 전환에 대한 경영진의 비전과 리더십을 평가합니다',
    questions: [
      {
        id: 'L1',
        question: '경영진이 AI 기술의 중요성을 인식하고 적극적으로 도입을 추진하고 있습니까?',
        weight: 1.2
      },
      {
        id: 'L2',
        question: 'AI 도입을 위한 명확한 비전과 로드맵이 수립되어 있습니까?',
        weight: 1.0
      },
      {
        id: 'L3',
        question: '경영진이 AI 관련 의사결정에 직접 참여하고 있습니까?',
        weight: 1.1
      },
      {
        id: 'L4',
        question: 'AI 투자에 대한 경영진의 의지가 예산 배정에 반영되어 있습니까?',
        weight: 1.0
      }
    ]
  },

  // 2. AI 인프라 및 시스템
  infrastructure: {
    title: 'AI 인프라 및 시스템',
    description: '조직의 AI 기술 인프라와 시스템 준비도를 평가합니다',
    questions: [
      {
        id: 'I1',
        question: 'AI 도구와 플랫폼이 업무에 통합되어 있습니까?',
        weight: 1.0
      },
      {
        id: 'I2',
        question: '데이터 수집 및 관리 시스템이 체계적으로 구축되어 있습니까?',
        weight: 1.1
      },
      {
        id: 'I3',
        question: 'AI 보안 및 윤리 가이드라인이 마련되어 있습니까?',
        weight: 0.9
      },
      {
        id: 'I4',
        question: '클라우드 기반 AI 서비스를 활용하고 있습니까?',
        weight: 0.8
      }
    ]
  },

  // 3. 직원 AI 역량
  employeeCapability: {
    title: '직원 AI 역량',
    description: '직원들의 AI 활용 능력과 교육 수준을 평가합니다',
    questions: [
      {
        id: 'E1',
        question: '직원들이 AI 도구(ChatGPT, Copilot 등)를 업무에 활용하고 있습니까?',
        weight: 1.0
      },
      {
        id: 'E2',
        question: 'AI 교육 프로그램이 정기적으로 제공되고 있습니까?',
        weight: 1.1
      },
      {
        id: 'E3',
        question: '직원들의 AI 활용 수준이 지속적으로 향상되고 있습니까?',
        weight: 0.9
      },
      {
        id: 'E4',
        question: 'AI 전문 인력이나 담당자가 지정되어 있습니까?',
        weight: 1.0
      }
    ]
  },

  // 4. AI 활용 조직문화
  culture: {
    title: 'AI 활용 조직문화',
    description: 'AI 도입과 혁신을 지원하는 조직문화를 평가합니다',
    questions: [
      {
        id: 'C1',
        question: 'AI 실험과 혁신을 장려하는 문화가 형성되어 있습니까?',
        weight: 1.0
      },
      {
        id: 'C2',
        question: 'AI 도입에 대한 직원들의 저항이 적고 수용도가 높습니까?',
        weight: 1.1
      },
      {
        id: 'C3',
        question: '부서 간 AI 활용 사례와 노하우를 공유하고 있습니까?',
        weight: 0.9
      },
      {
        id: 'C4',
        question: 'AI 활용 성과를 측정하고 개선하는 체계가 있습니까?',
        weight: 0.8
      }
    ]
  },

  // 5. 실무 AI 적용
  practicalApplication: {
    title: '실무 AI 적용',
    description: '실제 업무에서의 AI 활용 수준을 평가합니다',
    questions: [
      {
        id: 'P1',
        question: '업무 자동화를 위해 AI를 활용하고 있습니까?',
        weight: 1.1
      },
      {
        id: 'P2',
        question: '고객 서비스 개선에 AI를 활용하고 있습니까?',
        weight: 1.0
      },
      {
        id: 'P3',
        question: '의사결정 지원을 위해 AI 분석을 활용하고 있습니까?',
        weight: 1.2
      },
      {
        id: 'P4',
        question: '제품/서비스 혁신에 AI를 적용하고 있습니까?',
        weight: 1.0
      }
    ]
  },

  // 6. 데이터 활용 역량
  dataCapability: {
    title: '데이터 활용 역량',
    description: '데이터 수집, 분석, 활용 역량을 평가합니다',
    questions: [
      {
        id: 'D1',
        question: '체계적인 데이터 수집 및 관리 프로세스가 있습니까?',
        weight: 1.1
      },
      {
        id: 'D2',
        question: '데이터 기반 의사결정이 일상화되어 있습니까?',
        weight: 1.2
      },
      {
        id: 'D3',
        question: '데이터 품질 관리 체계가 구축되어 있습니까?',
        weight: 0.9
      },
      {
        id: 'D4',
        question: '실시간 데이터 분석이 가능한 시스템이 있습니까?',
        weight: 0.8
      }
    ]
  }
};

// 점수 척도 정의
export const SCORE_SCALE = {
  1: '전혀 그렇지 않다',
  2: '그렇지 않다',
  3: '보통이다',
  4: '그렇다',
  5: '매우 그렇다'
};

// 등급 기준 정의  
export const GRADE_CRITERIA = {
  S: { min: 90, label: 'S등급', description: 'AI 선도 기업' },
  A: { min: 80, label: 'A등급', description: 'AI 활용 기업' },
  B: { min: 70, label: 'B등급', description: 'AI 성장 기업' },
  C: { min: 60, label: 'C등급', description: 'AI 도입 기업' },
  D: { min: 40, label: 'D등급', description: 'AI 준비 기업' },
  F: { min: 0, label: 'F등급', description: 'AI 준비 단계' }
};

// 업종별 벤치마크 점수
export const INDUSTRY_BENCHMARKS = {
  it: { score: 75, label: 'IT/소프트웨어' },
  manufacturing: { score: 65, label: '제조업' },
  finance: { score: 78, label: '금융업' },
  retail: { score: 68, label: '유통/소매업' },
  service: { score: 62, label: '서비스업' },
  healthcare: { score: 70, label: '헬스케어' },
  education: { score: 58, label: '교육' },
  construction: { score: 55, label: '건설업' },
  logistics: { score: 67, label: '물류/운송' },
  media: { score: 72, label: '미디어/엔터테인먼트' },
  other: { score: 60, label: '기타' }
};

// 규모별 벤치마크 조정 계수
export const SIZE_ADJUSTMENTS = {
  '1-9': 0.85,
  '10-49': 0.92,
  '50-199': 1.0,
  '200-999': 1.08,
  '1000+': 1.15
};