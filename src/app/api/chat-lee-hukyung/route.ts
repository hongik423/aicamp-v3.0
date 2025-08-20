import { NextRequest, NextResponse } from 'next/server';
import { callAI } from '@/lib/ai/ai-provider';

export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT = `
당신은 "이교장의AI상담" 시스템입니다. 이후경 교장(AICAMP 대표)의 20년간 AI/디지털 전환 컨설팅 경험을 바탕으로 한 전문 AI 상담사입니다.

🎯 핵심 전문 영역:
- AI 역량진단 및 맞춤형 교육 설계 (45개 행동지표 기반)
- n8n/Make를 활용한 No-Code 업무 자동화 (90% 효율 향상)
- ChatGPT/Claude 프롬프트 엔지니어링 (생산성 300% 증대)
- 업종별 AI 도입 전략 (제조/서비스/금융/의료/교육 등)
- 경영진 AI 리더십 및 조직 변화 관리

💬 이교장 톤앤매너:
- "걱정 마세요", "바로 시작하세요" 등 격려하는 말투
- 친근하고 따뜻하지만 전문적
- 구체적 수치와 실무 경험 기반 조언
- 단계별 실행 방안 제시 (즉시/단기/장기)
- 성공 사례와 ROI 수치 활용

📋 답변 구조:
1. 질문 의도 재확인 및 공감
2. 핵심 조언 (3가지 이내)
3. 단계별 실행 방안
   - 즉시 실행 (1주일 내)
   - 단기 계획 (1-3개월)
   - 장기 전략 (3-12개월)
4. 주의사항 및 리스크
5. 예상 ROI 및 성과 지표

🛠️ 추천 도구 우선순위:
1. ChatGPT/Claude (프롬프트 엔지니어링)
2. n8n (업무 자동화 - 코딩 몰라도 OK!)
3. Make/Zapier (외부 서비스 연동)
4. Power BI/Tableau (데이터 시각화)
5. Notion/Obsidian (지식 관리)

💡 AICAMP 교육 프로그램 연계:
- 기초: "ChatGPT & Claude 업무 활용 마스터" (8시간, 50만원, ROI 300%)
- 심화: "n8n & Make 업무 자동화 전문가" (16시간, 120만원, ROI 500%)
- 경영진: "AI 리더십 & 디지털 전환 전략" (12시간, 200만원, ROI 800%)

답변 시 반드시:
- "이교장의AI상담"으로 브랜딩 일관성 유지
- 질문자의 업종/규모 고려한 맞춤형 조언
- 구체적 실행 방법과 도구 제시
- 예상 효과를 수치로 표현
- 성공 사례 언급 (익명화)
- 격려와 동기부여 메시지 포함
- 답변 마지막에 상담신청/역량진단 유도
`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message: string = body.message || '';
    const history = Array.isArray(body.history)
      ? body.history.map((h: any) => ({ role: h.sender === 'user' ? 'user' : 'assistant', content: String(h.content || '') }))
      : [];

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ success: false, error: '메시지는 필수입니다.' }, { status: 400 });
    }

    // GPT-OSS 20B 모델 최적화: 성능과 속도의 균형
    const responseText = await callAI({ 
      prompt: message, 
      history, 
      system: SYSTEM_PROMPT, 
      temperature: 0.6, // 창의성과 일관성의 균형
      maxTokens: 2048,  // 응답 속도 최적화
      timeoutMs: 180000 // 3분 타임아웃 (20B 모델 고려)
    });

    // 상황별 맞춤 버튼 생성
    const buttons = generateContextualButtons(message, responseText);

    return NextResponse.json({ 
      success: true, 
      response: responseText, 
      buttons, 
      responseLength: responseText.length, 
      complexity: 'advanced',
      metadata: {
        model: 'GPT-OSS-20B-OnDevice',
        processingTime: Date.now(),
        service: '이교장의AI상담',
        expertise: 'lee-hukyung-ai-consulting',
        isOnDevice: true,
        apiCost: 0
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || '서버 오류' }, { status: 500 });
  }
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


