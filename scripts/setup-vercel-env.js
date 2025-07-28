/**
 * Vercel 환경변수 설정 스크립트
 * .env.local의 환경변수들을 Vercel 프로젝트에 설정
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 🎯 환경변수 매핑 (로컬 → Vercel)
const ENV_MAPPING = {
  'NEXT_PUBLIC_GOOGLE_SCRIPT_URL': 'next_public_google_script_url',
  'NEXT_PUBLIC_GOOGLE_SHEETS_ID': 'next_public_google_sheets_id', 
  'GEMINI_API_KEY': 'gemini_api_key',
  'NEXT_PUBLIC_COMPANY_NAME': 'next_public_company_name',
  'NEXT_PUBLIC_CONSULTANT_NAME': 'next_public_consultant_name'
};

function setupVercelEnvironmentVariables() {
  try {
    console.log('🔧 Vercel 환경변수 설정 시작...');
    
    // .env.local 파일 읽기
    const envPath = path.join(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) {
      throw new Error('.env.local 파일이 존재하지 않습니다.');
    }
    
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};
    
    // 환경변수 파싱
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        if (ENV_MAPPING[key]) {
          envVars[key] = value;
        }
      }
    });
    
    console.log('📋 설정할 환경변수들:');
    Object.keys(envVars).forEach(key => {
      console.log(`  ✅ ${key}: ${envVars[key].substring(0, 50)}${envVars[key].length > 50 ? '...' : ''}`);
    });
    
    // Vercel 환경변수 설정
    let successCount = 0;
    let errorCount = 0;
    
    Object.entries(envVars).forEach(([key, value]) => {
      try {
        console.log(`\n🔧 ${key} 설정 중...`);
        
        // 환경변수 설정 명령어 실행
        const command = `vercel env add ${key} production`;
        console.log(`실행: ${command}`);
        
        // 환경변수 값을 stdin으로 전달
        execSync(command, { 
          input: value,
          stdio: ['pipe', 'pipe', 'pipe'],
          encoding: 'utf8'
        });
        
        console.log(`✅ ${key} 설정 완료`);
        successCount++;
        
      } catch (error) {
        console.error(`❌ ${key} 설정 실패:`, error.message);
        errorCount++;
      }
    });
    
    console.log(`\n📊 환경변수 설정 결과:`);
    console.log(`  ✅ 성공: ${successCount}개`);
    console.log(`  ❌ 실패: ${errorCount}개`);
    
    if (errorCount === 0) {
      console.log('🎉 모든 환경변수가 성공적으로 설정되었습니다!');
      return true;
    } else {
      console.log('⚠️ 일부 환경변수 설정에 실패했습니다. 수동으로 설정해주세요.');
      return false;
    }
    
  } catch (error) {
    console.error('❌ 환경변수 설정 중 오류:', error.message);
    return false;
  }
}

// 환경변수 목록 출력
function printEnvironmentVariables() {
  console.log('\n📋 설정해야 할 환경변수들:');
  console.log('─'.repeat(60));
  
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    
    Object.keys(ENV_MAPPING).forEach(key => {
      const regex = new RegExp(`^${key}=(.*)$`, 'm');
      const match = envContent.match(regex);
      if (match) {
        const value = match[1].trim();
        console.log(`${key}:`);
        console.log(`  값: ${value.substring(0, 80)}${value.length > 80 ? '...' : ''}`);
        console.log('');
      }
    });
    
  } catch (error) {
    console.error('환경변수 읽기 실패:', error.message);
  }
}

// 수동 설정 가이드 출력  
function printManualSetupGuide() {
  console.log('\n📖 수동 환경변수 설정 가이드:');
  console.log('─'.repeat(60));
  console.log('1. Vercel 대시보드에서 프로젝트 선택');
  console.log('2. Settings > Environment Variables 메뉴 이동');
  console.log('3. 아래 환경변수들을 "Production" 환경에 추가:');
  console.log('');
  
  Object.keys(ENV_MAPPING).forEach(key => {
    console.log(`   📌 ${key}`);
  });
  
  console.log('');
  console.log('4. 값은 .env.local 파일에서 복사해서 사용');
  console.log('5. 모든 설정 후 "Save" 클릭');
  console.log('');
  console.log('🔗 Vercel 대시보드: https://vercel.com/dashboard');
}

// 직접 실행 시
if (require.main === module) {
  console.log('🚀 Vercel 환경변수 설정 도구');
  console.log('================================');
  
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === 'setup') {
    setupVercelEnvironmentVariables();
  } else if (args[0] === 'list') {
    printEnvironmentVariables();
  } else if (args[0] === 'guide') {
    printManualSetupGuide();
  } else {
    console.log('사용법:');
    console.log('  node scripts/setup-vercel-env.js setup  # 자동 설정');
    console.log('  node scripts/setup-vercel-env.js list   # 환경변수 목록');
    console.log('  node scripts/setup-vercel-env.js guide  # 수동 설정 가이드');
  }
}

module.exports = { setupVercelEnvironmentVariables, printEnvironmentVariables, printManualSetupGuide }; 