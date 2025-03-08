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

// Mock users database
const mockUsers = [
  {
    id: "user1",
    username: "demo",
    email: "demo@example.com",
    password: "password123",
    avatar: "https://ui-avatars.com/api/?name=Demo&background=random",
  },
];

// Always use mock auth for the frontend-only version
// const useMockAuth = process.env.NODE_ENV === "development";
const useMockAuth = true;

export const authService = {
  async signup(data: SignupData) {
    try {
      console.log("Signup request data:", {
        ...data,
        password: "***", // Hide password in logs
      });

      // Check if username or email already exists
      const userExists = mockUsers.some(
        (user) => user.username === data.username || user.email === data.email
      );

      if (userExists) {
        throw new Error("Username or email already exists");
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Create new user
      const newUser = {
        id: Math.random().toString(36).substring(2),
        username: data.username,
        email: data.email,
        password: data.password,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          data.username
        )}&background=random`,
      };

      // Add to mock database
      mockUsers.push(newUser);

      // Mock successful response
      const mockResponse = {
        token: "mock-jwt-token-" + Math.random().toString(36).substring(2),
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          avatar: newUser.avatar,
        },
      };

      // Store in localStorage
      localStorage.setItem("token", mockResponse.token);
      localStorage.setItem("user", JSON.stringify(mockResponse.user));

      return mockResponse;

      // Real implementation - commented out
      // const response = await apiClient.post(API_ENDPOINTS.AUTH.SIGNUP, data);
      // console.log("Signup response:", response.data);
      // return await this.login({
      //   username: data.username,
      //   password: data.password,
      // });
    } catch (error: any) {
      console.error("Signup error details:", {
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

      // Find user in mock database
      const user = mockUsers.find(
        (u) =>
          (u.username === data.username || u.email === data.username) &&
          u.password === data.password
      );

      if (!user) {
        throw new Error("Invalid credentials");
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock successful response
      const mockResponse = {
        token: "mock-jwt-token-" + Math.random().toString(36).substring(2),
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
        },
      };

      // Store in localStorage
      localStorage.setItem("token", mockResponse.token);
      localStorage.setItem("user", JSON.stringify(mockResponse.user));

      return mockResponse;

      // Real implementation - commented out
      // const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, data);
      // console.log("Login response:", response.data);
      // const responseData = response.data as LoginResponse;
      // const authResponse = {
      //   token: "jwt-token", // Backend doesn't provide a token yet
      //   user: {
      //     id: responseData.userId,
      //     username: responseData.username,
      //     email: responseData.email,
      //   },
      // };
      // localStorage.setItem("token", authResponse.token);
      // localStorage.setItem("user", JSON.stringify(authResponse.user));
      // return authResponse;
    } catch (error: any) {
      console.error("Login error details:", {
        message: error.message,
        stack: error.stack,
      });
      throw error;
    }
  },
};
