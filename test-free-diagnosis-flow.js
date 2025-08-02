/**
 * AICAMP AI 무료진단 시스템 전체 테스트
 * 1. 진단 신청서 제출
 * 2. AI 분석 및 보고서 생성
 * 3. 이메일 전송
 * 4. 구글 시트 저장
 */

const testFreeDiagnosisFlow = async () => {
  console.log('🧪 AICAMP AI 무료진단 시스템 전체 테스트 시작\n');
  
  const testData = {
    companyName: '테스트기업_' + new Date().getTime(),
    representativeName: '홍길동',
    position: '대표이사',
    industry: 'it',
    region: 'seoul',
    businessContent: '소프트웨어 개발 및 AI 솔루션 컨설팅 서비스를 제공하는 기업입니다. 주요 고객사는 중소기업이며, 디지털 전환 컨설팅을 전문으로 합니다.',
    concerns: ['ai_adoption', 'employee_training'],
    expectations: 'AI 도입을 통한 업무 효율성 향상과 직원들의 AI 활용 능력 강화를 기대합니다. 특히 개발 프로세스 자동화와 고객 서비스 개선을 목표로 합니다.',
    email: 'test@example.com',
    phone: '010-1234-5678',
    agreeToTerms: true,
    
    // 기업 규모 정보
    employeeCount: '10-50',
    annualRevenue: '10-50억',
    businessHistory: '3-5년',
    
    // AI 역량 진단 점수 (1-5)
    ceoAIVision: 4,
    aiInvestment: 3,
    aiStrategy: 3,
    changeManagement: 4,
    riskTolerance: 3,
    itInfrastructure: 4,
    dataManagement: 3,
    securityLevel: 4,
    aiToolsAdopted: 2,
    digitalLiteracy: 3,
    aiToolUsage: 2,
    learningAgility: 4,
    dataAnalysis: 3,
    innovationCulture: 4,
    collaborationLevel: 4,
    experimentCulture: 3,
    continuousLearning: 4,
    processAutomation: 2,
    decisionMaking: 3,
    customerService: 3
  };

  console.log('📋 테스트 데이터:', {
    회사명: testData.companyName,
    업종: testData.industry,
    지역: testData.region,
    이메일: testData.email
  });

  try {
    console.log('\n1️⃣ AI 무료진단 신청서 제출 중...');
    
    const response = await fetch('http://localhost:3000/api/google-script-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'submitFreeDiagnosis',
        data: testData
      })
    });

    const result = await response.json();
    console.log('\n✅ 응답 수신:', result);

    if (!result.success) {
      throw new Error(`진단 신청 실패: ${result.error || '알 수 없는 오류'}`);
    }

    const diagnosisId = result.diagnosisId;
    console.log('\n2️⃣ 진단 ID 생성:', diagnosisId);

    // 잠시 대기 (AI 분석 처리 시간)
    console.log('\n⏳ AI 분석 처리 중... (10초 대기)');
    await new Promise(resolve => setTimeout(resolve, 10000));

    // 진단 결과 조회
    console.log('\n3️⃣ 진단 결과 조회 중...');
    const resultResponse = await fetch('http://localhost:3000/api/google-script-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'getDiagnosisResult',
        diagnosisId: diagnosisId
      })
    });

    const diagnosisResult = await resultResponse.json();
    console.log('\n✅ 진단 결과:', {
      success: diagnosisResult.success,
      hasResult: !!diagnosisResult.result,
      status: diagnosisResult.status
    });

    // 결과 상세 출력
    if (diagnosisResult.result) {
      console.log('\n📊 AI 분석 결과 요약:');
      console.log('- 총점:', diagnosisResult.result.totalScore);
      console.log('- 등급:', diagnosisResult.result.grade);
      console.log('- 분석 완료:', diagnosisResult.result.analysisCompleted);
    }

    console.log('\n✅ 테스트 완료!');
    console.log('\n📌 확인 사항:');
    console.log('1. 구글 시트 확인: https://docs.google.com/spreadsheets/d/1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0');
    console.log('2. 관리자 이메일 확인: hongik423@gmail.com');
    console.log('3. 테스트 이메일 확인:', testData.email);

  } catch (error) {
    console.error('\n❌ 테스트 실패:', error.message);
    console.error('상세 오류:', error);
  }
};

// 테스트 실행
testFreeDiagnosisFlow();