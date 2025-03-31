import api from "../utils/api";
import { API_ENDPOINTS } from "../config";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

export const authService = {
  // Login user
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<AuthResponse>(
      `${API_ENDPOINTS.auth}/login`,
      credentials
    );
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  // Register new user
  register: async (data: RegisterData) => {
    const response = await api.post<AuthResponse>(
      `${API_ENDPOINTS.auth}/register`,
      data
    );
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("token");
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get(`${API_ENDPOINTS.auth}/me`);
    return response.data;
  },
};
