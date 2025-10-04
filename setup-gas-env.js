/**
 * Google Apps Script V16.0 환경변수 설정 스크립트
 * 이 스크립트를 Google Apps Script 콘솔에서 실행하여 환경변수를 자동으로 설정합니다.
 */

function setupV16EnvironmentVariables() {
  console.log('🎓 Google Apps Script V16.0 환경변수 설정 시작...');
  
  const properties = PropertiesService.getScriptProperties();
  
  // 필수 환경변수 설정
  const requiredVars = {
    'SPREADSHEET_ID': '1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ',
    'OLLAMA_BASE_URL': 'http://localhost:11434',
    'OLLAMA_MODEL': 'gpt-oss:20b',
    'ADMIN_EMAIL': 'hongik423@gmail.com',
    'AICAMP_WEBSITE': 'aicamp.club',
    'DRIVE_FOLDER_ID': '1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj'
  };
  
  // 선택적 환경변수 설정
  const optionalVars = {
    'DEBUG_MODE': 'false',
    'ENVIRONMENT': 'production',
    'SYSTEM_VERSION': 'V16.0-OLLAMA-ULTIMATE',
    'AI_MODEL': 'OLLAMA-GPT-OSS-20B'
  };
  
  // 모든 환경변수 설정
  const allVars = { ...requiredVars, ...optionalVars };
  
  let successCount = 0;
  let errorCount = 0;
  
  console.log('📋 환경변수 설정 중...');
  
  for (const [key, value] of Object.entries(allVars)) {
    try {
      properties.setProperty(key, value);
      console.log(`✅ ${key} = ${value}`);
      successCount++;
    } catch (error) {
      console.error(`❌ ${key} 설정 실패:`, error);
      errorCount++;
    }
  }
  
  console.log('\n🎯 설정 완료 요약:');
  console.log(`✅ 성공: ${successCount}개`);
  console.log(`❌ 실패: ${errorCount}개`);
  
  if (errorCount === 0) {
    console.log('\n🎉 모든 환경변수가 성공적으로 설정되었습니다!');
    console.log('\n📋 다음 단계:');
    console.log('1. 웹앱 배포 (배포 → 새 배포)');
    console.log('2. doGet 함수 테스트 실행');
    console.log('3. 헬스체크 응답 확인');
  } else {
    console.log('\n⚠️ 일부 환경변수 설정에 실패했습니다. 수동으로 확인해주세요.');
  }
}

/**
 * 환경변수 확인 함수
 */
function checkEnvironmentVariables() {
  console.log('🔍 환경변수 상태 확인...');
  
  const properties = PropertiesService.getScriptProperties();
  const requiredVars = [
    'SPREADSHEET_ID',
    'OLLAMA_BASE_URL', 
    'OLLAMA_MODEL',
    'ADMIN_EMAIL',
    'AICAMP_WEBSITE',
    'DRIVE_FOLDER_ID'
  ];
  
  const optionalVars = [
    'DEBUG_MODE',
    'ENVIRONMENT', 
    'SYSTEM_VERSION',
    'AI_MODEL'
  ];
  
  console.log('\n🔑 필수 환경변수:');
  for (const key of requiredVars) {
    const value = properties.getProperty(key);
    if (value) {
      console.log(`✅ ${key}: ${value}`);
    } else {
      console.log(`❌ ${key}: 설정되지 않음`);
    }
  }
  
  console.log('\n🎛️ 선택적 환경변수:');
  for (const key of optionalVars) {
    const value = properties.getProperty(key);
    if (value) {
      console.log(`✅ ${key}: ${value}`);
    } else {
      console.log(`⚠️ ${key}: 설정되지 않음 (기본값 사용)`);
    }
  }
}

/**
 * 헬스체크 테스트 함수
 */
function testHealthCheck() {
  console.log('🏥 헬스체크 테스트 시작...');
  
  try {
    const result = doGet({ parameter: {} });
    console.log('✅ 헬스체크 성공:');
    console.log(result.getContent());
  } catch (error) {
    console.error('❌ 헬스체크 실패:', error);
  }
}

/**
 * Ollama 연결 테스트 함수
 */
function testOllamaConnection() {
  console.log('🤖 Ollama 연결 테스트 시작...');
  
  try {
    const env = getEnvironmentConfig();
    console.log('📋 환경 설정:');
    console.log(`- OLLAMA_BASE_URL: ${env.OLLAMA_BASE_URL}`);
    console.log(`- OLLAMA_MODEL: ${env.OLLAMA_MODEL}`);
    
    // 간단한 테스트 프롬프트
    const testPrompt = '안녕하세요! 간단한 테스트입니다.';
    const response = callOllamaAPI(testPrompt, env);
    
    console.log('✅ Ollama 연결 성공!');
    console.log('📝 응답:', response.substring(0, 100) + '...');
    
  } catch (error) {
    console.error('❌ Ollama 연결 실패:', error);
    console.log('\n🔧 문제 해결 방법:');
    console.log('1. Ollama 서버가 실행 중인지 확인: ollama serve');
    console.log('2. 모델이 설치되어 있는지 확인: ollama list');
    console.log('3. 네트워크 연결 상태 확인');
  }
}

// 실행 방법:
// 1. setupV16EnvironmentVariables() - 환경변수 설정
// 2. checkEnvironmentVariables() - 설정 확인
// 3. testHealthCheck() - 헬스체크 테스트
// 4. testOllamaConnection() - Ollama 연결 테스트
