#!/usr/bin/env node

/**
 * AI CAMP Vercel 환경변수 설정 스크립트 (2025.07.27 최종버전)
 * AI CAMP 시스템 통합 완료된 환경변수로 Vercel 환경 설정
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('================================================');
console.log('🚀 AI CAMP Vercel 환경변수 설정 (2025.07.27 최종버전)');
console.log('================================================\n');

// 사용자가 제공한 정확한 환경변수
const ENV_VARIABLES = [
  {
    key: 'GEMINI_API_KEY',
    value: 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM',
    description: 'Google Gemini API 키'
  },
  {
    key: 'NEXT_PUBLIC_GOOGLE_SCRIPT_URL',
    value: 'https://script.google.com/macros/s/AKfycbzMKcB94ld2xP6gu0xlRBf4hI16cRTZ8JhCQT0iG3QeToQt4VmZu5X7lYNV5YSgQaJB/exec',
    description: 'Google Apps Script 웹앱 URL (정확한 버전)'
  },
  {
    key: 'NEXT_PUBLIC_GOOGLE_SCRIPT_ID',
    value: '1Iot8Hzeuq8plBXy0ODQ43_k3JPa1ec_dJUgFqNyziIu5xShVylUYYl5z',
    description: 'Google Apps Script ID'
  },
  {
    key: 'NEXT_PUBLIC_GOOGLE_SCRIPT_DEPLOYMENT_ID',
    value: 'AKfycbzMKcB94ld2xP6gu0xlRBf4hI16cRTZ8JhCQT0iG3QeToQt4VmZu5X7lYNV5YSgQaJB',
    description: 'Google Apps Script 배포 ID (정확한 버전)'
  },
  {
    key: 'NEXT_PUBLIC_GOOGLE_SCRIPT_LIBRARY_URL',
    value: 'https://script.google.com/macros/library/d/1Iot8Hzeuq8plBXy0ODQ43_k3JPa1ec_dJUgFqNyziIu5xShVylUYYl5z/9',
    description: 'Google Apps Script 라이브러리 URL'
  },
  {
    key: 'NEXT_PUBLIC_GOOGLE_SHEETS_ID',
    value: '1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00',
    description: 'Google Sheets ID'
  },
  {
    key: 'NEXT_PUBLIC_GOOGLE_SHEETS_URL',
    value: 'https://docs.google.com/spreadsheets/d/1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00/edit?gid=1689329514#gid=1689329514',
    description: 'Google Sheets URL (정확한 버전)'
  },
  {
    key: 'NEXT_PUBLIC_BETA_FEEDBACK_ENABLED',
    value: 'true',
    description: '베타 피드백 활성화'
  },
  {
    key: 'BETA_ADMIN_EMAIL',
    value: 'hongik423@gmail.com',
    description: '베타 관리자 이메일'
  },
  {
    key: 'NEXT_PUBLIC_COMPANY_NAME',
    value: 'AI CAMP',
    description: '회사명'
  },
  {
    key: 'NEXT_PUBLIC_CONSULTANT_NAME',
    value: '이후경 교장',
    description: '컨설턴트 이름'
  },
  {
    key: 'NEXT_PUBLIC_COMPANY_EMAIL',
    value: 'hongik423@gmail.com',
    description: '회사 이메일'
  },
  {
    key: 'NEXT_PUBLIC_COMPANY_PHONE',
    value: '010-9251-9743',
    description: '회사 전화번호'
  },
  {
    key: 'NODE_ENV',
    value: 'production',
    description: '환경 모드'
  },
  {
    key: 'VERCEL_ENV',
    value: 'production',
    description: 'Vercel 환경'
  }
];

console.log('🔥 AI CAMP 2025.07.27 최종 환경변수 설정 시작...\n');

// 배포 정보 출력
console.log('📊 핵심 배포 정보:');
console.log(`- 배포 ID: AKfycbzMKcB94ld2xP6gu0xlRBf4hI16cRTZ8JhCQT0iG3QeToQt4VmZu5X7lYNV5YSgQaJB`);
console.log(`- 웹앱 URL: https://script.google.com/macros/s/AKfycbzMKcB94ld2xP6gu0xlRBf4hI16cRTZ8JhCQT0iG3QeToQt4VmZu5X7lYNV5YSgQaJB/exec`);
console.log(`- Google Sheets ID: 1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00\n`);

// 환경변수 설정
let successCount = 0;
let errorCount = 0;

for (const envVar of ENV_VARIABLES) {
  try {
    console.log(`🔧 설정 중: ${envVar.key}`);
    console.log(`   설명: ${envVar.description}`);
    
    // Vercel 환경변수 설정 (production 환경)
    const command = `vercel env add ${envVar.key} production`;
    
    // 환경변수 값을 stdin으로 전달
    execSync(command, { 
      input: envVar.value + '\n',
      stdio: ['pipe', 'pipe', 'pipe'],
      encoding: 'utf8'
    });
    
    console.log(`   ✅ ${envVar.key} 설정 완료\n`);
    successCount++;
    
  } catch (error) {
    console.error(`   ❌ ${envVar.key} 설정 실패: ${error.message}\n`);
    errorCount++;
  }
  
  // 과도한 API 호출 방지를 위한 잠시 대기
  await new Promise(resolve => setTimeout(resolve, 1000));
}

console.log('================================================');
console.log('🎉 Vercel 환경변수 설정 완료!');
console.log('================================================\n');

console.log(`📊 설정 결과:`);
console.log(`- 성공: ${successCount}개`);
console.log(`- 실패: ${errorCount}개`);
console.log(`- 전체: ${ENV_VARIABLES.length}개\n`);

if (errorCount === 0) {
  console.log('✅ 모든 환경변수가 성공적으로 설정되었습니다!');
  console.log('\n🚀 이제 다음 명령어로 배포할 수 있습니다:');
  console.log('   vercel --prod\n');
} else {
  console.log('⚠️ 일부 환경변수 설정에 실패했습니다.');
  console.log('   Vercel CLI가 설치되어 있고 로그인되어 있는지 확인해주세요.');
  console.log('   명령어: vercel login\n');
}

console.log('🔗 확인 방법:');
console.log('   vercel env ls  # 환경변수 목록 확인');
console.log('   vercel --prod  # 프로덕션 배포');

// Promise 기반의 sleep 함수
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
} 