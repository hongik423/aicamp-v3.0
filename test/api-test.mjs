/**
 * AI 역량진단 API 시뮬레이션 테스트 (ES Module)
 */

import fetch from 'node-fetch';

// 45문항 응답 맵 생성 (문자열 키: "1"~"45")
const generateResponses = () => {
  const r = {};
  for (let i = 1; i <= 45; i += 1) {
    // 1~5 사이 균등 분포로 샘플 값 생성
    r[String(i)] = (i % 5) + 1; // 2..5,1 패턴
  }
  return r;
};

const sampleDiagnosisData = {
  // 기본 정보
  contactName: '홍길동',
  contactEmail: 'test@aicamp.club',
  contactPhone: '010-1234-5678',
  contactPosition: '대표이사',
  companyName: '테스트 기업',
  businessRegistration: '123-45-67890',
  establishmentYear: 2020,
  
  // 사업 현황
  industry: 'IT/소프트웨어',
  businessType: ['B2B 서비스'],
  location: '서울',
  employeeCount: '10-30명',
  annualRevenue: '10억-50억',
  marketPosition: '시장 진입 단계',
  competitiveAdvantage: '기술력 우위',
  
  // 현재 AI/디지털 현황 (8문항)
  aiFamiliarity: 3,
  currentAiTools: 2,
  aiUsageDepartments: 1,
  aiInvestmentHistory: 2,
  dataDigitalization: 3,
  currentSystems: 2,
  systemIntegration: 2,
  dataManagement: 3,
  
  // 조직 준비도 (8문항)
  changeReadiness: 4,
  leadershipSupport: 4,
  employeeAttitude: 3,
  changeManagementExperience: 2,
  budgetAllocation: 3,
  technicalPersonnel: 2,
  externalPartnership: 3,
  trainingInvestment: 3,
  
  // 기술 인프라 (9문항)
  dataQuality: 3,
  analyticsCapability: 2,
  decisionMaking: 3,
  cloudAdoption: 3,
  systemScalability: 2,
  integrationCapability: 2,
  securityMeasures: ['방화벽', '암호화'],
  complianceRequirements: ['개인정보보호법'],
  riskManagement: 3,
  
  // AI 목표 및 전략 (10문항)
  aiTransformationGoals: ['업무 효율성 향상', '고객 서비스 개선'],
  specificImprovements: '반복 업무 자동화를 통한 생산성 향상',
  expectedROI: '30-50%',
  successMetrics: ['생산성 지표', '고객 만족도'],
  timeframe: '6-12개월',
  priorityFunctions: ['마케팅', '고객서비스'],
  implementationApproach: '단계적 도입',
  resourceAllocation: {
    budget: '1,000-3,000만원',
    personnel: '2-3명',
    timeline: '6개월'
  },
  challengesAnticipated: ['직원 저항', '기술적 복잡성'],
  supportNeeds: ['전문가 컨설팅', '교육 프로그램'],
  
  timestamp: new Date().toISOString(),

  // 필수: 45문항 응답 데이터 (API 스펙: assessmentResponses 또는 responses 지원)
  responses: generateResponses()
};

async function testDiagnosisAPI() {
  console.log('🧪 AI 역량진단 API 시뮬레이션 테스트 시작...');
  console.log('=' .repeat(60));
  
  try {
    const startTime = Date.now();
    
    console.log('📤 API 호출 중...');
    const response = await fetch('http://localhost:3000/api/ai-diagnosis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sampleDiagnosisData),
    });
    
    const responseTime = Date.now() - startTime;
    console.log(`⏱️ API 응답 시간: ${responseTime}ms`);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}\n${errorText}`);
    }
    
    const result = await response.json();
    
    // 기본 응답 검증
    // 응답 필드 정규화 (현재 API는 data.* 하위에 핵심 정보를 포함)
    const normalized = {
      diagnosisId: result?.data?.diagnosisId ?? result?.diagnosisId,
      totalScore: result?.data?.totalScore ?? result?.data?.scoreAnalysis?.totalScore ?? result?.totalScore,
      maturityLevel: result?.data?.maturityLevel ?? result?.maturityLevel,
      percentile: result?.data?.percentile ?? result?.percentile,
      version: result?.data?.version ?? result?.version,
      scoreAnalysis: result?.data?.scoreAnalysis ?? result?.scoreAnalysis,
      processingInfo: result?.processingInfo,
    };

    console.log('\n✅ API 호출 성공!');
    console.log('📊 기본 진단 결과:');
    console.log(`- 성공 여부: ${result.success}`);
    console.log(`- 진단 ID: ${normalized.diagnosisId || 'N/A'}`);
    console.log(`- 총점: ${normalized.totalScore || 'N/A'}점`);
    console.log(`- 성숙도: ${normalized.maturityLevel || 'N/A'}`);
    console.log(`- 백분위: ${normalized.percentile || 'N/A'}%`);
    console.log(`- 시스템 버전: ${normalized.version || 'N/A'}`);
    
    // 새로운 기능 검증
    console.log('\n🔍 즉시 응답 내 검증(백그라운드 처리 제외):');
    const checks = [
      { name: '진단 ID 생성', status: !!normalized.diagnosisId },
      { name: '점수 분석 존재', status: !!normalized.scoreAnalysis },
      { name: '총점 산출', status: typeof normalized.totalScore === 'number' },
      { name: '처리 상태 포함', status: !!normalized.processingInfo },
    ];
    checks.forEach((c) => console.log(`${c.status ? '✅' : '❌'} ${c.name}`));
    
    // 전체 평가
    console.log('\n' + '=' .repeat(60));
    console.log('📋 시뮬레이션 테스트 결과 요약');
    console.log('=' .repeat(60));
    
    const features = [
      { name: '기본 진단', status: result.success === true },
      { name: '점수 분석', status: !!normalized.scoreAnalysis },
      { name: '즉시 총점 제공', status: typeof normalized.totalScore === 'number' },
      { name: '처리 상태 반환', status: !!normalized.processingInfo },
    ];
    
    const successCount = features.filter(f => f.status).length;
    const totalFeatures = features.length;
    
    console.log(`✅ 성공한 기능: ${successCount}/${totalFeatures}`);
    console.log(`❌ 실패한 기능: ${totalFeatures - successCount}/${totalFeatures}`);
    console.log(`⏱️ 전체 처리 시간: ${responseTime}ms`);
    
    features.forEach(feature => {
      console.log(`${feature.status ? '✅' : '❌'} ${feature.name}`);
    });
    
    if (successCount === totalFeatures) {
      console.log('\n🎉 모든 기능이 정상 작동합니다! 시스템이 완벽하게 구축되었습니다.');
    } else {
      console.log('\n⚠️ 일부 기능에서 문제가 발견되었습니다. 오류를 분석하고 수정이 필요합니다.');
      
      // 실패한 기능들 상세 분석
      const failedFeatures = features.filter(f => !f.status);
      console.log('\n🔍 실패한 기능 상세:');
      failedFeatures.forEach(feature => {
        console.log(`❌ ${feature.name}: 구현 확인 필요`);
      });
    }
    
    return {
      success: true,
      responseTime,
      result,
      features: { success: successCount, total: totalFeatures }
    };
    
  } catch (error) {
    console.error('\n❌ API 호출 실패:');
    console.error(`오류 메시지: ${error.message}`);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.error('\n💡 해결 방법:');
      console.error('1. 개발 서버가 실행 중인지 확인하세요: npm run dev');
      console.error('2. 포트 3000이 사용 가능한지 확인하세요');
      console.error('3. 방화벽 설정을 확인하세요');
    }
    
    return {
      success: false,
      error: error.message
    };
  }
}

// 테스트 실행
testDiagnosisAPI().then(result => {
  process.exit(result.success ? 0 : 1);
});
