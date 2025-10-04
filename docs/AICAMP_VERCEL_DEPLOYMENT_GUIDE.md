# AICAMP AI 경영진단 시스템 - Vercel 배포 가이드

## 📋 개요

Google Apps Script로 작성된 AICAMP AI 경영진단 시스템을 Next.js로 변환하여 Vercel에 배포하는 가이드입니다.

## 🚀 배포 전 준비사항

### 1. 필요한 패키지 설치

```bash
npm install googleapis nodemailer uuid zod
npm install --save-dev @types/nodemailer
```

### 2. Google Cloud 설정

#### 2.1 서비스 계정 생성
1. [Google Cloud Console](https://console.cloud.google.com) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. APIs & Services > Credentials로 이동
4. "Create Credentials" > "Service Account" 선택
5. 서비스 계정 생성 후 JSON 키 다운로드

#### 2.2 Google Sheets API 활성화
1. APIs & Services > Library로 이동
2. "Google Sheets API" 검색 및 활성화

#### 2.3 Google Sheets 권한 설정
1. 대상 Google Sheets 열기
2. 공유 > 서비스 계정 이메일 추가 (편집자 권한)

### 3. Gmail 앱 비밀번호 생성
1. Google 계정 설정 > 보안으로 이동
2. 2단계 인증 활성화
3. 앱 비밀번호 생성 (메일 선택)

## 🔧 환경변수 설정

### Vercel 환경변수 (Settings > Environment Variables)

```env
# Google Sheets 설정
GOOGLE_SPREADSHEET_ID=1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0
GOOGLE_SHEETS_URL=https://docs.google.com/spreadsheets/d/1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0/edit

# Google Service Account
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"

# GEMINI API
GEMINI_API_KEY=AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM

# Email 설정
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-16-char-app-password

# 관리자 이메일
ADMIN_EMAIL=hongik423@gmail.com
```

## 📁 프로젝트 구조

```
src/app/api/aicamp/
├── route.ts                    # 메인 API 라우트
├── handlers/
│   ├── freeDiagnosis.ts       # 무료 진단 처리
│   ├── consultation.ts        # 상담 신청 처리
│   ├── betaFeedback.ts       # 베타 피드백 처리
│   └── diagnosis.ts          # 진단 처리
├── services/
│   ├── googleSheets.ts       # Google Sheets 연동
│   ├── geminiApi.ts          # GEMINI AI API
│   └── emailService.ts       # 이메일 서비스
└── utils/
    └── scoreCalculations.ts   # 점수 계산 유틸리티
```

## 🌐 API 엔드포인트

### 기본 엔드포인트
- `GET /api/aicamp` - 시스템 상태 확인
- `POST /api/aicamp` - 메인 요청 처리
- `OPTIONS /api/aicamp` - CORS preflight

### POST 요청 액션
```json
{
  "action": "submitFreeDiagnosis",
  "data": { /* 진단 데이터 */ }
}
```

### 지원되는 액션
- `submitFreeDiagnosis` - 무료 AI 진단 신청
- `getDiagnosisResult` - 진단 결과 조회
- `submitConsultation` - 상담 신청
- `submitBetaFeedback` - 베타 피드백 제출
- `checkSheetStructure` - Google Sheets 구조 확인
- `initializeSheets` - 시트 초기화
- `getLatestDiagnosisData` - 최신 진단 데이터 조회

## 🚀 Vercel 배포

### 1. Vercel CLI 설치 (선택사항)
```bash
npm i -g vercel
```

### 2. 배포 명령
```bash
# Vercel CLI 사용
vercel

# 또는 Git 연동
git push origin main
```

### 3. 배포 설정
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

## 🧪 테스트

### 로컬 테스트
```bash
npm run dev
# http://localhost:3000/api/aicamp
```

### API 테스트 (cURL)
```bash
# 상태 확인
curl https://your-domain.vercel.app/api/aicamp

# 진단 신청
curl -X POST https://your-domain.vercel.app/api/aicamp \
  -H "Content-Type: application/json" \
  -d '{
    "action": "submitFreeDiagnosis",
    "data": {
      "companyName": "테스트기업",
      "industry": "IT/소프트웨어",
      "contactManager": "홍길동",
      "email": "test@example.com"
    }
  }'
```

## 🔒 보안 고려사항

1. **API 키 보호**
   - 모든 민감한 정보는 환경변수로 관리
   - 클라이언트 코드에 API 키 노출 금지

2. **CORS 설정**
   - 필요한 도메인만 허용하도록 수정
   ```typescript
   const corsHeaders = {
     'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || '*',
     // ...
   };
   ```

3. **Rate Limiting**
   - Vercel의 기본 제한 외 추가 구현 고려
   ```typescript
   import rateLimit from 'express-rate-limit';
   ```

4. **입력 검증**
   - zod를 사용한 스키마 검증 강화
   ```typescript
   const diagnosisSchema = z.object({
     companyName: z.string().min(1).max(100),
     email: z.string().email(),
     // ...
   });
   ```

## 📈 모니터링

### Vercel Analytics
- 프로젝트 설정에서 Analytics 활성화
- 실시간 트래픽 및 성능 모니터링

### 로깅
- Vercel Functions 로그 확인
- `console.log()` 출력은 Vercel 대시보드에서 확인 가능

## 🛠️ 트러블슈팅

### 1. Google Sheets 연결 오류
- 서비스 계정 권한 확인
- Sheets API 활성화 여부 확인
- 스프레드시트 공유 설정 확인

### 2. 이메일 발송 실패
- Gmail 앱 비밀번호 확인
- 보안 설정 확인 (덜 안전한 앱 액세스)

### 3. GEMINI API 오류
- API 키 유효성 확인
- API 할당량 확인

### 4. CORS 오류
- OPTIONS 핸들러 구현 확인
- 헤더 설정 확인

## 📚 참고 자료

- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Vercel Documentation](https://vercel.com/docs)
- [GEMINI API](https://ai.google.dev/)