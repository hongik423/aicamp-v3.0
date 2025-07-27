@echo off
echo 🚨 AI CAMP 브랜딩 긴급 수정 스크립트 v2
echo ==========================================
echo.
echo 📋 수정 사항:
echo   - M-CENTER → AI CAMP 브랜딩 통일
echo   - 올바른 구글시트 연결
echo   - hongik423@gmail.com 메일 발송
echo.

echo 🗑️ 1단계: 기존 환경변수 제거...
echo.

rem 기존 환경변수 제거
vercel env rm NEXT_PUBLIC_COMPANY_NAME --yes
vercel env rm NEXT_PUBLIC_COMPANY_EMAIL --yes
vercel env rm NEXT_PUBLIC_SUPPORT_EMAIL --yes
vercel env rm NEXT_PUBLIC_GOOGLE_SHEETS_ID --yes
vercel env rm BETA_FEEDBACK_ADMIN_EMAIL --yes
vercel env rm ADMIN_EMAIL --yes

echo.
echo 🔧 2단계: AI CAMP 환경변수 추가...
echo.

rem AI CAMP 브랜딩 정보 추가
echo AI CAMP | vercel env add NEXT_PUBLIC_COMPANY_NAME production
echo hongik423@gmail.com | vercel env add NEXT_PUBLIC_COMPANY_EMAIL production
echo hongik423@gmail.com | vercel env add NEXT_PUBLIC_SUPPORT_EMAIL production
echo 1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00 | vercel env add NEXT_PUBLIC_GOOGLE_SHEETS_ID production
echo hongik423@gmail.com | vercel env add BETA_FEEDBACK_ADMIN_EMAIL production
echo hongik423@gmail.com | vercel env add ADMIN_EMAIL production

echo.
echo 🚀 3단계: 즉시 재배포...
vercel --prod --force

echo.
echo ✅ AI CAMP 브랜딩 수정 완료!
echo.
echo 📋 확인 사항:
echo   🌐 사이트: https://aicamp.club
echo   📊 구글시트: https://docs.google.com/spreadsheets/d/1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00/edit
echo   📧 관리자 메일: hongik423@gmail.com
echo.
echo 🎯 테스트 방법:
echo   1. 약 2-3분 후 https://aicamp.club 접속
echo   2. AI 무료진단 신청
echo   3. AI CAMP 명의 메일 수신 확인
echo.
echo 🔄 재배포 완료까지 약 2-3분 소요됩니다...
echo.
pause 