# AI 역량진단시스템 배포 가이드
## aicamp.club 도메인에서 온디바이스 GPT-OSS 20B 운영하기

---

## 📋 목차
1. [사전 준비사항](#사전-준비사항)
2. [서버 설정](#서버-설정)
3. [도메인 연결](#도메인-연결)
4. [애플리케이션 배포](#애플리케이션-배포)
5. [SSL 인증서 설정](#ssl-인증서-설정)
6. [모니터링 설정](#모니터링-설정)
7. [문제 해결](#문제-해결)

---

## 🚀 사전 준비사항

### 필요한 리소스
- **서버**: 최소 16GB RAM, 4 Core CPU (GPT-OSS 20B용)
- **스토리지**: 최소 100GB SSD
- **도메인**: aicamp.club (이미 소유)
- **운영체제**: Ubuntu 20.04 LTS 권장

### 필수 소프트웨어
```bash
# 시스템 업데이트
sudo apt update && sudo apt upgrade -y

# 필수 패키지 설치
sudo apt install -y curl wget git nginx certbot python3-certbot-nginx
```

---

## 🖥️ 서버 설정

### 1단계: Node.js 설치
```bash
# Node.js 18.x 설치
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 버전 확인
node --version  # v18.x.x 확인
npm --version   # 8.x.x 확인
```

### 2단계: Ollama 설치
```bash
# Ollama 설치
curl -fsSL https://ollama.ai/install.sh | sh

# 시스템 서비스로 등록
sudo systemctl enable ollama
sudo systemctl start ollama

# 상태 확인
sudo systemctl status ollama
```

### 3단계: GPT-OSS 20B 모델 다운로드
```bash
# 모델 다운로드 (약 20-30분 소요)
ollama pull gpt-oss:20b

# 모델 테스트
ollama run gpt-oss:20b "안녕하세요"
```

### 4단계: 프로젝트 클론 및 설정
```bash
# 프로젝트 디렉토리 생성
sudo mkdir -p /var/www/aicamp
sudo chown $USER:$USER /var/www/aicamp
cd /var/www/aicamp

# Git 클론 (여기서는 파일 직접 생성)
git init
# 앞서 생성한 파일들을 여기에 복사
```

### 5단계: 환경 변수 설정
```bash
# .env 파일 생성
cat > .env << EOF
PORT=3000
NODE_ENV=production
HOST=0.0.0.0
DOMAIN=aicamp.club

OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=gpt-oss:20b
OLLAMA_TIMEOUT=300000

JWT_SECRET=$(openssl rand -base64 32)
ENCRYPTION_KEY=$(openssl rand -base64 32)

LOG_LEVEL=info
LOG_FILE=./logs/app.log

MAX_SESSIONS=1000
SESSION_TIMEOUT=3600000
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
EOF
```

### 6단계: 프로젝트 의존성 설치
```bash
# package.json 생성 (앞서 제공한 내용 사용)
npm install

# 로그 디렉토리 생성
mkdir -p logs data
```

---

## 🌐 도메인 연결

### 1단계: DNS 설정
```bash
# 현재 서버 IP 확인
curl ifconfig.me

# DNS 레코드 설정 (도메인 관리 패널에서)
# A 레코드: @ -> YOUR_SERVER_IP
# A 레코드: www -> YOUR_SERVER_IP
```

### 2단계: 방화벽 설정
```bash
# UFW 활성화
sudo ufw enable

# 필요한 포트 개방
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 3000  # 개발용 (나중에 제거)

# 상태 확인
sudo ufw status
```

---

## 📦 애플리케이션 배포

### 1단계: PM2 설치 및 설정
```bash
# PM2 글로벌 설치
sudo npm install -g pm2

# PM2 설정 파일 생성
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'aicamp-diagnosis',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    watch: false,
    max_memory_restart: '2G'
  }]
}
EOF

# 애플리케이션 시작
pm2 start ecosystem.config.js

# 부팅 시 자동 시작 설정
pm2 startup
pm2 save
```

### 2단계: Nginx 설정
```bash
# Nginx 설정 파일 생성
sudo cat > /etc/nginx/sites-available/aicamp.club << EOF
server {
    listen 80;
    server_name aicamp.club www.aicamp.club;

    # 임시로 직접 연결 (SSL 설정 전)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 300s;
    }

    # API 라우트 특별 처리
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 300s;
        proxy_connect_timeout 10s;
    }
}
EOF

# 사이트 활성화
sudo ln -sf /etc/nginx/sites-available/aicamp.club /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Nginx 설정 테스트 및 재시작
sudo nginx -t
sudo systemctl restart nginx
```

### 3단계: 첫 번째 테스트
```bash
# 애플리케이션 상태 확인
pm2 status
pm2 logs

# API 테스트
curl http://aicamp.club/api/status

# 웹 브라우저에서 확인
echo "http://aicamp.club 에서 접속 테스트"
```

---

## 🔒 SSL 인증서 설정

### 1단계: Let's Encrypt 인증서 발급
```bash
# Certbot으로 SSL 인증서 자동 설정
sudo certbot --nginx -d aicamp.club -d www.aicamp.club

# 자동 갱신 설정
sudo crontab -e
# 추가할 라인:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

### 2단계: SSL 설정 확인
```bash
# SSL 테스트
curl https://aicamp.club/api/status

# SSL 점수 확인 (온라인)
echo "https://www.ssllabs.com/ssltest/analyze.html?d=aicamp.club"
```

---

## 📊 모니터링 설정

### 1단계: 기본 모니터링 스크립트
```bash
# 시스템 모니터링 스크립트 생성
cat > /var/www/aicamp/scripts/monitor.sh << 'EOF'
#!/bin/bash

LOG_FILE="/var/log/aicamp-monitor.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

# 서비스 상태 확인
check_service() {
    if systemctl is-active --quiet $1; then
        echo "[$DATE] ✅ $1 서비스 정상" >> $LOG_FILE
    else
        echo "[$DATE] ❌ $1 서비스 중단 - 재시작 시도" >> $LOG_FILE
        systemctl restart $1
    fi
}

# Ollama 상태 확인
check_ollama() {
    if curl -s http://localhost:11434/api/tags > /dev/null; then
        echo "[$DATE] ✅ Ollama 정상" >> $LOG_FILE
    else
        echo "[$DATE] ❌ Ollama 연결 실패" >> $LOG_FILE
        systemctl restart ollama
    fi
}

# 애플리케이션 상태 확인
check_app() {
    if curl -s http://localhost:3000/api/status > /dev/null; then
        echo "[$DATE] ✅ AI Camp 애플리케이션 정상" >> $LOG_FILE
    else
        echo "[$DATE] ❌ AI Camp 애플리케이션 오류 - PM2 재시작" >> $LOG_FILE
        pm2 restart aicamp-diagnosis
    fi
}

# 디스크 사용량 확인
check_disk() {
    USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
    if [ $USAGE -gt 85 ]; then
        echo "[$DATE] ⚠️ 디스크 사용량 높음: ${USAGE}%" >> $LOG_FILE
    fi
}

# 메모리 사용량 확인
check_memory() {
    USAGE=$(free | awk 'NR==2{printf "%.0f", $3*100/($3+$7)}')
    if [ $USAGE -gt 90 ]; then
        echo "[$DATE] ⚠️ 메모리 사용량 높음: ${USAGE}%" >> $LOG_FILE
    fi
}

# 모든 체크 실행
check_service nginx
check_ollama
check_app
check_disk
check_memory

EOF

chmod +x /var/www/aicamp/scripts/monitor.sh

# Cron 작업 설정 (5분마다 실행)
(crontab -l 2>/dev/null; echo "*/5 * * * * /var/www/aicamp/scripts/monitor.sh") | crontab -
```

### 2단계: 로그 관리
```bash
# Logrotate 설정
sudo cat > /etc/logrotate.d/aicamp << EOF
/var/www/aicamp/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    copytruncate
}

/var/log/aicamp-monitor.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    copytruncate
}
EOF
```

---

## 🚀 성능 최적화

### 1단계: Nginx 최적화
```bash
# Nginx 성능 설정 업데이트
sudo cat > /etc/nginx/nginx.conf << EOF
user www-data;
worker_processes auto;
pid /run/nginx.pid;

events {
    worker_connections 2048;
    use epoll;
    multi_accept on;
}

http {
    # 기본 설정
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    
    # Gzip 압축
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    
    # 파일 업로드 크기 제한
    client_max_body_size 10M;
    
    # 로깅
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;
    
    # 사이트 포함
    include /etc/nginx/sites-enabled/*;
}
EOF

sudo systemctl restart nginx
```

### 2단계: 시스템 최적화
```bash
# 시스템 리미트 증가
sudo cat >> /etc/security/limits.conf << EOF
* soft nofile 65536
* hard nofile 65536
* soft nproc 65536
* hard nproc 65536
EOF

# 커널 파라미터 최적화
sudo cat >> /etc/sysctl.conf << EOF
net.core.somaxconn = 65536
net.ipv4.tcp_max_syn_backlog = 65536
net.core.netdev_max_backlog = 5000
net.ipv4.tcp_fin_timeout = 30
vm.swappiness = 10
EOF

sudo sysctl -p
```

---

## 🔧 문제 해결

### 일반적인 문제들

#### 1. Ollama 연결 실패
```bash
# Ollama 서비스 확인
sudo systemctl status ollama

# 포트 확인
sudo netstat -tlnp | grep 11434

# 로그 확인
sudo journalctl -u ollama -f

# 재시작
sudo systemctl restart ollama
```

#### 2. 모델 로딩 실패
```bash
# 모델 목록 확인
ollama list

# 모델 재다운로드
ollama pull gpt-oss:20b

# 디스크 공간 확인
df -h
```

#### 3. 메모리 부족
```bash
# 메모리 사용량 확인
free -h
htop

# 스왑 추가 (임시 해결)
sudo fallocate -l 8G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

#### 4. SSL 인증서 문제
```bash
# 인증서 갱신
sudo certbot renew

# 인증서 상태 확인
sudo certbot certificates

# Nginx 설정 테스트
sudo nginx -t
```

### 로그 파일 위치
```bash
# 애플리케이션 로그
tail -f /var/www/aicamp/logs/combined.log

# Nginx 로그
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# 시스템 로그
tail -f /var/log/syslog

# Ollama 로그
sudo journalctl -u ollama -f
```

---

## 📈 배포 후 체크리스트

### ✅ 기능 테스트
- [ ] 웹사이트 접속 (https://aicamp.club)
- [ ] API 상태 확인 (`/api/status`)
- [ ] 진단 세션 시작
- [ ] 45문항 테스트 완료
- [ ] AI 분석 리포트 생성
- [ ] 결과 다운로드

### ✅ 성능 테스트
- [ ] 페이지 로딩 속도 < 3초
- [ ] API 응답 시간 < 1초
- [ ] AI 분석 완료 시간 < 30초
- [ ] 동시 사용자 50명 처리

### ✅ 보안 체크
- [ ] HTTPS 강제 리다이렉트
- [ ] SSL 점수 A 등급
- [ ] 보안 헤더 설정
- [ ] 방화벽 설정

### ✅ 모니터링 설정
- [ ] 자동 모니터링 스크립트 동작
- [ ] 로그 로테이션 설정
- [ ] 백업 스크립트 동작
- [ ] 알림 시스템 설정

---

## 🎯 다음 단계

1. **사용자 피드백 수집**: 베타 테스트 진행
2. **성능 최적화**: 병목 지점 개선
3. **기능 확장**: 추가 진단 항목 개발
4. **다국어 지원**: 영어 버전 추가
5. **모바일 최적화**: 반응형 디자인 개선

---

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. 로그 파일 검토
2. 시스템 리소스 확인
3. 네트워크 연결 상태
4. 서비스 상태 점검

**성공적인 배포를 축하드립니다! 🎉**