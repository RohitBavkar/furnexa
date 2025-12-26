import { getAllCategories as getAllCategoriesDao } from "@/dao/categoryDao";

/**
 * Service Layer - Business logic for categories
 */

/**
 * Get all categories
 */
export async function getAllCategories() {
  try {
    return await getAllCategoriesDao();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
