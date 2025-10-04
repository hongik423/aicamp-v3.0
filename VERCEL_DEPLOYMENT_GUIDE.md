# 🚀 AICAMP AI 역량진단 시스템 - aicamp.club 배포 가이드

## 📋 배포 개요
- **도메인**: aicamp.club
- **플랫폼**: Vercel
- **품질**: 100점 완벽한 시스템
- **기능**: AI 역량진단, GEMINI 2.5 Flash, 완벽한 품질 모니터링

## 🔧 1단계: 필수 환경변수 설정

Vercel 대시보드에서 다음 환경변수들을 설정해야 합니다:

### 🤖 GEMINI AI 설정
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```
- Google AI Studio에서 발급
- https://makersuite.google.com/app/apikey

### 📊 Google Apps Script 설정
```bash
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/your_script_id/exec
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@your_project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----"
GOOGLE_SHEETS_ID=your_google_sheets_id_here
```

### 📧 이메일 설정 (SMTP)
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_here
```

### 🌐 애플리케이션 설정
```bash
NEXT_PUBLIC_APP_URL=https://aicamp.club
NEXT_PUBLIC_API_URL=https://aicamp.club/api
NODE_ENV=production
NEXT_PUBLIC_ENV=production
```

## 🚀 2단계: Vercel CLI를 통한 배포

### 사전 준비
```bash
# Vercel CLI 설치 (글로벌)
npm install -g vercel

# Vercel 로그인
vercel login
```

### 배포 실행
```bash
# 프로덕션 빌드 테스트
npm run build

# Vercel 프로덕션 배포
vercel --prod
```

### PowerShell 스크립트 사용
```powershell
# 자동 배포 스크립트 실행
.\deploy-production.ps1
```

## 🌐 3단계: 도메인 설정

### aicamp.club 도메인 연결
1. Vercel 대시보드 → 프로젝트 → Settings → Domains
2. `aicamp.club` 추가
3. DNS 설정:
   - A 레코드: `76.76.19.61` (Vercel IP)
   - 또는 CNAME: `cname.vercel-dns.com`

### SSL 인증서
- Vercel이 자동으로 Let's Encrypt SSL 인증서 발급
- HTTPS 자동 리다이렉트 설정

## 🧪 4단계: 배포 후 테스트

### 기본 접근성 테스트
```bash
curl -X GET https://aicamp.club/api/health
```

### AI 역량진단 기능 테스트
```bash
curl -X POST https://aicamp.club/api/ai-diagnosis \
  -H "Content-Type: application/json" \
  -d '{
    "contactName": "테스트",
    "contactEmail": "test@aicamp.club",
    "companyName": "테스트기업",
    "industry": "IT/소프트웨어",
    "assessmentResponses": [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
  }'
```

### 품질 점수 확인
응답에서 다음 항목들을 확인:
- `qualityScore: 100` (완벽한 품질)
- `perfectQuality: true`
- `validationResults: [...]` (모든 검증 통과)

## 📊 5단계: 모니터링 및 관리

### 성능 모니터링
- Vercel Analytics 활성화
- 응답 시간 모니터링 (< 2초 목표)
- 오류율 모니터링 (< 1% 목표)

### 로그 확인
```bash
# Vercel 로그 확인
vercel logs

# 실시간 로그
vercel logs --follow
```

### 환경별 배포
```bash
# 프리뷰 배포 (개발/테스트용)
vercel

# 프로덕션 배포
vercel --prod
```

## 🔒 6단계: 보안 설정

### 환경변수 보안
- 모든 민감한 정보는 Vercel 환경변수로 관리
- `.env.local` 파일은 `.gitignore`에 포함
- API 키는 정기적으로 로테이션

### CORS 설정
- API 엔드포인트에 적절한 CORS 헤더 설정
- 필요한 도메인만 허용

## 🎯 7단계: 품질 보증

### 완벽한 품질 시스템 확인
- 품질 점수: **100점** 달성
- 모든 검증 단계 통과
- 실시간 품질 모니터링 활성화

### 기능 검증 체크리스트
- [ ] 웹사이트 접근 (https://aicamp.club)
- [ ] AI 역량진단 폼 제출
- [ ] GEMINI 2.5 Flash API 연동
- [ ] 이메일 발송 기능
- [ ] Google Apps Script 연동
- [ ] HTML 보고서 생성
- [ ] 품질 점수 100점 달성

## 🚨 문제 해결

### 일반적인 문제들

1. **빌드 실패**
   ```bash
   # 의존성 재설치
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **환경변수 오류**
   - Vercel 대시보드에서 환경변수 확인
   - 특수문자 이스케이프 처리 확인

3. **도메인 연결 문제**
   - DNS 설정 확인 (최대 24시간 소요)
   - SSL 인증서 발급 대기 (최대 1시간)

4. **API 타임아웃**
   - `vercel.json`에서 `maxDuration: 800` 설정 확인
   - 복잡한 AI 분석은 시간이 소요될 수 있음

## 📞 지원

문제 발생 시:
1. Vercel 로그 확인
2. 개발자 도구 콘솔 확인  
3. 환경변수 설정 재확인
4. 필요시 이후경 교장에게 문의

---

**🎉 AICAMP AI 역량진단 시스템 - 완벽한 품질 100점으로 aicamp.club에서 서비스 중!**
