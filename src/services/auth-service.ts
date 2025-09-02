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

export interface RegisterRequest {
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
  type?: string; // Make type optional
  id: number;
  username: string;
  email: string;
  roles: string[];
}

const AuthService = {
  login: async (username: string, password: string): Promise<ApiResponse<User>> => {
    try {
      // The response interceptor already gives us the response data directly
      const responseData = await apiClient.post<JwtResponse>('/auth/signin', {
        username,
        password
      }) as unknown as JwtResponse;

      if (!responseData || !responseData.id) {
        throw new Error("Invalid login response from server");
      }

      const user: User = {
        id: responseData.id,
        username: responseData.username,
        email: responseData.email,
        roles: responseData.roles,
        token: responseData.token,
        type: responseData.type || 'Bearer'
      };

      console.log('Login successful. User:', user);

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

  register: async (userData: RegisterRequest): Promise<ApiResponse<User>> => {
    try {
      await apiClient.post('/auth/signup', {
        ...userData,
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