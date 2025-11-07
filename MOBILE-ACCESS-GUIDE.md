# 📱 Mobile Access Guide

## 🎯 Access Your App from Mobile Phone

Your computer's local IP address is: **192.168.0.101**

---

## 📋 **Quick Setup Instructions**

### **Step 1: Make Sure Both Devices are on Same WiFi**
- ✅ Your computer and phone must be on the **same WiFi network**

### **Step 2: Access URLs from Mobile**

Open these URLs on your mobile phone browser:

#### **Frontend (Web App)**
```
http://192.168.0.101:3000
```

#### **Backend API**
```
http://192.168.0.101:3001
```

#### **API Documentation**
```
http://192.168.0.101:3001/api/docs
```

---

## 🔧 **Optional: Configure API URL**

If you want the frontend to use your network IP for API calls:

1. **Create/Edit this file:**
   ```
   apps/web/.env.local
   ```

2. **Add this line:**
   ```
   NEXT_PUBLIC_API_URL=http://192.168.0.101:3001/api/v1
   ```

3. **Restart the dev server:**
   ```powershell
   # Stop with Ctrl+C, then restart
   pnpm dev
   ```

---

## 🚀 **Testing Steps**

### On Your Mobile Phone:

1. **Connect to same WiFi** as your computer

2. **Open browser** (Chrome, Safari, etc.)

3. **Go to:** `http://192.168.0.101:3000`

4. **You should see** the Quantum Grace landing page!

5. **Test Registration:**
   - Click "Get Started Free"
   - Fill in the form
   - Create account

6. **Test Login:**
   - Login with your credentials
   - See the dashboard

7. **Test Mobile UI:**
   - Check responsive design
   - Test touch interactions
   - Navigate between pages

---

## 🛠️ **Troubleshooting**

### ❌ **Can't Access from Phone?**

#### **Check Firewall:**
Windows Firewall might be blocking connections. Run this:

```powershell
# Allow Node.js through firewall (run as administrator)
netsh advfirewall firewall add rule name="Node.js Port 3000" dir=in action=allow protocol=TCP localport=3000
netsh advfirewall firewall add rule name="Node.js Port 3001" dir=in action=allow protocol=TCP localport=3001
```

#### **Verify Server is Running:**
Make sure your dev server is still running:
```powershell
pnpm dev
```

#### **Check IP Address:**
Your IP might change. Check current IP:
```powershell
ipconfig | findstr /i "IPv4"
```

#### **Try Different Browser:**
- Try Chrome if Safari doesn't work (or vice versa)
- Try private/incognito mode

---

## 📱 **Testing Mobile Features**

### **Responsive Design:**
- ✅ Test all breakpoints
- ✅ Check button sizes for touch
- ✅ Verify text readability
- ✅ Test forms on mobile keyboard

### **PWA Features:**
Once we enable PWA, you'll be able to:
- 📱 Install app on home screen
- 🔄 Use offline
- 📬 Receive notifications

---

## 🌐 **Network Details**

**Your Computer:**
- Local IP: `192.168.0.101`
- Frontend Port: `3000`
- Backend Port: `3001`

**Mobile Access URLs:**
- Web: `http://192.168.0.101:3000`
- API: `http://192.168.0.101:3001`

---

## 💡 **Pro Tips**

1. **Bookmark the URL** on your phone for quick access

2. **Add to Home Screen:**
   - iOS: Safari → Share → Add to Home Screen
   - Android: Chrome → Menu → Add to Home Screen

3. **Keep dev server running** on your computer

4. **Use Chrome DevTools** for remote debugging:
   - Chrome on computer → chrome://inspect
   - Connect phone via USB
   - Debug mobile browser

---

## 🔒 **Security Note**

This setup is for **local development only**. The app is accessible to any device on your WiFi network. For production, you'll deploy to a proper hosting service with HTTPS.

---

## 📞 **Quick Reference Card**

```
┌─────────────────────────────────────┐
│  Mobile Access Quick Reference      │
├─────────────────────────────────────┤
│  IP Address: 192.168.0.101          │
│  Web App:    :3000                  │
│  API:        :3001                  │
│                                     │
│  Full URLs:                         │
│  http://192.168.0.101:3000          │
│  http://192.168.0.101:3001          │
└─────────────────────────────────────┘
```

---

**Happy Mobile Testing! 📱✨**
