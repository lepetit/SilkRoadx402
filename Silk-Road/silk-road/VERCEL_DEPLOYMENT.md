# 🚀 Vercel Deployment Guide - SilkRoadx402

Complete guide for deploying SilkRoadx402 to Vercel as a public testable demo.

---

## 📋 **Prerequisites**

- [ ] Vercel account ([sign up free](https://vercel.com/signup))
- [ ] GitHub repository with your code
- [ ] Basic Solana wallet for testing (Phantom recommended)

---

## 🔧 **Step 1: Environment Variables**

For a **public demo** (no database, mock mode), use these Vercel environment variables:

### **Required Variables**

```bash
# Enable Mock Mode (no database needed)
NEXT_PUBLIC_MOCK_MODE=true

# Bypass Token Gating for Testing
NEXT_PUBLIC_MOCK_TOKEN_GATING=true

# Disable Admin Panel for Public Demo
NEXT_PUBLIC_DISABLE_ADMIN=true

# Solana RPC (use public endpoints for demo)
NEXT_PUBLIC_SOLANA_MAINNET_RPC=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_SOLANA_DEVNET_RPC=https://api.devnet.solana.com

# SRx402 Token Mint Address
NEXT_PUBLIC_SRX402_MINT_ADDRESS=49AfJsWb9E7VjBDTdZ2DjnSLFgSEvCoP1wdXuhHbpump

# App URL (update after deployment)
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app

# Node Environment
NODE_ENV=production
```

### **Optional (Not Needed for Demo)**

These are only needed if you connect a real database or want full features:

```bash
# MongoDB (leave empty for mock mode)
MONGODB_URI=

# Cloudinary (leave empty for mock mode - uses Unsplash)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Security Secrets (use for production)
JWT_SECRET=your-secret-here
APP_SECRET=your-encryption-secret-here

# Admin (disabled for public demo)
ADMIN_CODE=
```

---

## 🚀 **Step 2: Deploy to Vercel**

### **Option A: Deploy via Vercel Dashboard**

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "Add New Project"**
3. **Import your GitHub repository**
4. **Configure the project:**
   - Framework Preset: `Next.js`
   - Root Directory: `Silk-Road/silk-road`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. **Add Environment Variables** (from Step 1 above)
6. **Click "Deploy"**

### **Option B: Deploy via Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to project directory
cd Silk-Road/silk-road

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# For production deployment
vercel --prod
```

---

## 🔒 **Step 3: Configure Mock Mode**

The demo is configured to use **mock data** instead of a database:

### **What Mock Mode Does:**
- ✅ All listings stored in memory
- ✅ Simulated x402 payments
- ✅ No MongoDB required
- ✅ Perfect for testing UI/UX
- ✅ Data resets on server restart

### **Seed Data Included:**
The app automatically creates 5 sample listings on startup:
- Trading Bot ($99)
- Custom API Tool ($49)
- Python Script ($19)
- MEV Bot ($299)
- Solana Sniper Bot ($149)

### **Token Gating Bypass:**
When `NEXT_PUBLIC_MOCK_TOKEN_GATING=true`, all wallets are treated as having ≥50k $SRx402 tokens.

---

## 🎨 **Step 4: Test Your Deployment**

### **User Flow (Buyer)**
1. Visit your deployed URL
2. Click "Connect Wallet" (use Phantom)
3. Accept Terms of Service (scroll to bottom)
4. View "Token Gated ✓" status
5. Navigate to `/browse` to see mock listings
6. Click a listing to view details
7. Click "Purchase Now" (simulated payment)
8. View delivery URL on success page

### **Seller Flow**
1. Connect wallet + accept TOS
2. Navigate to `/sell`
3. Create a new listing (uses Unsplash for images)
4. View at `/my-listings`
5. Edit or delete listings

### **Admin Flow (Disabled for Public Demo)**
Admin routes return 404 when `NEXT_PUBLIC_DISABLE_ADMIN=true`:
- ❌ `/admin` - Login page (blocked)
- ❌ `/admin/dashboard` - Dashboard (blocked)
- ❌ All `/api/admin/*` endpoints (return 404)

---

## 📊 **Step 5: Monitor Deployment**

### **Vercel Dashboard**
- View deployment logs
- Monitor build status
- Check environment variables
- View domain settings

### **Logs & Debugging**
```bash
# View logs via CLI
vercel logs

# Check function logs
vercel logs --follow
```

### **Common Issues**

**Issue: Wallet not connecting**
- Solution: Check browser console, ensure Phantom is installed

**Issue: Hydration errors**
- Solution: Clear browser cache, these should be fixed

**Issue: Images not loading**
- Solution: Check `next.config.ts` allows `images.unsplash.com`

**Issue: Token gating failing**
- Solution: Ensure `NEXT_PUBLIC_MOCK_TOKEN_GATING=true` is set

---

## 🔄 **Step 6: Re-enable Admin (Optional)**

To test admin features privately (before going fully public):

1. **Update environment variable:**
   ```bash
   NEXT_PUBLIC_DISABLE_ADMIN=false
   ```

2. **Set admin code:**
   ```bash
   ADMIN_CODE=your-secret-code-here
   ```

3. **Redeploy**

4. **Access admin at:**
   - `/admin` - Login with your `ADMIN_CODE`
   - `/admin/dashboard` - Review and approve listings

---

## 🌐 **Step 7: Custom Domain (Optional)**

### **Add Custom Domain**
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `demo.silkroadx402.com`)
3. Update DNS records (Vercel provides instructions)
4. Update `NEXT_PUBLIC_APP_URL` environment variable

---

## 🚨 **Important Notes for Public Demo**

### **Security Considerations:**
- ✅ Admin is **disabled** (`NEXT_PUBLIC_DISABLE_ADMIN=true`)
- ✅ No database, so **no data persistence**
- ✅ Token gating is **bypassed for demo**
- ⚠️ **Don't use for real payments** - mock mode only
- ⚠️ **Data resets** on every deployment/restart

### **Rate Limiting:**
Vercel free tier limits:
- **100GB bandwidth/month**
- **100 serverless function executions/day**
- **10 second function timeout**

### **Mock vs Real Mode:**

| Feature | Mock Mode (Demo) | Real Mode (Production) |
|---------|------------------|------------------------|
| Database | ❌ In-memory | ✅ MongoDB Atlas |
| Payments | ❌ Simulated | ✅ Real x402 |
| Token Gating | ❌ Bypassed | ✅ On-chain check |
| Images | ✅ Unsplash | ✅ Cloudinary |
| Admin | ❌ Disabled | ✅ JWT auth |
| Data Persistence | ❌ Resets | ✅ Permanent |

---

## 🔧 **Step 8: Transition to Production**

When ready to go live with a real database:

1. **Set up MongoDB Atlas:**
   ```bash
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/silkroadx402
   ```

2. **Set up Cloudinary:**
   ```bash
   CLOUDINARY_CLOUD_NAME=your-cloud
   CLOUDINARY_API_KEY=your-key
   CLOUDINARY_API_SECRET=your-secret
   ```

3. **Disable Mock Mode:**
   ```bash
   NEXT_PUBLIC_MOCK_MODE=false
   NEXT_PUBLIC_MOCK_TOKEN_GATING=false
   ```

4. **Enable Real Token Gating:**
   - Removes token bypass
   - Requires ≥50k $SRx402 on mainnet

5. **Secure Admin:**
   ```bash
   NEXT_PUBLIC_DISABLE_ADMIN=false
   ADMIN_CODE=strong-random-code-here
   JWT_SECRET=strong-jwt-secret-here
   ```

6. **Redeploy to Vercel**

---

## 📞 **Support & Links**

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Solana Docs:** https://docs.solana.com
- **x402 Protocol:** https://x402.gitbook.io/x402

---

## ✅ **Deployment Checklist**

- [ ] Vercel account created
- [ ] Repository connected to Vercel
- [ ] Environment variables configured
- [ ] `NEXT_PUBLIC_MOCK_MODE=true` set
- [ ] `NEXT_PUBLIC_MOCK_TOKEN_GATING=true` set
- [ ] `NEXT_PUBLIC_DISABLE_ADMIN=true` set
- [ ] First deployment successful
- [ ] Wallet connection tested
- [ ] TOS modal works
- [ ] Browse page shows mock listings
- [ ] Purchase flow works
- [ ] Delivery page displays URL
- [ ] Seller flow (create listing) works
- [ ] Admin routes return 404
- [ ] Custom domain configured (optional)

---

## 🎉 **Your Demo is Live!**

Share the link with users to test the SilkRoadx402 MVP! 🚀

**Example Demo URL:** `https://silkroadx402-demo.vercel.app`

---

*For production deployment with real database and payments, see the main `PROJECT_SPEC.md` file.*

