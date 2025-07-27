#!/usr/bin/env node

/**
 * 🚀 AI CAMP Vercel 환경변수 긴급 수정 스크립트
 * 
 * 문제 해결: M-CENTER → AI CAMP 브랜딩 통일
 * 
 * 사용법:
 * 1. npm install -g vercel
 * 2. vercel login
 * 3. node scripts/setup-vercel-env-aicamp-fix.js
 */

const { execSync } = require('child_process');

// 🔧 올바른 AI CAMP 환경변수 설정
const ENV_VARS = {
  // Google Gemini API 키
  'GEMINI_API_KEY': 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM',
  
  // Google Apps Script 설정 (AI CAMP 전용)
  'NEXT_PUBLIC_GOOGLE_SCRIPT_URL': 'https://script.google.com/macros/s/AKfycbzMKcB94ld2xP6gu0xlRBf4hI16cRTZ8JhCQT0iG3QeToQt4VmZu5X7lYNV5YSgQaJB/exec',
  'NEXT_PUBLIC_GOOGLE_SCRIPT_ID': '1Iot8Hzeuq8plBXy0ODQ43_k3JPa1ec_dJUgFqNyziIu5xShVylUYYl5z',
  'NEXT_PUBLIC_GOOGLE_SCRIPT_DEPLOYMENT_ID': 'AKfycbzMKcB94ld2xP6gu0xlRBf4hI16cRTZ8JhCQT0iG3QeToQt4VmZu5X7lYNV5YSgQaJB',
  
  // 올바른 AI CAMP 구글시트
  'NEXT_PUBLIC_GOOGLE_SHEETS_ID': '1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00',
  'NEXT_PUBLIC_GOOGLE_SHEETS_URL': 'https://docs.google.com/spreadsheets/d/1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00/edit?gid=1689329514#gid=1689329514',
  
  // AI CAMP 브랜딩 통일
  'NEXT_PUBLIC_COMPANY_NAME': 'AI CAMP',
  'NEXT_PUBLIC_COMPANY_FULL_NAME': 'AI CAMP',
  'NEXT_PUBLIC_CONSULTANT_NAME': '이후경 교장',
  'NEXT_PUBLIC_CONSULTANT_TITLE': '경영지도사',
  'NEXT_PUBLIC_COMPANY_EMAIL': 'hongik423@gmail.com',
  'NEXT_PUBLIC_SUPPORT_EMAIL': 'hongik423@gmail.com',
  'NEXT_PUBLIC_COMPANY_PHONE': '010-9251-9743',
  'NEXT_PUBLIC_COMPANY_WEBSITE': 'https://aicamp.club',
  
  // 배포 환경
  'NODE_ENV': 'production',
  'NEXT_PUBLIC_BASE_URL': 'https://aicamp.club',
  
  // 베타 피드백 시스템 (AI CAMP)
  'BETA_FEEDBACK_ADMIN_EMAIL': 'hongik423@gmail.com',
  'BETA_FEEDBACK_REPLY_EMAIL': 'hongik423@gmail.com',
  'NEXT_PUBLIC_BETA_FEEDBACK_ENABLED': 'true',
  'ADMIN_EMAIL': 'hongik423@gmail.com',
  'AUTO_REPLY_ENABLED': 'true',
  'DEBUG_MODE': 'false',
  'VERCEL_ENV': 'production',
  'NEXT_TELEMETRY_DISABLED': '1'
};

console.log('🚨 AI CAMP 브랜딩 긴급 수정 시작...\n');
console.log('📋 수정 사항:');
console.log('  - M-CENTER → AI CAMP 브랜딩 통일');
console.log('  - 올바른 구글시트 연결');
console.log('  - hongik423@gmail.com 메일 발송\n');

function execCommand(command) {
  try {
    const result = execSync(command, { encoding: 'utf8' });
    return { success: true, output: result.trim() };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function setEnvironmentVariable(key, value, environment = 'production') {
  console.log(`📝 ${key} 업데이트 중...`);
  
  try {
    const child = require('child_process').spawn('vercel', ['env', 'add', key, environment], {
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    // 값 입력
    child.stdin.write(value + '\n');
    child.stdin.end();
    
    return new Promise((resolve) => {
      let output = '';
      let error = '';
      
      child.stdout.on('data', (data) => {
        output += data.toString();
      });
      
      child.stderr.on('data', (data) => {
        error += data.toString();
      });
      
      child.on('close', (code) => {
        if (code === 0) {
          console.log(`  ✅ ${key} 업데이트 완료`);
          resolve({ success: true });
        } else {
          console.log(`  ❌ ${key} 업데이트 실패:`, error);
          resolve({ success: false, error });
        }
      });
    });
  } catch (error) {
    console.log(`  ❌ ${key} 업데이트 실패:`, error.message);
    return { success: false, error: error.message };
  }
}

async function main() {
  // 1. Vercel CLI 확인
  const vercelCheck = execCommand('vercel --version');
  if (!vercelCheck.success) {
    console.log('❌ Vercel CLI가 설치되지 않았습니다.');
    console.log('💡 설치: npm install -g vercel');
    process.exit(1);
  }
  
  console.log(`✅ Vercel CLI: ${vercelCheck.output}\n`);
  
  // 2. 로그인 확인
  const whoAmI = execCommand('vercel whoami');
  if (!whoAmI.success) {
    console.log('❌ Vercel 로그인 필요: vercel login');
    process.exit(1);
  }
  
  console.log(`✅ 로그인됨: ${whoAmI.output}\n`);
  
  // 3. 환경변수 업데이트
  console.log('🔧 AI CAMP 환경변수 업데이트 시작...\n');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const [key, value] of Object.entries(ENV_VARS)) {
    const result = await setEnvironmentVariable(key, value);
    if (result.success) {
      successCount++;
    } else {
      failCount++;
    }
    
    // API 제한 방지 대기
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // 4. 결과 요약
  console.log('\n📊 환경변수 업데이트 결과:');
  console.log(`  ✅ 성공: ${successCount}개`);
  console.log(`  ❌ 실패: ${failCount}개`);
  console.log(`  📋 전체: ${Object.keys(ENV_VARS).length}개\n`);
  
  // 5. 재배포 안내
  console.log('🚀 긴급 수정 완료!');
  console.log('');
  console.log('⚡ 즉시 재배포 필요:');
  console.log('1. vercel --prod (즉시 재배포)');
  console.log('2. 약 2-3분 후 aicamp.club에서 테스트');
  console.log('3. AI 진단 신청하여 AI CAMP 메일 확인');
  console.log('');
  console.log('🔗 확인 링크:');
  console.log(`📊 AI CAMP 구글시트: ${ENV_VARS.NEXT_PUBLIC_GOOGLE_SHEETS_URL}`);
  console.log('🌐 사이트: https://aicamp.club');
  console.log('📧 관리자 메일: hongik423@gmail.com');
  console.log('');
  console.log('✅ 이제 AI CAMP 명의로 메일 발송됩니다!');
}

// 스크립트 실행
main().catch(error => {
  console.error('❌ 긴급 수정 중 오류:', error);
  process.exit(1);
}); 