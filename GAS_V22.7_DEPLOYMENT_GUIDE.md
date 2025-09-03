# 🚀 GAS V22.7 Google Drive 자동 저장 시스템 배포 가이드

## 📋 배포 전 체크리스트

### ✅ 필수 확인사항
- [ ] Google Apps Script 편집기 접근 권한
- [ ] Google Drive API 사용 권한
- [ ] 대상 폴더 ID: `1tUFDq_neV85vIC4GebhtQ2VpghhGP5vj`
- [ ] 대상 폴더 접근 권한

## 🔧 배포 단계

### 1단계: Google Apps Script 편집기 열기
```
1. https://script.google.com 접속
2. AICAMP 프로젝트 선택 또는 새 프로젝트 생성
3. 프로젝트 이름: "AICAMP V22.7 Google Drive 자동 저장"
```

### 2단계: 기존 코드 교체
```
1. 편집기에서 Ctrl+A (전체 선택)
2. Delete 키로 기존 코드 삭제
3. aicamp_enhanced_stable_v22.js 파일 내용 복사
4. 편집기에 붙여넣기
```

### 3단계: 저장 및 배포
```
1. Ctrl+S로 저장
2. "배포" → "새 배포" 클릭
3. 설명: "V22.7 Google Drive 자동 저장 시스템"
4. "배포" 버튼 클릭
5. 권한 승인 (필요시)
```

### 4단계: 권한 설정 확인
```
1. Google Drive API 권한 확인
2. 대상 폴더 접근 권한 확인
3. 스크립트 실행 권한 확인
```

## 🧪 배포 후 테스트

### 테스트 1: 기본 연결 테스트
```
POST 요청:
{
  "type": "test_google_drive_connection",
  "action": "test_google_drive_connection"
}
```

### 테스트 2: 시스템 상태 확인
```
POST 요청:
{
  "type": "check_google_drive_status",
  "action": "check_google_drive_status"
}
```

### 테스트 3: 24페이지 보고서 저장
```
POST 요청:
{
  "type": "save_report_to_drive",
  "action": "save_report_to_drive",
  "reportData": {...},
  "diagnosisId": "DIAG_45Q_AI_1756897759287_vd0y2wonv"
}
```

## 🔍 문제 해결

### 오류 1: "Failed to fetch"
**원인**: GAS 파일이 업데이트되지 않음
**해결**: GAS 파일 재배포

### 오류 2: "Google Drive API를 사용할 수 없습니다"
**원인**: DriveApp 권한 없음
**해결**: Google Drive API 권한 설정

### 오류 3: "폴더를 찾을 수 없습니다"
**원인**: 폴더 ID 오류 또는 접근 권한 없음
**해결**: 폴더 ID 확인 및 권한 설정

## 📊 성공 지표

### ✅ 정상 작동 시
- 기본 연결 테스트: 성공
- 시스템 상태 확인: active
- 24페이지 보고서 저장: 성공
- Google Drive 폴더에 파일 생성

### ❌ 문제 발생 시
- 오류 메시지 상세 확인
- GAS 로그 확인
- 권한 설정 재확인

## 🎯 다음 단계

배포 완료 후:
1. 테스트 페이지에서 기능 확인
2. 실제 진단 데이터로 테스트
3. 24페이지 보고서 자동 저장 확인
4. Google Drive 폴더에서 파일 확인

---

**배포 완료 후 테스트를 진행해주세요!** 🚀
