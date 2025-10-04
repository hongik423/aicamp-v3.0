/**
 * ================================================================================
 * 🎓 AI 역량진단 전체 프로세스 E2E 테스트
 * ================================================================================
 * 
 * 신청 → 분석 → 보고서 생성 → Google Drive 저장 → 이메일 발송
 * 완전한 End-to-End 테스트
 */

import fetch from 'node-fetch';
import { AbortController } from 'node-abort-controller';

// 환경 설정
const BASE_URL = 'https://aicamp.club';
const TIMEOUT_MS = 900000; // 15분

/**
 * 실제 기업 데이터 생성 (완전한 45문항 포함)
 */
function generateCompleteDiagnosisData() {
  // 실제 45문항 응답 (1-5점 척도, 현실적인 분포)
  const responses = [
    // AI 전략 및 비전 (1-9문항) - 평균 3.2점
    4, 3, 3, 4, 2, 3, 4, 3, 3,
    // AI 기술 역량 (10-18문항) - 평균 2.8점 (기술 부족)
    3, 2, 3, 2, 3, 2, 4, 2, 3,
    // 데이터 관리 (19-27문항) - 평균 3.5점 (상대적 강점)
    4, 3, 4, 3, 4, 3, 4, 3, 4,
    // 프로세스 혁신 (28-36문항) - 평균 2.9점
    3, 2, 3, 3, 2, 3, 2, 4, 3,
    // 조직 문화 (37-45문항) - 평균 3.7점 (강점)
    4, 4, 3, 4, 3, 4, 4, 3, 4
  ];

  return {
    // 기본 정보
    companyName: '(주)혁신테크솔루션',
    contactName: '김진혁',
    contactEmail: 'innovation.test@aicamp.club',
    contactPhone: '02-2024-1234',
    contactPosition: 'CTO',
    businessRegistration: '123-45-67890',
    
    // 회사 상세 정보
    industry: 'IT/소프트웨어',
    employeeCount: '51-100명',
    annualRevenue: '100억원-500억원',
    establishmentYear: '2019',
    
    // 사업 내용
    businessContent: 'B2B SaaS 플랫폼 개발, 클라우드 기반 업무 자동화 솔루션 제공, AI 기반 데이터 분석 서비스',
    mainProducts: 'ERP 시스템, CRM 솔루션, 업무 자동화 플랫폼, 데이터 분석 대시보드',
    targetCustomers: '중소기업, 제조업체, 서비스업체, 스타트업',
    currentChallenges: 'AI 기술 도입을 통한 제품 경쟁력 강화, 개발 생산성 향상, 고객 맞춤형 AI 서비스 개발, 조직의 AI 역량 강화',
    
    // 45문항 응답
    responses: responses,
    assessmentResponses: responses,
    
    // 필수 동의
    privacyConsent: true,
    
    // 메타데이터
    timestamp: new Date().toISOString(),
    testType: 'full_e2e_test',
    expectedScore: responses.reduce((sum, score) => sum + score, 0), // 예상 총점
    expectedGrade: 'B' // 평균 3.2점 예상
  };
}

/**
 * HTTP 요청 헬퍼
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
        'User-Agent': 'AICAMP-E2E-Test/1.0',
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
 * 진행상황 실시간 모니터링
 */
async function monitorDiagnosisProgress(diagnosisId, maxAttempts = 40) {
  console.log(`📊 진행상황 실시간 모니터링: ${diagnosisId}`);
  
  const progressLog = [];
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await makeRequest(`${BASE_URL}/api/diagnosis-progress/${diagnosisId}`);
      
      if (result.success && result.progress) {
        const { status, message, updateTime } = result.progress;
        const logEntry = `[${attempt}/${maxAttempts}] ${status}: ${message}`;
        
        console.log(logEntry);
        progressLog.push({
          attempt,
          status,
          message,
          updateTime: new Date(updateTime).toLocaleTimeString()
        });
        
        if (status === 'completed') {
          console.log('✅ 진단 워크플로우 완료!');
          return { 
            success: true, 
            progress: result.progress,
            progressLog: progressLog,
            totalAttempts: attempt
          };
        }
        
        if (status === 'error') {
          console.log('❌ 진단 워크플로우 오류 발생');
          return { 
            success: false, 
            error: message,
            progressLog: progressLog,
            totalAttempts: attempt
          };
        }
      }
      
      // 30초 대기 후 다시 확인
      await new Promise(resolve => setTimeout(resolve, 30000));
      
    } catch (error) {
      console.log(`⚠️ 진행상황 조회 실패 (${attempt}/${maxAttempts}):`, error.message);
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
  
  return { 
    success: false, 
    error: '진행상황 모니터링 타임아웃',
    progressLog: progressLog,
    totalAttempts: maxAttempts
  };
}

/**
 * 보고서 생성 결과 분석
 */
function analyzeReportResults(diagnosisResult, testData) {
  console.log('\n🔍 보고서 생성 결과 분석');
  console.log('=' .repeat(60));
  
  const analysis = {
    basic: {},
    scores: {},
    features: {},
    quality: {}
  };
  
  // 기본 정보 검증
  analysis.basic = {
    success: diagnosisResult.success,
    diagnosisId: diagnosisResult.diagnosisId,
    processingTime: diagnosisResult.processingTime,
    hasResults: !!diagnosisResult.results
  };
  
  if (diagnosisResult.results) {
    const { totalScore, maturityLevel, grade, reportGenerated, emailsSent, dataSaved, driveUploaded } = diagnosisResult.results;
    
    // 점수 분석
    analysis.scores = {
      totalScore: totalScore || 0,
      expectedScore: testData.expectedScore,
      scoreDifference: Math.abs((totalScore || 0) - testData.expectedScore),
      grade: grade || 'F',
      expectedGrade: testData.expectedGrade,
      maturityLevel: maturityLevel || 'unknown',
      scoreAccuracy: Math.abs((totalScore || 0) - testData.expectedScore) <= 10 // 10점 오차 허용
    };
    
    // 기능 검증
    analysis.features = {
      reportGeneration: reportGenerated === true,
      emailDelivery: emailsSent === true,
      dataStorage: dataSaved === true,
      driveUpload: driveUploaded === true
    };
    
    // 품질 평가
    const completedFeatures = Object.values(analysis.features).filter(Boolean).length;
    analysis.quality = {
      totalFeatures: 4,
      completedFeatures: completedFeatures,
      completionRate: Math.round((completedFeatures / 4) * 100),
      overallGrade: completedFeatures === 4 ? 'A+' : 
                   completedFeatures === 3 ? 'A' :
                   completedFeatures === 2 ? 'B' : 'C'
    };
  }
  
  return analysis;
}

/**
 * 상세 테스트 리포트 출력
 */
function printDetailedTestReport(analysis, progressResult, testData) {
  console.log('\n📊 상세 테스트 리포트');
  console.log('=' .repeat(60));
  
  // 기본 정보
  console.log(`🆔 진단 ID: ${analysis.basic.diagnosisId}`);
  console.log(`✅ 전체 성공: ${analysis.basic.success ? 'YES' : 'NO'}`);
  console.log(`⏱️  처리 시간: ${analysis.basic.processingTime ? `${Math.round(analysis.basic.processingTime/1000)}초` : 'N/A'}`);
  console.log(`📊 모니터링 시도: ${progressResult.totalAttempts}회`);
  
  // 점수 분석
  console.log('\n📈 점수 분석 결과:');
  console.log(`   실제 총점: ${analysis.scores.totalScore}점`);
  console.log(`   예상 총점: ${analysis.scores.expectedScore}점`);
  console.log(`   점수 차이: ${analysis.scores.scoreDifference}점`);
  console.log(`   실제 등급: ${analysis.scores.grade}`);
  console.log(`   예상 등급: ${analysis.scores.expectedGrade}`);
  console.log(`   성숙도: ${analysis.scores.maturityLevel}`);
  console.log(`   점수 정확도: ${analysis.scores.scoreAccuracy ? '✅ 정확' : '❌ 부정확'}`);
  
  // 기능 검증
  console.log('\n🔍 기능 검증 결과:');
  console.log(`   보고서 생성: ${analysis.features.reportGeneration ? '✅ 성공' : '❌ 실패'}`);
  console.log(`   이메일 발송: ${analysis.features.emailDelivery ? '✅ 성공' : '❌ 실패'}`);
  console.log(`   데이터 저장: ${analysis.features.dataStorage ? '✅ 성공' : '❌ 실패'}`);
  console.log(`   Drive 업로드: ${analysis.features.driveUpload ? '✅ 성공' : '❌ 실패'}`);
  
  // 품질 평가
  console.log('\n📋 품질 평가:');
  console.log(`   완료 기능: ${analysis.quality.completedFeatures}/${analysis.quality.totalFeatures}`);
  console.log(`   완성률: ${analysis.quality.completionRate}%`);
  console.log(`   품질 등급: ${analysis.quality.overallGrade}`);
  
  // 진행 과정 요약
  if (progressResult.progressLog && progressResult.progressLog.length > 0) {
    console.log('\n📝 주요 진행 과정:');
    const keySteps = progressResult.progressLog.filter((log, index) => 
      index === 0 || 
      index === progressResult.progressLog.length - 1 || 
      log.status === 'error' ||
      log.message.includes('Ollama') ||
      log.message.includes('보고서') ||
      log.message.includes('이메일')
    );
    
    keySteps.forEach(step => {
      console.log(`   [${step.updateTime}] ${step.status}: ${step.message}`);
    });
  }
  
  // 최종 평가
  console.log(`\n🎯 최종 평가: ${analysis.quality.overallGrade} (${analysis.quality.completionRate}%)`);
  
  return analysis.quality.overallGrade;
}

/**
 * 메인 E2E 테스트 실행
 */
async function runFullDiagnosisE2ETest() {
  const startTime = Date.now();
  
  console.log('🚀 AI 역량진단 전체 프로세스 E2E 테스트 시작');
  console.log('=' .repeat(60));
  console.log(`🌐 테스트 환경: ${BASE_URL}`);
  console.log(`⏰ 시작 시간: ${new Date().toLocaleString('ko-KR')}`);
  console.log(`⏱️  최대 타임아웃: ${TIMEOUT_MS/1000}초`);
  
  try {
    // 1단계: 완전한 테스트 데이터 생성
    console.log('\n📋 1단계: 완전한 진단 데이터 생성');
    const testData = generateCompleteDiagnosisData();
    console.log(`   회사명: ${testData.companyName}`);
    console.log(`   담당자: ${testData.contactName}`);
    console.log(`   이메일: ${testData.contactEmail}`);
    console.log(`   업종: ${testData.industry}`);
    console.log(`   직원수: ${testData.employeeCount}`);
    console.log(`   45문항 응답: ${testData.responses.length}개`);
    console.log(`   예상 총점: ${testData.expectedScore}점 (평균: ${(testData.expectedScore/45).toFixed(1)}점)`);
    console.log(`   예상 등급: ${testData.expectedGrade}`);
    
    // 2단계: AI 역량진단 신청 및 처리 시작
    console.log('\n🤖 2단계: AI 역량진단 신청 및 Ollama 분석 시작');
    console.log('   Ollama GPT-OSS 20B 모델이 45개 행동지표를 분석합니다...');
    
    const diagnosisResult = await makeRequest(`${BASE_URL}/api/ai-diagnosis`, {
      method: 'POST',
      body: JSON.stringify(testData)
    });
    
    console.log(`   ✅ 진단 신청 성공: ${diagnosisResult.success}`);
    
    if (!diagnosisResult.success) {
      throw new Error(`진단 신청 실패: ${diagnosisResult.error}`);
    }
    
    // API 응답 구조에 따라 diagnosisId 추출
    const diagnosisId = diagnosisResult.diagnosisId || diagnosisResult.data?.diagnosisId;
    console.log(`   🆔 진단 ID: ${diagnosisId}`);
    
    if (!diagnosisId) {
      console.error('   ❌ 진단 ID를 찾을 수 없습니다. API 응답:', JSON.stringify(diagnosisResult, null, 2));
      throw new Error('진단 ID가 응답에 포함되지 않았습니다');
    }
    
    // 3단계: 실시간 진행상황 모니터링
    console.log('\n📊 3단계: 실시간 진행상황 모니터링');
    const progressResult = await monitorDiagnosisProgress(diagnosisId);
    
    if (!progressResult.success) {
      console.warn(`⚠️ 진행상황 모니터링 실패: ${progressResult.error}`);
    }
    
    // 4단계: 결과 분석 및 검증
    console.log('\n🔍 4단계: 결과 분석 및 검증');
    const analysis = analyzeReportResults(diagnosisResult, testData);
    
    // 5단계: 상세 리포트 출력
    const finalGrade = printDetailedTestReport(analysis, progressResult, testData);
    
    const totalTime = Date.now() - startTime;
    
    console.log('\n🎉 E2E 테스트 완료!');
    console.log('=' .repeat(60));
    console.log(`⏱️  총 소요 시간: ${Math.round(totalTime/1000)}초`);
    console.log(`🎯 최종 결과: ${analysis.basic.success ? '✅ 성공' : '❌ 실패'}`);
    console.log(`📊 품질 등급: ${finalGrade}`);
    console.log(`🆔 진단 ID: ${diagnosisId}`);
    console.log(`📧 보고서 이메일: ${testData.contactEmail}`);
    
    return {
      success: analysis.basic.success,
      diagnosisId: diagnosisId,
      totalTime: totalTime,
      analysis: analysis,
      testData: testData
    };
    
  } catch (error) {
    const totalTime = Date.now() - startTime;
    
    console.error('\n❌ E2E 테스트 실패!');
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

// E2E 테스트 실행
console.log('🎓 이교장의AI역량진단보고서 - 전체 프로세스 E2E 테스트');
console.log('신청 → 분석 → 보고서 생성 → 저장 → 이메일 발송');
console.log('');

runFullDiagnosisE2ETest()
  .then(result => {
    if (result.success) {
      console.log('\n🏆 E2E 테스트 성공적으로 완료!');
      console.log('📧 이메일을 확인하여 생성된 보고서를 확인하세요.');
      process.exit(0);
    } else {
      console.log('\n💥 E2E 테스트 실패');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('\n💥 예상치 못한 오류:', error);
    process.exit(1);
  });
