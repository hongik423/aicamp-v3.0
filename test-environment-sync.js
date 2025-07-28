/**
 * 🧪 AICAMP 환경변수 동기화 및 전체 시스템 테스트
 * 실행: node test-environment-sync.js
 * 업데이트: 2025.01.27
 */

const fetch = require('node-fetch');

// 🔧 환경변수 정보 (최신 배포 버전)
const CONFIG = {
  GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec',
  GOOGLE_SHEETS_ID: '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0',
  GOOGLE_SCRIPT_ID: '1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj',
  GOOGLE_DEPLOYMENT_ID: 'AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0',
  ADMIN_EMAIL: 'hongik423@gmail.com',
  GOOGLE_GEMINI_API_KEY: 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM'
};

// 🧪 테스트 결과 저장
const testResults = {
  timestamp: new Date().toLocaleString('ko-KR'),
  tests: {},
  summary: {
    total: 0,
    passed: 0,
    failed: 0
  }
};

/**
 * 🔧 공통 테스트 함수
 */
async function runTest(testName, testFunction) {
  console.log(`\n🧪 ${testName} 테스트 시작...`);
  testResults.summary.total++;
  
  try {
    const startTime = Date.now();
    const result = await testFunction();
    const duration = Date.now() - startTime;
    
    testResults.tests[testName] = {
      status: 'PASSED',
      duration: `${duration}ms`,
      result: result
    };
    
    testResults.summary.passed++;
    console.log(`✅ ${testName} 테스트 성공 (${duration}ms)`);
    return result;
    
  } catch (error) {
    testResults.tests[testName] = {
      status: 'FAILED',
      error: error.message,
      stack: error.stack
    };
    
    testResults.summary.failed++;
    console.error(`❌ ${testName} 테스트 실패:`, error.message);
    return null;
  }
}

/**
 * 📍 1. 사이트 접속 테스트 (GET 요청)
 */
async function testWebAppConnection() {
  const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
    method: 'GET',
    headers: {
      'User-Agent': 'AICAMP-Test-Agent/1.0'
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error('웹앱 응답에서 success: false 반환');
  }
  
  return {
    status: data.status,
    version: data.version,
    features: data.features?.length || 0,
    deploymentInfo: data.deploymentInfo
  };
}

/**
 * 📍 2. 진단 신청 테스트 (POST 요청)
 */
async function testDiagnosisSubmission() {
  const testData = {
    action: 'saveDiagnosis',
    회사명: 'Node.js테스트기업',
    업종: 'IT/소프트웨어',
    담당자명: 'Node테스트담당자',
    연락처: '010-1111-2222',
    이메일: 'nodejs-test@example.com',
    개인정보동의: true,
    종합점수: 85,
    문항별점수: {
      기획수준: 4,
      차별화정도: 5,
      가격설정: 4,
      전문성: 5,
      품질: 4,
      고객맞이: 4,
      고객응대: 4,
      불만관리: 3,
      고객유지: 4,
      고객이해: 3,
      마케팅계획: 3,
      오프라인마케팅: 3,
      온라인마케팅: 4,
      판매전략: 4,
      구매관리: 4,
      재고관리: 4,
      외관관리: 5,
      인테리어관리: 4,
      청결도: 5,
      작업동선: 4
    },
    카테고리점수: {
      productService: { score: 4.4 },
      customerService: { score: 3.8 },
      marketing: { score: 3.4 },
      procurement: { score: 4.0 },
      storeManagement: { score: 4.5 }
    },
    진단보고서요약: 'Node.js 테스트를 통한 진단 보고서입니다. 전반적인 역량이 우수하며, 마케팅 영역에서 일부 개선이 필요합니다.'
  };
  
  const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'AICAMP-Test-Agent/1.0'
    },
    body: JSON.stringify(testData)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(`진단 신청 실패: ${data.error || '알 수 없는 오류'}`);
  }
  
  return {
    message: data.message,
    sheet: data.sheet,
    row: data.row,
    진단점수: data.진단점수
  };
}

/**
 * 📍 3. 상담신청 테스트
 */
async function testConsultationSubmission() {
  const testData = {
    action: 'saveConsultation',
    상담유형: '경영컨설팅',
    성명: 'Node.js테스트고객',
    연락처: '010-3333-4444',
    이메일: 'nodejs-consultation@test.com',
    회사명: 'Node.js테스트컴퍼니',
    직책: 'CTO',
    상담분야: '디지털전환',
    문의내용: 'Node.js 기반 시스템 도입에 대한 상담을 받고 싶습니다.',
    희망상담시간: '평일 오후 3-6시',
    개인정보동의: true,
    진단연계여부: 'Y',
    진단점수: '85',
    추천서비스: '디지털 트랜스포메이션 컨설팅'
  };
  
  const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'AICAMP-Test-Agent/1.0'
    },
    body: JSON.stringify(testData)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(`상담신청 실패: ${data.error || '알 수 없는 오류'}`);
  }
  
  return {
    message: data.message,
    sheet: data.sheet,
    row: data.row
  };
}

/**
 * 📍 4. 베타피드백 테스트
 */
async function testBetaFeedback() {
  const testData = {
    action: 'saveBetaFeedback',
    계산기명: 'Node.js테스트계산기',
    피드백유형: '기능개선요청',
    사용자이메일: 'nodejs-beta@test.com',
    문제설명: 'Node.js 테스트 중 발견된 UI 개선 요청사항입니다.',
    기대동작: '더 직관적인 인터페이스',
    실제동작: '현재 인터페이스',
    재현단계: '1. 테스트 실행\n2. 결과 확인\n3. UI 개선점 발견',
    심각도: '보통',
    추가의견: 'Node.js 자동 테스트에서 발견된 개선사항입니다.',
    브라우저정보: 'Node.js Test Environment',
    제출경로: '/test-environment-sync'
  };
  
  const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'AICAMP-Test-Agent/1.0'
    },
    body: JSON.stringify(testData)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(`베타피드백 실패: ${data.error || '알 수 없는 오류'}`);
  }
  
  return {
    message: data.message,
    sheet: data.sheet,
    row: data.row,
    calculator: data.calculator,
    feedbackType: data.feedbackType
  };
}

/**
 * 📍 5. 환경변수 검증 테스트
 */
async function testEnvironmentVariables() {
  const envVars = {
    'GOOGLE_SCRIPT_URL': CONFIG.GOOGLE_SCRIPT_URL,
    'GOOGLE_SHEETS_ID': CONFIG.GOOGLE_SHEETS_ID,
    'GOOGLE_SCRIPT_ID': CONFIG.GOOGLE_SCRIPT_ID,
    'GOOGLE_DEPLOYMENT_ID': CONFIG.GOOGLE_DEPLOYMENT_ID,
    'ADMIN_EMAIL': CONFIG.ADMIN_EMAIL,
    'GOOGLE_GEMINI_API_KEY': CONFIG.GOOGLE_GEMINI_API_KEY?.substring(0, 10) + '***'
  };
  
  const validation = {
    scripUrlValid: CONFIG.GOOGLE_SCRIPT_URL.includes('script.google.com'),
    sheetsIdValid: CONFIG.GOOGLE_SHEETS_ID.length === 44,
    scriptIdValid: CONFIG.GOOGLE_SCRIPT_ID.length > 30,
    deploymentIdValid: CONFIG.GOOGLE_DEPLOYMENT_ID.startsWith('AKfycb'),
    emailValid: CONFIG.ADMIN_EMAIL.includes('@'),
    apiKeyValid: CONFIG.GOOGLE_GEMINI_API_KEY.startsWith('AIzaSy')
  };
  
  const allValid = Object.values(validation).every(v => v === true);
  
  if (!allValid) {
    throw new Error('일부 환경변수가 유효하지 않습니다: ' + JSON.stringify(validation));
  }
  
  return {
    environmentVariables: envVars,
    validation: validation,
    status: 'All environment variables are valid'
  };
}

/**
 * 📊 전체 테스트 실행
 */
async function runAllTests() {
  console.log('🚀 AICAMP 환경변수 동기화 및 전체 시스템 테스트 시작');
  console.log('⏰ 테스트 시작 시간:', testResults.timestamp);
  console.log('🌐 웹앱 URL:', CONFIG.GOOGLE_SCRIPT_URL);
  console.log('📊 구글시트 ID:', CONFIG.GOOGLE_SHEETS_ID);
  console.log('=' .repeat(80));
  
  // 1. 환경변수 검증
  await runTest('환경변수 검증', testEnvironmentVariables);
  
  // 2. 웹앱 연결 테스트
  await runTest('웹앱 연결', testWebAppConnection);
  
  // 3. 진단 신청 테스트
  await runTest('진단 신청', testDiagnosisSubmission);
  
  // 4. 상담신청 테스트
  await runTest('상담신청', testConsultationSubmission);
  
  // 5. 베타피드백 테스트
  await runTest('베타피드백', testBetaFeedback);
  
  // 최종 결과 출력
  console.log('\n' + '=' .repeat(80));
  console.log('🎯 전체 시스템 테스트 완료!');
  console.log('⏱️  총 테스트 시간:', testResults.timestamp);
  console.log('📊 테스트 결과:', `${testResults.summary.passed}/${testResults.summary.total} 성공`);
  
  if (testResults.summary.failed > 0) {
    console.log('❌ 실패한 테스트:', testResults.summary.failed + '개');
    Object.entries(testResults.tests).forEach(([name, result]) => {
      if (result.status === 'FAILED') {
        console.log(`   - ${name}: ${result.error}`);
      }
    });
  } else {
    console.log('✅ 모든 테스트 성공!');
    console.log('🚀 AICAMP 시스템이 정상적으로 작동 중입니다.');
  }
  
  console.log('\n📋 상세 결과:');
  console.log(JSON.stringify(testResults, null, 2));
  
  // 구글시트 확인 링크
  console.log('\n🔗 결과 확인:');
  console.log('📊 구글시트:', `https://docs.google.com/spreadsheets/d/${CONFIG.GOOGLE_SHEETS_ID}/edit`);
  console.log('🌐 웹앱:', CONFIG.GOOGLE_SCRIPT_URL);
  
  return testResults;
}

// 🚀 테스트 실행
if (require.main === module) {
  runAllTests()
    .then(results => {
      const exitCode = results.summary.failed > 0 ? 1 : 0;
      console.log(`\n🏁 테스트 완료 (종료 코드: ${exitCode})`);
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('💥 테스트 실행 중 치명적 오류:', error);
      process.exit(1);
    });
}

module.exports = { runAllTests, CONFIG }; 