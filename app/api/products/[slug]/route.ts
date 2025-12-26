import { NextRequest } from "next/server";
import { errorResponse, handleApiError, successResponse } from "@/lib/response";
import { getProductBySlug } from "@/service/productService";

/**
 * API Route - Thin wrapper for service layer
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return errorResponse("Product slug is required", 400);
    }

    const product = await getProductBySlug(slug);

    if (!product) {
      return errorResponse("Product not found", 404);
    }

    return successResponse(product);
  } catch (error) {
    return handleApiError(error, "Error fetching product");
  }
}
