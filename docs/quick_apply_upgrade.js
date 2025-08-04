/**
 * 🚀 AICAMP AI 경영진단 시스템 - 빠른 업그레이드 적용
 * 이 코드를 Google Apps Script에 복사하여 실행하세요
 */

// ========================================
// 즉시 실행 코드 (이것만 실행하면 됩니다!)
// ========================================

function applyAllUpgradesNow() {
  console.log('🚀 AICAMP 시스템 전체 업그레이드 시작...');
  console.log('='*50);
  
  // 1. 핵심 함수들 업그레이드
  upgradeCoreFunctions();
  
  // 2. 시트 초기화
  initializeRequiredSheets();
  
  // 3. 시스템 검증
  const result = verifySystem();
  
  if (result.success) {
    console.log('✅ 업그레이드 완료!');
    console.log('모든 기능이 정상 작동합니다.');
    
    // 4. 테스트 실행
    console.log('\n📋 테스트 실행 중...');
    runQuickTest();
    
  } else {
    console.log('❌ 업그레이드 실패:', result.error);
  }
}

// 핵심 함수 업그레이드
function upgradeCoreFunctions() {
  console.log('🔧 핵심 함수 업그레이드 중...');
  
  // 1. AI 진단 프로세스 개선
  this.performFreeDiagnosisAIAnalysis = function(diagnosisId, data) {
    let currentStep = '초기화';
    let processCompleted = false;
    let startTime = new Date();
    
    // 30분 타임아웃
    const timeout = setTimeout(() => {
      if (!processCompleted) {
        updateDiagnosisProgress(diagnosisId, '타임아웃', '처리 시간 초과');
      }
    }, 1800000);
    
    try {
      console.log(`🚀 AI 진단 시작: ${diagnosisId}`);
      
      // Step 1: 시작 알림
      currentStep = '분석시작';
      updateDiagnosisProgress(diagnosisId, '분석시작', 'AI 분석을 시작합니다');
      sendProgressNotification(data.email, data.companyName, '분석시작', '약 10-15분');
      
      // Step 2: AI 분석
      currentStep = 'AI분석중';
      updateDiagnosisProgress(diagnosisId, 'AI분석중', '데이터 분석 중...');
      
      const prompt = generateFreeDiagnosisPrompt(data);
      let analysisResult = null;
      let retries = 0;
      
      while (retries < 5 && !analysisResult) {
        try {
          console.log(`AI 호출 ${retries + 1}/5`);
          analysisResult = callGeminiAPI(prompt);
          
          if (analysisResult && analysisResult.length >= 3000) {
            console.log(`✅ 보고서 생성 성공 (${analysisResult.length}자)`);
            break;
          }
        } catch (e) {
          console.error('API 오류:', e);
        }
        retries++;
        if (retries < 5) Utilities.sleep(15000);
      }
      
      if (!analysisResult) throw new Error('AI 분석 실패');
      
      // Step 3: 보고서 구조화
      currentStep = '보고서생성중';
      updateDiagnosisProgress(diagnosisId, '보고서생성중', '보고서 작성 중...');
      const result = structureFreeDiagnosisResult(analysisResult, data);
      
      // Step 4: 저장
      currentStep = '결과저장중';
      saveFreeDiagnosisResult(diagnosisId, result);
      saveFreeDiagnosisDetailedResult(diagnosisId, result);
      
      // Step 5: 이메일
      currentStep = '이메일발송중';
      updateDiagnosisProgress(diagnosisId, '이메일발송중', '이메일 발송 중...');
      sendFreeDiagnosisResultEmail(data.email, data.companyName, diagnosisId, result);
      
      // Step 6: 완료
      updateDiagnosisProgress(diagnosisId, '완료', '진단 완료!');
      processCompleted = true;
      clearTimeout(timeout);
      
      // 관리자 알림
      notifyAdmin(data, diagnosisId, result);
      
      const totalTime = Math.floor((new Date() - startTime) / 1000);
      console.log(`✅ 완료! 소요시간: ${Math.floor(totalTime/60)}분 ${totalTime%60}초`);
      
    } catch (error) {
      processCompleted = true;
      clearTimeout(timeout);
      updateDiagnosisProgress(diagnosisId, '오류', error.message);
      console.error('진단 오류:', error);
      
      // 오류 알림
      notifyError(data, diagnosisId, error, currentStep);
    }
  };
  
  // 2. 진단 신청 처리 개선
  this.handleFreeDiagnosisSubmission = function(data) {
    try {
      // 검증
      if (!data.email || !data.companyName) {
        throw new Error('필수 정보 누락');
      }
      
      // ID 생성
      const diagnosisId = generateFreeDiagnosisId();
      const timestamp = getCurrentKoreanTime();
      
      // 저장
      saveFreeDiagnosisApplication(diagnosisId, data, timestamp);
      
      // 알림
      sendFreeDiagnosisConfirmationEmail(data.email, data.companyName, diagnosisId);
      sendFreeDiagnosisAdminNotification(data, diagnosisId);
      
      // AI 분석 시작 (2초 후)
      setTimeout(() => {
        performFreeDiagnosisAIAnalysis(diagnosisId, data);
      }, 2000);
      
      return {
        success: true,
        diagnosisId: diagnosisId
      };
      
    } catch (error) {
      console.error('신청 처리 오류:', error);
      return {
        success: false,
        error: error.toString()
      };
    }
  };
  
  console.log('✅ 핵심 함수 업그레이드 완료');
}

// 필수 시트 초기화
function initializeRequiredSheets() {
  console.log('📋 시트 초기화 중...');
  
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const requiredSheets = [
      'AI역량진단신청',
      '진행상황추적', 
      'AI역량진단결과',
      'AI역량진단상세결과'
    ];
    
    requiredSheets.forEach(sheetName => {
      try {
        spreadsheet.getSheetByName(sheetName);
      } catch (e) {
        // 시트가 없으면 생성
        const newSheet = spreadsheet.insertSheet(sheetName);
        setupSheetHeaders(newSheet, sheetName);
        console.log(`✅ ${sheetName} 시트 생성`);
      }
    });
    
    console.log('✅ 시트 초기화 완료');
    
  } catch (error) {
    console.error('시트 초기화 오류:', error);
  }
}

// 시스템 검증
function verifySystem() {
  console.log('🔍 시스템 검증 중...');
  
  try {
    // 1. Sheets 연결
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('✅ Sheets 연결 성공');
    
    // 2. API 키
    if (!GEMINI_API_KEY || GEMINI_API_KEY.length !== 39) {
      throw new Error('API 키 오류');
    }
    console.log('✅ API 키 확인');
    
    // 3. 이메일 권한
    const quota = MailApp.getRemainingDailyQuota();
    console.log(`✅ 이메일 권한 (남은 할당량: ${quota})`);
    
    return { success: true };
    
  } catch (error) {
    return { 
      success: false, 
      error: error.toString() 
    };
  }
}

// 빠른 테스트
function runQuickTest() {
  const testData = {
    companyName: '테스트기업',
    ceoName: '테스트',
    email: ADMIN_EMAIL,
    industry: '제조업',
    phone: '010-0000-0000',
    privacyConsent: true,
    formType: 'free-diagnosis',
    aiCapability: {
      dataInfra: '3',
      analysisCapability: '3',
      automationLevel: '3',
      decisionSupport: '3',
      customerExperience: '3'
    }
  };
  
  console.log('🧪 테스트 진단 실행...');
  const result = handleFreeDiagnosisSubmission(testData);
  
  if (result.success) {
    console.log(`✅ 테스트 성공! ID: ${result.diagnosisId}`);
    console.log('📊 진행상황을 모니터링하려면:');
    console.log(`monitorProgress('${result.diagnosisId}')`);
  } else {
    console.log('❌ 테스트 실패:', result.error);
  }
}

// 진행상황 모니터링
function monitorProgress(diagnosisId) {
  console.log(`📊 진행상황 모니터링: ${diagnosisId}`);
  
  for (let i = 0; i < 60; i++) { // 5분간
    try {
      const sheet = SpreadsheetApp.openById(SPREADSHEET_ID)
        .getSheetByName('진행상황추적');
      const data = sheet.getDataRange().getValues();
      
      for (let j = data.length - 1; j >= 0; j--) {
        if (data[j][0] === diagnosisId) {
          const status = data[j][2];
          const message = data[j][3];
          console.log(`[${new Date().toLocaleTimeString()}] ${status}: ${message}`);
          
          if (status === '완료' || status.includes('오류')) {
            console.log('✅ 프로세스 종료');
            return;
          }
          break;
        }
      }
    } catch (e) {
      console.error('모니터링 오류:', e);
    }
    
    Utilities.sleep(5000); // 5초
  }
}

// 헬퍼 함수
function notifyAdmin(data, diagnosisId, result) {
  try {
    const subject = `[완료] ${data.companyName} AI 진단`;
    const body = `
      진단 완료
      ID: ${diagnosisId}
      기업: ${data.companyName}
      점수: ${result.overallScore}점
      등급: ${result.overallGrade}
    `;
    
    GmailApp.sendEmail(ADMIN_EMAIL, subject, body);
  } catch (e) {
    console.error('관리자 알림 실패:', e);
  }
}

function notifyError(data, diagnosisId, error, step) {
  try {
    // 관리자 알림
    GmailApp.sendEmail(
      ADMIN_EMAIL, 
      `[오류] ${data.companyName} 진단`, 
      `오류 발생\nID: ${diagnosisId}\n단계: ${step}\n오류: ${error}`
    );
    
    // 사용자 알림
    GmailApp.sendEmail(
      data.email,
      '[AI 진단] 처리 지연 안내',
      `${data.companyName}님, 진단 처리 중 지연이 발생했습니다. 확인 후 연락드리겠습니다.`
    );
  } catch (e) {
    console.error('오류 알림 실패:', e);
  }
}

function setupSheetHeaders(sheet, sheetName) {
  const headers = {
    'AI역량진단신청': [
      '신청일시', '진단ID', '기업명', '대표자명', '직책', '업종', '지역',
      '사업내용', '고민사항', '기타고민', '기대효과', '이메일', '연락처',
      '직원수', '연매출', '사업연수', '주요제품/서비스', '주요고객층',
      '경쟁강도', '디지털화수준', 'AI경험', '시급성', '예산범위'
    ],
    '진행상황추적': [
      '진단ID', '타임스탬프', '상태', '메시지', '담당자'
    ],
    'AI역량진단결과': [
      '진단ID', '완료일시', '기업명', '종합점수', '등급', 
      'AI역량점수', '실무역량점수', '업종점수', '갭분석결과'
    ],
    'AI역량진단상세결과': [
      '진단ID', '영역', '세부항목', '점수', '벤치마크', '갭', '개선방안'
    ]
  };
  
  if (headers[sheetName]) {
    sheet.getRange(1, 1, 1, headers[sheetName].length)
      .setValues([headers[sheetName]])
      .setBackground('#4a5568')
      .setFontColor('#ffffff')
      .setFontWeight('bold');
  }
}

// ========================================
// 실행하세요!
// ========================================

// 1. 전체 업그레이드 적용
// applyAllUpgradesNow()

// 2. 테스트만 실행
// runQuickTest()

// 3. 진행상황 모니터링
// monitorProgress('진단ID')

console.log('✅ 코드 로드 완료!');
console.log('실행: applyAllUpgradesNow()');