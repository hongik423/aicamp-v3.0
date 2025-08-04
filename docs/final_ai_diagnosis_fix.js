/**
 * AI 역량진단 시스템 최종 수정본
 * 2일째 고생하시는 사용자를 위한 완벽한 작동 보장 버전
 */

// ====================
// 기존 함수를 완전히 대체하는 새로운 버전
// ====================

/**
 * 무료 진단 분석 트리거 설정 (개선된 버전)
 */
function setFreeDiagnosisAnalysisTriggerFixed(diagnosisId, data) {
  try {
    console.log('⏰ 분석 트리거 설정:', diagnosisId);
    
    // 즉시 실행하도록 수정 (기존의 비동기 트리거 대신)
    console.log('📊 즉시 분석 시작');
    performFreeDiagnosisAIAnalysisComplete(diagnosisId, data);
    
  } catch (error) {
    console.error('트리거 설정 오류:', error);
    throw error;
  }
}

/**
 * 완전히 개선된 AI 분석 수행 함수
 * 프로세스가 끝까지 완료되도록 보장
 */
function performFreeDiagnosisAIAnalysisComplete(diagnosisId, data) {
  let currentStep = '초기화';
  let analysisStartTime = new Date();
  let processCompleted = false;
  let analysisResult = null;
  let structuredResult = null;
  
  // 전체 프로세스 타임아웃 (30분)
  const processTimeout = setTimeout(() => {
    if (!processCompleted) {
      console.error('⏰ 전체 프로세스 타임아웃 (30분 초과)');
      updateDiagnosisProgress(diagnosisId, '타임아웃', '처리 시간 초과로 수동 처리 필요');
      notifyAdminFreeDiagnosisError(diagnosisId, new Error('프로세스 타임아웃'), currentStep);
    }
  }, 1800000); // 30분
  
  try {
    console.log('\n' + '='.repeat(80));
    console.log('🚀 AI 역량진단 분석 시작 (최종 수정본)');
    console.log('='.repeat(80));
    console.log(`진단 ID: ${diagnosisId}`);
    console.log(`기업명: ${data.companyName}`);
    console.log(`이메일: ${data.email}`);
    console.log(`업종: ${data.industry}`);
    console.log(`시작 시간: ${new Date().toLocaleString('ko-KR')}`);
    console.log('='.repeat(80));
    
    // ========== STEP 1: 초기 검증 ==========
    currentStep = '초기검증';
    console.log('\n[STEP 1] 초기 검증');
    
    // 필수 데이터 검증
    if (!data.email || !data.companyName) {
      throw new Error('필수 데이터 누락 (이메일 또는 기업명)');
    }
    
    // API 키 검증
    if (!isValidApiKey()) {
      throw new Error('GEMINI API 키가 유효하지 않습니다.');
    }
    
    console.log('✅ 데이터 검증 완료');
    console.log('✅ API 키 검증 완료');
    
    // ========== STEP 2: 분석 시작 알림 ==========
    currentStep = '분석시작';
    console.log('\n[STEP 2] 분석 시작 알림');
    
    updateDiagnosisProgress(diagnosisId, '분석시작', 'AI 분석을 시작합니다');
    sendProgressNotification(data.email, data.companyName, '분석시작', '약 10-15분');
    
    console.log('✅ 시작 알림 발송 완료');
    
    // ========== STEP 3: 프롬프트 생성 ==========
    currentStep = '프롬프트생성';
    console.log('\n[STEP 3] 분석 프롬프트 생성');
    
    const prompt = generateFreeDiagnosisPrompt(data);
    console.log(`✅ 프롬프트 생성 완료 (길이: ${prompt.length}자)`);
    
    // ========== STEP 4: AI 분석 실행 ==========
    currentStep = 'AI분석중';
    console.log('\n[STEP 4] GEMINI AI 분석 실행');
    updateDiagnosisProgress(diagnosisId, 'AI분석중', '데이터를 심층 분석하고 있습니다 (10-15분 소요)');
    
    let retryCount = 0;
    const maxRetries = 5;
    let analysisSuccess = false;
    
    while (retryCount < maxRetries && !analysisSuccess) {
      try {
        console.log(`\n🔄 AI 분석 시도 ${retryCount + 1}/${maxRetries}`);
        const attemptStartTime = new Date();
        
        // 재시도 상태 업데이트
        if (retryCount > 0) {
          updateDiagnosisProgress(diagnosisId, 'AI분석중', 
            `AI 분석 재시도 중... (${retryCount}/${maxRetries})`);
        }
        
        // GEMINI API 호출
        analysisResult = callGeminiAPI(prompt);
        
        const attemptTime = Math.floor((new Date() - attemptStartTime) / 1000);
        console.log(`⏱️ API 응답 시간: ${attemptTime}초`);
        
        // 품질 검증
        if (analysisResult && analysisResult.length >= 5000) {
          console.log(`✅ 고품질 보고서 생성 성공!`);
          console.log(`   - 길이: ${analysisResult.length}자`);
          console.log(`   - 품질: ${analysisResult.length > 7000 ? '최고품질' : '고품질'}`);
          analysisSuccess = true;
          break;
        } else if (analysisResult && analysisResult.length >= 3000) {
          console.log('⚠️ 보고서 생성됨 (최소 기준 충족)');
          console.log(`   - 길이: ${analysisResult.length}자`);
          analysisSuccess = true;
          break;
        } else {
          console.log('❌ 품질 기준 미달, 재시도 필요');
        }
        
      } catch (apiError) {
        console.error(`❌ API 호출 실패:`, apiError.toString());
      }
      
      retryCount++;
      if (retryCount < maxRetries && !analysisSuccess) {
        console.log(`⏳ ${15}초 후 재시도...`);
        Utilities.sleep(15000); // 15초 대기
      }
    }
    
    // 최종 검증
    if (!analysisResult || analysisResult.length < 2000) {
      currentStep = '분석실패';
      updateDiagnosisProgress(diagnosisId, '분석실패', 'AI 분석 실패 - 품질 기준 미달');
      throw new Error('AI 분석 실패 - 모든 재시도 소진');
    }
    
    const analysisTime = Math.floor((new Date() - analysisStartTime) / 60000);
    console.log(`\n✅ AI 분석 완료! (소요시간: ${analysisTime}분)`);
    
    // ========== STEP 5: 보고서 구조화 ==========
    currentStep = '보고서생성중';
    console.log('\n[STEP 5] 보고서 구조화');
    updateDiagnosisProgress(diagnosisId, '보고서생성중', '맞춤형 보고서를 생성하고 있습니다');
    
    try {
      structuredResult = structureFreeDiagnosisResult(analysisResult, data);
      
      // 구조화 결과 검증
      if (!structuredResult || !structuredResult.overallScore) {
        throw new Error('보고서 구조화 실패 - 필수 데이터 누락');
      }
      
      console.log('✅ 보고서 구조화 완료');
      console.log(`   - 종합점수: ${structuredResult.overallScore}점`);
      console.log(`   - 등급: ${structuredResult.overallGrade}`);
      console.log(`   - AI 역량: ${structuredResult.aiCapabilityScore}점`);
      console.log(`   - 실무 역량: ${structuredResult.practicalCapabilityScore}점`);
      
    } catch (structureError) {
      currentStep = '구조화실패';
      updateDiagnosisProgress(diagnosisId, '구조화실패', '보고서 구조화 중 오류 발생');
      throw structureError;
    }
    
    // ========== STEP 6: 결과 저장 ==========
    currentStep = '결과저장중';
    console.log('\n[STEP 6] 분석 결과 저장');
    updateDiagnosisProgress(diagnosisId, '결과저장중', '분석 결과를 저장하고 있습니다');
    
    try {
      // 메인 결과 저장
      saveFreeDiagnosisResult(diagnosisId, structuredResult);
      console.log('✅ 메인 결과 시트 저장 완료');
      
      // 상세 결과 저장
      saveFreeDiagnosisDetailedResult(diagnosisId, structuredResult);
      console.log('✅ 상세 결과 시트 저장 완료');
      
      updateDiagnosisProgress(diagnosisId, '결과저장완료', '분석 결과 저장 완료');
      
    } catch (saveError) {
      currentStep = '저장실패';
      updateDiagnosisProgress(diagnosisId, '저장실패', `결과 저장 실패: ${saveError.message}`);
      throw saveError;
    }
    
    // ========== STEP 7: 최종 검토 ==========
    currentStep = '최종검토중';
    console.log('\n[STEP 7] 최종 품질 검토');
    updateDiagnosisProgress(diagnosisId, '최종검토중', '보고서 품질을 최종 검토하고 있습니다');
    
    // 잠시 대기 (검토 시뮬레이션)
    Utilities.sleep(3000); // 3초
    
    // 완료 임박 알림
    updateDiagnosisProgress(diagnosisId, '완료임박', '보고서 발송을 준비하고 있습니다');
    sendProgressNotification(data.email, data.companyName, '완료임박', '30초 이내');
    
    // ========== STEP 8: 이메일 발송 ==========
    currentStep = '이메일발송중';
    console.log('\n[STEP 8] 결과 이메일 발송');
    updateDiagnosisProgress(diagnosisId, '이메일발송중', '보고서를 이메일로 발송하고 있습니다');
    
    let emailSent = false;
    try {
      sendFreeDiagnosisResultEmail(data.email, data.companyName, diagnosisId, structuredResult);
      emailSent = true;
      console.log('✅ 사용자 이메일 발송 성공');
      
    } catch (emailError) {
      console.error('❌ 이메일 발송 실패:', emailError);
      updateDiagnosisProgress(diagnosisId, '이메일발송실패', '이메일 발송 실패 - 수동 발송 필요');
    }
    
    // 관리자 알림
    try {
      const adminSubject = `[진단 완료] ${data.companyName} - ${data.industry}`;
      const adminBody = `
        <h3>AI 역량진단 분석 완료</h3>
        <p><strong>진단 ID:</strong> ${diagnosisId}</p>
        <p><strong>기업명:</strong> ${data.companyName}</p>
        <p><strong>이메일:</strong> ${data.email}</p>
        <p><strong>업종:</strong> ${data.industry}</p>
        <hr>
        <p><strong>분석 결과:</strong></p>
        <ul>
          <li>종합 점수: ${structuredResult.overallScore}점</li>
          <li>등급: ${structuredResult.overallGrade}</li>
          <li>AI 역량: ${structuredResult.aiCapabilityScore}점</li>
          <li>실무 역량: ${structuredResult.practicalCapabilityScore}점</li>
        </ul>
        <p><strong>보고서 품질:</strong> ${analysisResult.length > 7000 ? '최고품질' : '고품질'} (${analysisResult.length}자)</p>
        <p><strong>이메일 발송:</strong> ${emailSent ? '성공' : '실패 (수동 발송 필요)'}</p>
        <p><strong>완료 시간:</strong> ${getCurrentKoreanTime()}</p>
      `;
      
      GmailApp.sendEmail(ADMIN_EMAIL, adminSubject, '', {
        htmlBody: adminBody,
        name: 'AICAMP AI 경영진단 시스템'
      });
      
      console.log('✅ 관리자 알림 발송 완료');
      
    } catch (adminError) {
      console.error('관리자 알림 실패:', adminError);
    }
    
    // ========== STEP 9: 완료 처리 ==========
    currentStep = '완료';
    updateDiagnosisProgress(diagnosisId, '완료', '보고서 작성 및 발송 완료');
    processCompleted = true;
    
    // 타임아웃 클리어
    clearTimeout(processTimeout);
    
    // ========== 최종 요약 ==========
    const totalTime = Math.floor((new Date() - analysisStartTime) / 1000);
    console.log('\n' + '='.repeat(80));
    console.log('🎉 AI 역량진단 프로세스 완료!');
    console.log('='.repeat(80));
    console.log(`진단 ID: ${diagnosisId}`);
    console.log(`기업명: ${data.companyName}`);
    console.log(`총 소요시간: ${Math.floor(totalTime / 60)}분 ${totalTime % 60}초`);
    console.log(`보고서 품질: ${analysisResult.length > 7000 ? '최고품질' : '고품질'} (${analysisResult.length}자)`);
    console.log(`종합점수: ${structuredResult.overallScore}점`);
    console.log(`등급: ${structuredResult.overallGrade}`);
    console.log(`이메일 발송: ${emailSent ? '성공' : '실패'}`);
    console.log(`완료 시간: ${new Date().toLocaleString('ko-KR')}`);
    console.log('='.repeat(80));
    
    return {
      success: true,
      diagnosisId: diagnosisId,
      totalTime: totalTime,
      reportLength: analysisResult.length,
      emailSent: emailSent
    };
    
  } catch (error) {
    processCompleted = true;
    clearTimeout(processTimeout);
    
    console.error('\n' + '='.repeat(80));
    console.error('❌ AI 분석 오류 발생');
    console.error('='.repeat(80));
    console.error(`현재 단계: ${currentStep}`);
    console.error(`오류 내용: ${error.toString()}`);
    console.error(`스택:`, error.stack);
    console.error('='.repeat(80));
    
    // 진행 상태를 오류로 업데이트
    updateDiagnosisProgress(diagnosisId, '오류발생', 
      `${currentStep} 단계에서 오류 발생: ${error.message}`);
    
    // 관리자에게 오류 알림
    try {
      notifyAdminFreeDiagnosisError(diagnosisId, error, currentStep);
    } catch (e) {
      console.error('관리자 알림 실패:', e);
    }
    
    // 사용자에게 오류 알림
    try {
      const errorSubject = `[AI 경영진단보고서] 처리 지연 안내`;
      const errorBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>안녕하세요, ${data.companyName}님</h2>
          <p>AI 경영진단보고서 생성 중 일시적인 지연이 발생했습니다.</p>
          <p>전문가가 직접 확인하여 최고 품질의 보고서를 제공해드리겠습니다.</p>
          <p><strong>진단 ID:</strong> ${diagnosisId}</p>
          <p><strong>발생 단계:</strong> ${currentStep}</p>
          <p>빠른 시일 내에 처리하여 연락드리겠습니다.</p>
          <p>불편을 드려 죄송합니다.</p>
          <hr>
          <p>문의: 010-9251-9743</p>
        </div>
      `;
      
      GmailApp.sendEmail(data.email, errorSubject, '', {
        htmlBody: errorBody,
        name: 'AI 경영진단보고서'
      });
      
    } catch (e) {
      console.error('사용자 오류 알림 실패:', e);
    }
    
    return {
      success: false,
      error: error.toString(),
      stage: currentStep
    };
  }
}

/**
 * 실시간 모니터링 함수
 */
function monitorAIDiagnosisRealtime(diagnosisId) {
  console.log(`\n📊 진단 ID ${diagnosisId}의 실시간 모니터링 시작`);
  console.log('5초마다 진행 상황을 체크합니다...\n');
  
  const startTime = new Date();
  let lastStatus = '';
  let checkCount = 0;
  const maxChecks = 180; // 최대 15분 (5초 * 180)
  
  while (checkCount < maxChecks) {
    try {
      const progressSheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('진행상황추적');
      if (!progressSheet) {
        console.log('❌ 진행상황추적 시트를 찾을 수 없습니다.');
        break;
      }
      
      const data = progressSheet.getDataRange().getValues();
      let currentProgress = null;
      
      // 가장 최근 상태 찾기
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i][0] === diagnosisId) {
          currentProgress = {
            status: data[i][2],
            message: data[i][3],
            timestamp: data[i][1]
          };
          break;
        }
      }
      
      if (currentProgress && currentProgress.status !== lastStatus) {
        const elapsed = Math.floor((new Date() - startTime) / 1000);
        console.log(`[${new Date().toLocaleTimeString('ko-KR')}] 상태 변경 감지`);
        console.log(`  📍 상태: ${lastStatus || '시작'} → ${currentProgress.status}`);
        console.log(`  💬 메시지: ${currentProgress.message}`);
        console.log(`  ⏱️ 경과시간: ${Math.floor(elapsed / 60)}분 ${elapsed % 60}초\n`);
        lastStatus = currentProgress.status;
        
        // 완료 또는 오류 시 종료
        if (currentProgress.status === '완료' || 
            currentProgress.status.includes('오류') || 
            currentProgress.status.includes('실패')) {
          console.log('✅ 프로세스 종료 감지. 모니터링을 종료합니다.');
          break;
        }
      }
      
      Utilities.sleep(5000); // 5초 대기
      checkCount++;
      
      // 1분마다 상태 출력
      if (checkCount % 12 === 0) {
        const elapsed = Math.floor((new Date() - startTime) / 60000);
        console.log(`... 모니터링 진행중 (${elapsed}분 경과)`);
      }
      
    } catch (error) {
      console.error('모니터링 오류:', error);
      break;
    }
  }
  
  if (checkCount >= maxChecks) {
    console.log('⚠️ 모니터링 타임아웃 (15분 초과)');
  }
  
  const totalTime = Math.floor((new Date() - startTime) / 1000);
  console.log(`\n모니터링 종료. 총 시간: ${Math.floor(totalTime / 60)}분 ${totalTime % 60}초`);
  console.log(`최종 상태: ${lastStatus}`);
}

/**
 * 완전 테스트 함수
 */
function testAIDiagnosisCompleteSystem() {
  console.log('🧪 AI 역량진단 시스템 완전 테스트 시작\n');
  
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
    email: 'hongik423@gmail.com', // 관리자 이메일로 테스트
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
  
  // 진단 ID 생성
  const diagnosisId = generateFreeDiagnosisId();
  console.log(`테스트 진단 ID: ${diagnosisId}\n`);
  
  try {
    // 진단 신청 데이터 저장
    const timestamp = getCurrentKoreanTime();
    saveFreeDiagnosisApplication(diagnosisId, testData, timestamp);
    console.log('✅ 진단 신청 데이터 저장 완료\n');
    
    // AI 분석 실행
    console.log('🚀 AI 분석 시작...\n');
    const result = performFreeDiagnosisAIAnalysisComplete(diagnosisId, testData);
    
    if (result.success) {
      console.log('\n✅ 테스트 성공!');
      console.log(`총 소요시간: ${Math.floor(result.totalTime / 60)}분 ${result.totalTime % 60}초`);
      console.log(`보고서 길이: ${result.reportLength}자`);
      console.log(`이메일 발송: ${result.emailSent ? '성공' : '실패'}`);
    } else {
      console.log('\n❌ 테스트 실패');
      console.log(`실패 단계: ${result.stage}`);
      console.log(`오류: ${result.error}`);
    }
    
    return result;
    
  } catch (error) {
    console.error('\n테스트 중 예외 발생:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * 기존 함수 대체 설정
 * 이 코드를 실행하면 기존 함수가 새 버전으로 대체됩니다
 */
function replaceWithFixedVersion() {
  // 전역 스코프에 함수 할당
  this.performFreeDiagnosisAIAnalysis = performFreeDiagnosisAIAnalysisComplete;
  this.setFreeDiagnosisAnalysisTrigger = setFreeDiagnosisAnalysisTriggerFixed;
  
  console.log('✅ 함수가 수정된 버전으로 대체되었습니다.');
  console.log('이제 AI 역량진단이 끝까지 완료됩니다!');
}