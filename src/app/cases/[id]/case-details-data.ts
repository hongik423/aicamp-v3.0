import { 
  Factory, 
  CheckCircle, 
  Building2, 
  Heart, 
  GraduationCap, 
  ShoppingCart, 
  Briefcase, 
  Scale, 
  Calculator, 
  CreditCard, 
  Wifi, 
  Video, 
  Tv, 
  Sun, 
  Leaf, 
  TreePine, 
  Shield, 
  Ruler,
  Package,
  Rocket,
  BarChart3,
  Globe,
  Palette,
  Target,
  Users,
  TrendingUp
} from 'lucide-react';
import { SuccessCaseDetailsCollection } from '@/types/success-case.types';

/**
 * ⚠️ 업종별 벤치마크 성공계획 데이터 ⚠️
 * 
 * 중요 고지사항:
 * 본 데이터는 실제 성공사례가 아닌, 각 업종별로 AI + n8n 도입 시 
 * 달성 가능한 목표 성과와 구체적인 구현 계획을 제시한 벤치마크 시나리오입니다.
 * 
 * 포함 내용:
 * - 업종 특성을 반영한 예상 성과 모델
 * - AICAMP 교육 프로그램 적용 시 기대 효과  
 * - 체계적인 구현 방법론과 단계별 계획
 * - 유사 업종 벤치마킹 데이터 기반 추정치
 * - 24개 업종별 맞춤형 성공 시나리오
 */
export const caseDetailsData: SuccessCaseDetailsCollection = {
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
      industry: '자동화 설비 제조',
      employees: '124명',
      revenue: '연매출 280억원',
      location: '경기도 수원'
    },
    challenges: [
      { title: '설비 가동률 저하', description: '예상치 못한 설비 고장으로 인한 생산 중단', impact: '가동률 78%' },
      { title: '정비 비용 증가', description: '사후 정비로 인한 높은 유지보수 비용', impact: '정비비 과다' },
      { title: '기술자 역량 부족', description: '예측정비 기술에 대한 이해 부족', impact: '기술 격차 심화' }
    ],
    curriculum: {
      basic: [
        { title: 'IoT 기초 이해', duration: '8시간', description: 'IoT 센서, 데이터 수집, 통신 프로토콜' },
        { title: '예측정비 개론', duration: '12시간', description: '예측정비 원리, 사례 연구, 효과 분석' },
        { title: '데이터 분석 기초', duration: '8시간', description: '시계열 데이터, 패턴 인식, 이상감지' }
      ],
      advanced: [
        { title: 'ML 예측모델', duration: '24시간', description: '고장 예측 알고리즘, 모델 학습, 최적화' },
        { title: 'IoT 시스템 구축', duration: '20시간', description: '센서 설치, 데이터 파이프라인, 실시간 모니터링' },
        { title: 'n8n 설비 연동', duration: '16시간', description: '자동화 워크플로우, 알람 시스템, 대시보드' }
      ],
      executive: [
        { title: '예측정비 전략', duration: '4시간', description: '예측정비 도입 전략, 투자 계획' },
        { title: 'ROI 분석', duration: '4시간', description: '정비비 절감 효과, 생산성 향상' },
        { title: '기술 리더십', duration: '4시간', description: '기술 조직 구축, 역량 개발' }
      ]
    },
    process: [
      {
        phase: '1단계: AICAMP 예측정비 교육',
        duration: '3주 (28시간)',
        activities: [
          'IoT 기초 및 예측정비 이론 교육',
          '데이터 분석 기초 실습',
          '예측정비 사례 연구'
        ],
        results: ['예측정비 이해도 88% 향상', '기술자 역량 강화']
      },
      {
        phase: '2단계: AI 예측정비 시스템 구축',
        duration: '5주 (60시간)',
        activities: [
          'IoT 센서 설치 및 데이터 수집',
          'ML 기반 고장 예측 모델 개발',
          'n8n 자동화 시스템 구축'
        ],
        results: ['예측 정확도 92%', '설비 가동률 향상']
      },
      {
        phase: '3단계: 예측정비 문화 정착',
        duration: '2주 (12시간)',
        activities: [
          '예측정비 프로세스 표준화',
          '기술자 교육 및 역량 강화',
          '성과 측정 및 개선'
        ],
        results: ['예측정비 체계 완성', '기술자 자신감 91%']
      }
    ],
    results: {
      quantitative: [
        { metric: '설비 가동률', before: '78%', after: '92%', improvement: '14%p 향상' },
        { metric: '정비비용 절감', before: '100%', after: '45%', improvement: '55% 절감' },
        { metric: '고장 예측 정확도', before: '0%', after: '92%', improvement: '92%p 향상' },
        { metric: '기술자 자신감', before: '65%', after: '91%', improvement: '26%p 향상' }
      ],
      financial: [
        { item: '정비비용 절감', amount: '연간 18억원' },
        { item: '생산성 향상', amount: '연간 25억원' },
        { item: '품질 안정성', amount: '연간 8억원' },
        { item: 'ROI', amount: '420%' }
      ],
      qualitative: [
        'IoT + AI 예측정비로 설비 안정성 크게 향상',
        '사전 예방으로 생산 중단 최소화',
        '기술자 역량 강화로 조직 경쟁력 확보',
        '데이터 기반 의사결정 문화 정착'
      ]
    },
    testimonial: {
      quote: "AICAMP 교육으로 예측정비의 가능성을 깨달았습니다. IoT와 AI를 결합한 시스템으로 설비 가동률이 크게 향상되었어요.",
      author: "이자동",
      position: "설비관리팀장",
      company: "(주)오토메이션엑셀런스"
    },
    followUpResults: [
      { metric: '스마트팩토리 인증', achievement: '스마트제조혁신 우수기업 선정' },
      { metric: '기술 특허', achievement: '예측정비 관련 특허 5건 출원' },
      { metric: '전문인력 양성', achievement: '사내 IoT 전문가 12명 육성' }
    ],
    tags: ['제조업', 'IoT', '예측정비', '설비자동화', 'AICAMP교육']
  },

  // 서비스업 3개
  'service-aicamp-customer-experience': {
    id: 'service-aicamp-customer-experience',
    category: 'service',
    industry: '서비스업',
    companyName: '(주)고객경험혁신',
    title: 'AI 챗봇 + 감정분석으로 고객만족도 96% 달성',
    subtitle: 'ChatGPT 기반 고객서비스 자동화 및 감정분석 시스템',
    description: 'AICAMP 서비스 특화 교육으로 AI 고객서비스 전문가 양성, 고객만족도 96% 달성',
    icon: Heart,
    color: 'pink',
    heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
    companyInfo: {
      industry: '고객서비스 솔루션',
      employees: '78명',
      revenue: '연매출 150억원',
      location: '서울특별시 강남구'
    },
    challenges: [
      { title: '고객 응답 지연', description: '24시간 고객 응답 어려움', impact: '고객만족도 72%' },
      { title: '상담원 업무 과부하', description: '반복 문의 처리로 인한 피로도 증가', impact: '이직률 높음' },
      { title: '감정 분석 부족', description: '고객 감정 상태 파악 어려움', impact: '서비스 품질 저하' }
    ],
    curriculum: {
      basic: [
        { title: 'AI 챗봇 기초', duration: '8시간', description: 'ChatGPT, 대화형 AI, 자연어처리 기초' },
        { title: '감정분석 이해', duration: '12시간', description: '감정인식, 텍스트 분석, 고객심리' },
        { title: '고객서비스 자동화', duration: '8시간', description: '워크플로우 설계, API 연동' }
      ],
      advanced: [
        { title: '고급 챗봇 개발', duration: '24시간', description: '맞춤형 챗봇, 학습 데이터 구축' },
        { title: '감정분석 모델', duration: '20시간', description: 'ML 감정분석, 실시간 처리' },
        { title: '고객 데이터 분석', duration: '16시간', description: '고객 여정 분석, 행동 패턴 인사이트' }
      ],
      executive: [
        { title: '고객경험 전략', duration: '4시간', description: 'CX 전략, 디지털 전환 로드맵' },
        { title: '서비스 혁신 리더십', duration: '4시간', description: '조직 혁신, 서비스 품질 관리' }
      ]
    },
    process: [
      {
        phase: '1단계: AI 고객서비스 기초 교육',
        duration: '3주 (28시간)',
        activities: [
          'AI 챗봇 및 감정분석 기초 교육',
          '고객서비스 자동화 실습',
          '고객 데이터 분석 워크숍'
        ],
        results: ['AI 서비스 이해도 90% 향상', '직원 참여도 95%']
      },
      {
        phase: '2단계: 맞춤형 AI 시스템 구축',
        duration: '4주 (60시간)',
        activities: [
          'ChatGPT 기반 챗봇 개발',
          '실시간 감정분석 시스템 구축',
          '고객 데이터 분석 대시보드'
        ],
        results: ['챗봇 정확도 94%', '감정분석 정확도 91%']
      }
    ],
    results: {
      quantitative: [
        { metric: '고객만족도', before: '72%', after: '96%', improvement: '24%p 향상' },
        { metric: '응답시간', before: '2시간', after: '즉시', improvement: '100% 단축' },
        { metric: '상담원 효율성', before: '100%', after: '180%', improvement: '80% 향상' }
      ],
      financial: [
        { item: '운영비 절감', amount: '연간 12억원' },
        { item: '고객 유지 효과', amount: '연간 18억원' },
        { item: 'ROI', amount: '520%' }
      ],
      qualitative: [
        'AI 챗봇으로 24시간 고객 응답 가능',
        '감정분석으로 고객 니즈 정확 파악',
        '상담원 업무 만족도 크게 향상'
      ]
    },
    testimonial: {
      quote: "AICAMP 교육으로 고객서비스가 완전히 바뀌었습니다. AI 챗봇과 감정분석으로 고객만족도가 크게 향상되었어요.",
      author: "박서비스",
      position: "고객서비스팀장",
      company: "(주)고객경험혁신"
    },
    followUpResults: [
      { metric: '서비스 확장', achievement: '전국 지사 AI 서비스 도입' },
      { metric: '고객 증가', achievement: '신규 고객 35% 증가' }
    ],
    tags: ['서비스업', '고객서비스', 'AI챗봇', '감정분석']
  },

  'service-aicamp-hospitality-innovation': {
    id: 'service-aicamp-hospitality-innovation',
    category: 'service',
    industry: '서비스업',
    companyName: '(주)호스피탈리티이노베이션',
    title: 'AI 추천시스템으로 고객 재방문율 85% 달성',
    subtitle: '개인화 추천 및 예약 최적화 시스템',
    description: 'AICAMP 호스피탈리티 특화 과정으로 AI 서비스 전문가 양성, 고객 재방문율 85% 달성',
    icon: Building2,
    color: 'purple',
    heroImage: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=1200&h=600&fit=crop',
    companyInfo: {
      industry: '호텔·숙박업',
      employees: '156명',
      revenue: '연매출 280억원',
      location: '부산광역시 해운대구'
    },
    challenges: [
      { title: '고객 개인화 부족', description: '획일적 서비스로 차별화 한계', impact: '재방문율 45%' },
      { title: '예약 관리 비효율', description: '수동 예약 관리로 오버부킹 발생', impact: '고객 불만 증가' }
    ],
    curriculum: {
      basic: [
        { title: '호스피탈리티 AI 기초', duration: '8시간', description: 'AI 추천시스템, 개인화 서비스' },
        { title: '예약 최적화', duration: '12시간', description: '수요예측, 동적 가격책정' }
      ],
      advanced: [
        { title: '추천 알고리즘', duration: '24시간', description: '협업필터링, 딥러닝 추천' },
        { title: '예측 분석', duration: '20시간', description: '수요예측, 매출 최적화' }
      ],
      executive: [
        { title: '디지털 혁신 전략', duration: '4시간', description: '호스피탈리티 디지털 전환' }
      ]
    },
    process: [
      {
        phase: '1단계: AI 호스피탈리티 교육',
        duration: '3주 (20시간)',
        activities: ['AI 추천시스템 이해', '예약 최적화 실습'],
        results: ['서비스 혁신 마인드셋 구축']
      }
    ],
    results: {
      quantitative: [
        { metric: '재방문율', before: '45%', after: '85%', improvement: '40%p 향상' },
        { metric: '예약 효율성', before: '100%', after: '165%', improvement: '65% 향상' }
      ],
      financial: [
        { item: '매출 증대', amount: '연간 45억원' },
        { item: 'ROI', amount: '380%' }
      ],
      qualitative: ['개인화 서비스로 고객 만족도 향상', '예약 시스템 자동화로 업무 효율성 증대']
    },
    testimonial: {
      quote: "AI 추천시스템 도입으로 고객들이 더 만족하고 자주 찾아오세요.",
      author: "김호텔",
      position: "서비스팀장",
      company: "(주)호스피탈리티이노베이션"
    },
    followUpResults: [
      { metric: '브랜드 확장', achievement: '체인 호텔 3곳 추가 오픈' }
    ],
    tags: ['서비스업', '호스피탈리티', 'AI추천', '예약최적화']
  },

  'service-aicamp-retail-transformation': {
    id: 'service-aicamp-retail-transformation',
    category: 'service',
    industry: '서비스업',
    companyName: '(주)리테일트랜스포메이션',
    title: 'AI 재고관리로 재고회전율 240% 향상',
    subtitle: '수요예측 및 자동 발주 시스템',
    description: 'AICAMP 리테일 특화 과정으로 스마트 리테일 전문가 양성, 재고회전율 240% 향상',
    icon: ShoppingCart,
    color: 'orange',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
    companyInfo: {
      industry: '소매·유통업',
      employees: '89명',
      revenue: '연매출 220억원',
      location: '경기도 성남시'
    },
    challenges: [
      { title: '재고 과다/부족', description: '수요 예측 부정확으로 재고 불균형', impact: '재고회전율 저하' },
      { title: '수동 발주 관리', description: '경험 기반 발주로 비효율성', impact: '기회비용 발생' }
    ],
    curriculum: {
      basic: [
        { title: '리테일 AI 기초', duration: '8시간', description: '수요예측, 재고최적화 개념' },
        { title: '데이터 분석 기초', duration: '12시간', description: '판매 데이터 분석, 트렌드 파악' }
      ],
      advanced: [
        { title: '수요예측 모델', duration: '24시간', description: 'ML 수요예측, 시계열 분석' },
        { title: '자동 발주 시스템', duration: '20시간', description: '재고 최적화, 자동화 워크플로우' }
      ],
      executive: [
        { title: '스마트 리테일 전략', duration: '4시간', description: '디지털 리테일 혁신 전략' }
      ]
    },
    process: [
      {
        phase: '1단계: 리테일 AI 교육',
        duration: '3주 (20시간)',
        activities: ['수요예측 이론 학습', '재고 데이터 분석'],
        results: ['데이터 기반 의사결정 역량 확보']
      }
    ],
    results: {
      quantitative: [
        { metric: '재고회전율', before: '100%', after: '240%', improvement: '140% 향상' },
        { metric: '발주 정확도', before: '65%', after: '92%', improvement: '27%p 향상' }
      ],
      financial: [
        { item: '재고비용 절감', amount: '연간 15억원' },
        { item: '매출 증대', amount: '연간 28억원' },
        { item: 'ROI', amount: '450%' }
      ],
      qualitative: ['AI 수요예측으로 재고 최적화', '자동 발주로 업무 효율성 향상']
    },
    testimonial: {
      quote: "AI 재고관리 시스템으로 매출은 늘고 재고는 줄었어요.",
      author: "이리테일",
      position: "운영팀장",
      company: "(주)리테일트랜스포메이션"
    },
    followUpResults: [
      { metric: '매장 확장', achievement: '신규 매장 5곳 오픈' }
    ],
    tags: ['서비스업', '리테일', '재고관리', '수요예측']
  },

  // 스타트업 3개
  'startup-aicamp-fintech-innovation': {
    id: 'startup-aicamp-fintech-innovation',
    category: 'startup',
    industry: '핀테크',
    companyName: '(주)핀테크이노베이션',
    title: 'AI 신용평가로 대출승인율 78% 달성',
    subtitle: 'ML 기반 신용평가 및 리스크 관리 시스템',
    description: 'AICAMP 핀테크 특화 과정으로 AI 금융 전문가 양성, 대출승인율 78% 달성',
    icon: CreditCard,
    color: 'blue',
    heroImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=600&fit=crop',
    companyInfo: {
      industry: '핀테크·금융서비스',
      employees: '45명',
      revenue: '연매출 80억원',
      location: '서울특별시 강남구'
    },
    challenges: [
      { title: '신용평가 정확도 부족', description: '기존 평가 방식의 한계', impact: '대출 부실률 높음' },
      { title: '심사 시간 과다', description: '수동 심사로 인한 지연', impact: '고객 이탈' }
    ],
    curriculum: {
      basic: [
        { title: 'AI 금융 기초', duration: '8시간', description: '핀테크 AI 활용, 신용평가 개념' },
        { title: '머신러닝 기초', duration: '12시간', description: 'ML 알고리즘, 데이터 전처리' }
      ],
      advanced: [
        { title: '신용평가 모델', duration: '24시간', description: 'ML 신용평가, 리스크 모델링' },
        { title: '자동화 시스템', duration: '20시간', description: '자동 심사, API 연동' }
      ],
      executive: [
        { title: '핀테크 전략', duration: '4시간', description: '디지털 금융 혁신 전략' }
      ]
    },
    process: [
      {
        phase: '1단계: AI 금융 교육',
        duration: '3주 (20시간)',
        activities: ['AI 신용평가 이론', 'ML 기초 실습'],
        results: ['금융 AI 이해도 85% 향상']
      }
    ],
    results: {
      quantitative: [
        { metric: '대출승인율', before: '45%', after: '78%', improvement: '33%p 향상' },
        { metric: '심사시간', before: '3일', after: '30분', improvement: '95% 단축' }
      ],
      financial: [
        { item: '운영비 절감', amount: '연간 8억원' },
        { item: '매출 증대', amount: '연간 25억원' },
        { item: 'ROI', amount: '380%' }
      ],
      qualitative: ['AI 신용평가로 정확도 향상', '자동화로 고객 만족도 증대']
    },
    testimonial: {
      quote: "AI 신용평가 시스템으로 더 정확하고 빠른 서비스를 제공할 수 있게 되었습니다.",
      author: "박핀테크",
      position: "리스크관리팀장",
      company: "(주)핀테크이노베이션"
    },
    followUpResults: [
      { metric: '사업 확장', achievement: '개인신용대출 서비스 론칭' }
    ],
    tags: ['핀테크', '신용평가', 'AI금융', '자동화']
  },

  'startup-aicamp-edtech-personalization': {
    id: 'startup-aicamp-edtech-personalization',
    category: 'startup',
    industry: '에듀테크',
    companyName: '(주)에듀테크개인화',
    title: 'AI 개인화 학습으로 학습효과 185% 향상',
    subtitle: '적응형 학습 및 개인화 추천 시스템',
    description: 'AICAMP 에듀테크 과정으로 AI 교육 전문가 양성, 학습효과 185% 향상',
    icon: GraduationCap,
    color: 'green',
    heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop',
    companyInfo: {
      industry: '교육·에듀테크',
      employees: '32명',
      revenue: '연매출 45억원',
      location: '서울특별시 서초구'
    },
    challenges: [
      { title: '획일적 교육', description: '개인별 학습 수준 차이 미반영', impact: '학습효과 저하' },
      { title: '학습 동기 부족', description: '흥미 유발 콘텐츠 부족', impact: '학습 지속율 낮음' }
    ],
    curriculum: {
      basic: [
        { title: 'AI 교육 기초', duration: '8시간', description: '적응형 학습, 개인화 추천' },
        { title: '학습 분석', duration: '12시간', description: '학습 데이터 분석, 패턴 인식' }
      ],
      advanced: [
        { title: '개인화 알고리즘', duration: '24시간', description: '적응형 학습 모델, 추천 시스템' },
        { title: '콘텐츠 자동화', duration: '20시간', description: 'AI 콘텐츠 생성, 자동 평가' }
      ],
      executive: [
        { title: '에듀테크 전략', duration: '4시간', description: 'AI 교육 혁신 전략' }
      ]
    },
    process: [
      {
        phase: '1단계: AI 교육 기술 학습',
        duration: '3주 (20시간)',
        activities: ['적응형 학습 이해', '개인화 기술 실습'],
        results: ['교육 AI 전문성 확보']
      }
    ],
    results: {
      quantitative: [
        { metric: '학습효과', before: '100%', after: '185%', improvement: '85% 향상' },
        { metric: '학습 지속율', before: '60%', after: '89%', improvement: '29%p 향상' }
      ],
      financial: [
        { item: '매출 증대', amount: '연간 18억원' },
        { item: 'ROI', amount: '420%' }
      ],
      qualitative: ['개인화 학습으로 학습 만족도 향상', 'AI 추천으로 학습 동기 증진']
    },
    testimonial: {
      quote: "AI 개인화 학습 시스템으로 학생들의 학습 성과가 크게 향상되었습니다.",
      author: "김에듀",
      position: "교육개발팀장",
      company: "(주)에듀테크개인화"
    },
    followUpResults: [
      { metric: '플랫폼 확장', achievement: '온라인 학습 플랫폼 론칭' }
    ],
    tags: ['에듀테크', '개인화학습', 'AI교육', '적응형학습']
  },

  'startup-aicamp-healthtech-diagnosis': {
    id: 'startup-aicamp-healthtech-diagnosis',
    category: 'startup',
    industry: '헬스테크',
    companyName: '(주)헬스테크진단',
    title: 'AI 의료영상 분석으로 진단정확도 94% 달성',
    subtitle: 'Computer Vision 기반 의료영상 진단 시스템',
    description: 'AICAMP 헬스테크 과정으로 AI 의료 전문가 양성, 진단정확도 94% 달성',
    icon: Heart,
    color: 'red',
    heroImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop',
    companyInfo: {
      industry: '헬스테크·의료IT',
      employees: '28명',
      revenue: '연매출 35억원',
      location: '대전광역시 유성구'
    },
    challenges: [
      { title: '진단 정확도 한계', description: '기존 진단 방식의 정확도 부족', impact: '오진 위험' },
      { title: '진단 시간 과다', description: '전문의 부족으로 진단 지연', impact: '환자 대기시간 증가' }
    ],
    curriculum: {
      basic: [
        { title: '의료 AI 기초', duration: '8시간', description: '의료영상 AI, Computer Vision' },
        { title: '딥러닝 기초', duration: '12시간', description: 'CNN, 이미지 분석 기초' }
      ],
      advanced: [
        { title: '의료영상 분석', duration: '24시간', description: '딥러닝 진단 모델, 영상 처리' },
        { title: '진단 시스템', duration: '20시간', description: 'AI 진단 워크플로우, 시스템 통합' }
      ],
      executive: [
        { title: '헬스테크 전략', duration: '4시간', description: 'AI 의료 혁신 전략' }
      ]
    },
    process: [
      {
        phase: '1단계: 의료 AI 교육',
        duration: '3주 (20시간)',
        activities: ['의료영상 AI 이해', 'CNN 모델 실습'],
        results: ['의료 AI 전문성 확보']
      }
    ],
    results: {
      quantitative: [
        { metric: '진단정확도', before: '78%', after: '94%', improvement: '16%p 향상' },
        { metric: '진단시간', before: '45분', after: '3분', improvement: '93% 단축' }
      ],
      financial: [
        { item: '운영비 절감', amount: '연간 5억원' },
        { item: '매출 증대', amount: '연간 15억원' },
        { item: 'ROI', amount: '350%' }
      ],
      qualitative: ['AI 진단으로 정확도 향상', '빠른 진단으로 환자 만족도 증대']
    },
    testimonial: {
      quote: "AI 의료영상 분석 시스템으로 더 정확하고 빠른 진단이 가능해졌습니다.",
      author: "이헬스",
      position: "의료개발팀장",
      company: "(주)헬스테크진단"
    },
    followUpResults: [
      { metric: '기술 인증', achievement: '의료기기 인증 획득' }
    ],
    tags: ['헬스테크', '의료영상', 'AI진단', 'Computer Vision']
  },

  // 전문서비스 3개
  'professional-aicamp-consulting-ai': {
    id: 'professional-aicamp-consulting-ai',
    category: 'professional',
    industry: '전문서비스',
    companyName: '(주)스마트컨설팅AI',
    title: 'AI 기반 컨설팅으로 고객사 성과 138% 향상 및 컨설턴트 생산성 256% 증대',
    subtitle: 'ChatGPT + n8n 자동화로 데이터 기반 컨설팅 서비스 혁신',
    description: 'AICAMP 컨설팅 특화 교육과 AI 분석 도구로 데이터 기반 컨설팅 서비스 혁신, 고객사 성과 138% 향상',
    icon: Briefcase,
    color: 'blue',
    heroImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop',
    companyInfo: {
      industry: '경영컨설팅·전략기획',
      employees: '67명',
      revenue: '연매출 180억원',
      location: '서울특별시 중구'
    },
    challenges: [
      { title: '분석 시간 과다', description: '수작업 데이터 분석으로 인한 프로젝트 지연', impact: '평균 분석 시간 120시간' },
      { title: '일관성 부족', description: '컨설턴트별 분석 품질 편차', impact: '고객 만족도 편차 심함' },
      { title: '반복업무 과다', description: '유사 분석 작업의 중복 수행', impact: '컨설턴트 피로도 증가' }
    ],
    curriculum: {
      basic: [
        { title: 'AI 컨설팅 기초', duration: '12시간', description: 'AI 활용 컨설팅 방법론, ChatGPT 프롬프트 엔지니어링' },
        { title: 'n8n 워크플로우 설계', duration: '16시간', description: '컨설팅 프로세스 자동화, API 연동, 데이터 파이프라인' },
        { title: '데이터 시각화 기초', duration: '8시간', description: 'Tableau, Power BI 활용 대시보드 구축' }
      ],
      advanced: [
        { title: 'AI 기반 전략분석', duration: '24시간', description: 'ML 기반 시장분석, 경쟁사 분석 자동화' },
        { title: '고급 데이터 분석', duration: '20시간', description: 'Python 기반 고급 분석, 예측 모델링' },
        { title: 'ChatGPT API 활용', duration: '16시간', description: '맞춤형 분석 보고서 자동 생성, 인사이트 도출' }
      ],
      executive: [
        { title: 'AI 컨설팅 전략', duration: '8시간', description: 'AI 기반 컨설팅 사업모델, 디지털 전환 전략' },
        { title: 'ROI 극대화 방안', duration: '4시간', description: '컨설팅 효율성 측정, 고객 가치 증대 방안' },
        { title: '조직 혁신 리더십', duration: '4시간', description: 'AI 도입 변화관리, 컨설턴트 역량 강화' }
      ]
    },
    process: [
      {
        phase: '1단계: AICAMP 컨설팅 기초 교육',
        duration: '4주 (36시간)',
        activities: [
          'AI 컨설팅 방법론 이론 교육',
          'ChatGPT 프롬프트 엔지니어링 실습',
          'n8n 기반 워크플로우 설계 실습',
          '데이터 시각화 도구 활용법'
        ],
        results: ['AI 컨설팅 역량 90% 향상', '참여율 96%', '기초 자동화 스킬 확보']
      },
      {
        phase: '2단계: 심화 AI 분석 시스템 구축',
        duration: '6주 (60시간)',
        activities: [
          'Python 기반 고급 데이터 분석 시스템 구축',
          'ChatGPT API 활용 보고서 자동 생성 시스템',
          'n8n 기반 컨설팅 프로세스 완전 자동화',
          '고객사별 맞춤형 분석 대시보드 구축'
        ],
        results: ['분석 시간 75% 단축', '보고서 품질 일관성 95% 달성', '자동화율 85% 달성']
      },
      {
        phase: '3단계: 경영진 전략 및 조직혁신',
        duration: '2주 (16시간)',
        activities: [
          'AI 컨설팅 사업모델 재설계',
          'ROI 측정 체계 구축',
          '조직 혁신 및 변화관리 전략 수립',
          '지속적 개선 프로세스 정착'
        ],
        results: ['신규 사업모델 확립', '조직 혁신 마인드셋 정착', '지속 성장 기반 구축']
      }
    ],
    results: {
      quantitative: [
        { metric: '컨설턴트 생산성', before: '100%', after: '256%', improvement: '156% 향상' },
        { metric: '분석 시간 단축', before: '120시간', after: '30시간', improvement: '75% 단축' },
        { metric: '고객사 성과', before: '100%', after: '138%', improvement: '38% 향상' },
        { metric: '프로젝트 만족도', before: '78%', after: '96%', improvement: '18%p 향상' }
      ],
      financial: [
        { item: '생산성 향상 효과', amount: '연간 85억원' },
        { item: '프로젝트 단가 상승', amount: '연간 45억원' },
        { item: '신규 고객 확보', amount: '연간 65억원' },
        { item: 'ROI', amount: '890%' }
      ],
      qualitative: [
        'AI 기반 컨설팅으로 데이터 드리븐 의사결정 문화 정착',
        'n8n 자동화로 반복업무 최소화하여 창의적 업무에 집중',
        '일관된 고품질 분석으로 고객 신뢰도 크게 향상',
        'ChatGPT 활용으로 인사이트 도출 능력 획기적 개선'
      ]
    },
    testimonial: {
      quote: "AICAMP 교육을 통해 컨설팅 패러다임이 완전히 바뀌었습니다. AI와 n8n을 활용한 자동화로 컨설턴트들이 더 가치있는 일에 집중할 수 있게 되었어요.",
      author: "김컨설팅",
      position: "전략기획본부장",
      company: "(주)스마트컨설팅AI"
    },
    followUpResults: [
      { metric: 'AI 컨설팅 전문성', achievement: '업계 최초 AI 컨설팅 인증 획득' },
      { metric: '사업 확장', achievement: 'AI 전문 컨설팅 사업부 신설' },
      { metric: '인재 양성', achievement: 'AI 컨설턴트 20명 육성 완료' }
    ],
    tags: ['전문서비스', 'AI컨설팅', 'ChatGPT', 'n8n자동화', '전략분석']
  },

  'professional-aicamp-legal-ai': {
    id: 'professional-aicamp-legal-ai',
    category: 'professional',
    industry: '전문서비스',
    companyName: '(주)리걸테크이노베이션',
    title: '법무 AI로 계약서 검토시간 78% 단축 및 법적 리스크 85% 감소',
    subtitle: 'NLP + n8n 자동화로 법무업무 혁신 및 리스크 관리 체계 구축',
    description: 'AICAMP 법무 특화 교육과 NLP 기반 계약서 분석 시스템으로 법무 업무 혁신, 리스크 85% 감소',
    icon: Scale,
    color: 'purple',
    heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=600&fit=crop',
    companyInfo: {
      industry: '법무·법률서비스',
      employees: '45명',
      revenue: '연매출 120억원',
      location: '서울특별시 서초구'
    },
    challenges: [
      { title: '계약서 검토 시간 과다', description: '수작업 검토로 인한 업무 지연', impact: '평균 검토 시간 8시간' },
      { title: '리스크 식별 어려움', description: '복잡한 조항에서 리스크 놓치는 경우 발생', impact: '법적 분쟁 증가' },
      { title: '일관성 부족', description: '변호사별 검토 기준 상이', impact: '검토 품질 편차' }
    ],
    curriculum: {
      basic: [
        { title: '법무 AI 기초', duration: '8시간', description: 'Legal Tech 동향, AI 법무 활용 사례' },
        { title: 'NLP 기초 이해', duration: '12시간', description: '자연어 처리, 문서 분석 기초' },
        { title: '계약서 분석 실습', duration: '8시간', description: 'AI 기반 계약서 리뷰 프로세스' }
      ],
      advanced: [
        { title: '고급 NLP 모델', duration: '20시간', description: 'BERT, GPT 활용 법률 문서 분석' },
        { title: 'n8n 법무 자동화', duration: '24시간', description: '계약서 검토 워크플로우 자동화' },
        { title: '리스크 분석 시스템', duration: '16시간', description: 'ML 기반 법적 리스크 예측 모델' }
      ],
      executive: [
        { title: 'Legal Tech 전략', duration: '6시간', description: '법무 디지털 전환 전략' },
        { title: '리스크 관리 체계', duration: '4시간', description: 'AI 기반 통합 리스크 관리' },
        { title: '법무 혁신 리더십', duration: '2시간', description: '조직 변화관리 및 혁신 문화' }
      ]
    },
    process: [
      {
        phase: '1단계: 법무 AI 기초 교육',
        duration: '3주 (28시간)',
        activities: [
          'Legal Tech 및 AI 법무 활용 이론 교육',
          'NLP 기반 문서 분석 기초 실습',
          '계약서 AI 분석 도구 활용법 교육'
        ],
        results: ['법무 AI 이해도 88% 향상', '참여율 94%', 'AI 도구 활용 역량 확보']
      },
      {
        phase: '2단계: AI 법무 시스템 구축',
        duration: '5주 (60시간)',
        activities: [
          'NLP 기반 계약서 자동 분석 시스템 구축',
          'n8n을 활용한 법무업무 워크플로우 자동화',
          'ML 기반 법적 리스크 예측 모델 개발',
          '통합 법무 대시보드 구축'
        ],
        results: ['검토 시간 78% 단축', '리스크 식별 정확도 92%', '업무 자동화율 80%']
      },
      {
        phase: '3단계: 법무 혁신 문화 정착',
        duration: '2주 (12시간)',
        activities: [
          'AI 법무 프로세스 표준화',
          '리스크 관리 체계 고도화',
          '지속적 개선 시스템 구축'
        ],
        results: ['법무 혁신 문화 정착', '고객 만족도 94% 달성']
      }
    ],
    results: {
      quantitative: [
        { metric: '계약서 검토시간', before: '8시간', after: '1.8시간', improvement: '78% 단축' },
        { metric: '법적 리스크 감소', before: '100%', after: '15%', improvement: '85% 감소' },
        { metric: '검토 정확도', before: '82%', after: '96%', improvement: '14%p 향상' },
        { metric: '변호사 만족도', before: '71%', after: '94%', improvement: '23%p 향상' }
      ],
      financial: [
        { item: '업무 효율화 효과', amount: '연간 28억원' },
        { item: '리스크 비용 절감', amount: '연간 45억원' },
        { item: '고객 확대 효과', amount: '연간 35억원' },
        { item: 'ROI', amount: '720%' }
      ],
      qualitative: [
        'AI 기반 계약서 분석으로 정확하고 일관된 검토 품질 확보',
        'n8n 자동화로 반복적인 법무업무 최소화',
        '예측 가능한 리스크 관리로 고객 신뢰도 향상',
        '변호사들이 고부가가치 업무에 집중 가능'
      ]
    },
    testimonial: {
      quote: "AICAMP 교육으로 법무업무가 완전히 바뀌었습니다. AI 분석으로 계약서 검토가 정확하고 빨라져서 고객들이 매우 만족해하고 있어요.",
      author: "박법무",
      position: "법무팀장",
      company: "(주)리걸테크이노베이션"
    },
    followUpResults: [
      { metric: 'Legal Tech 선도', achievement: '업계 최초 AI 법무 서비스 상용화' },
      { metric: '사업 확장', achievement: 'AI 법무 컨설팅 사업 론칭' },
      { metric: '전문성 인정', achievement: '법무부 AI 법무 시범사업 선정' }
    ],
    tags: ['전문서비스', '법무', 'NLP', 'n8n자동화', '계약서분석', '리스크관리']
  },

  'professional-aicamp-accounting-automation': {
    id: 'professional-aicamp-accounting-automation',
    category: 'professional',
    industry: '전문서비스',
    companyName: '(주)회계자동화솔루션',
    title: '회계 AI 자동화로 처리시간 85% 단축 및 정확도 99.2% 달성',
    subtitle: 'OCR + ChatGPT + n8n 통합으로 회계업무 완전 자동화',
    description: 'AICAMP 회계 특화 교육과 OCR + AI 기반 회계 자동화 시스템으로 업무 혁신, 정확도 99.2% 달성',
    icon: Calculator,
    color: 'green',
    heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop',
    companyInfo: {
      industry: '회계·세무서비스',
      employees: '52명',
      revenue: '연매출 95억원',
      location: '경기도 성남시'
    },
    challenges: [
      { title: '수작업 처리 과다', description: '전표 입력, 증빙 정리 등 반복업무 과다', impact: '평균 처리시간 6시간' },
      { title: '휴먼 에러 발생', description: '수작업으로 인한 입력 오류', impact: '정확도 92%' },
      { title: '업무 표준화 부족', description: '회계사별 처리 방식 상이', impact: '품질 일관성 저하' }
    ],
    curriculum: {
      basic: [
        { title: '회계 AI 기초', duration: '8시간', description: 'AI 회계 자동화 개념, OCR 기술 이해' },
        { title: 'ChatGPT 회계 활용', duration: '8시간', description: '회계 업무 ChatGPT 활용법, 프롬프트 설계' },
        { title: 'n8n 워크플로우', duration: '8시간', description: '회계 프로세스 자동화 설계' }
      ],
      advanced: [
        { title: 'OCR 시스템 구축', duration: '16시간', description: '증빙서류 자동 인식 및 데이터 추출' },
        { title: '회계 자동화 시스템', duration: '20시간', description: 'ERP 연동, 자동 전표 생성' },
        { title: 'AI 검증 시스템', duration: '16시간', description: '자동 검증, 이상 거래 탐지' }
      ],
      executive: [
        { title: '회계 디지털 전환', duration: '4시간', description: '회계법인 디지털 혁신 전략' },
        { title: 'ROI 분석', duration: '2시간', description: '자동화 투자 효과 분석' },
        { title: '품질관리 체계', duration: '2시간', description: 'AI 기반 품질 보증 시스템' }
      ]
    },
    process: [
      {
        phase: '1단계: 회계 AI 기초 교육',
        duration: '3주 (24시간)',
        activities: [
          '회계 AI 자동화 이론 및 사례 교육',
          'ChatGPT 회계업무 활용법 실습',
          'n8n 기반 워크플로우 설계 기초'
        ],
        results: ['회계 AI 이해도 91% 향상', '참여율 98%', '자동화 기초 역량 확보']
      },
      {
        phase: '2단계: 통합 자동화 시스템 구축',
        duration: '6주 (52시간)',
        activities: [
          'OCR 기반 증빙서류 자동 인식 시스템 구축',
          'ChatGPT API 활용 자동 분개 생성',
          'n8n 기반 회계 프로세스 완전 자동화',
          'ERP 시스템 연동 및 실시간 동기화'
        ],
        results: ['처리시간 85% 단축', '정확도 99.2% 달성', '자동화율 95% 달성']
      },
      {
        phase: '3단계: 품질관리 및 최적화',
        duration: '2주 (8시간)',
        activities: [
          'AI 기반 자동 검증 시스템 구축',
          '이상 거래 탐지 알고리즘 적용',
          '지속적 개선 프로세스 정착'
        ],
        results: ['품질 관리 체계 완성', '고객 만족도 99% 달성']
      }
    ],
    results: {
      quantitative: [
        { metric: '처리시간 단축', before: '6시간', after: '0.9시간', improvement: '85% 단축' },
        { metric: '정확도 향상', before: '92%', after: '99.2%', improvement: '7.2%p 향상' },
        { metric: '자동화율', before: '15%', after: '95%', improvement: '80%p 향상' },
        { metric: '고객 만족도', before: '82%', after: '99%', improvement: '17%p 향상' }
      ],
      financial: [
        { item: '인건비 절감 효과', amount: '연간 35억원' },
        { item: '오류 비용 절감', amount: '연간 12억원' },
        { item: '생산성 향상 효과', amount: '연간 28억원' },
        { item: 'ROI', amount: '650%' }
      ],
      qualitative: [
        'OCR + ChatGPT + n8n 통합으로 회계업무 완전 자동화 실현',
        '99.2% 정확도로 휴먼 에러 최소화',
        '회계사들이 고부가가치 컨설팅 업무에 집중 가능',
        '표준화된 프로세스로 일관된 서비스 품질 제공'
      ]
    },
    testimonial: {
      quote: "AICAMP 교육을 통해 회계업무가 혁신되었습니다. AI 자동화로 정확도는 높아지고 시간은 크게 단축되어 고객들이 놀라워해요.",
      author: "이회계",
      position: "회계팀장",
      company: "(주)회계자동화솔루션"
    },
    followUpResults: [
      { metric: '기술 특허', achievement: 'AI 회계 자동화 관련 특허 3건 출원' },
      { metric: '사업 확장', achievement: 'AI 회계 솔루션 B2B 사업 론칭' },
      { metric: '업계 선도', achievement: '회계법인 AI 자동화 표준 모델 제시' }
    ],
    tags: ['전문서비스', '회계', 'OCR', 'ChatGPT', 'n8n자동화', '정확도향상']
  },

  // 건설업 1개
  'construction-aicamp-precision-construction': {
    id: 'construction-aicamp-precision-construction',
    category: 'construction',
    industry: '건설업',
    companyName: '(주)정밀건설테크',
    title: 'AI 정밀측량으로 시공정확도 95% 달성 및 재시공률 78% 감소',
    subtitle: 'Computer Vision + n8n 자동화로 건설 품질 혁신',
    description: 'AICAMP 건설 특화 교육과 Computer Vision 기반 정밀측량 시스템으로 건설 혁신, 재시공률 78% 감소',
    icon: Ruler,
    color: 'orange',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=600&fit=crop',
    companyInfo: {
      industry: '건설·토목공사',
      employees: '134명',
      revenue: '연매출 450억원',
      location: '경기도 고양시'
    },
    challenges: [
      { title: '측량 정확도 부족', description: '기존 측량 방식의 오차로 시공 품질 저하', impact: '재시공률 15%' },
      { title: '작업 시간 과다', description: '수작업 측량으로 인한 공기 지연', impact: '평균 측량 시간 8시간' },
      { title: '품질 관리 어려움', description: '시공 과정 모니터링 한계', impact: '품질 편차 심함' }
    ],
    curriculum: {
      basic: [
        { title: '건설 AI 기초', duration: '12시간', description: 'AI 건설 기술, Computer Vision 기초' },
        { title: 'BIM + AI 연동', duration: '16시간', description: 'BIM 모델링, AI 기반 설계 검토' },
        { title: 'n8n 건설 자동화', duration: '8시간', description: '건설 프로세스 워크플로우 자동화' }
      ],
      advanced: [
        { title: 'Computer Vision 측량', duration: '28시간', description: 'AI 정밀측량, 3D 스캐닝 기술' },
        { title: '드론 + AI 모니터링', duration: '20시간', description: '드론 기반 시공 모니터링 시스템' },
        { title: '품질 예측 모델', duration: '16시간', description: 'ML 기반 시공 품질 예측' }
      ],
      executive: [
        { title: '스마트 건설 전략', duration: '6시간', description: '디지털 건설 혁신 전략' },
        { title: '건설 DX 로드맵', duration: '4시간', description: '건설업 디지털 전환 계획' },
        { title: '안전관리 시스템', duration: '2시간', description: 'AI 기반 건설 안전 관리' }
      ]
    },
    process: [
      {
        phase: '1단계: 건설 AI 기초 교육',
        duration: '4주 (36시간)',
        activities: [
          '건설 AI 기술 이론 교육',
          'Computer Vision 기초 실습',
          'BIM + AI 연동 실습'
        ],
        results: ['건설 AI 이해도 89% 향상', '참여율 94%', 'BIM 활용 역량 확보']
      },
      {
        phase: '2단계: AI 정밀측량 시스템 구축',
        duration: '6주 (64시간)',
        activities: [
          'Computer Vision 기반 정밀측량 시스템 구축',
          '드론 + AI 시공 모니터링 시스템',
          'n8n 건설 프로세스 자동화',
          '품질 예측 모델 개발'
        ],
        results: ['측량 정확도 95% 달성', '모니터링 자동화 90%', '품질 예측 정확도 88%']
      },
      {
        phase: '3단계: 스마트 건설 체계 완성',
        duration: '2주 (12시간)',
        activities: [
          '통합 건설 관리 시스템 구축',
          '안전관리 시스템 도입',
          '지속적 개선 프로세스 정착'
        ],
        results: ['스마트 건설 체계 완성', '안전사고 85% 감소']
      }
    ],
    results: {
      quantitative: [
        { metric: '시공정확도', before: '78%', after: '95%', improvement: '17%p 향상' },
        { metric: '재시공률 감소', before: '15%', after: '3.3%', improvement: '78% 감소' },
        { metric: '측량시간 단축', before: '8시간', after: '1.5시간', improvement: '81% 단축' },
        { metric: '안전사고 감소', before: '100%', after: '15%', improvement: '85% 감소' }
      ],
      financial: [
        { item: '재시공 비용 절감', amount: '연간 85억원' },
        { item: '공기 단축 효과', amount: '연간 65억원' },
        { item: '품질 향상 효과', amount: '연간 45억원' },
        { item: 'ROI', amount: '580%' }
      ],
      qualitative: [
        'Computer Vision 정밀측량으로 시공 품질 획기적 향상',
        'n8n 자동화로 건설 프로세스 효율성 극대화',
        '드론 + AI 모니터링으로 실시간 품질 관리',
        '안전사고 예방으로 작업자 안전 크게 향상'
      ]
    },
    testimonial: {
      quote: "AICAMP 교육을 통해 건설업계에 혁신을 가져왔습니다. AI 정밀측량으로 시공 품질이 크게 향상되어 고객 만족도가 높아졌어요.",
      author: "김건설",
      position: "기술본부장",
      company: "(주)정밀건설테크"
    },
    followUpResults: [
      { metric: '기술 인증', achievement: '스마트 건설기술 인증 획득' },
      { metric: '사업 확장', achievement: '스마트 건설 사업부 신설' },
      { metric: '특허 출원', achievement: 'AI 건설 기술 특허 4건 출원' }
    ],
    tags: ['건설업', 'Computer Vision', '정밀측량', 'BIM', 'n8n자동화']
  },

  // 금융업 1개
  'finance-aicamp-robo-advisor': {
    id: 'finance-aicamp-robo-advisor',
    category: 'finance',
    industry: '금융업',
    companyName: '(주)AI자산관리',
    title: 'AI 로보어드바이저로 수익률 32% 향상 및 고객만족도 94% 달성',
    subtitle: 'ML 투자알고리즘 + n8n 자동화로 자산관리 혁신',
    description: 'AICAMP 금융 특화 교육과 ML 기반 자산관리 알고리즘으로 투자 서비스 혁신, 수익률 32% 향상',
    icon: BarChart3,
    color: 'blue',
    heroImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=600&fit=crop',
    companyInfo: {
      industry: '자산관리·투자서비스',
      employees: '78명',
      revenue: '연매출 280억원',
      location: '서울특별시 영등포구'
    },
    challenges: [
      { title: '투자 성과 한계', description: '기존 투자 방식의 수익률 한계', impact: '평균 수익률 8%' },
      { title: '포트폴리오 관리 복잡성', description: '다양한 자산 배분 최적화 어려움', impact: '리밸런싱 지연' },
      { title: '리스크 관리 부족', description: '시장 변동성 대응 한계', impact: '손실 위험 증가' }
    ],
    curriculum: {
      basic: [
        { title: '금융 AI 기초', duration: '12시간', description: '로보어드바이저, 퀀트 투자 기초' },
        { title: '투자 데이터 분석', duration: '12시간', description: '시장 데이터 분석, 기술적 분석' },
        { title: 'n8n 금융 자동화', duration: '8시간', description: '투자 프로세스 자동화 워크플로우' }
      ],
      advanced: [
        { title: 'ML 투자 알고리즘', duration: '28시간', description: '머신러닝 투자 모델, 포트폴리오 최적화' },
        { title: '리스크 관리 모델', duration: '20시간', description: 'VaR, 스트레스 테스트, 리스크 예측' },
        { title: 'ChatGPT 투자분석', duration: '16시간', description: 'AI 기반 투자 리포트 자동 생성' }
      ],
      executive: [
        { title: '핀테크 전략', duration: '8시간', description: 'AI 자산관리 사업 전략' },
        { title: '규제 대응', duration: '4시간', description: '금융 규제 및 컴플라이언스' },
        { title: '디지털 금융 혁신', duration: '4시간', description: '금융업 디지털 전환 전략' }
      ]
    },
    process: [
      {
        phase: '1단계: 금융 AI 기초 교육',
        duration: '4주 (32시간)',
        activities: [
          '로보어드바이저 및 퀀트 투자 이론 교육',
          '금융 데이터 분석 기초 실습',
          'n8n 금융 자동화 워크플로우 설계'
        ],
        results: ['금융 AI 이해도 92% 향상', '참여율 96%', '자동화 기초 역량 확보']
      },
      {
        phase: '2단계: AI 투자 시스템 구축',
        duration: '6주 (64시간)',
        activities: [
          'ML 기반 투자 알고리즘 개발',
          '포트폴리오 최적화 모델 구축',
          '리스크 관리 시스템 개발',
          'ChatGPT 투자분석 리포트 자동화'
        ],
        results: ['투자 수익률 32% 향상', '리스크 관리 정확도 91%', '자동화율 88%']
      },
      {
        phase: '3단계: 로보어드바이저 서비스 완성',
        duration: '2주 (16시간)',
        activities: [
          '통합 자산관리 플랫폼 구축',
          '고객 맞춤형 서비스 개발',
          '규제 준수 시스템 구축'
        ],
        results: ['로보어드바이저 서비스 완성', '고객만족도 94% 달성']
      }
    ],
    results: {
      quantitative: [
        { metric: '투자 수익률', before: '8%', after: '32%', improvement: '24%p 향상' },
        { metric: '포트폴리오 관리 효율성', before: '100%', after: '245%', improvement: '145% 향상' },
        { metric: '리스크 예측 정확도', before: '65%', after: '91%', improvement: '26%p 향상' },
        { metric: '고객만족도', before: '76%', after: '94%', improvement: '18%p 향상' }
      ],
      financial: [
        { item: '운용 수익 증대', amount: '연간 180억원' },
        { item: '운용비 절감', amount: '연간 45억원' },
        { item: '고객 확대 효과', amount: '연간 85억원' },
        { item: 'ROI', amount: '720%' }
      ],
      qualitative: [
        'ML 투자 알고리즘으로 시장 대비 초과 수익 달성',
        'n8n 자동화로 24시간 실시간 포트폴리오 관리',
        'AI 리스크 관리로 안정적인 투자 성과 실현',
        'ChatGPT 투자분석으로 고품질 투자 리포트 제공'
      ]
    },
    testimonial: {
      quote: "AICAMP 교육으로 자산관리 서비스가 완전히 바뀌었습니다. AI 투자 알고리즘으로 고객들의 수익률이 크게 향상되어 만족도가 높아졌어요.",
      author: "박자산",
      position: "투자운용본부장",
      company: "(주)AI자산관리"
    },
    followUpResults: [
      { metric: '서비스 확장', achievement: '로보어드바이저 서비스 정식 출시' },
      { metric: '고객 증가', achievement: '자산관리 고객 300% 증가' },
      { metric: '업계 선도', achievement: 'AI 자산관리 우수사례 선정' }
    ],
    tags: ['금융업', '로보어드바이저', 'ML투자', 'n8n자동화', '자산관리']
  },

  // 물류유통 1개
  'logistics-aicamp-smart-delivery': {
    id: 'logistics-aicamp-smart-delivery',
    category: 'logistics',
    industry: '물류유통',
    companyName: '(주)스마트로지스틱스',
    title: '배송 AI 최적화로 배송시간 45% 단축 및 연료비 38% 절감',
    subtitle: '경로최적화 + n8n 자동화로 물류 혁신',
    description: 'AICAMP 물류 특화 교육과 경로최적화 AI로 스마트 배송 시스템 구축, 배송시간 45% 단축',
    icon: Package,
    color: 'green',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=600&fit=crop',
    companyInfo: {
      industry: '물류·배송서비스',
      employees: '245명',
      revenue: '연매출 380억원',
      location: '경기도 이천시'
    },
    challenges: [
      { title: '비효율적 배송경로', description: '경험 기반 경로 설정으로 비효율 발생', impact: '평균 배송시간 4시간' },
      { title: '연료비 과다', description: '최적화되지 않은 경로로 연료비 증가', impact: '연료비 과다 지출' },
      { title: '실시간 대응 부족', description: '교통상황 변화에 대한 대응 지연', impact: '배송 지연 빈발' }
    ],
    curriculum: {
      basic: [
        { title: '물류 AI 기초', duration: '8시간', description: '물류 최적화, 경로 알고리즘 기초' },
        { title: '데이터 분석 기초', duration: '12시간', description: '배송 데이터 분석, 패턴 인식' },
        { title: 'n8n 물류 자동화', duration: '8시간', description: '물류 프로세스 자동화 워크플로우' }
      ],
      advanced: [
        { title: '경로최적화 알고리즘', duration: '20시간', description: 'TSP, VRP 알고리즘, 실시간 최적화' },
        { title: '예측 분석 모델', duration: '16시간', description: '수요 예측, 배송량 예측 모델' },
        { title: 'IoT 연동 시스템', duration: '12시간', description: '차량 IoT, GPS 데이터 활용' }
      ],
      executive: [
        { title: '스마트 물류 전략', duration: '4시간', description: '물류업 디지털 전환 전략' },
        { title: '물류 최적화 ROI', duration: '2시간', description: '물류 효율화 투자 효과' },
        { title: '지속가능 물류', duration: '2시간', description: '친환경 물류 혁신 전략' }
      ]
    },
    process: [
      {
        phase: '1단계: 물류 AI 기초 교육',
        duration: '3주 (28시간)',
        activities: [
          '물류 최적화 이론 및 알고리즘 교육',
          '배송 데이터 분석 실습',
          'n8n 물류 자동화 워크플로우 설계'
        ],
        results: ['물류 AI 이해도 88% 향상', '참여율 94%', '최적화 기초 역량 확보']
      },
      {
        phase: '2단계: 스마트 배송 시스템 구축',
        duration: '5주 (48시간)',
        activities: [
          '경로최적화 AI 시스템 구축',
          '실시간 배송 모니터링 시스템',
          'n8n 기반 배송 프로세스 자동화',
          'IoT 연동 차량 관리 시스템'
        ],
        results: ['배송시간 45% 단축', '연료비 38% 절감', '자동화율 85%']
      },
      {
        phase: '3단계: 통합 물류 플랫폼 완성',
        duration: '2주 (8시간)',
        activities: [
          '통합 물류 관리 플랫폼 구축',
          '고객 배송 추적 시스템',
          '지속적 개선 프로세스 정착'
        ],
        results: ['통합 물류 시스템 완성', '고객만족도 92% 달성']
      }
    ],
    results: {
      quantitative: [
        { metric: '배송시간 단축', before: '4시간', after: '2.2시간', improvement: '45% 단축' },
        { metric: '연료비 절감', before: '100%', after: '62%', improvement: '38% 절감' },
        { metric: '배송 정확도', before: '85%', after: '96%', improvement: '11%p 향상' },
        { metric: '고객만족도', before: '78%', after: '92%', improvement: '14%p 향상' }
      ],
      financial: [
        { item: '연료비 절감 효과', amount: '연간 45억원' },
        { item: '운영 효율화', amount: '연간 35억원' },
        { item: '고객 확대 효과', amount: '연간 25억원' },
        { item: 'ROI', amount: '480%' }
      ],
      qualitative: [
        'AI 경로최적화로 배송 효율성 획기적 개선',
        'n8n 자동화로 물류 운영 완전 자동화',
        '실시간 모니터링으로 고객 서비스 품질 향상',
        '친환경 배송으로 ESG 경영 실현'
      ]
    },
    testimonial: {
      quote: "AICAMP 교육으로 물류업무가 혁신되었습니다. AI 최적화로 배송이 빨라지고 비용은 줄어들어 고객들이 매우 만족해하고 있어요.",
      author: "김물류",
      position: "운영본부장",
      company: "(주)스마트로지스틱스"
    },
    followUpResults: [
      { metric: '사업 확장', achievement: '스마트 물류 솔루션 B2B 사업 론칭' },
      { metric: '친환경 인증', achievement: '탄소중립 물류 인증 획득' },
      { metric: '기술 특허', achievement: '물류 최적화 알고리즘 특허 2건 출원' }
    ],
    tags: ['물류유통', '경로최적화', 'n8n자동화', '스마트배송', '비용절감']
  },

  // 통신업 1개
  'telecom-aicamp-network-optimization': {
    id: 'telecom-aicamp-network-optimization',
    category: 'telecom',
    industry: '통신업',
    companyName: '(주)네트워크AI솔루션',
    title: '네트워크 AI 최적화로 품질 55% 향상 및 장애시간 78% 감소',
    subtitle: 'AI 네트워크 모니터링 + n8n 자동화로 통신 품질 혁신',
    description: 'AICAMP 통신 특화 교육과 AI 기반 네트워크 관리 시스템으로 통신 품질 혁신, 장애시간 78% 감소',
    icon: Wifi,
    color: 'blue',
    heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop',
    companyInfo: {
      industry: '통신·네트워크 서비스',
      employees: '189명',
      revenue: '연매출 520억원',
      location: '서울특별시 강남구'
    },
    challenges: [
      { title: '네트워크 장애 빈발', description: '예측 불가능한 네트워크 장애로 서비스 중단', impact: '월평균 장애시간 48시간' },
      { title: '품질 모니터링 한계', description: '실시간 품질 관리의 어려움', impact: '고객 불만 증가' },
      { title: '수동 대응 지연', description: '장애 발생 시 수동 대응으로 복구 지연', impact: '평균 복구시간 4시간' }
    ],
    curriculum: {
      basic: [
        { title: '통신 AI 기초', duration: '10시간', description: '네트워크 AI, 품질 모니터링 기초' },
        { title: 'n8n 통신 자동화', duration: '14시간', description: '네트워크 운영 자동화 워크플로우' },
        { title: '데이터 분석 기초', duration: '8시간', description: '네트워크 트래픽 분석, 패턴 인식' }
      ],
      advanced: [
        { title: 'AI 네트워크 모니터링', duration: '24시간', description: 'ML 기반 네트워크 상태 예측' },
        { title: '자동 복구 시스템', duration: '20시간', description: 'AI 기반 자동 장애 복구' },
        { title: '품질 예측 모델', duration: '16시간', description: '네트워크 품질 예측 및 최적화' }
      ],
      executive: [
        { title: '스마트 네트워크 전략', duration: '6시간', description: '5G/6G 시대 네트워크 혁신 전략' },
        { title: 'AI 투자 ROI', duration: '4시간', description: '네트워크 AI 투자 효과 분석' }
      ]
    },
    process: [
      {
        phase: '1단계: 통신 AI 기초 교육',
        duration: '4주 (32시간)',
        activities: ['네트워크 AI 기술 교육', 'n8n 자동화 실습', '품질 데이터 분석'],
        results: ['통신 AI 이해도 90% 향상', '자동화 기초 역량 확보']
      },
      {
        phase: '2단계: AI 네트워크 시스템 구축',
        duration: '6주 (60시간)',
        activities: ['AI 모니터링 시스템 구축', '자동 복구 시스템', 'n8n 운영 자동화'],
        results: ['장애 예측 정확도 89%', '복구시간 78% 단축']
      }
    ],
    results: {
      quantitative: [
        { metric: '네트워크 품질 향상', before: '100%', after: '155%', improvement: '55% 향상' },
        { metric: '장애시간 감소', before: '48시간', after: '10.5시간', improvement: '78% 감소' },
        { metric: '복구시간 단축', before: '4시간', after: '25분', improvement: '90% 단축' },
        { metric: '고객만족도', before: '72%', after: '95%', improvement: '23%p 향상' }
      ],
      financial: [
        { item: '서비스 품질 향상', amount: '연간 95억원' },
        { item: '운영비 절감', amount: '연간 45억원' },
        { item: 'ROI', amount: '650%' }
      ],
      qualitative: [
        'AI 예측으로 네트워크 장애 사전 방지',
        'n8n 자동화로 24시간 무인 운영 실현',
        '실시간 품질 모니터링으로 서비스 안정성 확보'
      ]
    },
    testimonial: {
      quote: "AICAMP 교육으로 네트워크 운영이 완전히 바뀌었습니다. AI 예측과 자동화로 장애가 크게 줄어들어 고객 만족도가 높아졌어요.",
      author: "김통신",
      position: "네트워크운영본부장",
      company: "(주)네트워크AI솔루션"
    },
    followUpResults: [
      { metric: '기술 선도', achievement: '5G 네트워크 AI 최적화 선도기업 선정' },
      { metric: '특허 출원', achievement: '네트워크 AI 관련 특허 6건 출원' }
    ],
    tags: ['통신업', '네트워크최적화', 'AI모니터링', 'n8n자동화', '품질향상']
  },

  // 미디어 1개  
  'media-aicamp-content-automation': {
    id: 'media-aicamp-content-automation',
    category: 'media',
    industry: '미디어',
    companyName: '(주)AI미디어크리에이터',
    title: '콘텐츠 AI 자동화로 제작시간 72% 단축 및 조회수 180% 증가',
    subtitle: '생성형 AI + n8n 자동화로 콘텐츠 제작 혁신',
    description: 'AICAMP 미디어 특화 교육과 생성형 AI로 콘텐츠 제작 자동화 및 품질 향상, 조회수 180% 증가',
    icon: Video,
    color: 'red',
    heroImage: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=1200&h=600&fit=crop',
    companyInfo: {
      industry: '미디어·콘텐츠 제작',
      employees: '95명',
      revenue: '연매출 185억원',
      location: '서울특별시 마포구'
    },
    challenges: [
      { title: '콘텐츠 제작 시간 과다', description: '수작업 편집으로 인한 제작 지연', impact: '평균 제작시간 16시간' },
      { title: '일관성 부족', description: '크리에이터별 품질 편차', impact: '브랜드 일관성 저하' },
      { title: '트렌드 대응 지연', description: '빠른 트렌드 변화 대응 어려움', impact: '조회수 저조' }
    ],
    curriculum: {
      basic: [
        { title: '미디어 AI 기초', duration: '12시간', description: '생성형 AI, 영상 편집 AI 기초' },
        { title: 'n8n 미디어 자동화', duration: '16시간', description: '콘텐츠 제작 워크플로우 자동화' },
        { title: 'AI 콘텐츠 기획', duration: '8시간', description: 'ChatGPT 활용 콘텐츠 기획' }
      ],
      advanced: [
        { title: '영상 AI 편집', duration: '24시간', description: 'AI 영상 편집, 자동 자막 생성' },
        { title: '썸네일 AI 생성', duration: '16시간', description: 'AI 기반 썸네일 자동 생성' },
        { title: '트렌드 분석 AI', duration: '20시간', description: 'AI 기반 트렌드 분석 및 예측' }
      ],
      executive: [
        { title: '미디어 AI 전략', duration: '6시간', description: 'AI 미디어 사업 전략' },
        { title: '크리에이터 경제', duration: '2시간', description: 'AI 시대 크리에이터 생태계' }
      ]
    },
    process: [
      {
        phase: '1단계: 미디어 AI 기초 교육',
        duration: '4주 (36시간)',
        activities: ['생성형 AI 활용법', 'n8n 미디어 자동화', 'AI 콘텐츠 기획'],
        results: ['미디어 AI 이해도 88% 향상', '자동화 기초 역량 확보']
      },
      {
        phase: '2단계: AI 콘텐츠 시스템 구축',
        duration: '5주 (60시간)',
        activities: ['AI 영상 편집 시스템', '자동 썸네일 생성', '트렌드 분석 AI'],
        results: ['제작시간 72% 단축', '콘텐츠 품질 일관성 95%']
      }
    ],
    results: {
      quantitative: [
        { metric: '제작시간 단축', before: '16시간', after: '4.5시간', improvement: '72% 단축' },
        { metric: '조회수 증가', before: '100%', after: '280%', improvement: '180% 증가' },
        { metric: '콘텐츠 품질 일관성', before: '65%', after: '95%', improvement: '30%p 향상' },
        { metric: '크리에이터 만족도', before: '74%', after: '93%', improvement: '19%p 향상' }
      ],
      financial: [
        { item: '제작비 절감', amount: '연간 65억원' },
        { item: '광고 수익 증대', amount: '연간 125억원' },
        { item: 'ROI', amount: '580%' }
      ],
      qualitative: [
        '생성형 AI로 콘텐츠 제작 속도 획기적 개선',
        'n8n 자동화로 콘텐츠 배포 완전 자동화',
        'AI 트렌드 분석으로 바이럴 콘텐츠 제작 성공률 향상'
      ]
    },
    testimonial: {
      quote: "AICAMP 교육으로 콘텐츠 제작이 혁신되었습니다. AI 자동화로 제작 시간은 줄고 품질은 높아져서 조회수가 크게 증가했어요.",
      author: "박미디어",
      position: "콘텐츠제작본부장",
      company: "(주)AI미디어크리에이터"
    },
    followUpResults: [
      { metric: '채널 성장', achievement: '유튜브 구독자 500만 달성' },
      { metric: '사업 확장', achievement: 'AI 콘텐츠 제작 솔루션 B2B 사업 론칭' }
    ],
    tags: ['미디어', '콘텐츠자동화', '생성형AI', 'n8n자동화', '영상제작']
  },

  // 에너지 1개
  'energy-aicamp-smart-grid': {
    id: 'energy-aicamp-smart-grid',
    category: 'energy',
    industry: '에너지',
    companyName: '(주)스마트에너지그리드',
    title: '에너지 AI 예측으로 효율성 48% 향상 및 탄소배출 52% 감소',
    subtitle: 'ML 수요예측 + n8n 자동화로 스마트그리드 구축',
    description: 'AICAMP 에너지 특화 교육과 ML 기반 에너지 수요예측으로 스마트그리드 구축, 탄소배출 52% 감소',
    icon: Sun,
    color: 'yellow',
    heroImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=600&fit=crop',
    companyInfo: {
      industry: '에너지·전력 공급',
      employees: '167명',
      revenue: '연매출 680억원',
      location: '경기도 수원시'
    },
    challenges: [
      { title: '수요 예측 부정확', description: '에너지 수요 예측 오차로 비효율 발생', impact: '예측 정확도 68%' },
      { title: '탄소배출 과다', description: '비효율적 에너지 사용으로 탄소배출 증가', impact: '탄소배출 목표 미달성' },
      { title: '그리드 관리 복잡성', description: '다양한 에너지원 통합 관리 어려움', impact: '운영 효율성 저하' }
    ],
    curriculum: {
      basic: [
        { title: '에너지 AI 기초', duration: '10시간', description: '스마트그리드, 수요예측 AI 기초' },
        { title: 'n8n 에너지 자동화', duration: '14시간', description: '에너지 관리 자동화 워크플로우' },
        { title: '탄소중립 전략', duration: '8시간', description: 'ESG 경영, 탄소중립 실현 방안' }
      ],
      advanced: [
        { title: 'ML 수요예측 모델', duration: '24시간', description: '에너지 수요 예측 알고리즘 개발' },
        { title: 'IoT 그리드 연동', duration: '20시간', description: 'IoT 센서 기반 실시간 모니터링' },
        { title: '최적화 알고리즘', duration: '16시간', description: '에너지 분배 최적화 시스템' }
      ],
      executive: [
        { title: '에너지 전환 전략', duration: '6시간', description: '신재생 에너지 전환 로드맵' },
        { title: 'ESG 경영 전략', duration: '4시간', description: '지속가능한 에너지 경영' }
      ]
    },
    process: [
      {
        phase: '1단계: 에너지 AI 기초 교육',
        duration: '4주 (32시간)',
        activities: ['스마트그리드 이해', 'AI 수요예측 기초', 'n8n 에너지 자동화'],
        results: ['에너지 AI 이해도 91% 향상', '탄소중립 전략 수립']
      },
      {
        phase: '2단계: 스마트그리드 시스템 구축',
        duration: '6주 (60시간)',
        activities: ['ML 수요예측 모델', 'IoT 그리드 연동', '에너지 분배 최적화'],
        results: ['수요예측 정확도 94%', '에너지 효율성 48% 향상']
      }
    ],
    results: {
      quantitative: [
        { metric: '에너지 효율성', before: '100%', after: '148%', improvement: '48% 향상' },
        { metric: '탄소배출 감소', before: '100%', after: '48%', improvement: '52% 감소' },
        { metric: '수요예측 정확도', before: '68%', after: '94%', improvement: '26%p 향상' },
        { metric: '운영비 절감', before: '100%', after: '65%', improvement: '35% 절감' }
      ],
      financial: [
        { item: '에너지 비용 절감', amount: '연간 185억원' },
        { item: '탄소크레딧 수익', amount: '연간 45억원' },
        { item: 'ROI', amount: '720%' }
      ],
      qualitative: [
        'ML 수요예측으로 에너지 효율성 획기적 개선',
        'n8n 자동화로 스마트그리드 무인 운영',
        'ESG 경영 실현으로 지속가능한 에너지 생태계 구축'
      ]
    },
    testimonial: {
      quote: "AICAMP 교육으로 에너지 관리가 완전히 바뀌었습니다. AI 예측과 자동화로 효율성은 높아지고 탄소배출은 크게 줄어들었어요.",
      author: "이에너지",
      position: "스마트그리드본부장",
      company: "(주)스마트에너지그리드"
    },
    followUpResults: [
      { metric: 'ESG 인증', achievement: '탄소중립 우수기업 인증 획득' },
      { metric: '기술 선도', achievement: '스마트그리드 기술 특허 5건 출원' }
    ],
    tags: ['에너지', '수요예측', '스마트그리드', 'n8n자동화', '탄소중립']
  },

  // 농업 1개
  'agriculture-aicamp-smart-farming': {
    id: 'agriculture-aicamp-smart-farming',
    category: 'agriculture',
    industry: '농업',
    companyName: '(주)AI스마트팜',
    title: '농업 AI로 수확량 58% 증가 및 농약사용 65% 감소',
    subtitle: 'IoT + AI + n8n 자동화로 지속가능한 스마트팜 구축',
    description: 'AICAMP 농업 특화 교육과 IoT + AI 기반 스마트팜 시스템으로 지속가능한 농업 실현',
    icon: Leaf,
    color: 'green',
    heroImage: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&h=600&fit=crop',
    companyInfo: {
      industry: '스마트농업·농장운영',
      employees: '78명',
      revenue: '연매출 145억원',
      location: '전라남도 나주시'
    },
    challenges: [
      { title: '수확량 예측 어려움', description: '날씨와 환경 변화로 수확량 편차 심함', impact: '수확량 불안정' },
      { title: '농약 과다 사용', description: '병해충 예방을 위한 농약 남용', impact: '환경 오염 우려' },
      { title: '노동력 부족', description: '고령화로 인한 농업 인력 부족', impact: '생산성 저하' }
    ],
    curriculum: {
      basic: [
        { title: '스마트팜 AI 기초', duration: '8시간', description: 'IoT 센서, 작물 분석 AI 기초' },
        { title: 'n8n 농업 자동화', duration: '12시간', description: '농장 관리 자동화 워크플로우' }
      ],
      advanced: [
        { title: '작물 분석 AI', duration: '20시간', description: 'Computer Vision 기반 작물 상태 분석' },
        { title: '환경 최적화', duration: '16시간', description: 'ML 기반 환경 제어 시스템' }
      ],
      executive: [
        { title: '스마트농업 전략', duration: '4시간', description: '지속가능한 농업 혁신 전략' }
      ]
    },
    process: [
      {
        phase: '1단계: 스마트팜 기초 교육',
        duration: '3주 (20시간)',
        activities: ['IoT 센서 설치', 'AI 작물 분석', 'n8n 자동화'],
        results: ['농업 AI 이해도 85% 향상']
      },
      {
        phase: '2단계: 스마트팜 시스템 구축',
        duration: '5주 (36시간)',
        activities: ['환경 제어 자동화', '병해충 예측 AI', '수확량 예측 모델'],
        results: ['수확량 58% 증가', '농약사용 65% 감소']
      }
    ],
    results: {
      quantitative: [
        { metric: '수확량 증가', before: '100%', after: '158%', improvement: '58% 증가' },
        { metric: '농약사용 감소', before: '100%', after: '35%', improvement: '65% 감소' },
        { metric: '노동시간 단축', before: '8시간', after: '3시간', improvement: '62% 단축' }
      ],
      financial: [
        { item: '수확량 증대 효과', amount: '연간 45억원' },
        { item: '농약비 절감', amount: '연간 18억원' },
        { item: 'ROI', amount: '420%' }
      ],
      qualitative: [
        'AI 작물 분석으로 최적 재배 환경 구축',
        'n8n 자동화로 무인 농장 관리 실현',
        '친환경 농업으로 지속가능성 확보'
      ]
    },
    testimonial: {
      quote: "AICAMP 교육으로 농업이 완전히 바뀌었습니다. AI와 자동화로 수확량은 늘고 환경은 보호하는 스마트팜을 구축했어요.",
      author: "김농업",
      position: "농장장",
      company: "(주)AI스마트팜"
    },
    followUpResults: [
      { metric: '친환경 인증', achievement: '유기농 인증 획득' },
      { metric: '기술 확산', achievement: '지역 농가 20곳에 기술 전수' }
    ],
    tags: ['농업', '스마트팜', 'IoT센서', 'n8n자동화', '작물분석']
  },

  // 의료헬스케어 1개
  'healthcare-aicamp-telemedicine': {
    id: 'healthcare-aicamp-telemedicine',
    category: 'healthcare',
    industry: '의료헬스케어',
    companyName: '(주)AI메디케어',
    title: '원격의료 AI로 진료효율 78% 향상 및 환자만족도 96% 달성',
    subtitle: 'AI 진단보조 + n8n 자동화로 원격의료 혁신',
    description: 'AICAMP 의료 특화 교육과 AI 기반 원격진료 시스템으로 의료 접근성 혁신',
    icon: Heart,
    color: 'red',
    heroImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=600&fit=crop',
    companyInfo: {
      industry: '원격의료·헬스케어',
      employees: '124명',
      revenue: '연매출 285억원',
      location: '서울특별시 서초구'
    },
    challenges: [
      { title: '의료 접근성 제한', description: '지역별 의료 서비스 격차', impact: '의료 사각지대 발생' },
      { title: '진료 대기시간 과다', description: '환자 집중으로 진료 지연', impact: '환자 불만 증가' },
      { title: '의료진 업무 과부하', description: '반복적 업무로 피로도 증가', impact: '의료 서비스 품질 저하' }
    ],
    curriculum: {
      basic: [
        { title: '의료 AI 기초', duration: '10시간', description: '의료 AI, 원격진료 시스템 기초' },
        { title: 'n8n 의료 자동화', duration: '14시간', description: '의료 프로세스 자동화' }
      ],
      advanced: [
        { title: 'AI 진단보조', duration: '24시간', description: 'ML 기반 진단 보조 시스템' },
        { title: '환자 모니터링', duration: '16시간', description: 'IoT 기반 환자 상태 모니터링' }
      ],
      executive: [
        { title: '디지털 헬스케어 전략', duration: '6시간', description: '원격의료 사업 전략' }
      ]
    },
    process: [
      {
        phase: '1단계: 의료 AI 기초 교육',
        duration: '3주 (24시간)',
        activities: ['의료 AI 이해', 'n8n 의료 자동화', '원격진료 시스템'],
        results: ['의료 AI 역량 88% 향상']
      },
      {
        phase: '2단계: 원격의료 시스템 구축',
        duration: '5주 (40시간)',
        activities: ['AI 진단보조 시스템', '환자 모니터링', '진료 자동화'],
        results: ['진료효율 78% 향상', '환자만족도 96%']
      }
    ],
    results: {
      quantitative: [
        { metric: '진료효율 향상', before: '100%', after: '178%', improvement: '78% 향상' },
        { metric: '환자만족도', before: '82%', after: '96%', improvement: '14%p 향상' },
        { metric: '진료 대기시간', before: '45분', after: '12분', improvement: '73% 단축' }
      ],
      financial: [
        { item: '진료 효율화', amount: '연간 85억원' },
        { item: '운영비 절감', amount: '연간 35억원' },
        { item: 'ROI', amount: '520%' }
      ],
      qualitative: [
        'AI 진단보조로 의료 정확성 향상',
        'n8n 자동화로 의료진 업무 효율성 증대',
        '원격의료로 의료 접근성 획기적 개선'
      ]
    },
    testimonial: {
      quote: "AICAMP 교육으로 의료 서비스가 혁신되었습니다. AI와 자동화로 더 많은 환자를 효율적으로 진료할 수 있게 되었어요.",
      author: "박의료",
      position: "진료부장",
      company: "(주)AI메디케어"
    },
    followUpResults: [
      { metric: '서비스 확장', achievement: '전국 30개 지역 원격의료 서비스 확대' },
      { metric: '의료 혁신', achievement: '디지털 헬스케어 우수사례 선정' }
    ],
    tags: ['의료헬스케어', '원격의료', 'AI진단', 'n8n자동화', '환자관리']
  },

  // 이커머스, 인증관리, 투자, 교육에듀테크는 간소화하여 추가
  'ecommerce-aicamp-personalization': {
    id: 'ecommerce-aicamp-personalization',
    category: 'ecommerce',
    industry: '이커머스',
    companyName: '(주)AI커머스',
    title: '개인화 AI로 전환율 95% 향상 및 평균주문금액 168% 증가',
    subtitle: 'AI 추천엔진 + n8n 자동화로 고객 경험 최적화',
    description: 'AICAMP 이커머스 특화 교육과 개인화 추천 엔진으로 고객 경험 최적화',
    icon: ShoppingCart,
    color: 'purple',
    heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
    companyInfo: {
      industry: '이커머스·온라인쇼핑몰',
      employees: '156명',
      revenue: '연매출 420억원',
      location: '서울특별시 강남구'
    },
    challenges: [
      { title: '낮은 전환율', description: '방문자 대비 구매 전환율 저조', impact: '전환율 2.8%' },
      { title: '개인화 부족', description: '획일적 상품 추천', impact: '고객 이탈 증가' }
    ],
    curriculum: {
      basic: [
        { title: '이커머스 AI 기초', duration: '10시간', description: '추천시스템, 개인화 기술' },
        { title: 'n8n 커머스 자동화', duration: '14시간', description: '쇼핑몰 운영 자동화' }
      ],
      advanced: [
        { title: 'AI 추천엔진', duration: '20시간', description: '개인화 추천 알고리즘 개발' },
        { title: '고객 분석 AI', duration: '16시간', description: '고객 행동 패턴 분석' }
      ],
      executive: [
        { title: '이커머스 AI 전략', duration: '4시간', description: 'AI 기반 비즈니스 전략' }
      ]
    },
    process: [
      {
        phase: '1단계: 이커머스 AI 교육',
        duration: '3주 (24시간)',
        activities: ['추천시스템 이해', 'n8n 자동화', '고객 분석'],
        results: ['이커머스 AI 역량 90% 향상']
      }
    ],
    results: {
      quantitative: [
        { metric: '전환율 향상', before: '2.8%', after: '5.5%', improvement: '95% 향상' },
        { metric: '평균주문금액', before: '100%', after: '268%', improvement: '168% 증가' }
      ],
      financial: [
        { item: '매출 증대', amount: '연간 285억원' },
        { item: 'ROI', amount: '680%' }
      ],
      qualitative: ['AI 개인화로 고객 만족도 향상', 'n8n 자동화로 운영 효율성 증대']
    },
    testimonial: {
      quote: "AI 개인화 추천으로 고객들이 원하는 상품을 정확히 찾아주니 매출이 크게 증가했어요.",
      author: "김커머스",
      position: "마케팅본부장",
      company: "(주)AI커머스"
    },
    followUpResults: [
      { metric: '매출 성장', achievement: '연매출 1000억원 돌파' }
    ],
    tags: ['이커머스', '개인화추천', 'AI분석', 'n8n자동화']
  },

  'certification-aicamp-quality-management': {
    id: 'certification-aicamp-quality-management',
    category: 'certification',
    industry: '인증관리',
    companyName: '(주)AI품질인증',
    title: '인증 AI 자동화로 처리시간 82% 단축 및 정확도 98.8% 달성',
    subtitle: 'OCR + AI + n8n 자동화로 인증 프로세스 혁신',
    description: 'AICAMP 인증 특화 교육과 문서 자동화 AI로 인증 프로세스 혁신',
    icon: Shield,
    color: 'blue',
    heroImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop',
    companyInfo: {
      industry: '품질인증·컨설팅',
      employees: '89명',
      revenue: '연매출 165억원',
      location: '경기도 안양시'
    },
    challenges: [
      { title: '인증 처리 지연', description: '수작업 검토로 인한 처리 지연', impact: '평균 처리시간 15일' },
      { title: '문서 검증 복잡성', description: '다양한 인증 기준 적용 어려움', impact: '오류 발생 위험' }
    ],
    curriculum: {
      basic: [
        { title: '인증 AI 기초', duration: '8시간', description: 'OCR, 문서 분석 AI' },
        { title: 'n8n 인증 자동화', duration: '12시간', description: '인증 프로세스 자동화' }
      ],
      advanced: [
        { title: '문서 분석 AI', duration: '16시간', description: 'AI 기반 문서 검증' },
        { title: '자동 검증 시스템', duration: '12시간', description: '인증 기준 자동 적용' }
      ],
      executive: [
        { title: '인증 디지털화 전략', duration: '4시간', description: '인증업계 혁신 전략' }
      ]
    },
    process: [
      {
        phase: '1단계: 인증 AI 교육',
        duration: '3주 (20시간)',
        activities: ['OCR 시스템', 'AI 문서 분석', 'n8n 자동화'],
        results: ['인증 AI 역량 87% 향상']
      }
    ],
    results: {
      quantitative: [
        { metric: '처리시간 단축', before: '15일', after: '2.7일', improvement: '82% 단축' },
        { metric: '정확도', before: '91%', after: '98.8%', improvement: '7.8%p 향상' }
      ],
      financial: [
        { item: '업무 효율화', amount: '연간 45억원' },
        { item: 'ROI', amount: '380%' }
      ],
      qualitative: ['AI 자동화로 인증 프로세스 혁신', '고객 만족도 크게 향상']
    },
    testimonial: {
      quote: "AI 자동화로 인증 처리가 빨라지고 정확해져서 고객들이 만족해하고 있어요.",
      author: "이인증",
      position: "품질관리팀장",
      company: "(주)AI품질인증"
    },
    followUpResults: [
      { metric: '사업 확장', achievement: 'AI 인증 솔루션 B2B 사업 론칭' }
    ],
    tags: ['인증관리', '문서자동화', 'OCR', 'n8n자동화']
  },

  'investment-aicamp-portfolio-optimization': {
    id: 'investment-aicamp-portfolio-optimization',
    category: 'investment',
    industry: '투자',
    companyName: '(주)AI투자파트너스',
    title: '투자 AI로 수익률 45% 향상 및 리스크 68% 감소',
    subtitle: 'ML 포트폴리오 최적화 + n8n 자동화로 투자 성과 극대화',
    description: 'AICAMP 투자 특화 교육과 ML 기반 포트폴리오 최적화로 투자 성과 극대화',
    icon: TrendingUp,
    color: 'green',
    heroImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop',
    companyInfo: {
      industry: '투자자문·자산운용',
      employees: '67명',
      revenue: '연매출 195억원',
      location: '서울특별시 중구'
    },
    challenges: [
      { title: '투자 성과 불안정', description: '시장 변동성으로 수익률 편차 심함', impact: '연평균 수익률 12%' },
      { title: '리스크 관리 한계', description: '복잡한 시장 상황 대응 어려움', impact: '손실 위험 증가' }
    ],
    curriculum: {
      basic: [
        { title: '투자 AI 기초', duration: '10시간', description: '퀀트 투자, ML 기초' },
        { title: 'n8n 투자 자동화', duration: '14시간', description: '투자 프로세스 자동화' }
      ],
      advanced: [
        { title: 'ML 투자 모델', duration: '20시간', description: '포트폴리오 최적화 알고리즘' },
        { title: '리스크 관리 AI', duration: '16시간', description: 'AI 기반 리스크 예측' }
      ],
      executive: [
        { title: '투자 AI 전략', duration: '6시간', description: 'AI 투자 사업 전략' }
      ]
    },
    process: [
      {
        phase: '1단계: 투자 AI 교육',
        duration: '4주 (24시간)',
        activities: ['퀀트 투자 이해', 'ML 기초', 'n8n 자동화'],
        results: ['투자 AI 역량 89% 향상']
      }
    ],
    results: {
      quantitative: [
        { metric: '투자 수익률', before: '12%', after: '57%', improvement: '45%p 향상' },
        { metric: '리스크 감소', before: '100%', after: '32%', improvement: '68% 감소' }
      ],
      financial: [
        { item: '운용 수익 증대', amount: '연간 285억원' },
        { item: 'ROI', amount: '750%' }
      ],
      qualitative: ['ML 최적화로 안정적 고수익 실현', 'AI 리스크 관리로 손실 최소화']
    },
    testimonial: {
      quote: "AI 투자 시스템으로 수익률은 높아지고 리스크는 줄어들어 고객들이 만족해하고 있어요.",
      author: "박투자",
      position: "투자운용본부장",
      company: "(주)AI투자파트너스"
    },
    followUpResults: [
      { metric: '자산 증가', achievement: '운용자산 1조원 돌파' }
    ],
    tags: ['투자', '포트폴리오최적화', 'ML투자', 'n8n자동화']
  },

  'edutech-aicamp-adaptive-learning': {
    id: 'edutech-aicamp-adaptive-learning',
    category: 'edutech',
    industry: '교육에듀테크',
    companyName: '(주)AI학습플랫폼',
    title: '적응형 학습 AI로 학습효과 88% 향상 및 완주율 94% 달성',
    subtitle: '개인화 학습 AI + n8n 자동화로 맞춤형 교육 실현',
    description: 'AICAMP 에듀테크 특화 교육과 적응형 학습 알고리즘으로 개인 맞춤형 교육 실현',
    icon: GraduationCap,
    color: 'blue',
    heroImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop',
    companyInfo: {
      industry: '교육·에듀테크',
      employees: '145명',
      revenue: '연매출 235억원',
      location: '서울특별시 서초구'
    },
    challenges: [
      { title: '획일적 교육', description: '학습자별 수준 차이 미반영', impact: '학습 효과 저하' },
      { title: '낮은 완주율', description: '학습 동기 부족으로 중도 포기', impact: '완주율 58%' }
    ],
    curriculum: {
      basic: [
        { title: '에듀테크 AI 기초', duration: '10시간', description: '적응형 학습, 개인화 기술' },
        { title: 'n8n 교육 자동화', duration: '14시간', description: '학습 관리 자동화' }
      ],
      advanced: [
        { title: '적응형 학습 AI', duration: '20시간', description: '개인화 학습 알고리즘' },
        { title: '학습 분석 시스템', duration: '16시간', description: '학습 데이터 분석 및 예측' }
      ],
      executive: [
        { title: '에듀테크 혁신 전략', duration: '4시간', description: 'AI 교육 사업 전략' }
      ]
    },
    process: [
      {
        phase: '1단계: 에듀테크 AI 교육',
        duration: '3주 (24시간)',
        activities: ['적응형 학습 이해', 'n8n 자동화', '학습 분석'],
        results: ['에듀테크 AI 역량 91% 향상']
      }
    ],
    results: {
      quantitative: [
        { metric: '학습효과 향상', before: '100%', after: '188%', improvement: '88% 향상' },
        { metric: '완주율', before: '58%', after: '94%', improvement: '36%p 향상' }
      ],
      financial: [
        { item: '매출 증대', amount: '연간 145억원' },
        { item: 'ROI', amount: '520%' }
      ],
      qualitative: ['AI 개인화로 학습 만족도 향상', '자동화로 교육 효율성 증대']
    },
    testimonial: {
      quote: "AI 적응형 학습으로 학생들이 자신의 수준에 맞는 교육을 받아 학습 효과가 크게 향상되었어요.",
      author: "김교육",
      position: "교육개발본부장",
      company: "(주)AI학습플랫폼"
    },
    followUpResults: [
      { metric: '서비스 확장', achievement: '전국 500개 학교 도입' }
    ],
    tags: ['교육에듀테크', '적응형학습', '개인화교육', 'n8n자동화']
  }
};
