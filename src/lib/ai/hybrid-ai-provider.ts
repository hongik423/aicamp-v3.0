/**
 * 하이브리드 AI 프로바이더 - 이교장의AI상담 전용
 * Vercel (서버리스) + 로컬 Ollama (phi3:mini) 하이브리드 시스템
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
  private async callFallbackAI(params: CallAIParams): Promise<string> {
    console.log('🔄 대체 AI 서비스 호출 중...');
    
    // 간단한 대체 응답 생성 (실제로는 외부 AI API 사용)
    const fallbackResponse = this.generateFallbackResponse(params.prompt || '');
    
    return fallbackResponse;
  }

  /**
   * 대체 응답 생성 (로컬 Ollama 사용 불가 시)
   */
  private generateFallbackResponse(prompt: string): string {
    console.log('⚠️ 로컬 Ollama 서버를 사용할 수 없습니다. 기본 응답을 생성합니다.');
    
    // 호스트 상태 확인
    const hostStatus = hostStatusMonitor.getUserFriendlyStatus();
    const downtimeInfo = hostStatus.downtimeDuration ? ` (중단 시간: ${hostStatus.downtimeDuration})` : '';
    
    if (prompt.includes('AI 역량진단') || prompt.includes('진단 보고서')) {
      return `안녕하세요! AI 역량진단 서비스입니다.

현재 호스트 컴퓨터 서버가 연결되지 않아 기본 응답을 제공합니다.

🔧 **서비스 상태**
- 호스트 컴퓨터: 연결 불가${downtimeInfo}
- 로컬 Ollama 서버: 연결 불가
- AI 모델: phi3:mini (오프라인)
- 대체 모드: 활성화

📋 **AI 역량진단 안내**
1. **사업 기반**: AI 도입을 위한 기본 인프라
2. **현재 AI 활용**: 기존 AI 도구 사용 현황
3. **조직 준비도**: AI 도입을 위한 조직 역량
4. **기술 인프라**: AI 기술 지원 환경
5. **전략 명확성**: AI 전략 수립 및 실행 계획
6. **실행 역량**: AI 프로젝트 실행 능력

💡 **권장사항**
- 호스트 컴퓨터의 전원을 확인해주세요
- Ollama 서버가 실행 중인지 확인해주세요
- 네트워크 연결 상태를 점검해주세요

${hostStatus.showEmailRequest ? `
🚨 **서버 사용 신청**
호스트 컴퓨터 서버가 장시간 중단된 경우, 서버 관리자에게 사용 신청을 할 수 있습니다.
- 이메일: hongik423@gmail.com
- 신청 페이지: /server-downtime
` : ''}

더 정확한 진단을 위해서는 호스트 컴퓨터 서버 연결이 필요합니다.`;
    }
    
    if (prompt.includes('챗봇') || prompt.includes('상담')) {
      return `안녕하세요! AI 챗봇 상담 서비스입니다.

현재 호스트 컴퓨터 서버가 연결되지 않아 기본 상담을 제공합니다.

🤖 **AI 챗봇 상담 안내**
- 서비스: AI 역량진단 및 상담
- 모델: phi3:mini (오프라인)
- 상태: 대체 모드${downtimeInfo ? ` (중단 시간: ${downtimeInfo})` : ''}

💬 **상담 가능 분야**
1. AI 도입 전략 수립
2. AI 역량진단 방법론
3. AI 프로젝트 실행 가이드
4. AI 교육 및 훈련 방안
5. AI 기술 인프라 구축

🔧 **서비스 복구 방법**
- 호스트 컴퓨터 전원 확인
- Ollama 서버 실행 상태 점검
- 네트워크 연결 상태 확인

${hostStatus.showEmailRequest ? `
🚨 **서버 사용 신청**
호스트 컴퓨터 서버가 장시간 중단된 경우, 서버 관리자에게 사용 신청을 할 수 있습니다.
- 이메일: hongik423@gmail.com
- 신청 페이지: /server-downtime
` : ''}

더 정확한 AI 상담을 위해서는 호스트 컴퓨터 서버 연결이 필요합니다.`;
    }
    
    return `안녕하세요! AI 상담 서비스입니다.

현재 호스트 컴퓨터 서버가 연결되지 않아 기본 응답을 제공합니다.

🔧 **서비스 상태**
- 호스트 컴퓨터: 연결 불가${downtimeInfo}
- 로컬 AI 서버: 연결 불가
- 대체 모드: 활성화

${hostStatus.showEmailRequest ? `
🚨 **서버 사용 신청**
호스트 컴퓨터 서버가 장시간 중단된 경우, 서버 관리자에게 사용 신청을 할 수 있습니다.
- 이메일: hongik423@gmail.com
- 신청 페이지: /server-downtime
` : ''}

더 정확한 AI 응답을 위해서는 호스트 컴퓨터 서버 연결이 필요합니다.

호스트 컴퓨터의 전원과 Ollama 서버 실행 상태를 확인해주세요.`;
  }

  /**
   * 하이브리드 AI 호출 (로컬 우선, 대체 서비스 백업)
   */
  async callAI(params: CallAIParams): Promise<HybridAIResponse> {
    const startTime = Date.now();
    
    try {
      // 로컬 Ollama 서버 상태 확인
      const ollamaStatus = await this.checkOllamaStatus();
      
      if (ollamaStatus.isRunning && ollamaStatus.modelAvailable) {
        // 로컬 Ollama 사용 가능 - 로컬 호출
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
        
      } else {
        // 로컬 Ollama 사용 불가 - 대체 서비스 사용
        console.log('⚠️ 로컬 Ollama 사용 불가, 대체 서비스 사용');
        
        const response = await this.callFallbackAI(params);
        const processingTime = Date.now() - startTime;
        
        return {
          response,
          source: 'fallback',
          processingTime,
          modelUsed: '기본 응답 (대체)',
          metadata: {
            localOllamaAvailable: false,
            fallbackReason: ollamaStatus.error || 'Ollama 서버 연결 불가'
          }
        };
      }
      
    } catch (error) {
      console.error('❌ 하이브리드 AI 호출 실패:', error);
      
      const processingTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      
      return {
        response: `죄송합니다. AI 서비스에 일시적인 문제가 발생했습니다.\n\n오류: ${errorMessage}\n\n호스트 컴퓨터의 전원과 Ollama 서버 상태를 확인해주세요.`,
        source: 'fallback',
        processingTime,
        modelUsed: '오류 응답',
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
