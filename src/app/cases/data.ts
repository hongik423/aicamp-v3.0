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
import { SuccessCase } from '@/types/success-case.types';

// SuccessCase 인터페이스는 이제 types 파일에서 import

export const successCases: SuccessCase[] = [
  // 제조업 3개
  {
    id: 'manufacturing-aicamp-digital-transformation',
    category: 'manufacturing',
    industry: '제조업',
    companyName: '(주)스마트매뉴팩처링',
    title: 'AI 프로세스 자동화로 스마트팩토리 구축 및 고몰입조직 실현',
    description: 'AICAMP 8주 교육과 부서별 워크숍으로 전직원 AI 역량 강화, n8n 기반 생산라인 자동화로 생산성 245% 향상',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=400&fit=crop',
    icon: Factory,
    color: 'blue',
    results: {
      efficiency: '245%',
      satisfaction: '94%'
    },
    tags: ['제조업', 'AICAMP교육', '스마트팩토리', 'n8n자동화', 'ChatGPT'],
    aiTools: ['ChatGPT API', 'n8n', 'Python', 'Computer Vision'],
    appliedModules: '기초 36시간 + 심화 60시간 + 경영진 12시간'
  },
  {
    id: 'manufacturing-aicamp-quality-innovation',
    category: 'manufacturing',
    industry: '제조업',
    companyName: '(주)정밀부품테크',
    title: 'AI 비전검사 + 예측분석으로 품질혁신 및 Zero Defect 문화 구축',
    description: 'AICAMP 실무교육과 AI 품질검사 워크숍, n8n 데이터 수집 자동화로 품질혁신과 고몰입 조직문화 구축',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
    icon: CheckCircle,
    color: 'green',
    results: {
      efficiency: '187%',
      satisfaction: '96%'
    },
    tags: ['제조업', 'AICAMP교육', '품질관리', 'AI검사', 'YOLO'],
    aiTools: ['YOLO', 'OpenCV', 'Grafana', 'n8n'],
    appliedModules: '기초 28시간 + 심화 48시간 + 경영진 12시간'
  },
  {
    id: 'manufacturing-aicamp-automation-excellence',
    category: 'manufacturing',
    industry: '제조업',
    companyName: '(주)오토메이션엑셀런스',
    title: 'IoT + AI 예측정비로 설비가동률 92% 달성 및 기술자 자신감 91% 향상',
    description: 'AICAMP 전문과정과 실습워크숍으로 자동화 전문가 양성, n8n 설비연동으로 가동률 92% 달성',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=400&fit=crop',
    icon: Building2,
    color: 'indigo',
    results: {
      efficiency: '192%',
      satisfaction: '91%'
    },
    tags: ['제조업', 'IoT', '예측정비', '설비자동화'],
    aiTools: ['IoT Sensors', 'ML 예측모델', 'n8n', 'Grafana'],
    appliedModules: '기초 24시간 + 심화 40시간 + 경영진 8시간'
  },

  // 서비스업 3개
  {
    id: 'service-aicamp-customer-experience',
    category: 'service',
    industry: '서비스업',
    companyName: '(주)고객만족서비스',
    title: 'AI 챗봇 + 개인화 추천으로 고객만족도 40% 향상 및 매출 138% 증가',
    description: 'AICAMP 서비스업 교육과 AI 챗봇 구축으로 24시간 고객 서비스 및 개인화 추천 시스템 구현',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    icon: Heart,
    color: 'pink',
    results: {
      efficiency: '138%',
      satisfaction: '89%'
    },
    tags: ['서비스업', 'AI챗봇', '고객경험', '개인화추천'],
    aiTools: ['ChatGPT', 'Dialogflow', '추천알고리즘', 'CRM연동'],
    appliedModules: '기초 32시간 + 심화 36시간 + 경영진 8시간'
  },
  {
    id: 'service-aicamp-hospitality-innovation',
    category: 'service',
    industry: '서비스업',
    companyName: '(주)호스피탈리티이노베이션',
    title: '호텔 AI 컨시어지로 운영효율 67% 향상 및 고객평점 4.8/5.0 달성',
    description: 'AICAMP 호스피탈리티 교육과 AI 컨시어지 시스템으로 호텔 운영 혁신 및 고객 만족도 극대화',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop',
    icon: Building2,
    color: 'purple',
    results: {
      efficiency: '167%',
      satisfaction: '96%'
    },
    tags: ['호스피탈리티', 'AI컨시어지', '운영효율', '고객만족'],
    aiTools: ['AI Chatbot', '음성인식', '다국어지원', '예약시스템'],
    appliedModules: '기초 28시간 + 심화 32시간 + 경영진 12시간'
  },
  {
    id: 'service-aicamp-retail-transformation',
    category: 'service',
    industry: '서비스업',
    companyName: '(주)스마트리테일',
    title: '매장 AI 분석으로 매출 28% 증가 및 재고회전율 85% 개선',
    description: 'AICAMP 리테일 교육과 Computer Vision 기반 고객 행동 분석으로 매장 운영 최적화',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
    icon: ShoppingCart,
    color: 'orange',
    results: {
      efficiency: '128%',
      satisfaction: '88%'
    },
    tags: ['리테일', 'Computer Vision', '고객분석', '재고관리'],
    aiTools: ['Computer Vision', '고객분석AI', '재고예측', 'POS연동'],
    appliedModules: '기초 24시간 + 심화 28시간 + 경영진 8시간'
  },

  // 스타트업 3개
  {
    id: 'startup-aicamp-fintech-innovation',
    category: 'startup',
    industry: '스타트업',
    companyName: '(주)핀테크이노베이터',
    title: 'AI 신용평가 모델로 대출승인률 45% 향상 및 리스크 78% 감소',
    description: 'AICAMP 핀테크 교육과 ML 기반 신용평가 모델 개발로 금융 혁신 실현',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop',
    icon: CreditCard,
    color: 'blue',
    results: {
      efficiency: '145%',
      satisfaction: '92%'
    },
    tags: ['핀테크', 'AI신용평가', 'ML모델', '리스크관리'],
    aiTools: ['ML 알고리즘', 'Python', '데이터분석', 'API연동'],
    appliedModules: '기초 20시간 + 심화 32시간 + 경영진 8시간'
  },
  {
    id: 'startup-aicamp-edtech-personalization',
    category: 'startup',
    industry: '스타트업',
    companyName: '(주)에듀테크퍼스널',
    title: 'AI 개인화 학습으로 학습효과 65% 향상 및 완주율 89% 달성',
    description: 'AICAMP 에듀테크 교육과 개인화 학습 알고리즘으로 맞춤형 교육 서비스 구현',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    icon: GraduationCap,
    color: 'green',
    results: {
      efficiency: '165%',
      satisfaction: '89%'
    },
    tags: ['에듀테크', '개인화학습', 'AI알고리즘', '학습분석'],
    aiTools: ['개인화AI', '학습분석', 'ChatGPT', '진도관리'],
    appliedModules: '기초 24시간 + 심화 28시간 + 경영진 8시간'
  },
  {
    id: 'startup-aicamp-healthtech-diagnosis',
    category: 'startup',
    industry: '스타트업',
    companyName: '(주)헬스테크다이어그노시스',
    title: 'AI 진단보조 시스템으로 진단정확도 94% 달성 및 의료진 만족도 96%',
    description: 'AICAMP 헬스테크 교육과 Computer Vision 기반 의료 진단보조 시스템 개발',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
    icon: Heart,
    color: 'red',
    results: {
      efficiency: '194%',
      satisfaction: '96%'
    },
    tags: ['헬스테크', 'AI진단', 'Computer Vision', '의료혁신'],
    aiTools: ['Computer Vision', 'Medical AI', 'DICOM분석', '진단보조'],
    appliedModules: '기초 28시간 + 심화 40시간 + 경영진 12시간'
  },

  // 전문서비스 3개
  {
    id: 'professional-aicamp-consulting-ai',
    category: 'professional',
    industry: '전문서비스',
    companyName: '(주)스마트컨설팅',
    title: 'AI 기반 컨설팅으로 고객사 매출 138% 증가 및 컨설턴트 생산성 256% 향상',
    description: 'AICAMP 컨설팅 교육과 AI 분석 도구로 데이터 기반 컨설팅 서비스 혁신',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    icon: Briefcase,
    color: 'blue',
    results: {
      efficiency: '256%',
      satisfaction: '96%'
    },
    tags: ['전문서비스', 'AI컨설팅', 'ChatGPT', '전략분석'],
    aiTools: ['ChatGPT', '데이터분석', 'Business Intelligence', '자동화'],
    appliedModules: '기초 32시간 + 심화 48시간 + 경영진 16시간'
  },
  {
    id: 'professional-aicamp-legal-ai',
    category: 'professional',
    industry: '전문서비스',
    companyName: '(주)리걸테크이노베이션',
    title: '법무 AI로 계약서 검토시간 78% 단축 및 법적 리스크 85% 감소',
    description: 'AICAMP 법무 교육과 NLP 기반 계약서 분석 시스템으로 법무 업무 혁신',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop',
    icon: Scale,
    color: 'purple',
    results: {
      efficiency: '178%',
      satisfaction: '94%'
    },
    tags: ['법무', 'NLP', '계약서분석', '리스크관리'],
    aiTools: ['NLP', '문서분석AI', '계약서검토', '법률DB'],
    appliedModules: '기초 24시간 + 심화 36시간 + 경영진 12시간'
  },
  {
    id: 'professional-aicamp-accounting-automation',
    category: 'professional',
    industry: '전문서비스',
    companyName: '(주)회계자동화솔루션',
    title: '회계 AI 자동화로 처리시간 85% 단축 및 정확도 99.2% 달성',
    description: 'AICAMP 회계 교육과 OCR + AI 기반 회계 자동화 시스템으로 업무 혁신',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    icon: Calculator,
    color: 'green',
    results: {
      efficiency: '185%',
      satisfaction: '99%'
    },
    tags: ['회계', 'OCR', '자동화', '정확도향상'],
    aiTools: ['OCR', '문서처리AI', '회계자동화', 'ERP연동'],
    appliedModules: '기초 20시간 + 심화 32시간 + 경영진 8시간'
  },

  // 추가 업종들 (간략화)
  {
    id: 'construction-aicamp-precision-construction',
    category: 'construction',
    industry: '건설업',
    companyName: '(주)정밀건설테크',
    title: 'AI 정밀측량으로 시공정확도 95% 달성 및 재시공률 78% 감소',
    description: 'AICAMP 건설 교육과 Computer Vision 기반 정밀측량 시스템으로 건설 혁신',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=400&fit=crop',
    icon: Ruler,
    color: 'orange',
    results: {
      efficiency: '195%',
      satisfaction: '96%'
    },
    tags: ['건설업', 'Computer Vision', '정밀측량', 'BIM'],
    aiTools: ['Computer Vision', '3D스캐닝', 'BIM', '측량AI'],
    appliedModules: '기초 28시간 + 심화 48시간 + 경영진 12시간'
  },
  {
    id: 'finance-aicamp-robo-advisor',
    category: 'finance',
    industry: '금융업',
    companyName: '(주)로보어드바이저',
    title: 'AI 자산관리로 수익률 24% 향상 및 고객만족도 94% 달성',
    description: 'AICAMP 금융 교육과 ML 기반 자산관리 알고리즘으로 투자 서비스 혁신',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=400&fit=crop',
    icon: BarChart3,
    color: 'blue',
    results: {
      efficiency: '124%',
      satisfaction: '94%'
    },
    tags: ['금융업', '로보어드바이저', 'ML투자', '자산관리'],
    aiTools: ['ML알고리즘', '투자분석', '리스크모델', '포트폴리오'],
    appliedModules: '기초 24시간 + 심화 40시간 + 경영진 16시간'
  },
  {
    id: 'logistics-aicamp-smart-delivery',
    category: 'logistics',
    industry: '물류유통',
    companyName: '(주)스마트딜리버리',
    title: '배송 AI 최적화로 배송시간 35% 단축 및 연료비 28% 절감',
    description: 'AICAMP 물류 교육과 경로최적화 AI로 스마트 배송 시스템 구축',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop',
    icon: Package,
    color: 'green',
    results: {
      efficiency: '135%',
      satisfaction: '91%'
    },
    tags: ['물류유통', '경로최적화', '스마트배송', '비용절감'],
    aiTools: ['경로최적화', 'GPS분석', '배송예측', '실시간추적'],
    appliedModules: '기초 20시간 + 심화 28시간 + 경영진 8시간'
  },
  {
    id: 'telecom-aicamp-network-optimization',
    category: 'telecom',
    industry: '통신업',
    companyName: '(주)네트워크옵티마이저',
    title: '네트워크 AI 최적화로 품질 42% 향상 및 장애시간 67% 감소',
    description: 'AICAMP 통신 교육과 AI 기반 네트워크 관리 시스템으로 통신 품질 혁신',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    icon: Wifi,
    color: 'blue',
    results: {
      efficiency: '142%',
      satisfaction: '95%'
    },
    tags: ['통신업', '네트워크최적화', 'AI모니터링', '품질향상'],
    aiTools: ['네트워크AI', '모니터링', '예측분석', '자동복구'],
    appliedModules: '기초 24시간 + 심화 36시간 + 경영진 12시간'
  },
  {
    id: 'media-aicamp-content-automation',
    category: 'media',
    industry: '미디어',
    companyName: '(주)컨텐츠오토메이션',
    title: '콘텐츠 AI 자동화로 제작시간 68% 단축 및 조회수 156% 증가',
    description: 'AICAMP 미디어 교육과 생성형 AI로 콘텐츠 제작 자동화 및 품질 향상',
    image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&h=400&fit=crop',
    icon: Video,
    color: 'red',
    results: {
      efficiency: '168%',
      satisfaction: '89%'
    },
    tags: ['미디어', '콘텐츠자동화', '생성형AI', '영상제작'],
    aiTools: ['생성형AI', '영상편집AI', '자막생성', '썸네일AI'],
    appliedModules: '기초 28시간 + 심화 32시간 + 경영진 8시간'
  },
  {
    id: 'energy-aicamp-smart-grid',
    category: 'energy',
    industry: '에너지',
    companyName: '(주)스마트그리드솔루션',
    title: '에너지 AI 예측으로 효율성 38% 향상 및 탄소배출 45% 감소',
    description: 'AICAMP 에너지 교육과 ML 기반 에너지 수요예측으로 스마트그리드 구축',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop',
    icon: Sun,
    color: 'yellow',
    results: {
      efficiency: '138%',
      satisfaction: '93%'
    },
    tags: ['에너지', '수요예측', '스마트그리드', '탄소중립'],
    aiTools: ['수요예측AI', 'IoT센서', '에너지분석', '그리드관리'],
    appliedModules: '기초 24시간 + 심화 40시간 + 경영진 16시간'
  },
  {
    id: 'agriculture-aicamp-smart-farming',
    category: 'agriculture',
    industry: '농업',
    companyName: '(주)스마트팜테크',
    title: '농업 AI로 수확량 43% 증가 및 농약사용 52% 감소',
    description: 'AICAMP 농업 교육과 IoT + AI 기반 스마트팜 시스템으로 지속가능한 농업 실현',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=400&fit=crop',
    icon: Leaf,
    color: 'green',
    results: {
      efficiency: '143%',
      satisfaction: '91%'
    },
    tags: ['농업', '스마트팜', 'IoT센서', '작물분석'],
    aiTools: ['작물분석AI', 'IoT센서', '환경모니터링', '병해충예측'],
    appliedModules: '기초 20시간 + 심화 32시간 + 경영진 12시간'
  },
  {
    id: 'healthcare-aicamp-telemedicine',
    category: 'healthcare',
    industry: '의료헬스케어',
    companyName: '(주)텔레메디신이노베이션',
    title: '원격의료 AI로 진료효율 67% 향상 및 환자만족도 94% 달성',
    description: 'AICAMP 의료 교육과 AI 기반 원격진료 시스템으로 의료 접근성 혁신',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop',
    icon: Heart,
    color: 'red',
    results: {
      efficiency: '167%',
      satisfaction: '94%'
    },
    tags: ['의료헬스케어', '원격의료', 'AI진단', '환자관리'],
    aiTools: ['원격진료AI', '환자모니터링', 'AI진단보조', '의료데이터'],
    appliedModules: '기초 28시간 + 심화 44시간 + 경영진 16시간'
  },
  {
    id: 'ecommerce-aicamp-personalization',
    category: 'ecommerce',
    industry: '이커머스',
    companyName: '(주)퍼스널커머스',
    title: '개인화 AI로 전환율 89% 향상 및 평균주문금액 156% 증가',
    description: 'AICAMP 이커머스 교육과 개인화 추천 엔진으로 고객 경험 최적화',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    icon: ShoppingCart,
    color: 'purple',
    results: {
      efficiency: '189%',
      satisfaction: '92%'
    },
    tags: ['이커머스', '개인화추천', '전환율향상', '고객분석'],
    aiTools: ['추천엔진', '고객분석AI', 'A/B테스트', '행동예측'],
    appliedModules: '기초 24시간 + 심화 36시간 + 경영진 12시간'
  },
  {
    id: 'certification-aicamp-quality-management',
    category: 'certification',
    industry: '인증관리',
    companyName: '(주)품질인증솔루션',
    title: '인증 AI 자동화로 처리시간 74% 단축 및 정확도 98.5% 달성',
    description: 'AICAMP 인증 교육과 문서 자동화 AI로 인증 프로세스 혁신',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
    icon: Shield,
    color: 'blue',
    results: {
      efficiency: '174%',
      satisfaction: '98%'
    },
    tags: ['인증관리', '문서자동화', 'OCR', '품질관리'],
    aiTools: ['문서분석AI', 'OCR', '자동검증', '인증DB'],
    appliedModules: '기초 20시간 + 심화 28시간 + 경영진 8시간'
  },
  {
    id: 'investment-aicamp-portfolio-optimization',
    category: 'investment',
    industry: '투자',
    companyName: '(주)포트폴리오옵티마이저',
    title: '투자 AI로 수익률 32% 향상 및 리스크 58% 감소',
    description: 'AICAMP 투자 교육과 ML 기반 포트폴리오 최적화로 투자 성과 극대화',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
    icon: TrendingUp,
    color: 'green',
    results: {
      efficiency: '132%',
      satisfaction: '95%'
    },
    tags: ['투자', '포트폴리오최적화', 'ML투자', '리스크관리'],
    aiTools: ['투자분석AI', '리스크모델', '포트폴리오', '시장예측'],
    appliedModules: '기초 28시간 + 심화 44시간 + 경영진 20시간'
  },
  {
    id: 'edutech-aicamp-adaptive-learning',
    category: 'edutech',
    industry: '교육에듀테크',
    companyName: '(주)어댑티브러닝',
    title: '적응형 학습 AI로 학습효과 78% 향상 및 완주율 93% 달성',
    description: 'AICAMP 에듀테크 교육과 적응형 학습 알고리즘으로 개인 맞춤형 교육 실현',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop',
    icon: GraduationCap,
    color: 'blue',
    results: {
      efficiency: '178%',
      satisfaction: '93%'
    },
    tags: ['교육에듀테크', '적응형학습', '개인화교육', '학습분석'],
    aiTools: ['적응형AI', '학습분석', '진도관리', '성취도측정'],
    appliedModules: '기초 24시간 + 심화 32시간 + 경영진 12시간'
  }
];
