import { NextRequest, NextResponse } from 'next/server';
import { callAI } from '@/lib/ai/ai-provider';
import { findCachedResponse, CacheMetrics } from '@/lib/cache/faq-cache';
import { AICAMP_CURRICULUM_DATABASE, CurriculumRecommendationEngine } from '@/lib/data/aicamp-curriculum-database';

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

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const body = await request.json();
    const message: string = body.message || '';
    const history = Array.isArray(body.history)
      ? body.history.map((h: any) => ({ role: h.sender === 'user' ? 'user' : 'assistant', content: String(h.content || '') }))
      : [];

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ success: false, error: '메시지는 필수입니다.' }, { status: 400 });
    }

    let responseText: string;
    let isFromFallback = false;
    let isFromCache = false;

    // 1단계: 캐시된 응답 확인 (즉시 응답)
    const cachedResponse = findCachedResponse(message);
    if (cachedResponse) {
      console.log('⚡ 캐시 히트 - 즉시 응답:', message.substring(0, 20));
      CacheMetrics.recordHit();
      
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
          cacheStats: CacheMetrics.getStats()
        }
      });
    }

    CacheMetrics.recordMiss();

    try {
      // 2단계: AI 응답 생성 (최적화된 설정)
      responseText = await callAI({ 
        prompt: message, 
        history, 
        system: SYSTEM_PROMPT, 
        temperature: 0.8, // 더 자연스러운 대화
        maxTokens: 800,   // 더 빠른 응답
        timeoutMs: 35000  // 35초 타임아웃으로 단축
      });
    } catch (aiError) {
      console.log('🔄 AI 응답 실패, 폴백 응답 생성:', aiError);
      isFromFallback = true;
      
      // 3단계: 즉시 폴백 응답 생성 (문의 유형별)
      responseText = generateFallbackResponse(message);
    }

    // 상황별 맞춤 버튼 생성
    const buttons = generateContextualButtons(message, responseText);
    const processingTime = Date.now() - startTime;

    return NextResponse.json({ 
      success: true, 
      response: responseText, 
      buttons, 
      responseLength: responseText.length, 
      complexity: isFromFallback ? 'fallback' : 'advanced',
      metadata: {
        model: isFromFallback ? 'Fallback-Response' : 'GPT-OSS-20B-OnDevice',
        processingTime,
        service: '이교장의AI상담',
        expertise: 'lee-hukyung-ai-consulting',
        isOnDevice: !isFromFallback,
        apiCost: 0,
        isFallback: isFromFallback
      }
    });
  } catch (error: any) {
    console.error('❌ 전체 API 오류:', error);
    
    // 최종 폴백: 기본 응답
    const fallbackResponse = "안녕하세요! 일시적으로 시스템 응답이 지연되고 있습니다. 😊\n\n직접 상담을 원하시면 010-9251-9743으로 연락주세요. 28년 경험의 이교장이 직접 도움드리겠습니다!\n\n무료 AI 역량진단도 언제든 받아보실 수 있어요.";
    
    return NextResponse.json({ 
      success: true, 
      response: fallbackResponse,
      buttons: [
        { text: '📞 직접 상담', url: '/consultation', style: 'primary', icon: 'Phone' },
        { text: '🎯 무료 진단', url: '/ai-diagnosis', style: 'secondary', icon: 'Target' }
      ],
      metadata: {
        model: 'Emergency-Fallback',
        service: '이교장의AI상담',
        isFallback: true,
        processingTime: Date.now() - startTime
      }
    });
  }
}

/**
 * 즉시 폴백 응답 생성 (문의 유형별 맞춤 응답)
 */
function generateFallbackResponse(message: string): string {
  const msg = message.toLowerCase();
  
  // 1. 간단한 인사말
  if (msg.includes('안녕') || msg.includes('처음') || msg.includes('반갑') || msg.length < 10) {
    return `안녕하세요! 반갑습니다! 😊

저는 AICAMP 이교장입니다. 28년간 현장에서 쌓은 경험으로 기업들의 AI 도입과 디지털 전환을 도와드리고 있어요.

주요 서비스는 이런 것들이 있어요:
1) AI 역량진단 - 45개 지표로 정밀 분석
2) 맞춤형 AI 교육 - 업종별 실무 중심
3) n8n 업무 자동화 - 코딩 없이도 가능
4) AI 도입 전략 컨설팅

궁금한 것 있으시면 편하게 물어보세요! 직접 상담은 010-9251-9743으로 연락주시면 됩니다.`;
  }
  
  // 2. 상담 신청 관련
  if (msg.includes('상담') || msg.includes('문의') || msg.includes('도움') || msg.includes('신청')) {
    return `네, 물론이죠! 기꺼이 도와드리겠습니다! 👍

상담 프로세스는 이렇게 진행돼요:
1) 무료 AI 역량진단으로 현재 상태 파악
2) 맞춤형 솔루션 설계
3) 단계별 실행 계획 수립
4) 지속적인 성과 모니터링

직접 상담: 010-9251-9743 (이후경 교장)
온라인 진단: 무료로 바로 시작 가능해요

28년 경험으로 정말 실무에 도움되는 조언 드릴게요. 걱정 마시고 바로 시작해보세요!`;
  }
  
  // 3. 교육/커리큘럼 관련
  if (msg.includes('교육') || msg.includes('과정') || msg.includes('커리큘럼') || msg.includes('배우')) {
    return `아, 교육 과정에 관심 있으시는군요! 정말 좋은 선택이에요! 🎓

AICAMP 교육의 특별한 점:
1) 실무 중심 - 바로 써먹을 수 있는 내용
2) 업종별 맞춤 - 제조, 서비스, 금융 등
3) 단계별 설계 - 기초부터 전문가까지
4) 성과 보장 - 평균 생산성 40% 향상

인기 과정:
• ChatGPT 업무 활용 마스터
• n8n 업무 자동화 전문가  
• AI 리더십 & 전략 과정

무료 체험 교육도 있으니까 부담 없이 시작해보세요! 010-9251-9743으로 연락주시면 맞춤 과정 추천해드릴게요.`;
  }
  
  // 4. 기술/전략 관련
  if (msg.includes('ai') || msg.includes('자동화') || msg.includes('전략') || msg.includes('도입')) {
    return `정말 좋은 질문이에요! AI 도입은 이제 선택이 아니라 필수죠. 😊

제가 28년간 현장에서 봐온 바로는, 성공하는 기업들의 공통점이 있어요:
1) 단계적 접근 - 한 번에 다 하려 하지 않음
2) 실무진 교육 - 사용자가 편해야 성공
3) 작은 성공 경험 - 자신감이 확산 효과
4) 지속적 개선 - 한 번 하고 끝이 아님

구체적인 로드맵:
즉시 실행: ChatGPT 업무 활용 (1주일)
단기 계획: n8n 자동화 구축 (1개월)  
장기 전략: AI 조직 문화 정착 (3개월)

걱정 없어요, 충분히 가능해요! 직접 상담받으시면 더 구체적인 방안 알려드릴게요. 010-9251-9743`;
  }
  
  // 5. 기본 응답
  return `안녕하세요! 좋은 질문 주셔서 감사해요! 😊

현재 시스템이 잠시 바쁜 상태라 간단히 답변드릴게요. 더 자세한 상담은 직접 받으시는 게 좋을 것 같아요.

28년 경험의 이교장이 직접 상담해드립니다:
📞 010-9251-9743

무료 AI 역량진단도 언제든 받아보실 수 있어요. 45개 지표로 정밀하게 분석해서 맞춤형 솔루션 제안해드려요.

바로 시작해보세요! 걱정 마시고 편하게 연락주세요.`;
}

/**
 * 상황별 맞춤 버튼 생성 (이교장 AI 전문성 기반)
 */
function generateContextualButtons(userMessage: string, aiResponse: string) {
  const message = userMessage.toLowerCase();
  const response = aiResponse.toLowerCase();
  
  // 기본 버튼 (이교장의AI상담 브랜딩)
  const baseButtons = [
    { text: '🎯 AI 역량진단 신청', url: '/ai-diagnosis', style: 'primary', icon: 'Target' },
    { text: '📞 이교장 전문가 상담', url: '/consultation', style: 'secondary', icon: 'Phone' }
  ];
  
  // 상황별 추가 버튼
  const contextualButtons = [];
  
  // AI 교육/학습 관련
  if (message.includes('교육') || message.includes('학습') || message.includes('배우') || 
      response.includes('교육') || response.includes('커리큘럼')) {
    contextualButtons.push(
      { text: '📚 AICAMP 교육과정', url: '/services/ai-curriculum', style: 'accent', icon: 'BookOpen' },
      { text: '🎓 맞춤형 교육 설계', url: '/consultation?type=education', style: 'outline', icon: 'GraduationCap' }
    );
  }
  
  // 자동화/n8n 관련
  if (message.includes('자동화') || message.includes('n8n') || message.includes('워크플로우') ||
      response.includes('자동화') || response.includes('n8n')) {
    contextualButtons.push(
      { text: '🔄 n8n 자동화 컨설팅', url: '/consultation?type=automation', style: 'accent', icon: 'Zap' },
      { text: '⚙️ 업무 프로세스 분석', url: '/free-diagnosis?focus=automation', style: 'outline', icon: 'Settings' }
    );
  }
  
  // 진단/분석 관련
  if (message.includes('진단') || message.includes('분석') || message.includes('평가') ||
      response.includes('진단') || response.includes('분석')) {
    contextualButtons.push(
      { text: '📊 무료 간이진단', url: '/free-diagnosis', style: 'accent', icon: 'BarChart3' },
      { text: '🔍 정밀 역량분석', url: '/ai-diagnosis', style: 'outline', icon: 'Search' }
    );
  }
  
  // 전략/컨설팅 관련
  if (message.includes('전략') || message.includes('계획') || message.includes('로드맵') ||
      response.includes('전략') || response.includes('로드맵')) {
    contextualButtons.push(
      { text: '🎯 AI 전략 수립', url: '/consultation?type=strategy', style: 'accent', icon: 'Target' },
      { text: '📈 ROI 분석 리포트', url: '/consultation?type=roi', style: 'outline', icon: 'TrendingUp' }
    );
  }
  
  // 도구/기술 관련
  if (message.includes('chatgpt') || message.includes('claude') || message.includes('도구') ||
      response.includes('chatgpt') || response.includes('프롬프트')) {
    contextualButtons.push(
      { text: '💬 프롬프트 엔지니어링', url: '/services/prompt-engineering', style: 'accent', icon: 'MessageSquare' },
      { text: '🛠️ AI 도구 활용법', url: '/consultation?type=tools', style: 'outline', icon: 'Wrench' }
    );
  }
  
  // 최대 4개 버튼으로 제한 (UI 최적화)
  const allButtons = [...baseButtons, ...contextualButtons.slice(0, 2)];
  
  return allButtons;
}


