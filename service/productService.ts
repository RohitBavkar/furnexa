import { GET_FEATURED_PRODUCTS } from "@/lib/api";

export async function getFeaturedProducts() {
  try {
    const response = await fetch(GET_FEATURED_PRODUCTS);

    if (!response.ok) {
      throw new Error("Failed to fetch featured products");
    }

    const { data } = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}
