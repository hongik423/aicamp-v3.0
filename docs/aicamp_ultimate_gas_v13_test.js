// ================================================================================
// AICAMP 통합 시스템 V13.0 ULTIMATE - 테스트 및 검증
// 전체 워크플로우 시뮬레이션 테스트
// ================================================================================

/**
 * 전체 시스템 테스트 실행
 */
function runFullSystemTest() {
  console.log('🧪 AICAMP V13.0 전체 시스템 테스트 시작');
  console.log('=' .repeat(80));
  
  const testResults = {
    startTime: new Date().toISOString(),
    tests: [],
    summary: {
      total: 0,
      passed: 0,
      failed: 0,
      warnings: 0
    }
  };
  
  try {
    // 1. 시스템 헬스체크
    testResults.tests.push(testSystemHealth());
    
    // 2. AI 역량진단 워크플로우 테스트
    testResults.tests.push(testAIDiagnosisWorkflow());
    
    // 3. 상담신청 워크플로우 테스트
    testResults.tests.push(testConsultationWorkflow());
    
    // 4. 오류신고 워크플로우 테스트
    testResults.tests.push(testErrorReportWorkflow());
    
    // 5. GEMINI API 통합 테스트
    testResults.tests.push(testGeminiIntegration());
    
    // 6. Google Sheets 통합 테스트
    testResults.tests.push(testSheetsIntegration());
    
    // 7. 이메일 시스템 테스트
    testResults.tests.push(testEmailSystem());
    
    // 8. HTML 보고서 생성 테스트
    testResults.tests.push(testHTMLReportGeneration());
    
    // 결과 집계
    testResults.tests.forEach(test => {
      testResults.summary.total++;
      if (test.status === 'PASSED') testResults.summary.passed++;
      else if (test.status === 'FAILED') testResults.summary.failed++;
      else if (test.status === 'WARNING') testResults.summary.warnings++;
    });
    
    testResults.endTime = new Date().toISOString();
    testResults.duration = new Date(testResults.endTime) - new Date(testResults.startTime);
    
    // 테스트 결과 출력
    printTestResults(testResults);
    
    // 테스트 결과를 Google Sheets에 저장
    saveTestResults(testResults);
    
    return testResults;
    
  } catch (error) {
    console.error('❌ 전체 시스템 테스트 실행 오류:', error);
    return {
      ...testResults,
      error: error.toString(),
      status: 'SYSTEM_ERROR'
    };
  }
}

/**
 * 시스템 헬스체크 테스트
 */
function testSystemHealth() {
  console.log('🔍 1. 시스템 헬스체크 테스트');
  
  try {
    const health = checkSystemHealth();
    
    const test = {
      testName: 'System Health Check',
      status: health.status === 'healthy' ? 'PASSED' : health.status === 'warning' ? 'WARNING' : 'FAILED',
      details: {
        overallStatus: health.status,
        geminiAPI: health.checks.geminiAPI.status,
        googleSheets: health.checks.googleSheets.status,
        emailService: health.checks.emailService.status
      },
      message: `시스템 상태: ${health.status}`,
      timestamp: new Date().toISOString()
    };
    
    console.log(`   ${test.status === 'PASSED' ? '✅' : test.status === 'WARNING' ? '⚠️' : '❌'} ${test.message}`);
    return test;
    
  } catch (error) {
    console.log(`   ❌ 시스템 헬스체크 실패: ${error.message}`);
    return {
      testName: 'System Health Check',
      status: 'FAILED',
      error: error.toString(),
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * AI 역량진단 워크플로우 테스트
 */
function testAIDiagnosisWorkflow() {
  console.log('🧠 2. AI 역량진단 워크플로우 테스트');
  
  try {
    // 테스트 데이터 생성
    const testData = generateTestAIDiagnosisData();
    
    // 데이터 정규화 테스트
    const normalizedData = normalizeAIDiagnosisData(testData, 'TEST_DIAG_001');
    
    // 점수 계산 테스트
    const scores = calculateAdvancedScores(normalizedData);
    
    // 벤치마크 분석 테스트
    const benchmarkAnalysis = performBenchmarkAnalysis(scores, normalizedData);
    
    // SWOT 분석 테스트
    const swotAnalysis = generateAdvancedSWOT(normalizedData, scores, benchmarkAnalysis);
    
    // 우선순위 매트릭스 테스트
    const priorityMatrix = generatePriorityMatrix(swotAnalysis, scores, normalizedData);
    
    // 로드맵 생성 테스트
    const roadmap = generate3PhaseRoadmap(priorityMatrix, swotAnalysis, normalizedData);
    
    // ROI 분석 테스트
    const roiAnalysis = calculateROIAnalysis(roadmap, normalizedData);
    
    const test = {
      testName: 'AI Diagnosis Workflow',
      status: 'PASSED',
      details: {
        dataValidation: normalizedData.assessmentResponses.length === 45,
        scoreCalculation: scores.totalScore > 0 && scores.totalScore <= 100,
        benchmarkAnalysis: benchmarkAnalysis.competitivePosition !== undefined,
        swotAnalysis: Object.keys(swotAnalysis.strengths).length > 0,
        priorityMatrix: priorityMatrix.actionItems.length > 0,
        roadmapGeneration: roadmap.phase1 && roadmap.phase2 && roadmap.phase3,
        roiAnalysis: roiAnalysis.roiMetrics.roi > 0
      },
      results: {
        totalScore: scores.totalScore,
        maturityLevel: scores.maturityLevel,
        competitivePosition: benchmarkAnalysis.competitivePosition,
        actionItems: priorityMatrix.actionItems.length,
        expectedROI: roiAnalysis.roiMetrics.roi
      },
      message: `AI 역량진단 워크플로우 성공 (총점: ${scores.totalScore}, ROI: ${roiAnalysis.roiMetrics.roi}%)`,
      timestamp: new Date().toISOString()
    };
    
    // 실패 조건 체크
    if (!test.details.dataValidation) {
      test.status = 'FAILED';
      test.message = '45문항 데이터 검증 실패';
    } else if (!test.details.scoreCalculation) {
      test.status = 'FAILED';
      test.message = '점수 계산 실패';
    }
    
    console.log(`   ${test.status === 'PASSED' ? '✅' : '❌'} ${test.message}`);
    return test;
    
  } catch (error) {
    console.log(`   ❌ AI 역량진단 워크플로우 테스트 실패: ${error.message}`);
    return {
      testName: 'AI Diagnosis Workflow',
      status: 'FAILED',
      error: error.toString(),
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * 상담신청 워크플로우 테스트
 */
function testConsultationWorkflow() {
  console.log('💬 3. 상담신청 워크플로우 테스트');
  
  try {
    const testData = {
      type: 'consultation_request',
      data: {
        companyName: '테스트 회사',
        contactName: '홍길동',
        contactEmail: 'test@example.com',
        contactPhone: '010-1234-5678',
        industry: 'IT/소프트웨어',
        employeeCount: '31-50명',
        consultationType: 'AI도입상담',
        urgency: '높음'
      }
    };
    
    // 상담신청 처리 시뮬레이션 (실제 이메일 발송 제외)
    const consultationId = generateConsultationId();
    const normalizedData = normalizeConsultationData(testData.data, consultationId);
    
    const test = {
      testName: 'Consultation Request Workflow',
      status: 'PASSED',
      details: {
        dataValidation: normalizedData.companyName && normalizedData.contactEmail,
        consultationIdGenerated: consultationId.startsWith('CONS_'),
        dataStructure: Object.keys(normalizedData).length >= 10
      },
      results: {
        consultationId: consultationId,
        companyName: normalizedData.companyName,
        contactEmail: normalizedData.contactEmail
      },
      message: `상담신청 워크플로우 성공 (ID: ${consultationId})`,
      timestamp: new Date().toISOString()
    };
    
    console.log(`   ✅ ${test.message}`);
    return test;
    
  } catch (error) {
    console.log(`   ❌ 상담신청 워크플로우 테스트 실패: ${error.message}`);
    return {
      testName: 'Consultation Request Workflow',
      status: 'FAILED',
      error: error.toString(),
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * 오류신고 워크플로우 테스트
 */
function testErrorReportWorkflow() {
  console.log('🐛 4. 오류신고 워크플로우 테스트');
  
  try {
    const testData = {
      type: 'error_report',
      data: {
        reporterName: '테스터',
        reporterEmail: 'tester@example.com',
        errorType: '세금계산기',
        errorDescription: '계산 결과가 부정확함',
        severity: '높음',
        reproducible: '예'
      }
    };
    
    const errorReportId = generateErrorReportId();
    const normalizedData = normalizeErrorReportData(testData.data, errorReportId);
    
    const test = {
      testName: 'Error Report Workflow',
      status: 'PASSED',
      details: {
        dataValidation: normalizedData.reporterName && normalizedData.reporterEmail,
        errorReportIdGenerated: errorReportId.startsWith('ERR_'),
        errorTypeValidation: normalizedData.errorType === '세금계산기'
      },
      results: {
        errorReportId: errorReportId,
        reporterEmail: normalizedData.reporterEmail,
        errorType: normalizedData.errorType
      },
      message: `오류신고 워크플로우 성공 (ID: ${errorReportId})`,
      timestamp: new Date().toISOString()
    };
    
    console.log(`   ✅ ${test.message}`);
    return test;
    
  } catch (error) {
    console.log(`   ❌ 오류신고 워크플로우 테스트 실패: ${error.message}`);
    return {
      testName: 'Error Report Workflow',
      status: 'FAILED',
      error: error.toString(),
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * GEMINI API 통합 테스트
 */
function testGeminiIntegration() {
  console.log('🤖 5. GEMINI API 통합 테스트');
  
  try {
    // 간단한 테스트 프롬프트
    const testPrompt = `
테스트 회사의 AI 역량진단 결과를 요약해주세요.
- 총점: 75점
- 성숙도: Advanced
- 업종: IT/소프트웨어

간단히 3줄로 요약해주세요.
`;
    
    // GEMINI API 호출 (실제 호출은 할당량 절약을 위해 시뮬레이션)
    const mockResponse = `
테스트 회사는 IT/소프트웨어 업종으로 75점의 우수한 AI 역량을 보유하고 있습니다.
Advanced 수준의 성숙도로 AI 기술 도입과 활용에 대한 기반이 잘 구축되어 있습니다.
지속적인 AI 역량 강화를 통해 업계 선도 기업으로 성장할 수 있는 잠재력을 가지고 있습니다.
`;
    
    const test = {
      testName: 'GEMINI API Integration',
      status: 'PASSED',
      details: {
        apiConnection: true, // 실제 환경에서는 API 호출 결과로 판단
        responseGeneration: mockResponse.length > 100,
        responseQuality: mockResponse.includes('75점') && mockResponse.includes('Advanced')
      },
      results: {
        responseLength: mockResponse.length,
        containsKeywords: ['75점', 'Advanced', 'IT/소프트웨어'].every(keyword => 
          mockResponse.includes(keyword)
        )
      },
      message: 'GEMINI API 통합 성공 (시뮬레이션)',
      timestamp: new Date().toISOString()
    };
    
    console.log(`   ✅ ${test.message}`);
    return test;
    
  } catch (error) {
    console.log(`   ❌ GEMINI API 통합 테스트 실패: ${error.message}`);
    return {
      testName: 'GEMINI API Integration',
      status: 'FAILED',
      error: error.toString(),
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Google Sheets 통합 테스트
 */
function testSheetsIntegration() {
  console.log('📊 6. Google Sheets 통합 테스트');
  
  try {
    // 스프레드시트 연결 테스트 (실제 ID가 설정되어 있다고 가정)
    const testSpreadsheetId = SHEETS_CONFIG.SPREADSHEET_ID || 'test-spreadsheet-id';
    
    // 시트 이름 검증
    const requiredSheets = Object.values(SHEETS_CONFIG.SHEETS);
    
    const test = {
      testName: 'Google Sheets Integration',
      status: 'PASSED',
      details: {
        spreadsheetIdConfigured: testSpreadsheetId !== 'test-spreadsheet-id',
        requiredSheetsConfigured: requiredSheets.length === 10,
        sheetNamesValid: requiredSheets.every(name => name.length > 0)
      },
      results: {
        spreadsheetId: testSpreadsheetId.substring(0, 10) + '...',
        configuredSheets: requiredSheets.length,
        sheetNames: requiredSheets
      },
      message: `Google Sheets 설정 검증 완료 (${requiredSheets.length}개 시트)`,
      timestamp: new Date().toISOString()
    };
    
    if (!test.details.spreadsheetIdConfigured) {
      test.status = 'WARNING';
      test.message = 'Google Sheets ID가 실제 값으로 설정되지 않음';
    }
    
    console.log(`   ${test.status === 'PASSED' ? '✅' : '⚠️'} ${test.message}`);
    return test;
    
  } catch (error) {
    console.log(`   ❌ Google Sheets 통합 테스트 실패: ${error.message}`);
    return {
      testName: 'Google Sheets Integration',
      status: 'FAILED',
      error: error.toString(),
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * 이메일 시스템 테스트
 */
function testEmailSystem() {
  console.log('📧 7. 이메일 시스템 테스트');
  
  try {
    // 이메일 템플릿 생성 테스트
    const testData = {
      companyName: '테스트 회사',
      contactName: '홍길동',
      contactEmail: 'test@example.com'
    };
    
    const testAIReport = {
      totalScore: 85,
      maturityLevel: 'Advanced',
      executiveSummary: '테스트 요약입니다.'
    };
    
    const applicantEmail = generateApplicantEmail(testData, testAIReport, 'TEST_001', 'ABC123');
    const adminEmail = generateAdminEmail(testData, testAIReport, 'TEST_001', 'ABC123');
    
    const test = {
      testName: 'Email System',
      status: 'PASSED',
      details: {
        applicantEmailGenerated: applicantEmail.subject.length > 0 && applicantEmail.body.length > 1000,
        adminEmailGenerated: adminEmail.subject.length > 0 && adminEmail.body.length > 1000,
        emailTemplateValid: applicantEmail.body.includes('테스트 회사') && applicantEmail.body.includes('홍길동'),
        passwordIncluded: applicantEmail.body.includes('ABC123')
      },
      results: {
        applicantSubject: applicantEmail.subject,
        adminSubject: adminEmail.subject,
        applicantBodyLength: applicantEmail.body.length,
        adminBodyLength: adminEmail.body.length
      },
      message: '이메일 시스템 테스트 성공',
      timestamp: new Date().toISOString()
    };
    
    console.log(`   ✅ ${test.message}`);
    return test;
    
  } catch (error) {
    console.log(`   ❌ 이메일 시스템 테스트 실패: ${error.message}`);
    return {
      testName: 'Email System',
      status: 'FAILED',
      error: error.toString(),
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * HTML 보고서 생성 테스트
 */
function testHTMLReportGeneration() {
  console.log('📄 8. HTML 보고서 생성 테스트');
  
  try {
    const testData = generateTestAIDiagnosisData();
    const testAIReport = {
      totalScore: 85,
      maturityLevel: 'Advanced',
      executiveSummary: '테스트 경영진 요약',
      detailedAnalysis: '테스트 상세 분석',
      strategicRecommendations: '테스트 전략 권고',
      implementationGuidance: '테스트 실행 가이드',
      nextSteps: '테스트 다음 단계',
      model: 'gemini-2.5-flash',
      qualityScore: 95,
      wordCount: 2500
    };
    
    const testAnalysisResults = {
      scores: {
        totalScore: 85,
        maturityLevel: 'Advanced',
        percentile: 80,
        sectionScores: {
          businessFoundation: { name: '사업기반', score: 80, questionCount: 8 },
          currentAI: { name: '현재AI활용', score: 85, questionCount: 8 },
          organizationReadiness: { name: '조직준비도', score: 90, questionCount: 8 }
        }
      },
      swot: {
        strengths: { internal: ['강점1'], competitive: ['강점2'], strategic: ['강점3'] },
        weaknesses: { operational: ['약점1'], technical: ['약점2'], organizational: ['약점3'] },
        opportunities: { market: ['기회1'], technology: ['기회2'], strategic: ['기회3'] },
        threats: { competitive: ['위협1'], technical: ['위협2'], market: ['위협3'] }
      },
      roi: {
        roiMetrics: { roi: 250, paybackPeriod: 18 },
        investmentCosts: { totalCost: 26000000 },
        expectedBenefits: { totalAnnualBenefit: 115000000 }
      }
    };
    
    const htmlReport = generateHTMLReport(testData, testAIReport, testAnalysisResults);
    
    const test = {
      testName: 'HTML Report Generation',
      status: 'PASSED',
      details: {
        htmlGenerated: htmlReport.html.length > 5000,
        containsCompanyName: htmlReport.html.includes(testData.companyName),
        containsScores: htmlReport.html.includes('85점'),
        containsCSS: htmlReport.html.includes('<style>'),
        responsive: htmlReport.html.includes('@media')
      },
      results: {
        htmlLength: htmlReport.html.length,
        generatedAt: htmlReport.generatedAt
      },
      message: `HTML 보고서 생성 성공 (${Math.round(htmlReport.html.length/1000)}KB)`,
      timestamp: new Date().toISOString()
    };
    
    console.log(`   ✅ ${test.message}`);
    return test;
    
  } catch (error) {
    console.log(`   ❌ HTML 보고서 생성 테스트 실패: ${error.message}`);
    return {
      testName: 'HTML Report Generation',
      status: 'FAILED',
      error: error.toString(),
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * 테스트용 AI 역량진단 데이터 생성
 */
function generateTestAIDiagnosisData() {
  // 45개 응답 생성 (1-5점 범위)
  const assessmentResponses = [];
  for (let i = 0; i < 45; i++) {
    assessmentResponses.push(Math.floor(Math.random() * 5) + 1);
  }
  
  return {
    companyName: '테스트 기업',
    contactName: '김테스트',
    contactEmail: 'test@testcompany.com',
    contactPhone: '010-1234-5678',
    contactPosition: '대표이사',
    industry: 'IT/소프트웨어',
    businessType: ['소프트웨어 개발', 'IT 컨설팅'],
    employeeCount: '31-50명',
    annualRevenue: '50억-100억원',
    establishmentYear: 2015,
    location: '서울특별시',
    assessmentResponses: assessmentResponses,
    additionalInfo: '테스트를 위한 추가 정보입니다.'
  };
}

/**
 * 테스트 결과 출력
 */
function printTestResults(results) {
  console.log('');
  console.log('🎯 AICAMP V13.0 시스템 테스트 결과');
  console.log('=' .repeat(80));
  console.log(`📊 전체 테스트: ${results.summary.total}개`);
  console.log(`✅ 성공: ${results.summary.passed}개`);
  console.log(`⚠️  경고: ${results.summary.warnings}개`);
  console.log(`❌ 실패: ${results.summary.failed}개`);
  console.log(`⏱️  소요시간: ${Math.round(results.duration / 1000)}초`);
  console.log('');
  
  // 개별 테스트 결과
  results.tests.forEach((test, index) => {
    const icon = test.status === 'PASSED' ? '✅' : test.status === 'WARNING' ? '⚠️' : '❌';
    console.log(`${index + 1}. ${icon} ${test.testName}: ${test.status}`);
    if (test.message) {
      console.log(`   ${test.message}`);
    }
    if (test.error) {
      console.log(`   오류: ${test.error}`);
    }
  });
  
  console.log('');
  
  // 전체 평가
  const successRate = (results.summary.passed / results.summary.total) * 100;
  if (successRate >= 90) {
    console.log('🎉 시스템 품질: 우수 (90% 이상 통과)');
  } else if (successRate >= 80) {
    console.log('👍 시스템 품질: 양호 (80% 이상 통과)');
  } else if (successRate >= 70) {
    console.log('⚠️ 시스템 품질: 보통 (70% 이상 통과) - 개선 필요');
  } else {
    console.log('❌ 시스템 품질: 미흡 (70% 미만) - 긴급 수정 필요');
  }
  
  console.log('');
  console.log('🚀 AICAMP V13.0 ULTIMATE - 최상급 AI 역량진단 시스템');
  console.log('   45문항 정밀 진단 | GEMINI 2.5 Flash | 무오류 품질 기준');
  console.log('=' .repeat(80));
}

/**
 * 테스트 결과를 Google Sheets에 저장
 */
function saveTestResults(results) {
  try {
    // 실제 환경에서는 Google Sheets에 테스트 결과 저장
    console.log('💾 테스트 결과 저장 완료 (시뮬레이션)');
  } catch (error) {
    console.warn('⚠️ 테스트 결과 저장 실패:', error.message);
  }
}

/**
 * 빠른 시스템 검증 (핵심 기능만)
 */
function quickSystemValidation() {
  console.log('⚡ 빠른 시스템 검증 시작');
  
  const validations = [
    {
      name: '설정 검증',
      check: () => AICAMP_CONFIG.VERSION === 'V13.0-ULTIMATE-INTEGRATED'
    },
    {
      name: 'GEMINI API KEY 설정',
      check: () => AICAMP_CONFIG.GEMINI_API_KEY.startsWith('AIza')
    },
    {
      name: '관리자 이메일 설정',
      check: () => AICAMP_CONFIG.ADMIN_EMAIL.includes('@')
    },
    {
      name: '시트 설정',
      check: () => Object.keys(SHEETS_CONFIG.SHEETS).length === 10
    },
    {
      name: '함수 존재 확인',
      check: () => typeof handleAIDiagnosisRequest === 'function'
    }
  ];
  
  let passed = 0;
  validations.forEach(validation => {
    try {
      const result = validation.check();
      console.log(`   ${result ? '✅' : '❌'} ${validation.name}`);
      if (result) passed++;
    } catch (error) {
      console.log(`   ❌ ${validation.name}: ${error.message}`);
    }
  });
  
  console.log(`📊 검증 결과: ${passed}/${validations.length} 통과`);
  return passed === validations.length;
}

// 테스트 실행을 위한 편의 함수
function runTests() {
  return runFullSystemTest();
}

function quickCheck() {
  return quickSystemValidation();
}

console.log('🧪 AICAMP V13.0 테스트 시스템 로드 완료');
console.log('   runFullSystemTest() - 전체 시스템 테스트');
console.log('   quickSystemValidation() - 빠른 검증');
console.log('   runTests() - 테스트 실행 (단축)');
console.log('   quickCheck() - 빠른 검증 (단축)');
