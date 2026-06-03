import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import * as db from "../db";

export const homepageRouter = router({
  getSections: publicProcedure
    .input(z.object({
      pageName: z.string().default("home"),
      activeOnly: z.boolean().default(true),
    }).optional())
    .query(async ({ input }) => {
      const pageName = input?.pageName ?? "home";
      const activeOnly = input?.activeOnly ?? true;
      return await db.getPageSections(pageName, activeOnly);
    }),

  createSection: publicProcedure
    .input(z.object({
      pageName: z.string().default("home"),
      sectionType: z.string(),
      content: z.string(),
      orderIndex: z.number().default(0),
      isActive: z.boolean().default(true),
    }))
    .mutation(async ({ input }) => {
      return await db.createPageSection(input);
    }),

  updateSection: publicProcedure
    .input(z.object({
      id: z.number(),
      content: z.string().optional(),
      orderIndex: z.number().optional(),
      isActive: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await db.updatePageSection(id, data);
    }),

  deleteSection: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await db.deletePageSection(input.id);
    }),
});
