#!/bin/bash

# AICAMP V13.0 ULTIMATE - Vercel 환경변수 설정 스크립트
# 사용법: ./scripts/setup-vercel-env.sh

echo "🚀 AICAMP V13.0 ULTIMATE - Vercel 환경변수 설정 시작..."

# Vercel CLI 설치 확인
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI가 설치되지 않았습니다."
    echo "📦 설치 명령: npm i -g vercel"
    exit 1
fi

# 프로젝트 루트 확인
if [ ! -f "package.json" ]; then
    echo "❌ package.json을 찾을 수 없습니다. 프로젝트 루트에서 실행하세요."
    exit 1
fi

echo "⚙️ 환경변수 설정 중..."

# Google Apps Script URL (실제 배포 URL로 변경 필요)
read -p "🔗 Google Apps Script URL을 입력하세요: " GAS_URL
if [ -z "$GAS_URL" ]; then
    echo "❌ Google Apps Script URL이 필요합니다."
    exit 1
fi

# 환경변수 설정
echo "📝 환경변수 추가 중..."

vercel env add GOOGLE_APPS_SCRIPT_URL production <<< "$GAS_URL"
vercel env add GOOGLE_APPS_SCRIPT_URL preview <<< "$GAS_URL"
vercel env add GOOGLE_APPS_SCRIPT_URL development <<< "$GAS_URL"

vercel env add NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL production <<< "$GAS_URL"
vercel env add NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL preview <<< "$GAS_URL"
vercel env add NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL development <<< "$GAS_URL"

vercel env add GEMINI_API_KEY production <<< "AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM"
vercel env add GEMINI_API_KEY preview <<< "AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM"
vercel env add GEMINI_API_KEY development <<< "AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM"

vercel env add NEXT_PUBLIC_GEMINI_API_KEY production <<< "AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM"
vercel env add NEXT_PUBLIC_GEMINI_API_KEY preview <<< "AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM"
vercel env add NEXT_PUBLIC_GEMINI_API_KEY development <<< "AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM"

vercel env add ADMIN_EMAIL production <<< "hongik423@gmail.com"
vercel env add ADMIN_EMAIL preview <<< "hongik423@gmail.com"
vercel env add ADMIN_EMAIL development <<< "hongik423@gmail.com"

vercel env add AICAMP_WEBSITE production <<< "aicamp.club"
vercel env add AICAMP_WEBSITE preview <<< "aicamp.club"
vercel env add AICAMP_WEBSITE development <<< "aicamp.club"

vercel env add DEBUG_MODE production <<< "false"
vercel env add ENVIRONMENT production <<< "production"

echo "✅ 환경변수 설정 완료!"
echo ""
echo "🔍 설정된 환경변수 확인:"
vercel env ls

echo ""
echo "🚀 다음 단계:"
echo "1. vercel --prod 명령으로 프로덕션 배포"
echo "2. 배포 후 시스템 테스트 실행"
echo "3. AI역량진단 시스템 정상 작동 확인"
echo ""
echo "🎉 AICAMP V13.0 ULTIMATE 시스템 준비 완료!"
