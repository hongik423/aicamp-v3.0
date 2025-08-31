#!/usr/bin/env node

/**
 * 🧪 실제 점수 반영 테스트 - 직접 API 호출
 */

const fetch = require('node-fetch');

console.log('🧪 실제 점수 반영 최종 테스트');
console.log('='.repeat(50));

// 실제 고점수 테스트 데이터 (203점 예상)
const highScoreData = {
  companyName: '고점수실제반영테스트_' + Date.now(),
  industry: 'IT/소프트웨어',
  employeeCount: '100-500명',
  contactName: '김대표',
  contactEmail: 'ceo@testcompany.co.kr',
  contactPhone: '010-9876-5432',
  contactPosition: '대표이사',
  businessRegistration: '987-65-43210',
  annualRevenue: '100억원 이상',
  establishmentYear: '2015',
  businessContent: 'AI 기반 솔루션 개발',
  mainProducts: 'AI 플랫폼, 데이터 분석',
  targetCustomers: '대기업, 공공기관',
  currentChallenges: 'AI 역량 고도화',
  privacyConsent: true,
  responses: {
    Q1: 5, Q2: 5, Q3: 4, Q4: 5, Q5: 4, Q6: 5, Q7: 4, Q8: 5, Q9: 4,
    Q10: 5, Q11: 4, Q12: 5, Q13: 4, Q14: 5, Q15: 4, Q16: 5, Q17: 4, Q18: 5,
    Q19: 4, Q20: 5, Q21: 4, Q22: 5, Q23: 4, Q24: 5, Q25: 4, Q26: 5, Q27: 4,
    Q28: 5, Q29: 4, Q30: 5, Q31: 4, Q32: 5, Q33: 4, Q34: 5, Q35: 4, Q36: 5,
    Q37: 4, Q38: 5, Q39: 4, Q40: 5, Q41: 4, Q42: 5, Q43: 4, Q44: 5, Q45: 4
  },
  timestamp: new Date().toISOString()
};

// 예상 총점 계산
const expectedScore = Object.values(highScoreData.responses).reduce((sum, score) => sum + score, 0);
console.log(`📊 예상 총점: ${expectedScore}/225점 (${Math.round(expectedScore/225*100)}%)`);

async function runFullTest() {
  try {
    console.log('\n🚀 1단계: 고점수 진단 신청');
    
    // 1. 진단 신청
    const diagnosisResponse = await fetch('http://localhost:3001/api/ai-diagnosis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(highScoreData)
    });
    
    const diagnosisResult = await diagnosisResponse.json();
    
    if (!diagnosisResponse.ok || !diagnosisResult.success) {
      throw new Error(`진단 신청 실패: ${diagnosisResult.error}`);
    }
    
    const diagnosisId = diagnosisResult.data?.diagnosisId || diagnosisResult.diagnosisId;
    const submittedScore = diagnosisResult.data?.totalScore || 0;
    
    console.log('✅ 진단 신청 성공:', {
      diagnosisId,
      예상점수: expectedScore,
      제출시점수: submittedScore,
      점수일치: submittedScore === expectedScore
    });
    
    // 2. 30초 대기 (Google Sheets 저장 완료 대기)
    console.log('\n⏳ 30초 대기 - Google Sheets 저장 완료 대기...');
    await new Promise(resolve => setTimeout(resolve, 30000));
    
    // 3. Google Sheets 직접 확인
    console.log('\n🔍 2단계: Google Sheets 데이터 확인');
    const gasResponse = await fetch('https://script.google.com/macros/s/AKfycbzO4ykDtUetroPX2TtQ1wkiOVNtd56tUZpPT4EITaLnXeMxTGdIIN8MIEMvOOy8ywTN/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'query_diagnosis',
        action: 'queryDiagnosisById',
        diagnosisId: diagnosisId,
        timestamp: new Date().toISOString()
      })
    });
    
    const gasResult = await gasResponse.json();
    
    if (gasResult.success && gasResult.data) {
      console.log('✅ Google Sheets 데이터 조회 성공:', {
        진단ID: gasResult.data.diagnosisId,
        회사명: gasResult.data.companyName,
        시트총점: gasResult.data.totalScore,
        시트백분율: gasResult.data.percentage,
        응답수: gasResult.data.responses ? Object.keys(gasResult.data.responses).length : 0
      });
      
      // 4. 보고서 생성 테스트
      console.log('\n📄 3단계: 35페이지 보고서 생성');
      const reportResponse = await fetch(`http://localhost:3001/api/diagnosis-reports/${diagnosisId}`);
      const reportResult = await reportResponse.json();
      
      if (reportResponse.ok && reportResult.success) {
        console.log('✅ 보고서 생성 성공:', {
          보고서총점: reportResult.reportInfo?.totalScore,
          보고서백분율: reportResult.reportInfo?.percentage,
          보고서등급: reportResult.reportInfo?.grade,
          사실기반: reportResult.reportInfo?.factBasedSystem,
          실제점수반영: reportResult.reportInfo?.actualScoreReflected
        });
        
        // 최종 점수 일치성 검증
        console.log('\n🎯 최종 점수 일치성 검증:');
        console.log(`예상 점수: ${expectedScore}점`);
        console.log(`제출시 점수: ${submittedScore}점`);
        console.log(`시트 점수: ${gasResult.data.totalScore}점`);
        console.log(`보고서 점수: ${reportResult.reportInfo?.totalScore}점`);
        
        const allScoresMatch = (
          expectedScore === submittedScore &&
          submittedScore === gasResult.data.totalScore &&
          gasResult.data.totalScore === reportResult.reportInfo?.totalScore
        );
        
        console.log(`\n✅ 전체 점수 일치성: ${allScoresMatch ? '완벽 일치' : '불일치 감지'}`);
        
        if (!allScoresMatch) {
          console.log('\n⚠️ 점수 불일치 원인 분석:');
          if (expectedScore !== submittedScore) console.log('- 진단 신청 시 점수 계산 오류');
          if (submittedScore !== gasResult.data.totalScore) console.log('- Google Sheets 저장 시 점수 손실');
          if (gasResult.data.totalScore !== reportResult.reportInfo?.totalScore) console.log('- 보고서 생성 시 점수 변조');
        }
        
        return {
          success: true,
          scoreAccuracy: allScoresMatch,
          scores: {
            expected: expectedScore,
            submitted: submittedScore,
            sheets: gasResult.data.totalScore,
            report: reportResult.reportInfo?.totalScore
          }
        };
      } else {
        console.log('❌ 보고서 생성 실패:', reportResult.error);
        return { success: false, error: '보고서 생성 실패' };
      }
    } else {
      console.log('❌ Google Sheets 조회 실패:', gasResult.error);
      return { success: false, error: 'Google Sheets 조회 실패' };
    }
    
  } catch (error) {
    console.error('❌ 테스트 실행 중 오류:', error.message);
    return { success: false, error: error.message };
  }
}

runFullTest().then(result => {
  console.log('\n📄 최종 테스트 결과:', result);
  console.log(result.success && result.scoreAccuracy ? '🎉 모든 테스트 통과!' : '❌ 점수 반영 문제 발견');
  process.exit(result.success ? 0 : 1);
});
