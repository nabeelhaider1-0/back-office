import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    'Content-Type': 'application/json',
});

export const fetchDiscountProfiles = async (page = 1, limit = 10, search = '',sortBy='',sortOrder='') => {
    try {
        const response = await axios.get(`${API_BASE_URL}api/revenue/discount`, {
            params: { page, limit, search ,sortBy:sortBy ,sortOrder:sortOrder},
            headers: getAuthHeaders()
        });
        return {
            success: response.data.statusCode === 200,
            data: response.data.data,
            meta: response.data.meta,
            message: response.data.message,
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch discount profiles',
        };
    }
};

export const fetchDiscountProfileById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}api/revenue/discount/${id}`
            , { headers: getAuthHeaders() }
        );
        return {
            success: response.data.statusCode === 200,
            data: response.data,
            message: response.data.message,
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch discount profile',
        };
    }
};

export const createDiscountProfile = async (payload) => {
    try {
        const response = await axios.post(`${API_BASE_URL}api/revenue/discount`, payload,
            { headers: getAuthHeaders() }
        );
        return {
            success: response.data.statusCode === 200,
            data: response.data.data,
            message: response.data.message,
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to create discount profile',
        };
    }
};

export const updateDiscountProfile = async (id, payload) => {
    try {
        const response = await axios.put(`${API_BASE_URL}api/revenue/discount/${id}`, payload,
            { headers: getAuthHeaders() }
        );
        return {
            success: response.data.statusCode === 200,
            data: response.data.data,
            message: response.data.message,
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to update discount profile',
        };
    }
};

export const deleteDiscountProfile = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}api/revenue/discount/${id}`
            , { headers: getAuthHeaders() }
        );
        return {
            success: response.data.statusCode === 200,
            message: response.data.message,
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to delete discount profile',
        };
    }
};
export const changeStatus = async (uuid) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}api/revenue/discount/update/status/${uuid}`,{},
      { headers: getAuthHeaders() }
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update profile status',
    };
  }
};
export const syncDiscountProfilesWithElastic = async () => {
    try {
        const payload={}
        const response = await axios.post(`${API_BASE_URL}api/revenue/discount/sync`,
            payload, {
            headers: getAuthHeaders() }
        );
        return {
            success: response.data.statusCode === 200,
            data: response.data?.data || null,
            message: 'Discount profiles synced successfully',
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to sync discount profile',
        };
    }
};