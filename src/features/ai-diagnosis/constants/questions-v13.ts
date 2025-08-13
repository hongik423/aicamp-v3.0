/**
 * AICAMP V13.0 ULTIMATE - 45문항 AI역량진단 시스템
 * 6개 영역 × 정밀 가중치 시스템
 */

export interface Question {
  id: number;
  sectionId: number;
  sectionName: string;
  question: string;
  description?: string;
  weight: number;
}

export const DIAGNOSIS_SECTIONS = {
  businessFoundation: {
    id: 1,
    name: '사업기반',
    description: '기업의 기본적인 사업 역량과 경쟁력을 평가합니다.',
    questionRange: [1, 8],
    color: '#3B82F6'
  },
  currentAI: {
    id: 2,
    name: '현재AI활용',
    description: '현재 AI 기술 도입 및 활용 수준을 평가합니다.',
    questionRange: [9, 16],
    color: '#10B981'
  },
  organizationReadiness: {
    id: 3,
    name: '조직준비도',
    description: 'AI 도입을 위한 조직의 준비도와 문화를 평가합니다.',
    questionRange: [17, 24],
    color: '#F59E0B'
  },
  techInfrastructure: {
    id: 4,
    name: '기술인프라',
    description: 'AI 구현을 위한 기술적 인프라와 역량을 평가합니다.',
    questionRange: [25, 32],
    color: '#EF4444'
  },
  goalClarity: {
    id: 5,
    name: '목표명확성',
    description: 'AI 도입 목표와 전략의 명확성을 평가합니다.',
    questionRange: [33, 40],
    color: '#8B5CF6'
  },
  executionCapability: {
    id: 6,
    name: '실행역량',
    description: 'AI 프로젝트 실행 및 관리 역량을 평가합니다.',
    questionRange: [41, 45],
    color: '#06B6D4'
  }
};

export const AICAMP_V13_QUESTIONS: Question[] = [
  // 1. 사업기반 (1-8번)
  {
    id: 1,
    sectionId: 1,
    sectionName: '사업기반',
    question: '우리 회사의 핵심 사업 모델과 수익 구조가 명확하게 정의되어 있습니까?',
    description: '사업의 기본 토대와 수익 창출 방식의 명확성',
    weight: 1.2
  },
  {
    id: 2,
    sectionId: 1,
    sectionName: '사업기반',
    question: '시장에서 우리 회사만의 차별화된 경쟁 우위 요소를 보유하고 있습니까?',
    description: '독특한 가치 제안과 경쟁력',
    weight: 1.3
  },
  {
    id: 3,
    sectionId: 1,
    sectionName: '사업기반',
    question: '고객의 니즈와 시장 트렌드를 정기적으로 분석하고 반영합니까?',
    description: '시장 지향적 사업 운영',
    weight: 1.1
  },
  {
    id: 4,
    sectionId: 1,
    sectionName: '사업기반',
    question: '사업 성과를 측정하는 핵심 지표(KPI)가 체계적으로 관리됩니까?',
    description: '성과 측정 및 관리 체계',
    weight: 1.0
  },
  {
    id: 5,
    sectionId: 1,
    sectionName: '사업기반',
    question: '재무 건전성과 자금 운용이 안정적으로 관리됩니까?',
    description: '재무 안정성과 지속가능성',
    weight: 1.2
  },
  {
    id: 6,
    sectionId: 1,
    sectionName: '사업기반',
    question: '주요 파트너사와의 협력 관계가 전략적으로 구축되어 있습니까?',
    description: '전략적 파트너십과 생태계',
    weight: 1.0
  },
  {
    id: 7,
    sectionId: 1,
    sectionName: '사업기반',
    question: '사업 확장을 위한 중장기 전략과 로드맵이 수립되어 있습니까?',
    description: '성장 전략과 미래 계획',
    weight: 1.3
  },
  {
    id: 8,
    sectionId: 1,
    sectionName: '사업기반',
    question: '위기 상황에 대한 리스크 관리와 대응 체계가 마련되어 있습니까?',
    description: '리스크 관리와 위기 대응',
    weight: 1.1
  },

  // 2. 현재AI활용 (9-16번)
  {
    id: 9,
    sectionId: 2,
    sectionName: '현재AI활용',
    question: '현재 업무 프로세스에서 AI 기술을 활용하고 있는 영역이 있습니까?',
    description: '기존 AI 도입 현황',
    weight: 1.4
  },
  {
    id: 10,
    sectionId: 2,
    sectionName: '현재AI활용',
    question: '고객 서비스나 마케팅에서 AI 도구를 사용한 경험이 있습니까?',
    description: '고객 대면 AI 활용',
    weight: 1.2
  },
  {
    id: 11,
    sectionId: 2,
    sectionName: '현재AI활용',
    question: '데이터 분석이나 의사결정 지원에 AI를 활용하고 있습니까?',
    description: '분석 및 의사결정 AI',
    weight: 1.5
  },
  {
    id: 12,
    sectionId: 2,
    sectionName: '현재AI활용',
    question: '업무 자동화나 효율성 개선을 위해 AI를 도입한 사례가 있습니까?',
    description: '업무 자동화 AI',
    weight: 1.3
  },
  {
    id: 13,
    sectionId: 2,
    sectionName: '현재AI활용',
    question: 'AI 기술 도입 후 실제 성과나 효과를 측정하고 있습니까?',
    description: 'AI 성과 측정',
    weight: 1.2
  },
  {
    id: 14,
    sectionId: 2,
    sectionName: '현재AI활용',
    question: '직원들이 AI 도구를 능숙하게 사용할 수 있는 수준입니까?',
    description: '직원 AI 활용 역량',
    weight: 1.1
  },
  {
    id: 15,
    sectionId: 2,
    sectionName: '현재AI활용',
    question: 'AI 기술 관련 최신 트렌드와 동향을 지속적으로 모니터링합니까?',
    description: 'AI 트렌드 모니터링',
    weight: 1.0
  },
  {
    id: 16,
    sectionId: 2,
    sectionName: '현재AI활용',
    question: 'AI 활용 결과를 바탕으로 지속적인 개선과 최적화를 진행합니까?',
    description: 'AI 지속 개선',
    weight: 1.3
  },

  // 3. 조직준비도 (17-24번)
  {
    id: 17,
    sectionId: 3,
    sectionName: '조직준비도',
    question: '경영진이 AI 도입의 필요성과 중요성을 충분히 인식하고 있습니까?',
    description: '경영진 AI 인식',
    weight: 1.5
  },
  {
    id: 18,
    sectionId: 3,
    sectionName: '조직준비도',
    question: '직원들이 AI 기술에 대해 긍정적이고 개방적인 태도를 가지고 있습니까?',
    description: '직원 AI 수용성',
    weight: 1.3
  },
  {
    id: 19,
    sectionId: 3,
    sectionName: '조직준비도',
    question: 'AI 도입을 위한 충분한 예산과 자원이 확보되어 있습니까?',
    description: 'AI 투자 준비도',
    weight: 1.4
  },
  {
    id: 20,
    sectionId: 3,
    sectionName: '조직준비도',
    question: 'AI 프로젝트를 담당할 전담 팀이나 책임자가 지정되어 있습니까?',
    description: 'AI 전담 조직',
    weight: 1.2
  },
  {
    id: 21,
    sectionId: 3,
    sectionName: '조직준비도',
    question: '변화와 혁신을 수용하는 조직 문화가 형성되어 있습니까?',
    description: '혁신 조직 문화',
    weight: 1.3
  },
  {
    id: 22,
    sectionId: 3,
    sectionName: '조직준비도',
    question: 'AI 교육과 역량 개발을 위한 프로그램이나 계획이 있습니까?',
    description: 'AI 교육 계획',
    weight: 1.4
  },
  {
    id: 23,
    sectionId: 3,
    sectionName: '조직준비도',
    question: '부서 간 협업과 소통이 원활하게 이루어지고 있습니까?',
    description: '조직 내 협업',
    weight: 1.1
  },
  {
    id: 24,
    sectionId: 3,
    sectionName: '조직준비도',
    question: 'AI 도입으로 인한 업무 변화에 대한 직원들의 불안감이 관리되고 있습니까?',
    description: '변화 관리',
    weight: 1.2
  },

  // 4. 기술인프라 (25-32번)
  {
    id: 25,
    sectionId: 4,
    sectionName: '기술인프라',
    question: 'AI 구현에 필요한 하드웨어와 컴퓨팅 자원이 충분합니까?',
    description: '하드웨어 인프라',
    weight: 1.3
  },
  {
    id: 26,
    sectionId: 4,
    sectionName: '기술인프라',
    question: '데이터 수집, 저장, 처리를 위한 시스템이 구축되어 있습니까?',
    description: '데이터 인프라',
    weight: 1.5
  },
  {
    id: 27,
    sectionId: 4,
    sectionName: '기술인프라',
    question: '네트워크와 보안 시스템이 AI 도입에 적합하게 구성되어 있습니까?',
    description: '네트워크 및 보안',
    weight: 1.4
  },
  {
    id: 28,
    sectionId: 4,
    sectionName: '기술인프라',
    question: '클라우드 서비스나 AI 플랫폼을 활용할 수 있는 환경이 마련되어 있습니까?',
    description: '클라우드 환경',
    weight: 1.2
  },
  {
    id: 29,
    sectionId: 4,
    sectionName: '기술인프라',
    question: 'AI 개발과 운영을 위한 소프트웨어 도구와 환경이 구축되어 있습니까?',
    description: '개발 환경',
    weight: 1.3
  },
  {
    id: 30,
    sectionId: 4,
    sectionName: '기술인프라',
    question: '기존 시스템과 AI 솔루션 간의 통합이 가능한 구조입니까?',
    description: '시스템 통합성',
    weight: 1.4
  },
  {
    id: 31,
    sectionId: 4,
    sectionName: '기술인프라',
    question: 'IT 인프라의 확장성과 유연성이 AI 요구사항을 충족합니까?',
    description: '인프라 확장성',
    weight: 1.2
  },
  {
    id: 32,
    sectionId: 4,
    sectionName: '기술인프라',
    question: '기술적 문제 발생 시 신속한 대응과 지원이 가능합니까?',
    description: '기술 지원 체계',
    weight: 1.1
  },

  // 5. 목표명확성 (33-40번)
  {
    id: 33,
    sectionId: 5,
    sectionName: '목표명확성',
    question: 'AI 도입을 통해 달성하고자 하는 구체적인 목표가 설정되어 있습니까?',
    description: 'AI 도입 목표',
    weight: 1.5
  },
  {
    id: 34,
    sectionId: 5,
    sectionName: '목표명확성',
    question: 'AI 프로젝트의 성공 기준과 측정 지표가 명확하게 정의되어 있습니까?',
    description: '성공 지표 정의',
    weight: 1.4
  },
  {
    id: 35,
    sectionId: 5,
    sectionName: '목표명확성',
    question: 'AI 도입이 전체 사업 전략과 일치하고 연계되어 있습니까?',
    description: '전략적 일치성',
    weight: 1.5
  },
  {
    id: 36,
    sectionId: 5,
    sectionName: '목표명확성',
    question: 'AI 활용 우선순위와 단계별 실행 계획이 수립되어 있습니까?',
    description: '실행 계획',
    weight: 1.3
  },
  {
    id: 37,
    sectionId: 5,
    sectionName: '목표명확성',
    question: 'AI 투자 대비 기대 효과와 ROI가 구체적으로 산출되어 있습니까?',
    description: 'ROI 계획',
    weight: 1.4
  },
  {
    id: 38,
    sectionId: 5,
    sectionName: '목표명확성',
    question: 'AI 도입 후 예상되는 위험 요소와 대응 방안이 검토되어 있습니까?',
    description: '리스크 분석',
    weight: 1.2
  },
  {
    id: 39,
    sectionId: 5,
    sectionName: '목표명확성',
    question: '장기적인 AI 발전 방향과 비전이 조직 내에 공유되어 있습니까?',
    description: 'AI 비전 공유',
    weight: 1.3
  },
  {
    id: 40,
    sectionId: 5,
    sectionName: '목표명확성',
    question: 'AI 프로젝트의 진행 상황을 모니터링하고 평가하는 체계가 있습니까?',
    description: '모니터링 체계',
    weight: 1.2
  },

  // 6. 실행역량 (41-45번)
  {
    id: 41,
    sectionId: 6,
    sectionName: '실행역량',
    question: 'AI 프로젝트를 체계적으로 관리하고 실행할 수 있는 역량이 있습니까?',
    description: '프로젝트 관리 역량',
    weight: 1.5
  },
  {
    id: 42,
    sectionId: 6,
    sectionName: '실행역량',
    question: 'AI 기술 구현과 운영에 필요한 전문 인력이 확보되어 있습니까?',
    description: '전문 인력',
    weight: 1.4
  },
  {
    id: 43,
    sectionId: 6,
    sectionName: '실행역량',
    question: '외부 전문가나 파트너와의 협력을 통해 AI 역량을 보완할 수 있습니까?',
    description: '외부 협력',
    weight: 1.2
  },
  {
    id: 44,
    sectionId: 6,
    sectionName: '실행역량',
    question: 'AI 프로젝트 실행 과정에서 발생하는 문제를 신속하게 해결할 수 있습니까?',
    description: '문제 해결 능력',
    weight: 1.3
  },
  {
    id: 45,
    sectionId: 6,
    sectionName: '실행역량',
    question: 'AI 도입 성과를 지속적으로 개선하고 발전시킬 수 있는 체계가 있습니까?',
    description: '지속 개선',
    weight: 1.4
  }
];

// 응답 옵션
export const RESPONSE_OPTIONS = [
  { value: 1, label: '전혀 그렇지 않다', description: '해당 사항이 전혀 없거나 매우 부족함' },
  { value: 2, label: '그렇지 않다', description: '해당 사항이 부족하거나 미흡함' },
  { value: 3, label: '보통이다', description: '해당 사항이 평균적이거나 일부만 해당됨' },
  { value: 4, label: '그렇다', description: '해당 사항이 잘 되고 있거나 우수함' },
  { value: 5, label: '매우 그렇다', description: '해당 사항이 매우 우수하거나 완벽함' }
];

// 점수 계산 가중치
export const SECTION_WEIGHTS = {
  businessFoundation: 1.0,    // 사업기반
  currentAI: 1.2,             // 현재AI활용
  organizationReadiness: 1.1,  // 조직준비도
  techInfrastructure: 1.3,    // 기술인프라
  goalClarity: 1.2,           // 목표명확성
  executionCapability: 1.4    // 실행역량
};
