#!/usr/bin/env node

/**
 * AICAMP v3.0 API 테스트 스크립트
 * 주요 API 엔드포인트의 상태를 확인합니다.
 */

const https = require('https');
const http = require('http');

// 테스트할 엔드포인트 목록
const endpoints = [
  {
    name: '헬스 체크',
    url: 'http://localhost:3000/api/health/check',
    method: 'GET'
  },
  {
    name: 'AI 진단 API',
    url: 'http://localhost:3000/api/ai-diagnosis',
    method: 'POST',
    data: {
      companyName: '테스트 회사',
      industry: 'IT',
      employeeCount: '10-50',
      currentAIUsage: 'basic'
    }
  },
  {
    name: '시스템 상태',
    url: 'http://localhost:3000/api/system-health',
    method: 'GET'
  }
];

// HTTP 요청 함수
function makeRequest(endpoint) {
  return new Promise((resolve) => {
    const url = new URL(endpoint.url);
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname,
      method: endpoint.method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'AICAMP-Test-Client/1.0'
      }
    };

    const client = url.protocol === 'https:' ? https : http;
    
    const req = client.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: data,
          success: res.statusCode >= 200 && res.statusCode < 300
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        status: 0,
        error: err.message,
        success: false
      });
    });

    // POST 데이터 전송
    if (endpoint.data) {
      req.write(JSON.stringify(endpoint.data));
    }

    req.end();
  });
}

// 테스트 실행
async function runTests() {
  console.log('🧪 AICAMP v3.0 API 테스트 시작');
  console.log('='.repeat(50));
  
  for (const endpoint of endpoints) {
    console.log(`\n🔍 테스트 중: ${endpoint.name}`);
    console.log(`📍 URL: ${endpoint.url}`);
    console.log(`🔧 Method: ${endpoint.method}`);
    
    try {
      const result = await makeRequest(endpoint);
      
      if (result.success) {
        console.log(`✅ 성공 (${result.status})`);
        
        // 응답 데이터 미리보기
        if (result.data) {
          try {
            const jsonData = JSON.parse(result.data);
            console.log('📄 응답:', JSON.stringify(jsonData, null, 2).substring(0, 200) + '...');
          } catch {
            console.log('📄 응답:', result.data.substring(0, 100) + '...');
          }
        }
      } else {
        console.log(`❌ 실패 (${result.status || 'Connection Error'})`);
        if (result.error) {
          console.log(`🔍 오류: ${result.error}`);
        }
      }
    } catch (error) {
      console.log(`❌ 예외 발생: ${error.message}`);
    }
    
    // 요청 간 딜레이
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n🏁 테스트 완료');
}

// 도움말
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
AICAMP v3.0 API 테스트 도구

사용법:
  node test-api.js        # 모든 API 테스트 실행
  node test-api.js --help # 도움말 표시

테스트 대상:
  - 헬스 체크 API
  - AI 진단 API  
  - 시스템 상태 API

주의사항:
  - 개발 서버가 실행 중이어야 합니다 (http://localhost:3000)
  - 환경 변수가 올바르게 설정되어야 합니다
`);
  process.exit(0);
}

// 메인 실행
runTests().catch(console.error);
