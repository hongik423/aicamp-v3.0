# 🔧 환경변수 설정 가이드

## 1. .env.local 파일 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# Google Apps Script 설정
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# 기존 환경변수들 (있다면 그대로 유지)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_GOOGLE_SHEETS_ID=your_google_sheets_id_here
ADMIN_EMAIL=your_admin_email@example.com
```

## 2. Google Apps Script URL 설정

1. Google Apps Script에서 "배포" → "새 배포" 완료 후
2. 제공된 웹 앱 URL을 복사
3. 위 환경변수에서 `YOUR_SCRIPT_ID` 부분을 실제 URL로 교체

예시:
```
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec
```

## 3. Vercel 배포 시 환경변수 설정

Vercel 대시보드에서:
1. 프로젝트 선택
2. Settings → Environment Variables
3. 위의 모든 환경변수를 추가

## 4. 환경변수 검증

다음 명령어로 환경변수가 올바르게 설정되었는지 확인:

```bash
npm run dev
```

콘솔에서 Google Apps Script URL 관련 오류가 없는지 확인하세요.

## 주의사항

- `.env.local` 파일은 Git에 커밋하지 마세요
- 프로덕션과 개발 환경에서 동일한 Google Apps Script를 사용할 수 있습니다
- API 키는 절대 공개하지 마세요
