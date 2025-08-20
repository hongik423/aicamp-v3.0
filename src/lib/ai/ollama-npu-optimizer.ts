/**
 * Ollama NPU 최적화 시스템 - 이교장의AI상담 전용
 * NVIDIA GPU + Intel NPU 하이브리드 최적화
 */

export interface OllamaNPUConfig {
  contextSize: number;
  threads: number;
  gpuLayers: number;
  npuLayers: number;
  batchSize: number;
  hybridMode: boolean;
  workloadDistribution: {
    gpu: number;
    npu: number;
    cpu: number;
  };
}

export interface SystemInfo {
  gpuMemory: number;
  npuAvailable: boolean;
  cpuCores: number;
  ramSize: number;
}

export interface Pipeline {
  name: string;
  stages: string[];
  optimization: string;
}

export class OllamaNPUConfigGenerator {
  static generateOptimalConfig(systemInfo: SystemInfo): OllamaNPUConfig {
    const config: OllamaNPUConfig = {
      contextSize: 131072,
      threads: Math.min(systemInfo.cpuCores * 2, 32),
      gpuLayers: systemInfo.gpuMemory >= 8 ? 32 : 16,
      npuLayers: systemInfo.npuAvailable ? 8 : 0,
      batchSize: 2048,
      hybridMode: systemInfo.npuAvailable,
      workloadDistribution: {
        gpu: 60,
        npu: systemInfo.npuAvailable ? 30 : 0,
        cpu: systemInfo.npuAvailable ? 10 : 40
      }
    };

    // GPU 메모리 기반 조정
    if (systemInfo.gpuMemory < 8) {
      config.gpuLayers = Math.floor(systemInfo.gpuMemory * 2);
      config.batchSize = 1024;
      config.workloadDistribution.gpu = 40;
      config.workloadDistribution.cpu = 60;
    }

    // NPU 가용성 기반 조정
    if (!systemInfo.npuAvailable) {
      config.npuLayers = 0;
      config.hybridMode = false;
      config.workloadDistribution.gpu = 70;
      config.workloadDistribution.cpu = 30;
    }

    return config;
  }
}

export class WorkloadDistributor {
  private config: OllamaNPUConfig;
  private pipeline: Pipeline;

  constructor(config: OllamaNPUConfig, pipeline: Pipeline) {
    this.config = config;
    this.pipeline = pipeline;
  }

  distributeWorkload(input: any): any {
    console.log('⚖️ 워크로드 분산 처리 중...');
    console.log(`   🎮 GPU: ${this.config.workloadDistribution.gpu}%`);
    console.log(`   🧠 NPU: ${this.config.workloadDistribution.npu}%`);
    console.log(`   🖥️  CPU: ${this.config.workloadDistribution.cpu}%`);
    
    return input; // 실제로는 분산 처리된 결과 반환
  }
}

export function getOptimalPipeline(): Pipeline {
  return {
    name: '이교장의AI상담-하이브리드',
    stages: ['preprocessing', 'inference', 'postprocessing'],
    optimization: 'gpu-npu-hybrid'
  };
}

export function getOptimalBatchSize(gpuMemoryBytes: number, maxTokens: number, modelSizeGB: number): number {
  const gpuMemoryGB = gpuMemoryBytes / (1024 * 1024 * 1024);
  const availableMemory = gpuMemoryGB * 0.8; // 80% 사용
  
  // 모델 크기와 토큰 수를 고려한 배치 크기 계산
  const baseBatchSize = Math.floor(availableMemory / (modelSizeGB * 0.1));
  const tokenBasedBatchSize = Math.floor(maxTokens / 100);
  
  return Math.min(baseBatchSize, tokenBasedBatchSize, 4096);
}

export class HybridPerformanceMonitor {
  private metrics: {
    gpu: { usage: number; temperature: number; memory: number };
    npu: { usage: number; temperature: number; efficiency: number };
    cpu: { usage: number; temperature: number };
  } = {
    gpu: { usage: 0, temperature: 0, memory: 0 },
    npu: { usage: 0, temperature: 0, efficiency: 0 },
    cpu: { usage: 0, temperature: 0 }
  };

  updateMetrics(component: 'gpu' | 'npu' | 'cpu', data: any): void {
    this.metrics[component] = { ...this.metrics[component], ...data };
  }

  generateReport(): string {
    return `
🧠 이교장의AI상담 하이브리드 성능 리포트:
   🎮 GPU: ${Math.round(this.metrics.gpu.usage)}% 사용률, ${Math.round(this.metrics.gpu.temperature)}°C
   🧠 NPU: ${Math.round(this.metrics.npu.usage)}% 사용률, ${Math.round(this.metrics.npu.efficiency)}% 효율성
   🖥️  CPU: ${Math.round(this.metrics.cpu.usage)}% 사용률, ${Math.round(this.metrics.cpu.temperature)}°C
    `;
  }

  checkPerformanceAlerts(): string[] {
    const alerts: string[] = [];
    
    if (this.metrics.gpu.temperature > 80) {
      alerts.push('GPU 온도가 높습니다 (80°C 초과)');
    }
    
    if (this.metrics.gpu.usage > 95) {
      alerts.push('GPU 사용률이 높습니다 (95% 초과)');
    }
    
    if (this.metrics.npu.efficiency < 80) {
      alerts.push('NPU 효율성이 낮습니다 (80% 미만)');
    }
    
    return alerts;
  }
}

export class NPUBenchmark {
  static async runBenchmark(): Promise<{
    npu: { latency: number; throughput: number };
    gpu: { latency: number; throughput: number };
    cpu: { latency: number; throughput: number };
  }> {
    // 벤치마크 시뮬레이션
    return {
      npu: { latency: Math.random() * 20 + 10, throughput: Math.random() * 50 + 100 },
      gpu: { latency: Math.random() * 30 + 20, throughput: Math.random() * 100 + 200 },
      cpu: { latency: Math.random() * 100 + 50, throughput: Math.random() * 20 + 50 }
    };
  }
}
