'use client';

// 업종 옵션 - 카테고리별 그룹화
export const industryCategories = [
  {
    category: 'IT/기술',
    options: [
      { value: 'software', label: '소프트웨어 개발' },
      { value: 'web_development', label: '웹개발/앱개발' },
      { value: 'ai_ml', label: 'AI/머신러닝' },
      { value: 'blockchain', label: '블록체인/핀테크' },
      { value: 'cybersecurity', label: '사이버보안' },
      { value: 'cloud_services', label: '클라우드 서비스' },
      { value: 'data_analytics', label: '데이터분석/빅데이터' },
      { value: 'iot', label: 'IoT/임베디드' },
      { value: 'game_development', label: '게임개발' },
      { value: 'it_consulting', label: 'IT컨설팅' }
    ]
  },
  {
    category: '제조/생산',
    options: [
      { value: 'automotive', label: '자동차/부품' },
      { value: 'electronics', label: '전자/반도체' },
      { value: 'machinery', label: '기계/장비' },
      { value: 'chemicals', label: '화학/석유화학' },
      { value: 'pharmaceuticals', label: '제약/의료기기' },
      { value: 'food_beverage', label: '식품/음료' },
      { value: 'textiles', label: '섬유/의류' },
      { value: 'steel_metal', label: '철강/금속' },
      { value: 'shipbuilding', label: '조선/해양' },
      { value: 'aerospace', label: '항공/우주' }
    ]
  },
  {
    category: '금융/보험',
    options: [
      { value: 'banking', label: '은행/저축은행' },
      { value: 'securities', label: '증권/투자' },
      { value: 'insurance', label: '보험' },
      { value: 'fintech', label: '핀테크' },
      { value: 'asset_management', label: '자산관리' },
      { value: 'credit_card', label: '신용카드' },
      { value: 'venture_capital', label: '벤처캐피탈/PE' }
    ]
  },
  {
    category: '유통/서비스',
    options: [
      { value: 'retail_offline', label: '오프라인 소매업' },
      { value: 'ecommerce', label: '이커머스/온라인쇼핑' },
      { value: 'wholesale', label: '도매업' },
      { value: 'fashion_beauty', label: '패션/뷰티' },
      { value: 'food_service', label: '외식/카페' },
      { value: 'accommodation', label: '숙박/호텔' },
      { value: 'travel_tourism', label: '여행/관광' },
      { value: 'delivery_platform', label: '배달/플랫폼' }
    ]
  },
  {
    category: '의료/헬스케어',
    options: [
      { value: 'hospital', label: '병원/의료기관' },
      { value: 'clinic', label: '의원/클리닉' },
      { value: 'dental', label: '치과' },
      { value: 'pharmacy', label: '약국' },
      { value: 'medical_device', label: '의료기기' },
      { value: 'digital_healthcare', label: '디지털헬스케어' },
      { value: 'biotechnology', label: '바이오테크놀로지' }
    ]
  },
  {
    category: '교육/연구',
    options: [
      { value: 'elementary_school', label: '초등교육' },
      { value: 'secondary_school', label: '중고등교육' },
      { value: 'university', label: '대학교육' },
      { value: 'vocational_training', label: '직업교육/학원' },
      { value: 'online_education', label: '온라인교육/에듀테크' },
      { value: 'research_institute', label: '연구소/R&D' },
      { value: 'library', label: '도서관/정보센터' }
    ]
  },
  {
    category: '건설/부동산',
    options: [
      { value: 'construction_general', label: '종합건설업' },
      { value: 'construction_specialty', label: '전문건설업' },
      { value: 'architecture', label: '건축설계' },
      { value: 'civil_engineering', label: '토목/인프라' },
      { value: 'real_estate_development', label: '부동산개발' },
      { value: 'real_estate_agency', label: '부동산중개' },
      { value: 'property_management', label: '자산관리/임대' }
    ]
  },
  {
    category: '운송/물류',
    options: [
      { value: 'logistics_3pl', label: '물류/3PL' },
      { value: 'trucking', label: '화물운송' },
      { value: 'shipping', label: '해운/항만' },
      { value: 'aviation', label: '항공운송' },
      { value: 'railway', label: '철도운송' },
      { value: 'courier', label: '택배/배송' },
      { value: 'warehousing', label: '창고/보관' }
    ]
  },
  {
    category: '미디어/콘텐츠',
    options: [
      { value: 'broadcasting', label: '방송' },
      { value: 'advertising', label: '광고/마케팅' },
      { value: 'publishing', label: '출판/인쇄' },
      { value: 'digital_content', label: '디지털콘텐츠' },
      { value: 'entertainment', label: '엔터테인먼트' },
      { value: 'gaming', label: '게임/이스포츠' },
      { value: 'social_media', label: '소셜미디어/플랫폼' }
    ]
  },
  {
    category: '전문서비스',
    options: [
      { value: 'law_firm', label: '법무/법률사무소' },
      { value: 'accounting_firm', label: '회계/세무사무소' },
      { value: 'consulting_management', label: '경영컨설팅' },
      { value: 'consulting_it', label: 'IT컨설팅' },
      { value: 'hr_consulting', label: 'HR/인사컨설팅' },
      { value: 'marketing_agency', label: '마케팅에이전시' },
      { value: 'design_agency', label: '디자인/브랜딩' }
    ]
  },
  {
    category: '에너지/환경',
    options: [
      { value: 'electric_power', label: '전력/발전' },
      { value: 'renewable_energy', label: '신재생에너지' },
      { value: 'oil_gas', label: '석유/가스' },
      { value: 'water_treatment', label: '상하수도/수처리' },
      { value: 'waste_management', label: '폐기물처리/재활용' },
      { value: 'environmental', label: '환경/친환경' }
    ]
  },
  {
    category: '농업/수산업',
    options: [
      { value: 'agriculture', label: '농업/농산물' },
      { value: 'livestock', label: '축산업' },
      { value: 'fisheries', label: '수산업' },
      { value: 'forestry', label: '임업' },
      { value: 'agtech', label: '농업기술/스마트팜' }
    ]
  },
  {
    category: '통신/네트워크',
    options: [
      { value: 'telecommunications', label: '통신사업' },
      { value: 'internet_provider', label: '인터넷서비스' },
      { value: 'network_equipment', label: '네트워크장비' },
      { value: 'mobile_services', label: '모바일서비스' }
    ]
  },
  {
    category: '공공/비영리',
    options: [
      { value: 'government', label: '정부/공공기관' },
      { value: 'non_profit', label: '비영리단체/NGO' },
      { value: 'association', label: '협회/단체' },
      { value: 'foundation', label: '재단법인' }
    ]
  }
];

// 기존 호환성을 위한 플랫 리스트
export const industryOptions = [
  ...industryCategories.flatMap(category => 
    category.options.map(option => ({
      ...option,
      category: category.category
    }))
  ),
  { value: 'other', label: '기타 (직접 입력)', category: '기타' }
];

// 기업 규모 옵션
export const companySizeOptions = [
  { value: '1-9', label: '1-9명 (소기업)' },
  { value: '10-49', label: '10-49명 (중소기업)' },
  { value: '50-199', label: '50-199명 (중기업)' },
  { value: '200-999', label: '200-999명 (중견기업)' },
  { value: '1000+', label: '1000명 이상 (대기업)' }
];

// 지역 옵션
export const regionOptions = [
  { value: 'seoul', label: '서울' },
  { value: 'gyeonggi', label: '경기' },
  { value: 'incheon', label: '인천' },
  { value: 'busan', label: '부산' },
  { value: 'daegu', label: '대구' },
  { value: 'gwangju', label: '광주' },
  { value: 'daejeon', label: '대전' },
  { value: 'ulsan', label: '울산' },
  { value: 'sejong', label: '세종' },
  { value: 'gangwon', label: '강원' },
  { value: 'chungbuk', label: '충북' },
  { value: 'chungnam', label: '충남' },
  { value: 'jeonbuk', label: '전북' },
  { value: 'jeonnam', label: '전남' },
  { value: 'gyeongbuk', label: '경북' },
  { value: 'gyeongnam', label: '경남' },
  { value: 'jeju', label: '제주' }
];

// 주요 고민사항 옵션
export const concernOptions = [
  { value: 'ai_adoption', label: 'AI 도입 방법을 모르겠음' },
  { value: 'cost_reduction', label: '비용 절감이 필요함' },
  { value: 'productivity', label: '업무 생산성 향상이 필요함' },
  { value: 'talent_shortage', label: 'AI 인재가 부족함' },
  { value: 'resistance', label: '직원들의 AI 도입 저항' },
  { value: 'roi_uncertainty', label: 'AI 투자 효과가 불확실함' },
  { value: 'data_quality', label: '데이터 품질/관리 문제' },
  { value: 'integration', label: '기존 시스템과의 통합 어려움' },
  { value: 'security', label: 'AI 보안/윤리 우려' },
  { value: 'strategy', label: 'AI 전략 수립이 필요함' },
  { value: 'competition', label: '경쟁사 대비 뒤처짐' },
  { value: 'customer_experience', label: '고객 경험 개선 필요' }
];

// 기대 효과 옵션
export const benefitOptions = [
  { value: 'cost_savings', label: '운영 비용 절감' },
  { value: 'revenue_growth', label: '매출 증대' },
  { value: 'efficiency', label: '업무 효율성 향상' },
  { value: 'innovation', label: '혁신적인 제품/서비스 개발' },
  { value: 'decision_making', label: '의사결정 개선' },
  { value: 'customer_satisfaction', label: '고객 만족도 향상' },
  { value: 'employee_satisfaction', label: '직원 만족도 향상' },
  { value: 'competitive_advantage', label: '경쟁 우위 확보' },
  { value: 'digital_transformation', label: '디지털 전환 가속화' },
  { value: 'risk_management', label: '리스크 관리 개선' },
  { value: 'new_business', label: '신규 비즈니스 기회 창출' },
  { value: 'work_life_balance', label: '일과 삶의 균형 개선' }
];

// 현재 AI 사용 수준 옵션
export const currentAIUsageOptions = [
  { value: 'none', label: '전혀 사용하지 않음' },
  { value: 'exploring', label: '도입을 검토 중' },
  { value: 'pilot', label: '파일럿 프로젝트 진행 중' },
  { value: 'partial', label: '일부 부서에서 사용 중' },
  { value: 'widespread', label: '전사적으로 활용 중' }
];

// AI 투자 계획 옵션
export const investmentPlanOptions = [
  { value: 'immediate', label: '즉시 투자 예정' },
  { value: '3months', label: '3개월 이내' },
  { value: '6months', label: '6개월 이내' },
  { value: '1year', label: '1년 이내' },
  { value: 'undecided', label: '미정' }
];