// ========== AI 역량진단 즉시 수정 코드 ==========
// 이 코드를 Google Apps Script에 붙여넣고 실행하세요

// 1. 기존 함수를 새 버전으로 교체
function applyImmediateFix() {
  console.log('🔧 AI 역량진단 시스템 즉시 수정 시작...');
  
  // performFreeDiagnosisAIAnalysis 함수를 새 버전으로 교체
  this.performFreeDiagnosisAIAnalysis = function(diagnosisId, data) {
    let currentStep = '초기화';
    let analysisStartTime = new Date();
    let processCompleted = false;
    
    // 30분 타임아웃
    const timeout = setTimeout(() => {
      if (!processCompleted) {
        console.error('⏰ 타임아웃!');
        updateDiagnosisProgress(diagnosisId, '타임아웃', '시간 초과');
      }
    }, 1800000);
    
    try {
      console.log('🚀 AI 분석 시작:', diagnosisId);
      
      // 단계 1: 시작
      currentStep = '분석시작';
      updateDiagnosisProgress(diagnosisId, '분석시작', 'AI 분석을 시작합니다');
      sendProgressNotification(data.email, data.companyName, '분석시작', '약 10-15분');
      
      // 단계 2: 프롬프트 생성
      const prompt = generateFreeDiagnosisPrompt(data);
      console.log('✅ 프롬프트 생성 완료');
      
      // 단계 3: AI 분석 (재시도 포함)
      currentStep = 'AI분석중';
      updateDiagnosisProgress(diagnosisId, 'AI분석중', '데이터 분석 중...');
      
      let analysisResult = null;
      let retries = 0;
      
      while (retries < 5 && !analysisResult) {
        try {
          console.log(`🔄 AI 호출 시도 ${retries + 1}/5`);
          analysisResult = callGeminiAPI(prompt);
          
          if (analysisResult && analysisResult.length >= 3000) {
            console.log(`✅ 보고서 생성 성공! (${analysisResult.length}자)`);
            break;
          }
        } catch (e) {
          console.error('API 호출 실패:', e);
        }
        
        retries++;
        if (retries < 5) {
          Utilities.sleep(15000); // 15초 대기
        }
      }
      
      if (!analysisResult || analysisResult.length < 2000) {
        throw new Error('AI 분석 실패');
      }
      
      // 단계 4: 보고서 구조화
      currentStep = '보고서생성중';
      updateDiagnosisProgress(diagnosisId, '보고서생성중', '보고서 작성 중...');
      
      const structuredResult = structureFreeDiagnosisResult(analysisResult, data);
      console.log('✅ 보고서 구조화 완료');
      
      // 단계 5: 결과 저장
      currentStep = '결과저장중';
      saveFreeDiagnosisResult(diagnosisId, structuredResult);
      saveFreeDiagnosisDetailedResult(diagnosisId, structuredResult);
      console.log('✅ 결과 저장 완료');
      
      // 단계 6: 이메일 발송
      currentStep = '이메일발송중';
      updateDiagnosisProgress(diagnosisId, '이메일발송중', '이메일 발송 중...');
      sendProgressNotification(data.email, data.companyName, '완료임박', '30초 이내');
      
      Utilities.sleep(2000);
      sendFreeDiagnosisResultEmail(data.email, data.companyName, diagnosisId, structuredResult);
      console.log('✅ 이메일 발송 완료');
      
      // 단계 7: 완료
      updateDiagnosisProgress(diagnosisId, '완료', '보고서 작성 완료!');
      processCompleted = true;
      clearTimeout(timeout);
      
      // 관리자 알림
      const adminBody = `
        <h3>AI 진단 완료</h3>
        <p>진단 ID: ${diagnosisId}</p>
        <p>기업: ${data.companyName}</p>
        <p>점수: ${structuredResult.overallScore}점</p>
        <p>등급: ${structuredResult.overallGrade}</p>
      `;
      
      GmailApp.sendEmail(ADMIN_EMAIL, '[완료] ' + data.companyName, '', {
        htmlBody: adminBody
      });
      
      console.log('🎉 전체 프로세스 완료!');
      
    } catch (error) {
      console.error('❌ 오류:', error);
      processCompleted = true;
      clearTimeout(timeout);
      
      updateDiagnosisProgress(diagnosisId, '오류발생', error.message);
      notifyAdminFreeDiagnosisError(diagnosisId, error, currentStep);
      
      // 사용자 알림
      GmailApp.sendEmail(data.email, '[지연] AI 진단', 
        '보고서 생성 중 지연이 발생했습니다. 확인 후 연락드리겠습니다.', {
        name: 'AI 경영진단'
      });
    }
  };
  
  console.log('✅ 수정 완료! 이제 AI 진단이 끝까지 작동합니다.');
}

// 2. 즉시 테스트 함수
function testFixNow() {
  // 수정 적용
  applyImmediateFix();
  
  // 테스트 데이터
  const testData = {
    companyName: '테스트기업',
    ceoName: '김대표',
    position: '대표이사',
    industry: '제조업',
    region: '서울',
    businessContent: '자동차 부품 제조',
    mainConcerns: '생산효율화',
    otherConcerns: 'AI 도입',
    expectedBenefits: '생산성 향상',
    email: 'hongik423@gmail.com',
    phone: '010-1234-5678',
    employeeCount: '50-100명',
    annualRevenue: '50-100억원',
    businessYears: '10-20년',
    mainProducts: '자동차 부품',
    customerBase: 'B2B',
    competitionLevel: '높음',
    digitalizationLevel: '중간',
    aiExperience: '없음',
    urgency: '3개월 이내',
    budgetRange: '1억원 미만',
    aiCapability: {
      dataInfra: '3',
      analysisCapability: '2',
      automationLevel: '2',
      decisionSupport: '2',
      customerExperience: '3'
    },
    practicalCapability: {
      processEfficiency: '3',
      qualityManagement: '4',
      customerSatisfaction: '3',
      employeeProductivity: '3',
      innovationCapability: '2'
    }
  };
  
  const diagnosisId = generateFreeDiagnosisId();
  console.log('테스트 ID:', diagnosisId);
  
  // 진단 실행
  performFreeDiagnosisAIAnalysis(diagnosisId, testData);
}

// 3. 진행상황 모니터링
function watchProgress(diagnosisId) {
  console.log('📊 진행상황 모니터링:', diagnosisId);
  
  for (let i = 0; i < 180; i++) { // 15분
    try {
      const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('진행상황추적');
      const data = sheet.getDataRange().getValues();
      
      for (let j = data.length - 1; j >= 0; j--) {
        if (data[j][0] === diagnosisId) {
          console.log(`[${new Date().toLocaleTimeString()}] ${data[j][2]}: ${data[j][3]}`);
          
          if (data[j][2] === '완료' || data[j][2].includes('오류')) {
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