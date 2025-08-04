/**
 * GEMINI 2.5 Flash 최종 검증 테스트
 * 리다이렉션 처리 및 제로 오류 달성
 * 2025.01.31
 */

const https = require('https');
const http = require('http');

// 테스트 설정
const TEST_CONFIG = {
  GAS_URL: 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec',
  TIMEOUT: 30000, // 30초 타임아웃
  TEST_EMAIL: 'test@aicamp.club'
};

console.log('🚀 GEMINI 2.5 Flash 최종 검증 테스트');
console.log('🤖 AI 모델: GEMINI 2.5 Flash');
console.log('📍 테스트 URL:', TEST_CONFIG.GAS_URL);
console.log('🎯 목표: 제로 오류 달성');
console.log('==========================================\n');

// 리다이렉션을 자동으로 따라가는 요청 함수
function makeRequestWithRedirect(url, postData, testName, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) {
      resolve({ success: false, error: '너무 많은 리다이렉션', redirectCount });
      return;
    }

    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const httpModule = isHttps ? https : http;
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length,
        'User-Agent': 'AICAMP-GEMINI-2.5-Flash-Test/1.0',
        'Accept': 'application/json',
        'Origin': 'https://ai-camp-landingpage.vercel.app'
      },
      timeout: TEST_CONFIG.TIMEOUT
    };

    if (redirectCount === 0) {
      console.log(`🧪 ${testName} 테스트 시작...`);
    }
    const startTime = Date.now();
    
    const req = httpModule.request(options, (res) => {
      // 리다이렉션 처리
      if ([301, 302, 303, 307, 308].includes(res.statusCode)) {
        const redirectUrl = res.headers.location;
        if (redirectCount === 0) {
          console.log(`🔄 리다이렉션 감지: ${res.statusCode}`);
          console.log(`📍 새 위치: ${redirectUrl}`);
        }
        
        // 리다이렉션 URL로 재귀 호출
        makeRequestWithRedirect(redirectUrl, postData, testName, redirectCount + 1)
          .then(resolve)
          .catch(reject);
        return;
      }
      
      // 정상 응답 처리
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        const duration = Date.now() - startTime;
        
        // 상태 코드 확인
        if (res.statusCode !== 200) {
          console.log(`⚠️ ${testName} 비정상 상태 코드: ${res.statusCode}`);
          resolve({ 
            success: false, 
            error: `상태 코드 ${res.statusCode}`, 
            statusCode: res.statusCode,
            rawResponse: responseData.substring(0, 500),
            duration 
          });
          return;
        }
        
        // JSON 파싱 시도
        try {
          const result = JSON.parse(responseData);
          const redirectInfo = redirectCount > 0 ? ` [${redirectCount}번 리다이렉션]` : '';
          console.log(`✅ ${testName} 성공 (${duration}ms)${redirectInfo}`);
          console.log('📊 응답 데이터:', JSON.stringify(result, null, 2));
          resolve({ success: true, data: result, duration, redirectCount });
        } catch (error) {
          console.log(`❌ ${testName} JSON 파싱 오류:`, error.message);
          console.log('📝 원시 응답 (첫 500자):', responseData.substring(0, 500));
          resolve({ 
            success: false, 
            error: 'JSON 파싱 실패', 
            parseError: error.message,
            rawResponse: responseData.substring(0, 500),
            duration 
          });
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

// 간단한 헬스체크용 GET 요청
function makeGetRequest(url) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': 'AICAMP-GEMINI-2.5-Flash-Test/1.0',
        'Accept': 'application/json'
      },
      timeout: 10000
    };

    console.log('🏥 GET 헬스체크 시작...');
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 302) {
          console.log('✅ Google Apps Script가 활성 상태입니다 (302 리다이렉션)');
          resolve({ success: true, statusCode: res.statusCode });
        } else {
          console.log(`📊 GET 응답 상태: ${res.statusCode}`);
          resolve({ success: false, statusCode: res.statusCode });
        }
      });
    });

    req.on('error', (error) => {
      console.log(`❌ GET 요청 오류: ${error.message}`);
      resolve({ success: false, error: error.message });
    });

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

  // 테스트 0: GET 헬스체크
  console.log('='.repeat(60));
  await makeGetRequest(TEST_CONFIG.GAS_URL);
  console.log('='.repeat(60) + '\n');

  // 테스트 1: 시스템 헬스체크
  console.log('🏥 테스트 1: 시스템 헬스체크');
  try {
    const healthCheckData = JSON.stringify({
      action: 'healthCheck'
    });

    const result1 = await makeRequestWithRedirect(TEST_CONFIG.GAS_URL, healthCheckData, '시스템 헬스체크');
    results.총테스트++;
    
    if (result1.duration) durations.push(result1.duration);

    if (result1.success && result1.data && result1.data.status === 'success') {
      results.성공++;
      console.log('✅ 헬스체크 통과');
      
      // GEMINI 2.5 Flash 모델 확인
      if (result1.data.checks && result1.data.checks.geminiAPI) {
        const geminiCheck = result1.data.checks.geminiAPI;
        if (geminiCheck.model === 'gemini-2.5-flash') {
          console.log('🤖 ✅ GEMINI 2.5 Flash 모델 확인됨');
        } else if (geminiCheck.model) {
          console.log('⚠️ 예상과 다른 AI 모델:', geminiCheck.model);
        }
      }
    } else {
      results.실패++;
      const errorMsg = result1.error || result1.parseError || '알 수 없는 오류';
      results.오류상세.push(`헬스체크 실패: ${errorMsg}`);
      if (result1.rawResponse) {
        console.log('📝 응답 내용:', result1.rawResponse);
      }
    }
  } catch (error) {
    results.총테스트++;
    results.실패++;
    results.오류상세.push(`헬스체크 예외: ${error.message}`);
  }

  console.log('\n' + '='.repeat(60) + '\n');

  // 테스트 2: 간단한 AI 역량진단
  console.log('🧠 테스트 2: 간단한 AI 역량진단');
  try {
    const simpleDiagnosisData = JSON.stringify({
      action: 'submitDiagnosis',
      data: {
        companyName: 'GEMINI 2.5 Flash 테스트',
        industry: 'IT/소프트웨어',
        companySize: '10명 미만',
        region: '서울',
        email: TEST_CONFIG.TEST_EMAIL,
        contactPerson: '테스트',
        phone: '010-0000-0000',
        
        // 최소한의 평가 데이터 (각 1점)
        q1_leadership_vision: 1,
        q2_leadership_investment: 1,
        q3_leadership_strategy: 1,
        q4_leadership_education: 1,
        q5_leadership_culture: 1,
        
        q6_infrastructure_systems: 1,
        q7_infrastructure_data: 1,
        q8_infrastructure_security: 1,
        q9_infrastructure_integration: 1,
        q10_infrastructure_scalability: 1,
        
        q11_employee_basic: 1,
        q12_employee_tools: 1,
        q13_employee_analysis: 1,
        q14_employee_development: 1,
        q15_employee_collaboration: 1,
        
        q16_culture_openness: 1,
        q17_culture_learning: 1,
        q18_culture_innovation: 1,
        q19_culture_change: 1,
        q20_culture_communication: 1,
        
        q21_practical_automation: 1,
        q22_practical_analytics: 1,
        q23_practical_aitools: 1,
        q24_practical_collaboration: 1,
        q25_practical_productivity: 1,
        
        q26_data_collection: 1,
        q27_data_management: 1,
        q28_data_analysis: 1,
        q29_data_quality: 1,
        q30_data_utilization: 1,
        
        businessDescription: 'GEMINI 2.5 Flash 테스트',
        mainConcerns: '테스트',
        expectedBenefits: '테스트',
        desiredConsulting: '테스트',
        privacyConsent: true
      }
    });

    const result2 = await makeRequestWithRedirect(TEST_CONFIG.GAS_URL, simpleDiagnosisData, 'AI 역량진단');
    results.총테스트++;
    
    if (result2.duration) durations.push(result2.duration);

    if (result2.success && result2.data && result2.data.success) {
      results.성공++;
      console.log('✅ AI 역량진단 성공');
      console.log('📋 진단 ID:', result2.data.diagnosisId);
      console.log('🎯 총점:', result2.data.totalScore);
      console.log('🏆 등급:', result2.data.grade);
      
      // GEMINI 2.5 Flash 보고서 확인
      if (result2.data.report && result2.data.report.length > 1000) {
        console.log('📄 ✅ GEMINI 2.5 Flash 보고서 생성 완료 (' + result2.data.report.length + '자)');
      } else {
        console.log('⚠️ 보고서가 너무 짧음');
      }
    } else {
      results.실패++;
      const errorMsg = result2.error || result2.parseError || JSON.stringify(result2.data) || '알 수 없는 오류';
      results.오류상세.push(`AI 역량진단 실패: ${errorMsg}`);
      if (result2.rawResponse) {
        console.log('📝 응답 내용:', result2.rawResponse);
      }
    }
  } catch (error) {
    results.총테스트++;
    results.실패++;
    results.오류상세.push(`AI 역량진단 예외: ${error.message}`);
  }

  // 성능 통계 계산
  if (durations.length > 0) {
    results.성능통계.평균응답시간 = Math.round(durations.reduce((a, b) => a + b, 0) / durations.length);
    results.성능통계.최대응답시간 = Math.max(...durations);
    results.성능통계.최소응답시간 = Math.min(...durations);
  }

  // 최종 결과 출력
  console.log('\n' + '='.repeat(80));
  console.log('🎯 GEMINI 2.5 Flash 최종 검증 결과');
  console.log('='.repeat(80));
  console.log(`📊 전체 결과: ${results.성공}/${results.총테스트} 성공 (${Math.round(results.성공/results.총테스트*100)}%)`);
  
  if (durations.length > 0) {
    console.log(`⚡ 평균 응답시간: ${results.성능통계.평균응답시간}ms`);
    console.log(`🏃 최소 응답시간: ${results.성능통계.최소응답시간}ms`);
    console.log(`🐌 최대 응답시간: ${results.성능통계.최대응답시간}ms`);
  }
  
  if (results.실패 === 0) {
    console.log('\n🏆 🎉 완벽한 시스템! 제로 오류 달성! 🎉 🏆');
    console.log('✅ GEMINI 2.5 Flash 시스템이 완벽하게 작동합니다!');
  } else {
    console.log(`\n❌ ${results.실패}개 오류 발견:`);
    results.오류상세.forEach((error, index) => {
      console.log(`   ${index + 1}. ${error}`);
    });
    console.log('\n💡 해결 방안:');
    console.log('1. Google Apps Script가 올바르게 배포되었는지 확인');
    console.log('2. doPost() 함수가 정상적으로 구현되었는지 확인');
    console.log('3. GEMINI API 키가 올바르게 설정되었는지 확인');
  }
  
  console.log('='.repeat(80));
  
  return results;
}

// 테스트 실행
console.log('⏳ 테스트를 시작합니다...\n');

runTests().then(results => {
  process.exit(results.실패 > 0 ? 1 : 0);
}).catch(error => {
  console.error('❌ 테스트 실행 중 치명적 오류:', error);
  process.exit(1);
});