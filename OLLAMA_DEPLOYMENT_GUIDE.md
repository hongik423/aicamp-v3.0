# 🚀 Ollama GPT-OSS 20B 연결 배포 가이드
## 이교장의AI상담 시스템 V16.0 OLLAMA ULTIMATE

---

## 📋 개요

이 가이드는 aicamp.club에 Ollama GPT-OSS 20B를 연결하여 이교장 챗봇 시스템과 AI 역량진단 시스템을 구축하는 방법을 설명합니다.

### 🎯 주요 기능
- **이교장 챗봇 시스템**: 28년 경험 기반 AI 상담
- **AI 역량진단 시스템**: 45개 행동지표 기반 정밀 진단
- **100% 온디바이스**: 외부 API 의존성 없음
- **NVIDIA GPU + NPU 최적화**: 최대 성능 활용

---

## 🔧 1단계: Ollama 서버 설치 및 설정

### 1.1 Ollama 설치
```bash
# Windows (PowerShell)
winget install Ollama.Ollama

# 또는 공식 웹사이트에서 다운로드
# https://ollama.ai/download
```

### 1.2 Ollama 서버 시작
```bash
# Ollama 서버 시작
ollama serve

# 백그라운드에서 실행 (Windows)
Start-Process ollama -ArgumentList "serve"
```

### 1.3 GPT-OSS 20B 모델 설치
```bash
# 모델 다운로드 (약 13.8GB)
ollama pull gpt-oss:20b

# 설치 확인
ollama list
```

---

## 🌐 2단계: 환경 변수 설정

### 2.1 .env.local 파일 확인
프로젝트 루트에 `.env.local` 파일이 있는지 확인하고, 다음 설정이 포함되어 있는지 확인:

```env
# Ollama 설정
OLLAMA_API_URL=http://localhost:11434
OLLAMA_MODEL=gpt-oss:20b

# GPU 최적화 설정
OLLAMA_NUM_GPU=-1
OLLAMA_GPU_LAYERS=-1
OLLAMA_FLASH_ATTENTION=1
OLLAMA_NUM_THREAD=16
OLLAMA_NUM_BATCH=2048
OLLAMA_CONTEXT_SIZE=131072

# 시스템 설정
AICAMP_WEBSITE=aicamp.club
ADMIN_EMAIL=hongik423@gmail.com
```

### 2.2 환경 변수 설정 스크립트 실행
```bash
# Windows
.\setup-env-variables.ps1

# Linux/Mac
./setup-env.sh
```

---

## 🧪 3단계: 연결 테스트

### 3.1 Ollama 연결 테스트
```bash
# 테스트 스크립트 실행
node test-ollama-connection.js
```

### 3.2 API 헬스체크
```bash
# 브라우저에서 확인
http://localhost:3000/api/ollama/health

# 또는 curl로 확인
curl http://localhost:3000/api/ollama/health
```

### 3.3 예상 결과
```json
{
  "success": true,
  "status": "healthy",
  "data": {
    "ollamaUrl": "http://localhost:11434",
    "targetModel": "gpt-oss:20b",
    "availableModels": ["gpt-oss:20b"],
    "modelStatus": "working"
  },
  "message": "이교장의AI상담 Ollama GPT-OSS 20B 서버가 정상 작동 중입니다."
}
```

---

## 🚀 4단계: 개발 서버 실행

### 4.1 의존성 설치
```bash
npm install
```

### 4.2 개발 서버 시작
```bash
npm run dev
```

### 4.3 접속 확인
- **메인 페이지**: http://localhost:3000
- **이교장 챗봇**: http://localhost:3000/chatbot
- **AI 역량진단**: http://localhost:3000/ai-diagnosis

---

## 🎯 5단계: 시스템 테스트

### 5.1 이교장 챗봇 테스트
1. http://localhost:3000/chatbot 접속
2. "안녕하세요" 메시지 전송
3. 이교장 스타일 응답 확인

### 5.2 AI 역량진단 테스트
1. http://localhost:3000/ai-diagnosis 접속
2. 기업 정보 입력
3. 45개 질문 응답
4. Ollama GPT-OSS 20B 분석 결과 확인

### 5.3 예상 응답 예시
```
안녕하세요! 이후경 교장입니다. 

28년간 500개 이상 기업의 성장을 함께해온 경영지도사로서 
AI 역량진단과 맞춤형 교육 설계를 도와드리겠습니다.

현재 Ollama GPT-OSS 20B 온디바이스 AI로 
100% 무료 상담을 제공하고 있습니다.

궁금한 점이 있으시면 편하게 물어보세요!
```

---

## 🌐 6단계: 프로덕션 배포

### 6.1 Vercel 배포
```bash
# 프로덕션 배포
npm run deploy

# 또는 Vercel CLI 사용
vercel --prod
```

### 6.2 환경 변수 설정 (Vercel)
Vercel 대시보드에서 다음 환경 변수 설정:

```env
OLLAMA_API_URL=http://your-ollama-server:11434
OLLAMA_MODEL=gpt-oss:20b
AICAMP_WEBSITE=aicamp.club
ADMIN_EMAIL=hongik423@gmail.com
```

### 6.3 도메인 연결
- **도메인**: aicamp.club
- **SSL 인증서**: 자동 설정
- **CDN**: Vercel Edge Network

---

## 🔍 7단계: 모니터링 및 유지보수

### 7.1 성능 모니터링
```bash
# GPU 사용률 확인
nvidia-smi

# Ollama 로그 확인
ollama logs

# 시스템 리소스 확인
htop
```

### 7.2 로그 확인
```bash
# 애플리케이션 로그
npm run logs

# 또는 Vercel 로그
vercel logs
```

### 7.3 백업 및 복구
```bash
# 모델 백업
ollama export gpt-oss:20b > gpt-oss-20b-backup.tar

# 모델 복구
ollama import gpt-oss-20b-backup.tar
```

---

## 🚨 문제 해결

### 문제 1: Ollama 서버 연결 실패
```bash
# 서버 상태 확인
ollama ps

# 서버 재시작
ollama serve

# 포트 확인
netstat -an | findstr 11434
```

### 문제 2: 모델 로드 실패
```bash
# 모델 재설치
ollama rm gpt-oss:20b
ollama pull gpt-oss:20b

# 메모리 확인
ollama list
```

### 문제 3: GPU 메모리 부족
```bash
# GPU 레이어 수 조정
export OLLAMA_GPU_LAYERS=16

# 또는 CPU 모드로 전환
export OLLAMA_GPU_LAYERS=0
```

### 문제 4: 응답 속도 느림
```bash
# 배치 크기 최적화
export OLLAMA_NUM_BATCH=1024

# 스레드 수 증가
export OLLAMA_NUM_THREAD=32
```

---

## 📞 지원 및 문의

### 긴급 상담
- **전화**: 010-9251-9743 (이후경 경영지도사)
- **이메일**: hongik423@gmail.com
- **웹사이트**: aicamp.club

### 기술 지원
- **GitHub Issues**: 프로젝트 저장소
- **문서**: 이 가이드 참조
- **커뮤니티**: AICAMP Discord

---

## 🎉 완료!

축하합니다! 이제 aicamp.club에서 Ollama GPT-OSS 20B 기반의 이교장 챗봇 시스템과 AI 역량진단 시스템을 사용할 수 있습니다.

### 🚀 다음 단계
1. **사용자 테스트**: 실제 사용자로 시스템 테스트
2. **성능 최적화**: 필요에 따라 설정 조정
3. **기능 확장**: 추가 기능 개발
4. **모니터링**: 지속적인 성능 모니터링

---

**이교장의AI상담 V16.0 OLLAMA ULTIMATE**  
*28년 경험, 500개 기업 성장 동반*  
*100% 온디바이스 AI, 외부 API 의존성 없음*
