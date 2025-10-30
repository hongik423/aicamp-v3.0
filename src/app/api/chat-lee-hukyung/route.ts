import { NextRequest, NextResponse } from 'next/server';
import { generateEnhancedResponse } from '@/lib/ai/enhanced-fallback-system';
import { hybridAIProvider } from '@/lib/ai/hybrid-ai-provider';

export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT = `
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
- 기간: 8시간 (2일)
- 대상: 사무직, AI 초보자, 중소기업 경영진
- 효과: 생산성 300% 향상, 일일 2-3시간 절약
- 내용: 프롬프트 엔지니어링, 문서 자동화, 실무 템플릿 100개

2️⃣ n8n & Make 업무 자동화 전문가 (심화)
- 기간: 16시간 (4일)
- 대상: 효율화 담당자, IT 관리자, 반복업무 직군
- 효과: 자동화율 90%, 월 100시간 절약
- 내용: 500개 서비스 연동, 워크플로우 설계, 실전 프로젝트

3️⃣ AI 리더십 & 디지털 전환 전략 (경영진)
- 기간: 12시간 (3일) (1:1 컨설팅 포함)
- 대상: CEO, 임원진, 부서장급
- 효과: ROI 800%, 전사 AI 도입 전략 완성
- 내용: 경영 전략, 조직 변화 관리, 맞춤 로드맵

4️⃣ 제조업 특화 AI 스마트팩토리 (업종별)
- 기간: 20시간 (5일)
- 대상: 생산관리자, 품질관리, 공장장
- 효과: 생산성 40% 향상, 불량률 80% 감소
- 내용: 예측 정비, 품질 자동화, IoT 연동

✨ 특별 혜택:
- 무료 체험 교육 제공
- 수료 후 3-12개월 사후 지원
- 정부지원 최대 100% (조건 충족 시)
- 개별 맞춤 컨설팅 포함

커리큘럼 관련 문의 시 반드시:
- 구체적인 과정 정보 제공 (기간, 대상, 효과)
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
- ChatGPT 기초 (정부지원 시 무료)
- n8n 자동화 (정부지원 시 할인)
- AI 리더십 (1:1 컨설팅 포함)
- 제조업 특화 (정부지원 가능)

3️⃣ BM ZEN 사업분석 (28년 노하우)
- 기본 진단, 전략 수립, 통합 서비스 제공
- 매출 20-50% 증대, 운영비 15-30% 절감
- 정부지원 시 할인 혜택

4️⃣ 정책자금 컨설팅 (25년 전문)
- 평균 5억원 지원금 확보, 성공률 85% 이상
- 기본, 사업계획서 포함, 전 과정 서비스 제공
- R&D, 창업, 설비투자, 수출지원 등 전 영역

5️⃣ 인증 컨설팅 (연간 세제혜택)
- ISO 9001, ISO 14001, 벤처기업 인증, 통합 인증 서비스
- 세제혜택으로 투자비 회수

6️⃣ AI 생산성 향상
- 기본 분석, 도구 도입, 통합 서비스 제공
- 업무 효율성 40-70% 향상, 반복 업무 80% 자동화
- ROI 300-500% (6개월 내)

7️⃣ 기술창업 지원
- 기본, 사업화, 투자 유치 포함 서비스 제공
- 창업 성공률 70% 이상, 평균 투자 유치 5억원

8️⃣ 웹사이트 제작
- 기본형, 표준형, 프리미엄 서비스 제공
- 온라인 매출 300-500% 증대, SEO 최적화

9️⃣ 공장/부동산 경매
- 기본 분석, 전 과정, 포트폴리오 서비스 제공
- 투자비 35-50% 절약, 시세 대비 20-40% 할인 매입

🔟 투자분석 서비스
- 기본, 정밀, 통합 서비스 제공
- AI 기반 투자 분석, 리스크 관리, 포트폴리오 최적화

서비스 문의 시 반드시:
- 구체적 서비스 내용 및 프로세스 설명
- 기대 효과 명시
- 성공 사례 및 ROI 제시
- 정부지원 가능성 안내
- 관련 서비스 연계 추천

답변 마무리는 항상:
- 격려 메시지와 함께
- 추가 궁금한 점 문의 유도
- 직접 상담 연락처 안내 (010-9251-9743)
- 무료 AI 역량진단 추천`;

// 캐시 시스템
class ResponseCache {
  private cache = new Map<string, { content: string; buttons: any[]; timestamp: number }>();
  private maxSize = 1000;
  private ttl = 30 * 60 * 1000; // 30분

  set(key: string, value: { content: string; buttons: any[] }): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, { ...value, timestamp: Date.now() });
  }

  get(key: string): { content: string; buttons: any[] } | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item;
  }

  clear(): void {
    this.cache.clear();
  }
}

const responseCache = new ResponseCache();

// 캐시 메트릭
class ChatCacheMetrics {
  private hits = 0;
  private misses = 0;

  recordHit(): void {
    this.hits++;
  }

  recordMiss(): void {
    this.misses++;
  }

  getStats(): { hits: number; misses: number; hitRate: number } {
    const total = this.hits + this.misses;
    return {
      hits: this.hits,
      misses: this.misses,
      hitRate: total > 0 ? this.hits / total : 0
    };
  }
}

const chatCacheMetrics = new ChatCacheMetrics();

// 캐시된 응답 찾기
function findCachedResponse(question: string): { content: string; buttons: any[] } | null {
  const normalizedQuestion = question.toLowerCase().trim();
  const key = normalizedQuestion.substring(0, 50); // 첫 50자만 키로 사용
  return responseCache.get(key);
}

// 빠른 폴백 응답 생성
function generateQuickFallback(question: string): string {
  const normalizedQuestion = question.toLowerCase();
  
  if (normalizedQuestion.includes('안녕') || normalizedQuestion.includes('반갑')) {
    return '안녕하세요! 이교장의 AI 상담에 오신 것을 환영합니다! 😊\n\n저는 이후경 교장의 28년간 현장 경험을 바탕으로 AI 역량진단, 교육, 컨설팅에 대해 도움을 드리는 AI 상담사입니다.\n\n궁금한 점이 있으시면 언제든 편하게 물어보세요!';
  }
  
  if (normalizedQuestion.includes('진단') || normalizedQuestion.includes('역량')) {
    return 'AI 역량진단에 대해 궁금하시군요! 🎯\n\n45개 행동지표를 기반으로 정밀한 진단을 제공합니다. 무료로 받아보실 수 있어요!\n\n바로 시작해보시겠어요?';
  }
  
  if (normalizedQuestion.includes('n8n') || normalizedQuestion.includes('자동화')) {
    return 'n8n 자동화에 대해 궁금하시군요! 🚀\n\nNo-Code로 업무를 90% 자동화할 수 있는 강력한 도구입니다. 16시간 과정으로 전문가가 될 수 있어요.\n\n더 자세한 정보가 필요하시면 언제든 연락주세요!';
  }
  
  if (normalizedQuestion.includes('상담') || normalizedQuestion.includes('문의')) {
    return '상담 문의 감사합니다! 📞\n\n이교장이 직접 도와드리겠습니다. 연락처: 010-9251-9743\n\n무료 AI 역량진단도 함께 받아보시는 것을 추천드려요!';
  }
  
  return '안녕하세요! 이교장의 AI 상담입니다. 😊\n\n궁금한 점이 있으시면 언제든 편하게 물어보세요. AI 역량진단, 교육, 컨설팅 등 모든 분야에서 도움을 드리겠습니다!\n\n연락처: 010-9251-9743';
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const body = await request.json();
    const message: string = body.message || '';
    const history = Array.isArray(body.history)
      ? body.history.map((h: any) => ({ role: h.sender === 'user' ? 'user' : 'assistant', content: String(h.content || '') }))
      : [];
    const sessionId = body.sessionId || `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ success: false, error: '메시지는 필수입니다.' }, { status: 400 });
    }

    let responseText: string;
    let isFromFallback = false;
    let isFromCache = false;
    let enhancedResponse = null;

    // 1단계: 캐시된 응답 확인 (즉시 응답)
    const cachedResponse = findCachedResponse(message);
    if (cachedResponse) {
      console.log('⚡ 캐시 히트 - 즉시 응답:', message.substring(0, 20));
      chatCacheMetrics.recordHit();
      
      return NextResponse.json({ 
        success: true, 
        response: cachedResponse.content, 
        buttons: cachedResponse.buttons, 
        responseLength: cachedResponse.content.length, 
        complexity: 'cached',
        metadata: {
          model: 'FAQ-Cache-Instant',
          processingTime: Date.now() - startTime,
          service: '이교장의AI상담',
          expertise: 'lee-hukyung-ai-consulting',
          isOnDevice: true,
          apiCost: 0,
          isCached: true,
          cacheStats: chatCacheMetrics.getStats()
        }
      });
    }

    chatCacheMetrics.recordMiss();

    try {
      // 2단계: 🤖 하이브리드 AI 시스템 사용 (로컬 Ollama 우선, 대체 서비스 백업)
      console.log('🤖 하이브리드 AI 시스템 시작');
      const hybridStartTime = performance.now();
      
      const hybridResponse = await hybridAIProvider.callAI({
        prompt: message,
        system: SYSTEM_PROMPT,
        temperature: 0.8,
        maxTokens: 1024
      });
      
      const hybridEndTime = performance.now();
      const hybridProcessingTime = hybridEndTime - hybridStartTime;
      
      console.log(`🤖 하이브리드 AI 응답 완료: ${hybridProcessingTime.toFixed(2)}ms`);
      console.log(`📊 AI 소스: ${hybridResponse.source}`);
      console.log(`🤖 사용 모델: ${hybridResponse.modelUsed}`);
      
      responseText = hybridResponse.response;
      
      // 로컬 Ollama 사용 시 품질 향상
      if (hybridResponse.source === 'local') {
        console.log('✅ 로컬 phi3:mini 모델 사용 - 고품질 응답');
      } else {
        console.log('⚠️ 대체 서비스 사용 - 기본 응답');
      }
      
      // 대체 서비스 사용 시 추가 안내
      if (hybridResponse.source === 'fallback') {
        console.log('⚠️ 대체 서비스 사용 - 추가 안내 제공');
        responseText += '\n\n💡 더 정확한 AI 상담을 위해서는 호스트 컴퓨터의 전원과 Ollama 서버 상태를 확인해주세요.';
        responseText += '\n📞 문의: 010-9251-9743';
      }
      
    } catch (hybridError) {
      console.log('🔄 하이브리드 AI 시스템 실패, 기본 폴백 사용:', hybridError);
      isFromFallback = true;
      responseText = generateQuickFallback(message);
    }

    // 기본 액션 버튼
    const buttons = [
      { text: '🎯 AI 역량진단', url: '/ai-diagnosis', style: 'primary', icon: 'Target' },
      { text: '📞 상담 예약', url: '/consultation', style: 'secondary', icon: 'Phone' },
      { text: '📚 교육과정 보기', url: '/services/ai-curriculum', style: 'outline', icon: 'BookOpen' }
    ];

    // 응답 캐싱
    responseCache.set(message.toLowerCase().substring(0, 50), {
      content: responseText,
      buttons
    });

    const totalProcessingTime = Date.now() - startTime;
    
    // 품질 점수에 따른 소스 라벨
    const qualityScore = enhancedResponse?.qualityMetrics.overallScore || 0;
    let sourceLabel = `— 이교장 완벽한 챗봇 시스템 [${totalProcessingTime}ms]`;
    
    if (qualityScore >= 90) {
      sourceLabel = `🏆 이교장 최상급 AI 시스템 [${totalProcessingTime}ms] (품질: ${qualityScore.toFixed(1)}점)`;
    } else if (qualityScore >= 80) {
      sourceLabel = `✅ 이교장 우수 AI 시스템 [${totalProcessingTime}ms] (품질: ${qualityScore.toFixed(1)}점)`;
    } else if (isFromFallback) {
      sourceLabel = `🔄 이교장 폴백 시스템 [${totalProcessingTime}ms]`;
    }

    return NextResponse.json({ 
      success: true, 
      response: responseText,
      buttons,
      responseLength: responseText.length,
      complexity: enhancedResponse ? 'enhanced' : 'fallback',
      metadata: {
        model: enhancedResponse ? 'Enhanced-Fallback-System' : 'Quick-Fallback',
        processingTime: totalProcessingTime,
        service: '이교장의AI상담',
        expertise: 'lee-hukyung-ai-consulting',
        isOnDevice: true,
        apiCost: 0,
        isCached: false,
        qualityScore: qualityScore,
        fallbackLevel: enhancedResponse?.metadata.fallbackLevel || 0,
        emotionalAnalysis: enhancedResponse?.emotionalAnalysis,
        contextAnalysis: enhancedResponse?.context,
        cacheStats: chatCacheMetrics.getStats(),
        sourceLabel
      }
    });

  } catch (error) {
    console.error('❌ 챗봇 API 오류:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      metadata: {
        model: 'Error-Fallback',
        processingTime: Date.now() - startTime,
        service: '이교장의AI상담',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }, { status: 500 });
  }
}


