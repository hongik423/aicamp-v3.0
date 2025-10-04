# Google Apps Script V15.0 업데이트 지침

## 🚨 긴급 수정 필요

현재 Google Apps Script가 V14 버전을 사용하여 `matrix is not defined` 오류가 발생하고 있습니다.

## 📋 업데이트 절차

### 1단계: Google Apps Script 접속
- URL: https://script.google.com
- 프로젝트: "이교장의AI역량진단보고서 시스템"

### 2단계: 기존 코드 완전 교체
1. 기존 코드 **전체 선택** (Ctrl+A)
2. **삭제** (Delete)
3. `docs/aicamp_ultimate_gas_v15_final.js` 파일 내용 **전체 복사**
4. Google Apps Script에 **붙여넣기**

### 3단계: 환경변수 확인
다음 환경변수가 설정되어 있는지 확인:
```
SPREADSHEET_ID: 1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ
GEMINI_API_KEY: AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM
ADMIN_EMAIL: hongik423@gmail.com
AICAMP_WEBSITE: aicamp.club
DRIVE_FOLDER_ID: 1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj
```

### 4단계: 배포 업데이트
1. **배포** → **배포 관리**
2. **새 배포** 클릭
3. **유형**: 웹 앱
4. **실행 대상**: 나
5. **액세스 권한**: 모든 사용자
6. **배포** 클릭

## ✅ V15.0의 주요 개선사항

### 🔧 오류 수정
- ✅ `matrix` 변수 오류 완전 수정
- ✅ `saveScoreAnalysis` 함수 제거 (V15에서는 통합됨)
- ✅ 변수명 통일: `matrix` → `priorityMatrix`

### 🚀 새로운 기능
- ✅ Google Drive 자동 업로드
- ✅ 12단계 완전한 워크플로우
- ✅ GEMINI 2.5 Flash 통합 분석
- ✅ 이교장 스타일 HTML 보고서
- ✅ 애플 스타일 미니멀 이메일

## 🎯 업데이트 후 확인사항

1. **테스트 진단 실행**
2. **오류 로그 확인**
3. **이메일 발송 테스트**
4. **Google Drive 업로드 확인**

---
**중요**: 반드시 V15.0 ULTIMATE FINAL 버전으로 업데이트해야 합니다!
