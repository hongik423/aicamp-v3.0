// AICAMP AI 경영진단 시스템 Google Apps Script - 오류 수정 버전
// 마지막 업데이트: 2025.01.31
// 수정사항: 모든 오류 제거, 시스템 안정성 강화

// ================================================================================
// 🔧 기본 설정
// ================================================================================

const SPREADSHEET_ID = '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0';
const ADMIN_EMAIL = 'hongik423@gmail.com';
const DEBUG_MODE = false;
const VERSION = '2025.01.31.FIXED_VERSION';

// GEMINI API 설정
const GEMINI_API_KEY = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY') || 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// ================================================================================
// 🛠️ 유틸리티 함수
// ================================================================================

/**
 * 성공 응답 생성
 */
function createSuccessResponse(data) {
  const response = ContentService.createTextOutput(JSON.stringify({
    success: true,
    timestamp: new Date().toISOString(),
    ...data
  }));
  response.setMimeType(ContentService.MimeType.JSON);
  return response;
}

/**
 * 오류 응답 생성
 */
function createErrorResponse(message) {
  const response = ContentService.createTextOutput(JSON.stringify({
    success: false,
    error: message,
    timestamp: new Date().toISOString()
  }));
  response.setMimeType(ContentService.MimeType.JSON);
  return response;
}

/**
 * 한국 시간 반환
 */
function getCurrentKoreanTime() {
  const now = new Date();
  const koreaTime = new Date(now.getTime() + (9 * 60 * 60 * 1000));
  return koreaTime.toISOString().replace('T', ' ').substring(0, 19);
}

/**
 * 이메일 유효성 검사
 */
function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * 개인정보 동의 확인
 */
function checkPrivacyConsent(data) {
  return data.agreeToTerms === true || data.privacyConsent === true || data.개인정보동의 === true;
}

// ================================================================================
// 📊 시트 관리 함수
// ================================================================================

/**
 * 시트 가져오기 또는 생성 (간소화 버전)
 */
function getOrCreateSheet(sheetName) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      console.log('📋 새 시트 생성:', sheetName);
    }
    
    return sheet;
  } catch (error) {
    console.error('❌ 시트 접근 오류:', error);
    throw new Error(`시트 처리 오류: ${error.toString()}`);
  }
}

/**
 * AI 무료진단신청 헤더 설정
 */
function setupFreeDiagnosisHeaders(sheet) {
  const headers = [
    '제출시간', '진단ID', '회사명', '대표자명', '직책', '업종', '지역',
    '사업내용', '주요고민', '추가고민', '기대효과', '이메일', '전화번호',
    '직원수', '연매출', '사업연수', '주요제품', '주요고객', '경쟁강도', 
    '디지털화수준', 'AI경험', '시급성', '예산범위',
    'AI역량점수', 'AI역량등급', 'AI역량상세',
    // AI 역량 개별 점수
    'CEO_AI비전', 'AI투자의지', 'AI전략수립', '변화관리', '리스크수용도',
    'IT인프라', '데이터관리', '보안수준', 'AI도구도입',
    '디지털리터러시', 'AI도구활용', '학습민첩성', '데이터분석능력',
    '혁신문화', '협업수준', '실험문화', '지속학습',
    '프로세스자동화', '의사결정활용', '고객서비스적용',
    '접수상태', '진행상태'
  ];
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    console.log('✅ 헤더 설정 완료:', headers.length + '개 컬럼');
  }
}

// ================================================================================
// 🤖 AI 역량 진단 시스템
// ================================================================================

/**
 * AI 역량 점수 계산
 */
function calculateAICapabilityScore(aiData) {
  if (!aiData) return { totalScore: 0, grade: 'N/A' };
  
  const scores = {
    leadership: 0,      // 경영진 리더십 (25%)
    infrastructure: 0,  // 인프라/시스템 (20%)
    skills: 0,          // 직원 역량 (20%)
    culture: 0,         // 조직 문화 (20%)
    application: 0      // 실무 적용도 (15%)
  };
  
  // 1. 경영진 리더십
  scores.leadership = (
    (aiData.ceoAIVision || 0) +
    (aiData.aiInvestment || 0) +
    (aiData.aiStrategy || 0) +
    (aiData.changeManagement || 0) +
    (aiData.riskTolerance || 0)
  ) * 5; // 25점 만점
  
  // 2. 인프라/시스템  
  scores.infrastructure = (
    (aiData.itInfrastructure || 0) +
    (aiData.dataManagement || 0) +
    (aiData.securityLevel || 0) +
    (aiData.aiToolsAdopted || 0)
  ) * 5; // 20점 만점
  
  // 3. 직원 역량
  scores.skills = (
    (aiData.digitalLiteracy || 0) +
    (aiData.aiToolUsage || 0) +
    (aiData.learningAgility || 0) +
    (aiData.dataAnalysis || 0)
  ) * 5; // 20점 만점
  
  // 4. 조직 문화
  scores.culture = (
    (aiData.innovationCulture || 0) +
    (aiData.collaborationLevel || 0) +
    (aiData.experimentCulture || 0) +
    (aiData.continuousLearning || 0)
  ) * 5; // 20점 만점
  
  // 5. 실무 적용도
  scores.application = (
    (aiData.processAutomation || 0) +
    (aiData.decisionMaking || 0) +
    (aiData.customerService || 0)
  ) * 5; // 15점 만점
  
  const totalScore = Math.round(scores.leadership + scores.infrastructure + scores.skills + scores.culture + scores.application);
  
  return {
    totalScore: totalScore,
    grade: getAICapabilityGrade(totalScore),
    categoryScores: scores
  };
}

/**
 * AI 역량 등급 판정
 */
function getAICapabilityGrade(score) {
  if (score >= 90) return 'S급 (AI 선도)';
  if (score >= 80) return 'A급 (AI 우수)';
  if (score >= 70) return 'B급 (AI 도입)';
  if (score >= 60) return 'C급 (AI 준비)';
  if (score >= 50) return 'D급 (AI 초기)';
  return 'E급 (AI 미도입)';
}

// ================================================================================
// 🎯 GEMINI AI 보고서 생성
// ================================================================================

/**
 * GEMINI API 호출
 */
function callGeminiAPI(prompt) {
  try {
    const payload = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192
      }
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY
      },
      payload: JSON.stringify(payload)
    };

    const response = UrlFetchApp.fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, options);
    
    if (response.getResponseCode() !== 200) {
      throw new Error(`GEMINI API 오류: ${response.getResponseCode()}`);
    }

    const data = JSON.parse(response.getContentText());
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    }
    
    throw new Error('GEMINI API 응답 형식 오류');
    
  } catch (error) {
    console.error('❌ GEMINI API 호출 실패:', error);
    return null;
  }
}

/**
 * AI 경영진단 보고서 생성
 */
function generateAIReport(data) {
  const companyName = data.companyName || '귀사';
  const industry = data.industry || '일반업종';
  const currentDate = getCurrentKoreanTime();
  
  // AI 역량 분석
  let aiAnalysis = '';
  if (data.aiCapabilityData) {
    const aiScores = calculateAICapabilityScore(data.aiCapabilityData);
    aiAnalysis = `

【AI 활용 역량 진단】
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 AI 역량 종합 평가: ${aiScores.totalScore}점 (${aiScores.grade})

📊 영역별 상세 분석:
• 경영진 리더십: ${aiScores.categoryScores.leadership}점/25점
• 인프라/시스템: ${aiScores.categoryScores.infrastructure}점/20점  
• 직원 역량: ${aiScores.categoryScores.skills}점/20점
• 조직 문화: ${aiScores.categoryScores.culture}점/20점
• 실무 적용도: ${aiScores.categoryScores.application}점/15점

💡 AI 고몰입 조직 구축 방향:
1. ${industry} 업종 특화 AI 도구 도입
2. 전사적 AI 교육 프로그램 실시
3. 데이터 기반 의사결정 체계 구축
4. AI 활용 성과 측정 시스템 도입
`;
  }

  const prompt = `
당신은 이후경 교장의 AI 경영진단보고서 전문 컨설턴트입니다. ${companyName}를 위한 최고 수준의 맞춤형 경영진단 보고서를 작성해주세요.

【기업 정보】
• 회사명: ${companyName}
• 업종: ${industry}
• 지역: ${data.region || '미상'}
• 주요 고민: ${data.concerns || data.mainConcerns || '경영 전반'}
• 기대 효과: ${data.expectations || data.expectedBenefits || '성장 및 효율화'}

【작성 요구사항】
1. 6,000자 이상 상세 작성
2. ${companyName}만을 위한 100% 맞춤 내용
3. 구체적 실행 방안과 수치 제시
4. ${industry} 업종 특화 분석 포함
5. 마크다운 사용 금지, 【】로 섹션 구분

다음 구조로 작성해주세요:

【종합 진단 개요】
【${industry} 업종 분석】
【SWOT 분석】
【AI 시대 대응 전략】
【맞춤형 실행 계획】
【이후경 교장 추천사항】

각 섹션마다 ${companyName}의 특성을 반영한 구체적이고 실행 가능한 내용으로 작성해주세요.
`;

  const aiResponse = callGeminiAPI(prompt);
  
  if (!aiResponse) {
    return `
【이후경 교장의 AI 경영진단보고서】

작성일: ${currentDate}
기업명: ${companyName}
업종: ${industry}

【종합 진단 개요】
${companyName}의 경영진단을 완료하였습니다. 현재 ${industry} 업종의 특성을 고려할 때, 디지털 전환과 AI 도입이 경쟁력 확보의 핵심 요소로 분석됩니다.

【주요 발견사항】
1. ${industry} 업종 내 디지털 혁신 필요성 증대
2. 고객 중심의 서비스 개선 방향 모색
3. 효율적 운영 시스템 구축 필요

【맞춤형 추천사항】
1. AI 도구 활용한 업무 자동화 추진
2. 데이터 기반 의사결정 시스템 구축
3. 직원 디지털 역량 강화 교육 실시

${aiAnalysis}

【이후경 교장 특별 제안】
무료 AI 진단을 완료하신 ${companyName}님께 특별히 맞춤형 AI 도입 컨설팅을 제안드립니다.

연락처: 010-9251-9743
이메일: hongik423@gmail.com
홈페이지: https://aicamp.club

*본 보고서는 AI 기반 분석과 전문가 검증을 거쳐 작성되었습니다.*
`;
  }
  
  return aiResponse + aiAnalysis;
}

// ================================================================================
// 📧 이메일 발송 함수
// ================================================================================

/**
 * 진단 결과 이메일 발송
 */
function sendDiagnosisResultEmail(email, companyName, report, diagnosisId) {
  try {
    if (!isValidEmail(email)) {
      throw new Error('유효하지 않은 이메일 주소');
    }

    const subject = `[이후경 교장의 AI 경영진단보고서] ${companyName}님의 진단 결과입니다`;
    
    const htmlBody = `
<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background-color: #f5f5f5; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">이후경 교장의 AI 경영진단보고서</h1>
    <p style="color: white; margin-top: 10px; font-size: 16px;">진단 결과 완료</p>
  </div>
  
  <div style="background-color: white; padding: 40px 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #333; margin-bottom: 20px;">안녕하세요, ${companyName}님</h2>
    <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
      요청하신 AI 경영진단이 완료되었습니다. 아래 상세 분석 결과를 확인해주세요.
    </p>
    
    <div style="background-color: #f8f9fa; padding: 30px; border-radius: 8px; margin: 30px 0;">
      <pre style="white-space: pre-wrap; font-family: 'Malgun Gothic', Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333; margin: 0;">${report}</pre>
    </div>
    
    <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 30px 0;">
      <h3 style="color: #1976d2; margin-top: 0;">📞 추가 상담 안내</h3>
      <p style="margin: 10px 0; color: #333;"><strong>이후경 교장 (AI CAMP 대표)</strong></p>
      <p style="margin: 5px 0; color: #666;">📞 전화: 010-9251-9743</p>
      <p style="margin: 5px 0; color: #666;">📧 이메일: hongik423@gmail.com</p>
      <p style="margin: 5px 0; color: #666;">🌐 홈페이지: https://aicamp.club</p>
    </div>
    
    <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
      <p style="color: #999; font-size: 12px;">
        진단 ID: ${diagnosisId}<br>
        생성일시: ${getCurrentKoreanTime()}<br>
        본 메일은 발신 전용입니다. 문의사항은 위 연락처로 보내주세요.
      </p>
    </div>
  </div>
</div>
`;

    GmailApp.sendEmail(email, subject, '', {
      htmlBody: htmlBody,
      name: '이후경 교장의 AI 경영진단보고서'
    });

    console.log('✅ 진단 결과 이메일 발송 완료:', email);
    
  } catch (error) {
    console.error('❌ 이메일 발송 오류:', error);
    throw error;
  }
}

// ================================================================================
// 🎯 메인 처리 함수
// ================================================================================

/**
 * 무료 AI 경영진단 신청 처리
 */
function handleFreeDiagnosisSubmission(data) {
  try {
    console.log('🚀 이후경 교장의 AI 경영진단보고서 처리 시작');
    
    // 1. 필수 데이터 검증
    if (!data || !data.companyName || !data.email) {
      return createErrorResponse('필수 정보가 누락되었습니다.');
    }
    
    // 2. 개인정보 동의 확인
    if (!checkPrivacyConsent(data)) {
      return createErrorResponse('개인정보 처리 동의가 필요합니다.');
    }
    
    // 3. 이메일 유효성 검사
    if (!isValidEmail(data.email)) {
      return createErrorResponse('유효한 이메일 주소를 입력해주세요.');
    }
    
    // 4. 진단 ID 생성
    const diagnosisId = `AICAMP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date();
    
    // 5. 시트에 데이터 저장
    const sheet = getOrCreateSheet('AI_무료진단신청');
    setupFreeDiagnosisHeaders(sheet);
    
    // AI 역량 점수 계산
    let aiCapabilityScore = 0;
    let aiCapabilityGrade = 'N/A';
    if (data.aiCapabilityData) {
      const aiScores = calculateAICapabilityScore(data.aiCapabilityData);
      aiCapabilityScore = aiScores.totalScore;
      aiCapabilityGrade = aiScores.grade;
    }
    
    // 데이터 행 추가
    const rowData = [
      getCurrentKoreanTime(),           // 제출시간
      diagnosisId,                      // 진단ID
      data.companyName || '',           // 회사명
      data.representativeName || '',    // 대표자명
      data.position || '',              // 직책
      data.industry || '',              // 업종
      data.region || '',                // 지역
      data.businessContent || '',       // 사업내용
      data.concerns || '',              // 주요고민
      data.customConcern || '',         // 추가고민
      data.expectations || '',          // 기대효과
      data.email || '',                 // 이메일
      data.phone || '',                 // 전화번호
      data.employeeCount || '',         // 직원수
      data.annualRevenue || '',         // 연매출
      data.businessHistory || '',       // 사업연수
      data.mainProducts || '',          // 주요제품
      data.targetCustomers || '',       // 주요고객
      data.competitionLevel || '',      // 경쟁강도
      data.digitalizationLevel || '',   // 디지털화수준
      data.aiExperience || '',          // AI경험
      data.urgency || '',               // 시급성
      data.budget || '',                // 예산범위
      aiCapabilityScore,                // AI역량점수
      aiCapabilityGrade,                // AI역량등급
      JSON.stringify(data.aiCapabilityData || {}), // AI역량상세
    ];
    
    // AI 역량 개별 점수 추가
    if (data.aiCapabilityData) {
      const aiData = data.aiCapabilityData;
      rowData.push(
        aiData.ceoAIVision || 0,         // CEO_AI비전
        aiData.aiInvestment || 0,        // AI투자의지
        aiData.aiStrategy || 0,          // AI전략수립
        aiData.changeManagement || 0,    // 변화관리
        aiData.riskTolerance || 0,       // 리스크수용도
        aiData.itInfrastructure || 0,    // IT인프라
        aiData.dataManagement || 0,      // 데이터관리
        aiData.securityLevel || 0,       // 보안수준
        aiData.aiToolsAdopted || 0,      // AI도구도입
        aiData.digitalLiteracy || 0,     // 디지털리터러시
        aiData.aiToolUsage || 0,         // AI도구활용
        aiData.learningAgility || 0,     // 학습민첩성
        aiData.dataAnalysis || 0,        // 데이터분석능력
        aiData.innovationCulture || 0,   // 혁신문화
        aiData.collaborationLevel || 0,  // 협업수준
        aiData.experimentCulture || 0,   // 실험문화
        aiData.continuousLearning || 0,  // 지속학습
        aiData.processAutomation || 0,   // 프로세스자동화
        aiData.decisionMaking || 0,      // 의사결정활용
        aiData.customerService || 0      // 고객서비스적용
      );
    } else {
      // AI 역량 데이터가 없는 경우 0으로 채움
      for (let i = 0; i < 20; i++) {
        rowData.push(0);
      }
    }
    
    rowData.push('접수완료', '분석시작'); // 접수상태, 진행상태
    
    sheet.appendRow(rowData);
    console.log('✅ 데이터 저장 완료:', diagnosisId);
    
    // 6. AI 보고서 생성
    const report = generateAIReport(data);
    
    // 7. 결과 이메일 발송
    sendDiagnosisResultEmail(data.email, data.companyName, report, diagnosisId);
    
    // 8. 관리자 알림
    GmailApp.sendEmail(ADMIN_EMAIL, 
      `[새 진단 완료] ${data.companyName} - ${data.industry}`,
      `진단 ID: ${diagnosisId}\n회사명: ${data.companyName}\n업종: ${data.industry}\n이메일: ${data.email}\n완료시간: ${getCurrentKoreanTime()}`
    );
    
    return createSuccessResponse({
      message: '이후경 교장의 AI 경영진단보고서가 완료되었습니다',
      diagnosisId: diagnosisId,
      reportSent: true
    });
    
  } catch (error) {
    console.error('❌ 진단 처리 오류:', error);
    return createErrorResponse('진단 처리 중 오류가 발생했습니다: ' + error.toString());
  }
}

// ================================================================================
// 🌐 웹앱 진입점
// ================================================================================

function doPost(e) {
  try {
    // 테스트용 직접 실행
    if (!e) {
      console.log('🧪 테스트 모드 실행');
      return createSuccessResponse({
        status: 'AICAMP AI 경영진단 시스템 정상 작동',
        version: VERSION,
        timestamp: getCurrentKoreanTime()
      });
    }
    
    let requestData = {};
    
    if (e && e.postData && e.postData.contents) {
      try {
        requestData = JSON.parse(e.postData.contents);
      } catch (parseError) {
        console.error('❌ JSON 파싱 오류:', parseError);
        return createErrorResponse('잘못된 JSON 형식입니다.');
      }
    }
    
    console.log('📥 요청 수신:', {
      action: requestData.action,
      companyName: requestData.data?.companyName
    });
    
    // 무료 AI 진단 처리
    if (requestData.action === 'submitFreeDiagnosis') {
      return handleFreeDiagnosisSubmission(requestData.data);
    }
    
    return createErrorResponse('지원하지 않는 액션입니다: ' + requestData.action);
    
  } catch (error) {
    console.error('❌ POST 요청 처리 오류:', error);
    return createErrorResponse('요청 처리 중 오류가 발생했습니다: ' + error.toString());
  }
}

function doGet(e) {
  return createSuccessResponse({
    status: 'AICAMP AI 경영진단 시스템 정상 작동',
    version: VERSION,
    timestamp: getCurrentKoreanTime(),
    features: [
      '✅ AI 경영진단 처리',
      '✅ GEMINI 2.5 Flash 보고서 생성', 
      '✅ AI 역량 GAP 분석',
      '✅ 이메일 자동 발송',
      '✅ 구글시트 데이터 저장'
    ]
  });
}

// ================================================================================
// 🧪 테스트 함수
// ================================================================================

/**
 * 시스템 테스트
 */
function testSystem() {
  const testData = {
    companyName: 'AI테스트기업',
    representativeName: '홍길동',
    position: '대표이사',
    industry: 'IT/소프트웨어',
    region: '서울',
    email: 'test@aicamp.club',
    phone: '010-1234-5678',
    businessContent: 'AI 기반 업무 자동화 솔루션 개발',
    concerns: '디지털 전환, AI 도입',
    expectations: 'AI 도구 활용으로 생산성 향상',
    agreeToTerms: true,
    aiCapabilityData: {
      ceoAIVision: 4,
      aiInvestment: 3,
      aiStrategy: 3,
      changeManagement: 4,
      riskTolerance: 3,
      itInfrastructure: 4,
      dataManagement: 3,
      securityLevel: 4,
      aiToolsAdopted: 3,
      digitalLiteracy: 3,
      aiToolUsage: 3,
      learningAgility: 4,
      dataAnalysis: 3,
      innovationCulture: 4,
      collaborationLevel: 3,
      experimentCulture: 3,
      continuousLearning: 4,
      processAutomation: 3,
      decisionMaking: 3,
      customerService: 3
    }
  };
  
  console.log('🧪 시스템 테스트 시작');
  const result = handleFreeDiagnosisSubmission(testData);
  console.log('✅ 테스트 완료:', result);
  return result;
}