#!/usr/bin/env node

/**
 * AICAMP v3.0 테스트 서버 스크립트
 * 개발 환경에서 빠른 테스트를 위한 유틸리티
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 AICAMP v3.0 테스트 서버 시작');
console.log('='.repeat(50));

// 환경 변수 확인
function checkEnvironment() {
  console.log('📋 환경 설정 확인 중...');
  
  const requiredFiles = [
    'package.json',
    'next.config.js',
    'src/app/layout.tsx',
    '.env.local'
  ];

  const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));
  
  if (missingFiles.length > 0) {
    console.log('⚠️  누락된 파일:', missingFiles.join(', '));
  } else {
    console.log('✅ 모든 필수 파일이 존재합니다.');
  }
}

// 포트 확인
function checkPort(port = 3000) {
  const net = require('net');
  const server = net.createServer();

  return new Promise((resolve) => {
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    
    server.on('error', () => resolve(false));
  });
}

// 메인 실행 함수
async function main() {
  try {
    checkEnvironment();
    
    console.log('\n🔍 포트 3000 확인 중...');
    const isPortAvailable = await checkPort(3000);
    
    if (!isPortAvailable) {
      console.log('⚠️  포트 3000이 이미 사용 중입니다.');
      console.log('💡 다른 포트를 사용하거나 기존 프로세스를 종료하세요.');
    } else {
      console.log('✅ 포트 3000 사용 가능');
    }

    console.log('\n🌐 개발 서버 시작 중...');
    console.log('📍 URL: http://localhost:3000');
    console.log('🔧 개발자 도구: http://localhost:3000/api/health/check');
    
    // Next.js 개발 서버 실행
    const devServer = spawn('npm', ['run', 'dev'], {
      stdio: 'inherit',
      shell: true
    });

    devServer.on('error', (err) => {
      console.error('❌ 서버 시작 실패:', err.message);
    });

    devServer.on('close', (code) => {
      console.log(`\n🛑 서버가 종료되었습니다. (코드: ${code})`);
    });

    // Ctrl+C 처리
    process.on('SIGINT', () => {
      console.log('\n🛑 서버를 종료합니다...');
      devServer.kill('SIGINT');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    process.exit(1);
  }
}

// 도움말 표시
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
AICAMP v3.0 테스트 서버

사용법:
  node test-server.js          # 개발 서버 시작
  node test-server.js --help   # 도움말 표시

기능:
  - 환경 설정 자동 확인
  - 포트 충돌 감지
  - 개발 서버 자동 시작
  - 헬스 체크 엔드포인트 제공

테스트 URL:
  - 메인 페이지: http://localhost:3000
  - 헬스 체크: http://localhost:3000/api/health/check
  - AI 진단: http://localhost:3000/ai-diagnosis
  - 서비스: http://localhost:3000/services
`);
  process.exit(0);
}

main();
