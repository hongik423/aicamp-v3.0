#!/bin/bash

echo "🚀 AICAMP 테스터 서버 시작"
echo ""

# Node.js 설치 확인
if ! command -v node &> /dev/null; then
    echo "❌ Node.js가 설치되지 않았습니다."
    echo "https://nodejs.org 에서 Node.js를 설치해주세요."
    exit 1
fi

echo "✅ Node.js 버전: $(node --version)"

# 의존성 설치
if [ ! -d "node_modules" ]; then
    echo "📦 의존성 설치 중..."
    npm install
fi

# 환경변수 파일 확인
if [ ! -f ".env" ]; then
    echo "⚠️ .env 파일이 없습니다."
    echo "env.example을 .env로 복사하고 설정을 변경해주세요."
    cp env.example .env
    echo ""
    echo "📝 .env 파일을 수정한 후 다시 실행해주세요:"
    echo "   GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
    exit 1
fi

echo ""
echo "🌐 서버 시작 중..."
echo "브라우저에서 http://localhost:3001 접속하세요"
echo ""
echo "🛑 서버 종료: Ctrl+C"
echo ""

npm start
