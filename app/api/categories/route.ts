import { successResponse, handleApiError } from "@/lib/response";
import { getAllCategories } from "@/service/categoryService";

/**
 * API Route - Thin wrapper for service layer
 */
export async function GET() {
  try {
    const categories = await getAllCategories();
    return successResponse(categories);
  } catch (error) {
    return handleApiError(error, "Error fetching categories");
  }
}
