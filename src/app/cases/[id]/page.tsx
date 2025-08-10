'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Package,
  BookOpen,
  Cpu,
  Lightbulb,
  Heart,
  GraduationCap,
  ShoppingCart,
  Scale,
  Calculator,
  CreditCard,
  Wifi,
  Video,
  Tv,
  Zap,
  Sun,
  Leaf,
  TreePine,
  Shield,
  Ruler
} from 'lucide-react';
import CaseVisualization from '@/components/cases/CaseVisualization';
import CaseComparison from '@/components/cases/CaseComparison';
import EnhancedCurriculumDisplay from '@/features/curriculum-integration/components/EnhancedCurriculumDisplay';
import CurriculumRecommendationEngine from '@/features/curriculum-integration/components/CurriculumRecommendationEngine';
import { INDUSTRY_SPECIFIC_CURRICULUM } from '@/features/curriculum-integration/constants/enhanced-curriculum-database';

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

  // 26개 성공사례 상세 데이터 - AICAMP 커리큘럼 완전 적용
  const caseDetails: { [key: string]: any } = {
    // 제조업 3개
    'manufacturing-aicamp-digital-transformation': {
      id: 'manufacturing-aicamp-digital-transformation',
      category: 'manufacturing',
      industry: '제조업',
      companyName: '(주)스마트매뉴팩처링',
      title: 'AI 프로세스 자동화로 스마트팩토리 구축 및 고몰입조직 실현',
      subtitle: 'ChatGPT API + n8n 워크플로우로 생산계획 자동화, 품질예측 AI 도입',
      description: 'AICAMP 8주 교육과 부서별 워크숍으로 전직원 AI 역량 강화, n8n 기반 생산라인 자동화로 생산성 245% 향상',
      icon: Factory,
      color: 'blue',
      heroImage: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&h=600&fit=crop',
      companyInfo: {
        industry: '자동차 부품 제조·정밀가공',
        employees: '156명',
        revenue: '연매출 320억원',
        location: '경기도 안산'
      },
      challenges: [
        { title: '생산 효율성 저하', description: '수작업 의존으로 인한 생산성 한계', impact: '목표 대비 78% 달성' },
        { title: '품질 관리 어려움', description: '불량률 증가와 검사 시간 과다', impact: '불량률 5.2%' },
        { title: '직원 AI 역량 부족', description: 'AI 기술 도입에 대한 두려움과 저항', impact: '변화 수용도 낮음' }
      ],
      curriculum: {
        basic: [
          { title: 'AI 기초 이해', duration: '8시간', description: 'AI/ML 개념, 제조업 적용 사례, ChatGPT 활용법' },
          { title: '프롬프트 엔지니어링', duration: '16시간', description: '효과적인 프롬프트 작성, API 활용, 자동화 시나리오' },
          { title: 'n8n 워크플로우 기초', duration: '12시간', description: '노코드 자동화, 워크플로우 설계, API 연동' }
        ],
        advanced: [
          { title: 'Python 데이터분석', duration: '24시간', description: '생산 데이터 분석, 시각화, 예측 모델링' },
          { title: 'Computer Vision 실습', duration: '20시간', description: 'OpenCV, YOLO, 품질검사 AI 구축' },
          { title: 'ML 예측모델 구축', duration: '16시간', description: '수요예측, 재고최적화, 이상감지 모델' }
        ],
        executive: [
          { title: 'AI 전략 수립', duration: '4시간', description: '스마트팩토리 로드맵, 투자 계획, KPI 설정' },
          { title: 'ROI 분석 워크숍', duration: '4시간', description: '투자 효과 분석, 비용-편익 분석, 성과 측정' },
          { title: '변화관리 리더십', duration: '4시간', description: '조직문화 혁신, 저항 관리, 동기부여 전략' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 기초 교육',
          duration: '2주 (36시간)',
          activities: [
            'AI 기초 이론 및 제조업 적용 사례 학습',
            'ChatGPT API 활용 실습',
            'n8n 워크플로우 기초 실습'
          ],
          results: ['AI 이해도 85% 향상', '참여율 94%', '기초 역량 확보']
        },
        {
          phase: '2단계: 심화 실무 적용',
          duration: '4주 (60시간)',
          activities: [
            'Python 기반 생산 데이터 분석',
            'Computer Vision 품질검사 시스템 구축',
            'ML 기반 수요예측 모델 개발'
          ],
          results: ['자동화율 67% 달성', '품질 정확도 95%', '예측 정확도 89%']
        },
        {
          phase: '3단계: 경영진 전략 워크숍',
          duration: '3일 (12시간)',
          activities: [
            'AI 도입 전략 수립',
            'ROI 분석 및 투자 계획',
            '변화관리 전략 수립'
          ],
          results: ['투자 승인', '전사 확산 계획', '리더십 확보']
        }
      ],
      results: {
        quantitative: [
          { metric: '생산성 향상', before: '100%', after: '245%', improvement: '145% 향상' },
          { metric: '작업시간 단축', before: '8시간', after: '3.2시간', improvement: '60% 단축' },
          { metric: '불량률 감소', before: '5.2%', after: '0.8%', improvement: '85% 감소' },
          { metric: '직원몰입도', before: '62%', after: '94%', improvement: '32%p 향상' }
        ],
        financial: [
          { item: '생산성 향상 효과', amount: '연간 45억원' },
          { item: '품질 개선 효과', amount: '연간 12억원' },
          { item: '인력 효율화', amount: '연간 8억원' },
          { item: 'ROI', amount: '680%' }
        ],
        qualitative: [
          '전사적 AI 역량 강화로 혁신 마인드셋 구축',
          'n8n 기반 자동화로 업무 만족도 크게 향상',
          '부서 간 협업 증진으로 조직 시너지 창출',
          '지속적 학습 문화 정착으로 변화 적응력 강화'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육을 통해 직원들이 AI를 두려워하지 않고 적극적으로 활용하게 되었습니다. 특히 n8n을 활용한 자동화로 생산성이 크게 향상되었어요.",
        author: "김제조",
        position: "생산관리팀장",
        company: "(주)스마트매뉴팩처링"
      },
      followUpResults: [
        { metric: '스마트팩토리 확장', achievement: '전체 생산라인 70% 자동화 달성' },
        { metric: 'AI 전문인력 양성', achievement: '사내 AI 전문가 15명 육성' },
        { metric: '혁신문화 정착', achievement: '월평균 개선 제안 250% 증가' }
      ],
      tags: ['제조업', 'AICAMP교육', '스마트팩토리', 'n8n자동화', 'ChatGPT']
    },

    'manufacturing-aicamp-quality-innovation': {
      id: 'manufacturing-aicamp-quality-innovation',
      category: 'manufacturing',
      industry: '제조업',
      companyName: '(주)정밀부품테크',
      title: 'AI 비전검사 + 예측분석으로 품질혁신 및 Zero Defect 문화 구축',
      subtitle: 'Computer Vision AI로 실시간 품질검사, ML 기반 불량 예측',
      description: 'AICAMP 실무교육과 AI 품질검사 워크숍, n8n 데이터 수집 자동화로 품질혁신과 고몰입 조직문화 구축',
      icon: CheckCircle,
      color: 'green',
      heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop',
      companyInfo: {
        industry: '정밀부품 제조',
        employees: '89명',
        revenue: '연매출 180억원',
        location: '경기도 화성'
      },
      challenges: [
        { title: '높은 불량률', description: '수작업 검사로 인한 불량률 증가', impact: '불량률 8.5%' },
        { title: '검사 시간 과다', description: '전수검사로 인한 생산 지연', impact: '검사 시간 과다' },
        { title: '품질 데이터 분산', description: '품질 데이터의 체계적 관리 부족', impact: '개선 방향 불명확' }
      ],
      curriculum: {
        basic: [
          { title: 'AI 품질관리 개론', duration: '8시간', description: 'AI 기반 품질관리 이론, 사례 연구' },
          { title: 'Computer Vision 기초', duration: '12시간', description: '이미지 처리, 객체 감지, 분류 기초' },
          { title: '데이터 시각화', duration: '8시간', description: 'Grafana, Tableau 활용 대시보드 구축' }
        ],
        advanced: [
          { title: 'YOLO 모델 학습', duration: '20시간', description: '커스텀 데이터셋 구축, 모델 학습, 최적화' },
          { title: '불량 예측 알고리즘', duration: '16시간', description: '시계열 분석, 이상감지, 예측 모델링' },
          { title: 'Grafana 대시보드', duration: '12시간', description: '실시간 모니터링, 알람 설정, 리포팅' }
        ],
        executive: [
          { title: '품질 혁신 전략', duration: '4시간', description: 'Zero Defect 전략, 품질 KPI 설정' },
          { title: 'Zero Defect 문화', duration: '4시간', description: '품질 중심 문화, 지속적 개선 체계' },
          { title: 'AI 투자 의사결정', duration: '4시간', description: '품질 투자 ROI, 리스크 관리' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 품질관리 교육',
          duration: '3주 (28시간)',
          activities: [
            'AI 기반 품질관리 이론 교육',
            'Computer Vision 기초 실습',
            '품질 데이터 분석 워크숍'
          ],
          results: ['품질관리 역량 90% 향상', '참여도 96%']
        },
        {
          phase: '2단계: AI 품질검사 시스템 구축',
          duration: '4주 (48시간)',
          activities: [
            'YOLO 기반 비전 검사 시스템 구축',
            'n8n 품질 데이터 수집 자동화',
            'Grafana 실시간 모니터링 대시보드'
          ],
          results: ['검사 정확도 97%', '검사 시간 75% 단축']
        },
        {
          phase: '3단계: 품질문화 혁신',
          duration: '1주 (12시간)',
          activities: [
            '품질 개선 성과 공유',
            'Zero Defect 문화 정착',
            '지속적 개선 프로세스'
          ],
          results: ['품질만족도 96%', '조직몰입도 향상']
        }
      ],
      results: {
        quantitative: [
          { metric: '불량률 감소', before: '8.5%', after: '1.1%', improvement: '87% 감소' },
          { metric: '검사시간 단축', before: '45분', after: '11분', improvement: '75% 단축' },
          { metric: '검사 정확도', before: '85%', after: '97%', improvement: '12%p 향상' },
          { metric: '품질만족도', before: '72%', after: '96%', improvement: '24%p 향상' }
        ],
        financial: [
          { item: '불량비용 절감', amount: '연간 28억원' },
          { item: '검사 효율화', amount: '연간 8억원' },
          { item: '고객 만족도 향상', amount: '연간 15억원' },
          { item: 'ROI', amount: '850%' }
        ],
        qualitative: [
          'AI 품질검사로 객관적이고 일관된 품질 관리 실현',
          'n8n 자동화로 실시간 품질 모니터링 체계 구축',
          '품질 중심 사고로 조직문화 혁신',
          '고객 신뢰도 크게 향상으로 수주 증가'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육 후 품질관리 패러다임이 완전히 바뀌었습니다. AI 검사 시스템으로 불량률이 크게 줄어들어 고객 만족도가 높아졌어요.",
        author: "박품질",
        position: "품질관리부장",
        company: "(주)정밀부품테크"
      },
      followUpResults: [
        { metric: '품질 인증 획득', achievement: 'ISO 9001 품질경영시스템 인증' },
        { metric: '고객사 확대', achievement: '대기업 납품업체 신규 등록 3곳' },
        { metric: '품질 전문가 양성', achievement: '사내 품질 전문가 8명 육성' }
      ],
      tags: ['제조업', 'AICAMP교육', '품질관리', 'AI검사', 'YOLO']
    },

    'manufacturing-aicamp-automation-excellence': {
      id: 'manufacturing-aicamp-automation-excellence',
      category: 'manufacturing',
      industry: '제조업',
      companyName: '(주)오토메이션엑셀런스',
      title: 'IoT + AI 예측정비로 설비가동률 92% 달성 및 기술자 자신감 91% 향상',
      subtitle: 'IoT 센서 + AI 예측모델로 설비고장 사전예방',
      description: 'AICAMP 전문과정과 실습워크숍으로 자동화 전문가 양성, n8n 설비연동으로 가동률 92% 달성',
      icon: Building2,
      color: 'indigo',
      heroImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=600&fit=crop',
      companyInfo: {
        industry: '산업설비 제조',
        employees: '234명',
        revenue: '연매출 450억원',
        location: '경기도 평택'
      },
      challenges: [
        { title: '설비 가동률 저하', description: '비계획 정지로 인한 생산성 손실', impact: '가동률 68%' },
        { title: '전문인력 부족', description: '자동화 전문가 부족으로 대응 지연', impact: '기술 격차 확대' },
        { title: '설비 연동 부족', description: '개별 설비 운영으로 통합 관리 어려움', impact: '효율성 저하' }
      ],
      curriculum: {
        basic: [
          { title: 'IoT 센서 이해', duration: '8시간', description: 'IoT 기초, 센서 종류, 데이터 수집' },
          { title: 'n8n 자동화 기초', duration: '12시간', description: '워크플로우 설계, API 연동, 자동화' },
          { title: 'Power BI 기초', duration: '8시간', description: '데이터 시각화, 대시보드 구축' }
        ],
        advanced: [
          { title: '예측정비 AI 모델', duration: '24시간', description: '시계열 분석, 이상감지, 고장 예측' },
          { title: 'Node-RED 프로그래밍', duration: '16시간', description: 'IoT 데이터 처리, 실시간 모니터링' },
          { title: '실시간 모니터링', duration: '12시간', description: 'InfluxDB, Grafana, 알람 시스템' }
        ],
        executive: [
          { title: '스마트팩토리 전략', duration: '4시간', description: '디지털 전환 로드맵, 투자 전략' },
          { title: '설비 투자 ROI', duration: '4시간', description: '설비 투자 분석, 효과 측정' },
          { title: 'AI 도입 로드맵', duration: '4시간', description: '단계별 도입 전략, 변화 관리' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 자동화 전문과정',
          duration: '4주 (28시간)',
          activities: [
            'IoT 센서 및 데이터 수집 교육',
            'n8n 워크플로우 자동화 실습',
            'Power BI 대시보드 구축'
          ],
          results: ['기술 역량 85% 향상', '전문가 15명 양성']
        },
        {
          phase: '2단계: AI 예측정비 시스템',
          duration: '3주 (52시간)',
          activities: [
            'TensorFlow 예측 모델 개발',
            'Node-RED IoT 데이터 처리',
            'InfluxDB 실시간 모니터링'
          ],
          results: ['설비연동률 90%', '예측 정확도 88%']
        },
        {
          phase: '3단계: 전문조직 운영',
          duration: '1주 (12시간)',
          activities: [
            '자동화 전담팀 구성',
            '지속적 개선 체계',
            '기술 자신감 프로그램'
          ],
          results: ['기술자신감 91%', '전문조직 완성']
        }
      ],
      results: {
        quantitative: [
          { metric: '설비가동률', before: '68%', after: '92%', improvement: '24%p 향상' },
          { metric: '설비정지 감소', before: '월 45회', after: '월 14회', improvement: '68% 감소' },
          { metric: '생산량 증가', before: '100%', after: '134%', improvement: '34% 증가' },
          { metric: '기술자신감', before: '58%', after: '91%', improvement: '33%p 향상' }
        ],
        financial: [
          { item: '생산성 향상', amount: '연간 38억원' },
          { item: '설비 효율화', amount: '연간 22억원' },
          { item: '전문인력 가치', amount: '연간 12억원' },
          { item: 'ROI', amount: '720%' }
        ],
        qualitative: [
          'AICAMP 교육으로 자동화 전문가 집단 형성',
          'n8n 연동으로 스마트 팩토리 기반 구축',
          '기술 자신감 향상으로 도전 정신 강화',
          '지속적 학습 문화로 기술 경쟁력 확보'
        ]
      },
      testimonial: {
        quote: "AICAMP 전문과정을 통해 우리 팀이 진정한 자동화 전문가로 성장했습니다. n8n을 활용한 설비연동으로 생산성이 크게 향상되었어요.",
        author: "이자동",
        position: "자동화팀장",
        company: "(주)오토메이션엑셀런스"
      },
      followUpResults: [
        { metric: '기술 특허 출원', achievement: '자동화 관련 특허 5건 출원' },
        { metric: '기술 컨설팅', achievement: '타 기업 자동화 컨설팅 시작' },
        { metric: '전문가 네트워크', achievement: '업계 전문가 그룹 구성' }
      ],
      tags: ['제조업', 'AICAMP교육', '예측정비', 'IoT', 'n8n']
    },

    // 서비스업 5개
    'service-aicamp-customer-engagement': {
      id: 'service-aicamp-customer-engagement',
      category: 'service',
      industry: '서비스업',
      companyName: '(주)고객감동서비스',
      title: 'AI 챗봇 + 감정분석으로 24시간 고객응대 및 직원 스트레스 76% 감소',
      subtitle: 'GPT-4 기반 지능형 챗봇, 실시간 감정분석 AI',
      description: 'AICAMP 서비스혁신 교육과 고객응대 워크숍, AI챗봇 구축으로 고객만족도 97% 달성',
      icon: Users,
      color: 'purple',
      heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
      companyInfo: {
        industry: '고객서비스',
        employees: '123명',
        revenue: '연매출 85억원',
        location: '서울 마포구'
      },
      challenges: [
        { title: '고객 응답 지연', description: '복잡한 문의 처리로 응답 시간 증가', impact: '평균 응답시간 8분' },
        { title: '서비스 품질 편차', description: '상담사별 서비스 품질 차이', impact: '고객만족도 편차' },
        { title: '직원 스트레스', description: '반복적 업무와 클레임 처리 스트레스', impact: '이직률 25%' }
      ],
      curriculum: {
        basic: [
          { title: 'ChatGPT 고객서비스', duration: '12시간', description: 'GPT-4 활용, 프롬프트 설계' },
          { title: '챗봇 기초 이해', duration: '8시간', description: 'Dialogflow, 시나리오 설계' },
          { title: 'n8n 워크플로우', duration: '12시간', description: '고객응대 자동화, API 연동' }
        ],
        advanced: [
          { title: 'Dialogflow 구축', duration: '20시간', description: '자연어 처리, 인텐트 설계' },
          { title: '감정분석 AI', duration: '16시간', description: 'Sentiment Analysis, 우선순위' },
          { title: 'Zendesk 통합', duration: '12시간', description: '티켓 관리, 에스컬레이션' }
        ],
        executive: [
          { title: '고객경험 혁신', duration: '4시간', description: 'CX 전략, 옴니채널' },
          { title: 'AI CS 전략', duration: '4시간', description: 'AI 고객서비스 로드맵' },
          { title: '서비스 KPI 관리', duration: '4시간', description: 'CSAT, NPS, FCR 관리' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 서비스혁신 교육',
          duration: '3주 (28시간)',
          activities: [
            'AI 고객서비스 이론',
            '챗봇 기초 실습',
            '서비스 마인드셋'
          ],
          results: ['서비스 역량 88% 향상', '참여도 95%']
        },
        {
          phase: '2단계: AI 챗봇 시스템 구축',
          duration: '4주 (48시간)',
          activities: [
            'GPT-4 기반 챗봇 개발',
            '감정분석 AI 통합',
            'Zendesk 연동 자동화'
          ],
          results: ['응답속도 89% 향상', '고객만족도 97%']
        },
        {
          phase: '3단계: 서비스문화 혁신',
          duration: '1주 (12시간)',
          activities: [
            '서비스 개선 성과 공유',
            '고객 중심 문화 정착',
            '지속적 개선 프로세스'
          ],
          results: ['직원몰입도 95%', '서비스 품질 향상']
        }
      ],
      results: {
        quantitative: [
          { metric: '응답속도', before: '8분', after: '0.9분', improvement: '89% 향상' },
          { metric: '처리시간', before: '25분', after: '6분', improvement: '76% 단축' },
          { metric: '고객만족도', before: '74%', after: '97%', improvement: '23%p 향상' },
          { metric: '직원몰입도', before: '68%', after: '95%', improvement: '27%p 향상' }
        ],
        financial: [
          { item: '서비스 효율화', amount: '연간 18억원' },
          { item: '고객 유지', amount: '연간 12억원' },
          { item: '인력 효율화', amount: '연간 8억원' },
          { item: 'ROI', amount: '600%' }
        ],
        qualitative: [
          'AI 챗봇으로 24시간 즉시 응대',
          '상담사 업무 만족도 향상',
          '고객 중심 서비스 문화',
          '서비스 품질 표준화'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육 후 우리 팀의 서비스 마인드가 완전히 달라졌습니다. AI 챗봇으로 고객 응답이 빨라져서 만족도가 크게 향상되었어요.",
        author: "최서비스",
        position: "고객서비스팀장",
        company: "(주)고객감동서비스"
      },
      followUpResults: [
        { metric: '서비스 확장', achievement: '다국어 챗봇 출시' },
        { metric: '업계 인정', achievement: '우수 고객서비스 대상' },
        { metric: '고객사 확대', achievement: '신규 고객사 15곳 확보' }
      ],
      tags: ['서비스업', 'AI챗봇', 'GPT-4', '고객서비스']
    },

    'service-aicamp-content-creation': {
      id: 'service-aicamp-content-creation',
      category: 'service',
      industry: '서비스업',
      companyName: '(주)콘텐츠크리에이션',
      title: '생성AI로 콘텐츠 제작 효율성 320% 향상 및 브랜드 인지도 45% 증가',
      subtitle: 'ChatGPT + Midjourney + Runway으로 마케팅 콘텐츠 자동화',
      description: 'AICAMP 콘텐츠혁신 교육과 생성AI 워크숍, 자동화 도구 구축으로 콘텐츠 제작 혁신',
      icon: Award,
      color: 'orange',
      heroImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=600&fit=crop',
      companyInfo: {
        industry: '디지털 마케팅',
        employees: '67명',
        revenue: '연매출 45억원',
        location: '서울 강남구'
      },
      challenges: [
        { title: '콘텐츠 제작 시간 과다', description: '수작업으로 인한 제작 시간 증가', impact: '월 200시간 소요' },
        { title: '창작자 부족', description: '전문 콘텐츠 크리에이터 부족', impact: '작업 지연' },
        { title: '브랜드 일관성 부족', description: '콘텐츠별 스타일 불일치', impact: '브랜드 인지도 저하' }
      ],
      curriculum: {
        basic: [
          { title: '생성AI 기초', duration: '8시간', description: 'ChatGPT, Midjourney, Runway 기초' },
          { title: '프롬프트 엔지니어링', duration: '16시간', description: '효과적인 프롬프트 작성법' },
          { title: '콘텐츠 전략', duration: '12시간', description: '브랜드 스토리텔링, 타겟 분석' }
        ],
        advanced: [
          { title: 'AI 콘텐츠 제작', duration: '24시간', description: '텍스트, 이미지, 비디오 자동화' },
          { title: '브랜드 일관성 관리', duration: '16시간', description: '스타일 가이드, 템플릿 구축' },
          { title: '성과 분석', duration: '12시간', description: 'Google Analytics, 소셜미디어 분석' }
        ],
        executive: [
          { title: '디지털 마케팅 전략', duration: '4시간', description: '콘텐츠 마케팅 로드맵' },
          { title: '브랜드 전략', duration: '4시간', description: '브랜드 포지셔닝, 차별화' },
          { title: 'ROI 분석', duration: '4시간', description: '콘텐츠 투자 효과 측정' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 콘텐츠혁신 교육',
          duration: '3주 (28시간)',
          activities: [
            '생성AI 기초 교육',
            '프롬프트 엔지니어링 실습',
            '콘텐츠 전략 워크숍'
          ],
          results: ['AI 활용도 85% 향상', '참여율 92%']
        },
        {
          phase: '2단계: AI 콘텐츠 시스템 구축',
          duration: '4주 (48시간)',
          activities: [
            'ChatGPT 텍스트 자동화',
            'Midjourney 이미지 생성',
            'Runway 비디오 편집'
          ],
          results: ['제작시간 75% 단축', '브랜드 일관성 90%']
        },
        {
          phase: '3단계: 콘텐츠 문화 혁신',
          duration: '1주 (12시간)',
          activities: [
            '성과 공유 및 분석',
            '지속적 개선 체계',
            '창작자 역량 강화'
          ],
          results: ['브랜드 인지도 45% 증가', '고객 참여도 향상']
        }
      ],
      results: {
        quantitative: [
          { metric: '콘텐츠 제작 효율성', before: '100%', after: '320%', improvement: '220% 향상' },
          { metric: '제작시간 단축', before: '월 200시간', after: '월 50시간', improvement: '75% 단축' },
          { metric: '브랜드 인지도', before: '25%', after: '70%', improvement: '45%p 향상' },
          { metric: '고객 참여도', before: '15%', after: '38%', improvement: '23%p 향상' }
        ],
        financial: [
          { item: '인력 효율화', amount: '연간 12억원' },
          { item: '브랜드 가치 향상', amount: '연간 18억원' },
          { item: '마케팅 효과 증대', amount: '연간 25억원' },
          { item: 'ROI', amount: '750%' }
        ],
        qualitative: [
          '생성AI로 창의적 콘텐츠 제작 자동화',
          '브랜드 일관성 있는 콘텐츠 체계 구축',
          '고객 참여도 향상으로 마케팅 효과 증대',
          '창작자 역량 강화로 조직 경쟁력 확보'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육으로 콘텐츠 제작 패러다임이 완전히 바뀌었습니다. 생성AI를 활용해 훨씬 효율적으로 고품질 콘텐츠를 만들 수 있게 되었어요.",
        author: "김콘텐츠",
        position: "콘텐츠팀장",
        company: "(주)콘텐츠크리에이션"
      },
      followUpResults: [
        { metric: '콘텐츠 확장', achievement: '월 500개 콘텐츠 자동 생성' },
        { metric: '브랜드 인지도', achievement: '업계 1위 브랜드 인지도 달성' },
        { metric: '고객사 확대', achievement: '신규 고객사 25곳 확보' }
      ],
      tags: ['서비스업', '생성AI', 'ChatGPT', '콘텐츠제작']
    },

    'service-aicamp-data-analytics': {
      id: 'service-aicamp-data-analytics',
      category: 'service',
      industry: '서비스업',
      companyName: '(주)데이터인사이트',
      title: 'AI 데이터분석으로 비즈니스 인사이트 도출 및 의사결정 속도 180% 향상',
      subtitle: 'Python + Tableau + ChatGPT로 데이터 기반 의사결정 체계 구축',
      description: 'AICAMP 데이터분석 교육과 BI 시스템 구축, AI 기반 인사이트 도출로 데이터 기반 경영 실현',
      icon: BarChart3,
      color: 'teal',
      heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
      companyInfo: {
        industry: '데이터 분석',
        employees: '89명',
        revenue: '연매출 65억원',
        location: '서울 서초구'
      },
      challenges: [
        { title: '데이터 활용도 저하', description: '데이터 수집은 많지만 활용 부족', impact: '데이터 활용도 30%' },
        { title: '분석 시간 과다', description: '수작업 분석으로 인한 지연', impact: '분석 시간 과다' },
        { title: '의사결정 지연', description: '분석 결과 도출까지 시간 소요', impact: '기회 손실' }
      ],
      curriculum: {
        basic: [
          { title: '데이터분석 기초', duration: '8시간', description: 'Python, Pandas, NumPy 기초' },
          { title: 'SQL 데이터베이스', duration: '12시간', description: '데이터 쿼리, 조인, 집계' },
          { title: '데이터 시각화', duration: '8시간', description: 'Tableau, Matplotlib 활용' }
        ],
        advanced: [
          { title: '머신러닝 기초', duration: '20시간', description: 'Scikit-learn, 예측 모델링' },
          { title: 'ChatGPT 데이터분석', duration: '16시간', description: 'AI 기반 인사이트 도출' },
          { title: 'BI 대시보드', duration: '12시간', description: '실시간 모니터링 시스템' }
        ],
        executive: [
          { title: '데이터 기반 경영', duration: '4시간', description: '데이터 전략, KPI 설정' },
          { title: '의사결정 프레임워크', duration: '4시간', description: '데이터 기반 의사결정' },
          { title: '데이터 거버넌스', duration: '4시간', description: '데이터 품질, 보안 관리' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 데이터분석 교육',
          duration: '3주 (28시간)',
          activities: [
            'Python 데이터분석 기초',
            'SQL 데이터베이스 실습',
            '데이터 시각화 워크숍'
          ],
          results: ['데이터 역량 90% 향상', '참여율 94%']
        },
        {
          phase: '2단계: AI 분석 시스템 구축',
          duration: '4주 (48시간)',
          activities: [
            '머신러닝 모델 개발',
            'ChatGPT 인사이트 도출',
            'Tableau 대시보드 구축'
          ],
          results: ['분석 시간 70% 단축', '인사이트 정확도 85%']
        },
        {
          phase: '3단계: 데이터 문화 정착',
          duration: '1주 (12시간)',
          activities: [
            '데이터 기반 의사결정',
            '지속적 모니터링 체계',
            '데이터 거버넌스'
          ],
          results: ['의사결정 속도 180% 향상', '데이터 활용도 85%']
        }
      ],
      results: {
        quantitative: [
          { metric: '데이터 활용도', before: '30%', after: '85%', improvement: '55%p 향상' },
          { metric: '분석 시간 단축', before: '5일', after: '1.5일', improvement: '70% 단축' },
          { metric: '의사결정 속도', before: '100%', after: '180%', improvement: '80% 향상' },
          { metric: '인사이트 정확도', before: '65%', after: '85%', improvement: '20%p 향상' }
        ],
        financial: [
          { item: '의사결정 효율화', amount: '연간 22억원' },
          { item: '데이터 활용 증대', amount: '연간 15억원' },
          { item: '기회 손실 방지', amount: '연간 18억원' },
          { item: 'ROI', amount: '650%' }
        ],
        qualitative: [
          'AI 기반 데이터 인사이트로 정확한 의사결정',
          '실시간 대시보드로 신속한 비즈니스 대응',
          '데이터 기반 문화로 조직 역량 강화',
          '고객 니즈 예측으로 서비스 품질 향상'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육으로 데이터를 보는 눈이 완전히 달라졌습니다. AI 분석으로 빠르고 정확한 인사이트를 도출할 수 있게 되었어요.",
        author: "박데이터",
        position: "데이터분석팀장",
        company: "(주)데이터인사이트"
      },
      followUpResults: [
        { metric: '데이터 플랫폼 구축', achievement: '통합 데이터 플랫폼 완성' },
        { metric: '고객사 확대', achievement: '데이터 분석 서비스 고객 30곳' },
        { metric: '전문가 양성', achievement: '데이터 전문가 12명 육성' }
      ],
      tags: ['서비스업', '데이터분석', 'Python', 'Tableau']
    },

    // 나머지 21개 사례를 간략하게 추가 (스타트업, 의료, 교육, 이커머스 등)
    'startup-aicamp-fintech': {
      id: 'startup-aicamp-fintech',
      category: 'startup',
      industry: '핀테크',
      companyName: '(주)스마트인베스트',
      title: 'AI 로보어드바이저로 투자 수익률 28% 향상 및 고객 만족도 94% 달성',
      subtitle: 'ML 기반 포트폴리오 최적화, ChatGPT 투자 상담',
      description: 'AICAMP 핀테크 교육과 AI 투자 시스템 구축으로 개인투자자 맞춤형 서비스 제공',
      icon: DollarSign,
      color: 'green',
      heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop',
      companyInfo: { industry: '핀테크', employees: '45명', revenue: '연매출 25억원', location: '서울 강남구' },
      challenges: [
        { title: '투자 수익률 저하', description: '개인투자자 투자 성과 부족', impact: '평균 수익률 5%' },
        { title: '고객 상담 부족', description: '전문 투자 상담사 부족', impact: '고객 만족도 60%' },
        { title: '리스크 관리 미흡', description: '체계적 리스크 관리 부족', impact: '손실 위험 증가' }
      ],
      curriculum: {
        basic: [
          { title: '핀테크 기초', duration: '8시간', description: '금융기술, 블록체인, AI 투자' },
          { title: '투자 분석 기초', duration: '12시간', description: '포트폴리오 이론, 리스크 관리' },
          { title: 'ChatGPT 금융', duration: '8시간', description: 'AI 투자 상담, 시장 분석' }
        ],
        advanced: [
          { title: 'ML 포트폴리오 최적화', duration: '20시간', description: '알고리즘 트레이딩, 백테스팅' },
          { title: '리스크 관리 AI', duration: '16시간', description: 'VaR 모델, 스트레스 테스트' },
          { title: '고객 맞춤 서비스', duration: '12시간', description: '개인화 투자 전략' }
        ],
        executive: [
          { title: '핀테크 전략', duration: '4시간', description: '디지털 금융 로드맵' },
          { title: '규제 대응', duration: '4시간', description: '금융 규제, 컴플라이언스' },
          { title: '투자 성과 관리', duration: '4시간', description: 'KPI 설정, 성과 측정' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 핀테크 교육',
          duration: '3주 (28시간)',
          activities: ['핀테크 기초 교육', '투자 분석 실습', 'AI 투자 상담'],
          results: ['투자 역량 85% 향상', '참여율 90%']
        },
        {
          phase: '2단계: AI 투자 시스템 구축',
          duration: '4주 (48시간)',
          activities: ['ML 포트폴리오 최적화', '리스크 관리 AI', '고객 맞춤 서비스'],
          results: ['투자 수익률 28% 향상', '고객 만족도 94%']
        },
        {
          phase: '3단계: 핀테크 서비스 런칭',
          duration: '1주 (12시간)',
          activities: ['서비스 출시', '고객 피드백 수집', '지속적 개선'],
          results: ['신규 고객 500명', '서비스 안정화']
        }
      ],
      results: {
        quantitative: [
          { metric: '투자 수익률', before: '5%', after: '33%', improvement: '28%p 향상' },
          { metric: '고객 만족도', before: '60%', after: '94%', improvement: '34%p 향상' },
          { metric: '포트폴리오 다양화', before: '3개', after: '12개', improvement: '300% 증가' },
          { metric: '리스크 관리', before: '높음', after: '낮음', improvement: '리스크 70% 감소' }
        ],
        financial: [
          { item: '투자 수익 증대', amount: '연간 15억원' },
          { item: '고객 확대', amount: '연간 8억원' },
          { item: '운영 효율화', amount: '연간 5억원' },
          { item: 'ROI', amount: '580%' }
        ],
        qualitative: [
          'AI 기반 개인화 투자 전략으로 수익률 향상',
          '체계적 리스크 관리로 안정적 투자 환경',
          '고객 맞춤 상담으로 만족도 크게 향상',
          '핀테크 혁신으로 업계 경쟁력 확보'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육으로 핀테크의 미래를 볼 수 있게 되었습니다. AI 투자 시스템으로 고객들의 투자 성과가 크게 향상되었어요.",
        author: "이핀테크",
        position: "CEO",
        company: "(주)스마트인베스트"
      },
      followUpResults: [
        { metric: '서비스 확장', achievement: '기업투자 서비스 출시' },
        { metric: '규제 승인', achievement: '금융위원회 인증 획득' },
        { metric: '투자 유치', achievement: '시리즈 A 투자 50억원' }
      ],
      tags: ['핀테크', 'AI투자', '로보어드바이저', '포트폴리오']
    },

    'healthcare-aicamp-medical-ai': {
      id: 'healthcare-aicamp-medical-ai',
      category: 'healthcare',
      industry: '의료헬스케어',
      companyName: '(주)스마트메디컬',
      title: 'AI 진단보조 시스템으로 진단 정확도 92% 달성 및 환자 대기시간 65% 단축',
      subtitle: 'Computer Vision + ChatGPT로 의료진단 보조, 환자 관리 자동화',
      description: 'AICAMP 의료AI 교육과 진단보조 시스템 구축으로 의료진의 업무 효율성 향상',
      icon: Heart,
      color: 'red',
      heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=600&fit=crop',
      companyInfo: { industry: '의료기기', employees: '78명', revenue: '연매출 35억원', location: '서울 서초구' },
      challenges: [
        { title: '진단 정확도 저하', description: '의료진 부족으로 인한 진단 오류', impact: '진단 정확도 75%' },
        { title: '환자 대기시간', description: '의료진 부족으로 인한 대기시간 증가', impact: '평균 3시간 대기' },
        { title: '의료진 업무 과부하', description: '반복적 업무로 인한 피로도 증가', impact: '의료진 만족도 저하' }
      ],
      curriculum: {
        basic: [
          { title: '의료AI 기초', duration: '8시간', description: '의료 AI 이론, 윤리, 규제' },
          { title: 'Computer Vision 의료', duration: '12시간', description: '의료 영상 분석, 진단 보조' },
          { title: 'ChatGPT 의료', duration: '8시간', description: 'AI 의료 상담, 환자 관리' }
        ],
        advanced: [
          { title: '의료 영상 분석', duration: '20시간', description: 'X-ray, CT, MRI 분석' },
          { title: '진단 예측 모델', duration: '16시간', description: '질병 예측, 조기 진단' },
          { title: '환자 관리 시스템', duration: '12시간', description: 'EMR 연동, 자동 알림' }
        ],
        executive: [
          { title: '의료AI 전략', duration: '4시간', description: '디지털 헬스케어 로드맵' },
          { title: '규제 대응', duration: '4시간', description: '의료기기 인증, FDA 승인' },
          { title: '의료윤리', duration: '4시간', description: 'AI 의료 윤리, 환자 프라이버시' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 의료AI 교육',
          duration: '3주 (28시간)',
          activities: ['의료AI 기초 교육', 'Computer Vision 실습', '의료윤리 워크숍'],
          results: ['의료AI 이해도 90% 향상', '참여율 95%']
        },
        {
          phase: '2단계: AI 진단보조 시스템',
          duration: '4주 (48시간)',
          activities: ['의료 영상 분석 AI', '진단 예측 모델', '환자 관리 시스템'],
          results: ['진단 정확도 92%', '환자 대기시간 65% 단축']
        },
        {
          phase: '3단계: 의료 서비스 혁신',
          duration: '1주 (12시간)',
          activities: ['시스템 도입', '의료진 교육', '성과 측정'],
          results: ['의료진 만족도 88%', '환자 만족도 92%']
        }
      ],
      results: {
        quantitative: [
          { metric: '진단 정확도', before: '75%', after: '92%', improvement: '17%p 향상' },
          { metric: '환자 대기시간', before: '3시간', after: '1.05시간', improvement: '65% 단축' },
          { metric: '의료진 효율성', before: '100%', after: '165%', improvement: '65% 향상' },
          { metric: '환자 만족도', before: '68%', after: '92%', improvement: '24%p 향상' }
        ],
        financial: [
          { item: '의료 효율화', amount: '연간 18억원' },
          { item: '진단 정확도 향상', amount: '연간 12억원' },
          { item: '환자 만족도 향상', amount: '연간 8억원' },
          { item: 'ROI', amount: '720%' }
        ],
        qualitative: [
          'AI 진단보조로 의료진의 업무 효율성 향상',
          '정확한 진단으로 환자 치료 효과 증대',
          '환자 대기시간 단축으로 의료 접근성 향상',
          '의료AI 혁신으로 업계 선도적 위치 확보'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육으로 의료AI의 가능성을 깨달았습니다. AI 진단보조 시스템으로 환자 치료 품질이 크게 향상되었어요.",
        author: "박의료",
        position: "의료진",
        company: "(주)스마트메디컬"
      },
      followUpResults: [
        { metric: '의료기기 인증', achievement: 'FDA 승인 획득' },
        { metric: '병원 확대', achievement: '전국 50개 병원 도입' },
        { metric: '연구 개발', achievement: '의료AI 특허 8건 출원' }
      ],
      tags: ['의료헬스케어', 'AI진단', 'Computer Vision', '의료기기']
    },

    // 나머지 19개 사례를 간략하게 추가
    'education-aicamp-edutech': {
      id: 'education-aicamp-edutech',
      category: 'education',
      industry: '교육에듀테크',
      companyName: '(주)스마트에듀',
      title: 'AI 개인화 학습으로 학생 성취도 35% 향상 및 학습 만족도 89% 달성',
      subtitle: 'ChatGPT + 개인화 알고리즘으로 맞춤형 학습 경로 제공',
      description: 'AICAMP 에듀테크 교육과 AI 학습 시스템 구축으로 개인화 교육 실현',
      icon: GraduationCap,
      color: 'blue',
      heroImage: 'https://images.unsplash.com/photo-1523240798131-33771e8f08d7?w=1200&h=600&fit=crop',
      companyInfo: { industry: '에듀테크', employees: '56명', revenue: '연매출 28억원', location: '서울 강남구' },
      challenges: [
        { title: '학습 성취도 저하', description: '일괄 교육으로 인한 개인별 차이 무시', impact: '평균 성취도 65%' },
        { title: '학습 동기 부족', description: '흥미 없는 교육 방식', impact: '학습 만족도 45%' },
        { title: '교사 업무 과부하', description: '개별 학생 관리 부담', impact: '교사 만족도 저하' }
      ],
      curriculum: {
        basic: [
          { title: '에듀테크 기초', duration: '8시간', description: 'AI 교육, 개인화 학습 이론' },
          { title: 'ChatGPT 교육', duration: '12시간', description: 'AI 튜터, 학습 보조' },
          { title: '학습 분석', duration: '8시간', description: '학습 데이터 분석, 패턴 파악' }
        ],
        advanced: [
          { title: '개인화 알고리즘', duration: '20시간', description: '학습 경로 최적화, 적응형 학습' },
          { title: '학습 성과 예측', duration: '16시간', description: '성취도 예측, 개입 시점' },
          { title: '게이미피케이션', duration: '12시간', description: '학습 동기 부여, 보상 시스템' }
        ],
        executive: [
          { title: '에듀테크 전략', duration: '4시간', description: '디지털 교육 로드맵' },
          { title: '교육 혁신', duration: '4시간', description: '미래 교육 방향' },
          { title: '성과 관리', duration: '4시간', description: '교육 효과 측정' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 에듀테크 교육',
          duration: '3주 (28시간)',
          activities: ['에듀테크 기초 교육', 'AI 학습 시스템 실습', '개인화 학습 워크숍'],
          results: ['AI 교육 이해도 88% 향상', '참여율 92%']
        },
        {
          phase: '2단계: AI 학습 시스템 구축',
          duration: '4주 (48시간)',
          activities: ['개인화 알고리즘 개발', 'ChatGPT 튜터 시스템', '학습 분석 대시보드'],
          results: ['학습 성취도 35% 향상', '학습 만족도 89%']
        },
        {
          phase: '3단계: 교육 혁신 실현',
          duration: '1주 (12시간)',
          activities: ['시스템 도입', '교사 교육', '학생 피드백 수집'],
          results: ['교사 만족도 85%', '학생 참여도 95%']
        }
      ],
      results: {
        quantitative: [
          { metric: '학습 성취도', before: '65%', after: '100%', improvement: '35%p 향상' },
          { metric: '학습 만족도', before: '45%', after: '89%', improvement: '44%p 향상' },
          { metric: '학습 시간', before: '2시간', after: '3.5시간', improvement: '75% 증가' },
          { metric: '개인화 정확도', before: '60%', after: '92%', improvement: '32%p 향상' }
        ],
        financial: [
          { item: '학습 효과 증대', amount: '연간 12억원' },
          { item: '교사 효율화', amount: '연간 8억원' },
          { item: '학생 만족도 향상', amount: '연간 6억원' },
          { item: 'ROI', amount: '680%' }
        ],
        qualitative: [
          'AI 개인화 학습으로 학생별 맞춤 교육 실현',
          '학습 동기 향상으로 자발적 학습 참여 증가',
          '교사 업무 효율화로 교육 품질 향상',
          '데이터 기반 교육으로 과학적 교육 방법 도입'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육으로 에듀테크의 진정한 가치를 알게 되었습니다. AI 개인화 학습으로 학생들의 성취도가 크게 향상되었어요.",
        author: "김에듀",
        position: "교육팀장",
        company: "(주)스마트에듀"
      },
      followUpResults: [
        { metric: '교육 확장', achievement: '전국 100개 학교 도입' },
        { metric: '교육 인증', achievement: '교육부 디지털 교육 인증' },
        { metric: '연구 개발', achievement: '에듀테크 특허 12건 출원' }
      ],
      tags: ['교육에듀테크', 'AI학습', '개인화교육', 'ChatGPT']
    },

    // 나머지 18개 사례를 간략하게 추가 (이커머스, 물류, 전문서비스 등)
    'ecommerce-aicamp-smart-retail': {
      id: 'ecommerce-aicamp-smart-retail',
      category: 'ecommerce',
      industry: '이커머스',
      companyName: '(주)스마트리테일',
      title: 'AI 추천 시스템으로 매출 42% 증가 및 고객 이탈률 68% 감소',
      subtitle: 'ML 추천 엔진 + ChatGPT 고객 상담으로 개인화 쇼핑 경험',
      description: 'AICAMP 이커머스 교육과 AI 추천 시스템 구축으로 개인화 쇼핑 플랫폼 구현',
      icon: ShoppingCart,
      color: 'purple',
      heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
      companyInfo: { industry: '이커머스', employees: '134명', revenue: '연매출 180억원', location: '서울 강남구' },
      challenges: [
        { title: '매출 성장 한계', description: '일반적인 추천 시스템의 한계', impact: '매출 성장률 8%' },
        { title: '고객 이탈률 증가', description: '개인화 부족으로 인한 고객 이탈', impact: '이탈률 25%' },
        { title: '고객 상담 부족', description: '24시간 상담 서비스 부족', impact: '고객 만족도 65%' }
      ],
      curriculum: {
        basic: [
          { title: '이커머스 AI 기초', duration: '8시간', description: 'AI 이커머스, 추천 시스템 이론' },
          { title: '고객 행동 분석', duration: '12시간', description: '구매 패턴, 선호도 분석' },
          { title: 'ChatGPT 고객상담', duration: '8시간', description: 'AI 챗봇, 고객 응대' }
        ],
        advanced: [
          { title: 'ML 추천 엔진', duration: '20시간', description: '협업 필터링, 콘텐츠 기반 추천' },
          { title: '개인화 알고리즘', duration: '16시간', description: '고객 세분화, 맞춤형 상품' },
          { title: '실시간 분석', duration: '12시간', description: '실시간 고객 행동 분석' }
        ],
        executive: [
          { title: '이커머스 전략', duration: '4시간', description: '디지털 마케팅 전략' },
          { title: '고객 경험 혁신', duration: '4시간', description: 'CX 전략, 옴니채널' },
          { title: '성과 분석', duration: '4시간', description: '매출 분석, KPI 관리' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 이커머스 교육',
          duration: '3주 (28시간)',
          activities: ['이커머스 AI 기초 교육', '고객 행동 분석 실습', 'AI 챗봇 워크숍'],
          results: ['AI 이커머스 이해도 85% 향상', '참여율 90%']
        },
        {
          phase: '2단계: AI 추천 시스템 구축',
          duration: '4주 (48시간)',
          activities: ['ML 추천 엔진 개발', '개인화 알고리즘', '실시간 분석 시스템'],
          results: ['매출 42% 증가', '고객 이탈률 68% 감소']
        },
        {
          phase: '3단계: 고객 경험 혁신',
          duration: '1주 (12시간)',
          activities: ['시스템 도입', '고객 피드백 수집', '지속적 개선'],
          results: ['고객 만족도 92%', '재구매율 78%']
        }
      ],
      results: {
        quantitative: [
          { metric: '매출 증가', before: '100%', after: '142%', improvement: '42% 증가' },
          { metric: '고객 이탈률', before: '25%', after: '8%', improvement: '68% 감소' },
          { metric: '고객 만족도', before: '65%', after: '92%', improvement: '27%p 향상' },
          { metric: '재구매율', before: '45%', after: '78%', improvement: '33%p 향상' }
        ],
        financial: [
          { item: '매출 증대', amount: '연간 75억원' },
          { item: '고객 유지', amount: '연간 25억원' },
          { item: '운영 효율화', amount: '연간 15억원' },
          { item: 'ROI', amount: '850%' }
        ],
        qualitative: [
          'AI 추천 시스템으로 개인화 쇼핑 경험 제공',
          '고객 이탈률 감소로 안정적 매출 확보',
          '24시간 AI 상담으로 고객 서비스 향상',
          '데이터 기반 의사결정으로 마케팅 효과 증대'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육으로 이커머스의 미래를 볼 수 있게 되었습니다. AI 추천 시스템으로 매출이 크게 향상되었어요.",
        author: "이커머스",
        position: "마케팅팀장",
        company: "(주)스마트리테일"
      },
      followUpResults: [
        { metric: '서비스 확장', achievement: '모바일 앱 출시' },
        { metric: '고객사 확대', achievement: '신규 고객 10만명' },
        { metric: '기술 혁신', achievement: 'AI 특허 6건 출원' }
      ],
      tags: ['이커머스', 'AI추천', '개인화', 'ML']
    },

    // 나머지 17개 사례를 간략하게 추가 (물류, 전문서비스, 투자, 인증관리 등)
    'logistics-aicamp-smart-logistics': {
      id: 'logistics-aicamp-smart-logistics',
      category: 'logistics',
      industry: '물류유통',
      companyName: '(주)스마트로지스틱스',
      title: 'AI 물류 최적화로 배송 시간 45% 단축 및 운영비용 32% 절감',
      subtitle: 'IoT + AI 경로 최적화 + 자동화 창고로 스마트 물류 체계 구축',
      description: 'AICAMP 물류AI 교육과 IoT 센서 구축, AI 경로 최적화로 스마트 물류 실현',
      icon: Package,
      color: 'orange',
      heroImage: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&h=600&fit=crop',
      companyInfo: { industry: '물류', employees: '234명', revenue: '연매출 280억원', location: '경기도 화성' },
      challenges: [
        { title: '배송 시간 지연', description: '비효율적 경로로 인한 배송 지연', impact: '평균 배송시간 3일' },
        { title: '운영비용 증가', description: '수작업으로 인한 비용 증가', impact: '운영비용 15% 증가' },
        { title: '재고 관리 부족', description: '실시간 재고 파악 어려움', impact: '재고 정확도 75%' }
      ],
      curriculum: {
        basic: [
          { title: '물류AI 기초', duration: '8시간', description: 'AI 물류, IoT 센서 기초' },
          { title: '경로 최적화', duration: '12시간', description: '알고리즘, 배송 경로 설계' },
          { title: '재고 관리', duration: '8시간', description: '실시간 재고 추적, 예측' }
        ],
        advanced: [
          { title: 'IoT 물류 시스템', duration: '20시간', description: '센서 네트워크, 실시간 모니터링' },
          { title: 'AI 경로 최적화', duration: '16시간', description: '머신러닝, 실시간 경로 조정' },
          { title: '자동화 창고', duration: '12시간', description: '로봇 시스템, 자동 분류' }
        ],
        executive: [
          { title: '스마트 물류 전략', duration: '4시간', description: '물류 혁신 로드맵' },
          { title: '비용 최적화', duration: '4시간', description: '운영비 절감 전략' },
          { title: '고객 서비스', duration: '4시간', description: '배송 품질 향상' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 물류AI 교육',
          duration: '3주 (28시간)',
          activities: ['물류AI 기초 교육', 'IoT 센서 실습', '경로 최적화 워크숍'],
          results: ['물류AI 이해도 88% 향상', '참여율 90%']
        },
        {
          phase: '2단계: 스마트 물류 시스템',
          duration: '4주 (48시간)',
          activities: ['IoT 센서 네트워크 구축', 'AI 경로 최적화', '자동화 창고 시스템'],
          results: ['배송 시간 45% 단축', '운영비용 32% 절감']
        },
        {
          phase: '3단계: 물류 혁신 실현',
          duration: '1주 (12시간)',
          activities: ['시스템 도입', '직원 교육', '성과 측정'],
          results: ['고객 만족도 94%', '재고 정확도 98%']
        }
      ],
      results: {
        quantitative: [
          { metric: '배송 시간', before: '3일', after: '1.65일', improvement: '45% 단축' },
          { metric: '운영비용', before: '100%', after: '68%', improvement: '32% 절감' },
          { metric: '재고 정확도', before: '75%', after: '98%', improvement: '23%p 향상' },
          { metric: '고객 만족도', before: '68%', after: '94%', improvement: '26%p 향상' }
        ],
        financial: [
          { item: '운영비 절감', amount: '연간 89억원' },
          { item: '배송 효율화', amount: '연간 45억원' },
          { item: '재고 최적화', amount: '연간 28억원' },
          { item: 'ROI', amount: '720%' }
        ],
        qualitative: [
          'AI 경로 최적화로 배송 시간 단축',
          'IoT 센서로 실시간 물류 모니터링',
          '자동화 창고로 운영 효율성 향상',
          '고객 맞춤 배송 서비스 제공'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육으로 물류의 미래를 볼 수 있게 되었습니다. AI 물류 시스템으로 배송 효율성이 크게 향상되었어요.",
        author: "박물류",
        position: "물류팀장",
        company: "(주)스마트로지스틱스"
      },
      followUpResults: [
        { metric: '서비스 확장', achievement: '전국 물류망 구축' },
        { metric: '고객사 확대', achievement: '신규 고객사 50곳' },
        { metric: '기술 혁신', achievement: '물류AI 특허 8건 출원' }
      ],
      tags: ['물류유통', 'AI물류', 'IoT', '경로최적화']
    },

    // 전문서비스업 3개
    'consulting-aicamp-strategy-ai': {
      id: 'consulting-aicamp-strategy-ai',
      category: 'consulting',
      industry: '전문서비스',
      companyName: '(주)스마트컨설팅',
      title: 'AI 전략 컨설팅으로 고객사 매출 38% 증가 및 컨설턴트 생산성 156% 향상',
      subtitle: 'ChatGPT + 데이터분석 + AI 시나리오로 전략 컨설팅 혁신',
      description: 'AICAMP 전문서비스 교육과 AI 컨설팅 도구 구축으로 데이터 기반 전략 컨설팅 실현',
      icon: Lightbulb,
      color: 'purple',
      heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
      companyInfo: { industry: '전략 컨설팅', employees: '89명', revenue: '연매출 120억원', location: '서울 강남구' },
      challenges: [
        { title: '컨설팅 품질 편차', description: '컨설턴트별 역량 차이로 인한 품질 편차', impact: '고객 만족도 편차' },
        { title: '분석 시간 과다', description: '수작업 분석으로 인한 프로젝트 지연', impact: '평균 3개월 소요' },
        { title: '전략 제안 한계', description: '경험 기반 제안의 한계', impact: '혁신적 솔루션 부족' }
      ],
      curriculum: {
        basic: [
          { title: 'AI 컨설팅 기초', duration: '8시간', description: 'AI 컨설팅 이론, ChatGPT 활용' },
          { title: '데이터 분석 기초', duration: '12시간', description: 'Python, Pandas, 시각화' },
          { title: '전략 프레임워크', duration: '8시간', description: 'AI 기반 전략 분석 도구' }
        ],
        advanced: [
          { title: 'AI 시나리오 분석', duration: '20시간', description: '머신러닝, 예측 모델링' },
          { title: 'ChatGPT 컨설팅', duration: '16시간', description: 'AI 기반 전략 제안' },
          { title: '고객 맞춤 솔루션', duration: '12시간', description: '개인화 컨설팅 방법론' }
        ],
        executive: [
          { title: 'AI 컨설팅 전략', duration: '4시간', description: '디지털 컨설팅 로드맵' },
          { title: '고객 가치 창출', duration: '4시간', description: 'ROI 중심 컨설팅' },
          { title: '혁신 문화 구축', duration: '4시간', description: 'AI 기반 혁신 전략' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 전문서비스 교육',
          duration: '3주 (28시간)',
          activities: ['AI 컨설팅 기초 교육', '데이터 분석 실습', '전략 프레임워크 워크숍'],
          results: ['AI 컨설팅 이해도 92% 향상', '참여율 95%']
        },
        {
          phase: '2단계: AI 컨설팅 시스템',
          duration: '4주 (48시간)',
          activities: ['AI 시나리오 분석 도구', 'ChatGPT 컨설팅 플랫폼', '고객 맞춤 솔루션'],
          results: ['컨설팅 품질 85% 향상', '프로젝트 시간 40% 단축']
        },
        {
          phase: '3단계: 컨설팅 혁신 실현',
          duration: '1주 (12시간)',
          activities: ['시스템 도입', '컨설턴트 교육', '고객 피드백 수집'],
          results: ['고객 만족도 96%', '재계약율 78%']
        }
      ],
      results: {
        quantitative: [
          { metric: '고객사 매출 증가', before: '100%', after: '138%', improvement: '38% 증가' },
          { metric: '컨설턴트 생산성', before: '100%', after: '256%', improvement: '156% 향상' },
          { metric: '프로젝트 시간', before: '3개월', after: '1.8개월', improvement: '40% 단축' },
          { metric: '고객 만족도', before: '72%', after: '96%', improvement: '24%p 향상' }
        ],
        financial: [
          { item: '고객사 매출 증대', amount: '연간 45억원' },
          { item: '컨설팅 효율화', amount: '연간 28억원' },
          { item: '고객 유지', amount: '연간 18억원' },
          { item: 'ROI', amount: '680%' }
        ],
        qualitative: [
          'AI 기반 데이터 분석으로 정확한 전략 제안',
          'ChatGPT 활용으로 혁신적 솔루션 도출',
          '개인화 컨설팅으로 고객 만족도 향상',
          '지속적 학습 문화로 컨설턴트 역량 강화'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육으로 컨설팅의 패러다임이 완전히 바뀌었습니다. AI 도구를 활용해 더 정확하고 혁신적인 전략을 제안할 수 있게 되었어요.",
        author: "김컨설팅",
        position: "파트너",
        company: "(주)스마트컨설팅"
      },
      followUpResults: [
        { metric: '서비스 확장', achievement: 'AI 컨설팅 전문 서비스 출시' },
        { metric: '고객사 확대', achievement: '신규 고객사 25곳 확보' },
        { metric: '기술 혁신', achievement: 'AI 컨설팅 특허 6건 출원' }
      ],
      tags: ['전문서비스', 'AI컨설팅', 'ChatGPT', '전략분석']
    },

    'legal-aicamp-ai-law': {
      id: 'legal-aicamp-ai-law',
      category: 'legal',
      industry: '법무서비스',
      companyName: '(주)스마트로펌',
      title: 'AI 법률 분석으로 사건 처리 시간 52% 단축 및 승소율 18% 향상',
      subtitle: 'ChatGPT + 법률 데이터베이스 + AI 판례 분석으로 스마트 법무 서비스',
      description: 'AICAMP 법무AI 교육과 AI 법률 분석 시스템 구축으로 효율적 법무 서비스 실현',
      icon: Scale,
      color: 'indigo',
      heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=600&fit=crop',
      companyInfo: { industry: '법무서비스', employees: '67명', revenue: '연매출 85억원', location: '서울 종로구' },
      challenges: [
        { title: '사건 처리 지연', description: '수작업 법률 분석으로 인한 처리 지연', impact: '평균 6개월 소요' },
        { title: '판례 검색 어려움', description: '방대한 판례 데이터 검색의 어려움', impact: '검색 시간 과다' },
        { title: '법률 자문 한계', description: '전문가 부족으로 인한 자문 한계', impact: '고객 만족도 저하' }
      ],
      curriculum: {
        basic: [
          { title: '법무AI 기초', duration: '8시간', description: 'AI 법무, ChatGPT 법률 활용' },
          { title: '법률 데이터베이스', duration: '12시간', description: '판례 검색, 법령 분석' },
          { title: '법률 문서 자동화', duration: '8시간', description: '계약서, 소장 자동 생성' }
        ],
        advanced: [
          { title: 'AI 판례 분석', duration: '20시간', description: '머신러닝, 판례 패턴 분석' },
          { title: 'ChatGPT 법률 자문', duration: '16시간', description: 'AI 기반 법률 상담' },
          { title: '사건 예측 모델', duration: '12시간', description: '승소율 예측, 리스크 분석' }
        ],
        executive: [
          { title: '법무AI 전략', duration: '4시간', description: '디지털 법무 로드맵' },
          { title: '고객 서비스 혁신', duration: '4시간', description: 'AI 법무 서비스' },
          { title: '규제 대응', duration: '4시간', description: 'AI 법무 규제, 윤리' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 법무AI 교육',
          duration: '3주 (28시간)',
          activities: ['법무AI 기초 교육', '법률 데이터베이스 실습', 'AI 법률 자문 워크숍'],
          results: ['법무AI 이해도 90% 향상', '참여율 92%']
        },
        {
          phase: '2단계: AI 법률 시스템',
          duration: '4주 (48시간)',
          activities: ['AI 판례 분석 시스템', 'ChatGPT 법률 자문', '사건 예측 모델'],
          results: ['사건 처리 시간 52% 단축', '승소율 18% 향상']
        },
        {
          phase: '3단계: 법무 혁신 실현',
          duration: '1주 (12시간)',
          activities: ['시스템 도입', '변호사 교육', '고객 피드백 수집'],
          results: ['고객 만족도 94%', '사건 처리량 45% 증가']
        }
      ],
      results: {
        quantitative: [
          { metric: '사건 처리 시간', before: '6개월', after: '2.88개월', improvement: '52% 단축' },
          { metric: '승소율', before: '65%', after: '83%', improvement: '18%p 향상' },
          { metric: '판례 검색 시간', before: '2시간', after: '0.3시간', improvement: '85% 단축' },
          { metric: '고객 만족도', before: '68%', after: '94%', improvement: '26%p 향상' }
        ],
        financial: [
          { item: '사건 처리 효율화', amount: '연간 28억원' },
          { item: '승소율 향상 효과', amount: '연간 18억원' },
          { item: '고객 만족도 향상', amount: '연간 12억원' },
          { item: 'ROI', amount: '750%' }
        ],
        qualitative: [
          'AI 판례 분석으로 정확한 법률 자문 제공',
          'ChatGPT 활용으로 신속한 법률 상담',
          '사건 예측 모델로 전략적 소송 대응',
          '법률 문서 자동화로 업무 효율성 향상'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육으로 법무의 미래를 볼 수 있게 되었습니다. AI 법률 시스템으로 사건 처리가 훨씬 효율적으로 되었어요.",
        author: "박법무",
        position: "대표변호사",
        company: "(주)스마트로펌"
      },
      followUpResults: [
        { metric: '서비스 확장', achievement: 'AI 법률 자문 서비스 출시' },
        { metric: '고객사 확대', achievement: '신규 고객사 40곳 확보' },
        { metric: '기술 혁신', achievement: '법무AI 특허 4건 출원' }
      ],
      tags: ['법무서비스', 'AI법무', 'ChatGPT', '판례분석']
    },

    'accounting-aicamp-ai-accounting': {
      id: 'accounting-aicamp-ai-accounting',
      category: 'accounting',
      industry: '회계서비스',
      companyName: '(주)스마트어카운팅',
      title: 'AI 회계 자동화로 업무 시간 68% 단축 및 오류율 92% 감소',
      subtitle: 'ChatGPT + 회계 소프트웨어 + AI 감사로 스마트 회계 서비스',
      description: 'AICAMP 회계AI 교육과 AI 회계 시스템 구축으로 정확하고 효율적인 회계 서비스 실현',
      icon: Calculator,
      color: 'green',
      heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop',
      companyInfo: { industry: '회계서비스', employees: '78명', revenue: '연매출 95억원', location: '서울 강남구' },
      challenges: [
        { title: '업무 시간 과다', description: '수작업 회계 처리로 인한 시간 소요', impact: '월 200시간 소요' },
        { title: '오류 발생', description: '인적 오류로 인한 회계 오류', impact: '오류율 8%' },
        { title: '감사 효율성', description: '전통적 감사 방식의 한계', impact: '감사 시간 과다' }
      ],
      curriculum: {
        basic: [
          { title: '회계AI 기초', duration: '8시간', description: 'AI 회계, ChatGPT 회계 활용' },
          { title: '회계 소프트웨어', duration: '12시간', description: '자동화, 데이터 처리' },
          { title: '재무 분석', duration: '8시간', description: 'AI 기반 재무 분석' }
        ],
        advanced: [
          { title: 'AI 회계 자동화', duration: '20시간', description: '머신러닝, 자동 분개' },
          { title: 'ChatGPT 회계 자문', duration: '16시간', description: 'AI 기반 회계 상담' },
          { title: 'AI 감사 시스템', duration: '12시간', description: '자동 감사, 이상감지' }
        ],
        executive: [
          { title: '회계AI 전략', duration: '4시간', description: '디지털 회계 로드맵' },
          { title: '규제 대응', duration: '4시간', description: '회계 규제, 컴플라이언스' },
          { title: '고객 가치 창출', duration: '4시간', description: 'AI 회계 서비스' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 회계AI 교육',
          duration: '3주 (28시간)',
          activities: ['회계AI 기초 교육', '회계 소프트웨어 실습', 'AI 회계 자문 워크숍'],
          results: ['회계AI 이해도 88% 향상', '참여율 90%']
        },
        {
          phase: '2단계: AI 회계 시스템',
          duration: '4주 (48시간)',
          activities: ['AI 회계 자동화 시스템', 'ChatGPT 회계 자문', 'AI 감사 시스템'],
          results: ['업무 시간 68% 단축', '오류율 92% 감소']
        },
        {
          phase: '3단계: 회계 혁신 실현',
          duration: '1주 (12시간)',
          activities: ['시스템 도입', '회계사 교육', '고객 피드백 수집'],
          results: ['고객 만족도 96%', '업무 효율성 85% 향상']
        }
      ],
      results: {
        quantitative: [
          { metric: '업무 시간', before: '200시간', after: '64시간', improvement: '68% 단축' },
          { metric: '오류율', before: '8%', after: '0.64%', improvement: '92% 감소' },
          { metric: '감사 시간', before: '2주', after: '3일', improvement: '70% 단축' },
          { metric: '고객 만족도', before: '72%', after: '96%', improvement: '24%p 향상' }
        ],
        financial: [
          { item: '업무 효율화', amount: '연간 35억원' },
          { item: '오류 비용 절감', amount: '연간 22억원' },
          { item: '감사 효율화', amount: '연간 18억원' },
          { item: 'ROI', amount: '820%' }
        ],
        qualitative: [
          'AI 회계 자동화로 정확하고 빠른 회계 처리',
          'ChatGPT 활용으로 전문적인 회계 자문',
          'AI 감사로 체계적이고 효율적인 감사',
          '오류 감소로 고객 신뢰도 향상'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육으로 회계의 미래를 볼 수 있게 되었습니다. AI 회계 시스템으로 업무가 훨씬 효율적으로 되었어요.",
        author: "이회계",
        position: "대표회계사",
        company: "(주)스마트어카운팅"
      },
      followUpResults: [
        { metric: '서비스 확장', achievement: 'AI 회계 자문 서비스 출시' },
        { metric: '고객사 확대', achievement: '신규 고객사 60곳 확보' },
        { metric: '기술 혁신', achievement: '회계AI 특허 7건 출원' }
      ],
      tags: ['회계서비스', 'AI회계', 'ChatGPT', '자동화']
    },

    // 건설업 2개
    'construction-aicamp-smart-construction': {
      id: 'construction-aicamp-smart-construction',
      category: 'construction',
      industry: '건설업',
      companyName: '(주)스마트건설',
      title: 'AI 건설 관리로 공사 기간 28% 단축 및 안전사고 85% 감소',
      subtitle: 'IoT + AI 안전관리 + BIM 모델링으로 스마트 건설 현장 구축',
      description: 'AICAMP 건설AI 교육과 IoT 센서 구축, AI 안전관리 시스템으로 스마트 건설 실현',
      icon: Building2,
      color: 'orange',
      heroImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=600&fit=crop',
      companyInfo: { industry: '건설업', employees: '456명', revenue: '연매출 850억원', location: '서울 강남구' },
      challenges: [
        { title: '공사 기간 지연', description: '비효율적 공정 관리로 인한 지연', impact: '평균 6개월 지연' },
        { title: '안전사고 발생', description: '안전 관리 부족으로 인한 사고', impact: '연간 15건 사고' },
        { title: '품질 관리 어려움', description: '현장 품질 관리의 한계', impact: '품질 불량률 12%' }
      ],
      curriculum: {
        basic: [
          { title: '건설AI 기초', duration: '8시간', description: 'AI 건설, IoT 센서 기초' },
          { title: 'BIM 모델링', duration: '12시간', description: '3D 모델링, 공정 시뮬레이션' },
          { title: '안전 관리', duration: '8시간', description: 'AI 안전관리, 위험 예측' }
        ],
        advanced: [
          { title: 'IoT 건설 현장', duration: '20시간', description: '센서 네트워크, 실시간 모니터링' },
          { title: 'AI 안전관리', duration: '16시간', description: '머신러닝, 사고 예측' },
          { title: '공정 최적화', duration: '12시간', description: 'AI 공정 관리, 일정 최적화' }
        ],
        executive: [
          { title: '스마트 건설 전략', duration: '4시간', description: '디지털 건설 로드맵' },
          { title: '안전 문화 구축', duration: '4시간', description: '안전 중심 문화' },
          { title: '품질 관리 혁신', duration: '4시간', description: 'AI 품질관리' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 건설AI 교육',
          duration: '3주 (28시간)',
          activities: ['건설AI 기초 교육', 'BIM 모델링 실습', '안전관리 워크숍'],
          results: ['건설AI 이해도 90% 향상', '참여율 88%']
        },
        {
          phase: '2단계: 스마트 건설 시스템',
          duration: '4주 (48시간)',
          activities: ['IoT 센서 네트워크 구축', 'AI 안전관리 시스템', 'BIM 공정 관리'],
          results: ['공사 기간 28% 단축', '안전사고 85% 감소']
        },
        {
          phase: '3단계: 건설 혁신 실현',
          duration: '1주 (12시간)',
          activities: ['시스템 도입', '현장 작업자 교육', '성과 측정'],
          results: ['품질 불량률 3%', '작업자 만족도 92%']
        }
      ],
      results: {
        quantitative: [
          { metric: '공사 기간', before: '18개월', after: '12.96개월', improvement: '28% 단축' },
          { metric: '안전사고', before: '15건', after: '2.25건', improvement: '85% 감소' },
          { metric: '품질 불량률', before: '12%', after: '3%', improvement: '75% 감소' },
          { metric: '작업자 만족도', before: '65%', after: '92%', improvement: '27%p 향상' }
        ],
        financial: [
          { item: '공사 기간 단축', amount: '연간 120억원' },
          { item: '안전사고 비용 절감', amount: '연간 45억원' },
          { item: '품질 개선 효과', amount: '연간 35억원' },
          { item: 'ROI', amount: '680%' }
        ],
        qualitative: [
          'AI 안전관리로 작업자 안전 보장',
          'BIM 모델링으로 정확한 공정 관리',
          'IoT 센서로 실시간 현장 모니터링',
          '스마트 건설로 업계 선도적 위치 확보'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육으로 건설의 미래를 볼 수 있게 되었습니다. AI 건설 시스템으로 안전하고 효율적인 현장을 만들 수 있었어요.",
        author: "김건설",
        position: "건설팀장",
        company: "(주)스마트건설"
      },
      followUpResults: [
        { metric: '기술 혁신', achievement: '스마트 건설 특허 12건 출원' },
        { metric: '업계 인정', achievement: '우수 건설사 인증 획득' },
        { metric: '사업 확장', achievement: '신규 프로젝트 25건 수주' }
      ],
      tags: ['건설업', 'AI건설', 'IoT', 'BIM']
    },

    'construction-aicamp-precision-engineering': {
      id: 'construction-aicamp-precision-engineering',
      category: 'construction',
      industry: '건설업',
      companyName: '(주)정밀건설테크',
      title: 'AI 정밀측량으로 시공 정확도 95% 달성 및 재시공률 78% 감소',
      subtitle: 'Computer Vision + AI 측량 + 3D 스캐닝으로 정밀 건설 실현',
      description: 'AICAMP 정밀건설 교육과 AI 측량 시스템 구축으로 정밀하고 효율적인 건설 실현',
      icon: Ruler,
      color: 'blue',
      heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=600&fit=crop',
      companyInfo: { industry: '정밀건설', employees: '234명', revenue: '연매출 420억원', location: '경기도 성남' },
      challenges: [
        { title: '시공 정확도 저하', description: '수작업 측량으로 인한 오차', impact: '정확도 75%' },
        { title: '재시공 발생', description: '측량 오차로 인한 재시공', impact: '재시공률 25%' },
        { title: '측량 시간 과다', description: '전통적 측량 방식의 한계', impact: '측량 시간 과다' }
      ],
      curriculum: {
        basic: [
          { title: '정밀건설 기초', duration: '8시간', description: 'AI 정밀건설, Computer Vision' },
          { title: '3D 스캐닝', duration: '12시간', description: '3D 스캐너, 포인트 클라우드' },
          { title: '측량 자동화', duration: '8시간', description: 'AI 측량, 자동화 도구' }
        ],
        advanced: [
          { title: 'Computer Vision 측량', duration: '20시간', description: '이미지 처리, 객체 감지' },
          { title: 'AI 정밀측량', duration: '16시간', description: '머신러닝, 정밀도 향상' },
          { title: '3D 모델링', duration: '12시간', description: 'BIM, 시뮬레이션' }
        ],
        executive: [
          { title: '정밀건설 전략', duration: '4시간', description: '정밀도 중심 건설' },
          { title: '품질 관리 혁신', duration: '4시간', description: 'AI 품질관리' },
          { title: '기술 경쟁력', duration: '4시간', description: '정밀 기술 확보' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 정밀건설 교육',
          duration: '3주 (28시간)',
          activities: ['정밀건설 기초 교육', '3D 스캐닝 실습', 'AI 측량 워크숍'],
          results: ['정밀건설 이해도 92% 향상', '참여율 90%']
        },
        {
          phase: '2단계: AI 정밀측량 시스템',
          duration: '4주 (48시간)',
          activities: ['Computer Vision 측량 시스템', 'AI 정밀측량', '3D 모델링'],
          results: ['시공 정확도 95% 달성', '재시공률 78% 감소']
        },
        {
          phase: '3단계: 정밀건설 혁신',
          duration: '1주 (12시간)',
          activities: ['시스템 도입', '기술자 교육', '성과 측정'],
          results: ['측량 시간 70% 단축', '품질 만족도 96%']
        }
      ],
      results: {
        quantitative: [
          { metric: '시공 정확도', before: '75%', after: '95%', improvement: '20%p 향상' },
          { metric: '재시공률', before: '25%', after: '5.5%', improvement: '78% 감소' },
          { metric: '측량 시간', before: '8시간', after: '2.4시간', improvement: '70% 단축' },
          { metric: '품질 만족도', before: '68%', after: '96%', improvement: '28%p 향상' }
        ],
        financial: [
          { item: '재시공 비용 절감', amount: '연간 85억원' },
          { item: '측량 효율화', amount: '연간 35억원' },
          { item: '품질 향상 효과', amount: '연간 28억원' },
          { item: 'ROI', amount: '720%' }
        ],
        qualitative: [
          'AI 정밀측량으로 정확한 시공 실현',
          'Computer Vision으로 빠른 측량',
          '3D 스캐닝으로 정밀한 모델링',
          '정밀건설로 업계 경쟁력 확보'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육으로 정밀건설의 가능성을 깨달았습니다. AI 측량 시스템으로 정확도가 크게 향상되었어요.",
        author: "박정밀",
        position: "정밀측량팀장",
        company: "(주)정밀건설테크"
      },
      followUpResults: [
        { metric: '기술 특허', achievement: '정밀측량 특허 8건 출원' },
        { metric: '업계 인정', achievement: '정밀건설 인증 획득' },
        { metric: '사업 확장', achievement: '고정밀 프로젝트 15건 수주' }
      ],
      tags: ['건설업', '정밀건설', 'Computer Vision', '3D스캐닝']
    },

    // 금융업 2개
    'finance-aicamp-risk-management': {
      id: 'finance-aicamp-risk-management',
      category: 'finance',
      industry: '금융업',
      companyName: '(주)스마트금융',
      title: 'AI 리스크 관리로 부실채권률 65% 감소 및 수익률 28% 향상',
      subtitle: 'ML + AI 신용평가 + 실시간 모니터링으로 스마트 금융 서비스',
      description: 'AICAMP 금융AI 교육과 AI 리스크 관리 시스템 구축으로 안전하고 수익성 높은 금융 서비스 실현',
      icon: Shield,
      color: 'green',
      heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop',
      companyInfo: { industry: '금융업', employees: '345명', revenue: '연매출 650억원', location: '서울 강남구' },
      challenges: [
        { title: '부실채권 증가', description: '전통적 신용평가의 한계', impact: '부실채권률 8%' },
        { title: '리스크 관리 부족', description: '실시간 리스크 모니터링 부족', impact: '손실 위험 증가' },
        { title: '수익률 저하', description: '비효율적 자산 관리', impact: '수익률 5%' }
      ],
      curriculum: {
        basic: [
          { title: '금융AI 기초', duration: '8시간', description: 'AI 금융, ML 기초' },
          { title: '신용평가 모델', duration: '12시간', description: '신용평가 알고리즘' },
          { title: '리스크 관리', duration: '8시간', description: 'AI 리스크 관리' }
        ],
        advanced: [
          { title: 'ML 신용평가', duration: '20시간', description: '머신러닝, 신용점수 예측' },
          { title: 'AI 리스크 모니터링', duration: '16시간', description: '실시간 모니터링, 알람' },
          { title: '포트폴리오 최적화', duration: '12시간', description: '자산 배분, 수익 최적화' }
        ],
        executive: [
          { title: '금융AI 전략', duration: '4시간', description: '디지털 금융 로드맵' },
          { title: '규제 대응', duration: '4시간', description: '금융 규제, 컴플라이언스' },
          { title: '리스크 관리 전략', duration: '4시간', description: '통합 리스크 관리' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 금융AI 교육',
          duration: '3주 (28시간)',
          activities: ['금융AI 기초 교육', '신용평가 모델 실습', '리스크 관리 워크숍'],
          results: ['금융AI 이해도 88% 향상', '참여율 92%']
        },
        {
          phase: '2단계: AI 리스크 시스템',
          duration: '4주 (48시간)',
          activities: ['ML 신용평가 시스템', 'AI 리스크 모니터링', '포트폴리오 최적화'],
          results: ['부실채권률 65% 감소', '수익률 28% 향상']
        },
        {
          phase: '3단계: 금융 혁신 실현',
          duration: '1주 (12시간)',
          activities: ['시스템 도입', '직원 교육', '성과 측정'],
          results: ['리스크 관리 효율성 85%', '고객 만족도 94%']
        }
      ],
      results: {
        quantitative: [
          { metric: '부실채권률', before: '8%', after: '2.8%', improvement: '65% 감소' },
          { metric: '수익률', before: '5%', after: '33%', improvement: '28%p 향상' },
          { metric: '리스크 관리 효율성', before: '60%', after: '85%', improvement: '25%p 향상' },
          { metric: '고객 만족도', before: '72%', after: '94%', improvement: '22%p 향상' }
        ],
        financial: [
          { item: '부실채권 비용 절감', amount: '연간 180억원' },
          { item: '수익률 향상 효과', amount: '연간 120억원' },
          { item: '리스크 관리 효율화', amount: '연간 65억원' },
          { item: 'ROI', amount: '780%' }
        ],
        qualitative: [
          'AI 신용평가로 정확한 리스크 평가',
          '실시간 모니터링으로 신속한 대응',
          '포트폴리오 최적화로 수익성 향상',
          '안전하고 수익성 높은 금융 서비스'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육으로 금융의 미래를 볼 수 있게 되었습니다. AI 리스크 관리로 안전하고 수익성 높은 서비스를 제공할 수 있게 되었어요.",
        author: "이금융",
        position: "리스크관리팀장",
        company: "(주)스마트금융"
      },
      followUpResults: [
        { metric: '서비스 확장', achievement: 'AI 금융 서비스 출시' },
        { metric: '규제 승인', achievement: '금융위원회 인증 획득' },
        { metric: '고객사 확대', achievement: '신규 고객 5만명' }
      ],
      tags: ['금융업', 'AI금융', '리스크관리', 'ML']
    },

    'finance-aicamp-digital-banking': {
      id: 'finance-aicamp-digital-banking',
      category: 'finance',
      industry: '금융업',
      companyName: '(주)디지털뱅크',
      title: 'AI 디지털 뱅킹으로 고객 만족도 96% 달성 및 운영비용 45% 절감',
      subtitle: 'ChatGPT + AI 챗봇 + 개인화 서비스로 스마트 뱅킹 실현',
      description: 'AICAMP 디지털뱅킹 교육과 AI 고객 서비스 시스템 구축으로 편리하고 개인화된 뱅킹 서비스 실현',
      icon: CreditCard,
      color: 'blue',
      heroImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=600&fit=crop',
      companyInfo: { industry: '디지털뱅킹', employees: '234명', revenue: '연매출 380억원', location: '서울 강남구' },
      challenges: [
        { title: '고객 서비스 부족', description: '24시간 고객 응대 부족', impact: '고객 만족도 65%' },
        { title: '운영비용 증가', description: '전통적 뱅킹 방식의 한계', impact: '운영비용 15% 증가' },
        { title: '개인화 부족', description: '일괄 서비스로 인한 개인화 부족', impact: '고객 이탈률 20%' }
      ],
      curriculum: {
        basic: [
          { title: '디지털뱅킹 기초', duration: '8시간', description: 'AI 뱅킹, ChatGPT 활용' },
          { title: '고객 서비스 AI', duration: '12시간', description: 'AI 챗봇, 고객 응대' },
          { title: '개인화 서비스', duration: '8시간', description: '고객 맞춤 서비스' }
        ],
        advanced: [
          { title: 'AI 챗봇 구축', duration: '20시간', description: '자연어 처리, 대화 시스템' },
          { title: '개인화 알고리즘', duration: '16시간', description: '고객 행동 분석, 맞춤 서비스' },
          { title: '모바일 뱅킹', duration: '12시간', description: '앱 개발, UX/UI' }
        ],
        executive: [
          { title: '디지털뱅킹 전략', duration: '4시간', description: '디지털 전환 로드맵' },
          { title: '고객 경험 혁신', duration: '4시간', description: 'CX 전략' },
          { title: '규제 대응', duration: '4시간', description: '금융 규제, 보안' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 디지털뱅킹 교육',
          duration: '3주 (28시간)',
          activities: ['디지털뱅킹 기초 교육', 'AI 챗봇 실습', '개인화 서비스 워크숍'],
          results: ['디지털뱅킹 이해도 90% 향상', '참여율 92%']
        },
        {
          phase: '2단계: AI 뱅킹 시스템',
          duration: '4주 (48시간)',
          activities: ['AI 챗봇 시스템 구축', '개인화 알고리즘', '모바일 뱅킹 앱'],
          results: ['고객 만족도 96% 달성', '운영비용 45% 절감']
        },
        {
          phase: '3단계: 뱅킹 혁신 실현',
          duration: '1주 (12시간)',
          activities: ['시스템 도입', '직원 교육', '고객 피드백 수집'],
          results: ['고객 이탈률 5%', '신규 고객 3만명']
        }
      ],
      results: {
        quantitative: [
          { metric: '고객 만족도', before: '65%', after: '96%', improvement: '31%p 향상' },
          { metric: '운영비용', before: '100%', after: '55%', improvement: '45% 절감' },
          { metric: '고객 이탈률', before: '20%', after: '5%', improvement: '75% 감소' },
          { metric: '신규 고객', before: '1만명', after: '4만명', improvement: '300% 증가' }
        ],
        financial: [
          { item: '운영비 절감', amount: '연간 85억원' },
          { item: '고객 유지 효과', amount: '연간 45억원' },
          { item: '신규 고객 확보', amount: '연간 65억원' },
          { item: 'ROI', amount: '650%' }
        ],
        qualitative: [
          'AI 챗봇으로 24시간 고객 응대',
          '개인화 서비스로 고객 만족도 향상',
          '모바일 뱅킹으로 편리한 서비스',
          '디지털 뱅킹으로 업계 혁신 선도'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육으로 디지털뱅킹의 미래를 볼 수 있게 되었습니다. AI 뱅킹 시스템으로 고객 서비스가 크게 향상되었어요.",
        author: "박뱅킹",
        position: "디지털뱅킹팀장",
        company: "(주)디지털뱅크"
      },
      followUpResults: [
        { metric: '서비스 확장', achievement: 'AI 투자 상담 서비스 출시' },
        { metric: '고객사 확대', achievement: '신규 고객 10만명' },
        { metric: '기술 혁신', achievement: '뱅킹AI 특허 8건 출원' }
      ],
      tags: ['금융업', '디지털뱅킹', 'AI챗봇', '개인화']
    },

    // 통신업 2개
    'telecom-aicamp-network-optimization': {
      id: 'telecom-aicamp-network-optimization',
      category: 'telecom',
      industry: '통신업',
      companyName: '(주)스마트텔레콤',
      title: 'AI 네트워크 최적화로 서비스 품질 92% 향상 및 고장률 78% 감소',
      subtitle: 'ML + AI 예측정비 + 실시간 모니터링으로 스마트 네트워크 구축',
      description: 'AICAMP 통신AI 교육과 AI 네트워크 관리 시스템 구축으로 안정적이고 고품질 통신 서비스 실현',
      icon: Wifi,
      color: 'purple',
      heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop',
      companyInfo: { industry: '통신업', employees: '567명', revenue: '연매출 1200억원', location: '서울 강남구' },
      challenges: [
        { title: '네트워크 고장', description: '예측 불가능한 네트워크 고장', impact: '월평균 25건 고장' },
        { title: '서비스 품질 저하', description: '네트워크 혼잡으로 인한 품질 저하', impact: '품질 만족도 68%' },
        { title: '유지보수 비용', description: '반응형 유지보수로 인한 비용 증가', impact: '유지보수 비용 20% 증가' }
      ],
      curriculum: {
        basic: [
          { title: '통신AI 기초', duration: '8시간', description: 'AI 통신, 네트워크 기초' },
          { title: '네트워크 모니터링', duration: '12시간', description: '실시간 모니터링, 데이터 수집' },
          { title: '예측정비', duration: '8시간', description: 'AI 예측정비, 고장 예측' }
        ],
        advanced: [
          { title: 'ML 네트워크 최적화', duration: '20시간', description: '머신러닝, 네트워크 최적화' },
          { title: 'AI 예측정비', duration: '16시간', description: '고장 예측, 예방정비' },
          { title: '실시간 분석', duration: '12시간', description: '실시간 데이터 분석, 대응' }
        ],
        executive: [
          { title: '통신AI 전략', duration: '4시간', description: '스마트 네트워크 로드맵' },
          { title: '서비스 품질 관리', duration: '4시간', description: 'QoS 관리' },
          { title: '고객 만족도 향상', duration: '4시간', description: '고객 중심 서비스' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 통신AI 교육',
          duration: '3주 (28시간)',
          activities: ['통신AI 기초 교육', '네트워크 모니터링 실습', '예측정비 워크숍'],
          results: ['통신AI 이해도 88% 향상', '참여율 90%']
        },
        {
          phase: '2단계: AI 네트워크 시스템',
          duration: '4주 (48시간)',
          activities: ['ML 네트워크 최적화', 'AI 예측정비 시스템', '실시간 분석'],
          results: ['서비스 품질 92% 향상', '고장률 78% 감소']
        },
        {
          phase: '3단계: 통신 혁신 실현',
          duration: '1주 (12시간)',
          activities: ['시스템 도입', '엔지니어 교육', '성과 측정'],
          results: ['고객 만족도 94%', '유지보수 비용 35% 절감']
        }
      ],
      results: {
        quantitative: [
          { metric: '서비스 품질', before: '68%', after: '92%', improvement: '24%p 향상' },
          { metric: '네트워크 고장', before: '25건', after: '5.5건', improvement: '78% 감소' },
          { metric: '유지보수 비용', before: '100%', after: '65%', improvement: '35% 절감' },
          { metric: '고객 만족도', before: '72%', after: '94%', improvement: '22%p 향상' }
        ],
        financial: [
          { item: '유지보수 비용 절감', amount: '연간 180억원' },
          { item: '서비스 품질 향상', amount: '연간 120억원' },
          { item: '고객 유지 효과', amount: '연간 85억원' },
          { item: 'ROI', amount: '720%' }
        ],
        qualitative: [
          'AI 예측정비로 안정적인 네트워크 운영',
          '실시간 모니터링으로 신속한 대응',
          'ML 최적화로 효율적인 네트워크 관리',
          '고품질 통신 서비스로 고객 만족도 향상'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육으로 통신의 미래를 볼 수 있게 되었습니다. AI 네트워크 시스템으로 서비스 품질이 크게 향상되었어요.",
        author: "김통신",
        position: "네트워크팀장",
        company: "(주)스마트텔레콤"
      },
      followUpResults: [
        { metric: '기술 혁신', achievement: '통신AI 특허 15건 출원' },
        { metric: '서비스 확장', achievement: '5G 네트워크 최적화' },
        { metric: '고객사 확대', achievement: '신규 고객 50만명' }
      ],
      tags: ['통신업', 'AI통신', '네트워크최적화', 'ML']
    },

    'telecom-aicamp-customer-insights': {
      id: 'telecom-aicamp-customer-insights',
      category: 'telecom',
      industry: '통신업',
      companyName: '(주)고객인사이트텔레콤',
      title: 'AI 고객 인사이트로 고객 이탈률 72% 감소 및 ARPU 35% 향상',
      subtitle: 'ChatGPT + 고객 행동 분석 + 개인화 마케팅으로 스마트 고객 관리',
      description: 'AICAMP 고객인사이트 교육과 AI 고객 분석 시스템 구축으로 개인화된 통신 서비스 실현',
      icon: Users,
      color: 'indigo',
      heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
      companyInfo: { industry: '통신업', employees: '345명', revenue: '연매출 850억원', location: '서울 강남구' },
      challenges: [
        { title: '고객 이탈률 증가', description: '개인화 부족으로 인한 고객 이탈', impact: '이탈률 25%' },
        { title: 'ARPU 저하', description: '일괄 서비스로 인한 수익성 저하', impact: 'ARPU 5만원' },
        { title: '마케팅 효율성', description: '비효율적 마케팅으로 인한 비용 증가', impact: '마케팅 ROI 120%' }
      ],
      curriculum: {
        basic: [
          { title: '고객인사이트 기초', duration: '8시간', description: 'AI 고객 분석, ChatGPT 활용' },
          { title: '고객 행동 분석', duration: '12시간', description: '데이터 분석, 패턴 파악' },
          { title: '개인화 마케팅', duration: '8시간', description: '고객 맞춤 마케팅' }
        ],
        advanced: [
          { title: 'AI 고객 분석', duration: '20시간', description: '머신러닝, 고객 세분화' },
          { title: 'ChatGPT 고객서비스', duration: '16시간', description: 'AI 고객 상담' },
          { title: '예측 모델링', duration: '12시간', description: '이탈 예측, 수익 예측' }
        ],
        executive: [
          { title: '고객 전략', duration: '4시간', description: '고객 중심 전략' },
          { title: '마케팅 혁신', duration: '4시간', description: 'AI 마케팅 전략' },
          { title: '수익성 향상', duration: '4시간', description: 'ARPU 최적화' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 고객인사이트 교육',
          duration: '3주 (28시간)',
          activities: ['고객인사이트 기초 교육', '고객 행동 분석 실습', '개인화 마케팅 워크숍'],
          results: ['고객인사이트 이해도 90% 향상', '참여율 92%']
        },
        {
          phase: '2단계: AI 고객 분석 시스템',
          duration: '4주 (48시간)',
          activities: ['AI 고객 분석 시스템', 'ChatGPT 고객서비스', '예측 모델링'],
          results: ['고객 이탈률 72% 감소', 'ARPU 35% 향상']
        },
        {
          phase: '3단계: 고객 혁신 실현',
          duration: '1주 (12시간)',
          activities: ['시스템 도입', '마케팅팀 교육', '성과 측정'],
          results: ['고객 만족도 96%', '마케팅 ROI 280%']
        }
      ],
      results: {
        quantitative: [
          { metric: '고객 이탈률', before: '25%', after: '7%', improvement: '72% 감소' },
          { metric: 'ARPU', before: '5만원', after: '6.75만원', improvement: '35% 향상' },
          { metric: '마케팅 ROI', before: '120%', after: '280%', improvement: '133% 향상' },
          { metric: '고객 만족도', before: '68%', after: '96%', improvement: '28%p 향상' }
        ],
        financial: [
          { item: '고객 유지 효과', amount: '연간 180억원' },
          { item: 'ARPU 향상 효과', amount: '연간 120억원' },
          { item: '마케팅 효율화', amount: '연간 85억원' },
          { item: 'ROI', amount: '750%' }
        ],
        qualitative: [
          'AI 고객 분석으로 정확한 인사이트 도출',
          '개인화 마케팅으로 고객 만족도 향상',
          'ChatGPT 활용으로 효율적인 고객 서비스',
          '예측 모델링으로 선제적 고객 관리'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육으로 고객의 마음을 읽을 수 있게 되었습니다. AI 고객 분석으로 이탈률이 크게 감소했어요.",
        author: "박고객",
        position: "고객관리팀장",
        company: "(주)고객인사이트텔레콤"
      },
      followUpResults: [
        { metric: '서비스 확장', achievement: 'AI 고객 서비스 출시' },
        { metric: '고객사 확대', achievement: '신규 고객 30만명' },
        { metric: '기술 혁신', achievement: '고객인사이트 특허 10건 출원' }
      ],
      tags: ['통신업', '고객인사이트', 'ChatGPT', '개인화']
    },

    // 미디어업 2개
    'media-aicamp-content-automation': {
      id: 'media-aicamp-content-automation',
      category: 'media',
      industry: '미디어업',
      companyName: '(주)스마트미디어',
      title: 'AI 콘텐츠 자동화로 제작 시간 75% 단축 및 시청률 42% 향상',
      subtitle: 'ChatGPT + AI 편집 + 자동화 제작으로 스마트 미디어 제작',
      description: 'AICAMP 미디어AI 교육과 AI 콘텐츠 제작 시스템 구축으로 효율적이고 창의적인 미디어 제작 실현',
      icon: Video,
      color: 'red',
      heroImage: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=1200&h=600&fit=crop',
      companyInfo: { industry: '미디어업', employees: '234명', revenue: '연매출 450억원', location: '서울 강남구' },
      challenges: [
        { title: '제작 시간 과다', description: '수작업 제작으로 인한 시간 소요', impact: '월 300시간 소요' },
        { title: '시청률 저하', description: '콘텐츠 품질 저하로 인한 시청률 감소', impact: '시청률 3%' },
        { title: '제작비 증가', description: '인건비 증가로 인한 제작비 상승', impact: '제작비 25% 증가' }
      ],
      curriculum: {
        basic: [
          { title: '미디어AI 기초', duration: '8시간', description: 'AI 미디어, ChatGPT 활용' },
          { title: '콘텐츠 자동화', duration: '12시간', description: '자동화 제작, 템플릿' },
          { title: 'AI 편집', duration: '8시간', description: 'AI 비디오 편집, 자동화' }
        ],
        advanced: [
          { title: 'ChatGPT 콘텐츠', duration: '20시간', description: 'AI 스크립트 작성, 자동화' },
          { title: 'AI 비디오 편집', duration: '16시간', description: '자동 편집, 효과 적용' },
          { title: '개인화 콘텐츠', duration: '12시간', description: '시청자 맞춤 콘텐츠' }
        ],
        executive: [
          { title: '미디어AI 전략', duration: '4시간', description: '디지털 미디어 로드맵' },
          { title: '콘텐츠 전략', duration: '4시간', description: 'AI 콘텐츠 전략' },
          { title: '수익성 향상', duration: '4시간', description: '광고 수익 최적화' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 미디어AI 교육',
          duration: '3주 (28시간)',
          activities: ['미디어AI 기초 교육', '콘텐츠 자동화 실습', 'AI 편집 워크숍'],
          results: ['미디어AI 이해도 88% 향상', '참여율 90%']
        },
        {
          phase: '2단계: AI 콘텐츠 시스템',
          duration: '4주 (48시간)',
          activities: ['ChatGPT 콘텐츠 시스템', 'AI 비디오 편집', '개인화 콘텐츠'],
          results: ['제작 시간 75% 단축', '시청률 42% 향상']
        },
        {
          phase: '3단계: 미디어 혁신 실현',
          duration: '1주 (12시간)',
          activities: ['시스템 도입', '제작팀 교육', '성과 측정'],
          results: ['제작비 40% 절감', '시청자 만족도 94%']
        }
      ],
      results: {
        quantitative: [
          { metric: '제작 시간', before: '300시간', after: '75시간', improvement: '75% 단축' },
          { metric: '시청률', before: '3%', after: '4.26%', improvement: '42% 향상' },
          { metric: '제작비', before: '100%', after: '60%', improvement: '40% 절감' },
          { metric: '시청자 만족도', before: '65%', after: '94%', improvement: '29%p 향상' }
        ],
        financial: [
          { item: '제작비 절감', amount: '연간 120억원' },
          { item: '시청률 향상 효과', amount: '연간 85억원' },
          { item: '광고 수익 증대', amount: '연간 65억원' },
          { item: 'ROI', amount: '680%' }
        ],
        qualitative: [
          'AI 콘텐츠 자동화로 효율적인 제작',
          'ChatGPT 활용으로 창의적인 콘텐츠',
          '개인화 콘텐츠로 시청자 만족도 향상',
          '스마트 미디어로 업계 혁신 선도'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육으로 미디어의 미래를 볼 수 있게 되었습니다. AI 콘텐츠 시스템으로 제작이 훨씬 효율적으로 되었어요.",
        author: "김미디어",
        position: "제작팀장",
        company: "(주)스마트미디어"
      },
      followUpResults: [
        { metric: '서비스 확장', achievement: 'AI 콘텐츠 플랫폼 출시' },
        { metric: '고객사 확대', achievement: '신규 고객사 20곳' },
        { metric: '기술 혁신', achievement: '미디어AI 특허 12건 출원' }
      ],
      tags: ['미디어업', 'AI미디어', 'ChatGPT', '자동화']
    },

    'media-aicamp-personalization': {
      id: 'media-aicamp-personalization',
      category: 'media',
      industry: '미디어업',
      companyName: '(주)개인화미디어',
      title: 'AI 개인화 추천으로 시청 시간 68% 증가 및 광고 수익 85% 향상',
      subtitle: 'ML + AI 추천 엔진 + 개인화 마케팅으로 스마트 미디어 서비스',
      description: 'AICAMP 개인화미디어 교육과 AI 추천 시스템 구축으로 개인화된 미디어 서비스 실현',
      icon: Tv,
      color: 'purple',
      heroImage: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&h=600&fit=crop',
      companyInfo: { industry: '미디어업', employees: '189명', revenue: '연매출 320억원', location: '서울 강남구' },
      challenges: [
        { title: '시청 시간 감소', description: '일괄 콘텐츠로 인한 시청 시간 감소', impact: '평균 1시간' },
        { title: '광고 수익 저하', description: '비효율적 광고로 인한 수익 감소', impact: '광고 수익 5억원' },
        { title: '고객 이탈', description: '개인화 부족으로 인한 고객 이탈', impact: '이탈률 30%' }
      ],
      curriculum: {
        basic: [
          { title: '개인화미디어 기초', duration: '8시간', description: 'AI 개인화, ML 기초' },
          { title: '추천 시스템', duration: '12시간', description: '추천 알고리즘, 협업 필터링' },
          { title: '개인화 마케팅', duration: '8시간', description: '고객 맞춤 마케팅' }
        ],
        advanced: [
          { title: 'ML 추천 엔진', duration: '20시간', description: '머신러닝, 콘텐츠 추천' },
          { title: 'AI 개인화', duration: '16시간', description: '개인화 알고리즘, 맞춤 서비스' },
          { title: '광고 최적화', duration: '12시간', description: 'AI 광고, 수익 최적화' }
        ],
        executive: [
          { title: '개인화 전략', duration: '4시간', description: '개인화 미디어 로드맵' },
          { title: '수익성 향상', duration: '4시간', description: '광고 수익 최적화' },
          { title: '고객 경험', duration: '4시간', description: 'CX 전략' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 개인화미디어 교육',
          duration: '3주 (28시간)',
          activities: ['개인화미디어 기초 교육', '추천 시스템 실습', '개인화 마케팅 워크숍'],
          results: ['개인화미디어 이해도 90% 향상', '참여율 92%']
        },
        {
          phase: '2단계: AI 추천 시스템',
          duration: '4주 (48시간)',
          activities: ['ML 추천 엔진 구축', 'AI 개인화 시스템', '광고 최적화'],
          results: ['시청 시간 68% 증가', '광고 수익 85% 향상']
        },
        {
          phase: '3단계: 개인화 혁신 실현',
          duration: '1주 (12시간)',
          activities: ['시스템 도입', '마케팅팀 교육', '성과 측정'],
          results: ['고객 이탈률 8%', '고객 만족도 96%']
        }
      ],
      results: {
        quantitative: [
          { metric: '시청 시간', before: '1시간', after: '1.68시간', improvement: '68% 증가' },
          { metric: '광고 수익', before: '5억원', after: '9.25억원', improvement: '85% 향상' },
          { metric: '고객 이탈률', before: '30%', after: '8%', improvement: '72% 감소' },
          { metric: '고객 만족도', before: '65%', after: '96%', improvement: '31%p 향상' }
        ],
        financial: [
          { item: '광고 수익 증대', amount: '연간 85억원' },
          { item: '고객 유지 효과', amount: '연간 45억원' },
          { item: '시청 시간 증가', amount: '연간 35억원' },
          { item: 'ROI', amount: '720%' }
        ],
        qualitative: [
          'AI 추천 엔진으로 개인화된 콘텐츠 제공',
          '개인화 마케팅으로 광고 효율성 향상',
          '고객 맞춤 서비스로 만족도 증대',
          '스마트 미디어로 업계 경쟁력 확보'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육으로 개인화의 진정한 가치를 알게 되었습니다. AI 추천 시스템으로 시청자들이 더 오래 시청하게 되었어요.",
        author: "박개인화",
        position: "개인화팀장",
        company: "(주)개인화미디어"
      },
      followUpResults: [
        { metric: '서비스 확장', achievement: 'AI 개인화 플랫폼 출시' },
        { metric: '고객사 확대', achievement: '신규 고객 50만명' },
        { metric: '기술 혁신', achievement: '개인화AI 특허 8건 출원' }
      ],
      tags: ['미디어업', '개인화미디어', 'ML', '추천엔진']
    },

    // 에너지업 2개
    'energy-aicamp-smart-grid': {
      id: 'energy-aicamp-smart-grid',
      category: 'energy',
      industry: '에너지업',
      companyName: '(주)스마트에너지',
      title: 'AI 스마트그리드로 에너지 효율성 45% 향상 및 운영비용 38% 절감',
      subtitle: 'IoT + AI 예측 + 실시간 모니터링으로 스마트 에너지 관리',
      description: 'AICAMP 에너지AI 교육과 AI 스마트그리드 시스템 구축으로 효율적이고 친환경적인 에너지 관리 실현',
      icon: Zap,
      color: 'yellow',
      heroImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=600&fit=crop',
      companyInfo: { industry: '에너지업', employees: '456명', revenue: '연매출 850억원', location: '서울 강남구' },
      challenges: [
        { title: '에너지 효율성 저하', description: '비효율적 에너지 관리', impact: '효율성 65%' },
        { title: '운영비용 증가', description: '전통적 에너지 관리의 한계', impact: '운영비용 20% 증가' },
        { title: '예측 부족', description: '수요 예측 부족으로 인한 비효율', impact: '예측 정확도 60%' }
      ],
      curriculum: {
        basic: [
          { title: '에너지AI 기초', duration: '8시간', description: 'AI 에너지, IoT 센서 기초' },
          { title: '스마트그리드', duration: '12시간', description: '스마트그리드 이론, 실시간 모니터링' },
          { title: '에너지 예측', duration: '8시간', description: 'AI 수요 예측, 효율성 분석' }
        ],
        advanced: [
          { title: 'IoT 에너지 시스템', duration: '20시간', description: '센서 네트워크, 실시간 데이터' },
          { title: 'AI 에너지 예측', duration: '16시간', description: '머신러닝, 수요 예측' },
          { title: '스마트그리드 최적화', duration: '12시간', description: '그리드 최적화, 효율성 향상' }
        ],
        executive: [
          { title: '에너지AI 전략', duration: '4시간', description: '스마트 에너지 로드맵' },
          { title: '친환경 전략', duration: '4시간', description: '그린 에너지 전략' },
          { title: '효율성 향상', duration: '4시간', description: '에너지 효율성 최적화' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 에너지AI 교육',
          duration: '3주 (28시간)',
          activities: ['에너지AI 기초 교육', '스마트그리드 실습', '에너지 예측 워크숍'],
          results: ['에너지AI 이해도 88% 향상', '참여율 90%']
        },
        {
          phase: '2단계: AI 스마트그리드 시스템',
          duration: '4주 (48시간)',
          activities: ['IoT 에너지 시스템 구축', 'AI 에너지 예측', '스마트그리드 최적화'],
          results: ['에너지 효율성 45% 향상', '운영비용 38% 절감']
        },
        {
          phase: '3단계: 에너지 혁신 실현',
          duration: '1주 (12시간)',
          activities: ['시스템 도입', '엔지니어 교육', '성과 측정'],
          results: ['예측 정확도 92%', '고객 만족도 94%']
        }
      ],
      results: {
        quantitative: [
          { metric: '에너지 효율성', before: '65%', after: '110%', improvement: '45%p 향상' },
          { metric: '운영비용', before: '100%', after: '62%', improvement: '38% 절감' },
          { metric: '예측 정확도', before: '60%', after: '92%', improvement: '32%p 향상' },
          { metric: '고객 만족도', before: '68%', after: '94%', improvement: '26%p 향상' }
        ],
        financial: [
          { item: '운영비 절감', amount: '연간 180억원' },
          { item: '효율성 향상 효과', amount: '연간 120억원' },
          { item: '예측 정확도 향상', amount: '연간 85억원' },
          { item: 'ROI', amount: '750%' }
        ],
        qualitative: [
          'AI 스마트그리드로 효율적인 에너지 관리',
          '실시간 모니터링으로 신속한 대응',
          '친환경 에너지로 환경 보호 기여',
          '스마트 에너지로 업계 선도적 위치 확보'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육으로 에너지의 미래를 볼 수 있게 되었습니다. AI 스마트그리드로 에너지 효율성이 크게 향상되었어요.",
        author: "김에너지",
        position: "에너지관리팀장",
        company: "(주)스마트에너지"
      },
      followUpResults: [
        { metric: '기술 혁신', achievement: '스마트그리드 특허 15건 출원' },
        { metric: '서비스 확장', achievement: '전국 스마트그리드 구축' },
        { metric: '환경 인증', achievement: '친환경 에너지 인증 획득' }
      ],
      tags: ['에너지업', 'AI에너지', '스마트그리드', 'IoT']
    },

    'energy-aicamp-renewable-energy': {
      id: 'energy-aicamp-renewable-energy',
      category: 'energy',
      industry: '에너지업',
      companyName: '(주)친환경에너지',
      title: 'AI 재생에너지 관리로 발전 효율성 52% 향상 및 탄소배출 65% 감소',
      subtitle: 'ML + AI 예측 + IoT 모니터링으로 스마트 재생에너지 시스템',
      description: 'AICAMP 재생에너지AI 교육과 AI 발전 관리 시스템 구축으로 친환경적이고 효율적인 에너지 생산 실현',
      icon: Sun,
      color: 'orange',
      heroImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=600&fit=crop',
      companyInfo: { industry: '재생에너지', employees: '234명', revenue: '연매출 520억원', location: '전라남도 여수' },
      challenges: [
        { title: '발전 효율성 저하', description: '기상 조건에 따른 발전량 변동', impact: '효율성 48%' },
        { title: '탄소배출 증가', description: '전통적 발전 방식의 한계', impact: '탄소배출 100톤/년' },
        { title: '예측 부족', description: '기상 예측 부족으로 인한 비효율', impact: '예측 정확도 55%' }
      ],
      curriculum: {
        basic: [
          { title: '재생에너지AI 기초', duration: '8시간', description: 'AI 재생에너지, ML 기초' },
          { title: '기상 예측', duration: '12시간', description: '기상 데이터 분석, 예측 모델' },
          { title: '발전 최적화', duration: '8시간', description: '발전 효율성 최적화' }
        ],
        advanced: [
          { title: 'ML 기상 예측', duration: '20시간', description: '머신러닝, 기상 패턴 분석' },
          { title: 'AI 발전 관리', duration: '16시간', description: '발전량 예측, 최적화' },
          { title: 'IoT 모니터링', duration: '12시간', description: '실시간 모니터링, 데이터 수집' }
        ],
        executive: [
          { title: '재생에너지 전략', duration: '4시간', description: '친환경 에너지 로드맵' },
          { title: '탄소 중립', duration: '4시간', description: '탄소 배출 감소 전략' },
          { title: '효율성 향상', duration: '4시간', description: '발전 효율성 최적화' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 재생에너지AI 교육',
          duration: '3주 (28시간)',
          activities: ['재생에너지AI 기초 교육', '기상 예측 실습', '발전 최적화 워크숍'],
          results: ['재생에너지AI 이해도 90% 향상', '참여율 92%']
        },
        {
          phase: '2단계: AI 재생에너지 시스템',
          duration: '4주 (48시간)',
          activities: ['ML 기상 예측 시스템', 'AI 발전 관리', 'IoT 모니터링'],
          results: ['발전 효율성 52% 향상', '탄소배출 65% 감소']
        },
        {
          phase: '3단계: 친환경 혁신 실현',
          duration: '1주 (12시간)',
          activities: ['시스템 도입', '엔지니어 교육', '성과 측정'],
          results: ['예측 정확도 94%', '환경 만족도 96%']
        }
      ],
      results: {
        quantitative: [
          { metric: '발전 효율성', before: '48%', after: '100%', improvement: '52%p 향상' },
          { metric: '탄소배출', before: '100톤', after: '35톤', improvement: '65% 감소' },
          { metric: '예측 정확도', before: '55%', after: '94%', improvement: '39%p 향상' },
          { metric: '환경 만족도', before: '60%', after: '96%', improvement: '36%p 향상' }
        ],
        financial: [
          { item: '발전 효율성 향상', amount: '연간 150억원' },
          { item: '탄소배출 감소 효과', amount: '연간 85억원' },
          { item: '예측 정확도 향상', amount: '연간 65억원' },
          { item: 'ROI', amount: '780%' }
        ],
        qualitative: [
          'AI 기상 예측으로 효율적인 발전 관리',
          '친환경 에너지로 환경 보호 기여',
          '실시간 모니터링으로 안정적 운영',
          '재생에너지로 업계 선도적 위치 확보'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육으로 재생에너지의 미래를 볼 수 있게 되었습니다. AI 발전 관리로 효율성이 크게 향상되었어요.",
        author: "박재생",
        position: "발전관리팀장",
        company: "(주)친환경에너지"
      },
      followUpResults: [
        { metric: '기술 혁신', achievement: '재생에너지AI 특허 10건 출원' },
        { metric: '서비스 확장', achievement: '전국 재생에너지 발전소 구축' },
        { metric: '환경 인증', achievement: '탄소 중립 인증 획득' }
      ],
      tags: ['에너지업', '재생에너지', 'ML', 'IoT']
    },

    // 농업 2개
    'agriculture-aicamp-precision-farming': {
      id: 'agriculture-aicamp-precision-farming',
      category: 'agriculture',
      industry: '농업',
      companyName: '(주)스마트팜',
      title: 'AI 정밀농업으로 수확량 38% 증가 및 농약 사용량 72% 감소',
      subtitle: 'IoT + AI 모니터링 + 자동화 관수로 스마트팜 구축',
      description: 'AICAMP 정밀농업AI 교육과 AI 농업 관리 시스템 구축으로 효율적이고 친환경적인 농업 실현',
      icon: Leaf,
      color: 'green',
      heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=600&fit=crop',
      companyInfo: { industry: '정밀농업', employees: '89명', revenue: '연매출 180억원', location: '경기도 안성' },
      challenges: [
        { title: '수확량 저하', description: '전통적 농업 방식의 한계', impact: '수확량 100톤/년' },
        { title: '농약 과다 사용', description: '일괄 농약 살포로 인한 과다 사용', impact: '농약 사용량 50kg/년' },
        { title: '관수 비효율', description: '수작업 관수로 인한 비효율', impact: '물 사용량 과다' }
      ],
      curriculum: {
        basic: [
          { title: '정밀농업AI 기초', duration: '8시간', description: 'AI 농업, IoT 센서 기초' },
          { title: '토양 분석', duration: '12시간', description: '토양 데이터 분석, 영양분 관리' },
          { title: '기상 모니터링', duration: '8시간', description: '기상 데이터, 예측 모델' }
        ],
        advanced: [
          { title: 'IoT 농업 시스템', duration: '20시간', description: '센서 네트워크, 실시간 모니터링' },
          { title: 'AI 관수 자동화', duration: '16시간', description: '자동 관수, 최적화' },
          { title: '정밀 농약 살포', duration: '12시간', description: 'AI 농약 살포, 최적화' }
        ],
        executive: [
          { title: '정밀농업 전략', duration: '4시간', description: '스마트팜 로드맵' },
          { title: '친환경 농업', duration: '4시간', description: '지속가능한 농업' },
          { title: '수익성 향상', duration: '4시간', description: '농업 수익 최적화' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 정밀농업AI 교육',
          duration: '3주 (28시간)',
          activities: ['정밀농업AI 기초 교육', '토양 분석 실습', '기상 모니터링 워크숍'],
          results: ['정밀농업AI 이해도 88% 향상', '참여율 90%']
        },
        {
          phase: '2단계: AI 농업 시스템',
          duration: '4주 (48시간)',
          activities: ['IoT 농업 시스템 구축', 'AI 관수 자동화', '정밀 농약 살포'],
          results: ['수확량 38% 증가', '농약 사용량 72% 감소']
        },
        {
          phase: '3단계: 농업 혁신 실현',
          duration: '1주 (12시간)',
          activities: ['시스템 도입', '농부 교육', '성과 측정'],
          results: ['물 사용량 45% 절감', '농부 만족도 94%']
        }
      ],
      results: {
        quantitative: [
          { metric: '수확량', before: '100톤', after: '138톤', improvement: '38% 증가' },
          { metric: '농약 사용량', before: '50kg', after: '14kg', improvement: '72% 감소' },
          { metric: '물 사용량', before: '100%', after: '55%', improvement: '45% 절감' },
          { metric: '농부 만족도', before: '65%', after: '94%', improvement: '29%p 향상' }
        ],
        financial: [
          { item: '수확량 증가 효과', amount: '연간 85억원' },
          { item: '농약 비용 절감', amount: '연간 45억원' },
          { item: '물 비용 절감', amount: '연간 25억원' },
          { item: 'ROI', amount: '720%' }
        ],
        qualitative: [
          'AI 정밀농업으로 효율적인 작물 관리',
          '친환경 농업으로 환경 보호 기여',
          '자동화 관수로 물 자원 절약',
          '스마트팜으로 농업 혁신 선도'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육으로 농업의 미래를 볼 수 있게 되었습니다. AI 농업 시스템으로 수확량이 크게 증가했어요.",
        author: "김농부",
        position: "농장장",
        company: "(주)스마트팜"
      },
      followUpResults: [
        { metric: '기술 혁신', achievement: '정밀농업AI 특허 8건 출원' },
        { metric: '서비스 확장', achievement: '전국 스마트팜 구축' },
        { metric: '환경 인증', achievement: '친환경 농업 인증 획득' }
      ],
      tags: ['농업', '정밀농업', 'IoT', '자동화']
    },

    'agriculture-aicamp-vertical-farming': {
      id: 'agriculture-aicamp-vertical-farming',
      category: 'agriculture',
      industry: '농업',
      companyName: '(주)수직농장테크',
      title: 'AI 수직농장으로 생산성 420% 향상 및 물 사용량 85% 절감',
      subtitle: 'Computer Vision + AI 환경제어 + 자동화 수확으로 스마트 수직농장',
      description: 'AICAMP 수직농장AI 교육과 AI 환경제어 시스템 구축으로 고효율적이고 지속가능한 농업 실현',
      icon: TreePine,
      color: 'emerald',
      heroImage: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=1200&h=600&fit=crop',
      companyInfo: { industry: '수직농장', employees: '67명', revenue: '연매출 120억원', location: '서울 강남구' },
      challenges: [
        { title: '생산성 저하', description: '전통적 농업의 공간 한계', impact: '생산성 100%' },
        { title: '물 사용량 과다', description: '비효율적 관수 시스템', impact: '물 사용량 과다' },
        { title: '환경 제어 부족', description: '수동 환경 제어의 한계', impact: '생장률 저하' }
      ],
      curriculum: {
        basic: [
          { title: '수직농장AI 기초', duration: '8시간', description: 'AI 수직농장, Computer Vision' },
          { title: '환경 제어', duration: '12시간', description: '온도, 습도, 조도 제어' },
          { title: '자동화 수확', duration: '8시간', description: 'AI 수확, 자동화 시스템' }
        ],
        advanced: [
          { title: 'Computer Vision 모니터링', duration: '20시간', description: '이미지 분석, 생장 모니터링' },
          { title: 'AI 환경 제어', duration: '16시간', description: '자동 환경 제어, 최적화' },
          { title: '수확 자동화', duration: '12시간', description: '로봇 수확, 자동화' }
        ],
        executive: [
          { title: '수직농장 전략', duration: '4시간', description: '스마트 수직농장 로드맵' },
          { title: '지속가능성', duration: '4시간', description: '지속가능한 농업' },
          { title: '수익성 향상', duration: '4시간', description: '농업 수익 최적화' }
        ]
      },
      process: [
        {
          phase: '1단계: AICAMP 수직농장AI 교육',
          duration: '3주 (28시간)',
          activities: ['수직농장AI 기초 교육', '환경 제어 실습', '자동화 수확 워크숍'],
          results: ['수직농장AI 이해도 90% 향상', '참여율 92%']
        },
        {
          phase: '2단계: AI 수직농장 시스템',
          duration: '4주 (48시간)',
          activities: ['Computer Vision 모니터링', 'AI 환경 제어', '수확 자동화'],
          results: ['생산성 420% 향상', '물 사용량 85% 절감']
        },
        {
          phase: '3단계: 수직농장 혁신 실현',
          duration: '1주 (12시간)',
          activities: ['시스템 도입', '기술자 교육', '성과 측정'],
          results: ['생장률 95%', '고객 만족도 96%']
        }
      ],
      results: {
        quantitative: [
          { metric: '생산성', before: '100%', after: '520%', improvement: '420% 향상' },
          { metric: '물 사용량', before: '100%', after: '15%', improvement: '85% 절감' },
          { metric: '생장률', before: '75%', after: '95%', improvement: '20%p 향상' },
          { metric: '고객 만족도', before: '68%', after: '96%', improvement: '28%p 향상' }
        ],
        financial: [
          { item: '생산성 향상 효과', amount: '연간 180억원' },
          { item: '물 비용 절감', amount: '연간 45억원' },
          { item: '환경 제어 효율화', amount: '연간 35억원' },
          { item: 'ROI', amount: '850%' }
        ],
        qualitative: [
          'AI 수직농장으로 고효율적 농업 실현',
          'Computer Vision으로 정확한 생장 모니터링',
          '자동화 수확으로 인력 효율화',
          '지속가능한 농업으로 미래 농업 선도'
        ]
      },
      testimonial: {
        quote: "AICAMP 교육으로 수직농장의 가능성을 깨달았습니다. AI 환경제어로 생산성이 크게 향상되었어요.",
        author: "박수직",
        position: "수직농장팀장",
        company: "(주)수직농장테크"
      },
      followUpResults: [
        { metric: '기술 혁신', achievement: '수직농장AI 특허 12건 출원' },
        { metric: '서비스 확장', achievement: '전국 수직농장 구축' },
        { metric: '환경 인증', achievement: '지속가능 농업 인증 획득' }
      ],
      tags: ['농업', '수직농장', 'Computer Vision', '자동화']
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

  const IconComponent = caseData.icon || TrendingUp;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 히어로 섹션 */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={caseData.heroImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop'}
            alt={caseData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/80"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl text-white">
            <Link href="/cases" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              성공사례 목록으로
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <div>
                <Badge className="bg-white/20 text-white border-white/30 mb-2">
                  {caseData.industry}
                </Badge>
                <div className="text-white/90">{caseData.companyName}</div>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {caseData.title}
            </h1>
            <p className="text-xl text-white/90">
              {caseData.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-8 mb-8">
                <TabsTrigger value="overview">개요</TabsTrigger>
                <TabsTrigger value="curriculum">커리큘럼</TabsTrigger>
                <TabsTrigger value="recommendation">맞춤추천</TabsTrigger>
                <TabsTrigger value="process">프로세스</TabsTrigger>
                <TabsTrigger value="results">성과</TabsTrigger>
                <TabsTrigger value="visualization">시각화</TabsTrigger>
                <TabsTrigger value="comparison">비교</TabsTrigger>
                <TabsTrigger value="testimonial">후기</TabsTrigger>
              </TabsList>

              {/* 개요 탭 */}
              <TabsContent value="overview" className="space-y-8">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-600 flex items-center">
                      <Building2 className="w-6 h-6 mr-2" />
                      기업 정보
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">업종:</span>
                          <span>{caseData.companyInfo?.industry}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">직원 수:</span>
                          <span>{caseData.companyInfo?.employees}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">매출:</span>
                          <span>{caseData.companyInfo?.revenue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">위치:</span>
                          <span>{caseData.companyInfo?.location}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-red-600 flex items-center">
                      <Target className="w-6 h-6 mr-2" />
                      주요 도전과제
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {caseData.challenges?.map((challenge: any, index: number) => (
                        <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                          <h4 className="font-semibold text-red-800 mb-2">{challenge.title}</h4>
                          <p className="text-red-700 mb-2">{challenge.description}</p>
                          <p className="text-sm text-red-600 font-medium">영향: {challenge.impact}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 고도화된 커리큘럼 탭 */}
              <TabsContent value="curriculum" className="space-y-8">
                {caseData && (
                  <EnhancedCurriculumDisplay
                    caseCurriculum={{
                      caseId: caseData.id,
                      appliedCurriculum: {
                        basic: caseData.curriculum?.basic || [],
                        advanced: caseData.curriculum?.advanced || [],
                        executive: caseData.curriculum?.executive || []
                      },
                      customizations: [
                        `${caseData.industry} 특화 AI 적용 사례 중심 교육`,
                        `${caseData.companyInfo?.employees} 규모 조직 맞춤형 프로그램`,
                        '실무 적용 가능한 핸즈온 실습 중심',
                        '단계별 성과 측정 및 피드백 시스템'
                      ],
                      implementationProcess: caseData.process || [],
                      measuredOutcomes: {
                        quantitative: caseData.results?.quantitative || [],
                        qualitative: caseData.results?.qualitative || []
                      }
                    }}
                    industryType={caseData.industry}
                    companyInfo={caseData.companyInfo}
                  />
                )}
              </TabsContent>

              {/* 맞춤추천 탭 */}
              <TabsContent value="recommendation" className="space-y-8">
                {caseData && (
                  <CurriculumRecommendationEngine
                    industryType={caseData.category}
                    companySize={
                      caseData.companyInfo?.employees?.includes('156명') ? 'medium' :
                      caseData.companyInfo?.employees?.includes('89명') ? 'small' :
                      caseData.companyInfo?.employees?.includes('직원') ? 'medium' : 'medium'
                    }
                    currentAIMaturity={75} // 성공사례 기반 추정값
                    specificNeeds={caseData.tags?.slice(0, 4) || []}
                    timeline="3개월"
                  />
                )}
              </TabsContent>

              {/* 프로세스 탭 */}
              <TabsContent value="process" className="space-y-8">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-600 flex items-center">
                      <CheckCircle className="w-6 h-6 mr-2" />
                      AICAMP 적용 프로세스
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {caseData.process?.map((phase: any, index: number) => (
                        <div key={index} className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-green-800">{phase.phase}</h4>
                            <Badge variant="outline" className="border-green-400 text-green-700">
                              {phase.duration}
                            </Badge>
                          </div>
                          <div className="mb-4">
                            <h5 className="font-semibold text-green-700 mb-2">주요 활동:</h5>
                            <ul className="list-disc list-inside space-y-1 text-green-600">
                              {phase.activities?.map((activity: string, idx: number) => (
                                <li key={idx}>{activity}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-green-700 mb-2">성과:</h5>
                            <ul className="list-disc list-inside space-y-1 text-green-600">
                              {phase.results?.map((result: string, idx: number) => (
                                <li key={idx}>{result}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 성과 탭 */}
              <TabsContent value="results" className="space-y-8">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-600 flex items-center">
                      <BarChart3 className="w-6 h-6 mr-2" />
                      정량적 성과
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {caseData.results?.quantitative?.map((result: any, index: number) => (
                        <div key={index} className="bg-blue-50 p-4 rounded-lg">
                          <div className="font-semibold text-blue-900 mb-2">{result.metric}</div>
                          <div className="flex justify-between text-sm text-blue-700">
                            <span>이전: {result.before}</span>
                            <span>이후: {result.after}</span>
                          </div>
                          <div className="text-lg font-bold text-blue-600 mt-2">{result.improvement}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-600 flex items-center">
                      <DollarSign className="w-6 h-6 mr-2" />
                      재무적 성과
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {caseData.results?.financial?.map((result: any, index: number) => (
                        <div key={index} className="bg-green-50 p-4 rounded-lg">
                          <div className="font-semibold text-green-900 mb-2">{result.item}</div>
                          <div className="text-2xl font-bold text-green-600">{result.amount}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 시각화 탭 */}
              <TabsContent value="visualization">
                <CaseVisualization caseData={caseData} />
              </TabsContent>

              {/* 비교 탭 */}
              <TabsContent value="comparison">
                <CaseComparison currentCase={caseData} allCases={Object.values(caseDetails)} />
              </TabsContent>

              {/* 고객 후기 탭 */}
              <TabsContent value="testimonial">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-600 flex items-center">
                      <Quote className="w-6 h-6 mr-2" />
                      고객 후기
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-blue-50 p-8 rounded-lg">
                      <Quote className="w-10 h-10 text-blue-600 mb-4" />
                      <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
                        "{caseData.testimonial?.quote}"
                      </blockquote>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{caseData.testimonial?.author}</div>
                          <div className="text-sm text-gray-600">
                            {caseData.testimonial?.position} | {caseData.testimonial?.company}
                          </div>
                        </div>
                      </div>
                    </div>

                    {caseData.followUpResults && (
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <Calendar className="w-5 h-5 mr-2" />
                          6개월 후 추가 성과
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4">
                          {caseData.followUpResults?.map((result: any, index: number) => (
                            <div key={index} className="bg-green-50 p-4 rounded-lg">
                              <div className="font-semibold text-green-900 mb-2">{result.metric}</div>
                              <div className="text-green-700">{result.achievement}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
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
            AICAMP 맞춤형 커리큘럼으로 AI 전문가가 되어보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultation">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                무료 상담 신청
                <ChevronRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
            <Link href="/diagnosis">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                AI역량진단 받기
                <ChevronRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="mt-6">
            <p className="text-lg opacity-90">
              📞 010-9251-9743 | ✉️ hongik423@gmail.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
