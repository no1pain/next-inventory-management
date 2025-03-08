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

// interface GetItemsResponse {
//   items: InventoryItem[];
// }

// interface AddItemResponse {
//   item: InventoryItem;
//   message: string;
// }

// interface UpdateItemResponse {
//   item: InventoryItem;
//   message: string;
// }

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

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

// Helper function to get items from localStorage
const getItemsFromStorage = (): InventoryItem[] => {
  if (typeof window === "undefined") return [];

  const userId = getCurrentUserId();
  if (!userId) return [];

  try {
    const storageKey = `inventory_${userId}`;
    const items = localStorage.getItem(storageKey);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error("Error getting items from localStorage:", error);
    return [];
  }
};

// Helper function to save items to localStorage
const saveItemsToStorage = (items: InventoryItem[]): void => {
  if (typeof window === "undefined") return;

  const userId = getCurrentUserId();
  if (!userId) return;

  try {
    const storageKey = `inventory_${userId}`;
    localStorage.setItem(storageKey, JSON.stringify(items));
  } catch (error) {
    console.error("Error saving items to localStorage:", error);
  }
};

// Generate a unique ID for new items
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const inventoryService = {
  // Get all inventory items for the current user
  async getItems(): Promise<InventoryItem[]> {
    const userId = getCurrentUserId();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      // Get items from localStorage
      return getItemsFromStorage();

      // Original API call
      // const response = await axios.get<GetItemsResponse>(
      //   `${API_URL}/inventory?userId=${userId}`
      // );
      // return response.data.items;
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

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      // Create new item with ID and timestamp
      const newItem: InventoryItem = {
        ...item,
        _id: generateId(),
        createdAt: new Date().toISOString(),
      };

      // Get current items and add the new one
      const items = getItemsFromStorage();
      items.push(newItem);

      // Save updated items
      saveItemsToStorage(items);

      return newItem;

      // Original API call
      // const response = await axios.post<AddItemResponse>(
      //   `${API_URL}/inventory`,
      //   {
      //     ...item,
      //     userId,
      //   }
      // );
      // return response.data.item;
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

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      // Get current items
      const items = getItemsFromStorage();

      // Find the item to update
      const index = items.findIndex((i) => i._id === id);
      if (index === -1) {
        throw new Error("Item not found");
      }

      // Update the item
      const updatedItem = { ...items[index], ...item };
      items[index] = updatedItem;

      // Save updated items
      saveItemsToStorage(items);

      return updatedItem;

      // Original API call
      // const response = await axios.put<UpdateItemResponse>(
      //   `${API_URL}/inventory/${id}`,
      //   {
      //     ...item,
      //     userId,
      //   }
      // );
      // return response.data.item;
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

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      // Get current items
      const items = getItemsFromStorage();

      // Filter out the item to delete
      const updatedItems = items.filter((item) => item._id !== id);

      // Save updated items
      saveItemsToStorage(updatedItems);

      // Original API call
      // await axios.delete(`${API_URL}/inventory/${id}?userId=${userId}`);
    } catch (error: any) {
      throw error;
    }
  },
};
