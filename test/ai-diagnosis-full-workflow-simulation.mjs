/**
 * ================================================================================
 * 🎓 AI 역량진단 전체 워크플로우 시뮬레이션 테스트
 * ================================================================================
 * 
 * Ollama GPT-OSS 20B 온디바이스 모델을 활용한 완전한 워크플로우 테스트:
 * 1. 45문항 실제 점수 계산
 * 2. SWOT 분석 생성
 * 3. 우선순위 매트릭스 및 로드맵
 * 4. HTML 보고서 생성
 * 5. 이메일 발송
 * 6. Google Drive 업로드
 */

import fetch from 'node-fetch';
import { AbortController } from 'node-abort-controller';

// 환경 설정
const BASE_URL = 'http://localhost:3000';
const TIMEOUT_MS = 900000; // 15분 타임아웃

/**
 * 실제 기업 데이터 시뮬레이션 (45문항 포함)
 */
function generateRealisticCompanyData() {
  // 실제 45문항 응답 데이터 (1-5점 척도)
  const responses = [
    // AI 전략 및 비전 (1-9문항)
    4, 3, 4, 3, 2, 4, 3, 3, 4,
    // AI 기술 역량 (10-18문항) 
    3, 2, 3, 2, 2, 3, 2, 3, 2,
    // 데이터 관리 (19-27문항)
    3, 4, 3, 4, 3, 3, 4, 3, 4,
    // 프로세스 혁신 (28-36문항)
    2, 3, 2, 3, 2, 2, 3, 2, 3,
    // 조직 문화 (37-45문항)
    4, 3, 4, 3, 4, 3, 4, 3, 4
  ];

  return {
    // 기본 정보
    companyName: '(주)미래테크솔루션',
    contactName: '김혁신',
    contactEmail: 'innovation@futuretech.co.kr',
    contactPhone: '02-1234-5678',
    contactPosition: 'CTO',
    businessRegistration: '123-45-67890',
    
    // 회사 정보
    industry: 'IT/소프트웨어',
    employeeCount: '51-100명',
    annualRevenue: '100억원-500억원',
    establishmentYear: '2018',
    
    // 사업 내용
    businessContent: 'B2B SaaS 플랫폼 개발 및 운영, 클라우드 기반 업무 자동화 솔루션 제공',
    mainProducts: 'ERP 시스템, CRM 솔루션, 업무 자동화 플랫폼',
    targetCustomers: '중소기업, 스타트업, 제조업체',
    currentChallenges: 'AI 기술 도입을 통한 제품 경쟁력 강화, 개발 생산성 향상, 고객 맞춤형 서비스 제공',
    
    // 45문항 응답
    responses: responses,
    assessmentResponses: responses,
    
    // 필수 동의
    privacyConsent: true,
    
    // 메타데이터
    timestamp: new Date().toISOString(),
    testType: 'full_workflow_simulation'
  };
}

/**
 * HTTP 요청 헬퍼 (타임아웃 포함)
 */
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
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error(`요청 타임아웃 (${TIMEOUT_MS/1000}초)`);
    }
    throw error;
  }
}

/**
 * 진행상황 모니터링
 */
async function monitorProgress(diagnosisId, maxAttempts = 60) {
  console.log(`📊 진행상황 모니터링 시작: ${diagnosisId}`);
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await makeRequest(`${BASE_URL}/api/diagnosis-progress/${diagnosisId}`);
      
      if (result.success && result.progress) {
        const overall = result.progress.overallProgress ?? 0;
        const step = result.progress.currentStep ?? 'unknown';
        const completed = result.completed === true;
        console.log(`[${attempt}/${maxAttempts}] ${overall}%: ${step}`);
        
        if (completed) {
          console.log('✅ 워크플로우 완료!');
          return { success: true, progress: result.progress };
        }
      }
      
      // 30초 대기
      await new Promise(resolve => setTimeout(resolve, 30000));
      
    } catch (error) {
      console.log(`⚠️ 진행상황 조회 실패 (${attempt}/${maxAttempts}):`, error.message);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  return { success: false, error: '진행상황 모니터링 타임아웃' };
}

/**
 * 결과 분석 및 검증
 */
function analyzeResults(result) {
  console.log('\n🔍 결과 분석 및 검증');
  console.log('=' .repeat(60));
  
  const success = result?.success === true;
  const data = result?.data || {};
  const scoreAnalysis = data?.scoreAnalysis || result?.scoreAnalysis || {};
  const totalScore = data?.totalScore ?? scoreAnalysis?.totalScore;
  const grade = data?.grade ?? scoreAnalysis?.grade;
  const maturityLevel = data?.maturityLevel ?? scoreAnalysis?.maturityLevel;
  const processingInfo = result?.processingInfo || {};
  const steps = Array.isArray(processingInfo.steps) ? processingInfo.steps : [];

  const findStep = (name) => steps.find(s => s.name?.includes(name));
  const htmlStep = findStep('HTML 보고서');
  const emailStep = findStep('이메일 발송');
  const sheetStep = findStep('Google Sheets');

  const isScoreOk = typeof totalScore === 'number' && totalScore >= 45 && totalScore <= 225;
  const isReportOk = htmlStep?.status === 'completed';
  const isEmailOk = emailStep?.status === 'completed';
  const isSheetOk = sheetStep?.status === 'completed';

  const quality = {
    scoreCalculation: isScoreOk,
    reportGeneration: !!isReportOk,
    emailDelivery: !!isEmailOk,
    dataStorage: !!isSheetOk
  };

  const completedSteps = Object.values(quality).filter(Boolean).length;
  const completionRate = Math.round((completedSteps / 4) * 100);

  return {
    success,
    processingTime: result?.processingTime,
    scores: {
      totalScore: totalScore ?? 0,
      maturityLevel: maturityLevel || 'unknown',
      grade: grade || 'N/A',
      isRealistic: isScoreOk
    },
    quality,
    completeness: {
      totalSteps: 4,
      completedSteps,
      completionRate
    }
  };
}

/**
 * 결과 리포트 출력
 */
function printDetailedReport(analysis, diagnosisId) {
  console.log('\n📊 상세 결과 리포트');
  console.log('=' .repeat(60));
  
  // 기본 정보
  console.log(`🆔 진단 ID: ${diagnosisId}`);
  console.log(`✅ 전체 성공: ${analysis.success ? 'YES' : 'NO'}`);
  console.log(`⏱️  처리 시간: ${analysis.processingTime ? `${analysis.processingTime}ms` : 'N/A'}`);
  
  // 점수 분석
  console.log('\n📈 점수 분석 결과:');
  console.log(`   총점: ${analysis.scores.totalScore}점`);
  console.log(`   등급: ${analysis.scores.grade}`);
  console.log(`   성숙도: ${analysis.scores.maturityLevel}`);
  console.log(`   점수 유효성: ${analysis.scores.isRealistic ? '✅ 정상' : '❌ 비정상'}`);
  
  // 품질 검증
  console.log('\n🔍 품질 검증 결과:');
  console.log(`   점수 계산: ${analysis.quality.scoreCalculation ? '✅ 통과' : '❌ 실패'}`);
  console.log(`   보고서 생성: ${analysis.quality.reportGeneration ? '✅ 통과' : '❌ 실패'}`);
  console.log(`   이메일 발송: ${analysis.quality.emailDelivery ? '✅ 통과' : '❌ 실패'}`);
  console.log(`   데이터 저장: ${analysis.quality.dataStorage ? '✅ 통과' : '❌ 실패'}`);
  
  // 완성도
  console.log('\n📋 완성도 평가:');
  console.log(`   완료 단계: ${analysis.completeness.completedSteps}/${analysis.completeness.totalSteps}`);
  console.log(`   완성률: ${analysis.completeness.completionRate}%`);
  
  // 최종 평가
  const overallGrade = analysis.completeness.completionRate >= 100 ? 'A+' : 
                      analysis.completeness.completionRate >= 75 ? 'A' :
                      analysis.completeness.completionRate >= 50 ? 'B' : 'C';
  
  console.log(`\n🎯 최종 평가: ${overallGrade} (${analysis.completeness.completionRate}%)`);
}

/**
 * 메인 시뮬레이션 실행
 */
async function runFullWorkflowSimulation() {
  const startTime = Date.now();
  
  console.log('🚀 AI 역량진단 전체 워크플로우 시뮬레이션 시작');
  console.log('=' .repeat(60));
  console.log(`🌐 테스트 환경: ${BASE_URL}`);
  console.log(`⏰ 시작 시간: ${new Date().toLocaleString('ko-KR')}`);
  console.log(`⏱️  타임아웃: ${TIMEOUT_MS/1000}초`);
  
  try {
    // 1단계: 테스트 데이터 생성
    console.log('\n📋 1단계: 실제 기업 데이터 생성');
    const testData = generateRealisticCompanyData();
    console.log(`   회사명: ${testData.companyName}`);
    console.log(`   업종: ${testData.industry}`);
    console.log(`   직원수: ${testData.employeeCount}`);
    console.log(`   45문항 응답: ${testData.responses.length}개 (평균: ${(testData.responses.reduce((a,b) => a+b, 0) / testData.responses.length).toFixed(1)}점)`);
    
    // 2단계: AI 역량진단 API 호출
    console.log('\n🤖 2단계: AI 역량진단 API 호출');
    console.log('   Ollama GPT-OSS 20B 모델 분석 시작...');
    
    const diagnosisResult = await makeRequest(`${BASE_URL}/api/ai-diagnosis`, {
      method: 'POST',
      body: JSON.stringify(testData)
    });
    
    console.log(`   ✅ API 응답 수신: ${diagnosisResult.success ? '성공' : '실패'}`);
    
    if (!diagnosisResult.success) {
      throw new Error(`API 호출 실패: ${diagnosisResult.error}`);
    }
    
    const diagnosisId = diagnosisResult.diagnosisId;
    console.log(`   🆔 진단 ID: ${diagnosisId}`);
    
    // 3단계: 진행상황 모니터링
    console.log('\n📊 3단계: 실시간 진행상황 모니터링');
    const progressResult = await monitorProgress(diagnosisId);
    
    if (!progressResult.success) {
      console.warn(`⚠️ 진행상황 모니터링 실패: ${progressResult.error}`);
    }
    
    // 4단계: 결과 분석
    console.log('\n🔍 4단계: 결과 분석 및 검증');
    const analysis = analyzeResults(diagnosisResult);
    
    // 5단계: 상세 리포트 출력
    printDetailedReport(analysis, diagnosisId);
    
    // 6단계: 추가 검증 (SWOT 분석 단독 테스트)
    console.log('\n⚡ 6단계: SWOT 분석 단독 검증');
    try {
      const swotResult = await makeRequest(`${BASE_URL}/api/swot-analysis`, {
        method: 'POST',
        body: JSON.stringify({
          companyName: testData.companyName,
          industry: testData.industry,
          scoreAnalysis: analysis.scores
        })
      });
      
      console.log(`   SWOT 분석: ${swotResult.success ? '✅ 성공' : '❌ 실패'}`);
    } catch (error) {
      console.log(`   SWOT 분석: ❌ 오류 - ${error.message}`);
    }
    
    // 7단계: 이메일 발송 단독 테스트
    console.log('\n📧 7단계: 이메일 발송 단독 검증');
    try {
      const emailResult = await makeRequest(`${BASE_URL}/api/send-email`, {
        method: 'POST',
        body: JSON.stringify({
          to: 'test-simulation@aicamp.club',
          type: 'diagnosis_confirmation',
          companyName: testData.companyName,
          contactName: testData.contactName,
          diagnosisId: diagnosisId
        })
      });
      
      console.log(`   이메일 발송: ${emailResult.success ? '✅ 성공' : '❌ 실패'}`);
    } catch (error) {
      console.log(`   이메일 발송: ❌ 오류 - ${error.message}`);
    }
    
    const totalTime = Date.now() - startTime;
    
    console.log('\n🎉 시뮬레이션 완료!');
    console.log('=' .repeat(60));
    console.log(`⏱️  총 소요 시간: ${Math.round(totalTime/1000)}초`);
    console.log(`🎯 최종 결과: ${analysis.success ? '✅ 성공' : '❌ 실패'}`);
    console.log(`📊 완성도: ${analysis.completeness?.completionRate || 0}%`);
    
    return {
      success: analysis.success,
      diagnosisId: diagnosisId,
      totalTime: totalTime,
      analysis: analysis
    };
    
  } catch (error) {
    const totalTime = Date.now() - startTime;
    
    console.error('\n❌ 시뮬레이션 실패!');
    console.error('=' .repeat(60));
    console.error(`오류: ${error.message}`);
    console.error(`소요 시간: ${Math.round(totalTime/1000)}초`);
    
    return {
      success: false,
      error: error.message,
      totalTime: totalTime
    };
  }
}

// 시뮬레이션 실행
console.log('🎓 이교장의AI역량진단보고서 - 전체 워크플로우 시뮬레이션');
console.log('Ollama GPT-OSS 20B 모델 기반 완전한 테스트');
console.log('');

runFullWorkflowSimulation()
  .then(result => {
    if (result.success) {
      console.log('\n🏆 시뮬레이션 성공적으로 완료!');
      process.exit(0);
    } else {
      console.log('\n💥 시뮬레이션 실패');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('\n💥 예상치 못한 오류:', error);
    process.exit(1);
  });
