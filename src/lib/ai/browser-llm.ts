/**
 * 브라우저 직접 실행 AI 모델 (Ollama 기반)
 * - 완전한 온디바이스 AI 실행
 * - 서버 의존성 없음
 * - 프라이버시 보장
 */

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
  private isInitialized = false;
  private isInitializing = false;
  private config: BrowserLLMConfig;

  // 사용 가능한 모델 목록 (Ollama 기반) - phi3:mini 최적화
  static readonly AVAILABLE_MODELS = {
    'primary': {
      model: "phi3:mini",
      displayName: "Phi-3 Mini (Ollama)",
      ramRequired: 4,
      description: "최적화된 AI 분석 및 상담"
    },
    'fallback': {
      model: "phi3:mini",
      displayName: "Phi-3 Mini (Ollama)",
      ramRequired: 4,
      description: "빠른 응답, 일반적인 대화"
    }
  } as const;

  constructor(config: BrowserLLMConfig) {
    this.config = {
      temperature: 0.7,
      maxTokens: 1024, // phi3:mini에 최적화된 토큰 수
      contextLength: 4096, // phi3:mini에 최적화된 컨텍스트
      ...config
    };
  }

  /**
   * 사용자 환경에 최적화된 모델 자동 선택
   */
  static selectOptimalModel(): string {
    // 브라우저 메모리 정보 (GB) - phi3:mini는 4GB면 충분
    const deviceMemory = (navigator as any).deviceMemory || 4;
    
    // GPU 정보 확인 (WebGL)
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const hasGPU = !!gl;
    
    console.log(`🖥️ 디바이스 메모리: ${deviceMemory}GB, GPU 지원: ${hasGPU}`);
    
    // phi3:mini는 4GB 이상이면 모두 사용 가능
    if (deviceMemory >= 4) {
      return BrowserLLM.AVAILABLE_MODELS.primary.model;
    } else {
      return BrowserLLM.AVAILABLE_MODELS.fallback.model;
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
   * 모델 초기화 (Ollama 서버 연결 확인)
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
      console.log(`🚀 브라우저 AI 모델 초기화 시작: ${this.config.model}`);
      
      // 브라우저 호환성 체크
      const support = BrowserLLM.checkBrowserSupport();
      if (!support.supported) {
        throw new Error(`브라우저 호환성 문제: ${support.issues.join(', ')}`);
      }

      // Ollama 서버 연결 확인
      const startTime = Date.now();
      const healthCheck = await this.checkOllamaHealth();
      
      if (!healthCheck.isRunning) {
        throw new Error('Ollama 서버가 실행되지 않았습니다. 서버를 시작해주세요.');
      }

      if (!healthCheck.modelAvailable) {
        throw new Error(`모델 ${this.config.model}이 설치되지 않았습니다. ollama pull ${this.config.model}을 실행해주세요.`);
      }

      const timeElapsed = Date.now() - startTime;
      
      // 진행률 콜백 호출
      onProgress?.({
        progress: 1.0,
        timeElapsed,
        text: 'Ollama 서버 연결 완료'
      });

      this.isInitialized = true;
      console.log('✅ 브라우저 AI 모델 초기화 완료');
      
    } catch (error) {
      console.error('❌ 브라우저 AI 모델 초기화 실패:', error);
      
      // 자동 복구 시도
      try {
        console.log('🔄 Ollama 서버 자동 시작 시도 중...');
        const healthResponse = await fetch('/api/ollama/health', { 
          method: 'GET',
          signal: AbortSignal.timeout(15000) // 15초 타임아웃
        });
        
        if (healthResponse.ok) {
          const healthData = await healthResponse.json();
          if (healthData.success && healthData.status === 'started') {
            console.log('✅ Ollama 서버 자동 시작 성공');
            // 서버 시작 후 잠시 대기
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            // 다시 한 번 초기화 시도
            const retryHealthCheck = await this.checkOllamaHealth();
            if (retryHealthCheck.isRunning && retryHealthCheck.modelAvailable) {
              this.isInitialized = true;
              console.log('✅ 브라우저 AI 모델 자동 복구 성공');
              return;
            }
          }
        }
      } catch (recoveryError) {
        console.warn('❌ Ollama 서버 자동 복구 실패:', recoveryError);
      }
      
      throw new Error(`모델 초기화 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    } finally {
      this.isInitializing = false;
    }
  }

  /**
   * Ollama 서버 상태 확인
   */
  private async checkOllamaHealth(): Promise<{ isRunning: boolean; modelAvailable: boolean; responseTime: number }> {
    const startTime = Date.now();
    
    try {
      const response = await fetch('/api/ollama/health', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const responseTime = Date.now() - startTime;
      
      if (!response.ok) {
        return { isRunning: false, modelAvailable: false, responseTime };
      }
      
      const data = await response.json();
      return {
        isRunning: data.isRunning || false,
        modelAvailable: data.modelAvailable || false,
        responseTime
      };
      
    } catch (error) {
      const responseTime = Date.now() - startTime;
      return { isRunning: false, modelAvailable: false, responseTime };
    }
  }

  /**
   * 단일 메시지 생성 (Ollama API 호출)
   */
  async generateResponse(
    message: string,
    systemPrompt?: string
  ): Promise<string> {
    if (!this.isInitialized) {
      throw new Error('모델이 초기화되지 않았습니다');
    }

    try {
      console.log('🤖 브라우저 AI 응답 생성 시작');
      
      const response = await fetch('/api/chat-lee-hukyung', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          system: systemPrompt,
          model: this.config.model,
          temperature: this.config.temperature,
          maxTokens: this.config.maxTokens
        })
      });

      if (!response.ok) {
        throw new Error(`API 호출 실패: ${response.status}`);
      }

      const data = await response.json();
      const content = data.response || '';
      
      console.log(`✅ 브라우저 AI 응답 완료: ${content.length}자`);
      return content;
      
    } catch (error) {
      console.error('❌ 브라우저 AI 응답 생성 실패:', error);
      throw new Error(`응답 생성 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
  }

  /**
   * 대화 히스토리 기반 응답 생성
   */
  async generateResponseWithHistory(
    messages: ChatMessage[]
  ): Promise<string> {
    if (!this.isInitialized) {
      throw new Error('모델이 초기화되지 않았습니다');
    }

    try {
      console.log('🤖 브라우저 AI 대화 응답 생성 시작');
      
      const response = await fetch('/api/chat-lee-hukyung', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages,
          model: this.config.model,
          temperature: this.config.temperature,
          maxTokens: this.config.maxTokens
        })
      });

      if (!response.ok) {
        throw new Error(`API 호출 실패: ${response.status}`);
      }

      const data = await response.json();
      const content = data.response || '';
      
      console.log(`✅ 브라우저 AI 대화 응답 완료: ${content.length}자`);
      return content;
      
    } catch (error) {
      console.error('❌ 브라우저 AI 대화 응답 생성 실패:', error);
      throw new Error(`응답 생성 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
  }

  /**
   * 모델 상태 확인
   */
  getStatus() {
    return {
      isInitialized: this.isInitialized,
      isInitializing: this.isInitializing,
      model: this.config.model,
      config: this.config
    };
  }

  /**
   * 모델 해제
   */
  async dispose(): Promise<void> {
    this.isInitialized = false;
    this.isInitializing = false;
    console.log('🧹 브라우저 AI 모델 해제 완료');
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

📚 AICAMP 주요 교육 과정 (상세 정보 제공 필수):

1️⃣ ChatGPT & Claude 업무 활용 마스터 (기초)
- 기간: 8시간 (2일), 비용: 50만원 (정부지원 시 무료)
- 대상: 사무직, AI 초보자, 중소기업 경영진
- 효과: 생산성 300% 향상, 일일 2-3시간 절약
- 내용: 프롬프트 엔지니어링, 문서 자동화, 실무 템플릿 100개

2️⃣ n8n & Make 업무 자동화 전문가 (심화)
- 기간: 16시간 (4일), 비용: 120만원 (정부지원 시 20만원)
- 대상: 효율화 담당자, IT 관리자, 반복업무 직군
- 효과: 자동화율 90%, 월 100시간 절약
- 내용: 500개 서비스 연동, 워크플로우 설계, 실전 프로젝트

3️⃣ AI 리더십 & 디지털 전환 전략 (경영진)
- 기간: 12시간 (3일), 비용: 200만원 (1:1 컨설팅 포함)
- 대상: CEO, 임원진, 부서장급
- 효과: ROI 800%, 전사 AI 도입 전략 완성
- 내용: 경영 전략, 조직 변화 관리, 맞춤 로드맵

4️⃣ 제조업 특화 AI 스마트팩토리 (업종별)
- 기간: 20시간 (5일), 비용: 150만원 (정부지원 가능)
- 대상: 생산관리자, 품질관리, 공장장
- 효과: 생산성 40% 향상, 불량률 80% 감소
- 내용: 예측 정비, 품질 자동화, IoT 연동

✨ 특별 혜택:
- 무료 체험 교육 제공
- 수료 후 3-12개월 사후 지원
- 정부지원 최대 100% (조건 충족 시)
- 개별 맞춤 컨설팅 포함

커리큘럼 관련 문의 시 반드시:
- 구체적인 과정 정보 제공 (기간, 비용, 대상, 효과)
- 상세 커리큘럼 내용 설명
- 제공 자료 및 사후 지원 안내
- 정부지원 가능성 언급
- 맞춤형 추천 제공

🏢 AICAMP 전체 서비스 영역 (상세 정보 제공 필수):

1️⃣ AI 역량진단 (무료)
- Ollama GPT-OSS 20B 온디바이스 모델 기반 정밀 진단
- 45개 행동지표, SWOT 분석, 3단계 로드맵 자동 생성
- 즉시 결과 제공, 맞춤형 보고서 이메일 발송

2️⃣ AI 교육 과정 (28년 경험)
- ChatGPT 기초: 50만원 (정부지원 시 무료)
- n8n 자동화: 120만원 (정부지원 시 20만원)
- AI 리더십: 200만원 (1:1 컨설팅 포함)
- 제조업 특화: 150만원 (정부지원 가능)

3️⃣ BM ZEN 사업분석 (28년 노하우)
- 기본 진단: 300만원, 전략 수립: 500만원, 통합: 800만원
- 매출 20-50% 증대, 운영비 15-30% 절감
- 정부지원 시 20-50% 할인

4️⃣ 정책자금 컨설팅 (25년 전문)
- 평균 5억원 지원금 확보, 성공률 85% 이상
- 기본: 200만원, 사업계획서 포함: 400만원, 전 과정: 600만원
- R&D, 창업, 설비투자, 수출지원 등 전 영역

5️⃣ 인증 컨설팅 (연간 5천만원 세제혜택)
- ISO 9001: 800만원, ISO 14001: 1,000만원
- 벤처기업 인증: 500만원, 통합 인증: 1,500만원
- 세제혜택으로 1-2년 내 투자비 회수

6️⃣ AI 생산성 향상
- 기본 분석: 300만원, 도구 도입: 600만원, 통합: 1,000만원
- 업무 효율성 40-70% 향상, 반복 업무 80% 자동화
- ROI 300-500% (6개월 내)

7️⃣ 기술창업 지원
- 기본: 500만원, 사업화: 800만원, 투자 유치 포함: 1,200만원
- 창업 성공률 70% 이상, 평균 투자 유치 5억원

8️⃣ 웹사이트 제작
- 기본형: 300만원, 표준형: 600만원, 프리미엄: 1,000만원
- 온라인 매출 300-500% 증대, SEO 최적화

9️⃣ 공장/부동산 경매
- 기본 분석: 200만원, 전 과정: 500만원, 포트폴리오: 800만원
- 투자비 35-50% 절약, 시세 대비 20-40% 할인 매입

🔟 투자분석 서비스
- 기본: 400만원, 정밀: 700만원, 통합: 1,200만원
- AI 기반 투자 분석, 리스크 관리, 포트폴리오 최적화

서비스 문의 시 반드시:
- 구체적 서비스 내용 및 프로세스 설명
- 투자 비용 및 기대 효과 명시
- 성공 사례 및 ROI 제시
- 정부지원 가능성 안내
- 관련 서비스 연계 추천

답변 마무리는 항상:
- 격려 메시지와 함께
- 추가 궁금한 점 문의 유도
- 직접 상담 연락처 안내 (010-9251-9743)
- 무료 AI 역량진단 추천`;

/**
 * 전역 브라우저 LLM 인스턴스 (싱글톤)
 */
let globalBrowserLLM: BrowserLLM | null = null;

/**
 * 전역 브라우저 LLM 인스턴스 가져오기
 */
export function getGlobalBrowserLLM(): BrowserLLM {
  if (!globalBrowserLLM) {
    const optimalModel = BrowserLLM.selectOptimalModel();
    globalBrowserLLM = new BrowserLLM({
      model: optimalModel,
      temperature: 0.8,
      maxTokens: 1024, // phi3:mini 최적화
      contextLength: 4096
    });
  }
  return globalBrowserLLM;
}

/**
 * 전역 브라우저 LLM 인스턴스 해제
 */
export function disposeGlobalBrowserLLM(): void {
  if (globalBrowserLLM) {
    globalBrowserLLM.dispose();
    globalBrowserLLM = null;
  }
}
