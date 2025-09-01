/**
 * 🔄 무오류 데이터 동기화 관리자
 * 신청서 제출 → GAS 저장 → 보고서 생성 간 완벽한 동기화 보장
 */

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
        
        // 지능형 대기 시간 계산 (지수 백오프 + 지터)
        const jitter = Math.random() * 500; // 랜덤 지터 추가
        currentDelay = Math.min(currentDelay * 1.5 + jitter, this.MAX_RETRY_DELAY);
        
        console.log(`⏰ ${Math.round(currentDelay / 1000)}초 후 재시도... (데이터 아직 준비 중)`);
        await this.sleep(currentDelay);
        
      } catch (error) {
        console.log(`❌ 동기화 시도 ${attempts} 실패:`, error.message);
        
        // 네트워크 오류 시 더 긴 대기
        if (error.message.includes('fetch failed') || error.message.includes('ECONNREFUSED')) {
          await this.sleep(5000);
        } else {
          await this.sleep(currentDelay);
        }
      }
    }
    
    const totalWaitTime = Date.now() - startTime;
    console.error('❌ 데이터 동기화 타임아웃:', {
      diagnosisId,
      attempts,
      totalWaitTime: `${Math.round(totalWaitTime / 1000)}초`
    });
    
    return {
      success: false,
      attempts,
      totalWaitTime,
      error: `데이터 동기화 타임아웃 (${attempts}회 시도, ${Math.round(totalWaitTime / 1000)}초 경과)`
    };
  }

  /**
   * 🔄 V28.0 호환 데이터 동기화 대기 시스템
   */
  static async waitForDataSynchronization(diagnosisId: string, maxAttempts = 30, initialDelay = 1000): Promise<{
    success: boolean;
    data?: any;
    attempts: number;
    waitTime: number;
    dataFreshness?: number;
    error?: string;
  }> {
    console.log('🔄 V28.0 데이터 동기화 시작:', diagnosisId);
    
    const startTime = Date.now();
    let attempts = 0;
    let currentDelay = initialDelay;

    while (attempts < maxAttempts) {
      attempts++;
      
      try {
        console.log(`🔍 동기화 시도 ${attempts}/${maxAttempts} (경과: ${Math.round((Date.now() - startTime) / 1000)}초, 대기: ${currentDelay}ms)`);
        
        // GAS에서 데이터 조회
        const result = await this.queryGASData(diagnosisId);
        
        if (result.success && result.data) {
          const totalWaitTime = Date.now() - startTime;
          const dataAge = this.calculateDataAge(result.data.timestamp);
          
          console.log('✅ 데이터 동기화 성공!', {
            attempts,
            totalWaitTime: `${Math.round(totalWaitTime / 1000)}초`,
            dataAge: `${dataAge}분`
          });
          
          return {
            success: true,
            data: result.data,
            attempts,
            waitTime: totalWaitTime,
            dataFreshness: dataAge
          };
        }
        
        // 지능형 대기 시간 계산 (지수 백오프 + 지터)
        const jitter = Math.random() * 500;
        currentDelay = Math.min(currentDelay * 1.5 + jitter, 10000);
        
        console.log(`⏰ ${Math.round(currentDelay / 1000)}초 후 재시도... (데이터 아직 준비 중)`);
        await this.sleep(currentDelay);
        
      } catch (error: any) {
        console.log(`❌ 동기화 시도 ${attempts} 실패:`, error.message);
        await this.sleep(currentDelay);
      }
    }
    
    const totalWaitTime = Date.now() - startTime;
    console.error('❌ 데이터 동기화 타임아웃:', {
      diagnosisId,
      attempts,
      totalWaitTime: `${Math.round(totalWaitTime / 1000)}초`
    });
    
    return {
      success: false,
      attempts,
      waitTime: totalWaitTime,
      error: `데이터 동기화 타임아웃 (${attempts}회 시도, ${Math.round(totalWaitTime / 1000)}초 경과)`
    };
  }

  /**
   * 📡 GAS 데이터 조회 (재시도 로직 포함)
   */
  private static async queryGASData(diagnosisId: string, timeout: number = 15000): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    const gasUrl = process.env.NEXT_PUBLIC_GAS_URL || 
                   'https://script.google.com/macros/s/AKfycbzO4ykDtUetroPX2TtQ1wkiOVNtd56tUZpPT4EITaLnXeMxTGdIIN8MIEMvOOy8ywTN/exec';

    const payload = {
      type: 'query_diagnosis',
      action: 'queryDiagnosisById',
      diagnosisId: diagnosisId,
      timestamp: new Date().toISOString(),
      syncRequest: true // 동기화 요청임을 명시
    };

    try {
      const response = await fetch(gasUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(timeout)
      });

      if (!response.ok) {
        throw new Error(`GAS 응답 오류: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        // 데이터 신선도 검증 (24시간 이내 데이터 허용 - 실용적 접근)
        const dataAge = Date.now() - new Date(result.data.timestamp).getTime();
        const maxAge = 24 * 60 * 60 * 1000; // 24시간
        
        if (dataAge > maxAge) {
          console.warn('⚠️ 데이터가 너무 오래됨:', {
            dataAge: `${Math.round(dataAge / (1000 * 60))}분`,
            maxAge: `${maxAge / (1000 * 60 * 60)}시간`
          });
          return { success: false, error: '데이터가 너무 오래되었습니다 (24시간 초과)' };
        }
        
        console.log('✅ 데이터 신선도 검증 통과:', {
          dataAge: `${Math.round(dataAge / (1000 * 60))}분`,
          acceptable: '24시간 이내'
        });
        
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error || '데이터 없음' };
      }
      
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * ⏰ 지능형 대기 함수
   */
  private static async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 📅 데이터 신선도 계산
   */
  private static calculateDataAge(timestamp: string): number {
    try {
      const dataTime = new Date(timestamp).getTime();
      const now = Date.now();
      const ageMinutes = Math.round((now - dataTime) / (1000 * 60));
      return ageMinutes;
    } catch (error) {
      return 0;
    }
  }

  /**
   * 📊 동기화 상태 추적
   */
  static async trackSyncStatus(diagnosisId: string, status: 'started' | 'waiting' | 'completed' | 'failed', metadata?: any): Promise<void> {
    try {
      const gasUrl = process.env.NEXT_PUBLIC_GAS_URL || 
                     'https://script.google.com/macros/s/AKfycbzO4ykDtUetroPX2TtQ1wkiOVNtd56tUZpPT4EITaLnXeMxTGdIIN8MIEMvOOy8ywTN/exec';

      const payload = {
        type: 'track_sync_status',
        action: 'updateSyncStatus',
        diagnosisId: diagnosisId,
        status: status,
        metadata: metadata,
        timestamp: new Date().toISOString()
      };

      await fetch(gasUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(5000)
      });

      console.log('📊 동기화 상태 추적:', { diagnosisId, status, metadata });
      
    } catch (error) {
      console.warn('⚠️ 동기화 상태 추적 실패:', error);
      // 추적 실패는 전체 프로세스에 영향 없음
    }
  }
}
