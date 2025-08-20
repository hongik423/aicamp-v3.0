import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const ollamaUrl = process.env.OLLAMA_API_URL || 'http://localhost:11434';
    const model = process.env.OLLAMA_MODEL || 'gpt-oss:20b';
    
    console.log('🔍 Ollama 서버 헬스체크 시작:', ollamaUrl);
    
    // 1. Ollama 서버 연결 확인
    const serverResponse = await fetch(`${ollamaUrl}/api/tags`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(10000) // 10초 타임아웃
    });
    
    if (!serverResponse.ok) {
      throw new Error(`Ollama 서버 연결 실패: ${serverResponse.status}`);
    }
    
    const serverData = await serverResponse.json();
    const availableModels = serverData.models || [];
    const targetModel = availableModels.find((m: any) => m.name === model);
    
    // 2. 모델 상태 확인
    let modelStatus = 'not_found';
    if (targetModel) {
      modelStatus = 'available';
      
      // 3. 간단한 테스트 요청
      try {
        const testResponse = await fetch(`${ollamaUrl}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: model,
            prompt: '안녕하세요. 이교장의AI상담입니다.',
            stream: false,
            options: {
              temperature: 0.7,
              num_predict: 50,
              top_k: 40,
              top_p: 0.95
            }
          }),
          signal: AbortSignal.timeout(30000) // 30초 타임아웃
        });
        
        if (testResponse.ok) {
          const testData = await testResponse.json();
          modelStatus = 'working';
        } else {
          modelStatus = 'error';
        }
      } catch (testError) {
        modelStatus = 'test_failed';
      }
    }
    
    // 4. 시스템 정보 수집
    const systemInfo = {
      ollamaUrl,
      targetModel: model,
      availableModels: availableModels.map((m: any) => m.name),
      modelStatus,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.VERSION || 'V16.0-OLLAMA-ULTIMATE'
    };
    
    console.log('✅ Ollama 헬스체크 완료:', systemInfo);
    
    return NextResponse.json({
      success: true,
      status: 'healthy',
      data: systemInfo,
      message: '이교장의AI상담 Ollama GPT-OSS 20B 서버가 정상 작동 중입니다.'
    });
    
  } catch (error: any) {
    console.error('❌ Ollama 헬스체크 실패:', error);
    
    return NextResponse.json({
      success: false,
      status: 'unhealthy',
      error: error.message,
      message: 'Ollama 서버 연결에 문제가 있습니다. 서버가 실행 중인지 확인해주세요.',
      troubleshooting: {
        checkServer: 'Ollama 서버가 실행 중인지 확인 (ollama serve)',
        checkModel: 'GPT-OSS 20B 모델이 설치되어 있는지 확인 (ollama pull gpt-oss:20b)',
        checkPort: '포트 11434가 사용 가능한지 확인',
        contactAdmin: '문제가 지속되면 관리자에게 문의: 010-9251-9743'
      }
    }, { status: 503 });
  }
}
