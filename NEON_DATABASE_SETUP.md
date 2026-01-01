# How to Get Your Neon Database Connection String

## Step-by-Step Visual Guide

### Option 1: If You Already Have a Neon Account

1. **Go to**: https://console.neon.tech
2. **Log in** to your account
3. You'll see your **Projects** list

4. **If you have a project already**:
   - Click on your project name
   - You'll see the **Dashboard**
   - Look for a box that says **"Connection Details"** or **"Connection String"**
   - It's usually near the top of the dashboard

5. **Where to find the connection string**:
   ```
   Dashboard → Connection Details → Select "PostgreSQL" tab
   ```

   You should see something like:
   ```
   Host: ep-cool-name-12345.us-east-2.aws.neon.tech
   Database: neondb
   User: username
   Password: ••••••••
   ```

6. **Get the full connection string**:
   - Look for "Connection string" dropdown or tab
   - Select **"PostgreSQL"** (NOT Prisma, Node.js, etc.)
   - Click the **copy icon** or "Show password" checkbox
   - It will look like:
   ```
   postgresql://username:password@ep-cool-name-12345.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

### Option 2: Create a NEW Neon Project (Recommended)

If you can't find your project or want to start fresh:

1. **Go to**: https://console.neon.tech
2. **Click "New Project"** (big button on the page)
3. **Fill in**:
   - Project name: `r2h-production`
   - Region: Choose closest to you (e.g., US East, EU Central)
   - PostgreSQL version: Leave default (16)
4. **Click "Create Project"**
5. **Immediately after creation**, you'll see a popup with:
   - ✅ **Connection String** (this is what you need!)
   - Click "Copy" next to the connection string
   - It looks like:
   ```
   postgresql://username:AbCd1234@ep-random-name-123456.region.aws.neon.tech/neondb?sslmode=require
   ```

6. **IMPORTANT**: Copy this string NOW - you can always view it again, but this popup makes it easy

---

## Alternative: Build Connection String Manually

If you can see individual connection details but not the full string:

1. **Find these values** in your Neon dashboard:
   - **Host**: `ep-xxxxx-xxxxx.region.aws.neon.tech`
   - **Database**: `neondb` (or your database name)
   - **User**: `username`
   - **Password**: Click "Show password" to reveal

2. **Build the connection string** using this format:
   ```
   postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require
   ```

3. **Example**:
   - User: `alex_user`
   - Password: `MySecret123`
   - Host: `ep-cool-frost-12345.us-east-2.aws.neon.tech`
   - Database: `neondb`

   **Result**:
   ```
   postgresql://alex_user:MySecret123@ep-cool-frost-12345.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

---

## Where Exactly to Look in Neon Dashboard

### After Logging In:

```
1. Console → Projects → [Your Project Name]
   └─→ You see the PROJECT DASHBOARD

2. On the Dashboard, look for:
   ┌─────────────────────────────────────────────┐
   │ Connection Details                    [Tab] │
   ├─────────────────────────────────────────────┤
   │ Pooled connection  [selected]               │
   │ Direct connection                           │
   │                                             │
   │ Connection string                           │
   │ postgresql://user:pass@host/db?ssl... [📋] │
   └─────────────────────────────────────────────┘

3. OR look in the sidebar:
   - Click "Dashboard" (left sidebar)
   - Scroll down to "Connection Details"
   - Select "PostgreSQL" format
   - Copy the string
```

---

## Still Can't Find It?

### Method 1: Use the Quickstart Tab

1. In your Neon project dashboard
2. Click **"Quickstart"** tab (if available)
3. You'll see connection examples with your actual credentials

### Method 2: Check Project Settings

1. Click on your project
2. Click **"Settings"** in the left sidebar
3. Look for **"General"** → **"Connection String"**

### Method 3: SQL Editor

1. Click **"SQL Editor"** in the left sidebar
2. At the top, you might see connection info
3. Look for a dropdown or connection details button

---

## What If You DON'T Have a Neon Account?

### Create One Now (Takes 2 minutes):

1. **Go to**: https://console.neon.tech
2. **Click "Sign Up"**
3. **Choose**: Sign up with GitHub, Google, or Email
4. **Verify** your email (if using email signup)
5. **After verification**, you'll be taken to the console
6. **Click "Create Project"**
7. **Name it**: `r2h-production`
8. **Click "Create"**
9. **COPY THE CONNECTION STRING** from the success popup!

---

## Emergency Alternative: Use Local PostgreSQL

If you want to test locally without Neon:

### Install PostgreSQL locally:
- **Windows**: https://www.postgresql.org/download/windows/
- **Mac**: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql`

### Then use:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/r2h_db?sslmode=disable"
```

But **Neon is recommended** because:
- ✅ Free tier (no credit card needed)
- ✅ No local installation
- ✅ Works from anywhere
- ✅ Auto-backups
- ✅ Production-ready

---

## Common Neon Dashboard Layouts

### Layout A (New Dashboard):
```
Top Bar: [Project Name] [Branch: main]

Main Area:
┌──────────────────────────────────────┐
│ Get Started                          │
│                                      │
│ Connect to your database             │
│ postgresql://user:pass@host/db... 📋 │
└──────────────────────────────────────┘
```

### Layout B (Classic Dashboard):
```
Sidebar:           Main Area:
┌───────────┐     ┌────────────────────────┐
│ Dashboard │ ──→ │ Connection Details     │
│ Branches  │     │ ┌────────────────────┐ │
│ Tables    │     │ │ Connection string: │ │
│ Settings  │     │ │ postgresql://...   │ │
└───────────┘     │ └────────────────────┘ │
                  └────────────────────────┘
```

---

## Need More Help?

1. **Take a screenshot** of your Neon dashboard
2. **Or share** what you see on the page after logging in
3. I can guide you to the exact location

---

## Quick Test: Is Your Connection String Valid?

A valid Neon connection string must:
- ✅ Start with `postgresql://`
- ✅ Contain `@ep-` (Neon's endpoint prefix)
- ✅ Contain `.neon.tech/`
- ✅ End with `?sslmode=require`

**Example**:
```
postgresql://user:pass@ep-something-12345678.us-east-2.aws.neon.tech/neondb?sslmode=require
          ↑         ↑               ↑                                ↑           ↑
        user    password         Neon host                       database    SSL required
```

---

**Next Step**: Once you have the connection string, paste it into `.env.local` on line 6!
