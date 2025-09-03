/**
 * 🔥 V22.6 병렬 데이터 동기화 관리자
 * - 로컬 캐시 + GAS 데이터 동기화
 * - 데이터 일관성 보장
 * - 스마트 캐시 관리
 * - 장애 복구 시스템
 */

export interface SyncResult {
  success: boolean;
  data?: any;
  dataSource: string;
  syncTime: number;
  cacheHit: boolean;
  attempts?: number;
  error?: string;
}

export interface CacheEntry {
  data: any;
  timestamp: number;
  diagnosisId: string;
  dataSource: string;
  version: string;
  expiry: number;
}

export class ParallelSyncManager {
  private static readonly CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24시간
  private static readonly MAX_CACHE_SIZE = 1000; // 최대 1000개 항목
  private static readonly RETRY_DELAY = 1000; // 1초
  private static readonly MAX_RETRY_ATTEMPTS = 3;

  /**
   * 🔥 병렬 데이터 동기화 메인 함수
   */
  static async syncDiagnosisData(diagnosisId: string): Promise<SyncResult> {
    const syncStartTime = Date.now();
    console.log('🔄 V22.6 병렬 데이터 동기화 시작:', diagnosisId);

    try {
      // 1단계: 로컬 캐시 우선 확인
      const cacheResult = await this.checkLocalCache(diagnosisId);
      if (cacheResult.success) {
        const syncTime = Date.now() - syncStartTime;
        console.log(`⚡ 로컬 캐시 히트 - 즉시 응답 (${syncTime}ms)`);
        return {
          ...cacheResult,
          syncTime,
          cacheHit: true
        };
      }

      // 2단계: GAS 실시간 조회 (스마트 재시도)
      const gasResult = await this.queryFromGASWithRetry(diagnosisId);
      
      if (gasResult.success && gasResult.data) {
        // GAS 조회 성공 시 로컬 캐시에 백업 저장
        await this.updateLocalCache(diagnosisId, gasResult.data, 'gas-backup');
        
        const syncTime = Date.now() - syncStartTime;
        console.log(`✅ GAS 조회 성공 및 캐시 백업 완료 (${syncTime}ms)`);
        
        return {
          success: true,
          data: gasResult.data,
          dataSource: gasResult.dataSource,
          syncTime,
          cacheHit: false,
          attempts: gasResult.attempts
        };
      }

      // 3단계: 모든 소스 실패
      const syncTime = Date.now() - syncStartTime;
      console.error('❌ 모든 데이터 소스 조회 실패');
      
      return {
        success: false,
        dataSource: 'none',
        syncTime,
        cacheHit: false,
        error: '모든 데이터 소스에서 조회 실패'
      };

    } catch (error: any) {
      const syncTime = Date.now() - syncStartTime;
      console.error('❌ 병렬 동기화 시스템 오류:', error);
      
      return {
        success: false,
        dataSource: 'error',
        syncTime,
        cacheHit: false,
        error: error.message
      };
    }
  }

  /**
   * 로컬 캐시 확인 및 조회
   */
  private static async checkLocalCache(diagnosisId: string): Promise<SyncResult> {
    try {
      if (typeof global === 'undefined' || !global.localDiagnosisCache) {
        return { success: false, dataSource: 'cache-unavailable', syncTime: 0, cacheHit: false };
      }

      // 다양한 ID 형식으로 캐시 확인
      const cacheKeys = [
        diagnosisId,
        diagnosisId.startsWith('DIAG_45Q_AI_') ? diagnosisId : `DIAG_45Q_AI_${diagnosisId}`,
        diagnosisId.replace('DIAG_45Q_AI_', 'DIAG_45Q_'),
        diagnosisId.replace('DIAG_45Q_AI_', 'DIAG_AI_'),
        diagnosisId.replace('DIAG_45Q_AI_', 'DIAG_')
      ];

      for (const key of cacheKeys) {
        const cachedEntry = global.localDiagnosisCache.get(key);
        
        if (cachedEntry) {
          // 캐시 만료 확인
          const now = Date.now();
          const cacheAge = now - (cachedEntry.timestamp || 0);
          
          if (cacheAge < this.CACHE_EXPIRY) {
            console.log(`✅ 로컬 캐시 히트 (키: ${key}, 나이: ${Math.round(cacheAge/1000)}초)`);
            
            return {
              success: true,
              data: cachedEntry,
              dataSource: 'local-cache',
              syncTime: 0,
              cacheHit: true
            };
          } else {
            console.log(`⚠️ 캐시 만료됨 (키: ${key}, 나이: ${Math.round(cacheAge/1000)}초)`);
            global.localDiagnosisCache.delete(key);
          }
        }
      }

      return { success: false, dataSource: 'cache-miss', syncTime: 0, cacheHit: false };

    } catch (error: any) {
      console.warn('⚠️ 로컬 캐시 확인 중 오류:', error);
      return { success: false, dataSource: 'cache-error', syncTime: 0, cacheHit: false };
    }
  }

  /**
   * GAS 스마트 재시도 조회
   */
  private static async queryFromGASWithRetry(diagnosisId: string): Promise<{ success: boolean; data?: any; dataSource: string; attempts: number }> {
    // 동적 import로 GAS 커넥터 로드
    const { queryDiagnosisFromGAS } = await import('@/lib/gas/gas-connector');
    
    for (let attempt = 1; attempt <= this.MAX_RETRY_ATTEMPTS; attempt++) {
      try {
        if (attempt > 1) {
          console.log(`⏳ GAS 조회 재시도 ${attempt}/${this.MAX_RETRY_ATTEMPTS}:`, diagnosisId);
          await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY));
        }

        const result = await queryDiagnosisFromGAS(diagnosisId);
        
        if (result.success && result.data) {
          return {
            success: true,
            data: result.data,
            dataSource: `gas-attempt-${attempt}`,
            attempts: attempt
          };
        }

      } catch (error: any) {
        console.warn(`⚠️ GAS 조회 시도 ${attempt} 실패:`, error.message);
        
        if (attempt === this.MAX_RETRY_ATTEMPTS) {
          return {
            success: false,
            dataSource: 'gas-failed',
            attempts: attempt
          };
        }
      }
    }

    return {
      success: false,
      dataSource: 'gas-exhausted',
      attempts: this.MAX_RETRY_ATTEMPTS
    };
  }

  /**
   * 로컬 캐시 업데이트
   */
  private static async updateLocalCache(diagnosisId: string, data: any, source: string): Promise<void> {
    try {
      if (typeof global === 'undefined') {
        console.warn('⚠️ 글로벌 객체 접근 불가 - 캐시 저장 건너뜀');
        return;
      }

      // 캐시 초기화
      global.localDiagnosisCache = global.localDiagnosisCache || new Map();

      // 캐시 크기 관리 (LRU 방식)
      if (global.localDiagnosisCache.size >= this.MAX_CACHE_SIZE) {
        const oldestKey = global.localDiagnosisCache.keys().next().value;
        global.localDiagnosisCache.delete(oldestKey);
        console.log('🗑️ 캐시 크기 관리 - 가장 오래된 항목 제거:', oldestKey);
      }

      // 캐시 엔트리 생성
      const cacheEntry: CacheEntry = {
        data: {
          ...data,
          dataSource: source,
          cacheStatus: 'stored'
        },
        timestamp: Date.now(),
        diagnosisId,
        dataSource: source,
        version: 'V22.6',
        expiry: Date.now() + this.CACHE_EXPIRY
      };

      // 다중 키로 저장 (ID 형식 호환성)
      const cacheKeys = [
        diagnosisId,
        diagnosisId.startsWith('DIAG_45Q_AI_') ? diagnosisId : `DIAG_45Q_AI_${diagnosisId}`
      ];

      for (const key of cacheKeys) {
        global.localDiagnosisCache.set(key, cacheEntry.data);
      }

      console.log(`✅ 로컬 캐시 업데이트 완료 (키 수: ${cacheKeys.length})`);

    } catch (error: any) {
      console.warn('⚠️ 로컬 캐시 업데이트 실패:', error);
    }
  }

  /**
   * 캐시 상태 조회
   */
  static getCacheStatus(): { size: number; maxSize: number; efficiency: string } {
    if (typeof global === 'undefined' || !global.localDiagnosisCache) {
      return { size: 0, maxSize: this.MAX_CACHE_SIZE, efficiency: '0%' };
    }

    const size = global.localDiagnosisCache.size;
    const efficiency = size > 0 ? Math.round((size / this.MAX_CACHE_SIZE) * 100) + '%' : '0%';

    return { size, maxSize: this.MAX_CACHE_SIZE, efficiency };
  }

  /**
   * 캐시 정리 (만료된 항목 제거)
   */
  static cleanExpiredCache(): number {
    if (typeof global === 'undefined' || !global.localDiagnosisCache) {
      return 0;
    }

    const now = Date.now();
    let removedCount = 0;

    for (const [key, entry] of global.localDiagnosisCache.entries()) {
      if (entry.timestamp && (now - entry.timestamp) > this.CACHE_EXPIRY) {
        global.localDiagnosisCache.delete(key);
        removedCount++;
      }
    }

    if (removedCount > 0) {
      console.log(`🗑️ 만료된 캐시 ${removedCount}개 정리 완료`);
    }

    return removedCount;
  }
}

/**
 * 글로벌 캐시 타입 정의
 */
declare global {
  var localDiagnosisCache: Map<string, any> | undefined;
}
