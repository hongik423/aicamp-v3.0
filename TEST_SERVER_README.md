# 🚀 AICAMP v3.0 테스트 서버 가이드

AICAMP v3.0 프로젝트의 로컬 테스트 및 개발을 위한 테스트 서버 시스템입니다.

## 📋 목차

- [빠른 시작](#빠른-시작)
- [테스트 서버](#테스트-서버)
- [테스트 클라이언트](#테스트-클라이언트)
- [E2E 테스트](#e2e-테스트)
- [API 엔드포인트](#api-엔드포인트)
- [문제 해결](#문제-해결)

## 🚀 빠른 시작

### 1. 테스트 서버 시작
```bash
# 방법 1: npm 스크립트 사용
npm run test:server

# 방법 2: 직접 실행
node test-server.js

# 방법 3: Windows 배치 파일
run-tests.bat server
```

### 2. 테스트 클라이언트 실행
```bash
# 전체 테스트 실행
npm run test:client

# 개별 테스트 실행
node test-client.js health test
node test-client.js diagnosis test
```

### 3. E2E 테스트 실행
```bash
# 맥킨지 스타일 보고서 E2E 테스트
npm run test:e2e:mckinsey

# 전체 워크플로우 테스트
npm run test:e2e
```

## 🖥️ 테스트 서버

### 기능
- **포트**: 3001 (Next.js dev 서버와 분리)
- **CORS 지원**: 모든 오리진 허용
- **API 모킹**: 실제 API와 동일한 응답 구조
- **정적 파일 서빙**: public 폴더 파일 제공
- **로깅**: 모든 요청/응답 로깅

### 설정
```javascript
const CONFIG = {
  PORT: process.env.TEST_PORT || 3001,
  HOST: process.env.TEST_HOST || 'localhost',
  TIMEOUT: 30000, // 30초
  MAX_BODY_SIZE: 10 * 1024 * 1024 // 10MB
};
```

### 환경변수
```bash
# 포트 변경
TEST_PORT=3002 node test-server.js

# 호스트 변경
TEST_HOST=0.0.0.0 node test-server.js
```

## 🧪 테스트 클라이언트

### 사용법
```bash
node test-client.js [command] [server]
```

### 명령어
- `health` - 헬스 체크
- `system` - 시스템 상태 확인
- `generate` - 테스트 데이터 생성
- `diagnosis` - AI 진단 테스트
- `all` - 전체 테스트 실행
- `help` - 도움말 표시

### 서버 옵션
- `test` - 테스트 서버 (기본값)
- `prod` - 프로덕션 서버

### 예시
```bash
# 테스트 서버 헬스 체크
node test-client.js health test

# 프로덕션 서버 진단 테스트
node test-client.js diagnosis prod

# 전체 테스트 실행
node test-client.js all
```

## 🔄 E2E 테스트

### 맥킨지 스타일 보고서 E2E 테스트
```bash
npm run test:e2e:mckinsey
```

**테스트 시나리오:**
1. **정상 케이스**: 모든 단계 성공
2. **타임아웃 케이스**: Gemini API 지연 시뮬레이션
3. **GAS 502 케이스**: Google Apps Script 오류 시뮬레이션

**검증 항목:**
- HTTP 상태 코드 (200)
- 진단 결과 존재
- HTML 보고서 생성
- GAS 저장 상태
- 이메일 발송 상태
- 응답 시간 (< 3분)

## 📡 API 엔드포인트

### 헬스 체크
```http
GET /api/health/check
```

**응답:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "memory": {...},
  "version": "3.1.0",
  "environment": "test"
}
```

### 시스템 상태
```http
GET /api/system-health
```

**응답:**
```json
{
  "server": "running",
  "database": "connected",
  "external_apis": {
    "gemini": "available",
    "google_sheets": "available",
    "email": "available"
  },
  "performance": {
    "cpu_usage": "< 50%",
    "memory_usage": "< 80%",
    "response_time": "< 2s"
  }
}
```

### AI 진단 (모킹)
```http
POST /api/ai-diagnosis
Content-Type: application/json

{
  "companyName": "테스트기업",
  "industry": "제조업",
  "assessmentResponses": {...}
}
```

**응답:**
```json
{
  "success": true,
  "testId": "test_1642248600000",
  "scoreAnalysis": {
    "totalScore": 85,
    "categoryScores": {...}
  },
  "processingInfo": {
    "emailSending": "in_progress",
    "steps": [...]
  },
  "features": ["맥킨지 스타일 HTML 보고서", "SWOT 분석"]
}
```

### 테스트 데이터 생성
```http
GET /api/test/generate-data
```

**응답:**
```json
{
  "companyName": "테스트기업_1642248600000",
  "industry": "제조업",
  "assessmentResponses": {...}
}
```

## 🛠️ 문제 해결

### 포트 충돌
```bash
# 다른 포트 사용
TEST_PORT=3002 node test-server.js
```

### 연결 실패
1. 테스트 서버가 실행 중인지 확인
2. 방화벽 설정 확인
3. 포트 사용 상태 확인: `netstat -an | findstr 3001`

### 타임아웃 오류
```bash
# 타임아웃 시간 증가
TEST_TIMEOUT=60000 node test-client.js
```

### CORS 오류
- 테스트 서버는 모든 오리진을 허용하도록 설정됨
- 브라우저에서 테스트 시 개발자 도구 확인

## 📊 성능 모니터링

### 응답 시간 측정
모든 API 호출의 응답 시간이 자동으로 측정되고 출력됩니다.

### 메모리 사용량
헬스 체크 API에서 현재 메모리 사용량을 확인할 수 있습니다.

### 로그 분석
```bash
# 서버 로그 실시간 확인
node test-server.js | grep "INFO"
```

## 🔧 개발 팁

### 디버깅
```javascript
// 환경변수로 디버그 모드 활성화
DEBUG=true node test-server.js
```

### 커스텀 테스트 추가
`test-client.js`의 `commands` 객체에 새로운 테스트 함수를 추가하세요.

### API 모킹 수정
`test-server.js`의 `apiRoutes` 객체에서 API 응답을 수정할 수 있습니다.

## 📞 지원

문제가 발생하면 다음을 확인하세요:

1. **로그 확인**: 서버와 클라이언트 로그 검토
2. **네트워크 상태**: 인터넷 연결 및 방화벽 설정
3. **포트 상태**: 다른 프로세스의 포트 사용 여부
4. **환경변수**: 필요한 환경변수 설정 확인

---

**AICAMP v3.0** - AI 역량진단 시스템  
📧 문의: hongik423@gmail.com  
🌐 웹사이트: https://aicamp.club
