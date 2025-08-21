/**
 * ================================================================================
 * 🎯 N8N 웹훅 통합 설정 파일
 * ================================================================================
 * 
 * 이 파일은 n8n과 AICAMP 시스템을 연동하기 위한 설정을 포함합니다.
 * 
 * 🔧 설정 방법:
 * 1. n8n 인스턴스에서 웹훅 노드 생성
 * 2. 웹훅 URL을 환경변수에 설정
 * 3. API 키 설정 (선택사항)
 * 4. 워크플로우 구성
 * 
 * ================================================================================
 */

/**
 * N8N 웹훅 설정 가이드
 */
const N8N_SETUP_GUIDE = {
  // 1단계: n8n 웹훅 노드 생성
  step1: {
    title: 'n8n 웹훅 노드 생성',
    description: 'n8n 대시보드에서 새로운 워크플로우를 생성하고 웹훅 노드를 추가합니다.',
    instructions: [
      'n8n 대시보드 접속',
      '새 워크플로우 생성',
      '웹훅 노드 추가',
      '웹훅 URL 복사'
    ]
  },
  
  // 2단계: 환경변수 설정
  step2: {
    title: 'Google Apps Script 환경변수 설정',
    description: '복사한 웹훅 URL을 Google Apps Script 환경변수에 설정합니다.',
    variables: {
      'N8N_WEBHOOK_URL': 'n8n에서 생성한 웹훅 URL',
      'N8N_API_KEY': 'n8n API 키 (선택사항)',
      'ENABLE_N8N_RESPONSES': 'true'
    }
  },
  
  // 3단계: 워크플로우 구성
  step3: {
    title: 'n8n 워크플로우 구성',
    description: 'n8n에서 질문 처리 및 응답 생성을 위한 워크플로우를 구성합니다.',
    nodes: [
      '웹훅 노드 (입력)',
      '질문 분석 노드',
      '커리큘럼 매칭 노드',
      '응답 생성 노드',
      'HTTP 응답 노드 (출력)'
    ]
  }
};

/**
 * N8N 웹훅 테스트 함수
 */
function testN8NWebhook() {
  try {
    const config = getN8NConfig();
    
    if (!config.N8N_WEBHOOK_URL) {
      console.log('⚠️ N8N 웹훅 URL이 설정되지 않았습니다.');
      return { success: false, message: 'N8N 웹훅 URL을 먼저 설정해주세요.' };
    }
    
    const testPayload = {
      question: '마케팅 자동화를 n8n으로 어떻게 할 수 있나요?',
      entities: { primary_job: 'marketing', confidence: 0.8 },
      timestamp: new Date().toISOString(),
      source: 'aicamp_test'
    };
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': config.N8N_API_KEY ? `Bearer ${config.N8N_API_KEY}` : ''
      },
      payload: JSON.stringify(testPayload),
      muteHttpExceptions: true
    };
    
    console.log('🧪 N8N 웹훅 테스트 시작...');
    const response = UrlFetchApp.fetch(config.N8N_WEBHOOK_URL, options);
    
    const responseCode = response.getResponseCode();
    const responseText = response.getContentText();
    
    console.log(`📊 응답 코드: ${responseCode}`);
    console.log(`📄 응답 내용: ${responseText}`);
    
    if (responseCode === 200) {
      return {
        success: true,
        message: 'N8N 웹훅 연결 성공!',
        response_code: responseCode,
        response_data: responseText
      };
    } else {
      return {
        success: false,
        message: `N8N 웹훅 연결 실패 (코드: ${responseCode})`,
        response_code: responseCode,
        response_data: responseText
      };
    }
    
  } catch (error) {
    console.error('❌ N8N 웹훅 테스트 실패:', error);
    return {
      success: false,
      message: 'N8N 웹훅 테스트 중 오류가 발생했습니다.',
      error: error.message
    };
  }
}

/**
 * N8N 웹훅 설정 함수
 */
function setupN8NWebhook(webhookUrl, apiKey = '') {
  try {
    console.log('🔧 N8N 웹훅 설정 시작');
    
    const properties = PropertiesService.getScriptProperties();
    
    // 웹훅 URL 설정
    properties.setProperty('N8N_WEBHOOK_URL', webhookUrl);
    console.log(`✅ N8N_WEBHOOK_URL: ${webhookUrl}`);
    
    // API 키 설정 (있는 경우)
    if (apiKey) {
      properties.setProperty('N8N_API_KEY', apiKey);
      console.log('✅ N8N_API_KEY: 설정됨');
    }
    
    // N8N 응답 활성화
    properties.setProperty('ENABLE_N8N_RESPONSES', 'true');
    console.log('✅ ENABLE_N8N_RESPONSES: true');
    
    console.log('🎯 N8N 웹훅 설정 완료');
    return { success: true, message: 'N8N 웹훅 설정이 완료되었습니다.' };
    
  } catch (error) {
    console.error('❌ N8N 웹훅 설정 실패:', error);
    return { success: false, error: error.message };
  }
}

/**
 * N8N 워크플로우 예시 JSON
 */
const N8N_WORKFLOW_EXAMPLE = {
  name: "AICAMP N8N Curriculum Assistant",
  nodes: [
    {
      id: "webhook",
      name: "Webhook",
      type: "n8n-nodes-base.webhook",
      position: [240, 300],
      parameters: {
        httpMethod: "POST",
        path: "aicamp-n8n",
        responseMode: "responseNode"
      }
    },
    {
      id: "question_analyzer",
      name: "Question Analyzer",
      type: "n8n-nodes-base.function",
      position: [460, 300],
      parameters: {
        functionCode: `
          const question = $input.first().json.question;
          const entities = $input.first().json.entities;
          
          // 질문 분석 로직
          return {
            json: {
              question: question,
              entities: entities,
              analysis: {
                complexity: question.length > 50 ? 'high' : 'low',
                job_category: entities.primary_job,
                confidence: entities.confidence
              }
            }
          };
        `
      }
    },
    {
      id: "curriculum_matcher",
      name: "Curriculum Matcher",
      type: "n8n-nodes-base.function",
      position: [680, 300],
      parameters: {
        functionCode: `
          const analysis = $input.first().json.analysis;
          
          // 커리큘럼 매칭 로직
          const curriculum = {
            marketing: [
              'n8n 마케팅 자동화 워크플로우',
              '고객 데이터 수집 및 분석',
              '소셜미디어 자동 포스팅'
            ],
            planning: [
              'n8n 데이터 분석 및 시각화',
              '비즈니스 프로세스 자동화',
              '시장 데이터 수집 및 분석'
            ]
          };
          
          const matched = curriculum[analysis.job_category] || ['n8n 기본 개념'];
          
          return {
            json: {
              matched_curriculum: matched,
              job_category: analysis.job_category,
              confidence: analysis.confidence
            }
          };
        `
      }
    },
    {
      id: "response_generator",
      name: "Response Generator",
      type: "n8n-nodes-base.function",
      position: [900, 300],
      parameters: {
        functionCode: `
          const curriculum = $input.first().json;
          const question = $('Question Analyzer').first().json.question;
          
          // 응답 생성 로직
          const response = \`안녕하세요! 이교장입니다. \${question}에 대해 답변드릴게요.
          
          n8n을 활용한 \${curriculum.job_category} 자동화에 대해 설명드릴게요:
          
          \${curriculum.matched_curriculum.map(topic => '• ' + topic).join('\\n')}
          
          궁금한 점이 있으시면 언제든 물어보세요!\`;
          
          return {
            json: {
              response: response,
              metadata: {
                job_category: curriculum.job_category,
                confidence: curriculum.confidence,
                curriculum_count: curriculum.matched_curriculum.length
              }
            }
          };
        `
      }
    },
    {
      id: "http_response",
      name: "HTTP Response",
      type: "n8n-nodes-base.respondToWebhook",
      position: [1120, 300],
      parameters: {
        responseCode: 200,
        responseData: "json"
      }
    }
  ],
  connections: {
    "Webhook": {
      main: [["Question Analyzer"]]
    },
    "Question Analyzer": {
      main: [["Curriculum Matcher"]]
    },
    "Curriculum Matcher": {
      main: [["Response Generator"]]
    },
    "Response Generator": {
      main: [["HTTP Response"]]
    }
  }
};

/**
 * N8N 설정 완료 확인
 */
function verifyN8NSetup() {
  try {
    const config = getN8NConfig();
    
    const checks = {
      webhook_url: !!config.N8N_WEBHOOK_URL,
      responses_enabled: config.ENABLE_N8N_RESPONSES,
      entity_detection: config.ENTITY_DETECTION_ENABLED,
      fallback_enabled: config.FALLBACK_ENABLED
    };
    
    const allChecks = Object.values(checks).every(check => check);
    
    console.log('🔍 N8N 설정 확인 결과:');
    Object.entries(checks).forEach(([key, value]) => {
      console.log(`${value ? '✅' : '❌'} ${key}: ${value}`);
    });
    
    return {
      success: allChecks,
      checks: checks,
      message: allChecks ? 'N8N 설정이 완료되었습니다.' : '일부 설정이 누락되었습니다.'
    };
    
  } catch (error) {
    console.error('❌ N8N 설정 확인 실패:', error);
    return { success: false, error: error.message };
  }
}

/**
 * ================================================================================
 * 🎯 N8N 웹훅 통합 완성
 * ================================================================================
 * 
 * ✅ 완성된 기능:
 * 1. N8N 웹훅 설정 가이드
 * 2. 웹훅 테스트 함수
 * 3. 환경변수 설정 함수
 * 4. 워크플로우 예시 JSON
 * 5. 설정 완료 확인 함수
 * 
 * 🔧 사용 방법:
 * 1. setupN8NWebhook(webhookUrl, apiKey) - 웹훅 설정
 * 2. testN8NWebhook() - 웹훅 연결 테스트
 * 3. verifyN8NSetup() - 설정 완료 확인
 * 
 * 📋 N8N 워크플로우 구성:
 * - 웹훅 노드 (입력)
 * - 질문 분석 노드
 * - 커리큘럼 매칭 노드
 * - 응답 생성 노드
 * - HTTP 응답 노드 (출력)
 * 
 * ================================================================================
 */
