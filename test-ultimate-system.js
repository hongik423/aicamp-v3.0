/**
 * 🏆 Ultimate Report 시스템 테스트
 * AICAMP 프로그램 통합 및 맥킨지급 보고서 생성 테스트
 */

const testCases = [
  {
    name: "제조업 중소기업",
    data: {
      companyName: "혁신제조 주식회사",
      industry: "제조업",
      employeeCount: 85,
      totalScore: 72
    }
  },
  {
    name: "IT 스타트업",
    data: {
      companyName: "테크이노베이션",
      industry: "IT/소프트웨어",
      employeeCount: 25,
      totalScore: 65
    }
  },
  {
    name: "유통업 대기업",
    data: {
      companyName: "글로벌리테일",
      industry: "유통/리테일",
      employeeCount: 150,
      totalScore: 78
    }
  }
];

async function testUltimateReportSystem() {
  console.log('🏆 Ultimate Report 시스템 종합 테스트');
  console.log('=' .repeat(70));
  
  let successCount = 0;
  let totalTests = testCases.length;
  
  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    console.log(`\n📋 테스트 ${i + 1}/${totalTests}: ${testCase.name}`);
    console.log('-' .repeat(50));
    
    try {
      console.log(`🏢 기업: ${testCase.data.companyName}`);
      console.log(`🏭 업종: ${testCase.data.industry}`);
      console.log(`👥 직원: ${testCase.data.employeeCount}명`);
      console.log(`📊 점수: ${testCase.data.totalScore}점`);
      
      const startTime = Date.now();
      
      const response = await fetch('http://localhost:3000/api/test-ultimate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase.data)
      });
      
      const processingTime = Date.now() - startTime;
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        console.log(`✅ 테스트 성공! (${processingTime}ms)`);
        
        // 결과 분석
        const data = result.data;
        console.log(`📈 분석 결과:`);
        console.log(`  • 추천 프로그램: ${data.aicampPrograms.recommendedCount}개`);
        console.log(`  • 총 투자 비용: ${data.aicampPrograms.totalInvestment}만원`);
        console.log(`  • 예상 ROI: ${data.aicampPrograms.expectedROI}%`);
        console.log(`  • 투자 회수: ${data.aicampPrograms.paybackPeriod}`);
        console.log(`  • 업종 분석: ${data.industryAnalysis.industry}`);
        console.log(`  • 문제점: ${data.industryAnalysis.painPointsCount}개`);
        console.log(`  • 보고서 크기: ${data.reportSize}`);
        
        successCount++;
        
      } else {
        console.log(`❌ 테스트 실패: ${result.error}`);
      }
      
    } catch (error) {
      console.log(`💥 오류 발생: ${error.message}`);
      
      if (error.message.includes('ECONNREFUSED')) {
        console.log('💡 개발 서버가 실행 중인지 확인하세요: npm run dev');
        break;
      }
    }
  }
  
  console.log('\n' + '=' .repeat(70));
  console.log(`🎯 테스트 완료: ${successCount}/${totalTests} 성공`);
  
  if (successCount === totalTests) {
    console.log('🎉 모든 테스트 통과! Ultimate Report 시스템이 완벽하게 작동합니다.');
    
    // 추가 기능 테스트
    await testAdditionalFeatures();
    
  } else {
    console.log('⚠️  일부 테스트 실패. 시스템 점검이 필요합니다.');
  }
}

async function testAdditionalFeatures() {
  console.log('\n🔧 추가 기능 테스트');
  console.log('-' .repeat(50));
  
  try {
    // GET 요청으로 시스템 정보 확인
    console.log('📡 시스템 정보 조회...');
    const infoResponse = await fetch('http://localhost:3000/api/test-ultimate-report');
    
    if (infoResponse.ok) {
      const info = await infoResponse.json();
      console.log(`✅ 시스템 정보:`);
      console.log(`  • 사용 가능한 프로그램: ${info.availablePrograms}개`);
      console.log(`  • API 엔드포인트: 정상`);
      console.log(`  • 타임스탬프: ${info.timestamp}`);
    }
    
    // 브라우저 테스트 안내
    console.log('\n🌐 브라우저 테스트 안내:');
    console.log('  1. http://localhost:3000/ai-diagnosis - AI 진단 시작');
    console.log('  2. http://localhost:3000/diagnosis/result - 결과 보고서 확인');
    console.log('  3. Ultimate Report 다운로드 기능 테스트');
    
  } catch (error) {
    console.log(`⚠️  추가 기능 테스트 중 오류: ${error.message}`);
  }
}

async function checkServerStatus() {
  console.log('🔍 서버 상태 확인 중...');
  
  try {
    const response = await fetch('http://localhost:3000/api/health', {
      method: 'GET'
    });
    
    if (response.ok) {
      console.log('✅ 서버가 정상 실행 중입니다.');
      return true;
    } else {
      console.log(`⚠️  서버 응답 이상: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log('❌ 서버에 연결할 수 없습니다.');
    console.log('💡 다음 명령어로 개발 서버를 시작하세요:');
    console.log('   npm run dev');
    return false;
  }
}

// 테스트 실행
async function main() {
  const serverOk = await checkServerStatus();
  
  if (serverOk) {
    await testUltimateReportSystem();
  } else {
    console.log('🚫 서버가 실행되지 않아 테스트를 중단합니다.');
  }
}

main();
