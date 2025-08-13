/**
 * 시스템 안정성 검증 도구
 * AI 역량진단 시스템의 안정성과 성능을 검증
 */

export interface StabilityTestResult {
  testName: string;
  passed: boolean;
  score: number;
  details: string;
  recommendations: string[];
}

export interface SystemStabilityReport {
  overallStability: number;
  testResults: StabilityTestResult[];
  criticalIssues: string[];
  warnings: string[];
  recommendations: string[];
  timestamp: string;
}

export class SystemStabilityValidator {
  
  /**
   * 전체 시스템 안정성 검증
   */
  static async validateSystemStability(
    sampleData: any = null
  ): Promise<SystemStabilityReport> {
    console.log('🔍 시스템 안정성 검증 시작...');
    
    const testResults: StabilityTestResult[] = [];
    const criticalIssues: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];
    
    // 1. 점수 계산 엔진 안정성 테스트
    const scoreEngineTest = await this.testScoreCalculationEngine(sampleData);
    testResults.push(scoreEngineTest);
    if (!scoreEngineTest.passed) criticalIssues.push(scoreEngineTest.details);
    
    // 2. 3차원 매트릭스 생성 테스트
    const matrixTest = await this.test3DMatrixGeneration(sampleData);
    testResults.push(matrixTest);
    if (!matrixTest.passed) criticalIssues.push(matrixTest.details);
    
    // 3. AI CAMP 프로그램 매칭 테스트
    const programMatchingTest = await this.testProgramMatching(sampleData);
    testResults.push(programMatchingTest);
    if (!programMatchingTest.passed) warnings.push(programMatchingTest.details);
    
    // 4. 고몰입조직 지표 분석 테스트
    const engagementTest = await this.testEngagementAnalysis(sampleData);
    testResults.push(engagementTest);
    if (!engagementTest.passed) warnings.push(engagementTest.details);
    
    // 5. 품질 모니터링 시스템 테스트
    const qualityTest = await this.testQualityMonitoring(sampleData);
    testResults.push(qualityTest);
    if (!qualityTest.passed) warnings.push(qualityTest.details);
    
    // 6. 메모리 사용량 테스트
    const memoryTest = this.testMemoryUsage();
    testResults.push(memoryTest);
    if (!memoryTest.passed) warnings.push(memoryTest.details);
    
    // 7. 응답 시간 테스트
    const performanceTest = await this.testResponseTime();
    testResults.push(performanceTest);
    if (!performanceTest.passed) warnings.push(performanceTest.details);
    
    // 전체 안정성 점수 계산
    const overallStability = Math.round(
      testResults.reduce((sum, test) => sum + test.score, 0) / testResults.length
    );
    
    // 종합 권고사항 생성
    if (overallStability < 70) {
      recommendations.push('시스템 전반적인 안정성 개선 필요');
    }
    if (criticalIssues.length > 0) {
      recommendations.push('중요한 문제들을 즉시 해결해야 함');
    }
    if (warnings.length > 2) {
      recommendations.push('경고 사항들에 대한 점검 및 개선 계획 수립');
    }
    
    console.log(`✅ 시스템 안정성 검증 완료: ${overallStability}점`);
    
    return {
      overallStability,
      testResults,
      criticalIssues,
      warnings,
      recommendations,
      timestamp: new Date().toISOString()
    };
  }
  
  /**
   * 점수 계산 엔진 안정성 테스트
   */
  private static async testScoreCalculationEngine(sampleData: any): Promise<StabilityTestResult> {
    try {
      const { calculateEnhancedScores } = await import('./enhanced-score-engine');
      
      const testData = sampleData || this.generateSampleData();
      const startTime = Date.now();
      
      const scores = calculateEnhancedScores(testData);
      const processingTime = Date.now() - startTime;
      
      // 검증 조건
      const validTotalScore = scores.totalScore >= 0 && scores.totalScore <= 100;
      const validCategoryScores = Object.values(scores.categoryScores).every(
        score => score >= 0 && score <= 100
      );
      const reasonableProcessingTime = processingTime < 1000; // 1초 이내
      
      const passed = validTotalScore && validCategoryScores && reasonableProcessingTime;
      const score = passed ? 100 : (validTotalScore && validCategoryScores ? 70 : 30);
      
      return {
        testName: '점수 계산 엔진 안정성',
        passed,
        score,
        details: passed 
          ? `정상 작동 (처리시간: ${processingTime}ms)`
          : `오류 발생: 점수 범위 또는 처리 시간 문제`,
        recommendations: passed ? [] : [
          '점수 계산 로직 검토',
          '성능 최적화 필요',
          '예외 처리 강화'
        ]
      };
    } catch (error: any) {
      return {
        testName: '점수 계산 엔진 안정성',
        passed: false,
        score: 0,
        details: `심각한 오류: ${error.message}`,
        recommendations: [
          '점수 계산 엔진 긴급 수정 필요',
          '의존성 문제 해결',
          '오류 처리 로직 추가'
        ]
      };
    }
  }
  
  /**
   * 3차원 매트릭스 생성 테스트
   */
  private static async test3DMatrixGeneration(sampleData: any): Promise<StabilityTestResult> {
    try {
      const { 
        calculateEnhancedScores, 
        analyzeBenchmarkGap, 
        generateEnhancedSWOTAnalysis, 
        generate3DPriorityMatrix 
      } = await import('./enhanced-score-engine');
      
      const testData = sampleData || this.generateSampleData();
      const startTime = Date.now();
      
      const scores = calculateEnhancedScores(testData);
      const gapAnalysis = analyzeBenchmarkGap(scores, testData.industry || 'IT/소프트웨어', testData.employeeCount || '10-30명');
      const swotAnalysis = generateEnhancedSWOTAnalysis(scores, gapAnalysis, testData);
      const priorityMatrix = generate3DPriorityMatrix(scores, gapAnalysis, swotAnalysis, testData);
      
      const processingTime = Date.now() - startTime;
      
      // 검증 조건
      const hasActionItems = priorityMatrix.actionItems && priorityMatrix.actionItems.length > 0;
      const hasQuadrants = priorityMatrix.quadrants && Object.keys(priorityMatrix.quadrants).length === 4;
      const hasRoadmap = priorityMatrix.executionRoadmap && Object.keys(priorityMatrix.executionRoadmap).length === 3;
      const reasonableProcessingTime = processingTime < 2000; // 2초 이내
      
      const passed = hasActionItems && hasQuadrants && hasRoadmap && reasonableProcessingTime;
      const score = passed ? 95 : (hasActionItems && hasQuadrants ? 75 : 40);
      
      return {
        testName: '3차원 매트릭스 생성',
        passed,
        score,
        details: passed 
          ? `정상 생성 (액션 아이템: ${priorityMatrix.actionItems.length}개, 처리시간: ${processingTime}ms)`
          : '매트릭스 생성 불완전',
        recommendations: passed ? [] : [
          '매트릭스 생성 로직 점검',
          'SWOT 분석 연계 강화',
          '성능 최적화'
        ]
      };
    } catch (error: any) {
      return {
        testName: '3차원 매트릭스 생성',
        passed: false,
        score: 0,
        details: `생성 실패: ${error.message}`,
        recommendations: [
          '매트릭스 생성 엔진 수정',
          '데이터 흐름 점검',
          '예외 처리 추가'
        ]
      };
    }
  }
  
  /**
   * AI CAMP 프로그램 매칭 테스트
   */
  private static async testProgramMatching(sampleData: any): Promise<StabilityTestResult> {
    try {
      const { AICampProgramMatcher } = await import('./aicamp-program-matcher');
      const { 
        calculateEnhancedScores, 
        analyzeBenchmarkGap, 
        generateEnhancedSWOTAnalysis, 
        generate3DPriorityMatrix 
      } = await import('./enhanced-score-engine');
      
      const testData = sampleData || this.generateSampleData();
      const startTime = Date.now();
      
      const scores = calculateEnhancedScores(testData);
      const gapAnalysis = analyzeBenchmarkGap(scores, testData.industry || 'IT/소프트웨어', testData.employeeCount || '10-30명');
      const swotAnalysis = generateEnhancedSWOTAnalysis(scores, gapAnalysis, testData);
      const priorityMatrix = generate3DPriorityMatrix(scores, gapAnalysis, swotAnalysis, testData);
      
      const recommendations = AICampProgramMatcher.recommendPrograms(
        scores, gapAnalysis, priorityMatrix, testData
      );
      
      const processingTime = Date.now() - startTime;
      
      // 검증 조건
      const hasPrograms = Object.values(recommendations).some(programs => programs.length > 0);
      const hasInvestment = recommendations.totalInvestment > 0;
      const hasROI = recommendations.expectedROI && recommendations.expectedROI.length > 0;
      const reasonableProcessingTime = processingTime < 1500; // 1.5초 이내
      
      const passed = hasPrograms && hasInvestment && hasROI && reasonableProcessingTime;
      const score = passed ? 90 : (hasPrograms ? 70 : 45);
      
      return {
        testName: 'AI CAMP 프로그램 매칭',
        passed,
        score,
        details: passed 
          ? `매칭 성공 (투자액: ${recommendations.totalInvestment.toLocaleString()}원, 처리시간: ${processingTime}ms)`
          : '프로그램 매칭 불완전',
        recommendations: passed ? [] : [
          '프로그램 매칭 로직 개선',
          'ROI 계산 정확성 향상',
          '매칭 알고리즘 최적화'
        ]
      };
    } catch (error: any) {
      return {
        testName: 'AI CAMP 프로그램 매칭',
        passed: false,
        score: 0,
        details: `매칭 실패: ${error.message}`,
        recommendations: [
          '프로그램 매칭 시스템 수정',
          '데이터 구조 점검',
          '매칭 엔진 안정성 개선'
        ]
      };
    }
  }
  
  /**
   * 고몰입조직 지표 분석 테스트
   */
  private static async testEngagementAnalysis(sampleData: any): Promise<StabilityTestResult> {
    try {
      const { HighEngagementOrganizationAnalyzer } = await import('./high-engagement-organization-metrics');
      const { 
        calculateEnhancedScores, 
        analyzeBenchmarkGap, 
        generate3DPriorityMatrix,
        generateEnhancedSWOTAnalysis
      } = await import('./enhanced-score-engine');
      
      const testData = sampleData || this.generateSampleData();
      const startTime = Date.now();
      
      const scores = calculateEnhancedScores(testData);
      const gapAnalysis = analyzeBenchmarkGap(scores, testData.industry || 'IT/소프트웨어', testData.employeeCount || '10-30명');
      const swotAnalysis = generateEnhancedSWOTAnalysis(scores, gapAnalysis, testData);
      const priorityMatrix = generate3DPriorityMatrix(scores, gapAnalysis, swotAnalysis, testData);
      
      const engagementMetrics = HighEngagementOrganizationAnalyzer.analyzeEngagementMetrics(
        testData, scores, gapAnalysis, priorityMatrix
      );
      
      const processingTime = Date.now() - startTime;
      
      // 검증 조건
      const validEngagementScore = engagementMetrics.overallEngagement >= 0 && engagementMetrics.overallEngagement <= 100;
      const hasAllMetrics = Object.values(engagementMetrics).every(metric => typeof metric === 'number' && metric >= 0);
      const reasonableProcessingTime = processingTime < 1000; // 1초 이내
      
      const passed = validEngagementScore && hasAllMetrics && reasonableProcessingTime;
      const score = passed ? 85 : (validEngagementScore ? 65 : 35);
      
      return {
        testName: '고몰입조직 지표 분석',
        passed,
        score,
        details: passed 
          ? `분석 완료 (전체 몰입도: ${engagementMetrics.overallEngagement}점, 처리시간: ${processingTime}ms)`
          : '지표 분석 불완전',
        recommendations: passed ? [] : [
          '몰입도 계산 로직 검토',
          '지표 검증 강화',
          '분석 알고리즘 개선'
        ]
      };
    } catch (error: any) {
      return {
        testName: '고몰입조직 지표 분석',
        passed: false,
        score: 0,
        details: `분석 실패: ${error.message}`,
        recommendations: [
          '몰입도 분석 시스템 수정',
          '계산 로직 점검',
          '데이터 처리 안정성 개선'
        ]
      };
    }
  }
  
  /**
   * 품질 모니터링 시스템 테스트
   */
  private static async testQualityMonitoring(sampleData: any): Promise<StabilityTestResult> {
    try {
      const { QualityMonitoringSystem } = await import('./quality-monitoring-system');
      
      const testData = sampleData || this.generateSampleData();
      const startTime = Date.now();
      
      const qualityMonitor = QualityMonitoringSystem.getInstance();
      
      // 모의 데이터로 품질 평가
      const mockScores = { totalScore: 75, categoryScores: {}, detailedAnalysis: {} };
      const mockGapAnalysis = { competitivePosition: 'Average', priorityAreas: [] };
      const mockSWOT = { strengths: {}, weaknesses: {}, opportunities: {}, threats: {} };
      const mockMatrix = { actionItems: [], quadrants: {} };
      const mockPrograms = { immediate: [], shortTerm: [] };
      
      const qualityReport = await qualityMonitor.evaluateDiagnosisQuality(
        testData, mockScores, mockGapAnalysis, mockSWOT, mockMatrix, mockPrograms
      );
      
      const processingTime = Date.now() - startTime;
      
      // 검증 조건
      const hasQualityScore = qualityReport.overallScore >= 0 && qualityReport.overallScore <= 100;
      const hasMetrics = qualityReport.metrics && Object.keys(qualityReport.metrics).length > 0;
      const reasonableProcessingTime = processingTime < 2000; // 2초 이내
      
      const passed = hasQualityScore && hasMetrics && reasonableProcessingTime;
      const score = passed ? 80 : (hasQualityScore ? 60 : 30);
      
      return {
        testName: '품질 모니터링 시스템',
        passed,
        score,
        details: passed 
          ? `모니터링 정상 (품질점수: ${qualityReport.overallScore}점, 처리시간: ${processingTime}ms)`
          : '품질 모니터링 불완전',
        recommendations: passed ? [] : [
          '품질 평가 로직 개선',
          '모니터링 정확성 향상',
          '성능 최적화'
        ]
      };
    } catch (error: any) {
      return {
        testName: '품질 모니터링 시스템',
        passed: false,
        score: 0,
        details: `모니터링 실패: ${error.message}`,
        recommendations: [
          '품질 모니터링 시스템 수정',
          '싱글톤 패턴 점검',
          '메모리 누수 방지'
        ]
      };
    }
  }
  
  /**
   * 메모리 사용량 테스트
   */
  private static testMemoryUsage(): StabilityTestResult {
    try {
      const memoryUsage = process.memoryUsage();
      const heapUsedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);
      const heapTotalMB = Math.round(memoryUsage.heapTotal / 1024 / 1024);
      const memoryUtilization = (heapUsedMB / heapTotalMB) * 100;
      
      // 메모리 사용량 기준 (실제 환경에 맞게 조정 필요)
      const passed = heapUsedMB < 200 && memoryUtilization < 80; // 200MB 미만, 80% 미만
      const score = passed ? 90 : (heapUsedMB < 300 ? 70 : 40);
      
      return {
        testName: '메모리 사용량',
        passed,
        score,
        details: `힙 사용량: ${heapUsedMB}MB / ${heapTotalMB}MB (${memoryUtilization.toFixed(1)}%)`,
        recommendations: passed ? [] : [
          '메모리 누수 점검',
          '불필요한 객체 정리',
          '가비지 컬렉션 최적화'
        ]
      };
    } catch (error: any) {
      return {
        testName: '메모리 사용량',
        passed: false,
        score: 0,
        details: `메모리 측정 실패: ${error.message}`,
        recommendations: [
          '메모리 모니터링 시스템 점검',
          '프로세스 상태 확인'
        ]
      };
    }
  }
  
  /**
   * 응답 시간 테스트
   */
  private static async testResponseTime(): Promise<StabilityTestResult> {
    try {
      const iterations = 3;
      const times: number[] = [];
      
      for (let i = 0; i < iterations; i++) {
        const startTime = Date.now();
        
        // 간단한 계산 작업으로 응답 시간 측정
        await new Promise(resolve => setTimeout(resolve, 10));
        const testData = this.generateSampleData();
        JSON.stringify(testData);
        
        times.push(Date.now() - startTime);
      }
      
      const avgTime = Math.round(times.reduce((sum, time) => sum + time, 0) / times.length);
      const maxTime = Math.max(...times);
      
      // 응답 시간 기준
      const passed = avgTime < 50 && maxTime < 100; // 평균 50ms 미만, 최대 100ms 미만
      const score = passed ? 95 : (avgTime < 100 ? 75 : 50);
      
      return {
        testName: '응답 시간',
        passed,
        score,
        details: `평균: ${avgTime}ms, 최대: ${maxTime}ms`,
        recommendations: passed ? [] : [
          '응답 시간 최적화',
          '비동기 처리 개선',
          '캐싱 전략 검토'
        ]
      };
    } catch (error: any) {
      return {
        testName: '응답 시간',
        passed: false,
        score: 0,
        details: `응답 시간 측정 실패: ${error.message}`,
        recommendations: [
          '성능 측정 시스템 점검',
          '비동기 처리 로직 확인'
        ]
      };
    }
  }
  
  /**
   * 샘플 데이터 생성
   */
  private static generateSampleData(): any {
    return {
      contactName: '테스트 담당자',
      contactEmail: 'test@example.com',
      companyName: '테스트 기업',
      industry: 'IT/소프트웨어',
      employeeCount: '10-30명',
      annualRevenue: '10억-50억',
      currentAI: 3,
      organizationReadiness: 3,
      techInfrastructure: 3,
      goalClarity: 3,
      executionCapability: 3,
      businessFoundation: 3,
      leadershipSupport: 3,
      changeReadiness: 3,
      employeeAttitude: 3,
      budgetAllocation: 3,
      trainingInvestment: 3,
      aiFamiliarity: 3,
      dataQuality: 3,
      systemIntegration: 3,
      aiTransformationGoals: ['업무 효율성 향상', '고객 서비스 개선']
    };
  }
}

/**
 * 시스템 헬스체크 실행
 */
export async function runSystemHealthCheck(): Promise<SystemStabilityReport> {
  console.log('🏥 시스템 헬스체크 시작...');
  
  const stabilityReport = await SystemStabilityValidator.validateSystemStability();
  
  console.log(`🏥 시스템 헬스체크 완료: 전체 안정성 ${stabilityReport.overallStability}점`);
  console.log(`⚠️ 중요 문제: ${stabilityReport.criticalIssues.length}개`);
  console.log(`⚠️ 경고 사항: ${stabilityReport.warnings.length}개`);
  
  return stabilityReport;
}
