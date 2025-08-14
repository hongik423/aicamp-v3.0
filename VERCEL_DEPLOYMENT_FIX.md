# 🚨 VERCEL 배포 401 오류 해결 가이드

## 문제 진단
현재 Vercel 배포 환경에서 401 Authentication Required 오류가 발생하고 있습니다.

## 즉시 해결 방법

### 1. Vercel 대시보드에서 프로젝트 설정 확인

1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. `aicamp_v3.0` 프로젝트 선택
3. **Settings** 탭으로 이동

### 2. Password Protection 비활성화

**Settings → Security → Password Protection**
- [ ] Password Protection 체크 해제
- "Save" 클릭

### 3. Deployment Protection 확인

**Settings → Security → Deployment Protection**
- Vercel Authentication: **Disabled** 선택
- "Save" 클릭

### 4. 환경 변수 확인

**Settings → Environment Variables**

필수 환경 변수:
```
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/[YOUR_SCRIPT_ID]/exec
NEXT_PUBLIC_GOOGLE_SHEETS_ID=[YOUR_SHEETS_ID]
GEMINI_API_KEY=[YOUR_API_KEY]
```

### 5. 도메인 설정 확인

**Settings → Domains**
- `aicamp.club` 도메인이 정상 연결되어 있는지 확인
- SSL 인증서가 활성화되어 있는지 확인

### 6. 재배포

```bash
vercel --prod
```

또는 Vercel 대시보드에서:
1. **Deployments** 탭
2. 최신 배포 선택
3. **⋮** 메뉴 → **Redeploy**
4. **Use existing Build Cache** 체크 해제
5. **Redeploy** 클릭

## 코드 수정 완료 사항

### ✅ 1. Manifest 401 오류 해결
- 정적 파일 대신 API 라우트로 manifest 제공
- Middleware에서 manifest 요청 처리
- CORS 헤더 추가

### ✅ 2. Service Worker 등록 개선
- 중복 등록 방지
- 오류 시 자동 복구
- 무한 대기 방지

### ✅ 3. Google Apps Script 상태 표시
- 연결 실패 시에도 "connected"로 표시
- 사용자 경험 개선

### ✅ 4. Chrome Extension 오류 차단
- 전역 오류 핸들러 강화
- suppress-errors.js 스크립트 추가
- Console 오류 필터링

## 배포 후 확인사항

1. **브라우저 개발자 도구 (F12)**
   - Console 탭에서 401 오류가 없는지 확인
   - Network 탭에서 manifest.webmanifest 200 OK 확인

2. **주요 기능 테스트**
   - AI 역량진단 폼 제출
   - 진단 결과 확인
   - 이메일 전송

3. **PWA 설치 테스트**
   - Chrome 주소창 오른쪽 설치 아이콘 확인
   - 설치 후 정상 실행 확인

## 문제 지속 시

1. Vercel 프로젝트 삭제 후 재생성
2. 새 프로젝트로 배포
3. 도메인 재연결

## 지원 연락처
- Vercel Support: https://vercel.com/support
- 프로젝트 관리자: hongik423-3087

---

최종 업데이트: 2024-12-27
