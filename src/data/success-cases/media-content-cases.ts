'use client';

import { 
  Film, 
  Tv, 
  Music, 
  Newspaper, 
  Radio, 
  Youtube, 
  Camera,
  TrendingUp,
  Clock,
  Target,
  Users,
  BarChart3,
  Zap,
  Globe
} from 'lucide-react';
import { SuccessCaseDetail, SuccessCase } from '@/types/success-case.types';

// 미디어/콘텐츠 업종 성공사례 데이터
export const mediaContentCaseDetails: { [key: string]: SuccessCaseDetail } = {
  'broadcasting-automation': {
    id: 'broadcasting-automation',
    category: 'media',
    industry: '미디어/콘텐츠',
    subIndustry: '방송',
    companyName: 'JTBC (직원 1,800명)',
    companySize: '대기업',
    title: 'AI 방송 제작 자동화 혁신',
    subtitle: '제작 시간 60% 단축, 콘텐츠 품질 45% 향상',
    description: 'AI와 n8n을 활용한 방송 제작 전 과정의 자동화로 콘텐츠 생산성과 품질을 혁신적으로 개선한 사례',
    icon: Tv,
    color: 'purple',
    heroImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop&crop=center',
    companyInfo: {
      industry: '종합 방송사',
      employees: '1,800명',
      revenue: '연 매출 8,500억원',
      location: '서울시 마포구'
    },
    challenges: [
      {
        title: '콘텐츠 제작 시간',
        description: '편집, 자막, CG 작업에 과도한 시간 소요',
        impact: '제작비 증가 및 방송 지연'
      },
      {
        title: '실시간 대응 한계',
        description: '속보 및 생방송 콘텐츠 제작 어려움',
        impact: '시청률 하락 및 경쟁력 저하'
      },
      {
        title: '아카이브 관리',
        description: '방대한 영상 자료 검색 및 활용 어려움',
        impact: '콘텐츠 재활용률 저조'
      },
      {
        title: '글로벌 콘텐츠',
        description: '다국어 자막 및 더빙 작업 부담',
        impact: '해외 진출 제한'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '방송 AI 기초',
          duration: '16시간',
          description: '방송 제작에서의 AI 활용 이해'
        },
        {
          title: 'n8n 미디어 자동화',
          duration: '12시간',
          description: '방송 워크플로우 자동화'
        },
        {
          title: 'AI 영상 편집',
          duration: '14시간',
          description: 'AI 도구를 활용한 편집 기법'
        }
      ],
      advanced: [
        {
          title: 'AI 콘텐츠 생성',
          duration: '24시간',
          description: 'AI 기반 스크립트 및 영상 생성'
        },
        {
          title: '실시간 방송 AI',
          duration: '20시간',
          description: '생방송 자동화 시스템 구축'
        },
        {
          title: '메타데이터 관리',
          duration: '18시간',
          description: 'AI 기반 아카이브 시스템'
        }
      ],
      executive: [
        {
          title: '방송 혁신 전략',
          duration: '8시간',
          description: 'AI 시대 방송사 경영 전략'
        },
        {
          title: '글로벌 미디어 트렌드',
          duration: '6시간',
          description: 'OTT 시대의 방송 전략'
        }
      ]
    },
    process: [
      {
        phase: 'AI 제작 시스템 구축',
        duration: '8주',
        activities: [
          'AI 영상 편집 플랫폼',
          '자동 자막 생성 시스템',
          'CG/VFX 자동화',
          '음성 합성 시스템'
        ],
        results: [
          '편집 시간 60% 단축',
          '자막 정확도 98%',
          'CG 제작 속도 5배'
        ]
      },
      {
        phase: '실시간 방송 혁신',
        duration: '10주',
        activities: [
          'AI 프롬프터 시스템',
          '실시간 그래픽 생성',
          '자동 하이라이트 편집',
          'AI 앵커 개발'
        ],
        results: [
          '생방송 준비 시간 70% 단축',
          '속보 대응 시간 5분 내',
          'AI 앵커 24시간 방송'
        ]
      },
      {
        phase: '아카이브 스마트화',
        duration: '12주',
        activities: [
          'AI 메타데이터 태깅',
          '영상 검색 엔진',
          '자동 하이라이트 추출',
          '콘텐츠 추천 시스템'
        ],
        results: [
          '30년치 아카이브 디지털화',
          '검색 시간 95% 단축',
          '재활용률 300% 증가'
        ]
      },
      {
        phase: '글로벌 확산',
        duration: '14주',
        activities: [
          '다국어 자막 자동화',
          'AI 더빙 시스템',
          '문화 현지화',
          '글로벌 플랫폼 연동'
        ],
        results: [
          '15개 언어 실시간 자막',
          '해외 시청자 500% 증가',
          'Netflix 콘텐츠 공급'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '콘텐츠 제작 시간',
          before: '평균 5일',
          after: '평균 2일',
          improvement: '60% 단축'
        },
        {
          metric: '월 콘텐츠 생산량',
          before: '300편',
          after: '750편',
          improvement: '150% 증가'
        },
        {
          metric: '제작비',
          before: '편당 5천만원',
          after: '편당 2천만원',
          improvement: '60% 절감'
        },
        {
          metric: '시청률',
          before: '평균 3.5%',
          after: '평균 5.2%',
          improvement: '48.6% 상승'
        },
        {
          metric: '글로벌 시청자',
          before: '50만명',
          after: '300만명',
          improvement: '500% 증가'
        },
        {
          metric: '콘텐츠 재활용률',
          before: '15%',
          after: '60%',
          improvement: '300% 향상'
        }
      ],
      financial: [
        {
          item: '제작비 절감',
          amount: '연 450억원'
        },
        {
          item: '광고 수익 증가',
          amount: '연 320억원'
        },
        {
          item: '글로벌 수익',
          amount: '연 280억원'
        },
        {
          item: '총 ROI',
          amount: '투자 대비 420%'
        }
      ],
      qualitative: [
        '국내 방송 혁신 선도',
        '글로벌 콘텐츠 경쟁력 확보',
        'PD/작가 창의 시간 확대',
        '24시간 뉴스 서비스 실현',
        '시청자 맞춤형 콘텐츠 제공'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'AI 영상 편집',
          description: '자동 컷 편집 및 색보정',
          efficiency: '편집 시간 60% 절감'
        },
        {
          name: '실시간 자막 생성',
          description: 'AI 음성인식 기반 자막',
          efficiency: '정확도 98%, 속도 10배'
        },
        {
          name: 'CG 자동 생성',
          description: 'AI 기반 그래픽 자동 제작',
          efficiency: '제작 시간 80% 단축'
        },
        {
          name: '콘텐츠 추천',
          description: 'AI 기반 개인화 추천',
          efficiency: '시청 시간 45% 증가'
        }
      ],
      integrations: [
        'Adobe Creative Cloud',
        'AWS Media Services',
        'YouTube/Netflix API',
        'AI 음성합성 엔진'
      ]
    },
    testimonials: [
      {
        quote: "AI 도입으로 단순 편집 작업에서 벗어나 창의적인 기획과 스토리텔링에 집중할 수 있게 되었습니다. 제작 속도가 빨라져 더 많은 실험적 콘텐츠도 시도할 수 있게 되었죠.",
        author: "김현주",
        position: "예능PD",
        company: "JTBC"
      },
      {
        quote: "실시간 자막과 다국어 번역이 자동화되어 글로벌 시청자들과 즉시 소통할 수 있게 되었습니다. 한국 콘텐츠의 세계화에 큰 도움이 됩니다.",
        author: "이정민",
        position: "글로벌사업팀장",
        company: "JTBC"
      }
    ],
    featured: true,
    implementationPeriod: '10개월',
    teamSize: '85명',
    technologies: ['OpenAI', 'Stable Diffusion', 'n8n', 'AWS', 'FFmpeg', 'Whisper'],
    downloadableResources: [
      '방송 AI 도입 가이드북',
      '콘텐츠 자동화 매뉴얼',
      '글로벌 미디어 전략서'
    ]
  },

  'streaming-platform': {
    id: 'streaming-platform',
    category: 'media',
    industry: '미디어/콘텐츠',
    subIndustry: 'OTT/스트리밍',
    companyName: '왓챠 (직원 280명)',
    companySize: '중견기업',
    title: 'AI 기반 OTT 플랫폼 혁신',
    subtitle: '시청 시간 65% 증가, 이탈률 45% 감소',
    description: 'AI와 n8n을 활용한 초개인화 콘텐츠 추천과 자동 큐레이션으로 사용자 경험을 혁신한 사례',
    icon: Youtube,
    color: 'red',
    heroImage: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&h=800&fit=crop&crop=center',
    companyInfo: {
      industry: 'OTT 플랫폼',
      employees: '280명',
      revenue: '연 매출 2,800억원',
      location: '서울시 강남구'
    },
    challenges: [
      {
        title: '콘텐츠 발견성',
        description: '방대한 콘텐츠 중 사용자 취향 매칭 어려움',
        impact: '낮은 시청 시간 및 이탈률 증가'
      },
      {
        title: '콘텐츠 메타데이터',
        description: '수동 태깅과 분류의 한계',
        impact: '부정확한 추천 및 검색'
      },
      {
        title: '실시간 트렌드 대응',
        description: '빠르게 변하는 시청 트렌드 파악 지연',
        impact: '경쟁력 저하'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'OTT AI 기초',
          duration: '12시간',
          description: '스트리밍 플랫폼 AI 활용'
        },
        {
          title: 'n8n 플랫폼 자동화',
          duration: '14시간',
          description: '콘텐츠 관리 자동화'
        }
      ],
      advanced: [
        {
          title: 'AI 추천 시스템',
          duration: '24시간',
          description: '협업 필터링과 딥러닝'
        },
        {
          title: '콘텐츠 분석 AI',
          duration: '20시간',
          description: '영상/음성 분석 및 태깅'
        }
      ],
      executive: [
        {
          title: 'OTT 경영 전략',
          duration: '6시간',
          description: 'AI 기반 플랫폼 전략'
        }
      ]
    },
    process: [
      {
        phase: 'AI 추천 엔진 구축',
        duration: '10주',
        activities: [
          '딥러닝 추천 모델',
          '실시간 개인화',
          'A/B 테스트 자동화'
        ],
        results: [
          '추천 정확도 85%',
          '클릭률 120% 상승'
        ]
      },
      {
        phase: '콘텐츠 자동 분석',
        duration: '12주',
        activities: [
          'AI 씬 분석',
          '감정 태깅',
          '자동 하이라이트'
        ],
        results: [
          '100만 콘텐츠 자동 태깅',
          '검색 정확도 92%'
        ]
      },
      {
        phase: '사용자 경험 혁신',
        duration: '8주',
        activities: [
          'AI 썸네일 생성',
          '개인화 UI/UX',
          '시청 패턴 분석'
        ],
        results: [
          '시청 시간 65% 증가',
          '이탈률 45% 감소'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '평균 시청 시간',
          before: '일 45분',
          after: '일 74분',
          improvement: '64.4% 증가'
        },
        {
          metric: '월간 활성 사용자',
          before: '180만명',
          after: '420만명',
          improvement: '133% 증가'
        },
        {
          metric: '구독 갱신율',
          before: '55%',
          after: '82%',
          improvement: '49% 향상'
        },
        {
          metric: '콘텐츠 발견 시간',
          before: '평균 8분',
          after: '평균 2분',
          improvement: '75% 단축'
        }
      ],
      financial: [
        {
          item: '구독 수익 증가',
          amount: '연 850억원'
        },
        {
          item: '광고 수익',
          amount: '연 320억원'
        },
        {
          item: 'ROI',
          amount: '8개월 내 회수'
        }
      ],
      qualitative: [
        '국내 OTT 시장 점유율 2위',
        '사용자 만족도 대폭 향상',
        '오리지널 콘텐츠 투자 확대'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'AI 콘텐츠 추천',
          description: '초개인화 추천 알고리즘',
          efficiency: '시청 시간 65% 증가'
        },
        {
          name: '자동 메타데이터',
          description: 'AI 기반 콘텐츠 분석 및 태깅',
          efficiency: '처리 시간 95% 절감'
        },
        {
          name: '동적 썸네일',
          description: '사용자별 맞춤 썸네일 생성',
          efficiency: '클릭률 45% 상승'
        }
      ],
      integrations: [
        'Netflix API',
        'AWS Personalize',
        'Google Cloud Vision'
      ]
    },
    testimonials: [
      {
        quote: "AI가 제 취향을 정확히 파악해서 추천해주는 콘텐츠가 정말 마음에 들어요. 이제는 뭘 볼지 고민하는 시간이 거의 없어졌습니다.",
        author: "박서연",
        position: "프리미엄 구독자",
        company: "왓챠 사용자"
      }
    ],
    featured: true,
    implementationPeriod: '7개월',
    teamSize: '42명',
    technologies: ['TensorFlow', 'n8n', 'Kubernetes', 'Apache Spark', 'Redis'],
    downloadableResources: [
      'OTT AI 추천 시스템 백서',
      '콘텐츠 메타데이터 가이드'
    ]
  },

  // 추가 5개 사례 구조 (상세 내용 생략)
  'news-media': {
    id: 'news-media',
    category: 'media',
    industry: '미디어/콘텐츠',
    subIndustry: '뉴스/언론',
    companyName: '조선일보 디지털',
    title: 'AI 뉴스룸 자동화 혁신',
    subtitle: '기사 생산성 180% 향상, 팩트체크 정확도 95%',
    description: 'AI와 n8n을 활용한 뉴스 생산 자동화와 팩트체킹으로 저널리즘을 혁신한 사례',
    icon: Newspaper,
    color: 'gray',
    featured: false,
    implementationPeriod: '6개월',
    teamSize: '35명'
  },

  'music-production': {
    id: 'music-production',
    category: 'media',
    industry: '미디어/콘텐츠',
    subIndustry: '음악',
    companyName: 'SM엔터테인먼트',
    title: 'AI 음악 제작 혁신 플랫폼',
    subtitle: '제작 시간 50% 단축, 히트곡 예측 정확도 78%',
    description: 'AI를 활용한 작곡, 편곡, 믹싱 자동화로 음악 제작을 혁신한 사례',
    icon: Music,
    color: 'pink',
    featured: true,
    implementationPeriod: '8개월',
    teamSize: '48명'
  },

  'game-development': {
    id: 'game-development',
    category: 'media',
    industry: '미디어/콘텐츠',
    subIndustry: '게임',
    companyName: '넥슨코리아',
    title: 'AI 게임 개발 자동화',
    subtitle: '개발 기간 40% 단축, 콘텐츠 생산량 3배 증가',
    description: 'AI를 활용한 게임 레벨 디자인과 NPC 행동 패턴 자동 생성으로 개발을 혁신한 사례',
    icon: Film,
    color: 'blue',
    featured: false,
    implementationPeriod: '10개월',
    teamSize: '95명'
  },

  'digital-advertising': {
    id: 'digital-advertising',
    category: 'media',
    industry: '미디어/콘텐츠',
    subIndustry: '디지털광고',
    companyName: '나스미디어',
    title: 'AI 광고 최적화 플랫폼',
    subtitle: 'CTR 85% 향상, ROAS 220% 개선',
    description: 'AI 기반 타겟팅과 크리에이티브 최적화로 광고 효율을 극대화한 사례',
    icon: Camera,
    color: 'orange',
    featured: true,
    implementationPeriod: '5개월',
    teamSize: '28명'
  },

  'podcast-platform': {
    id: 'podcast-platform',
    category: 'media',
    industry: '미디어/콘텐츠',
    subIndustry: '팟캐스트',
    companyName: '스푼라디오',
    title: 'AI 오디오 콘텐츠 혁신',
    subtitle: '콘텐츠 생산 효율 150% 향상, 청취 시간 60% 증가',
    description: 'AI 음성 합성과 자동 편집으로 오디오 콘텐츠 제작을 혁신한 사례',
    icon: Radio,
    color: 'green',
    featured: false,
    implementationPeriod: '6개월',
    teamSize: '32명'
  }
};

// 미디어/콘텐츠 업종 요약 리스트
export const mediaContentCases: SuccessCase[] = [
  {
    id: 'broadcasting-automation',
    category: 'media',
    industry: '미디어/콘텐츠',
    subIndustry: '방송',
    companyName: 'JTBC',
    title: 'AI 방송 제작 자동화 혁신',
    description: '제작 시간 60% 단축, 콘텐츠 품질 45% 향상',
    metrics: {
      time: '-60%',
      production: '+150%',
      cost: '-60%',
      viewership: '+48.6%'
    },
    tags: ['방송자동화', 'AI편집', '실시간자막', '글로벌콘텐츠'],
    icon: Tv,
    color: 'purple',
    featured: true
  },
  {
    id: 'streaming-platform',
    category: 'media',
    industry: '미디어/콘텐츠',
    subIndustry: 'OTT/스트리밍',
    companyName: '왓챠',
    title: 'AI 기반 OTT 플랫폼 혁신',
    description: '시청 시간 65% 증가, 이탈률 45% 감소',
    metrics: {
      watchTime: '+65%',
      churn: '-45%',
      users: '+133%',
      renewal: '+49%'
    },
    tags: ['OTT', 'AI추천', '개인화', '콘텐츠큐레이션'],
    icon: Youtube,
    color: 'red',
    featured: true
  },
  {
    id: 'news-media',
    category: 'media',
    industry: '미디어/콘텐츠',
    subIndustry: '뉴스/언론',
    companyName: '조선일보',
    title: 'AI 뉴스룸 자동화 혁신',
    description: '기사 생산성 180% 향상, 팩트체크 정확도 95%',
    metrics: {
      productivity: '+180%',
      accuracy: '95%',
      speed: '+250%',
      reach: '+120%'
    },
    tags: ['뉴스자동화', '팩트체킹', 'AI기자', '실시간뉴스'],
    icon: Newspaper,
    color: 'gray',
    featured: false
  },
  {
    id: 'music-production',
    category: 'media',
    industry: '미디어/콘텐츠',
    subIndustry: '음악',
    companyName: 'SM엔터테인먼트',
    title: 'AI 음악 제작 혁신 플랫폼',
    description: '제작 시간 50% 단축, 히트곡 예측 정확도 78%',
    metrics: {
      time: '-50%',
      hitRate: '78%',
      production: '+200%',
      cost: '-45%'
    },
    tags: ['AI작곡', '음악제작', '자동믹싱', '히트예측'],
    icon: Music,
    color: 'pink',
    featured: true
  },
  {
    id: 'game-development',
    category: 'media',
    industry: '미디어/콘텐츠',
    subIndustry: '게임',
    companyName: '넥슨코리아',
    title: 'AI 게임 개발 자동화',
    description: '개발 기간 40% 단축, 콘텐츠 생산량 3배 증가',
    metrics: {
      development: '-40%',
      content: '+300%',
      quality: '+55%',
      revenue: '+85%'
    },
    tags: ['게임개발', 'AI레벨디자인', 'NPC생성', '자동QA'],
    icon: Film,
    color: 'blue',
    featured: false
  },
  {
    id: 'digital-advertising',
    category: 'media',
    industry: '미디어/콘텐츠',
    subIndustry: '디지털광고',
    companyName: '나스미디어',
    title: 'AI 광고 최적화 플랫폼',
    description: 'CTR 85% 향상, ROAS 220% 개선',
    metrics: {
      ctr: '+85%',
      roas: '+220%',
      cost: '-35%',
      conversion: '+165%'
    },
    tags: ['광고최적화', 'AI타겟팅', '크리에이티브자동화', '성과예측'],
    icon: Camera,
    color: 'orange',
    featured: true
  },
  {
    id: 'podcast-platform',
    category: 'media',
    industry: '미디어/콘텐츠',
    subIndustry: '팟캐스트',
    companyName: '스푼라디오',
    title: 'AI 오디오 콘텐츠 혁신',
    description: '콘텐츠 생산 효율 150% 향상, 청취 시간 60% 증가',
    metrics: {
      efficiency: '+150%',
      listening: '+60%',
      creators: '+180%',
      revenue: '+95%'
    },
    tags: ['팟캐스트', 'AI음성합성', '자동편집', '오디오콘텐츠'],
    icon: Radio,
    color: 'green',
    featured: false
  }
];
