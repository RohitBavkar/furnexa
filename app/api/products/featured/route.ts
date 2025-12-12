import { getFeaturedProducts } from "@/service/productService";
import { successResponse, handleApiError } from "@/lib/response";

export async function GET() {
  try {
    const featuredProducts = await getFeaturedProducts();
    return successResponse(featuredProducts);
  } catch (error) {
    return handleApiError(error, "Error fetching featured products");
  }
}
