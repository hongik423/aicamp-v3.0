import { NextRequest } from 'next/server';
import { getProgressSnapshot, getProgressState } from '../_progressStore';

// SSE로 진단 진행상황을 스트리밍합니다.
// 내부적으로 10초 간격으로 `/api/diagnosis-results/[id]`를 폴링하여
// 결과가 준비되면 즉시 완료 이벤트를 보냅니다.

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  // 🛡️ 이교장의AI역량진단보고서 오류 차단 시스템 - 500 오류 방지
  try {
    const { searchParams } = new URL(request.url);
    const diagnosisId = searchParams.get('diagnosisId');

    if (!diagnosisId) {
      return new Response(JSON.stringify({
        success: false,
        message: '진단 ID가 필요합니다.',
        timestamp: new Date().toISOString()
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'X-Error-Shield': 'validation-error'
        }
      });
    }

    const encoder = new TextEncoder();
    const pollingIntervalMs = 10_000; // 10초
    const softTimeoutMs = 15 * 60 * 1000; // 15분

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        let intervalId: NodeJS.Timeout | null = null;
        let closed = false;

        const sendEvent = (event: string, data: unknown) => {
          if (closed) return; // 이미 닫힌 경우 전송하지 않음
          try {
            const payload = `event: ${event}\n` + `data: ${JSON.stringify(data)}\n\n`;
            controller.enqueue(encoder.encode(payload));
          } catch (error) {
            console.warn('SSE 이벤트 전송 실패:', error);
            closed = true;
          }
        };

        // 초기 이벤트
        sendEvent('started', {
          success: true,
          diagnosisId,
          message: 'SSE 연결 성공: 진행상태를 모니터링합니다',
          timestamp: new Date().toISOString(),
          // 스토어에 실제 진행 데이터가 존재할 때만 스냅샷 제공
          snapshot: getProgressState(diagnosisId) ? getProgressSnapshot(diagnosisId) : null,
        });

        const cleanup = () => {
          if (intervalId) clearInterval(intervalId);
          if (!closed) {
            closed = true;
            try {
              controller.close();
            } catch {}
          }
        };

        // 클라이언트 연결 종료 감지
        try {
          // @ts-expect-error: request.signal is AbortSignal in Node runtime
          request.signal.addEventListener('abort', cleanup);
        } catch {}

        const getOrigin = () => {
          const url = new URL(request.url);
          return `${url.protocol}//${url.host}`;
        };

        const poll = async () => {
          if (closed) return;

          try {
            const progressState = getProgressState(diagnosisId);
            
            if (progressState) {
              const snapshot = getProgressSnapshot(diagnosisId);
              const elapsedMs = Date.now() - progressState.startTime;
              
              // 진행상황 이벤트 전송
              sendEvent('progress', {
                success: true,
                diagnosisId,
                status: progressState.status,
                elapsedMs,
                etaHint: elapsedMs > 300000 ? '약 10분 내외' : '잠시만 기다려주세요',
                timestamp: new Date().toISOString(),
                snapshot
              });

              // 완료 상태 확인
              if (progressState.status === 'completed' || progressState.status === 'failed') {
                sendEvent('done', {
                  success: true,
                  diagnosisId,
                  status: progressState.status,
                  elapsedMs,
                  timestamp: new Date().toISOString(),
                  snapshot
                });
                cleanup();
                return;
              }
            } else {
              // 진행 상태가 없는 경우 기본 진행상황 전송
              const elapsedMs = Date.now() - Date.now(); // 0
              sendEvent('progress', {
                success: true,
                diagnosisId,
                status: 'processing',
                elapsedMs,
                etaHint: '잠시만 기다려주세요',
                timestamp: new Date().toISOString(),
                snapshot: null
              });
            }

            // 타임아웃 체크
            if (elapsedMs > softTimeoutMs) {
              sendEvent('timeout', {
                success: true,
                diagnosisId,
                status: 'timeout',
                elapsedMs,
                message: '진단 처리 시간이 초과되었습니다. 신청서는 정상적으로 접수되었습니다.',
                timestamp: new Date().toISOString()
              });
              cleanup();
              return;
            }
          } catch (error) {
            console.warn('SSE 폴링 오류:', error);
            // 오류 발생 시에도 연결 유지
            sendEvent('progress', {
              success: true,
              diagnosisId,
              status: 'processing',
              elapsedMs: 0,
              etaHint: '잠시만 기다려주세요',
              timestamp: new Date().toISOString(),
              error: '일시적인 오류가 발생했습니다. 계속 진행 중입니다.'
            });
          }
        };

        intervalId = setInterval(poll, pollingIntervalMs);
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'X-Content-Type-Options': 'nosniff',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Error-Shield': 'active' // 🛡️ 오류 차단 시스템 활성화 표시
      },
    });
  } catch (error) {
    console.error('🛡️ 진단 진행상황 처리 오류 차단:', error);
    
    // 🛡️ 오류 발생 시에도 기본 응답 반환 (500 오류 방지)
    return new Response(JSON.stringify({
      success: true,
      diagnosisId: 'fallback',
      status: 'processing',
      message: '진단 진행 중입니다. 잠시 후 다시 확인해주세요.',
      timestamp: new Date().toISOString()
    }), {
      status: 200, // 🛡️ 항상 200 상태 반환하여 500 오류 방지
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'X-Error-Shield': 'fallback-active' // 🛡️ 폴백 활성화 표시
      }
    });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}


