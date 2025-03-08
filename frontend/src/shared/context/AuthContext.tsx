"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  user: User | null;
}

interface User {
  userId: string;
  username: string;
  email: string;
}

interface LoginResponse {
  message: string;
  userId: string;
  username: string;
  email: string;
}

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

// Mock users for local storage authentication
const MOCK_USERS = [
  {
    userId: "user1",
    username: "demo",
    email: "demo@example.com",
    password: "password123",
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Check if user exists in mock data
      const foundUser = MOCK_USERS.find(
        (u) =>
          (u.username === username || u.email === username) &&
          u.password === password
      );

      if (!foundUser) {
        throw new Error("Invalid credentials");
      }

      const userData = {
        userId: foundUser.userId,
        username: foundUser.username,
        email: foundUser.email,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      setIsAuthenticated(true);

      // Original API call
      // const response = await axios.post<LoginResponse>(
      //   `${API_URL}/auth/login`,
      //   {
      //     username,
      //     password,
      //   }
      // );

      // const userData = {
      //   userId: response.data.userId,
      //   username: response.data.username,
      //   email: response.data.email,
      // };

      // localStorage.setItem("user", JSON.stringify(userData));

      // setUser(userData);
      // setIsAuthenticated(true);
    } catch (error: any) {
      throw error;
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Check if username or email already exists
      const userExists = MOCK_USERS.some(
        (u) => u.username === username || u.email === email
      );

      if (userExists) {
        throw new Error("Username or email already exists");
      }

      // Generate a new user ID
      const userId = `user${Date.now()}`;

      // Add new user to mock data
      const newUser = { userId, username, email, password };
      MOCK_USERS.push(newUser);

      // After successful signup, automatically log in
      await login(username, password);

      // Original API call
      // const response = await axios.post(`${API_URL}/auth/signup`, {
      //   username,
      //   email,
      //   password,
      // });

      // // After successful signup, automatically log in
      // await login(username, password);
    } catch (error: any) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, signup, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
