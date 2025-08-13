#!/usr/bin/env node

/**
 * 프로덕션 배포된 AICAMP API 엔드포인트 테스트
 * GEMINI 2.5 Flash 모델 포함 전체 시스템 테스트
 */

const fetch = require('node-fetch');

// 프로덕션 URL (최신 배포)
const PRODUCTION_URL = 'https://aicampv30-omthapq06-hongik423-3087s-projects.vercel.app';
const AICAMP_URL = 'https://aicamp.club'; // 도메인 연결 후

console.log('🚀 AICAMP 프로덕션 API 테스트 시작');
console.log('============================================================');

// 테스트할 URL 결정 - aicamp.club 도메인 사용
const BASE_URL = AICAMP_URL;
console.log(`🌐 테스트 대상: ${BASE_URL}`);

async function testHealthCheck() {
  try {
    console.log('\n🔍 서버 상태 확인...');
    const response = await fetch(`${BASE_URL}/`);
    
    // 401, 403도 서버가 동작 중임을 의미
    if (response.status === 200 || response.status === 401 || response.status === 403) {
      console.log(`✅ 서버 실행 중 (상태 코드: ${response.status})`);
      return true;
    } else {
      console.log(`❌ 서버 응답 오류: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log('❌ 서버 연결 실패:', error.message);
    return false;
  }
}

async function testAIDiagnosis() {
  try {
    console.log('\n🎯 AI역량진단 API 테스트...');
    console.log('📤 테스트 데이터 전송 중...');
    console.log('   회사명: 테스트컴퍼니(프로덕션)');
    console.log('   담당자: 프로덕션테스트담당자 (CTO)');
    console.log('   이메일: production-test@aicamp.club');

    const diagnosisData = {
      // 기본 정보
      contactName: '프로덕션테스트담당자',
      contactEmail: 'production-test@aicamp.club',
      contactPhone: '010-9999-8888',
      companyName: '테스트컴퍼니(프로덕션)',
      position: 'CTO',
      
      // 업종 및 규모
      industryMain: '제조업',
      industryDetail: 'IT서비스',
      companySize: '중견기업(300-999명)',
      annualRevenue: '100-500억원',
      
      // 현재 AI/IT 현황 (15문항)
      currentAIUsage: 'basic',
      itSystems: ['ERP', 'CRM'],
      digitalTransformation: 'planning',
      dataManagement: 'structured',
      cloudUsage: 'hybrid',
      
      // AI 도입 준비도 (10문항)
      aiReadiness: 'intermediate',
      teamCapability: 'basic',
      budgetAllocation: '1-5억원',
      timeframe: '6-12개월',
      leadershipSupport: 'strong',
      
      // AI 인프라 및 기술 (10문항)
      infrastructureLevel: 'intermediate',
      dataQuality: 'good',
      securityLevel: 'high',
      integrationCapability: 'intermediate',
      scalabilityNeeds: 'high',
      
      // AI 목표 및 기대효과 (5문항)
      primaryGoals: ['productivity', 'cost_reduction'],
      expectedROI: '20-50%',
      successMetrics: ['efficiency', 'cost_savings'],
      riskTolerance: 'medium',
      innovationLevel: 'moderate',
      
      // 실행 계획 (5문항)
      implementationApproach: 'phased',
      trainingNeeds: 'extensive',
      changeManagement: 'structured',
      partnershipPreference: 'hybrid',
      maintenanceStrategy: 'internal_external'
    };

    const startTime = Date.now();
    
    const response = await fetch(`${BASE_URL}/api/ai-diagnosis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(diagnosisData)
    });

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    console.log(`\n📊 응답 결과 (${responseTime}ms):`);
    console.log(`   상태 코드: ${response.status}`);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ AI역량진단 API 성공!');
      
      console.log('\n📋 응답 데이터:');
      console.log(`   성공 여부: ${result.success ? '✅' : '❌'}`);
      console.log(`   진단 ID: ${result.diagnosisId || 'N/A'}`);
      console.log(`   버전: ${result.version || 'N/A'}`);
      console.log(`   모델: ${result.model || 'N/A'}`);
      console.log(`   메시지: ${result.message || 'N/A'}`);
      
      if (result.scores) {
        console.log('\n🎯 점수 정보:');
        console.log(`   전체 점수: ${result.scores.totalScore}/100`);
        console.log(`   성숙도: ${result.scores.level}`);
        
        // 세부 점수
        if (result.scores.details) {
          console.log('   세부 점수:');
          Object.entries(result.scores.details).forEach(([key, value]) => {
            console.log(`     - ${key}: ${value}/100`);
          });
        }
      }
      
      if (result.htmlReport) {
        console.log('✅ HTML 보고서 생성 완료');
      }
      
      return true;
    } else {
      const errorData = await response.text();
      console.log('❌ AI역량진단 API 실패');
      console.log(`   오류: ${errorData}`);
      return false;
    }
  } catch (error) {
    console.log('❌ AI역량진단 API 오류:', error.message);
    return false;
  }
}

async function testConsultation() {
  try {
    console.log('\n💬 상담신청 API 테스트...');
    
    const consultationData = {
      name: '프로덕션테스트담당자',
      email: 'production-test@aicamp.club',
      phone: '010-9999-8888',
      company: '테스트컴퍼니(프로덕션)',
      position: 'CTO',
      consultationType: 'AI전략수립',
      consultationField: 'AI도입전략',
      content: 'AI 도입을 통한 비즈니스 혁신 전략 수립이 필요합니다. (프로덕션 테스트)',
      preferredTime: '',
      privacyConsent: true
    };

    const response = await fetch(`${BASE_URL}/api/consultation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(consultationData)
    });

    console.log(`   상태 코드: ${response.status}`);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ 상담신청 API 성공');
      console.log(`   메시지: ${result.message || 'N/A'}`);
      return true;
    } else {
      const errorData = await response.text();
      console.log('❌ 상담신청 API 실패');
      console.log(`   오류: ${errorData}`);
      return false;
    }
  } catch (error) {
    console.log('❌ 상담신청 API 오류:', error.message);
    return false;
  }
}

async function testErrorReport() {
  try {
    console.log('\n🚨 오류신고 API 테스트...');
    
    const errorReportData = {
      name: '프로덕션테스트담당자',
      email: 'production-test@aicamp.club',
      calculatorType: 'vat',
      errorDescription: '부가세 계산 결과가 예상과 다릅니다. (프로덕션 테스트)',
      expectedBehavior: '100,000원이 표시되어야 함',
      actualBehavior: '90,000원이 표시됨',
      stepsToReproduce: '1. 매출액 입력, 2. 세율 선택, 3. 계산 실행',
      browserInfo: 'Chrome 120.0.0.0',
      deviceInfo: 'Windows 10',
      timestamp: new Date().toISOString()
    };

    const response = await fetch(`${BASE_URL}/api/tax-calculator/error-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorReportData)
    });

    console.log(`   상태 코드: ${response.status}`);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ 오류신고 API 성공');
      console.log(`   메시지: ${result.message || 'N/A'}`);
      return true;
    } else {
      const errorData = await response.text();
      console.log('❌ 오류신고 API 실패');
      console.log(`   오류: ${errorData}`);
      return false;
    }
  } catch (error) {
    console.log('❌ 오류신고 API 오류:', error.message);
    return false;
  }
}

async function runAllTests() {
  console.log(`🧪 프로덕션 환경 API 테스트 시작`);
  console.log(`📅 테스트 시간: ${new Date().toLocaleString('ko-KR')}`);
  
  const results = {
    health: false,
    aiDiagnosis: false,
    consultation: false,
    errorReport: false
  };

  // 서버 상태 확인
  results.health = await testHealthCheck();
  
  if (!results.health) {
    console.log('\n❌ 서버 연결 실패로 테스트 중단');
    return;
  }

  // API 테스트 실행
  results.aiDiagnosis = await testAIDiagnosis();
  results.consultation = await testConsultation();
  results.errorReport = await testErrorReport();

  // 결과 요약
  console.log('\n============================================================');
  console.log('📊 프로덕션 API 테스트 결과 요약');
  console.log('============================================================');
  
  const successCount = Object.values(results).filter(Boolean).length;
  const totalCount = Object.keys(results).length;
  
  console.log(`1. 서버 상태: ${results.health ? '✅ 성공' : '❌ 실패'}`);
  console.log(`2. AI역량진단: ${results.aiDiagnosis ? '✅ 성공' : '❌ 실패'}`);
  console.log(`3. 상담신청: ${results.consultation ? '✅ 성공' : '❌ 실패'}`);
  console.log(`4. 오류신고: ${results.errorReport ? '✅ 성공' : '❌ 실패'}`);
  
  console.log(`\n🎯 전체 성공률: ${successCount}/${totalCount} (${Math.round(successCount/totalCount*100)}%)`);
  
  if (successCount === totalCount) {
    console.log('\n🎉 모든 프로덕션 API 테스트 통과!');
    console.log('✅ AICAMP V11.0 Enhanced 시스템 정상 작동 확인');
    console.log('🚀 서비스 준비 완료!');
  } else {
    console.log('\n⚠️ 일부 API에서 문제가 발견되었습니다.');
    console.log('🔧 문제 해결 후 재테스트가 필요합니다.');
  }
  
  console.log('\n============================================================');
  console.log('🎓 프로덕션 API 테스트 완료');
  console.log('============================================================');
}

// 테스트 실행
runAllTests().catch(console.error);
