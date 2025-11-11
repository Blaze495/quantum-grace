# 🚀 OAuth Installation Guide

## ✅ What Has Been Implemented

### Frontend (apps/web):
- ✅ **OAuth Buttons** added to login and register pages
  - Google (with official Google logo)
  - GitHub (with GitHub icon)  
  - Apple (with Apple logo)
- ✅ **Handler functions** that redirect to backend OAuth endpoints
- ✅ **Professional UI** with "Or continue with" divider
- ✅ **Environment configuration** in `.env.example`

### Backend (apps/api):
- ✅ **OAuth Strategies** created for all 3 providers:
  - `google.strategy.ts`
  - `github.strategy.ts`
  - `apple.strategy.ts`
- ✅ **OAuth Routes** added to `auth.controller.ts`:
  - `GET /auth/google` & `GET /auth/google/callback`
  - `GET /auth/github` & `GET /auth/github/callback`
  - `GET /auth/apple` & `POST /auth/apple/callback`
- ✅ **OAuth Handler** `handleOAuthLogin()` in `auth.service.ts`
- ✅ **Package.json** updated with OAuth dependencies
- ✅ **Environment configuration** in `.env.example`
- ✅ **Module configuration** - strategies registered in `auth.module.ts`

---

## 📦 Step 1: Install Dependencies

### Backend Installation

Navigate to the backend directory and install the new OAuth packages:

```bash
cd apps/api
npm install
```

This will install:
- `passport-google-oauth20` - Google OAuth 2.0 strategy
- `passport-github2` - GitHub OAuth strategy
- `passport-apple` - Apple Sign In strategy
- `@types/passport-google-oauth20` - TypeScript types for Google
- `@types/passport-github2` - TypeScript types for GitHub

---

## 🔧 Step 2: Configure Environment Variables

### Frontend Configuration (apps/web)

1. Copy the example file:
   ```bash
   cd apps/web
   cp .env.example .env.local
   ```

2. The `.env.local` should already have:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
   ```

### Backend Configuration (apps/api)

1. Copy the example file:
   ```bash
   cd apps/api
   cp .env.example .env
   ```

2. Update the OAuth credentials in `.env`:
   ```env
   # API URL (for OAuth callbacks)
   API_URL=http://localhost:3001/api/v1
   FRONTEND_URL=http://localhost:3000

   # Google OAuth
   GOOGLE_CLIENT_ID=your-actual-google-client-id
   GOOGLE_CLIENT_SECRET=your-actual-google-client-secret

   # GitHub OAuth
   GITHUB_CLIENT_ID=your-actual-github-client-id
   GITHUB_CLIENT_SECRET=your-actual-github-client-secret

   # Apple OAuth (optional - more complex setup)
   APPLE_CLIENT_ID=your-apple-service-id
   APPLE_TEAM_ID=your-apple-team-id
   APPLE_KEY_ID=your-apple-key-id
   APPLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
   YOUR_KEY_HERE
   -----END PRIVATE KEY-----"
   ```

---

## 🔑 Step 3: Set Up OAuth Providers

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project or select existing
3. Enable Google+ API
4. Go to **Credentials** → **Create Credentials** → **OAuth client ID**
5. Select **Web application**
6. Add authorized redirect URIs:
   - `http://localhost:3001/api/v1/auth/google/callback`
7. Copy **Client ID** and **Client Secret** to your `.env`

### GitHub OAuth Setup

1. Go to [GitHub Settings → Developer settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in:
   - **Application name**: Quantum Grace
   - **Homepage URL**: `http://localhost:3000`
   - **Callback URL**: `http://localhost:3001/api/v1/auth/github/callback`
4. Copy **Client ID** and **Client Secret** to your `.env`

### Apple Sign In Setup (Optional)

Apple Sign In requires:
- Apple Developer Account ($99/year)
- App ID and Service ID configuration
- Private key (.p8 file)
- Team ID and Key ID

See the detailed guide in `docs/OAUTH_SETUP.md`

---

## 🧪 Step 4: Test OAuth Flow

### Start Both Servers

```bash
# Terminal 1 - Backend
cd apps/api
npm run dev

# Terminal 2 - Frontend
cd apps/web
npm run dev
```

### Test the Flow

1. Open `http://localhost:3000/auth/login`
2. Click one of the OAuth buttons (Google or GitHub)
3. You'll be redirected to the provider's login page
4. After authorization, you'll be redirected back to your app
5. The backend will process the OAuth data and create/login the user
6. You'll be redirected to `/dashboard` with your JWT token

---

## 🐛 Troubleshooting

### TypeScript Errors

If you see "Cannot find module" errors after installation:
1. Stop the dev server
2. Run `npm install` again
3. Restart the dev server

### OAuth Redirect Mismatch

If you get redirect URI mismatch errors:
1. Check that callback URLs match exactly in:
   - Provider console (Google/GitHub)
   - Backend `.env` file (`API_URL`)
   - OAuth strategy files
2. Include `http://` prefix and correct port

### "Email is required" Error

Some providers don't always return email:
- **GitHub**: Make sure you request `user:email` scope
- **Apple**: User must allow email sharing

### CORS Issues

If you see CORS errors, ensure your backend has CORS enabled for your frontend URL:
```typescript
// In main.ts
app.enableCors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
});
```

---

## 📊 How It Works

### Flow Diagram

```
1. User clicks "Continue with Google"
   ↓
2. Frontend redirects to: http://localhost:3001/api/v1/auth/google
   ↓
3. Backend redirects to Google login page
   ↓
4. User authorizes app on Google
   ↓
5. Google redirects to: http://localhost:3001/api/v1/auth/google/callback
   ↓
6. Backend GoogleStrategy validates and extracts user data
   ↓
7. AuthService.handleOAuthLogin() finds or creates user
   ↓
8. Backend generates JWT token
   ↓
9. Backend redirects to: http://localhost:3000/dashboard?token=JWT_TOKEN
   ↓
10. Frontend extracts token and stores in localStorage
   ↓
11. User is logged in!
```

### Database Considerations

OAuth users don't have passwords. Your user schema should allow `password` to be null:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String?  // nullable for OAuth users
  // ... other fields
}
```

---

## 🔒 Security Notes

1. **Never commit `.env` or `.env.local`** files to git
2. **Use different OAuth apps** for development and production  
3. **Rotate secrets regularly** in production
4. **Enable 2FA** on your provider accounts
5. **Set minimal scopes** - only request necessary permissions
6. **Validate email** from OAuth providers before trusting it

---

## 📚 Next Steps

1. **Install dependencies**: `npm install` in both apps
2. **Set up Google OAuth** (easiest to start with)
3. **Configure environment variables**
4. **Test the login flow**
5. **Set up GitHub OAuth**
6. **Optionally configure Apple** (more complex)

---

## 📖 Full Documentation

For more detailed setup instructions, see:
- `docs/OAUTH_SETUP.md` - Complete OAuth provider setup guide
- [Google OAuth Docs](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth Docs](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Apple Sign In Docs](https://developer.apple.com/sign-in-with-apple/)

---

## ✅ Checklist

- [ ] Install backend dependencies (`npm install` in apps/api)
- [ ] Copy `.env.example` to `.env` in both apps
- [ ] Set up Google OAuth credentials
- [ ] Set up GitHub OAuth credentials
- [ ] Update environment variables
- [ ] Test Google login flow
- [ ] Test GitHub login flow
- [ ] (Optional) Set up Apple Sign In

---

**Ready to go! 🚀 Start by installing dependencies and setting up Google OAuth.**
