// ================================================================================
// 📋 AICAMP AI 역량진단 시스템 - 설정 및 환경변수 모듈
// ================================================================================

/**
 * 환경변수 가져오기 (Google Apps Script Properties)
 */
function getEnvironmentVariables() {
  const scriptProperties = PropertiesService.getScriptProperties();
  
  return {
    // 필수 설정
    SPREADSHEET_ID: scriptProperties.getProperty('SPREADSHEET_ID') || '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0',
    GEMINI_API_KEY: scriptProperties.getProperty('GEMINI_API_KEY') || 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM',
    ADMIN_EMAIL: scriptProperties.getProperty('ADMIN_EMAIL') || 'hongik423@gmail.com',
    
    // 배포 정보
    SCRIPT_ID: scriptProperties.getProperty('SCRIPT_ID') || '1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj',
    DEPLOYMENT_ID: scriptProperties.getProperty('DEPLOYMENT_ID') || 'AKfycbxIRspmaBqr0tFEQ3Mp9hGIDh6uciIdPUekcezJtyhyumTzeqs6yuzba6u3sB1O5uSj',
    
    // 운영 설정
    DEBUG_MODE: scriptProperties.getProperty('DEBUG_MODE') === 'true',
    AUTO_REPLY_ENABLED: scriptProperties.getProperty('AUTO_REPLY_ENABLED') !== 'false',
    ENABLE_BENCHMARKING: scriptProperties.getProperty('ENABLE_BENCHMARKING') !== 'false',
    ENABLE_PROGRESS_TRACKING: scriptProperties.getProperty('ENABLE_PROGRESS_TRACKING') !== 'false',
    
    // API 설정
    AI_MODEL: scriptProperties.getProperty('AI_MODEL') || 'gemini-2.0-flash-exp',
    MAX_RETRIES: parseInt(scriptProperties.getProperty('MAX_RETRIES') || '3'),
    REPORT_LANGUAGE: scriptProperties.getProperty('REPORT_LANGUAGE') || 'ko',
    
    // 타임아웃 설정
    TIMEOUT_GEMINI: parseInt(scriptProperties.getProperty('TIMEOUT_GEMINI') || '1200000'), // 20분
    TIMEOUT_EMAIL: parseInt(scriptProperties.getProperty('TIMEOUT_EMAIL') || '180000'), // 3분
    TIMEOUT_RETRY_DELAY: parseInt(scriptProperties.getProperty('TIMEOUT_RETRY_DELAY') || '600000'), // 10분
  };
}

// 환경변수 전역 상수
const ENV = getEnvironmentVariables();

// 시트 이름 상수
const SHEETS = {
  DIAGNOSIS: 'AI_역량진단신청',
  EVALUATION: 'AI_역량평가결과',
  CONSULTATION: '상담신청',
  BETA_FEEDBACK: '베타피드백',
  PROGRESS: '진행상황추적',
  PERFORMANCE: '성능모니터링',
  BENCHMARKS: '업종별벤치마크',
  REPORTS: '보고서이력',
  ERROR_LOG: '오류로그'
};

// 버전 정보
const VERSION = '2025.02.05.AICAMP_AI역량진단시스템_v6.0_통합최적화_무오류';

// AICAMP 정보
const AICAMP_INFO = {
  LOGO_URL: 'https://ai-camp-landingpage.vercel.app/images/aicamp_logo_del_250726.png',
  WEBSITE: 'https://aicamp.ai',
  CEO_NAME: '이후경',
  CEO_PHONE: '010-9251-9743',
  CEO_EMAIL: 'hongik423@gmail.com',
  KAKAO_ID: '@aicamp'
};

// AI 역량 평가 항목 구조
const AI_CAPABILITY_STRUCTURE = {
  // 5대 AI 역량
  aiCapabilities: {
    aiUnderstanding: {
      name: 'AI 이해 및 활용 전략',
      weight: 0.2,
      items: {
        aiTechUnderstanding: 'AI 기술 이해도',
        aiStrategyPlanning: 'AI 활용 전략 수립',
        aiInvestmentDecision: 'AI 투자 의사결정'
      }
    },
    dataManagement: {
      name: '데이터 관리 및 분석',
      weight: 0.2,
      items: {
        dataCollection: '데이터 수집 체계',
        dataQuality: '데이터 품질 관리',
        dataAnalysis: '데이터 분석 역량'
      }
    },
    processOptimization: {
      name: '프로세스 혁신 및 자동화',
      weight: 0.2,
      items: {
        processAnalysis: '업무 프로세스 분석',
        automationAssessment: '자동화 가능성 평가',
        aiProcessImprovement: 'AI 기반 프로세스 개선'
      }
    },
    talentDevelopment: {
      name: '인재 육성 및 조직 문화',
      weight: 0.2,
      items: {
        aiEducation: 'AI 교육 체계',
        changeManagement: '변화 관리 역량',
        innovationCulture: '혁신 문화 조성'
      }
    },
    customerExperience: {
      name: '고객 경험 및 가치 창출',
      weight: 0.2,
      items: {
        customerDataUsage: '고객 데이터 활용',
        aiServiceDevelopment: 'AI 기반 서비스 개발',
        customerSatisfaction: '고객 만족도 향상'
      }
    }
  },
  
  // 실무 역량
  practicalCapabilities: {
    documentAutomation: '문서 자동화 역량',
    dataAnalysisPractice: '데이터 분석 실무',
    aiToolUsage: 'AI 도구 활용 역량',
    digitalCollaboration: '디지털 협업 역량',
    industrySpecific: '업종 특화 역량'
  }
};

// 업종별 설정
const INDUSTRY_CONFIG = {
  '제조업': {
    benchmarkScore: 65,
    keyFactors: ['스마트팩토리', 'IoT', '품질관리'],
    aiTrends: ['디지털 트윈', '예측 정비', '공급망 AI'],
    specificMetrics: ['생산효율', '불량률', '재고회전율']
  },
  'IT/소프트웨어': {
    benchmarkScore: 85,
    keyFactors: ['AI개발', '클라우드', '빅데이터'],
    aiTrends: ['AI 코드 생성', 'MLOps', 'AI 보안'],
    specificMetrics: ['개발속도', '코드품질', '시스템안정성']
  },
  '서비스업': {
    benchmarkScore: 55,
    keyFactors: ['챗봇', 'CRM', '개인화'],
    aiTrends: ['대화형 AI', '감정분석', '자동화'],
    specificMetrics: ['고객만족도', '응답시간', '서비스품질']
  },
  '유통/도소매': {
    benchmarkScore: 60,
    keyFactors: ['추천시스템', '재고최적화', '옴니채널'],
    aiTrends: ['수요예측', '가격최적화', '무인매장'],
    specificMetrics: ['매출성장률', '재고효율', '고객전환율']
  },
  '금융업': {
    benchmarkScore: 75,
    keyFactors: ['리스크관리', '자동화', '보안'],
    aiTrends: ['AI 신용평가', '로보어드바이저', '이상거래탐지'],
    specificMetrics: ['리스크지표', '처리속도', '정확도']
  },
  '의료/헬스케어': {
    benchmarkScore: 70,
    keyFactors: ['진단보조', '데이터분석', '원격의료'],
    aiTrends: ['AI 진단', '신약개발', '맞춤의료'],
    specificMetrics: ['진단정확도', '처리시간', '환자만족도']
  },
  '교육': {
    benchmarkScore: 50,
    keyFactors: ['맞춤학습', '평가자동화', '콘텐츠'],
    aiTrends: ['AI 튜터', '학습분석', '자동평가'],
    specificMetrics: ['학습성과', '참여도', '만족도']
  },
  '기타': {
    benchmarkScore: 55,
    keyFactors: ['자동화', '분석', '최적화'],
    aiTrends: ['프로세스 AI', '데이터 분석', '고객 서비스'],
    specificMetrics: ['효율성', '정확도', '만족도']
  }
};

/**
 * 환경변수 초기 설정 (최초 1회 실행)
 */
function setupEnvironmentVariables() {
  const scriptProperties = PropertiesService.getScriptProperties();
  
  const defaultProperties = {
    // 필수 설정
    SPREADSHEET_ID: '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0',
    GEMINI_API_KEY: 'YOUR_API_KEY_HERE', // 실제 API 키로 변경 필요
    ADMIN_EMAIL: 'hongik423@gmail.com',
    
    // 배포 정보
    SCRIPT_ID: '1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj',
    DEPLOYMENT_ID: 'YOUR_DEPLOYMENT_ID_HERE', // 배포 후 변경 필요
    
    // 운영 설정
    DEBUG_MODE: 'false',
    AUTO_REPLY_ENABLED: 'true',
    ENABLE_BENCHMARKING: 'true',
    ENABLE_PROGRESS_TRACKING: 'true',
    
    // API 설정
    AI_MODEL: 'gemini-2.0-flash-exp',
    MAX_RETRIES: '3',
    REPORT_LANGUAGE: 'ko',
    
    // 타임아웃 설정
    TIMEOUT_GEMINI: '1200000',
    TIMEOUT_EMAIL: '180000',
    TIMEOUT_RETRY_DELAY: '600000'
  };
  
  scriptProperties.setProperties(defaultProperties);
  
  console.log('✅ 환경변수 설정 완료');
  console.log('⚠️ GEMINI_API_KEY와 DEPLOYMENT_ID를 실제 값으로 변경하세요!');
  
  // 설정 확인
  checkEnvironmentVariables();
}

/**
 * 환경변수 확인
 */
function checkEnvironmentVariables() {
  console.log('📋 현재 환경변수 설정:');
  console.log('================================');
  
  const env = getEnvironmentVariables();
  Object.entries(env).forEach(([key, value]) => {
    if (key === 'GEMINI_API_KEY') {
      console.log(`${key}: ${value ? value.substring(0, 10) + '...' : 'NOT SET'}`);
    } else {
      console.log(`${key}: ${value}`);
    }
  });
  
  console.log('================================');
  
  // 필수 설정 확인
  const requiredKeys = ['SPREADSHEET_ID', 'GEMINI_API_KEY', 'ADMIN_EMAIL'];
  const missingKeys = requiredKeys.filter(key => !env[key] || env[key] === 'YOUR_API_KEY_HERE');
  
  if (missingKeys.length > 0) {
    console.warn('⚠️ 다음 필수 설정이 누락되었습니다:', missingKeys.join(', '));
    return false;
  }
  
  console.log('✅ 모든 필수 설정이 완료되었습니다.');
  return true;
}

/**
 * 시트 초기화
 */
function initializeSheets() {
  try {
    const spreadsheet = SpreadsheetApp.openById(ENV.SPREADSHEET_ID);
    
    Object.entries(SHEETS).forEach(([key, sheetName]) => {
      let sheet = spreadsheet.getSheetByName(sheetName);
      
      if (!sheet) {
        console.log(`📄 시트 생성: ${sheetName}`);
        sheet = spreadsheet.insertSheet(sheetName);
        
        // 시트별 헤더 설정
        const headers = getSheetHeaders(key);
        if (headers) {
          sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
          sheet.getRange(1, 1, 1, headers.length)
            .setBackground('#667eea')
            .setFontColor('#ffffff')
            .setFontWeight('bold');
        }
      }
    });
    
    console.log('✅ 시트 초기화 완료');
    return true;
    
  } catch (error) {
    console.error('❌ 시트 초기화 오류:', error);
    return false;
  }
}

/**
 * 시트별 헤더 가져오기
 */
function getSheetHeaders(sheetKey) {
  const headers = {
    DIAGNOSIS: [
      '진단ID', '신청일시', '회사명', '업종', '담당자명', '이메일', '연락처',
      '종합점수', '등급', 'AI성숙도', '매트릭스위치', '주요고민사항', 
      '예상혜택', '희망컨설팅분야', '처리상태'
    ],
    EVALUATION: [
      '진단ID', '평가일시', '종합점수', '등급', 'AI성숙도',
      'AI이해전략', '데이터관리', '프로세스혁신', '인재육성', '고객경험',
      '문서자동화', '데이터분석실무', 'AI도구활용', '디지털협업', '업종특화',
      '벤치마크비교'
    ],
    CONSULTATION: [
      '상담ID', '신청일시', '회사명', '담당자명', '이메일', '연락처',
      '상담분야', '상담내용', '희망일시', '처리상태'
    ],
    PROGRESS: [
      '진단ID', '시간', '단계', '상태', '메시지', '처리자'
    ],
    PERFORMANCE: [
      '일시', '처리유형', '처리시간(ms)', '성공여부', '오류내용'
    ],
    BENCHMARKS: [
      '업종', '항목', '평균점수', '상위10%', '상위30%', '업데이트일'
    ],
    REPORTS: [
      '진단ID', '생성일시', '보고서길이', '품질등급', '개인화점수', '저장위치'
    ],
    ERROR_LOG: [
      '발생일시', '오류유형', '오류메시지', '스택트레이스', '컨텍스트', '처리자'
    ]
  };
  
  return headers[sheetKey];
}