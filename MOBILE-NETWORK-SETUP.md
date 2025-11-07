# 📱 Access from Mobile Network (Anywhere!)

To access your app from mobile network (4G/5G), you need to expose your local server to the internet using **ngrok**.

---

## 🚀 **Quick Setup with ngrok**

### **Step 1: Install ngrok**

**Option A - Using Chocolatey (Recommended):**
```powershell
choco install ngrok
```

**Option B - Download Manually:**
1. Go to: https://ngrok.com/download
2. Download Windows version
3. Extract to a folder
4. Add to PATH or use directly

**Option C - Using npm:**
```powershell
npm install -g ngrok
```

---

### **Step 2: Sign Up for Free Account**

1. Go to: https://dashboard.ngrok.com/signup
2. Sign up (it's free!)
3. Copy your authtoken from: https://dashboard.ngrok.com/get-started/your-authtoken

### **Step 3: Add Your Token**

```powershell
ngrok config add-authtoken YOUR_TOKEN_HERE
```

---

### **Step 4: Start ngrok Tunnels**

You need to expose both ports (3000 and 3001). Open **TWO separate terminals**:

**Terminal 1 - Expose Frontend (Port 3000):**
```powershell
ngrok http 3000
```

**Terminal 2 - Expose Backend (Port 3001):**
```powershell
ngrok http 3001
```

You'll get URLs like:
```
Frontend: https://abc123.ngrok-free.app
Backend:  https://xyz789.ngrok-free.app
```

---

### **Step 5: Update Frontend to Use ngrok API URL**

Create this file:
```
apps/web/.env.local
```

Add this line (replace with YOUR backend ngrok URL):
```
NEXT_PUBLIC_API_URL=https://xyz789.ngrok-free.app/api/v1
```

---

### **Step 6: Restart Dev Server**

```powershell
# Stop with Ctrl+C
# Then restart
pnpm dev
```

---

### **Step 7: Access from Mobile**

Now you can access from ANYWHERE (even on mobile network):

Open on your phone:
```
https://abc123.ngrok-free.app
```

That's it! Works on 4G/5G from anywhere in the world! 🌍

---

## 🎯 **Complete Example:**

```powershell
# Terminal 1 - Dev Server
pnpm dev

# Terminal 2 - ngrok for Frontend
ngrok http 3000

# Terminal 3 - ngrok for Backend  
ngrok http 3001
```

You'll see:
```
Frontend URL: https://abc-123-xyz.ngrok-free.app
Backend URL:  https://def-456-uvw.ngrok-free.app
```

Update `.env.local`:
```
NEXT_PUBLIC_API_URL=https://def-456-uvw.ngrok-free.app/api/v1
```

Restart `pnpm dev`, then access frontend URL on mobile!

---

## ⚡ **Alternative: Single Command Setup**

I can create a script that does everything automatically!

---

## 📝 **Free vs Paid ngrok**

**Free (Perfect for testing):**
- ✅ Random URLs (changes each time)
- ✅ HTTPS included
- ✅ Unlimited requests
- ⚠️ Shows ngrok warning page first

**Paid ($8/month):**
- ✅ Custom domains
- ✅ No warning page
- ✅ More concurrent tunnels

For development, **FREE is perfect!**

---

## 🔒 **Security Note**

When using ngrok:
- Your local app is accessible to anyone with the URL
- URLs are random and hard to guess
- They expire when you close ngrok
- Perfect for testing, but use real hosting for production

---

## 🐛 **Troubleshooting**

### ngrok shows "Too Many Connections"?
→ Free tier has limits. Just restart ngrok.

### Frontend can't reach Backend?
→ Make sure `.env.local` has correct backend ngrok URL
→ Must include `/api/v1` at the end

### "This site can't be reached"?
→ Make sure `pnpm dev` is still running
→ Make sure ngrok is still running

---

## 💡 **Pro Tips**

1. **Keep 3 terminals open:**
   - Terminal 1: `pnpm dev`
   - Terminal 2: `ngrok http 3000`
   - Terminal 3: `ngrok http 3001`

2. **Bookmark the ngrok URLs** on your phone

3. **Share with friends** - they can test too!

4. **Use ngrok's web interface:**
   → http://localhost:4040
   → See all requests in real-time

---

Ready to set it up? Let me know if you want me to create an automated script!
