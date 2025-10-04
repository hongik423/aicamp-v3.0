import { DiagnosisSection } from '../types';

// 45문항 고도화된 AI역량진단 평가시스템
// 6개 영역 × 7-8문항 = 45문항 구조

export const enhancedDiagnosisSections: DiagnosisSection[] = [
  {
    id: 'company-foundation',
    title: '기업 기반정보 및 현황 분석',
    description: '귀사의 기본 정보와 사업 현황을 종합적으로 분석합니다',
    icon: '🏢',
    questionGroups: [
      {
        id: 'company_basic_info',
        title: '기업 기본정보',
        questions: [
          {
            id: 'contactName',
            type: 'text',
            question: '담당자 성명을 입력해주세요',
            required: true,
            validation: 'minLength:2'
          },
          {
            id: 'contactEmail',
            type: 'text',
            question: '담당자 이메일을 입력해주세요',
            required: true,
            validation: 'email'
          },
          {
            id: 'contactPhone',
            type: 'text',
            question: '담당자 연락처를 입력해주세요',
            required: true,
            placeholder: '010-0000-0000'
          },
          {
            id: 'contactPosition',
            type: 'select',
            question: '담당자 직책을 선택해주세요',
            options: [
              'CEO/대표이사', 'CTO/기술이사', 'CDO/디지털이사',
              '임원진', '부장급', '차장급', '과장급', '팀장급', '기타'
            ],
            required: true
          },
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
            options: Array.from({length: 45}, (_, i) => (2024 - i).toString()),
            required: true
          }
        ]
      }
    ]
  },
  {
    id: 'business-analysis',
    title: '사업 현황 및 업종 특성 분석',
    description: '귀사의 사업 모델과 업종별 특성을 분석합니다',
    icon: '📊',
    questionGroups: [
      {
        id: 'business_characteristics',
        title: '사업 특성 분석',
        questions: [
          {
            id: 'industry',
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
            id: 'businessType',
            type: 'multiselect',
            question: '주요 비즈니스 모델 (복수선택 가능)',
            options: [
              'B2B 제품/서비스 판매', 'B2C 제품/서비스 판매', 'SaaS/구독 서비스',
              '플랫폼/마켓플레이스', '제조/생산', 'OEM/ODM', '유통/중개',
              '컨설팅/전문서비스', '프랜차이즈', '기타'
            ],
            required: true
          },
          {
            id: 'location',
            type: 'select',
            question: '본사 소재지를 선택해주세요',
            options: [
              '서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시',
              '대전광역시', '울산광역시', '세종특별자치시', '경기도', '강원도',
              '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도',
              '제주특별자치도', '해외'
            ],
            required: true
          },
          {
            id: 'employeeCount',
            type: 'select',
            question: '전체 직원 수를 선택해주세요',
            options: [
              '10명 미만', '10-30명', '31-50명', '51-100명', 
              '101-300명', '301-500명', '501-1000명', '1000명 이상'
            ],
            required: true
          },
          {
            id: 'annualRevenue',
            type: 'select',
            question: '연간 매출 규모 (선택사항)',
            options: [
              '10억 미만', '10억-50억', '50억-100억', '100억-500억',
              '500억-1000억', '1000억 이상', '비공개'
            ],
            required: false
          },
          {
            id: 'marketPosition',
            type: 'scale',
            question: '업계 내 귀사의 시장 지위는?',
            scale: {
              min: 1,
              max: 5,
              labels: ['후발주자', '추격그룹', '중위권', '상위권', '선도기업']
            },
            required: true
          },
          {
            id: 'competitiveAdvantage',
            type: 'multiselect',
            question: '귀사의 주요 경쟁우위 요소는?',
            options: [
              '기술력/특허', '브랜드 인지도', '가격 경쟁력', '품질 우수성',
              '고객 서비스', '유통망/채널', '인적 자원', '자본력', '기타'
            ],
            required: true
          }
        ]
      }
    ]
  },
  {
    id: 'current-ai-digital-status',
    title: '현재 AI/디지털 활용 현황',
    description: '현재 귀사의 AI 및 디지털 기술 활용 수준을 종합 평가합니다',
    icon: '🤖',
    questionGroups: [
      {
        id: 'ai_current_usage',
        title: 'AI 활용 현황',
        questions: [
          {
            id: 'aiFamiliarity',
            type: 'scale',
            question: '경영진의 AI/자동화 기술 이해도는?',
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
          },
          {
            id: 'aiInvestmentHistory',
            type: 'scale',
            question: '지난 2년간 AI/자동화 투자 수준은?',
            scale: {
              min: 1,
              max: 5,
              labels: ['전혀 없음', '최소한', '보통', '적극적', '대규모 투자']
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
          },
          {
            id: 'currentSystems',
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
            id: 'systemIntegration',
            type: 'scale',
            question: '기존 시스템 간 통합/연동 수준은?',
            scale: {
              min: 1,
              max: 5,
              labels: ['독립적 운영', '부분 연동', '일부 통합', '대부분 통합', '완전 통합']
            },
            required: true
          },
          {
            id: 'dataManagement',
            type: 'scale',
            question: '데이터 관리 및 활용 역량은?',
            scale: {
              min: 1,
              max: 5,
              labels: ['기초 수준', '부분적 관리', '체계적 관리', '고도화된 관리', '데이터 기반 경영']
            },
            required: true
          }
        ]
      }
    ]
  },
  {
    id: 'organizational-readiness',
    title: '조직 변화 준비도 및 역량 평가',
    description: 'AI 도입을 위한 조직의 준비도와 변화 수용 역량을 평가합니다',
    icon: '👥',
    questionGroups: [
      {
        id: 'leadership_readiness',
        title: '리더십 및 조직 준비도',
        questions: [
          {
            id: 'changeReadiness',
            type: 'scale',
            question: '조직의 변화 수용 준비도는?',
            scale: {
              min: 1,
              max: 5,
              labels: ['매우 저항적', '저항적', '보통', '수용적', '매우 적극적']
            },
            required: true
          },
          {
            id: 'leadershipSupport',
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
            id: 'employeeAttitude',
            type: 'scale',
            question: '직원들의 새로운 기술 수용 태도는?',
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
            id: 'budgetAllocation',
            type: 'select',
            question: 'AI/디지털 전환 예산 규모는?',
            options: [
              '1,000만원 미만', '1,000만원-3,000만원', '3,000만원-5,000만원',
              '5,000만원-1억원', '1억원-3억원', '3억원-5억원', '5억원 이상'
            ],
            required: true
          },
          {
            id: 'technicalPersonnel',
            type: 'scale',
            question: 'AI/IT 전문 인력 보유 수준은?',
            scale: {
              min: 1,
              max: 5,
              labels: ['전문인력 없음', '1-2명', '3-5명', '6-10명', '10명 이상']
            },
            required: true
          },
          {
            id: 'externalPartnership',
            type: 'scale',
            question: '외부 전문기관과의 협력 경험은?',
            scale: {
              min: 1,
              max: 5,
              labels: ['전혀 없음', '최소한', '보통', '활발함', '매우 활발함']
            },
            required: true
          },
          {
            id: 'trainingInvestment',
            type: 'scale',
            question: '직원 교육/훈련 투자 수준은?',
            scale: {
              min: 1,
              max: 5,
              labels: ['최소한', '부분적', '보통', '적극적', '대규모 투자']
            },
            required: true
          }
        ]
      }
    ]
  },
  {
    id: 'technical-infrastructure',
    title: '기술 인프라 및 보안 역량',
    description: 'AI 도입을 위한 기술적 기반과 보안 역량을 평가합니다',
    icon: '🔧',
    questionGroups: [
      {
        id: 'tech_infrastructure',
        title: '기술 인프라 현황',
        questions: [
          {
            id: 'dataQuality',
            type: 'scale',
            question: '보유 데이터의 품질 수준은?',
            scale: {
              min: 1,
              max: 5,
              labels: ['매우 낮음', '낮음', '보통', '높음', '매우 높음']
            },
            required: true
          },
          {
            id: 'analyticsCapability',
            type: 'scale',
            question: '데이터 분석 및 활용 역량은?',
            scale: {
              min: 1,
              max: 5,
              labels: ['기초 수준', '부분적', '보통', '고급', '전문가 수준']
            },
            required: true
          },
          {
            id: 'decisionMaking',
            type: 'scale',
            question: '데이터 기반 의사결정 수준은?',
            scale: {
              min: 1,
              max: 5,
              labels: ['경험 위주', '부분적 활용', '균형적', '데이터 중심', '완전 데이터 기반']
            },
            required: true
          },
          {
            id: 'cloudAdoption',
            type: 'select',
            question: '클라우드 서비스 활용 수준은?',
            options: [
              '전혀 사용하지 않음', '기본적인 클라우드 스토리지만',
              '일부 업무용 클라우드 서비스', '대부분 클라우드 기반',
              '완전한 클라우드 네이티브'
            ],
            required: true
          },
          {
            id: 'systemScalability',
            type: 'scale',
            question: '시스템 확장성 및 유연성은?',
            scale: {
              min: 1,
              max: 5,
              labels: ['매우 제한적', '제한적', '보통', '유연함', '매우 유연함']
            },
            required: true
          },
          {
            id: 'integrationCapability',
            type: 'scale',
            question: '외부 시스템 연동 역량은?',
            scale: {
              min: 1,
              max: 5,
              labels: ['매우 어려움', '어려움', '보통', '원활함', '매우 원활함']
            },
            required: true
          },
          {
            id: 'securityMeasures',
            type: 'multiselect',
            question: '현재 적용 중인 보안 조치는?',
            options: [
              '방화벽/네트워크 보안', '데이터 암호화', '접근 권한 관리',
              '백업/복구 시스템', '보안 모니터링', 'VPN/원격 접속 보안',
              '개인정보보호 조치', '기본적인 보안만 적용'
            ],
            required: true
          },
          {
            id: 'complianceRequirements',
            type: 'multiselect',
            question: '준수해야 하는 규제/표준은?',
            options: [
              '개인정보보호법', 'ISO 27001', 'GDPR',
              '산업별 특수 규제', '금융보안원 기준', '의료정보 보호',
              '해당 없음'
            ],
            required: true
          },
          {
            id: 'riskManagement',
            type: 'scale',
            question: 'IT 리스크 관리 체계는?',
            scale: {
              min: 1,
              max: 5,
              labels: ['없음', '기초 수준', '부분적', '체계적', '고도화됨']
            },
            required: true
          }
        ]
      }
    ]
  },
  {
    id: 'ai-goals-strategy',
    title: 'AI 도입 목표 및 전략적 계획',
    description: 'AI 도입을 통해 달성하고자 하는 목표와 전략을 설정합니다',
    icon: '🎯',
    questionGroups: [
      {
        id: 'strategic_planning',
        title: '전략적 목표 및 계획',
        questions: [
          {
            id: 'aiTransformationGoals',
            type: 'rank',
            question: 'AI 도입 주요 목표 우선순위 (최대 5개)',
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
          },
          {
            id: 'expectedROI',
            type: 'select',
            question: '투자대비 회수 기대 기간은?',
            options: [
              '6개월 이내', '6개월-1년', '1년-2년', '2년-3년', '3년 이상'
            ],
            required: true
          },
          {
            id: 'successMetrics',
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
            id: 'timeframe',
            type: 'select',
            question: '실행 희망 시기는?',
            options: [
              '즉시 시작(1개월 내)', '단기(3개월 내)', '중기(6개월 내)',
              '장기(1년 내)', '계획 단계'
            ],
            required: true
          },
          {
            id: 'priorityFunctions',
            type: 'multiselect',
            question: '우선 도입하고 싶은 기능 영역은?',
            options: [
              '고객 서비스 자동화', '마케팅/영업 자동화', '생산/제조 자동화',
              '재무/회계 자동화', '인사/총무 자동화', '품질 관리 자동화',
              '데이터 분석/예측', '문서 관리 자동화'
            ],
            required: true
          },
          {
            id: 'implementationApproach',
            type: 'select',
            question: '선호하는 도입 방식은?',
            options: [
              '단계적 점진 도입', '핵심 영역 집중 도입', '전사 동시 도입',
              '파일럿 테스트 후 확산', '외부 솔루션 도입', '자체 개발'
            ],
            required: true
          },
          {
            id: 'resourceAllocation',
            type: 'percentage',
            question: '자원 배분 계획 (%)',
            categories: [
              '기술/시스템 도입', '인력 교육/훈련', '외부 컨설팅',
              '내부 인력 충원', '운영/유지보수'
            ],
            totalPercentage: 100,
            required: true
          },
          {
            id: 'challengesAnticipated',
            type: 'multiselect',
            question: '예상되는 주요 도전과제는?',
            options: [
              '직원 저항/변화 거부', '기술적 복잡성', '높은 초기 비용',
              '데이터 품질 문제', '보안/개인정보 우려', '기존 시스템 연동',
              '전문 인력 부족', '성과 측정의 어려움'
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

// 업종별 벤치마크 기준점 (45문항 기반)
export const industryBenchmarks: Record<string, {
  averageScores: {
    currentAI: number;
    organizationReadiness: number;
    techInfrastructure: number;
    goalClarity: number;
    executionCapability: number;
    total: number;
  };
  characteristics: {
    strengths: string[];
    challenges: string[];
    opportunities: string[];
    recommendations: string[];
  };
}> = {
  'IT/소프트웨어': {
    averageScores: {
      currentAI: 75,
      organizationReadiness: 78,
      techInfrastructure: 85,
      goalClarity: 72,
      executionCapability: 70,
      total: 76
    },
    characteristics: {
      strengths: ['높은 디지털 역량', '변화 수용도 높음', '기술 이해도 우수', '클라우드 활용 능숙'],
      challenges: ['경쟁 심화', '인재 확보 어려움', '빠른 기술 변화 대응', '차별화 어려움'],
      opportunities: ['AI 네이티브 서비스 개발', '글로벌 시장 진출', '플랫폼 비즈니스', 'API 경제 참여'],
      recommendations: ['최신 AI 기술 도입', '개발 프로세스 자동화', '데이터 분석 고도화', 'MLOps 구축']
    }
  },
  '제조업(전자/기계)': {
    averageScores: {
      currentAI: 45,
      organizationReadiness: 52,
      techInfrastructure: 58,
      goalClarity: 65,
      executionCapability: 62,
      total: 56
    },
    characteristics: {
      strengths: ['체계적 프로세스', '품질 관리 역량', '규모의 경제', '안정적 자본력'],
      challenges: ['레거시 시스템', '변화 저항', '높은 초기 투자', '복잡한 생산 공정'],
      opportunities: ['스마트팩토리', '예측 정비', '품질 자동화', 'IoT 연계'],
      recommendations: ['생산 공정 자동화', 'IoT 센서 도입', '품질 예측 시스템', 'MES 고도화']
    }
  },
  '금융/보험': {
    averageScores: {
      currentAI: 62,
      organizationReadiness: 58,
      techInfrastructure: 75,
      goalClarity: 68,
      executionCapability: 72,
      total: 67
    },
    characteristics: {
      strengths: ['풍부한 데이터', '규제 준수 경험', 'IT 투자 여력', '디지털 전환 의지'],
      challenges: ['규제 제약', '보안 요구사항', '레거시 시스템', '고객 신뢰 유지'],
      opportunities: ['개인화 서비스', '리스크 관리 고도화', '프로세스 자동화', 'RegTech'],
      recommendations: ['챗봇 고객상담', 'RPA 도입', '사기 탐지 AI', '신용평가 고도화']
    }
  },
  '유통/도소매': {
    averageScores: {
      currentAI: 48,
      organizationReadiness: 55,
      techInfrastructure: 62,
      goalClarity: 70,
      executionCapability: 58,
      total: 59
    },
    characteristics: {
      strengths: ['고객 접점 다수', '실시간 데이터', '유연한 운영', '시장 반응 빠름'],
      challenges: ['마진 압박', '재고 관리', '옴니채널 통합', '계절성 변동'],
      opportunities: ['개인화 마케팅', '수요 예측', '자동 발주', '고객 분석'],
      recommendations: ['재고 최적화 AI', '고객 분석 시스템', '가격 최적화', '추천 엔진']
    }
  },
  '의료/헬스케어': {
    averageScores: {
      currentAI: 38,
      organizationReadiness: 42,
      techInfrastructure: 55,
      goalClarity: 72,
      executionCapability: 48,
      total: 51
    },
    characteristics: {
      strengths: ['전문성', '데이터 품질', '사회적 가치', '안정적 수요'],
      challenges: ['규제 엄격', '변화 보수적', '시스템 복잡성', '높은 책임'],
      opportunities: ['진단 보조 AI', '환자 케어 자동화', '신약 개발', '원격 의료'],
      recommendations: ['의료 영상 AI', '환자 관리 자동화', '임상 데이터 분석', 'EMR 고도화']
    }
  }
};

// 규모별 벤치마크 기준점
export const sizeBenchmarks: Record<string, {
  averageScores: {
    currentAI: number;
    organizationReadiness: number;
    techInfrastructure: number;
    goalClarity: number;
    executionCapability: number;
    total: number;
  };
  characteristics: {
    advantages: string[];
    challenges: string[];
    priorities: string[];
  };
}> = {
  '10명 미만': {
    averageScores: {
      currentAI: 35,
      organizationReadiness: 68,
      techInfrastructure: 42,
      goalClarity: 58,
      executionCapability: 38,
      total: 48
    },
    characteristics: {
      advantages: ['빠른 의사결정', '유연한 변화', '낮은 커뮤니케이션 비용', '민첩한 실행'],
      challenges: ['자원 부족', '전문성 부족', '리스크 관리', '확장성 제약'],
      priorities: ['비용 효율적 솔루션', '즉시 적용 가능', '확장 가능성', '외부 지원 활용']
    }
  },
  '10-30명': {
    averageScores: {
      currentAI: 42,
      organizationReadiness: 65,
      techInfrastructure: 48,
      goalClarity: 62,
      executionCapability: 45,
      total: 52
    },
    characteristics: {
      advantages: ['민첩한 실행', '팀워크 우수', '혁신 시도 용이', '개인별 역할 명확'],
      challenges: ['체계 부족', '역할 중복', '성장통', '전문 인력 부족'],
      priorities: ['프로세스 표준화', '협업 도구', '자동화 우선', '교육/훈련']
    }
  },
  '31-50명': {
    averageScores: {
      currentAI: 48,
      organizationReadiness: 62,
      techInfrastructure: 55,
      goalClarity: 65,
      executionCapability: 52,
      total: 56
    },
    characteristics: {
      advantages: ['조직 안정성', '전문 인력 보유', '중견 경험', '시장 이해도'],
      challenges: ['부서간 사일로', '변화 관리', '커뮤니케이션', '자원 배분'],
      priorities: ['부서간 연계', '워크플로우 자동화', '데이터 통합', '성과 측정']
    }
  },
  '51-100명': {
    averageScores: {
      currentAI: 55,
      organizationReadiness: 58,
      techInfrastructure: 62,
      goalClarity: 68,
      executionCapability: 58,
      total: 60
    },
    characteristics: {
      advantages: ['규모의 경제', '전문 부서', '체계적 운영', '투자 여력'],
      challenges: ['의사결정 지연', '변화 저항', '복잡성 증가', '관리 비용'],
      priorities: ['전사 통합 시스템', '변화 관리', '성과 측정', 'ROI 관리']
    }
  },
  '101-300명': {
    averageScores: {
      currentAI: 62,
      organizationReadiness: 55,
      techInfrastructure: 68,
      goalClarity: 72,
      executionCapability: 65,
      total: 64
    },
    characteristics: {
      advantages: ['자원 충분', '다양한 역량', '시장 영향력', '전문성 높음'],
      challenges: ['관료주의', '혁신 둔화', '높은 고정비', '복잡한 조직'],
      priorities: ['디지털 전환', '프로세스 혁신', '데이터 기반 경영', '조직 문화 변화']
    }
  }
};

// 45문항 점수 계산 가중치
export const questionWeights: Record<string, number> = {
  // 기업 기반정보 (7문항) - 가중치 낮음
  'contactName': 0.5,
  'contactEmail': 0.5,
  'contactPhone': 0.5,
  'contactPosition': 1.0,
  'companyName': 0.5,
  'businessRegistration': 0.5,
  'establishmentYear': 1.0,
  
  // 사업 현황 분석 (7문항) - 가중치 중간
  'industry': 2.0,
  'businessType': 1.5,
  'location': 1.0,
  'employeeCount': 2.0,
  'annualRevenue': 1.5,
  'marketPosition': 2.5,
  'competitiveAdvantage': 2.0,
  
  // 현재 AI/디지털 현황 (8문항) - 가중치 높음
  'aiFamiliarity': 3.0,
  'currentAiTools': 3.5,
  'aiUsageDepartments': 2.5,
  'aiInvestmentHistory': 3.0,
  'dataDigitalization': 3.5,
  'currentSystems': 2.5,
  'systemIntegration': 3.0,
  'dataManagement': 3.5,
  
  // 조직 준비도 (8문항) - 가중치 높음
  'changeReadiness': 4.0,
  'leadershipSupport': 4.5,
  'employeeAttitude': 3.5,
  'changeManagementExperience': 3.0,
  'budgetAllocation': 4.0,
  'technicalPersonnel': 3.5,
  'externalPartnership': 2.5,
  'trainingInvestment': 3.0,
  
  // 기술 인프라 (9문항) - 가중치 높음
  'dataQuality': 4.0,
  'analyticsCapability': 4.0,
  'decisionMaking': 3.5,
  'cloudAdoption': 3.0,
  'systemScalability': 3.5,
  'integrationCapability': 3.5,
  'securityMeasures': 3.0,
  'complianceRequirements': 2.5,
  'riskManagement': 3.0,
  
  // AI 목표 및 전략 (10문항) - 가중치 매우 높음
  'aiTransformationGoals': 4.5,
  'specificImprovements': 4.0,
  'expectedROI': 3.5,
  'successMetrics': 4.0,
  'timeframe': 3.0,
  'priorityFunctions': 4.0,
  'implementationApproach': 3.5,
  'resourceAllocation': 4.0,
  'challengesAnticipated': 3.0,
  'supportNeeds': 3.5
};
