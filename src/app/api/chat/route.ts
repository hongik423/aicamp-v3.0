import { NextRequest, NextResponse } from 'next/server';
import { callAI } from '@/lib/ai/ai-provider';

export const dynamic = 'force-dynamic';

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

    const system = `
당신은 "이교장의AI상담" 시스템의 Ollama phi3:mini 전용 상담 챗봇입니다.

🏢 이교장의AI상담 소개:
- AI 역량진단 및 맞춤형 교육 전문 기관
- 이후경 교장이 이끄는 AI/디지털 전환 컨설팅 회사
- n8n, ChatGPT, Claude 등 실무 중심 교육 제공
- 100% 온디바이스 Ollama phi3:mini AI로 완전 무료 상담

💬 답변 원칙:
- 친근하고 도움이 되는 톤
- 구체적이고 실용적인 조언
- AICAMP 서비스와 자연스럽게 연결
- 간결하면서도 충분한 정보 제공

🎯 주요 서비스:
- AI 역량진단 (45개 행동지표)
- 맞춤형 AI 교육과정
- n8n 업무 자동화 컨설팅
- 프롬프트 엔지니어링 교육
`;

    // 배포 환경에서 로컬 Ollama 호출 불가 상황 사전 처리
    const ollamaUrl = process.env.OLLAMA_API_URL || 'http://localhost:11434';
    const isServerless = !!process.env.VERCEL;

    if (isServerless && /localhost|127\.0\.0\.1/i.test(ollamaUrl)) {
      const fallback =
        '안녕하세요! 현재 배포 환경에서는 로컬 Ollama 엔진을 사용할 수 없어 즉시 답변을 제공하지 못하고 있습니다.\n\n' +
        '빠르게 상담 원하시면 아래 중 하나를 이용해주세요.\n' +
        '1) 전화 010-9251-9743\n' +
        '2) 이메일 hongik423@gmail.com\n' +
        '3) 좌측 버튼에서 AI 역량진단을 바로 시작하실 수 있어요.\n\n' +
        '불편을 드려 죄송합니다. 운영 서버에 Ollama가 연결되는 즉시 정상 동작합니다.';

      const buttons = [
        { text: '🎯 AI 역량진단', url: '/ai-diagnosis', style: 'primary', icon: 'Target' },
        { text: '📞 상담 예약', url: '/consultation', style: 'secondary', icon: 'Phone' },
        { text: '📚 교육과정 보기', url: '/services/ai-curriculum', style: 'outline', icon: 'BookOpen' }
      ];

      return NextResponse.json({ success: true, response: fallback, buttons });
    }

    // GPT-OSS/phi3 최적화 설정 (속도 우선)
    const responseText = await callAI({
      prompt: message,
      history,
      system,
      temperature: 0.6,
      maxTokens: 1536,
      timeoutMs: 120000
    });

    // 기본 액션 버튼
    const buttons = [
      { text: '🎯 AI 역량진단', url: '/ai-diagnosis', style: 'primary', icon: 'Target' },
      { text: '📞 상담 예약', url: '/consultation', style: 'secondary', icon: 'Phone' },
      { text: '📚 교육과정 보기', url: '/services/ai-curriculum', style: 'outline', icon: 'BookOpen' }
    ];

    return NextResponse.json({ 
      success: true, 
      response: responseText,
      buttons,
      metadata: {
        model: 'Ollama-GPT-OSS-20B-OnDevice',
        service: '이교장의AI상담-Ollama전용',
        isOnDevice: true,
        apiCost: 0,
        externalAPI: false,
        aiProvider: 'ollama',
        localAI: true
      }
    });
  } catch (error: any) {
    // 내부 오류 노출을 피하고 일관된 안내 제공
    const friendly =
      '죄송합니다. AI 서비스에 일시적인 문제가 발생했습니다.\n\n' +
      '지금은 즉시 상담 연결을 권장드립니다.\n' +
      '전화 010-9251-9743 / 이메일 hongik423@gmail.com\n\n' +
      '잠시 후 다시 시도하시면 정상 동작할 수 있습니다.';
    return NextResponse.json({ success: true, response: friendly }, { status: 200 });
  }
}


