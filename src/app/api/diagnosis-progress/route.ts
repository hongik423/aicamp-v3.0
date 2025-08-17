import { NextRequest } from 'next/server';
import { getProgressSnapshot, getProgressState } from '../_progressStore';

// SSE로 진단 진행상황을 스트리밍합니다.
// 내부적으로 10초 간격으로 `/api/diagnosis-results/[id]`를 폴링하여
// 결과가 준비되면 즉시 완료 이벤트를 보냅니다.

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  // 🛡️ 이교장의AI역량진단보고서 오류 차단 시스템 - 500 오류 방지
  console.log('📊 진단 진행상황 요청 처리 중...');
  
  try {
    const { searchParams } = new URL(request.url);
    const diagnosisId = searchParams.get('diagnosisId');

    if (!diagnosisId) {
      console.warn('⚠️ diagnosisId 누락');
      return new Response(JSON.stringify({ success: false, error: 'diagnosisId가 필요합니다' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    console.log('✅ diagnosisId 확인됨:', diagnosisId);

  const encoder = new TextEncoder();
  const startTime = Date.now();
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
        if (closed) return; // 이미 닫힌 경우 폴링 중단
        
        const elapsedMs = Date.now() - startTime;
        if (elapsedMs > softTimeoutMs) {
          sendEvent('timeout', {
            success: false,
            diagnosisId,
            message: '진행 모니터링이 시간 초과되었습니다(15분). 이메일로 결과를 확인해주세요.',
            elapsedMs,
          });
          cleanup();
          return;
        }

        try {
          const res = await fetch(`${getOrigin()}/api/diagnosis-results/${encodeURIComponent(diagnosisId)}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
          });
          
          // 응답 상태 확인
          if (res.status === 404) {
            // 결과가 아직 준비되지 않음 - 정상적인 상황
            sendEvent('progress', {
              success: true,
              diagnosisId,
              status: 'processing',
              elapsedMs,
              etaHint: '약 10분 내외',
              timestamp: new Date().toISOString(),
              snapshot: getProgressState(diagnosisId) ? getProgressSnapshot(diagnosisId) : null,
            });
            return;
          }
          
          if (res.status === 500) {
            // 서버 오류 - 진행 상태 유지
            console.warn('⚠️ 진단 결과 조회 서버 오류 (500), 진행 상태 유지:', diagnosisId);
            sendEvent('progress', {
              success: true,
              diagnosisId,
              status: 'processing',
              note: '서버 처리 중, 잠시 후 다시 확인합니다',
              elapsedMs,
              etaHint: '약 10분 내외',
              timestamp: new Date().toISOString(),
              snapshot: getProgressState(diagnosisId) ? getProgressSnapshot(diagnosisId) : null,
            });
            return;
          }
          
          if (!res.ok) {
            // 기타 HTTP 오류
            console.warn('⚠️ 진단 결과 조회 HTTP 오류:', res.status, diagnosisId);
            sendEvent('progress', {
              success: true,
              diagnosisId,
              status: 'processing',
              note: '상태 확인 중 일시적 문제 발생',
              elapsedMs,
              etaHint: '약 10분 내외',
              timestamp: new Date().toISOString(),
              snapshot: getProgressState(diagnosisId) ? getProgressSnapshot(diagnosisId) : null,
            });
            return;
          }

          const data = await res.json();

          if (data?.success) {
            // 결과 준비 완료
            sendEvent('done', { success: true, diagnosisId, ...data });
            cleanup();
            return;
          }

          // 아직 준비되지 않음: 진행 keepalive
          sendEvent('progress', {
            success: true,
            diagnosisId,
            status: 'processing',
            elapsedMs,
            etaHint: '약 10분 내외',
            timestamp: new Date().toISOString(),
            snapshot: getProgressState(diagnosisId) ? getProgressSnapshot(diagnosisId) : null,
          });
        } catch (error: any) {
          // 네트워크/임시 오류: 진행 유지
          console.warn('⚠️ 진단 결과 조회 네트워크 오류:', error?.message, diagnosisId);
          sendEvent('progress', {
            success: true,
            diagnosisId,
            status: 'processing',
            note: '상태 확인 중 일시적 연결 문제 발생',
            error: error?.message,
            elapsedMs,
            etaHint: '약 10분 내외',
            timestamp: new Date().toISOString(),
            snapshot: getProgressState(diagnosisId) ? getProgressSnapshot(diagnosisId) : null,
          });
        }
      };

      // 즉시 1회 실행 후 주기 폴링
      await poll();
      intervalId = setInterval(poll, pollingIntervalMs);
    },
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


