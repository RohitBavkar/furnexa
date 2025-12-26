import type {
  Category,
  Product,
  ProductImage,
} from "@/app/generated/prisma/client";
import type { Prisma } from "@/app/generated/prisma/client";
import {
  getFeaturedProducts as getFeaturedProductsDao,
  getProductBySlug as getProductBySlugDao,
  getFilteredProducts as getFilteredProductsDao,
  getProductsStock as getProductsStockDao,
  getProductsByIds as getProductsByIdsDao,
} from "@/dao/productDao";

export type ProductWithRelations = Product & {
  category: Category | null;
  images: ProductImage[];
};

export type StockEntry = { id: string; stock: number };

/**
 * Service Layer - Business logic for products
 */

/**
 * Get featured products
 */
export async function getFeaturedProducts(): Promise<ProductWithRelations[]> {
  try {
    return await getFeaturedProductsDao();
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

/**
 * Get product by slug
 */
export async function getProductBySlug(
  slug: string
): Promise<ProductWithRelations | null> {
  try {
    return await getProductBySlugDao(slug);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

interface FilterOptions {
  searchQuery?: string;
  categorySlug?: string;
  color?: string;
  material?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: string;
}

/**
 * Get filtered products with business logic
 */
export async function getFilteredProducts({
  searchQuery,
  categorySlug,
  color,
  material,
  minPrice = 0,
  maxPrice = 0,
  inStock = false,
  sort = "name",
}: FilterOptions): Promise<ProductWithRelations[]> {
  try {
    // Build Prisma query filters (Business Logic)
    const whereClause: Prisma.ProductWhereInput = {};

    if (searchQuery) {
      whereClause.name = {
        contains: searchQuery,
        mode: "insensitive",
      };
    }

    if (categorySlug) {
      whereClause.category = {
        slug: categorySlug,
      };
    }

    if (color) {
      whereClause.color = color;
    }

    if (material) {
      whereClause.material = material;
    }

    if (minPrice > 0 || maxPrice > 0) {
      whereClause.price = {};
      if (minPrice > 0) whereClause.price.gte = minPrice;
      if (maxPrice > 0) whereClause.price.lte = maxPrice;
    }

    if (inStock) {
      whereClause.stock = {
        gt: 0,
      };
    }

    // Determine sort order (Business Logic)
    let orderBy: Prisma.ProductOrderByWithRelationInput = { name: "asc" };
    switch (sort) {
      case "price_asc":
        orderBy = { price: "asc" };
        break;
      case "price_desc":
        orderBy = { price: "desc" };
        break;
      case "relevance":
      case "name":
      default:
        orderBy = { name: "asc" };
        break;
    }

    return await getFilteredProductsDao(whereClause, orderBy);
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    return [];
  }
}

/**
 * Get products stock by IDs
 */
export async function getProductsStock(ids: string[]): Promise<StockEntry[]> {
  if (!ids || ids.length === 0) return [];
  try {
    return await getProductsStockDao(ids);
  } catch (error) {
    console.error("Error fetching stock:", error);
    return [];
  }
}

/**
 * Get products by IDs
 */
export async function getProductsByIds(
  ids: string[]
): Promise<ProductWithRelations[]> {
  if (!ids || ids.length === 0) return [];
  try {
    return await getProductsByIdsDao(ids);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
