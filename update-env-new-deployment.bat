@echo off
echo =============================================
echo AI CAMP v3.0 새 배포 환경변수 업데이트
echo =============================================

echo.
echo # =========================================== > .env.local
echo # AICAMP v3.0 환경변수 설정 (Vercel 배포용) >> .env.local
echo # =========================================== >> .env.local
echo # 이 파일을 .env.local로 복사하여 사용하세요 >> .env.local
echo. >> .env.local

echo # Google Gemini API 키 (AI 상담용 챗봇용) >> .env.local
echo GEMINI_API_KEY=AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM >> .env.local
echo. >> .env.local

echo # =========================================== >> .env.local
echo # Google Apps Script 설정 (통합 시스템) >> .env.local
echo # =========================================== >> .env.local
echo # 매우 중요: 통합 Apps Script 사용 (진단+상담+베타피드백) >> .env.local
echo NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbzMKcB94ld2xP6gu0xlRBf4hI16cRTZ8JhCQT0iG3QeToQt4VmZu5X7lYNV5YSgQaJB/exec >> .env.local
echo NEXT_PUBLIC_GOOGLE_SCRIPT_ID=1Iot8Hzeuq8plBXy0ODQ43_k3JPa1ec_dJUgFqNyziIu5xShVylUYYl5z >> .env.local
echo NEXT_PUBLIC_GOOGLE_SCRIPT_DEPLOYMENT_ID=AKfycbzMKcB94ld2xP6gu0xlRBf4hI16cRTZ8JhCQT0iG3QeToQt4VmZu5X7lYNV5YSgQaJB >> .env.local
echo. >> .env.local

echo # =========================================== >> .env.local
echo # 통합 구글시트 설정 >> .env.local
echo # =========================================== >> .env.local
echo # 매우 중요: 모든 데이터가 하나의 시트에 저장됨 (기존 정상 확인된 ID) >> .env.local
echo NEXT_PUBLIC_GOOGLE_SHEETS_ID=1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00 >> .env.local
echo NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://docs.google.com/spreadsheets/d/1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00/edit?gid=1689329514#gid=1689329514 >> .env.local
echo. >> .env.local

echo # =========================================== >> .env.local
echo # 베타피드백 시스템 설정 >> .env.local
echo # =========================================== >> .env.local
echo # 베타피드백 기능 활성화 플래그 >> .env.local
echo NEXT_PUBLIC_BETA_FEEDBACK_ENABLED=true >> .env.local
echo. >> .env.local
echo # 베타 관리자 이메일 (동일함) >> .env.local
echo BETA_ADMIN_EMAIL=hongik423@gmail.com >> .env.local
echo. >> .env.local

echo # =========================================== >> .env.local
echo # 추가 설정 >> .env.local
echo # =========================================== >> .env.local
echo # 개발/프로덕션 환경 구분 >> .env.local
echo NODE_ENV=production >> .env.local
echo. >> .env.local
echo # 이메일 발송 활성화 >> .env.local
echo AUTO_REPLY_ENABLED=true >> .env.local
echo. >> .env.local

echo # =========================================== >> .env.local
echo # 회사 정보 설정 >> .env.local
echo # =========================================== >> .env.local
echo NEXT_PUBLIC_COMPANY_NAME=AICAMP >> .env.local
echo NEXT_PUBLIC_COMPANY_EMAIL=hongik423@gmail.com >> .env.local
echo NEXT_PUBLIC_SUPPORT_EMAIL=hongik423@gmail.com >> .env.local
echo. >> .env.local

echo # =========================================== >> .env.local
echo # 배포 환경 설정 >> .env.local
echo # =========================================== >> .env.local
echo NODE_ENV=production >> .env.local
echo NEXT_PUBLIC_BASE_URL=https://aicamp.club >> .env.local
echo. >> .env.local

echo # =========================================== >> .env.local
echo # 베타피드백 시스템 설정 >> .env.local
echo # =========================================== >> .env.local
echo # 베타피드백용 관리자 이메일 >> .env.local
echo BETA_FEEDBACK_ADMIN_EMAIL=hongik423@gmail.com >> .env.local
echo BETA_FEEDBACK_REPLY_EMAIL=hongik423@gmail.com >> .env.local

echo.
echo ✅ .env.local 파일이 새로운 배포 정보로 업데이트되었습니다!
echo.
echo 📋 업데이트된 내용:
echo - 새 배포 ID: AKfycbzMKcB94ld2xP6gu0xlRBf4hI16cRTZ8JhCQT0iG3QeToQt4VmZu5X7lYNV5YSgQaJB
echo - 새 웹앱 URL: 새 배포 ID로 업데이트됨
echo - 라이브러리 URL: 버전 9로 업데이트됨
echo.
echo 🚀 이제 테스트를 실행할 수 있습니다!
pause 