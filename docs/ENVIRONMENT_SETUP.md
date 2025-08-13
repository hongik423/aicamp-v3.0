# 🔧 AICAMP 환경변수 설정 가이드

## 📋 필수 환경변수

### 1. Next.js 환경변수 (.env.local)

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# Google Apps Script 웹앱 URL (필수)
NEXT_PUBLIC_GAS_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"

# 사이트 정보
NEXT_PUBLIC_SITE_URL="https://aicamp.club"
NEXT_PUBLIC_ADMIN_EMAIL="admin@aicamp.club"

# 개발 모드 설정
NODE_ENV="development"
```

### 2. Google Apps Script 환경변수

Google Apps Script > 프로젝트 설정 > 스크립트 속성에서 설정:

```
SPREADSHEET_ID: "YOUR_GOOGLE_SHEETS_ID"
GEMINI_API_KEY: "YOUR_GEMINI_API_KEY"
ADMIN_EMAIL: "admin@aicamp.club"
```

## 🚀 설정 단계별 가이드

### Step 1: Google Apps Script 설정

1. **Google Apps Script 프로젝트 생성**
   - https://script.google.com 접속
   - 새 프로젝트 생성
   - `docs/modules/google_apps_script_enhanced_V11.0.js` 코드 붙여넣기

2. **웹앱으로 배포**
   - 배포 > 새 배포
   - 유형: 웹앱
   - 실행 대상: 나
   - 액세스 권한: 모든 사용자
   - 배포 후 웹앱 URL 복사

3. **스크립트 속성 설정**
   ```
   SPREADSHEET_ID: Google Sheets ID (스프레드시트 URL에서 추출)
   GEMINI_API_KEY: Google AI Studio에서 발급받은 API 키
   ADMIN_EMAIL: admin@aicamp.club
   ```

### Step 2: Google Sheets 설정

1. **새 스프레드시트 생성**
   - Google Sheets에서 새 시트 생성
   - 시트 ID를 복사 (URL에서 `/d/` 다음 부분)

2. **권한 설정**
   - 공유 > 링크 액세스: 편집자
   - 또는 Google Apps Script 계정에 편집 권한 부여

### Step 3: Gemini API 설정

1. **Google AI Studio 접속**
   - https://aistudio.google.com 접속
   - API 키 생성
   - 모델: gemini-2.5-flash 선택

2. **API 키 설정**
   - 생성된 API 키를 GAS 스크립트 속성에 추가
   - 보안을 위해 키를 안전하게 보관

### Step 4: Next.js 환경변수 설정

1. **프로젝트 루트에 .env.local 파일 생성**
   ```bash
   # Step 1에서 복사한 GAS 웹앱 URL
   NEXT_PUBLIC_GAS_URL="https://script.google.com/macros/s/AKfycbx.../exec"
   
   # 사이트 정보
   NEXT_PUBLIC_SITE_URL="https://aicamp.club"
   NEXT_PUBLIC_ADMIN_EMAIL="admin@aicamp.club"
   ```

2. **개발 서버 재시작**
   ```bash
   npm run dev
   ```

## ✅ 설정 확인

### 1. 환경변수 확인
```bash
# 개발자 콘솔에서 확인
console.log(process.env.NEXT_PUBLIC_GAS_URL);
```

### 2. API 테스트
```bash
# 테스트 스크립트 실행
node scripts/test-api-endpoint.js
```

### 3. 브라우저 테스트
- http://localhost:3000/ai-diagnosis 접속
- 테스트 데이터 입력 후 제출
- 결과 확인

## 🔧 문제 해결

### 1. GAS URL 오류
```
오류: GAS URL이 설정되지 않았습니다
해결: .env.local에 NEXT_PUBLIC_GAS_URL 확인
```

### 2. GEMINI API 오류
```
오류: GEMINI API 키가 유효하지 않습니다
해결: GAS 스크립트 속성에 GEMINI_API_KEY 재설정
```

### 3. 구글시트 권한 오류
```
오류: 스프레드시트에 액세스할 수 없습니다
해결: 시트 공유 설정 또는 SPREADSHEET_ID 확인
```

## 🚀 배포 환경 설정

### Vercel 환경변수
```
NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/.../exec
NEXT_PUBLIC_SITE_URL=https://aicamp.club
NEXT_PUBLIC_ADMIN_EMAIL=admin@aicamp.club
```

### 도메인 설정
- Vercel 프로젝트 설정 > Domains
- aicamp.club 도메인 연결
- DNS 설정 확인

---

## 📞 지원

설정 중 문제가 발생하면:
- 이메일: admin@aicamp.club
- 설정 완료 후 테스트 스크립트로 검증 필수
