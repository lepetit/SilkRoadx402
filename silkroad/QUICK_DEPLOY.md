# ⚡ Quick Vercel Deploy - 5 Minutes

Deploy SilkRoadx402 demo to Vercel in 5 minutes.

---

## 🚀 **One-Click Deploy**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO&env=NEXT_PUBLIC_MOCK_MODE,NEXT_PUBLIC_MOCK_TOKEN_GATING,NEXT_PUBLIC_DISABLE_ADMIN&envDescription=Required%20for%20public%20demo&project-name=silkroadx402-demo&root-directory=Silk-Road/silk-road)

---

## 📋 **Manual Deploy (5 Steps)**

### **1. Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### **2. Import to Vercel**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your repo
4. **Root Directory:** `Silk-Road/silk-road`

### **3. Add Environment Variables**
Copy from `.env.vercel.public` or paste these:

```env
NEXT_PUBLIC_MOCK_MODE=true
NEXT_PUBLIC_MOCK_TOKEN_GATING=true
NEXT_PUBLIC_DISABLE_ADMIN=true
NEXT_PUBLIC_SOLANA_MAINNET_RPC=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_SOLANA_DEVNET_RPC=https://api.devnet.solana.com
NEXT_PUBLIC_SRX402_MINT_ADDRESS=49AfJsWb9E7VjBDTdZ2DjnSLFgSEvCoP1wdXuhHbpump
NODE_ENV=production
```

### **4. Deploy**
Click **"Deploy"** and wait ~3 minutes

### **5. Test**
- Visit your deployed URL
- Connect Phantom wallet
- Accept TOS
- Browse mock listings
- Test purchase flow

---

## ✅ **What's Enabled**

- ✅ Mock data (no database needed)
- ✅ Token gating bypassed (all wallets pass)
- ✅ Sample listings included
- ✅ Full buyer/seller flows
- ✅ Simulated x402 payments
- ❌ Admin panel (disabled)
- ❌ Data persistence (resets on restart)

---

## 🔧 **After Deployment**

Update `NEXT_PUBLIC_APP_URL`:
1. Copy your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Go to Vercel Dashboard → Settings → Environment Variables
3. Update `NEXT_PUBLIC_APP_URL` with your URL
4. Redeploy

---

## 📞 **Need Help?**

See full guide: `VERCEL_DEPLOYMENT.md`

---

**That's it! Share your demo link! 🎉**

