'use client';

import { SuccessCaseDetail } from '@/types/success-case.types';
import { Brain } from 'lucide-react';

export const aiMachineLearningCase: SuccessCaseDetail = {
  id: 'ai-machine-learning-001',
  category: 'it-tech',
  industry: 'IT/기술',
  subIndustry: 'AI/머신러닝',
  companyName: 'AI이노베이션랩',
  companySize: 'medium',
  title: 'MLOps 자동화로 AI 모델 배포 시간 95% 단축, 정확도 15% 향상',
  subtitle: 'n8n 기반 ML 파이프라인과 AutoML로 구현한 차세대 AI 개발 플랫폼',
  description: 'Kubeflow, MLflow와 n8n을 통합한 완전 자동화 MLOps 파이프라인으로 AI 모델 개발부터 배포까지의 전 과정을 혁신한 머신러닝 전문 기업의 성공 사례',
  icon: Brain,
  color: 'purple',
  heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070',
  
  companyInfo: {
    industry: 'AI/머신러닝 솔루션 개발',
    employees: '180명',
    revenue: '350억원',
    location: '서울특별시 서초구'
  },

  challenges: [
    {
      title: 'AI 모델 개발 및 배포의 복잡성',
      description: 'ML 엔지니어들이 모델 개발부터 프로덕션 배포까지 평균 3개월 소요, 수작업 의존도 높음',
      impact: 'AI 프로젝트 완료율 60%, 고객 요구사항 변경 대응 어려움'
    },
    {
      title: '모델 성능 모니터링과 재학습 부재',
      description: '배포된 모델의 성능 저하 감지 지연, 데이터 드리프트 대응 불가',
      impact: '모델 정확도 지속적 하락, 고객 만족도 70% 수준'
    },
    {
      title: '데이터 파이프라인 관리의 비효율성',
      description: '분산된 데이터 소스와 불일치한 전처리 과정으로 인한 품질 이슈',
      impact: '데이터 준비 작업에 전체 프로젝트 시간의 70% 소모'
    },
    {
      title: '실험 관리와 버전 컨트롤 부족',
      description: 'ML 실험 결과 추적 어려움, 모델 버전 관리 체계 부재',
      impact: '성공한 실험 재현 불가능, 모델 롤백 시 평균 2일 소요'
    }
  ],

  curriculum: {
    basic: [
      {
        title: 'MLOps 기초와 파이프라인 설계',
        duration: '2주',
        description: 'ML 라이프사이클과 MLOps 도구체인 이해'
      },
      {
        title: 'n8n ML 워크플로우 구축',
        duration: '2주',
        description: 'n8n을 활용한 데이터 수집부터 모델 배포까지 자동화'
      },
      {
        title: 'Docker/Kubernetes ML 배포',
        duration: '1주',
        description: '컨테이너 기반 ML 모델 배포와 스케일링'
      },
      {
        title: 'MLflow 실험 관리',
        duration: '1주',
        description: 'ML 실험 추적, 모델 레지스트리, 버전 관리'
      }
    ],
    advanced: [
      {
        title: 'AutoML 파이프라인 구축',
        duration: '4주',
        description: '자동화된 특성 엔지니어링, 모델 선택, 하이퍼파라미터 튜닝'
      },
      {
        title: 'Kubeflow 기반 ML 오케스트레이션',
        duration: '3주',
        description: '대규모 ML 워크플로우 관리와 분산 학습'
      },
      {
        title: '모델 모니터링 및 드리프트 감지',
        duration: '3주',
        description: '프로덕션 모델 성능 추적과 자동 재학습 시스템'
      },
      {
        title: 'A/B 테스트와 점진적 배포',
        duration: '2주',
        description: '카나리 배포를 통한 안전한 모델 업데이트'
      },
      {
        title: 'Feature Store 구축',
        duration: '2주',
        description: '중앙화된 특성 관리와 재사용 가능한 ML 파이프라인'
      }
    ],
    executive: [
      {
        title: 'AI 전략과 MLOps 투자 효과',
        duration: '2일',
        description: 'AI 비즈니스 전략과 MLOps ROI 분석'
      },
      {
        title: 'AI 조직 역량 강화',
        duration: '1일',
        description: 'ML 엔지니어 육성과 조직 구조 혁신'
      },
      {
        title: 'AI 거버넌스와 윤리',
        duration: '1일',
        description: 'AI 모델 편향성 관리와 설명 가능한 AI'
      }
    ]
  },

  process: [
    {
      phase: '1단계: MLOps 플랫폼 기반 구축',
      duration: '6주',
      activities: [
        'Kubernetes 클러스터 구축 및 Kubeflow 설치',
        'MLflow 모델 레지스트리와 실험 추적 시스템 구성',
        'n8n 기반 ML 워크플로우 오케스트레이션 환경 구축',
        'JupyterHub 개발 환경과 GPU 자원 관리 시스템 설정'
      ],
      results: [
        'ML 개발 환경 구축 시간 90% 단축',
        'GPU 자원 활용률 40% → 85% 향상',
        '실험 추적 시스템 100% 도입',
        '개발팀 협업 효율성 3배 향상'
      ]
    },
    {
      phase: '2단계: 자동화된 데이터 파이프라인',
      duration: '5주',
      activities: [
        'Apache Airflow와 n8n 통합 데이터 파이프라인 구축',
        'Feature Store 구축으로 특성 재사용성 극대화',
        '데이터 품질 자동 검증 및 이상 탐지 시스템',
        '실시간 스트리밍 데이터 처리 파이프라인 구현'
      ],
      results: [
        '데이터 전처리 시간 80% 단축',
        '데이터 품질 이슈 95% 감소',
        '특성 재사용률 70% 달성',
        '실시간 데이터 처리 지연시간 100ms 달성'
      ]
    },
    {
      phase: '3단계: AutoML과 모델 최적화',
      duration: '7주',
      activities: [
        'AutoML 파이프라인으로 모델 선택 및 튜닝 자동화',
        'Neural Architecture Search(NAS) 시스템 구축',
        'Optuna 기반 하이퍼파라미터 최적화 자동화',
        'ONNX 모델 최적화와 양자화 파이프라인'
      ],
      results: [
        '모델 개발 시간 70% 단축',
        '모델 정확도 평균 15% 향상',
        '하이퍼파라미터 튜닝 시간 95% 단축',
        '모델 추론 속도 5배 향상'
      ]
    },
    {
      phase: '4단계: 프로덕션 배포 자동화',
      duration: '4주',
      activities: [
        'Seldon Core 기반 모델 서빙 플랫폼 구축',
        'n8n 카나리 배포와 A/B 테스트 자동화',
        'Prometheus/Grafana 모델 모니터링 대시보드',
        'Slack/Teams 통합 알림 및 자동 대응 시스템'
      ],
      results: [
        '모델 배포 시간 3개월 → 1일로 95% 단축',
        '배포 실패율 30% → 2% 감소',
        '모델 성능 모니터링 실시간 구현',
        '장애 대응 시간 90% 단축'
      ]
    },
    {
      phase: '5단계: 지능형 모니터링과 자동 재학습',
      duration: '6주',
      activities: [
        'Evidently AI 기반 데이터/모델 드리프트 감지',
        '자동 재학습 트리거와 모델 업데이트 파이프라인',
        'Explainable AI 대시보드로 모델 해석성 제공',
        'MLOps 성과 지표 자동 수집 및 리포팅'
      ],
      results: [
        '드리프트 감지 시간 1주 → 1시간으로 단축',
        '모델 성능 유지율 95% 달성',
        '자동 재학습으로 운영 비용 60% 절감',
        'AI 모델 신뢰도 90% 향상'
      ]
    }
  ],

  results: {
    quantitative: [
      {
        metric: 'ML 모델 배포 시간',
        before: '3개월',
        after: '1일',
        improvement: '-95%'
      },
      {
        metric: '모델 정확도',
        before: '82%',
        after: '94.3%',
        improvement: '+15%'
      },
      {
        metric: '실험 처리량',
        before: '주 5개',
        after: '일 20개',
        improvement: '+2,700%'
      },
      {
        metric: 'GPU 자원 활용률',
        before: '40%',
        after: '85%',
        improvement: '+113%'
      },
      {
        metric: '모델 추론 속도',
        before: '500ms',
        after: '100ms',
        improvement: '+400%'
      },
      {
        metric: '데이터 전처리 시간',
        before: '2주',
        after: '4시간',
        improvement: '-93%'
      }
    ],
    financial: [
      {
        item: 'ML 개발 비용 절감',
        amount: '연간 120억원'
      },
      {
        item: '인프라 효율화 절감',
        amount: '연간 45억원'
      },
      {
        item: '빠른 출시로 인한 수익',
        amount: '연간 200억원'
      },
      {
        item: '고객 만족도 향상 효과',
        amount: '연간 80억원'
      }
    ],
    qualitative: [
      '업계 최초 완전 자동화 MLOps 플랫폼 구축',
      'ML 엔지니어 업무 만족도 85% 향상',
      'AI 모델 신뢰성과 설명가능성 크게 개선',
      '고객 AI 프로젝트 성공률 60% → 95% 향상',
      'Kaggle 대회 상위 1% 달성 팀원 10명 배출',
      'AI/ML 컨퍼런스 발표 및 논문 게재 20건',
      'Fortune 500 기업 10개사와 AI 파트너십 체결'
    ]
  },

  automationMetrics: {
    timeReduction: '85%',
    costSaving: '445억원/년',
    errorReduction: '92%',
    productivityGain: '320%'
  },

  n8nWorkflows: [
    {
      name: 'ML 파이프라인 오케스트레이션',
      description: '데이터 수집부터 모델 배포까지 전체 ML 워크플로우 자동화',
      nodes: 52,
      triggers: ['Data Update', 'Schedule', 'Manual Trigger'],
      actions: ['Data Processing', 'Model Training', 'Validation', 'Deployment']
    },
    {
      name: '모델 성능 모니터링',
      description: '프로덕션 모델 성능 추적 및 드리프트 감지 자동화',
      nodes: 35,
      triggers: ['Performance Threshold', 'Data Drift'],
      actions: ['Alert', 'Retraining', 'Rollback', 'Report Generation']
    },
    {
      name: 'AutoML 실험 관리',
      description: '하이퍼파라미터 튜닝과 모델 선택 자동화',
      nodes: 28,
      triggers: ['New Dataset', 'Experiment Request'],
      actions: ['Grid Search', 'Model Comparison', 'Best Model Selection']
    },
    {
      name: 'Feature Store 관리',
      description: '특성 생성, 검증, 배포 자동화',
      nodes: 22,
      triggers: ['Feature Request', 'Data Change'],
      actions: ['Feature Engineering', 'Validation', 'Store Update']
    },
    {
      name: 'A/B 테스트 자동화',
      description: '모델 성능 비교와 점진적 배포 관리',
      nodes: 30,
      triggers: ['New Model', 'Test Schedule'],
      actions: ['Traffic Splitting', 'Metric Collection', 'Statistical Test']
    }
  ],

  aiImplementations: [
    {
      type: 'AutoML Pipeline',
      purpose: '자동화된 모델 선택 및 하이퍼파라미터 튜닝',
      accuracy: '94.3%',
      processingTime: '2시간/모델'
    },
    {
      type: 'Neural Architecture Search',
      purpose: '최적 신경망 구조 자동 탐색',
      accuracy: '96%',
      processingTime: '12시간/아키텍처'
    },
    {
      type: 'Data Drift Detection',
      purpose: '데이터 분포 변화 자동 감지',
      accuracy: '98%',
      processingTime: '실시간'
    },
    {
      type: 'Model Explainability AI',
      purpose: 'AI 모델 의사결정 과정 해석',
      accuracy: '92%',
      processingTime: '30초/예측'
    },
    {
      type: 'Automated Feature Engineering',
      purpose: '자동 특성 생성 및 선택',
      accuracy: '89%',
      processingTime: '1시간/데이터셋'
    }
  ],

  departmentAutomations: [
    {
      department: 'ML 엔지니어팀',
      automationLevel: '90%',
      timeSaved: '주 30시간',
      costReduction: '팀당 월 1,500만원'
    },
    {
      department: '데이터 사이언스팀',
      automationLevel: '85%',
      timeSaved: '주 25시간',
      costReduction: '팀당 월 1,200만원'
    },
    {
      department: 'MLOps팀',
      automationLevel: '95%',
      timeSaved: '주 35시간',
      costReduction: '팀당 월 1,800만원'
    },
    {
      department: '인프라팀',
      automationLevel: '88%',
      timeSaved: '주 20시간',
      costReduction: '팀당 월 800만원'
    }
  ],

  testimonial: {
    quote: 'MLOps 자동화는 우리 회사를 완전히 변화시켰습니다. 예전에는 ML 모델 하나 배포하는데 3개월이 걸렸는데, 이제는 하루 만에 가능해졌어요. n8n으로 구축한 자동화 파이프라인 덕분에 ML 엔지니어들이 정말 중요한 알고리즘 연구에 집중할 수 있게 되었고, AutoML로 모델 성능도 15%나 향상되었습니다. 특히 드리프트 감지 시스템이 자동으로 모델을 재학습시켜주니까 고객들이 "AI가 점점 똑똑해진다"고 말해요. 이제 우리는 AI를 만드는 회사가 아니라, AI가 AI를 만드는 회사가 되었습니다.',
    author: '박머신',
    position: 'Chief AI Officer',
    company: 'AI이노베이션랩'
  },

  followUpResults: [
    {
      metric: 'AI 특허 출원',
      achievement: 'MLOps 관련 특허 15건 출원, 3건 등록'
    },
    {
      metric: '글로벌 인지도',
      achievement: 'Google Cloud, AWS 파트너 프로그램 최고 등급'
    },
    {
      metric: '인재 유치',
      achievement: '세계 톱 10 대학 AI 박사급 인재 25명 영입'
    },
    {
      metric: '비즈니스 확장',
      achievement: '시장 확장 5개국, 매출 300% 증가'
    }
  ],

  roiData: {
    investment: '35억원',
    monthlySavings: '37.1억원',
    paybackPeriod: '0.94개월',
    threeYearROI: '3,814%'
  },

  implementationTimeline: '7개월',
  
  successFactors: [
    'AI/ML 전문가와 DevOps 엔지니어의 완벽한 융합팀 구성',
    '오픈소스 MLOps 도구들의 전략적 통합과 커스터마이징',
    '실험 중심의 애자일한 개발 문화와 빠른 피드백 루프',
    '클라우드 네이티브 아키텍처 기반의 확장 가능한 인프라',
    '데이터 중심 의사결정과 지속적인 성능 모니터링',
    '글로벌 AI 커뮤니티와의 적극적인 지식 공유 및 협업'
  ],

  tags: ['MLOps', 'AutoML', 'Kubeflow', '모델배포', 'n8n자동화', 'AI파이프라인'],
  featured: true
};
