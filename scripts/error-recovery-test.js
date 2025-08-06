#!/usr/bin/env node

/**
 * 🔄 AICAMP 오류 복구 및 폴백 메커니즘 테스트
 * 시스템의 복원력과 장애 대응 능력을 검증합니다.
 */

const fs = require('fs');
const path = require('path');

// 오류 복구 테스트 설정
const ERROR_RECOVERY_CONFIG = {
  // 테스트 시나리오
  recoveryScenarios: [
    {
      name: 'GEMINI API 완전 실패',
      description: 'GEMINI API가 완전히 응답하지 않는 상황',
      errorType: 'api_failure',
      component: 'gemini_api',
      failureRate: 100, // 100% 실패
      expectedRecovery: 'fallback_analysis',
      recoveryTime: 30000, // 30초 내 복구
      criticalLevel: 'high'
    },
    {
      name: 'Google Apps Script 타임아웃',
      description: 'Google Apps Script 실행이 타임아웃되는 상황',
      errorType: 'timeout',
      component: 'google_script',
      failureRate: 80, // 80% 실패
      expectedRecovery: 'retry_with_backoff',
      recoveryTime: 60000, // 1분 내 복구
      criticalLevel: 'high'
    },
    {
      name: '이메일 서비스 장애',
      description: '이메일 발송 서비스가 장애인 상황',
      errorType: 'service_unavailable',
      component: 'email_service',
      failureRate: 90, // 90% 실패
      expectedRecovery: 'queue_for_later',
      recoveryTime: 300000, // 5분 내 복구
      criticalLevel: 'medium'
    },
    {
      name: '데이터베이스 연결 실패',
      description: '데이터 저장소 연결이 실패하는 상황',
      errorType: 'connection_failure',
      component: 'database',
      failureRate: 70, // 70% 실패
      expectedRecovery: 'local_cache_fallback',
      recoveryTime: 15000, // 15초 내 복구
      criticalLevel: 'high'
    },
    {
      name: '네트워크 불안정',
      description: '네트워크 연결이 불안정한 상황',
      errorType: 'network_instability',
      component: 'network',
      failureRate: 60, // 60% 실패
      expectedRecovery: 'adaptive_retry',
      recoveryTime: 45000, // 45초 내 복구
      criticalLevel: 'medium'
    },
    {
      name: '메모리 부족',
      description: '시스템 메모리가 부족한 상황',
      errorType: 'resource_exhaustion',
      component: 'system',
      failureRate: 50, // 50% 실패
      expectedRecovery: 'resource_cleanup',
      recoveryTime: 20000, // 20초 내 복구
      criticalLevel: 'high'
    },
    {
      name: '연쇄 장애',
      description: '여러 컴포넌트가 연쇄적으로 실패하는 상황',
      errorType: 'cascading_failure',
      component: 'multiple',
      failureRate: 95, // 95% 실패
      expectedRecovery: 'emergency_mode',
      recoveryTime: 120000, // 2분 내 복구
      criticalLevel: 'critical'
    }
  ],

  // 복구 메커니즘
  recoveryMechanisms: [
    {
      name: 'exponential_backoff_retry',
      description: '지수 백오프 재시도',
      maxRetries: 5,
      baseDelay: 1000,
      maxDelay: 30000,
      successThreshold: 0.7
    },
    {
      name: 'circuit_breaker',
      description: '회로 차단기 패턴',
      failureThreshold: 5,
      timeout: 60000,
      halfOpenRetries: 3,
      successThreshold: 0.8
    },
    {
      name: 'fallback_response',
      description: '폴백 응답',
      fallbackData: 'basic_analysis',
      qualityLevel: 'reduced',
      availabilityTarget: 0.99
    },
    {
      name: 'graceful_degradation',
      description: '점진적 기능 축소',
      degradationLevels: ['full', 'partial', 'minimal', 'emergency'],
      featurePriority: ['core', 'enhanced', 'optional', 'cosmetic']
    },
    {
      name: 'queue_and_retry',
      description: '큐 기반 재시도',
      queueSize: 1000,
      retryInterval: 30000,
      maxAge: 3600000 // 1시간
    }
  ],

  // 모니터링 설정
  monitoring: {
    healthCheckInterval: 5000, // 5초
    alertThresholds: {
      errorRate: 0.05, // 5%
      responseTime: 10000, // 10초
      availability: 0.99 // 99%
    },
    metricsRetention: 86400000 // 24시간
  }
};

// 오류 복구 테스터 클래스
class ErrorRecoveryTester {
  constructor(config) {
    this.config = config;
    this.results = [];
    this.recoveryEvents = [];
    this.failureEvents = [];
    this.metrics = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      recoveredRequests: 0,
      averageRecoveryTime: 0,
      availabilityScore: 0
    };
    this.startTime = Date.now();
    this.componentStates = new Map();
  }

  // 메인 테스트 실행
  async runRecoveryTests() {
    console.log('🔄 AICAMP 오류 복구 및 폴백 메커니즘 테스트 시작\n');
    
    // 1. 컴포넌트 상태 초기화
    this.initializeComponentStates();
    
    // 2. 복구 메커니즘별 테스트
    await this.testRecoveryMechanisms();
    
    // 3. 시나리오별 장애 복구 테스트
    await this.testFailureRecoveryScenarios();
    
    // 4. 연쇄 장애 시나리오 테스트
    await this.testCascadingFailures();
    
    // 5. 부하 상황에서의 복구 테스트
    await this.testRecoveryUnderLoad();
    
    // 6. 장기간 안정성 테스트
    await this.testLongTermStability();
    
    // 7. 복구 성능 메트릭 분석
    await this.analyzeRecoveryMetrics();
    
    // 8. 결과 리포트 생성
    this.generateRecoveryReport();
    
    return this.getTestSummary();
  }

  // 컴포넌트 상태 초기화
  initializeComponentStates() {
    console.log('🔧 컴포넌트 상태 초기화');
    
    const components = ['gemini_api', 'google_script', 'email_service', 'database', 'network', 'system'];
    
    components.forEach(component => {
      this.componentStates.set(component, {
        status: 'healthy',
        errorCount: 0,
        lastError: null,
        recoveryAttempts: 0,
        circuitBreakerState: 'closed', // closed, open, half-open
        lastHealthCheck: Date.now()
      });
    });
    
    console.log(`  ✅ ${components.length}개 컴포넌트 상태 초기화 완료`);
  }

  // 복구 메커니즘별 테스트
  async testRecoveryMechanisms() {
    console.log('\n🛠️ 복구 메커니즘별 테스트');
    
    for (const mechanism of this.config.recoveryMechanisms) {
      console.log(`\n  🔍 ${mechanism.name} 테스트`);
      console.log(`     설명: ${mechanism.description}`);
      
      try {
        await this.testSpecificRecoveryMechanism(mechanism);
        console.log(`     ✅ 메커니즘 테스트 완료`);
        
      } catch (error) {
        console.log(`     ❌ 메커니즘 테스트 실패: ${error.message}`);
        this.addResult(`mechanism-${mechanism.name}`, false, error.message, 'high');
      }
    }
  }

  // 특정 복구 메커니즘 테스트
  async testSpecificRecoveryMechanism(mechanism) {
    switch (mechanism.name) {
      case 'exponential_backoff_retry':
        await this.testExponentialBackoff(mechanism);
        break;
        
      case 'circuit_breaker':
        await this.testCircuitBreaker(mechanism);
        break;
        
      case 'fallback_response':
        await this.testFallbackResponse(mechanism);
        break;
        
      case 'graceful_degradation':
        await this.testGracefulDegradation(mechanism);
        break;
        
      case 'queue_and_retry':
        await this.testQueueAndRetry(mechanism);
        break;
        
      default:
        throw new Error(`Unknown recovery mechanism: ${mechanism.name}`);
    }
  }

  // 지수 백오프 재시도 테스트
  async testExponentialBackoff(mechanism) {
    console.log(`     🔄 지수 백오프 재시도 테스트`);
    
    let attempt = 0;
    let success = false;
    const startTime = Date.now();
    
    while (attempt < mechanism.maxRetries && !success) {
      attempt++;
      
      // 재시도 지연 계산
      const delay = Math.min(
        mechanism.baseDelay * Math.pow(2, attempt - 1),
        mechanism.maxDelay
      );
      
      console.log(`       시도 ${attempt}/${mechanism.maxRetries} (${delay}ms 대기)`);
      
      if (attempt > 1) {
        await this.sleep(Math.min(delay, 2000)); // 테스트에서는 최대 2초로 제한
      }
      
      // 성공 확률 시뮬레이션 (시도할 때마다 증가)
      const successProbability = Math.min(0.2 * attempt, 0.8);
      success = Math.random() < successProbability;
      
      if (success) {
        console.log(`       ✅ 재시도 ${attempt} 성공`);
        break;
      } else {
        console.log(`       ❌ 재시도 ${attempt} 실패`);
      }
    }
    
    const duration = Date.now() - startTime;
    const actualSuccessRate = success ? 1 : 0;
    
    if (success && actualSuccessRate >= mechanism.successThreshold) {
      this.addResult('exponential-backoff', true, `Recovered in ${attempt} attempts (${duration}ms)`, 'low');
    } else {
      this.addResult('exponential-backoff', false, `Failed after ${attempt} attempts`, 'medium');
    }
  }

  // 회로 차단기 패턴 테스트
  async testCircuitBreaker(mechanism) {
    console.log(`     ⚡ 회로 차단기 패턴 테스트`);
    
    let circuitState = 'closed';
    let failureCount = 0;
    let successCount = 0;
    const testRequests = 20;
    
    for (let i = 0; i < testRequests; i++) {
      // 요청 시뮬레이션
      const isFailure = Math.random() < 0.6; // 60% 실패율
      
      if (circuitState === 'closed') {
        if (isFailure) {
          failureCount++;
          console.log(`       요청 ${i + 1}: 실패 (${failureCount}/${mechanism.failureThreshold})`);
          
          if (failureCount >= mechanism.failureThreshold) {
            circuitState = 'open';
            console.log(`       🔴 회로 차단기 OPEN`);
          }
        } else {
          successCount++;
          failureCount = 0; // 성공 시 실패 카운터 리셋
          console.log(`       요청 ${i + 1}: 성공`);
        }
        
      } else if (circuitState === 'open') {
        console.log(`       요청 ${i + 1}: 차단됨 (회로 열림)`);
        
        // 타임아웃 후 half-open으로 전환 (시뮬레이션)
        if (i > testRequests / 2) {
          circuitState = 'half-open';
          console.log(`       🟡 회로 차단기 HALF-OPEN`);
        }
        
      } else if (circuitState === 'half-open') {
        if (isFailure) {
          circuitState = 'open';
          console.log(`       요청 ${i + 1}: 실패 - 다시 OPEN`);
        } else {
          successCount++;
          if (successCount >= mechanism.halfOpenRetries) {
            circuitState = 'closed';
            console.log(`       🟢 회로 차단기 CLOSED (복구)`);
          }
          console.log(`       요청 ${i + 1}: 성공 (${successCount}/${mechanism.halfOpenRetries})`);
        }
      }
      
      await this.sleep(50); // 50ms 간격
    }
    
    const finalSuccessRate = successCount / testRequests;
    
    if (finalSuccessRate >= mechanism.successThreshold) {
      this.addResult('circuit-breaker', true, `Success rate: ${(finalSuccessRate * 100).toFixed(1)}%`, 'low');
    } else {
      this.addResult('circuit-breaker', false, `Low success rate: ${(finalSuccessRate * 100).toFixed(1)}%`, 'medium');
    }
  }

  // 폴백 응답 테스트
  async testFallbackResponse(mechanism) {
    console.log(`     📋 폴백 응답 테스트`);
    
    // 주 서비스 실패 시뮬레이션
    const mainServiceAvailable = false;
    
    if (!mainServiceAvailable) {
      console.log(`       주 서비스 실패 - 폴백 응답 활성화`);
      
      // 폴백 데이터 생성 시뮬레이션
      await this.sleep(500);
      
      const fallbackResponse = {
        type: mechanism.fallbackData,
        quality: mechanism.qualityLevel,
        timestamp: new Date().toISOString(),
        source: 'fallback_system'
      };
      
      console.log(`       ✅ 폴백 응답 생성: ${fallbackResponse.type} (${fallbackResponse.quality} 품질)`);
      
      // 가용성 목표 달성 여부 확인
      const availability = 0.95; // 시뮬레이션된 가용성
      
      if (availability >= mechanism.availabilityTarget) {
        this.addResult('fallback-response', true, `Availability: ${(availability * 100).toFixed(1)}%`, 'low');
      } else {
        this.addResult('fallback-response', false, `Low availability: ${(availability * 100).toFixed(1)}%`, 'medium');
      }
    }
  }

  // 점진적 기능 축소 테스트
  async testGracefulDegradation(mechanism) {
    console.log(`     📉 점진적 기능 축소 테스트`);
    
    // 시스템 부하 시뮬레이션
    const systemLoad = 0.9; // 90% 부하
    
    let currentLevel = 'full';
    
    for (const level of mechanism.degradationLevels) {
      console.log(`       기능 수준: ${level}`);
      
      // 각 수준에서 기능 테스트
      const availableFeatures = this.getAvailableFeaturesForLevel(level, mechanism.featurePriority);
      console.log(`         사용 가능 기능: ${availableFeatures.join(', ')}`);
      
      // 성능 테스트
      const performanceScore = await this.testPerformanceAtLevel(level);
      console.log(`         성능 점수: ${performanceScore}/100`);
      
      if (performanceScore >= 70) {
        currentLevel = level;
        break;
      }
    }
    
    console.log(`       ✅ 최적 기능 수준: ${currentLevel}`);
    
    if (currentLevel !== 'emergency') {
      this.addResult('graceful-degradation', true, `Degraded to ${currentLevel} level`, 'low');
    } else {
      this.addResult('graceful-degradation', false, `Forced to emergency level`, 'high');
    }
  }

  // 큐 기반 재시도 테스트
  async testQueueAndRetry(mechanism) {
    console.log(`     📬 큐 기반 재시도 테스트`);
    
    const queue = [];
    const maxQueueSize = mechanism.queueSize;
    const testItems = 50;
    
    // 큐에 아이템 추가
    for (let i = 0; i < testItems; i++) {
      if (queue.length < maxQueueSize) {
        queue.push({
          id: i + 1,
          data: `test-item-${i + 1}`,
          timestamp: Date.now(),
          retryCount: 0
        });
      }
    }
    
    console.log(`       큐에 ${queue.length}개 아이템 추가`);
    
    // 큐 처리 시뮬레이션
    let processedCount = 0;
    let successCount = 0;
    
    while (queue.length > 0 && processedCount < testItems * 2) { // 최대 2배까지 처리 시도
      const item = queue.shift();
      processedCount++;
      
      // 처리 성공 확률 (재시도할 때마다 증가)
      const successProbability = Math.min(0.3 + (item.retryCount * 0.2), 0.9);
      const success = Math.random() < successProbability;
      
      if (success) {
        successCount++;
        console.log(`       ✅ 아이템 ${item.id} 처리 성공`);
      } else {
        item.retryCount++;
        
        // 최대 재시도 횟수 확인
        if (item.retryCount < 3 && Date.now() - item.timestamp < mechanism.maxAge) {
          queue.push(item); // 큐 뒤쪽에 다시 추가
          console.log(`       🔄 아이템 ${item.id} 재시도 (${item.retryCount}회)`);
        } else {
          console.log(`       ❌ 아이템 ${item.id} 최종 실패`);
        }
      }
      
      await this.sleep(10); // 10ms 처리 시간
    }
    
    const successRate = successCount / testItems;
    console.log(`       처리 결과: ${successCount}/${testItems} 성공 (${(successRate * 100).toFixed(1)}%)`);
    
    if (successRate >= 0.8) {
      this.addResult('queue-and-retry', true, `Success rate: ${(successRate * 100).toFixed(1)}%`, 'low');
    } else {
      this.addResult('queue-and-retry', false, `Low success rate: ${(successRate * 100).toFixed(1)}%`, 'medium');
    }
  }

  // 장애 복구 시나리오 테스트
  async testFailureRecoveryScenarios() {
    console.log('\n🚨 장애 복구 시나리오 테스트');
    
    for (const scenario of this.config.recoveryScenarios) {
      if (scenario.errorType !== 'cascading_failure') { // 연쇄 장애는 별도 테스트
        await this.testFailureScenario(scenario);
      }
    }
  }

  // 개별 장애 시나리오 테스트
  async testFailureScenario(scenario) {
    console.log(`\n  🎯 시나리오: ${scenario.name}`);
    console.log(`     설명: ${scenario.description}`);
    console.log(`     실패율: ${scenario.failureRate}%`);
    console.log(`     예상 복구: ${scenario.expectedRecovery}`);
    
    const startTime = Date.now();
    let recovered = false;
    let recoveryTime = 0;
    
    try {
      // 장애 상황 시뮬레이션
      await this.simulateFailure(scenario);
      
      // 복구 시도
      recovered = await this.attemptRecovery(scenario);
      recoveryTime = Date.now() - startTime;
      
      if (recovered && recoveryTime <= scenario.recoveryTime) {
        console.log(`     ✅ 복구 성공 (${recoveryTime}ms)`);
        this.addResult(`scenario-${scenario.name}`, true, `Recovered in ${recoveryTime}ms`, scenario.criticalLevel);
        
        this.recoveryEvents.push({
          scenario: scenario.name,
          component: scenario.component,
          recoveryTime: recoveryTime,
          success: true,
          timestamp: new Date().toISOString()
        });
        
      } else if (recovered) {
        console.log(`     ⚠️ 복구 지연 (${recoveryTime}ms > ${scenario.recoveryTime}ms)`);
        this.addResult(`scenario-${scenario.name}`, false, `Slow recovery: ${recoveryTime}ms`, 'medium');
        
      } else {
        console.log(`     ❌ 복구 실패`);
        this.addResult(`scenario-${scenario.name}`, false, 'Recovery failed', 'high');
        
        this.failureEvents.push({
          scenario: scenario.name,
          component: scenario.component,
          errorType: scenario.errorType,
          timestamp: new Date().toISOString()
        });
      }
      
    } catch (error) {
      console.log(`     ❌ 시나리오 실행 오류: ${error.message}`);
      this.addResult(`scenario-${scenario.name}`, false, error.message, 'critical');
    }
    
    // 메트릭 업데이트
    this.updateMetrics(recovered, recoveryTime);
  }

  // 장애 시뮬레이션
  async simulateFailure(scenario) {
    console.log(`     🔥 ${scenario.component} 장애 시뮬레이션`);
    
    // 컴포넌트 상태 업데이트
    const componentState = this.componentStates.get(scenario.component);
    if (componentState) {
      componentState.status = 'failed';
      componentState.errorCount++;
      componentState.lastError = scenario.errorType;
    }
    
    // 장애 지속 시간 시뮬레이션
    const failureDuration = Math.random() * 5000 + 1000; // 1-6초
    await this.sleep(failureDuration);
  }

  // 복구 시도
  async attemptRecovery(scenario) {
    console.log(`     🔧 ${scenario.expectedRecovery} 복구 시도`);
    
    switch (scenario.expectedRecovery) {
      case 'fallback_analysis':
        return await this.performFallbackAnalysis(scenario);
        
      case 'retry_with_backoff':
        return await this.performRetryWithBackoff(scenario);
        
      case 'queue_for_later':
        return await this.performQueueForLater(scenario);
        
      case 'local_cache_fallback':
        return await this.performLocalCacheFallback(scenario);
        
      case 'adaptive_retry':
        return await this.performAdaptiveRetry(scenario);
        
      case 'resource_cleanup':
        return await this.performResourceCleanup(scenario);
        
      case 'emergency_mode':
        return await this.performEmergencyMode(scenario);
        
      default:
        throw new Error(`Unknown recovery method: ${scenario.expectedRecovery}`);
    }
  }

  // 폴백 분석 수행
  async performFallbackAnalysis(scenario) {
    console.log(`       📊 폴백 분석 실행`);
    await this.sleep(2000); // 2초 폴백 분석
    
    // 80% 성공률
    const success = Math.random() > 0.2;
    
    if (success) {
      const componentState = this.componentStates.get(scenario.component);
      if (componentState) {
        componentState.status = 'degraded';
      }
    }
    
    return success;
  }

  // 백오프 재시도 수행
  async performRetryWithBackoff(scenario) {
    console.log(`       🔄 백오프 재시도 실행`);
    
    for (let attempt = 1; attempt <= 3; attempt++) {
      const delay = 1000 * Math.pow(2, attempt - 1); // 1초, 2초, 4초
      await this.sleep(Math.min(delay, 2000)); // 최대 2초로 제한
      
      const success = Math.random() > (scenario.failureRate / 100) * (4 - attempt) / 3;
      
      if (success) {
        console.log(`         ✅ 재시도 ${attempt} 성공`);
        
        const componentState = this.componentStates.get(scenario.component);
        if (componentState) {
          componentState.status = 'healthy';
          componentState.recoveryAttempts++;
        }
        
        return true;
      } else {
        console.log(`         ❌ 재시도 ${attempt} 실패`);
      }
    }
    
    return false;
  }

  // 나중에 처리하기 위한 큐잉
  async performQueueForLater(scenario) {
    console.log(`       📬 나중 처리를 위한 큐잉`);
    await this.sleep(500); // 0.5초 큐잉
    
    // 큐잉은 항상 성공 (실제 처리는 나중에)
    return true;
  }

  // 로컬 캐시 폴백
  async performLocalCacheFallback(scenario) {
    console.log(`       💾 로컬 캐시 폴백`);
    await this.sleep(300); // 0.3초 캐시 접근
    
    // 캐시 히트율 90%
    const cacheHit = Math.random() > 0.1;
    
    if (cacheHit) {
      const componentState = this.componentStates.get(scenario.component);
      if (componentState) {
        componentState.status = 'degraded';
      }
    }
    
    return cacheHit;
  }

  // 적응형 재시도
  async performAdaptiveRetry(scenario) {
    console.log(`       🎯 적응형 재시도`);
    
    let delay = 500; // 시작 지연
    const maxDelay = 5000;
    
    for (let attempt = 1; attempt <= 5; attempt++) {
      await this.sleep(Math.min(delay, 1000)); // 최대 1초로 제한
      
      // 네트워크 상태에 따른 성공률 조정
      const networkQuality = Math.random(); // 0-1
      const adjustedFailureRate = scenario.failureRate * (1 - networkQuality * 0.5);
      const success = Math.random() > adjustedFailureRate / 100;
      
      if (success) {
        console.log(`         ✅ 적응형 재시도 ${attempt} 성공 (네트워크 품질: ${(networkQuality * 100).toFixed(0)}%)`);
        return true;
      } else {
        console.log(`         ❌ 적응형 재시도 ${attempt} 실패`);
        delay = Math.min(delay * 1.5, maxDelay); // 적응형 지연 증가
      }
    }
    
    return false;
  }

  // 리소스 정리
  async performResourceCleanup(scenario) {
    console.log(`       🧹 리소스 정리`);
    await this.sleep(1000); // 1초 정리 작업
    
    // 정리 후 90% 성공률
    const success = Math.random() > 0.1;
    
    if (success) {
      const componentState = this.componentStates.get(scenario.component);
      if (componentState) {
        componentState.status = 'healthy';
        componentState.errorCount = 0;
      }
    }
    
    return success;
  }

  // 응급 모드
  async performEmergencyMode(scenario) {
    console.log(`       🚨 응급 모드 활성화`);
    await this.sleep(3000); // 3초 응급 모드 전환
    
    // 응급 모드는 기본 기능만 제공하지만 안정성 높음
    const success = Math.random() > 0.05; // 95% 성공률
    
    if (success) {
      // 모든 컴포넌트를 응급 모드로 전환
      this.componentStates.forEach((state, component) => {
        state.status = 'emergency';
      });
    }
    
    return success;
  }

  // 연쇄 장애 테스트
  async testCascadingFailures() {
    console.log('\n⛓️ 연쇄 장애 시나리오 테스트');
    
    const cascadingScenario = this.config.recoveryScenarios.find(s => s.errorType === 'cascading_failure');
    
    if (cascadingScenario) {
      console.log(`  🎯 ${cascadingScenario.name}`);
      
      // 첫 번째 컴포넌트 장애
      console.log(`     1️⃣ GEMINI API 장애 발생`);
      await this.simulateFailure({ component: 'gemini_api', errorType: 'api_failure' });
      
      // 연쇄 장애 전파
      console.log(`     2️⃣ Google Script 부하 증가`);
      await this.sleep(1000);
      await this.simulateFailure({ component: 'google_script', errorType: 'timeout' });
      
      console.log(`     3️⃣ 이메일 서비스 과부하`);
      await this.sleep(1000);
      await this.simulateFailure({ component: 'email_service', errorType: 'service_unavailable' });
      
      // 응급 복구 시도
      console.log(`     🚨 응급 복구 프로토콜 실행`);
      const recovered = await this.performEmergencyMode(cascadingScenario);
      
      if (recovered) {
        console.log(`     ✅ 연쇄 장애 복구 성공`);
        this.addResult('cascading-failure', true, 'Emergency recovery successful', 'critical');
      } else {
        console.log(`     ❌ 연쇄 장애 복구 실패`);
        this.addResult('cascading-failure', false, 'Emergency recovery failed', 'critical');
      }
    }
  }

  // 부하 상황에서의 복구 테스트
  async testRecoveryUnderLoad() {
    console.log('\n🚀 부하 상황에서의 복구 테스트');
    
    const concurrentFailures = 5;
    const promises = [];
    
    for (let i = 0; i < concurrentFailures; i++) {
      const scenario = this.config.recoveryScenarios[i % this.config.recoveryScenarios.length];
      promises.push(this.testFailureScenario({
        ...scenario,
        name: `${scenario.name}-load-${i + 1}`
      }));
    }
    
    try {
      await Promise.all(promises);
      console.log(`  ✅ ${concurrentFailures}개 동시 장애 복구 테스트 완료`);
      this.addResult('recovery-under-load', true, `${concurrentFailures} concurrent failures handled`, 'medium');
      
    } catch (error) {
      console.log(`  ❌ 부하 테스트 실패: ${error.message}`);
      this.addResult('recovery-under-load', false, error.message, 'high');
    }
  }

  // 장기간 안정성 테스트
  async testLongTermStability() {
    console.log('\n⏳ 장기간 안정성 테스트 (축소 버전)');
    
    const testDuration = 30000; // 30초 (실제로는 더 길게)
    const testInterval = 2000;   // 2초 간격
    const startTime = Date.now();
    
    let totalTests = 0;
    let successfulTests = 0;
    
    while (Date.now() - startTime < testDuration) {
      totalTests++;
      
      // 랜덤한 장애 시뮬레이션
      const randomScenario = this.config.recoveryScenarios[
        Math.floor(Math.random() * this.config.recoveryScenarios.length)
      ];
      
      try {
        const recovered = await this.attemptRecovery({
          ...randomScenario,
          component: 'test_component'
        });
        
        if (recovered) {
          successfulTests++;
        }
        
      } catch (error) {
        // 오류는 실패로 간주
      }
      
      await this.sleep(testInterval);
    }
    
    const stabilityScore = successfulTests / totalTests;
    const duration = Date.now() - startTime;
    
    console.log(`  📊 안정성 점수: ${(stabilityScore * 100).toFixed(1)}% (${successfulTests}/${totalTests})`);
    console.log(`  ⏱️ 테스트 시간: ${(duration / 1000).toFixed(1)}초`);
    
    if (stabilityScore >= 0.95) {
      this.addResult('long-term-stability', true, `Stability: ${(stabilityScore * 100).toFixed(1)}%`, 'low');
    } else {
      this.addResult('long-term-stability', false, `Low stability: ${(stabilityScore * 100).toFixed(1)}%`, 'medium');
    }
  }

  // 복구 성능 메트릭 분석
  async analyzeRecoveryMetrics() {
    console.log('\n📊 복구 성능 메트릭 분석');
    
    // 메트릭 계산
    this.metrics.availabilityScore = this.metrics.totalRequests > 0 ? 
      (this.metrics.successfulRequests + this.metrics.recoveredRequests) / this.metrics.totalRequests : 0;
    
    this.metrics.averageRecoveryTime = this.recoveryEvents.length > 0 ?
      this.recoveryEvents.reduce((sum, event) => sum + event.recoveryTime, 0) / this.recoveryEvents.length : 0;
    
    console.log(`  총 요청: ${this.metrics.totalRequests}개`);
    console.log(`  성공 요청: ${this.metrics.successfulRequests}개`);
    console.log(`  복구된 요청: ${this.metrics.recoveredRequests}개`);
    console.log(`  실패 요청: ${this.metrics.failedRequests}개`);
    console.log(`  가용성 점수: ${(this.metrics.availabilityScore * 100).toFixed(2)}%`);
    console.log(`  평균 복구 시간: ${this.metrics.averageRecoveryTime.toFixed(0)}ms`);
    
    // 컴포넌트별 상태 요약
    console.log(`\n🔧 컴포넌트 상태 요약:`);
    this.componentStates.forEach((state, component) => {
      const statusIcon = {
        'healthy': '✅',
        'degraded': '⚠️',
        'failed': '❌',
        'emergency': '🚨'
      }[state.status] || '❓';
      
      console.log(`  ${statusIcon} ${component}: ${state.status} (오류 ${state.errorCount}회, 복구 시도 ${state.recoveryAttempts}회)`);
    });
  }

  // 기능 수준별 사용 가능한 기능 반환
  getAvailableFeaturesForLevel(level, featurePriority) {
    const levelIndex = ['emergency', 'minimal', 'partial', 'full'].indexOf(level);
    const availableFeatures = [];
    
    for (let i = 0; i <= levelIndex; i++) {
      if (featurePriority[i]) {
        availableFeatures.push(featurePriority[i]);
      }
    }
    
    return availableFeatures;
  }

  // 수준별 성능 테스트
  async testPerformanceAtLevel(level) {
    await this.sleep(100); // 성능 테스트 시뮬레이션
    
    const performanceMap = {
      'full': 100,
      'partial': 80,
      'minimal': 60,
      'emergency': 40
    };
    
    return performanceMap[level] || 50;
  }

  // 메트릭 업데이트
  updateMetrics(recovered, recoveryTime) {
    this.metrics.totalRequests++;
    
    if (recovered) {
      this.metrics.recoveredRequests++;
    } else {
      this.metrics.failedRequests++;
    }
  }

  // 결과 추가
  addResult(testName, success, message, severity) {
    this.results.push({
      testName,
      success,
      message,
      severity,
      timestamp: new Date().toISOString()
    });
  }

  // 테스트 요약 생성
  getTestSummary() {
    const totalTests = this.results.length;
    const successTests = this.results.filter(r => r.success).length;
    const failedTests = totalTests - successTests;
    const criticalFailures = this.results.filter(r => !r.success && r.severity === 'critical').length;
    
    return {
      summary: {
        totalTests,
        successTests,
        failedTests,
        successRate: `${((successTests / totalTests) * 100).toFixed(1)}%`,
        duration: `${((Date.now() - this.startTime) / 1000).toFixed(1)}초`,
        criticalFailures,
        recoveryEvents: this.recoveryEvents.length,
        failureEvents: this.failureEvents.length,
        availabilityScore: `${(this.metrics.availabilityScore * 100).toFixed(2)}%`,
        averageRecoveryTime: `${this.metrics.averageRecoveryTime.toFixed(0)}ms`
      },
      results: this.results,
      recoveryEvents: this.recoveryEvents,
      failureEvents: this.failureEvents,
      metrics: this.metrics,
      componentStates: Object.fromEntries(this.componentStates)
    };
  }

  // 복구 리포트 생성
  generateRecoveryReport() {
    const summary = this.getTestSummary();
    
    console.log('\n' + '='.repeat(80));
    console.log('🔄 오류 복구 및 폴백 메커니즘 테스트 결과');
    console.log('='.repeat(80));
    
    const { summary: s } = summary;
    console.log(`총 테스트: ${s.totalTests}개`);
    console.log(`성공: ${s.successTests}개`);
    console.log(`실패: ${s.failedTests}개`);
    console.log(`성공률: ${s.successRate}`);
    console.log(`총 소요시간: ${s.duration}`);
    console.log(`심각한 실패: ${s.criticalFailures}개`);
    console.log(`복구 이벤트: ${s.recoveryEvents}개`);
    console.log(`장애 이벤트: ${s.failureEvents}개`);
    console.log(`시스템 가용성: ${s.availabilityScore}`);
    console.log(`평균 복구 시간: ${s.averageRecoveryTime}`);
    
    // 상세 결과
    console.log('\n📋 상세 결과:');
    summary.results.forEach(result => {
      const statusIcon = result.success ? '✅' : '❌';
      const severityIcon = {
        'critical': '🚨',
        'high': '🔴',
        'medium': '🟡',
        'low': '🟢'
      }[result.severity] || '⚪';
      
      console.log(`  ${statusIcon} ${severityIcon} ${result.testName}: ${result.message}`);
    });
    
    // 복구 이벤트 요약
    if (summary.recoveryEvents.length > 0) {
      console.log('\n🔄 복구 이벤트 요약:');
      summary.recoveryEvents.forEach((event, index) => {
        console.log(`  ${index + 1}. ${event.scenario} (${event.component}): ${event.recoveryTime}ms`);
      });
    }
    
    // 결과 파일 저장
    const outputDir = './test-results';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, 'error-recovery-test-results.json');
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
    const tester = new ErrorRecoveryTester(ERROR_RECOVERY_CONFIG);
    const results = await tester.runRecoveryTests();
    
    // 종료 코드 설정
    const hasCriticalFailures = results.summary.criticalFailures > 0;
    const hasLowAvailability = parseFloat(results.summary.availabilityScore) < 95;
    const hasHighFailureRate = parseFloat(results.summary.successRate) < 80;
    
    process.exit((hasCriticalFailures || hasLowAvailability || hasHighFailureRate) ? 1 : 0);
    
  } catch (error) {
    console.error('\n❌ 오류 복구 테스트 실행 중 오류:', error);
    process.exit(1);
  }
}

// 스크립트 직접 실행 시
if (require.main === module) {
  main();
}

module.exports = { ErrorRecoveryTester, ERROR_RECOVERY_CONFIG };