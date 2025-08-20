/**
 * Ollama GPT-OSS 20B 연결 테스트 스크립트
 * 이교장의AI상담 시스템 연결 확인
 */

const OLLAMA_URL = 'http://localhost:11434';
const MODEL_NAME = 'gpt-oss:20b';

async function testOllamaConnection() {
  console.log('🔍 Ollama 서버 연결 테스트 시작...');
  console.log(`📍 서버 URL: ${OLLAMA_URL}`);
  console.log(`🤖 모델: ${MODEL_NAME}`);
  console.log('');

  try {
    // 1. 서버 연결 확인
    console.log('1️⃣ 서버 연결 확인 중...');
    const serverResponse = await fetch(`${OLLAMA_URL}/api/tags`);
    
    if (!serverResponse.ok) {
      throw new Error(`서버 연결 실패: ${serverResponse.status}`);
    }
    
    const serverData = await serverResponse.json();
    console.log('✅ 서버 연결 성공');
    console.log(`📊 사용 가능한 모델: ${serverData.models?.length || 0}개`);
    
    if (serverData.models) {
      serverData.models.forEach((model, index) => {
        console.log(`   ${index + 1}. ${model.name} (${model.size ? Math.round(model.size / 1024 / 1024 / 1024) + 'GB' : 'N/A'})`);
      });
    }
    console.log('');

    // 2. 모델 존재 확인
    console.log('2️⃣ 모델 존재 확인 중...');
    const targetModel = serverData.models?.find(m => m.name === MODEL_NAME);
    
    if (!targetModel) {
      console.log('⚠️  GPT-OSS 20B 모델이 설치되지 않았습니다.');
      console.log('💡 설치 명령어: ollama pull gpt-oss:20b');
      return;
    }
    
    console.log('✅ 모델 확인 완료');
    console.log(`📦 모델 크기: ${Math.round(targetModel.size / 1024 / 1024 / 1024)}GB`);
    console.log('');

    // 3. 간단한 테스트 요청
    console.log('3️⃣ AI 응답 테스트 중...');
    const testResponse = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL_NAME,
        prompt: '안녕하세요. 이교장의AI상담입니다. 간단한 인사말을 해주세요.',
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 100,
          top_k: 40,
          top_p: 0.95,
          repeat_penalty: 1.1
        }
      })
    });

    if (!testResponse.ok) {
      throw new Error(`테스트 요청 실패: ${testResponse.status}`);
    }

    const testData = await testResponse.json();
    console.log('✅ AI 응답 테스트 성공');
    console.log(`🤖 AI 응답: ${testData.response}`);
    console.log('');

    // 4. 이교장 챗봇 테스트
    console.log('4️⃣ 이교장 챗봇 테스트 중...');
    const chatbotResponse = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL_NAME,
        prompt: `당신은 "이교장의AI상담" 시스템입니다. 이후경 교장(AICAMP 대표)의 28년간 현장 경험을 바탕으로 한 따뜻하고 친근한 AI 상담사입니다.

핵심 전문 영역:
- AI 역량진단 및 맞춤형 교육 설계 (45개 행동지표 기반)
- n8n/Make를 활용한 No-Code 업무 자동화 (90% 효율 향상)
- ChatGPT/Claude 프롬프트 엔지니어링 (생산성 300% 증대)
- 업종별 AI 도입 전략 (제조/서비스/금융/의료/교육 등)
- 경영진 AI 리더십 및 조직 변화 관리

이교장의 친근하고 따뜻한 톤앤매너로 답변해주세요:
"안녕하세요! AI 역량진단에 대해 궁금한 점이 있으시군요. 28년간 현장에서 봐온 바로는..."`,
        stream: false,
        options: {
          temperature: 0.8,
          num_predict: 200,
          top_k: 40,
          top_p: 0.95,
          repeat_penalty: 1.1
        }
      })
    });

    if (!chatbotResponse.ok) {
      throw new Error(`챗봇 테스트 실패: ${chatbotResponse.status}`);
    }

    const chatbotData = await chatbotResponse.json();
    console.log('✅ 이교장 챗봇 테스트 성공');
    console.log(`💬 챗봇 응답: ${chatbotData.response}`);
    console.log('');

    // 5. AI 역량진단 테스트
    console.log('5️⃣ AI 역량진단 테스트 중...');
    const diagnosisResponse = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL_NAME,
        prompt: `당신은 "이교장의AI상담" 시스템의 Ollama GPT-OSS 20B 전용 분석가입니다.

45개 행동지표 기반 AI 역량진단을 수행해주세요.

샘플 데이터:
- 회사명: 테스트 기업
- 업종: 제조업
- 직원 수: 50명
- 연매출: 50억원
- 응답 데이터: {1: 4, 2: 3, 3: 5, 4: 2, 5: 4} (45개 질문 중 일부)

이 데이터를 바탕으로 간단한 AI 역량진단 분석을 JSON 형태로 제공해주세요.`,
        stream: false,
        options: {
          temperature: 0.6,
          num_predict: 300,
          top_k: 40,
          top_p: 0.9,
          repeat_penalty: 1.1
        }
      })
    });

    if (!diagnosisResponse.ok) {
      throw new Error(`진단 테스트 실패: ${diagnosisResponse.status}`);
    }

    const diagnosisData = await diagnosisResponse.json();
    console.log('✅ AI 역량진단 테스트 성공');
    console.log(`📊 진단 응답: ${diagnosisData.response.substring(0, 200)}...`);
    console.log('');

    // 6. 최종 결과
    console.log('🎉 모든 테스트 완료!');
    console.log('✅ Ollama GPT-OSS 20B가 정상적으로 작동 중입니다.');
    console.log('✅ 이교장의AI상담 시스템 연결 준비 완료');
    console.log('');
    console.log('🚀 다음 단계:');
    console.log('   1. aicamp.club 웹사이트 접속');
    console.log('   2. 이교장 챗봇 시스템 테스트');
    console.log('   3. AI 역량진단 시스템 테스트');
    console.log('');
    console.log('📞 문제 발생 시: 010-9251-9743 (이후경 경영지도사)');

  } catch (error) {
    console.error('❌ 테스트 실패:', error.message);
    console.log('');
    console.log('🔧 문제 해결 방법:');
    console.log('   1. Ollama 서버가 실행 중인지 확인: ollama serve');
    console.log('   2. 모델이 설치되어 있는지 확인: ollama list');
    console.log('   3. 모델 설치: ollama pull gpt-oss:20b');
    console.log('   4. 포트 11434가 사용 가능한지 확인');
    console.log('');
    console.log('📞 긴급 상담: 010-9251-9743');
  }
}

// 스크립트 실행
testOllamaConnection();
