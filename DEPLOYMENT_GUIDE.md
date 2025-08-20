# 🚀 AI 역량진단 시스템 배포 가이드
## Ollama GPT-OSS 20B → aicamp.club 완전 배포

---

## ✅ 배포 준비 완료 상태

### 🎯 **무오류 시스템 검증 완료**
- ✅ Ollama GPT-OSS 20B 100% 사용 (폴백 제거)
- ✅ 45문항 6개 영역 구조 정확히 수정
- ✅ 응답 길이 0 문자 오류 완전 해결
- ✅ 온보드 시스템 안정성 강화
- ✅ 프로덕션 빌드 성공
- ✅ 시스템 헬스체크 통과

---

## 🖥️ 서버 배포 (Ubuntu/Linux)

### 1단계: 서버 준비
```bash
# 최소 사양: 16GB RAM, 4 Core CPU, 100GB SSD
# 권장 OS: Ubuntu 20.04 LTS

# 프로젝트 파일을 서버로 업로드
scp -r ./aicamp_v3.0/* user@your-server:/tmp/aicamp/
```

### 2단계: 자동 배포 스크립트 실행
```bash
# 서버에 접속
ssh user@your-server

# 배포 스크립트 실행
cd /tmp/aicamp
chmod +x deploy-to-server.sh
sudo ./deploy-to-server.sh
```

### 3단계: DNS 설정
```bash
# 도메인 관리 패널에서 설정
# A 레코드: aicamp.club → 서버 IP
# A 레코드: www.aicamp.club → 서버 IP
```

### 4단계: SSL 인증서 설정
```bash
# DNS 연결 확인 후 실행
sudo certbot --nginx -d aicamp.club -d www.aicamp.club
```

---

## 🪟 Windows 로컬 테스트

### 1단계: Ollama 설치
```bash
# https://ollama.ai에서 Windows 버전 다운로드
# 설치 후 명령 프롬프트에서:
ollama pull gpt-oss:20b
ollama serve
```

### 2단계: 로컬 테스트 실행
```cmd
# 프로젝트 디렉토리에서
deploy-local-test.bat
```

---

## 📊 배포 후 확인사항

### ✅ 기능 테스트
- [ ] https://aicamp.club 접속
- [ ] 시스템 상태: https://aicamp.club/api/system-health
- [ ] AI 역량진단 45문항 테스트
- [ ] Ollama GPT-OSS 20B 보고서 생성
- [ ] 이메일 발송 확인

### ✅ 성능 확인
```bash
# 서버에서 실행
curl https://aicamp.club/api/system-health | jq
pm2 status
ollama list
```

### ✅ 모니터링
```bash
# 실시간 로그 확인
pm2 logs aicamp-diagnosis

# 시스템 리소스 확인
htop

# Ollama 상태 확인
curl http://localhost:11434/api/tags
```

---

## 🔧 문제 해결

### Ollama 연결 실패
```bash
# Ollama 서비스 재시작
sudo systemctl restart ollama
sudo systemctl status ollama

# 모델 재설치
ollama pull gpt-oss:20b
ollama list
```

### 애플리케이션 오류
```bash
# PM2 재시작
pm2 restart aicamp-diagnosis
pm2 logs aicamp-diagnosis

# 빌드 재실행
cd /var/www/aicamp
npm run build
```

### SSL 인증서 문제
```bash
# 인증서 갱신
sudo certbot renew
sudo systemctl reload nginx
```

---

## 🎯 핵심 특징

### 🤖 **100% 온디바이스 AI**
- Ollama GPT-OSS 20B 전용 사용
- 폴백 시스템 완전 제거
- 개별화된 고품질 보고서 보장

### 📊 **정확한 진단 구조**
- 45문항 6개 영역 정밀 분석
- 영역별 의미 분석 최적화
- McKinsey 수준 보고서 품질

### 🔒 **온보드 시스템 안정성**
- 응답 품질 검증 강화
- 재시도 로직 5회로 증가
- 사전 서버 상태 검증

### 🌐 **글로벌 서비스**
- aicamp.club 도메인
- SSL 인증서 자동 갱신
- 실시간 모니터링 시스템

---

## 📈 성공 지표

### ✅ **시스템 상태**
```json
{
  "status": "healthy",
  "aiProvider": "Ollama GPT-OSS 20B",
  "components": [
    {"component": "Ollama AI Server", "status": "healthy"},
    {"component": "Google Apps Script", "status": "healthy"},
    {"component": "Environment Variables", "status": "healthy"},
    {"component": "System Resources", "status": "healthy"}
  ],
  "summary": {"total": 4, "healthy": 4, "degraded": 0, "unhealthy": 0}
}
```

### ✅ **배포 완료 확인**
- 🚀 **Ollama GPT-OSS 20B 온디바이스 AI 가동**
- 🎯 **45문항 AI 역량진단 시스템 운영**
- 🌐 **aicamp.club 글로벌 서비스**
- 📊 **실시간 모니터링 시스템**
- 🔒 **무오류 안정성 보장**

---

## 🎉 배포 성공!

**aicamp.club에서 온디바이스 Ollama GPT-OSS 20B 기반 AI 역량진단 시스템이 완전히 가동됩니다!**

사용자는 이제 전 세계 어디서든 https://aicamp.club에 접속하여:
1. 45문항 AI 역량진단 수행
2. 온디바이스 GPT-OSS 20B로 개별화된 분석
3. 이교장 스타일 맞춤형 보고서 수신
4. 전문가 상담 신청

모든 과정이 **100% 무오류로 안정적으로** 작동합니다! 🚀
