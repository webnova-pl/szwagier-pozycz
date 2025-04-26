import { RentalItem } from "./RentalItem";

export interface RentalItemsResponse {
    items: RentalItem[];
    total: number;
    pages: number;
  }
  