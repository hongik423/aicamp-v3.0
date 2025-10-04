# AI 역량 진단 시스템 오류 해결 가이드

## 1. Google Apps Script 설정 확인

### 1.1 배포 URL 확인
```javascript
// 현재 설정된 URL
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzYIDWtMiz9mUjuInH981lcKbN4DaXMkYxQ2CHYFMuSW0zd98D6ohdp5NbfdhqLnN0/exec';
```

**확인 방법:**
1. Google Apps Script 에디터 열기
2. 배포 > 배포 관리
3. 현재 활성 배포 URL이 위 URL과 일치하는지 확인
4. 일치하지 않으면 환경변수 업데이트 필요

### 1.2 CORS 설정 확인
Google Apps Script 배포 설정:
- 실행 대상: 나 (Execute as: Me)
- 액세스 권한: 모든 사용자 (Who has access: Anyone)

## 2. Gemini API 키 확인

### 2.1 API 키 유효성 확인
```bash
# API 키 테스트 (터미널에서 실행)
curl -X POST \
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

### 2.2 Google Apps Script에서 API 키 설정
1. Google Apps Script 프로젝트 열기
2. 프로젝트 설정 > 스크립트 속성
3. `GEMINI_API_KEY` 속성 추가/업데이트

## 3. 테스트 방법

### 3.1 브라우저에서 직접 테스트
1. 테스트 페이지 접속: `/diagnosis/test-ai-capability`
2. 샘플 데이터로 테스트 실행
3. 결과 확인:
   - ✅ 이메일 발송
   - ✅ 구글 시트 저장
   - ✅ 보고서 생성

### 3.2 터미널에서 테스트
```bash
# 프로젝트 루트에서 실행
node test-ai-capability-system.js
```

## 4. 자주 발생하는 오류 및 해결법

### 4.1 "Cannot read property 'aiCapabilityData' of undefined"
**원인:** 데이터 전송 형식 문제
**해결:** 
```javascript
// API 호출 시 데이터 구조 확인
{
  ...기본정보,
  aiCapabilityData: {
    ceoAIVision: 4,
    aiInvestment: 3,
    // ... 나머지 AI 역량 데이터
  }
}
```

### 4.2 "504 Gateway Timeout"
**원인:** Google Apps Script 처리 시간 초과
**해결:** 
- 백그라운드 처리로 전환
- 이메일로 결과 전송

### 4.3 "CORS error"
**원인:** Google Apps Script 배포 설정 문제
**해결:**
1. 새 배포 생성 (기존 배포 수정 X)
2. 새 URL로 환경변수 업데이트
3. Vercel 재배포

## 5. 환경변수 업데이트 방법

### 5.1 로컬 환경 (.env.local)
```
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=새로운_배포_URL
```

### 5.2 Vercel 환경변수
```bash
# Vercel CLI 사용
vercel env add NEXT_PUBLIC_GOOGLE_SCRIPT_URL production
```

또는 Vercel 대시보드에서 직접 업데이트

## 6. 데이터 흐름 확인

```
사용자 입력 (AI 역량 진단 포함)
    ↓
프론트엔드 (FreeDiagnosisForm)
    ↓
API 라우트 (/api/simplified-diagnosis)
    ↓
Google Script Proxy (/api/google-script-proxy)
    ↓
Google Apps Script (AI 역량 분석 + Gemini 보고서 생성)
    ↓
결과 반환 (이메일 + 구글시트 저장)
```

## 7. 디버깅 팁

### 7.1 브라우저 개발자 도구
- Network 탭에서 API 요청/응답 확인
- Console 탭에서 에러 메시지 확인

### 7.2 Google Apps Script 로그
1. Google Apps Script 에디터 열기
2. 실행 기록 확인
3. console.log 출력 확인

### 7.3 Vercel 로그
```bash
vercel logs --prod
```

## 8. 긴급 해결책

만약 위 방법으로도 해결되지 않는다면:

1. **임시 우회 방법**
   - Google Apps Script URL 직접 사용 (CORS 우회)
   - 로컬 프록시 서버 구축

2. **대체 솔루션**
   - Edge Functions로 이전
   - 별도 백엔드 서버 구축

## 9. 지원 연락처

기술 지원이 필요한 경우:
- 이메일: hongik423@gmail.com
- 전화: 010-9251-9743

---

마지막 업데이트: 2025.01.31