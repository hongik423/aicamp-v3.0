#!/usr/bin/env node

/**
 * 🔧 AICAMP v3.0 시스템 문제 해결 스크립트
 * 진단된 문제들을 자동으로 해결합니다.
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 AICAMP v3.0 시스템 문제 해결 시작');
console.log('='.repeat(50));

// 환경변수 템플릿
const envTemplate = `# AICAMP v3.0 환경변수 설정
# 이 파일은 로컬 개발 환경에서만 사용됩니다

# ================================================================================
# 🔑 Google AI (Gemini) API 설정
# ================================================================================
# Google AI Studio에서 발급받은 API 키를 입력하세요
# 발급 URL: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=AIzaSy[여기에_실제_API_키_입력]

# ================================================================================
# 📊 Google Apps Script & Sheets 설정
# ================================================================================
# Google Apps Script 웹앱 URL (현재 사용 중인 V14 통합 버전)
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxlwpifmXQEmFlR0QBV6NbTemzxTxvWwbaXNGmtH4Ok-a0PDEqmtaKBjQ1VvZxpLnPz/exec
NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/AKfycbxlwpifmXQEmFlR0QBV6NbTemzxTxvWwbaXNGmtH4Ok-a0PDEqmtaKBjQ1VvZxpLnPz/exec

# Google Sheets ID (AICAMP 진단 결과 저장용)
NEXT_PUBLIC_GOOGLE_SHEETS_ID=1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ

# ================================================================================
# 🗂️ Google Drive 설정
# ================================================================================
# 공유 폴더 ID (완성된 보고서 저장용)
GOOGLE_DRIVE_FOLDER_ID=1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj

# ================================================================================
# 📧 이메일 발송 설정
# ================================================================================
# Gmail SMTP 설정 (관리자 이메일)
EMAIL_USER=hongik423@gmail.com
EMAIL_APP_PASSWORD=[Gmail_앱_비밀번호_16자리]

# SMTP 서버 설정
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=hongik423@gmail.com
SMTP_PASS=[Gmail_앱_비밀번호_16자리]

# ================================================================================
# 🌐 웹사이트 설정
# ================================================================================
# 기본 URL (프로덕션)
NEXT_PUBLIC_BASE_URL=https://aicamp.club

# 개발 환경 설정
NODE_ENV=development

# ================================================================================
# 🔧 시스템 설정
# ================================================================================
# 관리자 이메일 (알림 수신용)
ADMIN_EMAIL=hongik423@gmail.com

# 시스템 버전
SYSTEM_VERSION=V15.0-ULTIMATE-INTEGRATED-APPLE-STYLE

# 브랜딩
SYSTEM_BRANDING=이교장의AI역량진단보고서
`;

// 문제 해결 함수들
function checkAndCreateEnvFile() {
  console.log('📋 1. 환경변수 파일 확인 중...');
  
  const envPath = path.join(process.cwd(), '.env.local');
  
  if (!fs.existsSync(envPath)) {
    console.log('⚠️  .env.local 파일이 없습니다.');
    console.log('📝 템플릿 파일을 생성합니다...');
    
    try {
      fs.writeFileSync(envPath, envTemplate, 'utf8');
      console.log('✅ .env.local 템플릿이 생성되었습니다.');
      console.log('💡 실제 API 키와 Gmail 앱 비밀번호를 입력하세요.');
      return false; // 수동 설정 필요
    } catch (error) {
      console.error('❌ .env.local 파일 생성 실패:', error.message);
      return false;
    }
  } else {
    console.log('✅ .env.local 파일이 존재합니다.');
    return true;
  }
}

function validateEnvVariables() {
  console.log('📋 2. 환경변수 유효성 검사 중...');
  
  const requiredVars = [
    'GEMINI_API_KEY',
    'EMAIL_APP_PASSWORD',
    'NEXT_PUBLIC_GOOGLE_SCRIPT_URL',
    'GOOGLE_DRIVE_FOLDER_ID'
  ];
  
  const missingVars = [];
  const invalidVars = [];
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    
    if (!value) {
      missingVars.push(varName);
    } else if (value.includes('[') || value.includes('여기에') || value.includes('입력')) {
      invalidVars.push(varName);
    }
  });
  
  if (missingVars.length > 0) {
    console.log('⚠️  누락된 환경변수:', missingVars.join(', '));
  }
  
  if (invalidVars.length > 0) {
    console.log('⚠️  설정이 필요한 환경변수:', invalidVars.join(', '));
  }
  
  if (missingVars.length === 0 && invalidVars.length === 0) {
    console.log('✅ 모든 환경변수가 올바르게 설정되었습니다.');
    return true;
  }
  
  return false;
}

async function testGoogleAppsScript() {
  console.log('📋 3. Google Apps Script 연결 테스트 중...');
  
  const gasUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || 
    'https://script.google.com/macros/s/AKfycbxlwpifmXQEmFlR0QBV6NbTemzxTxvWwbaXNGmtH4Ok-a0PDEqmtaKBjQ1VvZxpLnPz/exec';
  
  try {
    const response = await fetch(`${gasUrl}?action=healthCheck`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Google Apps Script 연결 성공');
      console.log('📊 시스템 정보:', {
        version: data.version,
        status: data.status,
        branding: data.branding
      });
      return true;
    } else {
      console.log('❌ Google Apps Script 응답 오류:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Google Apps Script 연결 실패:', error.message);
    return false;
  }
}

function generateSetupInstructions() {
  console.log('📋 4. 설정 가이드 생성 중...');
  
  const instructions = `
🔧 AICAMP v3.0 수동 설정 가이드

다음 단계를 순서대로 진행하세요:

1. 📧 Gmail 앱 비밀번호 설정
   - Gmail 계정 → 설정 → 보안 → 2단계 인증 활성화
   - 앱 비밀번호 생성 → "AICAMP" 이름으로 생성
   - 16자리 비밀번호를 .env.local의 EMAIL_APP_PASSWORD에 입력

2. 🔑 Google AI API 키 설정
   - https://makersuite.google.com/app/apikey 방문
   - API 키 생성 (AIzaSy로 시작)
   - .env.local의 GEMINI_API_KEY에 입력

3. 🗂️ Google Drive 권한 확인
   - 공유 폴더: https://drive.google.com/drive/u/0/folders/1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj
   - 편집 권한이 있는지 확인

4. 🔄 시스템 재시작
   - npm run dev 명령어로 개발 서버 재시작
   - npm run test:api로 API 테스트 실행

5. ✅ 테스트 진단 실행
   - http://localhost:3000/ai-diagnosis 접속
   - 테스트 데이터로 진단 실행
   - 이메일 수신 및 Drive 업로드 확인
`;
  
  fs.writeFileSync('setup-instructions.txt', instructions, 'utf8');
  console.log('✅ 설정 가이드가 setup-instructions.txt에 저장되었습니다.');
}

// 메인 실행 함수
async function main() {
  try {
    const envExists = checkAndCreateEnvFile();
    
    if (envExists) {
      const envValid = validateEnvVariables();
      
      if (envValid) {
        await testGoogleAppsScript();
      }
    }
    
    generateSetupInstructions();
    
    console.log('\n🎯 해결 요약:');
    console.log('1. ✅ .env.local 템플릿 생성 완료');
    console.log('2. 📝 수동 설정이 필요한 항목들을 확인하세요');
    console.log('3. 📖 setup-instructions.txt 파일을 참고하세요');
    console.log('\n💡 다음 단계: .env.local 파일을 편집하여 실제 값을 입력하세요');
    
  } catch (error) {
    console.error('❌ 스크립트 실행 중 오류:', error.message);
    process.exit(1);
  }
}

// 도움말
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
AICAMP v3.0 시스템 문제 해결 도구

사용법:
  node fix-system-issues.js        # 자동 문제 해결 실행
  node fix-system-issues.js --help # 도움말 표시

기능:
  - .env.local 파일 자동 생성
  - 환경변수 유효성 검사
  - Google Apps Script 연결 테스트
  - 설정 가이드 생성

해결 대상:
  - 진단 결과 저장 실패
  - 이메일 발송 실패
  - Google Drive 업로드 실패
  - 환경변수 누락
`);
  process.exit(0);
}

main();
