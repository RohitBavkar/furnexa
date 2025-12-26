import { successResponse, handleApiError } from "@/lib/response";
import { getFeaturedProducts } from "@/service/productService";

/**
 * API Route - Thin wrapper for service layer
 */
export async function GET() {
  try {
    const products = await getFeaturedProducts();
    return successResponse(products);
  } catch (error) {
    return handleApiError(error, "Error fetching products");
  }
}
