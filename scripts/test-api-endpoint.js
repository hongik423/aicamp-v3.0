#!/usr/bin/env node

/**
 * AI역량진단 API 엔드포인트 실제 테스트
 * - localhost:3000에서 실행되는 서버 테스트
 * - 실제 API 호출 및 응답 검증
 */

const https = require('https');
const http = require('http');

console.log('🧪 AI역량진단 API 엔드포인트 실제 테스트 시작\n');

// 테스트 데이터 (간소화된 버전)
const testData = {
  // 연락처 정보
  contactName: '테스트담당자',
  contactEmail: 'test@example.com',
  contactPhone: '010-1234-5678',
  contactPosition: '개발팀장',
  
  // 기업 기본정보
  companyName: '테스트컴퍼니',
  businessRegistration: '123-45-67890',
  establishmentYear: '2020',
  industry: 'IT/소프트웨어',
  businessType: ['B2B 제품/서비스 판매'],
  location: '서울시 강남구',
  employeeCount: '31-50명',
  annualRevenue: '50억-100억',
  
  // 현재 AI/디지털 활용 현황 (중간 레벨)
  aiFamiliarity: 3,
  currentAiTools: ['ChatGPT/Copilot 등 생성형 AI'],
  aiUsageDepartments: ['IT/개발팀'],
  automationLevelByFunction: {
    '문서 작성/관리': 3,
    '데이터 입력/처리': 3
  },
  dataDigitalization: 3,
  currentSystems: ['ERP 시스템'],
  systemIntegration: 3,
  dataManagement: 3,
  
  // AI 역량 및 준비도 (중간 레벨)
  changeReadiness: 3,
  leadershipSupport: 4,
  employeeAttitude: 3,
  changeManagementExperience: 3,
  budgetAllocation: '3,000만원-5,000만원',
  technicalPersonnel: 3,
  externalPartnership: 2,
  trainingInvestment: 3,
  dataQuality: 3,
  analyticsCapability: 3,
  decisionMaking: 3,
  
  // 기술 인프라 및 보안 (중간 레벨)
  cloudAdoption: 3,
  systemScalability: 3,
  integrationCapability: 3,
  securityMeasures: ['기본 보안 솔루션'],
  complianceRequirements: [],
  riskManagement: 3,
  
  // AI 도입 목표 및 기대효과
  aiTransformationGoals: ['업무 효율성 향상', '비용 절감'],
  specificImprovements: '업무 자동화를 통한 효율성 향상',
  expectedROI: '1년-2년',
  successMetrics: ['업무 처리 시간 단축률'],
  timeframe: '중기(6개월 내)',
  
  // 실행 계획 및 우선순위
  priorityFunctions: ['직원 교육/훈련'],
  implementationApproach: '단계적 도입',
  resourceAllocation: {},
  challengesAnticipated: ['기술 인력 부족'],
  supportNeeds: ['교육/훈련 프로그램']
};

// HTTP 요청 함수
function makeRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: jsonData
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: data,
            parseError: error.message
          });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (postData) {
      req.write(postData);
    }
    
    req.end();
  });
}

// 서버 상태 확인
async function checkServerStatus() {
  console.log('🔍 서버 상태 확인...');
  
  try {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/health',
      method: 'GET',
      timeout: 5000
    };
    
    const response = await makeRequest(options);
    
    if (response.statusCode === 200) {
      console.log('✅ 서버 실행 중 (포트 3000)');
      return true;
    } else if (response.statusCode === 404) {
      console.log('✅ 서버 실행 중 (health 엔드포인트 없음)');
      return true;
    } else {
      console.log(`⚠️ 서버 응답: ${response.statusCode}`);
      return true; // 서버는 실행 중이지만 다른 상태
    }
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('❌ 서버가 실행되지 않음 (포트 3000)');
      console.log('💡 "npm run dev" 명령으로 서버를 먼저 실행해주세요.');
      return false;
    } else {
      console.log(`❌ 서버 확인 오류: ${error.message}`);
      return false;
    }
  }
}

// AI진단 API 테스트
async function testAIDiagnosisAPI() {
  console.log('\n🎯 AI역량진단 API 테스트...');
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/ai-diagnosis',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 30000 // 30초 타임아웃
  };
  
  const postData = JSON.stringify(testData);
  
  try {
    console.log('📤 테스트 데이터 전송 중...');
    console.log(`   회사명: ${testData.companyName}`);
    console.log(`   담당자: ${testData.contactName} (${testData.contactPosition})`);
    console.log(`   이메일: ${testData.contactEmail}`);
    
    const startTime = Date.now();
    const response = await makeRequest(options, postData);
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.log(`\n📊 응답 결과 (${duration}ms):`);
    console.log(`   상태 코드: ${response.statusCode}`);
    
    if (response.statusCode === 200) {
      console.log('✅ API 호출 성공!');
      
      if (response.data && typeof response.data === 'object') {
        console.log('\n📋 응답 데이터:');
        console.log(`   성공 여부: ${response.data.success ? '✅' : '❌'}`);
        
        if (response.data.success) {
          console.log(`   진단 ID: ${response.data.diagnosisId || 'N/A'}`);
          console.log(`   버전: ${response.data.version || 'N/A'}`);
          console.log(`   메시지: ${response.data.message || 'N/A'}`);
          
          if (response.data.scores) {
            console.log('\n🎯 점수 정보:');
            console.log(`   전체 점수: ${response.data.scores.total}/100`);
            console.log(`   성숙도: ${response.data.scores.level}`);
          }
          
          if (response.data.htmlReportGenerated) {
            console.log('✅ HTML 보고서 생성 완료');
          }
          
          return { success: true, data: response.data, duration };
        } else {
          console.log(`❌ 처리 실패: ${response.data.error || '알 수 없는 오류'}`);
          return { success: false, error: response.data.error, duration };
        }
      } else {
        console.log('⚠️ 응답 데이터 파싱 오류');
        console.log(`   원본 데이터: ${response.data}`);
        return { success: false, error: '응답 파싱 오류', duration };
      }
    } else if (response.statusCode === 400) {
      console.log('❌ 잘못된 요청 (400)');
      console.log(`   오류: ${response.data.error || response.data}`);
      return { success: false, error: '잘못된 요청', duration };
    } else if (response.statusCode === 500) {
      console.log('❌ 서버 내부 오류 (500)');
      console.log(`   오류: ${response.data.error || response.data}`);
      return { success: false, error: '서버 내부 오류', duration };
    } else {
      console.log(`❌ 예상치 못한 응답 (${response.statusCode})`);
      console.log(`   응답: ${response.data}`);
      return { success: false, error: `HTTP ${response.statusCode}`, duration };
    }
    
  } catch (error) {
    console.log(`❌ API 호출 오류: ${error.message}`);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 서버가 실행되지 않았거나 포트가 다릅니다.');
    } else if (error.code === 'TIMEOUT') {
      console.log('💡 요청 시간이 초과되었습니다. GAS 처리 시간이 길 수 있습니다.');
    }
    
    return { success: false, error: error.message };
  }
}

// 상담신청 API 테스트
async function testConsultationAPI() {
  console.log('\n💬 상담신청 API 테스트...');
  
  const consultationData = {
    company: testData.companyName,  // 'company' 필드명 사용
    name: testData.contactName,     // 'name' 필드명 사용  
    email: testData.contactEmail,
    phone: testData.contactPhone,
    position: testData.contactPosition,
    consultationType: 'AI전략수립',
    consultationArea: 'AI도입전략',
    content: 'AI 도입을 통한 비즈니스 혁신 전략 수립이 필요합니다.',
    urgency: '보통',
    privacyConsent: true,
    marketingConsent: false
  };
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/consultation',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000
  };
  
  try {
    const response = await makeRequest(options, JSON.stringify(consultationData));
    
    console.log(`   상태 코드: ${response.statusCode}`);
    
    if (response.statusCode === 200 && response.data.success) {
      console.log('✅ 상담신청 API 성공');
      return { success: true };
    } else {
      console.log('❌ 상담신청 API 실패');
      console.log(`   오류: ${response.data.error || response.data}`);
      return { success: false, error: response.data.error };
    }
  } catch (error) {
    console.log(`❌ 상담신청 API 오류: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// 오류신고 API 테스트
async function testErrorReportAPI() {
  console.log('\n🚨 오류신고 API 테스트...');
  
  const errorData = {
    name: testData.contactName,
    email: testData.contactEmail,
    phone: testData.contactPhone,
    calculatorType: 'vat',
    errorDescription: '부가세 계산 결과가 예상과 다릅니다.',
    expectedBehavior: '10% 부가세 계산',
    actualBehavior: '8% 부가세 계산됨',
    stepsToReproduce: '1. 금액 입력 2. 계산 버튼 클릭',
    browserInfo: 'Chrome 120.0',
    deviceInfo: 'Windows 11'
  };
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/tax-calculator/error-report',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000
  };
  
  try {
    const response = await makeRequest(options, JSON.stringify(errorData));
    
    console.log(`   상태 코드: ${response.statusCode}`);
    
    if (response.statusCode === 200 && response.data.success) {
      console.log('✅ 오류신고 API 성공');
      return { success: true };
    } else {
      console.log('❌ 오류신고 API 실패');
      console.log(`   오류: ${response.data.error || response.data}`);
      return { success: false, error: response.data.error };
    }
  } catch (error) {
    console.log(`❌ 오류신고 API 오류: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// 메인 테스트 실행
async function runAPITests() {
  console.log('🚀 AICAMP API 엔드포인트 실제 테스트');
  console.log('=' .repeat(60));
  
  // 1. 서버 상태 확인
  const serverRunning = await checkServerStatus();
  if (!serverRunning) {
    console.log('\n❌ 테스트 중단: 서버가 실행되지 않음');
    return false;
  }
  
  const results = [];
  
  // 2. AI역량진단 API 테스트
  const diagnosisResult = await testAIDiagnosisAPI();
  results.push({ name: 'AI역량진단', ...diagnosisResult });
  
  // 3. 상담신청 API 테스트
  const consultationResult = await testConsultationAPI();
  results.push({ name: '상담신청', ...consultationResult });
  
  // 4. 오류신고 API 테스트
  const errorReportResult = await testErrorReportAPI();
  results.push({ name: '오류신고', ...errorReportResult });
  
  // 결과 요약
  console.log('\n' + '=' .repeat(60));
  console.log('📊 API 테스트 결과 요약');
  console.log('=' .repeat(60));
  
  let successCount = 0;
  results.forEach((result, index) => {
    const status = result.success ? '✅ 성공' : '❌ 실패';
    const duration = result.duration ? ` (${result.duration}ms)` : '';
    console.log(`${index + 1}. ${result.name}: ${status}${duration}`);
    if (result.error) {
      console.log(`   오류: ${result.error}`);
    }
    if (result.success) successCount++;
  });
  
  console.log(`\n🎯 전체 성공률: ${successCount}/${results.length} (${Math.round(successCount/results.length*100)}%)`);
  
  if (successCount === results.length) {
    console.log('\n🎉 모든 API 테스트 통과!');
    console.log('✅ 3가지 양식 시스템 정상 작동 확인');
    console.log('🚀 aicamp.club 배포 준비 완료!');
  } else {
    console.log('\n⚠️ 일부 API 테스트 실패');
    console.log('🔧 오류 수정 후 재테스트 필요');
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log('🎓 API 엔드포인트 테스트 완료');
  console.log('=' .repeat(60));
  
  return successCount === results.length;
}

// 테스트 실행
if (require.main === module) {
  runAPITests().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = {
  runAPITests
};
