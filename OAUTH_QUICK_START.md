# 🚀 OAuth Quick Start - TL;DR

## ⚡ What's Done

✅ **Frontend**: OAuth buttons on login/register pages  
✅ **Backend**: OAuth strategies, routes, and handlers  
✅ **Docs**: Complete setup guide  

## 🏃 Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
cd apps/api
npm install
```

### 2. Set Up Google OAuth (Easiest First)

**Get Credentials:**
1. Go to [console.cloud.google.com](https://console.cloud.google.com/)
2. Create project → Enable Google+ API
3. Credentials → Create OAuth client ID → Web application
4. Add redirect: `http://localhost:3001/api/v1/auth/google/callback`
5. Copy Client ID & Secret

**Configure:**
```bash
# In apps/api/.env
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
API_URL=http://localhost:3001/api/v1
FRONTEND_URL=http://localhost:3000
```

### 3. Start & Test
```bash
# Terminal 1 - Backend
cd apps/api && npm run dev

# Terminal 2 - Frontend  
cd apps/web && npm run dev

# Open: http://localhost:3000/auth/login
# Click "Google" button → Login → Redirected to dashboard
```

## 📋 GitHub Setup (Optional - 2 minutes)

1. Go to [github.com/settings/developers](https://github.com/settings/developers)
2. New OAuth App
3. Callback: `http://localhost:3001/api/v1/auth/github/callback`
4. Copy Client ID & Secret to `.env`

## 📚 Need More Help?

- **Full Guide**: `OAUTH_INSTALLATION.md` (step-by-step)
- **Provider Setup**: `docs/OAUTH_SETUP.md` (detailed configs)

## 🐛 Quick Fixes

**Error: "Cannot find module passport-google-oauth20"**
→ Run `npm install` in `apps/api`

**Error: "Redirect URI mismatch"**
→ Check callback URLs match in Google Console and `.env`

**Error: "Email is required"**
→ Make sure you added `user:email` scope (GitHub)

---

**That's it! OAuth is ready to go. Start with Google, it's the easiest! 🎉**
