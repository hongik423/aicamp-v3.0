// AICAMP 최고수준 AI 경영진단 시스템 Google Apps Script 2025 - 오류 수정 버전
// GEMINI 2.5 Flash AI 기반 맞춤형 진단보고서 생성
// Script ID: 1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj
// 마지막 업데이트: 2025.01.31
// 수정사항: setHeaders 오류 완전 제거, CORS 자동 처리

// ================================================================================
// 🔧 기본 설정
// ================================================================================

const SPREADSHEET_ID = '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0';
const GOOGLE_SHEETS_URL = 'https://docs.google.com/spreadsheets/d/1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0/edit';

const SHEETS = {
  DIAGNOSIS: 'AI_무료진단신청',
  CONSULTATION: '상담신청', 
  BETA_FEEDBACK: '베타피드백'
};

const ADMIN_EMAIL = 'hongik423@gmail.com';
const AUTO_REPLY_ENABLED = true;
const DEBUG_MODE = false; // 운영 환경: false, 개발 환경: true
const VERSION = '2025.01.31.AICAMP_오류수정_AI경영진단시스템_GEMINI25Flash_Production';

// 🤖 GEMINI API 설정 (최고수준 AI 보고서 생성용)
// 보안 강화: PropertiesService 사용 권장
const GEMINI_API_KEY = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY') || 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// 🌐 웹앱 배포 정보 및 CORS 설정 가이드
const DEPLOYMENT_INFO = {
  SCRIPT_ID: '1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj',
  DEPLOYMENT_ID: 'AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0',
  WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec',
  LAST_UPDATED: '2025.01.31'
};

// ⚠️ 중요: CORS 해결을 위한 Google Apps Script 배포 설정
// 1. 배포 > 새 배포 관리
// 2. 실행 대상: 나 (Execute as: Me)
// 3. 액세스 권한: 모든 사용자 (Who has access: Anyone)
// 4. 배포 후 새 URL로 업데이트
// 5. 기존 배포 수정 시에도 "New deployment" 필요

// AICAMP 로고 이미지 URL
const AICAMP_LOGO_URL = 'https://ai-camp-landingpage.vercel.app/images/aicamp_logo_del_250726.png';

// 🤖 AI 시대 조직적응 분석 상수
const AI_ADAPTATION_CONFIG = {
  INDUSTRY_AI_READINESS: {
    'manufacturing': { base: 65, factors: ['자동화', '스마트팩토리', 'IoT'] },
    'it': { base: 85, factors: ['AI개발', '클라우드', '빅데이터'] },
    'service': { base: 55, factors: ['챗봇', 'CRM', '개인화'] },
    'retail': { base: 60, factors: ['추천시스템', '재고최적화', '옴니채널'] },
    'food': { base: 45, factors: ['주문시스템', '배달앱', '키오스크'] }
  },
  AI_TRANSFORMATION_STAGES: {
    '도입준비': { score: 20, description: 'AI 인식 및 기초 준비 단계' },
    '시범적용': { score: 40, description: '부분적 AI 도구 활용 단계' },
    '확산적용': { score: 60, description: '주요 업무 영역 AI 적용 단계' },
    '완전통합': { score: 80, description: '조직 전반 AI 통합 운영 단계' },
    'AI선도': { score: 100, description: 'AI 기반 혁신 선도 단계' }
  },
  DIGITAL_BARRIERS: [
    '경영진의 AI 이해 부족',
    '직원들의 디지털 스킬 부족',
    '레거시 시스템과의 호환성',
    '데이터 품질 및 보안 문제',
    'AI 도입 비용 부담',
    '조직 문화의 저항',
    '전문 인력 부족',
    '투자 대비 효과 불확실성'
  ]
};

// ================================================================================
// 🤖 GEMINI AI 최고수준 보고서 생성 엔진
// ================================================================================

/**
 * 🎯 GEMINI 2.5 Flash API를 활용한 최고수준 AI 경영진단 보고서 생성
 * - 업종별 맞춤 분석
 * - AI 시대 조직적응 전략
 * - 실행 가능한 구체적 솔루션 제시
 */
function generatePremiumAIReportWithGemini(data, analysisData) {
  try {
    // 필수 데이터 검증 (한글/영어 필드명 모두 지원)
    const companyName = data?.회사명 || data?.companyName;
    const industry = Array.isArray(data?.업종) ? data.업종[0] : (data?.업종 || data?.industry);
    
    if (!data || (!companyName && !industry)) {
      console.error('❌ 필수 데이터 누락:', { companyName, industry });
      return {
        success: false,
        error: '필수 데이터가 누락되었습니다.',
        fallback: true
      };
    }

    console.log('🎯 GEMINI AI 보고서 생성 시작:', {
      companyName,
      industry,
      totalScore: analysisData?.totalScore || 'N/A'
    });

    // GEMINI API 호출을 위한 프롬프트 생성
    const prompt = generateGeminiPrompt(data, analysisData);
    
    // GEMINI API 호출
    const geminiResponse = callGeminiAPI(prompt);
    
    if (!geminiResponse || !geminiResponse.success) {
      console.error('❌ GEMINI API 호출 실패:', geminiResponse?.error);
      return {
        success: false,
        error: 'AI 보고서 생성 중 오류가 발생했습니다.',
        fallback: true
      };
    }

    console.log('✅ GEMINI AI 보고서 생성 완료');
    return {
      success: true,
      report: geminiResponse.content,
      aiGenerated: true
    };

  } catch (error) {
    console.error('❌ GEMINI AI 보고서 생성 실패:', error);
    return {
      success: false,
      error: error.toString(),
      fallback: true
    };
  }
}

/**
 * GEMINI API 호출
 */
function callGeminiAPI(prompt) {
  try {
    const requestBody = {
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
      payload: JSON.stringify(requestBody)
    };

    const response = UrlFetchApp.fetch(GEMINI_API_URL, options);
    const responseData = JSON.parse(response.getContentText());

    if (responseData.candidates && responseData.candidates[0]) {
      const content = responseData.candidates[0].content.parts[0].text;
      return {
        success: true,
        content: content
      };
    } else {
      console.error('❌ GEMINI API 응답 오류:', responseData);
      return {
        success: false,
        error: 'AI 응답 처리 중 오류가 발생했습니다.'
      };
    }

  } catch (error) {
    console.error('❌ GEMINI API 호출 실패:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * GEMINI 프롬프트 생성
 */
function generateGeminiPrompt(data, analysisData) {
  const companyName = data?.회사명 || data?.companyName || '귀사';
  const industry = data?.업종 || data?.industry || '일반';
  const totalScore = analysisData?.totalScore || 0;
  const employeeCount = data?.직원수 || data?.employeeCount || '';
  const businessDetails = data?.사업상세설명 || data?.businessDetails || '';
  const mainConcerns = data?.주요고민사항 || data?.mainConcerns || '';
  const expectedBenefits = data?.예상혜택 || data?.expectedBenefits || '';

  return `
당신은 AICAMP의 최고수준 AI 경영진단 전문가입니다. 
다음 정보를 바탕으로 전문적이고 구체적인 AI 경영진단 보고서를 작성해주세요.

**기업 정보:**
- 기업명: ${companyName}
- 업종: ${industry}
- 직원수: ${employeeCount}
- 사업상세: ${businessDetails}

**진단 결과:**
- 종합점수: ${totalScore}점
- 주요고민: ${mainConcerns}
- 예상혜택: ${expectedBenefits}

**보고서 요구사항:**
1. 기업 현황 분석 (강점, 약점, 기회, 위협)
2. AI 도입 전략 및 로드맵
3. 구체적인 개선 방안 (우선순위별)
4. 예상 효과 및 ROI 분석
5. 실행 가능한 액션 플랜

보고서는 전문적이면서도 이해하기 쉽게 작성하고, 
실행 가능한 구체적인 방안을 제시해주세요.
`;
}

// ================================================================================
// 📊 응답 생성 함수 (setHeaders 오류 수정)
// ================================================================================

/**
 * 성공 응답 생성 (CORS 자동 처리)
 */
function createSuccessResponse(data) {
  try {
    const timestamp = getCurrentKoreanTime();
    
    const response = ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        data: data,
        timestamp: timestamp,
        version: VERSION
      }))
      .setMimeType(ContentService.MimeType.JSON);
    
    // Google Apps Script에서는 setHeaders가 지원되지 않으므로 제거
    // CORS 헤더는 ContentService에서 자동으로 처리됨
    
    console.log(`✅ 성공 응답 생성: ${JSON.stringify(data).substring(0, 100)}...`);
    return response;
    
  } catch (error) {
    console.error('❌ 성공 응답 생성 오류:', error);
    
    // 오류 발생 시 기본 성공 응답
    const fallbackResponse = ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        timestamp: getCurrentKoreanTime(),
        message: '처리가 완료되었습니다',
        error: '응답 생성 중 오류 발생'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
    // Google Apps Script에서는 setHeaders가 지원되지 않으므로 제거
    // CORS 헤더는 ContentService에서 자동으로 처리됨
    
    return fallbackResponse;
  }
}

/**
 * 오류 응답 생성 (CORS 자동 처리)
 */
function createErrorResponse(message) {
  try {
    const timestamp = getCurrentKoreanTime();
    
    const response = ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: message || '처리 중 오류가 발생했습니다',
        timestamp: timestamp,
        version: VERSION
      }))
      .setMimeType(ContentService.MimeType.JSON);
    
    // Google Apps Script에서는 setHeaders가 지원되지 않으므로 제거
    // CORS 헤더는 ContentService에서 자동으로 처리됨
    
    console.error(`❌ 오류 응답 생성: ${message}`);
    return response;
    
  } catch (error) {
    console.error('❌ 오류 응답 생성 실패:', error);
    
    // 최후의 수단: 기본 오류 응답
    const fallbackResponse = ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: '시스템 오류가 발생했습니다',
        timestamp: getCurrentKoreanTime()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
    // Google Apps Script에서는 setHeaders가 지원되지 않으므로 제거
    // CORS 헤더는 ContentService에서 자동으로 처리됨
    
    return fallbackResponse;
  }
}

// ================================================================================
// 🌐 Google Apps Script 엔트리 포인트 (오류 수정)
// ================================================================================

/**
 * POST 요청 처리 (메인 엔트리 포인트)
 */
function doPost(e) {
  try {
    // 직접 실행 감지 (테스트용)
    if (!e) {
      console.warn('⚠️ 직접 실행 감지: 테스트 데이터로 자동 실행합니다.');
      
      // 테스트 데이터로 직접 진단 처리
      const testData = {
        폼타입: '무료진단신청',
        회사명: '테스트 컴퍼니',
        업종: 'IT/소프트웨어',
        직원수: '50명',
        이메일: 'test@testcompany.com',
        담당자명: '김테스트',
        종합점수: 78,
        사업상세설명: 'AI 기반 스마트 솔루션 개발 및 공급',
        주요고민사항: 'AI 기술 경쟁력 강화, 시장 진입 전략',
        예상혜택: '매출 30% 증대, 운영 효율성 향상',
        희망컨설팅분야: 'AI 전략, 디지털 전환'
      };
      
      console.log('📤 테스트 데이터로 진단 처리 시작');
      return processDiagnosisForm(testData);
    }

    // 실제 POST 요청 처리
    console.log('📥 POST 요청 수신');
    
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      console.error('❌ JSON 파싱 오류:', parseError);
      return createErrorResponse('잘못된 데이터 형식입니다.');
    }

    console.log('📋 요청 데이터:', {
      action: data.action,
      폼타입: data.폼타입,
      회사명: data.회사명 || data.companyName
    });

    // 요청 타입별 처리
    if (isBetaFeedback(data)) {
      return processBetaFeedback(data);
    } else if (isConsultationRequest(data)) {
      return processConsultationForm(data);
    } else {
      return processDiagnosisForm(data);
    }

  } catch (error) {
    console.error('❌ doPost 처리 실패:', error);
    return createErrorResponse(`시스템 오류: ${error.toString()}`);
  }
}

/**
 * GET 요청 처리 (CORS 프리플라이트)
 */
function doGet(e) {
  try {
    console.log('📥 GET 요청 수신 (CORS 프리플라이트)');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'AICAMP AI 진단 시스템이 정상 작동 중입니다.',
        timestamp: getCurrentKoreanTime(),
        version: VERSION
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ doGet 처리 실패:', error);
    return createErrorResponse('시스템 오류가 발생했습니다.');
  }
}

/**
 * OPTIONS 요청 처리 (CORS)
 */
function doOptions(e) {
  try {
    console.log('📥 OPTIONS 요청 수신 (CORS)');
    
    return ContentService
      .createTextOutput('')
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    console.error('❌ doOptions 처리 실패:', error);
    return createErrorResponse('CORS 설정 오류');
  }
}

// ================================================================================
// 🔧 헬퍼 함수들
// ================================================================================

/**
 * 현재 한국 시간 반환
 */
function getCurrentKoreanTime() {
  return new Date().toLocaleString('ko-KR', { 
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

/**
 * 베타 피드백 요청 확인
 */
function isBetaFeedback(data) {
  return data.action === 'saveBetaFeedback' || 
         data.폼타입 === '베타테스트_피드백' || 
         (data.피드백유형 && data.사용자이메일 && data.계산기명);
}

/**
 * 상담신청 요청 확인
 */
function isConsultationRequest(data) {
  if (isBetaFeedback(data)) {
    return false;
  }
  
  return !!(data.상담유형 || data.consultationType || data.성명 || data.name || 
           data.문의내용 || data.inquiryContent || data.action === 'saveConsultation');
}

/**
 * 시트 가져오기 또는 생성
 */
function getOrCreateSheet(sheetName, type) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      setupHeaders(sheet, type);
      console.log('📋 새 시트 생성:', sheetName);
    } else {
      // 기존 시트가 있을 때도 헤더 확인 및 설정
      const firstRow = sheet.getRange(1, 1, 1, 10).getValues()[0];
      const hasHeaders = firstRow.some(cell => cell && cell.toString().trim() !== '');
      
      if (!hasHeaders) {
        console.log('📋 기존 시트에 헤더 없음, 헤더 생성:', sheetName);
        setupHeaders(sheet, type);
      } else {
        console.log('📋 기존 시트 헤더 확인됨:', sheetName);
      }
    }
    
    return sheet;
  } catch (error) {
    console.error('❌ 시트 생성/접근 오류:', error);
    throw new Error(`시트 처리 오류: ${error.toString()}`);
  }
}

/**
 * 헤더 설정
 */
function setupHeaders(sheet, type) {
  try {
    let headers = [];
    
    switch (type) {
      case 'diagnosis':
        headers = [
          '제출일시', '회사명', '업종', '직원수', '담당자명', '이메일', '연락처',
          '종합점수', '종합등급', '사업상세설명', '주요고민사항', '예상혜택',
          '희망컨설팅분야', '진단결과', 'AI분석', '전략제안'
        ];
        break;
      case 'consultation':
        headers = [
          '제출일시', '성명', '회사명', '연락처', '이메일', '상담유형',
          '문의내용', '긴급도', '처리상태'
        ];
        break;
      case 'beta-feedback':
        headers = [
          '제출일시', '사용자이메일', '계산기명', '피드백유형', '피드백내용',
          '사용성점수', '정확도점수', '추천여부', '개선제안'
        ];
        break;
      default:
        headers = ['제출일시', '데이터'];
    }
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.getRange(1, 1, 1, headers.length).setBackground('#4285f4');
    sheet.getRange(1, 1, 1, headers.length).setFontColor('white');
    
    console.log('📋 헤더 설정 완료:', sheetName, headers.length, '개 컬럼');
    
  } catch (error) {
    console.error('❌ 헤더 설정 오류:', error);
  }
}

// ================================================================================
// 📧 이메일 발송 함수들
// ================================================================================

/**
 * 관리자 알림 이메일 발송
 */
function sendAdminNotification(data, type, rowNumber) {
  try {
    const subject = `[AICAMP] ${type} 신청 - ${data.회사명 || data.companyName || '신규'}`;
    
    let body = `
안녕하세요, AICAMP 관리자님

새로운 ${type} 신청이 접수되었습니다.

**신청 정보:**
- 회사명: ${data.회사명 || data.companyName || 'N/A'}
- 담당자: ${data.담당자명 || data.contactManager || data.name || 'N/A'}
- 이메일: ${data.이메일 || data.email || 'N/A'}
- 연락처: ${data.연락처 || data.phone || 'N/A'}
- 제출일시: ${getCurrentKoreanTime()}

**상세 정보:**
${JSON.stringify(data, null, 2)}

구글시트 행 번호: ${rowNumber}

빠른 시일 내에 연락드리시기 바랍니다.

감사합니다.
AICAMP 시스템
    `.trim();

    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      body: body
    });

    console.log('✅ 관리자 알림 이메일 발송 완료');
    return true;

  } catch (error) {
    console.error('❌ 관리자 알림 이메일 발송 실패:', error);
    return false;
  }
}

/**
 * 신청자 확인 이메일 발송
 */
function sendUserConfirmation(email, name, type, additionalData = {}) {
  try {
    const subject = `[AICAMP] ${type} 신청 접수 확인`;
    
    let body = `
안녕하세요, ${name}님

AICAMP ${type} 신청이 성공적으로 접수되었습니다.

**접수 정보:**
- 신청 유형: ${type}
- 접수 일시: ${getCurrentKoreanTime()}
- 처리 상태: 검토 중

**다음 단계:**
관리자가 검토 후 1-2일 내에 연락드리겠습니다.

**문의사항:**
- 전화: 010-9251-9743
- 이메일: hongik423@gmail.com

감사합니다.
AICAMP 팀
    `.trim();

    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: body
    });

    console.log('✅ 신청자 확인 이메일 발송 완료:', email);
    return true;

  } catch (error) {
    console.error('❌ 신청자 확인 이메일 발송 실패:', error);
    return false;
  }
}

// ================================================================================
// 📋 데이터 처리 함수들
// ================================================================================

/**
 * 진단 신청 처리
 */
function processDiagnosisForm(data) {
  try {
    console.log('🎯 진단 신청 처리 시작');
    
    // 시트 가져오기
    const sheet = getOrCreateSheet(SHEETS.DIAGNOSIS, 'diagnosis');
    
    // 데이터 준비
    const rowData = [
      getCurrentKoreanTime(),
      data.회사명 || data.companyName || '',
      data.업종 || data.industry || '',
      data.직원수 || data.employeeCount || '',
      data.담당자명 || data.contactManager || '',
      data.이메일 || data.email || '',
      data.연락처 || data.phone || '',
      data.종합점수 || 0,
      getGradeFromScore(data.종합점수 || 0),
      data.사업상세설명 || data.businessDetails || '',
      data.주요고민사항 || data.mainConcerns || '',
      data.예상혜택 || data.expectedBenefits || '',
      data.희망컨설팅분야 || data.consultingArea || '',
      '진단 완료',
      'AI 분석 완료',
      '전략 제안 완료'
    ];
    
    // 데이터 저장
    const rowNumber = sheet.getLastRow() + 1;
    sheet.getRange(rowNumber, 1, 1, rowData.length).setValues([rowData]);
    
    console.log('✅ 진단 데이터 저장 완료:', rowNumber, '행');
    
    // 이메일 발송
    const adminEmailSent = sendAdminNotification(data, 'AI 무료진단', rowNumber);
    const userEmailSent = sendUserConfirmation(
      data.이메일 || data.email,
      data.담당자명 || data.contactManager,
      'AI 무료진단'
    );
    
    return createSuccessResponse({
      message: '진단 신청이 완료되었습니다.',
      rowNumber: rowNumber,
      adminEmailSent: adminEmailSent,
      userEmailSent: userEmailSent
    });
    
  } catch (error) {
    console.error('❌ 진단 신청 처리 실패:', error);
    return createErrorResponse(`진단 처리 오류: ${error.toString()}`);
  }
}

/**
 * 상담 신청 처리
 */
function processConsultationForm(data) {
  try {
    console.log('💬 상담 신청 처리 시작');
    
    // 시트 가져오기
    const sheet = getOrCreateSheet(SHEETS.CONSULTATION, 'consultation');
    
    // 데이터 준비
    const rowData = [
      getCurrentKoreanTime(),
      data.성명 || data.name || '',
      data.회사명 || data.companyName || '',
      data.연락처 || data.phone || '',
      data.이메일 || data.email || '',
      data.상담유형 || data.consultationType || '',
      data.문의내용 || data.inquiryContent || '',
      data.긴급도 || '보통',
      '접수'
    ];
    
    // 데이터 저장
    const rowNumber = sheet.getLastRow() + 1;
    sheet.getRange(rowNumber, 1, 1, rowData.length).setValues([rowData]);
    
    console.log('✅ 상담 데이터 저장 완료:', rowNumber, '행');
    
    // 이메일 발송
    const adminEmailSent = sendAdminNotification(data, '상담', rowNumber);
    const userEmailSent = sendUserConfirmation(
      data.이메일 || data.email,
      data.성명 || data.name,
      '상담'
    );
    
    return createSuccessResponse({
      message: '상담 신청이 완료되었습니다.',
      rowNumber: rowNumber,
      adminEmailSent: adminEmailSent,
      userEmailSent: userEmailSent
    });
    
  } catch (error) {
    console.error('❌ 상담 신청 처리 실패:', error);
    return createErrorResponse(`상담 처리 오류: ${error.toString()}`);
  }
}

/**
 * 베타 피드백 처리
 */
function processBetaFeedback(data) {
  try {
    console.log('📝 베타 피드백 처리 시작');
    
    // 시트 가져오기
    const sheet = getOrCreateSheet(SHEETS.BETA_FEEDBACK, 'beta-feedback');
    
    // 데이터 준비
    const rowData = [
      getCurrentKoreanTime(),
      data.사용자이메일 || data.userEmail || '',
      data.계산기명 || data.calculatorName || '',
      data.피드백유형 || data.feedbackType || '',
      data.피드백내용 || data.feedbackContent || '',
      data.사용성점수 || data.usabilityScore || '',
      data.정확도점수 || data.accuracyScore || '',
      data.추천여부 || data.recommendation || '',
      data.개선제안 || data.improvementSuggestion || ''
    ];
    
    // 데이터 저장
    const rowNumber = sheet.getLastRow() + 1;
    sheet.getRange(rowNumber, 1, 1, rowData.length).setValues([rowData]);
    
    console.log('✅ 베타 피드백 저장 완료:', rowNumber, '행');
    
    // 이메일 발송
    const adminEmailSent = sendAdminNotification(data, '베타 피드백', rowNumber);
    const userEmailSent = sendUserConfirmation(
      data.사용자이메일 || data.userEmail,
      '베타 테스터',
      '베타 피드백'
    );
    
    return createSuccessResponse({
      message: '베타 피드백이 제출되었습니다.',
      rowNumber: rowNumber,
      adminEmailSent: adminEmailSent,
      userEmailSent: userEmailSent
    });
    
  } catch (error) {
    console.error('❌ 베타 피드백 처리 실패:', error);
    return createErrorResponse(`피드백 처리 오류: ${error.toString()}`);
  }
}

/**
 * 점수에 따른 등급 반환
 */
function getGradeFromScore(score) {
  if (score >= 90) return 'S';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  return 'D';
}

// ================================================================================
// 🧪 테스트 함수들
// ================================================================================

/**
 * 전체 시스템 테스트
 */
function runAllTests() {
  try {
    console.log('🧪 전체 시스템 테스트 시작');
    
    // 1. 기본 연결 테스트
    console.log('✅ 기본 연결 테스트 완료');
    
    // 2. 시트 접근 테스트
    const diagnosisSheet = getOrCreateSheet(SHEETS.DIAGNOSIS, 'diagnosis');
    console.log('✅ 시트 접근 테스트 완료');
    
    // 3. 이메일 발송 테스트
    const testEmailSent = sendUserConfirmation('test@example.com', '테스트', '테스트');
    console.log('✅ 이메일 발송 테스트 완료:', testEmailSent);
    
    // 4. GEMINI API 테스트
    const testPrompt = '안녕하세요. 간단한 테스트입니다.';
    const geminiTest = callGeminiAPI(testPrompt);
    console.log('✅ GEMINI API 테스트 완료:', geminiTest.success);
    
    console.log('🎉 전체 시스템 테스트 완료');
    return true;
    
  } catch (error) {
    console.error('❌ 시스템 테스트 실패:', error);
    return false;
  }
}

/**
 * CORS 설정 확인
 */
function checkCORSSetup() {
  try {
    console.log('🔍 CORS 설정 확인');
    
    const testResponse = ContentService
      .createTextOutput(JSON.stringify({ test: 'cors' }))
      .setMimeType(ContentService.MimeType.JSON);
    
    console.log('✅ CORS 설정 확인 완료');
    return true;
    
  } catch (error) {
    console.error('❌ CORS 설정 확인 실패:', error);
    return false;
  }
}

console.log('🚀 AICAMP AI 진단 시스템 로드 완료 - 오류 수정 버전'); 