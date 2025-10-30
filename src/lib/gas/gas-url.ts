/**
 * @fileoverview GAS URL 일원화 유틸
 * @encoding UTF-8
 */

import { getGasUrl as getFromEnv } from '@/lib/config/env';

/**
 * 환경변수 우선의 GAS URL 조회. 필요 시 안전한 기본값을 제공하지 않고 undefined를 유지해
 * 상위 계층에서 프록시(/api/google-script-proxy)를 사용하도록 유도합니다.
 */
export function getGasUrl(): string | undefined {
  const url = getFromEnv();
  return url || undefined;
}


