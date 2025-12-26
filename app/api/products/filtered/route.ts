import { successResponse, handleApiError } from "@/lib/response";
import type { NextRequest } from "next/server";
import { getFilteredProducts } from "@/service/productService";

/**
 * API Route - Thin wrapper for service layer
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const searchQuery = searchParams.get("q") || "";
    const categorySlug = searchParams.get("category") || "";
    const color = searchParams.get("color") || "";
    const material = searchParams.get("material") || "";
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 0;
    const inStock = searchParams.get("inStock") === "true";
    const sort = searchParams.get("sort") || "name";

    const products = await getFilteredProducts({
      searchQuery,
      categorySlug,
      color,
      material,
      minPrice,
      maxPrice,
      inStock,
      sort,
    });

    return successResponse(products);
  } catch (error) {
    return handleApiError(error, "Error fetching filtered products");
  }
}
