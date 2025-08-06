#!/usr/bin/env node

/**
 * 🧪 AICAMP 진단 프로세스 시뮬레이션 테스트
 * 실제 진단 프로세스를 시뮬레이션하여 잠재적 오류를 검출합니다.
 */

const fs = require('fs');
const path = require('path');

// 테스트 설정
const TEST_CONFIG = {
  // 시뮬레이션 시나리오
  scenarios: [
    {
      name: '정상 시나리오',
      description: '모든 단계가 정상적으로 완료되는 케이스',
      companyData: {
        companyName: '테스트컴퍼니',
        industry: '제조업',
        employeeCount: '10-49명',
        email: 'test@company.com'
      },
      expectedSteps: ['data-validation', 'gemini-analysis', 'swot-analysis', 'report-generation', 'email-sending'],
      expectedDuration: 360000, // 6분
      shouldSucceed: true
    },
    {
      name: 'GEMINI API 타임아웃 시나리오',
      description: 'GEMINI API 호출이 타임아웃되는 케이스',
      companyData: {
        companyName: '타임아웃테스트',
        industry: '서비스업',
        employeeCount: '50-99명',
        email: 'timeout@test.com'
      },
      simulateTimeout: 'gemini-analysis',
      timeoutAfter: 800000, // 13분 20초
      expectedSteps: ['data-validation', 'gemini-analysis-timeout'],
      shouldSucceed: false,
      expectedError: 'GEMINI API 타임아웃'
    },
    {
      name: '부분 데이터 시나리오',
      description: '일부 데이터가 누락된 케이스',
      companyData: {
        companyName: '부분데이터테스트',
        industry: '', // 누락
        employeeCount: '10-49명',
        email: 'partial@test.com'
      },
      expectedSteps: ['data-validation-warning', 'gemini-analysis', 'swot-analysis', 'report-generation', 'email-sending'],
      expectedDuration: 420000, // 7분 (데이터 보완 시간 포함)
      shouldSucceed: true,
      hasWarnings: true
    },
    {
      name: '대용량 데이터 시나리오',
      description: '대용량 데이터 처리 케이스',
      companyData: {
        companyName: '대기업테스트',
        industry: 'IT/소프트웨어',
        employeeCount: '1000명 이상',
        email: 'large@company.com',
        businessDetails: 'A'.repeat(5000) // 5000자 대용량 텍스트
      },
      expectedSteps: ['data-validation', 'gemini-analysis-extended', 'swot-analysis', 'report-generation', 'email-sending'],
      expectedDuration: 600000, // 10분
      shouldSucceed: true
    },
    {
      name: '네트워크 오류 시나리오',
      description: '네트워크 오류 및 재시도 케이스',
      companyData: {
        companyName: '네트워크오류테스트',
        industry: '유통업',
        employeeCount: '100-299명',
        email: 'network@test.com'
      },
      simulateNetworkError: true,
      retryCount: 3,
      expectedSteps: ['data-validation', 'gemini-analysis-retry', 'swot-analysis', 'report-generation', 'email-sending'],
      expectedDuration: 480000, // 8분 (재시도 시간 포함)
      shouldSucceed: true
    }
  ],

  // 타임아웃 설정 (밀리초)
  timeouts: {
    dataValidation: 30000,      // 30초
    geminiAnalysis: 800000,     // 13분 20초
    swotAnalysis: 180000,       // 3분
    reportGeneration: 300000,   // 5분
    emailSending: 180000,       // 3분
    totalProcess: 800000        // 13분 20초 (Vercel 제한)
  },

  // 시뮬레이션 설정
  simulation: {
    enableRealTimeLogging: true,
    saveResults: true,
    generateReport: true,
    outputDir: './test-results'
  }
};

// 테스트 결과 저장 클래스
class TestResults {
  constructor() {
    this.results = [];
    this.startTime = Date.now();
    this.errors = [];
    this.warnings = [];
  }

  addResult(scenario, result) {
    this.results.push({
      scenario: scenario.name,
      timestamp: new Date().toISOString(),
      ...result
    });
  }

  addError(error) {
    this.errors.push({
      timestamp: new Date().toISOString(),
      error: error.message || error,
      stack: error.stack
    });
  }

  addWarning(warning) {
    this.warnings.push({
      timestamp: new Date().toISOString(),
      warning
    });
  }

  generateSummary() {
    const totalTests = this.results.length;
    const passedTests = this.results.filter(r => r.success).length;
    const failedTests = totalTests - passedTests;
    const totalDuration = Date.now() - this.startTime;

    return {
      summary: {
        totalTests,
        passedTests,
        failedTests,
        successRate: `${((passedTests / totalTests) * 100).toFixed(1)}%`,
        totalDuration: `${(totalDuration / 1000).toFixed(1)}초`,
        errors: this.errors.length,
        warnings: this.warnings.length
      },
      results: this.results,
      errors: this.errors,
      warnings: this.warnings
    };
  }
}

// 진단 프로세스 시뮬레이터 클래스
class DiagnosisSimulator {
  constructor(config) {
    this.config = config;
    this.testResults = new TestResults();
  }

  // 메인 시뮬레이션 실행
  async runSimulation() {
    console.log('🧪 AICAMP 진단 프로세스 시뮬레이션 테스트 시작\n');
    
    // 출력 디렉토리 생성
    if (this.config.simulation.saveResults) {
      this.ensureOutputDirectory();
    }

    // 각 시나리오 실행
    for (const scenario of this.config.scenarios) {
      await this.runScenario(scenario);
    }

    // 결과 생성 및 저장
    const summary = this.testResults.generateSummary();
    this.displaySummary(summary);
    
    if (this.config.simulation.saveResults) {
      this.saveResults(summary);
    }

    if (this.config.simulation.generateReport) {
      this.generateHtmlReport(summary);
    }

    return summary;
  }

  // 개별 시나리오 실행
  async runScenario(scenario) {
    console.log(`\n🎯 시나리오 실행: ${scenario.name}`);
    console.log(`   설명: ${scenario.description}`);
    
    const startTime = Date.now();
    let result = {
      success: false,
      duration: 0,
      steps: [],
      errors: [],
      warnings: []
    };

    try {
      // 1단계: 데이터 검증
      await this.simulateDataValidation(scenario, result);
      
      // 2단계: GEMINI 분석 (타임아웃 시뮬레이션 포함)
      if (scenario.simulateTimeout !== 'gemini-analysis') {
        await this.simulateGeminiAnalysis(scenario, result);
      } else {
        await this.simulateTimeout(scenario, result, 'gemini-analysis');
        throw new Error('GEMINI API 타임아웃 시뮬레이션');
      }
      
      // 3단계: SWOT 분석
      await this.simulateSwotAnalysis(scenario, result);
      
      // 4단계: 보고서 생성
      await this.simulateReportGeneration(scenario, result);
      
      // 5단계: 이메일 발송
      await this.simulateEmailSending(scenario, result);

      result.success = true;
      
    } catch (error) {
      result.errors.push(error.message);
      this.testResults.addError(error);
      
      if (scenario.shouldSucceed) {
        console.log(`   ❌ 예상치 못한 오류: ${error.message}`);
      } else {
        console.log(`   ✅ 예상된 오류 발생: ${error.message}`);
        result.success = !scenario.shouldSucceed; // 실패가 예상된 경우 성공으로 처리
      }
    }

    result.duration = Date.now() - startTime;
    this.testResults.addResult(scenario, result);

    // 결과 출력
    const status = result.success ? '✅ 성공' : '❌ 실패';
    const duration = `${(result.duration / 1000).toFixed(1)}초`;
    console.log(`   결과: ${status} (소요시간: ${duration})`);
    
    if (result.warnings.length > 0) {
      console.log(`   ⚠️ 경고: ${result.warnings.length}개`);
    }
  }

  // 데이터 검증 시뮬레이션
  async simulateDataValidation(scenario, result) {
    console.log('   📊 데이터 검증 중...');
    
    await this.sleep(1000); // 1초 시뮬레이션
    
    const { companyData } = scenario;
    
    // 필수 필드 검증
    const requiredFields = ['companyName', 'email'];
    const missingFields = requiredFields.filter(field => !companyData[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`필수 필드 누락: ${missingFields.join(', ')}`);
    }
    
    // 선택 필드 검증 및 경고
    const optionalFields = ['industry', 'employeeCount'];
    const missingOptional = optionalFields.filter(field => !companyData[field]);
    
    if (missingOptional.length > 0) {
      const warning = `선택 필드 누락: ${missingOptional.join(', ')}`;
      result.warnings.push(warning);
      this.testResults.addWarning(warning);
      result.steps.push('data-validation-warning');
    } else {
      result.steps.push('data-validation');
    }
    
    console.log('     ✅ 데이터 검증 완료');
  }

  // GEMINI 분석 시뮬레이션
  async simulateGeminiAnalysis(scenario, result) {
    console.log('   🤖 GEMINI 2.5 Flash AI 분석 중...');
    
    const analysisTime = scenario.simulateNetworkError ? 
      this.config.timeouts.geminiAnalysis * 0.8 : // 네트워크 오류로 인한 지연
      Math.random() * 180000 + 120000; // 2-5분 랜덤
    
    if (scenario.simulateNetworkError) {
      // 네트워크 오류 시뮬레이션
      console.log('     ⚠️ 네트워크 오류 발생, 재시도 중...');
      await this.sleep(5000); // 5초 재시도 대기
      
      for (let i = 1; i <= scenario.retryCount; i++) {
        console.log(`     🔄 재시도 ${i}/${scenario.retryCount}`);
        await this.sleep(2000 * i); // 지수 백오프
        
        if (i === scenario.retryCount) {
          console.log('     ✅ 재시도 성공');
          result.steps.push('gemini-analysis-retry');
          break;
        }
      }
    } else {
      await this.sleep(analysisTime);
      
      if (scenario.companyData.businessDetails && scenario.companyData.businessDetails.length > 1000) {
        result.steps.push('gemini-analysis-extended');
      } else {
        result.steps.push('gemini-analysis');
      }
    }
    
    console.log('     ✅ GEMINI 분석 완료');
  }

  // SWOT 분석 시뮬레이션
  async simulateSwotAnalysis(scenario, result) {
    console.log('   🎯 SWOT 전략 분석 중...');
    
    const analysisTime = Math.random() * 60000 + 30000; // 30초-1분 30초
    await this.sleep(analysisTime);
    
    result.steps.push('swot-analysis');
    console.log('     ✅ SWOT 분석 완료');
  }

  // 보고서 생성 시뮬레이션
  async simulateReportGeneration(scenario, result) {
    console.log('   📄 맞춤형 보고서 생성 중...');
    
    const generationTime = Math.random() * 120000 + 60000; // 1-3분
    await this.sleep(generationTime);
    
    result.steps.push('report-generation');
    console.log('     ✅ 보고서 생성 완료');
  }

  // 이메일 발송 시뮬레이션
  async simulateEmailSending(scenario, result) {
    console.log('   📧 이메일 발송 중...');
    
    const sendingTime = Math.random() * 30000 + 15000; // 15-45초
    await this.sleep(sendingTime);
    
    result.steps.push('email-sending');
    console.log('     ✅ 이메일 발송 완료');
  }

  // 타임아웃 시뮬레이션
  async simulateTimeout(scenario, result, step) {
    console.log(`   ⏰ ${step} 타임아웃 시뮬레이션...`);
    
    const timeoutDuration = scenario.timeoutAfter || this.config.timeouts[step.replace('-', '')];
    await this.sleep(timeoutDuration + 5000); // 타임아웃 + 5초
    
    result.steps.push(`${step}-timeout`);
    throw new Error(`${step} 타임아웃`);
  }

  // 결과 요약 출력
  displaySummary(summary) {
    console.log('\n' + '='.repeat(80));
    console.log('📊 시뮬레이션 테스트 결과 요약');
    console.log('='.repeat(80));
    
    const { summary: s } = summary;
    console.log(`총 테스트: ${s.totalTests}개`);
    console.log(`성공: ${s.passedTests}개`);
    console.log(`실패: ${s.failedTests}개`);
    console.log(`성공률: ${s.successRate}`);
    console.log(`총 소요시간: ${s.totalDuration}`);
    console.log(`오류: ${s.errors}개`);
    console.log(`경고: ${s.warnings}개`);
    
    console.log('\n📋 시나리오별 결과:');
    summary.results.forEach(result => {
      const status = result.success ? '✅' : '❌';
      const duration = `${(result.duration / 1000).toFixed(1)}초`;
      console.log(`  ${status} ${result.scenario} (${duration})`);
      
      if (result.errors.length > 0) {
        result.errors.forEach(error => {
          console.log(`    ❌ ${error}`);
        });
      }
      
      if (result.warnings.length > 0) {
        result.warnings.forEach(warning => {
          console.log(`    ⚠️ ${warning}`);
        });
      }
    });

    if (summary.errors.length > 0) {
      console.log('\n🚨 발견된 오류:');
      summary.errors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error.error}`);
      });
    }

    if (summary.warnings.length > 0) {
      console.log('\n⚠️ 발견된 경고:');
      summary.warnings.forEach((warning, index) => {
        console.log(`  ${index + 1}. ${warning.warning}`);
      });
    }
  }

  // 결과를 JSON 파일로 저장
  saveResults(summary) {
    const outputPath = path.join(this.config.simulation.outputDir, 'simulation-results.json');
    fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2));
    console.log(`\n💾 결과 저장됨: ${outputPath}`);
  }

  // HTML 리포트 생성
  generateHtmlReport(summary) {
    const htmlContent = this.generateHtmlContent(summary);
    const outputPath = path.join(this.config.simulation.outputDir, 'simulation-report.html');
    fs.writeFileSync(outputPath, htmlContent);
    console.log(`📄 HTML 리포트 생성됨: ${outputPath}`);
  }

  // HTML 콘텐츠 생성
  generateHtmlContent(summary) {
    const { summary: s } = summary;
    
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AICAMP 진단 프로세스 시뮬레이션 테스트 리포트</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #2563eb; margin-bottom: 10px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .summary-card { background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; }
        .summary-card h3 { margin: 0 0 10px 0; color: #374151; }
        .summary-card .value { font-size: 2em; font-weight: bold; color: #2563eb; }
        .results { margin-top: 30px; }
        .result-item { background: #f9fafb; padding: 15px; margin-bottom: 10px; border-radius: 6px; border-left: 4px solid #10b981; }
        .result-item.failed { border-left-color: #ef4444; }
        .result-item h4 { margin: 0 0 10px 0; }
        .steps { display: flex; flex-wrap: wrap; gap: 5px; margin: 10px 0; }
        .step { background: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 0.8em; }
        .errors, .warnings { margin-top: 20px; }
        .error-item, .warning-item { background: #fef2f2; border: 1px solid #fecaca; padding: 10px; margin-bottom: 5px; border-radius: 4px; }
        .warning-item { background: #fffbeb; border-color: #fed7aa; }
        .timestamp { color: #6b7280; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧪 AICAMP 진단 프로세스 시뮬레이션 테스트 리포트</h1>
            <p class="timestamp">생성일시: ${new Date().toLocaleString('ko-KR')}</p>
        </div>
        
        <div class="summary">
            <div class="summary-card">
                <h3>총 테스트</h3>
                <div class="value">${s.totalTests}</div>
            </div>
            <div class="summary-card">
                <h3>성공률</h3>
                <div class="value">${s.successRate}</div>
            </div>
            <div class="summary-card">
                <h3>총 소요시간</h3>
                <div class="value">${s.totalDuration}</div>
            </div>
            <div class="summary-card">
                <h3>오류</h3>
                <div class="value" style="color: #ef4444;">${s.errors}</div>
            </div>
        </div>
        
        <div class="results">
            <h2>📋 시나리오별 결과</h2>
            ${summary.results.map(result => `
                <div class="result-item ${result.success ? '' : 'failed'}">
                    <h4>${result.success ? '✅' : '❌'} ${result.scenario}</h4>
                    <p><strong>소요시간:</strong> ${(result.duration / 1000).toFixed(1)}초</p>
                    <div class="steps">
                        ${result.steps.map(step => `<span class="step">${step}</span>`).join('')}
                    </div>
                    ${result.errors.length > 0 ? `
                        <div><strong>오류:</strong></div>
                        ${result.errors.map(error => `<div class="error-item">❌ ${error}</div>`).join('')}
                    ` : ''}
                    ${result.warnings.length > 0 ? `
                        <div><strong>경고:</strong></div>
                        ${result.warnings.map(warning => `<div class="warning-item">⚠️ ${warning}</div>`).join('')}
                    ` : ''}
                </div>
            `).join('')}
        </div>
        
        ${summary.errors.length > 0 ? `
            <div class="errors">
                <h2>🚨 발견된 오류</h2>
                ${summary.errors.map(error => `
                    <div class="error-item">
                        <strong>${error.error}</strong>
                        <div class="timestamp">${new Date(error.timestamp).toLocaleString('ko-KR')}</div>
                    </div>
                `).join('')}
            </div>
        ` : ''}
        
        ${summary.warnings.length > 0 ? `
            <div class="warnings">
                <h2>⚠️ 발견된 경고</h2>
                ${summary.warnings.map(warning => `
                    <div class="warning-item">
                        <strong>${warning.warning}</strong>
                        <div class="timestamp">${new Date(warning.timestamp).toLocaleString('ko-KR')}</div>
                    </div>
                `).join('')}
            </div>
        ` : ''}
    </div>
</body>
</html>`;
  }

  // 출력 디렉토리 생성
  ensureOutputDirectory() {
    const dir = this.config.simulation.outputDir;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  // 비동기 sleep 함수
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// 메인 실행 함수
async function main() {
  try {
    const simulator = new DiagnosisSimulator(TEST_CONFIG);
    const results = await simulator.runSimulation();
    
    // 종료 코드 설정
    const hasFailures = results.summary.failedTests > 0 || results.summary.errors > 0;
    process.exit(hasFailures ? 1 : 0);
    
  } catch (error) {
    console.error('\n❌ 시뮬레이션 테스트 실행 중 오류:', error);
    process.exit(1);
  }
}

// 스크립트 직접 실행 시
if (require.main === module) {
  main();
}

module.exports = { DiagnosisSimulator, TEST_CONFIG };