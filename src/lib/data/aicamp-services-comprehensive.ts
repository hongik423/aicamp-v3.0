/**
 * AICAMP 전체 서비스 포괄적 데이터베이스
 * 이교장의 28년 경험을 바탕으로 한 모든 서비스 영역 상세 정보
 */

export interface ServiceDetail {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  targetAudience: string[];
  keyFeatures: string[];
  process: string[];
  deliverables: string[];
  duration: string;
  pricing: {
    basic?: string;
    standard?: string;
    premium?: string;
    consultation?: string;
  };
  benefits: string[];
  successCases: string[];
  roi: string;
  prerequisites?: string[];
  relatedServices: string[];
  governmentSupport?: string[];
  keywords: string[];
  priority: number;
}

export const AICAMP_COMPREHENSIVE_SERVICES: Record<string, ServiceDetail> = {
  // 1. AI 역량진단 서비스
  ai_diagnosis: {
    id: 'ai_diagnosis',
    category: 'AI 진단',
    title: 'AI 역량진단',
    subtitle: 'Ollama GPT-OSS 20B 온디바이스 모델 기반 정밀 진단',
    description: '45개 행동지표를 통한 기업의 AI 활용 수준 정밀 분석 및 맞춤형 로드맵 제시',
    targetAudience: [
      '중소기업 경영진',
      'AI 도입 검토 기업',
      '디지털 전환 담당자',
      '스타트업 대표'
    ],
    keyFeatures: [
      'Ollama GPT-OSS 20B AI 분석',
      '45개 행동지표 정밀 진단',
      'SWOT 분석 자동 생성',
      '우선순위 매트릭스 제공',
      '3단계 로드맵 자동 생성',
      '맥킨지 스타일 보고서',
      '실시간 이메일 발송'
    ],
    process: [
      '1단계: 온라인 진단 설문 (45개 질문)',
      '2단계: Ollama AI 분석 및 점수 산출',
      '3단계: SWOT 분석 및 우선순위 도출',
      '4단계: 맞춤형 로드맵 생성',
      '5단계: 보고서 자동 생성 및 발송'
    ],
    deliverables: [
      'AI 역량진단 보고서 (PDF)',
      'SWOT 분석 결과',
      '우선순위 매트릭스',
      '3단계 실행 로드맵',
      '추천 교육과정',
      '정부지원사업 매칭'
    ],
    duration: '즉시 (온라인 15분)',
    pricing: {
      basic: '무료',
      consultation: '상세 분석 시 별도 상담'
    },
    benefits: [
      'AI 도입 방향성 명확화',
      '투자 우선순위 설정',
      '리스크 사전 파악',
      '정부지원 기회 발굴',
      '경쟁력 분석 제공'
    ],
    successCases: [
      '제조업 A사: AI 도입 로드맵으로 생산성 40% 향상',
      '서비스업 B사: 진단 결과 기반 정부지원 3억원 확보',
      '유통업 C사: 우선순위 매트릭스로 투자 효율 300% 개선'
    ],
    roi: '무료 진단으로 투자 리스크 최소화',
    relatedServices: ['ai_education', 'business_consulting', 'policy_funding'],
    keywords: ['ai진단', '역량진단', 'ollama', '무료진단', '맞춤분석'],
    priority: 100
  },

  // 2. AI 교육 서비스
  ai_education: {
    id: 'ai_education',
    category: 'AI 교육',
    title: 'AI 교육 과정',
    subtitle: '28년 경험 기반 실무 중심 AI 교육',
    description: '기초부터 전문가까지 단계별 AI 교육으로 조직 전체의 AI 역량 강화',
    targetAudience: [
      '전 직급 임직원',
      'AI 초보자부터 전문가까지',
      '경영진 및 의사결정권자',
      '업무 효율화 담당자'
    ],
    keyFeatures: [
      '4단계 레벨별 교육 (기초→심화→전문→경영진)',
      '업종별 맞춤 커리큘럼',
      '실무 중심 프로젝트',
      '28년 경험 이교장 직강',
      '정부지원 최대 100%',
      '사후 지원 3-12개월',
      '수료증 및 인증서 발급'
    ],
    process: [
      '1단계: 수준 진단 및 과정 매칭',
      '2단계: 맞춤형 교육 설계',
      '3단계: 이론 + 실습 교육 진행',
      '4단계: 실전 프로젝트 수행',
      '5단계: 성과 평가 및 사후 지원'
    ],
    deliverables: [
      '레벨별 수료증',
      '실무 템플릿 (100-500개)',
      '프로젝트 결과물',
      '지속 지원 매뉴얼',
      '성과 측정 리포트'
    ],
    duration: '8시간 ~ 20시간 (과정별 상이)',
    pricing: {
      basic: 'ChatGPT 기초: 50만원 (정부지원 시 무료)',
      standard: 'n8n 자동화: 120만원 (정부지원 시 20만원)',
      premium: 'AI 리더십: 200만원 (1:1 컨설팅 포함)',
      consultation: '제조업 특화: 150만원 (정부지원 가능)'
    },
    benefits: [
      '업무 생산성 300-500% 향상',
      '반복 업무 90% 자동화',
      '의사결정 속도 50% 개선',
      '조직 AI 문화 정착',
      'ROI 300-800% 달성'
    ],
    successCases: [
      '제조업 D사: 전 직원 교육으로 생산성 60% 향상',
      '서비스업 E사: n8n 교육으로 업무시간 월 200시간 절약',
      '금융업 F사: AI 리더십 교육으로 디지털 전환 성공'
    ],
    roi: '투자 대비 300-800% 수익률 (3-12개월 내)',
    governmentSupport: [
      '일터혁신 상생컨설팅 (100% 지원)',
      '스마트공장 고도화 (80% 지원)',
      '중소벤처기업부 교육지원 (70% 지원)'
    ],
    relatedServices: ['ai_diagnosis', 'business_consulting', 'automation'],
    keywords: ['ai교육', 'chatgpt', 'n8n', '자동화', '프롬프트', '리더십'],
    priority: 95
  },

  // 3. 경영컨설팅 서비스
  business_consulting: {
    id: 'business_consulting',
    category: '경영컨설팅',
    title: 'BM ZEN 사업분석',
    subtitle: '28년 경험 전문 경영지도사의 맞춤형 컨설팅',
    description: '기업의 현재 상황을 정밀 분석하고 성장 전략을 수립하여 지속가능한 발전 방안 제시',
    targetAudience: [
      '중소기업 경영진',
      '성장 정체기 기업',
      '신사업 진출 기업',
      '구조조정 필요 기업'
    ],
    keyFeatures: [
      'BM ZEN 독자적 분석 방법론',
      '28년 현장 경험 기반 진단',
      '업종별 특화 컨설팅',
      '실행 가능한 액션플랜',
      '정기 모니터링 및 코칭',
      '성과 측정 및 개선 방안',
      '정부지원사업 연계'
    ],
    process: [
      '1단계: 현황 진단 (재무, 조직, 시장)',
      '2단계: 문제점 및 기회 분석',
      '3단계: 전략 방향 수립',
      '4단계: 실행 계획 구체화',
      '5단계: 모니터링 및 개선'
    ],
    deliverables: [
      '현황 진단 보고서',
      '전략 수립 보고서',
      '실행 계획서',
      '성과 지표 (KPI) 설정',
      '정기 모니터링 리포트'
    ],
    duration: '3-6개월 (프로젝트별 상이)',
    pricing: {
      basic: '기본 진단: 300만원',
      standard: '전략 수립: 500만원',
      premium: '통합 컨설팅: 800만원',
      consultation: '정부지원 시 20-50% 할인'
    },
    benefits: [
      '매출 20-50% 증대',
      '운영비 15-30% 절감',
      '조직 효율성 40% 향상',
      '의사결정 체계 구축',
      '지속성장 기반 마련'
    ],
    successCases: [
      '제조업 G사: 매출 45% 증가, 수익성 300% 개선',
      '서비스업 H사: 운영비 25% 절감, 고객만족도 60% 향상',
      '유통업 I사: 신사업 진출로 매출 다각화 성공'
    ],
    roi: '투자 대비 200-400% 수익률 (6-12개월 내)',
    governmentSupport: [
      '경영혁신 바우처 (최대 200만원)',
      '중소기업 컨설팅 지원 (70% 지원)',
      '지역별 경영지원 프로그램'
    ],
    relatedServices: ['ai_diagnosis', 'policy_funding', 'certification'],
    keywords: ['경영컨설팅', 'bm zen', '사업분석', '전략수립', '성장전략'],
    priority: 90
  },

  // 4. 정책자금 컨설팅
  policy_funding: {
    id: 'policy_funding',
    category: '정책자금',
    title: '정책자금 컨설팅',
    subtitle: '25년 노하우로 평균 5억원 정부지원 확보',
    description: '정부 지원사업 발굴부터 신청, 관리까지 전 과정 지원으로 자금 확보 성공률 극대화',
    targetAudience: [
      '자금 조달 필요 기업',
      'R&D 투자 계획 기업',
      '설비 투자 예정 기업',
      '창업 초기 기업'
    ],
    keyFeatures: [
      '25년 정책자금 전문 경험',
      '평균 5억원 지원금 확보',
      '성공률 85% 이상',
      '맞춤형 사업계획서 작성',
      '신청부터 정산까지 전 과정 지원',
      '연간 500개 이상 사업 모니터링',
      '사후관리 및 연속 지원'
    ],
    process: [
      '1단계: 기업 현황 및 니즈 분석',
      '2단계: 적합 사업 발굴 및 매칭',
      '3단계: 사업계획서 작성 지원',
      '4단계: 신청서 검토 및 제출',
      '5단계: 심사 대응 및 사후관리'
    ],
    deliverables: [
      '맞춤형 사업 추천서',
      '사업계획서 (전문가 작성)',
      '신청서류 일체',
      '심사 대응 가이드',
      '사후관리 매뉴얼'
    ],
    duration: '1-3개월 (사업별 상이)',
    pricing: {
      basic: '기본 컨설팅: 200만원',
      standard: '사업계획서 포함: 400만원',
      premium: '전 과정 지원: 600만원',
      consultation: '성공 시 지원금의 5-10%'
    },
    benefits: [
      '평균 5억원 지원금 확보',
      '자금 조달 비용 절감',
      '사업 추진 동력 확보',
      '기술개발 가속화',
      '시장 경쟁력 강화'
    ],
    successCases: [
      '제조업 J사: R&D 과제로 8억원 확보',
      'IT업 K사: 창업지원으로 3억원 + 후속 투자 유치',
      '바이오업 L사: 연속 과제로 총 15억원 확보'
    ],
    roi: '지원금 대비 컨설팅 비용 5-10% 수준',
    governmentSupport: [
      'R&D 과제 (중기부, 산업부, 과기부)',
      '창업지원 (창진원, 중진공)',
      '설비투자 (지자체별 프로그램)',
      '수출지원 (KOTRA, 중기부)',
      '인력양성 (고용부, 중기부)'
    ],
    relatedServices: ['business_consulting', 'tech_startup', 'certification'],
    keywords: ['정책자금', '정부지원', 'r&d', '창업지원', '설비투자'],
    priority: 88
  },

  // 5. 인증 컨설팅
  certification: {
    id: 'certification',
    category: '인증컨설팅',
    title: '인증 컨설팅',
    subtitle: '연간 5천만원 세제혜택을 위한 각종 인증 취득 지원',
    description: 'ISO, 벤처기업, 연구소 등 각종 인증 취득으로 세제혜택 및 경쟁력 확보 지원',
    targetAudience: [
      '세제혜택 필요 기업',
      '품질 시스템 구축 기업',
      '해외 진출 계획 기업',
      '공공입찰 참여 기업'
    ],
    keyFeatures: [
      '연간 5천만원 세제혜택 확보',
      '15년 인증 전문 경험',
      '성공률 95% 이상',
      '맞춤형 시스템 구축',
      '사후 유지관리 지원',
      '갱신 및 확장 인증 지원',
      '정부 인센티브 최대 활용'
    ],
    process: [
      '1단계: 인증 필요성 및 적합성 분석',
      '2단계: 현황 진단 및 GAP 분석',
      '3단계: 시스템 구축 및 문서화',
      '4단계: 내부 심사 및 개선',
      '5단계: 인증 심사 대응 및 취득'
    ],
    deliverables: [
      '인증 로드맵',
      '시스템 구축 매뉴얼',
      '필수 문서 일체',
      '내부 심사 보고서',
      '인증서 및 사후관리 가이드'
    ],
    duration: '3-6개월 (인증별 상이)',
    pricing: {
      basic: 'ISO 9001: 800만원',
      standard: 'ISO 14001: 1,000만원',
      premium: '통합 인증: 1,500만원',
      consultation: '벤처기업 인증: 500만원'
    },
    benefits: [
      '연간 5천만원 세제혜택',
      '공공입찰 가점 확보',
      '해외 진출 신뢰도 향상',
      '품질 시스템 체계화',
      '조직 운영 효율성 개선'
    ],
    successCases: [
      '제조업 M사: ISO 통합 인증으로 연간 3천만원 절세',
      '건설업 N사: 품질 인증으로 대형 프로젝트 수주',
      'IT업 O사: 벤처 인증으로 세제혜택 + 투자 유치'
    ],
    roi: '세제혜택으로 1-2년 내 투자비 회수',
    governmentSupport: [
      '벤처기업 확인 (세제혜택)',
      '기업부설연구소 (세제혜택)',
      '이노비즈 인증 (정부지원 우대)',
      '메인비즈 인증 (수출 지원)'
    ],
    relatedServices: ['business_consulting', 'policy_funding', 'tech_startup'],
    keywords: ['인증', 'iso', '벤처기업', '연구소', '세제혜택'],
    priority: 85
  },

  // 6. AI 생산성 향상
  ai_productivity: {
    id: 'ai_productivity',
    category: 'AI 생산성',
    title: 'AI 생산성 향상',
    subtitle: 'AI 도구 도입으로 업무 효율성 극대화',
    description: '기업 맞춤형 AI 도구 분석 및 도입으로 생산성 혁신과 업무 자동화 실현',
    targetAudience: [
      '업무 효율화 필요 기업',
      'AI 도입 초기 기업',
      '반복 업무 많은 조직',
      '디지털 전환 추진 기업'
    ],
    keyFeatures: [
      '맞춤형 AI 도구 분석',
      '업무 프로세스 최적화',
      '자동화 시스템 구축',
      '생산성 측정 및 모니터링',
      'ROI 분석 및 개선',
      '직원 교육 및 지원',
      '지속적 업데이트 관리'
    ],
    process: [
      '1단계: 현재 업무 프로세스 분석',
      '2단계: AI 도구 적합성 평가',
      '3단계: 맞춤형 솔루션 설계',
      '4단계: 단계별 도입 및 교육',
      '5단계: 성과 측정 및 최적화'
    ],
    deliverables: [
      'AI 도구 분석 보고서',
      '업무 자동화 설계서',
      '도입 로드맵',
      '교육 매뉴얼',
      '성과 측정 대시보드'
    ],
    duration: '2-4개월',
    pricing: {
      basic: '기본 분석: 300만원',
      standard: '도구 도입: 600만원',
      premium: '통합 솔루션: 1,000만원',
      consultation: '성과 기반 과금 가능'
    },
    benefits: [
      '업무 효율성 40-70% 향상',
      '반복 업무 80% 자동화',
      '의사결정 속도 50% 개선',
      '인적 오류 90% 감소',
      '직원 만족도 향상'
    ],
    successCases: [
      '서비스업 P사: AI 도구로 고객응대 시간 60% 단축',
      '제조업 Q사: 품질관리 자동화로 불량률 80% 감소',
      '금융업 R사: 문서처리 자동화로 업무시간 50% 절약'
    ],
    roi: '투자 대비 300-500% 수익률 (6개월 내)',
    relatedServices: ['ai_education', 'business_consulting', 'automation'],
    keywords: ['ai생산성', '업무자동화', '효율성', 'ai도구', '프로세스개선'],
    priority: 82
  },

  // 7. 기술창업 지원
  tech_startup: {
    id: 'tech_startup',
    category: '기술창업',
    title: '기술창업 지원',
    subtitle: '기술기반 창업부터 성장까지 전 과정 지원',
    description: '혁신적인 기술 아이디어를 성공적인 비즈니스로 전환하는 전 과정 맞춤 지원',
    targetAudience: [
      '기술창업 준비자',
      '초기 스타트업',
      '기술사업화 기업',
      '투자 유치 희망 기업'
    ],
    keyFeatures: [
      '기술사업화 전문 컨설팅',
      '사업모델 검증 및 개발',
      '투자 유치 전략 수립',
      '정부지원사업 연계',
      '네트워킹 및 멘토링',
      '시장 진출 전략',
      '성장 단계별 지원'
    ],
    process: [
      '1단계: 기술 및 시장성 검증',
      '2단계: 사업모델 개발',
      '3단계: 사업계획서 작성',
      '4단계: 투자 유치 지원',
      '5단계: 사업화 및 성장 지원'
    ],
    deliverables: [
      '기술사업화 전략서',
      '사업모델 캔버스',
      '투자 유치 자료',
      '정부지원 신청서',
      '성장 로드맵'
    ],
    duration: '6-12개월',
    pricing: {
      basic: '기본 컨설팅: 500만원',
      standard: '사업화 지원: 800만원',
      premium: '투자 유치 포함: 1,200만원',
      consultation: '성공 수수료 방식 가능'
    },
    benefits: [
      '창업 성공률 70% 이상',
      '평균 투자 유치 5억원',
      '정부지원 연계 확률 80%',
      '시장 진출 시간 50% 단축',
      '지속적 성장 기반 구축'
    ],
    successCases: [
      'AI 스타트업 S사: 시드 투자 10억원 유치',
      '바이오텍 T사: 정부과제 5억원 + 후속 투자 20억원',
      'IoT 스타트업 U사: 글로벌 진출 및 엑시트 성공'
    ],
    roi: '투자 유치 성공 시 10-50배 수익률',
    governmentSupport: [
      '창업도약패키지 (최대 1억원)',
      'TIPS 프로그램 (최대 5억원)',
      '중소벤처기업부 창업지원',
      '기술보증기금 연계'
    ],
    relatedServices: ['policy_funding', 'business_consulting', 'investment_analysis'],
    keywords: ['기술창업', '스타트업', '투자유치', '사업화', '기술사업화'],
    priority: 80
  },

  // 8. 웹사이트 제작
  website_development: {
    id: 'website_development',
    category: '웹사이트',
    title: '웹사이트 제작',
    subtitle: '온라인 매출 300-500% 증대를 위한 웹사이트 구축',
    description: '효과적인 온라인 마케팅과 고객 유치를 위한 전략적 웹사이트 구축 서비스',
    targetAudience: [
      '온라인 진출 필요 기업',
      '웹사이트 리뉴얼 기업',
      '마케팅 강화 필요 기업',
      '브랜드 이미지 개선 기업'
    ],
    keyFeatures: [
      '반응형 웹사이트 구축',
      'SEO 최적화',
      '사용자 경험(UX) 설계',
      '콘텐츠 관리 시스템',
      '성과 분석 도구 연동',
      '유지보수 서비스',
      '마케팅 도구 통합'
    ],
    process: [
      '1단계: 요구사항 분석 및 기획',
      '2단계: 디자인 및 UX 설계',
      '3단계: 개발 및 콘텐츠 제작',
      '4단계: 테스트 및 최적화',
      '5단계: 런칭 및 마케팅 지원'
    ],
    deliverables: [
      '반응형 웹사이트',
      'SEO 최적화 보고서',
      '관리자 매뉴얼',
      '성과 분석 대시보드',
      '유지보수 가이드'
    ],
    duration: '1-3개월',
    pricing: {
      basic: '기본형: 300만원',
      standard: '표준형: 600만원',
      premium: '프리미엄: 1,000만원',
      consultation: '맞춤형 견적'
    },
    benefits: [
      '온라인 매출 300-500% 증대',
      '브랜드 인지도 향상',
      '고객 유입 경로 다각화',
      '마케팅 비용 효율성 개선',
      '24시간 자동 영업 시스템'
    ],
    successCases: [
      '제조업 V사: 웹사이트 리뉴얼로 문의 400% 증가',
      '서비스업 W사: SEO 최적화로 검색 유입 300% 향상',
      '유통업 X사: 온라인 쇼핑몰로 매출 500% 증대'
    ],
    roi: '투자 대비 200-400% 수익률 (6-12개월 내)',
    relatedServices: ['business_consulting', 'ai_productivity', 'marketing'],
    keywords: ['웹사이트', '홈페이지', 'seo', '온라인마케팅', '반응형'],
    priority: 78
  },

  // 9. 공장/부동산 경매
  factory_auction: {
    id: 'factory_auction',
    category: '경매컨설팅',
    title: '공장/부동산 경매',
    subtitle: '투자비 35-50% 절약하는 안전한 경매 투자',
    description: '전문가의 경매 분석과 리스크 관리로 안전하고 수익성 높은 부동산 투자 지원',
    targetAudience: [
      '공장 부지 필요 기업',
      '부동산 투자자',
      '사업 확장 계획 기업',
      '자산 포트폴리오 다각화 희망자'
    ],
    keyFeatures: [
      '투자비 35-50% 절약',
      '전문가 경매 분석',
      '리스크 사전 진단',
      '법적 검토 및 지원',
      '자금 조달 연계',
      '사후 관리 서비스',
      '수익성 분석 제공'
    ],
    process: [
      '1단계: 투자 목적 및 예산 분석',
      '2단계: 물건 발굴 및 실사',
      '3단계: 리스크 분석 및 평가',
      '4단계: 입찰 전략 수립',
      '5단계: 낙찰 후 사후 처리'
    ],
    deliverables: [
      '물건 분석 보고서',
      '리스크 평가서',
      '입찰 전략서',
      '법적 검토 의견서',
      '사후 관리 가이드'
    ],
    duration: '1-6개월 (물건별 상이)',
    pricing: {
      basic: '기본 분석: 200만원',
      standard: '전 과정 지원: 500만원',
      premium: '포트폴리오 관리: 800만원',
      consultation: '낙찰가의 1-3%'
    },
    benefits: [
      '투자비 35-50% 절약',
      '안전한 투자 수익 확보',
      '전문가 리스크 관리',
      '법적 분쟁 예방',
      '자산 가치 상승 기대'
    ],
    successCases: [
      '제조업 Y사: 공장 경매로 30억원 절약',
      '투자자 Z씨: 상업용 부동산 경매로 연 15% 수익',
      '건설업 AA사: 토지 경매로 개발 사업 성공'
    ],
    roi: '시세 대비 20-40% 할인 매입',
    relatedServices: ['business_consulting', 'investment_analysis', 'policy_funding'],
    keywords: ['경매', '공장경매', '부동산투자', '투자컨설팅', '자산관리'],
    priority: 75
  },

  // 10. 투자분석 서비스
  investment_analysis: {
    id: 'investment_analysis',
    category: '투자분석',
    title: '투자분석 서비스',
    subtitle: 'AI 기반 정밀 투자 분석 및 리스크 관리',
    description: '데이터 기반 투자 분석과 AI 예측 모델로 최적의 투자 의사결정 지원',
    targetAudience: [
      '투자 검토 기업',
      '자금 운용 담당자',
      '신사업 진출 기업',
      '포트폴리오 관리자'
    ],
    keyFeatures: [
      'AI 기반 투자 분석',
      '리스크 시나리오 분석',
      '수익성 예측 모델링',
      '시장 동향 분석',
      '포트폴리오 최적화',
      '실시간 모니터링',
      '전문가 자문 서비스'
    ],
    process: [
      '1단계: 투자 목표 및 제약 조건 분석',
      '2단계: 시장 및 경쟁 환경 분석',
      '3단계: 재무 모델링 및 시나리오 분석',
      '4단계: 리스크 평가 및 대응 방안',
      '5단계: 투자 의사결정 지원'
    ],
    deliverables: [
      '투자 분석 보고서',
      '재무 모델링 결과',
      '리스크 매트릭스',
      '시나리오 분석서',
      '투자 권고안'
    ],
    duration: '2-8주',
    pricing: {
      basic: '기본 분석: 400만원',
      standard: '정밀 분석: 700만원',
      premium: '통합 자문: 1,200만원',
      consultation: '투자 규모별 차등'
    },
    benefits: [
      '투자 성공률 향상',
      '리스크 최소화',
      '수익률 최적화',
      '의사결정 근거 제공',
      '전문가 네트워크 활용'
    ],
    successCases: [
      '투자회사 BB: AI 분석으로 포트폴리오 수익률 25% 향상',
      '제조업 CC사: 신사업 투자로 3년 내 투자비 회수',
      '부동산 DD사: 리스크 분석으로 손실 예방 및 안정 수익'
    ],
    roi: '투자 성공률 향상으로 장기 수익 극대화',
    relatedServices: ['business_consulting', 'factory_auction', 'policy_funding'],
    keywords: ['투자분석', 'ai분석', '리스크관리', '재무모델링', '포트폴리오'],
    priority: 73
  }
};

/**
 * 서비스 검색 및 추천 엔진
 */
export class ServiceRecommendationEngine {
  /**
   * 키워드로 관련 서비스 찾기
   */
  static findByKeywords(keywords: string[]): ServiceDetail[] {
    const results: { service: ServiceDetail; score: number }[] = [];
    
    for (const service of Object.values(AICAMP_COMPREHENSIVE_SERVICES)) {
      let score = 0;
      
      keywords.forEach(keyword => {
        const lowerKeyword = keyword.toLowerCase();
        
        // 제목 매칭 (높은 점수)
        if (service.title.toLowerCase().includes(lowerKeyword)) score += 15;
        if (service.subtitle.toLowerCase().includes(lowerKeyword)) score += 12;
        if (service.category.toLowerCase().includes(lowerKeyword)) score += 10;
        
        // 키워드 매칭 (최고 점수)
        service.keywords.forEach(serviceKeyword => {
          if (serviceKeyword.includes(lowerKeyword)) score += 20;
        });
        
        // 설명 매칭
        if (service.description.toLowerCase().includes(lowerKeyword)) score += 8;
        
        // 대상자 매칭
        service.targetAudience.forEach(audience => {
          if (audience.toLowerCase().includes(lowerKeyword)) score += 6;
        });
        
        // 특징 매칭
        service.keyFeatures.forEach(feature => {
          if (feature.toLowerCase().includes(lowerKeyword)) score += 4;
        });
      });
      
      if (score > 0) {
        results.push({ service, score });
      }
    }
    
    return results
      .sort((a, b) => b.score - a.score)
      .map(result => result.service);
  }
  
  /**
   * 카테고리별 서비스 조회
   */
  static getByCategory(category: string): ServiceDetail[] {
    return Object.values(AICAMP_COMPREHENSIVE_SERVICES)
      .filter(service => service.category.toLowerCase().includes(category.toLowerCase()))
      .sort((a, b) => b.priority - a.priority);
  }
  
  /**
   * 맞춤형 서비스 추천
   */
  static getRecommendations(profile: {
    industry?: string;
    size?: string;
    budget?: number;
    goals?: string[];
    urgency?: string;
  }): ServiceDetail[] {
    const keywords: string[] = [];
    
    if (profile.industry) keywords.push(profile.industry);
    if (profile.goals) keywords.push(...profile.goals);
    
    let recommendations = this.findByKeywords(keywords);
    
    // 예산 필터링
    if (profile.budget) {
      recommendations = recommendations.filter(service => {
        const basicPrice = service.pricing.basic;
        if (basicPrice && basicPrice !== '무료') {
          const price = parseInt(basicPrice.replace(/[^0-9]/g, ''));
          return price <= profile.budget!;
        }
        return true;
      });
    }
    
    return recommendations.slice(0, 5); // 상위 5개 추천
  }
  
  /**
   * 관련 서비스 조회
   */
  static getRelatedServices(serviceId: string): ServiceDetail[] {
    const service = AICAMP_COMPREHENSIVE_SERVICES[serviceId];
    if (!service) return [];
    
    return service.relatedServices
      .map(id => AICAMP_COMPREHENSIVE_SERVICES[id])
      .filter(Boolean)
      .sort((a, b) => b.priority - a.priority);
  }
}
