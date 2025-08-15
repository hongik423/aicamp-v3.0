import { NextRequest } from 'next/server';
import { getProgressSnapshot } from '../_progressStore';

// SSE로 진단 진행상황을 스트리밍합니다.
// 내부적으로 10초 간격으로 `/api/diagnosis-results/[id]`를 폴링하여
// 결과가 준비되면 즉시 완료 이벤트를 보냅니다.

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const diagnosisId = searchParams.get('diagnosisId');

  if (!diagnosisId) {
    return new Response(JSON.stringify({ success: false, error: 'diagnosisId가 필요합니다' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const encoder = new TextEncoder();
  const startTime = Date.now();
  const pollingIntervalMs = 10_000; // 10초
  const softTimeoutMs = 15 * 60 * 1000; // 15분

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const sendEvent = (event: string, data: unknown) => {
        const payload = `event: ${event}\n` + `data: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(encoder.encode(payload));
      };

      // 초기 이벤트
      sendEvent('started', {
        success: true,
        diagnosisId,
        message: 'SSE 연결 성공: 진행상태를 모니터링합니다',
        timestamp: new Date().toISOString(),
        snapshot: getProgressSnapshot(diagnosisId) || null,
      });

      let intervalId: NodeJS.Timeout | null = null;
      let closed = false;

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
          const data = await res.json();

          if (res.ok && data?.success) {
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
            snapshot: getProgressSnapshot(diagnosisId) || null,
          });
        } catch (error: any) {
          // 네트워크/임시 오류: 진행 유지
          sendEvent('progress', {
            success: true,
            diagnosisId,
            status: 'processing',
            note: '상태 확인 중 일시적 연결 문제 발생',
            error: error?.message,
            snapshot: getProgressSnapshot(diagnosisId) || null,
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
      'Expires': '0'
    },
  });
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


