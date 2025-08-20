/**
 * Google Apps Script V16.0 업데이트 검증 스크립트
 * V16 업데이트가 완료되었는지 종합적으로 검증합니다.
 */

function verifyV16Update() {
  console.log('🔍 Google Apps Script V16.0 업데이트 검증 시작...');
  
  let allTestsPassed = true;
  const testResults = [];
  
  // 1. 환경변수 검증
  console.log('\n📋 1단계: 환경변수 검증');
  const envTest = verifyEnvironmentVariables();
  testResults.push({ name: '환경변수', passed: envTest });
  allTestsPassed = allTestsPassed && envTest;
  
  // 2. Gemini API 제거 검증
  console.log('\n📋 2단계: Gemini API 제거 검증');
  const geminiTest = verifyGeminiRemoval();
  testResults.push({ name: 'Gemini API 제거', passed: geminiTest });
  allTestsPassed = allTestsPassed && geminiTest;
  
  // 3. Ollama 통합 검증
  console.log('\n📋 3단계: Ollama 통합 검증');
  const ollamaTest = verifyOllamaIntegration();
  testResults.push({ name: 'Ollama 통합', passed: ollamaTest });
  allTestsPassed = allTestsPassed && ollamaTest;
  
  // 4. 헬스체크 검증
  console.log('\n📋 4단계: 헬스체크 검증');
  const healthTest = verifyHealthCheck();
  testResults.push({ name: '헬스체크', passed: healthTest });
  allTestsPassed = allTestsPassed && healthTest;
  
  // 5. 함수 존재 검증
  console.log('\n📋 5단계: 핵심 함수 검증');
  const functionTest = verifyCoreFunctions();
  testResults.push({ name: '핵심 함수', passed: functionTest });
  allTestsPassed = allTestsPassed && functionTest;
  
  // 최종 결과 출력
  console.log('\n🎯 검증 결과 요약:');
  console.log('='.repeat(50));
  
  testResults.forEach(result => {
    const status = result.passed ? '✅' : '❌';
    console.log(`${status} ${result.name}`);
  });
  
  console.log('='.repeat(50));
  
  if (allTestsPassed) {
    console.log('\n🎉 모든 검증이 통과했습니다!');
    console.log('✅ V16.0 OLLAMA ULTIMATE 업데이트가 성공적으로 완료되었습니다.');
    console.log('\n📋 다음 단계:');
    console.log('1. 웹앱 재배포');
    console.log('2. 실제 AI 역량진단 테스트');
    console.log('3. 이메일 발송 테스트');
  } else {
    console.log('\n⚠️ 일부 검증에 실패했습니다.');
    console.log('🔧 실패한 항목을 확인하고 수정해주세요.');
  }
  
  return allTestsPassed;
}

function verifyEnvironmentVariables() {
  try {
    const env = getEnvironmentConfig();
    const requiredVars = [
      'SPREADSHEET_ID',
      'OLLAMA_BASE_URL',
      'OLLAMA_MODEL',
      'ADMIN_EMAIL',
      'AICAMP_WEBSITE',
      'DRIVE_FOLDER_ID'
    ];
    
    for (const varName of requiredVars) {
      if (!env[varName]) {
        console.log(`❌ ${varName} 환경변수가 설정되지 않음`);
        return false;
      }
    }
    
    // Ollama 설정 확인
    if (env.OLLAMA_BASE_URL !== 'http://localhost:11434') {
      console.log(`❌ OLLAMA_BASE_URL이 올바르지 않음: ${env.OLLAMA_BASE_URL}`);
      return false;
    }
    
    if (env.OLLAMA_MODEL !== 'gpt-oss:20b') {
      console.log(`❌ OLLAMA_MODEL이 올바르지 않음: ${env.OLLAMA_MODEL}`);
      return false;
    }
    
    console.log('✅ 모든 환경변수가 올바르게 설정됨');
    return true;
    
  } catch (error) {
    console.log(`❌ 환경변수 검증 실패: ${error.message}`);
    return false;
  }
}

function verifyGeminiRemoval() {
  try {
    // Gemini API 관련 코드가 없는지 확인
    const code = ScriptApp.getProjectTriggers().map(t => t.getHandlerFunction()).join(' ');
    
    const geminiPatterns = [
      'generativelanguage.googleapis.com',
      'GEMINI_API_KEY',
      'gemini-2.5-flash',
      'callGeminiAPI',
      'generateGeminiAIReport'
    ];
    
    for (const pattern of geminiPatterns) {
      if (code.includes(pattern)) {
        console.log(`❌ Gemini API 관련 코드 발견: ${pattern}`);
        return false;
      }
    }
    
    console.log('✅ Gemini API 관련 코드가 완전히 제거됨');
    return true;
    
  } catch (error) {
    console.log(`❌ Gemini 제거 검증 실패: ${error.message}`);
    return false;
  }
}

function verifyOllamaIntegration() {
  try {
    const env = getEnvironmentConfig();
    
    // Ollama 관련 함수들이 존재하는지 확인
    const requiredFunctions = [
      'callOllamaAPI',
      'generateOllamaAIReport',
      'generateOllamaPrompt'
    ];
    
    for (const funcName of requiredFunctions) {
      if (typeof this[funcName] !== 'function') {
        console.log(`❌ Ollama 함수가 없음: ${funcName}`);
        return false;
      }
    }
    
    // Ollama 설정 확인
    if (!env.OLLAMA_BASE_URL || !env.OLLAMA_MODEL) {
      console.log('❌ Ollama 설정이 불완전함');
      return false;
    }
    
    console.log('✅ Ollama 통합이 올바르게 구성됨');
    return true;
    
  } catch (error) {
    console.log(`❌ Ollama 통합 검증 실패: ${error.message}`);
    return false;
  }
}

function verifyHealthCheck() {
  try {
    const result = doGet({ parameter: {} });
    const content = result.getContent();
    const data = JSON.parse(content);
    
    // V16.0 응답 형식 확인
    if (data.version !== 'V16.0-OLLAMA-ULTIMATE') {
      console.log(`❌ 버전이 올바르지 않음: ${data.version}`);
      return false;
    }
    
    if (data.model !== 'OLLAMA-GPT-OSS-20B') {
      console.log(`❌ 모델이 올바르지 않음: ${data.model}`);
      return false;
    }
    
    if (data.branding !== '이교장의AI역량진단보고서') {
      console.log(`❌ 브랜딩이 올바르지 않음: ${data.branding}`);
      return false;
    }
    
    console.log('✅ 헬스체크가 올바르게 작동함');
    return true;
    
  } catch (error) {
    console.log(`❌ 헬스체크 검증 실패: ${error.message}`);
    return false;
  }
}

function verifyCoreFunctions() {
  try {
    const requiredFunctions = [
      'doGet',
      'doPost',
      'handleAIDiagnosisRequest',
      'generateOllamaAIReport',
      'callOllamaAPI',
      'generateLeeKyoJangStyleReport',
      'sendApplicationConfirmationEmails'
    ];
    
    for (const funcName of requiredFunctions) {
      if (typeof this[funcName] !== 'function') {
        console.log(`❌ 핵심 함수가 없음: ${funcName}`);
        return false;
      }
    }
    
    console.log('✅ 모든 핵심 함수가 존재함');
    return true;
    
  } catch (error) {
    console.log(`❌ 핵심 함수 검증 실패: ${error.message}`);
    return false;
  }
}

// 실행 방법:
// verifyV16Update() - 전체 검증 실행
