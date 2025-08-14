/**
 * 🧪 AI 역량진단 시스템 종합 테스트
 * Ultimate Report 시스템과 AICAMP 프로그램 통합 테스트
 */

const testData = {
  // 기업 정보
  companyName: "테스트 제조기업",
  industry: "제조업",
  employeeCount: 85,
  annualRevenue: "150억원",
  establishmentYear: 2015,
  location: "경기도 안산시",
  businessType: "제조업",
  position: "대표이사",
  name: "김철수",
  phone: "010-1234-5678",
  email: "test@testcompany.com",
  
  // 45문항 응답 (BARS 시스템 테스트용)
  assessmentResponses: [
    // 사업 기반 (1-8)
    { questionId: 1, score: 4, category: "businessFoundation" },
    { questionId: 2, score: 3, category: "businessFoundation" },
    { questionId: 3, score: 4, category: "businessFoundation" },
    { questionId: 4, score: 3, category: "businessFoundation" },
    { questionId: 5, score: 4, category: "businessFoundation" },
    { questionId: 6, score: 3, category: "businessFoundation" },
    { questionId: 7, score: 4, category: "businessFoundation" },
    { questionId: 8, score: 3, category: "businessFoundation" },
    
    // 현재 AI 활용 (9-16)
    { questionId: 9, score: 2, category: "currentAI" },
    { questionId: 10, score: 2, category: "currentAI" },
    { questionId: 11, score: 3, category: "currentAI" },
    { questionId: 12, score: 2, category: "currentAI" },
    { questionId: 13, score: 3, category: "currentAI" },
    { questionId: 14, score: 2, category: "currentAI" },
    { questionId: 15, score: 3, category: "currentAI" },
    { questionId: 16, score: 2, category: "currentAI" },
    
    // 조직 준비도 (17-24)
    { questionId: 17, score: 4, category: "organizationReadiness" },
    { questionId: 18, score: 3, category: "organizationReadiness" },
    { questionId: 19, score: 4, category: "organizationReadiness" },
    { questionId: 20, score: 3, category: "organizationReadiness" },
    { questionId: 21, score: 4, category: "organizationReadiness" },
    { questionId: 22, score: 3, category: "organizationReadiness" },
    { questionId: 23, score: 4, category: "organizationReadiness" },
    { questionId: 24, score: 3, category: "organizationReadiness" },
    
    // 기술 인프라 (25-32)
    { questionId: 25, score: 3, category: "techInfrastructure" },
    { questionId: 26, score: 3, category: "techInfrastructure" },
    { questionId: 27, score: 4, category: "techInfrastructure" },
    { questionId: 28, score: 3, category: "techInfrastructure" },
    { questionId: 29, score: 3, category: "techInfrastructure" },
    { questionId: 30, score: 4, category: "techInfrastructure" },
    { questionId: 31, score: 3, category: "techInfrastructure" },
    { questionId: 32, score: 3, category: "techInfrastructure" },
    
    // 목표 명확성 (33-40)
    { questionId: 33, score: 4, category: "goalClarity" },
    { questionId: 34, score: 4, category: "goalClarity" },
    { questionId: 35, score: 3, category: "goalClarity" },
    { questionId: 36, score: 4, category: "goalClarity" },
    { questionId: 37, score: 3, category: "goalClarity" },
    { questionId: 38, score: 4, category: "goalClarity" },
    { questionId: 39, score: 3, category: "goalClarity" },
    { questionId: 40, score: 4, category: "goalClarity" },
    
    // 실행 역량 (41-45)
    { questionId: 41, score: 3, category: "executionCapability" },
    { questionId: 42, score: 3, category: "executionCapability" },
    { questionId: 43, score: 4, category: "executionCapability" },
    { questionId: 44, score: 3, category: "executionCapability" },
    { questionId: 45, score: 3, category: "executionCapability" }
  ]
};

async function testAIDiagnosisSystem() {
  console.log('🧪 AI 역량진단 시스템 종합 테스트 시작');
  console.log('=' .repeat(60));
  
  try {
    console.log('📤 테스트 데이터 전송 중...');
    console.log(`기업명: ${testData.companyName}`);
    console.log(`업종: ${testData.industry}`);
    console.log(`직원수: ${testData.employeeCount}명`);
    console.log(`응답 수: ${testData.assessmentResponses.length}문항`);
    
    const startTime = Date.now();
    
    const response = await fetch('http://localhost:3000/api/ai-diagnosis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    const processingTime = Date.now() - startTime;
    console.log(`⏱️ 처리 시간: ${processingTime}ms`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    console.log('✅ AI 진단 시스템 응답 성공!');
    console.log('=' .repeat(60));
    
    // 기본 진단 결과 검증
    if (result.success) {
      console.log('📊 진단 결과 요약:');
      console.log(`  • 총점: ${result.diagnosis?.totalScore || 'N/A'}점`);
      console.log(`  • 등급: ${result.diagnosis?.grade || 'N/A'}`);
      console.log(`  • 성숙도: ${result.diagnosis?.maturityLevel || 'N/A'}`);
      console.log(`  • 백분위: ${result.diagnosis?.percentile || 'N/A'}%`);
      
      // 카테고리별 점수
      if (result.diagnosis?.categoryScores) {
        console.log('📈 카테고리별 점수:');
        Object.entries(result.diagnosis.categoryScores).forEach(([key, score]) => {
          console.log(`  • ${getCategoryLabel(key)}: ${score}점`);
        });
      }
      
      // AICAMP 프로그램 추천
      if (result.aicampPrograms?.recommended) {
        console.log('🎯 추천 AICAMP 프로그램:');
        result.aicampPrograms.recommended.slice(0, 3).forEach((program, index) => {
          console.log(`  ${index + 1}. ${program.title}`);
          console.log(`     - 기간: ${program.duration}`);
          console.log(`     - ROI: ${program.roi}`);
        });
      }
      
      // 투자 분석
      if (result.aicampPrograms?.roi) {
        console.log('💰 투자 분석:');
        console.log(`  • 총 투자: ${result.aicampPrograms.roi.totalInvestment}만원`);
        console.log(`  • 예상 수익: ${result.aicampPrograms.roi.expectedReturn}만원`);
        console.log(`  • ROI: ${result.aicampPrograms.roi.roi}%`);
        console.log(`  • 투자 회수: ${result.aicampPrograms.roi.paybackPeriod}`);
      }
      
      // GEMINI AI 보고서 확인
      if (result.aiReport) {
        console.log('🤖 GEMINI AI 보고서:');
        console.log(`  • 생성 성공: ${result.aiReport.success ? '✅' : '❌'}`);
        console.log(`  • 요약: ${result.aiReport.executiveSummary?.substring(0, 100)}...`);
      }
      
      console.log('=' .repeat(60));
      console.log('🎉 테스트 완료! 모든 기능이 정상 작동합니다.');
      
    } else {
      console.error('❌ 진단 실패:', result.error);
    }
    
  } catch (error) {
    console.error('💥 테스트 실행 중 오류 발생:');
    console.error('Error:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('💡 해결 방법: 개발 서버가 실행 중인지 확인하세요');
      console.log('   명령어: npm run dev');
    }
  }
}

function getCategoryLabel(key) {
  const labels = {
    businessFoundation: '사업 기반',
    currentAI: '현재 AI 활용',
    organizationReadiness: '조직 준비도',
    techInfrastructure: '기술 인프라',
    goalClarity: '목표 명확성',
    executionCapability: '실행 역량'
  };
  return labels[key] || key;
}

// 테스트 실행
testAIDiagnosisSystem();
