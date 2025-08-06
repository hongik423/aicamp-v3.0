# 🚨 AI 역량진단 시스템 시트 오류 해결 가이드

## 📋 문제 상황
```
Error: 시트를 찾을 수 없습니다: AI_역량진단신청
```

## 🎯 원인 분석
1. **브랜드 통일 과정**에서 시트 이름이 "AI_무료진단신청" → "AI_역량진단신청"으로 변경됨
2. **Google Sheets**에 새로운 시트명이 생성되지 않음
3. **Google Apps Script**에서 시트를 찾지 못해 오류 발생

## 🔧 해결 방법

### 1단계: Google Apps Script 수정 및 배포

#### 1.1 Google Apps Script 에디터 열기
```
https://script.google.com/home/projects/1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj
```

#### 1.2 수정된 코드 적용
1. 기존 `Code.gs` 파일 내용을 백업
2. `docs/google_apps_script_FIX_SHEET_ISSUE.js` 내용을 추가로 붙여넣기
3. 또는 기존 `saveDiagnosisApplication` 함수를 다음과 같이 수정:

```javascript
function saveDiagnosisApplication(spreadsheet, diagnosisId, appData, evalData) {
  let sheet = spreadsheet.getSheetByName(SHEETS.DIAGNOSIS);
  
  // 시트가 없으면 자동 생성
  if (!sheet) {
    console.log(`📄 시트 생성: ${SHEETS.DIAGNOSIS}`);
    sheet = spreadsheet.insertSheet(SHEETS.DIAGNOSIS);
    
    // 헤더 설정
    const headers = [
      '진단ID', '신청일시', '회사명', '업종', '담당자명', '이메일', '연락처',
      '종합점수', '등급', '성숙도', '보고서URL', '주요고민사항', '예상혜택',
      '상담분야', '개인정보동의', '처리완료일시', '처리상태'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground('#667eea')
      .setFontColor('#ffffff')
      .setFontWeight('bold');
  }
  
  // 데이터 저장 로직 계속...
}
```

#### 1.3 새 배포 생성
1. **배포** → **새 배포** 클릭
2. **설명**: "시트 자동 생성 기능 추가"
3. **배포** 클릭
4. 새로운 배포 URL 확인

### 2단계: 시스템 초기화 실행

#### 2.1 Google Apps Script에서 직접 실행
```javascript
// Apps Script 에디터에서 실행
function runSystemInitialization() {
  const result = initializeAllSheets();
  console.log(result);
}
```

#### 2.2 또는 수동으로 시트 생성
Google Sheets에서 직접 다음 시트들을 생성:

1. **AI_역량진단신청** (17개 컬럼)
   - 진단ID, 신청일시, 회사명, 업종, 담당자명, 이메일, 연락처, 종합점수, 등급, 성숙도, 보고서URL, 주요고민사항, 예상혜택, 상담분야, 개인정보동의, 처리완료일시, 처리상태

2. **AI_역량평가결과** (16개 컬럼)
3. **상담신청** (10개 컬럼)
4. **베타피드백** (9개 컬럼)

### 3단계: 환경변수 확인

#### 3.1 .env.local 파일 확인
```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxIRspmaBqr0tFEQ3Mp9hGIDh6uciIdPUekcezJtyhyumTzeqs6yuzba6u3sB1O5uSj/exec
NEXT_PUBLIC_GOOGLE_SHEETS_ID=1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0
```

#### 3.2 Vercel 환경변수 확인
```bash
vercel env ls
```

### 4단계: 테스트 실행

#### 4.1 로컬 테스트
```bash
npm run dev
```

#### 4.2 AI 역량진단 신청 테스트
1. `http://localhost:3000/diagnosis` 접속
2. 테스트 데이터로 신청 진행
3. 콘솔에서 오류 메시지 확인

#### 4.3 Google Sheets 확인
- 새로운 데이터가 "AI_역량진단신청" 시트에 저장되는지 확인

## 🔍 추가 디버깅

### Google Apps Script 로그 확인
```javascript
// Apps Script 에디터에서 실행하여 로그 확인
function debugSheets() {
  const spreadsheet = SpreadsheetApp.openById('1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0');
  const sheets = spreadsheet.getSheets();
  
  console.log('현재 시트 목록:');
  sheets.forEach(sheet => {
    console.log(`- ${sheet.getName()}`);
  });
  
  // AI_역량진단신청 시트 확인
  const diagnosisSheet = spreadsheet.getSheetByName('AI_역량진단신청');
  console.log('AI_역량진단신청 시트 존재:', diagnosisSheet !== null);
}
```

### API 응답 확인
```javascript
// 브라우저 개발자 도구에서 실행
fetch('/api/ai-capability-diagnosis', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    companyName: 'Test Company',
    email: 'test@example.com',
    applicantName: 'Test User',
    privacyConsent: true,
    assessmentResponses: { q1: 3, q2: 4 }
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
```

## ✅ 해결 확인 체크리스트

- [ ] Google Apps Script에 시트 자동 생성 코드 추가
- [ ] 새 배포 생성 및 URL 확인
- [ ] Google Sheets에 "AI_역량진단신청" 시트 존재 확인
- [ ] 환경변수 올바른 URL 설정 확인
- [ ] 로컬 테스트에서 오류 없이 진단 신청 완료
- [ ] Google Sheets에 데이터 정상 저장 확인
- [ ] Vercel 배포 후 프로덕션 테스트 완료

## 🚀 완료 후 확인사항

1. **시스템 안정성**: 여러 번 연속 진단 신청 테스트
2. **데이터 무결성**: 저장된 데이터 형식 및 내용 확인
3. **이메일 발송**: 진단 완료 이메일 정상 발송 확인
4. **관리자 알림**: 관리자에게 신규 신청 알림 확인

---

**문제가 지속될 경우**: Google Apps Script의 실행 로그를 확인하고, 스프레드시트 권한 설정을 다시 검토해주세요.