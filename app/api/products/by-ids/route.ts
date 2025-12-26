import { NextRequest } from "next/server";
import { handleApiError, successResponse } from "@/lib/response";
import { getProductsByIds } from "@/service/productService";

/**
 * API Route - Thin wrapper for service layer
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const rawIds = searchParams.getAll("ids");
    const ids = rawIds
      .flatMap((s) => s.split(","))
      .map((s) => s.trim())
      .filter(Boolean);

    if (ids.length === 0) {
      return successResponse([]);
    }

    const products = await getProductsByIds(ids);
    return successResponse(products);
  } catch (error) {
    return handleApiError(error, "Error fetching products");
  }
}
