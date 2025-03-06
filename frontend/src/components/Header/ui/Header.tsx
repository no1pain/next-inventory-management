"use client";

import React from "react";
import Image from "next/image";
import { FaBell, FaSearch } from "react-icons/fa";

export const Header = () => {
  return (
    <header className="bg-white py-3 px-4 md:px-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search product, supplier, order"
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        <div className="flex items-center space-x-3 md:space-x-5 ml-4">
          <button className="relative p-1 text-gray-500 hover:text-gray-700 focus:outline-none">
            <FaBell className="text-xl" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center">
            <div className="h-9 w-9 rounded-full overflow-hidden border border-gray-200">
              <Image
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User profile"
                width={36}
                height={36}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
