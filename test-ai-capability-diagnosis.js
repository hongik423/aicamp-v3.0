/**
 * AI 역량진단 시스템 테스트 스크립트
 * 
 * 사용법:
 * 1. 터미널에서 실행: node test-ai-capability-diagnosis.js
 * 2. 브라우저에서 http://localhost:3000/diagnosis 접속하여 테스트
 */

const testData = {
  // 기본 정보
  companyName: "테스트 기업",
  industry: "it",
  companySize: "50-199",
  region: "seoul",
  
  // 신청자 정보
  applicantName: "홍길동",
  position: "대표이사",
  email: "test@example.com",
  phone: "010-1234-5678",
  
  // 사업 정보
  businessDetails: "AI 기반 솔루션 개발 및 컨설팅 서비스를 제공하는 IT 기업입니다.",
  mainConcerns: ["ai_adoption", "talent_shortage", "roi_uncertainty"],
  expectedBenefits: ["efficiency", "innovation", "competitive_advantage"],
  
  // AI 역량 평가 응답 (24개 문항, 1-5점)
  assessmentResponses: {
    // 리더십 (L)
    "L1": 4, // 경영진 AI 중요성 인식
    "L2": 3, // AI 비전과 로드맵
    "L3": 4, // 경영진 의사결정 참여
    "L4": 3, // AI 예산 배정
    
    // 인프라 (I)
    "I1": 3, // AI 도구 통합
    "I2": 4, // 데이터 관리 시스템
    "I3": 2, // AI 보안 가이드라인
    "I4": 3, // 클라우드 AI 서비스
    
    // 직원 역량 (E)
    "E1": 3, // AI 도구 활용
    "E2": 2, // AI 교육 프로그램
    "E3": 3, // AI 활용 향상
    "E4": 2, // AI 전문 인력
    
    // 조직 문화 (C)
    "C1": 4, // AI 혁신 문화
    "C2": 3, // AI 수용도
    "C3": 3, // 지식 공유
    "C4": 2, // AI 인센티브
    
    // 실무 적용 (P)
    "P1": 4, // 업무 자동화
    "P2": 3, // 고객 서비스
    "P3": 3, // 의사결정 지원
    "P4": 3, // 제품/서비스 혁신
    
    // 데이터 역량 (D)
    "D1": 4, // 데이터 수집/관리
    "D2": 3, // 데이터 기반 의사결정
    "D3": 3, // 데이터 품질
    "D4": 2  // 실시간 분석
  },
  
  // 추가 정보
  currentAIUsage: "partial",
  aiInvestmentPlan: "6months",
  additionalRequests: "직원들의 AI 활용 역량을 높이고 싶습니다.",
  
  // 동의 사항
  privacyConsent: true,
  marketingConsent: true
};

// API 테스트 함수
async function testAICapabilityDiagnosis() {
  console.log('🚀 AI 역량진단 시스템 테스트 시작...\n');
  
  try {
    // 1. 진단 신청 테스트
    console.log('1️⃣ 진단 신청 테스트');
    const response = await fetch('http://localhost:3000/api/ai-capability-diagnosis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...testData,
        formType: 'ai-capability-diagnosis'
      })
    });
    
    const result = await response.json();
    console.log('응답:', result);
    
    if (result.success && result.diagnosisId) {
      console.log('✅ 진단 신청 성공!');
      console.log(`진단 ID: ${result.diagnosisId}\n`);
      
      // 2. 진단 상태 확인 테스트
      console.log('2️⃣ 진단 상태 확인 테스트');
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2초 대기
      
      const statusResponse = await fetch(
        `http://localhost:3000/api/ai-capability-diagnosis/status?diagnosisId=${result.diagnosisId}`,
        { method: 'GET' }
      );
      
      const statusResult = await statusResponse.json();
      console.log('상태:', statusResult);
      
      // 3. 진단 결과 조회 테스트 (처리 완료 후)
      console.log('\n3️⃣ 진단 결과 조회 테스트');
      console.log('(실제 환경에서는 5-10분 후 결과를 확인할 수 있습니다)');
      console.log(`결과 확인 URL: http://localhost:3000/diagnosis/result/${result.diagnosisId}`);
      
    } else {
      console.error('❌ 진단 신청 실패:', result.error);
    }
    
  } catch (error) {
    console.error('❌ 테스트 중 오류 발생:', error);
  }
  
  console.log('\n📊 테스트 완료!');
}

// 점수 계산 테스트
function testScoreCalculation() {
  console.log('\n📈 점수 계산 테스트');
  
  const categories = {
    leadership: [],
    infrastructure: [],
    employeeCapability: [],
    culture: [],
    practicalApplication: [],
    dataCapability: []
  };
  
  // 응답을 카테고리별로 분류
  Object.entries(testData.assessmentResponses).forEach(([key, value]) => {
    const category = key.charAt(0);
    switch(category) {
      case 'L': categories.leadership.push(value); break;
      case 'I': categories.infrastructure.push(value); break;
      case 'E': categories.employeeCapability.push(value); break;
      case 'C': categories.culture.push(value); break;
      case 'P': categories.practicalApplication.push(value); break;
      case 'D': categories.dataCapability.push(value); break;
    }
  });
  
  // 카테고리별 평균 계산
  console.log('\n카테고리별 점수:');
  let totalScore = 0;
  Object.entries(categories).forEach(([category, scores]) => {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const percentScore = Math.round((avg / 5) * 100);
    console.log(`- ${category}: ${percentScore}점 (평균 ${avg.toFixed(1)}/5)`);
    totalScore += percentScore;
  });
  
  const finalScore = Math.round(totalScore / 6);
  console.log(`\n종합 점수: ${finalScore}점`);
  
  // 등급 계산
  let grade = 'F';
  if (finalScore >= 90) grade = 'S';
  else if (finalScore >= 80) grade = 'A';
  else if (finalScore >= 70) grade = 'B';
  else if (finalScore >= 60) grade = 'C';
  else if (finalScore >= 50) grade = 'D';
  
  console.log(`등급: ${grade}`);
}

// 메인 실행
if (require.main === module) {
  console.log('🔍 이후경 교장의 AI 역량 고몰입조직구축 진단시스템 테스트\n');
  console.log('테스트 데이터:');
  console.log(`- 기업명: ${testData.companyName}`);
  console.log(`- 업종: ${testData.industry}`);
  console.log(`- 규모: ${testData.companySize}`);
  console.log(`- 신청자: ${testData.applicantName} (${testData.position})`);
  
  // 점수 계산 테스트
  testScoreCalculation();
  
  // API 테스트 실행
  console.log('\n🌐 API 테스트를 시작하려면 Enter를 누르세요...');
  process.stdin.once('data', () => {
    testAICapabilityDiagnosis();
  });
}