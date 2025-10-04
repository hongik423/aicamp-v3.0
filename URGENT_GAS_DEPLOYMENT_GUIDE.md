# 🚨 긴급: Google Apps Script V22 재배포 가이드

## 📋 현재 상황
- 기존 Google Apps Script URL이 작동하지 않음 (302/405 오류)
- 전체 AI 역량진단 시스템이 Google Apps Script 연결 실패로 중단됨
- **즉시 재배포가 필요한 상황**

---

## 🚀 긴급 재배포 단계 (15분 소요)

### 1단계: Google Apps Script 콘솔 접속 (2분)
```
1. 브라우저에서 https://script.google.com/ 접속
2. Google 계정 로그인 (hongik423@gmail.com)
3. "새 프로젝트" 버튼 클릭
4. 프로젝트명을 "AICAMP_V22_Enhanced_Final" 로 변경
```

### 2단계: V22 스크립트 코드 배포 (3분)
```
1. 기본 Code.gs 파일 선택
2. 기존 코드 전체 삭제 (Ctrl+A → Delete)
3. aicamp_enhanced_stable_v22.js 파일 열기
4. 전체 내용 복사 (Ctrl+A → Ctrl+C)
5. Code.gs에 붙여넣기 (Ctrl+V)
6. 저장 (Ctrl+S)
```

### 3단계: 스크립트 속성 설정 (5분)
```
좌측 메뉴에서 "설정" → "스크립트 속성" 클릭 후 다음 추가:

키: ADMIN_EMAIL
값: hongik423@gmail.com

키: SYSTEM_NAME  
값: AICAMP 통합 시스템

키: VERSION
값: V22.0

키: SPREADSHEET_ID
값: 1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ

키: MAIN_SHEET_NAME
값: AI역량진단_메인데이터

키: DETAIL_SHEET_NAME
값: AI역량진단_45문항상세

키: CATEGORY_SHEET_NAME
값: AI역량진단_카테고리분석

키: TAX_ERROR_SHEET_NAME
값: 세금계산기_오류신고

키: CONSULTATION_SHEET_NAME
값: 상담신청_데이터

키: ENABLE_EMAIL
값: true
```

### 4단계: 웹앱 배포 (3분)
```
1. 우측 상단 "배포" → "새 배포" 클릭
2. 설정:
   - 유형: 웹 앱
   - 설명: AICAMP V22 Enhanced Final
   - 실행 계정: 나
   - 액세스 권한: 모든 사용자
3. "배포" 버튼 클릭
4. 권한 승인 진행
5. ⚠️ **중요**: 생성된 웹앱 URL 복사 (다음 단계에서 사용)
```

### 5단계: 환경변수 업데이트 (2분)
```
새로 생성된 Google Apps Script URL을 다음 파일들에 업데이트:

1. src/lib/config/env.ts
   - DEFAULT_GOOGLE_SCRIPT_URL 값 변경

2. .env.local (또는 setup-env-local.js 재실행)
   - NEXT_PUBLIC_GOOGLE_SCRIPT_URL 값 변경
   - NEXT_PUBLIC_GAS_URL 값 변경
   - GOOGLE_APPS_SCRIPT_URL 값 변경

3. test-workflow-system.js
   - TEST_CONFIG.GAS_URL 값 변경
```

---

## 🧪 배포 완료 후 테스트

### 1. 시스템 연결 테스트
```bash
node test-workflow-system.js
```

### 2. 개발 서버 재시작
```bash
npm run dev
```

### 3. 실제 진단 테스트
```
1. http://localhost:3000/ai-diagnosis 접속
2. 테스트 기업 정보 입력
3. 45문항 중 몇 개 문항 응답
4. 신청서 제출 테스트
5. 이메일 발송 확인
```

---

## 📧 배포 완료 후 예상 결과

### 성공 시 확인 사항:
- ✅ Google Apps Script 연결 성공 (200 응답)
- ✅ AI 역량진단 워크플로우 정상 동작
- ✅ Google Sheets 5개 시트에 데이터 저장
- ✅ 신청자/관리자 이메일 자동 발송
- ✅ 진단ID 생성 및 결과 조회 가능
- ✅ 관리자 대시보드에서 실제 데이터 확인

### 시스템 품질 점수 예상:
**95/100** (현재 75/100에서 20점 향상)

---

## ⚠️ 주의사항

1. **Google Apps Script 배포 시**:
   - 반드시 "모든 사용자" 액세스 권한 설정
   - 권한 승인 과정에서 "고급" → "안전하지 않은 페이지로 이동" 클릭

2. **환경변수 업데이트 후**:
   - 개발 서버 재시작 필수
   - 브라우저 캐시 클리어 권장

3. **테스트 시**:
   - 실제 이메일 주소 사용 (이메일 발송 테스트)
   - Google Sheets 권한 확인

---

## 📞 긴급 지원

**문제 발생 시 즉시 연락**:
- 📧 hongik423@gmail.com  
- 📱 010-9251-9743

**예상 완료 시간**: 15분 (Google Apps Script 재배포 완료 시)
