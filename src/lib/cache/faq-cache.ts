/**
 * FAQ 캐시 시스템 - 이교장의AI상담 전용
 * 자주 묻는 질문 캐싱으로 응답 속도 향상
 */

export interface CachedResponse {
  question: string;
  answer: string;
  timestamp: number;
  hitCount: number;
  metadata: {
    category: string;
    confidence: number;
    processingTime: number;
  };
}

export interface CacheMetrics {
  hits: number;
  misses: number;
  totalRequests: number;
  hitRate: number;
  averageResponseTime: number;
}

class FAQCache {
  private cache: Map<string, CachedResponse> = new Map();
  private metrics: CacheMetrics = {
    hits: 0,
    misses: 0,
    totalRequests: 0,
    hitRate: 0,
    averageResponseTime: 0
  };
  private maxSize = 1000;
  private ttl = 24 * 60 * 60 * 1000; // 24시간

  /**
   * 캐시에서 응답 찾기
   */
  findCachedResponse(question: string): CachedResponse | null {
    const normalizedQuestion = this.normalizeQuestion(question);
    const cached = this.cache.get(normalizedQuestion);
    
    this.metrics.totalRequests++;
    
    if (cached && this.isValid(cached)) {
      cached.hitCount++;
      this.metrics.hits++;
      this.updateMetrics();
      return cached;
    }
    
    this.metrics.misses++;
    this.updateMetrics();
    return null;
  }

  /**
   * 응답을 캐시에 저장
   */
  cacheResponse(question: string, answer: string, metadata: any): void {
    const normalizedQuestion = this.normalizeQuestion(question);
    
    // 캐시 크기 제한 확인
    if (this.cache.size >= this.maxSize) {
      this.evictOldest();
    }
    
    const cachedResponse: CachedResponse = {
      question: normalizedQuestion,
      answer,
      timestamp: Date.now(),
      hitCount: 1,
      metadata: {
        category: metadata.category || 'general',
        confidence: metadata.confidence || 0.8,
        processingTime: metadata.processingTime || 0
      }
    };
    
    this.cache.set(normalizedQuestion, cachedResponse);
  }

  /**
   * 질문 정규화
   */
  private normalizeQuestion(question: string): string {
    return question
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s가-힣]/g, '');
  }

  /**
   * 캐시 유효성 확인
   */
  private isValid(cached: CachedResponse): boolean {
    return Date.now() - cached.timestamp < this.ttl;
  }

  /**
   * 가장 오래된 항목 제거
   */
  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();
    
    for (const [key, value] of this.cache.entries()) {
      if (value.timestamp < oldestTime) {
        oldestTime = value.timestamp;
        oldestKey = key;
      }
    }
    
    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  /**
   * 메트릭 업데이트
   */
  private updateMetrics(): void {
    this.metrics.hitRate = this.metrics.hits / this.metrics.totalRequests;
    this.metrics.averageResponseTime = this.calculateAverageResponseTime();
  }

  /**
   * 평균 응답 시간 계산
   */
  private calculateAverageResponseTime(): number {
    let totalTime = 0;
    let count = 0;
    
    for (const cached of this.cache.values()) {
      totalTime += cached.metadata.processingTime;
      count++;
    }
    
    return count > 0 ? totalTime / count : 0;
  }

  /**
   * 캐시 통계 반환
   */
  getMetrics(): CacheMetrics {
    return { ...this.metrics };
  }

  /**
   * 캐시 크기 반환
   */
  getSize(): number {
    return this.cache.size;
  }

  /**
   * 캐시 초기화
   */
  clear(): void {
    this.cache.clear();
    this.metrics = {
      hits: 0,
      misses: 0,
      totalRequests: 0,
      hitRate: 0,
      averageResponseTime: 0
    };
  }
}

// 전역 캐시 인스턴스
const globalCache = new FAQCache();

/**
 * 캐시된 응답 찾기
 */
export function findCachedResponse(question: string): CachedResponse | null {
  return globalCache.findCachedResponse(question);
}

/**
 * 응답 캐시하기
 */
export function cacheResponse(question: string, answer: string, metadata: any): void {
  globalCache.cacheResponse(question, answer, metadata);
}

/**
 * 캐시 메트릭 반환
 */
export function getCacheMetrics(): CacheMetrics {
  return globalCache.getMetrics();
}

/**
 * 캐시 통계 로깅
 */
export function logCacheStats(): void {
  const metrics = globalCache.getMetrics();
  const size = globalCache.getSize();
  
  console.log('📦 FAQ 캐시 통계:');
  console.log(`   📊 캐시 크기: ${size}개 항목`);
  console.log(`   🎯 히트율: ${(metrics.hitRate * 100).toFixed(1)}%`);
  console.log(`   ✅ 히트: ${metrics.hits}회`);
  console.log(`   ❌ 미스: ${metrics.misses}회`);
  console.log(`   ⚡ 평균 응답시간: ${metrics.averageResponseTime.toFixed(1)}ms`);
}

// CacheMetrics 클래스 (호환성)
export class CacheMetrics {
  static recordHit(): void {
    // 이미 전역 캐시에서 처리됨
  }
  
  static recordMiss(): void {
    // 이미 전역 캐시에서 처리됨
  }
}
