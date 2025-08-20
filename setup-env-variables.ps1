# AI Competency Diagnosis Report System V16.0 OLLAMA ULTIMATE Environment Variables Setup
# ================================================================================

Write-Host "Setting up environment variables for Ollama 0.11.5 AI Diagnosis System..." -ForegroundColor Green

# .env.local 파일 생성
$envContent = @"
# 이교장의AI역량진단보고서 시스템 V16.0 OLLAMA ULTIMATE 환경변수
# ================================================================================

# OLLAMA 0.11.5 API 설정 (필수)
OLLAMA_API_URL=http://localhost:11434
OLLAMA_MODEL=gpt-oss:20b
OLLAMA_API_KEY=ollama_api_key_placeholder

# GEMINI AI API 설정 (폴백용)
GEMINI_API_KEY=AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM

# Google Apps Script 설정 (필수)
# 레거시 키(호환): 일부 스크립트에서 참조할 수 있음
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbyVGnIRPm8vg6NKoABjJo6x3aUUTALKPcMuUTf0LfOgNlW-tOZ-Yt3BKz3vGGn_Ks0h/exec
# 실제 앱에서 사용하는 키
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbyVGnIRPm8vg6NKoABjJo6x3aUUTALKPcMuUTf0LfOgNlW-tOZ-Yt3BKz3vGGn_Ks0h/exec
NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/AKfycbyVGnIRPm8vg6NKoABjJo6x3aUUTALKPcMuUTf0LfOgNlW-tOZ-Yt3BKz3vGGn_Ks0h/exec

# Google Sheets 데이터베이스 (필수)
# 레거시 키(호환)
SPREADSHEET_ID=1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ
# 실제 앱에서 사용하는 키
NEXT_PUBLIC_GOOGLE_SHEETS_ID=1BXgOJFOy_dMaQo-Lfce5yV4zyvHbqPw03qNIMdPXHWQ

# Google Drive 저장소 (참고)
DRIVE_FOLDER_ID=1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj

# 관리자 설정 (필수)
ADMIN_EMAIL=hongik423@gmail.com

# 도메인/베이스 URL 설정
AICAMP_WEBSITE=aicamp.club
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# AI 모델 설정
AI_PROVIDER=ollama
AI_MODEL_PRIMARY=gpt-oss:20b
AI_MODEL_FALLBACK=gemini-2.5-flash

# N8N 워크플로우 자동화 설정
N8N_BASE_URL=http://localhost:5678
N8N_API_KEY=n8n_api_key_placeholder
N8N_WEBHOOK_URL=http://localhost:5678/webhook/aicamp-diagnosis
N8N_WORKFLOW_DATA_PROCESSING=workflow_data_processing
N8N_WORKFLOW_AI_ANALYSIS=workflow_ai_analysis
N8N_WORKFLOW_REPORT_GENERATION=workflow_report_generation
N8N_WORKFLOW_QUALITY_ASSURANCE=workflow_quality_assurance
N8N_WORKFLOW_EMAIL_DELIVERY=workflow_email_delivery

# AI CAMP 교육 커리큘럼 설정
AICAMP_CURRICULUM_API=http://localhost:3000/api/curriculum
AICAMP_PROGRAM_MATCHER_ENABLED=true
AICAMP_CUSTOM_RECOMMENDATIONS=true

# 시스템 설정
DEBUG_MODE=false
ENVIRONMENT=production
VERSION=V16.0-OLLAMA-ULTIMATE

# 타임아웃 설정 (Ollama 최적화)
TIMEOUT_OLLAMA=900000
TIMEOUT_GEMINI=600000
TIMEOUT_EMAIL=180000
TIMEOUT_SHEET=30000
TIMEOUT_TOTAL=1200000

# 재시도 설정
MAX_RETRY_ATTEMPTS=3
RETRY_DELAY_MS=2000

# Next.js 설정
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1

# 로그
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
    "OLLAMA_API_URL",
    "OLLAMA_MODEL", 
    "GEMINI_API_KEY",
    "NEXT_PUBLIC_GOOGLE_SCRIPT_URL",
    "NEXT_PUBLIC_GAS_URL",
    "NEXT_PUBLIC_GOOGLE_SHEETS_ID",
    "ADMIN_EMAIL",
    "N8N_BASE_URL",
    "AI_PROVIDER"
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
