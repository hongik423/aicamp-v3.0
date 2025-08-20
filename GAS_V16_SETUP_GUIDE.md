# 🎓 Google Apps Script V16.0 OLLAMA ULTIMATE 설정 가이드

## 📋 업데이트 체크리스트

### ✅ 1. Google Apps Script 파일 교체
1. Google Apps Script 콘솔 접속: https://script.google.com/
2. 기존 프로젝트 선택 또는 새 프로젝트 생성
3. `Code.gs` 파일의 모든 내용을 삭제
4. `docs/aicamp_ultimate_gas_v16_ollama_final.js` 파일의 내용을 복사하여 붙여넣기
5. 파일 저장 (Ctrl+S)

### ✅ 2. 환경변수 설정 (스크립트 속성)
1. Google Apps Script 콘솔에서 **설정** (⚙️) 클릭
2. **스크립트 속성** 선택
3. 다음 환경변수들을 추가:

#### 🔑 필수 환경변수
```
SPREADSHEET_ID = 1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ
OLLAMA_BASE_URL = http://localhost:11434
OLLAMA_MODEL = gpt-oss:20b
ADMIN_EMAIL = hongik423@gmail.com
AICAMP_WEBSITE = aicamp.club
DRIVE_FOLDER_ID = 1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj
```

#### 🎛️ 선택적 환경변수
```
DEBUG_MODE = false
ENVIRONMENT = production
SYSTEM_VERSION = V16.0-OLLAMA-ULTIMATE
AI_MODEL = OLLAMA-GPT-OSS-20B
```

### ✅ 3. 웹앱 배포 설정
1. **배포** → **새 배포** 클릭
2. **설명**: `V16.0-OLLAMA-ULTIMATE`
3. **실행 대상**: `나`
4. **액세스 권한**: `모든 사용자`
5. **배포** 클릭
6. 웹앱 URL 복사 (다음 단계에서 사용)

### ✅ 4. Next.js 환경변수 업데이트
`.env.local` 파일에 다음 추가:
```bash
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
NEXT_PUBLIC_BASE_URL=https://aicamp.club
```

### ✅ 5. 테스트 실행
1. Google Apps Script에서 `doGet` 함수 실행
2. 헬스체크 응답 확인:
```json
{
  "success": true,
  "status": "active",
  "version": "V16.0-OLLAMA-ULTIMATE",
  "branding": "이교장의AI역량진단보고서",
  "model": "OLLAMA-GPT-OSS-20B"
}
```

## 🎯 주요 변경사항

### ✅ Gemini API 완전 제거
- ❌ `generativelanguage.googleapis.com` 호출 제거
- ❌ `GEMINI_API_KEY` 환경변수 제거
- ✅ Ollama GPT-OSS 20B 100% 사용

### ✅ Ollama 통합
- ✅ `OLLAMA_BASE_URL` 환경변수 추가
- ✅ `OLLAMA_MODEL` 환경변수 추가
- ✅ 로컬 AI 서버 연동 (localhost:11434)

### ✅ 성능 최적화
- ✅ 병렬 처리로 속도 향상
- ✅ 타임아웃 최적화 (5분 → 3분)
- ✅ 재시도 로직 강화

## 🔧 문제 해결

### ❌ "API Key not found" 오류
**원인**: 구버전 GAS가 여전히 실행 중
**해결**: V16 파일로 완전 교체 후 재배포

### ❌ "Ollama 서버 연결 실패" 오류
**원인**: Ollama 서버가 실행되지 않음
**해결**: `ollama serve` 명령어로 서버 시작

### ❌ "모델을 찾을 수 없음" 오류
**원인**: gpt-oss:20b 모델이 설치되지 않음
**해결**: `ollama pull gpt-oss:20b` 명령어로 모델 다운로드

## 📞 지원

문제 발생 시:
- 📧 이메일: hongik423@gmail.com
- 📱 전화: 010-9251-9743
- 🌐 웹사이트: aicamp.club

---

**🎉 V16.0 OLLAMA ULTIMATE 업데이트 완료!**
