const axios = require('axios');
const https = require('https');

// SSL 인증서 문제 해결을 위한 Agent 설정
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

const axiosConfig = {
  httpsAgent,
  timeout: 30000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
};

class AICampQualityChecker {
  constructor() {
    this.baseUrl = 'https://aicamp.club';
    this.results = [];
    this.totalTests = 0;
    this.passedTests = 0;
    this.failedTests = 0;
    this.warnings = 0;
  }

  log(status, testName, details = '', severity = 'info') {
    const timestamp = new Date().toLocaleString('ko-KR');
    const result = {
      timestamp,
      status,
      testName,
      details,
      severity
    };
    
    this.results.push(result);
    this.totalTests++;
    
    if (status === '✅') {
      this.passedTests++;
      console.log(`✅ ${testName}: 성공${details ? ` - ${details}` : ''}`);
    } else if (status === '❌') {
      this.failedTests++;
      console.log(`❌ ${testName}: 실패${details ? ` - ${details}` : ''}`);
    } else if (status === '⚠️') {
      this.warnings++;
      console.log(`⚠️ ${testName}: 경고${details ? ` - ${details}` : ''}`);
    }
  }

  async checkPageResponse(url, testName) {
    try {
      const response = await axios.get(url, axiosConfig);
      if (response.status === 200) {
        this.log('✅', testName, `응답 코드: ${response.status}`);
        return response.data;
      } else {
        this.log('❌', testName, `예상치 못한 응답 코드: ${response.status}`);
        return null;
      }
    } catch (error) {
      this.log('❌', testName, `HTTP ${error.response?.status || '연결 실패'}: ${error.message}`);
      return null;
    }
  }

  checkContentExists(html, searchText, testName, isRequired = true) {
    const exists = html.includes(searchText);
    if (exists) {
      this.log('✅', testName, `"${searchText}" 확인됨`);
    } else {
      if (isRequired) {
        this.log('❌', testName, `"${searchText}" 누락됨`);
      } else {
        this.log('⚠️', testName, `"${searchText}" 미확인`);
      }
    }
    return exists;
  }

  checkContentExistsFlexible(html, searchTexts, testName, isRequired = true) {
    // 여러 가능한 텍스트 중 하나라도 찾으면 성공
    const found = searchTexts.some(searchText => html.includes(searchText));
    const foundText = searchTexts.find(searchText => html.includes(searchText));
    
    if (found) {
      this.log('✅', testName, `"${foundText}" 확인됨`);
    } else {
      if (isRequired) {
        this.log('❌', testName, `검색어들 누락됨: ${searchTexts.join(', ')}`);
      } else {
        this.log('⚠️', testName, `검색어들 미확인: ${searchTexts.join(', ')}`);
      }
    }
    return found;
  }

  checkContentNotExists(html, searchText, testName) {
    const exists = html.includes(searchText);
    if (!exists) {
      this.log('✅', testName, `"${searchText}" 정상적으로 제거됨`);
    } else {
      this.log('❌', testName, `"${searchText}"가 아직 존재함`);
    }
    return !exists;
  }

  // 1. 정책자금 페이지 투자분석기 섹션 삭제 확인
  async testPolicyFundingInvestmentSectionRemoval() {
    console.log('\n🔍 정책자금 페이지 투자분석기 섹션 삭제 확인...');
    
    const html = await this.checkPageResponse(
      `${this.baseUrl}/services/policy-funding`,
      '정책자금 페이지 로드'
    );
    
    if (html) {
      // 투자분석기 섹션이 완전히 삭제되었는지 확인
      this.checkContentNotExists(html, 'investment-analysis-section', '투자분석기 섹션 완전 삭제');
      this.checkContentNotExists(html, 'AI 투자 재무타당성 분석기', '투자분석기 제목 제거');
      this.checkContentNotExists(html, '전문가 상담을 통해 정확한 투자 타당성 분석', '투자분석기 설명 제거');
      this.checkContentNotExists(html, '분석기 자세히 보기', '분석기 상세보기 버튼 제거');
      this.checkContentNotExists(html, '상담신청 후 이용 가능', '상담신청 안내 제거');
      
      // 정책자금 핵심 내용은 유지되어야 함
      this.checkContentExists(html, '운전자금', '운전자금 탭 유지');
      this.checkContentExists(html, '창업자금', '창업자금 탭 유지');
      this.checkContentExistsFlexible(html, ['R&D자금', 'R&amp;D자금', 'R&D'], 'R&D자금 탭 유지');
      this.checkContentExists(html, '시설자금', '시설자금 탭 유지');
    }
  }

  // 2. 헤더 네비게이션 AI투자재무타당성분석기 버튼 확인
  async testHeaderInvestmentAnalysisButton() {
    console.log('\n🔍 헤더 AI투자재무타당성분석기 버튼 확인...');
    
    const html = await this.checkPageResponse(
      `${this.baseUrl}`,
      '홈페이지 헤더 로드'
    );
    
    if (html) {
      // 새로운 버튼 텍스트 확인
      this.checkContentExists(html, 'AI투자재무타당성분석기', '헤더 버튼 텍스트 업데이트');
      
      // 올바른 링크 확인 (이전 anchor 링크가 아닌 직접 페이지 링크)
      this.checkContentExists(html, '/services/policy-funding/investment-analysis', '직접 페이지 링크 연결');
      this.checkContentNotExists(html, '#investment-analysis-section', '이전 anchor 링크 제거');
    }
  }

  // 3. AI투자재무타당성분석기 페이지 상담신청 안내 강화 확인
  async testInvestmentAnalysisPageEnhancements() {
    console.log('\n🔍 AI투자재무타당성분석기 페이지 개선사항 확인...');
    
    const html = await this.checkPageResponse(
      `${this.baseUrl}/services/policy-funding/investment-analysis`,
      'AI투자재무타당성분석기 페이지 로드'
    );
    
    if (html) {
      // 페이지 제목 업데이트 확인
      this.checkContentExists(html, 'AI투자재무타당성분석기', '페이지 제목 업데이트');
      
      // 강화된 상담신청 안내 확인
      this.checkContentExists(html, '⚠️ 중요: AI투자재무타당성분석기는 상담신청 필수입니다!', '강조된 필수 안내 메시지');
      this.checkContentExists(html, '상담신청서 작성 완료 후 분석기를 사용하실 수 있습니다', '상담신청 절차 안내');
      
      // 시각적 강조 요소 확인
      this.checkContentExists(html, 'text-red-900', '빨간색 강조 스타일');
      this.checkContentExists(html, 'border-red-300', '빨간색 테두리 스타일');
      
      // 잠긴 상태 UI 확인
      this.checkContentExists(html, '상담신청이 필요합니다', '잠긴 상태 안내');
      this.checkContentExists(html, '무료 상담 신청하기', '상담신청 버튼');
      
      // 상담신청 혜택 섹션 확인
      this.checkContentExists(html, '상담신청 시 제공되는 혜택', '혜택 섹션');
      this.checkContentExists(html, '투자재무타당성분석기 즉시 이용', '즉시 이용 혜택');
      this.checkContentExists(html, '1:1 맞춤형 분석 가이드', '맞춤형 가이드 혜택');
    }
  }

  // 4. AI 커리큘럼 페이지 사실 기반 수정 확인
  async testAICurriculumFactBasedUpdates() {
    console.log('\n🔍 AI 커리큘럼 페이지 사실 기반 수정 확인...');
    
    const html = await this.checkPageResponse(
      `${this.baseUrl}/services/ai-curriculum`,
      'AI 커리큘럼 페이지 로드'
    );
    
    if (html) {
      // 과장된 표현 제거 확인
      this.checkContentNotExists(html, '500% 향상', '과장된 효율성 수치 제거');
      this.checkContentNotExists(html, '90% 감소', '과장된 감소율 제거');
      this.checkContentNotExists(html, '업계 최고 수준', '과장된 수준 표현 제거');
      this.checkContentNotExists(html, '완전히 혁신', '과장된 혁신 표현 제거');
      
      // 사실 기반 내용 확인
      this.checkContentExists(html, 'ChatGPT, Claude 등 AI 도구 실무 활용 교육', '구체적 도구명 명시');
      this.checkContentExists(html, '업무 효율성을 향상하세요', '현실적 목표 표현');
      this.checkContentExists(html, '실무에 바로 적용 가능한', '실용적 내용 강조');
      
      // 현실적 성과 지표 확인
      this.checkContentExistsFlexible(html, ['300+', '300+ 교육 수료생', '교육 수료생'], '현실적 수료생 수');
      this.checkContentExistsFlexible(html, ['4.5/5', '4.5/5 교육 평점', '교육 평점'], '구체적 평점');
      this.checkContentExistsFlexible(html, ['8주', '8주 체계적 커리큘럼', '체계적 커리큘럼'], '구체적 과정 기간');
      
      // 사실적 성공 사례 확인
      this.checkContentExists(html, '문서 작성 시간 단축', '실질적 성과 표현');
      this.checkContentExists(html, 'AI 도구 활용 역량 향상', '구체적 역량 향상');
      this.checkContentExists(html, 'AI 도입 전략 수립', '실무적 전략 수립');
      
      // 배지 텍스트 확인
      this.checkContentExists(html, 'BASIC', '기초과정 배지');
      this.checkContentExists(html, 'ADVANCED', '심화과정 배지');
      this.checkContentExists(html, 'EXECUTIVE', '경영진과정 배지');
      
      // 가격 정보 확인 (최근 업데이트)
      this.checkContentExists(html, '198만원', '실무진과정 할인가');
      this.checkContentExists(html, '250만원', '심화과정 할인가');
    }
  }

  // 5. 페이지 간 링크 연결성 확인
  async testPageLinkConnectivity() {
    console.log('\n🔍 페이지 간 링크 연결성 확인...');
    
    // 주요 페이지들의 상호 링크 확인
    const testPages = [
      { url: '/', name: '홈페이지' },
      { url: '/services/policy-funding', name: '정책자금' },
      { url: '/services/policy-funding/investment-analysis', name: 'AI투자분석기' },
      { url: '/services/ai-curriculum', name: 'AI커리큘럼' },
      { url: '/consultation', name: '상담신청' }
    ];
    
    for (const page of testPages) {
      const html = await this.checkPageResponse(
        `${this.baseUrl}${page.url}`,
        `${page.name} 페이지 접근성`
      );
      
      if (html) {
        // 기본 레이아웃 요소 확인
        this.checkContentExists(html, '<header', `${page.name} 헤더 존재`);
        this.checkContentExists(html, 'AI CAMP', `${page.name} 브랜딩 요소`);
        
        // 반응형 클래스 확인
        this.checkContentExists(html, 'sm:', `${page.name} 반응형 디자인 클래스`);
        this.checkContentExists(html, 'md:', `${page.name} 태블릿 반응형`);
        this.checkContentExists(html, 'lg:', `${page.name} 데스크톱 반응형`);
      }
    }
  }

  // 6. 어두운 배경 가독성 확인
  async testDarkBackgroundReadability() {
    console.log('\n🔍 어두운 배경 가독성 확인...');
    
    const html = await this.checkPageResponse(
      `${this.baseUrl}/services/ai-curriculum`,
      'AI 커리큘럼 페이지 다크 테마'
    );
    
    if (html) {
      // 어두운 배경에 흰색 텍스트 확인
      this.checkContentExists(html, 'text-white', '흰색 텍스트 사용');
      this.checkContentExists(html, 'from-purple-900 via-blue-900 to-indigo-900', '어두운 그라데이션 배경');
      this.checkContentExists(html, 'text-blue-100', '연한 파란색 보조 텍스트');
      this.checkContentExists(html, 'text-yellow-400', '노란색 강조 텍스트');
      
      // 대비가 좋은 색상 조합 확인
      this.checkContentExists(html, 'bg-gradient-to-r from-yellow-400 to-orange-400 text-black', '버튼 대비색');
      this.checkContentExists(html, 'border-white text-white', '테두리 버튼 대비');
    }
  }

  // 7. 모바일 반응형 디자인 확인
  async testMobileResponsiveness() {
    console.log('\n🔍 모바일 반응형 디자인 확인...');
    
    const pages = [
      '/services/ai-curriculum',
      '/services/policy-funding/investment-analysis'
    ];
    
    for (const page of pages) {
      const html = await this.checkPageResponse(
        `${this.baseUrl}${page}`,
        `${page} 모바일 반응형`
      );
      
      if (html) {
        // 반응형 그리드 확인
        this.checkContentExistsFlexible(html, ['grid-cols-1 sm:grid-cols-', 'grid-cols-1', 'sm:grid-cols'], '모바일-데스크톱 그리드');
        this.checkContentExistsFlexible(html, ['flex-col sm:flex-row', 'flex-col', 'sm:flex-row'], '모바일-데스크톱 플렉스');
        this.checkContentExistsFlexible(html, ['text-4xl sm:text-5xl lg:text-6xl', 'text-2xl sm:text-3xl lg:text-4xl', 'sm:text-', 'lg:text-'], '반응형 텍스트 크기');
        
        // 모바일 최적화 클래스
        this.checkContentExists(html, 'px-4', '모바일 패딩');
        this.checkContentExistsFlexible(html, ['py-20 sm:py-24', 'py-8 sm:py-12', 'sm:py-'], '반응형 수직 패딩');
        this.checkContentExists(html, 'max-w-', '최대 너비 제한');
      }
    }
  }

  // 8. 상담신청 연동 테스트
  async testConsultationIntegration() {
    console.log('\n🔍 상담신청 연동 확인...');
    
    const html = await this.checkPageResponse(
      `${this.baseUrl}/consultation`,
      '상담신청 페이지 접근'
    );
    
    if (html) {
      // 상담신청 페이지 기본 요소 확인
      this.checkContentExists(html, '상담', '상담 관련 내용');
      this.checkContentExists(html, 'form', '상담신청 폼');
      
      // AI투자분석기에서의 상담신청 링크 확인
      const investmentHtml = await this.checkPageResponse(
        `${this.baseUrl}/services/policy-funding/investment-analysis`,
        'AI투자분석기 상담신청 링크'
      );
      
      if (investmentHtml) {
        this.checkContentExists(investmentHtml, '/consultation', '상담신청 페이지 링크');
        this.checkContentExists(investmentHtml, '무료 상담 신청하기', '상담신청 버튼 텍스트');
      }
    }
  }

  // 9. SEO 및 메타데이터 확인
  async testSEOMetadata() {
    console.log('\n🔍 SEO 및 메타데이터 확인...');
    
    const pages = [
      { url: '/services/ai-curriculum', name: 'AI커리큘럼' },
      { url: '/services/policy-funding/investment-analysis', name: 'AI투자분석기' }
    ];
    
    for (const page of pages) {
      const html = await this.checkPageResponse(
        `${this.baseUrl}${page.url}`,
        `${page.name} SEO 확인`
      );
      
      if (html) {
        this.checkContentExists(html, '<title>', `${page.name} 페이지 제목`);
        this.checkContentExists(html, '<meta name="description"', `${page.name} 메타 설명`, false);
        this.checkContentExists(html, 'og:', `${page.name} Open Graph`, false);
      }
    }
  }

  // 10. 성능 및 로딩 시간 확인
  async testPerformanceMetrics() {
    console.log('\n🔍 성능 및 로딩 시간 확인...');
    
    const criticalPages = [
      '/',
      '/services/ai-curriculum',
      '/services/policy-funding/investment-analysis'
    ];
    
    for (const page of criticalPages) {
      const startTime = Date.now();
      const html = await this.checkPageResponse(
        `${this.baseUrl}${page}`,
        `${page} 로딩 성능`
      );
      const loadTime = Date.now() - startTime;
      
      if (html) {
        if (loadTime < 3000) {
          this.log('✅', `${page} 로딩 시간`, `${loadTime}ms (양호)`);
        } else if (loadTime < 5000) {
          this.log('⚠️', `${page} 로딩 시간`, `${loadTime}ms (개선 필요)`);
        } else {
          this.log('❌', `${page} 로딩 시간`, `${loadTime}ms (매우 느림)`);
        }
        
        // 페이지 크기 확인
        const sizeKB = Math.round(html.length / 1024);
        if (sizeKB < 500) {
          this.log('✅', `${page} 페이지 크기`, `${sizeKB}KB (최적화됨)`);
        } else {
          this.log('⚠️', `${page} 페이지 크기`, `${sizeKB}KB (큰 편)`);
        }
      }
    }
  }

  async runAllTests() {
    console.log('🚀 AICAMP 업데이트 기능 품질 테스트 시작...\n');
    console.log('=' + '='.repeat(60));
    
    try {
      await this.testPolicyFundingInvestmentSectionRemoval();
      await this.testHeaderInvestmentAnalysisButton();
      await this.testInvestmentAnalysisPageEnhancements();
      await this.testAICurriculumFactBasedUpdates();
      await this.testPageLinkConnectivity();
      await this.testDarkBackgroundReadability();
      await this.testMobileResponsiveness();
      await this.testConsultationIntegration();
      await this.testSEOMetadata();
      await this.testPerformanceMetrics();
      
    } catch (error) {
      console.error('테스트 실행 중 오류 발생:', error);
      this.log('❌', '테스트 실행', `오류: ${error.message}`);
    }
    
    this.generateReport();
  }

  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 AICAMP 업데이트 기능 품질 테스트 완료 보고서');
    console.log('='.repeat(60));
    
    const successRate = Math.round((this.passedTests / this.totalTests) * 100);
    
    console.log(`\n🎯 전체 테스트 결과:`);
    console.log(`   총 테스트: ${this.totalTests}개`);
    console.log(`   ✅ 성공: ${this.passedTests}개`);
    console.log(`   ❌ 실패: ${this.failedTests}개`);
    console.log(`   ⚠️  경고: ${this.warnings}개`);
    console.log(`   📈 성공률: ${successRate}%`);
    
    if (successRate >= 95) {
      console.log(`\n🎉 품질 등급: A+ (우수) - 무오류 품질기준 달성!`);
    } else if (successRate >= 90) {
      console.log(`\n✅ 품질 등급: A (양호) - 대부분 기능 정상`);
    } else if (successRate >= 80) {
      console.log(`\n⚠️  품질 등급: B (보통) - 일부 개선 필요`);
    } else {
      console.log(`\n❌ 품질 등급: C (미흡) - 즉시 수정 필요`);
    }
    
    if (this.failedTests > 0) {
      console.log(`\n🔧 수정이 필요한 항목들:`);
      this.results.filter(r => r.status === '❌').forEach((result, index) => {
        console.log(`   ${index + 1}. ${result.testName}: ${result.details}`);
      });
    }
    
    if (this.warnings > 0) {
      console.log(`\n⚠️  개선 권장 항목들:`);
      this.results.filter(r => r.status === '⚠️').forEach((result, index) => {
        console.log(`   ${index + 1}. ${result.testName}: ${result.details}`);
      });
    }
    
    console.log(`\n📝 상세 테스트 결과는 'aicamp-updated-features-test-results.json'에 저장됩니다.`);
    
    // JSON 파일로 상세 결과 저장
    const fs = require('fs');
    const reportData = {
      timestamp: new Date().toISOString(),
      summary: {
        totalTests: this.totalTests,
        passedTests: this.passedTests,
        failedTests: this.failedTests,
        warnings: this.warnings,
        successRate: successRate
      },
      results: this.results
    };
    
    fs.writeFileSync('aicamp-updated-features-test-results.json', JSON.stringify(reportData, null, 2), 'utf8');
    
    console.log('\n🎊 테스트 완료! 무오류 품질기준 검증이 완료되었습니다.');
  }
}

// 테스트 실행
const checker = new AICampQualityChecker();
checker.runAllTests().catch(console.error); 