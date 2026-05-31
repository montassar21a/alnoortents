# Al Noor Tents — Hostinger Deployment Guide

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Set Up MySQL Database](#step-1-set-up-mysql-database)
3. [Step 2: Upload Project Files](#step-2-upload-project-files)
4. [Step 3: Configure Environment Variables](#step-3-configure-environment-variables)
5. [Step 4: Install Dependencies](#step-4-install-dependencies)
6. [Step 5: Build the Project](#step-5-build-the-project)
7. [Step 6: Start the Application](#step-6-start-the-application)
8. [Step 7: Connect Your Domain](#step-7-connect-your-domain)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you start, make sure you have:

- ✅ Hostinger account with hosting plan
- ✅ SSH access to your Hostinger server
- ✅ MySQL database created in Hostinger
- ✅ Node.js 18+ installed on your server
- ✅ npm or pnpm package manager
- ✅ FTP/SFTP client (FileZilla, WinSCP) or command-line access
- ✅ Your domain name (alnoortents.com)

---

## Step 1: Set Up MySQL Database

### 1.1 Create Database in Hostinger

1. Log in to your **Hostinger Control Panel**
2. Go to **Databases** → **MySQL**
3. Click **Create Database**
4. Fill in the details:
   - **Database Name:** `alnoortents`
   - **Database User:** `alnoortents_user`
   - **Password:** Create a strong password (save this!)
5. Click **Create**

### 1.2 Import Database Schema

1. In Hostinger Control Panel, go to **Databases** → **phpMyAdmin**
2. Select your `alnoortents` database
3. Click **Import** tab
4. Click **Choose File** and select `database_schema.sql` from your project
5. Click **Go** to import

**Alternatively, using SSH:**

```bash
mysql -u alnoortents_user -p alnoortents < database_schema.sql
```

When prompted, enter your database password.

### 1.3 Verify Database Tables

1. Open phpMyAdmin
2. Select `alnoortents` database
3. You should see these tables:
   - `users`
   - `adminSettings`
   - `menuItems`
   - `heroSection`
   - `testimonials`
   - `inquiries`
   - `notifications`
   - `statistics`
   - `pageContent`

---

## Step 2: Upload Project Files

### 2.1 Using FTP/SFTP (Recommended for Beginners)

1. **Download FileZilla** or similar FTP client
2. **Connect to Hostinger:**
   - Host: Your Hostinger FTP address (from Control Panel)
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21 (or 22 for SFTP)
3. **Navigate to** `public_html` folder
4. **Upload** all project files:
   - Delete existing files first (if any)
   - Upload the entire project folder
   - Wait for upload to complete

### 2.2 Using SSH (Advanced)

```bash
# Connect to your server
ssh username@your-hostinger-server.com

# Navigate to public_html
cd public_html

# Clone your project (if on Git)
git clone https://github.com/your-repo/alnoortents.git .

# Or upload via SCP
scp -r /path/to/alnoortents/* username@server:/public_html/
```

### 2.3 Project Structure After Upload

```
public_html/
├── client/
├── server/
├── drizzle/
├── shared/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env.production
└── dist/ (will be created after build)
```

---

## Step 3: Configure Environment Variables

### 3.1 Create `.env.production` File

Create a new file in the root directory: `.env.production`

```bash
# Database Configuration
DATABASE_URL=mysql://alnoortents_user:YOUR_PASSWORD@localhost:3306/alnoortents

# Node Environment
NODE_ENV=production
PORT=3000

# OAuth Configuration (if using Manus OAuth)
VITE_APP_ID=your_app_id
OAUTH_SERVER_URL=https://oauth.manus.im
VITE_OAUTH_PORTAL_URL=https://login.manus.im

# JWT Secret (generate a random string)
JWT_SECRET=your-random-jwt-secret-key-here-min-32-chars

# Owner Information
OWNER_OPEN_ID=your_owner_id
OWNER_NAME=Al Noor Tents

# Analytics (optional)
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your_website_id

# App Configuration
VITE_APP_TITLE=Al Noor Tents
VITE_APP_LOGO=https://your-domain.com/logo.png
```

### 3.2 Database URL Format

Replace with your actual credentials:

```
mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE

Example:
mysql://alnoortents_user:MySecurePassword123@localhost:3306/alnoortents
```

### 3.3 Generate JWT Secret

Run this command to generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it as your `JWT_SECRET`.

---

## Step 4: Install Dependencies

### 4.1 SSH into Your Server

```bash
ssh username@your-hostinger-server.com
cd public_html
```

### 4.2 Install Node Modules

```bash
# Using npm
npm install

# Or using pnpm (faster)
npm install -g pnpm
pnpm install
```

This will install all required packages from `package.json`.

### 4.3 Verify Installation

```bash
npm list | head -20
# or
pnpm list | head -20
```

---

## Step 5: Build the Project

### 5.1 Build for Production

```bash
npm run build
# or
pnpm build
```

This command will:
1. Build the frontend with Vite
2. Bundle the backend with esbuild
3. Create optimized files in `dist/` folder

### 5.2 Verify Build Success

```bash
ls -la dist/
```

You should see:
- `dist/index.js` (backend)
- `dist/public/index.html` (frontend)
- `dist/public/assets/` (CSS, JS files)

---

## Step 6: Start the Application

### 6.1 Using PM2 (Recommended for Production)

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start dist/index.js --name "alnoortents"

# Save PM2 configuration
pm2 save

# Set PM2 to auto-start on server reboot
pm2 startup
```

### 6.2 Using Node Directly

```bash
NODE_ENV=production node dist/index.js
```

### 6.3 Verify Application is Running

```bash
# Check if port 3000 is listening
netstat -tuln | grep 3000

# Or check PM2 status
pm2 status
```

---

## Step 7: Connect Your Domain

### 7.1 Point Domain to Hostinger

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Update **Nameservers** to Hostinger's nameservers:
   - `ns1.hostinger.com`
   - `ns2.hostinger.com`
   - `ns3.hostinger.com`
   - `ns4.hostinger.com`
3. Wait 24-48 hours for DNS propagation

### 7.2 Configure Domain in Hostinger

1. Log in to Hostinger Control Panel
2. Go to **Domains** → **Manage Domain**
3. Set **Primary Domain** to `alnoortents.com`
4. Point to your application directory

### 7.3 Set Up SSL Certificate

1. In Hostinger Control Panel, go to **Security** → **SSL**
2. Click **Install SSL Certificate**
3. Select **Let's Encrypt** (free)
4. Follow the installation steps
5. Your site will be available at `https://alnoortents.com`

### 7.4 Configure Reverse Proxy (if needed)

If your application is running on port 3000, you may need to set up a reverse proxy:

**Using Nginx:**

```nginx
server {
    listen 80;
    server_name alnoortents.com www.alnoortents.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Troubleshooting

### Issue: "Cannot find module" Error

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: Database Connection Failed

**Check:**
1. Database URL is correct in `.env.production`
2. Database user has correct permissions
3. MySQL service is running
4. Firewall allows MySQL connections

```bash
# Test database connection
mysql -u alnoortents_user -p -h localhost alnoortents
```

### Issue: Port 3000 Already in Use

**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

### Issue: Application Crashes After Start

**Check logs:**
```bash
# If using PM2
pm2 logs alnoortents

# Or check system logs
tail -f /var/log/syslog
```

### Issue: Domain Shows "Connection Refused"

**Check:**
1. Application is running: `pm2 status`
2. Port is listening: `netstat -tuln | grep 3000`
3. Firewall allows traffic: `sudo ufw allow 3000`
4. DNS is propagated: `nslookup alnoortents.com`

### Issue: HTTPS Not Working

**Solution:**
1. Verify SSL certificate is installed
2. Redirect HTTP to HTTPS in Nginx config
3. Update `.env.production` with HTTPS URLs

---

## Maintenance

### Regular Tasks

**Daily:**
- Monitor application logs
- Check database backups

**Weekly:**
- Review new inquiries
- Update testimonials if needed

**Monthly:**
- Update statistics
- Check for security updates
- Backup database

### Backup Database

```bash
# Backup to file
mysqldump -u alnoortents_user -p alnoortents > backup_$(date +%Y%m%d).sql

# Download backup
scp username@server:/path/to/backup_20260531.sql ~/Downloads/
```

### Update Application

```bash
# Pull latest changes
git pull origin main

# Reinstall dependencies
npm install

# Rebuild
npm run build

# Restart application
pm2 restart alnoortents
```

---

## Security Best Practices

1. **Change default admin password immediately**
   - Access `/super` and change from `admin123`

2. **Use strong database password**
   - Mix uppercase, lowercase, numbers, symbols

3. **Enable HTTPS**
   - Install SSL certificate (Let's Encrypt)
   - Redirect HTTP to HTTPS

4. **Regular backups**
   - Backup database weekly
   - Store backups securely

5. **Monitor logs**
   - Check for suspicious activity
   - Set up log rotation

6. **Keep software updated**
   - Update Node.js regularly
   - Update npm packages

---

## Support & Resources

- **Hostinger Support:** https://www.hostinger.com/support
- **Node.js Documentation:** https://nodejs.org/docs/
- **MySQL Documentation:** https://dev.mysql.com/doc/
- **Nginx Documentation:** https://nginx.org/en/docs/

---

## Quick Reference Commands

```bash
# SSH into server
ssh username@your-hostinger-server.com

# Navigate to project
cd public_html

# Install dependencies
npm install

# Build project
npm run build

# Start application
pm2 start dist/index.js --name "alnoortents"

# View logs
pm2 logs alnoortents

# Restart application
pm2 restart alnoortents

# Stop application
pm2 stop alnoortents

# Check database
mysql -u alnoortents_user -p alnoortents

# Backup database
mysqldump -u alnoortents_user -p alnoortents > backup.sql
```

---

## Deployment Checklist

- [ ] MySQL database created in Hostinger
- [ ] Database schema imported (database_schema.sql)
- [ ] Project files uploaded to public_html
- [ ] `.env.production` file created with correct credentials
- [ ] Dependencies installed (`npm install`)
- [ ] Project built (`npm run build`)
- [ ] Application started (`pm2 start`)
- [ ] Domain nameservers updated to Hostinger
- [ ] SSL certificate installed
- [ ] Admin password changed from default
- [ ] Email notifications configured
- [ ] Website accessible at https://alnoortents.com
- [ ] Admin panel accessible at https://alnoortents.com/super

---

**Last Updated:** May 31, 2026
**Version:** 1.0.0

For questions or issues, refer to the troubleshooting section or contact Hostinger support.
