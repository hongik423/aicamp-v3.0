# 🚀 AICAMP V13.0 ULTIMATE - Vercel 환경변수 설정 가이드

## 📋 개요

AICAMP V13.0 ULTIMATE 시스템을 Vercel에 배포하기 위한 완전한 환경변수 설정 가이드입니다.

## 🎯 필수 환경변수 목록

### 🔗 Google Apps Script 연동
| 변수명 | 값 | 설명 |
|--------|----|----|
| `GOOGLE_APPS_SCRIPT_URL` | `https://script.google.com/.../exec` | GAS 웹앱 URL |
| `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL` | `https://script.google.com/.../exec` | 클라이언트용 GAS URL |

### 🤖 GEMINI AI 설정
| 변수명 | 값 | 설명 |
|--------|----|----|
| `GEMINI_API_KEY` | `AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM` | GEMINI API 키 |
| `NEXT_PUBLIC_GEMINI_API_KEY` | `AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM` | 클라이언트용 GEMINI API 키 |

### 👤 관리자 설정
| 변수명 | 값 | 설명 |
|--------|----|----|
| `ADMIN_EMAIL` | `hongik423@gmail.com` | 관리자 이메일 |
| `AICAMP_WEBSITE` | `aicamp.club` | 공식 도메인 |

### 🔧 시스템 설정
| 변수명 | 값 | 환경 | 설명 |
|--------|----|----|-----|
| `DEBUG_MODE` | `false` | Production만 | 디버그 모드 |
| `ENVIRONMENT` | `production` | Production만 | 환경 설정 |

## 📱 방법 1: Vercel 대시보드에서 설정

### 1단계: Vercel 대시보드 접속
1. https://vercel.com/dashboard 접속
2. AICAMP 프로젝트 선택
3. **Settings** 탭 클릭
4. **Environment Variables** 선택

### 2단계: 환경변수 추가
각 환경변수를 다음과 같이 추가:

#### 🔗 Google Apps Script URL
```
Name: GOOGLE_APPS_SCRIPT_URL
Value: https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
Environment: ✅ Production ✅ Preview ✅ Development
```

#### 🤖 GEMINI API Key
```
Name: GEMINI_API_KEY
Value: AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM
Environment: ✅ Production ✅ Preview ✅ Development
```

#### 👤 관리자 이메일
```
Name: ADMIN_EMAIL
Value: hongik423@gmail.com
Environment: ✅ Production ✅ Preview ✅ Development
```

### 3단계: 저장 및 재배포
- **Save** 버튼 클릭
- **Redeploy** 실행하여 환경변수 적용

## 💻 방법 2: Vercel CLI 사용

### 사전 준비
```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 연결
vercel link
```

### PowerShell 스크립트 실행 (Windows)
```powershell
# 실행 권한 설정
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# 스크립트 실행
.\scripts\setup-vercel-env.ps1
```

### Bash 스크립트 실행 (Mac/Linux)
```bash
# 실행 권한 설정
chmod +x scripts/setup-vercel-env.sh

# 스크립트 실행
./scripts/setup-vercel-env.sh
```

### 수동 CLI 설정
```bash
# Google Apps Script URL 설정
vercel env add GOOGLE_APPS_SCRIPT_URL production
# 입력: https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec

vercel env add NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL production
# 입력: https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec

# GEMINI API Key 설정
vercel env add GEMINI_API_KEY production
# 입력: AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM

vercel env add NEXT_PUBLIC_GEMINI_API_KEY production
# 입력: AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM

# 관리자 설정
vercel env add ADMIN_EMAIL production
# 입력: hongik423@gmail.com

vercel env add AICAMP_WEBSITE production
# 입력: aicamp.club

# 시스템 설정
vercel env add DEBUG_MODE production
# 입력: false

vercel env add ENVIRONMENT production
# 입력: production
```

## 🔍 환경변수 확인

### Vercel CLI로 확인
```bash
# 모든 환경변수 목록 보기
vercel env ls

# 특정 환경변수 값 확인
vercel env get GOOGLE_APPS_SCRIPT_URL production
```

### 대시보드에서 확인
1. Vercel 대시보드 → Settings → Environment Variables
2. 설정된 모든 환경변수 확인
3. 값이 올바른지 검증

## ⚠️ 중요 사항

### 🔒 보안 주의사항
- **GEMINI_API_KEY**는 민감한 정보이므로 공개하지 마세요
- **NEXT_PUBLIC_** 접두사가 있는 변수는 클라이언트에 노출됩니다
- 프로덕션과 개발 환경을 구분하여 설정하세요

### 🚀 배포 후 확인사항
1. **환경변수 적용 확인**
   ```bash
   vercel logs --follow
   ```

2. **API 연동 테스트**
   - AI역량진단 페이지 접속
   - 테스트 진단 실행
   - 이메일 발송 확인

3. **Google Apps Script 연동 확인**
   - GAS 로그 확인
   - 데이터 저장 확인

## 🔧 문제 해결

### 환경변수가 적용되지 않는 경우
```bash
# 1. 환경변수 재설정
vercel env rm GOOGLE_APPS_SCRIPT_URL production
vercel env add GOOGLE_APPS_SCRIPT_URL production

# 2. 강제 재배포
vercel --prod --force
```

### API 호출 실패 시
1. **환경변수 값 확인**
   - Google Apps Script URL 형식 검증
   - GEMINI API Key 유효성 확인

2. **네트워크 연결 확인**
   - Vercel 함수에서 외부 API 접근 가능 여부
   - CORS 설정 확인

3. **로그 확인**
   ```bash
   vercel logs --follow
   ```

## 📊 환경별 설정 권장사항

### Production 환경
- 모든 환경변수 설정 필수
- `DEBUG_MODE=false` 설정
- `ENVIRONMENT=production` 설정
- 실제 도메인 사용

### Preview 환경 (Staging)
- Production과 동일한 설정
- 테스트용 Google Sheets 사용 가능
- 디버그 모드 활성화 가능

### Development 환경
- 로컬 개발용 설정
- `DEBUG_MODE=true` 가능
- 테스트 API 키 사용 권장

## ✅ 설정 완료 체크리스트

- [ ] Google Apps Script 웹앱 배포 완료
- [ ] Vercel 환경변수 8개 모두 설정
- [ ] 환경변수 값 정확성 확인
- [ ] Vercel 재배포 실행
- [ ] AI역량진단 테스트 성공
- [ ] 이메일 발송 정상 작동
- [ ] Google Sheets 데이터 저장 확인
- [ ] HTML 보고서 생성 확인

## 🎉 완료!

모든 환경변수가 올바르게 설정되면 **AICAMP V13.0 ULTIMATE 시스템**이 완전히 작동합니다!

🚀 **최고 수준의 AI역량진단 서비스를 제공할 준비가 완료되었습니다!**
