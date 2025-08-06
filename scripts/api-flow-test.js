#!/usr/bin/env node

/**
 * 🔬 AICAMP API 플로우 심층 테스트
 * 실제 API 엔드포인트를 테스트하여 오류를 검출합니다.
 */

const fs = require('fs');
const path = require('path');

// API 테스트 설정
const API_TEST_CONFIG = {
  baseUrl: process.env.TEST_BASE_URL || 'http://localhost:3000',
  gasUrl: process.env.GOOGLE_SCRIPT_URL || '',
  
  // 테스트 데이터 세트
  testDataSets: [
    {
      name: '완전한 데이터 세트',
      data: {
        companyName: 'API테스트컴퍼니',
        industry: ['제조업'],
        businessDetails: '자동차 부품 제조 및 공급업체',
        businessLocation: '서울특별시',
        contactManager: '김테스트',
        phone: '010-1234-5678',
        email: 'test@apitest.com',
        employeeCount: '10-49명',
        mainConcerns: 'AI 도입을 통한 생산성 향상',
        expectedBenefits: '업무 효율성 증대',
        // 평가 데이터
        planning_level: 3,
        differentiation_level: 4,
        pricing_level: 3,
        expertise_level: 4,
        quality_level: 4,
        customer_greeting: 3,
        customer_service: 4,
        complaint_management: 3,
        customer_retention: 3,
        customer_understanding: 4,
        marketing_planning: 2,
        offline_marketing: 3,
        online_marketing: 2,
        sales_strategy: 3,
        purchase_management: 4,
        inventory_management: 3,
        exterior_management: 4,
        interior_management: 4,
        cleanliness: 5,
        work_flow: 3,
        privacyConsent: true
      }
    },
    {
      name: '최소 데이터 세트',
      data: {
        companyName: '최소데이터테스트',
        industry: ['기타'],
        contactManager: '이최소',
        email: 'minimal@test.com',
        employeeCount: '10명 미만',
        // 최소한의 평가 데이터만
        planning_level: 3,
        differentiation_level: 3,
        pricing_level: 3,
        expertise_level: 3,
        quality_level: 3,
        customer_greeting: 3,
        customer_service: 3,
        complaint_management: 3,
        customer_retention: 3,
        customer_understanding: 3,
        marketing_planning: 3,
        offline_marketing: 3,
        online_marketing: 3,
        sales_strategy: 3,
        purchase_management: 3,
        inventory_management: 3,
        exterior_management: 3,
        interior_management: 3,
        cleanliness: 3,
        work_flow: 3,
        privacyConsent: true
      }
    },
    {
      name: '대용량 데이터 세트',
      data: {
        companyName: '대용량데이터테스트컴퍼니주식회사',
        industry: ['IT/소프트웨어', '제조업'],
        businessDetails: 'A'.repeat(2000), // 2000자 대용량 텍스트
        businessLocation: '경기도 성남시 분당구 판교역로 235',
        contactManager: '박대용량데이터테스트매니저',
        phone: '010-9999-8888',
        email: 'large.data.test@company.co.kr',
        employeeCount: '1000명 이상',
        mainConcerns: 'B'.repeat(1000), // 1000자 대용량 텍스트
        expectedBenefits: 'C'.repeat(1000), // 1000자 대용량 텍스트
        // 모든 평가를 최고점으로
        planning_level: 5,
        differentiation_level: 5,
        pricing_level: 5,
        expertise_level: 5,
        quality_level: 5,
        customer_greeting: 5,
        customer_service: 5,
        complaint_management: 5,
        customer_retention: 5,
        customer_understanding: 5,
        marketing_planning: 5,
        offline_marketing: 5,
        online_marketing: 5,
        sales_strategy: 5,
        purchase_management: 5,
        inventory_management: 5,
        exterior_management: 5,
        interior_management: 5,
        cleanliness: 5,
        work_flow: 5,
        privacyConsent: true
      }
    }
  ],

  // 테스트할 엔드포인트
  endpoints: [
    {
      name: 'simplified-diagnosis',
      path: '/api/simplified-diagnosis',
      method: 'POST',
      timeout: 800000, // 13분 20초
      expectedResponseTime: 360000, // 6분
      criticalEndpoint: true
    },
    {
      name: 'google-script-proxy',
      path: '/api/google-script-proxy',
      method: 'POST',
      timeout: 800000, // 13분 20초
      expectedResponseTime: 480000, // 8분
      criticalEndpoint: true
    },
    {
      name: 'health-check',
      path: '/api/health',
      method: 'GET',
      timeout: 5000, // 5초
      expectedResponseTime: 1000, // 1초
      criticalEndpoint: false
    }
  ],

  // 부하 테스트 설정
  loadTest: {
    enabled: false, // 기본적으로 비활성화
    concurrentRequests: 3,
    requestInterval: 10000 // 10초 간격
  }
};

// API 테스트 실행 클래스
class ApiFlowTester {
  constructor(config) {
    this.config = config;
    this.results = [];
    this.errors = [];
    this.startTime = Date.now();
  }

  // 메인 테스트 실행
  async runTests() {
    console.log('🔬 AICAMP API 플로우 심층 테스트 시작\n');
    
    // 1. 기본 연결성 테스트
    await this.testConnectivity();
    
    // 2. 각 엔드포인트별 테스트
    for (const endpoint of this.config.endpoints) {
      await this.testEndpoint(endpoint);
    }
    
    // 3. 데이터 세트별 테스트
    for (const dataSet of this.config.testDataSets) {
      await this.testWithDataSet(dataSet);
    }
    
    // 4. 부하 테스트 (활성화된 경우)
    if (this.config.loadTest.enabled) {
      await this.runLoadTest();
    }
    
    // 5. 결과 분석 및 리포트 생성
    this.generateReport();
    
    return this.getTestSummary();
  }

  // 연결성 테스트
  async testConnectivity() {
    console.log('🌐 기본 연결성 테스트');
    
    try {
      const response = await this.makeRequest('GET', '/api/health', null, 5000);
      
      if (response.ok) {
        console.log('  ✅ 서버 연결 성공');
        this.addResult('connectivity', 'success', 'Server connection successful');
      } else {
        console.log('  ❌ 서버 연결 실패');
        this.addResult('connectivity', 'failed', `Server returned ${response.status}`);
      }
    } catch (error) {
      console.log('  ❌ 연결 오류:', error.message);
      this.addResult('connectivity', 'error', error.message);
    }
  }

  // 개별 엔드포인트 테스트
  async testEndpoint(endpoint) {
    console.log(`\n🎯 엔드포인트 테스트: ${endpoint.name}`);
    console.log(`   경로: ${endpoint.path}`);
    console.log(`   방법: ${endpoint.method}`);
    console.log(`   타임아웃: ${endpoint.timeout / 1000}초`);
    
    const startTime = Date.now();
    
    try {
      // 테스트 데이터 준비
      const testData = endpoint.method === 'POST' ? 
        this.config.testDataSets[0].data : null;
      
      // API 호출
      const response = await this.makeRequest(
        endpoint.method, 
        endpoint.path, 
        testData, 
        endpoint.timeout
      );
      
      const duration = Date.now() - startTime;
      const responseTime = `${(duration / 1000).toFixed(1)}초`;
      
      if (response.ok) {
        console.log(`   ✅ 성공 (${responseTime})`);
        
        // 응답 시간 검증
        if (duration > endpoint.expectedResponseTime) {
          console.log(`   ⚠️ 예상보다 느린 응답 (예상: ${endpoint.expectedResponseTime / 1000}초)`);
          this.addResult(endpoint.name, 'warning', `Slow response: ${responseTime}`);
        } else {
          this.addResult(endpoint.name, 'success', `Response time: ${responseTime}`);
        }
        
        // 응답 데이터 검증
        const responseData = await response.text();
        this.validateResponse(endpoint, responseData);
        
      } else {
        console.log(`   ❌ 실패: ${response.status} ${response.statusText}`);
        this.addResult(endpoint.name, 'failed', `${response.status} ${response.statusText}`);
      }
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.log(`   ❌ 오류: ${error.message} (${(duration / 1000).toFixed(1)}초)`);
      
      if (error.name === 'AbortError') {
        this.addResult(endpoint.name, 'timeout', `Timeout after ${endpoint.timeout / 1000}s`);
      } else {
        this.addResult(endpoint.name, 'error', error.message);
      }
    }
  }

  // 데이터 세트별 테스트
  async testWithDataSet(dataSet) {
    console.log(`\n📊 데이터 세트 테스트: ${dataSet.name}`);
    
    const endpoint = this.config.endpoints.find(e => e.name === 'simplified-diagnosis');
    if (!endpoint) {
      console.log('   ❌ simplified-diagnosis 엔드포인트를 찾을 수 없음');
      return;
    }
    
    const startTime = Date.now();
    
    try {
      const response = await this.makeRequest(
        endpoint.method,
        endpoint.path,
        dataSet.data,
        endpoint.timeout
      );
      
      const duration = Date.now() - startTime;
      const responseTime = `${(duration / 1000).toFixed(1)}초`;
      
      if (response.ok) {
        console.log(`   ✅ 성공 (${responseTime})`);
        
        const responseData = await response.json();
        
        // 응답 데이터 상세 검증
        this.validateDiagnosisResponse(dataSet, responseData);
        
        this.addResult(`dataset-${dataSet.name}`, 'success', `Response time: ${responseTime}`);
        
      } else {
        console.log(`   ❌ 실패: ${response.status}`);
        const errorText = await response.text();
        this.addResult(`dataset-${dataSet.name}`, 'failed', `${response.status}: ${errorText}`);
      }
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.log(`   ❌ 오류: ${error.message} (${(duration / 1000).toFixed(1)}초)`);
      this.addResult(`dataset-${dataSet.name}`, 'error', error.message);
    }
  }

  // 부하 테스트
  async runLoadTest() {
    console.log('\n🚀 부하 테스트 시작');
    
    const { concurrentRequests, requestInterval } = this.config.loadTest;
    const testData = this.config.testDataSets[0].data;
    
    console.log(`   동시 요청: ${concurrentRequests}개`);
    console.log(`   요청 간격: ${requestInterval / 1000}초`);
    
    const promises = [];
    
    for (let i = 0; i < concurrentRequests; i++) {
      const promise = this.makeRequest(
        'POST',
        '/api/simplified-diagnosis',
        { ...testData, companyName: `부하테스트-${i + 1}` },
        800000
      ).then(response => ({
        requestId: i + 1,
        success: response.ok,
        status: response.status,
        duration: Date.now()
      })).catch(error => ({
        requestId: i + 1,
        success: false,
        error: error.message,
        duration: Date.now()
      }));
      
      promises.push(promise);
      
      // 요청 간격 대기
      if (i < concurrentRequests - 1) {
        await new Promise(resolve => setTimeout(resolve, requestInterval));
      }
    }
    
    try {
      const results = await Promise.all(promises);
      
      const successCount = results.filter(r => r.success).length;
      const failureCount = concurrentRequests - successCount;
      
      console.log(`   결과: 성공 ${successCount}개, 실패 ${failureCount}개`);
      
      this.addResult('load-test', successCount === concurrentRequests ? 'success' : 'partial', 
        `${successCount}/${concurrentRequests} requests succeeded`);
        
    } catch (error) {
      console.log(`   ❌ 부하 테스트 실패: ${error.message}`);
      this.addResult('load-test', 'error', error.message);
    }
  }

  // HTTP 요청 실행
  async makeRequest(method, path, data, timeout) {
    const url = `${this.config.baseUrl}${path}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'AICAMP-API-Test/1.0'
        },
        signal: controller.signal
      };
      
      if (data && method !== 'GET') {
        options.body = JSON.stringify(data);
      }
      
      const response = await fetch(url, options);
      clearTimeout(timeoutId);
      
      return response;
      
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // 응답 검증
  validateResponse(endpoint, responseData) {
    try {
      // JSON 파싱 시도
      const jsonData = JSON.parse(responseData);
      
      // 기본 구조 검증
      if (endpoint.name === 'simplified-diagnosis') {
        this.validateDiagnosisResponse(null, jsonData);
      }
      
    } catch (error) {
      console.log(`   ⚠️ 응답 데이터 파싱 실패: ${error.message}`);
      this.addResult(`${endpoint.name}-validation`, 'warning', 'Response parsing failed');
    }
  }

  // 진단 응답 검증
  validateDiagnosisResponse(dataSet, responseData) {
    const validationResults = [];
    
    // 필수 필드 검증
    const requiredFields = ['success', 'data'];
    requiredFields.forEach(field => {
      if (!(field in responseData)) {
        validationResults.push(`Missing required field: ${field}`);
      }
    });
    
    // 성공 응답인 경우 추가 검증
    if (responseData.success && responseData.data) {
      const diagnosisData = responseData.data.diagnosis;
      
      if (diagnosisData) {
        // 진단 결과 필수 필드 검증
        const diagnosisFields = ['totalScore', 'overallGrade', 'categoryScores'];
        diagnosisFields.forEach(field => {
          if (!(field in diagnosisData)) {
            validationResults.push(`Missing diagnosis field: ${field}`);
          }
        });
        
        // 점수 범위 검증
        if (diagnosisData.totalScore !== undefined) {
          if (diagnosisData.totalScore < 0 || diagnosisData.totalScore > 100) {
            validationResults.push(`Invalid totalScore: ${diagnosisData.totalScore}`);
          }
        }
      }
    }
    
    // 검증 결과 출력
    if (validationResults.length > 0) {
      console.log('   ⚠️ 응답 검증 경고:');
      validationResults.forEach(warning => {
        console.log(`     - ${warning}`);
      });
      this.addResult('response-validation', 'warning', validationResults.join('; '));
    } else {
      console.log('   ✅ 응답 검증 통과');
    }
  }

  // 결과 추가
  addResult(testName, status, message) {
    this.results.push({
      testName,
      status,
      message,
      timestamp: new Date().toISOString()
    });
  }

  // 테스트 요약 생성
  getTestSummary() {
    const totalTests = this.results.length;
    const successTests = this.results.filter(r => r.status === 'success').length;
    const failedTests = this.results.filter(r => r.status === 'failed').length;
    const errorTests = this.results.filter(r => r.status === 'error').length;
    const warningTests = this.results.filter(r => r.status === 'warning').length;
    const timeoutTests = this.results.filter(r => r.status === 'timeout').length;
    
    return {
      summary: {
        totalTests,
        successTests,
        failedTests,
        errorTests,
        warningTests,
        timeoutTests,
        successRate: `${((successTests / totalTests) * 100).toFixed(1)}%`,
        duration: `${((Date.now() - this.startTime) / 1000).toFixed(1)}초`
      },
      results: this.results,
      errors: this.errors
    };
  }

  // 리포트 생성
  generateReport() {
    const summary = this.getTestSummary();
    
    console.log('\n' + '='.repeat(80));
    console.log('📊 API 플로우 테스트 결과');
    console.log('='.repeat(80));
    
    const { summary: s } = summary;
    console.log(`총 테스트: ${s.totalTests}개`);
    console.log(`성공: ${s.successTests}개`);
    console.log(`실패: ${s.failedTests}개`);
    console.log(`오류: ${s.errorTests}개`);
    console.log(`경고: ${s.warningTests}개`);
    console.log(`타임아웃: ${s.timeoutTests}개`);
    console.log(`성공률: ${s.successRate}`);
    console.log(`총 소요시간: ${s.duration}`);
    
    // 상세 결과
    console.log('\n📋 상세 결과:');
    summary.results.forEach(result => {
      const statusIcon = {
        'success': '✅',
        'failed': '❌',
        'error': '🚨',
        'warning': '⚠️',
        'timeout': '⏰'
      }[result.status] || '❓';
      
      console.log(`  ${statusIcon} ${result.testName}: ${result.message}`);
    });
    
    // 결과 파일 저장
    const outputDir = './test-results';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, 'api-flow-test-results.json');
    fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2));
    console.log(`\n💾 결과 저장됨: ${outputPath}`);
  }
}

// 메인 실행 함수
async function main() {
  try {
    // fetch polyfill for Node.js
    if (typeof fetch === 'undefined') {
      global.fetch = require('node-fetch');
    }
    
    const tester = new ApiFlowTester(API_TEST_CONFIG);
    const results = await tester.runTests();
    
    // 종료 코드 설정
    const hasFailures = results.summary.failedTests > 0 || results.summary.errorTests > 0;
    process.exit(hasFailures ? 1 : 0);
    
  } catch (error) {
    console.error('\n❌ API 테스트 실행 중 오류:', error);
    process.exit(1);
  }
}

// 스크립트 직접 실행 시
if (require.main === module) {
  main();
}

module.exports = { ApiFlowTester, API_TEST_CONFIG };