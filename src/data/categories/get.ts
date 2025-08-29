import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { categoryTable } from "@/db/schema";

export const getCategories = async () => {
  const categories = await db.query.categoryTable.findMany();
  return categories;
};

export const getCategoryBySlug = async (slug: string) => {
  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
  });
  return category;
};
