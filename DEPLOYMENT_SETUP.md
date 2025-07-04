# 🚀 AICAMP v3.0 배포 설정 가이드

## 📋 필수 환경변수 설정

### 로컬 개발 환경 (.env.local)
```env
# 🌐 기본 URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# 🤖 AI API 키 (Gemini)
GEMINI_API_KEY=your_gemini_api_key_here

# 📊 Google Sheets 연동
NEXT_PUBLIC_GOOGLE_SHEETS_ID=your_google_sheets_id
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=your_google_apps_script_url

# 🔧 개발 모드 (선택사항)
NODE_ENV=development
```

### Vercel 프로덕션 환경
```env
# 🌐 프로덕션 URL
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app

# 🤖 AI API 키 (Gemini)
GEMINI_API_KEY=your_production_gemini_api_key

# 📊 Google Sheets 연동
NEXT_PUBLIC_GOOGLE_SHEETS_ID=your_google_sheets_id
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=your_google_apps_script_url

# 🔧 프로덕션 모드
NODE_ENV=production
```

## 🔑 API 키 발급 방법

### 1. Google Gemini API 키
1. [Google AI Studio](https://makersuite.google.com/app/apikey) 접속
2. "Create API key" 클릭
3. 프로젝트 선택 또는 새로 생성
4. API 키 복사 및 환경변수에 설정

### 2. Google Sheets 설정
1. [Google Sheets](https://sheets.google.com)에서 새 시트 생성
2. 시트 URL에서 ID 추출: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
3. Google Apps Script 설정 (별도 문서 참조)

## 🌐 도메인 설정 (선택사항)

### Vercel 커스텀 도메인
1. Vercel 프로젝트 대시보드 → "Settings" → "Domains"
2. 커스텀 도메인 추가
3. DNS 설정 (A 레코드 또는 CNAME)
4. 환경변수 `NEXT_PUBLIC_BASE_URL` 업데이트

## 📱 PWA 설정

PWA 기능이 자동으로 활성화됩니다:
- 📲 모바일 설치 프롬프트
- 🔄 오프라인 캐싱
- ⚡ 빠른 로딩

## 🔒 보안 체크리스트

- [ ] API 키들이 `.env.local`에만 저장되고 Git에 커밋되지 않음
- [ ] 프로덕션 환경변수가 Vercel에 안전하게 설정됨
- [ ] Google Apps Script 권한이 적절히 설정됨
- [ ] CORS 설정이 올바름

## 🚀 배포 명령어

```bash
# 로컬 빌드 테스트
npm run build
npm start

# Vercel CLI 배포 (선택사항)
npm i -g vercel
vercel login
vercel --prod
```

## 📊 모니터링

### Vercel Analytics
- 자동으로 활성화됨
- 성능 및 사용자 분석 제공

### Error Tracking
- Next.js 기본 에러 바운더리
- 브라우저 콘솔에서 에러 확인

## 🆘 문제 해결

### 일반적인 문제들

1. **환경변수 인식 안됨**
   - `.env.local` 파일 위치 확인 (프로젝트 루트)
   - Vercel 환경변수 설정 확인
   - 브라우저 캐시 클리어

2. **빌드 실패**
   - `npm run build` 로컬에서 테스트
   - TypeScript 오류 확인
   - 의존성 버전 확인

3. **PWA 작동 안함**
   - HTTPS 환경에서만 작동
   - 브라우저 개발자 도구 → Application → Service Workers 확인

## 📞 지원

배포 관련 문제가 있으시면:
- 📧 이메일: aicamp@example.com
- 💬 GitHub Issues: 리포지토리에서 이슈 생성
- 📖 문서: [Vercel 공식 문서](https://vercel.com/docs)

---

✨ **배포 성공을 축하합니다!** ✨ 