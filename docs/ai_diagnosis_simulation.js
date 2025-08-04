/**
 * AI 역량진단 시스템 시뮬레이션 및 모니터링
 * 실제 진행 상황을 정확하게 추적하고 모니터링
 */

// 기존 설정 참조
const SPREADSHEET_ID = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
const ADMIN_EMAIL = 'hongik423@gmail.com';

/**
 * AI 역량진단 시스템 완전 시뮬레이션 (시계열 모니터링)
 */
function simulateAIDiagnosisCompleteFlow() {
  console.log('🚀 AI 역량진단 시스템 완전 시뮬레이션 시작');
  console.log('='.repeat(80));
  
  const testData = {
    companyName: '테스트기업',
    ceoName: '김대표',
    position: '대표이사',
    industry: '제조업',
    region: '서울',
    businessContent: '자동차 부품 제조',
    mainConcerns: '생산효율화, 품질관리',
    otherConcerns: 'AI 도입 타당성 검토',
    expectedBenefits: '생산성 30% 향상',
    email: 'test@example.com',
    phone: '010-1234-5678',
    employeeCount: '50-100명',
    annualRevenue: '50-100억원',
    businessYears: '10-20년',
    mainProducts: '자동차 부품',
    customerBase: 'B2B 대기업',
    competitionLevel: '높음',
    digitalizationLevel: '중간',
    aiExperience: '없음',
    urgency: '3개월 이내',
    budgetRange: '1억원 미만',
    formType: 'free-diagnosis',
    
    // AI 역량 평가 데이터
    aiCapability: {
      dataInfra: '3',
      analysisCapability: '2', 
      automationLevel: '2',
      decisionSupport: '2',
      customerExperience: '3'
    },
    
    // 실무 역량 데이터
    practicalCapability: {
      processEfficiency: '3',
      qualityManagement: '4',
      customerSatisfaction: '3',
      employeeProductivity: '3',
      innovationCapability: '2'
    }
  };
  
  const startTime = new Date();
  let currentStage = '';
  let diagnosisId = '';
  
  try {
    // ========== 1단계: 진단 신청 접수 ==========
    console.log('\n[1단계] 진단 신청 접수');
    currentStage = '신청접수';
    
    const submissionResult = handleFreeDiagnosisSubmission(testData);
    if (!submissionResult.success) {
      throw new Error('진단 신청 접수 실패: ' + submissionResult.error);
    }
    
    diagnosisId = submissionResult.diagnosisId;
    console.log(`✅ 진단 신청 접수 완료 - ID: ${diagnosisId}`);
    console.log(`   - 소요시간: ${Math.floor((new Date() - startTime) / 1000)}초`);
    
    // ========== 2단계: 진행 상황 모니터링 ==========
    console.log('\n[2단계] 진행 상황 실시간 모니터링');
    currentStage = '진행모니터링';
    
    // 진행 상황 추적
    let monitoringCount = 0;
    const maxMonitoring = 180; // 최대 15분간 모니터링 (5초 * 180)
    let lastStatus = '';
    let completed = false;
    
    while (monitoringCount < maxMonitoring && !completed) {
      Utilities.sleep(5000); // 5초 대기
      monitoringCount++;
      
      // 진행 상황 확인
      const progressSheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('진행상황추적');
      if (!progressSheet) {
        console.log('⚠️ 진행상황추적 시트 없음');
        break;
      }
      
      const progressData = progressSheet.getDataRange().getValues();
      
      // diagnosisId로 현재 상태 찾기
      let currentProgress = null;
      for (let i = progressData.length - 1; i >= 0; i--) {
        if (progressData[i][0] === diagnosisId) {
          currentProgress = {
            status: progressData[i][2],
            message: progressData[i][3],
            timestamp: progressData[i][1]
          };
          break;
        }
      }
      
      if (currentProgress && currentProgress.status !== lastStatus) {
        const elapsedTime = Math.floor((new Date() - startTime) / 1000);
        console.log(`\n📊 진행 상황 업데이트 [${new Date().toLocaleTimeString('ko-KR')}]`);
        console.log(`   상태: ${currentProgress.status}`);
        console.log(`   메시지: ${currentProgress.message}`);
        console.log(`   경과시간: ${Math.floor(elapsedTime / 60)}분 ${elapsedTime % 60}초`);
        lastStatus = currentProgress.status;
        
        // 완료 또는 오류 발생 시 모니터링 중단
        if (currentProgress.status === '완료' || currentProgress.status.includes('오류') || currentProgress.status.includes('실패')) {
          completed = true;
          console.log('\n✅ 프로세스 종료 감지');
        }
      }
      
      // 진행 상황 출력 (30초마다)
      if (monitoringCount % 6 === 0 && !completed) {
        console.log(`   ... 모니터링 진행중 (${Math.floor(monitoringCount * 5 / 60)}분 경과)`);
      }
    }
    
    if (!completed) {
      console.log('\n⚠️ 모니터링 타임아웃 (15분 초과)');
    }
    
    // ========== 3단계: 결과 검증 ==========
    console.log('\n[3단계] 분석 결과 검증');
    currentStage = '결과검증';
    
    // 결과 시트에서 데이터 확인
    const resultSheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('AI역량진단결과');
    if (resultSheet) {
      const resultData = resultSheet.getDataRange().getValues();
      
      let analysisResult = null;
      for (let i = resultData.length - 1; i >= 0; i--) {
        if (resultData[i][0] === diagnosisId) {
          analysisResult = {
            timestamp: resultData[i][1],
            companyName: resultData[i][2],
            overallScore: resultData[i][3],
            overallGrade: resultData[i][4],
            aiCapabilityScore: resultData[i][5],
            practicalCapabilityScore: resultData[i][6]
          };
          break;
        }
      }
      
      if (analysisResult) {
        console.log('✅ 분석 결과 확인됨');
        console.log(`   - 기업명: ${analysisResult.companyName}`);
        console.log(`   - 종합 점수: ${analysisResult.overallScore}점`);
        console.log(`   - 등급: ${analysisResult.overallGrade}`);
        console.log(`   - AI 역량 점수: ${analysisResult.aiCapabilityScore}점`);
        console.log(`   - 실무 역량 점수: ${analysisResult.practicalCapabilityScore}점`);
      } else {
        console.log('⚠️ 결과 데이터를 찾을 수 없음');
      }
    }
    
    // ========== 4단계: 이메일 발송 확인 ==========
    console.log('\n[4단계] 이메일 발송 확인');
    
    try {
      // 관리자 이메일 확인
      const adminEmails = GmailApp.search(`to:${ADMIN_EMAIL} subject:"진단 완료" "${diagnosisId}"`, 0, 1);
      if (adminEmails.length > 0) {
        console.log('✅ 관리자 알림 이메일 발송 확인');
      } else {
        console.log('⚠️ 관리자 알림 이메일 미확인');
      }
      
      // 사용자 이메일 확인
      const userEmails = GmailApp.search(`to:${testData.email} subject:"AI 경영진단"`, 0, 1);
      if (userEmails.length > 0) {
        console.log('✅ 사용자 결과 이메일 발송 확인');
      } else {
        console.log('⚠️ 사용자 결과 이메일 미확인');
      }
    } catch (e) {
      console.log('⚠️ 이메일 확인 중 오류:', e.toString());
    }
    
    // ========== 최종 요약 ==========
    const totalTime = Math.floor((new Date() - startTime) / 1000);
    console.log('\n' + '='.repeat(80));
    console.log('📊 시뮬레이션 완료 요약');
    console.log('='.repeat(80));
    console.log(`진단 ID: ${diagnosisId}`);
    console.log(`총 소요시간: ${Math.floor(totalTime / 60)}분 ${totalTime % 60}초`);
    console.log(`최종 상태: ${lastStatus}`);
    
    if (lastStatus === '완료') {
      console.log('\n✅ AI 역량진단이 성공적으로 완료되었습니다!');
    } else if (lastStatus.includes('오류') || lastStatus.includes('실패')) {
      console.log('\n❌ AI 역량진단 중 오류가 발생했습니다.');
      console.log('상세 내용은 진행상황추적 시트를 확인하세요.');
    } else {
      console.log('\n⚠️ AI 역량진단이 완료되지 않았습니다.');
      console.log(`마지막 상태: ${lastStatus}`);
    }
    
    return {
      success: lastStatus === '완료',
      diagnosisId: diagnosisId,
      totalTime: totalTime,
      finalStatus: lastStatus
    };
    
  } catch (error) {
    console.error('\n❌ 시뮬레이션 오류 발생');
    console.error(`현재 단계: ${currentStage}`);
    console.error(`오류 내용: ${error.toString()}`);
    console.error('스택:', error.stack);
    
    return {
      success: false,
      error: error.toString(),
      stage: currentStage
    };
  }
}

/**
 * 진행 상황 실시간 모니터링 (독립 실행용)
 */
function monitorDiagnosisProgress(diagnosisId) {
  console.log(`📊 진단 ID ${diagnosisId}의 진행 상황 모니터링 시작`);
  
  const startTime = new Date();
  let lastStatus = '';
  let monitoringCount = 0;
  const maxMonitoring = 180; // 최대 15분
  
  const interval = setInterval(() => {
    monitoringCount++;
    
    try {
      const progressSheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('진행상황추적');
      if (!progressSheet) {
        console.log('❌ 진행상황추적 시트를 찾을 수 없습니다.');
        clearInterval(interval);
        return;
      }
      
      const data = progressSheet.getDataRange().getValues();
      let found = false;
      
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i][0] === diagnosisId) {
          const status = data[i][2];
          const message = data[i][3];
          const timestamp = data[i][1];
          
          if (status !== lastStatus) {
            const elapsed = Math.floor((new Date() - startTime) / 1000);
            console.log(`\n[${new Date().toLocaleTimeString('ko-KR')}] 상태 변경 감지`);
            console.log(`  상태: ${lastStatus} → ${status}`);
            console.log(`  메시지: ${message}`);
            console.log(`  경과시간: ${Math.floor(elapsed / 60)}분 ${elapsed % 60}초`);
            lastStatus = status;
          }
          
          found = true;
          break;
        }
      }
      
      if (!found) {
        console.log(`⚠️ 진단 ID ${diagnosisId}를 찾을 수 없습니다.`);
      }
      
      // 완료 또는 오류 시 모니터링 중단
      if (lastStatus === '완료' || lastStatus.includes('오류') || lastStatus.includes('실패')) {
        console.log('\n✅ 프로세스 완료. 모니터링 종료.');
        clearInterval(interval);
      }
      
      // 타임아웃 체크
      if (monitoringCount >= maxMonitoring) {
        console.log('\n⚠️ 모니터링 타임아웃 (15분 초과)');
        clearInterval(interval);
      }
      
    } catch (error) {
      console.error('모니터링 오류:', error);
      clearInterval(interval);
    }
    
  }, 5000); // 5초마다 체크
}

/**
 * 오류 진단 및 복구 도구
 */
function diagnoseAndFixErrors() {
  console.log('🔧 AI 역량진단 시스템 오류 진단 시작');
  
  const issues = [];
  
  try {
    // 1. 스프레드시트 연결 확인
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('✅ 스프레드시트 연결 정상');
    
    // 2. 필수 시트 확인
    const requiredSheets = ['AI역량진단신청', '진행상황추적', 'AI역량진단결과', 'AI역량진단상세결과'];
    const existingSheets = spreadsheet.getSheets().map(s => s.getName());
    
    requiredSheets.forEach(sheetName => {
      if (!existingSheets.includes(sheetName)) {
        issues.push(`시트 누락: ${sheetName}`);
        console.log(`❌ ${sheetName} 시트 없음`);
      } else {
        console.log(`✅ ${sheetName} 시트 확인`);
      }
    });
    
    // 3. API 키 확인
    if (!isValidApiKey()) {
      issues.push('GEMINI API 키 미설정 또는 유효하지 않음');
      console.log('❌ GEMINI API 키 문제');
    } else {
      console.log('✅ GEMINI API 키 정상');
    }
    
    // 4. 최근 오류 확인
    const progressSheet = spreadsheet.getSheetByName('진행상황추적');
    if (progressSheet) {
      const data = progressSheet.getDataRange().getValues();
      const recentErrors = [];
      
      for (let i = Math.max(1, data.length - 20); i < data.length; i++) {
        if (data[i][2] && (data[i][2].includes('오류') || data[i][2].includes('실패'))) {
          recentErrors.push({
            diagnosisId: data[i][0],
            status: data[i][2],
            message: data[i][3],
            time: data[i][1]
          });
        }
      }
      
      if (recentErrors.length > 0) {
        console.log('\n⚠️ 최근 오류 내역:');
        recentErrors.forEach(error => {
          console.log(`  - ${error.diagnosisId}: ${error.status} - ${error.message}`);
        });
        issues.push(`최근 ${recentErrors.length}건의 오류 발생`);
      }
    }
    
    // 5. 권한 확인
    try {
      GmailApp.getInboxThreads(0, 1);
      console.log('✅ Gmail 권한 정상');
    } catch (e) {
      issues.push('Gmail 권한 문제');
      console.log('❌ Gmail 권한 오류');
    }
    
    // 진단 결과
    console.log('\n' + '='.repeat(50));
    console.log('📋 진단 결과 요약');
    console.log('='.repeat(50));
    
    if (issues.length === 0) {
      console.log('✅ 시스템 정상 - 문제를 발견하지 못했습니다.');
    } else {
      console.log(`❌ ${issues.length}개의 문제 발견:`);
      issues.forEach((issue, index) => {
        console.log(`  ${index + 1}. ${issue}`);
      });
      
      console.log('\n💡 해결 방법:');
      console.log('1. 누락된 시트는 initializeAllSheets() 실행');
      console.log('2. API 키는 스크립트 속성에서 GEMINI_API_KEY 설정');
      console.log('3. 권한 문제는 스크립트 재승인 필요');
    }
    
    return {
      healthy: issues.length === 0,
      issues: issues
    };
    
  } catch (error) {
    console.error('진단 중 오류:', error);
    return {
      healthy: false,
      error: error.toString()
    };
  }
}