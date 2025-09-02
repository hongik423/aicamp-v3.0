/**
 * 🚀 고성능 캐싱 시스템
 * 보고서 생성 성능 최적화
 */

interface CacheEntry {
  data: any;
  timestamp: number;
  ttl: number;
}

export class CacheManager {
  private static cache = new Map<string, CacheEntry>();
  private static readonly DEFAULT_TTL = 30 * 60 * 1000; // 30분

  /**
   * 캐시에서 데이터 조회
   */
  static get(key: string): any | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }
    
    // TTL 만료 확인
    if (Date.now() > entry.timestamp + entry.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    console.log('📦 캐시 히트:', key);
    return entry.data;
  }

  /**
   * 캐시에 데이터 저장
   */
  static set(key: string, data: any, ttl: number = this.DEFAULT_TTL): void {
    const entry: CacheEntry = {
      data,
      timestamp: Date.now(),
      ttl
    };
    
    this.cache.set(key, entry);
    console.log('💾 캐시 저장:', key, `TTL: ${ttl/1000}초`);
  }

  /**
   * 캐시 무효화
   */
  static invalidate(key: string): void {
    this.cache.delete(key);
    console.log('🗑️ 캐시 무효화:', key);
  }

  /**
   * 전체 캐시 정리
   */
  static clear(): void {
    this.cache.clear();
    console.log('🧹 전체 캐시 정리 완료');
  }

  /**
   * 만료된 캐시 엔트리 정리
   */
  static cleanup(): void {
    const now = Date.now();
    let cleaned = 0;
    
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.timestamp + entry.ttl) {
        this.cache.delete(key);
        cleaned++;
      }
    }
    
    console.log(`🧹 만료된 캐시 ${cleaned}개 정리 완료`);
  }

  /**
   * 진단 보고서 캐시 키 생성
   */
  static getDiagnosisReportKey(diagnosisId: string): string {
    return `diagnosis_report_${diagnosisId}`;
  }

  /**
   * GAS 데이터 캐시 키 생성
   */
  static getGASDataKey(diagnosisId: string): string {
    return `gas_data_${diagnosisId}`;
  }
}
