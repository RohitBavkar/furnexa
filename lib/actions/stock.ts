"use server";

import { getProductsStock } from "@/service/productService";

/**
 * Server Action - Get products stock for client components
 */
export async function getProductsStockAction(ids: string[]) {
  try {
    return await getProductsStock(ids);
  } catch (error) {
    console.error("Error in getProductsStockAction:", error);
    return [];
  }
}
