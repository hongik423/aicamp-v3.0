/**
 * 진단 결과 접근 권한 통합 컨트롤러
 * 🔓 권한 완화: 진단ID만 일치하면 누구든지 접근 가능
 */

export interface DiagnosisAccessResult {
  isAuthorized: boolean;
  error?: string;
  redirectUrl?: string;
  authMethod?: 'diagnosis-id-only';
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
   * 🔓 권한 완화된 접근 권한 검증 프로세스
   * 진단ID만 일치하면 누구든지 접근 가능
   * 1. 진단ID 형식 검증 (기본적인 형식만 확인)
   * 2. 즉시 접근 허용 (추가 인증 불필요)
   */
  static async verifyAccess(options: DiagnosisAccessOptions): Promise<DiagnosisAccessResult> {
    const { diagnosisId, skipRedirect = false } = options;
    
    console.log('🔓 권한 완화된 접근 권한 검증 시작:', diagnosisId);
    
    // 기본 진단ID 유효성 검사
    if (!diagnosisId || typeof diagnosisId !== 'string') {
      console.error('❌ 진단ID가 유효하지 않음 - 접근 차단');
      return {
        isAuthorized: false,
        error: '유효한 진단ID가 필요합니다.'
      };
    }
    
    // 🔓 권한 완화: 진단ID 형식만 기본적으로 검증
    const formatValidation = this.validateDiagnosisIdFormat(diagnosisId);
    if (!formatValidation.isValid) {
      console.error('❌ 진단ID 형식 검증 실패 - 접근 차단:', formatValidation.error);
      return {
        isAuthorized: false,
        error: formatValidation.error
      };
    }
    
    // 🔓 권한 완화: 진단ID만 일치하면 즉시 접근 허용
    console.log('✅ 진단ID 검증 완료 - 접근 허용:', diagnosisId);
    
    // 세션에 접근 상태 저장 (선택사항)
    this.saveSessionAuth(diagnosisId);
    
    return {
      isAuthorized: true,
      authMethod: 'diagnosis-id-only',
      remainingTime: this.SESSION_DURATION
    };
  }
  
  /**
   * 🔓 권한 완화된 진단ID 형식 검증
   * 기본적인 형식만 확인 (너무 엄격하지 않음)
   */
  private static validateDiagnosisIdFormat(diagnosisId: string): { isValid: boolean; error?: string } {
    if (!diagnosisId) {
      return { isValid: false, error: '진단ID가 제공되지 않았습니다.' };
    }
    
    // 🔓 권한 완화: 최소 길이 요구사항 완화
    if (diagnosisId.length < 5) {
      return { isValid: false, error: '진단ID가 너무 짧습니다.' };
    }
    
    // 🔓 권한 완화: DIAG_ 접두사 요구사항 완화 (선택사항)
    if (!diagnosisId.startsWith('DIAG_')) {
      console.warn('⚠️ DIAG_ 접두사가 없는 진단ID 형식:', diagnosisId);
      // 경고만 하고 계속 진행 (접근 차단하지 않음)
    }
    
    return { isValid: true };
  }
  
  /**
   * 세션 인증 확인 (30분 유효) - 선택사항
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
   * 🔓 권한 완화: 이메일 인증 토큰 검증 - 선택사항
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
   * 🔓 권한 완화: 서버에서 진단ID 검증 - 선택사항
   */
  private static async verifyDiagnosisIdOnServer(diagnosisId: string): Promise<{ isValid: boolean; error?: string }> {
    try {
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
    } catch (error) {
      console.warn('⚠️ 서버 검증 실패 - 권한 완화로 인해 계속 진행:', error);
      // 🔓 권한 완화: 서버 검증 실패해도 접근 허용
      return { isValid: true };
    }
  }
  
  /**
   * 세션에 인증 상태 저장 (30분 유효) - 선택사항
   */
  private static saveSessionAuth(diagnosisId: string): void {
    if (typeof window === 'undefined') return;
    
    sessionStorage.setItem(`diagnosis_auth_${diagnosisId}`, 'true');
    sessionStorage.setItem(`diagnosis_auth_time_${diagnosisId}`, Date.now().toString());
    
    console.log('💾 세션 접근 상태 저장됨:', diagnosisId);
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
   * 최근 조회한 진단ID 저장 - 자유롭게 저장 허용
   * 🔓 권한 완화: 인증 확인 없이 자유롭게 저장
   */
  static saveRecentDiagnosisId(diagnosisId: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      console.log('💾 진단ID 저장:', diagnosisId);
      
      // 🔓 권한 완화: 인증 확인 없이 바로 저장 허용
      const recent = JSON.parse(localStorage.getItem('aicamp_recent_diagnosis_ids') || '[]');
      const updated = [diagnosisId, ...recent.filter((id: string) => id !== diagnosisId)].slice(0, 5);
      
      localStorage.setItem('aicamp_recent_diagnosis_ids', JSON.stringify(updated));
      console.log('✅ 진단ID 저장 완료:', diagnosisId);
    } catch (error) {
      console.error('❌ 최근 조회 ID 저장 실패:', error);
    }
  }
}
