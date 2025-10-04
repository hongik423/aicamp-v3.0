# AICAMP V13.0 ULTIMATE - Vercel 환경변수 설정 PowerShell 스크립트
# 사용법: .\scripts\setup-vercel-env.ps1

Write-Host "🚀 AICAMP V13.0 ULTIMATE - Vercel 환경변수 설정 시작..." -ForegroundColor Green

# Vercel CLI 설치 확인
try {
    vercel --version | Out-Null
    Write-Host "✅ Vercel CLI 확인됨" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI가 설치되지 않았습니다." -ForegroundColor Red
    Write-Host "📦 설치 명령: npm i -g vercel" -ForegroundColor Yellow
    exit 1
}

# 프로젝트 루트 확인
if (-not (Test-Path "package.json")) {
    Write-Host "❌ package.json을 찾을 수 없습니다. 프로젝트 루트에서 실행하세요." -ForegroundColor Red
    exit 1
}

Write-Host "⚙️ 환경변수 설정 중..." -ForegroundColor Blue

# Google Apps Script URL 입력 받기
$GAS_URL = Read-Host "🔗 Google Apps Script URL을 입력하세요"
if ([string]::IsNullOrEmpty($GAS_URL)) {
    Write-Host "❌ Google Apps Script URL이 필요합니다." -ForegroundColor Red
    exit 1
}

Write-Host "📝 환경변수 추가 중..." -ForegroundColor Blue

# 환경변수 설정 함수
function Add-VercelEnv {
    param(
        [string]$Name,
        [string]$Value,
        [string[]]$Environments = @("production", "preview", "development")
    )
    
    foreach ($env in $Environments) {
        Write-Host "  📌 $Name ($env)" -ForegroundColor Cyan
        echo $Value | vercel env add $Name $env
    }
}

try {
    # Google Apps Script 연동
    Add-VercelEnv -Name "GOOGLE_APPS_SCRIPT_URL" -Value $GAS_URL
    Add-VercelEnv -Name "NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL" -Value $GAS_URL

    # GEMINI API 설정
    Add-VercelEnv -Name "GEMINI_API_KEY" -Value "AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM"
    Add-VercelEnv -Name "NEXT_PUBLIC_GEMINI_API_KEY" -Value "AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM"

    # 관리자 설정
    Add-VercelEnv -Name "ADMIN_EMAIL" -Value "hongik423@gmail.com"
    Add-VercelEnv -Name "AICAMP_WEBSITE" -Value "aicamp.club"

    # 시스템 설정 (프로덕션만)
    Write-Host "  📌 DEBUG_MODE (production)" -ForegroundColor Cyan
    echo "false" | vercel env add DEBUG_MODE production
    
    Write-Host "  📌 ENVIRONMENT (production)" -ForegroundColor Cyan
    echo "production" | vercel env add ENVIRONMENT production

    Write-Host "✅ 환경변수 설정 완료!" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "🔍 설정된 환경변수 확인:" -ForegroundColor Blue
    vercel env ls
    
    Write-Host ""
    Write-Host "🚀 다음 단계:" -ForegroundColor Yellow
    Write-Host "1. vercel --prod 명령으로 프로덕션 배포" -ForegroundColor White
    Write-Host "2. 배포 후 시스템 테스트 실행" -ForegroundColor White
    Write-Host "3. AI역량진단 시스템 정상 작동 확인" -ForegroundColor White
    Write-Host ""
    Write-Host "🎉 AICAMP V13.0 ULTIMATE 시스템 준비 완료!" -ForegroundColor Green

} catch {
    Write-Host "❌ 환경변수 설정 중 오류 발생: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
