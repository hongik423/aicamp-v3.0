@echo off
echo 🚨 AI CAMP 브랜딩 긴급 수정 스크립트
echo =====================================
echo.
echo 📋 수정 사항:
echo   - M-CENTER → AI CAMP 브랜딩 통일
echo   - 올바른 구글시트 연결
echo   - hongik423@gmail.com 메일 발송
echo.

rem Vercel 환경변수 수정 (Production)
echo 🔧 1단계: Vercel 환경변수 업데이트...
echo.

rem 회사 브랜딩 정보
vercel env add NEXT_PUBLIC_COMPANY_NAME production
echo AI CAMP

vercel env add NEXT_PUBLIC_COMPANY_FULL_NAME production  
echo AI CAMP

vercel env add NEXT_PUBLIC_CONSULTANT_NAME production
echo 이후경 교장

vercel env add NEXT_PUBLIC_CONSULTANT_TITLE production
echo 경영지도사

vercel env add NEXT_PUBLIC_COMPANY_EMAIL production
echo hongik423@gmail.com

vercel env add NEXT_PUBLIC_SUPPORT_EMAIL production
echo hongik423@gmail.com

vercel env add NEXT_PUBLIC_COMPANY_PHONE production
echo 010-9251-9743

vercel env add NEXT_PUBLIC_COMPANY_WEBSITE production
echo https://aicamp.club

vercel env add NEXT_PUBLIC_BASE_URL production
echo https://aicamp.club

rem 올바른 구글시트 설정
vercel env add NEXT_PUBLIC_GOOGLE_SHEETS_ID production
echo 1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00

vercel env add NEXT_PUBLIC_GOOGLE_SHEETS_URL production
echo https://docs.google.com/spreadsheets/d/1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00/edit?gid=1689329514#gid=1689329514

rem Google Apps Script 설정
vercel env add NEXT_PUBLIC_GOOGLE_SCRIPT_URL production
echo https://script.google.com/macros/s/AKfycbzMKcB94ld2xP6gu0xlRBf4hI16cRTZ8JhCQT0iG3QeToQt4VmZu5X7lYNV5YSgQaJB/exec

rem 베타 피드백 설정
vercel env add BETA_FEEDBACK_ADMIN_EMAIL production
echo hongik423@gmail.com

vercel env add BETA_FEEDBACK_REPLY_EMAIL production
echo hongik423@gmail.com

vercel env add ADMIN_EMAIL production
echo hongik423@gmail.com

echo.
echo 🚀 2단계: 즉시 재배포...
vercel --prod

echo.
echo ✅ AI CAMP 브랜딩 수정 완료!
echo.
echo 📋 확인 사항:
echo   🌐 사이트: https://aicamp.club
echo   📊 구글시트: https://docs.google.com/spreadsheets/d/1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00/edit
echo   📧 관리자 메일: hongik423@gmail.com
echo.
echo 🎯 테스트 방법:
echo   1. https://aicamp.club 접속
echo   2. AI 무료진단 신청
echo   3. AI CAMP 명의 메일 수신 확인
echo.
pause 