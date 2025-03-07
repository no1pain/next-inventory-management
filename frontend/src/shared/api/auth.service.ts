import apiClient from "./client";
import { API_ENDPOINTS } from "./config";

interface SignupData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  username: string;
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

interface LoginResponse {
  userId: string;
  username: string;
  email: string;
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
      const response = await apiClient.post(API_ENDPOINTS.AUTH.SIGNUP, data);

      console.log("Signup response:", response.data);

      // After successful signup, automatically log in the user
      return await this.login({
        username: data.username,
        password: data.password,
      });
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
            username: data.username,
            email: data.username, // We don't have email in login data
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
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, data);

      console.log("Login response:", response.data);

      // Format the response to match our expected AuthResponse format
      const responseData = response.data as LoginResponse;
      const authResponse = {
        token: "jwt-token", // Backend doesn't provide a token yet
        user: {
          id: responseData.userId,
          username: responseData.username,
          email: responseData.email,
        },
      };

      localStorage.setItem("token", authResponse.token);
      localStorage.setItem("user", JSON.stringify(authResponse.user));

      return authResponse;
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
