import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, adminSettings, testimonials, inquiries, notifications, statistics, menuItems, heroSection, pageContent, products, features, projects, sectors, pageSections } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============================================================
// ADMIN SETTINGS
// ============================================================

export async function getAdminSettings() {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(adminSettings).limit(1);
  if (result.length > 0) return result[0];
  // Auto-initialize default settings when table is empty
  const defaults = {
    adminUsername: "admin",
    adminPassword: "admin123",
    websiteTitle: "Al Noor Tents",
    phone: "+97433555918",
    email: "info@alnoortents.com",
    address: "Dubai, United Arab Emirates",
    whatsapp: "https://wa.me/97433555918",
    enableCookieBanner: true,
    cookieBannerTextEn: "We use cookies to improve your experience on our website. By browsing this website, you agree to our use of cookies.",
    cookieBannerTextAr: "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا. من خلال تصفح هذا الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط.",
    enableEmailNotifications: true,
    mapZoom: 13,
    smtpPort: 465,
  };
  await db.insert(adminSettings).values(defaults as any);
  const inserted = await db.select().from(adminSettings).limit(1);
  return inserted.length > 0 ? inserted[0] : null;
}

export async function updateAdminSettings(data: Partial<typeof adminSettings.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  const existing = await getAdminSettings();
  if (existing) {
    return await db.update(adminSettings).set(data).where(eq(adminSettings.id, existing.id));
  } else {
    return await db.insert(adminSettings).values(data as any);
  }
}

// ============================================================
// TESTIMONIALS
// ============================================================

export async function getTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(testimonials).where(eq(testimonials.isVisible, true)).orderBy(testimonials.order);
}

export async function getAllTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(testimonials).orderBy(testimonials.order);
}

export async function createTestimonial(data: typeof testimonials.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  return await db.insert(testimonials).values(data);
}

export async function updateTestimonial(id: number, data: Partial<typeof testimonials.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  return await db.update(testimonials).set(data).where(eq(testimonials.id, id));
}

export async function deleteTestimonial(id: number) {
  const db = await getDb();
  if (!db) return null;
  return await db.delete(testimonials).where(eq(testimonials.id, id));
}

// ============================================================
// INQUIRIES
// ============================================================

export async function createInquiry(data: typeof inquiries.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  return await db.insert(inquiries).values(data);
}

export async function getInquiries() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
}

export async function getInquiry(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(inquiries).where(eq(inquiries.id, id));
  return result.length > 0 ? result[0] : null;
}

export async function updateInquiry(id: number, data: Partial<typeof inquiries.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  return await db.update(inquiries).set(data).where(eq(inquiries.id, id));
}

export async function deleteInquiry(id: number) {
  const db = await getDb();
  if (!db) return null;
  return await db.delete(inquiries).where(eq(inquiries.id, id));
}

// ============================================================
// NOTIFICATIONS
// ============================================================

export async function createNotification(data: typeof notifications.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  return await db.insert(notifications).values(data);
}

export async function getNotifications(limit: number = 50) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(notifications).orderBy(desc(notifications.createdAt)).limit(limit);
}

export async function markNotificationAsRead(id: number) {
  const db = await getDb();
  if (!db) return null;
  return await db.update(notifications).set({ isRead: true }).where(eq(notifications.id, id));
}

export async function deleteNotification(id: number) {
  const db = await getDb();
  if (!db) return null;
  return await db.delete(notifications).where(eq(notifications.id, id));
}

// ============================================================
// STATISTICS
// ============================================================

export async function getStatistics() {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(statistics).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateStatistics(data: Partial<typeof statistics.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  const existing = await getStatistics();
  if (existing) {
    return await db.update(statistics).set(data).where(eq(statistics.id, existing.id));
  } else {
    return await db.insert(statistics).values(data as any);
  }
}

// ============================================================
// MENU ITEMS
// ============================================================

export async function getMenuItems() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(menuItems).where(eq(menuItems.isVisible, true)).orderBy(menuItems.order);
}

export async function getAllMenuItems() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(menuItems).orderBy(menuItems.order);
}

export async function updateMenuItemOrder(id: number, order: number) {
  const db = await getDb();
  if (!db) return null;
  return await db.update(menuItems).set({ order }).where(eq(menuItems.id, id));
}

export async function createMenuItem(data: typeof menuItems.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  return await db.insert(menuItems).values(data);
}

export async function updateMenuItem(id: number, data: Partial<typeof menuItems.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  return await db.update(menuItems).set(data).where(eq(menuItems.id, id));
}

export async function deleteMenuItem(id: number) {
  const db = await getDb();
  if (!db) return null;
  return await db.delete(menuItems).where(eq(menuItems.id, id));
}

// ============================================================
// HERO SECTION
// ============================================================

export async function getHeroSection() {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(heroSection).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateHeroSection(data: Partial<typeof heroSection.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  const existing = await getHeroSection();
  if (existing) {
    return await db.update(heroSection).set(data).where(eq(heroSection.id, existing.id));
  } else {
    return await db.insert(heroSection).values(data as any);
  }
}

// ============================================================
// PAGE CONTENT
// ============================================================

export async function getPageContent(sectionKey: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(pageContent).where(eq(pageContent.sectionKey, sectionKey));
  return result.length > 0 ? result[0] : null;
}

export async function updatePageContent(sectionKey: string, data: Partial<typeof pageContent.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  const existing = await getPageContent(sectionKey);
  if (existing) {
    return await db.update(pageContent).set(data).where(eq(pageContent.id, existing.id));
  } else {
    return await db.insert(pageContent).values({ sectionKey, ...data } as any);
  }
}

// ============================================================
// PRODUCTS
// ============================================================
export async function getProducts() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(products).where(eq(products.isVisible, true)).orderBy(products.order);
}

export async function getAllProducts() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(products).orderBy(products.order);
}

export async function createProduct(data: typeof products.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  return await db.insert(products).values(data);
}

export async function updateProduct(id: number, data: Partial<typeof products.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  return await db.update(products).set(data).where(eq(products.id, id));
}

export async function deleteProduct(id: number) {
  const db = await getDb();
  if (!db) return null;
  return await db.delete(products).where(eq(products.id, id));
}

// ============================================================
// FEATURES
// ============================================================
export async function getFeatures() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(features).where(eq(features.isVisible, true)).orderBy(features.order);
}

export async function getAllFeatures() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(features).orderBy(features.order);
}

export async function createFeature(data: typeof features.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  return await db.insert(features).values(data);
}

export async function updateFeature(id: number, data: Partial<typeof features.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  return await db.update(features).set(data).where(eq(features.id, id));
}

export async function deleteFeature(id: number) {
  const db = await getDb();
  if (!db) return null;
  return await db.delete(features).where(eq(features.id, id));
}

// ============================================================
// PROJECTS
// ============================================================
export async function getProjects() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(projects).where(eq(projects.isVisible, true)).orderBy(projects.order);
}

export async function getAllProjects() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(projects).orderBy(projects.order);
}

export async function createProject(data: typeof projects.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  return await db.insert(projects).values(data);
}

export async function updateProject(id: number, data: Partial<typeof projects.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  return await db.update(projects).set(data).where(eq(projects.id, id));
}

export async function deleteProject(id: number) {
  const db = await getDb();
  if (!db) return null;
  return await db.delete(projects).where(eq(projects.id, id));
}

// ============================================================
// SECTORS
// ============================================================
export async function getSectors() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(sectors).where(eq(sectors.isVisible, true)).orderBy(sectors.order);
}

export async function getAllSectors() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(sectors).orderBy(sectors.order);
}

export async function createSector(data: typeof sectors.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  return await db.insert(sectors).values(data);
}

export async function updateSector(id: number, data: Partial<typeof sectors.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  return await db.update(sectors).set(data).where(eq(sectors.id, id));
}

export async function deleteSector(id: number) {
  const db = await getDb();
  if (!db) return null;
  return await db.delete(sectors).where(eq(sectors.id, id));
}

// ============================================================
// PAGE SECTIONS
// ============================================================
export async function getPageSections(pageName: string = "home", activeOnly: boolean = false) {
  const db = await getDb();
  if (!db) return [];
  
  if (activeOnly) {
    return await db.select()
      .from(pageSections)
      .where(and(eq(pageSections.pageName, pageName), eq(pageSections.isActive, true)))
      .orderBy(pageSections.orderIndex);
  }
  
  return await db.select()
    .from(pageSections)
    .where(eq(pageSections.pageName, pageName))
    .orderBy(pageSections.orderIndex);
}

export async function createPageSection(data: typeof pageSections.$inferInsert) {
  const db = await getDb();
  if (!db) return null;
  return await db.insert(pageSections).values(data);
}

export async function updatePageSection(id: number, data: Partial<typeof pageSections.$inferInsert>) {
  const db = await getDb();
  if (!db) return null;
  return await db.update(pageSections).set(data).where(eq(pageSections.id, id));
}

export async function deletePageSection(id: number) {
  const db = await getDb();
  if (!db) return null;
  return await db.delete(pageSections).where(eq(pageSections.id, id));
}
