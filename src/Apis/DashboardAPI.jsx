import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL =import.meta.env.VITE_REACT_APP_BASE_URL; // Fallback URL

export const useBookingData = (bookingPeriod) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}api/booking`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
          params: { period: bookingPeriod },
        });
        if (response.data.statusCode === 200) {
          console.log(response.data.data);
          setData(response.data.data[bookingPeriod] || []);
        } else {
          throw new Error(response.data.message || "Failed to fetch booking data");
        }
      } catch (err) {
        console.log(err)
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookingPeriod]);

  return { data, loading, error };
};
// New hook for BookingDistributionChart
export const useBookingPlatformData = (bookingPeriod) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}api/booking/platforms`, {
          params: { period: bookingPeriod },
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        });
        if (response.data.statusCode === 200) {
          // Map API response to match chart format (sales instead of count)
          const mappedData = response.data.data[bookingPeriod].map(item => ({
            platform: item.platform,
            sales: Number(item.count) || 0, // Ensure numeric sales
          }));
          console.log(mappedData);
          setData(mappedData || []);
        } else {
          throw new Error(response.data.message || "Failed to fetch platform data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookingPeriod]);

  return { data, loading, error };
};
// New hook for SearchBookings
export const useFetchBookings = (filters = {}, page = 1, limit = 10) => {
  
  const [bookings, setData] = useState([]);
  const [meta, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Clean filters: remove empty or undefined values
        const cleanFilters = Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => {
            // Handle different types
            if (value === null || value === undefined) return false;
            if (typeof value === "string") return value.trim() !== "";
            if (Array.isArray(value)) return value.length > 0;
            return true; // Keep other non-falsy values (e.g., Date objects)
          })
        );
        const response = await axios.get(`${API_BASE_URL}api/booking/searchBookings`, {
          params: {
            ...cleanFilters,
            page,
            limit,
            
          },
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        });

        if (response.data.statusCode === 200) {
          setData(response.data.data || []);
          setData(response.data.data || []);
          setTotal({
            pageCount:response.data.pageCount,
            totalItems:response.data.totalItems,
            currentPage:response.data.currentPage,
            totalPages:response.data.totalPages,
          }); // Adjust if API provides total
        } else {
          throw new Error(response.data.message || "Failed to fetch booking search data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, page, limit]);

  return { bookings, meta, loading, error };
};
// New hook for fetching booking details
export const useBookingDetails = (bookingId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!bookingId) return; // Skip if no bookingId

      setLoading(true);
      setError(null);
      try {
        
        const response = await axios.get(
          `${API_BASE_URL}api/booking/getBookingsDetails/${bookingId}`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.statusCode === 200) {
          console.log(response.data)
          setData(response.data.data || null);
        } else {
          throw new Error(response.data.message || "Failed to fetch booking details");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);
  return { data, loading, error };
};
export function useTransactionsList(page = 1, pageSize = 10, search = "") {
  const [state, setState] = useState({
    data: null,
    total: 0,
    page,
    pageSize,
    totalPages: 1,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const response = await axios.get(
          `${API_BASE_URL}api/booking/getTransactionsList?page=${page}&limit=${pageSize}&search=${search}`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        );
        
        if (response.data.statusCode=== 200) {
          console.log(response.data)
          setState({
            data: response.data?.data?.transactions || [],
            total: response.data?.data?.total || 0,
            page: response.data?.data?.page || page,
            pageSize: response.data?.data?.pageSize || pageSize,
            totalPages: response.data?.data?.totalPages || 1,
            loading: false,
            error: null,
          });
        } else {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: response.message,
          }));
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: `Failed to fetch transactions: ${error.message}`,
        }));
      }
    };

    fetchTransactions();
  }, [page, pageSize, search]);

  return state;
}


// ✨ New function to update a booking
export const updateBookingService = async (bookingId, data)=> {
  try {
    // Validate bookingId
    if (!bookingId) {
      return {
        success: false,
        message: 'Booking ID is required',
      };
    }

    // Retrieve token
    const token = window.localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found');
      return {
        success: false,
        message: 'Authentication token is missing',
      };
    }

    // Define API base URL
   // const API_BASE_URL = import.meta.env.VITE_REACT_APP_BOOKING_API || 'http://localhost:3000';
    const url = `${API_BASE_URL}api/booking/updateBooking/${bookingId}`;

    // Make PUT request
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Validate HTTP status
    if (response.status < 200 || response.status >= 300) {
      console.error('API request failed:', response.status, response.data);
      return {
        success: false,
        message: response.data.message || `API request failed with status ${response.status}`,
      };
    }

    // Log success
    console.log('API Response:', {
      status: response.status,
      data: response.data,
    });

    // Handle API response
    if (response.data.statusCode === 200) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Booking updated successfully',
      };
    } else {
      console.warn('API returned non-200 statusCode:', response.data.statusCode);
      return {
        success: false,
        message: response.data.message || 'Failed to update booking',
      };
    }
  } catch (error) {
    // Log detailed error
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      stack: error.stack,
    });

    // Handle specific error cases
    const message =
      error.response?.data?.message ||
      error.message ||
      'Failed to update booking due to an unexpected error';

    return {
      success: false,
      message,
    };
  }
};
