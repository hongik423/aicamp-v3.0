'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Users,
  CheckCircle,
  Target,
  BarChart3,
  Quote,
  Calendar,
  Building2,
  Award,
  ChevronRight,
  Factory,
  Palette,
  Rocket,
  Shield,
  Globe,
  Package,
  Heart,
  GraduationCap,
  ShoppingCart,
  Briefcase
} from 'lucide-react';

type ParamsPromise = Promise<{ id: string }>;

export default function CaseDetailPage({ params }: { params: ParamsPromise }) {
  const [caseId, setCaseId] = React.useState<string>('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    Promise.resolve(params).then((p) => {
      setCaseId(p.id);
      setLoading(false);
    });
  }, [params]);

  // 성공사례 상세 데이터
  const caseDetails: { [key: string]: any } = {
    'aicamp-curriculum-workshop-n8n': {
      id: 'aicamp-curriculum-workshop-n8n',
      category: 'service',
      industry: '전사적 혁신',
      companyName: '(주)하이임팩트오토메이션',
      title: 'AICAMP 커리큘럼 + 조직 워크숍 + n8n 자동화로 고몰입 조직 구축',
      subtitle: '교육 내재화와 현장 워크숍, n8n으로 업종별 자동화 파이프라인을 구축한 성장 스토리',
      description: 'AICAMP 실무형 커리큘럼을 8주 집중 적용하고, 조직 내 워크숍과 n8n 기반 자동화를 결합해 전사 프로세스를 재설계. 리드타임 72% 단축, 문의→상담 전환 185% 향상, 부서 간 핸드오프 오류 68% 감소를 달성한 사례',
      icon: TrendingUp,
      color: 'indigo',

      companyInfo: {
        industry: 'B2B 솔루션 · 고객지원 · 세일즈 파이프라인',
        employees: '94명',
        revenue: '연매출 220억원',
        location: '서울·수도권',
        channels: '웹사이트, 세미나, 파트너 리셀, 인바운드'
      },

      challenges: [
        { title: '단절된 부서 워크플로우', description: '마케팅-세일즈-CS 간 데이터 단절 및 중복 입력', impact: '핸드오프 오류 및 고객 이탈' },
        { title: '비표준 운영', description: '업무가 개인화되어 표준 운영 절차 부재', impact: '품질 편차·온보딩 지연' },
        { title: '수작업 보고 과다', description: '일·주·월 단위 수기 보고 및 통합 어려움', impact: '관리·의사결정 지연' },
        { title: '낮은 변화 몰입', description: '교육은 받지만 현장 적용과 유지가 어려움', impact: '도입효과 단기 소멸' }
      ],

      process: [
        {
          phase: '1단계: AICAMP 역량 진단 및 몰입 설계',
          duration: '2주',
          activities: [
            '35문항 AI 역량·조직 성숙도 진단',
            '핵심 유즈케이스 캔버스 설계',
            '몰입 지표(참여·적용·성과) 정의',
            '부서별 OKR 및 Quick Win 합의'
          ],
          results: [
            '현 수준 28/100, 변화 준비도 76/100',
            '우선순위: 리드→미팅→제안→계약 파이프라인',
            '몰입 리더 지정 및 KPI 연동'
          ]
        },
        {
          phase: '2단계: 커리큘럼 적용·현장 워크숍',
          duration: '4주',
          activities: [
            'AICAMP 8주 커리큘럼 중 핵심 4모듈 집중 적용',
            '현장 페어프로그래밍·프롬프트 라이브러리 구축',
            '부서별 SOP 템플릿·체크리스트 표준화',
            '리더 주관 주간 레트로스펙티브'
          ],
          results: [
            '표준 SOP 27건 배포',
            '내부 프롬프트 112개 확정',
            '교육 NPS 71점'
          ]
        },
        {
          phase: '3단계: n8n 자동화 파이프라인 구축',
          duration: '6주',
          activities: [
            '인입 리드 라우팅·중복 제거·스코어링 자동화',
            '세미나→리드→CRM→미팅→제안 연동 플로우',
            'Slack/Email 알림·승인·에스컬레이션',
            '데이터 웨어하우스 적재 및 대시보드'
          ],
          results: [
            '문의→상담 전환 185% 향상',
            '핸드오프 오류 68% 감소',
            '리드타임 72% 단축'
          ]
        }
      ],

      results: {
        quantitative: [
          { metric: '리드 처리 리드타임', before: '평균 10일', after: '평균 2.8일', improvement: '72% 단축' },
          { metric: '문의→상담 전환', before: '12%', after: '34%', improvement: '185% 향상' },
          { metric: '부서간 핸드오프 오류', before: '월 25건', after: '월 8건', improvement: '68% 감소' },
          { metric: '보고서 작성 시간', before: '주 9시간', after: '주 1.5시간', improvement: '83% 단축' },
          { metric: '온보딩 기간', before: '8주', after: '3.5주', improvement: '56% 단축' }
        ],
        financial: [
          { category: '매출 기여', amount: '월 +2.4억원', description: '전환 개선·파이프라인 손실 감소 효과' },
          { category: '인건비 절감', amount: '연 1.6억원', description: '반복 업무 자동화·보고 자동화' },
          { category: '세미나 ROI', amount: '리드당 비용 41% 절감', description: '스코어링·후속 액션 자동화' }
        ],
        qualitative: [
          { aspect: '조직 몰입도', score: '93%', description: '자발적 개선 제안·학습 문화 정착' },
          { aspect: '데이터 기반 운영', improvement: '실시간 KPI 대시보드', description: '감에 의존하던 운영에서 지표 기반 의사결정' },
          { aspect: '지식 내재화', achievement: '프롬프트·SOP 자산화', description: '인력 변동에도 품질 유지' }
        ]
      },

      testimonial: {
        name: '이가영 COE 리드',
        position: '고객경험혁신 책임자',
        quote: '교육만으로는 바뀌지 않습니다. 현장 워크숍과 자동화를 동시에 설계했기에 성과가 지속됩니다.',
        additionalQuote: '특히 n8n 플로우와 SOP가 결합되니 신규 입사자도 2주만에 동일 품질로 운영할 수 있게 되었습니다.',
        photo: 'https://picsum.photos/seed/aicamp-testimonial/256/256'
      },

      followUpResults: [
        { metric: '자동화 시나리오', achievement: '34건 운영 (월 2건 추가 구축)' },
        { metric: '직원 제안', achievement: '월 18건 개선안 등록' },
        { metric: '재교육', achievement: '분기 1회 핵심모듈 리프레시' }
      ],

      applicability: {
        similarIndustries: ['B2B SaaS', 'SI/SM', '전문서비스', '교육/세미나 기반 리드 운영 조직'],
        successFactors: [
          '교육-현장-자동화 3요소 동시 설계',
          'Quick Win 중심의 몰입 설계',
          '표준 SOP와 KPI 대시보드 병행'
        ]
      },

      tags: ['조직문화', '교육 내재화', '워크숍', 'n8n', 'CRM', '자동화']
    },

    'logistics-ai-automation': {
      id: 'logistics-ai-automation',
      category: 'logistics',
      industry: '물류유통',
      companyName: '(주)스마트로지스틱스',
      title: 'AI 물류 최적화로 배송비 34% 절감',
      subtitle: '경로 최적화 AI와 재고 예측으로 배송 효율성을 극대화한 혁신 사례',
      description: '물류 중심지 5곳을 운영하는 종합물류업체가 AI 기반 경로 최적화와 수요 예측을 도입하여 배송 시간 52% 단축, 운영비 34% 절감을 달성한 사례',
      icon: Package,
      color: 'amber',

      companyInfo: {
        industry: '종합물류 · 택배 · 창고관리',
        employees: '156명',
        revenue: '연매출 380억원',
        location: '전국 5개 물류센터',
        vehicles: '배송차량 89대'
      },

      challenges: [
        { title: '비효율적 배송 경로', description: '수작업 배송 계획으로 연료비 과다 및 배송 지연', impact: '고객 불만 증가' },
        { title: '재고 예측 한계', description: '과거 경험에 의존한 재고 관리로 과재고/품절 반복', impact: '창고비용 증가' },
        { title: '실시간 추적 부족', description: '배송 현황 파악 어려움으로 고객 문의 폭증', impact: 'CS 업무 과부하' },
        { title: '계절성 대응 미흡', description: '성수기/비수기 수요 변동에 대한 유연한 대응 부족', impact: '기회비용 손실' }
      ],

      process: [
        {
          phase: '1단계: AI 물류 진단 및 설계',
          duration: '3주',
          activities: [
            '배송 데이터 분석 및 패턴 도출',
            'AI 경로 최적화 알고리즘 설계',
            '수요 예측 모델 구축',
            '실시간 추적 시스템 설계'
          ],
          results: [
            '비효율 경로 73% 식별',
            '수요 예측 정확도 87% 달성',
            'API 연동 시스템 구축'
          ]
        },
        {
          phase: '2단계: AI 시스템 도입 및 통합',
          duration: '6주',
          activities: [
            '구글맵 API 기반 경로 최적화',
            '머신러닝 수요 예측 모델 적용',
            '실시간 GPS 추적 시스템',
            '모바일 앱 배송기사 도구'
          ],
          results: [
            '배송 시간 52% 단축',
            '연료비 38% 절감',
            '고객 만족도 96% 달성'
          ]
        },
        {
          phase: '3단계: 고도화 및 확산',
          duration: '4주',
          activities: [
            'IoT 센서 기반 차량 관리',
            '예측 정비 시스템 도입',
            '고객 알림 자동화',
            '데이터 기반 의사결정 체계'
          ],
          results: [
            '차량 고장률 67% 감소',
            '정시 배송률 98% 달성',
            '운영 효율성 종합 74% 향상'
          ]
        }
      ],

      results: {
        quantitative: [
          { metric: '배송 시간', before: '평균 3일', after: '평균 1.4일', improvement: '52% 단축' },
          { metric: '연료비', before: '월 2,800만원', after: '월 1,740만원', improvement: '38% 절감' },
          { metric: '재고 회전율', before: '월 2.3회', after: '월 4.1회', improvement: '78% 향상' },
          { metric: '배송 정확도', before: '91%', after: '98%', improvement: '7%p 향상' }
        ],
        financial: [
          { category: '운송비 절감', amount: '연 12.7억원', description: '연료비 및 인건비 최적화' },
          { category: '재고비용 절감', amount: '연 4.2억원', description: '적정 재고 유지' },
          { category: '고객 확보', amount: '신규 고객 34% 증가', description: '서비스 품질 향상 효과' }
        ],
        qualitative: [
          { aspect: '고객 만족도', score: '96%', description: '정시 배송 및 실시간 추적' },
          { aspect: '직원 만족도', score: '89%', description: 'AI 도구로 업무 효율성 증대' },
          { aspect: '환경 기여', achievement: 'CO2 배출 23% 감소', description: '친환경 물류 실현' }
        ]
      },

      testimonial: {
        name: '김물류 운영본부장',
        position: '(주)스마트로지스틱스 운영본부장',
        quote: 'AI 도입 후 완전히 다른 회사가 되었습니다. 배송기사들도 스마트폰으로 최적 경로를 받아보니 스트레스가 줄고 연료비도 크게 절약됐어요.',
        additionalQuote: '특히 재고 예측이 정확해져서 창고 공간도 30% 절약하고, 고객 문의도 절반으로 줄었습니다.',
        photo: 'https://picsum.photos/seed/logistics-testimonial/256/256'
      },

      followUpResults: [
        { metric: 'AI 배송 최적화', achievement: '일일 1,200건 자동 경로 생성' },
        { metric: '예측 정확도', achievement: '수요 예측 정확도 94% 달성' },
        { metric: '확장 적용', achievement: '협력업체 12곳 시스템 도입' }
      ],

      applicability: {
        similarIndustries: ['택배업', '물류센터', '유통업', '배송 서비스'],
        successFactors: [
          'AI 경로 최적화와 수요 예측 동시 적용',
          '실시간 데이터 기반 의사결정',
          '배송기사 친화적 모바일 도구 제공'
        ]
      },

      tags: ['물류', '경로최적화', '재고관리', 'AI예측', '배송', '운송']
    },

    'healthcare-ai-diagnosis': {
      id: 'healthcare-ai-diagnosis',
      category: 'healthcare',
      industry: '의료헬스케어',
      companyName: '(주)스마트헬스케어',
      title: 'AI 진단 보조로 정확도 89% 향상',
      subtitle: '의료 영상 AI 분석으로 진단 정확도와 효율성을 혁신한 성공 사례',
      description: '지역 종합병원이 AI 기반 의료 영상 분석 시스템을 도입하여 진단 시간 67% 단축, 오진율 73% 감소, 환자 만족도 94% 달성한 혁신 사례',
      icon: Heart,
      color: 'pink',

      companyInfo: {
        industry: '종합병원 · 영상의학과 · 건강검진',
        employees: '의료진 89명',
        revenue: '연매출 450억원',
        location: '서울 강남구',
        patients: '일일 환자 800명'
      },

      challenges: [
        { title: '영상 판독 시간 과다', description: 'CT/MRI 영상 수작업 판독으로 대기시간 증가', impact: '환자 불만 및 진료 지연' },
        { title: '의료진 피로도 증가', description: '반복적 영상 분석으로 집중도 저하', impact: '오진 위험성 증가' },
        { title: '응급 상황 대응 한계', description: '야간/휴일 전문의 부족으로 응급 진단 지연', impact: '골든타임 놓침' },
        { title: '판독 품질 편차', description: '의료진 경험에 따른 진단 결과 차이', impact: '진료 품질 불균형' }
      ],

      process: [
        {
          phase: '1단계: AI 진단 시스템 설계',
          duration: '4주',
          activities: [
            '의료 영상 데이터 분석 및 전처리',
            'AI 모델 학습 및 검증',
            '의료진 워크플로우 분석',
            '시스템 통합 설계'
          ],
          results: [
            '진단 정확도 87% 달성',
            '기존 PACS 시스템 연동',
            '의료진 교육 프로그램 완료'
          ]
        },
        {
          phase: '2단계: AI 보조 진단 도입',
          duration: '6주',
          activities: [
            'CT/MRI AI 분석 시스템 적용',
            '응급실 24시간 AI 지원',
            '판독 결과 이중 검증 체계',
            '실시간 알림 시스템'
          ],
          results: [
            '진단 시간 67% 단축',
            '오진율 73% 감소',
            '응급 대응 시간 45% 단축'
          ]
        },
        {
          phase: '3단계: 고도화 및 확장',
          duration: '4주',
          activities: [
            '예측 진단 모델 고도화',
            '다학제 진료 지원 확장',
            '환자 설명 자료 자동 생성',
            '의료 품질 관리 시스템'
          ],
          results: [
            '진단 정확도 94% 달성',
            '환자 만족도 94% 달성',
            '의료진 업무 만족도 91% 향상'
          ]
        }
      ],

      results: {
        quantitative: [
          { metric: '영상 판독 시간', before: '평균 45분', after: '평균 15분', improvement: '67% 단축' },
          { metric: '진단 정확도', before: '82%', after: '94%', improvement: '12%p 향상' },
          { metric: '오진율', before: '11%', after: '3%', improvement: '73% 감소' },
          { metric: '응급 대응', before: '평균 2시간', after: '평균 40분', improvement: '67% 단축' }
        ],
        financial: [
          { category: '의료진 효율성', amount: '연 8.4억원', description: '진단 시간 단축 효과' },
          { category: '의료사고 감소', amount: '연 2.1억원', description: '오진 방지 비용 절감' },
          { category: '환자 증가', amount: '외래 환자 28% 증가', description: '진료 품질 향상 효과' }
        ],
        qualitative: [
          { aspect: '환자 만족도', score: '94%', description: '빠르고 정확한 진단' },
          { aspect: '의료진 만족도', score: '91%', description: 'AI 도구로 업무 부담 경감' },
          { aspect: '의료 품질', achievement: '진료 표준화 달성', description: '일관된 고품질 진료' }
        ]
      },

      testimonial: {
        name: '박의학 영상의학과장',
        position: '(주)스마트헬스케어 영상의학과장',
        quote: 'AI가 의사를 대체하는 것이 아니라 더 나은 의사로 만들어줍니다. 진단 정확도가 높아지고 환자에게 더 많은 시간을 할애할 수 있게 되었어요.',
        additionalQuote: '특히 응급 상황에서 AI가 1차 스크리닝을 해주니 골든타임을 놓치는 일이 크게 줄었습니다.',
        photo: 'https://picsum.photos/seed/healthcare-testimonial/256/256'
      },

      followUpResults: [
        { metric: 'AI 진단 범위', achievement: '12개 질환군으로 확장' },
        { metric: '타 병원 도입', achievement: '협력병원 8곳 시스템 도입' },
        { metric: '연구 성과', achievement: '국제 학회 논문 3편 발표' }
      ],

      applicability: {
        similarIndustries: ['종합병원', '영상의학과', '건강검진센터', '의료영상 클리닉'],
        successFactors: [
          '의료진과 AI의 협업 체계 구축',
          '기존 의료 시스템과의 원활한 통합',
          '지속적인 AI 모델 학습 및 개선'
        ]
      },

      tags: ['의료', 'AI진단', '영상분석', '정확도', '헬스케어', '병원']
    },

    'manufacturing-smart-factory': {
      id: 'manufacturing-smart-factory',
      category: 'manufacturing',
      industry: '제조업',
      companyName: '(주)스마트팩토리솔루션',
      title: 'AI 혁신으로 업무 효율성 69% 향상',
      subtitle: '자동차 부품 제조업체의 디지털 트랜스포메이션 성공 스토리',
      description: '직원 67명 규모의 자동차 부품 제조업체가 AI 도입을 통해 제안서 작성 시간 69% 단축, 품질 데이터 분석 85% 효율화를 달성한 혁신 사례',
      icon: Factory,
      color: 'blue',
      
      // 기업 정보
      companyInfo: {
        industry: '자동차 부품 제조 (스탬핑, 용접)',
        employees: '67명',
        revenue: '연매출 145억원',
        location: '경기도 안산시',
        exportRatio: '40%'
      },
      
      // 도입 전 과제
      challenges: [
        {
          title: '제안서 지옥',
          description: '월 15-20건 제안서 작성으로 핵심 인력 소진',
          impact: '핵심 업무 집중도 저하'
        },
        {
          title: '수작업 데이터 분석',
          description: 'Excel 기반 품질 데이터 분석으로 실시간 대응 한계',
          impact: '품질 이슈 사후 대응'
        },
        {
          title: '다국어 소통 장벽',
          description: '해외 거래처와의 소통에서 번역 비용 및 시간 소요',
          impact: '해외 사업 확장 제약'
        },
        {
          title: '반복 업무 과다',
          description: '보고서, 회의록, 매뉴얼 작성 등 창조적 업무 시간 부족',
          impact: '혁신 역량 저하'
        }
      ],
      
      // AI 도입 프로세스
      process: [
        {
          phase: '1단계: AI 역량 진단',
          duration: '2주',
          activities: [
            'AI 활용 현황 진단 (35개 항목)',
            '디지털 성숙도 평가',
            'AI 적용 기회 발굴',
            '우선순위 설정'
          ],
          results: [
            '현재 AI 활용도: 15점/100점',
            '디지털 성숙도: 40점/100점',
            'AI 학습 준비도: 70점/100점',
            '업무 자동화 가능성: 85점/100점'
          ]
        },
        {
          phase: '2단계: AI 맞춤 전략 설계',
          duration: '3주',
          activities: [
            '기업 맞춤형 AI 도구 선정',
            '단계별 도입 로드맵 설계',
            '교육 프로그램 계획',
            '성과 측정 지표 설정'
          ],
          results: [
            'Claude Pro + 맞춤 프롬프트 템플릿',
            'ChatGPT Advanced Data Analysis',
            'DeepL Pro + Grammarly Business',
            'Zapier + Make.com 자동화'
          ]
        },
        {
          phase: '3단계: AI 실무 적용',
          duration: '16주',
          activities: [
            '핵심 업무 AI 도입 (1-4주)',
            '심화 활용 (5-12주)',
            '조직 전체 확산 (13-16주)',
            '성과 측정 및 개선'
          ],
          results: [
            '제안서 작성 시스템 구축',
            '품질 관리 AI 시스템',
            '다국어 소통 자동화',
            'AI 거버넌스 구축'
          ]
        }
      ],
      
      // 주요 성과
      results: {
        quantitative: [
          { metric: '제안서 작성 시간', before: '1건당 8시간', after: '1건당 2.5시간', improvement: '69% 단축' },
          { metric: '품질 데이터 분석', before: '주 20시간', after: '주 3시간', improvement: '85% 단축' },
          { metric: '고객 문의 응답', before: '평균 4시간', after: '평균 30분', improvement: '87% 단축' },
          { metric: '월 보고서 작성', before: '40시간', after: '8시간', improvement: '80% 단축' },
          { metric: '설계 도면 수정', before: '3일', after: '6시간', improvement: '75% 단축' }
        ],
        financial: [
          { category: '인건비 절감', amount: '1억 2,000만원', description: '업무 시간 단축 효과' },
          { category: '번역 비용 절감', amount: '3,000만원', description: '자동 번역 시스템 도입' },
          { category: '품질 개선', amount: '8,000만원', description: '불량률 감소 및 클레임 방지' },
          { category: '매출 증대', amount: '3억 5,000만원', description: '수주율 향상 및 신속 대응' }
        ],
        qualitative: [
          { aspect: '직원 만족도', score: '92%', description: '업무 스트레스 감소' },
          { aspect: '학습 문화', improvement: 'AI 자율 학습 시간 월 10시간 증가', description: '지속적 역량 개발' },
          { aspect: '혁신 마인드', improvement: '신기술 수용성 85% 향상', description: '변화에 대한 긍정적 태도' },
          { aspect: '경쟁 우위', achievement: '동종 업계 대비 기술 선도 지위 확보', description: '시장에서의 차별화' }
        ]
      },
      
      // 고객 인터뷰
      testimonial: {
        name: '김철수 대표이사',
        position: '(주)스마트팩토리솔루션 대표',
        quote: 'AI 도입 전후가 완전히 다른 회사가 되었습니다. 솔직히 처음엔 우리 같은 제조업에 AI가 무슨 소용이냐고 생각했어요. 하지만 Business Model Zen 방식으로 단계적으로 접근하니까 직원들도 자연스럽게 받아들이더라고요. 가장 놀라운 건 제안서 작성이에요. 예전엔 직원들이 밤새워 만들던 것을 이제 2-3시간이면 끝나거든요. 그것도 품질이 훨씬 좋아졌어요.',
        additionalQuote: '무엇보다 직원들이 창조적인 일에 집중할 수 있게 된 게 가장 큰 성과입니다. 반복 업무는 AI가 하고, 사람은 정말 중요한 판단과 혁신에 집중하니까 회사 전체 분위기가 달라졌어요.',
        photo: '/images/testimonial-kim.jpg'
      },
      
      // 6개월 후 추가 성과
      followUpResults: [
        { metric: '신규 AI 도구 도입', achievement: '8개 (처음 5개 → 13개)' },
        { metric: '전 직원 AI 활용률', achievement: '95% (월 20시간 이상 활용)' },
        { metric: 'AI 제안 건수', achievement: '직원 주도 개선 제안 월 15건' },
        { metric: '타 기업 벤치마킹', achievement: '동종 업계 5개사 견학 및 자문' },
        { metric: '신규 거래처', achievement: '7개사 (AI 기반 빠른 대응력 인정)' },
        { metric: '해외 수출 증가', achievement: '40% → 65% (다국어 소통 자동화 효과)' }
      ],
      
      // 적용 가능성
      applicability: {
        similarIndustries: ['정밀 가공업', '플라스틱 제조업', '금속 가공업'],
        successFactors: [
          '경영진의 강력한 의지: CEO 주도의 AI 도입 추진',
          '단계적 접근: 한 번에 모든 것을 바꾸지 않고 점진적 확산',
          '직원 참여: 강요가 아닌 자발적 학습 문화 조성',
          '지속적 지원: 도입 후 6개월간 전문가 사후관리'
        ]
      },
      
      tags: ['제조업', 'AI 도입', '업무 자동화', '품질 관리', '제안서 작성', '다국어 소통']
    },
    
    'creative-marketing': {
      id: 'creative-marketing',
      category: 'service',
      industry: '서비스업',
      companyName: '(주)크리에이티브마케팅',
      title: '창작 업무 AI 혁신으로 생산성 300% 증대',
      subtitle: '디자인 에이전시의 AI 기반 창작 혁신 성공 스토리',
      description: '직원 28명 규모의 종합 광고 대행사가 AI 창작 도구를 활용하여 디자인 시안 생성 83% 시간 단축, 영상 편집 86% 효율화를 통해 매출 61% 성장을 달성한 혁신 사례',
      icon: Palette,
      color: 'purple',
      
      companyInfo: {
        industry: '종합 광고 대행 및 브랜딩',
        employees: '28명',
        revenue: '연매출 42억원 → 68억원',
        specialty: 'B2B 마케팅 전문, 중소기업 고객 80%',
        services: '브랜딩, 디자인, 영상 제작, 웹사이트'
      },
      
      challenges: [
        {
          title: '아이디어 고갈',
          description: '비슷한 컨셉의 반복으로 창의성 한계',
          impact: '클라이언트 만족도 저하'
        },
        {
          title: '시간 부족',
          description: '기획-디자인-제작 과정의 긴 리드타임',
          impact: '프로젝트 처리량 제한'
        },
        {
          title: '인력 의존',
          description: '핵심 디자이너 1-2명에 과도한 업무 집중',
          impact: '병목 현상 및 품질 불안정'
        },
        {
          title: '클라이언트 요구 증가',
          description: '더 빠르고 다양한 시안 요구 증가',
          impact: '업무 과부하 및 스트레스'
        }
      ],
      
      process: [
        {
          phase: '1단계: 창작 역량 AI 진단',
          duration: '2주',
          activities: [
            '창작 업무 AI 적용 가능성 분석',
            '현재 워크플로우 분석',
            'AI 도구 매칭 및 선정',
            '교육 계획 수립'
          ],
          results: [
            'GPT-4 브레인스토밍 활용',
            'Midjourney, DALL-E 시안 생성',
            'Claude 카피라이팅',
            'RunwayML 영상 편집'
          ]
        },
        {
          phase: '2단계: AI 창작 도구 맞춤 설계',
          duration: '3주',
          activities: [
            '창작 프로세스별 AI 도구 매칭',
            '워크플로우 재설계',
            '품질 관리 시스템 구축',
            '팀별 역할 재정의'
          ],
          results: [
            'ChatGPT-4 + Claude 전략 수립',
            'Midjourney + Adobe Firefly 비주얼',
            'Canva AI + Figma AI 실무 제작',
            'Gamma + Beautiful.AI 프레젠테이션'
          ]
        },
        {
          phase: '3단계: AI 창작 워크플로우 구축',
          duration: '12주',
          activities: [
            'AI 기반 캠페인 기획 프로세스',
            '실제 프로젝트 적용',
            '품질 검증 및 개선',
            '팀 역량 강화'
          ],
          results: [
            'B2B SaaS 브랜딩 10일 완성',
            '시안 생성 속도 566% 증가',
            '클라이언트 만족도 96% 달성',
            '전 직원 AI 크리에이터 육성'
          ]
        }
      ],
      
      results: {
        quantitative: [
          { metric: '카피라이팅', before: '1건당 4시간', after: '1건당 45분', improvement: '81% 시간 단축' },
          { metric: '디자인 시안', before: '3일 평균', after: '4시간 평균', improvement: '83% 시간 단축' },
          { metric: '영상 편집', before: '1주일', after: '1일', improvement: '86% 시간 단축' },
          { metric: '마케팅 전략', before: '2주 리서치', after: '3일 분석', improvement: '78% 시간 단축' },
          { metric: '프로젝트 완료', before: '평균 4주', after: '1.5주', improvement: '62% 단축' }
        ],
        financial: [
          { category: '프로젝트 처리량', amount: '월 8건 → 18건', description: '125% 증가' },
          { category: '직원당 생산성', amount: '개인별 150% 향상', description: 'AI 도구 활용 효과' },
          { category: '신규 고객 확보', amount: '30% 증가', description: '빠른 대응력으로 경쟁 우위' },
          { category: '매출 성장', amount: '연 42억 → 68억', description: '61% 성장' }
        ],
        qualitative: [
          { aspect: '창의성 확장', improvement: '아이디어 다양성 300% 증가', description: 'AI 협업으로 새로운 트렌드 창조' },
          { aspect: '글로벌 감각', improvement: '해외 트렌드 실시간 반영', description: '국제적 수준의 크리에이티브' },
          { aspect: '개인화 서비스', improvement: '클라이언트별 맞춤형 제공', description: '차별화된 서비스 품질' },
          { aspect: '하이브리드 창작', achievement: '인간의 감성 + AI의 논리적 분석', description: '새로운 창작 패러다임' }
        ]
      },
      
      testimonial: {
        name: '박지영 크리에이티브 디렉터',
        position: '(주)크리에이티브마케팅 CD',
        quote: 'AI가 제 창작 능력을 10배 증폭시켜줬어요. 처음엔 AI가 내 일자리를 뺏는 건 아닐까 걱정했어요. 하지만 실제로 써보니 완전히 달랐어요. AI는 저를 대체하는 게 아니라 제 창의력을 엄청나게 증폭시켜주는 파트너더라고요.',
        additionalQuote: '예전엔 아이디어 하나 떠올리려고 며칠을 고민했는데, 이제는 AI와 브레인스토밍하면서 한 시간에 20-30개 아이디어를 만들어내요. 그 중에 정말 기가 막힌 아이디어들이 나오거든요. 무엇보다 클라이언트들이 놀라워해요.',
        photo: '/images/testimonial-park.jpg'
      },
      
      followUpResults: [
        { metric: 'Midjourney 활용', achievement: '로고 디자인 3일 → 3시간' },
        { metric: 'ChatGPT 카피라이팅', achievement: '슬로건 개발 2주 → 2시간' },
        { metric: 'RunwayML 영상제작', achievement: '홍보 영상 1주일 → 1일' },
        { metric: '시안 다양성', achievement: '기존 5개 → 현재 50개' },
        { metric: '클라이언트 만족도', achievement: '디자인 수정 요청 70% 감소' },
        { metric: '제작 비용', achievement: '영상 제작비 70% 절감' }
      ],
      
      applicability: {
        similarIndustries: ['광고 대행사', '브랜딩 에이전시', '콘텐츠 제작사', '디자인 스튜디오'],
        successFactors: [
          'AI 크리에이터 양성: 전 직원 AI 도구 전문가로 육성',
          '하이브리드 창작: 인간의 감성 + AI의 논리적 분석',
          '지속 학습: 매주 새로운 AI 도구 테스트 및 도입',
          '창작 자동화: 반복 업무는 AI, 핵심 결정은 인간'
        ]
      },
      
      tags: ['서비스업', 'AI 창작', '디자인', '마케팅', '브랜딩', '콘텐츠 제작']
    },

    'education-ai-platform': {
      id: 'education-ai-platform',
      category: 'education',
      industry: '교육에듀테크',
      companyName: '(주)스마트에듀케이션',
      title: '개인화 AI 학습으로 성취도 156% 향상',
      subtitle: '학습자 맞춤형 AI 커리큘럼으로 교육 혁신을 달성한 성공 사례',
      description: '온라인 교육 플랫폼이 AI 기반 개인화 학습 시스템을 도입하여 학습 완주율 78% 증가, 학습 효율성 43% 향상, 학습자 만족도 92% 달성한 혁신 사례',
      icon: GraduationCap,
      color: 'teal',

      companyInfo: {
        industry: '온라인 교육 · 에듀테크 · 기업교육',
        employees: '67명',
        revenue: '연매출 125억원',
        location: '서울 강남구',
        students: '누적 학습자 45,000명'
      },

      challenges: [
        { title: '획일적 교육과정', description: '모든 학습자에게 동일한 커리큘럼 제공으로 학습 효과 한계', impact: '중도 포기율 증가' },
        { title: '학습 동기 부족', description: '개별 진도 파악 어려움으로 맞춤형 피드백 제공 한계', impact: '학습 지속률 저하' },
        { title: '평가 시스템 한계', description: '정형화된 평가로 실제 역량 측정의 어려움', impact: '학습 성과 저조' },
        { title: '강사 업무 과부하', description: '대량 학습자 관리로 개별 케어 부족', impact: '교육 품질 저하' }
      ],

      process: [
        {
          phase: '1단계: AI 학습 분석 시스템 구축',
          duration: '4주',
          activities: [
            '학습자 데이터 분석 및 패턴 도출',
            'AI 추천 알고리즘 설계',
            '개인화 커리큘럼 엔진 개발',
            '학습 성과 예측 모델 구축'
          ],
          results: [
            '학습 패턴 87% 정확도로 분석',
            '맞춤형 콘텐츠 추천 시스템',
            '실시간 학습 진도 추적'
          ]
        },
        {
          phase: '2단계: 개인화 학습 플랫폼 적용',
          duration: '6주',
          activities: [
            'AI 기반 적응형 학습 경로 제공',
            '실시간 난이도 조절 시스템',
            '개인별 약점 분석 및 보완',
            '게이미피케이션 요소 도입'
          ],
          results: [
            '학습 완주율 78% 증가',
            '학습 시간 43% 효율화',
            '학습자 참여도 89% 향상'
          ]
        },
        {
          phase: '3단계: 고도화 및 확장',
          duration: '4주',
          activities: [
            '멀티모달 학습 콘텐츠 지원',
            'AI 튜터 챗봇 도입',
            '협업 학습 플랫폼 구축',
            '성과 분석 대시보드 개발'
          ],
          results: [
            '학습 만족도 92% 달성',
            '강사 업무 효율성 67% 향상',
            'B2B 기업교육 시장 진출'
          ]
        }
      ],

      results: {
        quantitative: [
          { metric: '학습 완주율', before: '34%', after: '61%', improvement: '78% 증가' },
          { metric: '학습 시간', before: '평균 8시간', after: '평균 4.6시간', improvement: '43% 단축' },
          { metric: '평가 점수', before: '평균 72점', after: '평균 89점', improvement: '24% 향상' },
          { metric: '재수강률', before: '12%', after: '3%', improvement: '75% 감소' }
        ],
        financial: [
          { category: '매출 증가', amount: '연 47억원 → 89억원', description: '학습자 증가 및 기업 교육 확장' },
          { category: '운영 효율성', amount: '강사당 관리 학습자 3배 증가', description: 'AI 자동화로 생산성 향상' },
          { category: '고객 확보', amount: '신규 기업 고객 156% 증가', description: '개인화 교육 효과 입증' }
        ],
        qualitative: [
          { aspect: '학습자 만족도', score: '92%', description: '맞춤형 학습 경험' },
          { aspect: '강사 만족도', score: '88%', description: 'AI 도구로 교육 품질 향상' },
          { aspect: '브랜드 인지도', achievement: '에듀테크 혁신 기업 선정', description: '업계 리더십 확보' }
        ]
      },

      testimonial: {
        name: '정교육 학습설계팀장',
        position: '(주)스마트에듀케이션 학습설계팀장',
        quote: 'AI가 각 학습자의 속도와 스타일을 파악해서 최적의 학습 경로를 제시해주니 학습 효과가 극대화되었습니다.',
        additionalQuote: '특히 약점 분석과 맞춤형 피드백으로 학습자들이 포기하지 않고 끝까지 완주하는 비율이 크게 늘었어요.',
        photo: 'https://picsum.photos/seed/education-testimonial/256/256'
      },

      followUpResults: [
        { metric: 'AI 콘텐츠 생성', achievement: '맞춤형 학습 콘텐츠 자동 생성' },
        { metric: '글로벌 확장', achievement: '동남아 3개국 진출' },
        { metric: '특허 출원', achievement: 'AI 학습 알고리즘 특허 2건' }
      ],

      applicability: {
        similarIndustries: ['온라인 교육', '기업 교육', '어학원', '직업 훈련소'],
        successFactors: [
          '학습자 데이터 기반 개인화',
          'AI와 인간 강사의 효과적 협업',
          '지속적인 학습 동기 부여 시스템'
        ]
      },

      tags: ['교육', '개인화학습', 'AI커리큘럼', '에듀테크', '온라인교육', '학습분석']
    },

    'ecommerce-ai-recommendation': {
      id: 'ecommerce-ai-recommendation',
      category: 'ecommerce',
      industry: '이커머스',
      companyName: '(주)스마트커머스',
      title: 'AI 추천 시스템으로 매출 267% 증가',
      subtitle: '개인화 상품 추천과 가격 최적화로 이커머스 혁신을 달성한 성공 사례',
      description: '중견 이커머스 플랫폼이 AI 기반 개인화 추천 시스템과 동적 가격 책정을 도입하여 전환율 145% 향상, 고객 재구매율 89% 증가, 매출 267% 성장을 달성한 혁신 사례',
      icon: ShoppingCart,
      color: 'violet',

      companyInfo: {
        industry: '온라인 쇼핑몰 · 패션 · 라이프스타일',
        employees: '123명',
        revenue: '연매출 340억원 → 912억원',
        location: '서울 성수동',
        products: '등록 상품 45만개'
      },

      challenges: [
        { title: '낮은 전환율', description: '방문자 대비 구매 전환율 2.1%로 업계 평균 이하', impact: '매출 성장 정체' },
        { title: '재구매율 저조', description: '일회성 구매 고객이 대부분으로 고객 생애가치 낮음', impact: '마케팅 비용 과다' },
        { title: '재고 관리 비효율', description: '수요 예측 부정확으로 과재고/품절 반복', impact: '기회비용 손실' },
        { title: '개인화 부족', description: '모든 고객에게 동일한 상품 노출', impact: '고객 만족도 저하' }
      ],

      process: [
        {
          phase: '1단계: AI 추천 시스템 구축',
          duration: '5주',
          activities: [
            '고객 행동 데이터 분석',
            '협업 필터링 알고리즘 개발',
            '상품 유사도 분석 모델',
            'A/B 테스트 프레임워크 구축'
          ],
          results: [
            '고객 세그먼트 27개 그룹 분류',
            '상품 추천 정확도 84% 달성',
            '실시간 개인화 추천 시스템'
          ]
        },
        {
          phase: '2단계: 동적 가격 최적화 도입',
          duration: '4주',
          activities: [
            '가격 탄력성 분석',
            '경쟁사 가격 모니터링 자동화',
            '수요 예측 기반 가격 조정',
            '프로모션 최적화 알고리즘'
          ],
          results: [
            '매출 45% 증가',
            '재고 회전율 78% 향상',
            '가격 경쟁력 확보'
          ]
        },
        {
          phase: '3단계: 옴니채널 통합 및 확장',
          duration: '6주',
          activities: [
            '모바일 앱 개인화 강화',
            '이메일/SMS 마케팅 자동화',
            '소셜커머스 연동 확대',
            '고객 여정 분석 고도화'
          ],
          results: [
            '전환율 145% 향상',
            '재구매율 89% 증가',
            '고객 만족도 94% 달성'
          ]
        }
      ],

      results: {
        quantitative: [
          { metric: '전환율', before: '2.1%', after: '5.2%', improvement: '145% 향상' },
          { metric: '재구매율', before: '18%', after: '34%', improvement: '89% 증가' },
          { metric: '객단가', before: '47,000원', after: '73,000원', improvement: '55% 증가' },
          { metric: '재고 회전율', before: '월 1.8회', after: '월 3.2회', improvement: '78% 향상' }
        ],
        financial: [
          { category: '매출 증가', amount: '연 340억 → 912억원', description: '267% 성장 달성' },
          { category: '마케팅 효율성', amount: 'CAC 34% 절감', description: '타겟팅 정확도 향상' },
          { category: '재고 최적화', amount: '연 12억원 절감', description: '과재고 방지 및 품절 최소화' }
        ],
        qualitative: [
          { aspect: '고객 만족도', score: '94%', description: '개인화된 쇼핑 경험' },
          { aspect: '브랜드 충성도', improvement: 'NPS 67점 달성', description: '고객 추천 의향 증가' },
          { aspect: '시장 지위', achievement: '카테고리 점유율 3위 달성', description: '업계 선도 기업으로 성장' }
        ]
      },

      testimonial: {
        name: '김커머스 마케팅본부장',
        position: '(주)스마트커머스 마케팅본부장',
        quote: 'AI 추천 시스템 도입 후 고객들이 정말 원하는 상품을 정확히 찾아주니 구매율이 급격히 올랐습니다.',
        additionalQuote: '특히 재구매 고객이 크게 늘어났고, 고객 한 분당 매출도 55% 증가했어요. 마케팅 비용은 줄고 효과는 배가 되었습니다.',
        photo: 'https://picsum.photos/seed/ecommerce-testimonial/256/256'
      },

      followUpResults: [
        { metric: 'AI 상품 기획', achievement: '트렌드 분석 기반 상품 기획' },
        { metric: '글로벌 진출', achievement: '베트남 시장 진출 성공' },
        { metric: '기술 특허', achievement: '추천 알고리즘 특허 3건 등록' }
      ],

      applicability: {
        similarIndustries: ['온라인 쇼핑몰', '패션 커머스', '라이프스타일 플랫폼', '마켓플레이스'],
        successFactors: [
          '고객 데이터 기반 개인화 전략',
          '실시간 추천 및 가격 최적화',
          '옴니채널 통합 고객 경험'
        ]
      },

      tags: ['이커머스', 'AI추천', '개인화', '전환율', '동적가격', '온라인쇼핑']
    },

    'consulting-ai-analysis': {
      id: 'consulting-ai-analysis',
      category: 'consulting',
      industry: '전문서비스',
      companyName: '(주)스마트컨설팅',
      title: 'AI 분석으로 컨설팅 품질 234% 향상',
      subtitle: '데이터 분석 자동화와 AI 인사이트로 컨설팅 혁신을 달성한 성공 사례',
      description: '중견 경영컨설팅 회사가 AI 기반 데이터 분석과 인사이트 생성 시스템을 도입하여 프로젝트 완료 시간 58% 단축, 컨설팅 품질 234% 향상, 고객 만족도 97% 달성한 혁신 사례',
      icon: Briefcase,
      color: 'slate',

      companyInfo: {
        industry: '경영컨설팅 · 전략기획 · 디지털전환',
        employees: '78명',
        revenue: '연매출 165억원 → 285억원',
        location: '서울 여의도',
        clients: '연간 고객사 180개'
      },

      challenges: [
        { title: '데이터 분석 시간 과다', description: '수작업 데이터 분석으로 프로젝트 기간 연장', impact: '수익성 저하' },
        { title: '인사이트 품질 편차', description: '컨설턴트 역량에 따른 분석 품질 차이', impact: '고객 만족도 불균형' },
        { title: '반복 업무 과다', description: '유사한 분석 작업 반복으로 생산성 저하', impact: '혁신적 사고 시간 부족' },
        { title: '보고서 작성 비효율', description: '템플릿 기반 수작업 보고서 작성', impact: '납기 지연 빈발' }
      ],

      process: [
        {
          phase: '1단계: AI 분석 플랫폼 구축',
          duration: '6주',
          activities: [
            '기업 데이터 자동 수집 시스템',
            'AI 기반 재무 분석 모델',
            '시장 트렌드 분석 자동화',
            '경쟁사 분석 AI 도구'
          ],
          results: [
            '데이터 처리 시간 78% 단축',
            '분석 정확도 91% 달성',
            '실시간 대시보드 구축'
          ]
        },
        {
          phase: '2단계: AI 인사이트 생성 시스템',
          duration: '5주',
          activities: [
            'GPT 기반 인사이트 생성',
            '업종별 벤치마킹 자동화',
            '전략 시나리오 시뮬레이션',
            'AI 기반 리스크 분석'
          ],
          results: [
            '인사이트 생성 시간 89% 단축',
            '전략 옵션 다양성 3배 증가',
            '리스크 예측 정확도 87% 달성'
          ]
        },
        {
          phase: '3단계: 통합 컨설팅 플랫폼',
          duration: '4주',
          activities: [
            '자동 보고서 생성 시스템',
            '고객 맞춤형 대시보드',
            'AI 기반 제안서 작성',
            '프로젝트 관리 자동화'
          ],
          results: [
            '프로젝트 완료 시간 58% 단축',
            '고객 만족도 97% 달성',
            '컨설턴트 생산성 234% 향상'
          ]
        }
      ],

      results: {
        quantitative: [
          { metric: '프로젝트 완료 시간', before: '평균 3주', after: '평균 1.3주', improvement: '58% 단축' },
          { metric: '데이터 분석 시간', before: '40시간', after: '9시간', improvement: '78% 단축' },
          { metric: '보고서 작성', before: '16시간', after: '3시간', improvement: '81% 단축' },
          { metric: '프로젝트 수주율', before: '34%', after: '67%', improvement: '97% 향상' }
        ],
        financial: [
          { category: '매출 증가', amount: '연 165억 → 285억원', description: '프로젝트 처리량 증가' },
          { category: '생산성 향상', amount: '컨설턴트당 매출 145% 증가', description: 'AI 도구 활용 효과' },
          { category: '신규 사업', amount: 'AI 컨설팅 사업부 신설', description: '새로운 수익원 창출' }
        ],
        qualitative: [
          { aspect: '고객 만족도', score: '97%', description: '빠르고 정확한 분석 결과' },
          { aspect: '직원 만족도', score: '91%', description: '창의적 업무 집중 가능' },
          { aspect: '업계 인지도', achievement: '컨설팅 혁신 대상 수상', description: '업계 선도 기업 인정' }
        ]
      },

      testimonial: {
        name: '이전략 대표컨설턴트',
        position: '(주)스마트컨설팅 대표컨설턴트',
        quote: 'AI가 데이터 분석을 담당하니 우리는 진짜 중요한 전략적 사고와 고객과의 소통에 집중할 수 있게 되었습니다.',
        additionalQuote: '특히 AI가 제시하는 다양한 인사이트를 바탕으로 더 창의적이고 실용적인 솔루션을 제안할 수 있어 고객 만족도가 크게 올랐어요.',
        photo: 'https://picsum.photos/seed/consulting-testimonial/256/256'
      },

      followUpResults: [
        { metric: 'AI 컨설팅 서비스', achievement: 'AI 도입 컨설팅 전문 서비스 런칭' },
        { metric: '해외 진출', achievement: '싱가포르 법인 설립' },
        { metric: '지적재산권', achievement: 'AI 분석 방법론 특허 출원' }
      ],

      applicability: {
        similarIndustries: ['경영컨설팅', '전략컨설팅', '재무컨설팅', '디지털컨설팅'],
        successFactors: [
          'AI와 인간 전문성의 효과적 결합',
          '고객별 맞춤형 분석 자동화',
          '지속적인 AI 모델 학습 및 개선'
        ]
      },

      tags: ['조직문화', '교육 내재화', 'n8n', '프로세스 자동화']
    },

    'manufacturing-smart-factory': {
      id: 'manufacturing-smart-factory',
      category: 'manufacturing',
      industry: '제조업',
      companyName: '(주)스마트팩토리솔루션',
      title: 'AI 혁신으로 업무 효율성 69% 향상',
      subtitle: 'n8n 기반 제조 공정 자동화와 AI 품질 관리 시스템으로 스마트팩토리 구현',
      description: '자동차 부품 제조업체의 AI 도입으로 제안서 작성 시간 69% 단축 및 품질 데이터 분석 85% 효율화. n8n을 활용한 생산 라인 자동화, 재고 관리 자동화, 품질 검사 자동화로 전사적 디지털 트랜스포메이션을 달성한 사례',
      icon: Factory,
      color: 'blue',

      companyInfo: {
        industry: '자동차 부품 제조 · 정밀 가공 · 품질 관리',
        employees: '156명',
        revenue: '연매출 340억원',
        location: '경기도 안산',
        channels: '직접 납품, B2B 계약, OEM 파트너십'
      },

      challenges: [
        { title: '수작업 중심의 품질 검사', description: '육안 검사에 의존하는 품질 관리로 불량률 2.3%, 검사 시간 과다' },
        { title: '비효율적인 재고 관리', description: '수기 기반 재고 관리로 과다 재고 및 품절 상황 빈발' },
        { title: '생산 데이터 분산 관리', description: '각 공정별 데이터가 분산되어 통합 분석 불가' }
      ],

      solutions: [
        { 
          title: 'n8n 기반 생산 라인 자동화',
          description: 'IoT 센서 데이터를 n8n으로 실시간 수집하여 생산 현황 모니터링 및 자동 알림 시스템 구축',
          n8nWorkflows: [
            { name: '생산 현황 모니터링', description: 'PLC 데이터 → n8n → Slack/이메일 알림' },
            { name: '설비 이상 감지', description: '센서 데이터 → n8n → 자동 정지 및 담당자 알림' },
            { name: '생산 일보 자동 생성', description: '일일 생산 데이터 → n8n → PDF 리포트 자동 생성' }
          ]
        },
        {
          title: 'AI 품질 검사 시스템',
          description: '컴퓨터 비전 AI로 제품 품질을 자동 검사하고 n8n으로 불량품 분류 및 처리 자동화',
          n8nWorkflows: [
            { name: '품질 검사 자동화', description: 'AI 검사 결과 → n8n → 불량품 분류 및 재작업 지시' },
            { name: '품질 데이터 분석', description: '검사 데이터 → n8n → 품질 트렌드 분석 및 개선 제안' },
            { name: '고객사 품질 보고', description: '품질 데이터 → n8n → 고객사별 품질 리포트 자동 전송' }
          ]
        },
        {
          title: '스마트 재고 관리',
          description: 'RFID/바코드와 n8n을 연동하여 실시간 재고 추적 및 자동 발주 시스템 구축',
          n8nWorkflows: [
            { name: '실시간 재고 추적', description: 'RFID 스캔 → n8n → ERP 재고 업데이트' },
            { name: '자동 발주 시스템', description: '재고 임계점 도달 → n8n → 공급업체 자동 발주' },
            { name: '재고 최적화 분석', description: '사용 패턴 분석 → n8n → 최적 재고량 제안' }
          ]
        }
      ],

      results: {
        efficiency: '69% 향상',
        timeSaving: '주 20시간 → 3시간',
        revenue: '연 5억 8천만원 효과',
        satisfaction: '92% 직원 만족도'
      },

      keyMetrics: [
        { metric: '불량률', before: '2.3%', after: '0.4%', improvement: '83% 감소' },
        { metric: '품질 검사 시간', before: '제품당 5분', after: '제품당 30초', improvement: '90% 단축' },
        { metric: '재고 회전율', before: '월 2.1회', after: '월 4.8회', improvement: '129% 향상' },
        { metric: '생산 효율성', before: '78%', after: '94%', improvement: '16%p 증가' }
      ],

      testimonial: {
        quote: "n8n으로 구축한 자동화 시스템 덕분에 품질은 높아지고 비용은 줄어들었습니다. 특히 실시간 생산 모니터링으로 문제를 미리 예방할 수 있게 되어 고객 만족도가 크게 향상되었습니다.",
        author: '김제조',
        position: '생산관리팀장',
        company: '(주)스마트팩토리솔루션'
      },

      n8nAutomationDetails: [
        {
          category: '생산 자동화',
          workflows: [
            { name: '생산 계획 자동 생성', trigger: '주문 접수', action: '생산 일정 최적화 및 작업 지시서 자동 생성' },
            { name: '설비 가동률 모니터링', trigger: '설비 상태 변화', action: '가동률 분석 및 유지보수 일정 자동 제안' },
            { name: '생산 실적 실시간 집계', trigger: '생산 완료', action: '실적 데이터 수집 및 KPI 대시보드 업데이트' }
          ]
        },
        {
          category: '품질 관리 자동화',
          workflows: [
            { name: 'AI 품질 검사 연동', trigger: '제품 검사 완료', action: 'AI 판정 결과에 따른 자동 분류 및 처리' },
            { name: '품질 이상 알림', trigger: '불량률 임계점 초과', action: '관련 부서 즉시 알림 및 원인 분석 요청' },
            { name: '품질 인증서 자동 발급', trigger: '검사 합격', action: '품질 인증서 자동 생성 및 고객사 전송' }
          ]
        },
        {
          category: '재고 관리 자동화',
          workflows: [
            { name: '스마트 재고 추적', trigger: '자재 입출고', action: 'RFID 스캔 데이터 기반 실시간 재고 업데이트' },
            { name: '예측 기반 자동 발주', trigger: '재고 소진 예측', action: 'AI 예측 모델 기반 최적 발주량 자동 계산 및 발주' },
            { name: '재고 회전율 최적화', trigger: '월말 재고 분석', action: '슬로우 무빙 재고 식별 및 처리 방안 제안' }
          ]
        }
      ],

      followUpResults: [
        { metric: '디지털 트랜스포메이션 확산', achievement: '전 공장 스마트팩토리 시스템 도입 완료' },
        { metric: '신규 사업 진출', achievement: '스마트팩토리 컨설팅 사업부 신설' },
        { metric: '특허 및 인증', achievement: 'AI 품질 검사 시스템 특허 출원 및 스마트공장 인증 획득' }
      ],

      applicability: {
        similarIndustries: ['기계 제조업', '전자 부품 제조', '화학 공업', '식품 제조업'],
        successFactors: [
          'n8n 기반 유연한 자동화 시스템 구축',
          'AI와 IoT 기술의 효과적 통합',
          '직원 교육을 통한 디지털 전환 문화 조성'
        ]
      },

      tags: ['제조업', 'AI 도입', '업무 자동화', '품질 관리', 'n8n', 'IoT', '스마트팩토리']
    },

    'creative-marketing': {
      id: 'creative-marketing',
      category: 'service',
      industry: '마케팅·광고',
      companyName: '(주)크리에이티브마케팅',
      title: 'AI 크리에이티브로 마케팅 ROI 340% 향상',
      subtitle: 'n8n 기반 마케팅 자동화와 AI 콘텐츠 생성으로 개인화 마케팅 혁신 달성',
      description: '광고 대행사의 AI 도입으로 콘텐츠 제작 시간 78% 단축, 캠페인 성과 340% 향상. n8n을 활용한 소셜미디어 자동화, 개인화 콘텐츠 생성, 성과 분석 자동화로 마케팅 운영 효율성을 극대화한 사례',
      icon: Palette,
      color: 'pink',

      companyInfo: {
        industry: '디지털 마케팅 · 광고 기획 · 콘텐츠 제작',
        employees: '87명',
        revenue: '연매출 180억원',
        location: '서울 강남구',
        channels: '직접 영업, 추천, 온라인 마케팅'
      },

      challenges: [
        { title: '반복적인 콘텐츠 제작 업무', description: '유사한 형태의 광고 소재 제작에 과도한 시간 소요' },
        { title: '개인화 마케팅의 한계', description: '고객별 맞춤 콘텐츠 제작 시 인력 및 시간 부족' },
        { title: '캠페인 성과 분석 지연', description: '수동 데이터 수집으로 실시간 최적화 불가' }
      ],

      solutions: [
        {
          title: 'n8n 기반 소셜미디어 자동화',
          description: 'AI 생성 콘텐츠를 n8n으로 다중 채널에 자동 배포하고 성과를 실시간 모니터링',
          n8nWorkflows: [
            { name: '콘텐츠 자동 배포', description: 'AI 생성 콘텐츠 → n8n → 페이스북/인스타/트위터 동시 게시' },
            { name: '댓글 모니터링 및 응답', description: '소셜미디어 댓글 → n8n → 감정 분석 후 자동 응답' },
            { name: '인플루언서 협업 관리', description: '인플루언서 포스팅 → n8n → 성과 추적 및 정산 자동화' }
          ]
        },
        {
          title: 'AI 개인화 콘텐츠 생성',
          description: '고객 데이터 분석을 통한 개인화 콘텐츠 자동 생성 및 n8n 배포 자동화',
          n8nWorkflows: [
            { name: '개인화 콘텐츠 생성', description: '고객 프로필 → AI 분석 → n8n → 맞춤형 광고 콘텐츠 자동 생성' },
            { name: 'A/B 테스트 자동화', description: '콘텐츠 변형 → n8n → 자동 A/B 테스트 실행 및 결과 분석' },
            { name: '콘텐츠 성과 최적화', description: '성과 데이터 → n8n → AI 학습 및 콘텐츠 개선 제안' }
          ]
        },
        {
          title: '통합 성과 분석 대시보드',
          description: '다중 채널 데이터를 n8n으로 수집하여 실시간 성과 분석 및 최적화 제안',
          n8nWorkflows: [
            { name: '실시간 성과 수집', description: '각 채널 API → n8n → 통합 데이터베이스 자동 업데이트' },
            { name: '성과 리포트 자동 생성', description: '성과 데이터 → n8n → 클라이언트별 맞춤 리포트 자동 생성' },
            { name: '예산 최적화 제안', description: '성과 분석 → n8n → 채널별 예산 재배분 제안 자동 생성' }
          ]
        }
      ],

      results: {
        efficiency: '78% 향상',
        timeSaving: '콘텐츠 제작 시간 85% 단축',
        revenue: 'ROI 340% 향상',
        satisfaction: '고객 만족도 96%'
      },

      keyMetrics: [
        { metric: '콘텐츠 제작 시간', before: '건당 4시간', after: '건당 30분', improvement: '87% 단축' },
        { metric: '캠페인 ROI', before: '평균 280%', after: '평균 950%', improvement: '340% 향상' },
        { metric: '개인화 콘텐츠 비율', before: '15%', after: '78%', improvement: '420% 증가' },
        { metric: '클라이언트 리텐션', before: '67%', after: '89%', improvement: '33% 향상' }
      ],

      testimonial: {
        quote: "n8n과 AI의 조합으로 우리 팀의 창의성은 보존하면서도 생산성이 비약적으로 향상되었습니다. 이제 반복 업무는 자동화하고 우리는 진짜 크리에이티브한 일에만 집중할 수 있게 되었어요.",
        author: '박크리에이티브',
        position: '크리에이티브 디렉터',
        company: '(주)크리에이티브마케팅'
      },

      n8nAutomationDetails: [
        {
          category: '콘텐츠 제작 자동화',
          workflows: [
            { name: 'AI 콘텐츠 생성 파이프라인', trigger: '캠페인 브리프 입력', action: 'AI 기반 다양한 버전의 광고 콘텐츠 자동 생성' },
            { name: '브랜드 가이드라인 체크', trigger: '콘텐츠 생성 완료', action: '브랜드 컬러, 폰트, 톤앤매너 자동 검증' },
            { name: '다국어 콘텐츠 번역', trigger: '원본 콘텐츠 승인', action: '타겟 국가별 언어 및 문화 맞춤 번역' }
          ]
        },
        {
          category: '캠페인 관리 자동화',
          workflows: [
            { name: '캠페인 스케줄링', trigger: '캠페인 계획 수립', action: '최적 타이밍 분석 후 자동 예약 게시' },
            { name: '예산 모니터링', trigger: '광고 집행 중', action: '실시간 예산 소진율 모니터링 및 조정 알림' },
            { name: '경쟁사 분석', trigger: '주간 분석 스케줄', action: '경쟁사 광고 동향 분석 및 대응 전략 제안' }
          ]
        },
        {
          category: '고객 관리 자동화',
          workflows: [
            { name: '리드 스코어링', trigger: '웹사이트 방문자 행동', action: 'AI 기반 리드 점수 산정 및 세일즈 팀 알림' },
            { name: '고객 여정 추적', trigger: '고객 터치포인트 발생', action: '개인화된 다음 단계 콘텐츠 자동 제공' },
            { name: '이탈 고객 재활성화', trigger: '고객 비활성 감지', action: '맞춤형 리타겟팅 캠페인 자동 실행' }
          ]
        }
      ],

      followUpResults: [
        { metric: 'AI 마케팅 플랫폼 출시', achievement: 'SaaS 형태의 AI 마케팅 자동화 플랫폼 상용화' },
        { metric: '해외 진출', achievement: '동남아시아 3개국 진출 및 현지 파트너십 체결' },
        { metric: '업계 인정', achievement: '디지털 마케팅 어워드 AI 혁신상 수상' }
      ],

      applicability: {
        similarIndustries: ['PR 에이전시', '브랜딩 컨설팅', '콘텐츠 마케팅', '퍼포먼스 마케팅'],
        successFactors: [
          'AI와 인간 창의성의 최적 조합',
          'n8n 기반 유연한 워크플로우 설계',
          '데이터 기반 의사결정 문화 구축'
        ]
      },

      tags: ['마케팅', 'AI콘텐츠', '자동화', '개인화', 'n8n', '소셜미디어', 'ROI향상']
    },

    // 나머지 케이스들을 위해 임시로 기본 구조 추가
    'ai-healthcare-startup': {
      id: 'ai-healthcare-startup',
      category: 'startup',
      industry: '헬스케어',
      companyName: '(주)AI헬스케어',
      title: 'AI 의료진단으로 정확도 95% 달성',
      subtitle: 'n8n 기반 의료 데이터 자동화와 AI 진단 시스템으로 의료 서비스 혁신',
      description: 'AI 의료진단 스타트업의 n8n 기반 의료 데이터 처리 자동화와 AI 진단 시스템으로 진단 정확도 95%, 진료 시간 60% 단축을 달성한 사례',
      icon: Heart,
      color: 'red',
      companyInfo: { industry: '의료 AI', employees: '45명', revenue: '연매출 80억원', location: '서울 강남구', channels: '병원 직접 공급' },
      challenges: [{ title: '의료 데이터 처리 복잡성', description: '다양한 의료 장비에서 생성되는 데이터의 표준화 및 통합 처리 어려움' }],
      solutions: [{ title: 'n8n 기반 의료 데이터 통합', description: '각종 의료 장비 데이터를 n8n으로 실시간 수집하여 AI 진단 시스템에 자동 공급', n8nWorkflows: [{ name: '의료 영상 자동 분석', description: 'DICOM 이미지 → n8n → AI 분석 → 진단 결과 자동 생성' }] }],
      results: { efficiency: '60% 향상', timeSaving: '진료 시간 60% 단축', revenue: '진단 정확도 95%', satisfaction: '환자 만족도 98%' },
      keyMetrics: [{ metric: '진단 정확도', before: '78%', after: '95%', improvement: '22% 향상' }],
      testimonial: { quote: "n8n 자동화로 의료진이 진료에만 집중할 수 있게 되었습니다.", author: '이의사', position: '진료부장', company: '(주)AI헬스케어' },
      n8nAutomationDetails: [{ category: '의료 데이터 자동화', workflows: [{ name: '환자 데이터 통합', trigger: '검사 완료', action: '모든 검사 결과를 통합하여 AI 진단 시스템에 자동 전송' }] }],
      followUpResults: [{ metric: 'AI 진단 플랫폼 확장', achievement: '전국 100여개 병원에 AI 진단 시스템 도입' }],
      applicability: { similarIndustries: ['의료 기기', '헬스케어 IT', '의료 서비스'], successFactors: ['의료진과 AI의 협업', 'n8n 기반 데이터 통합'] },
      tags: ['의료', 'AI진단', '헬스케어', 'n8n', '자동화']
    },

    'real-estate-investment': {
      id: 'real-estate-investment',
      category: 'investment',
      industry: '부동산 투자',
      companyName: '(주)스마트부동산투자',
      title: '부동산 투자 수익률 180% 향상',
      subtitle: 'n8n 기반 부동산 데이터 자동 수집과 AI 투자 분석으로 스마트 투자 시스템 구축',
      description: '부동산 투자회사의 n8n을 활용한 시장 데이터 자동 수집, AI 투자 분석, 자동 매물 발굴로 투자 수익률 180% 향상을 달성한 사례',
      icon: Rocket,
      color: 'green',
      companyInfo: { industry: '부동산 투자 · 자산 관리', employees: '72명', revenue: '연매출 450억원', location: '서울 강남구', channels: '직접 투자, 펀드 운용' },
      challenges: [{ title: '부동산 데이터 분산 관리', description: '다양한 사이트의 매물 정보를 수작업으로 수집하여 비효율적' }],
      solutions: [{ title: 'n8n 기반 부동산 데이터 자동 수집', description: '부동산 사이트들의 매물 정보를 n8n으로 자동 수집하여 투자 분석 시스템에 실시간 공급', n8nWorkflows: [{ name: '매물 정보 자동 수집', description: '부동산 사이트 → n8n → 데이터 정제 → 투자 분석 시스템' }] }],
      results: { efficiency: '180% 향상', timeSaving: '분석 시간 75% 단축', revenue: '투자 수익률 180% 향상', satisfaction: '투자자 만족도 94%' },
      keyMetrics: [{ metric: '투자 수익률', before: '연 8%', after: '연 22%', improvement: '180% 향상' }],
      testimonial: { quote: "n8n 자동화로 좋은 매물을 놓치지 않고 빠르게 투자할 수 있게 되었습니다.", author: '박투자', position: '투자팀장', company: '(주)스마트부동산투자' },
      n8nAutomationDetails: [{ category: '투자 분석 자동화', workflows: [{ name: '투자 기회 발굴', trigger: '새 매물 등록', action: 'AI 분석을 통한 투자 가치 평가 및 알림' }] }],
      followUpResults: [{ metric: '투자 플랫폼 런칭', achievement: '개인 투자자 대상 AI 투자 플랫폼 서비스 시작' }],
      applicability: { similarIndustries: ['자산 관리', '투자 자문', '부동산 중개'], successFactors: ['데이터 기반 투자 결정', 'n8n 자동화 시스템'] },
      tags: ['부동산', '투자', 'AI분석', 'n8n', '자동화']
    },

    'green-tech-certification': {
      id: 'green-tech-certification',
      category: 'certification',
      industry: '친환경 인증',
      companyName: '(주)그린테크인증',
      title: '친환경 인증 프로세스 85% 자동화',
      subtitle: 'n8n 기반 인증 프로세스 자동화와 AI 문서 검토로 친환경 인증 혁신 달성',
      description: '친환경 인증 전문기업의 n8n을 활용한 인증 프로세스 자동화, AI 문서 검토 시스템으로 인증 처리 시간 85% 단축을 달성한 사례',
      icon: Shield,
      color: 'emerald',
      companyInfo: { industry: '친환경 인증 · 컨설팅', employees: '38명', revenue: '연매출 65억원', location: '서울 마포구', channels: '기업 직접 서비스' },
      challenges: [{ title: '복잡한 인증 프로세스', description: '다단계 인증 절차와 서류 검토에 과도한 시간 소요' }],
      solutions: [{ title: 'n8n 기반 인증 프로세스 자동화', description: '인증 신청부터 승인까지 전 과정을 n8n으로 자동화하고 AI로 서류 검토', n8nWorkflows: [{ name: '인증 신청 자동 처리', description: '신청서 접수 → n8n → 서류 검토 → AI 분석 → 승인/반려 자동 처리' }] }],
      results: { efficiency: '85% 향상', timeSaving: '인증 처리 시간 85% 단축', revenue: '처리 용량 300% 증가', satisfaction: '고객 만족도 97%' },
      keyMetrics: [{ metric: '인증 처리 시간', before: '평균 30일', after: '평균 4일', improvement: '87% 단축' }],
      testimonial: { quote: "n8n 자동화로 인증 품질은 높이면서 처리 시간은 대폭 줄일 수 있었습니다.", author: '최친환경', position: '인증팀장', company: '(주)그린테크인증' },
      n8nAutomationDetails: [{ category: '인증 프로세스 자동화', workflows: [{ name: '서류 자동 검토', trigger: '인증 서류 업로드', action: 'AI 기반 서류 완성도 검토 및 피드백 자동 생성' }] }],
      followUpResults: [{ metric: '인증 플랫폼 확장', achievement: '국제 친환경 인증까지 서비스 영역 확대' }],
      applicability: { similarIndustries: ['품질 인증', '안전 인증', '보안 인증'], successFactors: ['프로세스 표준화', 'AI와 n8n의 효과적 결합'] },
      tags: ['인증', '친환경', 'AI검토', 'n8n', '프로세스자동화']
    },

    'digital-marketing': {
      id: 'digital-marketing',
      category: 'service',
      industry: '디지털 마케팅',
      companyName: '(주)디지털마케팅솔루션',
      title: '디지털 마케팅 자동화로 전환율 280% 향상',
      subtitle: 'n8n 기반 마케팅 퍼널 자동화와 AI 고객 분석으로 디지털 마케팅 혁신',
      description: '디지털 마케팅 전문업체의 n8n을 활용한 리드 생성부터 전환까지 전 과정 자동화로 전환율 280% 향상을 달성한 사례',
      icon: Globe,
      color: 'blue',
      companyInfo: { industry: '디지털 마케팅 · 퍼포먼스 마케팅', employees: '95명', revenue: '연매출 210억원', location: '서울 서초구', channels: '온라인 마케팅' },
      challenges: [{ title: '복잡한 마케팅 퍼널 관리', description: '다양한 채널의 리드를 수동으로 관리하여 놓치는 기회 발생' }],
      solutions: [{ title: 'n8n 기반 마케팅 퍼널 자동화', description: '리드 생성부터 고객 전환까지 전 과정을 n8n으로 자동화', n8nWorkflows: [{ name: '리드 자동 분류', description: '웹사이트 방문자 → n8n → AI 스코어링 → 자동 세그먼트 분류' }] }],
      results: { efficiency: '280% 향상', timeSaving: '마케팅 운영 시간 70% 단축', revenue: '전환율 280% 향상', satisfaction: '고객 만족도 93%' },
      keyMetrics: [{ metric: '전환율', before: '2.1%', after: '8.0%', improvement: '280% 향상' }],
      testimonial: { quote: "n8n으로 마케팅 퍼널을 자동화하니 놓치는 리드가 없어졌습니다.", author: '김마케팅', position: '마케팅팀장', company: '(주)디지털마케팅솔루션' },
      n8nAutomationDetails: [{ category: '마케팅 자동화', workflows: [{ name: '개인화 이메일 발송', trigger: '고객 행동 변화', action: '고객별 맞춤 이메일 콘텐츠 자동 생성 및 발송' }] }],
      followUpResults: [{ metric: '마케팅 플랫폼 런칭', achievement: 'SaaS 마케팅 자동화 플랫폼 상용화' }],
      applicability: { similarIndustries: ['온라인 마케팅', '이커머스', '콘텐츠 마케팅'], successFactors: ['데이터 기반 마케팅', 'n8n 자동화'] },
      tags: ['디지털마케팅', '퍼널자동화', 'AI분석', 'n8n', '전환율향상']
    },

    'logistics-ai-automation': {
      id: 'logistics-ai-automation',
      category: 'logistics',
      industry: '물류·유통',
      companyName: '(주)스마트로지스틱스',
      title: 'AI 물류 최적화로 배송비 34% 절감',
      subtitle: 'n8n 기반 물류 자동화와 AI 경로 최적화로 스마트 물류 시스템 구축',
      description: '종합물류업체의 n8n을 활용한 물류 프로세스 자동화와 AI 경로 최적화로 배송 시간 52% 단축, 운영비 34% 절감을 달성한 사례',
      icon: Package,
      color: 'amber',
      companyInfo: { industry: '물류 · 배송 · 창고 관리', employees: '234명', revenue: '연매출 580억원', location: '경기도 이천', channels: '직접 배송, 3PL 서비스' },
      challenges: [{ title: '비효율적인 배송 경로', description: '수동 경로 계획으로 배송 시간과 비용 과다 발생' }],
      solutions: [{ title: 'n8n 기반 물류 자동화', description: '주문부터 배송까지 전 과정을 n8n으로 자동화하고 AI로 최적 경로 계산', n8nWorkflows: [{ name: '자동 배송 경로 최적화', description: '주문 접수 → n8n → AI 경로 계산 → 배송 지시서 자동 생성' }] }],
      results: { efficiency: '52% 향상', timeSaving: '배송 시간 52% 단축', revenue: '운영비 34% 절감', satisfaction: '고객 만족도 96%' },
      keyMetrics: [{ metric: '배송 시간', before: '평균 2.5일', after: '평균 1.2일', improvement: '52% 단축' }],
      testimonial: { quote: "n8n과 AI로 물류 운영이 완전히 달라졌습니다. 효율성과 고객 만족도가 동시에 향상되었어요.", author: '이물류', position: '운영팀장', company: '(주)스마트로지스틱스' },
      n8nAutomationDetails: [{ category: '물류 자동화', workflows: [{ name: '재고 자동 관리', trigger: '재고 변동', action: '실시간 재고 업데이트 및 자동 보충 주문' }] }],
      followUpResults: [{ metric: '물류 플랫폼 확장', achievement: '전국 물류 네트워크 통합 플랫폼 구축' }],
      applicability: { similarIndustries: ['택배', '화물 운송', '창고업'], successFactors: ['AI 경로 최적화', 'n8n 프로세스 자동화'] },
      tags: ['물류', '배송최적화', 'AI경로', 'n8n', '운영효율']
    },

    'healthcare-ai-diagnosis': {
      id: 'healthcare-ai-diagnosis',
      category: 'healthcare',
      industry: '의료·헬스케어',
      companyName: '(주)메디컬AI',
      title: '의료 AI 진단으로 정확도 97% 달성',
      subtitle: 'n8n 기반 의료 데이터 통합과 AI 진단 시스템으로 의료 서비스 품질 혁신',
      description: '의료 AI 전문기업의 n8n을 활용한 의료 데이터 통합 자동화와 AI 진단 시스템으로 진단 정확도 97%, 진료 효율성 85% 향상을 달성한 사례',
      icon: Heart,
      color: 'red',
      companyInfo: { industry: '의료 AI · 진단 시스템', employees: '67명', revenue: '연매출 120억원', location: '서울 송파구', channels: '병원 직접 공급' },
      challenges: [{ title: '의료 데이터 분산 관리', description: '각종 의료 장비와 시스템의 데이터가 분산되어 통합 분석 어려움' }],
      solutions: [{ title: 'n8n 기반 의료 데이터 통합', description: '모든 의료 장비 데이터를 n8n으로 실시간 통합하여 AI 진단 시스템에 공급', n8nWorkflows: [{ name: '의료 영상 통합 분석', description: 'CT/MRI/X-ray → n8n → AI 분석 → 통합 진단 리포트 자동 생성' }] }],
      results: { efficiency: '85% 향상', timeSaving: '진료 시간 65% 단축', revenue: '진단 정확도 97%', satisfaction: '의료진 만족도 94%' },
      keyMetrics: [{ metric: '진단 정확도', before: '82%', after: '97%', improvement: '18% 향상' }],
      testimonial: { quote: "n8n 통합 시스템으로 모든 검사 결과를 한 번에 분석할 수 있어 진료 품질이 크게 향상되었습니다.", author: '박의료', position: '진료과장', company: '(주)메디컬AI' },
      n8nAutomationDetails: [{ category: '의료 데이터 자동화', workflows: [{ name: '환자 이력 통합', trigger: '환자 내원', action: '과거 진료 기록과 검사 결과를 자동으로 통합하여 의료진에게 제공' }] }],
      followUpResults: [{ metric: '의료 AI 플랫폼 확장', achievement: '전국 200여개 병원에 AI 진단 시스템 도입' }],
      applicability: { similarIndustries: ['병원', '의료 센터', '건강검진센터'], successFactors: ['의료진과 AI 협업', 'n8n 데이터 통합'] },
      tags: ['의료', 'AI진단', '헬스케어', 'n8n', '데이터통합']
    },

    'education-ai-platform': {
      id: 'education-ai-platform',
      category: 'education',
      industry: '교육·에듀테크',
      companyName: '(주)에듀AI',
      title: 'AI 개인화 학습으로 학습 효과 190% 향상',
      subtitle: 'n8n 기반 학습 데이터 자동화와 AI 개인화 교육으로 에듀테크 혁신 달성',
      description: '에듀테크 전문기업의 n8n을 활용한 학습 데이터 수집 자동화와 AI 개인화 교육 시스템으로 학습 효과 190% 향상을 달성한 사례',
      icon: GraduationCap,
      color: 'purple',
      companyInfo: { industry: '에듀테크 · 온라인 교육', employees: '89명', revenue: '연매출 95억원', location: '서울 강남구', channels: '온라인 플랫폼' },
      challenges: [{ title: '획일적인 교육 방식', description: '학습자 개별 특성을 반영하지 못하는 일방향 교육으로 학습 효과 제한' }],
      solutions: [{ title: 'n8n 기반 개인화 학습 자동화', description: '학습자 행동 데이터를 n8n으로 실시간 수집하여 AI 개인화 교육 콘텐츠 자동 제공', n8nWorkflows: [{ name: '개인화 학습 경로 생성', description: '학습 진도 → n8n → AI 분석 → 맞춤형 학습 콘텐츠 자동 추천' }] }],
      results: { efficiency: '190% 향상', timeSaving: '학습 시간 40% 단축', revenue: '학습 효과 190% 향상', satisfaction: '학습자 만족도 95%' },
      keyMetrics: [{ metric: '학습 완료율', before: '45%', after: '87%', improvement: '93% 향상' }],
      testimonial: { quote: "n8n과 AI로 각 학생에게 맞는 교육을 제공할 수 있게 되어 학습 효과가 놀라울 정도로 향상되었습니다.", author: '최교육', position: '교육개발팀장', company: '(주)에듀AI' },
      n8nAutomationDetails: [{ category: '교육 자동화', workflows: [{ name: '학습 진도 자동 추적', trigger: '학습 활동 완료', action: '학습 진도와 이해도를 분석하여 다음 학습 단계 자동 제안' }] }],
      followUpResults: [{ metric: '교육 플랫폼 확장', achievement: '전국 500여개 교육기관에 AI 교육 시스템 도입' }],
      applicability: { similarIndustries: ['온라인 교육', '학원', '기업 교육'], successFactors: ['개인화 교육', 'n8n 데이터 활용'] },
      tags: ['교육', '개인화학습', 'AI교육', 'n8n', '에듀테크']
    },

    'ecommerce-ai-recommendation': {
      id: 'ecommerce-ai-recommendation',
      category: 'ecommerce',
      industry: '이커머스',
      companyName: '(주)스마트커머스',
      title: 'AI 추천 시스템으로 매출 260% 증가',
      subtitle: 'n8n 기반 고객 데이터 자동화와 AI 상품 추천으로 이커머스 매출 혁신',
      description: '이커머스 플랫폼의 n8n을 활용한 고객 행동 데이터 실시간 수집과 AI 상품 추천 시스템으로 매출 260% 증가를 달성한 사례',
      icon: ShoppingCart,
      color: 'orange',
      companyInfo: { industry: '이커머스 · 온라인 쇼핑몰', employees: '156명', revenue: '연매출 380억원', location: '서울 마포구', channels: '온라인 쇼핑몰' },
      challenges: [{ title: '낮은 상품 발견율', description: '방대한 상품군에서 고객이 원하는 상품을 찾기 어려워 구매 전환율 저조' }],
      solutions: [{ title: 'n8n 기반 AI 추천 시스템', description: '고객 행동 데이터를 n8n으로 실시간 수집하여 AI 개인화 상품 추천', n8nWorkflows: [{ name: '실시간 상품 추천', description: '고객 행동 → n8n → AI 분석 → 개인화 상품 추천 자동 노출' }] }],
      results: { efficiency: '260% 향상', timeSaving: '상품 발견 시간 75% 단축', revenue: '매출 260% 증가', satisfaction: '고객 만족도 92%' },
      keyMetrics: [{ metric: '구매 전환율', before: '1.8%', after: '6.5%', improvement: '261% 향상' }],
      testimonial: { quote: "n8n과 AI 추천 시스템으로 고객들이 원하는 상품을 정확히 찾아드릴 수 있게 되어 매출이 폭증했습니다.", author: '김커머스', position: '마케팅팀장', company: '(주)스마트커머스' },
      n8nAutomationDetails: [{ category: '이커머스 자동화', workflows: [{ name: '재고 기반 추천 조정', trigger: '재고 변동', action: '재고 상황을 반영하여 추천 상품 우선순위 자동 조정' }] }],
      followUpResults: [{ metric: '추천 엔진 라이센싱', achievement: '다른 이커머스 업체에 AI 추천 엔진 기술 라이센싱' }],
      applicability: { similarIndustries: ['온라인 쇼핑몰', '마켓플레이스', '소매업'], successFactors: ['개인화 추천', 'n8n 실시간 데이터 처리'] },
      tags: ['이커머스', 'AI추천', '개인화', 'n8n', '매출증가']
    },

    'consulting-ai-analysis': {
      id: 'consulting-ai-analysis',
      category: 'consulting',
      industry: '전문서비스',
      companyName: '(주)AI컨설팅',
      title: 'AI 분석으로 컨설팅 품질 300% 향상',
      subtitle: 'n8n 기반 데이터 수집 자동화와 AI 분석으로 컨설팅 서비스 혁신 달성',
      description: '경영 컨설팅 전문기업의 n8n을 활용한 고객 데이터 수집 자동화와 AI 분석 시스템으로 컨설팅 품질 300% 향상을 달성한 사례',
      icon: Briefcase,
      color: 'slate',
      companyInfo: { industry: '경영 컨설팅 · 전략 기획', employees: '78명', revenue: '연매출 150억원', location: '서울 중구', channels: '직접 영업, 추천' },
      challenges: [{ title: '데이터 수집의 어려움', description: '고객사 데이터 수집과 분석에 과도한 시간 소요로 컨설팅 품질 제한' }],
      solutions: [{ title: 'n8n 기반 데이터 수집 자동화', description: '고객사의 다양한 시스템 데이터를 n8n으로 자동 수집하여 AI 분석', n8nWorkflows: [{ name: '통합 데이터 분석', description: '고객사 시스템 → n8n → 데이터 정제 → AI 분석 → 인사이트 자동 생성' }] }],
      results: { efficiency: '300% 향상', timeSaving: '분석 시간 80% 단축', revenue: '컨설팅 품질 300% 향상', satisfaction: '고객 만족도 98%' },
      keyMetrics: [{ metric: '프로젝트 성공률', before: '67%', after: '94%', improvement: '40% 향상' }],
      testimonial: { quote: "n8n과 AI로 데이터 기반 컨설팅이 가능해져서 고객사에게 훨씬 정확하고 실용적인 솔루션을 제공할 수 있게 되었습니다.", author: '정컨설팅', position: '시니어 컨설턴트', company: '(주)AI컨설팅' },
      n8nAutomationDetails: [{ category: '컨설팅 자동화', workflows: [{ name: '벤치마킹 자동 분석', trigger: '컨설팅 프로젝트 시작', action: '업계 벤치마킹 데이터 자동 수집 및 분석 리포트 생성' }] }],
      followUpResults: [{ metric: '컨설팅 플랫폼 런칭', achievement: 'AI 기반 셀프 컨설팅 플랫폼 서비스 출시' }],
      applicability: { similarIndustries: ['전략 컨설팅', 'IT 컨설팅', '재무 컨설팅'], successFactors: ['데이터 기반 분석', 'n8n 자동화 시스템'] },
      tags: ['컨설팅', 'AI분석', '데이터기반', 'n8n', '품질향상']
    },

    // 추가 제조업 사례들
    'manufacturing-quality-control': {
      id: 'manufacturing-quality-control',
      category: 'manufacturing',
      industry: '제조업',
      companyName: '(주)프리미엄제조',
      title: 'AI 품질검사로 불량률 87% 감소',
      subtitle: 'n8n 기반 품질 데이터 자동화와 컴퓨터 비전 AI로 제조 품질 혁신',
      description: '정밀 부품 제조업체의 n8n을 활용한 품질 검사 자동화와 AI 비전 시스템으로 불량률 87% 감소, 검사 시간 76% 단축을 달성한 사례',
      icon: CheckCircle,
      color: 'blue',
      companyInfo: { industry: '정밀 부품 제조', employees: '156명', revenue: '연매출 320억원', location: '경기도 안산', specialty: '자동차 부품' },
      challenges: [{ title: '수작업 품질검사의 한계', description: '육안 검사로 인한 불량품 누락과 검사 시간 과다 소요' }],
      solutions: [{ title: 'n8n 기반 AI 품질검사', description: '제품 생산라인에서 n8n으로 실시간 이미지 수집하여 AI 비전으로 자동 품질 판정', n8nWorkflows: [{ name: '실시간 품질검사', description: '제품 촬영 → n8n → AI 비전 분석 → 불량품 자동 분류' }] }],
      results: { efficiency: '76% 단축', timeSaving: '검사시간 5분 → 1.2분', revenue: '불량비용 87% 절감', satisfaction: '품질만족 99.2%' },
      keyMetrics: [{ metric: '불량률', before: '2.8%', after: '0.36%', improvement: '87% 감소' }],
      testimonial: { quote: "AI 품질검사 도입으로 불량품이 거의 사라졌고, 고객 만족도가 크게 향상되었습니다.", author: '김품질', position: '품질관리팀장', company: '(주)프리미엄제조' },
      n8nAutomationDetails: [{ category: '품질 자동화', workflows: [{ name: '품질 데이터 수집', trigger: '제품 완성', action: '품질 검사 결과를 자동으로 ERP 시스템에 기록' }] }],
      followUpResults: [{ metric: '스마트팩토리 확장', achievement: '전체 생산라인에 AI 품질검사 시스템 도입' }],
      applicability: { similarIndustries: ['전자부품', '기계부품', '플라스틱'], successFactors: ['AI 비전 기술', 'n8n 데이터 자동화'] },
      tags: ['제조업', '품질검사', 'AI비전', 'n8n', '자동화']
    },

    'manufacturing-predictive-maintenance': {
      id: 'manufacturing-predictive-maintenance',
      category: 'manufacturing',
      industry: '제조업',
      companyName: '(주)스마트팩토리',
      title: 'AI 예측정비로 가동률 94% 향상',
      subtitle: 'n8n 기반 IoT 센서 데이터 통합과 AI 예측 분석으로 설비 관리 혁신',
      description: '대형 제조업체의 n8n을 활용한 설비 센서 데이터 통합과 AI 예측정비로 비계획 정지시간 82% 감소, 유지비용 45% 절감을 달성한 사례',
      icon: Factory,
      color: 'blue',
      companyInfo: { industry: '중공업 제조', employees: '487명', revenue: '연매출 1,250억원', location: '울산광역시', specialty: '산업설비' },
      challenges: [{ title: '예상치 못한 설비 고장', description: '설비 고장으로 인한 생산 중단과 높은 유지보수 비용' }],
      solutions: [{ title: 'n8n 기반 예측정비', description: '모든 설비의 IoT 센서 데이터를 n8n으로 실시간 수집하여 AI로 고장 예측', n8nWorkflows: [{ name: '설비 상태 모니터링', description: '센서 데이터 → n8n → AI 분석 → 정비 필요 알림 자동 발송' }] }],
      results: { efficiency: '94% 향상', timeSaving: '정지시간 82% 감소', revenue: '유지비용 45% 절감', satisfaction: '가동률 96.8%' },
      keyMetrics: [{ metric: '비계획 정지시간', before: '월 48시간', after: '월 8.6시간', improvement: '82% 감소' }],
      testimonial: { quote: "AI 예측정비로 설비 고장을 미리 예방할 수 있어 생산성이 크게 향상되었습니다.", author: '이설비', position: '설비관리팀장', company: '(주)스마트팩토리' },
      n8nAutomationDetails: [{ category: '설비 자동화', workflows: [{ name: '예방정비 스케줄링', trigger: 'AI 예측 알림', action: '정비 일정을 자동으로 생성하여 관련 부서에 통보' }] }],
      followUpResults: [{ metric: '스마트팩토리 플랫폼', achievement: '전사 설비 통합 관리 시스템 구축' }],
      applicability: { similarIndustries: ['철강', '화학', '자동차'], successFactors: ['IoT 센서 활용', 'AI 예측 분석'] },
      tags: ['제조업', '예측정비', 'IoT센서', 'n8n', '설비관리']
    },

    // 추가 서비스업 사례들  
    'service-customer-support': {
      id: 'service-customer-support',
      category: 'service',
      industry: '서비스업',
      companyName: '(주)고객만족솔루션',
      title: 'AI 챗봇으로 고객응답 속도 89% 향상',
      subtitle: 'n8n 기반 고객 데이터 통합과 자연어 처리 AI로 고객 서비스 혁신',
      description: '고객 서비스 전문업체의 n8n을 활용한 고객 문의 자동 분류와 AI 챗봇으로 응답 속도 89% 향상, 1차 해결율 78% 달성한 사례',
      icon: Users,
      color: 'purple',
      companyInfo: { industry: '고객 서비스 솔루션', employees: '123명', revenue: '연매출 85억원', location: '서울 마포구', services: '콜센터, 챗봇' },
      challenges: [{ title: '고객 문의 처리 지연', description: '대량의 고객 문의로 인한 응답 지연과 상담원 업무 과부하' }],
      solutions: [{ title: 'n8n 기반 AI 고객서비스', description: '고객 문의를 n8n으로 자동 분류하고 AI 챗봇이 1차 응답 후 필요시 상담원 연결', n8nWorkflows: [{ name: '고객 문의 자동 분류', description: '문의 접수 → n8n → AI 분류 → 챗봇 응답 또는 상담원 배정' }] }],
      results: { efficiency: '89% 향상', timeSaving: '응답시간 24시간 → 2.6시간', revenue: '운영비 56% 절감', satisfaction: '고객만족 92%' },
      keyMetrics: [{ metric: '평균 응답시간', before: '24시간', after: '2.6시간', improvement: '89% 단축' }],
      testimonial: { quote: "AI 챗봇 도입으로 고객 대기시간이 대폭 줄어들고 서비스 품질이 향상되었습니다.", author: '박서비스', position: '고객지원팀장', company: '(주)고객만족솔루션' },
      n8nAutomationDetails: [{ category: '고객 서비스 자동화', workflows: [{ name: '고객 만족도 조사', trigger: '상담 완료', action: '자동으로 만족도 조사 링크 발송 및 결과 수집' }] }],
      followUpResults: [{ metric: '멀티채널 고객서비스', achievement: '웹, 앱, 소셜미디어 통합 고객서비스 플랫폼 구축' }],
      applicability: { similarIndustries: ['콜센터', '전자상거래', '금융서비스'], successFactors: ['자연어 처리 AI', 'n8n 워크플로우'] },
      tags: ['서비스업', 'AI챗봇', '고객지원', 'n8n', '자동화']
    },

    'service-financial-automation': {
      id: 'service-financial-automation',
      category: 'service',
      industry: '서비스업',
      companyName: '(주)핀테크솔루션',
      title: 'AI 금융분석으로 투자수익 167% 향상',
      subtitle: 'n8n 기반 금융 데이터 통합과 머신러닝으로 투자 포트폴리오 최적화',
      description: '핀테크 서비스업체의 n8n을 활용한 다양한 금융 데이터 통합과 AI 투자 분석으로 고객 투자수익 167% 향상을 달성한 사례',
      icon: BarChart3,
      color: 'purple',
      companyInfo: { industry: '핀테크 서비스', employees: '89명', revenue: '연매출 145억원', location: '서울 여의도', services: '로보어드바이저' },
      challenges: [{ title: '복잡한 투자 분석', description: '다양한 금융 데이터의 수동 분석으로 인한 투자 기회 놓침' }],
      solutions: [{ title: 'n8n 기반 AI 투자분석', description: '실시간 금융 데이터를 n8n으로 수집하여 AI가 포트폴리오 최적화 및 투자 추천', n8nWorkflows: [{ name: '실시간 시장분석', description: '시장 데이터 → n8n → AI 분석 → 투자 추천 자동 생성' }] }],
      results: { efficiency: '167% 향상', timeSaving: '분석시간 4시간 → 20분', revenue: '투자수익 67% 증가', satisfaction: '고객신뢰 95%' },
      keyMetrics: [{ metric: '평균 투자수익률', before: '연 8.2%', after: '연 13.7%', improvement: '67% 향상' }],
      testimonial: { quote: "AI 투자분석으로 고객들의 수익률이 크게 개선되어 신뢰도가 높아졌습니다.", author: '최투자', position: '투자분석팀장', company: '(주)핀테크솔루션' },
      n8nAutomationDetails: [{ category: '금융 자동화', workflows: [{ name: '리스크 관리', trigger: '시장 변동성 증가', action: '자동으로 포트폴리오 리밸런싱 및 고객 알림' }] }],
      followUpResults: [{ metric: '로보어드바이저 확장', achievement: '개인투자자 대상 AI 투자 플랫폼 서비스 출시' }],
      applicability: { similarIndustries: ['증권', '자산운용', '보험'], successFactors: ['머신러닝 분석', 'n8n 데이터 통합'] },
      tags: ['서비스업', '핀테크', 'AI투자', 'n8n', '포트폴리오']
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">성공사례를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const caseData = caseDetails[caseId];

  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            성공사례를 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 mb-6">
            요청하신 성공사례가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
          <Link href="/cases">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              성공사례 목록으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // 아이콘 컴포넌트 안전성 확보
  const IconComponent = caseData.icon || TrendingUp;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 섹션 */}
      <section className={`bg-gradient-to-r from-${caseData.color}-600 to-${caseData.color}-800 text-white py-16`}>
        <div className="container mx-auto px-4">
          {/* 네비게이션 */}
          <div className="mb-8">
            <Link href="/cases" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              성공사례 목록으로 돌아가기
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-4 rounded-xl bg-white/20`}>
                <IconComponent className="w-8 h-8" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-2 bg-white/20 text-white border-0">
                  {caseData.industry}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold">
                  {caseData.title}
                </h1>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl mb-6 opacity-90">
              {caseData.subtitle}
            </p>
            
            <p className="text-lg opacity-80 leading-relaxed">
              {caseData.description}
            </p>
          </div>
        </div>
      </section>

      {/* 기업 정보 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <Building2 className="w-6 h-6 mr-3 text-blue-600" />
              기업 개요
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(caseData.companyInfo).map(([key, value], index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="text-sm text-gray-600 mb-2 capitalize">
                    {key === 'industry' && '업종'}
                    {key === 'employees' && '직원 수'}
                    {key === 'revenue' && '매출'}
                    {key === 'location' && '위치'}
                    {key === 'exportRatio' && '수출 비중'}
                    {key === 'specialty' && '전문 분야'}
                    {key === 'services' && '주요 서비스'}
                  </div>
                  <div className="font-semibold text-gray-900">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 탭 섹션 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="challenges" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="challenges">도입 전 과제</TabsTrigger>
                <TabsTrigger value="process">AI 도입 과정</TabsTrigger>
                <TabsTrigger value="results">주요 성과</TabsTrigger>
                <TabsTrigger value="testimonial">고객 인터뷰</TabsTrigger>
              </TabsList>

              {/* 도입 전 과제 */}
              <TabsContent value="challenges" className="mt-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {(caseData.challenges || []).map((challenge: any, index: number) => (
                    <Card key={index} className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg text-red-600 flex items-center">
                          <Target className="w-5 h-5 mr-2" />
                          {challenge.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{challenge.description}</p>
                        <div className="bg-red-50 p-3 rounded-lg">
                          <div className="text-sm text-red-800">
                            <strong>영향:</strong> {challenge.impact}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* AI 도입 과정 */}
              <TabsContent value="process" className="mt-8">
                <div className="space-y-8">
                  {(caseData.process || []).map((phase: any, index: number) => (
                    <Card key={index} className="border-0 shadow-lg">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl text-blue-600">
                            {phase.phase}
                          </CardTitle>
                          <Badge variant="outline" className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {phase.duration}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">주요 활동</h4>
                            <ul className="space-y-2">
                              {(phase.activities || []).map((activity: string, actIndex: number) => (
                                <li key={actIndex} className="flex items-start">
                                  <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-600 flex-shrink-0" />
                                  <span className="text-gray-600">{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">주요 성과</h4>
                            <ul className="space-y-2">
                              {(phase.results || []).map((result: string, resIndex: number) => (
                                <li key={resIndex} className="flex items-start">
                                  <Award className="w-4 h-4 mr-2 mt-1 text-blue-600 flex-shrink-0" />
                                  <span className="text-gray-600">{result}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* 주요 성과 */}
              <TabsContent value="results" className="mt-8">
                <div className="space-y-8">
                  {/* 정량적 성과 */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl text-green-600 flex items-center">
                        <BarChart3 className="w-6 h-6 mr-2" />
                        정량적 성과
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4">지표</th>
                              <th className="text-left py-3 px-4">도입 전</th>
                              <th className="text-left py-3 px-4">도입 후</th>
                              <th className="text-left py-3 px-4">개선 효과</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(caseData.results?.quantitative || []).map((result: any, index: number) => (
                              <tr key={index} className="border-b">
                                <td className="py-3 px-4 font-medium">{result.metric}</td>
                                <td className="py-3 px-4 text-gray-600">{result.before}</td>
                                <td className="py-3 px-4 text-gray-600">{result.after}</td>
                                <td className="py-3 px-4">
                                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                                    {result.improvement}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 경제적 효과 */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl text-blue-600 flex items-center">
                        <DollarSign className="w-6 h-6 mr-2" />
                        경제적 효과 (연간 기준)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {(caseData.results?.financial || []).map((item: any, index: number) => (
                          <div key={index} className="bg-blue-50 p-4 rounded-lg">
                            <div className="font-semibold text-blue-900">{item.category}</div>
                            <div className="text-2xl font-bold text-blue-600 my-2">{item.amount}</div>
                            <div className="text-sm text-blue-700">{item.description}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* 정성적 성과 */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl text-purple-600 flex items-center">
                        <Users className="w-6 h-6 mr-2" />
                        정성적 성과
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {(caseData.results?.qualitative || []).map((item: any, index: number) => (
                          <div key={index} className="border-l-4 border-purple-400 pl-4">
                            <h4 className="font-semibold text-gray-900 mb-2">{item.aspect}</h4>
                            {item.score && (
                              <div className="text-2xl font-bold text-purple-600 mb-2">{item.score}</div>
                            )}
                            {item.improvement && (
                              <div className="text-lg font-semibold text-purple-600 mb-2">{item.improvement}</div>
                            )}
                            {item.achievement && (
                              <div className="text-lg font-semibold text-purple-600 mb-2">{item.achievement}</div>
                            )}
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* 고객 인터뷰 */}
              <TabsContent value="testimonial" className="mt-8">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="w-8 h-8 text-gray-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-gray-900">{caseData.testimonial?.name || caseData.testimonial?.author || '고객'}</h3>
                          <p className="text-gray-600">{caseData.testimonial?.position || '담당자'}</p>
                        </div>
                        
                        <Quote className="w-8 h-8 text-blue-600 mb-4" />
                        
                        <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
                          "{caseData.testimonial?.quote || '고객 추천사 준비 중입니다.'}"
                        </blockquote>
                        
                        {caseData.testimonial?.additionalQuote && (
                          <blockquote className="text-lg text-gray-700 leading-relaxed border-l-4 border-blue-400 pl-4">
                            "{caseData.testimonial.additionalQuote}"
                          </blockquote>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 6개월 후 추가 성과 */}
                {caseData.followUpResults && (
                  <Card className="border-0 shadow-lg mt-8">
                    <CardHeader>
                      <CardTitle className="text-xl text-green-600 flex items-center">
                        <Calendar className="w-6 h-6 mr-2" />
                        6개월 후 추가 성과
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(caseData.followUpResults || []).map((result: any, index: number) => (
                          <div key={index} className="bg-green-50 p-4 rounded-lg">
                            <div className="font-semibold text-green-900 mb-2">{result?.metric || '추가 성과'}</div>
                            <div className="text-green-700">{result?.achievement || '성과 데이터 준비 중'}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {caseData.companyName}과 같은 성공을 경험해보세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            전문가와 함께 당신의 기업도 AI 혁신 성공사례를 만들어보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/diagnosis">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                <Target className="w-6 h-6 mr-2" />
                무료 AI 진단 시작
              </Button>
            </Link>
            <Link href="/consultation">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
                전문가 상담 신청
                <ChevronRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="mt-6 text-center">
            <p className="text-lg opacity-90">
              📞 <strong>010-9251-9743</strong> | 🎯 <strong>AI역량진단</strong> | ✉️ <strong>hongik423@gmail.com</strong>
            </p>
            <p className="text-sm opacity-75 mt-2">
              평일 09:00-18:00 | 토요일 09:00-13:00
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}


