# AI CAMP Google Apps Script 간단 버전 설치 가이드

## 🚀 빠른 설치 (5분 완료)

### 1단계: 새 Google Apps Script 프로젝트 생성

1. **Google Apps Script 사이트 접속**
   - https://script.google.com 방문
   - Google 계정으로 로그인

2. **새 프로젝트 생성**
   - "새 프로젝트" 클릭
   - 프로젝트 이름: `AICAMP_무료진단_간단버전`

### 2단계: 코드 복사 붙여넣기

1. **기본 코드 삭제**
   - `Code.gs` 파일의 기본 내용 모두 삭제

2. **새 코드 복사**
   - `docs/google_apps_script_SIMPLE_WORKING_VERSION.js` 파일 내용 전체 복사
   - `Code.gs`에 붙여넣기

### 3단계: 기본 설정 확인

**코드 상단의 설정값들 확인:**
```javascript
const SPREADSHEET_ID = '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0';
const ADMIN_EMAIL = 'hongik423@gmail.com';
const COMPANY_NAME = 'AI CAMP';
const CONSULTANT_NAME = '이후경 교장';
```

### 4단계: 권한 승인

1. **스크립트 저장**
   - `Ctrl + S` 또는 저장 버튼 클릭

2. **테스트 실행**
   - 함수 선택: `testSystemStatus`
   - "실행" 버튼 클릭

3. **권한 승인**
   - "권한 검토" 팝업에서 "권한 허용" 클릭
   - Google Sheets, Gmail 권한 모두 승인

### 5단계: 웹앱 배포

1. **배포 설정**
   - 오른쪽 상단 "배포" → "새 배포" 클릭
   - 유형: "웹 앱" 선택

2. **배포 옵션**
   - 설명: `AICAMP 무료진단 처리 시스템`
   - 다음 사용자로 실행: `나`
   - 액세스 권한: `모든 사용자`

3. **배포 실행**
   - "배포" 버튼 클릭
   - **웹 앱 URL 복사** (중요!)

### 6단계: 즉시 테스트

**Google Apps Script 에디터에서 직접 테스트:**

1. **시스템 상태 점검**
   ```javascript
   // 함수 선택: testSystemStatus
   // 실행 버튼 클릭
   ```

2. **진단 신청 테스트**
   ```javascript
   // 함수 선택: testDiagnosisSubmission
   // 실행 버튼 클릭
   ```

3. **로그 확인**
   - 하단 "실행 로그" 탭에서 결과 확인
   - ✅ 성공 메시지들 확인

## 🎯 즉시 확인 방법

### 1. 구글시트 확인
- 스프레드시트 ID: `1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0`
- 직접 링크: https://docs.google.com/spreadsheets/d/1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0
- 새로운 시트들이 자동 생성되었는지 확인

### 2. 이메일 확인  
- `hongik423@gmail.com`에서 테스트 메일 수신 확인
- 제목: `[AI CAMP] 새로운 AI 무료진단 접수 - 테스트회사`

## 🔧 웹사이트 연결

### 웹사이트 코드 수정 필요

**현재 웹사이트에서 새 Google Apps Script URL로 변경:**

```javascript
// 기존 URL 대신 새 웹앱 URL 사용
const GOOGLE_SCRIPT_URL = '새로_배포한_웹앱_URL';

// 예시:
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_NEW_DEPLOYMENT_ID/exec';
```

## 🧪 문제 해결

### 권한 오류가 발생하면:
1. Google Apps Script 에디터에서 다시 권한 승인
2. Gmail, Google Sheets 권한 모두 확인

### 이메일이 안 오면:
1. `testSystemStatus()` 함수로 Gmail 권한 확인
2. 관리자 이메일 주소 재확인

### 시트에 데이터가 안 들어가면:
1. SPREADSHEET_ID 확인
2. 시트 접근 권한 확인
3. `testDiagnosisSubmission()` 함수로 직접 테스트

## ✅ 성공 확인 체크리스트

- [ ] Google Apps Script 프로젝트 생성 완료
- [ ] 코드 복사/붙여넣기 완료  
- [ ] 권한 승인 완료 (Gmail + Sheets)
- [ ] 웹앱 배포 완료
- [ ] 웹앱 URL 복사 완료
- [ ] 테스트 함수 정상 실행
- [ ] 구글시트에 테스트 데이터 생성 확인
- [ ] 관리자 이메일 수신 확인

## 🎯 이전 3800줄 버전과의 차이점

| 항목 | 이전 버전 | 새 버전 |
|------|----------|---------|
| 코드 길이 | 3800줄 | 약 500줄 |
| 복잡성 | 매우 복잡 | 간단명료 |
| 핵심기능 | 동일 | 동일 |
| 안정성 | 불안정 | 안정적 |
| 유지보수 | 어려움 | 쉬움 |

**결론: 복잡한 기능은 제거하고 핵심만 남겨서 확실하게 작동하도록 개선** 