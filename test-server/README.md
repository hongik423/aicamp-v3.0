# 🚀 AICAMP AI 역량진단 시스템 테스터 서버

Google Apps Script와 연동하여 AI 역량진단 시스템을 테스트할 수 있는 테스트 서버입니다.

## 📋 기능

- ✅ Google Apps Script 연결 상태 확인
- ✅ AI 역량진단 테스트 (24개 평가 항목)
- ✅ 상담신청 테스트
- ✅ 환경변수 테스트
- ✅ 웹 인터페이스 제공
- ✅ CLI 테스트 도구

## 🔧 설치 및 실행

### 1. 의존성 설치
```bash
cd test-server
npm install
```

### 2. 환경변수 설정
`env.example` 파일을 `.env`로 복사하고 Google Apps Script URL을 설정하세요:

```bash
cp env.example .env
```

`.env` 파일 수정:
```
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec
PORT=3001
```

### 3. 서버 실행
```bash
# 일반 실행
npm start

# 개발 모드 (nodemon)
npm run dev
```

## 🌐 웹 인터페이스

서버 실행 후 브라우저에서 접속:
```
http://localhost:3001
```

### 주요 기능
- **시스템 상태 확인**: Google Apps Script 연결 테스트
- **진단 테스트**: 샘플 데이터로 AI 역량진단 실행
- **상담신청 테스트**: 상담신청 프로세스 테스트
- **환경변수 테스트**: GAS 환경변수 설정 확인

## 🧪 CLI 테스트 도구

### 모든 테스트 실행
```bash
npm test
# 또는
node test-diagnosis.js
```

### 개별 테스트 실행
```bash
# 기본 진단 테스트
node test-diagnosis.js basicDiagnosis

# 상담신청 테스트
node test-diagnosis.js consultation

# 시스템 상태 확인
node test-diagnosis.js healthCheck

# 오류 처리 테스트
node test-diagnosis.js errorTest
```

## 📡 API 엔드포인트

### GET `/api/status`
Google Apps Script 연결 상태 확인

### POST `/api/test-diagnosis`
AI 역량진단 테스트 실행

### POST `/api/test-consultation`
상담신청 테스트 실행

### GET `/api/test-environment`
환경변수 테스트 실행

## 📊 테스트 시나리오

### 1. 기본 진단 테스트
- 24개 평가 항목 모두 포함
- 유효한 기업 정보
- 개인정보 동의 포함

### 2. 상담신청 테스트
- 기본 상담 정보
- 이메일 발송 확인

### 3. 시스템 상태 확인
- GAS 서버 응답 확인
- 기본 시스템 정보 조회

### 4. 오류 처리 테스트
- 잘못된 데이터로 오류 처리 확인
- 빈 값, 잘못된 이메일 등

## 🔍 로그 확인

### 서버 로그
```bash
🚀 AICAMP 테스트 서버 시작됨
📡 서버 주소: http://localhost:3001
🔗 Google Apps Script URL: https://script.google.com/macros/s/.../exec
```

### 테스트 결과 예시
```bash
🧪 AI 역량진단 테스트 시작
✅ AI 역량진단 성공 (1234ms)
📥 응답 데이터:
{
  "success": true,
  "diagnosisId": "AICAMP-123456789",
  "message": "AI 역량진단이 성공적으로 완료되었습니다."
}
```

## 🛠️ 문제 해결

### Google Apps Script URL 오류
```
❌ Google Apps Script 연결 실패: Request failed with status code 404
```
- `.env` 파일의 `GOOGLE_SCRIPT_URL` 확인
- Google Apps Script 배포 상태 확인
- 웹 앱 권한 설정 확인

### 타임아웃 오류
```
❌ 진단 테스트 실패: timeout of 30000ms exceeded
```
- Google Apps Script 실행 시간 확인
- Gemini API 응답 시간 확인
- 네트워크 연결 상태 확인

### 권한 오류
```
❌ Google Sheets 연결 실패: The caller does not have permission
```
- Google Apps Script 권한 재승인
- Google Sheets 공유 설정 확인

## 📈 성능 모니터링

### 응답 시간 측정
- 각 테스트의 실행 시간 표시
- 평균 응답 시간 추적

### 성공률 추적
- 테스트 성공/실패 비율
- 오류 패턴 분석

## 🔄 지속적 테스트

### 정기 테스트 실행
```bash
# cron으로 정기 실행 설정 가능
0 */6 * * * cd /path/to/test-server && npm test
```

### 모니터링 알림
- 테스트 실패 시 알림
- 성능 저하 감지

## 📞 지원

문제 발생 시:
1. 로그 확인
2. Google Apps Script 실행 기록 확인
3. 환경변수 설정 재확인
4. 권한 설정 재확인

---

**🎯 이제 완전한 테스트 환경이 준비되었습니다!**
