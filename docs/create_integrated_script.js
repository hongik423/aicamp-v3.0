// Google Apps Script 통합 파일 생성 도구
// 이 파일을 Node.js로 실행하여 통합 파일을 생성할 수 있습니다

const fs = require('fs');
const path = require('path');

// 하드코딩된 설정
const HARDCODED_CONFIG = `
// 하드코딩된 설정값 (제공된 정보 적용)
const HARDCODED_CONFIG = {
  SPREADSHEET_ID: '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0',
  GEMINI_API_KEY: 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM',
  SCRIPT_ID: '1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj',
  DEPLOYMENT_ID: 'AKfycbxIRspmaBqr0tFEQ3Mp9hGIDh6uciIdPUekcezJtyhyumTzeqs6yuzba6u3sB1O5uSj',
  ADMIN_EMAIL: 'hongik423@gmail.com'
};
`;

// 헤더
const HEADER = `// ================================================================================
// 🚀 AICAMP AI 역량진단 시스템 - 완전 통합 버전 v6.0
// ================================================================================
// 마지막 업데이트: 2025.02.05
// 제공된 API 키 및 배포 정보 적용 완료
// ================================================================================
${HARDCODED_CONFIG}
`;

// 모듈 파일 목록
const modules = [
  'docs/modules/1_config_and_env.js',
  'docs/modules/2_utilities.js',
  'docs/modules/3_ai_evaluation.js',
  'docs/modules/4_swot_analysis.js',
  'docs/modules/5_matrix_analysis.js',
  'docs/modules/6_roadmap_roi.js',
  'docs/modules/7_gemini_report.js',
  'docs/modules/8_email_data.js',
  'docs/modules/9_main_api.js'
];

// 환경변수 함수 수정
const envFunctionReplacement = `
function getEnvironmentVariables() {
  const scriptProperties = PropertiesService.getScriptProperties();
  
  return {
    // 필수 설정 (하드코딩된 값 우선 사용)
    SPREADSHEET_ID: HARDCODED_CONFIG.SPREADSHEET_ID,
    GEMINI_API_KEY: HARDCODED_CONFIG.GEMINI_API_KEY,
    ADMIN_EMAIL: HARDCODED_CONFIG.ADMIN_EMAIL,
    
    // 배포 정보
    SCRIPT_ID: HARDCODED_CONFIG.SCRIPT_ID,
    DEPLOYMENT_ID: HARDCODED_CONFIG.DEPLOYMENT_ID,
    
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
    TIMEOUT_GEMINI: parseInt(scriptProperties.getProperty('TIMEOUT_GEMINI') || '1200000'),
    TIMEOUT_EMAIL: parseInt(scriptProperties.getProperty('TIMEOUT_EMAIL') || '180000'),
    TIMEOUT_RETRY_DELAY: parseInt(scriptProperties.getProperty('TIMEOUT_RETRY_DELAY') || '600000'),
  };
}
`;

// 통합 파일 생성
function createIntegratedFile() {
  let content = HEADER;
  
  modules.forEach((modulePath, index) => {
    console.log(`Processing ${modulePath}...`);
    
    try {
      let moduleContent = fs.readFileSync(modulePath, 'utf8');
      
      // 첫 번째 모듈의 환경변수 함수 수정
      if (index === 0) {
        moduleContent = moduleContent.replace(
          /function getEnvironmentVariables\(\) \{[\s\S]*?\n\}/,
          envFunctionReplacement
        );
      }
      
      // 모듈 헤더 주석 제거 (중복 방지)
      moduleContent = moduleContent.replace(/\/\/ ={80,}\n\/\/ .* 모듈\n\/\/ ={80,}\n/g, '');
      
      content += `\n// ================================================================================\n`;
      content += `// 모듈 ${index + 1}: ${path.basename(modulePath)}\n`;
      content += `// ================================================================================\n`;
      content += moduleContent;
      
    } catch (error) {
      console.error(`Error reading ${modulePath}:`, error);
    }
  });
  
  // 테스트 함수 추가
  content += `
// ================================================================================
// 🧪 통합 테스트 함수
// ================================================================================

function testCompleteSystem() {
  console.log('🧪 AICAMP AI 역량진단 시스템 통합 테스트 시작');
  console.log('================================');
  console.log('API 키:', HARDCODED_CONFIG.GEMINI_API_KEY.substring(0, 10) + '...');
  console.log('시트 ID:', HARDCODED_CONFIG.SPREADSHEET_ID);
  console.log('배포 ID:', HARDCODED_CONFIG.DEPLOYMENT_ID);
  console.log('================================');
  
  // 환경변수 확인은 건너뛰고 바로 테스트 진행
  console.log('✅ 하드코딩된 설정 사용');
  
  // 시트 초기화
  if (!initializeSheets()) {
    console.error('❌ 시트 초기화 실패');
    return;
  }
  
  // 테스트 데이터로 진단 실행
  const testData = {
    formType: 'ai-diagnosis',
    companyName: '테스트전자(주)',
    industry: '제조업',
    contactName: '김혁신',
    position: '경영기획팀장',
    email: 'test@testcompany.com',
    phone: '010-1234-5678',
    employeeCount: '150명',
    annualRevenue: '500억원',
    businessDescription: '스마트홈 IoT 기기 제조',
    mainChallenges: '생산 효율성 개선 필요',
    expectedBenefits: '생산성 40% 향상',
    currentAIUsage: 'ChatGPT 일부 사용',
    aiToolsList: 'ChatGPT',
    consultingArea: '스마트팩토리'
  };
  
  try {
    const result = handleAIDiagnosisSubmission(testData);
    console.log('✅ 테스트 완료:', result);
  } catch (error) {
    console.error('❌ 테스트 실패:', error);
  }
}
`;
  
  // 파일 저장
  const outputPath = 'docs/AICAMP_AI_DIAGNOSIS_COMPLETE_INTEGRATED.js';
  fs.writeFileSync(outputPath, content, 'utf8');
  console.log(`\n✅ 통합 파일 생성 완료: ${outputPath}`);
  console.log(`파일 크기: ${(content.length / 1024).toFixed(2)} KB`);
}

// 실행
createIntegratedFile();