# 🎯 AICAMP V3.0 구글시트 Apps Script 통합설치가이드

## 🎉 **완성된 AICAMP V3.0 시스템**

### ✅ **완성된 기능**
1. **진단신청자** → `AI_무료진단신청` 시트 (58개 컬럼) ✅
2. **상담신청자** → `상담신청` 시트 (19개 컬럼) ✅  
3. **베타피드백** → `베타피드백` 시트 (14개 컬럼) ✅
4. **관리자 알림** → hongik423@gmail.com 자동 발송 ✅
5. **신청자 확인메일** → AICAMP 브랜드 템플릿 자동 발송 ✅
6. **AICAMP 브랜딩** → BM ZEN 프레임워크 완전 적용 ✅

---

## 🚀 **1단계: 구글시트 설정**

### 1.1 기존 구글시트 사용
```bash
# 구글시트 ID (이미 설정됨)
1bAbxAWBWy5dvxBSFf1Mtdt0UiP9hNaFKyjTTlLq_Pug

# AICAMP 시트 구조:
📊 AI_무료진단신청 시트 (58개 컬럼 - BM ZEN 키워드 포함)
📋 상담신청 시트 (19개 컬럼 - AICAMP 컨설턴트 정보)
🧪 베타피드백 시트 (14개 컬럼 - AICAMP 브랜딩)
```

### 1.2 Apps Script 배포 (5개 파일 통합)
```javascript
1. 구글시트 → 확장 → Apps Script
2. 기존 Code.gs 내용 전체 삭제
3. 다음 5개 파일을 순서대로 복사하여 하나의 Code.gs에 통합:

📄 Part 1: AICAMP_V3.0_통합_Apps_Script_2025_최종완성판.js
📄 Part 2: AICAMP_V3.0_통합_Apps_Script_2025_최종완성판_Part2.js  
📄 Part 3: AICAMP_V3.0_통합_Apps_Script_2025_최종완성판_Part3.js
📄 Part 4: AICAMP_V3.0_통합_Apps_Script_2025_최종완성판_Part4.js
📄 Part 5: AICAMP_V3.0_통합_Apps_Script_2025_최종완성판_Part5.js

4. 저장 후 배포 → 웹 앱 → "모든 사용자" 권한
5. 새 배포 생성 (중요!)
6. 웹앱 URL 복사하여 환경변수에 설정
```

---

## 🔧 **2단계: 환경변수 설정**

### 2.1 AICAMP V3.0 환경변수 (.env.local)
```bash
# ===========================================
# AICAMP V3.0 AI 교육센터 - 환경변수 설정
# ===========================================

# 🚀 AICAMP 구글시트 연동 (필수)
NEXT_PUBLIC_GOOGLE_SHEETS_ID=1bAbxAWBWy5dvxBSFf1Mtdt0UiP9hNaFKyjTTlLq_Pug
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=[발급받은_새로운_웹앱_URL]

# 🤖 AICAMP AI API (Gemini)
GEMINI_API_KEY=[발급받은_실제_API_키]

# 🌐 AICAMP 사이트 설정
NEXT_PUBLIC_BASE_URL=https://aicamp-v3-0.vercel.app
NEXT_PUBLIC_APP_NAME=AICAMP AI 교육센터
NEXT_PUBLIC_APP_DESCRIPTION=Business Model Zen 프레임워크 기반 기업 성장 솔루션

# 📧 AICAMP 관리자 설정
ADMIN_EMAIL=hongik423@gmail.com
NOTIFICATION_ENABLED=true
AUTO_REPLY_ENABLED=true

# 🎯 AICAMP 환경 설정
NODE_ENV=production
```

### 2.2 Vercel 배포용 환경변수
```bash
# Vercel 프로젝트 Settings → Environment Variables 에 추가

NEXT_PUBLIC_GOOGLE_SHEETS_ID=1bAbxAWBWy5dvxBSFf1Mtdt0UiP9hNaFKyjTTlLq_Pug
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=[새로_발급받은_웹앱_URL]
GEMINI_API_KEY=[발급받은_API_키]
NEXT_PUBLIC_BASE_URL=https://your-aicamp-domain.vercel.app
ADMIN_EMAIL=hongik423@gmail.com
NODE_ENV=production
```

---

## 🧪 **3단계: 시스템 테스트**

### 3.1 Google Apps Script 테스트
```javascript
// Apps Script 에디터에서 다음 함수들을 실행하여 테스트

1. updateExistingSheetHeaders()    // AICAMP 헤더 업데이트
2. testEntireAICampSystem()        // 전체 시스템 테스트  
3. testAICampBranding()           // AICAMP 브랜드 정보 테스트
4. testAICampSheetConnection()    // 구글시트 연결 테스트
5. getAICampSystemStatus()        // AICAMP 시스템 상태 확인
```

### 3.2 테스트 시나리오
```bash
✅ 진단신청 테스트:
- 웹사이트에서 AI 무료진단 신청
- 구글시트 AI_무료진단신청 탭에 58개 컬럼 저장 확인
- 관리자/신청자 이메일 발송 확인

✅ 상담신청 테스트:  
- 웹사이트에서 AICAMP 상담신청
- 구글시트 상담신청 탭에 19개 컬럼 저장 확인
- 담당컨설턴트: 이후경 경영지도사 자동 매핑 확인

✅ 베타피드백 테스트:
- 시스템 오류 신고 또는 개선제안
- 구글시트 베타피드백 탭에 14개 컬럼 저장 확인
- AICAMP 브랜드 피드백 처리 확인
```

---

## 📊 **4단계: AICAMP 브랜드 기능 확인**

### 4.1 AICAMP 브랜드 정보
```javascript
브랜드명: AICAMP
정식명칭: AICAMP AI 교육센터  
설명: Business Model Zen 프레임워크 기반 기업 성장 솔루션
담당 컨설턴트: 이후경 경영지도사
연락처: 010-9251-9743
관리자 이메일: hongik423@gmail.com
```

### 4.2 AICAMP 6대 핵심 서비스
```bash
🚀 AICAMP 서비스 영역:
• BM ZEN 사업분석 (혁신 프레임워크)
• AI 생산성향상 (정부 100% 지원)  
• 정책자금 확보 (평균 5억원 지원)
• 기술사업화/창업 (5억원 자금확보)
• 인증지원 (연간 5천만원 혜택)
• 웹사이트 구축 (매출 300% 증대)
```

### 4.3 BM ZEN 프레임워크 적용
```bash
📊 AICAMP 진단 영역 (58개 컬럼):
🔶 상품/서비스 관리 역량 (5개 항목, 가중치 25%)
🔷 고객응대 역량 (4개 항목, 가중치 20%)  
🔸 마케팅 역량 (5개 항목, 가중치 25%)
🔹 구매/재고관리 (2개 항목, 가중치 15%)
🔺 매장관리 역량 (4개 항목, 가중치 15%)

각 항목은 1-5점 척도로 정확 저장
카테고리별 평균점수 자동 계산
종합점수 100점 만점으로 환산
```

---

## 📧 **5단계: AICAMP 이메일 시스템**

### 5.1 이메일 템플릿 (AICAMP 브랜딩)
```bash
📧 관리자 알림 이메일:
- 제목: [AICAMP] 🎯 AI 무료진단 접수 - {회사명} ({점수}점)
- 내용: AICAMP 서비스 영역 안내 포함
- 담당: 이후경 경영지도사 정보 자동 포함

📧 신청자 확인 이메일:  
- 제목: [AICAMP] 진단/상담 신청이 접수되었습니다
- 내용: BM ZEN 프레임워크 기반 서비스 안내
- 담당: AICAMP AI 교육센터 브랜딩

📧 베타피드백 이메일:
- 제목: [AICAMP] 🧪 베타 피드백 접수 완료!
- 내용: AICAMP V3.0 베타테스트 참여 감사
```

---

## 🎯 **6단계: 최종 검증 체크리스트**

### 6.1 필수 확인사항
```bash
□ 구글시트 3개 탭 정상 생성 (AI_무료진단신청/상담신청/베타피드백)
□ 58개 컬럼 진단 데이터 정확 저장 (1-5점 매핑)
□ AICAMP 브랜드 헤더 및 설명 적용
□ 관리자 이메일 자동 발송 (hongik423@gmail.com)
□ 신청자 확인 이메일 AICAMP 템플릿 발송
□ 이후경 경영지도사 정보 자동 매핑
□ BM ZEN 프레임워크 키워드 포함
□ 웹앱 URL 환경변수 정상 설정
□ Vercel 배포 환경변수 설정 완료
□ 전체 시스템 테스트 통과
```

### 6.2 고급 기능 확인
```bash
□ 진단점수 0 문제 해결 (1-5점 정확 저장)
□ 카테고리별 점수 가중치 적용
□ AICAMP 서비스 영역 자동 매핑
□ 베타피드백 AICAMP 브랜딩 적용
□ 구글시트 컬럼 AICAMP 색상 구분
□ 이메일 내용 AICAMP 브랜드 적용
□ 응답 메시지 AICAMP 시스템 표기
□ 로그 메시지 AICAMP 표기
```

---

## 🔧 **7단계: 문제 해결 가이드**

### 7.1 자주 발생하는 문제
```bash
❌ 웹앱 URL 오류 → 새 배포 생성 필요
❌ 권한 오류 → "모든 사용자" 권한 설정 확인  
❌ 이메일 발송 안됨 → AUTO_REPLY_ENABLED=true 확인
❌ 진단점수 0 → 문항별점수 데이터 구조 확인
❌ 시트 생성 안됨 → SPREADSHEET_ID 정확성 확인
```

### 7.2 디버깅 방법
```javascript
// Apps Script 에디터 실행 로그 확인
console.log('AICAMP 디버깅 정보');

// 테스트 함수로 단계별 확인
testAICampSheetConnection();  // 시트 연결 확인
testAICampBranding();        // 브랜드 정보 확인  
getAICampSystemStatus();     // 전체 상태 확인
```

---

## 📞 **8단계: 지원 및 문의**

### 8.1 담당자 정보
```bash
👨‍💼 담당 컨설턴트: 이후경 경영지도사
📞 연락처: 010-9251-9743
📧 이메일: hongik423@gmail.com
🏢 기관: AICAMP AI 교육센터
🎯 전문분야: BM ZEN 프레임워크, AI 생산성향상
```

### 8.2 기술 지원
```bash
📊 구글시트 문제: 시트 권한 및 구조 확인
📧 이메일 문제: ADMIN_EMAIL 설정 확인
🔧 Apps Script 문제: 웹앱 권한 및 배포 확인  
🌐 환경변수 문제: .env.local 및 Vercel 설정 확인
🎨 브랜딩 문제: AICAMP_BRAND 객체 확인
```

---

## 🎉 **완성! AICAMP V3.0 시스템 가동**

```bash
🚀 AICAMP V3.0 통합 Apps Script 설치 완료!

✅ M-CENTER → AICAMP 브랜드 완전 전환
✅ BM ZEN 프레임워크 키워드 적용  
✅ 58개 컬럼 확장 진단 데이터 저장
✅ 진단점수 0 문제 완전 해결
✅ AICAMP 6대 서비스 영역 적용
✅ 이후경 경영지도사 정보 자동 매핑
✅ AICAMP 브랜드 이메일 템플릿
✅ 실시간 관리자/신청자 알림 시스템

🎯 이제 AICAMP V3.0 시스템이 완전히 작동합니다!
``` 