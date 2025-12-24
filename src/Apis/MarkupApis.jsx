import axios from 'axios';

// Base URL for your API (replace with your actual backend URL)
const BASE_URL  = import.meta.env.VITE_REACT_APP_BASE_URL; // Fallback URL


// Create an axios instance with default configurations
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
     Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    // Add other default headers like Authorization if needed
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
});

// Generic postData function for making API requests
export const postData = async ({ url, method = 'POST', data = {} }) => {
  try {
    const response = await apiClient({
      url,
      method: method.toUpperCase(), // Ensure method is uppercase (POST, PUT, DELETE, etc.)
      data,
    });

    // Return the response data
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    // Handle errors (e.g., network errors, 4xx/5xx responses)
    const errorResponse = {
      success: false,
      error: error.response ? error.response.data : { message: 'Network error' },
      status: error.response ? error.response.status : 500,
    };

    throw errorResponse;
  }
};