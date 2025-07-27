@echo off
echo ================================================
echo AI CAMP Vercel 배포 스크립트 (2025.07.27 최종버전)
echo ================================================
echo.

echo 🔥 사용자 제공 정확한 Google Apps Script 정보 적용
echo ✅ 실제 작동하는 배포 ID로 환경변수 설정
echo.

echo 배포 정보:
echo - 스크립트 ID: 1Iot8Hzeuq8plBXy0ODQ43_k3JPa1ec_dJUgFqNyziIu5xShVylUYYl5z
echo - 배포 ID: AKfycbzMKcB94ld2xP6gu0xlRBf4hI16cRTZ8JhCQT0iG3QeToQt4VmZu5X7lYNV5YSgQaJB
echo - 웹앱 URL: https://script.google.com/macros/s/AKfycbzMKcB94ld2xP6gu0xlRBf4hI16cRTZ8JhCQT0iG3QeToQt4VmZu5X7lYNV5YSgQaJB/exec
echo.

echo 1단계: 환경변수 설정 중...
vercel env add GEMINI_API_KEY production
vercel env add NEXT_PUBLIC_GOOGLE_SCRIPT_URL production
vercel env add NEXT_PUBLIC_GOOGLE_SCRIPT_ID production
vercel env add NEXT_PUBLIC_GOOGLE_SCRIPT_DEPLOYMENT_ID production
vercel env add NEXT_PUBLIC_GOOGLE_SCRIPT_LIBRARY_URL production
vercel env add NEXT_PUBLIC_GOOGLE_SHEETS_ID production
vercel env add NEXT_PUBLIC_GOOGLE_SHEETS_URL production
vercel env add NEXT_PUBLIC_BETA_FEEDBACK_ENABLED production
vercel env add BETA_ADMIN_EMAIL production
vercel env add NEXT_PUBLIC_COMPANY_NAME production
vercel env add NEXT_PUBLIC_COMPANY_FULL_NAME production
vercel env add NEXT_PUBLIC_CONSULTANT_NAME production
vercel env add NEXT_PUBLIC_CONSULTANT_TITLE production
vercel env add NEXT_PUBLIC_COMPANY_EMAIL production
vercel env add NEXT_PUBLIC_SUPPORT_EMAIL production
vercel env add NEXT_PUBLIC_COMPANY_PHONE production
vercel env add NEXT_PUBLIC_COMPANY_WEBSITE production
vercel env add NODE_ENV production
vercel env add AUTO_REPLY_ENABLED production
vercel env add DEBUG_MODE production
vercel env add VERCEL_ENV production
vercel env add NEXT_TELEMETRY_DISABLED production

echo.
echo 2단계: 로컬 환경변수 파일 복사...
copy env.local.production .env.local

echo.
echo 3단계: Vercel 배포 시작...
vercel --prod

echo.
echo ================================================
echo 🎉 AI CAMP Vercel 배포 완료!
echo ================================================
echo.
echo 📊 배포 정보 (정확한 버전):
echo - Google Apps Script URL: https://script.google.com/macros/s/AKfycbzMKcB94ld2xP6gu0xlRBf4hI16cRTZ8JhCQT0iG3QeToQt4VmZu5X7lYNV5YSgQaJB/exec
echo - Google Sheets ID: 1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00
echo - 배포 환경: Production
echo.
echo 🔗 배포 후 확인사항:
echo 1. 웹사이트 정상 접속 확인: https://aicamp-v3-0.vercel.app
echo 2. 진단신청 기능 테스트 (302 오류 해결 확인)
echo 3. 상담신청 기능 테스트  
echo 4. 베타피드백 기능 테스트
echo 5. AI 챗봇 기능 테스트
echo.
pause 