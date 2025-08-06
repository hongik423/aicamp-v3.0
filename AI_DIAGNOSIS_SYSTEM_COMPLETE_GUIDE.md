# 🚀 AI 역량진단 시스템 완전 구축 가이드

## 📋 시스템 개요

Google Apps Script 기반의 AI 역량진단 보고서 작성 시스템이 완성되었습니다.

### 주요 기능
- ✅ 24개 평가 항목 (6개 카테고리 × 4문항)
- ✅ GEMINI 2.0 Flash AI 기반 분석
- ✅ 완벽한 오류 처리 및 복구 시스템
- ✅ 자동 이메일 발송
- ✅ Google Sheets 데이터 저장
- ✅ SWOT 전략 분석
- ✅ 3단계 실행 로드맵
- ✅ ROI 분석

## 🔧 구축 단계별 가이드

### 1단계: Google Apps Script 설정
1. [Google Apps Script](https://script.google.com/) 접속
2. 새 프로젝트 생성: "AICAMP_AI_Diagnosis_V8"
3. `docs/modules/google_apps_script_perfect_V8.0.js` 내용 전체 복사
4. 웹 앱으로 배포
   - 실행 대상: "나"
   - 액세스 권한: "모든 사용자"
5. **웹 앱 URL 복사 보관** ⭐

### 2단계: Google Sheets 데이터베이스 구성
1. [Google Sheets](https://sheets.google.com/)에서 새 스프레드시트 생성
2. 파일명: "AICAMP_AI_진단_데이터베이스"
3. **Sheet ID 복사 보관** (URL에서 추출)
4. 공유 설정: "링크가 있는 모든 사용자" → "편집자"

### 3단계: Gemini API 키 발급
1. [Google AI Studio](https://aistudio.google.com/) 접속
2. "API keys" → "Create API key" → "Create API key in new project"
3. **API 키 복사 보관** ⭐

### 4단계: Google Apps Script 환경변수 설정
Google Apps Script 프로젝트에서 "설정" → "스크립트 속성"에 추가:

#### 필수 환경변수 ⭐
```
SPREADSHEET_ID: [2단계에서 복사한 Sheet ID]
GEMINI_API_KEY: [3단계에서 복사한 API 키]
ADMIN_EMAIL: [관리자 이메일 주소]
```

#### 선택적 환경변수 (기본값 사용 가능)
```
AICAMP_WEBSITE: aicamp.club
AI_MODEL: gemini-2.0-flash-exp
MAX_OUTPUT_TOKENS: 32768
TEMPERATURE: 0.8
DEBUG_MODE: false
ENVIRONMENT: production
```

#### 개발/테스트 시 추가 설정
```
DEBUG_MODE: true
ENVIRONMENT: development
```

### 5단계: Next.js 환경변수 설정
프로젝트 루트에 `.env.local` 파일 생성:
```bash
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```
> `YOUR_SCRIPT_ID`를 1단계에서 복사한 실제 웹 앱 URL로 교체

### 6단계: 권한 승인
1. Google Apps Script에서 함수 실행 → 권한 승인
2. Gmail 발송 권한 승인
3. Google Sheets 접근 권한 승인
4. 외부 URL 접근 권한 승인 (Gemini API)

## 🧪 시스템 테스트

### 기본 연결 테스트
```bash
curl -X GET "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
```

### 프론트엔드 테스트
```bash
npm run dev
# http://localhost:3000/diagnosis 접속하여 테스트
```

## 📊 데이터 흐름

1. **사용자 입력** → 프론트엔드 폼
2. **데이터 검증** → Next.js API 라우트
3. **GAS 전송** → Google Apps Script 처리
4. **AI 분석** → Gemini 2.0 Flash
5. **데이터 저장** → Google Sheets
6. **이메일 발송** → Gmail API
7. **결과 전달** → 사용자 이메일

## 🔍 주요 파일 구조

```
📁 시스템 구성 파일
├── docs/modules/google_apps_script_perfect_V8.0.js (GAS 메인 코드 - 환경변수 보안 강화)
├── src/app/api/ai-capability-diagnosis/route.ts (API 라우트)
├── src/features/ai-capability-diagnosis/ (프론트엔드 컴포넌트)
├── GOOGLE_APPS_SCRIPT_SETUP_GUIDE.md
├── GOOGLE_SHEETS_DATABASE_SETUP.md
├── GEMINI_API_SETUP_GUIDE.md
├── ENV_SETUP_GUIDE.md
└── TEST_SYSTEM_GUIDE.md
```

## 📈 성능 지표

- **처리 시간**: 5-10분 (AI 분석 포함)
- **이메일 발송**: 자동 (신청자 + 관리자)
- **데이터 저장**: Google Sheets 자동 저장
- **오류 복구**: 완벽한 폴백 시스템

## 🛠️ 유지보수

### 일일 점검
- 시스템 상태 확인
- 새 진단 신청 처리 확인
- 이메일 발송 상태 확인

### 주간 점검
- Google Sheets 데이터 백업
- Gemini API 사용량 확인
- 성능 지표 리뷰

### 월간 점검
- 전체 시스템 성능 분석
- 사용자 피드백 수집
- 개선사항 도출

## 🚨 문제 해결

### 자주 발생하는 오류

1. **"Google Apps Script URL 미설정"**
   - `.env.local` 파일의 `GOOGLE_SCRIPT_URL` 확인

2. **"권한 거부" 오류**
   - Google Apps Script에서 권한 재승인

3. **"Gemini API 오류"**
   - API 키 유효성 및 사용량 한도 확인

4. **"Sheet 접근 오류"**
   - Sheet ID 정확성 및 공유 권한 확인

## 🎉 완료!

모든 설정이 완료되면:
1. `npm run dev`로 개발 서버 시작
2. `http://localhost:3000/diagnosis` 접속
3. 테스트 진단 신청 실행
4. 이메일 수신 확인

---

## 📞 지원

문제 발생 시:
1. 각 단계별 가이드 문서 참조
2. Google Apps Script 실행 기록 확인
3. Next.js 콘솔 로그 확인
4. TEST_SYSTEM_GUIDE.md의 문제 해결 섹션 참조

**🎯 이제 완전한 AI 역량진단 시스템이 준비되었습니다!**
