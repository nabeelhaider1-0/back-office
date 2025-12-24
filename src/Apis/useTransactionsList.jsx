import { useState, useEffect } from "react";
import { ApiHandler } from "./ApiHandler"; // Adjust path as needed



export function useTransactionsList(page = 1, pageSize = 10, search = "") {
  const [state, setState] = useState({
    data: null,
    total: 0,
    page,
    pageSize,
    totalPages: 0,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const response = await getTransactionsList(page, pageSize, search);
        if (response.success) {
          setState({
            data: response.data?.transactions || [],
            total: response.data?.total || 0,
            page: response.data?.page || page,
            pageSize: response.data?.pageSize || pageSize,
            totalPages: response.data?.totalPages || 0,
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