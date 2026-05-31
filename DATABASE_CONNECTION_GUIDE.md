# Database Connection Guide — Al Noor Tents

## 🔗 Quick Connection Setup

### Option 1: Hostinger MySQL (Recommended)

#### Step 1: Get Your Database Credentials

1. Log in to **Hostinger Control Panel**
2. Go to **Databases** → **MySQL**
3. Find your database and click **Manage**
4. You'll see:
   - **Database Name:** `alnoortents`
   - **Database User:** `alnoortents_user`
   - **Host:** `localhost` (or your specific host)
   - **Port:** `3306` (default)

#### Step 2: Create Connection String

Combine your credentials in this format:

```
mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME
```

**Example:**
```
mysql://alnoortents_user:MySecurePassword123@localhost:3306/alnoortents
```

#### Step 3: Set Environment Variable

**For Local Development:**

Create `.env` file in project root:
```
DATABASE_URL=mysql://alnoortents_user:MySecurePassword123@localhost:3306/alnoortents
```

**For Production (Hostinger):**

Create `.env.production` file:
```
DATABASE_URL=mysql://alnoortents_user:MySecurePassword123@your-hostinger-host.com:3306/alnoortents
NODE_ENV=production
PORT=3000
```

#### Step 4: Test Connection

```bash
# Using MySQL CLI
mysql -u alnoortents_user -p -h localhost alnoortents

# When prompted, enter your password
# If successful, you'll see: mysql>
```

---

### Option 2: Remote MySQL Server

If your MySQL is on a different server:

```
mysql://USERNAME:PASSWORD@REMOTE_HOST:3306/DATABASE_NAME

Example:
mysql://alnoortents_user:MyPassword@db.example.com:3306/alnoortents
```

**Important:** Make sure:
- Remote host allows external connections
- Firewall allows port 3306
- User has remote access privileges

---

### Option 3: Local MySQL (Development Only)

For testing on your computer:

```
mysql://root:password@localhost:3306/alnoortents
```

---

## 📝 Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | MySQL connection string | `mysql://user:pass@host:3306/db` |
| `NODE_ENV` | Environment type | `production` or `development` |
| `PORT` | Server port | `3000` |
| `JWT_SECRET` | Session secret (32+ chars) | `abc123def456...` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_APP_TITLE` | Website title | `Al Noor Tents` |
| `VITE_APP_LOGO` | Logo URL | (empty) |
| `OWNER_NAME` | Owner name | `Al Noor Tents` |

---

## 🚀 Connecting to Your Project

### Step 1: Import Database Schema

```bash
# From project root directory
mysql -u alnoortents_user -p alnoortents < database_schema.sql
```

### Step 2: Create Environment File

**For development:**
```bash
# Create .env file
echo "DATABASE_URL=mysql://alnoortents_user:YOUR_PASSWORD@localhost:3306/alnoortents" > .env
```

**For production:**
```bash
# Create .env.production file
echo "DATABASE_URL=mysql://alnoortents_user:YOUR_PASSWORD@your-host:3306/alnoortents" > .env.production
echo "NODE_ENV=production" >> .env.production
echo "PORT=3000" >> .env.production
```

### Step 3: Install Dependencies

```bash
npm install
# or
pnpm install
```

### Step 4: Run Database Migrations

```bash
npm run db:push
# or
pnpm db:push
```

This will:
- Generate migration files
- Apply migrations to your database
- Create all tables if they don't exist

### Step 5: Start Development Server

```bash
npm run dev
# or
pnpm dev
```

Your application should now be connected to the database!

---

## 🔍 Verify Database Connection

### Check if Tables Were Created

```bash
# Connect to database
mysql -u alnoortents_user -p alnoortents

# List all tables
SHOW TABLES;

# You should see:
# +------------------------+
# | Tables_in_alnoortents  |
# +------------------------+
# | adminSettings          |
# | heroSection            |
# | inquiries              |
# | menuItems              |
# | notifications          |
# | pageContent            |
# | statistics             |
# | testimonials           |
# | users                  |
# +------------------------+
```

### Check Admin Settings

```sql
SELECT * FROM adminSettings;
```

Should return one row with default settings.

### Check Menu Items

```sql
SELECT * FROM menuItems;
```

Should return 5 default menu items.

---

## 🛠️ Troubleshooting Connection Issues

### Error: "Access denied for user"

**Cause:** Wrong username or password

**Solution:**
1. Verify credentials in Hostinger Control Panel
2. Check `.env` file for typos
3. Reset password in Hostinger if needed

```bash
# Test with correct credentials
mysql -u alnoortents_user -p -h localhost alnoortents
```

### Error: "Can't connect to MySQL server"

**Cause:** Host not reachable or MySQL not running

**Solution:**
1. Check if MySQL is running: `service mysql status`
2. Verify host address is correct
3. Check firewall settings: `sudo ufw status`
4. Allow MySQL port: `sudo ufw allow 3306`

### Error: "Unknown database"

**Cause:** Database doesn't exist

**Solution:**
1. Create database: `CREATE DATABASE alnoortents;`
2. Import schema: `mysql -u user -p alnoortents < database_schema.sql`

### Error: "Table doesn't exist"

**Cause:** Schema not imported

**Solution:**
```bash
# Import the schema file
mysql -u alnoortents_user -p alnoortents < database_schema.sql

# Verify tables were created
mysql -u alnoortents_user -p alnoortents -e "SHOW TABLES;"
```

### Error: "Connection timeout"

**Cause:** Network or firewall issue

**Solution:**
1. Check internet connection
2. Verify host is accessible: `ping your-host.com`
3. Check firewall rules
4. For remote MySQL, ensure external connections are allowed

---

## 🔐 Security Tips

### 1. Use Strong Passwords

```
✅ Good: MyS3cur3P@ssw0rd!2024
❌ Bad: password123
```

### 2. Restrict Database User Permissions

```sql
-- Create user with limited permissions
CREATE USER 'alnoortents_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON alnoortents.* TO 'alnoortents_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Don't Commit `.env` Files

Add to `.gitignore`:
```
.env
.env.local
.env.production
```

### 4. Use Environment Variables

Never hardcode credentials in code:
```javascript
// ❌ Bad
const dbUrl = "mysql://user:password@host/db";

// ✅ Good
const dbUrl = process.env.DATABASE_URL;
```

### 5. Regular Backups

```bash
# Backup database
mysqldump -u alnoortents_user -p alnoortents > backup_$(date +%Y%m%d).sql

# Backup to remote location
mysqldump -u alnoortents_user -p alnoortents | gzip > backup_$(date +%Y%m%d).sql.gz
```

---

## 📊 Database Structure

### Tables Overview

| Table | Purpose | Records |
|-------|---------|---------|
| `users` | User authentication | 1+ |
| `adminSettings` | Website configuration | 1 |
| `menuItems` | Navigation menu | 5+ |
| `heroSection` | Hero section content | 1 |
| `testimonials` | Client reviews | Multiple |
| `inquiries` | Contact requests | Multiple |
| `notifications` | System notifications | Multiple |
| `statistics` | Company stats | 1 |
| `pageContent` | Page content sections | Multiple |

---

## 🔄 Syncing Database Changes

### When You Update Schema

1. Edit `drizzle/schema.ts`
2. Run migrations:
   ```bash
   npm run db:push
   ```
3. This will:
   - Generate migration files
   - Apply changes to database
   - Keep data intact

### Example: Adding a New Field

```typescript
// In drizzle/schema.ts
export const adminSettings = mysqlTable("adminSettings", {
  // ... existing fields
  newField: varchar("newField", { length: 255 }), // Add new field
});
```

Then run:
```bash
npm run db:push
```

---

## 📞 Support Resources

- **Hostinger MySQL Docs:** https://www.hostinger.com/help/article/how-to-manage-databases
- **MySQL Documentation:** https://dev.mysql.com/doc/
- **Drizzle ORM Docs:** https://orm.drizzle.team/
- **Connection String Format:** https://www.connectionstrings.com/mysql/

---

## Checklist

- [ ] Database created in Hostinger
- [ ] Database user created with strong password
- [ ] Database schema imported
- [ ] `.env` file created with DATABASE_URL
- [ ] Connection tested with MySQL CLI
- [ ] `npm run db:push` executed successfully
- [ ] Tables verified in database
- [ ] Admin settings verified
- [ ] Application starts without errors
- [ ] Admin panel accessible at `/super`

---

**Last Updated:** May 31, 2026
**Version:** 1.0.0
