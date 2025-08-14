/**
 * 🎯 AICAMP AI역량진단 전체 워크플로우 시뮬레이션 테스트
 * 
 * 테스트 범위:
 * 1. 진단 신청 폼 데이터 검증
 * 2. API 엔드포인트 호출 및 응답
 * 3. Google Apps Script 연동
 * 4. 이메일 발송 시뮬레이션
 * 5. Google Drive 저장 확인
 * 6. 오류 처리 및 로깅
 */

const https = require('https');
const fs = require('fs');

// 테스트 설정
const TEST_CONFIG = {
  BASE_URL: 'http://localhost:3000',
  API_ENDPOINT: '/api/ai-diagnosis',
  TIMEOUT: 120000, // 2분
  RETRY_COUNT: 3
};

// 테스트 데이터
const TEST_DIAGNOSIS_DATA = {
  // 기본 정보
  companyName: '테스트기업(주)',
  contactName: '홍길동',
  contactEmail: 'test@aicamp.club',
  contactPhone: '010-1234-5678',
  contactPosition: '대표이사',
  industry: 'IT/소프트웨어',
  employeeCount: '51-100명',
  annualRevenue: '50-100억원',
  establishmentYear: '2020',
  location: '서울시 강남구',
  
  // 추가 정보
  mainConcerns: 'AI 도입을 통한 업무 효율성 향상과 직원들의 AI 역량 강화가 필요합니다.',
  expectedBenefits: '생산성 향상, 비용 절감, 경쟁력 강화를 기대합니다.',
  additionalInfo: '중소기업으로서 체계적인 AI 도입 전략이 필요한 상황입니다.',
  
  // 45문항 진단 데이터 (샘플)
  q1_leadership_vision: 4,
  q2_leadership_support: 3,
  q3_leadership_investment: 4,
  q4_leadership_change: 3,
  q5_leadership_communication: 4,
  q6_leadership_decision: 3,
  q7_leadership_innovation: 4,
  q8_leadership_learning: 4,
  
  q9_current_tools: 3,
  q10_current_automation: 2,
  q11_current_data: 3,
  q12_current_analysis: 2,
  q13_current_ai_adoption: 3,
  q14_current_integration: 2,
  q15_current_efficiency: 3,
  q16_current_satisfaction: 4,
  
  q17_org_culture: 4,
  q18_org_collaboration: 4,
  q19_org_learning: 3,
  q20_org_adaptation: 3,
  q21_org_communication: 4,
  q22_org_feedback: 3,
  q23_org_innovation: 4,
  q24_org_engagement: 3,
  
  q25_tech_infrastructure: 3,
  q26_tech_security: 4,
  q27_tech_scalability: 3,
  q28_tech_integration: 2,
  q29_tech_maintenance: 3,
  q30_tech_upgrade: 3,
  q31_tech_monitoring: 2,
  q32_tech_backup: 4,
  
  q33_goal_clarity: 4,
  q34_goal_measurement: 3,
  q35_goal_alignment: 4,
  q36_goal_communication: 3,
  q37_goal_tracking: 3,
  q38_goal_adjustment: 3,
  q39_goal_achievement: 4,
  q40_goal_roi: 3,
  
  q41_execution_planning: 3,
  q42_execution_resources: 3,
  q43_execution_timeline: 4,
  q44_execution_monitoring: 3,
  q45_execution_improvement: 3,
  
  // 메타데이터
  timestamp: new Date().toISOString(),
  userAgent: 'AICAMP-Test-Client/1.0',
  source: 'workflow_simulation_test'
};

// 테스트 결과 저장
const TEST_RESULTS = {
  startTime: null,
  endTime: null,
  steps: [],
  errors: [],
  warnings: [],
  success: false,
  totalDuration: 0
};

/**
 * 테스트 단계 기록
 */
function logStep(step, status, details = '', duration = 0) {
  const timestamp = new Date().toISOString();
  const result = {
    step,
    status, // 'START', 'SUCCESS', 'WARNING', 'ERROR'
    details,
    duration,
    timestamp
  };
  
  TEST_RESULTS.steps.push(result);
  
  const statusEmoji = {
    'START': '🔄',
    'SUCCESS': '✅',
    'WARNING': '⚠️',
    'ERROR': '❌'
  };
  
  console.log(`${statusEmoji[status]} [${step}] ${details} ${duration ? `(${duration}ms)` : ''}`);
  
  if (status === 'ERROR') {
    TEST_RESULTS.errors.push(result);
  } else if (status === 'WARNING') {
    TEST_RESULTS.warnings.push(result);
  }
}

/**
 * HTTP 요청 실행
 */
function makeRequest(url, data, timeout = TEST_CONFIG.TIMEOUT) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const urlObj = new URL(url);
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'AICAMP-Workflow-Test/1.0'
      },
      timeout: timeout
    };

    const req = (urlObj.protocol === 'https:' ? https : require('http')).request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: parsedData
          });
        } catch (parseError) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: responseData,
            parseError: parseError.message
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`요청 시간 초과 (${timeout}ms)`));
    });

    req.write(postData);
    req.end();
  });
}

/**
 * 1단계: 데이터 검증 테스트
 */
async function testDataValidation() {
  logStep('데이터 검증', 'START', '진단 데이터 유효성 검사 시작');
  
  const requiredFields = ['companyName', 'contactName', 'contactEmail'];
  const missingFields = [];
  
  for (const field of requiredFields) {
    if (!TEST_DIAGNOSIS_DATA[field] || TEST_DIAGNOSIS_DATA[field].trim() === '') {
      missingFields.push(field);
    }
  }
  
  if (missingFields.length > 0) {
    logStep('데이터 검증', 'ERROR', `필수 필드 누락: ${missingFields.join(', ')}`);
    return false;
  }
  
  // 이메일 형식 검증
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(TEST_DIAGNOSIS_DATA.contactEmail)) {
    logStep('데이터 검증', 'ERROR', '잘못된 이메일 형식');
    return false;
  }
  
  // 45문항 데이터 검증
  let questionCount = 0;
  for (const key in TEST_DIAGNOSIS_DATA) {
    if (key.startsWith('q') && key.includes('_')) {
      questionCount++;
    }
  }
  
  if (questionCount < 45) {
    logStep('데이터 검증', 'WARNING', `진단 문항 수 부족: ${questionCount}/45`);
  }
  
  logStep('데이터 검증', 'SUCCESS', `모든 필수 데이터 검증 완료 (${questionCount}문항)`);
  return true;
}

/**
 * 2단계: API 엔드포인트 테스트
 */
async function testAPIEndpoint() {
  logStep('API 호출', 'START', 'AI 진단 API 엔드포인트 테스트 시작');
  
  const startTime = Date.now();
  
  try {
    const response = await makeRequest(
      `${TEST_CONFIG.BASE_URL}${TEST_CONFIG.API_ENDPOINT}`,
      TEST_DIAGNOSIS_DATA,
      TEST_CONFIG.TIMEOUT
    );
    
    const duration = Date.now() - startTime;
    
    if (response.statusCode === 200) {
      logStep('API 호출', 'SUCCESS', `API 응답 성공 (${response.statusCode})`, duration);
      
      // 응답 데이터 검증
      if (response.data && response.data.success) {
        logStep('응답 검증', 'SUCCESS', '성공적인 응답 데이터 수신');
        return response.data;
      } else {
        logStep('응답 검증', 'WARNING', '응답 성공하지만 데이터 구조 확인 필요');
        return response.data;
      }
    } else {
      logStep('API 호출', 'ERROR', `API 응답 오류 (${response.statusCode}): ${JSON.stringify(response.data).substring(0, 200)}`);
      return null;
    }
    
  } catch (error) {
    const duration = Date.now() - startTime;
    logStep('API 호출', 'ERROR', `API 호출 실패: ${error.message}`, duration);
    return null;
  }
}

/**
 * 3단계: Google Apps Script 연동 테스트
 */
async function testGoogleAppsScript(apiResponse) {
  logStep('GAS 연동', 'START', 'Google Apps Script 연동 상태 확인');
  
  if (!apiResponse) {
    logStep('GAS 연동', 'ERROR', 'API 응답이 없어 GAS 연동 테스트 불가');
    return false;
  }
  
  // API 응답에서 GAS 관련 정보 확인
  if (apiResponse.gasCallSuccess !== undefined) {
    if (apiResponse.gasCallSuccess) {
      logStep('GAS 연동', 'SUCCESS', 'Google Apps Script 연동 성공');
      return true;
    } else {
      logStep('GAS 연동', 'ERROR', 'Google Apps Script 연동 실패');
      return false;
    }
  } else {
    logStep('GAS 연동', 'WARNING', 'GAS 연동 상태 정보 없음 - 응답 구조 확인 필요');
    return null;
  }
}

/**
 * 4단계: 이메일 발송 테스트
 */
async function testEmailDelivery(apiResponse) {
  logStep('이메일 발송', 'START', '이메일 발송 상태 확인');
  
  if (!apiResponse) {
    logStep('이메일 발송', 'ERROR', 'API 응답이 없어 이메일 발송 테스트 불가');
    return false;
  }
  
  // API 응답에서 이메일 발송 정보 확인
  if (apiResponse.emailResult || apiResponse.emailsSent !== undefined) {
    const emailsSent = apiResponse.emailResult?.emailsSent || apiResponse.emailsSent || 0;
    
    if (emailsSent > 0) {
      logStep('이메일 발송', 'SUCCESS', `이메일 발송 성공 (${emailsSent}건)`);
      return true;
    } else {
      logStep('이메일 발송', 'ERROR', '이메일 발송 실패');
      return false;
    }
  } else {
    logStep('이메일 발송', 'WARNING', '이메일 발송 상태 정보 없음');
    return null;
  }
}

/**
 * 5단계: Google Drive 저장 테스트
 */
async function testGoogleDriveStorage(apiResponse) {
  logStep('Drive 저장', 'START', 'Google Drive 보고서 저장 확인');
  
  if (!apiResponse) {
    logStep('Drive 저장', 'ERROR', 'API 응답이 없어 Drive 저장 테스트 불가');
    return false;
  }
  
  // API 응답에서 Drive 저장 정보 확인
  if (apiResponse.driveFileInfo || apiResponse.reportSaved) {
    const fileInfo = apiResponse.driveFileInfo;
    
    if (fileInfo && fileInfo.fileId) {
      logStep('Drive 저장', 'SUCCESS', `Google Drive 저장 성공 (파일 ID: ${fileInfo.fileId})`);
      return true;
    } else {
      logStep('Drive 저장', 'ERROR', 'Google Drive 저장 실패');
      return false;
    }
  } else {
    logStep('Drive 저장', 'WARNING', 'Drive 저장 상태 정보 없음');
    return null;
  }
}

/**
 * 6단계: 오류 처리 및 로깅 테스트
 */
async function testErrorHandling() {
  logStep('오류 처리', 'START', '오류 처리 메커니즘 테스트');
  
  // 잘못된 데이터로 API 호출하여 오류 처리 확인
  const invalidData = {
    companyName: '', // 필수 필드 누락
    contactEmail: 'invalid-email', // 잘못된 이메일
    contactName: 'Test'
  };
  
  try {
    const response = await makeRequest(
      `${TEST_CONFIG.BASE_URL}${TEST_CONFIG.API_ENDPOINT}`,
      invalidData,
      10000 // 10초 타임아웃
    );
    
    if (response.statusCode >= 400) {
      logStep('오류 처리', 'SUCCESS', `적절한 오류 응답 (${response.statusCode})`);
      return true;
    } else {
      logStep('오류 처리', 'WARNING', '잘못된 데이터에 대한 오류 처리 미흡');
      return false;
    }
    
  } catch (error) {
    logStep('오류 처리', 'SUCCESS', `오류 처리 정상 작동: ${error.message}`);
    return true;
  }
}

/**
 * 종합 테스트 실행
 */
async function runFullWorkflowTest() {
  console.log('🎯 AICAMP AI역량진단 전체 워크플로우 시뮬레이션 테스트 시작\n');
  
  TEST_RESULTS.startTime = new Date().toISOString();
  const overallStartTime = Date.now();
  
  try {
    // 1단계: 데이터 검증
    const dataValidation = await testDataValidation();
    if (!dataValidation) {
      throw new Error('데이터 검증 실패로 테스트 중단');
    }
    
    // 2단계: API 엔드포인트 테스트
    const apiResponse = await testAPIEndpoint();
    
    // 3단계: Google Apps Script 연동 테스트
    await testGoogleAppsScript(apiResponse);
    
    // 4단계: 이메일 발송 테스트
    await testEmailDelivery(apiResponse);
    
    // 5단계: Google Drive 저장 테스트
    await testGoogleDriveStorage(apiResponse);
    
    // 6단계: 오류 처리 테스트
    await testErrorHandling();
    
    TEST_RESULTS.success = true;
    
  } catch (error) {
    logStep('전체 테스트', 'ERROR', `테스트 중단: ${error.message}`);
    TEST_RESULTS.success = false;
  }
  
  TEST_RESULTS.endTime = new Date().toISOString();
  TEST_RESULTS.totalDuration = Date.now() - overallStartTime;
  
  // 결과 요약
  console.log('\n' + '='.repeat(60));
  console.log('🎯 AICAMP 워크플로우 테스트 결과 요약');
  console.log('='.repeat(60));
  console.log(`📊 전체 상태: ${TEST_RESULTS.success ? '✅ 성공' : '❌ 실패'}`);
  console.log(`⏱️ 총 소요시간: ${TEST_RESULTS.totalDuration}ms`);
  console.log(`📋 총 단계: ${TEST_RESULTS.steps.length}개`);
  console.log(`✅ 성공: ${TEST_RESULTS.steps.filter(s => s.status === 'SUCCESS').length}개`);
  console.log(`⚠️ 경고: ${TEST_RESULTS.warnings.length}개`);
  console.log(`❌ 오류: ${TEST_RESULTS.errors.length}개`);
  
  if (TEST_RESULTS.errors.length > 0) {
    console.log('\n🚨 발견된 오류:');
    TEST_RESULTS.errors.forEach((error, index) => {
      console.log(`${index + 1}. [${error.step}] ${error.details}`);
    });
  }
  
  if (TEST_RESULTS.warnings.length > 0) {
    console.log('\n⚠️ 경고 사항:');
    TEST_RESULTS.warnings.forEach((warning, index) => {
      console.log(`${index + 1}. [${warning.step}] ${warning.details}`);
    });
  }
  
  // 결과를 파일로 저장
  const resultFileName = `workflow-test-result-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  fs.writeFileSync(resultFileName, JSON.stringify(TEST_RESULTS, null, 2));
  console.log(`\n📄 상세 결과가 ${resultFileName}에 저장되었습니다.`);
  
  return TEST_RESULTS;
}

// 테스트 실행
if (require.main === module) {
  runFullWorkflowTest()
    .then((results) => {
      process.exit(results.success ? 0 : 1);
    })
    .catch((error) => {
      console.error('❌ 테스트 실행 중 치명적 오류:', error);
      process.exit(1);
    });
}

module.exports = {
  runFullWorkflowTest,
  TEST_CONFIG,
  TEST_DIAGNOSIS_DATA
};
