'use client';

import { 
  GraduationCap, 
  BookOpen, 
  School, 
  Microscope, 
  Library, 
  Users, 
  Brain,
  TrendingUp,
  Clock,
  Target,
  Award,
  BarChart3,
  Zap,
  Globe
} from 'lucide-react';
import { SuccessCaseDetail, SuccessCase } from '@/types/success-case.types';

// 교육/연구 업종 성공사례 데이터
export const educationResearchCaseDetails: { [key: string]: SuccessCaseDetail } = {
  'university-digital-campus': {
    id: 'university-digital-campus',
    category: 'education',
    industry: '교육/연구',
    subIndustry: '대학교',
    companyName: '연세대학교 (직원 4,200명)',
    companySize: '대기업',
    title: 'AI 기반 스마트 캠퍼스 혁신',
    subtitle: '학습 성과 45% 향상, 행정 효율 70% 개선',
    description: 'AI와 n8n을 활용한 대학 교육 및 행정 전반의 디지털 전환으로 미래형 스마트 캠퍼스를 구현한 혁신 사례',
    icon: GraduationCap,
    color: 'blue',
    heroImage: 'https://images.unsplash.com/photo-1523240794102-9ebd0b167f70?w=1200&h=800&fit=crop&crop=center',
    companyInfo: {
      industry: '종합대학',
      employees: '4,200명',
      revenue: '연 예산 1조 2천억원',
      location: '서울시 서대문구'
    },
    challenges: [
      {
        title: '개인 맞춤 교육 한계',
        description: '대규모 강의 중심으로 개별 학생 맞춤 교육 어려움',
        impact: '학습 효과 저하 및 중도 탈락률 증가'
      },
      {
        title: '행정 업무 비효율',
        description: '복잡한 학사 행정으로 처리 시간 과다',
        impact: '학생/교직원 만족도 저하 및 운영비 증가'
      },
      {
        title: '연구 데이터 관리',
        description: '방대한 연구 데이터의 체계적 관리 부족',
        impact: '연구 생산성 저하 및 중복 연구 발생'
      },
      {
        title: '온라인 교육 품질',
        description: '단순 동영상 강의로 인한 학습 효과 제한',
        impact: '온라인 과정 만족도 및 수료율 저조'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'EdTech AI 기초',
          duration: '16시간',
          description: '교육 분야 AI 기술의 이해와 활용'
        },
        {
          title: 'n8n 교육 자동화',
          duration: '12시간',
          description: '학사 행정 및 교육 프로세스 자동화'
        },
        {
          title: '디지털 교수법',
          duration: '10시간',
          description: 'AI 도구를 활용한 효과적인 교수 설계'
        }
      ],
      advanced: [
        {
          title: 'AI 학습 분석',
          duration: '24시간',
          description: '학습 데이터 분석 및 예측 모델링'
        },
        {
          title: '맞춤형 학습 시스템',
          duration: '20시간',
          description: 'AI 기반 적응형 학습 플랫폼 구축'
        },
        {
          title: '연구 데이터 AI',
          duration: '18시간',
          description: '연구 데이터 관리 및 분석 자동화'
        }
      ],
      executive: [
        {
          title: '대학 혁신 전략',
          duration: '8시간',
          description: 'AI 시대 대학 경영 및 혁신 전략'
        },
        {
          title: '글로벌 EdTech 트렌드',
          duration: '6시간',
          description: '세계 교육 기술 동향과 미래 전망'
        }
      ]
    },
    process: [
      {
        phase: '현황 분석 및 설계',
        duration: '6주',
        activities: [
          '전체 학사 프로세스 매핑',
          '학습 데이터 수집 체계 구축',
          'AI 플랫폼 아키텍처 설계',
          '파일럿 학과 선정'
        ],
        results: [
          '186개 행정 프로세스 문서화',
          '자동화 가능 업무 112개 도출',
          '통합 AI 플랫폼 설계 완료'
        ]
      },
      {
        phase: 'AI 시스템 구축',
        duration: '12주',
        activities: [
          'AI 튜터링 시스템 개발',
          '학습 분석 대시보드 구축',
          '자동 과제 평가 시스템',
          '연구 데이터 플랫폼 구축'
        ],
        results: [
          'AI 튜터 정확도 92% 달성',
          '실시간 학습 분석 가능',
          '과제 평가 시간 80% 단축'
        ]
      },
      {
        phase: '파일럿 운영',
        duration: '16주',
        activities: [
          '5개 단과대학 파일럿 적용',
          '교수진 AI 활용 교육',
          '학생 피드백 수집 및 개선',
          '효과성 측정'
        ],
        results: [
          '학습 성과 35% 향상 확인',
          '교수 만족도 88% 달성',
          '시스템 안정성 99.5%'
        ]
      },
      {
        phase: '전면 확산',
        duration: '12주',
        activities: [
          '전체 학과 단계적 확대',
          '온라인 과정 AI 통합',
          '행정 자동화 전면 적용',
          '지속 개선 체계 구축'
        ],
        results: [
          '전체 16개 단과대 적용',
          '35,000명 학생 이용',
          '행정 효율 70% 개선'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '학습 성과',
          before: '평균 3.2/4.5',
          after: '평균 4.1/4.5',
          improvement: '28% 향상'
        },
        {
          metric: '중도 탈락률',
          before: '12%',
          after: '4%',
          improvement: '66.7% 감소'
        },
        {
          metric: '행정 처리 시간',
          before: '평균 3일',
          after: '평균 0.9일',
          improvement: '70% 단축'
        },
        {
          metric: '연구 생산성',
          before: '연 800편',
          after: '연 1,240편',
          improvement: '55% 증가'
        },
        {
          metric: '온라인 과정 수료율',
          before: '45%',
          after: '82%',
          improvement: '82.2% 향상'
        },
        {
          metric: '학생 만족도',
          before: '3.5/5.0',
          after: '4.4/5.0',
          improvement: '25.7% 향상'
        }
      ],
      financial: [
        {
          item: '운영비 절감',
          amount: '연 125억원'
        },
        {
          item: '온라인 과정 수익',
          amount: '연 85억원'
        },
        {
          item: '연구 과제 수주 증가',
          amount: '연 210억원'
        },
        {
          item: '총 ROI',
          amount: '투자 대비 285%'
        }
      ],
      qualitative: [
        'THE 세계 대학 순위 15계단 상승',
        '디지털 혁신 선도 대학 인증',
        '학생 진로 취업률 대폭 개선',
        '교수진 연구 역량 강화',
        '글로벌 교육 파트너십 확대'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'AI 개인 튜터',
          description: '24/7 맞춤형 학습 지원 및 질의응답',
          efficiency: '학습 효과 45% 향상'
        },
        {
          name: '자동 과제 평가',
          description: 'AI 기반 과제/시험 자동 채점 및 피드백',
          efficiency: '평가 시간 85% 절감'
        },
        {
          name: '학사 행정 자동화',
          description: '수강신청, 성적처리, 증명서 발급 자동화',
          efficiency: '처리 시간 70% 단축'
        },
        {
          name: '연구 데이터 관리',
          description: 'AI 기반 연구 데이터 분류 및 분석',
          efficiency: '연구 효율 55% 향상'
        }
      ],
      integrations: [
        'LMS(학습관리시스템) 완벽 연동',
        '학사정보시스템 통합',
        '연구관리시스템 연계',
        '도서관 시스템 통합'
      ]
    },
    testimonials: [
      {
        quote: "AI 튜터 덕분에 언제든 질문하고 즉시 피드백을 받을 수 있어 학습 효과가 크게 높아졌습니다. 특히 취약 과목을 집중적으로 보완할 수 있어 성적이 크게 향상되었습니다.",
        author: "김지수",
        position: "경영학과 3학년",
        company: "연세대학교"
      },
      {
        quote: "AI 도구를 활용하니 반복적인 행정 업무가 줄어들고 연구와 강의에 집중할 수 있게 되었습니다. 학생들의 학습 패턴을 실시간으로 파악하여 맞춤형 지도가 가능해졌습니다.",
        author: "박성준",
        position: "컴퓨터공학과 교수",
        company: "연세대학교"
      }
    ],
    featured: true,
    implementationPeriod: '10개월',
    teamSize: '65명',
    technologies: ['GPT-4', 'Claude', 'n8n', 'Python', 'LangChain', 'Moodle'],
    downloadableResources: [
      '대학 AI 도입 가이드북',
      '스마트 캠퍼스 구축 매뉴얼',
      'EdTech ROI 계산기'
    ]
  },

  'k12-personalized-learning': {
    id: 'k12-personalized-learning',
    category: 'education',
    industry: '교육/연구',
    subIndustry: '초중고교',
    companyName: '서울국제학교 (직원 320명)',
    companySize: '중견기업',
    title: 'K-12 AI 맞춤형 학습 혁신',
    subtitle: '학업 성취도 52% 향상, 학습 격차 65% 해소',
    description: 'AI 적응형 학습과 n8n 자동화로 모든 학생에게 최적화된 교육을 제공하는 혁신 사례',
    icon: School,
    color: 'green',
    heroImage: 'https://images.unsplash.com/photo-1523240794102-9ebd0b167f70?w=1200&h=800&fit=crop&crop=center',
    companyInfo: {
      industry: '초중고 사립학교',
      employees: '320명',
      revenue: '연 예산 450억원',
      location: '서울시 강남구'
    },
    challenges: [
      {
        title: '학습 수준 격차',
        description: '학생별 학습 속도와 이해도 차이 극심',
        impact: '하위권 학생 소외 및 상위권 학생 정체'
      },
      {
        title: '교사 업무 과중',
        description: '개별 지도와 행정 업무로 인한 과부하',
        impact: '교육 품질 저하 및 교사 번아웃'
      },
      {
        title: '학부모 소통',
        description: '자녀 학습 상황 파악 및 소통 부족',
        impact: '가정 학습 지원 어려움'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'K-12 AI 교육 기초',
          duration: '12시간',
          description: '초중고 교육에서의 AI 활용법'
        },
        {
          title: 'n8n 학습 자동화',
          duration: '10시간',
          description: '학습 관리 프로세스 자동화'
        }
      ],
      advanced: [
        {
          title: '적응형 학습 설계',
          duration: '20시간',
          description: 'AI 기반 개인 맞춤 커리큘럼'
        },
        {
          title: '학습 분석 및 평가',
          duration: '16시간',
          description: '데이터 기반 학습 진단과 처방'
        }
      ],
      executive: [
        {
          title: '미래 교육 리더십',
          duration: '6시간',
          description: 'AI 시대 학교 경영 전략'
        }
      ]
    },
    process: [
      {
        phase: '기초 환경 구축',
        duration: '4주',
        activities: [
          '학습 데이터 수집 체계',
          'AI 학습 플랫폼 도입',
          '교사 기초 교육'
        ],
        results: [
          '전교생 학습 프로필 구축',
          'AI 플랫폼 안정화'
        ]
      },
      {
        phase: 'AI 시스템 적용',
        duration: '8주',
        activities: [
          '적응형 학습 콘텐츠',
          'AI 과제 생성기',
          '실시간 학습 분석'
        ],
        results: [
          '맞춤형 문제 생성 자동화',
          '학습 패턴 실시간 파악'
        ]
      },
      {
        phase: '전면 통합',
        duration: '12주',
        activities: [
          '전 학년 확대 적용',
          '학부모 앱 연동',
          '성과 측정 및 개선'
        ],
        results: [
          '전교생 1,800명 활용',
          '학업 성취도 52% 향상'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '평균 성적',
          before: '72점',
          after: '85점',
          improvement: '18% 향상'
        },
        {
          metric: '학습 격차',
          before: '상하위 35점 차',
          after: '상하위 12점 차',
          improvement: '65.7% 해소'
        },
        {
          metric: '과제 완료율',
          before: '68%',
          after: '94%',
          improvement: '38.2% 향상'
        },
        {
          metric: '교사 행정 시간',
          before: '일일 3시간',
          after: '일일 0.8시간',
          improvement: '73.3% 감소'
        }
      ],
      financial: [
        {
          item: '사교육비 절감',
          amount: '학생당 월 50만원'
        },
        {
          item: '운영 효율화',
          amount: '연 8억원'
        },
        {
          item: 'ROI',
          amount: '1.5년 내 회수'
        }
      ],
      qualitative: [
        '학생 학습 동기 대폭 향상',
        '교사 직무 만족도 증가',
        '학부모 신뢰도 상승'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'AI 맞춤 문제 생성',
          description: '학생 수준별 자동 문제 출제',
          efficiency: '문제 작성 시간 90% 절감'
        },
        {
          name: '학습 경로 최적화',
          description: 'AI 기반 개인별 학습 로드맵',
          efficiency: '학습 효율 52% 향상'
        },
        {
          name: '자동 학부모 리포트',
          description: '주간 학습 현황 자동 전송',
          efficiency: '소통 시간 80% 절감'
        }
      ],
      integrations: [
        '교육청 나이스 시스템',
        '디지털 교과서',
        '학부모 알림 앱'
      ]
    },
    testimonials: [
      {
        quote: "AI 시스템이 제 수준에 맞는 문제를 내주니까 공부가 재미있어졌어요. 모르는 것을 바로 AI 선생님께 물어볼 수 있어서 좋아요.",
        author: "이서연",
        position: "중학교 2학년",
        company: "서울국제학교"
      }
    ],
    featured: true,
    implementationPeriod: '6개월',
    teamSize: '25명',
    technologies: ['ChatGPT', 'n8n', 'Khan Academy API', 'Google Classroom'],
    downloadableResources: [
      'K-12 AI 교육 가이드',
      '적응형 학습 템플릿'
    ]
  },

  'vocational-training': {
    id: 'vocational-training',
    category: 'education',
    industry: '교육/연구',
    subIndustry: '직업교육',
    companyName: '한국폴리텍대학 (직원 1,200명)',
    companySize: '대기업',
    title: '실무 중심 AI 직업교육 혁신',
    subtitle: '취업률 85% 달성, 실무 역량 70% 향상',
    description: 'AI 시뮬레이션과 n8n 자동화로 산업 현장 맞춤형 인재를 양성하는 직업교육 혁신 사례',
    icon: BookOpen,
    color: 'purple',
    heroImage: 'https://images.unsplash.com/photo-1523240794102-9ebd0b167f70?w=1200&h=800&fit=crop&crop=center',
    companyInfo: {
      industry: '직업능력개발',
      employees: '1,200명',
      revenue: '연 예산 3,500억원',
      location: '전국 35개 캠퍼스'
    },
    challenges: [
      {
        title: '실습 환경 제약',
        description: '고가 장비와 위험한 실습 환경의 한계',
        impact: '실무 경험 부족으로 취업 경쟁력 저하'
      },
      {
        title: '산업 수요 불일치',
        description: '급변하는 산업 수요와 교육 과정 격차',
        impact: '졸업생 미스매치 및 재교육 필요'
      },
      {
        title: '개별 진도 관리',
        description: '다양한 배경의 학습자 수준 차이',
        impact: '교육 효과 저하 및 중도 탈락'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '산업 AI 기초',
          duration: '20시간',
          description: '제조, 서비스 산업 AI 이해'
        },
        {
          title: 'n8n 실무 활용',
          duration: '16시간',
          description: '업무 자동화 실습'
        }
      ],
      advanced: [
        {
          title: 'AI 시뮬레이션 실습',
          duration: '40시간',
          description: 'VR/AR 활용 가상 실습'
        },
        {
          title: '프로젝트 기반 학습',
          duration: '60시간',
          description: '실제 산업 프로젝트 수행'
        }
      ],
      executive: [
        {
          title: '직업교육 혁신',
          duration: '8시간',
          description: 'AI 시대 직업교육 전략'
        }
      ]
    },
    process: [
      {
        phase: 'VR/AR 실습실 구축',
        duration: '8주',
        activities: [
          'VR 용접 시뮬레이터',
          'AR 정비 실습 시스템',
          'AI 코칭 시스템'
        ],
        results: [
          '위험 작업 안전 실습',
          '반복 훈련 무제한'
        ]
      },
      {
        phase: '산학 연계 강화',
        duration: '12주',
        activities: [
          '기업 수요 실시간 반영',
          'AI 기반 커리큘럼 조정',
          '현장 전문가 멘토링'
        ],
        results: [
          '취업 연계율 75%',
          '기업 만족도 90%'
        ]
      },
      {
        phase: '성과 확산',
        duration: '16주',
        activities: [
          '35개 캠퍼스 확대',
          '우수 사례 공유',
          '지속 개선 체계'
        ],
        results: [
          '전국 15,000명 수혜',
          '취업률 85% 달성'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '취업률',
          before: '58%',
          after: '85%',
          improvement: '46.6% 향상'
        },
        {
          metric: '실무 역량',
          before: '기초 수준',
          after: '준전문가 수준',
          improvement: '70% 향상'
        },
        {
          metric: '교육 기간',
          before: '2년',
          after: '1.2년',
          improvement: '40% 단축'
        },
        {
          metric: '중도 탈락률',
          before: '25%',
          after: '8%',
          improvement: '68% 감소'
        }
      ],
      financial: [
        {
          item: '실습 비용 절감',
          amount: '연 45억원'
        },
        {
          item: '취업 연계 수익',
          amount: '연 28억원'
        },
        {
          item: 'ROI',
          amount: '2년 내 회수'
        }
      ],
      qualitative: [
        '산업체 인력 수급 개선',
        '학습자 자신감 향상',
        '국가 기술 경쟁력 강화'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'VR 실습 시뮬레이션',
          description: '위험 작업 가상 체험',
          efficiency: '사고 위험 100% 제거'
        },
        {
          name: 'AI 기술 평가',
          description: '실시간 스킬 레벨 측정',
          efficiency: '평가 정확도 95%'
        },
        {
          name: '취업 매칭 시스템',
          description: 'AI 기반 기업-인재 매칭',
          efficiency: '매칭 성공률 82%'
        }
      ],
      integrations: [
        'VR/AR 실습 장비',
        '산업체 ERP 시스템',
        '고용노동부 워크넷'
      ]
    },
    testimonials: [
      {
        quote: "VR 용접 시뮬레이터로 안전하게 반복 연습할 수 있어서 실제 현장에 나갔을 때 자신 있게 작업할 수 있었습니다. 덕분에 대기업에 취업할 수 있었어요.",
        author: "최민호",
        position: "용접과 졸업생",
        company: "현대중공업 근무"
      }
    ],
    featured: false,
    implementationPeriod: '10개월',
    teamSize: '45명',
    technologies: ['Unity VR', 'n8n', 'TensorFlow', 'AR Core'],
    downloadableResources: [
      '직업교육 AI 도입 가이드',
      'VR/AR 실습 매뉴얼'
    ]
  },

  'language-institute': {
    id: 'language-institute',
    category: 'education',
    industry: '교육/연구',
    subIndustry: '어학원',
    companyName: 'YBM 어학원 (직원 850명)',
    companySize: '중견기업',
    title: 'AI 언어 학습 플랫폼 혁신',
    subtitle: '학습 효율 65% 향상, 회화 실력 3배 증가',
    description: 'AI 음성 인식과 n8n 자동화로 언어 학습의 효과를 극대화한 혁신적 사례',
    icon: Globe,
    color: 'orange',
    heroImage: '/images/benchmark/95AI 기반 번역·통역 지원.png',
    companyInfo: {
      industry: '어학교육',
      employees: '850명',
      revenue: '연 매출 680억원',
      location: '전국 45개 지점'
    },
    challenges: [
      {
        title: '회화 연습 기회 부족',
        description: '원어민 강사 부족과 대면 수업 한계',
        impact: '실전 회화 능력 향상 제한'
      },
      {
        title: '개인별 진도 관리',
        description: '학습자별 수준과 목표 차이',
        impact: '학습 효과 저하 및 중도 포기'
      },
      {
        title: '학습 동기 유지',
        description: '단조로운 학습 방식으로 흥미 저하',
        impact: '수강 연장률 감소'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '언어 AI 기초',
          duration: '8시간',
          description: 'AI 언어 학습 도구 이해'
        },
        {
          title: 'n8n 학습 관리',
          duration: '12시간',
          description: '학습 프로세스 자동화'
        }
      ],
      advanced: [
        {
          title: 'AI 회화 시스템',
          duration: '20시간',
          description: 'AI 튜터와 실전 회화'
        },
        {
          title: '발음 교정 AI',
          duration: '16시간',
          description: '음성 인식 기반 발음 코칭'
        }
      ],
      executive: [
        {
          title: '어학원 경영 혁신',
          duration: '6시간',
          description: 'AI 활용 어학 비즈니스'
        }
      ]
    },
    process: [
      {
        phase: 'AI 튜터 개발',
        duration: '8주',
        activities: [
          'AI 회화 봇 구축',
          '음성 인식 시스템',
          '맞춤 커리큘럼 엔진'
        ],
        results: [
          '24/7 회화 연습 가능',
          '발음 정확도 측정'
        ]
      },
      {
        phase: '학습 플랫폼 통합',
        duration: '10주',
        activities: [
          '모바일 앱 출시',
          '게이미피케이션 적용',
          '소셜 학습 기능'
        ],
        results: [
          '일일 활성 사용자 85%',
          '학습 지속률 78%'
        ]
      },
      {
        phase: '전국 확산',
        duration: '12주',
        activities: [
          '45개 지점 통합',
          '온오프라인 블렌디드',
          '성과 분석'
        ],
        results: [
          '회원 15만명 활용',
          '회화 실력 3배 향상'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '토익 스피킹 점수',
          before: '평균 110점',
          after: '평균 150점',
          improvement: '36.4% 향상'
        },
        {
          metric: '일일 학습 시간',
          before: '30분',
          after: '85분',
          improvement: '183% 증가'
        },
        {
          metric: '수강 연장률',
          before: '35%',
          after: '72%',
          improvement: '105.7% 향상'
        },
        {
          metric: '회화 자신감',
          before: '2.5/5.0',
          after: '4.2/5.0',
          improvement: '68% 향상'
        }
      ],
      financial: [
        {
          item: '신규 회원 증가',
          amount: '월 5억원'
        },
        {
          item: '운영비 절감',
          amount: '연 35억원'
        },
        {
          item: 'ROI',
          amount: '8개월 내 회수'
        }
      ],
      qualitative: [
        '학습자 만족도 대폭 상승',
        '브랜드 인지도 향상',
        '해외 진출 기반 마련'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'AI 회화 파트너',
          description: '실시간 대화 및 피드백',
          efficiency: '회화 연습 시간 300% 증가'
        },
        {
          name: '발음 자동 교정',
          description: 'AI 음성 분석 및 코칭',
          efficiency: '발음 정확도 85% 개선'
        },
        {
          name: '맞춤 학습 경로',
          description: '개인별 최적 커리큘럼',
          efficiency: '학습 효율 65% 향상'
        }
      ],
      integrations: [
        'Google Speech API',
        'Netflix 콘텐츠',
        'Cambridge 평가 시스템'
      ]
    },
    testimonials: [
      {
        quote: "AI 튜터와 매일 회화 연습을 하니 3개월 만에 외국인과 자유롭게 대화할 수 있게 되었어요. 특히 발음 교정 기능이 정말 도움이 많이 되었습니다.",
        author: "정하나",
        position: "직장인 수강생",
        company: "삼성전자"
      }
    ],
    featured: true,
    implementationPeriod: '8개월',
    teamSize: '35명',
    technologies: ['Whisper AI', 'n8n', 'React Native', 'WebRTC'],
    downloadableResources: [
      '어학원 AI 도입 가이드',
      'AI 회화 시스템 백서'
    ]
  },

  'research-institute': {
    id: 'research-institute',
    category: 'education',
    industry: '교육/연구',
    subIndustry: '연구소',
    companyName: '한국전자통신연구원(ETRI) (직원 2,100명)',
    companySize: '대기업',
    title: 'AI 연구 가속화 플랫폼',
    subtitle: '연구 생산성 85% 향상, 특허 출원 2.5배 증가',
    description: 'AI와 n8n을 활용한 연구 프로세스 혁신으로 R&D 효율을 극대화한 사례',
    icon: Microscope,
    color: 'indigo',
    heroImage: 'https://images.unsplash.com/photo-1523240794102-9ebd0b167f70?w=1200&h=800&fit=crop&crop=center',
    companyInfo: {
      industry: '국책연구소',
      employees: '2,100명',
      revenue: '연 예산 6,800억원',
      location: '대전광역시'
    },
    challenges: [
      {
        title: '연구 데이터 관리',
        description: '방대한 실험 데이터의 체계적 관리 부족',
        impact: '연구 재현성 저하 및 중복 연구'
      },
      {
        title: '문헌 조사 시간',
        description: '최신 연구 동향 파악에 과도한 시간',
        impact: '실제 연구 시간 부족'
      },
      {
        title: '협업 효율성',
        description: '부서간 연구 협업 체계 미흡',
        impact: '시너지 창출 한계'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'R&D AI 기초',
          duration: '12시간',
          description: '연구 분야 AI 활용법'
        },
        {
          title: 'n8n 연구 자동화',
          duration: '16시간',
          description: '연구 워크플로우 자동화'
        }
      ],
      advanced: [
        {
          title: 'AI 문헌 분석',
          duration: '24시간',
          description: '자동 문헌 조사 및 요약'
        },
        {
          title: '실험 데이터 AI',
          duration: '28시간',
          description: 'AI 기반 실험 설계 및 분석'
        }
      ],
      executive: [
        {
          title: 'R&D 혁신 전략',
          duration: '8시간',
          description: 'AI 시대 연구소 경영'
        }
      ]
    },
    process: [
      {
        phase: 'AI 연구 플랫폼 구축',
        duration: '12주',
        activities: [
          'AI 문헌 분석 시스템',
          '실험 데이터 플랫폼',
          '자동 특허 분석'
        ],
        results: [
          '10만 편 논문 분석',
          '실험 데이터 통합 관리'
        ]
      },
      {
        phase: '연구 프로세스 혁신',
        duration: '16주',
        activities: [
          'AI 가설 생성',
          '시뮬레이션 자동화',
          '연구 협업 플랫폼'
        ],
        results: [
          '연구 주기 40% 단축',
          '부서간 협업 200% 증가'
        ]
      },
      {
        phase: '성과 창출',
        duration: '20주',
        activities: [
          '특허 자동 작성',
          '기술 이전 가속화',
          '성과 분석'
        ],
        results: [
          '특허 출원 2.5배',
          '기술료 수입 3배'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '논문 발표',
          before: '연 450편',
          after: '연 832편',
          improvement: '85% 증가'
        },
        {
          metric: '특허 출원',
          before: '연 120건',
          after: '연 300건',
          improvement: '150% 증가'
        },
        {
          metric: '연구 주기',
          before: '평균 18개월',
          after: '평균 11개월',
          improvement: '38.9% 단축'
        },
        {
          metric: '문헌 조사 시간',
          before: '주 15시간',
          after: '주 2시간',
          improvement: '86.7% 절감'
        }
      ],
      financial: [
        {
          item: '기술료 수입',
          amount: '연 450억원'
        },
        {
          item: '연구 효율화 절감',
          amount: '연 180억원'
        },
        {
          item: 'ROI',
          amount: '1.5년 내 회수'
        }
      ],
      qualitative: [
        '세계적 연구 성과 창출',
        '연구원 창의성 향상',
        '국가 기술 경쟁력 강화'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'AI 문헌 큐레이션',
          description: '맞춤형 논문 추천 및 요약',
          efficiency: '조사 시간 87% 절감'
        },
        {
          name: '실험 자동 설계',
          description: 'AI 기반 최적 실험 계획',
          efficiency: '실험 효율 65% 향상'
        },
        {
          name: '특허 자동 분석',
          description: '선행 기술 조사 자동화',
          efficiency: '특허 분석 90% 가속'
        }
      ],
      integrations: [
        'Google Scholar',
        'Patent Database',
        'Lab Equipment IoT'
      ]
    },
    testimonials: [
      {
        quote: "AI 도구 덕분에 문헌 조사와 데이터 분석에 드는 시간이 획기적으로 줄어 실제 연구에 집중할 수 있게 되었습니다. 연구 생산성이 놀랍게 향상되었습니다.",
        author: "이준호",
        position: "책임연구원",
        company: "ETRI"
      }
    ],
    featured: true,
    implementationPeriod: '12개월',
    teamSize: '55명',
    technologies: ['GPT-4', 'n8n', 'Jupyter', 'MongoDB', 'Elasticsearch'],
    downloadableResources: [
      '연구소 AI 도입 백서',
      'R&D 자동화 가이드'
    ]
  },

  'online-education-platform': {
    id: 'online-education-platform',
    category: 'education',
    industry: '교육/연구',
    subIndustry: '온라인교육',
    companyName: '클래스101 (직원 280명)',
    companySize: '중견기업',
    title: '크리에이터 교육 AI 혁신',
    subtitle: '수강 완주율 75% 달성, 크리에이터 수익 3배 증가',
    description: 'AI 콘텐츠 최적화와 n8n 자동화로 온라인 교육의 효과를 극대화한 플랫폼 혁신 사례',
    icon: Library,
    color: 'pink',
    heroImage: 'https://images.unsplash.com/photo-1523240794102-9ebd0b167f70?w=1200&h=800&fit=crop&crop=center',
    companyInfo: {
      industry: '온라인 교육 플랫폼',
      employees: '280명',
      revenue: '연 매출 520억원',
      location: '서울시 강남구'
    },
    challenges: [
      {
        title: '낮은 완주율',
        description: '온라인 강의 특성상 중도 이탈 높음',
        impact: '학습 효과 저하 및 재구매율 감소'
      },
      {
        title: '콘텐츠 품질 편차',
        description: '크리에이터별 강의 품질 차이',
        impact: '플랫폼 신뢰도 저하'
      },
      {
        title: '개인화 부족',
        description: '획일적 콘텐츠로 맞춤 학습 한계',
        impact: '학습자 만족도 정체'
      }
    ],
    curriculum: {
      basic: [
        {
          title: '에듀테크 AI 기초',
          duration: '10시간',
          description: '온라인 교육 AI 활용'
        },
        {
          title: 'n8n 플랫폼 자동화',
          duration: '14시간',
          description: '교육 플랫폼 운영 자동화'
        }
      ],
      advanced: [
        {
          title: 'AI 콘텐츠 큐레이션',
          duration: '20시간',
          description: '맞춤형 콘텐츠 추천 시스템'
        },
        {
          title: '학습 분석 대시보드',
          duration: '18시간',
          description: '데이터 기반 학습 최적화'
        }
      ],
      executive: [
        {
          title: '플랫폼 비즈니스 전략',
          duration: '6시간',
          description: 'AI 기반 교육 플랫폼 경영'
        }
      ]
    },
    process: [
      {
        phase: 'AI 추천 시스템',
        duration: '8주',
        activities: [
          '학습자 프로파일링',
          'AI 콘텐츠 매칭',
          '학습 경로 최적화'
        ],
        results: [
          '개인화 정확도 88%',
          '클릭률 250% 상승'
        ]
      },
      {
        phase: '크리에이터 지원',
        duration: '10주',
        activities: [
          'AI 강의 품질 분석',
          '자동 자막/번역',
          '콘텐츠 최적화 가이드'
        ],
        results: [
          '강의 품질 표준화',
          '글로벌 진출 가능'
        ]
      },
      {
        phase: '학습 경험 혁신',
        duration: '12주',
        activities: [
          'AI 학습 코치',
          '커뮤니티 자동 매칭',
          '성과 인증 시스템'
        ],
        results: [
          '완주율 75% 달성',
          '재구매율 65%'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '수강 완주율',
          before: '23%',
          after: '75%',
          improvement: '226% 향상'
        },
        {
          metric: '월 활성 사용자',
          before: '15만명',
          after: '48만명',
          improvement: '220% 증가'
        },
        {
          metric: '크리에이터 수익',
          before: '월 평균 150만원',
          after: '월 평균 450만원',
          improvement: '200% 증가'
        },
        {
          metric: '강의 만족도',
          before: '3.8/5.0',
          after: '4.6/5.0',
          improvement: '21% 향상'
        }
      ],
      financial: [
        {
          item: '플랫폼 거래액',
          amount: '월 85억원'
        },
        {
          item: '구독 수익',
          amount: '월 32억원'
        },
        {
          item: 'ROI',
          amount: '6개월 내 회수'
        }
      ],
      qualitative: [
        '크리에이터 생태계 활성화',
        '학습 문화 확산',
        '글로벌 시장 진출'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'AI 학습 추천',
          description: '개인 맞춤 강의 큐레이션',
          efficiency: '구매 전환율 180% 상승'
        },
        {
          name: '자동 품질 관리',
          description: 'AI 기반 강의 품질 평가',
          efficiency: '검수 시간 85% 절감'
        },
        {
          name: '커뮤니티 매칭',
          description: '학습자 간 자동 연결',
          efficiency: '참여율 220% 증가'
        }
      ],
      integrations: [
        'YouTube API',
        'Zoom 웨비나',
        'Discord 커뮤니티'
      ]
    },
    testimonials: [
      {
        quote: "AI가 제 수준과 관심사에 맞는 강의를 추천해줘서 학습이 훨씬 재미있어졌어요. 특히 AI 코치가 진도를 관리해줘서 끝까지 완주할 수 있었습니다.",
        author: "김수정",
        position: "디자인 수강생",
        company: "프리랜서"
      }
    ],
    featured: false,
    implementationPeriod: '7개월',
    teamSize: '28명',
    technologies: ['TensorFlow', 'n8n', 'AWS', 'Recommendation Engine'],
    downloadableResources: [
      '온라인 교육 AI 가이드',
      '크리에이터 성공 매뉴얼'
    ]
  },

  'corporate-training': {
    id: 'corporate-training',
    category: 'education',
    industry: '교육/연구',
    subIndustry: '기업교육',
    companyName: '휴넷 (직원 520명)',
    companySize: '중견기업',
    title: '기업 맞춤형 AI 교육 혁신',
    subtitle: '교육 효과 78% 향상, 직무 역량 65% 개선',
    description: 'AI 기반 맞춤형 기업교육으로 임직원 역량을 획기적으로 향상시킨 HRD 혁신 사례',
    icon: Award,
    color: 'yellow',
    heroImage: 'https://images.unsplash.com/photo-1523240794102-9ebd0b167f70?w=1200&h=800&fit=crop&crop=center',
    companyInfo: {
      industry: '기업교육서비스',
      employees: '520명',
      revenue: '연 매출 1,850억원',
      location: '서울시 구로구'
    },
    challenges: [
      {
        title: '획일적 교육 과정',
        description: '직무/직급별 차별화된 교육 부족',
        impact: '교육 투자 대비 성과 미흡'
      },
      {
        title: '교육 성과 측정',
        description: '실질적 역량 향상 측정 어려움',
        impact: 'ROI 입증 곤란'
      },
      {
        title: '현업 적용률',
        description: '학습 내용의 실무 적용 저조',
        impact: '교육 효과 제한'
      }
    ],
    curriculum: {
      basic: [
        {
          title: 'HRD AI 기초',
          duration: '12시간',
          description: '기업교육 AI 활용법'
        },
        {
          title: 'n8n LMS 자동화',
          duration: '14시간',
          description: '학습관리시스템 자동화'
        }
      ],
      advanced: [
        {
          title: '역량 진단 AI',
          duration: '20시간',
          description: 'AI 기반 역량 평가 시스템'
        },
        {
          title: '맞춤형 커리큘럼',
          duration: '24시간',
          description: '개인/조직 맞춤 교육 설계'
        }
      ],
      executive: [
        {
          title: 'HRD 혁신 전략',
          duration: '8시간',
          description: 'AI 시대 인재 개발 전략'
        }
      ]
    },
    process: [
      {
        phase: '역량 진단 체계',
        duration: '6주',
        activities: [
          'AI 역량 평가 모델',
          '스킬 갭 분석',
          '학습 니즈 도출'
        ],
        results: [
          '15,000명 역량 진단',
          '맞춤 교육 경로 수립'
        ]
      },
      {
        phase: 'AI 교육 플랫폼',
        duration: '10주',
        activities: [
          '마이크로러닝 콘텐츠',
          'AI 코칭 시스템',
          '실무 시뮬레이션'
        ],
        results: [
          '일일 학습 참여 85%',
          '현업 적용률 72%'
        ]
      },
      {
        phase: '성과 관리 체계',
        duration: '8주',
        activities: [
          '학습 성과 추적',
          'KPI 연계 분석',
          'ROI 측정'
        ],
        results: [
          '교육 ROI 320%',
          '승진율 45% 향상'
        ]
      }
    ],
    results: {
      quantitative: [
        {
          metric: '직무 역량',
          before: '평균 65점',
          after: '평균 85점',
          improvement: '30.8% 향상'
        },
        {
          metric: '교육 이수율',
          before: '42%',
          after: '91%',
          improvement: '116.7% 증가'
        },
        {
          metric: '현업 적용률',
          before: '25%',
          after: '72%',
          improvement: '188% 향상'
        },
        {
          metric: '교육 만족도',
          before: '3.2/5.0',
          after: '4.5/5.0',
          improvement: '40.6% 향상'
        }
      ],
      financial: [
        {
          item: '생산성 향상 효과',
          amount: '연 280억원'
        },
        {
          item: '교육 비용 절감',
          amount: '연 45억원'
        },
        {
          item: 'ROI',
          amount: '320%'
        }
      ],
      qualitative: [
        '조직 경쟁력 강화',
        '직원 성장 기회 확대',
        'HR 브랜드 가치 상승'
      ]
    },
    automationDetails: {
      workflows: [
        {
          name: 'AI 역량 진단',
          description: '자동 스킬 평가 및 갭 분석',
          efficiency: '진단 시간 90% 절감'
        },
        {
          name: '맞춤 학습 설계',
          description: '개인별 최적 커리큘럼',
          efficiency: '학습 효과 78% 향상'
        },
        {
          name: '성과 자동 추적',
          description: 'KPI 연계 학습 성과 측정',
          efficiency: 'ROI 가시성 100%'
        }
      ],
      integrations: [
        'SAP SuccessFactors',
        'LinkedIn Learning',
        'Microsoft Teams'
      ]
    },
    testimonials: [
      {
        quote: "AI가 제 역량을 정확히 진단하고 필요한 교육을 추천해줘서 단기간에 실력이 크게 향상되었습니다. 덕분에 승진도 할 수 있었어요.",
        author: "박지민",
        position: "마케팅팀 과장",
        company: "LG전자"
      }
    ],
    featured: false,
    implementationPeriod: '6개월',
    teamSize: '32명',
    technologies: ['Claude', 'n8n', 'xAPI', 'Power BI'],
    downloadableResources: [
      '기업교육 AI 도입 가이드',
      'HRD 혁신 백서'
    ]
  }
};

// 교육/연구 업종 요약 리스트 (인덱스 페이지용)
export const educationResearchCases: SuccessCase[] = [
  {
    id: 'university-digital-campus',
    category: 'education',
    industry: '교육/연구',
    subIndustry: '대학교',
    companyName: '연세대학교',
    title: 'AI 기반 스마트 캠퍼스 혁신',
    description: '학습 성과 45% 향상, 행정 효율 70% 개선',
    metrics: {
      efficiency: '+70%',
      productivity: '+55%',
      satisfaction: '+25.7%',
      roi: '285%'
    },
    tags: ['스마트캠퍼스', 'AI튜터', '학습분석', 'EdTech'],
    icon: GraduationCap,
    color: 'blue',
    featured: true
  },
  {
    id: 'k12-personalized-learning',
    category: 'education',
    industry: '교육/연구',
    subIndustry: '초중고교',
    companyName: '서울국제학교',
    title: 'K-12 AI 맞춤형 학습 혁신',
    description: '학업 성취도 52% 향상, 학습 격차 65% 해소',
    metrics: {
      achievement: '+52%',
      gap: '-65%',
      completion: '+38.2%',
      efficiency: '+73.3%'
    },
    tags: ['K-12교육', '맞춤학습', '학습격차해소', 'AI교육'],
    icon: School,
    color: 'green',
    featured: true
  },
  {
    id: 'vocational-training',
    category: 'education',
    industry: '교육/연구',
    subIndustry: '직업교육',
    companyName: '한국폴리텍대학',
    title: '실무 중심 AI 직업교육 혁신',
    description: '취업률 85% 달성, 실무 역량 70% 향상',
    metrics: {
      employment: '85%',
      skills: '+70%',
      duration: '-40%',
      dropout: '-68%'
    },
    tags: ['직업교육', 'VR실습', '산학협력', '취업연계'],
    icon: BookOpen,
    color: 'purple',
    featured: false
  },
  {
    id: 'language-institute',
    category: 'education',
    industry: '교육/연구',
    subIndustry: '어학원',
    companyName: 'YBM 어학원',
    title: 'AI 언어 학습 플랫폼 혁신',
    description: '학습 효율 65% 향상, 회화 실력 3배 증가',
    metrics: {
      efficiency: '+65%',
      speaking: '+300%',
      retention: '+105.7%',
      confidence: '+68%'
    },
    tags: ['어학교육', 'AI회화', '발음교정', '음성인식'],
    icon: Globe,
    color: 'orange',
    featured: true
  },
  {
    id: 'research-institute',
    category: 'education',
    industry: '교육/연구',
    subIndustry: '연구소',
    companyName: '한국전자통신연구원',
    title: 'AI 연구 가속화 플랫폼',
    description: '연구 생산성 85% 향상, 특허 출원 2.5배 증가',
    metrics: {
      productivity: '+85%',
      patents: '+150%',
      cycle: '-38.9%',
      revenue: '+450억'
    },
    tags: ['R&D', '연구자동화', '특허분석', '문헌AI'],
    icon: Microscope,
    color: 'indigo',
    featured: true
  },
  {
    id: 'online-education-platform',
    category: 'education',
    industry: '교육/연구',
    subIndustry: '온라인교육',
    companyName: '클래스101',
    title: '크리에이터 교육 AI 혁신',
    description: '수강 완주율 75% 달성, 크리에이터 수익 3배 증가',
    metrics: {
      completion: '75%',
      users: '+220%',
      revenue: '+200%',
      satisfaction: '+21%'
    },
    tags: ['온라인교육', '크리에이터', '콘텐츠큐레이션', '개인화'],
    icon: Library,
    color: 'pink',
    featured: false
  },
  {
    id: 'corporate-training',
    category: 'education',
    industry: '교육/연구',
    subIndustry: '기업교육',
    companyName: '휴넷',
    title: '기업 맞춤형 AI 교육 혁신',
    description: '교육 효과 78% 향상, 직무 역량 65% 개선',
    metrics: {
      effectiveness: '+78%',
      competency: '+30.8%',
      application: '+188%',
      roi: '320%'
    },
    tags: ['기업교육', 'HRD', '역량진단', '맞춤교육'],
    icon: Award,
    color: 'yellow',
    featured: false
  }
];
