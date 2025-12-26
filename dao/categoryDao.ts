import DB from "@/lib/prisma";

/**
 * DAO Layer - Pure database access for categories
 */

/**
 * Get all categories
 */
export async function getAllCategories() {
  return await DB.category.findMany({
    orderBy: {
      title: "asc",
    },
  });
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(slug: string) {
  return await DB.category.findUnique({
    where: { slug },
  });
}

/**
 * Get category by ID
 */
export async function getCategoryById(id: string) {
  return await DB.category.findUnique({
    where: { id },
  });
}
