/**
 * AICAMP AI 역량진단 시스템 - 옵션 상수
 */

// 업종 옵션 (확장된 버전)
export const industryOptions = [
  // 제조업 세분화
  { value: 'manufacturing_general', label: '제조업 (일반)' },
  { value: 'manufacturing_electronics', label: '전자/반도체 제조업' },
  { value: 'manufacturing_automotive', label: '자동차 제조업' },
  { value: 'manufacturing_machinery', label: '기계/장비 제조업' },
  { value: 'manufacturing_textile', label: '섬유/의류 제조업' },
  { value: 'manufacturing_food', label: '식품 제조업' },
  { value: 'manufacturing_chemical', label: '화학/석유화학 제조업' },
  { value: 'manufacturing_metal', label: '철강/금속 제조업' },
  
  // 건설업
  { value: 'construction', label: '건설업' },
  { value: 'architecture', label: '건축/설계업' },
  
  // 상업/유통
  { value: 'wholesale_retail', label: '도소매업' },
  { value: 'ecommerce', label: '전자상거래/온라인쇼핑몰' },
  { value: 'logistics', label: '물류/유통업' },
  
  // IT/디지털
  { value: 'it_software', label: 'IT/소프트웨어 개발' },
  { value: 'it_platform', label: '플랫폼/앱 서비스' },
  { value: 'it_hardware', label: 'IT 하드웨어/장비' },
  { value: 'ai_tech', label: 'AI/빅데이터/클라우드' },
  { value: 'fintech', label: '핀테크/디지털금융' },
  
  // 서비스업
  { value: 'service_general', label: '서비스업 (일반)' },
  { value: 'consulting', label: '컨설팅/전문서비스' },
  { value: 'marketing', label: '마케팅/광고업' },
  { value: 'design', label: '디자인/크리에이티브' },
  { value: 'cleaning', label: '청소/시설관리' },
  { value: 'security', label: '보안서비스' },
  
  // 음식/숙박
  { value: 'food_beverage', label: '음식점/카페' },
  { value: 'accommodation', label: '숙박업/펜션' },
  
  // 운송/물류
  { value: 'transportation', label: '운수/배송업' },
  { value: 'delivery', label: '택배/배달업' },
  
  // 금융/보험
  { value: 'finance', label: '금융업' },
  { value: 'insurance', label: '보험업' },
  
  // 부동산
  { value: 'real_estate', label: '부동산업' },
  { value: 'property_management', label: '부동산 관리/임대업' },
  
  // 교육
  { value: 'education', label: '교육서비스업' },
  { value: 'academy', label: '학원/교습소' },
  { value: 'online_education', label: '온라인 교육/이러닝' },
  
  // 의료/바이오
  { value: 'healthcare', label: '의료/병원' },
  { value: 'pharmacy', label: '약국/제약업' },
  { value: 'bio', label: '바이오/헬스케어' },
  
  // 문화/엔터테인먼트
  { value: 'entertainment', label: '문화/예술/스포츠' },
  { value: 'media', label: '미디어/방송/출판' },
  { value: 'gaming', label: '게임/엔터테인먼트' },
  
  // 에너지/환경
  { value: 'energy', label: '에너지/전력업' },
  { value: 'renewable_energy', label: '신재생에너지' },
  { value: 'environment', label: '환경/폐기물 처리' },
  
  // 농업/1차 산업
  { value: 'agriculture', label: '농업/축산업' },
  { value: 'fishery', label: '수산업' },
  
  // 기타
  { value: 'other', label: '기타' },
  { value: 'custom', label: '📝 직접입력 (위에 없는 업종)' }
] as const;

// 지역 옵션
export const regionOptions = [
  { value: 'seoul', label: '서울특별시' },
  { value: 'busan', label: '부산광역시' },
  { value: 'daegu', label: '대구광역시' },
  { value: 'incheon', label: '인천광역시' },
  { value: 'gwangju', label: '광주광역시' },
  { value: 'daejeon', label: '대전광역시' },
  { value: 'ulsan', label: '울산광역시' },
  { value: 'sejong', label: '세종특별자치시' },
  { value: 'gyeonggi', label: '경기도' },
  { value: 'gangwon', label: '강원도' },
  { value: 'chungbuk', label: '충청북도' },
  { value: 'chungnam', label: '충청남도' },
  { value: 'jeonbuk', label: '전라북도' },
  { value: 'jeonnam', label: '전라남도' },
  { value: 'gyeongbuk', label: '경상북도' },
  { value: 'gyeongnam', label: '경상남도' },
  { value: 'jeju', label: '제주특별자치도' }
] as const;

// 주요 고민사항 옵션
export const concernOptions = [
  { value: 'digital_transformation', label: '디지털 전환' },
  { value: 'sales_growth', label: '매출 성장' },
  { value: 'cost_reduction', label: '비용 절감' },
  { value: 'market_expansion', label: '시장 확대' },
  { value: 'talent_management', label: '인재 관리' },
  { value: 'process_improvement', label: '프로세스 개선' },
  { value: 'customer_satisfaction', label: '고객 만족도 향상' },
  { value: 'investment_funding', label: '투자/자금 조달' },
  { value: 'new_business', label: '신사업 개발' },
  { value: 'compliance', label: '규제 대응' },
  { value: 'sustainability', label: 'ESG/지속가능경영' },
  { value: 'global_expansion', label: '해외 진출' }
] as const;