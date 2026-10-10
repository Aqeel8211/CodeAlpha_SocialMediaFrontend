import axios from 'axios';

// Base URL of your .NET backend
const BASE_URL = 'http://localhost:5241/api';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================
// Request Interceptor
// Attaches JWT token to every request
// ============================================
axiosInstance.interceptors.request.use(
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

// ============================================
// Response Interceptor
// Handles 401 Unauthorized globally
// ============================================
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid — clear storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Only redirect if not already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;