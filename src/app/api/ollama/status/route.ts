/**
 * @fileoverview Ollama 상태 확인 API
 * @encoding UTF-8
 */

import { NextRequest, NextResponse } from 'next/server';

interface OllamaStatusResponse {
  isRunning: boolean;
  modelAvailable: boolean;
  modelName: string;
  lastChecked: string;
  responseTime?: number;
  error?: string;
}

export async function GET(_request: NextRequest) {
  const startedAt = Date.now();
  const baseUrl = process.env.OLLAMA_API_URL || 'http://localhost:11434';
  const preferredModel = process.env.AI_MODEL_NAME || 'phi3:mini';

  try {
    // 1) 버전 확인으로 서버 실행 여부 판단
    const versionRes = await fetch(`${baseUrl}/api/version`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000)
    });
    if (!versionRes.ok) {
      throw new Error(`Ollama version check failed: ${versionRes.status}`);
    }

    // 2) 모델 목록에서 대상 모델 준비 여부 확인
    const tagsRes = await fetch(`${baseUrl}/api/tags`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000)
    });
    if (!tagsRes.ok) {
      throw new Error(`Ollama tags check failed: ${tagsRes.status}`);
    }

    const tagsJson = await tagsRes.json();
    const models = Array.isArray(tagsJson?.models) ? tagsJson.models : [];
    const found = models.find((m: any) => (m?.model || m?.name || '').toLowerCase().includes(preferredModel.toLowerCase()));

    const payload: OllamaStatusResponse = {
      isRunning: true,
      modelAvailable: !!found,
      modelName: preferredModel,
      lastChecked: new Date().toISOString(),
      responseTime: Date.now() - startedAt
    };

    return NextResponse.json(payload, { status: 200 });
  } catch (error: any) {
    const payload: OllamaStatusResponse = {
      isRunning: false,
      modelAvailable: false,
      modelName: process.env.AI_MODEL_NAME || 'phi3:mini',
      lastChecked: new Date().toISOString(),
      responseTime: Date.now() - startedAt,
      error: error?.message || 'unknown error'
    };
    return NextResponse.json(payload, { status: 200 });
  }
}

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
