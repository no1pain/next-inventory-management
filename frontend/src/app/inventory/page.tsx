"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  FaFilter,
  FaDownload,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
} from "react-icons/fa";
import { InventoryItem, inventoryService } from "@/services/inventoryService";
import AddProductModal from "@/components/inventory/AddProductModal";
import { useAuth } from "@/shared/context/AuthContext";

export default function InventoryPage() {
  const { isAuthenticated, user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const itemsPerPage = 10;
  const totalPages = Math.ceil(inventoryItems.length / itemsPerPage);

  const currentItems = inventoryItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const inventoryStats = useMemo(() => {
    const uniqueNames = new Set(inventoryItems.map((item) => item.name));

    const totalValue = inventoryItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const totalQuantity = inventoryItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const lowStockItems = inventoryItems.filter(
      (item) => item.threshold && item.quantity <= item.threshold
    );

    const outOfStockItems = inventoryItems.filter((item) => item.quantity <= 0);

    return {
      categories: {
        count: uniqueNames.size,
        period: "All time",
      },
      totalProducts: {
        count: totalQuantity,
        uniqueItems: inventoryItems.length,
        period: "All time",
        revenue: totalValue,
      },
      topSelling: {
        count:
          inventoryItems.length > 0 ? Math.min(5, inventoryItems.length) : 0,
        period: "All time",
        cost: totalValue,
      },
      lowStocks: {
        ordered: lowStockItems.length,
        notInStock: outOfStockItems.length,
      },
    };
  }, [inventoryItems]);

  useEffect(() => {
    const fetchItems = async () => {
      if (!isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const items = await inventoryService.getItems();
        setInventoryItems(items);
        setError("");
      } catch (err: any) {
        console.error("Failed to fetch inventory items:", err);
        if (err.message === "User not authenticated") {
          setError("You must be logged in to view inventory items");
        } else if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Failed to load inventory items. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [isAuthenticated]);

  const handleAddProduct = (newProduct: InventoryItem) => {
    setInventoryItems((prev) => [...prev, newProduct]);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await inventoryService.deleteItem(id);
      setInventoryItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err: any) {
      console.error("Failed to delete product:", err);
      if (err.message === "User not authenticated") {
        alert("You must be logged in to delete products");
      } else if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  const getAvailabilityStatus = (item: InventoryItem) => {
    if (!item.threshold) return "In- stock";
    if (item.quantity <= 0) return "Out of stock";
    if (item.quantity <= item.threshold) return "Low stock";
    return "In- stock";
  };

  const getAvailabilityColor = (status: string) => {
    if (status === "In- stock") return "text-green-500";
    if (status === "Out of stock") return "text-red-500";
    return "text-amber-500";
  };

  const formatPrice = (price: number) => {
    return `₹${price.toFixed(2)}`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  // Format large numbers to readable format (e.g., 10000 -> 10k, 1000000 -> 1M)
  const formatLargeNumber = (num: number): string => {
    if (num === 0) return "0";

    const absNum = Math.abs(num);

    if (absNum >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (absNum >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (absNum >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }

    return num.toString();
  };

  // Format currency with large number formatting
  const formatCurrency = (amount: number): string => {
    return `₹${formatLargeNumber(amount)}`;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory</h1>

        {isAuthenticated && user && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FaUser className="mr-2" />
            <span>
              {user.username || user.email}
              <span className="text-xs ml-2 text-gray-500">
                (User ID: {user.userId})
              </span>
            </span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Overall Inventory</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="border-r border-gray-200">
            <h3 className="text-blue-500 font-medium mb-2">Categories</h3>
            <p className="text-2xl font-bold">
              {inventoryStats.categories.count}
            </p>
            <p className="text-gray-500 text-sm">Unique Products</p>
          </div>

          <div className="border-r border-gray-200">
            <h3 className="text-orange-500 font-medium mb-2">Total Products</h3>
            <div className="flex justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {inventoryStats.totalProducts.count}
                </p>
                <p className="text-gray-500 text-sm">Total Quantity</p>
              </div>
              <div className="mr-6">
                <p className="text-2xl font-bold">
                  {inventoryStats.totalProducts.revenue}
                </p>
                <p className="text-gray-500 text-sm">Total Value</p>
              </div>
            </div>
          </div>

          <div className="border-r border-gray-200">
            <h3 className="text-purple-500 font-medium mb-2">Top Selling</h3>
            <div className="flex justify-between">
              <div className="mr-6">
                <p className="text-2xl font-bold">
                  {inventoryStats.topSelling.count}
                </p>
                <p className="text-gray-500 text-sm">
                  {inventoryStats.topSelling.period}
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {inventoryStats.topSelling.cost}
                </p>
                <p className="text-gray-500 text-sm">Cost</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-red-500 font-medium mb-2">Low Stocks</h3>
            <div className="flex justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {inventoryStats.lowStocks.ordered}
                </p>
                <p className="text-gray-500 text-sm">Ordered</p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {inventoryStats.lowStocks.notInStock}
                </p>
                <p className="text-gray-500 text-sm">Not in stock</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Products</h2>
          <div className="flex gap-3">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Product
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2">
              <FaFilter /> Filters
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2">
              <FaDownload /> Download all
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Buying Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Threshold Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Availability
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Loading inventory items...
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No inventory items found. Add some products to get started.
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => {
                  const availability = getAvailabilityStatus(item);
                  return (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity} {item.quantity === 1 ? "Unit" : "Units"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.threshold || 5}{" "}
                        {(item.threshold || 5) === 1 ? "Unit" : "Units"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(item.expiryDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={getAvailabilityColor(availability)}>
                          {availability}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDeleteProduct(item._id || "")}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {inventoryItems.length > 0 && (
          <div className="flex justify-between items-center mt-6">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || isLoading}
            >
              <FaChevronLeft className="inline mr-1" /> Previous
            </button>

            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages || 1}
            </span>

            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages || 1))
              }
              disabled={
                currentPage === totalPages || totalPages === 0 || isLoading
              }
            >
              Next <FaChevronRight className="inline ml-1" />
            </button>
          </div>
        )}
      </div>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onProductAdded={handleAddProduct}
      />
    </div>
  );
}
