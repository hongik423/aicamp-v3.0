# 🔧 GEMINI API 오류 수정 - Google Apps Script 긴급 배포 가이드

## 🚨 문제 상황
- AI 역량진단 시스템에서 GEMINI API 호출 시 `responseMimeType` 파라미터 오류 발생
- 오류 메시지: `Invalid JSON payload received. Unknown name "responseMimeType"`
- GEMINI 2.5 Flash 모델에서 해당 파라미터를 지원하지 않음

## ✅ 수정 완료 사항
- `docs/modules/google_apps_script_perfect_V10.0.js` 파일에서 `responseMimeType` 파라미터 제거
- 라인 1921: `responseMimeType: "application/json"` → 주석 처리 및 제거

## 📋 Google Apps Script 배포 절차

### 1단계: Google Apps Script 접속
1. https://script.google.com 접속
2. AICAMP AI 역량진단 프로젝트 선택

### 2단계: 코드 업데이트
1. 기존 코드를 모두 삭제
2. `docs/modules/google_apps_script_perfect_V10.0.js` 파일의 전체 내용을 복사하여 붙여넣기

### 3단계: 배포
1. **배포 > 새 배포** 클릭
2. **유형 선택 > 웹 앱** 선택
3. 설정:
   - 설명: "GEMINI API 오류 수정 - responseMimeType 제거"
   - 실행 계정: "나"
   - 액세스 권한: "모든 사용자"
4. **배포** 클릭

### 4단계: 환경변수 확인
**프로젝트 설정 > 스크립트 속성**에서 다음 값들이 설정되어 있는지 확인:
- `SPREADSHEET_ID`: Google Sheets ID
- `GEMINI_API_KEY`: 유효한 GEMINI API 키
- `ADMIN_EMAIL`: 관리자 이메일 (hongik423@gmail.com)

## 🧪 테스트 방법

배포 완료 후 다음 PowerShell 명령어로 테스트:

```powershell
$testData = @{
    action = "diagnosis"
    companyName = "테스트회사"
    contactName = "홍길동"
    email = "test@example.com"
    phone = "010-1234-5678"
    industry = "IT/소프트웨어"
    employeeCount = "10-50명"
    assessmentResponses = @(
        @{ questionId = "leadership_1"; value = 4 }
        @{ questionId = "infrastructure_1"; value = 3 }
        @{ questionId = "employee_1"; value = 4 }
        @{ questionId = "culture_1"; value = 5 }
        @{ questionId = "practical_1"; value = 3 }
        @{ questionId = "data_1"; value = 4 }
    )
    region = "서울"
    businessDetails = "AI 기반 솔루션 개발 및 제공"
    mainConcerns = @("AI 도입 전략 수립")
    expectedBenefits = @("업무 효율성 향상")
    privacyConsent = $true
    marketingConsent = $false
    submittedAt = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ")
    formType = "ai-capability-diagnosis"
}

$jsonData = $testData | ConvertTo-Json -Depth 10
Invoke-RestMethod -Uri "https://script.google.com/macros/s/AKfycbxIRspmaBqr0tFEQ3Mp9hGIDh6uciIdPUekcezJtyhyumTzeqs6yuzba6u3sB1O5uSj/exec" -Method POST -Body $jsonData -ContentType "application/json" -TimeoutSec 120
```

## ✅ 예상 결과
```json
{
    "success": true,
    "diagnosisId": "AICAMP-XXXXX-XXXXX",
    "message": "AI 역량진단 보고서가 성공적으로 생성되었습니다",
    "processingTime": "45초",
    "emailSent": true,
    "adminNotified": true
}
```

## 🚨 주의사항
- GEMINI API 키가 유효하고 할당량이 남아있는지 확인
- Google Sheets 접근 권한이 올바르게 설정되어 있는지 확인
- 배포 후 웹 앱 URL이 변경되지 않았는지 확인

## 📞 문제 발생 시
1. Google Apps Script 실행 로그 확인
2. GEMINI API 할당량 및 키 유효성 확인
3. Google Sheets 권한 설정 재확인

---
**수정 일시:** 2025-08-09 14:50 KST  
**수정자:** AI Assistant  
**버전:** V10.0.1 (GEMINI API 호환성 수정)
