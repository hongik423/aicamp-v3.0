# Vercel 환경변수 재설정 스크립트
Write-Host "=== Vercel 환경변수 재설정 시작 ===" -ForegroundColor Green

# 환경변수 값들
$NEXT_PUBLIC_GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxIRspmaBqr0tFEQ3Mp9hGIDh6uciIdPUekcezJtyhyumTzeqs6yuzba6u3sB1O5uSj/exec"
$NEXT_PUBLIC_GAS_URL = "https://script.google.com/macros/s/AKfycbxIRspmaBqr0tFEQ3Mp9hGIDh6uciIdPUekcezJtyhyumTzeqs6yuzba6u3sB1O5uSj/exec"
$NEXT_PUBLIC_GOOGLE_SHEETS_ID = "1QNgQSsyAdeSu1ejhIm4PFyeSRKy3NmwbLQnKLF8vqA0"
$GEMINI_API_KEY = "AIzaSyDK7KMOoGGG1Vx2W1wQdIjjpBG4VVJkk1Y"

Write-Host "환경변수 설정 중..." -ForegroundColor Yellow

# 환경변수 설정 명령어들 출력 (실제 실행은 사용자가 해야 함)
Write-Host "`n다음 명령어들을 순서대로 실행하세요:" -ForegroundColor Cyan
Write-Host "vercel env add NEXT_PUBLIC_GOOGLE_SCRIPT_URL production" -ForegroundColor White
Write-Host "값: $NEXT_PUBLIC_GOOGLE_SCRIPT_URL" -ForegroundColor Gray
Write-Host ""
Write-Host "vercel env add NEXT_PUBLIC_GAS_URL production" -ForegroundColor White  
Write-Host "값: $NEXT_PUBLIC_GAS_URL" -ForegroundColor Gray
Write-Host ""
Write-Host "vercel env add NEXT_PUBLIC_GOOGLE_SHEETS_ID production" -ForegroundColor White
Write-Host "값: $NEXT_PUBLIC_GOOGLE_SHEETS_ID" -ForegroundColor Gray
Write-Host ""
Write-Host "vercel env add GEMINI_API_KEY production" -ForegroundColor White
Write-Host "값: $GEMINI_API_KEY" -ForegroundColor Gray

Write-Host "`n=== 환경변수 재설정 가이드 완료 ===" -ForegroundColor Green
