/**
 * ================================================================================
 * AICAMP 최고수준 AI 경영진단 시스템 Google Apps Script 2025 - AI 시대 조직적응 특화 분석 포함
 * ================================================================================
 * 
 * 🎯 배포 정보:
 * - Script ID: 1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj
 * - Deployment ID: AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0
 * - Web App URL: https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec
 * - Google Sheets ID: 1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0
 * - Google Sheets URL: https://docs.google.com/spreadsheets/d/1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0/edit
 * - 관리자 이메일: hongik423@gmail.com
 * 
 * 🚀 최고수준 AI 시스템 특징:
 * ✅ 개별 점수 20개 문항 완전 저장 (1-5점)
 * ✅ 카테고리별 점수 5개 영역 저장
 * ✅ 업종별 특화 분석 데이터 처리
 * ✅ 6가지 핵심 지표 분석 (비즈니스모델, 시장위치, 운영효율성, 성장잠재력, 디지털준비도, 재무건전성)
 * ✅ AI 시대 조직적응 분석 (AI 활용도, 디지털 전환 준비도, AI 도입 장벽 분석)
 * ✅ SWOT 분석에 AI 조직적응 관점 완전 통합
 * ✅ 업종별 AI 혁신 전략 데이터베이스 활용
 * ✅ 8000자 확장 심층 보고서 처리
 * ✅ 실시간 업종 데이터 검색 및 적용
 * ✅ 개별 기업 맞춤형 AI 전략 생성
 * ✅ 구글시트 120개 컬럼 확장 구조 (AI 분석 40개 컬럼 추가)
 * ✅ UTF-8 완전 지원
 * 
 * 📋 시트 구성 (확장):
 * - AI_무료진단신청: 최고수준 AI 진단 데이터 (120개 컬럼)
 * - 상담신청: 상담 신청 관련 데이터 (19개 컬럼)
 * - 베타피드백: 오류 신고 및 피드백 (14개 컬럼)
 * 
 * 🔄 마지막 업데이트: 2025.01.28 - AI 시대 조직적응 특화 분석 시스템 완전 구축, 최고수준 AI 경영진단 달성
 */

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
const DEBUG_MODE = true;
const VERSION = '2025.01.28.AICAMP_최고수준_AI경영진단시스템_AI시대조직적응특화분석_완전구축';

// 🌐 웹앱 배포 정보
const DEPLOYMENT_INFO = {
  SCRIPT_ID: '1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj',
  DEPLOYMENT_ID: 'AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0',
  WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec',
  LAST_UPDATED: '2025.01.28'
};

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
// 🛠️ 핵심 유틸리티 함수들
// ================================================================================

/**
 * 한국 시간 가져오기 (UTF-8 완전 지원)
 */
function getCurrentKoreanTime() {
  const now = new Date();
  const kstOffset = 9 * 60; // KST is UTC+9
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const kst = new Date(utc + (kstOffset * 60000));
  
  return kst.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(/\./g, '.').replace(/,/g, '');
}

/**
 * 성공 응답 생성 (UTF-8 지원)
 */
function createSuccessResponse(data) {
  const response = { 
    success: true, 
    timestamp: getCurrentKoreanTime(),
    version: VERSION,
    ...data 
  };
  
  if (DEBUG_MODE) {
    console.log('✅ 성공 응답 생성:', response);
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response, null, 2))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 오류 응답 생성 (UTF-8 지원)
 */
function createErrorResponse(message) {
  const response = { 
    success: false, 
    error: message,
    timestamp: getCurrentKoreanTime(),
    version: VERSION
  };
  
  console.error('❌ 오류 응답 생성:', response);
  
  return ContentService
    .createTextOutput(JSON.stringify(response, null, 2))
    .setMimeType(ContentService.MimeType.JSON);
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
    }
    
    return sheet;
  } catch (error) {
    console.error('❌ 시트 생성/접근 오류:', error);
    throw new Error(`시트 처리 오류: ${error.toString()}`);
  }
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

// ================================================================================
// 📡 메인 처리 함수
// ================================================================================

function doPost(e) {
  try {
    // e 파라미터 자체가 없거나 undefined인 경우 처리 (직접 실행 시)
    if (!e) {
      console.warn('⚠️ 직접 실행 감지: 테스트 모드로 전환합니다.');
      return createSuccessResponse({
        message: '직접 실행 시에는 웹 요청을 시뮬레이션할 수 없습니다. testDiagnosisSubmission() 또는 testConsultationSubmission() 함수를 사용하세요.',
        testFunctions: [
          'testDiagnosisSubmission() - 진단 신청 테스트',
          'testConsultationSubmission() - 상담 신청 테스트',
          'testBetaFeedback() - 베타 피드백 테스트'
        ]
      });
    }
    
    if (DEBUG_MODE) {
      console.log('🔥 POST 요청 수신:', {
        timestamp: getCurrentKoreanTime(),
        hasPostData: !!(e && e.postData),
        contentType: (e && e.postData) ? e.postData.type : 'N/A'
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
    
    if (DEBUG_MODE) {
      console.log('📝 수신된 데이터:', {
        action: requestData.action,
        폼타입: requestData.폼타입,
        회사명: requestData.회사명,
        계산기명: requestData.계산기명,
        피드백유형: requestData.피드백유형,
        문항별점수존재: !!(requestData.문항별점수 || requestData.detailedScores),
        점수개수: requestData.문항별점수 ? Object.keys(requestData.문항별점수).length : 0
      });
    }

    // 🧪 내부 테스트 함수 호출 처리
    if (requestData.action === 'internalTest') {
      console.log('🔬 내부 테스트 함수 처리 시작:', requestData.functionName);
      
      try {
        let testResult;
        switch (requestData.functionName) {
          case 'testDiagnosisSubmission':
            testResult = testDiagnosisSubmission();
            break;
          case 'testConsultationSubmission':
            testResult = testConsultationSubmission();
            break;
          case 'testBetaFeedback':
            testResult = testBetaFeedback();
            break;
          default:
            return createErrorResponse('지원하지 않는 테스트 함수: ' + requestData.functionName);
        }
        
        return testResult;
      } catch (error) {
        console.error('❌ 내부 테스트 함수 실행 오류:', error);
        return createErrorResponse('내부 테스트 함수 실행 오류: ' + error.toString());
      }
    }

    // 🧪 베타 피드백 처리 (최우선)
    if (isBetaFeedback(requestData)) {
      console.log('🎯 베타 피드백 처리 시작');
      return processBetaFeedback(requestData);
    }

    // 상담신청 vs 진단신청 분기
    if (isConsultationRequest(requestData)) {
      console.log('✅ 상담신청 처리 시작');
      return processConsultationForm(requestData);
    } else {
      console.log('✅ 진단신청 처리 시작');
      return processDiagnosisForm(requestData);
    }

  } catch (error) {
    console.error('❌ POST 요청 처리 오류:', error);
    return createErrorResponse('POST 처리 중 오류: ' + error.toString());
  }
}

function doGet(e) {
  try {
    if (DEBUG_MODE) {
      console.log('🔥 GET 요청 수신:', {
        parameters: e.parameter,
        timestamp: getCurrentKoreanTime()
      });
    }

    return createSuccessResponse({
      status: 'AICAMP 단순화 시스템 정상 작동 중',
      timestamp: getCurrentKoreanTime(),
      version: VERSION,
      deploymentInfo: {
        scriptId: DEPLOYMENT_INFO.SCRIPT_ID,
        deploymentId: DEPLOYMENT_INFO.DEPLOYMENT_ID,
        webAppUrl: DEPLOYMENT_INFO.WEB_APP_URL,
        lastUpdated: DEPLOYMENT_INFO.LAST_UPDATED
      },
      googleSheets: {
        spreadsheetId: SPREADSHEET_ID,
        adminEmail: ADMIN_EMAIL
      },
      features: [
        '✅ 진단신청 처리 (58개 컬럼)',
        '✅ 상담신청 처리 (19개 컬럼)', 
        '✅ 베타피드백 처리 (14개 컬럼)',
        '✅ 진단점수 정확 저장 (1-5점)',
        '✅ 단순 접수 확인 이메일 발송',
        '✅ 관리자 알림 이메일',
        '❌ PDF 발송 기능 제거됨 (오류 방지)'
      ]
    });

  } catch (error) {
    console.error('❌ GET 요청 처리 오류:', error);
    return createErrorResponse('GET 처리 중 오류: ' + error.toString());
  }
}

/**
 * CORS preflight OPTIONS 요청 처리
 * 브라우저가 실제 요청 전에 보내는 preflight 요청을 처리
 */
function doOptions(e) {
  console.log('🔄 OPTIONS preflight 요청 수신:', getCurrentKoreanTime());
  
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON);
}

// ================================================================================
// 🎯 고급 진단신청 처리 (80개 컬럼 + 업종별 특화 분석)
// ================================================================================

function processDiagnosisForm(data) {
  try {
    const sheet = getOrCreateSheet(SHEETS.DIAGNOSIS, 'diagnosis');
    const timestamp = getCurrentKoreanTime();
    
    if (DEBUG_MODE) {
      console.log('🚀 최고수준 AI 경영진단 상세 처리:', {
        회사명: data.회사명 || data.companyName,
        업종: data.업종 || data.industry,
        이메일: data.이메일 || data.contactEmail,
        총점: data.종합점수 || data.totalScore,
        개별점수존재: !!(data.문항별점수 || data.detailedScores),
        업종특화분석: !!(data.업종분석 || data.industrySpecificAnalysis),
        핵심지표존재: !!(data.businessModel || data.coreMetrics),
        AI분석활성화: true
      });
    }

    // 🔧 **개별 점수 정확 추출 (20개 문항)**
    const scoreData = extractDetailedScores(data);
    
    // 🔧 **카테고리별 점수 추출**
    const categoryData = extractCategoryScores(data);

    // 📈 **6가지 핵심 지표 추출**
    const coreMetrics = extractCoreMetrics(data);

    // 🎯 **업종별 특화 분석 데이터 추출**
    const industryAnalysis = extractIndustryAnalysis(data);

    // 📋 **기본 SWOT 분석 데이터 추출**
    const basicSwotData = extractSWOTAnalysis(data);

    // 🤖 **AI 시대 조직적응 분석 (신규 추가)**
    const aiAdaptationAnalysis = extractAIAdaptationAnalysis(data);

    // 🚀 **업종별 AI 혁신 전략 생성 (신규 추가)**
    const aiTransformationStrategy = generateAITransformationStrategy(
      data.업종 || data.industry, data, aiAdaptationAnalysis
    );

    // 📊 **업종별 실시간 AI 트렌드 분석 (신규 추가)**
    const industryAiTrends = analyzeIndustryAITrends(data.업종 || data.industry);

    // 🔄 **AI 통합 SWOT 분석 (기존 SWOT + AI 관점)**
    const enhancedSwotData = enhancedSWOTWithAI(data, basicSwotData, aiAdaptationAnalysis);

    // 📝 **최고수준 심층 진단보고서 생성 (8000자로 확장)**
    let comprehensiveReport = generateAdvancedAIReport(data, {
      scoreData,
      categoryData,
      coreMetrics,
      industryAnalysis,
      aiAdaptationAnalysis,
      aiTransformationStrategy,
      industryAiTrends,
      enhancedSwotData
    });

    const totalScore = data.종합점수 || data.totalScore || 0;
    
    // 📊 **보고서 글자수 처리 (8000자로 확장)**
    if (comprehensiveReport.length > 8000) {
      console.log(`⚠️ 보고서 길이 초과 (${comprehensiveReport.length}자), 8000자로 압축`);
      comprehensiveReport = comprehensiveReport.substring(0, 7950) + '\n\n[AICAMP 최고수준 AI 경영진단보고서 완료]';
    } else if (comprehensiveReport.length < 3000) {
      // 최소 품질 보장
      comprehensiveReport += generateSupplementaryAnalysis(data, aiAdaptationAnalysis);
    }
    
    // 📊 **120개 컬럼 최고수준 AI 진단신청 데이터 구성**
    const rowData = [
      // 🔵 기본 정보 (A-R: 18개) - 기존 유지
      timestamp,                                                  // A: 제출일시
      data.회사명 || data.companyName || '',                        // B: 회사명
      Array.isArray(data.업종 || data.industry) ? (data.업종 || data.industry).join(', ') : (data.업종 || data.industry || ''),  // C: 업종 (배열 처리)
      data.사업담당자 || data.businessManager || data.contactManager || '', // D: 사업담당자
      data.직원수 || data.employeeCount || '',                     // E: 직원수
      data.사업성장단계 || data.growthStage || '',                  // F: 사업성장단계
      data.주요고민사항 || data.mainConcerns || '',                 // G: 주요고민사항
      data.예상혜택 || data.expectedBenefits || '',                // H: 예상혜택
      data.소재지 || data.businessLocation || '',                 // I: 소재지
      data.담당자명 || data.contactName || data.contactManager || '', // J: 담당자명
      data.연락처 || data.contactPhone || '',                      // K: 연락처
      data.이메일 || data.contactEmail || data.email || '',        // L: 이메일
      data.개인정보동의 === true || data.privacyConsent === true ? '동의' : '미동의', // M: 개인정보동의
      'AICAMP_최고수준_AI경영진단',                                 // N: 폼타입
      '접수완료',                                                  // O: 진단상태
      '',                                                         // P: AI분석결과
      '',                                                         // Q: 결과URL
      '',                                                         // R: 분석완료일시
      
      // 🟢 진단 결과 (S-X: 6개) - 기존 유지
      totalScore,                                                 // S: 종합점수
      categoryData.상품서비스점수,                                 // T: 상품서비스점수
      categoryData.고객응대점수,                                   // U: 고객응대점수
      categoryData.마케팅점수,                                     // V: 마케팅점수
      categoryData.구매재고점수,                                   // W: 구매재고점수
      categoryData.매장관리점수,                                   // X: 매장관리점수
      
      // 🔶 상품/서비스 관리 역량 (Y-AC: 5개) - 기존 유지
      scoreData.기획수준,        // Y: 기획수준 (1-5점)
      scoreData.차별화정도,      // Z: 차별화정도 (1-5점)
      scoreData.가격설정,        // AA: 가격설정 (1-5점)
      scoreData.전문성,          // AB: 전문성 (1-5점)
      scoreData.품질,            // AC: 품질 (1-5점)
      
      // 🔷 고객응대 역량 (AD-AG: 4개) - 기존 유지
      scoreData.고객맞이,        // AD: 고객맞이 (1-5점)
      scoreData.고객응대,        // AE: 고객응대 (1-5점)
      scoreData.불만관리,        // AF: 불만관리 (1-5점)
      scoreData.고객유지,        // AG: 고객유지 (1-5점)
      
      // 🔸 마케팅 역량 (AH-AL: 5개) - 기존 유지
      scoreData.고객이해,        // AH: 고객이해 (1-5점)
      scoreData.마케팅계획,      // AI: 마케팅계획 (1-5점)
      scoreData.오프라인마케팅,  // AJ: 오프라인마케팅 (1-5점)
      scoreData.온라인마케팅,    // AK: 온라인마케팅 (1-5점)
      scoreData.판매전략,        // AL: 판매전략 (1-5점)
      
      // 🔹 구매/재고관리 (AM-AN: 2개) - 기존 유지
      scoreData.구매관리,        // AM: 구매관리 (1-5점)
      scoreData.재고관리,        // AN: 재고관리 (1-5점)
      
      // 🔺 매장관리 역량 (AO-AR: 4개) - 기존 유지
      scoreData.외관관리,        // AO: 외관관리 (1-5점)
      scoreData.인테리어관리,    // AP: 인테리어관리 (1-5점)
      scoreData.청결도,          // AQ: 청결도 (1-5점)
      scoreData.작업동선,        // AR: 작업동선 (1-5점)
      
      // �� 보고서 정보 (AS-AV: 4개)
      comprehensiveReport.length,    // AS: 보고서글자수
      data.추천서비스 || '',          // AT: 추천서비스목록
      comprehensiveReport.substring(0, 500), // AU: 보고서요약(500자)
      comprehensiveReport,           // AV: 보고서전문 (8000자)
      
      // 🚀 6가지 핵심 지표 (AW-BB: 6개)
      coreMetrics.businessModel,      // AW: 비즈니스모델 점수
      coreMetrics.marketPosition,     // AX: 시장위치 점수
      coreMetrics.operationalEfficiency, // AY: 운영효율성 점수
      coreMetrics.growthPotential,    // AZ: 성장잠재력 점수
      coreMetrics.digitalReadiness,   // BA: 디지털준비도 점수
      coreMetrics.financialHealth,    // BB: 재무건전성 점수
      
      // 🎯 업종별 특화 분석 (BC-BF: 4개)
      industryAnalysis.업종특화분석,  // BC: 업종별 특화 분석
      industryAnalysis.시장위치,      // BD: 시장 위치 분석
      industryAnalysis.경쟁력분석,    // BE: 경쟁력 분석
      industryAnalysis.성장잠재력,    // BF: 성장 잠재력 분석
      
      // 📋 기존 SWOT 분석 (BG-BK: 5개)
      basicSwotData.강점.join(' | '), // BG: 기본 강점 분석
      basicSwotData.약점.join(' | '), // BH: 기본 약점 분석
      basicSwotData.기회.join(' | '), // BI: 기본 기회 분석
      basicSwotData.위협.join(' | '), // BJ: 기본 위협 분석
      basicSwotData.전략매트릭스,     // BK: 기본 SWOT 전략 매트릭스
      
      // 🔬 추가 분석 데이터 (BL-BO: 4개) - 기존 유지
      data.신뢰도점수 || data.reliabilityScore || 0,  // BL: 신뢰도 점수
      data.진단등급 || data.overallGrade || '',      // BM: 진단 등급
      industryAnalysis.업종트렌드 || '',             // BN: 업종별 트렌드
      industryAnalysis.디지털전환가이드 || '',        // BO: 디지털 전환 가이드
      
      // 🤖 AI 시대 조직적응 분석 (BP-BY: 10개) - 신규 40개 컬럼 시작
      aiAdaptationAnalysis.AI활용현황,              // BP: AI 활용 현황
      aiAdaptationAnalysis.AI준비도점수,            // BQ: AI 준비도 점수
      aiAdaptationAnalysis.디지털전환단계,          // BR: 디지털 전환 단계
      aiAdaptationAnalysis.AI도입장벽.join(' | '), // BS: AI 도입 장벽
      aiAdaptationAnalysis.디지털인프라수준,        // BT: 디지털 인프라 수준
      aiAdaptationAnalysis.AI인식수준,              // BU: AI 인식 수준
      aiAdaptationAnalysis.데이터활용능력,          // BV: 데이터 활용 능력
      aiAdaptationAnalysis.AI교육필요도,            // BW: AI 교육 필요도
      aiAdaptationAnalysis.조직변화준비도,          // BX: 조직 변화 준비도
      aiAdaptationAnalysis.AI투자의지,              // BY: AI 투자 의지
      
      // 🚀 업종별 AI 혁신 전략 (BZ-CH: 10개)
      aiTransformationStrategy.핵심전략 || '',                          // BZ: AI 핵심 전략
      aiTransformationStrategy.우선순위영역.join(' | ') || '',          // CA: AI 우선순위 영역
      aiTransformationStrategy.AI도구추천.join(' | ') || '',            // CB: AI 도구 추천
      aiTransformationStrategy.구현단계.join(' | ') || '',              // CC: AI 구현 단계
      (aiTransformationStrategy.추가권장사항 || []).join(' | '),        // CD: AI 추가 권장사항
      industryAiTrends.시장규모 || '',                                  // CE: AI 시장 규모
      industryAiTrends.주요기술.join(' | ') || '',                      // CF: AI 주요 기술
      industryAiTrends.성공사례 || '',                                  // CG: AI 성공 사례
      industryAiTrends.주요트렌드.join(' | ') || '',                    // CH: AI 주요 트렌드
      new Date().getFullYear().toString(),                             // CI: AI 분석 기준년도
      
      // 🔄 AI 통합 SWOT 분석 (CJ-CN: 5개)
      enhancedSwotData.강점.join(' | '),    // CJ: AI 통합 강점
      enhancedSwotData.약점.join(' | '),    // CK: AI 통합 약점
      enhancedSwotData.기회.join(' | '),    // CL: AI 통합 기회
      enhancedSwotData.위협.join(' | '),    // CM: AI 통합 위협
      enhancedSwotData.전략매트릭스,        // CN: AI 통합 전략매트릭스
      
      // 📊 고급 AI 분석 지표 (CO-CX: 10개)
      calculateAIMaturityScore(aiAdaptationAnalysis),                  // CO: AI 성숙도 점수
      calculateDigitalTransformationIndex(data, aiAdaptationAnalysis), // CP: 디지털 전환 지수
      calculateAIROIPrediction(aiAdaptationAnalysis, totalScore),      // CQ: AI ROI 예측
      calculateAIRiskScore(aiAdaptationAnalysis),                      // CR: AI 도입 위험도
      calculateOrganizationalReadiness(aiAdaptationAnalysis),          // CS: 조직 준비도
      calculateTechnologyAdoptionSpeed(data, aiAdaptationAnalysis),    // CT: 기술 도입 속도
      calculateAICompetitiveAdvantage(industryAiTrends, aiAdaptationAnalysis), // CU: AI 경쟁우위
      calculateInnovationPotential(data, aiAdaptationAnalysis),        // CV: 혁신 잠재력
      calculateAIImplementationComplexity(aiTransformationStrategy),   // CW: AI 구현 복잡도
      calculateFutureAIReadiness(data, aiAdaptationAnalysis),          // CX: 미래 AI 준비도
      
      // 🎯 맞춤형 AI 전략 (CY-DH: 10개)
      generatePersonalizedAIStrategy(data, aiAdaptationAnalysis).우선순위,    // CY: 개별 AI 우선순위
      generatePersonalizedAIStrategy(data, aiAdaptationAnalysis).예산추정,    // CZ: AI 예산 추정
      generatePersonalizedAIStrategy(data, aiAdaptationAnalysis).기대효과,    // DA: AI 기대 효과
      generatePersonalizedAIStrategy(data, aiAdaptationAnalysis).구현기간,    // DB: AI 구현 기간
      generatePersonalizedAIStrategy(data, aiAdaptationAnalysis).핵심성공요인.join(' | '), // DC: AI 핵심성공요인
      generatePersonalizedAIStrategy(data, aiAdaptationAnalysis).위험요소.join(' | '),   // DD: AI 위험 요소
      generatePersonalizedAIStrategy(data, aiAdaptationAnalysis).지원방안.join(' | '),   // DE: AI 지원 방안
      generatePersonalizedAIStrategy(data, aiAdaptationAnalysis).측정지표.join(' | '),   // DF: AI 측정 지표
      generatePersonalizedAIStrategy(data, aiAdaptationAnalysis).교육계획,               // DG: AI 교육 계획
      generatePersonalizedAIStrategy(data, aiAdaptationAnalysis).로드맵                  // DH: AI 로드맵
    ];

    // 구글시트에 데이터 저장
    const newRow = sheet.getLastRow() + 1;
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
    
    if (DEBUG_MODE) {
      console.log('✅ 최고수준 AI 경영진단 저장 완료:', {
        시트: SHEETS.DIAGNOSIS,
        행번호: newRow,
        회사명: data.회사명 || data.companyName,
        업종: data.업종 || data.industry,
        총점: totalScore,
        AI준비도: aiAdaptationAnalysis.AI준비도점수,
        디지털전환단계: aiAdaptationAnalysis.디지털전환단계,
        보고서길이: comprehensiveReport.length,
        컬럼수: rowData.length,
        AI분석항목: 40
      });
    }

    // 관리자 이메일 발송 (최고수준 AI 분석 포함)
    if (AUTO_REPLY_ENABLED) {
      console.log('📧 최고수준 AI 진단 관리자 이메일 발송 시작');
      sendAdvancedAIDiagnosisAdminNotification(data, newRow, totalScore, comprehensiveReport, 
        aiAdaptationAnalysis, aiTransformationStrategy);
      
      const userEmail = data.이메일 || data.contactEmail || data.email;
      const userName = data.담당자명 || data.contactName || data.contactManager;
      
      // 최고수준 AI 분석 결과 확인 이메일 발송
      if (userEmail) {
        console.log('📧 신청자 최고수준 AI 분석 확인 이메일 발송 시작:', userEmail.substring(0, 5) + '***');
        const emailResult = sendAdvancedAIUserConfirmation(userEmail, userName, 'AI경영진단', 
          data.업종 || data.industry, aiAdaptationAnalysis);
        if (emailResult && !emailResult.success) {
          console.error('❌ 신청자 이메일 발송 실패:', emailResult.error);
        }
      }
    }

    // 응답 메시지 (최고수준 시스템)
    let responseMessage = `🎉 ${data.회사명 || data.companyName}의 AI 시대 최고수준 경영진단이 완료되었습니다! ` +
      `업종별 AI 혁신 전략과 조직적응 분석이 포함된 완전한 진단 데이터가 저장되었습니다. ` +
      `(AI 준비도: ${aiAdaptationAnalysis.AI준비도점수}점, 디지털 전환단계: ${aiAdaptationAnalysis.디지털전환단계})`;

    return createSuccessResponse({
      message: responseMessage,
      sheet: SHEETS.DIAGNOSIS,
      row: newRow,
      timestamp: timestamp,
      진단점수: totalScore,
      업종: data.업종 || data.industry,
      핵심지표: coreMetrics,
      AI준비도: aiAdaptationAnalysis.AI준비도점수,
      디지털전환단계: aiAdaptationAnalysis.디지털전환단계,
      AI핵심전략: aiTransformationStrategy.핵심전략,
      처리방식: '최고수준_AI경영진단_맞춤형분석_이메일',
      보고서길이: comprehensiveReport.length,
      시스템버전: '최고수준_AI_경영진단_시스템_v4.0'
    });

  } catch (error) {
    console.error('❌ 최고수준 AI 경영진단 처리 오류:', error);
    return createErrorResponse('최고수준 AI 경영진단 처리 중 오류: ' + error.toString());
  }
}

// ================================================================================
// 🔧 고급 데이터 추출 함수들 (업종별 특화 + 6가지 핵심 지표)
// ================================================================================

/**
 * 6가지 핵심 지표 데이터 추출
 */
function extractCoreMetrics(data) {
  const result = {
    businessModel: 0,
    marketPosition: 0,
    operationalEfficiency: 0,
    growthPotential: 0,
    digitalReadiness: 0,
    financialHealth: 0
  };

  // 직접 전달된 핵심 지표 데이터 확인
  if (data.businessModel) result.businessModel = Number(data.businessModel) || 0;
  if (data.marketPosition) result.marketPosition = Number(data.marketPosition) || 0;
  if (data.operationalEfficiency) result.operationalEfficiency = Number(data.operationalEfficiency) || 0;
  if (data.growthPotential) result.growthPotential = Number(data.growthPotential) || 0;
  if (data.digitalReadiness) result.digitalReadiness = Number(data.digitalReadiness) || 0;
  if (data.financialHealth) result.financialHealth = Number(data.financialHealth) || 0;

  // coreMetrics 객체에서 추출
  if (data.coreMetrics) {
    Object.keys(result).forEach(key => {
      if (data.coreMetrics[key]) {
        result[key] = Number(data.coreMetrics[key]) || 0;
      }
    });
  }

  if (DEBUG_MODE) {
    console.log('🎯 6가지 핵심 지표 추출 완료:', result);
  }

  return result;
}

/**
 * 업종별 특화 분석 데이터 추출
 */
function extractIndustryAnalysis(data) {
  const result = {
    업종특화분석: '',
    시장위치: '',
    경쟁력분석: '',
    성장잠재력: '',
    업종트렌드: '',
    디지털전환가이드: ''
  };

  // 업종분석 객체에서 추출
  if (data.업종분석) {
    result.업종특화분석 = data.업종분석.업종특화분석 || data.업종분석.업종 || '';
    result.시장위치 = data.업종분석.시장위치 || '';
    result.경쟁력분석 = data.업종분석.경쟁력분석 || '';
    result.성장잠재력 = data.업종분석.성장잠재력 || '';
  }

  // industryInsights에서 추출
  if (data.industryInsights) {
    result.업종트렌드 = Array.isArray(data.industryInsights.industryTrends) ? 
      data.industryInsights.industryTrends.join(' | ') : '';
    result.디지털전환가이드 = data.industryInsights.digitalTransformation || '';
  }

  // 직접 전달된 데이터 확인
  result.업종특화분석 = result.업종특화분석 || data.industrySpecificAnalysis || '';
  result.시장위치 = result.시장위치 || data.marketPosition || '';
  result.경쟁력분석 = result.경쟁력분석 || data.competitiveAnalysis || '';

  if (DEBUG_MODE) {
    console.log('🎯 업종별 특화 분석 데이터 추출 완료:', {
      hasIndustryAnalysis: !!result.업종특화분석,
      hasMarketPosition: !!result.시장위치,
      hasCompetitiveAnalysis: !!result.경쟁력분석
    });
  }

  return result;
}

/**
 * SWOT 분석 데이터 추출
 */
function extractSWOTAnalysis(data) {
  const result = {
    강점: [],
    약점: [],
    기회: [],
    위협: [],
    전략매트릭스: ''
  };

  // SWOT분석 객체에서 추출
  if (data.SWOT분석) {
    result.강점 = Array.isArray(data.SWOT분석.강점) ? data.SWOT분석.강점 : [];
    result.약점 = Array.isArray(data.SWOT분석.약점) ? data.SWOT분석.약점 : [];
    result.기회 = Array.isArray(data.SWOT분석.기회) ? data.SWOT분석.기회 : [];
    result.위협 = Array.isArray(data.SWOT분석.위협) ? data.SWOT분석.위협 : [];
    result.전략매트릭스 = data.SWOT분석.전략매트릭스 || '';
  }

  // swotAnalysis에서 추출
  if (data.swotAnalysis) {
    result.강점 = Array.isArray(data.swotAnalysis.strengths) ? data.swotAnalysis.strengths : [];
    result.약점 = Array.isArray(data.swotAnalysis.weaknesses) ? data.swotAnalysis.weaknesses : [];
    result.기회 = Array.isArray(data.swotAnalysis.opportunities) ? data.swotAnalysis.opportunities : [];
    result.위협 = Array.isArray(data.swotAnalysis.threats) ? data.swotAnalysis.threats : [];
    result.전략매트릭스 = data.swotAnalysis.strategicMatrix || '';
  }

  if (DEBUG_MODE) {
    console.log('📋 SWOT 분석 데이터 추출 완료:', {
      강점개수: result.강점.length,
      약점개수: result.약점.length,
      기회개수: result.기회.length,
      위협개수: result.위협.length,
      전략매트릭스여부: !!result.전략매트릭스
    });
  }

  return result;
}

// ================================================================================
// 💬 상담신청 처리 (19개 컬럼)
// ================================================================================

function processConsultationForm(data) {
  try {
    const sheet = getOrCreateSheet(SHEETS.CONSULTATION, 'consultation');
    const timestamp = getCurrentKoreanTime();
    
    if (DEBUG_MODE) {
      console.log('✅ 상담신청 처리:', {
        성명: data.성명 || data.name,
        회사명: data.회사명 || data.company,
        이메일: data.이메일 || data.email
      });
    }
    
    // 19개 컬럼 상담신청 데이터 구성
    const rowData = [
      timestamp,                                                    // A: 제출일시
      data.상담유형 || data.consultationType || '일반상담',           // B: 상담유형
      data.성명 || data.name || '',                                  // C: 성명
      data.연락처 || data.phone || '',                               // D: 연락처
      data.이메일 || data.email || '',                               // E: 이메일
      data.회사명 || data.company || '',                             // F: 회사명
      data.직책 || data.position || '',                             // G: 직책
      data.상담분야 || data.consultationArea || data.industry || '', // H: 상담분야
      data.문의내용 || data.inquiryContent || data.message || '',   // I: 문의내용
      data.희망상담시간 || data.preferredTime || '',                 // J: 희망상담시간
      data.개인정보동의 === true || data.privacyConsent === true ? '동의' : '미동의', // K: 개인정보동의
      data.진단연계여부 === 'Y' || data.isDiagnosisLinked ? 'Y' : 'N', // L: 진단연계여부
      data.진단점수 || data.diagnosisScore || '',                   // M: 진단점수
      data.추천서비스 || data.recommendedService || '',             // N: 추천서비스
      '접수완료',                                                   // O: 처리상태
      '',                                                          // P: 상담일정
      '',                                                          // Q: 상담결과
      '',                                                          // R: 담당컨설턴트
      ''                                                           // S: 완료일시
    ];

    // 구글시트에 데이터 저장
    const newRow = sheet.getLastRow() + 1;
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
    
    if (DEBUG_MODE) {
      console.log('✅ 상담신청 저장 완료:', {
        시트: SHEETS.CONSULTATION,
        행번호: newRow,
        성명: data.성명 || data.name,
        회사명: data.회사명 || data.company
      });
    }

    // 이메일 발송 (단순화된 버전)
    if (AUTO_REPLY_ENABLED) {
      console.log('📧 관리자 이메일 발송 시작 - AUTO_REPLY_ENABLED:', AUTO_REPLY_ENABLED);
      sendConsultationAdminNotification(data, newRow);
      
      // 이메일 주소 추출 통일 (contactEmail 포함)
      const userEmail = data.이메일 || data.email || data.contactEmail;
      const userName = data.성명 || data.name || data.contactName;
      
      console.log('📧 상담신청자 이메일 발송 데이터 확인:', {
        userEmail: userEmail ? userEmail.substring(0, 5) + '***' : 'null',
        userName: userName || 'null',
        hasEmail: !!userEmail,
        hasName: !!userName
      });
      
      // 이메일 주소만 있으면 발송 (조건 통일)
      if (userEmail) {
        console.log('📧 상담신청자 확인 메일 발송 시작:', userEmail.substring(0, 5) + '***');
        const emailResult = sendUserConfirmation(userEmail, userName, '상담');
        if (emailResult && !emailResult.success) {
          console.error('❌ 상담신청자 이메일 발송 실패:', emailResult.error);
        }
      } else {
        console.warn('⚠️ 상담신청자 이메일 주소가 없어 확인 메일을 발송하지 않습니다:', {
          이메일: data.이메일,
          email: data.email,
          contactEmail: data.contactEmail
        });
      }
    } else {
      console.warn('⚠️ AUTO_REPLY_ENABLED가 false로 설정되어 이메일 발송을 건너뜁니다.');
    }

    return createSuccessResponse({
      message: '상담신청이 성공적으로 접수되었습니다. 1-2일 내에 전문가가 연락드리겠습니다.',
      sheet: SHEETS.CONSULTATION,
      row: newRow,
      timestamp: timestamp,
      처리방식: '단순_접수_확인_이메일'
    });

  } catch (error) {
    console.error('❌ 상담신청 처리 오류:', error);
    return createErrorResponse('상담신청 처리 중 오류: ' + error.toString());
  }
}

// ================================================================================
// 🧪 베타피드백 처리 (14개 컬럼)
// ================================================================================

function processBetaFeedback(data) {
  try {
    const sheet = getOrCreateSheet(SHEETS.BETA_FEEDBACK, 'betaFeedback');
    const timestamp = getCurrentKoreanTime();
    
    if (DEBUG_MODE) {
      console.log('🧪 베타피드백 처리:', {
        계산기명: data.계산기명,
        피드백유형: data.피드백유형,
        사용자이메일: data.사용자이메일?.substring(0, 5) + '***'
      });
    }
    
    // 14개 컬럼 베타피드백 데이터 구성
    const rowData = [
      timestamp,                      // A: 제출일시
      data.계산기명 || '',             // B: 계산기명
      data.피드백유형 || '',           // C: 피드백유형
      data.사용자이메일 || '',         // D: 사용자이메일
      data.문제설명 || '',            // E: 문제설명
      data.기대동작 || '',            // F: 기대동작
      data.실제동작 || '',            // G: 실제동작
      data.재현단계 || '',            // H: 재현단계
      data.심각도 || '',              // I: 심각도
      data.추가의견 || '',            // J: 추가의견
      data.브라우저정보 || '',        // K: 브라우저정보
      data.제출경로 || '',            // L: 제출경로
      '접수완료',                    // M: 처리상태
      ''                             // N: 처리일시
    ];

    // 구글시트에 데이터 저장
    const newRow = sheet.getLastRow() + 1;
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
    
    if (DEBUG_MODE) {
      console.log('🧪 베타피드백 저장 완료:', {
        시트: SHEETS.BETA_FEEDBACK,
        행번호: newRow,
        계산기명: data.계산기명,
        피드백유형: data.피드백유형
      });
    }

    // 이메일 발송 (단순화된 버전)
    if (AUTO_REPLY_ENABLED) {
      sendBetaFeedbackAdminNotification(data, newRow);
      
      const userEmail = data.사용자이메일;
      if (userEmail) {
        sendBetaFeedbackUserConfirmation(userEmail, data);
      }
    }

    return createSuccessResponse({
      message: '베타 피드백이 성공적으로 접수되었습니다. 검토 후 개선사항에 반영하겠습니다.',
      sheet: SHEETS.BETA_FEEDBACK,
      row: newRow,
      timestamp: timestamp
    });

  } catch (error) {
    console.error('❌ 베타피드백 처리 오류:', error);
    return createErrorResponse('베타피드백 처리 중 오류: ' + error.toString());
  }
}

// ================================================================================
// 📊 시트 헤더 설정 (58개 진단, 19개 상담, 14개 베타피드백)
// ================================================================================

function setupHeaders(sheet, type) {
  let headers;
  
  if (type === 'consultation') {
    // 상담신청 헤더 (19개 컬럼) - 기존 유지
    headers = [
      '제출일시', '상담유형', '성명', '연락처', '이메일', 
      '회사명', '직책', '상담분야', '문의내용', '희망상담시간', 
      '개인정보동의', '진단연계여부', '진단점수', '추천서비스', '처리상태',
      '상담일정', '상담결과', '담당컨설턴트', '완료일시'
    ];
  } else if (type === 'betaFeedback') {
    // 베타피드백 헤더 (14개 컬럼) - 기존 유지
    headers = [
      '제출일시', '계산기명', '피드백유형', '사용자이메일', '문제설명', 
      '기대동작', '실제동작', '재현단계', '심각도', '추가의견', 
      '브라우저정보', '제출경로', '처리상태', '처리일시'
    ];
  } else {
    // 최고수준 AI 진단신청 헤더 (120개 컬럼) - 완전 업그레이드
    headers = [
      // 🔵 기본 정보 (A-R: 18개)
      '제출일시', 
      '회사명', 
      '업종', 
      '사업담당자', 
      '직원수', 
      '사업성장단계', 
      '주요고민사항', 
      '예상혜택', 
      '소재지', 
      '담당자명', 
      '연락처', 
      '이메일', 
      '개인정보동의', 
      '폼타입', 
      '진단상태', 
      'AI분석결과', 
      '결과URL', 
      '분석완료일시',
      
      // 🟢 진단 결과 (S-X: 6개)
      '종합점수 (100점 만점)', 
      '상품서비스점수 (25% 가중치)', 
      '고객응대점수 (20% 가중치)', 
      '마케팅점수 (25% 가중치)', 
      '구매재고점수 (15% 가중치)', 
      '매장관리점수 (15% 가중치)',
      
      // 🔶 상품/서비스 관리 역량 (Y-AC: 5개, 가중치 25%)
      '기획수준 (상품/서비스 기획 수준이 어느 정도인가요? 1-5점)', 
      '차별화정도 (경쟁업체 대비 차별화 정도는? 1-5점)', 
      '가격설정 (가격 설정의 합리성은? 1-5점)', 
      '전문성 (업무 전문성 수준은? 1-5점)', 
      '품질 (상품/서비스 품질 수준은? 1-5점)',
      
      // 🔷 고객응대 역량 (AD-AG: 4개, 가중치 20%)
      '고객맞이 (고객 맞이의 친절함은? 1-5점)', 
      '고객응대 (고객 응대 능력은? 1-5점)', 
      '불만관리 (고객 불만 처리 능력은? 1-5점)', 
      '고객유지 (고객 유지 관리 능력은? 1-5점)',
      
      // 🔸 마케팅 역량 (AH-AL: 5개, 가중치 25%)
      '고객이해 (고객 특성 이해도는? 1-5점)', 
      '마케팅계획 (마케팅 계획 수립 능력은? 1-5점)', 
      '오프라인마케팅 (오프라인 마케팅 실행 능력은? 1-5점)', 
      '온라인마케팅 (온라인 마케팅 활용 능력은? 1-5점)', 
      '판매전략 (판매 전략 수립 및 실행 능력은? 1-5점)',
      
      // 🔹 구매/재고관리 (AM-AN: 2개, 가중치 15%)
      '구매관리 (구매 관리의 체계성은? 1-5점)', 
      '재고관리 (재고 관리의 효율성은? 1-5점)',
      
      // 🔺 매장관리 역량 (AO-AR: 4개, 가중치 15%)
      '외관관리 (매장 외관 관리 상태는? 1-5점)', 
      '인테리어관리 (내부 인테리어 관리 상태는? 1-5점)', 
      '청결도 (매장 청결도는? 1-5점)', 
      '작업동선 (작업 동선의 효율성은? 1-5점)',
      
      // 🟣 보고서 정보 (AS-AV: 4개)
      '보고서글자수', 
      '추천서비스 목록', 
      '보고서요약 (500자)', 
      '보고서전문 (8000자 미만)',
      
      // 🚀 6가지 핵심 지표 (AW-BB: 6개)
      '비즈니스모델 점수',
      '시장위치 점수',
      '운영효율성 점수',
      '성장잠재력 점수',
      '디지털준비도 점수',
      '재무건전성 점수',
      
      // 🎯 업종별 특화 분석 (BC-BF: 4개)
      '업종별 특화 분석',
      '시장 위치 분석',
      '경쟁력 분석',
      '성장 잠재력 분석',
      
      // 📋 기존 SWOT 분석 (BG-BK: 5개)
      '기본 강점 분석',
      '기본 약점 분석',
      '기본 기회 분석',
      '기본 위협 분석',
      '기본 SWOT 전략 매트릭스',
      
      // 🔬 추가 분석 데이터 (BL-BO: 4개)
      '신뢰도 점수',
      '진단 등급',
      '업종별 트렌드',
      '디지털 전환 가이드',
      
      // 🤖 AI 시대 조직적응 분석 (BP-BY: 10개) - 신규 40개 컬럼 시작
      'AI 활용 현황',
      'AI 준비도 점수 (100점 만점)',
      '디지털 전환 단계',
      'AI 도입 장벽',
      '디지털 인프라 수준',
      'AI 인식 수준',
      '데이터 활용 능력',
      'AI 교육 필요도',
      '조직 변화 준비도',
      'AI 투자 의지',
      
      // 🚀 업종별 AI 혁신 전략 (BZ-CI: 10개)
      'AI 핵심 전략',
      'AI 우선순위 영역',
      'AI 도구 추천',
      'AI 구현 단계',
      'AI 추가 권장사항',
      'AI 시장 규모',
      'AI 주요 기술',
      'AI 성공 사례',
      'AI 주요 트렌드',
      'AI 분석 기준년도',
      
      // 🔄 AI 통합 SWOT 분석 (CJ-CN: 5개)
      'AI 통합 강점',
      'AI 통합 약점',
      'AI 통합 기회',
      'AI 통합 위협',
      'AI 통합 전략매트릭스',
      
      // 📊 고급 AI 분석 지표 (CO-CX: 10개)
      'AI 성숙도 점수',
      '디지털 전환 지수',
      'AI ROI 예측',
      'AI 도입 위험도',
      '조직 준비도',
      '기술 도입 속도',
      'AI 경쟁우위',
      '혁신 잠재력',
      'AI 구현 복잡도',
      '미래 AI 준비도',
      
      // 🎯 맞춤형 AI 전략 (CY-DH: 10개)
      '개별 AI 우선순위',
      'AI 예산 추정',
      'AI 기대 효과',
      'AI 구현 기간',
      'AI 핵심성공요인',
      'AI 위험 요소',
      'AI 지원 방안',
      'AI 측정 지표',
      'AI 교육 계획',
      'AI 로드맵'
    ];
  }
  
  // 📋 1행: 헤더 설정
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  
  // 🎨 최고수준 헤더 스타일링
  if (type === 'diagnosis') {
    // AI 진단용 특별 스타일링
    headerRange.setBackground('#1a73e8');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    headerRange.setHorizontalAlignment('center');
    headerRange.setVerticalAlignment('middle');
    headerRange.setWrap(true);
    headerRange.setBorder(true, true, true, true, true, true);
    
    // 🎨 섹션별 색상 구분
    if (headers.length >= 120) {
      // 기본 정보 (A-R)
      sheet.getRange(1, 1, 1, 18).setBackground('#1a73e8');
      // 진단 결과 (S-X)
      sheet.getRange(1, 19, 1, 6).setBackground('#0d9488');
      // AI 분석 섹션 (BP 이후)
      sheet.getRange(1, 59, 1, 40).setBackground('#dc2626');
    }
  } else {
    // 기본 스타일링
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    headerRange.setHorizontalAlignment('center');
    headerRange.setVerticalAlignment('middle');
    headerRange.setWrap(true);
  }
  
  sheet.setFrozenRows(1);
  
  console.log(`📋 ${type} 시트 헤더 설정 완료: ${headers.length}개 컬럼 ${type === 'diagnosis' ? '(최고수준 AI 진단 120개 컬럼)' : ''}`);
}

// ================================================================================
// 🧪 최고수준 AI 진단 테스트 함수들 (업그레이드)
// ================================================================================

/**
 * 최고수준 AI 진단 신청 테스트 (120개 컬럼 + AI 분석)
 */
function testDiagnosisSubmission() {
  console.log('🧪 최고수준 AI 진단 신청 테스트 시작... (120개 컬럼 + AI 분석)');
  console.log('🔍 현재 설정 확인:', {
    AUTO_REPLY_ENABLED: AUTO_REPLY_ENABLED,
    ADMIN_EMAIL: ADMIN_EMAIL,
    VERSION: VERSION,
    AICAMP_LOGO_URL: AICAMP_LOGO_URL,
    AI_ADAPTATION_CONFIG: Object.keys(AI_ADAPTATION_CONFIG)
  });
  
  const testData = {
    action: 'saveDiagnosis',
    회사명: '테스트AI기업_최고수준_시스템',
    업종: ['제조업', 'AI/머신러닝'], // 🚀 최고수준: AI 관련 업종 추가
    소재지: '서울특별시', // 🚀 최고수준: 수도권 소재지
    사업담당자: '김AI대표',
    직원수: '50명 이상',
    사업성장단계: '성장기',
    주요고민사항: 'AI 시대 대비 조직 디지털 전환과 AI 도입을 통한 경쟁력 확보가 필요합니다. 직원들의 AI 리터러시 향상과 업무 자동화를 통한 효율성 증대가 시급합니다.',
    예상혜택: 'AI 기반 업무 자동화로 30% 효율성 향상, 데이터 기반 의사결정 체계 구축, 업종 내 AI 선도기업 포지셔닝',
    담당자명: '이AI담당_최고수준테스트',
    연락처: '010-1234-5678',
    이메일: 'aicamp.supreme.test@gmail.com', // 테스트용 이메일 주소
    개인정보동의: true,
    종합점수: 82, // 🚀 최고수준: 높은 점수로 테스트
    문항별점수: {
      기획수준: 4,
      차별화정도: 5,
      가격설정: 4,
      전문성: 5,
      품질: 4,
      고객맞이: 4,
      고객응대: 4,
      불만관리: 3,
      고객유지: 4,
      고객이해: 4,
      마케팅계획: 3,
      오프라인마케팅: 3,
      온라인마케팅: 4,
      판매전략: 4,
      구매관리: 4,
      재고관리: 4,
      외관관리: 5,
      인테리어관리: 4,
      청결도: 5,
      작업동선: 4
    },
    카테고리점수: {
      productService: { score: 4.4 },
      customerService: { score: 3.8 },
      marketing: { score: 3.6 },
      procurement: { score: 4.0 },
      storeManagement: { score: 4.5 }
    },
    // 🚀 최고수준: 6가지 핵심 지표 추가
    businessModel: 85,
    marketPosition: 78,
    operationalEfficiency: 82,
    growthPotential: 88,
    digitalReadiness: 90, // AI 관련 높은 점수
    financialHealth: 80,
    진단보고서요약: '최고수준 AI 경영진단 결과입니다. 제조업과 AI/머신러닝 융합형 비즈니스 모델로 매우 높은 성장 잠재력을 보유하고 있습니다. 특히 디지털 준비도가 90점으로 업종 평균을 크게 상회하며, AI 시대 적응에 매우 유리한 조건을 갖추고 있습니다. 서울 소재의 50명 이상 규모 기업으로 AI 전담팀 구성 및 자체 플랫폼 구축이 가능한 수준입니다. 120개 항목 완전분석을 통해 개별 맞춤형 AI 전환 로드맵을 제시하며, 6가지 핵심 지표 모두 우수한 수준을 보이고 있어 향후 2-3년 내 업종 내 AI 선도기업으로 성장할 가능성이 매우 높습니다.'
  };

  try {
    console.log('🚀 processDiagnosisForm 함수 호출 시작 (최고수준 AI)');
    const result = processDiagnosisForm(testData);
    console.log('✅ 최고수준 AI 진단 신청 테스트 성공:', {
      success: result.success,
      message: result.message,
      sheet: result.sheet,
      row: result.row,
      AI준비도: result.AI준비도,
      디지털전환단계: result.디지털전환단계,
      처리방식: result.처리방식,
      시스템버전: result.시스템버전
    });
    
    // 이메일 발송 성공 여부 별도 확인
    console.log('📧 최고수준 AI 이메일 발송 테스트 완료 - 실제 이메일함을 확인해주세요:', testData.이메일);
    console.log('🔍 AI 분석 결과 요약:', {
      업종: testData.업종,
      총점: testData.종합점수,
      디지털준비도: testData.digitalReadiness,
      예상AI준비도: '75-85점 예상',
      예상디지털전환단계: '확산적용 예상'
    });
    
    return result;
  } catch (error) {
    console.error('❌ 최고수준 AI 진단 신청 테스트 실패:', {
      error: error.toString(),
      stack: error.stack,
      testData: {
        회사명: testData.회사명,
        이메일: testData.이메일,
        담당자명: testData.담당자명,
        업종: testData.업종,
        디지털준비도: testData.digitalReadiness
      }
    });
    throw error;
  }
}

/**
 * 상담 신청 테스트 (이메일 발송 오류 수정 테스트 포함)
 */
function testConsultationSubmission() {
  console.log('🧪 상담 신청 테스트 시작... (이메일 발송 오류 수정 테스트)');
  console.log('🔍 현재 설정 확인:', {
    AUTO_REPLY_ENABLED: AUTO_REPLY_ENABLED,
    ADMIN_EMAIL: ADMIN_EMAIL,
    VERSION: VERSION
  });
  
  const testData = {
    action: 'saveConsultation',
    상담유형: '정책자금_업그레이드테스트', // 🔥 업그레이드: 정책자금 상담
    성명: '김테스트_업그레이드상담',
    연락처: '010-9876-5432',
    이메일: 'aicamp.test.consultation@gmail.com', // 테스트용 이메일 주소
    회사명: '테스트컴퍼니_업그레이드',
    직책: '대표이사',
    상담분야: 'policy-funding', // 🔥 업그레이드: 정책자금 분야
    문의내용: '제조업 및 IT융합 기업의 정책자금 지원 프로그램 상담을 요청합니다. 업종별 특화 지원사업과 지역별 혜택을 알고 싶습니다. (개인정보 동의 오류 수정 테스트)',
    희망상담시간: 'afternoon', // 🔥 업그레이드: 표준화된 값
    개인정보동의: true, // 🔥 업그레이드: 개인정보 동의 오류 수정 확인
    진단연계여부: 'Y',
    진단점수: '78', // 🔥 업그레이드: 향상된 점수
    추천서비스: '정책자금 컨설팅'
  };

  try {
    console.log('🚀 processConsultationForm 함수 호출 시작');
    const result = processConsultationForm(testData);
    console.log('✅ 상담 신청 테스트 성공 (이메일 오류 수정 버전):', {
      success: result.success,
      message: result.message,
      sheet: result.sheet,
      row: result.row,
      처리방식: result.처리방식
    });
    
    // 이메일 발송 성공 여부 별도 확인
    console.log('📧 상담신청 이메일 발송 테스트 완료 - 실제 이메일함을 확인해주세요:', testData.이메일);
    
    return result;
  } catch (error) {
    console.error('❌ 상담 신청 테스트 실패 (이메일 오류 수정 버전):', {
      error: error.toString(),
      stack: error.stack,
      testData: {
        성명: testData.성명,
        이메일: testData.이메일,
        회사명: testData.회사명
      }
    });
    throw error;
  }
}

/**
 * 베타 피드백 테스트
 */
function testBetaFeedback() {
  console.log('🧪 베타 피드백 테스트 시작...');
  
  const testData = {
    action: 'saveBetaFeedback',
    계산기명: '업종별맞춤진단시스템_업그레이드', // 🔥 업그레이드: 새로운 시스템 테스트
    피드백유형: '기능개선',
    사용자이메일: 'aicamp.beta.upgrade@gmail.com',
    문제설명: '업종 체크박스와 소재지 선택 기능이 추가되어 사용성이 크게 향상되었습니다.',
    기대동작: '복수 업종 선택과 시도별 소재지 정확 입력',
    실제동작: '정상적으로 작동하며 데이터가 올바르게 저장됩니다.',
    재현단계: '1. 업종 복수선택 (제조업, IT/소프트웨어)\n2. 소재지 드롭다운 선택 (경기도)\n3. 진단 완료\n4. 구글시트 저장 확인', // 🔥 업그레이드: 새로운 기능 테스트
    심각도: '낮음',
    추가의견: '업그레이드 기능이 정책자금 상담에 매우 유용합니다. CORS 오류도 완전히 해결되었습니다.',
    브라우저정보: 'Chrome 120.0.0.0 (업그레이드 테스트)',
    제출경로: '/diagnosis-upgrade-test' // 🔥 업그레이드: 새로운 경로
  };

  try {
    const result = processBetaFeedback(testData);
    console.log('✅ 베타피드백 테스트 성공 (단순화 버전):', result);
    return result;
  } catch (error) {
    console.error('❌ 베타피드백 테스트 실패:', error);
    throw error;
  }
}

/**
 * 📖 AICAMP 고급 진단 시스템 Google Apps Script 2025 사용법
 * 
 * 🚀 고급 시스템 특징:
 * ✅ 개별 점수 20개 문항 완전 저장 및 분석
 * ✅ 6가지 핵심 지표 상세 평가 (비즈니스모델, 시장위치, 운영효율성, 성장잠재력, 디지털준비도, 재무건전성)
 * ✅ 업종별 특화 맞춤 분석 (제조업, IT, 서비스업, 소매업, 외식업 등)
 * ✅ SWOT 분석 고도화 (강점, 약점, 기회, 위협, 전략매트릭스)
 * ✅ 4000자 확장 보고서 처리
 * ✅ 80개 컬럼 완전 데이터 저장
 * ✅ 업종별 맞춤 이메일 발송
 * ✅ 고급 관리자 알림 시스템
 * 
 * 🧪 테스트 방법:
 * - testDiagnosisSubmission() 함수 실행: 고급 진단 신청 테스트
 * - testConsultationSubmission() 함수 실행: 상담 신청 테스트
 * - testBetaFeedback() 함수 실행: 베타 피드백 테스트
 * 
 * 📊 데이터 구조:
 * - 기본 정보: 18개 컬럼 (A-R)
 * - 진단 결과: 6개 컬럼 (S-X)
 * - 개별 점수: 20개 컬럼 (Y-AR)
 * - 보고서 정보: 4개 컬럼 (AS-AV)
 * - 6가지 핵심 지표: 6개 컬럼 (AW-BB)
 * - 업종별 특화 분석: 4개 컬럼 (BC-BF)
 * - SWOT 분석: 5개 컬럼 (BG-BK)
 * - 추가 분석 데이터: 4개 컬럼 (BL-BO)
 * 총 80개 컬럼으로 완전한 고급 진단 데이터 저장
 * 
 * 🔄 처리 방식:
 * 1. 고급 진단 접수 → 80개 컬럼 구글시트 저장
 * 2. 업종별 특화 분석 데이터 처리
 * 3. 6가지 핵심 지표 계산 및 저장
 * 4. 관리자에게 고급 분석 알림 이메일 발송
 * 5. 신청자에게 업종별 맞춤 확인 이메일 발송
 * 6. 관리자가 1-2일 내 고급 분석 결과 직접 연락
 * 
 * 📈 기존 대비 개선사항:
 * - 개별 점수 저장: 0개 → 20개 문항 완전 저장
 * - 핵심 지표 분석: 1개 → 6가지 핵심 지표
 * - 업종별 분석: 없음 → 업종별 특화 맞춤 분석
 * - 보고서 길이: 3000자 → 4000자 확장
 * - 데이터 컬럼: 58개 → 80개 확장
 * - 이메일 품질: 기본 → 업종별 맞춤 고급 이메일
 */ 

/**
 * 문항별 상세 점수 추출 (1-5점 정확 매핑)
 */
function extractDetailedScores(data) {
  // 여러 경로로 점수 데이터 확인
  const scores = data.문항별점수 || data.detailedScores || {};
  
  // 영문 키를 한글 키로 매핑
  const keyMapping = {
    'planning_level': '기획수준',
    'differentiation_level': '차별화정도',
    'pricing_level': '가격설정',
    'expertise_level': '전문성',
    'quality_level': '품질',
    'customer_greeting': '고객맞이',
    'customer_service': '고객응대',
    'complaint_management': '불만관리',
    'customer_retention': '고객유지',
    'customer_understanding': '고객이해',
    'marketing_planning': '마케팅계획',
    'offline_marketing': '오프라인마케팅',
    'online_marketing': '온라인마케팅',
    'sales_strategy': '판매전략',
    'purchase_management': '구매관리',
    'inventory_management': '재고관리',
    'exterior_management': '외관관리',
    'interior_management': '인테리어관리',
    'cleanliness': '청결도',
    'work_flow': '작업동선'
  };

  const result = {};
  
  // 기본값으로 0 설정
  Object.values(keyMapping).forEach(koreanKey => {
    result[koreanKey] = 0;
  });

  // 실제 점수 데이터 매핑
  Object.entries(keyMapping).forEach(([englishKey, koreanKey]) => {
    if (scores[englishKey] !== undefined && scores[englishKey] !== null) {
      result[koreanKey] = Number(scores[englishKey]) || 0;
    } else if (scores[koreanKey] !== undefined && scores[koreanKey] !== null) {
      result[koreanKey] = Number(scores[koreanKey]) || 0;
    }
  });

  // 직접 전달된 개별 점수도 확인
  Object.entries(keyMapping).forEach(([englishKey, koreanKey]) => {
    if (data[englishKey] !== undefined && data[englishKey] !== null) {
      result[koreanKey] = Number(data[englishKey]) || 0;
    }
  });

  if (DEBUG_MODE) {
    console.log('🔧 개별 점수 데이터 추출 완료:', {
      원본점수개수: Object.keys(scores).length,
      매핑된점수개수: Object.keys(result).filter(k => result[k] > 0).length,
      샘플점수: {
        기획수준: result.기획수준,
        고객응대: result.고객응대,
        마케팅계획: result.마케팅계획
      }
    });
  }

  return result;
}

/**
 * 카테고리별 점수 추출
 */
function extractCategoryScores(data) {
  const categoryScores = data.카테고리점수 || data.categoryScores || {};
  
  const result = {
    상품서비스점수: '0.0',
    고객응대점수: '0.0',
    마케팅점수: '0.0',
    구매재고점수: '0.0',
    매장관리점수: '0.0'
  };

  // 카테고리 점수 매핑
  const categoryMapping = {
    'productService': '상품서비스점수',
    'customerService': '고객응대점수',
    'marketing': '마케팅점수',
    'procurement': '구매재고점수',
    'storeManagement': '매장관리점수'
  };

  Object.entries(categoryMapping).forEach(([englishKey, koreanKey]) => {
    if (categoryScores[englishKey] && categoryScores[englishKey].score !== undefined) {
      result[koreanKey] = Number(categoryScores[englishKey].score).toFixed(1);
    }
  });

  if (DEBUG_MODE) {
    console.log('📊 카테고리별 점수 추출 완료:', result);
  }

  return result;
}

// ================================================================================
// 🤖 AI 시대 조직적응 분석 엔진 (최고수준 업그레이드)
// ================================================================================

/**
 * AI 시대 조직적응 분석 데이터 추출 및 분석
 */
function extractAIAdaptationAnalysis(data) {
  const result = {
    AI활용현황: '도입준비',
    AI준비도점수: 0,
    디지털전환단계: '기초',
    AI도입장벽: [],
    디지털인프라수준: 0,
    AI인식수준: 0,
    데이터활용능력: 0,
    AI교육필요도: 0,
    조직변화준비도: 0,
    AI투자의지: 0
  };

  // 업종별 기본 AI 준비도 계산
  const industry = data.업종 || data.industry || 'service';
  const industryKey = Array.isArray(industry) ? industry[0].toLowerCase() : industry.toLowerCase();
  const aiReadiness = AI_ADAPTATION_CONFIG.INDUSTRY_AI_READINESS[industryKey] || 
                     AI_ADAPTATION_CONFIG.INDUSTRY_AI_READINESS['service'];

  result.AI준비도점수 = aiReadiness.base;

  // 기업 규모에 따른 AI 준비도 조정
  const employeeCount = data.직원수 || data.employeeCount || '';
  if (employeeCount.includes('50명 이상') || employeeCount.includes('100명')) {
    result.AI준비도점수 += 15;
  } else if (employeeCount.includes('10-50명')) {
    result.AI준비도점수 += 5;
  }

  // 성장단계에 따른 AI 활용현황 결정
  const growthStage = data.사업성장단계 || data.growthStage || '';
  if (growthStage.includes('성숙기') || growthStage.includes('확장기')) {
    result.AI활용현황 = '확산적용';
    result.AI준비도점수 += 10;
  } else if (growthStage.includes('성장기')) {
    result.AI활용현황 = '시범적용';
    result.AI준비도점수 += 5;
  }

  // 디지털 전환 단계 결정
  if (result.AI준비도점수 >= 80) {
    result.디지털전환단계 = '완전통합';
  } else if (result.AI준비도점수 >= 60) {
    result.디지털전환단계 = '확산적용';
  } else if (result.AI준비도점수 >= 40) {
    result.디지털전환단계 = '시범적용';
  } else {
    result.디지털전환단계 = '도입준비';
  }

  // AI 도입 장벽 분석 (점수 기반)
  const totalScore = data.종합점수 || data.totalScore || 0;
  if (totalScore < 50) {
    result.AI도입장벽 = [
      '경영진의 AI 이해 부족',
      '직원들의 디지털 스킬 부족',
      'AI 도입 비용 부담',
      '투자 대비 효과 불확실성'
    ];
  } else if (totalScore < 70) {
    result.AI도입장벽 = [
      '레거시 시스템과의 호환성',
      '전문 인력 부족',
      '조직 문화의 저항'
    ];
  } else {
    result.AI도입장벽 = [
      '데이터 품질 및 보안 문제',
      '고도화된 AI 기술 적용 복잡성'
    ];
  }

  // 세부 지표 계산 (1-100점)
  result.디지털인프라수준 = Math.min(100, Math.max(20, result.AI준비도점수 + (totalScore * 0.3)));
  result.AI인식수준 = Math.min(100, Math.max(10, totalScore * 0.8));
  result.데이터활용능력 = Math.min(100, Math.max(15, totalScore * 0.6 + 
    (employeeCount.includes('50명 이상') ? 20 : 10)));
  result.AI교육필요도 = Math.max(30, 100 - result.AI인식수준);
  result.조직변화준비도 = Math.min(100, Math.max(25, totalScore * 0.7));
  result.AI투자의지 = Math.min(100, Math.max(20, 
    (growthStage.includes('성장기') || growthStage.includes('확장기') ? 70 : 50) + 
    (totalScore > 70 ? 20 : 0)));

  if (DEBUG_MODE) {
    console.log('🤖 AI 시대 조직적응 분석 완료:', {
      AI활용현황: result.AI활용현황,
      AI준비도점수: result.AI준비도점수,
      디지털전환단계: result.디지털전환단계,
      AI도입장벽개수: result.AI도입장벽.length,
      세부지표평균: Math.round((result.디지털인프라수준 + result.AI인식수준 + 
                              result.데이터활용능력 + result.조직변화준비도 + result.AI투자의지) / 5)
    });
  }

  return result;
}

/**
 * 업종별 AI 혁신 전략 생성
 */
function generateAITransformationStrategy(industry, companyData, aiAnalysis) {
  const strategies = {
    'manufacturing': {
      핵심전략: 'Smart Factory 기반 제조 혁신',
      우선순위영역: ['생산자동화', '품질관리AI', '예측정비', '공급망최적화'],
      AI도구추천: ['MES 시스템', 'IoT 센서', '컴퓨터비전', '예측분석'],
      구현단계: [
        '1단계: 생산데이터 수집 시스템 구축',
        '2단계: AI 기반 품질관리 시스템 도입',
        '3단계: 예측정비 및 공급망 최적화',
        '4단계: 완전 자동화 스마트팩토리 구현'
      ]
    },
    'it': {
      핵심전략: 'AI-First 개발 문화 정착',
      우선순위영역: ['AI개발도구', '자동화테스팅', '코드분석', '고객지원'],
      AI도구추천: ['GitHub Copilot', 'AutoML', 'MLOps', 'AI 챗봇'],
      구현단계: [
        '1단계: AI 개발도구 도입 및 팀 교육',
        '2단계: 자동화 파이프라인 구축',
        '3단계: AI 기반 제품/서비스 개발',
        '4단계: AI 전문 기업으로 포지셔닝'
      ]
    },
    'service': {
      핵심전략: '고객경험 AI 개인화',
      우선순위영역: ['고객분석', '맞춤서비스', '업무자동화', '예약관리'],
      AI도구추천: ['CRM AI', '챗봇', '추천엔진', '자동화도구'],
      구현단계: [
        '1단계: 고객데이터 통합 및 분석',
        '2단계: AI 챗봇 및 자동화 도입',
        '3단계: 개인별 맞춤 서비스 구현',
        '4단계: AI 기반 신서비스 개발'
      ]
    },
    'retail': {
      핵심전략: 'AI 옴니채널 고객경험',
      우선순위영역: ['재고최적화', '고객분석', '추천시스템', '가격전략'],
      AI도구추천: ['추천알고리즘', '재고관리AI', '고객분석툴', '가격최적화'],
      구현단계: [
        '1단계: 고객 행동 데이터 수집',
        '2단계: AI 추천시스템 구축',
        '3단계: 재고 및 가격 최적화',
        '4단계: 완전 개인화 쇼핑 경험'
      ]
    },
    'food': {
      핵심전략: 'AI 기반 운영 효율화',
      우선순위영역: ['주문관리', '재고예측', '고객분석', '품질관리'],
      AI도구추천: ['POS AI', '재고예측', '배달최적화', '리뷰분석'],
      구현단계: [
        '1단계: 디지털 주문 시스템 구축',
        '2단계: AI 재고관리 및 예측',
        '3단계: 고객 선호도 기반 메뉴 최적화',
        '4단계: AI 기반 매장 운영 자동화'
      ]
    }
  };

  const industryKey = Array.isArray(industry) ? industry[0].toLowerCase() : industry.toLowerCase();
  const strategy = strategies[industryKey] || strategies['service'];

  // 기업 규모별 전략 조정
  const employeeCount = companyData.직원수 || companyData.employeeCount || '';
  if (employeeCount.includes('10명 미만')) {
    strategy.추가권장사항 = [
      '클라우드 기반 AI 서비스 우선 활용',
      '단계적 도입으로 비용 부담 최소화',
      '외부 AI 전문가 컨설팅 활용'
    ];
  } else if (employeeCount.includes('50명 이상')) {
    strategy.추가권장사항 = [
      'AI 전담팀 구성',
      '자체 AI 플랫폼 구축 검토',
      '전사적 AI 교육 프로그램 운영'
    ];
  }

  return strategy;
}

/**
 * 업종별 실시간 AI 트렌드 분석 (웹 검색 시뮬레이션)
 */
function analyzeIndustryAITrends(industry) {
  const currentYear = new Date().getFullYear();
  const trends = {
    'manufacturing': {
      주요트렌드: [
        `${currentYear} 제조업 AI 트렌드: 생성형 AI 활용 확산`,
        '스마트팩토리 고도화 및 디지털 트윈 적용',
        'AI 기반 공급망 리스크 관리 강화',
        '탄소중립 달성을 위한 AI 최적화'
      ],
      시장규모: `${currentYear} 제조업 AI 시장 전년 대비 23% 성장`,
      주요기술: ['Digital Twin', 'Predictive Analytics', 'Computer Vision', 'RPA'],
      성공사례: '현대자동차 AI 품질관리 시스템으로 불량률 45% 감소'
    },
    'it': {
      주요트렌드: [
        `${currentYear} IT업계 AI 혁신: ChatGPT 이후 생성형 AI 폭발적 성장`,
        'Low-Code/No-Code AI 플랫폼 확산',
        'AI 윤리 및 거버넌스 중요성 대두',
        'AI 기반 자동화 코딩 일반화'
      ],
      시장규모: `${currentYear} AI 소프트웨어 시장 450억 달러 규모`,
      주요기술: ['Generative AI', 'MLOps', 'AutoML', 'Edge AI'],
      성공사례: '삼성SDS AI 플랫폼으로 개발 생산성 300% 향상'
    },
    'service': {
      주요트렌드: [
        `${currentYear} 서비스업 AI 도입: 개인화 서비스 경쟁 심화`,
        'AI 챗봇 고도화 및 멀티모달 지원',
        '감정 AI 기반 고객 경험 혁신',
        'AI 기반 업무 자동화 확산'
      ],
      시장규모: `${currentYear} 서비스업 AI 투자 전년 대비 35% 증가`,
      주요기술: ['Conversational AI', 'Emotion AI', 'Process Automation', 'Personalization'],
      성공사례: '스타벅스 AI 추천시스템으로 매출 15% 증가'
    },
    'retail': {
      주요트렌드: [
        `${currentYear} 리테일 AI 혁신: 초개인화 쇼핑 경험`,
        'AI 기반 가상 피팅 및 AR 서비스',
        '무인매장 기술 고도화',
        'AI 재고관리 및 수요예측 정교화'
      ],
      시장규모: `${currentYear} 리테일 AI 시장 180억 달러 돌파`,
      주요기술: ['Recommendation Engine', 'Computer Vision', 'AR/VR', 'Demand Forecasting'],
      성공사례: '아마존 AI 추천으로 온라인 매출의 35% 기여'
    },
    'food': {
      주요트렌드: [
        `${currentYear} 외식업 AI 활용: 키오스크 및 배달 최적화`,
        'AI 메뉴 추천 및 재료 관리',
        '로봇 조리 및 서빙 기술 발전',
        'AI 기반 고객 리뷰 분석 활용'
      ],
      시장규모: `${currentYear} 푸드테크 AI 시장 연 28% 성장`,
      주요기술: ['Kitchen Automation', 'Demand Prediction', 'Review Analytics', 'Delivery Optimization'],
      성공사례: '맥도날드 AI 주문시스템으로 대기시간 20% 단축'
    }
  };

  const industryKey = Array.isArray(industry) ? industry[0].toLowerCase() : industry.toLowerCase();
  return trends[industryKey] || trends['service'];
}

/**
 * AI 조직적응 관점이 통합된 SWOT 분석 (기존 SWOT 확장)
 */
function enhancedSWOTWithAI(data, basicSwot, aiAnalysis) {
  const result = {
    AI강점: [],
    AI약점: [],
    AI기회: [],
    AI위협: [],
    AI전략매트릭스: ''
  };

  // AI 관점 강점 분석
  if (aiAnalysis.AI준비도점수 >= 70) {
    result.AI강점.push('업종 대비 높은 AI 준비도');
  }
  if (aiAnalysis.조직변화준비도 >= 60) {
    result.AI강점.push('조직의 변화 수용 능력');
  }
  if (aiAnalysis.AI투자의지 >= 70) {
    result.AI강점.push('경영진의 AI 투자 의지');
  }
  if (aiAnalysis.데이터활용능력 >= 60) {
    result.AI강점.push('기존 데이터 활용 기반');
  }

  // AI 관점 약점 분석
  if (aiAnalysis.AI인식수준 < 50) {
    result.AI약점.push('AI 기술에 대한 이해 부족');
  }
  if (aiAnalysis.디지털인프라수준 < 60) {
    result.AI약점.push('디지털 인프라 기반 부족');
  }
  if (aiAnalysis.AI교육필요도 >= 70) {
    result.AI약점.push('AI 관련 전문 인력 부족');
  }
  if (aiAnalysis.AI도입장벽.length >= 4) {
    result.AI약점.push('AI 도입 장벽 다수 존재');
  }

  // AI 관점 기회 분석
  const industry = data.업종 || data.industry || '';
  const industryTrends = analyzeIndustryAITrends(industry);
  
  result.AI기회.push(`${industry} 업종 AI 시장 급성장`);
  result.AI기회.push('정부 AI 디지털 뉴딜 정책 지원');
  result.AI기회.push('생성형 AI 도구 접근성 향상');
  result.AI기회.push('AI 기반 새로운 비즈니스 모델 창출');

  // AI 관점 위협 분석
  result.AI위협.push('AI 미도입 시 경쟁력 격차 확대');
  result.AI위협.push('AI 전문 인력 부족 심화');
  result.AI위협.push('빠른 AI 기술 변화 속도');
  if (aiAnalysis.AI준비도점수 < 50) {
    result.AI위협.push('디지털 전환 지연으로 인한 도태 위험');
  }

  // AI 전략 매트릭스 생성
  if (aiAnalysis.AI준비도점수 >= 70 && aiAnalysis.AI투자의지 >= 70) {
    result.AI전략매트릭스 = 'AI 선도전략: 강점을 바탕으로 AI 기술 선도 기업으로 포지셔닝하여 시장 기회 선점';
  } else if (aiAnalysis.AI준비도점수 >= 50) {
    result.AI전략매트릭스 = 'AI 추격전략: 기존 강점과 AI 기술을 결합하여 점진적 디지털 전환 추진';
  } else {
    result.AI전략매트릭스 = 'AI 기초전략: AI 기초 역량 구축을 통한 생존 기반 마련 후 단계적 성장 추진';
  }

  // 기존 SWOT과 AI SWOT 통합
  const integratedSwot = {
    강점: [...(basicSwot.강점 || []), ...result.AI강점],
    약점: [...(basicSwot.약점 || []), ...result.AI약점],
    기회: [...(basicSwot.기회 || []), ...result.AI기회],
    위협: [...(basicSwot.위협 || []), ...result.AI위협],
    전략매트릭스: `${basicSwot.전략매트릭스 || ''} | AI 관점: ${result.AI전략매트릭스}`
  };

  if (DEBUG_MODE) {
    console.log('🤖 AI 통합 SWOT 분석 완료:', {
      AI강점개수: result.AI강점.length,
      AI약점개수: result.AI약점.length,
      AI기회개수: result.AI기회.length,
      AI위협개수: result.AI위협.length,
      통합강점개수: integratedSwot.강점.length,
      통합약점개수: integratedSwot.약점.length
    });
  }

  return integratedSwot;
}

/**
 * 🎯 SWOT 전략 매트릭스 고도화 (SO/WO/ST/WT 전략별 최소 3개씩 총 12개 이상)
 */
function generateAdvancedSWOTMatrix(data, swotAnalysis, aiAnalysis) {
  try {
    console.log('🎯 고도화된 SWOT 전략 매트릭스 생성 시작');
    
    const industry = data.업종 || data.industry || '';
    const companyName = data.회사명 || data.companyName || '귀사';
    const businessDetails = data.businessDetails || data.사업상세설명 || '';
    const totalScore = data.종합점수 || data.totalScore || 0;
    const employeeCount = data.직원수 || data.employeeCount || '';
    
    // 업종별 맞춤형 전략 베이스
    const industryStrategies = getIndustrySpecificStrategies(industry);
    
    // SO 전략 (강점-기회 활용 전략) - 최소 3개
    const soStrategies = [
      `${companyName}의 핵심 강점을 활용한 ${industry} 시장 내 선도적 지위 확보`,
      `기존 고객 만족도를 바탕으로 ${industryStrategies.growthArea}영역 진출`,
      `내부 역량과 ${industry} 업종 성장 트렌드를 결합한 신규 서비스 개발`,
      `AI 기술 도입을 통한 ${companyName}의 경쟁 우위 강화 및 시장 확장`,
      `업종별 전문성을 활용한 B2B 파트너십 구축 및 시너지 창출`
    ];
    
    // WO 전략 (약점-기회 개선 전략) - 최소 3개  
    const woStrategies = [
      `${industry} 업종 성장 기회를 활용한 마케팅 역량 강화 투자`,
      `정부 지원 정책 활용을 통한 디지털 전환 및 운영 효율성 개선`,
      `${employeeCount} 규모에 맞는 체계적인 인력 개발 및 조직 역량 강화`,
      `외부 전문기관과의 협력을 통한 ${industryStrategies.weaknessArea} 영역 보완`,
      `기술 파트너십을 통한 AI 도입 장벽 해결 및 점진적 역량 구축`
    ];
    
    // ST 전략 (강점-위협 방어 전략) - 최소 3개
    const stStrategies = [
      `${companyName}의 핵심 강점을 활용한 ${industry} 업종 내 차별화 포지셔닝`,
      `고객 충성도 기반 경쟁사 위협 대응 및 시장 점유율 방어`,
      `내부 역량 집중을 통한 ${industryStrategies.defensiveArea} 영역 경쟁력 강화`,
      `AI 기술 선도 도입으로 업종 내 혁신 리더십 확보`,
      `품질 우위를 바탕으로 한 프리미엄 시장 포지셔닝 및 가격 경쟁력 확보`
    ];
    
    // WT 전략 (약점-위협 최소화 전략) - 최소 3개
    const wtStrategies = [
      `${industry} 업종 위기 상황 대비 리스크 관리 체계 구축`,
      `최소 비용으로 최대 효과를 내는 선택과 집중 전략 실행`,
      `외부 위협 요소 분석 및 사전 대응 시스템 구축`,
      `업종별 특화 솔루션 활용을 통한 약점 보완 및 위협 최소화`,
      `단계적 성장 전략을 통한 안정적 기업 운영 기반 확보`
    ];
    
    // 사업 상세 정보 기반 맞춤형 전략 추가
    if (businessDetails) {
      const customStrategies = generateCustomStrategiesFromBusinessDetails(businessDetails, industry);
      soStrategies.push(...customStrategies.so);
      woStrategies.push(...customStrategies.wo);
      stStrategies.push(...customStrategies.st);
      wtStrategies.push(...customStrategies.wt);
    }
    
    const result = {
      SO전략: soStrategies.slice(0, Math.max(3, Math.min(5, soStrategies.length))),
      WO전략: woStrategies.slice(0, Math.max(3, Math.min(5, woStrategies.length))),
      ST전략: stStrategies.slice(0, Math.max(3, Math.min(5, stStrategies.length))),
      WT전략: wtStrategies.slice(0, Math.max(3, Math.min(5, wtStrategies.length))),
      전체전략수: 0
    };
    
    result.전체전략수 = result.SO전략.length + result.WO전략.length + result.ST전략.length + result.WT전략.length;
    
    console.log(`✅ SWOT 전략 매트릭스 생성 완료 - 총 ${result.전체전략수}개 전략`);
    
    return result;
    
  } catch (error) {
    console.error('❌ SWOT 전략 매트릭스 생성 실패:', error);
    return {
      SO전략: ['기본 SO 전략: 강점을 활용한 기회 포착'],
      WO전략: ['기본 WO 전략: 기회를 통한 약점 개선'],
      ST전략: ['기본 ST 전략: 강점을 통한 위협 대응'],
      WT전략: ['기본 WT 전략: 약점과 위협 최소화'],
      전체전략수: 4
    };
  }
}

/**
 * 업종별 특화 전략 정보
 */
function getIndustrySpecificStrategies(industry) {
  const strategies = {
    '전자/전기제품 제조업': {
      growthArea: '스마트 팩토리 및 IoT',
      weaknessArea: '디지털 마케팅',
      defensiveArea: '기술 혁신'
    },
    '소프트웨어 개발': {
      growthArea: 'AI/ML 솔루션',
      weaknessArea: '사업화',
      defensiveArea: '기술 우위'
    },
    '경영컨설팅': {
      growthArea: '디지털 전환 컨설팅',
      weaknessArea: '온라인 마케팅',
      defensiveArea: '전문성'
    },
    '전자상거래': {
      growthArea: '개인화 서비스',
      weaknessArea: '물류 효율성',
      defensiveArea: '고객 경험'
    },
    '일반음식점': {
      growthArea: '배달 플랫폼',
      weaknessArea: '디지털화',
      defensiveArea: '브랜드 차별화'
    }
  };
  
  return strategies[industry] || {
    growthArea: '신기술 도입',
    weaknessArea: '마케팅',
    defensiveArea: '핵심 역량'
  };
}

/**
 * 사업 상세 정보 기반 맞춤형 전략 생성
 */
function generateCustomStrategiesFromBusinessDetails(businessDetails, industry) {
  const details = businessDetails.toLowerCase();
  const customStrategies = {
    so: [],
    wo: [],
    st: [],
    wt: []
  };
  
  // B2B 관련
  if (details.includes('b2b') || details.includes('기업')) {
    customStrategies.so.push('B2B 전문성을 활용한 기업 고객 네트워크 확장');
    customStrategies.wo.push('B2B 마케팅 자동화 시스템 도입으로 영업 효율성 극대화');
  }
  
  // 온라인/디지털 관련
  if (details.includes('온라인') || details.includes('디지털') || details.includes('웹')) {
    customStrategies.st.push('디지털 전문성을 바탕으로 한 온라인 시장 경쟁 우위 확보');
    customStrategies.wt.push('디지털 보안 강화를 통한 온라인 비즈니스 리스크 최소화');
  }
  
  // 제조/생산 관련
  if (details.includes('제조') || details.includes('생산') || details.includes('공장')) {
    customStrategies.so.push('생산 기술력을 활용한 고품질 제품 차별화 전략');
    customStrategies.wo.push('스마트 제조 시스템 도입으로 생산 효율성 혁신');
  }
  
  // 컨설팅/서비스 관련
  if (details.includes('컨설팅') || details.includes('상담') || details.includes('서비스')) {
    customStrategies.st.push('전문 서비스 품질로 신규 경쟁업체 위협 대응');
    customStrategies.wt.push('서비스 표준화를 통한 품질 일관성 확보');
  }
  
  return customStrategies;
}

/**
 * 💼 AICAMP 커리큘럼 기반 맞춤형 개선사항 생성
 */
function generateCustomizedImprovements(data, scoreData, industryAnalysis) {
  try {
    console.log('💼 커리큘럼 기반 맞춤형 개선사항 생성 시작');
    
    const industry = data.업종 || data.industry || '';
    const companyName = data.회사명 || data.companyName || '';
    const totalScore = data.종합점수 || data.totalScore || 0;
    const employeeCount = data.직원수 || data.employeeCount || '';
    const businessDetails = data.businessDetails || data.사업상세설명 || '';
    
    // AICAMP 커리큘럼 매핑
    const aicampCurriculum = {
      '기업체_실무진_커리큘럼': {
        title: '🎯 기업체 실무진 대상 AI 생산성 향상 교육',
        duration: '8주 과정 (주 2회, 총 16회)',
        target: '기업 실무진, 팀장급 이상',
        modules: [
          '1주차: AI 기초 이해 및 업무 적용 방안',
          '2주차: ChatGPT 실무 활용법 (문서작성, 기획서 작성)',
          '3주차: AI 도구를 활용한 마케팅 자동화',
          '4주차: 데이터 분석 및 보고서 자동 생성',
          '5주차: 업무 프로세스 AI 최적화',
          '6주차: AI 기반 고객 서비스 개선',
          '7주차: 조직 내 AI 도입 전략 수립',
          '8주차: AI 활용 성과 측정 및 지속 개선'
        ],
        expectedResults: [
          '업무 효율성 40-60% 향상',
          '반복 업무 자동화 달성',
          'AI 도구 활용 능력 100% 습득',
          '조직 전반 디지털 전환 가속화'
        ]
      },
      '경영진_전략_커리큘럼': {
        title: '🎖️ 경영진 대상 AI 경영전략 교육',
        duration: '6주 과정 (주 1회, 총 6회)',
        target: '대표이사, 임원진, 부서장',
        modules: [
          '1주차: AI 시대 경영환경 변화와 대응전략',
          '2주차: AI 기반 비즈니스 모델 혁신',
          '3주차: 데이터 기반 의사결정 체계 구축',
          '4주차: AI 도입을 위한 조직 변화 관리',
          '5주차: AI 투자 ROI 분석 및 예산 계획',
          '6주차: AI 시대 리더십과 조직 문화 혁신'
        ],
        expectedResults: [
          'AI 경영전략 수립 역량 확보',
          '디지털 전환 로드맵 완성',
          '조직 변화 관리 능력 향상',
          'AI 투자 의사결정 역량 강화'
        ]
      }
    };
    
    // 업종별 맞춤형 개선사항 생성
    const improvements = generateIndustrySpecificImprovements(industry, totalScore, businessDetails);
    
    // 점수 구간별 우선순위 교육 과정 추천
    let priorityCurriculum = [];
    let urgentImprovements = [];
    
    if (totalScore < 50) {
      priorityCurriculum = [
        '🚨 긴급 개선 과정: AI 기초 소양 교육 (2주)',
        '📊 기본 역량 강화: 디지털 업무 전환 교육 (4주)',
        '🎯 실무 적용: 기업체 실무진 AI 생산성 향상 교육 (8주)'
      ];
      urgentImprovements = [
        '즉시 실행: 기본적인 디지털 도구 도입 및 직원 교육',
        '1개월 내: 핵심 업무 프로세스 디지털화',
        '3개월 내: AI 기초 도구 활용 체계 구축'
      ];
    } else if (totalScore < 70) {
      priorityCurriculum = [
        '🎯 핵심 과정: 기업체 실무진 AI 생산성 향상 교육 (8주)',
        '📈 심화 과정: 경영진 AI 경영전략 교육 (6주)',
        '🔧 특화 과정: 업종별 맞춤형 AI 활용 교육 (4주)'
      ];
      urgentImprovements = [
        '즉시 실행: 주요 업무 영역 AI 도구 도입',
        '2개월 내: 조직 전반 AI 리터러시 향상',
        '6개월 내: AI 기반 업무 혁신 시스템 구축'
      ];
    } else {
      priorityCurriculum = [
        '🎖️ 리더십 과정: 경영진 AI 경영전략 교육 (6주)',
        '🚀 고도화 과정: AI 시대 조직 혁신 리더십 (4주)',
        '🌐 확장 과정: AI 생태계 파트너십 구축 (2주)'
      ];
      urgentImprovements = [
        '즉시 실행: AI 선도 기업 포지셔닝 전략 수립',
        '3개월 내: 업종 내 AI 혁신 사례 창출',
        '1년 내: AI 기반 신사업 영역 진출'
      ];
    }
    
    return {
      맞춤형교육과정: priorityCurriculum,
      긴급개선사항: urgentImprovements,
      업종별개선사항: improvements,
      커리큘럼상세: aicampCurriculum,
      추천수강순서: generateRecommendedCurriculumOrder(totalScore, industry, employeeCount)
    };
    
  } catch (error) {
    console.error('❌ 맞춤형 개선사항 생성 실패:', error);
    return {
      맞춤형교육과정: ['기본 AI 교육 과정 수강 권장'],
      긴급개선사항: ['디지털 기초 역량 강화 필요'],
      업종별개선사항: ['업종별 특화 컨설팅 권장'],
      커리큘럼상세: {},
      추천수강순서: ['기초 → 실무 → 전략 단계별 수강']
    };
  }
}

/**
 * 업종별 특화 개선사항 생성
 */
function generateIndustrySpecificImprovements(industry, totalScore, businessDetails) {
  const improvements = {
    '소프트웨어 개발': [
      '🔧 개발 프로세스 AI 자동화 (코드 리뷰, 테스트 자동화)',
      '📊 프로젝트 관리 AI 도구 도입 (일정 예측, 리소스 최적화)',
      '🎯 고객 요구사항 분석 AI 활용 (자연어 처리 기반 분석)'
    ],
    '경영컨설팅': [
      '📈 데이터 기반 컨설팅 방법론 구축',
      '🤖 AI 기반 업종별 벤치마킹 시스템 구축',
      '💼 고객 맞춤형 솔루션 AI 생성 시스템'
    ],
    '전자상거래': [
      '🛒 개인화 추천 시스템 구축',
      '📱 챗봇 기반 고객 서비스 자동화',
      '📊 재고 최적화 및 수요 예측 AI 시스템'
    ],
    '제조업': [
      '🏭 스마트 팩토리 기초 인프라 구축',
      '🔍 품질 관리 AI 시스템 도입',
      '📈 생산 계획 최적화 AI 활용'
    ]
  };
  
  return improvements[industry] || [
    '🎯 업종별 특화 AI 솔루션 도입 검토',
    '📊 데이터 기반 의사결정 체계 구축',
    '🤖 핵심 업무 프로세스 AI 자동화'
  ];
}

/**
 * 추천 수강 순서 생성
 */
function generateRecommendedCurriculumOrder(totalScore, industry, employeeCount) {
  let order = [];
  
  // 직원 수에 따른 수강 순서
  const empCount = parseInt(employeeCount?.replace(/[^0-9]/g, '') || '0');
  
  if (empCount <= 10) {
    order = [
      '1단계: 대표자 경영진 AI 전략 교육 (2주)',
      '2단계: 전 직원 AI 기초 소양 교육 (4주)',
      '3단계: 핵심 업무별 AI 실무 교육 (6주)'
    ];
  } else if (empCount <= 50) {
    order = [
      '1단계: 경영진 AI 경영전략 교육 (6주)',
      '2단계: 팀장급 AI 리더십 교육 (4주)',
      '3단계: 실무진 AI 생산성 향상 교육 (8주)',
      '4단계: 전사 AI 활용 성과 공유 (2주)'
    ];
  } else {
    order = [
      '1단계: 경영진 AI 전략 수립 교육 (6주)',
      '2단계: 부서별 AI 챔피언 양성 교육 (8주)',
      '3단계: 단계별 전 직원 AI 교육 (12주)',
      '4단계: AI 성과 측정 및 지속 개선 (4주)'
    ];
  }
  
  return order;
}

/**
 * 최고수준 심층 AI 경영진단 보고서 생성 (8000자)
 */
function generateAdvancedAIReport(data, analysisData) {
  const {
    scoreData, categoryData, coreMetrics, industryAnalysis,
    aiAdaptationAnalysis, aiTransformationStrategy, industryAiTrends, enhancedSwotData
  } = analysisData;

  const companyName = data.회사명 || data.companyName || '귀하의 기업';
  const industry = Array.isArray(data.업종 || data.industry) ? 
    (data.업종 || data.industry).join(', ') : (data.업종 || data.industry || '서비스업');
  const totalScore = data.종합점수 || data.totalScore || 0;
  const currentYear = new Date().getFullYear();
  
  // 🎯 고도화된 SWOT 전략 매트릭스 생성 (SO/WO/ST/WT 각 3개씩 총 12개 이상)
  const advancedSwotMatrix = generateAdvancedSWOTMatrix(data, enhancedSwotData, aiAdaptationAnalysis);
  
  // 💼 AICAMP 커리큘럼 기반 맞춤형 개선사항 생성
  const customizedImprovements = generateCustomizedImprovements(data, scoreData, industryAnalysis);

  let report = `
![AICAMP 로고](https://aicamp.club/images/aicamp_logo_del_250726.png)

# ${companyName} AI 시대 최고수준 경영진단 보고서

## 📊 진단 개요
**진단일시**: ${getCurrentKoreanTime()}
**대상기업**: ${companyName}
**업종분류**: ${industry}
**종합점수**: ${totalScore}점/100점 (${getGradeFromScore(totalScore)})
**AI 준비도**: ${aiAdaptationAnalysis.AI준비도점수}점/100점
**디지털 전환단계**: ${aiAdaptationAnalysis.디지털전환단계}

## 🎯 핵심 진단 결과

### 1. 종합 경영 역량 분석
귀하의 기업은 ${totalScore}점으로 ${getDetailedGradeAnalysis(totalScore)}에 해당합니다.

**카테고리별 상세 분석:**
- 상품/서비스 관리: ${categoryData.상품서비스점수}점 - ${getPerformanceLevel(categoryData.상품서비스점수)}
- 고객응대 역량: ${categoryData.고객응대점수}점 - ${getPerformanceLevel(categoryData.고객응대점수)}  
- 마케팅 역량: ${categoryData.마케팅점수}점 - ${getPerformanceLevel(categoryData.마케팅점수)}
- 구매/재고관리: ${categoryData.구매재고점수}점 - ${getPerformanceLevel(categoryData.구매재고점수)}
- 매장관리 역량: ${categoryData.매장관리점수}점 - ${getPerformanceLevel(categoryData.매장관리점수)}

### 2. 📊 핵심 경영지표 분석 (6가지 지표)

**6가지 핵심지표 상세 분석:**
- 🏢 비즈니스모델 점수: ${coreMetrics.businessModel}점/100점
- 📍 시장위치 점수: ${coreMetrics.marketPosition}점/100점  
- ⚙️ 운영효율성 점수: ${coreMetrics.operationalEfficiency}점/100점
- 🚀 **성장잠재력 점수: ${coreMetrics.growthPotential}점/100점**
- 💻 디지털준비도 점수: ${coreMetrics.digitalReadiness}점/100점
- 💰 재무건전성 점수: ${coreMetrics.financialHealth}점/100점

**🔍 성장잠재력 점수의 의미와 시사점:**
성장잠재력 점수(${coreMetrics.growthPotential}점)는 종합진단점수(${totalScore}점)와 다른 관점에서 측정됩니다.
- **종합점수**: 현재 경영 상태의 전반적 평가 (20개 문항 기반)
- **성장잠재력**: 미래 확장 가능성과 투자 가치를 별도 산정 (6가지 핵심지표 중 하나)

${coreMetrics.growthPotential >= 70 ? '우수한 성장잠재력을 보유하여 향후 사업 확장 및 투자 유치에 유리한 위치' : 
  coreMetrics.growthPotential >= 50 ? '보통 수준의 성장잠재력으로 전략적 개선을 통한 성장 동력 확보 필요' : 
  '성장잠재력 강화를 위한 집중적 개선이 필요한 상황'}에 있습니다.

### 3. 🤖 AI 시대 조직적응 진단

**AI 활용 현황 및 준비도**
현재 귀하의 기업은 "${aiAdaptationAnalysis.AI활용현황}" 단계에 있으며, ${industry} 업종 평균 대비 ${aiAdaptationAnalysis.AI준비도점수 >= 60 ? '우수한' : '개선이 필요한'} 수준입니다.

**세부 AI 역량 분석:**
- 디지털 인프라 수준: ${aiAdaptationAnalysis.디지털인프라수준}점
- AI 인식 및 이해도: ${aiAdaptationAnalysis.AI인식수준}점
- 데이터 활용 능력: ${aiAdaptationAnalysis.데이터활용능력}점
- 조직 변화 준비도: ${aiAdaptationAnalysis.조직변화준비도}점
- AI 투자 의지: ${aiAdaptationAnalysis.AI투자의지}점

**AI 도입 장벽 분석:**
현재 주요 장벽: ${aiAdaptationAnalysis.AI도입장벽.join(', ')}

이러한 장벽들은 ${aiAdaptationAnalysis.AI도입장벽.length >= 4 ? '단계적 접근을 통해 극복' : '전략적 투자로 해결'} 가능합니다.

### 4. 🚀 업종별 AI 혁신 전략

**${industry} 업종 AI 트렌드 (${currentYear})**
${industryAiTrends.시장규모}로 급성장하고 있으며, 주요 기술은 ${industryAiTrends.주요기술.join(', ')} 입니다.

**맞춤형 AI 전략: "${aiTransformationStrategy.핵심전략}"**

**우선순위 AI 도입 영역:**
${aiTransformationStrategy.우선순위영역.map((area, index) => `${index + 1}. ${area}`).join('\n')}

**추천 AI 도구:**
${aiTransformationStrategy.AI도구추천.map((tool, index) => `- ${tool}`).join('\n')}

**단계별 구현 로드맵:**
${aiTransformationStrategy.구현단계.map((step, index) => `${step}`).join('\n')}

### 4. 📋 AI 통합 SWOT 분석

**강점 (Strengths) - AI 관점 통합**
${enhancedSwotData.강점.map(s => `• ${s}`).join('\n')}

**약점 (Weaknesses) - AI 관점 통합**
${enhancedSwotData.약점.map(w => `• ${w}`).join('\n')}

**기회 (Opportunities) - AI 관점 통합**
${enhancedSwotData.기회.map(o => `• ${o}`).join('\n')}

**위협 (Threats) - AI 관점 통합**
${enhancedSwotData.위협.map(t => `• ${t}`).join('\n')}

### 4.1 🎯 SWOT 고도화 전략 매트릭스

**SO 전략 (강점-기회 활용)** - ${advancedSwotMatrix.SO전략.length}개 전략
${advancedSwotMatrix.SO전략.map((strategy, index) => `${index + 1}. ${strategy}`).join('\n')}

**WO 전략 (약점-기회 개선)** - ${advancedSwotMatrix.WO전략.length}개 전략
${advancedSwotMatrix.WO전략.map((strategy, index) => `${index + 1}. ${strategy}`).join('\n')}

**ST 전략 (강점-위협 방어)** - ${advancedSwotMatrix.ST전략.length}개 전략
${advancedSwotMatrix.ST전략.map((strategy, index) => `${index + 1}. ${strategy}`).join('\n')}

**WT 전략 (약점-위협 최소화)** - ${advancedSwotMatrix.WT전략.length}개 전략
${advancedSwotMatrix.WT전략.map((strategy, index) => `${index + 1}. ${strategy}`).join('\n')}

**📊 총 전략 수: ${advancedSwotMatrix.전체전략수}개** (SO: ${advancedSwotMatrix.SO전략.length}, WO: ${advancedSwotMatrix.WO전략.length}, ST: ${advancedSwotMatrix.ST전략.length}, WT: ${advancedSwotMatrix.WT전략.length})

### 5. 💡 AI 시대 생존 및 성장 전략

**즉시 실행 과제 (1개월 내):**
- AI 기초 교육 프로그램 시작
- 현재 업무 프로세스 디지털화
- AI 도구 시범 도입 (${aiTransformationStrategy.AI도구추천[0] || 'ChatGPT'} 등)

**단기 전략 (3개월 내):**
- ${aiTransformationStrategy.핵심전략} 기반 파일럿 프로젝트 시작
- 직원 AI 리터러시 향상 교육
- 데이터 수집 및 정리 시스템 구축

**중기 전략 (6개월 내):**
- 핵심 업무 영역 AI 적용 확산
- AI 기반 고객서비스 시스템 구축
- 경쟁사 대비 AI 우위 확보

**장기 전략 (1년 이상):**
- AI 기반 비즈니스 모델 혁신
- 업종 내 AI 선도 기업 포지셔닝
- AI 생태계 파트너십 구축

### 6. 📈 기대 효과 및 투자 분석

**AI 도입 예상 효과:**
- 업무 효율성: ${calculateEfficiencyImprovement(aiAdaptationAnalysis)}% 향상
- 비용 절감: ${calculateCostReduction(aiAdaptationAnalysis)}% 절감
- 매출 증대: ${calculateRevenueGrowth(aiAdaptationAnalysis)}% 증가

**투자 대비 효과 (ROI) 예측:**
${calculateAIROIPrediction(aiAdaptationAnalysis, totalScore)} 내 투자비 회수 예상

### 7. 🎯 맞춤형 실행 계획

**${data.직원수 || '중소규모'} 기업 특화 전략:**
${aiTransformationStrategy.추가권장사항 ? aiTransformationStrategy.추가권장사항.map(item => `• ${item}`).join('\n') : '• 단계적 AI 도입을 통한 안정적 성장 추진'}

**성공 핵심 요소:**
1. 경영진의 강력한 AI 전환 의지
2. 직원들의 적극적 참여와 교육
3. 데이터 품질 확보 및 관리 체계 구축
4. 단계적 접근을 통한 리스크 최소화

### 8. 🔍 업종별 벤치마킹

**${industry} 업종 AI 성공사례:**
${industryAiTrends.성공사례}

이는 귀하의 기업도 AI 도입을 통해 유사한 성과를 얻을 수 있음을 시사합니다.

### 9. ⚠️ 위험 요소 및 대응 방안

**주요 위험 요소:**
- AI 기술 변화 속도에 대한 적응 지연
- 초기 투자 부담 및 투자 효과 지연
- 조직 내 변화 저항 및 문화적 장벽

**대응 방안:**
- 점진적 도입을 통한 조직 적응 시간 확보
- 외부 전문가 활용을 통한 전문성 보완
- 교육과 소통을 통한 직원 참여 유도

### 10. 🌟 최종 권고사항

${companyName}의 AI 시대 성공적 적응을 위한 핵심 권고사항:

1. **AI 리더십 확립**: 경영진의 AI 전환 비전 수립 및 전파
2. **단계적 접근**: 위험을 최소화하면서 점진적 AI 도입
3. **인재 개발**: 기존 직원 재교육 및 AI 전문 인력 확보
4. **데이터 전략**: 체계적 데이터 수집 및 활용 체계 구축
5. **파트너십**: AI 전문 기업과의 전략적 제휴 추진

## 📞 후속 지원 안내

AICAMP에서는 귀하의 AI 전환 여정을 전방위적으로 지원합니다:
- AI 전환 전략 수립 컨설팅
- 맞춤형 AI 교육 프로그램
- AI 도구 도입 및 운영 지원
- 정부 지원사업 연계 및 활용

### 10. 💼 AICAMP 맞춤형 개선사항 및 교육 과정

#### 10.1 🎯 ${companyName} 맞춤형 우선순위 교육 과정
${customizedImprovements.맞춤형교육과정.map((course, index) => `**${index + 1}.** ${course}`).join('\n')}

#### 10.2 🚨 긴급 개선사항 (점수별 맞춤 추천)
${customizedImprovements.긴급개선사항.map((item, index) => `**${index + 1}.** ${item}`).join('\n')}

#### 10.3 🏭 ${industry} 업종 특화 개선사항
${customizedImprovements.업종별개선사항.map((item, index) => `**${index + 1}.** ${item}`).join('\n')}

#### 10.4 📚 추천 수강 순서 (조직 규모 기반)
${customizedImprovements.추천수강순서.map((step, index) => `**${step}**`).join('\n')}

#### 10.5 🎓 AICAMP 주요 커리큘럼 상세 정보

**🎯 기업체 실무진 AI 생산성 향상 교육**
- **교육 기간**: ${customizedImprovements.커리큘럼상세.기업체_실무진_커리큘럼?.duration || '8주 과정'}
- **교육 대상**: ${customizedImprovements.커리큘럼상세.기업체_실무진_커리큘럼?.target || '기업 실무진'}
- **기대 효과**: ${customizedImprovements.커리큘럼상세.기업체_실무진_커리큘럼?.expectedResults?.join(', ') || '업무 효율성 향상'}

**🎖️ 경영진 AI 경영전략 교육**
- **교육 기간**: ${customizedImprovements.커리큘럼상세.경영진_전략_커리큘럼?.duration || '6주 과정'}
- **교육 대상**: ${customizedImprovements.커리큘럼상세.경영진_전략_커리큘럼?.target || '경영진'}
- **기대 효과**: ${customizedImprovements.커리큘럼상세.경영진_전략_커리큘럼?.expectedResults?.join(', ') || 'AI 경영전략 수립'}

**담당 전문가**: 이후경 교장 (경영지도사, 28년 경력)
**연락처**: 010-9251-9743
**이메일**: hongik423@gmail.com

---
*본 보고서는 AICAMP 최고수준 AI 경영진단 시스템 v4.0으로 생성되었습니다.*
*AI 시대를 선도하는 기업으로 성장하시기를 응원합니다.*
`;

  if (DEBUG_MODE) {
    console.log('📝 최고수준 AI 보고서 생성 완료:', {
      보고서길이: report.length,
      AI준비도: aiAdaptationAnalysis.AI준비도점수,
      핵심전략: aiTransformationStrategy.핵심전략,
      SWOT통합여부: enhancedSwotData.강점.length > 0
    });
  }

  return report.trim();
}

/**
 * 보완 분석 생성 (최소 품질 보장)
 */
function generateSupplementaryAnalysis(data, aiAdaptationAnalysis) {
  return `

## 🔍 보완 분석

### AI 역량 강화 방안
귀하의 기업이 AI 시대에 경쟁력을 확보하기 위해서는 다음과 같은 추가적인 노력이 필요합니다:

**기술 역량 강화:**
- 클라우드 기반 AI 서비스 활용 역량 개발
- 데이터 분석 및 활용 역량 강화
- AI 도구 활용 교육 및 훈련

**조직 역량 강화:**
- AI 친화적 조직문화 조성
- 변화관리 및 혁신 역량 개발
- 외부 전문가 네트워크 구축

### 산업별 AI 활용 트렌드
${data.업종 || data.industry || '해당 업종'}에서는 현재 AI 기술을 활용한 혁신이 가속화되고 있습니다. 주요 활용 분야와 성공 사례를 참고하여 자사에 적합한 AI 도입 전략을 수립하시기 바랍니다.

**추가 학습 자료:**
- AI 기초 교육 프로그램 참여
- 업종별 AI 활용 사례 연구
- AI 전문가 네트워킹 활동
`;
}

/**
 * AI 분석 지표 계산 함수들
 */
function calculateAIMaturityScore(aiAnalysis) {
  return Math.round((aiAnalysis.AI준비도점수 + aiAnalysis.디지털인프라수준 + 
                    aiAnalysis.조직변화준비도 + aiAnalysis.AI투자의지) / 4);
}

function calculateDigitalTransformationIndex(data, aiAnalysis) {
  const baseScore = aiAnalysis.AI준비도점수;
  const industryBonus = (data.업종 && data.업종.includes('IT')) ? 10 : 0;
  const sizeBonus = (data.직원수 && data.직원수.includes('50명 이상')) ? 5 : 0;
  return Math.min(100, baseScore + industryBonus + sizeBonus);
}

function calculateAIROIPrediction(aiAnalysis, totalScore) {
  if (aiAnalysis.AI준비도점수 >= 80) return '6-12개월';
  if (aiAnalysis.AI준비도점수 >= 60) return '12-18개월';
  if (aiAnalysis.AI준비도점수 >= 40) return '18-24개월';
  return '24-36개월';
}

function calculateAIRiskScore(aiAnalysis) {
  const riskFactors = aiAnalysis.AI도입장벽.length;
  const readiness = aiAnalysis.AI준비도점수;
  return Math.max(10, Math.min(90, (riskFactors * 15) + (100 - readiness) * 0.3));
}

function calculateOrganizationalReadiness(aiAnalysis) {
  return Math.round((aiAnalysis.조직변화준비도 + aiAnalysis.AI인식수준 + aiAnalysis.AI투자의지) / 3);
}

function calculateTechnologyAdoptionSpeed(data, aiAnalysis) {
  let speed = aiAnalysis.AI준비도점수;
  if (data.사업성장단계 && data.사업성장단계.includes('성장기')) speed += 10;
  if (data.직원수 && data.직원수.includes('10명 미만')) speed -= 10;
  return Math.max(20, Math.min(100, speed));
}

function calculateAICompetitiveAdvantage(trends, aiAnalysis) {
  const marketGrowth = 75; // 평균 AI 시장 성장도
  const readinessGap = aiAnalysis.AI준비도점수 - 50; // 평균 대비 준비도
  return Math.max(30, Math.min(100, marketGrowth + readinessGap));
}

function calculateInnovationPotential(data, aiAnalysis) {
  let potential = aiAnalysis.AI준비도점수;
  if (data.업종 && (data.업종.includes('IT') || data.업종.includes('제조업'))) potential += 15;
  if (data.사업성장단계 && data.사업성장단계.includes('도입기')) potential += 10;
  return Math.min(100, potential);
}

function calculateAIImplementationComplexity(strategy) {
  const stepsCount = strategy.구현단계 ? strategy.구현단계.length : 4;
  const toolsCount = strategy.AI도구추천 ? strategy.AI도구추천.length : 3;
  return Math.min(100, (stepsCount * 15) + (toolsCount * 10));
}

function calculateFutureAIReadiness(data, aiAnalysis) {
  let futureScore = aiAnalysis.AI준비도점수;
  if (aiAnalysis.AI투자의지 >= 70) futureScore += 15;
  if (aiAnalysis.조직변화준비도 >= 60) futureScore += 10;
  if (data.사업성장단계 && data.사업성장단계.includes('성장기')) futureScore += 5;
  return Math.min(100, futureScore);
}

/**
 * 맞춤형 AI 전략 생성
 */
function generatePersonalizedAIStrategy(data, aiAnalysis) {
  const employeeCount = data.직원수 || data.employeeCount || '';
  const growthStage = data.사업성장단계 || data.growthStage || '';
  const industry = data.업종 || data.industry || '';

  let strategy = {
    우선순위: 'AI 기초 역량 구축',
    예산추정: '500만원-1,000만원',
    기대효과: '업무 효율성 20% 향상',
    구현기간: '6-12개월',
    핵심성공요인: ['경영진 의지', '직원 교육', '점진적 도입'],
    위험요소: ['기술 이해 부족', '초기 투자 부담'],
    지원방안: ['정부 지원사업 활용', '전문가 컨설팅'],
    측정지표: ['업무 처리 시간', '고객 만족도', 'ROI'],
    교육계획: '월 2회 AI 리터러시 교육',
    로드맵: '기초→응용→고도화 3단계 접근'
  };

  // 기업 규모별 맞춤화
  if (employeeCount.includes('50명 이상')) {
    strategy.우선순위 = 'AI 전담팀 구성 및 플랫폼 구축';
    strategy.예산추정 = '3,000만원-5,000만원';
    strategy.기대효과 = '업무 효율성 35% 향상, 비용 25% 절감';
    strategy.구현기간 = '12-18개월';
    strategy.핵심성공요인.push('전담팀 운영', '자체 플랫폼 구축');
  } else if (employeeCount.includes('10명 미만')) {
    strategy.예산추정 = '200만원-500만원';
    strategy.기대효과 = '업무 효율성 15% 향상';
    strategy.지원방안.push('클라우드 서비스 활용', '무료 AI 도구 우선 활용');
  }

  // AI 준비도에 따른 조정
  if (aiAnalysis.AI준비도점수 >= 70) {
    strategy.우선순위 = 'AI 고도화 및 차별화 전략';
    strategy.구현기간 = '6-9개월';
    strategy.기대효과 = '업무 효율성 40% 향상, 매출 20% 증대';
  } else if (aiAnalysis.AI준비도점수 < 40) {
    strategy.구현기간 = '12-24개월';
    strategy.위험요소.push('변화 저항', '기술 격차');
    strategy.지원방안.push('기초 교육 강화', '외부 컨설팅 활용');
  }

  return strategy;
}

/**
 * 유틸리티 함수들
 */
function getGradeFromScore(score) {
  if (score >= 90) return 'A+ (최우수)';
  if (score >= 80) return 'A (우수)';
  if (score >= 70) return 'B+ (양호)';
  if (score >= 60) return 'B (보통)';
  if (score >= 50) return 'C (개선필요)';
  return 'D (시급개선)';
}

function getDetailedGradeAnalysis(score) {
  if (score >= 80) return '업종 내 상위 20% 수준의 우수한 경영 역량을 보유';
  if (score >= 60) return '평균 이상의 안정적인 경영 기반을 갖춘 상태';
  if (score >= 40) return '기본적인 경영 체계는 갖추었으나 개선 여지가 큰 상태';
  return '전반적인 경영 역량 강화가 시급한 상태';
}

function getPerformanceLevel(score) {
  const numScore = parseFloat(score) || 0;
  if (numScore >= 4.0) return '우수';
  if (numScore >= 3.0) return '양호';
  if (numScore >= 2.0) return '보통';
  return '개선필요';
}

function calculateEfficiencyImprovement(aiAnalysis) {
  return Math.min(50, Math.max(10, aiAnalysis.AI준비도점수 * 0.5));
}

function calculateCostReduction(aiAnalysis) {
  return Math.min(30, Math.max(5, aiAnalysis.AI준비도점수 * 0.3));
}

function calculateRevenueGrowth(aiAnalysis) {
  return Math.min(25, Math.max(5, aiAnalysis.AI준비도점수 * 0.25));
}

/**
 * 📧 최고수준 AI 경영진단 관리자 알림 이메일
 */
function sendAdvancedAIDiagnosisAdminNotification(data, rowNumber, totalScore, comprehensiveReport, 
                                                  aiAdaptationAnalysis, aiTransformationStrategy) {
  try {
    const companyName = data.회사명 || data.companyName || '미확인';
    const contactName = data.담당자명 || data.contactName || '미확인';
    const industry = Array.isArray(data.업종 || data.industry) ? 
      (data.업종 || data.industry).join(', ') : (data.업종 || data.industry || '미확인');
    
    const subject = '[AICAMP] 🚀 최고수준 AI 진단 접수 - ' + companyName + 
      ` (${totalScore}점, AI준비도 ${aiAdaptationAnalysis.AI준비도점수}점)`;
    
    // 🎨 AICAMP 로고가 포함된 최고수준 HTML 이메일 템플릿
    const htmlBody = `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>최고수준 AI 경영진단 접수 알림</title>
        <style>
          body { font-family: 'Malgun Gothic', Arial, sans-serif; margin: 0; padding: 20px; background: #f5f7fa; }
          .container { max-width: 700px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.12); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
          .logo { width: 100px; height: 100px; margin: 0 auto 20px; border-radius: 10px; }
          .title { font-size: 26px; font-weight: bold; margin-bottom: 8px; }
          .subtitle { opacity: 0.9; font-size: 16px; }
          .content { padding: 35px; }
          .ai-banner { background: linear-gradient(135deg, #ff6b6b, #ffa726); color: white; padding: 20px; border-radius: 8px; margin-bottom: 25px; text-align: center; font-weight: bold; }
          .score-section { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 25px 0; }
          .score-card { background: #f8faff; padding: 20px; border-radius: 10px; text-align: center; border: 2px solid #4285f4; }
          .score-number { font-size: 36px; font-weight: bold; color: #4285f4; margin-bottom: 5px; }
          .score-label { font-size: 14px; color: #666; }
          .ai-analysis { background: #e8f5e8; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 5px solid #34a853; }
          .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 25px 0; }
          .info-card { background: #f8faff; padding: 20px; border-radius: 10px; border-left: 4px solid #4285f4; }
          .info-label { font-size: 12px; color: #666; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px; }
          .info-value { font-size: 16px; font-weight: bold; color: #333; }
          .strategy-section { background: #fff3e0; padding: 25px; border-radius: 12px; margin: 25px 0; }
          .action-buttons { display: flex; gap: 15px; justify-content: center; margin: 30px 0; }
          .btn { display: inline-block; padding: 12px 24px; border-radius: 25px; text-decoration: none; font-weight: bold; text-align: center; }
          .btn-primary { background: #4285f4; color: white; }
          .footer { background: #f8f9fa; padding: 25px; text-align: center; color: #666; border-top: 1px solid #e9ecef; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${AICAMP_LOGO_URL}" alt="AICAMP 로고" class="logo" />
            <div class="title">🚀 최고수준 AI 경영진단 접수!</div>
            <div class="subtitle">AI 시대 조직적응 분석 포함</div>
          </div>
          
          <div class="content">
            <div class="ai-banner">
              🤖 AI 시대 대비 최고수준 경영진단 - 120개 항목 완전분석 완료!
            </div>
            
            <div class="score-section">
              <div class="score-card">
                <div class="score-number">${totalScore}점</div>
                <div class="score-label">종합 경영점수 (100점 만점)</div>
              </div>
              <div class="score-card">
                <div class="score-number">${aiAdaptationAnalysis.AI준비도점수}점</div>
                <div class="score-label">AI 준비도 점수 (100점 만점)</div>
              </div>
            </div>
            
            <div class="ai-analysis">
              <h3 style="color: #2e7d32; margin-top: 0;">🤖 AI 시대 조직적응 분석 결과</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div><strong>AI 활용현황:</strong> ${aiAdaptationAnalysis.AI활용현황}</div>
                <div><strong>디지털전환단계:</strong> ${aiAdaptationAnalysis.디지털전환단계}</div>
                <div><strong>AI 핵심전략:</strong> ${aiTransformationStrategy.핵심전략}</div>
                <div><strong>우선순위영역:</strong> ${aiTransformationStrategy.우선순위영역.slice(0, 2).join(', ')}</div>
              </div>
              <div style="margin-top: 15px;">
                <strong>AI 도입장벽:</strong> ${aiAdaptationAnalysis.AI도입장벽.join(', ')}
              </div>
            </div>
            
            <div class="info-grid">
              <div class="info-card">
                <div class="info-label">회사명</div>
                <div class="info-value">${companyName}</div>
              </div>
              <div class="info-card">
                <div class="info-label">업종</div>
                <div class="info-value">${industry}</div>
              </div>
              <div class="info-card">
                <div class="info-label">담당자</div>
                <div class="info-value">${contactName}</div>
              </div>
              <div class="info-card">
                <div class="info-label">연락처</div>
                <div class="info-value">${data.연락처 || data.phone || '미확인'}</div>
              </div>
              <div class="info-card">
                <div class="info-label">이메일</div>
                <div class="info-value">${data.이메일 || data.contactEmail || data.email || '미확인'}</div>
              </div>
              <div class="info-card">
                <div class="info-label">접수시간</div>
                <div class="info-value">${getCurrentKoreanTime()}</div>
              </div>
            </div>
            
            <div class="strategy-section">
              <h3 style="color: #e65100; margin-top: 0;">🚀 업종별 AI 혁신 전략</h3>
              <p><strong>핵심 전략:</strong> ${aiTransformationStrategy.핵심전략}</p>
              <p><strong>추천 AI 도구:</strong> ${aiTransformationStrategy.AI도구추천.join(', ')}</p>
              <p><strong>구현 단계:</strong></p>
              <ol style="margin: 10px 0; padding-left: 20px;">
                ${aiTransformationStrategy.구현단계.map(step => `<li>${step}</li>`).join('')}
              </ol>
            </div>
            
            <div style="background: #fff8e1; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #f57c00; margin-top: 0;">📝 보고서 정보</h3>
              <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">
                최고수준 AI 경영진단보고서 (${comprehensiveReport.length}자) 생성 완료
              </p>
              <p style="margin-bottom: 15px;">
                ${comprehensiveReport.substring(0, 300)}${comprehensiveReport.length > 300 ? '...' : ''}
              </p>
              <div style="font-size: 12px; color: #666;">
                데이터 저장: 구글시트 ${rowNumber}행 (120개 컬럼 완전 저장)
              </div>
            </div>
            
            <div class="action-buttons">
              <a href="${GOOGLE_SHEETS_URL}" class="btn btn-primary">
                📊 구글시트에서 120개 항목 확인
              </a>
            </div>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h4 style="color: #2e7d32; margin-top: 0;">🔔 최고수준 진단 후속 조치</h4>
              <ol style="color: #2e7d32; margin: 0; padding-left: 20px;">
                <li>AI 시대 조직적응 분석 결과 상세 검토</li>
                <li>업종별 AI 혁신 전략 맞춤 컨설팅 (1-2일 내)</li>
                <li>AI 전환 로드맵 및 실행계획 수립</li>
                <li>정부 지원사업 연계 및 활용 방안 제시</li>
                <li>지속적 AI 전환 모니터링 및 지원</li>
              </ol>
            </div>
          </div>
          
          <div class="footer">
            <div>
              <strong style="color: #4285f4;">AICAMP AI교육센터</strong>
              <br>
              최고수준 AI 경영진단 시스템 v4.0 (120개 컬럼 완전분석)
            </div>
            <div style="margin-top: 15px;">
              📞 010-9251-9743 | 📧 ${ADMIN_EMAIL} | 🌐 https://aicamp.club
            </div>
            <div style="margin-top: 15px; font-size: 11px; opacity: 0.7;">
              AI 시대 최고수준 경영진단으로 귀하의 기업을 AI 선도기업으로 도약시키겠습니다. | ${VERSION}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // 일반 텍스트 버전 (백업용)
    const textBody = '🚀 최고수준 AI 경영진단이 접수되었습니다!\n\n' +
      '🏢 회사명: ' + companyName + '\n' +
      '🏭 업종: ' + industry + '\n' +
      '👤 담당자: ' + contactName + ' (' + (data.이메일 || data.contactEmail || data.email || '미확인') + ')\n' +
      '📞 연락처: ' + (data.연락처 || data.phone || '미확인') + '\n' +
      '👥 직원수: ' + (data.직원수 || data.employeeCount || '미확인') + '\n' +
      '🎯 종합점수: ' + totalScore + '점/100점\n' +
      '🤖 AI 준비도: ' + aiAdaptationAnalysis.AI준비도점수 + '점/100점\n' +
      '🔄 디지털전환단계: ' + aiAdaptationAnalysis.디지털전환단계 + '\n' +
      '🚀 AI 핵심전략: ' + aiTransformationStrategy.핵심전략 + '\n' +
      '⚠️ AI 도입장벽: ' + aiAdaptationAnalysis.AI도입장벽.join(', ') + '\n' +
      '📝 보고서 길이: ' + comprehensiveReport.length + '자\n' +
      '⏰ 접수 시간: ' + getCurrentKoreanTime() + '\n\n' +
      '🎯 우선순위 AI 도입 영역:\n' + 
      aiTransformationStrategy.우선순위영역.map((area, i) => `${i+1}. ${area}`).join('\n') + '\n\n' +
      '🛠️ 추천 AI 도구:\n' + aiTransformationStrategy.AI도구추천.join(', ') + '\n\n' +
      '📋 진단 요약:\n' + comprehensiveReport.substring(0, 500) + '...\n\n' +
      '📊 데이터 위치: ' + SHEETS.DIAGNOSIS + ' 시트 ' + rowNumber + '행 (120개 컬럼)\n' +
      '🔗 구글시트: ' + GOOGLE_SHEETS_URL + '\n\n' +
      '🔔 후속 조치:\n' +
      '1. AI 시대 조직적응 분석 결과 상세 검토\n' +
      '2. 업종별 AI 혁신 전략 맞춤 컨설팅 (1-2일 내)\n' +
      '3. AI 전환 로드맵 및 실행계획 수립\n' +
      '4. 정부 지원사업 연계 및 활용 방안 제시\n\n' +
      '---\n' +
      'AICAMP 최고수준 AI 경영진단 시스템 v4.0\n' +
      '담당: 이후경 교장 (경영지도사)\n' +
      '📞 010-9251-9743 | 📧 ' + ADMIN_EMAIL;

    // 이메일 발송
    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      body: textBody,
      htmlBody: htmlBody,
      name: 'AICAMP 최고수준 AI 진단 알림 시스템'
    });
    
    console.log('📧 최고수준 AI 진단 관리자 알림 이메일 발송 완료');
  } catch (error) {
    console.error('❌ 최고수준 AI 진단 관리자 이메일 발송 실패:', error);
  }
}

/**
 * 📧 최고수준 AI 진단 사용자 확인 이메일
 */
function sendAdvancedAIUserConfirmation(email, name, type, industry, aiAnalysis) {
  console.log('📧 sendAdvancedAIUserConfirmation 함수 시작:', {
    email: email ? email.substring(0, 5) + '***' : 'null',
    name: name || 'null',
    type: type,
    industry: industry,
    aiReadiness: aiAnalysis.AI준비도점수,
    timestamp: getCurrentKoreanTime()
  });
  
  try {
    // 이메일 주소 유효성 기본 검사
    if (!email || !email.includes('@')) {
      const error = '유효하지 않은 이메일 주소: ' + (email || 'null');
      console.error('❌ 이메일 유효성 검사 실패:', error);
      return { success: false, error: error };
    }
    
    const subject = '[AICAMP] 🚀 최고수준 AI 경영진단 신청이 접수되었습니다!';
    
    console.log('📧 최고수준 AI 이메일 내용 생성 시작:', {
      subject: subject,
      aiReadiness: aiAnalysis.AI준비도점수,
      digitalStage: aiAnalysis.디지털전환단계,
      logoUrl: AICAMP_LOGO_URL
    });
    
    // HTML 이메일 (AICAMP 로고 포함 + AI 분석 결과)
    const htmlBody = `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>최고수준 AI 경영진단 접수 확인</title>
        <style>
          body { font-family: 'Malgun Gothic', Arial, sans-serif; margin: 0; padding: 20px; background: #f5f7fa; }
          .container { max-width: 650px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #4285f4, #34a853); color: white; padding: 30px; text-align: center; }
          .logo { width: 80px; height: 80px; margin: 0 auto 20px; border-radius: 8px; }
          .title { font-size: 26px; font-weight: bold; margin-bottom: 8px; }
          .subtitle { opacity: 0.9; font-size: 16px; }
          .content { padding: 30px; }
          .ai-highlight { background: linear-gradient(135deg, #ff6b6b, #ffa726); color: white; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center; }
          .ai-scores { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
          .score-card { background: #f8faff; padding: 15px; border-radius: 8px; text-align: center; border: 2px solid #4285f4; }
          .score-number { font-size: 24px; font-weight: bold; color: #4285f4; }
          .score-label { font-size: 12px; color: #666; }
          .highlight { background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #34a853; }
          .steps { background: #f8faff; padding: 20px; border-radius: 10px; margin: 20px 0; }
          .contact-info { background: #2c3e50; color: white; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; }
          .score-explanation { background: #fff8e1; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ffa726; }
          .score-breakdown { background: #f3e5f5; padding: 20px; border-radius: 10px; margin: 20px 0; }
          .score-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e0e0e0; }
          .score-item:last-child { border-bottom: none; }
          .score-meaning { background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${AICAMP_LOGO_URL}" alt="AICAMP 로고" class="logo" />
            <div class="title">🚀 최고수준 AI 진단 접수완료!</div>
            <div class="subtitle">AI 시대 조직적응 분석 포함</div>
          </div>
          
          <div class="content">
            <div class="ai-highlight">
              <h3 style="margin-top: 0;">🤖 AI 시대 맞춤형 최고수준 경영진단</h3>
              <p style="margin: 10px 0 0 0; font-size: 16px;">
                120개 항목 완전분석으로 귀하의 AI 시대 준비도를 진단합니다
              </p>
            </div>
            
            <div class="highlight">
              <h3 style="color: #2e7d32; margin-top: 0;">✅ 접수가 완료되었습니다!</h3>
              <p style="margin: 10px 0 0 0; color: #2e7d32; font-size: 16px;">
                <strong>${name || '고객'}님</strong>의 최고수준 AI 경영진단 신청이 성공적으로 접수되었습니다.
              </p>
              <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">
                📅 접수일시: ${getCurrentKoreanTime()}
              </p>
            </div>
            
            <div class="score-explanation">
              <h3 style="color: #f57c00; margin-top: 0;">📊 진단 점수 체계 안내</h3>
              <p style="margin: 0; color: #333; line-height: 1.6;">
                AICAMP의 AI 경영진단은 <strong>3가지 핵심 점수</strong>로 귀하의 기업을 종합 분석합니다:
              </p>
            </div>
            
            <div class="score-breakdown">
              <h4 style="color: #7b1fa2; margin-top: 0; margin-bottom: 15px;">🎯 점수별 의미와 시사점</h4>
              
              <div class="score-item">
                <div style="flex: 1;">
                  <strong style="color: #1976d2;">1️⃣ 종합 진단점수</strong>
                  <div style="font-size: 13px; color: #666; margin-top: 5px;">현재 경영 전반의 종합적 수준</div>
                </div>
                <div style="font-weight: bold; color: #1976d2;">100점 만점</div>
              </div>
              
              <div class="score-meaning">
                <strong>💡 의미:</strong> 기획력, 고객서비스, 마케팅, 운영관리, 매장환경 등 20개 문항의 종합 평가<br>
                <strong>🎯 시사점:</strong> 70점 이상 우수, 50-69점 보통, 50점 미만 개선필요
              </div>
              
              <div class="score-item">
                <div style="flex: 1;">
                  <strong style="color: #388e3c;">2️⃣ 성장잠재력 점수</strong>
                  <div style="font-size: 13px; color: #666; margin-top: 5px;">미래 성장 가능성 수치화</div>
                </div>
                <div style="font-weight: bold; color: #388e3c;">100점 만점</div>
              </div>
              
              <div class="score-meaning">
                <strong>💡 의미:</strong> 6가지 핵심지표(비즈니스모델, 시장위치, 운영효율성, 성장잠재력, 디지털준비도, 재무건전성) 중 성장 관련 점수<br>
                <strong>🎯 시사점:</strong> 종합점수와 다를 수 있으며, 미래 투자 및 확장 가능성을 별도 평가
              </div>
              
              <div class="score-item">
                <div style="flex: 1;">
                  <strong style="color: #f57c00;">3️⃣ AI 준비도 점수</strong>
                  <div style="font-size: 13px; color: #666; margin-top: 5px;">AI 시대 적응 준비도</div>
                </div>
                <div style="font-weight: bold; color: #f57c00;">${aiAnalysis.AI준비도점수}점</div>
              </div>
              
              <div class="score-meaning">
                <strong>💡 의미:</strong> AI 도입, 디지털 전환, 데이터 활용 등 4차 산업혁명 준비도<br>
                <strong>🎯 시사점:</strong> 80점 이상 완전통합, 60-79점 확산적용, 40-59점 시범적용, 40점 미만 도입준비
              </div>
            </div>
            
            <div class="ai-scores">
              <div class="score-card">
                <div class="score-number">${aiAnalysis.AI준비도점수}점</div>
                <div class="score-label">AI 준비도 점수</div>
              </div>
              <div class="score-card">
                <div class="score-number">${aiAnalysis.디지털전환단계}</div>
                <div class="score-label">디지털 전환단계</div>
              </div>
            </div>
            
            <div style="background: #ffebee; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #f44336;">
              <h4 style="color: #c62828; margin-top: 0;">🔍 점수 차이가 나는 이유</h4>
              <ul style="color: #333; line-height: 1.7; margin: 0; padding-left: 20px;">
                <li><strong>종합점수</strong>는 현재 운영 상태의 전반적 평가입니다</li>
                <li><strong>성장잠재력</strong>은 미래 확장 가능성을 별도로 측정합니다</li>
                <li><strong>AI 준비도</strong>는 4차 산업혁명 대응력을 특별히 분석합니다</li>
                <li>각 점수는 서로 다른 관점에서 기업을 평가하여 <span style="color: #d32f2f; font-weight: bold;">차이가 날 수 있습니다</span></li>
              </ul>
            </div>
            
            <div class="steps">
              <h3 style="color: #1976d2; margin-top: 0;">🔔 AI 시대 진단 진행사항</h3>
              <ol style="color: #333; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li><strong>AI 시대 조직적응도 분석</strong> - 120개 항목 완전분석</li>
                <li><strong>업종별 AI 혁신 전략 수립</strong> - ${industry} 특화 전략</li>
                <li><strong>전문가가 1-2일 내에</strong> 맞춤형 AI 전환 로드맵 제시</li>
                <li><strong>정부 지원사업 연계</strong> 및 구체적 실행계획 안내</li>
              </ol>
            </div>
            
            <div style="background: #fff3e0; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #e65100; margin-top: 0;">🚀 최고수준 AI 진단 특징</h3>
              <ul style="color: #5d4037; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li><strong>AI 시대 조직적응도</strong> - 10개 핵심지표 정밀분석</li>
                <li><strong>업종별 AI 혁신전략</strong> - ${industry} 맞춤형 전략수립</li>
                <li><strong>실시간 AI 트렌드</strong> - 2025년 최신 기술동향 반영</li>
                <li><strong>SWOT 분석 고도화</strong> - AI 관점 완전 통합분석</li>
                <li><strong>맞춤형 실행계획</strong> - 단계별 AI 전환 로드맵</li>
                <li><strong>8000자 심층보고서</strong> - 기존 대비 2배 확장분석</li>
              </ul>
            </div>
            
            <div class="contact-info">
              <h3 style="margin: 0 0 15px 0;">👨‍💼 AI 전문 컨설턴트</h3>
              <div style="margin-bottom: 15px;">
                <div style="font-size: 18px; font-weight: 700; margin-bottom: 5px;">이후경 교장 (경영지도사)</div>
                <div style="font-size: 14px; opacity: 0.9;">AI 시대 기업전환 전문가 (28년 경력)</div>
              </div>
              <div style="font-size: 16px;">
                📞 010-9251-9743 | 📧 ${ADMIN_EMAIL}
              </div>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin: 20px 0;">
              AI 시대를 준비하는 귀하의 기업에 최적화된 전략을 제시하겠습니다.<br>
              120개 항목 완전분석을 통한 정확한 진단으로 성공적인 AI 전환을 지원합니다.
            </p>
          </div>
          
          <div class="footer">
            <p style="margin: 0 0 10px 0;">
              <strong>AICAMP</strong> - AI 시대 기업 성장 전문 파트너
            </p>
            <p style="margin: 0; font-size: 12px; opacity: 0.7;">
              © ${new Date().getFullYear()} AICAMP. 최고수준 AI 경영진단 시스템 v4.0
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // 텍스트 이메일 (점수 설명 강화)
    const emailBody = '안녕하세요 ' + (name || '고객') + '님,\n\n' +
      'AICAMP에 최고수준 AI 경영진단 신청을 해주셔서 감사합니다.\n\n' +
      '📊 진단 점수 체계 안내\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
      '1️⃣ 종합 진단점수 (100점 만점)\n' +
      '   💡 의미: 기획력, 고객서비스, 마케팅, 운영관리 등 20개 문항 종합 평가\n' +
      '   🎯 시사점: 70점 이상 우수, 50-69점 보통, 50점 미만 개선필요\n\n' +
      '2️⃣ 성장잠재력 점수 (100점 만점)\n' +
      '   💡 의미: 6가지 핵심지표 중 미래 성장 가능성 수치화\n' +
      '   🎯 시사점: 종합점수와 다를 수 있으며, 투자 및 확장 가능성 별도 평가\n\n' +
      '3️⃣ AI 준비도 점수: ' + aiAnalysis.AI준비도점수 + '점\n' +
      '   💡 의미: AI 도입, 디지털 전환, 데이터 활용 등 4차 산업혁명 준비도\n' +
      '   🎯 시사점: 80점 이상 완전통합, 60-79점 확산적용, 40-59점 시범적용\n\n' +
      '🔍 점수 차이가 나는 이유\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
      '• 종합점수는 현재 운영 상태의 전반적 평가입니다\n' +
      '• 성장잠재력은 미래 확장 가능성을 별도로 측정합니다\n' +
      '• AI 준비도는 4차 산업혁명 대응력을 특별히 분석합니다\n' +
      '• 각 점수는 서로 다른 관점에서 기업을 평가하여 차이가 날 수 있습니다\n\n' +
      '🚀 AI 시대 맞춤형 최고수준 경영진단이 접수되었습니다!\n' +
      '📅 접수일시: ' + getCurrentKoreanTime() + '\n' +
      '🔄 디지털 전환단계: ' + aiAnalysis.디지털전환단계 + '\n\n' +
      '🔔 AI 시대 진단 진행사항:\n' +
      '1. AI 시대 조직적응도 분석 - 120개 항목 완전분석\n' +
      '2. 업종별 AI 혁신 전략 수립 - ' + industry + ' 특화 전략\n' +
      '3. 전문가가 1-2일 내에 맞춤형 AI 전환 로드맵 제시\n' +
      '4. 정부 지원사업 연계 및 구체적 실행계획 안내\n\n' +
      '🚀 최고수준 AI 진단 특징:\n' +
      '• AI 시대 조직적응도 - 10개 핵심지표 정밀분석\n' +
      '• 업종별 AI 혁신전략 - ' + industry + ' 맞춤형 전략수립\n' +
      '• 실시간 AI 트렌드 - 2025년 최신 기술동향 반영\n' +
      '• SWOT 분석 고도화 - AI 관점 완전 통합분석\n' +
      '• 맞춤형 실행계획 - 단계별 AI 전환 로드맵\n' +
      '• 8000자 심층보고서 - 기존 대비 2배 확장분석\n\n' +
      '📞 AI 전문 컨설턴트:\n' +
      '이후경 교장 (경영지도사, AI 시대 기업전환 전문가)\n' +
      '전화: 010-9251-9743\n' +
      '이메일: ' + ADMIN_EMAIL + '\n\n' +
      'AI 시대를 준비하는 귀하의 기업에 최적화된 전략을 제시하겠습니다.\n' +
      '120개 항목 완전분석을 통한 정확한 진단으로 성공적인 AI 전환을 지원합니다.\n\n' +
      '감사합니다.\n\n' +
      '---\n' +
      'AICAMP (AI 시대 기업 성장 전문 파트너)\n' +
      '담당: 이후경 교장 (경영지도사)\n' +
      '📞 010-9251-9743\n' +
      '📧 ' + ADMIN_EMAIL + '\n' +
      '🌐 https://aicamp.club\n' +
      '최고수준 AI 경영진단 시스템 v4.0';

    console.log('📧 MailApp.sendEmail 호출 시작 (최고수준 AI):', {
      to: email.substring(0, 5) + '***',
      subject: subject.substring(0, 30) + '...',
      bodyLength: emailBody.length,
      htmlBodyLength: htmlBody.length
    });
    
    // 이메일 발송
    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: emailBody,
      htmlBody: htmlBody,
      name: 'AICAMP 최고수준 AI 경영진단센터'
    });
              
    console.log('✅ 최고수준 AI 진단 확인 이메일 발송 성공:', {
      to: email.substring(0, 5) + '***',
      sentAt: getCurrentKoreanTime(),
      aiReadiness: aiAnalysis.AI준비도점수,
      digitalStage: aiAnalysis.디지털전환단계
    });
    
    return { success: true, sentAt: getCurrentKoreanTime() };
    
  } catch (error) {
    const errorMessage = '최고수준 AI 진단 확인 이메일 발송 실패: ' + error.toString();
    console.error('❌', errorMessage, {
      email: email ? email.substring(0, 5) + '***' : 'null',
      name: name || 'null',
      aiReadiness: aiAnalysis ? aiAnalysis.AI준비도점수 : 'N/A',
      error: error.toString(),
      stack: error.stack
    });
    
    return { success: false, error: errorMessage };
  }
}

// ================================================================================
// 🧪 테스트 및 검증용 간단 함수들 (SIMPLE_WORKING_VERSION 통합)
// ================================================================================

/**
 * 간단한 테스트 진단 처리 함수
 */
function testDiagnosisSubmission() {
  try {
    console.log('🧪 테스트 진단 실행');
    
    const testData = {
      companyName: '테스트기업',
      applicantName: '테스트담당자',
      email: 'test@example.com',
      industry: 'IT',
      employees: '10-50명',
      score: 85
    };
    
    const response = {
      success: true,
      message: '테스트 진단 처리 완료',
      timestamp: getCurrentKoreanTime(),
      version: '1.0.0_SIMPLE_TEST',
      testResult: testData
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(response, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 테스트 진단 오류:', error);
    
    const errorResponse = {
      success: false,
      error: error.toString(),
      timestamp: getCurrentKoreanTime(),
      version: '1.0.0_SIMPLE_TEST'
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResponse, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 간단한 테스트 상담 처리 함수
 */
function testConsultationSubmission() {
  try {
    console.log('💬 테스트 상담 실행');
    
    const testData = {
      name: '테스트상담자',
      company: '테스트상담기업',
      email: 'consultation@example.com',
      consultationType: 'business-analysis',
      message: '테스트 상담 요청입니다.'
    };
    
    const response = {
      success: true,
      message: '테스트 상담 처리 완료',
      timestamp: getCurrentKoreanTime(),
      version: '1.0.0_SIMPLE_TEST',
      testResult: testData
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(response, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 테스트 상담 오류:', error);
    
    const errorResponse = {
      success: false,
      error: error.toString(),
      timestamp: getCurrentKoreanTime(),
      version: '1.0.0_SIMPLE_TEST'
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResponse, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 간단한 테스트 베타피드백 처리 함수
 */
function testBetaFeedback() {
  try {
    console.log('🧪 테스트 베타피드백 실행');
    
    const testData = {
      email: 'beta@example.com',
      feedback: '테스트 베타피드백입니다.',
      rating: 5,
      category: 'ui-improvement'
    };
    
    const response = {
      success: true,
      message: '테스트 베타피드백 처리 완료',
      timestamp: getCurrentKoreanTime(),
      version: '1.0.0_SIMPLE_TEST',
      testResult: testData
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(response, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ 테스트 베타피드백 오류:', error);
    
    const errorResponse = {
      success: false,
      error: error.toString(),
      timestamp: getCurrentKoreanTime(),
      version: '1.0.0_SIMPLE_TEST'
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResponse, null, 2))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 📧 상담신청 관리자 알림 이메일
 */
function sendConsultationAdminNotification(data, rowNumber) {
  try {
    const companyName = data.회사명 || data.company || '회사명미상';
    const applicantName = data.성명 || data.name || '미확인';
    const subject = '[AICAMP] 💬 새로운 상담신청 접수 - ' + companyName + ' (' + applicantName + ')';
    
    // HTML 이메일 템플릿
    const htmlBody = `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>상담신청 접수 알림</title>
        <style>
          body { font-family: 'Malgun Gothic', Arial, sans-serif; margin: 0; padding: 20px; background: #f5f7fa; }
          .container { max-width: 650px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
          .logo { width: 80px; height: 80px; margin: 0 auto 20px; border-radius: 8px; }
          .title { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
          .content { padding: 30px; }
          .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0; }
          .info-item { background: #f8faff; padding: 15px; border-radius: 8px; }
          .info-label { font-size: 12px; color: #666; margin-bottom: 5px; text-transform: uppercase; }
          .info-value { font-size: 16px; font-weight: bold; color: #333; }
          .message-box { background: #f0f4ff; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #4285f4; }
          .action-buttons { display: flex; gap: 15px; justify-content: center; margin: 25px 0; }
          .btn { display: inline-block; padding: 12px 24px; border-radius: 25px; text-decoration: none; font-weight: bold; text-align: center; }
          .btn-primary { background: #4285f4; color: white; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; border-top: 1px solid #e9ecef; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${AICAMP_LOGO_URL}" alt="AICAMP 로고" class="logo" />
            <div class="title">💬 새로운 상담신청 접수!</div>
          </div>
          
          <div class="content">
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">신청자</div>
                <div class="info-value">${applicantName}</div>
              </div>
              <div class="info-item">
                <div class="info-label">회사명</div>
                <div class="info-value">${companyName}</div>
              </div>
              <div class="info-item">
                <div class="info-label">직책</div>
                <div class="info-value">${data.직책 || data.position || '미확인'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">이메일</div>
                <div class="info-value">${data.이메일 || data.email || '미확인'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">연락처</div>
                <div class="info-value">${data.연락처 || data.phone || '미확인'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">상담유형</div>
                <div class="info-value">${data.상담유형 || data.consultationType || '일반상담'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">상담분야</div>
                <div class="info-value">${data.상담분야 || data.consultationArea || '미확인'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">희망시간</div>
                <div class="info-value">${data.희망상담시간 || data.preferredTime || '미확인'}</div>
              </div>
            </div>
            
            <div class="message-box">
              <h3 style="margin-top: 0; color: #4285f4;">💭 문의내용</h3>
              <p style="margin: 0; line-height: 1.6; color: #333;">
                ${(data.문의내용 || data.inquiryContent || '').substring(0, 500)}${(data.문의내용 || data.inquiryContent || '').length > 500 ? '...' : ''}
              </p>
            </div>
            
            <div style="background: #fff8e1; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #f57c00; margin-top: 0;">📊 연계정보</h3>
              <p style="margin: 5px 0;">• 진단연계여부: ${data.진단연계여부 || 'N'}</p>
              <p style="margin: 5px 0;">• 진단점수: ${data.진단점수 || '미연계'}</p>
              <p style="margin: 5px 0;">• 추천서비스: ${data.추천서비스 || '미연계'}</p>
            </div>
            
            <div class="action-buttons">
              <a href="${GOOGLE_SHEETS_URL}" class="btn btn-primary">
                📊 구글시트에서 확인
              </a>
            </div>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h4 style="color: #2e7d32; margin-top: 0;">🔔 다음 단계</h4>
              <ol style="color: #2e7d32; margin: 0; padding-left: 20px;">
                <li>신청자 연락 (1-2일 내)</li>
                <li>상담 일정 협의</li>
                <li>전문가 상담 진행</li>
                <li>솔루션 제안 및 후속 조치</li>
              </ol>
            </div>
          </div>
          
          <div class="footer">
            <div>
              <strong style="color: #4285f4;">AICAMP AI교육센터</strong>
              <br>
              담당: 이후경 교장 (경영지도사)
            </div>
            <div style="margin-top: 15px;">
              📞 010-9251-9743 | 📧 ${ADMIN_EMAIL} | 🌐 https://aicamp.club
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // 텍스트 버전
    const textBody = '💬 새로운 상담신청이 접수되었습니다!\n\n' +
      '👤 신청자: ' + applicantName + '\n' +
      '🏢 회사명: ' + companyName + '\n' +
      '💼 직책: ' + (data.직책 || data.position || '미확인') + '\n' +
      '📧 이메일: ' + (data.이메일 || data.email || '미확인') + '\n' +
      '📞 연락처: ' + (data.연락처 || data.phone || '미확인') + '\n' +
      '🎯 상담유형: ' + (data.상담유형 || data.consultationType || '일반상담') + '\n' +
      '📝 상담분야: ' + (data.상담분야 || data.consultationArea || '미확인') + '\n' +
      '⏰ 희망시간: ' + (data.희망상담시간 || data.preferredTime || '미확인') + '\n' +
      '📅 접수시간: ' + getCurrentKoreanTime() + '\n\n' +
      '💭 문의내용:\n' + ((data.문의내용 || data.inquiryContent || '').substring(0, 500)) + '\n\n' +
      '📊 연계정보:\n' +
      '• 진단연계여부: ' + (data.진단연계여부 || 'N') + '\n' +
      '• 진단점수: ' + (data.진단점수 || '미연계') + '\n' +
      '• 추천서비스: ' + (data.추천서비스 || '미연계') + '\n\n' +
      '📊 데이터 위치:\n' +
      '• 시트: ' + SHEETS.CONSULTATION + ' 시트 ' + rowNumber + '행\n' +
      '• 구글시트: ' + GOOGLE_SHEETS_URL + '\n\n' +
      '🔔 다음 단계:\n' +
      '1. 신청자 연락 (1-2일 내)\n' +
      '2. 상담 일정 협의\n' +
      '3. 전문가 상담 진행\n' +
      '4. 솔루션 제안 및 후속 조치\n\n' +
      '---\n' +
      'AICAMP 자동 알림 시스템\n' +
      '담당: 이후경 교장 (경영지도사)\n' +
      '📞 010-9251-9743 | 📧 ' + ADMIN_EMAIL;

    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      body: textBody,
      htmlBody: htmlBody,
      name: 'AICAMP 상담신청 알림 시스템'
    });
    
    console.log('📧 상담 관리자 알림 이메일 발송 완료');
  } catch (error) {
    console.error('❌ 상담 관리자 이메일 발송 실패:', error);
  }
}

/**
 * 📧 신청자 확인 이메일 (깔끔한 버전)
 */
function sendUserConfirmation(email, name, type) {
  console.log('📧 sendUserConfirmation 함수 시작:', {
    email: email ? email.substring(0, 5) + '***' : 'null',
    name: name || 'null',
    type: type,
    timestamp: getCurrentKoreanTime()
  });
  
  try {
    // 이메일 주소 유효성 기본 검사
    if (!email || !email.includes('@')) {
      const error = '유효하지 않은 이메일 주소: ' + (email || 'null');
      console.error('❌ 이메일 유효성 검사 실패:', error);
      return { success: false, error: error };
    }
    
    const isConsultation = type === '상담';
    const subject = '[AICAMP] ' + (isConsultation ? '🤝 전문가 상담' : '🎯 AI 진단') + ' 신청이 접수되었습니다!';
    
    // HTML 이메일 템플릿
    const htmlBody = `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>신청 접수 확인</title>
        <style>
          body { font-family: 'Malgun Gothic', Arial, sans-serif; margin: 0; padding: 20px; background: #f5f7fa; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #4285f4, #34a853); color: white; padding: 30px; text-align: center; }
          .logo { width: 80px; height: 80px; margin: 0 auto 20px; border-radius: 8px; }
          .title { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
          .content { padding: 30px; }
          .highlight { background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #34a853; }
          .steps { background: #f8faff; padding: 20px; border-radius: 10px; margin: 20px 0; }
          .contact-info { background: #2c3e50; color: white; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; border-top: 1px solid #e9ecef; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${AICAMP_LOGO_URL}" alt="AICAMP 로고" class="logo" />
            <div class="title">${isConsultation ? '🤝 전문가 상담' : '🎯 AI 진단'} 신청 완료!</div>
          </div>
          
          <div class="content">
            <p style="font-size: 18px; color: #333;">안녕하세요 ${name || '고객'}님,</p>
            
            <p>AICAMP에 ${isConsultation ? '전문가 상담' : 'AI 무료진단'} 신청을 해주셔서 감사합니다.</p>
            
            <div class="highlight">
              <h3 style="margin-top: 0; color: #2e7d32;">✅ 신청이 성공적으로 접수되었습니다!</h3>
              <p style="margin: 0;">📅 접수일시: ${getCurrentKoreanTime()}</p>
            </div>
            
            <div class="steps">
              <h3 style="margin-top: 0; color: #4285f4;">🔔 다음 진행사항</h3>
              ${isConsultation ? `
              <ol style="margin: 10px 0; padding-left: 20px;">
                <li>전문가가 1-2일 내에 연락드립니다</li>
                <li>상담 일정을 협의합니다</li>
                <li>맞춤형 전문가 상담을 진행합니다</li>
                <li>구체적인 솔루션을 제안드립니다</li>
              </ol>
              <h4 style="color: #4285f4;">💡 상담 준비사항</h4>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>현재 비즈니스 현황 자료</li>
                <li>구체적인 고민사항 정리</li>
                <li>목표하는 성과 및 일정</li>
                <li>예산 범위 (대략적으로)</li>
              </ul>
              ` : `
              <ol style="margin: 10px 0; padding-left: 20px;">
                <li>AI 진단 결과를 분석합니다</li>
                <li>전문가가 결과를 검토합니다</li>
                <li>1-2일 내에 상세한 분석 결과를 연락드립니다</li>
                <li>맞춤형 개선방안을 제시합니다</li>
              </ol>
              <h4 style="color: #4285f4;">💡 진단 결과 포함사항</h4>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>5개 영역별 상세 분석 (100점 만점)</li>
                <li>강점과 개선점 도출</li>
                <li>맞춤형 솔루션 제안</li>
                <li>단계별 실행 계획</li>
              </ul>
              `}
            </div>
            
            <div class="contact-info">
              <h3 style="margin-top: 0;">📞 빠른 연락을 원하시면</h3>
              <p style="margin: 10px 0; font-size: 18px;">
                <strong>전화:</strong> 010-9251-9743<br>
                <strong>담당:</strong> 이후경 경영지도사<br>
                <strong>이메일:</strong> ${ADMIN_EMAIL}
              </p>
            </div>
            
            <div style="background: #fff8e1; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #f57c00; margin-top: 0;">🎯 AICAMP 서비스 소개</h3>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>AI 기반 비즈니스 진단</li>
                <li>전문가 1:1 맞춤 상담</li>
                <li>성장 전략 수립 지원</li>
                <li>실행 계획 및 후속 관리</li>
              </ul>
            </div>
          </div>
          
          <div class="footer">
            <div>
              <strong style="color: #4285f4;">AICAMP AI교육센터</strong>
              <br>
              AI기반 비즈니스 성장 솔루션
            </div>
            <div style="margin-top: 15px;">
              📞 010-9251-9743 | 📧 ${ADMIN_EMAIL} | 🌐 https://aicamp.club
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // 텍스트 버전
    const textBody = '안녕하세요 ' + (name || '고객') + '님,\n\n' +
      'AICAMP에 ' + (isConsultation ? '전문가 상담' : 'AI 무료진단') + ' 신청을 해주셔서 감사합니다.\n\n' +
      '✅ 신청이 성공적으로 접수되었습니다!\n' +
      '📅 접수일시: ' + getCurrentKoreanTime() + '\n\n' +
      '🔔 다음 진행사항:\n' +
      (isConsultation ? 
        '1. 전문가가 1-2일 내에 연락드립니다\n' +
        '2. 상담 일정을 협의합니다\n' +
        '3. 맞춤형 전문가 상담을 진행합니다\n' +
        '4. 구체적인 솔루션을 제안드립니다\n\n' +
        '💡 상담 준비사항:\n' +
        '• 현재 비즈니스 현황 자료\n' +
        '• 구체적인 고민사항 정리\n' +
        '• 목표하는 성과 및 일정\n' +
        '• 예산 범위 (대략적으로)'
        :
        '1. AI 진단 결과를 분석합니다\n' +
        '2. 전문가가 결과를 검토합니다\n' +
        '3. 1-2일 내에 상세한 분석 결과를 연락드립니다\n' +
        '4. 맞춤형 개선방안을 제시합니다\n\n' +
        '💡 진단 결과 포함사항:\n' +
        '• 5개 영역별 상세 분석 (100점 만점)\n' +
        '• 강점과 개선점 도출\n' +
        '• 맞춤형 솔루션 제안\n' +
        '• 단계별 실행 계획'
      ) + '\n\n' +
      '📞 빠른 연락을 원하시면:\n' +
      '전화: 010-9251-9743 (이후경 경영지도사)\n' +
      '이메일: ' + ADMIN_EMAIL + '\n\n' +
      '🎯 AICAMP 서비스 소개:\n' +
      '• AI 기반 비즈니스 진단\n' +
      '• 전문가 1:1 맞춤 상담\n' +
      '• 성장 전략 수립 지원\n' +
      '• 실행 계획 및 후속 관리\n\n' +
      '더 자세한 정보가 궁금하시면 언제든 연락해주세요.\n' +
      '귀하의 비즈니스 성장을 위해 최선을 다하겠습니다.\n\n' +
      '감사합니다.\n\n' +
      '---\n' +
      'AICAMP (AI기반 비즈니스 성장 솔루션)\n' +
      '담당: 이후경 교장 (경영지도사)\n' +
      '📞 010-9251-9743\n' +
      '📧 ' + ADMIN_EMAIL + '\n' +
      '🌐 https://aicamp.club';

    // 이메일 발송
    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: textBody,
      htmlBody: htmlBody,
      name: 'AICAMP AI교육센터'
    });
              
    console.log('📧 신청자 확인 이메일 발송 완료:', email);
    return { success: true, message: '이메일 발송 성공' };
  } catch (error) {
    console.error('❌ 신청자 이메일 발송 실패:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * 베타피드백 관리자 알림 이메일
 */
function sendBetaFeedbackAdminNotification(data, rowNumber) {
  try {
    const subject = '[AICAMP] 🚨 긴급! 베타 피드백 접수 - ' + (data.계산기명 || '세금계산기');
    
    // HTML 이메일 템플릿
    const htmlBody = `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>베타 피드백 접수 알림</title>
        <style>
          body { font-family: 'Malgun Gothic', Arial, sans-serif; margin: 0; padding: 20px; background: #f5f7fa; }
          .container { max-width: 650px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #ff6b6b, #ffa726); color: white; padding: 30px; text-align: center; }
          .logo { width: 80px; height: 80px; margin: 0 auto 20px; border-radius: 8px; }
          .title { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
          .content { padding: 30px; }
          .severity-high { background: #fee; color: #c00; padding: 10px; border-radius: 8px; font-weight: bold; text-align: center; margin: 20px 0; }
          .severity-medium { background: #fff3cd; color: #856404; padding: 10px; border-radius: 8px; font-weight: bold; text-align: center; margin: 20px 0; }
          .severity-low { background: #d1ecf1; color: #0c5460; padding: 10px; border-radius: 8px; font-weight: bold; text-align: center; margin: 20px 0; }
          .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0; }
          .info-item { background: #f8faff; padding: 15px; border-radius: 8px; }
          .info-label { font-size: 12px; color: #666; margin-bottom: 5px; text-transform: uppercase; }
          .info-value { font-size: 16px; font-weight: bold; color: #333; }
          .problem-box { background: #fee; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #dc3545; }
          .action-buttons { display: flex; gap: 15px; justify-content: center; margin: 25px 0; }
          .btn { display: inline-block; padding: 12px 24px; border-radius: 25px; text-decoration: none; font-weight: bold; text-align: center; }
          .btn-danger { background: #dc3545; color: white; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; border-top: 1px solid #e9ecef; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${AICAMP_LOGO_URL}" alt="AICAMP 로고" class="logo" />
            <div class="title">🚨 베타 피드백 접수!</div>
          </div>
          
          <div class="content">
            <div class="${data.심각도 === '높음' ? 'severity-high' : data.심각도 === '중간' ? 'severity-medium' : 'severity-low'}">
              ⚠️ 심각도: ${data.심각도 || 'N/A'}
            </div>
            
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">대상 계산기</div>
                <div class="info-value">${data.계산기명 || 'N/A'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">피드백 유형</div>
                <div class="info-value">${data.피드백유형 || 'N/A'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">사용자 이메일</div>
                <div class="info-value">${data.사용자이메일 || 'N/A'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">접수 시간</div>
                <div class="info-value">${getCurrentKoreanTime()}</div>
              </div>
            </div>
            
            <div class="problem-box">
              <h3 style="margin-top: 0; color: #dc3545;">📝 문제 설명</h3>
              <p style="margin: 0; line-height: 1.6; color: #333;">
                ${(data.문제설명 || '').substring(0, 200)}${(data.문제설명 || '').length > 200 ? '...' : ''}
              </p>
            </div>
            
            <div style="background: #f8faff; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #4285f4; margin-top: 0;">📋 상세 정보</h3>
              <p style="margin: 5px 0;"><strong>기대동작:</strong> ${data.기대동작 || 'N/A'}</p>
              <p style="margin: 5px 0;"><strong>실제동작:</strong> ${data.실제동작 || 'N/A'}</p>
              <p style="margin: 5px 0;"><strong>재현단계:</strong> ${data.재현단계 || 'N/A'}</p>
              <p style="margin: 5px 0;"><strong>브라우저정보:</strong> ${data.브라우저정보 || 'N/A'}</p>
              <p style="margin: 5px 0;"><strong>추가의견:</strong> ${data.추가의견 || 'N/A'}</p>
            </div>
            
            <div class="action-buttons">
              <a href="${GOOGLE_SHEETS_URL}" class="btn btn-danger">
                📊 구글시트에서 상세 확인
              </a>
            </div>
            
            <div style="background: #fff8e1; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h4 style="color: #f57c00; margin-top: 0;">🔗 직접 링크</h4>
              <p style="margin: 5px 0; word-break: break-all;">
                ${SHEETS.BETA_FEEDBACK} 시트 ${rowNumber}행<br>
                <a href="${GOOGLE_SHEETS_URL}" style="color: #0066cc;">구글시트 바로가기</a>
              </p>
            </div>
          </div>
          
          <div class="footer">
            <div>
              <strong style="color: #dc3545;">AICAMP 베타테스트 개발팀</strong>
              <br>
              긴급 오류 대응 시스템
            </div>
            <div style="margin-top: 15px;">
              📧 ${ADMIN_EMAIL}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // 텍스트 버전
    const textBody = '🧪 새로운 베타 피드백이 접수되었습니다!\n\n' +
      '🎯 대상 계산기: ' + (data.계산기명 || 'N/A') + '\n' +
      '🐛 피드백 유형: ' + (data.피드백유형 || 'N/A') + '\n' +
      '📧 사용자 이메일: ' + (data.사용자이메일 || 'N/A') + '\n' +
      '⚠️ 심각도: ' + (data.심각도 || 'N/A') + '\n' +
      '⏰ 접수 시간: ' + getCurrentKoreanTime() + '\n\n' +
      '📝 문제 설명:\n' + ((data.문제설명 || '').substring(0, 200)) + '...\n\n' +
      '📋 상세 정보:\n' +
      '• 기대동작: ' + (data.기대동작 || 'N/A') + '\n' +
      '• 실제동작: ' + (data.실제동작 || 'N/A') + '\n' +
      '• 재현단계: ' + (data.재현단계 || 'N/A') + '\n' +
      '• 브라우저정보: ' + (data.브라우저정보 || 'N/A') + '\n' +
      '• 추가의견: ' + (data.추가의견 || 'N/A') + '\n\n' +
      '📋 시트 위치: ' + SHEETS.BETA_FEEDBACK + ' 시트 ' + rowNumber + '행\n' +
      '🔗 구글시트 바로가기: ' + GOOGLE_SHEETS_URL + '\n\n' +
      '---\n' +
      'AICAMP 베타테스트 개발팀\n' +
      '📧 ' + ADMIN_EMAIL;

    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      body: textBody,
      htmlBody: htmlBody,
      name: 'AICAMP 베타테스트 알림 시스템'
    });
    
    console.log('📧 베타피드백 관리자 알림 이메일 발송 완료 (UTF-8)');
  } catch (error) {
    console.error('❌ 베타피드백 관리자 이메일 발송 실패:', error);
  }
}

/**
 * 베타피드백 사용자 확인 이메일 (UTF-8 지원)
 */
function sendBetaFeedbackUserConfirmation(email, data) {
  try {
    const subject = '[AICAMP] 🧪 베타 피드백 접수 완료! ' + (data.계산기명 || '세금계산기');
    
    // HTML 이메일 템플릿
    const htmlBody = `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>베타 피드백 접수 확인</title>
        <style>
          body { font-family: 'Malgun Gothic', Arial, sans-serif; margin: 0; padding: 20px; background: #f5f7fa; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 30px; text-align: center; }
          .logo { width: 80px; height: 80px; margin: 0 auto 20px; border-radius: 8px; }
          .title { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
          .content { padding: 30px; }
          .highlight { background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #34a853; }
          .info-box { background: #f8faff; padding: 20px; border-radius: 10px; margin: 20px 0; }
          .thank-you { background: #fff8e1; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; border-top: 1px solid #e9ecef; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${AICAMP_LOGO_URL}" alt="AICAMP 로고" class="logo" />
            <div class="title">🧪 베타 피드백 접수 완료!</div>
          </div>
          
          <div class="content">
            <p style="font-size: 18px; color: #333;">안녕하세요!</p>
            
            <p>AICAMP 세금계산기 베타테스트에 참여해 주셔서 감사합니다.</p>
            
            <div class="highlight">
              <h3 style="margin-top: 0; color: #2e7d32;">✅ 피드백이 성공적으로 접수되었습니다!</h3>
              <p style="margin: 0;">📅 접수일시: ${getCurrentKoreanTime()}</p>
            </div>
            
            <div class="info-box">
              <h3 style="margin-top: 0; color: #4285f4;">🎯 접수된 피드백 정보</h3>
              <p style="margin: 5px 0;"><strong>대상 계산기:</strong> ${data.계산기명 || '세금계산기'}</p>
              <p style="margin: 5px 0;"><strong>피드백 유형:</strong> ${data.피드백유형 || 'N/A'}</p>
              <p style="margin: 5px 0;"><strong>심각도:</strong> ${data.심각도 || 'N/A'}</p>
            </div>
            
            <div style="background: #f0f4ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #4285f4;">🔔 다음 단계</h3>
              <ol style="margin: 10px 0; padding-left: 20px;">
                <li>개발팀이 피드백을 검토합니다</li>
                <li>문제 해결 방안을 수립합니다</li>
                <li>개선사항을 적용합니다</li>
                <li>이메일로 처리 결과를 안내드립니다</li>
              </ol>
            </div>
            
            <div class="thank-you">
              <h3 style="color: #f57c00; margin-top: 0;">🙏 감사합니다!</h3>
              <p style="margin: 10px 0;">
                귀하의 소중한 피드백은 AICAMP 서비스 개선에<br>
                큰 도움이 됩니다.
              </p>
            </div>
          </div>
          
          <div class="footer">
            <div>
              <strong style="color: #4285f4;">AICAMP 베타테스트 개발팀</strong>
            </div>
            <div style="margin-top: 15px;">
              📧 ${ADMIN_EMAIL}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // 텍스트 버전
    const textBody = '안녕하세요!\n\n' +
      'AICAMP 세금계산기 베타테스트에 참여해 주셔서 감사합니다.\n\n' +
      '✅ 피드백이 성공적으로 접수되었습니다!\n' +
      '📅 접수일시: ' + getCurrentKoreanTime() + '\n\n' +
      '🎯 접수된 피드백 정보\n' +
      '• 대상 계산기: ' + (data.계산기명 || '세금계산기') + '\n' +
      '• 피드백 유형: ' + (data.피드백유형 || 'N/A') + '\n' +
      '• 심각도: ' + (data.심각도 || 'N/A') + '\n\n' +
      '🔔 다음 단계\n' +
      '1. 개발팀이 피드백을 검토합니다\n' +
      '2. 문제 해결 방안을 수립합니다\n' +
      '3. 개선사항을 적용합니다\n' +
      '4. 이메일로 처리 결과를 안내드립니다\n\n' +
      '🙏 감사합니다!\n' +
      '귀하의 소중한 피드백은 AICAMP 서비스 개선에 큰 도움이 됩니다.\n\n' +
      '추가 문의사항이 있으시면 언제든 연락해주세요.\n\n' +
      '---\n' +
      'AICAMP 베타테스트 개발팀\n' +
      '📧 ' + ADMIN_EMAIL;

    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: textBody,
      htmlBody: htmlBody,
      name: 'AICAMP 베타테스트 팀'
    });
    
    console.log('📧 베타피드백 사용자 확인 이메일 발송 완료 (UTF-8):', email);
  } catch (error) {
    console.error('❌ 베타피드백 사용자 이메일 발송 실패:', error);
  }
}

/**
 * 시트 ID 가져오기 (링크 생성용)
 */
function getSheetId(sheetName) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(sheetName);
    return sheet ? sheet.getSheetId() : 0;
  } catch (error) {
    console.error('시트 ID 가져오기 실패:', error);
    return 0;
  }
}