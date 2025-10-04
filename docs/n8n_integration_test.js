/**
 * ================================================================================
 * 🎯 N8N 통합 시스템 테스트 파일
 * ================================================================================
 * 
 * 이 파일은 n8n 커리큘럼 답변시스템의 통합 테스트를 수행합니다.
 * 
 * 🔧 테스트 항목:
 * 1. 엔티티 추출 테스트
 * 2. 커리큘럼 매칭 테스트
 * 3. 풀백 시스템 테스트
 * 4. 이교장 스타일 응답 테스트
 * 5. 전체 시스템 통합 테스트
 * 
 * ================================================================================
 */

/**
 * 엔티티 추출 테스트
 */
function testEntityExtraction() {
  console.log('🧪 엔티티 추출 테스트 시작');
  
  const testCases = [
    {
      question: '마케팅 자동화를 n8n으로 어떻게 할 수 있나요?',
      expected: 'marketing'
    },
    {
      question: '기획 업무에서 n8n 활용법을 알려주세요',
      expected: 'planning'
    },
    {
      question: '생산관리 자동화에 n8n을 어떻게 사용하나요?',
      expected: 'production'
    },
    {
      question: '품질관리에서 n8n 활용 사례를 알려주세요',
      expected: 'quality'
    },
    {
      question: '개발자가 n8n을 어떻게 활용할 수 있나요?',
      expected: 'development'
    },
    {
      question: '디자인 프로세스 자동화에 n8n을 어떻게 사용하나요?',
      expected: 'design'
    },
    {
      question: '운영 업무에서 n8n 활용법을 알려주세요',
      expected: 'operations'
    },
    {
      question: 'n8n 기본 개념을 알려주세요',
      expected: 'general'
    }
  ];
  
  const results = [];
  
  testCases.forEach((testCase, index) => {
    console.log(`\n📝 테스트 ${index + 1}: ${testCase.question}`);
    
    try {
      const entities = extractEntities(testCase.question);
      const success = entities.primary_job === testCase.expected;
      
      results.push({
        test_case: index + 1,
        question: testCase.question,
        expected: testCase.expected,
        actual: entities.primary_job,
        confidence: entities.confidence,
        success: success
      });
      
      console.log(`✅ 결과: ${entities.primary_job} (신뢰도: ${entities.confidence.toFixed(2)})`);
      console.log(`📊 성공: ${success ? '✅' : '❌'}`);
      
    } catch (error) {
      console.error(`❌ 테스트 ${index + 1} 실패:`, error);
      results.push({
        test_case: index + 1,
        question: testCase.question,
        expected: testCase.expected,
        actual: 'error',
        confidence: 0,
        success: false,
        error: error.message
      });
    }
  });
  
  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;
  
  console.log(`\n📊 엔티티 추출 테스트 결과:`);
  console.log(`- 총 테스트: ${totalCount}개`);
  console.log(`- 성공: ${successCount}개`);
  console.log(`- 실패: ${totalCount - successCount}개`);
  console.log(`- 성공률: ${((successCount / totalCount) * 100).toFixed(1)}%`);
  
  return {
    success: successCount === totalCount,
    results: results,
    summary: {
      total: totalCount,
      successful: successCount,
      failed: totalCount - successCount,
      success_rate: (successCount / totalCount) * 100
    }
  };
}

/**
 * 커리큘럼 매칭 테스트
 */
function testCurriculumMatching() {
  console.log('🧪 커리큘럼 매칭 테스트 시작');
  
  const testCases = [
    {
      question: '마케팅 자동화를 n8n으로 어떻게 할 수 있나요?',
      entities: { primary_job: 'marketing', confidence: 0.8 },
      expected_keywords: ['마케팅', '자동화', '고객']
    },
    {
      question: '기획 업무에서 n8n 활용법을 알려주세요',
      entities: { primary_job: 'planning', confidence: 0.7 },
      expected_keywords: ['데이터', '분석', '비즈니스']
    },
    {
      question: '생산관리 자동화에 n8n을 어떻게 사용하나요?',
      entities: { primary_job: 'production', confidence: 0.9 },
      expected_keywords: ['생산', '품질', '모니터링']
    }
  ];
  
  const results = [];
  
  testCases.forEach((testCase, index) => {
    console.log(`\n📝 테스트 ${index + 1}: ${testCase.question}`);
    
    try {
      const curriculum = matchN8NCurriculum(testCase.question, testCase.entities);
      
      const hasExpectedContent = testCase.expected_keywords.some(keyword =>
        curriculum.matched_curriculum.some(topic => 
          topic.toLowerCase().includes(keyword.toLowerCase())
        )
      );
      
      results.push({
        test_case: index + 1,
        question: testCase.question,
        job_category: testCase.entities.primary_job,
        curriculum_count: curriculum.matched_curriculum.length,
        relevance_score: curriculum.relevance_score,
        has_expected_content: hasExpectedContent,
        success: hasExpectedContent && curriculum.matched_curriculum.length > 0
      });
      
      console.log(`✅ 커리큘럼 수: ${curriculum.matched_curriculum.length}개`);
      console.log(`📊 관련성 점수: ${curriculum.relevance_score.toFixed(2)}`);
      console.log(`🎯 예상 내용 포함: ${hasExpectedContent ? '✅' : '❌'}`);
      
    } catch (error) {
      console.error(`❌ 테스트 ${index + 1} 실패:`, error);
      results.push({
        test_case: index + 1,
        question: testCase.question,
        job_category: testCase.entities.primary_job,
        curriculum_count: 0,
        relevance_score: 0,
        has_expected_content: false,
        success: false,
        error: error.message
      });
    }
  });
  
  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;
  
  console.log(`\n📊 커리큘럼 매칭 테스트 결과:`);
  console.log(`- 총 테스트: ${totalCount}개`);
  console.log(`- 성공: ${successCount}개`);
  console.log(`- 실패: ${totalCount - successCount}개`);
  console.log(`- 성공률: ${((successCount / totalCount) * 100).toFixed(1)}%`);
  
  return {
    success: successCount === totalCount,
    results: results,
    summary: {
      total: totalCount,
      successful: successCount,
      failed: totalCount - successCount,
      success_rate: (successCount / totalCount) * 100
    }
  };
}

/**
 * 풀백 시스템 테스트
 */
function testFallbackSystem() {
  console.log('🧪 풀백 시스템 테스트 시작');
  
  const testCases = [
    {
      question: '마케팅 자동화를 n8n으로 어떻게 할 수 있나요?',
      entities: { primary_job: 'marketing', confidence: 0.8 },
      expected_level: 1
    },
    {
      question: '기획 업무에서 n8n 활용법을 알려주세요',
      entities: { primary_job: 'planning', confidence: 0.7 },
      expected_level: 1
    },
    {
      question: 'n8n 기본 개념을 알려주세요',
      entities: { primary_job: 'general', confidence: 0.3 },
      expected_level: 2
    },
    {
      question: '완전히 다른 주제에 대한 질문입니다',
      entities: { primary_job: 'general', confidence: 0.1 },
      expected_level: 3
    }
  ];
  
  const results = [];
  
  testCases.forEach((testCase, index) => {
    console.log(`\n📝 테스트 ${index + 1}: ${testCase.question}`);
    
    try {
      const curriculum = matchN8NCurriculum(testCase.question, testCase.entities);
      const fallback = generateFallbackResponse(testCase.question, testCase.entities, curriculum);
      
      const success = fallback.fallback_level === testCase.expected_level && 
                     fallback.response.length > 50;
      
      results.push({
        test_case: index + 1,
        question: testCase.question,
        expected_level: testCase.expected_level,
        actual_level: fallback.fallback_level,
        response_length: fallback.response.length,
        confidence: fallback.confidence,
        success: success
      });
      
      console.log(`✅ 풀백 레벨: ${fallback.fallback_level}`);
      console.log(`📊 응답 길이: ${fallback.response.length}자`);
      console.log(`🎯 신뢰도: ${fallback.confidence.toFixed(2)}`);
      console.log(`📊 성공: ${success ? '✅' : '❌'}`);
      
    } catch (error) {
      console.error(`❌ 테스트 ${index + 1} 실패:`, error);
      results.push({
        test_case: index + 1,
        question: testCase.question,
        expected_level: testCase.expected_level,
        actual_level: 0,
        response_length: 0,
        confidence: 0,
        success: false,
        error: error.message
      });
    }
  });
  
  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;
  
  console.log(`\n📊 풀백 시스템 테스트 결과:`);
  console.log(`- 총 테스트: ${totalCount}개`);
  console.log(`- 성공: ${successCount}개`);
  console.log(`- 실패: ${totalCount - successCount}개`);
  console.log(`- 성공률: ${((successCount / totalCount) * 100).toFixed(1)}%`);
  
  return {
    success: successCount === totalCount,
    results: results,
    summary: {
      total: totalCount,
      successful: successCount,
      failed: totalCount - successCount,
      success_rate: (successCount / totalCount) * 100
    }
  };
}

/**
 * 이교장 스타일 응답 테스트
 */
function testLeeGyojangResponse() {
  console.log('🧪 이교장 스타일 응답 테스트 시작');
  
  const testCases = [
    {
      question: '마케팅 자동화를 n8n으로 어떻게 할 수 있나요?',
      entities: { primary_job: 'marketing', confidence: 0.8 }
    },
    {
      question: '기획 업무에서 n8n 활용법을 알려주세요',
      entities: { primary_job: 'planning', confidence: 0.7 }
    },
    {
      question: 'n8n 기본 개념을 알려주세요',
      entities: { primary_job: 'general', confidence: 0.3 }
    }
  ];
  
  const results = [];
  
  testCases.forEach((testCase, index) => {
    console.log(`\n📝 테스트 ${index + 1}: ${testCase.question}`);
    
    try {
      const curriculum = matchN8NCurriculum(testCase.question, testCase.entities);
      const fallback = generateFallbackResponse(testCase.question, testCase.entities, curriculum);
      const response = generateLeeGyojangResponse(testCase.question, testCase.entities, curriculum, fallback);
      
      const hasGreeting = response.response.includes('안녕하세요! 이교장입니다');
      const hasEncouragement = response.response.includes('궁금한 점이 있으시면');
      const hasClosing = response.response.includes('n8n으로 더 효율적인');
      const reasonableLength = response.response.length > 100 && response.response.length < 2000;
      
      const success = hasGreeting && hasEncouragement && hasClosing && reasonableLength;
      
      results.push({
        test_case: index + 1,
        question: testCase.question,
        response_length: response.response.length,
        has_greeting: hasGreeting,
        has_encouragement: hasEncouragement,
        has_closing: hasClosing,
        reasonable_length: reasonableLength,
        success: success
      });
      
      console.log(`✅ 응답 길이: ${response.response.length}자`);
      console.log(`📊 인사말 포함: ${hasGreeting ? '✅' : '❌'}`);
      console.log(`📊 격려 메시지 포함: ${hasEncouragement ? '✅' : '❌'}`);
      console.log(`📊 마무리 메시지 포함: ${hasClosing ? '✅' : '❌'}`);
      console.log(`📊 적절한 길이: ${reasonableLength ? '✅' : '❌'}`);
      console.log(`🎯 성공: ${success ? '✅' : '❌'}`);
      
    } catch (error) {
      console.error(`❌ 테스트 ${index + 1} 실패:`, error);
      results.push({
        test_case: index + 1,
        question: testCase.question,
        response_length: 0,
        has_greeting: false,
        has_encouragement: false,
        has_closing: false,
        reasonable_length: false,
        success: false,
        error: error.message
      });
    }
  });
  
  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;
  
  console.log(`\n📊 이교장 스타일 응답 테스트 결과:`);
  console.log(`- 총 테스트: ${totalCount}개`);
  console.log(`- 성공: ${successCount}개`);
  console.log(`- 실패: ${totalCount - successCount}개`);
  console.log(`- 성공률: ${((successCount / totalCount) * 100).toFixed(1)}%`);
  
  return {
    success: successCount === totalCount,
    results: results,
    summary: {
      total: totalCount,
      successful: successCount,
      failed: totalCount - successCount,
      success_rate: (successCount / totalCount) * 100
    }
  };
}

/**
 * 전체 시스템 통합 테스트
 */
function runFullSystemTest() {
  console.log('🚀 N8N 커리큘럼 답변시스템 전체 테스트 시작');
  console.log('=' * 60);
  
  const startTime = new Date();
  
  // 1. 엔티티 추출 테스트
  console.log('\n📋 1단계: 엔티티 추출 테스트');
  const entityTest = testEntityExtraction();
  
  // 2. 커리큘럼 매칭 테스트
  console.log('\n📋 2단계: 커리큘럼 매칭 테스트');
  const curriculumTest = testCurriculumMatching();
  
  // 3. 풀백 시스템 테스트
  console.log('\n📋 3단계: 풀백 시스템 테스트');
  const fallbackTest = testFallbackSystem();
  
  // 4. 이교장 스타일 응답 테스트
  console.log('\n📋 4단계: 이교장 스타일 응답 테스트');
  const responseTest = testLeeGyojangResponse();
  
  // 5. 전체 시스템 테스트
  console.log('\n📋 5단계: 전체 시스템 통합 테스트');
  const integrationTest = testN8NSystem();
  
  const endTime = new Date();
  const totalTime = endTime - startTime;
  
  // 결과 요약
  console.log('\n' + '=' * 60);
  console.log('📊 전체 시스템 테스트 결과 요약');
  console.log('=' * 60);
  
  const allTests = [
    { name: '엔티티 추출', result: entityTest },
    { name: '커리큘럼 매칭', result: curriculumTest },
    { name: '풀백 시스템', result: fallbackTest },
    { name: '이교장 스타일 응답', result: responseTest },
    { name: '전체 시스템 통합', result: integrationTest }
  ];
  
  allTests.forEach(test => {
    const successRate = test.result.summary ? test.result.summary.success_rate : 0;
    console.log(`${test.name}: ${test.result.success ? '✅' : '❌'} (${successRate.toFixed(1)}%)`);
  });
  
  const overallSuccess = allTests.every(test => test.result.success);
  const averageSuccessRate = allTests.reduce((sum, test) => 
    sum + (test.result.summary ? test.result.summary.success_rate : 0), 0) / allTests.length;
  
  console.log(`\n🎯 전체 성공률: ${averageSuccessRate.toFixed(1)}%`);
  console.log(`⏱️ 총 소요 시간: ${totalTime}ms`);
  console.log(`📊 전체 결과: ${overallSuccess ? '✅ 성공' : '❌ 실패'}`);
  
  return {
    success: overallSuccess,
    tests: allTests,
    summary: {
      total_tests: allTests.length,
      successful_tests: allTests.filter(t => t.result.success).length,
      average_success_rate: averageSuccessRate,
      total_time: totalTime
    },
    timestamp: new Date().toISOString()
  };
}

/**
 * 실시간 응답 테스트
 */
function testRealTimeResponse() {
  console.log('🧪 실시간 응답 테스트 시작');
  
  const testQuestions = [
    '마케팅 자동화를 n8n으로 어떻게 할 수 있나요?',
    '기획 업무에서 n8n 활용법을 알려주세요',
    '생산관리 자동화에 n8n을 어떻게 사용하나요?',
    '품질관리에서 n8n 활용 사례를 알려주세요',
    '개발자가 n8n을 어떻게 활용할 수 있나요?',
    '디자인 프로세스 자동화에 n8n을 어떻게 사용하나요?',
    '운영 업무에서 n8n 활용법을 알려주세요',
    'n8n 기본 개념을 알려주세요'
  ];
  
  const results = [];
  
  testQuestions.forEach((question, index) => {
    console.log(`\n📝 실시간 테스트 ${index + 1}: ${question}`);
    
    const startTime = new Date();
    const result = processN8NQuestion(question);
    const endTime = new Date();
    const responseTime = endTime - startTime;
    
    results.push({
      question: question,
      response: result.response,
      processing_time: responseTime,
      success: result.success,
      metadata: result.metadata
    });
    
    console.log(`✅ 응답 시간: ${responseTime}ms`);
    console.log(`📊 성공: ${result.success ? '✅' : '❌'}`);
    console.log(`📄 응답 미리보기: ${result.response.substring(0, 100)}...`);
  });
  
  const successCount = results.filter(r => r.success).length;
  const avgResponseTime = results.reduce((sum, r) => sum + r.processing_time, 0) / results.length;
  
  console.log(`\n📊 실시간 응답 테스트 결과:`);
  console.log(`- 총 테스트: ${results.length}개`);
  console.log(`- 성공: ${successCount}개`);
  console.log(`- 실패: ${results.length - successCount}개`);
  console.log(`- 평균 응답 시간: ${avgResponseTime.toFixed(0)}ms`);
  console.log(`- 성공률: ${((successCount / results.length) * 100).toFixed(1)}%`);
  
  return {
    success: successCount === results.length,
    results: results,
    summary: {
      total: results.length,
      successful: successCount,
      failed: results.length - successCount,
      average_response_time: avgResponseTime,
      success_rate: (successCount / results.length) * 100
    }
  };
}

/**
 * ================================================================================
 * 🎯 N8N 통합 시스템 테스트 완성
 * ================================================================================
 * 
 * ✅ 완성된 테스트 기능:
 * 1. 엔티티 추출 테스트
 * 2. 커리큘럼 매칭 테스트
 * 3. 풀백 시스템 테스트
 * 4. 이교장 스타일 응답 테스트
 * 5. 전체 시스템 통합 테스트
 * 6. 실시간 응답 테스트
 * 
 * 🔧 사용 방법:
 * 1. testEntityExtraction() - 엔티티 추출 테스트
 * 2. testCurriculumMatching() - 커리큘럼 매칭 테스트
 * 3. testFallbackSystem() - 풀백 시스템 테스트
 * 4. testLeeGyojangResponse() - 이교장 스타일 응답 테스트
 * 5. runFullSystemTest() - 전체 시스템 테스트
 * 6. testRealTimeResponse() - 실시간 응답 테스트
 * 
 * 📊 테스트 결과:
 * - 성공률 측정
 * - 응답 시간 측정
 * - 오류 분석
 * - 성능 모니터링
 * 
 * ================================================================================
 */
