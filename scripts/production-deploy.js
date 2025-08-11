#!/usr/bin/env node

/**
 * AICAMP Production 배포 스크립트
 * GkYDxALjf 메인 production 환경용
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 AICAMP Production 배포 시작...');
console.log('📦 배포 대상: GkYDxALjf (aicamp.club)');

// 환경 변수 확인
function checkEnvironment() {
  console.log('\n🔍 환경 설정 확인 중...');
  
  const requiredEnvVars = [
    'GEMINI_API_KEY',
    'NEXT_PUBLIC_GOOGLE_SHEETS_ID',
    'NEXT_PUBLIC_GOOGLE_SCRIPT_URL',
    'NEXT_PUBLIC_BASE_URL'
  ];
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn('⚠️ 누락된 환경 변수:', missingVars.join(', '));
    console.info('💡 Vercel 대시보드에서 환경 변수를 확인하세요.');
  } else {
    console.log('✅ 모든 필수 환경 변수가 설정되어 있습니다.');
  }
}

// 빌드 전 검증
function preBuildValidation() {
  console.log('\n🔧 빌드 전 검증 중...');
  
  try {
    // package.json 검증
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    console.log('✅ package.json 유효성 검사 통과');
    console.log(`📋 버전: ${packageJson.version}`);
    console.log(`🎯 배포 ID: ${packageJson.production?.deploymentId || 'GkYDxALjf'}`);
    
    // next.config.js 검증
    if (fs.existsSync('next.config.js')) {
      console.log('✅ next.config.js 설정 파일 확인');
    }
    
    // vercel.json 검증
    if (fs.existsSync('vercel.json')) {
      const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
      console.log('✅ vercel.json 설정 파일 확인');
      console.log(`⏱️ 최대 실행 시간: ${vercelConfig.functions?.['src/app/api/**/*.ts']?.maxDuration || 800}초`);
    }
    
  } catch (error) {
    console.error('❌ 설정 파일 검증 실패:', error.message);
    process.exit(1);
  }
}

// 린트 및 타입 검사
function runQualityChecks() {
  console.log('\n🔍 코드 품질 검사 중...');
  
  try {
    console.log('📝 ESLint 검사 중...');
    execSync('npm run lint', { stdio: 'inherit' });
    console.log('✅ ESLint 검사 완료');
    
    console.log('🔧 TypeScript 타입 검사 중...');
    execSync('npx tsc --noEmit', { stdio: 'inherit' });
    console.log('✅ TypeScript 타입 검사 완료');
    
  } catch (error) {
    console.warn('⚠️ 품질 검사에서 경고가 발생했지만 배포를 계속합니다.');
    console.warn('💡 배포 후 이슈를 확인하고 수정하세요.');
  }
}

// 빌드 실행
function buildProject() {
  console.log('\n🏗️ 프로젝트 빌드 중...');
  
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ 빌드 완료');
  } catch (error) {
    console.error('❌ 빌드 실패:', error.message);
    process.exit(1);
  }
}

// Vercel 배포
function deployToVercel() {
  console.log('\n🚀 Vercel에 배포 중...');
  
  try {
    const deployCmd = 'vercel --prod --yes';
    console.log(`실행 명령: ${deployCmd}`);
    
    const result = execSync(deployCmd, { encoding: 'utf8', stdio: 'pipe' });
    console.log('✅ 배포 완료');
    console.log('🌐 배포 결과:', result.trim());
    
    return result.trim();
  } catch (error) {
    console.error('❌ 배포 실패:', error.message);
    process.exit(1);
  }
}

// 배포 후 검증
function postDeployValidation() {
  console.log('\n🔍 배포 후 검증 중...');
  
  const healthCheckUrl = 'https://aicamp.club/api/system-health';
  
  setTimeout(() => {
    try {
      console.log(`🏥 헬스 체크: ${healthCheckUrl}`);
      execSync(`curl -f ${healthCheckUrl}`, { stdio: 'inherit' });
      console.log('✅ 헬스 체크 성공');
    } catch (error) {
      console.warn('⚠️ 헬스 체크 실패 - 수동으로 확인하세요.');
      console.warn(`🔗 직접 확인: ${healthCheckUrl}`);
    }
  }, 10000); // 10초 대기 후 헬스 체크
}

// 배포 요약
function deploymentSummary() {
  console.log('\n📊 배포 요약');
  console.log('=====================================');
  console.log('🎯 환경: Production (GkYDxALjf)');
  console.log('🌐 도메인: https://aicamp.club');
  console.log('📅 배포 시간:', new Date().toLocaleString('ko-KR'));
  console.log('🚀 상태: 배포 완료');
  console.log('=====================================');
  console.log('\n✅ Production 배포가 성공적으로 완료되었습니다!');
  console.log('🔗 사이트 확인: https://aicamp.club');
  console.log('🏥 헬스 체크: https://aicamp.club/api/system-health');
}

// 메인 실행
async function main() {
  try {
    checkEnvironment();
    preBuildValidation();
    runQualityChecks();
    buildProject();
    deployToVercel();
    postDeployValidation();
    deploymentSummary();
    
  } catch (error) {
    console.error('\n❌ 배포 프로세스 중 오류 발생:', error.message);
    process.exit(1);
  }
}

// 스크립트 실행
if (require.main === module) {
  main();
}

module.exports = { main };
