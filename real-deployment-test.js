// ================================================================================
// 🌐 실제 배포 사이트 오류 테스트
// ================================================================================

const https = require('https');
const http = require('http');

const DEPLOYMENT_URL = 'https://aicampv30-m4p5n9fun-hongik423-3087s-projects.vercel.app';

/**
 * 실제 HTTP 요청 함수
 */
function makeHttpRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'User-Agent': 'AICAMP-Test-Bot/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        ...options.headers
      }
    };

    const client = urlObj.protocol === 'https:' ? https : http;
    
    const req = client.request(requestOptions, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
          ok: res.statusCode >= 200 && res.statusCode < 300
        });
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

/**
 * 실제 페이지 로딩 테스트
 */
async function testRealPageLoading() {
  console.log('🌐 실제 페이지 로딩 테스트 시작...');
  
  const pages = [
    '/',
    '/ai-diagnosis',
    '/consultation', 
    '/tax-calculator',
    '/success-cases',
    '/services',
    '/about',
    '/support',
    '/privacy',
    '/terms'
  ];
  
  const results = [];
  
  for (const page of pages) {
    try {
      console.log(`📄 ${page} 테스트 중...`);
      
      const startTime = Date.now();
      const response = await makeHttpRequest(`${DEPLOYMENT_URL}${page}`);
      const loadTime = Date.now() - startTime;
      
      const result = {
        page: page,
        status: response.ok ? 'PASS' : 'FAIL',
        statusCode: response.statusCode,
        loadTime: loadTime,
        contentLength: response.body.length,
        errors: []
      };
      
      // 상태 코드 검증
      if (response.statusCode >= 400) {
        result.errors.push(`HTTP ${response.statusCode} 오류`);
      }
      
      // 로딩 시간 검증
      if (loadTime > 10000) {
        result.errors.push(`로딩 시간 초과: ${loadTime}ms`);
      }
      
      // HTML 콘텐츠 검증
      if (!response.body.includes('<!DOCTYPE html>') && !response.body.includes('<html')) {
        result.errors.push('유효하지 않은 HTML 응답');
      }
      
      // 기본 메타 태그 확인
      if (!response.body.includes('<title>') && response.statusCode === 200) {
        result.errors.push('title 태그 누락');
      }
      
      results.push(result);
      console.log(`${result.status === 'PASS' ? '✅' : '❌'} ${page}: ${result.status} (${loadTime}ms, ${result.contentLength} bytes)`);
      
    } catch (error) {
      results.push({
        page: page,
        status: 'ERROR',
        error: error.message,
        loadTime: 0,
        errors: [error.message]
      });
      console.error(`❌ ${page} 오류:`, error.message);
    }
  }
  
  return results;
}

/**
 * 실제 API 엔드포인트 테스트
 */
async function testRealAPIEndpoints() {
  console.log('🔌 실제 API 엔드포인트 테스트 시작...');
  
  const endpoints = [
    { path: '/api/system-health', method: 'GET' },
    { path: '/api/test-env', method: 'GET' },
    { path: '/api/diagnosis-progress', method: 'GET' }
  ];
  
  const results = [];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`🔌 ${endpoint.path} 테스트 중...`);
      
      const startTime = Date.now();
      const response = await makeHttpRequest(`${DEPLOYMENT_URL}${endpoint.path}`, {
        method: endpoint.method
      });
      const responseTime = Date.now() - startTime;
      
      const result = {
        endpoint: endpoint.path,
        method: endpoint.method,
        status: response.ok ? 'PASS' : 'FAIL',
        statusCode: response.statusCode,
        responseTime: responseTime,
        responseSize: response.body.length,
        errors: []
      };
      
      // JSON 응답 검증
      if (response.headers['content-type']?.includes('application/json')) {
        try {
          const jsonData = JSON.parse(response.body);
          result.jsonValid = true;
          result.responseData = jsonData;
        } catch (e) {
          result.jsonValid = false;
          result.errors.push('유효하지 않은 JSON 응답');
        }
      }
      
      // 응답 시간 검증
      if (responseTime > 15000) {
        result.errors.push(`응답 시간 초과: ${responseTime}ms`);
      }
      
      results.push(result);
      console.log(`${result.status === 'PASS' ? '✅' : '❌'} ${endpoint.path}: ${result.status} (${responseTime}ms)`);
      
    } catch (error) {
      results.push({
        endpoint: endpoint.path,
        method: endpoint.method,
        status: 'ERROR',
        error: error.message,
        responseTime: 0,
        errors: [error.message]
      });
      console.error(`❌ ${endpoint.path} 오류:`, error.message);
    }
  }
  
  return results;
}

/**
 * 실제 리소스 로딩 테스트
 */
async function testRealResourceLoading() {
  console.log('📦 실제 리소스 로딩 테스트 시작...');
  
  const resources = [
    '/favicon.ico',
    '/_next/static/chunks/main.js',
    '/_next/static/css/app/globals.css'
  ];
  
  const results = [];
  
  for (const resource of resources) {
    try {
      console.log(`📦 ${resource} 테스트 중...`);
      
      const startTime = Date.now();
      const response = await makeHttpRequest(`${DEPLOYMENT_URL}${resource}`);
      const loadTime = Date.now() - startTime;
      
      const result = {
        resource: resource,
        status: response.ok ? 'PASS' : 'FAIL',
        statusCode: response.statusCode,
        loadTime: loadTime,
        size: response.body.length,
        contentType: response.headers['content-type'],
        errors: []
      };
      
      // 파일 크기 검증
      if (response.body.length === 0 && response.statusCode === 200) {
        result.errors.push('빈 파일');
      }
      
      results.push(result);
      console.log(`${result.status === 'PASS' ? '✅' : '❌'} ${resource}: ${result.status} (${loadTime}ms, ${result.size} bytes)`);
      
    } catch (error) {
      results.push({
        resource: resource,
        status: 'ERROR',
        error: error.message,
        loadTime: 0,
        errors: [error.message]
      });
      console.error(`❌ ${resource} 오류:`, error.message);
    }
  }
  
  return results;
}

/**
 * 전체 실제 배포 테스트 실행
 */
async function runRealDeploymentTest() {
  console.log('🚀 실제 배포 사이트 오류 테스트 시작');
  console.log('=' .repeat(80));
  console.log(`📅 테스트 시간: ${new Date().toLocaleString('ko-KR')}`);
  console.log(`🌐 대상 URL: ${DEPLOYMENT_URL}`);
  console.log('');
  
  const overallStartTime = Date.now();
  const testResults = {};
  
  try {
    // 1. 페이지 로딩 테스트
    console.log('🔄 1단계: 실제 페이지 로딩 테스트');
    testResults.pageLoading = await testRealPageLoading();
    
    console.log('\\n🔄 2단계: 실제 API 엔드포인트 테스트');
    testResults.apiEndpoints = await testRealAPIEndpoints();
    
    console.log('\\n🔄 3단계: 실제 리소스 로딩 테스트');
    testResults.resourceLoading = await testRealResourceLoading();
    
    // 종합 결과 분석
    const overallTime = Date.now() - overallStartTime;
    analyzeRealTestResults(testResults, overallTime);
    
  } catch (error) {
    console.error('🚨 실제 배포 테스트 중 치명적 오류 발생:', error.message);
  }
  
  console.log('\\n🏁 실제 배포 사이트 오류 테스트 완료');
  console.log('=' .repeat(80));
}

/**
 * 실제 테스트 결과 분석
 */
function analyzeRealTestResults(testResults, totalTime) {
  console.log('\\n📊 실제 배포 테스트 결과 분석');
  console.log('=' .repeat(60));
  
  let totalTests = 0;
  let totalPassed = 0;
  let totalFailed = 0;
  let totalErrors = 0;
  
  const categories = [
    { name: '페이지 로딩', data: testResults.pageLoading },
    { name: 'API 엔드포인트', data: testResults.apiEndpoints },
    { name: '리소스 로딩', data: testResults.resourceLoading }
  ];
  
  console.log('🎯 실제 테스트 결과:');
  categories.forEach(category => {
    if (category.data) {
      const passed = category.data.filter(r => r.status === 'PASS').length;
      const failed = category.data.filter(r => r.status === 'FAIL').length;
      const errors = category.data.filter(r => r.status === 'ERROR').length;
      const total = category.data.length;
      
      const icon = failed === 0 && errors === 0 ? '✅' : '⚠️';
      console.log(`${icon} ${category.name}: ${passed}/${total} 통과 (실패: ${failed}, 오류: ${errors})`);
      
      totalTests += total;
      totalPassed += passed;
      totalFailed += failed;
      totalErrors += errors;
    }
  });
  
  const successRate = totalTests > 0 ? Math.round((totalPassed / totalTests) * 100) : 0;
  const errorRate = totalTests > 0 ? Math.round(((totalFailed + totalErrors) / totalTests) * 100) : 0;
  
  console.log(`\\n📈 종합 결과:`);
  console.log(`- 총 테스트: ${totalTests}개`);
  console.log(`- 성공: ${totalPassed}개 (${successRate}%)`);
  console.log(`- 실패: ${totalFailed}개`);
  console.log(`- 오류: ${totalErrors}개`);
  console.log(`- 오류율: ${errorRate}%`);
  console.log(`⏱️ 총 실행 시간: ${totalTime}ms`);
  
  // 심각도 평가
  let severity = 'EXCELLENT';
  let grade = 'A+';
  
  if (errorRate > 20) {
    severity = 'CRITICAL';
    grade = 'F';
  } else if (errorRate > 10) {
    severity = 'HIGH';
    grade = 'D';
  } else if (errorRate > 5) {
    severity = 'MEDIUM';
    grade = 'C';
  } else if (errorRate > 2) {
    severity = 'LOW';
    grade = 'B';
  }
  
  console.log(`\\n🏆 최종 평가: ${grade}급 (${severity})`);
  
  if (severity === 'EXCELLENT') {
    console.log('🎉 실제 배포 사이트가 완벽하게 작동하고 있습니다!');
  } else if (severity === 'LOW' || severity === 'MEDIUM') {
    console.log('⚠️ 일부 문제가 발견되었습니다. 개선이 권장됩니다.');
  } else {
    console.log('🚨 심각한 문제가 발견되었습니다. 즉시 수정이 필요합니다.');
  }
  
  // 평균 응답 시간 계산
  if (testResults.pageLoading) {
    const avgLoadTime = testResults.pageLoading
      .filter(r => r.loadTime > 0)
      .reduce((sum, r) => sum + r.loadTime, 0) / testResults.pageLoading.length;
    console.log(`📊 평균 페이지 로딩 시간: ${Math.round(avgLoadTime)}ms`);
  }
}

// 테스트 실행
runRealDeploymentTest().catch(console.error);
