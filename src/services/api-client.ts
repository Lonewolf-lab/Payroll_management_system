import axios, { AxiosError } from 'axios';

// Create an Axios instance with default config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add a request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    // Return the data directly since we're using the response interceptor
    return response.data;
  },
  (error: AxiosError<{ message?: string }>) => {
    // Handle session expiration or authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Only redirect if not already on login page to prevent infinite redirects
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    
    // Return a consistent error response
    return Promise.reject({
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      data: error.response?.data
    });
  }
);

export default apiClient;