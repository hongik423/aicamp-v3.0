# 🚀 Google Apps Script V17.0 NO-AI 배포 가이드

## 🚨 긴급 상황
현재 Gemini API 키 오류가 발생하고 있습니다. AI 분석을 완전히 제거하고 오프라인 처리 방식으로 전환해야 합니다.

## 📋 문제 상황
```
Error: AI 분석 실패: API 오류 (400): API Key not found. Please pass a valid API key.
```

## 🎯 해결 방안
AI 분석 관련 코드를 완전히 제거하고 오프라인 처리 방식으로만 동작하도록 수정

---

## 🔧 단계별 배포 가이드

### 1단계: Google Apps Script 편집기 접속
1. 브라우저에서 [Google Apps Script](https://script.google.com/) 접속
2. Google 계정으로 로그인
3. AICAMP 프로젝트 선택 (기존 프로젝트가 있다면)

### 2단계: 새 프로젝트 생성 (기존 프로젝트가 없다면)
1. "새 프로젝트" 클릭
2. 프로젝트명을 "AICAMP_V17_NO_AI"로 설정
3. `Code.gs` 파일이 기본으로 생성됨

### 3단계: 기존 코드 완전 제거
1. `Code.gs` 파일의 모든 내용 선택 (Ctrl+A)
2. 삭제 (Delete)

### 4단계: V17.0 NO-AI 코드 업로드
1. `docs/250821_aicamp_simplified_v17.js` 파일 열기
2. 전체 내용 복사 (Ctrl+A, Ctrl+C)
3. Google Apps Script `Code.gs`에 붙여넣기 (Ctrl+V)
4. 저장 (Ctrl+S)

### 5단계: 환경변수 설정
1. Google Apps Script 편집기에서 "설정" (⚙️) 클릭
2. "스크립트 속성" 탭 선택
3. 다음 환경변수들을 추가:

#### 🔑 필수 환경변수
```
SPREADSHEET_ID = 1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ
ADMIN_EMAIL = hongik423@gmail.com
AICAMP_WEBSITE = aicamp.club
```

#### 🎛️ 선택적 환경변수
```
DEBUG_MODE = false
ENVIRONMENT = production
SYSTEM_VERSION = V17.0-SIMPLIFIED-NO-AI
```

### 6단계: 웹앱 배포
1. "배포" → "새 배포" 클릭
2. 설정:
   - **유형**: 웹 앱
   - **설명**: "V17.0-SIMPLIFIED-NO-AI - AI 분석 완전 제거"
   - **실행 대상**: 나
   - **액세스 권한**: 모든 사용자
3. "배포" 클릭
4. 권한 승인 과정 진행
5. **웹앱 URL 복사** (중요!)

### 7단계: 환경변수 업데이트
`.env.local` 파일에서:
```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=새로_복사한_웹앱_URL
```

---

## ✅ 검증 체크리스트

### 배포 전 확인사항
- [ ] 기존 코드 완전 제거
- [ ] V17.0 NO-AI 코드 업로드 완료
- [ ] 환경변수 설정 완료
- [ ] 웹앱 배포 완료
- [ ] 웹앱 URL 복사

### 배포 후 확인사항
- [ ] "API Key not found" 오류 해결 확인
- [ ] 데이터 저장 정상 동작 확인
- [ ] 이메일 발송 정상 동작 확인
- [ ] 응답 시간 개선 확인

---

## 🧪 테스트 방법

### 1. Google Apps Script 직접 테스트
1. Google Apps Script 편집기에서 `doGet` 함수 실행
2. 예상 응답:
```json
{
  "success": true,
  "status": "operational",
  "version": "V17.0-SIMPLIFIED-NO-AI",
  "branding": "이교장의AI역량진단시스템",
  "processingMode": "offline_manual_analysis"
}
```

### 2. 웹앱 URL 직접 테스트
브라우저에서 웹앱 URL 접속하여 동일한 응답 확인

### 3. AI 진단 페이지 테스트
1. [AI 진단 페이지](https://aicamp.club/ai-diagnosis) 접속
2. 진단 폼 작성 및 제출
3. 오류 없이 정상 처리되는지 확인

---

## 📧 이메일 템플릿 (자동 적용)

### 신청자 접수확인 메일
```
제목: AICAMP | AI 역량진단 신청 접수확인 - [회사명]

내용:
안녕하세요, [담당자명]님!

[회사명]의 AI 역량진단 신청이 성공적으로 접수되었습니다.

📋 접수 정보:
- 진단 ID: [진단ID]
- 접수일시: [접수일시]
- 처리방식: 이교장 오프라인 분석

⏰ 발송 일정:
- 예상 발송: 24시간 내
- 보고서 형태: 맞춤형 PDF 보고서
- 담당자: 이교장 (직접 분석)

감사합니다.
이교장의AI역량진단시스템
```

### 관리자 알림 메일
```
제목: [신규] AI 역량진단 신청 접수 - [회사명]

내용:
새로운 AI 역량진단 신청이 접수되었습니다.

📊 신청 정보:
- 회사명: [회사명]
- 담당자: [담당자명]
- 이메일: [이메일]
- 진단 ID: [진단ID]

📈 점수 요약:
- 총점: [총점]/[만점]
- 등급: [등급]
- 성숙도: [성숙도]

🔍 처리 사항:
- 데이터 저장 완료
- 신청자 접수확인 메일 발송 완료
- 24시간 내 발송 안내 메일 발송 완료
- 이교장 오프라인 분석 필요

Google Sheets에서 상세 데이터를 확인하세요.
```

---

## 🚀 배포 완료 후

### 즉시 확인사항
1. **오류 해결**: "API Key not found" 오류가 더 이상 발생하지 않는지 확인
2. **데이터 저장**: Google Sheets에 데이터가 정상적으로 저장되는지 확인
3. **이메일 발송**: 신청자와 관리자에게 이메일이 정상적으로 발송되는지 확인
4. **응답 시간**: AI 분석 없이 빠른 응답이 가능한지 확인

### 시스템 특징
- ✅ AI 분석 완전 제거
- ✅ 오프라인 처리 방식
- ✅ 45문항 BARS 시스템
- ✅ 3개 시트 분리 저장
- ✅ 이메일 워크플로우 자동화
- ✅ 실시간 진행상황 모니터링

---

## 📞 지원

문제가 발생하면 즉시 연락주세요:
- 이메일: hongik423@gmail.com
- 시스템 버전: V17.0-SIMPLIFIED-NO-AI

---

**중요**: 이 수정으로 AI 분석 기능이 완전히 제거되고 오프라인 처리 방식으로만 동작합니다. 이교장이 직접 분석하여 24시간 내에 보고서를 발송하는 방식으로 변경됩니다.
