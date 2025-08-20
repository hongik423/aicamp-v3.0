/**
 * 브라우저 직접 실행 Llama 모델 (WebLLM 기반)
 * - 완전한 온디바이스 AI 실행
 * - 서버 의존성 없음
 * - 프라이버시 보장
 */

import * as webllm from "@mlc-ai/web-llm";

export interface BrowserLLMConfig {
  model: string;
  temperature?: number;
  maxTokens?: number;
  contextLength?: number;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class BrowserLLM {
  private engine: webllm.MLCEngineInterface | null = null;
  private isInitialized = false;
  private isInitializing = false;
  private config: BrowserLLMConfig;

  // 사용 가능한 모델 목록 (크기별)
  static readonly AVAILABLE_MODELS = {
    'small': {
      model: "Llama-2-7b-chat-hf-q4f16_1",
      displayName: "Llama 2 7B (4GB)",
      ramRequired: 8,
      description: "빠른 응답, 일반적인 대화"
    },
    'medium': {
      model: "Llama-2-13b-chat-hf-q4f16_1", 
      displayName: "Llama 2 13B (8GB)",
      ramRequired: 16,
      description: "균형잡힌 성능과 품질"
    },
    'large': {
      model: "CodeLlama-7b-Instruct-hf-q4f16_1",
      displayName: "Code Llama 7B (4GB)", 
      ramRequired: 8,
      description: "코딩 및 기술 상담 특화"
    }
  } as const;

  constructor(config: BrowserLLMConfig) {
    this.config = {
      temperature: 0.7,
      maxTokens: 512,
      contextLength: 2048,
      ...config
    };
  }

  /**
   * 사용자 환경에 최적화된 모델 자동 선택
   */
  static selectOptimalModel(): string {
    // 브라우저 메모리 정보 (GB)
    const deviceMemory = (navigator as any).deviceMemory || 4;
    
    // GPU 정보 확인 (WebGL)
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const hasGPU = !!gl;
    
    console.log(`🖥️ 디바이스 메모리: ${deviceMemory}GB, GPU 지원: ${hasGPU}`);
    
    if (deviceMemory >= 16 && hasGPU) {
      return BrowserLLM.AVAILABLE_MODELS.medium.model;
    } else if (deviceMemory >= 8) {
      return BrowserLLM.AVAILABLE_MODELS.small.model;
    } else {
      // 메모리가 부족한 경우 Code Llama (더 가벼움)
      return BrowserLLM.AVAILABLE_MODELS.large.model;
    }
  }

  /**
   * 브라우저 호환성 체크
   */
  static checkBrowserSupport(): { supported: boolean; issues: string[] } {
    const issues: string[] = [];
    
    // WebAssembly 지원
    if (typeof WebAssembly === 'undefined') {
      issues.push('WebAssembly가 지원되지 않습니다');
    }
    
    // SharedArrayBuffer 지원 (HTTPS 필요)
    if (typeof SharedArrayBuffer === 'undefined') {
      issues.push('SharedArrayBuffer가 지원되지 않습니다 (HTTPS 필요)');
    }
    
    // WebGL 지원
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      issues.push('WebGL이 지원되지 않습니다');
    }
    
    return {
      supported: issues.length === 0,
      issues
    };
  }

  /**
   * 모델 초기화 (진행률 콜백 포함)
   */
  async initialize(
    onProgress?: (progress: { progress: number; timeElapsed: number; text: string }) => void
  ): Promise<void> {
    if (this.isInitialized) return;
    if (this.isInitializing) {
      throw new Error('이미 초기화 중입니다');
    }

    this.isInitializing = true;

    try {
      console.log(`🚀 브라우저 Llama 모델 초기화 시작: ${this.config.model}`);
      
      // 브라우저 호환성 체크
      const support = BrowserLLM.checkBrowserSupport();
      if (!support.supported) {
        throw new Error(`브라우저 호환성 문제: ${support.issues.join(', ')}`);
      }

      // WebLLM 엔진 생성
      this.engine = await webllm.CreateMLCEngine(
        this.config.model,
        {
          initProgressCallback: (progress) => {
            const progressInfo = {
              progress: progress.progress,
              timeElapsed: progress.timeElapsed,
              text: progress.text || `모델 로딩 중... ${(progress.progress * 100).toFixed(1)}%`
            };
            
            console.log(`📥 모델 로딩: ${progressInfo.text}`);
            onProgress?.(progressInfo);
          },
          logLevel: "INFO"
        }
      );

      this.isInitialized = true;
      console.log('✅ 브라우저 Llama 모델 초기화 완료');
      
    } catch (error) {
      console.error('❌ 브라우저 Llama 모델 초기화 실패:', error);
      throw new Error(`모델 초기화 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    } finally {
      this.isInitializing = false;
    }
  }

  /**
   * 단일 메시지 생성
   */
  async generateResponse(
    message: string,
    systemPrompt?: string
  ): Promise<string> {
    if (!this.isInitialized || !this.engine) {
      throw new Error('모델이 초기화되지 않았습니다');
    }

    const messages: ChatMessage[] = [];
    
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    
    messages.push({ role: 'user', content: message });

    try {
      console.log('🤖 브라우저 Llama 응답 생성 시작');
      
      const response = await this.engine.chat.completions.create({
        messages: messages as any,
        temperature: this.config.temperature,
        max_tokens: this.config.maxTokens,
      });

      const content = response.choices[0]?.message?.content || '';
      
      console.log(`✅ 브라우저 Llama 응답 완료: ${content.length}자`);
      return content;
      
    } catch (error) {
      console.error('❌ 브라우저 Llama 응답 생성 실패:', error);
      throw new Error(`응답 생성 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
  }

  /**
   * 스트리밍 응답 생성
   */
  async *generateStreamResponse(
    message: string,
    systemPrompt?: string
  ): AsyncGenerator<string, void, unknown> {
    if (!this.isInitialized || !this.engine) {
      throw new Error('모델이 초기화되지 않았습니다');
    }

    const messages: ChatMessage[] = [];
    
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    
    messages.push({ role: 'user', content: message });

    try {
      console.log('🌊 브라우저 Llama 스트리밍 응답 시작');
      
      const stream = await this.engine.chat.completions.create({
        messages: messages as any,
        temperature: this.config.temperature,
        max_tokens: this.config.maxTokens,
        stream: true,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          yield content;
        }
      }
      
      console.log('✅ 브라우저 Llama 스트리밍 완료');
      
    } catch (error) {
      console.error('❌ 브라우저 Llama 스트리밍 실패:', error);
      throw new Error(`스트리밍 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
  }

  /**
   * 대화 히스토리를 포함한 응답 생성
   */
  async generateChatResponse(
    messages: ChatMessage[],
    onProgress?: (chunk: string) => void
  ): Promise<string> {
    if (!this.isInitialized || !this.engine) {
      throw new Error('모델이 초기화되지 않았습니다');
    }

    try {
      if (onProgress) {
        // 스트리밍 모드
        let fullResponse = '';
        for await (const chunk of this.generateStreamResponse(
          messages[messages.length - 1].content,
          messages.find(m => m.role === 'system')?.content
        )) {
          fullResponse += chunk;
          onProgress(chunk);
        }
        return fullResponse;
      } else {
        // 일반 모드
        return await this.generateResponse(
          messages[messages.length - 1].content,
          messages.find(m => m.role === 'system')?.content
        );
      }
    } catch (error) {
      console.error('❌ 브라우저 Llama 대화 응답 실패:', error);
      throw error;
    }
  }

  /**
   * 리소스 정리
   */
  async dispose(): Promise<void> {
    if (this.engine) {
      try {
        // WebLLM 엔진 정리 (메모리 해제)
        console.log('🧹 브라우저 Llama 모델 리소스 정리');
        // Note: WebLLM에 dispose 메서드가 있다면 호출
        this.engine = null;
        this.isInitialized = false;
      } catch (error) {
        console.warn('⚠️ 리소스 정리 중 오류:', error);
      }
    }
  }

  /**
   * 모델 상태 정보
   */
  getStatus() {
    return {
      isInitialized: this.isInitialized,
      isInitializing: this.isInitializing,
      model: this.config.model,
      config: this.config
    };
  }
}

/**
 * 이교장 AI 전용 시스템 프롬프트
 */
export const LEE_KYOJANG_SYSTEM_PROMPT = `
당신은 "이교장의AI상담" 시스템입니다. 이후경 교장(AICAMP 대표)의 28년간 현장 경험을 바탕으로 한 따뜻하고 친근한 AI 상담사입니다.

🎯 핵심 전문 영역:
- AI 역량진단 및 맞춤형 교육 설계 (45개 행동지표 기반)
- n8n/Make를 활용한 No-Code 업무 자동화 (90% 효율 향상)
- ChatGPT/Claude 프롬프트 엔지니어링 (생산성 300% 증대)
- 업종별 AI 도입 전략 (제조/서비스/금융/의료/교육 등)
- 경영진 AI 리더십 및 조직 변화 관리

💬 이교장의 친근하고 따뜻한 톤앤매너 (필수 준수):
- "안녕하세요!", "반갑습니다!", "걱정 마세요", "함께 해보실까요?" 등 친근한 인사
- "정말 좋은 질문이에요", "아, 그런 고민이 있으셨군요" 등 공감하는 표현
- "제가 28년간 현장에서 봐온 바로는...", "실제로 많은 기업들이..." 등 경험 공유
- "바로 시작해보세요", "걱정 없어요", "충분히 가능해요" 등 격려와 확신
- 존댓말 사용하되 딱딱하지 않은 자연스러운 한국어

📝 문의 유형별 답변 차별화:

1️⃣ 간단한 인사말 (안녕하세요, 처음 뵙겠습니다 등):
- 따뜻한 환영 인사와 간단한 자기소개
- AICAMP 주요 서비스 3-4가지 간단 소개
- "궁금한 것 있으시면 편하게 물어보세요" 등 친근한 마무리

2️⃣ 단순한 상담 신청 문의:
- "네, 물론이죠! 기꺼이 도와드리겠습니다" 등 적극적 응답
- 상담 프로세스 간단 설명
- 연락처 안내 (010-9251-9743)
- 무료 AI 역량진단 추천

3️⃣ 복합적인 기술/전략 문의:
- 문제 상황에 대한 공감과 이해 표현
- 28년 경험 바탕 구체적 해결 방안 제시
- 단계별 실행 계획 (즉시/1개월/3개월)
- 성공 사례와 ROI 수치 활용
- 맞춤형 상담 제안

4️⃣ AICAMP 커리큘럼 관련 문의:
- 교육 철학과 차별화 포인트 설명
- 업종별/직급별 맞춤 과정 소개
- 실무 중심 교육 방식 강조
- 수강생 성과 사례 공유
- 무료 체험 교육 안내

🚫 절대 금지사항:
- 마크다운 형식 사용 금지 (**, ##, - 등)
- 딱딱하거나 기계적인 표현
- 과도한 전문 용어나 영어 사용
- 길고 복잡한 문장 구조

✅ 답변 형식 가이드:
- 자연스러운 한글 문장으로 작성
- 문단 구분은 줄바꿈으로만 처리
- 숫자나 항목 나열 시 "첫째", "둘째" 또는 "1) 2)" 사용
- 친근한 이모지 적절히 활용 (😊, 👍, 🚀 등)

답변 마무리는 항상:
- 격려 메시지와 함께
- 추가 궁금한 점 문의 유도
- 직접 상담 연락처 안내 (010-9251-9743)
- 무료 AI 역량진단 추천`;

/**
 * 전역 브라우저 LLM 인스턴스 (싱글톤)
 */
let globalBrowserLLM: BrowserLLM | null = null;

export async function getGlobalBrowserLLM(): Promise<BrowserLLM> {
  if (!globalBrowserLLM) {
    const optimalModel = BrowserLLM.selectOptimalModel();
    globalBrowserLLM = new BrowserLLM({ model: optimalModel });
  }
  return globalBrowserLLM;
}

export function disposeBrowserLLM(): void {
  if (globalBrowserLLM) {
    globalBrowserLLM.dispose();
    globalBrowserLLM = null;
  }
}
