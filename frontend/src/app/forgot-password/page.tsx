"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This will be connected to the backend later
    console.log("Forgot password submitted for:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 relative mb-4">
            <Image
              src="/logo.svg"
              alt="Kanban Logo"
              width={96}
              height={96}
              className="object-contain"
              onError={(e) => {
                // Fallback if logo doesn't exist yet
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/96x96?text=KANBAN";
              }}
            />
          </div>
          <h1 className="text-3xl font-bold text-blue-500">KANBAN</h1>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-2">
          Reset your password
        </h2>
        <p className="text-gray-500 text-center mb-6">
          {!isSubmitted
            ? "Enter your email and we'll send you instructions to reset your password."
            : "Check your email for instructions to reset your password."}
        </p>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email<span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send reset instructions
            </button>
          </form>
        ) : (
          <div className="text-center p-4 bg-green-50 border border-green-200 rounded-md mb-4">
            <p className="text-green-800">
              If an account exists with the email <strong>{email}</strong>, you
              will receive password reset instructions.
            </p>
          </div>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
