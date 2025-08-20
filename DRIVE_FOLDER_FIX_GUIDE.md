# 🗂️ Google Drive 폴더 문제 해결 가이드 (V16 Ollama)

## 📋 문제 상황
- AI 진단 보고서가 `AICAMP_REPORTS` Google Drive 폴더에 저장되지 않음
- Google Apps Script에서 Drive 폴더 접근 권한 문제 발생 가능

## 🔧 해결 단계

### 1단계: Google Apps Script 코드 업데이트
1. [Google Apps Script](https://script.google.com/) 접속
2. AICAMP 프로젝트 열기
3. `Code.gs` 파일의 **전체 내용을 삭제**
4. `docs/aicamp_ultimate_gas_v16_ollama_final.js` 파일의 **전체 내용을 복사**
5. `Code.gs`에 붙여넣기
6. **저장** (Ctrl+S)

### 2단계: 환경변수 설정
Google Apps Script 콘솔에서 다음 함수 실행:
```javascript
setupV16EnvironmentVariables()
```

### 3단계: Google Drive 폴더 문제 해결
Google Apps Script 콘솔에서 다음 함수들 **순서대로** 실행:

```javascript
// 1. Drive 폴더 문제 자동 해결
fixDriveFolderIssue()

// 2. 폴더 상태 확인
checkDriveFolderStatus()

// 3. 테스트 파일 업로드 (수정됨 - getSharingUrl 오류 해결)
testFileUpload()
```

### 4단계: 웹 앱 재배포
1. Google Apps Script에서 **배포** → **새 배포**
2. **유형**: 웹 앱
3. **액세스 권한**: 모든 사용자
4. **실행자**: 나
5. **배포** 클릭
6. **새 웹 앱 URL 복사**

### 5단계: Next.js 환경변수 업데이트
`.env.local` 파일에서:
```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=새로_복사한_웹앱_URL
```

## 🧪 테스트 방법

### 브라우저에서 테스트
1. [AI 진단 페이지](https://aicamp.club/ai-diagnosis) 접속
2. 진단 폼 작성 및 제출
3. 실시간 진행상황 모니터링
4. 완료 후 이메일 확인
5. Google Drive 폴더에서 HTML 보고서 확인

### API 직접 테스트
```bash
curl -X POST http://localhost:3000/api/ai-diagnosis \
  -H "Content-Type: application/json" \
  -d '{
    "type": "diagnosis",
    "action": "diagnosis",
    "companyName": "테스트회사",
    "contactEmail": "test@example.com",
    "assessmentResponses": {"1": 5, "2": 5, "3": 5}
  }'
```

## ✅ 성공 확인 사항

### Google Apps Script 콘솔에서:
- ✅ `setupV16EnvironmentVariables()` 실행 성공
- ✅ `fixDriveFolderIssue()` 실행 성공
- ✅ `checkDriveFolderStatus()` 실행 성공
- ✅ `testFileUpload()` 실행 성공 (TypeError 없음)

### Google Drive에서:
- ✅ `AICAMP_REPORTS` 폴더 존재
- ✅ 폴더 공유 설정: "링크가 있는 모든 사용자"
- ✅ 테스트 파일 업로드 성공
- ✅ HTML 보고서 파일 생성

### 이메일에서:
- ✅ 진단 완료 이메일 수신
- ✅ HTML 보고서 첨부파일 확인

## 🚨 주의사항

1. **코드 업데이트 필수**: 반드시 `docs/aicamp_ultimate_gas_v16_ollama_final.js`의 최신 내용으로 교체
2. **순서 준수**: 함수 실행 순서를 정확히 따라야 함
3. **권한 확인**: Google Drive 폴더 접근 권한 확인
4. **Ollama 서버**: 로컬 Ollama 서버가 실행 중인지 확인

## 🔍 문제 해결

### 오류 발생 시:
1. Google Apps Script 콘솔에서 오류 메시지 확인
2. `checkDriveFolderStatus()` 실행하여 폴더 상태 점검
3. `fixDriveFolderIssue()` 재실행
4. 필요시 폴더 ID 수동 설정

### 로그 확인:
- Google Apps Script 실행 로그에서 상세 오류 정보 확인
- Next.js 개발 서버 로그에서 API 호출 상태 확인

---

**📞 문제가 지속되면 상세한 오류 메시지와 함께 문의해주세요.**
