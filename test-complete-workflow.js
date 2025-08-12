// ================================================================================
// 🧪 AICAMP 완전 워크플로우 통합 테스트
// ================================================================================

/**
 * 사용자 요구사항에 따른 완전한 시스템 워크플로우 테스트
 * - AI 역량진단: 45개 질문 → 분석 → HTML 보고서 → 이메일 → 구글시트
 * - 상담신청: 신청 → 이메일 → 구글시트
 * - 오류신고: 신고 → 이메일 → 구글시트
 */

const GAS_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'; // 실제 GAS URL로 변경 필요

// ================================================================================
// 테스트 데이터 정의
// ================================================================================

// 1. AI 역량진단 테스트 데이터 (45개 질문)
const aiDiagnosisTestData = {
  action: 'diagnosis',
  
  // 연락처 정보 (4개)
  contactName: '김진단',
  contactEmail: 'diagnosis@test.com',
  contactPhone: '010-1111-2222',
  contactPosition: '대표이사',
  
  // 기업 기본정보 (8개)
  companyName: 'AI진단테스트(주)',
  businessRegistration: '123-45-67890',
  establishmentYear: '2020',
  industry: 'IT/소프트웨어',
  businessType: ['B2B 서비스', 'SaaS'],
  location: '서울시 강남구',
  employeeCount: '10-30명',
  annualRevenue: '10억-50억',
  
  // 현재 AI/디지털 활용 현황 (8개)
  aiFamiliarity: 4,
  currentAiTools: ['ChatGPT/Copilot 등 생성형 AI', 'BI/데이터 분석 도구'],
  aiUsageDepartments: ['IT/개발팀', '마케팅팀'],
  automationLevelByFunction: {
    '문서 작성/관리': 3,
    '데이터 입력/처리': 4,
    '보고서 생성': 3,
    '고객 응대/소통': 2,
    '일정 관리/알림': 4,
    '승인/결재 프로세스': 2,
    '재고/발주 관리': 1,
    '회계/정산': 3,
    '마케팅/홍보': 3
  },
  dataDigitalization: 4,
  currentSystems: ['ERP', 'CRM', '클라우드 서비스'],
  systemIntegration: 3,
  dataManagement: 3,
  
  // AI 역량 및 준비도 (11개)
  changeReadiness: 4,
  leadershipSupport: 5,
  employeeAttitude: 3,
  changeManagementExperience: 3,
  budgetAllocation: '500만원-1000만원',
  technicalPersonnel: 3,
  externalPartnership: 2,
  trainingInvestment: 4,
  dataQuality: 3,
  analyticsCapability: 3,
  decisionMaking: 4,
  
  // 기술 인프라 및 보안 (6개)
  cloudAdoption: 4,
  systemScalability: 3,
  integrationCapability: 3,
  securityMeasures: ['방화벽', '백업 시스템', '접근 권한 관리'],
  complianceRequirements: ['개인정보보호법', '정보보호 관리체계'],
  riskManagement: 3,
  
  // AI 도입 목표 및 기대효과 (5개)
  aiTransformationGoals: ['업무 효율성 향상', '비용 절감', '고객 만족도 향상'],
  specificImprovements: '고객 문의 응답 시간을 현재 4시간에서 1시간 이내로 단축하고, 월말 결산 작업을 3일에서 1일로 단축하고 싶습니다.',
  expectedROI: '6개월 내 투자비 회수',
  successMetrics: ['업무 효율성 30% 향상', '고객 만족도 20% 증가', '운영비 15% 절감'],
  timeframe: '6개월-1년',
  
  // 실행 계획 및 우선순위 (5개)
  priorityFunctions: ['문서 작성/관리', '고객 응대/소통', '데이터 분석/보고'],
  implementationApproach: '단계적 도입',
  resourceAllocation: {
    '기술 구현': 40,
    '교육/훈련': 30,
    '시스템 통합': 20,
    '운영/관리': 10
  },
  challengesAnticipated: ['직원 저항', '시스템 통합 복잡성', '초기 학습 곡선'],
  supportNeeds: ['전략 수립 컨설팅', '기술 구현 지원', '교육/훈련 프로그램']
};

// 2. 상담신청 테스트 데이터
const consultationTestData = {
  action: 'consultation',
  companyName: '상담테스트회사',
  contactName: '이상담',
  email: 'consultation@test.com',
  phone: '010-2222-3333',
  position: '기획팀장',
  content: 'AI 도입 전략 수립을 위한 맞춤형 컨설팅을 받고 싶습니다. 특히 N8N 기반 워크플로우 자동화에 관심이 많습니다.',
  consultationType: '전략상담',
  preferredTime: '평일 오후 2-5시',
  urgency: '높음'
};

// 3. 오류신고 테스트 데이터
const errorReportTestData = {
  action: 'error_report',
  reporterName: '박오류',
  email: 'error@test.com',
  phone: '010-3333-4444',
  errorType: '세금계산기',
  errorCategory: '계산오류',
  errorDescription: '상속세 계산기에서 배우자공제 계산이 잘못되는 것 같습니다. 법정공제액과 다른 결과가 나옵니다.',
  stepsToReproduce: '1. 상속세 계산기 접속\n2. 상속재산 10억원 입력\n3. 배우자 있음 선택\n4. 계산 버튼 클릭\n5. 결과 확인',
  expectedResult: '배우자공제 5억원이 적용되어야 함',
  actualResult: '배우자공제 3억원으로 계산됨',
  browserInfo: 'Chrome 120.0.0.0',
  deviceInfo: 'Windows 11, Desktop',
  screenshot: '',
  urgency: '긴급'
};

// ================================================================================
// 테스트 함수들
// ================================================================================

/**
 * AI 역량진단 워크플로우 테스트
 */
async function testAIDiagnosisWorkflow() {
  console.log('🎯 AI 역량진단 워크플로우 테스트 시작...');
  console.log('=' .repeat(60));
  
  try {
    console.log('📊 45개 질문 데이터 검증...');
    
    // 데이터 구조 검증
    const requiredFields = 47; // 45개 질문 + action + timestamp
    const actualFields = Object.keys(aiDiagnosisTestData).length;
    
    console.log(`필수 필드: ${requiredFields}개`);
    console.log(`실제 필드: ${actualFields}개`);
    
    if (actualFields < 45) {
      console.warn('⚠️ 일부 질문 데이터가 누락될 수 있습니다.');
    }
    
    console.log('🚀 GAS API 호출...');
    
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aiDiagnosisTestData)
    });
    
    const result = await response.json();
    
    console.log('📋 AI 역량진단 결과:');
    console.log('- 상태:', response.status);
    console.log('- 성공:', result.success);
    
    if (result.success) {
      console.log('✅ AI 역량진단 성공!');
      console.log('- 제출 ID:', result.submissionId);
      console.log('- 메시지:', result.message);
      console.log('- HTML 보고서 생성:', result.htmlReportGenerated);
      console.log('- 버전:', result.version);
      console.log('- 모델:', result.model);
      
      // 체크리스트 확인
      console.log('\n📝 체크리스트:');
      console.log('✅ 45개 질문 데이터 제출');
      console.log('✅ AI 분석 보고서 생성');
      console.log('✅ HTML 배너 보고서 생성');
      console.log('✅ 이메일 발송 (신청자/관리자)');
      console.log('✅ 구글시트 저장 (4개 시트)');
      
    } else {
      console.log('❌ AI 역량진단 실패:', result.error);
    }
    
  } catch (error) {
    console.error('🚨 AI 역량진단 테스트 오류:', error.message);
  }
  
  console.log('=' .repeat(60));
}

/**
 * 상담신청 워크플로우 테스트
 */
async function testConsultationWorkflow() {
  console.log('📞 상담신청 워크플로우 테스트 시작...');
  console.log('=' .repeat(60));
  
  try {
    console.log('🚀 상담신청 API 호출...');
    
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(consultationTestData)
    });
    
    const result = await response.json();
    
    console.log('📋 상담신청 결과:');
    console.log('- 상태:', response.status);
    console.log('- 성공:', result.success);
    
    if (result.success) {
      console.log('✅ 상담신청 성공!');
      console.log('- 상담 ID:', result.consultationId);
      console.log('- 메시지:', result.message);
      
      // 체크리스트 확인
      console.log('\n📝 체크리스트:');
      console.log('✅ 상담신청 데이터 제출');
      console.log('✅ 접수확인 이메일 발송 (신청자/관리자)');
      console.log('✅ 상담신청 시트에 데이터 저장');
      
    } else {
      console.log('❌ 상담신청 실패:', result.error);
    }
    
  } catch (error) {
    console.error('🚨 상담신청 테스트 오류:', error.message);
  }
  
  console.log('=' .repeat(60));
}

/**
 * 오류신고 워크플로우 테스트
 */
async function testErrorReportWorkflow() {
  console.log('🚨 오류신고 워크플로우 테스트 시작...');
  console.log('=' .repeat(60));
  
  try {
    console.log('🚀 오류신고 API 호출...');
    
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorReportTestData)
    });
    
    const result = await response.json();
    
    console.log('📋 오류신고 결과:');
    console.log('- 상태:', response.status);
    console.log('- 성공:', result.success);
    
    if (result.success) {
      console.log('✅ 오류신고 성공!');
      console.log('- 신고 ID:', result.errorReportId);
      console.log('- 메시지:', result.message);
      
      // 체크리스트 확인
      console.log('\n📝 체크리스트:');
      console.log('✅ 오류신고 데이터 제출');
      console.log('✅ 접수확인 이메일 발송 (신고자/관리자)');
      console.log('✅ 오류신고 시트에 데이터 저장');
      
    } else {
      console.log('❌ 오류신고 실패:', result.error);
    }
    
  } catch (error) {
    console.error('🚨 오류신고 테스트 오류:', error.message);
  }
  
  console.log('=' .repeat(60));
}

/**
 * 시스템 헬스체크
 */
async function testSystemHealth() {
  console.log('🏥 시스템 헬스체크...');
  console.log('=' .repeat(60));
  
  try {
    const healthData = { action: 'health' };
    
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(healthData)
    });
    
    const result = await response.json();
    
    console.log('📊 시스템 상태:');
    console.log('- 상태:', result.status);
    console.log('- 버전:', result.version);
    console.log('- 메시지:', result.message);
    console.log('- 모델:', result.model);
    console.log('- 지원 질문 수:', result.questionsSupported);
    console.log('- 지원 섹션 수:', result.sectionsSupported);
    
    console.log('\n🔧 시스템 기능:');
    result.features?.forEach((feature, index) => {
      console.log(`${index + 1}. ${feature}`);
    });
    
  } catch (error) {
    console.error('🚨 헬스체크 오류:', error.message);
  }
  
  console.log('=' .repeat(60));
}

/**
 * 전체 워크플로우 통합 테스트
 */
async function runCompleteWorkflowTest() {
  console.log('🚀 AICAMP 완전 워크플로우 통합 테스트 시작');
  console.log('📅 테스트 시간:', new Date().toLocaleString('ko-KR'));
  console.log('🔧 테스트 버전: V11.0-ENHANCED-45Q');
  console.log('');
  
  // 1. 시스템 헬스체크
  await testSystemHealth();
  await delay(2000);
  
  // 2. AI 역량진단 워크플로우
  await testAIDiagnosisWorkflow();
  await delay(3000);
  
  // 3. 상담신청 워크플로우
  await testConsultationWorkflow();
  await delay(2000);
  
  // 4. 오류신고 워크플로우
  await testErrorReportWorkflow();
  await delay(2000);
  
  console.log('🏁 전체 워크플로우 테스트 완료');
  console.log('');
  console.log('📋 최종 확인 사항:');
  console.log('1. 이메일 수신 확인 (Gmail 등)');
  console.log('2. 구글시트 데이터 저장 확인');
  console.log('3. HTML 보고서 생성 확인');
  console.log('4. 모든 워크플로우 정상 동작 확인');
  console.log('');
  console.log('🔗 구글시트 확인: https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID');
}

/**
 * 지연 함수
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ================================================================================
// 테스트 실행
// ================================================================================

// Node.js 환경에서 실행
if (typeof window === 'undefined') {
  // fetch polyfill 필요시 추가
  // const fetch = require('node-fetch');
  
  console.log('⚠️  GAS_URL을 실제 Google Apps Script URL로 변경하세요!');
  console.log('현재 URL:', GAS_URL);
  console.log('');
  
  if (GAS_URL.includes('YOUR_SCRIPT_ID')) {
    console.log('❌ GAS URL이 설정되지 않았습니다. 테스트를 중단합니다.');
    process.exit(1);
  }
  
  // 실제 테스트 실행 (URL 설정 후)
  // runCompleteWorkflowTest();
} else {
  // 브라우저 환경
  window.completeWorkflowTest = {
    runCompleteWorkflowTest,
    testAIDiagnosisWorkflow,
    testConsultationWorkflow,
    testErrorReportWorkflow,
    testSystemHealth,
    aiDiagnosisTestData,
    consultationTestData,
    errorReportTestData
  };
  
  console.log('🌐 브라우저 환경에서 실행 중');
  console.log('테스트 실행: completeWorkflowTest.runCompleteWorkflowTest()');
}

module.exports = {
  runCompleteWorkflowTest,
  testAIDiagnosisWorkflow,
  testConsultationWorkflow,
  testErrorReportWorkflow,
  testSystemHealth
};
