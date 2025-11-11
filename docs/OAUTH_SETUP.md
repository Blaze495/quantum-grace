# OAuth Setup Guide

This guide will help you set up Google, GitHub, and Apple OAuth authentication for Quantum Grace.

## 🔧 Environment Setup

1. Copy `.env.example` to `.env.local` in the `apps/web` directory:
   ```bash
   cp apps/web/.env.example apps/web/.env.local
   ```

2. Update the OAuth credentials in `.env.local` (see setup instructions below)

---

## 🔵 Google OAuth Setup

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API** for your project

### Step 2: Create OAuth Credentials

1. Navigate to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Choose **Web application**
4. Configure:
   - **Name**: Quantum Grace Web
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (development)
     - `https://yourdomain.com` (production)
   - **Authorized redirect URIs**:
     - `http://localhost:3001/api/v1/auth/google/callback` (development)
     - `https://api.yourdomain.com/api/v1/auth/google/callback` (production)

### Step 3: Get Your Credentials

1. Copy the **Client ID** and **Client Secret**
2. Add them to your `.env.local`:
   ```env
   GOOGLE_CLIENT_ID=your-actual-google-client-id
   GOOGLE_CLIENT_SECRET=your-actual-google-client-secret
   ```

---

## 🐙 GitHub OAuth Setup

### Step 1: Register OAuth App

1. Go to [GitHub Settings → Developer settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in the details:
   - **Application name**: Quantum Grace
   - **Homepage URL**: `http://localhost:3000` (development)
   - **Authorization callback URL**: 
     - Development: `http://localhost:3001/api/v1/auth/github/callback`
     - Production: `https://api.yourdomain.com/api/v1/auth/github/callback`

### Step 2: Get Your Credentials

1. After creating the app, copy the **Client ID**
2. Generate a new **Client Secret**
3. Add them to your `.env.local`:
   ```env
   GITHUB_CLIENT_ID=your-actual-github-client-id
   GITHUB_CLIENT_SECRET=your-actual-github-client-secret
   ```

---

## 🍎 Apple OAuth Setup

Apple Sign In is more complex than Google/GitHub. Here's what you need:

### Step 1: Apple Developer Account

You need an **Apple Developer Account** ($99/year)

### Step 2: Register App ID

1. Go to [Apple Developer Portal](https://developer.apple.com/account/)
2. Navigate to **Certificates, Identifiers & Profiles**
3. Click **Identifiers** → **+** (Add new)
4. Select **App IDs** and configure:
   - **Description**: Quantum Grace
   - **Bundle ID**: `com.quantumgrace.web`
   - Enable **Sign In with Apple** capability

### Step 3: Create Service ID

1. Click **Identifiers** → **+** again
2. Select **Services IDs**
3. Configure:
   - **Description**: Quantum Grace Web
   - **Identifier**: `com.quantumgrace.web.service`
   - Enable **Sign In with Apple**
   - Configure **Return URLs**:
     - `http://localhost:3001/api/v1/auth/apple/callback`
     - `https://api.yourdomain.com/api/v1/auth/apple/callback`

### Step 4: Create Private Key

1. Go to **Keys** → **+**
2. Configure:
   - **Key Name**: Quantum Grace Sign In Key
   - Enable **Sign In with Apple**
   - Configure and download the `.p8` key file
   - Note the **Key ID** (10 characters)

### Step 5: Get Team ID

1. Your **Team ID** is shown at the top of the Apple Developer page
2. It's a 10-character string

### Step 6: Configure Environment

Add to your `.env.local`:
```env
APPLE_CLIENT_ID=com.quantumgrace.web.service
APPLE_TEAM_ID=YOUR10CHARTEAMID
APPLE_KEY_ID=YOUR10CHARKEYID
APPLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
YOUR_FULL_PRIVATE_KEY_CONTENT_HERE
-----END PRIVATE KEY-----"
```

---

## 🔐 Backend Implementation

Your backend (`http://localhost:3001/api/v1`) needs to implement these endpoints:

### Required Endpoints

1. **Google OAuth**:
   - `GET /auth/google` - Initiates Google OAuth flow
   - `GET /auth/google/callback` - Handles Google callback

2. **GitHub OAuth**:
   - `GET /auth/github` - Initiates GitHub OAuth flow
   - `GET /auth/github/callback` - Handles GitHub callback

3. **Apple OAuth**:
   - `GET /auth/apple` - Initiates Apple Sign In
   - `POST /auth/apple/callback` - Handles Apple callback (Apple uses POST)

### Expected Response

All OAuth callbacks should return a JWT token and redirect to:
```
http://localhost:3000/dashboard?token=YOUR_JWT_TOKEN
```

The frontend will extract the token and store it in `localStorage`.

---

## 🧪 Testing OAuth Locally

### Development URLs

Make sure your backend is running on `http://localhost:3001` and set these callback URLs:

```
Google:  http://localhost:3001/api/v1/auth/google/callback
GitHub:  http://localhost:3001/api/v1/auth/github/callback
Apple:   http://localhost:3001/api/v1/auth/apple/callback
```

### Test Flow

1. Click Google/GitHub/Apple button on login page
2. You'll be redirected to the provider's login page
3. After authorization, you'll be redirected back to your app
4. Backend processes the callback and returns a JWT
5. Frontend stores the token and redirects to dashboard

---

## 🚀 Production Deployment

### Update Redirect URLs

When deploying to production, update all redirect URLs in:

1. **Google Cloud Console** → Add production URLs
2. **GitHub OAuth App** → Update callback URL
3. **Apple Developer Portal** → Add production domain

### Environment Variables

Update your production `.env`:
```env
NEXT_PUBLIC_APP_URL=https://quantumgrace.com
NEXT_PUBLIC_API_URL=https://api.quantumgrace.com/api/v1
```

---

## 📚 Useful Resources

### Google OAuth
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)

### GitHub OAuth
- [GitHub OAuth Apps](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [GitHub Developer Settings](https://github.com/settings/developers)

### Apple Sign In
- [Apple Sign In Documentation](https://developer.apple.com/sign-in-with-apple/)
- [Apple Developer Portal](https://developer.apple.com/account/)

---

## 🐛 Troubleshooting

### Common Issues

1. **"Redirect URI mismatch"**
   - Ensure callback URLs match exactly in provider settings
   - Include `http://` or `https://` prefix
   - Check for trailing slashes

2. **"Invalid client"**
   - Verify Client ID and Secret are correct
   - Check if OAuth app is enabled in provider console

3. **"Unauthorized"**
   - Ensure backend endpoints are accessible
   - Check CORS settings on backend
   - Verify API URL in `.env.local`

4. **Apple Sign In issues**
   - Verify `.p8` key is correctly formatted
   - Check Team ID and Key ID are accurate
   - Ensure Service ID is properly configured

---

## 🔒 Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Use different OAuth apps** for development and production
3. **Rotate secrets regularly** in production
4. **Enable 2FA** on your Google Cloud, GitHub, and Apple accounts
5. **Monitor OAuth usage** in provider consoles
6. **Set proper scopes** - only request necessary permissions

---

## 📞 Need Help?

If you encounter issues:

1. Check the browser console for errors
2. Check backend logs for OAuth flow details
3. Verify all environment variables are set correctly
4. Test OAuth flow in incognito/private mode
5. Review provider-specific documentation

---

**Note**: OAuth setup requires backend implementation. Make sure your backend API is configured to handle OAuth flows before testing the frontend buttons.
