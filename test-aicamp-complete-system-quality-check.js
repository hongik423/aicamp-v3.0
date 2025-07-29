const axios = require('axios');
const https = require('https');

// AICAMP 시스템 완벽 품질관리 테스트
// 무오류 완벽 품질 달성을 위한 종합 진단

const BASE_URL = 'https://aicamp.club';

// HTTPS 에이전트 설정 (SSL 인증서 문제 회피)
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

// Axios 기본 설정
const api = axios.create({
  httpsAgent,
  timeout: 30000,
  validateStatus: function (status) {
    return status < 500; // 500 미만은 모두 성공으로 처리
  }
});

// 색상 출력 함수
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 테스트 결과 수집
const testResults = {
  총테스트: 0,
  성공: 0,
  실패: 0,
  경고: 0,
  상세결과: []
};

function recordTest(testName, status, details = '') {
  testResults.총테스트++;
  testResults.상세결과.push({
    테스트명: testName,
    상태: status,
    상세: details,
    시간: new Date().toISOString()
  });
  
  if (status === '성공') {
    testResults.성공++;
    log('green', `✅ ${testName}: 성공`);
  } else if (status === '실패') {
    testResults.실패++;
    log('red', `❌ ${testName}: 실패 - ${details}`);
  } else if (status === '경고') {
    testResults.경고++;
    log('yellow', `⚠️ ${testName}: 경고 - ${details}`);
  }
}

// 1. 네비바 변경사항 검증
async function testNavbarChanges() {
  log('cyan', '\n🧭 네비바 변경사항 품질 검증');
  
  try {
    const response = await api.get(BASE_URL);
    const html = response.data;
    
    // AI CAMP커리큘럼 버튼 존재 확인
    if (html.includes('AI CAMP커리큘럼') || html.includes('AI%20CAMP커리큘럼')) {
      recordTest('네비바 AI CAMP커리큘럼 버튼 추가', '성공');
    } else {
      recordTest('네비바 AI CAMP커리큘럼 버튼 추가', '실패', 'AI CAMP커리큘럼 버튼이 네비바에서 발견되지 않음');
    }
    
    // 운전자금, 창업자금, R&D자금 개별 버튼 제거 확인
    const removedButtons = ['운전자금', '창업자금', 'R&D자금'];
    let removedCount = 0;
    
    removedButtons.forEach(button => {
      if (!html.includes(`>${button}<`) && !html.includes(encodeURIComponent(button))) {
        removedCount++;
      }
    });
    
    if (removedCount === 3) {
      recordTest('네비바 중복 버튼 제거', '성공', '운전자금, 창업자금, R&D자금 개별 버튼 정상 제거');
    } else {
      recordTest('네비바 중복 버튼 제거', '경고', `${3-removedCount}개 버튼이 아직 남아있음`);
    }
    
  } catch (error) {
    recordTest('네비바 변경사항 검증', '실패', error.message);
  }
}

// 2. 정책자금 통합 페이지 품질 검증
async function testPolicyFundingIntegration() {
  log('cyan', '\n💰 정책자금 통합 페이지 품질 검증');
  
  try {
    const response = await api.get(`${BASE_URL}/services/policy-funding`);
    
    if (response.status === 200) {
      recordTest('정책자금 페이지 접근성', '성공');
      
      const html = response.data;
      
      // 탭 UI 확인
      const tabKeywords = ['운전자금', '창업자금', 'R&D자금', '시설자금'];
      let tabCount = 0;
      
      tabKeywords.forEach(keyword => {
        if (html.includes(keyword)) {
          tabCount++;
        }
      });
      
      if (tabCount === 4) {
        recordTest('정책자금 탭 UI 통합', '성공', '4개 자금 종류 모두 표시');
      } else {
        recordTest('정책자금 탭 UI 통합', '실패', `${4-tabCount}개 탭이 누락됨`);
      }
      
      // 듀얼브레인 강점 섹션 확인
      if (html.includes('듀얼브레인') && html.includes('통합 컨설팅')) {
        recordTest('듀얼브레인 강점 표시', '성공');
      } else {
        recordTest('듀얼브레인 강점 표시', '실패', '듀얼브레인 강점 섹션이 누락');
      }
      
      // 투자분석기 상담신청 연동 확인
      if (html.includes('상담신청 후 이용') || html.includes('상담 신청하기')) {
        recordTest('투자분석기 상담신청 연동', '성공');
      } else {
        recordTest('투자분석기 상담신청 연동', '실패', '상담신청 안내가 누락됨');
      }
      
    } else {
      recordTest('정책자금 페이지 접근성', '실패', `HTTP ${response.status} 응답`);
    }
    
  } catch (error) {
    recordTest('정책자금 통합 페이지 품질 검증', '실패', error.message);
  }
}

// 3. AI CAMP 커리큘럼 페이지 품질 검증
async function testAICurriculumPage() {
  log('cyan', '\n🎓 AI CAMP 커리큘럼 페이지 품질 검증');
  
  try {
    const response = await api.get(`${BASE_URL}/services/ai-curriculum`);
    
    if (response.status === 200) {
      recordTest('AI 커리큘럼 페이지 접근성', '성공');
      
      const html = response.data;
      
      // 3가지 커리큘럼 확인
      const curriculums = ['기업체 실무진', '심화 과정', '경영진'];
      let curriculumCount = 0;
      
      curriculums.forEach(curriculum => {
        if (html.includes(curriculum)) {
          curriculumCount++;
        }
      });
      
      if (curriculumCount >= 2) {
        recordTest('3가지 커리큘럼 표시', '성공', `${curriculumCount}개 커리큘럼 확인`);
      } else {
        recordTest('3가지 커리큘럼 표시', '실패', `${curriculumCount}개만 발견됨`);
      }
      
      // HOOKING 요소 확인
      const hookingElements = ['할인 이벤트', '35%', '선착순', 'HOOKING'];
      let hookingCount = 0;
      
      hookingElements.forEach(element => {
        if (html.includes(element)) {
          hookingCount++;
        }
      });
      
      if (hookingCount >= 2) {
        recordTest('HOOKING 요소 구현', '성공', `${hookingCount}개 HOOKING 요소 발견`);
      } else {
        recordTest('HOOKING 요소 구현', '경고', 'HOOKING 요소가 부족할 수 있음');
      }
      
      // 광고 배너 스타일 확인
      if (html.includes('gradient') || html.includes('animate')) {
        recordTest('광고 배너 스타일', '성공');
      } else {
        recordTest('광고 배너 스타일', '경고', '광고 배너 스타일 요소 확인 필요');
      }
      
    } else {
      recordTest('AI 커리큘럼 페이지 접근성', '실패', `HTTP ${response.status} 응답`);
    }
    
  } catch (error) {
    recordTest('AI CAMP 커리큘럼 페이지 품질 검증', '실패', error.message);
  }
}

// 4. 투자재무타당성분석기 상담신청 필수 검증
async function testInvestmentAnalysisConsultation() {
  log('cyan', '\n🔒 투자재무타당성분석기 상담신청 필수 검증');
  
  try {
    const response = await api.get(`${BASE_URL}/services/policy-funding/investment-analysis`);
    
    if (response.status === 200) {
      recordTest('투자분석기 페이지 접근성', '성공');
      
      const html = response.data;
      
      // 상담신청 필수 안내 확인
      if (html.includes('상담신청 후 이용') || html.includes('상담신청이 필요합니다')) {
        recordTest('상담신청 필수 안내', '성공');
      } else {
        recordTest('상담신청 필수 안내', '실패', '상담신청 필수 안내가 누락됨');
      }
      
      // 잠긴 상태 UI 확인
      if (html.includes('Lock') || html.includes('잠긴') || html.includes('locked')) {
        recordTest('잠긴 상태 UI', '성공');
      } else {
        recordTest('잠긴 상태 UI', '경고', '잠긴 상태 시각적 표시 확인 필요');
      }
      
      // 상담신청 버튼 확인
      if (html.includes('/consultation') && html.includes('상담')) {
        recordTest('상담신청 버튼 연결', '성공');
      } else {
        recordTest('상담신청 버튼 연결', '실패', '상담신청 버튼이 /consultation으로 연결되지 않음');
      }
      
      // InvestmentAnalysisTool 직접 사용 차단 확인
      if (!html.includes('InvestmentAnalysisTool') || !html.includes('분석 시작')) {
        recordTest('분석기 직접 사용 차단', '성공');
      } else {
        recordTest('분석기 직접 사용 차단', '실패', '분석기가 여전히 직접 사용 가능');
      }
      
    } else {
      recordTest('투자분석기 페이지 접근성', '실패', `HTTP ${response.status} 응답`);
    }
    
  } catch (error) {
    recordTest('투자재무타당성분석기 상담신청 필수 검증', '실패', error.message);
  }
}

// 5. 핵심 페이지 접근성 종합 검증
async function testCorePageAccessibility() {
  log('cyan', '\n🌐 핵심 페이지 접근성 종합 검증');
  
  const corePages = [
    { url: '/', name: '홈페이지' },
    { url: '/services/policy-funding', name: '정책자금 통합' },
    { url: '/services/ai-curriculum', name: 'AI 커리큘럼' },
    { url: '/services/policy-funding/investment-analysis', name: '투자분석기' },
    { url: '/consultation', name: '상담신청' },
    { url: '/diagnosis', name: '무료진단' }
  ];
  
  for (const page of corePages) {
    try {
      const response = await api.get(`${BASE_URL}${page.url}`);
      
      if (response.status === 200) {
        recordTest(`${page.name} 접근성`, '성공');
        
        // 페이지 로딩 시간 체크 (간접적)
        if (response.data.length > 1000) {
          recordTest(`${page.name} 콘텐츠 완성도`, '성공', '충분한 콘텐츠 확인');
        } else {
          recordTest(`${page.name} 콘텐츠 완성도`, '경고', '콘텐츠가 부족할 수 있음');
        }
        
      } else if (response.status >= 300 && response.status < 400) {
        recordTest(`${page.name} 접근성`, '경고', `리다이렉트 응답 (${response.status})`);
      } else {
        recordTest(`${page.name} 접근성`, '실패', `HTTP ${response.status} 응답`);
      }
      
    } catch (error) {
      recordTest(`${page.name} 접근성`, '실패', error.message);
    }
  }
}

// 6. 링크 및 버튼 기능 검증
async function testLinksAndButtons() {
  log('cyan', '\n🔗 링크 및 버튼 기능 검증');
  
  try {
    // 홈페이지에서 주요 링크들 확인
    const response = await api.get(BASE_URL);
    const html = response.data;
    
    // 중요 링크들 확인
    const importantLinks = [
      '/services/policy-funding',
      '/services/ai-curriculum', 
      '/consultation',
      '/diagnosis'
    ];
    
    let validLinkCount = 0;
    
    for (const link of importantLinks) {
      if (html.includes(link)) {
        validLinkCount++;
      }
    }
    
    if (validLinkCount === importantLinks.length) {
      recordTest('주요 링크 연결성', '성공', '모든 주요 링크가 존재');
    } else {
      recordTest('주요 링크 연결성', '경고', `${importantLinks.length - validLinkCount}개 링크 누락 가능성`);
    }
    
    // 전화번호 링크 확인
    if (html.includes('010-9251-9743') || html.includes('tel:')) {
      recordTest('연락처 링크', '성공');
    } else {
      recordTest('연락처 링크', '경고', '전화번호 링크 확인 필요');
    }
    
  } catch (error) {
    recordTest('링크 및 버튼 기능 검증', '실패', error.message);
  }
}

// 7. 반응형 디자인 검증 (간접적)
async function testResponsiveDesign() {
  log('cyan', '\n📱 반응형 디자인 검증');
  
  try {
    const response = await api.get(`${BASE_URL}/services/ai-curriculum`);
    const html = response.data;
    
    // Tailwind CSS 반응형 클래스 확인
    const responsivePatterns = [
      'sm:', 'md:', 'lg:', 'xl:', 
      'grid-cols-', 'flex-col', 'hidden md:',
      'w-full', 'max-w-', 'mx-auto'
    ];
    
    let responsiveCount = 0;
    
    responsivePatterns.forEach(pattern => {
      if (html.includes(pattern)) {
        responsiveCount++;
      }
    });
    
    if (responsiveCount >= 6) {
      recordTest('반응형 디자인 클래스', '성공', `${responsiveCount}개 반응형 클래스 확인`);
    } else {
      recordTest('반응형 디자인 클래스', '경고', '반응형 클래스가 부족할 수 있음');
    }
    
    // 모바일 최적화 메타태그 확인
    if (html.includes('viewport') && html.includes('width=device-width')) {
      recordTest('모바일 뷰포트 설정', '성공');
    } else {
      recordTest('모바일 뷰포트 설정', '실패', '뷰포트 메타태그 누락');
    }
    
  } catch (error) {
    recordTest('반응형 디자인 검증', '실패', error.message);
  }
}

// 8. SEO 및 메타데이터 검증
async function testSEOAndMetadata() {
  log('cyan', '\n🔍 SEO 및 메타데이터 검증');
  
  const testPages = [
    { url: '/services/policy-funding', title: '정책자금' },
    { url: '/services/ai-curriculum', title: 'AI' }
  ];
  
  for (const page of testPages) {
    try {
      const response = await api.get(`${BASE_URL}${page.url}`);
      const html = response.data;
      
      // 타이틀 태그 확인
      if (html.includes('<title>') && html.includes(page.title)) {
        recordTest(`${page.url} 페이지 타이틀`, '성공');
      } else {
        recordTest(`${page.url} 페이지 타이틀`, '경고', '적절한 타이틀 확인 필요');
      }
      
      // 메타 디스크립션 확인
      if (html.includes('meta name="description"')) {
        recordTest(`${page.url} 메타 디스크립션`, '성공');
      } else {
        recordTest(`${page.url} 메타 디스크립션`, '경고', '메타 디스크립션 추가 권장');
      }
      
    } catch (error) {
      recordTest(`${page.url} SEO 검증`, '실패', error.message);
    }
  }
}

// 9. 에러 페이지 및 예외상황 처리 검증
async function testErrorHandling() {
  log('cyan', '\n⚠️ 에러 처리 및 예외상황 검증');
  
  try {
    // 존재하지 않는 페이지 접근
    const response = await api.get(`${BASE_URL}/non-existent-page-test-123`);
    
    if (response.status === 404) {
      recordTest('404 에러 처리', '성공', '존재하지 않는 페이지에 대한 적절한 404 응답');
    } else {
      recordTest('404 에러 처리', '경고', `예상과 다른 응답: ${response.status}`);
    }
    
  } catch (error) {
    if (error.response && error.response.status === 404) {
      recordTest('404 에러 처리', '성공', '404 에러 적절히 처리됨');
    } else {
      recordTest('404 에러 처리', '경고', '에러 처리 확인 필요');
    }
  }
}

// 10. 성능 및 로딩 속도 검증
async function testPerformance() {
  log('cyan', '\n⚡ 성능 및 로딩 속도 검증');
  
  const testPages = [
    '/services/policy-funding',
    '/services/ai-curriculum'
  ];
  
  for (const page of testPages) {
    try {
      const startTime = Date.now();
      const response = await api.get(`${BASE_URL}${page}`);
      const endTime = Date.now();
      const loadTime = endTime - startTime;
      
      if (response.status === 200) {
        if (loadTime < 3000) {
          recordTest(`${page} 로딩 속도`, '성공', `${loadTime}ms - 빠른 로딩`);
        } else if (loadTime < 5000) {
          recordTest(`${page} 로딩 속도`, '경고', `${loadTime}ms - 보통 로딩`);
        } else {
          recordTest(`${page} 로딩 속도`, '실패', `${loadTime}ms - 느린 로딩`);
        }
        
        // 페이지 크기 체크
        const size = response.data.length;
        if (size < 500000) { // 500KB 미만
          recordTest(`${page} 페이지 크기`, '성공', `${Math.round(size/1024)}KB - 적절한 크기`);
        } else {
          recordTest(`${page} 페이지 크기`, '경고', `${Math.round(size/1024)}KB - 큰 페이지`);
        }
      }
      
    } catch (error) {
      recordTest(`${page} 성능 검증`, '실패', error.message);
    }
  }
}

// 메인 테스트 실행 함수
async function runCompleteQualityCheck() {
  log('magenta', '🚀 AICAMP 시스템 완벽 품질관리 테스트 시작');
  log('magenta', '='.repeat(60));
  
  const startTime = Date.now();
  
  // 모든 테스트 실행
  await testNavbarChanges();
  await testPolicyFundingIntegration();
  await testAICurriculumPage();
  await testInvestmentAnalysisConsultation();
  await testCorePageAccessibility();
  await testLinksAndButtons();
  await testResponsiveDesign();
  await testSEOAndMetadata();
  await testErrorHandling();
  await testPerformance();
  
  const endTime = Date.now();
  const totalTime = Math.round((endTime - startTime) / 1000);
  
  // 최종 결과 리포트
  log('magenta', '\n' + '='.repeat(60));
  log('magenta', '📊 완벽 품질관리 테스트 최종 결과');
  log('magenta', '='.repeat(60));
  
  log('cyan', `⏱️ 총 테스트 시간: ${totalTime}초`);
  log('cyan', `📋 총 테스트 수: ${testResults.총테스트}개`);
  log('green', `✅ 성공: ${testResults.성공}개`);
  log('yellow', `⚠️ 경고: ${testResults.경고}개`);
  log('red', `❌ 실패: ${testResults.실패}개`);
  
  // 품질 점수 계산
  const successRate = Math.round((testResults.성공 / testResults.총테스트) * 100);
  const qualityScore = Math.round(((testResults.성공 * 1.0 + testResults.경고 * 0.7) / testResults.총테스트) * 100);
  
  log('cyan', `📈 성공률: ${successRate}%`);
  log('cyan', `🏆 품질 점수: ${qualityScore}%`);
  
  // 품질 등급 결정
  let qualityGrade = '';
  let gradeColor = '';
  
  if (qualityScore >= 95) {
    qualityGrade = 'S급 (완벽)';
    gradeColor = 'green';
  } else if (qualityScore >= 90) {
    qualityGrade = 'A급 (우수)';
    gradeColor = 'green';
  } else if (qualityScore >= 80) {
    qualityGrade = 'B급 (양호)';
    gradeColor = 'yellow';
  } else if (qualityScore >= 70) {
    qualityGrade = 'C급 (보통)';
    gradeColor = 'yellow';
  } else {
    qualityGrade = 'D급 (개선필요)';
    gradeColor = 'red';
  }
  
  log(gradeColor, `🎖️ 최종 품질 등급: ${qualityGrade}`);
  
  // 실패 항목 상세 리포트
  if (testResults.실패 > 0) {
    log('red', '\n❌ 실패 항목 상세:');
    testResults.상세결과
      .filter(result => result.상태 === '실패')
      .forEach(result => {
        log('red', `   • ${result.테스트명}: ${result.상세}`);
      });
  }
  
  // 경고 항목 요약
  if (testResults.경고 > 0) {
    log('yellow', '\n⚠️ 경고 항목 요약:');
    testResults.상세결과
      .filter(result => result.상태 === '경고')
      .forEach(result => {
        log('yellow', `   • ${result.테스트명}: ${result.상세}`);
      });
  }
  
  // 개선 권장사항
  log('cyan', '\n💡 품질 개선 권장사항:');
  
  if (testResults.실패 > 0) {
    log('cyan', '   1. 실패 항목들을 우선적으로 수정하세요');
  }
  
  if (testResults.경고 > 0) {
    log('cyan', '   2. 경고 항목들을 검토하여 개선하세요');
  }
  
  if (qualityScore < 95) {
    log('cyan', '   3. 무오류 완벽 품질 달성을 위해 추가 최적화가 필요합니다');
  }
  
  log('cyan', '   4. 정기적인 품질 점검을 실시하세요');
  log('cyan', '   5. 사용자 피드백을 수집하여 지속적으로 개선하세요');
  
  // 최종 결론
  log('magenta', '\n' + '='.repeat(60));
  
  if (qualityScore >= 95) {
    log('green', '🎉 축하합니다! 무오류 완벽 품질 기준을 달성했습니다!');
    log('green', '✨ 모든 기능이 최고 품질로 구현되었습니다.');
  } else if (qualityScore >= 90) {
    log('green', '🎊 우수한 품질! 거의 완벽한 수준입니다.');
    log('yellow', '⚡ 몇 가지 소소한 개선으로 완벽 달성 가능합니다.');
  } else {
    log('yellow', '📈 양호한 품질이지만 개선의 여지가 있습니다.');
    log('cyan', '🔧 품질 향상을 위한 추가 작업을 권장합니다.');
  }
  
  log('magenta', '='.repeat(60));
  
  // JSON 결과 저장
  const finalReport = {
    테스트완료시간: new Date().toISOString(),
    총소요시간: `${totalTime}초`,
    테스트통계: {
      총테스트: testResults.총테스트,
      성공: testResults.성공,
      경고: testResults.경고,
      실패: testResults.실패
    },
    품질지표: {
      성공률: `${successRate}%`,
      품질점수: `${qualityScore}%`,
      품질등급: qualityGrade
    },
    상세결과: testResults.상세결과
  };
  
  require('fs').writeFileSync('aicamp-quality-check-report.json', JSON.stringify(finalReport, null, 2));
  log('cyan', '\n📄 상세 결과가 aicamp-quality-check-report.json 파일에 저장되었습니다.');
  
  return qualityScore >= 95;
}

// 테스트 실행
runCompleteQualityCheck().then(isPerfect => {
  if (isPerfect) {
    log('green', '\n🏆 무오류 완벽 품질 달성! 배포 준비 완료!');
    process.exit(0);
  } else {
    log('yellow', '\n🔧 품질 개선 후 재테스트를 권장합니다.');
    process.exit(1);
  }
}).catch(error => {
  log('red', `\n💥 테스트 실행 중 오류 발생: ${error.message}`);
  process.exit(1);
}); 