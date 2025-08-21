/**
 * ================================================================================
 * 🎯 AICAMP 전체 서비스 엔티티 정의
 * ================================================================================
 * 
 * AICAMP의 모든 서비스에 대한 포괄적인 엔티티 정의
 * 
 * ================================================================================
 */

/**
 * AICAMP 전체 서비스 엔티티 정의
 */
const AICAMP_COMPREHENSIVE_ENTITIES = {
  // 1. AI 역량진단 서비스
  ai_diagnosis: {
    name: 'AI 역량진단',
    category: 'diagnosis',
    keywords: [
      'AI 역량진단', '역량진단', 'AI 진단', '역량 평가', 'AI 역량', '진단 테스트',
      'AI 역량진단 시스템', 'BARS 평가', '행동지표', '45문항', '역량 분석',
      'AI 역량진단 신청', '진단 결과', '역량 리포트', '개인별 분석'
    ],
    services: [
      {
        name: 'AI 역량진단 시스템',
        description: '45개 BARS 행동지표 기반 AI 역량 종합 진단',
        features: ['개인별 맞춤 분석', '6개 카테고리 평가', '상세 진단 리포트', '개선 방향 제시'],
        price: '무료',
        duration: '약 30분',
        url: 'https://aicamp.club/diagnosis'
      },
      {
        name: '진단 결과 상담',
        description: '전문가와 함께하는 진단 결과 분석 및 개선 계획 수립',
        features: ['1:1 맞춤 상담', '개선 로드맵 제시', '학습 계획 수립', '후속 지원'],
        price: '유료',
        duration: '60분',
        url: 'https://aicamp.club/consultation'
      }
    ],
    fallback_responses: [
      'AICAMP의 AI 역량진단은 45개 BARS 행동지표를 기반으로 개인의 AI 역량을 종합적으로 평가해요. 무료로 신청하실 수 있고, 상세한 진단 리포트를 받아보실 수 있어요.',
      'AI 역량진단을 통해 현재 AI 역량 수준을 파악하고, 개선 방향을 제시받을 수 있어요. 진단 후에는 전문가와의 1:1 상담도 가능해요.',
      'AICAMP AI 역량진단은 6개 카테고리로 나누어 체계적으로 평가해요. 진단 결과에 따라 맞춤형 학습 계획을 제시해드려요.'
    ]
  },

  // 2. AI 캠프 커리큘럼
  ai_camp_curriculum: {
    name: 'AI 캠프 커리큘럼',
    category: 'education',
    keywords: [
      'AI 캠프', 'AI 교육', 'AI 커리큘럼', 'AI 학습', 'AI 강의', 'AI 과정',
      'AI 캠프 과정', 'AI 교육 프로그램', 'AI 학습 커리큘럼', 'AI 강의 시리즈',
      'AI 기초 교육', 'AI 심화 과정', 'AI 실무 교육', 'AI 프로젝트'
    ],
    services: [
      {
        name: 'AI 기초 캠프',
        description: 'AI 입문자를 위한 기초 개념 및 실습 과정',
        features: ['AI 개념 이해', '기초 실습', '프로젝트 기반 학습', '멘토링 지원'],
        price: '299,000원',
        duration: '4주',
        url: 'https://aicamp.club/curriculum/basic'
      },
      {
        name: 'AI 심화 캠프',
        description: 'AI 실무 역량 강화를 위한 심화 과정',
        features: ['고급 AI 기술', '실무 프로젝트', '팀 협업', '포트폴리오 제작'],
        price: '499,000원',
        duration: '8주',
        url: 'https://aicamp.club/curriculum/advanced'
      },
      {
        name: 'AI 전문가 과정',
        description: 'AI 전문가 양성을 위한 최고급 과정',
        features: ['최신 AI 기술', '연구 프로젝트', '산업체 연계', '취업 지원'],
        price: '899,000원',
        duration: '12주',
        url: 'https://aicamp.club/curriculum/expert'
      }
    ],
    fallback_responses: [
      'AICAMP의 AI 캠프는 기초부터 전문가 과정까지 체계적으로 구성되어 있어요. 프로젝트 기반 학습으로 실무 역량을 키울 수 있어요.',
      'AI 캠프 커리큘럼은 입문자부터 전문가까지 단계별로 설계되어 있어요. 각 과정마다 멘토링과 실습을 통해 확실한 학습 효과를 얻을 수 있어요.',
      'AICAMP AI 캠프는 최신 AI 기술을 반영한 커리큘럼으로 구성되어 있어요. 실무 프로젝트와 포트폴리오 제작을 통해 취업까지 연계해드려요.'
    ]
  },

  // 3. AI 상담 서비스
  ai_consultation: {
    name: 'AI 상담 서비스',
    category: 'consultation',
    keywords: [
      'AI 상담', 'AI 컨설팅', 'AI 전문가 상담', 'AI 진로 상담', 'AI 학습 상담',
      'AI 상담 신청', 'AI 전문가와 상담', 'AI 진로 상담', 'AI 학습 방향',
      'AI 컨설팅 서비스', 'AI 비즈니스 상담', 'AI 도입 상담'
    ],
    services: [
      {
        name: 'AI 진로 상담',
        description: 'AI 분야 진로 및 학습 방향에 대한 전문 상담',
        features: ['개인별 진로 분석', '학습 로드맵 제시', '시장 동향 분석', '구체적 실행 계획'],
        price: '50,000원',
        duration: '60분',
        url: 'https://aicamp.club/consultation/career'
      },
      {
        name: 'AI 비즈니스 상담',
        description: '기업의 AI 도입 및 활용에 대한 전문 상담',
        features: ['비즈니스 분석', 'AI 도입 전략', 'ROI 분석', '구현 로드맵'],
        price: '200,000원',
        duration: '120분',
        url: 'https://aicamp.club/consultation/business'
      },
      {
        name: 'AI 학습 상담',
        description: '개인별 AI 학습 계획 및 방법에 대한 상담',
        features: ['현재 역량 분석', '맞춤형 학습 계획', '자원 추천', '진도 관리'],
        price: '30,000원',
        duration: '45분',
        url: 'https://aicamp.club/consultation/learning'
      }
    ],
    fallback_responses: [
      'AICAMP의 AI 상담 서비스는 AI 전문가와 1:1로 진행되는 맞춤형 상담이에요. 진로, 학습, 비즈니스 등 다양한 분야의 상담을 제공해요.',
      'AI 상담을 통해 개인별 상황에 맞는 구체적인 방향을 제시받을 수 있어요. 전문가의 경험과 지식을 바탕으로 실용적인 조언을 드려요.',
      'AICAMP AI 상담은 단순한 조언이 아닌 실행 가능한 구체적 계획을 제시해요. 상담 후에도 지속적인 지원을 통해 목표 달성을 도와드려요.'
    ]
  },

  // 4. AI 도구 및 플랫폼
  ai_tools_platforms: {
    name: 'AI 도구 및 플랫폼',
    category: 'tools',
    keywords: [
      'AI 도구', 'AI 플랫폼', 'AI 소프트웨어', 'AI 서비스', 'AI 솔루션',
      'n8n', 'ChatGPT', 'Claude', 'Midjourney', 'Stable Diffusion',
      'AI 자동화', 'AI 워크플로우', 'AI 생성 도구', 'AI 분석 도구'
    ],
    services: [
      {
        name: 'n8n 자동화 플랫폼',
        description: 'AI 워크플로우 자동화 및 통합 플랫폼',
        features: ['워크플로우 자동화', 'API 통합', '데이터 처리', '시각적 편집'],
        price: '무료 (기본) / 유료 (고급)',
        duration: '지속적',
        url: 'https://aicamp.club/tools/n8n'
      },
      {
        name: 'AI 생성 도구 모음',
        description: '텍스트, 이미지, 음성 생성 AI 도구 모음',
        features: ['ChatGPT', 'Claude', 'Midjourney', 'Stable Diffusion'],
        price: '도구별 상이',
        duration: '지속적',
        url: 'https://aicamp.club/tools/ai-generators'
      },
      {
        name: 'AI 분석 도구',
        description: '데이터 분석 및 시각화 AI 도구',
        features: ['데이터 분석', '시각화', '예측 모델링', '인사이트 도출'],
        price: '도구별 상이',
        duration: '지속적',
        url: 'https://aicamp.club/tools/ai-analytics'
      }
    ],
    fallback_responses: [
      'AICAMP에서는 n8n, ChatGPT, Claude 등 다양한 AI 도구와 플랫폼을 소개하고 활용법을 가르쳐요. 각 도구의 특징과 활용 사례를 배울 수 있어요.',
      'AI 도구와 플랫폼은 업무 자동화와 생산성 향상에 매우 유용해요. AICAMP에서 각 도구의 장단점과 활용 방법을 체계적으로 학습할 수 있어요.',
      'n8n을 포함한 다양한 AI 도구들을 통해 복잡한 업무 프로세스를 자동화할 수 있어요. AICAMP에서 실무 중심의 도구 활용법을 배워보세요.'
    ]
  },

  // 5. AI 교육 및 학습
  ai_education: {
    name: 'AI 교육 및 학습',
    category: 'education',
    keywords: [
      'AI 교육', 'AI 학습', 'AI 강의', 'AI 튜토리얼', 'AI 온라인 강의',
      'AI 교육 프로그램', 'AI 학습 자료', 'AI 강의 시리즈', 'AI 온라인 코스',
      'AI 기초 강의', 'AI 심화 강의', 'AI 실습 강의', 'AI 워크샵'
    ],
    services: [
      {
        name: 'AI 온라인 강의',
        description: '언제 어디서나 학습할 수 있는 AI 온라인 강의',
        features: ['자유로운 학습 시간', '반복 학습', '실습 자료', '질의응답'],
        price: '월 29,000원',
        duration: '무제한',
        url: 'https://aicamp.club/education/online'
      },
      {
        name: 'AI 워크샵',
        description: '실습 중심의 집중형 AI 학습 워크샵',
        features: ['실습 중심 학습', '소수 정예', '멘토링', '프로젝트 완성'],
        price: '150,000원',
        duration: '1일',
        url: 'https://aicamp.club/education/workshop'
      },
      {
        name: 'AI 학습 자료',
        description: 'AI 학습을 위한 다양한 자료 및 가이드',
        features: ['기초 자료', '실습 가이드', '사례 연구', '최신 트렌드'],
        price: '무료',
        duration: '지속적',
        url: 'https://aicamp.club/education/materials'
      }
    ],
    fallback_responses: [
      'AICAMP의 AI 교육은 온라인 강의부터 워크샵까지 다양한 형태로 제공해요. 개인의 학습 스타일에 맞는 교육 방식을 선택할 수 있어요.',
      'AI 교육은 이론과 실습을 균형있게 구성하여 확실한 학습 효과를 얻을 수 있어요. AICAMP에서 체계적이고 실용적인 AI 교육을 받아보세요.',
      'AICAMP의 AI 교육 프로그램은 초보자부터 전문가까지 모든 수준에 맞춰 설계되어 있어요. 단계별 학습을 통해 AI 역량을 체계적으로 키울 수 있어요.'
    ]
  },

  // 6. AI 비즈니스 솔루션
  ai_business_solutions: {
    name: 'AI 비즈니스 솔루션',
    category: 'business',
    keywords: [
      'AI 비즈니스', 'AI 솔루션', 'AI 도입', 'AI 활용', 'AI 비즈니스 모델',
      'AI 비즈니스 솔루션', 'AI 도입 컨설팅', 'AI 비즈니스 전략', 'AI ROI',
      'AI 비즈니스 사례', 'AI 도입 성공 사례', 'AI 비즈니스 가이드'
    ],
    services: [
      {
        name: 'AI 도입 컨설팅',
        description: '기업의 AI 도입 및 활용을 위한 전문 컨설팅',
        features: ['현황 분석', '도입 전략 수립', 'ROI 분석', '구현 계획'],
        price: '500,000원',
        duration: '프로젝트별',
        url: 'https://aicamp.club/business/consulting'
      },
      {
        name: 'AI 비즈니스 모델 개발',
        description: 'AI 기반 새로운 비즈니스 모델 개발 지원',
        features: ['시장 분석', '모델 설계', '프로토타입', '검증 지원'],
        price: '1,000,000원',
        duration: '프로젝트별',
        url: 'https://aicamp.club/business/model'
      },
      {
        name: 'AI 성공 사례 연구',
        description: 'AI 도입 성공 사례 분석 및 벤치마킹',
        features: ['사례 분석', '성공 요인', '적용 방안', '리스크 관리'],
        price: '200,000원',
        duration: '프로젝트별',
        url: 'https://aicamp.club/business/cases'
      }
    ],
    fallback_responses: [
      'AICAMP의 AI 비즈니스 솔루션은 기업의 AI 도입부터 활용까지 전 과정을 지원해요. 전문적인 컨설팅을 통해 AI 도입의 성공 확률을 높일 수 있어요.',
      'AI 비즈니스 솔루션은 단순한 기술 도입이 아닌 비즈니스 가치 창출에 초점을 맞춰요. AICAMP에서 AI를 통한 비즈니스 혁신을 경험해보세요.',
      'AI 도입의 성공 사례를 분석하고 벤치마킹하여 리스크를 최소화할 수 있어요. AICAMP의 전문가들이 AI 비즈니스 전략을 함께 수립해드려요.'
    ]
  },

  // 7. AI 기술 및 트렌드
  ai_technology_trends: {
    name: 'AI 기술 및 트렌드',
    category: 'technology',
    keywords: [
      'AI 기술', 'AI 트렌드', 'AI 최신 기술', 'AI 발전 동향', 'AI 연구',
      'AI 기술 동향', 'AI 최신 트렌드', 'AI 기술 발전', 'AI 연구 동향',
      'AI 신기술', 'AI 혁신 기술', 'AI 미래 기술', 'AI 기술 전망'
    ],
    services: [
      {
        name: 'AI 기술 동향 리포트',
        description: '최신 AI 기술 동향 및 트렌드 분석 리포트',
        features: ['월간 리포트', '기술 분석', '시장 동향', '전망 분석'],
        price: '월 50,000원',
        duration: '월간',
        url: 'https://aicamp.club/technology/reports'
      },
      {
        name: 'AI 기술 세미나',
        description: '최신 AI 기술을 소개하는 전문 세미나',
        features: ['최신 기술 소개', '전문가 발표', '네트워킹', 'Q&A'],
        price: '100,000원',
        duration: '1일',
        url: 'https://aicamp.club/technology/seminars'
      },
      {
        name: 'AI 연구 커뮤니티',
        description: 'AI 연구자들과 함께하는 기술 커뮤니티',
        features: ['연구 논의', '정보 공유', '협력 기회', '네트워킹'],
        price: '무료',
        duration: '지속적',
        url: 'https://aicamp.club/technology/community'
      }
    ],
    fallback_responses: [
      'AICAMP에서는 최신 AI 기술 동향과 트렌드를 지속적으로 모니터링하고 분석해요. 월간 리포트와 세미나를 통해 최신 정보를 얻을 수 있어요.',
      'AI 기술은 빠르게 발전하고 있어요. AICAMP의 기술 동향 분석을 통해 AI의 미래 방향을 파악하고 준비할 수 있어요.',
      'AI 연구 커뮤니티를 통해 최신 연구 동향을 파악하고 다른 연구자들과 네트워킹할 수 있어요. AICAMP에서 AI 기술의 최전선에 서보세요.'
    ]
  },

  // 8. AICAMP 플랫폼 서비스
  aicamp_platform_services: {
    name: 'AICAMP 플랫폼 서비스',
    category: 'platform',
    keywords: [
      'AICAMP', 'AICAMP 플랫폼', 'AICAMP 서비스', 'AICAMP 웹사이트',
      'AICAMP 회원가입', 'AICAMP 로그인', 'AICAMP 마이페이지',
      'AICAMP 커뮤니티', 'AICAMP 고객지원', 'AICAMP 문의'
    ],
    services: [
      {
        name: 'AICAMP 회원 서비스',
        description: 'AICAMP 플랫폼 회원 전용 서비스',
        features: ['개인 학습 관리', '진도 추적', '수료증 발급', '커뮤니티 참여'],
        price: '무료',
        duration: '지속적',
        url: 'https://aicamp.club/membership'
      },
      {
        name: 'AICAMP 커뮤니티',
        description: 'AI 학습자들과 함께하는 온라인 커뮤니티',
        features: ['질의응답', '정보 공유', '프로젝트 협업', '네트워킹'],
        price: '무료',
        duration: '지속적',
        url: 'https://aicamp.club/community'
      },
      {
        name: 'AICAMP 고객지원',
        description: 'AICAMP 서비스 이용에 대한 고객지원',
        features: ['1:1 문의', 'FAQ', '실시간 채팅', '이메일 지원'],
        price: '무료',
        duration: '영업시간',
        url: 'https://aicamp.club/support'
      }
    ],
    fallback_responses: [
      'AICAMP 플랫폼은 AI 학습을 위한 종합적인 서비스를 제공해요. 회원가입을 통해 개인별 학습 관리와 커뮤니티 참여가 가능해요.',
      'AICAMP 커뮤니티에서 다른 학습자들과 정보를 공유하고 함께 성장할 수 있어요. 언제든지 고객지원을 통해 도움을 받을 수 있어요.',
      'AICAMP는 AI 교육의 모든 과정을 지원하는 플랫폼이에요. 회원 서비스를 통해 체계적인 학습 관리와 다양한 혜택을 누릴 수 있어요.'
    ]
  }
};

/**
 * AICAMP 엔티티 추출 함수
 */
function extractAICAMPEntities(question) {
  try {
    const lowerQuestion = question.toLowerCase();
    const entityScores = {};
    const detectedEntities = [];
    
    // 각 서비스별 키워드 매칭
    Object.entries(AICAMP_COMPREHENSIVE_ENTITIES).forEach(([serviceKey, serviceData]) => {
      let score = 0;
      const matchedKeywords = [];
      
      serviceData.keywords.forEach(keyword => {
        if (lowerQuestion.includes(keyword.toLowerCase())) {
          score += 1;
          matchedKeywords.push(keyword);
        }
      });
      
      const normalizedScore = score / serviceData.keywords.length;
      entityScores[serviceKey] = normalizedScore;
      
      if (normalizedScore > 0) {
        detectedEntities.push({
          service: serviceKey,
          name: serviceData.name,
          category: serviceData.category,
          score: normalizedScore,
          matched_keywords: matchedKeywords
        });
      }
    });
    
    // 점수 순으로 정렬
    detectedEntities.sort((a, b) => b.score - a.score);
    
    // 상위 엔티티 선택 (최대 3개)
    const topEntities = detectedEntities.slice(0, 3);
    
    // 가장 높은 점수의 서비스 찾기
    const primaryService = Object.keys(entityScores).reduce((a, b) => 
      entityScores[a] > entityScores[b] ? a : b
    );
    
    const confidence = entityScores[primaryService];
    
    // 신뢰도가 임계값보다 낮으면 일반 카테고리로 분류
    if (confidence < 0.6) {
      return { 
        primary_service: 'general', 
        confidence: confidence,
        entities: topEntities
      };
    }
    
    return {
      primary_service: primaryService,
      confidence: confidence,
      entities: topEntities,
      all_scores: entityScores
    };
    
  } catch (error) {
    console.error('❌ AICAMP 엔티티 추출 실패:', error);
    return { 
      primary_service: 'general', 
      confidence: 0.3,
      entities: []
    };
  }
}

/**
 * AICAMP 서비스 매칭 함수
 */
function matchAICAMPServices(question, entities) {
  try {
    // 일반 질문인 경우 전체 서비스 개요 제공
    if (entities.primary_service === 'general') {
      return {
        matched_services: [
          'AI 역량진단',
          'AI 캠프 커리큘럼',
          'AI 상담 서비스',
          'AI 도구 및 플랫폼',
          'AI 교육 및 학습',
          'AI 비즈니스 솔루션',
          'AI 기술 및 트렌드',
          'AICAMP 플랫폼 서비스'
        ],
        relevance_score: 0.5,
        recommendation_type: 'overview'
      };
    }
    
    // 특정 서비스 매칭
    const serviceData = AICAMP_COMPREHENSIVE_ENTITIES[entities.primary_service];
    if (!serviceData) {
      return {
        matched_services: ['AICAMP 플랫폼 서비스'],
        relevance_score: 0.3,
        recommendation_type: 'platform'
      };
    }
    
    // 관련 서비스 추천
    const relatedServices = [];
    Object.entries(AICAMP_COMPREHENSIVE_ENTITIES).forEach(([key, data]) => {
      if (key !== entities.primary_service && data.category === serviceData.category) {
        relatedServices.push(data.name);
      }
    });
    
    return {
      matched_services: serviceData.services.map(s => s.name),
      related_services: relatedServices,
      relevance_score: entities.confidence,
      recommendation_type: 'specific',
      service_category: serviceData.category,
      service_data: serviceData
    };
    
  } catch (error) {
    console.error('❌ AICAMP 서비스 매칭 실패:', error);
    return {
      matched_services: ['AICAMP 플랫폼 서비스'],
      relevance_score: 0.3,
      recommendation_type: 'fallback'
    };
  }
}

/**
 * AICAMP 풀백 답변 생성 함수
 */
function generateAICAMPFallbackResponse(question, entities, services) {
  try {
    // 1차 풀백: 특정 서비스 상세 정보
    if (entities.primary_service !== 'general' && entities.confidence > 0.7) {
      const serviceData = AICAMP_COMPREHENSIVE_ENTITIES[entities.primary_service];
      const responses = serviceData.fallback_responses;
      const selectedResponse = responses[Math.floor(Math.random() * responses.length)];
      
      return {
        response: selectedResponse,
        fallback_level: 1,
        confidence: entities.confidence,
        service_details: serviceData.services,
        suggested_actions: ['서비스 상세 정보 확인', '신청/문의하기', '관련 서비스 탐색']
      };
    }
    
    // 2차 풀백: 서비스별 맞춤 추천
    if (entities.entities.length > 0) {
      const topEntity = entities.entities[0];
      const serviceData = AICAMP_COMPREHENSIVE_ENTITIES[topEntity.service];
      
      return {
        response: `${serviceData.name}에 대해 궁금하시군요! ${serviceData.fallback_responses[0]}`,
        fallback_level: 2,
        confidence: topEntity.score,
        service_details: serviceData.services.slice(0, 2),
        suggested_actions: ['서비스 상세 보기', '비슷한 서비스 찾기', '전체 서비스 둘러보기']
      };
    }
    
    // 3차 풀백: 일반적인 AICAMP 안내
    const generalResponse = 'AICAMP는 AI 역량진단부터 교육, 상담, 도구까지 AI와 관련된 모든 서비스를 제공하는 종합 플랫폼이에요. 어떤 서비스에 관심이 있으신가요?';
    
    return {
      response: generalResponse,
      fallback_level: 3,
      confidence: 0.4,
      suggested_actions: ['전체 서비스 둘러보기', 'AI 역량진단 받기', '상담 신청하기', '커뮤니티 참여하기']
    };
    
  } catch (error) {
    console.error('❌ AICAMP 풀백 답변 생성 실패:', error);
    return {
      response: 'AICAMP에 대해 궁금한 점이 있으시면 언제든 문의해주세요! 이교장이 도와드릴게요.',
      fallback_level: 4,
      confidence: 0.2,
      suggested_actions: ['고객지원 문의', 'FAQ 확인', '커뮤니티 참여']
    };
  }
}

/**
 * 이교장 스타일 AICAMP 응답 생성 함수
 */
function generateLeeGyojangAICAMPResponse(question, entities, services, fallback) {
  try {
    // 기본 인사말
    let response = '안녕하세요! 이교장입니다. ';
    
    // 메인 답변 추가
    response += fallback.response + ' ';
    
    // 서비스 상세 정보 추가
    if (fallback.service_details) {
      response += '\n\n관련 서비스 정보를 알려드릴게요:\n';
      fallback.service_details.slice(0, 3).forEach((service, index) => {
        response += `• ${service.name}: ${service.description}\n`;
        response += `  💰 가격: ${service.price}\n`;
        response += `  ⏱️ 소요시간: ${service.duration}\n\n`;
      });
    }
    
    // 추천 액션 추가
    if (fallback.suggested_actions && fallback.suggested_actions.length > 0) {
      response += '\n다음 중 어떤 것을 도와드릴까요?\n';
      fallback.suggested_actions.forEach((action, index) => {
        response += `${index + 1}. ${action}\n`;
      });
    }
    
    // 격려 메시지
    response += '\nAICAMP에서 AI 역량을 키우고 함께 성장해보세요! 궁금한 점이 있으시면 언제든 물어보세요!';
    
    // 응답 길이 제한
    if (response.length > 1500) {
      response = response.substring(0, 1450) + '...\n\n더 자세한 내용은 추가 질문해주세요!';
    }
    
    return {
      response: response,
      metadata: {
        primary_service: entities.primary_service,
        confidence: entities.confidence,
        fallback_level: fallback.fallback_level,
        entities_detected: entities.entities.length,
        services_matched: services.matched_services.length,
        response_length: response.length
      }
    };
    
  } catch (error) {
    console.error('❌ 이교장 AICAMP 응답 생성 실패:', error);
    return {
      response: '안녕하세요! 이교장입니다. AICAMP에 대해 궁금한 점이 있으시면 언제든 물어보세요!',
      metadata: {
        primary_service: 'general',
        confidence: 0.2,
        fallback_level: 5,
        entities_detected: 0,
        services_matched: 0,
        response_length: 0
      }
    };
  }
}

/**
 * AICAMP 전체 서비스 답변 시스템 메인 함수
 */
function processAICAMPComprehensiveQuestion(question) {
  try {
    const startTime = new Date();
    
    console.log('🎯 AICAMP 종합 질문 처리 시작:', question.substring(0, 50) + '...');
    
    // 1단계: 엔티티 추출
    const entities = extractAICAMPEntities(question);
    console.log('📊 엔티티 추출 결과:', entities);
    
    // 2단계: 서비스 매칭
    const services = matchAICAMPServices(question, entities);
    console.log('📚 서비스 매칭 결과:', services);
    
    // 3단계: 풀백 답변 생성
    const fallback = generateAICAMPFallbackResponse(question, entities, services);
    console.log('🔄 풀백 답변 생성 완료');
    
    // 4단계: 이교장 스타일 응답 생성
    const finalResponse = generateLeeGyojangAICAMPResponse(question, entities, services, fallback);
    
    const processingTime = new Date() - startTime;
    console.log(`✅ AICAMP 종합 질문 처리 완료 (${processingTime}ms)`);
    
    return {
      success: true,
      response: finalResponse.response,
      metadata: finalResponse.metadata,
      processing_time: processingTime,
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

/**
 * ================================================================================
 * 🎯 AICAMP V19.0 포괄적 엔티티 시스템 완성
 * ================================================================================
 * 
 * ✅ 완성된 기능:
 * 1. 8개 주요 서비스 카테고리 엔티티 정의
 * 2. 다층 풀백 답변 시스템 (5단계)
 * 3. 상세 서비스 정보 및 가이드
 * 4. 사용자 맞춤형 추천 시스템
 * 5. 포괄적인 AICAMP 서비스 안내
 * 
 * 🎯 지원 서비스:
 * - AI 역량진단: 45문항 BARS 평가, 개인별 분석
 * - AI 캠프 커리큘럼: 기초~전문가 과정, 프로젝트 기반 학습
 * - AI 상담 서비스: 진로/비즈니스/학습 상담
 * - AI 도구 및 플랫폼: n8n, ChatGPT, Claude 등
 * - AI 교육 및 학습: 온라인 강의, 워크샵, 학습 자료
 * - AI 비즈니스 솔루션: 도입 컨설팅, 모델 개발, 사례 연구
 * - AI 기술 및 트렌드: 동향 리포트, 세미나, 연구 커뮤니티
 * - AICAMP 플랫폼 서비스: 회원 서비스, 커뮤니티, 고객지원
 * 
 * 🔧 주요 함수:
 * - processAICAMPComprehensiveQuestion(): 메인 답변 처리
 * - extractAICAMPEntities(): 엔티티 추출
 * - matchAICAMPServices(): 서비스 매칭
 * - generateAICAMPFallbackResponse(): 풀백 답변 생성
 * - generateLeeGyojangAICAMPResponse(): 이교장 스타일 응답
 * 
 * ================================================================================
 */
