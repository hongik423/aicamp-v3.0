/**
 * 하이브리드 AI 프로바이더 - 이교장의AI상담 전용
 * 로컬 Ollama (phi3:mini) 단일 시스템
 */

import { CallAIParams } from './hybrid-ai-provider.types';
import { HybridAIResponse, OllamaStatus, ServiceStatus } from './hybrid-ai-provider.types';
import { hostStatusMonitor } from '@/lib/monitoring/host-status-monitor';

export class HybridAIProvider {
  private static instance: HybridAIProvider;
  private ollamaStatus: OllamaStatus | null = null;
  private lastStatusCheck: number = 0;
  private readonly STATUS_CACHE_DURATION = 30000; // 30초 캐시

  private constructor() {}

  static getInstance(): HybridAIProvider {
    if (!HybridAIProvider.instance) {
      HybridAIProvider.instance = new HybridAIProvider();
    }
    return HybridAIProvider.instance;
  }

  /**
   * 로컬 Ollama 서버 상태 확인 (캐시된 결과 사용)
   */
  private async checkOllamaStatus(): Promise<OllamaStatus> {
    const now = Date.now();
    
    // 캐시된 상태가 있고 아직 유효한 경우
    if (this.ollamaStatus && (now - this.lastStatusCheck) < this.STATUS_CACHE_DURATION) {
      return this.ollamaStatus;
    }

    try {
      console.log('🔍 로컬 Ollama 서버 상태 확인 중...');
      
      const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'https://aicamp.club';
      const response = await fetch(`${baseUrl}/api/ollama/status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000)
      });

      if (!response.ok) {
        throw new Error(`상태 확인 API 오류: ${response.status}`);
      }

      const status = await response.json();
      this.ollamaStatus = status;
      this.lastStatusCheck = now;
      
      console.log(`📊 Ollama 상태 업데이트: ${status.isRunning ? '실행 중' : '중지'}`);
      
      return status;
      
    } catch (error) {
      console.error('❌ Ollama 상태 확인 실패:', error);
      
      const fallbackStatus: OllamaStatus = {
        isRunning: false,
        modelAvailable: false,
        modelName: 'phi3:mini',
        lastChecked: new Date().toISOString(),
        error: error instanceof Error ? error.message : '알 수 없는 오류'
      };
      
      this.ollamaStatus = fallbackStatus;
      this.lastStatusCheck = now;
      
      return fallbackStatus;
    }
  }

  /**
   * 로컬 Ollama 서버를 통한 AI 호출
   */
  private async callLocalOllama(params: CallAIParams): Promise<string> {
    const ollamaUrl = process.env.OLLAMA_API_URL || 'http://localhost:11434';
    
    console.log(`🚀 로컬 Ollama 호출: ${ollamaUrl}`);
    
    const response = await fetch(`${ollamaUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'phi3:mini',
        prompt: params.prompt || '',
        stream: false,
        options: {
          temperature: params.temperature || 0.7,
          num_predict: params.maxTokens || 2048,
          top_k: 40,
          top_p: 0.95,
          repeat_penalty: 1.1
        }
      }),
      signal: AbortSignal.timeout(300000) // 5분 타임아웃
    });

    if (!response.ok) {
      throw new Error(`로컬 Ollama 오류: ${response.status}`);
    }

    const result = await response.json();
    return result.response || '';
  }

  /**
   * 대체 AI 서비스 호출 (로컬 Ollama 사용 불가 시)
   */
  // 폴백 경로는 제거합니다. 오직 로컬 Ollama만 사용합니다.

  /**
   * 하이브리드 AI 호출 (로컬 우선, 대체 서비스 백업)
   */
  async callAI(params: CallAIParams): Promise<HybridAIResponse> {
    const startTime = Date.now();
    
    try {
      // 로컬 Ollama 서버 상태 확인 후, 반드시 로컬 호출
      const ollamaStatus = await this.checkOllamaStatus();
      if (!ollamaStatus.isRunning || !ollamaStatus.modelAvailable) {
        throw new Error(ollamaStatus.error || 'Ollama 서버가 실행 중이 아니거나 모델이 준비되지 않음');
      }

      console.log('🎯 로컬 Ollama 서버 사용: phi3:mini');
      const response = await this.callLocalOllama(params);
      const processingTime = Date.now() - startTime;

      return {
        response,
        source: 'local',
        processingTime,
        modelUsed: 'phi3:mini (로컬)',
        metadata: {
          localOllamaAvailable: true
        }
      };
      
    } catch (error) {
      console.error('❌ 하이브리드 AI 호출 실패:', error);
      
      const processingTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      
      return {
        response: `죄송합니다. AI 서비스에 문제가 발생했습니다.\n\n오류: ${errorMessage}\n\n호스트 컴퓨터의 전원과 Ollama(phi3:mini) 서버 상태를 확인해주세요.`,
        source: 'local',
        processingTime,
        modelUsed: 'phi3:mini (오류)',
        metadata: {
          localOllamaAvailable: false,
          fallbackReason: errorMessage
        }
      };
    }
  }

  /**
   * 현재 AI 서비스 상태 반환
   */
  async getServiceStatus(): Promise<ServiceStatus> {
    const status = await this.checkOllamaStatus();
    
    return {
      localOllamaAvailable: status.isRunning && status.modelAvailable,
      modelName: status.modelName,
      lastChecked: status.lastChecked,
      responseTime: status.responseTime,
      error: status.error
    };
  }
}

// 싱글톤 인스턴스 내보내기
export const hybridAIProvider = HybridAIProvider.getInstance();
