#!/bin/bash

echo "🚀 AI 역량진단 시스템 설치를 시작합니다..."
echo ""

# 1. 패키지 설치
echo "📦 1단계: 필요한 패키지를 설치합니다..."
npm install

# 2. 환경 변수 파일 생성
echo ""
echo "🔧 2단계: 환경 변수 파일을 생성합니다..."
if [ ! -f .env.local ]; then
    cat > .env.local << 'EOF'
# Google Apps Script Web App URL
# GAS 스크립트를 배포한 후 생성된 URL을 입력하세요
NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# Optional: Google Analytics (필요시)
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Optional: Sentry for error tracking (필요시)  
NEXT_PUBLIC_SENTRY_DSN=
EOF
    echo "✅ .env.local 파일이 생성되었습니다."
    echo "⚠️  NEXT_PUBLIC_GAS_URL을 실제 GAS URL로 변경해주세요!"
else
    echo "ℹ️  .env.local 파일이 이미 존재합니다."
fi

# 3. 개발 서버 실행
echo ""
echo "🎉 설치가 완료되었습니다!"
echo ""
echo "다음 명령어로 개발 서버를 실행하세요:"
echo "  npm run dev"
echo ""
echo "브라우저에서 접속:"
echo "  http://localhost:3000/ai-diagnosis"
echo ""
echo "📝 추가 설정이 필요한 경우 AI_DIAGNOSIS_SETUP_GUIDE.md를 참조하세요."
