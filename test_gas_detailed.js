/**
 * Google Apps Script 상세 테스트
 */

const axios = require('axios');

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec';

async function testDetailedDiagnosis() {
  console.log('🔍 상세 진단 테스트 시작...\n');
  
  const testData = {
    action: 'saveDiagnosis',
    회사명: 'AI테스트기업_' + Date.now(),
    업종: ['제조업', 'IT/소프트웨어'],
    소재지: '서울특별시',
    사업담당자: '김대표',
    직원수: '50명 이상',
    사업성장단계: '성장기',
    주요고민사항: ['디지털 전환', 'AI 도입', '인재 관리'],
    예상혜택: 'AI 기반 업무 자동화로 30% 효율성 향상',
    담당자명: '테스트담당자',
    연락처: '010-1234-5678',
    이메일: 'test@aicamp.com',
    개인정보동의: true,
    종합점수: 82,
    문항별점수: {
      기획수준: 4,
      차별화정도: 5,
      가격설정: 4,
      전문성: 5,
      품질: 4,
      고객맞이: 4,
      고객응대: 4,
      불만관리: 3,
      고객유지: 4,
      고객이해: 4,
      마케팅계획: 3,
      오프라인마케팅: 3,
      온라인마케팅: 4,
      판매전략: 4,
      구매관리: 4,
      재고관리: 4,
      외관관리: 5,
      인테리어관리: 4,
      청결도: 5,
      작업동선: 4
    },
    카테고리점수: {
      productService: { score: 4.4 },
      customerService: { score: 3.8 },
      marketing: { score: 3.6 },
      procurement: { score: 4.0 },
      storeManagement: { score: 4.5 }
    },
    사업상세설명: 'AI 기반 제조업 혁신 솔루션을 개발하고 있는 기업입니다. 스마트팩토리 구축과 데이터 기반 의사결정 시스템을 도입하여 제조 효율성을 극대화하고자 합니다.',
    희망컨설팅분야: 'AI 전략 수립 및 실행'
  };
  
  console.log('📤 전송 데이터:');
  console.log('- 회사명:', testData.회사명);
  console.log('- 업종:', testData.업종);
  console.log('- 주요고민사항:', testData.주요고민사항);
  console.log('- 종합점수:', testData.종합점수);
  
  try {
    console.log('\n⏳ 서버 응답 대기중... (최대 60초)');
    
    const response = await axios.post(GOOGLE_SCRIPT_URL, testData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 60000,
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      }
    });
    
    console.log('\n📥 서버 응답:');
    console.log('- 상태 코드:', response.status);
    console.log('- 응답 타입:', typeof response.data);
    
    if (response.data) {
      console.log('- 응답 데이터:', JSON.stringify(response.data, null, 2));
      
      if (response.data.success) {
        console.log('\n✅ 진단 신청 성공!');
        if (response.data.data) {
          console.log('- 처리 시간:', response.data.data.processingTime);
          console.log('- 이메일 발송:', response.data.data.emailSent ? '성공' : '실패');
        }
      } else {
        console.log('\n❌ 진단 신청 실패');
        console.log('- 오류 메시지:', response.data.message || '알 수 없는 오류');
      }
    }
    
  } catch (error) {
    console.error('\n❌ 요청 오류 발생:');
    console.error('- 오류 유형:', error.code);
    console.error('- 오류 메시지:', error.message);
    
    if (error.response) {
      console.error('- 응답 상태:', error.response.status);
      console.error('- 응답 데이터:', error.response.data);
    } else if (error.request) {
      console.error('- 요청이 전송되었으나 응답이 없음');
    }
  }
  
  console.log('\n🏁 테스트 종료');
}

// 간단한 연결 테스트
async function testConnection() {
  console.log('🔌 연결 테스트 시작...\n');
  
  try {
    const response = await axios.get(GOOGLE_SCRIPT_URL, {
      timeout: 10000
    });
    
    console.log('✅ 연결 성공');
    console.log('- 응답 상태:', response.status);
    console.log('- 응답 데이터:', typeof response.data === 'string' ? response.data.substring(0, 100) + '...' : response.data);
    
  } catch (error) {
    console.error('❌ 연결 실패:', error.message);
  }
}

// 메인 실행
async function main() {
  console.log('🚀 Google Apps Script AI 진단 시스템 상세 테스트\n');
  console.log('📅 시작 시간:', new Date().toLocaleString('ko-KR'));
  console.log('🔗 대상 URL:', GOOGLE_SCRIPT_URL);
  console.log('=' .repeat(60) + '\n');
  
  // 1. 연결 테스트
  await testConnection();
  
  console.log('\n' + '=' .repeat(60) + '\n');
  
  // 2. 상세 진단 테스트
  await testDetailedDiagnosis();
}

main().catch(console.error);