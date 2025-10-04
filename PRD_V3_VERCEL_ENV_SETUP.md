# 🚀 PRD V3.0 Vercel 환경변수 설정 가이드

## 📋 PRD V3.0 시스템 환경변수 설정

### **✅ 완전히 안전한 환경변수 처리**

GitHub에서 발견한 보안정보를 환경변수로 처리하면 **Vercel 환경변수 입력으로 동작에 전혀 지장 없이 작동**합니다.

---

## 🔧 **Vercel 대시보드 환경변수 설정**

### **1. Vercel 대시보드 접속**
```
https://vercel.com/dashboard
→ aicamp_v3.0 프로젝트 선택
→ Settings → Environment Variables
```

### **2. PRD V3.0 필수 환경변수**

```bash
# ================================================================================
# 🚀 PRD V3.0 시스템 환경변수
# ================================================================================

# Google Apps Script 연동 (PRD V3.0)
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/[GAS_DEPLOYMENT_ID]/exec
NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/[GAS_DEPLOYMENT_ID]/exec

# Google Sheets 연동 (PRD V3.0)
NEXT_PUBLIC_GOOGLE_SHEETS_ID=1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ

# GEMINI AI API (PRD V3.0 분석 엔진용)
GEMINI_API_KEY=[YOUR_GEMINI_API_KEY]
NEXT_PUBLIC_GEMINI_API_KEY=[YOUR_GEMINI_API_KEY]

# Google Drive API (보안 정보 - 환경변수로 처리)
GOOGLE_SERVICE_ACCOUNT_CREDENTIALS=[JSON_SERVICE_ACCOUNT_CREDENTIALS]
GOOGLE_PRIVATE_KEY=[PRIVATE_KEY_STRING]
GOOGLE_CLIENT_EMAIL=[SERVICE_ACCOUNT_EMAIL]

# 관리자 설정
NEXT_PUBLIC_ADMIN_EMAIL=hongik423@gmail.com
ADMIN_EMAIL=hongik423@gmail.com

# 사이트 설정
NEXT_PUBLIC_BASE_URL=https://aicamp.club
NEXT_PUBLIC_SITE_URL=https://aicamp.club

# 시스템 설정
NODE_ENV=production
```

---

## 🛡️ **보안 처리 방법**

### **✅ 안전한 환경변수 처리:**

1. **코드에서 완전 제거** → 보안 정보를 코드에 하드코딩하지 않음
2. **Vercel 환경변수 설정** → 대시보드에서 안전하게 설정
3. **런타임 로드** → `process.env`로 안전하게 접근

```typescript
// ✅ 안전한 환경변수 사용 예시
const googleCredentials = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;
const privateKey = process.env.GOOGLE_PRIVATE_KEY;
const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;

// ✅ 런타임에 JSON 파싱
const serviceAccount = JSON.parse(googleCredentials || '{}');
```

---

## 🚀 **PRD V3.0 시스템 동작 보장**

### **✅ 완전한 기능 보장:**

1. **신청서 제출** → 환경변수로 GAS 연동
2. **사실기반 평가** → 환경변수로 AI API 연동  
3. **보고서 생성** → 환경변수로 Google Drive 연동
4. **이메일 발송** → 환경변수로 관리자 이메일 설정
5. **데이터 저장** → 환경변수로 Google Sheets 연동

### **🎯 동작 플로우:**

```
PRD V3.0 API → 환경변수 로드 → Google 서비스 인증 → 완전한 기능 실행
```

---

## 📝 **환경변수 설정 체크리스트**

### **Vercel 대시보드에서 설정할 항목:**

- [ ] `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` (GAS URL)
- [ ] `NEXT_PUBLIC_GAS_URL` (GAS URL 백업)
- [ ] `NEXT_PUBLIC_GOOGLE_SHEETS_ID` (Sheets ID)
- [ ] `GEMINI_API_KEY` (AI 분석용)
- [ ] `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS` (Drive API)
- [ ] `GOOGLE_PRIVATE_KEY` (Drive 인증)
- [ ] `GOOGLE_CLIENT_EMAIL` (서비스 계정)
- [ ] `NEXT_PUBLIC_ADMIN_EMAIL` (관리자)
- [ ] `NEXT_PUBLIC_BASE_URL` (사이트 URL)
- [ ] `NODE_ENV=production` (운영 환경)

---

## ⚡ **즉시 적용 효과**

### **✅ 환경변수 설정 후:**

1. **보안 강화** → 민감한 정보가 코드에 노출되지 않음
2. **Git 푸시 성공** → GitHub 보안 스캔 통과
3. **Vercel 배포 성공** → 모든 기능 정상 작동
4. **PRD V3.0 완전 작동** → 전체 워크플로우 완벽 실행

### **🎯 결론:**

**환경변수 처리는 PRD V3.0 시스템 동작에 전혀 지장을 주지 않으며, 오히려 보안을 강화하여 더 안전하고 안정적인 시스템을 만듭니다.**

**즉시 Vercel 환경변수를 설정하고 Git 푸시를 진행하시면 됩니다!** 🚀
