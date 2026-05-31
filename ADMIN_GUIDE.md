# Al Noor Tents — Admin Panel Guide

## 🔐 Accessing the Admin Panel

**URL:** `https://yourdomain.com/super`

**Default Password:** `admin123`

> **Important:** Change this password immediately in the Settings tab after first login.

---

## 📋 Admin Panel Features

### 1. **Settings Tab**
Manage all website configuration and branding.

#### Available Settings:
- **Website Title** - Your company name
- **Logo** - Upload your company logo
- **Contact Information**
  - Phone number
  - Email address
  - Physical address
- **Social Media Links**
  - WhatsApp
  - Instagram
  - Facebook
  - Twitter
  - LinkedIn
- **Map Location**
  - Latitude & Longitude (for embedded Google Map)
  - Zoom level
- **Email Notifications**
  - Notification email address
  - Enable/disable email notifications

### 2. **Menu Tab**
Control your website navigation menu.

#### Features:
- **Drag & Drop Reordering** - Click ↑ and ↓ buttons to reorder menu items
- **Menu Item Management**
  - English label
  - Arabic label
  - Link URL
  - Menu type (link, section, external)
  - Visibility toggle

### 3. **Testimonials Tab**
Manage client reviews and testimonials.

#### Features:
- **Add Testimonials**
  - Client feedback (English & Arabic)
  - Author name
  - Author role/company
  - Author image URL
  - Star rating (1-5)
- **Edit Testimonials** - Update existing testimonials
- **Delete Testimonials** - Remove testimonials
- **Visibility Control** - Show/hide testimonials on website

### 4. **Inquiries Tab**
Manage visitor contact requests and inquiries.

#### Features:
- **View All Inquiries**
  - Full name
  - Email & phone
  - Project details
  - Tent type
  - Event date
  - Location
  - Budget
  - Current status
- **Status Management**
  - New (uncontacted)
  - Contacted
  - In-progress
  - Completed
  - Rejected
- **Actions**
  - Mark as contacted
  - Add admin notes
  - Delete inquiry
- **Automatic Notifications** - Admin gets notified when new inquiry arrives

### 5. **Statistics Tab**
Update company statistics displayed on your website.

#### Editable Statistics:
- **Projects Completed** - Total number of tent installations
- **Years of Experience** - Years in business
- **Happy Clients** - Total satisfied customers
- **Countries Served** - Number of countries with projects

### 6. **Notifications Tab**
View all system and inquiry notifications.

#### Notification Types:
- **Inquiry Notifications** - New contact requests
- **System Notifications** - Important updates
- **Alert Notifications** - Critical issues
- **Info Notifications** - General information

---

## 🔧 Setup Instructions

### Step 1: Connect Your MySQL Database

1. Go to **Settings** in the Management UI
2. Under **Secrets**, add your Hostinger MySQL credentials:
   - `DATABASE_URL`: `mysql://username:password@host:port/database`
3. The admin panel will automatically create all required tables

### Step 2: Initialize Admin Settings

The first time you access `/super`, the system will:
1. Create the `adminSettings` table
2. Initialize default settings
3. Set the admin password to `admin123`

### Step 3: Change Admin Password

1. Access `/super` with default password
2. Go to **Settings** tab
3. Update the **Admin Password** field
4. Click **Save Settings**

### Step 4: Configure Your Website

1. **Settings Tab**
   - Upload your logo
   - Add contact information
   - Add social media links
   - Set map location (latitude/longitude)

2. **Menu Tab**
   - Reorder navigation items
   - Add/remove menu items

3. **Statistics Tab**
   - Update company statistics

---

## 📧 Email Notifications

### How It Works

When a visitor submits an inquiry:

1. **In-App Notification** - Appears in the Notifications tab
2. **Email Notification** - Sent to the configured email address (if enabled)

### Configuration

1. Go to **Settings** tab
2. Set **Notification Email** to your email address
3. Toggle **Enable Email Notifications** ON
4. Click **Save Settings**

### Email Notification Content

The email includes:
- Visitor name
- Contact email & phone
- Project details
- Event date & location
- Budget information

---

## 🎯 Managing Inquiries Workflow

### Typical Inquiry Workflow

1. **Visitor submits inquiry** on website
2. **Admin receives notification** in `/super` panel
3. **Admin reviews inquiry** in Inquiries tab
4. **Admin marks as "Contacted"** after reaching out
5. **Admin updates status** as project progresses
6. **Admin marks as "Completed"** when project is done

### Inquiry Statuses

| Status | Meaning |
|--------|---------|
| **New** | Just received, not yet contacted |
| **Contacted** | Admin has reached out to client |
| **In-Progress** | Project is being worked on |
| **Completed** | Project finished successfully |
| **Rejected** | Client declined or not suitable |

---

## 🌍 Bilingual Support (English & Arabic)

### Bilingual Fields

The following can be managed in both English and Arabic:

- Menu items
- Testimonials
- Page content
- Hero section text

### RTL Support

The website automatically:
- Switches layout direction based on language
- Displays Arabic text right-to-left
- Maintains proper text alignment

---

## 🗺️ Map Location Setup

### Finding Your Coordinates

1. Go to [Google Maps](https://maps.google.com)
2. Search for your location
3. Right-click on the map
4. Select "What's here?"
5. Copy the coordinates (latitude, longitude)

### Setting in Admin Panel

1. Go to **Settings** tab
2. Enter **Map Latitude** (e.g., 25.2048)
3. Enter **Map Longitude** (e.g., 55.2708)
4. Set **Map Zoom** level (1-20, default 13)
5. Click **Save Settings**

---

## 🔒 Security Best Practices

### Password Security

1. **Change default password immediately** after first login
2. **Use a strong password** - Mix uppercase, lowercase, numbers, symbols
3. **Never share your password** with anyone
4. **Change password regularly** - At least every 3 months

### Database Security

When connecting your Hostinger MySQL database:

1. Use **SSL/TLS connection** (if available)
2. **Restrict database access** to your IP address
3. **Use strong database passwords**
4. **Backup your database regularly**

### Admin URL Security

The admin panel is at `/super` but:
- Consider using a more obscure URL in production
- Implement rate limiting on login attempts
- Monitor access logs for suspicious activity

---

## 📱 Responsive Design

The admin panel is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

All features are accessible from any device with a web browser.

---

## 🆘 Troubleshooting

### Database Connection Issues

**Problem:** "Database not available" error

**Solution:**
1. Verify your `DATABASE_URL` is correct
2. Check Hostinger MySQL credentials
3. Ensure database server is running
4. Check firewall/network settings

### Notifications Not Sending

**Problem:** Email notifications not received

**Solution:**
1. Verify **Notification Email** is set in Settings
2. Check **Enable Email Notifications** is toggled ON
3. Check spam/junk folder
4. Verify email address is correct

### Admin Panel Not Loading

**Problem:** `/super` page shows 404 or blank

**Solution:**
1. Clear browser cache
2. Try incognito/private browsing mode
3. Check browser console for errors (F12)
4. Verify website is fully loaded

---

## 📞 Support

For issues or questions:

1. Check this guide first
2. Review error messages in browser console (F12)
3. Check database connection
4. Verify all settings are saved

---

## 🎓 Advanced Features

### Custom Menu Items

Add custom menu items by:
1. Going to **Menu** tab
2. Creating new items with custom URLs
3. Setting display order
4. Toggling visibility

### Testimonial Management

Best practices:
- Include real client names and roles
- Add client photos for credibility
- Vary testimonials by project type
- Update testimonials regularly

### Statistics Tracking

Keep statistics current:
- Update project count after each completion
- Track client satisfaction
- Monitor geographic expansion
- Update experience metrics annually

---

## 📊 Data Backup

### Backing Up Your Data

1. **Database Backup** - Use Hostinger's backup tools
2. **Regular Exports** - Export inquiry data periodically
3. **Version Control** - Keep website code in Git

### Disaster Recovery

In case of data loss:
1. Restore from latest backup
2. Re-enter recent inquiries manually
3. Update statistics if needed
4. Verify all settings are correct

---

## 🚀 Next Steps

1. ✅ Access `/super` with password `admin123`
2. ✅ Change admin password
3. ✅ Upload logo and configure settings
4. ✅ Set up email notifications
5. ✅ Customize menu items
6. ✅ Add initial testimonials
7. ✅ Configure map location
8. ✅ Test inquiry submission

---

**Last Updated:** May 31, 2026
**Version:** 1.0.0
