/**
 * 진단결과조회 워크플로우 테스트 스크립트
 * 수정된 기능들을 단계별로 검증
 */

const BASE_URL = 'http://localhost:3000';

// 테스트용 진단ID들
const TEST_DIAGNOSIS_IDS = [
  'DIAG_45Q_AI_1756620870176_nq3npoal4', // 원본 에러 발생 ID
  'DIAG_45Q_AI_1234567890_test123',      // 테스트용 ID
  'DIAG_45Q_AI_9999999999_invalid',      // 존재하지 않는 ID
  'INVALID_ID_FORMAT',                    // 잘못된 형식
];

/**
 * 1단계: 진단ID 접근 권한 검증 API 테스트
 */
async function testDiagnosisAuth(diagnosisId) {
  console.log(`\n🔐 1단계: 진단ID 접근 권한 검증 테스트 - ${diagnosisId}`);
  
  try {
    const response = await fetch(`${BASE_URL}/api/diagnosis-auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        diagnosisId: diagnosisId,
        accessType: 'user'
      })
    });

    const result = await response.json();
    
    console.log(`📊 응답 상태: ${response.status}`);
    console.log(`📋 응답 내용:`, result);
    
    if (response.ok && result.success) {
      console.log(`✅ 접근 권한 검증 성공`);
      return true;
    } else {
      console.log(`❌ 접근 권한 검증 실패: ${result.error}`);
      return false;
    }
  } catch (error) {
    console.error(`💥 접근 권한 검증 오류:`, error.message);
    return false;
  }
}

/**
 * 2단계: 진단 결과 데이터 조회 API 테스트
 */
async function testDiagnosisResults(diagnosisId) {
  console.log(`\n🔍 2단계: 진단 결과 데이터 조회 테스트 - ${diagnosisId}`);
  
  try {
    const response = await fetch(`${BASE_URL}/api/diagnosis-results/${encodeURIComponent(diagnosisId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await response.json();
    
    console.log(`📊 응답 상태: ${response.status}`);
    console.log(`📋 응답 내용:`, JSON.stringify(result, null, 2).substring(0, 500) + '...');
    
    if (response.ok && result.success) {
      console.log(`✅ 진단 결과 조회 성공`);
      console.log(`📈 데이터 요약:`, {
        diagnosisId: result.diagnosisId,
        hasData: !!result.data,
        source: result.data?.source || 'unknown'
      });
      return true;
    } else {
      console.log(`❌ 진단 결과 조회 실패: ${result.error}`);
      return false;
    }
  } catch (error) {
    console.error(`💥 진단 결과 조회 오류:`, error.message);
    return false;
  }
}

/**
 * 3단계: 35페이지 보고서 생성 API 테스트
 */
async function testDiagnosisReport(diagnosisId) {
  console.log(`\n📄 3단계: 35페이지 보고서 생성 테스트 - ${diagnosisId}`);
  
  try {
    const response = await fetch(`${BASE_URL}/api/diagnosis-reports/${encodeURIComponent(diagnosisId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await response.json();
    
    console.log(`📊 응답 상태: ${response.status}`);
    
    if (response.ok && result.success) {
      console.log(`✅ 35페이지 보고서 생성 성공`);
      console.log(`📄 보고서 정보:`, {
        hasHtmlReport: !!result.htmlReport,
        reportLength: result.htmlReport ? result.htmlReport.length : 0,
        metadata: result.metadata || {}
      });
      return true;
    } else {
      console.log(`❌ 35페이지 보고서 생성 실패: ${result.error}`);
      return false;
    }
  } catch (error) {
    console.error(`💥 35페이지 보고서 생성 오류:`, error.message);
    return false;
  }
}

/**
 * 전체 워크플로우 테스트
 */
async function testCompleteWorkflow(diagnosisId) {
  console.log(`\n🚀 전체 워크플로우 테스트 시작: ${diagnosisId}`);
  console.log(`${'='.repeat(60)}`);
  
  const results = {
    auth: false,
    results: false,
    report: false
  };
  
  // 1단계: 접근 권한 검증
  results.auth = await testDiagnosisAuth(diagnosisId);
  
  // 2단계: 진단 결과 조회 (1단계 성공 시에만)
  if (results.auth) {
    results.results = await testDiagnosisResults(diagnosisId);
  }
  
  // 3단계: 보고서 생성 (2단계 성공 시에만)
  if (results.results) {
    results.report = await testDiagnosisReport(diagnosisId);
  }
  
  // 결과 요약
  console.log(`\n📊 워크플로우 테스트 결과 - ${diagnosisId}`);
  console.log(`🔐 접근 권한: ${results.auth ? '✅ 성공' : '❌ 실패'}`);
  console.log(`🔍 데이터 조회: ${results.results ? '✅ 성공' : '❌ 실패'}`);
  console.log(`📄 보고서 생성: ${results.report ? '✅ 성공' : '❌ 실패'}`);
  
  const success = results.auth && results.results && results.report;
  console.log(`🎯 전체 결과: ${success ? '✅ 완전 성공' : '❌ 부분 실패'}`);
  
  return results;
}

/**
 * 에러 처리 시나리오 테스트
 */
async function testErrorScenarios() {
  console.log(`\n🚨 에러 처리 시나리오 테스트`);
  console.log(`${'='.repeat(60)}`);
  
  const errorTests = [
    {
      name: '빈 진단ID',
      diagnosisId: '',
      expectedError: '진단 ID가 필요합니다'
    },
    {
      name: '짧은 진단ID',
      diagnosisId: 'SHORT',
      expectedError: '유효하지 않은 진단ID'
    },
    {
      name: '잘못된 형식',
      diagnosisId: 'INVALID_FORMAT_123',
      expectedError: '유효하지 않은 진단ID'
    },
    {
      name: '존재하지 않는 ID',
      diagnosisId: 'DIAG_45Q_AI_9999999999_notfound',
      expectedError: '해당 진단ID의 결과를 찾을 수 없습니다'
    }
  ];
  
  for (const test of errorTests) {
    console.log(`\n🧪 ${test.name} 테스트: ${test.diagnosisId}`);
    
    try {
      const response = await fetch(`${BASE_URL}/api/diagnosis-results/${encodeURIComponent(test.diagnosisId)}`, {
        method: 'GET'
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        console.log(`✅ 예상된 에러 발생: ${result.error}`);
        console.log(`🎯 에러 메시지 일치: ${result.error.includes(test.expectedError.split(' ')[0]) ? '✅' : '❌'}`);
      } else {
        console.log(`❌ 예상과 다름: 성공 응답 받음`);
      }
    } catch (error) {
      console.log(`✅ 네트워크 에러 처리: ${error.message}`);
    }
  }
}

/**
 * 메인 테스트 실행 함수
 */
async function runAllTests() {
  console.log(`🧪 진단결과조회 기능 테스트 시작`);
  console.log(`⏰ 시작 시간: ${new Date().toLocaleString()}`);
  console.log(`${'='.repeat(80)}`);
  
  // 서버 연결 확인
  try {
    const healthCheck = await fetch(`${BASE_URL}/api/health`);
    console.log(`🏥 서버 상태: ${healthCheck.ok ? '✅ 정상' : '❌ 오류'}`);
  } catch (error) {
    console.log(`🏥 서버 상태: ❌ 연결 불가 - ${error.message}`);
    console.log(`⚠️  서버가 실행 중인지 확인해주세요: npm run dev`);
    return;
  }
  
  // 각 테스트 ID별로 전체 워크플로우 테스트
  const allResults = [];
  
  for (const diagnosisId of TEST_DIAGNOSIS_IDS) {
    const result = await testCompleteWorkflow(diagnosisId);
    allResults.push({ diagnosisId, ...result });
    
    // 테스트 간 간격
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // 에러 처리 시나리오 테스트
  await testErrorScenarios();
  
  // 최종 결과 요약
  console.log(`\n📊 전체 테스트 결과 요약`);
  console.log(`${'='.repeat(80)}`);
  
  allResults.forEach((result, index) => {
    const success = result.auth && result.results && result.report;
    console.log(`${index + 1}. ${result.diagnosisId}`);
    console.log(`   🔐 권한: ${result.auth ? '✅' : '❌'} | 🔍 조회: ${result.results ? '✅' : '❌'} | 📄 보고서: ${result.report ? '✅' : '❌'} | 🎯 전체: ${success ? '✅' : '❌'}`);
  });
  
  const totalSuccess = allResults.filter(r => r.auth && r.results && r.report).length;
  console.log(`\n🎯 성공률: ${totalSuccess}/${allResults.length} (${Math.round(totalSuccess/allResults.length*100)}%)`);
  console.log(`⏰ 완료 시간: ${new Date().toLocaleString()}`);
}

// 테스트 실행
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runAllTests, testCompleteWorkflow };
} else {
  // 브라우저에서 실행 시
  runAllTests().catch(console.error);
}
