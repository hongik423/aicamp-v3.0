import { NextRequest } from 'next/server';
import { callAI } from '@/lib/ai/ai-provider';

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

🚫 절대 금지사항:
- 마크다운 형식 사용 금지 (**, ##, - 등)
- 딱딱하거나 기계적인 표현
- 과도한 전문 용어나 영어 사용
- 길고 복잡한 문장 구조

답변은 간결하고 친근하게, 즉시 도움이 되는 내용으로 작성하세요.`;

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const body = await request.json();
    const message: string = body.message || '';

    if (!message || typeof message !== 'string') {
      return new Response('메시지는 필수입니다.', { status: 400 });
    }

    // 스트리밍 응답 설정
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // 즉시 시작 신호 전송
          controller.enqueue(encoder.encode('data: {"type":"start","message":"응답 생성 중..."}\n\n'));
          
          let responseText: string;
          let isFromFallback = false;

          try {
            // AI 응답 생성 (최적화된 설정)
            responseText = await callAI({ 
              prompt: message, 
              history: [], 
              system: SYSTEM_PROMPT, 
              temperature: 0.8, // 자연스러운 대화
              maxTokens: 800,   // 더 빠른 응답
              timeoutMs: 30000  // 30초 타임아웃
            });
          } catch (aiError) {
            console.log('🔄 AI 응답 실패, 폴백 응답 생성');
            isFromFallback = true;
            responseText = generateQuickFallback(message);
          }

          // 응답을 청크 단위로 전송 (타이핑 효과)
          const words = responseText.split(' ');
          const chunkSize = 3; // 3단어씩 전송
          
          for (let i = 0; i < words.length; i += chunkSize) {
            const chunk = words.slice(i, i + chunkSize).join(' ');
            const data = {
              type: 'chunk',
              content: chunk + (i + chunkSize < words.length ? ' ' : ''),
              progress: Math.round(((i + chunkSize) / words.length) * 100)
            };
            
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
            
            // 자연스러운 타이핑 속도 (50-150ms)
            await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
          }

          // 완료 신호 및 메타데이터 전송
          const finalData = {
            type: 'complete',
            metadata: {
              model: isFromFallback ? 'Quick-Fallback' : 'GPT-OSS-20B-Optimized',
              processingTime: Date.now() - startTime,
              service: '이교장의AI상담',
              isStreaming: true,
              isFallback: isFromFallback
            },
            buttons: [
              { text: '🎯 AI 역량진단', url: '/ai-diagnosis', style: 'primary', icon: '🎯' },
              { text: '📞 상담 예약', url: '/consultation', style: 'secondary', icon: '📞' }
            ]
          };
          
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(finalData)}\n\n`));
          controller.close();
          
        } catch (error) {
          console.error('❌ 스트리밍 오류:', error);
          
          const errorData = {
            type: 'error',
            content: '일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요. 😊\n\n직접 상담: 010-9251-9743',
            metadata: { processingTime: Date.now() - startTime }
          };
          
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(errorData)}\n\n`));
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error: any) {
    console.error('❌ 스트리밍 API 오류:', error);
    return new Response('서버 오류가 발생했습니다.', { status: 500 });
  }
}

/**
 * 빠른 폴백 응답 생성
 */
function generateQuickFallback(message: string): string {
  const msg = message.toLowerCase();
  
  if (msg.includes('안녕') || msg.length < 10) {
    return '안녕하세요! 반갑습니다! 😊 저는 AICAMP 이교장입니다. 28년 경험으로 AI 도입과 디지털 전환을 도와드려요. 궁금한 것 있으시면 편하게 물어보세요!';
  }
  
  if (msg.includes('상담') || msg.includes('문의')) {
    return '네, 물론이죠! 기꺼이 도와드리겠습니다! 👍 직접 상담은 010-9251-9743으로 연락주시면 됩니다. 무료 AI 역량진단도 바로 시작하실 수 있어요!';
  }
  
  if (msg.includes('교육') || msg.includes('과정')) {
    return '교육 과정에 관심 있으시는군요! 정말 좋은 선택이에요! 🎓 실무 중심 맞춤형 교육으로 평균 생산성 40% 향상 효과가 있어요. 무료 체험부터 시작해보세요!';
  }
  
  return '좋은 질문 주셔서 감사해요! 😊 더 자세한 상담은 010-9251-9743으로 연락주시면 28년 경험의 이교장이 직접 도움드리겠습니다!';
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
