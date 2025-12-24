import React, { useState, useEffect } from 'react';
import { convertCurrency, getCurrencySymbols } from '../../Apis/ExchangeRatesApi'; // Adjust the import path as needed

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState({});
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const symbols = await getCurrencySymbols();
        setCurrencies(symbols);
      } catch (error) {
        setError(error);
        console.error('There was an error fetching the currency symbols!', error);
      }
    };
    fetchCurrencies();
  }, []);

  const handleConvert = async () => {
    try {
      const conversionResult = await convertCurrency(fromCurrency, toCurrency, amount);
      setResult(conversionResult);
    } catch (error) {
      setError(error);
      console.error('There was an error converting the currency!', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Currency Converter</h1>
      {error && <p style={styles.error}>Error: {error.message}</p>}
      <div style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>
            From:
            <select style={styles.select} value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
              <option value="">Select currency</option>
              {Object.keys(currencies).map((currency) => (
                <option key={currency} value={currency}>
                  {currencies[currency]} ({currency})
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={styles.field}>
          <label style={styles.label}>
            To:
            <select style={styles.select} value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
              <option value="">Select currency</option>
              {Object.keys(currencies).map((currency) => (
                <option key={currency} value={currency}>
                  {currencies[currency]} ({currency})
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={styles.field}>
          <label style={styles.label}>
            Amount:
            <input
              type="number"
              style={styles.input}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
        </div>
        <button style={styles.button} onClick={handleConvert}>Convert</button>
      </div>
      {result !== null && (
        <div style={styles.result}>
          <p>Converted Amount: {result}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  header: {
    marginBottom: '20px',
    fontSize: '2.5rem',
    color: '#333',
    background: '-webkit-linear-gradient(#007bff, #6a11cb)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    marginBottom: '10px',
    fontSize: '1.2rem',
    color: '#555',
  },
  select: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    maxWidth: '300px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'border-color 0.2s ease-in-out',
  },
  selectHover: {
    borderColor: '#007bff',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    maxWidth: '300px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'border-color 0.2s ease-in-out',
  },
  inputHover: {
    borderColor: '#007bff',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1.2rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  result: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#f0f8ff',
    borderRadius: '5px',
    fontSize: '1.5rem',
    color: '#333',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  error: {
    color: 'red',
    fontSize: '1rem',
    marginBottom: '10px',
  },
};

export default CurrencyConverter;
