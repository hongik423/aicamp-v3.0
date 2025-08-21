/**
 * AICAMP 전체 서비스 엔티티 정의
 */

const AICAMP_ENTITIES = {
  // AI 역량진단
  ai_diagnosis: {
    name: 'AI 역량진단',
    keywords: ['AI 역량진단', '역량진단', 'AI 진단', '역량 평가', 'BARS 평가', '45문항'],
    services: ['AI 역량진단 시스템', '진단 결과 상담'],
    fallback: 'AICAMP의 AI 역량진단은 45개 BARS 행동지표를 기반으로 개인의 AI 역량을 종합적으로 평가해요.'
  },

  // AI 캠프 커리큘럼
  ai_camp: {
    name: 'AI 캠프 커리큘럼',
    keywords: ['AI 캠프', 'AI 교육', 'AI 커리큘럼', 'AI 학습', 'AI 강의', 'AI 과정'],
    services: ['AI 기초 캠프', 'AI 심화 캠프', 'AI 전문가 과정'],
    fallback: 'AICAMP의 AI 캠프는 기초부터 전문가 과정까지 체계적으로 구성되어 있어요.'
  },

  // AI 상담 서비스
  ai_consultation: {
    name: 'AI 상담 서비스',
    keywords: ['AI 상담', 'AI 컨설팅', 'AI 전문가 상담', 'AI 진로 상담', 'AI 학습 상담'],
    services: ['AI 진로 상담', 'AI 비즈니스 상담', 'AI 학습 상담'],
    fallback: 'AICAMP의 AI 상담 서비스는 AI 전문가와 1:1로 진행되는 맞춤형 상담이에요.'
  },

  // AI 도구 및 플랫폼
  ai_tools: {
    name: 'AI 도구 및 플랫폼',
    keywords: ['AI 도구', 'AI 플랫폼', 'n8n', 'ChatGPT', 'Claude', 'AI 자동화'],
    services: ['n8n 자동화 플랫폼', 'AI 생성 도구 모음', 'AI 분석 도구'],
    fallback: 'AICAMP에서는 n8n, ChatGPT, Claude 등 다양한 AI 도구와 플랫폼을 소개해요.'
  },

  // AI 교육 및 학습
  ai_education: {
    name: 'AI 교육 및 학습',
    keywords: ['AI 교육', 'AI 학습', 'AI 강의', 'AI 온라인 강의', 'AI 워크샵'],
    services: ['AI 온라인 강의', 'AI 워크샵', 'AI 학습 자료'],
    fallback: 'AICAMP의 AI 교육은 온라인 강의부터 워크샵까지 다양한 형태로 제공해요.'
  },

  // AI 비즈니스 솔루션
  ai_business: {
    name: 'AI 비즈니스 솔루션',
    keywords: ['AI 비즈니스', 'AI 솔루션', 'AI 도입', 'AI 활용', 'AI 비즈니스 모델'],
    services: ['AI 도입 컨설팅', 'AI 비즈니스 모델 개발', 'AI 성공 사례 연구'],
    fallback: 'AICAMP의 AI 비즈니스 솔루션은 기업의 AI 도입부터 활용까지 전 과정을 지원해요.'
  },

  // AI 기술 및 트렌드
  ai_technology: {
    name: 'AI 기술 및 트렌드',
    keywords: ['AI 기술', 'AI 트렌드', 'AI 최신 기술', 'AI 발전 동향', 'AI 연구'],
    services: ['AI 기술 동향 리포트', 'AI 기술 세미나', 'AI 연구 커뮤니티'],
    fallback: 'AICAMP에서는 최신 AI 기술 동향과 트렌드를 지속적으로 모니터링하고 분석해요.'
  },

  // AICAMP 플랫폼 서비스
  aicamp_platform: {
    name: 'AICAMP 플랫폼 서비스',
    keywords: ['AICAMP', 'AICAMP 플랫폼', 'AICAMP 서비스', 'AICAMP 회원가입'],
    services: ['AICAMP 회원 서비스', 'AICAMP 커뮤니티', 'AICAMP 고객지원'],
    fallback: 'AICAMP 플랫폼은 AI 학습을 위한 종합적인 서비스를 제공해요.'
  }
};

/**
 * AICAMP 엔티티 추출 함수
 */
function extractAICAMPEntities(question) {
  const lowerQuestion = question.toLowerCase();
  const entityScores = {};
  const detectedEntities = [];
  
  Object.entries(AICAMP_ENTITIES).forEach(([key, data]) => {
    let score = 0;
    data.keywords.forEach(keyword => {
      if (lowerQuestion.includes(keyword.toLowerCase())) {
        score += 1;
      }
    });
    
    const normalizedScore = score / data.keywords.length;
    entityScores[key] = normalizedScore;
    
    if (normalizedScore > 0) {
      detectedEntities.push({
        service: key,
        name: data.name,
        score: normalizedScore
      });
    }
  });
  
  detectedEntities.sort((a, b) => b.score - a.score);
  const primaryService = Object.keys(entityScores).reduce((a, b) => 
    entityScores[a] > entityScores[b] ? a : b
  );
  
  return {
    primary_service: entityScores[primaryService] > 0.3 ? primaryService : 'general',
    confidence: entityScores[primaryService],
    entities: detectedEntities.slice(0, 3)
  };
}

/**
 * AICAMP 서비스 매칭 함수
 */
function matchAICAMPServices(question, entities) {
  if (entities.primary_service === 'general') {
    return {
      matched_services: Object.values(AICAMP_ENTITIES).map(e => e.name),
      relevance_score: 0.5,
      recommendation_type: 'overview'
    };
  }
  
  const serviceData = AICAMP_ENTITIES[entities.primary_service];
  return {
    matched_services: serviceData.services,
    relevance_score: entities.confidence,
    recommendation_type: 'specific',
    service_data: serviceData
  };
}

/**
 * AICAMP 풀백 답변 생성 함수
 */
function generateAICAMPFallbackResponse(question, entities, services) {
  if (entities.primary_service !== 'general' && entities.confidence > 0.5) {
    const serviceData = AICAMP_ENTITIES[entities.primary_service];
    return {
      response: serviceData.fallback,
      fallback_level: 1,
      confidence: entities.confidence,
      service_details: serviceData.services,
      suggested_actions: ['서비스 상세 정보 확인', '신청/문의하기', '관련 서비스 탐색']
    };
  }
  
  return {
    response: 'AICAMP는 AI 역량진단부터 교육, 상담, 도구까지 AI와 관련된 모든 서비스를 제공하는 종합 플랫폼이에요.',
    fallback_level: 2,
    confidence: 0.4,
    suggested_actions: ['전체 서비스 둘러보기', 'AI 역량진단 받기', '상담 신청하기']
  };
}

/**
 * 이교장 스타일 AICAMP 응답 생성 함수
 */
function generateLeeGyojangAICAMPResponse(question, entities, services, fallback) {
  let response = '안녕하세요! 이교장입니다. ';
  response += fallback.response + ' ';
  
  if (fallback.service_details) {
    response += '\n\n관련 서비스:\n';
    fallback.service_details.forEach(service => {
      response += `• ${service}\n`;
    });
  }
  
  if (fallback.suggested_actions) {
    response += '\n다음 중 어떤 것을 도와드릴까요?\n';
    fallback.suggested_actions.forEach((action, index) => {
      response += `${index + 1}. ${action}\n`;
    });
  }
  
  response += '\nAICAMP에서 AI 역량을 키우고 함께 성장해보세요! 궁금한 점이 있으시면 언제든 물어보세요!';
  
  return {
    response: response,
    metadata: {
      primary_service: entities.primary_service,
      confidence: entities.confidence,
      fallback_level: fallback.fallback_level,
      entities_detected: entities.entities.length,
      services_matched: services.matched_services.length
    }
  };
}

/**
 * AICAMP 전체 서비스 답변 시스템 메인 함수
 */
function processAICAMPComprehensiveQuestion(question) {
  try {
    console.log('🎯 AICAMP 종합 질문 처리 시작:', question.substring(0, 50) + '...');
    
    const entities = extractAICAMPEntities(question);
    const services = matchAICAMPServices(question, entities);
    const fallback = generateAICAMPFallbackResponse(question, entities, services);
    const finalResponse = generateLeeGyojangAICAMPResponse(question, entities, services, fallback);
    
    console.log('✅ AICAMP 종합 질문 처리 완료');
    
    return {
      success: true,
      response: finalResponse.response,
      metadata: finalResponse.metadata,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ AICAMP 종합 질문 처리 실패:', error);
    return {
      success: false,
      response: '안녕하세요! 이교장입니다. AICAMP에 대해 궁금한 점이 있으시면 언제든 물어보세요!',
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}
