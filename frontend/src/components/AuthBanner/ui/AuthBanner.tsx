"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/shared/context/AuthContext";
import { FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";

export const AuthBanner = () => {
  const { isAuthenticated } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  // Don't show banner on login and signup pages
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  // Check localStorage on component mount
  useEffect(() => {
    const bannerDismissed = localStorage.getItem("authBannerDismissed");
    if (bannerDismissed) {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Store the dismissal in localStorage so it persists across page refreshes
    localStorage.setItem("authBannerDismissed", "true");
  };

  // Don't render if authenticated, banner was dismissed, or on auth pages
  if (isAuthenticated || !isVisible || isAuthPage) {
    return null;
  }

  return (
    <div className="bg-blue-600 text-white py-2 px-4 text-center relative">
      <p className="text-sm font-medium">
        Please{" "}
        <Link href="/login" className="underline font-bold hover:text-blue-100">
          log in
        </Link>{" "}
        to access all features of the application
      </p>
      <button
        onClick={handleDismiss}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-200 focus:outline-none cursor-pointer"
        aria-label="Close notification"
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default AuthBanner;
