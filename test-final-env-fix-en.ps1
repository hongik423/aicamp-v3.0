try {
    Write-Host "=== Final Environment Variables Fix Verification ===" -ForegroundColor Green
    
    # 1. Test Environment Variables API (Updated Logic)
    Write-Host "`n1. Testing Environment Variables API (Updated Logic)..." -ForegroundColor Yellow
    $envResponse = Invoke-WebRequest -Uri "https://aicamp.club/api/test-env" -Method GET -UseBasicParsing
    Write-Host "Status: $($envResponse.StatusCode)" -ForegroundColor Green
    $envData = $envResponse.Content | ConvertFrom-Json
    
    Write-Host "Environment Variables Status:" -ForegroundColor Cyan
    if ($envData.environment) {
        foreach ($env in $envData.environment.PSObject.Properties) {
            $status = if ($env.Value -eq $true) { "SET" } elseif ($env.Value -eq $false) { "MISSING" } else { $env.Value }
            $color = if ($env.Value -eq $true) { "Green" } elseif ($env.Value -eq $false) { "Red" } else { "White" }
            Write-Host "  $($env.Name): $status" -ForegroundColor $color
        }
    }
    
    # 2. Test System Health API
    Write-Host "`n2. Testing System Health API..." -ForegroundColor Yellow
    $healthResponse = Invoke-WebRequest -Uri "https://aicamp.club/api/system-health" -Method GET -UseBasicParsing
    Write-Host "Status: $($healthResponse.StatusCode)" -ForegroundColor Green
    $healthData = $healthResponse.Content | ConvertFrom-Json
    
    # Check Environment Variables Component Status
    $envComponent = $healthData.components | Where-Object { $_.component -eq "Environment Variables" }
    if ($envComponent) {
        $statusColor = if ($envComponent.status -eq "healthy") { "Green" } elseif ($envComponent.status -eq "degraded") { "Yellow" } else { "Red" }
        Write-Host "`nEnvironment Variables Component Status: $($envComponent.status)" -ForegroundColor $statusColor
        
        if ($envComponent.details) {
            Write-Host "Environment Variables Details:" -ForegroundColor Cyan
            foreach ($detail in $envComponent.details.PSObject.Properties) {
                $status = if ($detail.Value -eq "set") { "SET" } elseif ($detail.Value -eq "missing") { "MISSING" } else { $detail.Value }
                $color = if ($detail.Value -eq "set") { "Green" } elseif ($detail.Value -eq "missing") { "Red" } else { "White" }
                Write-Host "  $($detail.Name): $status" -ForegroundColor $color
            }
        }
        
        if ($envComponent.error) {
            Write-Host "Error: $($envComponent.error)" -ForegroundColor Red
        } else {
            Write-Host "Environment Variables Issue Resolved!" -ForegroundColor Green
        }
    }
    
    Write-Host "`n=== Final Environment Variables Fix Verification Complete! ===" -ForegroundColor Green
    
} catch {
    Write-Host "`nError occurred: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        Write-Host "HTTP Status: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
    }
}
