import apiClient from './api-client';

export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
  accessToken: string;
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
      const { data } = await apiClient.post<JwtResponse>('/auth/signin', {
        username,
        password
      });

      const user: User = {
        id: data.id,
        username: data.username,
        email: data.email,
        roles: data.roles,
        accessToken: data.token
      };
      
      // Store user data in localStorage
      localStorage.setItem('token', user.accessToken);
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
      await apiClient.post('/auth/signup', {
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