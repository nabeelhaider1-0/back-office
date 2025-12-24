import axios from 'axios';

const EMAIL_SERVICE_BASE_URL=import.meta.env.VITE_REACT_APP_EMAIL_SERVICE_URL || 'https://notification.stg.escapra.com'
export const apiHandler = {
  get: async (url, config = {}) => {
   
    try {
      const response = await axios.get(`${EMAIL_SERVICE_BASE_URL}${url}`, {
        ...config,
        headers: { ...config.headers },
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Network error';
      //toast.error(message);
      throw error.response?.data || { message };
    }
  },
  post: async (url, data, config = {}) => {
    try {
      const response = await axios.post(`${EMAIL_SERVICE_BASE_URL}${url}`, data, {
        ...config,
        headers: { ...config.headers },
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Network error';
      //toast.error(message);
      throw error.response?.data || { message };
    }
  },
  put: async (url, data, config = {}) => {
    try {
      const response = await axios.put(`${EMAIL_SERVICE_BASE_URL}${url}`, data, {
        ...config,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, ...config.headers },
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Network error';
      //toast.error(message);
      throw error.response?.data || { message };
    }
  },
  delete: async (url, config = {}) => {
    try {
      const response = await axios.delete(`${EMAIL_SERVICE_BASE_URL}${url}`, {
        ...config,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, ...config.headers },
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Network error';
     // toast.error(message);
      throw error.response?.data || { message };
    }
  },
  patch: async (url, config = {}) => {
    try {
      const response = await axios.patch(`${EMAIL_SERVICE_BASE_URL}${url}`, {}, {
        ...config,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, ...config.headers },
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Network error';
      //toast.error(message);
      throw error.response?.data || { message };
    }
  },
};
