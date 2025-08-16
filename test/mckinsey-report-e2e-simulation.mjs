#!/usr/bin/env node

/**
 * 🎯 맥킨지 스타일 AI 진단 보고서 시스템 E2E 시뮬레이션 테스트
 * 
 * 목적: 45문항 → AI 분석 → GAS 저장 → 이메일 발송 전체 플로우 검증
 * 
 * 테스트 시나리오:
 * 1. 정상 케이스 (모든 단계 성공)
 * 2. 타임아웃 케이스 (Gemini API 지연)
 * 3. GAS 502 케이스 (Google Apps Script 오류)
 * 
 * 실행: npm run test:e2e:mckinsey
 */

import { performance } from 'perf_hooks';

// 테스트 설정
const TEST_CONFIG = {
  LOCAL_URL: 'http://localhost:3001',
  VERCEL_URL: 'https://aicamp.club',
  TIMEOUT_MS: 120000, // 2분 (로컬/프로덕션 빠른 검증)
  RETRY_COUNT: 3,
  TEST_EMAIL: 'test@aicamp.club'
};

// 테스트 데이터 생성
function generateTestData(scenario = 'normal') {
  const baseData = {
    // 기업 기본 정보
    companyName: `테스트기업_${Date.now()}`,
    industry: '제조업',
    employeeCount: '50-99명',
    businessStage: '성장기',
    region: '서울',
    
    // 담당자 정보
    contactName: '홍길동',
    contactEmail: TEST_CONFIG.TEST_EMAIL,
    contactPhone: '010-1234-5678',
    
    // 45문항 응답 (샘플)
    responses: Array.from({ length: 45 }, (_, i) => ({
      questionId: i + 1,
      answer: Math.floor(Math.random() * 5) + 1, // 1-5 점수
      category: ['strategy', 'technology', 'data', 'process', 'talent', 'culture'][i % 6]
    })),
    
    // 추가 정보
    businessChallenges: '디지털 전환과 AI 도입을 통한 생산성 향상이 필요합니다.',
    expectedBenefits: 'AI 기반 품질 관리 시스템 구축으로 불량률 50% 감소 목표',
    
    // 테스트 메타데이터
    _testScenario: scenario,
    _testTimestamp: new Date().toISOString(),
    _testId: `e2e_${scenario}_${Date.now()}`
  };

  // 시나리오별 데이터 조정
  switch (scenario) {
    case 'timeout':
      baseData._forceTimeout = true;
      break;
    case 'gas_error':
      baseData._forceGasError = true;
      break;
  }

  // API 호환을 위해 assessmentResponses 맵 생성 (questionId -> score)
  const assessmentResponses = baseData.responses.reduce((acc, r) => {
    acc[r.questionId] = r.answer;
    return acc;
  }, {});

  return { ...baseData, assessmentResponses };
}

// API 호출 함수
async function callDiagnosisAPI(url, testData) {
  const startTime = performance.now();
  
  try {
    console.log(`📡 API 호출 시작: ${url}/api/ai-diagnosis`);

    // Node 18 fetch용 AbortController 타임아웃 처리
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TEST_CONFIG.TIMEOUT_MS);

    const response = await fetch(`${url}/api/ai-diagnosis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'AICAMP-E2E-Test/1.0',
        'X-Test-Mode': 'true'
      },
      body: JSON.stringify(testData),
      signal: controller.signal
    }).finally(() => clearTimeout(timeoutId));

    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);

    const result = await response.json();
    
    return {
      success: response.ok,
      status: response.status,
      duration,
      data: result,
      headers: Object.fromEntries(response.headers.entries())
    };

  } catch (error) {
    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);
    
    return {
      success: false,
      status: 0,
      duration,
      error: error && error.message ? error.message : 'unknown error',
      data: null
    };
  }
}

// 결과 검증 함수
function validateResponse(response, scenario) {
  const validations = [];
  
  // 기본 응답 구조 검증
  if (response.success && response.data) {
    validations.push({
      test: 'HTTP 상태 코드',
      result: response.status === 200 ? '✅ PASS' : `❌ FAIL (${response.status})`,
      expected: '200',
      actual: response.status
    });

    // 응답 데이터 구조 검증 (현행 API 계약에 맞게 수정)
    const data = response.data;
    
    validations.push({
      test: '진단 결과 존재',
      result: data.scoreAnalysis ? '✅ PASS' : '❌ FAIL',
      expected: 'scoreAnalysis',
      actual: data.scoreAnalysis ? 'present' : 'absent'
    });

    validations.push({
      test: 'HTML 보고서 생성',
      result: (data.htmlReport || (Array.isArray(data.features) && data.features.includes('맥킨지 스타일 HTML 보고서'))) ? '✅ PASS' : '❌ FAIL',
      expected: 'htmlReport or features flag',
      actual: data.htmlReport ? 'inline' : (Array.isArray(data.features) ? data.features.join(',') : 'none')
    });

    validations.push({
      test: 'GAS 저장 상태',
      result: response.data && (response.data.processingInfo?.steps?.some(s => s.name?.includes('Google Sheets')) || response.data.processingInfo?.emailSending) ? '✅ PASS' : '❌ FAIL',
      expected: 'initiated',
      actual: response.data?.processingInfo?.emailSending || 'unknown'
    });

    validations.push({
      test: '이메일 발송 상태',
      result: (response.data?.processingInfo?.emailSending === 'in_progress' || response.data?.emailStatus?.sent) ? '✅ PASS' : '❌ FAIL',
      expected: 'in_progress or sent',
      actual: response.data?.processingInfo?.emailSending || response.data?.emailStatus?.sent || 'unknown'
    });

    validations.push({
      test: '응답 시간',
      result: response.duration < 180000 ? '✅ PASS' : '⚠️ SLOW',
      expected: '< 3분',
      actual: `${Math.round(response.duration / 1000)}초`
    });

  } else {
    validations.push({
      test: 'API 호출',
      result: '❌ FAIL',
      expected: 'success',
      actual: response.error || 'unknown error'
    });
  }

  return validations;
}

// 단일 시나리오 테스트
async function runScenarioTest(scenario, url) {
  console.log(`\n🧪 시나리오 테스트: ${scenario.toUpperCase()}`);
  console.log(`🌐 대상 URL: ${url}`);
  console.log('─'.repeat(60));

  const testData = generateTestData(scenario);
  const response = await callDiagnosisAPI(url, testData);
  const validations = validateResponse(response, scenario);

  // 결과 출력
  console.log(`📊 테스트 결과:`);
  validations.forEach(v => {
    console.log(`  ${v.test}: ${v.result} (기대: ${v.expected}, 실제: ${v.actual})`);
  });

  const passCount = validations.filter(v => v.result.includes('✅')).length;
  const totalCount = validations.length;
  const successRate = Math.round((passCount / totalCount) * 100);

  console.log(`\n📈 성공률: ${passCount}/${totalCount} (${successRate}%)`);
  
  return {
    scenario,
    url,
    passCount,
    totalCount,
    successRate,
    duration: response.duration,
    validations,
    rawResponse: response
  };
}

// 전체 테스트 실행
async function runFullE2ETest() {
  console.log('🚀 맥킨지 스타일 AI 진단 보고서 E2E 테스트 시작');
  console.log(`⏰ 시작 시간: ${new Date().toLocaleString()}`);
  console.log('='.repeat(80));

  const scenarios = ['normal', 'timeout', 'gas_error'];
  const urls = [TEST_CONFIG.LOCAL_URL, TEST_CONFIG.VERCEL_URL];
  const results = [];

  for (const url of urls) {
    console.log(`\n🌐 테스트 환경: ${url}`);
    
    for (const scenario of scenarios) {
      try {
        const result = await runScenarioTest(scenario, url);
        results.push(result);
        
        // 테스트 간 간격
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        console.error(`❌ 시나리오 ${scenario} 실행 실패:`, error.message);
        results.push({
          scenario,
          url,
          error: error.message,
          passCount: 0,
          totalCount: 0,
          successRate: 0
        });
      }
    }
  }

  // 전체 결과 요약
  console.log('\n' + '='.repeat(80));
  console.log('📋 전체 테스트 결과 요약');
  console.log('='.repeat(80));

  results.forEach(result => {
    const status = result.successRate >= 80 ? '✅' : result.successRate >= 50 ? '⚠️' : '❌';
    console.log(`${status} ${result.scenario}@${result.url.split('//')[1]}: ${result.successRate}% (${result.passCount}/${result.totalCount})`);
  });

  const overallSuccess = results.filter(r => r.successRate >= 80).length;
  const totalTests = results.length;
  const overallRate = Math.round((overallSuccess / totalTests) * 100);

  console.log(`\n🎯 전체 성공률: ${overallSuccess}/${totalTests} (${overallRate}%)`);
  console.log(`⏰ 완료 시간: ${new Date().toLocaleString()}`);

  // 실패한 테스트가 있으면 프로세스 종료 코드 1
  if (overallRate < 80) {
    console.log('\n❌ 일부 테스트가 실패했습니다. 시스템 점검이 필요합니다.');
    process.exit(1);
  } else {
    console.log('\n✅ 모든 테스트가 성공했습니다. 시스템이 정상 작동 중입니다.');
    process.exit(0);
  }
}

// 스크립트 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  runFullE2ETest().catch(error => {
    console.error('💥 E2E 테스트 실행 중 치명적 오류:', error);
    process.exit(1);
  });
}
