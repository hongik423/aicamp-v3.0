import { NextRequest, NextResponse } from 'next/server';

/**
 * 로컬 Ollama 서버 상태 확인 API
 * 호스트 컴퓨터의 Ollama 서버가 실행 중인지 확인
 */

interface OllamaStatus {
  isRunning: boolean;
  modelAvailable: boolean;
  modelName: string;
  lastChecked: string;
  responseTime?: number;
  error?: string;
}

export async function GET(req: NextRequest): Promise<NextResponse<OllamaStatus>> {
  const startTime = Date.now();
  
  try {
    // 로컬 Ollama 서버 상태 확인
    const ollamaUrl = process.env.OLLAMA_API_URL || 'http://localhost:11434';
    
    console.log(`🔍 로컬 Ollama 서버 상태 확인: ${ollamaUrl}`);
    
    // Ollama 서버 연결 테스트
    const response = await fetch(`${ollamaUrl}/api/tags`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(5000) // 5초 타임아웃
    });
    
    const responseTime = Date.now() - startTime;
    
    if (!response.ok) {
      throw new Error(`Ollama 서버 응답 오류: ${response.status}`);
    }
    
    const data = await response.json();
    const models = data.models || [];
    const phi3MiniModel = models.find((model: any) => model.name === 'phi3:mini');
    
    const status: OllamaStatus = {
      isRunning: true,
      modelAvailable: !!phi3MiniModel,
      modelName: phi3MiniModel?.name || 'phi3:mini',
      lastChecked: new Date().toISOString(),
      responseTime: responseTime
    };
    
    console.log(`✅ Ollama 서버 상태: ${status.isRunning ? '실행 중' : '중지'}`);
    console.log(`🤖 모델 사용 가능: ${status.modelAvailable ? '사용 가능' : '사용 불가'}`);
    console.log(`⏱️ 응답 시간: ${responseTime}ms`);
    
    return NextResponse.json(status);
    
  } catch (error) {
    const responseTime = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
    
    console.error(`❌ Ollama 서버 상태 확인 실패: ${errorMessage}`);
    
    const status: OllamaStatus = {
      isRunning: false,
      modelAvailable: false,
      modelName: 'phi3:mini',
      lastChecked: new Date().toISOString(),
      responseTime: responseTime,
      error: errorMessage
    };
    
    return NextResponse.json(status);
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<OllamaStatus>> {
  // POST 요청도 GET과 동일하게 처리
  return GET(req);
}
