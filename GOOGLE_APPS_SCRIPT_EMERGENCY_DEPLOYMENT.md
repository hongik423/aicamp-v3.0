# 🚨 Google Apps Script 긴급 배포 - GEMINI API 수정

## 📋 배포 현황
- **수정 사항**: GEMINI API `responseMimeType` 파라미터 제거
- **수정 파일**: `docs/modules/google_apps_script_perfect_V10.0.js`
- **배포 시간**: 2025-08-09 14:55 KST
- **긴급도**: 🔴 HIGH (AI 역량진단 시스템 중단 상태)

## 🔧 수정 내용
```javascript
// 수정 전 (오류 발생)
generationConfig: {
  temperature: env.TEMPERATURE,
  maxOutputTokens: env.MAX_OUTPUT_TOKENS,
  candidateCount: 1,
  topK: 40,
  topP: 0.95,
  responseMimeType: "application/json" // ❌ GEMINI 2.5 Flash 미지원
}

// 수정 후 (정상 작동)
generationConfig: {
  temperature: env.TEMPERATURE,
  maxOutputTokens: env.MAX_OUTPUT_TOKENS,
  candidateCount: 1,
  topK: 40,
  topP: 0.95
  // responseMimeType 제거 - GEMINI 2.5 Flash에서 지원하지 않음
}
```

## 📚 Google Apps Script 배포 절차

### 1단계: Google Apps Script 접속
1. 브라우저에서 https://script.google.com 접속
2. AICAMP AI 역량진단 프로젝트 선택
   - 프로젝트 ID: 현재 사용 중인 프로젝트
   - URL: https://script.google.com/macros/s/AKfycbxIRspmaBqr0tFEQ3Mp9hGIDh6uciIdPUekcezJtyhyumTzeqs6yuzba6u3sB1O5uSj/exec

### 2단계: 코드 전체 교체
1. **코드.gs** 파일 선택
2. 기존 코드 전체 선택 (Ctrl+A) 후 삭제
3. 아래 수정된 코드 전체 복사하여 붙여넣기

### 3단계: 저장 및 배포
1. **Ctrl+S** 또는 저장 버튼 클릭
2. **배포 > 새 배포** 클릭
3. **유형 선택**에서 ⚙️ 아이콘 클릭 → **웹 앱** 선택
4. 배포 설정:
   - **설명**: "GEMINI API 수정 - responseMimeType 제거 (V10.0.1)"
   - **실행 계정**: "나"
   - **액세스 권한**: "모든 사용자"
5. **배포** 버튼 클릭
6. **액세스 승인** 팝업에서 권한 허용

### 4단계: 환경변수 확인
**프로젝트 설정 > 스크립트 속성**에서 다음 값 확인:
```
SPREADSHEET_ID: 1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0
GEMINI_API_KEY: AIzaSy... (유효한 GEMINI API 키)
ADMIN_EMAIL: hongik423@gmail.com
```

## 🧪 배포 후 즉시 테스트

배포 완료 후 다음 명령어로 즉시 테스트:

```powershell
# PowerShell 테스트 명령어
$testData = @{
    action = "diagnosis"
    companyName = "긴급테스트회사"
    contactName = "테스터"
    email = "test@aicamp.club"
    phone = "010-0000-0000"
    industry = "IT/소프트웨어"
    employeeCount = "10-50명"
    assessmentResponses = @(
        @{ questionId = "leadership_1"; value = 5 }
        @{ questionId = "infrastructure_1"; value = 4 }
        @{ questionId = "employee_1"; value = 4 }
        @{ questionId = "culture_1"; value = 5 }
        @{ questionId = "practical_1"; value = 3 }
        @{ questionId = "data_1"; value = 4 }
    )
    region = "서울"
    businessDetails = "GEMINI API 수정 후 긴급 테스트"
    mainConcerns = @("AI 도입 전략 수립")
    expectedBenefits = @("업무 효율성 향상")
    privacyConsent = $true
    marketingConsent = $false
    submittedAt = (Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ")
    formType = "ai-capability-diagnosis"
}

$jsonData = $testData | ConvertTo-Json -Depth 10
Write-Host "🚀 GEMINI API 수정 후 테스트 시작..."
$response = Invoke-RestMethod -Uri "https://script.google.com/macros/s/AKfycbxIRspmaBqr0tFEQ3Mp9hGIDh6uciIdPUekcezJtyhyumTzeqs6yuzba6u3sB1O5uSj/exec" -Method POST -Body $jsonData -ContentType "application/json" -TimeoutSec 180

Write-Host "✅ 테스트 결과:"
$response | ConvertTo-Json -Depth 3
```

## ✅ 성공 시 예상 응답
```json
{
    "success": true,
    "diagnosisId": "AICAMP-XXXXX-XXXXX",
    "message": "AI 역량진단 보고서가 성공적으로 생성되었습니다",
    "processingTime": "45-120초",
    "emailSent": true,
    "adminNotified": true,
    "reportGenerated": true,
    "geminiAnalysis": "completed"
}
```

## 🚨 실패 시 점검 사항
1. **GEMINI API 키 유효성**: Google AI Studio에서 키 상태 확인
2. **API 할당량**: GEMINI API 사용량 확인
3. **Google Sheets 권한**: 스프레드시트 접근 권한 확인
4. **스크립트 속성**: 환경변수 올바른 설정 확인

## 📞 긴급 연락처
- **시스템 관리자**: hongik423@gmail.com
- **배포 상태**: 실시간 모니터링 중

---
**⚠️ 주의**: 이 배포는 AI 역량진단 시스템의 정상 작동을 위한 긴급 수정입니다.  
**🎯 목표**: GEMINI API 오류 해결 및 보고서 생성 기능 복구  
**📅 배포 완료 목표**: 2025-08-09 15:00 KST
