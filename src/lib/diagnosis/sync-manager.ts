/**
 * 🔄 무오류 데이터 동기화 관리자 (수정 버전)
 * 신청서 제출 → GAS 저장 → 보고서 생성 간 완벽한 동기화 보장
 * 🔧 GAS 연결 실패 시 대체 데이터 생성 기능 추가
 */

import { CacheManager } from './cache-manager';

export class SyncManager {
  private static readonly MAX_WAIT_TIME = 300000; // 5분
  private static readonly INITIAL_RETRY_DELAY = 1000; // 1초
  private static readonly MAX_RETRY_DELAY = 10000; // 10초
  private static readonly MAX_ATTEMPTS = 30;

  /**
   * 🔄 지능형 데이터 동기화 대기 시스템 (기존 메서드)
   */
  static async waitForDataAvailability(diagnosisId: string): Promise<{
    success: boolean;
    data?: any;
    attempts: number;
    totalWaitTime: number;
    error?: string;
  }> {
    console.log('🔄 지능형 동기화 시작:', diagnosisId);
    
    const startTime = Date.now();
    let attempts = 0;
    let currentDelay = this.INITIAL_RETRY_DELAY;

    while (Date.now() - startTime < this.MAX_WAIT_TIME && attempts < this.MAX_ATTEMPTS) {
      attempts++;
      
      try {
        console.log(`🔍 동기화 시도 ${attempts}/${this.MAX_ATTEMPTS} (경과: ${Math.round((Date.now() - startTime) / 1000)}초, 대기: ${currentDelay}ms)`);
        
        // GAS에서 데이터 조회
        const result = await this.queryGASData(diagnosisId);
        
        if (result.success && result.data) {
          const totalWaitTime = Date.now() - startTime;
          console.log('✅ 데이터 동기화 성공!', {
            attempts,
            totalWaitTime: `${Math.round(totalWaitTime / 1000)}초`,
            dataFreshness: result.data.timestamp
          });
          
          return {
            success: true,
            data: result.data,
            attempts,
            totalWaitTime
          };
        }
        
        // 지능형 대기 시간 계산 (점진적 증가)
        await this.delay(currentDelay);
        currentDelay = Math.min(currentDelay * 1.5, this.MAX_RETRY_DELAY);
        
      } catch (error: any) {
        console.error(`❌ 동기화 시도 ${attempts} 실패:`, error.message);
        
                 // 마지막 시도에서 실패하면 오류 반환
         if (attempts >= this.MAX_ATTEMPTS || Date.now() - startTime >= this.MAX_WAIT_TIME) {
           console.error('❌ 최대 시도 횟수 도달, 실제 데이터 조회 실패');
           break;
         }
        
        await this.delay(currentDelay);
        currentDelay = Math.min(currentDelay * 1.5, this.MAX_RETRY_DELAY);
      }
    }
    
         // 타임아웃 시 오류 반환 - 실제 데이터만 사용
     const totalWaitTime = Date.now() - startTime;
     console.error('❌ 데이터 동기화 타임아웃 - 실제 데이터 조회 실패:', {
       diagnosisId,
       attempts,
       totalWaitTime: `${Math.round(totalWaitTime / 1000)}초`
     });
     
     return {
       success: false,
       attempts,
       totalWaitTime,
       error: `실제 데이터 동기화 타임아웃 (${attempts}회 시도, ${Math.round(totalWaitTime / 1000)}초 경과)`
     };
  }

  /**
   * 🔄 V28.0 고도화된 데이터 동기화 (waitForDataSynchronization 대체)
   */
  static async waitForDataSynchronization(diagnosisId: string, maxAttempts = 30, initialDelay = 1000): Promise<{
    success: boolean;
    data?: any;
    attempts: number;
    waitTime: number;
    dataFreshness?: number;
    error?: string;
  }> {
    console.log('🚀 V28.0 고도화된 데이터 동기화 시작:', diagnosisId);
    
    const startTime = Date.now();
    let attempts = 0;
    let delay = initialDelay;

    while (attempts < maxAttempts) {
      attempts++;
      
      try {
        console.log(`🔍 동기화 시도 ${attempts}/${maxAttempts}`);
        
        const result = await this.queryGASData(diagnosisId, 10000);
        
        if (result.success && result.data) {
          const waitTime = Date.now() - startTime;
          const dataFreshness = result.data.timestamp ? new Date(result.data.timestamp).getTime() : Date.now();
          
          console.log('✅ V28.0 동기화 성공!', {
            attempts,
            waitTime: `${Math.round(waitTime / 1000)}초`,
            dataFreshness: new Date(dataFreshness).toLocaleString()
          });
          
          return {
            success: true,
            data: result.data,
            attempts,
            waitTime,
            dataFreshness
          };
        }
        
        // 대기 후 재시도
        if (attempts < maxAttempts) {
          console.log(`⏰ ${delay}ms 대기 후 재시도...`);
          await this.delay(delay);
          delay = Math.min(delay * 1.2, 5000); // 최대 5초까지 점진적 증가
        }
        
      } catch (error: any) {
        console.warn(`⚠️ 동기화 시도 ${attempts} 실패:`, error.message);
        
        if (attempts < maxAttempts) {
          await this.delay(delay);
          delay = Math.min(delay * 1.2, 5000);
        }
      }
    }
    
         // 모든 시도 실패 시 오류 반환 - 실제 데이터만 사용
     const totalWaitTime = Date.now() - startTime;
     console.error('❌ V28.0 데이터 동기화 실패 - 실제 데이터 조회 실패:', {
       diagnosisId,
       attempts,
       totalWaitTime: `${Math.round(totalWaitTime / 1000)}초`
     });
     
     return {
       success: false,
       attempts,
       waitTime: totalWaitTime,
       error: `실제 데이터 동기화 실패 (${attempts}회 시도, ${Math.round(totalWaitTime / 1000)}초 경과)`
     };
  }

  /**
   * 📡 GAS 데이터 조회 (재시도 로직 포함) - 수정 버전
   */
  private static async queryGASData(diagnosisId: string, timeout: number = 15000): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    // 캐시 확인
    const cacheKey = CacheManager.getGASDataKey(diagnosisId);
    const cachedData = CacheManager.get(cacheKey);
    
    if (cachedData) {
      console.log('📦 캐시된 데이터 사용:', diagnosisId);
      return { success: true, data: cachedData };
    }

    // 🔧 환경변수 누락 시 하드코딩된 안정적인 GAS URL 사용
    const gasUrl = process.env.NEXT_PUBLIC_GAS_URL || 
                   process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
                   'https://script.google.com/macros/s/AKfycbzO4ykDtUetroPX2TtQ1wkiOVNtd56tUZpPT4EITaLnXeMxTGdIIN8MIEMvOOy8ywTN/exec';
    
    console.log('📡 GAS URL 확인:', gasUrl ? '✅ 설정됨' : '❌ 누락');

    const payload = {
      type: 'query_diagnosis',
      action: 'queryDiagnosisById',
      diagnosisId: diagnosisId,
      timestamp: new Date().toISOString(),
      syncRequest: true // 동기화 요청임을 명시
    };

    try {
      console.log('📡 GAS 요청 전송:', { url: gasUrl, diagnosisId, payload: payload.type });
      
      const response = await fetch(gasUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(timeout)
      });
      
      console.log('📡 GAS 응답 상태:', response.status, response.statusText);

             if (!response.ok) {
         console.error('❌ GAS 응답 오류:', response.status, response.statusText);
         throw new Error(`GAS 응답 오류: ${response.status} ${response.statusText}`);
       }

      const result = await response.json();
      
      if (result.success && result.data) {
        // 캐시에 저장 (30분 TTL)
        CacheManager.set(cacheKey, result.data, 30 * 60 * 1000);
        
        console.log('✅ GAS 데이터 조회 성공:', diagnosisId);
        return { success: true, data: result.data };
             } else {
         console.warn('⚠️ GAS에서 데이터를 찾을 수 없음:', result.error || '데이터 없음');
         return { success: false, error: result.error || 'GAS 데이터 조회 실패' };
       }
      
         } catch (error: any) {
       console.error('❌ GAS 연결 실패:', error.message);
       return { success: false, error: `GAS 연결 오류: ${error.message}` };
     }
  }

  /**
   * 🔧 실제 데이터만 사용 - 대체 데이터 생성 제거
   * 사실기반 실제데이터 결과보고서 작성이 1원칙
   */

  /**
   * 🔄 동기화 상태 추적
   */
  static async trackSyncStatus(diagnosisId: string, status: string, metadata?: any): Promise<void> {
    try {
      console.log('🔄 동기화 상태 추적:', { diagnosisId, status, metadata });
      // 상태 추적 로직 (필요시 구현)
    } catch (error: any) {
      console.warn('⚠️ 동기화 상태 추적 실패:', error.message);
    }
  }

  /**
   * ⏰ 지연 함수
   */
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
