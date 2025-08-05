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

// 부서별 상세 데이터 - CEO 전략 관점 강화
const trackDetails = {
  planning: {
    id: 'planning',
    title: '기획/전략 트랙',
    subtitle: 'CEO 의사결정을 지원하는 AI 기반 전략 수립',
    description: '경영진 의사결정 속도를 10배 향상시키는 AI 전략 기획 시스템',
    target: '기획팀, 전략기획팀, 사업기획팀, 경영기획팀, C-Level 보좌진',
    duration: '초급 8시간 / 중급 12시간 / 고급 16시간',
    color: 'from-blue-600 to-cyan-600',
    bgColor: 'from-blue-50 to-cyan-50',
    icon: Target,
    strategicValue: 'CEO 핵심 관심사: 시장 선점을 위한 신속한 전략 수립과 실행',
    benefits: [
      '경영진 의사결정 속도 10배 향상',
      '시장 기회 발견 및 대응 시간 80% 단축',
      '전략 실행 모니터링 실시간화',
      '경쟁사 대비 전략적 우위 확보'
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
      beginner: {
        title: '초급 과정 - AI 기획 기초',
        duration: '8시간 (1일 집중)',
        level: 'CEO 관심도: ★★☆☆☆ | ROI 기대: 단기 효율성 향상',
        objectives: [
          'AI 도구를 활용한 기본 기획 업무 자동화',
          '경영진 보고서 작성 시간 50% 단축',
          '시장 정보 수집 및 요약 자동화',
          '일상 기획 업무 생산성 2배 향상'
        ],
        modules: [
          {
            title: '모듈 1: CEO가 원하는 보고서 만들기 (2시간)',
            topics: [
              '경영진이 선호하는 보고서 구조 이해',
              'ChatGPT로 임팩트 있는 요약문 작성',
              '핵심 지표 중심의 대시보드형 보고서',
              '실습: 주간 경영 보고서 자동 생성'
            ]
          },
          {
            title: '모듈 2: 시장 정보 자동 수집 (3시간)',
            topics: [
              '경쟁사 동향 모니터링 자동화',
              '업계 뉴스 및 트렌드 요약',
              '고객 피드백 분석 및 인사이트 도출',
              '실습: 일일 시장 브리핑 시스템 구축'
            ]
          },
          {
            title: '모듈 3: 기획 업무 효율화 (3시간)',
            topics: [
              '회의록 자동 정리 및 액션 아이템 추출',
              '프로젝트 진행 현황 자동 업데이트',
              '기획안 초안 자동 생성',
              '실습: 개인별 업무 자동화 설계'
            ]
          }
        ]
      },
      intermediate: {
        title: '중급 과정 - 전략적 AI 활용',
        duration: '12시간 (2일)',
        level: 'CEO 관심도: ★★★★☆ | ROI 기대: 중기 경쟁력 강화',
        objectives: [
          '데이터 기반 전략 수립 시스템 구축',
          '경영진 의사결정 지원 AI 시스템 개발',
          '전사 KPI 모니터링 자동화',
          '시장 예측 및 기회 발굴 시스템'
        ],
        modules: [
          {
            title: '1일차: 데이터 기반 전략 수립',
            topics: [
              'CEO 의사결정을 위한 데이터 분석 자동화',
              '시장 기회 발굴을 위한 AI 분석',
              '경쟁사 전략 분석 및 대응 방안 도출',
              '리스크 분석 및 시나리오 플래닝'
            ]
          },
          {
            title: '2일차: 전략 실행 모니터링',
            topics: [
              '전사 KPI 실시간 모니터링 시스템',
              '전략 실행 성과 자동 분석',
              '이상 징후 조기 경보 시스템',
              '프로젝트: 경영 대시보드 구축'
            ]
          }
        ]
      },
      advanced: {
        title: '고급 과정 - AI 전략 리더십',
        duration: '16시간 (2일)',
        level: 'CEO 관심도: ★★★★★ | ROI 기대: 장기 시장 지배력',
        objectives: [
          'AI 기반 경영 전략 수립 체계 구축',
          '예측적 경영을 위한 AI 시스템 설계',
          '전사 AI 혁신 로드맵 수립',
          'AI 기반 신사업 기회 발굴'
        ],
        modules: [
          {
            title: '1일차: AI 전략 경영',
            topics: [
              'AI 기반 시장 예측 및 기회 발굴',
              '고객 행동 예측을 통한 전략 수립',
              '신사업 아이디어 발굴 및 검증',
              'AI 기반 M&A 타겟 발굴'
            ]
          },
          {
            title: '2일차: 전사 AI 혁신 설계',
            topics: [
              '조직 전체 AI 역량 진단 및 로드맵',
              'AI 기반 조직 혁신 전략',
              '경쟁사 대비 AI 우위 확보 방안',
              '최종 프로젝트: AI 혁신 전략 발표'
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
    subtitle: 'CEO가 주목하는 매출 직결 AI 영업 시스템',
    description: '영업 성과를 3배 향상시키는 CEO 관심 최우선 AI 자동화',
    target: 'B2B/B2C 영업팀, 기술영업팀, 영업기획팀, 영업본부장',
    duration: '초급 8시간 / 중급 12시간 / 고급 16시간',
    color: 'from-green-600 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50',
    icon: TrendingUp,
    strategicValue: 'CEO 핵심 관심사: 매출 증대와 영업 효율성 극대화를 통한 시장 점유율 확대',
    benefits: [
      '영업 성과 3배 향상으로 매출 직접 기여',
      '제안서 작성 시간 70% 단축으로 영업 기회 확대',
      '고객 응대 속도 5배 향상으로 고객 만족도 증진',
      '영업 데이터 분석 자동화로 전략적 의사결정 지원'
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
      beginner: {
        title: '초급 과정 - AI 영업 기초',
        duration: '8시간 (1일 집중)',
        level: 'CEO 관심도: ★★★★☆ | ROI 기대: 즉시 매출 향상',
        objectives: [
          '영업 활동 자동화로 고객 접점 시간 2배 확보',
          '제안서 작성 시간 50% 단축으로 영업 기회 확대',
          '고객 응대 품질 표준화 및 속도 향상',
          '영업 성과 추적 및 분석 자동화'
        ],
        modules: [
          {
            title: '모듈 1: CEO가 원하는 영업 성과 만들기 (2시간)',
            topics: [
              '매출 직결 영업 활동 우선순위 설정',
              'AI로 고객 맞춤형 제안서 자동 생성',
              '성공률 높은 영업 메시지 패턴 학습',
              '실습: 주력 상품 제안서 템플릿 구축'
            ]
          },
          {
            title: '모듈 2: 고객 관리 자동화 (3시간)',
            topics: [
              '고객 정보 수집 및 분석 자동화',
              '방문 일정 및 후속 조치 자동 알림',
              '고객별 맞춤 커뮤니케이션 시스템',
              '실습: 고객 관계 관리 자동화 구축'
            ]
          },
          {
            title: '모듈 3: 영업 성과 관리 (3시간)',
            topics: [
              '영업 활동 데이터 자동 수집',
              '성과 지표 실시간 모니터링',
              '영업 보고서 자동 생성 및 공유',
              '실습: 개인별 영업 대시보드 구축'
            ]
          }
        ]
      },
      intermediate: {
        title: '중급 과정 - 전략적 영업 자동화',
        duration: '12시간 (2일)',
        level: 'CEO 관심도: ★★★★★ | ROI 기대: 영업 조직 혁신',
        objectives: [
          '데이터 기반 영업 전략 수립 시스템',
          '고객 행동 예측을 통한 선제적 영업',
          '영업 파이프라인 최적화 자동화',
          '팀 단위 영업 성과 극대화 시스템'
        ],
        modules: [
          {
            title: '1일차: 데이터 기반 영업 전략',
            topics: [
              '고객 데이터 분석을 통한 영업 기회 발굴',
              '시장 트렌드 분석 및 영업 전략 수립',
              '경쟁사 대비 우위 요소 자동 분석',
              '영업 성과 예측 모델 구축'
            ]
          },
          {
            title: '2일차: 영업 조직 혁신',
            topics: [
              '팀 단위 영업 성과 모니터링',
              '영업 프로세스 표준화 및 자동화',
              '고객 만족도 기반 영업 전략 조정',
              '프로젝트: 영업 혁신 시스템 설계'
            ]
          }
        ]
      },
      advanced: {
        title: '고급 과정 - AI 영업 리더십',
        duration: '16시간 (2일)',
        level: 'CEO 관심도: ★★★★★ | ROI 기대: 시장 지배력 확보',
        objectives: [
          'AI 기반 영업 조직 혁신 체계 구축',
          '예측적 영업을 통한 시장 선점',
          '고객 생애 가치 극대화 시스템',
          '영업 기반 신사업 기회 발굴'
        ],
        modules: [
          {
            title: '1일차: AI 영업 혁신',
            topics: [
              '고객 행동 예측을 통한 선제적 영업',
              '시장 기회 발굴 및 신규 고객 타겟팅',
              '영업 기반 신사업 아이디어 발굴',
              '고객 생애 가치 분석 및 전략 수립'
            ]
          },
          {
            title: '2일차: 영업 조직 리더십',
            topics: [
              '전사 영업 역량 진단 및 개선 로드맵',
              'AI 기반 영업 조직 혁신 전략',
              '경쟁사 대비 영업 우위 확보 방안',
              '최종 프로젝트: 영업 혁신 전략 발표'
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
      beginner: {
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
      intermediate: {
        title: '중급 과정',
        duration: '12시간 (2일)',
        level: 'CEO 관심도: ★★★★☆ | ROI 기대: 중기 경쟁력 강화',
        objectives: [
          '데이터 기반 마케팅 전략 수립',
          '고급 캠페인 자동화 시스템 구축',
          '고객 여정 최적화',
          'ROI 측정 체계 구축'
        ],
        modules: [
          {
            title: '1일차: 고급 마케팅 자동화',
            topics: [
              '멀티채널 캠페인 통합 관리',
              '고객 세그먼테이션 자동화',
              '리타겟팅 캠페인 최적화',
              'A/B 테스트 자동 실행'
            ]
          },
          {
            title: '2일차: 성과 분석 시스템',
            topics: [
              'GA4와 광고 플랫폼 연동',
              '마케팅 ROI 자동 계산',
              '성과 예측 모델 구축',
              '실시간 마케팅 대시보드'
            ]
          }
        ]
      },
      advanced: {
        title: '심화 과정',
        duration: '12시간 (2일)',
        level: 'CEO 관심도: ★★★★★ | ROI 기대: 장기 시장 지배력',
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
      beginner: {
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
      intermediate: {
        title: '중급 과정',
        duration: '12시간 (2일)',
        level: 'CEO 관심도: ★★★★☆ | ROI 기대: 중기 생산성 향상',
        objectives: [
          '생산 데이터 분석 고도화',
          '품질 관리 시스템 자동화',
          '공급망 연동 시스템',
          '생산 예측 모델 구축'
        ],
        modules: [
          {
            title: '1일차: 고급 생산 분석',
            topics: [
              '생산 성과 지표 자동 분석',
              '품질 트렌드 예측 시스템',
              '설비 효율성 모니터링',
              '불량률 예측 모델'
            ]
          },
          {
            title: '2일차: 생산 최적화 시스템',
            topics: [
              '생산 계획 자동 수립',
              '재고 최적화 알고리즘',
              '공급업체 연동 시스템',
              '생산 비용 분석 자동화'
            ]
          }
        ]
      },
      advanced: {
        title: '심화 과정',
        duration: '12시간 (2일)',
        level: 'CEO 관심도: ★★★★★ | ROI 기대: 장기 경쟁력 확보',
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
      beginner: {
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
      intermediate: {
        title: '중급 과정',
        duration: '12시간 (2일)',
        level: 'CEO 관심도: ★★★★☆ | ROI 기대: 중기 고객만족도 향상',
        objectives: [
          '고급 VOC 분석 시스템',
          '고객 감정 분석 자동화',
          '개인화된 응대 시스템',
          '고객 이탈 예방 시스템'
        ],
        modules: [
          {
            title: '1일차: 고급 고객 분석',
            topics: [
              '고객 행동 패턴 분석',
              '감정 분석 기반 응대 전략',
              '고객 만족도 예측 모델',
              'VIP 고객 자동 식별'
            ]
          },
          {
            title: '2일차: 개인화 응대 시스템',
            topics: [
              '고객별 맞춤 응대 시나리오',
              '채널별 응대 전략 수립',
              '응대 품질 자동 평가',
              '고객 여정 분석 자동화'
            ]
          }
        ]
      },
      advanced: {
        title: '심화 과정',
        duration: '12시간 (2일)',
        level: 'CEO 관심도: ★★★★★ | ROI 기대: 장기 고객 로열티 확보',
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
      beginner: {
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
      intermediate: {
        title: '중급 과정',
        duration: '12시간 (2일)',
        level: 'CEO 관심도: ★★★★☆ | ROI 기대: 중기 조직 효율성 향상',
        objectives: [
          '고급 인사 데이터 분석',
          '성과 관리 시스템 자동화',
          '인재 개발 프로그램 최적화',
          '조직 진단 자동화'
        ],
        modules: [
          {
            title: '1일차: 고급 인사 분석',
            topics: [
              '직원 성과 예측 모델',
              '이직률 분석 및 예방',
              '팀 역학 분석 자동화',
              '인재 역량 갭 분석'
            ]
          },
          {
            title: '2일차: 조직 최적화 시스템',
            topics: [
              '조직 구조 최적화 분석',
              '인재 배치 최적화',
              '교육 효과 측정 자동화',
              '직원 경험 개선 시스템'
            ]
          }
        ]
      },
      advanced: {
        title: '심화 과정',
        duration: '12시간 (2일)',
        level: 'CEO 관심도: ★★★★★ | ROI 기대: 장기 인재 경쟁력 확보',
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
      beginner: {
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
      intermediate: {
        title: '중급 과정',
        duration: '12시간 (2일)',
        level: 'CEO 관심도: ★★★★☆ | ROI 기대: 중기 재무 효율성 향상',
        objectives: [
          '고급 재무 분석 자동화',
          '예산 관리 시스템 고도화',
          '재무 예측 모델 구축',
          '비용 최적화 시스템'
        ],
        modules: [
          {
            title: '1일차: 고급 재무 분석',
            topics: [
              '수익성 분석 자동화',
              '현금 흐름 예측 시스템',
              '재무 비율 분석 자동화',
              '투자 효율성 분석'
            ]
          },
          {
            title: '2일차: 재무 최적화 시스템',
            topics: [
              '예산 편성 자동화',
              '비용 절감 기회 발굴',
              '재무 리스크 조기 경보',
              '자금 운용 최적화'
            ]
          }
        ]
      },
      advanced: {
        title: '심화 과정',
        duration: '12시간 (2일)',
        level: 'CEO 관심도: ★★★★★ | ROI 기대: 장기 재무 경쟁력 확보',
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

      {/* CEO 전략적 가치 */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">CEO 전략적 가치</h2>
          <p className="text-xl mb-4 max-w-4xl mx-auto">
            {track.strategicValue}
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 rounded-full">
            <Target className="w-5 h-5" />
            <span className="font-semibold">경영진 의사결정 지원 시스템 구축</span>
          </div>
        </div>
      </section>

      {/* 커리큘럼 상세 - 3단계 */}
      <section id="curriculum" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">3단계 전략적 커리큘럼</h2>
            <p className="text-lg text-gray-600">CEO 관심도와 ROI 기대치에 따른 체계적 교육 과정</p>
          </div>
          
          <Tabs defaultValue="beginner" className="max-w-7xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-auto p-2">
              <TabsTrigger value="beginner" className="text-sm p-4 data-[state=active]:bg-green-500 data-[state=active]:text-white">
                <div className="text-center">
                  <Building2 className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">초급 과정</div>
                  <div className="text-xs">효율성 향상</div>
                </div>
              </TabsTrigger>
              <TabsTrigger value="intermediate" className="text-sm p-4 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                <div className="text-center">
                  <Target className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">중급 과정</div>
                  <div className="text-xs">경쟁력 강화</div>
                </div>
              </TabsTrigger>
              <TabsTrigger value="advanced" className="text-sm p-4 data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                <div className="text-center">
                  <Cpu className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">고급 과정</div>
                  <div className="text-xs">시장 지배력</div>
                </div>
              </TabsTrigger>
            </TabsList>
            
            {/* 초급 과정 */}
            <TabsContent value="beginner">
              <Card className="border-l-4 border-green-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl text-green-700">{track.curriculum.beginner.title}</CardTitle>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {track.curriculum.beginner.duration}
                    </Badge>
                  </div>
                  <CardDescription className="text-lg font-medium text-green-600">
                    {track.curriculum.beginner.level}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-600" />
                      학습 목표
                    </h3>
                    <ul className="space-y-3">
                      {track.curriculum.beginner.objectives.map((objective, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-green-600" />
                      교육 모듈
                    </h3>
                    <div className="space-y-6">
                      {track.curriculum.beginner.modules.map((module, idx) => (
                        <div key={idx} className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                          <h4 className="font-semibold text-green-800 mb-4">{module.title}</h4>
                          <ul className="space-y-3">
                            {module.topics.map((topic, topicIdx) => (
                              <li key={topicIdx} className="flex items-start gap-3 text-gray-700">
                                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{topic}</span>
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

            {/* 중급 과정 */}
            <TabsContent value="intermediate">
              <Card className="border-l-4 border-blue-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl text-blue-700">{track.curriculum.intermediate.title}</CardTitle>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {track.curriculum.intermediate.duration}
                    </Badge>
                  </div>
                  <CardDescription className="text-lg font-medium text-blue-600">
                    {track.curriculum.intermediate.level}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      학습 목표
                    </h3>
                    <ul className="space-y-3">
                      {track.curriculum.intermediate.objectives.map((objective, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      교육 모듈
                    </h3>
                    <div className="space-y-6">
                      {track.curriculum.intermediate.modules.map((module, idx) => (
                        <div key={idx} className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                          <h4 className="font-semibold text-blue-800 mb-4">{module.title}</h4>
                          <ul className="space-y-3">
                            {module.topics.map((topic, topicIdx) => (
                              <li key={topicIdx} className="flex items-start gap-3 text-gray-700">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{topic}</span>
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

            {/* 고급 과정 */}
            <TabsContent value="advanced">
              <Card className="border-l-4 border-purple-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl text-purple-700">{track.curriculum.advanced.title}</CardTitle>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      {track.curriculum.advanced.duration}
                    </Badge>
                  </div>
                  <CardDescription className="text-lg font-medium text-purple-600">
                    {track.curriculum.advanced.level}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-600" />
                      학습 목표
                    </h3>
                    <ul className="space-y-3">
                      {track.curriculum.advanced.objectives.map((objective, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                      교육 모듈
                    </h3>
                    <div className="space-y-6">
                      {track.curriculum.advanced.modules.map((module, idx) => (
                        <div key={idx} className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
                          <h4 className="font-semibold text-purple-800 mb-4">{module.title}</h4>
                          <ul className="space-y-3">
                            {module.topics.map((topic, topicIdx) => (
                              <li key={topicIdx} className="flex items-start gap-3 text-gray-700">
                                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{topic}</span>
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