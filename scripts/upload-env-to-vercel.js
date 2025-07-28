/**
 * ================================================================================
 * Vercel 환경변수 자동 업데이트 스크립트 (2025.01.27 최종 동기화 버전)
 * ================================================================================
 * 
 * 🎯 목적: 
 * - Google Apps Script와 완전 동기화된 환경변수를 Vercel에 자동 업로드
 * - 수동 설정 오류 방지 및 배포 자동화
 * 
 * 🔧 사용법:
 * npm install -g vercel
 * vercel login
 * node scripts/upload-env-to-vercel.js
 * 
 * 📋 업데이트되는 환경변수:
 * ✅ NEXT_PUBLIC_GOOGLE_SCRIPT_URL (최신 Apps Script URL)
 * ✅ NEXT_PUBLIC_GOOGLE_SHEETS_ID (동기화된 시트 ID)
 * ✅ GEMINI_API_KEY (AI 기능용)
 * ✅ ADMIN_EMAIL (관리자 이메일)
 * ✅ 기타 브랜딩 및 설정 변수들
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 🌐 Google Apps Script와 완전 동기화된 환경변수 (2025.01.27)
const SYNCHRONIZED_ENV_VARS = {
  // ✅ Google Apps Script 완전 동기화
  'NEXT_PUBLIC_GOOGLE_SCRIPT_URL': 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec',
  'NEXT_PUBLIC_GOOGLE_SCRIPT_ID': '1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj',
  'NEXT_PUBLIC_GOOGLE_SCRIPT_DEPLOYMENT_ID': 'AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0',
  
  // ✅ Google Sheets 완전 동기화
  'NEXT_PUBLIC_GOOGLE_SHEETS_ID': '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0',
  'NEXT_PUBLIC_GOOGLE_SHEETS_URL': 'https://docs.google.com/spreadsheets/d/1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0/edit',
  
  // ✅ AI & 관리자 설정
  'GEMINI_API_KEY': 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM',
  'ADMIN_EMAIL': 'hongik423@gmail.com',
  'NEXT_PUBLIC_SUPPORT_EMAIL': 'hongik423@gmail.com',
  'BETA_ADMIN_EMAIL': 'hongik423@gmail.com',
  
  // ✅ 기본 환경 설정
  'NODE_ENV': 'production',
  'NEXT_PUBLIC_BASE_URL': 'https://ai-camp-landingpage.vercel.app',
  'NEXT_PUBLIC_APP_NAME': 'AI CAMP',
  'NEXT_PUBLIC_APP_DESCRIPTION': 'AI기반 무료 진단 및 전문가 컨설팅 서비스',
  
  // ✅ AICAMP 브랜딩 통일
  'NEXT_PUBLIC_COMPANY_NAME': 'AI CAMP',
  'NEXT_PUBLIC_COMPANY_FULL_NAME': 'AI CAMP',
  'NEXT_PUBLIC_CONSULTANT_NAME': '이후경 교장',
  'NEXT_PUBLIC_CONSULTANT_TITLE': '경영지도사',
  'NEXT_PUBLIC_COMPANY_EMAIL': 'hongik423@gmail.com',
  
  // ✅ 시스템 설정
  'NEXT_PUBLIC_BETA_FEEDBACK_ENABLED': 'true',
  'DEBUG_MODE': 'false',
  'AUTO_REPLY_ENABLED': 'true',
  'NOTIFICATION_ENABLED': 'true',
  'NEXT_TELEMETRY_DISABLED': '1'
};

// 🚀 Vercel CLI 명령어 실행 함수
function runVercelCommand(command) {
  try {
    console.log(`🔄 실행 중: ${command}`);
    const result = execSync(command, { 
      encoding: 'utf8', 
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 30000 // 30초 타임아웃
    });
    return { success: true, output: result };
  } catch (error) {
    console.error(`❌ 명령어 실행 실패: ${command}`);
    console.error('오류 내용:', error.message);
    return { success: false, error: error.message };
  }
}

// 📝 환경변수 업로드 메인 함수
async function uploadEnvironmentVariables() {
  console.log('🚀 AICAMP Vercel 환경변수 자동 업데이트 시작 (2025.01.27 최종 동기화 버전)');
  console.log('==================================================================================');
  
  // 1. Vercel CLI 설치 확인
  console.log('🔍 Vercel CLI 확인 중...');
  const vercelCheck = runVercelCommand('vercel --version');
  if (!vercelCheck.success) {
    console.error('❌ Vercel CLI가 설치되지 않았습니다.');
    console.log('💡 설치 방법: npm install -g vercel');
    console.log('💡 로그인: vercel login');
    return;
  }
  console.log('✅ Vercel CLI 확인 완료:', vercelCheck.output.trim());
  
  // 2. 현재 프로젝트 확인
  console.log('\n🔍 Vercel 프로젝트 확인 중...');
  const projectCheck = runVercelCommand('vercel ls');
  if (!projectCheck.success) {
    console.error('❌ Vercel 프로젝트를 찾을 수 없습니다.');
    console.log('💡 먼저 vercel link 명령어를 실행하세요.');
    return;
  }
  
  // 3. 환경변수 업데이트 시작
  console.log('\n📝 환경변수 업데이트 시작...');
  console.log(`🎯 총 ${Object.keys(SYNCHRONIZED_ENV_VARS).length}개 환경변수 업데이트 예정\n`);
  
  let successCount = 0;
  let failureCount = 0;
  const failures = [];
  
  for (const [key, value] of Object.entries(SYNCHRONIZED_ENV_VARS)) {
    console.log(`📤 업데이트: ${key}`);
    
    // 보안상 민감한 정보는 마스킹해서 출력
    const displayValue = key.includes('KEY') || key.includes('TOKEN') 
      ? value.substring(0, 8) + '****' + value.slice(-4)
      : value.substring(0, 50) + (value.length > 50 ? '...' : '');
    
    console.log(`   값: ${displayValue}`);
    
    // Vercel에 환경변수 설정 (production, preview, development 모두 적용)
    const command = `vercel env add ${key} production preview development --force`;
    
    // 환경변수 값을 stdin으로 전달
    try {
      const result = execSync(command, {
        input: value,
        encoding: 'utf8',
        timeout: 10000,
        stdio: ['pipe', 'pipe', 'pipe']
      });
      
      console.log('   ✅ 성공\n');
      successCount++;
    } catch (error) {
      console.log('   ❌ 실패:', error.message.split('\n')[0]);
      console.log('');
      failureCount++;
      failures.push({ key, error: error.message });
    }
  }
  
  console.log('==================================================================================');
  console.log('📊 업데이트 결과 요약:');
  console.log(`✅ 성공: ${successCount}개`);
  console.log(`❌ 실패: ${failureCount}개`);
  
  if (failures.length > 0) {
    console.log('\n❌ 실패한 환경변수들:');
    failures.forEach(({ key, error }) => {
      console.log(`   - ${key}: ${error.split('\n')[0]}`);
    });
  }
  
  if (successCount > 0) {
    console.log('\n🎉 환경변수 업데이트 완료! 이제 다음 단계를 진행하세요:');
    console.log('1. vercel --prod 명령어로 프로덕션 배포');
    console.log('2. 배포 완료 후 웹사이트에서 진단/상담 신청 테스트');
    console.log('3. 구글시트에 데이터가 정상적으로 저장되는지 확인');
    
    console.log('\n🔗 확인할 링크들:');
    console.log(`📊 구글시트: ${SYNCHRONIZED_ENV_VARS.NEXT_PUBLIC_GOOGLE_SHEETS_URL}`);
    console.log(`🌐 웹사이트: ${SYNCHRONIZED_ENV_VARS.NEXT_PUBLIC_BASE_URL}`);
    console.log(`⚙️ Apps Script: https://script.google.com/u/0/home/projects/${SYNCHRONIZED_ENV_VARS.NEXT_PUBLIC_GOOGLE_SCRIPT_ID}/edit`);
  }
  
  console.log('==================================================================================');
}

// 📋 환경변수 검증 함수
function validateEnvironmentVariables() {
  console.log('🔍 환경변수 검증 중...\n');
  
  const validations = [
    {
      key: 'NEXT_PUBLIC_GOOGLE_SCRIPT_URL',
      check: (value) => value.includes('script.google.com') && value.includes('exec'),
      message: 'Google Apps Script URL 형식 확인'
    },
    {
      key: 'NEXT_PUBLIC_GOOGLE_SHEETS_ID',
      check: (value) => value.length === 44 && value.includes('1Q'),
      message: 'Google Sheets ID 형식 확인'
    },
    {
      key: 'GEMINI_API_KEY',
      check: (value) => value.startsWith('AIza') && value.length > 30,
      message: 'Gemini API Key 형식 확인'
    },
    {
      key: 'ADMIN_EMAIL',
      check: (value) => value.includes('@') && value.includes('gmail.com'),
      message: '관리자 이메일 형식 확인'
    }
  ];
  
  let allValid = true;
  
  validations.forEach(({ key, check, message }) => {
    const value = SYNCHRONIZED_ENV_VARS[key];
    const isValid = check(value);
    console.log(`${isValid ? '✅' : '❌'} ${message}: ${key}`);
    if (!isValid) allValid = false;
  });
  
  console.log(`\n🎯 전체 검증 결과: ${allValid ? '✅ 모든 환경변수가 유효합니다' : '❌ 일부 환경변수에 문제가 있습니다'}\n`);
  return allValid;
}

// 🎯 메인 실행
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--validate')) {
    validateEnvironmentVariables();
  } else if (args.includes('--help')) {
    console.log(`
🚀 AICAMP Vercel 환경변수 자동 업데이트 도구

사용법:
  node scripts/upload-env-to-vercel.js           # 환경변수 업데이트
  node scripts/upload-env-to-vercel.js --validate # 환경변수 검증만
  node scripts/upload-env-to-vercel.js --help     # 도움말

전제조건:
  1. npm install -g vercel
  2. vercel login (GitHub 계정 연동)
  3. vercel link (프로젝트 연결)

업데이트되는 환경변수: ${Object.keys(SYNCHRONIZED_ENV_VARS).length}개
- Google Apps Script 연동 변수들
- Google Sheets 연동 변수들  
- AI API 및 관리자 설정
- 브랜딩 및 기본 설정들
    `);
  } else {
    // 검증 후 업로드 실행
    if (validateEnvironmentVariables()) {
      uploadEnvironmentVariables();
    } else {
      console.error('❌ 환경변수 검증 실패. 업데이트를 중단합니다.');
      process.exit(1);
    }
  }
}

module.exports = { uploadEnvironmentVariables, validateEnvironmentVariables, SYNCHRONIZED_ENV_VARS }; 