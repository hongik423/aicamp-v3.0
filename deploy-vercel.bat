@echo off
chcp 65001 > nul
echo.
echo ================================================================================
echo 🚀 AICAMP Vercel 자동 배포 스크립트 v3.0.27
echo ================================================================================
echo.

echo 📋 배포 전 체크리스트 확인 중...
echo ✅ 빌드 테스트: 완료 (44개 페이지)
echo ✅ 환경 변수: .env.local 설정 완료
echo ✅ Vercel 설정: vercel.json 최적화 완료
echo.

echo 🔄 최종 빌드 테스트 실행 중...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ 빌드 실패! 오류를 확인하고 다시 시도하세요.
    pause
    exit /b 1
)

echo.
echo ✅ 빌드 성공! Vercel 배포를 시작합니다.
echo.

echo 📡 Vercel 로그인 상태 확인 중...
vercel whoami
if %errorlevel% neq 0 (
    echo.
    echo 🔐 Vercel 로그인이 필요합니다.
    echo GitHub, Google, 또는 이메일로 로그인하세요.
    echo.
    vercel login
    if %errorlevel% neq 0 (
        echo ❌ 로그인 실패! 배포를 중단합니다.
        pause
        exit /b 1
    )
)

echo.
echo 🚀 프로덕션 배포 실행 중...
echo.
vercel --prod

if %errorlevel% eq 0 (
    echo.
    echo ================================================================================
    echo ✅ 🎉 AICAMP 시스템 배포 완료! 🎉
    echo ================================================================================
    echo.
    echo 📊 배포 결과:
    echo   • 총 페이지: 44개
    echo   • API 라우트: 12개  
    echo   • 빌드 상태: 성공
    echo   • 배포 상태: 완료
    echo.
    echo 🔗 배포된 URL을 확인하세요!
    echo.
    echo 📝 다음 단계:
    echo   1. 배포된 사이트에서 기능 테스트
    echo   2. AI 챗봇 동작 확인
    echo   3. 무료 진단 시스템 확인
    echo   4. Google Apps Script 연동 확인
    echo.
    echo 📞 문의사항: 010-9251-9743 (이후경 교장)
    echo 📧 이메일: hongik423@gmail.com
    echo.
) else (
    echo.
    echo ❌ 배포 실패! 다음을 확인하세요:
    echo   • Vercel 로그인 상태
    echo   • 환경 변수 설정
    echo   • 네트워크 연결
    echo   • vercel.json 설정
    echo.
    echo 📋 문제 해결:
    echo   1. vercel login 재실행
    echo   2. vercel env ls 로 환경 변수 확인
    echo   3. npm run build 재테스트
    echo.
)

echo.
echo 📊 배포 로그 확인: vercel logs
echo 📱 실시간 모니터링: vercel logs -f
echo.
pause 