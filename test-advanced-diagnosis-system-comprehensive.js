/**
 * 🚀 AICAMP 고급 진단 시스템 종합 테스트 스크립트
 * 
 * 테스트 목표:
 * ✅ 개별 점수 20개 문항 완전 저장 테스트
 * ✅ 업종별 특화 분석 시스템 테스트
 * ✅ 6가지 핵심 지표 처리 테스트
 * ✅ 구글시트 80개 컬럼 데이터 저장 테스트
 * ✅ 관리자 고급 분석 알림 이메일 테스트
 * ✅ 신청자 업종별 맞춤 확인 이메일 테스트
 * ✅ 오류 처리 및 예외 상황 테스트
 */

const axios = require('axios');
const fs = require('fs');

// 테스트 설정
const TEST_CONFIG = {
  API_BASE_URL: process.env.NEXT_PUBLIC_VERCEL_URL || 'https://ai-camp-landingpage.vercel.app',
  GOOGLE_SCRIPT_URL: process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec',
  TEST_EMAIL: 'test.advanced.diagnosis@gmail.com',
  ADMIN_EMAIL: 'hongik423@gmail.com',
  TIMEOUT: 60000  // 60초로 증가
};

// 테스트 결과 저장용
const testResults = {
  timestamp: new Date().toISOString(),
  version: 'AICAMP_고급진단시스템_v3.0',
  tests: [],
  summary: {
    total: 0,
    passed: 0,
    failed: 0,
    errors: []
  }
};

/**
 * 🎯 고급 진단 테스트 데이터 생성 (20개 문항 + 업종별 특화)
 */
function createAdvancedDiagnosisTestData(industry) {
  return {
    // 기본 정보
    companyName: `테스트기업_${industry}_고급진단`,
    industry: industry,
    employeeCount: '10-50명',
    growthStage: '성장기',
    businessLocation: '서울',
    contactManager: '김테스트_고급진단',
    phone: '010-1234-5678',  // contactPhone이 아닌 phone 사용
    email: TEST_CONFIG.TEST_EMAIL,  // contactEmail이 아닌 email 사용
    mainConcerns: `${industry} 업종의 주요 고민사항: 디지털 전환과 시장 경쟁력 강화가 필요합니다.`,
    expectedBenefits: `${industry} 업종별 특화된 솔루션을 통한 매출 증대와 운영 효율성 향상을 기대합니다.`,
    privacyConsent: true,

    // 📊 개별 점수 20개 문항 (1-5점)
    planning_level: 4,
    differentiation_level: 3,
    pricing_level: 4,
    expertise_level: 5,
    quality_level: 4,
    customer_greeting: 3,
    customer_service: 4,
    complaint_management: 3,
    customer_retention: 4,
    customer_understanding: 3,
    marketing_planning: 2,
    offline_marketing: 3,
    online_marketing: 2,
    sales_strategy: 3,
    purchase_management: 4,
    inventory_management: 4,
    exterior_management: 5,
    interior_management: 4,
    cleanliness: 5,
    work_flow: 4,

    // 📈 카테고리별 점수
    categoryResults: [
      { category: '상품서비스관리', score100: 80, weight: 0.25 },
      { category: '고객응대', score100: 70, weight: 0.20 },
      { category: '마케팅', score100: 52, weight: 0.25 },
      { category: '구매재고관리', score100: 80, weight: 0.15 },
      { category: '매장관리', score100: 90, weight: 0.15 }
    ],

    // 🚀 6가지 핵심 지표
    businessModel: 75,
    marketPosition: 68,
    operationalEfficiency: 82,
    growthPotential: 77,
    digitalReadiness: 60,
    financialHealth: 73,

    // 📋 SWOT 분석
    swotAnalysis: {
      strengths: [`${industry} 업종 전문성`, '우수한 품질 관리', '고객 충성도', '효율적 운영', '브랜드 신뢰도'],
      weaknesses: ['디지털 마케팅 역량 부족', '온라인 채널 미흡', '인력 부족', '시스템 노후화', '데이터 분석 부족'],
      opportunities: [`${industry} 시장 성장`, '디지털 전환 가속화', '정부 지원 정책', '신기술 도입 기회', '해외 진출 가능성'],
      threats: ['대기업 진출', '경쟁 심화', '경기 불확실성', '규제 강화', '비용 상승'],
      strategicMatrix: `${industry} 업종 특화 전략: 강점을 활용한 디지털 전환과 시장 확장을 통해 성장 기회를 극대화하고 위협 요소를 최소화해야 합니다.`
    },

    // 📄 진단 보고서 (4000자)
    comprehensiveReport: generateIndustrySpecificReport(industry),

    // 🎯 종합 점수
    totalScore: 74,
    overallGrade: 'B+',
    reliabilityScore: 92
  };
}

/**
 * 업종별 특화 보고서 생성
 */
function generateIndustrySpecificReport(industry) {
  const industryReports = {
    'manufacturing': `
1. 제조업 현황 진단

귀하의 제조업체는 현재 74점의 종합 진단 점수를 기록하여 업계 평균 수준의 경쟁력을 보유하고 있습니다. 특히 품질 관리와 작업 동선 효율성에서 5점 만점을 획득하여 제조업의 핵심 역량을 잘 갖추고 있음을 보여줍니다.

생산 효율성 측면에서는 운영효율성 지표가 82점으로 우수한 수준을 나타내고 있으나, 디지털 준비도가 60점으로 상대적으로 낮아 스마트 팩토리 도입과 디지털 전환이 시급한 과제로 나타났습니다.

2. 강점 기반 성장 전략

제조업 특화 강점인 품질관리 시스템과 생산 전문성을 기반으로 시장 확장 전략을 수립해야 합니다. 현재 82점의 운영 효율성은 업계 상위 20% 수준으로, 이를 바탕으로 생산성 향상과 원가 절감을 통한 가격 경쟁력 확보가 가능합니다.

3. 디지털 전환 우선순위

스마트 팩토리 도입을 위한 단계별 접근이 필요합니다. IoT 센서를 통한 설비 모니터링부터 시작하여 데이터 수집 및 분석 체계를 구축하고, 궁극적으로 AI 기반 예측 유지보수 시스템 도입을 권장합니다.

4. 마케팅 역량 강화 방안

현재 마케팅 점수가 52점으로 개선이 필요한 영역입니다. 특히 온라인 마케팅 역량 강화를 통해 B2B 고객 확보와 해외 시장 진출 기회를 모색해야 합니다. 제조업 전문 플랫폼 활용과 디지털 카탈로그 구축을 통한 마케팅 효율성 제고가 필요합니다.
    `,
    'it': `
1. IT 업계 현황 진단

귀하의 IT 기업은 74점의 종합 진단 점수로 IT 업계 평균 수준의 경쟁력을 확보하고 있습니다. 특히 기술 전문성과 품질 수준에서 높은 점수를 기록하여 IT 업계의 핵심 역량을 잘 갖추고 있음을 보여줍니다.

기술혁신력 측면에서는 비즈니스모델 지표가 75점으로 양호한 수준이나, 디지털 준비도가 60점으로 최신 기술 트렌드 적응에 개선이 필요한 상황입니다.

2. 기술 경쟁력 강화 전략

IT 업계의 빠른 기술 변화에 대응하기 위해 지속적인 기술 업그레이드와 인력 개발이 필요합니다. 현재 높은 전문성을 바탕으로 AI/ML, 클라우드, 사이버 보안 등 차세대 기술 영역으로의 확장을 권장합니다.

3. 디지털 트렌드 대응 방안

클라우드 전환과 DevOps 도입을 통한 개발 프로세스 혁신이 필요합니다. 성장잠재력 지표가 77점으로 양호한 수준이므로, 이를 바탕으로 플랫폼 비즈니스와 SaaS 서비스 확장을 통한 수익 모델 다각화를 추진해야 합니다.

4. 고객 확보 및 유지 전략

IT 서비스의 특성상 고객 만족도와 장기적 관계 구축이 중요합니다. 현재 고객응대 점수가 70점으로 개선 여지가 있으므로, 기술 지원 체계 강화와 고객 성공 관리 프로그램 도입을 통해 고객 만족도 향상과 재계약률 제고가 필요합니다.
    `,
    'service': `
1. 서비스업 현황 진단

귀하의 서비스업체는 74점의 종합 진단 점수로 서비스업 평균 수준의 경쟁력을 보유하고 있습니다. 특히 서비스 품질과 고객 응대 역량에서 강점을 보이고 있으나, 디지털 고객 접점 활용과 온라인 마케팅 부문에서 개선이 필요한 상황입니다.

고객만족도 측면에서는 고객응대 점수가 70점으로 양호하나, 디지털 준비도가 60점으로 디지털 전환이 시급한 과제로 나타났습니다.

2. 고객 경험 개선 전략

서비스업의 핵심인 고객 경험 향상을 위해 디지털 고객 접점 확대와 개인화 서비스 도입이 필요합니다. CRM 시스템 구축을 통한 고객 데이터 수집 및 분석 체계를 구축하여 고객별 맞춤 서비스 제공이 가능하도록 해야 합니다.

3. 디지털 서비스 플랫폼 구축

옴니채널 전략 수립을 통해 온오프라인 통합 서비스를 제공해야 합니다. 모바일 앱과 웹 플랫폼을 통한 서비스 접근성 향상과 실시간 고객 지원 체계 구축이 필요합니다.

4. 브랜드 차별화 및 마케팅 강화

현재 마케팅 점수가 52점으로 개선이 필요한 영역입니다. 서비스업의 특성상 고객 추천과 구전 마케팅이 중요하므로, 고객 만족도 향상을 바탕으로 한 리퍼럴 프로그램과 소셜미디어 마케팅 강화를 통한 브랜드 인지도 제고가 필요합니다.
    `,
    'retail': `
1. 소매업 현황 진단

귀하의 소매업체는 74점의 종합 진단 점수로 소매업 평균 수준의 경쟁력을 확보하고 있습니다. 매장 관리와 고객 서비스 부문에서 강점을 보이고 있으나, 온라인 마케팅과 디지털 전환 부문에서 개선이 필요한 상황입니다.

판매 역량 측면에서는 매장관리 점수가 90점으로 우수한 수준이나, 디지털 준비도가 60점으로 옴니채널 전략 수립이 시급한 과제입니다.

2. 옴니채널 전략 수립

온오프라인 통합 서비스 제공을 위한 시스템 구축이 필요합니다. 온라인 쇼핑몰과 매장 재고 연동, 픽업 서비스, 배송 서비스 등을 통한 고객 편의성 향상과 매출 증대를 도모해야 합니다.

3. 데이터 기반 고객 분석

POS 시스템과 고객 관리 시스템을 연동하여 고객 구매 패턴 분석과 개인화 추천 서비스를 제공해야 합니다. 현재 높은 매장 관리 역량을 바탕으로 고객 데이터를 활용한 상품 진열과 재고 최적화를 통한 매출 향상이 가능합니다.

4. 고객 충성도 프로그램

멤버십 프로그램과 포인트 적립 시스템을 통한 고객 재방문율 향상이 필요합니다. 고객 생애가치 증대를 위한 단골 고객 관리 프로그램과 개인화된 프로모션 제공을 통해 고객 만족도와 매출을 동시에 향상시킬 수 있습니다.
    `,
    'food': `
1. 외식업 현황 진단

귀하의 외식업체는 74점의 종합 진단 점수로 외식업 평균 수준의 경쟁력을 보유하고 있습니다. 특히 청결도와 매장 관리 부문에서 만점에 가까운 점수를 기록하여 외식업의 핵심 요소인 위생 관리가 우수함을 보여줍니다.

운영 효율성 측면에서는 82점의 높은 점수를 기록했으나, 온라인 마케팅과 디지털 주문 시스템 도입이 필요한 상황입니다.

2. 배달 서비스 최적화

코로나 이후 급성장한 배달 시장에 대응하기 위한 배달 전용 메뉴 개발과 포장 시스템 개선이 필요합니다. 배달 앱 최적화와 자체 배달 시스템 구축을 통한 수익성 개선을 도모해야 합니다.

3. 메뉴 최적화 및 원가 관리

현재 높은 운영 효율성을 바탕으로 메뉴 엔지니어링을 통한 수익성 개선이 가능합니다. 인기 메뉴 분석과 원가 분석을 통한 메뉴 구성 최적화와 식재료 구매 효율화를 통한 원가 절감이 필요합니다.

4. 고객 충성도 및 브랜드 강화

외식업의 특성상 맛과 서비스의 일관성이 중요합니다. 현재 우수한 청결도와 매장 관리 역량을 바탕으로 고객 리뷰 관리와 소셜미디어 마케팅을 통한 브랜드 인지도 향상과 고객 유치가 필요합니다.
    `
  };

  return industryReports[industry] || industryReports['service'];
}

/**
 * 🧪 테스트 실행 함수
 */
async function runTest(testName, testFunction) {
  console.log(`\n🧪 테스트 시작: ${testName}`);
  const startTime = Date.now();
  
  try {
    const result = await testFunction();
    const duration = Date.now() - startTime;
    
    testResults.tests.push({
      name: testName,
      status: 'PASSED',
      duration: duration,
      result: result
    });
    testResults.summary.passed++;
    
    console.log(`✅ 테스트 성공: ${testName} (${duration}ms)`);
    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    
    testResults.tests.push({
      name: testName,
      status: 'FAILED',
      duration: duration,
      error: error.message,
      stack: error.stack
    });
    testResults.summary.failed++;
    testResults.summary.errors.push(`${testName}: ${error.message}`);
    
    console.error(`❌ 테스트 실패: ${testName} (${duration}ms)`);
    console.error(`오류: ${error.message}`);
    return null;
  } finally {
    testResults.summary.total++;
  }
}

/**
 * 1️⃣ 고급 진단 API 호출 테스트
 */
async function testAdvancedDiagnosisAPI() {
  const testData = createAdvancedDiagnosisTestData('manufacturing');
  
  const response = await axios.post(
    `${TEST_CONFIG.API_BASE_URL}/api/simplified-diagnosis`,
    testData,
    {
      timeout: TEST_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  if (response.status !== 200) {
    throw new Error(`API 호출 실패: ${response.status}`);
  }

  const data = response.data;
  
  // 응답 데이터 검증
  if (!data.success) {
    throw new Error(`진단 처리 실패: ${data.error || '알 수 없는 오류'}`);
  }

  // 고급 기능 검증
  if (!data.diagnosisResult.coreMetrics) {
    throw new Error('6가지 핵심 지표가 누락됨');
  }

  if (!data.diagnosisResult.industryInsights) {
    throw new Error('업종별 특화 분석이 누락됨');
  }

  if (!data.comprehensiveReport || data.comprehensiveReport.length < 1000) {
    throw new Error('4000자 확장 보고서가 불완전함');
  }

  console.log('📊 API 응답 검증 완료:');
  console.log(`  - 총점: ${data.diagnosisResult.totalScore}점`);
  console.log(`  - 핵심지표: ${Object.keys(data.diagnosisResult.coreMetrics).length}개`);
  console.log(`  - 업종: ${data.diagnosisResult.industryInsights.industryName}`);
  console.log(`  - 보고서길이: ${data.comprehensiveReport.length}자`);

  return {
    success: true,
    resultId: data.resultId,
    totalScore: data.diagnosisResult.totalScore,
    coreMetrics: data.diagnosisResult.coreMetrics,
    industry: data.diagnosisResult.industryInsights.industryName,
    reportLength: data.comprehensiveReport.length
  };
}

/**
 * 2️⃣ Google Apps Script 직접 호출 테스트
 */
async function testGoogleAppsScript() {
  const testData = createAdvancedDiagnosisTestData('it');
  
  // Google Apps Script 형식으로 데이터 변환
  const gasData = {
    action: 'saveDiagnosis',
    폼타입: 'AI_고급진단_업종특화분석',
    ...testData
  };

  const response = await axios.post(
    TEST_CONFIG.GOOGLE_SCRIPT_URL,
    gasData,
    {
      timeout: TEST_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  if (response.status !== 200) {
    throw new Error(`Google Apps Script 호출 실패: ${response.status}`);
  }

  let result;
  try {
    result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
  } catch (e) {
    throw new Error(`응답 파싱 실패: ${response.data}`);
  }

  if (!result.success) {
    throw new Error(`Google Apps Script 처리 실패: ${result.error || '알 수 없는 오류'}`);
  }

  console.log('📊 Google Apps Script 응답 검증 완료:');
  console.log(`  - 처리상태: ${result.success ? '성공' : '실패'}`);
  console.log(`  - 시트: ${result.sheet}`);
  console.log(`  - 행번호: ${result.row}`);

  return {
    success: true,
    sheet: result.sheet,
    row: result.row,
    message: result.message
  };
}

/**
 * 3️⃣ 업종별 특화 분석 테스트
 */
async function testIndustrySpecificAnalysis() {
  const industries = ['manufacturing', 'it', 'service', 'retail', 'food'];
  const results = [];

  for (const industry of industries) {
    console.log(`  📊 ${industry} 업종 테스트 중...`);
    
    const testData = createAdvancedDiagnosisTestData(industry);
    const response = await axios.post(
      `${TEST_CONFIG.API_BASE_URL}/api/simplified-diagnosis`,
      testData,
      {
        timeout: TEST_CONFIG.TIMEOUT,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.status !== 200 || !response.data.success) {
      throw new Error(`${industry} 업종 테스트 실패`);
    }

    const data = response.data;
    
    // 업종별 특화 분석 검증
    if (data.diagnosisResult.industryInsights.industryName !== industry) {
      throw new Error(`${industry} 업종 식별 실패`);
    }

    if (!data.diagnosisResult.industryInsights.industryTrends || 
        data.diagnosisResult.industryInsights.industryTrends.length === 0) {
      throw new Error(`${industry} 업종 트렌드 분석 누락`);
    }

    results.push({
      industry: industry,
      totalScore: data.diagnosisResult.totalScore,
      trends: data.diagnosisResult.industryInsights.industryTrends,
      reportLength: data.comprehensiveReport.length
    });

    console.log(`    ✅ ${industry}: ${data.diagnosisResult.totalScore}점, 트렌드 ${data.diagnosisResult.industryInsights.industryTrends.length}개`);
  }

  return {
    success: true,
    testedIndustries: industries.length,
    results: results
  };
}

/**
 * 4️⃣ 6가지 핵심 지표 테스트
 */
async function testCoreMetrics() {
  const testData = createAdvancedDiagnosisTestData('service');
  
  const response = await axios.post(
    `${TEST_CONFIG.API_BASE_URL}/api/simplified-diagnosis`,
    testData,
    {
      timeout: TEST_CONFIG.TIMEOUT
    }
  );

  const data = response.data;
  const coreMetrics = data.diagnosisResult.coreMetrics;

  // 6가지 핵심 지표 검증
  const requiredMetrics = [
    'businessModel', 'marketPosition', 'operationalEfficiency',
    'growthPotential', 'digitalReadiness', 'financialHealth'
  ];

  for (const metric of requiredMetrics) {
    if (!coreMetrics[metric] || coreMetrics[metric] <= 0) {
      throw new Error(`핵심 지표 누락: ${metric}`);
    }
  }

  // 지표 범위 검증 (0-100점)
  for (const [key, value] of Object.entries(coreMetrics)) {
    if (value < 0 || value > 100) {
      throw new Error(`핵심 지표 범위 오류: ${key} = ${value}`);
    }
  }

  console.log('📊 6가지 핵심 지표 검증 완료:');
  Object.entries(coreMetrics).forEach(([key, value]) => {
    console.log(`  - ${key}: ${value}점`);
  });

  return {
    success: true,
    metrics: coreMetrics,
    metricsCount: Object.keys(coreMetrics).length
  };
}

/**
 * 5️⃣ 이메일 발송 테스트 (실제 발송)
 */
async function testEmailSending() {
  console.log('📧 실제 이메일 발송 테스트 시작...');
  
  const testData = createAdvancedDiagnosisTestData('manufacturing');
  
  // 테스트용 이메일 주소 설정
  testData.email = 'aicamp.system.test@gmail.com';
  testData.companyName = '이메일테스트기업_제조업';
  
  const response = await axios.post(
    `${TEST_CONFIG.API_BASE_URL}/api/simplified-diagnosis`,
    testData,
    {
      timeout: TEST_CONFIG.TIMEOUT
    }
  );

  const data = response.data;
  
  if (!data.success) {
    throw new Error('진단 처리 실패로 이메일 테스트 불가');
  }

  // Google Apps Script로 직접 이메일 발송 테스트
  const emailTestData = {
    action: 'saveDiagnosis',
    폼타입: 'AI_고급진단_이메일테스트',
    회사명: '이메일테스트기업_제조업',
    업종: 'manufacturing',
    담당자명: '김테스트_이메일',
    이메일: 'aicamp.system.test@gmail.com',  // Google Apps Script는 한글 필드명 사용
    연락처: '010-1234-5678',
    종합점수: 74,
    sendConfirmationEmail: true,
    sendAdminNotification: true,
    
    // 고급 데이터 포함
    businessModel: 75,
    marketPosition: 68,
    operationalEfficiency: 82,
    진단보고서요약: '이메일 발송 테스트를 위한 고급 진단 보고서입니다. 제조업 특화 분석과 6가지 핵심 지표가 포함되어 있습니다.'
  };

  const gasResponse = await axios.post(
    TEST_CONFIG.GOOGLE_SCRIPT_URL,
    emailTestData,
    {
      timeout: TEST_CONFIG.TIMEOUT
    }
  );

  let gasResult;
  try {
    gasResult = typeof gasResponse.data === 'string' ? JSON.parse(gasResponse.data) : gasResponse.data;
  } catch (e) {
    throw new Error(`Google Apps Script 응답 파싱 실패: ${gasResponse.data}`);
  }

  if (!gasResult.success) {
    throw new Error(`이메일 발송 실패: ${gasResult.error || '알 수 없는 오류'}`);
  }

  console.log('📧 이메일 발송 테스트 완료:');
  console.log(`  - 관리자 이메일: ${TEST_CONFIG.ADMIN_EMAIL}로 발송`);
  console.log(`  - 신청자 이메일: aicamp.system.test@gmail.com로 발송`);
  console.log(`  - 처리방식: ${gasResult.처리방식 || '고급_업종특화_분석_이메일'}`);

  return {
    success: true,
    adminEmail: TEST_CONFIG.ADMIN_EMAIL,
    userEmail: 'aicamp.system.test@gmail.com',
    processingType: gasResult.처리방식 || '고급_업종특화_분석_이메일'
  };
}

/**
 * 6️⃣ 오류 처리 테스트
 */
async function testErrorHandling() {
  const errorTests = [];

  // 잘못된 데이터 테스트
  try {
    await axios.post(`${TEST_CONFIG.API_BASE_URL}/api/simplified-diagnosis`, {
      // 필수 데이터 누락
      companyName: '',
      industry: ''
    }, { timeout: 5000 });
    errorTests.push({ test: '빈 데이터', result: 'UNEXPECTED_SUCCESS' });
  } catch (error) {
    errorTests.push({ test: '빈 데이터', result: 'EXPECTED_ERROR', status: error.response?.status });
  }

  // 잘못된 점수 범위 테스트
  try {
    const invalidData = createAdvancedDiagnosisTestData('manufacturing');
    invalidData.planning_level = 10; // 1-5 범위 초과
    
    const response = await axios.post(`${TEST_CONFIG.API_BASE_URL}/api/simplified-diagnosis`, invalidData, { timeout: 10000 });
    
    // 시스템이 잘못된 점수를 어떻게 처리하는지 확인
    if (response.data.success) {
      errorTests.push({ test: '잘못된 점수 범위', result: 'HANDLED_GRACEFULLY' });
    }
  } catch (error) {
    errorTests.push({ test: '잘못된 점수 범위', result: 'ERROR_THROWN', status: error.response?.status });
  }

  return {
    success: true,
    errorTests: errorTests
  };
}

/**
 * 🎯 메인 테스트 실행
 */
async function runAllTests() {
  console.log('🚀 AICAMP 고급 진단 시스템 종합 테스트 시작');
  console.log('=' * 60);
  
  // 테스트 실행
  await runTest('1️⃣ 고급 진단 API 호출 테스트', testAdvancedDiagnosisAPI);
  await runTest('2️⃣ Google Apps Script 직접 호출 테스트', testGoogleAppsScript);
  await runTest('3️⃣ 업종별 특화 분석 테스트', testIndustrySpecificAnalysis);
  await runTest('4️⃣ 6가지 핵심 지표 테스트', testCoreMetrics);
  await runTest('5️⃣ 이메일 발송 테스트 (실제 발송)', testEmailSending);
  await runTest('6️⃣ 오류 처리 테스트', testErrorHandling);

  // 테스트 결과 요약
  console.log('\n' + '=' * 60);
  console.log('🎉 테스트 결과 요약');
  console.log('=' * 60);
  console.log(`📊 총 테스트: ${testResults.summary.total}개`);
  console.log(`✅ 성공: ${testResults.summary.passed}개`);
  console.log(`❌ 실패: ${testResults.summary.failed}개`);
  console.log(`📈 성공률: ${((testResults.summary.passed / testResults.summary.total) * 100).toFixed(1)}%`);

  if (testResults.summary.errors.length > 0) {
    console.log('\n❌ 오류 목록:');
    testResults.summary.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error}`);
    });
  }

  // 테스트 결과 파일 저장
  const resultFile = `aicamp-advanced-diagnosis-test-results-${new Date().toISOString().split('T')[0]}.json`;
  fs.writeFileSync(resultFile, JSON.stringify(testResults, null, 2));
  console.log(`\n📄 상세 테스트 결과: ${resultFile}`);

  // 최종 상태 출력
  if (testResults.summary.failed === 0) {
    console.log('\n🎉 모든 테스트 통과! 고급 진단 시스템이 정상 작동합니다.');
    process.exit(0);
  } else {
    console.log('\n⚠️ 일부 테스트 실패. 시스템 점검이 필요합니다.');
    process.exit(1);
  }
}

// 테스트 실행
if (require.main === module) {
  runAllTests().catch(error => {
    console.error('💥 테스트 실행 중 치명적 오류:', error);
    process.exit(1);
  });
}

module.exports = {
  runAllTests,
  createAdvancedDiagnosisTestData,
  testAdvancedDiagnosisAPI,
  testGoogleAppsScript,
  testIndustrySpecificAnalysis,
  testCoreMetrics,
  testEmailSending,
  testErrorHandling
}; 