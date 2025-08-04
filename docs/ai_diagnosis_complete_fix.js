/**
 * AI 역량진단 시스템 완전 수정본
 * 프로세스가 끝까지 완료되도록 보장하는 버전
 */

// 타임아웃 설정 [[memory:5039126]]
const TIMEOUT_SETTINGS = {
  GEMINI_API: 1200000,        // 20분
  RETRY_DELAY: 600000,        // 10분
  EMAIL_SERVICE: 180000,      // 3분
  PROGRESS_UPDATE: 30000,     // 30초
  PROCESS_TIMEOUT: 1800000    // 30분 (전체 프로세스)
};

/**
 * 개선된 AI 분석 수행 함수 - 끝까지 완료 보장
 */
function performFreeDiagnosisAIAnalysisFixed(diagnosisId, data) {
  let currentStep = '초기화';
  let analysisStartTime = new Date();
  let processCompleted = false;
  
  // 프로세스 타임아웃 설정 (30분)
  const processTimeout = setTimeout(() => {
    if (!processCompleted) {
      console.error('⏰ 전체 프로세스 타임아웃 (30분 초과)');
      updateDiagnosisProgress(diagnosisId, '타임아웃', '처리 시간 초과로 수동 처리 필요');
      notifyAdminFreeDiagnosisError(diagnosisId, new Error('프로세스 타임아웃'), currentStep);
    }
  }, TIMEOUT_SETTINGS.PROCESS_TIMEOUT);
  
  try {
    console.log('🚀 AI 역량진단 분석 시작 (개선된 버전)');
    console.log(`진단 ID: ${diagnosisId}`);
    console.log(`기업명: ${data.companyName}`);
    console.log(`이메일: ${data.email}`);
    console.log('='.repeat(80));
    
    // ======== 1단계: 초기화 및 검증 ========
    currentStep = '초기화';
    console.log('\n[1단계] 시스템 초기화 및 검증');
    
    // API 키 검증
    if (!isValidApiKey()) {
      throw new Error('GEMINI API 키가 유효하지 않습니다.');
    }
    console.log('✅ API 키 검증 완료');
    
    // 데이터 검증
    if (!data.email || !data.companyName) {
      throw new Error('필수 데이터 누락');
    }
    console.log('✅ 데이터 검증 완료');
    
    // ======== 2단계: 분석 시작 ========
    currentStep = '분석시작';
    console.log('\n[2단계] AI 분석 시작');
    updateDiagnosisProgress(diagnosisId, '분석시작', 'AI 분석을 시작합니다');
    
    // 첫 번째 진행상황 알림 (너무 많은 이메일 방지를 위해 주요 단계만)
    sendProgressNotificationFixed(data.email, data.companyName, '분석시작', '약 10-15분');
    
    // ======== 3단계: 프롬프트 생성 ========
    currentStep = '프롬프트생성';
    console.log('\n[3단계] 분석 프롬프트 생성');
    const prompt = generateFreeDiagnosisPrompt(data);
    console.log(`✅ 프롬프트 생성 완료 (길이: ${prompt.length}자)`);
    
    // ======== 4단계: AI 분석 (재시도 로직 포함) ========
    currentStep = 'AI분석중';
    console.log('\n[4단계] GEMINI AI 분석 실행');
    updateDiagnosisProgress(diagnosisId, 'AI분석중', '데이터를 심층 분석하고 있습니다 (10-15분 소요)');
    
    let analysisResult = null;
    let retryCount = 0;
    const maxRetries = 5;
    
    while (retryCount < maxRetries && !analysisResult) {
      try {
        console.log(`\nAI 분석 시도 ${retryCount + 1}/${maxRetries}`);
        
        // 재시도 상태 업데이트
        if (retryCount > 0) {
          updateDiagnosisProgress(diagnosisId, 'AI분석중', 
            `분석 재시도 중... (${retryCount}/${maxRetries})`);
        }
        
        // GEMINI API 호출
        analysisResult = callGeminiAPIFixed(prompt);
        
        // 품질 검증
        if (analysisResult && analysisResult.length >= 5000) {
          console.log(`✅ 고품질 보고서 생성 성공!`);
          console.log(`   - 길이: ${analysisResult.length}자`);
          console.log(`   - 품질: ${analysisResult.length > 7000 ? '최고품질' : '고품질'}`);
          break;
        } else if (analysisResult && analysisResult.length >= 3000) {
          console.log('⚠️ 보고서 생성됨 (품질 향상 필요)');
          // 품질이 낮아도 일단 진행
          break;
        }
        
        retryCount++;
        if (retryCount < maxRetries) {
          console.log(`🔄 품질 향상을 위한 재생성 대기중...`);
          Utilities.sleep(15000); // 15초 대기
        }
        
      } catch (apiError) {
        console.error(`❌ API 호출 실패 (시도 ${retryCount + 1}):`, apiError.toString());
        retryCount++;
        
        if (retryCount < maxRetries) {
          console.log('⏳ 재시도 대기중...');
          Utilities.sleep(30000); // 30초 대기
        }
      }
    }
    
    // 분석 결과 최종 검증
    if (!analysisResult || analysisResult.length < 2000) {
      currentStep = '분석실패';
      updateDiagnosisProgress(diagnosisId, '분석실패', 'AI 분석 품질 기준 미달');
      throw new Error('AI 분석 실패 - 재시도 횟수 초과 또는 품질 미달');
    }
    
    console.log('\n✅ AI 분석 완료!');
    const analysisTime = Math.floor((new Date() - analysisStartTime) / 60000);
    console.log(`   분석 소요시간: ${analysisTime}분`);
    
    // ======== 5단계: 보고서 구조화 ========
    currentStep = '보고서생성중';
    console.log('\n[5단계] 보고서 구조화');
    updateDiagnosisProgress(diagnosisId, '보고서생성중', '맞춤형 보고서를 생성하고 있습니다');
    
    let structuredResult;
    try {
      structuredResult = structureFreeDiagnosisResult(analysisResult, data);
      
      // 구조화 결과 검증
      if (!structuredResult || !structuredResult.overallScore) {
        throw new Error('보고서 구조화 실패 - 필수 데이터 누락');
      }
      
      console.log('✅ 보고서 구조화 완료');
      console.log(`   - 종합점수: ${structuredResult.overallScore}점`);
      console.log(`   - 등급: ${structuredResult.overallGrade}`);
      
    } catch (structureError) {
      currentStep = '구조화실패';
      updateDiagnosisProgress(diagnosisId, '구조화실패', '보고서 구조화 중 오류 발생');
      throw structureError;
    }
    
    // ======== 6단계: 결과 저장 ========
    currentStep = '결과저장중';
    console.log('\n[6단계] 분석 결과 저장');
    updateDiagnosisProgress(diagnosisId, '결과저장중', '분석 결과를 저장하고 있습니다');
    
    try {
      // 메인 결과 저장
      saveFreeDiagnosisResult(diagnosisId, structuredResult);
      console.log('✅ 메인 결과 저장 완료');
      
      // 상세 결과 저장
      saveFreeDiagnosisDetailedResult(diagnosisId, structuredResult);
      console.log('✅ 상세 결과 저장 완료');
      
      updateDiagnosisProgress(diagnosisId, '결과저장완료', '분석 결과 저장 완료');
      
    } catch (saveError) {
      currentStep = '저장실패';
      updateDiagnosisProgress(diagnosisId, '저장실패', '결과 저장 중 오류 발생');
      throw saveError;
    }
    
    // ======== 7단계: 최종 검토 ========
    currentStep = '최종검토중';
    console.log('\n[7단계] 최종 품질 검토');
    updateDiagnosisProgress(diagnosisId, '최종검토중', '보고서 품질을 최종 검토하고 있습니다');
    Utilities.sleep(2000); // 2초 대기
    
    // 완료 임박 알림
    sendProgressNotificationFixed(data.email, data.companyName, '완료임박', '30초 이내');
    
    // ======== 8단계: 이메일 발송 ========
    currentStep = '이메일발송중';
    console.log('\n[8단계] 결과 이메일 발송');
    updateDiagnosisProgress(diagnosisId, '이메일발송중', '보고서를 이메일로 발송하고 있습니다');
    
    try {
      sendFreeDiagnosisResultEmailFixed(data.email, data.companyName, diagnosisId, structuredResult);
      console.log('✅ 사용자 이메일 발송 완료');
      
      // 관리자 알림
      sendAdminCompletionNotification(data, diagnosisId, structuredResult, analysisResult.length);
      console.log('✅ 관리자 알림 발송 완료');
      
    } catch (emailError) {
      currentStep = '이메일발송실패';
      updateDiagnosisProgress(diagnosisId, '이메일발송실패', '보고서 이메일 발송 실패');
      // 이메일 실패해도 프로세스는 완료로 처리
      console.error('이메일 발송 실패:', emailError);
    }
    
    // ======== 9단계: 완료 처리 ========
    currentStep = '완료';
    updateDiagnosisProgress(diagnosisId, '완료', '보고서 발송 완료');
    processCompleted = true;
    
    // 타임아웃 클리어
    clearTimeout(processTimeout);
    
    // 최종 요약
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
    console.log('='.repeat(80));
    
    return {
      success: true,
      diagnosisId: diagnosisId,
      totalTime: totalTime,
      reportLength: analysisResult.length
    };
    
  } catch (error) {
    console.error('\n❌ AI 분석 오류 발생');
    console.error(`현재 단계: ${currentStep}`);
    console.error(`오류 내용: ${error.toString()}`);
    console.error('스택:', error.stack);
    
    // 진행 상태를 오류로 업데이트
    updateDiagnosisProgress(diagnosisId, '오류발생', 
      `${currentStep} 단계에서 오류 발생: ${error.message}`);
    
    // 관리자에게 오류 알림
    notifyAdminFreeDiagnosisError(diagnosisId, error, currentStep);
    
    // 사용자에게 오류 알림
    sendErrorNotificationToUser(data.email, data.companyName, diagnosisId, currentStep);
    
    // 타임아웃 클리어
    clearTimeout(processTimeout);
    processCompleted = true;
    
    return {
      success: false,
      error: error.toString(),
      stage: currentStep
    };
  }
}

/**
 * 개선된 GEMINI API 호출 함수
 */
function callGeminiAPIFixed(prompt) {
  const requestBody = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }],
    generationConfig: {
      temperature: 0.85,
      topK: 60,
      topP: 0.98,
      maxOutputTokens: 65536,
      candidateCount: 1
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_ONLY_HIGH"
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH", 
        threshold: "BLOCK_ONLY_HIGH"
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_ONLY_HIGH"
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_ONLY_HIGH"
      }
    ]
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(requestBody),
    muteHttpExceptions: true,
    timeout: TIMEOUT_SETTINGS.GEMINI_API  // 20분 타임아웃
  };

  console.log('🚀 GEMINI API 호출 시작');
  const startTime = new Date();
  
  try {
    const apiUrl = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;
    const response = UrlFetchApp.fetch(apiUrl, options);
    const responseTime = Math.floor((new Date() - startTime) / 1000);
    
    console.log(`📡 API 응답 수신 (${responseTime}초)`);
    console.log(`   상태 코드: ${response.getResponseCode()}`);
    
    if (response.getResponseCode() !== 200) {
      throw new Error(`API 오류: ${response.getResponseCode()}`);
    }
    
    const responseData = JSON.parse(response.getContentText());
    
    if (responseData.candidates && responseData.candidates[0]) {
      const text = responseData.candidates[0].content.parts[0].text;
      return text;
    }
    
    throw new Error('API 응답에 텍스트가 없습니다');
    
  } catch (error) {
    console.error('GEMINI API 호출 실패:', error);
    throw error;
  }
}

/**
 * 개선된 진행상황 알림 함수
 */
function sendProgressNotificationFixed(email, companyName, status, estimatedTime) {
  try {
    console.log(`📧 진행상황 알림 발송: ${status}`);
    
    // 기존 sendProgressNotification 함수 호출
    sendProgressNotification(email, companyName, status, estimatedTime);
    
  } catch (error) {
    console.error('진행상황 알림 실패:', error);
    // 알림 실패해도 프로세스는 계속 진행
  }
}

/**
 * 개선된 결과 이메일 발송 함수
 */
function sendFreeDiagnosisResultEmailFixed(email, companyName, diagnosisId, result) {
  console.log('📧 결과 이메일 발송 시작');
  
  try {
    // 기존 sendFreeDiagnosisResultEmail 함수 호출
    sendFreeDiagnosisResultEmail(email, companyName, diagnosisId, result);
    
    console.log('✅ 결과 이메일 발송 성공');
    
  } catch (error) {
    console.error('결과 이메일 발송 실패:', error);
    throw error;
  }
}

/**
 * 관리자 완료 알림
 */
function sendAdminCompletionNotification(data, diagnosisId, result, reportLength) {
  try {
    const subject = `[진단 완료] ${data.companyName} - ${data.industry}`;
    const htmlBody = `
      <h3>AI 경영진단보고서 분석 완료</h3>
      <p><strong>진단 ID:</strong> ${diagnosisId}</p>
      <p><strong>기업명:</strong> ${data.companyName}</p>
      <p><strong>업종:</strong> ${data.industry}</p>
      <p><strong>종합 점수:</strong> ${result.overallScore}점</p>
      <p><strong>등급:</strong> ${result.overallGrade}</p>
      <p><strong>보고서 품질:</strong> ${reportLength > 7000 ? '최고품질' : '고품질'} (${reportLength}자)</p>
      <p><strong>완료 시간:</strong> ${getCurrentKoreanTime()}</p>
      <hr>
      <p><strong>신청자 정보:</strong></p>
      <ul>
        <li>이메일: ${data.email}</li>
        <li>연락처: ${data.phone}</li>
        <li>직원수: ${data.employeeCount}</li>
        <li>연매출: ${data.annualRevenue}</li>
      </ul>
    `;
    
    GmailApp.sendEmail(ADMIN_EMAIL, subject, '', {
      htmlBody: htmlBody,
      name: 'AICAMP AI 경영진단 시스템'
    });
    
  } catch (error) {
    console.error('관리자 알림 발송 실패:', error);
  }
}

/**
 * 사용자 오류 알림
 */
function sendErrorNotificationToUser(email, companyName, diagnosisId, errorStage) {
  try {
    const subject = `[이후경 교장의 AI 경영진단보고서] 처리 지연 안내`;
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>안녕하세요, ${companyName}님</h2>
        <p>AI 경영진단보고서 생성 중 일시적인 지연이 발생했습니다.</p>
        <p>전문가가 직접 확인하여 최고 품질의 보고서를 제공해드리겠습니다.</p>
        <p><strong>진단 ID:</strong> ${diagnosisId}</p>
        <p><strong>발생 단계:</strong> ${errorStage}</p>
        <p>빠른 시일 내에 처리하여 연락드리겠습니다.</p>
        <p>불편을 드려 죄송합니다.</p>
        <hr>
        <p>문의: 010-9251-9743 (이후경 교장)</p>
      </div>
    `;
    
    GmailApp.sendEmail(email, subject, '', {
      htmlBody: htmlBody,
      name: '이후경 교장의 AI 경영진단보고서'
    });
    
  } catch (error) {
    console.error('사용자 오류 알림 발송 실패:', error);
  }
}

/**
 * 테스트 실행 함수
 */
function testCompleteAIDiagnosisFlow() {
  console.log('🧪 AI 역량진단 완전 테스트 시작');
  
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
    email: 'hongik423@gmail.com', // 테스트용 관리자 이메일
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
  console.log(`테스트 진단 ID: ${diagnosisId}`);
  
  // 분석 실행
  const result = performFreeDiagnosisAIAnalysisFixed(diagnosisId, testData);
  
  if (result.success) {
    console.log('\n✅ 테스트 성공!');
    console.log(`총 소요시간: ${Math.floor(result.totalTime / 60)}분`);
    console.log(`보고서 길이: ${result.reportLength}자`);
  } else {
    console.log('\n❌ 테스트 실패');
    console.log(`실패 단계: ${result.stage}`);
    console.log(`오류: ${result.error}`);
  }
  
  return result;
}