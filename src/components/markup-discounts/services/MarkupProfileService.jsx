import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  'Content-Type': 'application/json',
});

export const fetchParametersByProductType = async (productType) => {
  try {
    if (!productType) {
      throw new Error('Product type is required');
    }
    const response = await axios.get(
      `${BASE_URL}api/markup-discounts/parametersByType/${productType}`,
      { headers: getAuthHeaders() }
    );
    return {
      success: true,
      data: response.data || [],
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch parameters',
    };
  }
};

export const createMarkupProfile = async (profileData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}api/revenue/markup`,
      profileData,
      { headers: getAuthHeaders() }
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to create profile',
    };
  }
};

export const fetchMarkupProfiles = async (page = 1, limit = 10, search = '',sortBy='',sortOrder='') => {
  try {
    const response = await axios.get(
      `${BASE_URL}api/revenue/markup`,
      {  params: { page, limit, search,sortBy:sortBy ,sortOrder:sortOrder }, headers: getAuthHeaders() }
    );
    return {
      success: true,
      data: response.data || [],
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch markup profiles',
    };
  }
};

export const fetchMarkupProfileById = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}api/revenue/markup/${id}`,
      { headers: getAuthHeaders() }
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch profile',
    };
  }
};

export const updateMarkupProfile = async (id, profileData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}api/revenue/markup/${id}`,
      profileData,
      { headers: getAuthHeaders() }
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update profile',
    };
  }
};

export const deleteMarkupProfile = async (uuid) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}api/revenue/markup/${uuid}`,
      { headers: getAuthHeaders() }
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete profile',
    };
  }
};
export const changeStatus = async (uuid) => {
  try {
    console.log('getAuthHeaders()',getAuthHeaders());
    const response = await axios.patch(
      `${BASE_URL}api/revenue/markup/update/status/${uuid}`,{},
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
export const syncMarkupProfilesWithElastic = async () => {
    try {
        const payload={}
        const response = await axios.post(`${BASE_URL}api/revenue/markup/sync`,
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