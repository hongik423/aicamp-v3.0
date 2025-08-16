/**
 * 🧪 V15.0 ULTIMATE 45Q 시스템 통합 테스트
 * 전체 워크플로우가 제대로 동작하는지 확인
 */

import fetch from 'node-fetch';

const TEST_DATA = {
  companyName: "테스트컴퍼니",
  contactName: "홍길동",
  contactEmail: "test@example.com",
  contactPhone: "010-1234-5678",
  industry: "제조업",
  employeeCount: "50-100명",
  annualRevenue: "100억원 이상",
  businessContent: "스마트 제조업 솔루션 개발",
  responses: {
    "1": 4, "2": 3, "3": 5, "4": 4, "5": 3, "6": 4, "7": 5, "8": 3,
    "9": 4, "10": 3, "11": 5, "12": 4, "13": 3, "14": 4, "15": 5,
    "16": 3, "17": 4, "18": 3, "19": 5, "20": 4, "21": 3, "22": 4,
    "23": 5, "24": 3, "25": 4, "26": 3, "27": 5, "28": 4, "29": 3,
    "30": 4, "31": 5, "32": 3, "33": 4, "34": 3, "35": 5, "36": 4,
    "37": 3, "38": 4, "39": 5, "40": 3, "41": 4, "42": 3, "43": 5,
    "44": 4, "45": 3
  }
};

async function testSystemIntegration() {
  console.log('🧪 V15.0 ULTIMATE 45Q 시스템 통합 테스트 시작');
  console.log('=' .repeat(60));
  
  try {
    // 1. API 엔드포인트 테스트
    console.log('📡 1단계: AI 진단 API 엔드포인트 테스트');
    
    const apiUrl = 'http://localhost:3000/api/ai-diagnosis';
    
    console.log('🔄 요청 전송 중...');
    console.log('📊 테스트 데이터:', {
      companyName: TEST_DATA.companyName,
      industry: TEST_DATA.industry,
      responseCount: Object.keys(TEST_DATA.responses).length
    });
    
    const startTime = Date.now();
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(TEST_DATA)
    });
    
    const processingTime = Date.now() - startTime;
    
    console.log(`⏱️ 응답 시간: ${processingTime}ms`);
    console.log(`📡 HTTP 상태: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API 응답 오류:', errorText);
      return false;
    }
    
    const result = await response.json();
    
    console.log('✅ API 응답 성공');
    console.log('📋 응답 데이터 구조:');
    console.log('  - success:', result.success);
    console.log('  - message:', result.message);
    console.log('  - diagnosisId:', result.data?.diagnosisId);
    console.log('  - version:', result.data?.version);
    
    if (result.data?.scoreAnalysis) {
      console.log('📊 점수 분석 결과:');
      console.log('  - 총점:', result.data.scoreAnalysis.totalScore);
      console.log('  - 등급:', result.data.scoreAnalysis.grade);
      console.log('  - 성숙도:', result.data.scoreAnalysis.maturityLevel);
    }
    
    if (result.processingInfo) {
      console.log('⚙️ 처리 상태:');
      console.log('  - 상태:', result.processingInfo.status);
      console.log('  - 로컬 분석:', result.processingInfo.localAnalysis);
      console.log('  - 이메일 발송:', result.processingInfo.emailSending);
    }
    
    // 2. 기능별 검증
    console.log('\n🔍 2단계: 기능별 검증');
    
    const checks = [
      { name: '45개 질문 검증', passed: Object.keys(TEST_DATA.responses).length === 45 },
      { name: 'API 응답 성공', passed: result.success === true },
      { name: '진단 ID 생성', passed: !!result.data?.diagnosisId },
      { name: '점수 분석 완료', passed: !!result.data?.scoreAnalysis },
      { name: '버전 정보', passed: result.data?.version?.includes('V15.0') },
      { name: '처리 시간 측정', passed: processingTime > 0 }
    ];
    
    checks.forEach(check => {
      const status = check.passed ? '✅' : '❌';
      console.log(`  ${status} ${check.name}`);
    });
    
    const passedChecks = checks.filter(c => c.passed).length;
    const totalChecks = checks.length;
    
    console.log(`\n📈 검증 결과: ${passedChecks}/${totalChecks} 통과 (${Math.round(passedChecks/totalChecks*100)}%)`);
    
    // 3. 성능 평가
    console.log('\n⚡ 3단계: 성능 평가');
    
    const performanceGrades = [
      { metric: '응답 시간', value: processingTime, unit: 'ms', 
        grade: processingTime < 5000 ? 'A' : processingTime < 10000 ? 'B' : 'C' },
      { metric: '데이터 완성도', value: passedChecks, unit: `/${totalChecks}`, 
        grade: passedChecks === totalChecks ? 'A' : passedChecks >= totalChecks * 0.8 ? 'B' : 'C' }
    ];
    
    performanceGrades.forEach(perf => {
      console.log(`  📊 ${perf.metric}: ${perf.value}${perf.unit} (등급: ${perf.grade})`);
    });
    
    // 4. 최종 결과
    console.log('\n' + '=' .repeat(60));
    
    if (result.success && passedChecks >= totalChecks * 0.8) {
      console.log('🎉 시스템 통합 테스트 성공!');
      console.log('✅ V15.0 ULTIMATE 45Q 시스템이 정상적으로 동작합니다.');
      
      if (result.data?.features) {
        console.log('\n🚀 활성화된 기능:');
        result.data.features.forEach(feature => {
          console.log(`  ✨ ${feature}`);
        });
      }
      
      return true;
    } else {
      console.log('⚠️ 시스템 통합 테스트 부분 실패');
      console.log('🔧 일부 기능에 문제가 있을 수 있습니다.');
      return false;
    }
    
  } catch (error) {
    console.error('❌ 시스템 통합 테스트 실패:', error.message);
    console.error('🔧 오류 상세:', error.stack);
    return false;
  }
}

// 테스트 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  testSystemIntegration()
    .then(success => {
      console.log('\n' + '=' .repeat(60));
      if (success) {
        console.log('🎯 결론: 시스템이 정상적으로 동작합니다!');
        process.exit(0);
      } else {
        console.log('🚨 결론: 시스템에 문제가 있습니다.');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('💥 테스트 실행 중 치명적 오류:', error);
      process.exit(1);
    });
}

export { testSystemIntegration };
