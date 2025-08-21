# 🎯 N8N 커리큘럼 답변시스템 배포 가이드

## 📋 개요

이 가이드는 AICAMP v3.0 프로젝트에 n8n 커리큘럼 답변시스템을 통합하고 배포하는 방법을 설명합니다.

## 🚀 1단계: 환경 설정

### 1.1 Google Apps Script 환경변수 설정

Google Apps Script 대시보드에서 다음 환경변수를 설정하세요:

```javascript
// 필수 환경변수
SPREADSHEET_ID: 1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ
ADMIN_EMAIL: hongik423@gmail.com
AICAMP_WEBSITE: aicamp.club

// N8N 관련 환경변수
ENABLE_N8N_RESPONSES: true
FALLBACK_ENABLED: true
ENTITY_DETECTION_ENABLED: true
CONFIDENCE_THRESHOLD: 0.7
MAX_RESPONSE_LENGTH: 1000
INCLUDE_EXAMPLES: true

// 선택적 N8N 웹훅 설정
N8N_WEBHOOK_URL: [n8n 웹훅 URL]
N8N_API_KEY: [n8n API 키]
```

### 1.2 환경변수 자동 설정

Google Apps Script에서 다음 함수를 실행하여 환경변수를 자동으로 설정할 수 있습니다:

```javascript
// N8N 환경변수 설정
setupN8NEnvironmentVariables();

// N8N 웹훅 설정 (선택사항)
setupN8NWebhook('https://your-n8n-instance.com/webhook/aicamp', 'your-api-key');
```

## 🎯 2단계: n8n 워크플로우 설정 (선택사항)

### 2.1 n8n 인스턴스 설정

1. n8n 인스턴스에 접속
2. 새 워크플로우 생성
3. 웹훅 노드 추가
4. 웹훅 URL 복사

### 2.2 워크플로우 구성

다음 노드들을 순서대로 구성하세요:

1. **웹훅 노드** (입력)
2. **질문 분석 노드** (Function)
3. **커리큘럼 매칭 노드** (Function)
4. **응답 생성 노드** (Function)
5. **HTTP 응답 노드** (출력)

### 2.3 워크플로우 예시

```json
{
  "name": "AICAMP N8N Curriculum Assistant",
  "nodes": [
    {
      "id": "webhook",
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "httpMethod": "POST",
        "path": "aicamp-n8n",
        "responseMode": "responseNode"
      }
    },
    {
      "id": "question_analyzer",
      "name": "Question Analyzer",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "functionCode": `
          const question = $input.first().json.question;
          const entities = $input.first().json.entities;
          
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
    }
  ]
}
```

## 🧪 3단계: 시스템 테스트

### 3.1 기본 테스트 실행

Google Apps Script에서 다음 함수들을 순서대로 실행하세요:

```javascript
// 1. N8N 환경변수 설정 확인
verifyN8NSetup();

// 2. 엔티티 추출 테스트
testEntityExtraction();

// 3. 커리큘럼 매칭 테스트
testCurriculumMatching();

// 4. 풀백 시스템 테스트
testFallbackSystem();

// 5. 이교장 스타일 응답 테스트
testLeeGyojangResponse();

// 6. 전체 시스템 통합 테스트
runFullSystemTest();

// 7. 실시간 응답 테스트
testRealTimeResponse();
```

### 3.2 N8N 웹훅 테스트 (선택사항)

```javascript
// N8N 웹훅 연결 테스트
testN8NWebhook();
```

## 📊 4단계: 성능 모니터링

### 4.1 시스템 상태 확인

```javascript
// 시스템 상태 확인
checkSystemStatus();

// 성능 모니터링
monitorV17Performance();
```

### 4.2 로그 확인

Google Apps Script 실행 로그에서 다음 항목들을 확인하세요:

- ✅ 엔티티 추출 성공률
- ✅ 커리큘럼 매칭 정확도
- ✅ 풀백 시스템 동작
- ✅ 응답 생성 시간
- ✅ 오류 발생 여부

## 🔧 5단계: 실제 사용

### 5.1 메인 함수 호출

```javascript
// n8n 질문 처리
const result = processN8NQuestion('마케팅 자동화를 n8n으로 어떻게 할 수 있나요?');

console.log('응답:', result.response);
console.log('메타데이터:', result.metadata);
```

### 5.2 웹 애플리케이션 통합

Next.js 애플리케이션에서 Google Apps Script API를 호출하여 n8n 답변시스템을 사용할 수 있습니다.

## 🛠️ 6단계: 문제 해결

### 6.1 일반적인 문제들

#### 문제: 엔티티 추출이 제대로 되지 않음
**해결방법:**
```javascript
// 신뢰도 임계값 조정
CONFIDENCE_THRESHOLD: 0.5  // 더 낮은 값으로 설정
```

#### 문제: 응답이 너무 길거나 짧음
**해결방법:**
```javascript
// 응답 길이 조정
MAX_RESPONSE_LENGTH: 800   // 원하는 길이로 설정
```

#### 문제: N8N 웹훅 연결 실패
**해결방법:**
1. 웹훅 URL 확인
2. API 키 설정 확인
3. n8n 인스턴스 상태 확인

### 6.2 디버깅

```javascript
// 디버그 모드 활성화
DEBUG_MODE: true

// 상세 로그 확인
console.log('디버그 정보:', {
  entities: extractEntities(question),
  curriculum: matchN8NCurriculum(question, entities),
  fallback: generateFallbackResponse(question, entities, curriculum)
});
```

## 📈 7단계: 최적화

### 7.1 성능 최적화

1. **응답 캐싱**: 자주 묻는 질문에 대한 응답 캐싱
2. **배치 처리**: 여러 질문을 한 번에 처리
3. **비동기 처리**: 긴 응답 생성 시 비동기 처리

### 7.2 정확도 향상

1. **키워드 확장**: 더 많은 직무별 키워드 추가
2. **커리큘럼 업데이트**: 최신 n8n 커리큘럼 반영
3. **사용자 피드백**: 응답 품질 개선을 위한 피드백 수집

## 🎯 8단계: 배포 완료 확인

### 8.1 최종 검증

```javascript
// 전체 시스템 최종 테스트
const finalTest = runFullSystemTest();

if (finalTest.success) {
  console.log('✅ N8N 커리큘럼 답변시스템 배포 완료!');
  console.log('📊 평균 성공률:', finalTest.summary.average_success_rate.toFixed(1) + '%');
} else {
  console.log('❌ 배포 중 문제가 발생했습니다.');
  console.log('🔧 문제 해결 후 다시 시도해주세요.');
}
```

### 8.2 모니터링 설정

정기적으로 다음 항목들을 확인하세요:

- 시스템 성능 지표
- 사용자 만족도
- 오류 발생률
- 응답 시간

## 📋 체크리스트

- [ ] Google Apps Script 환경변수 설정
- [ ] N8N 워크플로우 구성 (선택사항)
- [ ] 기본 테스트 실행
- [ ] 웹훅 연결 테스트 (선택사항)
- [ ] 성능 모니터링 설정
- [ ] 실제 사용 테스트
- [ ] 문제 해결 및 최적화
- [ ] 최종 검증 완료

## 🎉 완료!

N8N 커리큘럼 답변시스템이 성공적으로 배포되었습니다!

### 주요 기능:
- ✅ 직무별 엔티티 기반 질문 분석
- ✅ n8n 커리큘럼 자동 매칭
- ✅ 다층 풀백 답변 시스템
- ✅ 이교장 스타일 응답 생성
- ✅ 실시간 학습 경로 추천
- ✅ N8N 웹훅 통합 (선택사항)

### 지원 직무:
- 마케팅, 기획, 생산관리, 품질관리
- 개발, 디자인, 운영

이제 사용자들이 n8n에 대한 질문을 하면 직무별로 맞춤형 답변을 받을 수 있습니다!
