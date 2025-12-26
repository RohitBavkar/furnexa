import DB from "@/lib/prisma";
import type { Prisma } from "@/app/generated/prisma/client";

/**
 * DAO Layer - Pure database access for products
 */

/**
 * Get all featured products
 */
export async function getFeaturedProducts() {
  return await DB.product.findMany({
    where: {
      featured: true,
    },
    include: {
      images: true,
      category: true,
    },
  });
}

/**
 * Get product by slug
 */
export async function getProductBySlug(slug: string) {
  return await DB.product.findUnique({
    where: { slug },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
      category: true,
    },
  });
}

/**
 * Get filtered products
 */
export async function getFilteredProducts(
  whereClause: Prisma.ProductWhereInput,
  orderBy: Prisma.ProductOrderByWithRelationInput
) {
  return await DB.product.findMany({
    where: whereClause,
    orderBy,
    include: {
      category: true,
      images: {
        orderBy: { order: "asc" },
      },
    },
  });
}

/**
 * Get products stock by IDs
 */
export async function getProductsStock(ids: string[]) {
  return await DB.product.findMany({
    where: { id: { in: ids } },
    select: { id: true, stock: true },
  });
}

/**
 * Get products by IDs
 */
export async function getProductsByIds(ids: string[]) {
  return await DB.product.findMany({
    where: { id: { in: ids } },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
      category: true,
    },
  });
}

/**
 * Update product stock
 */
export async function updateProductStock(productId: string, quantity: number) {
  return await DB.product.update({
    where: { id: productId },
    data: { stock: { decrement: quantity } },
  });
}
