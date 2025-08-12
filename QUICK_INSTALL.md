# 🚀 AI 역량진단 시스템 빠른 설치

## Windows 사용자

PowerShell을 관리자 권한으로 실행 후:

```powershell
# 설치 스크립트 실행
.\setup-ai-diagnosis.ps1
```

## Mac/Linux 사용자

터미널에서:

```bash
# 실행 권한 부여
chmod +x setup-ai-diagnosis.sh

# 설치 스크립트 실행
./setup-ai-diagnosis.sh
```

## 수동 설치 (모든 OS)

1. **패키지 설치**
```bash
npm install
```

2. **환경 변수 설정**
`.env.local` 파일 생성:
```env
NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

3. **개발 서버 실행**
```bash
npm run dev
```

4. **브라우저에서 확인**
```
http://localhost:3000/ai-diagnosis
```

## ⚠️ 중요 사항

1. **GAS URL 설정 필수**: `.env.local` 파일의 `NEXT_PUBLIC_GAS_URL`을 실제 Google Apps Script URL로 변경하세요
2. **Node.js 18+ 필요**: Node.js 버전 18 이상이 설치되어 있어야 합니다

## 📞 문제 발생시

- 설치 가이드: `AI_DIAGNOSIS_SETUP_GUIDE.md` 참조
- 기술 지원: support@aicamp.com
