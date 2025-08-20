import { IndustrySpecificCurriculum, CurriculumModule } from '../types';

/**
 * 기업체 커리큘럼 게시판용 - 업종별 맞춤형 AI 교육과정
 * 기초&심화, 경영진 과정을 통합한 체계적인 커리큘럼 데이터베이스
 */

// 기초 과정 공통 모듈
const commonBasicModules: CurriculumModule[] = [
  {
    id: 'ai-fundamentals',
    title: 'AI 기초 이해 및 비즈니스 적용',
    duration: '8시간',
    description: 'AI/ML 기본 개념과 업무 활용법, ChatGPT 기초 실습',
    objectives: [
      'AI 기술의 기본 개념 이해',
      '업무에 AI 적용하는 방법 습득',
      'ChatGPT 기본 활용법 숙달',
      'AI 도구 선택 기준 이해'
    ],
    topics: [
      'AI/ML 기본 개념과 발전 동향',
      '생성형 AI의 이해 (ChatGPT, Claude)',
      '업종별 AI 적용 사례 분석',
      'AI 윤리와 보안 고려사항'
    ],
    practicalExercises: [
      'ChatGPT를 활용한 업무 문서 작성',
      '프롬프트 엔지니어링 실습',
      'AI 도구 비교 분석 워크숍',
      '개인 업무 AI 적용 계획 수립'
    ],
    expectedOutcomes: [
      'AI 기술에 대한 기초 지식 습득',
      '업무 효율성 20% 이상 향상',
      'AI 도구 활용 자신감 확보',
      '지속적 학습 마인드셋 형성'
    ],
    difficulty: 'beginner',
    category: 'basic'
  },
  {
    id: 'prompt-engineering',
    title: '프롬프트 엔지니어링 실무',
    duration: '16시간',
    description: '효과적인 프롬프트 작성법과 API 활용, 업무 자동화 시나리오 구축',
    objectives: [
      '고품질 프롬프트 작성 기법 습득',
      'ChatGPT API 활용법 이해',
      '업무별 프롬프트 템플릿 구축',
      '자동화 시나리오 설계 능력 개발'
    ],
    topics: [
      '프롬프트 엔지니어링 원리와 기법',
      'Few-shot, Chain-of-thought 프롬프팅',
      'ChatGPT API 사용법과 파라미터 조정',
      '업무별 프롬프트 패턴 분석'
    ],
    practicalExercises: [
      '업무별 프롬프트 템플릿 제작',
      'API 연동 실습',
      '자동화 워크플로우 설계',
      '프롬프트 최적화 실험'
    ],
    expectedOutcomes: [
      'AI 활용 업무 효율성 50% 향상',
      '고품질 결과물 생성 능력 확보',
      '반복 업무 자동화 구현',
      '창의적 문제해결 역량 강화'
    ],
    difficulty: 'intermediate',
    category: 'basic'
  },
  {
    id: 'n8n-automation-basics',
    title: 'n8n 노코드 워크플로우 자동화',
    duration: '12시간',
    description: '노코드 도구를 활용한 업무 프로세스 자동화 구축',
    objectives: [
      'n8n 워크플로우 설계 원리 이해',
      '노코드 자동화 시스템 구축',
      'API 연동을 통한 데이터 처리',
      '실무 프로세스 자동화 적용'
    ],
    topics: [
      'n8n 기본 구조와 노드 시스템',
      '워크플로우 설계 원칙',
      'API 연동과 데이터 변환',
      '조건분기와 오류처리'
    ],
    practicalExercises: [
      '이메일 자동 분류 시스템 구축',
      '데이터 수집 및 정리 자동화',
      '알림 및 보고서 자동 생성',
      '업무별 맞춤 워크플로우 제작'
    ],
    expectedOutcomes: [
      '반복 업무 80% 이상 자동화',
      '업무 처리 시간 60% 단축',
      '업무 정확도 및 일관성 향상',
      '혁신적 업무 방식 도입'
    ],
    difficulty: 'intermediate',
    category: 'basic'
  }
];

// 심화 과정 공통 모듈
const commonAdvancedModules: CurriculumModule[] = [
  {
    id: 'python-data-analysis',
    title: 'Python 데이터 분석 실무',
    duration: '24시간',
    description: 'Python을 활용한 비즈니스 데이터 분석, 시각화, 예측 모델링',
    objectives: [
      'Python 기반 데이터 분석 역량 습득',
      '비즈니스 데이터 시각화 구현',
      '예측 모델링 기초 이해',
      '실무 데이터 분석 프로젝트 수행'
    ],
    topics: [
      'Python 기초 문법과 라이브러리',
      'Pandas를 활용한 데이터 처리',
      'Matplotlib/Seaborn 시각화',
      'Scikit-learn 머신러닝 기초'
    ],
    practicalExercises: [
      '매출 데이터 분석 및 트렌드 예측',
      '고객 세분화 분석',
      '재고 최적화 모델 구축',
      '대시보드 제작 프로젝트'
    ],
    expectedOutcomes: [
      '데이터 기반 의사결정 역량 확보',
      '비즈니스 인사이트 도출 능력',
      '예측 분석을 통한 리스크 관리',
      '데이터 문화 확산 기여'
    ],
    difficulty: 'advanced',
    category: 'advanced'
  },
  {
    id: 'computer-vision-practical',
    title: 'Computer Vision 실무 적용',
    duration: '20시간',
    description: 'OpenCV, YOLO를 활용한 이미지 분석 및 객체 감지 시스템 구축',
    objectives: [
      'Computer Vision 기술 이해',
      '이미지 처리 및 분석 기법 습득',
      '객체 감지 모델 구축 및 최적화',
      '실무 적용 가능한 시스템 개발'
    ],
    topics: [
      'Computer Vision 기초 이론',
      'OpenCV를 활용한 이미지 처리',
      'YOLO 객체 감지 모델 이해',
      '커스텀 데이터셋 구축 및 학습'
    ],
    practicalExercises: [
      '품질 검사 자동화 시스템 구축',
      '재고 관리 비전 시스템',
      '보안 모니터링 시스템',
      '업종별 맞춤 비전 솔루션'
    ],
    expectedOutcomes: [
      '자동화된 품질 관리 시스템 도입',
      '업무 정확도 95% 이상 달성',
      '인력 의존도 70% 감소',
      '혁신적 업무 프로세스 구축'
    ],
    difficulty: 'advanced',
    category: 'advanced'
  },
  {
    id: 'ml-predictive-modeling',
    title: 'ML 예측 모델 구축 실무',
    duration: '16시간',
    description: '머신러닝을 활용한 수요예측, 이상감지, 최적화 모델 개발',
    objectives: [
      '머신러닝 알고리즘 이해 및 적용',
      '예측 모델 구축 및 평가',
      '비즈니스 문제 해결 모델 설계',
      '모델 성능 최적화 기법 습득'
    ],
    topics: [
      '머신러닝 알고리즘 개요',
      '시계열 분석과 수요예측',
      '이상감지 알고리즘',
      '모델 평가 및 최적화'
    ],
    practicalExercises: [
      '매출 예측 모델 구축',
      '고객 이탈 예측 시스템',
      '재고 최적화 모델',
      '품질 예측 시스템'
    ],
    expectedOutcomes: [
      '데이터 기반 예측 정확도 90% 이상',
      '비즈니스 리스크 사전 감지',
      '자원 배분 최적화',
      '경쟁 우위 확보'
    ],
    difficulty: 'advanced',
    category: 'advanced'
  }
];

// 경영진 과정 공통 모듈
const commonExecutiveModules: CurriculumModule[] = [
  {
    id: 'ai-strategy-development',
    title: 'AI 전략 수립 및 로드맵',
    duration: '4시간',
    description: '기업 AI 도입 전략 수립, 투자 계획, KPI 설정',
    objectives: [
      'AI 도입 전략 프레임워크 이해',
      '투자 우선순위 결정 기준 습득',
      'AI 성과 측정 지표 설계',
      '단계적 도입 로드맵 수립'
    ],
    topics: [
      'AI 트렌드와 비즈니스 기회',
      'AI 성숙도 평가 모델',
      '투자 우선순위 결정 프레임워크',
      'AI 거버넌스 체계 구축'
    ],
    practicalExercises: [
      '자사 AI 성숙도 진단',
      'AI 도입 우선순위 워크숍',
      'ROI 예측 모델링',
      '3년 AI 로드맵 수립'
    ],
    expectedOutcomes: [
      '명확한 AI 비전과 전략 수립',
      '투자 효율성 극대화',
      '조직 역량 개발 방향 설정',
      '경쟁 우위 확보 전략'
    ],
    difficulty: 'executive',
    category: 'executive'
  },
  {
    id: 'roi-analysis-workshop',
    title: 'AI 투자 ROI 분석 워크숍',
    duration: '4시간',
    description: 'AI 투자 효과 분석, 비용-편익 분석, 성과 측정 체계',
    objectives: [
      'AI 투자 ROI 계산 방법론 습득',
      '비용-편익 분석 기법 이해',
      '성과 측정 KPI 설계',
      '투자 의사결정 프레임워크 구축'
    ],
    topics: [
      'AI 투자 ROI 계산 모델',
      '정량적/정성적 효과 측정',
      '리스크 평가 및 관리',
      '성과 모니터링 체계'
    ],
    practicalExercises: [
      '자사 AI 프로젝트 ROI 계산',
      '투자 시나리오 분석',
      'KPI 대시보드 설계',
      '성과 보고서 작성'
    ],
    expectedOutcomes: [
      '투자 의사결정 정확도 향상',
      '성과 측정 체계 확립',
      '투자 리스크 최소화',
      '지속적 개선 문화 구축'
    ],
    difficulty: 'executive',
    category: 'executive'
  },
  {
    id: 'change-management-leadership',
    title: '변화관리 리더십',
    duration: '4시간',
    description: 'AI 도입을 위한 조직문화 혁신, 저항 관리, 동기부여 전략',
    objectives: [
      '변화관리 리더십 역량 강화',
      '조직 저항 요인 분석 및 대응',
      '구성원 동기부여 전략 수립',
      '혁신 문화 조성 방법론 습득'
    ],
    topics: [
      '변화관리 이론과 실제',
      '조직 저항 요인 분석',
      '커뮤니케이션 전략',
      '혁신 문화 구축 방법'
    ],
    practicalExercises: [
      '조직 진단 및 저항 요인 분석',
      '변화관리 계획 수립',
      '커뮤니케이션 시나리오 작성',
      '동기부여 프로그램 설계'
    ],
    expectedOutcomes: [
      '변화 수용도 90% 이상 달성',
      '조직 몰입도 향상',
      '혁신 마인드셋 확산',
      '지속적 성장 동력 확보'
    ],
    difficulty: 'executive',
    category: 'executive'
  }
];

// 업종별 특화 커리큘럼 데이터베이스
export const INDUSTRY_SPECIFIC_CURRICULUM: Record<string, IndustrySpecificCurriculum> = {
  manufacturing: {
    industryType: '제조업',
    industryCode: 'MFG',
    basic: [
      ...commonBasicModules,
      {
        id: 'manufacturing-ai-basics',
        title: '제조업 특화 AI 기초',
        duration: '8시간',
        description: '스마트팩토리, 생산 최적화, 품질관리 AI 적용',
        objectives: [
          '스마트팩토리 개념과 구성요소 이해',
          '생산 공정 AI 적용 방안 습득',
          'IoT와 AI 연동 시스템 이해',
          '제조업 디지털 전환 전략 수립'
        ],
        topics: [
          '스마트팩토리 기술 동향',
          '생산 공정 최적화 AI',
          'IoT 센서 데이터 활용',
          '예측 정비 시스템'
        ],
        practicalExercises: [
          '생산 데이터 분석 실습',
          '품질 예측 모델 구축',
          '설비 모니터링 대시보드',
          '생산 계획 최적화'
        ],
        expectedOutcomes: [
          '생산 효율성 30% 향상',
          '품질 불량률 50% 감소',
          '설비 가동률 95% 달성',
          '예측 정비 체계 구축'
        ],
        difficulty: 'intermediate',
        category: 'basic'
      }
    ],
    advanced: [
      ...commonAdvancedModules,
      {
        id: 'smart-factory-systems',
        title: '스마트팩토리 시스템 구축',
        duration: '32시간',
        description: 'MES, ERP 연동 스마트팩토리 통합 시스템 구축',
        objectives: [
          '통합 생산관리 시스템 구축',
          'MES/ERP 연동 아키텍처 설계',
          '실시간 생산 모니터링 구현',
          '생산 최적화 알고리즘 개발'
        ],
        topics: [
          'MES/ERP 시스템 통합',
          '실시간 데이터 수집 체계',
          '생산 스케줄링 최적화',
          '품질 관리 자동화'
        ],
        practicalExercises: [
          '통합 생산관리 시스템 설계',
          '실시간 모니터링 구축',
          '생산 최적화 모델 개발',
          '품질 관리 자동화 시스템'
        ],
        expectedOutcomes: [
          '생산성 200% 이상 향상',
          '재고 최적화 90% 달성',
          '품질 관리 완전 자동화',
          '스마트팩토리 완성'
        ],
        difficulty: 'advanced',
        category: 'advanced'
      }
    ],
    executive: [
      ...commonExecutiveModules,
      {
        id: 'manufacturing-digital-transformation',
        title: '제조업 디지털 전환 전략',
        duration: '6시간',
        description: '제조업 특화 디지털 전환 전략과 Industry 4.0 로드맵',
        objectives: [
          'Industry 4.0 전략 수립',
          '제조업 디지털 전환 로드맵',
          '스마트팩토리 투자 계획',
          '제조 혁신 리더십 강화'
        ],
        topics: [
          'Industry 4.0 글로벌 트렌드',
          '제조업 디지털 전환 사례',
          '스마트팩토리 투자 전략',
          '제조 혁신 조직 구축'
        ],
        practicalExercises: [
          '자사 디지털 성숙도 진단',
          '스마트팩토리 로드맵 수립',
          'Industry 4.0 투자 계획',
          '제조 혁신 전략 수립'
        ],
        expectedOutcomes: [
          '명확한 디지털 전환 비전',
          '단계별 실행 로드맵',
          '투자 우선순위 결정',
          '제조 혁신 리더십 확보'
        ],
        difficulty: 'executive',
        category: 'executive'
      }
    ]
  },

  service: {
    industryType: '서비스업',
    industryCode: 'SVC',
    basic: [
      ...commonBasicModules,
      {
        id: 'service-ai-customer-experience',
        title: '서비스업 고객경험 AI',
        duration: '10시간',
        description: 'AI 챗봇, 개인화 추천, 고객 분석을 통한 서비스 혁신',
        objectives: [
          'AI 기반 고객 서비스 혁신',
          '개인화 추천 시스템 구축',
          '고객 데이터 분석 및 활용',
          '서비스 자동화 전략 수립'
        ],
        topics: [
          'AI 챗봇 구축 및 운영',
          '고객 여정 분석',
          '개인화 추천 알고리즘',
          '고객 만족도 예측'
        ],
        practicalExercises: [
          'AI 챗봇 시나리오 설계',
          '고객 세분화 분석',
          '개인화 서비스 구축',
          '고객 만족도 측정 시스템'
        ],
        expectedOutcomes: [
          '고객 만족도 40% 향상',
          '서비스 응답 시간 80% 단축',
          '개인화 서비스 제공',
          '고객 충성도 증대'
        ],
        difficulty: 'intermediate',
        category: 'basic'
      }
    ],
    advanced: [
      ...commonAdvancedModules,
      {
        id: 'advanced-customer-analytics',
        title: '고급 고객 분석 시스템',
        duration: '28시간',
        description: '고객 행동 예측, 이탈 방지, LTV 최적화 시스템 구축',
        objectives: [
          '고객 행동 예측 모델 구축',
          '고객 이탈 방지 시스템',
          'LTV 최적화 전략 수립',
          '실시간 고객 분석 구현'
        ],
        topics: [
          '고객 행동 패턴 분석',
          '이탈 예측 모델링',
          'LTV 계산 및 최적화',
          '실시간 추천 시스템'
        ],
        practicalExercises: [
          '고객 행동 예측 모델',
          '이탈 방지 캠페인 시스템',
          'LTV 최적화 모델',
          '실시간 개인화 엔진'
        ],
        expectedOutcomes: [
          '고객 이탈률 60% 감소',
          'LTV 150% 향상',
          '마케팅 ROI 300% 개선',
          '고객 만족도 극대화'
        ],
        difficulty: 'advanced',
        category: 'advanced'
      }
    ],
    executive: [
      ...commonExecutiveModules,
      {
        id: 'service-innovation-strategy',
        title: '서비스 혁신 전략',
        duration: '6시간',
        description: '디지털 서비스 혁신과 고객 중심 비즈니스 모델 설계',
        objectives: [
          '서비스 혁신 전략 수립',
          '디지털 고객 여정 설계',
          '서비스 차별화 전략',
          '고객 중심 조직 구축'
        ],
        topics: [
          '서비스 혁신 프레임워크',
          '디지털 고객 경험 설계',
          '서비스 차별화 전략',
          '고객 중심 문화 구축'
        ],
        practicalExercises: [
          '서비스 혁신 전략 수립',
          '고객 여정 맵핑',
          '차별화 전략 설계',
          '고객 중심 조직 설계'
        ],
        expectedOutcomes: [
          '서비스 혁신 전략 확립',
          '고객 중심 조직 전환',
          '서비스 차별화 달성',
          '지속적 성장 동력 확보'
        ],
        difficulty: 'executive',
        category: 'executive'
      }
    ]
  },

  // 추가 업종들...
  startup: {
    industryType: '스타트업',
    industryCode: 'STU',
    basic: [
      ...commonBasicModules,
      {
        id: 'startup-ai-mvp',
        title: '스타트업 AI MVP 개발',
        duration: '12시간',
        description: 'AI 기반 MVP 개발과 린 스타트업 방법론 적용',
        objectives: [
          'AI 기반 MVP 개발 전략',
          '린 스타트업 방법론 적용',
          '빠른 프로토타이핑 기법',
          '시장 검증 방법론'
        ],
        topics: [
          'AI MVP 설계 원칙',
          '노코드/로우코드 개발',
          '사용자 피드백 수집',
          '데이터 기반 의사결정'
        ],
        practicalExercises: [
          'AI 기반 MVP 설계',
          '프로토타입 개발',
          '사용자 테스트 진행',
          '피벗 전략 수립'
        ],
        expectedOutcomes: [
          'MVP 개발 시간 70% 단축',
          '시장 검증 정확도 향상',
          '개발 비용 60% 절감',
          '투자 유치 확률 증대'
        ],
        difficulty: 'intermediate',
        category: 'basic'
      }
    ],
    advanced: [
      ...commonAdvancedModules,
      {
        id: 'startup-scaling-ai',
        title: '스타트업 AI 스케일링',
        duration: '24시간',
        description: 'AI 기반 스케일링 전략과 자동화 시스템 구축',
        objectives: [
          'AI 기반 스케일링 전략 수립',
          '자동화 시스템 구축',
          '데이터 기반 성장 모델',
          '운영 효율성 극대화'
        ],
        topics: [
          'AI 스케일링 아키텍처',
          '자동화 운영 시스템',
          '성장 지표 모니터링',
          '리소스 최적화'
        ],
        practicalExercises: [
          'AI 스케일링 시스템 설계',
          '자동화 파이프라인 구축',
          '성장 대시보드 개발',
          '운영 최적화 모델'
        ],
        expectedOutcomes: [
          '운영 효율성 300% 향상',
          '스케일링 비용 50% 절감',
          '성장 속도 200% 가속화',
          '지속 가능한 성장 모델'
        ],
        difficulty: 'advanced',
        category: 'advanced'
      }
    ],
    executive: [
      ...commonExecutiveModules,
      {
        id: 'startup-ai-strategy',
        title: '스타트업 AI 전략',
        duration: '4시간',
        description: 'AI 기반 비즈니스 모델과 투자 전략',
        objectives: [
          'AI 비즈니스 모델 설계',
          '투자 전략 및 밸류에이션',
          '경쟁 우위 확보 전략',
          '지속 가능한 성장 모델'
        ],
        topics: [
          'AI 비즈니스 모델 패턴',
          '스타트업 투자 전략',
          'AI 기술 경쟁력',
          '글로벌 진출 전략'
        ],
        practicalExercises: [
          'AI 비즈니스 모델 캔버스',
          '투자 전략 수립',
          '경쟁 분석 및 차별화',
          '글로벌 전략 설계'
        ],
        expectedOutcomes: [
          '명확한 AI 비즈니스 모델',
          '투자 유치 성공률 향상',
          '경쟁 우위 확보',
          '글로벌 진출 기반 구축'
        ],
        difficulty: 'executive',
        category: 'executive'
      }
    ]
  }
};

/**
 * 커리큘럼 추천 엔진
 */
export function getCurriculumRecommendation(
  industryType: string,
  _companySize: string,
  _currentLevel: string,
  _specificNeeds: string[]
): IndustrySpecificCurriculum | null {
  const baseCurriculum = INDUSTRY_SPECIFIC_CURRICULUM[industryType];
  if (!baseCurriculum) return null;

  // 기업 규모와 수준에 따른 커리큘럼 커스터마이징
  const customizedCurriculum = { ...baseCurriculum };

  // 추가 커스터마이징 로직...
  
  return customizedCurriculum;
}
