# R2H.AI - Production Deployment Guide

## 🚀 Deploy to Your Domain

### Prerequisites
- ✅ GitHub account
- ✅ Domain name (e.g., r2hai.com)
- ✅ Vercel account (free)

---

## Option 1: Deploy to Vercel (Recommended)

### Step 1: Push Code to GitHub

```bash
# Add all files to git
git add .

# Commit changes
git commit -m "Production ready - Complete auth system with OTP"

# Push to GitHub
git push origin main
```

### Step 2: Deploy to Vercel

1. **Go to**: https://vercel.com
2. **Sign in** with GitHub
3. **Click**: "Add New Project"
4. **Import** your GitHub repository: `fiery-nova`
5. **Configure**:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 3: Add Environment Variables in Vercel

In the Vercel project settings, add these environment variables:

```env
DATABASE_URL=postgresql://neondb_owner:npg_XPIa0QlyBr7D@ep-fragrant-queen-a4hkxb7e-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require

RESEND_API_KEY=re_your_actual_api_key_here

JWT_SECRET=r2h_production_jwt_secret_2025_fiery_nova_platinum_tier_v1

NODE_ENV=production
```

**Important**:
- Don't commit `.env.local` to GitHub (it's already in .gitignore)
- Add these variables in Vercel dashboard instead

### Step 4: Connect Your Domain

In Vercel project settings:
1. Go to **"Settings"** → **"Domains"**
2. Click **"Add Domain"**
3. Enter your domain: `r2hai.com` (or your domain)
4. Follow Vercel's DNS instructions

#### DNS Configuration Options:

**Option A: Use Vercel Nameservers** (Easiest)
- Update your domain's nameservers to Vercel's nameservers
- Vercel handles all DNS

**Option B: CNAME/A Records** (If you want to keep current DNS)
- Add CNAME record: `www` → `cname.vercel-dns.com`
- Add A record: `@` → `76.76.21.21`

### Step 5: Deploy!

Click **"Deploy"** in Vercel. Your site will be live at:
- Vercel URL: `https://fiery-nova.vercel.app`
- Your domain: `https://r2hai.com` (after DNS propagation)

---

## Option 2: Deploy to Netlify

### Step 1: Push to GitHub (same as above)

### Step 2: Deploy to Netlify

1. **Go to**: https://netlify.com
2. **Sign in** with GitHub
3. **Click**: "Add new site" → "Import an existing project"
4. **Select**: GitHub → Choose `fiery-nova` repo
5. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. **Environment variables**: Add the same variables as Vercel

### Step 3: Connect Domain

1. Go to **"Domain settings"**
2. Click **"Add custom domain"**
3. Follow DNS instructions

---

## Option 3: Deploy to Your Own Server

### Requirements:
- Ubuntu/Debian server
- Node.js 18+ installed
- Nginx or Apache
- SSL certificate (Let's Encrypt)

### Quick Setup:

```bash
# On your server
git clone [your-repo]
cd fiery-nova

# Install dependencies
npm install

# Create .env.production.local
cp env.production.txt .env.production.local
# Edit with your actual values

# Build
npm run build

# Start with PM2 (process manager)
npm install -g pm2
pm2 start npm --name "r2h-app" -- start
pm2 save
pm2 startup
```

---

## DNS Configuration for Custom Domain

### If your domain is r2hai.com:

#### For Vercel:
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

#### For Netlify:
```
Type    Name    Value
A       @       75.2.60.5
CNAME   www     [your-site].netlify.app
```

### DNS Propagation:
- Can take 24-48 hours
- Use https://dnschecker.org to check status

---

## Environment Variables for Production

### Required Variables:

```env
# Database (same Neon connection string)
DATABASE_URL="postgresql://neondb_owner:npg_XPIa0QlyBr7D@ep-fragrant-queen-a4hkxb7e-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Resend API Key
RESEND_API_KEY="re_your_actual_api_key_here"

# JWT Secret (same as development)
JWT_SECRET="r2h_production_jwt_secret_2025_fiery_nova_platinum_tier_v1"

# Node Environment
NODE_ENV="production"

# Optional: Production URL
NEXT_PUBLIC_APP_URL="https://r2hai.com"
```

---

## Post-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel/Netlify
- [ ] Environment variables added
- [ ] Domain connected
- [ ] DNS configured
- [ ] HTTPS enabled (automatic with Vercel/Netlify)
- [ ] Test signup flow on production
- [ ] Verify OTP emails are sent
- [ ] Test login functionality
- [ ] Check dashboard access

---

## Update Resend Email Domain (Optional)

For production, you should verify your own domain in Resend:

1. **Go to**: https://resend.com/domains
2. **Click**: "Add Domain"
3. **Enter**: Your domain (e.g., `r2hai.com`)
4. **Add DNS records** as instructed by Resend
5. **Update email sender** in your code:
   - File: `app/api/auth/signup/route.ts` line 45
   - Change from: `R2H.AI <onboarding@resend.dev>`
   - Change to: `R2H.AI <noreply@r2hai.com>`

---

## Troubleshooting Production Issues

### Issue: Internal Server Error 500

**Check**:
1. Environment variables are set correctly in Vercel/Netlify
2. Database URL is accessible from production
3. Check deployment logs for errors

### Issue: OTP Emails Not Sent

**Check**:
1. RESEND_API_KEY is correct
2. Daily/monthly email limits not exceeded
3. Check Resend logs: https://resend.com/logs

### Issue: Database Connection Failed

**Check**:
1. Neon database is active (free tier doesn't auto-suspend if used)
2. Connection string includes `?sslmode=require`
3. Firewall/security settings allow connections

---

## Monitoring & Logs

### Vercel:
- View logs: Project → Deployments → Click deployment → Logs
- Real-time logs: `vercel logs [deployment-url]`

### Netlify:
- View logs: Site → Deploys → Click deployment → Deploy log

---

## Scaling Considerations

### When You Grow:

1. **Database**: Neon free tier → Paid tier (more storage/connections)
2. **Email**: Resend free (3k/month) → Paid tier (50k/month)
3. **Hosting**: Vercel Hobby (free) → Pro ($20/month)
4. **OTP Storage**: In-memory → Redis (for multi-server deployments)

---

## Security Checklist for Production

- ✅ HTTPS enabled (automatic with Vercel/Netlify)
- ✅ Environment variables not in code
- ✅ Database connection uses SSL
- ✅ JWT secret is strong and unique
- ✅ CORS configured if needed
- ✅ Rate limiting on auth endpoints (TODO: implement)
- ✅ Email verification required before dashboard access

---

## Domain Examples

If your domain is `r2hai.com`:

- **Landing**: https://r2hai.com
- **Signup**: https://r2hai.com/auth/signup
- **Login**: https://r2hai.com/auth/login
- **Dashboard**: https://r2hai.com/dashboard

---

**Ready to deploy?** Follow the steps above and your site will be live on your domain!
