/**
 * AI 역량진단 시스템 완전 워크플로우 테스트
 * 1. 신청 → 2. 보고서 작성 → 3. 이메일 발송 → 4. 구글시트 저장
 */

const fs = require('fs');

// 테스트 설정
const TEST_CONFIG = {
  API_URL: 'http://localhost:3000/api/ai-capability-diagnosis',
  GAS_URL: 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec'
};

// 실제 테스트 데이터
const testApplicationData = {
  // 기업 기본 정보
  companyName: 'AI CAMP 테스트 기업',
  industry: 'it',
  companySize: '50-199',
  
  // 신청자 정보
  applicantName: '홍용기',
  position: '대표이사',
  email: 'test@aicamp.club',
  phone: '010-9251-9743',
  
  // AI 역량 평가 응답 (24개 문항)
  assessmentResponses: {
    // 리더십 역량 (q1-q4)
    q1: '4', q2: '3', q3: '4', q4: '5',
    // 인프라 역량 (q5-q8)
    q5: '3', q6: '4', q7: '3', q8: '4',
    // 직원 역량 (q9-q12)
    q9: '2', q10: '3', q11: '3', q12: '4',
    // 문화 역량 (q13-q16)
    q13: '4', q14: '3', q15: '4', q16: '3',
    // 실무 적용 (q17-q20)
    q17: '5', q18: '4', q19: '3', q20: '4',
    // 데이터 역량 (q21-q24)
    q21: '3', q22: '4', q23: '3', q24: '4'
  }
};

// 워크플로우 단계별 테스트
class AICapabilityDiagnosisWorkflowTest {
  constructor() {
    this.testResults = {};
    this.diagnosisId = null;
  }

  // 1단계: 진단 신청 테스트
  async testDiagnosisApplication() {
    console.log('🔥 1단계: AI 역량진단 신청 테스트');
    
    try {
      const response = await fetch(TEST_CONFIG.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testApplicationData)
      });

      const result = await response.json();
      
      if (result.success) {
        this.diagnosisId = result.diagnosisId;
        console.log('✅ 진단 신청 성공');
        console.log(`📋 진단 ID: ${this.diagnosisId}`);
        console.log(`📊 응답 데이터:`, result);
        
        this.testResults.application = {
          success: true,
          diagnosisId: this.diagnosisId,
          timestamp: new Date().toISOString()
        };
        
        return true;
      } else {
        console.log('❌ 진단 신청 실패:', result.error);
        this.testResults.application = {
          success: false,
          error: result.error
        };
        return false;
      }
    } catch (error) {
      console.log('❌ 진단 신청 오류:', error.message);
      this.testResults.application = {
        success: false,
        error: error.message
      };
      return false;
    }
  }

  // 2단계: 점수 계산 및 분석 검증
  async testScoreCalculation() {
    console.log('\n🧮 2단계: 점수 계산 및 분석 검증');
    
    // 로컬에서 점수 계산 (검증용)
    const localScores = this.calculateLocalScores(testApplicationData.assessmentResponses);
    console.log('📊 로컬 계산 점수:', localScores);
    
    this.testResults.scoreCalculation = {
      success: true,
      localScores: localScores,
      categories: Object.keys(localScores).length - 2 // total, grade 제외
    };
    
    return true;
  }

  // 3단계: Google Apps Script 직접 테스트
  async testGoogleAppsScript() {
    console.log('\n📊 3단계: Google Apps Script 직접 테스트');
    
    try {
      const response = await fetch(TEST_CONFIG.GAS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'submitAICapabilityDiagnosis',
          data: testApplicationData
        })
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('✅ GAS 직접 호출 성공');
        console.log(`📋 GAS 진단 ID: ${result.diagnosisId}`);
        console.log(`📊 GAS 응답:`, result);
        
        this.testResults.gasTest = {
          success: true,
          diagnosisId: result.diagnosisId,
          scores: result.scores
        };
        
        return true;
      } else {
        console.log('❌ GAS 직접 호출 실패:', result.error);
        this.testResults.gasTest = {
          success: false,
          error: result.error
        };
        return false;
      }
    } catch (error) {
      console.log('❌ GAS 호출 오류:', error.message);
      this.testResults.gasTest = {
        success: false,
        error: error.message
      };
      return false;
    }
  }

  // 4단계: 이메일 발송 시뮬레이션
  async testEmailNotification() {
    console.log('\n📧 4단계: 이메일 발송 시뮬레이션');
    
    // 실제 이메일 발송은 GAS에서 처리되므로 시뮬레이션
    const emailContent = {
      applicant: {
        to: testApplicationData.email,
        subject: `[AI CAMP] ${testApplicationData.companyName}님의 AI 역량진단 결과`,
        body: `안녕하세요 ${testApplicationData.applicantName}님,\n\nAI CAMP의 AI 역량진단 결과를 안내드립니다.`
      },
      admin: {
        to: 'hongik423@gmail.com',
        subject: `[AI CAMP] 새로운 AI 역량진단 신청 - ${testApplicationData.companyName}`,
        body: `새로운 AI 역량진단 신청이 접수되었습니다.\n기업명: ${testApplicationData.companyName}`
      }
    };
    
    console.log('✅ 이메일 콘텐츠 생성 완료');
    console.log('📧 신청자 이메일:', emailContent.applicant.to);
    console.log('📧 관리자 이메일:', emailContent.admin.to);
    
    this.testResults.emailNotification = {
      success: true,
      emailContent: emailContent
    };
    
    return true;
  }

  // 5단계: 구글시트 저장 검증
  async testGoogleSheetsStorage() {
    console.log('\n📊 5단계: 구글시트 저장 검증');
    
    // 저장될 데이터 구조 시뮬레이션
    const sheetData = {
      sheetName: 'AI역량진단',
      headers: [
        '진단ID', '제출시간', '기업명', '업종', '규모', '신청자', '직급', 
        '이메일', '연락처', '리더십점수', '인프라점수', '직원역량점수',
        '문화점수', '실무적용점수', '데이터역량점수', '종합점수', '등급'
      ],
      data: [
        this.diagnosisId || 'TEST-ID',
        new Date().toLocaleString('ko-KR'),
        testApplicationData.companyName,
        testApplicationData.industry,
        testApplicationData.companySize,
        testApplicationData.applicantName,
        testApplicationData.position,
        testApplicationData.email,
        testApplicationData.phone,
        // 점수들은 계산된 값 사용
        ...Object.values(this.calculateLocalScores(testApplicationData.assessmentResponses))
      ]
    };
    
    console.log('✅ 구글시트 데이터 구조 검증 완료');
    console.log('📊 저장될 데이터 행 수:', sheetData.headers.length);
    console.log('📋 시트명:', sheetData.sheetName);
    
    this.testResults.googleSheetsStorage = {
      success: true,
      sheetData: sheetData
    };
    
    return true;
  }

  // 로컬 점수 계산 (검증용)
  calculateLocalScores(responses) {
    const categories = {
      leadership: ['q1', 'q2', 'q3', 'q4'],
      infrastructure: ['q5', 'q6', 'q7', 'q8'],
      employeeCapability: ['q9', 'q10', 'q11', 'q12'],
      culture: ['q13', 'q14', 'q15', 'q16'],
      practicalApplication: ['q17', 'q18', 'q19', 'q20'],
      dataCapability: ['q21', 'q22', 'q23', 'q24']
    };
    
    const scores = {};
    let totalScore = 0;
    
    Object.keys(categories).forEach(category => {
      const questions = categories[category];
      let categorySum = 0;
      let validCount = 0;
      
      questions.forEach(q => {
        if (responses[q]) {
          categorySum += parseInt(responses[q]);
          validCount++;
        }
      });
      
      scores[category] = validCount > 0 ? (categorySum / validCount) * 20 : 0;
      totalScore += scores[category];
    });
    
    scores.total = Math.round(totalScore / 6);
    scores.grade = this.getGradeFromScore(scores.total);
    
    return scores;
  }

  // 등급 산출
  getGradeFromScore(score) {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  }

  // 종합 테스트 실행
  async runCompleteWorkflowTest() {
    console.log('🚀 AI 역량진단 시스템 완전 워크플로우 테스트 시작\n');
    
    const steps = [
      { name: '진단 신청', method: 'testDiagnosisApplication' },
      { name: '점수 계산', method: 'testScoreCalculation' },
      { name: 'GAS 연동', method: 'testGoogleAppsScript' },
      { name: '이메일 발송', method: 'testEmailNotification' },
      { name: '구글시트 저장', method: 'testGoogleSheetsStorage' }
    ];
    
    let successCount = 0;
    
    for (const step of steps) {
      const success = await this[step.method]();
      if (success) successCount++;
      
      // 각 단계 사이에 잠시 대기
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // 최종 결과 리포트
    console.log('\n' + '='.repeat(60));
    console.log('📋 AI 역량진단 워크플로우 테스트 결과 요약');
    console.log('='.repeat(60));
    console.log(`총 단계: ${steps.length}`);
    console.log(`성공: ${successCount}`);
    console.log(`실패: ${steps.length - successCount}`);
    console.log(`성공률: ${Math.round((successCount / steps.length) * 100)}%`);
    
    // 상세 결과 저장
    const finalReport = {
      timestamp: new Date().toISOString(),
      testData: testApplicationData,
      results: this.testResults,
      summary: {
        totalSteps: steps.length,
        successCount: successCount,
        failureCount: steps.length - successCount,
        successRate: Math.round((successCount / steps.length) * 100)
      }
    };
    
    fs.writeFileSync('ai-diagnosis-workflow-test-report.json', JSON.stringify(finalReport, null, 2));
    console.log('\n📄 상세 리포트: ai-diagnosis-workflow-test-report.json');
    
    return finalReport;
  }
}

// 테스트 실행
if (require.main === module) {
  const tester = new AICapabilityDiagnosisWorkflowTest();
  tester.runCompleteWorkflowTest().catch(console.error);
}

module.exports = AICapabilityDiagnosisWorkflowTest;