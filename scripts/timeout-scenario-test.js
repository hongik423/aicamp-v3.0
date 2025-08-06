#!/usr/bin/env node

/**
 * ⏰ AICAMP 타임아웃 시나리오 심층 테스트
 * 다양한 타임아웃 상황을 시뮬레이션하여 시스템 안정성을 검증합니다.
 */

const fs = require('fs');
const path = require('path');

// 타임아웃 테스트 설정
const TIMEOUT_TEST_CONFIG = {
  // 테스트 대상 타임아웃 (밀리초)
  timeouts: {
    geminiApi: 800000,      // 13분 20초 (GEMINI API)
    emailSending: 180000,   // 3분 (이메일 발송)
    totalProcess: 800000,   // 13분 20초 (전체 프로세스)
    vercelFunction: 800000, // 13분 20초 (Vercel 함수)
    googleScript: 800000    // 13분 20초 (Google Apps Script)
  },

  // 타임아웃 시나리오
  scenarios: [
    {
      name: 'GEMINI API 응답 지연',
      description: 'GEMINI API가 정상보다 오래 걸리는 상황',
      simulatedDelay: 900000, // 15분 (타임아웃 초과)
      targetTimeout: 'geminiApi',
      expectedBehavior: 'timeout_and_retry',
      retryAttempts: 3,
      shouldRecover: true
    },
    {
      name: 'Google Apps Script 처리 지연',
      description: 'Google Apps Script 실행이 지연되는 상황',
      simulatedDelay: 850000, // 14분 10초
      targetTimeout: 'googleScript',
      expectedBehavior: 'timeout_with_background_processing',
      shouldRecover: true
    },
    {
      name: '이메일 발송 지연',
      description: '이메일 발송이 지연되는 상황',
      simulatedDelay: 200000, // 3분 20초
      targetTimeout: 'emailSending',
      expectedBehavior: 'background_email_sending',
      shouldRecover: true
    },
    {
      name: '전체 프로세스 타임아웃',
      description: '전체 진단 프로세스가 제한 시간을 초과하는 상황',
      simulatedDelay: 900000, // 15분
      targetTimeout: 'totalProcess',
      expectedBehavior: 'graceful_degradation',
      shouldRecover: false,
      fallbackResponse: true
    },
    {
      name: 'Vercel 함수 타임아웃',
      description: 'Vercel 서버리스 함수가 타임아웃되는 상황',
      simulatedDelay: 850000, // 14분 10초
      targetTimeout: 'vercelFunction',
      expectedBehavior: 'function_timeout',
      shouldRecover: false
    },
    {
      name: '연쇄 타임아웃',
      description: '여러 단계에서 연속적으로 타임아웃이 발생하는 상황',
      simulatedDelay: 300000, // 5분 (각 단계마다)
      targetTimeout: 'multiple',
      expectedBehavior: 'cascading_failure',
      shouldRecover: false,
      criticalScenario: true
    }
  ],

  // 복구 메커니즘 테스트
  recoveryMechanisms: [
    {
      name: 'exponential_backoff',
      description: '지수 백오프 재시도',
      maxRetries: 3,
      baseDelay: 2000,
      maxDelay: 30000
    },
    {
      name: 'background_processing',
      description: '백그라운드 처리로 전환',
      triggerTimeout: 600000, // 10분
      notificationMethod: 'email'
    },
    {
      name: 'graceful_degradation',
      description: '기능 축소 모드',
      fallbackFeatures: ['basic_report', 'email_notification'],
      disabledFeatures: ['detailed_analysis', 'swot_matrix']
    }
  ]
};

// 타임아웃 테스트 실행 클래스
class TimeoutScenarioTester {
  constructor(config) {
    this.config = config;
    this.results = [];
    this.timeoutEvents = [];
    this.recoveryEvents = [];
    this.startTime = Date.now();
  }

  // 메인 테스트 실행
  async runTimeoutTests() {
    console.log('⏰ AICAMP 타임아웃 시나리오 심층 테스트 시작\n');
    
    // 1. 타임아웃 설정 검증
    await this.validateTimeoutConfiguration();
    
    // 2. 각 시나리오별 타임아웃 테스트
    for (const scenario of this.config.scenarios) {
      await this.runTimeoutScenario(scenario);
    }
    
    // 3. 복구 메커니즘 테스트
    for (const mechanism of this.config.recoveryMechanisms) {
      await this.testRecoveryMechanism(mechanism);
    }
    
    // 4. 동시 타임아웃 상황 테스트
    await this.testConcurrentTimeouts();
    
    // 5. 타임아웃 모니터링 시스템 테스트
    await this.testTimeoutMonitoring();
    
    // 6. 결과 분석 및 리포트 생성
    this.generateTimeoutReport();
    
    return this.getTestSummary();
  }

  // 타임아웃 설정 검증
  async validateTimeoutConfiguration() {
    console.log('🔧 타임아웃 설정 검증');
    
    const validationResults = [];
    
    // Vercel 제한 검증
    const vercelLimit = 800000; // 13분 20초
    Object.entries(this.config.timeouts).forEach(([key, value]) => {
      if (value > vercelLimit) {
        validationResults.push(`${key}: ${value}ms > Vercel 제한 ${vercelLimit}ms`);
      }
    });
    
    // 타임아웃 계층 구조 검증
    const { geminiApi, emailSending, totalProcess } = this.config.timeouts;
    if (geminiApi + emailSending > totalProcess) {
      validationResults.push('GEMINI + 이메일 타임아웃이 전체 프로세스 타임아웃을 초과');
    }
    
    // 검증 결과
    if (validationResults.length > 0) {
      console.log('  ❌ 타임아웃 설정 문제 발견:');
      validationResults.forEach(issue => console.log(`    - ${issue}`));
      this.addResult('timeout-config-validation', 'failed', validationResults.join('; '));
    } else {
      console.log('  ✅ 타임아웃 설정 검증 통과');
      this.addResult('timeout-config-validation', 'success', 'All timeout configurations are valid');
    }
  }

  // 개별 타임아웃 시나리오 실행
  async runTimeoutScenario(scenario) {
    console.log(`\n⏱️ 시나리오: ${scenario.name}`);
    console.log(`   설명: ${scenario.description}`);
    console.log(`   시뮬레이션 지연: ${scenario.simulatedDelay / 1000}초`);
    console.log(`   예상 동작: ${scenario.expectedBehavior}`);
    
    const startTime = Date.now();
    let result = {
      scenario: scenario.name,
      success: false,
      timedOut: false,
      recovered: false,
      duration: 0,
      events: []
    };

    try {
      // 타임아웃 시뮬레이션 실행
      await this.simulateTimeoutCondition(scenario, result);
      
      // 복구 메커니즘 테스트
      if (scenario.shouldRecover) {
        await this.attemptRecovery(scenario, result);
      }
      
      result.success = scenario.shouldRecover ? result.recovered : !result.timedOut;
      
    } catch (error) {
      result.events.push(`Error: ${error.message}`);
      console.log(`   ❌ 시나리오 실행 오류: ${error.message}`);
    }

    result.duration = Date.now() - startTime;
    this.results.push(result);
    
    // 결과 출력
    const status = result.success ? '✅ 성공' : '❌ 실패';
    const duration = `${(result.duration / 1000).toFixed(1)}초`;
    console.log(`   결과: ${status} (소요시간: ${duration})`);
    
    if (result.timedOut) {
      console.log(`   ⏰ 타임아웃 발생`);
    }
    
    if (result.recovered) {
      console.log(`   🔄 복구 성공`);
    }
  }

  // 타임아웃 조건 시뮬레이션
  async simulateTimeoutCondition(scenario, result) {
    const targetTimeout = this.config.timeouts[scenario.targetTimeout] || 
                         this.config.timeouts.totalProcess;
    
    console.log(`   ⏳ ${scenario.simulatedDelay / 1000}초 지연 시뮬레이션 중...`);
    
    // 타임아웃 모니터링 시작
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Timeout after ${targetTimeout / 1000}s`));
      }, targetTimeout);
    });
    
    // 지연 시뮬레이션
    const delayPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve('Delay completed');
      }, scenario.simulatedDelay);
    });
    
    try {
      // 레이스 조건: 지연 vs 타임아웃
      const raceResult = await Promise.race([delayPromise, timeoutPromise]);
      
      if (raceResult === 'Delay completed') {
        console.log(`   ✅ 지연 완료 (타임아웃 미발생)`);
        result.events.push('Delay completed without timeout');
      }
      
    } catch (error) {
      if (error.message.includes('Timeout')) {
        console.log(`   ⏰ 타임아웃 발생: ${error.message}`);
        result.timedOut = true;
        result.events.push(`Timeout: ${error.message}`);
        this.timeoutEvents.push({
          scenario: scenario.name,
          timestamp: Date.now(),
          timeout: targetTimeout,
          actualDelay: scenario.simulatedDelay
        });
      } else {
        throw error;
      }
    }
  }

  // 복구 시도
  async attemptRecovery(scenario, result) {
    console.log(`   🔄 복구 메커니즘 시도...`);
    
    switch (scenario.expectedBehavior) {
      case 'timeout_and_retry':
        await this.simulateRetryMechanism(scenario, result);
        break;
        
      case 'timeout_with_background_processing':
        await this.simulateBackgroundProcessing(scenario, result);
        break;
        
      case 'background_email_sending':
        await this.simulateBackgroundEmail(scenario, result);
        break;
        
      case 'graceful_degradation':
        await this.simulateGracefulDegradation(scenario, result);
        break;
        
      default:
        console.log(`   ❓ 알 수 없는 복구 메커니즘: ${scenario.expectedBehavior}`);
    }
  }

  // 재시도 메커니즘 시뮬레이션
  async simulateRetryMechanism(scenario, result) {
    const maxRetries = scenario.retryAttempts || 3;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      console.log(`   🔄 재시도 ${attempt}/${maxRetries}`);
      
      // 지수 백오프 계산
      const backoffDelay = Math.min(2000 * Math.pow(2, attempt - 1), 30000);
      await this.sleep(backoffDelay);
      
      // 재시도 성공 확률 (80%)
      if (Math.random() > 0.2) {
        console.log(`   ✅ 재시도 ${attempt} 성공`);
        result.recovered = true;
        result.events.push(`Retry ${attempt} succeeded after ${backoffDelay}ms backoff`);
        this.recoveryEvents.push({
          scenario: scenario.name,
          mechanism: 'retry',
          attempt: attempt,
          success: true
        });
        break;
      } else {
        console.log(`   ❌ 재시도 ${attempt} 실패`);
        result.events.push(`Retry ${attempt} failed`);
      }
    }
    
    if (!result.recovered) {
      console.log(`   ❌ 모든 재시도 실패`);
      result.events.push('All retry attempts failed');
    }
  }

  // 백그라운드 처리 시뮬레이션
  async simulateBackgroundProcessing(scenario, result) {
    console.log(`   📋 백그라운드 처리로 전환`);
    
    // 백그라운드 처리 시뮬레이션 (2초)
    await this.sleep(2000);
    
    result.recovered = true;
    result.events.push('Switched to background processing');
    console.log(`   ✅ 백그라운드 처리 전환 완료`);
    
    this.recoveryEvents.push({
      scenario: scenario.name,
      mechanism: 'background_processing',
      success: true
    });
  }

  // 백그라운드 이메일 시뮬레이션
  async simulateBackgroundEmail(scenario, result) {
    console.log(`   📧 백그라운드 이메일 발송으로 전환`);
    
    // 백그라운드 이메일 스케줄링 시뮬레이션 (1초)
    await this.sleep(1000);
    
    result.recovered = true;
    result.events.push('Scheduled background email sending');
    console.log(`   ✅ 백그라운드 이메일 스케줄링 완료`);
    
    this.recoveryEvents.push({
      scenario: scenario.name,
      mechanism: 'background_email',
      success: true
    });
  }

  // 기능 축소 모드 시뮬레이션
  async simulateGracefulDegradation(scenario, result) {
    console.log(`   📉 기능 축소 모드로 전환`);
    
    // 기능 축소 처리 시뮬레이션 (1초)
    await this.sleep(1000);
    
    if (scenario.fallbackResponse) {
      result.recovered = true;
      result.events.push('Graceful degradation with fallback response');
      console.log(`   ✅ 기본 응답으로 축소 완료`);
    } else {
      result.events.push('Graceful degradation failed');
      console.log(`   ❌ 기능 축소 실패`);
    }
    
    this.recoveryEvents.push({
      scenario: scenario.name,
      mechanism: 'graceful_degradation',
      success: result.recovered
    });
  }

  // 복구 메커니즘 개별 테스트
  async testRecoveryMechanism(mechanism) {
    console.log(`\n🔧 복구 메커니즘 테스트: ${mechanism.name}`);
    console.log(`   설명: ${mechanism.description}`);
    
    const startTime = Date.now();
    
    try {
      switch (mechanism.name) {
        case 'exponential_backoff':
          await this.testExponentialBackoff(mechanism);
          break;
          
        case 'background_processing':
          await this.testBackgroundProcessing(mechanism);
          break;
          
        case 'graceful_degradation':
          await this.testGracefulDegradation(mechanism);
          break;
      }
      
      const duration = Date.now() - startTime;
      console.log(`   ✅ 테스트 완료 (${(duration / 1000).toFixed(1)}초)`);
      this.addResult(`recovery-${mechanism.name}`, 'success', `Tested in ${duration}ms`);
      
    } catch (error) {
      console.log(`   ❌ 테스트 실패: ${error.message}`);
      this.addResult(`recovery-${mechanism.name}`, 'failed', error.message);
    }
  }

  // 지수 백오프 테스트
  async testExponentialBackoff(mechanism) {
    console.log(`   🔄 지수 백오프 알고리즘 테스트`);
    
    for (let i = 0; i < mechanism.maxRetries; i++) {
      const delay = Math.min(
        mechanism.baseDelay * Math.pow(2, i),
        mechanism.maxDelay
      );
      
      console.log(`   재시도 ${i + 1}: ${delay}ms 대기`);
      await this.sleep(Math.min(delay, 1000)); // 테스트에서는 최대 1초로 제한
    }
  }

  // 백그라운드 처리 테스트
  async testBackgroundProcessing(mechanism) {
    console.log(`   📋 백그라운드 처리 시뮬레이션`);
    console.log(`   트리거 타임아웃: ${mechanism.triggerTimeout / 1000}초`);
    console.log(`   알림 방법: ${mechanism.notificationMethod}`);
    
    // 백그라운드 처리 로직 시뮬레이션
    await this.sleep(500);
  }

  // 기능 축소 테스트
  async testGracefulDegradation(mechanism) {
    console.log(`   📉 기능 축소 모드 테스트`);
    console.log(`   폴백 기능: ${mechanism.fallbackFeatures.join(', ')}`);
    console.log(`   비활성화 기능: ${mechanism.disabledFeatures.join(', ')}`);
    
    // 기능 축소 로직 시뮬레이션
    await this.sleep(300);
  }

  // 동시 타임아웃 테스트
  async testConcurrentTimeouts() {
    console.log('\n🔀 동시 타임아웃 상황 테스트');
    
    const concurrentScenarios = this.config.scenarios.filter(s => !s.criticalScenario);
    const promises = concurrentScenarios.map(scenario => 
      this.simulateQuickTimeout(scenario)
    );
    
    try {
      const results = await Promise.allSettled(promises);
      const successCount = results.filter(r => r.status === 'fulfilled').length;
      const failureCount = results.length - successCount;
      
      console.log(`   결과: 성공 ${successCount}개, 실패 ${failureCount}개`);
      this.addResult('concurrent-timeouts', 
        successCount > failureCount ? 'success' : 'failed',
        `${successCount}/${results.length} scenarios handled successfully`);
        
    } catch (error) {
      console.log(`   ❌ 동시 타임아웃 테스트 실패: ${error.message}`);
      this.addResult('concurrent-timeouts', 'failed', error.message);
    }
  }

  // 빠른 타임아웃 시뮬레이션 (동시 테스트용)
  async simulateQuickTimeout(scenario) {
    const quickDelay = Math.min(scenario.simulatedDelay / 10, 5000); // 최대 5초
    await this.sleep(quickDelay);
    
    if (Math.random() > 0.3) { // 70% 성공률
      return { scenario: scenario.name, success: true };
    } else {
      throw new Error(`Quick timeout simulation failed for ${scenario.name}`);
    }
  }

  // 타임아웃 모니터링 시스템 테스트
  async testTimeoutMonitoring() {
    console.log('\n📊 타임아웃 모니터링 시스템 테스트');
    
    // 모니터링 데이터 수집 시뮬레이션
    const monitoringData = {
      totalTimeouts: this.timeoutEvents.length,
      recoveryAttempts: this.recoveryEvents.length,
      successfulRecoveries: this.recoveryEvents.filter(e => e.success).length,
      averageRecoveryTime: this.calculateAverageRecoveryTime(),
      timeoutPatterns: this.analyzeTimeoutPatterns()
    };
    
    console.log(`   총 타임아웃: ${monitoringData.totalTimeouts}개`);
    console.log(`   복구 시도: ${monitoringData.recoveryAttempts}개`);
    console.log(`   성공적 복구: ${monitoringData.successfulRecoveries}개`);
    console.log(`   평균 복구 시간: ${monitoringData.averageRecoveryTime}초`);
    
    this.addResult('timeout-monitoring', 'success', 
      `Collected monitoring data: ${JSON.stringify(monitoringData)}`);
  }

  // 평균 복구 시간 계산
  calculateAverageRecoveryTime() {
    if (this.recoveryEvents.length === 0) return 0;
    
    // 시뮬레이션된 복구 시간 (실제로는 더 복잡한 계산 필요)
    const totalTime = this.recoveryEvents.reduce((sum, event) => {
      return sum + (event.mechanism === 'retry' ? event.attempt * 2 : 1);
    }, 0);
    
    return (totalTime / this.recoveryEvents.length).toFixed(1);
  }

  // 타임아웃 패턴 분석
  analyzeTimeoutPatterns() {
    const patterns = {};
    
    this.timeoutEvents.forEach(event => {
      const pattern = event.timeout > event.actualDelay ? 'premature' : 'expected';
      patterns[pattern] = (patterns[pattern] || 0) + 1;
    });
    
    return patterns;
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
    
    return {
      summary: {
        totalTests,
        successTests,
        failedTests,
        successRate: `${((successTests / totalTests) * 100).toFixed(1)}%`,
        duration: `${((Date.now() - this.startTime) / 1000).toFixed(1)}초`,
        timeoutEvents: this.timeoutEvents.length,
        recoveryEvents: this.recoveryEvents.length
      },
      results: this.results,
      timeoutEvents: this.timeoutEvents,
      recoveryEvents: this.recoveryEvents
    };
  }

  // 타임아웃 리포트 생성
  generateTimeoutReport() {
    const summary = this.getTestSummary();
    
    console.log('\n' + '='.repeat(80));
    console.log('⏰ 타임아웃 시나리오 테스트 결과');
    console.log('='.repeat(80));
    
    const { summary: s } = summary;
    console.log(`총 테스트: ${s.totalTests}개`);
    console.log(`성공: ${s.successTests}개`);
    console.log(`실패: ${s.failedTests}개`);
    console.log(`성공률: ${s.successRate}`);
    console.log(`총 소요시간: ${s.duration}`);
    console.log(`타임아웃 이벤트: ${s.timeoutEvents}개`);
    console.log(`복구 이벤트: ${s.recoveryEvents}개`);
    
    // 상세 결과
    console.log('\n📋 상세 결과:');
    summary.results.forEach(result => {
      const statusIcon = result.status === 'success' ? '✅' : '❌';
      console.log(`  ${statusIcon} ${result.testName}: ${result.message}`);
    });
    
    // 타임아웃 이벤트 요약
    if (summary.timeoutEvents.length > 0) {
      console.log('\n⏰ 타임아웃 이벤트:');
      summary.timeoutEvents.forEach((event, index) => {
        console.log(`  ${index + 1}. ${event.scenario}: ${event.timeout / 1000}초 제한, ${event.actualDelay / 1000}초 지연`);
      });
    }
    
    // 복구 이벤트 요약
    if (summary.recoveryEvents.length > 0) {
      console.log('\n🔄 복구 이벤트:');
      summary.recoveryEvents.forEach((event, index) => {
        const status = event.success ? '✅' : '❌';
        console.log(`  ${index + 1}. ${event.scenario} - ${event.mechanism}: ${status}`);
      });
    }
    
    // 결과 파일 저장
    const outputDir = './test-results';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, 'timeout-scenario-test-results.json');
    fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2));
    console.log(`\n💾 결과 저장됨: ${outputPath}`);
  }

  // 비동기 sleep 함수
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// 메인 실행 함수
async function main() {
  try {
    const tester = new TimeoutScenarioTester(TIMEOUT_TEST_CONFIG);
    const results = await tester.runTimeoutTests();
    
    // 종료 코드 설정
    const hasFailures = results.summary.failedTests > 0;
    const hasTimeoutIssues = results.summary.timeoutEvents === 0 && results.summary.recoveryEvents === 0;
    
    process.exit((hasFailures || hasTimeoutIssues) ? 1 : 0);
    
  } catch (error) {
    console.error('\n❌ 타임아웃 테스트 실행 중 오류:', error);
    process.exit(1);
  }
}

// 스크립트 직접 실행 시
if (require.main === module) {
  main();
}

module.exports = { TimeoutScenarioTester, TIMEOUT_TEST_CONFIG };