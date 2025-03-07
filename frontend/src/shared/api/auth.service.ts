import apiClient from "./client";
import { API_ENDPOINTS } from "./config";

interface SignupData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    avatar?: string;
  };
}

// Mock implementation for development
const useMockAuth = process.env.NODE_ENV === "development";

export const authService = {
  async signup(data: SignupData) {
    try {
      console.log("Signup request data:", {
        ...data,
        password: "***", // Hide password in logs
      });

      // For development/testing when backend might not be available
      if (useMockAuth) {
        console.log("Using mock signup implementation");
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock successful response
        const mockResponse = {
          token: "mock-jwt-token-" + Math.random().toString(36).substring(2),
          user: {
            id: Math.random().toString(36).substring(2),
            username: data.username,
            email: data.email,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              data.username
            )}&background=random`,
          },
        };

        // Store in localStorage
        localStorage.setItem("token", mockResponse.token);
        localStorage.setItem("user", JSON.stringify(mockResponse.user));

        return mockResponse;
      }

      // Real implementation
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.SIGNUP,
        data
      );

      console.log("Signup response:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error: any) {
      console.error("Signup error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        stack: error.stack,
      });
      throw error;
    }
  },

  async login(data: LoginData) {
    try {
      console.log("Login request data:", {
        ...data,
        password: "***", // Hide password in logs
      });

      // For development/testing when backend might not be available
      if (useMockAuth) {
        console.log("Using mock login implementation");
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock successful response
        const mockResponse = {
          token: "mock-jwt-token-" + Math.random().toString(36).substring(2),
          user: {
            id: Math.random().toString(36).substring(2),
            username: "user", // We don't have username in login data
            email: data.email,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              data.email
            )}&background=random`,
          },
        };

        // Store in localStorage
        localStorage.setItem("token", mockResponse.token);
        localStorage.setItem("user", JSON.stringify(mockResponse.user));

        return mockResponse;
      }

      // Real implementation
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        data
      );

      console.log("Login response:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error: any) {
      console.error("Login error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        stack: error.stack,
      });
      throw error;
    }
  },
};
