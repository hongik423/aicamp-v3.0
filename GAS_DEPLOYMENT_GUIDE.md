# 🚀 Google Apps Script 배포 가이드

## ✅ 수정 완료된 내용

### 1. doGet 함수 개선
- `action=getResult` 파라미터 처리 로직 추가
- 진단 결과 조회 기능 구현
- 에러 처리 및 로깅 강화

### 2. getDiagnosisResultIntegrated 함수 추가
- Google Sheets에서 진단 ID로 데이터 조회
- 다양한 시트명 지원 (AI_진단결과, AI진단결과, 진단결과 등)
- 구조화된 결과 데이터 반환

## 📋 배포 단계

### 1단계: Google Apps Script 에디터 접속
1. https://script.google.com 접속
2. 기존 스크립트 프로젝트 열기
3. 코드 편집기에서 전체 코드 선택 후 삭제

### 2단계: 새 코드 적용
1. `docs/aicamp_ultimate_gas_v14_integrated.js` 파일의 전체 내용 복사
2. Google Apps Script 에디터에 붙여넣기
3. Ctrl+S로 저장

### 3단계: 새 배포
1. **배포** 버튼 클릭
2. **새 배포** 선택
3. **유형 선택**: 웹 앱
4. **설명**: "진단 결과 조회 기능 추가 - v15.1"
5. **액세스 권한**: 모든 사용자
6. **배포** 클릭

### 4단계: 배포 URL 확인
- 새 배포 URL이 기존과 동일한지 확인
- 예상 URL: `https://script.google.com/macros/s/AKfycbxlwpifmXQEmFlR0QBV6NbTemzxTxvWwbaXNGmtH4Ok-a0PDEqmtaKBjQ1VvZxpLnPz/exec`

## 🧪 테스트 방법

### 즉시 테스트
```bash
# 프로젝트 루트에서 실행
node test-gas-data.js
```

### 수동 테스트
1. **헬스체크**: https://script.google.com/macros/s/AKfycbxlwpifmXQEmFlR0QBV6NbTemzxTxvWwbaXNGmtH4Ok-a0PDEqmtaKBjQ1VvZxpLnPz/exec
2. **진단 결과 조회**: https://script.google.com/macros/s/AKfycbxlwpifmXQEmFlR0QBV6NbTemzxTxvWwbaXNGmtH4Ok-a0PDEqmtaKBjQ1VvZxpLnPz/exec?diagnosisId=DIAG_1755334017156_BB9AKM5UJ&action=getResult

## 🎯 예상 결과

### 성공 시 응답
```json
{
  "success": true,
  "hasData": true,
  "diagnosisId": "DIAG_1755334017156_BB9AKM5UJ",
  "data": {
    "diagnosisId": "DIAG_1755334017156_BB9AKM5UJ",
    "status": "completed",
    "companyInfo": {
      "companyName": "테스트회사_1755334017156",
      "industry": "IT/소프트웨어",
      "employeeCount": "10-50명"
    },
    "diagnosisResult": {
      "overallScore": "85점",
      "aiCapability": "중급",
      "recommendations": "AI 도입 확대 권장"
    }
  },
  "timestamp": "2025-08-16T08:40:00.000Z",
  "branding": "이교장의AI역량진단보고서"
}
```

### 실패 시 응답 (데이터 없음)
```json
{
  "success": false,
  "hasData": false,
  "diagnosisId": "DIAG_1755332087748_cngr377x7",
  "message": "진단 ID 'DIAG_1755332087748_cngr377x7'에 해당하는 결과를 찾을 수 없습니다.",
  "error": "DIAGNOSIS_NOT_FOUND"
}
```

## 🔧 문제 해결

### 배포 후에도 문제가 지속되는 경우
1. **Google Apps Script 실행 기록 확인**
   - 실행 → 실행 기록에서 오류 로그 확인
   
2. **Google Sheets 데이터 확인**
   - https://docs.google.com/spreadsheets/d/1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ/edit
   - AI_진단결과 시트에 데이터가 있는지 확인
   
3. **권한 재설정**
   - Google Apps Script → 권한 검토 → 승인

## 📞 지원
- **관리자**: hongik423@gmail.com
- **문제 발생 시**: 실행 기록의 오류 메시지와 함께 연락
