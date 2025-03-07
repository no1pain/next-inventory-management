"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import userSchema from "@/shared/api/validation/signUpSchema";
import { ValidationError } from "yup";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/context/AuthContext";

export default function SignUp() {
  const router = useRouter();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await userSchema.validate(formData);

      try {
        await signup(formData.username, formData.email, formData.password);
        console.log("Signup successful");

        router.push("/inventory");
      } catch (error: any) {
        console.error("Error creating user:", error);

        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to create account. Please try again.";

        setError(errorMessage);
      }
    } catch (error: any) {
      if (error instanceof ValidationError) {
        setError(error.errors.join("\n"));
      } else {
        setError("An error occurred during validation.");
        console.error("Validation error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
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
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/96x96?text=KANBAN";
              }}
            />
          </div>
          <h1 className="text-3xl font-bold text-blue-500">KANBAN</h1>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-2">
          Create an account
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Start your 30-day free trial.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username<span className="text-red-500">*</span>
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              placeholder="Enter your username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.username}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

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
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password<span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Create a password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Must be at least 8 characters.
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating account..." : "Get started"}
          </button>
        </form>

        <div className="mt-4">
          <button
            type="button"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <FcGoogle size={20} />
            Sign up with Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
