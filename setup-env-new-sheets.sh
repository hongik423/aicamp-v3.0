#!/bin/bash

echo "========================================"
echo "AICAMP 환경변수 설정 (새 Google Sheets)"
echo "========================================"
echo

# .env.local 파일 생성
cat > .env.local << 'EOF'
# ===========================================
# AICAMP 환경변수 설정
# ===========================================

# Google Apps Script 설정
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbzE4eVxGetQ3Z_xsikwoonK45T4wtryGLorQ4UmGaGRAz-BuZQIzm2VgXcxmJoQ04WX/exec
NEXT_PUBLIC_GOOGLE_SCRIPT_ID=1eq4jLxuXgVfjH76MJRPq6aetIybwNjD2IpvLWgY3wlfDLPW2h2hzEjAC
NEXT_PUBLIC_GOOGLE_SCRIPT_DEPLOYMENT_ID=AKfycbzE4eVxGetQ3Z_xsikwoonK45T4wtryGLorQ4UmGaGRAz-BuZQIzm2VgXcxmJoQ04WX

# Google Sheets 설정 (새 ID)
NEXT_PUBLIC_GOOGLE_SHEETS_ID=1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00
NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://docs.google.com/spreadsheets/d/1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00/edit?usp=sharing

# AI API 설정
GEMINI_API_KEY=AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM

# 관리자 설정
ADMIN_EMAIL=hongik423@gmail.com
BETA_ADMIN_EMAIL=hongik423@gmail.com

# 기본 URL
NEXT_PUBLIC_BASE_URL=https://ai-camp-landingpage.vercel.app

# 환경 설정
NODE_ENV=development

# 베타테스트 설정
NEXT_PUBLIC_BETA_FEEDBACK_ENABLED=true

# 기능 활성화
NOTIFICATION_ENABLED=true
AUTO_REPLY_ENABLED=true

# 회사 정보
NEXT_PUBLIC_COMPANY_NAME=AICAMP
NEXT_PUBLIC_COMPANY_EMAIL=hongik423@gmail.com
NEXT_PUBLIC_SUPPORT_EMAIL=hongik423@gmail.com
EOF

echo
echo "✅ .env.local 파일이 생성되었습니다."
echo
echo "📋 새로운 Google Sheets ID: 1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00"
echo "📧 관리자 이메일: hongik423@gmail.com"
echo
echo "다음 단계:"
echo "1. Google Apps Script에 새 코드 배포"
echo "2. npm run dev로 개발 서버 실행"
echo "3. 각 폼 테스트 (진단, 상담, 베타피드백)"
echo

# 실행 권한 부여
chmod +x setup-env-new-sheets.sh 