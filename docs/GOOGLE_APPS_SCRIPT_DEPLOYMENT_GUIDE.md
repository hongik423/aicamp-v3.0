# 🚀 Google Apps Script 배포 가이드 (V17.0 간소화 시스템)

## 📋 개요

이 가이드는 **이교장의AI역량진단시스템 V17.0 간소화** 버전을 Google Apps Script에 배포하는 방법을 설명합니다.

---

## 🎯 배포 목표

### ✅ **배포 후 달성할 기능**

1. **AI 역량진단 워크플로우** (45문항 BARS 시스템)
2. **상담신청 워크플로우**
3. **오류신고 워크플로우**
4. **시스템 헬스체크**
5. **오류 처리 및 복구 메커니즘**

---

## 🛠️ 배포 단계

### 1단계: Google Apps Script 콘솔 접속

```bash
# 1. 브라우저에서 다음 URL 접속
https://script.google.com/

# 2. Google 계정으로 로그인
# 3. 새 프로젝트 생성 버튼 클릭
```

### 2단계: 프로젝트 설정

```bash
# 1. 프로젝트 이름 변경
# 기본: "Untitled project"
# 변경: "AICAMP_V17_Simplified_System"

# 2. Code.gs 파일 선택 (기본 파일)
# 3. 기존 코드 전체 삭제 (Ctrl+A, Delete)
```

### 3단계: V17.0 코드 업로드

```bash
# 1. docs/250821_aicamp_simplified_v17.js 파일 열기
# 2. 전체 내용 복사 (Ctrl+A, Ctrl+C)
# 3. Google Apps Script Code.gs에 붙여넣기 (Ctrl+V)
# 4. 저장 (Ctrl+S)
```

### 4단계: 환경변수 설정

```bash
# 1. Google Apps Script 콘솔에서 다음 함수 실행
function setupV17EnvironmentVariables() {
  // 자동으로 환경변수 설정
  // SPREADSHEET_ID, ADMIN_EMAIL, AICAMP_WEBSITE 등
}

# 2. 실행 버튼 클릭
# 3. 권한 허용 (필요시)
```

### 5단계: 웹 앱 배포

```bash
# 1. 배포 > 새 배포 클릭
# 2. 유형: 웹 앱 선택
# 3. 설명: "V17.0 간소화 시스템 - AI 역량진단"
# 4. 실행: 나 (me)
# 5. 액세스: 모든 사용자
# 6. 배포 버튼 클릭
```

### 6단계: 스크립트 ID 추출

```bash
# 1. 배포 완료 후 URL 복사
# 예시: https://script.google.com/macros/s/1w8yHheAjhFqvNVvcRQp8wR06YlAR2qv36nTbtvgi7YiwoJ-RCZbc0GiM/exec

# 2. 스크립트 ID 추출
# URL에서 /s/ 와 /exec 사이의 문자열
# 예시: 1w8yHheAjhFqvNVvcRQp8wR06YlAR2qv36nTbtvgi7YiwoJ-RCZbc0GiM
```

### 7단계: 테스트 설정 업데이트

```bash
# 1. test/run-v17-simulation-test.js 파일 열기
# 2. SCRIPT_ID 값을 실제 ID로 변경
const SCRIPT_ID = '실제_스크립트_ID_입력';

# 3. 저장
```

---

## 🔧 환경변수 설정 상세

### 필수 환경변수

```javascript
// Google Apps Script에서 자동 설정됨
SPREADSHEET_ID = 'your_spreadsheet_id'
ADMIN_EMAIL = 'hongik423@gmail.com'
AICAMP_WEBSITE = 'https://aicamp.club'
SYSTEM_VERSION = 'V17.0-SIMPLIFIED-FIXED'
```

### Google Sheets 설정

```bash
# 1. 새 Google Sheets 생성
# 2. 다음 시트들 생성:
#    - AI역량진단_신청데이터
#    - AI역량진단_45문항응답
#    - AI역량진단_카테고리분석
#    - 상담신청
#    - 오류신고
#    - 시스템로그
#    - 진행상황모니터링
#    - ERROR_LOG

# 3. 스프레드시트 ID 복사 (URL에서 추출)
# 4. 환경변수에 설정
```

---

## 🧪 배포 후 테스트

### 1. 헬스체크 테스트

```bash
# 브라우저에서 직접 테스트
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# 예상 결과:
{
  "success": true,
  "status": "active",
  "version": "V17.0-SIMPLIFIED-FIXED",
  "branding": "이교장의AI역량진단시스템",
  "environment": "production"
}
```

### 2. Node.js 테스트 실행

```bash
# 1. 스크립트 ID 업데이트 후
node test/run-v17-simulation-test.js

# 2. 예상 결과:
# ✅ 성공: 5/5
# 📈 성공률: 100.0%
# 🎯 전체 상태: ✅ 우수
```

---

## 🔧 문제 해결

### 1. 권한 오류

```bash
# 해결 방법:
1. Google Apps Script 콘솔에서 권한 확인
2. 스프레드시트 공유 설정 확인
3. 환경변수 재설정
```

### 2. 배포 오류

```bash
# 해결 방법:
1. 새 버전으로 배포
2. 캐시 삭제 후 재시도
3. URL 재생성
```

### 3. 404/500 오류

```bash
# 해결 방법:
1. 스크립트 ID 확인
2. 배포 상태 확인
3. 코드 문법 오류 확인
```

---

## 📊 배포 확인 체크리스트

### ✅ **배포 전 확인사항**

- [ ] Google Apps Script 프로젝트 생성
- [ ] V17.0 코드 업로드 완료
- [ ] 환경변수 설정 완료
- [ ] Google Sheets 생성 및 설정
- [ ] 웹 앱 배포 완료
- [ ] 스크립트 ID 추출 완료

### ✅ **배포 후 확인사항**

- [ ] 헬스체크 API 정상 응답
- [ ] AI 역량진단 워크플로우 테스트 통과
- [ ] 상담신청 워크플로우 테스트 통과
- [ ] 오류신고 워크플로우 테스트 통과
- [ ] 오류 처리 및 복구 테스트 통과
- [ ] 이메일 발송 테스트 완료

---

## 🎉 배포 완료 후

### 📈 **성능 모니터링**

```bash
# 1. 응답시간 모니터링
# 2. 오류율 모니터링
# 3. 사용량 모니터링
# 4. 이메일 발송 상태 확인
```

### 🔄 **정기 점검**

```bash
# 1. 주간 성능 리뷰
# 2. 월간 오류 분석
# 3. 분기별 기능 업데이트
# 4. 연간 시스템 안정성 평가
```

---

## 📞 지원

### 🆘 **문제 발생 시**

1. **기술 지원**: hongik423@gmail.com
2. **문서**: docs/V17_TEST_EXECUTION_GUIDE.md
3. **테스트**: test/run-v17-simulation-test.js

### 📋 **배포 정보**

- **시스템**: 이교장의AI역량진단시스템
- **버전**: V17.0-SIMPLIFIED-FIXED
- **플랫폼**: Google Apps Script
- **배포일**: 2025-01-21
- **담당자**: 이교장

---

**📧 문의**: hongik423@gmail.com  
**🌐 웹사이트**: aicamp.club  
**📦 버전**: V17.0-SIMPLIFIED-FIXED  
**📅 작성일**: 2025-01-21  

---

*이 가이드는 V17.0 간소화 시스템의 Google Apps Script 배포를 위한 참고 자료입니다.*
