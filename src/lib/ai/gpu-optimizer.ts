/**
 * GPU 최적화 시스템 - 이교장의AI상담 전용
 * NVIDIA GPU + NPU 최대 성능 활용
 */

export interface GPUOptimizationConfig {
  numGpu: number;
  numThread: number;
  numBatch: number;
  contextSize: number;
  useMlock: boolean;
  useMmap: boolean;
  numa: boolean;
  flashAttention: boolean;
  lowVram: boolean;
}

export interface SystemResources {
  totalMemory: number;
  availableMemory: number;
  cpuCores: number;
  gpuMemory?: number;
  hasNPU: boolean;
}

/**
 * 시스템 리소스 기반 동적 최적화 설정 생성
 */
export function generateOptimalConfig(
  resources: SystemResources,
  taskComplexity: 'simple' | 'medium' | 'complex' = 'medium'
): GPUOptimizationConfig {
  const baseConfig: GPUOptimizationConfig = {
    numGpu: -1, // 모든 GPU 활용
    numThread: Math.min(resources.cpuCores, 16),
    numBatch: 2048,
    contextSize: 131072, // 최대 컨텍스트
    useMlock: true,
    useMmap: true,
    numa: true,
    flashAttention: true,
    lowVram: false
  };

  // 작업 복잡도에 따른 조정
  switch (taskComplexity) {
    case 'simple':
      baseConfig.numBatch = 1024;
      baseConfig.contextSize = 32768;
      break;
    case 'complex':
      baseConfig.numBatch = 4096;
      baseConfig.contextSize = 131072;
      baseConfig.numThread = Math.min(resources.cpuCores * 2, 32);
      break;
  }

  // 메모리 기반 조정
  if (resources.availableMemory < 16 * 1024 * 1024 * 1024) { // 16GB 미만
    baseConfig.lowVram = true;
    baseConfig.numBatch = Math.min(baseConfig.numBatch, 1024);
    baseConfig.contextSize = Math.min(baseConfig.contextSize, 65536);
  }

  // NPU 활용 최적화
  if (resources.hasNPU) {
    baseConfig.numThread = Math.min(resources.cpuCores * 3, 48); // NPU 병렬 처리
    console.log('🧠 NPU 감지: 병렬 처리 최적화 활성화');
  }

  return baseConfig;
}

/**
 * 성능 메트릭 수집
 */
export interface PerformanceMetrics {
  processingTime: number;
  tokensPerSecond: number;
  memoryUsage: number;
  gpuUtilization?: number;
  temperature?: number;
}

/**
 * 실시간 성능 모니터링
 */
export class GPUPerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private maxHistory = 100;

  addMetric(metric: PerformanceMetrics) {
    this.metrics.push({
      ...metric,
      timestamp: Date.now()
    } as PerformanceMetrics & { timestamp: number });

    // 히스토리 제한
    if (this.metrics.length > this.maxHistory) {
      this.metrics.shift();
    }
  }

  getAveragePerformance(): Partial<PerformanceMetrics> {
    if (this.metrics.length === 0) return {};

    const totals = this.metrics.reduce((acc, metric) => ({
      processingTime: acc.processingTime + metric.processingTime,
      tokensPerSecond: acc.tokensPerSecond + metric.tokensPerSecond,
      memoryUsage: acc.memoryUsage + metric.memoryUsage
    }), { processingTime: 0, tokensPerSecond: 0, memoryUsage: 0 });

    const count = this.metrics.length;
    return {
      processingTime: Math.round(totals.processingTime / count),
      tokensPerSecond: Math.round(totals.tokensPerSecond / count),
      memoryUsage: Math.round(totals.memoryUsage / count)
    };
  }

  getOptimizationRecommendations(): string[] {
    const avg = this.getAveragePerformance();
    const recommendations: string[] = [];

    if (avg.processingTime && avg.processingTime > 30000) { // 30초 이상
      recommendations.push('🔧 배치 크기를 늘려 처리 속도 향상 권장');
    }

    if (avg.tokensPerSecond && avg.tokensPerSecond < 10) {
      recommendations.push('⚡ GPU 레이어 수 증가 또는 모델 양자화 검토 권장');
    }

    if (avg.memoryUsage && avg.memoryUsage > 0.9) { // 90% 이상
      recommendations.push('💾 메모리 사용량 높음: 컨텍스트 크기 조정 권장');
    }

    return recommendations;
  }

  logPerformanceReport() {
    const avg = this.getAveragePerformance();
    const recommendations = this.getOptimizationRecommendations();

    console.log('\n🎯 이교장의AI상담 GPU 성능 리포트:');
    console.log(`   📊 평균 처리 시간: ${avg.processingTime}ms`);
    console.log(`   🚀 평균 처리 속도: ${avg.tokensPerSecond} 문자/초`);
    console.log(`   💾 평균 메모리 사용: ${Math.round((avg.memoryUsage || 0) * 100)}%`);
    
    if (recommendations.length > 0) {
      console.log('\n💡 최적화 권장사항:');
      recommendations.forEach(rec => console.log(`   ${rec}`));
    }
    console.log('');
  }
}

// 전역 성능 모니터 인스턴스
export const globalPerformanceMonitor = new GPUPerformanceMonitor();

/**
 * GPU 온도 및 사용률 체크 (시뮬레이션)
 */
export async function checkGPUHealth(): Promise<{
  temperature: number;
  utilization: number;
  memoryUsed: number;
  memoryTotal: number;
}> {
  // 실제 환경에서는 nvidia-ml-py 등을 사용하여 실제 GPU 정보를 가져올 수 있습니다
  // 여기서는 시뮬레이션된 값을 반환합니다
  return {
    temperature: Math.random() * 20 + 65, // 65-85도
    utilization: Math.random() * 30 + 70, // 70-100%
    memoryUsed: Math.random() * 8 + 12,   // 12-20GB
    memoryTotal: 24 // 24GB GPU 가정
  };
}

/**
 * 동적 배치 크기 최적화
 */
export function getOptimalBatchSize(
  availableMemory: number,
  contextLength: number,
  modelSize: number = 20.9 // GPT-OSS 20B
): number {
  // GPU 메모리 기반 최적 배치 크기 계산
  const memoryPerToken = (modelSize * 1024 * 1024 * 1024) / (contextLength * 1024);
  const maxBatchSize = Math.floor(availableMemory / memoryPerToken);
  
  // 안전 마진 적용 (80%)
  const safeBatchSize = Math.floor(maxBatchSize * 0.8);
  
  // 최소/최대 제한
  return Math.max(512, Math.min(safeBatchSize, 8192));
}
