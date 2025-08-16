# 🚀 AICAMP V3.0 자동 배포 스크립트
# 사용법: .\deploy.ps1

Write-Host "🚀 AICAMP V3.0 자동 배포 시작..." -ForegroundColor Green

# 1. 현재 상태 확인
Write-Host "📋 현재 Git 상태 확인..." -ForegroundColor Yellow
git status

# 2. 변경사항 스테이징
Write-Host "📦 변경사항 스테이징..." -ForegroundColor Yellow
git add .

# 3. 커밋 메시지 생성 (타임스탬프 포함)
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMessage = "🔧 오류 수정 및 맥킨지 보고서 시스템 최적화 - $timestamp"

Write-Host "💾 커밋 생성: $commitMessage" -ForegroundColor Yellow
git commit -m "$commitMessage"

# 4. 원격 저장소에 푸시
Write-Host "🌐 원격 저장소에 푸시..." -ForegroundColor Yellow
git push origin main

# 5. 빌드 테스트
Write-Host "🔨 프로덕션 빌드 테스트..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 빌드 실패! 배포를 중단합니다." -ForegroundColor Red
    exit 1
}

# 6. Vercel 재배포 트리거 (aicamp.club 도메인으로)
Write-Host "🚀 Vercel 재배포 트리거 (aicamp.club 도메인)..." -ForegroundColor Yellow
if (Get-Command vercel -ErrorAction SilentlyContinue) {
    vercel --prod --alias aicamp.club
} else {
    Write-Host "⚠️ Vercel CLI가 설치되지 않음. Git 푸시로 자동 배포됩니다." -ForegroundColor Yellow
    Write-Host "📋 수동 설정: Vercel 대시보드에서 aicamp.club 도메인 확인 필요" -ForegroundColor Cyan
}

# 7. 배포 완료 안내
Write-Host "✅ 배포 완료!" -ForegroundColor Green
Write-Host "🌐 확인 URL: https://aicamp.club" -ForegroundColor Cyan
Write-Host "📊 Vercel 대시보드: https://vercel.com/dashboard" -ForegroundColor Cyan

# 8. 환경변수 확인 안내
Write-Host "`n🔧 환경변수 확인이 필요한 경우:" -ForegroundColor Yellow
Write-Host "   • GEMINI_API_KEY: AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM" -ForegroundColor Gray
Write-Host "   • GOOGLE_SCRIPT_URL: https://script.google.com/macros/s/AKfycbxIRspmaBqr0tFEQ3Mp9hGIDh6uciIdPUekcezJtyhyumTzeqs6yuzba6u3sB1O5uSj/exec" -ForegroundColor Gray
Write-Host "   • ADMIN_EMAIL: hongik423@gmail.com" -ForegroundColor Gray

Write-Host "`n🎯 배포 프로세스 완료!" -ForegroundColor Green
