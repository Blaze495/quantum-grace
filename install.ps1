# Quantum Grace - Automated Installation Script
# Run this script to set up the entire project

Write-Host "╔══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                      ║" -ForegroundColor Cyan
Write-Host "║            QUANTUM GRACE INSTALLER                   ║" -ForegroundColor Cyan
Write-Host "║            Track. Build. Evolve.                     ║" -ForegroundColor Cyan
Write-Host "║                                                      ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check prerequisites
Write-Host "📋 Step 1: Checking prerequisites..." -ForegroundColor Yellow
Write-Host ""

# Check Node.js
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✓ Node.js installed: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js not found. Please install Node.js 18+ from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check PostgreSQL
if (Get-Command psql -ErrorAction SilentlyContinue) {
    Write-Host "✓ PostgreSQL installed" -ForegroundColor Green
} else {
    Write-Host "✗ PostgreSQL not found. Please install PostgreSQL first." -ForegroundColor Red
    exit 1
}

# Check/Install pnpm
if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "⚙ Installing pnpm..." -ForegroundColor Yellow
    npm install -g pnpm
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ pnpm installed successfully" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to install pnpm" -ForegroundColor Red
        exit 1
    }
} else {
    $pnpmVersion = pnpm --version
    Write-Host "✓ pnpm installed: $pnpmVersion" -ForegroundColor Green
}

Write-Host ""
Write-Host "📦 Step 2: Installing dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Gray
Write-Host ""

# Install dependencies
pnpm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Dependencies installed successfully" -ForegroundColor Green
Write-Host ""

# Step 3: Database setup
Write-Host "🗄️  Step 3: Setting up database..." -ForegroundColor Yellow
Write-Host ""

$dbPassword = Read-Host "Enter your PostgreSQL password for user 'postgres'"
$dbExists = $false

# Check if database exists
try {
    $env:PGPASSWORD = $dbPassword
    $result = psql -U postgres -lqt | Select-String -Pattern "quantum_grace"
    if ($result) {
        $dbExists = $true
        Write-Host "ℹ Database 'quantum_grace' already exists" -ForegroundColor Yellow
        $recreate = Read-Host "Do you want to recreate it? (y/N)"
        if ($recreate -eq "y" -or $recreate -eq "Y") {
            psql -U postgres -c "DROP DATABASE IF EXISTS quantum_grace;"
            $dbExists = $false
        }
    }
} catch {
    Write-Host "Note: Couldn't check if database exists, will try to create it" -ForegroundColor Yellow
}

if (-not $dbExists) {
    Write-Host "Creating database..." -ForegroundColor Gray
    $env:PGPASSWORD = $dbPassword
    psql -U postgres -c "CREATE DATABASE quantum_grace;"
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Database created" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to create database" -ForegroundColor Red
        exit 1
    }
    
    # Enable UUID extension
    psql -U postgres -d quantum_grace -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    Write-Host "✓ UUID extension enabled" -ForegroundColor Green
}

Write-Host ""

# Step 4: Configure environment
Write-Host "⚙️  Step 4: Configuring environment..." -ForegroundColor Yellow
Write-Host ""

$envFile = "apps\api\.env"
if (Test-Path $envFile) {
    Write-Host "ℹ .env file already exists" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to overwrite it? (y/N)"
    if ($overwrite -ne "y" -and $overwrite -ne "Y") {
        Write-Host "Skipping .env configuration" -ForegroundColor Yellow
    } else {
        Remove-Item $envFile
    }
}

if (-not (Test-Path $envFile)) {
    # Generate JWT secret
    $jwtSecret = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})
    
    $envContent = @"
# Database
DATABASE_URL="postgresql://postgres:$dbPassword@localhost:5432/quantum_grace?schema=public"

# Redis (optional - for caching)
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="$jwtSecret"
JWT_EXPIRES_IN="7d"

# App
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# OpenAI (optional - for AI features)
OPENAI_API_KEY=""

# Storage (optional - for file uploads)
STORAGE_ENDPOINT=""
STORAGE_BUCKET=""
STORAGE_REGION="auto"
STORAGE_ACCESS_KEY=""
STORAGE_SECRET_KEY=""

# Email (optional - for notifications)
SMTP_HOST=""
SMTP_PORT=587
SMTP_USER=""
SMTP_PASS=""
EMAIL_FROM="noreply@quantumgrace.com"
"@
    
    $envContent | Out-File -FilePath $envFile -Encoding utf8
    Write-Host "✓ Environment file created" -ForegroundColor Green
}

Write-Host ""

# Step 5: Generate Prisma Client and run migrations
Write-Host "🔄 Step 5: Setting up database schema..." -ForegroundColor Yellow
Write-Host ""

Push-Location apps\api

Write-Host "Generating Prisma Client..." -ForegroundColor Gray
pnpm prisma generate
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Prisma Client generated" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to generate Prisma Client" -ForegroundColor Red
    Pop-Location
    exit 1
}

Write-Host "Running database migrations..." -ForegroundColor Gray
pnpm prisma migrate dev --name init
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Database migrations completed" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to run migrations" -ForegroundColor Red
    Pop-Location
    exit 1
}

Pop-Location

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                                                      ║" -ForegroundColor Green
Write-Host "║          ✓ INSTALLATION COMPLETE!                   ║" -ForegroundColor Green
Write-Host "║                                                      ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Next Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Start the development servers:" -ForegroundColor White
Write-Host "   pnpm dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. Open your browser:" -ForegroundColor White
Write-Host "   Web App:  http://localhost:3000" -ForegroundColor Yellow
Write-Host "   API:      http://localhost:3001" -ForegroundColor Yellow
Write-Host "   API Docs: http://localhost:3001/api/docs" -ForegroundColor Yellow
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "   README.md       - Main documentation" -ForegroundColor White
Write-Host "   SETUP-GUIDE.md  - Detailed setup guide" -ForegroundColor White
Write-Host "   QUICK-START.md  - Quick start guide" -ForegroundColor White
Write-Host ""
Write-Host "💡 Tips:" -ForegroundColor Cyan
Write-Host "   - Use 'pnpm prisma studio' to view your database" -ForegroundColor White
Write-Host "   - Check SETUP-GUIDE.md for troubleshooting" -ForegroundColor White
Write-Host "   - All TypeScript errors will resolve after 'pnpm install'" -ForegroundColor White
Write-Host ""
Write-Host "Happy building! 🎯" -ForegroundColor Magenta
Write-Host ""
