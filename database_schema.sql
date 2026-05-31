-- ============================================================
-- AL NOOR TENTS DATABASE SCHEMA
-- Complete database setup for Al Noor Tents website
-- ============================================================



-- ============================================================
-- USERS TABLE (Authentication)
-- ============================================================
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `openId` varchar(64) NOT NULL UNIQUE,
  `name` text,
  `email` varchar(320),
  `loginMethod` varchar(64),
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lastSignedIn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- ADMIN SETTINGS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS `adminSettings` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `adminPassword` varchar(255) NOT NULL,
  `websiteTitle` varchar(255) DEFAULT 'Al Noor Tents',
  `logoUrl` text,
  `logoKey` varchar(255),
  `favicon` text,
  `phone` varchar(20) DEFAULT '+97433555918',
  `email` varchar(255) DEFAULT 'info@alnoortents.com',
  `address` text DEFAULT 'Dubai, United Arab Emirates',
  `whatsapp` text DEFAULT 'https://wa.me/97433555918',
  `instagram` text,
  `facebook` text,
  `twitter` text,
  `linkedin` text,
  `mapLatitude` decimal(10,8),
  `mapLongitude` decimal(11,8),
  `mapZoom` int DEFAULT 13,
  `notificationEmail` varchar(255),
  `enableEmailNotifications` boolean DEFAULT true,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- MENU ITEMS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS `menuItems` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `labelEn` varchar(255) NOT NULL,
  `labelAr` varchar(255) NOT NULL,
  `href` varchar(255) NOT NULL,
  `type` enum('link','section','external') DEFAULT 'link',
  `order` int DEFAULT 0,
  `isVisible` boolean DEFAULT true,
  `parentId` int,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `order` (`order`),
  KEY `isVisible` (`isVisible`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- HERO SECTION TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS `heroSection` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `titleEn` text,
  `titleAr` text,
  `subtitleEn` text,
  `subtitleAr` text,
  `labelEn` varchar(255),
  `labelAr` varchar(255),
  `cta1TextEn` varchar(255) DEFAULT 'CALL NOW',
  `cta1TextAr` varchar(255) DEFAULT 'اتصل الآن',
  `cta1Link` varchar(255) DEFAULT 'tel:+97433555918',
  `cta2TextEn` varchar(255) DEFAULT 'CONTACT US ON WHATSAPP',
  `cta2TextAr` varchar(255) DEFAULT 'تواصل معنا على واتس',
  `cta2Link` text DEFAULT 'https://wa.me/97433555918',
  `imageUrl` text,
  `imageKey` varchar(255),
  `iconColor` varchar(7) DEFAULT '#c9a84c',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TESTIMONIALS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `textEn` text NOT NULL,
  `textAr` text,
  `authorName` varchar(255) NOT NULL,
  `authorRole` text,
  `authorImage` text,
  `rating` int DEFAULT 5,
  `isVisible` boolean DEFAULT true,
  `order` int DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `isVisible` (`isVisible`),
  KEY `order` (`order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- INQUIRIES TABLE (Contact Requests)
-- ============================================================
CREATE TABLE IF NOT EXISTS `inquiries` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `projectDetails` text,
  `tentType` varchar(255),
  `eventDate` varchar(255),
  `location` varchar(255),
  `budget` varchar(255),
  `status` enum('new','contacted','in-progress','completed','rejected') DEFAULT 'new',
  `notes` text,
  `emailSent` boolean DEFAULT false,
  `inAppNotificationSent` boolean DEFAULT false,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `status` (`status`),
  KEY `createdAt` (`createdAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- NOTIFICATIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `type` enum('inquiry','system','alert','info') DEFAULT 'info',
  `relatedInquiryId` int,
  `isRead` boolean DEFAULT false,
  `actionUrl` varchar(255),
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `isRead` (`isRead`),
  KEY `createdAt` (`createdAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- STATISTICS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS `statistics` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `projectsCompleted` int DEFAULT 183,
  `yearsOfExperience` int DEFAULT 9,
  `happyClients` int DEFAULT 458,
  `countriesServed` int DEFAULT 7,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- PAGE CONTENT TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS `pageContent` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `sectionKey` varchar(255) NOT NULL UNIQUE,
  `contentEn` text,
  `contentAr` text,
  `title` varchar(255),
  `description` text,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- INSERT DEFAULT DATA
-- ============================================================

-- Insert default admin settings
INSERT INTO `adminSettings` (
  `adminPassword`,
  `websiteTitle`,
  `phone`,
  `email`,
  `address`,
  `whatsapp`,
  `notificationEmail`,
  `enableEmailNotifications`
) VALUES (
  'admin123',
  'Al Noor Tents',
  '+97433555918',
  'info@alnoortents.com',
  'Dubai, United Arab Emirates',
  'https://wa.me/97433555918',
  'your-email@example.com',
  true
) ON DUPLICATE KEY UPDATE `id`=`id`;

-- Insert default statistics
INSERT INTO `statistics` (
  `projectsCompleted`,
  `yearsOfExperience`,
  `happyClients`,
  `countriesServed`
) VALUES (
  183,
  9,
  458,
  7
) ON DUPLICATE KEY UPDATE `id`=`id`;

-- Insert default hero section
INSERT INTO `heroSection` (
  `titleEn`,
  `titleAr`,
  `subtitleEn`,
  `subtitleAr`,
  `cta1TextEn`,
  `cta1TextAr`,
  `cta1Link`,
  `cta2TextEn`,
  `cta2TextAr`,
  `cta2Link`
) VALUES (
  'ICONIC TENT STRUCTURES',
  'هياكل الخيام الأيقونية',
  'Designing & building luxury tensile structures across the Middle East',
  'تصميم وبناء هياكل نسيجية فاخرة عبر الشرق الأوسط',
  'CALL NOW',
  'اتصل الآن',
  'tel:+97433555918',
  'CONTACT US ON WHATSAPP',
  'تواصل معنا على واتس',
  'https://wa.me/97433555918'
) ON DUPLICATE KEY UPDATE `id`=`id`;

-- Insert default menu items
INSERT INTO `menuItems` (`labelEn`, `labelAr`, `href`, `type`, `order`, `isVisible`) VALUES
('Home', 'الرئيسية', '/', 'link', 0, true),
('Services', 'الخدمات', '#services', 'section', 1, true),
('Projects', 'المشاريع', '#projects', 'section', 2, true),
('About', 'حول', '#about', 'section', 3, true),
('Contact', 'اتصل', '#contact', 'section', 4, true)
ON DUPLICATE KEY UPDATE `order`=VALUES(`order`);

-- ============================================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================================
CREATE INDEX idx_inquiries_status ON `inquiries`(`status`);
CREATE INDEX idx_inquiries_created ON `inquiries`(`createdAt`);
CREATE INDEX idx_testimonials_visible ON `testimonials`(`isVisible`);
CREATE INDEX idx_notifications_read ON `notifications`(`isRead`);
CREATE INDEX idx_menu_order ON `menuItems`(`order`);

-- ============================================================
-- DATABASE SETUP COMPLETE
-- ============================================================
-- All tables have been created successfully!
-- You can now connect your application to this database.
