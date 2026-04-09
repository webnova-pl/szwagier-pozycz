import { Product } from "../models/Product";
import { ProductsResponse } from "../models/ProductsResponse";

const API_BASE_URL =
  "https://www.szwagierpozycz.pl/api/wp-json/products-api/v1";

export class ProductsService {
  static async getAllProducts(
    page?: number,
    perPage?: number,
  ): Promise<Product[]> {
    let url = `${API_BASE_URL}/products`;

    const params = new URLSearchParams();
    if (page !== undefined) {
      params.append("page", page.toString());
    }
    if (perPage !== undefined) {
      params.append("per_page", perPage.toString());
    }

    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: ProductsResponse = await response.json();
      return data.items;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  static async getProductById(id: number): Promise<Product> {
    const url = `${API_BASE_URL}/products/${id}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: Product = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  }

  static async getProductBySlug(slug: string): Promise<Product> {
    const encoded = encodeURIComponent(slug);
    const url = `${API_BASE_URL}/products/slug/${encoded}`;

    try {
      const response = await fetch(url, { method: "GET" });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return (await response.json()) as Product;
    } catch (error) {
      console.error(`Error fetching product with slug "${slug}":`, error);
      throw error;
    }
  }
}
