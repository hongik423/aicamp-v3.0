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
당신은 "이교장의AI상담" 시스템의 일반 상담 챗봇입니다.

🏢 이교장의AI상담 소개:
- AI 역량진단 및 맞춤형 교육 전문 기관
- 이후경 교장이 이끄는 AI/디지털 전환 컨설팅 회사
- n8n, ChatGPT, Claude 등 실무 중심 교육 제공
- 100% 온디바이스 AI로 완전 무료 상담

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

    // GPT-OSS 20B 최적화 설정 (속도 우선)
    const responseText = await callAI({ 
      prompt: message, 
      history, 
      system, 
      temperature: 0.6, 
      maxTokens: 1536,  // 빠른 응답을 위해 토큰 수 조정
      timeoutMs: 120000 // 2분 타임아웃
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
        model: 'GPT-OSS-20B-OnDevice',
        service: '이교장의AI상담-일반',
        isOnDevice: true,
        apiCost: 0,
        externalAPI: false
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || '서버 오류' }, { status: 500 });
  }
}


