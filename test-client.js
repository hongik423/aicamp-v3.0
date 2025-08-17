#!/usr/bin/env node

/**
 * 🧪 AICAMP v3.0 테스트 클라이언트
 * 
 * 목적: 테스트 서버와 프로덕션 API를 간편하게 테스트
 * 
 * 실행: node test-client.js [command] [options]
 */

const http = require('http');
const https = require('https');
const { performance } = require('perf_hooks');

// 설정
const CONFIG = {
  TEST_SERVER: 'http://localhost:3001',
  PROD_SERVER: 'https://aicamp.club',
  TIMEOUT: 30000
};

// 색상 출력 함수
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function colorLog(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// HTTP 요청 함수
async function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const startTime = performance.now();
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    
    const req = client.request(url, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'AICAMP-Test-Client/1.0',
        ...options.headers
      },
      timeout: CONFIG.TIMEOUT
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const endTime = performance.now();
        const duration = Math.round(endTime - startTime);
        
        try {
          const jsonData = JSON.parse(data);
          resolve({
            success: true,
            status: res.statusCode,
            headers: res.headers,
            data: jsonData,
            duration,
            raw: data
          });
        } catch (error) {
          resolve({
            success: true,
            status: res.statusCode,
            headers: res.headers,
            data: data,
            duration,
            raw: data
          });
        }
      });
    });
    
    req.on('error', (error) => {
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      
      reject({
        success: false,
        error: error.message,
        duration
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject({
        success: false,
        error: 'Request timeout',
        duration: CONFIG.TIMEOUT
      });
    });
    
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    
    req.end();
  });
}

// 테스트 명령어들
const commands = {
  // 헬스 체크
  async health(server = 'test') {
    const baseUrl = server === 'prod' ? CONFIG.PROD_SERVER : CONFIG.TEST_SERVER;
    
    colorLog('cyan', `\n🏥 헬스 체크: ${baseUrl}`);
    console.log('─'.repeat(50));
    
    try {
      const response = await makeRequest(`${baseUrl}/api/health/check`);
      
      if (response.success && response.status === 200) {
        colorLog('green', '✅ 서버 상태: 정상');
        console.log(`📊 응답 시간: ${response.duration}ms`);
        console.log(`📋 서버 정보:`, JSON.stringify(response.data, null, 2));
      } else {
        colorLog('red', `❌ 서버 상태: 비정상 (${response.status})`);
      }
    } catch (error) {
      colorLog('red', `❌ 연결 실패: ${error.error}`);
    }
  },

  // 시스템 상태 체크
  async system(server = 'test') {
    const baseUrl = server === 'prod' ? CONFIG.PROD_SERVER : CONFIG.TEST_SERVER;
    
    colorLog('cyan', `\n🔧 시스템 상태: ${baseUrl}`);
    console.log('─'.repeat(50));
    
    try {
      const response = await makeRequest(`${baseUrl}/api/system-health`);
      
      if (response.success && response.status === 200) {
        colorLog('green', '✅ 시스템 상태: 정상');
        console.log(`📊 응답 시간: ${response.duration}ms`);
        
        const data = response.data;
        console.log(`🖥️  서버: ${data.server}`);
        console.log(`💾 데이터베이스: ${data.database}`);
        console.log(`🔌 외부 API:`, JSON.stringify(data.external_apis, null, 2));
        console.log(`⚡ 성능:`, JSON.stringify(data.performance, null, 2));
      } else {
        colorLog('red', `❌ 시스템 상태: 비정상 (${response.status})`);
      }
    } catch (error) {
      colorLog('red', `❌ 연결 실패: ${error.error}`);
    }
  },

  // 테스트 데이터 생성
  async generate(server = 'test') {
    const baseUrl = server === 'prod' ? CONFIG.PROD_SERVER : CONFIG.TEST_SERVER;
    
    colorLog('cyan', `\n🎲 테스트 데이터 생성: ${baseUrl}`);
    console.log('─'.repeat(50));
    
    try {
      const response = await makeRequest(`${baseUrl}/api/test/generate-data`);
      
      if (response.success && response.status === 200) {
        colorLog('green', '✅ 테스트 데이터 생성 완료');
        console.log(`📊 응답 시간: ${response.duration}ms`);
        console.log(`📋 생성된 데이터:`, JSON.stringify(response.data, null, 2));
      } else {
        colorLog('red', `❌ 데이터 생성 실패 (${response.status})`);
      }
    } catch (error) {
      colorLog('red', `❌ 연결 실패: ${error.error}`);
    }
  },

  // 진단 API 테스트
  async diagnosis(server = 'test') {
    const baseUrl = server === 'prod' ? CONFIG.PROD_SERVER : CONFIG.TEST_SERVER;
    
    colorLog('cyan', `\n🧠 AI 진단 테스트: ${baseUrl}`);
    console.log('─'.repeat(50));
    
    // 먼저 테스트 데이터 생성
    try {
      const dataResponse = await makeRequest(`${baseUrl}/api/test/generate-data`);
      if (!dataResponse.success) {
        throw new Error('테스트 데이터 생성 실패');
      }
      
      const testData = dataResponse.data;
      colorLog('blue', '📝 테스트 데이터 준비 완료');
      
      // 진단 API 호출
      const diagnosisResponse = await makeRequest(`${baseUrl}/api/ai-diagnosis`, {
        method: 'POST',
        body: testData
      });
      
      if (diagnosisResponse.success && diagnosisResponse.status === 200) {
        colorLog('green', '✅ AI 진단 완료');
        console.log(`📊 응답 시간: ${diagnosisResponse.duration}ms`);
        
        const result = diagnosisResponse.data;
        console.log(`🎯 총점: ${result.scoreAnalysis?.totalScore || 'N/A'}`);
        console.log(`📧 이메일 상태: ${result.processingInfo?.emailSending || 'N/A'}`);
        console.log(`🔧 처리 단계:`, result.processingInfo?.steps?.length || 0, '단계');
        console.log(`✨ 기능:`, result.features?.join(', ') || 'N/A');
      } else {
        colorLog('red', `❌ AI 진단 실패 (${diagnosisResponse.status})`);
        console.log('응답:', diagnosisResponse.data);
      }
      
    } catch (error) {
      colorLog('red', `❌ 진단 테스트 실패: ${error.error || error.message}`);
    }
  },

  // 전체 테스트 실행
  async all(server = 'test') {
    colorLog('magenta', '\n🚀 전체 테스트 실행');
    console.log('='.repeat(60));
    
    const tests = ['health', 'system', 'generate', 'diagnosis'];
    const results = [];
    
    for (const test of tests) {
      try {
        console.log(`\n▶️  ${test.toUpperCase()} 테스트 실행 중...`);
        await commands[test](server);
        results.push({ test, status: 'pass' });
      } catch (error) {
        colorLog('red', `❌ ${test} 테스트 실패: ${error.message}`);
        results.push({ test, status: 'fail', error: error.message });
      }
    }
    
    // 결과 요약
    console.log('\n' + '='.repeat(60));
    colorLog('magenta', '📋 테스트 결과 요약');
    console.log('='.repeat(60));
    
    results.forEach(result => {
      const status = result.status === 'pass' ? '✅' : '❌';
      console.log(`${status} ${result.test.toUpperCase()}: ${result.status}`);
      if (result.error) {
        console.log(`   오류: ${result.error}`);
      }
    });
    
    const passCount = results.filter(r => r.status === 'pass').length;
    const totalCount = results.length;
    const successRate = Math.round((passCount / totalCount) * 100);
    
    console.log(`\n🎯 성공률: ${passCount}/${totalCount} (${successRate}%)`);
  },

  // 도움말
  help() {
    console.log('\n📖 AICAMP 테스트 클라이언트 사용법');
    console.log('='.repeat(50));
    console.log('');
    console.log('사용법: node test-client.js [command] [server]');
    console.log('');
    console.log('명령어:');
    console.log('  health     - 헬스 체크');
    console.log('  system     - 시스템 상태 확인');
    console.log('  generate   - 테스트 데이터 생성');
    console.log('  diagnosis  - AI 진단 테스트');
    console.log('  all        - 전체 테스트 실행');
    console.log('  help       - 도움말 표시');
    console.log('');
    console.log('서버 옵션:');
    console.log('  test       - 테스트 서버 (기본값)');
    console.log('  prod       - 프로덕션 서버');
    console.log('');
    console.log('예시:');
    console.log('  node test-client.js health test');
    console.log('  node test-client.js diagnosis prod');
    console.log('  node test-client.js all');
  }
};

// 메인 실행 함수
async function main() {
  const [,, command = 'help', server = 'test'] = process.argv;
  
  if (!commands[command]) {
    colorLog('red', `❌ 알 수 없는 명령어: ${command}`);
    commands.help();
    process.exit(1);
  }
  
  try {
    await commands[command](server);
  } catch (error) {
    colorLog('red', `❌ 실행 오류: ${error.message}`);
    process.exit(1);
  }
}

// 스크립트 직접 실행 시
if (require.main === module) {
  main().catch(error => {
    colorLog('red', `💥 치명적 오류: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { commands, makeRequest };
