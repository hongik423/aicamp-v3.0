/**
 * @fileoverview Ollama 상태 확인 API
 * @encoding UTF-8
 */

import { NextRequest, NextResponse } from 'next/server';
import { OllamaStatus } from '@/lib/ai/hybrid-ai-provider.types';

interface OllamaStatusResponse {
  isRunning: boolean;
  modelAvailable: boolean;
  modelName: string;
  lastChecked: string;
  responseTime?: number;
  error?: string;
}

async function handleGet(_request: NextRequest): Promise<NextResponse<OllamaStatus>> {
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

    const payload: OllamaStatus = {
      isRunning: true,
      modelAvailable: !!found,
      modelName: preferredModel,
      lastChecked: new Date().toISOString(),
      responseTime: Date.now() - startedAt
    };

    return NextResponse.json(payload, { status: 200 });
  } catch (error: any) {
    const payload: OllamaStatus = {
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

export { handleGet as GET };

// POST 요청을 동일한 로직으로 처리하고 싶다면 아래 주석 해제
// export async function POST(request: NextRequest) {
//   return GET(request);
// }
