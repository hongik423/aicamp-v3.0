# AICAMP AI 역량진단 시스템 설치 가이드

## 📋 목차
1. [시스템 요구사항](#시스템-요구사항)
2. [설치 과정](#설치-과정)
3. [환경 설정](#환경-설정)
4. [웹앱 배포](#웹앱-배포)
5. [테스트 및 검증](#테스트-및-검증)
6. [문제 해결](#문제-해결)
7. [운영 가이드](#운영-가이드)

## 🔧 시스템 요구사항

### 필수 요구사항
- Google 계정 (Google Workspace 권장)
- Google Apps Script 접근 권한
- Google Sheets API 활성화
- Gmail API 활성화 (이메일 발송용)
- GEMINI API 키 (Google AI Studio에서 발급)

### 권장 사양
- 안정적인 인터넷 연결
- Chrome 브라우저 최신 버전
- 관리자 권한이 있는 Google 계정

## 📥 설치 과정

### 1단계: Google Apps Script 프로젝트 생성

1. [Google Apps Script](https://script.google.com) 접속
2. "새 프로젝트" 클릭
3. 프로젝트 이름을 "AICAMP_AI_역량진단_시스템"으로 변경

### 2단계: 코드 복사

1. `modules` 폴더의 각 파일을 순서대로 복사:
   ```
   1_config_and_env.js
   2_utilities.js
   3_ai_evaluation.js
   4_swot_analysis.js
   5_matrix_analysis.js
   6_roadmap_roi.js
   7_gemini_report.js
   8_email_data.js
   9_main_api.js
   ```

2. Google Apps Script 에디터에 붙여넣기
   - 기존 코드 모두 삭제
   - 위 순서대로 코드 붙여넣기

### 3단계: Google Sheets 생성

1. [Google Sheets](https://sheets.google.com)에서 새 스프레드시트 생성
2. 스프레드시트 이름: "AICAMP_AI_역량진단_데이터"
3. URL에서 스프레드시트 ID 복사
   ```
   https://docs.google.com/spreadsheets/d/[이 부분이 스프레드시트 ID]/edit
   ```

## ⚙️ 환경 설정

### 1단계: GEMINI API 키 발급

1. [Google AI Studio](https://makersuite.google.com/app/apikey) 접속
2. "Create API Key" 클릭
3. API 키 복사

### 2단계: 환경변수 설정

Google Apps Script 에디터에서:

1. 실행 버튼 옆 함수 선택에서 `setupEnvironmentVariables` 선택
2. 실행 버튼 클릭
3. 권한 요청 시 승인

### 3단계: 스크립트 속성 설정

1. 프로젝트 설정 > 스크립트 속성
2. 다음 속성 추가:

| 속성 이름 | 값 | 설명 |
|----------|-----|------|
| SPREADSHEET_ID | [복사한 시트 ID] | Google Sheets ID |
| GEMINI_API_KEY | [발급받은 API 키] | GEMINI API 키 |
| ADMIN_EMAIL | [관리자 이메일] | 알림 받을 이메일 |
| DEBUG_MODE | false | 디버그 모드 (운영 시 false) |
| AUTO_REPLY_ENABLED | true | 자동 이메일 발송 |

### 4단계: 시트 초기화

```javascript
// Google Apps Script 에디터에서 실행
initializeSheets();
```

## 🌐 웹앱 배포

### 1단계: 새 배포 생성

1. 상단 메뉴 > 배포 > 새 배포
2. 설정:
   - 유형: 웹앱
   - 설명: AICAMP AI 역량진단 시스템 v1.0
   - 다음 사용자로 실행: 나
   - 액세스 권한: 모든 사용자

3. 배포 클릭

### 2단계: 배포 ID 설정

1. 배포 완료 후 나타나는 URL에서 ID 복사:
   ```
   https://script.google.com/macros/s/[이 부분이 DEPLOYMENT_ID]/exec
   ```

2. 스크립트 속성에 추가:
   - 속성 이름: DEPLOYMENT_ID
   - 값: [복사한 ID]

### 3단계: 권한 설정

1. 첫 실행 시 권한 요청 화면 표시
2. "고급" 클릭 > "안전하지 않은 페이지로 이동" 클릭
3. 필요한 모든 권한 승인

## 🧪 테스트 및 검증

### 1단계: 시스템 테스트

```javascript
// Google Apps Script 에디터에서 실행
testCompleteSystem();
```

예상 결과:
```
✅ 환경변수 정상
✅ 시트 연결 성공
✅ 테스트 데이터 생성 완료
✅ 진단 완료!
- 진단 ID: ACD-1234567890-abc
- 종합 점수: 75
- 등급: B
- AI 성숙도: 확산적용
- 예상 ROI: 180%
```

### 2단계: 웹 인터페이스 테스트

1. 배포 URL 접속
2. 시스템 상태 페이지 확인
3. 모든 상태 표시등이 녹색인지 확인

### 3단계: API 테스트

```javascript
// 브라우저 콘솔에서 실행
fetch('https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    formType: 'ai-diagnosis',
    companyName: 'API테스트회사',
    industry: '제조업',
    contactName: '테스트',
    email: 'test@example.com',
    phone: '010-0000-0000'
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

## 🔧 문제 해결

### 일반적인 오류와 해결방법

#### 1. "ScriptError: Authorization is required"
- 원인: 권한 미승인
- 해결: 스크립트 실행 시 권한 승인

#### 2. "API 키가 설정되지 않았습니다"
- 원인: GEMINI_API_KEY 미설정
- 해결: 스크립트 속성에서 API 키 설정

#### 3. "시트를 찾을 수 없습니다"
- 원인: 잘못된 SPREADSHEET_ID
- 해결: 올바른 스프레드시트 ID 확인 및 설정

#### 4. "Rate limit exceeded"
- 원인: API 호출 한도 초과
- 해결: 잠시 대기 후 재시도

### 디버그 모드 활성화

문제 해결을 위해 디버그 모드 활성화:
```javascript
// 스크립트 속성에서 DEBUG_MODE를 true로 설정
```

## 📊 운영 가이드

### 일일 점검 사항

1. **시스템 상태 확인**
   - 웹앱 URL 접속하여 상태 확인
   - 모든 서비스 정상 작동 확인

2. **데이터 시트 확인**
   - 신규 진단 신청 확인
   - 오류 로그 확인

3. **이메일 할당량 확인**
   ```javascript
   MailApp.getRemainingDailyQuota()
   ```

### 주간 유지보수

1. **성능 모니터링**
   - 평균 처리 시간 확인
   - 오류율 분석

2. **데이터 백업**
   - Google Sheets 자동 백업 확인
   - 보고서 파일 정리

3. **API 사용량 확인**
   - GEMINI API 사용량 모니터링
   - 비용 최적화

### 월간 업데이트

1. **시스템 업데이트**
   - 새로운 기능 추가
   - 버그 수정

2. **보고서 품질 개선**
   - 프롬프트 최적화
   - 새로운 분석 항목 추가

## 📞 지원 및 문의

### 기술 지원
- 이메일: hongik423@gmail.com
- 전화: 010-9251-9743

### 추가 리소스
- [Google Apps Script 문서](https://developers.google.com/apps-script)
- [GEMINI API 문서](https://ai.google.dev/docs)
- [AICAMP 웹사이트](https://aicamp.ai)

### 라이선스
이 시스템은 AICAMP 전용 솔루션입니다.
무단 복제 및 배포를 금지합니다.

---

© 2025 AICAMP. All rights reserved.