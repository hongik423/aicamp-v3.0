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

// 전역 인증번호 저장소 (Node.js 전역 객체 사용)
declare global {
  var authCodesStorage: Map<string, AuthCodeData> | undefined;
}

const authCodes = globalThis.authCodesStorage ?? new Map<string, AuthCodeData>();
globalThis.authCodesStorage = authCodes;

// 6자리 인증번호 생성
export function generateAuthCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 인증번호 저장
export function storeAuthCode(email: string, diagnosisId: string, code: string): void {
  const authKey = `${email}_${diagnosisId}`;
  const expiresAt = Date.now() + (10 * 60 * 1000); // 10분 후 만료

  const authData = {
    code: code,
    email: email,
    diagnosisId: diagnosisId,
    expiresAt: expiresAt,
    attempts: 0
  };

  authCodes.set(authKey, authData);

  console.log('🔑 인증번호 저장 완료:', {
    authKey: authKey,
    expiresAt: new Date(expiresAt).toISOString(),
    codeLength: code.length,
    totalStored: authCodes.size,
    storageType: 'global'
  });

  // 저장 확인
  const verification = authCodes.get(authKey);
  console.log('✅ 저장 검증:', {
    found: !!verification,
    code: verification?.code?.substring(0, 2) + '****',
    expiresAt: verification ? new Date(verification.expiresAt).toISOString() : 'N/A'
  });
}

// 인증번호 조회
export function getAuthCode(email: string, diagnosisId: string): AuthCodeData | null {
  const authKey = `${email}_${diagnosisId}`;
  const result = authCodes.get(authKey) || null;
  
  console.log('🔍 인증번호 조회 시도:', {
    authKey: authKey,
    found: !!result,
    totalStored: authCodes.size,
    allKeys: Array.from(authCodes.keys()).map(key => key.replace(/(.{10}).*(@.*)_(.{10}).*/, '$1***$2_$3***')),
    storageType: 'global'
  });
  
  if (result) {
    console.log('✅ 인증번호 조회 성공:', {
      code: result.code.substring(0, 2) + '****',
      expiresAt: new Date(result.expiresAt).toISOString(),
      attempts: result.attempts,
      isExpired: Date.now() > result.expiresAt
    });
  } else {
    console.warn('❌ 인증번호 조회 실패 - 저장된 키들과 비교:', {
      searchKey: authKey,
      availableKeys: Array.from(authCodes.keys())
    });
  }
  
  return result;
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
