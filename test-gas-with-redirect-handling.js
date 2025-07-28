/**
 * 🔧 Google Apps Script 리디렉션 처리 테스트
 * 
 * 발견된 문제:
 * - GAS는 script.google.com → script.googleusercontent.com 으로 302 리디렉션함
 * - 이는 정상적인 동작이며, 리디렉션을 자동으로 따라가야 함
 */

const https = require('https');

// GAS URL
const GAS_URL = 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec';

/**
 * 리디렉션을 자동으로 처리하는 HTTP 요청 함수
 */
async function httpRequestWithRedirect(url, options = {}, data = null, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const makeRequest = (requestUrl, redirectCount = 0) => {
      if (redirectCount >= maxRedirects) {
        return reject(new Error('최대 리디렉션 수 초과'));
      }

      const parsedUrl = new URL(requestUrl);
      const requestOptions = {
        hostname: parsedUrl.hostname,
        port: 443,
        path: parsedUrl.pathname + parsedUrl.search,
        method: options.method || 'GET',
        headers: options.headers || {},
        timeout: options.timeout || 30000
      };

      const req = https.request(requestOptions, (res) => {
        let responseData = '';
        res.on('data', chunk => responseData += chunk);
        
        res.on('end', () => {
          // 리디렉션 처리
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            console.log(`🔄 리디렉션 ${redirectCount + 1}: ${res.statusCode} → ${res.headers.location}`);
            return makeRequest(res.headers.location, redirectCount + 1);
          }
          
          // 최종 응답
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: responseData,
            redirectCount: redirectCount
          });
        });
      });

      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('요청 타임아웃'));
      });

      if (data) {
        req.write(data);
      }
      req.end();
    };

    makeRequest(url);
  });
}

/**
 * GET 요청 테스트 (리디렉션 자동 처리)
 */
async function testGetWithRedirect() {
  console.log('🔍 [1단계] GET 요청 테스트 (리디렉션 자동 처리)...\n');
  console.log(`대상 URL: ${GAS_URL}\n`);

  try {
    const result = await httpRequestWithRedirect(GAS_URL, {
      method: 'GET',
      headers: {
        'User-Agent': 'AICAMP-Redirect-Test/1.0',
        'Accept': 'application/json, text/html, */*'
      },
      timeout: 30000
    });

    console.log(`✅ GET 요청 성공!`);
    console.log(`   최종 상태: ${result.statusCode}`);
    console.log(`   리디렉션 횟수: ${result.redirectCount}`);
    console.log(`   응답 크기: ${result.data.length} bytes`);
    console.log(`   응답 내용 (처음 300자):`);
    console.log(result.data.substring(0, 300));

    return result;

  } catch (error) {
    console.log(`❌ GET 요청 실패: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * POST 요청 테스트 (리디렉션 자동 처리)
 */
async function testPostWithRedirect() {
  console.log('\n📡 [2단계] POST 요청 테스트 (리디렉션 자동 처리)...\n');

  const testData = {
    폼타입: 'AI_무료진단_테스트',
    제출일시: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    회사명: 'REDIRECT_TEST_COMPANY',
    업종: 'IT서비스',
    담당자명: '테스트담당자',
    이메일: 'test@aicamp.co.kr',
    테스트여부: true
  };

  const postData = JSON.stringify(testData);
  console.log(`전송 데이터 크기: ${postData.length} bytes\n`);

  try {
    const result = await httpRequestWithRedirect(GAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'AICAMP-Redirect-Test/1.0',
        'Accept': 'application/json',
        'Origin': 'https://aicamp-v3-0.vercel.app'
      },
      timeout: 30000
    }, postData);

    console.log(`✅ POST 요청 성공!`);
    console.log(`   최종 상태: ${result.statusCode}`);
    console.log(`   리디렉션 횟수: ${result.redirectCount}`);
    console.log(`   응답 크기: ${result.data.length} bytes`);
    console.log(`   응답 내용:`);
    console.log(result.data);

    // JSON 파싱 시도
    try {
      const jsonResponse = JSON.parse(result.data);
      console.log(`   JSON 파싱 성공:`, jsonResponse);
      return { success: true, data: jsonResponse, ...result };
    } catch (parseError) {
      console.log(`   ⚠️ JSON 파싱 실패, 텍스트 응답으로 처리`);
      return { success: true, data: result.data, ...result };
    }

  } catch (error) {
    console.log(`❌ POST 요청 실패: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * 실제 진단 데이터로 완전한 테스트
 */
async function testFullDiagnosisData() {
  console.log('\n🎯 [3단계] 실제 진단 데이터로 완전한 테스트...\n');

  const fullTestData = {
    폼타입: 'AI_완벽진단보고서_안전모드',
    제출일시: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    결과ID: `AI_DIAG_${Date.now()}_TEST`,
    회사명: 'FULL_TEST_COMPANY',
    담당자명: '완전테스트담당자',
    이메일: 'fulltest@aicamp.co.kr',
    연락처: '010-9999-8888',
    업종: 'IT서비스',
    직원수: '10-50명',
    종합점수: 85,
    종합등급: 'A',
    신뢰도: 95,
    카테고리1점수: 4.2,
    카테고리2점수: 4.5,
    카테고리3점수: 4.0,
    카테고리4점수: 4.3,
    카테고리5점수: 4.4,
    SWOT분석완료: true,
    추천사항개수: 3,
    처리시간: '12.5초',
    테스트여부: true
  };

  const postData = JSON.stringify(fullTestData);
  console.log(`완전한 진단 데이터 크기: ${postData.length} bytes\n`);

  try {
    const result = await httpRequestWithRedirect(GAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'AICAMP-Full-Test/1.0',
        'Accept': 'application/json',
        'Origin': 'https://aicamp-v3-0.vercel.app'
      },
      timeout: 45000  // 더 긴 타임아웃
    }, postData);

    console.log(`✅ 완전한 진단 데이터 테스트 성공!`);
    console.log(`   최종 상태: ${result.statusCode}`);
    console.log(`   리디렉션 횟수: ${result.redirectCount}`);
    console.log(`   응답 크기: ${result.data.length} bytes`);

    try {
      const jsonResponse = JSON.parse(result.data);
      console.log(`   구조화된 응답:`, JSON.stringify(jsonResponse, null, 2));
      return { success: true, data: jsonResponse, ...result };
    } catch (parseError) {
      console.log(`   응답 내용:`, result.data);
      return { success: true, data: result.data, ...result };
    }

  } catch (error) {
    console.log(`❌ 완전한 진단 데이터 테스트 실패: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * 결과 분석 및 최종 보고서
 */
function generateFinalReport(getResult, postResult, fullResult) {
  console.log('\n' + '='.repeat(70));
  console.log('🎯 Google Apps Script 리디렉션 처리 테스트 결과');
  console.log('='.repeat(70));
  console.log(`📅 테스트 완료 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`);
  console.log(`🌐 대상 URL: ${GAS_URL}\n`);

  const tests = [
    { name: 'GET 요청', result: getResult },
    { name: 'POST 요청', result: postResult },
    { name: '완전한 진단 데이터', result: fullResult }
  ];

  let totalSuccess = 0;
  let totalTests = tests.length;

  console.log('📊 테스트 결과 요약:');
  tests.forEach((test, index) => {
    const success = test.result.success !== false && test.result.statusCode === 200;
    if (success) totalSuccess++;
    
    console.log(`   ${index + 1}. ${test.name}: ${success ? '✅ 성공' : '❌ 실패'}`);
    if (test.result.redirectCount !== undefined) {
      console.log(`      └─ 리디렉션: ${test.result.redirectCount}회`);
    }
    if (test.result.statusCode) {
      console.log(`      └─ 상태코드: ${test.result.statusCode}`);
    }
    if (test.result.error) {
      console.log(`      └─ 오류: ${test.result.error}`);
    }
  });

  console.log(`\n🏆 최종 평가:`);
  console.log(`   성공한 테스트: ${totalSuccess}/${totalTests}개`);
  console.log(`   성공률: ${Math.round((totalSuccess / totalTests) * 100)}%`);

  // 진단 및 권장사항
  if (totalSuccess === totalTests) {
    console.log(`   시스템 상태: ✅ 완벽 - Google Apps Script가 정상 작동함`);
    console.log(`\n💡 결론:`);
    console.log(`   - HTTP 302 리디렉션은 정상적인 GAS 동작임`);
    console.log(`   - 실제 시스템에서는 리디렉션이 자동으로 처리됨`);
    console.log(`   - AICAMP 무료진단 시스템이 정상 작동 중`);
  } else if (totalSuccess > 0) {
    console.log(`   시스템 상태: ⚠️ 부분적 성공 - 일부 기능에 문제있음`);
    console.log(`\n🔧 권장사항:`);
    console.log(`   - 실패한 테스트의 오류 메시지를 확인하여 구체적인 문제 해결`);
    console.log(`   - Google Apps Script 코드에서 해당 기능 점검`);
  } else {
    console.log(`   시스템 상태: ❌ 심각한 문제 - 전체 시스템 점검 필요`);
    console.log(`\n🚨 긴급 조치:`);
    console.log(`   - Google Apps Script 배포 상태 확인`);
    console.log(`   - 네트워크 연결 및 방화벽 설정 점검`);
    console.log(`   - 대체 스크립트 URL 확인`);
  }

  console.log('\n🏁 테스트 완료');

  return {
    totalTests,
    successfulTests: totalSuccess,
    successRate: Math.round((totalSuccess / totalTests) * 100),
    status: totalSuccess === totalTests ? 'PERFECT' : totalSuccess > 0 ? 'PARTIAL' : 'FAILED'
  };
}

/**
 * 메인 테스트 실행
 */
async function runGasRedirectTest() {
  console.log('🔧 Google Apps Script 리디렉션 처리 테스트 시작');
  console.log('목표: HTTP 302 리디렉션 문제 해결 확인');
  console.log('='.repeat(70));

  try {
    // 각 단계별 테스트 실행
    const getResult = await testGetWithRedirect();
    const postResult = await testPostWithRedirect();
    const fullResult = await testFullDiagnosisData();

    // 최종 결과 분석
    const report = generateFinalReport(getResult, postResult, fullResult);
    
    return report;

  } catch (error) {
    console.error('\n❌ 테스트 실행 중 치명적 오류:', error.message);
    return { status: 'CRITICAL_ERROR', error: error.message };
  }
}

// 테스트 실행
runGasRedirectTest()
  .then(report => {
    process.exit(report.status === 'PERFECT' ? 0 : 1);
  })
  .catch(error => {
    console.error('테스트 실행 실패:', error);
    process.exit(2);
  }); 