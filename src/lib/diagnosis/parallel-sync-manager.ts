/**
 * 🔥 V22.6 병렬 데이터 동기화 관리자
 * - 로컬 캐시와 GAS 데이터 간의 동기화 관리
 * - 캐시 효율성 및 성능 최적화
 * - 데이터 일관성 보장
 */

export interface SyncResult {
  success: boolean;
  data?: any;
  dataSource: string;
  cacheHit: boolean;
  syncTime: number;
  error?: string;
}

export interface CacheStatus {
  size: number;
  maxSize: number;
  efficiency: string;
  hitRate: number;
  lastSync: string;
}

export class ParallelSyncManager {
  private static instance: ParallelSyncManager;
  private cache: Map<string, any> = new Map();
  private readonly MAX_CACHE_SIZE = 1000;
  private readonly CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24시간

  private constructor() {
    // 싱글톤 패턴
  }

  public static getInstance(): ParallelSyncManager {
    if (!ParallelSyncManager.instance) {
      ParallelSyncManager.instance = new ParallelSyncManager();
    }
    return ParallelSyncManager.instance;
  }

  /**
   * 진단 데이터 동기화 (로컬 캐시 우선)
   */
  public static async syncDiagnosisData(diagnosisId: string): Promise<SyncResult> {
    const startTime = Date.now();
    const manager = ParallelSyncManager.getInstance();

    try {
      console.log('🔄 ParallelSyncManager 동기화 시작:', diagnosisId);
      
      // 1. 로컬 캐시 확인
      const cachedData = manager.getFromCache(diagnosisId);
      if (cachedData) {
        console.log('✅ 로컬 캐시에서 데이터 조회 성공');
        return {
          success: true,
          data: cachedData,
          dataSource: 'local-cache-sync',
          cacheHit: true,
          syncTime: Date.now() - startTime
        };
      }

      // 2. GAS에서 데이터 조회
      console.log('🔄 GAS에서 데이터 조회 시도');
      const gasData = await manager.fetchFromGAS(diagnosisId);
      if (gasData) {
        // 캐시에 저장
        manager.setToCache(diagnosisId, gasData);
        console.log('✅ GAS 데이터 조회 및 캐시 저장 성공');
        
        return {
          success: true,
          data: gasData,
          dataSource: 'gas-sync',
          cacheHit: false,
          syncTime: Date.now() - startTime
        };
      }

      console.log('❌ GAS에서 데이터 조회 실패');
      return {
        success: false,
        dataSource: 'none',
        cacheHit: false,
        syncTime: Date.now() - startTime,
        error: '데이터를 찾을 수 없습니다'
      };

    } catch (error: any) {
      console.error('❌ ParallelSyncManager 동기화 오류:', error);
      return {
        success: false,
        dataSource: 'error',
        cacheHit: false,
        syncTime: Date.now() - startTime,
        error: error.message || '동기화 실패'
      };
    }
  }

  /**
   * 캐시에서 데이터 조회 (안전한 방식)
   */
  private getFromCache(key: string): any {
    try {
      if (!key || typeof key !== 'string') {
        console.warn('⚠️ 유효하지 않은 캐시 키:', key);
        return null;
      }

      const cached = this.cache.get(key);
      if (!cached) return null;

      // 만료 확인
      if (Date.now() > cached.expiry) {
        console.log('🗑️ 만료된 캐시 항목 제거:', key);
        this.cache.delete(key);
        return null;
      }

      // 데이터 유효성 검증
      if (!cached.data || typeof cached.data !== 'object') {
        console.warn('⚠️ 유효하지 않은 캐시 데이터:', key);
        this.cache.delete(key);
        return null;
      }

      console.log('✅ 캐시에서 유효한 데이터 조회:', key);
      return cached.data;
    } catch (error) {
      console.error('❌ 캐시 조회 오류:', error);
      return null;
    }
  }

  /**
   * 캐시에 데이터 저장 (안전한 방식)
   */
  private setToCache(key: string, data: any): void {
    try {
      if (!key || typeof key !== 'string') {
        console.warn('⚠️ 유효하지 않은 캐시 키:', key);
        return;
      }

      if (!data || typeof data !== 'object') {
        console.warn('⚠️ 유효하지 않은 캐시 데이터:', key);
        return;
      }

      // 캐시 크기 제한 확인
      if (this.cache.size >= this.MAX_CACHE_SIZE) {
        // 가장 오래된 항목 제거
        const oldestKey = this.cache.keys().next().value;
        if (oldestKey) {
          console.log('🗑️ 캐시 용량 초과로 오래된 항목 제거:', oldestKey);
          this.cache.delete(oldestKey);
        }
      }

      this.cache.set(key, {
        data,
        expiry: Date.now() + this.CACHE_EXPIRY
      });

      console.log('✅ 캐시에 데이터 저장 성공:', key);
    } catch (error) {
      console.error('❌ 캐시 저장 오류:', error);
    }
  }

  /**
   * GAS에서 데이터 조회 (동적 import + 오류 처리 강화)
   */
  private async fetchFromGAS(diagnosisId: string): Promise<any> {
    try {
      console.log('🔄 GAS 데이터 조회 시작:', diagnosisId);
      
      const { queryDiagnosisFromGAS } = await import('@/lib/gas/gas-connector');
      const result = await queryDiagnosisFromGAS(diagnosisId);
      
      if (result.success && result.data) {
        console.log('✅ GAS 데이터 조회 성공:', diagnosisId);
        return result.data;
      } else {
        console.log('❌ GAS 데이터 조회 실패:', result.error || '데이터 없음');
        return null;
      }
    } catch (error) {
      console.error('❌ GAS 데이터 조회 오류:', error);
      return null;
    }
  }

  /**
   * 캐시 상태 조회
   */
  public static getCacheStatus(): CacheStatus {
    const manager = ParallelSyncManager.getInstance();
    const now = Date.now();
    
    // 유효한 캐시 항목만 계산
    let validCount = 0;
    let totalCount = manager.cache.size;
    
    for (const [key, value] of manager.cache.entries()) {
      if (now <= value.expiry) {
        validCount++;
      } else {
        manager.cache.delete(key);
      }
    }

    const hitRate = totalCount > 0 ? Math.round((validCount / totalCount) * 100) : 0;
    const efficiency = hitRate > 80 ? '우수' : hitRate > 60 ? '양호' : '개선 필요';

    return {
      size: validCount,
      maxSize: manager.MAX_CACHE_SIZE,
      efficiency,
      hitRate,
      lastSync: new Date().toISOString()
    };
  }

  /**
   * 캐시 정리 (만료된 항목 제거)
   */
  public static cleanupCache(): void {
    const manager = ParallelSyncManager.getInstance();
    const now = Date.now();
    
    for (const [key, value] of manager.cache.entries()) {
      if (now > value.expiry) {
        manager.cache.delete(key);
      }
    }
  }

  /**
   * 특정 진단ID 캐시 제거
   */
  public static removeFromCache(diagnosisId: string): boolean {
    const manager = ParallelSyncManager.getInstance();
    return manager.cache.delete(diagnosisId);
  }

  /**
   * 전체 캐시 초기화
   */
  public static clearCache(): void {
    const manager = ParallelSyncManager.getInstance();
    manager.cache.clear();
  }
}
