/**
 * 이교장 챗봇 API 테스트 스크립트
 * Ollama GPT-OSS 20B 연결 확인
 */

async function testChatbotAPI() {
  console.log('🤖 이교장 챗봇 API 테스트 시작...');
  console.log('');

  try {
    // 1. 간단한 인사말 테스트
    console.log('1️⃣ 간단한 인사말 테스트');
    const greetingResponse = await fetch('http://localhost:3000/api/chat-lee-hukyung', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: '안녕하세요!',
        history: []
      })
    });

    if (!greetingResponse.ok) {
      throw new Error(`인사말 테스트 실패: ${greetingResponse.status}`);
    }

    const greetingData = await greetingResponse.json();
    console.log('✅ 인사말 테스트 성공');
    console.log(`💬 응답: ${greetingData.response.substring(0, 100)}...`);
    console.log(`📊 메타데이터: ${greetingData.metadata?.model || 'N/A'}`);
    console.log('');

    // 2. AI 역량진단 문의 테스트
    console.log('2️⃣ AI 역량진단 문의 테스트');
    const diagnosisResponse = await fetch('http://localhost:3000/api/chat-lee-hukyung', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'AI 역량진단에 대해 궁금한 점이 있어요. 어떻게 진행되나요?',
        history: []
      })
    });

    if (!diagnosisResponse.ok) {
      throw new Error(`진단 문의 테스트 실패: ${diagnosisResponse.status}`);
    }

    const diagnosisData = await diagnosisResponse.json();
    console.log('✅ 진단 문의 테스트 성공');
    console.log(`💬 응답: ${diagnosisData.response.substring(0, 150)}...`);
    console.log(`🔗 버튼 수: ${diagnosisData.buttons?.length || 0}개`);
    console.log('');

    // 3. 교육과정 문의 테스트
    console.log('3️⃣ 교육과정 문의 테스트');
    const curriculumResponse = await fetch('http://localhost:3000/api/chat-lee-hukyung', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'n8n 자동화 교육 과정에 대해 알려주세요.',
        history: []
      })
    });

    if (!curriculumResponse.ok) {
      throw new Error(`교육과정 테스트 실패: ${curriculumResponse.status}`);
    }

    const curriculumData = await curriculumResponse.json();
    console.log('✅ 교육과정 테스트 성공');
    console.log(`💬 응답: ${curriculumData.response.substring(0, 150)}...`);
    console.log(`⏱️ 처리 시간: ${curriculumData.metadata?.processingTime || 'N/A'}ms`);
    console.log('');

    // 4. 대화 히스토리 테스트
    console.log('4️⃣ 대화 히스토리 테스트');
    const historyResponse = await fetch('http://localhost:3000/api/chat-lee-hukyung', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: '그럼 상담 예약은 어떻게 하나요?',
        history: [
          { role: 'user', content: 'AI 역량진단에 대해 궁금해요' },
          { role: 'assistant', content: 'AI 역량진단은 45개 행동지표를 기반으로...' }
        ]
      })
    });

    if (!historyResponse.ok) {
      throw new Error(`히스토리 테스트 실패: ${historyResponse.status}`);
    }

    const historyData = await historyResponse.json();
    console.log('✅ 히스토리 테스트 성공');
    console.log(`💬 응답: ${historyData.response.substring(0, 150)}...`);
    console.log('');

    // 5. 최종 결과
    console.log('🎉 모든 챗봇 API 테스트 완료!');
    console.log('✅ 이교장 챗봇 시스템이 정상적으로 작동 중입니다.');
    console.log('✅ Ollama GPT-OSS 20B 연결이 완벽합니다.');
    console.log('');
    console.log('🚀 웹사이트 테스트:');
    console.log('   - 메인 페이지: http://localhost:3000');
    console.log('   - 챗봇 페이지: http://localhost:3000/chatbot');
    console.log('   - AI 역량진단: http://localhost:3000/ai-diagnosis');
    console.log('');
    console.log('📞 문제 발생 시: 010-9251-9743 (이후경 경영지도사)');

  } catch (error) {
    console.error('❌ 챗봇 API 테스트 실패:', error.message);
    console.log('');
    console.log('🔧 문제 해결 방법:');
    console.log('   1. 개발 서버가 실행 중인지 확인: npm run dev');
    console.log('   2. Ollama 서버가 실행 중인지 확인: ollama serve');
    console.log('   3. 포트 3000과 11434가 사용 가능한지 확인');
    console.log('');
    console.log('📞 긴급 상담: 010-9251-9743');
  }
}

// 스크립트 실행
testChatbotAPI();
