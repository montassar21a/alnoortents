CREATE TABLE `adminSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`adminPassword` varchar(255) NOT NULL,
	`websiteTitle` varchar(255) DEFAULT 'Al Noor Tents',
	`logoUrl` text,
	`logoKey` varchar(255),
	`favicon` text,
	`phone` varchar(20) DEFAULT '+97433555918',
	`email` varchar(255) DEFAULT 'info@alnoortents.com',
	`address` text DEFAULT ('Dubai, United Arab Emirates'),
	`whatsapp` text DEFAULT ('https://wa.me/97433555918'),
	`instagram` text,
	`facebook` text,
	`twitter` text,
	`linkedin` text,
	`mapLatitude` decimal(10,8),
	`mapLongitude` decimal(11,8),
	`mapZoom` int DEFAULT 13,
	`notificationEmail` varchar(255),
	`enableEmailNotifications` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `adminSettings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `heroSection` (
	`id` int AUTO_INCREMENT NOT NULL,
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
	`cta2Link` text DEFAULT ('https://wa.me/97433555918'),
	`imageUrl` text,
	`imageKey` varchar(255),
	`iconColor` varchar(7) DEFAULT '#c9a84c',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `heroSection_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `inquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
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
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `inquiries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `menuItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`labelEn` varchar(255) NOT NULL,
	`labelAr` varchar(255) NOT NULL,
	`href` varchar(255) NOT NULL,
	`type` enum('link','section','external') DEFAULT 'link',
	`order` int DEFAULT 0,
	`isVisible` boolean DEFAULT true,
	`parentId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `menuItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`type` enum('inquiry','system','alert','info') DEFAULT 'info',
	`relatedInquiryId` int,
	`isRead` boolean DEFAULT false,
	`actionUrl` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pageContent` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sectionKey` varchar(255) NOT NULL,
	`contentEn` text,
	`contentAr` text,
	`title` varchar(255),
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pageContent_id` PRIMARY KEY(`id`),
	CONSTRAINT `pageContent_sectionKey_unique` UNIQUE(`sectionKey`)
);
--> statement-breakpoint
CREATE TABLE `statistics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectsCompleted` int DEFAULT 183,
	`yearsOfExperience` int DEFAULT 9,
	`happyClients` int DEFAULT 458,
	`countriesServed` int DEFAULT 7,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `statistics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`textEn` text NOT NULL,
	`textAr` text,
	`authorName` varchar(255) NOT NULL,
	`authorRole` text,
	`authorImage` text,
	`rating` int DEFAULT 5,
	`isVisible` boolean DEFAULT true,
	`order` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
