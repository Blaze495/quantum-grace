# 🌍 Access Your App from ANYWHERE (Mobile Network)

## ✅ ngrok is installed!

---

## 🚀 **3 Simple Steps:**

### **Step 1: Sign Up for ngrok (Free)**

1. Go to: **https://dashboard.ngrok.com/signup**
2. Sign up with email or Google (it's FREE!)
3. After signup, go to: **https://dashboard.ngrok.com/get-started/your-authtoken**
4. Copy your authtoken (looks like: `2abc...xyz123`)

---

### **Step 2: Add Your Token**

Run this command (replace with YOUR token):
```powershell
ngrok config add-authtoken YOUR_TOKEN_HERE
```

Example:
```powershell
ngrok config add-authtoken 2abcXYZ123...
```

You only need to do this ONCE!

---

### **Step 3: Start ngrok Tunnels**

Keep `pnpm dev` running, then open **TWO NEW terminals**:

**Terminal 1:**
```powershell
ngrok http 3000 --log=stdout
```

**Terminal 2:**
```powershell
ngrok http 3001 --log=stdout
```

You'll see something like:
```
Forwarding   https://abc-123-xyz.ngrok-free.app -> http://localhost:3000
```

---

### **Step 4: Configure Frontend**

1. **Copy the BACKEND URL** from Terminal 2 (port 3001)
   Example: `https://def-456-uvw.ngrok-free.app`

2. **Create file:** `apps/web/.env.local`

3. **Add this line:**
   ```
   NEXT_PUBLIC_API_URL=https://YOUR-BACKEND-URL/api/v1
   ```
   
   Example:
   ```
   NEXT_PUBLIC_API_URL=https://def-456-uvw.ngrok-free.app/api/v1
   ```

4. **Restart dev server:**
   ```powershell
   # Press Ctrl+C to stop
   pnpm dev
   ```

---

### **Step 5: Access from Mobile!**

1. **Copy the FRONTEND URL** from Terminal 1 (port 3000)
   Example: `https://abc-123-xyz.ngrok-free.app`

2. **Open it on your phone** - works on mobile network (4G/5G)!

3. **Test everything:**
   - Register
   - Login
   - Navigate dashboard
   - Works from ANYWHERE! 🌍

---

## 📱 **Visual Guide:**

```
┌──────────────────────────────────────┐
│  Terminal Setup                      │
├──────────────────────────────────────┤
│                                      │
│  Terminal 1:  pnpm dev               │
│  Terminal 2:  ngrok http 3000        │
│  Terminal 3:  ngrok http 3001        │
│                                      │
└──────────────────────────────────────┘

        ↓

┌──────────────────────────────────────┐
│  URLs You'll Get                     │
├──────────────────────────────────────┤
│                                      │
│  Frontend:  https://abc.ngrok.io     │
│  Backend:   https://xyz.ngrok.io     │
│                                      │
└──────────────────────────────────────┘

        ↓

┌──────────────────────────────────────┐
│  Create .env.local                   │
├──────────────────────────────────────┤
│                                      │
│  NEXT_PUBLIC_API_URL=                │
│    https://xyz.ngrok.io/api/v1       │
│                                      │
└──────────────────────────────────────┘

        ↓

┌──────────────────────────────────────┐
│  Restart pnpm dev                    │
├──────────────────────────────────────┤
│                                      │
│  Ctrl+C, then: pnpm dev              │
│                                      │
└──────────────────────────────────────┘

        ↓

┌──────────────────────────────────────┐
│  Open on Mobile Phone                │
├──────────────────────────────────────┤
│                                      │
│  Open: https://abc.ngrok.io          │
│  Works on 4G/5G from anywhere!       │
│                                      │
└──────────────────────────────────────┘
```

---

## ⚡ **Quick Command Reference:**

```powershell
# 1. Add token (once)
ngrok config add-authtoken YOUR_TOKEN

# 2. Start frontend tunnel
ngrok http 3000

# 3. Start backend tunnel (in new terminal)
ngrok http 3001

# 4. View ngrok dashboard
# Open: http://localhost:4040
```

---

## 🎯 **Example Workflow:**

```powershell
# Terminal 1 - Dev Server
PS> cd "d:\QUANTUM TRACKER"
PS> pnpm dev

# Terminal 2 - Frontend Tunnel
PS> ngrok http 3000
# Copy URL: https://abc-123.ngrok-free.app

# Terminal 3 - Backend Tunnel
PS> ngrok http 3001
# Copy URL: https://xyz-789.ngrok-free.app

# Create apps/web/.env.local:
NEXT_PUBLIC_API_URL=https://xyz-789.ngrok-free.app/api/v1

# Restart Terminal 1:
Ctrl+C
PS> pnpm dev

# Open on phone:
https://abc-123.ngrok-free.app
```

---

## 💡 **Pro Tips:**

1. **ngrok URLs change** each time you restart. Save them!

2. **Free tier shows warning page** first - just click "Visit Site"

3. **View all requests** at http://localhost:4040

4. **Share with friends** - they can test your app too!

5. **URLs expire** when you close ngrok (perfect for security!)

---

## 🐛 **Common Issues:**

### "Invalid Host Header"?
→ This is fixed in Next.js by default. Should work fine.

### Can't reach API?
→ Make sure `.env.local` has correct backend URL
→ Must end with `/api/v1`
→ Restart `pnpm dev` after creating `.env.local`

### "Too Many Connections"?
→ Free tier limits. Just restart ngrok.

### Frontend works but login fails?
→ Backend tunnel might not be running
→ Check `.env.local` has correct URL
→ Check Terminal 3 shows active ngrok tunnel

---

## 🔐 **Security:**

- Your app is public while ngrok is running
- URLs are random and hard to guess
- URLs expire when you close ngrok
- Perfect for testing, use proper hosting for production

---

## 📞 **Need Help?**

If something doesn't work:
1. Make sure all 3 terminals are running
2. Check `.env.local` file exists and has correct URL
3. Restart `pnpm dev` after creating `.env.local`
4. Try opening http://localhost:4040 to see ngrok status

---

**You're all set! Follow the steps above and your app will be accessible from anywhere! 🚀**
