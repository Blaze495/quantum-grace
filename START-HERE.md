# 🚀 START HERE - Quick Setup

## Your Current Status: ⏳ Installing Dependencies...

### What's Happening Now:
`pnpm install` is running - this installs all required packages (~1200 packages)

This takes **5-10 minutes** on first run.

---

## 📋 Setup Checklist

### ✅ Completed
- [x] pnpm installed globally
- [x] Dependencies installing...

### ⏳ Next Steps (After Installation Finishes)

1. **Set Up PostgreSQL Database**
   ```powershell
   # Open PostgreSQL command line
   psql -U postgres
   
   # In psql, run:
   CREATE DATABASE quantum_grace;
   \q
   ```

2. **Configure Environment**
   ```powershell
   # Copy environment file
   cp apps\api\.env.example apps\api\.env
   
   # Edit with your database password
   notepad apps\api\.env
   ```
   
   Update this line:
   ```
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/quantum_grace"
   ```

3. **Generate Prisma Client & Run Migrations**
   ```powershell
   cd apps\api
   pnpm prisma generate
   pnpm prisma migrate dev --name init
   cd ..\..
   ```

4. **Start Development Server**
   ```powershell
   pnpm dev
   ```

5. **Access Your App**
   - Web: http://localhost:3000
   - API: http://localhost:3001
   - API Docs: http://localhost:3001/api/docs

---

## 🆘 If You Get Stuck

### "Module not found" errors?
→ Make sure `pnpm install` finished successfully

### "Database connection failed"?
→ Check your PostgreSQL is running and password is correct in `.env`

### "Port already in use"?
```powershell
# Find what's using the port
netstat -ano | findstr :3000
# Kill the process
taskkill /PID <PID> /F
```

---

## ⏱️ Current Step

**Wait for `pnpm install` to complete...**

Once you see "Packages: +1191" and it finishes, move to Step 1 above.

---

## 📖 Full Documentation

- **QUICK-START.md** - 5-minute guide
- **SETUP-GUIDE.md** - Detailed walkthrough
- **README.md** - Project overview

---

**Status**: Installing dependencies... Please wait 5-10 minutes.
