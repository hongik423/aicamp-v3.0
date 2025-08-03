# AICAMP AI 경영진단 시스템 - Vercel 배포 가이드

## ✅ 완료된 작업

1. **API 라우트 구조 생성** ✓
   - `/api/aicamp` 엔드포인트 생성
   - 모든 핸들러 및 서비스 파일 구성 완료

2. **Google Apps Script → TypeScript 변환** ✓
   - 무료 진단, 상담, 피드백 기능 구현
   - AI 분석 및 점수 계산 로직 포팅

3. **필수 패키지 설치** ✓
   ```bash
   npm install googleapis nodemailer uuid
   npm install --save-dev @types/nodemailer
   ```

4. **빌드 성공** ✓
   ```bash
   npm run build
   ```

## 🚀 배포 단계

### 1. 환경변수 설정 (필수)

`.env.local.example` 파일을 `.env.local`로 복사하고 실제 값 입력:

```bash
cp .env.local.example .env.local
```

필요한 값들:
- **Google Service Account**: Google Cloud Console에서 생성
- **Gmail 앱 비밀번호**: Google 계정 설정에서 생성
- **GEMINI API Key**: 이미 설정됨 (AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM)

### 2. Vercel 배포 명령

#### 옵션 1: Vercel CLI 사용
```bash
npx vercel
```

#### 옵션 2: Git 푸시 (Vercel과 연동된 경우)
```bash
git add .
git commit -m "feat: AICAMP API 추가 - Google Apps Script를 Next.js API로 변환"
git push origin main
```

### 3. Vercel 대시보드에서 환경변수 설정

1. https://vercel.com 로그인
2. 프로젝트 선택
3. Settings → Environment Variables
4. 다음 변수들 추가:

```env
GOOGLE_SPREADSHEET_ID=1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0
GOOGLE_SERVICE_ACCOUNT_EMAIL=[서비스 계정 이메일]
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=[서비스 계정 Private Key]
GEMINI_API_KEY=AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM
EMAIL_USER=[Gmail 주소]
EMAIL_APP_PASSWORD=[Gmail 앱 비밀번호]
ADMIN_EMAIL=hongik423@gmail.com
```

## 📡 API 테스트

배포 후 테스트:

```bash
# 상태 확인
curl https://[your-domain].vercel.app/api/aicamp

# 진단 신청 테스트
curl -X POST https://[your-domain].vercel.app/api/aicamp \
  -H "Content-Type: application/json" \
  -d '{
    "action": "submitFreeDiagnosis",
    "data": {
      "companyName": "테스트기업",
      "industry": "IT/소프트웨어",
      "contactManager": "홍길동",
      "email": "test@example.com",
      "phone": "010-1234-5678",
      "privacyConsent": true
    }
  }'
```

## 🔍 모니터링

Vercel 대시보드에서 확인:
- Functions 탭: API 호출 로그
- Analytics: 성능 메트릭
- Logs: 실시간 로그 스트리밍

## 🛠️ 문제 해결

### Google Sheets 연결 오류
1. 서비스 계정이 스프레드시트에 공유되었는지 확인
2. Google Sheets API가 활성화되었는지 확인

### 이메일 발송 오류
1. Gmail 2단계 인증 활성화 확인
2. 앱 비밀번호 정확성 확인

### CORS 오류
- 이미 처리됨 (`Access-Control-Allow-Origin: *`)

## 📚 API 문서

- **메인 엔드포인트**: `/api/aicamp`
- **지원 메서드**: GET, POST, OPTIONS
- **응답 형식**: JSON

자세한 내용은 `/docs/AICAMP_VERCEL_DEPLOYMENT_GUIDE.md` 참조