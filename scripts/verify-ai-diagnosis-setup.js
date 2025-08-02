#!/usr/bin/env node

/**
 * AI 역량 진단 시스템 설정 검증 스크립트
 * 이 스크립트를 실행하여 시스템 설정을 확인하고 문제를 진단합니다.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// 색상 코드
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function checkEnvFile() {
  log('\n1️⃣ 환경변수 파일 확인', 'cyan');
  
  const envFiles = ['.env', '.env.local', '.env.production'];
  let gasUrl = null;
  let foundFile = null;
  
  for (const file of envFiles) {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      log(`  ✅ ${file} 파일 발견`, 'green');
      const content = fs.readFileSync(filePath, 'utf8');
      const match = content.match(/NEXT_PUBLIC_GOOGLE_SCRIPT_URL=(.+)/);
      if (match) {
        gasUrl = match[1].trim();
        foundFile = file;
        break;
      }
    }
  }
  
  if (gasUrl) {
    log(`  ✅ Google Apps Script URL 발견: ${gasUrl.substring(0, 50)}...`, 'green');
    return gasUrl;
  } else {
    log('  ❌ Google Apps Script URL을 찾을 수 없습니다', 'red');
    log('  📝 .env.local 파일에 다음 줄을 추가하세요:', 'yellow');
    log('     NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec', 'yellow');
    return null;
  }
}

async function testGoogleAppsScript(url) {
  log('\n2️⃣ Google Apps Script 연결 테스트', 'cyan');
  
  return new Promise((resolve) => {
    const testData = JSON.stringify({
      action: 'testConnection',
      timestamp: new Date().toISOString()
    });
    
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': testData.length
      },
      timeout: 10000
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          log('  ✅ Google Apps Script 연결 성공', 'green');
          try {
            const result = JSON.parse(data);
            if (result.success) {
              log('  ✅ 응답 데이터 정상', 'green');
            } else {
              log('  ⚠️ 응답은 받았지만 오류 포함', 'yellow');
              log(`     ${result.error || '알 수 없는 오류'}`, 'yellow');
            }
          } catch (e) {
            log('  ⚠️ 응답 파싱 실패 (HTML 응답일 수 있음)', 'yellow');
          }
        } else if (res.statusCode === 302 || res.statusCode === 301) {
          log('  ⚠️ 리다이렉션 발생 - 배포 URL이 변경되었을 수 있습니다', 'yellow');
          log(`     새 위치: ${res.headers.location}`, 'yellow');
        } else {
          log(`  ❌ HTTP 오류: ${res.statusCode}`, 'red');
        }
        resolve();
      });
    });
    
    req.on('timeout', () => {
      log('  ❌ 연결 시간 초과 (10초)', 'red');
      req.destroy();
      resolve();
    });
    
    req.on('error', (err) => {
      log(`  ❌ 연결 실패: ${err.message}`, 'red');
      resolve();
    });
    
    req.write(testData);
    req.end();
  });
}

async function checkAICapabilityImplementation() {
  log('\n3️⃣ AI 역량 진단 구현 확인', 'cyan');
  
  // FreeDiagnosisForm.tsx 확인
  const formPath = path.join(process.cwd(), 'src/features/free-diagnosis/components/FreeDiagnosisForm.tsx');
  if (fs.existsSync(formPath)) {
    const content = fs.readFileSync(formPath, 'utf8');
    const hasAIFields = content.includes('ceoAIVision') && content.includes('aiToolUsage');
    if (hasAIFields) {
      log('  ✅ 프론트엔드에 AI 역량 진단 필드 구현됨', 'green');
    } else {
      log('  ❌ 프론트엔드에 AI 역량 진단 필드 없음', 'red');
    }
  }
  
  // API route 확인
  const apiPath = path.join(process.cwd(), 'src/app/api/simplified-diagnosis/route.ts');
  if (fs.existsSync(apiPath)) {
    const content = fs.readFileSync(apiPath, 'utf8');
    const hasAIProcessing = content.includes('aiCapabilityScores') && content.includes('performAICapabilityGAPAnalysis');
    if (hasAIProcessing) {
      log('  ✅ API에 AI 역량 분석 로직 구현됨', 'green');
    } else {
      log('  ❌ API에 AI 역량 분석 로직 없음', 'red');
    }
  }
}

async function checkGoogleSheetsHeaders() {
  log('\n4️⃣ Google Sheets 헤더 구조 확인', 'cyan');
  log('  📋 필요한 헤더 (AI_무료진단신청 시트):', 'yellow');
  
  const requiredHeaders = [
    '제출시간', '회사명', '대표자명', '직책', '업종', '지역', '이메일', '전화번호',
    '직원수', '연매출', '사업연수', '사업내용', '주요고민', '기대효과',
    'AI역량점수', 'AI역량등급', 'AI역량상세',
    'CEO_AI비전', 'AI투자의지', 'AI전략수립', '변화관리', '리스크수용도',
    'IT인프라', '데이터관리', '보안수준', 'AI도구도입',
    '디지털리터러시', 'AI도구활용', '학습민첩성', '데이터분석능력',
    '혁신문화', '협업수준', '실험문화', '지속학습',
    '프로세스자동화', '의사결정활용', '고객서비스적용'
  ];
  
  log(`  📝 총 ${requiredHeaders.length}개 컬럼 필요`, 'blue');
  log('  💡 Google Sheets를 열어 헤더를 확인하세요', 'yellow');
  log('     https://docs.google.com/spreadsheets/d/1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0/edit', 'blue');
}

async function suggestSolutions() {
  log('\n5️⃣ 권장 해결 방법', 'cyan');
  
  log('  1. Google Apps Script 재배포:', 'yellow');
  log('     - 배포 > 새 배포 관리', 'blue');
  log('     - "새 배포" 클릭 (기존 배포 수정 X)', 'blue');
  log('     - 새 URL을 .env.local에 업데이트', 'blue');
  
  log('\n  2. Gemini API 키 확인:', 'yellow');
  log('     - Google Apps Script > 프로젝트 설정 > 스크립트 속성', 'blue');
  log('     - GEMINI_API_KEY 값 확인', 'blue');
  
  log('\n  3. 테스트 실행:', 'yellow');
  log('     - npm run dev 로 개발 서버 실행', 'blue');
  log('     - http://localhost:3000/diagnosis/test-ai-capability 접속', 'blue');
  log('     - 테스트 데이터로 진단 실행', 'blue');
  
  log('\n  4. 로그 확인:', 'yellow');
  log('     - 브라우저 개발자 도구 > Network 탭', 'blue');
  log('     - Google Apps Script > 실행 기록', 'blue');
}

// 메인 실행
async function main() {
  log('🔍 AI 역량 진단 시스템 설정 검증 시작\n', 'cyan');
  
  const gasUrl = await checkEnvFile();
  
  if (gasUrl) {
    await testGoogleAppsScript(gasUrl);
  }
  
  await checkAICapabilityImplementation();
  await checkGoogleSheetsHeaders();
  await suggestSolutions();
  
  log('\n✅ 검증 완료', 'green');
  log('문제가 지속되면 docs/AI_CAPABILITY_DIAGNOSIS_TROUBLESHOOTING.md 파일을 참조하세요\n', 'yellow');
}

main().catch(console.error);