import axios from "axios";

export interface InventoryItem {
  _id?: string;
  name: string;
  quantity: number;
  price: number;
  threshold?: number;
  expiryDate?: string;
  createdAt?: string;
}

interface GetItemsResponse {
  items: InventoryItem[];
}

interface AddItemResponse {
  item: InventoryItem;
  message: string;
}

interface UpdateItemResponse {
  item: InventoryItem;
  message: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

// Get current user ID from localStorage
const getCurrentUserId = (): string => {
  if (typeof window === "undefined") return "";

  try {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      return userData.userId || "";
    }
  } catch (error) {
    console.error("Error getting current user:", error);
  }

  return "";
};

export const inventoryService = {
  // Get all inventory items for the current user
  async getItems(): Promise<InventoryItem[]> {
    const userId = getCurrentUserId();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    try {
      const response = await axios.get<GetItemsResponse>(
        `${API_URL}/inventory?userId=${userId}`
      );
      return response.data.items;
    } catch (error: any) {
      throw error;
    }
  },

  // Add a new inventory item for the current user
  async addItem(item: InventoryItem): Promise<InventoryItem> {
    const userId = getCurrentUserId();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    try {
      const response = await axios.post<AddItemResponse>(
        `${API_URL}/inventory`,
        {
          ...item,
          userId,
        }
      );
      return response.data.item;
    } catch (error: any) {
      throw error;
    }
  },

  // Update an inventory item
  async updateItem(
    id: string,
    item: Partial<InventoryItem>
  ): Promise<InventoryItem> {
    const userId = getCurrentUserId();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    try {
      const response = await axios.put<UpdateItemResponse>(
        `${API_URL}/inventory/${id}`,
        {
          ...item,
          userId,
        }
      );
      return response.data.item;
    } catch (error: any) {
      throw error;
    }
  },

  // Delete an inventory item for the current user
  async deleteItem(id: string): Promise<void> {
    const userId = getCurrentUserId();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    try {
      await axios.delete(`${API_URL}/inventory/${id}?userId=${userId}`);
    } catch (error: any) {
      throw error;
    }
  },
};
