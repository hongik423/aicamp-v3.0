/**
 * 🔧 Google Apps Script 연결 문제 상세 디버깅 테스트
 * 
 * HTTP 302 오류 원인 분석:
 * 1. 웹앱 배포 설정 문제
 * 2. 권한 설정 문제  
 * 3. CORS 설정 문제
 * 4. 스크립트 ID 변경
 */

const https = require('https');
const http = require('http');

// 테스트 대상 GAS URL
const GAS_URL = 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec';

/**
 * 1. 기본 연결 테스트 (상세 헤더 분석)
 */
async function testBasicConnection() {
  console.log('🔍 [1단계] 기본 연결 테스트 시작...\n');
  console.log(`대상 URL: ${GAS_URL}\n`);

  return new Promise((resolve) => {
    const options = {
      hostname: 'script.google.com',
      port: 443,
      path: '/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec',
      method: 'GET',
      headers: {
        'User-Agent': 'AICAMP-Debug-Client/1.0',
        'Accept': 'application/json, text/html, */*',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8',
        'Cache-Control': 'no-cache'
      },
      timeout: 15000
    };

    const req = https.request(options, (res) => {
      console.log(`응답 상태: ${res.statusCode} ${res.statusMessage}`);
      console.log('응답 헤더:');
      Object.entries(res.headers).forEach(([key, value]) => {
        console.log(`   ${key}: ${value}`);
      });

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`\n응답 크기: ${data.length} bytes`);
        console.log('응답 내용 (처음 500자):');
        console.log(data.substring(0, 500));
        
        // 302 리디렉션 분석
        if (res.statusCode === 302) {
          const location = res.headers.location;
          console.log(`\n🔄 리디렉션 감지:`);
          console.log(`   리디렉션 URL: ${location}`);
          
          if (location && location.includes('accounts.google.com')) {
            console.log('   → 구글 로그인 페이지로 리디렉션됨 (인증 필요)');
          } else if (location && location.includes('script.google.com')) {
            console.log('   → 다른 스크립트 URL로 리디렉션됨');
          }
        }

        resolve({
          success: res.statusCode === 200,
          statusCode: res.statusCode,
          headers: res.headers,
          data: data,
          isRedirect: res.statusCode === 302,
          redirectUrl: res.headers.location
        });
      });
    });

    req.on('error', (error) => {
      console.log(`❌ 연결 오류: ${error.message}`);
      resolve({ success: false, error: error.message });
    });

    req.on('timeout', () => {
      console.log('❌ 연결 타임아웃');
      req.destroy();
      resolve({ success: false, error: 'Timeout' });
    });

    req.end();
  });
}

/**
 * 2. POST 요청 테스트 (다양한 헤더 조합)
 */
async function testPostRequest() {
  console.log('\n📡 [2단계] POST 요청 테스트...\n');

  const testData = {
    폼타입: 'AI_무료진단_테스트',
    제출일시: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    회사명: 'DEBUG_TEST_COMPANY',
    테스트여부: true
  };

  const postData = JSON.stringify(testData);
  console.log(`전송 데이터: ${postData}\n`);

  return new Promise((resolve) => {
    const options = {
      hostname: 'script.google.com',
      port: 443,
      path: '/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'AICAMP-Debug-Client/1.0',
        'Accept': 'application/json',
        'Origin': 'https://aicamp-v3-0.vercel.app',
        'Referer': 'https://aicamp-v3-0.vercel.app/',
        'Cache-Control': 'no-cache'
      },
      timeout: 20000
    };

    const req = https.request(options, (res) => {
      console.log(`POST 응답 상태: ${res.statusCode} ${res.statusMessage}`);
      console.log('POST 응답 헤더:');
      Object.entries(res.headers).forEach(([key, value]) => {
        console.log(`   ${key}: ${value}`);
      });

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`\nPOST 응답 내용:`);
        console.log(data);

        resolve({
          success: res.statusCode === 200,
          statusCode: res.statusCode,
          data: data,
          isRedirect: res.statusCode === 302,
          redirectUrl: res.headers.location
        });
      });
    });

    req.on('error', (error) => {
      console.log(`❌ POST 요청 오류: ${error.message}`);
      resolve({ success: false, error: error.message });
    });

    req.on('timeout', () => {
      console.log('❌ POST 요청 타임아웃');
      req.destroy();
      resolve({ success: false, error: 'POST timeout' });
    });

    req.write(postData);
    req.end();
  });
}

/**
 * 3. 리디렉션 따라가기 테스트
 */
async function testFollowRedirect(redirectUrl) {
  if (!redirectUrl) return null;

  console.log('\n🔄 [3단계] 리디렉션 따라가기...\n');
  console.log(`리디렉션 URL: ${redirectUrl}\n`);

  return new Promise((resolve) => {
    // URL 파싱
    const url = new URL(redirectUrl);
    const isHttps = url.protocol === 'https:';
    const client = isHttps ? https : http;
    const port = isHttps ? 443 : 80;

    const options = {
      hostname: url.hostname,
      port: port,
      path: url.pathname + url.search,
      method: 'GET',
      headers: {
        'User-Agent': 'AICAMP-Debug-Client/1.0',
        'Accept': 'text/html,application/json,*/*'
      },
      timeout: 15000
    };

    const req = client.request(options, (res) => {
      console.log(`리디렉션 응답: ${res.statusCode} ${res.statusMessage}`);
      
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`리디렉션 응답 내용 (처음 300자):`);
        console.log(data.substring(0, 300));

        resolve({
          success: res.statusCode === 200,
          statusCode: res.statusCode,
          data: data
        });
      });
    });

    req.on('error', (error) => {
      console.log(`❌ 리디렉션 오류: ${error.message}`);
      resolve({ success: false, error: error.message });
    });

    req.on('timeout', () => {
      console.log('❌ 리디렉션 타임아웃');
      req.destroy();
      resolve({ success: false, error: 'Redirect timeout' });
    });

    req.end();
  });
}

/**
 * 4. 진단 결과 및 권장사항
 */
function analyzeResults(basicResult, postResult, redirectResult) {
  console.log('\n' + '='.repeat(60));
  console.log('🎯 Google Apps Script 연결 문제 진단 결과');
  console.log('='.repeat(60));

  console.log(`📅 테스트 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`);
  console.log(`🌐 대상 URL: ${GAS_URL}\n`);

  // 문제 진단
  const issues = [];
  const recommendations = [];

  // 기본 연결 분석
  if (basicResult.isRedirect) {
    issues.push('HTTP 302 리디렉션 발생');
    
    if (basicResult.redirectUrl && basicResult.redirectUrl.includes('accounts.google.com')) {
      issues.push('구글 계정 인증 필요');
      recommendations.push('Google Apps Script 웹앱 배포 설정을 "모든 사용자(익명 사용자 포함)"로 변경');
      recommendations.push('새로운 배포 버전 생성 필요');
    } else if (basicResult.redirectUrl && basicResult.redirectUrl.includes('script.google.com')) {
      issues.push('스크립트 URL이 변경됨');
      recommendations.push('새로운 웹앱 URL로 환경변수 업데이트 필요');
    }
  }

  if (!basicResult.success && !basicResult.isRedirect) {
    issues.push('기본 연결 실패');
    recommendations.push('Google Apps Script 서비스 상태 확인');
    recommendations.push('네트워크 연결 상태 확인');
  }

  // POST 요청 분석
  if (postResult && postResult.isRedirect) {
    issues.push('POST 요청도 리디렉션됨');
  }

  // 결과 출력
  console.log('🔍 발견된 문제:');
  if (issues.length === 0) {
    console.log('   ✅ 문제 없음 - 정상 연결');
  } else {
    issues.forEach((issue, index) => {
      console.log(`   ${index + 1}. ${issue}`);
    });
  }

  console.log('\n💡 권장사항:');
  if (recommendations.length === 0) {
    console.log('   🎉 추가 조치 불필요');
  } else {
    recommendations.forEach((rec, index) => {
      console.log(`   ${index + 1}. ${rec}`);
    });
  }

  // 추가 기술적 권장사항
  console.log('\n🔧 기술적 해결방안:');
  console.log('   1. Google Apps Script 에디터에서 다음 단계 수행:');
  console.log('      - 배포 → 웹 앱');
  console.log('      - 실행 주체: 나');
  console.log('      - 액세스 권한: 모든 사용자(익명 사용자 포함)');
  console.log('      - 새 배포 생성');
  console.log('   2. 새로 생성된 웹앱 URL을 env.ts에 업데이트');
  console.log('   3. doPost 함수가 올바르게 구현되어 있는지 확인');

  return {
    hasIssues: issues.length > 0,
    issues: issues,
    recommendations: recommendations
  };
}

/**
 * 메인 디버깅 실행
 */
async function runGasDebugTest() {
  console.log('🔧 Google Apps Script 연결 문제 상세 디버깅 시작');
  console.log('='.repeat(60));

  try {
    // 1단계: 기본 연결 테스트
    const basicResult = await testBasicConnection();

    // 2단계: POST 요청 테스트
    const postResult = await testPostRequest();

    // 3단계: 리디렉션 따라가기 (있는 경우)
    let redirectResult = null;
    if (basicResult.isRedirect && basicResult.redirectUrl) {
      redirectResult = await testFollowRedirect(basicResult.redirectUrl);
    }

    // 4단계: 결과 분석
    const analysis = analyzeResults(basicResult, postResult, redirectResult);

    console.log('\n🏁 디버깅 완료');
    
    return analysis;

  } catch (error) {
    console.error('\n❌ 디버깅 중 오류:', error.message);
    return { hasIssues: true, issues: ['디버깅 실행 오류'], recommendations: ['스크립트 재실행 필요'] };
  }
}

// 테스트 실행
runGasDebugTest()
  .then(result => {
    process.exit(result.hasIssues ? 1 : 0);
  })
  .catch(error => {
    console.error('디버깅 실패:', error);
    process.exit(2);
  }); 