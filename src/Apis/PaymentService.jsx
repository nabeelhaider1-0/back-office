import axios from 'axios';

const { VITE_REACT_APP_AXIOS_RETRY } = import.meta.env;
const AXIOS_RETRY = VITE_REACT_APP_AXIOS_RETRY;
const paymentApiUrl = import.meta.env.VITE_REACT_APP_PAYMENT_API_URL || 'https://payment.stg.escapra.com';

const paymentApiClient = axios.create({
  baseURL: paymentApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for auth token
paymentApiClient.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor for error handling
paymentApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  }
);

// Get all payment gateways with pagination and search
export const getAllPaymentGateways = async (page = 1, pageSize = 10, searchQuery = '', sortBy = 'created_at', sortOrder = 'DESC') => {
  return paymentApiClient.get('/api/paymentGateway/', {
    params: {
      page,
      pageSize,
      searchQuery,
      sortBy,
      sortOrder,
    },
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

// Get active payment gateways
export const getActivePaymentGateways = async () => {
  return paymentApiClient.get('/api/paymentGateway/active', {
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

// Get one payment gateway by UUID
export const getOnePaymentGateway = async (uuid) => {
  return paymentApiClient.get(`/api/paymentGateway/${uuid}`, {
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

// Create a new payment gateway
export const createPaymentGateway = async (gatewayData) => {
  if (gatewayData.availableCountries && typeof gatewayData.availableCountries === 'string') {
    gatewayData.availableCountries = gatewayData.availableCountries.split(',').map(c => c.trim());
  }
  return paymentApiClient.post('/api/paymentGateway/', gatewayData, {
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

// Update a payment gateway
export const updatePaymentGateway = async (uuid, gatewayData) => {
  if (gatewayData.availableCountries && typeof gatewayData.availableCountries === 'string') {
    gatewayData.availableCountries = gatewayData.availableCountries.split(',').map(c => c.trim());
  }
  return paymentApiClient.put(`/api/paymentGateway/${uuid}`, gatewayData, {
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

// Delete a payment gateway
export const deletePaymentGateway = async (uuid) => {
  return paymentApiClient.delete(`/api/paymentGateway/${uuid}`, {
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};

// Set a payment gateway as default
export const setDefaultPaymentGateway = async (uuid) => {
  return paymentApiClient.post('/api/paymentGateway/set-default', { uuid }, {
    [AXIOS_RETRY]: {
      retries: 3,
    },
  });
};




export const updatePaymentGatewayStatus = async (uuid, status) => {
  try {
    const response = await paymentApiClient.patch(`/api/paymentGateway/${uuid}/status`, { status });
    return response;
  } catch (error) {
    throw error;
  }
};