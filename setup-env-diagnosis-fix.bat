@echo off
echo ===============================================
echo AI 무료진단 시스템 환경변수 설정
echo ===============================================

echo.
echo Google Apps Script URL 설정 중...
echo NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjlPkXAy1JSZCxhJy00AazUvHbWwR5mpbJwY8Wo7EdJAPvSFn7bPZwZZcVf0icXh1inySn7aEpws1y4Kae-L2ZIajbzwY5iHEBnOznoKkS91UkNIm-OId2C7eZPR3CHSINoNdcskUwA1HhhC2hKgXqsazD9gtX_lAuioR1yMwsawhbpHF5MzGKYvcEVOtkdH2BqWu00sbHtebiNaADZNvsxuZZ2k6IpRruov5jg4BzpFxttmoTdAQTdIe0EQLnM7OCuGNf5gK1fruLiT4CKagjC04WJTQ^&lib=MSO6FP3_fOVcXPyKa1j-76EzN9sd4IQmq > .env.local

echo.
echo Google Sheets ID 설정 중...
echo NEXT_PUBLIC_GOOGLE_SHEETS_ID=1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00 >> .env.local

echo.
echo Google Sheets URL 설정 중...
echo NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://docs.google.com/spreadsheets/d/1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00/edit?usp=sharing >> .env.local

echo.
echo Gemini API 키 설정 중...
echo GEMINI_API_KEY=AIzaSyCFGJa1Q3YqwU1Qj4sZl5DdqHjE7L3-uPo >> .env.local

echo.
echo 기본 환경 설정 중...
echo NODE_ENV=development >> .env.local
echo NEXT_PUBLIC_API_BASE_URL=http://localhost:3000 >> .env.local
echo NEXT_PUBLIC_BASE_URL=http://localhost:3000 >> .env.local
echo ADMIN_EMAIL=hongik423@gmail.com >> .env.local

echo.
echo 서버 전용 설정 추가 중...
echo GOOGLE_SCRIPT_URL=https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjlPkXAy1JSZCxhJy00AazUvHbWwR5mpbJwY8Wo7EdJAPvSFn7bPZwZZcVf0icXh1inySn7aEpws1y4Kae-L2ZIajbzwY5iHEBnOznoKkS91UkNIm-OId2C7eZPR3CHSINoNdcskUwA1HhhC2hKgXqsazD9gtX_lAuioR1yMwsawhbpHF5MzGKYvcEVOtkdH2BqWu00sbHtebiNaADZNvsxuZZ2k6IpRruov5jg4BzpFxttmoTdAQTdIe0EQLnM7OCuGNf5gK1fruLiT4CKagjC04WJTQ^&lib=MSO6FP3_fOVcXPyKa1j-76EzN9sd4IQmq >> .env.local
echo GOOGLE_SHEETS_ID=1XutoJ8k5A_2z-mgUqTZKQeWsoYtf2Kbu_JBHMTj3g00 >> .env.local

echo.
echo ===============================================
echo 환경변수 설정 완료!
echo ===============================================
echo.
echo 설정된 내용:
type .env.local

echo.
echo ===============================================
echo 이제 'npm run dev'를 실행하여 서버를 시작하세요.
echo ===============================================
pause 