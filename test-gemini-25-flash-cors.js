/**
 * GEMINI 2.5 Flash CORS 테스트
 * Google Apps Script의 올바른 URL 찾기 및 CORS 처리 테스트
 */

const https = require('https');

// 가능한 Google Apps Script URL들 테스트
const POSSIBLE_URLS = [
  'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec',
  'https://script.google.com/macros/s/AKfycbw5IkQ7h5b6Xs84F94A4VUaG8jl2pyJMgCLI7YeNXqLzY0W-EQj7kNXJZU1uZArX1fzLQ/exec'
];

console.log('🔍 Google Apps Script CORS 및 URL 테스트 시작\n');

// GET 요청으로 헬스체크 시도
function testGetRequest(url) {
  return new Promise((resolve) => {
    console.log(`🧪 GET 요청 테스트: ${url}`);
    
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': 'AICAMP-Test-Client/1.0',
        'Accept': 'application/json'
      },
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      console.log(`📊 상태 코드: ${res.statusCode}`);
      console.log(`📋 헤더:`, res.headers);
      
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log(`📝 응답 내용 (첫 200자):`, data.substring(0, 200));
        console.log('---\n');
        resolve({ url, statusCode: res.statusCode, data });
      });
    });

    req.on('error', (error) => {
      console.log(`❌ 오류: ${error.message}\n`);
      resolve({ url, error: error.message });
    });

    req.end();
  });
}

// OPTIONS 요청으로 CORS 프리플라이트 테스트
function testOptionsRequest(url) {
  return new Promise((resolve) => {
    console.log(`🧪 OPTIONS 요청 테스트 (CORS 프리플라이트): ${url}`);
    
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname + urlObj.search,
      method: 'OPTIONS',
      headers: {
        'Origin': 'https://ai-camp-landingpage.vercel.app',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      },
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      console.log(`📊 상태 코드: ${res.statusCode}`);
      console.log(`🔒 CORS 헤더:`);
      console.log(`   - Access-Control-Allow-Origin: ${res.headers['access-control-allow-origin']}`);
      console.log(`   - Access-Control-Allow-Methods: ${res.headers['access-control-allow-methods']}`);
      console.log(`   - Access-Control-Allow-Headers: ${res.headers['access-control-allow-headers']}`);
      console.log('---\n');
      resolve({ url, statusCode: res.statusCode, corsHeaders: res.headers });
    });

    req.on('error', (error) => {
      console.log(`❌ 오류: ${error.message}\n`);
      resolve({ url, error: error.message });
    });

    req.end();
  });
}

// POST 요청으로 실제 API 테스트
function testPostRequest(url) {
  return new Promise((resolve) => {
    console.log(`🧪 POST 요청 테스트: ${url}`);
    
    const testData = JSON.stringify({ action: 'healthCheck' });
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': testData.length,
        'Origin': 'https://ai-camp-landingpage.vercel.app',
        'User-Agent': 'AICAMP-Test-Client/1.0',
        'Accept': 'application/json'
      },
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      console.log(`📊 상태 코드: ${res.statusCode}`);
      
      if (res.statusCode === 301 || res.statusCode === 302) {
        console.log(`🔄 리다이렉션 위치: ${res.headers.location}`);
      }
      
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          console.log(`✅ JSON 응답:`, JSON.stringify(json, null, 2));
        } catch (e) {
          console.log(`📝 응답 내용 (첫 200자):`, data.substring(0, 200));
        }
        console.log('---\n');
        resolve({ url, statusCode: res.statusCode, data });
      });
    });

    req.on('error', (error) => {
      console.log(`❌ 오류: ${error.message}\n`);
      resolve({ url, error: error.message });
    });

    req.write(testData);
    req.end();
  });
}

// 모든 테스트 실행
async function runAllTests() {
  console.log('🚀 모든 가능한 URL에 대해 테스트 시작\n');
  
  for (const url of POSSIBLE_URLS) {
    console.log('='.repeat(80));
    console.log(`📍 테스트 URL: ${url}`);
    console.log('='.repeat(80) + '\n');
    
    // GET 테스트
    await testGetRequest(url);
    
    // OPTIONS 테스트 (CORS)
    await testOptionsRequest(url);
    
    // POST 테스트
    await testPostRequest(url);
    
    console.log('\n');
  }
  
  console.log('🏁 모든 테스트 완료');
  console.log('\n💡 팁:');
  console.log('1. 302 리다이렉션이 발생하면 Location 헤더의 URL을 사용하세요');
  console.log('2. CORS 헤더가 없으면 Google Apps Script에서 doOptions() 함수를 구현하세요');
  console.log('3. GET 요청이 작동하면 doGet() 함수가 구현되어 있습니다');
  console.log('4. POST 요청이 작동하면 doPost() 함수가 구현되어 있습니다');
}

// 테스트 실행
runAllTests();