#!/usr/bin/env node

/**
 * 🔍 Google Apps Script 데이터 저장/조회 테스트
 * Google Sheets에 실제 데이터가 저장되는지 확인
 */

require('dotenv').config({ path: '.env.local' });

const GAS_URL = 'https://script.google.com/macros/s/AKfycbxlwpifmXQEmFlR0QBV6NbTemzxTxvWwbaXNGmtH4Ok-a0PDEqmtaKBjQ1VvZxpLnPz/exec';

console.log('🔍 Google Apps Script 데이터 저장/조회 테스트');
console.log('='.repeat(50));

// 1. 테스트 진단 데이터 생성
async function createTestDiagnosis() {
  console.log('📋 1단계: 테스트 진단 데이터 생성');
  
  const testData = {
    type: 'ai_diagnosis',
    action: 'saveDiagnosis',
    data: {
      companyName: `테스트회사_${Date.now()}`,
      industry: 'IT/소프트웨어',
      employeeCount: '10-50명',
      contactName: '테스트사용자',
      contactEmail: 'test@aicamp.club',
      contactPhone: '010-1234-5678',
      currentAIUsage: 'basic',
      businessGoals: '업무 자동화 테스트',
      challenges: '테스트 데이터입니다',
      expectedOutcomes: 'AI 도입 효과 테스트',
      timestamp: new Date().toISOString(),
      version: 'V15.0-ULTIMATE-INTEGRATED-APPLE-STYLE',
      source: 'test_script'
    }
  };
  
  try {
    console.log('📤 Google Apps Script로 데이터 전송 중...');
    
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    console.log('📡 응답 상태:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ 응답 수신 성공');
      console.log('📊 응답 데이터:', {
        success: result.success,
        diagnosisId: result.diagnosisId,
        message: result.message?.substring(0, 100) + '...',
        keys: Object.keys(result)
      });
      
      return result.diagnosisId;
    } else {
      const errorText = await response.text();
      console.log('❌ 응답 실패:', response.status, errorText);
      return null;
    }
  } catch (error) {
    console.log('❌ 요청 실패:', error.message);
    return null;
  }
}

// 2. 진단 결과 조회 테스트
async function testGetResult(diagnosisId) {
  console.log('📋 2단계: 진단 결과 조회 테스트');
  
  if (!diagnosisId) {
    console.log('❌ 진단 ID가 없어 테스트를 건너뜁니다.');
    return false;
  }
  
  try {
    const url = `${GAS_URL}?diagnosisId=${diagnosisId}&action=getResult`;
    console.log('🔍 조회 URL:', url);
    
    const response = await fetch(url, { method: 'GET' });
    console.log('📡 응답 상태:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ 조회 응답 수신');
      console.log('📊 조회 결과:', {
        success: result.success,
        hasData: result.hasData,
        diagnosisId: result.diagnosisId,
        dataExists: !!result.data,
        keys: Object.keys(result)
      });
      
      if (result.success && result.hasData && result.data) {
        console.log('🎉 데이터 조회 성공!');
        return true;
      } else {
        console.log('⚠️ 데이터가 없거나 조회 실패');
        return false;
      }
    } else {
      const errorText = await response.text();
      console.log('❌ 조회 실패:', response.status, errorText);
      return false;
    }
  } catch (error) {
    console.log('❌ 조회 중 오류:', error.message);
    return false;
  }
}

// 3. 기존 진단 ID로 테스트
async function testExistingDiagnosis() {
  console.log('📋 3단계: 기존 진단 ID로 테스트');
  
  const existingId = 'DIAG_1755332087748_cngr377x7';
  console.log('🔍 기존 진단 ID 테스트:', existingId);
  
  return await testGetResult(existingId);
}

// 4. Google Sheets 직접 확인 (시뮬레이션)
async function checkSheetsStatus() {
  console.log('📋 4단계: Google Sheets 상태 확인');
  
  const sheetsUrl = 'https://docs.google.com/spreadsheets/d/1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ/edit';
  
  console.log('📊 Google Sheets 정보:');
  console.log('- ID:', '1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ');
  console.log('- URL:', sheetsUrl);
  console.log('- 예상 시트:', ['AI_진단결과', 'AI_진단신청', '진행상황_모니터링']);
  
  console.log('💡 수동 확인 필요:');
  console.log('1. Google Sheets에 접속하여 데이터 확인');
  console.log('2. AI_진단결과 시트에 데이터가 저장되는지 확인');
  console.log('3. 진단 ID 컬럼과 데이터 매칭 확인');
}

// 5. GAS 스크립트 로그 확인 가이드
function showGASDebuggingGuide() {
  console.log('📋 5단계: GAS 디버깅 가이드');
  
  console.log('🔧 Google Apps Script 디버깅 방법:');
  console.log('1. https://script.google.com 접속');
  console.log('2. 해당 스크립트 프로젝트 열기');
  console.log('3. 실행 → 실행 기록에서 로그 확인');
  console.log('4. doGet 함수에 action=getResult 처리 로직 추가 필요');
  
  console.log('\n🛠️ 수정 필요 사항:');
  console.log('- doGet 함수에서 diagnosisId와 action 파라미터 처리');
  console.log('- getDiagnosisResult 함수 추가');
  console.log('- Google Sheets에서 데이터 조회 로직 구현');
  
  console.log('\n📝 수정 코드는 gas-fix-getresult.js 파일 참조');
}

// 메인 실행
async function runTest() {
  try {
    // 새 진단 생성 테스트
    const newDiagnosisId = await createTestDiagnosis();
    console.log('');
    
    // 새 진단 결과 조회 (바로 조회하면 없을 가능성 높음)
    if (newDiagnosisId) {
      console.log('⏳ 5초 대기 후 새 진단 결과 조회...');
      await new Promise(resolve => setTimeout(resolve, 5000));
      await testGetResult(newDiagnosisId);
      console.log('');
    }
    
    // 기존 진단 ID 테스트
    const existingResult = await testExistingDiagnosis();
    console.log('');
    
    // Google Sheets 상태 확인
    checkSheetsStatus();
    console.log('');
    
    // 디버깅 가이드
    showGASDebuggingGuide();
    
    // 결과 요약
    console.log('\n🎯 테스트 결과 요약:');
    console.log(`새 진단 생성: ${newDiagnosisId ? '✅' : '❌'}`);
    console.log(`기존 진단 조회: ${existingResult ? '✅' : '❌'}`);
    
    if (!existingResult) {
      console.log('\n🚨 주요 문제점:');
      console.log('1. Google Apps Script의 doGet 함수에서 action=getResult 처리 없음');
      console.log('2. 진단 결과 조회 로직이 구현되지 않음');
      console.log('3. Google Sheets에서 데이터를 찾는 로직 필요');
      
      console.log('\n🔧 해결 방안:');
      console.log('1. gas-fix-getresult.js의 코드를 GAS에 적용');
      console.log('2. Google Sheets의 데이터 구조 확인');
      console.log('3. 진단 ID 매칭 로직 개선');
    }
    
  } catch (error) {
    console.error('❌ 테스트 실행 중 오류:', error);
  }
}

// 실행
runTest();
