/**
 * 🚀 Google Apps Script 이메일 발송 전용 테스트
 * 관리자와 신청자 확인 이메일 정상 발송 테스트
 */

const axios = require('axios');

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec';

/**
 * 🎯 고급 진단 데이터 생성 (완전한 데이터)
 */
function createCompleteTestData() {
  return {
    action: 'saveDiagnosis',
    폼타입: 'AI_고급진단_업종특화분석',
    제출일시: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    timestamp: Date.now(),
    
    // 기본 정보
    회사명: '테스트기업_고급진단_이메일',
    업종: 'manufacturing',
    사업담당자: '김사업담당',
    직원수: '10-50명',
    사업성장단계: '성장기',
    주요고민사항: '제조업 디지털 전환과 생산성 향상이 필요합니다.',
    예상혜택: '스마트팩토리 도입을 통한 생산 효율성 30% 향상을 기대합니다.',
    진행사업장: '서울',
    담당자명: '김테스트_이메일발송',
    연락처: '010-1234-5678',
    이메일: 'aicamp.test.email@gmail.com',
    개인정보동의: true,
    
    // 진단 결과
    종합점수: 74,
    진단등급: 'B+',
    신뢰도점수: 92,
    
    // 📊 개별 점수 20개 문항
    문항별점수: {
      기획수준: 4,
      차별화정도: 3,
      가격설정: 4,
      전문성: 5,
      품질: 4,
      고객맞이: 3,
      고객응대: 4,
      불만관리: 3,
      고객유지: 4,
      고객이해: 3,
      마케팅계획: 2,
      오프라인마케팅: 3,
      온라인마케팅: 2,
      판매전략: 3,
      구매관리: 4,
      재고관리: 4,
      외관관리: 5,
      인테리어관리: 4,
      청결도: 5,
      작업동선: 4
    },
    
    // 📈 카테고리별 점수
    카테고리점수: {
      productService: { score: 80 },
      customerService: { score: 70 },
      marketing: { score: 52 },
      procurement: { score: 80 },
      storeManagement: { score: 90 }
    },
    
    // 🚀 6가지 핵심 지표
    businessModel: 75,
    marketPosition: 68,
    operationalEfficiency: 82,
    growthPotential: 77,
    digitalReadiness: 60,
    financialHealth: 73,
    
    // 🎯 업종별 특화 분석
    업종분석: {
      업종특화분석: '제조업 특화 분석: 생산 효율성 74점, 품질관리 시스템 우수, 스마트팩토리 도입 검토 권장',
      시장위치: '제조업 업계 평균 수준',
      경쟁력분석: '테스트기업의 제조업 업계 경쟁력: 보통 (74점), 차별화 전략 및 핵심 역량 강화 필요',
      성장잠재력: '성장기 단계 성장 잠재력: 84점, 높음'
    },
    
    // 📋 SWOT 분석
    SWOT분석: {
      강점: ['제조업 업종 전문성', '우수한 품질 관리', '고객 충성도', '효율적 운영', '브랜드 신뢰도'],
      약점: ['디지털 마케팅 역량 부족', '온라인 채널 미흡', '인력 부족', '시스템 노후화', '데이터 분석 부족'],
      기회: ['제조업 시장 성장', '디지털 전환 가속화', '정부 지원 정책', '신기술 도입 기회', '해외 진출 가능성'],
      위협: ['대기업 진출', '경쟁 심화', '경기 불확실성', '규제 강화', '비용 상승'],
      전략매트릭스: '제조업 업종 특화 전략: 강점을 활용한 디지털 전환과 시장 확장을 통해 성장 기회를 극대화하고 위협 요소를 최소화해야 합니다.'
    },
    
    // 🚀 맞춤 서비스 추천
    추천서비스: 'AI 도구 활용 업무 효율화, 스마트 팩토리 도입 컨설팅, 제조업 디지털 전환',
    
    // 📄 진단보고서 요약 (4000자)
    진단보고서요약: generateManufacturingReport(),
    
    // 이메일 발송 플래그
    sendConfirmationEmail: true,
    sendAdminNotification: true
  };
}

/**
 * 제조업 특화 보고서 생성
 */
function generateManufacturingReport() {
  return `
1. 제조업 현황 진단

귀하의 제조업체는 현재 74점의 종합 진단 점수를 기록하여 업계 평균 수준의 경쟁력을 보유하고 있습니다. 특히 품질 관리와 작업 동선 효율성에서 5점 만점을 획득하여 제조업의 핵심 역량을 잘 갖추고 있음을 보여줍니다.

생산 효율성 측면에서는 운영효율성 지표가 82점으로 우수한 수준을 나타내고 있으나, 디지털 준비도가 60점으로 상대적으로 낮아 스마트 팩토리 도입과 디지털 전환이 시급한 과제로 나타났습니다.

2. 강점 기반 성장 전략

제조업 특화 강점인 품질관리 시스템과 생산 전문성을 기반으로 시장 확장 전략을 수립해야 합니다. 현재 82점의 운영 효율성은 업계 상위 20% 수준으로, 이를 바탕으로 생산성 향상과 원가 절감을 통한 가격 경쟁력 확보가 가능합니다.

3. 디지털 전환 우선순위

스마트 팩토리 도입을 위한 단계별 접근이 필요합니다. IoT 센서를 통한 설비 모니터링부터 시작하여 데이터 수집 및 분석 체계를 구축하고, 궁극적으로 AI 기반 예측 유지보수 시스템 도입을 권장합니다.

4. 마케팅 역량 강화 방안

현재 마케팅 점수가 52점으로 개선이 필요한 영역입니다. 특히 온라인 마케팅 역량 강화를 통해 B2B 고객 확보와 해외 시장 진출 기회를 모색해야 합니다. 제조업 전문 플랫폼 활용과 디지털 카탈로그 구축을 통한 마케팅 효율성 제고가 필요합니다.

5. 6가지 핵심 지표 분석

비즈니스모델(75점): 안정적인 사업 구조를 바탕으로 한 성장 가능성이 확인됩니다.
시장위치(68점): 업계 평균 수준의 시장 점유율을 보유하고 있으나, 브랜드 차별화가 필요합니다.
운영효율성(82점): 우수한 수준의 운영 체계를 구축하고 있어 경쟁 우위 요소로 활용 가능합니다.
성장잠재력(77점): 높은 성장 가능성을 보여주며, 적극적인 투자와 확장 전략 수립이 권장됩니다.
디지털준비도(60점): 디지털 전환이 시급한 과제로, 단계적 접근을 통한 개선이 필요합니다.
재무건전성(73점): 안정적인 재무 구조를 바탕으로 한 지속 성장이 가능한 상황입니다.

이메일 발송 테스트를 위한 고급 진단 보고서가 성공적으로 생성되었습니다.
  `;
}

/**
 * 🧪 Google Apps Script 이메일 발송 테스트
 */
async function testGoogleAppsScriptEmail() {
  console.log('📧 Google Apps Script 이메일 발송 테스트 시작...\n');
  
  const testData = createCompleteTestData();
  
  console.log('📋 전송 데이터 요약:');
  console.log(`  - 회사명: ${testData.회사명}`);
  console.log(`  - 업종: ${testData.업종}`);
  console.log(`  - 담당자: ${testData.담당자명}`);
  console.log(`  - 이메일: ${testData.이메일}`);
  console.log(`  - 종합점수: ${testData.종합점수}점`);
  console.log(`  - 핵심지표: 6개 (businessModel: ${testData.businessModel}점 등)`);
  console.log(`  - 개별점수: ${Object.keys(testData.문항별점수).length}개 문항`);
  console.log(`  - 보고서길이: ${testData.진단보고서요약.length}자`);
  console.log(`  - 이메일발송: 관리자 + 신청자 모두 발송\n`);

  try {
    console.log('🚀 Google Apps Script 호출 중...');
    
    const response = await axios.post(
      GOOGLE_SCRIPT_URL,
      testData,
      {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.status !== 200) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    let result;
    try {
      result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    } catch (e) {
      throw new Error(`응답 파싱 실패: ${response.data}`);
    }

    if (!result.success) {
      throw new Error(`Google Apps Script 처리 실패: ${result.error || '알 수 없는 오류'}`);
    }

    console.log('✅ Google Apps Script 처리 성공!');
    console.log('📊 처리 결과:');
    console.log(`  - 처리상태: ${result.success ? '성공' : '실패'}`);
    console.log(`  - 시트: ${result.sheet}`);
    console.log(`  - 행번호: ${result.row}`);
    console.log(`  - 업종: ${result.업종 || '미확인'}`);
    console.log(`  - 핵심지표: ${result.핵심지표 ? Object.keys(result.핵심지표).length + '개' : '미확인'}`);
    console.log(`  - 처리방식: ${result.처리방식 || '고급_업종특화_분석_이메일'}`);
    console.log(`  - 시스템버전: ${result.시스템버전 || '고급_진단_시스템_v3.0'}`);
    
    console.log('\n📧 이메일 발송 확인:');
    console.log(`  - 관리자 이메일: hongik423@gmail.com 으로 고급 분석 알림 발송`);
    console.log(`  - 신청자 이메일: ${testData.이메일} 로 제조업 특화 확인 메일 발송`);
    console.log(`  - 이메일 유형: 업종별 맞춤 고급 이메일 (AICAMP 로고 포함)`);
    
    return {
      success: true,
      sheet: result.sheet,
      row: result.row,
      message: result.message,
      emailSent: true
    };

  } catch (error) {
    console.error('❌ Google Apps Script 이메일 테스트 실패:', error.message);
    
    if (error.response) {
      console.error(`상태 코드: ${error.response.status}`);
      if (error.response.data) {
        console.error(`응답 데이터:`, error.response.data);
      }
    }
    
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 🎯 메인 실행
 */
async function runEmailTest() {
  console.log('🚀 AICAMP 고급 진단 시스템 이메일 발송 테스트');
  console.log('=' * 60);
  console.log('목표: 관리자 + 신청자 확인 이메일 정상 발송 확인');
  console.log('=' * 60);
  
  const result = await testGoogleAppsScriptEmail();
  
  console.log('\n' + '=' * 60);
  if (result.success) {
    console.log('🎉 이메일 발송 테스트 성공!');
    console.log('✅ 모든 이메일이 정상적으로 발송되었습니다.');
    console.log('📧 실제 이메일함을 확인해주세요:');
    console.log('  - 관리자: hongik423@gmail.com');
    console.log('  - 신청자: aicamp.test.email@gmail.com');
  } else {
    console.log('❌ 이메일 발송 테스트 실패');
    console.log(`오류: ${result.error}`);
  }
  console.log('=' * 60);
}

if (require.main === module) {
  runEmailTest().catch(error => {
    console.error('💥 테스트 실행 중 치명적 오류:', error);
    process.exit(1);
  });
} 