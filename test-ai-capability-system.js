/**
 * AI 역량 진단 시스템 테스트 스크립트
 * 이 파일을 터미널에서 실행하여 전체 시스템을 테스트합니다.
 */

const fetch = require('node-fetch');
const colors = require('colors');

// 테스트 환경 설정
const API_BASE_URL = 'http://localhost:3000';
const TEST_DATA = {
  // 기본 정보
  companyName: 'AI테스트기업',
  representativeName: '홍길동',
  position: '대표이사',
  industry: 'IT/소프트웨어',
  region: '서울',
  email: 'test@aicamp.club',
  phone: '010-1234-5678',
  
  // 사업 정보
  businessContent: 'AI 기반 업무 자동화 솔루션 개발 및 컨설팅 서비스를 제공하는 스타트업입니다.',
  employeeCount: '10-49',
  annualRevenue: '10-50억',
  businessHistory: '1-3년',
  
  // 경영 고민사항
  concerns: ['디지털 전환', 'AI 도입', '업무 효율화'],
  expectations: 'AI 도구를 활용한 업무 자동화로 생산성을 50% 이상 향상시키고자 합니다.',
  
  // AI 역량 진단 점수 (1-5점)
  ceoAIVision: 4,
  aiInvestment: 3,
  aiStrategy: 3,
  changeManagement: 4,
  riskTolerance: 3,
  itInfrastructure: 4,
  dataManagement: 3,
  securityLevel: 4,
  aiToolsAdopted: 3,
  digitalLiteracy: 3,
  aiToolUsage: 3,
  learningAgility: 4,
  dataAnalysis: 3,
  innovationCulture: 4,
  collaborationLevel: 3,
  experimentCulture: 3,
  continuousLearning: 4,
  processAutomation: 3,
  decisionMaking: 3,
  customerService: 3,
  
  // 동의
  agreeToTerms: true
};

async function testAICapabilitySystem() {
  console.log('🚀 AI 역량 진단 시스템 테스트 시작'.cyan);
  console.log('================================'.cyan);
  
  try {
    // 1. API 엔드포인트 테스트
    console.log('\n1️⃣ API 엔드포인트 테스트'.yellow);
    const apiResponse = await fetch(`${API_BASE_URL}/api/simplified-diagnosis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...TEST_DATA,
        growthStage: '성장기',
        businessLocation: TEST_DATA.region,
        mainConcerns: TEST_DATA.concerns.join(', '),
        expectedBenefits: TEST_DATA.expectations,
        privacyConsent: TEST_DATA.agreeToTerms,
        submitDate: new Date().toISOString()
      })
    });

    const apiResult = await apiResponse.json();
    
    if (apiResult.success) {
      console.log('✅ API 테스트 성공'.green);
      console.log('   - 총점수:', apiResult.data?.diagnosis?.totalScore);
      console.log('   - 등급:', apiResult.data?.diagnosis?.overallGrade);
      
      // AI 역량 분석 결과 확인
      if (apiResult.data?.diagnosis?.aiCapabilityAnalysis) {
        console.log('\n✅ AI 역량 GAP 분석 완료'.green);
        const aiAnalysis = apiResult.data.diagnosis.aiCapabilityAnalysis;
        console.log('   - 성숙도:', aiAnalysis.maturityLevel);
        console.log('   - AI 역량 점수:', aiAnalysis.overallScore);
        console.log('   - 벤치마크 대비 GAP:', aiAnalysis.overallGap);
        console.log('   - 강점:', aiAnalysis.strengths?.join(', '));
        console.log('   - 약점:', aiAnalysis.weaknesses?.join(', '));
      } else {
        console.log('⚠️ AI 역량 분석 데이터 없음'.yellow);
      }
      
      // 이메일 발송 상태
      console.log('\n2️⃣ 이메일 발송 상태'.yellow);
      if (apiResult.data?.emailSent) {
        console.log('✅ 이메일 발송 성공'.green);
      } else {
        console.log('❌ 이메일 발송 실패'.red);
      }
      
      // 보고서 생성 확인
      console.log('\n3️⃣ 보고서 생성 확인'.yellow);
      if (apiResult.data?.summaryReport) {
        console.log('✅ 보고서 생성 성공'.green);
        console.log('   - 보고서 길이:', apiResult.data.summaryReport.length, '자');
        
        // 보고서에 AI 역량 내용이 포함되어 있는지 확인
        const report = apiResult.data.summaryReport;
        if (report.includes('AI 역량') || report.includes('AI 활용 역량')) {
          console.log('✅ 보고서에 AI 역량 분석 포함됨'.green);
        } else {
          console.log('⚠️ 보고서에 AI 역량 분석이 포함되지 않음'.yellow);
        }
      } else {
        console.log('❌ 보고서 생성 실패'.red);
      }
      
    } else {
      console.log('❌ API 테스트 실패'.red);
      console.log('   오류:', apiResult.error);
    }
    
  } catch (error) {
    console.error('❌ 테스트 중 오류 발생:'.red, error.message);
    console.error(error.stack);
  }
  
  console.log('\n================================'.cyan);
  console.log('테스트 완료'.cyan);
}

// 메인 함수 실행
if (require.main === module) {
  testAICapabilitySystem();
}