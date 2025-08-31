/**
 * 이메일 인증번호 저장소
 * API 라우트 간 공유를 위한 전역 저장소
 */

interface AuthCodeData {
  code: string;
  email: string;
  diagnosisId: string;
  expiresAt: number;
  attempts: number;
}

// 전역 인증번호 저장소
const authCodes = new Map<string, AuthCodeData>();

// 6자리 인증번호 생성
export function generateAuthCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 인증번호 저장
export function storeAuthCode(email: string, diagnosisId: string, code: string): void {
  const authKey = `${email}_${diagnosisId}`;
  const expiresAt = Date.now() + (10 * 60 * 1000); // 10분 후 만료

  authCodes.set(authKey, {
    code: code,
    email: email,
    diagnosisId: diagnosisId,
    expiresAt: expiresAt,
    attempts: 0
  });

  console.log('🔑 인증번호 저장 완료:', {
    authKey: authKey,
    expiresAt: new Date(expiresAt).toISOString(),
    codeLength: code.length
  });
}

// 인증번호 조회
export function getAuthCode(email: string, diagnosisId: string): AuthCodeData | null {
  const authKey = `${email}_${diagnosisId}`;
  return authCodes.get(authKey) || null;
}

// 인증번호 삭제
export function deleteAuthCode(email: string, diagnosisId: string): void {
  const authKey = `${email}_${diagnosisId}`;
  authCodes.delete(authKey);
  console.log('🗑️ 인증번호 삭제:', authKey);
}

// 시도 횟수 증가
export function incrementAttempts(email: string, diagnosisId: string): number {
  const authKey = `${email}_${diagnosisId}`;
  const stored = authCodes.get(authKey);
  
  if (stored) {
    stored.attempts++;
    authCodes.set(authKey, stored);
    return stored.attempts;
  }
  
  return 0;
}

// 만료된 코드 정리
export function cleanupExpiredCodes(): void {
  const now = Date.now();
  let cleanedCount = 0;
  
  for (const [key, data] of authCodes.entries()) {
    if (data.expiresAt < now) {
      authCodes.delete(key);
      cleanedCount++;
    }
  }
  
  if (cleanedCount > 0) {
    console.log(`🧹 만료된 인증번호 ${cleanedCount}개 정리 완료`);
  }
}

// 활성 인증번호 통계
export function getAuthCodeStats() {
  const now = Date.now();
  const active = Array.from(authCodes.values()).filter(data => data.expiresAt > now);
  
  return {
    total: authCodes.size,
    active: active.length,
    expired: authCodes.size - active.length
  };
}

// 정기 정리 작업 (서버 환경에서만)
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupExpiredCodes, 60000); // 1분마다 정리
}
