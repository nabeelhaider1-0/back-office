import axios from 'axios';

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  'Content-Type': 'application/json',
});

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || '';

export const fetchAllCurrencies = async (page, pageSize, search,sortBy='',sortOrder='') => {
  try {
    const response = await axios.get(`${BASE_URL}api/currencies`, {
      params: { page, limit: pageSize, search: search || '',sortBy:sortBy ,sortOrder:sortOrder },
      headers: getAuthHeaders(),
    });
    return {
      success: response.data.statusCode === 200,
      data: response.data.data,
      meta: response.data.meta,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || 'Failed to fetch currencies',
    };
  }
};

export const fetchActiveCurrencies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}api/currencies/active`, {
      headers: getAuthHeaders(),
    });
    return {
      success: response.data.statusCode === 200,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || 'Failed to fetch active currencies',
    };
  }
};

export const fetchCurrencyById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}api/currencies/${id}`, {
      headers: getAuthHeaders(),
    });
    return {
      success: response.data.statusCode === 200,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to fetch currency',
    };
  }
};

export const createCurrency = async (currency) => {
  try {
    const response = await axios.post(`${BASE_URL}api/currencies`, currency, {
      headers: getAuthHeaders(),
    });
    return {
      success: response.data.statusCode === 200 || response.data.statusCode === 201,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to create currency',
    };
  }
};

export const updateCurrency = async (id, currency) => {
  try {
    const response = await axios.put(`${BASE_URL}api/currencies/${id}`, currency, {
      headers: getAuthHeaders(),
    });
    return {
      success: response.data.statusCode === 200,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to update currency',
    };
  }
};

export const deactivateCurrency = async (id, is_active) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}api/currencies/${id}/status`,
      { is_active },
      { headers: getAuthHeaders() }
    );
    return {
      success: response.data.statusCode === 200,
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to update currency status',
    };
  }
};

export const setBaseCurrency = async (id) => {
  try {
    const response = await axios.patch(`${BASE_URL}api/currencies/${id}/set-base`, {}, {
      headers: getAuthHeaders(),
    });
    return {
      success: response.data.statusCode === 200,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to set base currency',
    };
  }
};

export const deleteCurrency = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}api/currencies/${id}`, {
      headers: getAuthHeaders(),
    });
    return {
      success: response.data.statusCode === 200,
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || 'Failed to delete currency',
    };
  }
};
export const syncExchangeRatesWithElastic = async () => {
    try {
        const payload={}
        const response = await axios.post(`${BASE_URL}api/currencies/sync`,
            payload, {
            headers: getAuthHeaders() }
        );
        return {
            success: response.data.statusCode === 200,
            data: response.data?.data || null,
            message: 'Markup profiles synced successfully',
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to sync markup profile',
        };
    }
};