'use client';

import { Factory, TrendingUp, Clock, DollarSign, Users, Target, Award, Zap } from 'lucide-react';
import { EnhancedSuccessCaseDetail } from '@/types/enhanced-success-case.types';

export const manufacturingSmartFactoryCase: EnhancedSuccessCaseDetail = {
  // ========== 기본 정보 ==========
  id: 'manufacturing-smart-factory-enhanced',
  category: 'manufacturing',
  industry: '제조/생산',
  subIndustry: '전자/반도체',
  companyName: 'K전자 주식회사',
  companySize: '중견기업 (직원 320명)',
  title: 'AI & n8n 기반 스마트팩토리 전면 전환',
  subtitle: '생산성 320% 향상, 불량률 94% 감소 달성',
  description: '전통적 전자부품 제조업체가 AI와 n8n을 활용한 전면적 디지털 전환으로 업계 최고 수준의 스마트팩토리를 구축한 혁신 사례',
  icon: Factory,
  color: 'blue',
  heroImage: 'https://picsum.photos/1200/600?random=mfg1',
  gallery: [
    'https://picsum.photos/800/600?random=mfg2',
    'https://picsum.photos/800/600?random=mfg3',
    'https://picsum.photos/800/600?random=mfg4'
  ],

  // ========== 회사 정보 ==========
  companyInfo: {
    industry: '제조/생산',
    subIndustry: '전자/반도체',
    employees: '320명',
    revenue: '연매출 580억원',
    location: '경기도 화성시',
    established: '1998년',
    website: 'www.k-electronics.co.kr',
    certifications: ['ISO 9001', 'ISO 14001', 'IATF 16949', 'Smart Factory Level 3']
  },

  // ========== 교육 프로세스 & 성과 ==========
  educationProcess: [
    {
      phase: '1단계',
      title: '현황 진단 및 비전 수립',
      duration: '2주',
      activities: [
        '전 직원 AI 인식도 조사',
        '부서별 프로세스 매핑',
        '자동화 기회 영역 발굴',
        '스마트팩토리 로드맵 수립'
      ],
      deliverables: [
        'AS-IS 프로세스 맵',
        'TO-BE 프로세스 설계',
        '자동화 우선순위 매트릭스',
        '3개년 디지털 전환 로드맵'
      ],
      keyMetrics: [
        '87개 프로세스 분석',
        '42개 자동화 기회 발굴',
        '예상 ROI 2,800% 산출'
      ]
    },
    {
      phase: '2단계',
      title: 'AI 기초 역량 구축',
      duration: '4주',
      activities: [
        '전사 AI 기초 교육',
        'n8n 워크플로우 기초 실습',
        '부서별 파일럿 프로젝트',
        'AI 챔피언 양성'
      ],
      deliverables: [
        '부서별 AI 활용 가이드',
        '15개 파일럿 워크플로우',
        '30명 AI 챔피언 인증',
        '교육 만족도 96% 달성'
      ],
      keyMetrics: [
        '전직원 320명 교육 완료',
        '평균 학습 완료율 94%',
        '실습 과제 수행률 89%'
      ]
    },
    {
      phase: '3단계',
      title: '스마트팩토리 구축',
      duration: '8주',
      activities: [
        'AI 품질검사 시스템 구축',
        '생산계획 최적화 AI 도입',
        'n8n 기반 전사 통합 워크플로우',
        '실시간 모니터링 대시보드 개발'
      ],
      deliverables: [
        'Computer Vision 품질검사 시스템',
        'AI 생산계획 최적화 엔진',
        '45개 n8n 자동화 워크플로우',
        '통합 관제 대시보드'
      ],
      keyMetrics: [
        '불량 검출률 99.8% 달성',
        '생산 계획 정확도 95%',
        '실시간 데이터 수집률 100%'
      ]
    },
    {
      phase: '4단계',
      title: '고도화 및 확산',
      duration: '4주',
      activities: [
        '예측 유지보수 AI 구축',
        '에너지 최적화 시스템',
        '협력사 연계 자동화',
        '지속 개선 체계 구축'
      ],
      deliverables: [
        '예측 유지보수 모델',
        '에너지 관리 시스템',
        '협력사 포털 자동화',
        '개선 제안 시스템'
      ],
      keyMetrics: [
        '설비 가동률 98% 달성',
        '에너지 비용 32% 절감',
        '협력사 만족도 92%'
      ]
    }
  ],

  educationPerformance: [
    {
      metric: '생산성',
      before: '시간당 250개',
      after: '시간당 800개',
      improvement: '320% 향상',
      icon: TrendingUp
    },
    {
      metric: '불량률',
      before: '3.2%',
      after: '0.19%',
      improvement: '94% 감소',
      icon: Target
    },
    {
      metric: '납기 준수율',
      before: '78%',
      after: '99.5%',
      improvement: '27.6%p 개선',
      icon: Clock
    },
    {
      metric: '인건비',
      before: '월 8.2억원',
      after: '월 5.1억원',
      improvement: '38% 절감',
      icon: DollarSign
    }
  ],

  industryCustomization: {
    industry: '전자/반도체 제조',
    specificChallenges: [
      '미세 불량 검출의 어려움',
      '복잡한 생산 스케줄링',
      '높은 품질 기준 요구',
      '빈번한 제품 사양 변경'
    ],
    customSolutions: [
      'Deep Learning 기반 AOI 시스템 구축',
      'AI 스케줄링 최적화 알고리즘 개발',
      'Real-time SPC 품질 관리 시스템',
      'Flexible Manufacturing System 구현'
    ],
    expectedOutcomes: [
      '불량률 0.2% 이하 달성',
      '생산 효율 95% 이상 유지',
      '고객 클레임 90% 감소',
      '신제품 양산 리드타임 50% 단축'
    ]
  },

  // ========== 커리큘럼 ==========
  curriculum: {
    overview: {
      totalDuration: '18주',
      participantCount: '320명',
      completionRate: '94%',
      satisfactionScore: '4.8/5.0',
      keyHighlights: [
        '맞춤형 실습 중심 교육',
        '현장 문제 해결 프로젝트',
        '1:1 멘토링 지원',
        '성과 연계 인센티브'
      ]
    },
    basic: [
      {
        moduleId: 'B1',
        title: 'AI 기초와 제조업 적용',
        duration: '16시간',
        objectives: [
          'AI/ML 기본 개념 이해',
          '제조업 AI 활용 사례 학습',
          'n8n 워크플로우 기초'
        ],
        topics: [
          'AI/ML 개요와 역사',
          '제조업 디지털 전환 트렌드',
          'n8n 플랫폼 소개',
          '데이터 수집과 전처리'
        ],
        practicalExercises: [
          '센서 데이터 수집 실습',
          '간단한 n8n 워크플로우 작성',
          'Excel 데이터 자동화'
        ],
        tools: ['n8n', 'Python', 'Excel', 'Google Sheets'],
        outcomes: [
          'AI 기본 개념 습득',
          '10개 이상 워크플로우 작성',
          '부서별 자동화 아이디어 도출'
        ]
      },
      {
        moduleId: 'B2',
        title: '스마트팩토리 핵심 기술',
        duration: '20시간',
        objectives: [
          'IoT 센서 데이터 활용',
          'MES/ERP 연동 이해',
          '품질 관리 자동화'
        ],
        topics: [
          'IoT 센서와 데이터 수집',
          'MES/ERP 시스템 이해',
          'SPC와 품질 관리',
          '예측 유지보수 개념'
        ],
        practicalExercises: [
          'IoT 센서 데이터 시각화',
          'MES 데이터 자동 추출',
          'SPC 차트 자동 생성'
        ],
        tools: ['Node-RED', 'Grafana', 'InfluxDB', 'n8n'],
        outcomes: [
          'IoT 데이터 처리 능력',
          'MES/ERP 연동 워크플로우',
          '품질 대시보드 구축'
        ]
      }
    ],
    advanced: [
      {
        moduleId: 'A1',
        title: 'Computer Vision 품질검사',
        duration: '32시간',
        objectives: [
          'Deep Learning 모델 이해',
          'Vision 검사 시스템 구축',
          '불량 분류 자동화'
        ],
        topics: [
          'CNN 아키텍처 이해',
          'Object Detection 알고리즘',
          '이미지 전처리 기법',
          'Model Training & Deployment'
        ],
        practicalExercises: [
          'PCB 불량 검출 모델 학습',
          'Real-time 검사 시스템 구축',
          '불량 유형 자동 분류'
        ],
        tools: ['TensorFlow', 'OpenCV', 'YOLO', 'n8n'],
        outcomes: [
          '99.8% 불량 검출률 달성',
          '검사 속도 10배 향상',
          '24시간 무인 검사 체계'
        ]
      },
      {
        moduleId: 'A2',
        title: 'AI 생산계획 최적화',
        duration: '28시간',
        objectives: [
          '최적화 알고리즘 이해',
          '수요 예측 모델 구축',
          '스케줄링 자동화'
        ],
        topics: [
          '선형계획법과 최적화',
          '시계열 예측 모델',
          '제약 조건 프로그래밍',
          'Genetic Algorithm'
        ],
        practicalExercises: [
          '수요 예측 모델 개발',
          '생산 스케줄 최적화',
          '자재 소요량 계획(MRP)'
        ],
        tools: ['Python', 'OR-Tools', 'Prophet', 'n8n'],
        outcomes: [
          '계획 정확도 95% 달성',
          '재고 회전율 2배 개선',
          '납기 준수율 99.5%'
        ]
      }
    ],
    executive: [
      {
        moduleId: 'E1',
        title: '디지털 전환 리더십',
        duration: '8시간',
        objectives: [
          '디지털 전환 전략 수립',
          'ROI 기반 의사결정',
          '변화 관리 리더십'
        ],
        topics: [
          '글로벌 스마트팩토리 트렌드',
          'ROI 분석과 투자 결정',
          '조직 문화 혁신',
          '리스크 관리'
        ],
        practicalExercises: [
          '디지털 전환 로드맵 수립',
          'ROI 시뮬레이션',
          '변화 관리 계획'
        ],
        tools: ['Strategy Canvas', 'ROI Calculator', 'Risk Matrix'],
        outcomes: [
          '3개년 전략 수립',
          '투자 의사결정 프레임워크',
          '전사 추진 체계 구축'
        ]
      }
    ],
    industrySpecific: [
      {
        moduleId: 'IS1',
        title: '전자부품 제조 특화 과정',
        duration: '24시간',
        objectives: [
          'SMT 라인 자동화',
          'PCB 검사 고도화',
          'Clean Room 관리'
        ],
        topics: [
          'SMT 공정 최적화',
          'AOI/AXI 검사 기술',
          'Clean Room 모니터링',
          'Traceability 시스템'
        ],
        practicalExercises: [
          'SMT 라인 밸런싱',
          'PCB 불량 분석',
          'Clean Room 자동 제어'
        ],
        tools: ['Siemens Opcenter', 'Omron AOI', 'n8n'],
        outcomes: [
          'SMT 효율 30% 개선',
          'PCB 불량률 0.1% 달성',
          'Clean Room Class 100 유지'
        ]
      }
    ],
    customization: {
      industry: '전자/반도체',
      specificChallenges: [
        '미세 불량 검출',
        '다품종 소량 생산',
        '높은 품질 기준'
      ],
      customSolutions: [
        'AI Vision 검사 시스템',
        'Flexible Manufacturing',
        'Real-time SPC'
      ],
      expectedOutcomes: [
        '불량률 0.2% 이하',
        '셋업 시간 50% 단축',
        'Cpk 1.67 이상'
      ]
    }
  },

  // ========== 맞춤 추천 ==========
  customizedProposal: {
    curriculumRecommendation: [
      {
        recommendationType: '필수 과정',
        title: 'AI 기초와 n8n 워크플로우',
        description: '전 직원 대상 AI 리터러시 향상 및 기초 자동화 역량 구축',
        benefits: [
          '전사적 AI 이해도 향상',
          '부서별 자동화 아이디어 도출',
          '변화 저항 최소화'
        ],
        prerequisites: ['기본 PC 활용 능력'],
        estimatedDuration: '4주',
        expectedROI: '투자 대비 500% 수익'
      },
      {
        recommendationType: '핵심 과정',
        title: 'Computer Vision 품질검사 시스템',
        description: '딥러닝 기반 자동 품질검사 시스템 구축 및 운영',
        benefits: [
          '검사 정확도 99.8% 달성',
          '검사 속도 10배 향상',
          '24시간 무인 검사'
        ],
        prerequisites: ['Python 기초', 'AI 기초 과정 수료'],
        estimatedDuration: '8주',
        expectedROI: '연간 12억원 비용 절감'
      }
    ],
    educationModels: [
      {
        modelName: '현장 실습 중심 모델',
        targetAudience: '생산 현장 직원',
        objectives: [
          '실무 적용 가능한 스킬 습득',
          '즉시 활용 가능한 솔루션 개발',
          '현장 문제 해결 능력 향상'
        ],
        methodology: 'Learning by Doing',
        deliveryFormat: '오프라인 실습 70% + 온라인 이론 30%',
        assessment: '프로젝트 결과물 평가'
      },
      {
        modelName: '멘토링 기반 모델',
        targetAudience: 'AI 챔피언 후보자',
        objectives: [
          '심화 기술 역량 구축',
          '부서 내 전파 교육 능력',
          '지속적 개선 리더십'
        ],
        methodology: '1:1 멘토링 + 그룹 코칭',
        deliveryFormat: '주 1회 멘토링 + 월 1회 워크샵',
        assessment: '역량 인증 시험 + 프로젝트'
      }
    ],
    customizationProposal: {
      companySpecific: [
        '기존 MES/ERP 시스템과 완벽 호환',
        '현재 생산 라인 구조 반영',
        '기업 문화와 조직 특성 고려'
      ],
      industryAlignment: [
        '전자부품 제조 특화 커리큘럼',
        'SMT/PCB 공정 중심 교육',
        '업계 베스트 프랙티스 반영'
      ],
      culturalFit: [
        '계층별 맞춤 커뮤니케이션',
        '성과 연계 인센티브 설계',
        '점진적 변화 관리 접근'
      ]
    },
    implementationPlan: [
      {
        phaseNumber: 1,
        phaseName: '준비 단계',
        duration: '2주',
        objectives: [
          '프로젝트 킥오프',
          '현황 분석 완료',
          '교육 인프라 구축'
        ],
        activities: [
          '전사 설명회 개최',
          'AS-IS 프로세스 분석',
          '교육장 및 시스템 준비'
        ],
        milestones: [
          '프로젝트 팀 구성',
          '현황 분석 보고서',
          '교육 환경 구축 완료'
        ],
        risks: [
          '직원 참여도 부족',
          '기술 인프라 미비'
        ],
        mitigations: [
          '경영진 스폰서십 확보',
          '사전 인프라 점검'
        ]
      },
      {
        phaseNumber: 2,
        phaseName: '기초 교육',
        duration: '4주',
        objectives: [
          '전직원 AI 리터러시',
          'n8n 기초 역량',
          '파일럿 프로젝트'
        ],
        activities: [
          '집합 교육 진행',
          '실습 과제 수행',
          '부서별 프로젝트'
        ],
        milestones: [
          '교육 이수율 90%',
          '실습 완료율 85%',
          '파일럿 15개 완료'
        ],
        risks: [
          '학습 격차 발생',
          '업무 병행 어려움'
        ],
        mitigations: [
          '수준별 분반 운영',
          '업무 시간 조정'
        ]
      },
      {
        phaseNumber: 3,
        phaseName: '시스템 구축',
        duration: '8주',
        objectives: [
          'AI 시스템 구축',
          'n8n 워크플로우',
          '통합 테스트'
        ],
        activities: [
          'AI 모델 개발',
          '워크플로우 구현',
          '시스템 통합'
        ],
        milestones: [
          'AI 모델 정확도 95%',
          '45개 워크플로우',
          '통합 테스트 완료'
        ],
        risks: [
          '기술적 난제',
          '시스템 호환성'
        ],
        mitigations: [
          '전문가 지원',
          '단계적 통합'
        ]
      },
      {
        phaseNumber: 4,
        phaseName: '안정화',
        duration: '4주',
        objectives: [
          '시스템 안정화',
          '성과 측정',
          '지속 개선'
        ],
        activities: [
          '운영 모니터링',
          'KPI 측정',
          '개선점 도출'
        ],
        milestones: [
          '가동률 95%',
          'ROI 달성',
          '개선 체계 구축'
        ],
        risks: [
          '초기 불안정',
          '저항 발생'
        ],
        mitigations: [
          '집중 지원',
          '성과 공유'
        ]
      }
    ]
  },

  // ========== AICAMP 프로세스 ==========
  aicampProcess: [
    {
      stepNumber: 1,
      stepName: '진단 및 컨설팅',
      description: 'AI 준비도 진단 및 스마트팩토리 로드맵 수립',
      duration: '2주',
      responsible: 'AICAMP 컨설턴트 + 기업 TF팀',
      tools: ['AI Readiness Assessment', 'Process Mining', 'Value Stream Mapping'],
      inputs: ['현재 프로세스 데이터', '조직 구조', '시스템 현황'],
      outputs: ['진단 보고서', '로드맵', '투자 계획'],
      successCriteria: ['전 프로세스 분석 완료', 'ROI 2,000% 이상', '경영진 승인']
    },
    {
      stepNumber: 2,
      stepName: '교육 설계 및 실행',
      description: '맞춤형 교육 커리큘럼 설계 및 전사 교육 실시',
      duration: '4주',
      responsible: 'AICAMP 교육팀 + HR팀',
      tools: ['LMS', 'n8n Academy', 'Hands-on Lab'],
      inputs: ['스킬 갭 분석', '교육 니즈', '가용 시간'],
      outputs: ['교육 이수 증명', '프로젝트 결과물', 'AI 챔피언'],
      successCriteria: ['이수율 90% 이상', '만족도 4.5 이상', '실습 완료']
    },
    {
      stepNumber: 3,
      stepName: 'POC 및 파일럿',
      description: '핵심 영역 POC 진행 및 파일럿 프로젝트 실행',
      duration: '4주',
      responsible: 'AICAMP 기술팀 + 현업 부서',
      tools: ['n8n', 'TensorFlow', 'Python', 'IoT Platform'],
      inputs: ['파일럿 요구사항', '테스트 데이터', '성공 기준'],
      outputs: ['POC 결과', '파일럿 시스템', '성과 측정'],
      successCriteria: ['목표 KPI 달성', '기술 검증 완료', '확산 가능성 확인']
    },
    {
      stepNumber: 4,
      stepName: '전사 구축',
      description: '검증된 솔루션의 전사 확산 및 시스템 구축',
      duration: '8주',
      responsible: 'AICAMP 구축팀 + IT팀 + 현업',
      tools: ['n8n Enterprise', 'AI Platform', 'Integration Tools'],
      inputs: ['구축 계획', '인프라', '변경 관리 계획'],
      outputs: ['운영 시스템', '운영 매뉴얼', '모니터링 체계'],
      successCriteria: ['전 공정 적용', '안정성 확보', 'KPI 달성']
    },
    {
      stepNumber: 5,
      stepName: '운영 및 고도화',
      description: '시스템 운영 최적화 및 지속적 개선',
      duration: '지속',
      responsible: '운영팀 + AICAMP 지원팀',
      tools: ['Monitoring Dashboard', 'MLOps', 'n8n Cloud'],
      inputs: ['운영 데이터', '개선 요구사항', '신기술 동향'],
      outputs: ['운영 리포트', '개선 사항', '신규 기능'],
      successCriteria: ['가동률 95% 이상', '지속적 ROI 개선', '자체 역량 확보']
    }
  ],

  // ========== 성과 ==========
  results: {
    quantitative: [
      {
        category: '생산성',
        metric: '시간당 생산량',
        baseline: '250개',
        target: '500개',
        achieved: '800개',
        improvement: '320%',
        verificationMethod: 'MES 시스템 데이터'
      },
      {
        category: '품질',
        metric: '불량률',
        baseline: '3.2%',
        target: '1.0%',
        achieved: '0.19%',
        improvement: '94% 감소',
        verificationMethod: '품질 관리 시스템'
      },
      {
        category: '납기',
        metric: '납기 준수율',
        baseline: '78%',
        target: '95%',
        achieved: '99.5%',
        improvement: '27.6%p',
        verificationMethod: 'ERP 납품 데이터'
      },
      {
        category: '효율',
        metric: '설비 가동률(OEE)',
        baseline: '65%',
        target: '85%',
        achieved: '92%',
        improvement: '41.5%',
        verificationMethod: 'IoT 센서 데이터'
      }
    ],
    financial: [
      {
        category: '비용 절감',
        item: '인건비 절감',
        amount: '연 37억원',
        period: '연간',
        roi: '462%',
        paybackPeriod: '2.6개월'
      },
      {
        category: '비용 절감',
        item: '불량 손실 감소',
        amount: '연 18억원',
        period: '연간',
        roi: '225%',
        paybackPeriod: '5.3개월'
      },
      {
        category: '수익 증대',
        item: '생산량 증가 매출',
        amount: '연 85억원',
        period: '연간',
        roi: '1,062%',
        paybackPeriod: '1.1개월'
      },
      {
        category: '비용 절감',
        item: '에너지 비용 절감',
        amount: '연 4.2억원',
        period: '연간',
        roi: '52%',
        paybackPeriod: '23개월'
      }
    ],
    qualitative: [
      {
        area: '조직 문화',
        description: '데이터 기반 의사결정 문화 정착',
        evidence: [
          '일일 데이터 리뷰 미팅 정착',
          '부서별 개선 제안 월 50건',
          '직원 만족도 85% (20%p 상승)'
        ],
        stakeholderFeedback: '직원들이 더 이상 단순 작업에 시달리지 않고 창의적 업무에 집중할 수 있게 되었습니다.'
      },
      {
        area: '고객 만족',
        description: '품질 및 납기 신뢰성 대폭 향상',
        evidence: [
          '고객 클레임 90% 감소',
          '재구매율 45% 상승',
          'NPS 점수 72 (업계 최고)'
        ],
        stakeholderFeedback: '납기와 품질이 안정되어 K전자를 전략적 파트너로 선정했습니다.'
      },
      {
        area: '혁신 역량',
        description: '지속적 혁신 체계 구축',
        evidence: [
          '월 평균 15개 신규 자동화 구현',
          '특허 출원 연 8건',
          '업계 벤치마킹 대상 선정'
        ],
        stakeholderFeedback: '이제 우리가 업계를 선도하는 혁신 기업이 되었습니다.'
      }
    ],
    certifications: [
      'Smart Factory Level 3 인증',
      'ISO 9001:2015 갱신',
      'IATF 16949 인증'
    ],
    awards: [
      '2024 스마트팩토리 우수기업 대통령상',
      '제조혁신 대상 금상',
      'AI 활용 우수사례 장관상'
    ]
  },

  // ========== 핵심 성과 지표 대시보드 ==========
  performanceDashboard: {
    kpis: [
      {
        kpiName: '종합 생산성',
        category: '생산',
        target: '200%',
        actual: '320%',
        variance: '+120%',
        trend: 'up',
        status: 'exceeded'
      },
      {
        kpiName: '품질 수준',
        category: '품질',
        target: '99%',
        actual: '99.81%',
        variance: '+0.81%',
        trend: 'up',
        status: 'exceeded'
      },
      {
        kpiName: '비용 효율성',
        category: '재무',
        target: '20% 절감',
        actual: '38% 절감',
        variance: '+18%',
        trend: 'up',
        status: 'exceeded'
      },
      {
        kpiName: '고객 만족도',
        category: '고객',
        target: '85점',
        actual: '92점',
        variance: '+7점',
        trend: 'up',
        status: 'exceeded'
      }
    ],
    processTimeline: {
      totalDuration: '18주',
      phases: [
        {
          phase: '진단',
          startWeek: 1,
          endWeek: 2,
          milestones: ['현황 분석', '로드맵 수립']
        },
        {
          phase: '교육',
          startWeek: 3,
          endWeek: 6,
          milestones: ['기초 교육', 'AI 챔피언 양성']
        },
        {
          phase: '구축',
          startWeek: 7,
          endWeek: 14,
          milestones: ['시스템 구축', '통합 테스트']
        },
        {
          phase: '안정화',
          startWeek: 15,
          endWeek: 18,
          milestones: ['운영 최적화', '성과 측정']
        }
      ],
      criticalPath: ['진단', '핵심 시스템 구축', '통합 테스트', '안정화'],
      dependencies: [
        { from: '진단', to: '교육', type: 'blocking' },
        { from: '교육', to: '구축', type: 'blocking' },
        { from: '구축', to: '안정화', type: 'blocking' }
      ]
    },
    financialAnalysis: {
      totalInvestment: '8억원',
      totalSavings: '연 144억원',
      netBenefit: '연 136억원',
      roi: '1,700%',
      irrRate: '245%',
      npv: '385억원 (3년 기준)'
    },
    swotAnalysis: {
      strengths: [
        {
          factor: '강력한 경영진 의지',
          impact: 'high',
          evidence: 'CEO 직접 챔피언, 전사 TF 구성'
        },
        {
          factor: '우수한 기술 인프라',
          impact: 'high',
          evidence: '최신 MES/ERP 시스템 보유'
        },
        {
          factor: '높은 직원 역량',
          impact: 'medium',
          evidence: '평균 근속 8년, 기술 숙련도 높음'
        }
      ],
      weaknesses: [
        {
          factor: '초기 변화 저항',
          impact: 'medium',
          mitigation: '단계적 접근, 성과 공유'
        },
        {
          factor: 'AI 전문 인력 부족',
          impact: 'high',
          mitigation: 'AICAMP 파트너십, 외부 전문가 영입'
        }
      ],
      opportunities: [
        {
          factor: '시장 확대 가능성',
          potential: 'high',
          actionPlan: '스마트팩토리 역량 기반 신규 고객 확보'
        },
        {
          factor: '정부 지원 정책',
          potential: 'medium',
          actionPlan: '스마트팩토리 지원사업 활용'
        }
      ],
      threats: [
        {
          factor: '경쟁사 추격',
          likelihood: 'medium',
          contingency: '지속적 혁신, 기술 격차 유지'
        },
        {
          factor: '기술 변화 속도',
          likelihood: 'high',
          contingency: '지속 학습 체계, 기술 파트너십'
        }
      ]
    }
  },

  // ========== n8n 워크플로우 ==========
  n8nWorkflows: [
    {
      workflowId: 'wf-001',
      workflowName: '생산 계획 자동 수립',
      category: '생산관리',
      description: 'ERP 주문 데이터 기반 AI 최적화 생산 계획 자동 생성',
      complexity: 'complex',
      nodes: [
        {
          nodeType: 'Webhook',
          nodeName: 'ERP 주문 트리거',
          configuration: { method: 'POST', path: '/orders' }
        },
        {
          nodeType: 'Database',
          nodeName: '재고 데이터 조회',
          configuration: { query: 'SELECT * FROM inventory' }
        },
        {
          nodeType: 'Python',
          nodeName: 'AI 최적화 엔진',
          configuration: { script: 'optimization_algorithm.py' }
        },
        {
          nodeType: 'HTTP Request',
          nodeName: 'MES 전송',
          configuration: { url: 'http://mes.local/api/schedule' }
        }
      ],
      triggers: ['신규 주문', '긴급 주문', '일일 배치'],
      integrations: ['SAP ERP', 'MES', 'WMS', 'AI Engine'],
      dataFlow: {
        input: '주문 데이터 (JSON)',
        processing: ['재고 확인', '제약 조건 체크', 'AI 최적화', '검증'],
        output: '생산 스케줄 (JSON)'
      },
      performance: {
        executionTime: '평균 2.3초',
        successRate: '99.2%',
        errorRate: '0.8%',
        monthlyExecutions: 8500
      },
      benefits: [
        '계획 수립 시간 95% 단축',
        '생산 효율 32% 향상',
        '납기 준수율 99.5% 달성'
      ],
      customizations: [
        '긴급 주문 우선순위 로직',
        '설비 가용성 실시간 반영',
        '품질 이력 기반 라인 배정'
      ]
    },
    {
      workflowId: 'wf-002',
      workflowName: 'AI 품질 검사 자동화',
      category: '품질관리',
      description: 'Computer Vision 기반 실시간 불량 검출 및 분류',
      complexity: 'complex',
      nodes: [
        {
          nodeType: 'MQTT',
          nodeName: 'Camera 트리거',
          configuration: { topic: 'camera/inspection' }
        },
        {
          nodeType: 'Function',
          nodeName: '이미지 전처리',
          configuration: { function: 'preprocessImage()' }
        },
        {
          nodeType: 'HTTP Request',
          nodeName: 'AI 모델 호출',
          configuration: { url: 'http://ai.local/detect' }
        },
        {
          nodeType: 'Switch',
          nodeName: '불량 분류',
          configuration: { rules: 'defectClassification' }
        }
      ],
      triggers: ['제품 감지', '수동 검사', '배치 검사'],
      integrations: ['Vision Camera', 'TensorFlow Serving', 'MES', 'Alert System'],
      dataFlow: {
        input: '제품 이미지 (JPEG)',
        processing: ['전처리', 'AI 추론', '결과 분석', '분류'],
        output: '검사 결과 (JSON)'
      },
      performance: {
        executionTime: '평균 0.3초',
        successRate: '99.8%',
        errorRate: '0.2%',
        monthlyExecutions: 125000
      },
      benefits: [
        '검사 정확도 99.8%',
        '검사 속도 10배 향상',
        '24시간 무인 검사'
      ],
      customizations: [
        '제품별 검사 기준',
        '불량 유형별 알림',
        '학습 데이터 자동 수집'
      ]
    }
  ],

  // ========== AI 구현 ==========
  aiImplementations: [
    {
      aiTool: 'TensorFlow',
      useCase: 'PCB 불량 검출',
      model: 'YOLOv8 Custom',
      accuracy: '99.8%',
      performance: '30 FPS',
      integration: 'Edge Computing',
      benefits: [
        '실시간 검사 가능',
        '미세 불량 검출',
        '자동 불량 분류'
      ]
    },
    {
      aiTool: 'Prophet',
      useCase: '수요 예측',
      model: 'Time Series Forecasting',
      accuracy: '92%',
      performance: '일 1회 예측',
      integration: 'Cloud API',
      benefits: [
        '재고 최적화',
        '생산 계획 정확도 향상',
        '자재 비용 절감'
      ]
    }
  ],

  // ========== 부서별 자동화 ==========
  departmentAutomations: [
    {
      department: '생산관리팀',
      processes: ['생산계획', '작업지시', '실적집계', '품질검사'],
      automationLevel: '92%',
      timeSaved: '주 120시간',
      costSaved: '월 4,800만원',
      qualityImprovement: '불량률 94% 감소',
      employeeSatisfaction: '만족도 88%'
    },
    {
      department: '품질관리팀',
      processes: ['입고검사', '공정검사', '출하검사', '데이터분석'],
      automationLevel: '88%',
      timeSaved: '주 80시간',
      costSaved: '월 3,200만원',
      qualityImprovement: '검사 정확도 99.8%',
      employeeSatisfaction: '만족도 92%'
    },
    {
      department: '자재관리팀',
      processes: ['발주관리', '재고관리', '입출고', '실사'],
      automationLevel: '85%',
      timeSaved: '주 60시간',
      costSaved: '월 2,400만원',
      qualityImprovement: '재고 정확도 99.5%',
      employeeSatisfaction: '만족도 85%'
    }
  ],

  // ========== 후기 & 장기 성과 ==========
  testimonials: [
    {
      author: '김철수',
      position: 'CEO',
      company: 'K전자 주식회사',
      date: '2024-10-15',
      rating: 5,
      title: '진정한 디지털 전환을 경험했습니다',
      content: 'AICAMP와 함께한 18주는 우리 회사 26년 역사상 가장 혁신적인 시간이었습니다. 단순히 시스템을 도입한 것이 아니라, 전 직원이 AI를 이해하고 활용할 수 있게 되었습니다. 생산성은 3배 이상 향상되었고, 품질 문제는 거의 사라졌습니다. 무엇보다 직원들이 더 창의적이고 가치 있는 일에 집중할 수 있게 되어 기쁩니다.',
      keyBenefits: [
        '생산성 320% 향상',
        '불량률 94% 감소',
        '직원 만족도 대폭 상승'
      ],
      challenges: [
        '초기 변화 관리',
        '기술 학습 곡선'
      ],
      recommendations: [
        '경영진의 확고한 의지 필수',
        '단계적 접근 전략 수립',
        '직원 교육에 충분한 투자'
      ],
      wouldRecommend: true,
      npsScore: 10
    },
    {
      author: '이영희',
      position: '생산관리팀장',
      company: 'K전자 주식회사',
      date: '2024-10-20',
      rating: 5,
      title: '현장의 완전한 변화',
      content: '20년간 제조 현장에서 일했지만, 이런 변화는 처음입니다. 매일 4시간씩 걸리던 생산 계획 수립이 이제 30분이면 끝납니다. AI가 최적의 계획을 제시하고, n8n이 모든 시스템을 자동으로 연결해줍니다. 처음엔 AI가 일자리를 빼앗을까 걱정했지만, 오히려 더 중요한 일에 집중할 수 있게 되었습니다.',
      keyBenefits: [
        '업무 시간 87% 단축',
        '의사결정 정확도 향상',
        '스트레스 대폭 감소'
      ],
      challenges: [
        '새로운 시스템 적응',
        '기존 방식 전환'
      ],
      recommendations: [
        '현장 직원 의견 적극 반영',
        '충분한 실습 시간 확보',
        '지속적인 피드백 채널'
      ],
      wouldRecommend: true,
      npsScore: 9
    }
  ],

  longTermImpact: {
    sixMonthResults: [
      {
        period: '6개월 후',
        metric: '생산성',
        value: '초기 대비 350% 향상',
        trend: 'improving',
        actions: ['추가 라인 자동화', 'AI 모델 고도화']
      },
      {
        period: '6개월 후',
        metric: '매출',
        value: '전년 대비 45% 증가',
        trend: 'improving',
        actions: ['신규 고객 확보', '프리미엄 제품 출시']
      },
      {
        period: '6개월 후',
        metric: '직원 역량',
        value: 'AI 활용 능력 Level 4',
        trend: 'improving',
        actions: ['심화 교육 진행', '자체 개선 활동']
      }
    ],
    oneYearResults: [
      {
        period: '1년 후',
        metric: '시장 지위',
        value: '업계 2위 → 1위',
        trend: 'improving',
        actions: ['기술 리더십 확보', '브랜드 가치 상승']
      },
      {
        period: '1년 후',
        metric: '수익성',
        value: '영업이익률 22%',
        trend: 'stable',
        actions: ['비용 구조 최적화', '고부가가치 전환']
      }
    ],
    sustainabilityMeasures: [
      '자체 AI 연구소 설립',
      '전문 인력 15명 채용',
      '연간 교육 예산 5억원 편성',
      '협력사 스마트화 지원'
    ],
    continuousImprovement: [
      '월 15개 신규 자동화 구현',
      '분기별 AI 모델 업데이트',
      '직원 제안 월 50건 이상',
      'Kaizen 활동 정착'
    ],
    scalabilityAchievements: [
      '베트남 공장 시스템 복제',
      '협력사 10개사 확산',
      '신규 라인 즉시 적용 체계',
      '플랫폼화 완성'
    ]
  },

  // ========== 메타 정보 ==========
  tags: [
    'AI', 'n8n', '스마트팩토리', 'Computer Vision', '생산최적화',
    '품질관리', 'IoT', '제조혁신', '디지털전환', 'Level3'
  ],
  relatedCases: [
    'automotive-smart-factory',
    'semiconductor-yield-optimization',
    'chemical-process-automation'
  ],
  resources: [
    {
      type: 'video',
      title: '스마트팩토리 구축 과정',
      url: 'https://youtube.com/watch?v=abc123',
      description: 'K전자 스마트팩토리 18주 여정'
    },
    {
      type: 'pdf',
      title: '상세 구축 사례집',
      url: '/downloads/k-electronics-case-study.pdf',
      description: '120페이지 상세 구축 과정 및 성과'
    },
    {
      type: 'webinar',
      title: 'CEO 특별 강연',
      url: '/webinar/ceo-special-talk',
      description: '디지털 전환 성공 비결'
    }
  ],
  featured: true,
  publishDate: '2024-10-25',
  lastUpdated: '2024-11-15',
  viewCount: 15234,
  downloadCount: 3421
};
