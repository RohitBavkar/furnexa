export interface ProductImage {
  asset?: {
    url: string;
  };
}

export interface ProductCategory {
  title: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  description?: string;
  images?: ProductImage[];
  category?: ProductCategory;
}
