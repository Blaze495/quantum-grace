# 🚀 Quantum Grace - One-Click Share Setup
# This script will set everything up and show you what to share with friends

$host.UI.RawUI.WindowTitle = "Quantum Grace - Share Setup"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   QUANTUM GRACE - SHARE WITH FRIENDS  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if dev server is running
Write-Host "Checking if dev server is running..." -ForegroundColor Yellow
$devRunning = netstat -ano | findstr ":3000"

if (-not $devRunning) {
    Write-Host ""
    Write-Host "⚠️  Dev server is NOT running!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please open a NEW terminal and run:" -ForegroundColor Yellow
    Write-Host "   pnpm dev" -ForegroundColor White
    Write-Host ""
    Write-Host "Then run this script again!" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit
}

Write-Host "✓ Dev server is running!" -ForegroundColor Green
Write-Host ""

# Start ngrok tunnels
Write-Host "Starting ngrok tunnels..." -ForegroundColor Yellow
Write-Host ""

# Start frontend tunnel
Write-Host "Starting Frontend tunnel (Port 3000)..." -ForegroundColor Cyan
$frontendJob = Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host '🌐 FRONTEND TUNNEL' -ForegroundColor Green; ngrok http 3000" -PassThru

Start-Sleep -Seconds 3

# Start backend tunnel
Write-Host "Starting Backend tunnel (Port 3001)..." -ForegroundColor Cyan
$backendJob = Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host '🌐 BACKEND TUNNEL' -ForegroundColor Green; ngrok http 3001" -PassThru

Write-Host ""
Write-Host "Waiting for ngrok to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Try to get URLs from ngrok API
Write-Host ""
Write-Host "Getting your share URLs..." -ForegroundColor Yellow
Write-Host ""

try {
    $tunnels = Invoke-RestMethod -Uri "http://localhost:4040/api/tunnels"
    
    $frontendUrl = ""
    $backendUrl = ""
    
    foreach ($tunnel in $tunnels.tunnels) {
        if ($tunnel.config.addr -like "*:3000") {
            $frontendUrl = $tunnel.public_url
        }
        if ($tunnel.config.addr -like "*:3001") {
            $backendUrl = $tunnel.public_url
        }
    }
    
    if ($frontendUrl -and $backendUrl) {
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "   ✅ SUCCESS! YOUR URLS ARE READY!   " -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "🌐 FRONTEND URL (Share this with friends):" -ForegroundColor Cyan
        Write-Host "   $frontendUrl" -ForegroundColor White
        Write-Host ""
        Write-Host "🔌 BACKEND URL (For configuration):" -ForegroundColor Cyan
        Write-Host "   $backendUrl" -ForegroundColor White
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        
        # Create .env.local
        $envContent = "NEXT_PUBLIC_API_URL=$backendUrl/api/v1"
        $envPath = "apps\web\.env.local"
        
        Write-Host "📝 Creating configuration file..." -ForegroundColor Yellow
        Set-Content -Path $envPath -Value $envContent
        Write-Host "✓ Created $envPath" -ForegroundColor Green
        Write-Host ""
        
        Write-Host "⚠️  IMPORTANT: RESTART YOUR DEV SERVER!" -ForegroundColor Red
        Write-Host ""
        Write-Host "In the terminal running 'pnpm dev':" -ForegroundColor Yellow
        Write-Host "1. Press Ctrl+C to stop" -ForegroundColor White
        Write-Host "2. Run 'pnpm dev' again" -ForegroundColor White
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "📱 SEND THIS TO YOUR FRIENDS:" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Hey! 👋" -ForegroundColor White
        Write-Host ""
        Write-Host "I built an app and need your feedback!" -ForegroundColor White
        Write-Host ""
        Write-Host "🔗 Link: $frontendUrl" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Just click the link, register, and tell me what you think!" -ForegroundColor White
        Write-Host ""
        Write-Host "(You might see a warning - just click 'Visit Site')" -ForegroundColor Gray
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "✅ CHECKLIST:" -ForegroundColor Green
        Write-Host "  [ ] Restart 'pnpm dev' (important!)" -ForegroundColor White
        Write-Host "  [ ] Copy the frontend URL" -ForegroundColor White
        Write-Host "  [ ] Send to friends" -ForegroundColor White
        Write-Host "  [ ] Wait for feedback!" -ForegroundColor White
        Write-Host ""
        Write-Host "Keep these ngrok windows OPEN while friends are testing!" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Press Ctrl+C here to stop sharing (closes ngrok tunnels)" -ForegroundColor Gray
        Write-Host ""
        
        # Copy to clipboard
        try {
            Set-Clipboard -Value $frontendUrl
            Write-Host "✓ Frontend URL copied to clipboard!" -ForegroundColor Green
            Write-Host ""
        } catch {
            # Clipboard failed, no problem
        }
        
    } else {
        Write-Host "⚠️  Couldn't detect URLs automatically." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Please check the ngrok windows that just opened." -ForegroundColor White
        Write-Host "Look for 'Forwarding' lines with URLs like:" -ForegroundColor White
        Write-Host "  https://abc-123.ngrok-free.app" -ForegroundColor Gray
        Write-Host ""
    }
    
} catch {
    Write-Host "⚠️  Couldn't connect to ngrok API." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please check the ngrok windows that just opened." -ForegroundColor White
    Write-Host ""
    Write-Host "Look for 'Forwarding' lines with URLs like:" -ForegroundColor White
    Write-Host "  https://abc-123.ngrok-free.app" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Frontend (port 3000) = Share with friends" -ForegroundColor Cyan
    Write-Host "Backend (port 3001) = For your .env.local" -ForegroundColor Cyan
    Write-Host ""
}

Write-Host "Press any key to close ngrok and stop sharing..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Cleanup
try {
    Stop-Process -Id $frontendJob.Id -Force
    Stop-Process -Id $backendJob.Id -Force
} catch {}

Write-Host ""
Write-Host "Ngrok tunnels closed. App is no longer accessible online." -ForegroundColor Yellow
