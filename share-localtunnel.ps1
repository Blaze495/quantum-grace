# 🚀 Share with Localtunnel - NO SIGNUP NEEDED!

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    LOCALTUNNEL - SHARE YOUR APP       " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if dev server is running
Write-Host "Checking dev server..." -ForegroundColor Yellow
$devRunning = netstat -ano | findstr ":3000"

if (-not $devRunning) {
    Write-Host ""
    Write-Host "⚠️  Dev server NOT running!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please run in another terminal:" -ForegroundColor Yellow
    Write-Host "   pnpm dev" -ForegroundColor White
    Write-Host ""
    pause
    exit
}

Write-Host "✓ Dev server is running!" -ForegroundColor Green
Write-Host ""

# Start localtunnel for frontend
Write-Host "Starting tunnel for Frontend (Port 3000)..." -ForegroundColor Cyan
$frontendJob = Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host '🌐 FRONTEND TUNNEL' -ForegroundColor Green; Write-Host ''; lt --port 3000" -PassThru

Start-Sleep -Seconds 3

# Start localtunnel for backend
Write-Host "Starting tunnel for Backend (Port 3001)..." -ForegroundColor Cyan
$backendJob = Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host '🌐 BACKEND TUNNEL' -ForegroundColor Green; Write-Host ''; lt --port 3001" -PassThru

Write-Host ""
Write-Host "Waiting for tunnels to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   ✅ TUNNELS STARTED!                 " -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Look at the two windows that just opened!" -ForegroundColor Cyan
Write-Host ""
Write-Host "You'll see URLs like:" -ForegroundColor White
Write-Host "   https://funny-shark-12.loca.lt" -ForegroundColor Gray
Write-Host ""
Write-Host "Window 1 (Port 3000) = FRONTEND URL" -ForegroundColor Yellow
Write-Host "Window 2 (Port 3001) = BACKEND URL" -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 NEXT STEPS:" -ForegroundColor Green
Write-Host ""
Write-Host "1. Copy the BACKEND URL from Window 2" -ForegroundColor White
Write-Host ""
Write-Host "2. Create file: apps\web\.env.local" -ForegroundColor White
Write-Host ""
Write-Host "3. Add this line (use YOUR backend URL):" -ForegroundColor White
Write-Host "   NEXT_PUBLIC_API_URL=https://YOUR-BACKEND-URL/api/v1" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Restart pnpm dev (Press Ctrl+C then run pnpm dev)" -ForegroundColor White
Write-Host ""
Write-Host "5. Share FRONTEND URL (Window 1) with friends!" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "TIP: Keep these windows OPEN while testing!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to STOP sharing and close tunnels..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Cleanup
try {
    Stop-Process -Id $frontendJob.Id -Force
    Stop-Process -Id $backendJob.Id -Force
    Write-Host ""
    Write-Host "Tunnels closed!" -ForegroundColor Yellow
} catch {
    Write-Host "Cleanup completed" -ForegroundColor Gray
}
