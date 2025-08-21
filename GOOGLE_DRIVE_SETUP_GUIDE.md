# Google Drive API 설정 가이드

## 개요
AI 역량진단 시스템에서 생성된 PDF 파일을 Google Drive에 자동으로 저장하는 기능을 설정하는 가이드입니다.

## 1. Google Cloud Console 설정

### 1.1 Google Cloud 프로젝트 생성/선택
1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. 프로젝트 ID를 메모해두세요

### 1.2 Google Drive API 활성화
1. Google Cloud Console에서 "API 및 서비스" > "라이브러리"로 이동
2. "Google Drive API" 검색 후 활성화
3. "사용자 인증 정보"로 이동

### 1.3 서비스 계정 생성
1. "사용자 인증 정보 만들기" > "서비스 계정" 선택
2. 서비스 계정 이름 입력 (예: `aicamp-drive-upload`)
3. 서비스 계정 설명 입력 (선택사항)
4. "만들고 계속하기" 클릭

### 1.4 서비스 계정 권한 설정
1. 역할에서 "편집자" 또는 "프로젝트 > 편집자" 선택
2. "완료" 클릭

### 1.5 서비스 계정 키 생성
1. 생성된 서비스 계정 클릭
2. "키" 탭으로 이동
3. "키 추가" > "새 키 만들기" > "JSON" 선택
4. JSON 키 파일 다운로드 (이 파일을 안전하게 보관)

## 2. 환경변수 설정

### 2.1 .env.local 파일 생성
프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# Google Drive API 설정
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com

# Google Drive 폴더 ID (사용자가 제공한 폴더)
DRIVE_FOLDER_ID=1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj

# 클라이언트에서 사용할 폴더 ID (NEXT_PUBLIC_ 접두사 필요)
NEXT_PUBLIC_DRIVE_FOLDER_ID=1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj
```

### 2.2 서비스 계정 정보 입력
다운로드한 JSON 키 파일에서 다음 정보를 추출하여 환경변수에 입력:

1. **GOOGLE_SERVICE_ACCOUNT_EMAIL**: `client_email` 값
2. **GOOGLE_PRIVATE_KEY**: `private_key` 값 (전체를 따옴표로 감싸고 `\n`을 실제 줄바꿈으로 변환)
3. **GOOGLE_CLIENT_ID**: `client_id` 값

### 2.3 Vercel 환경변수 설정 (배포 시)
Vercel 대시보드에서 프로젝트 설정 > Environment Variables에 동일한 변수들을 추가하세요.

## 3. Google Drive 폴더 권한 설정

### 3.1 폴더 공유 설정
1. [Google Drive](https://drive.google.com/)에 접속
2. 폴더 ID `1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj`로 이동
3. 폴더 우클릭 > "공유" 선택
4. 서비스 계정 이메일을 "편집자" 권한으로 추가
5. "완료" 클릭

### 3.2 폴더 권한 확인
- 서비스 계정이 폴더에 파일을 업로드할 수 있는지 확인
- 폴더 ID가 올바른지 확인

## 4. 테스트 및 검증

### 4.1 로컬 테스트
```bash
# 개발 서버 시작
npm run dev

# 브라우저에서 AI 역량진단 페이지 접속
# 진단 완료 후 PDF 다운로드 버튼 클릭
# Google Drive 업로드 성공 여부 확인
```

### 4.2 API 엔드포인트 테스트
```bash
# Google Drive 업로드 API 테스트
curl -X POST http://localhost:3000/api/google-drive/upload \
  -F "file=@test.pdf" \
  -F "fileName=test.pdf" \
  -F "folderId=1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj"
```

## 5. 문제 해결

### 5.1 일반적인 오류
- **403 Forbidden**: 서비스 계정 권한 부족
- **404 Not Found**: 폴더 ID 잘못됨
- **401 Unauthorized**: API 키 또는 인증 정보 오류

### 5.2 디버깅 방법
1. 브라우저 개발자 도구에서 네트워크 탭 확인
2. 서버 로그에서 오류 메시지 확인
3. Google Cloud Console에서 API 사용량 확인

## 6. 보안 고려사항

### 6.1 환경변수 보안
- `.env.local` 파일을 Git에 커밋하지 마세요
- 프로덕션 환경에서는 Vercel 환경변수 사용
- 서비스 계정 키를 안전하게 보관

### 6.2 API 권한 최소화
- 필요한 최소 권한만 부여
- 정기적으로 권한 검토
- 사용하지 않는 서비스 계정 삭제

## 7. 모니터링

### 7.1 Google Cloud Console 모니터링
- API 사용량 대시보드 확인
- 오류 로그 모니터링
- 비용 추적

### 7.2 애플리케이션 로그
- 업로드 성공/실패 로그 확인
- 파일 크기 및 개수 모니터링
- 사용자 피드백 수집

## 8. 업데이트 및 유지보수

### 8.1 정기 업데이트
- Google API 라이브러리 업데이트
- 보안 패치 적용
- 성능 최적화

### 8.2 백업 및 복구
- 중요한 파일 백업
- 장애 복구 계획 수립
- 데이터 손실 방지

---

## 연락처
문제가 발생하거나 추가 지원이 필요한 경우:
- 이메일: hongik423@gmail.com
- 프로젝트: AICAMP v3.0 AI 역량진단 시스템
