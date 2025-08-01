/**
 * AICAMP 무료 AI 경영진단 시스템 - Google Apps Script
 * PRD 기반 완전 재구축 버전
 * 
 * 기능:
 * 1. 진단 신청 데이터 저장 (Google Sheets)
 * 2. Gemini 2.5 Flash API를 통한 AI 분석
 * 3. 이메일 자동 발송 (신청자/관리자)
 * 4. 진단 결과 생성 및 저장
 */

// ===== 환경 설정 =====
const CONFIG = {
  // Google Sheets ID (실제 ID로 교체 필요)
  SHEETS_ID: 'YOUR_GOOGLE_SHEETS_ID',
  
  // 시트 이름
  SHEETS: {
    APPLICATIONS: '진단신청',
    RESULTS: '진단결과',
    LOGS: '로그'
  },
  
  // Gemini API 키 (스크립트 속성에서 관리)
  GEMINI_API_KEY: PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY'),
  
  // 이메일 설정
  EMAIL: {
    ADMIN: 'admin@aicamp.club',
    FROM_NAME: 'AICAMP 무료 AI 경영진단',
    REPLY_TO: 'contact@aicamp.club'
  }
};

// ===== 메인 진입점 =====
function doPost(e) {
  try {
    const request = JSON.parse(e.postData.contents);
    const { action, data } = request;
    
    console.log('요청 수신:', action);
    
    switch (action) {
      case 'submitFreeDiagnosis':
        return handleDiagnosisSubmission(data);
      
      case 'getDiagnosisResult':
        return handleGetDiagnosisResult(data.diagnosisId);
      
      default:
        return createResponse(false, '알 수 없는 액션입니다');
    }
  } catch (error) {
    console.error('오류 발생:', error);
    return createResponse(false, '요청 처리 중 오류가 발생했습니다', { error: error.toString() });
  }
}

// ===== 진단 신청 처리 =====
function handleDiagnosisSubmission(data) {
  try {
    // 1. 고유 ID 생성
    const diagnosisId = generateDiagnosisId();
    const timestamp = new Date();
    
    // 2. Google Sheets에 신청 데이터 저장
    saveApplicationData(diagnosisId, data, timestamp);
    
    // 3. 신청자에게 접수 확인 이메일 발송
    sendConfirmationEmail(data.email, data.companyName, diagnosisId);
    
    // 4. 관리자에게 신청 알림 이메일 발송
    sendAdminNotification(data, diagnosisId);
    
    // 5. AI 분석 시작 (비동기 처리를 위해 트리거 설정)
    setAnalysisTrigger(diagnosisId, data);
    
    return createResponse(true, '진단 신청이 완료되었습니다', { diagnosisId });
    
  } catch (error) {
    console.error('진단 신청 처리 오류:', error);
    return createResponse(false, '진단 신청 처리 중 오류가 발생했습니다', { error: error.toString() });
  }
}

// ===== AI 분석 처리 =====
function performAIAnalysis(diagnosisId, data) {
  try {
    console.log('AI 분석 시작:', diagnosisId);
    
    // 1. Gemini API 호출을 위한 프롬프트 생성
    const prompt = generateAnalysisPrompt(data);
    
    // 2. Gemini 2.5 Flash API 호출
    const analysisResult = callGeminiAPI(prompt);
    
    // 3. 분석 결과 구조화
    const structuredResult = structureAnalysisResult(analysisResult, data);
    
    // 4. 결과 저장
    saveAnalysisResult(diagnosisId, structuredResult);
    
    // 5. 결과 이메일 발송
    sendResultEmail(data.email, data.companyName, diagnosisId, structuredResult);
    
    console.log('AI 분석 완료:', diagnosisId);
    
  } catch (error) {
    console.error('AI 분석 오류:', error);
    // 오류 발생 시 관리자에게 알림
    notifyAdminError(diagnosisId, error);
  }
}

// ===== Gemini API 호출 =====
function callGeminiAPI(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${CONFIG.GEMINI_API_KEY}`;
  
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
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    
    if (result.candidates && result.candidates[0]) {
      return result.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Gemini API 응답이 올바르지 않습니다');
    }
  } catch (error) {
    console.error('Gemini API 호출 오류:', error);
    throw error;
  }
}

// ===== 프롬프트 생성 =====
function generateAnalysisPrompt(data) {
  return `
당신은 28년 경력의 경영 컨설턴트입니다. 다음 기업에 대한 포괄적인 경영진단을 수행해주세요.

[기업 정보]
- 기업명: ${data.companyName}
- 대표자: ${data.representativeName}
- 업종: ${data.industry}
- 지역: ${data.region}
- 사업 내용: ${data.businessContent}
- 주요 고민사항: ${data.concerns}
- 기대 효과: ${data.expectations}

다음 형식으로 상세한 경영진단 보고서를 작성해주세요:

1. 종합 진단 개요
   - 핵심 요약 (200자 이내)
   - 종합 점수 (100점 만점)
   - 등급 (S/A/B/C/D)
   - 주요 발견사항 3가지

2. SWOT 분석
   - 강점 (Strengths): 3-5개 항목
   - 약점 (Weaknesses): 3-5개 항목
   - 기회 (Opportunities): 3-5개 항목
   - 위협 (Threats): 3-5개 항목

3. 전략 매트릭스
   - SO 전략: 강점을 활용한 기회 포착 전략 2-3개
   - WO 전략: 약점 보완을 통한 기회 활용 전략 2-3개
   - ST 전략: 강점을 활용한 위협 대응 전략 2-3개
   - WT 전략: 약점 최소화 및 위협 회피 전략 2-3개

4. 3단계 실행 로드맵
   - 1단계 (1-3개월): 즉시 실행 가능한 개선사항 3-5개
   - 2단계 (4-9개월): 중기 전략 실행 계획 3-5개
   - 3단계 (10-12개월): 장기 비전 달성 계획 3-5개

5. 업계 벤치마크 비교
   - 5개 핵심 지표별 점수 (100점 만점)
   - 업계 평균 대비 비교
   - 경쟁 우위 요소 3-4개

6. 맞춤형 AICAMP 서비스 추천
   - 추천 교육 프로그램 3개
   - 추천 컨설팅 서비스 2-3개

JSON 형식으로 응답해주세요.
`;
}

// ===== 이메일 발송 함수들 =====
function sendConfirmationEmail(email, companyName, diagnosisId) {
  const subject = `[AICAMP] ${companyName}님의 무료 AI 경영진단 신청이 접수되었습니다`;
  
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">무료 AI 경영진단 신청 확인</h2>
      <p>안녕하세요, ${companyName}님</p>
      <p>AICAMP 무료 AI 경영진단 신청이 정상적으로 접수되었습니다.</p>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">접수 정보</h3>
        <p><strong>진단 ID:</strong> ${diagnosisId}</p>
        <p><strong>접수 일시:</strong> ${new Date().toLocaleString('ko-KR')}</p>
        <p><strong>예상 완료 시간:</strong> 5-10분</p>
      </div>
      
      <p>AI 분석이 완료되면 결과 보고서를 이메일로 발송해드리겠습니다.</p>
      
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
      
      <p style="color: #666; font-size: 14px;">
        문의사항: 이후경 교장 📞 010-9251-9743 📧 hongik423@gmail.com
      </p>
    </div>
  `;
  
  GmailApp.sendEmail(email, subject, '', {
    htmlBody: htmlBody,
    name: CONFIG.EMAIL.FROM_NAME,
    replyTo: CONFIG.EMAIL.REPLY_TO
  });
}

function sendAdminNotification(data, diagnosisId) {
  const subject = `[신규 진단 신청] ${data.companyName} - ${data.industry}`;
  
  const htmlBody = `
    <h3>새로운 무료 AI 경영진단 신청</h3>
    <p><strong>진단 ID:</strong> ${diagnosisId}</p>
    <p><strong>기업명:</strong> ${data.companyName}</p>
    <p><strong>대표자:</strong> ${data.representativeName}</p>
    <p><strong>업종:</strong> ${data.industry}</p>
    <p><strong>지역:</strong> ${data.region}</p>
    <p><strong>이메일:</strong> ${data.email}</p>
    <p><strong>주요 고민사항:</strong> ${data.concerns}</p>
    <p><strong>신청 시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
  `;
  
  GmailApp.sendEmail(CONFIG.EMAIL.ADMIN, subject, '', {
    htmlBody: htmlBody,
    name: CONFIG.EMAIL.FROM_NAME
  });
}

// ===== 유틸리티 함수들 =====
function generateDiagnosisId() {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `DIAG-${dateStr}-${random}`;
}

function createResponse(success, message, data = {}) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success,
      message,
      ...data
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function saveApplicationData(diagnosisId, data, timestamp) {
  const sheet = SpreadsheetApp.openById(CONFIG.SHEETS_ID).getSheetByName(CONFIG.SHEETS.APPLICATIONS);
  
  sheet.appendRow([
    timestamp,
    diagnosisId,
    data.companyName,
    data.representativeName,
    data.position,
    data.industry,
    data.region,
    data.businessContent,
    data.concerns,
    data.customConcern || '',
    data.expectations,
    data.email,
    '신청완료'
  ]);
}

function setAnalysisTrigger(diagnosisId, data) {
  // 1분 후 AI 분석 실행을 위한 트리거 설정
  ScriptApp.newTrigger('performAIAnalysis')
    .timeBased()
    .after(1 * 60 * 1000) // 1분
    .create();
  
  // 트리거에 전달할 데이터를 스크립트 속성에 임시 저장
  const properties = PropertiesService.getScriptProperties();
  properties.setProperty(`analysis_${diagnosisId}`, JSON.stringify({ diagnosisId, data }));
}

// ===== 진단 결과 조회 =====
function handleGetDiagnosisResult(diagnosisId) {
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.SHEETS_ID).getSheetByName(CONFIG.SHEETS.RESULTS);
    const data = sheet.getDataRange().getValues();
    
    // 헤더 제외하고 해당 ID 찾기
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === diagnosisId) {
        const resultData = JSON.parse(data[i][2]); // 결과 JSON 컬럼
        return createResponse(true, '결과 조회 성공', { data: resultData });
      }
    }
    
    return createResponse(false, '진단 결과를 찾을 수 없습니다');
    
  } catch (error) {
    console.error('결과 조회 오류:', error);
    return createResponse(false, '결과 조회 중 오류가 발생했습니다');
  }
}

// ===== 초기 설정 함수 =====
function initializeSheets() {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.SHEETS_ID);
  
  // 진단신청 시트 생성
  try {
    let sheet = spreadsheet.getSheetByName(CONFIG.SHEETS.APPLICATIONS);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(CONFIG.SHEETS.APPLICATIONS);
      sheet.appendRow([
        '신청일시', '진단ID', '기업명', '대표자명', '직책', '업종', '지역',
        '사업내용', '고민사항', '기타고민', '기대효과', '이메일', '상태'
      ]);
    }
  } catch (e) {
    console.log('진단신청 시트 이미 존재');
  }
  
  // 진단결과 시트 생성
  try {
    let sheet = spreadsheet.getSheetByName(CONFIG.SHEETS.RESULTS);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(CONFIG.SHEETS.RESULTS);
      sheet.appendRow([
        '진단ID', '분석일시', '결과JSON', '점수', '등급'
      ]);
    }
  } catch (e) {
    console.log('진단결과 시트 이미 존재');
  }
  
  // 로그 시트 생성
  try {
    let sheet = spreadsheet.getSheetByName(CONFIG.SHEETS.LOGS);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(CONFIG.SHEETS.LOGS);
      sheet.appendRow([
        '일시', '유형', '메시지', '상세내용'
      ]);
    }
  } catch (e) {
    console.log('로그 시트 이미 존재');
  }
}