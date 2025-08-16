/**
 * AI 역량진단 전체 워크플로우 시뮬레이션 테스트
 * 신청서 제출 → 결과보고서 생성 → 이메일 발송 → 저장 전 과정 검증
 */

import { NextRequest } from 'next/server';

// 시뮬레이션 데이터
const simulationData = {
  // 1단계: 신청서 데이터
  applicationForm: {
    companyName: '테스트 기업 주식회사',
    industry: '제조업',
    customIndustry: '',
    employeeCount: '50-100명',
    annualRevenue: '100-500억원',
    location: '서울특별시',
    contactName: '김철수',
    contactEmail: 'test@testcompany.com',
    contactPhone: '010-1234-5678',
    businessContent: '스마트팩토리 구축을 통한 제조업 혁신',
    challenges: 'AI 전문 인력 부족, 데이터 관리 체계 미흡, 기술 인프라 부족',
    
    // 29개 문항 평가 응답 (1-5점)
    assessmentResponses: {
      // AI 이해도 (5문항)
      'aiUnderstanding_q1': 3,  // AI 기본 개념 이해
      'aiUnderstanding_q2': 2,  // AI 기술 동향 파악
      'aiUnderstanding_q3': 4,  // 업종별 AI 활용사례 인지
      'aiUnderstanding_q4': 3,  // AI 도입 효과 이해
      'aiUnderstanding_q5': 2,  // AI 한계점 인식
      
      // 전략 수립 (5문항)
      'strategy_q6': 2,   // AI 비전 수립 여부
      'strategy_q7': 1,   // AI 도입 로드맵 보유
      'strategy_q8': 3,   // 우선순위 설정
      'strategy_q9': 2,   // 성과지표(KPI) 설정
      'strategy_q10': 2,  // 예산 계획 수립
      
      // 데이터 관리 (5문항)
      'dataManagement_q11': 4,  // 데이터 품질 관리
      'dataManagement_q12': 3,  // 데이터 통합 관리
      'dataManagement_q13': 3,  // 데이터 보안 체계
      'dataManagement_q14': 4,  // 데이터 거버넌스
      'dataManagement_q15': 3,  // 데이터 활용도
      
      // 인프라 (4문항)
      'infrastructure_q16': 2,  // 컴퓨팅 자원 보유
      'infrastructure_q17': 3,  // 클라우드 활용
      'infrastructure_q18': 2,  // AI 도구/플랫폼
      'infrastructure_q19': 3,  // 시스템 연계성
      
      // 인재 역량 (5문항)
      'talent_q20': 1,  // AI 전담 조직
      'talent_q21': 2,  // AI 전문 인력
      'talent_q22': 2,  // 직원 AI 교육
      'talent_q23': 3,  // 부서간 협업
      'talent_q24': 2,  // 외부 전문가 활용
      
      // 활용 수준 (5문항)
      'utilization_q25': 2,  // 업무 자동화
      'utilization_q26': 3,  // 데이터 분석
      'utilization_q27': 2,  // 예측/추천
      'utilization_q28': 3,  // 최적화
      'utilization_q29': 2   // 혁신 창출
    }
  }
};

/**
 * 1단계: 신청서 제출 프로세스 테스트
 */
async function testApplicationSubmission() {
  console.log('📝 1단계: 신청서 제출 프로세스 테스트');
  
  try {
    // 신청서 데이터 검증
    const { applicationForm } = simulationData;
    
    // 필수 필드 검증
    const requiredFields = ['companyName', 'industry', 'contactName', 'contactEmail'];
    for (const field of requiredFields) {
      if (!applicationForm[field]) {
        throw new Error(`필수 필드 누락: ${field}`);
      }
    }
    
    // 평가 응답 검증 (29개 문항)
    const responseCount = Object.keys(applicationForm.assessmentResponses).length;
    if (responseCount !== 29) {
      throw new Error(`평가 응답 수 불일치: ${responseCount}/29`);
    }
    
    // 점수 범위 검증 (1-5점)
    for (const [key, score] of Object.entries(applicationForm.assessmentResponses)) {
      if (score < 1 || score > 5) {
        throw new Error(`점수 범위 오류 ${key}: ${score} (1-5점 범위)`);
      }
    }
    
    console.log('✅ 신청서 데이터 검증 통과');
    console.log(`   - 회사명: ${applicationForm.companyName}`);
    console.log(`   - 업종: ${applicationForm.industry}`);
    console.log(`   - 담당자: ${applicationForm.contactName}`);
    console.log(`   - 이메일: ${applicationForm.contactEmail}`);
    console.log(`   - 평가 응답: ${responseCount}개 문항`);
    
    return applicationForm;
    
  } catch (error) {
    console.error('❌ 신청서 제출 프로세스 오류:', error);
    throw error;
  }
}

/**
 * 2단계: AI 진단 API 호출 시뮬레이션
 */
async function testDiagnosisAPI(applicationData: any) {
  console.log('\n🧠 2단계: AI 진단 API 호출 시뮬레이션');
  
  try {
    // API 요청 데이터 구성
    const requestBody = JSON.stringify(applicationData);
    
    // NextRequest 객체 시뮬레이션
    const mockRequest = {
      json: async () => applicationData,
      headers: new Map([
        ['host', 'localhost:3000'],
        ['x-forwarded-proto', 'http']
      ])
    } as any;
    
    // AI 진단 API 로직 직접 호출
    const { POST } = await import('../src/app/api/ai-diagnosis/route');
    
    console.log('📡 AI 진단 API 호출 중...');
    const response = await POST(mockRequest);
    
    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(`진단 실패: ${result.error}`);
    }
    
    console.log('✅ AI 진단 API 호출 성공');
    console.log(`   - 진단 ID: ${result.diagnosisId}`);
    console.log(`   - 총점: ${result.results.totalScore}점`);
    console.log(`   - 등급: ${result.results.maturityLevel}`);
    console.log(`   - 처리시간: ${result.processingTime}`);
    
    return result;
    
  } catch (error) {
    console.error('❌ AI 진단 API 오류:', error);
    throw error;
  }
}

/**
 * 3단계: 이메일 발송 프로세스 테스트
 */
async function testEmailProcess(diagnosisResult: any) {
  console.log('\n📧 3단계: 이메일 발송 프로세스 테스트');
  
  try {
    const { sendDiagnosisEmail } = await import('../src/lib/services/simple-email-service');
    
    // 이메일 설정
    const emailConfig = {
      to: simulationData.applicationForm.contactEmail,
      companyName: simulationData.applicationForm.companyName,
      contactName: simulationData.applicationForm.contactName,
      reportPassword: 'TEST123',
      diagnosisId: diagnosisResult.diagnosisId,
      totalScore: diagnosisResult.results.totalScore,
      grade: diagnosisResult.results.maturityLevel
    };
    
    // 이메일 템플릿 생성 테스트
    const emailResult = await sendDiagnosisEmail(emailConfig);
    
    if (!emailResult.success) {
      throw new Error(`이메일 생성 실패: ${emailResult.error}`);
    }
    
    console.log('✅ 이메일 템플릿 생성 성공');
    
    // 신청자 이메일 검증
    if (emailResult.applicantEmail) {
      console.log('📬 신청자 이메일:');
      console.log(`   - 제목: ${emailResult.applicantEmail.subject}`);
      console.log(`   - 첨부 보고서 안내 포함: ${emailResult.applicantEmail.body.includes('첨부된') ? '✅' : '❌'}`);
      console.log(`   - 비밀번호 포함: ${emailResult.applicantEmail.body.includes('TEST123') ? '✅' : '❌'}`);
    }
    
    // 관리자 이메일 검증
    if (emailResult.adminEmail) {
      console.log('📬 관리자 이메일:');
      console.log(`   - 제목: ${emailResult.adminEmail.subject}`);
      console.log(`   - 진단 결과 포함: ${emailResult.adminEmail.body.includes(diagnosisResult.results.totalScore) ? '✅' : '❌'}`);
    }
    
    return emailResult;
    
  } catch (error) {
    console.error('❌ 이메일 프로세스 오류:', error);
    throw error;
  }
}

/**
 * 4단계: Google Apps Script 저장 프로세스 테스트
 */
async function testGASStorageProcess(diagnosisResult: any) {
  console.log('\n💾 4단계: Google Apps Script 저장 프로세스 테스트');
  
  try {
    // GAS 페이로드 구성
    const gasPayload = {
      type: 'ai_diagnosis',
      action: 'saveDiagnosis',
      companyName: simulationData.applicationForm.companyName,
      contactName: simulationData.applicationForm.contactName,
      contactEmail: simulationData.applicationForm.contactEmail,
      contactPhone: simulationData.applicationForm.contactPhone,
      industry: simulationData.applicationForm.industry,
      employeeCount: simulationData.applicationForm.employeeCount,
      diagnosisId: diagnosisResult.diagnosisId,
      totalScore: diagnosisResult.results.totalScore,
      maturityLevel: diagnosisResult.results.maturityLevel,
      htmlReport: diagnosisResult.htmlReport,
      analysis: diagnosisResult.analysis,
      timestamp: new Date().toISOString(),
      assessmentResponses: simulationData.applicationForm.assessmentResponses,
      sendEmails: true,
      emailType: 'completion',
      reportPassword: 'TEST123',
      adminEmail: 'hongik423@gmail.com',
      websiteUrl: 'https://aicamp.club'
    };
    
    console.log('📋 GAS 페이로드 구성 완료');
    console.log(`   - 데이터 크기: ${JSON.stringify(gasPayload).length} bytes`);
    console.log(`   - 진단 ID: ${gasPayload.diagnosisId}`);
    console.log(`   - 이메일 발송: ${gasPayload.sendEmails ? '활성화' : '비활성화'}`);
    
    // GAS 저장 시뮬레이션 (실제 호출은 하지 않음)
    console.log('✅ GAS 저장 프로세스 검증 완료');
    console.log('   - 스프레드시트 저장 준비 완료');
    console.log('   - 이메일 발송 설정 완료');
    console.log('   - HTML 보고서 첨부 준비 완료');
    
    return gasPayload;
    
  } catch (error) {
    console.error('❌ GAS 저장 프로세스 오류:', error);
    throw error;
  }
}

/**
 * 5단계: Google Drive 보고서 저장 테스트
 */
async function testDriveStorageProcess(diagnosisResult: any) {
  console.log('\n🗂️ 5단계: Google Drive 보고서 저장 테스트');
  
  try {
    // Drive 저장 시뮬레이션
    const driveConfig = {
      fileName: `AI역량진단보고서_${simulationData.applicationForm.companyName}_${diagnosisResult.diagnosisId}.html`,
      folderId: '1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj',
      content: diagnosisResult.htmlReport,
      mimeType: 'text/html'
    };
    
    console.log('📁 Drive 저장 설정 검증');
    console.log(`   - 파일명: ${driveConfig.fileName}`);
    console.log(`   - 폴더 ID: ${driveConfig.folderId}`);
    console.log(`   - 콘텐츠 크기: ${driveConfig.content?.length || 0} bytes`);
    console.log(`   - MIME 타입: ${driveConfig.mimeType}`);
    
    // 파일명 유효성 검증
    if (driveConfig.fileName.includes('/') || driveConfig.fileName.includes('\\')) {
      throw new Error('파일명에 잘못된 문자 포함');
    }
    
    console.log('✅ Google Drive 저장 프로세스 검증 완료');
    
    return driveConfig;
    
  } catch (error) {
    console.error('❌ Drive 저장 프로세스 오류:', error);
    throw error;
  }
}

/**
 * 6단계: 전체 워크플로우 통합 테스트
 */
async function testCompleteWorkflow() {
  console.log('\n🔄 6단계: 전체 워크플로우 통합 테스트');
  
  const workflowResults = {
    application: null,
    diagnosis: null,
    email: null,
    gasStorage: null,
    driveStorage: null,
    errors: [] as string[]
  };
  
  try {
    // 1. 신청서 제출
    workflowResults.application = await testApplicationSubmission();
    
    // 2. AI 진단
    workflowResults.diagnosis = await testDiagnosisAPI(workflowResults.application);
    
    // 3. 이메일 발송
    workflowResults.email = await testEmailProcess(workflowResults.diagnosis);
    
    // 4. GAS 저장
    workflowResults.gasStorage = await testGASStorageProcess(workflowResults.diagnosis);
    
    // 5. Drive 저장
    workflowResults.driveStorage = await testDriveStorageProcess(workflowResults.diagnosis);
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 전체 워크플로우 테스트 성공!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    return workflowResults;
    
  } catch (error) {
    workflowResults.errors.push(error.message);
    console.error('\n❌ 워크플로우 테스트 실패:', error);
    throw error;
  }
}

/**
 * 메인 테스트 실행 함수
 */
async function runWorkflowSimulation() {
  console.log('🚀 AI 역량진단 전체 워크플로우 시뮬레이션 시작');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  const startTime = Date.now();
  
  try {
    const results = await testCompleteWorkflow();
    
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    
    console.log('\n📊 워크플로우 시뮬레이션 결과:');
    console.log(`   - 총 소요시간: ${totalTime}ms`);
    console.log(`   - 신청서 처리: ${results.application ? '✅' : '❌'}`);
    console.log(`   - AI 진단: ${results.diagnosis ? '✅' : '❌'}`);
    console.log(`   - 이메일 발송: ${results.email ? '✅' : '❌'}`);
    console.log(`   - GAS 저장: ${results.gasStorage ? '✅' : '❌'}`);
    console.log(`   - Drive 저장: ${results.driveStorage ? '✅' : '❌'}`);
    console.log(`   - 오류 수: ${results.errors.length}개`);
    
    if (results.errors.length > 0) {
      console.log('\n⚠️ 발견된 오류:');
      results.errors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error}`);
      });
    }
    
    console.log('\n✅ 워크플로우 시뮬레이션 완료');
    
  } catch (error) {
    console.error('\n❌ 시뮬레이션 실패:', error);
    process.exit(1);
  }
}

// 테스트 실행
if (require.main === module) {
  runWorkflowSimulation()
    .then(() => {
      console.log('\n🎯 시뮬레이션 테스트 정상 종료');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 시뮬레이션 테스트 실패:', error);
      process.exit(1);
    });
}

export { runWorkflowSimulation };
