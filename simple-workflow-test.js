/**
 * 🔄 간단한 AI 진단 워크플로우 테스트
 */

const testData = {
  // 필수 필드들
  companyName: "AI혁신기업",
  contactName: "김혁신",
  contactEmail: "test@company.com",
  
  // 추가 정보
  industry: "제조업",
  employeeCount: 120,
  contactPosition: "대표이사",
  contactPhone: "010-1234-5678",
  
  // 45문항 응답 (API에서 요구하는 형식)
  assessmentResponses: [
    { questionId: 1, value: 4, sectionId: 1 },
    { questionId: 2, value: 3, sectionId: 1 },
    { questionId: 3, value: 4, sectionId: 1 },
    { questionId: 4, value: 2, sectionId: 1 },
    { questionId: 5, value: 4, sectionId: 1 },
    { questionId: 6, value: 3, sectionId: 1 },
    { questionId: 7, value: 4, sectionId: 1 },
    { questionId: 8, value: 3, sectionId: 1 },
    { questionId: 9, value: 2, sectionId: 2 },
    { questionId: 10, value: 3, sectionId: 2 },
    { questionId: 11, value: 4, sectionId: 2 },
    { questionId: 12, value: 3, sectionId: 2 },
    { questionId: 13, value: 2, sectionId: 2 },
    { questionId: 14, value: 4, sectionId: 2 },
    { questionId: 15, value: 3, sectionId: 2 },
    { questionId: 16, value: 3, sectionId: 2 },
    { questionId: 17, value: 4, sectionId: 3 },
    { questionId: 18, value: 3, sectionId: 3 },
    { questionId: 19, value: 4, sectionId: 3 },
    { questionId: 20, value: 3, sectionId: 3 },
    { questionId: 21, value: 4, sectionId: 3 },
    { questionId: 22, value: 3, sectionId: 3 },
    { questionId: 23, value: 4, sectionId: 3 },
    { questionId: 24, value: 3, sectionId: 3 },
    { questionId: 25, value: 3, sectionId: 4 },
    { questionId: 26, value: 3, sectionId: 4 },
    { questionId: 27, value: 4, sectionId: 4 },
    { questionId: 28, value: 3, sectionId: 4 },
    { questionId: 29, value: 3, sectionId: 4 },
    { questionId: 30, value: 4, sectionId: 4 },
    { questionId: 31, value: 3, sectionId: 4 },
    { questionId: 32, value: 3, sectionId: 4 },
    { questionId: 33, value: 4, sectionId: 5 },
    { questionId: 34, value: 4, sectionId: 5 },
    { questionId: 35, value: 5, sectionId: 5 },
    { questionId: 36, value: 4, sectionId: 5 },
    { questionId: 37, value: 4, sectionId: 5 },
    { questionId: 38, value: 4, sectionId: 5 },
    { questionId: 39, value: 4, sectionId: 5 },
    { questionId: 40, value: 4, sectionId: 5 },
    { questionId: 41, value: 3, sectionId: 6 },
    { questionId: 42, value: 4, sectionId: 6 },
    { questionId: 43, value: 3, sectionId: 6 },
    { questionId: 44, value: 4, sectionId: 6 },
    { questionId: 45, value: 3, sectionId: 6 }
  ]
};

async function testWorkflow() {
  console.log('🔄 AI 진단 워크플로우 테스트');
  console.log('=' .repeat(50));
  
  try {
    console.log('📤 데이터 전송 중...');
    
    const response = await fetch('http://localhost:3000/api/test-simple-diagnosis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ 테스트 성공!');
      console.log(`📊 총점: ${result.diagnosis?.totalScore || 'N/A'}점`);
      console.log(`🎯 프로그램: ${result.aicampPrograms?.recommended?.length || 0}개`);
      console.log(`💰 ROI: ${result.aicampPrograms?.roi?.roi || 'N/A'}%`);
    } else {
      console.log('❌ 실패:', result.error);
    }
    
  } catch (error) {
    console.log('💥 오류:', error.message);
  }
}

testWorkflow();
