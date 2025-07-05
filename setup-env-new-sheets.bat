@echo off
echo ========================================
echo AICAMP 환경변수 설정 (새 Google Sheets)
echo ========================================
echo.

REM .env.local 파일 생성
echo # =========================================== > .env.local
echo # AICAMP 환경변수 설정 >> .env.local
echo # =========================================== >> .env.local
echo. >> .env.local
echo # Google Apps Script 설정 >> .env.local
echo NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbzE4eVxGetQ3Z_xsikwoonK45T4wtryGLorQ4UmGaGRAz-BuZQIzm2VgXcxmJoQ04WX/exec >> .env.local
echo NEXT_PUBLIC_GOOGLE_SCRIPT_ID=1eq4jLxuXgVfjH76MJRPq6aetIybwNjD2IpvLWgY3wlfDLPW2h2hzEjAC >> .env.local
echo NEXT_PUBLIC_GOOGLE_SCRIPT_DEPLOYMENT_ID=AKfycbzE4eVxGetQ3Z_xsikwoonK45T4wtryGLorQ4UmGaGRAz-BuZQIzm2VgXcxmJoQ04WX >> .env.local
echo. >> .env.local
echo # Google Sheets 설정 (새 ID) >> .env.local
echo NEXT_PUBLIC_GOOGLE_SHEETS_ID=1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00 >> .env.local
echo NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://docs.google.com/spreadsheets/d/1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00/edit?usp=sharing >> .env.local
echo. >> .env.local
echo # AI API 설정 >> .env.local
echo GEMINI_API_KEY=AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM >> .env.local
echo. >> .env.local
echo # 관리자 설정 >> .env.local
echo ADMIN_EMAIL=hongik423@gmail.com >> .env.local
echo BETA_ADMIN_EMAIL=hongik423@gmail.com >> .env.local
echo. >> .env.local
echo # 기본 URL >> .env.local
echo NEXT_PUBLIC_BASE_URL=https://ai-camp-landingpage.vercel.app >> .env.local
echo. >> .env.local
echo # 환경 설정 >> .env.local
echo NODE_ENV=development >> .env.local
echo. >> .env.local
echo # 베타테스트 설정 >> .env.local
echo NEXT_PUBLIC_BETA_FEEDBACK_ENABLED=true >> .env.local
echo. >> .env.local
echo # 기능 활성화 >> .env.local
echo NOTIFICATION_ENABLED=true >> .env.local
echo AUTO_REPLY_ENABLED=true >> .env.local
echo. >> .env.local
echo # 회사 정보 >> .env.local
echo NEXT_PUBLIC_COMPANY_NAME=AICAMP >> .env.local
echo NEXT_PUBLIC_COMPANY_EMAIL=hongik423@gmail.com >> .env.local
echo NEXT_PUBLIC_SUPPORT_EMAIL=hongik423@gmail.com >> .env.local

echo.
echo ✅ .env.local 파일이 생성되었습니다.
echo.
echo 📋 새로운 Google Sheets ID: 1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00
echo 📧 관리자 이메일: hongik423@gmail.com
echo.
echo 다음 단계:
echo 1. Google Apps Script에 새 코드 배포
echo 2. npm run dev로 개발 서버 실행
echo 3. 각 폼 테스트 (진단, 상담, 베타피드백)
echo.
pause 