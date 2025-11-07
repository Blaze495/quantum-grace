# 👥 Share Your App With Friends - SUPER SIMPLE!

## 🎯 For You (The Developer)

### **Step 1: Start Everything (3 Commands)**

Open **3 separate terminal windows** and run these:

**Terminal 1:**
```powershell
cd "d:\QUANTUM TRACKER"
pnpm dev
```

**Terminal 2:**
```powershell
ngrok http 3000
```

**Terminal 3:**
```powershell
ngrok http 3001
```

---

### **Step 2: Find Your URLs**

Look at **Terminal 2** (the one running `ngrok http 3000`). You'll see something like:

```
Forwarding    https://abc-123-xyz.ngrok-free.app -> http://localhost:3000
```

**Copy that URL!** This is your **FRONTEND URL** - `https://abc-123-xyz.ngrok-free.app`

Now look at **Terminal 3** (the one running `ngrok http 3001`). You'll see:

```
Forwarding    https://def-456-uvw.ngrok-free.app -> http://localhost:3001
```

**Copy that URL too!** This is your **BACKEND URL** - `https://def-456-uvw.ngrok-free.app`

---

### **Step 3: Tell Frontend About Backend**

1. Create this file: `apps\web\.env.local`

2. Paste this (replace with YOUR backend URL from Terminal 3):
   ```
   NEXT_PUBLIC_API_URL=https://def-456-uvw.ngrok-free.app/api/v1
   ```

3. Go to Terminal 1, press **Ctrl+C**, then run `pnpm dev` again

---

### **Step 4: Share the Frontend URL With Friends!**

Send your friends the **FRONTEND URL** from Terminal 2:
```
https://abc-123-xyz.ngrok-free.app
```

That's it! They can open it on their phone or computer!

---

## 📱 For Your Friends (Testing Instructions)

### **What Your Friend Sees:**

**Hi! I built an app called Quantum Grace. Can you test it?**

**Just open this link:**
```
https://abc-123-xyz.ngrok-free.app
```

**What to do:**
1. Click the link - it opens in your browser
2. You might see an "ngrok warning page" - just click **"Visit Site"**
3. You'll see the Quantum Grace landing page
4. Click **"Get Started Free"**
5. Create a test account (fake email is fine!)
6. Login
7. Check out the dashboard

**Please tell me:**
- ✅ Does it look good on your phone/computer?
- ✅ Are the buttons easy to click?
- ✅ Does registration work?
- ✅ Does login work?
- ✅ Any bugs or weird things?
- ✅ Any suggestions to make it better?

**Take screenshots if you find issues!**

---

## 💬 **Message Template for Friends**

Copy and send this to your friends:

```
Hey! 👋

I built a personal growth app called Quantum Grace and need your feedback!

🔗 Link: https://YOUR-FRONTEND-URL-HERE.ngrok-free.app

What to test:
1. Open the link (click "Visit Site" if you see a warning)
2. Try registering a new account
3. Login
4. Check out the dashboard
5. Let me know what you think!

Please tell me:
- Does it work on your device?
- How's the design?
- Any bugs or issues?
- What would you add/change?

Thanks! 🙏
```

---

## 🎥 **Video Demo for Friends**

Instead of just text, you could:
1. Record a quick screen recording showing:
   - How to register
   - How to login
   - What features exist
2. Share via WhatsApp/Telegram
3. They'll understand better!

---

## 📊 **Collect Feedback Easily**

### **Option 1: Google Form**
Create a simple Google Form with questions like:
- Did the app work? (Yes/No)
- What device are you using? (iPhone/Android/Computer)
- How's the design? (1-5 stars)
- What would you improve? (Text field)
- Screenshots (Upload)

### **Option 2: WhatsApp Group**
- Create a group "Quantum Grace Testing"
- Share the link
- Friends send feedback directly

### **Option 3: Notion/Trello**
- Create a public board
- Friends can add cards for bugs/suggestions

---

## ⚡ **Quick Checklist**

Before sharing with friends:

- [ ] All 3 terminals running (`pnpm dev`, `ngrok http 3000`, `ngrok http 3001`)
- [ ] `.env.local` created with backend URL
- [ ] `pnpm dev` restarted after creating `.env.local`
- [ ] Tested the frontend URL yourself first
- [ ] Can register and login successfully
- [ ] Ready to receive feedback!

---

## 🐛 **If Friends Report Issues**

### "Link doesn't work"
→ Make sure all 3 terminals are still running
→ ngrok URLs expire if you close the terminal

### "Can't register/login"
→ Check `.env.local` has the correct backend URL
→ Make sure backend tunnel (port 3001) is running

### "Looks broken on mobile"
→ This is good feedback! You'll fix responsive design issues

### "Gets an error"
→ Ask them to take a screenshot
→ They can tell you the exact error message

---

## 💡 **Pro Tips**

1. **Test it yourself first** on your phone before sharing
2. **Share with 2-3 people first**, fix issues, then share with more
3. **Keep the terminals open** while friends are testing
4. **Thank your testers!** Maybe offer to test their projects too
5. **Act on feedback** - people love seeing their suggestions implemented

---

## 🔄 **When URLs Change**

ngrok URLs change every time you restart. If you need to share again:

1. Look at the ngrok terminals
2. Copy the NEW URLs
3. Update `.env.local` with new backend URL
4. Restart `pnpm dev`
5. Share the NEW frontend URL

**OR** upgrade to ngrok paid ($8/month) for permanent URLs.

---

## 📱 **Alternative: Deploy for Free**

If ngrok is confusing, you can deploy to:

### **Vercel (Frontend) - FREE**
1. Push code to GitHub
2. Connect to Vercel
3. Auto-deploys
4. Get permanent URL like `quantumgrace.vercel.app`

### **Railway (Backend) - FREE**
1. Push code to GitHub
2. Connect to Railway
3. Add PostgreSQL
4. Auto-deploys
5. Get permanent URL

Then you have permanent URLs to share! (We can set this up later)

---

## 🎯 **Summary**

**For you:**
1. Run 3 commands (pnpm dev, 2x ngrok)
2. Create `.env.local` with backend URL
3. Share frontend URL with friends

**For friends:**
1. Click link
2. Test the app
3. Give feedback

**That's it!** 🎉

---

**Need help? Just ask and I'll make it even simpler!**
