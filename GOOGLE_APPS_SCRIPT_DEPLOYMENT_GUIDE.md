# Google Apps Script 배포 가이드

## 🚀 Google Apps Script 배포 단계

### 1. Google Apps Script 프로젝트 생성
1. [Google Apps Script](https://script.google.com/) 접속
2. "새 프로젝트" 클릭
3. 프로젝트 이름을 "AICAMP AI 역량진단 시스템 V5.0"으로 설정

### 2. 코드 복사 및 붙여넣기
1. `docs/google_apps_script_COMPLETE_V5.0_ENHANCED.js` 파일의 전체 내용을 복사
2. Google Apps Script 편집기의 `Code.gs` 파일에 붙여넣기

### 3. 환경변수 설정
Google Apps Script의 "설정" → "스크립트 속성"에서 다음 변수들을 설정:

```
SPREADSHEET_ID=1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0
GEMINI_API_KEY=AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM
ADMIN_EMAIL=hongik423@gmail.com
SCRIPT_ID=1mi6DVh9EsVBO7IK5dUUmQpbkqPhuBIcYtLsaE9STfp9_KeZfD9nAw8zj
DEPLOYMENT_ID=AKfycbxIRspmaBqr0tFEQ3Mp9hGIDh6uciIdPUekcezJtyhyumTzeqs6yuzba6u3sB1O5uSj
DEBUG_MODE=false
AUTO_REPLY_ENABLED=true
AI_MODEL=gemini-2.0-flash-exp
MAX_RETRIES=3
REPORT_LANGUAGE=ko
```

### 4. 배포 설정
1. "배포" → "새 배포" 클릭
2. 배포 유형: "웹 앱"
3. 실행 대상: "나"
4. 액세스 권한: "모든 사용자"
5. "배포" 클릭

### 5. 웹 앱 URL 복사
배포 후 생성된 웹 앱 URL을 복사하여 환경변수에 설정:

```
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/[DEPLOYMENT_ID]/exec
```

### 6. 테스트 실행
배포 후 다음 명령어로 테스트:

```bash
node test-simulation.js
```

## 🔧 수정된 오류들

### 1. 텍스트 오류 수정
- `통통합` → `통합` (line 166)
- `마련되어어` → `마련되어` (line 174)

### 2. 환경변수 설정
- Google Apps Script URL이 올바르게 설정되었는지 확인
- Gemini API 키가 유효한지 확인
- Google Sheets ID가 올바른지 확인

## 📋 배포 확인 체크리스트

- [ ] Google Apps Script 프로젝트 생성
- [ ] 코드 복사 및 붙여넣기 완료
- [ ] 환경변수 설정 완료
- [ ] 웹 앱 배포 완료
- [ ] 웹 앱 URL 복사
- [ ] 환경변수 업데이트
- [ ] 테스트 실행 및 성공 확인

## 🚨 주의사항

1. **API 키 보안**: Gemini API 키를 공개하지 마세요
2. **배포 권한**: 웹 앱 배포 시 "모든 사용자" 권한 설정
3. **환경변수**: 배포 후 새로운 URL로 환경변수 업데이트 필요
4. **테스트**: 배포 후 반드시 테스트 실행하여 정상 동작 확인

## 📞 문제 해결

배포 중 문제가 발생하면:
1. Google Apps Script 콘솔에서 오류 확인
2. 환경변수 설정 재확인
3. 웹 앱 배포 권한 확인
4. API 키 유효성 확인 