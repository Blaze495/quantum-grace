# Quantum Grace - Complete Setup Guide

Follow these steps to get Quantum Grace running on your system.

## ✅ Prerequisites Check

You should have:
- ✅ PostgreSQL installed
- ⬜ pnpm installed
- ⬜ Node.js 18+ installed

## 📦 Step 1: Install pnpm (if not already installed)

```powershell
# Open PowerShell as Administrator
iwr https://get.pnpm.io/install.ps1 -useb | iex

# Close and reopen PowerShell to refresh PATH
```

## 🔧 Step 2: Install Dependencies

```powershell
# Navigate to the project root
cd "d:\QUANTUM TRACKER"

# Install all dependencies for the monorepo
pnpm install
```

This will install dependencies for:
- Root package
- API (NestJS)
- Web (Next.js)
- All shared packages

**This may take 5-10 minutes on the first run.**

## 🗄️ Step 3: Set Up PostgreSQL Database

```powershell
# Open PostgreSQL command line
psql -U postgres

# You'll be prompted for your PostgreSQL password
```

In the PostgreSQL prompt, run:

```sql
-- Create the database
CREATE DATABASE quantum_grace;

-- Create a dedicated user (optional but recommended)
CREATE USER quantum_user WITH PASSWORD 'your_secure_password_here';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE quantum_grace TO quantum_user;

-- Connect to the new database
\c quantum_grace

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Exit psql
\q
```

## ⚙️ Step 4: Configure Environment Variables

### For the API:

```powershell
# Copy the example env file
cp apps\api\.env.example apps\api\.env

# Edit the .env file
notepad apps\api\.env
```

Update these values in `apps/api/.env`:

```env
DATABASE_URL="postgresql://quantum_user:your_secure_password_here@localhost:5432/quantum_grace?schema=public"
JWT_SECRET="change-this-to-a-long-random-string-for-production"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Important**: Replace `your_secure_password_here` with the password you set in Step 3.

## 🏗️ Step 5: Generate Prisma Client & Run Migrations

```powershell
# Navigate to the API directory
cd apps\api

# Generate Prisma Client
pnpm prisma generate

# Run database migrations (creates all tables)
pnpm prisma migrate dev --name init

# Optional: Open Prisma Studio to view your database
pnpm prisma studio
```

Expected output:
```
✔ Generated Prisma Client
✔ Database synchronized with Prisma schema
```

## 🌱 Step 6: (Optional) Seed the Database

```powershell
# Still in apps/api directory
pnpm prisma:seed
```

This will create:
- Sample user accounts
- Demo habits
- Sample goals
- Example session logs
- Badges

## 🚀 Step 7: Start the Development Servers

```powershell
# Go back to the root directory
cd ..\..

# Start both API and Web servers
pnpm dev
```

This will start:
- **API Server**: http://localhost:3001
- **Web App**: http://localhost:3000
- **API Docs (Swagger)**: http://localhost:3001/api/docs

## ✨ Step 8: Access the Application

Open your browser and navigate to:

🌐 **http://localhost:3000**

### Test Accounts (if you seeded):
- Email: `admin@quantumgrace.com`
- Password: `password123`

OR

- Email: `user@quantumgrace.com`
- Password: `password123`

### Or Create Your Own Account:
1. Click "Register"
2. Enter your email and password
3. Complete the onboarding

## 📚 API Documentation

Access the interactive API documentation at:

🔗 **http://localhost:3001/api/docs**

Here you can:
- View all API endpoints
- Test endpoints directly
- See request/response schemas
- Try authentication flows

## 🔍 Verify Installation

Check that everything is working:

### 1. API Health Check
```powershell
curl http://localhost:3001/api/v1/auth/session
```

### 2. Database Connection
```powershell
cd apps\api
pnpm prisma studio
```

This opens a GUI to browse your database.

### 3. Web App
- Open http://localhost:3000
- You should see the landing page
- Try registering a new account

## 🛠️ Troubleshooting

### Port Already in Use

**Error**: `Port 3000 or 3001 is already in use`

**Solution**:
```powershell
# Find what's using the port
netstat -ano | findstr :3000
netstat -ano | findstr :3001

# Kill the process (replace PID with the number from above)
taskkill /PID <PID> /F
```

### Database Connection Failed

**Error**: `Can't reach database server`

**Solution**:
1. Verify PostgreSQL is running:
   ```powershell
   # Check PostgreSQL service
   Get-Service -Name postgresql*
   ```

2. Start PostgreSQL if it's stopped:
   ```powershell
   Start-Service postgresql-x64-<version>
   ```

3. Verify DATABASE_URL in `apps/api/.env` is correct

### Prisma Generate Fails

**Error**: `Prisma schema validation failed`

**Solution**:
```powershell
cd apps\api
pnpm prisma format
pnpm prisma validate
pnpm prisma generate
```

### Module Not Found Errors

**Error**: `Cannot find module '@nestjs/common'`

**Solution**:
```powershell
# From the root directory
pnpm install

# If that doesn't work, clean install
rm -rf node_modules
rm -rf apps\api\node_modules
rm -rf apps\web\node_modules
pnpm install
```

## 📝 Common Commands

### Development
```powershell
pnpm dev          # Start all apps
pnpm build        # Build all apps
pnpm lint         # Lint all apps
pnpm test         # Run tests
```

### API Specific
```powershell
cd apps\api
pnpm dev                    # Start API only
pnpm prisma:generate        # Regenerate Prisma client
pnpm prisma:migrate         # Create new migration
pnpm prisma:studio          # Open database GUI
pnpm prisma:seed            # Seed database
```

### Web Specific
```powershell
cd apps\web
pnpm dev          # Start web app only
pnpm build        # Build for production
pnpm start        # Start production server
```

## 🎯 Next Steps

Once everything is running:

1. **Explore the Dashboard**
   - Add your first habit
   - Log a session
   - Set a goal

2. **Try the Pomodoro Timer**
   - Navigate to /dashboard
   - Click "Start Pomodoro"
   - Work in focused intervals

3. **Check Analytics**
   - Go to /analytics
   - View your progress charts
   - See habit streaks

4. **Customize Your Profile**
   - Go to /profile
   - Update your settings
   - Set your timezone

5. **Try AI Features** (requires OpenAI API key)
   - Add OPENAI_API_KEY to .env
   - Visit /coach
   - Get personalized insights

## 🚢 Production Deployment

When ready to deploy:

1. **Frontend (Vercel)**:
   - Connect GitHub repo to Vercel
   - Set environment variables
   - Deploy automatically

2. **Backend (Railway)**:
   - Connect GitHub repo to Railway
   - Add PostgreSQL addon
   - Set environment variables
   - Deploy automatically

## 💡 Tips

- Use `pnpm prisma studio` to visually browse your database
- Check `http://localhost:3001/api/docs` for API documentation
- Enable dark mode in the web app settings
- Use the PWA - install the app from your browser

## 📞 Need Help?

- Check the main README.md
- Review API docs at /api/docs
- Check browser console for errors
- Check API logs in the terminal

---

🎉 **You're all set! Start tracking and evolving!**
