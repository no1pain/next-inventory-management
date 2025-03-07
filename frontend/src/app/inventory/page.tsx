"use client";

import React, { useState } from "react";
import {
  FaFilter,
  FaDownload,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const mockInventoryData = {
  categories: {
    count: 14,
    period: "Last 7 days",
  },
  totalProducts: {
    count: 868,
    period: "Last 7 days",
    revenue: "₹25000",
  },
  topSelling: {
    count: 5,
    period: "Last 7 days",
    cost: "₹2500",
  },
  lowStocks: {
    ordered: 12,
    notInStock: 2,
  },
  products: [
    {
      id: 1,
      name: "Maggi",
      buyingPrice: "₹430",
      quantity: "43 Packets",
      threshold: "12 Packets",
      expiry: "11/12/22",
      availability: "In- stock",
    },
    {
      id: 2,
      name: "Bru",
      buyingPrice: "₹257",
      quantity: "22 Packets",
      threshold: "12 Packets",
      expiry: "21/12/22",
      availability: "Out of stock",
    },
    {
      id: 3,
      name: "Red Bull",
      buyingPrice: "₹405",
      quantity: "36 Packets",
      threshold: "9 Packets",
      expiry: "5/12/22",
      availability: "In- stock",
    },
    {
      id: 4,
      name: "Bourn Vita",
      buyingPrice: "₹502",
      quantity: "14 Packets",
      threshold: "6 Packets",
      expiry: "8/12/22",
      availability: "Out of stock",
    },
    {
      id: 5,
      name: "Horlicks",
      buyingPrice: "₹530",
      quantity: "5 Packets",
      threshold: "5 Packets",
      expiry: "9/1/23",
      availability: "In- stock",
    },
    {
      id: 6,
      name: "Harpic",
      buyingPrice: "₹605",
      quantity: "10 Packets",
      threshold: "5 Packets",
      expiry: "9/1/23",
      availability: "In- stock",
    },
    {
      id: 7,
      name: "Ariel",
      buyingPrice: "₹408",
      quantity: "23 Packets",
      threshold: "7 Packets",
      expiry: "15/12/23",
      availability: "Out of stock",
    },
    {
      id: 8,
      name: "Scotch Brite",
      buyingPrice: "₹359",
      quantity: "43 Packets",
      threshold: "8 Packets",
      expiry: "6/6/23",
      availability: "In- stock",
    },
    {
      id: 9,
      name: "Coca cola",
      buyingPrice: "₹205",
      quantity: "41 Packets",
      threshold: "10 Packets",
      expiry: "11/11/22",
      availability: "Low stock",
    },
  ],
};

export default function InventoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const getAvailabilityColor = (availability: string) => {
    if (availability === "In- stock") return "text-green-500";
    if (availability === "Out of stock") return "text-red-500";
    return "text-amber-500";
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Inventory</h1>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Overall Inventory</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="border-r border-gray-200">
            <h3 className="text-blue-500 font-medium mb-2">Categories</h3>
            <p className="text-2xl font-bold">
              {mockInventoryData.categories.count}
            </p>
            <p className="text-gray-500 text-sm">
              {mockInventoryData.categories.period}
            </p>
          </div>

          <div className="border-r border-gray-200">
            <h3 className="text-orange-500 font-medium mb-2">Total Products</h3>
            <div className="flex justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {mockInventoryData.totalProducts.count}
                </p>
                <p className="text-gray-500 text-sm">
                  {mockInventoryData.totalProducts.period}
                </p>
              </div>
              <div className="mr-6">
                <p className="text-2xl font-bold">
                  {mockInventoryData.totalProducts.revenue}
                </p>
                <p className="text-gray-500 text-sm">Revenue</p>
              </div>
            </div>
          </div>

          <div className="border-r border-gray-200">
            <h3 className="text-purple-500 font-medium mb-2">Top Selling</h3>
            <div className="flex justify-between">
              <div className="mr-6">
                <p className="text-2xl font-bold">
                  {mockInventoryData.topSelling.count}
                </p>
                <p className="text-gray-500 text-sm">
                  {mockInventoryData.topSelling.period}
                </p>
              </div>
              <div className="mr-6">
                <p className="text-2xl font-bold">
                  {mockInventoryData.topSelling.cost}
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
                  {mockInventoryData.lowStocks.ordered}
                </p>
                <p className="text-gray-500 text-sm">Ordered</p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockInventoryData.lowStocks.notInStock}
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
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockInventoryData.products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.buyingPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.threshold}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.expiry}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={getAvailabilityColor(product.availability)}
                    >
                      {product.availability}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <FaChevronLeft className="inline mr-1" /> Previous
          </button>

          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next <FaChevronRight className="inline ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
