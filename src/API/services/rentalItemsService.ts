// Rental Item Interface

import { RentalItem } from "../models/RentalItem";
import { RentalItemsResponse } from "../models/RentalItemsResponse";

// API Response Interface

// Configuration
const API_BASE_URL = "https://dzditmjtdq.cfolks.pl/wp-json/rental-api/v1";

// Rental Items Service
export class RentalItemsService {
  /**
   * Fetch all rental items
   * @param page Optional page number for pagination
   * @param perPage Optional number of items per page
   * @returns Promise with an array of RentalItem objects
   */
  static async getAllItems(
    page?: number,
    perPage?: number
  ): Promise<RentalItem[]> {
    let url = `${API_BASE_URL}/rental-items`;

    // Add pagination parameters if provided
    const params = new URLSearchParams();
    if (page !== undefined) {
      params.append("page", page.toString());
    }
    if (perPage !== undefined) {
      params.append("per_page", perPage.toString());
    }

    // Append parameters to URL if any exist
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

      const data: RentalItemsResponse = await response.json();
      return data.items;
    } catch (error) {
      console.error("Error fetching rental items:", error);
      throw error;
    }
  }

  /**
   * Fetch a single rental item by ID
   * @param id The ID of the rental item to fetch
   * @returns Promise with a RentalItem object
   */
  static async getItemById(id: number): Promise<RentalItem> {
    const url = `${API_BASE_URL}/rental-items/${id}`;

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

      const data: RentalItem = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching rental item with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create a new rental item
   * @param item The rental item data to create
   * @returns Promise with the created item ID
   */
  static async createItem(
    item: Omit<RentalItem, "id">
  ): Promise<{ id: number; success: boolean; message: string }> {
    const url = `${API_BASE_URL}/rental-items`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating rental item:", error);
      throw error;
    }
  }
}

// Example usage:
/*
  // Get all items
  RentalItemsService.getAllItems()
    .then(items => {
      console.log('All rental items:', items);
    })
    .catch(error => {
      console.error('Failed to fetch items:', error);
    });
  
  // Get items with pagination
  RentalItemsService.getAllItems(1, 10)
    .then(items => {
      console.log('Page 1 (10 items per page):', items);
    });
  
  // Get a single item
  RentalItemsService.getItemById(123)
    .then(item => {
      console.log('Item details:', item);
    });
  
  // Create a new item
  const newItem = {
    title: 'New Rental Item',
    name: 'Detailed Name',
    description: 'Item description',
    dailyPrice: '100',
    nextDayPrice: '80',
    weekendPrice: '150',
    transportPrice: '30',
    mainPhoto: 'https://example.com/photo.jpg'
  };
  
  RentalItemsService.createItem(newItem)
    .then(result => {
      console.log('Item created with ID:', result.id);
    });
  */
