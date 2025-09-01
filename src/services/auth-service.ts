import apiClient from './api-client';

export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
  token: string;
  type?: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: string[];
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

interface JwtResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  roles: string[];
}

const AuthService = {
  login: async (username: string, password: string): Promise<ApiResponse<User>> => {
    try {
      // Fixed endpoint to match backend
      const response = await apiClient.post<JwtResponse>('/api/auth/signin', {
        username,
        password
      });

      const data = response.data;
      if (!data || !data.id) {
        throw new Error("Invalid login response from server");
      }

      const user: User = {
        id: Number(data.id), // Convert Long to number
        username: data.username,
        email: data.email,
        roles: data.roles,
        token: data.token,
        type: data.type
      };
      
      // Store user data in localStorage
      localStorage.setItem('token', user.token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return {
        success: true,
        data: user
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Login failed. Please try again.'
      };
    }
  },

  register: async (userData: Omit<RegisterRequest, 'role'> & { role: string }): Promise<ApiResponse<void>> => {
    try {
      await apiClient.post('/api/auth/signup', {
        ...userData,
        roles: [userData.role]
      });
      
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Registration failed. Please try again.'
      };
    }
  },

  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (e) {
      console.error('Error parsing user data:', e);
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    // Here you could also validate the token's expiration
    // For now, we'll just check if it exists
    return true;
  }
};

export default AuthService;
