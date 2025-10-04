// 🏭 80개 업종 분류 + 기타입력 지원
export const INDUSTRIES = [
  // 제조업 (Manufacturing)
  '식품제조업', '음료제조업', '담배제조업', '섬유제품제조업', '의복제조업',
  '가죽/가방/신발제조업', '목재/나무제품제조업', '펄프/종이제품제조업', '인쇄/기록매체복제업',
  '코크스/연탄/석유정제품제조업', '화학물질/화학제품제조업', '의료용물질/의약품제조업',
  '고무/플라스틱제품제조업', '비금속광물제품제조업', '1차금속제조업', '금속가공제품제조업',
  '전자부품/컴퓨터/영상/음향/통신장비제조업', '의료/정밀/광학기기/시계제조업',
  '전기장비제조업', '기타기계/장비제조업', '자동차/트레일러제조업', '기타운송장비제조업',
  '가구제조업', '기타제품제조업',

  // 서비스업 (Service)
  '도매/소매업', '운수/창고업', '숙박/음식점업', '정보통신업', '금융/보험업',
  '부동산업', '전문/과학/기술서비스업', '사업시설관리/사업지원서비스업',
  '공공행정/국방/사회보장행정', '교육서비스업', '보건업/사회복지서비스업',
  '예술/스포츠/여가관련서비스업', '협회/단체/수리/기타개인서비스업',

  // IT/디지털 (IT/Digital)
  '소프트웨어개발업', '시스템통합/관리업', '데이터처리/호스팅/관련서비스업',
  '인터넷정보매개서비스업', '게임소프트웨어개발/공급업', 'IT컨설팅업',
  '웹개발업', '모바일앱개발업', 'AI/빅데이터서비스업', '클라우드서비스업',

  // 건설업 (Construction)
  '종합건설업', '전문건설업', '건축설계업', '엔지니어링서비스업', '건설장비임대업',
  '인테리어공사업', '조경공사업', '토목공사업', '전기공사업', '통신공사업',

  // 농업/수산업 (Agriculture/Fishery)
  '농업', '임업', '어업', '농산물가공업', '수산물가공업', '축산업', '화훼재배업',
  '유기농업', '스마트팜', '농업기술서비스업',

  // 에너지/환경 (Energy/Environment)
  '전기/가스/증기/공기조절공급업', '수도/하수/폐기물처리/원료재생업',
  '신재생에너지업', '환경컨설팅업', '폐기물처리업', '재활용업',

  // 의료/바이오 (Healthcare/Bio)
  '의료업', '보건업', '바이오의약품개발업', '의료기기제조업', '건강관리서비스업',
  '요양서비스업', '의료정보시스템개발업',

  // 문화/예술/미디어 (Culture/Arts/Media)
  '방송업', '영화/비디오/방송프로그램제작업', '음악산업', '출판업', '광고업',
  '디자인업', '사진업', '공연예술업', '박물관/미술관운영업', '콘텐츠제작업',

  // 기타 (Others)
  '기타'
] as const;

export type IndustryType = typeof INDUSTRIES[number];

// 업종별 특성 정의
export const INDUSTRY_CHARACTERISTICS = {
  // 제조업 특성
  '식품제조업': { category: 'manufacturing', digitalMaturity: 'medium', customerInteraction: 'low', regulationLevel: 'high' },
  '음료제조업': { category: 'manufacturing', digitalMaturity: 'medium', customerInteraction: 'low', regulationLevel: 'high' },
  '섬유제품제조업': { category: 'manufacturing', digitalMaturity: 'medium', customerInteraction: 'low', regulationLevel: 'medium' },
  '의복제조업': { category: 'manufacturing', digitalMaturity: 'medium', customerInteraction: 'medium', regulationLevel: 'low' },
  '화학물질/화학제품제조업': { category: 'manufacturing', digitalMaturity: 'high', customerInteraction: 'low', regulationLevel: 'high' },
  '전자부품/컴퓨터/영상/음향/통신장비제조업': { category: 'manufacturing', digitalMaturity: 'high', customerInteraction: 'medium', regulationLevel: 'medium' },
  '자동차/트레일러제조업': { category: 'manufacturing', digitalMaturity: 'high', customerInteraction: 'low', regulationLevel: 'high' },

  // 서비스업 특성
  '도매/소매업': { category: 'service', digitalMaturity: 'medium', customerInteraction: 'high', regulationLevel: 'medium' },
  '숙박/음식점업': { category: 'service', digitalMaturity: 'low', customerInteraction: 'high', regulationLevel: 'high' },
  '금융/보험업': { category: 'service', digitalMaturity: 'high', customerInteraction: 'high', regulationLevel: 'high' },
  '부동산업': { category: 'service', digitalMaturity: 'medium', customerInteraction: 'high', regulationLevel: 'high' },
  '교육서비스업': { category: 'service', digitalMaturity: 'medium', customerInteraction: 'high', regulationLevel: 'medium' },
  '보건업/사회복지서비스업': { category: 'service', digitalMaturity: 'medium', customerInteraction: 'high', regulationLevel: 'high' },

  // IT/디지털 특성
  '소프트웨어개발업': { category: 'it', digitalMaturity: 'high', customerInteraction: 'medium', regulationLevel: 'low' },
  '시스템통합/관리업': { category: 'it', digitalMaturity: 'high', customerInteraction: 'medium', regulationLevel: 'medium' },
  'AI/빅데이터서비스업': { category: 'it', digitalMaturity: 'high', customerInteraction: 'medium', regulationLevel: 'medium' },
  '웹개발업': { category: 'it', digitalMaturity: 'high', customerInteraction: 'medium', regulationLevel: 'low' },
  '모바일앱개발업': { category: 'it', digitalMaturity: 'high', customerInteraction: 'medium', regulationLevel: 'low' },

  // 건설업 특성
  '종합건설업': { category: 'construction', digitalMaturity: 'low', customerInteraction: 'medium', regulationLevel: 'high' },
  '전문건설업': { category: 'construction', digitalMaturity: 'low', customerInteraction: 'medium', regulationLevel: 'high' },
  '건축설계업': { category: 'construction', digitalMaturity: 'medium', customerInteraction: 'high', regulationLevel: 'high' },
  '인테리어공사업': { category: 'construction', digitalMaturity: 'low', customerInteraction: 'high', regulationLevel: 'medium' },

  // 농업/수산업 특성
  '농업': { category: 'agriculture', digitalMaturity: 'low', customerInteraction: 'low', regulationLevel: 'medium' },
  '스마트팜': { category: 'agriculture', digitalMaturity: 'high', customerInteraction: 'low', regulationLevel: 'medium' },
  '축산업': { category: 'agriculture', digitalMaturity: 'low', customerInteraction: 'low', regulationLevel: 'high' },

  // 의료/바이오 특성
  '의료업': { category: 'healthcare', digitalMaturity: 'medium', customerInteraction: 'high', regulationLevel: 'high' },
  '바이오의약품개발업': { category: 'healthcare', digitalMaturity: 'high', customerInteraction: 'low', regulationLevel: 'high' },
  '의료기기제조업': { category: 'healthcare', digitalMaturity: 'high', customerInteraction: 'medium', regulationLevel: 'high' },

  // 기타 기본 특성
  '기타': { category: 'other', digitalMaturity: 'medium', customerInteraction: 'medium', regulationLevel: 'medium' }
} as const;

// 업종별 핵심 성공 요인
export const INDUSTRY_SUCCESS_FACTORS = {
  manufacturing: ['생산 효율성', '품질 관리', '공급망 관리', '기술 혁신', '비용 최적화'],
  service: ['고객 만족도', '서비스 품질', '브랜드 이미지', '운영 효율성', '디지털 전환'],
  it: ['기술 역량', '프로젝트 관리', '인재 확보', '혁신 속도', '시장 대응력'],
  construction: ['프로젝트 관리', '안전 관리', '품질 관리', '자금 관리', '협력업체 관리'],
  agriculture: ['생산성', '품질', '유통 채널', '브랜딩', '지속가능성'],
  healthcare: ['전문성', '안전성', '규제 준수', '기술 혁신', '환자 만족도'],
  other: ['운영 효율성', '고객 만족도', '품질 관리', '마케팅', '재무 관리']
} as const;

// 업종별 정부 지원 사업
export const GOVERNMENT_SUPPORT_PROGRAMS = {
  manufacturing: [
    '스마트제조혁신 바우처',
    '제조업 디지털 전환 지원',
    '탄소중립 제조업 지원',
    '제조업 혁신기업 육성',
    '뿌리산업 경쟁력 강화'
  ],
  service: [
    '서비스업 디지털 전환 지원',
    '고객경험 혁신 지원',
    'K-뉴딜 서비스업 지원',
    '소상공인 지원사업',
    '관광서비스 혁신 지원'
  ],
  it: [
    'AI 바우처 지원사업',
    'SW 융합 클러스터 2.0',
    '디지털 뉴딜 지원',
    'ICT 혁신 바우처',
    '클라우드 이용 지원'
  ],
  construction: [
    '스마트건설 기술개발',
    '건설업 디지털 혁신',
    '그린뉴딜 건설업 지원',
    '건설기술 연구개발',
    '건설업 해외진출 지원'
  ],
  agriculture: [
    '스마트농업 확산사업',
    '농업 ICT 융복합 확산',
    '농촌융복합산업 지원',
    '농업기술 실용화',
    '친환경농업 직불제'
  ],
  healthcare: [
    '바이오헬스 산업 혁신',
    '디지털 헬스케어 지원',
    '의료기기 개발 지원',
    '바이오 벤처 육성',
    '정밀의료 기술개발'
  ],
  other: [
    '중소기업 디지털 전환',
    'AI 바우처',
    '혁신 지원사업',
    '창업 지원',
    '기술개발 지원'
  ]
} as const;

// 업종 카테고리별 그룹핑
export const INDUSTRY_CATEGORIES = {
  '제조업': INDUSTRIES.slice(0, 24),
  '서비스업': INDUSTRIES.slice(24, 37),
  'IT/디지털': INDUSTRIES.slice(37, 47),
  '건설업': INDUSTRIES.slice(47, 57),
  '농업/수산업': INDUSTRIES.slice(57, 67),
  '에너지/환경': INDUSTRIES.slice(67, 73),
  '의료/바이오': INDUSTRIES.slice(73, 80),
  '문화/예술/미디어': INDUSTRIES.slice(80, 90),
  '기타': ['기타']
} as const;

// 업종 검색 함수
export function searchIndustries(query: string): IndustryType[] {
  if (!query.trim()) return [...INDUSTRIES];
  
  const searchTerm = query.toLowerCase();
  return INDUSTRIES.filter(industry => 
    industry.toLowerCase().includes(searchTerm)
  );
}

// 업종 특성 조회 함수
export function getIndustryCharacteristics(industry: string) {
  return INDUSTRY_CHARACTERISTICS[industry as keyof typeof INDUSTRY_CHARACTERISTICS] || 
         INDUSTRY_CHARACTERISTICS['기타'];
}

// 업종별 성공 요인 조회 함수
export function getSuccessFactors(industry: string) {
  const characteristics = getIndustryCharacteristics(industry);
  return INDUSTRY_SUCCESS_FACTORS[characteristics.category];
}

// 업종별 정부 지원사업 조회 함수
export function getSupportPrograms(industry: string) {
  const characteristics = getIndustryCharacteristics(industry);
  return GOVERNMENT_SUPPORT_PROGRAMS[characteristics.category];
}