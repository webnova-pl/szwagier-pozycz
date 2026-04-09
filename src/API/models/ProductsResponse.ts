import { Product } from "./Product";

export interface ProductsResponse {
  items: Product[];
  total: number;
  pages: number;
}
