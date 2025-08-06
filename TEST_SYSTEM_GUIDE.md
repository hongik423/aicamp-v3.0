# 🧪 AI 역량진단 시스템 테스트 가이드

## 1. 기본 연결 테스트

### Google Apps Script 상태 확인
```bash
curl -X GET "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
```

예상 응답:
```json
{
  "success": true,
  "status": "operational",
  "version": "V8.0 PERFECT",
  "message": "AICAMP AI 역량진단 시스템"
}
```

### 프론트엔드 연결 테스트
```bash
curl -X GET "http://localhost:3000/api/ai-capability-diagnosis/status"
```

## 2. 진단 신청 테스트

### 테스트 데이터 준비
```json
{
  "companyName": "테스트 기업",
  "applicantName": "홍길동",
  "email": "test@example.com",
  "phone": "010-1234-5678",
  "industry": "IT/소프트웨어",
  "companySize": "10-50명",
  "region": "서울",
  "businessDetails": "AI 기반 서비스 개발",
  "mainConcerns": ["AI 전문성 부족", "기술 도입 비용"],
  "expectedBenefits": ["업무 효율 향상", "경쟁력 강화"],
  "assessmentResponses": {
    "leadership_1": 4,
    "leadership_2": 3,
    "leadership_3": 4,
    "leadership_4": 3,
    "infra_1": 2,
    "infra_2": 3,
    "infra_3": 2,
    "infra_4": 3,
    "talent_1": 3,
    "talent_2": 2,
    "talent_3": 3,
    "talent_4": 2,
    "culture_1": 4,
    "culture_2": 3,
    "culture_3": 3,
    "culture_4": 3,
    "app_1": 2,
    "app_2": 2,
    "app_3": 3,
    "app_4": 2,
    "data_1": 3,
    "data_2": 2,
    "data_3": 2,
    "data_4": 3
  },
  "privacyConsent": true,
  "marketingConsent": false
}
```

### API 테스트 실행
```bash
curl -X POST "http://localhost:3000/api/ai-capability-diagnosis" \
  -H "Content-Type: application/json" \
  -d @test-data.json
```

예상 응답:
```json
{
  "success": true,
  "diagnosisId": "AICAMP-XXXXXXXXX-XXXXX",
  "message": "AI 역량진단이 시작되었습니다.",
  "processingTime": 1234,
  "features": [...]
}
```

## 3. 체크리스트

### Google Apps Script 설정
- [ ] 스크립트 코드 배포 완료
- [ ] 웹 앱 URL 생성 완료
- [ ] 스크립트 속성 설정 완료
  - [ ] SPREADSHEET_ID
  - [ ] GEMINI_API_KEY
  - [ ] ADMIN_EMAIL
- [ ] 권한 승인 완료

### Google Sheets 설정
- [ ] 새 스프레드시트 생성
- [ ] Sheet ID 확인 및 설정
- [ ] 공유 권한 설정

### Gemini API 설정
- [ ] Google AI Studio에서 API 키 생성
- [ ] 스크립트 속성에 API 키 추가
- [ ] API 사용량 모니터링 설정

### 프론트엔드 설정
- [ ] 환경변수 설정 (.env.local)
- [ ] API 라우트 수정 완료
- [ ] CORS 헤더 설정 확인

### 이메일 시스템
- [ ] Gmail API 권한 확인
- [ ] 테스트 이메일 발송 확인
- [ ] 관리자 알림 이메일 확인

## 4. 문제 해결

### 자주 발생하는 오류

#### "Google Apps Script URL 미설정"
- 환경변수 `GOOGLE_SCRIPT_URL` 확인
- .env.local 파일 존재 여부 확인

#### "권한 거부" 오류
- Google Apps Script 권한 재승인
- Gmail 발송 권한 확인

#### "Gemini API 오류"
- API 키 유효성 확인
- 사용량 한도 확인

#### "Sheet 접근 오류"
- Sheet ID 정확성 확인
- 공유 권한 설정 확인

## 5. 성능 모니터링

### 로그 확인 위치
- Google Apps Script: 실행 기록
- Next.js: 콘솔 로그
- Vercel: 함수 로그

### 주요 지표
- 진단 처리 시간 (목표: 5-10분)
- 이메일 발송 성공률 (목표: 95% 이상)
- API 응답 시간 (목표: 5초 이내)

## 6. 운영 체크

### 일일 점검
- [ ] 시스템 상태 확인
- [ ] 새로운 진단 신청 처리 확인
- [ ] 이메일 발송 상태 확인

### 주간 점검
- [ ] Google Sheets 데이터 백업
- [ ] Gemini API 사용량 확인
- [ ] 성능 지표 리뷰

### 월간 점검
- [ ] 전체 시스템 성능 분석
- [ ] 사용자 피드백 수집
- [ ] 개선사항 도출
