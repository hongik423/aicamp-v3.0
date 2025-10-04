# 🚀 Vercel 배포 가이드 - aicamp.club 도메인 설정

## 📋 개요

이 가이드는 **이교장의AI역량진단시스템 V17.0**을 Vercel에 배포하고 **aicamp.club** 도메인을 연결하는 방법을 설명합니다.

---

## 🎯 배포 목표

### ✅ **배포 후 달성할 기능**

1. **프론트엔드 웹사이트** (Next.js 14)
2. **AI 역량진단 시스템** (V17.0 간소화)
3. **상담신청 시스템**
4. **오류신고 시스템**
5. **실시간 진행상황 모니터링**

### 🔧 **핵심 특징**

- **Next.js 14** 기반 React 애플리케이션
- **TypeScript** 타입 안전성
- **Tailwind CSS** 스타일링
- **Vercel** 자동 배포 및 CDN
- **aicamp.club** 커스텀 도메인

---

## 🛠️ 배포 단계

### 1단계: Vercel CLI 설치

```bash
# Vercel CLI 전역 설치
npm install -g vercel

# 설치 확인
vercel --version
```

### 2단계: Vercel 로그인

```bash
# Vercel 계정 로그인
vercel login

# 브라우저에서 로그인 완료 후 터미널로 돌아가기
```

### 3단계: 프로젝트 배포

```bash
# 현재 디렉토리에서 Vercel 배포
vercel

# 배포 설정:
# - Set up and deploy: Yes
# - Which scope: [your-account]
# - Link to existing project: No
# - Project name: aicamp-v3-0
# - Directory: ./
# - Override settings: No
```

### 4단계: 프로덕션 배포

```bash
# 프로덕션 환경에 배포
vercel --prod

# 배포 URL 확인 (예: https://aicamp-v3-0.vercel.app)
```

---

## 🌐 aicamp.club 도메인 설정

### 1단계: Vercel 대시보드에서 도메인 추가

```bash
# 1. Vercel 대시보드 접속
# https://vercel.com/dashboard

# 2. 프로젝트 선택 (aicamp-v3-0)

# 3. Settings → Domains 메뉴 클릭

# 4. "Add Domain" 버튼 클릭

# 5. 도메인 입력: aicamp.club

# 6. "Add" 버튼 클릭
```

### 2단계: DNS 설정

#### **A 레코드 설정**
```bash
# 도메인 제공업체 DNS 설정에서:

# A 레코드 추가:
# Name: @
# Value: 76.76.19.76
# TTL: 3600 (1시간)

# 또는 CNAME 레코드:
# Name: @
# Value: cname.vercel-dns.com
# TTL: 3600
```

#### **www 서브도메인 설정**
```bash
# CNAME 레코드 추가:
# Name: www
# Value: aicamp.club
# TTL: 3600
```

### 3단계: SSL 인증서 설정

```bash
# Vercel에서 자동으로 SSL 인증서 발급
# 추가 설정 불필요

# 확인 사항:
# - HTTPS 리다이렉트 활성화
# - HSTS 헤더 설정
# - 보안 헤더 설정
```

---

## 🔧 환경변수 설정

### Vercel 대시보드에서 환경변수 설정

```bash
# 1. Vercel 대시보드 → 프로젝트 → Settings → Environment Variables

# 2. 다음 환경변수 추가:

# 프로덕션 환경변수:
NEXT_PUBLIC_SITE_URL = https://aicamp.club
NEXT_PUBLIC_SYSTEM_VERSION = V17.0-SIMPLIFIED-FIXED
NEXT_PUBLIC_BRANDING = 이교장의AI역량진단시스템

# Google Apps Script 연동 (필요시):
NEXT_PUBLIC_GAS_URL = https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

---

## 🧪 배포 후 테스트

### 1. 기본 기능 테스트

```bash
# 1. 홈페이지 접속 테스트
curl https://aicamp.club

# 2. AI 역량진단 페이지 테스트
curl https://aicamp.club/ai-diagnosis

# 3. 상담신청 페이지 테스트
curl https://aicamp.club/consultation
```

### 2. 기능별 테스트

#### **AI 역량진단 시스템**
```bash
# 1. 브라우저에서 https://aicamp.club/ai-diagnosis 접속
# 2. 기업정보 입력 폼 테스트
# 3. 45문항 진단 테스트
# 4. 진행상황 모니터링 테스트
```

#### **상담신청 시스템**
```bash
# 1. https://aicamp.club/consultation 접속
# 2. 상담신청 폼 테스트
# 3. 이메일 발송 확인
```

### 3. 성능 테스트

```bash
# Lighthouse 성능 테스트
# 1. Chrome DevTools → Lighthouse
# 2. Performance, Accessibility, Best Practices, SEO 점수 확인
# 3. 모바일/데스크톱 성능 확인
```

---

## 🚨 문제 해결

### 1. 도메인 연결 오류

```bash
# DNS 전파 대기 (최대 48시간)
# 임시 해결책: Vercel 제공 URL 사용

# DNS 확인 명령어:
nslookup aicamp.club
dig aicamp.club
```

### 2. 빌드 오류

```bash
# 로컬에서 빌드 테스트
npm run build

# 오류 수정 후 재배포
vercel --prod
```

### 3. 환경변수 오류

```bash
# Vercel 대시보드에서 환경변수 재설정
# 프로덕션/프리뷰/개발 환경 모두 설정
```

### 4. 404 오류

```bash
# Next.js 404 페이지 확인
# pages/404.js 또는 app/not-found.tsx 파일 확인
```

---

## 📊 모니터링 및 유지보수

### 1. 성능 모니터링

```bash
# Vercel Analytics 활성화
# 1. 대시보드 → Analytics
# 2. 웹 바이탈 모니터링
# 3. 사용자 행동 분석
```

### 2. 오류 모니터링

```bash
# Vercel Functions 로그 확인
# 1. 대시보드 → Functions
# 2. 실시간 로그 모니터링
# 3. 오류 알림 설정
```

### 3. 자동 배포 설정

```bash
# GitHub 연동으로 자동 배포
# 1. GitHub 저장소 연결
# 2. main 브랜치 푸시 시 자동 배포
# 3. 프리뷰 배포 설정
```

---

## 🔄 배포 워크플로우

### **개발 → 배포 → 모니터링**

```bash
# 1. 개발 및 테스트
git add .
git commit -m "기능 추가/수정"
git push origin main

# 2. 자동 배포 (GitHub 연동 시)
# Vercel에서 자동으로 배포 시작

# 3. 배포 확인
# https://aicamp.club 접속하여 기능 확인

# 4. 모니터링
# Vercel 대시보드에서 성능 및 오류 모니터링
```

---

## 📞 지원 및 문의

### 🆘 **문제 발생 시**

1. **기술 지원**: hongik423@gmail.com
2. **Vercel 문서**: https://vercel.com/docs
3. **도메인 설정**: 도메인 제공업체 고객지원

### 📋 **배포 정보**

- **플랫폼**: Vercel
- **프레임워크**: Next.js 14
- **도메인**: aicamp.club
- **SSL**: 자동 발급
- **CDN**: 글로벌 CDN (Vercel Edge Network)

---

## ✅ 배포 체크리스트

### **배포 전 확인사항**

- [ ] Git 저장소 최신 상태
- [ ] 로컬 빌드 성공
- [ ] 환경변수 설정 완료
- [ ] 도메인 DNS 설정 완료

### **배포 후 확인사항**

- [ ] aicamp.club 접속 성공
- [ ] HTTPS 연결 정상
- [ ] AI 역량진단 시스템 정상 작동
- [ ] 상담신청 시스템 정상 작동
- [ ] 모바일 반응형 디자인 확인
- [ ] 성능 점수 확인 (Lighthouse)

---

**🎉 aicamp.club 도메인으로 성공적으로 배포되었습니다!**

**📧 문의**: hongik423@gmail.com  
**🌐 웹사이트**: https://aicamp.club  
**📦 버전**: V17.0-SIMPLIFIED-FIXED  
**�� 작성일**: 2025-01-21
