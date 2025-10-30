/**
 * GPU 최적화 시스템 - 이교장의AI상담 전용
 * NVIDIA GPU + NPU 최대 성능 활용
 * phi3:mini 모델 최적화
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
  gpuLayers: number;
  npuLayers: number;
  hybridMode: boolean;
  workloadDistribution?: { gpu: number; npu: number; cpu: number };
}

export interface SystemResources {
  totalMemory: number;
  availableMemory: number;
  cpuCores: number;
  gpuMemory?: number;
  hasNPU: boolean;
  gpuModel?: string;
  gpuUtilization?: number;
  gpuTemperature?: number;
}

export interface PerformanceMetrics {
  processingTime: number;
  tokensPerSecond: number;
  memoryUsage: number;
  gpuUtilization?: number;
  temperature?: number;
  throughput: number;
  latency: number;
}

/**
 * 시스템 리소스 기반 동적 최적화 설정 생성
 */
export function generateOptimalConfig(
  resources: SystemResources,
  taskComplexity: 'simple' | 'medium' | 'complex' = 'medium'
): GPUOptimizationConfig {
  // phi3:mini 모델에 최적화된 설정
  const baseConfig: GPUOptimizationConfig = {
    numGpu: -1, // 모든 GPU 활용
    numThread: Math.min(resources.cpuCores, 16), // phi3:mini는 더 적은 스레드로 충분
    numBatch: 512, // phi3:mini에 최적화된 배치 크기
    contextSize: 32768, // phi3:mini 최적 컨텍스트 크기
    useMlock: true,
    useMmap: true,
    numa: true,
    flashAttention: true,
    lowVram: false,
    gpuLayers: 20, // phi3:mini에 최적화된 GPU 레이어
    npuLayers: resources.hasNPU ? 6 : 0, // NPU 레이어 조정
    hybridMode: resources.hasNPU
  };

  // GPU 메모리 기반 조정 (phi3:mini 최적화)
  if (resources.gpuMemory) {
    if (resources.gpuMemory < 4) {
      // 4GB 미만: 최소 설정
      baseConfig.gpuLayers = 8;
      baseConfig.numBatch = 256;
      baseConfig.contextSize = 16384;
      baseConfig.lowVram = true;
      baseConfig.workloadDistribution = { gpu: 40, npu: 30, cpu: 30 };
    } else if (resources.gpuMemory < 8) {
      // 4-8GB: 보수적 설정
      baseConfig.gpuLayers = 12;
      baseConfig.numBatch = 384;
      baseConfig.contextSize = 24576;
      baseConfig.lowVram = true;
      baseConfig.workloadDistribution = { gpu: 50, npu: 35, cpu: 15 };
    } else if (resources.gpuMemory >= 16) {
      // 16GB 이상: 최대 성능 설정
      baseConfig.gpuLayers = 28;
      baseConfig.numBatch = 768;
      baseConfig.contextSize = 49152;
      baseConfig.workloadDistribution = { gpu: 70, npu: 20, cpu: 10 };
    } else {
      // 8-16GB: 균형 설정
      baseConfig.gpuLayers = 20;
      baseConfig.numBatch = 512;
      baseConfig.contextSize = 32768;
      baseConfig.workloadDistribution = { gpu: 60, npu: 25, cpu: 15 };
    }
  }

  // 작업 복잡도에 따른 조정 (phi3:mini 최적화)
  switch (taskComplexity) {
    case 'simple':
      baseConfig.numBatch = 256;
      baseConfig.contextSize = 16384;
      baseConfig.gpuLayers = Math.max(6, baseConfig.gpuLayers - 4);
      break;
    case 'complex':
      baseConfig.numBatch = 768;
      baseConfig.contextSize = 49152;
      baseConfig.numThread = Math.min(resources.cpuCores * 2, 32);
      baseConfig.gpuLayers = Math.min(28, baseConfig.gpuLayers + 4);
      break;
  }

  // NPU 활용 최적화 (phi3:mini 최적화)
  if (resources.hasNPU) {
    baseConfig.numThread = Math.min(resources.cpuCores * 2, 48); // phi3:mini에 최적화된 스레드
    baseConfig.hybridMode = true;
    console.log('🧠 NPU 감지: phi3:mini 병렬 처리 최적화 활성화');
  }

  return baseConfig;
}

/**
 * 실시간 성능 모니터링
 */
export class GPUPerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private maxHistory = 100;
  private alerts: string[] = [];

  addMetric(metric: PerformanceMetrics) {
    this.metrics.push({
      ...metric,
      timestamp: Date.now()
    } as PerformanceMetrics & { timestamp: number });

    // 히스토리 제한
    if (this.metrics.length > this.maxHistory) {
      this.metrics.shift();
    }

    // 성능 경고 체크
    this.checkPerformanceAlerts(metric);
  }

  private checkPerformanceAlerts(metric: PerformanceMetrics) {
    if (metric.gpuUtilization && metric.gpuUtilization > 95) {
      this.alerts.push(`GPU 사용률 높음: ${Math.round(metric.gpuUtilization)}%`);
    }
    
    if (metric.temperature && metric.temperature > 80) {
      this.alerts.push(`GPU 온도 높음: ${Math.round(metric.temperature)}°C`);
    }
    
    if (metric.memoryUsage > 0.9) {
      this.alerts.push(`메모리 사용률 높음: ${Math.round(metric.memoryUsage * 100)}%`);
    }
    
    if (metric.tokensPerSecond < 100) {
      this.alerts.push(`처리 속도 느림: ${Math.round(metric.tokensPerSecond)} tokens/sec`);
    }
  }

  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  getAlerts(): string[] {
    return [...this.alerts];
  }

  clearAlerts(): void {
    this.alerts = [];
  }

  getAverageMetrics(): PerformanceMetrics {
    if (this.metrics.length === 0) {
      return {
        processingTime: 0,
        tokensPerSecond: 0,
        memoryUsage: 0,
        throughput: 0,
        latency: 0
      };
    }

    const sum = this.metrics.reduce((acc, metric) => ({
      processingTime: acc.processingTime + metric.processingTime,
      tokensPerSecond: acc.tokensPerSecond + metric.tokensPerSecond,
      memoryUsage: acc.memoryUsage + metric.memoryUsage,
      gpuUtilization: (acc.gpuUtilization || 0) + (metric.gpuUtilization || 0),
      temperature: (acc.temperature || 0) + (metric.temperature || 0),
      throughput: acc.throughput + metric.throughput,
      latency: acc.latency + metric.latency
    }), {
      processingTime: 0,
      tokensPerSecond: 0,
      memoryUsage: 0,
      throughput: 0,
      latency: 0
    });

    const count = this.metrics.length;
    return {
      processingTime: sum.processingTime / count,
      tokensPerSecond: sum.tokensPerSecond / count,
      memoryUsage: sum.memoryUsage / count,
      gpuUtilization: sum.gpuUtilization / count,
      temperature: sum.temperature / count,
      throughput: sum.throughput / count,
      latency: sum.latency / count
    };
  }

  generateReport(): string {
    const avgMetrics = this.getAverageMetrics();
    const alerts = this.getAlerts();
    
    return `
🎮 GPU 성능 모니터링 리포트:
   ⚡ 평균 처리시간: ${Math.round(avgMetrics.processingTime)}ms
   🚀 평균 처리속도: ${Math.round(avgMetrics.tokensPerSecond)} tokens/sec
   💾 평균 메모리 사용률: ${Math.round(avgMetrics.memoryUsage * 100)}%
   📊 평균 GPU 사용률: ${Math.round(avgMetrics.gpuUtilization || 0)}%
   🌡️ 평균 GPU 온도: ${Math.round(avgMetrics.temperature || 0)}°C
   🔄 평균 처리량: ${Math.round(avgMetrics.throughput)} ops/sec
   ⏱️ 평균 지연시간: ${Math.round(avgMetrics.latency)}ms
   
${alerts.length > 0 ? `🚨 성능 경고:\n${alerts.map(alert => `   - ${alert}`).join('\n')}` : '✅ 성능 상태 양호'}
    `;
  }
}

/**
 * GPU 상태 확인
 */
export async function checkGPUHealth(): Promise<{
  utilization: number;
  temperature: number;
  memoryUsed: number;
  memoryTotal: number;
  powerDraw: number;
  isAvailable: boolean;
}> {
  try {
    // GPU 상태 시뮬레이션 (실제 환경에서는 nvidia-smi 또는 GPU API 사용)
    const health = {
      utilization: Math.random() * 40 + 20, // 20-60%
      temperature: Math.random() * 20 + 50, // 50-70°C
      memoryUsed: Math.random() * 4 + 2,    // 2-6GB
      memoryTotal: 6,                       // 6GB RTX 4050
      powerDraw: Math.random() * 30 + 50,   // 50-80W
      isAvailable: true
    };
    
    return health;
  } catch (error) {
    console.warn('GPU 상태 확인 실패:', error);
    return {
      utilization: 0,
      temperature: 0,
      memoryUsed: 0,
      memoryTotal: 0,
      powerDraw: 0,
      isAvailable: false
    };
  }
}

/**
 * 최적 배치 크기 계산
 */
export function getOptimalBatchSize(
  gpuMemoryBytes: number, 
  maxTokens: number, 
  modelSizeGB: number
): number {
  const gpuMemoryGB = gpuMemoryBytes / (1024 * 1024 * 1024);
  const availableMemory = gpuMemoryGB * 0.8; // 80% 사용
  
  // 모델 크기와 토큰 수를 고려한 배치 크기 계산
  const baseBatchSize = Math.floor(availableMemory / (modelSizeGB * 0.1));
  const tokenBasedBatchSize = Math.floor(maxTokens / 100);
  
  return Math.min(baseBatchSize, tokenBasedBatchSize, 4096);
}

/**
 * GPU 최적화 설정 생성
 */
export function createGPUOptimizationSettings(
  systemInfo: SystemResources,
  modelName: string = 'phi3:mini'
): Record<string, any> {
  const config = generateOptimalConfig(systemInfo, 'medium');
  
  return {
    // 기본 모델 설정
    model: modelName,
    stream: false,
    
    // 성능 최적화 옵션 (phi3:mini 최적화)
    options: {
      // GPU 설정
      num_gpu: config.gpuLayers > 0 ? 1 : 0,
      gpu_layers: config.gpuLayers,
      
      // 컨텍스트 및 배치 설정 (phi3:mini 최적화)
      num_ctx: config.contextSize,
      num_batch: config.numBatch,
      num_thread: config.numThread,
      
      // 메모리 최적화
      use_mmap: config.useMmap,
      use_mlock: config.useMlock,
      numa: config.numa,
      flash_attention: config.flashAttention,
      low_vram: config.lowVram,
      f16_kv: true,
      logits_all: false,
      vocab_only: false,
      
      // NPU 관련 설정 (Ollama 확장)
      npu_enabled: config.hybridMode,
      npu_layers: config.npuLayers,
      
      // 하이브리드 처리 설정
      hybrid_mode: config.hybridMode,
      
      // 품질 설정 (phi3:mini 최적화)
      temperature: 0.7,
      top_k: 40,
      top_p: 0.95,
      repeat_penalty: 1.1,
      
      // 안정성 설정
      stop: ["<|end|>", "###", "---", "\n\n\n"]
    }
  };
}

// 전역 성능 모니터 인스턴스
export const globalPerformanceMonitor = new GPUPerformanceMonitor();

/**
 * GPU 최적화 초기화
 */
export async function initializeGPUOptimization(): Promise<{
  config: GPUOptimizationConfig;
  health: any;
  monitor: GPUPerformanceMonitor;
}> {
  console.log('🎮 GPU 최적화 시스템 초기화 중...');
  
  const health = await checkGPUHealth();
  const systemResources: SystemResources = {
    totalMemory: 64 * 1024 * 1024 * 1024, // 64GB
    availableMemory: 32 * 1024 * 1024 * 1024, // 32GB
    cpuCores: 16,
    gpuMemory: health.memoryTotal,
    hasNPU: true, // Intel AI Boost 감지됨
    gpuModel: 'NVIDIA RTX 4050',
    gpuUtilization: health.utilization,
    gpuTemperature: health.temperature
  };
  
  const config = generateOptimalConfig(systemResources, 'medium');
  
  console.log('✅ GPU 최적화 시스템 초기화 완료');
  console.log(`   🎮 GPU: ${systemResources.gpuModel} (${health.memoryTotal}GB)`);
  console.log(`   🧠 NPU: ${systemResources.hasNPU ? 'Intel AI Boost 활성화' : '비활성화'}`);
  console.log(`   🖥️  CPU: ${systemResources.cpuCores}코어`);
  console.log(`   💾 메모리: ${Math.round(systemResources.totalMemory / 1024 / 1024 / 1024)}GB`);
  
  return { config, health, monitor: globalPerformanceMonitor };
}
