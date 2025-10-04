#!/bin/bash

# AI 역량진단 시스템 서버 배포 스크립트
# Ollama GPT-OSS 20B + aicamp.club 도메인 배포

echo "🚀 AI 역량진단 시스템 서버 배포 시작 (Ollama GPT-OSS 20B)"
echo "============================================================"

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 오류 처리
set -e
trap 'echo -e "${RED}❌ 배포 실패! 라인 $LINENO에서 오류 발생${NC}"' ERR

# 1. 시스템 업데이트
echo -e "${BLUE}📦 1단계: 시스템 업데이트${NC}"
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git nginx certbot python3-certbot-nginx ufw

# 2. Node.js 18.x 설치
echo -e "${BLUE}📦 2단계: Node.js 설치${NC}"
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
echo "Node.js 버전: $(node --version)"
echo "NPM 버전: $(npm --version)"

# 3. Ollama 설치
echo -e "${BLUE}🤖 3단계: Ollama 설치${NC}"
curl -fsSL https://ollama.ai/install.sh | sh
sudo systemctl enable ollama
sudo systemctl start ollama
sudo systemctl status ollama --no-pager

# 4. GPT-OSS 20B 모델 다운로드
echo -e "${BLUE}🧠 4단계: GPT-OSS 20B 모델 다운로드 (시간 소요)${NC}"
ollama pull gpt-oss:20b
echo "설치된 모델 확인:"
ollama list

# 5. 모델 테스트
echo -e "${BLUE}🧪 5단계: 모델 테스트${NC}"
ollama run gpt-oss:20b "안녕하세요. 테스트입니다." --verbose

# 6. 프로젝트 디렉토리 설정
echo -e "${BLUE}📁 6단계: 프로젝트 디렉토리 설정${NC}"
sudo mkdir -p /var/www/aicamp
sudo chown $USER:$USER /var/www/aicamp
cd /var/www/aicamp

# 7. 프로젝트 파일 복사 (현재 디렉토리에서)
echo -e "${BLUE}📋 7단계: 프로젝트 파일 복사${NC}"
# 이 스크립트를 실행하기 전에 현재 프로젝트를 서버로 업로드해야 함
echo "현재 프로젝트 파일들을 /var/www/aicamp로 복사하세요"
echo "예: scp -r ./aicamp_v3.0/* user@server:/var/www/aicamp/"

# 8. 의존성 설치
echo -e "${BLUE}📦 8단계: 의존성 설치${NC}"
npm ci --production

# 9. 프로덕션 빌드
echo -e "${BLUE}🔨 9단계: 프로덕션 빌드${NC}"
npm run build

# 10. PM2 설치 및 설정
echo -e "${BLUE}⚙️ 10단계: PM2 설치 및 설정${NC}"
sudo npm install -g pm2

# 11. 방화벽 설정
echo -e "${BLUE}🔥 11단계: 방화벽 설정${NC}"
sudo ufw --force enable
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 3000  # 개발/테스트용 (나중에 제거)
sudo ufw status

# 12. Nginx 설정
echo -e "${BLUE}🌐 12단계: Nginx 설정${NC}"
sudo tee /etc/nginx/sites-available/aicamp.club > /dev/null <<EOF
server {
    listen 80;
    server_name aicamp.club www.aicamp.club;

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
        proxy_connect_timeout 10s;
    }

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

sudo ln -sf /etc/nginx/sites-available/aicamp.club /etc/nginx/sites-enabled/aicamp.club
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

# 13. 애플리케이션 시작
echo -e "${BLUE}🚀 13단계: 애플리케이션 시작${NC}"
pm2 start ecosystem.config.js
pm2 startup
pm2 save
pm2 status

# 14. SSL 인증서 설정 (도메인 연결 후)
echo -e "${YELLOW}⚠️ 14단계: SSL 설정 (수동 실행 필요)${NC}"
echo "도메인 DNS가 서버 IP로 연결된 후 다음 명령을 실행하세요:"
echo "sudo certbot --nginx -d aicamp.club -d www.aicamp.club"

# 15. 모니터링 스크립트 설정
echo -e "${BLUE}📊 15단계: 모니터링 스크립트 설정${NC}"
mkdir -p /var/www/aicamp/scripts

cat > /var/www/aicamp/scripts/monitor.sh << 'MONITOR_EOF'
#!/bin/bash

LOG_FILE="/var/log/aicamp-monitor.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

# Ollama 상태 확인
check_ollama() {
    if curl -s http://localhost:11434/api/tags > /dev/null; then
        echo "[$DATE] ✅ Ollama 정상" >> $LOG_FILE
    else
        echo "[$DATE] ❌ Ollama 연결 실패 - 재시작 시도" >> $LOG_FILE
        systemctl restart ollama
    fi
}

# 애플리케이션 상태 확인
check_app() {
    if curl -s http://localhost:3000/api/system-health > /dev/null; then
        echo "[$DATE] ✅ AI Camp 애플리케이션 정상" >> $LOG_FILE
    else
        echo "[$DATE] ❌ AI Camp 애플리케이션 오류 - PM2 재시작" >> $LOG_FILE
        pm2 restart aicamp-diagnosis
    fi
}

# 모든 체크 실행
check_ollama
check_app

MONITOR_EOF

chmod +x /var/www/aicamp/scripts/monitor.sh

# Cron 작업 설정 (5분마다 실행)
(crontab -l 2>/dev/null; echo "*/5 * * * * /var/www/aicamp/scripts/monitor.sh") | crontab -

# 16. 최종 테스트
echo -e "${BLUE}🧪 16단계: 최종 테스트${NC}"
echo "Ollama 상태 확인:"
curl -s http://localhost:11434/api/tags | head -5

echo -e "\n애플리케이션 상태 확인:"
curl -s http://localhost:3000/api/system-health | head -10

echo -e "\nPM2 상태:"
pm2 status

echo -e "\n${GREEN}🎉 배포 완료!${NC}"
echo "============================================================"
echo -e "${GREEN}✅ Ollama GPT-OSS 20B 설치 완료${NC}"
echo -e "${GREEN}✅ AI 역량진단 시스템 배포 완료${NC}"
echo -e "${GREEN}✅ Nginx 리버스 프록시 설정 완료${NC}"
echo -e "${GREEN}✅ 모니터링 시스템 설정 완료${NC}"
echo ""
echo -e "${YELLOW}📋 다음 단계:${NC}"
echo "1. 도메인 DNS를 서버 IP로 연결"
echo "2. SSL 인증서 설정: sudo certbot --nginx -d aicamp.club -d www.aicamp.club"
echo "3. 웹 브라우저에서 https://aicamp.club 접속 테스트"
echo "4. AI 역량진단 45문항 테스트 실행"
echo ""
echo -e "${BLUE}📊 모니터링:${NC}"
echo "- 시스템 상태: curl https://aicamp.club/api/system-health"
echo "- PM2 상태: pm2 status"
echo "- Ollama 상태: ollama list"
echo "- 로그 확인: pm2 logs aicamp-diagnosis"
echo ""
echo -e "${GREEN}🚀 aicamp.club에서 온디바이스 Ollama GPT-OSS 20B 기반 AI 역량진단 시스템이 가동됩니다!${NC}"
