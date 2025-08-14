/**
 * 🔬 GEMINI API 직접 테스트
 * 환경변수와 API 키 검증
 */

const fs = require('fs');
const http = require('http');
const https = require('https');

// .env.local 파일 읽기
function loadEnvFile() {
  try {
    const envContent = fs.readFileSync('.env.local', 'utf-8');
    const envVars = {};
    
    envContent.split('\n').forEach(line => {
      line = line.trim();
      if (line && !line.startsWith('#') && line.includes('=')) {
        const [key, ...values] = line.split('=');
        envVars[key.trim()] = values.join('=').trim();
      }
    });
    
    return envVars;
  } catch (error) {
    console.error('❌ .env.local 파일 읽기 실패:', error.message);
    return {};
  }
}

// GEMINI API 직접 테스트
async function testGeminiAPI(apiKey) {
  console.log('🤖 GEMINI 2.5 FLASH API 직접 테스트 시작...');
  
  const testPrompt = `
간단한 AI 역량 분석 테스트입니다.
다음 회사 정보를 바탕으로 3줄 요약을 해주세요:
- 회사명: 테스트기업
- 업종: IT/소프트웨어  
- 규모: 51-100명
- AI 활용 수준: 기초 단계

요약은 다음 형식으로 해주세요:
1. 현재 상태 평가
2. 주요 개선점
3. 권장 사항
  `;

  const requestData = JSON.stringify({
    contents: [{
      parts: [{
        text: testPrompt
      }]
    }],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1000,
    }
  });

  const options = {
    hostname: 'generativelanguage.googleapis.com',
    port: 443,
    path: `/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestData),
    },
    timeout: 30000
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      
      console.log(`📡 GEMINI API 응답 상태: ${res.statusCode}`);
      
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          if (res.statusCode === 200) {
            const result = JSON.parse(data);
            const aiResponse = result.candidates?.[0]?.content?.parts?.[0]?.text || '응답 없음';
            
            console.log('✅ GEMINI API 테스트 성공!');
            console.log('🤖 AI 응답:');
            console.log('-'.repeat(50));
            console.log(aiResponse);
            console.log('-'.repeat(50));
            resolve(aiResponse);
          } else {
            console.log('❌ GEMINI API 오류 응답:');
            console.log('📄 응답 내용:', data);
            reject(new Error(`GEMINI API 오류: ${res.statusCode}`));
          }
        } catch (parseError) {
          console.log('❌ JSON 파싱 오류:', parseError.message);
          console.log('📄 원본 응답:', data.substring(0, 500));
          reject(parseError);
        }
      });
    });

    req.on('error', (error) => {
      console.log('❌ GEMINI API 요청 오류:', error.message);
      reject(error);
    });

    req.on('timeout', () => {
      console.log('⏰ GEMINI API 요청 시간 초과');
      req.destroy();
      reject(new Error('GEMINI API 요청 시간 초과'));
    });

    req.write(requestData);
    req.end();
  });
}

// 메인 실행
async function main() {
  console.log('🔍 GEMINI 2.5 FLASH API 직접 테스트');
  console.log('=' .repeat(50));
  
  // 환경변수 로드
  const envVars = loadEnvFile();
  console.log('📋 로드된 환경변수:');
  Object.keys(envVars).forEach(key => {
    if (key.includes('API') || key.includes('KEY')) {
      console.log(`- ${key}: ${envVars[key] ? '설정됨' : '없음'}`);
    }
  });
  
  const apiKey = envVars.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY가 .env.local 파일에 설정되지 않았습니다.');
    return;
  }
  
  console.log(`🔑 API 키 확인: ${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 5)}`);
  
  try {
    await testGeminiAPI(apiKey);
    console.log('\n✅ GEMINI 2.5 FLASH API 테스트 완료!');
    console.log('💡 API 키가 올바르게 작동하고 있습니다.');
    
  } catch (error) {
    console.error('\n❌ GEMINI API 테스트 실패:', error.message);
    
    if (error.message.includes('403') || error.message.includes('401')) {
      console.log('💡 API 키 권한 문제일 수 있습니다. Google Cloud Console에서 확인하세요.');
    } else if (error.message.includes('quota') || error.message.includes('limit')) {
      console.log('💡 API 사용량 제한에 도달했을 수 있습니다.');
    } else {
      console.log('💡 네트워크 연결이나 API 서버 문제일 수 있습니다.');
    }
  }
}

main();
