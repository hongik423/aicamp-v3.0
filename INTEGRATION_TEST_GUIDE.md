# 🧪 AI 역량진단 시스템 통합 테스트 가이드

## 📋 개요

45개 질문 기반 AI 역량진단 시스템의 프론트엔드와 GAS V11.0 ENHANCED 간 연동을 테스트하는 가이드입니다.

## 🔧 테스트 환경 설정

### 1. 환경변수 설정

`.env.local` 파일에 다음 변수들이 설정되어야 합니다:

```bash
# Google Apps Script 웹앱 URL
NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/{SCRIPT_ID}/exec

# 기타 필요한 환경변수들
GEMINI_API_KEY=your_gemini_api_key
SPREADSHEET_ID=your_spreadsheet_id
ADMIN_EMAIL=admin@aicamp.club
```

### 2. GAS 스크립트 설정

Google Apps Script에서 다음 속성들을 설정해야 합니다:

```javascript
// 스크립트 속성 설정
SPREADSHEET_ID: "구글 시트 ID"
GEMINI_API_KEY: "Gemini API 키"
ADMIN_EMAIL: "관리자 이메일"
DEBUG_MODE: "true" (테스트 시)
```

## 🚀 테스트 실행 방법

### 방법 1: 자동화된 테스트 스크립트

```bash
# Node.js 환경에서 실행
node test-integration.js
```

### 방법 2: 브라우저 콘솔 테스트

1. 개발 서버 시작:
```bash
npm run dev
```

2. 브라우저에서 `http://localhost:3000` 접속

3. 개발자 도구 콘솔에서:
```javascript
// 테스트 함수 실행
testAIDiagnosis.runTests();

// 개별 테스트
testAIDiagnosis.validateDataStructure();
testAIDiagnosis.testAPIIntegration();
```

### 방법 3: 실제 UI 테스트

1. `/diagnosis` 페이지 접속
2. 45개 질문 단계별 진행
3. 제출 후 결과 확인

## 📊 테스트 항목

### ✅ 데이터 구조 검증

- [ ] 45개 필드 모두 존재
- [ ] 6개 섹션 데이터 구조 일치
- [ ] 필수 필드 유효성 검사

### ✅ API 연동 테스트

- [ ] 프론트엔드 → Next.js API 호출
- [ ] Next.js API → GAS 전송
- [ ] GAS 응답 처리
- [ ] 에러 핸들링

### ✅ GAS 처리 테스트

- [ ] 데이터 정규화
- [ ] GEMINI AI 분석 호출
- [ ] 구글 시트 저장
- [ ] 이메일 발송

### ✅ 응답 검증

- [ ] 성공 응답 구조
- [ ] submissionId 생성
- [ ] 타임스탬프 정확성
- [ ] 버전 정보 일치

## 🔍 예상 테스트 결과

### 성공적인 응답 예시:

```json
{
  "success": true,
  "submissionId": "AICAMP_1703001234567_abc123def",
  "diagnosisId": "AICAMP_1703001234567_abc123def",
  "message": "45개 질문 기반 AI 역량진단이 성공적으로 완료되었습니다",
  "timestamp": "2024-12-19T10:30:45.123Z",
  "version": "V11.0-ENHANCED-45Q"
}
```

### 실패 응답 예시:

```json
{
  "success": false,
  "error": "필수 정보가 누락되었습니다",
  "timestamp": "2024-12-19T10:30:45.123Z",
  "version": "V11.0-ENHANCED-45Q"
}
```

## 🐛 문제 해결

### 일반적인 오류들:

1. **CORS 오류**
   - GAS 웹앱 배포 시 "Anyone" 접근 권한 설정 확인

2. **타임아웃 오류**
   - Vercel 800초 제한 내 처리되는지 확인
   - GAS 실행 시간 최적화

3. **데이터 매핑 오류**
   - 프론트엔드 필드명과 GAS 예상 필드명 일치 확인
   - 필수 필드 누락 검사

4. **환경변수 오류**
   - `.env.local` 파일 존재 및 올바른 값 설정 확인
   - GAS 스크립트 속성 설정 확인

## 📈 성능 측정

### 측정 지표:

- **응답 시간**: 제출부터 완료까지 소요 시간
- **성공률**: 테스트 10회 중 성공 횟수
- **데이터 정확성**: 저장된 데이터와 입력 데이터 일치도
- **이메일 발송**: 신청자/관리자 이메일 정상 발송 여부

### 성능 기준:

- ✅ **응답 시간**: 60초 이내
- ✅ **성공률**: 95% 이상
- ✅ **데이터 정확성**: 100%
- ✅ **이메일 발송**: 5분 이내

## 🔄 지속적 테스트

### 자동화 테스트 스케줄:

1. **개발 단계**: 코드 변경 시마다
2. **스테이징**: 일일 1회
3. **프로덕션**: 주간 1회

### 모니터링:

- Google Apps Script 실행 로그 확인
- 구글 시트 데이터 저장 상태 점검
- 이메일 발송 로그 검토

## 📞 지원

테스트 중 문제 발생 시:

1. **로그 확인**: 브라우저 개발자 도구 콘솔
2. **GAS 로그**: Google Apps Script 실행 기록
3. **이슈 리포트**: 상세한 오류 메시지와 함께 보고

---

**마지막 업데이트**: 2024-12-19  
**테스트 버전**: V11.0-ENHANCED-45Q  
**호환성**: 프론트엔드 V11.0+ / GAS V11.0+
