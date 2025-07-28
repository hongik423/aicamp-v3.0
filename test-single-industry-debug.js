/**
 * 🏭 제조업 단일 업종 집중 테스트
 * 업종별 최신정보 기능이 정상 작동하는지 상세 확인
 */

const axios = require('axios');

const PRODUCTION_URL = 'https://ai-camp-landingpage.vercel.app';

async function testManufacturingIndustry() {
  console.log('🏭 제조업 업종별 최신정보 기능 테스트');
  console.log('=' * 50);

  const manufacturingData = {
    companyName: '스마트제조솔루션_디버깅테스트',
    industry: 'manufacturing',
    contactManager: '김제조테스트',
    phone: '010-1111-1111',
    email: 'manufacturing.debug@aicamp.com',
    employeeCount: '50-100명',
    growthStage: '성장기',
    businessLocation: '부산',
    mainConcerns: '스마트 팩토리 구축과 AI 기반 품질관리 시스템 도입이 필요합니다',
    expectedBenefits: '생산효율성 향상과 예측 유지보수를 통한 비용 절감',
    privacyConsent: true,
    submitDate: new Date().toISOString(),
    
    // 제조업 특화 점수 (전체 20개 항목)
    planning_level: 4,
    differentiation_level: 3,
    pricing_level: 4,
    expertise_level: 5,
    quality_level: 4,
    customer_greeting: 3,
    customer_service: 4,
    complaint_management: 3,
    customer_retention: 4,
    customer_understanding: 3,
    marketing_planning: 2,
    offline_marketing: 3,
    online_marketing: 2,
    sales_strategy: 3,
    purchase_management: 5,
    inventory_management: 4,
    exterior_management: 5,
    interior_management: 4,
    cleanliness: 5,
    work_flow: 4
  };

  console.log('📊 제조업 테스트 데이터:');
  console.log(`  - 회사명: ${manufacturingData.companyName}`);
  console.log(`  - 업종: ${manufacturingData.industry}`);
  console.log(`  - 직원수: ${manufacturingData.employeeCount}`);
  console.log(`  - 성장단계: ${manufacturingData.growthStage}`);
  console.log(`  - 점수 개수: ${Object.keys(manufacturingData).filter(k => k.includes('_')).length}개`);

  try {
    console.log('\n📤 API 호출 중... (3분 타임아웃)');
    const startTime = Date.now();
    
    const response = await axios.post(
      `${PRODUCTION_URL}/api/simplified-diagnosis`,
      manufacturingData,
      { 
        timeout: 180000, // 3분
        validateStatus: function (status) {
          return status < 600; // 모든 응답 허용
        }
      }
    );

    const processingTime = Date.now() - startTime;
    
    console.log(`\n📊 응답 결과 (${processingTime}ms):`);
    console.log(`  - 상태 코드: ${response.status}`);
    console.log(`  - 성공 여부: ${response.data.success}`);

    if (response.status === 200 && response.data.success) {
      console.log('\n✅ 제조업 진단 성공!');
      
      // 상세 결과 분석
      const data = response.data;
      console.log('\n📋 상세 결과 분석:');
      console.log(`  - 결과 ID: ${data.resultId || '없음'}`);
      console.log(`  - 종합 점수: ${data.diagnosisResult?.totalScore || '미확인'}점`);
      console.log(`  - 신뢰도: ${data.diagnosisResult?.reliabilityScore || '미확인'}%`);
      console.log(`  - 등급: ${data.diagnosisResult?.overallGrade || '미확인'}`);
      
      // 업종별 최신정보 확인
      console.log('\n🏭 업종별 최신정보 확인:');
      const industryInsights = data.diagnosisResult?.industryInsights;
      if (industryInsights) {
        console.log(`  - 업종명: ${industryInsights.industryName || '미확인'}`);
        console.log(`  - 최신업종데이터 존재: ${industryInsights.latestIndustryData ? '✅' : '❌'}`);
        console.log(`  - 맞춤인사이트 존재: ${industryInsights.customInsights ? '✅' : '❌'}`);
        
        if (industryInsights.latestIndustryData) {
          const latestData = industryInsights.latestIndustryData;
          console.log(`  - 업종: ${latestData.industry || '미확인'}`);
          console.log(`  - 성장률: ${latestData.growthRate || '미확인'}`);
          console.log(`  - 시장규모: ${latestData.marketSize || '미확인'}`);
          console.log(`  - 트렌드 개수: ${latestData.trends?.length || 0}개`);
          console.log(`  - 기회 개수: ${latestData.opportunities?.length || 0}개`);
          console.log(`  - 디지털전환요소: ${latestData.digitalTransformation?.length || 0}개`);
          
          if (latestData.trends && latestData.trends.length > 0) {
            console.log(`  - 주요 트렌드 (상위 3개):`);
            latestData.trends.slice(0, 3).forEach((trend, index) => {
              console.log(`    ${index + 1}. ${trend}`);
            });
          }
        }
        
        if (industryInsights.customInsights) {
          const insights = industryInsights.customInsights;
          console.log(`  - 시장분석: ${insights.marketAnalysis ? '✅' : '❌'}`);
          console.log(`  - 경쟁환경: ${insights.competitiveLandscape ? '✅' : '❌'}`);
          console.log(`  - 디지털준비도: ${insights.digitalReadiness ? '✅' : '❌'}`);
          console.log(`  - 벤치마크점수: ${Object.keys(insights.benchmarkScores || {}).length}개`);
        }
      } else {
        console.log('  - ❌ 업종별 인사이트 데이터 없음');
      }
      
      // 보고서 확인
      console.log('\n📝 보고서 확인:');
      console.log(`  - 보고서 길이: ${data.comprehensiveReport?.length || 0}자`);
      console.log(`  - 4000자 이상: ${(data.comprehensiveReport?.length || 0) >= 4000 ? '✅' : '❌'}`);
      
      if (data.comprehensiveReport) {
        const reportPreview = data.comprehensiveReport.substring(0, 200);
        console.log(`  - 보고서 미리보기: ${reportPreview}...`);
        
        // 업종별 키워드 확인
        const keywords = ['스마트 팩토리', 'AI 기반', '제조업', '생산효율성', '품질관리'];
        const foundKeywords = keywords.filter(keyword => 
          data.comprehensiveReport.includes(keyword)
        );
        console.log(`  - 제조업 키워드 포함: ${foundKeywords.length}/${keywords.length}개`);
        console.log(`  - 포함된 키워드: ${foundKeywords.join(', ')}`);
      }
      
      return {
        status: 'SUCCESS',
        processingTime,
        hasLatestData: !!industryInsights?.latestIndustryData,
        hasCustomInsights: !!industryInsights?.customInsights,
        reportLength: data.comprehensiveReport?.length || 0,
        totalScore: data.diagnosisResult?.totalScore || 0
      };

    } else {
      console.log(`\n❌ 제조업 진단 실패 (${response.status})`);
      console.log('오류 내용:', response.data);
      
      return {
        status: 'FAILED',
        error: response.data?.error || 'Unknown error',
        statusCode: response.status
      };
    }

  } catch (error) {
    console.error('\n💥 제조업 테스트 중 오류:', error.message);
    
    if (error.response) {
      console.error('  - HTTP 상태:', error.response.status);
      console.error('  - 응답 데이터:', error.response.data);
    }
    
    if (error.code === 'ECONNABORTED') {
      console.error('  - 타임아웃 발생 (3분 초과)');
    }
    
    return {
      status: 'ERROR',
      error: error.message,
      code: error.code
    };
  }
}

async function main() {
  try {
    console.log('🚀 제조업 업종별 최신정보 시스템 집중 테스트');
    console.log('📅 테스트 시간:', new Date().toLocaleString('ko-KR'));
    console.log('🌐 대상 URL:', PRODUCTION_URL);
    console.log('');

    const result = await testManufacturingIndustry();
    
    console.log('\n' + '=' * 50);
    console.log('🎉 제조업 테스트 최종 결과');
    console.log('=' * 50);
    
    if (result.status === 'SUCCESS') {
      console.log('✅ 제조업 진단 성공!');
      console.log(`📊 처리 시간: ${result.processingTime}ms`);
      console.log(`🏭 최신 업종 데이터: ${result.hasLatestData ? '✅ 적용됨' : '❌ 누락'}`);
      console.log(`🎯 맞춤 인사이트: ${result.hasCustomInsights ? '✅ 생성됨' : '❌ 누락'}`);
      console.log(`📝 보고서 길이: ${result.reportLength}자`);
      console.log(`📈 종합 점수: ${result.totalScore}점`);
      
      if (result.hasLatestData && result.hasCustomInsights && result.reportLength > 1000) {
        console.log('\n🎉 업종별 최신정보 기능 완벽 작동!');
      } else {
        console.log('\n⚠️ 일부 기능이 누락되었습니다. 추가 디버깅 필요.');
      }
    } else {
      console.log('❌ 제조업 진단 실패');
      console.log(`오류: ${result.error}`);
      console.log('\n🔧 디버깅 권장사항:');
      console.log('1. API 엔드포인트 확인');
      console.log('2. IndustryDataService import 확인');
      console.log('3. 환경변수 설정 확인');
    }
    
  } catch (error) {
    console.error('\n💥 메인 테스트 실행 중 오류:', error.message);
  }
}

if (require.main === module) {
  main();
}

module.exports = { testManufacturingIndustry }; 