#!/usr/bin/env node

/**
 * 🧪 AICAMP v3.0 진단 플로우 테스트
 * 전체 진단 과정을 테스트하여 문제점을 찾습니다.
 */

require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

console.log('🧪 AICAMP v3.0 진단 플로우 테스트 시작');
console.log('='.repeat(50));

// 테스트 데이터 (45개 질문 응답 포함)
const testData = {
  companyName: '테스트회사_' + Date.now(),
  industry: 'IT/소프트웨어',
  employeeCount: '10-50명',
  contactName: '홍길동',
  contactEmail: 'test@aicamp.club',
  contactPhone: '010-1234-5678',
  contactPosition: '대표이사',
  businessRegistration: '123-45-67890',
  annualRevenue: '10억원 미만',
  establishmentYear: '2020',
  businessContent: 'IT 서비스 개발',
  mainProducts: 'AI 솔루션',
  targetCustomers: '중소기업',
  currentChallenges: '업무 효율성 향상',
  privacyConsent: true,
  responses: generateTestResponses(), // 45개 질문 응답
  timestamp: new Date().toISOString()
};

// 45개 질문에 대한 테스트 응답 생성
function generateTestResponses() {
  const responses = {};
  for (let i = 1; i <= 45; i++) {
    responses[`question_${i}`] = Math.floor(Math.random() * 5) + 1; // 1-5점 랜덤
  }
  return responses;
}

// 1단계: 진단 신청 테스트
async function testDiagnosisSubmission() {
  console.log('📋 1단계: 진단 신청 테스트');
  
  try {
    const response = await fetch('http://localhost:3000/api/ai-diagnosis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    
    if (response.ok && result.success) {
      console.log('✅ 진단 신청 성공');
      const diagnosisId = result.data?.diagnosisId || result.diagnosisId || `TEST-${Date.now()}`;
      console.log('📊 결과:', {
        diagnosisId: diagnosisId,
        message: result.message,
        totalScore: result.data?.totalScore,
        grade: result.data?.grade
      });
      return diagnosisId;
    } else {
      console.log('❌ 진단 신청 실패');
      console.log('📊 오류:', result);
      return null;
    }
  } catch (error) {
    console.log('❌ 진단 신청 중 오류:', error.message);
    return null;
  }
}

// 2단계: 진단 결과 조회 테스트
async function testDiagnosisResult(diagnosisId) {
  console.log('📋 2단계: 진단 결과 조회 테스트');
  
  if (!diagnosisId) {
    console.log('❌ 진단 ID가 없어 테스트를 건너뜁니다.');
    return false;
  }
  
  const maxAttempts = 5;
  let attempt = 0;
  
  while (attempt < maxAttempts) {
    attempt++;
    console.log(`🔍 시도 ${attempt}/${maxAttempts}: 진단 결과 조회 중...`);
    
    try {
      const response = await fetch(`http://localhost:3000/api/diagnosis-results/${diagnosisId}`);
      const result = await response.json();
      
      if (response.ok && result.success && result.data) {
        console.log('✅ 진단 결과 조회 성공');
        console.log('📊 결과 데이터:', {
          hasData: !!result.data,
          status: result.data.status || 'unknown',
          diagnosisId: result.data.diagnosisId || diagnosisId
        });
        return true;
      } else {
        console.log(`⚠️  시도 ${attempt}: 결과 아직 준비되지 않음`);
        console.log('📊 응답:', {
          success: result.success,
          hasData: !!result.data,
          error: result.error
        });
        
        if (attempt < maxAttempts) {
          console.log('⏳ 30초 대기 후 재시도...');
          await new Promise(resolve => setTimeout(resolve, 30000));
        }
      }
    } catch (error) {
      console.log(`❌ 시도 ${attempt} 중 오류:`, error.message);
      if (attempt < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 10000));
      }
    }
  }
  
  console.log('❌ 모든 시도 실패: 진단 결과를 가져올 수 없습니다.');
  return false;
}

// 3단계: Google Apps Script 직접 테스트
async function testGoogleAppsScript(diagnosisId) {
  console.log('📋 3단계: Google Apps Script 직접 테스트');
  
  const gasUrl = 'https://script.google.com/macros/s/AKfycbxlwpifmXQEmFlR0QBV6NbTemzxTxvWwbaXNGmtH4Ok-a0PDEqmtaKBjQ1VvZxpLnPz/exec';
  
  try {
    // 헬스체크 테스트
    console.log('🔍 헬스체크 테스트...');
    const healthResponse = await fetch(`${gasUrl}?action=healthCheck`);
    const healthData = await healthResponse.json();
    
    console.log('✅ 헬스체크 결과:', {
      status: healthData.status,
      version: healthData.version,
      branding: healthData.branding
    });
    
    if (diagnosisId) {
      // 진단 결과 조회 테스트
      console.log('🔍 진단 결과 직접 조회 테스트...');
      const resultResponse = await fetch(`${gasUrl}?diagnosisId=${diagnosisId}&action=getResult`);
      const resultData = await resultResponse.json();
      
      console.log('📊 직접 조회 결과:', {
        success: resultData.success,
        hasData: resultData.hasData || !!resultData.data,
        diagnosisId: resultData.diagnosisId,
        keys: Object.keys(resultData)
      });
      
      return resultData.success && (resultData.hasData || resultData.data);
    }
    
    return true;
  } catch (error) {
    console.log('❌ Google Apps Script 테스트 실패:', error.message);
    return false;
  }
}

// 4단계: 환경변수 확인
function testEnvironmentVariables() {
  console.log('📋 4단계: 환경변수 확인');
  
  const requiredVars = [
    'GEMINI_API_KEY',
    'NEXT_PUBLIC_GOOGLE_SCRIPT_URL',
    'NEXT_PUBLIC_GOOGLE_SHEETS_ID'
  ];
  
  const results = {};
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    results[varName] = {
      exists: !!value,
      length: value ? value.length : 0,
      preview: value ? `${value.substring(0, 20)}...` : 'NOT SET'
    };
  });
  
  console.log('📊 환경변수 상태:', results);
  
  const allSet = requiredVars.every(varName => !!process.env[varName]);
  console.log(allSet ? '✅ 모든 환경변수 설정됨' : '❌ 일부 환경변수 누락');
  
  return allSet;
}

// 메인 테스트 실행
async function runFullTest() {
  try {
    console.log('🚀 전체 진단 플로우 테스트 시작\n');
    
    // 환경변수 확인
    const envOk = testEnvironmentVariables();
    console.log('');
    
    // Google Apps Script 기본 테스트
    const gasOk = await testGoogleAppsScript();
    console.log('');
    
    // 새 진단 신청
    const diagnosisId = await testDiagnosisSubmission();
    console.log('');
    
    if (diagnosisId) {
      // 진단 결과 조회
      const resultOk = await testDiagnosisResult(diagnosisId);
      console.log('');
      
      // GAS 직접 테스트 (진단 ID 포함)
      const gasResultOk = await testGoogleAppsScript(diagnosisId);
      console.log('');
      
      // 최종 결과
      console.log('🎯 테스트 결과 요약:');
      console.log(`환경변수: ${envOk ? '✅' : '❌'}`);
      console.log(`GAS 연결: ${gasOk ? '✅' : '❌'}`);
      console.log(`진단 신청: ${diagnosisId ? '✅' : '❌'}`);
      console.log(`결과 조회: ${resultOk ? '✅' : '❌'}`);
      console.log(`GAS 직접: ${gasResultOk ? '✅' : '❌'}`);
      
      if (diagnosisId && !resultOk) {
        console.log('\n🔍 문제 분석:');
        console.log('- 진단 신청은 성공했지만 결과 조회가 실패');
        console.log('- Google Apps Script에서 데이터 저장 또는 조회 로직에 문제');
        console.log('- 진단 ID:', diagnosisId);
        console.log('\n💡 해결 방안:');
        console.log('1. Google Apps Script 로그 확인');
        console.log('2. Google Sheets에서 데이터 저장 상태 확인');
        console.log('3. GAS 스크립트의 getResult 액션 로직 점검');
      }
    }
    
    // 테스트 결과 저장
    const testResult = {
      timestamp: new Date().toISOString(),
      testData,
      diagnosisId,
      results: {
        environment: envOk,
        gasConnection: gasOk,
        submission: !!diagnosisId,
        resultRetrieval: false // 진단 결과 조회는 실행되지 않음 (즉시 완료)
      }
    };
    
    fs.writeFileSync('test-diagnosis-result.json', JSON.stringify(testResult, null, 2));
    console.log('\n📄 테스트 결과가 test-diagnosis-result.json에 저장되었습니다.');
    
  } catch (error) {
    console.error('❌ 테스트 실행 중 오류:', error);
  }
}

// 도움말
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
AICAMP v3.0 진단 플로우 테스트 도구

사용법:
  node test-diagnosis-flow.js        # 전체 플로우 테스트
  node test-diagnosis-flow.js --help # 도움말

테스트 항목:
  1. 환경변수 설정 확인
  2. Google Apps Script 연결 테스트
  3. 새 진단 신청 테스트
  4. 진단 결과 조회 테스트
  5. 문제점 분석 및 해결 방안 제시

주의사항:
  - 개발 서버가 실행 중이어야 합니다 (http://localhost:3000)
  - 실제 진단 데이터가 생성됩니다
  - 테스트 결과는 test-diagnosis-result.json에 저장됩니다
`);
  process.exit(0);
}

runFullTest();

