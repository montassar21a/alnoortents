import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, boolean, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ============================================================
// ADMIN SETTINGS & CONFIGURATION
// ============================================================

export const adminSettings = mysqlTable("adminSettings", {
  id: int("id").autoincrement().primaryKey(),
  // Authentication
  adminPassword: varchar("adminPassword", { length: 255 }).notNull(),
  // Website Identity
  websiteTitle: varchar("websiteTitle", { length: 255 }).default("Al Noor Tents"),
  logoUrl: text("logoUrl"), // Stored file URL from storage
  logoKey: varchar("logoKey", { length: 255 }), // Storage key for deletion
  favicon: text("favicon"),
  // Contact Information
  phone: varchar("phone", { length: 20 }).default("+97433555918"),
  email: varchar("email", { length: 255 }).default("info@alnoortents.com"),
  address: text("address").default("Dubai, United Arab Emirates"),
  // Social Media
  whatsapp: text("whatsapp").default("https://wa.me/97433555918"),
  instagram: text("instagram"),
  facebook: text("facebook"),
  twitter: text("twitter"),
  linkedin: text("linkedin"),
  // Map Location
  mapLatitude: decimal("mapLatitude", { precision: 10, scale: 8 }),
  mapLongitude: decimal("mapLongitude", { precision: 11, scale: 8 }),
  mapZoom: int("mapZoom").default(13),
  // Email Notifications
  notificationEmail: varchar("notificationEmail", { length: 255 }),
  enableEmailNotifications: boolean("enableEmailNotifications").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AdminSettings = typeof adminSettings.$inferSelect;
export type InsertAdminSettings = typeof adminSettings.$inferInsert;

// ============================================================
// NAVIGATION MENU
// ============================================================

export const menuItems = mysqlTable("menuItems", {
  id: int("id").autoincrement().primaryKey(),
  // Bilingual support
  labelEn: varchar("labelEn", { length: 255 }).notNull(),
  labelAr: varchar("labelAr", { length: 255 }).notNull(),
  // Link & Type
  href: varchar("href", { length: 255 }).notNull(),
  type: mysqlEnum("type", ["link", "section", "external"]).default("link"),
  // Ordering
  order: int("order").default(0),
  // Visibility
  isVisible: boolean("isVisible").default(true),
  // Parent menu (for nested items)
  parentId: int("parentId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MenuItem = typeof menuItems.$inferSelect;
export type InsertMenuItem = typeof menuItems.$inferInsert;

// ============================================================
// HERO SECTION
// ============================================================

export const heroSection = mysqlTable("heroSection", {
  id: int("id").autoincrement().primaryKey(),
  // Bilingual content
  titleEn: text("titleEn"),
  titleAr: text("titleAr"),
  subtitleEn: text("subtitleEn"),
  subtitleAr: text("subtitleAr"),
  labelEn: varchar("labelEn", { length: 255 }),
  labelAr: varchar("labelAr", { length: 255 }),
  // CTA Buttons
  cta1TextEn: varchar("cta1TextEn", { length: 255 }).default("CALL NOW"),
  cta1TextAr: varchar("cta1TextAr", { length: 255 }).default("اتصل الآن"),
  cta1Link: varchar("cta1Link", { length: 255 }).default("tel:+97433555918"),
  cta2TextEn: varchar("cta2TextEn", { length: 255 }).default("CONTACT US ON WHATSAPP"),
  cta2TextAr: varchar("cta2TextAr", { length: 255 }).default("تواصل معنا على واتس"),
  cta2Link: text("cta2Link").default("https://wa.me/97433555918"),
  // Image
  imageUrl: text("imageUrl"),
  imageKey: varchar("imageKey", { length: 255 }),
  // Icons
  iconColor: varchar("iconColor", { length: 7 }).default("#c9a84c"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type HeroSection = typeof heroSection.$inferSelect;
export type InsertHeroSection = typeof heroSection.$inferInsert;

// ============================================================
// TESTIMONIALS
// ============================================================

export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  textEn: text("textEn").notNull(),
  textAr: text("textAr"),
  authorName: varchar("authorName", { length: 255 }).notNull(),
  authorRole: text("authorRole"),
  authorImage: text("authorImage"),
  rating: int("rating").default(5),
  isVisible: boolean("isVisible").default(true),
  order: int("order").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

// ============================================================
// VISITOR INQUIRIES / CONTACT REQUESTS
// ============================================================

export const inquiries = mysqlTable("inquiries", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  projectDetails: text("projectDetails"),
  tentType: varchar("tentType", { length: 255 }), // e.g., "arch", "dome", "wedding"
  eventDate: varchar("eventDate", { length: 255 }),
  location: varchar("location", { length: 255 }),
  budget: varchar("budget", { length: 255 }),
  // Status
  status: mysqlEnum("status", ["new", "contacted", "in-progress", "completed", "rejected"]).default("new"),
  notes: text("notes"), // Admin notes
  // Notification tracking
  emailSent: boolean("emailSent").default(false),
  inAppNotificationSent: boolean("inAppNotificationSent").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = typeof inquiries.$inferInsert;

// ============================================================
// NOTIFICATIONS
// ============================================================

export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  type: mysqlEnum("type", ["inquiry", "system", "alert", "info"]).default("info"),
  relatedInquiryId: int("relatedInquiryId"), // Link to inquiry if applicable
  isRead: boolean("isRead").default(false),
  actionUrl: varchar("actionUrl", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

// ============================================================
// STATISTICS
// ============================================================

export const statistics = mysqlTable("statistics", {
  id: int("id").autoincrement().primaryKey(),
  projectsCompleted: int("projectsCompleted").default(183),
  yearsOfExperience: int("yearsOfExperience").default(9),
  happyClients: int("happyClients").default(458),
  countriesServed: int("countriesServed").default(7),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Statistics = typeof statistics.$inferSelect;
export type InsertStatistics = typeof statistics.$inferInsert;

// ============================================================
// PAGES & SECTIONS CONTENT
// ============================================================

export const pageContent = mysqlTable("pageContent", {
  id: int("id").autoincrement().primaryKey(),
  // Section identifier
  sectionKey: varchar("sectionKey", { length: 255 }).notNull().unique(),
  // Bilingual content
  contentEn: text("contentEn"),
  contentAr: text("contentAr"),
  // Metadata
  title: varchar("title", { length: 255 }),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PageContent = typeof pageContent.$inferSelect;
export type InsertPageContent = typeof pageContent.$inferInsert;
