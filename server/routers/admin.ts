import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import * as db from "../db";

// ============================================================
// ADMIN AUTHENTICATION
// ============================================================

const adminAuthRouter = router({
  verifyPassword: publicProcedure
    .input(z.object({ password: z.string() }))
    .mutation(async ({ input }) => {
      const settings = await db.getAdminSettings();
      if (!settings) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Admin settings not initialized",
        });
      }
      
      // Simple password comparison (in production, use bcrypt)
      const isValid = input.password === settings.adminPassword;
      
      if (!isValid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid admin password",
        });
      }
      
      return { success: true };
    }),
});

// ============================================================
// SETTINGS MANAGEMENT
// ============================================================

const settingsRouter = router({
  get: publicProcedure.query(async () => {
    return await db.getAdminSettings();
  }),

  update: publicProcedure
    .input(
      z.object({
        adminPassword: z.string().optional(),
        websiteTitle: z.string().optional(),
        logoUrl: z.string().optional(),
        logoKey: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        address: z.string().optional(),
        whatsapp: z.string().optional(),
        instagram: z.string().optional(),
        facebook: z.string().optional(),
        twitter: z.string().optional(),
        linkedin: z.string().optional(),
        mapLatitude: z.string().optional(),
        mapLongitude: z.string().optional(),
        mapZoom: z.number().optional(),
        notificationEmail: z.string().optional(),
        enableEmailNotifications: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await db.updateAdminSettings(input);
    }),
});

// ============================================================
// TESTIMONIALS MANAGEMENT
// ============================================================

const testimonialsRouter = router({
  list: publicProcedure.query(async () => {
    return await db.getAllTestimonials();
  }),

  create: publicProcedure
    .input(
      z.object({
        textEn: z.string(),
        textAr: z.string().optional(),
        authorName: z.string(),
        authorRole: z.string().optional(),
        authorImage: z.string().optional(),
        rating: z.number().default(5),
        isVisible: z.boolean().default(true),
        order: z.number().default(0),
      })
    )
    .mutation(async ({ input }) => {
      return await db.createTestimonial(input);
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        textEn: z.string().optional(),
        textAr: z.string().optional(),
        authorName: z.string().optional(),
        authorRole: z.string().optional(),
        authorImage: z.string().optional(),
        rating: z.number().optional(),
        isVisible: z.boolean().optional(),
        order: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await db.updateTestimonial(id, data);
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await db.deleteTestimonial(input.id);
    }),
});

// ============================================================
// INQUIRIES MANAGEMENT
// ============================================================

const inquiriesRouter = router({
  list: publicProcedure.query(async () => {
    return await db.getInquiries();
  }),

  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await db.getInquiry(input.id);
    }),

  create: publicProcedure
    .input(
      z.object({
        fullName: z.string(),
        email: z.string().email(),
        phone: z.string(),
        projectDetails: z.string().optional(),
        tentType: z.string().optional(),
        eventDate: z.string().optional(),
        location: z.string().optional(),
        budget: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const inquiry = await db.createInquiry({
        ...input,
        status: "new",
      });

      // Create notification for admin
      await db.createNotification({
        title: "New Inquiry",
        message: `New inquiry from ${input.fullName}`,
        type: "inquiry",
      });

      return inquiry;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "contacted", "in-progress", "completed", "rejected"]).optional(),
        notes: z.string().optional(),
        emailSent: z.boolean().optional(),
        inAppNotificationSent: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await db.updateInquiry(id, data);
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await db.deleteInquiry(input.id);
    }),
});

// ============================================================
// NOTIFICATIONS MANAGEMENT
// ============================================================

const notificationsRouter = router({
  list: publicProcedure
    .input(z.object({ limit: z.number().default(50) }))
    .query(async ({ input }) => {
      return await db.getNotifications(input.limit);
    }),

  markAsRead: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await db.markNotificationAsRead(input.id);
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await db.deleteNotification(input.id);
    }),
});

// ============================================================
// STATISTICS MANAGEMENT
// ============================================================

const statisticsRouter = router({
  get: publicProcedure.query(async () => {
    return await db.getStatistics();
  }),

  update: publicProcedure
    .input(
      z.object({
        projectsCompleted: z.number().optional(),
        yearsOfExperience: z.number().optional(),
        happyClients: z.number().optional(),
        countriesServed: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await db.updateStatistics(input);
    }),
});

// ============================================================
// MENU ITEMS MANAGEMENT
// ============================================================

const menuRouter = router({
  list: publicProcedure.query(async () => {
    return await db.getAllMenuItems();
  }),

  reorder: publicProcedure
    .input(
      z.object({
        items: z.array(
          z.object({
            id: z.number(),
            order: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      for (const item of input.items) {
        await db.updateMenuItemOrder(item.id, item.order);
      }
      return { success: true };
    }),

  create: publicProcedure
    .input(
      z.object({
        labelEn: z.string(),
        labelAr: z.string(),
        href: z.string(),
        type: z.enum(["link", "section", "external"]).default("link"),
        order: z.number().default(0),
        isVisible: z.boolean().default(true),
      })
    )
    .mutation(async ({ input }) => {
      return await db.createMenuItem(input);
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        labelEn: z.string().optional(),
        labelAr: z.string().optional(),
        href: z.string().optional(),
        type: z.enum(["link", "section", "external"]).optional(),
        order: z.number().optional(),
        isVisible: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await db.updateMenuItem(id, data);
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await db.deleteMenuItem(input.id);
    }),
});

// ============================================================
// HERO SECTION MANAGEMENT
// ============================================================

const heroRouter = router({
  get: publicProcedure.query(async () => {
    return await db.getHeroSection();
  }),

  update: publicProcedure
    .input(
      z.object({
        titleEn: z.string().optional(),
        titleAr: z.string().optional(),
        subtitleEn: z.string().optional(),
        subtitleAr: z.string().optional(),
        labelEn: z.string().optional(),
        labelAr: z.string().optional(),
        cta1TextEn: z.string().optional(),
        cta1TextAr: z.string().optional(),
        cta1Link: z.string().optional(),
        cta2TextEn: z.string().optional(),
        cta2TextAr: z.string().optional(),
        cta2Link: z.string().optional(),
        imageUrl: z.string().optional(),
        imageKey: z.string().optional(),
        iconColor: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await db.updateHeroSection(input);
    }),
});

// ============================================================
// PAGE CONTENT MANAGEMENT
// ============================================================

const contentRouter = router({
  get: publicProcedure
    .input(z.object({ sectionKey: z.string() }))
    .query(async ({ input }) => {
      return await db.getPageContent(input.sectionKey);
    }),

  update: publicProcedure
    .input(
      z.object({
        sectionKey: z.string(),
        contentEn: z.string().optional(),
        contentAr: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { sectionKey, ...data } = input;
      return await db.updatePageContent(sectionKey, data);
    }),
});

// ============================================================
// MAIN ADMIN ROUTER
// ============================================================

export const adminRouter = router({
  auth: adminAuthRouter,
  settings: settingsRouter,
  testimonials: testimonialsRouter,
  inquiries: inquiriesRouter,
  notifications: notificationsRouter,
  statistics: statisticsRouter,
  menu: menuRouter,
  hero: heroRouter,
  content: contentRouter,
});
