# Enable Mobile Access - Run as Administrator
# Right-click this file and select "Run with PowerShell as Administrator"

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  Quantum Grace Mobile Access  " -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Add firewall rules
Write-Host "Adding firewall rules..." -ForegroundColor Yellow

try {
    netsh advfirewall firewall add rule name="Quantum Grace Web - Port 3000" dir=in action=allow protocol=TCP localport=3000
    Write-Host "✓ Port 3000 (Web) opened" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to open port 3000" -ForegroundColor Red
}

try {
    netsh advfirewall firewall add rule name="Quantum Grace API - Port 3001" dir=in action=allow protocol=TCP localport=3001
    Write-Host "✓ Port 3001 (API) opened" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to open port 3001" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan

# Get IP address
$ipAddress = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "Wi-Fi*" | Select-Object -First 1).IPAddress

if (-not $ipAddress) {
    $ipAddress = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "192.168.*"} | Select-Object -First 1).IPAddress
}

Write-Host ""
Write-Host "Your Mobile Access URLs:" -ForegroundColor Green
Write-Host "========================" -ForegroundColor Green
Write-Host "Web App:  http://$ipAddress:3000" -ForegroundColor White
Write-Host "API:      http://$ipAddress:3001" -ForegroundColor White
Write-Host ""
Write-Host "📱 Open these URLs on your phone!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
