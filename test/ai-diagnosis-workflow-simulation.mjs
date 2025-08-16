#!/usr/bin/env node

/**
 * 🧠 AICAMP AI 역량진단 전체 워크플로우 시뮬레이션 테스트
 * 
 * 이 스크립트는 AI 역량진단 시스템의 전체 워크플로우를 시뮬레이션하고 테스트합니다.
 * 
 * 테스트 범위:
 * 1. 시스템 헬스 체크
 * 2. 진단 데이터 생성 및 검증
 * 3. AI 분석 API 호출
 * 4. 보고서 생성 검증
 * 5. 데이터 저장 및 이메일 발송 확인
 * 6. 전체 워크플로우 통합 테스트
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// 설정
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const TEST_RESULTS_DIR = './test-results';
const TIMEOUT_MS = 120000; // 2분 타임아웃

// 테스트 결과 저장을 위한 디렉토리 생성
if (!fs.existsSync(TEST_RESULTS_DIR)) {
  fs.mkdirSync(TEST_RESULTS_DIR, { recursive: true });
}

// 로깅 유틸리티
const log = {
  info: (msg) => console.log(`ℹ️  ${new Date().toISOString()} - ${msg}`),
  success: (msg) => console.log(`✅ ${new Date().toISOString()} - ${msg}`),
  error: (msg) => console.log(`❌ ${new Date().toISOString()} - ${msg}`),
  warn: (msg) => console.log(`⚠️  ${new Date().toISOString()} - ${msg}`),
  step: (step, msg) => console.log(`🔄 [${step}] ${new Date().toISOString()} - ${msg}`)
};

// 테스트 데이터 생성
function generateTestData() {
  return {
    // 기본 정보
    companyName: "테스트 주식회사",
    contactName: "홍길동",
    contactEmail: "test@example.com",
    contactPhone: "010-1234-5678",
    businessNumber: "123-45-67890",
    industry: "제조업",
    employees: "50-99명",
    revenue: "10-50억원",
    businessContent: "스마트 팩토리 솔루션 개발 및 제조업 디지털 전환 컨설팅",
    challenges: "생산성 향상과 품질 관리 자동화를 통한 경쟁력 강화",
    
    // 45문항 AI 역량 평가 응답 (1-5점 척도)
    assessmentResponses: [
      // 비즈니스 기반 (8문항)
      4, 3, 4, 3, 4, 3, 4, 3,
      // 현재 AI 활용도 (8문항) 
      2, 3, 2, 3, 2, 3, 2, 3,
      // 조직 준비도 (8문항)
      3, 4, 3, 4, 3, 4, 3, 4,
      // 기술 인프라 (8문항)
      3, 3, 4, 3, 3, 4, 3, 3,
      // 목표 명확성 (8문항)
      4, 4, 3, 4, 4, 3, 4, 4,
      // 실행 역량 (5문항)
      3, 4, 3, 4, 3
    ]
  };
}

// HTTP 요청 헬퍼
async function makeRequest(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'AICAMP-Workflow-Test/1.0',
        ...options.headers
      }
    });
    
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// 1단계: 시스템 헬스 체크
async function testSystemHealth() {
  log.step('1', '시스템 헬스 체크 시작');
  
  const healthChecks = [
    { name: 'API Health', url: `${BASE_URL}/api/health` },
    { name: 'System Health', url: `${BASE_URL}/api/system-health` },
    { name: 'Main Page', url: `${BASE_URL}/` }
  ];
  
  const results = [];
  
  for (const check of healthChecks) {
    try {
      log.info(`${check.name} 체크 중...`);
      const response = await makeRequest(check.url);
      const isHealthy = response.ok;
      
      results.push({
        name: check.name,
        url: check.url,
        status: response.status,
        healthy: isHealthy,
        responseTime: Date.now()
      });
      
      if (isHealthy) {
        log.success(`${check.name}: 정상 (${response.status})`);
      } else {
        log.error(`${check.name}: 오류 (${response.status})`);
      }
    } catch (error) {
      log.error(`${check.name}: 연결 실패 - ${error.message}`);
      results.push({
        name: check.name,
        url: check.url,
        healthy: false,
        error: error.message
      });
    }
  }
  
  return results;
}

// 2단계: 진단 데이터 검증
async function testDataValidation() {
  log.step('2', '진단 데이터 검증 테스트 시작');
  
  const testData = generateTestData();
  
  // 데이터 구조 검증
  const validationTests = [
    {
      name: '필수 필드 존재',
      test: () => {
        const required = ['companyName', 'contactName', 'contactEmail', 'assessmentResponses'];
        return required.every(field => testData[field]);
      }
    },
    {
      name: '평가 응답 개수',
      test: () => testData.assessmentResponses.length === 45
    },
    {
      name: '평가 응답 범위',
      test: () => testData.assessmentResponses.every(score => score >= 1 && score <= 5)
    },
    {
      name: '이메일 형식',
      test: () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testData.contactEmail)
    }
  ];
  
  const results = [];
  
  for (const validation of validationTests) {
    try {
      const passed = validation.test();
      results.push({
        name: validation.name,
        passed,
        message: passed ? '통과' : '실패'
      });
      
      if (passed) {
        log.success(`데이터 검증 - ${validation.name}: 통과`);
      } else {
        log.error(`데이터 검증 - ${validation.name}: 실패`);
      }
    } catch (error) {
      log.error(`데이터 검증 - ${validation.name}: 오류 - ${error.message}`);
      results.push({
        name: validation.name,
        passed: false,
        error: error.message
      });
    }
  }
  
  return { testData, validationResults: results };
}

// 3단계: AI 진단 API 테스트
async function testAIDiagnosisAPI(testData) {
  log.step('3', 'AI 진단 API 테스트 시작');
  
  const startTime = Date.now();
  
  try {
    log.info('AI 진단 API 호출 중...');
    const response = await makeRequest(`${BASE_URL}/api/ai-diagnosis`, {
      method: 'POST',
      body: JSON.stringify(testData)
    });
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    log.info(`응답 시간: ${responseTime}ms`);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const result = await response.json();
    
    // 응답 구조 검증
    const expectedFields = ['success', 'diagnosisId', 'results', 'htmlReport'];
    const missingFields = expectedFields.filter(field => !(field in result));
    
    if (missingFields.length > 0) {
      log.warn(`누락된 응답 필드: ${missingFields.join(', ')}`);
    }
    
    log.success(`AI 진단 API 테스트 완료 - 진단 ID: ${result.diagnosisId}`);
    
    return {
      success: true,
      responseTime,
      diagnosisId: result.diagnosisId,
      totalScore: result.results?.totalScore,
      maturityLevel: result.results?.maturityLevel,
      hasReport: !!result.htmlReport,
      response: result
    };
    
  } catch (error) {
    log.error(`AI 진단 API 테스트 실패: ${error.message}`);
    return {
      success: false,
      error: error.message,
      responseTime: Date.now() - startTime
    };
  }
}

// 4단계: 보고서 생성 검증
async function testReportGeneration(diagnosisResult) {
  log.step('4', '보고서 생성 검증 시작');
  
  if (!diagnosisResult.success || !diagnosisResult.hasReport) {
    log.error('보고서 생성 검증 실패: 진단 결과 또는 보고서가 없음');
    return { success: false, error: '진단 결과 또는 보고서가 없음' };
  }
  
  try {
    const htmlReport = diagnosisResult.response.htmlReport;
    
    // HTML 보고서 구조 검증
    const reportTests = [
      {
        name: 'HTML 구조',
        test: () => htmlReport.includes('<html') && htmlReport.includes('</html>')
      },
      {
        name: '회사명 포함',
        test: () => htmlReport.includes('테스트 주식회사')
      },
      {
        name: '점수 정보',
        test: () => htmlReport.includes('총점') || htmlReport.includes('점수')
      },
      {
        name: '성숙도 레벨',
        test: () => htmlReport.includes('성숙도') || htmlReport.includes('레벨')
      },
      {
        name: 'SWOT 분석',
        test: () => htmlReport.includes('SWOT') || htmlReport.includes('강점') || htmlReport.includes('약점')
      }
    ];
    
    const results = [];
    let allPassed = true;
    
    for (const test of reportTests) {
      const passed = test.test();
      results.push({
        name: test.name,
        passed,
        message: passed ? '통과' : '실패'
      });
      
      if (passed) {
        log.success(`보고서 검증 - ${test.name}: 통과`);
      } else {
        log.error(`보고서 검증 - ${test.name}: 실패`);
        allPassed = false;
      }
    }
    
    // 보고서 파일 저장
    const reportPath = path.join(TEST_RESULTS_DIR, `diagnosis-report-${diagnosisResult.diagnosisId}.html`);
    fs.writeFileSync(reportPath, htmlReport, 'utf8');
    log.info(`보고서 저장됨: ${reportPath}`);
    
    return {
      success: allPassed,
      tests: results,
      reportPath,
      reportSize: htmlReport.length
    };
    
  } catch (error) {
    log.error(`보고서 생성 검증 실패: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  }
}

// 5단계: 데이터 저장 및 이메일 발송 확인
async function testDataStorageAndEmail(diagnosisResult) {
  log.step('5', '데이터 저장 및 이메일 발송 확인');
  
  if (!diagnosisResult.success) {
    log.error('데이터 저장 확인 실패: 진단 결과가 없음');
    return { success: false, error: '진단 결과가 없음' };
  }
  
  try {
    const response = diagnosisResult.response;
    
    // Google Apps Script 응답 확인
    const gasResult = response.gas;
    const driveResult = response.driveUpload;
    
    const checks = [
      {
        name: 'GAS 응답',
        passed: !!gasResult,
        details: gasResult ? `Progress ID: ${gasResult.progressId}` : '응답 없음'
      },
      {
        name: '이메일 발송',
        passed: gasResult?.emailsSent === true,
        details: gasResult?.emailsSent ? '발송 완료' : '발송 실패 또는 미확인'
      },
      {
        name: '데이터 저장',
        passed: gasResult?.dataSaved === true,
        details: gasResult?.dataSaved ? '저장 완료' : '저장 실패 또는 미확인'
      },
      {
        name: 'Drive 업로드',
        passed: driveResult?.success === true,
        details: driveResult?.success ? `파일 ID: ${driveResult.fileId}` : '업로드 실패 또는 미확인'
      }
    ];
    
    const results = [];
    let allPassed = true;
    
    for (const check of checks) {
      results.push(check);
      
      if (check.passed) {
        log.success(`${check.name}: 통과 - ${check.details}`);
      } else {
        log.warn(`${check.name}: 실패 또는 미확인 - ${check.details}`);
        // 이메일/저장은 외부 서비스 의존이므로 전체 실패로 처리하지 않음
      }
    }
    
    return {
      success: true, // 기본적으로 성공으로 처리 (외부 서비스 의존성 때문)
      checks: results,
      gasResponse: gasResult,
      driveResponse: driveResult
    };
    
  } catch (error) {
    log.error(`데이터 저장 및 이메일 확인 실패: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  }
}

// 6단계: 전체 워크플로우 통합 테스트
async function runIntegrationTest() {
  log.step('6', '전체 워크플로우 통합 테스트 시작');
  
  const integrationStartTime = Date.now();
  const testResults = {
    startTime: new Date().toISOString(),
    steps: []
  };
  
  try {
    // 1. 시스템 헬스 체크
    const healthResults = await testSystemHealth();
    testResults.steps.push({
      step: 1,
      name: '시스템 헬스 체크',
      results: healthResults,
      success: healthResults.every(r => r.healthy)
    });
    
    // 2. 데이터 검증
    const { testData, validationResults } = await testDataValidation();
    testResults.steps.push({
      step: 2,
      name: '데이터 검증',
      results: validationResults,
      success: validationResults.every(r => r.passed)
    });
    
    // 3. AI 진단 API 테스트
    const diagnosisResult = await testAIDiagnosisAPI(testData);
    testResults.steps.push({
      step: 3,
      name: 'AI 진단 API',
      results: diagnosisResult,
      success: diagnosisResult.success
    });
    
    // 4. 보고서 생성 검증
    const reportResult = await testReportGeneration(diagnosisResult);
    testResults.steps.push({
      step: 4,
      name: '보고서 생성',
      results: reportResult,
      success: reportResult.success
    });
    
    // 5. 데이터 저장 및 이메일 확인
    const storageResult = await testDataStorageAndEmail(diagnosisResult);
    testResults.steps.push({
      step: 5,
      name: '데이터 저장 및 이메일',
      results: storageResult,
      success: storageResult.success
    });
    
    const integrationEndTime = Date.now();
    const totalTime = integrationEndTime - integrationStartTime;
    
    testResults.endTime = new Date().toISOString();
    testResults.totalTime = totalTime;
    testResults.overallSuccess = testResults.steps.every(step => step.success);
    
    // 결과 요약
    log.info('='.repeat(60));
    log.info('🧠 AI 역량진단 워크플로우 시뮬레이션 테스트 완료');
    log.info('='.repeat(60));
    
    testResults.steps.forEach(step => {
      const status = step.success ? '✅ 성공' : '❌ 실패';
      log.info(`${step.step}단계 - ${step.name}: ${status}`);
    });
    
    log.info(`총 실행 시간: ${Math.round(totalTime / 1000)}초`);
    log.info(`전체 결과: ${testResults.overallSuccess ? '✅ 성공' : '❌ 실패'}`);
    
    return testResults;
    
  } catch (error) {
    log.error(`통합 테스트 실패: ${error.message}`);
    testResults.error = error.message;
    testResults.overallSuccess = false;
    return testResults;
  }
}

// 결과 저장
function saveTestResults(results) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const resultPath = path.join(TEST_RESULTS_DIR, `workflow-test-${timestamp}.json`);
  
  fs.writeFileSync(resultPath, JSON.stringify(results, null, 2), 'utf8');
  log.info(`테스트 결과 저장됨: ${resultPath}`);
  
  return resultPath;
}

// 메인 실행 함수
async function main() {
  console.log('🚀 AICAMP AI 역량진단 전체 워크플로우 시뮬레이션 테스트 시작');
  console.log(`📍 테스트 대상: ${BASE_URL}`);
  console.log(`⏰ 시작 시간: ${new Date().toISOString()}`);
  console.log('='.repeat(80));
  
  try {
    const results = await runIntegrationTest();
    const resultPath = saveTestResults(results);
    
    console.log('='.repeat(80));
    console.log('📊 최종 테스트 결과 요약:');
    console.log(`- 전체 성공 여부: ${results.overallSuccess ? '✅ 성공' : '❌ 실패'}`);
    console.log(`- 총 실행 시간: ${Math.round(results.totalTime / 1000)}초`);
    console.log(`- 테스트 단계: ${results.steps.length}개`);
    console.log(`- 성공한 단계: ${results.steps.filter(s => s.success).length}개`);
    console.log(`- 실패한 단계: ${results.steps.filter(s => !s.success).length}개`);
    console.log(`- 결과 파일: ${resultPath}`);
    console.log('='.repeat(80));
    
    // 종료 코드 설정
    process.exit(results.overallSuccess ? 0 : 1);
    
  } catch (error) {
    log.error(`메인 실행 실패: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

// 스크립트 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('치명적 오류:', error);
    process.exit(1);
  });
}

export {
  generateTestData,
  testSystemHealth,
  testDataValidation,
  testAIDiagnosisAPI,
  testReportGeneration,
  testDataStorageAndEmail,
  runIntegrationTest
};

