'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Target, 
  Award, 
  CheckCircle2, 
  BookOpen,
  Zap,
  TrendingUp,
  Brain,
  Sparkles,
  ChevronRight,
  Download,
  Calendar,
  Building2,
  Cpu
} from 'lucide-react';
import { getImagePath } from '@/lib/utils/imagePath';

// 부서별 상세 데이터
const trackDetails = {
  planning: {
    id: 'planning',
    title: '기획/전략 트랙',
    subtitle: '데이터 기반 전략 수립과 보고서 자동화',
    description: '시장 분석부터 전략 보고서까지, AI로 기획 업무를 혁신하세요',
    target: '기획팀, 전략기획팀, 사업기획팀, 경영기획팀',
    duration: '12시간 (입문) / 12시간 (심화)',
    color: 'from-blue-600 to-cyan-600',
    bgColor: 'from-blue-50 to-cyan-50',
    icon: Target,
    benefits: [
      '시장 동향 분석 시간 80% 단축',
      '보고서 작성 속도 3배 향상',
      'KPI 모니터링 자동화로 실시간 의사결정',
      '회의록 정리 시간 90% 절감'
    ],
    realCases: [
      {
        company: 'A사 전략기획팀',
        result: '월간 시장 분석 보고서 작성 시간 5일 → 1일로 단축',
        metric: '80% 시간 절감'
      },
      {
        company: 'B사 사업기획팀',
        result: '주간 KPI 리포트 자동화로 매주 8시간 절약',
        metric: '생산성 3배 향상'
      }
    ],
    curriculum: {
      basic: {
        title: '입문 과정',
        duration: '12시간 (2일)',
        objectives: [
          'ChatGPT를 활용한 기획 문서 작성법 습득',
          'n8n 기본 사용법과 자동화 워크플로 이해',
          '시장 분석 및 보고서 자동화 실습',
          '실무 적용 가능한 템플릿 제작'
        ],
        modules: [
          {
            title: '1일차: AI 기초와 기획 업무 적용',
            topics: [
              'ChatGPT 개념과 기획업무 활용 사례',
              '효과적인 프롬프트 작성법',
              '시장 분석 자동화 실습',
              '보고서 요약 및 인사이트 도출'
            ]
          },
          {
            title: '2일차: n8n 자동화 실습',
            topics: [
              'n8n 기본 구조와 노드 이해',
              '뉴스/트렌드 수집 자동화',
              'KPI 리포트 자동 생성',
              '회의록 요약 및 공유 자동화'
            ]
          }
        ]
      },
      advanced: {
        title: '심화 과정',
        duration: '12시간 (2일)',
        objectives: [
          '복잡한 데이터 분석 자동화 구현',
          'API 연동을 통한 고급 자동화',
          '전사적 리포팅 시스템 구축',
          'AI 기반 의사결정 지원 시스템 설계'
        ],
        modules: [
          {
            title: '1일차: 고급 자동화 기법',
            topics: [
              'ChatGPT API 고급 활용법',
              '복잡한 조건 분기와 데이터 처리',
              '외부 데이터 소스 통합',
              '실시간 대시보드 구축'
            ]
          },
          {
            title: '2일차: 전략적 자동화 시스템',
            topics: [
              'KPI 이상 감지 및 알림 시스템',
              '경쟁사 모니터링 자동화',
              '전략 문서 자동 생성 시스템',
              '팀 프로젝트: 맞춤형 자동화 구축'
            ]
          }
        ]
      }
    },
    tools: [
      { name: 'ChatGPT', usage: '문서 작성, 분석, 요약' },
      { name: 'n8n', usage: '워크플로 자동화' },
      { name: 'Google Sheets', usage: '데이터 관리' },
      { name: 'Slack/Teams', usage: '자동 알림 및 공유' }
    ]
  },
  sales: {
    id: 'sales',
    title: '영업 트랙',
    subtitle: '고객 맞춤형 제안과 영업 활동 자동화',
    description: '영업 성과를 극대화하는 AI 기반 자동화 솔루션',
    target: 'B2B/B2C 영업팀, 기술영업팀, 영업기획팀',
    duration: '12시간 (입문) / 12시간 (심화)',
    color: 'from-green-600 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50',
    icon: TrendingUp,
    benefits: [
      '제안서 작성 시간 70% 단축',
      '고객 응대 속도 5배 향상',
      '영업 리포트 자동화로 주 10시간 절약',
      '고객 맞춤형 커뮤니케이션 강화'
    ],
    realCases: [
      {
        company: 'C사 B2B 영업팀',
        result: '월 평균 제안서 작성 수 20개 → 60개로 증가',
        metric: '영업 기회 3배 증가'
      },
      {
        company: 'D사 기술영업팀',
        result: '고객 문의 응답 시간 24시간 → 2시간으로 단축',
        metric: '고객 만족도 40% 향상'
      }
    ],
    curriculum: {
      basic: {
        title: '입문 과정',
        duration: '12시간 (2일)',
        objectives: [
          'ChatGPT를 활용한 영업 문서 작성',
          '고객 커뮤니케이션 자동화',
          '영업 활동 리포트 자동 생성',
          '실무 템플릿 제작 및 활용'
        ],
        modules: [
          {
            title: '1일차: AI 영업 도구 활용',
            topics: [
              'ChatGPT로 제안서 작성하기',
              '고객 유형별 메시지 자동 생성',
              '경쟁사 분석 자동화',
              '영업 이메일 템플릿 만들기'
            ]
          },
          {
            title: '2일차: 영업 프로세스 자동화',
            topics: [
              'n8n으로 영업 워크플로 구축',
              '방문 일정 리마인더 자동화',
              '영업 실적 리포트 자동 생성',
              '고객 정보 수집 및 분석 자동화'
            ]
          }
        ]
      },
      advanced: {
        title: '심화 과정',
        duration: '12시간 (2일)',
        objectives: [
          'CRM 연동 고급 자동화',
          'AI 기반 영업 예측 시스템',
          '고객 행동 분석 자동화',
          '영업 성과 최적화 시스템 구축'
        ],
        modules: [
          {
            title: '1일차: 데이터 기반 영업 전략',
            topics: [
              'CRM 데이터 연동 및 분석',
              '고객 구매 패턴 예측',
              '맞춤형 제안 자동 생성',
              '영업 KPI 실시간 모니터링'
            ]
          },
          {
            title: '2일차: 영업 최적화 시스템',
            topics: [
              '리드 스코어링 자동화',
              '영업 파이프라인 관리 자동화',
              '고객 이탈 예측 및 대응',
              '팀 프로젝트: 영업 자동화 시스템 구축'
            ]
          }
        ]
      }
    },
    tools: [
      { name: 'ChatGPT', usage: '제안서, 이메일 작성' },
      { name: 'n8n', usage: '영업 프로세스 자동화' },
      { name: 'CRM', usage: '고객 데이터 관리' },
      { name: 'Slack/카카오톡', usage: '실시간 알림' }
    ]
  },
  marketing: {
    id: 'marketing',
    title: '마케팅 트랙',
    subtitle: '데이터 기반 마케팅과 콘텐츠 자동화',
    description: '마케팅 ROI를 극대화하는 AI 자동화 전략',
    target: '디지털마케팅팀, 퍼포먼스마케팅팀, 콘텐츠마케팅팀',
    duration: '12시간 (입문) / 12시간 (심화)',
    color: 'from-purple-600 to-pink-600',
    bgColor: 'from-purple-50 to-pink-50',
    icon: Sparkles,
    benefits: [
      '광고 카피 생성 시간 90% 절감',
      '캠페인 성과 분석 자동화',
      'SNS 콘텐츠 생산성 5배 향상',
      '고객 반응 실시간 모니터링'
    ],
    realCases: [
      {
        company: 'E사 디지털마케팅팀',
        result: '월간 콘텐츠 생산량 50개 → 250개로 증가',
        metric: '콘텐츠 생산성 5배'
      },
      {
        company: 'F사 퍼포먼스마케팅팀',
        result: '광고 최적화 주기 주 1회 → 일 3회로 개선',
        metric: 'ROAS 35% 향상'
      }
    ],
    curriculum: {
      basic: {
        title: '입문 과정',
        duration: '12시간 (2일)',
        objectives: [
          'AI를 활용한 콘텐츠 제작',
          '광고 카피 자동 생성',
          '마케팅 성과 리포트 자동화',
          'SNS 운영 자동화 기초'
        ],
        modules: [
          {
            title: '1일차: AI 마케팅 도구 활용',
            topics: [
              'ChatGPT로 광고 카피 작성',
              '콘텐츠 아이디어 자동 생성',
              'SEO 최적화 콘텐츠 제작',
              '타겟별 메시지 자동화'
            ]
          },
          {
            title: '2일차: 마케팅 자동화 실습',
            topics: [
              'n8n으로 마케팅 워크플로 구축',
              '광고 성과 리포트 자동화',
              'SNS 댓글 수집 및 분석',
              '캠페인 일정 관리 자동화'
            ]
          }
        ]
      },
      advanced: {
        title: '심화 과정',
        duration: '12시간 (2일)',
        objectives: [
          '멀티채널 마케팅 자동화',
          'AI 기반 고객 세분화',
          '예측 분석을 통한 캠페인 최적화',
          '통합 마케팅 대시보드 구축'
        ],
        modules: [
          {
            title: '1일차: 데이터 기반 마케팅',
            topics: [
              'Google/Meta Ads API 연동',
              '고객 행동 데이터 분석',
              'A/B 테스트 자동화',
              '퍼널 분석 및 최적화'
            ]
          },
          {
            title: '2일차: 통합 마케팅 시스템',
            topics: [
              '멀티채널 캠페인 관리',
              '고객 여정 자동화',
              'ROI 예측 모델 구축',
              '팀 프로젝트: 마케팅 자동화 시스템'
            ]
          }
        ]
      }
    },
    tools: [
      { name: 'ChatGPT', usage: '콘텐츠, 카피 생성' },
      { name: 'n8n', usage: '캠페인 자동화' },
      { name: 'Google Analytics', usage: '성과 분석' },
      { name: 'Meta/Google Ads', usage: '광고 관리' }
    ]
  },
  production: {
    id: 'production',
    title: '생산/물류 트랙',
    subtitle: '스마트 팩토리와 공급망 최적화',
    description: '생산 효율성을 극대화하는 AI 자동화 솔루션',
    target: '생산관리팀, SCM팀, 물류관리팀, 품질관리팀',
    duration: '12시간 (입문) / 12시간 (심화)',
    color: 'from-orange-600 to-red-600',
    bgColor: 'from-orange-50 to-red-50',
    icon: Building2,
    benefits: [
      '재고 관리 정확도 95% 달성',
      '생산 일정 최적화로 효율 30% 향상',
      '품질 이슈 조기 발견율 80% 증가',
      '물류 비용 20% 절감'
    ],
    realCases: [
      {
        company: 'G사 생산관리팀',
        result: '재고 부족으로 인한 생산 중단 월 5회 → 0회',
        metric: '생산 가동률 98% 달성'
      },
      {
        company: 'H사 물류팀',
        result: '배송 지연 예측 정확도 60% → 92%로 향상',
        metric: '고객 클레임 70% 감소'
      }
    ],
    curriculum: {
      basic: {
        title: '입문 과정',
        duration: '12시간 (2일)',
        objectives: [
          '생산 데이터 분석 자동화',
          '재고 모니터링 시스템 구축',
          '품질 리포트 자동 생성',
          '물류 추적 자동화'
        ],
        modules: [
          {
            title: '1일차: AI 생산 관리 기초',
            topics: [
              '생산 데이터 분석 with ChatGPT',
              '작업 일지 자동 정리',
              '품질 이슈 요약 및 보고',
              '재고 현황 리포트 작성'
            ]
          },
          {
            title: '2일차: 생산 프로세스 자동화',
            topics: [
              'n8n으로 생산 모니터링',
              '재고 부족 알림 자동화',
              '생산 일정 리마인더',
              '품질 검사 결과 자동 집계'
            ]
          }
        ]
      },
      advanced: {
        title: '심화 과정',
        duration: '12시간 (2일)',
        objectives: [
          'IoT 데이터 연동 자동화',
          '예측 기반 생산 계획',
          '공급망 최적화 시스템',
          '스마트 팩토리 구현'
        ],
        modules: [
          {
            title: '1일차: 데이터 기반 생산 최적화',
            topics: [
              'IoT 센서 데이터 수집 및 분석',
              '수요 예측 모델 구축',
              '생산 스케줄 최적화',
              '품질 예측 및 관리'
            ]
          },
          {
            title: '2일차: 통합 생산 관리 시스템',
            topics: [
              '공급망 실시간 모니터링',
              '이상 감지 및 대응 자동화',
              '생산 KPI 대시보드 구축',
              '팀 프로젝트: 스마트 팩토리 설계'
            ]
          }
        ]
      }
    },
    tools: [
      { name: 'ChatGPT', usage: '데이터 분석, 리포트' },
      { name: 'n8n', usage: '생산 프로세스 자동화' },
      { name: 'Google Sheets', usage: '재고/생산 데이터' },
      { name: 'IoT 플랫폼', usage: '센서 데이터 수집' }
    ]
  },
  cs: {
    id: 'cs',
    title: '고객지원 트랙',
    subtitle: '고객 만족도를 높이는 AI 응대 시스템',
    description: '24/7 고객 지원을 실현하는 AI 자동화 솔루션',
    target: '고객센터, CS팀, VOC팀, 고객경험팀',
    duration: '12시간 (입문) / 12시간 (심화)',
    color: 'from-teal-600 to-blue-600',
    bgColor: 'from-teal-50 to-blue-50',
    icon: Users,
    benefits: [
      '고객 응답 시간 80% 단축',
      '상담사 업무 부담 60% 감소',
      'FAQ 자동 응답률 70% 달성',
      '고객 만족도 25% 향상'
    ],
    realCases: [
      {
        company: 'I사 고객센터',
        result: '일 평균 처리 건수 100건 → 300건으로 증가',
        metric: '상담 효율성 3배'
      },
      {
        company: 'J사 CS팀',
        result: '고객 문의 1차 해결률 45% → 78%로 향상',
        metric: '재문의율 40% 감소'
      }
    ],
    curriculum: {
      basic: {
        title: '입문 과정',
        duration: '12시간 (2일)',
        objectives: [
          'AI 기반 고객 응대 시스템 이해',
          'FAQ 자동 응답 구축',
          'VOC 분석 자동화',
          '고객 응대 품질 관리'
        ],
        modules: [
          {
            title: '1일차: AI 고객 응대 기초',
            topics: [
              'ChatGPT로 응대 메시지 작성',
              '고객 문의 유형 분류',
              'VOC 요약 및 분석',
              '응대 템플릿 자동화'
            ]
          },
          {
            title: '2일차: CS 자동화 실습',
            topics: [
              'n8n으로 응대 프로세스 구축',
              'FAQ 자동 응답 시스템',
              '문의 접수 및 분배 자동화',
              '응대 품질 모니터링'
            ]
          }
        ]
      },
      advanced: {
        title: '심화 과정',
        duration: '12시간 (2일)',
        objectives: [
          '멀티채널 통합 응대 시스템',
          '감정 분석 기반 응대',
          '예측적 고객 지원',
          'AI 챗봇 고도화'
        ],
        modules: [
          {
            title: '1일차: 고급 CS 자동화',
            topics: [
              '멀티채널 문의 통합 관리',
              '고객 감정 분석 및 대응',
              '응대 품질 자동 평가',
              '고객 이탈 예측 및 방지'
            ]
          },
          {
            title: '2일차: 통합 CS 시스템',
            topics: [
              'AI 챗봇 설계 및 구현',
              '지능형 티켓팅 시스템',
              '고객 여정 분석 자동화',
              '팀 프로젝트: CS 자동화 시스템'
            ]
          }
        ]
      }
    },
    tools: [
      { name: 'ChatGPT', usage: '응대 메시지, VOC 분석' },
      { name: 'n8n', usage: 'CS 프로세스 자동화' },
      { name: '채널톡/인터콤', usage: '고객 상담 채널' },
      { name: 'Slack', usage: '내부 협업 및 알림' }
    ]
  },
  hr: {
    id: 'hr',
    title: '인사/총무 트랙',
    subtitle: '스마트한 조직 관리와 인재 운영',
    description: 'HR 업무를 혁신하는 AI 자동화 솔루션',
    target: 'HR팀, 인사팀, 총무팀, 조직문화팀',
    duration: '12시간 (입문) / 12시간 (심화)',
    color: 'from-indigo-600 to-purple-600',
    bgColor: 'from-indigo-50 to-purple-50',
    icon: Users,
    benefits: [
      '채용 프로세스 시간 50% 단축',
      '직원 만족도 조사 분석 자동화',
      '온보딩 프로세스 표준화',
      'HR 행정 업무 70% 자동화'
    ],
    realCases: [
      {
        company: 'K사 HR팀',
        result: '이력서 스크리닝 시간 주 20시간 → 2시간',
        metric: '채용 효율성 10배'
      },
      {
        company: 'L사 인사팀',
        result: '직원 문의 응답 시간 평균 2일 → 2시간',
        metric: '직원 만족도 30% 향상'
      }
    ],
    curriculum: {
      basic: {
        title: '입문 과정',
        duration: '12시간 (2일)',
        objectives: [
          'AI를 활용한 채용 프로세스 개선',
          '직원 데이터 분석 자동화',
          'HR 문서 자동 생성',
          '조직 커뮤니케이션 최적화'
        ],
        modules: [
          {
            title: '1일차: AI HR 도구 활용',
            topics: [
              '이력서 요약 및 분석',
              '채용 공고 자동 작성',
              '직원 만족도 분석',
              'HR 정책 문서 생성'
            ]
          },
          {
            title: '2일차: HR 프로세스 자동화',
            topics: [
              'n8n으로 HR 워크플로 구축',
              '온보딩 프로세스 자동화',
              '휴가/근태 관리 자동화',
              '교육 일정 관리 시스템'
            ]
          }
        ]
      },
      advanced: {
        title: '심화 과정',
        duration: '12시간 (2일)',
        objectives: [
          '예측적 HR 분석 시스템',
          '인재 관리 최적화',
          '조직 문화 진단 자동화',
          '통합 HR 대시보드 구축'
        ],
        modules: [
          {
            title: '1일차: 데이터 기반 HR',
            topics: [
              '이직률 예측 모델 구축',
              '성과 평가 자동화',
              '인재 매칭 알고리즘',
              '조직 네트워크 분석'
            ]
          },
          {
            title: '2일차: 통합 HR 시스템',
            topics: [
              'HR 챗봇 구축',
              '직원 경험 자동화',
              '학습 및 개발 추천 시스템',
              '팀 프로젝트: HR 자동화 플랫폼'
            ]
          }
        ]
      }
    },
    tools: [
      { name: 'ChatGPT', usage: '문서 작성, 데이터 분석' },
      { name: 'n8n', usage: 'HR 프로세스 자동화' },
      { name: 'Google Forms', usage: '설문 및 데이터 수집' },
      { name: 'Notion', usage: 'HR 지식 관리' }
    ]
  },
  finance: {
    id: 'finance',
    title: '재무/회계 트랙',
    subtitle: '정확하고 빠른 재무 관리 자동화',
    description: '재무 업무의 정확성과 효율성을 높이는 AI 솔루션',
    target: '재무팀, 회계팀, 경리팀, 자금팀',
    duration: '12시간 (입문) / 12시간 (심화)',
    color: 'from-gray-600 to-gray-800',
    bgColor: 'from-gray-50 to-gray-100',
    icon: Brain,
    benefits: [
      '재무 리포트 작성 시간 75% 절감',
      '회계 오류율 90% 감소',
      '예산 모니터링 실시간화',
      '재무 분석 정확도 향상'
    ],
    realCases: [
      {
        company: 'M사 재무팀',
        result: '월말 결산 작업 5일 → 1.5일로 단축',
        metric: '업무 효율성 70%'
      },
      {
        company: 'N사 회계팀',
        result: '세금계산서 처리 오류 월 평균 50건 → 5건',
        metric: '정확도 90% 향상'
      }
    ],
    curriculum: {
      basic: {
        title: '입문 과정',
        duration: '12시간 (2일)',
        objectives: [
          'AI를 활용한 재무 데이터 분석',
          '회계 문서 자동 처리',
          '재무 리포트 자동 생성',
          '예산 관리 자동화'
        ],
        modules: [
          {
            title: '1일차: AI 재무 도구 활용',
            topics: [
              '재무 데이터 요약 및 분석',
              '예산 대비 실적 분석',
              '세금계산서 자동 처리',
              '재무 리포트 템플릿 작성'
            ]
          },
          {
            title: '2일차: 재무 프로세스 자동화',
            topics: [
              'n8n으로 재무 워크플로 구축',
              '월간 결산 자동화',
              '비용 정산 프로세스',
              '재무 알림 시스템 구축'
            ]
          }
        ]
      },
      advanced: {
        title: '심화 과정',
        duration: '12시간 (2일)',
        objectives: [
          '예측적 재무 분석',
          '리스크 관리 자동화',
          '통합 재무 관리 시스템',
          'AI 기반 재무 의사결정 지원'
        ],
        modules: [
          {
            title: '1일차: 고급 재무 분석',
            topics: [
              '현금 흐름 예측 모델',
              '재무 리스크 조기 경보',
              '투자 수익률 분석',
              '재무 시뮬레이션'
            ]
          },
          {
            title: '2일차: 통합 재무 시스템',
            topics: [
              'ERP 연동 자동화',
              '실시간 재무 대시보드',
              '감사 대응 자동화',
              '팀 프로젝트: 재무 자동화 시스템'
            ]
          }
        ]
      }
    },
    tools: [
      { name: 'ChatGPT', usage: '재무 분석, 리포트' },
      { name: 'n8n', usage: '재무 프로세스 자동화' },
      { name: 'Excel/Sheets', usage: '재무 데이터 관리' },
      { name: 'ERP 시스템', usage: '통합 재무 관리' }
    ]
  }
};

interface PageProps {
  params: Promise<{
    trackId: string;
  }>;
}

export default async function TrackDetailPage({ params }: PageProps) {
  const { trackId } = await params;
  const track = trackDetails[trackId as keyof typeof trackDetails];
  
  if (!track) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* 히어로 섹션 */}
      <section className={`relative bg-gradient-to-br ${track.color} text-white py-20 overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link 
            href="/services/ai-curriculum" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            교육 프로그램 목록으로
          </Link>
          
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              AI CAMP {track.title}
            </Badge>
            <h1 className="text-5xl font-bold mb-4">{track.subtitle}</h1>
            <p className="text-xl mb-8 text-white/90">{track.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{track.target}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{track.duration}</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/consultation">
                  <BookOpen className="mr-2 h-5 w-5" />
                  교육 상담 신청
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                <Link href="#curriculum">
                  커리큘럼 상세보기
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* 장식 요소 */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </section>

      {/* 교육 효과 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">교육 효과</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {track.benefits.map((benefit, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <CheckCircle2 className={`w-12 h-12 mx-auto mb-4 text-${track.color.split('-')[1]}-600`} />
                  <p className="font-medium">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 실제 사례 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">실제 적용 사례</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {track.realCases.map((case_, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{case_.company}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{case_.result}</p>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${track.bgColor}`}>
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-semibold">{case_.metric}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 커리큘럼 상세 */}
      <section id="curriculum" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">커리큘럼 상세</h2>
          
          <Tabs defaultValue="basic" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="basic" className="text-lg">
                <Building2 className="w-5 h-5 mr-2" />
                입문 과정
              </TabsTrigger>
              <TabsTrigger value="advanced" className="text-lg">
                <Cpu className="w-5 h-5 mr-2" />
                심화 과정
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{track.curriculum.basic.title}</CardTitle>
                  <CardDescription className="text-lg">
                    {track.curriculum.basic.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">학습 목표</h3>
                    <ul className="space-y-2">
                      {track.curriculum.basic.objectives.map((objective, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-4">교육 모듈</h3>
                    <div className="space-y-6">
                      {track.curriculum.basic.modules.map((module, idx) => (
                        <div key={idx} className="border-l-4 border-blue-500 pl-6">
                          <h4 className="font-semibold mb-3">{module.title}</h4>
                          <ul className="space-y-2">
                            {module.topics.map((topic, topicIdx) => (
                              <li key={topicIdx} className="flex items-center gap-2 text-gray-600">
                                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="advanced">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{track.curriculum.advanced.title}</CardTitle>
                  <CardDescription className="text-lg">
                    {track.curriculum.advanced.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">학습 목표</h3>
                    <ul className="space-y-2">
                      {track.curriculum.advanced.objectives.map((objective, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-4">교육 모듈</h3>
                    <div className="space-y-6">
                      {track.curriculum.advanced.modules.map((module, idx) => (
                        <div key={idx} className="border-l-4 border-purple-500 pl-6">
                          <h4 className="font-semibold mb-3">{module.title}</h4>
                          <ul className="space-y-2">
                            {module.topics.map((topic, topicIdx) => (
                              <li key={topicIdx} className="flex items-center gap-2 text-gray-600">
                                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* 사용 도구 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">교육에서 다루는 도구</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {track.tools.map((tool, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${track.bgColor} flex items-center justify-center`}>
                    <Zap className="w-8 h-8 text-gray-700" />
                  </div>
                  <h3 className="font-semibold mb-2">{tool.name}</h3>
                  <p className="text-sm text-gray-600">{tool.usage}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className={`py-20 bg-gradient-to-r ${track.color} text-white`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {track.title} 교육을 시작하세요
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            실무에 즉시 적용 가능한 AI 자동화 역량을 갖추고
            업무 생산성을 혁신적으로 향상시키세요
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/consultation">
                교육 상담 신청
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
              <Link href="/support/downloads">
                <Download className="mr-2 h-5 w-5" />
                상세 커리큘럼 다운로드
              </Link>
            </Button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>맞춤형 일정 조율</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>수료증 발급</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>실습 중심 교육</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}