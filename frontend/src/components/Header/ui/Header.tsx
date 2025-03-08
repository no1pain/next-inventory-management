"use client";

import React from "react";
import Image from "next/image";
import { FaBell, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/context/AuthContext";

export const Header = () => {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <header className="h-20 bg-white py-3 px-4 md:px-6 border-b border-gray-200 flex items-center">
      <div className="flex items-center justify-between w-full">
        <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search product, supplier, order"
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm leading-tight"
          />
        </div>

        <div className="flex items-center space-x-3 md:space-x-5 ml-4">
          {isAuthenticated ? (
            <>
              <button className="relative p-1 text-gray-500 hover:text-gray-700 focus:outline-none flex items-center">
                <FaBell className="text-xl" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center">
                  <Image
                    src={
                      user?.avatar ||
                      (user as any)?.image ||
                      "https://randomuser.me/api/portraits/men/32.jpg"
                    }
                    alt="User profile"
                    width={36}
                    height={36}
                    className="object-cover"
                  />
                </div>
              </div>
            </>
          ) : (
            <button
              onClick={handleLoginClick}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
