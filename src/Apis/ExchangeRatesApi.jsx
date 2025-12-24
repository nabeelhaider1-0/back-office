import axios from 'axios';
const { VITE_REACT_APP_AXIOS_RETRY } = import.meta.env;
const AXIOS_RETRY = VITE_REACT_APP_AXIOS_RETRY;

const API_KEY = import.meta.env.VITE_REACT_APP_APIKEY;
const CURRENCY_BASE_URL = import.meta.env.VITE_REACT_APP_CURRENCYBASEURL;

const getCurrencyHeaders = () => ({
  'apikey': API_KEY,
});

export const getCurrencySymbols = async () => {
  try {
    const response = await axios.get(`${CURRENCY_BASE_URL}symbols`, {
      headers: getCurrencyHeaders(),
      [AXIOS_RETRY]: { retries: 3 },
    });
    return response.data.symbols;
  } catch (error) {
    throw error;
  }
};

export const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  try {
    const response = await axios.get(`${CURRENCY_BASE_URL}convert`, {
      params: {
        from: fromCurrency,
        to: toCurrency,
        amount: amount,
      },
      headers: getCurrencyHeaders(),
      [AXIOS_RETRY]: { retries: 3 },
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};
