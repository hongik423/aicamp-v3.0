# AICAMP V3.0 환경변수 설정 스크립트
# PowerShell에서 실행하세요

Write-Host "🚀 AICAMP V3.0 환경변수 설정 시작" -ForegroundColor Green

# Google Drive API 환경변수 설정
Write-Host "📁 Google Drive API 환경변수 설정 중..." -ForegroundColor Yellow

# 서비스 계정 인증 정보 (실제 값으로 교체 필요)
# 개행문자를 올바르게 처리하기 위해 여기서는 예시만 제공
$GOOGLE_SERVICE_ACCOUNT_CREDENTIALS = @"
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n",
  "client_email": "your-service-account@your-project.iam.gserviceaccount.com",
  "client_id": "client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com"
}
"@

# 환경변수 설정
[Environment]::SetEnvironmentVariable("GOOGLE_SERVICE_ACCOUNT_CREDENTIALS", $GOOGLE_SERVICE_ACCOUNT_CREDENTIALS, "User")
[Environment]::SetEnvironmentVariable("GOOGLE_DRIVE_FOLDER_ID", "1tUFDQ_neV85vIC4GebhtQ2VpghhGP5vj", "User")

Write-Host "✅ Google Drive API 환경변수 설정 완료" -ForegroundColor Green

# 기타 필요한 환경변수들
Write-Host "🔧 기타 환경변수 설정 중..." -ForegroundColor Yellow

[Environment]::SetEnvironmentVariable("NEXT_PUBLIC_BASE_URL", "https://aicamp.club", "User")
[Environment]::SetEnvironmentVariable("ADMIN_EMAIL", "hongik423@gmail.com", "User")

Write-Host "✅ 모든 환경변수 설정 완료" -ForegroundColor Green
Write-Host ""
Write-Host "📋 설정된 환경변수:" -ForegroundColor Cyan
Write-Host "  - GOOGLE_SERVICE_ACCOUNT_CREDENTIALS: Google 서비스 계정 인증 정보" -ForegroundColor White
Write-Host "  - GOOGLE_DRIVE_FOLDER_ID: Google Drive 폴더 ID" -ForegroundColor White
Write-Host "  - NEXT_PUBLIC_BASE_URL: 기본 URL" -ForegroundColor White
Write-Host "  - ADMIN_EMAIL: 관리자 이메일" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  중요: GOOGLE_SERVICE_ACCOUNT_CREDENTIALS를 실제 값으로 교체해야 합니다!" -ForegroundColor Red
Write-Host "🔄 변경사항을 적용하려면 터미널을 재시작하거나 새 PowerShell 세션을 열어주세요." -ForegroundColor Yellow

# 개행문자 처리 가이드
Write-Host ""
Write-Host "📝 개행문자 처리 가이드:" -ForegroundColor Cyan
Write-Host "1. Google 서비스 계정 JSON 파일을 텍스트 에디터로 열기" -ForegroundColor White
Write-Host "2. private_key 필드의 개행문자를 \n으로 변환" -ForegroundColor White
Write-Host "3. 전체 JSON을 한 줄로 만들거나 PowerShell의 @"" 구문 사용" -ForegroundColor White
Write-Host ""
Write-Host "예시:" -ForegroundColor Yellow
Write-Host 'private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSi...\n-----END PRIVATE KEY-----\n"' -ForegroundColor Gray
