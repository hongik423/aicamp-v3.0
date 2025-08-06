# 🔧 Google Apps Script 설정 가이드

## 1. Google Apps Script 프로젝트 생성

1. [Google Apps Script](https://script.google.com/) 접속
2. "새 프로젝트" 클릭
3. 프로젝트명을 "AICAMP_AI_Diagnosis_V8" 로 설정

## 2. 코드 배포

1. 기본 `Code.gs` 파일에 `docs/modules/google_apps_script_perfect_V8.0.js` 내용 전체 복사
2. 파일 저장 (Ctrl+S)

## 3. 스크립트 속성 설정

좌측 메뉴에서 "설정" → "스크립트 속성"에서 다음 값들을 추가:

### 필수 환경변수 ⭐
```
SPREADSHEET_ID: [Google Sheet ID - 아래에서 생성할 예정]
GEMINI_API_KEY: [Gemini API 키 - 아래에서 설정]
ADMIN_EMAIL: [관리자 이메일 주소]
```

### 선택적 환경변수 (기본값 사용 가능)
```
AICAMP_WEBSITE: aicamp.club
AI_MODEL: gemini-2.0-flash-exp
MAX_OUTPUT_TOKENS: 32768
TEMPERATURE: 0.8
DEBUG_MODE: false
ENVIRONMENT: production
```

### 개발 환경에서 디버깅 시
```
DEBUG_MODE: true
ENVIRONMENT: development
```

## 4. 웹 앱으로 배포

1. 우측 상단 "배포" → "새 배포" 클릭
2. 유형: "웹 앱" 선택
3. 설정:
   - 설명: "AICAMP AI 역량진단 시스템 V8.0"
   - 실행 대상: "나"
   - 액세스 권한: "모든 사용자"
4. "배포" 클릭
5. **웹 앱 URL 복사 (중요!)** - 프론트엔드에서 사용할 예정

## 5. 필요한 권한 승인

처음 실행 시 다음 권한들이 필요합니다:
- Gmail 발송 권한
- Google Sheets 접근 권한
- 외부 URL 접근 권한 (Gemini API)

## 다음 단계

✅ Google Apps Script 설정 완료 후
📋 Google Sheets 데이터베이스 구성
🔑 Gemini API 키 설정
🌐 프론트엔드 연동
