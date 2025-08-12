import { DiagnosisSection } from '../types';

// 연도 옵션 생성 함수
const generateYearOptions = (startYear: number, endYear: number): string[] => {
  const years: string[] = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push(year.toString());
  }
  return years;
};

// AI 역량진단 설문지 구조
export const diagnosisSections: DiagnosisSection[] = [
  {
    id: 'company-info',
    title: '기업 기본정보 및 사업현황',
    description: '귀사의 기본 정보와 사업 현황을 알려주세요',
    icon: '🏢',
    questionGroups: [
      {
        id: 'company_basic',
        title: '기업 기본정보',
        questions: [
          {
            id: 'companyName',
            type: 'text',
            question: '회사명을 입력해주세요',
            required: true,
            validation: 'minLength:2'
          },
          {
            id: 'businessRegistration',
            type: 'text',
            question: '사업자등록번호 (선택사항)',
            placeholder: '000-00-00000',
            required: false
          },
          {
            id: 'establishmentYear',
            type: 'select',
            question: '설립연도를 선택해주세요',
            options: generateYearOptions(1980, 2024),
            required: true
          }
        ]
      },
      {
        id: 'business_details',
        title: '사업 상세정보',
        questions: [
          {
            id: 'industryMain',
            type: 'select',
            question: '주력 업종을 선택해주세요',
            options: [
              'IT/소프트웨어', '제조업(전자/기계)', '제조업(화학/소재)', 
              '금융/보험', '유통/도소매', '서비스업(B2B)', '서비스업(B2C)',
              '의료/헬스케어', '교육/연구', '건설/부동산', '물류/운송',
              '미디어/콘텐츠', '농업/식품', '에너지/환경', '기타'
            ],
            required: true
          },
          {
            id: 'businessModel',
            type: 'multiselect',
            question: '주요 비즈니스 모델을 선택해주세요 (복수선택 가능)',
            options: [
              'B2B 제품/서비스 판매', 'B2C 제품/서비스 판매', 'SaaS/구독 서비스',
              '플랫폼/마켓플레이스', '제조/생산', 'OEM/ODM', '유통/중개',
              '컨설팅/전문서비스', '프랜차이즈', '기타'
            ],
            required: true
          },
          {
            id: 'mainProductsServices',
            type: 'textarea',
            question: '주요 제품/서비스를 구체적으로 설명해주세요',
            placeholder: '예: 중소기업 대상 ERP 솔루션 개발 및 공급, 맞춤형 컨설팅 서비스 제공',
            required: true,
            minLength: 20
          },
          {
            id: 'targetCustomers',
            type: 'textarea',
            question: '주요 고객층을 설명해주세요',
            placeholder: '예: 직원 50-200명 규모의 제조업체, 연매출 100억-500억 중견기업',
            required: true,
            minLength: 15
          }
        ]
      },
      {
        id: 'company_scale',
        title: '기업 규모',
        questions: [
          {
            id: 'employeeCount',
            type: 'select',
            question: '전체 직원 수는?',
            options: [
              '10명 미만', '10-30명', '31-50명', '51-100명', 
              '101-300명', '301-500명', '501-1000명', '1000명 이상'
            ],
            required: true
          },
          {
            id: 'annualRevenue',
            type: 'select',
            question: '연간 매출 규모는? (선택사항)',
            options: [
              '10억 미만', '10억-50억', '50억-100억', '100억-500억',
              '500억-1000억', '1000억 이상', '비공개'
            ],
            required: false
          }
        ]
      }
    ]
  },
  {
    id: 'current-ai-usage',
    title: '현재 AI/디지털 활용 현황',
    description: '현재 귀사의 AI 및 디지털 기술 활용 현황을 평가해주세요',
    icon: '🤖',
    questionGroups: [
      {
        id: 'ai_awareness_usage',
        title: 'AI 인식 및 활용',
        questions: [
          {
            id: 'aiFamiliarity',
            type: 'scale',
            question: '경영진의 AI/자동화 기술에 대한 이해도는?',
            scale: {
              min: 1,
              max: 5,
              labels: ['전혀 모름', '기초 개념만', '일반적 이해', '상당한 이해', '전문가 수준']
            },
            required: true
          },
          {
            id: 'currentAiTools',
            type: 'multiselect',
            question: '현재 조직에서 사용 중인 AI/자동화 도구는?',
            options: [
              'ChatGPT/Copilot 등 생성형 AI', 'RPA(로봇 프로세스 자동화)',
              'BI/데이터 분석 도구', '챗봇/고객응대 AI', 'ERP/CRM 자동화',
              '마케팅 자동화 도구', '문서관리 자동화', '회계/정산 자동화',
              'n8n/Zapier 등 워크플로우 자동화', '아직 사용하지 않음'
            ],
            required: true
          },
          {
            id: 'aiUsageDepartments',
            type: 'multiselect',
            question: 'AI/자동화를 가장 많이 활용하는 부서는?',
            options: [
              'IT/개발팀', '마케팅팀', '영업팀', '고객지원팀', 
              '인사/총무팀', '재무/회계팀', '기획/전략팀', '생산/품질팀',
              '연구개발팀', '전 부서 공통', '아직 활용 부서 없음'
            ],
            required: true
          }
        ]
      },
      {
        id: 'automation_current_state',
        title: '업무 자동화 현황',
        questions: [
          {
            id: 'automationLevelByFunction',
            type: 'matrix',
            question: '업무 기능별 현재 자동화 수준을 평가해주세요',
            functions: [
              '문서 작성/관리', '데이터 입력/처리', '보고서 생성',
              '고객 응대/소통', '일정 관리/알림', '승인/결재 프로세스',
              '재고/발주 관리', '회계/정산', '마케팅/홍보'
            ],
            scale: {
              min: 1,
              max: 5,
              labels: ['수작업', '부분 자동화', '반자동화', '대부분 자동화', '완전 자동화']
            },
            required: true
          },
          {
            id: 'dataDigitalization',
            type: 'scale',
            question: '조직의 데이터 디지털화 수준은?',
            scale: {
              min: 1,
              max: 5,
              labels: ['대부분 종이/수기', '일부 디지털화', '반반 수준', '대부분 디지털', '완전 디지털화']
            },
            required: true
          }
        ]
      },
      {
        id: 'digital_infrastructure',
        title: '디지털 인프라',
        questions: [
          {
            id: 'itSystems',
            type: 'multiselect',
            question: '현재 사용 중인 주요 IT 시스템은?',
            options: [
              'ERP 시스템', 'CRM 시스템', '그룹웨어/협업도구',
              '클라우드 스토리지', 'BI/분석 도구', '프로젝트 관리 도구',
              'API 연동 시스템', '데이터베이스 관리', '보안 솔루션',
              '기본적인 오피스 툴만 사용'
            ],
            required: true
          },
          {
            id: 'cloudUsage',
            type: 'select',
            question: '클라우드 서비스 활용 수준은?',
            options: [
              '전혀 사용하지 않음', '기본적인 클라우드 스토리지만',
              '일부 업무용 클라우드 서비스', '대부분 클라우드 기반',
              '완전한 클라우드 네이티브'
            ],
            required: true
          }
        ]
      }
    ]
  },
  {
    id: 'organization-readiness',
    title: '조직 문화 및 변화 준비도',
    description: '조직의 변화 수용도와 혁신 문화를 평가해주세요',
    icon: '👥',
    questionGroups: [
      {
        id: 'leadership_commitment',
        title: '리더십 의지',
        questions: [
          {
            id: 'ceoAiCommitment',
            type: 'scale',
            question: 'CEO/경영진의 AI 도입 의지는?',
            scale: {
              min: 1,
              max: 5,
              labels: ['소극적', '관망', '관심있음', '적극적', '최우선 과제']
            },
            required: true
          },
          {
            id: 'digitalTransformationPriority',
            type: 'scale',
            question: '디지털 전환이 경영 전략에서 차지하는 우선순위는?',
            scale: {
              min: 1,
              max: 5,
              labels: ['낮음', '보통', '높음', '매우 높음', '최우선']
            },
            required: true
          }
        ]
      },
      {
        id: 'team_readiness',
        title: '팀 준비도',
        questions: [
          {
            id: 'employeeTechAcceptance',
            type: 'scale',
            question: '직원들의 새로운 기술 수용도는?',
            scale: {
              min: 1,
              max: 5,
              labels: ['매우 저항적', '저항적', '보통', '수용적', '매우 적극적']
            },
            required: true
          },
          {
            id: 'changeManagementExperience',
            type: 'multiselect',
            question: '최근 3년간 진행한 변화관리 경험은?',
            options: [
              '새로운 IT 시스템 도입', '업무 프로세스 개선',
              '조직 구조 변경', '디지털 도구 도입', 
              '원격근무 전환', '직원 교육/훈련 강화',
              '특별한 변화 없음'
            ],
            required: true
          },
          {
            id: 'innovationCulture',
            type: 'scale',
            question: '조직의 혁신 문화 수준은?',
            scale: {
              min: 1,
              max: 5,
              labels: ['보수적', '안정 지향', '균형적', '혁신 지향', '매우 혁신적']
            },
            required: true
          }
        ]
      }
    ]
  },
  {
    id: 'current-challenges',
    title: '현재 직면 과제 및 Pain Points',
    description: '귀사가 현재 직면한 주요 과제들을 알려주세요',
    icon: '⚠️',
    questionGroups: [
      {
        id: 'operational_challenges',
        title: '운영상 과제',
        questions: [
          {
            id: 'biggestInefficiencies',
            type: 'rank',
            question: '가장 큰 비효율성을 우선순위별로 선택해주세요 (최대 5개)',
            options: [
              '반복적인 수작업 처리', '부서간 정보 공유 부족',
              '의사결정 지연', '고객 응대 지연/품질',
              '데이터 기반 분석 부족', '보고서 작성 시간 과다',
              '일정 관리의 어려움', '품질 관리 어려움',
              '비용 관리/통제 어려움', '인력 부족'
            ],
            maxSelections: 5,
            required: true
          },
          {
            id: 'timeConsumingTasks',
            type: 'textarea',
            question: '가장 많은 시간을 소모하는 반복 업무를 구체적으로 설명해주세요',
            placeholder: '예: 매주 각 부서별 실적 데이터를 수집하여 경영진 보고서 작성, 고객 문의 이메일 분류 및 담당자 배정',
            required: true,
            minLength: 30
          }
        ]
      },
      {
        id: 'competitive_challenges',
        title: '경쟁 환경 과제',
        questions: [
          {
            id: 'marketPressure',
            type: 'multiselect',
            question: '시장에서 느끼는 주요 압박 요인은?',
            options: [
              '경쟁사의 디지털화 진전', '고객의 빠른 응답 요구',
              '비용 절감 압박', '품질 향상 요구', 
              '신속한 의사결정 필요', '데이터 기반 경영 요구',
              '인력난/채용 어려움', '규제/컴플라이언스 강화'
            ],
            required: true
          },
          {
            id: 'competitiveDisadvantages',
            type: 'textarea',
            question: '경쟁사 대비 불리한 점이 있다면 설명해주세요',
            placeholder: '예: 경쟁사들은 이미 AI 챗봇으로 24시간 고객응대를 하는데 우리는 아직 수작업',
            required: false
          }
        ]
      }
    ]
  },
  {
    id: 'ai-goals',
    title: 'AI 도입 목표 및 기대효과',
    description: 'AI 도입을 통해 달성하고자 하는 목표를 설정해주세요',
    icon: '🎯',
    questionGroups: [
      {
        id: 'primary_objectives',
        title: '주요 목표',
        questions: [
          {
            id: 'aiTransformationGoals',
            type: 'rank',
            question: 'AI 도입을 통해 달성하고자 하는 목표를 우선순위별로 선택해주세요 (최대 5개)',
            options: [
              '업무 효율성 향상', '비용 절감', '매출/수익성 증대',
              '고객 만족도 향상', '직원 만족도 향상', '의사결정 품질 개선',
              '경쟁우위 확보', '확장성/성장성 확보', '리스크 관리 강화',
              '혁신 문화 구축'
            ],
            maxSelections: 5,
            required: true
          },
          {
            id: 'specificImprovements',
            type: 'textarea',
            question: 'AI/자동화를 통해 개선하고 싶은 구체적인 업무나 프로세스를 설명해주세요',
            placeholder: '예: 고객 문의 응답 시간을 현재 4시간에서 1시간 이내로 단축, 월말 결산 작업을 3일에서 1일로 단축',
            required: true,
            minLength: 40
          }
        ]
      },
      {
        id: 'success_metrics',
        title: '성공 지표',
        questions: [
          {
            id: 'kpiPriorities',
            type: 'multiselect',
            question: '성공을 측정할 주요 지표는?',
            options: [
              '업무 처리 시간 단축률', '비용 절감액/절감률',
              '매출 증가율', '고객 만족도 점수', '직원 생산성 지수',
              '오류율 감소', '응답 시간 단축', '처리량 증가',
              'ROI(투자대비수익률)', '시장 점유율 증가'
            ],
            required: true
          },
          {
            id: 'targetImprovements',
            type: 'matrix',
            question: '다음 영역별로 기대하는 개선 정도를 선택해주세요',
            areas: [
              '업무 처리 속도', '업무 정확도', '비용 효율성',
              '고객 응답성', '의사결정 속도', '데이터 활용도'
            ],
            scale: {
              min: 1,
              max: 5,
              labels: ['약간 개선', '어느정도 개선', '상당한 개선', '대폭 개선', '혁신적 개선']
            },
            required: true
          }
        ]
      }
    ]
  },
  {
    id: 'investment-capacity',
    title: '투자 계획 및 실행 역량',
    description: 'AI 도입을 위한 투자 계획과 실행 역량을 평가해주세요',
    icon: '💰',
    questionGroups: [
      {
        id: 'budget_planning',
        title: '예산 계획',
        questions: [
          {
            id: 'aiBudgetRange',
            type: 'select',
            question: 'AI/자동화 투자 예산 규모는?',
            options: [
              '1,000만원 미만', '1,000만원-3,000만원', '3,000만원-5,000만원',
              '5,000만원-1억원', '1억원-3억원', '3억원-5억원', '5억원 이상'
            ],
            required: true
          },
          {
            id: 'budgetAllocation',
            type: 'percentage',
            question: '예산 배분 계획은?',
            categories: [
              '시스템/도구 도입비', '컨설팅/설계비', '교육/훈련비',
              '인력 충원/개발비', '운영/유지보수비'
            ],
            totalPercentage: 100,
            required: true
          },
          {
            id: 'roiExpectations',
            type: 'select',
            question: '투자대비 회수 기대 기간은?',
            options: [
              '6개월 이내', '6개월-1년', '1년-2년', '2년-3년', '3년 이상'
            ],
            required: true
          }
        ]
      },
      {
        id: 'implementation_readiness',
        title: '실행 준비도',
        questions: [
          {
            id: 'implementationTimeline',
            type: 'select',
            question: '실행 희망 시기는?',
            options: [
              '즉시 시작(1개월 내)', '단기(3개월 내)', '중기(6개월 내)',
              '장기(1년 내)', '계획 단계'
            ],
            required: true
          },
          {
            id: 'internalResources',
            type: 'multiselect',
            question: '내부 보유 역량은?',
            options: [
              'IT 전담 인력', '프로젝트 관리 역량', '데이터 분석 역량',
              '변화관리 경험', '교육/훈련 체계', '외부 파트너 네트워크',
              '특별한 역량 없음'
            ],
            required: true
          },
          {
            id: 'supportNeeds',
            type: 'multiselect',
            question: '가장 필요한 외부 지원은?',
            options: [
              '전략 수립 컨설팅', '기술 구현 지원', '교육/훈련 프로그램',
              '변화관리 지원', '성과 측정/관리', '지속적 운영 지원'
            ],
            required: true
          }
        ]
      }
    ]
  }
];

// 업종별 특성 매핑
export const industryCharacteristics: Record<string, {
  strengths: string[];
  challenges: string[];
  opportunities: string[];
  recommendations: string[];
}> = {
  'IT/소프트웨어': {
    strengths: ['높은 디지털 역량', '변화 수용도 높음', '기술 이해도 우수'],
    challenges: ['경쟁 심화', '인재 확보 어려움', '빠른 기술 변화'],
    opportunities: ['AI 네이티브 서비스 개발', '글로벌 시장 진출', '플랫폼 비즈니스'],
    recommendations: ['최신 AI 기술 도입', '개발 프로세스 자동화', '데이터 분석 고도화']
  },
  '제조업(전자/기계)': {
    strengths: ['체계적 프로세스', '품질 관리 역량', '규모의 경제'],
    challenges: ['레거시 시스템', '변화 저항', '높은 초기 투자'],
    opportunities: ['스마트팩토리', '예측 정비', '품질 자동화'],
    recommendations: ['생산 공정 자동화', 'IoT 센서 도입', '품질 예측 시스템']
  },
  '금융/보험': {
    strengths: ['풍부한 데이터', '규제 준수 경험', 'IT 투자 여력'],
    challenges: ['규제 제약', '보안 요구사항', '레거시 시스템'],
    opportunities: ['개인화 서비스', '리스크 관리 고도화', '프로세스 자동화'],
    recommendations: ['챗봇 고객상담', 'RPA 도입', '사기 탐지 AI']
  },
  '유통/도소매': {
    strengths: ['고객 접점 다수', '실시간 데이터', '유연한 운영'],
    challenges: ['마진 압박', '재고 관리', '옴니채널 통합'],
    opportunities: ['개인화 마케팅', '수요 예측', '자동 발주'],
    recommendations: ['재고 최적화 AI', '고객 분석 시스템', '가격 최적화']
  },
  '의료/헬스케어': {
    strengths: ['전문성', '데이터 품질', '사회적 가치'],
    challenges: ['규제 엄격', '변화 보수적', '시스템 복잡성'],
    opportunities: ['진단 보조 AI', '환자 케어 자동화', '신약 개발'],
    recommendations: ['의료 영상 AI', '환자 관리 자동화', '임상 데이터 분석']
  }
};

// 규모별 특성
export const sizeCharacteristics: Record<string, {
  advantages: string[];
  challenges: string[];
  priorities: string[];
}> = {
  '10명 미만': {
    advantages: ['빠른 의사결정', '유연한 변화', '낮은 커뮤니케이션 비용'],
    challenges: ['자원 부족', '전문성 부족', '리스크 관리'],
    priorities: ['비용 효율적 솔루션', '즉시 적용 가능', '확장 가능성']
  },
  '10-30명': {
    advantages: ['민첩한 실행', '팀워크 우수', '혁신 시도 용이'],
    challenges: ['체계 부족', '역할 중복', '성장통'],
    priorities: ['프로세스 표준화', '협업 도구', '자동화 우선']
  },
  '31-50명': {
    advantages: ['조직 안정성', '전문 인력 보유', '중견 경험'],
    challenges: ['부서간 사일로', '변화 관리', '커뮤니케이션'],
    priorities: ['부서간 연계', '워크플로우 자동화', '데이터 통합']
  },
  '51-100명': {
    advantages: ['규모의 경제', '전문 부서', '체계적 운영'],
    challenges: ['의사결정 지연', '변화 저항', '복잡성 증가'],
    priorities: ['전사 통합 시스템', '변화 관리', '성과 측정']
  },
  '101-300명': {
    advantages: ['자원 충분', '다양한 역량', '시장 영향력'],
    challenges: ['관료주의', '혁신 둔화', '높은 고정비'],
    priorities: ['디지털 전환', '프로세스 혁신', '데이터 기반 경영']
  }
};
