// ================================================================================
// 🧪 프론트엔드-GAS 연동 테스트 스크립트
// ================================================================================

/**
 * 45개 질문 기반 AI 역량진단 시스템 통합 테스트
 * 프론트엔드와 GAS V11.0 ENHANCED 연동 확인
 */

// 테스트 데이터 (45개 질문 구조)
const testData = {
  // 연락처 정보
  contactName: "김테스트",
  contactEmail: "test@aicamp.club",
  contactPhone: "010-1234-5678",
  contactPosition: "대표이사",
  
  // 기업 기본정보
  companyName: "테스트컴퍼니",
  businessRegistration: "123-45-67890",
  establishmentYear: "2020",
  industry: "IT/소프트웨어",
  businessType: ["B2B 서비스", "SaaS"],
  location: "서울시 강남구",
  employeeCount: "10-30명",
  annualRevenue: "10억-50억",
  
  // 현재 AI/디지털 활용 현황
  aiFamiliarity: 3,
  currentAiTools: ["ChatGPT/Copilot 등 생성형 AI", "BI/데이터 분석 도구"],
  aiUsageDepartments: ["IT/개발팀", "마케팅팀"],
  automationLevelByFunction: {
    "문서 작성/관리": 2,
    "데이터 입력/처리": 3,
    "보고서 생성": 2,
    "고객 응대/소통": 1,
    "일정 관리/알림": 4,
    "승인/결재 프로세스": 2,
    "재고/발주 관리": 1,
    "회계/정산": 3,
    "마케팅/홍보": 2
  },
  dataDigitalization: 4,
  currentSystems: ["ERP", "CRM", "클라우드 서비스"],
  systemIntegration: 3,
  dataManagement: 3,
  
  // AI 역량 및 준비도
  changeReadiness: 4,
  leadershipSupport: 5,
  employeeAttitude: 3,
  changeManagementExperience: 3,
  budgetAllocation: "500만원-1000만원",
  technicalPersonnel: 3,
  externalPartnership: 2,
  trainingInvestment: 4,
  dataQuality: 3,
  analyticsCapability: 3,
  decisionMaking: 4,
  
  // 기술 인프라 및 보안
  cloudAdoption: 4,
  systemScalability: 3,
  integrationCapability: 3,
  securityMeasures: ["방화벽", "백업 시스템", "접근 권한 관리"],
  complianceRequirements: ["개인정보보호법", "정보보호 관리체계"],
  riskManagement: 3,
  
  // AI 도입 목표 및 기대효과
  aiTransformationGoals: ["업무 효율성 향상", "비용 절감", "고객 만족도 향상"],
  specificImprovements: "고객 문의 응답 시간을 현재 4시간에서 1시간 이내로 단축하고, 월말 결산 작업을 3일에서 1일로 단축하고 싶습니다.",
  expectedROI: "6개월 내 투자비 회수",
  successMetrics: ["업무 효율성 30% 향상", "고객 만족도 20% 증가", "운영비 15% 절감"],
  timeframe: "6개월-1년",
  
  // 실행 계획 및 우선순위
  priorityFunctions: ["문서 작성/관리", "고객 응대/소통", "데이터 분석/보고"],
  implementationApproach: "단계적 도입",
  resourceAllocation: {
    "기술 구현": 40,
    "교육/훈련": 30,
    "시스템 통합": 20,
    "운영/관리": 10
  },
  challengesAnticipated: ["직원 저항", "시스템 통합 복잡성", "초기 학습 곡선"],
  supportNeeds: ["전략 수립 컨설팅", "기술 구현 지원", "교육/훈련 프로그램"]
};

/**
 * API 테스트 함수
 */
async function testAPIIntegration() {
  console.log('🧪 프론트엔드-GAS 연동 테스트 시작...');
  
  try {
    // 1. 로컬 Next.js API 테스트
    console.log('📡 로컬 API 호출 테스트...');
    
    const response = await fetch('http://localhost:3000/api/ai-diagnosis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    
    console.log('📊 API 응답 결과:');
    console.log('- 상태:', response.status);
    console.log('- 성공 여부:', result.success);
    
    if (result.success) {
      console.log('✅ 테스트 성공!');
      console.log('- 제출 ID:', result.submissionId);
      console.log('- 메시지:', result.message);
      console.log('- 버전:', result.version);
      console.log('- 타임스탬프:', result.timestamp);
    } else {
      console.log('❌ 테스트 실패:', result.error);
    }
    
  } catch (error) {
    console.error('🚨 테스트 중 오류 발생:', error.message);
  }
}

/**
 * 데이터 구조 검증
 */
function validateDataStructure() {
  console.log('🔍 45개 질문 데이터 구조 검증...');
  
  const requiredFields = [
    // 연락처 정보 (4개)
    'contactName', 'contactEmail', 'contactPhone', 'contactPosition',
    
    // 기업 기본정보 (8개)
    'companyName', 'businessRegistration', 'establishmentYear', 'industry',
    'businessType', 'location', 'employeeCount', 'annualRevenue',
    
    // 현재 AI/디지털 활용 현황 (8개)
    'aiFamiliarity', 'currentAiTools', 'aiUsageDepartments', 'automationLevelByFunction',
    'dataDigitalization', 'currentSystems', 'systemIntegration', 'dataManagement',
    
    // AI 역량 및 준비도 (11개)
    'changeReadiness', 'leadershipSupport', 'employeeAttitude', 'changeManagementExperience',
    'budgetAllocation', 'technicalPersonnel', 'externalPartnership', 'trainingInvestment',
    'dataQuality', 'analyticsCapability', 'decisionMaking',
    
    // 기술 인프라 및 보안 (6개)
    'cloudAdoption', 'systemScalability', 'integrationCapability',
    'securityMeasures', 'complianceRequirements', 'riskManagement',
    
    // AI 도입 목표 및 기대효과 (5개)
    'aiTransformationGoals', 'specificImprovements', 'expectedROI', 'successMetrics', 'timeframe',
    
    // 실행 계획 및 우선순위 (5개)
    'priorityFunctions', 'implementationApproach', 'resourceAllocation',
    'challengesAnticipated', 'supportNeeds'
  ];
  
  console.log('📋 필수 필드 수:', requiredFields.length);
  
  const missingFields = requiredFields.filter(field => !(field in testData));
  const presentFields = requiredFields.filter(field => field in testData);
  
  console.log('✅ 존재하는 필드:', presentFields.length + '/' + requiredFields.length);
  
  if (missingFields.length > 0) {
    console.log('❌ 누락된 필드:', missingFields);
    return false;
  }
  
  console.log('🎯 데이터 구조 검증 완료 - 모든 필드 존재!');
  return true;
}

/**
 * 메인 테스트 실행
 */
async function runTests() {
  console.log('🚀 AI 역량진단 시스템 통합 테스트 시작');
  console.log('=' .repeat(60));
  
  // 1. 데이터 구조 검증
  const structureValid = validateDataStructure();
  
  if (!structureValid) {
    console.log('❌ 데이터 구조 검증 실패 - 테스트 중단');
    return;
  }
  
  console.log('');
  
  // 2. API 연동 테스트
  await testAPIIntegration();
  
  console.log('');
  console.log('=' .repeat(60));
  console.log('🏁 테스트 완료');
}

// 테스트 실행 (Node.js 환경에서)
if (typeof window === 'undefined') {
  // Node.js 환경
  const fetch = require('node-fetch');
  runTests();
} else {
  // 브라우저 환경
  console.log('브라우저 콘솔에서 runTests() 함수를 호출하세요.');
}

// Export for browser use
if (typeof window !== 'undefined') {
  window.testAIDiagnosis = {
    runTests,
    testData,
    validateDataStructure,
    testAPIIntegration
  };
}
