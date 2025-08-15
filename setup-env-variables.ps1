# AI Competency Diagnosis Report System V14.0 ULTIMATE Environment Variables Setup
# ================================================================================

Write-Host "Setting up environment variables for AI Diagnosis System..." -ForegroundColor Green

# .env.local 파일 생성
$envContent = @"
# 이교장의AI역량진단보고서 시스템 V14.0 ULTIMATE 환경변수
# ================================================================================

# GEMINI AI API 설정 (필수)
GEMINI_API_KEY=AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM

# Google Apps Script 설정 (필수)
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbyVGnIRPm8vg6NKoABjJo6x3aUUTALKPcMuUTf0LfOgNlW-tOZ-Yt3BKz3vGGn_Ks0h/exec

# Google Sheets 데이터베이스 (필수)
SPREADSHEET_ID=1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ

# Google Drive 저장소 (필수)
DRIVE_FOLDER_ID=1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj

# 관리자 설정 (필수)
ADMIN_EMAIL=hongik423@gmail.com

# 도메인 설정
AICAMP_WEBSITE=aicamp.club
NEXT_PUBLIC_SITE_URL=https://aicamp.club

# 시스템 설정
DEBUG_MODE=false
ENVIRONMENT=production
VERSION=V14.0-ULTIMATE

# 타임아웃 설정 (Vercel 800초 제한 고려)
TIMEOUT_GEMINI=600000
TIMEOUT_EMAIL=60000
TIMEOUT_SHEET=30000
TIMEOUT_TOTAL=720000

# 재시도 설정
MAX_RETRY_ATTEMPTS=3
RETRY_DELAY_MS=2000

# Next.js 설정
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1

# 개발 모드 설정
NEXT_PUBLIC_DEBUG=false
NEXT_PUBLIC_LOG_LEVEL=error
"@

# .env.local 파일 생성
try {
    $envContent | Out-File -FilePath ".env.local" -Encoding UTF8 -Force
    Write-Host ".env.local file created successfully!" -ForegroundColor Green
} catch {
    Write-Host "Failed to create .env.local file: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Environment variables validation
Write-Host "`nValidating environment variables..." -ForegroundColor Yellow

$requiredVars = @(
    "GEMINI_API_KEY",
    "GOOGLE_SCRIPT_URL", 
    "SPREADSHEET_ID",
    "DRIVE_FOLDER_ID",
    "ADMIN_EMAIL"
)

$envVars = Get-Content ".env.local" | Where-Object { $_ -match "^[^#].*=" } | ForEach-Object {
    $parts = $_ -split "=", 2
    @{ Name = $parts[0]; Value = $parts[1] }
}

foreach ($var in $requiredVars) {
    $envVar = $envVars | Where-Object { $_.Name -eq $var }
    if ($envVar -and $envVar.Value -and $envVar.Value -ne "your-*") {
        Write-Host "✅ ${var}: Set" -ForegroundColor Green
    } else {
        Write-Host "⚠️ ${var}: Needs verification" -ForegroundColor Yellow
    }
}

Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Verify actual API keys and settings in .env.local file" -ForegroundColor White
Write-Host "2. Set the same environment variables in Vercel dashboard" -ForegroundColor White
Write-Host "3. Set script properties in Google Apps Script" -ForegroundColor White
Write-Host "4. Start development server with npm run dev" -ForegroundColor White

Write-Host "`nEnvironment variables setup completed!" -ForegroundColor Green
Write-Host "For detailed setup guide, see: ENV_VARIABLES_SETUP.md" -ForegroundColor Blue
