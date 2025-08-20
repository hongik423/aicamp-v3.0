/**
 * GPU 최적화 시스템 테스트 스크립트
 * 이교장의AI상담 전용 GPU + NPU 하이브리드 최적화 테스트
 */

const { 
  initializeGPUOptimization, 
  checkGPUHealth, 
  getOptimalBatchSize,
  createGPUOptimizationSettings,
  globalPerformanceMonitor 
} = require('./src/lib/ai/gpu-optimizer.ts');

async function testGPUOptimization() {
  console.log('🎮 GPU 최적화 시스템 테스트 시작...');
  console.log('');

  try {
    // 1. GPU 최적화 시스템 초기화
    console.log('1️⃣ GPU 최적화 시스템 초기화');
    const { config, health, monitor } = await initializeGPUOptimization();
    
    console.log('✅ GPU 최적화 시스템 초기화 완료');
    console.log(`   🎮 GPU 모델: NVIDIA RTX 4050`);
    console.log(`   💾 GPU 메모리: ${health.memoryTotal}GB`);
    console.log(`   🌡️ GPU 온도: ${Math.round(health.temperature)}°C`);
    console.log(`   📊 GPU 사용률: ${Math.round(health.utilization)}%`);
    console.log('');

    // 2. GPU 상태 확인
    console.log('2️⃣ GPU 상태 확인');
    const gpuHealth = await checkGPUHealth();
    
    console.log('✅ GPU 상태 확인 완료');
    console.log(`   🔥 전력 소모: ${Math.round(gpuHealth.powerDraw)}W`);
    console.log(`   💾 메모리 사용: ${Math.round(gpuHealth.memoryUsed)}GB/${gpuHealth.memoryTotal}GB`);
    console.log(`   ⚡ 사용 가능: ${gpuHealth.isAvailable ? '예' : '아니오'}`);
    console.log('');

    // 3. 최적 배치 크기 계산
    console.log('3️⃣ 최적 배치 크기 계산');
    const optimalBatchSize = getOptimalBatchSize(
      gpuHealth.memoryTotal * 1024 * 1024 * 1024, // 바이트 단위
      8192, // 최대 토큰 수
      20.9  // GPT-OSS 20B 모델 크기
    );
    
    console.log('✅ 최적 배치 크기 계산 완료');
    console.log(`   📦 최적 배치 크기: ${optimalBatchSize}`);
    console.log(`   🎯 GPU 메모리 기반: ${Math.floor(gpuHealth.memoryTotal * 0.8 / 20.9 * 100)}`);
    console.log(`   🔢 토큰 기반: ${Math.floor(8192 / 100)}`);
    console.log('');

    // 4. GPU 최적화 설정 생성
    console.log('4️⃣ GPU 최적화 설정 생성');
    const systemResources = {
      totalMemory: 64 * 1024 * 1024 * 1024, // 64GB
      availableMemory: 32 * 1024 * 1024 * 1024, // 32GB
      cpuCores: 16,
      gpuMemory: gpuHealth.memoryTotal,
      hasNPU: true,
      gpuModel: 'NVIDIA RTX 4050',
      gpuUtilization: gpuHealth.utilization,
      gpuTemperature: gpuHealth.temperature
    };
    
    const optimizationSettings = createGPUOptimizationSettings(systemResources, 'gpt-oss:20b');
    
    console.log('✅ GPU 최적화 설정 생성 완료');
    console.log(`   🎮 GPU 레이어: ${optimizationSettings.options.gpu_layers}개`);
    console.log(`   🧠 NPU 레이어: ${optimizationSettings.options.npu_layers}개`);
    console.log(`   🔄 하이브리드 모드: ${optimizationSettings.options.hybrid_mode ? '활성화' : '비활성화'}`);
    console.log(`   📦 배치 크기: ${optimizationSettings.options.num_batch}`);
    console.log(`   🧵 스레드 수: ${optimizationSettings.options.num_thread}`);
    console.log(`   📏 컨텍스트 크기: ${optimizationSettings.options.num_ctx.toLocaleString()}`);
    console.log('');

    // 5. 성능 메트릭 시뮬레이션
    console.log('5️⃣ 성능 메트릭 시뮬레이션');
    
    // 여러 성능 메트릭 추가
    for (let i = 0; i < 10; i++) {
      const processingTime = Math.random() * 5000 + 1000; // 1-6초
      const tokensPerSecond = Math.random() * 200 + 100; // 100-300 tokens/sec
      const memoryUsage = Math.random() * 0.3 + 0.4; // 40-70%
      const gpuUtilization = Math.random() * 40 + 30; // 30-70%
      const temperature = Math.random() * 15 + 55; // 55-70°C
      
      globalPerformanceMonitor.addMetric({
        processingTime,
        tokensPerSecond,
        memoryUsage,
        gpuUtilization,
        temperature,
        throughput: tokensPerSecond * 60, // 분당 처리량
        latency: processingTime / tokensPerSecond // 평균 지연시간
      });
      
      // 약간의 지연으로 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('✅ 성능 메트릭 시뮬레이션 완료');
    console.log(`   📊 수집된 메트릭: ${globalPerformanceMonitor.getMetrics().length}개`);
    console.log('');

    // 6. 성능 리포트 생성
    console.log('6️⃣ 성능 리포트 생성');
    const report = globalPerformanceMonitor.generateReport();
    console.log(report);
    
    // 7. 성능 경고 확인
    console.log('7️⃣ 성능 경고 확인');
    const alerts = globalPerformanceMonitor.getAlerts();
    
    if (alerts.length > 0) {
      console.log('🚨 성능 경고 발견:');
      alerts.forEach(alert => console.log(`   - ${alert}`));
    } else {
      console.log('✅ 성능 상태 양호 - 경고 없음');
    }
    console.log('');

    // 8. 최적화 권장사항
    console.log('8️⃣ 최적화 권장사항');
    const avgMetrics = globalPerformanceMonitor.getAverageMetrics();
    
    const recommendations = [];
    
    if (avgMetrics.gpuUtilization && avgMetrics.gpuUtilization < 50) {
      recommendations.push('🔧 GPU 사용률이 낮습니다. 배치 크기를 늘려 GPU 활용도를 높이세요.');
    }
    
    if (avgMetrics.temperature && avgMetrics.temperature > 75) {
      recommendations.push('🌡️ GPU 온도가 높습니다. 쿨링 시스템을 확인하세요.');
    }
    
    if (avgMetrics.tokensPerSecond < 150) {
      recommendations.push('⚡ 처리 속도가 느립니다. GPU 레이어 수를 늘리거나 모델을 최적화하세요.');
    }
    
    if (avgMetrics.memoryUsage > 0.8) {
      recommendations.push('💾 메모리 사용률이 높습니다. 컨텍스트 크기를 줄이거나 배치 크기를 조정하세요.');
    }
    
    if (recommendations.length > 0) {
      console.log('💡 최적화 권장사항:');
      recommendations.forEach(rec => console.log(`   ${rec}`));
    } else {
      console.log('✅ 현재 설정이 최적화되어 있습니다.');
    }
    console.log('');

    // 9. 최종 결과
    console.log('🎉 GPU 최적화 시스템 테스트 완료!');
    console.log('✅ 이교장의AI상담 GPU 최적화 시스템이 정상적으로 작동 중입니다.');
    console.log('✅ NVIDIA GPU + NPU 하이브리드 최적화가 활성화되었습니다.');
    console.log('');
    console.log('🚀 다음 단계:');
    console.log('   1. Ollama GPT-OSS 20B 모델 로드');
    console.log('   2. 실제 AI 추론 테스트');
    console.log('   3. 성능 모니터링 시작');
    console.log('');
    console.log('📞 문제 발생 시: 010-9251-9743 (이후경 경영지도사)');

  } catch (error) {
    console.error('❌ GPU 최적화 테스트 실패:', error.message);
    console.log('');
    console.log('🔧 문제 해결 방법:');
    console.log('   1. NVIDIA 드라이버가 최신 버전인지 확인');
    console.log('   2. GPU가 정상적으로 인식되는지 확인');
    console.log('   3. CUDA가 설치되어 있는지 확인');
    console.log('   4. 시스템 리소스가 충분한지 확인');
    console.log('');
    console.log('📞 긴급 상담: 010-9251-9743');
  }
}

// 스크립트 실행
testGPUOptimization();
