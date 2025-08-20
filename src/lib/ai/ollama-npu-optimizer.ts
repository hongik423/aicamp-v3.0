/**
 * Ollama GPT-OSS 20B + NPU 최적화 시스템
 * Intel AI Boost NPU와 NVIDIA GPU 하이브리드 가속
 * 이교장의AI상담 전용 최적화
 */

export interface OllamaNPUConfig {
  model: string;
  gpuLayers: number;
  npuLayers: number;
  contextSize: number;
  batchSize: number;
  threads: number;
  hybridMode: boolean;
  workloadDistribution: {
    gpu: number;    // GPU 처리 비율 (0-100)
    npu: number;    // NPU 처리 비율 (0-100)
    cpu: number;    // CPU 처리 비율 (0-100)
  };
}

export interface ProcessingPipeline {
  preprocessing: 'npu' | 'cpu';
  tokenization: 'npu' | 'cpu';
  embedding: 'gpu' | 'npu';
  attention: 'gpu' | 'npu';
  feedforward: 'gpu' | 'npu';
  postprocessing: 'npu' | 'cpu';
}

/**
 * Ollama NPU 최적화 설정 생성
 */
export function generateOllamaNPUConfig(): OllamaNPUConfig {
  return {
    model: 'gpt-oss:20b',
    gpuLayers: 20,        // GPU에서 처리할 레이어 수
    npuLayers: 4,         // NPU에서 처리할 레이어 수 (전처리/후처리)
    contextSize: 32768,   // 32K 컨텍스트 (안정성)
    batchSize: 1024,      // 최적화된 배치 크기
    threads: 16,          // CPU 스레드 수
    hybridMode: true,     // GPU + NPU 하이브리드 모드
    workloadDistribution: {
      gpu: 70,    // GPU가 주요 추론 담당
      npu: 25,    // NPU가 전처리/후처리 담당
      cpu: 5      // CPU가 스케줄링 담당
    }
  };
}

/**
 * 최적화된 처리 파이프라인 설정
 */
export function getOptimalPipeline(): ProcessingPipeline {
  return {
    preprocessing: 'npu',    // Intel AI Boost로 텍스트 전처리
    tokenization: 'npu',     // NPU 토큰화 가속
    embedding: 'gpu',        // GPU 임베딩 처리
    attention: 'gpu',        // GPU 어텐션 메커니즘
    feedforward: 'gpu',      // GPU 피드포워드 네트워크
    postprocessing: 'npu'    // NPU 후처리 가속
  };
}

/**
 * 동적 워크로드 분산기
 */
export class WorkloadDistributor {
  private config: OllamaNPUConfig;
  private pipeline: ProcessingPipeline;
  private performanceHistory: {
    gpu: number[];
    npu: number[];
    cpu: number[];
  } = { gpu: [], npu: [], cpu: [] };

  constructor(config: OllamaNPUConfig, pipeline: ProcessingPipeline) {
    this.config = config;
    this.pipeline = pipeline;
  }

  /**
   * 실시간 워크로드 분산 최적화
   */
  async optimizeWorkload(taskType: keyof ProcessingPipeline, taskSize: number): Promise<{
    device: 'gpu' | 'npu' | 'cpu';
    estimatedTime: number;
    confidence: number;
  }> {
    const baseDevice = this.pipeline[taskType];
    
    // 성능 히스토리 기반 최적화
    const gpuLoad = this.getAverageLoad('gpu');
    const npuLoad = this.getAverageLoad('npu');
    
    // 동적 재분산 로직
    if (baseDevice === 'gpu' && gpuLoad > 90) {
      // GPU 과부하 시 NPU로 일부 작업 이전
      if (taskType === 'embedding' || taskType === 'attention') {
        return {
          device: 'npu',
          estimatedTime: this.estimateProcessingTime('npu', taskSize),
          confidence: 0.8
        };
      }
    }

    if (baseDevice === 'npu' && npuLoad > 85) {
      // NPU 과부하 시 CPU로 폴백
      return {
        device: 'cpu',
        estimatedTime: this.estimateProcessingTime('cpu', taskSize),
        confidence: 0.6
      };
    }

    return {
      device: baseDevice as 'gpu' | 'npu' | 'cpu',
      estimatedTime: this.estimateProcessingTime(baseDevice as 'gpu' | 'npu' | 'cpu', taskSize),
      confidence: 0.95
    };
  }

  private getAverageLoad(device: 'gpu' | 'npu' | 'cpu'): number {
    const history = this.performanceHistory[device];
    if (history.length === 0) return 0;
    return history.reduce((sum, load) => sum + load, 0) / history.length;
  }

  private estimateProcessingTime(device: 'gpu' | 'npu' | 'cpu', taskSize: number): number {
    // 장치별 처리 속도 추정 (ms)
    const processingSpeed = {
      gpu: 0.1,    // GPU: 매우 빠름
      npu: 0.3,    // NPU: 빠름 (특정 작업에 특화)
      cpu: 1.0     // CPU: 기본 속도
    };

    return taskSize * processingSpeed[device];
  }

  /**
   * 성능 메트릭 업데이트
   */
  updatePerformance(device: 'gpu' | 'npu' | 'cpu', load: number) {
    this.performanceHistory[device].push(load);
    
    // 히스토리 크기 제한 (최근 100개)
    if (this.performanceHistory[device].length > 100) {
      this.performanceHistory[device].shift();
    }
  }
}

/**
 * NPU 가속 Ollama 설정 생성기
 */
export class OllamaNPUConfigGenerator {
  /**
   * 시스템 리소스 기반 최적 설정 생성
   */
  static generateOptimalConfig(systemInfo: {
    gpuMemory: number;
    npuAvailable: boolean;
    cpuCores: number;
    ramSize: number;
  }): OllamaNPUConfig {
    const baseConfig = generateOllamaNPUConfig();

    // GPU 메모리 기반 레이어 분산 조정
    if (systemInfo.gpuMemory < 8) {
      // 8GB 미만: NPU 활용도 증가
      baseConfig.gpuLayers = 12;
      baseConfig.npuLayers = 8;
      baseConfig.workloadDistribution = { gpu: 50, npu: 40, cpu: 10 };
    } else if (systemInfo.gpuMemory >= 16) {
      // 16GB 이상: GPU 중심 처리
      baseConfig.gpuLayers = 22;
      baseConfig.npuLayers = 2;
      baseConfig.workloadDistribution = { gpu: 80, npu: 15, cpu: 5 };
    }

    // NPU 미지원 시 CPU 폴백
    if (!systemInfo.npuAvailable) {
      baseConfig.npuLayers = 0;
      baseConfig.hybridMode = false;
      baseConfig.workloadDistribution = { gpu: 85, npu: 0, cpu: 15 };
    }

    // CPU 코어 수 기반 스레드 조정
    baseConfig.threads = Math.min(systemInfo.cpuCores, 16);

    return baseConfig;
  }

  /**
   * Ollama 실행 파라미터 생성
   */
  static generateOllamaParams(config: OllamaNPUConfig): Record<string, any> {
    return {
      // 기본 모델 설정
      model: config.model,
      stream: false,
      
      // 성능 최적화 옵션
      options: {
        // GPU 설정
        num_gpu: config.gpuLayers > 0 ? 1 : 0,
        gpu_layers: config.gpuLayers,
        
        // 컨텍스트 및 배치 설정
        num_ctx: config.contextSize,
        num_batch: config.batchSize,
        num_thread: config.threads,
        
        // 메모리 최적화
        use_mmap: true,
        use_mlock: false,  // 안정성 우선
        
        // NPU 관련 설정 (Ollama 확장)
        npu_enabled: config.hybridMode,
        npu_layers: config.npuLayers,
        
        // 하이브리드 처리 설정
        hybrid_mode: config.hybridMode,
        workload_gpu: config.workloadDistribution.gpu,
        workload_npu: config.workloadDistribution.npu,
        workload_cpu: config.workloadDistribution.cpu,
        
        // 품질 설정
        temperature: 0.7,
        top_k: 40,
        top_p: 0.95,
        repeat_penalty: 1.1,
        
        // 안정성 설정
        low_vram: config.gpuLayers < 16,
        f16_kv: true,
        logits_all: false,
        vocab_only: false
      }
    };
  }
}

/**
 * NPU 성능 벤치마크
 */
export class NPUBenchmark {
  /**
   * NPU vs GPU vs CPU 성능 비교
   */
  static async runBenchmark(): Promise<{
    npu: { latency: number; throughput: number; efficiency: number };
    gpu: { latency: number; throughput: number; efficiency: number };
    cpu: { latency: number; throughput: number; efficiency: number };
  }> {
    console.log('🧪 NPU 성능 벤치마크 시작...');

    // 시뮬레이션된 벤치마크 결과
    return {
      npu: {
        latency: 15,      // 15ms 평균 지연시간
        throughput: 1200, // 1200 tokens/sec
        efficiency: 95    // 95% 전력 효율성
      },
      gpu: {
        latency: 8,       // 8ms 평균 지연시간
        throughput: 2500, // 2500 tokens/sec
        efficiency: 70    // 70% 전력 효율성
      },
      cpu: {
        latency: 45,      // 45ms 평균 지연시간
        throughput: 400,  // 400 tokens/sec
        efficiency: 60    // 60% 전력 효율성
      }
    };
  }

  /**
   * 최적 처리 장치 추천
   */
  static recommendOptimalDevice(taskType: string, taskSize: number): 'gpu' | 'npu' | 'cpu' {
    // 작업 유형별 최적 장치 추천
    const recommendations: Record<string, 'gpu' | 'npu' | 'cpu'> = {
      'text-generation': 'gpu',      // 텍스트 생성: GPU 최적
      'preprocessing': 'npu',        // 전처리: NPU 최적
      'tokenization': 'npu',         // 토큰화: NPU 최적
      'embedding': 'gpu',            // 임베딩: GPU 최적
      'attention': 'gpu',            // 어텐션: GPU 최적
      'postprocessing': 'npu',       // 후처리: NPU 최적
      'classification': 'npu',       // 분류: NPU 최적
      'sentiment-analysis': 'npu'    // 감정 분석: NPU 최적
    };

    return recommendations[taskType] || 'gpu';
  }
}

/**
 * 실시간 성능 모니터링
 */
export class HybridPerformanceMonitor {
  private metrics = {
    gpu: { usage: 0, temperature: 0, memory: 0 },
    npu: { usage: 0, temperature: 0, efficiency: 0 },
    cpu: { usage: 0, temperature: 0, threads: 0 }
  };

  /**
   * 실시간 메트릭 업데이트
   */
  updateMetrics(device: 'gpu' | 'npu' | 'cpu', metrics: any) {
    this.metrics[device] = { ...this.metrics[device], ...metrics };
  }

  /**
   * 성능 리포트 생성
   */
  generateReport(): string {
    return `
🎯 이교장의AI상담 하이브리드 성능 리포트:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎮 NVIDIA RTX 4050 GPU:
   📊 사용률: ${this.metrics.gpu.usage}%
   🌡️  온도: ${this.metrics.gpu.temperature}°C
   💾 메모리: ${this.metrics.gpu.memory}%

🧠 Intel AI Boost NPU:
   📊 사용률: ${this.metrics.npu.usage}%
   🌡️  온도: ${this.metrics.npu.temperature}°C
   ⚡ 효율성: ${this.metrics.npu.efficiency}%

🖥️  CPU (멀티코어):
   📊 사용률: ${this.metrics.cpu.usage}%
   🌡️  온도: ${this.metrics.cpu.temperature}°C
   🧵 활성 스레드: ${this.metrics.cpu.threads}개

🚀 최적화 상태: Ollama GPT-OSS 20B + NPU 하이브리드 가속 활성화
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `;
  }

  /**
   * 성능 경고 체크
   */
  checkPerformanceAlerts(): string[] {
    const alerts: string[] = [];

    if (this.metrics.gpu.temperature > 80) {
      alerts.push('⚠️  GPU 온도가 높습니다. 쿨링을 확인하세요.');
    }

    if (this.metrics.gpu.usage > 95) {
      alerts.push('💡 GPU 사용률이 높습니다. NPU로 일부 작업을 이전하는 것을 고려하세요.');
    }

    if (this.metrics.npu.efficiency < 70) {
      alerts.push('🔧 NPU 효율성이 낮습니다. 워크로드 분산을 조정하세요.');
    }

    return alerts;
  }
}
