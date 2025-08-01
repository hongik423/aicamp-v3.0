# AI CAMP PDF 첨부 기능 설치 가이드

## 🎯 새로운 기능: PDF 첨부 이메일 발송

**AI 무료진단 신청 시 진단 결과보고서 PDF를 신청자에게 이메일 첨부로 자동 발송하는 기능이 추가되었습니다!**

### ✨ 주요 기능
- ✅ **진단 신청 접수** → 구글시트 자동 저장
- ✅ **PDF 결과보고서 생성** → 웹사이트에서 자동 생성
- ✅ **신청자 확인 메일** → PDF 첨부해서 발송
- ✅ **관리자 알림 메일** → 구글시트 링크 포함
- ✅ **자동 헤더 관리** → 시트 생성 및 데이터 정리

## 🚀 설치 방법 (업데이트된 버전)

### 1단계: 기존 Google Apps Script 교체

1. **Google Apps Script 접속**
   - https://script.google.com 방문
   - 기존 프로젝트 열기 또는 새 프로젝트 생성

2. **새 코드로 교체**
   - `Code.gs` 파일의 모든 내용 삭제
   - `docs/google_apps_script_SIMPLE_WORKING_VERSION.js` 파일 내용 복사
   - `Code.gs`에 붙여넣기

### 2단계: 설정 확인

**코드 상단의 설정값들 확인:**
```javascript
const SPREADSHEET_ID = '1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0';
const ADMIN_EMAIL = 'hongik423@gmail.com';
const COMPANY_NAME = 'AI CAMP';
const CONSULTANT_NAME = '이후경 교장';
```

### 3단계: 권한 승인 및 배포

1. **권한 승인**
   - 함수 선택: `testSystemStatus`
   - 실행 버튼 클릭
   - Gmail, Google Sheets 권한 모두 승인

2. **웹앱 재배포**
   - "배포" → "배포 관리" → "편집" 버튼
   - 새 버전으로 업데이트
   - **새 웹앱 URL 복사**

### 4단계: 웹사이트 환경변수 업데이트

```bash
# .env.local 파일 수정
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=새로운_웹앱_URL
```

## 🧪 테스트 방법

### Google Apps Script에서 직접 테스트

```javascript
// 1. 시스템 상태 점검
testSystemStatus()

// 2. 일반 진단 신청 테스트
testDiagnosisSubmission()

// 3. PDF 첨부 진단 신청 테스트
testDiagnosisWithPdfAttachment()

// 4. PDF 검증 기능 테스트
testPdfValidation()
```

### 웹사이트에서 실제 테스트

1. **진단 완료 후 결과 페이지에서**
2. **"📧 PDF 결과보고서 이메일 발송" 버튼 클릭**
3. **이메일 확인** - PDF 첨부된 메일 수신 확인

## 📄 PDF 첨부 메일 내용

### 신청자가 받는 메일
```
제목: [AI CAMP] AI 무료진단 결과보고서 - 홍길동님 (85점)

🎉 AI 무료진단이 완료되어 결과보고서를 첨부해 드립니다.

📋 진단 결과:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 진단일시: 2025. 01. 27. 오후 03:45:12
🏢 회사명: 테스트회사
👤 담당자: 홍길동님  
📧 이메일: test@example.com
🎯 진단점수: 85점
📄 첨부파일: AI 무료진단 결과보고서.pdf
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 진단 결과 활용법:
• 현재 AI 도입 준비도를 파악하세요
• 우선 개선 영역을 확인하세요
• 맞춤형 AI 솔루션을 검토하세요

📞 전문가 상담:
• 담당 전문가: 이후경 교장
• 무료 상담: 24시간 내 연락 예정
• 추가 문의: hongik423@gmail.com
```

### 관리자가 받는 메일
```
제목: [AI CAMP] 새로운 AI 무료진단 접수 - 테스트회사 (85점)

새로운 AI 무료진단이 접수되었습니다.

📊 진단 정보:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 접수일시: 2025. 01. 27. 오후 03:45:12
🏢 회사명: 테스트회사
👤 담당자: 홍길동
📧 이메일: test@example.com
🎯 진단점수: 85점
📊 시트위치: 5행

📄 **구글시트 바로가기:**
https://docs.google.com/spreadsheets/d/1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0

🎯 후속 조치:
1. 24시간 내 신청자에게 후속 상담 연락
2. 맞춤형 AI 도입 컨설팅 제안  
3. 전문가 상담 일정 조율
```

## 📊 구글시트 데이터 구조

**새로 추가된 컬럼:**
- **L열: PDF첨부상태** - 'PDF첨부됨' 또는 'PDF없음'

**전체 컬럼 구조:**
```
A: 접수일시
B: 회사명  
C: 업종
D: 담당자명
E: 연락처
F: 이메일
G: 총점
H: 처리상태
I: 관리자메모
J: 상세점수
K: 진단보고서
L: PDF첨부상태 (🆕 새로 추가)
```

## 🔧 기술적 세부사항

### PDF 처리 과정
1. **웹사이트**: 진단 결과를 HTML로 생성 → PDF 변환 → base64 인코딩
2. **전송**: Google Apps Script로 진단 데이터 + PDF base64 전송
3. **처리**: base64 → Blob 변환 → Gmail 첨부파일로 발송
4. **검증**: PDF 크기 제한 (25MB), 형식 검증

### 에러 처리
- PDF 생성 실패 시 → 일반 확인 메일로 발송
- PDF 크기 초과 시 → 별도 발송 안내
- 네트워크 오류 시 → 재시도 메커니즘

### 보안 고려사항
- Base64 인코딩으로 안전한 전송
- Gmail API 권한 기반 발송
- 개인정보 처리 로그 기록

## 🚨 문제 해결

### PDF 첨부가 안 될 때
1. **PDF 크기 확인**: 25MB 미만인지 확인
2. **권한 확인**: Gmail API 권한 재승인
3. **데이터 확인**: PDF base64 데이터 유효성 검증

### 이메일이 안 올 때
1. **스팸 폴더 확인**
2. **Gmail 권한 재승인**
3. **관리자 이메일 주소 확인**

### 구글시트에 데이터가 안 들어갈 때
1. **SPREADSHEET_ID 확인**
2. **Google Sheets 권한 확인**
3. **시트 이름 확인** (`AI_무료진단신청`)

## ✅ 완료 체크리스트

- [ ] Google Apps Script 코드 업데이트 완료
- [ ] 권한 승인 완료 (Gmail + Sheets)
- [ ] 웹앱 재배포 완료
- [ ] 웹사이트 환경변수 업데이트 완료
- [ ] PDF 첨부 테스트 성공
- [ ] 이메일 수신 확인 완료
- [ ] 구글시트 데이터 저장 확인 완료

## 🎉 결과

**이제 AI 무료진단 신청자는 진단 결과보고서 PDF를 이메일로 즉시 받을 수 있습니다!**

- 🚀 **즉시 처리**: 신청과 동시에 PDF 첨부 메일 발송
- 📄 **전문적인 보고서**: 상세한 진단 결과와 개선 방안 포함
- ⚡ **자동화**: 별도 작업 없이 모든 과정 자동 처리
- 📊 **완벽한 기록**: 구글시트에 모든 데이터 자동 저장

**복잡했던 3800줄 → 간단한 600줄로 훨씬 안정적이고 효율적으로 개선되었습니다!** 