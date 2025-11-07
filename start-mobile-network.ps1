# Quantum Grace - Mobile Network Access Setup
# This script helps you access your app from mobile network using ngrok

Write-Host "================================" -ForegroundColor Cyan
Write-Host " Quantum Grace Mobile Network  " -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if ngrok is installed
$ngrokInstalled = Get-Command ngrok -ErrorAction SilentlyContinue

if (-not $ngrokInstalled) {
    Write-Host "❌ ngrok is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install ngrok first:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Option 1 - Using Chocolatey:" -ForegroundColor White
    Write-Host "  choco install ngrok" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Option 2 - Using npm:" -ForegroundColor White
    Write-Host "  npm install -g ngrok" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Option 3 - Download:" -ForegroundColor White
    Write-Host "  https://ngrok.com/download" -ForegroundColor Gray
    Write-Host ""
    Write-Host "After installing, run this script again!" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit
}

Write-Host "✓ ngrok is installed" -ForegroundColor Green
Write-Host ""

# Instructions
Write-Host "📋 Setup Instructions:" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This script will guide you through the setup." -ForegroundColor White
Write-Host ""
Write-Host "You need to:" -ForegroundColor Yellow
Write-Host "1. Sign up for free ngrok account (if you haven't)" -ForegroundColor White
Write-Host "2. Get your authtoken" -ForegroundColor White
Write-Host "3. Run ngrok for both ports (3000 and 3001)" -ForegroundColor White
Write-Host ""

$continue = Read-Host "Do you have an ngrok authtoken? (y/n)"

if ($continue -eq "n" -or $continue -eq "N") {
    Write-Host ""
    Write-Host "Please follow these steps:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Go to: https://dashboard.ngrok.com/signup" -ForegroundColor White
    Write-Host "2. Sign up (FREE account)" -ForegroundColor White
    Write-Host "3. Copy your authtoken from:" -ForegroundColor White
    Write-Host "   https://dashboard.ngrok.com/get-started/your-authtoken" -ForegroundColor White
    Write-Host ""
    Write-Host "4. Run this command:" -ForegroundColor White
    Write-Host "   ngrok config add-authtoken YOUR_TOKEN" -ForegroundColor Gray
    Write-Host ""
    Write-Host "5. Run this script again!" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if dev server is running
Write-Host "⚠️  Make sure 'pnpm dev' is running in another terminal!" -ForegroundColor Yellow
Write-Host ""
$devRunning = Read-Host "Is 'pnpm dev' running? (y/n)"

if ($devRunning -eq "n" -or $devRunning -eq "N") {
    Write-Host ""
    Write-Host "Please start the dev server first:" -ForegroundColor Yellow
    Write-Host "  pnpm dev" -ForegroundColor White
    Write-Host ""
    Write-Host "Then run this script again!" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 Starting ngrok tunnels..." -ForegroundColor Green
Write-Host ""
Write-Host "I will open TWO ngrok windows:" -ForegroundColor Yellow
Write-Host "  1. Frontend (Port 3000)" -ForegroundColor White
Write-Host "  2. Backend (Port 3001)" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  KEEP BOTH WINDOWS OPEN!" -ForegroundColor Red
Write-Host ""

pause

# Start ngrok for frontend
Write-Host "Starting ngrok for Frontend (Port 3000)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host '🌐 Frontend Tunnel (Port 3000)' -ForegroundColor Green; Write-Host ''; ngrok http 3000"

Start-Sleep -Seconds 2

# Start ngrok for backend
Write-Host "Starting ngrok for Backend (Port 3001)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host '🌐 Backend Tunnel (Port 3001)' -ForegroundColor Green; Write-Host ''; ngrok http 3001"

Start-Sleep -Seconds 3

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ ngrok tunnels started!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "=============" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Look at the two ngrok windows that just opened" -ForegroundColor White
Write-Host ""
Write-Host "2. Find the URLs (look for 'Forwarding'):" -ForegroundColor White
Write-Host "   Example: https://abc-123.ngrok-free.app" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Create this file: apps\web\.env.local" -ForegroundColor White
Write-Host ""
Write-Host "4. Add this line (replace with YOUR backend URL):" -ForegroundColor White
Write-Host "   NEXT_PUBLIC_API_URL=https://YOUR-BACKEND-URL/api/v1" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Restart 'pnpm dev'" -ForegroundColor White
Write-Host ""
Write-Host "6. Open the FRONTEND URL on your mobile phone!" -ForegroundColor White
Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎉 You can now access from anywhere!" -ForegroundColor Green
Write-Host ""
Write-Host "Need help? Check MOBILE-NETWORK-SETUP.md" -ForegroundColor Yellow
Write-Host ""
