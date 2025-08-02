/**
 * AI 무료진단 시스템 전체 흐름 테스트
 * 신청 → 결과보고서 작성 → 이메일 발송 → 데이터 저장
 */

const fetch = require('node-fetch');

// 테스트 설정
const BASE_URL = 'http://localhost:3000';
const TEST_COMPANY = `테스트기업_${Date.now()}`;
const TEST_EMAIL = 'test@aicamp.club';

console.log('🧪 AI 무료진단 시스템 전체 테스트 시작');
console.log('=' .repeat(60));

// 테스트 데이터
const testDiagnosisData = {
  companyName: TEST_COMPANY,
  representativeName: '홍길동',
  position: '대표이사',
  industry: 'it',
  region: 'seoul',
  businessContent: 'AI 기반 솔루션 개발 및 컨설팅 서비스',
  concerns: ['ai_adoption', 'employee_training', 'process_optimization'],
  customConcern: '특별히 AI 도입 후 직원들의 업무 적응 문제가 걱정됩니다',
  expectations: 'AI 도입을 통한 업무 효율성 향상과 경쟁력 강화를 기대합니다',
  email: TEST_EMAIL,
  phone: '010-1234-5678',
  agreeToTerms: true,
  
  // 기업 규모 정보
  employeeCount: '10-50',
  annualRevenue: '10-50억',
  businessHistory: '3-5년',
  mainProducts: 'AI 솔루션, 컨설팅',
  targetCustomers: '중소기업',
  competitionLevel: '높음',
  digitalizationLevel: '중간',
  aiExperience: '있음',
  urgency: '높음',
  budget: '1000-5000만원',
  
  // AI 역량 진단 데이터 (1-5 점)
  ceoAIVision: 4,
  aiInvestment: 3,
  aiStrategy: 4,
  changeManagement: 3,
  riskTolerance: 4,
  itInfrastructure: 4,
  dataManagement: 3,
  securityLevel: 4,
  aiToolsAdopted: 2,
  digitalLiteracy: 4,
  aiToolUsage: 3,
  learningAgility: 4,
  dataAnalysis: 3,
  innovationCulture: 4,
  collaborationLevel: 4,
  experimentCulture: 3,
  continuousLearning: 4,
  processAutomation: 2,
  decisionMaking: 4,
  customerService: 3
};

let diagnosisId = null;
let testResults = {
  step1_submission: { status: 'pending', message: '', timestamp: null },
  step2_processing: { status: 'pending', message: '', timestamp: null },
  step3_result_generation: { status: 'pending', message: '', timestamp: null },
  step4_email_notification: { status: 'pending', message: '', timestamp: null },
  step5_data_storage: { status: 'pending', message: '', timestamp: null },
  step6_result_retrieval: { status: 'pending', message: '', timestamp: null }
};

// 테스트 단계별 함수들
async function step1_submitDiagnosis() {
  console.log('\n🚀 1단계: 진단 신청 테스트');
  console.log('-'.repeat(40));
  
  try {
    const response = await fetch(`${BASE_URL}/api/google-script-proxy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'submitFreeDiagnosis',
        data: testDiagnosisData
      })
    });
    
    const result = await response.json();
    
    console.log(`응답 상태: ${response.status}`);
    console.log('응답 데이터:', JSON.stringify(result, null, 2));
    
    if (result.success && result.diagnosisId) {
      diagnosisId = result.diagnosisId;
      testResults.step1_submission = {
        status: 'success',
        message: `진단 신청 성공 (ID: ${diagnosisId})`,
        timestamp: new Date().toISOString()
      };
      console.log(`✅ 진단 신청 성공! ID: ${diagnosisId}`);
      return true;
    } else {
      testResults.step1_submission = {
        status: 'failed',
        message: result.error || '진단 신청 실패',
        timestamp: new Date().toISOString()
      };
      console.log('❌ 진단 신청 실패:', result.error);
      return false;
    }
  } catch (error) {
    testResults.step1_submission = {
      status: 'error',
      message: error.message,
      timestamp: new Date().toISOString()
    };
    console.log('❌ 진단 신청 오류:', error.message);
    return false;
  }
}

async function step2_checkProcessing() {
  console.log('\n⏳ 2단계: 진단 처리 상태 확인');
  console.log('-'.repeat(40));
  
  if (!diagnosisId) {
    console.log('❌ 진단 ID가 없습니다');
    return false;
  }
  
  try {
    // Google Apps Script에서 진단 처리 상태 확인
    const response = await fetch(`${BASE_URL}/api/google-script-proxy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'checkDiagnosisStatus',
        diagnosisId: diagnosisId
      })
    });
    
    const result = await response.json();
    console.log('처리 상태 확인:', JSON.stringify(result, null, 2));
    
    testResults.step2_processing = {
      status: result.success ? 'success' : 'pending',
      message: result.message || '처리 상태 확인',
      timestamp: new Date().toISOString()
    };
    
    return true;
  } catch (error) {
    testResults.step2_processing = {
      status: 'error',
      message: error.message,
      timestamp: new Date().toISOString()
    };
    console.log('❌ 처리 상태 확인 오류:', error.message);
    return false;
  }
}

async function step3_waitForResultGeneration() {
  console.log('\n🤖 3단계: AI 결과보고서 생성 대기');
  console.log('-'.repeat(40));
  
  if (!diagnosisId) {
    console.log('❌ 진단 ID가 없습니다');
    return false;
  }
  
  const maxWaitTime = 300000; // 5분
  const checkInterval = 10000; // 10초
  const startTime = Date.now();
  
  console.log('AI 분석 시작... (최대 5분 대기)');
  
  while (Date.now() - startTime < maxWaitTime) {
    try {
      const response = await fetch(`${BASE_URL}/api/google-script-proxy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'getDiagnosisResult',
          diagnosisId: diagnosisId
        })
      });
      
      const result = await response.json();
      
      if (result.success && result.data) {
        testResults.step3_result_generation = {
          status: 'success',
          message: '결과보고서 생성 완료',
          timestamp: new Date().toISOString()
        };
        console.log('✅ 결과보고서 생성 완료!');
        console.log('결과 데이터 샘플:', {
          diagnosisId: result.data.diagnosisId,
          companyName: result.data.companyName,
          overallScore: result.data.overallScore,
          overallGrade: result.data.overallGrade
        });
        return true;
      } else {
        const elapsedTime = Math.round((Date.now() - startTime) / 1000);
        console.log(`⏳ 분석 진행 중... (${elapsedTime}초 경과)`);
        await new Promise(resolve => setTimeout(resolve, checkInterval));
      }
    } catch (error) {
      console.log('⚠️ 결과 확인 중 오류:', error.message);
      await new Promise(resolve => setTimeout(resolve, checkInterval));
    }
  }
  
  testResults.step3_result_generation = {
    status: 'timeout',
    message: '결과보고서 생성 시간 초과 (5분)',
    timestamp: new Date().toISOString()
  };
  console.log('❌ 결과보고서 생성 시간 초과');
  return false;
}

async function step4_checkEmailNotification() {
  console.log('\n📧 4단계: 이메일 알림 확인');
  console.log('-'.repeat(40));
  
  try {
    // 이메일 발송 상태 확인 (Google Apps Script)
    const response = await fetch(`${BASE_URL}/api/google-script-proxy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'checkEmailStatus',
        diagnosisId: diagnosisId
      })
    });
    
    const result = await response.json();
    console.log('이메일 상태:', JSON.stringify(result, null, 2));
    
    testResults.step4_email_notification = {
      status: result.success ? 'success' : 'pending',
      message: result.message || '이메일 상태 확인',
      timestamp: new Date().toISOString()
    };
    
    console.log('📧 이메일 발송 확인 완료');
    return true;
  } catch (error) {
    testResults.step4_email_notification = {
      status: 'error',
      message: error.message,
      timestamp: new Date().toISOString()
    };
    console.log('❌ 이메일 확인 오류:', error.message);
    return false;
  }
}

async function step5_checkDataStorage() {
  console.log('\n💾 5단계: 구글 시트 데이터 저장 확인');
  console.log('-'.repeat(40));
  
  try {
    // 구글 시트 데이터 확인
    const response = await fetch(`${BASE_URL}/api/google-script-proxy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'getLatestDiagnosisData'
      })
    });
    
    const result = await response.json();
    console.log('시트 데이터 확인:', JSON.stringify(result, null, 2));
    
    if (result.success && result.data && result.data.length > 0) {
      // 최신 데이터에서 우리 테스트 데이터 찾기
      const ourData = result.data.find(row => 
        row['기업명'] === TEST_COMPANY || row['진단ID'] === diagnosisId
      );
      
      if (ourData) {
        testResults.step5_data_storage = {
          status: 'success',
          message: '구글 시트 데이터 저장 확인',
          timestamp: new Date().toISOString()
        };
        console.log('✅ 구글 시트 데이터 저장 확인 완료');
        console.log('저장된 데이터:', ourData);
        return true;
      }
    }
    
    testResults.step5_data_storage = {
      status: 'failed',
      message: '구글 시트에서 데이터를 찾을 수 없음',
      timestamp: new Date().toISOString()
    };
    console.log('❌ 구글 시트에서 데이터를 찾을 수 없습니다');
    return false;
  } catch (error) {
    testResults.step5_data_storage = {
      status: 'error',
      message: error.message,
      timestamp: new Date().toISOString()
    };
    console.log('❌ 데이터 저장 확인 오류:', error.message);
    return false;
  }
}

async function step6_testResultRetrieval() {
  console.log('\n📊 6단계: 결과 조회 페이지 테스트');
  console.log('-'.repeat(40));
  
  if (!diagnosisId) {
    console.log('❌ 진단 ID가 없습니다');
    return false;
  }
  
  try {
    // 결과 조회 API 테스트
    const response = await fetch(`${BASE_URL}/api/diagnosis-results/${diagnosisId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    const result = await response.json();
    console.log(`결과 조회 API 응답 (${response.status}):`, JSON.stringify(result, null, 2));
    
    if (response.ok && result.success) {
      testResults.step6_result_retrieval = {
        status: 'success',
        message: '결과 조회 페이지 정상 작동',
        timestamp: new Date().toISOString()
      };
      console.log('✅ 결과 조회 페이지 테스트 성공');
      console.log(`🌐 결과 페이지 URL: ${BASE_URL}/diagnosis/result/${diagnosisId}`);
      return true;
    } else {
      testResults.step6_result_retrieval = {
        status: 'failed',
        message: result.message || '결과 조회 실패',
        timestamp: new Date().toISOString()
      };
      console.log('❌ 결과 조회 실패:', result.message);
      return false;
    }
  } catch (error) {
    testResults.step6_result_retrieval = {
      status: 'error',
      message: error.message,
      timestamp: new Date().toISOString()
    };
    console.log('❌ 결과 조회 오류:', error.message);
    return false;
  }
}

function printTestSummary() {
  console.log('\n' + '='.repeat(60));
  console.log('📋 AI 무료진단 시스템 테스트 결과 요약');
  console.log('='.repeat(60));
  
  const steps = [
    { key: 'step1_submission', name: '1. 진단 신청' },
    { key: 'step2_processing', name: '2. 처리 상태 확인' },
    { key: 'step3_result_generation', name: '3. AI 결과보고서 생성' },
    { key: 'step4_email_notification', name: '4. 이메일 알림' },
    { key: 'step5_data_storage', name: '5. 데이터 저장' },
    { key: 'step6_result_retrieval', name: '6. 결과 조회' }
  ];
  
  let successCount = 0;
  
  steps.forEach(step => {
    const result = testResults[step.key];
    const statusIcon = result.status === 'success' ? '✅' : 
                      result.status === 'failed' ? '❌' : 
                      result.status === 'error' ? '🔥' : 
                      result.status === 'timeout' ? '⏰' : '⏳';
    
    console.log(`${statusIcon} ${step.name}: ${result.message}`);
    
    if (result.status === 'success') {
      successCount++;
    }
  });
  
  console.log('\n' + '-'.repeat(60));
  console.log(`전체 성공률: ${successCount}/${steps.length} (${Math.round(successCount/steps.length*100)}%)`);
  
  if (diagnosisId) {
    console.log(`\n🔗 생성된 진단 ID: ${diagnosisId}`);
    console.log(`🌐 결과 페이지: ${BASE_URL}/diagnosis/result/${diagnosisId}`);
    console.log(`🧪 디버그 도구: ${BASE_URL}/test-diagnosis-debug.html?id=${diagnosisId}`);
  }
  
  console.log('\n📧 테스트 이메일 주소:', TEST_EMAIL);
  console.log('🏢 테스트 기업명:', TEST_COMPANY);
  console.log('⏰ 테스트 완료 시간:', new Date().toLocaleString());
}

// 메인 테스트 실행
async function runFullSystemTest() {
  console.log(`📅 테스트 시작 시간: ${new Date().toLocaleString()}`);
  console.log(`🏢 테스트 기업: ${TEST_COMPANY}`);
  console.log(`📧 테스트 이메일: ${TEST_EMAIL}`);
  
  try {
    // 1단계: 진단 신청
    const step1Success = await step1_submitDiagnosis();
    if (!step1Success) {
      console.log('❌ 1단계 실패로 테스트 중단');
      printTestSummary();
      return;
    }
    
    // 2단계: 처리 상태 확인
    await step2_checkProcessing();
    
    // 3단계: 결과보고서 생성 대기
    const step3Success = await step3_waitForResultGeneration();
    
    // 4단계: 이메일 알림 확인
    await step4_checkEmailNotification();
    
    // 5단계: 데이터 저장 확인
    await step5_checkDataStorage();
    
    // 6단계: 결과 조회 테스트
    if (step3Success) {
      await step6_testResultRetrieval();
    }
    
  } catch (error) {
    console.log('🔥 테스트 실행 중 예상치 못한 오류:', error.message);
  } finally {
    printTestSummary();
  }
}

// 스크립트 실행
if (require.main === module) {
  runFullSystemTest().catch(console.error);
}

module.exports = {
  runFullSystemTest,
  testDiagnosisData,
  testResults
};