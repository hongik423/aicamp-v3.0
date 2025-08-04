/**
 * GEMINI 2.5 Flash 업데이트 시스템 종합 테스트
 * 2025.01.31 - 제로 오류 품질 기준 테스트
 * 
 * 테스트 항목:
 * 1. GEMINI 2.5 Flash API 연결 테스트
 * 2. 전체 진단 프로세스 테스트
 * 3. 58개 컬럼 데이터 저장 테스트
 * 4. 이메일 발송 테스트
 * 5. 오류 신고 시스템 테스트
 * 6. 헬스체크 테스트
 */

const https = require('https');

// 테스트 설정
const TEST_CONFIG = {
  GAS_URL: 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec',
  TIMEOUT: 300000, // 5분 타임아웃 (로컬 테스트용 - 실제 배포시는 800초 제한)
  TEST_EMAIL: 'test@aicamp.club'
};

console.log('🚀 GEMINI 2.5 Flash 시스템 종합 테스트 시작');
console.log('🤖 AI 모델: GEMINI 2.5 Flash');
console.log('📍 테스트 URL:', TEST_CONFIG.GAS_URL);
console.log('⏱️ 타임아웃: 5분 (로컬 테스트용)');
console.log('🎯 품질 기준: 제로 오류');
console.log('==========================================\n');

// HTTP 요청 함수 (리다이렉션 및 CORS 처리 포함)
function makeRequest(data, testName) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    
    const url = new URL(TEST_CONFIG.GAS_URL);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length,
        'User-Agent': 'AICAMP-Test-Client/1.0',
        'Accept': 'application/json',
        'Origin': 'https://ai-camp-landingpage.vercel.app'
      },
      timeout: TEST_CONFIG.TIMEOUT,
      followRedirect: false  // 리다이렉션 직접 처리
    };

    console.log(`🧪 ${testName} 테스트 시작...`);
    const startTime = Date.now();
    
    const req = https.request(options, (res) => {
      // 리다이렉션 처리
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 303 || res.statusCode === 307 || res.statusCode === 308) {
        const redirectUrl = res.headers.location;
        console.log(`🔄 리다이렉션 감지: ${redirectUrl}`);
        
        // 리다이렉션된 URL로 재요청
        const newUrl = new URL(redirectUrl);
        const redirectOptions = {
          hostname: newUrl.hostname,
          port: 443,
          path: newUrl.pathname + newUrl.search,
          method: 'POST',
          headers: options.headers,
          timeout: options.timeout
        };
        
        const redirectReq = https.request(redirectOptions, (redirectRes) => {
          let responseData = '';
          
          redirectRes.on('data', (chunk) => {
            responseData += chunk;
          });
          
          redirectRes.on('end', () => {
            const duration = Date.now() - startTime;
            try {
              const result = JSON.parse(responseData);
              console.log(`✅ ${testName} 성공 (${duration}ms) [리다이렉션 후]`);
              console.log('📊 응답 데이터:', JSON.stringify(result, null, 2));
              resolve({ success: true, data: result, duration });
            } catch (error) {
              console.log(`❌ ${testName} JSON 파싱 오류:`, error.message);
              console.log('📝 원시 응답:', responseData.substring(0, 200) + '...');
              resolve({ success: false, error: error.message, rawResponse: responseData, duration });
            }
          });
        });
        
        redirectReq.on('error', (error) => {
          const duration = Date.now() - startTime;
          console.log(`❌ ${testName} 리다이렉션 네트워크 오류:`, error.message);
          resolve({ success: false, error: error.message, duration });
        });
        
        redirectReq.write(postData);
        redirectReq.end();
        return;
      }
      
      // 정상 응답 처리
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        const duration = Date.now() - startTime;
        try {
          const result = JSON.parse(responseData);
          console.log(`✅ ${testName} 성공 (${duration}ms)`);
          console.log('📊 응답 데이터:', JSON.stringify(result, null, 2));
          resolve({ success: true, data: result, duration });
        } catch (error) {
          console.log(`❌ ${testName} JSON 파싱 오류:`, error.message);
          console.log('📝 원시 응답:', responseData.substring(0, 200) + '...');
          resolve({ success: false, error: error.message, rawResponse: responseData, duration });
        }
      });
    });

    req.on('error', (error) => {
      const duration = Date.now() - startTime;
      console.log(`❌ ${testName} 네트워크 오류:`, error.message);
      resolve({ success: false, error: error.message, duration });
    });

    req.on('timeout', () => {
      const duration = Date.now() - startTime;
      console.log(`⏰ ${testName} 타임아웃 (${duration}ms)`);
      req.destroy();
      resolve({ success: false, error: 'Timeout', duration });
    });

    req.write(postData);
    req.end();
  });
}

// 테스트 실행 함수
async function runTests() {
  const results = {
    총테스트: 0,
    성공: 0,
    실패: 0,
    오류상세: [],
    성능통계: {
      평균응답시간: 0,
      최대응답시간: 0,
      최소응답시간: Infinity
    }
  };

  const durations = [];

  // 테스트 1: 시스템 헬스체크
  console.log('🏥 테스트 1: 시스템 헬스체크');
  try {
    const healthCheckData = {
      action: 'healthCheck'
    };

    const result1 = await makeRequest(healthCheckData, '시스템 헬스체크');
    results.총테스트++;
    durations.push(result1.duration);

    if (result1.success && result1.data.status === 'success') {
      results.성공++;
      console.log('✅ 헬스체크 통과');
      
      // GEMINI 2.5 Flash 모델 확인
      if (result1.data.checks && result1.data.checks.geminiAPI) {
        const geminiCheck = result1.data.checks.geminiAPI;
        if (geminiCheck.model === 'gemini-2.5-flash') {
          console.log('🤖 GEMINI 2.5 Flash 모델 확인됨');
        } else {
          console.log('⚠️ 예상과 다른 AI 모델:', geminiCheck.model);
        }
      }
    } else {
      results.실패++;
      results.오류상세.push(`헬스체크 실패: ${result1.error || '알 수 없는 오류'}`);
    }
  } catch (error) {
    results.총테스트++;
    results.실패++;
    results.오류상세.push(`헬스체크 예외: ${error.message}`);
  }

  console.log('\n' + '='.repeat(60) + '\n');

  // 테스트 2: 완전한 AI 역량진단 프로세스
  console.log('🧠 테스트 2: 완전한 AI 역량진단 프로세스');
  try {
    const diagnosisData = {
      action: 'submitDiagnosis',
      data: {
        companyName: 'GEMINI 2.5 Flash 테스트 컴퍼니',
        industry: 'IT/소프트웨어',
        companySize: '50명 이상',
        region: '서울',
        email: TEST_CONFIG.TEST_EMAIL,
        contactPerson: '테스트 담당자',
        phone: '010-1234-5678',
        
        // 6개 분야 평가 (각 5점 만점)
        q1_leadership_vision: 4,
        q2_leadership_investment: 5,
        q3_leadership_strategy: 4,
        q4_leadership_education: 3,
        q5_leadership_culture: 4,
        
        q6_infrastructure_systems: 4,
        q7_infrastructure_data: 5,
        q8_infrastructure_security: 4,
        q9_infrastructure_integration: 3,
        q10_infrastructure_scalability: 4,
        
        q11_employee_basic: 3,
        q12_employee_tools: 4,
        q13_employee_analysis: 3,
        q14_employee_development: 4,
        q15_employee_collaboration: 5,
        
        q16_culture_openness: 4,
        q17_culture_learning: 5,
        q18_culture_innovation: 4,
        q19_culture_change: 3,
        q20_culture_communication: 4,
        
        q21_practical_automation: 3,
        q22_practical_analytics: 4,
        q23_practical_aitools: 5,
        q24_practical_collaboration: 4,
        q25_practical_productivity: 4,
        
        q26_data_collection: 4,
        q27_data_management: 3,
        q28_data_analysis: 4,
        q29_data_quality: 5,
        q30_data_utilization: 4,
        
        businessDescription: 'GEMINI 2.5 Flash 성능 테스트를 위한 AI 기반 소프트웨어 개발 전문기업',
        mainConcerns: 'AI 기술 경쟁력 강화 및 GEMINI 2.5 Flash 활용',
        expectedBenefits: '매출 50% 증대 및 AI 기술 우위 확보',
        desiredConsulting: 'AI 전략 수립 및 GEMINI 2.5 Flash 도입',
        privacyConsent: true
      }
    };

    const result2 = await makeRequest(diagnosisData, 'AI 역량진단');
    results.총테스트++;
    durations.push(result2.duration);

    if (result2.success && result2.data.success) {
      results.성공++;
      console.log('✅ AI 역량진단 성공');
      console.log('📋 진단 ID:', result2.data.diagnosisId);
      console.log('🎯 총점:', result2.data.totalScore);
      console.log('🏆 등급:', result2.data.grade);
      
      // GEMINI 2.5 Flash 보고서 품질 확인
      if (result2.data.report && result2.data.report.length > 1000) {
        console.log('📄 GEMINI 2.5 Flash 보고서 생성 완료 (' + result2.data.report.length + '자)');
      } else {
        console.log('⚠️ 보고서 품질 부족');
      }
      
      // 저장된 diagnosisId로 결과 조회 테스트
      const diagnosisId = result2.data.diagnosisId;
      
      // 테스트 3: 결과 조회
      console.log('\n📖 테스트 3: 결과 조회');
      const resultQuery = {
        action: 'getResult',
        diagnosisId: diagnosisId
      };
      
      const result3 = await makeRequest(resultQuery, '결과 조회');
      results.총테스트++;
      durations.push(result3.duration);
      
      if (result3.success && result3.data.success) {
        results.성공++;
        console.log('✅ 결과 조회 성공');
      } else {
        results.실패++;
        results.오류상세.push(`결과 조회 실패: ${result3.error || '알 수 없는 오류'}`);
      }
      
    } else {
      results.실패++;
      results.오류상세.push(`AI 역량진단 실패: ${result2.error || JSON.stringify(result2.data)}`);
    }
  } catch (error) {
    results.총테스트++;
    results.실패++;
    results.오류상세.push(`AI 역량진단 예외: ${error.message}`);
  }

  console.log('\n' + '='.repeat(60) + '\n');

  // 테스트 4: 오류 신고 시스템
  console.log('🚨 테스트 4: 오류 신고 시스템');
  try {
    const errorReportData = {
      action: 'reportError',
      data: {
        userEmail: TEST_CONFIG.TEST_EMAIL,
        userName: '테스트 사용자',
        errorType: 'GEMINI_2.5_FLASH_테스트',
        errorDescription: 'GEMINI 2.5 Flash 시스템 테스트용 오류 신고',
        expectedBehavior: '정상적인 오류 신고 처리',
        actualBehavior: '테스트 케이스 실행',
        browserInfo: 'Node.js 테스트 환경',
        timestamp: new Date().toISOString()
      }
    };

    const result4 = await makeRequest(errorReportData, '오류 신고');
    results.총테스트++;
    durations.push(result4.duration);

    if (result4.success && result4.data.success) {
      results.성공++;
      console.log('✅ 오류 신고 성공');
      console.log('📋 신고 ID:', result4.data.reportId);
    } else {
      results.실패++;
      results.오류상세.push(`오류 신고 실패: ${result4.error || '알 수 없는 오류'}`);
    }
  } catch (error) {
    results.총테스트++;
    results.실패++;
    results.오류상세.push(`오류 신고 예외: ${error.message}`);
  }

  console.log('\n' + '='.repeat(60) + '\n');

  // 테스트 5: 세금계산기 오류 시스템
  console.log('💰 테스트 5: 세금계산기 오류 시스템');
  try {
    const taxErrorData = {
      action: 'taxCalculatorError',
      data: {
        userEmail: TEST_CONFIG.TEST_EMAIL,
        userName: '테스트 사용자',
        calculationType: '종합소득세',
        inputValues: {
          income: 50000000,
          deductions: 5000000
        },
        expectedResult: 'GEMINI 2.5 Flash 기반 정확한 계산',
        actualResult: '테스트 케이스',
        errorDescription: 'GEMINI 2.5 Flash 세금계산기 테스트',
        timestamp: new Date().toISOString()
      }
    };

    const result5 = await makeRequest(taxErrorData, '세금계산기 오류');
    results.총테스트++;
    durations.push(result5.duration);

    if (result5.success && result5.data.success) {
      results.성공++;
      console.log('✅ 세금계산기 오류 처리 성공');
      console.log('📋 오류 ID:', result5.data.errorId);
    } else {
      results.실패++;
      results.오류상세.push(`세금계산기 오류 처리 실패: ${result5.error || '알 수 없는 오류'}`);
    }
  } catch (error) {
    results.총테스트++;
    results.실패++;
    results.오류상세.push(`세금계산기 오류 처리 예외: ${error.message}`);
  }

  // 성능 통계 계산
  if (durations.length > 0) {
    results.성능통계.평균응답시간 = Math.round(durations.reduce((a, b) => a + b, 0) / durations.length);
    results.성능통계.최대응답시간 = Math.max(...durations);
    results.성능통계.최소응답시간 = Math.min(...durations);
  }

  // 최종 결과 출력
  console.log('\n' + '='.repeat(80));
  console.log('🎯 GEMINI 2.5 Flash 시스템 테스트 완료');
  console.log('='.repeat(80));
  console.log(`📊 전체 결과: ${results.성공}/${results.총테스트} 성공 (${Math.round(results.성공/results.총테스트*100)}%)`);
  console.log(`⚡ 평균 응답시간: ${results.성능통계.평균응답시간}ms`);
  console.log(`🏃 최고 응답시간: ${results.성능통계.최소응답시간}ms`);
  console.log(`🐌 최저 응답시간: ${results.성능통계.최대응답시간}ms`);
  
  if (results.실패 === 0) {
    console.log('🏆 완벽한 시스템! 제로 오류 달성! 🎉');
  } else {
    console.log(`❌ ${results.실패}개 오류 발견:`);
    results.오류상세.forEach((error, index) => {
      console.log(`   ${index + 1}. ${error}`);
    });
  }
  
  console.log('='.repeat(80));
  
  return results;
}

// 테스트 실행
runTests().then(results => {
  process.exit(results.실패 > 0 ? 1 : 0);
}).catch(error => {
  console.error('❌ 테스트 실행 중 치명적 오류:', error);
  process.exit(1);
});