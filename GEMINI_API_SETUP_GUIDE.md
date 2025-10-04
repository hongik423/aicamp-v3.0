# 🤖 Gemini API 설정 가이드

## 1. Google AI Studio 접속

1. [Google AI Studio](https://aistudio.google.com/) 접속
2. Google 계정으로 로그인

## 2. API 키 생성

1. 좌측 메뉴에서 "API keys" 클릭
2. "Create API key" 버튼 클릭
3. "Create API key in new project" 선택
4. API 키 복사 및 안전한 곳에 저장

## 3. API 키 설정

Google Apps Script 스크립트 속성에 추가:
```
GEMINI_API_KEY: [복사한 API 키]
```

## 4. API 사용량 모니터링

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 해당 프로젝트 선택
3. "APIs & Services" → "Quotas" 에서 사용량 확인

## 5. 현재 시스템에서 사용하는 Gemini 설정

```javascript
// 현재 설정된 모델 및 파라미터
AI_MODEL: 'gemini-2.0-flash-exp'
MAX_OUTPUT_TOKENS: 32768
TEMPERATURE: 0.8
TIMEOUT_GEMINI: 180000 // 3분
```

## 6. API 요청 예시

시스템에서 Gemini에게 보내는 프롬프트 구조:
```
당신은 AI 역량진단 전문가입니다. 다음 기업의 진단 결과를 분석하여 인사이트를 제공해주세요.

기업 정보:
- 회사명: [회사명]
- 업종: [업종]
- 직원수: [직원수]
- 전체 점수: [점수]점 ([등급]등급)

카테고리별 점수:
- 리더십: [점수]/5.0
- 인프라: [점수]/5.0
...

다음을 포함한 JSON 형식으로 응답해주세요:
1. keyFindings: 핵심 발견사항 3-5개
2. insights: 심층 분석 인사이트
3. recommendations: 구체적 실행 권고사항
```

## 7. 비용 최적화 팁

- 무료 할당량: 월 15 requests/minute
- 유료 전환 시: $0.00025/1K characters (input), $0.00075/1K characters (output)
- 프롬프트 길이 최적화로 비용 절감

## 다음 단계

✅ Gemini API 설정 완료 후
🌐 프론트엔드 연동 및 테스트
