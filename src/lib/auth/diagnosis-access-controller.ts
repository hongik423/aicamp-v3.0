/**
 * 진단 결과 접근 권한 통합 컨트롤러
 * 모든 진단 결과 페이지에서 사용할 표준 접근 권한 프로세스
 */

export interface DiagnosisAccessResult {
  isAuthorized: boolean;
  error?: string;
  redirectUrl?: string;
  authMethod?: 'session' | 'diagnosis-id' | 'email-auth';
  remainingTime?: number;
}

export interface DiagnosisAccessOptions {
  diagnosisId: string;
  skipRedirect?: boolean;
  authToken?: string;
  authMethod?: string;
}

export class DiagnosisAccessController {
  private static readonly SESSION_AUTH_PREFIX = 'diagnosis_auth_';
  private static readonly SESSION_TIME_PREFIX = 'diagnosis_auth_time_';
  private static readonly SESSION_DURATION = 30 * 60 * 1000; // 30분
  
  /**
   * 표준 접근 권한 검증 프로세스
   * 1. 진단ID 형식 검증
   * 2. 세션 인증 확인 (30분 유효)
   * 3. 이메일 인증 토큰 확인
   * 4. 진단ID 서버 검증
   */
  static async verifyAccess(options: DiagnosisAccessOptions): Promise<DiagnosisAccessResult> {
    const { diagnosisId, skipRedirect = false, authToken, authMethod } = options;
    
    console.log('🛡️ 필수 접근 권한 검증 시작 (치명적 오류 수정):', diagnosisId);
    
    // 🚨 치명적 오류 수정: 접근 권한 확인 없이 바로 진행 차단
    if (!diagnosisId || typeof diagnosisId !== 'string') {
      console.error('❌ 진단ID가 유효하지 않음 - 접근 차단');
      return {
        isAuthorized: false,
        error: '유효한 진단ID가 필요합니다.'
      };
    }
    
    // 1단계: 진단ID 형식 검증 (필수)
    const formatValidation = this.validateDiagnosisIdFormat(diagnosisId);
    if (!formatValidation.isValid) {
      console.error('❌ 진단ID 형식 검증 실패 - 접근 차단:', formatValidation.error);
      return {
        isAuthorized: false,
        error: formatValidation.error
      };
    }
    
    // 2단계: 세션 인증 확인 (30분 유효)
    const sessionAuth = this.checkSessionAuth(diagnosisId);
    if (sessionAuth.isValid) {
      console.log('✅ 세션 인증 확인됨:', diagnosisId);
      return {
        isAuthorized: true,
        authMethod: 'session',
        remainingTime: sessionAuth.remainingTime
      };
    }
    
    // 3단계: 이메일 인증 토큰 확인
    if (authMethod === 'email' && authToken) {
      const tokenAuth = this.verifyEmailAuthToken(authToken, diagnosisId);
      if (tokenAuth.isValid) {
        console.log('✅ 이메일 인증 토큰 확인됨:', diagnosisId);
        // 세션에 인증 상태 저장
        this.saveSessionAuth(diagnosisId);
        return {
          isAuthorized: true,
          authMethod: 'email-auth'
        };
      }
    }
    
    // 4단계: 진단ID 서버 검증
    try {
      const serverAuth = await this.verifyDiagnosisIdOnServer(diagnosisId);
      if (serverAuth.isValid) {
        console.log('✅ 서버 진단ID 검증 완료:', diagnosisId);
        // 세션에 인증 상태 저장
        this.saveSessionAuth(diagnosisId);
        return {
          isAuthorized: true,
          authMethod: 'diagnosis-id'
        };
      }
    } catch (error: any) {
      console.error('❌ 서버 검증 실패:', error);
    }
    
    // 5단계: 모든 검증 실패 시 리디렉션
    if (!skipRedirect) {
      const redirectUrl = `/report-access?target=${encodeURIComponent(diagnosisId)}`;
      return {
        isAuthorized: false,
        error: '접근 권한이 필요합니다. 진단ID 또는 이메일 인증을 완료해주세요.',
        redirectUrl
      };
    }
    
    return {
      isAuthorized: false,
      error: '진단 결과에 접근할 권한이 없습니다.'
    };
  }
  
  /**
   * 진단ID 형식 검증
   */
  private static validateDiagnosisIdFormat(diagnosisId: string): { isValid: boolean; error?: string } {
    if (!diagnosisId) {
      return { isValid: false, error: '진단ID가 제공되지 않았습니다.' };
    }
    
    if (diagnosisId.length < 10) {
      return { isValid: false, error: '진단ID가 너무 짧습니다.' };
    }
    
    if (!diagnosisId.startsWith('DIAG_')) {
      return { isValid: false, error: '유효하지 않은 진단ID 형식입니다. DIAG_로 시작해야 합니다.' };
    }
    
    return { isValid: true };
  }
  
  /**
   * 세션 인증 확인 (30분 유효)
   */
  private static checkSessionAuth(diagnosisId: string): { isValid: boolean; remainingTime?: number } {
    if (typeof window === 'undefined') return { isValid: false };
    
    const sessionAuth = sessionStorage.getItem(`diagnosis_auth_${diagnosisId}`);
    const authTime = sessionStorage.getItem(`diagnosis_auth_time_${diagnosisId}`);
    
    if (sessionAuth === 'true' && authTime) {
      const authTimestamp = parseInt(authTime);
      const currentTime = Date.now();
      const authDuration = 30 * 60 * 1000; // 30분
      const remainingTime = authDuration - (currentTime - authTimestamp);
      
      if (remainingTime > 0) {
        return { isValid: true, remainingTime };
      } else {
        // 인증 시간 만료 - 세션 정리
        console.log('⚠️ 세션 인증 시간 만료:', diagnosisId);
        sessionStorage.removeItem(`diagnosis_auth_${diagnosisId}`);
        sessionStorage.removeItem(`diagnosis_auth_time_${diagnosisId}`);
      }
    }
    
    return { isValid: false };
  }
  
  /**
   * 이메일 인증 토큰 검증
   */
  private static verifyEmailAuthToken(authToken: string, diagnosisId: string): { isValid: boolean; error?: string } {
    try {
      const tokenData = JSON.parse(Buffer.from(authToken, 'base64').toString());
      
      if (tokenData.diagnosisId === diagnosisId && 
          tokenData.expiresAt > Date.now() && 
          tokenData.email) {
        return { isValid: true };
      } else {
        return { isValid: false, error: '인증 토큰이 만료되었거나 유효하지 않습니다.' };
      }
    } catch (error) {
      console.error('❌ 이메일 인증 토큰 검증 실패:', error);
      return { isValid: false, error: '인증 토큰 형식이 올바르지 않습니다.' };
    }
  }
  
  /**
   * 서버에서 진단ID 검증
   */
  private static async verifyDiagnosisIdOnServer(diagnosisId: string): Promise<{ isValid: boolean; error?: string }> {
    const response = await fetch('/api/diagnosis-auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        diagnosisId: diagnosisId,
        accessType: 'user'
      })
    });
    
    if (!response.ok) {
      throw new Error(`서버 검증 실패: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    
    if (result.success) {
      return { isValid: true };
    } else {
      return { isValid: false, error: result.error || '진단ID 검증에 실패했습니다.' };
    }
  }
  
  /**
   * 세션에 인증 상태 저장 (30분 유효)
   */
  private static saveSessionAuth(diagnosisId: string): void {
    if (typeof window === 'undefined') return;
    
    sessionStorage.setItem(`diagnosis_auth_${diagnosisId}`, 'true');
    sessionStorage.setItem(`diagnosis_auth_time_${diagnosisId}`, Date.now().toString());
    
    console.log('💾 세션 인증 상태 저장됨:', diagnosisId);
  }
  
  /**
   * 세션 인증 상태 제거
   */
  static clearSessionAuth(diagnosisId: string): void {
    if (typeof window === 'undefined') return;
    
    sessionStorage.removeItem(`diagnosis_auth_${diagnosisId}`);
    sessionStorage.removeItem(`diagnosis_auth_time_${diagnosisId}`);
    
    console.log('🗑️ 세션 인증 상태 제거됨:', diagnosisId);
  }
  
  /**
   * 최근 조회한 진단ID 저장 (보안 강화)
   * 세션 기반 인증과 함께 저장하여 무단 접근 방지
   */
  static saveRecentDiagnosisId(diagnosisId: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      // 현재 세션에서 인증된 진단ID인지 확인
      const authKey = `${this.SESSION_AUTH_PREFIX}${diagnosisId}`;
      const authTime = `${this.SESSION_TIME_PREFIX}${diagnosisId}`;
      const isAuthenticated = sessionStorage.getItem(authKey) === 'authorized';
      const authTimestamp = sessionStorage.getItem(authTime);
      
      if (!isAuthenticated || !authTimestamp) {
        console.warn('⚠️ 인증되지 않은 진단ID 저장 시도 차단:', diagnosisId);
        return;
      }
      
      // 인증 시간 확인 (30분 이내)
      const authTime_ms = parseInt(authTimestamp);
      const isAuthValid = Date.now() - authTime_ms < this.SESSION_DURATION;
      
      if (!isAuthValid) {
        console.warn('⚠️ 인증 만료된 진단ID 저장 시도 차단:', diagnosisId);
        // 만료된 인증 정보 삭제
        sessionStorage.removeItem(authKey);
        sessionStorage.removeItem(authTime);
        return;
      }
      
      // 보안 검증 통과 후 저장
      const recent = JSON.parse(localStorage.getItem('aicamp_recent_diagnosis_ids') || '[]');
      const updated = [diagnosisId, ...recent.filter((id: string) => id !== diagnosisId)].slice(0, 5);
      
      // 인증된 진단ID만 필터링
      const authenticatedIds = updated.filter((id: string) => {
        const idAuthKey = `${this.SESSION_AUTH_PREFIX}${id}`;
        const idAuthTime = `${this.SESSION_TIME_PREFIX}${id}`;
        const idAuth = sessionStorage.getItem(idAuthKey);
        const idTime = sessionStorage.getItem(idAuthTime);
        
        if (idAuth !== 'authorized' || !idTime) return false;
        
        const idAuthTime_ms = parseInt(idTime);
        return Date.now() - idAuthTime_ms < this.SESSION_DURATION;
      });
      
      localStorage.setItem('aicamp_recent_diagnosis_ids', JSON.stringify(authenticatedIds));
      console.log('💾 인증된 최근 진단ID 저장 완료:', diagnosisId, `(총 ${authenticatedIds.length}개)`);
    } catch (error) {
      console.error('❌ 최근 조회 ID 저장 실패:', error);
    }
  }
}
