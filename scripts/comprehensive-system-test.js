/**
 * AI CAMP 전체 시스템 종합 테스트
 * 무오류 목표로 모든 기능 테스트 및 오류 진단
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// 테스트 결과 저장
const testResults = {
  timestamp: new Date().toISOString(),
  totalTests: 0,
  passedTests: 0,
  failedTests: 0,
  errors: [],
  warnings: [],
  details: {}
};

// 🎯 색상 출력 함수
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logTest(testName, success, message = '', details = null) {
  testResults.totalTests++;
  if (success) {
    testResults.passedTests++;
    log('green', `✅ ${testName}: ${message || '성공'}`);
  } else {
    testResults.failedTests++;
    log('red', `❌ ${testName}: ${message || '실패'}`);
    testResults.errors.push({ test: testName, message, details });
  }
  
  if (details) {
    testResults.details[testName] = details;
  }
}

function logWarning(testName, message) {
  log('yellow', `⚠️ ${testName}: ${message}`);
  testResults.warnings.push({ test: testName, message });
}

// 🔍 1. 환경변수 및 설정 테스트
async function testEnvironmentVariables() {
  log('cyan', '\n🔍 1. 환경변수 및 설정 테스트');
  
  // .env.local 파일 존재 확인
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    logTest('환경변수 파일', true, '.env.local 파일 존재');
    
    // 환경변수 내용 확인
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {
      'NEXT_PUBLIC_GOOGLE_SCRIPT_URL': envContent.includes('NEXT_PUBLIC_GOOGLE_SCRIPT_URL'),
      'NEXT_PUBLIC_GOOGLE_SHEETS_ID': envContent.includes('NEXT_PUBLIC_GOOGLE_SHEETS_ID'),
      'GEMINI_API_KEY': envContent.includes('GEMINI_API_KEY')
    };
    
    Object.entries(envVars).forEach(([key, exists]) => {
      logTest(`환경변수_${key}`, exists, exists ? '설정됨' : '누락됨');
    });
    
  } else {
    logTest('환경변수 파일', false, '.env.local 파일이 존재하지 않음');
  }
  
  // package.json 확인
  const packagePath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packagePath)) {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    logTest('package.json', true, `버전: ${packageJson.version}`);
    
    // 새로 추가된 스크립트 확인
    const requiredScripts = ['init:report-folder', 'check:pdf-reports'];
    requiredScripts.forEach(script => {
      const exists = packageJson.scripts && packageJson.scripts[script];
      logTest(`NPM스크립트_${script}`, exists, exists ? '존재' : '누락');
    });
  }
}

// 🔍 2. 파일 시스템 구조 테스트
async function testFileSystemStructure() {
  log('cyan', '\n🔍 2. 파일 시스템 구조 테스트');
  
  const criticalFiles = [
    'src/components/diagnosis/SimplifiedDiagnosisResults.tsx',
    'src/app/api/save-pdf-report/route.ts',
    'src/lib/utils/pdfLocalStorage.ts',
    'src/lib/utils/emailService.ts',
    'scripts/init-report-folder.js',
    'docs/google_apps_script_SIMPLE_WORKING_VERSION.js'
  ];
  
  criticalFiles.forEach(filePath => {
    const exists = fs.existsSync(path.join(process.cwd(), filePath));
    logTest(`파일_${path.basename(filePath)}`, exists, exists ? '존재' : '누락');
  });
  
  // report 폴더 확인
  const reportPath = path.join(process.cwd(), 'report');
  const reportExists = fs.existsSync(reportPath);
  logTest('report_폴더', reportExists, reportExists ? '존재' : '생성 필요');
  
  if (reportExists) {
    const files = fs.readdirSync(reportPath);
    const pdfFiles = files.filter(f => f.endsWith('.pdf'));
    logTest('PDF_보고서', true, `${pdfFiles.length}개 파일 존재`);
  }
}

// 🔍 3. 코드 구문 검사 (간단한 파싱 테스트)
async function testCodeSyntax() {
  log('cyan', '\n🔍 3. 주요 코드 파일 구문 검사');
  
  const jsFiles = [
    'src/app/api/save-pdf-report/route.ts',
    'src/lib/utils/emailService.ts',
    'scripts/init-report-folder.js'
  ];
  
  for (const filePath of jsFiles) {
    try {
      const fullPath = path.join(process.cwd(), filePath);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // 기본적인 구문 오류 체크
        const syntaxIssues = [];
        
        // 괄호 매칭 확인
        const openBraces = (content.match(/\{/g) || []).length;
        const closeBraces = (content.match(/\}/g) || []).length;
        if (openBraces !== closeBraces) {
          syntaxIssues.push(`중괄호 불일치: { ${openBraces}개, } ${closeBraces}개`);
        }
        
        // 세미콜론 및 기본 구문 체크
        const lines = content.split('\n');
        lines.forEach((line, index) => {
          if (line.trim().startsWith('function ') && !line.includes('{') && !line.endsWith(';')) {
            syntaxIssues.push(`${index + 1}행: function 선언 구문 오류`);
          }
        });
        
        logTest(`구문검사_${path.basename(filePath)}`, syntaxIssues.length === 0, 
          syntaxIssues.length === 0 ? '구문 정상' : `${syntaxIssues.length}개 이슈 발견`);
        
        if (syntaxIssues.length > 0) {
          testResults.details[`구문검사_${path.basename(filePath)}`] = syntaxIssues;
        }
      } else {
        logTest(`구문검사_${path.basename(filePath)}`, false, '파일 없음');
      }
    } catch (error) {
      logTest(`구문검사_${path.basename(filePath)}`, false, `오류: ${error.message}`);
    }
  }
}

// 🔍 4. API 엔드포인트 테스트 (로컬 서버 필요)
async function testApiEndpoints() {
  log('cyan', '\n🔍 4. API 엔드포인트 구조 테스트');
  
  // API 파일 존재 및 기본 구조 확인
  const apiFiles = [
    'src/app/api/save-pdf-report/route.ts',
    'src/app/api/simplified-diagnosis/route.ts',
    'src/app/api/consultation/route.ts'
  ];
  
  apiFiles.forEach(apiFile => {
    const fullPath = path.join(process.cwd(), apiFile);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // POST, GET 메소드 존재 확인
      const hasPost = content.includes('export async function POST');
      const hasGet = content.includes('export async function GET');
      const hasNextResponse = content.includes('NextResponse');
      
      logTest(`API_${path.basename(path.dirname(apiFile))}`, hasNextResponse, 
        `POST: ${hasPost ? '✅' : '❌'}, GET: ${hasGet ? '✅' : '❌'}`);
        
      testResults.details[`API_${path.basename(path.dirname(apiFile))}`] = {
        hasPost, hasGet, hasNextResponse
      };
    } else {
      logTest(`API_${path.basename(path.dirname(apiFile))}`, false, '파일 없음');
    }
  });
}

// 🔍 5. Google Apps Script 연동 테스트
async function testGoogleAppsScript() {
  log('cyan', '\n🔍 5. Google Apps Script 코드 검증');
  
  const gasFile = path.join(process.cwd(), 'docs/google_apps_script_SIMPLE_WORKING_VERSION.js');
  if (fs.existsSync(gasFile)) {
    const content = fs.readFileSync(gasFile, 'utf8');
    
    // 핵심 함수들 존재 확인 (Google Apps Script 전용)
    const requiredFunctions = [
      'doPost',
      'processDiagnosisRequest',  
      'sendUserConfirmationEmailWithPdf',
      'testDiagnosisWithPdfAttachment',
      'isValidPdfBase64'
    ];
    
    let functionsFound = 0;
    requiredFunctions.forEach(funcName => {
      const exists = content.includes(`function ${funcName}`);
      if (exists) functionsFound++;
      logTest(`GAS함수_${funcName}`, exists, exists ? '존재' : '누락');
    });
    
    logTest('GAS_전체함수', functionsFound === requiredFunctions.length, 
      `${functionsFound}/${requiredFunctions.length}개 함수 확인`);
      
    // PDF 처리 관련 코드 확인
    const hasPdfProcessing = content.includes('pdf_attachment') && content.includes('pdfBase64');
    logTest('GAS_PDF처리', hasPdfProcessing, hasPdfProcessing ? 'PDF 처리 코드 존재' : 'PDF 처리 코드 누락');
    
  } else {
    logTest('GAS_파일', false, 'Google Apps Script 파일 없음');
  }
}

// 🔍 6. 빌드 가능성 사전 검사
async function testBuildReadiness() {
  log('cyan', '\n🔍 6. 빌드 준비 상태 검사');
  
  // TypeScript 설정 확인
  const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
  if (fs.existsSync(tsconfigPath)) {
    try {
      const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
      logTest('TypeScript_설정', true, 'tsconfig.json 정상');
      testResults.details['TypeScript_설정'] = {
        strict: tsconfig.compilerOptions?.strict,
        target: tsconfig.compilerOptions?.target
      };
    } catch (error) {
      logTest('TypeScript_설정', false, 'tsconfig.json 파싱 오류');
    }
  }
  
  // Next.js 설정 확인
  const nextConfigPath = path.join(process.cwd(), 'next.config.js');
  if (fs.existsSync(nextConfigPath)) {
    logTest('Next.js_설정', true, 'next.config.js 존재');
  } else {
    logWarning('Next.js_설정', 'next.config.js 파일이 없음');
  }
  
  // node_modules 확인
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    logTest('Dependencies', true, 'node_modules 존재');
  } else {
    logTest('Dependencies', false, 'npm install 필요');
  }
}

// 🔍 7. Vercel 배포 준비 상태 검사
async function testVercelReadiness() {
  log('cyan', '\n🔍 7. Vercel 배포 준비 상태 검사');
  
  // vercel.json 확인
  const vercelConfigPath = path.join(process.cwd(), 'vercel.json');
  if (fs.existsSync(vercelConfigPath)) {
    try {
      const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
      logTest('Vercel_설정', true, 'vercel.json 존재');
      testResults.details['Vercel_설정'] = vercelConfig;
    } catch (error) {
      logTest('Vercel_설정', false, 'vercel.json 파싱 오류');
    }
  } else {
    logWarning('Vercel_설정', 'vercel.json 파일이 없음 (선택사항)');
  }
  
  // 환경변수 확인 (배포용)
  const requiredEnvVars = [
    'NEXT_PUBLIC_GOOGLE_SCRIPT_URL',
    'NEXT_PUBLIC_GOOGLE_SHEETS_ID'
  ];
  
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    requiredEnvVars.forEach(envVar => {
      const exists = envContent.includes(envVar);
      logTest(`배포환경변수_${envVar}`, exists, exists ? '설정됨' : '누락됨');
    });
  }
}

// 📊 결과 리포트 생성
async function generateTestReport() {
  log('cyan', '\n📊 테스트 결과 리포트 생성');
  
  const successRate = ((testResults.passedTests / testResults.totalTests) * 100).toFixed(1);
  
  const report = `# AI CAMP 시스템 종합 테스트 리포트

## 📊 테스트 결과 요약
- **실행 시간**: ${testResults.timestamp}
- **총 테스트**: ${testResults.totalTests}개
- **성공**: ${testResults.passedTests}개 (${successRate}%)
- **실패**: ${testResults.failedTests}개
- **경고**: ${testResults.warnings.length}개

## ✅ 성공률: ${successRate}%

## ❌ 실패한 테스트들
${testResults.errors.map(error => `- **${error.test}**: ${error.message}`).join('\n')}

## ⚠️ 경고 사항들
${testResults.warnings.map(warning => `- **${warning.test}**: ${warning.message}`).join('\n')}

## 📋 상세 테스트 결과
\`\`\`json
${JSON.stringify(testResults.details, null, 2)}
\`\`\`

## 🎯 권장 조치사항
${testResults.failedTests > 0 ? 
  '❌ **배포 전 오류 수정 필요**: 실패한 테스트들을 모두 해결한 후 배포하세요.' : 
  '✅ **배포 준비 완료**: 모든 테스트를 통과했습니다. Vercel 배포를 진행할 수 있습니다.'
}

---
*리포트 생성 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}*
`;

  // 리포트 파일 저장
  const reportPath = path.join(process.cwd(), 'SYSTEM_TEST_REPORT.md');
  fs.writeFileSync(reportPath, report, 'utf8');
  
  log('green', `📄 테스트 리포트 저장: ${reportPath}`);
  
  return {
    success: testResults.failedTests === 0,
    successRate: parseFloat(successRate),
    reportPath
  };
}

// 🚀 메인 테스트 실행
async function runComprehensiveTest() {
  log('magenta', '🔍 AI CAMP 전체 시스템 종합 테스트 시작');
  log('white', '목표: 무오류 시스템 구축 및 Vercel 배포 준비');
  
  try {
    // 모든 테스트 실행
    await testEnvironmentVariables();
    await testFileSystemStructure();
    await testCodeSyntax();
    await testApiEndpoints();
    await testGoogleAppsScript();
    await testBuildReadiness();
    await testVercelReadiness();
    
    // 결과 리포트 생성
    const result = await generateTestReport();
    
    // 최종 결과 출력
    log('white', '\n' + '='.repeat(60));
    if (result.success) {
      log('green', `🎉 모든 테스트 통과! (성공률: ${result.successRate}%)`);
      log('green', '✅ Vercel 배포 준비 완료');
    } else {
      log('red', `❌ ${testResults.failedTests}개 테스트 실패 (성공률: ${result.successRate}%)`);
      log('yellow', '🔧 오류 수정 후 재테스트 필요');
    }
    log('white', '='.repeat(60));
    
    return result;
    
  } catch (error) {
    log('red', `❌ 테스트 실행 중 오류: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// 직접 실행 시
if (require.main === module) {
  runComprehensiveTest()
    .then(result => {
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('테스트 실행 오류:', error);
      process.exit(1);
    });
}

module.exports = { runComprehensiveTest, testResults }; 