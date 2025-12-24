import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast, Slide } from 'react-toastify';

// API base URL from your Swagger
console.log('API_BASE_URL:', import.meta.env.VITE_REACT_APP_BASE_URL);
const API_BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

// List of public endpoints that don't require authentication
const PUBLIC_ENDPOINTS = [
  '/admin/auth/login',
  '/admin/auth/forgot-password',
  '/admin/auth/verify-reset-password-otp',
  '/admin/auth/reset-password',
  '/admin/auth/verify-email',
  '/admin/auth/resend-otp',
  '/admin/auth/public-key',
];

class ApiHandler {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.navigate = null;
    this.toastConfig = null;

    // Request interceptor to attach access token for non-public endpoints
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        console.log('Request URL:', config.url);
        // Skip token handling for public endpoints
        const isPublicEndpoint = PUBLIC_ENDPOINTS.some((endpoint) =>
          config.url.includes(endpoint)
        );
        if (isPublicEndpoint) {
          //console.log(`Skipping token for public endpoint: ${config.url}`);
          return config;
        }

        const accessToken = localStorage.getItem('accessToken');
      //  console.log('Access Token:', accessToken, 'Expired:', this.isTokenExpired(accessToken));
        if (accessToken && !this.isTokenExpired(accessToken)) {
         // console.log('Attaching access token to request:', accessToken);
          config.headers.Authorization = `Bearer ${accessToken}`;
        } else if (accessToken && this.isTokenExpired(accessToken)) {
          // Attempt to refresh token if expired
          //console.log('Access token expired, attempting to refresh...');

          const refreshResult = await this.refreshToken();

          if (refreshResult) {
            config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
          }
        }
       // console.log('Final request headers:', config.headers);
        return config;
      },
      (error) => {
        // Handle request errors (e.g., network issues)
        const errorMsg = error.message || 'Failed to send request';
        console.log('Request error:', errorMsg);
       // //this.showToast(errorMsg);
        return {}; // Return empty object for network errors
      }
    );

    // Response interceptor to handle errors
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        // Handle network errors (no response)
        if (!error.response) {
          const errorMsg = error.message || 'Server is unreachable';
          console.log('Network error:', errorMsg);
          ////this.showToast(errorMsg);
          return { data: {} }; // Return empty object for network errors
        }

        // Skip retry for public endpoints
        const isPublicEndpoint = PUBLIC_ENDPOINTS.some((endpoint) =>
          originalRequest.url.includes(endpoint)
        );
        if (isPublicEndpoint) {
          const errorMsg = error.response.data?.message || `Request failed with status ${error.response.status}`;
          console.log(`Response error for ${originalRequest.url}:`, errorMsg);
          //this.showToast(errorMsg);
          return { data: error.response.data }; // Return error response data
        }

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshResult = await this.refreshToken();
          if (refreshResult) {
            originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
            return this.axiosInstance(originalRequest);
          }
          const errorMsg = 'Failed to refresh token';
          console.log('Refresh token error:', errorMsg);
          ////this.showToast(errorMsg);
          this.handleSessionExpired();
          return { data: {} }; // Return empty object if refresh fails
        }

        const errorMsg = error.response.data?.message || `Request failed with status ${error.response.status}`;
        console.log(`Response error for ${originalRequest.url}:`, errorMsg);
        //this.showToast(errorMsg);
        return { data: error.response.data }; // Return error response data
      }
    );
  }

  // Set navigate function for redirects (called from React component)
  setNavigate(navigate) {
    this.navigate = navigate;
  }

  // Set toast configuration (called from React component)
  setToastConfig(toastConfig) {
    this.toastConfig = toastConfig || {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Slide,
    };
  }

  // Show toast notification if toastConfig is set
  showToast(message) {
    if (this.toastConfig) {
      toast.error(message, this.toastConfig);
    }
  }

  // Check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      const errorMsg = error.message || 'Invalid token';
      console.log('Error decoding token:', errorMsg);
    //  //this.showToast(errorMsg);
      return true; // Assume expired if decoding fails
    }
  }

  // Refresh access token using refresh token
  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      const errorMsg = 'No refresh token available';
      console.log('Refresh token error:', errorMsg);
      ////this.showToast(errorMsg);
      this.handleSessionExpired();
      return false;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/admin/auth/refresh`, {
        refreshToken,
      });
      const { accessToken } = response.data.data;
      localStorage.setItem('accessToken', accessToken);
      return true;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Invalid refresh token';
      console.log('Token refresh failed:', errorMsg);
     // //this.showToast(errorMsg);
      this.handleSessionExpired();
      return false;
    }
  }

  // Handle session expiration (clear storage and redirect to login)
  handleSessionExpired() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('ProfileUuid');
    if (this.navigate) {
      this.navigate('/', {
        state: { errorMessage: 'Your session has expired. Please log in again.' },
      });
    }
  }

  // Generic API methods
  async get(url, config) {
    try {
      const response = await this.axiosInstance.get(url, config);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || `GET ${url} failed`;
      console.log(`GET ${url} error:`, errorMsg);
      //this.showToast(errorMsg);
      return error.response ? error.response.data : {};
    }
  }

  async post(url, data, config) {
    try {
      const response = await this.axiosInstance.post(url, data, config);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || `POST ${url} failed`;
      console.log(`POST ${url} error:`, errorMsg);
      //this.showToast(errorMsg);
      return error.response ? error.response.data : {};
    }
  }

  async put(url, data, config) {
    try {
      const response = await this.axiosInstance.put(url, data, config);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || `PUT ${url} failed`;
      console.log(`PUT ${url} error:`, errorMsg);
      //this.showToast(errorMsg);
      return error.response ? error.response.data : {};
    }
  }

  async delete(url, config) {
    try {
      const response = await this.axiosInstance.delete(url, config);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || `DELETE ${url} failed`;
      console.log(`DELETE ${url} error:`, errorMsg);
      //this.showToast(errorMsg);
      return error.response ? error.response.data : {};
    }
  }
  async patch(url, data, config) {
    try {
      const response = await this.axiosInstance.patch(url, data, config);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || `PATCH ${url} failed`;
      console.log(`PATCH ${url} error:`, errorMsg);
      //this.showToast(errorMsg);
      return error.response ? error.response.data : {};
    }
  }
}


export const apiHandler = new ApiHandler();
export default ApiHandler;