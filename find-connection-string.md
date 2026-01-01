# Finding Your Neon Connection String - Visual Guide

## You're in your Neon Console - Now What?

### STEP 1: Make sure you're inside a project

Look at the URL in your browser:
- ✅ GOOD: `https://console.neon.tech/app/projects/calm-fire-12345678`
- ❌ WRONG: `https://console.neon.tech/app/projects` (you're viewing the projects list)

If you're on the projects list:
1. **Click on any project name** to enter it
2. Continue to Step 2

---

### STEP 2: Find the Connection String

Once you're inside a project dashboard, look for these elements:

#### Option 1: Connection Details Box (Top of Page)
```
┌─────────────────────────────────────────────────────────┐
│ Connection Details                                 [?]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Database:  neondb                                       │
│ Host:      ep-something-12345.region.aws.neon.tech     │
│ Port:      5432                                         │
│                                                         │
│ Connection string:                                      │
│ ┌─────────────────────────────────────────────────┐    │
│ │ postgresql://user:****@ep-xxx.neon.tech/db  📋 │    │
│ └─────────────────────────────────────────────────┘    │
│                                                         │
│ [Show password]  ← Click this checkbox!                │
└─────────────────────────────────────────────────────────┘
```

**ACTION**:
- Find the "Connection string" field
- Click **"Show password"** checkbox (if there is one)
- Click the **📋 Copy icon** next to the connection string

---

#### Option 2: "Connect" Button (Top Right Corner)
```
Top Right Corner:
[⚙️ Settings]  [🔗 Connect]  [+ New Branch]
                    ↑
              Click this!
```

**ACTION**:
1. Click the **"Connect"** button (top right)
2. A modal/panel will open
3. Look for **"Connection string"** tab or dropdown
4. Select **"PostgreSQL"** format (NOT Prisma, Rust, etc.)
5. Click **Copy** button

---

#### Option 3: Dashboard Sidebar Menu
```
Left Sidebar:
┌──────────────┐
│ 📊 Dashboard │ ← Click this
│ 🌿 Branches  │
│ 📋 Tables    │
│ 🔍 SQL Editor│
│ ⚙️  Settings │
└──────────────┘
```

**ACTION**:
1. Click **"Dashboard"** in the left sidebar
2. Scroll down on the main page
3. Look for **"Connection Details"** or **"Quick Connect"** section
4. Copy the PostgreSQL connection string

---

#### Option 4: Project Settings
```
Left Sidebar → Click ⚙️ Settings

Then look for:
- General → Connection string
- Database → Connection details
```

**ACTION**:
1. Click **"Settings"** in the sidebar
2. Look for **"General"** or **"Database"** tab
3. Find the connection string section
4. Copy the string

---

## What the Connection String Looks Like

### With Password Hidden:
```
postgresql://username:****@ep-cool-name-12345678.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### With Password Shown (after clicking "Show password"):
```
postgresql://myuser:AbC123XyZ@ep-cool-name-12345678.us-east-2.aws.neon.tech/neondb?sslmode=require
               ↑         ↑           ↑                                           ↑          ↑
            username  password    Neon endpoint                              database    SSL
```

---

## Still Can't Find It? Try This:

### Method A: Use SQL Editor to Get Connection Info
1. Click **"SQL Editor"** in the left sidebar
2. At the top of SQL Editor, you might see connection info
3. Or run this SQL command:
   ```sql
   SELECT current_database(), current_user, inet_server_addr(), inet_server_port();
   ```
4. This gives you: database name, username, host, port
5. You can manually build the connection string

### Method B: Check Your Email
- When you first created your Neon project, you might have received an email
- Search your inbox for "Neon" or "neon.tech"
- The welcome email sometimes includes connection details

### Method C: Create a New Database (Within Your Project)
1. In your project, click **"Databases"** in the sidebar
2. Create a new database or view existing ones
3. When viewing a database, connection details often appear

---

## Can You Take a Screenshot?

If none of these work, take a screenshot of:
1. Your Neon dashboard (blur any sensitive info)
2. The left sidebar menu
3. The main content area

Then I can pinpoint exactly where to look!

---

## Emergency: Build It Manually

If you can see individual pieces but not the full string:

### Find These Values in Your Dashboard:
- **Endpoint/Host**: `ep-xxxxx-xxxxx.region.aws.neon.tech`
- **Database**: Usually `neondb`
- **Username**: Usually your Neon account name or project name
- **Password**: Click "Show password" to reveal

### Build the String:
```
postgresql://USERNAME:PASSWORD@HOST/DATABASE?sslmode=require
```

Example:
```
postgresql://alex:MyPass123@ep-cool-name-12345.us-east-2.aws.neon.tech/neondb?sslmode=require
```
