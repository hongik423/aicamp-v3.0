/**
 * @fileoverview 알림(이메일) 공용 래퍼
 * @encoding UTF-8
 */

import { getGasUrl } from '@/lib/config/env';

export interface EmailPayload {
  to: string;
  type: 'test' | 'diagnosis_report' | 'diagnosis_confirmation' | 'admin_notification' | string;
  subject?: string;
  data?: any;
}

/**
 * 이메일 발송 (우선순위: GAS → 로컬 API 폴백)
 */
export async function sendEmailUnified(payload: EmailPayload): Promise<{ success: boolean; message?: string; error?: string }> {
  // 1) GAS로 직접 시도
  try {
    const gasUrl = getGasUrl();
    if (gasUrl) {
      const res = await fetch(gasUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'send_email',
          action: payload.type,
          to: payload.to,
          subject: payload.subject,
          data: payload.data,
          timestamp: new Date().toISOString()
        }),
        signal: AbortSignal.timeout(15000)
      });
      if (res.ok) {
        const result = await res.json().catch(() => ({}));
        if (result?.success !== false) return { success: true, message: 'GAS 이메일 발송 성공' };
      }
    }
  } catch (_) {
    // noop → 폴백 시도
  }

  // 2) 로컬 API 폴백(/api/send-email)
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: payload.to,
        type: payload.type,
        subject: payload.subject,
        data: payload.data
      }),
      signal: AbortSignal.timeout(10000)
    });
    if (res.ok) {
      const result = await res.json().catch(() => ({}));
      if (result?.success !== false) return { success: true, message: '로컬 API 이메일 발송 성공' };
      return { success: false, error: result?.error || '이메일 발송 실패' };
    }
    return { success: false, error: `이메일 API 오류: ${res.status}` };
  } catch (e: any) {
    return { success: false, error: e?.message || '이메일 발송 중 오류' };
  }
}


