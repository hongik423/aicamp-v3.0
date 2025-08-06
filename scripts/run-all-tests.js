#!/usr/bin/env node

/**
 * 🧪 AICAMP 통합 테스트 실행기
 * 모든 시뮬레이션 테스트를 순차적으로 실행하고 종합 결과를 생성합니다.
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// 통합 테스트 설정
const INTEGRATED_TEST_CONFIG = {
  testSuites: [
    {
      name: 'diagnosis-simulation-test',
      script: './scripts/diagnosis-simulation-test.js',
      description: '진단 프로세스 시뮬레이션 테스트',
      timeout: 300000, // 5분
      critical: true
    },
    {
      name: 'api-flow-test',
      script: './scripts/api-flow-test.js',
      description: 'API 플로우 심층 테스트',
      timeout: 600000, // 10분
      critical: true,
      requiresServer: true
    },
    {
      name: 'timeout-scenario-test',
      script: './scripts/timeout-scenario-test.js',
      description: '타임아웃 시나리오 테스트',
      timeout: 180000, // 3분
      critical: true
    },
    {
      name: 'data-validation-test',
      script: './scripts/data-validation-test.js',
      description: '데이터 유효성 검증 테스트',
      timeout: 240000, // 4분
      critical: true
    },
    {
      name: 'error-recovery-test',
      script: './scripts/error-recovery-test.js',
      description: '오류 복구 메커니즘 테스트',
      timeout: 360000, // 6분
      critical: true
    }
  ],
  
  // 실행 옵션
  options: {
    parallel: false, // 순차 실행
    stopOnFailure: false, // 실패해도 계속 진행
    generateReport: true,
    saveResults: true,
    outputDir: './test-results'
  },
  
  // 품질 기준
  qualityThresholds: {
    overallSuccessRate: 0.85, // 85% 이상
    criticalTestSuccessRate: 0.90, // 90% 이상
    maxFailedCriticalTests: 1,
    maxTotalFailures: 3
  }
};

// 통합 테스트 실행기 클래스
class IntegratedTestRunner {
  constructor(config) {
    this.config = config;
    this.results = [];
    this.startTime = Date.now();
    this.summary = {
      totalSuites: 0,
      passedSuites: 0,
      failedSuites: 0,
      skippedSuites: 0,
      totalDuration: 0,
      criticalFailures: 0
    };
  }

  // 메인 실행 함수
  async runAllTests() {
    console.log('🧪 AICAMP 통합 시뮬레이션 테스트 실행 시작');
    console.log('='.repeat(80));
    
    // 환경 확인
    await this.checkEnvironment();
    
    // 출력 디렉토리 준비
    this.prepareOutputDirectory();
    
    // 테스트 스위트 실행
    await this.executeTestSuites();
    
    // 결과 분석
    this.analyzeResults();
    
    // 종합 리포트 생성
    this.generateIntegratedReport();
    
    // 품질 게이트 검증
    const qualityGatePassed = this.validateQualityGate();
    
    return {
      summary: this.summary,
      results: this.results,
      qualityGatePassed
    };
  }

  // 환경 확인
  async checkEnvironment() {
    console.log('\n🔧 환경 확인');
    
    const checks = [
      { name: 'Node.js 버전', check: () => process.version },
      { name: '작업 디렉토리', check: () => process.cwd() },
      { name: '메모리 사용량', check: () => `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB` },
      { name: '플랫폼', check: () => process.platform }
    ];
    
    checks.forEach(({ name, check }) => {
      try {
        const result = check();
        console.log(`  ✅ ${name}: ${result}`);
      } catch (error) {
        console.log(`  ❌ ${name}: ${error.message}`);
      }
    });
    
    // 테스트 스크립트 존재 확인
    console.log('\n📁 테스트 스크립트 확인');
    for (const suite of this.config.testSuites) {
      if (fs.existsSync(suite.script)) {
        console.log(`  ✅ ${suite.name}: ${suite.script}`);
      } else {
        console.log(`  ❌ ${suite.name}: 스크립트 없음 - ${suite.script}`);
      }
    }
  }

  // 출력 디렉토리 준비
  prepareOutputDirectory() {
    const outputDir = this.config.options.outputDir;
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log(`\n📁 출력 디렉토리 생성: ${outputDir}`);
    } else {
      console.log(`\n📁 출력 디렉토리 사용: ${outputDir}`);
    }
  }

  // 테스트 스위트 실행
  async executeTestSuites() {
    console.log('\n🚀 테스트 스위트 실행 시작');
    
    this.summary.totalSuites = this.config.testSuites.length;
    
    if (this.config.options.parallel) {
      await this.executeTestSuitesParallel();
    } else {
      await this.executeTestSuitesSequential();
    }
  }

  // 순차 실행
  async executeTestSuitesSequential() {
    for (const suite of this.config.testSuites) {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`🎯 테스트 스위트: ${suite.name}`);
      console.log(`📝 설명: ${suite.description}`);
      console.log(`⏱️ 제한시간: ${suite.timeout / 1000}초`);
      console.log(`${'='.repeat(60)}`);
      
      const result = await this.executeTestSuite(suite);
      this.results.push(result);
      
      // 실패 시 중단 옵션 확인
      if (!result.success && this.config.options.stopOnFailure) {
        console.log(`\n🛑 ${suite.name} 실패로 인한 테스트 중단`);
        break;
      }
      
      // 메모리 정리
      if (global.gc) {
        global.gc();
      }
      
      // 스위트 간 대기 시간
      await this.sleep(2000);
    }
  }

  // 병렬 실행 (현재는 미사용)
  async executeTestSuitesParallel() {
    const promises = this.config.testSuites.map(suite => this.executeTestSuite(suite));
    this.results = await Promise.allSettled(promises);
  }

  // 개별 테스트 스위트 실행
  async executeTestSuite(suite) {
    const startTime = Date.now();
    
    const result = {
      name: suite.name,
      description: suite.description,
      success: false,
      duration: 0,
      output: '',
      error: null,
      critical: suite.critical,
      skipped: false,
      metrics: {}
    };
    
    try {
      // 스크립트 존재 확인
      if (!fs.existsSync(suite.script)) {
        throw new Error(`테스트 스크립트를 찾을 수 없습니다: ${suite.script}`);
      }
      
      // 서버 요구사항 확인 (API 테스트의 경우)
      if (suite.requiresServer) {
        const serverRunning = await this.checkServerStatus();
        if (!serverRunning) {
          console.log(`  ⚠️ 서버가 실행되지 않아 ${suite.name} 건너뜀`);
          result.skipped = true;
          result.error = 'Server not running';
          this.summary.skippedSuites++;
          return result;
        }
      }
      
      // 테스트 실행
      const { success, output, error } = await this.runScript(suite.script, suite.timeout);
      
      result.success = success;
      result.output = output;
      result.error = error;
      result.duration = Date.now() - startTime;
      
      // 결과 파싱 시도
      try {
        result.metrics = this.parseTestOutput(output);
      } catch (parseError) {
        console.log(`  ⚠️ 결과 파싱 실패: ${parseError.message}`);
      }
      
      // 요약 업데이트
      if (success) {
        this.summary.passedSuites++;
        console.log(`  ✅ ${suite.name} 성공 (${(result.duration / 1000).toFixed(1)}초)`);
      } else {
        this.summary.failedSuites++;
        if (suite.critical) {
          this.summary.criticalFailures++;
        }
        console.log(`  ❌ ${suite.name} 실패 (${(result.duration / 1000).toFixed(1)}초)`);
        if (error) {
          console.log(`     오류: ${error}`);
        }
      }
      
    } catch (error) {
      result.error = error.message;
      result.duration = Date.now() - startTime;
      this.summary.failedSuites++;
      
      if (suite.critical) {
        this.summary.criticalFailures++;
      }
      
      console.log(`  ❌ ${suite.name} 실행 오류: ${error.message}`);
    }
    
    return result;
  }

  // 스크립트 실행
  runScript(scriptPath, timeout) {
    return new Promise((resolve) => {
      let output = '';
      let error = '';
      
      const child = spawn('node', [scriptPath], {
        stdio: ['pipe', 'pipe', 'pipe'],
        timeout: timeout
      });
      
      child.stdout.on('data', (data) => {
        const chunk = data.toString();
        output += chunk;
        process.stdout.write(chunk); // 실시간 출력
      });
      
      child.stderr.on('data', (data) => {
        const chunk = data.toString();
        error += chunk;
        process.stderr.write(chunk); // 실시간 오류 출력
      });
      
      child.on('close', (code) => {
        resolve({
          success: code === 0,
          output,
          error: error || (code !== 0 ? `Process exited with code ${code}` : null)
        });
      });
      
      child.on('error', (err) => {
        resolve({
          success: false,
          output,
          error: err.message
        });
      });
      
      // 타임아웃 처리
      setTimeout(() => {
        if (!child.killed) {
          child.kill('SIGTERM');
          setTimeout(() => {
            if (!child.killed) {
              child.kill('SIGKILL');
            }
          }, 5000);
        }
      }, timeout);
    });
  }

  // 서버 상태 확인
  async checkServerStatus() {
    try {
      // fetch polyfill for Node.js
      if (typeof fetch === 'undefined') {
        global.fetch = require('node-fetch');
      }
      
      const response = await fetch('http://localhost:3000/api/health', {
        timeout: 5000
      });
      
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  // 테스트 출력 파싱
  parseTestOutput(output) {
    const metrics = {};
    
    try {
      // 성공률 추출
      const successRateMatch = output.match(/성공률:\s*(\d+\.?\d*)%/);
      if (successRateMatch) {
        metrics.successRate = parseFloat(successRateMatch[1]);
      }
      
      // 총 테스트 수 추출
      const totalTestsMatch = output.match(/총 테스트:\s*(\d+)개/);
      if (totalTestsMatch) {
        metrics.totalTests = parseInt(totalTestsMatch[1]);
      }
      
      // 소요시간 추출
      const durationMatch = output.match(/총 소요시간:\s*(\d+\.?\d*)초/);
      if (durationMatch) {
        metrics.duration = parseFloat(durationMatch[1]);
      }
      
      // 오류 수 추출
      const errorsMatch = output.match(/오류:\s*(\d+)개/);
      if (errorsMatch) {
        metrics.errors = parseInt(errorsMatch[1]);
      }
      
    } catch (error) {
      console.log(`메트릭 파싱 오류: ${error.message}`);
    }
    
    return metrics;
  }

  // 결과 분석
  analyzeResults() {
    console.log('\n📊 결과 분석');
    
    this.summary.totalDuration = Date.now() - this.startTime;
    
    // 전체 통계
    console.log(`\n📈 전체 통계:`);
    console.log(`  총 테스트 스위트: ${this.summary.totalSuites}개`);
    console.log(`  성공: ${this.summary.passedSuites}개`);
    console.log(`  실패: ${this.summary.failedSuites}개`);
    console.log(`  건너뜀: ${this.summary.skippedSuites}개`);
    console.log(`  전체 소요시간: ${(this.summary.totalDuration / 1000).toFixed(1)}초`);
    console.log(`  심각한 실패: ${this.summary.criticalFailures}개`);
    
    // 성공률 계산
    const totalExecuted = this.summary.passedSuites + this.summary.failedSuites;
    const overallSuccessRate = totalExecuted > 0 ? this.summary.passedSuites / totalExecuted : 0;
    
    console.log(`  전체 성공률: ${(overallSuccessRate * 100).toFixed(1)}%`);
    
    // 스위트별 상세 결과
    console.log(`\n📋 스위트별 결과:`);
    this.results.forEach(result => {
      const statusIcon = result.skipped ? '⏭️' : (result.success ? '✅' : '❌');
      const criticalIcon = result.critical ? '🚨' : '  ';
      const duration = `${(result.duration / 1000).toFixed(1)}초`;
      
      console.log(`  ${statusIcon} ${criticalIcon} ${result.name}: ${duration}`);
      
      if (result.metrics.successRate !== undefined) {
        console.log(`      성공률: ${result.metrics.successRate}%`);
      }
      
      if (result.metrics.totalTests !== undefined) {
        console.log(`      테스트 수: ${result.metrics.totalTests}개`);
      }
      
      if (result.error && !result.skipped) {
        console.log(`      오류: ${result.error.substring(0, 100)}...`);
      }
    });
    
    // 성능 분석
    console.log(`\n⚡ 성능 분석:`);
    const avgDuration = this.results.reduce((sum, r) => sum + r.duration, 0) / this.results.length;
    const slowestTest = this.results.reduce((max, r) => r.duration > max.duration ? r : max, this.results[0]);
    const fastestTest = this.results.reduce((min, r) => r.duration < min.duration ? r : min, this.results[0]);
    
    console.log(`  평균 실행시간: ${(avgDuration / 1000).toFixed(1)}초`);
    console.log(`  가장 느린 테스트: ${slowestTest.name} (${(slowestTest.duration / 1000).toFixed(1)}초)`);
    console.log(`  가장 빠른 테스트: ${fastestTest.name} (${(fastestTest.duration / 1000).toFixed(1)}초)`);
  }

  // 품질 게이트 검증
  validateQualityGate() {
    console.log('\n🚪 품질 게이트 검증');
    
    const thresholds = this.config.qualityThresholds;
    const totalExecuted = this.summary.passedSuites + this.summary.failedSuites;
    const overallSuccessRate = totalExecuted > 0 ? this.summary.passedSuites / totalExecuted : 0;
    
    // 크리티컬 테스트 성공률
    const criticalTests = this.results.filter(r => r.critical && !r.skipped);
    const criticalSuccessRate = criticalTests.length > 0 ? 
      criticalTests.filter(r => r.success).length / criticalTests.length : 1;
    
    const checks = [
      {
        name: '전체 성공률',
        actual: overallSuccessRate,
        threshold: thresholds.overallSuccessRate,
        unit: '%',
        passed: overallSuccessRate >= thresholds.overallSuccessRate
      },
      {
        name: '크리티컬 테스트 성공률',
        actual: criticalSuccessRate,
        threshold: thresholds.criticalTestSuccessRate,
        unit: '%',
        passed: criticalSuccessRate >= thresholds.criticalTestSuccessRate
      },
      {
        name: '크리티컬 실패 수',
        actual: this.summary.criticalFailures,
        threshold: thresholds.maxFailedCriticalTests,
        unit: '개',
        passed: this.summary.criticalFailures <= thresholds.maxFailedCriticalTests
      },
      {
        name: '전체 실패 수',
        actual: this.summary.failedSuites,
        threshold: thresholds.maxTotalFailures,
        unit: '개',
        passed: this.summary.failedSuites <= thresholds.maxTotalFailures
      }
    ];
    
    let allPassed = true;
    
    checks.forEach(check => {
      const statusIcon = check.passed ? '✅' : '❌';
      const actualValue = check.unit === '%' ? 
        `${(check.actual * 100).toFixed(1)}%` : 
        `${check.actual}${check.unit}`;
      const thresholdValue = check.unit === '%' ? 
        `${(check.threshold * 100).toFixed(1)}%` : 
        `${check.threshold}${check.unit}`;
      
      console.log(`  ${statusIcon} ${check.name}: ${actualValue} (기준: ${thresholdValue})`);
      
      if (!check.passed) {
        allPassed = false;
      }
    });
    
    console.log(`\n🚪 품질 게이트: ${allPassed ? '✅ 통과' : '❌ 실패'}`);
    
    return allPassed;
  }

  // 종합 리포트 생성
  generateIntegratedReport() {
    if (!this.config.options.generateReport) return;
    
    console.log('\n📄 종합 리포트 생성');
    
    const report = {
      testRun: {
        timestamp: new Date().toISOString(),
        duration: this.summary.totalDuration,
        environment: {
          nodeVersion: process.version,
          platform: process.platform,
          cwd: process.cwd()
        }
      },
      summary: this.summary,
      results: this.results,
      qualityGate: this.validateQualityGate()
    };
    
    // JSON 리포트 저장
    const jsonPath = path.join(this.config.options.outputDir, 'integrated-test-report.json');
    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
    console.log(`  📄 JSON 리포트: ${jsonPath}`);
    
    // HTML 리포트 생성
    const htmlPath = path.join(this.config.options.outputDir, 'integrated-test-report.html');
    const htmlContent = this.generateHtmlReport(report);
    fs.writeFileSync(htmlPath, htmlContent);
    console.log(`  🌐 HTML 리포트: ${htmlPath}`);
    
    // 요약 텍스트 리포트
    const txtPath = path.join(this.config.options.outputDir, 'test-summary.txt');
    const txtContent = this.generateTextSummary(report);
    fs.writeFileSync(txtPath, txtContent);
    console.log(`  📝 텍스트 요약: ${txtPath}`);
  }

  // HTML 리포트 생성
  generateHtmlReport(report) {
    const totalExecuted = report.summary.passedSuites + report.summary.failedSuites;
    const successRate = totalExecuted > 0 ? (report.summary.passedSuites / totalExecuted * 100).toFixed(1) : '0.0';
    
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AICAMP 통합 테스트 리포트</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #eee; padding-bottom: 20px; }
        .header h1 { color: #2563eb; margin-bottom: 10px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .summary-card { background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; }
        .summary-card.success { border-left-color: #10b981; }
        .summary-card.failed { border-left-color: #ef4444; }
        .summary-card.critical { border-left-color: #dc2626; }
        .summary-card h3 { margin: 0 0 10px 0; color: #374151; }
        .summary-card .value { font-size: 2em; font-weight: bold; color: #2563eb; }
        .results { margin-top: 30px; }
        .result-item { background: #f9fafb; padding: 15px; margin-bottom: 10px; border-radius: 6px; border-left: 4px solid #10b981; }
        .result-item.failed { border-left-color: #ef4444; }
        .result-item.skipped { border-left-color: #6b7280; }
        .result-item h4 { margin: 0 0 10px 0; display: flex; justify-content: space-between; align-items: center; }
        .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; margin: 10px 0; }
        .metric { background: white; padding: 8px 12px; border-radius: 4px; text-align: center; }
        .timestamp { color: #6b7280; font-size: 0.9em; }
        .quality-gate { background: #f0f9ff; border: 1px solid #bae6fd; padding: 20px; border-radius: 8px; margin-top: 30px; }
        .quality-gate.failed { background: #fef2f2; border-color: #fecaca; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧪 AICAMP 통합 테스트 리포트</h1>
            <p class="timestamp">실행일시: ${new Date(report.testRun.timestamp).toLocaleString('ko-KR')}</p>
            <p>소요시간: ${(report.testRun.duration / 1000).toFixed(1)}초</p>
        </div>
        
        <div class="summary">
            <div class="summary-card">
                <h3>총 테스트 스위트</h3>
                <div class="value">${report.summary.totalSuites}</div>
            </div>
            <div class="summary-card success">
                <h3>성공</h3>
                <div class="value" style="color: #10b981;">${report.summary.passedSuites}</div>
            </div>
            <div class="summary-card failed">
                <h3>실패</h3>
                <div class="value" style="color: #ef4444;">${report.summary.failedSuites}</div>
            </div>
            <div class="summary-card">
                <h3>성공률</h3>
                <div class="value">${successRate}%</div>
            </div>
            <div class="summary-card critical">
                <h3>심각한 실패</h3>
                <div class="value" style="color: #dc2626;">${report.summary.criticalFailures}</div>
            </div>
        </div>
        
        <div class="quality-gate ${report.qualityGate ? '' : 'failed'}">
            <h2>🚪 품질 게이트: ${report.qualityGate ? '✅ 통과' : '❌ 실패'}</h2>
        </div>
        
        <div class="results">
            <h2>📋 테스트 결과 상세</h2>
            ${report.results.map(result => `
                <div class="result-item ${result.skipped ? 'skipped' : (result.success ? '' : 'failed')}">
                    <h4>
                        <span>${result.skipped ? '⏭️' : (result.success ? '✅' : '❌')} ${result.name}${result.critical ? ' 🚨' : ''}</span>
                        <span>${(result.duration / 1000).toFixed(1)}초</span>
                    </h4>
                    <p>${result.description}</p>
                    ${result.metrics && Object.keys(result.metrics).length > 0 ? `
                        <div class="metrics">
                            ${Object.entries(result.metrics).map(([key, value]) => `
                                <div class="metric">
                                    <strong>${key}</strong><br>
                                    ${value}${key.includes('Rate') ? '%' : key.includes('Tests') ? '개' : key.includes('duration') ? '초' : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    ${result.error && !result.skipped ? `
                        <div style="background: #fef2f2; padding: 10px; border-radius: 4px; margin-top: 10px;">
                            <strong>오류:</strong> ${result.error}
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        </div>
    </div>
</body>
</html>`;
  }

  // 텍스트 요약 생성
  generateTextSummary(report) {
    const totalExecuted = report.summary.passedSuites + report.summary.failedSuites;
    const successRate = totalExecuted > 0 ? (report.summary.passedSuites / totalExecuted * 100).toFixed(1) : '0.0';
    
    return `
AICAMP 통합 테스트 결과 요약
=====================================

실행 정보:
- 실행일시: ${new Date(report.testRun.timestamp).toLocaleString('ko-KR')}
- 소요시간: ${(report.testRun.duration / 1000).toFixed(1)}초
- Node.js: ${report.testRun.environment.nodeVersion}
- 플랫폼: ${report.testRun.environment.platform}

전체 결과:
- 총 테스트 스위트: ${report.summary.totalSuites}개
- 성공: ${report.summary.passedSuites}개
- 실패: ${report.summary.failedSuites}개
- 건너뜀: ${report.summary.skippedSuites}개
- 성공률: ${successRate}%
- 심각한 실패: ${report.summary.criticalFailures}개

품질 게이트: ${report.qualityGate ? '통과' : '실패'}

스위트별 결과:
${report.results.map(result => {
  const status = result.skipped ? '건너뜀' : (result.success ? '성공' : '실패');
  const critical = result.critical ? ' [중요]' : '';
  const duration = `${(result.duration / 1000).toFixed(1)}초`;
  return `- ${result.name}${critical}: ${status} (${duration})`;
}).join('\n')}

${report.summary.failedSuites > 0 ? `
실패한 테스트:
${report.results.filter(r => !r.success && !r.skipped).map(result => 
  `- ${result.name}: ${result.error || '알 수 없는 오류'}`
).join('\n')}
` : ''}
=====================================
`.trim();
  }

  // 비동기 sleep 함수
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// 메인 실행 함수
async function main() {
  try {
    const runner = new IntegratedTestRunner(INTEGRATED_TEST_CONFIG);
    const results = await runner.runAllTests();
    
    console.log('\n' + '='.repeat(80));
    console.log('🏁 통합 테스트 완료');
    console.log('='.repeat(80));
    
    // 종료 코드 설정
    const exitCode = results.qualityGatePassed ? 0 : 1;
    
    if (exitCode === 0) {
      console.log('✅ 모든 테스트가 품질 기준을 충족했습니다.');
    } else {
      console.log('❌ 일부 테스트가 품질 기준을 충족하지 못했습니다.');
    }
    
    process.exit(exitCode);
    
  } catch (error) {
    console.error('\n❌ 통합 테스트 실행 중 오류:', error);
    process.exit(1);
  }
}

// 스크립트 직접 실행 시
if (require.main === module) {
  main();
}

module.exports = { IntegratedTestRunner, INTEGRATED_TEST_CONFIG };